---
title: 教程 0001：Boost 升压变换器（Boost Converter）
date: 2026-07-01
section: 电源控制
chapter: 01-Lessons
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0001-boost-converter.html
status: learning
visibility: public
summary: Imported from 0001-boost-converter.html
---

# 教程 0001：Boost 升压变换器（Boost Converter）

中文主讲。一个概念：先把 Boost“为什么能升压”讲清楚，再用一个仿真任务观察占空比、电感和输出电压之间的关系。

    本页学习顺序

- 理解 Boost 是什么。

- 看懂开关导通和关断两个电流路径。

- 推导理想公式 `Vout = Vin / (1 - D)`。

- 运行一个仿真任务并观察波形。

- 用验收问题检查自己是否真的理解。

## 1. 它是什么

升压变换器（Boost converter）是一种开关电源电路。它把较低的直流输入电压（DC input voltage）变成较高的直流输出电压（DC output voltage）。

核心不是“凭空升压”，而是：**电感先存能，随后在关断阶段把电感能量送到输出端。**

    一句话记忆：Boost 用电感暂存能量，再在开关关断时把“输入电压 + 电感电压”一起推到输出端。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）通常需要稳定的直流母线（DC bus）。后级逆变器（inverter）依靠这条母线生成交流输出。

    功率因数校正前级
功率因数校正（power factor correction / PFC）常用 Boost 思想升高母线电压，同时塑造输入电流。
    电池放电路径
电池电压较低时，可能需要升压后给 DC 母线供电。
    直流-直流变换基础
直流-直流变换（direct current to direct current conversion / DC-DC）离不开电感储能、开关状态、占空比这些基本概念。

## 3. 物理直觉：两个开关状态

### 3.1 开关导通阶段（switch on-time）

开关管导通时，输入电源把电压加到电感（inductor）上。电感电流（inductor current）上升，磁场能量增加。

  输入电源 -> 电感 -> 开关管 -> 地
source -> inductor -> switch -> ground

### 3.2 开关关断阶段（switch off-time）

开关管关断时，电感电流不能突然变成 0。电感电压会反向，并和输入电源一起把电流推过二极管（diode），送到输出电容和负载。

  输入电源 + 电感 -> 二极管 -> 输出电容和负载
source + inductor -> diode -> output capacitor and load

    导通：电感存能
    关断：电感放能到输出

    Vin

    L

    Switch ON
    二极管截止，输出靠电容供电
    Vin + L

    Diode

    输出电容 + 负载

图 1：Boost 的两个关键状态。实际电路符号会更复杂，但能量路径先抓住这两条。

## 4. 数学形式

理想连续导通模式（continuous conduction mode / CCM）下：

  Vout = Vin / (1 - D)

其中 `D` 是占空比（duty cycle），表示一个周期里开关导通时间的比例。

推导来自电感伏秒平衡（inductor volt-second balance）：稳态时，电感一个周期内的平均电压为 0。

  导通：VL = Vin
关断：VL = Vin - Vout
平均为 0：
Vin * D + (Vin - Vout) * (1 - D) = 0
整理：
Vout = Vin / (1 - D)

    不要机械套公式。这个公式要求理想器件、稳态、CCM、无损耗、控制稳定。断续导通模式（discontinuous conduction mode / DCM）或开环不稳定时，仿真结果会偏离它。

## 5. 一个仿真任务与仿真观察

在 PowerShell 中运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\boost_open_loop.py

脚本会自动打开结果图。图中会包含参数框：输入电压、占空比、电感、电容、负载、开关频率、仿真时长、理想输出电压和最终输出电压。

默认结果图路径：`simulations/results/boost_open_loop.png`。先看输出电压曲线，再看电感电流曲线，最后看开关状态曲线。

    对比实验：
    python simulations\python\boost_open_loop.py --duty 0.4 --output simulations\results\boost_duty_04.png
python simulations\python\boost_open_loop.py --duty 0.6 --output simulations\results\boost_duty_06.png
python simulations\python\boost_open_loop.py --inductance 0.0005 --output simulations\results\boost_l_0p5mH.png

观察：输出电压如何变？电感电流纹波如何变？电感电流有没有掉到 0？

## 6. 固件落地

在嵌入式固件（embedded firmware）里，Boost 会落到这些对象上：

- 脉宽调制（pulse-width modulation / PWM）占空比命令（PWM duty command）：控制开关导通时间。

- 模数转换器（analog-to-digital converter / ADC）采样：采输入电压、输出电压、电感电流。

- 控制中断服务程序（control interrupt service routine / control ISR）：周期性计算下一次占空比。

- 保护逻辑（protection logic）：过流、过压、欠压、采样异常。

- 状态机（state machine）：软启动、正常运行、故障、恢复。

## 7. 常见误解

- **误解：**Boost 创造了额外能量。
**纠正：**它用更大的输入电流换更高的输出电压，忽略损耗时输入功率约等于输出功率。

- **误解：**占空比接近 1 就能无限升压。
**纠正：**真实电路受损耗、电感饱和、电流限制和控制稳定性限制。

- **误解：**电容让输出变高。
**纠正：**电容主要滤波和储能，升压关键是电感在关断阶段释放能量。

## 8. 验收标准

- 能解释导通和关断两个阶段的电流路径。

- 能用电感伏秒平衡推导 `Vout = Vin / (1 - D)`。

- 能在仿真图上指出电感电流上升和下降区间。

- 能解释为什么仿真结果可能不等于理想 CCM 公式。

- 能说出 Boost 在 UPS 中可能出现的位置。

## 9. 复盘问题

- 打开 `simulations/results/boost_open_loop.png`，在电感电流曲线上指出哪一段对应开关导通，哪一段对应开关关断。

- 把 `--duty 0.4` 和 `--duty 0.6` 两张图放在一起，说明输出电压和电感电流纹波为什么变了。

- 如果最终输出电压没有等于 `Vin / (1 - D)`，先检查它是不是已经稳态、是不是连续导通模式（continuous conduction mode / CCM）。

## 10. 导师问题

- 我用 `boost_open_loop.py --duty 0.6` 得到的输出电压明显偏离理想 CCM 公式。公司里判断这种偏离时，通常先看电感电流是否断续、损耗模型，还是控制环是否进入稳态？

- 我在仿真图中看到电感电流纹波随电感量变化很明显。公司 UPS 产品选 Boost/PFC 电感时，电流纹波、体积、温升和饱和电流通常怎么权衡？

- 如果把这类 Boost 功率级接到真实控制板上，哪些过流或过压保护必须由硬件快速处理，哪些可以交给固件状态机处理？

**下一步：**运行仿真后，把你看到的输出电压、电感电流纹波、电流是否掉到 0 记录下来。下一节：[CCM 和 DCM](0002-ccm-dcm.html)。

    课程起点
    下一节：教程 0002：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）
