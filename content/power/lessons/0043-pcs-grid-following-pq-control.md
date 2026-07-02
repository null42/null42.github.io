---
title: 教程 0043：PCS 并网跟随型 P/Q 控制
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0043-pcs-grid-following-pq-control.html
status: learning
visibility: public
summary: Imported from 0043-pcs-grid-following-pq-control.html
chapterOrder: 10
---

# 教程 0043：PCS 并网跟随型 P/Q 控制

中文主讲。一个概念：并网跟随型 PCS 锁相于电网，用 id/iq 电流指令控制有功和无功。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只讲公开 PCS 控制框架，不记录并网认证参数、低电压穿越曲线、客户调度协议或内部保护阈值。

## 1. 它是什么

储能变流器（power conversion system / PCS）连接电池直流侧和交流电网。并网跟随型控制（grid-following control / GFL）通过 PLL 跟随电网相位，用有功无功控制（active and reactive power control / P/Q control）生成 dq 电流参考。

## 2. 为什么 UPS 需要它

UPS 学到的三相 PFC、逆变、PLL、保护和状态机都能迁移到 PCS。区别是 PCS 直接参与电网功率调度，既可能充电吸收有功，也可能放电输出有功，还可能按需求提供无功支撑。

## 3. 物理直觉

GFL PCS 像跟着电网节拍跳舞的人。电网给出频率和相位，PCS 不自己定节拍；它只决定往前推多少有功、往侧向推多少无功。

## 4. 数学形式

id_ref = 2 * P_ref / (3 * Vd)
iq_ref = -2 * Q_ref / (3 * Vd)
current_loop(id_ref, iq_ref) -> vdq_ref -> SVPWM

符号取决于功率方向约定。课程中约定放电向电网送有功为正 P，充电吸收有功为负 P。

## 5. 一个仿真任务与仿真观察

设置 P_ref 从 0 跳到 10 kW，Q_ref 保持 0；再设置 Q_ref 跳变。观察 id 跟随 P，iq 跟随 Q，且 PLL 锁相后 P/Q 解耦更清楚。

产物

- 一张 P_ref/P_meas、Q_ref/Q_meas 和 id/iq 曲线。
- 一条结论：GFL 依赖电网存在和 PLL 锁定。

## 6. 固件落地

固件模块通常包括 `grid_pll`、`pq_outer_loop`、`dq_current_loop`、`grid_relay`、`anti_islanding`、`fault_latch`。调度指令必须经过限功率、限电流和 SOC 边界。

## 7. 常见误解

- **误解：**PCS 并网控制就是 UPS 逆变器控制。
**纠正：**GFL PCS 控制电流和功率，UPS 离网输出常控制电压。
- **误解：**P/Q 指令可以无限跟随。
**纠正：**受电流、母线、电池和并网规范限制。

## 8. 验收标准

- 能解释 GFL 为什么需要 PLL。
- 能把 P/Q 指令换算成 id/iq 指令。
- 能说明 PCS 充电和放电的功率方向约定。

## 9. 复盘问题

- 电网电压降低时，同样 P_ref 为什么需要更大 id？
- PLL 失锁时，P/Q 控制是否还可信？

## 10. 导师问题

- PCS 代码里 P/Q 限幅通常在外环、指令层还是状态机里做？
- 我只记录通用控制边界，不记录认证参数。

**下一步：**学习 PCS 构网型控制，PCS 不再只是跟随电网。

源稿：`concepts/pcs/grid-following-pq-control.md`

上一节：教程 0042：三电平 NPC 逆变器下一节：教程 0044：PCS 构网型 V/f 与下垂控制
