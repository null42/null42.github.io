---
title: Bode 图交互仿真
date: 2026-07-01
section: 电机控制
chapter: 02-Simulations
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/BodePlotSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/BodePlotSim.vue
---

# Bode 图交互仿真

#### Bode 图交互仿真

## 📖 教学说明 — 理解 Bode 图

##### 传递函数说明

当前传递函数为 `G(s) = K · (s/ωz+1) / ((s/ωp1+1)(s/ωp2+1))`，包含 **1 个零点**（分子）和 **2 个极点**（分母）。

- **增益 K**：使幅频曲线整体上移 20lg(K) dB，不影响相位。增大 K 使系统响应更快但可能降低稳定性。

- **零点 ωz**：幅频 +20dB/dec 转折，相位 +90°（超前）。零点可改善相位裕度，常用于补偿。

- **极点 ωp1, ωp2**：幅频 -20dB/dec 转折，相位 -90°（滞后）。每个极点贡献 -90° 相移，两个极点可达 -180°，导致不稳定。

##### 稳定性判据速查

| 指标 | 合格 | 良好 | 说明 |
| --- | --- | --- | --- |
| 相位裕度 PM | > 30° | > 45° | 系统对延迟的容忍度。PM 越大，超调越小，系统越"稳定"。 |
| 增益裕度 GM | > 6 dB | > 10 dB | 增益可增大多少倍才不稳定。GM 越大，对参数变化的鲁棒性越强。 |

**经验法则**：伺服系统通常要求 PM ≥ 45°、GM ≥ 10dB。当 PM

##### 典型场景预设

                低通滤波器
                超前补偿
                不稳定系统

点击预设按钮快速切换参数，观察 Bode 图和稳定裕度的变化。
