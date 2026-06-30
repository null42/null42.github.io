---
date: 2026-06-20
category: 电源控制
source: power
visibility: public
title: 概念：升压变换器（Boost Converter）
tags:
  - power-electronics
status: learning
summary: 升压变换器（Boost converter）是一种开关电源电路，它通过“先把能量存进电感，再把电感能量送到输出”的方式，把较低的直流输入电压（DC input voltage）变成较高的直流输出电压（DC output voltage）。
---

# 概念：升压变换器（Boost Converter）

## 1. 它是什么（What It Is）

升压变换器（Boost converter）是一种开关电源电路，它通过“先把能量存进电感，再把电感能量送到输出”的方式，把较低的直流输入电压（DC input voltage）变成较高的直流输出电压（DC output voltage）。

一句话：**Boost 不是凭空升压，而是用电感暂存能量，再在关断阶段把输入电压和电感电压叠加到输出。**

## 2. UPS 为什么需要它（Why UPS Needs It）

UPS（uninterruptible power supply，不间断电源）通常需要一个稳定的高压直流母线（DC bus），后级逆变器（inverter）才能把直流电变成交流输出。

Boost 类电路常出现在这些位置：

- 单相功率因数校正（power factor correction / PFC）前级：把整流后的电压升到稳定 DC 母线，同时让输入电流更接近正弦。
- 电池放电路径（battery discharge path）：电池电压较低时，需要升压后供给母线。
- 其他前端电源变换级（front-end power conversion stage）：把不稳定输入变成可控直流输出。

所以你学 Boost，不只是学一个小拓扑，而是在学 PFC、DC-DC、电池供电、母线控制的共同基础。

## 3. 物理直觉（Physical Intuition）

关键元件是电感（inductor）。电感的基本性格是：**不允许电流突然变化**。

### 开关导通阶段（switch on-time）

开关管（switch，例如 MOSFET）导通时，输入电源把电压加到电感上，电感电流（inductor current）上升，磁场能量增加。

```text
输入电源 -> 电感 -> 开关管 -> 地
source -> inductor -> switch -> ground
```

这时二极管（diode）反向截止，输出端主要靠输出电容（output capacitor）给负载供电。

### 开关关断阶段（switch off-time）

开关管关断时，电感电流不能立刻变成 0。为了维持电流继续流动，电感两端电压会反向，和输入电源一起把电流推过二极管，送到输出端。

```text
输入电源 + 电感 -> 二极管 -> 输出电容和负载
source + inductor -> diode -> output capacitor and load
```

输出电压能高于输入电压，是因为关断阶段输出端收到的是“输入电源 + 电感释放能量”的共同作用。

## 4. 数学形式（Mathematical Form）

在理想连续导通模式（continuous conduction mode / CCM）下，Boost 的稳态电压关系是：

```text
Vout = Vin / (1 - D)
```

其中：

- `Vin`：输入电压（input voltage），单位 V。
- `Vout`：输出电压（output voltage），单位 V。
- `D`：占空比（duty cycle），表示一个开关周期内导通时间所占比例，范围是 0 到 1 之间。

这个公式来自电感伏秒平衡（inductor volt-second balance）：稳态时，电感一个周期内的平均电压必须为 0。

导通时：

```text
VL = Vin
```

关断时：

```text
VL = Vin - Vout
```

一个周期平均为 0：

```text
Vin * D + (Vin - Vout) * (1 - D) = 0
```

整理得到：

```text
Vout = Vin / (1 - D)
```

注意：这个公式有前提。它假设器件理想、稳态、连续导通模式（CCM）、没有二极管压降、没有开关损耗、没有电容电阻损耗，并且控制稳定。

## 5. 仿真观察（Simulation Observation）

使用脚本：

```text
simulations/python/boost_open_loop.py
```

你要观察：

- 占空比（duty cycle / D）增大时，输出电压通常会上升。
- 开关导通时，电感电流上升。
- 开关关断时，电感电流下降。
- 电感量（inductance / L）变大时，电流纹波（current ripple）变小。
- 电容量（capacitance / C）变大时，输出电压纹波（voltage ripple）变小。

当前这个 Python 脚本是开环开关仿真（open-loop switching simulation），目的不是做商业级精确模型，而是让你看见两个开关状态和能量转移。

如果仿真结果和 `Vout = Vin / (1 - D)` 不一致，不要急着认为公式错了。先检查它是否真的满足理想 CCM 稳态条件。

## 6. 固件落地（Firmware Landing）

在嵌入式固件（embedded firmware）里，Boost 通常会对应这些内容：

- PWM 占空比命令（PWM duty command）：决定开关管导通多久。
- ADC 采样（analog-to-digital converter sampling）：采输入电压、输出电压、电感电流。
- 控制中断服务程序（control interrupt service routine / control ISR）：周期性计算下一次占空比。
- 保护逻辑（protection logic）：过流、过压、欠压、采样异常。
- 状态机（state machine）：软启动、正常运行、故障、恢复。

在 PFC 里，Boost 级不仅要让 `Vout` 稳定，还要让输入电流跟随输入电压波形，从而提高功率因数（power factor / PF）。

## 7. 常见误解（Common Misunderstandings）

- 错误理解：Boost 能凭空创造能量。  
  正确理解：Boost 是用更大的输入电流换更高的输出电压，忽略损耗时输入功率约等于输出功率。

- 错误理解：占空比越接近 1，输出电压就能无限升高。  
  正确理解：真实电路受开关损耗、电感饱和、二极管恢复、电流限制、控制稳定性限制，占空比不能无限接近 1。

- 错误理解：输出电压升高是因为电容自己充得更高。  
  正确理解：电容只是储能和滤波，升压的关键是电感在关断阶段改变电压极性，把能量推到输出端。

- 错误理解：`Vout = Vin / (1 - D)` 永远准确。  
  正确理解：它是理想 CCM 稳态公式。断续导通模式（DCM）、损耗、开环不稳定、负载变化都会让结果偏离。

## 8. 可以问导师的问题（Mentor Questions）

- 公司 UPS 产品中，哪些模块最像 Boost 变换器：PFC 前级、电池放电路径，还是其他模块？
- 公司调试 PFC 时更常用平均模型（average model）还是开关模型（switching model）？
- Boost 类功率级中，哪些电压和电流保护是必须硬件快速处理的？
