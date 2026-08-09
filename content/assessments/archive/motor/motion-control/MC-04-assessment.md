---
date: 2026-08-01
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-04 模块测验"
tags:
  - motor-control
  - 测验
  - FOC
status: learning
summary: "**问题:** FOC的完整信号链路中包含哪些变换和控制器模块？画出Clark→Park→IdPI→IqPI→iPark→SVPWM+前馈解耦的信号流。"
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-04 模块测验
### 第1题 [中等] - 信号流顺序 ★★
**问题:** FOC的完整信号链路中包含哪些变换和控制器模块？画出Clark→Park→IdPI→IqPI→iPark→SVPWM+前馈解耦的信号流。
**参考答案:**
- 完整信号流（按执行顺序）：
  ```
  三相电流采样 ia, ib, ic
       │
       ▼
  ┌─────────┐
  │  Clark   │  abc → αβ
  └────┬────┘
       │ iα, iβ
       ▼
  ┌─────────┐
  │   Park   │  αβ → dq (需电角度θe)
  └────┬────┘
       │ id, iq
       ▼
  ┌────┴────────────────┐
  │                     │
  ▼                     ▼
┌────┐              ┌────┐
│IdPI│              │IqPI│  电流环PI控制器
└─┬──┘              └─┬──┘
  │ Vd_ref            │ Vq_ref
  │   ┌───────────────┤
  │   ▼               ▼
  │  前馈解耦：       前馈解耦：
  │  Vd = Vd_pi + (-ωe·Lq·Iq)
  │                   Vq = Vq_pi + ωe·(Ld·Id+ψpm)
  │                     │
  ▼                     ▼
  ┌──────────┐
  │  iPark   │  dq → αβ
  └────┬─────┘
       │ Vα, Vβ
       ▼
  ┌──────────┐
  │  SVPWM   │  αβ → 三相PWM占空比
  └────┬─────┘
       │
       ▼
  三相PWM输出 → 逆变器 → 电机
  ```
- 关键要点：前馈解耦叠加在PI输出之上，一起送入iPark；电角度θe同时用于Park正变换和iPark逆变换

### 第2题 [较难] - 耦合前馈 ★★★
**问题:** 为什么需要ωe·Lq·Iq和ωe·(Ld·Id+ψpm)的交叉解耦？如果没有前馈只有PI，高速时Id/Iq的耦合会如何表现？
**参考答案:**
- **耦合本质**：dq电压方程中，d轴电压受iq影响（-ωe·Lq·iq项），q轴电压受id影响（ωe·Ld·id项）。这意味着d轴和q轴的控制回路不是独立的——改变iq会影响Vd，改变id会影响Vq
- **没有前馈时的表现**：
  - 低速时：ωe很小，耦合项ωe·Lq·Iq和ωe·Ld·Id接近零，PI可以独立控制id和iq，性能良好
  - 高速时：ωe增大，耦合项成为电压方程的主导项。PI的积分作用需要"慢慢"积累来抵消耦合干扰，但耦合随转速增大越来越强，导致：
    1. id和iq之间出现振荡和交叉干扰——改变iq指令会引起id的波动
    2. PI输出饱和：积分器持续累积以补偿耦合电压，容易进入饱和区
    3. 动态响应变差：负载突变时id/iq恢复时间明显变长，转矩波动
- **前馈解耦的作用**：
  - 在PI输出上叠加耦合项的补偿值：Vd_ff = -ωe·Lq·Iq，Vq_ff = ωe·(Ld·Id+ψpm)
  - 这样PI只需处理动态偏差（实际电流与指令的差值），不需要"对抗"耦合项
  - 效果：id和q轴完全解耦，两个PI独立工作，高速动态性能与低速一致
- 工程实践：前馈解耦是FOC高速性能的关键。取消前馈后，电机电流THD在高速段会明显恶化

### 第3题 [较难] - 采样陈旧检测 ★★★
**问题:** lxfoc中pipeline的sample_counter如何检测采样新鲜度？为什么需要使用sample_stale_fault标志？
**参考答案:**
- **sample_counter机制**：
  - 每次ADC采样中断完成时，sample_counter递增
  - FOC控制循环每次执行时读取当前sample_counter值，与上一次执行的值比较
  - 如果两次值相同，说明本轮没有新的采样数据进来——采样陈旧（stale）
  - 如果两次值不同，说明有新鲜采样数据，可以正常执行控制计算
- **为什么需要sample_stale_fault标志**：
  1. **检测ADC/定时器故障**：如果ADC中断因硬件错误或配置问题停止触发，sample_counter不再增长。sample_stale_fault标志可以及时报告此异常
  2. **防止重复计算**：没有新采样时如果继续执行FOC，会用旧的采样数据重复计算PI输出，导致积分器windup和输出异常。stale标志阻止这种重复执行
  3. **多速率系统同步**：在电流环+速度环+位置环的多速率架构中，快速环（电流环10kHz）可能比慢速环（速度环1kHz）执行更多次。stale标志确保慢速环只在有新数据时才更新
  4. **安全保护**：如果检测到连续N个控制周期采样都陈旧，触发sample_stale_fault进入保护状态（关断PWM），避免电机失控
- 设计要点：这是一个典型的"新鲜度戳"(freshness stamp)模式，广泛用于实时嵌入式系统的数据同步

### 第4题 [中等] - 积分饱和传递 ★★
**问题:** 如果电流环PI饱和导致电压指令超过母线电压，如何通过anti-windup防止积分饱和？为什么windup能在几个时间步内传递到所有循环？
**参考答案:**
- **Anti-windup方法（Back-calculation）**：
  ```
  Vd_raw = Kp·e + Ki·∫e·dt        // PI原始输出
  Vd_lim = clamp(Vd_raw, -Vmax, Vmax)  // 限幅
  error_back = Vd_lim - Vd_raw     // 饱和误差 = 限幅后 - 限幅前（饱和时为负值）
  integral += Ki·e·dt + Kback·error_back  // 积分项 + 回算补偿
  ```
  - 当不饱和时：Vd_lim = Vd_raw，error_back = 0，anti-windup不作用
  - 当饱和时：Vd_lim ≠ Vd_raw，error_back为负，将积分项往反方向拉回，防止积分器继续累积
- **为什么windup能在几个时间步内传递到所有循环**：
  1. **级联结构**：FOC是电流环→电压→SVPWM的链路。电流环PI饱和→电压指令被截断→实际施加的电压≠期望电压→电流偏差持续存在→积分器继续累积
  2. **正反馈效应**：饱和后积分器不断累积（windup），当指令突然改变方向时，积分器需要先"卸载"累积量才能响应。这个卸载过程就是积分器从饱和值恢复到合理值的过程，需要多个时间步
  3. **传播速度**：每个PWM周期（如50μs）执行一次FOC，windup每步增加Ki·e·Ts。如果e=10A, Ki=100, Ts=50μs，每步windup量=0.05V。积分器从0饱和到Vmax=200V需要200/0.05=4000步（200ms），看似不慢。但一旦饱和，反向响应时积分器需要同样长的时间卸载，表现为严重的超调和振荡
- Anti-windup的Kback选取：通常 Kback = 1/Ti（Ti为积分时间常数），使积分器的衰减时间常数等于Ti，实现"临界回算"
