---
date: 2026-08-01
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-00：FOC 理论基础索引"
tags:
  - motor-control
  - FOC
  - 索引
status: learning
summary: "难度"
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-00：FOC 理论基础索引

## 难度
★★☆☆☆

## 适用对象
所有 FOC 初学者与进阶者

## 前言
本系列共 11 个模块，覆盖从 PMSM 数学模型到 PWM 采样时序的完整 FOC 理论体系。建议按顺序学习（MC-01 → MC-11），每个模块配有 assessment 测验。

学完本系列后，可衔接：
- **运动控制实战系列**（MC-MC-01 ~ MC-06）— 位置环、前馈、谐振抑制
- **轨迹规划系列**（MC-TP-01 ~ MC-06）— S 曲线、插补、多轴协调
- **控制理论系列**（CT-01 ~ CT-16）— 频域设计、状态空间、鲁棒控制

---

## 学习路径

### 初学者路径
MC-01（建模）→ MC-02（变换）→ MC-03（SVPWM 基础）→ MC-04（信号链）→ MC-05（SVPWM 进阶）→ MC-06（电流环）→ MC-07（速度环）

### 进阶路径
MC-08（无感观测器）→ MC-09（凸极效应 / MTPA）→ MC-10（参数敏感性）→ MC-11（PWM 时序）

---

## 模块列表

| 编号 | 标题 | 难度 | 前置 | 核心问题 |
|------|------|------|------|----------|
| MC-01 | [PMSM 数学模型](MC-01-PMSM-Model.md) | ★★★ | 无 | PMSM 的 dq 模型和转矩方程 |
| MC-02 | [Clarke 与 Park 变换](MC-02-Clarke-Park.md) | ★★ | MC-01 | abc → αβ → dq 的数学工具 |
| MC-03 | [空间矢量概念](MC-03-Space-Vector.md) | ★★★ | MC-02 | 八个矢量如何合成任意电压 |
| MC-04 | [FOC 完整信号链路](MC-04-FOC-Signal-Chain.md) | ★★★ | MC-01~03 | 从 ADC 到 PWM 的端到端数据流 |
| MC-05 | [两电平 SVPWM](MC-05-SVPWM-2Level.md) | ★★★ | MC-03 | 扇区计算法与零序注入法实现 |
| MC-06 | [电流环设计与离散化](MC-06-Current-Loop.md) | ★★★ | MC-01, MC-04 | PI 参数设计与前馈解耦 |
| MC-07 | [速度环与位置环设计](MC-07-Speed-Position-Loop.md) | ★★★ | MC-06 | 三环串级控制架构 |
| MC-08 | [无感观测器理论](MC-08-Sensorless-Observers.md) | ★★★★ | MC-01, MC-06 | 滑模 / 反电动势 / 磁链观测器 |
| MC-09 | [IPMSM vs SPMSM](MC-09-IPMSM-vs-SPMSM.md) | ★★★ | MC-01 | 凸极效应、MTPA 与弱磁控制 |
| MC-10 | [参数敏感性](MC-10-Parameter-Sensitivity.md) | ★★★★ | MC-01, MC-06, MC-08 | Rs/Ld/Lq/ψpm/J 偏差的影响 |
| MC-11 | [PWM 与采样时序](MC-11-PWM-Sampling-Timing.md) | ★★★ | MC-05 | 单电阻重构、双更新、最小脉宽 |

---

## 测验文件

| 模块 | 测验文件 | 题数 |
|------|---------|------|
| MC-09 | [MC-09-assessment.md](MC-09-assessment.md) | 4 题 |
| MC-10 | [MC-10-assessment.md](MC-10-assessment.md) | 4 题 |
| MC-11 | [MC-11-assessment.md](MC-11-assessment.md) | 4 题 |

---

## 交叉引用

- [ALG-01 ~ ALG-11](../algorithm/README.md) — 算法实现系列
- [CT-01 ~ CT-16](../../foundations/control-theory/CT-01-Open-Loop-Closed-Loop.md) — 控制理论系列
- [MC-MC-01 ~ MC-MC-06](./MC-MC-01-Position-Loop.md) — 运动控制实战系列
- [MC-TP-01 ~ MC-TP-06](./MC-TP-01-Kinematics-Constraints.md) — 轨迹规划系列
