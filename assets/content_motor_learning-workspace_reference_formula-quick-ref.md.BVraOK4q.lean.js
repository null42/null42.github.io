import{_ as t,o as e,c as r,j as n,a as i}from"./chunks/framework.B5tqjWbr.js";const l=JSON.parse('{"title":"电机控制公式速查卡","description":"","frontmatter":{"title":"电机控制公式速查卡","date":"2026-07-02T00:00:00.000Z","section":"电机控制","chapter":"learning-workspace","chapterTitle":"学习工作区","category":"学习工作区","tags":["imported"],"source":"motor","sourcePath":"learning-workspace/reference/formula-quick-ref.html","status":"learning","visibility":"public","summary":"Imported from learning-workspace/reference/formula-quick-ref.html","chapterOrder":5,"navGroup":"入门与索引","navGroupOrder":10},"headers":[],"relativePath":"content/motor/learning-workspace/reference/formula-quick-ref.md","filePath":"content/motor/learning-workspace/reference/formula-quick-ref.md","lastUpdated":1783096495000}'),c={name:"content/motor/learning-workspace/reference/formula-quick-ref.md"};function o(d,a,s,_,$,m){return e(),r("div",null,[...a[0]||(a[0]=[n("h1",{id:"电机控制公式速查卡",tabindex:"-1"},[i("电机控制公式速查卡 "),n("a",{class:"header-anchor",href:"#电机控制公式速查卡","aria-label":'Permalink to "电机控制公式速查卡"'},"​")],-1),n("p",null,"Motor Control Formula Quick Reference — 10大专题，核心公式一卡掌握",-1),n("pre",null,[n("code",null,`1坐标变换
2PMSM电压方程
3转矩方程
4PI参数设计
5SVPWM
6观测器
7功率变换
8热设计
9母线电容
10通信

1
坐标变换 Coordinate Transforms
&rarr; ALG-01

  Clarke 变换（等幅值）

    $$i_\\alpha = i_a, \\quad i_\\beta = \\frac{i_a + 2i_b}{\\sqrt{3}}$$

    ia, ib, ic 三相电流
    i&alpha;, i&beta; 两相静止坐标系电流

  等幅值变换系数为 2/3；等功率变换系数为 &radic;(2/3)。此处为等幅值形式，假设 ia+ib+ic=0。

  Clarke 变换（矩阵形式）

    $$\\begin{bmatrix} i_\\alpha \\\\ i_\\beta \\end{bmatrix} = \\frac{2}{3} \\begin{bmatrix} 1 & -\\frac{1}{2} & -\\frac{1}{2} \\\\ 0 & \\frac{\\sqrt{3}}{2} & -\\frac{\\sqrt{3}}{2} \\end{bmatrix} \\begin{bmatrix} i_a \\\\ i_b \\\\ i_c \\end{bmatrix}$$

    2/3 等幅值系数

  Park 变换（正变换）

    $$\\begin{bmatrix} i_d \\\\ i_q \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} i_\\alpha \\\\ i_\\beta \\end{bmatrix}$$

    &theta; 转子电角度
    id, iq 旋转坐标系电流

  d轴对准转子磁链方向，q轴超前90&deg;电角度。Park变换将交流量变为直流量。

  反 Park 变换

    $$\\begin{bmatrix} u_\\alpha \\\\ u_\\beta \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} u_d \\\\ u_q \\end{bmatrix}$$

    ud, uq dq轴电压指令
    u&alpha;, u&beta; &alpha;&beta;轴电压（SVPWM输入）

2
PMSM 电压方程 PMSM Voltage Equations
&rarr; ALG-01 / ALG-20

  d轴电压方程

    $$u_d = R_s i_d + L_d \\frac{di_d}{dt} - \\omega_e L_q i_q$$

    ud d轴电压
    Rs 定子电阻
    Ld d轴电感
    &omega;e 电角速度
    Lq q轴电感

  第三项 &omega;eLqiq 为交叉耦合反电动势，需前馈解耦补偿。

  q轴电压方程

    $$u_q = R_s i_q + L_q \\frac{di_q}{dt} + \\omega_e (L_d i_d + \\psi_f)$$

    &psi;f 永磁体磁链
    &omega;e&psi;f 反电动势

  第三项含反电动势 &omega;e&psi;f 与交叉耦合项 &omega;eLdid，高速时反电动势是弱磁的根本原因。

  稳态电压约束椭圆

    $$\\left(\\frac{u_d}{\\omega_e}\\right)^2 + \\left(\\frac{u_q}{\\omega_e}\\right)^2 \\leq \\left(\\frac{U_{dc}}{\\sqrt{3}}\\right)^2$$

    Udc 直流母线电压
    Udc/&radic;3 SVPWM线性调制最大相电压

  稳态时 di/dt=0，电压方程简化为电阻压降与反电动势的平衡。电压椭圆随转速升高而收缩，需弱磁。

3
转矩方程 Torque Equations
&rarr; ALG-01 / ALG-11

  PMSM 电磁转矩

    $$T_e = \\frac{3}{2} P \\left[ \\psi_f i_q + (L_d - L_q) i_d i_q \\right]$$

    Te 电磁转矩 (Nm)
    P 极对数
    &psi;f 永磁体磁链 (Wb)
    Ld-Lq 凸极效应

  第一项为永磁转矩，第二项为磁阻转矩。SPMSM中 Ld=Lq，磁阻转矩为零。

  SPMSM 简化转矩

    $$T_e = \\frac{3}{2} P \\psi_f i_q = K_t \\cdot i_q$$

    Kt 转矩常数 = (3/2)P&psi;f (Nm/A)

  表贴式PMSM转矩仅与 iq 成正比，id=0 控制即为最大转矩策略。

  机械运动方程

    $$J \\frac{d\\omega_m}{dt} = T_e - T_L - B\\omega_m$$

    J 转动惯量 (kg&middot;m&sup2;)
    &omega;m 机械角速度 (rad/s)
    TL 负载转矩
    B 粘滞摩擦系数

4
PI 参数设计 PI Parameter Design
&rarr; ALG-03 / CT-05

  电流环 PI 参数（工程整定）

    $$K_p = L_s \\cdot \\omega_c, \\quad K_i = R_s \\cdot \\omega_c$$

    Ls 相电感 (H)
    Rs 相电阻 (&Omega;)
    &omega;c 电流环带宽 (rad/s)

  基于零极点对消法：PI零点 1/&tau;=Kp/Ki=Ls/Rs 对消电气极点。&omega;c 通常取开关频率的 1/10~1/5。

  速度环 PI 参数

    $$K_p = \\frac{J \\cdot \\omega_s}{P}, \\quad K_i = \\frac{K_p \\cdot \\omega_s}{10}$$

    J 转动惯量
    &omega;s 速度环带宽 (rad/s)
    P 极对数

  速度环带宽通常为电流环带宽的 1/5~1/10。Ki 按经验取 Kp&middot;&omega;s/10，确保低频增益足够。

  PI 离散化（双线性变换）

    $$u[k] = K_p \\cdot e[k] + K_i \\cdot T_s \\sum_{j=0}^{k} e[j]$$

    Ts 采样周期 (s)
    e[k] 第k拍误差
    u[k] 第k拍输出

  增量式实现可避免积分累积问题：&Delta;u[k] = Kp(e[k]-e[k-1]) + KiTse[k]。

5
SVPWM 空间矢量调制
&rarr; ALG-01 / MC-LIB-SVPWM

  线性调制最大相电压

    $$V_{ph,\\max} = \\frac{V_{dc}}{\\sqrt{3}}$$

    Vdc 直流母线电压
    Vph,max 最大输出相电压幅值

  SVPWM线性调制范围为 Vdc/&radic;3，比SPWM的 Vdc/2 高 15.47%。过调制区可达 Vdc/&radic;3 ~ 2Vdc/&pi;。

  扇区判断

    $$A = \\text{sign}(u_\\beta), \\quad B = \\text{sign}\\!\\left(\\tfrac{\\sqrt{3}}{2}u_\\alpha - \\tfrac{1}{2}u_\\beta\\right), \\quad C = \\text{sign}\\!\\left(-\\tfrac{\\sqrt{3}}{2}u_\\alpha - \\tfrac{1}{2}u_\\beta\\right)$$

    u&alpha;, u&beta; 参考电压矢量分量
    A, B, C 扇区标志位 (0或1)

  扇区号 N = A + 2B + 4C，映射到 1~6 扇区。这是最常用的快速扇区判断法。

  作用时间计算

    $$T_1 = \\frac{\\sqrt{3} T_s}{V_{dc}} \\left( u_\\alpha - \\frac{u_\\beta}{\\sqrt{3}} \\right), \\quad T_2 = \\frac{\\sqrt{3} T_s}{V_{dc}} \\cdot \\frac{2 u_\\beta}{\\sqrt{3}}$$

    T1, T2 相邻有效矢量作用时间
    Ts PWM周期
    T0 = Ts - T1 - T2 零矢量时间

  此为第I扇区公式，其他扇区需按扇区号旋转。当 T1+T2 > Ts 时进入过调制。

6
观测器 Observers
&rarr; ALG-07 / CT-11

  滑模观测器 (SMO)

    $$\\hat{e}_\\alpha = K \\cdot \\text{sign}(\\hat{i}_\\alpha - i_\\alpha), \\quad \\hat{e}_\\beta = K \\cdot \\text{sign}(\\hat{i}_\\beta - i_\\beta)$$

    K 滑模增益（需大于反电动势幅值）
    &ecirc;&alpha;, &ecirc;&beta; 估计反电动势
    sign(&middot;) 符号函数

  SMO输出需经LPF提取基波反电动势，再由PLL提取角度。K过大会加剧抖振，过小则无法收敛。

  锁相环 (PLL)

    $$\\hat{\\theta} = \\int \\hat{\\omega} \\, dt, \\quad \\hat{\\omega} = K_p \\sin(\\Delta\\theta) + K_i \\int \\sin(\\Delta\\theta) \\, dt$$

    &Delta;&theta; 估计角与真实角之差
    Kp, Ki PLL比例/积分增益
    &omega;&circ; 估计电角速度

  小角度时 sin(&Delta;&theta;) &approx; &Delta;&theta;，PLL等效为II型伺服系统。Kp、Ki 决定跟踪带宽与动态性能。

  Luenberger 观测器误差动力学

    $$\\dot{\\tilde{x}} = (A - LC)\\tilde{x}, \\quad \\tilde{x} = x - \\hat{x}$$

    L 观测器增益矩阵
    A-LC 观测器闭环系统矩阵
    &tilde;x 状态估计误差

  通过配置 L 使 A-LC 的特征值位于左半平面且比被控系统极点更负，保证估计误差指数收敛。

7
功率变换 Power Conversion
&rarr; PP-01 / PP-04

  Buck 变换器

    $$V_o = D \\cdot V_{in}$$

    D 占空比 (0~1)
    Vin 输入电压
    Vo 输出电压

  降压变换器，CCM下输出电压与占空比成正比。D&le;1 故 Vo &le; Vin。

  Boost 变换器

    $$V_o = \\frac{V_{in}}{1 - D}$$

    D 占空比 (0~1)

  升压变换器，D&rarr;1 时 Vo&rarr;&infin;（理论值），实际受寄生参数限制。D不宜超过0.85。

  功率因数

    $$\\text{PF} = \\frac{P}{V_{rms} \\cdot I_{rms}} = \\cos\\varphi \\cdot \\text{THD}_I \\text{ 修正因子}$$

    P 有功功率 (W)
    Vrms, Irms 电压/电流有效值
    &varphi; 电压电流相位差

  PF = cos&varphi; 仅在纯正弦波下成立。含谐波时 PF = cos&varphi; &middot; 1/&radic;(1+THD&sup2;)。

8
热设计 Thermal Design
&rarr; HW-07

  结温估算

    $$T_j = T_a + P_d \\left( R_{\\theta,jc} + R_{\\theta,cs} + R_{\\theta,sa} \\right)$$

    Tj 结温 (&deg;C)
    Ta 环境温度
    Pd 器件功耗 (W)
    R&theta;,jc 结-壳热阻
    R&theta;,cs 壳-散热器热阻
    R&theta;,sa 散热器-环境热阻

  必须保证 Tj < Tj,max（IGBT通常150&deg;C，SiC MOSFET可达175&deg;C）。散热器选型核心是降低 R&theta;,sa。

  IGBT 导通损耗

    $$P_{cond} = V_{CE0} \\cdot I_{avg} + r_{CE} \\cdot I_{rms}^2$$

    VCE0 集电极-发射极饱和压降阈值
    rCE 导通电阻斜率
    Iavg 平均电流
    Irms 有效值电流

  开关损耗估算

    $$P_{sw} = \\frac{f_{sw}}{\\pi} \\left( E_{on} + E_{off} \\right) \\cdot \\frac{I_C}{I_{C,nom}} \\cdot \\frac{V_{CE}}{V_{CE,nom}}$$

    fsw 开关频率
    Eon, Eoff 标称开通/关断能量
    IC,nom, VCE,nom 数据手册标称条件

  开关损耗与 fsw 成正比，是高频应用选择SiC/GaN的核心驱动力。

9
母线电容设计 Bus Capacitor Design
&rarr; HW-06 / PP-11

  母线电容容量估算

    $$C = \\frac{P}{2 \\cdot f \\cdot V_{pp} \\cdot V_{dc}}$$

    P 电机功率 (W)
    f 电网频率 (Hz)
    Vpp 允许纹波电压峰峰值
    Vdc 额定母线电压

  此为经验公式，适用于单相整流后电容估算。三相PFC后纹波频率为2&times;电网频率，纹波更小。实际还需考虑 ESR 与纹波电流额定值。

  纹波电流有效值

    $$I_{C,rms} = \\sqrt{I_{in,rms}^2 - I_{dc,avg}^2}$$

    IC,rms 电容纹波电流
    Iin,rms 输入电流有效值
    Idc,avg 直流平均电流

  纹波电流决定电容发热，必须低于电容数据手册额定纹波电流，否则电容寿命急剧缩短。

10
通信 Communication
&rarr; COM-01 / COM-05

  CAN 位时间

    $$t_{bit} = \\frac{1}{f_{baud}} = \\frac{1 + \\text{TSEG1} + \\text{TSEG2}}{f_{CAN\\_CLK}}$$

    fbaud 波特率 (bps)
    TSEG1 相位缓冲段1 (时间份额)
    TSEG2 相位缓冲段2 (时间份额)
    fCAN_CLK CAN模块时钟频率

  采样点通常在 TSEG1 结束处，推荐位于位时间的 75%~87.5%。STM32中 TSEG1=TS1+1, TSEG2=TS2+1。

  Modbus CRC-16

    $$\\text{CRC} = \\text{CRC16}(data), \\quad \\text{多项式}: 0xA001 \\text{ (反转的 } x^{16}+x^{15}+x^2+1\\text{)}$$

    0xA001 反转多项式
    初始值 0xFFFF

  Modbus RTU使用CRC-16/MODBUS，正向多项式0x8005，代码实现中通常用反转形式0xA001查表法。CRC低字节先发。

  CAN 采样点位置

    $$\\text{Sample Point} = \\frac{1 + \\text{TSEG1}}{1 + \\text{TSEG1} + \\text{TSEG2}} \\times 100\\%$$

    推荐值 75%~87.5%

  CANopen规范要求采样点在87.5%处。不同网络节点采样点必须一致，否则会导致仲裁错误。
`)],-1),n("p",null,"↑",-1)])])}const p=t(c,[["render",o]]);export{l as __pageData,p as default};
