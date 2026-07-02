---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：Boost C 固件骨架（Boost C Firmware Skeleton）
tags:
  - power-electronics
status: learning
summary: Boost C 固件骨架是把前面 Python 里的控制中断服务程序（control interrupt service routine / control ISR）拆成接近工程阅读方式的 C 文件：
---

# 概念：Boost C 固件骨架（Boost C Firmware Skeleton）

## 1. 它是什么

Boost C 固件骨架是把前面 Python 里的控制中断服务程序（control interrupt service routine / control ISR）拆成接近工程阅读方式的 C 文件：

```text
ADC 采样 -> 保护判断 -> 控制 ISR -> PWM 输出 -> 状态机锁存
```

它不是某个真实产品的软件，也不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）软件通常不是一个孤立控制公式，而是一组模块协同工作：

- 模数转换器（analog-to-digital converter / ADC）读取电压电流。
- 保护（protection）判断过压、欠压、过流。
- 控制 ISR 计算占空比。
- 脉宽调制（pulse-width modulation / PWM）输出占空比或关断。
- 状态机（state machine）决定运行、故障、复位等模式。

能看懂这些模块边界，比单独背一个比例积分控制器（proportional-integral controller / PI）公式更接近入职后的代码阅读任务。

## 3. 物理直觉

电源控制软件像一条有安全门的流水线。采样值先经过保护门，只有确认不危险，控制器才有资格更新 PWM。如果保护门发现过压，状态机会进入故障，并把 PWM 关断。

## 4. 数学形式

核心逻辑可以写成：

```text
fault = Protection_Check(sample, config)
if fault != NONE:
    runtime.fault = fault
    runtime.state = FAULT
    duty = 0
else:
    error = Vref - Vout
    integrator = clamp(integrator + Ki * error * Ts)
    duty = clamp(Kp * error + integrator)
```

这个顺序很重要：先保护，再控制，再输出。不要让危险采样值先经过控制器放大成新的 PWM 命令。

## 5. 一个仿真任务与仿真观察

这里的一个仿真任务是编译并运行可编译 C 教学程序，不驱动真实硬件。它用 `adc.c` 提供一组固定采样，其中 `tick=03` 控制周期出现过压：

```powershell
gcc -std=c99 -Wall -Wextra -Werror -I projects\02-boost-c-firmware-skeleton\src projects\02-boost-c-firmware-skeleton\src\*.c -o projects\02-boost-c-firmware-skeleton\boost_c_firmware_skeleton.exe
projects\02-boost-c-firmware-skeleton\boost_c_firmware_skeleton.exe
```

观察输出里的 `state`、`fault`、`pwm`：

- `RUN + NONE + pwm>0`：允许控制输出。
- `FAULT + OVERVOLTAGE + pwm=0`：过压后锁存，PWM 关断。

## 6. 固件落地

真实工程会更复杂，包括硬件抽象层（hardware abstraction layer / HAL）、中断向量、寄存器、定点数、通信任务和诊断日志。本教学骨架只保留最关键的阅读线索：

- `control.c`：先看 `Boost_ControlIsr()`。
- `protection.c`：看故障码从哪里来。
- `pwm.c`：看正常占空比和强制关断的接口。
- `state_machine.c`：看故障如何进入 `FAULT` 状态。
- `boost_types.h`：看配置、采样、运行状态的结构体。

## 7. 常见误解

- 错误理解：C 工程就是把 Python 函数翻译成 C。  
  正确理解：C 工程更强调模块边界、状态保存、实时调度和硬件接口。

- 错误理解：保护逻辑可以放在控制计算之后。  
  正确理解：保护应优先阻断危险输出。

- 错误理解：PWM 关断只是把占空比设小一点。  
  正确理解：严重故障下通常要明确调用关断路径，并由状态机控制复位条件。

## 8. 验收标准

- 能指出 `Boost_ControlIsr()` 的输入、状态、配置和输出。
- 能解释为什么 `Protection_Check()` 要在比例积分控制器（proportional-integral controller / PI）计算前执行。
- 能根据终端输出说明 `tick=03` 触发过压，`tick=04` 仍然故障锁存。
- 能解释 `Pwm_SetDuty()` 和 `Pwm_ForceOff()` 为什么要分成两个接口。
- 能基于 `control.c -> Boost_ControlIsr()` 准备具体导师问题。

## 9. 复盘问题

- `tick=03` 的 `vout` 是多少？它和过压阈值是什么关系？
- 为什么 `tick=04` 的采样恢复后，状态仍然是 `FAULT`，`pwm` 仍然为 0？
- 如果真实工程把 `Protection_Check()` 放在 PI 计算之后，可能放大什么风险？
- `boost_types.h` 里为什么要把 `AdcSample`、`BoostConfig` 和 `BoostRuntime` 分开？

## 10. 导师问题

提问时只带教学产物和自己的理解，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

- 我用 `projects/02-boost-c-firmware-skeleton/src/control.c` 看到 `Boost_ControlIsr()` 先保护再控制。公司代码里的 ISR 是否也是这种顺序？
- 我看到 `pwm.c` 同时有 `Pwm_SetDuty()` 和 `Pwm_ForceOff()`。真实工程里软件关断和硬件保护关断通常如何分工？
- 我看到 `boost_types.h` 把配置、采样、运行状态分开。公司工程里参数表、实时变量和故障状态通常放在哪些模块？
