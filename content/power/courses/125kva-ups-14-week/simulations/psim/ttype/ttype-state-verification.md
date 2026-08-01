---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "T型三电平开关模型搭建规范"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "桥臂"
navGroup: 项目实践
navGroupOrder: 20
---

# T型三电平开关模型搭建规范

## 桥臂

每相包含上主管、下主管和两只背向、共发射极辅管。P、O、N三种允许电平必须对应实际节点；原目标图上半部分辅管方向错误的说明保存在课程图注中。

## 状态

教学控制状态只使用：P=`1000`、O=`0110`、N=`0001`，顺序为上主管、上辅管、下辅管、下主管。其余组合先标记为禁止或未受控，不得自动归入零电平。

## 验证

正负电流各运行P/O/N三种状态，再运行P-O、O-N、N-P和反向换流。测量桥臂电压、主管电流、辅管电流、反并联二极管电流和直流母线电流。
