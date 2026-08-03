---
date: 2026-06-02
section: 电机控制
chapter: cross-reference
chapterTitle: 交叉索引
chapterOrder: 10
category: 交叉索引
source: motor
visibility: public
title:  交叉引用：硬件基础电控映射
tags:
  - motor-control
status: learning
summary: "> 来源：[交叉引用映射表](./cross-reference-map.md)"
navGroup: 入门与索引
navGroupOrder: 10
---

#  交叉引用：硬件基础电控映射

> 来源：[交叉引用映射表](./cross-reference-map.md)

---

## 硬件基础→电控硬件/算法映射

### EE-04 MOSFET器件原理 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| MOS结构/沟道形成 | HW-05 功率器件 | 理解功率MOSFET的阈值电压、导通电阻物理来源 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#MOSFET选型) |
| 输出特性（截止/线性/饱和） | HW-05 功率器件 | 功率MOSFET工作在开关状态（截止线性），线性区导通电阻决定损耗 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#开关损耗) |
| 寄生电容Cgs/Cgd/Cds | HW-05 功率器件 | 米勒效应成因——Cgd充放电导致开关延迟 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#米勒效应) |
| 阈值电压Vth | HW-05 功率器件 | 栅极驱动电压必须远大于Vth才能完全导通 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#栅极驱动设计) |

### EE-06 IGBT器件原理 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| IGBT结构（MOSFET+BJT） | HW-05 功率器件 | MOSFET输入特性+BJT导通特性：电压控制、低饱和压降 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#IGBT选型) |
| 导通压降Vce(sat) | HW-05 功率器件 | IGBT导通压降(~1.5-2V)远大于MOSFET(~mV级)但电流密度高 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#导通损耗) |
| 关断拖尾电流 | HW-05 功率器件 | 少子存储导致关断拖尾→高频下损耗急剧增加 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#关断损耗) |
| MOSFET vs IGBT选型 | HW-05 功率器件 | 低压高频→MOSFET，高压大功率→IGBT | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#器件选型对比) |

### EE-08 三相逆变器原理 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 六开关三相桥拓扑 | HW-05 功率器件 | 逆变器拓扑是功率器件工作的直接场景 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#逆变器拓扑) |
| 八种开关状态 | ALG-05 有感FOC | SVPWM的八个基本矢量来源于八种开关组合 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#SVPWM) |
| 电压空间矢量 | ALG-01 FOC理论 | 六边形电压空间矢量→SVPWM调制策略的物理基础 | [ALG-01](../algorithm/ALG-01-FOC-Theory.md#SVPWM) |
| 死区插入 | ALG-13 保护与优化 | 上下管直通短路→死区时间必须匹配开关速度 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#死区补偿) |

### EE-09 H桥与电机驱动拓扑 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| H桥四象限运行 | HW-05 功率器件 | H桥→三相桥：从四个开关到六个开关的拓扑演化 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#逆变器拓扑) |
| PWM调速原理 | ALG-01 FOC理论 | 占空比→等效电压：PWM调压是SVPWM的基础概念 | [ALG-01](../algorithm/ALG-01-FOC-Theory.md#PWM调制) |
| 续流二极管 | HW-05 功率器件 | 体二极管续流：感性负载关断时电流不能突变 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#体二极管) |
| H桥死区插入 | ALG-13 保护与优化 | H桥直通→三相桥直通：死区保护的拓扑级来源 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#死区补偿) |

### EE-01 电阻电容电感基础 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 采样电阻选型(Rshunt) | HW-02 电流采样 | Rshunt决定电流分辨率与功耗权衡：大电阻=高精度+高发热 | [HW-02](../hardware/HW-02-Current-Sensing.md#采样电阻选型) |
| 直流母线电容(Cdc) | HW-06 电源管理 | 电容容量决定纹波抑制和瞬态响应能力 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#母线电容选型) |
| 电机绕组电感(Ld/Lq) | ALG-05 有感FOC | 电感直接决定电流环PI参数：Kp=L×ωc，Ki=R×ωc | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#PI参数整定) |
| LC谐振 | HW-07 热设计EMC | EMI滤波器LC谐振可能放大PWM谐波而非衰减 | [HW-07](../hardware/HW-07-Thermal-EMC-Design.md#EMI滤波) |
| 寄生电感(采样电阻引线) | HW-02 电流采样 | 引线电感×di/dt产生电压尖峰，叠加到采样信号上 | [HW-02](../hardware/HW-02-Current-Sensing.md#滤波器设计) |

### EE-02 二极管与整流 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 续流二极管 | HW-05 功率器件 | MOSFET体二极管+外部续流二极管：感性负载关断时电流不能突变 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#体二极管) |
| 三相整流桥 | HW-06 电源管理 | AC→DC变换：二极管整流是电机驱动直流母线的前级 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#整流电路) |
| 快恢复二极管(FRD) | HW-05 功率器件 | 高频PWM场景需要trr<100ns的快恢复管，普通整流管trr过大导致损耗 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#器件选型对比) |
| 肖特基二极管 | HW-06 电源管理 | 低压大电流场景：Vf≈0.3V vs 普通二极管0.7V，效率更高 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#辅助电源) |

### EE-03 BJT基础 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| BJT图腾柱 | EE-05 MOSFET栅极驱动 | 推挽输出级→图腾柱栅极驱动：NPN+PNP互补对提供大电流驱动 | [EE-05](../../foundations/power-electronics-basics/EE-05-MOSFET-Gate-Drive.md#3-直观理解) |
| BJT vs MOSFET特性 | HW-05 功率器件 | 电流驱动vs电压驱动、饱和压降vs导通电阻→功率器件选型基础 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#器件选型对比) |
| BJT(输入)→MOSFET(开关) | EE-06 IGBT原理 | IGBT=BJT导通特性+MOSFET输入特性=电压控制低饱和压降 | [EE-06](../../foundations/power-electronics-basics/EE-06-IGBT-Principles.md#2-问题引入) |
| 达林顿管 | HW-05 功率器件 | 高电流增益复合管：小基极电流控制大集电极电流 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#IGBT选型) |

### EE-05 MOSFET栅极驱动 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 栅极电阻Rg选择 | HW-05 功率器件 | Rg决定开关速度：小Rg→快开关→低损耗+高EMI；大Rg→慢开关→高损耗+低EMI | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#栅极驱动设计) |
| 死区时间 | ALG-13 保护与优化 | 死区>1μs→零电流钳位效应→转矩脉动；需软件死区补偿 | [ALG-13](../algorithm/ALG-13-Protection-Optimization.md#死区补偿) |
| 米勒钳位 | HW-05 功率器件 | 下管Cgd耦合导致栅极电压抬升→误触发导通→桥臂直通 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#米勒效应) |
| PWM信号路径 | HW-04 MCU外设 | MCU→栅极驱动IC：长线需RC滤波/终端匹配防反射误触发 | [HW-04](../hardware/HW-04-MCU-Peripherals.md#PWM生成与死区) |
| 隔离驱动 | HW-05 功率器件 | 高压(310V)场景需光耦/数字隔离器，低压(48V)可用非隔离驱动 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#栅极驱动设计) |

### EE-07 运算放大器 → 电控关联

| 硬件基础知识点 | 影响的电控模块 | 影响机制 | 引用链接 |
|-----------|-------------|---------|---------|
| 运放Vos(输入失调电压) | HW-02 电流采样 | Vos×增益=电流测量误差：LM358(Vos=2mV)→200mA误差；OPA333(Vos=10μV)→可忽略 | [HW-02](../hardware/HW-02-Current-Sensing.md#运放选型) |
| 差分放大器CMRR | HW-02 电流采样 | 共模抑制比决定共模电压(相电压)抑制能力→电流采样精度 | [HW-02](../hardware/HW-02-Current-Sensing.md#差分放大) |
| LPF截止频率设计 | ALG-05 有感FOC | fc太低→相位滞后→电流环带宽受限；fc太高→PWM噪声混叠 | [ALG-05](../algorithm/ALG-05-Sensored-FOC.md#电流采样) |
| 仪表放大器 | HW-03 位置传感器 | 编码器差分信号(A+/A-、B+/B-)需仪表放大器抑制共模噪声 | [HW-03](../hardware/HW-03-Position-Sensor.md#ABZ接口) |
| 轨到轨运放 | HW-02 电流采样 | 低压(3.3V)ADC需轨到轨运放才能充分利用ADC量程 | [HW-02](../hardware/HW-02-Current-Sensing.md#运放选型) |

---

##  功率变换→电控关联映射

### PP-04 PFC → HW-06 电源管理与保护

| 知识点 | 关联目标 | 关联机制 | 引用 |
|--------|---------|---------|------|
| PFC 升压拓扑 | HW-06 母线预充电 | PFC 升压电感=预充电限流电感的升级版 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#4-技术原理) |
| IEC 61000-3-2 谐波限值 | HW-06 输入EMI滤波 | >75W 必须PFC的法规依据 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#6-工程案例) |
| CCM 平均电流控制 | HW-06 母线电压控制 | PFC电压环与电机母线电压控制的相似性 | [HW-06](../hardware/HW-06-Power-Management-Protection.md#4-技术原理) |

### PP-07 功率变换→电控系统集成

| 知识点 | 关联目标 | 关联机制 | 引用 |
|--------|---------|---------|------|
| 辅助电源多路输出 | HW-06 电源管理 | Flyback多路输出→栅极驱动15V+MCU5V+传感器3.3V | [HW-06](../hardware/HW-06-Power-Management-Protection.md#3-直观理解) |
| 直流母线电容选型 | HW-05 功率器件 | 纹波电流额定值决定电容寿命 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#6-工程案例) |
| 制动斩波器 | HW-05 功率器件 | Rbrake=Vdc²/Pbrake_max 选型与IGBT匹配 | [HW-05](../hardware/HW-05-Power-Devices-Gate-Drivers.md#4-技术原理) |
| EMI 滤波器 | HW-07 热设计与EMC | 共模/差模噪声路径与抑制 | [HW-07](../hardware/HW-07-Thermal-EMC-Design.md#4-技术原理) |

---

## 交叉引用密度统计

| 模块 | 算法关联/硬件约束数量 | 达标(≥2) |
|------|---------------------|----------|
| EE-01 | 5个电控关联 |  |
| EE-02 | 4个电控关联 |  |
| EE-03 | 4个电控关联 |  |
| EE-04 | 4个电控关联 |  |
| EE-05 | 5个电控关联 |  |
| EE-06 | 4个电控关联 |  |
| EE-07 | 5个电控关联 |  |
| EE-08 | 4个电控关联 |  |
| EE-09 | 4个电控关联 |  |
| SDK-01 | 1个代码映射(架构类) |  |
| SDK-02 | 7个代码映射 |  |
| SDK-03 | 4个代码映射 |  |
| SDK-04 | 3个代码映射 |  |
| SDK-05 | 2个代码映射 |  |
| SDK-06 | 4个代码映射 |  |

**所有基础篇EE/SDK模块均满足"至少2个交叉引用"的要求。SDK分析类模块以代码映射为主要关联方式。**
