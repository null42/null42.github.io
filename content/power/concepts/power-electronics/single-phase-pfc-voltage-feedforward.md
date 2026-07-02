---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相 PFC 输入电压前馈
tags:
  - power-electronics
status: learning
summary: 功率因数校正（power factor correction / PFC）中的输入电压前馈（input-voltage feedforward）是把输入电压的均方根值（root mean square / RMS）提前放进功率命令到电流命令的换算里。
---

# 概念：单相 PFC 输入电压前馈

## 1. 它是什么

功率因数校正（power factor correction / PFC）中的输入电压前馈（input-voltage feedforward）是把输入电压的均方根值（root mean square / RMS）提前放进功率命令到电流命令的换算里。

本节只讲一个概念：为什么常见的平均模型里会写成：

```text
G = Pcmd / Vrms^2
I_rms_ref = G * Vrms
```

这里 `G` 是电导命令（conductance command / G），`Pcmd` 是输入功率命令，`Vrms` 是输入电压 RMS。

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 级要在输入电网电压变化时尽量稳定地从电网取功率。如果只固定电导命令，那么：

```text
Pin = G * Vrms^2
```

当 `Vrms` 从 220 V 掉到 180 V，输入功率会明显下降；当 `Vrms` 升到 264 V，输入功率会明显上升。母线电压环最终能慢慢修正，但电网电压变化刚发生时会给母线带来扰动。

## 3. 物理直觉

PFC 把输入端“看起来”做成一个受控电阻或受控电导：电压越高，按比例吸取的电流越大。功率等于电压乘电流，所以如果 `G` 不变，功率会随 `Vrms^2` 变化。

输入电压前馈的直觉是：电压高时把电导命令压低，电压低时把电导命令抬高，让 `G * Vrms^2` 尽量保持等于功率命令。

## 4. 数学形式

平均意义下，单相正弦输入可写成：

```text
v(t) = Vpk * sin(theta)
i_ref(t) = G * v(t)
Pin_avg = Vrms * Irms = G * Vrms^2
```

为了让平均输入功率接近 `Pcmd`：

```text
G_ff = Pcmd / Vrms^2
Irms_ref = G_ff * Vrms = Pcmd / Vrms
```

这不是完整的电压环，也不是完整的电流环。它只是把输入电压变化提前补偿掉，减轻后面比例积分控制器（proportional-integral controller / PI）的压力。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_pfc_voltage_feedforward.py
```

对比一个仿真任务：

```powershell
python simulations\python\single_phase_pfc_voltage_feedforward.py --rms-step 180 --output simulations\results\pfc_feedforward_180v.png --no-open
python simulations\python\single_phase_pfc_voltage_feedforward.py --rms-step 264 --output simulations\results\pfc_feedforward_264v.png --no-open
```

观察：

- 输入电压 RMS 从 220 V 跳到 180 V 后，固定电导的输入功率会低于命令值。
- 使用 `G = Pcmd / Vrms^2` 后，输入功率仍接近 `Pcmd`。
- 图中的参数框写明 `Vrms_initial`、`Vrms_step`、`Pcmd`、控制频率和仿真时长。
- 每条曲线都有图例，不需要猜哪条曲线代表什么。

## 6. 固件落地

工程里通常不会把这个式子孤立地放着，而是放在 PFC 电压环输出到电流幅值之间：

```text
Pcmd or voltage_loop_output
  -> input RMS measurement/filter
  -> G = Pcmd / max(Vrms^2, lower_limit)
  -> current reference amplitude
  -> PWM current loop
```

实现时要注意：

- `Vrms` 需要滤波，不能直接使用噪声很大的瞬时采样值。
- 分母要加下限，避免低电压或采样异常时电流命令暴涨。
- 前馈只解决输入电压变化带来的功率换算问题，不能替代保护逻辑。
- 脉宽调制（pulse-width modulation / PWM）电流环仍然要负责实际电感电流跟踪。

## 7. 常见误解

- 错误理解：有了前馈就不需要母线电压环。  
  正确理解：前馈只补偿输入电压变化；负载变化、损耗和模型误差仍需要电压环修正。

- 错误理解：前馈越快越好。  
  正确理解：`Vrms` 估算太快会把采样噪声带进电流命令，通常要滤波和限幅。

- 错误理解：固定电流幅值比固定电导更稳。  
  正确理解：固定电流幅值时 `Pin = Vrms * Irms`，仍会随输入电压变化。

## 8. 验收标准

- 能解释为什么固定 `G` 时 `Pin = G * Vrms^2`。
- 能解释为什么 `G = Pcmd / Vrms^2` 可以让输入功率更接近命令值。
- 能在仿真图中指出 `Vrms`、`Pin_fixed`、`Pin_ff`、`G_fixed`、`G_ff`。
- 能说清楚低电压时为什么电流 RMS 命令会上升。
- 能基于 `single_phase_pfc_voltage_feedforward.py` 的仿真图准备具体导师问题。

## 9. 复盘问题

- 220 V 跳到 180 V 后，固定 `G` 的输入功率为什么会下降？下降比例大约和哪个量有关？
- 220 V 跳到 264 V 后，前馈为什么要降低 `G`？
- 如果 `Vrms` 估算值带噪声，电流命令会出现什么现象？

## 10. 导师问题

- 我用 `single_phase_pfc_voltage_feedforward.py` 看到 220 V 跳到 180 V 时，固定 `G` 的输入功率明显下降。公司 PFC 控制里是否使用 `Vrms^2` 输入电压前馈？
- 图里 `G_ff` 在低电压时变大。实际固件会怎样限制低压时的最大电流命令？
- 如果 `Vrms` 估算来自半周或整周滤波，公司平台一般怎样平衡前馈响应速度和噪声？
