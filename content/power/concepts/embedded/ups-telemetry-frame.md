---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS 遥测通信帧（telemetry communication frame）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0031-ups-telemetry-frame.html` 的源稿和补充资料。它只使用教学字段，不包含公司内部通信协议、寄存器地址、客户项目参数或未公开产品方案。
---

# 概念：UPS 遥测通信帧（telemetry communication frame）

本页是 `lessons/0031-ups-telemetry-frame.html` 的源稿和补充资料。它只使用教学字段，不包含公司内部通信协议、寄存器地址、客户项目参数或未公开产品方案。

## 它是什么

遥测（telemetry）是设备把自己的运行状态、故障状态和关键测量量发给外部工具的过程。通信帧（communication frame）是一次上报的数据包。本课只讲一个概念：把 UPS 当前模式、故障码（fault code）、时间戳（timestamp）和输出使能状态组织成一条可检查的教学帧。

本节中的序号（sequence ID）用于判断帧的先后顺序；故障日志（fault log）提供故障发生时刻和故障码；输出使能字段说明保护后功率级是否已经关闭。

## 为什么 UPS 需要它

UPS 软件不是只在本机内部运行。调试工具、上位机、监控系统和维护人员都需要知道设备当前处于什么模式、有没有故障、输出是否已经关断。通信上报让“状态机、保护、日志”变成外部可观察证据。

没有遥测帧，导师或调试人员只能看局部变量和打印；有遥测帧后，可以沿着“状态机 -> 故障日志 -> 输出控制 -> 通信上报”的路径阅读工程。

## 物理直觉

遥测帧像 UPS 每隔一小段时间发出的一张体检单。体检单上写着：这是第几张单、什么时候发的、设备处于什么模式、最近故障是什么、PFC/DC-DC/逆变器/旁路有没有打开。

## 数学形式

```text
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
```

如果发生故障并进入 FAULT 模式，教学帧应能表达：

```text
mode = FAULT
fault_code = DC_BUS_OV
pfc_enable + dc_dc_enable + inverter_pwm_enable + bypass_contactor = 0
```

## 仿真观察

运行：

```powershell
python simulations\python\ups_telemetry_frame.py --no-open
```

默认生成：

```text
simulations/results/ups_telemetry_frame.png
```

图中包含模式值、故障码值和四个输出使能曲线。图内参数框标出采样周期、帧数量、故障时间、最后一帧序号、最后模式和最后故障码。默认不加 `--no-open` 时脚本会尝试自动打开图片；打不开时会打印完整路径。

## 固件落地

- `UpsTelemetryFrame`：教学通信帧结构体。
- `sequence_id`：帧序号，用于判断是否丢帧或乱序。
- `timestamp_ms`：本教学帧使用故障日志时间戳。
- `mode`：当前 UPS 模式。
- `fault_code`：最近故障码。
- `pfc_enable`、`dc_dc_enable`、`inverter_pwm_enable`、`bypass_contactor`：功率级输出使能状态。
- `UpsTelemetry_BuildFrame()`：把模式、输出和故障日志打包成帧。
- `UpsTelemetry_PrintFrame()`：把帧打印成可检查证据。

真实工程可能使用串口、控制器局域网（controller area network / CAN）、Modbus、以太网或自定义协议。本课不实现真实协议，只训练字段组织和阅读路径。

## 常见误解

- 错误理解：通信就是会发字节。  
  正确理解：通信首先要知道“哪些状态必须被外部看见”，再谈编码、校验和驱动。
- 错误理解：有故障日志就不需要遥测。  
  正确理解：故障日志记录事件，遥测帧把事件和当前状态上报给外部。
- 错误理解：可以把导师给的真实协议字段记到学习仓库。  
  正确理解：不能记录公司内部通信协议，只能记录通用字段组织思路。

## 验收标准

- 能运行 `python simulations\python\ups_telemetry_frame.py --no-open` 并打开 `simulations/results/ups_telemetry_frame.png`。
- 能解释序号、时间戳、模式、故障码和输出使能字段分别解决什么问题。
- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `telemetry_frame` 输出。
- 能基于 `telemetry.c -> UpsTelemetry_BuildFrame()` 准备导师问题。

## 导师问题

- 我用 `telemetry.c -> UpsTelemetry_BuildFrame()` 把模式、故障码和输出使能打包成教学帧。真实工程里通常还会把哪些通用状态放进遥测帧？
- 我用 `simulations/results/ups_telemetry_frame.png` 看到故障后四个输出使能都为 0。真实工程中通信上报的是命令状态、反馈状态，还是两者都报？
- 我不会记录公司内部通信协议，只想确认阅读方式：看真实工程通信模块时，应先找帧结构、周期调度、还是故障上报入口？
