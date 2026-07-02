---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：两电平 SVPWM
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0040-two-level-svpwm.html` 的源稿。
---

# 概念：两电平 SVPWM

本页是 `lessons/0040-two-level-svpwm.html` 的源稿。

## 它是什么

空间矢量脉宽调制（space vector pulse-width modulation / SVPWM）用相邻有效矢量和零矢量在一个 PWM 周期内平均合成目标 alpha/beta 电压。

## 为什么 UPS/PCS 需要它

三相逆变器、三相有源整流器和 PCS 都要把 dq 控制器输出的电压参考转换为三相占空比。

## 数学形式

```text
sector = angle(v_alpha, v_beta)
T1, T2 = adjacent_vector_times(v_alpha, v_beta, Vdc, Ts)
T0 = Ts - T1 - T2
```

## 一个仿真任务

扫描调制比，画出三相占空比和六扇区轨迹。

## 验收标准

- 能列出 6 个有效矢量和 2 个零矢量。
- 能解释 T1、T2、T0。
- 能说明 min-max 注入与零序注入的关系。

## 导师问题

项目代码使用扇区法、min-max 法还是查表法？只确认阅读入口。
