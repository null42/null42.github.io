---
title: 教程 0037：三相功率与 dq 坐标变换
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0037-three-phase-power-dq-transform.html
status: learning
visibility: public
summary: Imported from 0037-three-phase-power-dq-transform.html
chapterOrder: 10
---

# 教程 0037：三相功率与 dq 坐标变换

中文主讲。一个概念：把三相正弦量变成 dq 坐标里的直流量，是从单相 UPS 课程进入三相 UPS 和 PCS 的入口。

  目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**本节只讲公开的三相坐标变换和教学参数，不包含公司内部采样标定、真实项目额定功率或控制器参数。

## 1. 它是什么

三相系统（three-phase system）包含 A/B/C 三个相差 120 度的交流量。对称三相满足 `xa + xb + xc = 0`，所以三相信息可以压缩为两轴的 Clarke 变换（Clarke transform），再用 Park 变换（Park transform）转到随电网旋转的 dq 轴。

## 2. 为什么 UPS 需要它

单相 PFC 课程用瞬时电压生成电流参考；三相 UPS、Vienna PFC 和 PCS 则通常用 dq 轴控制有功、无功、电流和中点平衡。学会 dq 坐标后，三相 PFC、三相逆变器、并网 PCS 都能放在同一套阅读框架里。

## 3. 物理直觉

Clarke 变换像把三根投影尺合成平面上的一个箭头；Park 变换像你站到这个箭头一起旋转的平台上。原来看起来是 50 Hz 正弦的量，在旋转平台上变成接近恒定的 d 轴和 q 轴数值。

## 4. 数学形式

  alpha = xa
beta  = (xa + 2 * xb) / sqrt(3)
d =  alpha * cos(theta) + beta * sin(theta)
q = -alpha * sin(theta) + beta * cos(theta)

若 theta 与三相正序电压同相，d 轴表示同相分量，q 轴表示正交分量。并网控制里常把 d 轴对准电网电压，使 d 轴电流主要对应有功功率，q 轴电流主要对应无功功率。

## 5. 一个仿真任务与仿真观察

用 Python 或 MATLAB 生成三相正弦量，分别计算 alpha/beta 和 d/q。观察 theta 正确时 d 轴接近常数、q 轴接近 0；theta 偏差 10 度时 q 轴出现明显偏置。

  产物

- 一张三相 abc 与 dq 对比图。
- 一句结论：dq 不是新物理量，而是观察坐标换了。

## 6. 固件落地

固件里常见函数名包括 `clarke_transform()`、`park_transform()`、`sin_cos_table`、`theta_grid`。控制 ISR 一般先采样 abc，再做坐标变换，最后进入 dq 电流环。

## 7. 常见误解

- **误解：**dq 只属于电机 FOC。
**纠正：**三相电源、UPS 和 PCS 同样大量使用 dq 坐标。
- **误解：**q 轴永远应该为 0。
**纠正：**只有在特定对齐方式和控制目标下才设为 0。

## 8. 验收标准

- 能手写 Clarke 和 Park 公式。
- 能解释为什么三相对称系统可以从 3 个量变成 2 个量。
- 能说明 d/q 轴和有功/无功的关系取决于 theta 对齐方式。

## 9. 复盘问题

- 为什么三相瞬时总功率比单相更平稳？
- theta 偏差会怎样影响 q 轴误差？

## 10. 导师问题

- 阅读三相控制代码时，theta 通常来自 PLL、内部振荡器，还是上层同步模块？
- 公司代码里的 Clarke/Park 是否使用功率不变形式？我只记录通用差异，不记录内部实现。

**下一步：**学习三相 SRF-PLL，用 q 轴误差把 theta 锁到电网。

源稿：`concepts/power-electronics/three-phase-power-dq-transform.md`

  上一节：教程 0036：UPS 参数保存触发策略下一节：教程 0038：三相 SRF-PLL 锁相
