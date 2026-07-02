---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第23章part 3 - 23 Soft Switching
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 1032-1033 > Chunk ID: `chapter-23-part-3`"
---

# 第23章part 3 - 23 Soft Switching

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 1032-1033  
> Chunk ID: `chapter-23-part-3`

## 主干提取

- TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。

## 术语表

| English term | 中文译名 | Notes |
|---|---|---|
| TODO | TODO | TODO |

## 中文翻译

TODO: 在这里写专业、通顺、前后一致的中文译文。

## 英文原文

```text
23.5 Summary of Key Points 1035
+
Ds
Q
CR
+
v
1 : n
vg
Lmp Cws
Dp
Cp
Cs
Fig. 23.44 High-voltage dc–dc converter containing a resonant switch network, Problem 23.2
(c) What is the tank resonant frequency?
(d) Sketch the waveforms of the transistor drain-to-source voltage and transformer mag-
netizing current.
23.3 In the transformer-isolated dc–dc converter of Fig.23.45, capacitors C1 and C2 and induc-
tors L1 and LM are relatively large in value, so that they have small switching ripples. The
transformer model includes an ideal 1: n transformer, in conjunction with magnetizing in-
ductance LM (referred to the primary side) and leakage inductances Lℓ1 and Lℓ2 as shown.
Transistor Q1 exhibits output capacitances Cds, while the output capacitance of diode D1
is Cd. MOSFET Q1 contains a body diode (not explicitly shown). Other nonidealities can
be ignored. The resonant switch is well-designed, such that all elements listed above con-
tribute to ideal operation of the converter and resonant switch.
+
D1
L1
C2
+
v
Q1
C1
RVg
1 : n
i1
Ideal
Transformer
model
LM
L 1 L 2
Cds
Cd
Fig. 23.45 Transformer-isolated dc–dc converter containing a resonant switch network, Problem 23.3

1036 23 Soft Switching
(a) What type of resonant switch is employed? What is the parent PWM converter?
(b) Which semiconductor devices operate with zero-voltage switching? With zero-current
switching?
23.4 A buck–boost converter is realized using a half-wave ZCS quasi-resonant switch. The
load resistance has value R, the input voltage has value Vg, and the converter switching
frequency is fs.
(a) Sketch the circuit schematic.
(b) Write the complete system of equations that can be solved to determine the output
voltage V, in terms of the quantities listed above and the component values. It is not
necessary to actually solve your equations. You may also quote results listed in this
textbook.
23.5 It is desired to design a half-wave zero-current-switching quasi-resonant forward converter
to operate with the following speciﬁcations: V
g = 320 V, V= 42 V, 5 W≤P≤100 W.
Design the converter to operate with a maximum switching frequency of 1 MHz and a
switch conversion ratio of μ= 0.45. Attempt to minimize the peak transistor current,
while maintaining zero-current switching at all operating points. You may neglect the
transformer magnetizing current, and ignore the transformer reset scheme.
(a) Specify your choices for the turns ratio n, and the tank elements Lr and Cr, referred
to the transformer secondary side.
(b) For your design of part (a), what is the minimum switching frequency?
(c) What is the worst-case peak transistor current?
23.6 Analysis of the ZVS quasi-resonant switch of Fig. 23.24.
(a) For each subinterval, sketch the resonant switch cell circuit, and derive expressions
for the tank inductor current and capacitor voltage waveforms.
(b) For subinterval 2, in which Q1/D1 are oﬀand D2 conducts, write the loop equation
which relates the tank capacitor voltage, tank inductor voltage, and any other net-
work voltages as appropriate. Hence, for subinterval 2 relate the integral of the tank
capacitor voltage to the change in tank inductor current.
(c) Determine the switch network terminal-waveform average values, and hence derive
an expression for the switch conversion ratioμ. Verify that your result coincides with
Eq. (23.61).
23.7 Analysis of the full-bridge zero-voltage transition converter of Sect. 23.4.1. The con-
verter of Fig. 23.36 operates with the waveforms illustrated in Fig. 23.38. According to
Eq. (23.68), the conversion ratio of this converter is given approximately by M(φ)= nφ.
Derive an exact expression for M, based on the waveforms given in Fig. 23.38. Your re-
sult should be a function of the length of subinterval 4, the load current, the switching
frequency, and the values of the inductance and capacitances. Note: there is a reasonably
simple answer to this question.
```
