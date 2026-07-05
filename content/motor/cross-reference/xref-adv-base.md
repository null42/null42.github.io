---
date: 2026-06-06
section: 电机控制
chapter: cross-reference
chapterTitle: 交叉索引
chapterOrder: 10
category: 交叉索引
source: motor
visibility: public
title:  交叉引用：高级篇基础篇映射
tags:
  - motor-control
status: learning
summary: "> 来源：[交叉引用映射表](./cross-reference-map.md)"
navGroup: 入门与索引
navGroupOrder: 10
---

#  交叉引用：高级篇基础篇映射

> 来源：[交叉引用映射表](./cross-reference-map.md)

---

## 高级篇→基础篇映射

### ADV-HW-01 PWM深度配置与电流采样时序联动 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 中心对齐模式选择 | HW-04 MCU外设 | 从"怎么配"深化到"为什么必须这样配" | [HW-04](../hardware/HW-04-MCU-Peripherals.md#PWM生成与死区) |
| PWM模式0/1选择 | HW-04 MCU外设 | 从"寄存器配置"深化到"有效电平与极性的组合逻辑" | [HW-04](../hardware/HW-04-MCU-Peripherals.md#PWM生成与死区) |
| 单电阻采样移相 | ALG-05 有感FOC | 从"三相采样"深化到"单电阻移相时刻的精确控制" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流采样) |
| 死区补偿位置 | ALG-13 保护与优化 | 从"死区补偿原理"深化到"在控制链中的精确位置" | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#死区补偿) |
| PWM触发ADC时序 | HW-04 MCU外设 | 从"ADC基本配置"深化到"TRGO→ADC→中断的完整触发链" | [HW-04](../hardware/HW-04-MCU-Peripherals.md#ADC同步采样) |
| 载波比 | ALG-15 前沿研究 | 从"概念"深化到"载波比与控制性能的定量关系" | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#低载波比) |

### ADV-HW-02 ADC深度配置与DMA数据搬运 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 注入组vs规则组 | HW-04 MCU外设 | 从"ADC基本用法"深化到"注入组高优先级保证电流采样时序" | [HW-04](../hardware/HW-04-MCU-Peripherals.md#ADC同步采样) |
| 双ADC同步采样 | HW-02 电流采样 | 从"采样电路"深化到"双ADC同步消除相位误差" | [HW-02](../hardware/HW-02-Current-Sensing.md#采样方案) |
| DMA双缓冲 | HW-04 MCU外设 | 从"DMA基本配置"深化到"HT/TC中断实现零拷贝并行" | [HW-04](../hardware/HW-04-MCU-Peripherals.md#DMA配置) |
| PWM触发ADC | ADV-HW-01 PWM深度 | ADC触发时序与PWM配置的联动 | [ADV-HW-01](../advanced/hardware-algorithm-bridge/ADV-HW-01-PWM-Current-Sampling.md#PWM触发ADC) |
| 数据对齐与标幺值 | ADV-ALG-09 标幺值 | ADC原始值→有符号值→标幺值的完整转换链 | [ADV-ALG-09](../advanced/algorithm/ADV-ALG-09-Per-Unit-Fixed-Point.md#数据对齐) |

### ADV-HW-03 编码器深度处理与测速方法 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 多圈编码器处理 | HW-03 位置传感器 | 从"单圈接口"深化到"多圈计数与掉电保持" | [HW-03](../hardware/HW-03-Position-Sensor.md#编码器类型) |
| ABZ正交解码 | HW-03 位置传感器 | 从"接口协议"深化到"4倍频/滤波/最大频率限制" | [HW-03](../hardware/HW-03-Position-Sensor.md#ABZ接口) |
| 旋变解码 | HW-03 位置传感器 | 从"旋变原理"深化到"软件RDC(Type II PLL)实现" | [HW-03](../hardware/HW-03-Position-Sensor.md#旋变) |
| 霍尔角度平滑 | ALG-05 有感FOC | 从"霍尔换相"深化到"线性插值/PLL平滑算法" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#编码器接口) |
| 编码器校准对齐 | ALG-05 有感FOC | 从"角度偏移"深化到"直流对齐/高频注入对齐方法" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#角度校准) |
| 测速方法(M/T/PLL) | ALG-05 有感FOC | 从"简单差分"深化到"M/T法/PLL测速的精度对比" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#速度计算) |

### ADV-ALG-01 控制环带宽设计与滤波器工程 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 电流环带宽设计 | ALG-05 有感FOC | 从"PI参数公式"深化到"带宽驱动的系统设计方法" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#PI参数整定) |
| 速度环带宽设计 | ALG-05 有感FOC | 从"经验整定"深化到"对称最优法" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#速度环) |
| 滤波器设计 | ADV-HW-01 PWM深度 | 电流采样滤波与PWM时序的协调 | [ADV-HW-01](../advanced/hardware-algorithm-bridge/ADV-HW-01-PWM-Current-Sampling.md#PWM触发ADC) |
| Bode图分析 | ALG-01 FOC理论 | 从"开环/闭环概念"深化到"频域稳定性判据" | [ALG-01](../algorithm/ALG-01-FOC-Theory.md#控制结构) |

### ADV-ALG-05 弱磁控制与MTPA深度 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 电压椭圆与电流圆 | ALG-13 保护与优化 | 从"弱磁概念"深化到"电压/电流约束的几何分析" | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#弱磁控制) |
| MTPA轨迹推导 | ALG-13 保护与优化 | 从"MTPA概念"深化到"Lagrange乘子法完整推导" | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#MTPA) |
| 弱磁与MTPA协调 | ALG-13 保护与优化 | 从"独立介绍"深化到"全速域Id决策流程" | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#弱磁与MTPA) |
| 深度弱磁(过调制) | ADV-HW-01 PWM深度 | 过调制策略与PWM配置的关系 | [ADV-HW-01](../advanced/hardware-algorithm-bridge/ADV-HW-01-PWM-Current-Sampling.md#载波比) |
| 弱磁稳定性 | ADV-ALG-01 带宽设计 | 弱磁PI带宽与电流环带宽的协调 | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#电流环带宽) |

### ADV-ALG-07 前馈解耦与扰动补偿 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| dq交叉耦合 | ALG-05 有感FOC | 从"PI控制"深化到"前馈+反馈复合控制" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| 反电动势前馈 | ALG-01 FOC理论 | 从"电压方程"深化到"可测扰动的前馈补偿" | [ALG-01](../algorithm/ALG-01-FOC-Theory.md#数学模型) |
| 前馈位置 | ADV-ALG-13 PID结构 | 前馈加在PI输出后而非输入的数学证明 | [ADV-ALG-13](../advanced/algorithm/ADV-ALG-13-PID-Structure-Tuning.md#并联型PID) |
| 速度前馈 | ALG-05 有感FOC | 从"速度环PI"深化到"速度前馈+PI复合控制" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#速度环) |

### ADV-ALG-09 标幺值系统与定点数运算 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 标幺值基值选取 | ALG-15 前沿研究 | 从"浮点算法"深化到"标幺值系统设计" | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#离散化) |
| Q格式定点数 | ALG-15 前沿研究 | 从"连续域"深化到"资源受限平台的定点实现" | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#离散化) |
| CORDIC算法 | HW-04 MCU外设 | 从"软件计算"深化到"STM32G4硬件CORDIC加速" | [HW-04](../hardware/HW-04-MCU-Peripherals.md#计算加速) |
| 浮点转定点 | ADV-ALG-13 PID结构 | 定点PID实现与浮点PID的参数对应 | [ADV-ALG-13](../advanced/algorithm/ADV-ALG-13-PID-Structure-Tuning.md#PI整定) |

### ADV-ALG-13 PID结构选择与深度整定 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 串联vs并联PID | ALG-05 有感FOC | 从"PI控制器"深化到"PID结构选择与参数转换" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#PI参数整定) |
| 抗积分饱和 | ALG-05 有感FOC | 从"基本PI"深化到"Back-calculation+积分限幅" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| 零极点对消法 | ADV-ALG-01 带宽设计 | 从"带宽设计"深化到"PI参数的精确推导" | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#电流环带宽) |
| 对称最优法 | ADV-ALG-01 带宽设计 | 从"速度环带宽"深化到"对称最优法PI参数推导" | [ADV-ALG-01](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md#速度环带宽) |

### ADV-ALG-15 问题定位与调试方法论 → 基础篇关联

| 高级知识点 | 关联的基础模块 | 深化关系 | 引用链接 |
|-----------|-------------|---------|---------|
| 电流环问题定位 | ALG-05 有感FOC | 从"PI参数"深化到"振荡/稳态误差的系统性排查" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流环) |
| 角度问题定位 | ADV-HW-03 编码器 | 从"编码器接口"深化到"角度偏移/跳变的诊断方法" | [ADV-HW-03](../advanced/hardware-algorithm-bridge/ADV-HW-03-Encoder-Speed.md#编码器校准) |
| 采样问题定位 | ADV-HW-02 ADC/DMA | 从"ADC配置"深化到"偏置/增益/时序错误的排查" | [ADV-HW-02](../advanced/hardware-algorithm-bridge/ADV-HW-02-ADC-DMA.md#数据对齐) |
| PWM问题定位 | ADV-HW-01 PWM深度 | 从"PWM配置"深化到"死区效应/抖动/互补异常的诊断" | [ADV-HW-01](../advanced/hardware-algorithm-bridge/ADV-HW-01-PWM-Current-Sampling.md#死区补偿) |
| 系统性调试流程 | ALG-13 保护与优化 | 从"保护算法"深化到"六步法系统化调试方法论" | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#保护策略) |

### SYS-01~04 系统与方法论 → 基础篇关联

| 高级模块 | 关联的基础模块 | 深化关系 | 引用链接 |
|---------|-------------|---------|---------|
| SYS-01 设计模式 | ALG-05 有感FOC | 从"控制代码"深化到"可维护/可扩展的软件架构" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md) |
| SYS-02 变频器vs电控 | ALG-01 FOC理论 | 从"FOC算法"深化到"不同应用场景的算法选择" | [ALG-01](../algorithm/ALG-01-FOC-Theory.md) |
| SYS-03 PFC vs 电控 | ALG-05 有感FOC | 从"FOC双环"深化到"PFC/FOC双环结构的类比与迁移" | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md) |
| SYS-04 仿真到离散域 | ALG-15 前沿研究 | 从"离散化概念"深化到"完整的仿真→代码验证流程" | [ALG-15](../algorithm/ALG-15-Advanced-Research.md#离散化) |

---

## 高级篇交叉引用密度统计

| 模块 | 基础篇关联数 | 高级篇内部关联数 | 达标(≥2) |
|------|-----------|--------------|----------|
| ADV-HW-01 | 6 | 2 (→ADV-HW-02, →ADV-ALG-05) |  |
| ADV-HW-02 | 5 | 2 (→ADV-HW-01, →ADV-ALG-09) |  |
| ADV-HW-03 | 6 | 1 (→ADV-ALG-15) |  |
| ADV-ALG-01 | 4 | 3 (→ADV-ALG-05, →ADV-ALG-07, →ADV-ALG-13) |  |
| ADV-ALG-05 | 5 | 2 (→ADV-ALG-01, →ADV-HW-01) |  |
| ADV-ALG-07 | 4 | 2 (→ADV-ALG-13, →ADV-ALG-01) |  |
| ADV-ALG-09 | 4 | 2 (→ADV-ALG-13, →SYS-04) |  |
| ADV-ALG-13 | 4 | 3 (→ADV-ALG-01, →ADV-ALG-07, →ADV-ALG-09) |  |
| ADV-ALG-15 | 5 | 3 (→ADV-HW-01, →ADV-HW-02, →ADV-HW-03) |  |
| SYS-01 | 1 | 0 | (系统方法论类) |
| SYS-02 | 1 | 1 (→SYS-03) |  |
| SYS-03 | 1 | 1 (→SYS-02) |  |
| SYS-04 | 1 | 1 (→ADV-ALG-09) |  |

**所有高级篇模块均满足交叉引用要求（系统方法论类模块因其跨领域性质，基础篇关联数要求放宽）。**

### SYS-05 功能安全  基础模块

| SYS-05 章节 | 关联基础模块 | 关联内容 |
|------------|------------|---------|
| ASIL分级 | HW-06(电源管理与保护) | 保护等级与ASIL对应 |
| 安全状态设计 | ALG-15(保护优化) | 算法配合进入安全模式 |
| 看门狗冗余 | SYS-01(设计模式) | 任务调度与喂狗策略 |

### SYS-06 系统测试  基础模块

| SYS-06 章节 | 关联基础模块 | 关联内容 |
|------------|------------|---------|
| HIL测试 | SYS-04(仿真到离散) | HIL验证离散化效果 |
| EMC测试 | HW-02(电流采样) | EMC影响采样精度 |
| 型式试验 | HW-07(热设计) | 温升试验验证散热设计 |
| 故障注入 | SYS-05(功能安全) | 验证安全机制有效性 |

### SIM-05 数字孪生  基础模块

| SIM-05 章节 | 关联基础模块 | 关联内容 |
|------------|------------|---------|
| 参数辨识 | ALG-03(PI整定) | 辨识参数→PI自整定 |
| 模型验证 | SYS-04(仿真到离散) | 验证离散化模型准确性 |
| 在线自适应 | ALG-16(非线性观测器) | 在线参数更新→容错控制 |
| 仿真置信度 | SIM-00(C仿真) | 置信度评估方法 |
