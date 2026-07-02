---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：PCS 储能 DC-DC 与模式状态机
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0046-pcs-storage-dcdc-mode-state-machine.html` 的源稿。
---

# 概念：PCS 储能 DC-DC 与模式状态机

本页是 `lessons/0046-pcs-storage-dcdc-mode-state-machine.html` 的源稿。

## 它是什么

双向 DC-DC 变换器（bidirectional DC-DC converter）连接电池和直流母线。PCS 模式状态机（PCS mode state machine）协调待机、预充、并网充电、并网放电、离网构网和故障停机。

## 为什么 UPS/PCS 需要它

UPS 软件骨架里的状态机、保护、故障锁存、通信和参数管理都可扩展到 PCS，但 PCS 还要处理电池、BMS 和并网/离网功率流。

## 数学形式

```text
charge:    grid -> AC/DC -> DC bus -> DC/DC -> battery
discharge: battery -> DC/DC -> DC bus -> DC/AC -> grid/load
allowed = precharge_ok and contactor_ok and no_fault and command_valid
```

## 一个仿真任务

设计 Standby -> Precharge -> GridCharge -> GridDischarge -> GridForming -> Fault 状态机，注入 BMS 禁止和 PLL 失锁事件。

## 验收标准

- 能画出 PCS 能量路径。
- 能列出并网充电、并网放电、离网构网的进入条件。
- 能说明故障闭环如何关闭 PWM、断开接触器并上报状态。

## 导师问题

BMS 限制、PCS 故障和调度命令的优先级如何阅读？
