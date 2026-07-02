---
date: 2026-06-14
category: 电源控制
source: power
visibility: public
title: "学习记录 #0022：OTA升级与安全启动——固件安全的全链路保障"
tags:
  - power-electronics
status: learning
summary: "**日期**：2026-06-13 **课程**：第22课 — OTA升级与安全启动（Phase 4架构设计与对比） **状态**：进行中"
---

# 学习记录 #0022：OTA升级与安全启动——固件安全的全链路保障

**日期**：2026-06-13
**课程**：第22课 — OTA升级与安全启动（Phase 4架构设计与对比）
**状态**：进行中

## 关键洞察

1. **A/B双区**：升级写入备用分区，当前运行不受影响，失败可回滚
2. **PENDING→VALID**：新固件标记PENDING，Bootloader首次验签通过才标记VALID
3. **ECDSA-256**：64字节签名+20ms验签，比RSA-2048更适合MCU
4. **防降级**：min_version单调递增，存储在受保护Flash区域
5. **升级时旁路**：在线式UPS升级前切旁路，重启期间负载不断电
6. **Bootloader决策**：验签→选择→跳转，永远不启动未验签固件
7. **UPS和电机OTA设计完全相同**，差异只在传输协议和安全状态

## 下一步

进入第23课：面试实战
