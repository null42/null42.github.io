---
title: 教程 0041：Vienna PFC 与中点电压平衡
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0041-vienna-pfc-neutral-point-balance.html
status: learning
visibility: public
summary: Imported from 0041-vienna-pfc-neutral-point-balance.html
chapterOrder: 10
---

# 教程 0041：Vienna PFC 与中点电压平衡

中文主讲。一个概念：Vienna PFC 是三相三电平单向整流方案，控制目标是母线稳压、单位功率因数和中点平衡。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只讲公开 Vienna 教学拓扑，不记录产品功率等级、器件选型、热设计和内部平衡策略参数。

## 1. 它是什么

维也纳整流器（Vienna rectifier）是一种三相三电平 PFC 整流器。它通过每相双向开关和二极管网络把交流侧电流整形成正弦，同时升压到分裂直流母线。核心问题之一是中点电压平衡（neutral-point voltage balance），即让上、下母线电容电压接近相等。

## 2. 为什么 UPS 需要它

中大功率在线 UPS 常见三相输入，单相 PFC 的 2 倍频功率脉动不再是主问题。Vienna PFC 具有效率高、器件电压应力低、输入电流质量好的优势，适合作为三相 UPS 前级。

## 3. 物理直觉

分裂母线像两个串联水箱。控制输入电流时，电流会从中点抽取或注入电荷。如果长期偏向一边，上下水箱水位就不相等，必须用冗余矢量或零序注入把电荷拉回来。

## 4. 数学形式

Vdc = Vc_top + Vc_bottom
Vnp_err = Vc_top - Vc_bottom
id_ref = PI(Vdc_ref - Vdc)
iq_ref = 0
balance_term = PI(0 - Vnp_err)

d 轴电流负责有功功率和母线稳压，q 轴电流通常设为 0 实现单位功率因数，平衡项调节中点电流平均值。

## 5. 一个仿真任务与仿真观察

先固定三相电流为正弦，再人为让 `Vc_top > Vc_bottom`。观察加入平衡项后，上下电容电压误差逐步减小。

产物

- 一张 Vc_top、Vc_bottom、Vnp_err 曲线。
- 一句结论：中点平衡是三电平拓扑的系统变量，不是单个电流环能自动解决。

## 6. 固件落地

固件一般包含 `dc_bus_loop`、`id_iq_current_loop`、`neutral_point_balance`、`three_level_pwm`。保护会监控输入过流、母线过压、上下电容不平衡和 PLL 失锁。

## 7. 常见误解

- **误解：**Vienna 可以双向回馈能量。
**纠正：**典型 Vienna 是单向整流。
- **误解：**母线总压稳了就说明中点稳了。
**纠正：**总压正常时上下电容仍可能不平衡。

## 8. 验收标准

- 能说明 Vienna 和三相 Boost PFC 的区别。
- 能解释为什么要测量上下母线电压。
- 能把 Vdc 环、id/iq 环和中点平衡环分清。

## 9. 复盘问题

- 为什么 iq_ref=0 对应单位功率因数？
- 上下电容容量不一致会怎样影响平衡控制？

## 10. 导师问题

- 阅读三相 PFC 代码时，中点平衡逻辑通常放在调制层还是控制层？
- 我只记录公开控制结构，不记录项目参数。

**下一步：**学习三电平 NPC 逆变器，它也要处理中点平衡。

源稿：`concepts/power-electronics/vienna-pfc-neutral-point-balance.md`

上一节：教程 0040：两电平 SVPWM下一节：教程 0042：三电平 NPC 逆变器
