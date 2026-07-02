---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 20 Power and Harmonics in Nonsinusoidal Systems
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 849-865 > Chunk ID: `chapter-20`"
---

# 20 Power and Harmonics in Nonsinusoidal Systems

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 849-865  
> Chunk ID: `chapter-20`

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
20
Power and Harmonics in Nonsinusoidal Systems
Rectiﬁcation used to be a much simpler topic. A textbook could cover the topic simply by dis-
cussing the various circuits, such as the peak-detection and inductor-input rectiﬁers, the phase-
controlled bridge, polyphase transformer connections, and perhaps multiplier circuits. But re-
cently, rectiﬁers have become much more sophisticated, and are now systems rather than mere
circuits. They often include pulse-width modulated converters such as the boost converter, with
control systems that regulate the ac input current waveform. So modern rectiﬁer technology
now incorporates many of the dc–dc converter fundamentals.
The reason for this is the undesirable ac line current harmonics, and low power factors, of
conventional peak-detection and phase-controlled rectiﬁers. The adverse eﬀects of power sys-
tem harmonics are well-recognized. These eﬀects include: unsafe neutral current magnitudes in
three-phase systems, heating and reduction of life in transformers and induction motors, degra-
dation of system voltage waveforms, unsafe currents in power factor correction capacitors, and
malfunctioning of certain power system protection elements. In a real sense, conventional rec-
tiﬁers are harmonic polluters of the ac power distribution system. With the widespread deploy-
ment of electronic equipment in our society, rectiﬁer harmonics have become a signiﬁcant and
measurable problem. Thus there is a need for high-quality rectiﬁers, which operate with high
power factor, high eﬃciency, and reduced generation of harmonics. Several international stan-
dards now exist that speciﬁcally limit the magnitudes of harmonic currents, for both high-power
equipment such as industrial motor drives and low-power equipment such as electronic ballasts
for ﬂuorescent lamps and power supplies for oﬃce equipment.
This chapter treats the ﬂow of energy in power systems containing nonsinusoidal waveforms.
Average power, rms values, and power factor are expressed in terms of the Fourier series of the
voltage and current waveforms. Harmonic currents in three-phase systems are discussed, and
present-day standards are listed. The following chapters treat harmonics and harmonic mitiga-
tion in conventional line-commutated rectiﬁers, high-quality rectiﬁer circuits and their models,
and control of high-quality rectiﬁers.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_20
849

850 20 Power and Harmonics in Nonsinusoidal Systems
+Source Load
Surface S
+
v(t)
i(t)
Fig. 20.1 Observe the transmission of energy through surface S
20.1 Average Power
Let us consider the transmission of energy from a source to a load, through a given surface as
in Fig. 20.1. In the network of Fig. 20.1, the voltage waveform v(t) (not necessarily sinusoidal)
is given by the source, and the current waveform is determined by the response of the load. In
the more general case in which the source output impedance is signiﬁcant, then v(t) and i(t)
both depend on the characteristics of the source and load. Balanced three-phase systems may be
treated in the same manner, on a per-phase basis, using a line current and line-to-neutral voltage.
If v(t) and i(t) are periodic, then they may be expressed as Fourier series:
v(t)= V
0+
∞∑
n=1
Vn cos(nωt−ϕn) (20.1)
i(t)= I0+
∞∑
n=1
In cos(nωt−θn)
where the period of the ac line voltage waveform is deﬁned as T = 2π/ω. In general, the
instantaneous power p(t)= v(t)i(t) can assume both positive and negative values at various
points during the ac line cycle. Energy then ﬂows in both directions between the source and
load. It is of interest to determine the net energy transmitted to the load over one cycle, or
Wcycle=
∫ T
0
v(t)i(t) dt (20.2)
This is directly related to the average power as follows:
Pav= Wcycle
T = 1
T
∫ T
0
v(t)i(t) dt (20.3)
Let us investigate the relationship between the harmonic content of the voltage and current wave-
forms, and the average power. Substitution of the Fourier series, Eq. (20.1), into Eq. (20.3) yields
Pav= 1
T
∫ T
0
⎛⎜⎜⎜⎜⎜⎝V0+
∞∑
n=1
Vn cos (nωt−ϕn)
⎞⎟⎟⎟⎟⎟⎠
⎛⎜⎜⎜⎜⎜⎝I0+
∞∑
n=1
In cos (nωt−θn)
⎞⎟⎟⎟⎟⎟⎠dt (20.4)
To evaluate this integral, we must multiply out the inﬁnite series. It can be shown that the inte-
grals of cross-product terms are zero, and the only contributions to the integral comes from the
products of voltage and current harmonics of the same frequency:

20.1 Average Power 851
∫ T
0
(Vn cos(nωt−ϕn))( Im cos(mωt−θm)) dt=
⎧⎪⎪⎨⎪⎪⎩
0i f n/nequalm
VnIn
2 cos (ϕn−θn) if n= m (20.5)
The average power is therefore
Pav= V0I0+
∞∑
n=1
VnIn
2 cos (ϕn−θn) (20.6)
So net energy is transmitted to the load only when the Fourier series of v(t) and i(t) contain
terms at the same frequency. For example, if v(t) and i(t) both contain third harmonic, then net
energy is transmitted at the third harmonic frequency, with average power equal to
V3I3
2 cos (ϕ3−θ3) (20.7)
Here, V3I3/2 is equal to the rms volt-amperes of the third harmonic current and voltage. The
cos(φ3−θ3) term is a displacement term which accounts for the phase diﬀerence between the
third harmonic voltage and current.
Fig. 20.2 V oltage, current, and in-
stantaneous power waveforms, ex-
ample 1. The voltage contains only
fundamental and the current con-
tains only third harmonic. The av-
erage power is zero
v(t) i(t)
0
0.5
1
p(t) = v(t)i(t)
Pav = 0
0
0.5
1
Some examples of power ﬂow in systems containing harmonics are illustrated in Figs. 20.2
to 20.4. In example 1, Fig. 20.2, the voltage contains fundamental only, while the current con-
tains third harmonic only. It can be seen that the instantaneous power waveform p(t) has a zero
average value, and hence Pav is zero. Energy circulates between the source and load, but over
one cycle the net energy transferred to the load is zero. In example 2, Fig. 20.3, the voltage and
current each contain only third harmonic. The average power is given by Eq. (20.7) in this case.
In example 3, Fig. 20.4, the voltage waveform contains fundamental, third harmonic, and
ﬁfth harmonic, while the current contains fundamental, ﬁfth harmonic, and seventh harmonic,
as follows:

852 20 Power and Harmonics in Nonsinusoidal Systems
Fig. 20.3 V oltage, current, and in-
stantaneous power waveforms, ex-
ample 2. The voltage and current
each contain only third harmonic,
and are in phase. Net energy is
transmitted at the third harmonic
frequency
v(t), i(t)
0
0.5
1
0
0.5
1
p(t) = v(t)i(t)
Pav = 0.5
Fig. 20.4 V oltage, current, and
instantaneous power waveforms,
example 3. The voltage contains
fundamental, third, and ﬁfth
harmonics. The current contains
fundamental, ﬁfth, and seventh
harmonics. Net energy is transmit-
ted at the fundamental and ﬁfth
harmonic frequencies
v(t)
i(t)
0.0
0.5
1.0
p(t) = v(t)i(t)
Pav = 0.32
0.0
0.2
0.4
0.6
v(t)= 1.2 cos (ωt)+ 0.33 cos(3ωt)+ 0.2 cos (5ωt)
i(t)= 0.6 cos (ωt+ 30◦)+ 0.1 cos (5ωt+ 45◦)+ 0.1 cos(7ωt+ 60◦) (20.8)
Average power is transmitted at the fundamental and ﬁfth harmonic frequencies, since only
these frequencies are present in both waveforms. The average power is found by evaluation of

20.2 Root-Mean-Square (RMS) Value of a Waveform 853
Eq. (20.6); all terms are zero except for the fundamental and ﬁfth harmonic terms, as follows:
pav= (1.2)(0.6)
2 cos(30◦)+ (0.2)(0.1)
2 cos(45◦)= 0.32 (20.9)
The instantaneous power and its average are illustrated in Fig.20.4.
20.2 Root-Mean-Square (RMS) Value of a Waveform
The rms value of a periodic waveform v(t) with period T is deﬁned as
(rms value)=
√
1
T
∫ T
0
v2(t)dt (20.10)
The rms value can also be expressed in terms of the Fourier components. Insertion of Eq. (20.1)
into Eq. (20.10), and simpliﬁcation using Eq. (20.5), yields
(rms value)=
√
V2
0 +
∞∑
n=1
V2n
2 (20.11)
Again, the integrals of the cross-product terms are zero. This expression holds when the wave-
form is a current:
(rms current)=
√
I2
0+
∞∑
n=1
I2n
2 (20.12)
Thus, the presence of harmonics in a waveform always increases its rms value. In particular,
in the case where the voltage v(t) contains only fundamental while the current i(t) contains
harmonics, then the harmonics increase the rms value of the current while leaving the average
power unchanged. This is undesirable, because the harmonics do not lead to net delivery of
energy to the load, yet they increase the Irms 2R losses in the system.
In a practical system, series resistances always exist in the source, load, and/or transmission
wires, which lead to unwanted power losses obeying the expression
(rms current)2Rseries (20.13)
Examples of such loss elements are the resistance of ac generator windings, the resistance of the
wire connecting the source and load, the resistance of transformer windings, and the resistance
of semiconductor devices, and magnetics windings in switching converters. Thus, it is desired
to make the rms current as small as possible, while transferring the required amount of energy
and average power to the load.
Shunt resistances usually also exist, which cause power loss according to the relation
(rms voltage)2
Rshunt
(20.14)
Examples include the core losses in transformers and ac generators, and switching converter
transistor switching loss. Therefore, it is desired to also make the rms voltage as small as possi-
ble while transferring the required average power to the load.

854 20 Power and Harmonics in Nonsinusoidal Systems
20.3 Power Factor
Power factor is a ﬁgure-of-merit that measures how eﬀectively energy is transmitted between a
source and load network. It is measured at a given surface as in Fig.20.1, and is deﬁned as
power factor= (average power)
(rms voltage)(rms current) (20.15)
The power factor always has a value between zero and one. The ideal case, unity power factor,
occurs for a load that obeys Ohm’s Law. In this case, the voltage and current waveforms have
the same shape, contain the same harmonic spectrum, and are in phase. For a given average
power throughput, the rms current and voltage are minimized at maximum (unity) power factor,
that is, with a linear resistive load. In the case where the voltage contains no harmonics but the
load is nonlinear and contains dynamics, then the power factor can be expressed as a product of
two terms, one resulting from the phase shift of the fundamental component of the current, and
the other resulting from the current harmonics.
20.3.1 Linear Resistive Load, Nonsinusoidal Voltage
In this case, the current harmonics are in phase with, and proportional to, the voltage harmonics.
As a result, all harmonics result in the net transfer of energy to the load. The current harmonic
magnitudes and phases are
I
n= Vn
R (20.16)
θn= ϕn so cos(θn−ϕn)= 1 (20.17)
The rms voltage is again
(rms voltage)=
√
V2
0+
∞∑
n=1
V2n
2 (20.18)
and the rms current is
(rms current)=
√
I2
0+
∞∑
n=1
I2n
2 =
√
V2
0
R2 +
∞∑
n=1
V2n
2R2 (20.19)
= 1
R(rms voltage)
By use of Eq. (20.6), the average power is
Pav = V0I0+
∞∑
n=1
VnIn
2 cos(ϕn−θn)
= V2
0
R +
∞∑
n=1
V2
n
2R (20.20)
= 1
R(rms voltage)2

20.3 Power Factor 855
Insertion of Eqs. (20.19) and (20.20) into Eq. (20.15) then shows that the power factor is unity.
Thus, if the load is linear and purely resistive, then the power factor is unity regardless of the
harmonic content of v(t). The harmonic content of the load current waveform i(t) is identical to
that of v(t), and all harmonics result in the transfer of energy to the load. This raises the possi-
bility that one could construct a power distribution system based on nonsinusoidal waveforms
in which the energy is eﬃciently transferred to the load.
20.3.2 Nonlinear Dynamical Load, Sinusoidal Voltage
If the voltage v(t) contains a fundamental component but no dc component or harmonics, so
that V0 = V2 = V3 =... = 0, then harmonics in i(t) do not result in transmission of net energy
to the load. The average power expression, Eq. (20.6), becomes
Pav= V1I1
2 cos(ϕ1−θ1) (20.21)
However, the harmonics in i(t)d oaﬀect the value of the rms current:
(rms current)=
√
I2
0+
∞∑
n=1
I2n
2 (20.22)
Hence, as in example 1 (Fig. 20.2), harmonics cause the load to draw more rms current from
the source, but not more average power. Increasing the current harmonics does not cause more
energy to be transferred to the load, but does cause additional losses in series resistive elements
Rseries.
Also, the presence of load dynamics and reactive elements, which causes the phase of the
fundamental components of the voltage and current to di ﬀer by (θ1 −ϕ1), also reduces the
power factor. The cos(ϕ1−θ1) term in the average power Eq. (20.21) becomes less than unity.
However, the rms value of the current, Eq. ( 20.22), does not depend on the phase. So shifting
the phase of i(t) with respect tov(t) reduces the average power without changing the rms voltage
or current, and hence the power factor is reduced.
By substituting Eqs. ( 20.21) and (20.22)i n t o(20.15), we can express the power factor for
the sinusoidal voltage in the following form:
(power factor)=
⎛⎜⎜⎜
⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
I
1
√
2√
I2
0+
∞∑
n−1
I2
n
2
⎞⎟⎟⎟
⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(cos(ϕ
1−θ1)) (20.23)
= (distortion factor)(displacement factor)
So when the voltage contains no harmonics, then the power factor can be written as the product
of two terms. The ﬁrst, called the distortion factor, is the ratio of the rms fundamental compo-
nent of the current to the total rms value of the current
(distortion factor)=
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
I1
√
2√
I2
0+
∞∑
n=1
I2
n
2
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
= (rms fundamental current)
(rms current) (20.24)

856 20 Power and Harmonics in Nonsinusoidal Systems
THD
Distortion factor
0%
20%
40%
60%
80%
100%
70%
80%
90%
100%
Fig. 20.5 Distortion factor vs. total harmonic distortion
The second term of Eq. (20.23) is called the displacement factor, and is the cosine of the angle
between the fundamental components of the voltage and current waveforms.
The total harmonic distortion (THD) is deﬁned as the ratio of the rms value of the waveform
not including the fundamental, to the rms fundamental magnitude. When no dc is present, this
can be written as:
(THD)=
√∞∑
n=2
I2n
I1
(20.25)
The total harmonic distortion and the distortion factor are closely related. Comparison of Eqs.
(20.24) and (20.25), with I0= 0, leads to
(distortion factor)= 1√
1+ (THD)2
(20.26)
This equation is plotted in Fig. 20.5. The distortion factor of a waveform with a moderate
amount of distortion is quite close to unity. For example, if the waveform contains third har-
monic whose magnitude is 10% of the fundamental, the distortion factor is 99.5%. Increasing
the third harmonic to 20% decreases the distortion factor to 98%, and a 33% harmonic magni-
tude yields a distortion factor of 95%. So the power factor is not signiﬁcantly degraded by the
presence of harmonics unless the harmonics are quite large in magnitude.
An example of a case in which the distortion factor is much less than unity is the conven-
tional peak-detection rectiﬁer of Fig. 20.6. In this circuit, the ac line current consists of short-
duration current pulses occurring at the peak of the voltage waveform. The fundamental com-
ponent of the line current is essentially in phase with the voltage, and the displacement factor
is close to unity. However, the low-order current harmonics are quite large, close in magnitude
to that of the fundamental—a typical current spectrum is given in Fig. 20.7. The distortion fac-
tor of peak-detection rectiﬁers is usually in the range 55%–65%. The resulting power factor is
similar in value.
In North America, the standard 120 V power outlet is protected by a 15 A circuit breaker.
In consequence, the available load power is quite limited. Derating the circuit breaker current

20.3 Power Factor 857
Fig. 20.6 Conventional peak-detection rectiﬁer
100%
91%
73%
52%
32%
19% 15% 15% 13% 9%
0%
20%
40%
60%
80%
100%
13 579 1 1 1 3 1 5 1 7 1 9
Harmonic number
Harmonic amplitude,
percent of fundamental
THD = 136%
Distortion factor = 59%
Fig. 20.7 Typical ac line current spectrum of a single-phase peak-detection rectiﬁer. Harmonics 1 to 19
are shown
by 20%, assuming typical eﬃciencies for the dc–dc converter and peak- detection rectiﬁer, and
with a power factor of 55%, one obtains the following estimate for the maximum available dc
load power:
(ac voltage) (derated breaker current) (power factor) (rectiﬁer eﬃciency)
= (120V) (80% of15 A) (0 .55) (0 .98) (20.27)
= 776 W
The less-than-unity eﬃciency of a dc–dc converter would further reduce the available dc load
power. Using a peak-detection rectiﬁer to supply a load power greater than this requires that the
user installs higher amperage and/or higher voltage service, which is inconvenient and costly.
The use of a rectiﬁer circuit having nearly unity power factor would allow a signiﬁcant increase
in available dc load power:
(ac voltage) (derated breaker current) (power factor) (rectiﬁer eﬃciency)
= (120V) (80% of 15A) (0 .99) (0 .93) (20.28)
= 1325W
or almost twice the available power of the peak-detection rectiﬁer. This alone can be a com-
pelling reason to employ high-quality rectiﬁers in commercial systems.

858 20 Power and Harmonics in Nonsinusoidal Systems
Real axis
Imaginary
axis
V
I
S = VI*
||S|| = Vrms
Irms
1 1
1 1
1 1
P
Q
Fig. 20.8 Power phasor diagram for a sinusoidal system, illustrating the voltage, current, and complex
power phasors
20.4 Power Phasors in Sinusoidal Systems
The apparent power is deﬁned as the product of the rms voltage and rms current. Apparent
power is easily measured—it is simply the product of the readings of a voltmeter and ammeter
placed in the circuit at the given surface. Many power system elements, such as transformers,
must be rated according to the apparent power that they are able to supply. The unit of apparent
power is the volt-ampere, or V A. The power factor, deﬁned in Eq. (20.15), is the ratio of average
power to apparent power.
In the case of sinusoidal voltage and current waveforms, we can additionally deﬁne the
complex power S and the reactive power Q. If the sinusoidal voltage v(t) and current i(t) can
be represented by the phasors V and I, then the complex power is a phasor deﬁned as
S= VI
∗= P+ jQ (20.29)
Here, I∗is the complex conjugate of I, and j is the square root of−1. The magnitude of S,o r
∥S∥, is equal to the apparent power, measured in V A. The real part ofS is the average power P,
having units of watts. The imaginary part of S is the reactive power Q, having units of reactive
volt-amperes, or V ARs.
A phasor diagram illustrating S, P, and Q, is given in Fig. 20.8. The angle (ϕ1−θ1)i st h e
angle between the voltage phasor V and the current phasor I.(ϕ1−θ1) is additionally the phase
of the complex power S. The power factor in the purely sinusoidal case is therefore
power factor= P
∥S∥= cos(ϕ1−θ1) (20.30)
It should be emphasized that this equation is valid only for systems in which the voltage and
current are purely sinusoidal. The distortion factor of Eq. ( 20.24) then becomes unity, and the
power factor is equal to the displacement factor as in Eq. (20.30).
The reactive power Q does not lead to net transmission of energy between the source and
load. When reactive power is present, the rms current and apparent power are greater than
the minimum amount necessary to transmit the average power P. In an inductor, the current

20.5 Harmonic Currents in Three-Phase Systems 859
lags the voltage by 90◦, causing the displacement factor to be zero. The alternate storing and
releasing of energy in an inductor leads to current ﬂow and nonzero apparent power, but the
average power P is zero. Just as resistors consume real (average) power P, inductors can be
viewed as consumers of reactive power Q. In a capacitor, the current leads to voltage by 90 ◦,
again causing the displacement factor to be zero. Capacitors supply reactive power Q, and are
commonly placed in the utility power distribution system near inductive loads. If the reactive
power supplied by the capacitor is equal to the reactive power consumed by the inductor, then
the net current (ﬂowing from the source into the capacitor-inductive-load combination) will be
in phase with the voltage, leading unity power factor and minimum rms current magnitude.
It will be seen in the next chapter that phase-controlled rectiﬁers produce a nonsinusoidal
current waveform whose fundamental component lags the voltage. This lagging current does
not arise from energy storage, but it does nonetheless lead to a reduced displacement factor,
and to rms current and apparent power that are greater than the minimum amount necessary to
transmit the average power.
20.5 Harmonic Currents in Three-Phase Systems
The presence of harmonic currents can also lead to some special problems in three-phase sys-
tems. In a four-wire three-phase system, harmonic currents can lead to large currents in the
neutral conductors, which may easily exceed the conductor rms current rating. Power factor
correction capacitors may experience signiﬁcantly increased rms currents, causing them to fail.
In this section, these problems are examined, and the properties of harmonic current ﬂow in
three-phase systems are derived.
20.5.1 Harmonic Currents in Three-Phase Four-Wire Networks
Let us consider the three-phase four-wire network of Fig. 20.9. In general, we can express the
Fourier series of the line currents and line-neutral voltages as follows:
i
a(t)= Ia0+
∞∑
k=1
Iak cos(kωt−θak)
ib(t)= Ib0+
∞∑
k=1
Ibk cos(k(ωt−120◦)−θbk) (20.31)
ic(t)= Ic0+
∞∑
k=1
Ick cos(k(ωt+ 120◦)−θck)
van(t)= Vm cos(ωt)
vbn(t)= Vm cos(ωt−120◦) (20.32)
vCn(t)= Vm cos(ωt+ 120◦)

860 20 Power and Harmonics in Nonsinusoidal Systems
+
+
+
van(t)
vbn(t)
vcn(t)
a
c
b
nIdeal
source
Nonlinear
loads
Neutral connection
ia(t)
ic(t)
in(t)
ib(t)
Fig. 20.9 Current ﬂow in a three-phase four-wire network
The neutral current is therefore in= ia+ ib+ ic,o r
in(t)= Ia0+ Ib0+ Ic0+
∞∑
k=1
[Iak cos(kωt−θak)+ Ibk cos(k(ωt−120◦)−θbk)+ Ick cos(k(ωt+ 120◦)−θck)](20.33)
When the load is unbalanced (even though the voltages are balanced and undistorted), we can
say little else about the neutral and line currents. If the load is unbalanced and nonlinear, then
the line and neutral currents may contain harmonics of any order, including even and triplen
harmonics.
Equation ( 20.33) is considerably simpliﬁed in the case where the loads are balanced. A
balanced nonlinear load is one in which I
ak = Ibk = Ick = Ik and θak = θbk = θck = θk, for all
k; that is, the harmonics of the three phases all have equal amplitudes and phase shifts. In this
case, Eq. (20.33) reduces to
in(t)= 3I0+
∞∑
k=3,6,9,···
3Ik cos(kωt−θk) (20.34)
Hence, the fundamental and most of the harmonics cancel out, and do not appear in the neutral
conductor. Thus, it is in the interests of the utility to balance their nonlinear loads as well as
their harmonics.
But not all of the harmonics cancel out of Eq. ( 20.34) :t h ed ca n d triplen (triple-n,o r
3, 6, 9,... ) harmonics add rather than cancel. The rms neutral current is
in,rms= 3
√
I2
0+
∞∑
k=3,6,9,···
I2
k
2 (20.35)
Example
A balanced nonlinear load produces line currents containing fundamental and 20% third
harmonic: ian(t)= I1 cos(ωt−θ1)+ 0.2I1 cos(3ωt−θ3). Find the rms neutral current, and
compare its amplitude to the rms line current amplitude.

20.5 Harmonic Currents in Three-Phase Systems 861
Solution:
in,rms = 3
√
(0.2I1)2
2 = 0.6I1
√
2
i1,rms =
√
I2
1+ (0.2I1)2
2 = I1
√
2
√
1+ 0.04≈I1
√
2
(20.36)
So the neutral current magnitude is 60% of the line current magnitude! The triplen harmonics in
the three phases add, such that 20% third harmonic leads to 60% third harmonic neutral current.
Yet the presence of the third harmonic has very little eﬀect on the rms value of the line current.
Signiﬁcant unexpected neutral current ﬂows.
20.5.2 Harmonic Currents in Three-Phase Three-Wire Networks
If there is no neutral connection to the wye-connected load, as in Fig. 20.10, then in(t)m u s t
be zero. If the load is balanced, then Eq. ( 20.34) still applies, and therefore the dc and triplen
harmonics of the load currents must be zero. Therefore, the line currents ia, ib, and ic cannot
contain triplen or dc harmonics. What happens is that a voltage is induced at the load neutral
point n′, containing dc and triplen harmonics, which eliminates the triplen and dc load current
harmonics.
This result is true only when the load is balanced. With an unbalanced load, all harmonics
can appear in the line currents, including triplen and dc. In practice, the load is never exactly
balanced, and some small amounts of third harmonic line currents are measured.
With a delta-connected load as in Fig. 20.11, there is also no neutral connection, so the line
currents cannot contain triplen or dc components. But the loads are connected line-to-line, and
are excited by undistorted sinusoidal voltages. Hence triplen harmonic and dc currents do, in
general, ﬂow through the nonlinear loads. Therefore, these currents simply circulate around the
delta. If the load is balanced, then again no triplen harmonics appear in the line currents.
+
+
+
van(t)
vbn(t)
vcn(t)
a
c
b
nIdeal
source
Nonlinear
loads
ia(t)
ic(t)
in(t) = 0
ib(t)
+
vn'n
n'
Fig. 20.10 Current ﬂow in a three-phase three-wire wye-connected network

862 20 Power and Harmonics in Nonsinusoidal Systems
+
+
+
van(t)
vbn(t)
vcn(t)
a
c
b
nIdeal
source
Delta-
connected
nonlinear
loads
ia(t)
ic(t)
in(t) = 0
ib(t)
Fig. 20.11 A balanced nonlinear delta-connected load may generate triplen current harmonics. These
harmonics circulate around the delta, but do not ﬂow through the lines if the load phases are balanced
20.5.3 Harmonic Current Flow in Power Factor Correction Capacitors
Harmonic currents tend to ﬂow through shunt-connected power factor correction capacitors. To
some extent, this is a good thing because the capacitors tend to low-pass ﬁlter the power sys-
tem currents, and prevent nonlinear loads from polluting the entire power system. The ﬂow of
harmonic currents is then conﬁned to the nonlinear load and local power factor correction ca-
pacitors, and voltage waveform distortion is reduced. High-frequency harmonic currents tend to
ﬂow through shunt capacitors because the capacitor impedance decreases with frequency, while
the inductive impedance of transmission lines increases with frequency. In this sense, power fac-
tor correction capacitors mitigate the eﬀects of harmonic currents arising from nonlinear loads
in much the same way that they mitigate the eﬀects of reactive currents that arise from inductive
loads.
esr
C
Fig. 20.12 Capacitor
equivalent circuit. Losses
are modeled by an equiv-
alent series resistance
(ESR)
But the problem is that the power factor correction capacitors
may not be rated to handle these harmonic currents, and hence there
is a danger that the capacitors may overheat and fail when they are
exposed to signiﬁcant harmonic currents. The loss in capacitors is
modeled using an equivalent series resistance (ESR) as shown in
Fig. 20.12. The ESR models dielectric loss (hysteresis of the dielec-
tric D−E loop), contact resistance, and foil and lead resistances.
Power loss occurs, equal to i
rms 2(esr). Dielectric materials are typi-
cally poor conductors of heat, so a moderate amount of power loss
can cause a large temperature rise in the center of the capacitor. In
consequence, the rms current must be limited to a safe value.
Typical power factor correction capacitors are rated by voltageV,
frequency f , and reactive power in kV ARs. These ratings are com-
puted from the capacitance C and safe rms current I
rms, assuming
undistorted sinusoidal waveforms, as follows:
rated rms voltageVrms= Irms
2πfC (20.37)

20.5 Harmonic Currents in Three-Phase Systems 863
rated rms voltage= I2
rms
2πfC (20.38)
In an undistorted system, the rms current, and hence also the capacitor ESR loss, cannot in-
crease unless the rms voltage is also increased. But high-frequency harmonics can lead to larger
rms currents without an increased voltage. Any harmonics that ﬂow result in increased rms cur-
rent beyond the expected value predicted by Eq. (20.37). If the capacitor is not rated to handle
additional power loss, then failure or premature aging can occur.
Problems
20.1 Passive rectiﬁer circuit. In the passive rectiﬁer circuit of Fig. 20.13, L is very large, such
that the inductor current i(t) is essentially dc. All components are ideal.
+
vR(t)
+
V
ig(t)
S1 S2
L
C R
40 
vg(t)
230 Vrms
50 Hz
i(t)
Fig. 20.13 Passive rectiﬁer circuit of Problem 20.1
(a) Determine the dc output voltage, current, and power.
(b) Sketch the ac line current waveform ig(t) and the rectiﬁer output voltage waveform
vR(t).
(c) Determine the ac line current rms magnitude, fundamental rms magnitude, and third
harmonic rms magnitude. If it is required that the third harmonic magnitude be less
than 2.3 A rms, would this rectiﬁer network conform?
(d) Determine the power factor, measured at surfaces S
1 and S 2.
20.2 The three-phase rectiﬁer of Fig. 20.14 is connected to a balanced 60 Hz 3ø ac480V (rms,
line-line) sinusoidal source as shown. All elements are ideal. The inductance L is large,
such that the current i(t) is essentially constant, with negligible 360 Hz ripple.
(a) Sketch the waveform vd(t).
(b) Determine the dc output voltage V
(c) Sketch the line current waveforms ia(t), ib(t), and ic(t).
(d) Find the Fourier series of ia(t).
(e) Find the distortion factor, displacement factor, power factor, and line current THD.

864 20 Power and Harmonics in Nonsinusoidal Systems
+
vd(t)
Li(t)
C R
20 
+
V
ia(t)
ib(t)
ic(t)
a
b
c
Balanced
480 V
Fig. 20.14 Three-phase rectiﬁer circuit of Problem 20.2
20.3 Harmonic pollution police. In the network of Fig. 20.15, voltage harmonics are observed
at the indicated surface. The object of this problem is to decide whether to blame the
source or the load for the observed harmonic pollution. Either the source element or the
load element contains a nonlinearity that generates harmonics, while the other element is
linear.
+
daoLecruoS
vs(t)
Surface
S
+
v(t)
i(t)
Z1
Z2
Fig. 20.15 Single-phase power system of Problems 20.3 to 20.5
(a) Consider ﬁrst the case where the load is a passive linear impedance Z2(s), and hence
its phase lies in the range −90◦≤∠Z2(iω)≤+90◦for all positive ω. The source
generates harmonics. Express the average power P in the form
P=
∞∑
n=0
Pn
where Pn is the average power transmitted to the load by harmonic number n. What
can you say about the polarities of the Pns?
(b) Consider next the case where the load is nonlinear, while the source is linear and can
be modeled by a Thevenin-equivalent sinusoidal voltage source and linear impedance
Z1(s). Again express the average power P as a sum of average powers, as in part (a).
What can you say about the polarities of the Pns in this case?
(c) The following Fourier series are measured:

20.5 Harmonic Currents in Three-Phase Systems 865
Harmonic number v(t) i(t)
Magnitude Phase Magnitude Phase
1 230 V 0 ◦ 6A −20◦
3 20 V 180 ◦ 4A 2 0 ◦
58 V 6 0 ◦ 1A −110◦
Who do you accuse? Explain your reasoning.
20.4 For the network and waveforms of Problem 20.3, determine the power factor at the indi-
cated surface, and the average power ﬂowing to the load. Harmonics higher in frequency
than the ﬁfth harmonic are negligible in magnitude.
20.5 Repeat Problem 20.3(c), using the following Fourier series:
Harmonic number v(t) i(t)
Magnitude Phase Magnitude Phase
1 120 V 0 ◦ 5A 2 5 ◦
34 V 6 0 ◦ 0.5 A 40 ◦
52 V −160◦ 0.2 A −100◦
20.6 A balanced three-phase wye-connected load is constructed using a 20 Ωresistor in each
phase. This load is connected to a balanced three-phase wye-connected voltage source,
whose fundamental voltage component is 380 Vrms line-to-line. In addition, each (line-to-
neutral) voltage source produces third and ﬁfth harmonics. Each harmonic has amplitude
20 Vrms, and is in phase with the (line-to-neutral) fundamental.
(a) The source and load neutral points are connected, such that a four-wire system is
obtained. Find the Fourier series of the line currents and the neutral current.
(b) The neutral connection is broken, such that a three-wire system is obtained. Find the
Fourier series of the line currents. Also ﬁnd the Fourier series of the voltage between
the source and load neutral points.
```
