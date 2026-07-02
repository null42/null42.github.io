---
title: 教程 0022：UPS 固件实时调度骨架
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0022-ups-firmware-scheduler.html
status: learning
visibility: public
summary: Imported from 0022-ups-firmware-scheduler.html
chapterOrder: 10
---

# 教程 0022：UPS 固件实时调度骨架

中文主讲。一个概念：把控制中断服务程序、后台任务、通信和保护放到同一条时间线上，判断哪些代码必须实时完成，哪些代码不能阻塞快路径。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学脚本和教学参数，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

实时调度（real-time scheduling）是安排软件任务在规定时间内完成。这里的重点不是平均速度，而是关键任务每一次都不能错过截止时间。

控制中断服务程序（control interrupt service routine / control ISR）是固定周期运行的快路径。它通常读取模数转换器采样（analog-to-digital converter / ADC sampling）结果，执行保护判断、控制计算，并更新脉宽调制（pulse-width modulation / PWM）输出。

后台任务（background task）是相对低频、可排队或可被打断的慢路径，例如遥测、参数保存、日志整理和通信任务（communication task）。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）不是只有一个控制公式。它同时有功率变换、保护逻辑、状态机、通信和诊断。若通信或日志写入阻塞控制 ISR，可能造成：

- PWM 更新抖动，逆变输出或功率因数校正（power factor correction / PFC）电流环变差。

- 保护判断延迟，过压、欠压或过流被晚处理。

- 读 C 工程时分不清快路径和慢路径，不知道该先看哪个模块。

## 3. 物理直觉

控制 ISR 像 UPS 的心跳：频率固定，不能被慢任务拖住。后台任务像体检报告和对外沟通：重要，但可以慢一些，也可以拆成多次执行。

    ADC 采样
    电压/电流

    控制 ISR
    保护+控制

    PWM 更新
    下一周期输出

    后台任务
    遥测/日志

    通信任务
    不能堵住 ISR

图 1：快路径只保留实时必需动作，慢路径通过后台任务处理。

## 4. 数学形式

控制周期和任务预算可以先用最简单的形式判断：

  T_control = 1 / f_control
t_isr = t_adc + t_control + t_protection + t_pwm_update
margin = budget_isr - t_isr
deadline_miss = margin < 0

默认仿真：控制频率 10 kHz，所以控制周期为 100 us。若 ISR 预算为 70 us，ADC 8 us、控制 24 us、保护 10 us、PWM 更新 6 us，则：

  t_isr = 8 + 24 + 10 + 6 = 48 us
margin = 70 - 48 = 22 us

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_firmware_scheduler.py

脚本会生成并默认尝试自动打开图片；如果打不开，会打印完整路径。

    产物

- `simulations/results/ups_firmware_scheduler.png`

    对比任务
    python simulations\python\ups_firmware_scheduler.py --control-time-us 52 --output simulations\results\ups_scheduler_deadline_fail.png
python simulations\python\ups_firmware_scheduler.py --communication-frequency 200 --output simulations\results\ups_scheduler_comm_200hz.png

第一条命令会故意让 ISR 超时；第二条命令只提高后台通信频率，观察通信点变密，但不应改变 ISR 执行时间。

观察顺序：

- 先看第一栏：控制 ISR 执行时间是否低于 ISR budget。

- 再看第二栏：ADC、保护、PWM 更新是否处在控制 ISR 快路径。

- 再看第三栏：遥测和通信是否是低频后台事件。

- 最后看第四栏：故障锁存后，后台任务仍可记录和上报状态。

## 6. 固件落地

读 C 语言 UPS 工程时，可以按模块边界找：

- `isr.c` 或 `control.c`：控制 ISR，关注采样、保护、控制、PWM 更新顺序。

- `scheduler.c`：周期任务标志，如 1 ms、10 ms、100 ms。

- `communication.c`：通信任务，不应长时间占用控制 ISR。

- `protection.c`：快速保护、故障锁存、复位条件。

- `log.c`：故障证据保存。

## 7. 常见误解

- **误解：**CPU 平均占用不高，实时性就一定够。
**纠正：**控制 ISR 看最坏情况截止时间，某一次超时也可能破坏 PWM 更新。

- **误解：**通信任务放进 ISR 最稳。
**纠正：**通信帧处理时间长且抖动大，应放后台、低优先级中断或实时操作系统（real-time operating system / RTOS）任务。

- **误解：**保护逻辑全部放后台任务也可以。
**纠正：**快速过流、过压等风险通常要在硬件比较器或控制 ISR 快路径处理。

## 8. 验收标准

- 能解释控制 ISR、后台任务、通信任务和实时调度的分工。

- 能根据图中的 `ISR budget` 和 `Control ISR execution time` 判断是否超时。

- 能解释为什么通信任务不应阻塞控制 ISR。

- 能运行默认仿真，并指出故障锁存发生后图中哪条曲线变化。

- 能基于图中具体参数准备导师问题。

## 9. 复盘问题

- 默认仿真中，控制周期是多少微秒？ISR 执行时间是多少微秒？剩余裕量是多少？

- 为什么通信任务执行时间可以大于 ISR 预算，却不一定造成 ISR deadline miss？

- 把 `--control-time-us` 改为 52 后，图标题里的 deadline 状态如何变化？这说明什么？

## 10. 导师问题

- 我用 `ups_firmware_scheduler.py` 看到通信任务默认 50 Hz，执行时间比 ISR 预算长，所以它被放在后台。公司工程里通信任务一般由主循环、RTOS 任务还是低优先级中断处理？

- 我把 `--control-time-us 52` 后图中出现 deadline fail。真实工程里通常如何测量控制 ISR 的最坏执行时间？

- 如果保护既有硬件比较器又有软件阈值，公司代码里快速保护和状态机锁存之间如何分层？

**下一步：**把这节与 0021 的故障状态机连起来：状态机决定系统能否复位，调度骨架决定这些判断在哪个周期、哪个任务里执行。

关联：[上一节：单相逆变器故障状态机](0021-single-phase-inverter-fault-state-machine.html)；源稿：`concepts/embedded/ups-firmware-scheduler.md`。

    上一节：教程 0021：单相逆变器状态机（state machine）与故障锁存
    下一节：教程 0023：单相 UPS 旁路同步与切换许可
