---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相逆变器故障状态机
tags:
  - power-electronics
status: learning
summary: 状态机（state machine）把 UPS 软件运行过程拆成明确状态。本节只看一个很小的逆变器保护状态机：
---

# 概念：单相逆变器故障状态机

## 1. 它是什么

状态机（state machine）把 UPS 软件运行过程拆成明确状态。本节只看一个很小的逆变器保护状态机：

```text
RUN -> UV_LATCHED -> RESET_WAIT -> RUN
```

故障锁存（fault latch）表示：一旦欠压保护（undervoltage protection / UV protection）确认故障，软件保存故障码、禁止脉宽调制（pulse-width modulation / PWM），并且不能因为 RMS 电压刚恢复就立刻重新输出。

本节中文主讲，只讲一个概念：不间断电源（uninterruptible power supply / UPS）保护判断和输出恢复必须经过状态机，而不是靠一个布尔变量直接开关 PWM。

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. 为什么 UPS 需要它

UPS 既要尽量持续供电，也要避免危险输出。上一节已经看到均方根（root mean square / RMS）欠压会触发故障锁存；本节关注故障之后软件怎么走。

如果欠压恢复后立刻开 PWM，系统可能反复启停，甚至在负载或功率级仍未稳定时重新输出。状态机让恢复条件变得清楚：故障已锁存、输出已关闭、电压已恢复、收到复位请求（reset request）、复位延时（reset delay）结束，然后才允许回到运行。

## 3. 物理直觉

状态机像电气柜的操作票。看到故障后先断开输出；故障信号消失只代表“当前测量值恢复”，不代表“可以马上合闸”。复位请求像操作员或上层逻辑说“可以尝试恢复”，复位延时像等待继电器、驱动、电容和软件计数器都稳定。

## 4. 数学形式

```text
if state == RUN and V_rms < UV_threshold for hold_time:
    fault = UNDERVOLTAGE
    state = UV_LATCHED
    pwm_enable = 0

if state == UV_LATCHED and reset_request and V_rms >= UV_threshold:
    state = RESET_WAIT
    reset_timer = 0

if state == RESET_WAIT:
    reset_timer += Ts
    if reset_timer >= reset_delay:
        fault = NONE
        state = RUN
        pwm_enable = 1
```

这里的重点是 `reset_request` 不能绕过电压恢复条件。

## 5. 仿真观察

运行：

```powershell
python simulations\python\single_phase_inverter_fault_state_machine.py
```

观察顺序：
- `V_rms` 低于欠压阈值并保持足够时间后，状态从 `RUN` 进入 `UV_LATCHED`。
- `PWM enable` 在故障锁存期间变为 0。
- `Reset request` 出现后，如果 RMS 已恢复，状态进入 `RESET_WAIT`。
- `RESET_WAIT` 满足复位延时后，故障码清零并回到 `RUN`。

脚本默认保存并自动打开图片；如果无法自动打开，会打印完整图片路径。

一个仿真任务：

```powershell
python simulations\python\single_phase_inverter_fault_state_machine.py --reset-request-time 0.11 --output simulations\results\inverter_fault_reset_early.png --no-open
python simulations\python\single_phase_inverter_fault_state_machine.py --reset-request-time 0.17 --output simulations\results\inverter_fault_reset_late.png --no-open
```

对比复位请求早于电压恢复和晚于电压恢复两种情况。重点看 `UV_LATCHED` 到 `RESET_WAIT` 的时刻，以及 `PWM enable` 什么时候重新变为 1。

## 6. 固件落地

真实 C 工程常见分层：

```text
Protection_Check()
  -> updates fault request

FaultLatch_Update()
  -> stores fault code

StateMachine_Step()
  -> decides RUN / UV_LATCHED / RESET_WAIT

Pwm_ForceOff() or Pwm_Enable()
  -> executes output gating
```

读代码时要追三件事：故障码在哪里产生、在哪里锁存/清除、PWM 由哪个状态允许打开。

## 7. 常见误解

- 错误理解：保护条件恢复后就应该自动回 RUN。  
  正确理解：严重故障通常要锁存，并经过复位流程。
- 错误理解：复位请求就是清故障码。  
  正确理解：复位请求只是进入恢复流程的一个条件，还要看测量恢复和延时。
- 错误理解：PWM enable 只是显示状态。  
  正确理解：PWM enable 是功率输出许可，必须由状态机和保护共同约束。

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
- 仿真里早于电压恢复的复位请求不会立刻回 RUN。真实工程里复位请求由按键、通信命令还是上层模式管理产生？
- 图中 `RESET_WAIT` 需要等待 20 ms。公司平台里恢复延时通常根据继电器、驱动芯片、母线电压还是软件滤波计数器决定？
