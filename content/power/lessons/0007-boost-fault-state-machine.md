---
title: 教程 0007：Boost 故障锁存与复位状态机
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0007-boost-fault-state-machine.html
status: learning
visibility: public
summary: Imported from 0007-boost-fault-state-machine.html
chapterOrder: 10
---

# 教程 0007：Boost 故障锁存与复位状态机

中文主讲。一个概念：为什么故障采样消失后，UPS 软件仍然不能立刻重新打开 PWM。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学参数和教学脚本，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 1. 它是什么

故障锁存（fault latch）是指：一旦检测到严重故障，软件把故障码保存下来，关闭功率输出，并且不因为下一次采样恢复正常就自动清除。

状态机（state machine）是把软件运行过程分成有限状态的工程写法。本节只看三个状态：

  RUN -> FAULT_LATCHED -> RESET_WAIT -> RUN

本节继续使用 脉宽调制（pulse-width modulation / PWM） 使能作为输出是否允许工作的标志。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）既要保持供电，也要防止危险输出。严重故障不能只按瞬时采样判断，因为短暂过压可能已经说明硬件、负载或控制环路出现风险。

- 故障可能只持续几个控制周期，但仍需要记录和处理。

- 如果采样刚恢复就自动打开 PWM，可能造成反复启停。

- 复位通常要等待母线、电感电流、温度或驱动状态回到安全区。

## 3. 物理直觉

故障锁存像跳闸。电压恢复正常只说明“当前读数不危险”，不等于“系统已经可以重新输出”。状态机让软件有一个明确流程：发现故障、停 PWM、等待复位请求、等待安全延时、再回到运行。

    RUN
    PWM enable=1

    FAULT_LATCHED
    fault=OV, PWM=0

    RESET_WAIT
    等待复位延时

    Vout > OV

    reset request

    reset delay done, fault cleared

图 1：本节只讲故障锁存和复位，不展开完整 UPS 启动流程。

## 4. 数学形式

下面的过压阈值（over-voltage threshold / OV）是保护边界，不是控制目标：

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

关键点：故障清除不是“电压低于阈值”一个条件，而是状态机条件。

## 5. 一个仿真任务与仿真观察

运行 Python 仿真：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\boost_fault_state_machine.py

脚本会生成并自动打开图片；如果无法自动打开，会打印完整路径。图中包含输出电压、状态码、故障码、复位请求、PWM 使能和关键参数框。

    对比实验
    python simulations\python\boost_fault_state_machine.py --reset-delay 0.002 --output simulations\results\boost_fault_reset_2ms.png
python simulations\python\boost_fault_state_machine.py --reset-delay 0.012 --output simulations\results\boost_fault_reset_12ms.png

比较两张图中 `RESET_WAIT` 状态持续时间和 PWM 重新使能时刻。

观察顺序：

- 先看 `Vout` 是否短暂超过 OV 阈值。

- 再看状态是否进入 `FAULT_LATCHED`。

- 看复位请求出现后是否先进入 `RESET_WAIT`。

- 最后看 PWM 是否等复位延时结束后才恢复为 1。

## 6. 固件落地

真实 C 工程里，相关逻辑通常分散在多个模块：

- `protection.c`：检测故障，产生故障码。

- `state_machine.c`：决定运行、故障锁存、复位等待和重新启动。

- `pwm.c`：关断或释放 PWM 输出。

- `log.c` 或诊断模块：记录故障发生时的采样值和状态。

读代码时要追踪三条线：故障码在哪里锁存、故障码在哪里清除、谁允许 PWM 重新打开。

## 7. 常见误解

- **误解：**故障采样恢复正常后就应该自动恢复。
**纠正：**严重故障通常需要锁存，并经过明确复位流程。

- **误解：**状态机只是代码风格。
**纠正：**状态机决定系统何时允许输出，直接影响安全性和可调试性。

- **误解：**复位按钮只是清故障码。
**纠正：**复位还要检查条件、等待延时，并确认输出处于安全状态。

## 8. 验收标准

- 能解释故障锁存（fault latch）和普通故障检测的区别。

- 能在仿真图中指出 `RUN`、`FAULT_LATCHED`、`RESET_WAIT` 三段。

- 能解释为什么 `Vout` 恢复正常后 PWM 仍然保持 0。

- 能说明复位请求（reset request）和复位延时（reset delay）不是同一件事。

- 能基于仿真图准备一个导师问题。

## 9. 复盘问题

- 默认仿真中，过压脉冲开始于多少 ms，持续多少 ms？

- 复位请求出现后，为什么不立刻回到 `RUN`？

- 如果故障码由 `protection.c` 产生，应该由哪个模块清除？为什么？

## 10. 导师问题

- 我用 `boost_fault_state_machine.py` 看到过压脉冲结束后仍保持 `FAULT_LATCHED`。公司工程里哪些故障必须锁存，哪些允许自动恢复？

- 我把 `--reset-delay` 从 2 ms 改到 12 ms 后，PWM 重新使能时刻明显变化。真实工程里复位延时通常根据哪些硬件条件设置？

- 我看到图中 PWM 在故障期间保持 0。公司代码里软件 PWM 关断、硬件比较器关断和驱动芯片使能之间如何分工？

**下一步：**把这节和第 6 节的 C 骨架连起来看：`Protection_Check()` 产生故障，`StateMachine_Step()` 决定何时允许恢复，`Pwm_ForceOff()` 保证输出关闭。

关联：[上一节：Boost C 固件骨架](0006-boost-c-firmware-skeleton.html)；源稿：`concepts/embedded/boost-fault-state-machine.md`。

    上一节：教程 0006：Boost C 固件骨架
    下一节：教程 0008：Boost 慢速任务、遥测与故障日志
