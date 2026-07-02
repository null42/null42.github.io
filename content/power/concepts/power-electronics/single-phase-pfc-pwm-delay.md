---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相 PFC 的 PWM/ADC 时序与控制延迟
tags:
  - power-electronics
status: learning
summary: "功率因数校正（power factor correction / PFC）电流环不是“采样后立刻作用于功率级”。模数转换器（analog-to-digital converter / ADC）采样、控制计算、脉宽调制（pulse-width modulation / PWM）寄存器更新之间存在控制延迟（control "
---

# 概念：单相 PFC 的 PWM/ADC 时序与控制延迟

## 1. 它是什么

功率因数校正（power factor correction / PFC）电流环不是“采样后立刻作用于功率级”。模数转换器（analog-to-digital converter / ADC）采样、控制计算、脉宽调制（pulse-width modulation / PWM）寄存器更新之间存在控制延迟（control delay）。

本节只讲采样点（sampling point）、PWM 更新点和延迟如何影响电流跟踪，不展开完整开关级模型。

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）里的 PFC 电流环通常运行很快。即使算法公式正确，如果采样点靠近开关噪声、PWM 更新晚一个或几个周期，实际电流也会落后参考，导致：

- 电流跟踪误差变大。
- 占空比补偿滞后。
- 高频噪声和采样抖动进入控制环。
- 电流环稳定裕度变差。

## 3. 物理直觉

控制延迟像开车时后视镜画面延迟。你看到的是稍早的状态，打方向盘作用到车辆也要一段时间。延迟越大，越容易修正过头或跟不上目标。

## 4. 数学形式

理想无延迟：

```text
u[k] = controller(i_ref[k] - iL[k])
```

有延迟时，可以近似写成：

```text
u[k] = controller(i_ref[k - N] - iL[k - N])
delay_time = N * Ts
```

其中 `N` 是延迟的控制周期数，`Ts` 是控制周期。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_pfc_pwm_delay.py
```

对比一个仿真任务：

```powershell
python simulations\python\single_phase_pfc_pwm_delay.py --delay-samples 0 --output simulations\results\pfc_pwm_delay_0.png --no-open
python simulations\python\single_phase_pfc_pwm_delay.py --delay-samples 5 --output simulations\results\pfc_pwm_delay_5.png --no-open
```

观察：

- 电流参考 `iref` 与含延迟的实际电流 `iL` 是否有相位差。
- 跟踪误差是否随延迟增大而变大。
- ADC 采样点和 PWM 更新点是否清楚标出。
- 参数框中的延迟样本数和微秒数。

## 6. 固件落地

真实固件中，相关问题通常出现在：

- ADC 触发时刻是否避开开关边沿。
- ADC 转换完成中断和控制 ISR 的先后关系。
- PWM 比较寄存器是立即更新还是在周期边界影子加载。
- 控制计算是否跨周期生效。

读代码时要沿着“PWM 触发 ADC -> ADC 完成 -> ISR 计算 -> PWM 更新”追踪。

## 7. 常见误解

- 错误理解：控制公式对了，时序不重要。  
  正确理解：数字电源控制里，采样和更新时序直接影响相位裕度。

- 错误理解：采样越靠近边沿越及时。  
  正确理解：边沿附近开关噪声大，采样可能更差。

- 错误理解：延迟只影响高频细节。  
  正确理解：延迟会表现成相位滞后，电流环带宽越高越敏感。

## 8. 验收标准

- 能解释 ADC 采样点、ISR 计算、PWM 更新点之间的先后关系。
- 能把延迟样本数换算成微秒。
- 能在图中指出 `iref`、含延迟 `iL`、误差、ADC 采样点和 PWM 更新点。
- 能解释为什么延迟会增大跟踪误差。
- 能基于 `single_phase_pfc_pwm_delay.py` 的仿真图准备具体导师问题。

## 9. 复盘问题

- 默认仿真中，延迟是几个控制周期？对应多少微秒？
- 把 `--delay-samples` 从 0 改到 5 后，RMS tracking error 如何变化？
- 如果真实工程使用 PWM 影子寄存器，控制输出通常什么时候生效？

## 10. 导师问题

- 我用 `single_phase_pfc_pwm_delay.py` 看到 3 个控制周期延迟会增大 RMS 跟踪误差。公司 PFC 电流环从 ADC 采样到 PWM 生效通常有几个周期延迟？
- 图中标出了 ADC 采样点和 PWM 更新点。公司平台一般在 PWM 周期的哪个位置触发 ADC 采样？
- PWM 比较寄存器是立即更新还是影子寄存器周期边界更新？这对控制延迟怎么算？
