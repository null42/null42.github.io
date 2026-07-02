---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第23章part 2 - 23 Soft Switching
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 1012-1031 > Chunk ID: `chapter-23-part-2`"
---

# 第23章part 2 - 23 Soft Switching

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 1012-1031  
> Chunk ID: `chapter-23-part-2`

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
23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell 1015
μ= FP1(Js) (23.57)
where P1(Js) is given by
P1(Js)= 1
2π
[1
2 Js+ 2π−sin−1(Js)+ 1
Js
⎦
1−
√
1−J2s
)]
(23.58)
In the full-wave case, P1(Js) is essentially independent of Js:
P1(Js)≈1 (23.59)
The worst-case deviation of P1(Js) from 1 occurs as Js tends to 1, where P1(Js) tends to 0.96.
So P1(Js) lies within 4% of unity for 0 < Js < 1. Hence, for the full-wave case, it is a good
approximation to express the switch conversion ratio as
μ≈F= fs
f0
(23.60)
The full-wave quasi-resonant switch therefore exhibits voltage-source output characteristics,
controllable by F. Equations describing the average waveforms of CCM PWM converters can
be adapted to apply to full-wave ZCS quasi-resonant converters, simply by replacing the duty
cycle d with the normalized switching frequency F. The conversion ratios of full-wave quasi-
resonant converters exhibit negligible dependence on the load current.
The variation of the switch conversion ratio μwith F and Js is plotted in Fig. 23.19.F o r
a typical voltage regulator application, the range of switching-frequency variations is much
smaller in the full wave mode than in the half-wave mode, because μdoes not depend on the
load current. Variations in the load current do not induce the controller to signiﬁcantly change
the switching frequency.Fig. 23.19 Characteristics of the
full-wave ZCS quasi-resonant switch
0 0.2 0.4 0.6 0.8 1
0
0.2
0.4
0.6
0.8
1
μ
Js
ZCS boundary
max F boundary
F = 0.2 0.4 0.6 0.8

1016 23 Soft Switching
23.3 Resonant Switch Topologies
So far, we have considered the zero-current-switching quasi-resonant switch cell, illustrated
in Fig. 23.20. The ideal SPST switch is realized using a voltage-bidirectional or current-
bidirectional two-quadrant switch, to obtain half-wave or full-wave ZCS quasi-resonant switch
networks, respectively.
Fig. 23.20 Basic ZCS quasi-
resonant switch cell
+
v2(t)
i1(t) i2(t)
+
v1(t)
Lr
Cr
ZCS quasi-resonant switch cell
Switch network
+
v1r(t)
i2r(t)
D2
SW
The resonant elements Lr and Cr can be moved to several diﬀerent positions in the converter,
without altering the basic switch properties. For example, Fig.23.21 illustrates connection of the
resonant tank capacitor Cr between the cathode of diode D2, and the converter output or input
terminals. Although this may change the dc component of the tank capacitor voltage, the ac
components of the tank capacitor voltage waveform are unchanged. Also, the terminal voltage
waveform v2(t) is unchanged. The voltages vg(t) and v(t) contain negligible high-frequency ac
components, and hence the converter input and output terminal potentials can be considered to
be at high-frequency ac ground.
A test to determine the topology of a resonant switch network is to replace all low-frequency
ﬁlter inductors with open circuits, and to replace all dc sources and low-frequency ﬁlter capac-
itors with short circuits [ 343]. The elements of the resonant switch cell remain. In the case of
the zero-current-switching quasi-resonant switch, the network of Fig. 23.22 is always obtained.
It can be seen from Fig. 23.22 that diode D2 switches on and oﬀat the zero crossings of the
tank capacitor voltage v2(t), while the switch elements Q1 and D1 switch at the zero crossings
of the tank inductor current i1(t). Zero-voltage switching of diode D2 is highly advantageous,
because it essentially eliminates the switching loss caused by the recovered charge and output
capacitance of diodeD2. Zero-current switching ofQ1 and D1 can be used to advantage whenQ1
is realized by an SCR or IGBT. However, in high-frequency converters employing MOSFETs,
zero-current switching of Q1 and D1 is generally a poor choice. Signiﬁcant switching loss due
to the output capacitances of Q1 and D1 may be observed. In addition, in the full-wave case,
the recovered charge of diode D1 leads to signiﬁcant ringing and switching loss at the end of
subinterval 2 [333].
The ZCS quasi-resonant switch exhibits increased conduction loss, relative to an equivalent
PWM switch, because the peak transistor current is increased. The peak transistor current is
given by Eq. (23.17); since Js≤1, the peak current is I1pk≥2I2. In addition, the full-wave ZCS
switch exhibits poor eﬃciency at light load, owing to the conduction loss caused by circulating
tank currents. The half-wave ZCS switch exhibits additional conduction loss due to the added

23.3 Resonant Switch Topologies 1017
(a)
+
v2(t)
i1(t) i2(t)
Vg
Lr
Cr
ZCS quasi-resonant switch
D2
SW
+
L
C R
+
V
(b)
+
v2(t)
i1(t) i2(t)
Vg
Lr
Cr
ZCS quasi-resonant switch
D2
SW
+
L
C R
+
V
Fig. 23.21 Connection of the tank capacitor of the ZCS quasi-resonant cell to other points at ac ground:
(a) connection to the dc output, ( b) connection to the dc input. In each case, the ac components of the
waveforms are unchanged
Fig. 23.22 Elimination of converter
low-frequency elements causes the
ZCS quasi-resonant switch cell to re-
duce to this network
+
v2(t)
i1(t)
Lr
CrD2
SW
forward voltage drop of diode D1. The peak transistor voltage is V1, which is identical to the
PWM case.
23.3.1 The Zero-Voltage-Switching Quasi-Resonant Switch
The resonant switch network illustrated in Fig. 23.23 is the dual of the network of Fig. 23.22.
This network is known as the zero-voltage-switching quasi-resonant switch [ 334]. Since the
tank capacitor Cr appears in parallel with the SPST switch, the elements Q1 and D1 used to

1018 23 Soft Switching
realize the SPST switch turn on and oﬀat zero voltage. The tank inductor Lr is eﬀectively in
series with diode D2, and hence diode D2 switches at zero current. Converters containing ZVS
quasi-resonant switches can be realized in a number of ways. The only requirement is that,
when the low-frequency ﬁlter inductors, ﬁlter capacitors, and sources are replaced by open-or
short circuits as described above, then the high-frequency switch network of Fig. 23.23 should
remain.
For example, a zero-voltage-switching quasi-resonant buck converter is illustrated in
Fig. 23.24a. Typical tank capacitor voltage and tank inductor current waveforms are given in
Fig. 23.24b. A current-bidirectional realization of the two-quadrant SPST switch is shown; this
causes the ZVS quasi-resonant switch to operate in the half-wave mode. Use of a voltage-
bidirectional two-quadrant SPST switch allows full-wave operation.
By analysis similar to that of Sect. 23.2, it can be shown that the switch conversion ratioμ
of the half-wave ZVS quasi-resonant switch is
μ= 1−FP
1
2
⎦1
Js
)
(23.61)
The function P1
2
(Js) is again given by Eq. (23.46), and the quantity Js is deﬁned in Eq. (23.44).
For the full-wave ZVS quasi-resonant switch, one obtains
μ= 1−FP1
⎦1
Js
)
(23.62)
where P1(Js) is given by Eq. (23.58). The condition for zero-voltage switching is
Js≥1 (23.63)
Thus, the zero-voltage switching property is lost at light load. The peak transistor voltage is
given by
peak transistor voltage Vcr,pk= (1+ Js)V1 (23.64)
This equation predicts that load current variations can lead to large voltage stress on transistor
Q1. For example, if it is desired to obtain zero-voltage switching over a 5:1 range of load current
variations, then Js should vary between 1 and 5. According to Eq. ( 23.64), the peak transistor
voltage then varies between two times and six times the applied voltage V1. The maximum
transistor current is equal to the applied current I2. Although the maximum transistor current
in the ZVS quasi-resonant switch is identical to that of the PWM switch, the peak transistor
blocking voltage is substantially increased. This leads to increased conduction loss, because
transistor on-resistance increases rapidly with rated blocking voltage.
Fig. 23.23 Elimination of converter low-frequency
elements reduces the ZVS quasi-resonant switch cell
to this network Lr
Cr
D2
SW

23.3 Resonant Switch Topologies 1019
(a)
Lr
Cr
D2
+
L
CR
+
VVg
I
+
v2(t)
i1(t) i2(t)
+
v1(t)
+ vCr(t)
iLr(t)
D1
Q1
(b)
 = 0t
vCr(t)
V1
iLr(t) I2
Subinterval: 12 3 4
Conducting
devices: Q1
D2
Q1D1
D2
X
0Ts
Fig. 23.24 A ZVS quasi-resonant buck converter: (a) circuit, (b) tank waveforms
23.3.2 The Zero-Voltage-Switching Multiresonant Switch
The resonant switch network of Fig. 23.25 contains tank capacitor Cd in parallel with diode D2,
as in the ZCS switch network of Fig.23.22. In addition, it contains tank capacitor Cs in parallel
with the SPST switch, as in the ZVS switch network of Fig.23.23. In consequence, all semicon-
ductor elements switch at zero voltage. This three-element resonant switch network is known as
the zero-voltage-switching multiresonant switch (ZVS MRS). Since no semiconductor output
capacitances or diode recovered charges lead to ringing or switching loss, the ZVS MRS ex-
hibits very low switching loss. For the same reason, generation of electromagnetic interference
is reduced.
A half-wave ZVS MRS realization of the buck converter is illustrated in Fig. 23.26.I na
typical design that must operate over a 5:1 load range and with 0 .4≤μ≤0.6, the designer
might choose a maximum F of 1.0, a maximum J of 1.4, and C
d/Cs= 3, where these quantities
are deﬁned as follows:

1020 23 Soft Switching
Fig. 23.25 Elimination of converter low-frequency
elements reduces the ZVS multiresonant switch cell
to this network Lr
Cs
D2
SW
Cd
Lr
D2
+
L
CR
+
VVg
I
+
v2(t)
i1(t) i2(t)
+
v1(t) Cd
Cs
D1
Q1
Fig. 23.26 Half-wave ZVS multiresonant buck converter
f0= 1
2π√LCt
R0=
√
L
Ct
F= fs
f0
J= I2R0
V1
(23.65)
As usual, the conversion ratio is deﬁned as μ= V2/V1. The resulting peak transistor voltage
for this typical design is approximately 2.8 V1, while the peak transistor current is 2 I2. Hence,
conduction losses are higher than in an equivalent PWM switch. The range of switch conversion
ratiosμis a function of the capacitor ratio Cd/Cs; in a good design, values of μranging from
nearly one to nearly zero can be obtained, with a wide range of dc load currents and while
maintaining zero-voltage switching.
Analysis and design charts for the ZVS MRS are given in [335–338]. Results for the typical
choice Cd= 3Cs are plotted in Fig.23.27. These plots illustrate how the switch conversion ratio
μvaries as a function of load current and switching frequency. Figure 23.27a also illustrates
the boundary of zero-voltage switching: ZVS is lost for operation outside the dashed lines.
Decreasing the ratio of C
d to Cs reduces the area of the ZVS region.
Other resonant converters in which all semiconductor devices operate with zero-voltage
switching are known. Examples include some operating modes of the parallel and LCC resonant
converters described in Chap.22, as well as the class-E converters described in [340–342].
23.3.3 Quasi-Square-Wave Resonant Switches
Another basic class of resonant switch networks is the quasi-square wave converters. Both zero-
voltage switching and zero-current switching versions are known; the resonant tank networks

23.3 Resonant Switch Topologies 1021
(a)
F = 0.6
0.7
J
μ
0.8
0.91.0
1.1
1.00.5 1.5 2.0 2.5
1.0
0.5
0
(b)
J = 0.0
0.5
F
μ
1.0
1.52.0
2.5
1.00.5 1.5 2.0 2.5
1.0
0.5
0
Fig. 23.27 Conversion ratioμfor the multiresonant switch with Cd = 3Cs:( a) conversion ratioμvs.
normalized current J (solid lines: conversion ratio; dashed lines: boundaries of zero-voltage switching),
(b) conversion ratioμvs. normalized switching frequency F

1022 23 Soft Switching
(a)
Lr Cr
D2
SW
(b)
Lr Cr D2
SW
Fig. 23.28 Elimination of converter low-frequency elements reduces the quasi-resonant switch cells to
these networks: (a) ZCS quasi-square-wave network, (b) ZVS quasi-square-wave network
+
Lr
Cr
Vg
Cf
Lf D1
D2
Q1 L
CR
+
V
I
Fig. 23.29 Incorporation of a ZCS quasi-square-wave resonant switch into a buck converter containing
an L–C input ﬁlter
are illustrated in Fig. 23.28. In the network of Fig. 23.28a, all semiconductor devices are ef-
fectively in series with the tank inductor, and hence operate with zero-current switching. In
the network of Fig. 23.28b, all semiconductor devices are eﬀectively in parallel with the tank
capacitor, and hence operate with zero-voltage switching.
Figure 23.29 illustrates implementation of a zero current switching quasi-square wave res-
onant switch, in a buck converter with input ﬁlter. Elements Lf and C f are large in value, and
constitute a single-section L–C input ﬁlter. Elements Lr and Cr form the series resonant tank;
these elements are placed in series with input ﬁlter capacitorC f . Since Cr and C f are connected
in series, they can be combined into a single small-value capacitor. In this zero-current switching
converter, the peak transistor current is identical to the peak transistor current of an equivalent
PWM converter. However, the peak transistor blocking voltage is increased. The ZCS QSW
resonant switch exhibits a switch conversion ratioμthat is restricted to the range 0 ≤μ≤0.5.
Analysis of this resonant switch is given in [343, 344].
A buck converter, containing a zero-voltage-switching quasi-square wave (ZVS QSW) res-
onant switch, is illustrated in Fig. 23.30. Typical waveforms are given in Fig. 23.31. Since the
tank inductor L
r and the output ﬁlter inductor L are connected in parallel, these two elements
can be combined into a single inductor having a small value nearly equal to Lr. Analyses of
the ZVS QSW resonant switch are given in [ 70, 344, 345]. A related full-bridge converter is
described in [328]. The ZVS QSW resonant switch is notable because zero-voltage switching
is obtained in all semiconductor devices, yet the peak transistor voltage is identical to that of an
equivalent PWM switch [343]. However, the peak transistor currents are increased.
Characteristics of the zero-voltage-switching quasi-square wave resonant switch are plotted
in Fig. 23.32. The switch conversion ratio μ= V
2/V1 is plotted as a function of normalized
switching frequency F and normalized output current J, where these quantities are deﬁned as

23.3 Resonant Switch Topologies 1023
+ CrVg
D1
D2
Q1
+
v2(t)
i1(t) i2(t)
+
v1(t)
Lr
L
CR
+
V
I
Fig. 23.30 Incorporation of a ZVS quasi-square-wave resonant switch into a buck converter
Fig. 23.31 Waveforms of the ZVS quasi-
square-wave resonant switch converter of
Fig. 23.30
V1
Lr
V2
Lr
0Ts
i2(t)
v2(t) V1
0t
0
Conducting
devices: D2X XQ1D1
follows:
f0= 1
2π√LrCr
R0=
√
Lr
Cr
(23.66)
F= fs
f0
J= I2R0
V1
In addition, the zero-voltage-switching boundary is plotted. It can be seen that the requirement
for zero-voltage switching limits the switch conversion ratio μto the range 0.5≤μ≤1. In
consequence, the buck converter of Fig. 23.30 cannot produce output voltages less than 0.5Vg
without losing the ZVS property. A version which attains 0≤μ≤1, at the expense of increased
transistor voltage stress, is described in [ 346]. In addition, the two-switch version of the ZVS
QSW switch can operate with ZVS forμ<0.5.
A useful variant of the converter of Fig. 23.30 involves replacement of the diode with a
synchronous rectiﬁer, as illustrated in Fig.23.33 [338, 339]. The second transistor introduces an
additional degree of freedom in control of the converter, because this transistor can be allowed
to conduct longer than the diode would otherwise conduct. This fact can be used to extend the
region of zero-voltage switching to conversion ratios approaching zero, and also to operate the
converter with constant switching frequency.

1024 23 Soft Switching
J = 00.5135
μ
F
1.0
0.5
0.5 1.0
Fig. 23.32 Characteristics of the ZVS quasi-square-wave resonant switch network: switch conversion
ratioμ, as a function of F and J. Dashed line: ZVS boundary
+ CrVg
D1
D2Q1
+
v2(t)
i1(t) i2(t)
+
v1(t)
Lr
CR
+
V
I
Q2
Fig. 23.33 Quasi-square-wave ZVS buck converter containing a synchronous rectiﬁer
Typical tank element waveforms for the circuit of Fig. 23.33 are illustrated in Fig. 23.34.
These waveforms resemble those of the single switch case, Fig. 23.31, except that the tank
current is negative while transistor Q2 conducts. The duty cycle D is deﬁned with respect to the
turn-oﬀtransitions of transistors Q1 and Q2, as illustrated.
Characteristics of the two-switch QSW-ZVS switch network are plotted in Fig. 23.35,f o r
the case of constant switching frequency at F= 0.5. The boundary of zero-voltage switching
is also illustrated. Operation at a lower value of F causes the ZVS boundary to be extended to
larger values of J, and to values ofμthat more closely approach the extreme valuesμ= 0 and
μ= 1.
To the extent that the commutation intervals can be neglected, one would expect that the
switch conversion ratioμis simply equal to the duty cycleD. It can be seen from Fig.23.35 that
this is indeed the case. The characteristics are approximately horizontal lines, nearly indepen-
dent of load current J.

23.4 Soft Switching in PWM Converters 1025
Fig. 23.34 Waveforms for the two-
switch QSW-ZVS converter of Fig.23.33
V1
Lr
V2
Lr
0Ts
i2(t)
v2(t) V1
0t
0
Conducting
devices: D2X XQ1D1 Q2
D 0Ts
Zero-voltage switching quasi-square wave converters exhibit very low switching loss, be-
cause all semiconductor elements operate with zero-voltage switching. In the constant-frequency
case containing a synchronous rectiﬁer, the converter behavior is nearly the same as for the
hard-switched PWM case, since μ≈D. The major disadvantage is the increased conduction
loss, caused by the reversal of the inductor current.
23.4 Soft Switching in PWM Converters
The quasi-square wave approach of the previous section is notable because it attains zero-
voltage switching without increasing the peak voltage applied to the transistor. Several related
soft-switching approaches have now become popular, which also attain zero-voltage switching
without increasing the transistor peak voltage stress. In this section, popular zero-voltage switch-
ing versions of the full bridge, forward, and ﬂyback converters, as well as the voltage-source
inverter, are brieﬂy discussed.
23.4.1 The Zero-Voltage Transition Full-Bridge Converter
It is possible to obtain soft switching in other types of converters as well. An example is the zero-
voltage transition (ZVT) converter based on the full-bridge transformer-isolated buck converter,
illustrated in Fig.23.36 [324–327]. The transistor and diode output capacitances are represented
in the ﬁgure by capacitances C
leg. Commutating inductor Lc is placed in series with the trans-
former; the net inductance Lc includes both transformer leakage inductance and the inductance
of an additional discrete element. This inductor causes the full-bridge switch network to drive
an eﬀective inductive load, and results in zero-voltage switching of the primary-side semicon-
ductor devices. Although the waveforms are not sinusoidal, it can nonetheless be said that the
switch network output current ic(t) lags the voltage vs(t), because the zero crossings of ic(t)
occur after the ZVS switching transitions are completed.
The output voltage is controlled via phase control. As illustrated in Fig. 23.37, both halves
of the bridge switch network operate with a 50% duty cycle, and the phase diﬀerence between
the half-bridge switch networks is controlled. The idealized waveforms of Fig. 23.37 neglect

1026 23 Soft Switching
D = 0.8
0.7
J
μ
0.6
0.5
0.3
0.2
1.0
0.5
0
F = 0.5
8.06.02.0 0.4
0.4
Fig. 23.35 Conversion ratioμ, as a function of duty cycle D and normalized load current J, for the two-
switch QSW-ZVS converter illustrated in Fig. 23.33. Curves are plotted for constant-frequency control
with F= 0.5. The dashed line is the zero-voltage switching boundary
the switching transitions, and the subinterval numbers correspond to those of the more detailed
Fig. 23.38. The phase-shift variable φlies in the range 0≤φ≤1, and assumes the role of the
duty cycle d in this converter. The quantityφis deﬁned as
φ= (t1−t0)⎦Ts
2
) (23.67)
By volt-second balance on the secondary-side ﬁlter inductor, the conversion ratio M(φ)i se x -
pressed as
M(φ)= V
Vg
= nφ (23.68)
This expression neglects the lengths of the switching transitions.
ic(t) Lc
+Vg
Q1
Q2
Q3
Q4
D1
D2
D3
D4
+
v2(t)
Cleg1
Cleg2 Cleg4
Cleg3
+
v4(t)
+
vs(t)
D5
D6
I1 : n
: n
+
V
ig(t)
Fig. 23.36 Zero-voltage transition converter, based on the full-bridge isolated buck converter

23.4 Soft Switching in PWM Converters 1027
v2(t)
v4(t)
vs(t)
ig(t)
Vg
Vg
Vg
g
nI
00
0 0
00
Conducting
devices: Q4 D3 Q3D4
Q2 Q1 Q1 Q2 Q2
Subinterval: 04 6 1 0 0 t
Ts/2
Ts/2
Ts
Ts/2 Ts/2
0
D4
)Ts/2
Fig. 23.37 Phase-shift control of the ZVT full-bridge converter. Switching transitions are neglected in
this ﬁgure, and subinterval numbering follows Fig.23.38
Although the circuit appears symmetrical, the phase-shift control scheme introduces an
asymmetry that causes the two half-bridge switch networks to behave quite di ﬀerently dur-
ing the switching transitions. During subintervals 4 and 10, energy is actively transmitted from
the source Vg through the switches and transformer. These subintervals are initiated by the
switching of the half-bridge network composed of the elements Q1, D1, Q2, and D2, called the
“passive-to-active” (P-A) transition [326]. Subintervals 4 and 10 are terminated by the switching
of the half-bridge network comprised by the elements Q3, D3, Q4, and D4, called the “active-
to-passive” (A–P) transition.
The turn-on and turn-oﬀswitching processes of this converter are similar to the zero-voltage-
switching turn-oﬀprocess described in the previous section. Detailed primary-side waveforms
are illustrated in Fig. 23.38. During subinterval 0, Q2 and D4 conduct. If the transformer mag-
netizing current iM is negligible, then the commutating inductor current is given byic(t0)=−nI,
where I is the load current. The passive-to-active transition is initiated when transistor Q2 is
turned oﬀ. The negativeic then causes capacitors Cleg1 and Cleg2 to charge, increasing v2(t). Dur-
ing subinterval 1, Lc, Cleg1, and Cleg2 form a resonant network that rings with approximately
sinusoidal waveforms. If suﬃcient energy was initially stored inLc, then v2(t) eventually reaches
Vg, terminating subinterval 1. Diode D1 then clamps v2(t)t o Vg during subinterval 2. Transistor

1028 23 Soft Switching
Q1 is turned on at zero voltage during subinterval 2; in practice, this is implemented by insertion
of a small delay between the switching transitions of transistors Q2 and Q1.
If Lc does not initially store suﬃcient energy to charge the total capacitance ( Cleg1+ Cleg2)
from v2= 0t o v2= Vg during subinterval 1, then v2(t) will never reach Vg. Switching loss will
then occur when transistor Q1 is turned on. This situation typically occurs at light load, where
I is small. Sometimes, the design engineer may choose to simply accept this power loss; after
all, other losses such as conduction loss are small at light load. An alternative is to modify the
circuit to increase the energy stored in L
c at t= t0 under light load conditions. One way to
accomplish this is to increase the transformer magnetizing current iM(t0) to a signiﬁcant level;
at the beginning of subinterval 1, ic is then equal to ic(t0)=−nI+ iM(t0) with iM(t0)< 0. At
light load where I is small, the magnetizing current maintains the required level of ic.
During subintervals 0, 1, 2, and 3, secondary-side diodes D5 and D6 both conduct; hence,
zero voltage appears across all transformer windings. In consequence, voltage Vg is applied to
commutating inductor Lc during subintervals 2 and 3, causingic(t) to increase with slope Vg/Lc.
Current ic(t) reaches zero at the end of subinterval 2, and increases to the positive value+nI at
the end of subinterval 3. The reversal of polarity of ic(t) enables zero-voltage switching during
the next switching transitions, subinterval 5 and subintervals 7–9.
At the end of subinterval 3, the current in diode D6 has decreased to zero. D6 then becomes
reverse-biased, with zero-current switching. At this instant, diode D6 must begin to block volt-
age 2nVg. The output capacitance of D6 prevents the voltage from changing immediately to
2nVg; instead, the resonant circuit formed by Lc and the D6 output capacitance begins to ring
in a manner similar to Fig. 4.76. Peak D6 voltages are typically observed that are consider-
ably in excess of 2 nVg, and it is usually necessary to add voltage-clamp snubbers that prevent
the secondary-side diode voltages from exceeding a safe value. Several dissipative and non-
dissipative approaches are discussed in [325–327].
The active-to-passive switching transition occurs during subinterval 5. This subinterval is
initiated when transistor Q
4 is turned oﬀ. The positive currentic(t1) is equal to the reﬂected load
current nI, and charges capacitors Cleg3 and Cleg4 from v4 = 0t o v4 = Vg. Subinterval 5 ends
when v4 reaches Vg; Diode D3 then becomes forward-biased. Transistor Q3 is then turned on
during subinterval 6, with zero-voltage switching. This is typically implemented by insertion of
a small delay between the switching of transistors Q
4 and Q3. Because ic is constant and equal
to nI during subinterval 5, the active-to-passive transition maintains zero-voltage switching at
all load currents.
Circuit behavior during the next half switching period, comprising subintervals 6 to 11,
is symmetrical and therefore similar to the behavior observed during subintervals 0 to 5. The
switching transitions of transistors Q
1 and Q2 are passive-to-active transitions, and occur with
zero-voltage switching provided that suﬃcient energy is stored in Lc as described above. The
switching transitions of Q3 and Q4 are active-to-passive, and occur with zero-voltage switching
at all loads.
The zero-voltage transition converter exhibits low primary-side switching loss and gener-
ated EMI. Conduction loss is increased with respect to an ideal PWM full-bridge topology,
because of the current i
c that circulates through the primary-side semiconductors during subin-
tervals 0 and 6. However, this increase in conduction loss can be small if the range of input
voltage variations is narrow. This soft-switching approach has now found commercial success.

23.4 Soft Switching in PWM Converters 1029
g/Lc
v2(t)
v4(t)
vs(t)
ic(t)
Vg
Vg
Vg
g
nI
Vg/Lc
00
00
00 0
nI
/2Cleg
nI/2Cleg
Conducting
devices: D4 D4 D4 Q4 X D3 D3 D3 Q3 X D4
Q2 D1X Q1 Q1 Q1 X D2 Q2 Q2 Q2
D5
D6
D5 D5
D6 D6 D6
D5 D5 D5
D6 D6 D6
D5 D5 D5
D6 D6
D5
D6
D5
D6XX
XX
Subinterval: 01 2 3 4 5 6 7 8 91 01 1 0
t
} Active
} Passive
}
Secondary
diodes
Fig. 23.38 Detailed diagram of primary-side waveforms of the ZVT full-bridge converter, illustrating
the zero-voltage switching mechanisms. An ideal transformer is assumed
23.4.2 The Auxiliary Switch Approach
A similar approach can be used in forward, ﬂyback, and other transformer-isolated converters.
As illustrated in Fig. 23.39, an “active-clamp snubber” network consisting of a capacitor and
auxiliary MOSFET Q2 is added, that is eﬀectively in parallel with the original power transistor
Q1 [350]. The MOSFET body diodes and output drain-to-source capacitances, as well as the
transformer leakage inductance Lℓ, participate in the circuit operation. These elements lead to
zero-voltage switching, with waveforms similar to those of the ZVT full-bridge converter of
Sect. 23.4.1 or the two-transistor QSW-ZVS switch of Sect. 23.3.3. The transistors are driven
by complementary signals; for example, after turning o ﬀQ1, the controller waits for a short
delay time and then turns on Q2.
The active-clamp snubber can be viewed as a voltage-clamp snubber, similar to the dissipa-
tive snubber illustrated in Fig. 23.6. However, the snubber contains no resistor; instead, MOS-

1030 23 Soft Switching
(a)
+
Q1
CR
+
V
LD2
D3
Vg
L
Cds
Csvs
+
Q2
+
vds
i
(b)
+
L
Vg
Cds
Csvs
+
Q1
Q2
Fig. 23.39 Active-clamp snubber circuits: (a) forward converter, (b) ﬂyback converter
FET Q2 allows bidirectional power ﬂow, so that the energy stored in capacitorCs can ﬂow back
into the converter.
The voltage vs can be found by volt-second inductance on the transformer magnetizing
inductance. If the lengths of the commutation intervals are neglected, and if the voltage ripple
in v
s(t) can be neglected, then one ﬁnds that
Vs= D
D′ Vg (23.69)
The voltage vs is eﬀectively an unloaded output of the converter. With the two-quadrant switch
provided by Q2, this output operates in continuous conduction mode with no load, and hence
the peak voltage of Q1 is clamped to the minimum level necessary to balance the volt-seconds
applied to the transformer magnetizing inductance.
Typical waveforms for a forward converter incorporating an active-clamp snubber are il-
lustrated in Fig. 23.40. The current iℓ(t) reverses direction while Q2 conducts. When Q2 turns

23.4 Soft Switching in PWM Converters 1031
oﬀ, capacitor Cds begins to discharge. When vds reaches zero, the body diode of Q1 becomes
forward-biased. Q1 can then be turned on at zero voltage.
An added beneﬁt of the active-clamp snubber, when used in a forward converter, is that it
resets the transformer. Consequently, the converter can operate at any duty cycle, including duty
cycles greater than 50%. When the converter must operate with a wide range of input voltages,
this can allow substantial improvements in transistor stresses and eﬃciency. The MOSFETs in
Fig. 23.39 operate with zero-voltage switching, while the secondary-side diodes operate with
zero-current switching.
This approach is quite versatile, and similar auxiliary circuits can be added to other converter
circuits to obtain zero-voltage switching [351–353].
23.4.3 Auxiliary Resonant Commutated Pole
The auxiliary resonant commutated pole (ARCP) is a related circuit that uses an auxiliary four-
quadrant switch (or two equivalent two-quadrant switches) to obtain soft switching in the tran-
sistors of a bridge inverter circuit [354–356]. This approach ﬁnds application in dc–ac inverter
circuits. Figure 23.41 illustrates a half-bridge circuit, or one phase of a three-phase voltage-
source inverter, driving an ac load. This circuit can lead to zero-voltage switching that mitigates
the switching loss induced by the reverse recovery of diodes D
1 and D2. Filter inductor Lf is
relatively large, so that the output current ia(t) is essentially constant during the resonant com-
Fig. 23.40 Waveforms of the active-
clamp snubber circuit of Fig. 23.39a
i (t)
vds(t)
0
0
vs + Vg
+
+ Load
Lf ia
Cds
Cds
van
Vg
2
Vg
2
Lr ir
Q1
Q2
D1
D2
Q3 Q4
D3 D4
Fig. 23.41 Half-bridge circuit driving an ac load, with ARCP zero-voltage switching

1032 23 Soft Switching
(a) ir(t)
van(t) Vg /2
0
Conducting
devices: Q1Q3D2
g /2
ia
D2
D4
Q3
D4
Q3
(D1)
D4
Q1
Interval: 123 t
(b) ir(t)
van(t) Vg /2
0
Conducting
devices: Q1Q3D2
g /2
ia
D2
D4
Q3
D4
Q3
D1
D4
Q1
Interval: 123
Q2
iboost
t
Fig. 23.42 Waveforms of the ARCP circuit of Fig.23.41:( a) basic waveforms, (b) with current boost
mutation interval. Capacitors Cds are relatively small, and model the output capacitances of the
semiconductor devices. Inductor Lr is also relatively small, and elements Lr and Cds form a
resonant circuit that rings during part of the commutation process. Semiconductor switching
devices Q3, Q4, D3, and D4 form an auxiliary four-quadrant switch that turns on to initiate the
resonant commutation process.
Typical commutation waveforms are illustrated in Fig. 23.42a, for the case in which the ac
load current ia is positive. Diode D2 is initially conducting the output current ia. It is desired to
turn oﬀD2 and turn onQ1, with zero-voltage switching. This is accomplished with the following
sequence:

23.5 Summary of Key Points 1033
Interval 1. Turn on transistor Q3. Devices D2, Q3, and D4 conduct.
Interval 2. When the current in D2 reaches zero, D2 turns oﬀ. A resonant ring-
ing interval occurs.
Interval 3. When the voltage van reaches Vg/2, diode D1 begins to become
forward-biased. Transistor Q1 is then immediately turned on at
zero voltage.
At the conclusion of interval 3,ir(t) reaches zero and diodeD3 turns oﬀ. For negative current,
the process for commutation of diode D1 is similar, except that transistor Q4 and diode D3
conduct the resonant current ir(t).
One issue related to the waveforms of Fig. 23.42a is that the circuit always operates at the
boundary of zero-voltage switching. At the end of interval 2, diode D1 is not actually forward-
biased, because its current never actually becomes positive. Instead, transistor Q1 should be
turned on at the beginning of interval 3. If transistor Q1 is gated on late, then the continued
ringing will cause voltage van(t) to decrease, and zero-voltage switching will be lost.
To further assist in the zero-voltage switching commutation process, transistor Q2 can be
turned on while D2 conducts, as illustrated in Fig. 23.42b. Transistor Q2 is used to lengthen the
duration of interval 1: now, when the current ir(t) exceeds current ia by an amount iboost , then
the controller turns oﬀQ2 to end interval 1. This causes diode D1 to become forward-biased
during the beginning of interval 3. Transistor Q1 is then turned on with zero-voltage switching,
while D1 is conducting.
Regardless of whether the circuit operates with the waveforms of Fig.23.42a or b, the ARCP
approach eliminates the switching loss caused by the reverse recovery of diodesD1 and D2.U n -
like the previous circuits of this chapter, the ARCP has no circulating currents that cause con-
duction loss, because the tank inductor current ir(t) is nonzero only in the vicinity of the com-
mutation interval. The approach of Fig. 23.42a does not completely eliminate the loss caused
by the device output capacitances. This loss is eliminated using the current boost of Fig.23.42b,
but additional conduction loss is incurred because of the increased peakir(t). The waveforms of
Fig. 23.42b may, in fact, lead to reduced eﬃciency relative to Fig.23.42a!
23.5 Summary of Key Points
1. In a resonant switch converter, the switch network of a PWM converter is replaced by a
switch network containing resonant elements. The resulting hybrid converter combines the
properties of the resonant switch network and the parent PWM converter.
2. Analysis of a resonant or soft-switching switch cell involves determination of the switch
conversion ratioμ. The resonant switch waveforms are determined, and are then averaged.
The switch conversion ratioμis a generalization of the PWM CCM duty cycled. The results
of the averaged analysis of PWM converters operating in CCM can be directly adapted to
the related resonant switch converter, simply by replacing d withμ.
3. In the zero-current-switching quasi-resonant switch, diode D
2 operates with zero-voltage
switching, while transistor Q1 and diode D1 operate with zero-current switching. In the
zero-voltage-switching quasi-resonant switch, the transistor Q1 and diode D1 operate with
zero-voltage switching, while diode D2 operates with zero-current switching.
4. In the zero-voltage-switching multiresonant switch, all semiconductor devices operate with
zero-voltage switching. In consequence, very low switching loss is observed.

1034 23 Soft Switching
5. In the quasi-square-wave zero-voltage-switching resonant switches, all semiconductor de-
vices operate with zero-voltage switching, and with peak voltages equal to those of the
parent PWM converter. The switch conversion ratio is restricted to the range 0.5≤μ≤1.
Versions containing synchronous rectiﬁers can operate with values ofμapproaching zero.
6. The zero-voltage transition approach, as well as the active-clamp snubber approach, lead
to zero-voltage switching of the transistors and zero-current switching of the diodes. These
approaches have been successful in substantially improving the eﬃciencies of transformer-
isolated converters. The auxiliary resonant commutated pole induces zero-voltage switch-
ing in bridge circuits such as the voltage-source inverter.
Problems
23.1 In the forward converter of Fig. 23.43, L and C are large ﬁlter elements while Lp, Ls, and
Cr have relatively small values. The transformer reset mechanism is not shown; for this
problem, you may assume that the transformer is ideal.
(a) Classify the resonant switch.
(b) Which semiconductor devices operate with zero-voltage switching? With zero-current
switching?
(c) What is the resonant frequency?
23.2 In the high-voltage converter of Fig. 23.44, capacitor C is relatively large in value. The
transformer model includes an ideal 1: n transformer, in conjunction with magnetizing
inductance Lmp (referred to the primary side) and winding capacitance Cws (referred to
the secondary side). Transistor Q and diode Dp exhibit total output capacitance Cp, while
the output capacitance of diode Ds is Cs. Other nonidealities, such as transformer leakage
inductance, can be ignored. The resonant switch is well-designed, such that all elements
listed above contribute to ideal operation of the converter and resonant switch.
(a) What type of resonant switch is employed? What is the parent PWM converter?
(b) Which semiconductor devices operate with zero-voltage switching? With zero-current
switching?
+
Q
1 : n
CR
+
v
LDs
Dp
vg
LsLp
Cr
Fig. 23.43 Forward converter with resonant switch, Problem 23.1
```
