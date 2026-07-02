---
title: 教程 0012：单相功率因数校正（power factor correction / PFC）的 PWM/ADC 时序与控制延迟
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0012-single-phase-pfc-pwm-delay.html
status: learning
visibility: public
summary: Imported from 0012-single-phase-pfc-pwm-delay.html
chapterOrder: 10
---

# 教程 0012：单相功率因数校正（power factor correction / PFC）的 PWM/ADC 时序与控制延迟

中文主讲。一个概念：采样、计算、PWM 更新不是同时发生的，延迟会让电流跟踪变差；一个仿真任务：比较 0 个和 5 个控制周期延迟下的跟踪误差。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

PFC 电流环不是“采样后立刻作用于功率级”。模数转换器（analog-to-digital converter / ADC）采样、控制计算、脉宽调制（pulse-width modulation / PWM）更新之间存在控制延迟（control delay）。

采样点（sampling point）是 ADC 读取电压或电流的时刻。控制中断服务程序（interrupt service routine / ISR）完成计算后，PWM 更新点才是新占空比真正进入 PWM 比较寄存器并在功率级生效的时刻。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）里的 PFC 电流环通常运行很快。即使控制公式正确，如果采样点靠近开关噪声，或者 PWM 更新晚几个周期，实际电流也会落后参考。

- 电流跟踪误差变大。

- 占空比补偿滞后。

- 采样噪声进入控制环。

- 电流环稳定裕度变差。

## 3. 物理直觉

控制延迟像后视镜画面延迟。你看到的是稍早的状态，打方向盘作用到车辆也要一段时间。延迟越大，越容易跟不上目标。

    ADC采样
    iL[k]

    ISR计算
    控制器输出

    PWM更新
    影子寄存器加载

    功率级响应
    iL变化

    总延迟 = ADC转换 + ISR计算 + PWM加载 + 功率级响应

图 1：本节只看延迟对跟踪的影响，不展开真实开关纹波。

## 4. 数学形式

理想无延迟：

  u[k] = controller(i_ref[k] - iL[k])

有延迟时可近似写成：

  u[k] = controller(i_ref[k - N] - iL[k - N])
delay_time = N * Ts

其中 `N` 是延迟的控制周期数，`Ts` 是控制周期。延迟越大，相位滞后越明显。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pfc_pwm_delay.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含电流参考、含延迟实际电流、误差、ADC采样点、PWM更新点和参数框。

    对比实验
    python simulations\python\single_phase_pfc_pwm_delay.py --delay-samples 0 --output simulations\results\pfc_pwm_delay_0.png --no-open
python simulations\python\single_phase_pfc_pwm_delay.py --delay-samples 5 --output simulations\results\pfc_pwm_delay_5.png --no-open

比较 0 个周期延迟和 5 个周期延迟时，跟踪误差的均方根值（root mean square / RMS）如何变化。

观察顺序：

- 先看 `iref` 和 `iL` 的相位差。

- 看均方根值（root mean square / RMS） tracking error 是否随延迟增加。

- 看 ADC 采样点和 PWM 更新点是否错开。

- 把延迟样本数换算成微秒。

## 6. 固件落地

真实固件中，要沿着这条链路查：

- PWM 在哪个计数位置触发 ADC。

- ADC 转换完成后是否立刻进入控制 ISR。

- 控制 ISR 计算出的占空比是立即更新，还是写入影子寄存器。

- PWM 比较值在当前周期还是下个周期生效。

这些时序决定电流环的有效延迟，也会影响可达到的环路带宽。

## 7. 常见误解

- **误解：**控制公式对了，时序不重要。
**纠正：**数字电源里，采样和更新时序直接影响相位裕度。

- **误解：**采样越靠近开关边沿越及时。
**纠正：**边沿附近开关噪声大，采样可能更差。

- **误解：**延迟只影响高频细节。
**纠正：**延迟会表现成相位滞后，电流环带宽越高越敏感。

## 8. 验收标准

- 能解释 ADC 采样点、ISR 计算、PWM 更新点之间的先后关系。

- 能把延迟样本数换算成微秒。

- 能在图中指出 `iref`、含延迟 `iL`、误差、ADC采样点和PWM更新点。

- 能解释为什么延迟会增大跟踪误差。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 默认仿真中，延迟是几个控制周期？对应多少微秒？

- 把 `--delay-samples` 从 0 改到 5 后，RMS tracking error 如何变化？

- 如果真实工程使用 PWM 影子寄存器，控制输出通常什么时候生效？

## 10. 导师问题

- 我用 `single_phase_pfc_pwm_delay.py` 看到 3 个控制周期延迟会增大 RMS 跟踪误差。公司 PFC 电流环从 ADC 采样到 PWM 生效通常有几个周期延迟？

- 图中标出了 ADC 采样点和 PWM 更新点。公司平台一般在 PWM 周期的哪个位置触发 ADC 采样？

- PWM 比较寄存器是立即更新还是影子寄存器周期边界更新？这对控制延迟怎么算？

**下一步：**后续可以把 PFC 电流环、PWM/ADC 时序和前馈组合成更完整的平均 PFC 控制框图。

关联：[上一节：单相 PFC 内层电流环](0011-single-phase-pfc-current-loop.html)；源稿：`concepts/power-electronics/single-phase-pfc-pwm-delay.md`。

    上一节：教程 0011：单相功率因数校正（power factor correction / PFC）内层电流环
    下一节：教程 0013：单相功率因数校正（power factor correction / PFC）的输入电压前馈
