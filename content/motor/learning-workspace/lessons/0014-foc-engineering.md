---
title: FOC实战课程 PRACTICE-11
date: 2026-07-02
section: 电机控制
chapter: learning-workspace
chapterTitle: 学习工作区
category: 学习工作区
tags:
  - imported
source: motor
sourcePath: learning-workspace/lessons/0014-foc-engineering.html
status: learning
visibility: public
summary: Imported from learning-workspace/lessons/0014-foc-engineering.html
chapterOrder: 5
navGroup: 入门与索引
navGroupOrder: 10
---

返回知识库
PRACTICE-11 FOC实战课程
0/6

实战站点
S1FOC课程概述
S2电机原理与硬件
S3电流环PI设计
S4低通滤波器设计
S5FOC整合与SVPWM
S6PLL观测器与速度环

# FOC实战课程 PRACTICE-11

从理论到实践的完整FOC学习路线。6个实战站点覆盖电机原理、电流环设计、滤波器、SVPWM调制、角度观测与速度环，基于ODrive v3.6硬件平台，结合Simulink仿真验证。

6 个站点12 道练习实战级预计 12-16 小时

站1

## FOC课程概述

核心概念&#9660;

#### FOC框架总览

磁场定向控制(FOC)的核心思想：通过Clarke/Park变换将三相交流量变换到旋转dq坐标系，使交流电机可像直流电机一样独立控制磁通(Id)和转矩(Iq)。框架包含：坐标变换 &rarr; PI调节 &rarr; 反变换 &rarr; SVPWM调制 &rarr; 逆变器 &rarr; 电机。

#### 学习路线

**阶段1 - 基础：**电机数学模型、硬件平台熟悉。**阶段2 - 核心算法：**电流环PI设计、低通滤波器、SVPWM。**阶段3 - 观测与闭环：**PLL角度观测器、速度环整定。**阶段4 - 系统集成：**完整FOC链路调试、参数优化、实机验证。

#### 核心目标

本课程的核心目标是让学习者**从零开始搭建完整可运行的FOC系统**。不是简单调库，而是理解每个环节的数学原理、设计依据和调试方法，具备独立设计和排查FOC系统的能力。

#### 前置知识

需要掌握：复数与相量法、拉普拉斯变换与传递函数、PID控制基础、三相电路、C语言编程。建议先完成KB-01~03硬件基础和KB-04控制理论模块。

学习方法：每个站点遵循"理论推导 &rarr; 仿真验证 &rarr; 实机实现"三步法。理论推导建立理解，仿真验证确认正确性，实机实现检验工程可行性。切忌跳过仿真直接上实机。

练习题 (2)&#9660;

简单FOC实战课程的核心目标是什么？查看参考参考解答

FOC实战课程的核心目标是**从零开始搭建完整可运行的FOC系统**，具体包括：

1. **深度理解：**不是简单调库或套公式，而是理解FOC每个环节的数学原理和物理含义——为什么用Park变换？PI参数怎么推导？SVPWM扇区判断的依据是什么？

2. **独立设计能力：**给定电机参数，能独立计算PI参数、设计观测器带宽、选择滤波器截止频率，而非依赖经验值。

3. **系统调试能力：**遇到电流环振荡、角度跳变、低速抖动等问题，能系统性地定位和解决，而非盲目调参。

4. **工程实现能力：**将仿真验证过的算法转化为嵌入式C代码，处理采样时序、中断同步、数值溢出等工程问题。

自评：掌握部分未掌握
中等FOC控制中为什么需要Park变换？直接在abc坐标系控制有什么问题？查看参考参考解答

**直接在abc坐标系控制的问题：**

1. **时变信号：**abc坐标系中电流为正弦交流量（频率=电角频率$\omega_e$），PI调节器对交流信号的稳态误差不为零（存在频率跟踪误差），无法实现无静差控制。

2. **耦合严重：**三相电流通过中性点耦合，改变一相会影响其他两相，无法独立控制。

3. **控制复杂：**需要三个独立的交流控制器，且需处理相位同步问题。

**Park变换的作用：**

1. **直流化：**将旋转的abc正弦量变换到以$\omega_e$同步旋转的dq坐标系，稳态时dq电流为直流量，PI调节器可实现无静差控制。

2. **解耦：**Id控制磁场（励磁），Iq控制转矩，两者独立调节互不干扰。

3. **简化控制：**从三个交流控制器简化为两个直流控制器（Id环和Iq环），设计方法和直流电机完全一致。

这是FOC相对于标量控制(V/f)的根本优势。

自评：掌握部分未掌握

完成所有练习后标记为已学习标记为已学习

站2

## 电机原理与硬件平台

核心概念&#9660;

#### PMSM数学模型

dq坐标系下PMSM电压方程：$V_d = R_s I_d + L_d \frac{dI_d}{dt} - \omega_e L_q I_q$，$V_q = R_s I_q + L_q \frac{dI_q}{dt} + \omega_e L_d I_d + \omega_e \psi_m$。转矩方程：$T_e = \frac{3}{2}p[\psi_m I_q + (L_d - L_q)I_d I_q]$。表贴式$L_d = L_q$，转矩仅与$I_q$成正比。

#### ODrive v3.6硬件

ODrive v3.6是开源电机控制器，采用STM32F405为主控，集成三相逆变器（MOSFET），支持编码器/Hall输入。关键参数：母线电压24~48V，峰值电流40A，PWM频率8~24kHz，12位ADC电流采样，支持ABZ编码器（8192 CPR）。

#### 电流采样方案

ODrive采用**低侧采样**方案：三个分流电阻分别串联在三个下桥臂MOSFET源极到地之间。采样时刻在下桥臂导通期间（PWM中心对齐模式的谷底）。优势：共模电压低，运放要求低；劣势：只能在下管导通时采样，占空比接近100%时采样窗口不足。

#### 编码器接口

ODrive支持增量式编码器（A/B/Z信号）和绝对值编码器（SPI/SSI）。增量编码器通过STM32定时器编码器模式硬件计数，分辨率取决于编码器线数。8192 CPR编码器对应0.044度机械角度精度（7极对电机=0.006度电角度）。

硬件关键参数：STM32F405 (168MHz, Cortex-M4F with FPU), 三相MOSFET (40V/5m&Omega;), 12-bit ADC (1Msps), 编码器接口 (8192CPR), 电流采样增益20V/V, 分流电阻0.5m&Omega;。

&#120791;关键公式&#9660;

$$V_d = R_s I_d + L_d \frac{dI_d}{dt} - \omega_e L_q I_q$$PMSM d轴电压方程。交叉耦合项$-\omega_e L_q I_q$需在控制中补偿（前馈解耦）。
$$V_q = R_s I_q + L_q \frac{dI_q}{dt} + \omega_e L_d I_d + \omega_e \psi_m$$PMSM q轴电压方程。反电动势$\omega_e \psi_m$随转速增大，高速时消耗大部分可用电压。
$$T_e = \frac{3}{2}p\left[\psi_m I_q + (L_d - L_q)I_d I_q\right]$$电磁转矩。表贴式PMSM($L_d=L_q$)简化为$T_e = \frac{3}{2}p\psi_m I_q$，转矩与Iq线性正比。

练习题 (2)&#9660;

简单ODrive v3.6的关键硬件参数有哪些？查看参考参考解答

**ODrive v3.6关键硬件参数：**

1. **主控：**STM32F405RGT6，168MHz Cortex-M4F内核，带硬件浮点单元(FPU)，256KB RAM，1MB Flash。

2. **功率级：**三相半桥，MOSFET (40V/5m&Omega;)，母线电压24~48V，峰值电流40A（持续约20A）。

3. **电流采样：**低侧三电阻采样，分流电阻0.5m&Omega;，运放增益20V/V，12位ADC (1Msps)，电流分辨率约0.1A。

4. **编码器接口：**支持增量式ABZ编码器（最高8192CPR），绝对值编码器（SPI），Hall传感器。

5. **PWM频率：**可配置8~24kHz，默认16kHz，中心对齐模式。

6. **通信：**USB、UART、CAN总线，支持Python上位机控制。

自评：掌握部分未掌握
中等PMSM dq轴电压方程中的交叉耦合项如何影响控制？如何补偿？查看参考参考解答

**交叉耦合项的影响：**

1. d轴方程中的$-\omega_e L_q I_q$：Iq变化时会在d轴产生扰动电压，导致Id波动，破坏dq解耦。

2. q轴方程中的$\omega_e L_d I_d$：Id变化时会在q轴产生扰动电压，导致Iq波动，影响转矩控制精度。

3. 耦合强度与转速$\omega_e$成正比，低速时可忽略，高速时严重影响。

**补偿方法 - 前馈解耦：**

在PI调节器输出上叠加交叉耦合补偿项：

$$V_d^{comp} = V_d^{PI} - \omega_e L_q I_q$$

$$V_q^{comp} = V_q^{PI} + \omega_e L_d I_d + \omega_e \psi_m$$

其中$V_d^{PI}$和$V_q^{PI}$为PI调节器输出，补偿项使用当前Iq/Id反馈值和估计的$\omega_e$计算。补偿后PI调节器只需处理Rs压降和电感动态，dq轴实现真正解耦。

**注意事项：**补偿精度取决于$L_d, L_q, \psi_m$参数的准确性和$\omega_e$的估计精度。参数误差导致补偿残余耦合。

自评：掌握部分未掌握

完成所有练习后标记为已学习标记为已学习

站3

## 电流环PI设计与仿真

核心概念&#9660;

#### PI参数理论推导

电流环被控对象为一阶惯性环节：$G_p(s) = \frac{1}{L_s s + R_s}$。采用PI控制器$G_c(s) = K_p + \frac{K_i}{s}$，选择零极点对消（$K_i/K_p = R_s/L_s$），闭环传递函数为典型一阶：$\frac{K_p/(L_s)}{s + K_p/(L_s)}$，带宽$\omega_c = K_p/L_s$。

#### Kp与Ki计算

由零极点对消得：$K_p = L_s \cdot \omega_c$，$K_i = R_s \cdot \omega_c$。其中$\omega_c$为期望的电流环带宽。典型取$\omega_c = \frac{1}{5} \cdot 2\pi f_{PWM}$（PWM频率的1/5），即$f_{PWM}=10$kHz时$\omega_c \approx 12566$ rad/s，$f_c \approx 2$kHz。

#### 一拍延迟分析

实际系统中存在计算延迟和PWM更新延迟，等效为一拍延迟$e^{-sT_s}$。延迟使相位裕度降低：$\Delta\gamma = -\omega_c T_s \times 57.3^\circ$。$\omega_c = 2\pi \times 2000$ rad/s，$T_s = 100\mu$s时，$\Delta\gamma \approx -72^\circ$，可能导致不稳定。

#### Simulink验证

在Simulink中搭建电流环模型：PI控制器 + 一拍延迟 + PMSM电气模型。验证内容：(1)阶跃响应超调  45度。若不满足，降低$\omega_c$或加入延迟补偿。

带宽限制：一拍延迟对电流环带宽的限制：$\omega_c \leq \frac{\pi/4}{T_s}$（保证45度相位裕度）。$T_s=100\mu$s时$\omega_c \leq 7854$ rad/s（$f_c \leq 1.25$kHz）。实际设计中带宽通常取PWM频率的1/10~1/5。

&#120791;关键公式&#9660;

$$K_p = L_s \cdot \omega_c$$电流环比例增益。$L_s=5$mH, $\omega_c=10000$rad/s时$K_p=0.05$。电感越大或带宽越高，Kp越大。
$$K_i = R_s \cdot \omega_c$$电流环积分增益。$R_s=0.5\Omega$, $\omega_c=10000$rad/s时$K_i=5000$。零极点对消条件：$K_i/K_p = R_s/L_s$。
$$\Delta\gamma = -\omega_c T_s \times 57.3^\circ$$一拍延迟导致的相位裕度损失。$\omega_c=12566$rad/s, $T_s=100\mu$s时$\Delta\gamma=-72^\circ$，严重影响稳定性。
$$\omega_{c,max} = \frac{\gamma_{req}/57.3}{T_s}$$给定相位裕度要求下的最大带宽。要求$\gamma=45^\circ$时，$\omega_{c,max}=7854$rad/s ($f_c=1.25$kHz)。

练习题 (2)&#9660;

中等推导电流环PI参数公式$K_p = L_s \cdot \omega_c$和$K_i = R_s \cdot \omega_c$，说明零极点对消的条件。查看参考参考解答

**推导过程：**

1. 被控对象（以q轴为例，忽略交叉耦合）：$$G_p(s) = \frac{I_q(s)}{V_q(s)} = \frac{1}{L_s s + R_s}$$

2. PI控制器：$$G_c(s) = K_p + \frac{K_i}{s} = \frac{K_p s + K_i}{s} = K_p \cdot \frac{s + K_i/K_p}{s}$$

3. 开环传递函数：$$G_{ol}(s) = G_c(s) \cdot G_p(s) = K_p \cdot \frac{s + K_i/K_p}{s} \cdot \frac{1}{L_s s + R_s}$$

4. **零极点对消条件：**令PI零点对消被控对象极点：$$\frac{K_i}{K_p} = \frac{R_s}{L_s}$$

5. 对消后开环简化为：$$G_{ol}(s) = \frac{K_p}{L_s} \cdot \frac{1}{s}$$

6. 闭环传递函数：$$G_{cl}(s) = \frac{G_{ol}}{1+G_{ol}} = \frac{K_p/L_s}{s + K_p/L_s}$$

7. 这是一个带宽为$\omega_c = K_p/L_s$的一阶系统，因此：$$K_p = L_s \cdot \omega_c, \quad K_i = R_s \cdot \omega_c$$

**零极点对消条件：**$K_i/K_p = R_s/L_s$，即PI零点频率等于电机电气极点频率$1/\tau_e$。

自评：掌握部分未掌握
困难一拍延迟如何限制电流环带宽？给定$T_s = 100\mu$s，要求相位裕度$\geq 45^\circ$，最大带宽是多少？查看参考参考解答

**一拍延迟的影响：**

延迟环节$e^{-sT_s}$在截止频率$\omega_c$处引入的相位滞后为：$$\phi_{delay} = -\omega_c T_s \text{ (rad)} = -\omega_c T_s \times 57.3^\circ$$

零极点对消后，无延迟时开环为积分环节$\frac{\omega_c}{s}$，穿越频率处相位为$-90^\circ$，相位裕度$90^\circ$。

加入一拍延迟后，相位裕度降为：$$\gamma = 90^\circ - \omega_c T_s \times 57.3^\circ$$

**最大带宽计算：**

要求$\gamma \geq 45^\circ$：$$90^\circ - \omega_c T_s \times 57.3^\circ \geq 45^\circ$$

$$\omega_c T_s \leq \frac{45}{57.3} = 0.785 \text{ rad}$$

$$\omega_c \leq \frac{0.785}{T_s} = \frac{0.785}{100 \times 10^{-6}} = 7854 \text{ rad/s}$$

对应$f_c = \omega_c/(2\pi) = 1250$ Hz。

**结论：**$T_s=100\mu$s时，电流环带宽不超过1.25kHz。若需更高带宽，需缩短控制周期（提高PWM频率）或采用预测控制补偿延迟。

自评：掌握部分未掌握

完成所有练习后标记为已学习标记为已学习

站4

## 低通滤波器设计

核心概念&#9660;

#### 一阶LPF原理

一阶低通滤波器传递函数：$G_{LPF}(s) = \frac{\omega_f}{s + \omega_f}$，$\omega_f = 2\pi f_c$为截止角频率。截止频率处增益-3dB（0.707倍），相位滞后45度。高于$f_c$的频率以-20dB/dec衰减。

#### LPF在FOC中的应用

电流采样信号含PWM开关频率纹波和高频噪声，需LPF滤除后再送入PI调节器。此外，速度估计信号也需LPF平滑。滤波器截止频率需在**信号带宽**和**噪声抑制**间权衡：$f_c$过高噪声抑制不足，$f_c$过低信号相位延迟大。

#### 截止频率选择

电流采样LPF：$f_c = (0.5 \sim 1.0) \times f_{current\_loop}$，即电流环带宽的0.5~1倍。典型值1~2kHz。速度估计LPF：$f_c = (0.1 \sim 0.3) \times f_{speed\_loop}$，典型值50~200Hz。原则：LPF带宽 &ge; 控制环带宽，但远小于开关频率。

#### 数字实现

一阶LPF的离散化（双线性变换）：$$y_k = \alpha \cdot x_k + (1-\alpha) \cdot y_{k-1}$$其中$\alpha = \frac{T_s}{T_s + 1/\omega_f} = \frac{\omega_f T_s}{1 + \omega_f T_s}$。$\omega_f T_s \ll 1$时$\alpha \approx \omega_f T_s$。

设计权衡：LPF截止频率的选择是噪声抑制与动态性能的折中。截止频率越低，噪声滤除越好但相位延迟越大，会降低控制环的相位裕度。建议：先不加滤波器调通系统，再根据噪声水平逐步降低截止频率，直到噪声可接受且动态性能无明显下降。

&#120791;关键公式&#9660;

$$G_{LPF}(s) = \frac{\omega_f}{s + \omega_f}$$一阶低通滤波器传递函数。$f_c=1$kHz时$\omega_f=6283$rad/s，1kHz处衰减3dB。
$$\alpha = \frac{\omega_f T_s}{1 + \omega_f T_s}$$数字LPF系数。$\omega_f=6283$rad/s, $T_s=100\mu$s时$\alpha=0.386$。
$$\phi_{LPF}(\omega_c) = -\arctan\frac{\omega_c}{\omega_f}$$LPF在控制环截止频率处引入的相位滞后。$\omega_c/\omega_f=2$时$\phi=-63.4^\circ$，严重影响稳定性。

练习题 (2)&#9660;

简单低通滤波器的截止频率如何选择？截止频率过高或过低各有什么问题？查看参考参考解答

**截止频率选择原则：**

1. **电流采样LPF：**$f_c = (0.5 \sim 1.0) \times f_{current\_loop}$，典型1~2kHz。需滤除PWM开关频率纹波（10~20kHz），但保留电流环带宽内的信号。

2. **速度估计LPF：**$f_c = (0.1 \sim 0.3) \times f_{speed\_loop}$，典型50~200Hz。速度信号变化慢，可用更低截止频率。

3. **通用原则：**$f_c$应高于控制环带宽（保留有效信号），远低于开关频率（滤除噪声）。

**截止频率过高的问题：**

- 开关频率纹波和高频噪声未被充分滤除，PI调节器输出抖动

- 电流环输出电压含高频分量，导致电机噪声和损耗增大

- 速度估计信号抖动，速度环输出不稳

**截止频率过低的问题：**

- 有效信号被衰减和延迟，降低控制环带宽

- LPF在控制环截止频率处引入显著相位滞后，降低相位裕度

- 系统动态响应变慢，阶跃响应超调增大甚至振荡

自评：掌握部分未掌握
中等推导一阶LPF的离散化公式$y_k = \alpha x_k + (1-\alpha)y_{k-1}$，说明$\alpha$与截止频率的关系。查看参考参考解答

**推导过程（双线性变换法）：**

1. 连续传递函数：$$G(s) = \frac{\omega_f}{s + \omega_f}$$

2. 双线性变换：$s = \frac{2}{T_s} \cdot \frac{z-1}{z+1}$，代入得：$$G(z) = \frac{\omega_f}{\frac{2}{T_s}\frac{z-1}{z+1} + \omega_f} = \frac{\omega_f T_s (z+1)}{(2+\omega_f T_s)z + (\omega_f T_s - 2)}$$

3. 整理为差分方程形式，令$\alpha = \frac{\omega_f T_s}{2 + \omega_f T_s}$：$$y_k = \alpha(x_k + x_{k-1}) + (1-2\alpha)y_{k-1}$$

**简化形式（前向Euler法）：**

用$s \approx \frac{z-1}{T_s}$代入：$$G(z) = \frac{\omega_f T_s}{z - 1 + \omega_f T_s} = \frac{\omega_f T_s / z}{1 - (1-\omega_f T_s)/z}$$

差分方程：$$y_k = \alpha \cdot x_k + (1-\alpha) \cdot y_{k-1}$$其中$\alpha = \frac{\omega_f T_s}{1 + \omega_f T_s}$

**$\alpha$与截止频率的关系：**

- $\omega_f$增大（截止频率升高）&rarr; $\alpha$增大 &rarr; 更多当前输入权重 &rarr; 响应更快但滤波效果弱

- $\omega_f$减小（截止频率降低）&rarr; $\alpha$减小 &rarr; 更多历史输出权重 &rarr; 响应慢但滤波效果强

- 极端：$\alpha=1$（无滤波），$\alpha=0$（完全阻塞）

自评：掌握部分未掌握

完成所有练习后标记为已学习标记为已学习

站5

## FOC系统整合与SVPWM

核心概念&#9660;

#### 完整FOC链路

FOC控制链路：编码器获取&theta; &rarr; 电流采样Ia/Ib/Ic &rarr; Clarke变换 &rarr; Park变换(使用&theta;) &rarr; PI调节(Id_ref=0, Iq_ref=速度环输出) &rarr; 前馈解耦 &rarr; 反Park变换 &rarr; SVPWM &rarr; PWM输出。所有环节在同一个PWM中断中完成。

#### SVPWM扇区判断

三相电压$V_a, V_b, V_c$经Clarke变换得$V_\alpha, V_\beta$。扇区判断：$A = \text{sign}(V_\beta)$，$B = \text{sign}(V_\beta - \sqrt{3}V_\alpha)$，$C = \text{sign}(-V_\beta - \sqrt{3}V_\alpha)$。扇区号$N = A + 2B + 4C$，映射到1~6扇区。

#### 占空比计算

定义$X = \sqrt{3}T_{PWM}V_\beta/V_{dc}$，$Y = T_{PWM}(\sqrt{3}V_\beta + 3V_\alpha)/(2V_{dc})$，$Z = T_{PWM}(\sqrt{3}V_\beta - 3V_\alpha)/(2V_{dc})$。根据扇区选择T1/T2，计算T0 = $T_{PWM}$ - T1 - T2。三相占空比由T1/T2/T0的分配决定。

#### 中断时序

PWM中心对齐模式下，ADC在PWM谷底采样（所有下管导通），采样完成后触发中断。中断中完成：读ADC &rarr; Clarke/Park &rarr; PI计算 &rarr; 反Park &rarr; SVPWM &rarr; 写比较寄存器。总计算时间需小于$T_s/2$。

代码实现要点：SVPWM扇区判断用查表法避免浮点除法；占空比限幅防止过调制；死区时间由硬件定时器自动插入；ADC采样时刻与PWM同步由定时器触发控制。

练习题 (2)&#9660;

中等SVPWM扇区判断的代码实现逻辑是什么？如何从$V_\alpha, V_\beta$确定扇区号？查看参考参考解答

**SVPWM扇区判断代码实现：**

**步骤1 - 计算判断变量：**

$$U_1 = V_\beta, \quad U_2 = \frac{\sqrt{3}}{2}V_\alpha - \frac{1}{2}V_\beta, \quad U_3 = -\frac{\sqrt{3}}{2}V_\alpha - \frac{1}{2}V_\beta$$

**步骤2 - 符号判断：**

$$A = (U_1 > 0) ? 1 : 0$$

$$B = (U_2 > 0) ? 1 : 0$$

$$C = (U_3 > 0) ? 1 : 0$$

**步骤3 - 计算扇区号：**

$$N = A + 2B + 4C$$

**步骤4 - 查表映射：**

N=3&rarr;扇区1, N=1&rarr;扇区2, N=5&rarr;扇区3, N=4&rarr;扇区4, N=6&rarr;扇区5, N=2&rarr;扇区6

**C代码示例：**

`int sector_lut[8] = {0, 2, 6, 1, 4, 3, 5, 0};int N = A + 2*B + 4*C;int sector = sector_lut[N];`

这种方法避免了浮点除法和三角函数，适合嵌入式实时计算。

自评：掌握部分未掌握
困难FOC中断中的计算时序如何安排？如果计算时间超过$T_s/2$会有什么后果？查看参考参考解答

**FOC中断时序安排：**

1. **ADC采样完成触发中断**（PWM谷底时刻$t_0$）

2. **读取ADC值**（$t_0$ ~ $t_0+2\mu$s）：读取三相电流ADC值，做偏移校正和缩放

3. **Clarke变换**（~$1\mu$s）：$I_\alpha, I_\beta$

4. **读取角度**（~$1\mu$s）：编码器计数器读取或观测器计算

5. **Park变换**（~$2\mu$s）：$I_d, I_q$（含sin/cos查表或计算）

6. **PI调节**（~$2\mu$s）：d/q轴PI计算，含抗积分饱和

7. **前馈解耦**（~$1\mu$s）：交叉耦合补偿

8. **反Park变换**（~$2\mu$s）：$V_\alpha, V_\beta$

9. **SVPWM**（~$2\mu$s）：扇区判断、占空比计算、限幅

10. **写比较寄存器**：更新下一周期PWM占空比

总计算时间约13~15&mu;s（168MHz STM32F405带FPU）。

**计算超时的后果：**

1. **PWM更新延迟：**比较寄存器未在下一个PWM周期开始前更新，导致占空比延迟一拍，增加相位滞后。

2. **采样时刻偏移：**下一个ADC采样点到达时中断尚未完成，导致采样数据丢失或使用旧数据。

3. **控制性能恶化：**延迟增加使电流环相位裕度降低，可能导致振荡甚至不稳定。

4. **看门狗复位：**若中断超时过长可能触发看门狗。

**优化方法：**使用FPU加速浮点运算；sin/cos用查表法；SVPWM用查表法；关键路径用汇编优化；必要时降低PWM频率。

自评：掌握部分未掌握

完成所有练习后标记为已学习标记为已学习

站6

## PLL角度观测器与速度环

核心概念&#9660;

#### PLL角度观测器

基于锁相环(PLL)的角度观测器从反电动势估计中提取转子位置角。结构：反电动势估计 &rarr; 相位检测器(atan2或叉积) &rarr; PI调节器 &rarr; 积分器输出角度。PLL带宽决定角度跟踪速度和噪声抑制能力的权衡。

#### PLL带宽设计

PLL等效为二阶系统，自然频率$\omega_n$和阻尼比$\zeta$由PI参数决定。$K_{p,PLL} = 2\zeta\omega_n$，$K_{i,PLL} = \omega_n^2$。典型取$\zeta=0.707$（临界阻尼），$\omega_n$为速度环带宽的5~10倍。$\omega_n$越大跟踪越快但噪声敏感。

#### 速度环整定

速度环被控对象包含电流环（近似为一阶惯性）和机械惯性（积分环节）。TI推荐方法：速度环PI参数$K_{p,\omega} = J \cdot \omega_{c\omega}$，$K_{i,\omega} = K_{p,\omega} \cdot \omega_{c\omega} / \alpha$（$\alpha$=3~5）。速度环带宽通常为电流环的1/5~1/10。

#### 速度估计精度

速度估计精度受以下因素影响：(1)角度量化误差（编码器分辨率限制）；(2)PLL带宽（低带宽平滑但延迟大）；(3)负载扰动（瞬态速度波动）。低速时（

带宽层级原则：电流环带宽 > PLL带宽 > 速度环带宽。典型值：电流环1~2kHz，PLL 200~500Hz，速度环50~200Hz。内环必须比外环快5倍以上，否则内环动态影响外环稳定性。

&#120791;关键公式&#9660;

$$K_{p,PLL} = 2\zeta\omega_n, \quad K_{i,PLL} = \omega_n^2$$PLL PI参数。$\zeta=0.707$, $\omega_n=2000$rad/s时$K_{p,PLL}=2828$, $K_{i,PLL}=4\times10^6$。
$$K_{p,\omega} = J \cdot \omega_{c\omega}$$速度环比例增益。$J=1\times10^{-4}$kg&middot;m&sup2;, $\omega_{c\omega}=200$rad/s时$K_{p,\omega}=0.02$。
$$\hat{\omega} = \frac{\Delta\theta}{T_s}$$速度估计（差分法）。低速时$\Delta\theta$很小，量化误差导致速度估计噪声大。需PLL或观测器平滑。

练习题 (2)&#9660;

中等PLL角度观测器的带宽如何选择？带宽与速度估计精度的权衡关系是什么？查看参考参考解答

**PLL带宽选择：**

1. **下限约束：**PLL带宽必须远高于速度环带宽（5~10倍），否则角度跟踪延迟影响速度环稳定性。速度环200Hz时PLL带宽&ge;1kHz。

2. **上限约束：**PLL带宽不能超过反电动势估计的有效带宽。SMO/高频注入的估计噪声随频率增大，PLL带宽过高会将噪声传递到角度和速度估计中。

3. **典型范围：**200~500Hz（自然频率$\omega_n$=1257~3142 rad/s）。

**带宽与精度的权衡：**

1. **高带宽：**角度跟踪快，动态响应好（加速/减速时角度误差小）；但噪声抑制差，速度估计抖动大，低速时尤其明显。

2. **低带宽：**噪声抑制好，速度估计平滑；但角度跟踪慢，动态过程中角度误差大，导致Id/Iq交叉耦合，电流畸变。

3. **变带宽策略：**低速时降低PLL带宽（噪声主导），高速时提高PLL带宽（跟踪需求主导）。根据速度大小自适应调整$\omega_n$。

4. **阻尼比选择：**$\zeta=0.707$（临界阻尼）是常用折中，兼顾响应速度和超调。$\zeta$过小角度估计超调振荡，$\zeta$过大响应迟缓。

自评：掌握部分未掌握
困难TI推荐的速度环整定方法是什么？如何从电机惯量J推导速度环PI参数？查看参考参考解答

**TI速度环整定方法：**

速度环被控对象简化为：电流环（一阶惯性，带宽$\omega_{ci}$）+ 机械系统（积分环节$\frac{K_t}{Js}$，$K_t$为转矩常数）。

**步骤1 - 确定速度环带宽：**$\omega_{c\omega} = \frac{\omega_{ci}}{5 \sim 10}$，通常取电流环带宽的1/5~1/10。

**步骤2 - 计算Kp：**速度环开环在$\omega_{c\omega}$处穿越0dB，此时积分环节提供-90度相位，需Kp补偿增益：

$$|K_{p,\omega} \cdot \frac{K_t}{J \omega_{c\omega}}| = 1 \Rightarrow K_{p,\omega} = \frac{J \omega_{c\omega}}{K_t}$$

其中$K_t = \frac{3}{2}p\psi_m$为转矩常数。

**步骤3 - 计算Ki：**PI零点频率设为$\omega_{c\omega}/\alpha$（$\alpha=3\sim5$），保证低频增益和稳态无差：

$$K_{i,\omega} = K_{p,\omega} \cdot \frac{\omega_{c\omega}}{\alpha} = \frac{J \omega_{c\omega}^2}{\alpha K_t}$$

**数值示例：**

$J=1\times10^{-4}$ kg&middot;m&sup2;, $K_t=0.03$ N&middot;m/A, $\omega_{ci}=10000$ rad/s, $\omega_{c\omega}=2000$ rad/s, $\alpha=4$：

$K_{p,\omega} = \frac{10^{-4} \times 2000}{0.03} = 6.67$ A/(rad/s)

$K_{i,\omega} = \frac{10^{-4} \times 2000^2}{4 \times 0.03} = 3333$ A/rad

**验证：**阶跃响应超调应 自评：掌握部分未掌握

完成所有练习后标记为已学习标记为已学习
