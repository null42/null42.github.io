---
title: 教程 0004：离散比例积分控制器（discrete proportional-integral controller / discrete PI）最小闭环
date: 2026-07-01
section: 电源控制
chapter: 01-Lessons
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0004-discrete-pi-boost.html
status: learning
visibility: public
summary: Imported from 0004-discrete-pi-boost.html
chapterTitle: 电源课程
chapterOrder: 10
---

# 教程 0004：离散比例积分控制器（discrete proportional-integral controller / discrete PI）最小闭环

中文主讲。一个概念：用 Boost 电压闭环看懂控制中断里最常见的一段逻辑：采样、算误差、控制器更新、限幅、输出占空比。

    本页学习顺序

- 理解离散比例积分控制器是什么。

- 把比例项、积分项、限幅和占空比命令连起来。

- 写出位置式离散比例积分控制器的基本公式。

- 运行一个仿真任务，观察闭环误差和占空比变化。

- 把仿真波形转换成 C 工程代码阅读问题。

## 1. 它是什么

离散比例积分控制器（discrete proportional-integral controller / discrete PI）是在固定控制周期内，根据误差计算控制输出的闭环控制器。

在 Boost 电压闭环里，误差通常是参考电压减去输出电压：

  e[k] = Vref - Vout[k]

控制器输出通常会转换成占空比命令（duty command / D）。

    一句话记忆：比例项负责“现在差多少就推多少”，积分项负责“长期差一点就慢慢补回来”。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）里大量控制目标都需要闭环。

    直流母线
直流母线电压（DC bus voltage）需要稳定，不能随负载大幅漂移。
    功率因数校正
功率因数校正（power factor correction / PFC）电流环和电压环常见 PI 结构。
    读 C 工程
控制中断服务程序（control interrupt service routine / control ISR）里经常出现误差、积分、限幅和占空比更新。

## 3. 物理直觉

比例项（proportional term / P）像“看到误差就立刻推一把”。输出电压低于参考越多，占空比命令就增加越多。

积分项（integral term / I）像“记账”。如果输出长期偏低，积分会不断累加，让占空比继续上调，直到稳态误差变小。

占空比不能无限大，所以必须有限幅。积分项也不能无限累加，否则输出饱和后还继续积累，恢复时会很慢，这就是积分饱和（integrator windup）。

    采样
    Vout[k]

    误差
    Vref - Vout

    控制器
    P + I

    限幅
    Dmin..Dmax

    调制
    占空比

图 1：最小闭环控制流。真实工程还会加入滤波、前馈、保护、状态机和故障处理。

## 4. 数学形式

位置式离散比例积分控制器的一种常见写法：

  e[k] = Vref - Vout[k]
I[k] = clamp(I[k-1] + Ki * e[k] * Ts, I_min, I_max)
u[k] = clamp(Kp * e[k] + I[k], D_min, D_max)

其中 `Ts` 是控制周期（control period），`Kp` 是比例增益（proportional gain），`Ki` 是积分增益（integral gain），`u[k]` 在本节中对应占空比命令。

    本节只讲结构。脚本使用教学用平均模型，不是完整开关模型；它用于看懂 PI 代码结构，不用于真实产品参数设计。

## 5. 一个仿真任务

在 PowerShell 中运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\boost_discrete_pi.py

脚本会自动打开结果图；如果打不开，会打印完整路径。默认结果图路径：`simulations/results/boost_discrete_pi.png`。图中包含输出电压、参考电压、电压误差、占空比命令和参数框。

    对比实验：改变 PI 参数
    python simulations\python\boost_discrete_pi.py --kp 0.006 --ki 40 --output simulations\results\boost_discrete_pi_slow.png
python simulations\python\boost_discrete_pi.py --kp 0.020 --ki 120 --output simulations\results\boost_discrete_pi_fast.png
python simulations\python\boost_discrete_pi.py --duty-max 0.45 --output simulations\results\boost_discrete_pi_limited.png

观察：输出电压接近参考的速度、误差是否变小、占空比是否碰到上限。

## 6. 仿真观察

- 先看第一幅子图：`Vout` 是否靠近 `Vref`。

- 再看第二幅子图：误差是否逐渐靠近 0。

- 最后看第三幅子图：占空比是否在上下限之间，是否长时间贴着上限或下限。

- 如果 `--duty-max 0.45` 后输出达不到参考，说明控制器想继续加占空比，但执行器已经受限。

## 7. 固件落地

在 C 语言固件中，PI 通常出现在控制 ISR 里。这里的 ADC 和 PWM 已在上一节展开，分别指模数转换器（analog-to-digital converter / ADC）采样和脉宽调制（pulse-width modulation / PWM）：

  读取 ADC -> 标幺化/滤波 -> 计算误差 -> PI 更新 -> 限幅 -> 更新 PWM 占空比

读代码时要重点看：

- 误差符号：是 `Vref - Vout` 还是 `Vout - Vref`。

- 积分项是否乘了控制周期 `Ts`。

- 限幅位置：限积分、限输出，还是两者都限。

- 输出饱和时，积分是否还继续累加。

- 占空比更新是当前周期立即生效，还是等下一个 PWM 更新事件。

## 8. 常见误解

- **误解：**比例增益越大越快越好。
**纠正：**过大的比例增益会导致振荡、噪声放大或占空比频繁打限。

- **误解：**积分越大越能消除误差。
**纠正：**积分过大可能导致超调和饱和恢复慢。

- **误解：**输出限幅就够了，积分不用管。
**纠正：**输出饱和时积分继续累加，会造成 windup，必须考虑积分限幅或抗饱和。

- **误解：**仿真里调好的参数可以直接放到产品。
**纠正：**真实参数还要考虑采样、延迟、功率级、保护、噪声和硬件限制。

## 9. 验收标准

- 能解释误差、比例项、积分项、限幅和占空比命令的关系。

- 能写出位置式离散 PI 的基本公式。

- 能在图上指出输出电压、参考电压、误差和占空比。

- 能解释为什么占空比上限会导致输出电压达不到参考。

- 能说出读 C 代码时要检查误差符号、积分限幅和 PWM 更新时刻。

## 10. 复盘问题

- 打开 `simulations/results/boost_discrete_pi.png`，最终输出电压和参考电压相差多少？最终占空比是多少？

- 运行 `--duty-max 0.45` 后，如果输出达不到 96 V，是 PI 算法坏了，还是执行器限幅导致的？

- 如果 C 代码里误差写成 `Vout - Vref`，但 PI 输出仍直接加到占空比上，会发生什么？

## 11. 导师问题

- 我用 `boost_discrete_pi.py` 看到默认参数下最终输出约 96 V，占空比约 0.488。公司代码里的 Boost 或功率因数校正（power factor correction / PFC）电压环 PI 是位置式还是增量式？

- 我在脚本里对占空比和积分项都做了限幅。公司工程里抗积分饱和通常怎么写，是否有统一 PI 模块？

- 如果 ADC 采样值和 PWM 更新之间有一拍延迟，公司代码中会在 PI 参数整定时显式考虑这个延迟吗？

**下一步：**完成这节后，记录默认图的最终输出电压、最终占空比和误差。后续可以继续做 Boost 闭环调参，再过渡到单相 PFC。

关联：[上一节：脉宽调制与采样时刻](0003-pwm-sampling.html)；源稿：`concepts/power-electronics/discrete-pi-boost.md`。

    上一节：教程 0003：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）
    下一节：教程 0005：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架
