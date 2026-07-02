---
title: MOSFET 开关波形仿真
date: 2026-07-02
section: 电机控制
chapter: 02-Simulations
chapterTitle: 仿真专题
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/MosfetSwitchingSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/MosfetSwitchingSim.vue
chapterOrder: 20
---

# MOSFET 开关波形仿真

#### MOSFET 开关波形仿真

## 📖 教学说明 — 理解 MOSFET 开关过程

##### 开关过程 7 个阶段

| 阶段 | 名称 | Vgs 变化 | Vds 变化 | 物理过程 |
| --- | --- | --- | --- | --- |
| 1 | td(on) 开通延迟 | 0 → Vth | = Vbus | 栅极电压通过 Rg 对 Ciss 充电，达到阈值前 MOSFET 不导通 |
| 2 | tr 上升时间 | = Vplateau | Vbus → Rdson·Id | **米勒平台**：Vgs 被钳位，栅极电流全部用于对 Cgd 放电，Vds 快速下降 |
| 3 | 尾部充电 | Vplateau → Vdrive | ≈ Rdson·Id | 米勒效应结束，Vgs 继续上升至驱动电压，沟道完全增强 |
| 4 | 导通保持 | = Vdrive | = Rdson·Id | MOSFET 完全导通，Vds 很小（导通压降） |
| 5 | td(off) 关断延迟 | Vdrive → Vplateau | ≈ Rdson·Id | Ciss 通过 Rg 放电至米勒平台电压 |
| 6 | tf 下降时间 | = Vplateau | Rdson·Id → Vbus | **米勒平台**：Vgs 再次被钳位，Cgd 充电使 Vds 上升 |
| 7 | 尾部放电 | Vplateau → 0 | = Vbus | Ciss 完全放电，沟道完全关断 |

##### 米勒平台原理

当 Vgs 达到 **Vplateau = Vth + Id/gm** 时，MOSFET 进入饱和区。此时栅极驱动电流不再给 Cgs 充电，而是**全部用于对米勒电容 Cgd 充放电**。Vgs 被"钳位"在 Vplateau，形成波形中的平坦区域（黄色高亮区）。

**关键公式**：米勒平台持续时间 `t_plateau = Rg · Qgd / (Vdrive - Vplateau)`，即 tr 和 tf 的长度。

##### 参数影响

- **Rg ↑** → 开关速度 ↓ → tr, tf 增大 → **开关损耗 ↑**，但 EMI ↓（di/dt 和 dv/dt 降低）

- **Vdrive ↑** → 开关速度 ↑ → tr, tf 减小 → 开关损耗 ↓，但需要确保 Vgs 不超过 ±20V 额定值

- **Ciss ↑**（大功率 MOSFET）→ 充放电时间 ↑ → 需要更大的栅极驱动电流

##### 开关损耗估算

单次开关能量（硬开关）：

`Esw ≈ 0.5 · Vbus · Id · (tr + tf)`

开关损耗功率（PWM 频率 fsw）：

`Psw = Esw · fsw`

**示例**：Vbus=48V, Id=10A, tr+tf=50ns, fsw=20kHz → Esw≈12μJ, Psw≈0.24W。若 tr+tf 增大到 200ns（Rg 过大），Psw 升至 ≈1W，散热需求显著增加。
