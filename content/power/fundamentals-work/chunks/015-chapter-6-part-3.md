---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第6章part 3 - 6 Converter Circuits
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 217-226 > Chunk ID: `chapter-6-part-3`"
---

# 第6章part 3 - 6 Converter Circuits

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 217-226  
> Chunk ID: `chapter-6-part-3`

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
6.4 Summary of Key Points 203
Fig. 6.40 Waveforms
of the isolated SEPIC,
continuous conduction
mode
is(t)
i1(t)
i2(t)
t
Q1 D1
Conducting
devices:
ip(t)
DTs D'Ts
Ts
2
i1
0
(i1 + i2) / n
I1
I2
Fig. 6.41 Isolated
inverse-SEPIC + D1
L2
C2
+
v
Q1
C1
R
Vg
1 : n
6.4 Summary of Key Points
1. The boost converter can be viewed as an inverse buck converter, while the buck–boost and
´Cuk converters arise from cascade connections of buck and boost converters. The properties
of these converters are consistent with their origins. Ac outputs can be obtained by di ﬀer-
ential connection of the load. An inﬁnite number of converters are possible, and several are
listed in this chapter.
2. For understanding the operation of most converters containing transformers, the transformer
can be modeled as a magnetizing inductance in parallel with an ideal transformer. The mag-

204 6 Converter Circuits
(a)
+ D1
L1
C2 R v
+
Q1
C1
L2
Vg
(b)
+ D1
L1
C2 R v
+
Q1
C1a
L2
Vg
C1b
(c)
+ D1
L1
C2 R
+
v
Q1
C1a
L2
Vg
C1b
1 : n
Fig. 6.42 Obtaining isolation in the ´Cuk converter: ( a) basic nonisolated ´Cuk converter, ( b) splitting
capacitor C1 into two series capacitors, (c) insertion of transformer between capacitors
netizing inductance must obey all of the usual rules for inductors, including the principle of
volt-second balance.
3. The steady-state behavior of transformer-isolated converters may be understood by ﬁrst re-
placing the transformer with the magnetizing-inductance-plus-ideal-transformer equivalent
circuit. The techniques developed in the previous chapters can then be applied, including
use of inductor volt-second balance and capacitor charge balance to ﬁnd dc currents and
voltages, use of equivalent circuits to model losses and eﬃciency, and analysis of the dis-
continuous conduction mode.
4. In the full-bridge, half-bridge, and push-pull isolated versions of the buck and/or boost con-
verters, the transformer frequency is twice the output ripple frequency. The transformer is
reset while it transfers energy: the applied voltage polarity alternates on successive switch-
ing periods.
5. In the conventional forward converter, the transformer is reset while the transistor is o ﬀ.
The transformer magnetizing inductance operates in the discontinuous conduction mode,
and the maximum duty cycle is limited.
6. The ﬂyback converter is based on the buck–boost converter. The ﬂyback transformer is
actually a two-winding inductor, which stores and transfers energy.

6.4 Summary of Key Points 205
Problems
Fig. 6.43 Tapped-inductor boost con-
verter, Problem 6.1
+ Q1 CR
+
V
D1
Vg
n1
turns
n2
turns
{
{
6.1 Tapped-inductor boost converter. The boost converter is sometimes modiﬁed as illustrated
in Fig. 6.43, to obtain a larger conversion ratio than would otherwise occur. The inductor
winding contains a total of ( n1+ n2) turns. The transistor is connected to a tap placed n1
turns from the left side of the inductor, as shown. The tapped inductor can be viewed as a
two-winding (n1 : n2) transformer, in which the two windings are connected in series. The
inductance of the entire (n1+ n2) turn winding is L.
(a) Sketch an equivalent circuit model for the tapped inductor, which includes a mag-
netizing inductance and an ideal transformer. Label the values of the magnetizing
inductance and turns ratio.
(b) Determine an analytical expression for the conversion ratio M = V/Vg.Y o um a y
assume that the transistor, diode, tapped inductor, and capacitor are lossless. You may
also assume that the converter operates in continuous conduction mode.
(c)S k e t c hM(D)v s .D for n1= n2, and compare to the nontapped (n2= 0) case.
6.2 Analysis of the DCM ﬂyback converter. The ﬂyback converter of Fig. 6.32d operates in
the discontinuous conduction mode.
(a) Model the ﬂyback transformer as a magnetizing inductance in parallel with an ideal
transformer, and sketch the converter circuits during the three subintervals.
(b) Derive the conditions for operation in discontinuous conduction mode.
(c) Solve the converter: derive expressions for the steady-state output voltageV and subin-
terval 2 (diode conduction interval) duty cycle D2.
6.3 Analysis of the isolated inverse-SEPIC of Fig. 6.41. You may assume that the converter
operates in the continuous conduction mode, and that all inductor current ripples and ca-
pacitor voltage ripples are small.
(a) Derive expressions for the dc components of the magnetizing current, inductor current,
and capacitor voltages.
(b) Derive analytical expressions for the rms values of the primary and secondary winding
currents. Note that these quantities do not simply scale by the turns ratio.
6.4 The two-transistor ﬂyback converter. The converter of Fig. 6.44 is sometimes used when
the dc input voltage is high. Transistors Q1 and Q2 are driven with the same gating signal,
such that they turn on and oﬀsimultaneously with the same duty cycle D. Diodes D1 and
D2 ensure that the oﬀ-state voltages of the transistors do not exceed Vg. The converter
operates in discontinuous conduction mode. The magnetizing inductance, referred to the
primary side, is LM.

206 6 Converter Circuits
Fig. 6.44 Two-transistor ﬂyback
converter, Problem 6.4 +
D1
Q1
1 : n
CR
+
v
D2
D3
Vg
Q2
(a) Determine an analytical expression for the steady-state output voltage V.
(b) Over what range of duty cycles does the transformer reset properly? Explain.
6.5 A nonideal ﬂyback converter. The ﬂyback converter shown in Fig. 6.32d operates in the
continuous conduction mode. The MOSFET has on-resistance Ron, and the diode has a
constant forward voltage dropVD. The ﬂyback transformer has primary winding resistance
Rp and secondary winding resistance Rs.
(a) Derive a complete steady-state equivalent circuit model, which is valid in the contin-
uous conduction mode, and which correctly models the loss elements listed above as
well as the converter input and output ports. Sketch your equivalent circuit.
(b) Derive an analytical expression for the converter eﬃciency.
6.6 A low-voltage computer power supply with synchronous rectiﬁcation. The trend in digital
integrated circuits is towards lower power supply voltages. It is diﬃcult to construct a high-
eﬃciency low-voltage power supply, because the conduction loss arising in the secondary-
side diodes becomes very large. The objective of this problem is to estimate how the
eﬃciency of a forward converter varies as the output voltage is reduced, and to investigate
the use of synchronous rectiﬁers.
The forward converter of Fig. 6.24 operates from a dc input of Vg = 325 V, and supplies
20 A to its dc load. Consider three cases: ( i) V= 5V ,( ii) V= 3.3 V, and (iii) V= 1.5V .
For each case, the turns ration3/n1 is chosen such that the converter produces the required
output voltage at a transistor duty cycle of D = 0.4. The MOSFET has on-resistance
Ron= 5Ω. The secondary-side Schottky diodes have forward voltage drops ofVF = 0.5V .
All other elements can be considered ideal.
(a) Derive an equivalent circuit for the forward converter, which models the semiconduc-
tor conduction losses described above.
(b) Solve your model for cases (i), (ii), and (iii) described above. For each case, determine
numerical values of the turns ratio n3/n1 and for the eﬃciencyη.
(c) The secondary-side Schottky diodes are replaced by MOSFETs operating as syn-
chronous rectiﬁers. The MOSFETs each have an on-resistance of 4 m Ω. Determine
the new numerical values of the turns ratio n3/n1 and the eﬃciency η, for cases ( i),
(ii), and (iii).
6.7 Rotation of switching cells. A network containing switches and reactive elements has ter-
minals a, b, and c, as illustrated in Fig. 6.45a. You are given that the relationship between
the terminal voltages is Vbc/Vac=μ(D).

6.4 Summary of Key Points 207
(a)
+
+
vVg
aAb B
c
C
vbc
vac
= μ(D)
vac vbc
+ +
(b) 1
2
ba
c
vac vbc
+ +
(c)
a b
c
vac vbc
++
1 : n
12
Fig. 6.45 Rotation of three-terminal switching cells, Problem 6.7
(a) Derive expressions for the source-to-load conversion ratio V/Vg = M(D), in terms of
μ(D), for the following three connection schemes:
(i) a-A b-B c-C
(ii) a-B b-C c-A
(iii) a-C b-A c-B
(b) Consider the three-terminal network of Fig. 6.45b. Determineμ(D) for this network.
Plug your answer into your results from part (a), to verify that the buck, boost, and
buck–boost converters are generated.
(c) Consider the three-terminal network of Fig. 6.45c. Determineμ(D) for this network.
Plug your answer into your results from part (a). What converters are generated?
6.8 Transformer-isolated current-sense circuit. It is often required that the current ﬂowing in
a power transistor be sensed. A noninductive resistor R placed in series with the transistor
will produce a voltage v(t) that is proportional to the transistor drain current iD(t). Use of
a transformer allows isolation between the power transistor and the control circuit. The
transformer turns ratio also allows reduction of the current and power loss and increase
of the voltage of the resistor. This problem is concerned with design of the transformer-
isolated current-sense circuit of Fig. 6.46.
The transformer has a single-turn primary and an n-turn secondary winding. The transis-
tor switches on and oﬀwith duty cycle D and switching frequency fs. While the transistor
conducts, its current is essentially constant and is equal toI. Diodes D1 and D2 are conven-
tional silicon diodes having forward voltage drop VD. Diode DZ is a Zener diode, which
can be modeled as a voltage source of value VZ, with the polarity indicated in the ﬁg-

208 6 Converter Circuits
Fig. 6.46 Transformer-isolated circuit for sens-
ing the transistor switch current, Problem 6.8
1 : n
iD(t)
R
+
v(t)
D1
Dz
D2
Vz
+
Q1
ure. For a proper design, the circuit elements should be chosen such that the transformer
magnetizing current, in conjunction with diode D2, operates in discontinuous conduction
mode. In a good design, the magnetizing current is much smaller than the transistor current.
Three subintervals occur during each switching period: subinterval 1, in which Q1 and D1
conduct; subinterval 2, in which D2 and DZ conduct; subinterval 3, in which Q1, D1 and
D2 are oﬀ.
(a) Sketch the current-sense circuit, replacing the transformer and zener diode by their
equivalent circuits.
(b) Sketch the waveforms of the transistor current iD(t), the transformer magnetizing cur-
rent iM(t), the primary winding voltage, and the voltage v(t). Label salient features.
(c) Determine the conditions on the Zener voltage VZ that ensure that the transformer
magnetizing current is reset to zero before the end of the switching period.
(d) You are given the following speciﬁcations:
Switching frequency fs= 100 kHz
Transistor duty cycle D≤0.75
Transistor peak current max iD(t)≤25 A
The output voltage v(t) should equal 5 V when the transistor current is 25 A. To avoid
saturating the transformer core, the volt-seconds applied to the single-turn primary
winding while the transistor conducts should be no greater than 2 volt- μsec. The sili-
con diode forward voltage drops are VD= 0.7V .
Design the circuit: select values of R, n, and VZ.
6.9 Optimal reset of the forward converter transformer. As illustrated in Fig.6.47, it is possible
to reset the transformer of the forward converter using a voltage source other than the dc
input Vg; several such schemes appear in the literature. By optimally choosing the value of
the reset voltage Vr, the peak voltage stresses imposed on transistor Q1 and diode D2 can
be reduced. The maximum duty cycle can also be increased, leading to a lower transformer
turns ratio and lower transistor current. The resulting improvement in converter cost and
eﬃciency can be signiﬁcant when the dc input voltage varies over a wide range.
(a) As a function of Vg, the transistor duty cycle D, and the transformer turns ratios, what
is the minimum value ofVr that causes the transformer magnetizing current to be reset
to zero by the end of the switching period?
(b) For your choice of Vr from part (a), what is the peak voltage imposed on transistor
Q1?

6.4 Summary of Key Points 209
+
D1
Q1
R
+
v
D2
D3
Vg
+ Vr
n1 : n3
: n2
Reset
winding
Fig. 6.47 Forward converter with auxiliary reset winding, Problem 6.9
This converter is to be used in a universal-input o ﬀ-line application, with the following
speciﬁcations. The input voltage Vg can vary between 127 and 380 V . The load voltage is
regulated by variation of the duty cycle, and is equal to 12 V . The load power is 480 W.
(c) Choose the turns ratio n3/n1 such that the total active switch stress is minimized. For
your choice of n3/n1, over what range will the duty cycle vary? What is the peak
transistor current?
(d) Compare your design of Part (c) with the conventional scheme in which n1 = n2 and
Vr= Vg. Compare the worst-case peak transistor voltage and peak transistor current.
(e) Suggest a way to implement the voltage source Vr. Give a schematic of the power
stage components of your implementation. Use a few sentences to describe the control-
circuit functions required by your implementation, if any.
L1
C1 R
+Vg
1
2C2 LM
1 : n
1
2
Fig. 6.48 Forward converter of Problem 6.10
6.10 In the converter illustrated in Fig. 6.48, the transformer has magnetizing inductance LM
referred to the primary side, and has turns ratio 1 : n. It is desired that all elements operate

210 6 Converter Circuits
in the continuous conduction mode (CCM) over the range 0 ≤D < 1. This mode is
deﬁned as follows: each switching period contains two subintervals numbered 1 and 2; in
the schematic illustrated in Fig. 6.48, switches labeled “1” conduct during subinterval 1
for time DTs, and switches labeled “2” conduct during subinterval 2 for time (1−D)Ts.
(a) Solve the converter in steady state, to ﬁnd the dc components of both capacitor volt-
ages and both inductor currents.
(b) Sketch both capacitor voltage waveforms and both inductor current waveforms, in-
cluding dc components and ripples.
(c) Show how to realize the switches using BJTs and diodes, so that the converter operates
in CCM over the range 0≤D< 1.
(d) Does the transformer reset properly ( i.e., do the volt-seconds balance on LM)f o r
D > 0.5? Explain.
6.11 A ﬂyback converter with core loss and diode reverse recovery
+
–
LM
+
V
–
V
g
Q1
D11:n
C
Fig. 6.49 Flyback converter
1: n
+
v1(t) v2(t)
+
i1(t) i2(t)
Ideal
transformer
i1'(t)
LM
iM(t)
RM
Flyback transformer model
Fig. 6.50 Transformer equivalent circuit model, with core loss modeled by element RM
A ﬂyback converter is illustrated in Fig. 6.49. This converter operates in continuous con-
duction mode. The following two loss mechanisms are signiﬁcant in this converter: diode
reverse recovery, and transformer core loss. All other loss mechanisms can be ignored.
•The silicon diode D1 has reverse recovery time tr and recovered charge Qr.Y o um a y
model these parameters as being independent of current.

6.4 Summary of Key Points 211
•The transformer core loss may be modeled using a resistor RM in parallel with the
magnetizing inductance LM. This leads to the transformer equivalent circuit illustrated
in Fig. 6.50.
(a) Derive a dc equivalent circuit model for this converter. Your model should include the
eﬀects of the diode reverse-recovery process and the transformer core loss.
(b) Derive an expression for the converter eﬃciency. It is not necessary to eliminate Vg,
V, and IM from your answer to this part.
(c) The element values are Vg = 24 V, fs = 100 kHz, R= 15 Ω, D= 0.4, n= 2, RM =
240Ω, Qr= 0.75 μCoul, tr= 75 nsec. Compute the eﬃciency and the output voltage.
6.12 Design of a multiple-output dc–dc ﬂyback converter. For this problem, you may neglect all
losses and transformer leakage inductances. It is desired that the three-output ﬂyback con-
verter shown in Fig.6.51 operates in the discontinuous conduction mode, with a switching
frequency of fs = 100 kHz. The nominal operating conditions are given in the diagram,
and you may that there are no variations in the input voltage or the load currents. Select
D3= 0.1 (the duty cycle of subinterval 3, in which all semiconductors are oﬀ). The objec-
tive of this problem is to ﬁnd a good steady-state design, in which the semiconductor peak
blocking voltages and peak currents are reasonably low.
+
i1
Vg
165 V dc
+15 V
1 A
0.5 A
+5 V
4 A
np : n1
: n2
: n3
i2
i3
ip
Fig. 6.51 Three-output ﬂyback converter design, Problem 6.12
(a) It is possible to ﬁnd a design in which the transistor peak blocking voltage is less than
300 V , and the peak diode blocking voltages are all less than 35 V , under steady-state
conditions. Design the converter such that this is true. Specify: ( i) the transistor duty
cycle D,( ii) the magnetizing inductance LM, referred to the primary, ( iii)t h et u r n s
ratios n1/np and n3/np.
(b) For your design of part (a), determine the rms currents of the four windings. Note that
they do not simply scale by the turns ratios.

Part II
Converter Dynamics and Control
```
