---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "三相四线制UPS联合搭建规范"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "输入整流、分裂母线、中点平衡、两套并联T型逆变器和公共U/V/W/OutN输出必须使用统一节点表。`OutN`与母线中点O实际连接；单相负载、不平衡负载和非线性负载分别测试。"
navGroup: 项目实践
navGroupOrder: 20
---

# 三相四线制UPS联合搭建规范

输入整流、分裂母线、中点平衡、两套并联T型逆变器和公共U/V/W/OutN输出必须使用统一节点表。`OutN`与母线中点O实际连接；单相负载、不平衡负载和非线性负载分别测试。

联合仿真顺序：预充、整流稳态、逆变使能、平衡三相负载、单相负载、负载阶跃、采样故障、门极Trip和安全停机。每一步保存中线电流、母线差压、总功率、支路功率和状态机状态。
