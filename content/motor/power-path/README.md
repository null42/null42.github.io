---
date: 2026-06-01
section: 电机控制
chapter: power-path
chapterTitle: 功率链路
chapterOrder: 40
category: 功率链路
source: motor
visibility: public
title: 功率路径 (Power Path)
tags:
  - motor-control
status: learning
summary: "| 编号 | 标题 | 文件 | |------|------|------| | PP-01 | DCDC基本拓扑 | PP-01-DCDC-Fundamental-Topologies.md | | PP-02 | 隔离DCDC | PP-02-Isolated-DCDC-Flyback-Forward-PushP"
navGroup: 基础与硬件
navGroupOrder: 20
---

# 功率路径 (Power Path)

## 模块列表

| 编号 | 标题 | 文件 |
|------|------|------|
| PP-01 | DCDC基本拓扑 | PP-01-DCDC-Fundamental-Topologies.md |
| PP-02 | 隔离DCDC | PP-02-Isolated-DCDC-Flyback-Forward-PushPull.md |
| PP-03 | LLC谐振变换器 | PP-03-LLC-Resonant-Converter.md |
| PP-04 | PFC功率因数校正 | PP-04-PFC-Power-Factor-Correction.md |
| PP-05 | 磁件设计 | PP-05-Magnetic-Design.md |
| PP-06 | 环路补偿 | PP-06-Loop-Compensation.md |
| PP-07 | 功率变换与电机驱动 | PP-07-Power-Conversion-Motor-Drive.md |

## 学习路径

DCDC设计：PP-01 → PP-02 → PP-03 → PP-05 → PP-06
ACDC设计：PP-04 → PP-05 → PP-06
电机驱动前级：PP-01 → PP-04 → PP-07
