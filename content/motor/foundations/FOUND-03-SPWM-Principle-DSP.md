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
title: FOUND-03 SPWM原理与DSP实现：从正弦参考到定时器比较值
tags:
  - motor-control
  - spwm
  - dsp
status: learning
summary: "用载波比较解释SPWM，给出三相调制波、调制度、死区、中心对齐PWM和DSP定时器比较值实现。"
navGroup: 控制与算法
navGroupOrder: 30
order: 7
---

# FOUND-03 SPWM原理与DSP实现：从正弦参考到定时器比较值

SPWM 的思路非常直接：用三相正弦参考分别和同一个三角载波比较。参考值高于载波时上管导通，低于载波时下管导通。参考越高，脉冲越宽；参考越低，脉冲越窄。

![SPWM 正弦调制与三角载波](assets/spwm-carrier-animation.svg)

## 1. 三相参考波

三相电压参考为：

$$
v_a^*=m\sin(\theta)
$$

$$
v_b^*=m\sin(\theta-\frac{2\pi}{3})
$$

$$
v_c^*=m\sin(\theta+\frac{2\pi}{3})
$$

其中 $m$ 是调制度。在线性区内，$m$ 越大，输出基波电压越大。

```mermaid
flowchart LR
    A["电角度 theta"] --> B["生成三相正弦参考"]
    B --> C["归一化到 -1 到 1"]
    C --> D["映射到 duty 0 到 1"]
    D --> E["写入 PWM 比较寄存器"]
```

## 2. 从参考波到占空比

DSP 里通常不真的生成三角波去比较，而是直接把归一化参考换算成占空比：

$$
d_a=\frac{v_a^*+1}{2}
$$

$$
d_b=\frac{v_b^*+1}{2}
$$

$$
d_c=\frac{v_c^*+1}{2}
$$

若定时器采用中心对齐模式，周期寄存器为 `TBPRD`，比较值为：

$$
CMPA=d_a\cdot TBPRD
$$

这等价于“参考波和载波比较”，只是省掉了实时比较载波的步骤。

## 3. DSP 实现

```c
#include <math.h>

typedef struct {
    float duty_a;
    float duty_b;
    float duty_c;
} spwm_out_t;

static inline float clamp01(float x)
{
    if (x < 0.0f) return 0.0f;
    if (x > 1.0f) return 1.0f;
    return x;
}

spwm_out_t spwm_step(float theta, float modulation)
{
    const float two_pi_over_3 = 2.09439510239f;
    float va = modulation * sinf(theta);
    float vb = modulation * sinf(theta - two_pi_over_3);
    float vc = modulation * sinf(theta + two_pi_over_3);

    spwm_out_t out;
    out.duty_a = clamp01(0.5f + 0.5f * va);
    out.duty_b = clamp01(0.5f + 0.5f * vb);
    out.duty_c = clamp01(0.5f + 0.5f * vc);
    return out;
}

void spwm_write_timer(spwm_out_t u, unsigned period)
{
    PWM_CMPA = (unsigned)(u.duty_a * period);
    PWM_CMPB = (unsigned)(u.duty_b * period);
    PWM_CMPC = (unsigned)(u.duty_c * period);
}
```

## 4. 中心对齐、采样点和死区

中心对齐 PWM 让开关动作围绕周期中心对称，低次谐波更小，也方便在 PWM 中点附近采样电流。死区时间必须由互补 PWM 外设插入，不建议在算法层手动错开占空比，否则三相调制一致性会被破坏。

| 项目 | 建议 |
| --- | --- |
| PWM 模式 | 中心对齐，上下计数 |
| 电流采样 | 在载波中点或电流纹波较小处触发 ADC |
| 死区 | 由 PWM 外设插入，按功率器件开关速度配置 |
| 限幅 | duty 保持在安全边界，如 2% 到 98% |

## 5. SPWM 的局限

SPWM 容易理解，也容易实现，但直流母线利用率低于 SVPWM。它把三相当作三条独立正弦来调制，没有主动利用零序分量。若系统需要更高输出电压、更低谐波，或者要自然接入 FOC 的 $v_\alpha,v_\beta$，就应进入 SVPWM。

## 6. 调试方法

先不上功率，示波器只看三路 PWM。正确现象是三相占空比相差 120 电角度，调制度从 0 增大时占空比摆幅同步增大。

| 现象 | 可能原因 |
| --- | --- |
| 三相同相变化 | 角度偏移没有加正负 $2\pi/3$ |
| 某一相占空比反向 | 相序或符号约定错 |
| 低占空比丢脉冲 | 死区或最小脉宽限制太大 |
| 电流有尖峰 | ADC 采样点靠近开关瞬间 |
