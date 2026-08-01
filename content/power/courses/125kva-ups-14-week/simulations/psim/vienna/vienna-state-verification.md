---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "Vienna开关模型搭建规范"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "节点"
navGroup: 项目实践
navGroupOrder: 20
---

# Vienna开关模型搭建规范

## 节点

每相输入电感后接Vienna双向开关节点；六只整流二极管分别连接相节点到P、M；分裂母线电容连接P-O和O-M。三相整流器共同使用O，但每相门极独立。

## 逐状态顺序

1. 固定Sa、Sb、Sc为000至111；
2. 对每一组合分别设置三相三线制六个非零电流符号扇区，共48种正常组合；
3. 先用理想器件和固定电流初值运行；
4. 记录相端电平、电感斜率、二极管电流和中点电流；
5. 与`simulations/matlab/vienna/vienna_state_table.m`逐行比较；
6. 再加入电感ESR、二极管压降、死区和采样延迟。

`+++`和`---`不满足三相三线制`ia+ib+ic=0`，只作为符号输入校验的异常测试，不计入48个正常状态。电流过零边界单独使用器件级换流模型验证。

## 禁止做法

不能只看桥臂输出电压判断器件路径，不能把交错载波或180°移相填入默认产品参数，不能在电流过零时用任意一侧二极管替代实际续流分析。
