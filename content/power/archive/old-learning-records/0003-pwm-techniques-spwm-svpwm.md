---
date: 2026-06-14
category: 电源控制
source: power
visibility: public
title: "学习记录 #0003：PWM调制技术——从SPWM到SVPWM"
tags:
  - power-electronics
status: learning
summary: "**日期**：2026-06-13 **课程**：第3课 — PWM调制技术——从SPWM到SVPWM **状态**：进行中"
---

# 学习记录 #0003：PWM调制技术——从SPWM到SVPWM

**日期**：2026-06-13
**课程**：第3课 — PWM调制技术——从SPWM到SVPWM
**状态**：进行中

## 关键洞察

1. **SPWM核心**：面积等效原理——脉冲宽度按正弦规律变化，使输出电压平均值逼近正弦波
2. **单极性 vs 双极性**：单极性谐波在2fc处（等效倍频），电压跳变减半，THD更低；双极性实现简单
3. **SVPWM本质**：用8个离散电压矢量（6非零+2零），通过伏秒平衡合成任意参考矢量
4. **Min-Max法**：Voffset = -(max+min)/2，等价于三次谐波注入，无需扇区判断，代码简洁
5. **15%提升来源**：SPWM最大V1_peak = Vdc/2，SVPWM最大V1_peak = Vdc/√3，比值2/√3 ≈ 1.1547

## 代码要点

- SPWM实现：正弦查表法 + 规则采样 + 定时器中断更新CMPA
- SVPWM实现：Min-Max法（逆Clark → 计算offset → 注入 → 写CCR）
- 三相正弦表：A/B/C相索引偏移85/171（256点表）

## 待深入问题

- [ ] 三电平SVPWM的扇区判断与两电平有何不同？
- [ ] 过调制区域（m_a > 1）的SVPWM怎么处理？
- [ ] 中心对齐PWM与边沿对齐PWM对电流采样的影响？

## 下一步

进入第4课：数字控制基础——从连续到离散
