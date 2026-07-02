---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：PCS 并网跟随型 P/Q 控制
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0043-pcs-grid-following-pq-control.html` 的源稿。
---

# 概念：PCS 并网跟随型 P/Q 控制

本页是 `lessons/0043-pcs-grid-following-pq-control.html` 的源稿。

## 它是什么

储能变流器（power conversion system / PCS）连接电池和电网。并网跟随型控制（grid-following control / GFL）用 PLL 跟随电网，有功无功控制（active and reactive power control / P/Q control）生成 id/iq 电流参考。

## 为什么 UPS/PCS 需要它

UPS 的三相 PLL、电流环、SVPWM 和状态机可迁移到 PCS。PCS 进一步加入充放电功率调度和电网交互。

## 数学形式

```text
id_ref = 2 * P_ref / (3 * Vd)
iq_ref = -2 * Q_ref / (3 * Vd)
```

## 一个仿真任务

让 P_ref 和 Q_ref 分别阶跃，观察 id/iq 和 P/Q 的跟随。

## 验收标准

- 能解释 GFL 为什么依赖 PLL。
- 能把 P/Q 指令转换为 id/iq 指令。
- 能说明充电和放电的功率方向约定。

## 导师问题

PCS 中 P/Q 限幅通常在指令层、外环还是状态机中处理？
