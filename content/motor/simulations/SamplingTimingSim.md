---
title: ADC 电流采样时序 — 避开开关噪声的最佳采样时机
date: 2026-07-02
section: 电机控制
chapter: 02-Simulations
chapterTitle: 仿真专题
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/SamplingTimingSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/SamplingTimingSim.vue
chapterOrder: 20
---

# ADC 电流采样时序 — 避开开关噪声的最佳采样时机

#### ADC 电流采样时序 — 避开开关噪声的最佳采样时机

## 电流采样时序原理

**中心对齐 PWM 的窗口：**计数器上/下计数时，比较沿分布在周期两侧；Ts/2 顶点附近通常落在零矢量中心，远离桥臂切换沿。采样窗口不是一个点，而是“ADC 孔径时间内电流足够稳定”的安全区。

**开关噪声避让：**导通/关断边沿会带来 di/dt、驱动地弹、采样电阻恢复和运放饱和尾迹。死区越长、功率级越硬，边沿后需要避让的时间越长；随机采样或连续采样很容易把尖峰当成真实电流。

**一拍延迟：**典型流程是 ADC 触发 → 采样转换 → FOC 计算 → 下一个 PWM 更新事件装载，因此本周期采到的电流通常作用到下一拍电压矢量。高速时必须用 θcomp = ωe·Tdelay 做角度前馈补偿。

**常见误区：**“顶点采样一定最好”并不绝对；当占空比接近 0/100%、低边采样窗口消失或三电阻/单电阻拓扑不同，必须重新计算可采样窗口，必要时用双采样、相移 PWM 或重构算法。
