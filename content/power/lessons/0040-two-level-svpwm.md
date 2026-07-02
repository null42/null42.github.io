---
title: 教程 0040：两电平 SVPWM
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0040-two-level-svpwm.html
status: learning
visibility: public
summary: Imported from 0040-two-level-svpwm.html
chapterOrder: 10
---

# 教程 0040：两电平 SVPWM

中文主讲。一个概念：空间矢量脉宽调制把 alpha/beta 电压矢量合成为三相桥臂占空比。

目录

- 它是什么
- 为什么 UPS 需要它
- 物理直觉
- 数学形式
- 一个仿真任务与仿真观察
- 固件落地
- 常见误解
- 验收标准、复盘问题、导师问题

**保密边界：**只使用两电平教学算法，不记录真实 PWM 同步、死区补偿或驱动保护细节。

## 1. 它是什么

空间矢量脉宽调制（space vector pulse-width modulation / SVPWM）把三相两电平逆变桥的 8 个开关状态看成 6 个有效矢量和 2 个零矢量，在一个 PWM 周期内用相邻矢量平均合成目标电压。

## 2. 为什么 UPS 需要它

三相逆变器、三相有源整流器和 PCS 都需要把 dq 控制器输出的电压参考变成 PWM。SVPWM 比简单 SPWM 电压利用率更高，也更容易扩展到三电平调制。

## 3. 物理直觉

目标电压矢量落在哪个扇区，就用扇区两边的两个基本矢量加零矢量拼出来。占用时间越长，平均电压越靠近那个矢量。

## 4. 数学形式

sector = angle(v_alpha, v_beta)
T1, T2 = adjacent_vector_times(v_alpha, v_beta, Vdc, Ts)
T0 = Ts - T1 - T2
Ta, Tb, Tc = sequence_to_duty(T1, T2, T0)

工程中也常用 min-max 注入法快速得到占空比，本质上等价于给三相调制波注入零序分量。

## 5. 一个仿真任务与仿真观察

设置调制比从 0.2 扫到 0.9，画出三相占空比和 alpha/beta 目标矢量轨迹。观察过调制前后占空比是否触碰 0 或 1。

产物

- 一张三相占空比曲线。
- 一张六扇区矢量轨迹草图。

## 6. 固件落地

固件路径通常是 `dq voltage -> inverse Park -> SVPWM -> PWM compare register`。更新比较值前要处理限幅、死区、互补输出和故障封锁。

## 7. 常见误解

- **误解：**SVPWM 只是一种波形画法。
**纠正：**它直接决定桥臂开关时序。
- **误解：**扇区判断错只会轻微失真。
**纠正：**可能导致占空比跳变和过流。

## 8. 验收标准

- 能列出 6 个有效矢量和 2 个零矢量。
- 能解释 T1、T2、T0 的物理含义。
- 能说出 min-max 注入与零序注入的关系。

## 9. 复盘问题

- 为什么 SVPWM 电压利用率比 SPWM 高？
- 过调制时控制器应该先限幅还是继续输出？

## 10. 导师问题

- 三相 UPS 或 PCS 代码里，SVPWM 是扇区法、min-max 法，还是查表法？
- 我只确认阅读入口，不记录内部时序细节。

**下一步：**进入三相 UPS 前级：Vienna PFC 和中点电压平衡。

源稿：`concepts/power-electronics/two-level-svpwm.md`

上一节：教程 0039：三相 dq 电流环解耦下一节：教程 0041：Vienna PFC 与中点电压平衡
