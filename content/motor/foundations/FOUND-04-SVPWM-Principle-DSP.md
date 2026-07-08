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
title: FOUND-04 SVPWM原理与DSP实现：用相邻矢量合成参考电压
tags:
  - motor-control
  - svpwm
  - dsp
status: learning
summary: "用空间矢量图解释SVPWM的扇区、作用时间、零矢量分配和三相占空比计算，并给出DSP实现骨架。"
navGroup: 控制与算法
navGroupOrder: 30
order: 8
---

# FOUND-04 SVPWM原理与DSP实现：用相邻矢量合成参考电压

SVPWM 不再把三相看成三条独立正弦，而是把逆变器的开关状态看成空间矢量。参考电压落在哪个扇区，就用该扇区相邻的两个有效矢量和零矢量在一个PWM周期内加权合成。

![SVPWM 六扇区空间矢量图](assets/svpwm-sector-map.svg)

## 1. 六个有效矢量

两电平三相逆变器每相只有上管或下管两种状态，共有 8 个状态。其中 `000` 和 `111` 是零矢量，其余 6 个是有效矢量。

| 矢量 | 开关状态 | 角度 |
| --- | --- | --- |
| V1 | 100 | 0 度 |
| V2 | 110 | 60 度 |
| V3 | 010 | 120 度 |
| V4 | 011 | 180 度 |
| V5 | 001 | 240 度 |
| V6 | 101 | 300 度 |

## 2. 作用时间

在某个扇区内，参考矢量由相邻两个有效矢量合成：

$$
\vec{V}_{ref} T_s = \vec{V}_x T_1 + \vec{V}_y T_2 + \vec{V}_0 T_0
$$

并且：

$$
T_0 = T_s - T_1 - T_2
$$

若 $T_1+T_2>T_s$，说明进入过调制或电压请求过大，需要限幅。

## 3. 常用DSP实现：先算三相等效时间

工程代码常用 Clarke 坐标下的 $v_\alpha,v_\beta$ 先判断扇区，再计算占空比。下面是便于理解的骨架，实际工程会把除法和三角函数替换成查表或定点运算。

```c
typedef struct {
    float duty_a;
    float duty_b;
    float duty_c;
    int sector;
} svpwm_out_t;

static int svpwm_sector(float alpha, float beta)
{
    float x = beta;
    float y = 0.86602540378f * alpha - 0.5f * beta;
    float z = -0.86602540378f * alpha - 0.5f * beta;
    int n = 0;
    if (x > 0.0f) n += 1;
    if (y > 0.0f) n += 2;
    if (z > 0.0f) n += 4;
    static const int map[8] = {0, 2, 6, 1, 4, 3, 5, 0};
    return map[n];
}

svpwm_out_t svpwm_step(float alpha, float beta)
{
    float va = alpha;
    float vb = -0.5f * alpha + 0.86602540378f * beta;
    float vc = -0.5f * alpha - 0.86602540378f * beta;

    float vmax = va;
    if (vb > vmax) vmax = vb;
    if (vc > vmax) vmax = vc;
    float vmin = va;
    if (vb < vmin) vmin = vb;
    if (vc < vmin) vmin = vc;

    float vzero = -0.5f * (vmax + vmin);

    svpwm_out_t out;
    out.duty_a = 0.5f + va + vzero;
    out.duty_b = 0.5f + vb + vzero;
    out.duty_c = 0.5f + vc + vzero;
    out.sector = svpwm_sector(alpha, beta);
    return out;
}
```

这段使用的是零序注入等价形式。它和扇区作用时间法本质一致，但代码更短，适合先验证概念。

## 4. 与SPWM的区别

| 维度 | SPWM | SVPWM |
| --- | --- | --- |
| 思考方式 | 三相分别比较载波 | 空间矢量合成 |
| 母线利用率 | 较低 | 更高 |
| 与FOC接口 | 需要从dq变回abc | 直接接收alpha-beta |
| 工程复杂度 | 低 | 中 |
| 常见用途 | 入门、低成本控制 | FOC主流方案 |

## 5. 调试顺序

先让 $v_\alpha,v_\beta$ 画圆，确认扇区顺序是 1 到 6 循环。再检查三相占空比是否都在 0 到 1 内。最后上电低压测试，观察相电流是否平滑。如果扇区跳变顺序错，通常是 Clarke/Park 符号约定或相序接反。
