---
title: 教程 0010：单相功率因数校正（power factor correction / PFC）电压环如何生成电流幅值
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0010-single-phase-pfc-voltage-loop.html
status: learning
visibility: public
summary: Imported from 0010-single-phase-pfc-voltage-loop.html
chapterOrder: 10
---

# 教程 0010：单相功率因数校正（power factor correction / PFC）电压环如何生成电流幅值

中文主讲。一个概念：母线电压误差如何变成电流参考幅值；一个仿真任务：观察负载阶跃后电压环如何抬高电导命令。这里仍不展开内层电流环和 PWM。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

电压环（voltage loop）是 PFC 控制里的慢速外环。它根据直流母线电压误差，决定输入电流参考的幅值。

本节用 电导命令（conductance command / G） 表示这个幅值。上一节已经讲过：

  i_ref(t) = G * v_ac(t)

本节只回答一个问题：`G` 为什么会变大或变小。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 前级要维持稳定直流母线。负载功率突然增加时，母线电容放电，母线电压下降。电压环必须提高输入功率，让母线回到目标值。

- 负载变大：母线下降，电压环提高电流幅值。

- 负载变小：母线上升，电压环降低电流幅值。

- 母线稳定：输入功率约等于负载功率加损耗。

## 3. 物理直觉

直流母线电容像水箱。负载是出水，PFC 输入功率是进水。水位低于目标时，电压环开大进水阀；水位高于目标时，电压环关小进水阀。

    Vbus_ref - Vbus
    母线误差

    PI 电压环
    慢速外环

    G 命令
    电流幅值

    i_ref = G * vac
    给电流环跟踪

    母线电压反馈

图 1：PFC 电压环只决定电流参考幅值；内层电流环和 PWM 后续再学。

## 4. 数学形式

母线电压误差：

  e_v[k] = Vbus_ref - Vbus[k]

比例积分控制器（proportional-integral controller / PI）输出电导命令：

  G[k] = clamp(Kp * e_v[k] + integral[k], Gmin, Gmax)
integral[k+1] = integral[k] + Ki * e_v[k] * Ts

输入功率近似为：

  Pin[k] = G[k] * Vrms^2

母线能量平衡：

  0.5 * Cbus * (Vbus[k+1]^2 - Vbus[k]^2) = (Pin[k] - Pload[k]) * Ts

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pfc_voltage_loop.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含母线电压、电导命令、输入功率、负载功率和电流参考的均方根值（root mean square / RMS）。

    对比实验
    python simulations\python\single_phase_pfc_voltage_loop.py --load-power-step 900 --output simulations\results\pfc_voltage_loop_900w.png --no-open
python simulations\python\single_phase_pfc_voltage_loop.py --load-power-step 1500 --output simulations\results\pfc_voltage_loop_1500w.png --no-open

比较负载阶跃越大时，母线下跌、电导命令和电流 RMS 参考如何变化。

观察顺序：

- 看负载阶跃后母线电压是否先下降。

- 看电压环是否提高 `G`。

- 看输入功率 `Pin` 是否跟随上升。

- 看电流参考 RMS 是否随 `G` 增大。

- 看母线是否回到参考值附近。

## 6. 固件落地

真实 PFC 固件中，电压环通常比电流环慢。它输出的变量可能叫：

- `i_amp_ref`：电流幅值参考。

- `p_cmd`：功率命令。

- `g_cmd`：电导命令。

- `i_ref_scale`：归一化电流参考比例。

阅读代码时先找母线电压采样进入哪里，再找 PI 输出在哪里限幅，以及它在哪里与输入电压或单位正弦相乘。

## 7. 常见误解

- **误解：**PFC 电压环直接控制 PWM。
**纠正：**电压环通常只给电流幅值，内层电流环才负责快速跟踪。

- **误解：**电压环越快越好。
**纠正：**单相 PFC 母线有二倍工频纹波，电压环太快会把纹波调进电流参考。

- **误解：**负载阶跃后母线不能下跌。
**纠正：**母线电容承担能量缓冲，短暂下跌正常，关键是恢复过程和保护边界。

## 8. 验收标准

- 能解释电压环（voltage loop）为什么是慢速外环。

- 能解释 `G` 增大为什么会提高输入功率。

- 能在图中指出母线电压、电导命令、输入功率、负载功率和电流参考 RMS。

- 能解释为什么需要 `Gmax` 限幅和抗积分饱和。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 默认仿真中负载从多少 W 阶跃到多少 W？发生在多少 ms？

- 负载阶跃后，为什么 `G` 和电流参考 RMS 会升高？

- 如果电压环追踪二倍工频纹波，会对输入电流参考造成什么影响？

## 10. 导师问题

- 我用 `single_phase_pfc_voltage_loop.py` 看到负载从 600 W 到 1200 W 后，电压环提高 `G`，输入功率上升。公司 PFC 代码里电压环输出的是电流幅值、功率命令还是电导命令？

- 图中 `Gmax` 会限制最大输入功率。真实工程中 PFC 电压环输出限幅通常由哪些因素决定？

- 单相 PFC 母线上有二倍工频纹波。公司工程里电压环带宽如何避免追踪二倍频纹波？

**下一步：**下一节再讲内层电流环如何让真实电感电流跟踪 `i_ref`，不要把外环、内环和 PWM 一次混在一起。

关联：[上一节：单相 PFC 电流参考](0009-single-phase-pfc-current-reference.html)；源稿：`concepts/power-electronics/single-phase-pfc-voltage-loop.md`。

    上一节：教程 0009：单相功率因数校正（power factor correction / PFC）电流参考
    下一节：教程 0011：单相功率因数校正（power factor correction / PFC）内层电流环
