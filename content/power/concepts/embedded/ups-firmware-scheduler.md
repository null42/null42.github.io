---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS 固件实时调度（real-time scheduling）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0022-ups-firmware-scheduler.html` 的源稿和补充资料，中文主讲。它只使用教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。
---

# 概念：UPS 固件实时调度（real-time scheduling）

本页是 `lessons/0022-ups-firmware-scheduler.html` 的源稿和补充资料，中文主讲。它只使用教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

控制中断服务程序（control interrupt service routine / control ISR）是按固定控制周期运行的实时路径。后台任务（background task）是低优先级、低频或可被打断的软件任务，例如遥测、通信、参数保存和日志整理。

实时调度（real-time scheduling）关心的不是“平均能跑完”，而是关键任务每次都必须在截止时间前跑完。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）同时有功率控制、保护、状态机、通信和日志。逆变器电压环、功率因数校正（power factor correction / PFC）电流环、脉宽调制（pulse-width modulation / PWM）更新和模数转换器采样（analog-to-digital converter / ADC sampling）都要求稳定时序。

如果通信任务阻塞控制 ISR，可能造成 PWM 更新抖动、保护延迟、控制相位滞后，最后表现成波形变差或保护误动作。

## 3. 物理直觉

控制 ISR 像心跳，周期短且不能漏拍；后台任务像体检报告，可以慢一些，但不能挡住心跳。UPS 固件要让快路径只做必须实时完成的动作，把通信、显示、日志这类慢路径移出 ISR。

## 4. 数学形式

控制周期：

```text
T_control = 1 / f_control
```

ISR 执行时间预算：

```text
t_isr = t_adc + t_control + t_protection + t_pwm_update
margin = budget_isr - t_isr
deadline_miss = margin < 0
```

默认仿真参数：

```text
f_control = 10 kHz
f_telemetry = 200 Hz
f_comm = 50 Hz
ISR budget = 70 us
```

## 5. 仿真观察

运行：

```powershell
python simulations\python\ups_firmware_scheduler.py
```

脚本默认生成并尝试自动打开：

```text
simulations/results/ups_firmware_scheduler.png
```

图中第一栏显示控制 ISR 执行时间与预算；第二栏显示 ADC、保护和 PWM 更新事件；第三栏显示遥测任务和通信任务；第四栏显示故障锁存与后台负载。

可故意制造超时：

```powershell
python simulations\python\ups_firmware_scheduler.py --control-time-us 52 --output simulations\results\ups_scheduler_deadline_fail.png --no-open
python simulations\python\ups_firmware_scheduler.py --communication-frequency 200 --output simulations\results\ups_scheduler_comm_200hz.png --no-open
```

一个仿真任务：对比默认图、`ups_scheduler_deadline_fail.png` 和 `ups_scheduler_comm_200hz.png`。重点判断“ISR 超时”和“后台通信变密”是不是同一类问题。

## 6. 固件落地

读 C 工程时可按这个顺序找：

- `isr.c` 或 `control.c`：控制 ISR，包含 ADC 结果读取、保护快速判断、控制计算、PWM 更新。
- `scheduler.c`：周期任务调度标志，例如 1 ms、10 ms、100 ms 任务。
- `communication.c`：通信任务（communication task），不应长时间占用中断。
- `protection.c`：快速保护和锁存保护的边界。
- `log.c`：故障发生后的证据记录。

## 7. 常见误解

- 错误理解：控制频率 10 kHz，只要 CPU 平均占用不高就没问题。  
  正确理解：实时任务看最坏情况截止时间，某一次 ISR 超时也可能破坏 PWM 更新。
- 错误理解：通信任务放进 ISR 最稳。  
  正确理解：通信帧处理时间长且抖动大，通常应放后台或低优先级中断。
- 错误理解：保护逻辑全部放后台任务也可以。  
  正确理解：快速过流、过压等风险通常要在硬件比较器或控制 ISR 快路径处理。

## 8. 验收标准

- 能解释控制 ISR、后台任务、实时调度的分工。
- 能根据图中的 `ISR budget` 和执行时间判断是否超时。
- 能说明为什么通信任务不应阻塞控制 ISR。
- 能基于 `ups_firmware_scheduler.png` 准备导师问题。

## 9. 复盘问题

- 默认仿真中，控制周期是多少微秒？ISR 执行时间是多少微秒？剩余裕量是多少？
- 为什么通信任务执行时间可以大于 ISR 预算，却不一定造成 ISR deadline miss？
- 把 `--control-time-us` 改为 52 后，图标题里的 deadline 状态如何变化？这说明什么？

## 10. 导师问题

- 我用 `ups_firmware_scheduler.py` 看到通信任务默认 50 Hz，执行时间比 ISR 预算长，所以它被放在后台。公司工程里通信任务一般由主循环、RTOS 任务还是低优先级中断处理？
- 我把 `--control-time-us` 改到 52 后图中出现 deadline fail。真实工程里通常怎样测量控制 ISR 的最坏执行时间？
- 如果保护既有硬件比较器又有软件阈值，公司代码里快速保护和状态机锁存之间如何分层？
