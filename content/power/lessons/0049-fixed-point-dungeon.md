---
title: 定点数闯关：一小时速通
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0049-fixed-point-dungeon.html
status: learning
visibility: public
summary: Imported from 0049-fixed-point-dungeon.html
chapterOrder: 10
---

上一节：MATLAB/Simulink 到 UPS 软件开发快速路线
    下一节：待定

      UPS/PCS 固件现场课

# 定点数闯关：一小时速通

你突然打开公司代码，发现电流环、PI、滤波器、功率计算、通信参数全在 Q 格式里来回切换。这个单 HTML 游戏把定点数拆成 14 个关卡：先看懂，再会算，最后能反推真实工程代码。

        开始闯关
        打开定点计算器
        看代码排错清单

      建议节奏

        10分钟
表示与 Q 格式
        20分钟
加减乘除与转换
        20分钟
ADC、PWM、PI 工程链路
        10分钟
读代码清单

进度保存在浏览器 localStorage；这个文件可以离线打开。

      关卡地图

      重置进度

## 定点计算器

用它验证公式：`raw = round(real * 2^Q)`，`real = raw / 2^Q`。切换位宽和 Q，观察分辨率、范围、饱和和十六进制。

          真实值 real

          Q 小数位

          总位宽

              16
              24
              32

          舍入方式

              round
              trunc
              floor

          raw 有符号整数
          hex 补码
          还原 real
          范围与分辨率

## Q 格式转换练习

工程里常见：ADC 结果是 Q12，PI 系数是 Q24，PWM 占空比要 Q15。这个小工具只做一件事：看清楚左移和右移到底在改什么。

          raw 输入

          源 Q

          目标 Q

          位宽

              16
              32

          真实值
          目标 raw
          移位动作
          误差

## 移位口算训练营

定点移位不用十六进制也能算。把它翻译成倍率：`左移 n 位 = 乘 2^n`，`右移 n 位 = 除 2^n`。先背锚点：`2^3=8`、`2^9=512`、`2^15=32768`。

          Q12 -> Q15Q 增加 3 位，raw 乘 8。例：1024 变 8192，真实值仍是 0.25。
          Q24 -> Q15Q 减少 9 位，raw 除 512。低 9 位会丢失，最好考虑舍入。
          Q15 心算锚点1.0 约 32768，0.5 是 16384，0.25 是 8192，0.125 是 4096。

          raw

          移位位数 n

          方向

              左移
              右移

          心算倍率

          一句话
          结果 raw
          常用锚点2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^8=256, 2^9=512, 2^10=1024, 2^15=32768
          读代码提示看到 >>15，先读成“除以 32768，通常是在从 Q30 拉回 Q15”。

## 定标站：raw 到工程量

**定标不是标幺值。**定标 calibration/scaling 是把原始数字换成有意义的工程量；标幺值是把工程量除以基准值。典型链路是：`adc_count -> 定标 -> 物理量 -> 标幺值 -> Q 格式`。

          adc_count

          offset

          scale/gain

          base 基准值

          定标后物理量
          标幺值 pu
          Q15 raw
          定标系数可能包含ADC 参考电压、采样电阻分压比、运放增益、传感器灵敏度、单位换算、Q 缩放。

```text
int32_t vbus_q15 = (adc_raw - offset) * vbus_scale_q15;
// vbus_scale_q15 是定标系数：每个 ADC count 对应多少电压或多少 pu。
// 它不是 vbus_pu 本身，而是 raw 到工程量的换算桥。
```

## 从公司代码反推 Q 格式：调试清单

### 1. 找单位

变量名如果叫 `iL_q15`、`vbus_pu`、`theta_q24`，先判断它是物理量、标幺值、角度，还是 PWM 比较值。

### 2. 找缩放点

盯住 ADC 标定、通信参数写入、PI 系数初始化、乘法右移。缩放点通常藏在 `>`、`_IQ()`、`Qmpy` 里。

### 3. 找定标

定标系数常叫 `scale`、`gain`、`coef`、`k`。它可能把 ADC count 换成 V/A，也可能直接换成 pu 或某个 Q 格式 raw。

### 4. 找保护

没有饱和的定点控制器很危险。看到积分器、滤波器、功率累加时，检查是否有 `SAT_Q15`、限幅、抗积分饱和。

| 代码现象 | 你该问的问题 | 典型判断 |
| --- | --- | --- |
| `x >> 15` | 前面是否做了 Q15 乘法？ | `(a_raw * b_raw) >> Q` 常用于把 Q30 拉回 Q15。 |
| `int64_t acc` | 是否在做乘加、功率或滤波器累加？ | 乘法中间结果需要更宽位宽，避免还没右移就溢出。 |
| `vbus_pu` | 基准值是多少？ | 标幺值常把额定电压、电流或功率映射为 1.0。 |
| `coeff_q24` | 系数为何比信号 Q 更高？ | 小系数需要更多小数位保存精度，乘完再转换到输出 Q。 |
| `raw

## 工程参考

这节课的术语对齐到常见 DSP 固件生态：Arm 的 CMSIS-DSP 有 Q7/Q15/Q31 等定点类型和饱和转换；TI IQmath 面向 C28x 固定 Q 格式运算；Microchip LibQ 覆盖 Q15、Q31 等定点数学函数。

- [CMSIS-DSP fixed point datatypes](https://arm-software.github.io/CMSIS-DSP/main/group__FIXED.html)

- [TI C28x IQmath Library](https://www.ti.com/lit/pdf/sprc990)

- [Microchip LibQ Fixed-Point Math Library](https://onlinedocs.microchip.com/oxy/GUID-9A1A39D4-F5A9-4AB5-89CC-20C51E2EECD5-en-US-2/GUID-3ED447D8-D99A-4C6B-8FC6-D18BFEA65B2B.html)
