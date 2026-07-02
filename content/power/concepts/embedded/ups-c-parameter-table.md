---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS C 参数表（UPS C parameter table）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0026-ups-c-parameter-table.html` 的源稿和补充资料。它只使用教学参数，不包含公司内部参数、未公开产品方案、客户项目参数或内部测试数据。向导师提问时不能记录公司内部参数，不能记录公司内部 NVM 格式，也不能记录客户项目参数。
---

# 概念：UPS C 参数表（UPS C parameter table）

本页是 `lessons/0026-ups-c-parameter-table.html` 的源稿和补充资料。它只使用教学参数，不包含公司内部参数、未公开产品方案、客户项目参数或内部测试数据。向导师提问时不能记录公司内部参数，不能记录公司内部 NVM 格式，也不能记录客户项目参数。

## 1. 它是什么

UPS C 参数表（UPS C parameter table）是把不间断电源（uninterruptible power supply / UPS）的保护阈值、同步保持时间、控制周期等工程参数集中放在一个结构体或配置模块里，而不是散落在状态机、保护函数和驱动代码中。

本节只讲一个概念：把教学阈值集中到 `UpsParameters`，让 C 工程更容易读、测、问。参数表不是控制算法本身，而是控制和保护逻辑共同引用的边界条件。

## 2. 为什么 UPS 需要它

UPS 软件里到处都有参数：市电欠压阈值、直流母线过压阈值、旁路同步保持时间、控制中断服务程序（control interrupt service routine / control ISR）周期等。如果这些数字直接写在代码逻辑里，读代码时很难判断某个数字是物理约束、保护阈值、调试临时值还是产品配置。

集中参数表能让你先建立阅读路径：先看参数名，再看谁使用它，最后看参数变化会影响哪些模式和保护。

从信号链路看，采样值先来自模数转换器（analog-to-digital converter / ADC），再和参数表里的阈值比较，最后变成保护标志或模式切换条件。没有参数表，采样、保护和状态机之间的边界会很难读。

## 3. 物理直觉

参数表像控制柜门板上的整定清单。状态机决定“当前走哪条路”，参数表决定“判断某条路是否安全时采用什么边界”。  

例如欠压保护（undervoltage protection / UVP）不是凭感觉判断电压低，而是拿采样值和阈值比较。过压保护（overvoltage protection / OVP）也是同样思路。

如果将来参数需要掉电保存，常见入口会牵涉非易失性存储器（non-volatile memory / NVM）。本节先不实现保存，只建立“默认参数从哪里来、谁读取它”的阅读路径。

## 4. 数学形式

典型判断可以写成：

```text
mains_uv_fault = (mains_rms_v < mains_uv_threshold_v)
dc_bus_ov_fault = (dc_bus_v > dc_bus_ov_threshold_v)
bypass_ready = sync_window_ok && (sync_hold_ms >= bypass_sync_hold_ms)
```

教学代码中的参数表：

```c
typedef struct {
    float mains_uv_threshold_v;
    float dc_bus_ov_threshold_v;
    int bypass_sync_hold_ms;
    int control_isr_period_us;
} UpsParameters;
```

这些数值只用于训练阅读结构，不代表真实 UPS 产品参数。

## 5. 仿真任务与仿真观察

本节的“仿真”仍然是可编译 C 教学程序。运行：

```powershell
gcc -std=c99 -Wall -Wextra -Werror -I projects\03-ups-c-firmware-skeleton\src projects\03-ups-c-firmware-skeleton\src\*.c -o projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
```

先观察第一行：

```text
parameter_table: mains_uv=180.0V dc_bus_ov=420.0V bypass_hold=30ms isr=100us
```

然后再看后续 tick 的模式变化。重点不是背这些数值，而是确认参数表在程序启动时可见、可追踪、可作为导师问题的具体产物。

不要背教学数值：`180.0V`、`420.0V`、`30ms` 和 `100us` 只是用于让输出可检查。真正要掌握的是 `parameters.h -> UpsParameters` 定义边界，`parameters.c -> UpsParameters_GetDefault()` 提供默认值。

## 6. 固件落地

- `parameters.h -> UpsParameters`：定义参数结构体和参数访问接口。
- `parameters.c`：返回教学默认参数，并打印参数表摘要。
- `main.c`：启动时读取参数表并打印，形成可检查的运行证据。

真实工程中参数可能来自 Flash、EEPROM、上位机配置、编译期常量或校准区。本课只做最小教学版本，不记录任何公司内部参数或内部 NVM 格式。

## 7. 常见误解

- 错误理解：参数表只是为了少写几个数字。  
  正确理解：参数表的核心价值是让阈值、时间和周期有名字、有边界、有审查入口。
- 错误理解：参数集中后就一定可以随便在线修改。  
  正确理解：很多参数涉及安全，需要权限、范围检查、版本管理和掉电保存策略。
- 错误理解：导师给的真实参数可以直接记进学习仓库。  
  正确理解：不能记录公司内部参数，只能记录通用组织方式、命名方式和审查思路。

## 8. 验收标准

- 能编译并运行 `projects/03-ups-c-firmware-skeleton`。
- 能指出 `UpsParameters` 里每个字段的工程含义。
- 能指出 `parameters.h -> UpsParameters` 是结构边界，`parameters.c -> UpsParameters_GetDefault()` 是默认值入口。
- 能解释为什么参数表比散落的魔法数字更适合阅读和审查。
- 能基于 `parameters.c -> UpsParameters_GetDefault()` 准备导师问题。

## 9. 复盘问题

- 为什么 `mains_uv_threshold_v` 这种名字比代码里直接写 `180.0f` 更适合阅读？
- 为什么 `bypass_sync_hold_ms` 不应该只藏在旁路切换函数内部？
- 采样值先来自 ADC，再和参数表里的阈值比较；这句话对应代码里的哪些模块边界？
- 如果将来参数来自 Flash，`UpsParameters_GetDefault()` 这个接口还能保留什么价值？

## 10. 导师问题

- 我用 `parameters.c -> UpsParameters_GetDefault()` 看到教学参数集中在一个结构体。真实工程里保护阈值通常集中在参数表、保护模块，还是驱动配置里？
- 我用 `parameters.h -> UpsParameters` 看到结构体字段带单位后缀。真实工程里参数命名通常如何标注单位、读写权限和范围？
- 我看到教学代码把旁路同步保持时间（bypass synchronization hold time）作为参数。真实工程里保持时间通常由哪个模块使用和审查？
- 我不会记录公司内部参数，只想确认组织方式：真实工程里参数是否有范围检查、默认值恢复和版本号？
