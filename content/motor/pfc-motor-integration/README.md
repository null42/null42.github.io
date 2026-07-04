---
date: 2026-06-08
section: 电机控制
chapter: pfc-motor-integration
chapterTitle: PFC 与电机系统
chapterOrder: 40
category: PFC 与电机系统
source: motor
visibility: public
title: PFC与电机控制集成（PFC-Motor Integration）
tags:
  - motor-control
status: learning
summary: "**板块概述：** 从功率链路到控制协同，系统掌握PFC与电机控制的联合设计"
navGroup: 控制与算法
navGroupOrder: 30
---

# PFC与电机控制集成（PFC-Motor Integration）

**板块概述：** 从功率链路到控制协同，系统掌握PFC与电机控制的联合设计

---

##  板块概述

本板块聚焦 **PFC（功率因数校正）与电机控制的系统集成问题**——当PFC前级与电机逆变器后级共存于同一功率链路、同一MCU、同一母线电容时，如何实现从AC输入到电机输出的全链路协同设计。

这不是简单地将PP-04（PFC原理）和ALG-01（FOC理论）拼接，而是要解决两者耦合带来的工程难题：母线电容纹波叠加、控制环带宽冲突、制动能量管理、EMI频谱干扰、保护阈值配合、ADC资源争抢……

**核心认知：** PFC+电机不是"1+1=2"，而是"1+1>2"的系统工程——单独看PFC和电机控制都不难，难的是让它们在同一块PCB上、同一个MCU里和谐共存。

---

##  文档列表

| 编号 | 文档 | 难度 | 核心内容 |
|------|------|------|---------|
| PMI-01 | [PFC与电机控制系统架构](./PMI-01-PFC-Motor-System-Architecture.md) |  | 完整功率链路、PFC拓扑选择、母线电容设计、单芯片集成方案 |
| PMI-02 | [PFC与电机控制协同](./PMI-02-PFC-Motor-Control-Coordination.md) |  | 双环协同控制、制动能量管理、EMI协同设计、保护协调 |
| PMI-03 | [家电变频专题](./PMI-03-Appliance-Variable-Frequency.md) |  | 家电变频架构、压缩机驱动、单芯片PFC+FOC方案、成本优化、认证 |

---

##  与其他板块的交叉关系

| 关联板块 | 关联文档 | 关联内容 |
|---------|---------|---------|
| power-path | [PP-04-PFC-Power-Factor-Correction](../power-path/PP-04-PFC-Power-Factor-Correction.md) | PFC原理、Boost PFC控制、THD优化 |
| power-path | [PP-07-Power-Conversion-Motor-Drive](../power-path/PP-07-Power-Conversion-Motor-Drive.md) | 功率变换与电机驱动 |
| advanced/system-methodology | [SYS-03-PFC-vs-Motor-Control](../advanced/system-methodology/SYS-03-PFC-vs-Motor-Control.md) | PFC与FOC方法论对比、代码架构统一 |
| algorithm | [ALG-01-FOC-Theory](../algorithm/ALG-01-FOC-Theory.md) | FOC双环控制基础 |
| algorithm | [ALG-03-PI-Current-Regulator](../algorithm/ALG-03-PI-Current-Regulator.md) | PI参数整定 |
| advanced/algorithm | [ADV-ALG-01-Bandwidth-Filter](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md) | 控制环带宽设计 |
| hardware | [HW-06-Power-Management-Protection](../hardware/HW-06-Power-Management-Protection.md) | 功率管理与保护 |
| hardware | [HW-07-Thermal-EMC-Design](../hardware/HW-07-Thermal-EMC-Design.md) | 热设计与EMC |

---

##  学习路径建议

### 路径A：从PFC原理到系统集成（推荐PFC初学者）

```text
PP-04 PFC原理 → SYS-03 PFC vs FOC方法论 → PMI-01 系统架构 → PMI-02 控制协同 → PMI-03 家电专题
```

**适用人群：** 已掌握FOC，但PFC经验不足的工程师

**预计时间：** 3~4周

### 路径B：从家电产品切入（推荐家电开发工程师）

```text
PMI-03 家电变频专题 → PMI-01 系统架构 → PP-04 PFC原理（按需深入）→ PMI-02 控制协同
```

**适用人群：** 从事空调/冰箱/洗衣机变频开发的工程师

**预计时间：** 2~3周

### 路径C：系统架构师快速通览（推荐资深工程师）

```text
PMI-01 架构概览 → PMI-02 协同设计要点 → 按需深入各专题
```

**适用人群：** 需要快速掌握PFC+电机集成设计要点的架构师

**预计时间：** 1周

---

##  前置知识要求

| 知识领域 | 最低要求 | 推荐掌握 |
|---------|---------|---------|
| FOC控制 | 理解双环结构（电流环+速度环） | ALG-01 + ALG-03 + ALG-05 |
| PFC基础 | 理解Boost PFC工作原理 | PP-04 |
| 电力电子 | 理解整流、逆变基本概念 | EE-08 |
| 嵌入式开发 | 熟悉STM32/GD32外设配置 | HW-04 |
| 控制理论 | 理解PI控制器和带宽概念 | CT-04 + CT-05 |
