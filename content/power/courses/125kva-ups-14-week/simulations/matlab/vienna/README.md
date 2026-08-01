---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "Vienna模型"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "- `vienna_state_table.m`：8个门极组合乘8个三相电流符号组合，共64行；"
navGroup: 项目实践
navGroupOrder: 20
---

# Vienna模型

- `vienna_state_table.m`：8个门极组合乘8个三相电流符号组合，共64行；
- `vienna_control_design.m`：电流环与外环带宽层级示例；
- `parallel_vienna_total_diff.m`：总流和差流重构；
- `parallel_vienna_mismatch_sweep.m`：参数失配敏感性；
- `.slx`文件：参数化平均能量通道，不代替PSIM器件路径验证。
