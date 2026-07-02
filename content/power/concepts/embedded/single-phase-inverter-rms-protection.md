---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相逆变器 RMS 估算与欠压保护
tags:
  - power-electronics
status: learning
summary: 均方根（root mean square / RMS）是交流电压有效值的常用表示。对正弦电压，峰值约等于 RMS 值乘以 `sqrt(2)`。欠压保护（undervoltage protection / UV protection）不是看某一个瞬时采样点是否很低，而是常常先估算一段窗口内的 RMS，再配合保持时间判断是
---

# 概念：单相逆变器 RMS 估算与欠压保护

## 1. 它是什么

均方根（root mean square / RMS）是交流电压有效值的常用表示。对正弦电压，峰值约等于 RMS 值乘以 `sqrt(2)`。欠压保护（undervoltage protection / UV protection）不是看某一个瞬时采样点是否很低，而是常常先估算一段窗口内的 RMS，再配合保持时间判断是否故障。

本节中文主讲，只讲一个概念：不间断电源（uninterruptible power supply / UPS）固件不能拿瞬时正弦采样点直接判断输出欠压，必须理解 RMS 窗口和保护保持时间。

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. 为什么 UPS 需要它

单相全桥逆变器（single-phase full-bridge inverter）输出的是交流正弦电压。正弦波每半周都会过零，如果只看瞬时值，那么正常过零也会被误判为欠压。UPS 需要判断“有效输出能力是否低于要求”，所以要用 RMS 或类似的幅值估计。

保护逻辑还不能一过阈值就跳闸。采样噪声、负载瞬态和窗口边界都会造成短暂误判，因此固件通常会加保持时间、计数器或故障锁存（fault latch）。

## 3. 物理直觉

RMS 像是在问：“这一小段时间里，这个交流电压整体有多强？”窗口越长，越平滑，但反应越慢；窗口越短，反应越快，但更容易受相位和噪声影响。保持时间则像二次确认：只有 RMS 连续低于阈值一段时间，才认为是真的欠压。

## 4. 数学形式

滑动窗口 RMS：

```text
V_rms[k] = sqrt(mean(v[n]^2))   n in recent window
```

欠压保持计时：

```text
if V_rms < V_uv_threshold:
    timer += Ts
else:
    timer = 0

if timer >= hold_time:
    fault_latch = true
```

其中 `Ts` 是模数转换器（analog-to-digital converter / ADC）采样周期。

## 5. 仿真观察

运行：

```powershell
python simulations\python\single_phase_inverter_rms_protection.py
```

观察顺序：
- `v_out` 在 80 ms 到 140 ms 之间发生电压跌落。
- `V_rms` 不会在跌落瞬间立刻降到 160 Vrms，而是经过一个窗口逐渐下降。
- `Hold timer` 只有在 `V_rms` 低于阈值后才开始累计。
- `Trip latched` 一旦拉高，即使电压恢复也保持故障锁存。

脚本默认保存并自动打开图片；如果无法自动打开，会打印完整图片路径。

一个仿真任务：

```powershell
python simulations\python\single_phase_inverter_rms_protection.py --undervoltage-hold-time 0.005 --output simulations\results\inverter_rms_hold_5ms.png --no-open
python simulations\python\single_phase_inverter_rms_protection.py --undervoltage-hold-time 0.030 --output simulations\results\inverter_rms_hold_30ms.png --no-open
```

对比 5 ms 和 30 ms 保持时间下的 `Hold timer` 与 `Trip latched`。文件名和图内参数框都说明当前保持时间。

## 6. 固件落地

典型固件链路：

```text
ADC sample Vout
  -> scaling and offset calibration
  -> square and sliding-window accumulation
  -> RMS estimate
  -> threshold compare
  -> hold timer / debounce counter
  -> fault latch and state-machine action
```

工程实现还要处理 ADC 偏置、采样同步、定点数溢出、窗口长度、故障清除条件和状态机优先级。

## 7. 常见误解

- 错误理解：瞬时电压低于阈值就是欠压。  
  正确理解：正弦波正常过零时瞬时电压也接近 0，欠压通常看 RMS 或幅值估计。
- 错误理解：RMS 窗口越长越好。  
  正确理解：窗口越长越稳，但故障发现越慢。
- 错误理解：电压恢复后故障应该自动消失。  
  正确理解：很多 UPS 保护会故障锁存，需要状态机判断是否允许清除。

## 8. 验收标准

- 能解释 RMS 为什么比瞬时电压更适合判断交流输出幅值。
- 能说出 RMS 窗口长度和保护响应速度之间的取舍。
- 能在图中指出 `v_out`、`V_rms`、欠压阈值、保持时间和故障锁存。
- 能解释为什么首次跳闸时间晚于首次越阈值时间。
- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 为什么正弦波正常过零不能被当作欠压故障？
- 如果 RMS 窗口从 1 周期改成 0.5 周期，响应速度和误判风险会怎么变化？
- 为什么电压恢复后 `Trip latched` 仍然保持为 1？这和状态机有什么关系？

## 10. 导师问题

- 我用 `single_phase_inverter_rms_protection.py` 看到 RMS 估算在电压跌落后约一个窗口才明显下降。公司平台输出欠压保护使用半周、一周还是多周 RMS 窗口？
- 仿真里 `UV threshold=180 Vrms` 且 `hold=15 ms` 后才跳闸。真实固件中欠压保持时间通常用计数器、定时器还是状态机周期累计？
- 图中电压恢复后 `Trip latched` 仍保持为 1。公司代码里输出欠压故障需要人工清除、自动恢复，还是满足某些模式条件才清除？
