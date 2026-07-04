---
date: 2026-06-02
section: 电机控制
chapter: cross-reference
chapterTitle: 交叉索引
chapterOrder: 10
category: 交叉索引
source: motor
visibility: public
title:  交叉引用：控制理论↔算法映射
tags:
  - motor-control
status: learning
summary: "> 来源：[交叉引用映射表](./cross-reference-map.md)"
navGroup: 入门与索引
navGroupOrder: 10
---

#  交叉引用：控制理论↔算法映射

> 来源：[交叉引用映射表](./cross-reference-map.md)

---

## 控制理论→算法映射

### CT-03 频域分析与Bode图 → 算法关联

| 控制理论知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 增益裕度/相位裕度 | ADV-ALG-01 带宽设计 | 带宽设计的稳定性判据——相位裕度≥45° | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#稳定性判据) |
| 穿越频率ωc | ADV-ALG-01 带宽设计 | 电流环带宽=ωc，穿越频率决定闭环响应速度 | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#电流环带宽) |
| Bode图绘制与分析 | ADV-ALG-01 带宽设计 | PI+Bode图=带宽设计的核心工具链 | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#Bode图分析) |
| 一阶/二阶系统频域特性 | ADV-ALG-01 带宽设计 | Ls/R电气时间常数从Bode图直接读出 | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#系统辨识) |

### CT-04/05 PID控制 → 算法关联

| 控制理论知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| PI参数时域整定(Z-N法) | ADV-ALG-13 PID深度整定 | Z-N法提供PI参数初值，再在电机上微调 | [ADV-ALG-13](../advanced/algorithm/ADV-ALG-13-PID-Structure-Tuning.md#Z-N整定) |
| PI参数频域整定 | ADV-ALG-13 PID深度整定 | 零极点对消法：PI零点对消电机极点，精确推导Kp/Ki | [ADV-ALG-13](../advanced/algorithm/ADV-ALG-13-PID-Structure-Tuning.md#零极点对消) |
| 积分作用与稳态误差 | ALG-05 有感FOC | 电流环积分消除稳态静差→Id=Id_ref | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#PI参数整定) |
| 微分作用与噪声放大 | ADV-ALG-13 PID深度整定 | 电流环通常只用PI（D项放大噪声） | [ADV-ALG-13](../advanced/algorithm/ADV-ALG-13-PID-Structure-Tuning.md#D项取舍) |
| 抗积分饱和 | ALG-05 有感FOC | 电压饱和时积分不累积→Back-calculation法 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| 并联vs串联PID结构 | ADV-ALG-13 PID深度整定 | 电机控制中并联型PI最常用，参数物理意义明确 | [ADV-ALG-13](../advanced/algorithm/ADV-ALG-13-PID-Structure-Tuning.md#并联型PID) |

### CT-06 前馈控制 → 算法关联

| 控制理论知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 前馈+反馈复合控制 | ADV-ALG-07 前馈解耦 | dq交叉耦合前馈：ωLd*iq前馈到Vd，ωLq*id前馈到Vq | [ADV-ALG-07](../advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md#前馈解耦) |
| 扰动前馈补偿 | ADV-ALG-07 前馈解耦 | 反电动势前馈：ωψf前馈到Vq，减小速度突变时的电流波动 | [ADV-ALG-07](../advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md#反电动势前馈) |
| 2-DOF控制结构 | ADV-ALG-07 前馈解耦 | PI(反馈)+前馈(开环)=2自由度复合控制 | [ADV-ALG-07](../advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md#2-DOF结构) |
| 前馈不改变稳定性 | ADV-ALG-07 前馈解耦 | 前馈在闭环之外→不影响特征方程→不改变稳定性 | [ADV-ALG-07](../advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md#稳定性分析) |

### CT-11 状态观测器 → 算法关联

| 控制理论知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| Luenberger观测器 | ALG-07 无感观测器 | Luenberger观测器是SMO/EKF的理论基础 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#Luenberger观测器) |
| 极点配置 | ALG-07 无感观测器 | 观测器增益设计=极点配置→观测器带宽≥2×速度环带宽 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#增益设计) |
| Kalman滤波器 | ALG-07 无感观测器 | EKF处理电机非线性模型→在线估计角度、速度、参数 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#EKF观测器) |
| 可观测性 | ALG-07 无感观测器 | 零速/低速时反电动势不可观测→需要HFI辅助 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#零速问题) |
| 观测器收敛速度 | ALG-07 无感观测器 | 观测器动态必须快于控制环→但增益太高→噪声放大 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#收敛分析) |

### CT-14/CT-15 三环级联PID与优化 → 算法关联

| 控制理论知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 三环带宽分配10:3:1法则 | ALG-05 有感FOC | 电流环ωc≈1000~2000→速度环ωc≈100~300→位置环ωc≈30~100 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| 级联PID的bumpless transfer | ALG-05 有感FOC | 力矩/速度/位置三模式切换时积分状态初始化→无冲击切换 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#控制模式切换) |
| Anti-windup(back-calculation) | ALG-05 有感FOC | 电压饱和时积分不累积→$K_b=1/T_t$反算修正 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| 不完全微分+微分滤波 | ALG-12 速度环 | 速度环D项需低通滤波 $D(s)=K_d s/(1+\tau_f s)$ →抑制噪声 | [ALG-12](../algorithm/ALG-12-Speed-Loop-Torque-Observer.md#速度环PID) |
| 自适应PID增益调度 | ALG-05 有感FOC | 不同转速/负载段查表切换Kp/Ki→全工况优化 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#PI参数整定) |
| 前馈解耦(速度/加速度/重力) | ALG-05 有感FOC | 速度前馈注入速度环→加速度前馈注入电流环→重力补偿注入位置环 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#前馈解耦) |

### CT-16/CT-17/CT-18 ADRC/LADRC → 算法关联

| 控制理论知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| ESO扩张状态观测器 | ALG-05 有感FOC | 二阶LESO估计dq轴总扰动(反电动势+参数误差+死区)→扰动补偿 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| LESO带宽参数化(ωo) | ALG-05 有感FOC | β1=2ωo,β2=ωo²→观测器增益与采样频率协调设计 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#PI参数整定) |
| LADRC电流环(PD+补偿) | ALG-05 有感FOC | $u=(ωc(i_{ref}\!-\!z_1)-z_2)/b_0$ →比PI更强的参数鲁棒性 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| LADRC速度环(三阶LESO) | ALG-12 速度环 | 三阶LESO估计负载转矩→前馈补偿→负载突变转速跌落从15%降至4% | [ALG-12](../algorithm/ALG-12-Speed-Loop-Torque-Observer.md#负载转矩观测) |
| LADRC位置环(二阶LADRC) | ALG-05 有感FOC | 二阶LADRC单环替代位置+速度双PI环→减少整定参数 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#位置环) |
| fhan跟踪微分器 | ALG-12 速度环 | TD安排速度斜坡过渡过程→消除阶跃给定时的超调 | [ALG-12](../algorithm/ALG-12-Speed-Loop-Torque-Observer.md#速度斜坡) |
| LADRC vs PI频域对比 | ADV-ALG-01 带宽设计 | LADRC等效传函在低频段有更强的扰动抑制比 | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#频域分析) |
| PI→LADRC迁移路径 | ALG-05 有感FOC | 电流环→速度环→位置环三步渐进替换策略 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#控制策略) |
