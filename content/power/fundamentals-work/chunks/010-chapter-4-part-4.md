---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第4章part 4 - 4 Switch Realization
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 142-148 > Chunk ID: `chapter-4-part-4`"
---

# 第4章part 4 - 4 Switch Realization

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 142-148  
> Chunk ID: `chapter-4-part-4`

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
4.7 Summary of Key Points 127
50%
60%
70%
80%
90%
100%
fsw
10 kHz 100 kHz 1 MHz
dc asymptote
fcrit
Fig. 4.77 Eﬃciency vs. switching frequency, based on Eq. ( 4.52), using arbitrary values for the choice
of loss and load power. Switching loss causes the eﬃciency to decrease rapidly at high frequency
4. A “synchronous rectiﬁer” is a MOSFET connected to conduct reverse current, with gate
drive control as necessary. This device can be used where a diode would otherwise be re-
quired. If a MOSFET with suﬃciently low Ron is used, reduced conduction loss is obtained.
5. Majority-carrier devices, including the MOSFET and Schottky diode, exhibit very fast
switching times, controlled essentially by the charging of the device capacitances. How-
ever, the forward voltage drops of these devices increases quickly with increasing break-
down voltage.
6. Minority-carrier devices, including the BJT, IGBT, and thyristor family, can exhibit high
breakdown voltages with relatively low forward voltage drop. However, the switching times
of these devices are longer, and are controlled by the times needed to insert or remove stored
minority charge.
7. Wide-bandgap semiconductor devices can signiﬁcantly improve the tradeoﬀbetween break-
down voltage, on-resistance, and switching speed. Silicon carbide MOSFETs, SiC Schottky
diodes, and GaN HEMTs have realized performance well beyond that achieved with silicon.
8. Energy is lost during switching transitions, owing to a variety of mechanisms. The result-
ing average power loss, or switching loss, is equal to this energy loss multiplied by the
switching frequency. Switching loss imposes an upper limit on the switching frequencies
of practical converters.
9. The diode and inductor present a “clamped inductive load” to the transistor. When a tran-
sistor drives such a load, it experiences high instantaneous power loss during the switching
transitions. An example where this leads to signiﬁcant switching loss is the IGBT and the
“current tail” observed during its turn-oﬀtransition.

128 4 Switch Realization
10. The familiar exponential i–v characteristic of the p–n diode is an equilibrium relationship
that does not apply during switching transitions. To turn o ﬀthe diode, its internal stored
minority charge must be removed. During the reverse-recovery process, signiﬁcant negative
current can ﬂow through the diode that induces switching loss in the transistor.
11. The equivalent circuit models of the previous chapter can be extended to model the switch-
ing loss caused by diode reverse recovery. Switching waveforms including the switching
transitions are averaged, to ﬁnd expressions for their dc components. These averaged ex-
pressions are employed in the construction of equivalent circuits.
12. Other signiﬁcant sources of switching loss include diode stored charge and energy stored in
certain parasitic capacitances and inductances. Parasitic ringing also indicates the presence
of switching loss.
Problems
In Problems 4.1 to 4.6 and 4.10, the input voltage Vg is dc and positive with the polarity shown.
Specify how to implement the switches using a minimal number of diodes and transistors, such
that the converter operates over the entire range of duty cycles 0 ≤D≤1. The switch states
should vary as shown in Fig. 4.78. You may assume that the inductor current ripples and capac-
itor voltage ripples are small.
Switch
position
t0 DTs Ts
1
2
Fig. 4.78 Switch control method for Problems 4.1 to 4.6
For each problem, do the following:
(a) Realize the switches using SPST ideal switches, and explicitly deﬁne the voltage and
current of each switch.
(b) Express the on-state current and o ﬀ-state voltage of each SPST switch in terms of the
converter inductor currents, capacitor voltages, and/or input source voltage.
(c) Solve the converter to determine the inductor currents and capacitor voltages, as in
Chap. 2.
(d) Determine the polarities of the switch on-state currents and o ﬀ-state voltages. Do the
polarities vary with duty cycle?
(e) State how each switch can be realized using transistors and/or diodes, and whether the real-
ization requires single-quadrant, current-bidirectional two-quadrant, voltage-bidirectional
two-quadrant, or four-quadrant switches.

4.7 Summary of Key Points 129
4.1 Realize the switches in the converter of Fig. 4.79, following steps (a) to (e) described
above.
+
12
12
Vg
Fig. 4.79 Converter for Problem 4.1
4.2 Realize the switches in the converter of Fig. 4.80, following steps (a) to (e) described
above.
+
1
2
2
1
Vg
Fig. 4.80 Converter for Problem 4.2
4.3 Realize the switches in the converter of Fig. 4.81, following steps (a) to (e) described
above.
+
1
2Vg
Fig. 4.81 Converter for Problem 4.3
4.4 Realize the switches in the converter of Fig. 4.82, following steps (a) to (e) described
above.

130 4 Switch Realization
+ 1 2
12
Vg
Fig. 4.82 Converter for Problem 4.4
4.5 Realize the switches in the converter of Fig. 4.83, following steps (a) to (e) described
above.
+
Vg
12
21
Fig. 4.83 Converter for Problem 4.5
4.6 Realize the switches in the converter of Fig. 4.84, following steps (a) to (e) described
above.
+Vg
1
2
1
2
Fig. 4.84 Converter for Problem 4.6

4.7 Summary of Key Points 131
4.7 The buck–boost converter of Fig. 4.85 is implemented with a MOSFET and a p–n diode.
The MOSFET can be modeled as ideal, but the diode exhibits a substantial reverse-
recovery process, with reverse recovery time tr and recovered charge Qr. In addition,
the inductor has winding resistance RL. The converter operates in continuous conduction
mode.
+
–
L
Vg CR
+
–
RL
Fig. 4.85 Converter for Problem 4.7
Derive an equivalent circuit that models the dc components of the converter waveforms
and that accounts for the loss mechanisms described above.
4.8 Solve the equivalent circuit model derived in Problem4.7, to ﬁnd closed-form expressions
for the output voltage and inductor current.
4.9 A certain boost converter is implemented with a MOSFET and ap–n diode. The MOSFET
can be modeled as ideal, but the diode exhibits a substantial reverse-recovery process, with
reverse recovery time tr and recovered charge Qr. In addition, the inductor has winding
resistance RL.
(a) Derive an equivalent circuit that models the dc components of the converter wave-
forms and that accounts for the loss elements described above.
(b) Solve your model to ﬁnd an expression for the output voltage.
(c) Plot the output voltage vs. duty cycle over the range 0 ≤D< 1, for the following
values: RL = 0.25Ω, fs = 150 kHz, Qr = 5μcoul, tr = 100 nsec, R= 60Ω, Vg =
24 V.
4.10 It is desired to convert 60 Hz 120 V AC to 240 V AC, to power a 1 kW AC load. Although
a conventional 60 Hz transformer could be used in this application, such a transformer is
large and heave. Instead, it is decided to use a boost converter switching at 100 kHz, as
illustrated in Fig. 4.86. Potentially, this converter is small and lightweight. It operates at a
constant duty cycle of approximately 0.5, so that v(t)= 2v
g(t). The elements L and C are
chosen to ﬁlter the switching harmonics and have small switching ripples; however, they
have negligible eﬀect on the 60 Hz components of the waveforms. The load is a linear
impedance Z. Realize the switches in the converter of Fig. 4.86, following steps (a) to (e)
listed above Problem 4.1.
4.11 The converter illustrated in Fig. 4.87 is sometimes employed in low-power applications
requiring a wide range of conversion ratios. It is desired that all elements operate in the
continuous conduction mode (CCM) over the range 0 ≤D< 1. This mode is deﬁned
as follows: each switching period contains two subintervals numbered 1 and 2; in the
schematic illustrated in Fig. 4.87, switches labeled “1” conduct during subinterval 1 for
time DT
s, and switches labeled “2” conduct during subinterval 2 for time (1−D)Ts.

132 4 Switch Realization
vg(t)
Lig(t)
Z
+
v(t)
–
C
1
2
120 V (rms)
AC source
240 V (rms)
AC load
Fig. 4.86 Converter for Problem 4.10
+
1
12 2
Vg
+
VR
L1
L2
C1
C2
Fig. 4.87 Double buck–boost converter of Problem 4.11
(a) Solve the converter in steady state, to ﬁnd the dc components of both capacitor volt-
ages and both inductor currents. Your expressions should be functions of Vg, D, and
R only. Clearly label the polarity or direction of each of these quantities on your
schematic.
(b) Show how to realize the switches using BJT’s and diodes, so that the converter oper-
ates in CCM over the range 0≤D< 1. Document all steps in your derivation.
(c) How does your switch realization change if the duty cycle is restricted to the range
0≤D< 0.5? Sketch the circuit and switch realization for this case.
4.12 An IGBT and a silicon diode operate in a buck converter, with the IGBT waveforms illus-
trated in Fig. 4.88. The converter operates with input voltage Vg = 400 V, output voltage
V= 200 V, and load current I= 10 A.
(a) Estimate the total energy lost during the switching transitions. You may graphically
estimate the waveforms of Fig. 4.88.
(b) The forward voltage drop of the IGBT is 2.5 V , and the diode has forward voltage drop
1.5 V . All other sources of conduction loss and ﬁxed loss can be neglected. Estimate
the semiconductor conduction loss.
(c) Sketch the converter eﬃciency over the range of switching frequencies 1 kHz≤fs≤
100 kHz, and label numerical values.
4.13 Two MOSFETs are employed as current-bidirectional two-quadrant switches in a bidirec-
tional battery charger/discharger based on the dc–dc buck converter, similar to Fig. 4.15.

4.7 Summary of Key Points 133
t, μs
vCE(t)
iC(t)10 A
20 A
0 A
30 A
40 A400 V
300 V
200 V
100 V
0 V
i
CvCE
vCE(t)
01 2
iC(t)
Fig. 4.88 IGBT voltage and current waveforms, Problem 4.12
This converter interfaces a 16 V battery to a 28 V main power bus. The maximum bat-
tery current is 40 A. The MOSFETs have on-resistances of 35 m Ω. Their body diodes
have forward voltage drops of 1.0 V , and exhibit recovered charge Qr of 25 μC and re-
verse recovery times tr of 200 ns in the given circuit. You may assume that all diodes in
this problem have “snappy” reverse recovery characteristics, and also assume that diode
stored charge is the dominant cause of switching loss in this circuit. You may neglect all
losses other than the semiconductor conduction losses and the switching loss induced by
diode stored charge.
The current-bidirectional two-quadrant switches are realized as in Fig. 4.10a, utilizing the
MOSFET body diodes.
(a) Estimate the switching energy loss, conduction loss, and converter e ﬃciency, when
the battery is being charged at the maximum rate. The switching frequency is 100 kHz.
External diodes are now added as illustrated in Fig. 4.10b. These diodes have forward
voltage drops of 1.0 V , and exhibit recovered charge Q
r of 5 μC and reverse recovery
times tr of 40 ns in the given circuit.
(b) Repeat the analysis of Part (a), for this case.
(c) Over what range of switching frequencies does the addition of the external diodes
improve the converter eﬃciency?
4.14 A switching converter operates with a switching frequency of 100 kHz. The converter
waveforms exhibit damped sinusoidal ringing, initiated by the transistor turn-o ﬀtransi-
tion, which decays slowly but eventually reaches zero before the end of the switching
period. This ringing occurs in a series resonant circuit formed by parasitic inductances
and capacitances in the circuit. The frequency of the ringing is 5 MHz. During the ﬁrst
period of sinusoidal ringing, the ac inductor current reaches a peak magnitude of 0.5 A,
and the ac capacitor voltage reaches a peak magnitude of 200 V . Determine the following
quantities:
(a) the value of the total parasitic inductance,
(b) the value of the total parasitic capacitance,
(c) the energy lost per switching period, associated with this ringing, and
(d) the switching loss associated with this ringing.
(e) Derive a general expression for the switching loss, as a function of the switching
frequency, ringing frequency, and the ringing voltage and current peak magnitudes
during the ﬁrst period of ringing.
```
