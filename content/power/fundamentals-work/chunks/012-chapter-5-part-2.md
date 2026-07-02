---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第5章part 2 - 5 The Discontinuous Conduction Mode
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 169-176 > Chunk ID: `chapter-5-part-2`"
---

# 第5章part 2 - 5 The Discontinuous Conduction Mode

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 169-176  
> Chunk ID: `chapter-5-part-2`

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
5.4 Summary of Results and Key Points 155
5.4 An unregulated dc input voltage Vg varies over the range 35 V ≤Vg ≤70 V. A buck
converter reduces this voltage to 28 V; a feedback loop varies the duty cycle as necessary
such that the converter output voltage is always equal to 28 V . The load power varies over
the range 10 W≤Pload≤1000 W. The element values are
L= 22 μH C= 470 μF fs= 75 kHz
Losses may be ignored.
(a) Over what range of Vg and load current does the converter operate in CCM?
(b) Determine the maximum and minimum values of the steady-state transistor duty cy-
cle.
5.5 The transistors in the converter of Fig. 5.22 are driven by the same gate drive signal, so
that they turn on and oﬀin synchronism with duty cycle D.
Fig. 5.22 Watkins–Johnson
converter of Problem 5.5 + CR
+
VVg
Q1
D1
i(t)
L
D2
Q2
(a) Determine the conditions under which this converter operates in the discontinuous
conduction mode, as a function of the steady-state duty ratioD and the dimensionless
parameter K= 2L/RTs.
(b) What happens to your answer to Part (a) for D< 0.5?
(c) Derive an expression for the dc conversion ratio M(D, K). Sketch M vs. D for K= 10
and for K= 0.1, over the range 0≤D≤1.
5.6 In the buck converter illustrated in Fig. 5.23, the diode has forward voltage drop VF .Y o u
may model this voltage as being independent of current. All other elements should be mod-
eled as ideal. In this problem, you will show how this diode drop changes the equations of
the discontinuous conduction mode.
Fig. 5.23 Buck converter of
Problem 5.6 +
Q1
L
CR
+
VD1Vg
iL(t)
iD(t)
(a) Derive the conditions under which the converter operates in the discontinuous con-
duction mode. Express your result in terms of the quantities K= 2L/RTs and Kcrit.
Note that Kcrit may now depend not only on D, but also on other element values.

156 5 The Discontinuous Conduction Mode
(b) Derive closed-form analytical expressions for the conversion ratio M= V/Vg for both
continuous and discontinuous conduction modes.
(c) The element values are
VD= 0.5V fs= 250 kHz
Vg= 5V R= 4Ω
L1= 2.2 μH
C is large. Plot the conversion ratio M= V/Vg for the entire range 0≤D≤1.
(d) What happens near D= 0? Does the converter operate in CCM or DCM? Compare
with your result from part (a).
5.7 DCM mode boundary analysis of the ´Cuk converter of Fig. 5.24. The capacitor voltage
ripples are small.
+ D1
L1
C2 R
+
VQ1
C1
L2
Vg
i1 i2
iD
+ vC1
Fig. 5.24 ´Cuk converter, Problems 5.7, 5.8, 5.14,a n d5.15
(a) Sketch the diode current waveform for CCM operation. Find its peak value, in terms
of the ripple magnitudes ΔiL1, ΔiL2, and the dc components I1 and I2,o ft h et w o
inductor currents iL1(t) and iL2(t), respectively.
(b) Derive an expression for the conditions under which the ´Cuk converter operates in the
discontinuous conduction mode. Express your result in the form K< Kcrit(D), and
give formulas for K and Kcrit(D).
5.8 DCM conversion ratio analysis of the ´Cuk converter of Fig.5.24.
(a) Suppose that the converter operates at the boundary between CCM and DCM, with
the following element and parameter values:
D= 0.4 fs= 100 kHz
Vg= 120V R= 10Ω
L1= 54 μH L2= 27 μH
C1= 47 μF C2= 100 μF
Sketch the diode current waveformiD(t), and the inductor current waveformsi1(t) and
i2(t). Label the magnitudes of the ripples and dc components of these waveforms.
(b) Suppose next that the converter operates in the discontinuous conduction mode, with
ad iﬀerent choice of parameter and element values. Derive an analytical expression
for the dc conversion ratio M(D, K).

5.4 Summary of Results and Key Points 157
(c) Sketch the diode current waveform iD(t), and the inductor current waveformsi1(t) and
i2(t), for operation in the discontinuous conduction mode.
5.9 DCM mode boundary analysis of the modiﬁed SEPIC of Fig.5.25 The converter illustrated
in Fig. 5.25 is similar to the SEPIC, except that an additional diode is placed in series
with the input inductor L1. The objective of this problem is to analyze the discontinuous
conduction mode associated with large ripple in the inductor current i1(t).
+
D2
L1
C2
+
v
Q1
C1
L2
RVg
D1
i1
Fig. 5.25 Modiﬁed SEPIC for Problem 5.9
i1(t)
t0 DTs Ts
Conducting
devices: Q1, D1
D1Ts D2Ts D3Ts
D1, D2 D2
Fig. 5.26 Inductor current waveform i1(t)
For this problem, you may assume that the switching ripples in the current of inductor L2,
the voltage of capacitor C1, and the voltage of capacitor C2, are negligible. Figure 5.26
depicts the inductor current waveformi1(t) and the sequence of conducting devices for the
discontinuous conduction mode that is the subject of this problem. Neglect all losses.
(a) Derive an expression for the boundary between the discontinuous conduction mode
illustrated in Fig. 5.26 and the continuous conduction mode. Express your result in
terms of the parameters K and Kcrit(D), in the usual manner, and give expressions for
K and Kcrit.
(b) Derive the system of equations that relate the dc components of the important wave-
forms of the circuit in the discontinuous conduction mode of Fig. 5.26. Solve to ﬁnd
the conversion ratio:
M(D, K)= V
Vg
Your result should be a function of D and K only, with other intermediate variables
eliminated.

158 5 The Discontinuous Conduction Mode
5.10 DCM mode boundary analysis of the SEPIC of Fig. 5.27
+
D1L1
C2 R
+
VQ1
C1
Vg
i1
i2
iD
L2
Fig. 5.27 SEPIC, Problems 5.10 and 5.11
(a) Sketch the diode current waveform for CCM operation. Find its peak value, in terms
of the ripple magnitudes ΔiL1, ΔiL2, and the dc components I1 and I2,o ft h et w o
inductor currents iL1(t) and iL2(t), respectively.
(b) Derive an expression for the conditions under which the SEPIC operates in the dis-
continuous conduction mode. Express your result in the form K< Kcrit(D), and give
formulas for K and Kcrit(D).
5.11 DCM conversion ratio analysis of the SEPIC of Fig.5.27.
(a) Suppose that the converter operates at the boundary between CCM and DCM, with
the following element and parameter values:
D= 0.225 fs= 100 kHz
Vg= 120V R= 10Ω
L1= 50 μH L2= 75 μH
C1= 47 μF C2= 200μF
Sketch the diode current waveformiD(t), and the inductor current waveformsi1(t) and
i2(t). Label the magnitudes of the ripples and dc components of these waveforms.
(b) Suppose next that the converter operates in the discontinuous conduction mode, with
ad iﬀerent choice of parameter and element values. Derive an analytical expression
for the dc conversion ratio M(D, K).
(c) Sketch the diode current waveform iD(t), and the inductor current waveformsi1(t) and
i2(t), for operation in the discontinuous conduction mode.
5.12 An L−C input ﬁlter is added to a buck converter as illustrated in Fig. 5.28. Inductors L1
and L2 and capacitor C2 are large in value, such that their switching ripples are small. All
losses can be neglected.
(a) Sketch the capacitor C1 voltage waveform v1(t), and derive expressions for its dc
component V1 and peak ripple magnitudeΔv1.
(b) The load current is increased ( R is decreased in value) such that Δv1 is greater than
V1.
(i) Sketch the capacitor voltage waveform v1(t).
(ii) For each subinterval, determine which semiconductor devices conduct.

5.4 Summary of Results and Key Points 159
C1
+
v1
L2Q1
D1
+
L1
Vg R
+
v2C2
i1 i2
Fig. 5.28 Buck converter with input ﬁlter, Problems 5.12 and 5.13
(iii) Determine the conditions under which the discontinuous conduction mode oc-
curs. Express your result in the form K< Kcrit(D), and give formulas for K and
Kcrit(D).
5.13 Derive an expression for the conversion ratio M(D, K) of the DCM converter described
in the previous problem. Note: D is the transistor duty cycle.
5.14 In the Cuk converter of Fig. 5.24, inductors L1 and L2 and capacitor C2 are large in value,
such that their switching ripples are small. All losses can be neglected.
(a) Assuming that the converter operates in CCM, sketch the capacitor C1 voltage wave-
form vC1(t), and derive expressions for its dc componentV1 and peak ripple magnitude
ΔvC1.
(b) The load current is increased ( R is decreased in value) such thatΔvC1 is greater than
V1.
(i) Sketch the capacitor voltage waveform vC1(t).
(ii) For each subinterval, determine which semiconductor devices conduct.
(iii) Determine the conditions under which the discontinuous conduction mode oc-
curs. Express your result in the form K< Kcrit(D), and give formulas for K and
Kcrit(D).
5.15 Derive an expression for the conversion ratio M(D, K)o ft h eD C M ´Cuk converter de-
scribed in the previous problem. Note: D is the transistor duty cycle.
5.16 A DCM buck–boost converter as in Fig.5.21 is to be designed to operate under the follow-
ing conditions:
136 V≤Vg≤204 V
5W ≤Pload≤100 W
V=−150 V
fs= 100 kHz
You may assume that a feedback loop will vary to transistor duty cycle as necessary to
maintain a constant output voltage of−150 V .
Design the converter, subject to the following considerations:
•The converter should operate in the discontinuous conduction mode at all times
•Given the above requirements, choose the element values to minimize the peak inductor
current
•The output voltage peak ripple should be less than 1V .
Specify:

160 5 The Discontinuous Conduction Mode
(a) The inductor value L
(b) The output capacitor value C
(c) The worst-case peak inductor current ipk
(d) The maximum and minimum values of the transistor duty cycle D
5.17 A DCM boost converter as in Fig. 5.12 is to be designed to operate under the following
conditions:
18 V≤Vg≤36 V
5W ≤Pload≤100 W
V= 48 V
fs= 150 kHz
You may assume that a feedback loop will vary to transistor duty cycle as necessary to
maintain a constant output voltage of 48 V .
Design the converter, subject to the following considerations:
•The converter should operate in the discontinuous conduction mode at all times. To
ensure an adequate design margin, the inductance L should be chosen such that K is no
greater than 75% of Kcrit at all operating points.
•Given the above requirements, choose the element values to minimize the peak inductor
current.
•The output voltage peak ripple should be less than 1V .
Specify:
(a) The inductor value L
(b) The output capacitor value C
(c) The worst-case peak inductor current ipk
(d) The maximum and minimum values of the transistor duty cycle D.
(e) The values of D, K, and Kcrit at the following operating points: ( i) Vg = 18 V and
Pload = 5W ;( ii) Vg= 36 V and Pload = 5W ;( iii) Vg= 18 V and Pload = 100 W; (iv)
Vg= 36 V and Pload=100 W.
5.18 In dc–dc converters used in battery-powered portable equipment, it is sometimes required
that the converter continue to regulate its load voltage with high eﬃciency while the load
is in a low-power “sleep” mode. The power required by the transistor gate drive circuitry,
as well as much of the switching loss, is dependent on the switching frequency but not on
the load current. So to obtain high eﬃciency at very low load powers, a variable-frequency
control scheme is used, in which the switching frequency is reduced in proportion to the
load current.
Consider the boost converter system of Fig.5.29a. The battery pack consists of two nickel-
cadmium cells, which produce a voltage of V
g = 2.4V± 0.4 V . The converter boosts
this voltage to a regulated 5 V . As illustrated in Fig. 5.29b, the converter operates in the
discontinuous conduction mode, with constant transistor on-time ton. The transistor oﬀ-
time tof f is varied by the controller to regulate the output voltage.
(a) Write the equations for the CCM-DCM boundary and conversion ratio M= V/Vg,i n
terms of ton, tof f, L, and the eﬀective load resistance R.
For parts (b) and (c), the load current can vary between 100μA and 1 A. The transistor
on-time is ﬁxed: ton= 10 μs.
(b) Select values for L and C such that:
•The output voltage peak ripple is no greater than 50 mV ,

5.4 Summary of Results and Key Points 161
Fig. 5.29 Boost con-
verter employed in
portable battery-powered
equipment with sleep
mode, Problem 5.18:
(a) converter circuit,
(b) inductor current
waveform
(a) L
C R
+
v(t)Vg
i(t)
Battery pack Effective load
Iload
(b) i(t)
t
ipk
ton toff
•The converter always operates in DCM, and
•The peak inductor current is as small as possible.
(c) For your design of part (b), what are the maximum and minimum values of the switch-
ing frequency?
5.19 An unregulated dc input voltage Vg varies over the range 35V ≤Vg ≤70V. A buck
converter reduces this voltage to 28 V; a feedback loop varies the duty cycle as necessary
such that the converter output voltage is always equal to 28 V . The load power varies over
the range 10W≤P
load≤1000W. The buck converter elements areL= 22μH, C= 470μF,
fs= 75kHz. Losses may be ignored.
Pload
Vg
1000 W
10 W
75 V35 V
Fig. 5.30 Vg vs. Pload axes, Problem 5.19

162 5 The Discontinuous Conduction Mode
(a) Over what range of Vg and Pload does the converter operate in continuous conduction
mode? Sketch the mode boundary on the axes of Fig. 5.30, and identify the region
over which the converter operates in CCM.
(b) Determine the maximum and minimum values of the steady-state transistor duty cy-
cle.
```
