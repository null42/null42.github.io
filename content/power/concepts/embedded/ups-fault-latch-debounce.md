---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：保护去抖与故障锁存（protection debounce and fault latch）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0028-ups-fault-latch-debounce.html` 的源稿和补充资料。它只使用教学故障序列和教学确认次数，不包含公司内部故障策略、未公开产品方案、客户项目参数或内部测试数据。
---

# 概念：保护去抖与故障锁存（protection debounce and fault latch）

本页是 `lessons/0028-ups-fault-latch-debounce.html` 的源稿和补充资料。它只使用教学故障序列和教学确认次数，不包含公司内部故障策略、未公开产品方案、客户项目参数或内部测试数据。

## 它是什么

保护去抖（protection debounce）是要求保护标志连续满足若干次后才确认故障。故障锁存（fault latch）是故障一旦确认，即使瞬时输入恢复正常，也保持故障状态，直到复位请求（reset request）和安全复位条件（safe-to-reset condition）同时满足。

本节只讲一个概念：瞬时保护标志不能直接等于最终故障状态。

## 为什么 UPS 需要它

UPS 的采样值会有噪声、纹波和瞬态扰动。如果一个采样点越界就立刻锁死，系统会被短毛刺频繁打断。但如果故障确认后不锁存，严重故障又可能因为输入短暂恢复而被自动清掉。

去抖解决“短毛刺误触发”，锁存解决“严重故障必须保持并等待人工或系统复位”。

## 物理直觉

保护标志像报警铃声，去抖像“连续听到几声才确认不是误响”，故障锁存像“确认火警后不能因为铃声停了一下就自动解除警报”。

## 数学形式

```text
if reset_request AND safe_to_reset:
    consecutive_fault_count = 0
    latched_fault = 0
else if fault_input:
    consecutive_fault_count += 1
    if consecutive_fault_count >= fault_confirm_count:
        latched_fault = 1
else:
    consecutive_fault_count = 0
```

其中 `fault_confirm_count` 是教学确认次数，不代表真实产品参数。

## 仿真观察

运行：

```powershell
python simulations\python\ups_fault_latch_debounce.py --no-open
```

默认生成：

```text
simulations/results/ups_fault_latch_debounce.png
```

图中包含原始故障输入、去抖故障、连续故障计数、确认阈值、锁存故障、复位请求和安全复位条件。默认不加 `--no-open` 时脚本会尝试自动打开图片；打不开时会打印完整路径。

## 固件落地

- `UpsFaultLatch`：保存连续故障计数和锁存状态。
- `UpsFaultLatch_Step()`：每个控制中断服务程序（control interrupt service routine / control ISR）周期或保护任务周期调用一次。
- `fault_input`：来自 `UpsProtection_Evaluate()` 的瞬时保护标志。
- `reset_request && safe_to_reset`：复位必须同时有请求和安全条件。

## 常见误解

- 错误理解：去抖会让保护变慢，所以不该用。  
  正确理解：关键保护要权衡响应速度和误触发，确认次数必须按风险分级。
- 错误理解：故障输入恢复正常就应该自动清锁存。  
  正确理解：严重故障通常需要复位请求、安全条件和记录闭环。
- 错误理解：所有保护都用同一个确认次数。  
  正确理解：过流、过压、温度、旁路同步等保护的时间尺度不同。

## 验收标准

- 能运行 `python simulations\python\ups_fault_latch_debounce.py --no-open` 并打开 `simulations/results/ups_fault_latch_debounce.png`。
- 能解释短毛刺为什么没有锁存。
- 能解释连续故障为什么锁存。
- 能解释为什么复位需要 `reset_request && safe_to_reset`。
- 能基于 `fault_latch.c -> UpsFaultLatch_Step()` 准备导师问题。

## 导师问题

- 我用 `fault_latch.c -> UpsFaultLatch_Step()` 看到故障确认次数和锁存分开实现。真实工程里不同保护会不会有不同确认时间？
- 我用 `simulations/results/ups_fault_latch_debounce.png` 看到短毛刺没有锁存。真实工程里哪些保护允许去抖，哪些保护必须快速关断？
- 我不会记录公司内部故障策略，只想确认组织方式：真实工程里复位请求和安全复位条件通常在哪个模块统一判断？
