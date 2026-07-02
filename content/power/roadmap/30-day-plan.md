---
date: 2026-06-20
category: 电源控制
source: power
visibility: public
title: UPS 30 天训练计划（30-Day Training Plan）
tags:
  - power-electronics
status: learning
summary: 每天至少产出下面四类内容中的一种，不能只“看资料”：
---

# UPS 30 天训练计划（30-Day Training Plan）

## 使用规则（Training Rule）

每天至少产出下面四类内容中的一种，不能只“看资料”：

- 一份概念解释（concept explanation）：必须按“定义、为什么需要、物理直觉、数学形式、仿真观察、固件落地、常见误解”七段式写。
- 一个 Python 或 MATLAB/Simulink 仿真产物（simulation artifact）：脚本、模型、波形图或参数记录。
- 一份调试记录（debug record）：记录失败现象、猜想、验证过程和结论。
- 一个导师问题（mentor question）：必须来自具体仿真、代码或概念卡点。

## 第 1 周：基础补齐与 Boost 入门（Foundation and Boost）

目标：重建 UPS 控制工作所需的最低电路、电力电子和控制基础。

主题：

- 基尔霍夫电流定律（Kirchhoff's Current Law / KCL）、基尔霍夫电压定律（Kirchhoff's Voltage Law / KVL）。
- 电容电流（capacitor current）、电感电压（inductor voltage）。
- 降压变换器（Buck converter）和升压变换器（Boost converter）的开关状态。
- 连续导通模式（continuous conduction mode / CCM）、断续导通模式（discontinuous conduction mode / DCM）。
- 占空比（duty cycle / D）、电流纹波（current ripple）、电压纹波（voltage ripple）。
- 脉宽调制（pulse-width modulation / PWM）、采样（sampling）、离散比例积分控制器（discrete proportional-integral controller / discrete PI）。

产物：

- `concepts/power-electronics/boost-converter.md`
- `simulations/python/boost_open_loop.py`
- `projects/01-boost-basics/README.md`

## 第 2 周：控制核心（Control Core）

目标：把已有电机控制经验迁移到 UPS 控制。

主题：

- 单相功率因数校正（single-phase power factor correction / single-phase PFC）。
- 锁相环（phase-locked loop / PLL）与电网同步（grid synchronization）。
- 单相逆变器（single-phase inverter）和 LC 滤波器（LC filter）。
- 比例积分控制器（proportional-integral controller / PI）。
- 比例谐振控制器（proportional-resonant controller / PR）。
- 前馈（feedforward）和采样延迟（sampling delay）。

产物：

- PFC 概念文档。
- PLL 仿真。
- 单相逆变器项目大纲。

## 第 3 周：UPS 系统（UPS System）

目标：理解整机能量流、状态切换、保护、电池路径和旁路。

主题：

- 在线式 UPS 双变换架构（online UPS double-conversion architecture）。
- 直流母线协调（DC bus coordination）。
- 电池（battery）与双向 DC-DC 变换器（bidirectional DC-DC converter）。
- LLC 谐振变换器（inductor-inductor-capacitor resonant converter / LLC）的能量传递直觉和频率控制边界。
- 旁路（bypass）和故障状态机（fault state machine）。

产物：

- UPS 状态机 Python 脚本。
- 故障处理调试记录。

## 第 4 周：嵌入式工程化（Embedded Engineering）

目标：把控制算法连接到真实固件架构。

主题：

- 控制中断服务程序（control interrupt service routine / control ISR）。
- 模数转换器（analog-to-digital converter / ADC）与 PWM 同步。
- 实时操作系统（real-time operating system / RTOS）任务划分。
- 参数存储（parameter storage）。
- 通信（communication）和日志（logging）。
- C 语言工程代码阅读（C firmware code reading）：模块边界、控制中断、状态机、保护与通信。
- 简化 UPS 软件骨架（simplified UPS firmware skeleton）：启动、采样、控制、保护、故障锁存、通信接口。

产物：

- 固件控制骨架（firmware control skeleton）。
- 经导师确认的模块阅读计划。

## 后续专题：高功率 UPS 拓扑（Advanced UPS Topologies）

这些内容不抢第 1 周 Boost 基础的节奏，但必须进入训练体系：

- 维也纳整流器（Vienna rectifier）：三相功率因数校正、高压母线、中点电压平衡。
- 三电平逆变器（three-level inverter）：中点钳位、开关状态、调制、母线中点平衡。
- LLC 谐振变换器（inductor-inductor-capacitor resonant converter / LLC）：谐振腔、频率调制、软开关、轻载控制。
- 工程代码专题：从 Python/Simulink 现象迁移到 C 语言控制中断、驱动接口、保护状态机和通信协议。
