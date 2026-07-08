---
date: 2026-07-08
section: 电机控制
chapter: foundations
chapterTitle: 基础算法底座
chapterOrder: 5
category: 基础算法底座
source: motor
visibility: public
quality: curated
title: FOUND-01 标幺值系统：把不同电机变成同一套算法
tags:
  - motor-control
  - per-unit
  - dsp
status: learning
summary: "用标幺值把电压、电流、速度、转矩归一到统一尺度，解释基值选择、派生基值、PI参数换算、DSP实现和调试检查点。"
navGroup: 控制与算法
navGroupOrder: 30
order: 5
---

# FOUND-01 标幺值系统：把不同电机变成同一套算法

标幺值的核心不是把数字变小，而是把物理量变成控制算法能复用的统一语言。24 V 小电机和 400 V 伺服电机的电压、电流、速度差很多，但算法真正关心的是当前量占额定能力的比例。

![标幺值归一化示意](assets/per-unit-scaling.svg)

## 1. 直觉

如果电流环看到的是 8 A，它不知道这对电机是轻载还是危险过流。如果先规定 `I_base = 10 A`，那么 8 A 就是 0.8 pu，含义马上清楚：已经接近当前设计能力上限。

```mermaid
flowchart LR
    A["ADC 采样: A / V"] --> B["扣 offset 和比例换算"]
    B --> C["除以基值"]
    C --> D["i_d, i_q, v_d, v_q 的 pu 值"]
    D --> E["PI 限幅 / SVPWM / 弱磁"]
```

基本定义：

$$
x_{pu}=\frac{x_{actual}}{x_{base}}
$$

反算实际量：

$$
x_{actual}=x_{pu}\cdot x_{base}
$$

## 2. 基值怎么选

基值不是随手填的常数。电压、电流、速度先选，阻抗、电感、转矩再从物理关系派生。

| 量 | 推荐基值 | 说明 |
| --- | --- | --- |
| 相电压 | $V_{base}=V_{dc}/\sqrt{3}$ | 和 SVPWM 线性区限幅保持一致 |
| 相电流 | $I_{base}=I_{rated}$ 或保护电流 | 决定电流环误差的尺度 |
| 电角速度 | $\omega_{base}$ | 常取额定或最高电角速度 |
| 阻抗 | $Z_{base}=V_{base}/I_{base}$ | 电阻标幺化用它 |
| 电感 | $L_{base}=Z_{base}/\omega_{base}$ | 电感和电流环带宽计算用它 |

派生关系：

$$
Z_{base}=\frac{V_{base}}{I_{base}}
$$

$$
L_{base}=\frac{Z_{base}}{\omega_{base}}
$$

工程上最容易错的是电压基值。若 SVPWM 模块按 $V_{dc}/\sqrt{3}$ 限幅，而电流环按 $V_{dc}/2$ 输出 pu 电压，同一个 0.9 pu 在两个模块里的含义就不一样。

## 3. 电流环参数换算

连续域电流对象：

$$
G(s)=\frac{1}{L_s s+R_s}
$$

常用零极点对消设计：

$$
K_p=\omega_c L_s
$$

$$
K_i=\omega_c R_s
$$

当电流误差使用 pu，电压输出也使用 pu 时，物理增益需要乘以电流基值再除以电压基值：

$$
K_{p,pu}=K_p\frac{I_{base}}{V_{base}}
$$

$$
K_{i,pu}=K_i\frac{I_{base}}{V_{base}}
$$

离散积分通常写成：

$$
u_i[k]=u_i[k-1]+K_{i,pu}T_s e_i[k]
$$

## 4. DSP 实现骨架

```c
typedef struct {
    float v_base;
    float i_base;
    float w_base;
    float z_base;
    float l_base;
} pu_base_t;

static inline pu_base_t pu_make_base(float v_base, float i_base, float w_base)
{
    pu_base_t b;
    b.v_base = v_base;
    b.i_base = i_base;
    b.w_base = w_base;
    b.z_base = v_base / i_base;
    b.l_base = b.z_base / w_base;
    return b;
}

static inline float pu_from_actual(float actual, float base)
{
    return actual / base;
}

static inline float pu_to_actual(float pu, float base)
{
    return pu * base;
}

typedef struct {
    float kp_pu;
    float ki_ts_pu;
    float integ_pu;
    float limit_pu;
} pi_pu_t;

float pi_pu_step(pi_pu_t *pi, float ref_pu, float fb_pu)
{
    float err = ref_pu - fb_pu;
    float p = pi->kp_pu * err;
    pi->integ_pu += pi->ki_ts_pu * err;

    float u = p + pi->integ_pu;
    if (u > pi->limit_pu) {
        u = pi->limit_pu;
        if (err > 0.0f) pi->integ_pu -= pi->ki_ts_pu * err;
    }
    if (u < -pi->limit_pu) {
        u = -pi->limit_pu;
        if (err < 0.0f) pi->integ_pu -= pi->ki_ts_pu * err;
    }
    return u;
}
```

## 5. 用数字走一遍

假设直流母线 48 V，额定相电流 10 A，最高电角速度 2000 rad/s。

| 项目 | 计算 | 结果 |
| --- | --- | --- |
| 电压基值 | $48/\sqrt{3}$ | 27.7 V |
| 电流基值 | 额定电流 | 10 A |
| 阻抗基值 | $27.7/10$ | 2.77 Ω |
| 电感基值 | $2.77/2000$ | 1.385 mH |

如果采样得到 $i_q=6 A$，控制器看到的是：

$$
i_{q,pu}=0.6
$$

如果电流环输出 $v_q=0.4 pu$，实际相电压参考约为：

$$
v_q=0.4\cdot 27.7=11.08V
$$

## 6. 调试检查表

| 检查项 | 正确现象 | 常见错误 |
| --- | --- | --- |
| 空载电流 | 三相电流接近 0 pu | ADC offset 未扣除 |
| 电压限幅 | $v_d^2+v_q^2$ 不超过限幅平方 | 电压基值和 SVPWM 限幅不一致 |
| PI 增益 | 换电机后只改基值和物理参数 | 直接复制旧工程整数增益 |
| 保护阈值 | 过流阈值能反算成真实安培值 | 标幺阈值和硬件保护脱节 |

记住一句话：标幺化先统一尺度，再谈 PI、定点、SVPWM。尺度不统一，后面每个模块都会看似能跑、实际含义不一致。
