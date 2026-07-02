---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第22章part 2 - 22 Resonant Conversion
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 951-970 > Chunk ID: `chapter-22-part-2`"
---

# 第22章part 2 - 22 Resonant Conversion

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 951-970  
> Chunk ID: `chapter-22-part-2`

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
22.3 Soft Switching 953
Ts
2
t
ids(t)
t
Ts
2 + t
Q1
Q4
D1
D4
Q2
Q3
D2
D3
Conducting
devices:
of Q1, Q4 of Q1, Q4
t
Vg
vds1(t)
Fig. 22.26 Transistor Q1 voltage and current waveforms, for operation of the series resonant converter
below resonance in the k= 1 CCM
age fundamental component vs1(t), as shown in Fig.22.25. In consequence, the zero crossing of
the current waveform is(t) occurs before the zero crossing of the voltage vs(t).
For the half-cycle 0< t< Ts/2, the switch voltage vs is equal to+Vg.F o r0< t< tβ,t h e
current is(t) is positive and transistorsQ1 and Q4 conduct. Diodes D1 and D4 conduct when is(t)
is negative, over the interval tβ< t< Ts/2. The situation during Ts/2< t< Ts is symmetrical.
Since is1(t) leads vs1(t), the transistors conduct before their respective antiparallel diodes. Note
that, at any given time during the D1 conduction interval tβ< t< Ts/2, transistor Q1 can be
turned oﬀwithout incurring switching loss. The circuit naturally causes the transistor turn-o ﬀ
transition to be lossless, and long turn-oﬀswitching times can be tolerated.
In general, zero-current switching can occur when the resonant tank presents an e ﬀective
capacitive load to the switches, so that the switch current zero crossings occur before the switch
voltage zero crossings. In the bridge conﬁguration, zero-current switching is characterized by
the half-bridge conduction sequence Q1–D1–Q2–D2, such that the transistors are turned o ﬀ
while their respective antiparallel diodes conduct. It is possible, if desired, to replace the transis-
tors with naturally commutated thyristors whenever the zero-current-switching property occurs
at the turn-oﬀtransition.
The transistor turn-on transition in Fig. 22.26 is similar to that of a PWM switch: it is hard-
switched and is not lossless. During the turn-on transition ofQ1, diode D2 must turn oﬀ. Neither
the transistor current nor the transistor voltage is zero, Q1 passes through a period of high
instantaneous power dissipation, and switching loss occurs. As in the PWM case, the reverse
recovery current of diode D2 ﬂows through Q1. This current spike can be the largest component
of switching loss. In addition, the energy stored in the drain-to-source capacitances ofQ1 and Q2
and in the depletion layer capacitance of D1 is lost when Q1 turns on. These turn-on transition
switching loss mechanisms can be a major disadvantage of zero-current-switching schemes.

954 22 Resonant Conversion
Ts
2
t
vs(t)
Vg
g
vs1(t)
t
is(t)
t
Q1
Q4
D1
D4
Q2
Q3
D2
D3
Conducting
devices:
turn-on of
Q1, Q4
turn-off of
Q1, Q4
turn-on of
Q2, Q3
turn-off of
Q2, Q3
Fig. 22.27 Switch network output waveforms for the series resonant converter, operated above resonance
in the continuous conduction mode. Zero-voltage switching aids the transistor turn-on process
Since zero-current switching does not address the switching loss mechanisms that dominate in
MOSFET converters, improvements in eﬃciency typically are not observed.
22.3.2 Operation of the Full-Bridge Above Resonance: Zero-Voltage Switching
When the series resonant converter is operated above resonance, the zero-voltage switching
phenomenon can occur, in which the circuit causes the transistor voltage to become zero before
the controller turns the transistor on. With a minor circuit modiﬁcation, the transistor turn-o ﬀ
transitions can also be caused to occur at zero voltage. This process can lead to signiﬁcant
reductions in the switching losses of converters based on MOSFETs and diodes.
For the full-bridge circuit of Fig. 22.24, the switch output voltage vs(t), and its fundamental
component vs1(t), as well as the approximately sinusoidal tank current waveform is(t), are plot-
ted in Fig. 22.27. At frequencies greater than the tank resonant frequency, the input impedance
of the tank networkZi(s) is dominated by the tank inductor impedance. Hence, the tank presents
an eﬀective inductive load to the bridge, and the switch currentis(t) lags the switch voltage fun-
damental component vs1(t), as shown in Fig. 22.27. In consequence, the zero crossing of the
voltage waveform vs(t) occurs before the current waveform is(t).
For the half-cycle 0< t< Ts/2, the switch voltage vs(t) is equal to+Vg.F o r0< t< tα,t h e
current is(t) is negative and diodes D1 and D4 conduct. Transistors Q1 and Q4 conduct when
is(t) is positive, over the interval tα < t< Ts/2. The waveforms during Ts/2< t< Ts are

22.3 Soft Switching 955
symmetrical. Since the zero crossing of vs(t) leads the zero crossing of is(t), the transistors
conduct after their respective antiparallel diodes. Note that, at any given time during the D1
conduction interval 0 < t< tα, transistor Q1 can be turned on without incurring switching
loss. The circuit naturally causes the transistor turn-on transition to be lossless, and long turn-
on switching times can be tolerated. A particularly signiﬁcant implication of this is that the
switching loss associated with reverse recovery of the antiparallel diodes is avoided. Relatively
slow diodes, such as the MOSFET body diodes, can be employed for realization of diodes D
1
to D4. In addition, the output capacitances of transistors Q1 to Q4 and diodes D1 to D4 do not
lead to switching loss.
In general, zero-voltage switching can occur when the resonant tank presents an e ﬀective
inductive load to the switches, and hence the switch voltage zero crossings occur before the
switch current zero crossings. In the bridge conﬁguration, zero-voltage switching is character-
ized by the half-bridge conduction sequence D1–Q1–D2–Q2, such that the transistors are turned
on while their respective antiparallel diodes conduct. Since the transistor voltage is zero during
the entire turn-on transition, switching loss due to slow turn-on times or due to energy storage
in any of the device capacitances does not occur at turn-on.
The transistor turn-oﬀtransition in Fig.22.28 is similar to that of a PWM switch. In convert-
ers that employ IGBTs or other minority-carrier devices, signiﬁcant switching loss may occur
at the turn-oﬀtransitions. The current tailing phenomenon causes Q
1 to pass through a period
of high instantaneous power dissipation, and switching loss occurs.
To assist the transistor turn-oﬀprocess, small capacitorsCleg may be introduced into the legs
of the bridge, as demonstrated in Fig. 22.29. In a converter employing MOSFETs, the device
output capacitances are suﬃcient for this purpose, with no need for external discrete capacitors.
A delay is also introduced into the gate drive signals, so that there is a short commutation inter-
val when all four transistors are oﬀ. During the normalQ1, D1, Q2, and D2 conduction intervals,
the leg capacitors appear in parallel with the semiconductor switches, and have no eﬀect on the
converter operation. However, these capacitors introduce commutation intervals at transistor
turn-oﬀ. When Q
1 is turned oﬀ, the tank current is(Ts/2) ﬂows through the switch capacitances
Cleg instead of Q1, and the voltage across Q1 and Cleg increases. Eventually, the voltage across
Q1 reaches Vg; diode D2 then becomes forward-biased. If the MOSFET turn-oﬀtime is suﬃ-
ciently fast, then the MOSFET is switched fully oﬀbefore the drain voltage rises signiﬁcantly
above zero, and negligible turn-oﬀswitching loss is incurred. The energy stored in the device
capacitances, that is, in Cleg, is transferred to the tank inductor. The fact that none of the semi-
conductor device capacitances or stored charges lead to switching loss is the major advantage
of zero-voltage switching, and is the most common motivation for its use. MOSFET converters
can typically be operated in this manner, using only the internal drain-to-source capacitances.
However, other devices such as IGBTs typically require substantial external capacitances to
reduce the losses incurred during the IGBT turn-oﬀtransitions.
An additional advantage of zero-voltage switching is the reduction of EMI associated with
device capacitances. In conventional PWM converters and also, to some extent, in zero-current
switching converters, signiﬁcant high-frequency ringing and current spikes are generated by the
rapid charging and discharging of the semiconductor device capacitances during the turn-on
and/or turn-oﬀtransitions.
Ringing is conspicuously absent from the waveforms of converters in which all semiconduc-
tor devices switch at zero voltage; these converters inherently do not generate this type of EMI.

956 22 Resonant Conversion
Ts
2
t
ids(t)
Conducting
devices:
t
Vg
vds1(t)
t
Q1
Q4
D1
D4
Q2
Q3
D2
D3
turn-on of
Q1, Q4
turn-off of
Q1, Q4
Fig. 22.28 Transistor Q1 voltage and current waveforms, for operation of the series resonant converter
above resonance in the k= 0 CCM
(a)
L
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
vs(t)
is(t)
+
vds1(t)
to remainder
of converter
Cleg
Cleg Cleg
Cleg
(b)
Conducting
devices:
t
Vg
vds1(t)
Q1
Q4
D2
D3
Turn off
Q1, Q4
Commutation
interval
X
Fig. 22.29 Introduction of small capacitorsCleg, which reduce the turn-oﬀ-transition switching loss when
the series resonant converter is operated above resonance: ( a) bridge circuit, ( b) transistor voltage wave-
form

22.4 Load-Dependent Properties of Resonant Converters 957
22.4 Load-Dependent Properties of Resonant Converters
The properties of the CCM PWM converters studied in previous chapters are largely unaﬀected
by the load current. In consequence, these converters exhibit several desirable properties that
are often taken for granted. The transistor current is proportional to the load current; hence con-
duction losses become small at light load, leading to good light-load eﬃciency. Also, the output
impedance is low, and hence the dc output voltage does not signiﬁcantly depend on the load
i−v characteristic (at least, in CCM). Unfortunately, these good properties are not necessarily
shared by resonant converters. Of central importance in design of a resonant converter is the
selection of the resonant tank topology and element values, so that the transistor conduction
losses at light load are minimized, so that zero-voltage switching is obtained over a wide range
of load currents (preferably, for all anticipated loads, but at least at full and intermediate load
powers), and so that the converter dynamic range is compatible with the loadi−v characteristic.
These design issues are addressed in this section.
The conduction loss caused by circulating tank currents is well-recognized as a problem in
resonant converter design. These currents are independent of, or only weakly dependent on, the
load current, and lead to poor eﬃciency at light load. In Fig. 22.30, the switch current i
s(s)i s
equal to vs(s)/Zi(s). If we want the switch current to track the load current, then at the switching
frequency||Zi|| should be dominated by, or at least strongly inﬂuenced by, the load resistanceR.
Unfortunately, this is often not consistent with the requirement for zero-voltage switching, in
which Zi is dominated by a tank inductor.
vs1(t)
Effective
resistive
load
R
is(t) i(t)
v(t)
+
Zi Zo
Transfer function
H(s)
+
Effective
sinusoidal
source Resonant
network
Purely reactive
Fig. 22.30 Resonant inverter model
To design a resonant converter that exhibits good properties, the engineer must develop
physical insight into how the load resistance R aﬀects the tank input impedance and output
voltage.
In this section, the inverter output characteristics, zero-voltage switching boundary, and the
dependence of transistor current on load resistance, are related to the properties of the tank net-
work under the extreme conditions of an open-circuited or short-circuited load. The undamped
tank network responses are easily plotted, and the insight needed to optimize the tank network
design can be gained quickly.

958 22 Resonant Conversion
22.4.1 Inverter Output Characteristics
Let us ﬁrst investigate how the magnitude of the inverter output voltage||v|| depends on the load
current magnitude||i||. Consider the resonant inverter system of Fig. 22.30.L e t H∞(s)b et h e
open-circuit (R→∞) transfer function of the tank network:
H∞(s)= v(s)
vs1(s)
⏐⏐⏐⏐
⏐
R→∞
(22.33)
and let Zo0(s) be the output impedance, determined when the source vs1(s) is short-circuited.
Then we can model the output port of the tank network using the Thevenin-equivalent circuit of
Fig. 22.31. Solution of this circuit using the voltage divider formula leads to
v(s)= H∞(s)vs1(s) R
R+ Zo0(s) (22.34)
At a given angular switching frequencyωs = 2πfs, the phasor representing the magnitude and
phase of the ac output voltage is found by letting s= jωs:
v( jωs)= H∞( jωs)vs1( jωs) R
R+ Zo0( jωs) (22.35)
The magnitude can be found by noting that
∥v( jωs)∥2= v( jωs)v∗( jωs) (22.36)
where v∗( jωs) is the complex conjugate of v( jωs). Substitution of Eq. (22.35) into Eq. (22.36)
leads to
+
Zo0
H vs1
Tank network
+
v R
i
Fig. 22.31 Thevenin-equivalent circuit that models the output port of the tank network
∥v( jωs)∥2=
⎦
H∞( jωs)vs1( jωs) R
R+ Zo0( jωs)
)⎦
H∞( jωs)vs1( jωs) R
R+ Zo0( jωs)
)∗
= H∞( jωs)H∗
∞( jωs)vs1( jωs)v∗
s1( jωs) R2
(R+ Zo0( jωs))( R+ Zo0( jωs))∗
=∥H∞( jωs)∥2∥vs1( jωs)∥2 R2
(R+ Zo0( jωs))( R+ Zo0( jωs))∗ (22.37)

22.4 Load-Dependent Properties of Resonant Converters 959
This result can be further simpliﬁed with the assumption that the tank network contains only
purely reactive elements, i.e., that any losses or other resistive elements within the tank network
have negligible eﬀect. Then the output impedance Zo0( jωs), as well as all other driving-point
impedances of the tank network, are purely imaginary quantities. This implies that the complex
conjugate Z
∗
o0( jωs)i sg i v e nb y
Z∗
o0( jωs)=−Zo0( jωs) (22.38)
Substitution of Eq. (22.38) into Eq. (22.37) and simpliﬁcation leads to
∥v( jωs)∥2=∥H∞( jωs)∥2∥vs( jωs)∥2
⎦
1+∥Zo0( jωs)∥2
R2
) (22.39)
with
R=||v( jωs)||
||i( jωs)|| (22.40)
Substitution of Eq. (22.40) into Eq. (22.39) and rearrangement of terms yields
∥v( jωs)∥2+∥i( jωs)∥2∥Zo0( jωs)∥2=∥H∞( jωs)∥2∥vs( jωs)∥2 (22.41)
Hence, at a given frequency, the inverter output characteristic, that is, the relationship between
||v( jωs)|| and||i( jωs)|| is elliptical. Equation (22.41) can be further rearranged, into the form
∥v( jωs)∥2
V2oc
+∥i( jωs)∥2
I2sc
= 1 (22.42)
where the open-circuit voltage Voc and short-circuit current Isc are given by
Voc =∥H∞( jωs)∥∥vs( jωs)∥
Isc=∥H∞( jωs)||∥vs( jωs)∥
||Zo0( jωs)∥ = Voc
∥Zo0( jωs)∥ (22.43)
|| i ||
|| v ||Voc
2
Matched load
R = || Zo0
||
Isc
2
Inverter output
characteristic
Voc = H vs
Isc = H vs
Zo0
Fig. 22.32 Elliptical output characteristics of resonant inverters. A resistive matched load is also illus-
trated

960 22 Resonant Conversion
These inverter output characteristics are constructed in Fig. 22.32. This characteristic describes
how, at a given switching frequency, the ac output voltage magnitude varies as the circuit is
loaded. The equilibrium output voltage is given by the intersection of this elliptical character-
istic with the load i−v characteristic. For example, Fig. 22.32 also illustrates a superimposed
resistive load line having slope 1/R, in the special case where R=||Zo0( jωs)||. This value of R
corresponds to matched-load operation, in which the converter output power is maximized. It
can be shown that the operating point is then given by
∥v( jωs)∥2= Voc
√
2
∥i( jωs)∥2= Isc
√
2
(22.44)
Note that Fig. 22.32 can also be applied to the output i−v characteristics of resonant dc–dc
converters, since the output rectiﬁer then loads the tank with an eﬀective resistive load Re.
22.4.2 Dependence of Transistor Current on Load
The transistors must conduct the current appearing at the input port of the tank network, is(t).
This current is determined by the tank network input impedance Zi( jωs):
is1( jωs)= vs1( jωs)
Zi( jωs) (22.45)
(a)
Cp
L
Zi
(b)
f
L
1
C
p
fm|| Zi0 ||
|| Zi ||
Fig. 22.33 Tank network, parallel resonant converter example: ( a) tank circuit, ( b) bode plot of input
impedance magnitude∥Zi∥ for the limiting cases R→0a n dR→∞

22.4 Load-Dependent Properties of Resonant Converters 961
As described previously, obtaining good light-load eﬃciency requires that ||Zi( jωs)|| increase
as the load resistance R increases. To understand how ||Zi( jωs)|| depends on R, let us sketch
||Zi( jωs)|| in the extreme cases of an open-circuited (R→∞) and short-circuited (R→0) load:
Zi0( jωs)= Zi( jωs)|R→0
Zi∞( jωs)= Zi( jωs)|R→∞ (22.46)
For example, consider the parallel resonant converter of Figs. 22.19, 22.20, 22.21, 22.22,
22.23. The Bode diagrams of the impedances ||Zi0( jωs)|| and∥Zi∞( jωs)|| are constructed in
Fig. 22.33. Zi0(s) is found with the load R shorted, and is equal to the inductor impedance
sL. Zi∞(s), found with the loadR open-circuited, is given by the series combination (sL+ 1/sC).
It can be seen in Fig. 22.33 that the impedance magnitudes||Zi0( jωs)|| and||Zi∞( jωs)|| intersect
at frequency fm. If the switching frequency is chosen such that fs < fm, then∥Zi∞( jωs)||>
∥Zi0( jωs)∥. The converter then exhibits the desirable characteristic that the no-load switch cur-
rent magnitude ∥vs( jωs)∥/||Zi∞( jωs)|| is smaller than the switch current under short-circuit
conditions,||vs( jωs)∥/∥Zi0( jωs)∥. In fact, the short-circuit switch current is limited by the
impedance of the tank inductor, while the open-circuit switch current is determined primarily
by the impedance of the tank capacitor.
If the switching frequency is chosen such that fs > fm, then||Zi∞( jωs)||<||Zi0( jωs)∥.T h e
no-load switch current is then greater in magnitude than the switch current when the load is
short-circuited! When the load current is reduced or removed, the transistors will continue to
conduct large currents and generate high conduction losses. This causes the eﬃciency at light
load to be poor. It can be concluded that, to obtain good light-load e ﬃciency in the parallel
resonant converter, one should choose fs suﬃciently less than fm. Unfortunately, this requires
operation below resonance, leading to reduced output voltage dynamic range and a tendency to
lose the zero-voltage switching property. Input impedances of the series, parallel, and LCC tank
circuits are sketched in Fig. 22.34.
A remaining question is how||Z
i( jωs)|| behaves for intermediate values of load between the
open-circuit and short-circuit conditions. The answer is given by Theorem22.1 below:||Zi( jωs)||
varies monotonically with R, and therefore is bounded by ∥Zi0( jωs)∥ and||Zi∞( jωs)∥. Hence,
the Bode plots of the limiting cases ||Zi0(iωs)∥ and∥Zi∞( jωs)∥ provide a correct qualitative
understanding of the behavior of||Zi|| for all R. The theorem is valid for lossless tank networks.
Theorem 22.1. If the tank network is purely reactive, then its input impedance ||Zi∥ is a mono-
tonic function of the load resistance R.
This theorem is proven by use of Middlebrook’s Extra Element Theorem (see Chap. 16).
The tank network input impedance Zi(s) can be expressed as a function of the load resistance R
and the tank network driving-point impedances, as follows:
Zi(s)= Zi0(s)
⎦
1+ R
Zo0(s)
)
⎦
1+ R
Zo∞(s)
)= Zi∞(s)
⎦
1+ Zo0(s)
R
)
⎦
1+ Zo∞(s)
R
) (22.47)
where Zi0 and Zi∞are the resonant network input impedances, with the load short-circuited or
open-circuited, respectively, andZo0 and Zo∞are the resonant network output impedances, with

962 22 Resonant Conversion
f
L
1
C
s
|| Zi0 ||
|| Zi ||
Series CsL
Zi Zo
f
L
1
C
p
fm|| Zi0 ||
|| Zi ||
Parallel
ZoCp
L
Zi
f
L
1
C
s
+ 1
C
p
1
C
s
fm
|| Zi ||
|| Zi0 ||
LCC
Zo
Cs
Cp
L
Zi
Fig. 22.34 Series, parallel, and LCC resonant tank networks, and their input impedances Zi0 and Zi∞
the source input short-circuited or open-circuited, respectively. These terminal impedances are
simple functions of the tank elements, and their Bode diagrams are easily constructed. The input
impedances of the series resonant, parallel resonant, and LCC inverters are listed in Fig. 22.34.
Since these impedances do not depend on the load, they are purely reactive, ideally have zero
real parts [330], and their complex conjugates are given byZ∗
o0=−Zo0, Z∗
o∞=−Zo∞, etc. Again,
recall that the magnitude of a complex impedance Z( jω) can be expressed as the square root of
Z( jω)Z∗( jω). Hence, the magnitude of Zi(s)i sg i v e nb y

22.4 Load-Dependent Properties of Resonant Converters 963
∥Zi∥2= ZiZ∗
i = Zi0(s)Z∗
i0(s)
⎦
1+ R
Zo0(s)
)⎦
1+ R
Z∗
o0(s)
)
⎦
1+ R
Zo∞(s)
)⎦
1+ R
Z∗o∞(s)
)
=∥Zi0∥2
⎦
1+ R2
||Zo0||2
)
⎦
1+ R2
||Zo∞||2
) (22.48)
where Z∗
i is the complex conjugate of Zi.
Next, let us diﬀerentiate Eq. (22.48) with respect to R:
d∥Zi∥2
dR = 2R∥Zi0∥2
⎦ 1
∥Zo0∥2 −1
||Zo∞∥2
)
⎦
1+ R2
∥Zo∞∥2
)2 (22.49)
The derivative has roots at ( i) R= 0, (ii) R=∞, and in the special case ( iii) where||Zi0∥=
||Zi∞||. Since the derivative is otherwise nonzero, the resonant network input impedance∥Zi∥ is
a monotonic function of R, over the range 0< R<∞. In special case (iii),||Zi|| is independent
of R. Therefore, Theorem 22.1 is proved.
An example is given in Figs. 22.36 and 22.35, for the LCC inverter. Figure22.35 illustrates
the impedance asymptotes of the limiting cases||Zi0|| and||Zi∞||. Variation of||Zi|| between these
limits, for ﬁnite nonzero R, is illustrated in Fig. 22.36. The open-circuit resonant frequency f∞
and the short-circuit resonant frequency f0 are given by
f0= 1
2π√LCs
f∞= 1
2π√LCs∥Cp
(22.50)
where Cs||Cp denotes inverse addition of Cs and Cp:
Cs∥Cp= 1
1
Cs
+ 1
Cp
(22.51)
For the LCC inverter, the impedance magnitudes ||Zi0|| and∥Zi∞∥ are equal at frequency fm,
given by
fm= 1
2π√LCs∥2Cp
(22.52)
If the switching frequency is chosen to be greater than fm, then||Zi∞|| is less than∥Zi0||.T h i s
implies that, as the load current is decreased, the transistor current will increase. Such a con-
verter will have poor eﬃciency at light load, and will exhibit signiﬁcant circulating currents. If
the switching frequency is chosen to be less than fm, then the transistor current will increase
with decrease with decreasing load current. The short-circuit current is limited by ||Zi0∥, while

964 22 Resonant Conversion
f
|| Zi ||
L
fm
1
C
s
+ 1
C
p
1
C
s
|| Zi0 ||
|| Zi ||
f0 = 1
2 LCs
f = 1
2 LCs||Cp
fm = 1
2 LCs||2C p
f0 f
Fig. 22.35 Construction of the quantities∥Zi0∥ and∥Zi∞∥, for the LCC inverter
the circulating currents under open-circuit conditions are determined by ||Zi∞||. In general, if
f> fm, then the transistor current is greater than or equal to the short-circuit current for all R.
The inequality is reversed when f< fm.
The impedance magnitudes||Zi0∥ and||Zi∞|| are illustrated in Fig. 22.34 for the series, paral-
lel, and LCC tank networks. In the case of the series tank network,∥Zi∞||=∞. In consequence,
the no-load transistor current is zero, both above resonance and below resonance. Hence, the
series resonant inverter exhibits the desirable property that the transistor current is proportional
to the load current. In addition, when the load is short-circuited, the current magnitude is limited
by the impedance of the series resonant tank. For the parallel and LCC inverters, it is desirable
to operate below the frequency f
m.
f
|| Zi || ff∀
increasing R
L
fm
1
C
s
+ 1
C
p
1
C
s
increasing R
Fig. 22.36 Variation of tank network input impedance∥Zi∥ with load resistance R,L C Ci n v e r t e r .A st h e
load resistance is increased,∥Zi∥ changes monotonically from∥Zi0∥ to∥Zi∞∥

22.4 Load-Dependent Properties of Resonant Converters 965
Thus, the dependence of the transistor current on load can be easily determined, using an
intuitive frequency-domain approach.
22.4.3 Dependence of the ZVS/ZCS Boundary on Load Resistance
It is also necessary to determine the critical load resistance R= Rcrit at the boundary between
ZVS and ZCS. This boundary can also be expressed as a function of the impedancesZi0 and Zi∞.
As discussed in Sect. 22.3, zero-voltage switching occurs when the switch current is(t) lags
the switch voltage vs(t). Zero-voltage switching occurs when is(t) leads vs(t). This deﬁnition
ignores the eﬀects of semiconductor output capacitances, and hence gives an approximate
ZVS/ZCS boundary. The phase between the switch current and switch voltage is again deter-
mined by the input impedance of the tank network:
is1( jωs)= vs1( jωs)
Zi( jωs) (22.53)
Hence, zero-voltage switching occurs when Zi( jωs) is inductive in nature, zero-current switch-
ing occurs when Zi( jωs) is capacitive in nature, and the ZVS /ZCS boundary occurs where
Zi( jωs) has zero phase.
It is instructive to again consider the limiting cases of a short-circuited and open-circuited
load. The Bode plots of Zi0( jωs) and Zi∞( jωs) for an LCC inverter example are sketched in
Fig. 22.37. Since, in these limiting cases, the input impedance Zi is composed only of the reac-
tive tank elements, Zi0( jωs) and Zi∞( jωs) are purely imaginary quantities having phase of either
−90◦or+90◦.F o r fs < f0, both Zi0( jωs) and Zi∞( jωs) are dominated by the tank capacitor
orcapacitors; the phase of Zi( jωs) is therefore−90◦. Hence, zero-current switching is obtained
under both short-circuit and open-circuit conditions. For fs > f∞, both Zi0( jωs) and Zi∞( jωs)
are dominated by the tank inductor; hence the phase of Zi( jωs)i s+90◦. Zero-voltage switching
f
|| Zi ||
L
f1
1
C
s
+ 1
C
p
1
C
s
|| Zi0 ||
|| Zi ||
f0 f
ZVS
for all R
ZCS
for all R
ZCS: R > Rcrit
ZVS: R < Rcrit
{
Zi
Zi0
fm
Fig. 22.37 Use of the input impedance quantities Zi0 and Zi∞to determine the ZCS/ZVS boundaries,
LCC example

966 22 Resonant Conversion
is obtained for both a short-circuited and an open-circuited load. For f0 < fs < f∞, Zi0( jωs)
is dominated by the tank inductor while Zi∞( jωs) is dominated by the tank capacitors. This
implies that zero-voltage switching is obtained under short-circuit conditions, and zero-voltage
switching is obtained under open-circuit conditions. For this case, there must be some critical
value of load resistance R= Rcrit that represents the boundary between ZVS and ZCS, and that
causes the phase of Zi( jωs) to be equal to 0◦.
The behavior of Zi( jωs) for nonzero ﬁnite R is easily extrapolated from the limiting cases
discussed above. Theorem 22.2 below shows that:
1. If zero-current switching occurs for both an open-circuited load and a short-circuited load
[i.e., Zi0( jωs) and Zi∞( jωs) both have phase+90◦], then zero-current switching occurs for
all loads.
2. If zero-voltage switching occurs for both an open-circuited load and a short-circuited load
[i.e., Zi0( jωs) and Zi∞( jωs) both have phase−90◦], then zero-voltage switching occurs for
all loads.
3. If zero-voltage switching occurs for an open-circuited load and zero-current switching oc-
curs for a short-circuited load [i.e., Zi0( jωs) has phase−90◦and Zi∞( jωs) has phase+90◦],
then zero-voltage switching occurs for R > Rcrit, and zero-current switching occurs for
R< Rcrit, with Rcrit given by Eq. (22.54) below.
4. If zero-current switching occurs for an open-circuited load and zero-voltage switching oc-
curs for a short-circuited load [i.e., Zi0( jωs) has phase+90◦and Zi∞( jωs) has phase−90◦],
then zero-current switching occurs for R > Rcrit, and zero-voltage switching occurs for
R< Rcrit, with Rcrit given by Eq. (22.54) below.
For the LCC example, we can therefore conclude that, for fs < f0, zero-current switching
occurs for all values of R.F o r fs > f∞, zero-voltage switching occurs for all values of R.F o r
f0< fs< f∞, the boundary between ZVS and ZCS is given by Eq. (22.54).
Theorem 22.2. If the tank network is purely reactive, then the boundary between zero-current
switching and zero-voltage switching occurs when the load resistance R is equal to the critical
value Rcrit, given by
Rcrit =∥Zo0∥
√
−Zi∞
Zi0
(22.54)
This theorem relies on the assumption that zero-current switching occurs when the tank in-
put impedance is capacitive in nature, while zero-voltage switching occurs for inductive-input
impedances. The boundary therefore occurs where the phase of Zi( jω) is zero. This deﬁnition
gives a necessary but not suﬃcient condition for zero-voltage switching when signiﬁcant semi-
conductor output capacitance is present.
The result is derived by ﬁnding the value of R which causes the imaginary part of Zi( jω)i n
Eq. (22.47) to be zero. Since the tank network is assumed to ideal and lossless, the impedances
Zo∞, Zo0, and Zi∞must have zero real parts. Hence,
Im(Zi(Rcrit))= Im(Zi∞)Re
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1+ Zo0
Rcrit
1+ Zo∞
Rcrit
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
= Im(Zi∞)
⎛⎜⎜⎜⎜⎝1−Zo0Zo∞
R2
crit
⎞⎟⎟⎟⎟⎠
⎛⎜⎜⎜⎜⎝1+∥Zo∞∥2
R2
crit
⎞⎟⎟⎟⎟⎠
= 0 (22.55)

22.4 Load-Dependent Properties of Resonant Converters 967
where Im(Z) and Re( Z) denote the imaginary and real parts of the complex quantity Z.T h e
nontrivial solution to Eq. (22.55)i sg i v e nb y
1= Zo0Zo∞
R2
crit
(22.56)
hence,
Rcrit =
√
Zo0Zo∞ (22.57)
A useful equivalent form makes use of the reciprocity identities
Zo0
Zo∞
= Zi0
Zi∞
(22.58)
Use of Eq. (22.58) to eliminate Zo∞from Eq. (22.57) leads to
Rcrit =∥Zo0∥
√
−Zi∞
Zi0
(22.59)
This is the desired result. The quantity Zo0 is the inverter output impedance, and R=||Zo0||
corresponds to operation at matched load with maximum output power. The impedances Zi∞
and Zi0 are purely imaginary, and hence Eq. ( 22.59) has no real solution unless Zi∞and Zi0
are of opposite phase. As illustrated in Fig. 22.37, if at a given frequency Zi∞and Zi0 are both
inductive, then zero-voltage switching occurs for all loads. Zero-current switching occurs for
all loads when Zi∞and Zi0 are both capacitive. Therefore, Theorem 22.2 is proved.
Figure 22.38a illustrates the phase response of Zi( jω)a s R varies from 0 to∞, for the LCC
inverter. A typical dependence of Rcrit and the matched-load impedance ∥Zo0|| on frequency
is illustrated in Fig. 22.38b. Zero-voltage switching occurs for all loads when f > f∞, and
zero-current switching occurs for all loads when f < f0. Over the range f0 < f < f∞, Zi0 is
inductive while Zi∞is capacitive; hence, zero-voltage switching occurs forR< Rcrit while zero-
current switching occurs for R> Rcrit. At frequency fm, Rcrit =∥Zo0||, and hence the ZVS/ZCS
boundary is encountered exactly at matched load. It is commonly desired to obtain zero-voltage
switching at matched load, with low circulating currents and good eﬃciency at light load. It is
apparent that this requires operation in the range f0< f< fm. Zero-voltage switching will then
be obtained under matched-load and short-circuit conditions, but will be lost at light load. The
choice of element values such that ||Zi0∥≪|| Zi∞|| is advantageous in that the range of loads
leading to zero-voltage switching is maximized.
22.4.4 Another Example
As another example, let us consider selection of the resonant tank elements to obtain a given
output characteristic at a certain switching frequency, and let us evaluate the eﬀect of this choice
on Rcrit. It is desired to operate a resonant inverter at switching frequencyfs= 100 kHz, with an
input voltage of Vg= 160 V . The converter should be capable of producing an open-circuit peak
output voltage Voc= 400 V, and should also produce a nominal output of 150 Vrms at 25 W. It
is desired to select resonant tank elements that accomplish this.

968 22 Resonant Conversion
(a)
-90
-60
-30
0
30
60
90
ff0
R = 
R = 0
increasing R
f
Zi
(b)
Rcrit
||Zo0
||
f0 f∞fm
ZCS
ZVS
R
f
Fig. 22.38 ZCS/ZVS boundary, LCC inverter example: ( a) variation of tank network input impedance
phase shift with load resistance, (b) comparison of Rcrit with matched-load impedance∥Zo0∥

22.4 Load-Dependent Properties of Resonant Converters 969
The speciﬁcations imply that the converter should exhibit an open-circuit transfer function
of
∥H∞( jωs)∥= Voc
Vs1
= (400 V)⎦4
π160 V
)= 1.96 (22.60)
The required short-circuit current is found by solving Eq. (22.42)f o rIsc:
Isc= I√
1−
⎦V
Voc
)2
(22.61)
The speciﬁcations also imply that the peak voltage and current at the nominal operating point
are
V= 150
√
2= 212V
I= P
Vrms
√
2= 25W
150V
√
2= 0.236A (22.62)
Rnom= V
I = 900Ω
Substitution of Eq. (22.62) into Eq. (22.61) yields
Isc= (0.236A)√
1−
⎦212V
400V
)2
= 0.278A (22.63)
Matched load therefore occurs at the operating point
Vmat= Voc
√
2
= 283V
Imat= Isc
√
2
= 0.196A (22.64)
∥Zo0( jωs)∥= Voc
Isc
= 1439Ω
Let us select the values of the tank elements in the LCC tank network illustrated in
Fig. 22.39a. The impedances of the series and parallel branches can be represented using the
reactances Xs and Xp illustrated in Fig. 22.39b, with
jXs= jωsL+ 1
jωsCs
= j
⎦
ωsL−1
ωsCs
)
jXp= 1
jωsCp
= j
⎦
−1
ωsCp
)
(22.65)

970 22 Resonant Conversion
(a) LC s
Cp
(b) jXs
jXp
Fig. 22.39 Tank network of the LCC inverter example: ( a) schematic, ( b) representation of series and
parallel branches by reactances Xs and Xp
The transfer function H∞( jωs) is given by the voltage divider formula
H∞( jωs)= jXp
jXs+ jXp
(22.66)
The output impedance Zo0( jωs) is given by the parallel combination
Zo0( jωs)= jXs∥ jXp= −XsXp
j(Xs+ Xp) (22.67)
Solution of Eqs. (22.66) and (22.67)f o rXp and Xs leads to
jXp= Zo0( jωs)
1−H∞( jωs) (22.68)
Xs= Xp
1−H∞( jωs)
H∞( jωs)
Hence, the capacitance Cp should be chosen equal to
Xp =−1499Ω
Cp=−1
ωsXp
= H∞( jωs)−1
ωs||Zo0( jωs)∥= (1.96)−1
(2π100kHz)( 1439Ω)/simequal1nF (22.69)
and the reactance of the series branch should be chosen according to
Xs= Xp
1−H∞( jωs)
H∞( jωs) = (−1493Ω) 1−(1.96)
(1.96) = 733Ω (22.70)

22.4 Load-Dependent Properties of Resonant Converters 971
Since Xs is comprised of the series combination of the inductor L and capacitor Cs, there is a
degree of freedom in choosing the values of L and capacitor Cs to realize Xs. For example, we
could choose Cs very large (tending to a short circuit); this eﬀectively would result in a parallel
resonant converter with L= Xs/ωs= 1.17mH. For nonzero Cs, L must be chosen according to
L= 1
ωs
⎦
Xs+ 1
ωsCs
)
(22.71)
For example, the choice Cs = Cp = 1.06 nF leads to L= 3.5 mH. Designs using diﬀerent Cs
will exhibit exactly the same characteristics at the design frequency; however, the behavior at
other switching frequencies will diﬀer.
For the tank network illustrated in Fig.22.39,t h ev a l u eo fRcrit is completely determined by
the parameters of the output characteristic ellipse; i.e., by the speciﬁcation of Vg, Voc, and Isc.
Note that Zo∞, the tank output impedance with the tank input port open-circuited, is equal tojXp.
Substitution of expressions for Zo∞and Zo0 into Eq. (22.57) leads to the following expression
for Rcrit:
Rcrit =
√
Z2
o0( jωs)
1−H∞( jωs) (22.72)
Since Zo0 and H∞are determined by the operating point speciﬁcations, then Rcrit is also. Eval-
uation of Eq. ( 22.72) for this example leads to Rcrit = 1466Ω. Therefore, the inverter will
operate with zero-voltage switching for R< 1466Ω, including at the nominal operating point
R = 900Ω. Other topologies of tank network, more complex than the circuit illustrated in
Fig. 22.39b, may have additional degrees of freedom that allow Rcrit to be independently cho-
sen.
The choice Cs = 3Cp = 3.2 nF leads to L = 1.96 μH. The following frequencies are
obtained:
f∞= 127kHz
fm = 100.6kHz
fs= 100.0kHz
f0 = 64kHz (22.73)
Regardless of how Cs is chosen, the open-circuit tank input impedance is
Zi∞= j
⎦
Xs+ Xp
)
= j (733Ω+(−1493Ω))=−j760Ω (22.74)
Therefore, when the load is open-circuited, the transistor peak current has magnitude
Is1= Vs1
∥Zi∞∥=
4
π(160V)
760Ω= 0.268A (22.75)
When the load is short-circuited, the transistor peak current has magnitude
Is1= Vs1
∥Zi0∥= Vs1
|Xs|=
4
π(160V)
(733Ω) = 0.278A (22.76)
which is nearly the same as the result in Eq. ( 22.75). The somewhat large open-circuit switch
current occurs because of the relatively high speciﬁed open-circuit output voltage; lower values
of Voc would reduce the result in Eq. (22.75).

972 22 Resonant Conversion
22.4.5 LLC Example
A transformer-isolated dc–dc converter based on theLLC tank network is illustrated in Fig.22.40.
This converter ﬁnds application in oﬀ-line dc power supplies, including charger adapters for
laptop computers. Tank capacitorC also functions as a dc blocking capacitor that ensures trans-
former volt-second balance. Tank inductors Ls and Lp can partly or wholly be implemented
using the transformer leakage and magnetizing inductances. When the converter is properly
designed, the transistors can operate with zero-voltage switching.
Fig. 22.40 A transformer-isolated dc–dc converter based on the LLC resonant tank circuit
The tank input impedances Zi0 (with load shorted) and Zi∞(with load open-circuited) are
illustrated in Fig. 22.41. Under short-circuit conditions, the tank resonant frequency is
f0= 1
2π√LsC
(22.77)
Under open-circuit conditions, the tank resonant frequency is
f∞= 1
2π√(Ls+ Lp)C
(22.78)
In each case, the tank input impedance Zi is a series resonant circuit, with the short-circuit reso-
nant frequency being higher than the open-circuit resonant frequency. The tank input impedance
∥ Zi∥ is constructed in Fig. 22.42.
At low switching frequency fs < f∞, the transistors operate with zero-current switching
for all loads. At high switching frequency fs > f0, the transistors operate with zero-voltage
switching for all loads. Over the intermediate frequency range f∞< fs < f0, the transistors
operate with zero-voltage switching at light load R> Rcrit, and with zero-current switching at
heavy load R< Rcrit. The critical resistance Rcrit can be shown to be
Rcrit = Ro0
nF√
1+ n
√
1−F2
1+ n
F2−1 (22.79)
```
