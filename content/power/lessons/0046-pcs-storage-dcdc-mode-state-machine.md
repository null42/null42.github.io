---
title: 教程 0046：PCS 储能 DC-DC 与模式状态机
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0046-pcs-storage-dcdc-mode-state-machine.html
status: learning
visibility: public
summary: Imported from 0046-pcs-storage-dcdc-mode-state-machine.html
chapterOrder: 10
---

# 教程 0046：PCS 储能 DC-DC 与模式状态机

中文主讲。一个概念：PCS 不只是一个逆变器，还要把电池侧双向 DC-DC、并网/离网控制和安全状态机串起来。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只讲公开 PCS 架构，不记录真实 BMS 协议、客户调度策略、继电器时序或项目阈值。

## 1. 它是什么

双向 DC-DC 变换器（bidirectional DC-DC converter）连接电池和直流母线，支持充电 Buck 或放电 Boost。PCS 模式状态机（PCS mode state machine）负责待机、预充、并网充电、并网放电、离网构网、故障和安全停机之间的切换。

## 2. 为什么 UPS 需要它

UPS 课程已经有模式状态机、参数、故障锁存和通信。扩展到 PCS 后，这些软件结构仍然适用，只是控制对象从 UPS 输出供电扩展到电池能量调度、并网功率和构网供电。

## 3. 物理直觉

PCS 像一个能量路由器。电池、直流母线和交流电网分别是三个端口；状态机决定哪条路打开，控制器决定这条路上流多少能量。

## 4. 数学形式

charge:    grid -> AC/DC -> DC bus -> DC/DC -> battery
discharge: battery -> DC/DC -> DC bus -> DC/AC -> grid/load
allowed = precharge_ok and contactor_ok and no_fault and command_valid

功率流方向必须同时满足 BMS 允许、电池 SOC、母线电压、PCS 电流限幅和电网状态。

## 5. 一个仿真任务与仿真观察

设计一个简化状态机：Standby -> Precharge -> GridCharge -> GridDischarge -> GridForming -> Fault。注入 BMS 禁止充电、PLL 失锁和母线过压，观察状态是否进入安全路径。

产物

- 一张 PCS 模式状态迁移图。
- 一个事件表：命令、保护、允许条件、输出动作。

## 6. 固件落地

模块边界可沿用 UPS C 骨架：`inputs` 采集电网和 BMS 状态，`protection` 生成故障标志，`mode_state_machine` 决定 PCS 模式，`outputs` 控制接触器、PWM 允许和通信上报。

## 7. 常见误解

- **误解：**PCS 只要控制 P/Q 就够了。
**纠正：**能量路径、安全互锁和电池限制同样关键。
- **误解：**DC-DC 和逆变器状态可以各管各的。
**纠正：**母线电压和故障闭环要求统一状态机协调。

## 8. 验收标准

- 能画出 PCS 电池、DC-DC、DC bus、DC/AC、电网的能量路径。
- 能列出并网充电、并网放电、离网构网的进入条件。
- 能说明故障闭环如何关闭 PWM、断开接触器并上报状态。

## 9. 复盘问题

- BMS 禁止放电时，PCS 状态机应该如何处理放电命令？
- 母线预充未完成时，为什么不能直接开 PWM？

## 10. 导师问题

- 真实 PCS 工程中，BMS 限制、PCS 故障和调度命令谁的优先级最高？
- 我只记录通用优先级原则，不记录客户协议和项目参数。

**下一步：**可以把 PCS 状态机迁移到现有 C 固件骨架，作为后续项目练习。

源稿：`concepts/pcs/storage-dcdc-mode-state-machine.md`

上一节：教程 0045：PCS LCL 滤波器与有源阻尼下一节：教程 0047：TMS320F28075 外设从零配置
