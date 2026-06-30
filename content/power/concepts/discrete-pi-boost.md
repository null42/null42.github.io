---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：离散比例积分控制器（discrete proportional-integral controller / discrete PI）
tags:
  - power-electronics
status: learning
summary: 离散比例积分控制器（discrete proportional-integral controller / discrete PI）是在固定控制周期内，根据误差计算控制输出的最常见闭环控制器之一。
---

# 概念：离散比例积分控制器（discrete proportional-integral controller / discrete PI）

## 1. 它是什么

离散比例积分控制器（discrete proportional-integral controller / discrete PI）是在固定控制周期内，根据误差计算控制输出的最常见闭环控制器之一。

在 Boost 电压闭环里，误差通常是：

```text
e[k] = Vref - Vout[k]
```

控制器输出通常会转换成占空比命令（duty command / D）。

## 2. 不间断电源为什么需要它

不间断电源（uninterruptible power supply / UPS）里大量控制目标都需要闭环：

- 直流母线电压（DC bus voltage）要稳定。
- 功率因数校正（power factor correction / PFC）电流要跟踪参考。
- 逆变器（inverter）输出电压要跟踪正弦参考。
- 电池充放电电流要受限。

PI 控制器是很多 UPS C 语言工程的基础构件。你读控制中断服务程序（control interrupt service routine / control ISR）时，经常会看到误差计算、积分累加、限幅和占空比更新。

## 3. 物理直觉

比例项（proportional term / P）像“看到误差就立刻推一把”。误差越大，推得越大。

积分项（integral term / I）像“记账”。如果输出电压长期低于参考值，积分会不断累加，让占空比逐渐增加，直到稳态误差被消除。

占空比不能无限大，所以必须有限幅。积分项也不能无限累加，否则输出饱和后还继续积累，恢复时会很慢，这就是积分饱和或积分 windup。

## 4. 数学形式

位置式离散 PI 的一种常见写法：

```text
e[k] = Vref - Vout[k]
I[k] = clamp(I[k-1] + Ki * e[k] * Ts, I_min, I_max)
u[k] = clamp(Kp * e[k] + I[k], D_min, D_max)
```

其中：

- `Ts`：控制周期（control period）。
- `Kp`：比例增益（proportional gain）。
- `Ki`：积分增益（integral gain）。
- `u[k]`：控制输出，这里对应占空比命令。
- `clamp`：限幅函数。
- `D_min`、`D_max`：占空比上下限。

## 5. 仿真观察

使用脚本：

```text
simulations/python/boost_discrete_pi.py
```

图中观察三件事：

- 输出电压 `Vout` 是否接近参考电压 `Vref`。
- 电压误差 `e` 是否逐渐接近 0。
- 占空比命令 `D` 是否在上下限内变化。

当前模型是教学用平均模型，不是完整开关模型。它的目的是让你看懂闭环软件结构，而不是替代真实电源设计。

## 6. 固件落地

在 C 语言固件中，PI 通常出现在控制 ISR 里。这里的采样通常来自模数转换器（analog-to-digital converter / ADC），输出通常落到脉宽调制（pulse-width modulation / PWM）占空比：

```text
读取 ADC -> 标幺化/滤波 -> 计算误差 -> PI 更新 -> 限幅 -> 更新 PWM 占空比
```

读代码时要重点看：

- 误差的符号：是 `Vref - Vout` 还是 `Vout - Vref`。
- 积分项单位：是否乘了控制周期 `Ts`。
- 限幅位置：先限积分，还是只限最终输出。
- 饱和处理：输出到达上限或下限时，积分是否继续累加。
- 占空比更新：当前周期立即生效，还是下个更新事件生效。

## 7. 常见误解

- 错误理解：比例增益越大越快越好。  
  正确理解：过大的比例增益会导致振荡、噪声放大或占空比频繁打限。

- 错误理解：积分只要能消除稳态误差，就越大越好。  
  正确理解：积分过大可能导致超调和饱和恢复慢。

- 错误理解：输出限幅就够了，积分不需要管。  
  正确理解：输出饱和时积分继续累加，会造成 windup，必须考虑积分限幅或抗饱和。

- 错误理解：仿真里调好的 PI 参数可以直接放到公司产品。  
  正确理解：教学模型只说明结构。真实参数还要考虑采样、延迟、功率级、保护、噪声和硬件限制。

## 8. 一个仿真任务

运行：

```powershell
python simulations\python\boost_discrete_pi.py --output simulations\results\boost_discrete_pi.png --no-open
python simulations\python\boost_discrete_pi.py --kp 0.006 --ki 40 --output simulations\results\boost_discrete_pi_slow.png --no-open
python simulations\python\boost_discrete_pi.py --duty-max 0.45 --output simulations\results\boost_discrete_pi_limited.png --no-open
```

观察输出电压、参考电压、电压误差、占空比命令和占空比上下限。默认图路径是 `simulations/results/boost_discrete_pi.png`。

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
