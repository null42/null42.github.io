---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：三相功率与 dq 坐标变换
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0037-three-phase-power-dq-transform.html` 的源稿。它只讨论公开三相理论和教学参数，不包含公司内部采样标定、真实项目额定功率或控制器参数。
---

# 概念：三相功率与 dq 坐标变换

本页是 `lessons/0037-three-phase-power-dq-transform.html` 的源稿。它只讨论公开三相理论和教学参数，不包含公司内部采样标定、真实项目额定功率或控制器参数。

## 它是什么

三相系统（three-phase system）包含 A/B/C 三个相差 120 度的交流量。Clarke 变换（Clarke transform）把三相量变成 alpha/beta 两轴；Park 变换（Park transform）再把 alpha/beta 转到旋转 dq 坐标。

## 为什么 UPS/PCS 需要它

三相 UPS、Vienna PFC、三电平逆变器和 PCS 都要用 dq 坐标表达电流、功率和电压控制目标。

## 数学形式

```text
alpha = xa
beta  = (xa + 2 * xb) / sqrt(3)
d =  alpha * cos(theta) + beta * sin(theta)
q = -alpha * sin(theta) + beta * cos(theta)
```

## 一个仿真任务

生成三相正弦量，比较 abc、alpha/beta 和 d/q。把 theta 偏置 10 度，观察 q 轴偏置。

## 验收标准

- 能手写 Clarke/Park 公式。
- 能解释 dq 是坐标变化，不是新硬件量。
- 能说明 d/q 和 P/Q 的关系依赖 theta 对齐方式。

## 复盘问题

- 为什么对称三相可以由两个独立变量表示？
- theta 错误会怎样污染 q 轴？

## 导师问题

阅读三相代码时，theta 来源通常从哪个模块确认？只讨论通用阅读路径，不记录公司内部实现。
