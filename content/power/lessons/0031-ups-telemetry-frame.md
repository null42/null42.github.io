---
title: 教程 0031：UPS 遥测通信帧
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0031-ups-telemetry-frame.html
status: learning
visibility: public
summary: Imported from 0031-ups-telemetry-frame.html
chapterOrder: 10
---

# 教程 0031：UPS 遥测通信帧

中文主讲。一个概念：把模式、故障码、时间戳和输出使能状态组织成一条外部可检查的通信上报帧。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学字段，不包含公司内部通信协议、寄存器地址、客户项目参数或未公开产品方案。

## 1. 它是什么

遥测（telemetry）是设备把自己的运行状态、故障状态和关键测量量发给外部工具的过程。通信帧（communication frame）是一次上报的数据包。

本课只讲一个概念：把 UPS 当前模式、故障码（fault code）、时间戳（timestamp）和输出使能状态组织成一条可检查的教学帧。上一节的故障日志（fault log）提供故障发生时刻和故障码，本节把它变成可上报的数据。

序号（sequence ID）用于判断帧的先后顺序。输出使能字段用于说明保护后功率级是否已经关闭。

## 2. 为什么 UPS 需要它

UPS 软件不是只在本机内部运行。调试工具、上位机、监控系统和维护人员都需要知道设备当前处于什么模式、有没有故障、输出是否已经关断。

通信上报让“状态机、保护、日志”变成外部可观察证据。没有遥测帧，导师或调试人员只能看局部变量和打印；有遥测帧后，可以沿着“状态机 -> 故障日志 -> 输出控制 -> 通信上报”的路径阅读工程。

## 3. 物理直觉

遥测帧像 UPS 每隔一小段时间发出的一张体检单。体检单上写着：这是第几张单、什么时候发的、设备处于什么模式、最近故障是什么、功率因数校正（power factor correction / PFC）、DC-DC、逆变器和旁路有没有打开。

## 4. 数学形式

  frame.sequence_id = sequence_id + 1
frame.timestamp_ms = fault_log.timestamp_ms
frame.mode = current_mode
frame.fault_code = fault_log.fault_code
frame.outputs = {
    pfc_enable,
    dc_dc_enable,
    inverter_pwm_enable,
    bypass_contactor
}

如果发生故障并进入 FAULT 模式，教学帧应能表达：

  mode = FAULT
fault_code = DC_BUS_OV
pfc_enable + dc_dc_enable + inverter_pwm_enable + bypass_contactor = 0

## 5. 一个仿真任务与仿真观察

运行 Python 仿真：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_telemetry_frame.py

只保存图片、不自动打开：

  python simulations\python\ups_telemetry_frame.py --no-open

    产物

- `simulations/results/ups_telemetry_frame.png`

- 终端输出：最后一帧模式、最后一帧故障码、故障后输出使能求和。

- 图内包含参数框、图例、模式值、故障码值和四个输出使能曲线。

观察顺序：先看模式从 ONLINE 变成 FAULT，再看故障码从 NONE 变成 DC_BUS_OV，最后看 PFC、DC-DC、逆变器脉宽调制（pulse-width modulation / PWM）使能和旁路接触器都为 0。

## 6. 固件落地

- `UpsTelemetryFrame`：教学通信帧结构体。

- `sequence_id`：帧序号，用于判断是否丢帧或乱序。

- `timestamp_ms`：本教学帧使用故障日志时间戳。

- `mode`：当前 UPS 模式。

- `fault_code`：最近故障码。

- `pfc_enable`、`dc_dc_enable`、`inverter_pwm_enable`、`bypass_contactor`：功率级输出使能状态。

- `UpsTelemetry_BuildFrame()`：把模式、输出和故障日志打包成帧。

- `UpsTelemetry_PrintFrame()`：把帧打印成可检查证据。

真实工程可能使用串口、控制器局域网（controller area network / CAN）、Modbus、以太网或自定义协议。本课不实现真实协议，只训练字段组织和阅读路径。

## 7. 常见误解

- **误解：**通信就是会发字节。
**纠正：**通信首先要知道哪些状态必须被外部看见，再谈编码、校验和驱动。

- **误解：**有故障日志就不需要遥测。
**纠正：**故障日志记录事件，遥测帧把事件和当前状态上报给外部。

- **误解：**可以把导师给的真实协议字段记到学习仓库。
**纠正：**不能记录公司内部通信协议，只能记录通用字段组织思路。

## 8. 验收标准

- 能运行 `python simulations\python\ups_telemetry_frame.py --no-open` 并打开 `simulations/results/ups_telemetry_frame.png`。

- 能解释序号、时间戳、模式、故障码和输出使能字段分别解决什么问题。

- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `telemetry_frame` 输出。

- 能基于 `telemetry.c -> UpsTelemetry_BuildFrame()` 准备导师问题。

## 9. 复盘问题

- 为什么遥测帧里要有序号，而不是只发当前状态？

- 故障日志和遥测帧的职责有什么区别？

- 为什么故障后只上报故障码还不够，还要上报输出使能状态？

## 10. 导师问题

- 我用 `telemetry.c -> UpsTelemetry_BuildFrame()` 把模式、故障码和输出使能打包成教学帧。真实工程里通常还会把哪些通用状态放进遥测帧？

- 我用 `simulations/results/ups_telemetry_frame.png` 看到故障后四个输出使能都为 0。真实工程中通信上报的是命令状态、反馈状态，还是两者都报？

- 我不会记录公司内部通信协议，只想确认阅读方式：看真实工程通信模块时，应先找帧结构、周期调度，还是故障上报入口？

**下一步：**可以继续补通信命令解析，例如外部读取参数、清故障请求和只读/可写字段边界。

关联：[上一节：故障码与故障日志](0030-ups-fault-code-logging.html)；源稿：`concepts/embedded/ups-telemetry-frame.md`；仿真：`simulations/python/ups_telemetry_frame.py`。

    上一节：教程 0030：故障码与故障日志
    下一节：教程 0032：UPS 命令解析与安全门控
