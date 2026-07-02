---
title: 过调制与六阶梯波仿真 — 线性区 → 过调制 → 六阶梯波
date: 2026-07-02
section: 电机控制
chapter: 02-Simulations
chapterTitle: 仿真专题
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/OvermodulationSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/OvermodulationSim.vue
chapterOrder: 20
---

# 过调制与六阶梯波仿真 — 线性区 → 过调制 → 六阶梯波

#### 过调制与六阶梯波仿真 — 线性区 → 过调制 → 六阶梯波

## 过调制 (Over-modulation) 原理

**线性 SVPWM 区 (m&#8804;1)：**参考矢量轨迹在六边形内切圆内，输出基波与调制指令近似线性，电流环看到的对象最接近理想电压源。零序注入形成马鞍波，但不会改变线电压基波线性关系。

**过调制区 (1
