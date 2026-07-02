---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第23章part 1 - 23 Soft Switching
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 992-1011 > Chunk ID: `chapter-23-part-1`"
---

# 第23章part 1 - 23 Soft Switching

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 992-1011  
> Chunk ID: `chapter-23-part-1`

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
23
Soft Switching
In addition to the resonant circuits introduced in Chap. 22, there has been much interest in
reducing the switching loss of the PWM converters of the previous chapters. Several of the
more popular approaches to obtaining soft switching in buck, boost, and other converters are
discussed in this chapter.
Mechanisms that cause switching loss are discussed in Chap. 4, including diode reverse re-
covery, semiconductor output capacitances, and IGBT current tailing. Soft switching involves
mitigation of one or more of these switching loss mechanisms in a PWM converter. The energy
that would otherwise be lost is recovered, and is transferred to the converter source or load. The
operation of a semiconductor device, during a given turn-on or turn-o ﬀswitching transition,
can be classiﬁed as hard-switched, zero-current switched, or zero-voltage switched. Operation
of diodes and transistors with soft switching is examined in Sect.23.1. In particular, it is prefer-
able to operate diodes with zero-voltage switching at their turn-o ﬀtransitions, and to operate
MOSFETs with zero-voltage switching during their turn-on transitions. However, zero-voltage
switching comes at the expense of increased conduction loss, and so the engineer must consider
the eﬀect of soft switching on the overall converter eﬃciency.
Resonant switch converters are a broad class of converters in which the PWM switch net-
work of a conventional buck, boost, or other converter is replaced with a switch cell containing
resonant elements. These resonant elements are positioned such that the semiconductor devices
operate with zero-current or zero-voltage switching, and such that one or more of the switching
loss mechanisms is reduced or eliminated. Other soft-switching approaches may employ reso-
nant switching transitions, but otherwise exhibit the approximately rectangular waveforms of
hard-switched converters. In any case, the resulting hybrid converter combines the properties of
the resonant switching network and the parent hard-switched PWM converter.
Soft-switching converters can exhibit reduced switching loss, at the expense of increased
conduction loss. Obtaining zero-voltage or zero-current switching requires that the resonant
elements have large ripple; often, these elements are operated in a manner similar to the dis-
continuous conduction modes of the series or parallel resonant converters. As in other resonant
schemes, the objectives of designing such a converter are: (1) to obtain smaller transformer and
low-pass ﬁlter elements via increase of the switching frequency and/or (2) to reduce the switch-
ing loss induced by component nonidealities such as diode stored charge, semiconductor device
capacitances, and transformer leakage inductance and winding capacitance.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_23
995

996 23 Soft Switching
The resonant switch and soft-switching ideas are quite general, and can be applied to a
variety of topologies and applications. A large number of resonant switch networks have been
documented in the literature; a few basic approaches are listed here [70, 72, 73, 251, 328, 331–
349]. The basic zero-current-switching quasi-resonant switch network is analyzed in detail in
Sect. 23.2. Expressions for the average components of the switch network terminal waveforms
are found, leading to determination of the switch conversion ratio μ. The switch conversion
ratioμperforms the role of the duty cycle d of CCM PWM switch networks. For example, the
buck converter exhibits conversion ratio M equal toμ. Both half-wave and full-wave ringing of
the tank network are considered; these lead to diﬀerent switch conversion ratio functionsμ.I n
general, given a PWM CCM converter having conversion ratio M(d), we can replace the PWM
switch network with a resonant switch network having switch conversion ratioμ. The resulting
quasi-resonant converter will then have conversion ratioM(μ). So we can obtain soft-switching
versions of all of the basic converters (buck, boost, buck–boost, forward, ﬂyback, etc.) that
exhibit zero-voltage or zero-current switching and other desirable properties.
In Sect. 23.3, the characteristics of several other resonant switch networks are listed: the
zero-voltage-switching quasi-resonant switch network, the zero-current-switching and zero-
voltage-switching quasi-square-wave networks, and the multiresonant switch network. One can
obtain zero-voltage switching in all transistors and diodes using these networks.
Several related soft-switching approaches are now popular, which attain zero-voltage switch-
ing of the transistor or transistors in commonly used converters. The zero-voltage transition
approach ﬁnds application in full-bridge buck-derived converters. Active-clamp snubbers are
often added to forward and ﬂyback converters, to attain zero-voltage switching and to reset
the transformer. These circuits lead to zero-voltage switching of the transistors, but (less-than-
optimal) zero-current switching of the secondary-side diodes. Nonetheless, high eﬃciency can
be achieved. An auxiliary resonant commutated pole can achieve zero-voltage switching in
voltage-source inverters. These converters are brieﬂy discussed in Sect.23.4.
23.1 Soft-Switching Mechanisms of Semiconductor Devices
When loosely used, the terms “zero-current switching” and “zero-voltage switching” normally
refer to one or more switching transitions of the transistor in a converter. However, to fully
understand how a converter generates switching loss, one must closely examine the switching
transitions of every semiconductor device. As described in Sect. 4.6, there are typically several
mechanisms that are sources of signiﬁcant switching loss. At the turn-oﬀtransition of a diode,
its reverse-recovery process can induce loss in the transistor or other elements of the converter.
The energy stored in the output capacitance of a MOSFET can be lost when the MOSFET turns
on. IGBTs can lose signiﬁcant energy during their turnoﬀtransition, owing to the current tailing
phenomenon. The eﬀects of zero-current switching and zero-voltage switching on each of these
devices are discussed in detail below.
23.1.1 Diode Switching
As discussed in Chap. 4, the reverse-recovery process usually leads to signiﬁcant switching
loss associated with the turn-o ﬀtransition of diodes. This is often the largest single source

23.1 Soft-Switching Mechanisms of Semiconductor Devices 997
(a)
+
I
v(t)
+
i(t)
+
Silicon
diode
Fast
transistor
Vg
(b) i(t)
v(t)
0
0
Vg
Area
Qr
t
I
Fig. 23.1 Hard switching at the turn-oﬀtransition of a diode, conventional buck converter example: (a)
schematic, (b) diode voltage and current waveforms
of loss in a hard-switched converter. Normally, negligible loss is associated with the turn-on
transition of power diodes. Three types of diode turn-o ﬀtransition waveforms are commonly
encountered in modern switching converters: hard switching, zero-current switching, and zero-
voltage switching.
Figure 23.1 illustrates a conventional hard-switched PWM buck converter. The diode volt-
age and current waveforms v(t) and i(t) are also illustrated, with an exaggerated reverse recov-
ery time. The output inductor current ripple is small. The diode turns oﬀwhen the transistor is
turned on; the reverse recovery process leads to a negative peak current of large amplitude. The
diode must immediately support the full reverse voltage Vg, and hence both v(t) and i(t)m u s t
change with large slopes during reverse recovery. As described in Sect.4.3.3, hard switching of
the diode induces energy loss WD in the transistor, given approximately by
WD= VgQr+ trVgI (23.1)
where Qr is the diode recovered charge and tr is the reverse recovery time, both taken to be
positive quantities. The recovered charge is relatively large because the slope di/dt is large
during the turn-oﬀtransition. The resonant circuit formed by the diode output capacitance C j
and the diode package and other wiring inductances leads to ringing at the end of the reverse
recovery time.

998 23 Soft Switching
(a)
Lr
Cr
+Vg
v(t)
+
i(t)
I
(b) i(t)
v(t)
0
0
– Vg
Area
Qr
t
Fig. 23.2 Zero-current switching at the turn-oﬀtransition of a diode, ZCS quasi-resonant buck converter
example: (a) converter schematic, (b) diode voltage and current waveforms
Figure 23.2 illustrates zero-current switching at the turn-oﬀtransition of a diode. The con-
verter example is a quasi-resonant zero-voltage switching buck converter (see Sect.23.3.1). The
output inductor current ripple is again small. However, tank inductor Lr is now connected in
series with the diode. The resulting diode current waveform i(t) changes with a limited slope
as shown. The diode reverse-recovery process commences when i(t) passes through zero and
becomes negative. The negative i(t) actively removes stored charge from the diode; during this
reverse recovery time, the diode remains forward-biased. When the stored charge is removed,
then the diode voltage must rapidly change to −Vg. As described in Sect. 4.6.1, energy WD is
stored in inductor Lr at the end of the reverse recovery time, given by
WD= VgQr (23.2)
The resonant circuit formed by Lr and the diode output capacitance C j then cause this energy
to be circulated between Lr and C j. This energy is eventually dissipated by parasitic resistive
elements in the circuit, and hence is lost. Since Eqs. ( 23.1) and ( 23.2) are similar in form,
the switching losses induced by the reverse-recovery processes of diodes operating with hard
switching and with zero-current switching are similar in magnitude. Zero-current switching
may lead to somewhat lower loss because the reduced di/dt leads to less recovered charge Q
r.

23.1 Soft-Switching Mechanisms of Semiconductor Devices 999
Fig. 23.3 A dissipative snubber circuit,
for protection of a diode from excessive
voltage caused by ringing
CR
Diode output
capacitance
Series
inductance
Tank
circuit
Snubber
circuit
Zero-current switching of diodes also typically leads to increased peak inverse diode voltage
during the ringing of Lr and C j, because of the relatively large value of Lr.
When a diode operates with hard switching or zero-current switching, and when substantial
inductance is present in series with the diode, then signiﬁcant ringing is observed in the diode
voltage waveform. A resonant circuit, comprised of the series inductance and the diode output
capacitance, is excited by the diode reverse recovery process, and the resulting ringing voltage
can be of large enough magnitude to lead to breakdown and failure of the diode. A common
example is the diodes on the secondary side of a hard-switched transformer-isolated converter;
the resonant circuit is then formed by the transformer leakage inductance and the diode out-
put capacitance. Other examples are the circuits of Figs. 23.2 and 23.36, in which the series
inductance is a discrete tank inductor.
A simple snubber circuit that is often used to protect the diode from excessive reverse volt-
age is illustrated in Fig. 23.3. Resistor R damps the ringing of the resonant circuit. Capacitor C
prevents the oﬀ-state voltage of the diode from causing excessive power loss inR. Nonetheless,
the energy consumed by R per switching period is typically greater than Eqs. (23.1)o r( 23.2).
Figure 23.4 illustrates zero-voltage switching at the turn-oﬀtransition of a diode. The ﬁgure
illustrates the example of a zero-voltage switching quasi-square wave buck converter, discussed
in Sect. 23.3.3. The output inductor L
r of this converter assumes the role of the tank inductor,
and exhibits large current ripple that causes the current ir(t) to reverse polarity. While the diode
conducts, its current i(t) is equal to ir(t). When ir(t) becomes negative, the diode continues to
conduct until its stored charge Qr has been removed. The diode then becomes reverse-biased,
and ir(t) ﬂows through capacitor Cr and the diode output capacitance C j. The diode voltage
and current both change with limited slope in this type of switching, and the loss induced by
the diode reverse-recovery process is negligible because the waveforms are not signiﬁcantly
damped by parasitic resistances in the circuit, and because the peak currents during reverse
recovery are relatively low. The diode stored charge and diode output capacitance both behave
as an eﬀective nonlinear capacitor that can be combined with (or replace) tank capacitor C
r.
Snubber circuits such as Fig. 23.3 are not necessary when the diode operates with zero-voltage
switching.
Thus, zero-voltage switching at the turn-oﬀtransition of a diode is the preferred approach
that leads to minimum switching loss. Zero-current switching at the turn-o ﬀtransition can be
problematic, because of the high peak inverse voltage induced across the diode by ringing.

1000 23 Soft Switching
23.1.2 MOSFET Switching
The switching loss mechanisms typically encountered by a MOSFET in a hard-switched con-
verter are discussed in Chap. 4, and typical MOSFET voltage and current waveforms are illus-
trated in Fig. 23.5. The most signiﬁcant components of switching loss in the MOSFET of this
circuit are: (1) the loss induced by the diode reverse recovery process and (2) the loss of the
energy stored in the MOSFET output capacitance Cds. Both loss mechanisms occur during the
MOSFET turn-on process.
(a)
+ CrVg v(t)
+
ir(t)
Lri(t)
(b) i(t)
v(t)
Vg
0
Vg
0
Area
Qr
Fig. 23.4 Zero-voltage switching at the turn-oﬀtransition of a diode, ZVS quasi-square wave buck con-
verter example: (a) converter schematic, (b) diode current and voltage waveforms
In the hard-switched circuit of Fig.23.5, with a fast gate driver there is essentially no switch-
ing loss incurred during the MOSFET turn-oﬀtransition. This occurs because of the substantial
output capacitance Cds of the MOSFET. This capacitance holds the voltage v(t) close to zero
while the MOSFET turns oﬀ, so that the turn-oﬀswitching loss is very small. After the MOSFET
has turned oﬀ, the output inductor current I ﬂows through Cds. The voltage v(t) then increases
until v= Vg and the diode becomes forward-biased.
However, when the MOSFET turns on, a high peak current ﬂows through the MOSFET
channel, induced by the diode reverse recovery and by the output capacitances of the MOSFET
and diode. This leads to substantial energy loss during the hard-switched turn-on transition of
the MOSFET.
When a MOSFET (or other transistor) operates with hard switching, and when substantial
inductance is present in series with the MOSFET, then signiﬁcant ringing is observed in the

23.1 Soft-Switching Mechanisms of Semiconductor Devices 1001
(a)
+
I
+ v(t
i(t)
+
Silicon
diodeVg
Cds
(b) i(t)
v(t)
0
0
Vg
t
I
Fig. 23.5 Hard switching of a MOSFET in a conventional buck converter: ( a) schematic, (b) MOSFET
voltage and current waveforms
MOSFET voltage waveform. A resonant circuit, composed of the MOSFET output capacitance
and the series inductance, is excited when the MOSFET turns o ﬀ, and the resulting ringing
voltage can be of large enough magnitude to lead to breakdown and failure of the MOSFET.
A common example is the MOSFET of the ﬂyback converter, in which series inductance is
introduced by the transformer leakage inductance. An R-C snubber circuit, similar to that used
for the diode in Fig. 23.3, can be used to protect the MOSFET from damage caused by excessive
applied voltage. Another common snubber circuit is illustrated in Fig.23.6. When the MOSFET
turns oﬀ, the current ﬂowing in the transformer leakage inductance Lℓ begins to ﬂow into the
MOSFET capacitance Cds. These parasitic elements then ring, and the peak transistor voltage
can signiﬁcantly exceed the ideal value of (D/D′)Vg.
One simple way to design the snubber circuit of Fig. 23.6 is to choose the capacitance Cs
to be large, so that vs(t)≈Vs contains negligible switching ripple. The resistance Rs is then
chosen so that the power consumption of Rs at the desired voltage Vs is equal to the switching
loss caused by Lℓ:
V2
s
Rs
≈1
2Li2 fs (23.3)

1002 23 Soft Switching
Fig. 23.6 Insertion of a dis-
sipative voltage-clamped snub-
ber circuit into a ﬂyback con-
verter. The MOSFET voltage is
clamped to a peak value of (Vg+
vs) +
Lll
Vg
Cds
CsRs
Ds
vs
+
Snubber
circuit
The current i is equal to the current ﬂowing in the transformer primary just before the MOSFET
is turned oﬀ. This approximate expression is useful for obtaining a ﬁrst estimate of how to
choose Rs to obtain a given desired Vs.
Zero-current switching does not a ﬀect the switching loss that arises from the MOSFET
output capacitance, and it may or may not inﬂuence the loss induced by diode reverse recovery.
In consequence, zero-current switching is of little or no help in improving the e ﬃciency of
converters that employ MOSFETs.
Fig. 23.7 Zero-voltage switching
of a MOSFET, ZVS quasi-square
wave buck converter example. The
MOSFET, its body diode, and its out-
put capacitance Cds are illustrated.
(a) Schematic, (b)M O S F E Tv o l t a g e
and current waveforms
(a)
+
Cds
Vg
+ v(t
ir(t)
Lr
i(t)
(b)
i(t)
v(t) Vg
0

23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell 1003
Zero-voltage switching can prevent both diode reverse recovery and semiconductor out-
put capacitances from inducing switching loss in MOSFETs. An example is illustrated in
Fig. 23.7. This circuit is again a zero-voltage switching quasi-square wave example, discussed
in Sect. 23.3.3. The converter circuit naturally discharges the energy stored in Cds, before the
MOSFET is switched on. When the drain-to-source voltage v(t) passes through zero, the MOS-
FET body diode becomes forward-biased. The MOSFET can then be turned on at zero voltage,
without incurring turn-on switching loss. The MOSFET turn-on transition must be completed
before the tank inductor current ir(t) becomes positive. The MOSFET turn-oﬀtransition is also
lossless, and is similar to the hard-switched case discussed above.
Zero-voltage switching of a MOSFET also causes its body diode to operate with zero-
voltage switching. This can eliminate the switching loss associated with reverse recovery of
the slow body diode, and improve the reliability of circuits that forward-bias this diode.
Zero-voltage switching can also eliminate the overvoltage problems associated with trans-
former leakage inductances, removing the need for voltage-clamped snubber circuits such as in
Fig. 23.6. An example is discussed in Sect. 23.4.2.
23.1.3 IGBT Switching
Like the MOSFET, the IGBT typically encounters substantial switching loss during its turn-on
transition, induced by the reverse-recovery process of diodes within the converter. In addition,
the IGBT exhibits signiﬁcant switching loss during its turn-oﬀtransition, caused by the current
tailing phenomenon (see Chap. 4).
Zero-voltage switching has been successfully applied to IGBT circuits—an example is the
auxiliary resonant commutation circuit discussed in Sect. 23.4.3. This has the principal advan-
tage of eliminating the switching loss caused by diode reverse recovery. Although zero-voltage
switching can reduce the loss incurred during the turn-oﬀtransition, it is diﬃcult to eliminate
the substantial loss caused by current tailing.
23.2 The Zero-Current Switching Quasi-Resonant Switch Cell
Figure 23.8a illustrates a generic buck converter, consisting of a switch cell cascaded by anL–C
low-pass ﬁlter. When the switch cell is realized as in Fig.23.8b, then a conventional PWM buck
converter is obtained. Figures23.8b,c illustrate two other possible realizations of the switch cell:
the half-wave and full-wave zero-current-switching quasi-resonant switches [331, 332]. In these
switch cells, a resonant tank capacitorCr is placed in parallel with diodeD2, while resonant tank
capacitor Lr is placed in series with the active transistor element.
Both resonant switch cells require a two-quadrant SPST switch. In the half-wave switch cell
of Fig.23.8c, diode D1 is added in series with transistorQ1. This causes theQ1–D1 SPST switch
to turn oﬀat the ﬁrst zero crossing of the tank inductor currenti1(t). In the full-wave switch cell
of Fig. 23.8d, antiparallel diode D1 allows bidirectional ﬂow of the tank inductor current i1(t).
With this switch network, the Q1–D1 SPST switch is normally turned oﬀat the second zero
crossing of the i1(t) waveform. In either switch cell, the Lr and Cr elements are relatively small
in value, such that their resonant frequency f0 is greater than the switching frequency fs, where
f0= 1
2π√LrCr
=ω0
2π (23.4)

1004 23 Soft Switching
(a)
+
L
CR
+
v(t)vg(t)
i(t)
+
v2(t)
i1(t) i2(t)
Switch
cell
+
v1(t)
(b)
+
v2(t)
i1(t) i2(t)
+
v1(t)
PWM switch cell
(c)
+
v2(t)
i1(t) i2(t)
+
v1(t)
Lr
Cr
Half-wave ZCS quasi-resonant switch cell
Switch network
+
v1r(t)
i2r(t)D1
D2
Q1
(d)
+
v2(t)
i1(t) i2(t)
+
v1(t)
Lr
Cr
Full-wave ZCS quasi-resonant switch cell
Switch network
+
v1r(t)
i2r(t)
D1
D2
Q1
Fig. 23.8 Implementation of the switch cell in a buck converter: (a) buck converter, with arbitrary switch
cell; (b) PWM switch cell; (c) half-wave ZCS quasi-resonant switch cell; (d) full-wave ZCS quasi-resonant
switch cell

23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell 1005
In the analysis which follows, it is assumed that the converter ﬁlter element values L and C
have negligible switching ripple. Hence, the switch cell terminal waveforms v1(t) and i2(t)a r e
well-approximated by their average values:
i2(t)≈⟨i2(t)⟩Ts
v1(t)≈⟨v1(t)⟩Ts
(23.5)
with the average deﬁned as in Eq. ( 7.3). In steady-state, we can further approximate v1(t) and
i2(t) by their dc components V1 and I2:
i2(t)≈I2
v1(t)≈V1
(23.6)
Thus, the small-ripple approximation is employed for the converter ﬁlter elements, as usual.
+
+
v2(t)
i1(t)
v1(t) Ts
Lr
Cr
Half-wave ZCS quasi-resonant switch cell
Switch network
+
v1r(t)
i2r(t)D1
D2
Q1
i2(t) Ts
Fig. 23.9 The half-wave ZCS quasi-resonant switch cell, driven by the terminal quantities⟨v1(t)⟩Ts and
⟨i2(t)⟩Ts
To understand the operation of the half-wave ZCS quasi-resonant switch cell, we can solve
the simpliﬁed circuit illustrated in Fig. 23.9. In accordance with the averaged switch modeling
approach of Sects. 14.1 and 15.2, it is desired to determine the average terminal waveforms
⟨v2(t)⟩TS and⟨i1(t)⟩Ts , as functions of the applied quantities ⟨v1(t)⟩TS and⟨i2(t)⟩TS . The switch
conversion ratioμis then given by
μ= ⟨v2(t)⟩Ts
⟨v1r(t)⟩Ts
= ⟨i1(t)⟩Ts
⟨i2r(t)⟩Ts
(23.7)
In steady state, we can write
μ= V2
V1
= I1
I2
(23.8)
The steady-state analysis of this section employs Eq. (23.8) to determineμ.
23.2.1 Waveforms of the Half-Wave ZCS Quasi-Resonant Switch Cell
Typical waveforms of the half-wave cell of Fig. 23.9 are illustrated in Fig. 23.10. Each switch-
ing period consists of four subintervals as shown, having angular lengths α,β, δ, andξ.T h e

1006 23 Soft Switching
Fig. 23.10 Tank inductor current and
capacitor voltage waveforms, for the
half-wave ZCS quasi-resonant switch of
Fig. 23.9
V1
Lr
I2
Cr
 = 0t
i1(t)
I2
v2(t)
0Ts
Vc1
Subinterval: 12 3 4
Conducting
devices:
Q1
D2
D1
Q1
D1
D2X
switching period begins when the controller turns on transistor Q1. The initial values of the
tank inductor current i1(t) and tank capacitor voltage v2(t) are zero. During subinterval 1, all
three semiconductor devices conduct. Diode D2 is forward-biased because i1(t) is less than I2.
In consequence, during subinterval 1 the switch cell reduces to the circuit of Fig. 23.11.
The slope of the inductor current is given by
di1(t)
dt = V1
Lr
(23.9)
with the initial condition i1(0)= 0. The solution is
i1(t)= V1
Lr
t=ω0t V1
R0
(23.10)
where the tank characteristic impedance R0 is deﬁned as
R0=
√
Lr
Cr
(23.11)
It is convenient to express the waveforms in terms of the angle θ=ω0t, instead of time t.A t
the end of subinterval 1,ω0t=α. The subinterval ends when diode D2 becomes reverse-biased.
Since the diode D2 current is equal to I2−i1(t), this occurs when i1(t)= I2. Hence, we can write
Fig. 23.11 Circuit of the switch network
during subinterval 1
+
+
v2(t)
i1(t)
V1
Lr
I2

23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell 1007
Fig. 23.12 Circuit of the switch network
during subinterval 2
+
+
v2(t)
i1(t)
V1
Lr
I2Cr
ic(t)
i1(α)=αV1
R0
= I2 (23.12)
Solution forαyields
α= I2R0
V1
(23.13)
During subinterval 2, transistor Q1 and diode D1 conduct, while diode D2 is reverse-biased.
The switch network then becomes the circuit illustrated in Fig. 23.12. The resonant Lr–Cr tank
network is excited by the constant sources V1 and I2. The network equations are
Lr
di1(ω0t)
dt = V1−v2(ω0t)
Cr
dv2(ω0t)
dt = i1(ω0t)−I2 (23.14)
with the initial conditions
v2(α)= 0 (23.15)
i1(α)= I2
T h es o l u t i o ni s
i1(ω0t)= I2+ V1
R0
sin(ω0t−α) (23.16)
v2(ω0t)= V1(1−cos(ω0t−α))
The tank inductor current rises to a peak value given by
I1 pk= I2+ V1
R0
(23.17)
The subinterval ends at the ﬁrst zero crossing of i1(t). If we denote the angular length of the
subinterval asβ, then we can write
i1(α+β)= I2+ V1
R0
sin(β)= 0 (23.18)
Solution for sin(β) yields
sin(β)=−I2R0
V1
(23.19)
Care must be employed when solving Eq. ( 23.19) for the angle β. It can be observed from
Fig. 23.10 that the angleβis greater thanπ. The correct branch of the arcsine function must be
selected, as follows:

1008 23 Soft Switching
β=π+ sin−1
⎦I2R0
V1
)
(23.20)
where
−π
2< sin−1(x)≤π
2
Note that the inequality
I2< V1
R0
(23.21)
must be satisﬁed; otherwise, there is no solution to Eq. ( 23.19). At excessive load currents,
where Eq. (23.21) is not satisﬁed, the tank inductor current never reaches zero, and the transistor
does not switch oﬀat zero current.
The tank capacitor voltage at the end of subinterval 2 is found by evaluation of Eq. ( 23.16)
atω0t= (α+β). The cos(β) term can be expressed as
cos(β)=−
√
1−sin2(β)=−
√
1−
⎦I2R0
V1
)2
(23.22)
Substitution of Eq. (23.22) into Eq. (23.16) leads to
v2(α+β)= Vc1= V1
⎛⎜⎜⎜⎜⎜⎜⎜⎝1+
√
1−
⎦I2R0
V1
)2
⎞⎟⎟⎟⎟⎟⎟⎟⎠ (23.23)
At the end of subinterval 2, diode D1 becomes reverse-biased. Transistor Q1 can then be
switched oﬀat zero current.
During subinterval 3, all semiconductor devices are oﬀ, and the switch cell reduces to the
circuit of Fig.23.13. The tank capacitor Cr is discharged by the ﬁlter inductor currentI2. Hence,
the tank capacitor voltage v2 decreases linearly to zero. The circuit equations are
Cr
dv2(ω0t)
dt =−I2 (23.24)
v2(α+β)= Vc1
T h es o l u t i o ni s
v2(ω0t)= Vc1−I2R0(ω0t−α−β) (23.25)
Subinterval 3 ends when the tank capacitor voltage reaches zero. Diode D2 then becomes
forward-biased. Hence, we can write
v2(α+β+δ)= Vc1−I2R0δ= 0 (23.26)
whereδis the angular length of subinterval 3. Solution forδyields
Fig. 23.13 Circuit of the switch network
during subinterval 3
+
v2(t) I2Cr

23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell 1009
δ= Vc1
I2R0
= V1
I2R0
⎛⎜⎜⎜⎜⎜⎜⎜⎝1−
√
1−
⎦I2R0
V1
)2
⎞⎟⎟⎟⎟⎟⎟⎟⎠ (23.27)
Subinterval 4, of angular length ξ, is identical to the diode conduction subinterval of the
conventional PWM switch network. Diode D2 conducts the ﬁlter inductor current I2, and the
tank capacitor voltage v2 is equal to zero. Transistor Q1 is oﬀ, and the input current i1 is equal
to zero.
The angular length of the switching period is
ω0Ts=α+β+δ+ξ= 2πf0
fs
= 2π
F (23.28)
where
F= fs
f0
(23.29)
Quasi-resonant switch networks are usually controlled by variation of the switching frequency
fs or, in normalized terms, by variation of F. Note that the interval lengths α,β, and δare
determined by the response of the tank network. Hence, control of the switching frequency is
equivalent to control of the fourth subinterval lengthξ. The subinterval lengthξmust be positive,
and hence, the minimum switching period is limited as follows:
ω0Ts≥α+β+δ (23.30)
Substitution of Eqs. (23.13), (23.20), and (23.27) into Eq. (23.30) yields
2π
F ≥I2R0
V1
+π+ sin−1
⎦I2R0
V1
)
+ V1
I2R0
⎛⎜⎜⎜⎜⎜⎜⎜⎝1−
√
1−
⎦I2R0
V1
)2
⎞⎟⎟⎟⎟⎟⎟⎟⎠ (23.31)
This expression limits the maximum switching frequency, or maximumF, of the half-wave ZCS
quasi-resonant switch cell.
23.2.2 The Average Terminal Waveforms
It is now desired to solve for the power processing function performed by the switch network.
The switch conversion ratioμis a generalization of the duty cycled. It expresses how a resonant
switch network controls the average voltages and currents of a converter. In our buck converter
example, we can deﬁneμas the ratio of⟨v2(t)⟩TS to⟨v1(t)⟩TS , or equivalently, the ratio of⟨i1(t)⟩TS
to⟨i2(t)⟩TS . In a hard-switched PWM network, this ratio is equal to the duty cycle d. Hence,
analytical results derived for hard-switched PWM converters can be adapted to quasi-resonant
converters, simply by replacing d withμ. In this section, we derive an expression for μ,b y
averaging the terminal waveforms of the switch network.
The switch input current waveform i1(t)o fF i g .23.10 is reproduced in Fig. 23.14. The aver-
age switch input current is given by
⟨i1(t)⟩Ts = 1
Ts
∫ t+Ts
t
i1(t)dt= q1+ q2
Ts
(23.32)

1010 23 Soft Switching
Fig. 23.14 Input current waveform i1(t),
and the areas q1 and q2 during subintervals
1 and 2, respectively
+
00
i1(t)
I2 i1(t) Ts
t
q2q1
The charge quantitiesq1 and q2 are the areas under thei1(t) waveform during the ﬁrst and second
subintervals, respectively. The chargeq1 is given by the triangle area formula
q1=
∫ α
ω0
0
i1(t)dt= 1
2
⎦α
ω0
)
(I2) (23.33)
The timeα/ω0 is the length of subinterval 1. The charge q2 is
q2=
∫ α+β
ω0
α
ω0
i1(t)dt (23.34)
According to Fig.23.12, during subinterval 2 the currenti1(t) can be related to the tank capacitor
current iC(t) and the switch output current I2 by the node equation
i1(t)= iC(t)+ I2 (23.35)
Substitution of Eq. (23.35) into Eq. (23.34) leads to
q2=
∫ α+β
ω0
α
ω0
iC(t)dt+
∫ α+β
ω0
α
ω0
I2dt (23.36)
Both integrals in Eq. (23.36) can easily be evaluated, as follows. Since the second term involves
the integral of the constant current I2, this term is
∫ α+β
ω0
α
ω0
I2dt= I2
β
ω0
(23.37)
The ﬁrst term in Eq. ( 23.36) involves the integral of the capacitor current over subinterval 2.
Hence, this term is equal to the change in capacitor charge over the second subinterval:
∫ α+β
ω0
α
ω0
iC(t)dt= C
⎦
v2
⎦α+β
ω0
)
−v2
⎦α
ω0
))
(23.38)
(recall thatΔq= CΔv in a capacitor). During the second subinterval, the tank capacitor voltage
is initially zero, and has a ﬁnal value of Vc1. Hence, Eq. (23.38) reduces to
∫ α+β
ω0
α
ω0
iC(t)dt= C (Vc1−0)= CVc1 (23.39)

23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell 1011
Substitution of Eqs. ( 23.37) and (23.39) into Eq. (23.36) leads to the following expression for
q2:
q2= CVc1+ I2
β
ω0
(23.40)
Equations (23.33) and ( 23.40) can now be inserted into Eq. ( 23.32), to obtain the following
expression for the switch input current:
⟨i1(t)⟩Ts = αI2
2ω0Ts
+ CVc1
Ts
+ βI2
ω0Ts
(23.41)
Substitution of Eq. (23.41)i n t o(23.8) leads to the following expression for the switch con-
version ratio:
μ=⟨i1(t)⟩Ts
I2
= α
2ω0Ts
+ CVc1
I2Ts
+ β
ω0Ts
(23.42)
Finally, the quantitiesα,β, and Vc1 can be eliminated, using Eqs. (23.13), (23.20), (23.23). The
result is
μ= F 1
2π
[1
2 Js+π+ sin−1(Js)+ 1
Js
⎦
1+
√
1−J2s
)]
(23.43)
where
Js= I2R0
V1
(23.44)
Equation (23.43) is of the form
μ= FP1
2
(Js) (23.45)
where
P1
2
(Js)= 1
2π
[1
2 Js+π+ sin−1(Js)+ 1
Js
⎦
1+
√
1−J2s
)]
(23.46)
Thus, the switch conversion ratio μis directly controllable by variation of the switching fre-
quency, throughF. The switch conversion ratio is also a function of the applied terminal voltage
V1 and current I2,v i aJs. The function P1
2
(Js) is sketched in Fig. 23.15. The switch conversion
ratioμis sketched in Fig. 23.16, for various values of F and Js. These characteristics are sim-
ilar in shape to the function P(Js), and are simply scaled by the factor F. It can be seen that
the conversion ratioμis a strong function of the current I2,v i a Js. The characteristics end at
Js = 1; according to Eq. (23.31), the zero-current switching property is lost when Js > 1. The
characteristics also end at the maximum switching-frequency limit given by Eq. ( 23.31). This
expression can be simpliﬁed by use of Eq. (23.43), to express the limit in terms ofμas follows:
μ≤1−JsF
4π (23.47)
The switch conversion ratioμis thus limited to a value slightly less than 1.
The averaged waveforms of converters containing half-wave ZCS quasi-resonant switches
can now be determined. The results of the analysis of PWM converters operating in the continu-

1012 23 Soft Switching
0
2
4
6
8
10
0 0.2 0.4 0.6 0.8 1
Js
P (Js )1
2
Fig. 23.15 The function P 1
2
(Js)
ous conduction mode can be directly adapted to the related quasi-resonant converters, simply by
replacing the duty cycle d with the switch conversion ratioμ. For the buck converter example,
the conversion ratio is
M= V
Vg
=μ (23.48)
This result could also be derived by use of the principle of inductor volt-second balance. The
average voltage across the ﬁlter inductor is (μVg−V). Upon equating this voltage to zero, we
obtain Eq. (23.48).
In the buck converter, I2 is equal to the load current I, while V1 is equal to the converter
input voltage Vg. Hence, the quantity Js is
Js= IR0
Vg
(23.49)
Zero-current switching occurs for
I≤Vg
R0
(23.50)
The output voltage can vary over the range
0≤V≤Vg−FIR0
4π (23.51)
which nearly coincides with the PWM output voltage range 0≤V≤Vg.

23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell 1013
Fig. 23.16 Characteristics of the half-
wave ZCS quasi-resonant switch
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
F = 0.1
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0.9
+
Q1
L
CR
+
VD1
Vg
i2(t)
D2
Lr
CrIg
+
v1(t)
i1(t)
v2(t) +
Fig. 23.17 Boost converter containing a half-wave ZCS quasi-resonant switch
A boost converter employing a half-wave ZCS quasi-resonant switch is illustrated in
Fig. 23.17. The conversion ratio of the boost converter is given by
M= V
Vg
= 1
1−μ (23.52)
The half-wave switch conversion ratioμis again given by Eqs. (23.44)t o( 23.46). For the boost
converter, the applied switch voltage V1 is equal to the output voltage V, while the applied
switch current I2 is equal to the ﬁlter inductor current, or Ig. Hence, the quantity Js is
Js= I2R0
V1
= IgR0
V (23.53)

1014 23 Soft Switching
Fig. 23.18 Tank inductor current and ca-
pacitor voltage waveforms, for the full-
wave ZCS quasi-resonant switch cell of
Fig. 23.8d
I2
Cr
V1
Lr
 = 0t
i1(t)
I2
v2(t)
0Ts
Vc1
Subinterval: 12 3 4
Conducting
devices:
Q1
D2
Q1 D1 D2X
Also, the input current Ig of the boost converter is related to the load current I according to
Ig= I
1−μ (23.54)
Equations (23.52)t o( 23.54), in conjunction with Eqs. (23.44)t o( 23.46), describe the averaged
waveforms of the half-wave quasi-resonant ZCS boost converter.
23.2.3 The Full-Wave ZCS Quasi-Resonant Switch Cell
The full-wave ZCS quasi-resonant switch cell is illustrated in Fig. 23.8d. It diﬀers from the
half-wave cell in that elements D1 and Q1 are connected in antiparallel, to form a current-
bidirectional two-quadrant switch. Typical tank inductor current and tank capacitor voltage
waveforms are illustrated in Fig. 23.18. These waveforms are similar to those of the half-wave
case, except that the Q1/D1 switch interrupts the tank inductor current i1(t) at its second zero
crossing. While i1(t) is negative, diode D1 conducts, and transistor Q1 can be turned oﬀat zero
current.
The analysis is nearly the same as for the half-wave case, with the exception of subinterval
2. The subinterval 2 angular lengthβand ﬁnal voltage Vc1 can be shown to be
β=
{π+ sin−1(Js) (half wave)
2π−sin−1(Js)( f u l l w a v e ) (23.55)
Vc1=
⎧⎪⎪⎨⎪⎪⎩
V1
⎦
1+
√
1−J2s
)
(half wave)
V1
⎦
1−
√
1−J2s
)
(full wave) (23.56)
In either case, the switch conversion ratio μis given by Eq. (23.42). For the full-wave switch,
one obtains
```
