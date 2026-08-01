---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "125 kVA三相四线制三电平UPS独立课程"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "打开课程"
navGroup: 项目实践
navGroupOrder: 20
---

# 125 kVA三相四线制三电平UPS独立课程

## 打开课程

直接打开`index.html`，按第1周至第14周顺序学习。每周五节课程，第6天联合实验，第7天闭卷验收。

PowerShell：

```powershell
Start-Process .\courses\125kva-ups-14-week\index.html
```

## 自动检查

```powershell
python courses/125kva-ups-14-week/tools/validate_course.py
pytest courses/125kva-ups-14-week/tests/test_course_assets.py -q
matlab -batch "run('courses/125kva-ups-14-week/simulations/matlab/run_all_course_checks.m')"
```

## 目录

- `lessons/`：70节独立HTML课程；
- `roadmap/`：14周逐日路线；
- `reference/`：节点、符号、验收和冻结拓扑；
- `simulations/matlab/`：MATLAB脚本和Simulink平均模型；
- `simulations/psim/`：PSIM逐状态搭建与验证规范；
- `projects/f28075-control/`：可由GCC测试的控制和安全逻辑；
- `weekly-reviews/`：14份周验收记录；
- `final/`：综合报告、故障注入和答辩材料。

PSIM未在当前环境中发现，因此没有伪造`.psimsch`文件。安装PSIM后按`simulations/psim/verification-matrix.md`逐项建立并保存工程。
