---
date: 2026-06-21
section: 电机控制
chapter: learning-workspace
chapterTitle: 学习工作区
chapterOrder: 5
category: 学习工作区
source: motor
visibility: public
title: 学习资源清单
tags:
  - motor-control
status: learning
summary: "- [电控知识库](../README.md) - 14条学习路径、100+模块的完整知识体系 - [交叉引用映射表](../cross-reference/cross-reference-map.md) - 模块间关联索引"
navGroup: 入门与索引
navGroupOrder: 10
---

# 学习资源清单

## 核心知识库

- [电控知识库](../README.md) - 14条学习路径、100+模块的完整知识体系
- [交叉引用映射表](../cross-reference/cross-reference-map.md) - 模块间关联索引

## 算法路径

- [ALG-00 电流环物理直觉](../algorithm/ALG-00-Current-Loop-Intuition.md) - PI参数的物理直觉
- [ALG-01 FOC理论基础](../algorithm/ALG-01-FOC-Theory.md) - Clarke/Park/SVPWM
- [ALG-03 PI电流调节器](../algorithm/ALG-03-PI-Current-Regulator.md) - 电流环设计
- [ALG-05 有感FOC实现](../algorithm/ALG-05-Sensored-FOC.md) - 完整FOC工程实现
- [ALG-07 无感FOC观测器](../algorithm/ALG-07-Sensorless-Observers.md) - SMO/磁链/EKF
- [ALG-09 高频注入法](../algorithm/ALG-09-High-Frequency-Injection.md) - 零低速位置估计

## 控制理论路径

- [CT-04 PID控制原理](../control-theory/CT-04-PID-Control-Principles.md)
- [CT-14 三环级联PID](../control-theory/CT-14-Cascaded-PID-Control.md)
- [CT-16~18 ADRC/LADRC](../control-theory/CT-16-ADRC-Theory.md)
- [CT-19 MPC](../control-theory/CT-19-Model-Predictive-Control.md)

## 硬件路径

- [HW-01 电机本体](../hardware/HW-01-Motor-Basics.md)
- [HW-02 电流采样](../hardware/HW-02-Current-Sensing.md)
- [HW-05 功率器件](../hardware/HW-05-Power-Devices-Gate-Drivers.md)

## 开源项目分析

- [ODrive代码分析](../ODrive/OD-01-Architecture.md) - FreeRTOS伺服驱动器
- [VESC代码分析](../VESC/VC-01-Architecture.md) - ChibiOS电动载具控制器
- [ODrive vs VESC对比](../COMPARISON/COMP-01-ODrive-vs-VESC.md)

## 代码实践

- [lxfoc库](../../lxfoc/lxfoc.h) - 完整FOC算法库C实现
- [MC_LIB](../../MC_LIB/) - 电机控制库（浮点/定点双版本）
- [AxDr](../../AxDr/) - STM32G4 FOC工程

## 交互式工具

- [PI参数计算器](../algorithm/ALG-00-PI-Calculator.html)
- [零极点对消动画](../algorithm/ALG-00-Pole-Zero-Animation.html)

## 外部资源

- IEEE TPEL 2026: "Discrete-Time Nonlinear Flux Observer for Sensorless SPMSM Drives with Low Carrier Ratios"
- TI Application Note: "Sensorless FOC for PMSM"
- ST AN1078: "Sensorless PMSM Field Oriented Control"
