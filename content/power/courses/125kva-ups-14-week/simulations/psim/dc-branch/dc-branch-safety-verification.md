---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "三开关双电感直流支路安全筛查"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "节点固定为："
navGroup: 项目实践
navGroupOrder: 20
---

# 三开关双电感直流支路安全筛查

节点固定为：

```text
BAT+ -> L+ -> XP -> SP -> P
                  |       
                  S0      
                  |       
BAT- -> L- -> XN -> SM -> M
```

另有`DP:XP->P`、`D0:XN->XP`、`DM:M->XN`。逐项运行八个门极组合。`SP=S0=SM=1`明确建立`P-SP-S0-SM-M`直通，必须在仿真和F28075代码中禁止。

除直通结论外，其余组合的正式充电、放电、升压或降压功能均等待产品门极序列、器件资料或实测波形证据，不在PSIM中先验命名。
