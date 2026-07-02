---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相 PFC 平均控制链
tags:
  - power-electronics
status: learning
summary: 功率因数校正（power factor correction / PFC）的平均模型（averaged model）把“开关每个周期怎么翻转”暂时压缩掉，只保留控制链路中的慢变量：
---

# 概念：单相 PFC 平均控制链

## 1. 它是什么

功率因数校正（power factor correction / PFC）的平均模型（averaged model）把“开关每个周期怎么翻转”暂时压缩掉，只保留控制链路中的慢变量：

```text
母线电压误差 -> 电压环 -> 电导命令/功率命令 -> 前馈 -> 电流参考 -> 电流环/PWM -> 输入功率 -> 母线电压
```

本节只讲一个概念：把前面几节学过的电压环（voltage loop）、前馈（feedforward）、电流环（current loop）、脉宽调制（pulse-width modulation / PWM）延迟串成一条能看懂的 PFC 控制链。

保密边界：不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）工程代码通常不是按课程顺序分开的。你读到的可能是一个控制中断服务程序（control interrupt service routine / control ISR），里面同时出现采样、RMS 估算、电压环、电流参考、限幅、PWM 更新和保护判断。

平均控制链的作用是先建立“信号从哪里来、到哪里去”的地图。没有这张地图，读完整 C 工程时容易只看到局部公式，看不出它服务于哪一段能量流。

## 3. 物理直觉

负载突然变大时，直流母线电容先放电，母线电压下降。电压环看到误差后提高电导命令，PFC 从输入侧吸取更多功率。电流环和 PWM 不是无限快，所以实际输入功率会滞后命令功率一小段时间。输入功率大于负载功率后，母线电压逐步回到参考值。

## 4. 数学形式

教学平均模型使用下面几条关系：

```text
e_v = Vbus_ref - Vbus
G_cmd = clamp(Kp * e_v + integral(Ki * e_v), Gmin, Gmax)
Irms_ref = G_cmd * Vrms
Pin_cmd = G_cmd * Vrms^2
Pin_actual[k] = low_pass(delay(Pin_cmd), current_loop_bandwidth)
Cbus * d(Vbus^2) / 2 = (Pin_actual - Pload) * dt
```

这里 `Pin_actual` 不是开关级瞬时功率，而是被电流环带宽和延迟限制后的平均输入功率。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_pfc_average_controller.py
```

观察：

- 负载从 700 W 跳到 1200 W 后，母线电压先下跌。
- 电压环提高 `G_cmd`，`Irms_ref` 和 `Pin_cmd` 随之升高。
- `Pin_actual` 因电流环带宽和延迟滞后于 `Pin_cmd`。
- 母线电压在输入功率追上后回到参考附近。

延迟对比：

```powershell
python simulations\python\single_phase_pfc_average_controller.py --delay-samples 0 --output simulations\results\pfc_average_delay_0.png --no-open
python simulations\python\single_phase_pfc_average_controller.py --delay-samples 5 --output simulations\results\pfc_average_delay_5.png --no-open
```

## 6. 固件落地

读固件时可以按这条链路找变量：

```text
ADC samples
  -> Vbus, Vin, Iin scaling/filtering
  -> Vrms estimation
  -> voltage loop output
  -> feedforward and limit
  -> current reference
  -> current loop
  -> PWM compare update
```

工程代码里还会叠加保护逻辑、模式状态机、软启动、限流、故障锁存和通信参数。本节模型不包含这些内容，但它能帮助你识别主控制链。

## 7. 常见误解

- 错误理解：平均模型能替代开关仿真。  
  正确理解：平均模型适合看控制链和慢动态，不能看开关纹波、二极管反向恢复、采样尖峰。

- 错误理解：电压环输出就是占空比。  
  正确理解：PFC 里电压环通常输出功率、电导或电流幅值类命令，内层电流环才产生 PWM 相关命令。

- 错误理解：母线电压下跌说明电压环一定错了。  
  正确理解：负载突变时电容先承担能量差，短暂下跌是正常动态，要看是否能恢复、是否超限。

## 8. 验收标准

- 能按顺序说出 `Vbus error -> G_cmd -> Irms_ref -> Pin_actual -> Vbus` 的因果链。
- 能解释负载阶跃后为什么母线电压先跌再恢复。
- 能在图中指出 `Vbus`、`Pload`、`Pin_cmd`、`Pin_actual`、`G_cmd`、`Irms_ref` 和 `D_proxy`。
- 能解释 `--delay-samples` 增大时，为什么 `Pin_actual` 更滞后于 `Pin_cmd`。
- 能基于生成的仿真图准备导师问题，而不是只问抽象概念。

## 9. 复盘问题

- 负载从 700 W 跳到 1200 W 后，母线电压为什么不会立刻保持在 380 V？
- `Pin_cmd` 和 `Pin_actual` 的差值主要代表哪两类工程因素？
- 如果 `G_cmd` 达到上限，母线仍然下跌，你会优先怀疑控制参数、功率能力还是保护限流？为什么？

## 10. 导师问题

- 我用 `single_phase_pfc_average_controller.py` 看到负载阶跃后，`Pin_cmd` 先上升，`Pin_actual` 因延迟滞后。公司 PFC 控制中电压环输出通常是功率命令、电导命令还是电流幅值命令？
- 图中 `delay_samples=2` 会增加输入功率跟踪误差。实际平台从 ADC 采样到 PWM 生效的延迟一般怎样计算？
- 如果真实产品还叠加限流和软启动，公司代码里这些限制通常放在电压环输出之后，还是电流参考生成之后？
