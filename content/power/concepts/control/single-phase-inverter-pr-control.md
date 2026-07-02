---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相逆变器比例谐振电压控制
tags:
  - power-electronics
status: learning
summary: 比例谐振控制（proportional resonant control / PR control）是一种适合正弦交流量的电压环（voltage loop）控制方法。比例项负责快速响应，谐振项专门在目标频率附近累积误差并给出校正量。
---

# 概念：单相逆变器比例谐振电压控制

## 1. 它是什么

比例谐振控制（proportional resonant control / PR control）是一种适合正弦交流量的电压环（voltage loop）控制方法。比例项负责快速响应，谐振项专门在目标频率附近累积误差并给出校正量。

本节只讲一个概念：对 50 Hz 正弦输出，普通比例控制会留下交流稳态误差；PR 控制在 50 Hz 处提高增益，可以显著降低正弦稳态跟踪误差。

保密边界：不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）的逆变器需要让输出电压跟随正弦参考。负载变重、LC 滤波器压降、直流母线变化都会让输出电压偏离参考。若只用普通比例控制，误差通常不会完全消失。

PR 控制常用于单相逆变器输出电压控制。它让固件在基波频率处更有“纠偏能力”，帮助输出 RMS 和波形跟随参考，同时仍然可以配合限幅、保护和状态机。

## 3. 物理直觉

比例控制像“看到误差就推一下”，但对持续旋转的正弦误差，它每一刻推的方向都在变，容易留下残余误差。PR 控制像一个只盯住 50 Hz 的记忆器：如果 50 Hz 分量长期存在误差，它会不断积累并补偿这一频率的误差。

## 4. 数学形式

连续域常见表达是：

```text
Gpr(s) = Kp + Kr * 2*wc*s / (s^2 + 2*wc*s + w0^2)
```

本节教学仿真用更直观的同步投影形式表示 50 Hz 谐振记忆：

```text
e = v_ref - v_out
xs += e * sin(theta) * dt
xc += e * cos(theta) * dt
u_res = Kr * (xs*sin(theta) + xc*cos(theta))
m_cmd = clamp(v_ref/Vdc + Kp*e + u_res/Vdc, -m_limit, m_limit)
```

其中 `theta = 2*pi*50*t`。这不是公司内部实现，只是为了让你看清“谐振项如何记住目标频率误差”。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_inverter_pr_control.py
```

观察顺序：
- 先看 `v_ref` 和 `v_out`，确认输出电压跟随参考。
- 再看 `Voltage error e_v`，对比负载阶跃后误差是否恢复。
- 看 `m_cmd` 是否碰到限幅，避免把控制效果误判为过调制。
- 看 `i_load` 在负载从 48.4 ohm 变到 32 ohm 后是否增大。

脚本默认保存并自动打开图片；如果无法自动打开，会打印完整图片路径。

一个仿真任务：对比没有谐振项和有谐振项时，负载阶跃后的 50 Hz 电压跟踪误差、调制命令和负载电流。

```powershell
python simulations\python\single_phase_inverter_pr_control.py --resonant-gain 0 --output simulations\results\inverter_pr_Kr_0.png --no-open
python simulations\python\single_phase_inverter_pr_control.py --resonant-gain 80 --output simulations\results\inverter_pr_Kr_80.png --no-open
```

## 6. 固件落地

固件中可按下面链路理解：

```text
ADC Vout, iL, Vdc
  -> voltage reference from sine table or PLL angle
  -> e_v = v_ref - v_out
  -> PR voltage controller
  -> modulation command limit
  -> PWM compare update
  -> over-current / over-voltage / saturation checks
```

真实固件还要处理离散化、限幅、抗饱和、频率偏移、采样延迟和保护优先级。本节只把 PR 的基波误差校正讲清楚。

## 7. 常见误解

- 错误理解：PR 控制就是 PI 控制换个名字。  
  正确理解：比例积分（proportional integral / PI）擅长直流量零误差；PR 擅长交流正弦量在指定频率处小误差。
- 错误理解：PR 增益越大越好。  
  正确理解：增益过大可能放大噪声、引起振荡、触发调制限幅或让 LC 谐振更难处理。
- 错误理解：只要 PR 控制误差小，就不用保护。  
  正确理解：负载短路、过流、母线异常和采样故障仍然必须由保护逻辑处理。

## 8. 验收标准

- 能解释 `Kp`、`Kr`、`e_v`、`m_cmd` 各自代表什么。
- 能说出 PR 为什么比单纯比例控制更适合 50 Hz 正弦电压跟踪。
- 能根据图内参数框读出 Vdc、Vout_ref、f_out、L、C、负载阶跃、Kp、Kr、f_ctrl 和 t_end。
- 能解释为什么检查调制限幅是判断控制效果的必要步骤。
- 能基于 `single_phase_inverter_pr_control.py` 生成的仿真图准备导师问题。

## 9. 复盘问题

- 为什么 `Kr=0` 时仍可能有明显的 50 Hz 跟踪误差？
- 如果把 `Kr` 继续加大，除了误差变小，还可能带来哪些风险？
- 负载从 `48.4 ohm` 变到 `32 ohm` 后，为什么要同时观察 `v_out`、`e_v`、`m_cmd` 和 `i_load`？

## 10. 导师问题

- 我用 `single_phase_inverter_pr_control.py` 看到 `Kr=80` 比 `Kr=0` 的 50 Hz 跟踪误差小很多。公司 UPS 逆变器电压环通常用 PR、PI 旋转坐标系，还是其他结构？
- 仿真里 `m_cmd` 没有触碰 `m_limit=0.95`。真实固件里 PR 输出限幅后，是否有抗饱和处理或故障计数？
- 负载从 `48.4 ohm` 变到 `32 ohm` 后，`i_load` 增大但 `v_out` 恢复到参考附近。真实调试时会怎样区分控制环带宽不足、LC 参数问题和限流保护介入？
