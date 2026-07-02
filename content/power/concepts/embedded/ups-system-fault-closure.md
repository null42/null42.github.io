---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：系统故障闭环（system fault closure）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0029-ups-system-fault-closure.html` 的源稿和补充资料。它只使用教学仲裁逻辑和教学故障序列，不包含公司内部系统仲裁策略、未公开产品方案、客户项目参数或内部测试数据。
---

# 概念：系统故障闭环（system fault closure）

本页是 `lessons/0029-ups-system-fault-closure.html` 的源稿和补充资料。它只使用教学仲裁逻辑和教学故障序列，不包含公司内部系统仲裁策略、未公开产品方案、客户项目参数或内部测试数据。

## 它是什么

系统故障闭环（system fault closure）是把故障锁存（fault latch）、UPS 模式状态机（UPS mode state machine）和输出许可（output permission）连起来：故障锁存后，系统强制进入故障模式并关闭输出；安全复位条件满足后，再允许回到正常模式。

本节只讲一个概念：故障不是只存在于保护模块里，它必须闭环影响模式和执行器许可。

## 为什么 UPS 需要它

如果保护模块已经判定严重故障，但模式状态机仍然停留在在线模式，输出许可仍然打开，那么保护判断就没有真正保护系统。反过来，如果复位条件没有经过统一仲裁，某个模块可能提前恢复输出，造成危险。

系统闭环的价值是建立一条可审查路径：保护标志 -> 故障锁存 -> 模式强制 -> 输出关闭 -> 安全复位。

## 物理直觉

保护标志像发现异常，故障锁存像拉下急停，模式状态机像切换运行牌，输出许可像接触器和 PWM 的允许线。只有这几者串起来，故障才真正进入系统行为。

## 数学形式

```text
latched_fault = FaultLatch(protection_fault, reset_request, safe_to_reset)

if latched_fault:
    mode = FAULT
    output_permission = all_off
else:
    mode = ModeStateMachine(input)
    output_permission = OutputsFromMode(mode)
```

安全复位条件（safe-to-reset condition）不是“按了复位按钮”本身，而是复位请求和安全输入同时满足。

## 仿真观察

运行：

```powershell
python simulations\python\ups_system_fault_closure.py --no-open
```

默认生成：

```text
simulations/results/ups_system_fault_closure.png
```

图中包含保护故障输入、锁存故障、模式码、PFC 许可、逆变 PWM 许可、复位请求和安全复位条件。默认不加 `--no-open` 时脚本会尝试自动打开图片；打不开时会打印完整路径。

## 固件落地

- `system_step.c`：教学系统仲裁层。
- `UpsSystem_Step()`：把故障锁存、模式状态机和输出许可串起来。
- `UpsFaultLatch_Step()`：提供锁存故障状态。
- `UpsModeStateMachine_Step()`：在没有锁存故障时决定模式。
- `UpsOutputs_FromMode()`：把模式和故障锁存变成输出许可。

## 常见误解

- 错误理解：保护模块置位后就算保护完成。  
  正确理解：保护必须影响模式和输出许可，才算闭环。
- 错误理解：状态机内部应该直接判断所有采样阈值。  
  正确理解：更清晰的分层是保护模块判断标志，锁存模块确认故障，系统仲裁层强制模式。
- 错误理解：复位只要清锁存即可。  
  正确理解：复位后还要确认输出许可和模式恢复顺序。

## 验收标准

- 能运行 `python simulations\python\ups_system_fault_closure.py --no-open` 并打开 `simulations/results/ups_system_fault_closure.png`。
- 能解释锁存故障为什么强制模式为 FAULT。
- 能解释故障期间 PFC 和逆变 PWM 为什么必须关闭。
- 能解释安全复位后为什么才允许 ONLINE 输出许可恢复。
- 能基于 `system_step.c -> UpsSystem_Step()` 准备导师问题。

## 导师问题

- 我用 `system_step.c -> UpsSystem_Step()` 把故障锁存、状态机和输出许可串起来。真实工程里这种系统仲裁层通常集中在哪个任务或模块？
- 我用 `simulations/results/ups_system_fault_closure.png` 看到锁存故障后 PFC 和逆变 PWM 都关闭。真实工程里是否存在故障后部分模块仍允许运行的分级保护？
- 我不会记录公司内部系统仲裁策略，只想确认组织方式：真实工程里复位后输出许可恢复是否有固定顺序和延时？
