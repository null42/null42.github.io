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

SPWM 的思路很直接：用三相正弦参考分别和同一个三角载波比较，正弦高于载波时上管导通，低于载波时下管导通。正弦越高，占空比越大；正弦越低，占空比越小。

![SPWM 正弦调制与三角载波](assets/spwm-carrier-animation.svg)

## 1. 三相参考波

三相电压参考为：

$$
v_a^* = m \sin(\theta)
$$

$$
v_b^* = m \sin(\theta - \frac{2\pi}{3})
$$

$$
v_c^* = m \sin(\theta + \frac{2\pi}{3})
$$

其中 $m$ 是调制度。在线性区内，$m$ 越大，输出基波电压越大。

## 2. 从参考波到占空比

DSP里不会真的每个时刻生成三角波去比较，通常直接把归一化参考换算为占空比：

$$
d_a = \frac{v_a^* + 1}{2}
$$

$$
d_b = \frac{v_b^* + 1}{2}
$$

$$
d_c = \frac{v_c^* + 1}{2}
$$

若定时器采用中心对齐模式，周期寄存器为 `TBPRD`，比较值为：

$$
CMPA = d_a \cdot TBPRD
$$

## 3. DSP实现代码

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

## 4. 中心对齐与死区

中心对齐PWM让开关动作围绕周期中心对称，低次谐波更小，也方便在PWM中点附近采样电流。死区时间必须由硬件互补输出模块插入，不要在算法层手工错开占空比，否则会破坏三相一致性。

| 项目 | 建议 |
| --- | --- |
| PWM模式 | 中心对齐，上下计数 |
| 电流采样 | 在零矢量或电流纹波较小处触发ADC |
| 死区 | 由PWM外设插入，按功率器件开关速度配置 |
| 限幅 | duty 保持在安全边界，例如 2% 到 98% |

## 5. SPWM的局限

SPWM容易理解，也容易实现，但直流母线利用率低于SVPWM。若系统需要更高输出电压、更低谐波或更自然地接入FOC的 $v_d,v_q$，应使用SVPWM。
