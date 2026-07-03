---
date: 2026-06-06
section: 电机控制
chapter: cross-reference
chapterTitle: 交叉索引
chapterOrder: 10
category: 交叉索引
source: motor
visibility: public
title: 🔗 交叉引用：新增模块映射
tags:
  - motor-control
status: learning
summary: "> 来源：[交叉引用映射表](./cross-reference-map.md)"
navGroup: 入门与索引
navGroupOrder: 10
---

# 🔗 交叉引用：新增模块映射

> 来源：[交叉引用映射表](./cross-reference-map.md)

---

## HW-02B 电流采样拓扑 → 算法关联

| 硬件知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 单电阻采样盲区 | ALG-02 电流采样时序 | SVPWM移相时刻受扇区和占空比约束 | [ALG-02](../algorithm/ALG-02-Current-Sampling-Timing.md) |
| 低侧采样PWM约束 | ALG-05 有感FOC | 占空比>95%时采样窗口不足→电流环性能下降 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md) |
| 放大倍数与ADC精度 | ADV-HW-01 PWM深度 | 增益选择影响信噪比→影响电流环带宽上限 | [ADV-HW-01](../advanced/hardware-algorithm-bridge/ADV-HW-01-PWM-Current-Sampling.md) |

### ALG-17 V/F → 硬件/算法关联

| 算法知识点 | 依赖的硬件/算法模块 | 关联机制 | 引用链接 |
|-----------|-------------|---------|---------|
| V/f恒压频比 | ALG-01 FOC理论 | V/F是FOC的简化版，不进行dq解耦 | [ALG-01](../algorithm/ALG-01-FOC-Theory.md) |
| 弱磁区运行 | ALG-11 MTPA弱磁 | V/F弱磁是自然进入（电压饱和），FOC弱磁是主动控制 | [ALG-11](../algorithm/ALG-11-MTPA-Flux-Weakening.md) |
| V/F→FOC切换 | ALG-05 有感FOC | 开环V/F启动后切换到闭环FOC的无扰动策略 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md) |

### ALG-18 补偿算法 → 关联映射

| 算法知识点 | 关联模块 | 关联机制 | 引用链接 |
|-----------|---------|---------|---------|
| 死区补偿深化 | ALG-04 死区补偿 | ALG-04讲原理，ALG-18讲工程深化 | [ALG-04](../algorithm/ALG-04-Deadtime-Compensation.md) |
| 抗齿槽转矩 | ALG-14 THD谐波 | 齿槽转矩是低频谐波的主要来源 | [ALG-14](../algorithm/ALG-14-THD-Harmonic-Analysis.md) |
| 角度延迟补偿 | ALG-06 位置速度观测器 | 角度预测是观测器的延伸 | [ALG-06](../algorithm/ALG-06-Position-Speed-Observer.md) |
| 转速纹波补偿 | ALG-12 速度环 | 纹波补偿改善速度环稳态性能 | [ALG-12](../algorithm/ALG-12-Speed-Loop-Torque-Observer.md) |

### ALG-19 无差拍 → 关联映射

| 算法知识点 | 关联模块 | 关联机制 | 引用链接 |
|-----------|---------|---------|---------|
| 无差拍vs PI | ALG-03 PI电流调节器 | 无差拍是PI的替代方案，带宽更高但鲁棒性更弱 | [ALG-03](../algorithm/ALG-03-PI-Current-Regulator.md) |
| 与MPC的关系 | CT-19 MPC | 无差拍是MPC的特例（代价函数仅含跟踪误差） | [CT-19](../control-theory/CT-19-Model-Predictive-Control.md) |
| 一拍延迟补偿 | ALG-18 角度延迟补偿 | 电流预测+角度预测联合补偿 | [ALG-18](../algorithm/ALG-18-Compensation-Algorithms.md) |

### CT-19 MPC → 关联映射

| 控制理论知识点 | 影响的算法模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| FCS-MPC代价函数 | ALG-03 PI电流调节器 | MPC是PI的替代方案，带宽更高但计算量更大 | [ALG-03](../algorithm/ALG-03-PI-Current-Regulator.md) |
| MPC-TC | ALG-01 FOC理论 | MPC-TC类似DTC但有预测优化 | [ALG-01](../algorithm/ALG-01-FOC-Theory.md) |
| 模型参数敏感性 | CT-04 PID控制 | MPC对模型精度要求远高于PI | [CT-04](../control-theory/CT-04-PID-Control-Principles.md) |

### PMI-01~03 → 关联映射

| PFC知识点 | 关联模块 | 关联机制 | 引用链接 |
|-----------|---------|---------|---------|
| PFC Boost拓扑 | PP-04 PFC | PMI讲PFC+电机集成，PP-04讲PFC本身 | [PP-04](../power-path/PP-04-PFC-Power-Factor-Correction.md) |
| 母线电容设计 | HW-06 电源管理 | PFC纹波+逆变器纹波的矢量叠加 | [HW-06](../hardware/HW-06-Power-Management-Protection.md) |
| AFE有源前端 | ALG-13 保护优化 | 制动能量回馈→母线泵升→保护策略 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md) |

### COM-08 AUTOSAR → 关联映射

| AUTOSAR知识点 | 关联模块 | 关联机制 | 引用链接 |
|-----------|---------|---------|---------|
| MCAL PWM配置 | HW-04 MCU外设 | AUTOSAR MCAL是对MCU外设的标准化抽象 | [HW-04](../hardware/HW-04-MCU-Peripherals.md) |
| COM通信栈 | COM-01 CAN基础 | AUTOSAR CanIf/PduR是对CAN协议的标准化封装 | [COM-01](../communication/COM-01-CAN-Basics.md) |
| 功能安全ASIL | HW-06 电源保护 | ASIL-D要求冗余电流采样和监控 | [HW-06](../hardware/HW-06-Power-Management-Protection.md) |

### COM-09 PHY → 关联映射

| PHY知识点 | 关联模块 | 关联机制 | 引用链接 |
|-----------|---------|---------|---------|
| CAN收发器 | COM-01 CAN基础 | PHY是CAN协议的物理基础 | [COM-01](../communication/COM-01-CAN-Basics.md) |
| EtherCAT ESC | COM-06 EtherCAT | ESC是EtherCAT协议的硬件实现 | [COM-06](../communication/COM-06-EtherCAT.md) |
| 隔离技术 | HW-07 热设计EMC | 隔离是EMC设计的重要组成部分 | [HW-07](../hardware/HW-07-Thermal-EMC-Design.md) |

### ALG-20 控制视角下方程用途 → 关联映射

| 算法知识点 | 关联模块 | 关联机制 | 引用链接 |
|-----------|---------|---------|---------|
| 电压方程 | ALG-03 PI电流调节器 | 电压方程是PI参数计算的物理基础 | [ALG-03](../algorithm/ALG-03-PI-Current-Regulator.md) |
| 磁链方程 | ALG-01 FOC理论 | 磁链方程定义了dq轴解耦的数学基础 | [ALG-01](../algorithm/ALG-01-FOC-Theory.md) |
| 转矩方程 | HW-01 电机本体 | 转矩方程连接了电机参数与控制性能 | [HW-01](../hardware/HW-01-Motor-Basics.md) |

### ALG-21 参数辨识 → 关联映射

| 算法知识点 | 关联模块 | 关联机制 | 引用链接 |
|-----------|---------|---------|---------|
| 电阻辨识 | ALG-03 PI电流调节器 | R影响PI比例增益Kp的计算 | [ALG-03](../algorithm/ALG-03-PI-Current-Regulator.md) |
| 电感辨识 | ALG-03 PI电流调节器 | L影响PI积分时间常数Ti的计算 | [ALG-03](../algorithm/ALG-03-PI-Current-Regulator.md) |
| 磁链辨识 | ALG-07 无感观测器 | 磁链参数是反EMF观测器的核心输入 | [ALG-07](../algorithm/ALG-07-Sensorless-Observers.md) |
| 惯量辨识 | ALG-12 速度环 | J影响速度环PI参数设计 | [ALG-12](../algorithm/ALG-12-Speed-Loop-Torque-Observer.md) |
| 离线检测 | SDK-03 HPM-MC检测 | HPM-MC的离线参数检测是辨识的工程实现 | [SDK-03](../algorithm/HPM-MC/SDK-03-HPM-MC-v2-Detect.md) |

### 新增文档交叉引用密度统计

| 模块 | 关联数量 | 达标(≥2) |
|------|---------|----------|
| HW-02B | 3 | ✅ |
| ALG-17 | 3 | ✅ |
| ALG-18 | 4 | ✅ |
| ALG-19 | 3 | ✅ |
| CT-19 | 3 | ✅ |
| PMI-01 | 1+2(PMI-02/03) | ✅ |
| PMI-02 | 2 | ✅ |
| PMI-03 | 2 | ✅ |
| COM-08 | 3 | ✅ |
| COM-09 | 3 | ✅ |
| ALG-20 | 3 | ✅ |
| ALG-21 | 5 | ✅ |
