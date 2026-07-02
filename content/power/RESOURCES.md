---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: UPS电源软件开发 — 学习资源列表
tags:
  - power-electronics
status: learning
summary: "| 书名 | 作者 | 说明 | 优先级 | |------|------|------|--------| | 《电力电子技术》（第6版） | 王兆安、刘进军 | 国内电力电子经典教材，覆盖整流、逆变、斩波、变频四大变换 | 必读 | | 《Power Electronics: Converters, Applica"
---

# UPS电源软件开发 — 学习资源列表

## 一、核心书籍（必读）

### 电力电子基础
| 书名 | 作者 | 说明 | 优先级 |
|------|------|------|--------|
| 《电力电子技术》（第6版） | 王兆安、刘进军 | 国内电力电子经典教材，覆盖整流、逆变、斩波、变频四大变换 | 必读 |
| 《Power Electronics: Converters, Applications, and Design》 | Ned Mohan | 国际经典，英文原版更佳，理论推导严谨 | 推荐 |
| 《开关电源设计》 | Abraham I. Pressman | 实用性强，涵盖拓扑选择、磁件设计、控制环路 | 推荐 |

### 数字控制与嵌入式
| 书名 | 作者 | 说明 | 优先级 |
|------|------|------|--------|
| 《嵌入式数字控制系统：基于C和Python编程实现》 | Cem Unsalan 等 | Python原型验证→C语言MCU实现→系统整合，三阶段教学法 | 必读 |
| 《微控制器原理及应用——基于TI C2000实时微控制器》 | 蔡逢煌 等 | C2000是UPS/DPS领域主力MCU，本书覆盖ePWM/ADC等关键外设 | 必读 |
| 《Digital Control of Dynamic Systems》 | Gene F. Franklin | 数字控制理论经典，z变换、离散化、控制器设计 | 推荐 |

### UPS专题
| 书名 | 作者 | 说明 | 优先级 |
|------|------|------|--------|
| 《UPS应用技术》 | 王其英 | 国内UPS领域权威著作，覆盖各类型UPS原理与设计 | 必读 |
| 《Uninterruptible Power Supplies and Active Filters》 | Ali Emadi | 英文UPS专著，含主动滤波与电能质量内容 | 参考 |

## 二、在线课程与教程

### 系统性课程
- [电子科技大学《嵌入式系统及应用》](https://www.icourse163.org/course/UESTC-1206862805) — 国家级一流课程，ARM+uC/OS-II
- TI C2000 Academy — TI官方C2000培训体系，含电源控制实验
- [TI High-Voltage Interleaved PFC Reference Design](https://www.ti.com/tool/TIDA-00779) — PFC参考设计

### 技术博客与文章
- [三相三电平VIENNA整流器仿真设计与分析实战](https://blog.csdn.net/weixin_42561464/article/details/151686686) — 维也纳整流器SVPWM详解
- [基于Simulink的三相维也纳整流器功率因数校正](https://blog.csdn.net/xiaoheshang_123/article/details/160713493) — 三电平SVPWM+中点平衡
- [电赛UPS电源题解题思路](https://wenku.csdn.net/answer/8o2t4rbw18hb) — 在线式UPS双变换架构详解
- [维也纳整流器与LLC谐振变换器本质区别](https://ask.csdn.net/questions/9596306) — 拓扑对比与工程误判分析

## 三、芯片厂商参考设计（工程级）

### TI（德州仪器）
- [Single Phase Online UPS Block Diagram](https://www.ti.com/solution/single-phase-online-ups) — 单相在线式UPS系统框图与芯片选型
- UCD3138 PFC Application Notes (SLUA708/SLUA712) — 数字PFC控制器固件设计
- C2000 MCU系列 (TMS320F280039C/F28P650DK) — 电源控制专用MCU
- [TMS320F28075 产品页](https://www.ti.com/product/TMS320F28075) — TI 官方产品入口，确认 F28075 状态、参数、datasheet、TRM、errata 和软件资源
- [TMS320F2807x Real-Time Microcontrollers datasheet](https://www.ti.com/lit/ds/symlink/tms320f28075.pdf) — F28075/F2807x 数据手册，查芯片特性、封装、引脚、电气约束和外设数量
- [TMS320F2807x Technical Reference Manual](https://www.ti.com/lit/pdf/spruhm9) — F2807x 技术参考手册，查时钟、GPIO、PIE、ePWM、ADC、Trip Zone、通信和 CLA/DMA 等寄存器配置
- [C2000Ware](https://www.ti.com/tool/C2000WARE) — TI 官方 C2000 基础软件包，包含 device-specific drivers、libraries、peripheral examples、bit-field headers 和开发板资料
- [C2000Ware DigitalPower SDK](https://www.ti.com/tool/C2000WARE-DIGITALPOWER-SDK) — 面向 AC-DC、DC-DC、DC-AC 数字电源应用的软件、例程和 powerSUITE 工具，可作为 UPS/PCS 后续工程参考

### ST（意法半导体）
- STM32G4系列 — 高性能混合信号MCU，适合电源控制
- STM32F334 — 内置高分辨率定时器（HRPWM），适合数字电源

### Infineon（英飞凌）
- XMC4000系列 — 工业级电源控制MCU
- EiceDRIVER栅极驱动器 — UPS功率级驱动方案

## 四、仿真工具

| 工具 | 用途 | 说明 |
|------|------|------|
| MATLAB/Simulink | 系统级仿真 | 控制算法验证、SVPWM仿真、环路设计 |
| PSIM | 电力电子仿真 | 专为电力电子设计，仿真速度快 |
| LTspice | 电路级仿真 | 免费SPICE仿真，适合电路细节验证 |
| PLECS | 功率电子仿真 | 热模型+电气模型联合仿真 |

## 五、社区与论坛

- 21ic电子网论坛 — 国内电源技术讨论
- 电子发烧友论坛 — 电源/UPS版块
- EEVblog Forum — 国际电子工程社区
- TI E2E论坛 — TI芯片技术支持
- 知乎电力电子话题 — 中文技术讨论

## 六、标准与规范

- IEC 62040 — UPS国际标准
- GB/T 7260 — 中国UPS国家标准
- IEC 61000-3-2/3-12 — 谐波电流限值
- IEEE 519 — 谐波控制标准
