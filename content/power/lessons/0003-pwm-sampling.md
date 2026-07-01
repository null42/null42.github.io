---
title: 教程 0003：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）
date: 2026-07-01
section: 电源控制
chapter: 01-Lessons
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0003-pwm-sampling.html
status: learning
visibility: public
summary: Imported from 0003-pwm-sampling.html
---

# 教程 0003：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）

中文主讲。一个概念：把 PWM 更新、开关状态、电感电流纹波和 ADC 采样点放在同一条时间线上，为后续阅读 C 语言控制中断代码打基础。

    本页学习顺序

- 理解 PWM 和 ADC 采样分别做什么。

- 用 Boost 电感电流纹波理解“为什么采样时刻重要”。

- 掌握开关周期、导通时间和采样相位三个公式。

- 运行一个仿真任务，看采样点落在电流纹波的哪里。

- 把问题转换成可以问导师的具体代码阅读问题。

## 1. 它是什么

脉宽调制（pulse-width modulation / PWM）是用固定开关频率下的导通时间比例来控制功率开关。这个比例叫占空比（duty cycle / D）。

模数转换器采样（analog-to-digital converter / ADC sampling）是把电压、电流等模拟量在某个时刻转换成数字量，交给控制中断服务程序（control interrupt service routine / control ISR）计算下一次控制输出。

    一句话记忆：PWM 决定功率级什么时候切换，ADC 决定固件在什么时候“看见”功率级。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）控制软件不是连续观察电路，而是在固定时刻采样，再在固定中断里计算。

    控制准确性
采样点如果落在开关噪声上，控制器拿到的电流值会偏离真实趋势。
    保护判断
过流、欠压、采样异常都依赖 ADC 值，采样时刻会影响误报和漏报。
    读 C 工程
后续看代码时，要能追踪 PWM 触发、ADC 转换和控制 ISR 的调用顺序。

## 3. 物理直觉

Boost 开关导通时，电感电流上升；开关关断时，电感电流下降。所以电感电流不是一条平滑平均线，而是一条带开关纹波的三角形或近似三角形曲线。

ADC 如果刚好在开关跳变附近采样，就容易采到尖峰、振铃或驱动噪声。工程上常把采样点放在相对安静的位置，例如关断后经过一小段延时，或者电流纹波较稳定的位置。

这不是“采样越快越好”的问题，而是“在正确时刻采样”的问题。

    载波
    开关
    电流

    ADC采样点

图 1：同一开关周期内，PWM 决定开关状态，ADC 采样点决定固件读到电流纹波的哪个位置。

## 4. 数学形式

开关周期：

  Ts = 1 / fsw

导通时间：

  Ton = D * Ts

采样时刻：

  t_sample = (n + sample_phase) * Ts + sample_delay

其中 `fsw` 是开关频率（switching frequency），`sample_phase` 是采样相位，`sample_delay` 是采样延迟。比如 `sample_phase = 0.8` 表示每个周期 80% 位置采样。

    不要只看采样频率。同样是 20 kHz 采样，采在开关边沿和采在安静区间，控制效果可能完全不同。

## 5. 一个仿真任务

在 PowerShell 中运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\boost_pwm_sampling.py

脚本会自动打开结果图；如果打不开，会打印完整路径。默认结果图路径：`simulations/results/boost_pwm_sampling.png`。图中包含参数框、图例、PWM 载波、占空比命令、开关状态、电感电流和 ADC 采样点。

    对比实验：移动采样点
    python simulations\python\boost_pwm_sampling.py --sample-phase 0.2 --output simulations\results\boost_pwm_sampling_phase_02.png
python simulations\python\boost_pwm_sampling.py --sample-phase 0.8 --output simulations\results\boost_pwm_sampling_phase_08.png
python simulations\python\boost_pwm_sampling.py --sample-phase 0.8 --sample-delay 5e-6 --output simulations\results\boost_pwm_sampling_delay_5us.png

观察采样点落在电感电流上升段、下降段还是靠近开关边沿。不要只看采样值大小，要看它对应的时刻。

## 6. 仿真观察

- 先看第一幅子图：载波和占空比命令的交点决定开关翻转。

- 再看第二幅子图：开关状态为 1 时，Boost 电感电流上升。

- 最后看第三幅子图：红点是 ADC 采样点，红色竖线帮你对齐采样时刻。

- 比较 `--sample-phase 0.2` 和 `--sample-phase 0.8`，说明采样点为什么会落在不同纹波位置。

## 7. 固件落地

在 C 语言固件里，PWM/ADC timing 通常分散在几个模块：

- PWM 初始化：设置频率、计数模式、比较值和更新事件。

- ADC 初始化：设置触发源、采样通道、采样时间和转换序列。

- 控制 ISR：读取 ADC 结果，计算控制器，更新下一周期 PWM 占空比。

- 保护逻辑：判断采样值是否越界，必要时关断 PWM 或进入故障状态。

读代码时要追问：这个 ADC 值对应的是哪个 PWM 周期、哪个相位、哪个物理量？

## 8. 常见误解

- **误解：**ADC 采样越快越好。
**纠正：**采样频率和采样相位都重要。采在开关噪声上，快也没用。

- **误解：**PWM 占空比一更新，输出马上按新值变化。
**纠正：**很多定时器有影子寄存器（shadow register），新占空比要等更新事件才生效。

- **误解：**控制 ISR 里读到的电流就是连续真实电流。
**纠正：**它是某个采样时刻的离散值，带有采样延迟、滤波延迟和量化误差。

- **误解：**仿真只画平均值就够了。
**纠正：**采样点和开关纹波的位置关系，必须看时序图才能理解。

## 9. 验收标准

- 能解释 PWM、ADC、控制 ISR 三者的先后关系。

- 能用 `Ts = 1 / fsw` 和 `Ton = D * Ts` 计算周期和导通时间。

- 能在仿真图上指出 ADC 采样点落在电感电流纹波的哪个位置。

- 能解释为什么采在开关边沿附近可能不可靠。

- 能把仿真图转换成一个具体的 C 工程代码阅读问题。

## 10. 复盘问题

- 打开 `simulations/results/boost_pwm_sampling.png`，红色 ADC 采样点落在电感电流的上升段还是下降段？

- 如果 `fsw = 20 kHz`，一个开关周期是多少微秒？`D = 0.45` 时导通时间是多少微秒？

- 如果把采样点放在开关翻转边沿附近，固件可能读到什么问题？

## 11. 导师问题

- 我用 `boost_pwm_sampling.py --sample-phase 0.8` 看到 ADC 采样点在周期后段。公司 Boost 或功率因数校正（power factor correction / PFC）电流采样通常放在 PWM 周期的哪个相位，原因是什么？

- 如果控制 ISR 读取的是上一个 PWM 周期的 ADC 结果，公司代码里通常如何标注或处理这个一拍延迟？

- 公司平台的 PWM 占空比更新是立即生效，还是通过影子寄存器在更新事件生效？我应该从哪个初始化文件确认？

**下一步：**完成这节后，记录默认图中的采样时刻和采样电流值。下一节仍围绕 Boost，进入离散比例积分控制器（discrete proportional-integral controller / discrete PI）的最小闭环雏形。

关联：[上一节：连续导通模式与断续导通模式](0002-ccm-dcm.html)；源稿：`concepts/power-electronics/pwm-sampling.md`。

    上一节：教程 0002：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）
    下一节：教程 0004：离散比例积分控制器（discrete proportional-integral controller / discrete PI）最小闭环
