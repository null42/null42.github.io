---
title: 教程 0005：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架
date: 2026-07-01
section: 电源控制
chapter: 01-Lessons
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0005-boost-firmware-skeleton.html
status: learning
visibility: public
summary: Imported from 0005-boost-firmware-skeleton.html
---

# 教程 0005：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架

中文主讲：本节只讲一个概念，把前面学过的采样、离散比例积分控制器、占空比和保护逻辑串成一个接近 C 工程阅读方式的软件数据流。

    本页学习顺序

- 理解控制 ISR 是什么。

- 把采样、保护、控制、限幅、调制输出串起来。

- 看懂故障锁存为什么存在。

- 完成一个仿真任务：运行 Python 固件骨架仿真。

- 把仿真代码转换成 C 工程阅读问题。

## 1. 它是什么

控制中断服务程序（control interrupt service routine / control ISR）是电源控制软件里按固定周期运行的核心函数。

它通常完成：

  读取采样 -> 保护判断 -> 控制计算 -> 限幅 -> 更新调制输出 -> 记录状态

本节用 Boost 电压闭环做一个通用学习骨架，不涉及任何公司内部代码、产品参数或客户项目数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）软件不是只有控制算法。一个能运行的基本软件至少要把这些事情串起来：

    采样
模数转换器（analog-to-digital converter / ADC）采集输出电压和电流。
    控制
离散比例积分控制器（discrete proportional-integral controller / discrete PI）计算占空比。
    输出
脉宽调制（pulse-width modulation / PWM）更新开关占空比。
    保护
过压、欠压、过流等保护决定是否关断并锁存故障。

## 3. 物理直觉

控制 ISR 像一条固定节拍的流水线。每来一次中断，软件只允许做一小段确定的事情。

- 看一眼当前电压和电流。

- 判断是否危险。

- 如果安全，就计算下一次占空比。

- 如果危险，就关断调制输出，并锁存故障。

故障锁存的意思是：一旦出现严重故障，不因为下一次采样恢复正常就自动重新开机。真实 UPS 需要明确的复位条件和状态机。

    采样
    Vout, IL

    保护判断
    保护阈值

    控制计算
    Vref - Vout

    限幅
    Dmin..Dmax

    调制输出
    D

    故障锁存
    duty=0，等待复位

图 1：通用学习骨架。真实工程会拆成驱动、控制、保护、状态机等多个文件。

## 4. 数学形式

控制 ISR 的核心伪代码。下面的 `OV`、`UV`、`OC` 分别表示过压阈值（over-voltage threshold / OV）、欠压阈值（under-voltage threshold / UV）和过流阈值（over-current threshold / OC）：

  if fault_latched:
    duty = 0
elif Vout > OV:
    fault = over_voltage
    duty = 0
elif Vout  OC:
    fault = over_current
    duty = 0
else:
    error = Vref - Vout
    integrator = clamp(integrator + Ki * error * Ts)
    duty = clamp(Kp * error + integrator, Dmin, Dmax)

这段伪代码的重点不是语法，而是顺序：故障锁存优先，其次保护判断，最后才允许控制器更新占空比。

## 5. 仿真任务

在 PowerShell 中运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\boost_firmware_skeleton.py

脚本会自动打开结果图；如果打不开，会打印完整路径。图中包含输出电压、估算电感电流、占空比命令、故障码和保护阈值。

    对比实验：正常运行与故障锁存
    python simulations\python\boost_firmware_skeleton.py --output simulations\results\boost_firmware_skeleton.png
python simulations\python\boost_firmware_skeleton.py --over-voltage 90 --output simulations\results\boost_firmware_ov_fault.png
python simulations\python\boost_firmware_skeleton.py --over-current 5 --output simulations\results\boost_firmware_oc_fault.png

观察故障码什么时候从 `NONE` 变为故障，变为故障后占空比是否保持为 0。

## 6. 仿真观察方法

- 先看输出电压是否跟踪参考值。

- 再看估算电感电流是否低于过流阈值。

- 看占空比命令是否在正常运行时变化，在故障后变为 0。

- 看故障码是否锁存，不随电压恢复自动清零。

## 7. 固件落地

真实 C 工程中，这个骨架可能分散在多个文件：

- `adc.c` 或驱动层：采样触发、转换结果读取。

- `pwm.c` 或驱动层：比较寄存器、占空比更新、关断输出。

- `control.c`：控制 ISR、PI 控制器、前馈、限幅。

- `protection.c`：过压、欠压、过流、采样异常。

- `state_machine.c`：启动、运行、故障、恢复。

阅读时不要只找一个 `PI()` 函数。要沿着“ADC 数据从哪里来、保护在哪里判断、PWM 在哪里更新、故障如何锁存”这条链路追踪。这里的 ADC、PWM、PI 已在前文分别展开。

## 8. 常见误解

- **误解：**控制算法就是固件主体。
**纠正：**控制算法只是固件的一部分，保护、状态机、驱动接口和参数管理同样关键。

- **误解：**故障采样恢复正常后就可以自动继续输出。
**纠正：**严重故障通常要锁存，等待状态机确认复位条件。

- **误解：**保护逻辑都可以放在慢任务里。
**纠正：**过流、过压等快速风险通常要在 ISR 或硬件比较器里快速处理。

- **误解：**Python 骨架和真实 C 工程差不多。
**纠正：**Python 骨架只帮助理解数据流。真实工程还要处理外设寄存器、定点数、实时性、异常路径和硬件保护。

## 9. 验收标准

- 能画出采样、保护、控制、限幅、PWM 更新的数据流。

- 能解释为什么故障锁存后占空比保持为 0。

- 能在仿真图上指出输出电压、电感电流、占空比和故障码。

- 能说明哪些逻辑适合放在 ISR，哪些逻辑更适合放在状态机。

- 能基于脚本中的 `control_isr()` 准备 C 工程代码阅读问题。

## 10. 复盘问题

- 打开 `simulations/results/boost_firmware_skeleton.png`，最终故障码是什么？最终占空比是多少？

- 运行 `--over-voltage 90` 后，故障发生后占空比是否恢复？为什么？

- 如果真实 C 工程里保护判断放在 PI 计算之后，可能有什么风险？

## 11. 导师问题

- 我用 `boost_firmware_skeleton.py` 看到正常运行时最终故障码是 `NONE`，占空比约 0.526。公司代码中 Boost 或功率因数校正（power factor correction / PFC）控制 ISR 的数据流是否也是“采样、保护、控制、限幅、更新 PWM”？

- 我把 `--over-voltage 90` 后会触发过压故障并关断占空比。公司工程里故障锁存和故障清除通常由哪个模块负责？

- 如果某些过流保护由硬件比较器处理，固件 ISR 里还会不会重复检查软件过流阈值？

**下一步：**完成这节后，把 `control_isr()` 里的输入、状态、配置、输出逐项标注。后续可以把这个 Python 骨架迁移成简化 C 工程骨架。

关联：[上一节：离散 PI 最小闭环](0004-discrete-pi-boost.html)；源稿：`concepts/power-electronics/boost-firmware-skeleton.md`。

    上一节：教程 0004：离散比例积分控制器（discrete proportional-integral controller / discrete PI）最小闭环
    下一节：教程 0006：Boost C 固件骨架
