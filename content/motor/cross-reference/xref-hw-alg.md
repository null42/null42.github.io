---
date: 2026-06-04
section: 电机控制
chapter: cross-reference
chapterTitle: 交叉索引
chapterOrder: 10
category: 交叉索引
source: motor
visibility: public
title:  交叉引用：硬件算法映射
tags:
  - motor-control
status: learning
summary: "> 来源：[交叉引用映射表](./cross-reference-map.md)"
navGroup: 入门与索引
navGroupOrder: 10
---

#  交叉引用：硬件算法映射

> 来源：[交叉引用映射表](./cross-reference-map.md)

---

## 硬件→算法映射

### HW-01 电机本体基础 → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 电感参数 $L_d, L_q$ | ALG-05 有感FOC | PI参数设计：$K_p = L_s \cdot \omega_{bw}$ | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#5-参数整定) |
| 电感参数 $L_d, L_q$ | ALG-09 高频注入 | 凸极率 $\xi = (L_q-L_d)/(L_d+L_q)$ 决定HFI可行性 | [ALG-09](../algorithm/ALG-09-High-Frequency-Injection.md#2-原理推导) |
| 磁链参数 $\psi_f$ | ALG-07 无感观测器 | 速度估算：$\omega_e = E/\psi_f$ | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#3-数学建模) |
| 电阻参数 $R_s$ | ALG-15 前沿研究 | 磁链积分漂移：$\psi = \int(u - R_s i)dt$ | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#6-硬件约束) |
| 极对数 $p$ | ALG-01 FOC理论 | Park变换角度：$\theta_e = p \cdot \theta_m$ | [ALG-01](../algorithm/ALG-01-FOC-Theory.md#2-原理推导) |

### HW-02 电流采样电路 → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 采样精度/量化误差 | ALG-07 无感观测器 | 观测器角度精度受限于电流采样精度 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#6-硬件约束) |
| 采样精度/量化误差 | ALG-15 前沿研究 | 磁链积分中 $R_s i$ 项误差累积 | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#6-硬件约束) |
| 采样噪声 | ALG-09 高频注入 | 高频电流信噪比受采样噪声限制 | [ALG-09](../algorithm/ALG-09-High-Frequency-Injection.md#6-硬件约束) |
| 采样延迟 | ALG-05 有感FOC | 电流环带宽受采样延迟限制 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#6-硬件约束) |

### HW-03 位置传感器接口 → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 角度精度 | ALG-05 有感FOC | Park变换精度直接影响Id/Iq解耦 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#6-硬件约束) |
| 角度延迟 | ALG-07 无感观测器 | 观测器PLL需要补偿传感器延迟 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#6-硬件约束) |
| 分辨率 | ALG-05 有感FOC | 低速性能受编码器分辨率限制 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#6-硬件约束) |

### HW-04 MCU外设与通信 → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| PWM死区 | ALG-13 保护与优化 | 死区补偿算法需匹配实际死区时间 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |
| ADC同步采样 | ALG-15 前沿研究 | ZOH离散化模型假设电压电流同步采样 | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#6-硬件约束) |
| 中断优先级 | ALG-05 有感FOC | 控制环路时序影响电流环性能 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#6-硬件约束) |
| PWM频率 | ALG-09 高频注入 | 注入频率受PWM频率限制 | [ALG-09](../algorithm/ALG-09-High-Frequency-Injection.md#6-硬件约束) |
| PWM频率 | ALG-15 前沿研究 | 载波比 $f_{ratio} = f_{PWM}/f_e$ | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#6-硬件约束) |

### HW-05 功率器件与栅极驱动 → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 死区时间 | ALG-09 高频注入 | 注入信号精度受死区影响 | [ALG-09](../algorithm/ALG-09-High-Frequency-Injection.md#6-硬件约束) |
| 死区时间 | ALG-13 保护与优化 | 死区补偿需匹配功率器件开关特性 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |
| 开关损耗 | ALG-07 无感观测器 | 反电动势观测精度受PWM频率限制 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#6-硬件约束) |
| 开关损耗 | ALG-15 前沿研究 | PWM频率受开关损耗限制→载波比受限 | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#6-硬件约束) |
| 管压降 | ALG-13 保护与优化 | 死区补偿需考虑管压降非线性 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |

### HW-06 电源管理与保护 → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 保护阈值 | ALG-13 保护与优化 | 软件保护策略需与硬件保护电路协同 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |
| 母线电压 | ALG-13 保护与优化 | 弱磁控制受母线电压限制 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |
| 过流保护电路 | ALG-13 保护与优化 | 比较器+刹车电路是软件保护的硬件后盾 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |

### HW-07 热设计与EMC → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 温升 | ALG-13 保护与优化 | 温度影响参数漂移→降额策略 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |
| EMI | ALG-07 无感观测器 | 采样噪声影响观测器精度 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md#6-硬件约束) |
| NTC安装位置 | ALG-13 保护与优化 | 热延迟导致温度保护滞后 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#6-硬件约束) |

---

## 算法→硬件映射

### ALG-01 FOC理论基础 → 硬件约束

| 算法知识点 | 依赖的硬件模块 | 约束来源 | 引用链接 |
|-----------|-------------|---------|---------|
| Clarke变换 | HW-01 电机本体 | 三相绕组结构决定变换矩阵 | [HW-01](../hardware/HW-01-Motor-Basics.md#技术原理) |
| Park变换 | HW-01 电机本体 | 极对数决定电角度/机械角度关系 | [HW-01](../hardware/HW-01-Motor-Basics.md#关键参数) |
| 转矩方程 | HW-01 电机本体 | 磁链参数决定转矩常数 | [HW-01](../hardware/HW-01-Motor-Basics.md#数学模型) |

### ALG-05 有感FOC实现 → 硬件约束

| 算法知识点 | 依赖的硬件模块 | 约束来源 | 引用链接 |
|-----------|-------------|---------|---------|
| PI参数设计 | HW-01 电机本体 | $K_p = L_s \cdot \omega_{bw}$，需准确电感 | [HW-01](../hardware/HW-01-Motor-Basics.md#参数测量方法) |
| SVPWM调制 | HW-05 功率器件 | 逆变器拓扑决定扇区划分 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#逆变器拓扑) |
| 电流采样 | HW-02 电流采样 | 采样电路设计影响电流环性能 | [HW-02](../hardware/HW-02-Current-Sensing.md#滤波器设计) |
| 编码器接口 | HW-03 位置传感器 | 角度精度影响Park变换 | [HW-03](../hardware/HW-03-Position-Sensor.md#角度校准) |
| 控制周期 | HW-04 MCU外设 | 中断优先级和DMA配置 | [HW-04](../hardware/HW-04-MCU-Peripherals.md#中断优先级) |

### ALG-07 无感FOC观测器 → 硬件约束

| 算法知识点 | 依赖的硬件模块 | 约束来源 | 引用链接 |
|-----------|-------------|---------|---------|
| 观测器精度 | HW-02 电流采样 | 采样精度决定观测器性能上限 | [HW-02](../hardware/HW-02-Current-Sensing.md#ADC精度分析) |
| 反电动势 | HW-05 功率器件 | PWM频率和死区影响电压重构 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#死区时间设计) |
| 磁链估计 | HW-01 电机本体 | 电阻参数准确性影响积分精度 | [HW-01](../hardware/HW-01-Motor-Basics.md#参数测量方法) |
| SMO抖振 | HW-04 MCU外设 | 开关频率限制抖振频率上限 | [HW-04](../hardware/HW-04-MCU-Peripherals.md#PWM生成与死区) |

### ALG-09 高频注入法 → 硬件约束

| 算法知识点 | 依赖的硬件模块 | 约束来源 | 引用链接 |
|-----------|-------------|---------|---------|
| 注入信号 | HW-05 功率器件 | 死区和管压降影响注入精度 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#死区时间设计) |
| 凸极效应 | HW-01 电机本体 | 电机结构决定凸极率 | [HW-01](../hardware/HW-01-Motor-Basics.md#关键参数) |
| 信噪比 | HW-02 电流采样 | 采样噪声限制位置估算精度 | [HW-02](../hardware/HW-02-Current-Sensing.md#滤波器设计) |
| 注入频率 | HW-04 MCU外设 | PWM频率限制注入频率上限 | [HW-04](../hardware/HW-04-MCU-Peripherals.md#PWM生成与死区) |

### ALG-13 保护与优化 → 硬件约束

| 算法知识点 | 依赖的硬件模块 | 约束来源 | 引用链接 |
|-----------|-------------|---------|---------|
| 死区补偿 | HW-05 功率器件 | 功率器件开关特性决定补偿参数 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#死区时间设计) |
| 弱磁控制 | HW-06 电源管理 | 母线电压限制弱磁范围 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#母线电容选型) |
| 保护算法 | HW-06 电源管理 | 软硬件保护需协同设计 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#过流保护电路) |
| 温度保护 | HW-07 热设计 | NTC安装位置和热延迟 | [HW-07](../hardware/HW-07-Thermal-EMC-Design.md#热阻计算) |

### ALG-15 前沿研究 → 硬件约束

| 算法知识点 | 依赖的硬件模块 | 约束来源 | 引用链接 |
|-----------|-------------|---------|---------|
| 载波比 | HW-05 功率器件 | PWM频率受开关损耗限制 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#开关损耗) |
| ADC同步 | HW-04 MCU外设 | 采样时序影响ZOH模型精度 | [HW-04](../hardware/HW-04-MCU-Peripherals.md#ADC同步采样) |
| 电流采样精度 | HW-02 电流采样 | 磁链积分精度受采样精度影响 | [HW-02](../hardware/HW-02-Current-Sensing.md#ADC精度分析) |
| 电阻参数 | HW-01 电机本体 | 低速精度依赖电阻准确性 | [HW-01](../hardware/HW-01-Motor-Basics.md#参数测量方法) |

---

## 交叉引用密度统计

| 模块 | 算法关联/硬件约束数量 | 达标(≥2) |
|------|---------------------|----------|
| HW-01 | 5个算法关联 |  |
| HW-02 | 4个算法关联 |  |
| HW-03 | 3个算法关联 |  |
| HW-04 | 5个算法关联 |  |
| HW-05 | 5个算法关联 |  |
| HW-06 | 3个算法关联 |  |
| HW-07 | 3个算法关联 |  |
| ALG-01 | 3个硬件约束 |  |
| ALG-05 | 5个硬件约束 |  |
| ALG-07 | 4个硬件约束 |  |
| ALG-09 | 4个硬件约束 |  |
| ALG-13 | 4个硬件约束 |  |
| ALG-15 | 4个硬件约束 |  |

**所有基础篇HW/ALG模块均满足"至少2个交叉引用"的要求。**

### HW-01B 电机学物理本质深入  算法模块

| HW-01B 章节 | 关联算法模块 | 关联内容 |
|------------|------------|---------|
| 电感饱和 | ALG-03(PI调节器) | Ld,Lq随Id,Iq变化→Kp需自适应 |
| 凸极效应 | ALG-11(MTPA) | Ld≠Lq→磁阻转矩→MTPA有效 |
| 齿槽转矩 | ALG-18(补偿算法) | 定位力矩→前馈补偿 |
| 交叉耦合 | ADV-ALG-07(前馈解耦) | d/q轴不独立→解耦前馈 |
| 温度漂移 | ALG-03(PI整定) | Rs,ψf随温度变化→参数补偿 |
