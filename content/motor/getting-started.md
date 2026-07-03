---
title: 电机控制入口
date: 2026-06-30
section: 电机控制
category: 电机控制
tags:
  - FOC
  - SVPWM
  - Observer
source: motor
status: learning
visibility: public
summary: 电机控制知识库入口，整理控制理论、FOC 算法、硬件驱动、功率链路、运动控制和工程实践内容。
---

# 电机控制入口

这里收纳真正的电机控制知识库文档，来源以 `motor-control-knowledge-base` 为准。

当前导航按学习路径组织：先看入门索引，再进入基础与硬件、控制与算法、实践验证、工程生态。原先从网页仿真组件搬来的几个演示页已经移除，交互仿真后续会作为独立工具重新整理，不混进知识库文章流。

## 电机学习地图

<div class="kb-map-grid">
  <a class="kb-map-card" href="/content/motor/README.html">
    <span class="kb-map-kicker">总览</span>
    <strong>先建立全局地图</strong>
    <span>查看知识库来源、模块清单和学习路径，先知道每条路线通向哪里。</span>
  </a>
  <a class="kb-map-card" href="/content/motor/electronics-basics/EE-01-Resistance-Capacitance-Inductance-Basics.html">
    <span class="kb-map-kicker">基础与硬件</span>
    <strong>电力电子基础 -> 硬件与驱动</strong>
    <span>从 RLC、MOSFET、H 桥、电流采样、位置传感和功率链路补齐硬件边界。</span>
  </a>
  <a class="kb-map-card" href="/content/motor/control-theory/CT-01-Open-Loop-Closed-Loop.html">
    <span class="kb-map-kicker">控制与算法</span>
    <strong>控制理论 -> FOC / SVPWM / 观测器</strong>
    <span>先理解闭环、PID、频域和状态空间，再进入电流环、弱磁、MTPA 与无感控制。</span>
  </a>
  <a class="kb-map-card" href="/content/motor/simulation/SIM-00-C-Simulation-Overview.html">
    <span class="kb-map-kicker">实践与验证</span>
    <strong>C 仿真 -> 工程实践 -> 硬件验证</strong>
    <span>这里保留真实知识库的 /content/motor/simulation/ 章节，不包含旧网页演示目录。</span>
  </a>
</div>

## 入口顺序

1. [总览](/content/motor/README.html)：确认知识库范围和完整路径。
2. [电力电子基础](/content/motor/electronics-basics/EE-01-Resistance-Capacitance-Inductance-Basics.html)：先补器件、拓扑和采样常识。
3. [控制理论](/content/motor/control-theory/CT-01-Open-Loop-Closed-Loop.html)：建立闭环和频域分析语言。
4. [控制算法](/content/motor/algorithm/ALG-00-Current-Loop-Intuition.html)：进入电流环、FOC、SVPWM 和观测器。
5. [仿真与调试](/content/motor/simulation/SIM-00-C-Simulation-Overview.html)：把算法放进 C 仿真与验证流程。
