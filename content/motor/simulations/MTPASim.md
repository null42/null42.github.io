---
title: MTPA & 弱磁控制仿真 -- Id-Iq 电流平面与转矩-速度包络
date: 2026-07-02
section: 电机控制
chapter: 02-Simulations
chapterTitle: 仿真专题
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/MTPASim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/MTPASim.vue
chapterOrder: 20
---

# MTPA & 弱磁控制仿真 -- Id-Iq 电流平面与转矩-速度包络

#### MTPA & 弱磁控制仿真 -- Id-Iq 电流平面与转矩-速度包络

## MTPA / 弱磁 / MTPV 控制原理

**IPMSM 转矩公式：**Te = 1.5·p·[ψf·Iq + (Ld-Lq)·Id·Iq]。前一项是永磁转矩，后一项是磁阻转矩；当 Lq>Ld 且 IdLd 的 IPMSM，近似轨迹为 Id = ψf/[2(Lq-Ld)] - √((ψf/[2(Lq-Ld)])² + Iq²)；若 Ld≈Lq，则退化为 SPM 的 Id=0。

**电流圆与电压椭圆：**电流圆限制铜耗和逆变器电流，电压椭圆来自 vd=-ωLqIq、vq=ω(ψf+LdId)。转速升高时椭圆收缩，MTPA 点可能不再满足电压约束。

**弱磁切换：**低速优先沿 MTPA 取最高转矩/电流；达到基速后需施加更负的 Id 降低等效磁链，工作点从 MTPA 转向电压椭圆边界，进入 FW/MTPV 区域。

**常见误区：**负 Id 不是越大越好。它会占用电流圆半径、降低可用 Iq，并增加铜耗；弱磁区提升速度通常以可输出转矩下降为代价。
