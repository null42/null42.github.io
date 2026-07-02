---
date: 2026-06-14
category: 电源控制
source: power
visibility: public
title: "学习记录 #0005：锁相环（PLL）技术——电网同步的核心"
tags:
  - power-electronics
status: learning
summary: "**日期**：2026-06-13 **课程**：第5课 — 锁相环（PLL）技术 **状态**：进行中"
---

# 学习记录 #0005：锁相环（PLL）技术——电网同步的核心

**日期**：2026-06-13
**课程**：第5课 — 锁相环（PLL）技术
**状态**：进行中

## 关键洞察

1. **UPS必须锁相**：相位差>5°并网可能损坏设备，PLL提供θ和f用于dq控制和同步切换
2. **SRF-PLL核心**：Clarke→Park→PI→VCO，vq=0表示锁相成功（vq=V·sin(φ-θ)）
3. **单相用SOGI-PLL**：SOGI从单相信号生成正交对v'/qv'，等效vα/vβ，然后套用SRF
4. **SOGI传递函数**：Hα=kωs/(s²+kωs+ω²)同相，Hβ=kω²/(s²+kωs+ω²)正交，k=√2最佳折中
5. **Tustin离散化**：SOGI变成二阶IIR滤波器，系数随ω变化需动态更新
6. **不平衡问题**：负序在dq坐标系产生2倍频波动，SRF-PLL无法处理→用DSOGI-PLL

## 代码要点

- SRF-PLL：Clarke→Park→归一化vq→PI→VCO，约30行核心代码
- SOGI-PLL：IIR滤波→Park→归一化vq→PI→VCO→反馈ω到SOGI更新系数
- sin/cos优化：查表法或CORDIC，不要在ISR中调用sinf/cosf

## 待深入问题

- [ ] DSOGI-PLL的正负序分离具体怎么实现？
- [ ] FLL（频率锁定环）和PLL的区别与配合？
- [ ] sin/cos查表法的精度和速度权衡？

## 下一步

进入第6课：ADC采样技术
