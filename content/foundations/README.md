---
date: 2026-08-01
section: 共享基础
chapter: foundations-overview
chapterTitle: 共享基础入口
chapterOrder: 1
category: 共享基础
source: foundations
visibility: public
title: "共享基础：控制理论、电力电子与仿真方法"
tags:
  - foundations
  - 索引
status: learning
summary: "电机控制与电源控制的共享基础栏目，汇总通用控制理论、电力电子基础与仿真方法，避免跨栏目重复。"
navGroup: 入口与索引
navGroupOrder: 1
---

# 共享基础：控制理论、电力电子与仿真方法

本栏目汇集电机控制与电源控制两个领域共享的基础知识。这些概念原本分散在 `motor` 与 `power` 两个栏目中（如控制理论、电力电子基础、仿真方法），现抽取到此处统一维护，方便交叉引用与学习路径规划。

## 内容组织

| 路线 | 内容 | 适用范围 |
| --- | --- | --- |
| 控制理论 | 开环/闭环、时域频域、PID、状态空间、观测器、LQR/LQG、ADRC、MPC | 电机控制 + 电源控制 |
| 电力电子基础 | 电阻电容电感、二极管、BJT/MOSFET/IGBT、OpAmp、整流逆变、H 桥 | 电机控制 + 电源控制 |
| 仿真方法 | C 语言仿真、Matlab/Simulink、电源仿真 | 电机控制 + 电源控制 |

## 与其他栏目的关系

- `motor` 栏目聚焦电机本体、FOC、观测器、驱动器、ODrive/VESC 等电机专属内容
- `power` 栏目聚焦 UPS、PFC、逆变器、PCS 等电源专属内容
- 本栏目（`foundations`）提供两个领域共享的理论与工具基础

## 学习建议

1. 先从「控制理论」建立开环/闭环、PID、频域分析的直觉
2. 再从「电力电子基础」理解开关器件与基本拓扑
3. 最后从「仿真方法」学会用 C/Matlab/Simulink 验证理论
4. 带着这些基础再进入 `motor` 或 `power` 栏目的领域专题
