---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "有源中点平衡搭建规范"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "使用`P -> 上开关组 -> Xb -> 下开关组 -> M`和`Xb -> Lb -> O`的实际节点。每只物理开关保留独立门极；在门极矩阵未确认前，不把并联器件自动合并。"
navGroup: 项目实践
navGroupOrder: 20
---

# 有源中点平衡搭建规范

使用`P -> 上开关组 -> Xb -> 下开关组 -> M`和`Xb -> Lb -> O`的实际节点。每只物理开关保留独立门极；在门极矩阵未确认前，不把并联器件自动合并。

正、负差压初始条件分别运行，记录上下电容电流、平衡电感电流和中点差压。确认平衡支路限流不会改变总母线电压参考。
