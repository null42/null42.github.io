---
title: 教程 0029：系统故障闭环
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0029-ups-system-fault-closure.html
status: learning
visibility: public
summary: Imported from 0029-ups-system-fault-closure.html
chapterOrder: 10
---

# 教程 0029：系统故障闭环

中文主讲。一个概念：故障锁存必须闭环影响模式状态机和输出许可，否则保护只是“看见了故障”，还没有真正保护系统。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学仲裁逻辑和教学故障序列，不包含公司内部系统仲裁策略、未公开产品方案、客户项目参数或内部测试数据。

## 1. 它是什么

系统故障闭环（system fault closure）是把故障锁存（fault latch）、UPS 模式状态机（UPS mode state machine）和输出许可（output permission）连起来：故障锁存后，系统强制进入故障模式并关闭输出；安全复位条件（safe-to-reset condition）满足后，再允许回到正常模式。

本节只讲一个概念：故障不是只存在于保护模块里，它必须闭环影响模式和执行器许可。

## 2. 为什么 UPS 需要它

如果保护模块已经判定严重故障，但模式状态机仍然停留在在线模式，输出许可仍然打开，那么保护判断就没有真正保护系统。反过来，如果复位条件没有经过统一仲裁，某个模块可能提前恢复输出，造成危险。

系统闭环的价值是建立一条可审查路径：保护标志 -> 故障锁存 -> 模式强制 -> 输出关闭 -> 安全复位。

## 3. 物理直觉

保护标志像发现异常，故障锁存像拉下急停，模式状态机像切换运行牌，输出许可像接触器和 PWM 的允许线。只有这几者串起来，故障才真正进入系统行为。

## 4. 数学形式

  latched_fault = FaultLatch(protection_fault, reset_request, safe_to_reset)

if latched_fault:
    mode = FAULT
    output_permission = all_off
else:
    mode = ModeStateMachine(input)
    output_permission = OutputsFromMode(mode)

这里的 PWM 指脉宽调制（pulse-width modulation / PWM）。安全复位条件不是“按了复位按钮”本身，而是复位请求和安全输入同时满足。

## 5. 一个仿真任务与仿真观察

运行 Python 仿真：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_system_fault_closure.py

只保存图片、不自动打开：

  python simulations\python\ups_system_fault_closure.py --no-open

    产物

- `simulations/results/ups_system_fault_closure.png`

- 终端输出：故障是否强制模式、故障期间输出是否关闭、复位后是否回到在线模式。

- 图内包含参数框、图例、故障锁存、模式码和输出许可。

观察顺序：先看保护故障输入触发锁存；再看模式码被强制到 FAULT；然后看 PFC 和逆变 PWM 输出许可变为 0；最后看复位请求和安全复位条件满足后，系统回到 ONLINE 并恢复输出许可。

## 6. 固件落地

- `system_step.c`：教学系统仲裁层。

- `UpsSystem_Step()`：把故障锁存、模式状态机和输出许可串起来。

- `UpsFaultLatch_Step()`：提供锁存故障状态。

- `UpsModeStateMachine_Step()`：在没有锁存故障时决定模式。

- `UpsOutputs_FromMode()`：把模式和故障锁存变成输出许可。

## 7. 常见误解

- **误解：**保护模块置位后就算保护完成。
**纠正：**保护必须影响模式和输出许可，才算闭环。

- **误解：**状态机内部应该直接判断所有采样阈值。
**纠正：**更清晰的分层是保护模块判断标志，锁存模块确认故障，系统仲裁层强制模式。

- **误解：**复位只要清锁存即可。
**纠正：**复位后还要确认输出许可和模式恢复顺序。

## 8. 验收标准

- 能运行 `python simulations\python\ups_system_fault_closure.py --no-open` 并打开 `simulations/results/ups_system_fault_closure.png`。

- 能解释锁存故障为什么强制模式为 FAULT。

- 能解释故障期间 PFC 和逆变 PWM 为什么必须关闭。

- 能解释安全复位后为什么才允许 ONLINE 输出许可恢复。

- 能基于 `system_step.c -> UpsSystem_Step()` 准备导师问题。

## 9. 复盘问题

- 为什么故障锁存不能只停留在保护模块内部？

- 为什么输出许可要由模式和故障锁存共同决定？

- 为什么复位后还需要关注输出恢复顺序，而不是直接全部打开？

## 10. 导师问题

- 我用 `system_step.c -> UpsSystem_Step()` 把故障锁存、状态机和输出许可串起来。真实工程里这种系统仲裁层通常集中在哪个任务或模块？

- 我用 `simulations/results/ups_system_fault_closure.png` 看到锁存故障后 PFC 和逆变 PWM 都关闭。真实工程里是否存在故障后部分模块仍允许运行的分级保护？

- 我不会记录公司内部系统仲裁策略，只想确认组织方式：真实工程里复位后输出许可恢复是否有固定顺序和延时？

**下一步：**可以继续补日志记录和故障码，把“发生了什么、何时发生、谁触发的”记录下来，形成可调试的 UPS 软件骨架。

关联：[上一节：保护去抖与故障锁存](0028-ups-fault-latch-debounce.html)；源稿：`concepts/embedded/ups-system-fault-closure.md`；仿真：`simulations/python/ups_system_fault_closure.py`。

    上一节：教程 0028：保护去抖与故障锁存
    下一节：教程 0030：故障码与故障日志
