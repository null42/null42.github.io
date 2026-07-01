---
title: 启动定位与预定位仿真 -- 电感饱和法 / 预定位 / 高频注入法对比
date: 2026-07-01
section: 电机控制
chapter: 02-Simulations
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/InitialPositionSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/InitialPositionSim.vue
---

# 启动定位与预定位仿真 -- 电感饱和法 / 预定位 / 高频注入法对比

#### 启动定位与预定位仿真 -- 电感饱和法 / 预定位 / 高频注入法对比

## 初始位置检测方法原理对比

**电感饱和法：**利用凸极效应（$L_d \neq L_q$），向6个方向注入等幅等宽电压脉冲，比较各方向电流响应。电感最小的方向（即d轴方向）电流最大。通过N/S极判断消除180°模糊。优点：转子不转动；缺点：需要凸极效应。

**预定位 (DC Alignment)：**给定固定 d 轴电压/电流矢量（I_d为主，I_q≈0），转子在磁阻转矩和永磁转矩作用下被拉向目标轴。本质不是“读取角度”，而是用物理运动换取已知初始零位；风险是转子会突然转动，负载机械端可能反冲或撞限位。

**高频注入法 (脉振)：**在估计d轴注入高频正弦电压，q轴高频电流响应包含位置误差信息 $\propto \sin(2\theta_{err})$。通过乘法解调+低通滤波提取误差信号，PLL跟踪收敛到真实位置。优点：精度最高（±3°），转子不转动；缺点：实现复杂，需要凸极效应。

**选型建议：**允许转子转动 → 预定位（首选）；不允许转动 + 凸极效应 → 高频注入（最佳精度）或电感饱和法（实现简单）；SPMSM不允许转动 → INFORM法。
