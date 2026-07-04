---
title: 电流环 PI 参数整定计算器
date: 2026-07-02
section: 电机控制
chapter: algorithm
chapterTitle: 控制算法
category: 控制算法
tags:
  - imported
source: motor
sourcePath: algorithm/ALG-00-PI-Calculator.html
status: learning
visibility: public
summary: Imported from algorithm/ALG-00-PI-Calculator.html
chapterOrder: 20
navGroup: 控制与算法
navGroupOrder: 30
---

# 电流环 PI 参数整定计算器

基于极零对消法（Pole-Zero Cancellation）的一阶电流环PI调节器参数计算与可视化

     电机电气参数输入

       快速选择真实电机参数：

        -- 自定义输入 --

          200W IPMSM (Ld=0.08mH, Rs=0.06Ω, 24V/200W)

          小型高速PMSM (L=0.104mH, R=0.105Ω)

          4310云台 (L=4.74mH, R=10.9Ω, 16V/512rpm/28极)

        相电感 L (mH)

        相电阻 R (&Omega;)

        PWM 频率 fPWM (kHz)

        期望带宽 &alpha; (rad/s)
        3000

        100
        &alpha;max = --
        20000

      核心公式（极零对消法）：

      &tau; = L / R（电气时间常数）&rarr;
      Kp = &alpha; &times; L &rarr;
      Ki = &alpha; &times; R

      闭环传递函数：Gcl(s) = &alpha; / (s + &alpha;)，等效为一阶惯性环节

      &alpha;max = 2&pi; &times; fPWM / 20（建议不超过PWM频率的1/20）

     计算结果

        电气时间常数 &tau;
        --
        ms

        比例增益 Kp
        --
        V/A

        积分增益 Ki
        --
        V/(A&middot;s)

        闭环时间常数 &tau;cl
        --
        ms

        加速比 &tau; / &tau;cl
        --
        &times;

        上升时间 (10%~90%)
        --
        ms

        闭环带宽
        --
        Hz

        &alpha;max 推荐上限
        --
        rad/s

      --

     不同 &alpha; 值对比

| &alpha; (rad/s) | Kp (V/A) | Ki (V/(A&middot;s)) | &tau;cl (ms) | 上升时间 (ms) | 带宽 (Hz) | 安全性 |
| --- | --- | --- | --- | --- | --- | --- |

     频域 / 时域响应可视化

### 开环 Bode 图（幅频特性）

### 闭环阶跃响应

     导出参数
    &#8634; 恢复默认
