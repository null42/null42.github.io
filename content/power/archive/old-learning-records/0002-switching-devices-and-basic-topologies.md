---
date: 2026-06-14
category: 电源控制
source: power
visibility: public
title: "学习记录 #0002：电力电子基础——开关器件与基本拓扑"
tags:
  - power-electronics
status: learning
summary: "**日期**：2026-06-13 **课程**：第2课 — 电力电子基础——开关器件与基本拓扑 **状态**：进行中"
---

# 学习记录 #0002：电力电子基础——开关器件与基本拓扑

**日期**：2026-06-13
**课程**：第2课 — 电力电子基础——开关器件与基本拓扑
**状态**：进行中

## 关键洞察

1. **MOSFET vs IGBT选型核心**：不是简单的"高压=IGBT"，而是看损耗计算。MOSFET导通损耗∝I²（电阻性），IGBT导通损耗∝I（压降性）；MOSFET开关快但高压Rds(on)大，IGBT开关慢但高压导通优
2. **SiC MOSFET正在改变游戏规则**：兼具MOSFET的开关速度和IGBT的高压能力，但体二极管压降高（~3V），死区续流损耗大
3. **PFC用Boost的根本原因**：输入电流连续（电感电流），容易控制成正弦形；输出电压高于输入峰值
4. **死区时间双刃剑**：太短→直通烧管，太长→THD增大+效率降低。SiC死区150-500ns，IGBT死区1-3μs
5. **自举预充电**：逆变器启动必须先给自举电容充电（低侧脉冲），否则高侧驱动器无电源

## 损耗计算公式

- MOSFET导通损耗：P_cond = I_D,rms² × R_DS(on)
- IGBT导通损耗：P_cond = I_C,avg × V_CE(sat)
- 开关损耗：P_sw = (E_on + E_off) × f_sw
- 驱动损耗：P_gate = Q_g × V_gs × f_sw

## 拓扑电压增益

- Buck：V_out = D × V_in
- Boost：V_out = V_in / (1-D)
- Buck-Boost：V_out = -D/(1-D) × V_in

## 待深入问题

- [ ] SiC体二极管的高压降在死区期间具体怎么影响损耗？
- [ ] 死区补偿的C代码怎么写？
- [ ] 自举电容容量怎么精确计算？

## 下一步

进入第3课：PWM调制技术——从SPWM到SVPWM
