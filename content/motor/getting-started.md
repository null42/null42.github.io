---
title: 电机控制入口
date: 2026-06-30
updated: 2026-07-08
section: 电机控制
category: 电机控制
tags:
  - FOC
  - SVPWM
  - Observer
source: motor
status: learning
visibility: public
quality: curated
summary: 电机控制知识库入口，整理控制理论、基础算法底座、FOC 算法、硬件驱动、功率链路、运动控制和工程验证内容。
---

# 电机控制入口

这里收纳真正的电机控制知识库文档，来源以 `motor-control-knowledge-base` 为准。旧网页仿真内容不进入公开入口；真实知识库里的 C 仿真章节保留。

当前导航按学习路线组织：先看总览，再补电力电子和硬件基础，然后进入控制理论、基础算法底座、FOC/SVPWM、仿真与工程验证。

## 电机学习地图

<div class="kb-map-grid">
  <a class="kb-map-card" href="/content/motor/README.html">
    <span class="kb-map-kicker">总览</span>
    <strong>先建立全局地图</strong>
    <span>查看知识库来源、模块清单和学习路径，先知道每条路线通向哪里。</span>
  </a>
  <a class="kb-map-card" href="/content/foundations/power-electronics-basics/EE-01-Resistance-Capacitance-Inductance-Basics.html">
    <span class="kb-map-kicker">基础与硬件</span>
    <strong>电力电子基础 -> 硬件与驱动</strong>
    <span>从 RLC、MOSFET、H 桥、电流采样、位置传感和功率链路补齐硬件边界。</span>
  </a>
  <a class="kb-map-card" href="/content/foundations/control-theory/CT-01-Open-Loop-Closed-Loop.html">
    <span class="kb-map-kicker">控制理论</span>
    <strong>闭环 -> PID -> 频域 -> 状态空间</strong>
    <span>先理解反馈、稳定性、带宽、极点零点和观测器，再进入电流环和速度环。</span>
  </a>
  <a class="kb-map-card" href="/content/motor/foundations/FOUND-01-Per-Unit-System.html">
    <span class="kb-map-kicker">基础算法底座</span>
    <strong>标幺 -> 定点 -> SPWM -> SVPWM -> 三电平SVPWM</strong>
    <span>把算法落到 DSP 实现：数值尺度、Q格式、载波比较、空间矢量和中点平衡。</span>
  </a>
  <a class="kb-map-card" href="/content/motor/algorithm/ALG-00-Current-Loop-Intuition.html">
    <span class="kb-map-kicker">控制算法</span>
    <strong>电流环 -> FOC -> 弱磁 -> 观测器</strong>
    <span>进入电流环、坐标变换、解耦、MTPA、弱磁、过调制和无感控制。</span>
  </a>
  <a class="kb-map-card" href="/content/foundations/simulation/c-simulation/SIM-00-C-Simulation-Overview.html">
    <span class="kb-map-kicker">实践与验证</span>
    <strong>C 仿真 -> 工程实践 -> 硬件验证</strong>
    <span>保留真实知识库的仿真章节，用于把算法放进 C 仿真与调试流程。</span>
  </a>
</div>

## 入口顺序

1. [总览](/content/motor/README.html)：确认知识库范围和完整路线。
2. [电力电子基础](/content/foundations/power-electronics-basics/EE-01-Resistance-Capacitance-Inductance-Basics.html)：先补器件、拓扑和采样常识。
3. [控制理论](/content/foundations/control-theory/CT-01-Open-Loop-Closed-Loop.html)：建立闭环、频域和状态空间语言。
4. [基础算法底座](/content/motor/foundations/FOUND-01-Per-Unit-System.html)：学习标幺、定点、SPWM、SVPWM 和三电平 SVPWM 的 DSP 实现。
5. [控制算法](/content/motor/algorithm/ALG-00-Current-Loop-Intuition.html)：进入电流环、FOC、弱磁和观测器。
6. [仿真与调试](/content/foundations/simulation/c-simulation/SIM-00-C-Simulation-Overview.html)：把算法放进 C 仿真与验证流程。
