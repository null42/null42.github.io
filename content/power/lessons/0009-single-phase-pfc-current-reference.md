---
title: 教程 0009：单相功率因数校正（power factor correction / PFC）电流参考
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0009-single-phase-pfc-current-reference.html
status: learning
visibility: public
summary: Imported from 0009-single-phase-pfc-current-reference.html
chapterOrder: 10
---

# 教程 0009：单相功率因数校正（power factor correction / PFC）电流参考

中文主讲。一个概念：PFC 的第一步不是先写完整控制器，而是先知道输入电流参考应该长什么样。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用公开基础理论和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 1. 它是什么

功率因数校正（power factor correction / PFC）的第一步，是让输入电流尽量与交流输入电压同相、同形。

电流参考（current reference）是控制器希望输入电流跟踪的目标波形。对单相 PFC 来说，理想电流参考通常与输入电压 `vac` 同相。

本节只讲电流参考怎么生成，不展开完整电压环、电流环、锁相环（phase-locked loop / PLL）和脉宽调制（pulse-width modulation / PWM）。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）前级通常要从交流电网取电。如果输入电流畸变严重或与电压不同相，会带来：

- 功率因数低，输入视在功率变大。

- 谐波电流增加，对电网和前级器件不友好。

- 整流桥、Boost 电感和母线电容的电流应力变大。

PFC 的目标是让电网看见的负载更像电阻：电压怎么变，电流就按比例跟着变。

## 3. 物理直觉

纯电阻负载的电流与电压同相。PFC 电流参考就是让电源前级“装得像电阻”。

整流后的 Boost PFC 功率级看到的是 `|vac|`，但从电网侧看，输入电流仍应跟原始交流电压 `vac` 同相：正半周吸正电流，负半周吸负电流。

    交流输入
    vac, 50 Hz

    整流 + Boost
    看到 |vac|

    电流参考
    iref = G * vac

    目标
    PF 接近 1

    vac
    iref 同相

图 1：本节只建立电流参考形状，不展开完整 PFC 控制器。

## 4. 数学形式

如果目标输入功率为 `P`，交流电压的均方根值（root mean square / RMS）为 `Vrms`，可以定义等效电导：

  G = P / Vrms^2
i_ref(t) = G * v_ac(t)

平均输入功率：

  Pavg = mean(v_ac(t) * i_ref(t))

因为 `i_ref` 与 `v_ac` 同相，理想功率因数接近 1。

## 5. 一个仿真任务与仿真观察

一个仿真任务是运行脚本，观察 `vac`、`|vac|`、`iref` 和瞬时功率之间的关系：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pfc_current_reference.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含输入电压、整流电压、电流参考、瞬时功率和参数框。

    对比实验
    python simulations\python\single_phase_pfc_current_reference.py --target-power 500 --output simulations\results\pfc_current_ref_500w.png
python simulations\python\single_phase_pfc_current_reference.py --target-power 1500 --output simulations\results\pfc_current_ref_1500w.png

比较 500 W 和 1500 W 时电流参考幅值如何变化。文件名和图内参数框都写明了当前功率条件。

观察顺序：

- 先看 `vac` 与 `iref` 是否同相。

- 看 `|vac|` 与交流电压的关系，理解整流后功率级看到的电压。

- 看瞬时功率是否有两倍工频脉动。

- 看参数框里的功率因数 `PF` 是否接近 1。

## 6. 固件落地

真实固件里，电流参考通常由以下信号共同决定：

- 电压环输出：决定当前需要多少输入功率或电流幅值。

- 输入电压采样或 PLL：给出电网相位或单位正弦。

- 前馈和限幅：避免输入低压或启动瞬间给出过大参考。

- 电流环：让实际电感电流跟踪 `i_ref`。

读 PFC 代码时，先找“电流参考在哪里生成”，再看电流环如何跟踪它。

## 7. 常见误解

- **误解：**PFC 就是把母线电压升到 380 V。
**纠正：**升压只是功率级结果；PFC 的关键是输入电流的形状和相位。

- **误解：**电流参考越大越好。
**纠正：**电流参考幅值由功率需求、输入电压、限流和母线控制共同决定。

- **误解：**整流后电压为正，所以只需要考虑正电流。
**纠正：**从电网侧看，输入电流仍要与交流电压同相，正负半周都要对应。

## 8. 验收标准

- 能解释 PFC 电流参考为什么要与 `vac` 同相。

- 能用 `G = P / Vrms^2` 推出 `i_ref = G * vac`。

- 能在图中指出 `vac`、`|vac|`、`iref` 和 `p(t)`。

- 能解释为什么瞬时功率有脉动，但平均功率接近目标功率。

- 能基于图中 PF、RMS 和功率参数准备导师问题。

## 9. 复盘问题

- 默认仿真中，`Vrms=220 V`、`P=1000 W`，电流 RMS 大约是多少？

- 如果目标功率从 500 W 提高到 1500 W，`iref` 幅值如何变化？

- 为什么本节没有直接讲完整电压环？如果电流参考都不会看，直接看双环控制会卡在哪里？

## 10. 导师问题

- 我用 `single_phase_pfc_current_reference.py` 看到 `iref = G * vac` 时 PF 接近 1。公司单相 PFC 代码里的电流参考是直接用输入电压采样生成，还是通过 PLL/单位正弦生成？

- 本节用 `P / Vrms^2` 得到等效电导。真实工程里电流参考幅值通常来自电压环输出、功率指令，还是前馈计算？

- 图中瞬时功率有两倍工频脉动。公司工程里母线电压环如何避免跟着二倍频纹波乱调？

**下一步：**下一节再讲 PFC 电压环如何给出电流幅值，不要把电压环、电流环、PLL 和 PWM 一次混在一起。

关联：[上一节：Boost 慢速任务、遥测与故障日志](0008-boost-telemetry-fault-log.html)；源稿：`concepts/power-electronics/single-phase-pfc-current-reference.md`。

    上一节：教程 0008：Boost 慢速任务、遥测与故障日志
    下一节：教程 0010：单相功率因数校正（power factor correction / PFC）电压环如何生成电流幅值
