---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：Boost 慢速任务、遥测与故障日志
tags:
  - power-electronics
status: learning
summary: 慢速任务（slow task）是相对控制中断服务程序（control interrupt service routine / control ISR）而言的低频软件任务。它不直接决定每个开关周期的占空比，而是周期性整理运行数据。
---

# 概念：Boost 慢速任务、遥测与故障日志

## 1. 它是什么

慢速任务（slow task）是相对控制中断服务程序（control interrupt service routine / control ISR）而言的低频软件任务。它不直接决定每个开关周期的占空比，而是周期性整理运行数据。

遥测（telemetry）是把关键运行变量打包出来，供上位机、显示屏或通信接口读取。

故障日志（fault log）是在故障发生时记录关键证据，例如时间、故障码、电压、电流和输出使能状态。

本节仍使用教学模型，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）不仅要实时控制，还要能被调试、维护和诊断。控制 ISR 负责快，慢速任务负责看得见、说得清、留得住。

- 看得见：遥测把电压、电流、状态、PWM 使能等变量送到通信接口。
- 说得清：故障日志给导师或调试人员提供证据。
- 留得住：故障发生后，即使波形已经过去，日志仍记录发生时刻和关键变量。

## 3. 物理直觉

控制 ISR 像开车时每一瞬间的方向盘动作，慢速任务像仪表盘和行车记录。方向盘必须快，仪表盘可以慢一些，但出事故时必须留下发生时刻、速度和报警状态。

## 4. 数学形式

两个周期：

```text
T_control = 1 / f_control
T_telemetry = 1 / f_telemetry
```

通常 `f_control` 远高于 `f_telemetry`。例如本节：

```text
f_control = 10 kHz
f_telemetry = 100 Hz
```

故障日志采用边沿触发思想：

```text
if fault_now and not fault_logged:
    write_log(time, fault_code, Vout, pwm_enable)
```

## 5. 一个仿真任务与仿真观察

一个仿真任务是运行 `boost_telemetry_fault_log.py`，同时检查图片和 CSV 两个产物：

```powershell
python simulations\python\boost_telemetry_fault_log.py
```

对比遥测频率：

```powershell
python simulations\python\boost_telemetry_fault_log.py --telemetry-frequency 50 --output simulations\results\boost_telemetry_50hz.png --csv-output simulations\results\boost_fault_log_50hz.csv --no-open
python simulations\python\boost_telemetry_fault_log.py --telemetry-frequency 500 --output simulations\results\boost_telemetry_500hz.png --csv-output simulations\results\boost_fault_log_500hz.csv --no-open
```

脚本会生成：

- 图：`simulations/results/boost_telemetry_fault_log.png`
- 故障日志 CSV：`simulations/results/boost_fault_log.csv`

图中可以看到控制周期电压、慢速遥测采样点、PWM 使能和故障事件标记。CSV 中记录了故障事件的具体证据。

## 6. 固件落地

真实工程中，慢速任务可能包括：

- `telemetry.c`：打包电压、电流、状态、故障码。
- `log.c`：记录故障事件。
- `communication.c`：通过串口、控制器局域网（controller area network / CAN）或其他接口发出数据。
- `parameter.c`：处理参数读取、限幅和保存。

读代码时要区分“实时控制路径”和“观测记录路径”。慢速任务不应该阻塞控制 ISR。

## 7. 常见误解

- 错误理解：通信和日志是后期锦上添花。  
  正确理解：没有遥测和日志，调试保护和状态机问题会非常困难。

- 错误理解：慢速任务可以读取任何变量，不用考虑一致性。  
  正确理解：跨中断共享变量要考虑快慢任务之间的数据一致性。

- 错误理解：故障日志只需要故障码。  
  正确理解：故障码之外，还应记录时间、关键采样值和输出状态。

## 8. 验收标准

- 能解释慢速任务（slow task）和控制 ISR 的分工。
- 能解释遥测（telemetry）与故障日志（fault log）的区别。
- 能打开 `boost_fault_log.csv` 并指出故障时间、故障码、电压和 PWM 使能。
- 能解释为什么故障日志采用边沿触发，不每个周期重复写。
- 能基于图和 CSV 准备导师问题。

## 9. 复盘问题

- 默认仿真中，控制频率和遥测频率分别是多少？两者相差多少倍？
- 故障日志 CSV 里记录的 `time_ms` 是多少？对应图中的哪个故障标记？
- 把 `--telemetry-frequency` 从 50 改成 500 后，图中哪类点变化最明显？
- 如果遥测频率太低，是否一定会漏掉故障？为什么故障日志仍然重要？

## 10. 导师问题

- 我用 `boost_telemetry_fault_log.py` 生成了 `boost_fault_log.csv`，里面记录故障时间、电压和 PWM 使能。公司工程里故障日志通常记录哪些字段？
- 我看到控制频率是 10 kHz，遥测频率是 100 Hz。真实工程里通信任务和控制 ISR 的频率通常如何分配？
- 如果慢速任务读取 ISR 更新的变量，公司代码里通常如何保证数据一致性？
