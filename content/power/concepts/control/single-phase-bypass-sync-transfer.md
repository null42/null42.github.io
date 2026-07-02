---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：旁路同步（bypass synchronization）与旁路切换（bypass transfer）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0023-single-phase-bypass-sync-transfer.html` 的源稿和补充资料，中文主讲。它只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。
---

# 概念：旁路同步（bypass synchronization）与旁路切换（bypass transfer）

本页是 `lessons/0023-single-phase-bypass-sync-transfer.html` 的源稿和补充资料，中文主讲。它只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

旁路同步（bypass synchronization）是判断 UPS 逆变输出与旁路电源是否足够接近。旁路切换（bypass transfer）是把负载从逆变器供电路径切到旁路路径，或从旁路切回逆变器路径。

本节只讲一个概念：电压幅值、频率、相位三项都进入同步窗口，并持续满足保持时间（hold time）后，才允许切换。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）可能在逆变器故障、过载、维修旁路或模式切换时使用旁路。如果逆变器与旁路不同步就切换，负载会看到突变电压，继电器或静态开关也可能承受冲击电流。

锁相环（phase-locked loop / PLL）提供旁路或电网相位信息，但 PLL 锁定不等于马上能切换。固件还要看均方根（root mean square / RMS）电压、频率差、相位误差（phase error）和保持时间。

## 3. 物理直觉

两个人交接一个正在转动的方向盘时，手的位置、速度和力度都要接近。只看其中一个条件不够。UPS 旁路切换也是类似：电压幅值像力度，频率像速度，相位像手的位置。

## 4. 数学形式

```text
voltage_ok   = abs(V_bypass - V_inv) / V_inv <= voltage_window
frequency_ok = abs(f_bypass - f_inv) <= frequency_window
phase_ok     = abs(theta_bypass - theta_inv) <= phase_window
all_ok       = voltage_ok and frequency_ok and phase_ok
transfer_allowed = all_ok has lasted longer than hold_time
```

默认教学参数：

```text
V_inv = 220 Vrms
voltage window = 10 %
frequency window = 0.20 Hz
phase window = 5 deg
hold time = 30 ms
```

## 5. 仿真观察

运行：

```powershell
python simulations\python\single_phase_bypass_sync_transfer.py
```

脚本默认生成并尝试自动打开：

```text
simulations/results/single_phase_bypass_sync_transfer.png
```

图中包含：

- 逆变器 RMS 电压与旁路 RMS 电压。
- 频率差及频率窗口。
- 相位误差及相位窗口。
- 三个窗口是否同时满足，以及最终旁路切换许可。

一个仿真任务：

```powershell
python simulations\python\single_phase_bypass_sync_transfer.py --phase-window-deg 2 --output simulations\results\bypass_sync_phase_2deg.png --no-open
python simulations\python\single_phase_bypass_sync_transfer.py --sync-hold-time 0.060 --output simulations\results\bypass_sync_hold_60ms.png --no-open
```

观察相位窗口变窄、保持时间变长后，切换许可出现时间如何变化。

## 6. 固件落地

真实 C 工程里，旁路切换常分散在几个模块中：

- `pll.c`：给出旁路或电网相位。
- `rms.c`：计算逆变器与旁路 RMS 电压。
- `sync_check.c`：判断电压、频率、相位窗口和保持时间。
- `state_machine.c`：决定是否从逆变模式进入旁路模式。
- `protection.c`：在相位跳变、旁路异常、逆变器故障时撤销许可。

## 7. 常见误解

- 错误理解：PLL locked 就等于可以切旁路。  
  正确理解：还要检查 RMS 电压、频率差、相位差和保持时间。
- 错误理解：相位刚好落入窗口的一瞬间就能切。  
  正确理解：要保持一段时间，避免噪声或瞬时交叉造成误许可。
- 错误理解：旁路切换只是继电器动作。  
  正确理解：动作前的软件许可、保护锁存、静态开关时序和状态机条件都很关键。

## 8. 验收标准

- 能解释旁路同步和旁路切换的区别。
- 能根据仿真图指出哪个条件最晚进入窗口。
- 能解释为什么需要保持时间。
- 能说明相位跳变后为什么要撤销切换许可。

## 9. 复盘问题

- 默认仿真中，三项同步窗口分别是什么？
- `All sync windows OK` 第一次变为 1 后，为什么 `Transfer allowed` 不是立刻变为 1？
- 200 ms 相位跳变后，哪条曲线先变化？状态机应该如何处理这个事件？

## 10. 导师问题

- 我用 `single_phase_bypass_sync_transfer.py` 看到三项窗口都满足并保持 30 ms 后才允许切换。公司工程里旁路切换许可通常有哪些窗口阈值？
- 我在图中看到 200 ms 相位跳变后 `Transfer allowed` 立刻撤销。真实产品里相位异常后是否还会加入额外延时或故障锁存？
- 公司代码里旁路同步判断是在 PLL 模块、状态机模块，还是单独的同步检查模块中实现？
