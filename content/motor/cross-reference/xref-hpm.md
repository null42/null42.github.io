---
date: 2026-06-02
section: 电机控制
chapter: cross-reference
chapterTitle: 交叉索引
chapterOrder: 10
category: 交叉索引
source: motor
visibility: public
title:  交叉引用：HPM MC代码知识库映射
tags:
  - motor-control
status: learning
summary: "> 来源：[交叉引用映射表](./cross-reference-map.md)"
navGroup: 入门与索引
navGroupOrder: 10
---

#  交叉引用：HPM MC代码知识库映射

> 来源：[交叉引用映射表](./cross-reference-map.md)

---

##  hpm_MC 代码 → 知识库文档 映射表

| hpm_MC 源码路径 | 关联知识库文档 |
|---------------|--------------|
| `hpm_mcl_v2/core/control/hpm_mcl_control.h` | ALG-01(FOC理论), ALG-07(PI电流调节器), ADV-ALG-01(带宽设计), ADV-ALG-13(PID整定), SDK-02-HPM-MC-v2-Core-Loop.md |
| `hpm_mcl_v2/core/loop/hpm_mcl_loop.h` | ALG-05(有感FOC), SDK-02-HPM-MC-v2-Core-Loop.md, ALG-02(初始位置检测) |
| `hpm_mcl/inc/hpm_smc.h` | ALG-07(无感观测器), CT-11(观测器设计), SDK-01-HPM-MC-Architecture.md |
| `hpm_mcl/inc/hpm_hfi.h` | ALG-09(高频注入), ALG-07(无感观测器), CT-11(观测器设计) |
| `hpm_mcl_v2/core/detect/hpm_mcl_detect.h` | ALG-13(保护优化), SDK-03-HPM-MC-v2-Detect.md, HW-06(电源保护) |
| `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h` | ALG-08(前沿研究), ADV-ALG-01(前馈解耦), SDK-04-HPM-MC-v2-Hybrid-Ctrl.md, CT-06(前馈控制) |
| `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` | ALG-06(MTPA弱磁), ALG-11(速度环转矩), ADV-ALG-13(弱磁), SDK-05-HPM-MC-v2-Path-Plan.md |
| `hpm_mcl/inc/hpm_foc.h` | ALG-01(FOC理论), ALG-05(有感FOC), ALG-01(Clarke/Park变换), ALG-04(死区补偿) |
| `hpm_mcl/inc/hpm_block.h` | ALG-05(有感FOC), MC-LIB-Six-Step.md |
| `hpm_mcl/inc/hpm_over_zero.h` | ALG-07(无感观测器), MC-LIB-Six-Step.md |
| `hpm_mcl/inc/hpm_motor_math.h` | ALG-01(Clarke/Park变换), ADV-ALG-09(标幺值定点) |
| `hpm_mcl/inc/hpm_bldc_define.h` | ALG-13(保护优化), ALG-05(电流采样), HW-01(电机本体) |
| `hpm_mcl_v2/hpm_mcl_physical.h` | HW-01(电机本体), HW-06(电源保护), SDK-03-HPM-MC-v2-Detect.md |
| `hpm_mcl_v2/hpm_mcl_math.h` | ADV-ALG-09(标幺值定点) |
| `hpm_mcl_v2/hpm_mcl_cfg.h` | ALG-13(保护优化), ALG-14(THD谐波), ALG-04(死区补偿) |
| `hpm_mcl_v2/core/sensor/hpm_mcl_encoder.h` | HW-03(位置传感器), ADV-HW-03(编码器测速), ALG-06(位置速度观测器) |
| `hpm_mcl_v2/core/sensor/hpm_mcl_analog.h` | HW-02(电流采样), ALG-05(电流采样时序), ADV-HW-02(ADC/DMA) |
| `hpm_mcl_v2/core/drivers/hpm_mcl_drivers.h` | HW-04(MCU外设), HW-05(功率器件), ADV-HW-01(PWM采样) |
| `hpm_mcl_v2/encoder/hpm_mcl_abz.h` | HW-03(位置传感器), ADV-HW-03(编码器测速) |
| `hpm_mcl_v2/encoder/hpm_mcl_uvw.h` | HW-03(位置传感器) |
| `hpm_mcl_v2/core/control/hpm_mcl_filter.h` | ADV-ALG-01(带宽设计), SYS-04(仿真到离散) |
| `hpm_mcl_v2/core/control/hpm_mcl_debug.h` | ADV-ALG-15(调试方法论), ALG-14(THD谐波) |
| `hpm_MC/samples/motor_ctrl/bldc_foc/` | ALG-05(有感FOC), SDK-02-HPM-MC-v2-Core-Loop.md, SDK-06-HPM-MC-Sample-Apps.md |
| `hpm_MC/samples/motor_ctrl/bldc_hfi/` | ALG-09(高频注入), SDK-06-HPM-MC-Sample-Apps.md |
| `hpm_MC/samples/motor_ctrl/bldc_smc/` | ALG-07(无感观测器), SDK-06-HPM-MC-Sample-Apps.md |
| `hpm_MC/samples/motor_ctrl/bldc_offline_param_detection/` | SDK-03-HPM-MC-v2-Detect.md, SDK-06-HPM-MC-Sample-Apps.md |

---

##  知识库文档 → hpm_MC 代码 映射表

| 知识库文档 | 关联 hpm_MC 源码 |
|----------|-----------------|
| ALG-01 FOC理论 | `hpm_mcl_v2/core/control/hpm_mcl_control.h`, `hpm_mcl/inc/hpm_foc.h` |
| ALG-05 有感FOC | `hpm_mcl_v2/core/loop/hpm_mcl_loop.h`, `hpm_mcl/inc/hpm_foc.h`, `hpm_mcl_v2/core/sensor/hpm_mcl_encoder.h` |
| ALG-07 无感观测器 | `hpm_mcl/inc/hpm_smc.h`, `hpm_mcl/inc/hpm_hfi.h`, `hpm_mcl/inc/hpm_over_zero.h` |
| ALG-09 高频注入 | `hpm_mcl/inc/hpm_hfi.h` |
| ALG-13 保护优化 | `hpm_mcl_v2/core/detect/hpm_mcl_detect.h`, `hpm_mcl_v2/hpm_mcl_cfg.h`, `hpm_mcl/inc/hpm_bldc_define.h` |
| ALG-15 前沿研究 | `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h`, `hpm_mcl_v2/core/detect/` |
| ALG-01 Clarke/Park | `hpm_mcl/inc/hpm_motor_math.h`, `hpm_mcl/inc/hpm_foc.h` |
| ALG-02 电流采样 | `hpm_mcl_v2/core/sensor/hpm_mcl_analog.h`, `hpm_mcl/inc/hpm_bldc_define.h` |
| ALG-10 过调制 | `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| ALG-03 PI调节器 | `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| ALG-06 位置速度观测器 | `hpm_mcl_v2/core/sensor/hpm_mcl_encoder.h`, `hpm_mcl_v2/encoder/hpm_mcl_abz.h` |
| ALG-11 MTPA弱磁 | `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` |
| ALG-14 THD谐波 | `hpm_mcl_v2/hpm_mcl_cfg.h`, `hpm_mcl_v2/core/control/hpm_mcl_debug.h` |
| ALG-04 死区补偿 | `hpm_mcl_v2/hpm_mcl_cfg.h`, `hpm_mcl/inc/hpm_foc.h` |
| ALG-08 初始位置检测 | `hpm_mcl_v2/core/loop/hpm_mcl_loop.h`, `hpm_mcl/inc/hpm_hfi.h` |
| ALG-12 速度环转矩 | `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h`, `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h` |
| HPM-MC-Architecture | `hpm_mcl_v2/*`, `hpm_mcl/*`（全量覆盖） |
| HPM-MC-v2-Core-Loop | `hpm_mcl_v2/core/loop/hpm_mcl_loop.h`, `hpm_mcl_v2/core/control/hpm_mcl_control.h`, `hpm_mcl_v2/core/sensor/*`, `hpm_mcl_v2/core/detect/*` |
| HPM-MC-v2-Detect | `hpm_mcl_v2/core/detect/hpm_mcl_detect.h`, `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| HPM-MC-v2-Hybrid-Ctrl | `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h`, `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` |
| HPM-MC-v2-Path-Plan | `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` |
| HPM-MC-Sample-Apps | `hpm_MC/samples/motor_ctrl/*/` |
| CT-04 PID控制 | `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| CT-05 PID整定 | `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| CT-06 前馈控制 | `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h` |
| CT-10 状态空间 | `hpm_mcl_v2/core/control/` |
| CT-11 观测器设计 | `hpm_mcl/inc/hpm_smc.h`, `hpm_mcl/inc/hpm_hfi.h` |
| CT-12 状态反馈 | `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` |
| CT-13 LQR/LQG | `hpm_mcl_v2/core/control/hpm_mcl_control.h`, `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h` |
| CT-14 三环级联PID | `hpm_mcl_v2/core/control/hpm_mcl_control.h`, `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` |
| CT-15 PID优化策略 | `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| CT-16 ADRC理论 | `hpm_mcl_v2/core/control/hpm_mcl_control.h`, `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h` |
| CT-17 LADRC线性化 | `hpm_mcl_v2/core/control/hpm_mcl_control.h`, `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h` |
| CT-18 ADRC/LADRC工程实现 | `hpm_mcl_v2/core/control/hpm_mcl_control.h`, `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h`, `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` |
| HW-01 电机本体 | `hpm_mcl_v2/hpm_mcl_physical.h`, `hpm_mcl/inc/hpm_bldc_define.h` |
| HW-02 电流采样 | `hpm_mcl_v2/core/sensor/hpm_mcl_analog.h` |
| HW-03 位置传感器 | `hpm_mcl_v2/core/sensor/hpm_mcl_encoder.h`, `hpm_mcl_v2/encoder/hpm_mcl_abz.h`, `hpm_mcl_v2/encoder/hpm_mcl_uvw.h` |
| HW-04 MCU外设 | `hpm_mcl_v2/core/drivers/hpm_mcl_drivers.h` |
| HW-05 功率器件 | `hpm_mcl_v2/core/drivers/hpm_mcl_drivers.h` |
| HW-06 电源保护 | `hpm_mcl_v2/core/detect/hpm_mcl_detect.h`, `hpm_mcl_v2/hpm_mcl_physical.h` |
| HW-07 热设计EMC | `hpm_mcl_v2/hpm_mcl_cfg.h` |
| ADV-ALG-01 带宽设计 | `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| ADV-ALG-13 MTPA弱磁 | `hpm_mcl_v2/core/control/hpm_mcl_path_plan.h` |
| ADV-ALG-07 前馈解耦 | `hpm_mcl_v2/core/control/hpm_mcl_hybrid_ctrl.h` |
| ADV-ALG-09 标幺值定点 | `hpm_mcl_v2/hpm_mcl_math.h`, `hpm_mcl/inc/hpm_motor_math.h` |
| ADV-ALG-13 PID整定 | `hpm_mcl_v2/core/control/hpm_mcl_control.h` |
| ADV-ALG-15 调试方法论 | `hpm_mcl_v2/core/control/hpm_mcl_debug.h` |
| ADV-HW-01 PWM采样 | `hpm_mcl_v2/core/drivers/hpm_mcl_drivers.h` |
| ADV-HW-02 ADC/DMA | `hpm_mcl_v2/core/sensor/hpm_mcl_analog.h` |
| ADV-HW-03 编码器测速 | `hpm_mcl_v2/core/sensor/hpm_mcl_encoder.h`, `hpm_mcl_v2/encoder/hpm_mcl_abz.h` |
| SYS-01~04 方法论 | `hpm_mcl_v2/core/*`（架构参考） |
| MC-LIB全系列 | 对比章节见各文档末尾「与hpm_MC对比」 |

---

##  HPM 官方知识库文章 → 知识库文档

| 官方文章 | URL | 关联文档 |
|---------|-----|---------|
| 先楫电机库简介 | kb.hpmicro.com/2025/01/03/ | SDK-01-HPM-MC-Architecture.md |
| 电机库使用入门 | kb.hpmicro.com/2024/06/25/ | ALG-01(FOC), ALG-05(有感FOC), SDK-06-HPM-MC-Sample-Apps.md |
| BLDC BLOCK 换相控制 | kb.hpmicro.com/2025/08/07/ | SDK-06-HPM-MC-Sample-Apps.md, ALG-05(有感FOC) |
| BLDC 过零控制技术 | kb.hpmicro.com/2025/09/23/ | ALG-07(无感观测器) |
| PID→3P-3Z 控制器 | kb.hpmicro.com/2024/10/16/ | SDK-02-HPM-MC-v2-Core-Loop.md, CT-04/05(PID) |
| 锁相环滤波器性能分析 | kb.hpmicro.com/2024/10/31/ | ALG-06(位置速度观测器) |
| 力位混合控制库使用指南 | kb.hpmicro.com/2025/12/29/ | SDK-04-HPM-MC-v2-Hybrid-Ctrl.md |
| 关节电机驱动电路图解 | kb.hpmicro.com/2026/03/20/ | HW-02(电流采样), HW-05(功率器件) |
| PLB实现滤波器 | kb.hpmicro.com/2024/12/27/ | HW-04(MCU外设) |
