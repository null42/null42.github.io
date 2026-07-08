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
title: FOUND-05 三电平SVPWM原理与DSP实现：多一个中点，多一层约束
tags:
  - motor-control
  - svpwm
  - three-level
  - dsp
status: learning
summary: "解释三电平NPC/T型逆变器的P/O/N状态、冗余矢量、中点电压平衡和DSP实现策略。"
navGroup: 控制与算法
navGroupOrder: 30
order: 9
---

# FOUND-05 三电平SVPWM原理与DSP实现：多一个中点，多一层约束

三电平逆变器把每相输出从两种状态扩展为三种状态：接正母线 P、接中点 O、接负母线 N。输出电压阶梯更多，dv/dt 更低，谐波更小；代价是开关状态更多，中点电压需要主动平衡。

![三电平 NPC 单相状态](assets/three-level-states.svg)

## 1. P/O/N 状态

| 状态 | 相电压 | 含义 |
| --- | --- | --- |
| P | $+V_{dc}/2$ | 相端接正母线 |
| O | $0$ | 相端接中点 |
| N | $-V_{dc}/2$ | 相端接负母线 |

三相组合共有：

$$
3^3=27
$$

个开关状态。不同状态可能产生相同空间矢量，这些状态称为冗余矢量。

```mermaid
flowchart LR
    A["目标 v_alpha, v_beta"] --> B["确定大扇区和小三角区"]
    B --> C["得到候选矢量序列"]
    C --> D["估计中点电流方向"]
    D --> E["按 Vc1 - Vc2 选择冗余矢量"]
    E --> F["生成 P/O/N 门极序列"]
```

## 2. 冗余矢量为什么重要

两电平 SVPWM 只关心电压合成。三电平 SVPWM 还要关心中点电压：

$$
V_{np}=V_{C1}-V_{C2}
$$

若长期偏向某一类冗余矢量，中点电容会被持续充电或放电，导致 $V_{C1}$ 和 $V_{C2}$ 不平衡。中点漂移会带来器件过压、输出畸变和保护误触发。

## 3. 简化实现策略

工程上可以用两层策略：

| 层级 | 目标 | 输出 |
| --- | --- | --- |
| 电压合成层 | 像两电平 SVPWM 一样合成目标电压 | 候选矢量和作用时间 |
| 中点平衡层 | 在等效冗余状态中选择更有利的一种 | 具体 P/O/N 序列 |

核心思想是：电压合成先正确，中点平衡再优化。不要一开始就把 27 个状态全混在一起调。

## 4. 冗余矢量选择代码

```c
typedef enum {
    TL_N = -1,
    TL_O = 0,
    TL_P = 1
} tl_state_t;

typedef struct {
    tl_state_t a;
    tl_state_t b;
    tl_state_t c;
} tl_vector_t;

typedef struct {
    tl_vector_t positive_np_current;
    tl_vector_t negative_np_current;
} redundant_pair_t;

tl_vector_t choose_redundant_vector(
    redundant_pair_t pair,
    float v_np_error,
    float i_np_est
) {
    int upper_too_high = v_np_error > 0.0f;
    int positive_current_charges_upper = i_np_est > 0.0f;

    if (upper_too_high == positive_current_charges_upper) {
        return pair.negative_np_current;
    }
    return pair.positive_np_current;
}
```

`i_np_est` 由三相电流和当前开关状态估算，含义是“当前状态会让中点电流往哪个方向流”。初学时可以先用低压母线和小电流验证符号，不要直接上高压。

## 5. 中点平衡控制律

最简单的方式是滞环选择：

```c
typedef struct {
    float upper_cap_voltage;
    float lower_cap_voltage;
    float band;
} neutral_balance_t;

int neutral_balance_request(neutral_balance_t nb)
{
    float err = nb.upper_cap_voltage - nb.lower_cap_voltage;
    if (err > nb.band) return -1;
    if (err < -nb.band) return 1;
    return 0;
}
```

返回 0 时优先选择损耗更小或序列更对称的状态；返回非 0 时优先选择能把中点拉回来的冗余状态。

## 6. 调制流程

| 步骤 | 动作 | 输出 |
| --- | --- | --- |
| 1 | 计算 $v_\alpha,v_\beta$ | 参考矢量 |
| 2 | 判断大扇区和小三角区 | 相邻矢量集合 |
| 3 | 计算作用时间 | $T_1,T_2,T_0$ |
| 4 | 查询冗余状态 | 候选开关序列 |
| 5 | 根据中点误差选择 | 最终 P/O/N 序列 |
| 6 | 写入 PWM 比较寄存器 | 三电平门极波形 |

## 7. 调试风险

| 风险 | 表现 | 检查方法 |
| --- | --- | --- |
| 中点漂移 | 两个母线电容电压逐渐分开 | 低压先测 $V_{C1},V_{C2}$ |
| 门极互锁错误 | 同桥臂短路或异常发热 | 示波器检查 P/O/N 状态 |
| 冗余矢量选反 | 平衡控制越调越偏 | 反向测试中点电流估计 |
| 死区补偿缺失 | 小电流畸变明显 | 低速空载看相电流 |

三电平 SVPWM 的关键不是“矢量数量更多”，而是电压合成和中点能量管理同时存在。先让电压合成正确，再让中点平衡收敛，调试风险会低很多。
