---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第15章part 1 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 589-608 > Chunk ID: `chapter-15-part-1`"
---

# 第15章part 1 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 589-608  
> Chunk ID: `chapter-15-part-1`

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
15
AC and DC Equivalent Circuit Modeling of the
Discontinuous Conduction Mode
So far, we have derived equivalent circuit models for dc–dc pulse-width modulation (PWM)
converters operating in the continuous conduction mode. As illustrated in Fig. 15.1, the basic
dc conversion property is modeled by an eﬀective dc transformer, having a turns ratio equal to
the conversion ratio M(D). This model predicts that the converter has a voltage-source output
characteristic, such that the output voltage is essentially independent of the load current or
load resistance R. We have also seen how to reﬁne this model, to predict losses and eﬃciency,
converter dynamics, and small-signal ac transfer functions. We found that the transfer functions
of the buck converter contain two low-frequency poles, owing to the converter ﬁlter inductor
and capacitor. The control-to-output transfer functions of the boost and buck–boost converters
additionally contain a right half-plane zero. Finally, we have seen how to utilize these results in
the design of converter control systems.
What are the basic dc and small-signal ac equivalent circuits of converters operating in the
discontinuous conduction mode (DCM)? It was found in Chap. 5 that, in DCM, the output volt-
age becomes load-dependent: the conversion ratio M(D, K) is a function of the dimensionless
parameter K= 2L/RTs, which in turn is a function of the load resistance R. So the converter
no longer has a voltage-source output characteristic, and hence the dc transformer model is less
appropriate.
In Sect. 15.1, a buck–boost DCM converter example is used to introduce DCM converter ac
waveforms and averaged dynamics. It is shown that the moving average of the inductor voltage
waveform is zero or approximately zero at all times, which is why, in practice, high-frequency
inductor dynamics can usually be neglected in DCM, and DCM converters exhibit simpler,
reduced-order dynamic responses compared to operation in the continuous conduction mode.
Based on the approximation that the moving average of the inductor voltage waveform is
zero at all times, the averaged switch modeling approach [ 70–74, 126, 130, 131]i se m p l o y e d
in Sect. 15.2 to derive equivalent circuits of the DCM switch network. It is shown that the loss-
free resistor model [132–134] is the averaged switch model of the DCM switch network. This
equivalent circuit represents the steady-state and large-signal dynamic characteristics of the
DCM switch network, in a clear and simple manner. In the discontinuous conduction mode, the
average transistor voltage and current obey Ohm’s law, and hence the transistor is modeled by an
eﬀective resistor Re. The average diode voltage and current obey a power source characteristic,
with power equal to the power eﬀectively dissipated in Re. Therefore, the diode is modeled with
a dependent power source.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_15
585

586 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
DC
CCM
DCM
+
1 : M(D)
Vg R
+
V
+Vg R
+
V
+
+ 1 : M(D) Le
C R
+
AC
+ R
+
??
vg(s)( s)
e(s)d(s)
j(s)d(s)
vˆ vˆ
vˆˆ
ˆ
ˆ
g(s)( s)
Fig. 15.1 The objective of this chapter is the derivation of large-signal dc and small-signal ac equivalent
circuit models for converters operating in the discontinuous conduction mode
Section 15.4 addresses simulation models for converters that may operate in CCM or DCM.
An average switch model that automatically switches between modes is derived, and this model
is implemented in SPICE.
Since most converters operate in discontinuous conduction mode at some operating points,
small-signal ac DCM models are needed, to prove that the control systems of such converters are
correctly designed. In Sect. 15.3, a small-signal model of the DCM switch network is derived
by linearization of the loss-free resistor model. The transfer functions of DCM converters are
quite diﬀerent from their respective CCM transfer functions. The basic DCM buck, boost, and
buck–boost converters essentially exhibit simple single-pole transfer functions [15, 135], while
high-frequency dynamics can usually be neglected. So the basic converters operating in DCM
are easy to control; for this reason, converters are sometimes purposely operated in DCM for
all loads. The transfer functions of higher-order converters such as the DCM ´Cuk or SEPIC
are considerably more complicated; but again, one pole is shifted to high frequency, where
it has negligible practical eﬀect. This chapter concludes, in Sect. 15.5, with a discussion of
high-frequency dynamics of DCM converters. The more detailed analysis predicts that the high-
frequency dynamics of DCM converters are related to the sampling process associated with
the pulse-width modulator, and the nature of the response of the inductor current to duty-cycle
perturbations [136]. This behavior can be modeled by an e ﬀective pole in the vicinity of the
switching frequency.
15.1 Introduction to DCM Converter Dynamics
Consider the buck–boost converter of Fig. 15.2. The transistor switch duty cycle is modulated
by a sinusoidal PWM input signal,
vc(t)= Vc+ Vm sinωmt (15.1)

15.1 Introduction to DCM Converter Dynamics 587
Pulse-width
modulator
Gate
driver
+
-
+
-
v(t) RCvg(t)
vc(t)
vL(t)
iL(t)
L
Fig. 15.2 Buck–boost converter example. The transistor switch duty cycle is modulated by the PWM
input signal vc(t)
where the modulation frequency fm =ωm/(2π) is much smaller than the converter switching
frequency fs. Figure 15.3 shows the converter switching and averaged waveforms over a modu-
lation period. In this example, the inductor current ripple is so large that the converter operates
in DCM at all times. As shown in Fig. 15.3b, inductor current waveform iL(t) consists of trian-
gular pulses that start from zero and end at zero within a switching period. As expected, the
moving average of the inductor current,⟨iL(t)⟩Ts , retains low-frequency dynamics of the induc-
tor current, including a dc component and an ac component in response to the sinusoidally
modulated transistor duty cycle. Similarly, the moving average of the output voltage, ⟨v(t)⟩
Ts
includes a dc component V, and an ac variation resulting from the sinusoidally modulated duty
cycle, while the switching ripple in v(t) is removed, as shown in Fig. 15.3c. It is of particular
interest to examine the inductor voltage switching and averaged waveforms shown in Fig.15.3d.
The switching waveform vL(t) is a pulsating waveform that follows the DCM pattern described
in Chap. 5,
vL(t)=
⎧⎪⎪⎪⎨⎪⎪⎪⎩
vg(t) during d1Ts when transistor is on and diode is oﬀ
v(t) during d2Ts when transistor is oﬀand diode is on
0 during d3Ts when both transistor and diode are oﬀ
(15.2)
where d1 is the transistor switch duty cycle and d1+ d2+ d3= 1.
One may observe that the moving average⟨v(t)⟩Ts is either equal to zero or is close to zero
at all times. To explain the DCM inductor dynamics, consider the inductor current and the
averaged inductor voltage waveforms shown in Fig.15.4 over a couple of switching periods. As
a result of duty-cycle modulation, the transistor duty cycle in the second period is Δd longer
than the duty cycle d
1 in the ﬁrst period. For an averaging interval centered around time t,t h e
moving average of vL(t) can be found as
⟨vL(t)⟩Ts = 1
Ts
∫ t+Ts/2
t−Ts/2
vL(τ)dτ= L
Ts
(iL(t+ Ts/2)−iL(t−Ts/2)) (15.3)
For the example shown in Fig.15.4,
iL(t−Ts/2)= iL(t+ Ts/2)= 0 (15.4)

588 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
10 20
0.5
1
10
5
0
-23
-22
-21
-10
-20
10
0
10 20
10 20
t
Ts
t
Ts
t
Ts
t
Ts
iL(t)
iL(t) Ts
v(t)
v(t) Ts
vL(t) Ts
vL(t)
0
(a)
(b)
(c)
(d)
Gate drive
vc(t)
Fig. 15.3 Switching and averaged waveforms in the buck–boost converter of Fig. 15.2. In this example,
the converter parameters are Vg= 10 V ,L= 5μH, C= 22μF, fs = 1/Ts = 100 kHz, R= 30Ω,P W Mg a i n
1/VM = 1V−1, vc(t)= 0.4+ 0.1 sin(ωmt), modulation frequency fm = fs/20= 5k H z
and hence
⟨vL(t)⟩Ts = 0 (15.5)
It follows from Eq. ( 15.3) that⟨vL(t)⟩Ts = 0 whenever iL(t+ Ts/2)= iL(t−Ts/2), which is
always the case over portions of a switching period in DCM—even when the converter is not
in equilibrium. In the examples of Figs.15.3 or 15.4,⟨v
L(t)⟩Ts /nequal0 only during time intervals of
length d2Ts and only when duty cycle varies between successive switching periods. Referring to
Fig. 15.3d, the nonzero pulses in⟨vL(t)⟩Ts /nequal0 clearly contain a small low-frequency component
in response to the duty-cycle modulation. However, as discussed further in Sect. 15.5,t h er e l a -
tively short, relatively low amplitude nonzero pulses in⟨vL(t)⟩Ts , which are related to sampling
eﬀects and high-frequency dynamics, do not aﬀect the dominant, low-frequency DCM dynam-
ics signiﬁcantly. In conclusion, in DCM, we can simply assume that the inductor volt-seconds
balance holds not only in equilibrium but at all times:
⟨vL(t)⟩Ts = 1
Ts
∫ t+Ts/2
t−Ts/2
vL(τ)dτ≈0 (15.6)

15.2 DCM Averaged Switch Model 589
vL(t) Ts
iL(t)
d1Ts d1Tsd2Ts d3Ts
(n + 1)TsnTs(n− 1)Ts
t − Ts/2 t + Ts/2Time t
Dd
Averaging interval
Fig. 15.4 DCM inductor current iL(t) and the moving average⟨vL(t)⟩Ts of the inductor voltage
In the next section, following the averaged switch modeling approach, the approximation given
by Eq. (15.6) is used to derive dc and ac models of DCM converters.
15.2 DCM Averaged Switch Model
Consider the buck–boost converter of Fig. 15.5. Let us follow the averaged switch model-
ing approach of Sect. 14.1, to derive an equivalent circuit that models the averaged terminal
waveforms of the switch network. The general two-switch network and its terminal quantities
v1(t), i1(t), v2(t), and i2(t) are deﬁned as illustrated in Fig. 15.5, consistent with Fig. 14.4a. The
inductor and switch network voltage and current waveforms are illustrated in Fig.15.6,f o rD C M
operation.
During the subinterval d1Ts, while the transistor conducts, the inductor current increases
from zero with a slope ofvg(t)/L. At the end of this subinterval, the inductor currentiL(t) attains
the peak value given by
ipk= vg
L d1Ts (15.7)
+
L
CR
+
vvg
iL
+
vL
Switch network
+
v1 v2
+
i1 i2
Fig. 15.5 Buck–boost converter example, with switch network terminal quantities identiﬁed

590 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
Averaging interval
t
t
t
t
t
tt t + Ts/2t − Ts/2
iL(t )
vL(t )
i1(t )
v1(t )
i2(t )
v2(t )
vg
L
v
L
ipk
ipk
ipk
0
0
0
d1Ts d2Ts d3Ts
vg
v
Area q1
Area q2
i1(t) Ts
v1(t) Ts
i2(t) Ts
v2(t) Ts
vg − v
vgvg
vg − v
− v − v
0
0
0
Fig. 15.6 Inductor and switch network voltage and current waveforms
During the next subinterval, while the diode conducts, the inductor current decreases with a
slope equal to v(t)/L. This subinterval ends when the inductor current drops to zero and the
diode becomes reverse-biased. The length of this subinterval is d2Ts. The inductor current and
the inductor voltage then remain zero for the balance d3Ts of the switching period.
A DCM averaged switch model can be derived with reference to the waveforms of Fig.15.6.
The averaging interval of length Ts, centered around time t is highlighted.

15.2 DCM Averaged Switch Model 591
Following the approach of Sect. 14.1.2, let us ﬁnd the average values of the switch network
terminal waveforms v1(t), v2(t), i1(t), and i2(t) in terms of the converter state variables (inductor
currents and capacitor voltages), the input voltage vg(t), and the subinterval lengths d1 and d2.
To ﬁnd the average switch network input voltage⟨v1(t)⟩Ts , or the average transistor voltage,
it is convenient to start from a converter voltage loop equation
v1= vg−vL (15.8)
Averaging applied to Eq. (15.8) yields
⟨v1⟩Ts =⟨vg⟩Ts
−⟨vL⟩Ts (15.9)
Taking the approximation Eq. (15.6) into account, we have
⟨v1⟩Ts =⟨vg⟩Ts
(15.10)
For the averaging interval shown in Fig.15.6, one may note that⟨vL⟩Ts = 0 exactly.
Similar analysis, based on the voltage loop equation v2 = vL−v, leads to the following
expression for the average diode voltage:
⟨v2⟩Ts =⟨−v⟩Ts (15.11)
The average switch network input current⟨i1(t)⟩Ts is found by integrating thei1(t) waveform
of Fig. 15.6 over one switching period:
⟨i1(t)⟩Ts = 1
Ts
t+Ts/2∫
t−Ts/2
i1(t)dt= q1
Ts
(15.12)
The integral q1 is equal to the area under the i1(t) waveform during the ﬁrst subinterval. This
area is easily evaluated using the triangle area formula:
q1=
t+Ts/2∫
t−Ts/2
i1(t)dt= 1
2(d1Ts)(ipk) (15.13)
Substitution of Eqs. (15.7), (15.13), and (15.10) into Eq. (15.12)g i v e s
⟨i1(t)⟩Ts = d2
1Ts
2L ⟨vg(t)⟩Ts = d2
1Ts
2L ⟨v1(t)⟩Ts (15.14)
Note that⟨i1(t)⟩TS is not equal to d1⟨iL(t)⟩TS . Since the inductor current ripple is not small, it is
necessary to sketch the actual input current waveform, including the large switching ripple, and
then correctly compute the average as in Eqs. (15.12)t o( 15.14).
The average diode current ⟨i2(t)⟩TS is found in a manner similar to that used above for
⟨i1(t)⟩TS :
⟨i2(t)⟩Ts = 1
Ts
t+Ts/2∫
t−Ts/2
i2(t)dt= q2
Ts
(15.15)

592 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
The integral q2 is equal to the area under the i2(t) waveform during the d2Ts subinterval. This
area is evaluated using the triangle area formula:
q2=
t+Ts/2∫
t−Ts/2
i2(t)dt= 1
2(d2Ts)(ipk) (15.16)
Substitution of Eqs. (15.7), (15.16), and (15.10) into Eq. (15.15) leads to:
⟨i2(t)⟩TS = d1d2Ts
2L ⟨vg(t)⟩Ts = d1d2Ts
2L ⟨v1(t)⟩Ts (15.17)
Equations (15.10), (15.11), (15.14), and (15.17) constitute the averaged terminal equations of
the switch network in the DCM buck–boost converter. In these equations, it remains to express
the subinterval length d
2 in terms of the switch duty cycle d1 = d, and the converter averaged
waveforms. Considering the averaging interval shown in Fig. 15.6, we note that iL(t−Ts/2)=
iL(t+Ts/2)= 0. There is no net change in inductor current, and no net volt-seconds are applied to
the inductor over this averaging interval. In other words, the average inductor voltage computed
over the averaging interval shown in Fig.15.6 is zero,
⟨vL(t)⟩Ts = d1⟨vg(t)⟩TS + d2⟨v(t)⟩Ts = 0 (15.18)
Based on the approximation given by Eq. ( 15.5) we conclude that Eq. ( 15.18) can be used to
ﬁnd the length of the d2Ts subinterval in general, even when the converter is not in equilibrium:
d2(t)=−d1(t)⟨vg(t)⟩TS
⟨v(t)⟩Ts
(15.19)
Substitution of Eq. (15.19) into Eqs. (15.14) and (15.17) allows us to obtain simple expressions
for the averaged terminal waveforms of the switch network in the discontinuous conduction
mode:
⟨i1(t)⟩Ts = d2
1Ts
2L ⟨v1(t)⟩Ts (15.20)
⟨i2(t)⟩Ts = d2
1Ts
2L
⟨v1(t)⟩2
Ts
⟨v2(t)⟩Ts
(15.21)
Let us next construct an equivalent circuit corresponding to the averaged switch network
equations (15.20) and (15.21). The switch network input port is modeled by Eq. ( 15.20). This
equation states that the average input current⟨i1(t)⟩Ts is proportional to the applied input voltage
⟨v1(t)⟩Ts . In other words, the low-frequency components of the switch network input port obey
Ohm’s law:
⟨i1(t)⟩Ts =⟨v1(t)⟩Ts
Re(d1) (15.22)
where the eﬀective resistance Re is
Re(d1)= 2L
d2
1Ts
(15.23)

15.2 DCM Averaged Switch Model 593
Fig. 15.7 Equivalent circuit that models the average wave-
forms of the switch input (transistor) port
An equivalent circuit is illustrated in Fig. 15.7. During the d1Ts subinterval, the slope of the in-
put current waveform i1(t) is proportional to the input voltage⟨vg(t)⟩Ts =⟨v1(t)⟩Ts , as illustrated
in Fig. 15.6. As a result, the peak current ipk, the total charge q1, and the average input current
⟨i1(t)⟩Ts , are also proportional to⟨v1(t)⟩Ts . Of course, there is no physical resistor inside the con-
verter. Indeed, if the converter elements are ideal, then no heat is generated inside the converter.
Rather, the power apparently consumed by Re is transferred to the switch network output port.
The switch network output (diode) port is modeled by Eq. (15.21), or
⟨i2(t)⟩Ts⟨v2(t)⟩Ts =
⟨v1(t)⟩2
Ts
Re(d1) =⟨p(t)⟩Ts (15.24)
Note that⟨v1(t)⟩2
Ts
/Re is the average power⟨p(t)⟩Ts apparently consumed by the eﬀective resis-
tor Re(d1). Equation (15.24) states that this power ﬂows out of the switch network output port.
So the switch network consumes no net power—its average input and output powers are equal.
Equation (15.24) can also be derived by consideration of the inductor stored energy. During
the ﬁrst subinterval, the inductor current increases from 0 to ipk. In the process, the inductor
stores the following energy:
1
2Li2
pk=
⟨v1⟩2
Ts
d2
1T2
s
2L =
⟨v1⟩2
Ts
Re(d1)Ts (15.25)
Here, ipk has been expressed in terms of ⟨v1(t)⟩Ts using Eqs. ( 15.7) and ( 15.10). This energy
is transferred from the source vg, through the switch network input terminals (i.e., through the
transistor), to the inductor. During the second subinterval, the inductor releases all of its stored
energy through the switch network output terminals (i.e., through the diode), to the output. The
average output power can therefore be expressed as the energy transferred per cycle, divided by
the switching period:
⟨p(t)⟩
Ts =
⎛⎜⎜⎜⎜⎜⎝
⟨v1⟩2
Ts
Re(d1)Ts
⎞⎟⎟⎟⎟⎟⎠
⎦1
Ts
)
=
⟨v1⟩2
Ts
Re(d1) (15.26)
This power is transferred to the load, and hence
⟨v⟩Ts⟨i2⟩Ts =⟨v2⟩Ts⟨i2⟩Ts =⟨p(t)⟩Ts =
⟨v1⟩2
Ts
Re(d1) (15.27)
This result coincides with Eq. (15.24).
The average power ⟨p(t)⟩Ts is independent of the load characteristics, and is determined
solely by the eﬀective resistance Re and the applied switch network input terminal voltage or
current. In other words, the switch network output port behaves as a source of power, equal

594 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
(a)
p(t)
+
v(t)
i(t)
(b)
v(t)i(t)= p(t)
v(t)
i(t)
Fig. 15.8 The dependent power source: (a) schematic symbol, (b) i–v characteristic
(a)
p(t)
+
v(t)
–
i(t)
(b)
v(t)i(t)= – p(t)
v(t)
i(t)
Fig. 15.9 The dependent power sink: (a) schematic symbol, (b) i–v characteristic
to the power apparently consumed by the eﬀective resistance Re. This behavior is represented
schematically by the dependent power source symbol illustrated in Fig. 15.8. In any lossless
two-port network, when the voltage and current at one port are independent of the character-
istics of the external network connected to the second port, then the second port must exhibit
a dependent power source characteristic [ 133]. This situation arises in a number of common
power-processing applications, including switch networks operating in the discontinuous con-
duction mode.
The power source characteristic illustrated in Fig. 15.8b is symmetrical with respect to volt-
age and current; in consequence, the power source exhibits several unique properties. Similar to
the voltage source, the ideal power source must not be short-circuited; otherwise, inﬁnite current
occurs. And similar to the current source, the ideal power source must not be open-circuited, to
avoid inﬁnite terminal voltage. The power source must be connected to a load capable of ab-
sorbing the power p(t), and the operating point is deﬁned by the intersection of the load and
power source i–v characteristics.
We can deﬁne a power sink element similarly, with reversal of the direction of power ﬂow.
The schematic symbol for this element is illustrated in Fig. 15.9, with its i–v characteristic.

15.2 DCM Averaged Switch Model 595
(a)
P1
P2 P3
P1 + P2 + P3
(b)
P1P1
n1 : n2
Fig. 15.10 Circuit manipulations of power source elements: ( a) combination of series- and parallel-
connected power sources into a single equivalent power source, ( b) invariance of the power source to
reﬂection through an ideal transformer of arbitrary turns ratio
As illustrated in Fig. 15.10a, series-and parallel-connected power sources can be combined
into a single power source, equal to the sum of the powers of the individual sources. Fig-
ure 15.10b illustrates how reﬂection of a power source through a transformer, having an arbi-
trary turns ratio, leaves the power source unchanged. Power sources are also invariant to duality
transformations.
The averaged large-signal model of the general two-switch network in DCM is illustrated
in Fig. 15.11b. The input port behaves e ﬀectively as resistance Re. The instantaneous power
apparently consumed by Re is transferred to the output port, and the output port behaves as a
dependent power source. This lossless two-port network is called the loss-free resistor model
(LFR) [132]. The loss-free resistor represents the basic power conversion properties of DCM
switch networks [ 134]. It can be shown that the loss-free resistor models the averaged prop-
erties of DCM switch networks not only in the buck–boost converter, but also in other PWM
converters.
When the switch network of the DCM buck–boost converter is replaced by the averaged
model of Fig. 15.11b, the converter equivalent circuit of Fig.15.12 is obtained. Upon setting all
averaged waveforms to their quiescent values, and letting the inductor and capacitor become a
short-circuit and an open-circuit, respectively, we obtain the dc model of Fig.15.13.

596 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
(a)
+
v2(t)
+
v1(t)
i1(t) i2(t)
(b) i2(t) Ts
+
v2(t) Tsv1(t) Ts
i1(t) Ts
Re(d1)
+ p(t) Ts
Fig. 15.11 The general two-switch network ( a), and the corresponding averaged switch model in the
discontinuous conduction mode (b). The average transistor waveforms obey Ohm’s law, while the average
diode waveforms behave as a dependent power source
Fig. 15.12 Replacement of the switch network of the DCM buck–boost converter with the loss-free
resistor model
Systems containing power sources or loss-free resistors can usually be easily solved, by
equating average source and load powers. For example, in the dc network of Fig. 15.13,t h e
power ﬂowing into the converter input terminals is
P=
V2
g
Re
(15.28)
The power ﬂowing into the load resistor is
P= V2
R (15.29)

15.2 DCM Averaged Switch Model 597
P
Re(D)+ R
+
VVg
I1
Fig. 15.13 Dc network example containing a loss-free resistor model
The loss-free resistor model states that these two powers must be equal:
P=
V2
g
Re
= V2
R (15.30)
Solution for the voltage conversion ratio M= V/Vg yields
V
Vg
=±
√
R
Re
(15.31)
Equation (15.31) is a general result, valid for any converter that can be modeled by a loss-free
resistor and that drives a resistive load. Other arguments must be used to determine the polarity
of V/Vg. In the buck–boost converter shown in Fig. 15.5, the diode polarity indicates that V/Vg
must be negative. The steady-state value of Re is
Re(D)= 2L
D2Ts
(15.32)
where D is the quiescent transistor duty cycle. Substitution of Eq. (15.32)i n t o(15.31) leads to
V
Vg
=−
√
D2TsR
2L =−D√
K
(15.33)
with K = 2L/RTs. This equation coincides with the previous steady-state result given in Ta-
ble 5.2.
Similar arguments apply when the waveforms contain ac components. For example, con-
sider the network of Fig.15.14, in which the voltages and currents are periodic functions of time.
The rms values of the waveforms can be determined by simply equating the average source and
load powers. The average power ﬂowing into the converter input port is
Pav=
V2
g,rms
Re
(15.34)
where Pav is the average power consumed by the eﬀective resistance Re. No average power is
consumed by capacitor C, and hence the average power Pav must ﬂow entirely into the load
resistor R:
Pav= V2
rms
R (15.35)

598 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
p(t)
Re
+ R
+
v(t)vg(t)
i1(t) i2(t)
C
Fig. 15.14 Ac network example containing a loss-free resistor model
Upon equating Eqs. (15.34) and (15.35), we obtain
Vrms
Vg,rms
=
√
R
Re
(15.36)
Thus, the rms terminal voltages obey the same relationship as in the dc case.
Averaged equivalent circuits of the DCM buck, boost, and buck–boost converters, as well
as the DCM ´Cuk and SEPIC converters, are listed in Fig.15.15. In each case, the averaged tran-
sistor waveforms obey Ohm’s law, and are modeled by an eﬀective resistance Re. The averaged
diode waveforms follow a power source characteristic, equal to the power eﬀectively dissipated
in Re. For the buck, boost, and buck–boost converters, Re is given by
Re= 2L
d2Ts
(15.37)
For the ´Cuk and SEPIC converters, Re is given by
Re= 2(L1∥L2)
d2Ts
(15.38)
Here, d is the transistor duty cycle.
Steady-state conditions in the converters of Fig.15.15 are found by letting the inductors and
capacitors become short circuits and open circuits, respectively, and then solving the resulting dc
circuits with d(t)= D. The buck–boost, ´Cuk, and SEPIC then reduce to the circuit of Fig.15.13.
The buck and boost converters reduce to the circuits of Fig.15.16. Equilibrium conversion ratios
M= V/Vg of these converters are summarized in Table 15.1, as functions of Re(D). It can be
shown that these converters operate in the discontinuous conduction mode whenever the load
current I is less than the critical current I
crit:
I> Icrit for CCM
I< Icrit for DCM (15.39)
For all of these converters, Icrit is given by
Icrit= 1−D
D
Vg
Re(D) (15.40)

15.2 DCM Averaged Switch Model 599
Fig. 15.15 Averaged large-signal equivalent circuits of ﬁve basic converters operating in the discontinu-
ous conduction mode

600 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
(a)
P
Re(D)
+ R
+
VVg
(b)
PRe(D)+ R
+
VVg
Fig. 15.16 Dc equivalent circuits representing the buck (a) and boost (b) converters operating in DCM
Table 15.1 CCM and DCM conversion ratios of basic converters
Converter M, CCM M,D C M
Buck D 2
1+
√
1+ 4Re
/R
Boost 1
1−D
1+
√
1+ 4R/Re
2
Buck–boost, ´Cuk −D
1−D −
√
R
Re
SEPIC D
1−D
√
R
Re
15.3 Small-Signal AC Modeling of the DCM Switch Network
The next step is construction of a small-signal equivalent circuit model for converters operating
in the discontinuous conduction mode. In the large-signal ac equivalent circuits of Fig. 15.15,
the averaged switch networks are nonlinear. Hence, construction of a small-signal ac model
involves perturbation and linearization of the loss-free resistor network. The signals in the large-
signal averaged DCM switch network model of Fig. 15.17a are perturbed about a quiescent
operating point, as follows:

15.3 Small-Signal AC Modeling of the DCM Switch Network 601
Fig. 15.17 Averaged models of the general two-switch network in a converter operating in DCM: ( a)
large-signal model, (b) small-signal model
d(t)= D+ ˆd(t)
⟨v1(t)⟩Ts = V1+ ˆv1(t)
⟨i1(t)⟩Ts = I1+ ˆi1(t) (15.41)
⟨v2(t)⟩Ts = V2+ ˆv2(t)
⟨i2(t)⟩Ts = I2+ ˆi2(t)
Here, D is the quiescent value of the transistor duty cycle, V1 is the quiescent value of the
applied average transistor voltage⟨v1(t)⟩Ts , etc. The quantities ˆd(t), ˆv1(t), etc., are small ac vari-
ations about the respective quiescent values. It is desired to linearize the average switch network
terminal equations (15.20) and (15.21).
Equations (15.20) and (15.21) express the average terminal currents⟨i1(t)⟩Ts and⟨i2(t)⟩Ts as
functions of the transistor duty cycled(t)= d1(t) and the average terminal voltages⟨v1(t)⟩Ts and
⟨v2(t)⟩Ts . Upon perturbation and linearization of these equations, we will therefore ﬁnd thatˆi1(t)
and ˆi2(t) are expressed as linear functions of ˆd(t), ˆv1(t), and ˆv2(t). So the small-signal switch
network equations can be written in the following form:
ˆi1= ˆv1
r1
+ j1 ˆd+ g1 ˆv2
ˆi2=−ˆv2
r2
+ j2 ˆd+ g2 ˆv1 (15.42)
These equations describe the two-port equivalent circuit of Fig.15.17b.

602 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
The parameters r1, j1, and g1 can be found by Taylor expansion of Eq. (15.20), as described
in Sect. 7.2.8. The average transistor current⟨i1(t)⟩Ts ,E q .(15.20), can be expressed in the fol-
lowing form:
⟨i1(t)⟩Ts =⟨v1(t)⟩Ts
Re(d(t))= f1
⎦⟨v1(t)⟩Ts,⟨v2(t)⟩Ts, d(t)) (15.43)
Let us expand this expression in a three-dimensional Taylor series, about the quiescent operating
point (V1, V2, D):
I1+ ˆi1(t)= f1(V1, V2, D)+ ˆv1(t)∂f1(v1, V2, D)
∂v1
⏐⏐
⏐⏐⏐
v1=V1
+ˆv2(t)∂f1(V1, v2, D)
∂v2
⏐⏐⏐
⏐
⏐
v2=V2
+ ˆd(t)∂f1(V1, V2, d)
∂d
⏐⏐⏐
⏐
⏐
d=D
(15.44)
+higher−order nonlinear terms
For simplicity of notation, the angle brackets denoting average values are dropped in the above
equation. The dc terms on both sides of Eq. (15.44) must be equal:
I1= f1(V1, V2, D)= V1
Re(D) (15.45)
As usual, we linearize the equation by discarding the higher-order nonlinear terms. The remain-
ing ﬁrst-order linear ac terms on both sides of Eq. (15.44) are equated:
ˆi1(t)= ˆv1(t) 1
r1
+ ˆv2(t)g1+ ˆd(t) j1 (15.46)
where
1
r1
= ∂f1(v1, V2, D)
∂v1
⏐⏐
⏐⏐⏐
v1=V1
= 1
Re(D) (15.47)
g1= ∂f1(V1, v2, D)
∂v2
⏐⏐⏐⏐
⏐
v2=V2
= 0 (15.48)
j1= ∂f1(V1, V2, d)
∂d
⏐⏐⏐
⏐⏐
d=D
=−V1
R2e (D)
∂Re(d)
∂d
⏐⏐
⏐⏐⏐
⏐
d=D
(15.49)
= 2V1
DRe(D)
Thus, the small-signal input resistance r1 is equal to the eﬀective resistance Re, evaluated at
the quiescent operating point. This term describes how variations in ⟨v1(t)⟩Ts aﬀect⟨i1(t)⟩Ts ,
via Re(D). The small-signal parameter g1 is equal to zero, since the average transistor current
⟨i1(t)⟩TS is independent of the average diode voltage⟨v2(t)⟩Ts . The small-signal gain j1 describes
how duty-cycle variations, which aﬀect the value of Re(d), lead to variations in⟨i1(t)⟩Ts .
In a similar manner,⟨i2(t)⟩Ts from Eq. (15.21) can be expressed as
⟨i2(t)⟩Ts =
⟨v1(t)⟩2
Ts
Re(d(t))⟨v2(t)⟩Ts
= f2
⎦⟨v1(t)⟩Ts,⟨v2(t)⟩Ts, d(t)) (15.50)
Expansion of the function f2(v1, v2, d) in a three-dimensional Taylor series about the quiescent
operating point leads to

15.3 Small-Signal AC Modeling of the DCM Switch Network 603
I2+ ˆi2(t)= f2(V1, V2, D)+ ˆv1(t)∂f2(v1, V2, D)
∂v1
⏐⏐⏐⏐
⏐
v1=V1
+ˆv2(t)∂f2(V1, v2, D)
∂v2
⏐⏐⏐
⏐⏐
v2=V2
+ ˆd(t)∂f2(V1, V2, d)
∂d
⏐⏐⏐
⏐⏐
d=D
(15.51)
+higher−order nonlinear terms
By equating the dc terms on both sides of Eq. (15.51), we obtain
I2= f2(V1, V2, D)= V2
1
Re(D)V2
(15.52)
The higher-order nonlinear terms are discarded, leaving the following ﬁrst-order linear ac terms:
ˆi2(t)= ˆv2(t)
⎦
−1
r2
)
+ ˆv1(t)g2+ ˆd(t) j2 (15.53)
with
1
r2
=−∂f2(V1, v2, D)
∂v2
⏐⏐⏐
⏐
⏐
v2=V2
= 1
R= 1
M2Re(D) (15.54)
g2= ∂f2(v1, V2, D)
∂v1
⏐⏐
⏐⏐⏐
v1=V1
= 2
MRe(D) (15.55)
j2= ∂f2(V1, V2, d)
∂d
⏐⏐⏐
⏐
⏐
d=D
=− V2
1
R2e (D)V2
∂Re(d)
∂d
⏐⏐
⏐⏐⏐
⏐
d=D
(15.56)
= 2V1
DMRe(D)
The output resistance r2 describes how variations in⟨v2(t)⟩Ts inﬂuence⟨i2(t)⟩Ts . As illustrated
in Fig. 15.18, r2 is determined by the slope of the power source characteristic, evaluated at the
quiescent operating point. For a linear resistive load, r2 = R. For any type of load, it is true
Fig. 15.18 The small-signal output resistance r2 is determined by the slope of the power source charac-
teristic at the quiescent operating point

604 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
Table 15.2 Small-signal DCM switch model parameters
Switch network g1 j1 r1 g2 j2 r2
General
two-switch,
Fig. 15.11a
0 2V1
DRe
Re
2
MRe
2V1
DMRe
M2Re
Buck, Fig.15.21a −1
Re
2(1−M)V1
DRe
Re
2−M
MRe
2(1−M)V1
DMRe
M2Re
Boost,
Fig. 15.21b − 1
(M−1)2Re
2MV1
D(M−1)Re
(M−1)2
M2 Re
2M−1
(M−1)2Re
2V1
D(M−1)Re
(M−1)2Re
Fig. 15.19 Small-signal ac model of the DCM buck–boost converter obtained by insertion of the switch
network two-port small-signal model into the original converter circuit
that r2 = M2Re(D). The parameters j2 and g2 describe how variations in the duty cycle d(t)
and in the average transistor voltage⟨v1(t)⟩Ts (which inﬂuence the average power⟨p(t)⟩Ts ) lead
to variations in the average diode current⟨i2(t)⟩Ts . Values of the small-signal parameters in the
DCM switch model of Fig. 15.17b are summarized in the top row of Table15.2.
A small-signal model of the DCM buck–boost converter is obtained by replacing the transis-
tor and diode of the converter with the switch model of Fig. 15.17b. The result is illustrated in
Fig. 15.19. This equivalent circuit can now be solved using conventional linear circuit analysis
techniques, to determine the transfer functions and other small-signal quantities of interest.
The small-signal equivalent circuit models of Fig. 15.19 contain two dynamic elements: ca-
pacitor C and inductor L. Control-to-output transfer functions obtained by solving this equiv-
alent circuit model have two poles. It has been shown [ 71, 74, 126, 130, 131] that one of the
poles, due to the capacitor C, appears at a low frequency, while the other pole (and a RHP
zero) due to the inductor L, occurs at much higher frequency, close to or above the converter
switching frequency. The small-signal equivalent circuit models have been derived from the
large-signal averaged switch network equations (15.20) and (15.21). These equations are based
on the approximation in Eq. ( 15.5), which states that the average inductor voltage, and there-
fore its small-signal ac voltage, is zero. This contradicts predictions of the resulting small-signal
model in Fig.15.19. As a result, we expect that the models derived in this section can be used to
predict low-frequency dynamics, while predictions of the high-frequency dynamics due to the
```
