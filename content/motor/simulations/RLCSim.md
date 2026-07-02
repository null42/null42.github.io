---
title: RLC 充放电仿真
date: 2026-07-02
section: 电机控制
chapter: 02-Simulations
chapterTitle: 仿真专题
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/RLCSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/RLCSim.vue
chapterOrder: 20
---

# RLC 充放电仿真

#### RLC 充放电仿真

## 📖 教学说明 — 理解 RLC 电路响应

##### 电路原理

本仿真模拟 **串联 RLC 电路**在阶跃电压输入下的电容电压响应 Vc(t)。

**阻尼比计算公式**：`ζ = (R/2) · √(C/L)`

- **增大 R** → ζ 增大 → 阻尼增强 → 振荡衰减更快

- **增大 L** → ζ 减小 → 阻尼减弱 → 更容易振荡

- **增大 C** → ζ 增大、ωn 减小 → 响应变慢

##### 三种阻尼状态对比

| 状态 | 条件 | 波形特征 | 稳态建立 |
| --- | --- | --- | --- |
| 过阻尼 | ζ > 1 | 单调上升，无振荡 | 最慢 |
| 临界阻尼 | ζ = 1 | 单调上升，无振荡 | 最快（无超调） |
| 欠阻尼 | ζ

##### 电机控制中的应用

- **Buck 变换器 LC 输出滤波**：设计时需保证 ζ 足够大（通常 ≥ 0.5），避免输出电压振荡。过小的输出电容或过大的滤波电感会导致 ζ 过小。

- **EMI 滤波**：输入端的 LC 滤波器在特定频率可能谐振，需加阻尼电阻或 RC 吸收网络。

- **LLC 谐振变换器**：利用 LC 谐振实现 ZVS（零电压开关），工作在欠阻尼区（Q 值由负载决定）。

- **电流采样滤波**：电机相电流采样后的 RC 低通滤波，截止频率 fc = 1/(2πRC)，需远高于电流环带宽。
