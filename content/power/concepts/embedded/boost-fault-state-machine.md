---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：Boost 故障锁存与复位状态机（Fault Latch And Reset State Machine）
tags:
  - power-electronics
status: learning
summary: 故障锁存（fault latch）是指：一旦检测到严重故障，软件把故障码保存下来，并禁止功率输出，不能因为下一次采样恢复正常就自动重新运行。
---

# 概念：Boost 故障锁存与复位状态机（Fault Latch And Reset State Machine）

## 1. 它是什么

故障锁存（fault latch）是指：一旦检测到严重故障，软件把故障码保存下来，并禁止功率输出，不能因为下一次采样恢复正常就自动重新运行。

状态机（state machine）是把软件运行阶段显式分成有限状态的写法。本节使用三个状态：

```text
RUN -> FAULT_LATCHED -> RESET_WAIT -> RUN
```

本节仍是教学模型，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）既要持续供电，也要避免危险输出。对过压、过流、母线异常等严重故障，软件不能只看瞬时采样值。原因是：

- 故障可能很短，但已经暴露出硬件或负载风险。
- 自动恢复可能导致反复启停。
- 复位通常需要确认采样恢复、等待放电或降温、记录故障，再按状态机重新启动。

## 3. 物理直觉

故障锁存像配电柜里的跳闸。电压短暂恢复不等于可以立刻合闸。你需要先确认故障原因消失，再经过一个复位流程，最后才允许脉宽调制（pulse-width modulation / PWM）重新使能。

## 4. 数学形式

简化状态转移可以写成：

```text
if state == RUN and Vout > OV:
    fault = OV
    state = FAULT_LATCHED
    pwm_enable = 0

if state == FAULT_LATCHED and reset_request:
    state = RESET_WAIT

if state == RESET_WAIT and wait_time >= reset_delay:
    fault = NONE
    state = RUN
    pwm_enable = 1
```

这里的过压阈值（over-voltage threshold / OV）不是控制目标，而是保护边界。

## 5. 一个仿真任务与仿真观察

一个仿真任务是运行 `boost_fault_state_machine.py`，观察故障锁存、复位请求和 PWM 重新使能之间的时序关系：

```powershell
python simulations\python\boost_fault_state_machine.py
```

对比复位延时：

```powershell
python simulations\python\boost_fault_state_machine.py --reset-delay 0.002 --output simulations\results\boost_fault_reset_2ms.png --no-open
python simulations\python\boost_fault_state_machine.py --reset-delay 0.012 --output simulations\results\boost_fault_reset_12ms.png --no-open
```

观察四条曲线：

- 输出电压 `Vout` 是否短暂超过过压阈值。
- 状态码是否从 `RUN` 进入 `FAULT_LATCHED`。
- 复位请求（reset request）出现后是否先进入 `RESET_WAIT`。
- PWM 使能是否在故障期间为 0，复位延时结束后才恢复为 1。

## 6. 固件落地

真实 C 工程中，故障锁存与复位可能分布在：

- `protection.c`：检测故障并产生故障码。
- `state_machine.c`：决定是否进入故障、等待复位、重新启动。
- `pwm.c`：执行软件关断或释放输出。
- `log.c` 或诊断模块：记录故障发生时间、故障码和关键采样值。

读代码时不要只问“阈值是多少”。更重要的是追踪：故障码在哪里锁存、哪里清除、谁允许 PWM 重新打开。

## 7. 常见误解

- 错误理解：故障采样消失后就应该自动恢复。  
  正确理解：严重故障通常要锁存，并等待明确复位流程。

- 错误理解：状态机只是写法问题。  
  正确理解：状态机决定了系统什么时候允许输出，直接影响安全性和可调试性。

- 错误理解：复位按钮只负责清故障码。  
  正确理解：复位还要检查条件、等待时间、确认输出处于安全状态。

## 8. 验收标准

- 能解释故障锁存（fault latch）和普通故障检测的区别。
- 能在仿真图中指出 `RUN`、`FAULT_LATCHED`、`RESET_WAIT` 三段。
- 能解释为什么 `Vout` 恢复正常后 PWM 仍然保持 0。
- 能说明复位请求（reset request）和复位延时（reset delay）不是同一件事。
- 能基于 `boost_fault_state_machine.py` 生成的图准备导师问题。

## 9. 复盘问题

- 默认仿真中，过压脉冲开始于多少 ms，持续多少 ms？
- 复位请求出现后，为什么不立刻回到 `RUN`？
- 把 `--reset-delay` 从 `0.002` 改成 `0.012` 后，哪一段状态持续时间变化最大？
- 如果故障码由 `protection.c` 产生，应该由哪个模块清除？为什么？

## 10. 导师问题

- 我用 `boost_fault_state_machine.py` 看到过压脉冲结束后仍保持 `FAULT_LATCHED`。公司工程里哪些故障必须锁存，哪些允许自动恢复？
- 我看到复位请求后还要等待 `reset_delay` 才恢复 `RUN`。真实工程里复位延时通常基于什么条件设置？
- 我看到 PWM 使能在故障期间为 0。公司代码里软件关断、硬件比较器关断和驱动芯片使能之间如何分工？
