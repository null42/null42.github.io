---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）
tags:
  - power-electronics
status: learning
summary: 连续导通模式（continuous conduction mode / CCM）指电感电流（inductor current）在一个开关周期内始终大于 0。断续导通模式（discontinuous conduction mode / DCM）指电感电流在一个开关周期内会降到 0，并保持一段零电流时间。
---

# 概念：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）

## 1. 它是什么

连续导通模式（continuous conduction mode / CCM）指电感电流（inductor current）在一个开关周期内始终大于 0。断续导通模式（discontinuous conduction mode / DCM）指电感电流在一个开关周期内会降到 0，并保持一段零电流时间。

对 Boost 升压变换器（Boost converter）来说，CCM 和 DCM 不是两个不同电路，而是同一个电路在不同电感、负载、占空比和开关频率条件下表现出的两种工作状态。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）里的功率因数校正（power factor correction / PFC）、电池升压直流-直流变换（direct current to direct current conversion / DC-DC）和辅助电源，都可能遇到电感电流是否断续的问题。

- 控制模型不同：CCM 常用平均模型更直观，DCM 的输入输出关系会受负载影响。
- 采样解释不同：电流采样如果落在零电流段，固件看到的不是“控制坏了”，而可能是工作模式已进入 DCM。
- 保护逻辑不同：轻载 DCM 很常见，不应误判为开路；重载下进入异常电流形态则要警惕电感饱和、驱动异常或采样异常。
- 噪声和效率不同：DCM 可能带来更大的峰值电流和电磁干扰（electromagnetic interference / EMI），但轻载控制可能更容易。

## 3. 物理直觉

电感像“电流惯性元件”。开关导通时，Boost 电感两端电压约为输入电压，电感电流上升；开关关断时，电感把能量送到输出，电感电流下降。

如果负载重、电感大、开关周期短，电感还没来得及把电流降到 0，下一个周期已经开始，这就是 CCM。

如果负载轻、电感小、开关周期长，电感在关断阶段把能量放完，电流降到 0，并等待下一个周期，这就是 DCM。

## 4. 数学形式

理想 Boost 在 CCM 下的电压关系是：

```text
Vout = Vin / (1 - D)
```

其中 `D` 是占空比（duty cycle / D）。

电感电流纹波可粗略估算为：

```text
Delta_IL_on = Vin * D / (L * fsw)
```

其中 `L` 是电感量（inductance），`fsw` 是开关频率（switching frequency）。当平均电感电流小于纹波的一半时，电流就容易碰到 0：

```text
IL_avg <= Delta_IL / 2  ->  容易进入 DCM
```

这个判断是工程直觉，不是完整设计公式。真实边界还会受输出电压、损耗、采样方式和控制策略影响。

## 5. 仿真观察

使用脚本：

```text
simulations/python/boost_ccm_dcm.py
```

默认参数偏向 DCM：

```text
Vin=48 V, D=0.45, L=100 uH, C=470 uF, R=500 ohm, fsw=20 kHz
```

观察重点：

- 电感电流曲线是否碰到红色零电流线。
- 图标题中的模式判断是 CCM 还是 DCM。
- 参数框里的 `Tail zero fraction` 是否明显大于 0。
- DCM 时最终输出电压不应机械套用 CCM 公式。

## 6. 固件落地

固件里不会直接拿示波器波形“看模式”，而是从采样值和状态判断：

- 电流采样接近 0 且持续出现在关断后段，可作为 DCM 迹象。
- 轻载时进入 DCM 可能是正常状态，不能直接报故障。
- 电流环控制器在 DCM 下的等效对象变化，比例积分控制器（proportional-integral controller / PI）的参数和限幅要谨慎。
- 保护逻辑要区分“轻载零电流”和“采样断线、驱动缺失、开关不开通”等故障。

## 7. 常见误解

- 错误理解：CCM 一定好，DCM 一定坏。  
  正确理解：它们是不同工况。重载功率级常希望 CCM 便于控制和降低峰值电流，轻载 DCM 很常见。

- 错误理解：只要占空比固定，Boost 输出一定等于 `Vin / (1 - D)`。  
  正确理解：这个公式主要适用于理想 CCM 稳态。DCM 下输出还与负载、电感、频率有关。

- 错误理解：电感电流碰到 0 就说明电路断了。  
  正确理解：轻载、小电感、高输出电压条件下，电感能量可能在本周期内释放完，这是 DCM 的正常现象。

- 错误理解：软件不需要关心 CCM/DCM。  
  正确理解：采样时刻、控制模型、保护阈值和轻载策略都会受工作模式影响。

## 8. 一个仿真任务

运行：

```powershell
python simulations\python\boost_ccm_dcm.py --inductance 100e-6 --resistance 500 --output simulations\results\boost_ccm_dcm_dcm.png --no-open
python simulations\python\boost_ccm_dcm.py --inductance 1e-3 --resistance 50 --output simulations\results\boost_ccm_dcm_ccm.png --no-open
```

观察两张图中的电感电流是否碰到零电流线，并记录 `Tail min IL`、`Tail zero fraction` 和模式判断。

## 9. 验收标准

- 能用一句话区分 CCM 和 DCM。
- 能在仿真图上指出电感电流是否碰到 0。
- 能说明为什么轻载、小电感更容易进入 DCM。
- 能解释为什么 DCM 下不能直接套用理想 CCM 公式。
- 能说出固件采样和保护逻辑为什么需要知道 CCM/DCM。

## 10. 复盘问题

- `boost_ccm_dcm_dcm.png` 里电感电流为 0 的区间对应开关导通、关断，还是关断后的等待？
- `boost_ccm_dcm_ccm.png` 里 `Tail min IL` 为什么能支持 CCM 判断？
- 如果把 `--resistance 500` 改成 `--resistance 50`，负载变重后为什么更不容易 DCM？

## 11. 导师问题

- 我用 `boost_ccm_dcm.py --inductance 100e-6 --resistance 500` 得到 DCM 波形，电感电流有明显零电流段。公司产品里轻载 PFC 或电池 DC-DC 是否允许类似零电流段？
- 我用 `--inductance 1e-3 --resistance 50` 得到 CCM 波形。实际项目里判断 CCM/DCM 主要看示波器电流探头，还是固件里的采样统计量？
- 如果固件在关断后段采到接近 0 A 的电感电流，公司通常如何区分正常 DCM、采样噪声和电流采样故障？
