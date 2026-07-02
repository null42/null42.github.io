---
title: 教程 0044：PCS 构网型 V/f 与下垂控制
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0044-pcs-grid-forming-vf-droop.html
status: learning
visibility: public
summary: Imported from 0044-pcs-grid-forming-vf-droop.html
chapterOrder: 10
---

# 教程 0044：PCS 构网型 V/f 与下垂控制

中文主讲。一个概念：构网型 PCS 自己建立电压和频率，像一个可控电压源。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只讲公开构网控制概念，不记录微网项目参数、并离网切换策略或客户现场配置。

## 1. 它是什么

构网型控制（grid-forming control / GFM）不依赖外部电网相位，而是输出自己的电压幅值和频率。基础形式是电压频率控制（voltage-frequency control / V/f control），多机并联时常加入下垂控制（droop control）分配功率。

## 2. 为什么 UPS 需要它

UPS 离网逆变器本质上就是构建负载电压。PCS 在微网或孤岛场景也需要承担类似角色：没有强电网时，PCS 不能只跟随 PLL，而要建立电压源参考。

## 3. 物理直觉

GFL 是跟着别人打拍子，GFM 是自己当节拍器。下垂控制则像多个节拍器根据负载稍微放慢或降低电压，从而自然分担有功和无功。

## 4. 数学形式

omega_ref = omega_nominal - Kp_droop * (P - P_ref)
V_ref = V_nominal - Kq_droop * (Q - Q_ref)
theta = theta + omega_ref * Ts

P-f 下垂让有功增加时频率略降；Q-V 下垂让无功增加时电压略降。具体符号依系统约定。

## 5. 一个仿真任务与仿真观察

给 GFM PCS 加阶跃负载，观察频率和电压按下垂曲线产生小偏移，再随二次控制或恢复环节回到目标附近。

产物

- 一张 P/f 和 Q/V 下垂曲线。
- 一段说明：下垂是并联系统的功率分担机制，不是故障。

## 6. 固件落地

模块常见命名包括 `virtual_oscillator`、`vf_reference`、`droop_controller`、`voltage_loop`、`current_limit`。构网模式尤其需要电流限幅和过载退让。

## 7. 常见误解

- **误解：**构网型控制不需要电流环。
**纠正：**内层电流限制仍是保护功率器件的关键。
- **误解：**频率偏移说明控制失败。
**纠正：**在下垂控制里，小偏移是功率分担信号。

## 8. 验收标准

- 能区分 GFL 和 GFM 的角度来源。
- 能写出 P-f、Q-V 下垂的基本式子。
- 能解释为什么构网 PCS 更像 UPS 离网逆变器。

## 9. 复盘问题

- 多台 PCS 并联时，为什么不能每台都死死维持同一个电压频率？
- 过载时先限电流还是先维持电压？

## 10. 导师问题

- 公司项目中 GFL/GFM 的模式边界通常由状态机还是上位机指令决定？
- 我只记录公开模式分类，不记录现场参数。

**下一步：**学习 PCS 并网侧 LCL 滤波器和有源阻尼。

源稿：`concepts/pcs/grid-forming-vf-droop.md`

上一节：教程 0043：PCS 并网跟随型 P/Q 控制下一节：教程 0045：PCS LCL 滤波器与有源阻尼
