---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：F28075 外设从零配置
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0047-tms320f28075-peripheral-bringup.html` 的源稿。它只讨论 TI 官方公开资料和教学配置路径，不包含公司内部原理图、引脚分配、真实 PWM 频率、ADC 标定、保护阈值、通信协议或客户项目参数。
---

# 概念：F28075 外设从零配置

本页是 `lessons/0047-tms320f28075-peripheral-bringup.html` 的源稿。它只讨论 TI 官方公开资料和教学配置路径，不包含公司内部原理图、引脚分配、真实 PWM 频率、ADC 标定、保护阈值、通信协议或客户项目参数。

## 官方资料

- TI TMS320F28075 产品页：`https://www.ti.com/product/TMS320F28075`
- TMS320F2807x Real-Time Microcontrollers datasheet：`https://www.ti.com/lit/ds/symlink/tms320f28075.pdf`
- TMS320F2807x Technical Reference Manual：`https://www.ti.com/lit/pdf/spruhm9`
- C2000Ware：`https://www.ti.com/tool/C2000WARE`

datasheet 用来确认芯片能力、封装、引脚和电气边界；Technical Reference Manual 用来查寄存器和外设工作机制；C2000Ware 用来获取 device support、driverlib、bit-field headers、peripheral examples 和推荐初始化顺序。

## 它是什么

F28075 外设从零配置，是把一个空工程逐步带到可运行 UPS/PCS 控制 ISR 的过程。关键外设包括 ePWM、ADC、Trip Zone、PIE、GPIO、SCI、CAN、SPI、I2C、eCAP、eQEP、CLA、DMA。

## 为什么 UPS/PCS 需要它

UPS/PCS 控制不是单纯写控制算法。PWM 产生功率级动作，ADC 提供采样证据，Trip Zone 负责硬件快速保护，通信负责调试、BMS 和参数管理，中断系统把这些模块按确定节拍串起来。

## 配置顺序

1. 确认芯片和资料版本。
2. 安装 CCS 与 C2000Ware。
3. 从空工程到最小 main。
4. 配置系统时钟、看门狗和 Flash 等待周期。
5. 配置 GPIO 复用、方向和上拉。
6. 配置 PIE、中断向量表和 ISR。
7. 配置 ePWM 时基、比较、动作限定和死区。
8. 配置 ePWM 触发 ADC SOC。
9. 配置 ADC 参考、采样窗口、SOC 和 EOC 中断。
10. 配置 Trip Zone 与过流快速关断。
11. 配置 SCI、CAN、SPI、I2C 通信外设。
12. 明确 eCAP、eQEP、CLA、DMA 的使用边界。
13. 把外设接入 UPS/PCS 控制 ISR。

## 关键原则

- ePWM 是控制系统的时间基准。
- ADC 采样点要锁定到 PWM 周期里的固定位置。
- Trip Zone 不能等软件保护慢慢判断。
- 通信外设不能放进高频控制 ISR 里阻塞等待。
- CLA/DMA 是减轻 CPU 负担，不是替代系统状态机。

## 映射表外设的具体配置模板

### ePWM

- 打开时钟：`SysCtl_enablePeripheral(SYSCTL_PERIPH_CLK_EPWMx)`。
- 配置 GPIO 复用：`GPIO_setPinConfig(GPIO_x_EPWMx_A/B)`。
- 设置 `TBPRD`、`CMPA/CMPB`、`AQCTLA/AQCTLB`、`DBRED/DBFED`。
- DriverLib 入口：`EPWM_setTimeBasePeriod()`、`EPWM_setCounterCompareValue()`、`EPWM_setActionQualifierAction()`、`EPWM_setRisingEdgeDeadBandDelayInput()`、`EPWM_enableADCTrigger()`。
- 验收：频率、占空比、互补死区、ADC 触发点正确。

### ADC

- 打开 ADC 时钟并上电。
- 配置 SOC：`ADC_setupSOC()`，对应 `ADCSOCxCTL`。
- 配置 EOC 中断：`ADC_setInterruptSource()`，对应 `ADCINTSEL1N2`。
- 验收：固定电压源输入时码值线性，EOC 中断频率等于控制频率。

### CMPSS/XBAR/Trip Zone

- 比较器：`CMPSS_configHighComparator()`、`CMPSS_setDACValueHigh()`。
- XBAR：`XBAR_setEPWMMuxConfig()`。
- Trip Zone：`EPWM_enableTripZoneSignals()` 对应 `TZSEL`，`EPWM_setTripZoneAction()` 对应 `TZCTL`。
- 验收：硬件故障注入后 PWM 立即进入安全态。

### SCI/CAN/SPI/I2C

- SCI：`SCI_setConfig()`，用于调试串口和简单上位机命令。
- CAN：`CAN_initModule()`、`CAN_setBitRate()`、`CAN_setupMessageObject()`，用于 BMS、并机和工业通信。
- SPI：`SPI_setConfig()`，用于外部 ADC、DAC、驱动器或存储器。
- I2C：`I2C_setConfig()`、`I2C_setTargetAddress()`，用于 EEPROM、温度传感器和低速配置器件。
- 验收：通信异常不会阻塞高频控制 ISR。

### eCAP/eQEP/CLA/DMA

- eCAP：`ECAP_setEventPolarity()` 捕获频率、脉宽和同步信号。
- eQEP：`EQEP_setDecoderConfig()` 读取编码器或旋转量输入。
- CLA：`CLA_mapTaskVector()` 把固定数学任务从 CPU ISR 中分出去。
- DMA：`DMA_configAddresses()` 把重复搬运从 CPU 中分出去。
- 验收：触发源、数据边界和 CPU 同步关系清晰。

## 验收标准

- 能说出 datasheet、Technical Reference Manual 和 C2000Ware 的分工。
- 能按步骤讲清从空工程到控制 ISR 的 bring-up 顺序。
- 能解释 ePWM、ADC、Trip Zone、PIE、SCI/CAN/SPI/I2C 在 UPS/PCS 中的角色。
- 能基于控制板原理图列出 PWM、ADC、保护、通信 bring-up 清单。

## 复盘问题

- PWM 频率不对时，先查哪些时钟链路？
- ADC 抖动时，先查采样点还是控制算法？
- Trip Zone 没有硬件关断时，应该沿哪条链路排查？

## 导师问题

F28075 或同类 C2000 工程里，控制 ISR 通常由 ePWM 还是 ADC EOC 触发？Trip Zone 保护输入通常来自哪里？只讨论通用架构，不记录内部参数。
