---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）
tags:
  - power-electronics
status: learning
summary: 脉宽调制（pulse-width modulation / PWM）是用固定开关频率下的导通时间比例来控制功率开关。这个比例叫占空比（duty cycle / D）。
---

# 概念：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）

## 1. 它是什么

脉宽调制（pulse-width modulation / PWM）是用固定开关频率下的导通时间比例来控制功率开关。这个比例叫占空比（duty cycle / D）。

模数转换器采样（analog-to-digital converter / ADC sampling）是把电压、电流等模拟量在某个时刻转换成数字量，交给控制中断服务程序（control interrupt service routine / control ISR）计算下一次控制输出。

本节只讲一个点：**PWM 决定功率级什么时候切换，ADC 决定固件在什么时候“看见”功率级。**

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）控制软件不是连续观察电路，而是在固定时刻采样，再在固定中断里计算。

如果采样时刻不合适，固件可能看到：

- 开关噪声尖峰，而不是真实平均电流。
- 电感电流谷底，误以为电流太小或进入异常状态。
- 控制延迟增大，导致电压环或电流环相位裕度变差。

所以读 UPS C 语言工程时，必须看懂 PWM 更新事件、ADC 触发事件和控制 ISR 的时间关系。

## 3. 物理直觉

Boost 开关导通时，电感电流上升；开关关断时，电感电流下降。电流波形不是平滑直线，而是带有开关纹波。

ADC 如果刚好在开关跳变附近采样，就容易采到尖峰、振铃或驱动噪声。工程上常把采样点放在相对安静的位置，例如关断后经过一小段延时，或者电流纹波较稳定的位置。

这不是“采样越快越好”的问题，而是“在正确时刻采样”的问题。

## 4. 数学形式

开关周期：

```text
Ts = 1 / fsw
```

导通时间：

```text
Ton = D * Ts
```

采样时刻可以用周期内相位表示：

```text
t_sample = (n + sample_phase) * Ts + sample_delay
```

其中：

- `fsw`：开关频率（switching frequency）。
- `Ts`：开关周期（switching period）。
- `D`：占空比（duty cycle / D）。
- `sample_phase`：采样相位，0.8 表示每个周期 80% 位置。
- `sample_delay`：采样延迟，用来避开开关边沿后的噪声。

## 5. 仿真观察

使用脚本：

```text
simulations/python/boost_pwm_sampling.py
```

图中有三类信息：

- PWM 载波（PWM carrier）与占空比命令。
- 开关状态（switch state）。
- 电感电流（inductor current）与 ADC 采样点。

观察重点不是输出电压，而是采样点落在电流纹波的哪个位置。

## 6. 固件落地

在 C 语言工程里，这个概念通常分散在几个文件中：

- PWM 初始化：设置频率、计数模式、比较值和更新事件。
- ADC 初始化：设置触发源、采样通道、采样时间和转换序列。
- 控制 ISR：读取 ADC 结果，计算控制器，更新下一周期 PWM 占空比。
- 保护逻辑：判断采样值是否越界，是否需要关断 PWM 或进入故障状态。

你读代码时要追问：这个 ADC 值对应的是哪个 PWM 周期、哪个相位、哪个物理量？

## 7. 常见误解

- 错误理解：ADC 采样越快越好。  
  正确理解：采样频率和采样相位都重要。采在开关噪声上，快也没用。

- 错误理解：PWM 占空比一更新，输出马上按新值变化。  
  正确理解：很多定时器有影子寄存器（shadow register），新占空比要等更新事件才生效。

- 错误理解：控制 ISR 里读到的电流就是“当前连续真实电流”。  
  正确理解：它是某个采样时刻的离散值，带有采样延迟、滤波延迟和量化误差。

- 错误理解：仿真只要画平均值就够了。  
  正确理解：采样点和开关纹波的位置关系，必须看时序图才能理解。

## 8. 一个仿真任务

运行：

```powershell
python simulations\python\boost_pwm_sampling.py --output simulations\results\boost_pwm_sampling.png --no-open
python simulations\python\boost_pwm_sampling.py --sample-phase 0.2 --output simulations\results\boost_pwm_sampling_phase_02.png --no-open
python simulations\python\boost_pwm_sampling.py --sample-phase 0.8 --output simulations\results\boost_pwm_sampling_phase_08.png --no-open
```

观察红色 ADC 采样点落在电感电流纹波的哪个位置，并记录采样相位、采样延迟、采样电流值和开关状态。

## 9. 验收标准

- 能解释 PWM、ADC、控制 ISR 三者的先后关系。
- 能用 `Ts = 1 / fsw` 和 `Ton = D * Ts` 计算周期和导通时间。
- 能在 `simulations/results/boost_pwm_sampling.png` 上指出 ADC 采样点落在电感电流纹波的哪个位置。
- 能解释为什么采在开关边沿附近可能不可靠。
- 能把仿真图转换成一个具体的 C 工程代码阅读问题。

## 10. 复盘问题

- 打开 `simulations/results/boost_pwm_sampling.png`，红色 ADC 采样点落在电感电流的上升段还是下降段？
- 如果 `fsw = 20 kHz`，一个开关周期是多少微秒？`D = 0.45` 时导通时间是多少微秒？
- 如果把采样点放在开关翻转边沿附近，固件可能读到什么问题？

## 11. 导师问题

- 我用 `boost_pwm_sampling.py` 看到 ADC 采样点放在每周期 80% 位置。公司 Boost 或功率因数校正（power factor correction / PFC）电流采样通常放在 PWM 周期的哪个相位，为什么？
- 如果控制 ISR 读取的是上一个 PWM 周期的 ADC 结果，公司代码里通常如何标注或处理这个一拍延迟？
- 公司平台的 PWM 占空比更新是立即生效，还是通过影子寄存器在更新事件生效？我应该从哪个初始化文件确认？
