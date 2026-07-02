---
title: 教程 0038：三相 SRF-PLL 锁相
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0038-three-phase-srf-pll.html
status: learning
visibility: public
summary: Imported from 0038-three-phase-srf-pll.html
chapterOrder: 10
---

# 教程 0038：三相 SRF-PLL 锁相

中文主讲。一个概念：三相并网设备用同步旋转坐标系锁相环把 dq 坐标的角度对准电网。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只讨论公开 SRF-PLL 结构，不记录公司锁相参数、滤波器系数或异常电网策略。

## 1. 它是什么

同步旋转坐标系锁相环（synchronous reference frame PLL / SRF-PLL）先对三相电网电压做 Clarke/Park 变换，再把 q 轴电压调到 0。q 轴为 0 时，估算角度 theta 与电网电压矢量对齐。

## 2. 为什么 UPS 需要它

三相 Vienna PFC、并网 PCS 和旁路同步都需要知道电网相位。没有可靠 PLL，dq 电流环的 d/q 含义会漂移，P/Q 控制也会把有功和无功混在一起。

## 3. 物理直觉

把 theta 想成一只旋转的手电筒。如果它正好照向电网电压矢量，侧向阴影 q 轴为 0；如果它偏左或偏右，q 轴误差会告诉 PI 控制器该加速还是减速。

## 4. 数学形式

vq = -v_alpha * sin(theta) + v_beta * cos(theta)
omega = omega_nominal + PI(0 - vq)
theta = theta + omega * Ts

三相 SRF-PLL 比单相 SOGI/SRF-PLL 少一个构造正交信号的步骤，因为三相本身能经 Clarke 变换得到 alpha/beta。

## 5. 一个仿真任务与仿真观察

给三相电压加入 10 度初始相位误差，观察 `vq` 收敛到 0、`theta_err` 收敛到锁定带内。再加入电压跌落，观察 PLL 带宽和噪声的折中。

产物

- 一张 vq、频率估算和相位误差曲线。
- 一句导师问题：锁相带宽优先抗扰动还是抗噪声？

## 6. 固件落地

控制 ISR 中常见顺序是采样 `vabc`，执行 Clarke/Park，运行 PLL PI，限幅频率，积分 theta，再把 theta 提供给 PFC 或 PCS 电流环。

## 7. 常见误解

- **误解：**三相 PLL 不需要滤波。
**纠正：**不平衡、谐波和采样噪声仍会进入 vq。
- **误解：**PLL 越快越好。
**纠正：**带宽越高，噪声越容易进 theta。

## 8. 验收标准

- 能说明 SRF-PLL 为什么控制 vq 到 0。
- 能画出 vabc -> Clarke -> Park -> PI -> theta 的链路。
- 能区分单相 PLL 和三相 PLL 的正交信号来源。

## 9. 复盘问题

- 如果 theta 滞后电网，vq 的符号会怎样影响 omega？
- 电压跌落时，PLL 是否应该立即判失锁？

## 10. 导师问题

- 真实三相 UPS/PCS 中，PLL 失锁通常如何传递给模式状态机？
- 我只记录通用锁相结构，不记录内部带宽和阈值。

**下一步：**用 PLL 角度进入 dq 电流环解耦。

源稿：`concepts/control/three-phase-srf-pll.md`

上一节：教程 0037：三相功率与 dq 坐标变换下一节：教程 0039：三相 dq 电流环解耦
