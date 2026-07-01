---
title: 死区补偿仿真 -- 电压误差分析与补偿策略对比
date: 2026-07-01
section: 电机控制
chapter: 02-Simulations
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/DeadtimeCompSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/DeadtimeCompSim.vue
---

# 死区补偿仿真 -- 电压误差分析与补偿策略对比

#### 死区补偿仿真 -- 电压误差分析与补偿策略对比

## 死区效应与补偿策略原理

**理论模型：**平均意义下 ΔVdead ≈ Vdc·Tdead/Ts·sign(i)。电流为正/负时体二极管续流路径不同，实际相电压相对指令产生相反偏差；本仿真用 Vdc={{ vdc }}V 计算幅值。

**过零难点：**当 |i| 很小时，采样噪声、比较器延迟和电流纹波会让 sign(i) 不可靠。工程上不能直接硬切换补偿符号，通常要设置钳位区、滞环或低通，否则会在过零处注入新的抖动。

**补偿不足 / 过补偿：**补偿不足时电流过零仍被压扁，低速转矩脉动明显；过补偿时过零出现尖角或反向台阶，等效把死区误差“补反了”。判断标准不是波形看着更圆，而是 dq 电流低次谐波、转矩脉动和噪声是否下降。

**方法适用条件：**平均电压前馈适合资源受限 MCU；PWM 占空比修正适合死区、驱动延迟和器件压降可标定的平台；观测器补偿适合温漂、器件差异明显的高性能伺服，但参数不稳会放大噪声。
