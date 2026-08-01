---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "F28075 ADC—ISR—PWM—Trip时序设计"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "快速控制链"
navGroup: 项目实践
navGroupOrder: 20
---

# F28075 ADC—ISR—PWM—Trip时序设计

## 快速控制链

1. ePWM在中心计数点或经验证的低噪声窗口产生SOCA；
2. ADC SOC采集三相电流、支路电流和关键电压；
3. ADCINT触发快速ISR或CLA任务；
4. 完成校准、Clarke/Park、电流环、解耦、调制和门极合法性检查；
5. 写入CMPA影子寄存器；
6. 在下一次CTR=ZERO或CTR=PRD事件统一装载；
7. CMPSS经Digital Compare直接触发Trip Zone，不等待普通ISR。

## 时间预算

设控制周期为`Tctrl`：ADC采样与转换、PIE进入、算法、合法性检查和写寄存器总时间必须小于更新截止期；快速ISR最坏执行时间课程目标不超过`0.6Tctrl`。

## 必测信号

- ADC触发GPIO；
- ISR入口和出口GPIO；
- PWM更新事件；
- CMPSS输入越限时刻；
- Trip Zone输出封锁时刻。

产品实际PWM频率、SOC通道和引脚尚未获得，本页不给出虚构寄存器值。
