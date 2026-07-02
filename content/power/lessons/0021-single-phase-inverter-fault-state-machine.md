---
title: 教程 0021：单相逆变器状态机（state machine）与故障锁存
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0021-single-phase-inverter-fault-state-machine.html
status: learning
visibility: public
summary: Imported from 0021-single-phase-inverter-fault-state-machine.html
chapterOrder: 10
---

# 教程 0021：单相逆变器状态机（state machine）与故障锁存

中文主讲。一个概念：不间断电源（uninterruptible power supply / UPS）欠压保护触发后，软件不能只靠电压恢复就重新打开 PWM，必须经过故障锁存、复位请求和复位延时。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学模型和教学参数，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

状态机（state machine）把软件运行过程拆成明确状态。本节只看三个状态：`RUN`、`UV_LATCHED`、`RESET_WAIT`。

故障锁存（fault latch）表示一旦欠压保护（undervoltage protection / UV protection）确认故障，软件保存故障码并禁止脉宽调制（pulse-width modulation / PWM）输出。恢复运行还需要复位请求（reset request）和复位延时（reset delay）条件。

上一节讲的是均方根（root mean square / RMS）估算如何判断欠压；本节讲欠压之后状态机如何控制 PWM 是否允许打开。

## 2. 为什么 UPS 需要它

UPS 既要尽量保持供电，也要避免危险输出。如果输出欠压刚恢复就立刻重新打开 PWM，可能导致反复启停，也可能在负载、继电器、驱动或母线尚未稳定时恢复输出。

状态机把“检测到故障”和“允许恢复输出”分开。故障可以由保护模块产生，但恢复必须由状态机统一决定。这能让 C 工程代码更容易审查：谁产生故障、谁锁存故障、谁清故障、谁允许 PWM。

## 3. 物理直觉

状态机像一张操作票：故障发生后先停止输出；测量值恢复只是说明眼前读数安全，不代表系统已经允许恢复。复位请求相当于上层逻辑说“可以尝试恢复”，复位延时相当于等待驱动、继电器、采样滤波和软件计数器都稳定。

    RUN
    PWM enable=1

    UV_LATCHED
    fault=UV, PWM=0

    RESET_WAIT
    等待复位延时

    UV trip

    reset + RMS recovered

    reset delay done, fault cleared

图 1：欠压锁存后，复位请求不能绕过 RMS 恢复条件。

## 4. 数学形式

  if state == RUN and V_rms = UV_threshold:
    state = RESET_WAIT
    reset_timer = 0

if state == RESET_WAIT:
    reset_timer += Ts
    if reset_timer >= reset_delay:
        fault = NONE
        state = RUN
        pwm_enable = 1

这里的关键是：`reset_request` 只是恢复条件之一，不能绕过 RMS 已恢复这个条件。

## 5. 仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_inverter_fault_state_machine.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含输出电压、RMS 估算、欠压阈值、状态码、故障码、复位请求、PWM enable、复位延时进度和参数框。

    一个仿真任务
    python simulations\python\single_phase_inverter_fault_state_machine.py --reset-request-time 0.11 --output simulations\results\inverter_fault_reset_early.png
python simulations\python\single_phase_inverter_fault_state_machine.py --reset-request-time 0.17 --output simulations\results\inverter_fault_reset_late.png

对比复位请求早于电压恢复和晚于电压恢复两种情况。重点看 `UV_LATCHED` 到 `RESET_WAIT` 的时刻，以及 PWM 什么时候重新变为 1。

观察顺序：

- 先看 `V_rms` 何时低于欠压阈值。

- 再看状态是否进入 `UV_LATCHED`，并且 `PWM enable` 是否变为 0。

- 看 `Reset request` 出现后是否还要等 RMS 恢复。

- 最后看 `RESET_WAIT` 满足延时后才回到 `RUN`。

## 6. 固件落地

真实 C 工程可按下面接口理解：

  Protection_Check()
  -> updates fault request

FaultLatch_Update()
  -> stores fault code

StateMachine_Step()
  -> decides RUN / UV_LATCHED / RESET_WAIT

Pwm_ForceOff() or Pwm_Enable()
  -> executes output gating

读代码时要追三件事：故障码在哪里产生、在哪里锁存和清除、PWM 由哪个状态允许打开。不要只找欠压阈值，还要找恢复条件。

## 7. 常见误解

- **误解：**保护条件恢复后就应该自动回 `RUN`。
**纠正：**严重故障通常要锁存，并经过复位流程。

- **误解：**复位请求就是清故障码。
**纠正：**复位请求只是进入恢复流程的条件之一，还要看测量恢复和延时。

- **误解：**`PWM enable` 只是显示状态。
**纠正：**`PWM enable` 是功率输出许可，必须由状态机和保护共同约束。

## 8. 验收标准

- 能解释 `RUN`、`UV_LATCHED`、`RESET_WAIT` 三个状态。

- 能在图中指出欠压触发、PWM 关断、复位请求、复位等待和恢复运行。

- 能解释为什么早到的复位请求不能绕过 RMS 恢复条件。

- 能说明故障码清零和 PWM 重新使能不是同一个瞬间随意发生的。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 为什么 `V_rms` 恢复到阈值以上后，状态机仍可能停在 `UV_LATCHED`？

- 如果复位请求发生在 110 ms，而电压还没恢复，为什么不能立刻进入 `RUN`？

- 在真实 C 工程里，你会在哪些文件或函数名附近寻找 `PWM enable` 被强制关闭的逻辑？

## 10. 导师问题

- 我用 `single_phase_inverter_fault_state_machine.py` 看到欠压触发后 PWM 立即变为 0。公司代码中输出欠压会直接关 PWM、切旁路，还是先降载/限流？

- 仿真里早于电压恢复的复位请求不会立刻回 `RUN`。真实工程里复位请求由按键、通信命令还是上层模式管理产生？

- 图中 `RESET_WAIT` 需要等待 20 ms。公司平台里恢复延时通常根据继电器、驱动芯片、母线电压还是软件滤波计数器决定？

**下一步：**逆变器保护主线已经能连接采样、RMS、故障锁存和 PWM 许可；后续可以进入旁路同步/切换，或开始三电平逆变器调制。

关联：[上一节：单相逆变器 RMS 估算与欠压保护](0020-single-phase-inverter-rms-protection.html)；源稿：`concepts/embedded/single-phase-inverter-fault-state-machine.md`。

    上一节：教程 0020：单相逆变器的均方根（root mean square / RMS）估算与欠压保护
    下一节：教程 0022：UPS 固件实时调度骨架
