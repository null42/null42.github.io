---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS 保护标志（UPS protection flags）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0027-ups-c-protection-flags.html` 的源稿和补充资料。它只使用教学采样序列和教学阈值，不包含公司内部保护阈值、未公开产品方案、客户项目参数或内部测试数据。向导师提问时不能记录公司内部保护阈值，不能记录内部测试数据，不能记录客户项目参数。
---

# 概念：UPS 保护标志（UPS protection flags）

本页是 `lessons/0027-ups-c-protection-flags.html` 的源稿和补充资料。它只使用教学采样序列和教学阈值，不包含公司内部保护阈值、未公开产品方案、客户项目参数或内部测试数据。向导师提问时不能记录公司内部保护阈值，不能记录内部测试数据，不能记录客户项目参数。

## 1. 它是什么

UPS 保护标志（UPS protection flags）是把不间断电源（uninterruptible power supply / UPS）的采样值（sampled measurement）和参数表比较后得到的一组布尔结果，例如欠压、过压、旁路不同步和是否需要停机。

本节只讲一个概念：`采样值 + 参数表 -> 保护标志`。

保护标志不是故障锁存（fault latch）。保护标志描述“此刻是否越界”，故障锁存描述“故障是否已经被确认并保持到复位”。本节先讲前者，下一节再讲去抖和锁存。

## 2. 为什么 UPS 需要它

UPS 控制软件不能只看控制环路输出。市电异常、直流母线过压、旁路不同步等条件会直接影响模式切换、脉宽调制（pulse-width modulation / PWM）使能和故障锁存。

如果保护判断分散在状态机、驱动和控制环里，阅读工程时很难知道“这个故障是谁判出来的”。集中保护标志能让你先读清楚保护来源，再看状态机如何消费这些标志。

采样值先由模数转换器（analog-to-digital converter / ADC）采到原始码，再经采样调理和标定换算成 V、ms 等工程单位。采样值先换算成工程单位，再进入保护判断，这样保护模块才不需要理解 ADC 通道号和比例系数。

## 3. 物理直觉

保护模块像值班员。采样模块把电压、同步时间等读数送过来；参数表提供边界；保护模块只回答“是否越界”。状态机和输出模块再决定是否切换模式或关闭执行器。

## 4. 数学形式

```text
mains_undervoltage = mains_rms_v < mains_uv_threshold_v
dc_bus_overvoltage = dc_bus_v > dc_bus_ov_threshold_v
bypass_not_synchronized = bypass_sync_ms < bypass_sync_hold_ms
shutdown_required = mains_undervoltage OR dc_bus_overvoltage
```

术语：

- 欠压保护（undervoltage protection / UVP）
- 过压保护（overvoltage protection / OVP）
- 旁路不同步（bypass not synchronized）
- 控制中断服务程序（control interrupt service routine / control ISR）

## 5. 仿真任务与仿真观察

运行：

```powershell
python simulations\python\ups_protection_flags.py --no-open
```

默认运行时会保存：

```text
simulations/results/ups_protection_flags.png
```

图中包含市电 RMS 电压、直流母线电压、旁路同步保持时间、保护标志、阈值线、图例和参数框。默认不加 `--no-open` 时脚本会尝试自动打开图片；打不开时会打印完整路径。

同时编译运行 C 骨架后，应能看到：

```text
protection_flags: mains_uv=1 dc_bus_ov=1 bypass_not_sync=1 shutdown=1
```

## 6. 固件落地

- `UpsMeasurements`：采样后换算到工程单位的测量值。
- `UpsProtectionFlags`：保护判断结果。
- `UpsProtection_Evaluate()`：把测量值和 `UpsParameters` 组合，输出保护标志。
- `main.c`：打印教学保护标志，形成可向导师提问的具体产物。

## 7. 常见误解

- 错误理解：保护就是状态机里多写几个 if。  
  正确理解：保护判断最好有清楚输入、阈值和输出标志，状态机消费标志。
- 错误理解：保护标志只要会触发停机就够了。  
  正确理解：有些保护触发停机，有些只禁止旁路或降额，需要分层表达。
- 错误理解：仿真图只要看最终有没有故障。  
  正确理解：要看采样量何时跨过阈值，以及保护标志是否同步变化。

## 8. 验收标准

- 能运行 `python simulations\python\ups_protection_flags.py --no-open` 并打开 `simulations/results/ups_protection_flags.png`。
- 能解释市电 RMS、直流母线和旁路同步保持时间分别如何触发保护标志。
- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `protection_flags` 输出。
- 能基于 `protection.c -> UpsProtection_Evaluate()` 准备导师问题。

## 9. 复盘问题

- 为什么保护模块应该接收工程单位的采样值，而不是直接接收 ADC 原始码？
- 为什么旁路不同步不一定等于系统必须停机？
- 如果市电电压在阈值附近抖动，当前教学代码会出现什么问题？
- 保护标志和故障锁存的职责差别是什么？

## 10. 导师问题

- 我用 `protection.c -> UpsProtection_Evaluate()` 把采样值和参数表集中生成保护标志。真实工程里保护判断通常在控制 ISR、保护任务，还是状态机任务里执行？
- 我用 `simulations/results/ups_protection_flags.png` 看到采样量跨过阈值后标志变为 1。真实工程里保护通常会不会加滤波、去抖或保持时间？
- 我不会记录公司内部保护阈值，只想确认组织方式：真实工程里哪些保护会直接停机，哪些只影响旁路或输出许可？
