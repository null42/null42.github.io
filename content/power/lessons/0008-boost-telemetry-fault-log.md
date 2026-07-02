---
title: 教程 0008：Boost 慢速任务、遥测与故障日志
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0008-boost-telemetry-fault-log.html
status: learning
visibility: public
summary: Imported from 0008-boost-telemetry-fault-log.html
chapterOrder: 10
---

# 教程 0008：Boost 慢速任务、遥测与故障日志

中文主讲。一个概念：控制 ISR 负责快，慢速任务负责把系统状态看见、发出和留下证据。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学脚本和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 1. 它是什么

慢速任务（slow task）是相对控制中断服务程序（control interrupt service routine / control ISR）而言的低频软件任务。它不直接控制每个开关周期，而是周期性整理运行数据。

遥测（telemetry）是把关键运行变量打包出来，供显示屏、上位机或通信接口（communication interface）读取。

故障日志（fault log）是在故障发生时记录关键证据，例如时间、故障码、电压和 PWM 使能状态。这里的 PWM 首次完整写法是 脉宽调制（pulse-width modulation / PWM）。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）不只是要控制输出，还要能调试、维护、定位故障。控制 ISR 负责快，慢速任务负责“看见、说清、留下”。

- **看见：**遥测把电压、电流、状态和故障码送到通信接口。

- **说清：**故障日志给导师或调试人员具体证据。

- **留下：**故障波形过去以后，CSV 日志仍保留发生时刻和关键变量。

## 3. 物理直觉

控制 ISR 像开车时每一瞬间的方向盘动作，慢速任务像仪表盘和行车记录。方向盘必须快，仪表盘可以慢一些，但出事故时必须留下时间、报警和关键状态。

    Control ISR
    10 kHz 快路径

    Slow task
    100 Hz 整理数据

    Telemetry
    状态可见

    Fault log
    故障证据

    接口/显示
    上位机读取

图 1：慢速任务不是控制闭环本身，而是把状态整理给通信、显示和日志。

## 4. 数学形式

本节只比较两个周期：

  T_control = 1 / f_control
T_telemetry = 1 / f_telemetry

默认仿真中：

  f_control = 10 kHz
f_telemetry = 100 Hz

故障日志采用边沿触发思想：

  if fault_now and not fault_logged:
    write_log(time, fault_code, Vout, pwm_enable)

也就是说，日志记录的是“故障首次出现的证据”，不需要每个控制周期重复写同一条故障。

## 5. 一个仿真任务与仿真观察

一个仿真任务是运行脚本，同时检查图片和 CSV 两个产物：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\boost_telemetry_fault_log.py

脚本会生成并自动打开图片；如果无法自动打开，会打印完整路径。它还会生成 CSV 故障日志。

    产物

- 图：`simulations/results/boost_telemetry_fault_log.png`

- CSV：`simulations/results/boost_fault_log.csv`

    python simulations\python\boost_telemetry_fault_log.py --telemetry-frequency 50 --output simulations\results\boost_telemetry_50hz.png --csv-output simulations\results\boost_fault_log_50hz.csv
python simulations\python\boost_telemetry_fault_log.py --telemetry-frequency 500 --output simulations\results\boost_telemetry_500hz.png --csv-output simulations\results\boost_fault_log_500hz.csv

比较 50 Hz 和 500 Hz 的遥测采样点密度，但注意故障日志仍应记录故障首次出现的具体证据。

观察顺序：

- 先看控制周期电压是否出现短暂过压。

- 看遥测点是否比控制周期曲线稀疏。

- 看 PWM 是否在故障后保持关闭。

- 打开 CSV，看故障时间、电压和 PWM 使能是否被记录。

## 6. 固件落地

真实 C 工程中，慢速任务可能对应：

- `telemetry.c`：整理电压、电流、状态、故障码。

- `log.c`：记录故障事件和关键采样值。

- `communication.c`：通过串口、控制器局域网（controller area network / CAN）或其他接口发出数据。

- `parameter.c`：处理参数读取、限幅和保存。

读代码时要区分快路径和慢路径：慢速任务不应该阻塞控制 ISR，也不能随意破坏 ISR 正在更新的数据。

## 7. 常见误解

- **误解：**通信和日志是后期锦上添花。
**纠正：**没有遥测和日志，保护、状态机和现场问题会很难定位。

- **误解：**慢速任务可以随便读 ISR 变量。
**纠正：**跨中断共享变量要考虑数据一致性，必要时要用快照或临界区。

- **误解：**故障日志只需要故障码。
**纠正：**导师和调试人员更需要时间、关键采样值、输出状态和触发条件。

## 8. 验收标准

- 能解释慢速任务（slow task）和控制 ISR 的分工。

- 能解释遥测（telemetry）与故障日志（fault log）的区别。

- 能打开 CSV 并指出故障时间、故障码、电压和 PWM 使能。

- 能解释为什么故障日志采用边沿触发，不每个周期重复写。

- 能基于图和 CSV 准备导师问题。

## 9. 复盘问题

- 默认仿真中，控制频率和遥测频率分别是多少？两者相差多少倍？

- 故障日志 CSV 里记录的 `time_ms` 是多少？对应图中的哪个故障标记？

- 如果遥测频率太低，是否一定会漏掉故障？为什么故障日志仍然重要？

## 10. 导师问题

- 我用 `boost_telemetry_fault_log.py` 生成了 `boost_fault_log.csv`，里面有故障时间、电压和 PWM 使能。公司工程里故障日志通常记录哪些字段？

- 我把遥测频率从 50 Hz 改到 500 Hz 后，图上采样点密度变化明显。真实工程里通信任务和控制 ISR 的频率通常如何分配？

- 如果慢速任务读取 ISR 更新的电压、电流和故障码，公司代码里通常如何保证数据一致性？

**下一步：**把第 6、7、8 节连起来：控制 ISR 产生实时动作，状态机决定能否恢复，慢速任务和故障日志把证据保留下来。

关联：[上一节：Boost 故障锁存与复位状态机](0007-boost-fault-state-machine.html)；源稿：`concepts/embedded/boost-telemetry-fault-log.md`。

    上一节：教程 0007：Boost 故障锁存与复位状态机
    下一节：教程 0009：单相功率因数校正（power factor correction / PFC）电流参考
