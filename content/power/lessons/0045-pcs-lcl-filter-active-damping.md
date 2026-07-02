---
title: 教程 0045：PCS LCL 滤波器与有源阻尼
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0045-pcs-lcl-filter-active-damping.html
status: learning
visibility: public
summary: Imported from 0045-pcs-lcl-filter-active-damping.html
chapterOrder: 10
---

# 教程 0045：PCS LCL 滤波器与有源阻尼

中文主讲。一个概念：LCL 滤波器能强力抑制开关纹波，但必须处理谐振。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只讲公开滤波器模型，不记录并网认证指标、真实电感电容参数或阻尼系数。

## 1. 它是什么

LCL 滤波器（LCL filter）由变流器侧电感、滤波电容和电网侧电感组成。相比单电感 L，它对高频开关纹波衰减更快，但会形成谐振峰，需要有源阻尼（active damping）或无源阻尼抑制。

## 2. 为什么 UPS 需要它

PCS 并网口必须限制电流谐波。LCL 可以用较小总电感获得较好高频衰减，但谐振如果处理不好，会在电流环中放大噪声甚至引发不稳定。

## 3. 物理直觉

LCL 像两个弹簧中间夹一个质量块。它很会隔离高频振动，但中间质量块有自己的共振频率。阻尼就是给这个振动加刹车。

## 4. 数学形式

f_res = 1 / (2*pi) * sqrt((L1 + L2) / (L1 * L2 * Cf))
u_ref = current_loop_output - K_ad * i_c_or_v_c_feedback

有源阻尼常用电容电流反馈、电容电压微分反馈或数字滤波实现，目标是压低谐振峰。

## 5. 一个仿真任务与仿真观察

扫频观察 LCL 传递函数。先不加阻尼，标出谐振峰；再加入电容电流反馈，观察谐振峰下降。

产物

- 一张 L 与 LCL 高频衰减对比图。
- 一张加阻尼前后的谐振峰对比图。

## 6. 固件落地

固件可能采样逆变器侧电流、电网侧电流或电容电流。控制代码中常见 `capacitor_current_feedback`、`notch_filter`、`active_damping_gain` 和采样延时补偿。

## 7. 常见误解

- **误解：**LCL 一定比 L 更稳定。
**纠正：**LCL 滤波更强，但谐振更难处理。
- **误解：**无源阻尼没有代价。
**纠正：**电阻阻尼会带来损耗。

## 8. 验收标准

- 能写出 LCL 谐振频率的影响因素。
- 能说明为什么有源阻尼需要额外反馈或滤波。
- 能区分逆变器侧电流和电网侧电流控制。

## 9. 复盘问题

- 谐振频率太接近控制带宽会发生什么？
- 采样延时会如何影响有源阻尼？

## 10. 导师问题

- PCS 并网电流控制一般反馈哪一路电流？LCL 阻尼入口在哪里看？
- 我不记录内部滤波参数，只确认阅读路径。

**下一步：**连接储能电池侧 DC-DC 和 PCS 模式状态机。

源稿：`concepts/pcs/lcl-filter-active-damping.md`

上一节：教程 0044：PCS 构网型 V/f 与下垂控制下一节：教程 0046：PCS 储能 DC-DC 与模式状态机
