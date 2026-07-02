---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：三相 SRF-PLL 锁相
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0038-three-phase-srf-pll.html` 的源稿。只记录公开锁相结构，不记录内部参数。
---

# 概念：三相 SRF-PLL 锁相

本页是 `lessons/0038-three-phase-srf-pll.html` 的源稿。只记录公开锁相结构，不记录内部参数。

## 它是什么

同步旋转坐标系锁相环（synchronous reference frame PLL / SRF-PLL）用三相电压的 q 轴误差调整估算频率和相位，使 q 轴电压收敛到 0。

## 为什么 UPS/PCS 需要它

三相 PFC、并网 PCS 和旁路同步需要电网角度。PLL 失锁会让 dq 电流环和 P/Q 控制失去物理含义。

## 数学形式

```text
vq = -v_alpha * sin(theta) + v_beta * cos(theta)
omega = omega_nominal + PI(0 - vq)
theta = theta + omega * Ts
```

## 一个仿真任务

加入初始相位误差，观察 vq、theta_err 和 f_est 收敛；再加入电压跌落，观察锁定状态。

## 验收标准

- 能说明为什么控制 vq 到 0 就能锁相。
- 能画出 vabc -> Clarke -> Park -> PI -> theta。
- 能区分单相 PLL 和三相 PLL 的正交信号来源。

## 导师问题

PLL 失锁在真实工程中通常如何传递给状态机？只记录公开原则。
