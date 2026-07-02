---
title: 教程 0042：三电平 NPC 逆变器
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0042-three-level-npc-inverter.html
status: learning
visibility: public
summary: Imported from 0042-three-level-npc-inverter.html
chapterOrder: 10
---

# 教程 0042：三电平 NPC 逆变器

中文主讲。一个概念：三电平 NPC 逆变器用 +、0、- 三种相电平降低器件电压应力和输出谐波。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只讲公开 NPC 拓扑和教学控制，不记录真实器件、驱动互锁或产品输出参数。

## 1. 它是什么

三电平 NPC 逆变器（three-level neutral-point-clamped inverter / NPC inverter）把每相输出钳位到 `+Vdc/2`、`0` 或 `-Vdc/2`。相比两电平桥，器件承受电压降低，输出 dv/dt 和滤波压力减小。

## 2. 为什么 UPS 需要它

中大功率三相 UPS 输出级需要高效率、低谐波和较低 EMI。NPC 逆变器适合高母线电压场景，但要增加中点平衡、更多开关状态和更严格的保护时序。

## 3. 物理直觉

两电平像只能在楼顶和地面之间跳；三电平多了中间平台。每一步更小，输出波形更接近正弦，但你必须管理中间平台的电荷平衡。

## 4. 数学形式

phase_state in {P, O, N}
P -> +Vdc / 2
O -> 0 through neutral clamp
N -> -Vdc / 2
neutral_current depends on O-state selection

三电平 SVPWM 中，小矢量存在冗余状态，冗余状态产生相同 alpha/beta 电压，但对中点电流作用相反。

## 5. 一个仿真任务与仿真观察

对比两电平和三电平相电压阶梯。观察三电平输出电压阶跃更小、滤波后电流纹波更低，但中点电压会随冗余状态选择漂移。

产物

- 一张两电平/三电平相电压对比图。
- 一张中点电压误差随冗余状态变化的曲线。

## 6. 固件落地

固件从 `svpwm_three_level()` 生成每相 P/O/N 状态，再映射到四个开关管的互补驱动。保护重点包括上下管直通、中点过偏、母线过压、输出过流和驱动故障。

## 7. 常见误解

- **误解：**三电平只是两电平多一个状态。
**纠正：**调制、保护和中点平衡都会复杂很多。
- **误解：**中点平衡只属于 PFC。
**纠正：**NPC 逆变器同样会影响中点电流。

## 8. 验收标准

- 能画出 P/O/N 三种相电平。
- 能解释 NPC 为什么降低器件电压应力。
- 能说明冗余小矢量和中点平衡的关系。

## 9. 复盘问题

- 为什么三电平输出滤波压力更小？
- 如果中点电压持续偏高，调制层可以怎样调整？

## 10. 导师问题

- 真实 UPS 输出级中，NPC 的中点平衡由调制层、外环还是单独控制器处理？
- 我只记录通用结构，不记录内部时序。

**下一步：**从 UPS 三相功率级扩展到储能 PCS 的并网控制。

源稿：`concepts/power-electronics/three-level-npc-inverter.md`

上一节：教程 0041：Vienna PFC 与中点电压平衡下一节：教程 0043：PCS 并网跟随型 P/Q 控制
