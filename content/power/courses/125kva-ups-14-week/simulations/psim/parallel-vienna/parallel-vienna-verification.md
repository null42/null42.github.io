---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "两套并联Vienna搭建规范"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "两套整流器必须保留独立输入电感、独立开关、独立门极和独立电流测量，交流侧及`BAT+、O、BAT-`三节点并联。输出后计算`ig=i1+i2`和`iΔ=i1-i2`。"
navGroup: 项目实践
navGroupOrder: 20
---

# 两套并联Vienna搭建规范

两套整流器必须保留独立输入电感、独立开关、独立门极和独立电流测量，交流侧及`BAT+、O、BAT-`三节点并联。输出后计算`ig=i1+i2`和`iΔ=i1-i2`。

依次运行相同参数、单支路电感偏差、采样增益偏差、零偏、死区偏差、同步载波和候选交错载波。交错角是教学扫描量，不是产品结论。
