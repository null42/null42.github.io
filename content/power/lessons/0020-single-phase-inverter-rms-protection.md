---
title: 教程 0020：单相逆变器的均方根（root mean square / RMS）估算与欠压保护
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0020-single-phase-inverter-rms-protection.html
status: learning
visibility: public
summary: Imported from 0020-single-phase-inverter-rms-protection.html
chapterOrder: 10
---

# 教程 0020：单相逆变器的均方根（root mean square / RMS）估算与欠压保护

中文主讲。一个概念：不间断电源（uninterruptible power supply / UPS）固件不能用正弦瞬时采样值直接判断欠压，必须看 RMS 窗口、阈值、保持时间和故障锁存。

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

均方根（root mean square / RMS）是交流电压有效值的常用表示。对理想正弦电压，峰值约等于 RMS 值乘以 `sqrt(2)`。

欠压保护（undervoltage protection / UV protection）通常不会只看某个瞬时采样点。固件会用模数转换器（analog-to-digital converter / ADC）采样输出电压，计算滑动窗口 RMS，再配合保持时间和故障锁存（fault latch）决定是否进入故障状态。

本节场景仍然是单相全桥逆变器（single-phase full-bridge inverter）输出正弦电压，但重点从电压控制转向保护判断。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）输出是交流正弦波。正弦波每半周都会过零，如果直接用瞬时电压和欠压阈值比较，正常过零点会被误判为欠压。工程上真正关心的是“这一小段时间内，输出电压有效值是否太低”。

欠压保护还需要抗干扰。采样噪声、负载突变、切换瞬态都可能让 RMS 短暂低于阈值。如果一过阈值就跳闸，系统会很容易误保护；如果保持时间太长，真实故障又发现太慢。

## 3. 物理直觉

RMS 像是在问：“最近这一小段波形整体有多强？”窗口越长，估算越平滑，但响应越慢；窗口越短，响应越快，但更容易受相位、噪声和局部畸变影响。

保持时间相当于二次确认：不是看到一次低于阈值就跳闸，而是要求 `V_rms` 连续低于阈值一段时间。故障锁存则表示：一旦确认故障，不能因为电压刚恢复就立刻忘掉，必须交给状态机处理。

    ADC采样
    v_out[k]

    平方/窗口
    mean(v^2)

    RMS估算
    sqrt(mean)

    阈值/保持
    UV timer

    故障锁存
    fault latch

    本节只看输出欠压判断，不讨论所有保护优先级

图 1：从 ADC 采样到 RMS 估算，再到欠压保持时间和故障锁存。

## 4. 数学形式

  V_rms[k] = sqrt(mean(v[n]^2))   n in recent window

if V_rms[k] = hold_time:
    fault_latch = true

`Ts` 是 ADC 采样周期。真实固件里常用定点数和累加器实现，必须考虑缩放、偏置、溢出和窗口更新效率。

## 5. 仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_inverter_rms_protection.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含额定 RMS、跌落 RMS、输出频率、RMS 窗口、欠压阈值、保持时间、ADC 增益/偏置、采样频率、跌落区间、首次越阈值、首次跳闸和仿真时长。

    一个仿真任务
    python simulations\python\single_phase_inverter_rms_protection.py --undervoltage-hold-time 0.005 --output simulations\results\inverter_rms_hold_5ms.png
python simulations\python\single_phase_inverter_rms_protection.py --undervoltage-hold-time 0.030 --output simulations\results\inverter_rms_hold_30ms.png

对比 5 ms 和 30 ms 保持时间下的 `Hold timer` 与 `Trip latched`。文件名和图内参数框都说明当前保持时间。

观察顺序：

- 先看 `v_out` 在 80 ms 到 140 ms 之间是否发生跌落。

- 再看 `Sliding RMS estimate V_rms` 是否滞后于瞬时电压跌落。

- 看 `Hold timer` 是否只在 RMS 低于阈值后累计。

- 最后看 `Trip latched` 是否一旦拉高就保持。

## 6. 固件落地

固件中可按下面链路找变量：

  ADC sample Vout
  -> scaling and offset calibration
  -> square and sliding-window accumulation
  -> RMS estimate
  -> threshold compare
  -> hold timer / debounce counter
  -> fault latch and state-machine action

工程重点包括 ADC 偏置校准、采样同步、窗口长度、定点数溢出、保护计数器、故障清除条件和状态机优先级。RMS 估算本身不是保护全部，保护还要决定是否关 PWM、是否切旁路、是否允许自动恢复。

## 7. 常见误解

- **误解：**瞬时电压低于阈值就是欠压。
**纠正：**正弦波正常过零时瞬时电压也接近 0，欠压通常看 RMS 或幅值估计。

- **误解：**RMS 窗口越长越好。
**纠正：**窗口越长越稳，但故障发现越慢；窗口太短又更容易误判。

- **误解：**电压恢复后故障应该自动消失。
**纠正：**很多 UPS 保护会故障锁存，需要状态机判断是否允许清除。

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

**下一步：**可以继续把输出保护和逆变器控制放进同一个简化状态机，观察故障锁存、PWM 禁止和恢复条件如何互相影响。

关联：[上一节：单相逆变器 PR 电压控制](0019-single-phase-inverter-pr-control.html)；源稿：`concepts/embedded/single-phase-inverter-rms-protection.md`。

    上一节：教程 0019：单相逆变器比例谐振控制（proportional resonant control / PR control）
    下一节：教程 0021：单相逆变器状态机（state machine）与故障锁存
