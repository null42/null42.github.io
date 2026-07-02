---
date: 2026-06-26
category: 电源控制
source: power
visibility: public
title: MATLAB/Simulink 电力电子仿真快速路线
tags:
  - power-electronics
status: learning
summary: 生成日期：2026-06-26
---

# MATLAB/Simulink 电力电子仿真快速路线

生成日期：2026-06-26

目标：在短时间内从基本 DC/DC 变换器仿真，过渡到三相 PFC、Vienna 整流器、T 型/I 型三电平、三电平 SVPWM/SPWM，再能拆解并复现实用复杂系统。最终目标不是只会搭模型，而是能胜任 UPS 软件开发：读懂控制框图和 C 工程，理解采样、PWM、中断、保护、状态机、通信、参数管理与仿真模型之间的对应关系。

## 面向 UPS 软件开发的审查结论

这份路线图原本对“电力电子拓扑仿真”覆盖较完整，但如果最终目标是 UPS 软件开发，仅靠原路线还不够。UPS 软件工程不仅要理解 PFC 和逆变器，还要能把控制算法放进实时固件框架中，并处理启动、切换、保护、故障锁存、通信和参数管理。

合理的部分：

- 前级整流：单相/三相 PFC、Vienna 整流器覆盖了在线式 UPS 的 AC/DC 前端。
- DC 母线：母线电压闭环、中点平衡、负载阶跃验证是 UPS 能量链路的核心。
- 后级逆变：三电平 SPWM/SVPWM、T 型/I 型 NPC 覆盖了 UPS 逆变输出功率级。
- DSP 外设：F28075 的 ADC、ePWM、CMPSS、SDFM、eCAP、CLA 映射能支撑数字电源固件落地。

需要补强的部分：

- UPS 架构：在线式 UPS（online UPS / double-conversion UPS）通常包含整流/PFC、DC 母线、电池/DC-DC、逆变器、旁路和输出滤波。
- 模式切换：市电正常、整流供电、电池供电、旁路供电、故障停机、恢复重启都需要状态机。
- 输出控制：UPS 后级重点不是并网电流控制，而是 AC 输出电压闭环、瞬态负载恢复、非线性负载 THD 和短路限流。
- 保护逻辑：过压、欠压、过流、短路、过温、风扇故障、母线不平衡、PLL 失锁、旁路异常都要进入故障管理。
- 软件工程：需要掌握 ISR 调度、慢环/快环分层、参数表、通信协议、日志、故障锁存、软启动和降额策略。

因此，本文档已补充“UPS 软件开发补强路线”和“仿真到固件模块映射”。学习时应把每个仿真模型都转化成固件问题：采哪些量、何时采样、在哪个中断算、输出到哪个 PWM、保护如何硬件关断、故障如何锁存和恢复。

## 学习主线

建议采用“官方可复现模型 + 中文文章补操作 + 论文/技术文档补算法”的组合。

1. 先掌握 Simscape Electrical 建模层级：平均模型、平均开关模型、理想开关模型、详细器件模型。
2. 用 Buck/Boost 建立闭环控制直觉：采样、PWM、PI、限幅、抗积分饱和、负载阶跃。
3. 进入三相并网/整流控制：PLL、abc/dq、前馈解耦、电压外环、电流内环、功率因数和 THD。
4. 进入 Vienna 和三电平：中点电位平衡、冗余小矢量、零序注入、三电平门极映射。
5. 最后复现 UPS 型复杂系统：前级整流/PFC + DC 母线 + 电池/DC-DC + 后级逆变 + 旁路/负载 + 保护/故障/效率。
6. 把仿真对象映射到固件模块：采样、控制 ISR、PWM 更新、硬件保护、状态机、通信和参数管理。

## 资源清单

### 0. 仿真平台与建模方法

- MathWorks：Choose Blocks to Model Power Electronic Converters  
  https://www.mathworks.com/help/sps/ug/choose-power-electronic-converter-block.html  
  用途：确定什么时候用预建 Converter block、什么时候用离散器件；系统级优先平均/行为模型，器件级再用开关模型。
- MathWorks：Power Electronics Simulation Onramp / Examples  
  https://www.mathworks.com/help/sps/examples.html  
  用途：作为模型入口索引。
- MathWorks：Linearize DC-DC Converter Model  
  https://www.mathworks.com/help/sps/ug/linearize-dc-dc-converter-model.html  
  用途：理解为什么开关模型不能直接线性化，以及平均模型如何用于 PI 设计。

### 1. 基本 DC/DC 与闭环 PI

- MathWorks：Boost Converter Voltage Control  
  https://www.mathworks.com/help/sps/ug/boost-converter-voltage-control.html  
  重点：Boost 输出电压 PI 闭环、负载阶跃、占空比调节。
- MathWorks：Design PI Controller for DC-DC Converter  
  https://www.mathworks.com/help/sps/ug/design-pi-controller-for-dc-dc-converter.html  
  重点：用经典控制理论设计 PI，适合作为调参标准答案。
- MathWorks：Implement Power Factor Correction for CCM Boost Converter  
  https://www.mathworks.com/help/sps/ug/power-factor-correction-for-ccm-boost-converter.html  
  重点：从 DC/DC 过渡到 PFC，电感电流和输出电压双控制。
- MathWorks File Exchange：Closed loop control for buck converter  
  https://www.mathworks.com/matlabcentral/fileexchange/82109-closed-loop-control-for-buck-converter  
  用途：快速看 Buck 闭环模型结构。
- MATLAB Helper：Open & Closed Loop Buck Converter  
  https://matlabhelper.com/blog/simulink/open-loop-closed-loop-buck-converter/  
  用途：对照开环/闭环搭建步骤。
- CSDN：基于 Simulink 的 DC-DC 升压变换器仿真实例  
  https://blog.csdn.net/MHD0815/article/details/143378133  
  用途：中文建模步骤参考。

### 2. 三相 PFC / PWM 整流器

- MathWorks：Three-Phase Grid-Connected Rectifier Control  
  https://www.mathworks.com/help/sps/ug/grid-connected-rectifier.html  
  重点：三相并网整流，DC-link 电压控制，PI 级联控制。
- MathWorks：PFC Rectifier Controller (Three-Phase)  
  https://www.mathworks.com/help/sps/ref/pfcrectifiercontrollerthreephase.html  
  重点：三相 PFC 控制器模块，含 PLL、无功功率控制、正弦电流控制。
- MathWorks：Power Factor Correction Rectifier Design  
  https://www.mathworks.com/help/sps/ug/power-factor-correction-rectifier-design.html  
  重点：三相 AC 到稳定 DC 母线，控制无功和谐波。
- CSDN：三相 PWM 整流器 PI 解耦双闭环控制  
  https://blog.csdn.net/tt34567/article/details/155926028  
  重点：dq 有功/无功、前馈解耦、电压电流双闭环、SVPWM。
- CSDN：基于 SVPWM 调制的三相整流器 Simulink 仿真模型  
  https://blog.csdn.net/qq_39497587/article/details/131039227  
  重点：三相 PWM 整流器、双闭环、SVPWM 搭建。
- PDF：基于 MATLAB 的三相电压型 PWM 整流系统仿真  
  https://softdown.elecfans.net/q/elecfans.com-%E5%9F%BA%E4%BA%8EMATLAB%E7%9A%84%E4%B8%89%E7%9B%B8%E7%94%B5%E5%8E%8B%E5%9E%8BPWM%E6%95%B4%E6%B5%81%E7%B3%BB%E7%BB%9F%E4%BB%BF%E7%9C%9F.pdf  
  用途：老但完整，适合看控制系统推导。

### 3. Vienna 整流器

- MathWorks：Vienna Rectifier Control  
  https://www.mathworks.com/help/sps/ug/vienna_rectifier.html  
  重点：Vienna 拓扑、闭环控制、空间矢量调制、DC 侧负载阶跃。
- MathWorks：PWM Generator (Vienna Rectifier)  
  https://www.mathworks.com/help/sps/ref/pwmgeneratorviennarectifier.html  
  重点：Vienna 专用 PWM/SVM 发生器。
- MathWorks 视频：PID Control of a Vienna Rectifier-Based PFC  
  https://www.mathworks.com/videos/pid-control-of-a-vienna-rectifier-based-power-factor-corrector-1614934525915.html  
  重点：DC-link 电压、中点电压、电流控制器自动整定。
- MathWorks File Exchange：three phase Vienna rectifier  
  https://www.mathworks.com/matlabcentral/fileexchange/89481-three-phase-vienna-rectifier  
  重点：三相三电平 Vienna，电压电流双闭环，电压外环 PI、电流内环滞环。
- 知乎：三相维也纳整流器（一）双闭环 PI 控制 SVPWM  
  https://zhuanlan.zhihu.com/p/1992348193736910667  
  重点：dq 双闭环、前馈解耦、SVPWM、中点电位平衡、PLL。
- CSDN：三相 VIENNA 整流器仿真：一种综合控制的实践  
  https://blog.csdn.net/ThzxRHwXWOS/article/details/159723391  
  重点：双 PI、中点平衡、PLL、PF 计算、过零畸变处理。

### 4. 三电平 SPWM/SVPWM 与 T 型/I 型 NPC

- MathWorks：Three-Level Converter (Three-Phase)  
  https://www.mathworks.com/help/sps/ref/threelevelconverterthreephase.html  
  重点：三相三电平 NPC 变换器、12 路门极、三电平 PWM 示例。
- MathWorks：PWM Generator (Three-phase, Three-level)  
  https://www.mathworks.com/help/sps/ref/pwmgeneratorthreephasethreelevel.html  
  重点：三电平 PWM，输入含中点平衡控制信号。
- MathWorks：PWM Gate Signal Generator (Three-phase, Three-level)  
  https://www.mathworks.com/help/sps/ref/pwmgatesignalgeneratorthreephasethreelevel.html  
  重点：三电平简化 SVPWM、12 路门极生成。
- MathWorks File Exchange：Space Vector Pulse Width Modulation (SVPWM) 3 Level Inverter  
  https://www.mathworks.com/matlabcentral/fileexchange/68645-space-vector-pulse-width-modulation-svpwm-3-level-inverter  
  用途：三电平 SVPWM 模型入门。
- MathWorks File Exchange：Space Vector Pulse Width Modulator For Three-Level Inverter  
  https://www.mathworks.com/matlabcentral/fileexchange/72565-space-vector-pulse-width-modulator-for-three-level-inverter  
  用途：T 型和 NPC 三电平 SVPWM 逻辑参考。
- CSDN：三电平逆变器 SVPWM 调制从入门到精通  
  https://blog.csdn.net/sugar/article/details/155053216  
  重点：三电平结构、SVPWM 算法、Simulink 实现。
- CSDN：T 型和 I 型 NPC 三电平逆变器 SVPWM 与 SPWM/CBPWM + 中点电位  
  https://blog.csdn.net/qq_46009436/article/details/154808863  
  重点：T 型/I 型 NPC、SVPWM/SPWM 对比、冗余矢量、零序注入。
- 内蒙古电力技术：60° 坐标系下三电平逆变器中性点电压平衡策略研究  
  https://html.rhhz.net/nmgdljs/202000025.htm  
  重点：60° 坐标变换简化扇区判断和作用时间计算，中点平衡。
- TI 中文资料：三电平逆变器 SVPWM 方法的分析与研究  
  https://e2echina.ti.com/cfs-file/__key/communityserver-discussions-components-files/56/_094E3575735E0690D8536856_SVPWM_B965D56CFF4E1F77_.pdf  
  重点：NPC 拓扑、三电平 SVPWM、中点电位不平衡原因及控制方法。
- 汉斯出版社：基于 Simulink 的逆变器并联系统建模与仿真  
  https://www.hanspub.org/journal/paperinformation?paperid=33492  
  重点：T 型三电平并联、SVPWM、零序环流抑制。

### 5. 复杂系统级仿真

- MathWorks：DC Fast Charger for Electric Vehicle  
  https://www.mathworks.com/help/sps/ug/dc-fast-charger.html  
  重点：三相 UPF 前端、800 V DC 母线、两电平/三电平前端、隔离 DC/DC、电池充电。
- MathWorks：On-Board Charger for Two-Wheeler Electric Vehicle  
  https://www.mathworks.com/help/sps/ug/on-board-charger-for-two-wheeler-electric-vehicle.html  
  重点：AC/DC + DC/DC、UPF、CC 充电、效率和谐波评估。
- MathWorks：Bidirectional DC-DC Converter  
  https://www.mathworks.com/help/sps/ref/bidirectionaldcdcconverter.html  
  重点：双向 DC/DC、电感电流 PI、DAB、母线电压控制。
- MathWorks：Fault Detection of Electric Vehicle Charger  
  https://www.mathworks.com/help/sps/ug/fault-detection-ev-charger.html  
  重点：电网、变换器、控制单元、门极故障检测。

## 14 天快速掌握路线

每天建议 3-5 小时。每阶段都要交付一个可运行模型和一页记录。

### 第 1-2 天：Simscape Electrical 基础与 DC/DC

任务：
- 跑通 Boost Converter Voltage Control。
- 复现一个 Buck 或 Boost 闭环，能改参考电压、负载阶跃、开关频率。
- 对比平均模型和开关模型的速度、纹波、可线性化能力。

验收：
- Scope 中输出电压能跟踪参考。
- 负载阶跃后能恢复稳定。
- 能解释 PI 输出为什么要限幅到占空比范围。

### 第 3-4 天：DC/DC 控制器设计

任务：
- 跟 Design PI Controller for DC-DC Converter 做一次线性化/频域设计。
- 加入电压外环、电流内环的双闭环雏形。
- 记录采样周期、PWM 周期、仿真步长的关系。

验收：
- 能分别调快/调慢外环和内环。
- 能说明为什么内环带宽要高于外环。

### 第 5-6 天：单相 PFC 到三相 dq 基础

任务：
- 跑 Implement Power Factor Correction for CCM Boost Converter。
- 学 Park Transform、PLL、abc/dq 变换。
- 手搭一个三相电压源 + L 滤波 + 两电平 Converter 的 dq 测量框架。

验收：
- 能从三相电压得到稳定相角。
- 能把平衡三相电流变成近似直流的 id/iq。

### 第 7-8 天：三相 PFC / PWM 整流器闭环

任务：
- 跑 Three-Phase Grid-Connected Rectifier Control 或 Power Factor Correction Rectifier Design。
- 拆解电压外环、id/iq 电流内环、前馈解耦、SVPWM/PWM 输出。
- 加负载阶跃，观察 DC 母线和输入电流。

验收：
- DC-link 电压稳定。
- 输入电流近似正弦并与电网电压同相。
- 能解释 id 控有功、iq 控无功。

### 第 9-10 天：Vienna 整流器

任务：
- 跑 Vienna Rectifier Control。
- 对比三相两电平 PFC 与 Vienna：开关数量、二极管路径、三电平 DC 母线。
- 拆中点电压控制，观察上下电容电压。

验收：
- 负载阶跃下 DC 电压恢复。
- 上下电容电压不长期偏离。
- 能解释中点平衡为什么与电流方向、冗余矢量/调制策略有关。

### 第 11-12 天：三电平 SPWM/SVPWM

任务：
- 跑 Three-Phase Three-Level PWM Generator 示例。
- 用三电平 NPC 先实现 SPWM，再看 SVPWM gate generator。
- 建立 12 路门极到三电平桥臂状态 P/O/N 的映射表。

验收：
- 输出相电压有三电平，线电压有五电平特征。
- 能区分 SPWM 载波层叠/相移和 SVPWM 扇区/矢量作用时间。
- 能观察并调节中点电压。

### 第 13 天：T 型/I 型三电平迁移

任务：
- 用 I 型 NPC 模型理解三电平控制，再读 T 型资料。
- 对照 T 型和 NPC 的开关状态，确认相同输出电平下的导通路径差异。
- 只迁移控制和调制逻辑，不急于做器件损耗。

验收：
- 能说明 T 型相对 NPC 的器件数、导通损耗和中点问题。
- 能把同一套三电平调制参考迁移到 T 型门极逻辑。

### 第 14 天：复杂系统集成

任务：
- 跑 DC Fast Charger for Electric Vehicle。
- 只保留主链路：三相前端 PFC/三电平 FEC、DC 母线、隔离 DC/DC、电池或电阻负载。
- 建立系统级仿真日志：母线电压、输入 PF/THD、电池电流、效率、保护信号。

验收：
- 能说明每个控制环的目标、输入、输出、带宽层级。
- 能在复杂模型中定位问题属于功率级、测量、控制环、PWM/门极、求解器中的哪一类。

## 最短学习策略

如果时间非常紧，按以下顺序压缩到 7 天：

1. 第 1 天：Boost 闭环 + PI 设计。
2. 第 2 天：三相 dq/PLL + 两电平 PWM 整流器。
3. 第 3 天：三相 PFC 官方模型拆解。
4. 第 4 天：Vienna 官方模型拆解。
5. 第 5 天：三电平 NPC PWM/SVPWM 官方模型。
6. 第 6 天：T 型/I 型资料对照，中点平衡方法归纳。
7. 第 7 天：DC Fast Charger 系统模型拆解和总结。

## UPS 软件开发补强路线

如果目标是胜任 UPS 软件开发，建议在上面的电力电子仿真路线之后，再用 10-14 天补以下内容。这里的目标不是再学更多拓扑，而是把“能仿真”变成“能写和调 UPS 控制软件”。

### 第 1-2 天：在线式 UPS 系统架构

必须理解：

- 在线式 UPS（online UPS / double-conversion UPS）基本链路：AC 输入、EMI/滤波、整流/PFC、DC 母线、电池/DC-DC、逆变器、LC 输出滤波、静态旁路、负载。
- 整流器负责稳定母线并改善输入功率因数；逆变器负责稳定输出电压和频率；电池支路负责市电异常时维持 DC 母线。
- 旁路不是控制算法的一部分，但它决定了故障和过载时的系统模式。

软件需要能回答：

- 当前能量从哪里来：市电、母线、电池、旁路？
- 当前能量送到哪里：逆变输出、充电电池、旁路负载？
- 哪些条件允许切换模式，哪些故障必须锁机？

交付物：

- 一张 UPS 状态机草图。
- 一张能量流向图。
- 一张采样量清单：输入电压、电流、母线电压、电池电压/电流、输出电压/电流、温度、风扇/继电器状态。

### 第 3-4 天：逆变输出电压闭环

必须理解：

- UPS 后级逆变器常见目标是输出稳定 AC 电压，而不是像并网逆变器那样主要控制电流。
- 单相 UPS 常用电压外环 + 电感/电容电流内环，控制器可能是 PI、PR（proportional resonant / 比例谐振）或重复控制。
- 三相 UPS 可用 abc 静止坐标控制、dq 控制或每相独立控制，具体取决于是否带三相四线、中线和不平衡负载。

必须仿真：

- 线性负载阶跃。
- 整流桥 + 电容输入型非线性负载。
- 输出短路或大电流限流。

必须观察：

- 输出电压 RMS、峰值、频率、THD。
- 输出电感电流、负载电流、限流标志。
- 负载阶跃后的电压跌落、恢复时间、超调。

正确表现：

- 负载突加时输出电压短时下跌，但能恢复到额定值。
- 非线性负载下输出电压 THD 不应失控。
- 限流时电压允许下降，但电流不能无限增加。

### 第 5-6 天：保护、故障锁存和降额

必须理解：

- UPS 软件里保护逻辑和控制算法同等重要。很多故障必须绕过普通控制环，直接关 PWM 或切旁路。
- 保护分硬件快速保护和软件慢速保护。短路/过流优先硬件 Trip，过温/风扇/通信异常可软件判断。
- 故障处理不能只清标志，要区分瞬时保护、锁存故障、可自动恢复故障和必须人工复位故障。

必须设计：

- 硬件 Trip：过流、短路、驱动故障。
- 软件保护：输入欠压/过压、母线过压/欠压、电池欠压、输出过载、过温、风扇异常。
- 故障锁存：记录故障码、发生时刻、关键采样量、当前状态。

必须观察：

- 保护触发点。
- PWM 关断延迟。
- 故障后状态机是否进入安全状态。
- 故障解除后是否按预期恢复或保持锁存。

### 第 7-8 天：控制中断与任务调度

必须理解：

- 快环通常由 ePWM/ADC 触发，周期等于 PWM 周期或其整数倍。
- 慢环、状态机、通信、显示、日志不能阻塞快环。
- 真实 UPS 工程往往是“裸机前后台 + 中断”或“RTOS 任务 + 高优先级控制中断”的混合结构。

推荐任务分层：

- 20 kHz 或 10 kHz：ADC 采样、电流快环、PWM 更新、快速保护。
- 1 kHz：电压环、RMS 计算、PLL、均流环。
- 100 Hz：状态机、继电器/旁路控制、温度和风扇。
- 10 Hz：通信上报、日志、参数保存、显示刷新。

交付物：

- 一张 ISR/任务时序图。
- 每个任务的输入、输出、周期和最坏运行时间估算。

### 第 9-10 天：通信、参数和调试接口

必须理解：

- UPS 软件需要可调参数、可读状态、可记录故障，否则调试效率很低。
- 通信不是附属功能，它是现场维护和生产测试的重要入口。

建议掌握：

- 参数表：额定电压、电流限值、PI/PR 参数、保护阈值、软启动时间。
- 状态量：输入/输出 RMS、频率、母线、电池、温度、模式、故障码。
- 通信接口：SCI/UART、CAN、RS485/Modbus、I2C/SPI 外设扩展。
- 日志：故障前后的关键采样快照和状态机路径。

### 第 11-14 天：简化 UPS 软件骨架

最终应能写出一个简化但完整的软件框架，哪怕控制对象先是 Simulink 或 Python 模型。

模块建议：

- `board_init`: 时钟、GPIO、ADC、ePWM、CMPSS、CLA、通信初始化。
- `sample`: ADC 采样、偏置校正、物理量换算。
- `control_pfc`: 前级 PFC 电流环/电压环。
- `control_inv`: 后级逆变电压环/电流环。
- `pwm_update`: 占空比限幅、死区、SVPWM/SPWM 输出。
- `protection`: 快速保护、慢速保护、故障锁存。
- `state_machine`: 开机、软启动、正常、旁路、电池、故障、恢复。
- `comm`: 参数读写、状态上报、故障查询。
- `log`: 关键事件和故障快照。

验收标准：

- 能解释每个模块为什么存在。
- 能说清每个模块在哪个周期被调用。
- 能从某个异常波形推断可能是采样、控制、PWM、保护还是状态机问题。
- 能把 Simulink 中的一个控制器迁移成 C 伪代码，并明确输入、输出、限幅和执行周期。

## 建模检查清单

- 功率级：拓扑、L/C、负载、初始条件、DC-link 分压是否正确。
- 测量链：电压/电流方向、abc 相序、dq 对齐轴、标幺化比例是否一致。
- 控制链：外环慢、内环快；PI 限幅和抗饱和；参考斜坡和软启动。
- PWM/门极：采样周期、死区、互补逻辑、三电平 12 路顺序、P/O/N 映射。
- 求解器：开关模型用足够小步长；系统级先用平均模型；离散控制采样与 PWM 同步。
- 验证指标：Vdc 稳态误差、阶跃恢复时间、输入 PF、THD、上下电容电压差、开关状态合法性。

## 推荐输出物

每学完一个模块，保存：

- `simulations/<topic>/model.slx`
- `simulations/<topic>/notes.md`
- 一张控制框图
- 一张关键波形截图
- 一张参数表：Vin/Vout/P/L/C/fs/Ts/Kp/Ki
- 一个故障记录：遇到的问题、定位方法、最终原因

## 使用建议

中文 CSDN/知乎/B 站资源常混有付费模型和营销内容，适合用来补中文术语、观察模型框图和参数习惯，但不要直接把参数当标准答案。主模型以 MathWorks 官方示例为基准，算法细节用论文和技术文档校验。

## 与最终目标的路线审查

你的最终目标是搭一个“前级整流 + 后级逆变 + 交错并联式拓扑”的仿真。现有路线能支持这个目标的大部分基础，但需要补一个明确模块。

已覆盖：

- 前级整流：单相 PFC、三相 PFC、Vienna 整流器，能支撑 AC/DC 前端、单位功率因数、DC 母线稳压。
- DC 母线：已有 DC-link 电压控制、中点电压平衡、负载阶跃验证。
- 后级逆变：两电平/三电平逆变、SPWM/SVPWM、T 型/I 型 NPC 门极映射。
- 系统级集成：DC Fast Charger 示例可作为“AC/DC 前端 + DC-link + 后级变换器 + 负载”的复杂系统参考。

不足：

- 缺“交错并联”（interleaved parallel）专门训练：需要补相位错开 PWM、并联支路均流、环流（circulating current）抑制、等效纹波频率提升、共模/零序环流。
- 缺“整流前级与逆变后级之间的能量管理”：需要明确 DC 母线电容、前级功率限幅、后级负载阶跃、母线欠压/过压保护。
- 缺“从 Simulink 控制器到 DSP 外设”的映射：需要把采样点、PWM 更新点、中断周期、保护触发点提前固化。

修订后的推荐终点路线：

1. 单机前级：两电平三相 PFC 或 Vienna 整流器，先只带电阻负载，验证 Vdc、PF、THD。
2. 单机后级：两电平或三电平逆变器，先用理想 DC 源，验证输出电压、电感电流、负载电流和 THD。
3. 串联系统：前级整流 + DC 母线 + 后级逆变，先不用交错并联，验证功率平衡。
4. 交错并联后级：两个或多个逆变单元并联，PWM 相位错开 180°/120°/90°，加入支路电感，验证均流和环流。
5. 完整系统：前级闭环稳母线，后级闭环稳 AC 输出，外加限功率、软启动、保护和故障工况。

## 各模块理论、波形和正确性判断

### A. 仿真平台与建模方法

基本理论：

- 平均模型（average model）忽略开关纹波，适合控制环设计和系统级长时间仿真。
- 开关模型（switching model）保留 PWM 纹波和开关状态，适合验证门极、死区、纹波、电流应力。
- 详细器件模型用于损耗和热设计，不适合作为学习初期主模型。

必须观察：

- 仿真步长、PWM 周期、控制采样周期。
- 开关频率纹波是否能被仿真步长解析。
- 平均模型和开关模型的稳态平均值是否一致。

正确表现：

- 平均模型 V/I 平滑，开关模型叠加高频纹波。
- 同一参数下，两类模型的稳态平均输出接近；若偏差很大，通常是测量方向、占空比定义、初始条件或等效模型选择错了。

参考链接：

- MathWorks 说明如何选择功率电子变换器模型块：  
  https://www.mathworks.com/help/sps/ug/choose-power-electronic-converter-block.html
- MathWorks 三相 PFC 示例提供 average/two-level/three-level 三种保真度模型：  
  https://www.mathworks.com/help/sps/ug/power-factor-correction-rectifier-design.html

### B. Buck/Boost 与 DC/DC 闭环

基本理论：

- Buck 近似满足 `Vout = D * Vin`，Boost 近似满足 `Vout = Vin / (1-D)`，前提是连续导通模式（continuous conduction mode / CCM）和理想器件。
- 电感电流纹波主要由 `L`、`fs`、输入输出电压决定；电容电压纹波主要由 `C`、负载电流和开关频率决定。
- 电压闭环 PI 输出通常是占空比或电流参考，必须限幅；Boost 占空比接近 1 时系统会变得非常敏感。
- 双闭环时，电流内环要比电压外环快；外环给电流参考，内环控制电感电流。

必须观察：

- `Vout` 与 `Vref`。
- 电感电流 `iL`，确认是否 CCM，是否有过流。
- 占空比 `D` 或 PWM 比较值，确认没有长期顶到限幅。
- MOSFET/二极管电流、电压应力。
- 负载阶跃时的超调、恢复时间、稳态误差。

正确表现：

- `Vout` 启动时按斜坡或闭环动态上升，不应猛烈过冲。
- 稳态误差接近 0，纹波频率为开关频率或其相关倍频。
- Boost 的电感电流不应掉到 0，除非你有意仿真 DCM。
- 负载加重时 `Vout` 瞬间下跌，随后恢复；占空比增加。

参考链接：

- Boost 电压闭环示例，含 PI、负载阶跃和输出电压波形：  
  https://www.mathworks.com/help/sps/ug/boost-converter-voltage-control.html
- DC/DC PI 设计示例：  
  https://www.mathworks.com/help/sps/ug/design-pi-controller-for-dc-dc-converter.html
- CCM Boost PFC 示例中有线电压/线电流/输出电压波形：  
  https://www.mathworks.com/help/sps/ug/power-factor-correction-for-ccm-boost-converter.html

### C. 单相 Boost PFC

基本理论：

- PFC 的目标不是单纯升压，而是让输入电流跟随输入电压，降低谐波，提高功率因数。
- 控制结构通常是电压外环 + 电流内环。电压外环产生输入电流幅值，乘以整流电压同步信号后得到电流参考。
- 电压外环必须慢，否则会把二倍工频纹波调进输入电流，导致电流畸变。

必须观察：

- 输入线电压 `Vac` 与输入电流 `Iac`。
- DC 输出电压 `Vdc`。
- 电感电流 `iL`。
- 电流参考 `iL_ref` 与实际 `iL`。
- 功率因数 PF、输入电流 THD。

正确表现：

- 稳态时输入电流近似正弦，并与输入电压同相。
- `Vdc` 高于输入整流峰值，并能稳定在参考值。
- 负载阶跃时 `Vdc` 有短暂偏移，输入电流幅值随负载增加而增加。
- 电压外环输出不应出现明显 100 Hz/120 Hz 大幅振荡。

参考链接：

- MathWorks CCM Boost PFC，页面说明电感电流和输出电压均由 PI 控制，图中展示线电压、线电流和输出电压：  
  https://www.mathworks.com/help/sps/ug/power-factor-correction-for-ccm-boost-converter.html

### D. 三相 PFC / 三相 PWM 整流器

基本理论：

- 三相 PWM 整流器本质是可控 AC/DC 电压源变换器。
- 锁相环（phase-locked loop / PLL）给出电网角度 `theta`，abc 量经 Park 变换得到 dq 量。
- 若 d 轴对准电网电压矢量，`id` 主要控制有功功率，`iq` 主要控制无功功率。单位功率因数时 `iq_ref` 通常为 0。
- 常见控制是 DC 母线电压外环 + dq 电流内环 + 交叉耦合前馈补偿 + PWM/SVPWM。

必须观察：

- 三相电压 `Va/Vb/Vc` 和三相输入电流 `Ia/Ib/Ic`。
- `Vdc` 与 `Vdc_ref`。
- `id/iq` 与 `id_ref/iq_ref`。
- PLL 输出角度 `theta` 和电网频率估计。
- 有功功率 P、无功功率 Q、PF、THD。
- 调制波、PWM、桥臂相电压、线电压。

正确表现：

- 三相输入电流平衡，近似正弦。
- 单位功率因数时电流与相电压同相，`iq` 接近 0。
- `Vdc` 在负载阶跃后恢复，不应长期漂移。
- `id` 随负载增加而增加；`iq` 若设为 0，应只小幅波动。
- 三相电流若相序反、dq 轴符号错，常见现象是 `Vdc` 控不住、`iq` 大、PF 低或电流反向。

参考链接：

- MathWorks 三相 PFC 设计示例，页面图中包含 DC Bus Voltage、Phase Voltage and Current、Active Power、Reactive Power：  
  https://www.mathworks.com/help/sps/ug/power-factor-correction-rectifier-design.html
- 三相并网整流控制示例：  
  https://www.mathworks.com/help/sps/ug/grid-connected-rectifier.html
- 中文论文型资料：基于 MATLAB 的三相电压型 PWM 整流系统仿真：  
  https://softdown.elecfans.net/q/elecfans.com-%E5%9F%BA%E4%BA%8EMATLAB%E7%9A%84%E4%B8%89%E7%9B%B8%E7%94%B5%E5%8E%8B%E5%9E%8BPWM%E6%95%B4%E6%B5%81%E7%B3%BB%E7%BB%9F%E4%BB%BF%E7%9C%9F.pdf

### E. Vienna 整流器

基本理论：

- Vienna 是三相三电平 PFC 整流器，每相通常一个主动开关和二极管网络，适合单向 AC/DC、高功率密度、高功率因数场景。
- DC 母线由上下两个电容组成，中点电位必须平衡。
- 控制目标有三个：总 DC 电压稳定、输入电流正弦同相、中点电压平衡。
- 中点电压受电流方向、开关状态和冗余矢量选择影响。

必须观察：

- `Vdc_total = Vc_top + Vc_bottom`。
- `Vc_top`、`Vc_bottom`、`Vneutral_error = Vc_top - Vc_bottom`。
- 三相输入电流、输入电压。
- `id/iq`、PF、THD。
- 三相开关脉冲和每相电流方向。
- 负载阶跃时的 DC 电压和中点电压。

正确表现：

- 总母线电压稳定在参考值。
- 上下电容电压长期平均相等，偏差只在小范围内波动。
- 输入电流接近正弦，并与电网电压同相。
- 负载阶跃后输入电流幅值增加，母线电压短暂跌落后恢复。
- 如果中点偏差持续累积，通常是中点平衡符号、冗余矢量选择、电流方向定义或电容初值错。

参考链接：

- MathWorks Vienna Rectifier Control，页面说明闭环控制、SVM、DC 侧负载阶跃，并展示 DC-link 电压和电网电流：  
  https://www.mathworks.com/help/sps/ug/vienna_rectifier.html
- MathWorks Vienna PWM Generator：  
  https://www.mathworks.com/help/sps/ref/pwmgeneratorviennarectifier.html
- 知乎三相 Vienna 双闭环 PI + SVPWM，给出 PF、THD、中点偏差等目标描述：  
  https://zhuanlan.zhihu.com/p/1992348193736910667

### F. 三电平 SPWM/SVPWM、T 型/I 型 NPC

基本理论：

- 三电平每相桥臂输出 `P/O/N` 三种状态，对应 `+Vdc/2`、`0`、`-Vdc/2`。
- 三相共有 27 种开关状态，可形成多个空间电压矢量。
- SPWM 侧重载波比较，容易搭建；SVPWM 以空间矢量合成为核心，母线利用率更高，也更适合做冗余矢量和中点平衡。
- I 型 NPC 通过二极管箝位到中点；T 型通过双向开关实现中点连接。控制参考可相似，但门极映射和导通路径不同。

必须观察：

- 每相桥臂状态 `Sa/Sb/Sc`，确认只出现合法 P/O/N。
- 12 路门极信号，确认同一桥臂互补关系和死区。
- 相电压 `Van/Vbn/Vcn`：应有三电平特征。
- 线电压 `Vab/Vbc/Vca`：应有五电平特征。
- 输出电感电流和负载电流。
- 上下电容电压和中点误差。
- 调制比 `m`，避免无意进入过调制。

正确表现：

- 相电压阶梯值清晰，线电压电平数比相电压更多。
- 输出电流经滤波后近似正弦。
- 三相电压/电流相差 120°。
- 中点电压不应单方向漂移。
- 若出现直通、门极顺序错、P/O/N 映射错，常见表现是 DC 母线电流尖峰、相电压电平缺失或输出严重畸变。

参考链接：

- MathWorks 三相三电平 PWM 模块说明 12 路脉冲、中点平衡输入和调制波输出：  
  https://www.mathworks.com/help/sps/ref/pwmgeneratorthreephasethreelevel.html
- MathWorks 中文示例“三相三电平 PWM 发生器”，含负载电压、负载电流和频谱结果图：  
  https://ww2.mathworks.cn/help/sps/ug/three-phase-three-level-pwm-generator.html
- 三电平 SVPWM 与中点平衡中文资料：  
  https://html.rhhz.net/nmgdljs/202000025.htm
- TI 中文资料：三电平逆变器 SVPWM 方法的分析与研究：  
  https://e2echina.ti.com/cfs-file/__key/communityserver-discussions-components-files/56/_094E3575735E0690D8536856_SVPWM_B965D56CFF4E1F77_.pdf

### G. 交错并联逆变/变换器

基本理论：

- 交错并联是多个功率单元并联工作，每个单元 PWM 相位错开 `360°/N`。
- 好处是等效输出纹波频率提高、单支路电流下降、热分布更均匀。
- 风险是支路参数不一致导致均流误差，非隔离并联会产生环流。
- 需要支路电感、均流控制、虚拟阻抗或环流抑制控制。

必须观察：

- 每个并联支路电感电流 `iL1/iL2/.../iLN`。
- 总输出电流 `iout = sum(iLk)`。
- 均流误差 `iLk - iout/N`。
- 环流分量，例如两支路时 `icirc = (iL1 - iL2)/2`。
- 各支路 PWM 相位差。
- 输出电压、电流 THD、滤波器电流纹波。
- 支路器件电流峰值和 RMS。

正确表现：

- N 相交错时，各支路电流平均值接近，总电流纹波明显小于单支路纹波。
- 两相交错应约 180°，三相约 120°，四相约 90°。
- 环流平均值应接近 0，不能随着时间累积。
- 负载阶跃后各支路电流共同变化，不应某一路长期多分担。
- 如果相位没有错开，总纹波不会下降；如果并联点、滤波电感或采样方向错，均流环会越调越偏。

参考链接：

- TI F2833x ePWM 技术手册里有多 Buck 和三相交错 DC/DC 的 ePWM 相移配置波形，可作为 DSP 相位错开参考：  
  https://www.ti.com/lit/ug/sprui07/sprui07.pdf
- 并联交错变换器环流控制综述型文章：  
  https://www.mdpi.com/2075-1702/11/9/878
- 并联交错三电平逆变器与环流抑制参考：  
  https://www.researchgate.net/publication/365641524_Interleaved_operation_of_parallel_three-level_inverter_and_suppression_of_circulating_current

### H. 前级整流 + 后级逆变系统

基本理论：

- 前级负责从电网吸收有功功率并稳定 DC 母线；后级负责向 AC 负载输出电压/电流。
- 两级通过 DC 母线耦合。后级负载突变会先反映为母线能量变化，再由前级慢慢补偿。
- 控制带宽应分层：电流内环最快，电压环较慢，能量管理/模式切换更慢。
- UPS 场景还要考虑旁路、市电/电池切换、限流、短路保护、母线软启动。

必须观察：

- 前级输入：三相电压、电流、PF、THD、P/Q。
- DC 母线：`Vdc`、上下电容电压、母线电流、母线功率。
- 后级输出：AC 输出电压、电感电流、负载电流、THD、频率、相位。
- 功率平衡：`Pin`、`Pdc`、`Pout`、损耗。
- 保护信号：过压、欠压、过流、短路、PLL 失锁、过温占位信号。

正确表现：

- 稳态时 `Pin ≈ Pout + losses`。
- 后级负载加重时，DC 母线先下跌，前级输入电流幅值增加，母线恢复。
- 后级输出电压应基本保持幅值和频率，电流随负载变化。
- 若前级限功率，后级必须降额或母线下跌触发保护。

参考链接：

- MathWorks DC Fast Charger，包含三相 UPF 前端、800 V DC 母线、两电平/三电平前端、隔离 DC/DC 和电池负载，结果图含 DC bus 电压/电流、电池端电压和充电电流：  
  https://www.mathworks.com/help/sps/ug/dc-fast-charger.html

## 从仿真到 UPS 软件模块的映射

做 UPS 软件开发时，不要只保存 Scope 截图。每一张波形都应该能对应到一个软件模块、一个采样量、一个控制输出或一个保护条件。

| 仿真对象 | 软件模块 | 输入量 | 输出量 | 常见问题 |
|---|---|---|---|---|
| Boost/PFC 电压环 | `control_pfc_voltage_loop` | `Vdc`, `Vdc_ref` | `id_ref` 或电流幅值 | 外环太快导致输入电流畸变，外环太慢导致母线恢复慢 |
| PFC 电流环 | `control_pfc_current_loop` | `ia/ib/ic`, `id/iq`, `id_ref/iq_ref` | `vd/vq` 或调制量 | 相序、采样方向、dq 符号错误导致 PF 低或母线失控 |
| PLL | `grid_pll` | 输入电压 `va/vb/vc` | `theta`, `sin/cos`, `freq` | 电压畸变或相序错误导致角度抖动、dq 控制异常 |
| DC 母线 | `dc_bus_monitor` | `Vdc`, `Vcap_top`, `Vcap_bottom` | 保护标志、中点平衡量 | 过压、欠压、中点漂移、启动冲击 |
| 逆变电压环 | `control_inv_voltage_loop` | 输出电压 `vo`, `vo_ref` | 电流参考或调制量 | 负载阶跃恢复慢，非线性负载下 THD 大 |
| 逆变电流环 | `control_inv_current_loop` | 电感电流、负载电流 | PWM 调制量 | 限流策略不清，短路时电流失控 |
| 三电平调制 | `svpwm_3level` / `spwm_3level` | `v_alpha/v_beta` 或三相参考 | 12 路门极命令 | P/O/N 映射错、死区错、中点漂移 |
| 交错并联 | `current_share` | 各支路电流、总电流 | 支路均流补偿 | 均流误差、环流、相位错开配置错误 |
| 硬件保护 | `protection_fast` + CMPSS/ePWM Trip | 电流比较器、驱动故障 | PWM 立即关断 | 保护太慢、误触发、故障解除后恢复逻辑错误 |
| 状态机 | `ups_state_machine` | 电网、电池、母线、输出、故障 | 模式、继电器、PWM 使能 | 模式切换条件不完整，故障锁存不清 |
| 通信与参数 | `comm` / `param` | 上位机命令、EEPROM/Flash 参数 | 参数更新、状态上报 | 参数越界、在线更新影响快环、故障数据不足 |

建议的固件调试顺序：

1. 先固定功率级和负载，只调采样换算，确认 ADC count 到物理量正确。
2. 只开 PWM 开环小占空比，确认门极、死区、相序和电压极性。
3. 开电流内环，限小电流，确认方向和限幅。
4. 开电压外环，使用软启动，观察阶跃恢复。
5. 加保护阈值和 Trip Zone，故障注入验证。
6. 最后加状态机、通信、日志和参数在线更新。

## TMS320F28075 外设到电力电子控制的映射

说明：既然 TMS320F28335 没有 Control Law Accelerator（CLA，控制律加速器），后续 DSP 学习建议以 TMS320F28075 为例。F28075 属于 C2000 F2807x 系列，TI 官方产品页标注其为 120 MHz C28x MCU，带 FPU、TMU、512 KB Flash、CLA 和 SDFM；官方还列出最多 3 个 12-bit ADC、24 路 PWM、16 路 HRPWM、6 个 eCAP、CMPSS 和 DAC 等资源。它更贴近数字电源、PFC、逆变器和交错并联系统的真实固件结构。

官方资料入口：

- F28075 产品页：  
  https://www.ti.com/product/TMS320F28075
- F2807x 数据手册：  
  https://www.ti.com/lit/ds/symlink/tms320f28075.pdf
- F2807x Technical Reference Manual，含 System Control、ADC、ePWM、CMPSS、SDFM、eCAP、CLA 等章节：  
  https://www.ti.com/lit/pdf/spruhm9
- C2000 CLA 软件指南：  
  https://software-dl.ti.com/C2000/docs/cla_software_dev_guide/intro.html

### 1. 系统时钟 System Clock

作用：

- 给 CPU、ADC、ePWM、eCAP、通信外设提供时间基准。
- 决定 PWM 分辨率、ADC 触发周期、中断周期和控制算法可用计算时间。

在电力电子系统中的位置：

- `SYSCLKOUT` 决定控制器一拍能算多少。
- `TBCLK` 决定 ePWM 计数速度。
- `ADCCLK` 决定 ADC 转换速度。

F28075 常见配置思路：

- 使用内部 10 MHz 振荡器或外部晶振作为 PLL 输入，最终配置到 120 MHz SYSCLK。
- 开启需要的外设时钟：ePWM、ADC、CMPSS、SDFM、eCAP、CLA、DMA、GPIO。
- 初始化 PIE 中断控制器和向量表。
- 配置低速外设时钟分频，避免通信外设和捕获外设时钟超限。

配置检查：

- PWM 频率是否由 `SYSCLKOUT -> TBCLK -> TBPRD` 正确计算。
- ADC 时钟不要超过手册限制。
- 控制 ISR 执行时间必须小于 PWM 周期，最好留 30% 以上余量。

### 2. ADC

作用：

- 采样电网电压、输入电流、DC 母线电压、逆变输出电压、输出电流、温度、辅助电源等模拟量。

在系统中的用法：

- ePWM 在固定计数点触发 ADC SOC，保证每个 PWM 周期采样点一致。
- 常见采样点是 PWM 中点，避开开关噪声。
- ADC 中断或 ePWM 中断中读取结果，做标定、滤波、保护判断和控制计算。

F28075 配置思路：

- 配置 ADC 时钟分频、采样保持窗口 `ACQPS` 和参考源。
- 利用多 ADC 模块并行采样，适合三相电流、三相电压或并联支路电流同步采样。
- 配置通道序列，例如：
  - `ADCINA0`: DC 母线电压。
  - `ADCINA1/A2/A3`: 三相输入电流。
  - `ADCINB0/B1/B2`: 输出电压/输出电流。
- 配置 ePWM SOCA/SOCB 触发 ADC。
- 配置 ADC 中断，或者用 ADC 中断直接触发 CLA task。
- 用 ADC Post Processing Block 做偏置校正、限值比较、过零检测或触发延时记录。
- 做零点偏置校准，尤其是霍尔电流、采样电阻放大器和隔离采样。

配置检查：

- ADC 结果先换算成物理量，不要直接拿 ADC count 进 PI。
- 电流方向必须与控制方程一致。
- 采样延迟要在高带宽电流环中考虑。
- 三相电流最好在同一个 PWM 周期的等效时刻采样，否则 dq 变换会引入相位误差。

补充：F28075 还有 CMPSS 和 SDFM，数字电源里很关键。

- CMPSS：高速比较器子系统，用模拟电流/电压与 DAC 阈值比较，直接触发 ePWM Trip Zone，适合硬件级过流/短路保护。
- SDFM：Sigma-Delta Filter Module，常用于隔离 Sigma-Delta 调制器电流/电压采样，适合高压侧隔离采样。

### 3. ePWM

作用：

- 产生整流器、逆变器、DC/DC 的 PWM 门极信号。
- 触发 ADC 采样。
- 通过 Trip Zone 快速关断功率器件。
- 通过相位寄存器实现交错并联相移。

在系统中的用法：

- 前级三相 PFC：通常需要 3 组互补 PWM。
- 三电平逆变：需要更多门极，通常由多个 ePWM 和门极映射逻辑组合。
- 交错并联：每个功率单元使用独立 ePWM，主从同步，相位错开。

F28075 配置思路：

- Time-Base：设置 `TBPRD`、计数模式、同步关系。
- Counter-Compare：设置 `CMPA/CMPB` 对应占空比。
- Action-Qualifier：设置计数到零、周期、比较点时 PWM 输出动作。
- Dead-Band：配置上下管互补和死区。
- Event Trigger：配置 ePWM SOCA/SOCB 触发 ADC。
- Trip Zone：配置过流/故障输入时强制 PWM 输出安全态。
- Phase：交错并联时配置 `TBPHS` 和同步链路。
- HRPWM：如果需要更高占空比分辨率，配置高分辨率 PWM，尤其适合高频 DC/DC 或小占空比精细调节。
- Digital Compare：把 CMPSS、SDFM 比较结果或外部故障信号接入 ePWM，快速触发 Trip。

常用计算：

- 上下计数模式：`fpwm = TBCLK / (2 * TBPRD)`。
- 单向上计数模式：`fpwm = TBCLK / TBPRD`。
- 死区计数：`DBRED/DBFED = tdead / T_TBCLK`。
- N 相交错：相位目标为 `360°/N`，换算为 time-base 计数后写入从模块 `TBPHS`，实际值要用示波器复核。

配置检查：

- 同一桥臂不能直通。
- PWM 更新应使用 shadow register，在零点或周期点同步加载。
- ADC 触发点应避开开关瞬间。
- Trip Zone 必须硬件优先，不能只靠软件关断。
- 交错并联时，主从 ePWM 的同步链路、相位寄存器和 shadow load 时刻要一起检查。

### 4. eCAP

作用：

- 捕获外部脉冲边沿时间，测频率、周期、占空比、相位差。
- 也可在 APWM 模式下产生简单 PWM，但电力电子主 PWM 通常用 ePWM。

在系统中的用法：

- 测量电网过零/同步脉冲周期。
- 测量外部 PWM、编码器辅助脉冲、风扇测速、旁路同步信号。
- 调试时测量另一路控制板或驱动板反馈脉冲。

F28075 配置思路：

- 选择 GPIO 复用到 eCAP。
- 设置捕获边沿：上升沿、下降沿或连续多边沿。
- 设置是否每次捕获后复位计数器。
- 配置 eCAP 中断，在捕获事件后读取 `CAP1/CAP2/...`。
- 根据 `CAP` 差值和 `SYSCLKOUT`/分频换算周期、频率和占空比。

配置检查：

- 输入信号要经过硬件整形或隔离，避免毛刺。
- 捕获中断优先级不要高过电流保护和 PWM 控制快环。
- 并网 PLL 不一定要用 eCAP，很多数字电源直接用 ADC 采样电压做软件 PLL。

### 5. CLA

作用：

- CLA 是 Control Law Accelerator，控制律加速器。它能和 C28x CPU 并行执行控制算法，适合电流环、坐标变换、滤波、保护预处理等快任务。

F28075 配置思路：

- 把 ADC 中断、ePWM 事件或软件事件配置为 CLA task 触发源。
- 把快环变量、ADC 结果缓存、PI 状态量和输出命令放到 CLA 可访问 RAM。
- CLA task 中执行快任务，例如：
  - ADC 物理量换算。
  - Clarke/Park 变换。
  - 电流环 PI 或 PR。
  - dq 解耦和限幅。
  - SVPWM/SPWM 中间量计算。
  - 快速保护预判断。
- C28x CPU 执行慢任务，例如：
  - 电压外环。
  - PLL 慢速监控。
  - 状态机。
  - 通信。
  - 故障记录。
  - 参数在线更新。

配置检查：

- CLA 不能随意访问所有 CPU 内存，变量必须放在 CLA 可访问的 LS RAM 或 message RAM。
- CPU 和 CLA 共享变量要明确方向：CPU-to-CLA、CLA-to-CPU，避免读写竞争。
- CLA task 运行时间必须小于触发周期。
- CLA 中不要放复杂状态机，快环代码越短越可靠。

### 典型数字电源控制周期

一个 PWM 周期内的推荐顺序：

1. ePWM 计数到设定点，触发 ADC SOC。
2. ADC 完成采样，进入 ADC ISR 或等待 ePWM ISR 读取。
3. 软件换算物理量，做偏置校正和低通滤波。
4. 快速保护判断：过流、过压、欠压、采样异常。
5. 执行控制算法：PLL、dq 变换、电压环、电流环、限幅、SVPWM/SPWM。
6. 更新 ePWM shadow compare 寄存器。
7. 下一个 PWM 零点/周期点统一加载新占空比。

对你的最终拓扑，建议 F28075 外设分工：

- 系统时钟：统一决定控制节拍，例如 10 kHz/20 kHz PWM 和等频控制 ISR。
- ADC：采前级三相电压电流、DC 母线、后级输出电压电流、各并联支路电流。
- ePWM：产生前级整流 PWM、后级逆变 PWM、交错相移 PWM，并触发 ADC。
- CMPSS/SDFM：做过流、短路、过压等硬件级快速保护，优先联动 ePWM Trip Zone。
- eCAP：测外部同步、旁路频率、调试脉冲或风扇测速；并网 PLL 主路径优先用 ADC 电压采样。
- CLA：放前级/后级电流快环、坐标变换、SVPWM 中间计算；CPU 保留慢环、状态机、通信和故障管理。
