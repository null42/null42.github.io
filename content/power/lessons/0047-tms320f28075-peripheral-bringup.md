---
title: 教程 0047：TMS320F28075 外设从零配置
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0047-tms320f28075-peripheral-bringup.html
status: learning
visibility: public
summary: Imported from 0047-tms320f28075-peripheral-bringup.html
chapterOrder: 10
---

# 教程 0047：TMS320F28075 外设从零配置

中文主讲。一个概念：以 TMS320F28075 为例，从官方资料、最小工程、时钟、GPIO、中断、ePWM、ADC、保护和通信开始，把 UPS/PCS 控制 ISR 需要的 DSP 外设逐步接起来。

    目录

- 官方资料先行

- 从零配置总流程

- Step 0 到 Step 12 的逐步配置

- UPS/PCS 外设映射表

- 映射表外设的具体配置模板

- 最小代码骨架

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用 TI 官方公开资料和教学配置路径，不包含公司内部原理图、引脚分配、真实 PWM 频率、ADC 标定、保护阈值、通信协议或客户项目参数。

## 1. 官方资料先行

**先找资料，再写代码。**F28075 外设配置不要从网上零散代码开始抄，先确认以下官方资料：

- [TI TMS320F28075 产品页](https://www.ti.com/product/TMS320F28075)：确认芯片状态、主要参数和文档入口。

- [TMS320F2807x Real-Time Microcontrollers datasheet](https://www.ti.com/lit/ds/symlink/tms320f28075.pdf)：确认封装、引脚、外设数量、电气约束和特性。

- [TMS320F2807x Technical Reference Manual](https://www.ti.com/lit/pdf/spruhm9)：查外设寄存器、时钟、中断、ePWM、ADC、Trip Zone、SCI、CAN、SPI、I2C、eCAP、eQEP、CLA、DMA 的具体配置。

- [C2000Ware](https://www.ti.com/tool/C2000WARE)：获取 device support、driverlib、bit-field 示例和外设例程。

资料分工要清楚：datasheet 用来回答“这个芯片有什么、引脚能不能这样用、电气边界是什么”；Technical Reference Manual 用来回答“寄存器怎么配、模块内部怎么工作”；C2000Ware 用来回答“TI 推荐的初始化顺序和示例工程长什么样”。

## 2. 从零配置总流程

F28075 外设 bring-up 的顺序建议固定为：先让工程稳定运行，再让时钟和 GPIO 正确，再让中断可控，再让 PWM 产生时间基准，再让 ADC 被 PWM 触发，最后接保护和通信。不要一上来同时打开所有外设。

## 3. Step 0 到 Step 12 的逐步配置

### Step 0：确认芯片和资料版本

动作：确认目标是 TMS320F28075，记录 datasheet、Technical Reference Manual、C2000Ware 版本，并确认封装和控制板原理图对应。

意义：同一 F2807x 系列不同封装的 GPIO、ADC 通道和外设引脚可能不同。先确认资料版本，可以避免“代码对但引脚不对”的低级错误。

### Step 1：安装 CCS 与 C2000Ware

动作：安装 Code Composer Studio，安装 C2000Ware，先打开 F2807x 的 empty project、GPIO、ePWM、ADC 示例。

意义：为什么先从 TI 示例工程开始？因为启动文件、链接命令文件、Flash 初始化、device header、driverlib 路径和 GEL/target 配置都容易出错。示例工程先跑通，等于证明工具链、仿真器和芯片连接没有问题。

### Step 2：从空工程到最小 main

动作：创建最小工程，只做 device init、GPIO 翻转和空循环，不开 PWM、不进控制 ISR。

  int main(void)
{
    Device_init();
    Device_initGPIO();
    Interrupt_initModule();
    Interrupt_initVectorTable();
    Board_initMinimalGpio();

    for(;;) {
        ToggleHeartbeatGpio();
        DEVICE_DELAY_US(500000);
    }
}

意义：最小 main 的目标不是控制电源，而是证明 CPU、Flash/RAM、看门狗、GPIO 和下载调试路径是活的。没有这个基线，后续 PWM 或 ADC 出问题时无法定位。

### Step 3：系统时钟、看门狗和 Flash 等待周期

动作：配置系统 PLL、低速外设时钟、看门狗策略和 Flash wait states。F28075 是 C2000 实时控制 MCU，产品页和 datasheet 给出 120 MHz 级别 CPU/FPU/TMU/CLA 能力，但工程仍要按板卡晶振和启动方式配置。

意义：时钟决定所有外设时间尺度。PWM 周期、ADC 采样窗口、SCI 波特率、CAN 位时序都依赖系统时钟。Flash 等待周期错误会导致代码在高频下随机异常。

### Step 4：GPIO 复用、方向和上拉

动作：为每个引脚确认三件事：GPIO mux 选择哪个外设功能、方向是输入还是输出、是否启用上拉/输入资格滤波。

意义：F28075 有大量可复用 GPIO。PWM、ADC 外部触发、SCI、CAN、SPI、I2C、eCAP、eQEP 都要先过引脚复用这一关。控制板 bring-up 时建议先用示波器看 PWM 引脚、GPIO 心跳和保护输入。

### Step 5：PIE、中断向量表和 ISR

动作：初始化 外设中断扩展控制器（Peripheral Interrupt Expansion / PIE），注册 ISR，清中断标志，使能 PIE group 和 CPU interrupt。

意义：C2000 的中断不是只写一个函数名。外设标志、PIE ACK、CPU IER 和全局中断都要配对。控制 ISR 建议先用 ePWM 中断或 ADC EOC 中断固定触发，再逐步加入计算。

### Step 6：ePWM 时基、比较、动作限定和死区

动作：配置 增强型脉宽调制器（enhanced pulse-width modulator / ePWM） 的 TBCLK、计数模式、周期 TBPRD、比较 CMPA/CMPB、动作限定 AQ、死区 Dead-Band、同步链路。

意义：为什么 PWM 要作为控制系统的时间基准？UPS/PCS 控制是采样控制系统，PWM 周期就是功率级动作周期。让 ePWM 作为统一时间基准，可以把 ADC 采样、控制 ISR 和占空比更新锁在同一个节拍上。

### Step 7：ePWM 触发 ADC SOC

动作：配置 ePWM 的 SOCA/SOCB，在计数器等于零点、周期点或比较点时触发 ADC SOC。

意义：为什么 ADC 采样点要锁定到 PWM 周期里的固定位置？电流和电压在开关瞬间有噪声和尖峰，固定采样点可以提高重复性。PFC、逆变器和 PCS 电流环都依赖“每次在同一个物理时刻采样”。

### Step 8：ADC 参考、采样窗口、SOC 和 EOC 中断

动作：配置 ADC 模块、通道选择、采样保持窗口 ACQPS、SOC 触发源、转换结束 EOC 和 ADC interrupt。datasheet 说明 F2807x 包含 12-bit SAR ADC，具体通道和性能要按器件封装查表。

意义：采样窗口太短会让源阻抗和采样电容导致误差；EOC 中断选错会让 ISR 读到旧值。UPS/PCS 中，ADC 配置直接影响电流环、保护和功率计算。

### Step 9：Trip Zone 与过流快速关断

动作：把比较器、GPIO 故障脚或 XBAR 保护信号接到 ePWM Trip Zone，配置 one-shot 或 cycle-by-cycle 动作，让 PWM 在硬件路径上拉低或进入高阻。

意义：为什么 Trip Zone 不能等软件保护慢慢判断？过流和驱动故障的时间尺度可能比控制 ISR 更快。硬件 Trip Zone 是“先保命，再上报”的路径；软件保护负责记录、锁存和复位条件。

### Step 10：SCI、CAN、SPI、I2C 通信外设

动作：SCI 用于调试串口或上位机文本协议；CAN 用于 BMS、并机或工业通信；SPI 常接隔离 ADC、DAC、驱动器或外部存储；I2C 常接 EEPROM、温度传感器或低速配置器件。

意义：为什么通信外设不能放进高频控制 ISR 里阻塞等待？控制 ISR 要稳定在微秒级完成，通信收发存在等待、重试和突发流量，应放在后台任务、中断缓冲或低频调度器中。

### Step 11：eCAP、eQEP、CLA、DMA 的使用边界

动作：eCAP 用于捕获外部频率、脉宽或同步信号；eQEP 用于编码器位置；CLA 可执行时间敏感控制任务；DMA 可搬运 ADC 结果或通信数据。

意义：为什么 CLA/DMA 是减轻 CPU 负担而不是替代系统状态机？CLA 适合固定数学计算，DMA 适合数据搬运；模式切换、故障闭环、参数管理和通信仲裁仍要由主 CPU 的系统软件统一协调。

### Step 12：把外设接入 UPS/PCS 控制 ISR

动作：形成固定链路：ePWM 触发 ADC -> ADC EOC 进入 ISR -> 读取采样 -> 标幺化和滤波 -> 保护快速判断 -> 控制算法 -> 限幅 -> 更新 ePWM compare -> 清中断。

意义：这一步才把外设从“能单独工作”接成“能控制功率级”。先不要上高压，建议用低压、假负载、示波器和日志逐级验证。

## 4. UPS/PCS 外设映射表

| 外设 | 在 UPS/PCS 中的典型角色 | 先验收什么 |
| --- | --- | --- |
| ePWM | PFC、DC-DC、逆变器桥臂 PWM，ADC 触发源 | 频率、互补、死区、同步、Trip 动作 |
| ADC | 采样输入电压、电感电流、母线电压、输出电压、电池电流 | 通道、采样时刻、标定、EOC 中断 |
| Trip Zone / XBAR / CMPSS | 过流、过压、驱动故障快速封锁 PWM | 硬件故障注入后 PWM 是否立即安全 |
| SCI / CAN / SPI / I2C | 调试、BMS、并机、参数存储、外部采样或驱动器配置 | 收发缓冲、错误处理、低频调度 |
| eCAP / eQEP | 频率捕获、旁路同步、风扇/编码器等扩展输入 | 捕获周期、溢出、输入滤波 |
| CLA / DMA | 控制计算加速、数据搬运 | 触发源、内存归属、主 CPU 同步边界 |

## 5. 映射表外设的具体配置模板

下面不是完整可编译工程，而是从零配置时的“逐项清单”。实际工程建议优先使用 C2000Ware DriverLib 或 TI bit-field 示例，再对照 Technical Reference Manual 核对寄存器。

### 5.1 ePWM：桥臂 PWM 与 ADC 触发

**目的：**给 PFC、DC-DC、逆变器桥臂输出互补 PWM，同时提供 ADC 采样触发点。

- 打开外设时钟：`SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_EPWM1)`。意义是让 ePWM 寄存器真正工作。

- 配置引脚复用：`GPIO_setPinConfig(GPIO_0_EPWM1_A)`、`GPIO_setPinConfig(GPIO_1_EPWM1_B)`。意义是把 GPIO 功能切到 PWM 输出。

- 设置时基：`EPWM_setTimeBasePeriod()` 对应寄存器 `TBPRD`，`EPWM_setTimeBaseCounterMode()` 对应计数模式。意义是确定 PWM 频率和上/下计数方式。

- 设置占空比：`EPWM_setCounterCompareValue()` 对应 `CMPA`/`CMPB`。意义是控制桥臂导通时间。

- 设置动作限定：`EPWM_setActionQualifierAction()` 对应 `AQCTLA`/`AQCTLB`。意义是定义计数器到零、周期、比较点时 PWM 引脚如何翻转。

- 设置死区：`EPWM_setRisingEdgeDeadBandDelayInput()`、`EPWM_setFallingEdgeDeadBandDelayInput()`，对应 `DBRED/DBFED`。意义是避免上下管直通。

- 设置 ADC 触发：`EPWM_enableADCTrigger()`、`EPWM_setADCTriggerSource()`。意义是把采样点锁定到 PWM 周期里的固定位置。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_EPWM1);
GPIO_setPinConfig(GPIO_0_EPWM1_A);
GPIO_setPinConfig(GPIO_1_EPWM1_B);
EPWM_setTimeBasePeriod(EPWM1_BASE, pwmPeriod);       // TBPRD
EPWM_setCounterCompareValue(EPWM1_BASE, EPWM_COUNTER_COMPARE_A, cmpA); // CMPA
EPWM_setActionQualifierAction(EPWM1_BASE, EPWM_AQ_OUTPUT_A,
    EPWM_AQ_OUTPUT_HIGH, EPWM_AQ_OUTPUT_ON_TIMEBASE_ZERO);             // AQCTLA
EPWM_setRisingEdgeDeadBandDelayInput(EPWM1_BASE, EPWM_DB_INPUT_EPWMA);
EPWM_setFallingEdgeDeadBandDelayInput(EPWM1_BASE, EPWM_DB_INPUT_EPWMA);
EPWM_setRisingEdgeDelayCount(EPWM1_BASE, dbred);       // DBRED
EPWM_setFallingEdgeDelayCount(EPWM1_BASE, dbfed);      // DBFED
EPWM_enableADCTrigger(EPWM1_BASE, EPWM_SOC_A);

**验收：**示波器看到频率正确、A/B 互补、死区存在；改变 `CMPA` 后占空比变化；SOCA 触发 ADC 的时间点稳定。

### 5.2 ADC：电压电流采样链路

**目的：**采集母线电压、电感电流、输出电压、电池电流等控制和保护量。

- 打开 ADC 时钟并上电：`SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_ADCA)`、`ADC_enableConverter()`。意义是让 ADC 模块可转换。

- 设置分辨率和信号模式：`ADC_setMode()`。意义是明确 12-bit/16-bit、单端/差分等模式。

- 设置 SOC：`ADC_setupSOC()` 对应 `ADCSOCxCTL`，选择通道、触发源和采样窗口。

- 设置 EOC 中断：`ADC_setInterruptSource()`、`ADC_enableInterrupt()`，对应 `ADCINTSEL1N2`。意义是转换完成后进入控制 ISR 或置位标志。

- 读取结果：`ADC_readResult()`。意义是把原始码值转成工程量或标幺值。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_ADCA);
ADC_setMode(ADCA_BASE, ADC_RESOLUTION_12BIT, ADC_MODE_SINGLE_ENDED);
ADC_enableConverter(ADCA_BASE);
ADC_setupSOC(ADCA_BASE, ADC_SOC_NUMBER0, ADC_TRIGGER_EPWM1_SOCA,
             ADC_CH_ADCIN0, sampleWindow);  // ADCSOC0CTL
ADC_setInterruptSource(ADCA_BASE, ADC_INT_NUMBER1, ADC_SOC_NUMBER0); // ADCINTSEL1N2
ADC_enableInterrupt(ADCA_BASE, ADC_INT_NUMBER1);

**验收：**用固定电压源输入 ADC，码值随输入线性变化；PWM 频率变化时采样仍在固定触发点；EOC 中断频率等于控制频率。

### 5.3 CMPSS、XBAR、Trip Zone：硬件快速保护链路

**目的：**过流、过压或驱动故障发生时，不等 CPU 判断，硬件直接封锁 PWM。

- 配置 CMPSS 比较器：`CMPSS_configHighComparator()`、`CMPSS_setDACValueHigh()`。意义是把模拟电流/电压和阈值比较。

- 把 CMPSS 或 GPIO 故障信号接入 XBAR：`XBAR_setEPWMMuxConfig()`、`XBAR_enableEPWMMux()`。意义是建立保护信号到 ePWM 的硬件通道。

- 配置 ePWM Trip Zone：`EPWM_enableTripZoneSignals()` 对应 `TZSEL`，`EPWM_setTripZoneAction()` 对应 `TZCTL`。

- 选择保护类型：one-shot 适合锁存型严重故障，cycle-by-cycle 适合逐周期限流。

  CMPSS_configHighComparator(CMPSS1_BASE, CMPSS_INSRC_DAC);
CMPSS_setDACValueHigh(CMPSS1_BASE, ocpThreshold);
XBAR_setEPWMMuxConfig(XBAR_TRIP4, XBAR_EPWM_MUX00_CMPSS1_CTRIPH);
XBAR_enableEPWMMux(XBAR_TRIP4, XBAR_MUX00);
EPWM_enableTripZoneSignals(EPWM1_BASE, EPWM_TZ_SIGNAL_OSHT4); // TZSEL
EPWM_setTripZoneAction(EPWM1_BASE, EPWM_TZ_ACTION_EVENT_TZA,
                       EPWM_TZ_ACTION_LOW);                  // TZCTL

**验收：**注入比较器过阈值或拉低驱动 FAULT，PWM 在硬件路径上立即进入安全态；软件故障日志只负责记录和复位。

### 5.4 SCI：调试串口和简单上位机命令

**目的：**用于 bring-up 日志、参数读写、小型命令行或波形摘要输出。

- 打开 SCI 时钟并配置 TX/RX GPIO 复用。

- 设置波特率、数据位、停止位、校验：`SCI_setConfig()`。

- 启用 FIFO 或中断：避免主循环阻塞等待。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_SCIA);
GPIO_setPinConfig(GPIO_28_SCIRXDA);
GPIO_setPinConfig(GPIO_29_SCITXDA);
SCI_setConfig(SCIA_BASE, DEVICE_LSPCLK_FREQ, 115200,
              SCI_CONFIG_WLEN_8 | SCI_CONFIG_STOP_ONE | SCI_CONFIG_PAR_NONE);
SCI_enableFIFO(SCIA_BASE);
SCI_enableModule(SCIA_BASE);

**验收：**上电打印版本号；发送命令能收到响应；断开上位机不会卡死控制 ISR。

### 5.5 CAN：BMS、并机和工业通信

**目的：**与 BMS、并机控制器、上位控制器交换状态和命令。

- 配置 CAN RX/TX 引脚复用。

- 初始化模块：`CAN_initModule()`，设置位时序 `CAN_setBitRate()`。

- 配置 message object：接收 BMS 限流、SOC、故障；发送 PCS 状态、故障和功率。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_CANA);
GPIO_setPinConfig(GPIO_30_CANRXA);
GPIO_setPinConfig(GPIO_31_CANTXA);
CAN_initModule(CANA_BASE);
CAN_setBitRate(CANA_BASE, DEVICE_SYSCLK_FREQ, 500000, 16);
CAN_setupMessageObject(CANA_BASE, 1, 0x180, CAN_MSG_FRAME_STD,
                       CAN_MSG_OBJ_TYPE_RX, 0, CAN_MSG_OBJ_RX_INT_ENABLE, 8);
CAN_startModule(CANA_BASE);

**验收：**CAN 分析仪能看到周期帧；拔掉总线或制造错误帧时，错误计数和恢复逻辑可观察。

### 5.6 SPI：外部 ADC、DAC、驱动器或存储器

**目的：**连接高速外部采样芯片、隔离驱动器配置、DAC 调试输出或外部存储器。

- 配置 SIMO/SOMI/CLK/CS 引脚复用。

- 设置主从模式、时钟极性相位、位宽和速率：`SPI_setConfig()`。

- 使用 FIFO 或 DMA 处理批量数据。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_SPIA);
SPI_disableModule(SPIA_BASE);
SPI_setConfig(SPIA_BASE, DEVICE_LSPCLK_FREQ, SPI_PROT_POL0PHA0,
              SPI_MODE_MASTER, 1000000, 16);
SPI_enableFIFO(SPIA_BASE);
SPI_enableModule(SPIA_BASE);

**验收：**逻辑分析仪看到 CLK、CS、MOSI/MISO 时序；读固定 ID 寄存器或回环数据正确。

### 5.7 I2C：EEPROM、温度传感器和低速配置器件

**目的：**连接低速外设，如 EEPROM、温度传感器、隔离器配置芯片。

- 配置 SDA/SCL 引脚和上拉电阻。

- 设置模块时钟、目标地址、速率：`I2C_setConfig()`、`I2C_setTargetAddress()`。

- 实现超时机制，避免设备无响应时卡死。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_I2CA);
I2C_disableModule(I2CA_BASE);
I2C_initMaster(I2CA_BASE, DEVICE_SYSCLK_FREQ, 100000, I2C_DUTYCYCLE_33);
I2C_setConfig(I2CA_BASE, I2C_MASTER_SEND_MODE);
I2C_setTargetAddress(I2CA_BASE, 0x50);
I2C_enableModule(I2CA_BASE);

**验收：**I2C 扫描能找到目标地址；读写 EEPROM 或温度寄存器成功；拔掉器件时不会阻塞系统。

### 5.8 eCAP：频率、脉宽和同步信号捕获

**目的：**捕获旁路频率、外部同步脉冲、风扇测速或继电器反馈脉冲。

- 配置 eCAP 输入 GPIO 或 INPUT XBAR。

- 设置捕获边沿：`ECAP_setEventPolarity()`。

- 设置连续/单次捕获、计数器复位和中断。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_ECAP1);
ECAP_disableInterrupt(ECAP1_BASE, ECAP_ISR_SOURCE_CAPTURE_EVENT_1);
ECAP_setEventPolarity(ECAP1_BASE, ECAP_EVENT_1, ECAP_EVNT_RISING_EDGE);
ECAP_enableCounterResetOnEvent(ECAP1_BASE, ECAP_EVENT_1);
ECAP_startCounter(ECAP1_BASE);
ECAP_reArm(ECAP1_BASE);

**验收：**输入已知频率方波，捕获周期计算出的频率正确；丢脉冲或溢出能被检测。

### 5.9 eQEP：编码器或旋转量输入

**目的：**在 UPS/PCS 中 eQEP 不一定必用，但可用于风机、执行机构或带旋转机构的测试平台。

- 配置 QEPA/QEPB/INDEX 引脚。

- 设置解码模式：`EQEP_setDecoderConfig()`。

- 设置位置计数范围、单位定时器和溢出处理。

  SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_EQEP1);
EQEP_setDecoderConfig(EQEP1_BASE,
    EQEP_CONFIG_2X_RESOLUTION | EQEP_CONFIG_QUADRATURE | EQEP_CONFIG_NO_SWAP);
EQEP_setPositionCounterConfig(EQEP1_BASE, EQEP_POSITION_RESET_MAX_POS, maxCount);
EQEP_enableUnitTimer(EQEP1_BASE, unitPeriod);
EQEP_enableModule(EQEP1_BASE);

**验收：**手动转动编码器，位置计数方向正确；index 复位和溢出边界可观察。

### 5.10 CLA：把固定数学任务从 CPU ISR 中分出去

**目的：**把固定、短小、周期性的控制计算交给 控制律加速器（control law accelerator / CLA），减轻 CPU ISR 压力。

- 划分 CLA 程序和数据内存。

- 映射任务向量：`CLA_mapTaskVector()`。

- 配置触发源，如 ADC 中断或软件触发。

- 定义 CPU 与 CLA 共享变量边界，避免同时写同一数据。

  CLA_mapTaskVector(CLA1_BASE, CLA_MVECT_1, (uint16_t)&Cla1Task1);
CLA_setTriggerSource(CLA_TASK_1, CLA_TRIGGER_ADCA1);
CLA_enableTasks(CLA1_BASE, CLA_TASKFLAG_1);

**验收：**CLA task 被周期触发；CPU 能读到 CLA 输出；关闭 CLA 后 CPU 版本结果一致。

### 5.11 DMA：把重复搬运从 CPU 中分出去

**目的：**把 ADC 结果、通信 FIFO 或日志缓冲搬运交给 DMA，减少 CPU 在数据复制上的消耗。

- 配置源地址和目的地址：`DMA_configAddresses()`。

- 配置 burst、transfer 和 wrap。

- 选择触发源，如 ADC interrupt、SPI RX 或软件触发。

- 设置完成中断，通知后台任务处理缓冲。

  DMA_configAddresses(DMA_CH1_BASE, destBuffer, sourceAdcResult);
DMA_configBurst(DMA_CH1_BASE, burstSize, 1, 1);
DMA_configTransfer(DMA_CH1_BASE, transferSize, 1, 1);
DMA_configMode(DMA_CH1_BASE, DMA_TRIGGER_ADCA1,
               DMA_CFG_ONESHOT_DISABLE | DMA_CFG_CONTINUOUS_ENABLE);
DMA_startChannel(DMA_CH1_BASE);

**验收：**源数据变化后目标缓冲自动更新；DMA 完成中断频率正确；CPU 控制 ISR 执行时间下降或更稳定。

## 6. 最小代码骨架

  void ControlPeripherals_Init(void)
{
    InitSystemClockAndFlash();
    InitGpioMuxForPowerStage();
    InitPieAndInterrupts();

    InitEpwmTimebaseAndDeadband();
    InitAdcModulesAndSoc();
    LinkEpwmToAdcSoc();
    InitTripZoneFastShutdown();

    InitSciCanSpiI2cBackgroundComms();
}

__interrupt void AdcControlISR(void)
{
    ReadAdcResults();
    ScaleAndFilterMeasurements();
    RunFastProtectionChecks();
    RunPfcOrInverterOrPcsControl();
    UpdateEpwmCompareSafely();
    ClearAdcAndPieFlags();
}

## 7. 验收标准

- 能说出 datasheet、Technical Reference Manual 和 C2000Ware 各自解决什么问题。

- 能按 Step 0 到 Step 12 讲出从空工程到控制 ISR 的配置顺序。

- 能解释 ePWM 为什么是控制时间基准、ADC 为什么由 ePWM 触发、Trip Zone 为什么走硬件快速关断。

- 能把 SCI、CAN、SPI、I2C 放到低频任务或通信中断，而不是阻塞高频控制 ISR。

- 能基于一张控制板原理图列出 PWM、ADC、保护、通信的 bring-up 清单。

## 8. 复盘问题

- 如果 PWM 频率不对，应该先查系统时钟、TBCLK 分频，还是 TBPRD？

- 如果 ADC 波形抖动，应该先查采样点、前端滤波，还是控制算法？

- 如果过流保护能进软件故障但 PWM 没有立刻关断，Trip Zone 链路可能缺哪一步？

## 9. 导师问题

- 公司 F28075 或同类 C2000 工程中，控制 ISR 是由 ePWM 中断触发还是 ADC EOC 触发？这样安排的理由是什么？

- 真实项目里，Trip Zone 输入来自 CMPSS、驱动器 FAULT、GPIO，还是多路 XBAR 汇总？我只记录通用链路，不记录内部阈值。

- 通信、参数保存和故障日志分别在哪个低频调度任务里跑？如何避免影响高频控制 ISR？

**下一步：**可以把这一节拆成后续实验课：F28075 ePWM+ADC 同步采样实验、Trip Zone 故障注入实验、SCI/CAN 参数通信实验。

源稿：`concepts/embedded/tms320f28075-peripheral-bringup.md`

    上一节：教程 0046：PCS 储能 DC-DC 与模式状态机
    课程终点
