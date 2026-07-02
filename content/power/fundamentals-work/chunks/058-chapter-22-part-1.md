---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第22章part 1 - 22 Resonant Conversion
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 931-950 > Chunk ID: `chapter-22-part-1`"
---

# 第22章part 1 - 22 Resonant Conversion

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 931-950  
> Chunk ID: `chapter-22-part-1`

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
22
Resonant Conversion
Part VI of this text deals with a class of converters whose operation di ﬀers signiﬁcantly from
the PWM converters covered in PartsI to V. Resonant power converters[272, 295–329] contain
resonant L–C networks whose voltage and current waveforms vary sinusoidally during one or
more subintervals of each switching period. These sinusoidal variations are large in magnitude,
and hence the small-ripple approximation introduced in Chap. 2 does not apply.
Dc-to-high-frequency-ac inverters are required in a variety of applications, including wire-
less power transfer, electronic ballasts for gas-discharge lamps [ 296, 297], induction heating
and cooking, electrosurgical generators, and applications employing piezoelectric transformers
or actuators. These applications typically require generation of a sinusoid of tens or hundreds
of kHz, having moderate or low total harmonic distortion. A simple resonant inverter system is
illustrated in Fig. 22.1a. A switch network produces a square wave voltage vs(t). As illustrated
in Fig. 22.2, the spectrum of vs(t) contains fundamental plus odd harmonics. This voltage is
applied to the input terminals of a resonant tank network. The tank network resonant frequency
f0 is tuned to the fundamental component ofvs(t), that is, to the switching frequency fs, and the
tank exhibits negligible response at the harmonics of fs. In consequence, the tank current is(t),
as well as the load voltage v(t) and load current i(t), have essentially sinusoidal waveforms of
frequency fs, with negligible harmonics. By changing the switching frequency fs (closer to or
further from the resonant frequency f0), the magnitudes of is(t), v(t), and i(t) can be controlled.
Other schemes for control of the output voltage, such as phase-shift control of the bridge switch
network, are also possible. A variety of resonant tank networks can be employed; Fig. 22.1b–e
illustrate the well-known series, parallel, LCC, and LLC tank networks. Inverters employing
the series resonant tank network are known as the series resonant,o r series loaded,i n v e r t e r .I n
the parallel resonant or parallel loaded inverter, the load voltage is equal to the resonant tank
capacitor voltage. The LCC inverter employs tank capacitors both in series and in parallel with
the load, while the LLC inverter employs both series and shunt tank inductors.
Figure 22.3 illustrates a high-frequency inverter of an electronic ballast for a gas-discharge
lamp. A half-bridge conﬁguration of the LCC inverter drives the lamp with an approximately
sinusoidal high-frequency ac waveform. The converter is controlled to provide a relatively high
voltage to start the lamp, and a lower voltage thereafter. When the ballast is powered by the ac
utility, a low-harmonic rectiﬁer typically provides the input dc voltage for the inverter.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_22
933

934 22 Resonant Conversion
(a)
Resonant tank network
Resistive
load
R
is(t) i(t)
v(t)
+
+dc
source
vg(t)
vs(t)
+
Switch network
LC s
Cp
NS NT
(b)
Series tank network
LC s
(c)
Parallel tank network
L
Cp
(d)
LCC tank network
LC s
Cp
(e)
LLC tank network
CLs
Lp
Fig. 22.1 A basic class of resonant inverters that consist of (a) a switch network NS that drives a resonant
tank network NT near resonance. Several common tank networks: (b) series, (c) parallel, (d) LCC,( e) LLC
A resonant dc–dc converter can be constructed by rectifying and ﬁltering the ac output
of a resonant inverter. Figure 22.4 illustrates a series resonant dc–dc converter, in which the
approximately sinusoidal resonant tank output currentiR(t) is rectiﬁed by a diode bridge rectiﬁer,
and ﬁltered by a large capacitor to supply a dc load having current I and voltage V.A g a i n ,b y
variation of the switching frequency fs (closer to or further from the resonant frequency f0),
the magnitude of the tank current iR(t), and hence also the dc load current I, can be controlled.
Resonant dc–dc converters based on series, parallel, LCC, and other resonant tank networks
are well understood. These converters are employed when specialized application requirements

22 Resonant Conversion 935
Fig. 22.2 The tank network responds
primarily to the fundamental component
of the applied waveforms
f
Switch
output
voltage
spectrum
Resonant
tank
response
Tank
current
spectrum
ffs 3fs 5fs
ffs 3fs 5fs
fs 3fs 5fs
+
Fig. 22.3 Half-bridge LLC inverter circuit, as an electronic ballast for a gas-discharge lamp
justify their use. For example, they are commonly employed in high-voltage dc power supplies
[298, 299], because the substantial leakage inductance and winding capacitance of high-voltage
transformers leads unavoidably to a resonant tank network. The same principle can be employed
to construct resonant link inverters or resonant link cycloconverters [ 300–302]; controllable
switch networks are then employed on both sides of the resonant tank network.
Figure 22.5 illustrates another approach to resonant power conversion, in which resonant
elements are inserted into the switch network of an otherwise-PWM converter. A resonant
switch network, or quasi-resonant converter, is then obtained. For example, in Fig. 22.5b, res-
onant elements Lr and Cr are combined with the switch network transistor and diode. The
resonant frequency of these elements is somewhat higher than the switching frequency. This
causes the switch network waveformsi1(t) and v2(t) to become quasi-sinusoidal pulses. The res-
onant switch network of Fig.22.5b can replace the PWM switch network of Fig.22.5a in nearly
any PWM converter. For example, insertion of the resonant switch network of Fig. 22.5bi n t o
the converter circuit of Fig. 22.5c leads to a quasi-resonant buck converter. Numerous resonant

936 22 Resonant Conversion
iR(t)
vR(t)
+
+
Transfer function
H(s)
R
+
v(t)
Resonant tank network
is(t)
dc
source
vg(t)
vs(t)
+
Switch network
LC s
NS NT
i(t)
Rectifier network
NR NF
Low-pass
filter
network
dc
load
Fig. 22.4 Derivation of a resonant dc–dc converter, by rectiﬁcation and ﬁltering of the output of a reso-
nant inverter
switch networks are known, which lead to a large number of resonant switch versions of buck,
boost, buck–boost, and other converters. Quasi-resonant converters are described in Chap.23.
The chief advantage of resonant converters is their reduced switching loss, via mechanisms
known as zero-current switching (ZCS), and zero-voltage switching (ZVS). The turn-on and/or
turn-oﬀtransitions of the various converter semiconductor elements can occur at zero crossings
of the resonant converter quasi-sinusoidal waveforms. This eliminates some of the switching
loss mechanisms described in Chap.4. Hence, switching loss is reduced, and resonant converters
can operate at switching frequencies that are higher than in comparable PWM converters. Zero-
voltage switching can also eliminate some of the sources of converter-generated electromagnetic
interference.
Resonant converters exhibit several disadvantages. Although the resonant element values
can be chosen such that good performance with high eﬃciency is obtained at a single operating
point, typically it is di ﬃcult to optimize the resonant elements such that good performance
is obtained over a wide range of load currents and input voltages. Signiﬁcant currents may
circulate through the tank elements, even when the load is removed, leading to poor eﬃciency
at light load. Also, the quasi-sinusoidal waveforms of resonant converters exhibit greater peak
values than those exhibited by the rectangular waveforms of PWM converters, provided that
the PWM current spikes due to diode stored charge are ignored. For these reasons, resonant
converters exhibit increased conduction losses and tank inductor losses, which can oﬀset their
reduced switching losses.
In this chapter, the properties of the series, parallel, and other resonant inverters and dc–
dc converters are investigated using the sinusoidal approximation [296, 303–305]. Harmonics
of the switching frequency are neglected, and the tank waveforms are assumed to be purely
sinusoidal. This allows simple equivalent circuits to be derived for the bridge inverter, tank,
rectiﬁer, and output ﬁlter portions of the converter, whose operation can be understood and
solved using standard linear ac analysis. This intuitive approach is quite accurate for operation
in the continuous conduction mode with a high-Q response, but becomes less accurate when the
tank is operated with a low Q-factor or for operation of dc–dc resonant converters in or near the
discontinuous conduction mode.

22 Resonant Conversion 937
(a)
+
v2(t)
i1(t) i2(t)
+
v1(t)
PWM switch network
(b)
+
v1(t)
+
v2(t)
i1(t) i2(t)
Lr
Cr
ZCS quasi-resonant
switch network
(c)
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
network
+
v1(t)
Fig. 22.5 Derivation of a quasi-resonant converter: ( a) conventional PWM switch network, ( b)aZ C S
quasi-resonant switch network, ( c) a quasi-resonant buck converter is obtained by employing a quasi-
resonant switch network such as (b) in a buck converter
For dc–dc resonant converters, the important result of this approach is that the dc voltage
conversion ratio of a continuous conduction mode resonant converter is given approximately
by the ac transfer function of the tank circuit, evaluated at the switching frequency. The tank
is loaded by an eﬀective output resistance, having a value nearly equal to the output voltage
divided by the output current. It is thus quite easy to determine how the tank components and
circuit connections aﬀect the converter behavior. The inﬂuence of tank component losses, trans-
former nonidealities, etc., on the output voltage and converter eﬃciency can also be found. Sev-
eral resonant network theorems are presented, which allow the load dependence of conduction
loss and of the zero-voltage-or zero-current-switching properties to be explained in a simple
and intuitive manner.
It is found that the series resonant converter operates with a step-down voltage conversion
ratio. With a 1:1 transformer turns ratio, the dc output voltage is ideally equal to the dc input volt-
age when the transistor switching frequency is equal to the tank resonant frequency. The output
voltage is reduced as the switching frequency is increased or decreased away from resonance.
On the other hand, the parallel resonant converter is capable of both step-up and step-down of
voltage levels, depending on the switching frequency and the eﬀective tank Q-factor. The exact
steady-state solutions of the ideal series and parallel resonant dc–dc converters are stated in
Sect. 22.5.
Zero-voltage switching and zero-current switching mechanisms of the series resonant con-
verter are described in Sect. 22.3. In Sect. 22.4, the dependence of resonant inverter properties
on load is examined. A simple frequency-domain approach explains why some resonant con-

938 22 Resonant Conversion
verters, over certain ranges of operating points, exhibit large circulating tank currents and low
eﬃciency. The boundaries of zero-voltage switching and zero-current switching are also deter-
mined.
It is also possible to modify the PWM converters of the previous chapters, so that zero-
current or zero-voltage switching is obtained. A number of diverse approaches are known that
lead to soft switching in buck, boost, forward, ﬂyback, bridge, and other topologies. Chapter23
summarizes some of the well-known schemes, including resonant switches, quasi-square wave
switches, the full-bridge zero-voltage transition converter, and zero-voltage switching in for-
ward and ﬂyback converters containing active-clamp snubbers. A detailed description of soft-
switching mechanisms of diodes, MOSFETs, and IGBTs is also given.
22.1 Sinusoidal Analysis of Resonant Converters
Consider the class of resonant converters that contain a controlled switch networkNs that drives
a linear resonant tank network NT . In a resonant inverter, the tank network drives a resistive
load as in Fig. 22.1. The reactive component of the load impedance, if any, can be e ﬀectively
incorporated into the tank network. In the case of a resonant dc–dc converter, the resonant tank
network is connected to an uncontrolled rectiﬁer network NR, ﬁlter network NF and load R,a s
illustrated in Fig. 22.4. Many well-known converters can be represented in this form, including
the series, parallel, LCC, and LLC topologies.
In the most common modes of operation, the controlled switch network produces a square
wave voltage output vs(t) whose frequency fs is close to the tank network resonant frequency
f0. In response, the tank network rings with approximately sinusoidal waveforms of frequency
fs. In the case where the resonant tank responds primarily to the fundamental component fs of
the switch waveform vs(t), and has negligible response at the harmonic frequencies nf s, n= 3,
5, 7,... , then the tank waveforms are well approximated by their fundamental components. As
shown in Fig. 22.2, this is indeed the case when the tank network contains a high- Q resonance
at or near the switching frequency, and a low-pass characteristic at higher frequencies. Hence,
let us neglect harmonics, and compute the relationships between the fundamental components
of the tank terminal waveforms vs(t), is(t), iR(t), and vR(t).
22.1.1 Controlled Switch Network Model
is(t)
+vg vs(t)
+
Switch network
NS
1
2
1
2
Fig. 22.6 An ideal switch network
If the switch network of Fig. 22.6 is controlled to produce a
square wave of frequency fs =ωs/2πas in Fig. 22.7, then
its output voltage waveform vs(t) can be expressed in the
Fourier series
vs(t)= 4Vg
π
∑
n=1,3,5,...
1
n sin(nωst) (22.1)
The fundamental component is
vs1(t)= 4Vg
πsin(ωst)= Vs1 sin(ωst) (22.2)

22.1 Sinusoidal Analysis of Resonant Converters 939
Fig. 22.7 Switch network voltage vs(t)
and its fundamental component vs1(t) t
vs(t)
Fundamental component
Vg
g
4 Vg
vs1(t)π
Fig. 22.8 Switch network waveforms
is(t)a n dig(t)
st
is(t)
ig(t)
s
Is1
which has a peak amplitude of (4 /π) times the dc input voltage Vg, and is in phase with the
original square wavevs(t). Hence, the switch network output terminal is modeled as a sinusoidal
voltage generator, vs1(t).
It is also of interest to model the converter dc input port. This requires computation of the
dc component Ig of the switch input current ig(t). The switch input current ig(t) is equal to the
output current is(t) when the switches are in position 1, and its inverse−is(t) when the switches
are in position 2. Under the conditions described above, the tank rings sinusoidally and is(t)i s
well approximated by a sinusoid of some peak amplitude Is1 and phaseϕs:
is(t)≈Is1 sin(ωst−ϕs) (22.3)
The input current waveform is shown in Fig.22.8.
The dc component, or average value, of the input current can be found by averaging ig(t)
over one half-switching period:
⟨ig(t)⟩Ts = 2
Ts
∫ Ts/2
0
ig(τ)dτ
≈2
Ts
∫ Ts/2
0
Is1 sin(ωsτ−ϕs)dτ
= 2
πIs1 cos(ϕs) (22.4)
Thus, the dc component of the converter input current depends directly on the peak amplitude
of the tank input current Is1 and on the cosine of its phase shiftϕs.

940 22 Resonant Conversion
+
+
vg
vs1(t)=
4Vg
sin ( st)
2Is1 cos ( s)
is1(t) =
Is1 sin ( s s)
Fig. 22.9 An equivalent circuit for the switch network, which models the fundamental component of the
output voltage waveform and the dc component of the input current waveform
An equivalent circuit for the switch is given in Fig.22.9. This circuit models the basic energy
conversion properties of the switch: the dc power supplied by the voltage sourceVg is converted
into ac power at the switch output. Note that the dc power at the source is the product ofVg and
the dc component ofig(t), and the ac power at the switch is the average ofvs(t)is(t). Furthermore,
if the harmonics of vs(t) are negligible, then the switch output voltage can be represented by its
fundamental component, a sinusoid vs1(t) of peak amplitude 4 Vg/π. It can be veriﬁed that the
switch network dc input power and fundamental average output power, predicted by Fig. 22.9,
are equal.
22.1.2 Modeling the Rectiﬁer and Capacitive Filter Networks
In the series resonant dc–dc converter, the output rectiﬁer is driven by the nearly sinusoidal tank
output current iR(t). A large capacitor CF is placed at the dc output, so that the output voltage
v(t) contains negligible harmonics of the switching frequency fs, as shown in Fig.22.10. Hence,
we can make the small-ripple approximation as usual: v(t)≈V, i(t)≈I. The diode rectiﬁers
switch when iR(t) passes through zero, as shown in Fig.22.11. The rectiﬁer input voltagevR(t)i s
essentially a square wave, equal to+v(t) when iR(t) is positive and−v(t) when iR(t)i sn e g a t i v e .
Note that vR(t) is in phase with iR(t).
If the tank output current iR(t) is a sinusoid with peak amplitude IR1 and phase shiftϕR:
iR(t)= IR1 sin(ωst−ϕR) (22.5)
Fig. 22.10 Uncontrolled rectiﬁer with ca-
pacitive ﬁlter network, as in the series res-
onant converter
iR(t)
R
+
v(t)
i(t)
Rectifier network
NR NF
Low-pass
filter
network
dc
load
+
vR(t)
| iR(t) |

22.1 Sinusoidal Analysis of Resonant Converters 941
(a) vR(t)V
iR(t)
st
R
(b)
iR1(t)
vR1(t)
fundamental
4 V
iR1(t)= vR1(t)
Re
Re = 8
2 R
st
R
Fig. 22.11 Rectiﬁer network input terminal waveforms: (a) actual waveforms vR(t)a n diR(t), (b) funda-
mental components vR1(t)a n diR1(t)
then the rectiﬁer input voltage may be expressed in the Fourier series
vR(t)= 4V
π
∞∑
n=1,3,5,···
1
n sin(nωst−ϕR) (22.6)
whereϕR is the phase shift of iR(t), with respect to vs(t). This voltage waveform is impressed on
the output port of the resonant tank network. Again, if the tank network responds primarily to the
fundamental component ( fs)o f vR(t), and has negligible response at the harmonic frequencies
nf s, n= 3, 5, 7... , then the harmonics of vR(t) can be ignored. The voltage waveform vR(t)i s
then well approximated by its fundamental component vR1(t):
vR1(t)= 4V
πsin(ωst−ϕR)= VR1 sin(ωst−ϕR) (22.7)
The fundamental voltage componentvR1(t) has a peak value of (4/π) times the dc output voltage
V, and is in phase with the current iR(t).
Re= 8
π2 R
The rectiﬁed tank output current,|iR(t)|, is ﬁltered by capacitor CF . Since no dc current can pass
through CF , the dc component of |iR(t)| must be equal to the steady-state load current I.B y
equating dc components we obtain
I= 2
Ts
∫ Ts/2
0
IR1| sin(ωst−ϕR)|dt
= 2
πIR1 (22.8)
Therefore, the load current and the tank output current amplitudes are directly related in steady
state.
Since vR1(t), the fundamental component of vR(t) is in phase with iR(t), the rectiﬁer presents
an eﬀective resistive load Re to the tank circuit. The value of Re is equal to the ratio of vR1(t)t o
iR(t). Division of Eq. (22.7)b yE q .(22.5), and elimination of IR1 using Eq. (22.8) yields

942 22 Resonant Conversion
Fig. 22.12 An equivalent circuit for the rectiﬁer
and ﬁlter network, which models the fundamental
components of the rectiﬁer ac input waveforms and
the dc components of the load waveforms. The rec-
tiﬁer presents an eﬀective resistive load R
e to the
tank network
iR1(t)
RRe
2 IR1
Re = 8
2 R
+
vR1(t)
+
V
I
Re= vR1(t)
iR(t) = 8
π2
V
I (22.9)
With a resistive load R equal to V/I, this equation reduces to
Re= 8
π2 R= 0.8106R (22.10)
Thus, the tank network is damped by an eﬀective load resistance Re equal to 81% of the actual
load resistance R. An equivalent circuit that models the rectiﬁer network input port fundamental
components and output port dc components is given in Fig. 22.12.
22.1.3 Resonant Tank Network
We have postulated that the eﬀects of harmonics can be neglected, and we have consequently
shown that the bridge can be modeled as a fundamental voltage source vs1(t). In the case of a
dc–dc converter, the rectiﬁer can be modeled using an eﬀective resistor of valueRe. We can now
solve the resonant tank network by standard linear analysis.
As shown in Fig.22.13, the tank circuit is a linear network with the following voltage trans-
fer function: vR1(s)
vs1(s)= H(s) (22.11)
Hence, the ratio VR1/Vs1 of the peak magnitudes of vR1(t) and vs1(t) is given by
VR1
Vs1
=∥H(s)∥s= jωs (22.12)
Fig. 22.13 The linear tank network, ex-
cited by an e ﬀective sinusoidal input
source and driving an e ﬀective resistive
load Resonant
network
is1(t) iR1(t)
Transfer function
H(s)
+ Re
Zi
+
vR1(t)vs1(t)

22.1 Sinusoidal Analysis of Resonant Converters 943
In addition, iR(s)i sg i v e nb y
iR(s)= vR1(s)
Re
= H(s)
Re
vs1(s) (22.13)
So the peak magnitude of iR(t)i s
IR1=∥H(s)||s= jωS
Re
Vs1 (22.14)
Thus, the magnitude of the tank transfer function is found, with an eﬀective resistive load.
22.1.4 Solution of Converter Voltage Conversion Ratio M= V/Vg
An equivalent circuit of a complete dc–dc resonant converter is depicted in Fig. 22.14.T h e
voltage conversion ratio of the resonant converter can now be found:
M= V
Vg
= (R)
⎦2
π
)

⎦1
Re
)

⎦
∥H(s)∥s= jωs
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
⎦4
π
)

⎦V
I
) ⎦I
IR1
)⎦IR1
VR1
)⎦ VR1
Vs1
)⎦ Vs1
Vg
)
(22.15)
Simpliﬁcation by use of Eq. (22.10) yields
V
Vg
=∥H(s)∥s= jωs (22.16)
Equation (22.16) is the desired result. It states that the dc conversion ratio of the resonant con-
verter is approximately the same as the ac transfer function of the resonant tank circuit, evalu-
ated at the switching frequency fs. This intuitive result can be applied to converters with many
diﬀerent types of tank circuits. However, it should be reemphasized that Eq. ( 22.16) is valid
only if the response of the tank circuit to the harmonics of vs(t) is negligible compared to the
vs1(t)=
4Vg
sin ( st)
Resonant
network
Transfer function
H(s)
+ RRe
+ Zi
is1(t) iR1(t)
+
vR1(t) 2 IR1
Re = 8
2 R
+
V
I
Vg
2Is1 cos ( s)
Fig. 22.14 Steady-state equivalent circuit that models the dc and fundamental components of resonant
converter waveforms

944 22 Resonant Conversion
Series tank network
LC
vs1(t)=
4Vg
sin ( st)
Transfer function H(s)
+ Re
Zi
is1(t) iR1(t)
+
vR1(t)
Re = 8
2 R
+Vg
2Is1 cos ( s)
R2 IR1
+
V
I
Fig. 22.15 Steady-state equivalent circuit of the series resonant converter
fundamental response, an assumption that is not always justiﬁed. In addition, we have assumed
that the switch network is controlled to produce a square wave and that the rectiﬁer network
drives a capacitive-type ﬁlter network. Finally, the transfer functionH(s) is evaluated using the
eﬀective load resistance R
e given by Eq. (22.9).
22.2 Examples
22.2.1 Series Resonant DC–DC Converter Example
The series resonant converter with switching-frequency control is shown in Fig. 22.4. Current-
bidirectional two-quadrant switches are necessary. For this circuit, the tank network consists of
as e r i e sL–C circuit, and Fig. 22.14 can be redrawn as in Fig. 22.15. The transfer function H(s)
is therefore:
H(s)= Re
Zi(s)= Re
Re+ sL+ 1
sC
=
⎦ s
Qeω0
)
1+
⎦ s
Qeω0
)
+
⎦s
ω0
)2 (22.17)
where
ω0 = 1√
LC
= 2πf0
R0 =
√
L
C
Qe = R0
Re

22.2 Examples 945
The magnitude of H( jωs), which coincides with the converter dc conversion ratioM= V/Vg,i s
M=∥H( jωs)∥= 1√
1+ Q2e
⎦1
F−F
)2
(22.18)
where
F= fs/ f0 (22.19)
The Bode diagrams of Zi(s) and H(s) are constructed in Fig. 22.16, using the graphical con-
struction method of Chap. 8. The series resonant impedance Zi(s) is dominated by the capacitor
C at low frequency, and by the inductor L at high frequency. At the resonant frequency f0,t h e
impedances of the inductor and capacitor are equal in magnitude and opposite in phase; hence,
they cancel. The series resonant impedance Z
i(s) is equal to Re at f= f0.
1
C
Re
|| Zi ||
f0
L
R0
Qe = R0 /Re
1
|| H ||
f0
Qe = R0 /Re
Re /R0
ReC
R
e / L
Fig. 22.16 Construction of the Bode diagrams of Zi(s)a n dH(s) for the series resonant converter
The transfer function ∥H( jω)∥ is constructed graphically, by division of Re by the ∥Zi∥
asymptotes of Fig. 22.16. At resonance, one obtains∥H∥= Re/Re= 1. At frequencies above or
below the resonant frequency,∥Zi∥> Re and hence∥H∥< 1. So the conversion ratio M is less
than or equal to 1. It can also be seen that a decrease in the load resistanceR, which increases the
eﬀective quality factor Qe, causes a more peaked response in the vicinity of resonance. Exact
characteristics of the series resonant converter are plotted in Fig.22.49.

946 22 Resonant Conversion
Over what range of switching frequencies is Eq. (22.18) accurate? The response of the tank
to the fundamental component of vs(t)m u s tb es uﬃciently greater than the response to the
harmonics of vs(t). This is certainly turn for operation above resonance becauseH(s) contains a
bandpass characteristic that decreases with a single-pole slope for fs> f0. For the same reason,
Eq. (22.18) is valid when the switching frequency is below but near resonance.
However, for switching frequencies fs much less than the resonant frequency f0, the sinu-
soidal approximation breaks down completely because the tank responds more strongly to the
harmonics of v
s(t) than to its fundamental. For example, at fs = f0/3, the third harmonic of
vs(t) is equal to f0 and directly excites the tank resonance. Some other type of analysis must be
used to understand what happens at these lower frequencies. Also, in the low- Q case, the ap-
proximation is less accurate because the ﬁlter response is less peaked, and hence does not favor
the fundamental component as strongly. As shown in a later section, discontinuous conduction
modes may then occur whose waveforms are highly nonsinusoidal.
Fig. 22.17 Excitation of the tank
network by the third harmonic of the
switching frequency
Switch
output
voltage
spectrum
ffs 3fs 5fs
f
Resonant
tank
response
fs 3fs 5fs
Tank
current
spectrum
ffs 3fs 5fs
22.2.2 Subharmonic Modes of the Series Resonant Converter
If the nth harmonic of the switch output waveform vs(t) is close to the resonant tank frequency,
nf s ∼f0, and if the tank e ﬀective quality factor Qe is suﬃciently large, then as illustrated
in Fig. 22.17, the tank responds primarily to harmonic n. All other components of the tank
waveforms can then be neglected, and it is a good approximation to replace vs(t) with its nth
harmonic component:
vs(t)≈vsn(t)= 4Vg
nπsin(nωst) (22.20)
This expression diﬀers from Eq. (22.2) because the amplitude is reduced by a factor of 1/n, and
the frequency is nf s rather than fs.

22.2 Examples 947
Fig. 22.18 The subharmonic modes of
the series resonant converter. These modes
occur when the harmonics of the switching
frequency excite the tank resonance
fsf0
M
etc.
1
3 f0
1
5 f0
1
3
1
5
1
The arguments used to model the tank and rectiﬁer /ﬁlter networks are unchanged from
Sect. 22.1. The rectiﬁer presents an eﬀective resistive load to the tank, of value Re = 8R/π2.
In consequence, the converter dc conversion ratio is given by
M= V
Vg
=∥H( jnωs)∥
n (22.21)
This is a good approximation provided that nf s is close to f0, and that Qe is suﬃciently large.
Typical characteristics are sketched in Fig.22.18.
The series resonant converter is not generally designed to operate in a subharmonic mode,
since the fundamental modes yield greater output voltage and power, and hence higher e ﬃ-
ciency. Nonetheless, the system designer should be aware of their existence, because inadvertent
operation in these modes can lead to large signal instabilities.
22.2.3 Parallel Resonant DC–DC Converter Example
The parallel resonant dc–dc converter is diagrammed in Fig. 22.19.I td iﬀers from the series
resonant converter in two ways. First, the tank capacitor appears in parallel with the rectiﬁer
network rather than in series: this causes the tank transfer function H(s)t oh a v ead iﬀerent
form. Second, the rectiﬁer drives an inductive-input low-pass ﬁlter. In consequence, the value
of the eﬀective resistance Re diﬀers from that of the rectiﬁer with a capacitive ﬁlter. Nonethe-
less, sinusoidal approximations can be used to understand the operation of the parallel resonant
converter.
As in the series resonant converter, the switch network is controlled to produce a square
wave v
s(t). If the tank network responds primarily to the fundamental component of vs(t), then
arguments identical to those of Sect. 22.1 can be used to model the output fundamental com-
ponents and input dc components of the switch waveforms. The resulting equivalent circuit is
identical to Fig. 22.9.
The uncontrolled rectiﬁer with inductive ﬁlter network can be described using the dual of
the arguments of Sect. 22.1.2. In the parallel resonant converter, the output rectiﬁers are driven
by the nearly sinusoidal tank capacitor voltage vR(t), and the diode rectiﬁers switch when vR(t)
passes through zero as in Fig. 22.20. If the ﬁlter inductor current ripple is small, then in steady
state the ﬁlter inductor current is essentially equal to the dc load current I. The rectiﬁer input
current iR(t) is therefore a square wave of amplitude I, and is in phase with the tank capacitor
voltage vR(t):

948 22 Resonant Conversion
iR(t)= 4I
π
∞∑
n=1,3,5,...
1
n sin(nωst−ϕR) (22.22)
whereϕR is the phase shift of vR(t).
iR(t)
vR(t)
+
+ R
+
v(t)
Resonant tank network
is(t)
dc
source
vg(t)
vs(t)
+
Switch network
L
Cp
NS NT
i(t)
Rectifier network
NR NF
Low-pass filter
network
dc
load
Fig. 22.19 Block diagram of the parallel resonant converter
(a)
vR(t)
I iR(t)
st
R
(b)
vR1(t)
iR1(t)
fundamental
4 I
iR1(t)= vR1(t)
Re
Re =
2
8 R
st
R
Fig. 22.20 Rectiﬁer network input terminal waveforms, for the parallel resonant converter: ( a) actual
waveforms vR(t)a n diR(t), (b) fundamental components vR1(t)a n diR1(t)
The fundamental component of iR(t)i s
iR1(t)= 4I
πsin(ωst−ϕR) (22.23)
Hence, the rectiﬁer again presents an eﬀective resistive load to the tank circuit, equal to
Re= vR1(t)
iR1(t)=πVR1
4I (22.24)
The ac components of the rectiﬁed tank capacitor voltage|vR(t)| are removed by the output low-
pass ﬁlter. In steady state, the output voltage V is equal to and inductive ﬁlter network of the
parallel resonant the dc component of|vR(t)|:
V= 2
Ts
∫ Ts/2
0
VR1| sin(ωst−ϕR)|dt= 2
πVR1 (22.25)

22.2 Examples 949
So the load voltage V and the tank capacitor voltage amplitude are directly related in steady state.
Substitution of Eq. (22.25) and resistive load characteristics V= IR into Eq. (22.24) yields
Re=π2
8 R= 1.2337R (22.26)
iR1(t)
RRe
Re =
2
8 R
+
vR1(t)
+
V
I
+2 VR1
Fig. 22.21 An equivalent circuit for the rectiﬁer and
inductive ﬁlter network of the parallel resonant con-
verter, which models the fundamental components of
the rectiﬁer ac input waveforms and the dc compo-
nents of the load waveforms
An equivalent circuit for the uncontrolled
rectiﬁer with inductive ﬁlter network is given
in Fig. 22.21. This model is similar to the
one used for the series resonant converter,
Fig. 22.12, except that the roles of the recti-
ﬁer input voltage v
R(t) and current iR(t)a r e
interchanged, and the eﬀective resistance Re
has a diﬀerent value. The model for the com-
plete converter is given in Fig.22.22.
Solution of Fig. 22.22 yields the con-
verter dc conversion ratio:
M= V
Vg
= 8
π2∥H(s)∥s= jωs (22.27)
where H(s) is the tank transfer function
H(s)= Zo(s)
sL (22.28)
and
Zo(s)= sL∥ 1
sC∥Re (22.29)
Parallel tank network
L
C
vs1(t)=
4Vg
sin ( st)
Transfer function H(s)
+ Re
Zi
is1(t) iR1(t)
+
vR1(t)+Vg
2Is1 cos ( s)
Re =
2
8 R
R
+
V
I
+2 VR1
Fig. 22.22 Equivalent circuit for the parallel resonant converter, which models the fundamental compo-
nents of the tank waveforms and the dc components of the converter input current and output voltage

950 22 Resonant Conversion
The Bode magnitude diagrams of H(s) and Zo(s) are constructed in Fig. 22.23,u s i n gt h e
graphical construction method of Chap. 8. The impedance Zo(s) is the parallel combination
of the impedances of the tank inductor L, capacitor C, and eﬀective load Re. The magnitude
asymptote of the parallel combination of these components, at a given frequency, is equal to the
smallest of the individual asymptotes ωL, 1/ωC, and R
e. Hence, at low frequency where the
inductor impedance dominates the parallel combination,||Zo(s)||/simequalωL, while at high frequency
the capacitor dominates and ||Zo(s)||/simequal1/ωC. At resonance, the impedances of the inductor
and capacitor are equal in magnitude but opposite in phase, so that their e ﬀects cancel. The
impedance||Zo(s)∥ is then equal to Re:
∥ Zo(s)∥s= jωs = 1
1
jω0L+ jω0C+ 1
Re
= Re (22.30)
with
ω0L= 1
ω0C= R0
The dc conversion ratio is therefore
M= 8
π2


Z
o(s)
sL


s= jωs
= 8
π2






1
1+ s
Qeω0
+
⎦s
ω0
)2






s= jωs
(22.31)
= 8
π2
1√
⎦1−F2)2+
⎦F
Qe
)2
where F= fs/ f0.
At resonance, the conversion ratio is
M= 8
π2
Re
R0
= R
R0
(22.32)
The actual peak value of M occurs at a switching frequency slightly below the resonant fre-
quency, with peak M slightly greater than Eq. ( 22.32). Provided that the load resistance R is
greater than the tank characteristic impedance Re, the parallel resonant converter can produce
conversion ratios both greater than and less than one. In fact, the ideal parallel resonant con-
verter can produce conversion ratios approaching inﬁnity, provided that the output current is
limited to values less than Vg/R0. Of course, losses limit the maximum output voltage that can
be produced by practical converters.

22.3 Soft Switching 951
(a)
1
C
Re
|| Zo ||
f0
L
R0
Qe = Re /R0
(b)
1
2LC
1
|| H ||
f0
Qe = Re /R0
Re /R0
Fig. 22.23 Construction of Bode diagrams of Zi(s)a n dH(s) for the parallel resonant converter
22.3 Soft Switching
As mentioned previously, the soft-switching phenomena known as zero-current switching (ZCS)
and zero-voltage switching (ZVS) can lead to reduced switching loss. When the turn-on and/or
turn-oﬀtransitions of a semiconductor switching device coincide with the zero crossings of
the applied waveforms, some of the switching loss mechanisms discussed in Sect. 4.6 are elim-
inated. In converters containing MOSFETs and diodes, zero-voltage switching mitigates the
switching loss otherwise caused by diode recovered charge and semiconductor output capaci-
tance.
Zero-current switching can mitigate the switching loss caused by current tailing in IGBTs
and by stray inductances. Zero-current switching can also be used for commutation of SCRs.
In the majority of applications, where diode recovered charge and semiconductor output capac-
itances are the dominant sources of PWM switching loss, zero-voltage switching is preferred.
22.3.1 Operation of the Full Bridge Below Resonance: Zero-Current Switching
When the series and parallel resonant inverters and dc–dc converters are operated below reso-
nance, the zero-current switching phenomenon can occur, in which the circuit causes the tran-
sistor current to go to zero before the transistor is turned o ﬀ. Let us consider the operation of
the full-bridge switch network of the series resonant converter in detail.

952 22 Resonant Conversion
L
+Vg
CQ1
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
iQ1(t)
Fig. 22.24 A series resonant converter incorporating a full-bridge switch network
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
turn-on of
Q1, Q4
turn-off of
Q1, Q4
turn-on of
Q2, Q3
turn-off of
Q2, Q3
Fig. 22.25 Switch network output waveforms for the series resonant converter, operated below resonance
in the k= 1 CCM. Zero-current switching aids the transistor turn-oﬀprocess
A full-bridge circuit, realized using power MOSFETs and antiparallel diodes, is shown in
Fig. 22.24. The switch output voltage vs(t), and its fundamental component vs1(t), as well as
the approximately sinusoidal tank current waveform is(t), are illustrated in Fig. 22.25.A tf r e -
quencies less than the tank resonant frequency, the input impedance of the series resonant tank
network Zi(s) is dominated by the tank capacitor impedance (see Fig. 22.16a). Hence, the tank
presents an eﬀective capacitive load to the bridge, and switch current is(t) leads the switch volt-
```
