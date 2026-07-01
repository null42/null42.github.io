---
title: 教程 0002：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）
date: 2026-07-01
section: 电源控制
chapter: 01-Lessons
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0002-ccm-dcm.html
status: learning
visibility: public
summary: Imported from 0002-ccm-dcm.html
---

# 教程 0002：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）

中文主讲。一个概念：只做一件事，把“电感电流有没有掉到 0”看清楚，并理解它为什么会改变 Boost 的公式、采样和控制判断。

    本页学习顺序

- 定义连续导通模式和断续导通模式。

- 用物理直觉判断什么时候电感电流会碰到 0。

- 用一个简单公式估算电流纹波。

- 运行一个仿真任务，对比 CCM 和 DCM 波形。

- 回答复盘问题，并带着波形向导师提问。

## 1. 它是什么

连续导通模式（continuous conduction mode / CCM）指电感电流（inductor current）在一个开关周期内始终大于 0。

断续导通模式（discontinuous conduction mode / DCM）指电感电流在一个开关周期内会降到 0，并保持一段零电流时间。

对升压变换器（Boost converter）来说，CCM 和 DCM 不是两个不同电路，而是同一个电路在不同电感、负载、占空比和开关频率下表现出的两种状态。

    一句话记忆：CCM 是“电感电流没断气”，DCM 是“电感这一周期的能量已经放完，电流等在 0”。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）里的功率因数校正（power factor correction / PFC）、电池升压直流-直流变换（direct current to direct current conversion / DC-DC）和辅助电源，都可能遇到电感电流是否断续的问题。

    控制模型
CCM 下常用的理想公式更直接；DCM 下输入输出关系会明显受负载影响。
    采样解释
模数转换器（analog-to-digital converter / ADC）如果采到 0 A，可能是正常 DCM，不一定是故障。
    保护逻辑
轻载 DCM 不应误报开路；重载异常电流形态要排查电感饱和、驱动或采样问题。

## 3. 物理直觉

电感像“电流惯性元件”。开关导通时，Boost 电感两端电压约为输入电压，电感电流上升；开关关断时，电感把能量送到输出，电感电流下降。

如果负载重、电感大、开关周期短，电感还没来得及把电流降到 0，下一个周期已经开始，这就是 CCM。

如果负载轻、电感小、开关周期长，电感在关断阶段把能量放完，电流降到 0，并等待下一个周期，这就是 DCM。

    CCM：电感电流始终大于 0
    DCM：电感电流周期性降到 0
    0 A
    0 A

    谷值仍高于 0
    出现零电流段

图 1：CCM/DCM 的判据只看电感电流是否在周期内到达 0。真实波形会有纹波和噪声，但基本形状类似。

## 4. 数学形式

理想 Boost 在 CCM 下的电压关系是：

  Vout = Vin / (1 - D)

其中 `D` 是占空比（duty cycle / D）。这个公式来自上一节的电感伏秒平衡。

电感导通阶段的电流上升量可粗略估算为：

  Delta_IL_on = Vin * D / (L * fsw)

其中 `L` 是电感量（inductance），`fsw` 是开关频率（switching frequency）。当平均电感电流小于纹波的一半时，电流就容易碰到 0：

  IL_avg   容易进入 DCM

    关键提醒：DCM 下不要机械套 Vout = Vin / (1 - D)。进入 DCM 后，输出电压还会明显受负载、电感和开关频率影响。

## 5. 一个仿真任务

在 PowerShell 中运行默认 DCM 示例：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\boost_ccm_dcm.py

脚本会保存并自动打开图片。打不开时会打印完整路径。图中必须看到：参数框、每条曲线图例、红色零电流线、标题中的模式判断。

    对比实验：一张 DCM，一张 CCM
    python simulations\python\boost_ccm_dcm.py --inductance 100e-6 --resistance 500 --output simulations\results\boost_ccm_dcm_dcm.png
python simulations\python\boost_ccm_dcm.py --inductance 1e-3 --resistance 50 --output simulations\results\boost_ccm_dcm_ccm.png

第一张图应显示 DCM，电感电流会碰到 0。第二张图应显示 CCM，电感电流尾段应始终高于 0。

## 6. 仿真观察

- 先看图标题：模式判断是 CCM 还是 DCM。

- 再看第二幅子图：电感电流 `IL` 有没有碰到红色零电流线。

- 再看参数框：`Tail zero fraction` 表示尾段有多少比例的采样点在零电流附近。

- 最后对比 `Ideal CCM Vout` 和 `Final Vout`。如果是 DCM，偏离理想 CCM 公式是正常现象。

## 7. 固件落地

在嵌入式固件（embedded firmware）中，CCM/DCM 会影响采样、控制和保护：

- 电流采样接近 0 且持续出现在关断后段，可作为 DCM 迹象。

- 轻载 DCM 可能是正常状态，不能直接报故障。

- 电流环控制器在 DCM 下的等效对象变化，比例积分控制器（proportional-integral controller / PI）的参数和限幅要谨慎。

- 保护逻辑要区分正常 DCM、采样断线、驱动缺失和开关不开通。

- 脉宽调制（pulse-width modulation / PWM）更新点和 ADC 采样点要配合，否则可能把正常谷底误读成异常。

## 8. 常见误解

- **误解：**CCM 一定好，DCM 一定坏。
**纠正：**它们是不同工况。重载功率级常希望 CCM，轻载 DCM 很常见。

- **误解：**占空比固定，Boost 输出一定等于 `Vin / (1 - D)`。
**纠正：**这个公式主要适用于理想 CCM 稳态。

- **误解：**电感电流碰到 0 就说明电路断了。
**纠正：**轻载、小电感条件下，电感能量可能在本周期内释放完。

- **误解：**软件不需要关心 CCM/DCM。
**纠正：**采样时刻、控制模型、保护阈值和轻载策略都会受工作模式影响。

## 9. 验收标准

- 能用一句话区分 CCM 和 DCM。

- 能在仿真图上指出电感电流是否碰到 0。

- 能说明为什么轻载、小电感更容易进入 DCM。

- 能解释为什么 DCM 下不能直接套用理想 CCM 公式。

- 能说出固件采样和保护逻辑为什么需要知道 CCM/DCM。

## 10. 复盘问题

- 打开 `simulations/results/boost_ccm_dcm_dcm.png`，电感电流在一个周期内哪一段为 0？这段时间对应开关导通、关断，还是关断后的等待？

- 打开 `simulations/results/boost_ccm_dcm_ccm.png`，参数框中的 `Tail min IL` 为什么能支持 CCM 判断？

- 如果把 `--resistance 500` 改成 `--resistance 50`，负载变重后为什么更不容易 DCM？

## 11. 导师问题

- 我用 `boost_ccm_dcm.py --inductance 100e-6 --resistance 500` 得到 DCM 波形，电感电流有明显零电流段。公司产品里轻载 PFC 或电池 DC-DC 是否允许类似零电流段？

- 我用 `--inductance 1e-3 --resistance 50` 得到 CCM 波形。实际项目里判断 CCM/DCM 主要看示波器电流探头，还是固件里的采样统计量？

- 如果固件在关断后段采到接近 0 A 的电感电流，公司通常如何区分正常 DCM、采样噪声和电流采样故障？

**下一步：**完成这节后，把两张图的模式判断、`Tail min IL` 和 `Tail zero fraction` 记录下来。下一节仍不跳远，继续围绕 Boost 的 PWM、采样点和电流纹波展开。

关联：[上一节：Boost 升压变换器](0001-boost-converter.html)；源稿：`concepts/power-electronics/ccm-dcm.md`。

    上一节：教程 0001：Boost 升压变换器（Boost Converter）
    下一节：教程 0003：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）
