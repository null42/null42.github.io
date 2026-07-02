---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第6章part 2 - 6 Converter Circuits
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 197-216 > Chunk ID: `chapter-6-part-2`"
---

# 第6章part 2 - 6 Converter Circuits

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 197-216  
> Chunk ID: `chapter-6-part-2`

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
6.3 Transformer Isolation 183
Fig. 6.21 Waveforms of
the full-bridge transformer-
isolated buck converter
iM(t)
vT(t)
vs(t)
iD5(t)
i(t)
Vg
0 0
g
nVg
0
nVg
0
i
0.5 i 0.5 i
0
iI
Vg
LM
Vg
LM
t
0 DTs Ts 2TsTs+DTs
Q1
Q4
D5
D6
D5 Q2
Q3
D6
D6
D5conducting
devices:
Therefore, it must be true that iD5 = iD6 = 0.5i during the second subinterval. In practice, the
diode currents diﬀer slightly from this result, because of the nonzero magnetizing current.
The ideal transformer currents in Fig. 6.20b obey
i′
1(t)−niD5(t)+ niD6(t)= 0 (6.21)
The node equation at the primary of the ideal transformer is
i1(t)= iM(t)+ i′
1(t) (6.22)
Elimination of i′
1(t) from Eqs. (6.21) and (6.22) leads to
i1(t)−niD5(t)+ niD6(t)= iM(t) (6.23)
Equations ( 6.23) and ( 6.20) describe, in the general case, the transformer winding currents
during the second subinterval. According to Eq. (6.23), the magnetizing current iM(t) may ﬂow
through the primary winding, through one of the secondary windings, or it may divide between
all three of these windings. How the division occurs depends on the i–v characteristics of the
conducting transistors and diodes, and on the transformer leakage inductances. In the case where
i1= 0, the solution to Eqs. (6.20) and (6.23)i s

184 6 Converter Circuits
iD5(t)= 1
2i(t)−1
2niM(t)
iD6(t)= 1
2i(t)+ 1
2niM(t)
(6.24)
Provided that iM ≪ ni, then iD5 and iD6 are each approximately 0.5i.
The next switching period, Ts< t< 2Ts, proceeds in a similar manner, except that the trans-
former is excited with voltage of the opposite polarity. During Ts< t< (Ts+ DTs), transistors
Q2 and Q3 and diode D6 conduct. The applied transformer primary voltage is vT =−Vg, which
causes the magnetizing current to decrease with slope−Vg/LM. The voltagevs(t) is equal tonVg,
and the output inductor current i(t) ﬂows through diode D6. Diodes D5 and D6 again both con-
duct during (Ts+ DTs)< t< 2Ts, with operation similar to subinterval 2 described previously.
It can be seen that the switching ripple in the output ﬁlter elements has frequency fs = 1/Ts.
However, the transformer waveforms have frequency 0.5 fs.
By application of the principle of inductor volt-second balance to the magnetizing induc-
tance, the average value of the transformer voltage vT (t) must be zero when the converter oper-
ates in steady state. During the ﬁrst switching period, positive volt-seconds are applied to the
transformer, approximately equal to
[
V
g−⎦Q1 and Q4 forward voltage drops)]
(Q1 and Q4 conduction time) (6.25)
During the next switching period, negative volt-seconds are applied to the transformer, given by
−
[
Vg−⎦Q2 and Q3 forward voltage drops)]
(Q2 and Q3 conduction time) (6.26)
The net volt-seconds, that is, the sum of Eqs. ( 6.25) and ( 6.26), should equal zero. While the
full-bridge scheme causes this to be approximately true, in practice there exist imbalances such
as small diﬀerences in the transistor forward voltage drops or in the transistor switching times,
so that⟨vT⟩ is small but nonzero. In consequence, during every two switching periods there is a
net increase in the magnitude of the magnetizing current. This increase can cause the transistor
forward voltage drops to change such that small imbalances are compensated. However, if the
imbalances are too large, then the magnetizing current becomes large enough to saturate the
transformer.
Transformer saturation under steady-state conditions can be avoided by placing a capacitor
in series with the transformer primary. Imbalances then induce a dc voltage component across
the capacitor, rather than across the transformer primary. Another solution is the use of current-
programmed control, discussed in a later chapter. The series capacitor is omitted when current-
programmed control is used.
By application of the principle of volt-second balance to the output ﬁlter inductor L, the dc
load voltage must be equal to the dc component of v
s(t):
V=⟨vs⟩ (6.27)
By inspection of the vs(t) waveform in Fig.6.21,⟨vs⟩= nDVg. Hence,
V= nDVg (6.28)

6.3 Transformer Isolation 185
So as in the buck converter, the output voltage can be controlled by variation of the transistor
duty cycle D. An additional increase or decrease of the voltage can be obtained via the physical
transformer turns ratio n. Equation ( 6.28) is valid for operation in the continuous conduction
mode; as in the nonisolated buck converter, the full-bridge and half-bridge converters can oper-
ate in discontinuous conduction mode at light load. The converter can operate over essentially
the entire range of duty cycles 0≤D< 1.
Transistors Q
1 and Q2 must not conduct simultaneously; doing so would short out the dc
source Vg, causing ashoot-through current spike. This transistorcross-conduction condition can
lead to low eﬃciency and transistor failure. Cross conduction can be prevented by introduction
of delay between the turn-oﬀof one transistor and the turn-on of the next transistor. DiodesD1 to
D4 ensure that the peak transistor voltage is limited to the dc input voltage Vg, and also provide
a conduction path for the transformer magnetizing current at light load. Details of the switching
transitions of the full-bridge circuit are discussed further in a later chapter, in conjunction with
zero-voltage switching phenomena.
The full-bridge conﬁguration is typically used in switching power supplies at power levels
of approximately 750 W and greater. It is usually not used at lower power levels because of its
high parts count—four transistors and their associated drive circuits are required. The utilization
of the transformer is good, leading to small transformer size. In particular, the utilization of the
transformer core is very good, since the transformer magnetizing current can be both positive
and negative. Hence, the entire coreB–H loop can be used. However, in practice, the ﬂux swing
is usually limited by core loss. The transformer primary winding is eﬀectively utilized. But the
center-tapped secondary winding is not, since each half of the center-tapped winding transmits
power only during alternate switching periods. Also, the secondary winding currents during
subinterval 2 lead to winding power loss, but not to transmittal of energy to the load. Design of
the transformer of the full-bridge conﬁguration is discussed in detail in a later chapter.
The half-bridge transformer-isolated buck converter is illustrated in Fig.6.22. Typical wave-
forms are illustrated in Fig. 6.23. This circuit is similar to the full-bridge of Fig. 6.20a, except
transistors Q
3 and Q4, and their antiparallel diodes, have been replaced with large-value ca-
pacitors Ca and Cb. By volt-second balance of the transformer magnetizing inductance, the dc
voltage across capacitor Cb is equal to the dc component of the voltage across transistor Q2,o r
CR
+
v
LD3
D4
1: n
: n
i(t)
+
vs(t)
+
vT(t)+Vg
D1
Q1
D2Q2
i1(t) iD3(t)Ca
Cb
Fig. 6.22 Half-bridge transformer-isolated buck converter

186 6 Converter Circuits
Fig. 6.23 Waveforms of
the half-bridge transformer-
isolated buck converter
0.5Vg
LM
0.5Vg
LM
iM(t)
vT(t)
vs(t)
iD3(t)
i(t)
0.5Vg
0 0
Vg
0.5nVg
0
0.5nVg
0
i
0.5 i 0.5 i
0
iI
t
0 DTs Ts 2TsTs+DTs
Q1
D3 D4
D3 Q2
D4 D4
D3conducting
devices:
0.5Vg. The transformer primary voltage vT (t)i st h e n0.5Vg when transistor Q1 conducts, and
−0.5Vg when transistor Q2 conducts. The magnitude of vT (t) is half as large as in the full-bridge
conﬁguration, with the result that the output voltage is reduced by a factor of 0.5:
V= 0.5nDVg (6.29)
The factor of 0.5 can be compensated for by doubling the transformer turns ratio n. However,
this causes the transistor currents to double.
So the half-bridge conﬁguration needs only two transistors rather than four, but these two
transistors must handle currents that are twice as large as those of the full-bridge circuit. In
consequence, the half-bridge conﬁguration ﬁnds application at lower power levels, for which
transistors with suﬃcient current rating are readily available, and where low parts count is
important. Utilization of the transformer core and windings is essentially the same as in the
full-bridge, and the peak transistor voltage is clamped to the dc input voltage V
g by diodes D1
and D2. It is possible to omit capacitor Ca if desired. The current-programmed mode generally
does not work with half-bridge converters.

6.3 Transformer Isolation 187
+
D1
Q1
n1 : n2 : n3
CR
+
V
LD2
D3
Vg
Fig. 6.24 Single-transistor forward converter
6.3.2 Forward Converter
The forward converter is illustrated in Fig.6.24. This transformer-isolated converter is based on
the buck converter. It requires a single transistor, and hence ﬁnds application at power levels
lower than those commonly encountered in the full-bridge and half-bridge conﬁgurations. Its
nonpulsating output current, shared with other buck-derived converters, makes the forward con-
verter well suited for applications involving high output currents. The maximum transistor duty
cycle is limited in value; for the common choice n
1 = n2, the duty cycle is limited to the range
0≤D< 0.5.
The transformer magnetizing current is reset to zero while the transistor is in the o ﬀstate.
How this occurs can be understood by replacing the three-winding transformer in Fig.6.24 with
the equivalent circuit of Fig. 6.18b. The resulting circuit is illustrated in Fig. 6.25, and typical
waveforms are given in Fig.6.26. The magnetizing inductanceLM, in conjunction with diodeD1,
must operate in the discontinuous conduction mode. The output inductorL, in conjunction with
diode D3, may operate in either continuous or discontinuous conduction mode. The waveforms
of Fig. 6.26 are sketched for continuous mode operation of inductor L. During each switching
period, three subintervals then occur as illustrated in Fig. 6.27.
During subinterval 1, transistor Q1 conducts and the circuit of Fig. 6.27a is obtained. Diode
D2 becomes forward-biased, while diodesD1 and D3 are reverse-biased. V oltageVg is applied to
the transformer primary winding, and hence the transformer magnetizing currentiM(t) increases
with a slope of Vg/LM as illustrated in Fig. 6.26. The voltage across diode D3 is equal to Vg,
multiplied by the turns ratio n3/n1.
The second subinterval begins when transistorQ1 is switched oﬀ. The circuit of Fig.6.27bi s
then obtained. The transformer magnetizing currentiM(t) at this instant is positive, and must con-
tinue to ﬂow. Since transistorQ1 is oﬀ, the equivalent circuit model predicts that the magnetizing
current must ﬂow into the primary of the ideal transformer. It can be seen thatn1iM ampere-turns
ﬂow out of the polarity mark of the primary winding. Hence, according to Eq. ( 6.16), an equal
number of total ampere-turns must ﬂow into the polarity marks of the other windings. DiodeD2
prevents current from ﬂowing into the polarity mark of winding 3. Hence, the current iMn1/n2
must ﬂow into the polarity mark of winding 2. So diode D1 becomes forward-biased, while

188 6 Converter Circuits
+
D1
Q1
n1 : n2 : n3
CR
+
V
LD2
D3
Vg
LM
iM i1'
i1 i2
i3
+
v1
+
vD3
+
v3
+
vQ1
v2
+
Fig. 6.25 Forward converter, with transformer equivalent circuit model
Fig. 6.26 Waveforms of the
forward converter
v1
iM
vD3
t
Vg
n1
n2
Vg
0
Vg
LM
n1
n2
Vg
LM 0
00
n3
n1
Vg
DTs D2Ts D3Ts
Ts
Q1
D2
D1
D3
D3Conducting
devices:
diode D2 is reverse-biased. V oltageVg is applied to winding 2, and hence the voltage across the
magnetizing inductance is −Vgn1/n2, referred to winding 1. This negative voltage causes the
magnetizing current to decrease, with a slope of−Vgn1/n2LM. Since diode D2 is reverse-biased,
diode D3 must turn on to conduct the output inductor current i(t).

6.3 Transformer Isolation 189
(a)
+
D1 offQ1 on
n1 : n2 : n3
CR
+
V
LD2 on
Vg
LM
iM i1'
i1 i2
i3
+
v1
+
vD3
+
v3v2
+
(b)
+
D1 on
Q1 off
n1 : n2 : n3
CR
+
V
L
D3 on
Vg
LM
iM i1'
i1
i2 = iM n1 /n2
i3
+
v1
+
vD3
+
v3v2
+
(c)
+
D1 offQ1 off
n1 : n2 : n3
CR
+
V
L
D3 on
Vg
LM
i1'
i1 i2
i3
+
v1
+
vD3
+
v3v2
+
iM
= 0
Fig. 6.27 Forward converter circuit: (a) during subinterval 1, (b) during subinterval 2, (c) during subin-
terval 3
When the magnetizing current reaches zero, diode D1 becomes reverse-biased. Subinterval
3 then begins, and the circuit of Fig. 6.27c is obtained. Elements Q1, D1, and D2 operate in the
oﬀstate, and the magnetizing current remains at zero for the balance of the switching period.
By application of the principle of inductor volt-second balance to the transformer magnetiz-
ing inductance, the primary winding voltagev1(t) must have zero average. Referring to Fig.6.26,
the average of v1(t)i sg i v e nb y
⟨v1⟩= D(Vg)+ D2(−Vg n1/n2)+ D3(0)= 0 (6.30)

190 6 Converter Circuits
Fig. 6.28 Magnetizing cur-
rent waveform, forward con-
verter: ( a)D C M , D< 0.5;
(b) CCM, D> 0.5
(a)
iM(t)
DTs D2Ts D3Ts t
(b)
iM(t)
DTs D2Ts t2Ts
Solution for the duty cycle D2 yields
D2= n2
n1
D (6.31)
Note that the duty cycle D3 cannot be negative. But since D+ D2+ D3= 1, we can write
D3= 1−D−D2≥0 (6.32)
Substitution of Eq. (6.31) into Eq. (6.32) leads to
D3= 1−D
⎦
1+ n2
n1
)
≥0 (6.33)
Solution for D then yields
D≤ 1
1+ n2
n1
(6.34)
So the maximum duty cycle is limited. For the common choice n1= n2, the limit becomes
D≤1
2 (6.35)
If this limit is violated, then the transistor oﬀ-time is insuﬃcient to reset the transformer magne-
tizing current to zero before the end of the switching period. Transformer saturation may then
occur.
The transformer magnetizing current waveform iM(t) is illustrated in Fig. 6.28, for the typ-
ical case where n1 = n2. Figure 6.28a illustrates operation with D < 0.5. The magnetizing
inductance, in conjunction with diode D1, operates in the discontinuous conduction mode, and
iM(t) is reset to zero before the end of each switching period. Figure 6.28b illustrates what hap-
pens when the transistor duty cycle D is greater than 0.5. There is then no third subinterval, and
the magnetizing inductance operates in continuous conduction mode. Furthermore, subinterval

6.3 Transformer Isolation 191
2 is not long enough to reset the magnetizing current to zero. Hence, there is a net increase of
iM(t) over each switching period. Eventually, the magnetizing current will become large enough
to saturate the transformer.
The converter output voltage can be found by application of the principle of inductor volt-
second balance to inductor L. The voltage across inductor L must have zero dc component, and
therefore the dc output voltage V is equal to the dc component of diode D3 voltage vD3(t). The
waveform vD3(t) is illustrated in Fig. 6.26. It has an average value of
⟨vD3⟩= V= n3
n1
DVg (6.36)
This is the solution of the forward converter in the continuous conduction mode. The solution
is subject to the constraint given in Eq. (6.34).
It can be seen from Eq. (6.34) that the maximum duty cycle could be increased by decreasing
the turns ratio n2/n1. This would cause iM(t) to decrease more quickly during subinterval 2,
resetting the transformer faster. Unfortunately, this also increases the voltage stress applied
to transistor Q1. The maximum voltage applied to transistor Q1 occurs during subinterval 2;
solution of the circuit of Fig. 6.27b for this voltage yields
max ⎦vQ1
)= Vg
⎦
1+ n1
n2
)
(6.37)
For the common choice n1= n2, the voltage applied to the transistor during subinterval 2 is 2Vg.
In practice, a somewhat higher voltage is observed, due to ringing associated with the trans-
former leakage inductance. So decreasing the turns ration2/n1 allows increase of the maximum
transistor duty cycle, at the expense of increased transistor blocking voltage.
A two-transistor version of the forward converter is illustrated in Fig. 6.29. Transistors Q1
and Q2 are controlled by the same gate drive signal, such that they both conduct during subin-
terval 1, and are oﬀduring subintervals 2 and 3. The secondary side of the converter is identical
to the single-transistor forward converter; diode D3 conducts during subinterval 1, while diode
+
D1
Q1
1 : n
CR
+
V
L
D2
D3
Vg
Q2
D4
Fig. 6.29 Two-transistor forward converter

192 6 Converter Circuits
D4 conducts during subintervals 2 and 3. During subinterval 2, the magnetizing current iM(t)
forward-biases diodes D1 and D2. The transformer primary winding is then connected to Vg,
with polarity opposite to that of subinterval 1. The magnetizing current then decreases, with
slope−Vg/LM. When the magnetizing current reaches zero, diodes D1 and D2 become reverse-
biased. The magnetizing current then remains at zero for the balance of the switching period.
So operation of the two-transistor forward converter is similar to the single-transistor forward
converter, in which n1 = n2. The duty cycle is limited to D< 0.5. This converter has the ad-
vantage that the transistor peak blocking voltage is limited to Vg, and is clamped by diodes D1
and D2. Typical power levels of the two-transistor forward converter are similar to those of the
half-bridge conﬁguration.
The utilization of the transformer of the forward converter is quite good. Since the trans-
former magnetizing current cannot be negative, only half of the core B–H loop can be used.
This would seemingly imply that the transformer cores of forward converters should be twice
as large as those of full- or half-bridge converters. However, in modern high-frequency convert-
ers, the ﬂux swing is constrained by core loss rather than by the core material saturation ﬂux
density. In consequence, the utilization of the transformer core of the forward converter can be
as good as in the full- or half-bridge conﬁgurations. Utilization of the primary and secondary
windings of the transformer is better than in the full-bridge, half-bridge, or push-pull conﬁgu-
rations, since the forward converter requires no center-tapped windings. During subinterval 1,
all of the available winding copper is used to transmit power to the load. Essentially no unnec-
essary current ﬂows during subintervals 2 and 3. Typically, the magnetizing current is small
compared to the reﬂected load current, and has negligible eﬀect on the transformer utilization.
So the transformer core and windings are eﬀectively utilized in modern forward converters.
6.3.3 Push-Pull Isolated Buck Converter
The push-pull isolated buck converter is illustrated in Fig. 6.30. The secondary-side circuit is
identical with the full- and half-bridge converters, with identical waveforms. The primary-side
circuit contains a center-tapped winding. Transistor Q
1 conducts for time DTs during the ﬁrst
switching period. Transistor Q2 conducts for an identical length of time during the next switch-
ing period, such that volt-second balance is maintained across the transformer primary winding.
Converter waveforms are illustrated in Fig.6.31. This converter can operate over the entire range
of duty cycles 0≤D< 1. Its conversion ratio is given by
V= nDVg (6.38)
Fig. 6.30 Push-pull iso-
lated buck converter CR
+
V
LD1
D2
1 : n
+
Vg
Q1
Q2
+
vs(t)
vT(t)
+
vT(t)
+
iD1(t)
i(t)

6.3 Transformer Isolation 193
Fig. 6.31 Waveforms of
the push-pull isolated buck
converter
iM(t)
vT(t)
vs(t)
iD1(t)
i(t)
Vg
0 0
g
nVg
0
nVg
0
i
0.5 i 0.5 i
0
iI
Vg
LM
Vg
LM
t
0 DTs Ts 2TsTs+DTs
Q1
D1 D2
D1 Q2
D2 D2
D1Conducting
devices:
This converter is sometimes used in conjunction with low input voltages. It tends to exhibit
low primary-side conduction losses, since at any given instant only one transistor is connected
in series with the dc source Vg. The ability to operate with transistor duty cycles approaching
unity also allows the turns ratio n to be minimized, reducing the transistor currents.
The push-pull conﬁguration is prone to transformer saturation problems. Since it cannot be
guaranteed that the forward voltage drops and conduction times of transistors Q1 and Q2 are
exactly equal, small imbalances can cause the dc component of voltage applied to the trans-
former primary to be nonzero. In consequence, during every two switching periods there is a
net increase in the magnitude of the magnetizing current. If this imbalance continues, then the
magnetizing current can eventually become large enough to saturate the transformer.
Current-programmed control can be employed to mitigate the transformer saturation prob-
lems. Operation of the push-pull converter using only duty-cycle control is not recommended.
Utilization of the transformer core material and secondary winding is similar to that for the
full-bridge converter. The ﬂux and magnetizing current can be both positive and negative, and
therefore the entire B–H loop can be used, if desired. Since the primary and secondary windings
are both center-tapped, their utilization is suboptimal.

194 6 Converter Circuits
6.3.4 Flyback Converter
The ﬂyback converter is based on the buck–boost converter. Its derivation is illustrated in
Fig. 6.32. Figure 6.32a depicts the basic buck–boost converter, with the switch realized using
a MOSFET and diode. In Fig. 6.32b, the inductor winding is constructed using two wires, with
a 1:1 turns ratio. The basic function of the inductor is unchanged, and the parallel windings
are equivalent to a single winding constructed of larger wire. In Fig. 6.32c, the connections
between the two windings are broken. One winding is used while the transistor Q1 conducts,
while the other winding is used when diode D1 conducts. The total current in the two windings
is unchanged from the circuit of Fig. 6.32b; however, the current is now distributed between
the windings diﬀerently. The magnetic ﬁelds inside the inductor in both cases are identical.
Fig. 6.32 Derivation of the ﬂy-
back converter: (a) buck–boost
converter; ( b) inductor L is
wound with two parallel wires;
(c) inductor windings are iso-
lated, leading to the ﬂyback con-
verter; (d) with a 1 : n turns ra-
tio and positive output
(a)
+ L V
+
Vg
Q1 D1
(b)
+ L V
+
Vg
Q1 D1
1:1
(c)
+ LM V
+
Vg
Q1 D1
1:1
(d)
+
LM
+
V
Vg
Q1
D11:n
C

6.3 Transformer Isolation 195
Although the two-winding magnetic device is represented using the same symbol as the trans-
former, a more descriptive name is “two-winding inductor.” This device is sometimes also called
a ﬂyback transformer. Unlike the ideal transformer, current does not ﬂow simultaneously in
both windings of the ﬂyback transformer. Figure 6.32d illustrates the usual conﬁguration of the
ﬂyback converter. The MOSFET source is connected to the primary-side ground, simplifying
the gate drive circuit. The transformer polarity marks are reversed, to obtain a positive output
voltage. A 1:n turns ratio is introduced; this allows better converter optimization.
Fig. 6.33 Flyback converter
circuit: ( a) with transformer
equivalent circuit model, ( b)
during subinterval 1, (c) during
subinterval 2
(a)
+
LM
+
v
Vg
Q1
D11:n
C
Transformer model
iig
R
iC+
vL
(b)
+ LM
+
vVg
1:n
C
Transformer model
iig
R
iC+
vL
(c)
+
+
vVg
1:n
C
Transformer model
i
R
iC
i/n
v/n
+
+
vL
ig
= 0
The ﬂyback converter may be analyzed by insertion of the model of Fig.6.18b in place of the
ﬂyback transformer. The circuit of Fig. 6.33a is then obtained. The magnetizing inductance LM
functions in the same manner as inductor L of the original buck–boost converter of Fig. 6.32a.
When transistor Q1 conducts, energy from the dc source Vg is stored in LM. When diode D1
conducts, this stored energy is transferred to the load, with the inductor voltage and current
scaled according to the 1:n turns ratio.

196 6 Converter Circuits
Fig. 6.34 Flyback converter waveforms,
continuous conduction mode
vL
iC
ig
t
Vg
0
DTs D'Ts
Ts
Q1 D1
Conducting
devices:
I
During subinterval 1, while transistor Q1 conducts, the converter circuit model reduces to
Fig. 6.33b. The inductor voltage vL, capacitor current iC, and dc source current ig are given by
vL = Vg
iC =−v
R (6.39)
ig = i
With the assumption that the converter operates in the continuous conduction mode, with small
inductor current ripple and small capacitor voltage ripple, the magnetizing current i and output
capacitor voltage v can be approximated by their dc components,I and V, respectively. Equation
(6.39) then becomes
vL = Vg
iC =−V
R (6.40)
ig= I
During the second subinterval, the transistor is in the o ﬀstate, and the diode conducts. The
equivalent circuit of Fig. 6.33c is obtained. The primary-side magnetizing inductance voltage
vL, the capacitor current iC, and the dc source current ig for this subinterval are

6.3 Transformer Isolation 197
vL =−v
n
iC = i
n−v
R (6.41)
ig= 0
It is important to consistently deﬁnevL(t) on the same side of the transformer for all subintervals.
Upon making the small-ripple approximation, one obtains
vL =−V
n
iC = I
n−V
R (6.42)
ig = 0
The vL(t), iC(t), and ig(t) waveforms are sketched in Fig. 6.34 for continuous conduction mode
operation.
Application of the principle of volt-second balance to the primary-side magnetizing induc-
tance yields
⟨vL⟩= D(Vg)+ D′
⎦
−V
n
)
= 0 (6.43)
Solution for the conversion ratio then leads to
M(D)= V
Vg
= n D
D′ (6.44)
So the conversion ratio of the ﬂyback converter is similar to that of the buck–boost converter,
but contains an added factor of n.
Application of the principle of charge balance to the output capacitor C leads to
⟨iC⟩= D
⎦
−V
R
)
+ D′
⎦I
n−V
R
)
= 0 (6.45)
Solution for I yields
I= nV
D′R (6.46)
This is the dc component of the magnetizing current, referred to the primary. The dc component
of the source current ig is
Ig=⟨ig⟩= D(I)+ D′(0) (6.47)
An equivalent circuit that models the dc components of the ﬂyback converter waveforms can
now be constructed. Circuits corresponding to the inductor loop equation ( 6.43) and to node
equations (6.45) and ( 6.47) are illustrated in Fig. 6.35a. By replacing the dependent sources
with ideal dc transformers, one obtains Fig. 6.35b. This is the dc equivalent circuit of the ﬂy-
back converter. It contains a 1: D buck-type conversion ratio, followed by a D′ : 1 boost-type
conversion ratio, and an added factor of 1:n arising from the ﬂyback transformer turns ratio. By
use of the method developed in Chap. 3, the model can be reﬁned to account for losses and to
predict the converter eﬃciency. The ﬂyback converter can also be operated in the discontinuous
conduction mode; analysis is left as a homework problem. The results are similar to the DCM
buck–boost converter results tabulated in Chap. 5, but are generalized to account for the turns
ratio 1:n.

198 6 Converter Circuits
(a)
++ R
+
VVg
D'InD'Vn+ DVgDI
IIg
(b)
+ R
+
VVg
IIg
1: D D': n
Fig. 6.35 Flyback converter equivalent circuit model, CCM: ( a) circuits corresponding to Eqs. ( 6.43),
(6.45), and (6.47); (b) equivalent circuit containing ideal dc transformers
The ﬂyback converter is commonly used at the 50 to 100 W power range, as well as in high-
voltage power supplies for televisions and computer monitors. It has the advantage of very low
parts count. Multiple outputs can be obtained using a minimum number of parts: each additional
output requires only an additional winding, diode, and capacitor. However, in comparison with
the full-bridge, half-bridge, or two-transistor forward converters, the ﬂyback converter has the
disadvantages of high transistor voltage stress and poor cross-regulation. The peak transistor
voltage is equal to the dc input voltage V
g plus the reﬂected load voltage V/n; in practice, ad-
ditional voltage is observed due to ringing associated with the transformer leakage inductance.
Rigorous comparison of the utilization of the ﬂyback transformer with the transformers of buck-
derived circuits is diﬃcult because of the diﬀerent functions performed by these elements. The
magnetizing current of the ﬂyback transformer is unipolar, and hence no more than half of the
core material B–H loop can be utilized. The magnetizing current must contain a signiﬁcant dc
component. Yet, the size of the ﬂyback transformer is quite small in designs intended to oper-
ate in the discontinuous conduction mode. However, DCM operation leads to increased peak
currents in the transistor, diode, and ﬁlter capacitors. Continuous conduction mode designs re-
quire larger values of L
M, and hence larger ﬂyback transformers, but the peak currents in the
power-stage elements are lower.
6.3.5 Boost-Derived Isolated Converters
Transformer-isolated boost converters can be derived by inversion of the source and load of
buck-derived isolated converters. A number of conﬁgurations are known, and two of these are
brieﬂy discussed here. These converters ﬁnd some employment in high-voltage power supplies,
as well as in low-harmonic rectiﬁer applications.
A full-bridge conﬁguration is diagrammed in Fig. 6.36, and waveforms for the continuous
conduction mode are illustrated in Fig. 6.37. The circuit topologies during the ﬁrst and second

6.3 Transformer Isolation 199
CR
+
v
L
D1
D2
1 : n
: n
i(t)
+
vT(t)+Vg
Q1
Q2
Q3
Q4
+ vL(t)
io(t)
Fig. 6.36 Full-bridge transformer-isolated boost converter
vL(t)
i(t)
io(t)
t
Vg
0
Q1
D1
Conducting
devices:
Vg V/n
I/n
vT(t)
00
V/n
 V/n
Vg
Vg V/n
I/n
0
DTs D'Ts
Ts
DTs D'Ts
Ts
Q2
Q3
Q4
Q1
Q2
Q3
Q4
Q1
Q4
Q2
Q3
D2
I
Fig. 6.37 Waveforms of the transformer-isolated full-bridge boost converter, CCM

200 6 Converter Circuits
(a)
+
Vg
CR
+
V
L
D1
D2
1 : n
Q1
Q2
+ vL(t)
vT(t)
+
vT(t)
+
io(t)
i(t)
(b)
+
Vg
CR
+
V
D1
D2
1 : n
Q1
Q2
Fig. 6.38 Push-pull isolated converters: ( a) based on the boost converter, ( b) based on the Watkins–
Johnson converter
subintervals are equivalent to those of the basic nonisolated boost converter, and when the turns
ratio is 1:1, the inductor current i(t) and output current io(t) waveforms are identical to the
inductor current and diode current waveforms of the nonisolated boost converter.
During subinterval 1, all four transistors operate in the on state. This connects the inductor
L across the dc input sourceVg, and causes diodes D1 and D2 to be reverse-biased. The inductor
current i(t) increases with slopeVg/L, and energy is transferred from the dc sourceVg to inductor
L. During the second subinterval, transistors Q2 and Q3 operate in the oﬀstate, so that inductor
L is connected via transistors Q1 and Q4 through the transformer and diode D1 to the dc output.
The next switching period is similar, except that during subinterval 2, transistors Q1 and Q4
operate in the oﬀstate, and inductor L is connected via transistors Q2 and Q3 through the
transformer and diode D2 to the dc output. If the transistor oﬀ-times and the diode forward drops
are identical, then the average transformer voltage is zero, and the net volt-seconds applied to
the transformer magnetizing inductance over two switching periods is zero.
Application of the principle of inductor volt-second balance to the inductor voltage wave-
form vL(t) yields
⟨vL⟩= D(Vg)+ D′
⎦
Vg−V
n
)
= 0 (6.48)
Solution for the conversion ratio M(D) then leads to
M(D)= V
Vg
= n
D′ (6.49)

6.3 Transformer Isolation 201
This result is similar to the boost converter M(D), with an added factor of n due to the trans-
former turns ratio.
The transistors must block the reﬂected load voltage V/n= Vg/D′. In practice, additional
voltage is observed due to ringing associated with the transformer leakage inductance. Because
the instantaneous transistor current is limited by inductor L, saturation of the transformer due
to small imbalances in the semiconductor forward voltage drops or conduction times is not
catastrophic. Indeed, control schemes are known in which the transformer is purposely operated
in saturation during subinterval 1 [53, 55].
A push-pull conﬁguration is depicted in Fig. 6.38a. This conﬁguration requires only two
transistors, each of which must block voltage 2 V/n. Operation is otherwise similar to that of
the full-bridge. During subinterval 1, both transistors conduct. During subinterval 2, one of the
transistors operates in the o ﬀstate, and energy is transferred from the inductor through the
transformer and one of the diodes to the output. Transistors conduct during subinterval 2 during
alternate switching periods, such that transformer volt-second balance is maintained. A similar
push-pull version of the Watkins–Johnson converter, converter 6 of Fig. 6.15, is illustrated in
Fig. 6.38b.
6.3.6 Isolated Versions of the SEPIC and the ´Cuk Converter
The artiﬁce used to obtain isolation in the ﬂyback converter can also be applied to the SEPIC
and inverse-SEPIC. Referring to Fig. 6.39a, inductor L
2 can be realized using two windings,
leading to the isolated SEPIC of Fig. 6.39b. An equivalent circuit is given in Fig. 6.39c. It can
be seen that the magnetizing inductance performs the energy storage function of the original
inductor L2. In addition, the ideal transformer provides isolation and a turns ratio.
Typical primary and secondary winding current waveforms ip(t) and is(t) are portrayed in
Fig. 6.40, for the continuous conduction mode. The magnetic device must function as both a ﬂy-
back transformer and also a conventional two-winding transformer. During subinterval 1, while
transistor Q
1 conducts, the magnetizing current ﬂows through the primary winding, and the sec-
ondary winding current is zero. During subinterval 2, while diodeD1 conducts, the magnetizing
current ﬂows through the secondary winding to the load. In addition, the input inductor current
i
1 ﬂows through the primary winding. This induces an additional component of secondary cur-
rent i1/n, which also ﬂows to the load. So design of the SEPIC transformer is somewhat unusual,
and the rms winding currents are larger than those of the ﬂyback transformer.
By application of the principle of volt-second balance to inductorsL1 and LM, the conversion
ratio can be shown to be
M(D)= V
Vg
= nD
D′ (6.50)
Ideally, the transistor must block voltage Vg/D′. In practice, additional voltage is observed due
to ringing associated with the transformer leakage inductance.
An isolated version of the inverse-SEPIC is shown in Fig.6.41. Operation and design of the
transformer is similar to that of the SEPIC.
Isolation in the ´Cuk converter is obtained in a diﬀerent manner [58]. The basic nonisolated
´Cuk converter is illustrated in Fig.6.42a. In Fig.6.42b, capacitorC1 is split into two series capac-
itors C1a and C1b. A transformer can now be inserted between these capacitors, as indicated in
Fig. 6.42c. The polarity marks have been reversed, so that a positive output voltage is obtained.

202 6 Converter Circuits
(a)
+
D1
L1
C2
+
v
Q1
C1
L2
RVg
(b)
+
D1L1
C2
+
v
Q1
C1
RVg
1 : n
ip isi1
(c)
+
D1L1
C2
+
v
Q1
C1
RVg
1 : nip
isi1 i2
Ideal
Transformer
model
LM
= L2
Fig. 6.39 Obtaining isolation in the SEPIC: (a) basic nonisolated converter, (b) isolated SEPIC, (c) with
transformer equivalent circuit model
Having capacitors in series with the transformer primary and secondary windings ensures that
no dc voltage is applied to the transformer. The transformer functions in a conventional manner,
with small magnetizing current and negligible energy storage within the magnetizing induc-
tance.
Utilization of the transformer of the ´Cuk converter is quite good. The magnetizing current
can be both positive and negative, and hence the entire coreB–H loop can be utilized if desired.
There are no center-tapped windings, and all of the copper is eﬀectively utilized. The transistor
must block voltage Vg/D′, plus some additional voltage due to ringing associated with the
transformer leakage inductance. The conversion ratio is identical to that of the isolated SEPIC,
Eq. (6.50).
The isolated SEPIC and ´Cuk converter ﬁnd application as switching power supplies, typi-
cally at power levels of several hundred watts. They also ﬁnd use as ac–dc low-harmonic recti-
ﬁers.
```
