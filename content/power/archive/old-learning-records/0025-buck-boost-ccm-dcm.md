---
date: 2026-06-14
category: 电源控制
source: power
visibility: public
title: "学习记录 #0025：Buck/Boost工作模式深度分析——CCM/DCM/BCM的工程意义"
tags:
  - power-electronics
status: learning
summary: "**日期**：2026-06-13 **课程**：补充课 — Buck/Boost工作模式深度分析 **状态**：进行中"
---

# 学习记录 #0025：Buck/Boost工作模式深度分析——CCM/DCM/BCM的工程意义

**日期**：2026-06-13
**课程**：补充课 — Buck/Boost工作模式深度分析
**状态**：进行中

## 关键洞察

1. **CCM/DCM/BCM本质区别**：DCM多了一个"断续期"（IL=0），导致传递函数从二阶变为一阶
2. **DCM对控制的影响**：直流增益与负载有关，CCM下设计的PI参数在DCM下可能不稳定
3. **Boost DCM+轻载=过压风险**：Iout→0时Vout→∞，必须有硬件OVP保护
4. **电感值计算**：L_min = Vout·(1-D)/(2·fs·Iout_min)，保证CCM的最小电感
5. **CRM vs CCM PFC**：CRM用比较器（简单），CCM用PI（复杂），功率分界线300W
6. **轻载处理策略**：Burst Mode / 增益调度 / 强制CCM / 降频运行
7. **双向DC-DC推荐强制CCM**：同步整流天然支持，只需互补PWM驱动
