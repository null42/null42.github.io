---
title: 教程 0023：单相 UPS 旁路同步与切换许可
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0023-single-phase-bypass-sync-transfer.html
status: learning
visibility: public
summary: Imported from 0023-single-phase-bypass-sync-transfer.html
chapterOrder: 10
---

# 教程 0023：单相 UPS 旁路同步与切换许可

中文主讲。一个概念：旁路切换不是看到 PLL 锁定就动作，而是电压、频率、相位都进入窗口并保持一段时间后，状态机才允许切换。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学脚本和教学参数，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

旁路同步（bypass synchronization）是判断逆变器输出与旁路电源是否足够接近。旁路切换（bypass transfer）是把负载从逆变器供电路径切到旁路路径，或从旁路切回逆变器路径。

本节只讲一个概念：电压幅值、频率、相位三项都满足窗口，并持续满足保持时间（hold time）后，状态机（state machine）才允许切换。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）在逆变器故障、过载、维修旁路或模式切换时可能使用旁路。如果不同步就切换，负载会看到电压突变，静态开关或继电器也可能承受冲击。

锁相环（phase-locked loop / PLL）能给出旁路或电网相位，但 PLL 锁定不等于马上能切换。固件还要检查均方根（root mean square / RMS）电压、频率差和相位误差（phase error）。

## 3. 物理直觉

两个人交接一个正在转动的方向盘时，手的位置、速度和力度都要接近。旁路切换也类似：电压幅值像力度，频率像速度，相位像手的位置。只满足其中一个条件不够。

    RMS 电压
    幅值窗口

    频率差
    速度窗口

    相位误差
    位置窗口

    保持时间
    连续满足
    才给许可

    切换许可
    0 / 1

    任意一个条件失效，许可撤销；相位跳变后必须重新等待。

图 1：旁路切换许可是多条件窗口加保持时间，不是单个 PLL 标志。

## 4. 数学形式

  voltage_ok   = abs(V_bypass - V_inv) / V_inv = hold_time

默认教学参数：

  V_inv = 220 Vrms
voltage window = 10 %
frequency window = 0.20 Hz
phase window = 5 deg
hold time = 30 ms

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_bypass_sync_transfer.py

脚本会生成并默认尝试自动打开图片；如果打不开，会打印完整路径。

    产物

- `simulations/results/single_phase_bypass_sync_transfer.png`

    对比任务
    python simulations\python\single_phase_bypass_sync_transfer.py --phase-window-deg 2 --output simulations\results\bypass_sync_phase_2deg.png
python simulations\python\single_phase_bypass_sync_transfer.py --sync-hold-time 0.060 --output simulations\results\bypass_sync_hold_60ms.png

观察相位窗口变窄、保持时间变长后，切换许可出现时间如何变化。

仿真观察顺序：

- 先看 RMS 电压是否进入电压窗口。

- 再看频率差是否进入频率窗口。

- 再看相位误差是否进入相位窗口。

- 最后看 `All sync windows OK` 和 `Transfer allowed` 之间是否相差保持时间。

- 观察 200 ms 相位跳变后，切换许可是否撤销。

## 6. 固件落地

真实 C 工程里，旁路同步常分散在多个模块：

- `pll.c`：提供旁路或电网相位。

- `rms.c`：计算逆变器和旁路 RMS 电压。

- `sync_check.c`：判断电压、频率、相位窗口和保持时间。

- `state_machine.c`：决定是否从逆变模式进入旁路模式。

- `protection.c`：相位跳变、旁路异常、逆变器故障时撤销许可或锁存故障。

## 7. 常见误解

- **误解：**PLL locked 就等于可以切旁路。
**纠正：**还要检查 RMS 电压、频率差、相位差和保持时间。

- **误解：**相位刚好落入窗口的一瞬间就能切。
**纠正：**要连续保持一段时间，避免噪声或瞬时交叉造成误许可。

- **误解：**旁路切换只是继电器动作。
**纠正：**动作前的软件许可、保护锁存、静态开关时序和状态机条件都很关键。

## 8. 验收标准

- 能解释旁路同步和旁路切换的区别。

- 能根据图指出哪个条件最晚进入窗口。

- 能解释为什么需要保持时间。

- 能说明相位跳变后为什么要撤销切换许可。

- 能基于图中参数准备导师问题。

## 9. 复盘问题

- 默认仿真中，三项同步窗口分别是什么？

- `All sync windows OK` 第一次变为 1 后，为什么 `Transfer allowed` 不是立刻变为 1？

- 200 ms 相位跳变后，哪条曲线先变化？状态机应该如何处理这个事件？

## 10. 导师问题

- 我用 `single_phase_bypass_sync_transfer.py` 看到三项窗口都满足并保持 30 ms 后才允许切换。公司工程里旁路切换许可通常有哪些窗口阈值？

- 我在图中看到 200 ms 相位跳变后 `Transfer allowed` 立刻撤销。真实产品里相位异常后是否还会加入额外延时或故障锁存？

- 公司代码里旁路同步判断是在 PLL 模块、状态机模块，还是单独的同步检查模块中实现？

**下一步：**这节把 PLL、逆变器状态机和 UPS 系统切换连接起来。后续可以继续做三电平逆变器或 Vienna 整流器，但旁路同步是读 UPS 系统代码前必须会看的接口。

关联：[PLL 锁定检测](0017-single-phase-pll-lock-detector.html)；[逆变器故障状态机](0021-single-phase-inverter-fault-state-machine.html)；源稿：`concepts/control/single-phase-bypass-sync-transfer.md`。

    上一节：教程 0022：UPS 固件实时调度骨架
    下一节：教程 0024：UPS 模式状态机
