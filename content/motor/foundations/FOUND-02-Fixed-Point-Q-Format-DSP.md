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
title: FOUND-02 定点数与Q格式：让没有FPU的DSP稳定跑FOC
tags:
  - motor-control
  - fixed-point
  - dsp
status: learning
summary: "解释Q格式、缩放、乘法移位、饱和、查表和定点PI实现，重点避免溢出和精度损失。"
navGroup: 控制与算法
navGroupOrder: 30
order: 6
---

# FOUND-02 定点数与Q格式：让没有FPU的DSP稳定跑FOC

定点数的本质是“整数存储，小数解释”。DSP 只保存整数，但我们约定这个整数的小数点在哪里。Q15 中，整数 `16384` 表示 $0.5$，因为它等于 $0.5\cdot 2^{15}$。

![Q15 定点数位布局](assets/q-format-bit-layout.svg)

## 1. Q 格式的直觉

```mermaid
flowchart LR
    A["真实值 0.5"] --> B["乘以 32768"]
    B --> C["整数 16384"]
    C --> D["DSP 乘加运算"]
    D --> E["再除以 32768"]
```

Qm.n 表示整数部分有 m 位，小数部分有 n 位。电机控制里常见的是 Q15、Q14、Q30。

$$
x_{q15}=round(x\cdot 2^{15})
$$

$$
x=\frac{x_{q15}}{2^{15}}
$$

| 格式 | 存储类型 | 表示范围 | 分辨率 | 用途 |
| --- | --- | --- | --- | --- |
| Q15 | int16 | $[-1,1)$ | $1/32768$ | sin、cos、duty |
| Q14 | int16 | $[-2,2)$ | $1/16384$ | 允许超过 1 pu 的中间量 |
| Q30 | int32 | $[-2,2)$ 附近 | $1/2^{30}$ | Q15 乘法临时结果 |
| Q28 | int32 | 更大动态范围 | $1/2^{28}$ | PI 积分器 |

## 2. 乘法为什么要移位

两个 Q15 相乘：

$$
(a\cdot 2^{15})(b\cdot 2^{15})=ab\cdot 2^{30}
$$

所以结果先是 Q30。要回到 Q15，必须右移 15 位：

$$
y_{q15}=sat16((a_{q15}\cdot b_{q15}) >> 15)
$$

如果不右移，数值会膨胀 $2^{15}$ 倍；如果右移前不做 32 位保存，会在乘法阶段溢出。

## 3. 最小可用代码

```c
#include <stdint.h>

static inline int16_t sat16(int32_t x)
{
    if (x > 32767) return 32767;
    if (x < -32768) return -32768;
    return (int16_t)x;
}

static inline int16_t q15_from_float(float x)
{
    if (x >= 0.999969f) x = 0.999969f;
    if (x < -1.0f) x = -1.0f;
    return (int16_t)(x * 32768.0f);
}

static inline float q15_to_float(int16_t x)
{
    return (float)x / 32768.0f;
}

static inline int16_t q15_mul(int16_t a, int16_t b)
{
    int32_t p = (int32_t)a * (int32_t)b;
    p += (p >= 0) ? (1 << 14) : -(1 << 14);
    return sat16(p >> 15);
}
```

这里的舍入很重要。若直接右移，负数和正数的截断误差不对称，长时间积分会产生小偏置。

## 4. 定点 PI 控制器

电流误差用 Q15，比例增益用 Q15，积分累加器用 Q30 或 Q28。不要让积分器只用 int16，否则一两个周期就可能饱和。

```c
typedef struct {
    int16_t kp_q15;
    int16_t ki_ts_q15;
    int32_t integ_q30;
    int16_t out_min_q15;
    int16_t out_max_q15;
} pi_q15_t;

int16_t pi_q15_step(pi_q15_t *pi, int16_t ref, int16_t fb)
{
    int16_t err = sat16((int32_t)ref - fb);
    int16_t p = q15_mul(pi->kp_q15, err);
    int32_t delta_i = (int32_t)pi->ki_ts_q15 * err;
    pi->integ_q30 += delta_i;

    int32_t u = (int32_t)p + (pi->integ_q30 >> 15);

    if (u > pi->out_max_q15) {
        u = pi->out_max_q15;
        if (err > 0) pi->integ_q30 -= delta_i;
    }
    if (u < pi->out_min_q15) {
        u = pi->out_min_q15;
        if (err < 0) pi->integ_q30 -= delta_i;
    }
    return (int16_t)u;
}
```

## 5. sin/cos 查表

FOC 里 Park 变换离不开 sin 和 cos。定点 DSP 常用查表加线性插值。

```c
#define SIN_TABLE_BITS 10
#define SIN_TABLE_SIZE (1 << SIN_TABLE_BITS)

extern const int16_t sin_table_q15[SIN_TABLE_SIZE + 1];

int16_t sin_q15(uint16_t angle)
{
    uint16_t index = angle >> (16 - SIN_TABLE_BITS);
    uint16_t frac = angle & ((1u << (16 - SIN_TABLE_BITS)) - 1u);
    int16_t y0 = sin_table_q15[index];
    int16_t y1 = sin_table_q15[index + 1];
    int32_t dy = (int32_t)y1 - y0;
    return sat16((int32_t)y0 + ((dy * frac) >> (16 - SIN_TABLE_BITS)));
}
```

角度用 `uint16_t` 表示一整圈，0 到 65535 对应 0 到 $2\pi$。这样角度自动回绕，不需要额外取模。

## 6. 定点迁移顺序

| 步骤 | 目的 | 验收 |
| --- | --- | --- |
| 先标幺化 | 缩小动态范围 | 主要变量在 -1 到 1 附近 |
| 选 Q 格式 | 决定范围和分辨率 | 最大值不会溢出，最小变化可分辨 |
| 写饱和函数 | 防止异常扩散 | 每个乘加出口都有边界 |
| 替换单个模块 | 便于定位误差 | float 与 fixed 输出误差可量化 |
| 上硬件前回放日志 | 离线验证 | 同一输入下波形趋势一致 |

定点实现不是把 `float` 全部替换成 `int16_t`。正确顺序是先证明范围，再证明精度，最后才追求速度。
