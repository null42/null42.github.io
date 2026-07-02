---
date: 2026-06-20
category: 电源控制
source: power
visibility: public
title: 项目 02：Boost C 固件骨架（Boost C Firmware Skeleton）
tags:
  - power-electronics
status: learning
summary: 把 `simulations/python/boost_firmware_skeleton.py` 里的控制数据流迁移成一个可编译的简化 C 工程，帮助你阅读完整工程代码时先抓住模块边界。
---

# 项目 02：Boost C 固件骨架（Boost C Firmware Skeleton）

## 目标

把 `simulations/python/boost_firmware_skeleton.py` 里的控制数据流迁移成一个可编译的简化 C 工程，帮助你阅读完整工程代码时先抓住模块边界。

本项目不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。所有参数都是教学用的简化示例。

## 学习重点

- 控制中断服务程序（control interrupt service routine / control ISR）如何串起采样、保护、控制和输出。
- 模数转换器（analog-to-digital converter / ADC）模块如何提供采样值。
- 脉宽调制（pulse-width modulation / PWM）模块如何接收占空比命令。
- 保护模块如何产生故障码并让状态机锁存。

## 文件结构

```text
src/boost_types.h      公共类型、配置、运行状态、故障码
src/adc.c/.h           教学用 ADC 采样序列
src/protection.c/.h    过压、欠压、过流判断
src/control.c/.h       Boost_ControlIsr() 控制 ISR
src/pwm.c/.h           PWM 占空比输出与关断
src/state_machine.c/.h RUN/FAULT 状态推进
src/main.c             运行 5 个控制周期并打印结果
```

## 编译和运行

在 PowerShell 中：

```powershell
cd E:\gitee_CodeStorage\学习\电源
gcc -std=c99 -Wall -Wextra -Werror -I projects\02-boost-c-firmware-skeleton\src projects\02-boost-c-firmware-skeleton\src\*.c -o projects\02-boost-c-firmware-skeleton\boost_c_firmware_skeleton.exe
projects\02-boost-c-firmware-skeleton\boost_c_firmware_skeleton.exe
```

预期现象：

- 前几个周期处于 `RUN`，`pwm` 为非零。
- 第 3 个周期教学采样序列给出过压值，状态进入 `FAULT`。
- 进入 `FAULT` 后 `pwm=0.000`，下一周期仍保持过压故障锁存。

## 验收标准

- 能指出 `Boost_ControlIsr()` 的输入、状态、配置和输出。
- 能解释为什么 `Protection_Check()` 要在 PI 控制计算前执行。
- 能解释 `Pwm_ForceOff()` 和故障锁存之间的关系。
- 能基于 `control.c -> Boost_ControlIsr()` 向导师询问真实工程模块边界。
