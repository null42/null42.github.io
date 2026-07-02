---
title: 教程 0039：三相 dq 电流环解耦
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0039-three-phase-current-loop-decoupling.html
status: learning
visibility: public
summary: Imported from 0039-three-phase-current-loop-decoupling.html
chapterOrder: 10
---

# 教程 0039：三相 dq 电流环解耦

中文主讲。一个概念：dq 电流环解耦把旋转坐标系里的交叉耦合项前馈抵消，让 d 轴和 q 轴更像两个独立电流环。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**本节只讲公开平均模型和教学 PI，不记录真实产品电感、带宽、限幅或电网适应策略。

## 1. 它是什么

dq 电流环解耦（dq current loop decoupling）针对三相电感在旋转坐标系中的交叉项。d 轴变化会影响 q 轴，q 轴变化也会影响 d 轴，解耦前馈用于抵消 `omega * L` 相关项。

## 2. 为什么 UPS 需要它

Vienna PFC、PCS 并网跟随型控制和三相逆变器都依赖快速电流环。没有解耦时，id 阶跃可能让 iq 抖动，导致功率因数、无功控制或输出电压质量变差。

## 3. 物理直觉

dq 坐标系本身在旋转，电感电流像在转盘上行走的人。你向前走时会被转盘带出侧向速度，解耦项就是提前给一个反向补偿。

## 4. 数学形式

vd_ref = PI(id_ref - id) - omega * L * iq + ed
vq_ref = PI(iq_ref - iq) + omega * L * id + eq

其中 `ed/eq` 是电网或输出电压前馈。符号要和本项目的 Park 变换定义一致，不能只背公式。

## 5. 一个仿真任务与仿真观察

设置 id 从 0 阶跃到 10 A，iq_ref 保持 0。对比有无解耦：无解耦时 iq 出现明显暂态偏差，有解耦时 q 轴扰动更小。

产物

- 一张 id/iq 阶跃响应对比图。
- 一段说明：解耦改善的是轴间串扰，不是替代 PI。

## 6. 固件落地

代码通常在电流 PI 后加入 `wL = omega * L_filter`，再做电压限幅、反 Park、SVPWM。限幅后还要考虑抗积分饱和。

## 7. 常见误解

- **误解：**解耦项一定提高稳定性。
**纠正：**参数 L 或符号错会引入反向补偿。
- **误解：**只要有解耦就不需要调 PI。
**纠正：**PI 仍决定基本动态和鲁棒性。

## 8. 验收标准

- 能解释 `omega * L * i` 的来源。
- 能说清 d 轴和 q 轴分别控制什么目标。
- 能指出解耦符号必须跟 Park 变换定义一致。

## 9. 复盘问题

- 为什么 50 Hz 下的解耦项和电感 L、负载电流有关？
- 限幅发生后，PI 积分器该如何处理？

## 10. 导师问题

- 阅读真实代码时，电流环解耦、前馈和限幅的顺序通常如何确认？
- 我只讨论通用顺序，不记录项目参数。

**下一步：**把 dq 电压参考转成三相 PWM，占空比由 SVPWM 生成。

源稿：`concepts/control/three-phase-current-loop-decoupling.md`

上一节：教程 0038：三相 SRF-PLL 锁相下一节：教程 0040：两电平 SVPWM
