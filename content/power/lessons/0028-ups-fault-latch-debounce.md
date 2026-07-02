---
title: 教程 0028：保护去抖与故障锁存
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0028-ups-fault-latch-debounce.html
status: learning
visibility: public
summary: Imported from 0028-ups-fault-latch-debounce.html
chapterOrder: 10
---

# 教程 0028：保护去抖与故障锁存

中文主讲。一个概念：瞬时保护标志不能直接等于最终故障状态，必须经过确认、锁存和安全复位。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学故障序列和教学确认次数，不包含公司内部故障策略、未公开产品方案、客户项目参数或内部测试数据。

## 1. 它是什么

保护去抖（protection debounce）是要求保护标志连续满足若干次后才确认故障。故障锁存（fault latch）是故障一旦确认，即使瞬时输入恢复正常，也保持故障状态，直到复位请求（reset request）和安全复位条件（safe-to-reset condition）同时满足。

本节只讲一个概念：瞬时保护标志不能直接等于最终故障状态。

## 2. 为什么 UPS 需要它

UPS 的采样值会有噪声、纹波和瞬态扰动。如果一个采样点越界就立刻锁死，系统会被短毛刺频繁打断。但如果故障确认后不锁存，严重故障又可能因为输入短暂恢复而被自动清掉。

去抖解决“短毛刺误触发”，锁存解决“严重故障必须保持并等待人工或系统复位”。

## 3. 物理直觉

保护标志像报警铃声，去抖像“连续听到几声才确认不是误响”，故障锁存像“确认火警后不能因为铃声停了一下就自动解除警报”。

## 4. 数学形式

  if reset_request AND safe_to_reset:
    consecutive_fault_count = 0
    latched_fault = 0
else if fault_input:
    consecutive_fault_count += 1
    if consecutive_fault_count >= fault_confirm_count:
        latched_fault = 1
else:
    consecutive_fault_count = 0

`fault_confirm_count` 是教学确认次数，不代表真实产品参数。这个逻辑可以放在控制中断服务程序（control interrupt service routine / control ISR）周期里，也可以放在固定周期保护任务里。

## 5. 一个仿真任务与仿真观察

运行 Python 仿真：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_fault_latch_debounce.py

只保存图片、不自动打开：

  python simulations\python\ups_fault_latch_debounce.py --no-open

    产物

- `simulations/results/ups_fault_latch_debounce.png`

- 终端输出：短毛刺是否锁存、连续故障是否锁存、复位是否清除锁存。

- 图内包含参数框、图例、确认次数阈值和复位条件。

观察顺序：先看短毛刺只持续 1 个采样点，连续计数没到确认次数；再看连续故障让计数达到阈值并锁存；最后看复位请求和安全复位条件同时为 1 后锁存清除。

## 6. 固件落地

- `UpsFaultLatch`：保存连续故障计数和锁存状态。

- `UpsFaultLatch_Step()`：每个 ISR 周期或保护任务周期调用一次。

- `fault_input`：来自上一节 `UpsProtection_Evaluate()` 的瞬时保护标志。

- `reset_request && safe_to_reset`：复位必须同时有请求和安全条件。

## 7. 常见误解

- **误解：**去抖会让保护变慢，所以不该用。
**纠正：**关键保护要权衡响应速度和误触发，确认次数必须按风险分级。

- **误解：**故障输入恢复正常就应该自动清锁存。
**纠正：**严重故障通常需要复位请求、安全条件和记录闭环。

- **误解：**所有保护都用同一个确认次数。
**纠正：**过流、过压、温度、旁路同步等保护的时间尺度不同。

## 8. 验收标准

- 能运行 `python simulations\python\ups_fault_latch_debounce.py --no-open` 并打开 `simulations/results/ups_fault_latch_debounce.png`。

- 能解释短毛刺为什么没有锁存。

- 能解释连续故障为什么锁存。

- 能解释为什么复位需要 `reset_request && safe_to_reset`。

- 能基于 `fault_latch.c -> UpsFaultLatch_Step()` 准备导师问题。

## 9. 复盘问题

- 为什么短毛刺不应该直接触发故障锁存？

- 为什么连续故障确认后，即使输入恢复，也不能自动清锁存？

- 如果过流保护和温度保护都用同一个确认次数，会有什么风险？

## 10. 导师问题

- 我用 `fault_latch.c -> UpsFaultLatch_Step()` 看到故障确认次数和锁存分开实现。真实工程里不同保护会不会有不同确认时间？

- 我用 `simulations/results/ups_fault_latch_debounce.png` 看到短毛刺没有锁存。真实工程里哪些保护允许去抖，哪些保护必须快速关断？

- 我不会记录公司内部故障策略，只想确认组织方式：真实工程里复位请求和安全复位条件通常在哪个模块统一判断？

**下一步：**可以把故障锁存结果接回 UPS 模式状态机，让故障状态、输出许可和复位流程形成完整闭环。

关联：[上一节：UPS 保护标志](0027-ups-c-protection-flags.html)；源稿：`concepts/embedded/ups-fault-latch-debounce.md`；仿真：`simulations/python/ups_fault_latch_debounce.py`。

    上一节：教程 0027：UPS 保护标志
    下一节：教程 0029：系统故障闭环
