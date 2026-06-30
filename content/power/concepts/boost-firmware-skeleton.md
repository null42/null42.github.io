---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架
tags:
  - power-electronics
status: learning
summary: 控制中断服务程序（control interrupt service routine / control ISR）是电源控制软件里按固定周期运行的核心函数。它通常完成：
---

# 概念：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架

## 1. 它是什么

控制中断服务程序（control interrupt service routine / control ISR）是电源控制软件里按固定周期运行的核心函数。它通常完成：

```text
读取采样 -> 保护判断 -> 控制计算 -> 限幅 -> 更新调制输出 -> 记录状态
```

本节用 Boost 电压闭环做一个通用学习骨架，不涉及任何公司内部代码、产品参数或客户项目数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）软件不是只有控制算法。一个能运行的基本软件至少要把这些事情串起来：

- 模数转换器（analog-to-digital converter / ADC）采样。
- 脉宽调制（pulse-width modulation / PWM）占空比更新。
- 离散比例积分控制器（discrete proportional-integral controller / discrete PI）计算。
- 过压、欠压、过流等保护。
- 故障锁存和安全关断。

如果只会 PI 公式，但看不懂 ISR 里的数据流，就很难阅读完整 C 工程。

## 3. 物理直觉

控制 ISR 像一条固定节拍的流水线。每来一次中断，软件只允许做一小段确定的事情：

1. 看一眼当前电压和电流。
2. 判断是否危险。
3. 如果安全，就计算下一次占空比。
4. 如果危险，就关断调制输出，并锁存故障。

故障锁存的意思是：一旦出现严重故障，不因为下一次采样恢复正常就自动重新开机。真实 UPS 需要明确的复位条件和状态机。

## 4. 数学形式

控制 ISR 的核心可以写成伪代码。下面的 `OV`、`UV`、`OC` 分别表示过压阈值（over-voltage threshold / OV）、欠压阈值（under-voltage threshold / UV）和过流阈值（over-current threshold / OC）：

```text
if fault_latched:
    duty = 0
elif Vout > OV:
    fault = over_voltage
    duty = 0
elif Vout < UV:
    fault = under_voltage
    duty = 0
elif abs(IL) > OC:
    fault = over_current
    duty = 0
else:
    error = Vref - Vout
    integrator = clamp(integrator + Ki * error * Ts)
    duty = clamp(Kp * error + integrator, Dmin, Dmax)
```

这段伪代码的重点不是语法，而是顺序：故障锁存优先，其次保护判断，最后才允许控制器更新占空比。

## 5. 仿真观察

使用脚本：

```text
simulations/python/boost_firmware_skeleton.py
```

图中观察四件事：

- 输出电压是否跟踪参考值。
- 估算电感电流是否低于过流阈值。
- 占空比命令是否在运行中变化。
- 故障码是否保持为 `NONE`，或者在故障后锁存。

可以故意降低过压阈值来观察故障锁存：

```text
python simulations/python/boost_firmware_skeleton.py --over-voltage 90 --output simulations/results/boost_firmware_ov_fault.png
```

## 6. 固件落地

真实 C 工程中，这个骨架可能分散在多个文件：

- `adc.c` 或驱动层：采样触发、转换结果读取。
- `pwm.c` 或驱动层：比较寄存器、占空比更新、关断输出。
- `control.c`：控制 ISR、PI 控制器、前馈、限幅。
- `protection.c`：过压、欠压、过流、采样异常。
- `state_machine.c`：启动、运行、故障、恢复。

阅读时不要只找一个 `PI()` 函数。要沿着“ADC 数据从哪里来、保护在哪里判断、PWM 在哪里更新、故障如何锁存”这条链路追踪。

## 7. 常见误解

- 错误理解：控制算法就是固件主体。  
  正确理解：控制算法只是固件的一部分，保护、状态机、驱动接口和参数管理同样关键。

- 错误理解：故障采样恢复正常后就可以自动继续输出。  
  正确理解：严重故障通常要锁存，等待状态机确认复位条件。

- 错误理解：保护逻辑都可以放在慢任务里。  
  正确理解：过流、过压等快速风险通常要在 ISR 或硬件比较器里快速处理。

- 错误理解：Python 骨架和真实 C 工程差不多。  
  正确理解：Python 骨架只帮助理解数据流。真实工程还要处理外设寄存器、定点数、实时性、异常路径和硬件保护。

## 8. 保密边界

本仓库只记录公开的、教学用的简化模型和个人理解，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据、内部通信协议细节或任何无法公开复述的调试结论。向导师请教时，可以展示本节生成的 Python 波形、参数、伪代码和自己的问题，但不要把公司工程文件复制进本仓库。

## 9. 验收标准

- 能画出采样、保护、控制、限幅、脉宽调制（pulse-width modulation / PWM）更新的控制中断服务程序（control interrupt service routine / control ISR）数据流。
- 能解释为什么故障锁存后占空比命令保持为 0，而不是采样恢复正常后自动重启。
- 能在 `simulations/results/boost_firmware_skeleton.png` 上指出输出电压、估算电感电流、占空比命令和故障码。
- 能说明哪些逻辑适合放在 ISR，哪些逻辑更适合放在状态机。
- 能基于脚本中的 `control_isr()` 准备 C 工程代码阅读问题。

## 10. 复盘问题

- 打开 `simulations/results/boost_firmware_skeleton.png`，最终故障码是什么？最终占空比是多少？
- 运行 `python simulations/python/boost_firmware_skeleton.py --over-voltage 90 --output simulations/results/boost_firmware_ov_fault.png` 后，故障发生后占空比是否恢复？为什么？
- 如果真实 C 工程里保护判断放在比例积分控制器之后，可能有什么风险？

## 11. 导师问题

- 我用 `boost_firmware_skeleton.py` 看到正常运行时最终故障码是 `NONE`，占空比约 0.526。公司代码中 Boost 或功率因数校正（power factor correction / PFC）控制 ISR 的数据流是否也是“采样、保护、控制、限幅、更新 PWM”？
- 我把 `--over-voltage 90` 后会触发过压故障并关断占空比。公司工程里故障锁存和故障清除通常由哪个模块负责？
- 如果某些过流保护由硬件比较器处理，固件 ISR 里还会不会重复检查软件过流阈值？
