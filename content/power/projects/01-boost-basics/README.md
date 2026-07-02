---
date: 2026-06-20
category: 电源控制
source: power
visibility: public
title: 项目 01：Boost 基础（Boost Basics）
tags:
  - power-electronics
status: learning
summary: 理解升压变换器（Boost converter）如何转移能量，以及为什么占空比（duty cycle / D）会影响输出电压。
---

# 项目 01：Boost 基础（Boost Basics）

## 目标（Goal）

理解升压变换器（Boost converter）如何转移能量，以及为什么占空比（duty cycle / D）会影响输出电压。

## 必读概念（Required Concept）

- 浏览器教程入口：`lessons/0001-boost-converter.html`
- 浏览器教程入口：`lessons/0002-ccm-dcm.html`
- 浏览器教程入口：`lessons/0003-pwm-sampling.html`
- 浏览器教程入口：`lessons/0004-discrete-pi-boost.html`
- 浏览器教程入口：`lessons/0005-boost-firmware-skeleton.html`
- 浏览器教程入口：`lessons/0006-boost-c-firmware-skeleton.html`
- 浏览器教程入口：`lessons/0007-boost-fault-state-machine.html`
- 浏览器教程入口：`lessons/0008-boost-telemetry-fault-log.html`
- `concepts/power-electronics/boost-converter.md`
- `concepts/power-electronics/ccm-dcm.md`
- `concepts/power-electronics/pwm-sampling.md`
- `concepts/power-electronics/discrete-pi-boost.md`
- `concepts/power-electronics/boost-firmware-skeleton.md`
- `concepts/embedded/boost-c-firmware-skeleton.md`
- `concepts/embedded/boost-fault-state-machine.md`
- `concepts/embedded/boost-telemetry-fault-log.md`

## 必做仿真（Required Simulation）

- `simulations/python/boost_open_loop.py`
- `simulations/python/boost_ccm_dcm.py`
- `simulations/python/boost_pwm_sampling.py`
- `simulations/python/boost_discrete_pi.py`
- `simulations/python/boost_firmware_skeleton.py`
- `simulations/python/boost_fault_state_machine.py`
- `simulations/python/boost_telemetry_fault_log.py`
- C 教学骨架：`projects/02-boost-c-firmware-skeleton`

## 使用方法（How To Use）

在 PowerShell 中进入学习目录：

```powershell
cd E:\gitee_CodeStorage\学习\电源
```

运行默认仿真：

```powershell
python simulations\python\boost_open_loop.py
```

脚本会输出三个数，并自动打开生成的图片：

- 最终输出电压（final output voltage）。
- 理想连续导通模式（continuous conduction mode / CCM）输出电压（ideal CCM output voltage）。
- 最终电感电流（final inductor current）。

同时会生成波形图。图中包含本次仿真的关键参数，例如输入电压、占空比、电感、电容、负载、开关频率和仿真时长：

```text
simulations\results\boost_open_loop.png
```

如果你只想保存图片、不自动打开，可以加 `--no-open`：

```powershell
python simulations\python\boost_open_loop.py --no-open
```

## 任务（Tasks）

1. 运行默认仿真，记录最终输出电压。
2. 把占空比从 `0.40` 改到 `0.60`，比较输出电压如何变化。
3. 把电感量从 `1e-3` 改到 `0.5e-3`，比较电感电流纹波如何变化。
4. 观察电感电流是否掉到 0。如果掉到 0，说明它可能进入了断续导通模式（discontinuous conduction mode / DCM）。
5. 运行 CCM/DCM 对比仿真，记录模式判断、尾段最小电感电流和零电流比例。
6. 运行脉宽调制（pulse-width modulation / PWM）与模数转换器（analog-to-digital converter / ADC）时序仿真，记录采样时刻落在电感电流纹波的哪个位置。
7. 运行离散比例积分控制器（discrete proportional-integral controller / discrete PI）最小闭环仿真，记录输出电压、误差和占空比命令。
8. 运行控制中断服务程序（control interrupt service routine / control ISR）软件骨架仿真，记录故障码、占空比和保护阈值。

可直接运行：

```powershell
python simulations\python\boost_open_loop.py --duty 0.4 --output simulations\results\boost_duty_04.png
python simulations\python\boost_open_loop.py --duty 0.6 --output simulations\results\boost_duty_06.png
python simulations\python\boost_open_loop.py --inductance 0.0005 --output simulations\results\boost_l_0p5mH.png
python simulations\python\boost_ccm_dcm.py --inductance 100e-6 --resistance 500 --output simulations\results\boost_ccm_dcm_dcm.png
python simulations\python\boost_ccm_dcm.py --inductance 1e-3 --resistance 50 --output simulations\results\boost_ccm_dcm_ccm.png
python simulations\python\boost_pwm_sampling.py --output simulations\results\boost_pwm_sampling.png
python simulations\python\boost_discrete_pi.py --output simulations\results\boost_discrete_pi.png
python simulations\python\boost_firmware_skeleton.py --output simulations\results\boost_firmware_skeleton.png
python simulations\python\boost_fault_state_machine.py --output simulations\results\boost_fault_state_machine.png
python simulations\python\boost_telemetry_fault_log.py --output simulations\results\boost_telemetry_fault_log.png --csv-output simulations\results\boost_fault_log.csv
```

## 验收标准（Acceptance Criteria）

完成本项目后，你应该能做到：

- 不看笔记，解释开关导通阶段（switch on-time）和开关关断阶段（switch off-time）的电流路径。
- 用电感伏秒平衡（inductor volt-second balance）推导 `Vout = Vin / (1 - D)`。
- 在波形图里指出电感电流上升的区间。
- 在波形图里指出电感电流下降的区间。
- 解释为什么真实电路中占空比不能无限接近 1。
- 解释为什么仿真结果可能和理想 CCM 公式不完全一致。
- 在 CCM/DCM 对比图中指出电感电流是否碰到零电流线。
- 用 `Tail min IL` 和 `Tail zero fraction` 支撑模式判断。
- 在 PWM/ADC 时序图中指出 ADC 采样点、PWM 载波、占空比命令和开关状态。
- 解释为什么采样点不能随便放在开关边沿附近。
- 解释离散 PI 中误差、比例项、积分项、限幅和占空比命令之间的关系。
- 在闭环图中指出输出电压是否接近参考电压、占空比是否碰到上下限。
- 解释控制 ISR 中采样、保护、控制、限幅、PWM 更新和故障锁存的先后关系。
- 基于 `boost_firmware_skeleton.py` 的 `control_isr()` 准备一个 C 工程代码阅读问题。
- 解释故障锁存（fault latch）、复位请求（reset request）和复位延时（reset delay）的区别。
- 在故障状态机图中指出 `RUN`、`FAULT_LATCHED`、`RESET_WAIT` 三段，以及 PWM 何时重新使能。
- 解释慢速任务（slow task）、遥测（telemetry）和故障日志（fault log）的分工。
- 能打开 `simulations/results/boost_fault_log.csv`，指出故障时间、故障码、电压和 PWM 使能。

## 复盘问题（Review Question）

如果 `Vin = 100 V`，`D = 0.5`，理想公式给出 `Vout = 200 V`。

问题：真实电路中，哪些因素会让实际输出电压低于或偏离这个值？

提示：

- 二极管压降（diode forward voltage drop）。
- 开关管导通电阻（switch on-resistance）。
- 电感电阻（inductor winding resistance）。
- 电容等效串联电阻（equivalent series resistance / ESR）。
- 断续导通模式（DCM）。
- 开环仿真没有闭环控制（closed-loop control）。
