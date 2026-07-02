---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第21章part 1 - 21 Pulse-Width Modulated Rectifiers
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 866-885 > Chunk ID: `chapter-21-part-1`"
---

# 第21章part 1 - 21 Pulse-Width Modulated Rectifiers

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 866-885  
> Chunk ID: `chapter-21-part-1`

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
21
Pulse-Width Modulated Rectiﬁers
To obtain low ac line current THD, the passive techniques described in the previous chapter
rely on low-frequency transformers and/or reactive elements. The large size and weight of these
elements are objectionable in many applications. This chapter covers active techniques that
employ converters having switching frequencies much greater than the ac line frequency. The
reactive elements and transformers of these converters are small, because their sizes depend on
the converter switching frequency rather than the ac line frequency.
Instead of making do with conventional diode rectiﬁer circuits, and dealing after-the-fact
with the resulting low-frequency harmonics, let us consider now how to build a rectiﬁer that
behaves as ideally as possible, without generation of line current harmonics. In this chapter,
the properties of the ideal rectiﬁer are explored, and a model is described. The ideal rectiﬁer
presents an eﬀective resistive load to the ac power line; hence, if the supplied ac voltage is
sinusoidal, then the current drawn by the rectiﬁer is also sinusoidal and is in phase with the
voltage. Converters that approximate the properties of the ideal rectiﬁer are sometimes called
power factor corrected, because their input power factor is essentially unity [244].
The boost converter, as well as a variety of other converters, can be controlled such that
a near-ideal rectiﬁer system is obtained. This is accomplished by control of a high-frequency
switching converter, such that the ac line current waveform follows the applied ac line voltage.
Both single-phase and three-phase rectiﬁers can be constructed using PWM techniques. A typ-
ical dc power supply system that is powered by the single-phase ac utility contains three major
power-processing elements. First, a high-frequency converter with a wide-bandwidth input cur-
rent controller functions as a near-ideal rectiﬁer. Second, an energy storage capacitor smooths
the pulsating power at the rectiﬁer output, and a low-bandwidth controller causes the average
input power to follow the power drawn by the load. Finally, a dc–dc converter provides a well-
regulated dc voltage to the load. In this chapter, single-phase rectiﬁer systems are discussed,
expressions for rms currents are derived, and various converter approaches are compared.
The techniques developed in earlier chapters for modeling and analysis of dc–dc converters
are extended in this chapter to treat the analysis, modeling, and control of low-harmonic rec-
tiﬁers. The CCM models of Chap. 3 are used to compute the average losses and eﬃciency of
CCM PWM converters operating as rectiﬁers. The results yield insight that is useful in power
stage design. Several converter control schemes are known, including peak current program-
ming, average current control, critical conduction mode control, and nonlinear carrier control.
Ac modeling of the rectiﬁer control system is also covered.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_21
867

868 21 Pulse-Width Modulated Rectiﬁers
21.1 Properties of the Ideal Rectiﬁer
It is desired that the ideal single-phase rectiﬁer presents a resistive load to the ac system. The ac
line current and voltage will then have the same waveshape and will be in phase. Unity power
factor rectiﬁcation is the result. Thus, the rectiﬁer input current i
ac(t) should be proportional to
the applied input voltage vac(t):
iac(t)= vac(t)
Re
(21.1)
where Re is the constant of proportionality. An equivalent circuit for the ac port of an ideal
rectiﬁer is therefore an eﬀective resistance Re, as shown in Fig. 21.1a. Re is also known as the
emulated resistance. It should be noted that the presence of Re does not imply the generation
of heat: the power apparently “consumed” by Re is actually transferred to the rectiﬁer dc output
port. Re simply models how the ideal rectiﬁer loads the ac power system.
Output regulation is accomplished by variation of the eﬀective resistance Re, and hence the
value of Re must depend on a control signal vcontrol(t)a si nF i g .21.1b. This allows variation of
the rectiﬁer power throughput, since the average power consumed by Re is
Pav= V2
ac,rms
Re(vcontrol) (21.2)
(a)
Re
+
vac(t)
iac(t) (b)
Re(vcontrol)
+
vac(t)
iac(t)
vcontrol
(c)
Re(vcontrol)
+
vac(t)
iac(t)
vcontrol
v(t)
i(t)
+p(t) = vac
2/Re
Ideal rectifier (LFR)
ac
input
dc
output
Fig. 21.1 Development of the ideal rectiﬁer equivalent circuit model: ( a) input port resistor emulation;
(b) the value of the emulated resistance, and hence the power throughput, is controllable; ( c) output port
power source characteristic, and complete model

21.1 Properties of the Ideal Rectiﬁer 869
Note that changing Re results in a time-varying system, with generation of harmonics. To avoid
generation of signiﬁcant amounts of harmonics and degradation of the power factor, variations
in Re and in the control input must be slow with respect to the ac line frequency.
To the extent that the rectiﬁer is lossless and contains negligible internal energy storage,
the instantaneous power ﬂowing into Re must appear at the rectiﬁer output port. Note that the
instantaneous power throughput
p(t)= v2
ac(t)
Re (vcontrol(t)) (21.3)
is dependent only on vac(t) and the control input vcontrol(t), and is independent of the character-
istics of the load connected to the output port. Hence, the output port must behave as a source
of constant power, obeying the relationship
v(t)i(t)= p(t)= v2
ac(t)
Re
(21.4)
The dependent power sourcesymbol of Fig.21.2a is used to denote such an output characteristic.
As illustrated in Fig. 21.1c, the output port is modeled by a power source that is dependent on
the instantaneous power ﬂowing into Re.
Thus, a two-port model for the ideal unity-power-factor single-phase rectiﬁer is as shown in
Fig. 21.1c[ 132, 133, 245]. The two port model is also called a loss-free resistor (LFR) because
(1) its input port obeys Ohm’s law, and (2) power entering the input port is transferred directly
to the output port without loss of energy. The deﬁning equations of the LFR are as follows:
iac(t)= vac(t)
Re(vcontrol) (21.5)
v(t)i(t)= p(t) (21.6)
p(t)= v2
ac(t)
Re (vcontrol) (21.7)
(a)
p(t)
+
v(t)
i(t)
(b)
p(t)
+
v(t)
i(t)
(c)
v(t)i(t) = p(t)
v(t)
i(t)
Fig. 21.2 The dependent power source: ( a) power source schematic symbol, ( b) power sink schematic
symbol, (c) i–v characteristic of power source

870 21 Pulse-Width Modulated Rectiﬁers
When the LFR output port is connected to a resistive load of valueR, the dc output rms voltages
and currents Vrms and Irms are related to the ac input rms voltages and currentsVac,rms and Iac,rms
as follows:
Vrms
Vac,rms
=
√
R
Re
(21.8)
Iac,rms
Irms
=
√
R
Re
(21.9)
The properties of the power source and loss-free resistor network are discussed in Chap. 15.
Regardless of the speciﬁc converter implementation, any single-phase rectiﬁer having near-ideal
properties can be modeled using the LFR two-port model.
21.2 Realization of a Near-Ideal Rectiﬁer
Feedback can be employed to cause a converter that exhibits controlled dc transformer charac-
teristics to obey the LFR equations. In the single-phase case, the simplest and least expensive
approach employs a full-wave diode rectiﬁer network, cascaded by a dc–dc converter, as in
Fig. 21.3. The dc–dc converter is represented by an ideal dc transformer, as discussed in Chap.3.
A control network varies the duty cycle, as necessary to cause the converter input current i
g(t)
to be proportional to the applied input voltage vg(t)a si nE q .(21.1). The eﬀective turns ratio of
the ideal transformer then varies with time. Ideal waveforms are illustrated in Fig. 21.4.I ft h e
applied input voltage vac(t) is sinusoidal,
vac(t)= VM sin(ωt) (21.10)
then the rectiﬁed voltage vg(t)i s
vg(t)= VM| sin(ωt)| (21.11)
1 : M(d(t))
Controller
d(t)
Rvac(t)
iac(t) +
vg(t)
ig(t)
ig
vg
+
v(t)
i(t)
C
Fig. 21.3 Synthesis of an ideal rectiﬁer by varying the duty cycle of a PWM dc–dc converter

21.2 Realization of a Near-Ideal Rectiﬁer 871
v(t)
t
vac(t)
t
iac(t)
ig(t)
V
VM
vg(t) VM
M(t)
Mmin
VM /Re
Fig. 21.4 Waveforms of the rectiﬁer system of
Fig. 21.3
It is desired that the converter output volt-
age be a constant dc value v(t)= V. The con-
verter conversion ratio must therefore be
M(d(t))= v(t)
vg(t)= V
VM| sin(ωt)| (21.12)
This expression neglects the converter dy-
namics. As can be seen from Fig. 21.4,t h e
controller must cause the conversion ratio
to vary between inﬁnity (at the ac line volt-
age zero crossings) and some minimum value
M
min (at the peaks of the ac line voltage wave-
form). Mmin is given by
Mmin= V
VM
(21.13)
Any converter topology whose ideal conver-
sion ratio can be varied between these limits
can be employed in this application.
To the extent that the dc–dc converter is
ideal (i.e., if the losses can be neglected and
there is negligible low-frequency energy stor-
age), the instantaneous input and output pow-
ers are equal. Hence, the output currenti(t)i n
Fig. 21.3 is given by
i(t)= v
g(t)ig(t)
V =
v2
g(t)
VRe
(21.14)
Substitution of Eq. ( 21.11) into Eq. ( 21.14)
then leads to
i(t)= V2
M
VRe
sin2(ωt)
= V2
M
2VRe
(1−cos(2ωt)) (21.15)
Hence, the converter output current contains a dc component and a component at the second
harmonic of the ac line frequency. One of the functions of capacitor C in Fig. 21.3 is to ﬁlter
out the second harmonic component of i(t), so that the load current (ﬂowing through resistor R)
is essentially equal to the dc component
I=⟨i(t)⟩TL = V2
M
2VRe
(21.16)
where TL is the period of the applied ac line voltage.

872 21 Pulse-Width Modulated Rectiﬁers
The average power is
P= V2
M
2Re
(21.17)
The above equations are generally valid for PWM converters used as single-phase low-harmonic
rectiﬁers.
21.2.1 CCM Boost Converter
A system based on the CCM boost converter is illustrated in Fig. 21.5 [244, 246, 247]. Ideally,
the boost converter can produce any conversion ratio between one and inﬁnity. Hence, the boost
converter is capable of producing the M(d(t)) given by Eq. ( 21.12), provided that V ≥VM.
Further, the boost converter can produce very low THD, with better transistor utilization than
other approaches.
If the boost converter operates in continuous conduction mode, and if the inductor is small
enough that its inﬂuence on the low-frequency components of the converter waveforms is neg-
ligible, then the duty ratio should follow M(d(t))= 1/(1−d(t)). This implies that the duty ratio
should follow the function
d(t)= 1−vg(t)
V (21.18)
This expression is true only in the continuous conduction mode. The boost converter operates
in the continuous conduction mode provided that the inductor current ripple
Δig(t)= vg(t)d(t)Ts
2L (21.19)
is greater than the average inductor current, or
⟨ig(t)⟩Ts = vg(t)
Re
(21.20)
Hence, the converter operates in CCM when
⟨ig(t)⟩Ts >Δig(t) ⇒ d(t)< 2L
ReTs
(21.21)
Boost converter
Controller
Rvac(t)
iac(t) +
vg(t)
ig(t)
ig(t)vg(t)
+
v(t)
i(t)
Q1
L
C
D1
d(t)
Fig. 21.5 Rectiﬁer system based on the boost converter

21.2 Realization of a Near-Ideal Rectiﬁer 873
Substitution of Eq. (21.18)i n t o(21.21) and solution for Re leads to
Re< 2L
Ts(1−vg(t)
V )
for CCM (21.22)
Since vg(t) varies according to Eq. (21.11), Eq. (21.22) may be satisﬁed at some points on the ac
line cycle, and not at others. Since 0≤vg(t)≤VM, we can conclude that the converter operates
in CCM over the entire ac line cycle when
Re< 2L
Ts
(21.23)
Equations (21.18) and (21.22) then hold for all t. The converter always operates in DCM when
Re> 2L
Ts
⎦
1−VM
V
) (21.24)
For Re between these limits, the converter operates in DCM whenvg(t) is near zero, and in CCM
when vg(t) approaches VM.
The static input characteristics of the open-loop boost converter are sketched in Fig. 21.6.
The input current ig(t) is plotted vs. input voltage vg(t), for various duty cycles d(t). In CCM,
the input characteristics of the boost converter are described by
vg(t)
V = 1−d(t) in CCM (21.25)
0 0.25 0.5 0.75 1
0
0.25
0.5
0.75
1
d = 0
d = 0.2
d = 0.4
d = 0.6
d = 0.8
d = 1
CCM
DCM
jg(t)= 2L
VTs
ig(t)
mg(t)= vg(t)
V
ig(t)= vg(t)/Re
Fig. 21.6 Static input characteristics of the boost converter. A typical linear resistive input characteristic
is superimposed

874 21 Pulse-Width Modulated Rectiﬁers
To obtain a general plot, we can normalize the input current and input voltage as follows:
mg(t)= vg(t)
V (21.26)
jg(t)= 2L
VTs
ig(t) (21.27)
Equation (21.25) then becomes
mg(t)= 1−d(t) (21.28)
This equation is independent of the input currentig(t), and hence is represented by vertical lines
in Fig. 21.6.
Fig. 21.7 Averaged equivalent circuit
model of the boost converter operating in
DCM, derived in Chap. 15
p(t)+
+
Vvg(t) +2L
d2Ts
p(t)
V vg(t)ig(t)
To derive the boost input characteristic for DCM operation, we can solve the steady-state
equivalent circuit model of Fig. 15.16b (reproduced in Fig. 21.7). Beware: the natural DCM
eﬀective resistance of Chap.15, Re= 2L/d2Ts, does not necessarily coincide with the emulated
resistance Re = vg/ig of Eq. (21.1). In this chapter, the quantity Re is deﬁned according to
Eq. (21.1). Solution of Fig. 21.7 for the input current ig(t) leads to:
ig(t)= vg(t)⎦2L
d2Ts
)+ p(t)
V−vg(t) (21.29)
The instantaneous power consumed by the eﬀective resistor in the model of Fig. 21.7 is
p(t)=
v2
g(t)
⎦2L
d2Ts
) (21.30)
Substitution of Eq. (21.30) into Eq. (21.29) and simpliﬁcation leads to
2L
VTs
ig(t)
⎦
1−vg(t)
V
)
= d2(t)vg(t)
V in DCM (21.31)
Normalization of this equation according to Eqs. (21.26) and (21.27) yields
jg(t)
⎦
1−mg(t)
)
= d2mg(t) (21.32)
This equation describes the curved (DCM) portions of the Fig. 21.6 input characteristics, for
low ig(t).

21.2 Realization of a Near-Ideal Rectiﬁer 875
To express the CCM/DCM mode boundary as a function of vg(t) and ig(t), Eqs. (21.1) and
(21.22) can be combined, leading to
2L
VTs
ig(t)>
⎦vg(t)
V
)⎦
1−vg(t)
V
)
for CCM (21.33)
Normalization of this equation, according to Eqs. (21.26) and (21.27), results in
jg(t)> mg(t)(1−mg(t)) for CCM (21.34)
This equation describes a parabola having roots atmg= 0 and mg= 1, with the maximum value
jg= 0.25 at mg= 0.5. The mode boundary equation is plotted as a dashed line in Fig. 21.6.
The complete boost converter input characteristics in Fig. 21.6 have been plotted using
Eqs.(21.28), (21.32), and ( 21.34). Figure 21.6 also illustrates the desired linear resistive input
characteristic, Eq. (21.1). For the value ofRe illustrated, the converter operates in DCM forvg(t)
near zero, and in CCM for vg(t) near VM. The intersections of boost input characteristics with
the desired linear input characteristic illustrate how the controller must choose the duty cycle at
various values of vg(t).
Other converters capable of producing the M(d(t)) of Eq. (21.12) include the buck–boost,
SEPIC, and ´Cuk converters. The boost, SEPIC, and ´Cuk converters share the desirable property
of nonpulsating input current, and hence require minimal input EMI ﬁltering. The SEPIC pro-
duces a non-inverted output voltage. Isolated versions of these converters (see Chap.6)a r ea l s o
sometimes employed [248–250]. Schemes involving the parallel resonant converter, as well as
several types of quasi-resonant converters, are also documented in the literature [251–254].
The open-loop boost converter, when operated in discontinuous conduction mode, is also
sometimes used as an approximation of an ideal rectiﬁer. The DCM e ﬀective resistance
2L/d
2(t)Ts of Fig. 21.7 is then taken as an approximation of the desired emulated resistance
of Eq. (21.1). The model diﬀers from that of the ideal rectiﬁer model of Fig. 21.1c in that the
power source is connected between the input and output terminals. As a result, harmonics are
present in the input current waveform. For example, if v
g(t) is a rectiﬁed sinusoid, then the cur-
rent through the eﬀective resistance 2L/d2(t)Ts will also be a rectiﬁed sinusoid. However, the
input current⟨ig(t)⟩Ts is now equal to the sum of the current through Re and the current ﬂow-
ing through the power source element. Since the power source is a nonlinear element, ⟨ig(t)⟩Ts
contains harmonics. For large C, the output voltage is essentially constant. The input current
waveform is then given by Eq. ( 21.31). If V is suﬃciently large, then the term (1 −vg(t)/V)
is approximately equal to one, and the harmonics in ⟨ig(t)⟩Ts are small. The zero crossings of
vg(t), p(t), and⟨ig(t)⟩Ts coincide. So although the DCM boost converter generates some current
harmonics, it is nonetheless possible to construct a low harmonic rectiﬁer that meets harmonic
limits. Again, this approach has the disadvantages of the increased peak currents of DCM, and
the need for additional ﬁltering of the high-frequency pulsating input currents.
A similar approach is to operate the boost converter at the boundary between the continuous
and discontinuous conduction modes. This approach is known as “critical conduction mode” op-
eration. It eliminates the distortion mechanism described above, but requires variable switching-
frequency control. This approach is quite popular at low-power levels, and is described further
in Sect. 21.3.3.
Other converters not capable of producing the M(d(t)) of Eq. ( 21.12), such as the buck
converter, are sometimes employed as the dc–dc converter of Fig.21.3. Distortion of the ac line
current waveform must then occur. Nonetheless, at low-power levels it may be possible to meet
the applicable ac line current harmonic standards using such an approach.

876 21 Pulse-Width Modulated Rectiﬁers
21.2.2 Simulation Example: DCM Boost Rectiﬁer
When a boost DCM converter operates at a constant switch duty cycle, the input current approx-
imately follows the input voltage. The DCM eﬀective resistance 2L/d2(t)Ts is an approximation
of the emulated resistanceRe of the DCM boost rectiﬁer. Ac line current harmonics are not zero,
but the rectiﬁer can still be designed to meet harmonic limits. In this section we consider a DCM
boost rectiﬁer example and test its performance by simulation.
An averaged circuit model of the boost DCM rectiﬁer is shown in Fig. 21.8. Full-wave
rectiﬁed 120 Vrms, 50 Hz ac line voltage is applied to the input of the boost converter. The
converter switches are replaced by the CCM-DCM1 averaged switch subcircuit. It is desired to
regulate the dc output voltage at V= 300 V at output power up to Pout= 120 W across the load
R. The switching frequency is fs= 100 kHz. Let us select the inductanceL so that the converter
always operates in DCM. From Eq. (21.24), the condition for DCM is as follows:
L<
⎦
1−VM
V
)
Re
2 fs
(21.35)
where Re is the emulated resistance of the rectiﬁer and VM is the peak of the ac line voltage.
When line current harmonics and losses are neglected, the rectiﬁer emulated resistanceRe at the
speciﬁed load power P is
Re= V2
M
2P (21.36)
Given VM = 170 V and Re found from Eq. ( 21.36), Eq. (21.35)g i v e sL < 260μ H. The se-
lected inductance is L= 200μ H. A low-bandwidth voltage feedback loop is closed around the
+
+
200 μH
650 k
150 μF
vac(t)
120 Vrms
50 Hz
L
C R
vref
5 V
+ 12 V
LM324
R1
R3
C3
R2
1 μF
11 k
3.3 k
vcontrol
Epwm
VM = 2 V
value = {LIMIT(0.5 vcontrol , 0.1, 0.9)}
+
v
1
2
4
3
5
CCM-DCM1
iac(t)
PWM
Fig. 21.8 DCM boost rectiﬁer example

21.2 Realization of a Near-Ideal Rectiﬁer 877
0 2 ms 4 ms 6 ms 8 ms 10 ms 12 ms 14 ms 16 ms 18 ms 20 ms
305 V
2 A
iac(t)
t
300 V
295 V
1 A
v(t)
2 ms 4 ms 6 ms 8 ms 10 ms 12 ms 14 ms 16 ms 18 ms 20 ms
t
Fig. 21.9 Output voltage and ac line current in the DCM boost rectiﬁer example
converter to regulate the dc output voltage. The output voltage is sensed and compared to the
reference vre f . A PI compensator is constructed around the LM324 op amp. The output vcontrol
of the compensator is the input to the pulse-width modulator. By adjusting the switch duty ratio
d, vcontrol adjusts the emulated resistance Re= 2L/d2Ts of the rectiﬁer, and thereby controls the
power taken from the ac line. In steady state, the input power matches the output power. The
dc output voltage V is regulated at the value set by the reference voltage vre f and the voltage
divider composed of R1 and R2, as follows:
V= vre f
R1+ R2
R1
= 300V (21.37)
Modeling of the low-bandwidth voltage regulation loop is discussed in Sect. 21.4.2.
It is of interest to ﬁnd ac line current harmonics. First, a long SPICE transient simulation is
performed to reach steady-state operation. Then, current harmonics are computed using Fourier
analysis applied to the ac line current waveform iac(t) during one line cycle in steady state. Fig-
ure 21.9 shows the steady-state ac line current and output voltage obtained for R = 900Ω, i.e.,
for 100 W of output power. The output voltage has a dc component equal to 300 V , and an
ac ripple component at twice the line frequency. The peak-to-peak voltage ripple at twice the
line frequency is approximately 8 V , which compares well with the value (7 V) found from
Eq. (21.94). The ac line current has noticeable distortion. The spectrum of the ac line current is
shown in Fig. 21.10. The largest harmonic, the third, has an amplitude of 16.6% of the funda-
mental, and the total harmonic distortion is 16.7%.
We can also examine what happens if the rectiﬁer is overloaded. The steady-state ac line
current waveform for the case when the load resistance is R = 500Ω, and the output power is
180 W, is shown in Fig.21.11. The boost converter operates in CCM near the peak of the ac line
voltage; this results in current spikes and signiﬁcant harmonic distortion.

878 21 Pulse-Width Modulated Rectiﬁers
20%
10%
0%
3579
Harmonic number
Harmonic amplitude,
percent of fundamental
THD = 16.7%
Fig. 21.10 Spectrum of the ac line current in the DCM boost rectiﬁer
2 A
iac(t)
2 ms 4 ms 6 ms 8 ms 10 ms 12 ms 14 ms 16 ms 18 ms 20 ms
t
0 A
4 A
6 A
8 A
CCM operation
CCM operation
THD = 71%
Fig. 21.11 Ac line current of the DCM boost rectiﬁer example, when the output is overloaded
21.2.3 DCM Flyback Converter
In Chap. 15, the loss-free resistor network is used to model converters operating in discon-
tinuous conduction mode. This suggests that DCM converters can also be used as near-ideal
rectiﬁers. Indeed, the buck–boost, ﬂyback, SEPIC, and ´Cuk converters, when operated in dis-
continuous conduction mode without additional control, inherently behave as natural loss-free
resistors. The DCM eﬀective resistance R
e found in Chap. 15 to be equal to 2 L/D2Ts, then
coincides with the rectiﬁer emulated resistance of Eq. ( 21.1). At low-power levels, this can be
an eﬀective and low-cost approach. Inrush current limiting is also inherent in this approach,
and isolation and scaling via a turns ratio are provided by the transformer. Disadvantages are
the increased peak currents of DCM, and the need for additional ﬁltering of the high-frequency
pulsating input currents.
A simple low-harmonic rectiﬁer system based on the transformer-isolated ﬂyback converter
is illustrated in Fig.21.12 [245]. The ac line voltage is connected through an input EMI ﬁlter to a
bridge rectiﬁer and a ﬂyback converter. The ﬂyback converter is operated at constant switching
frequency fs and constant duty cycle D. The converter is designed such that it operates in the
discontinuous conduction mode under all conditions. The input EMI ﬁlter smooths the pulsating
input current waveform, so that i
ac(t) is approximately sinusoidal.

21.2 Realization of a Near-Ideal Rectiﬁer 879
Flyback converter
D
Rvac(t)
iac(t)
+
vg(t)
ig(t)
+
v(t)
i(t)
CL
Q1
D1
n : 1
EMI filter
Fig. 21.12 Low-harmonic rectiﬁer system incorporating a ﬂyback converter that operates in the discon-
tinuous conduction mode
Averaged model
Rvac(t)
iac(t) +
vg(t)
ig(t) Ts
+
v(t) Ts
C
EMI filter
2n2L
D2Ts
p(t) Ts
D
i(t) Ts
Fig. 21.13 Averaged equivalent circuit that models the system of Fig.21.12
The ﬂyback converter is replaced by its averaged equivalent circuit in Fig. 21.13.A sd i s -
cussed in Chap. 15, the terminal waveforms of the ﬂyback converter have been averaged over
the switching period Ts, resulting in the loss-free resistor model. This model illustrates how the
DCM ﬂyback converter presents a resistive load to the ac input. It also illustrates how the power
ﬂow can be controlled, by variation of D to control the value of the emulated resistance Re.
To design this converter, one must select the value of inductance to be su ﬃciently small,
such that the converter operates in DCM at all points on the ac sine wave, at maximum load.
If we denote the lengths of the transistor conduction interval, diode conduction interval, and
discontinuous interval asDT
s, d2Ts, and d3Ts, respectively, then the converter operates in DCM
provided that d3 is greater than zero. This implies that
d2(t)< 1−D (21.38)
By volt-second balance on the transformer magnetizing inductance, we can express d2(t)a s
d2(t)= Dvg(t)
nV (21.39)
Substitution of Eq. (21.39) into Eq. (21.38) and solution for D yields

880 21 Pulse-Width Modulated Rectiﬁers
D< 1⎦
1+ vg(t)
nV
) (21.40)
During a given switching period, the converter will operate in DCM provided that the above
inequality is satisﬁed. The worst case occurs when the rectiﬁed sinusoid vg(t) is equal to its
peak value VM. The inequality then becomes
D< 1⎦
1+ VM
nV
) (21.41)
If Eq. (21.41) is satisﬁed, then the converter operates in DCM at all points on the ac line sinu-
soid.
In steady state, the dc output voltage is given by Eq. (21.8). Upon substitution of the expres-
sion for Re and solution for D, this equation becomes
D= 2nV
VM
√
L
RTs
(21.42)
Insertion of this relationship into Eq. (21.41), and solution for L, yields
L< Lcrit= RTs
4
⎦
1+ nV
VM
)2 (21.43)
For variations in load R and peak ac input voltage VM, the worst case will occur at minimum R
(maximum power) and minimum VM. Hence, the designer should choose L to satisfy
L< Lcrit−min= RminTs
4
⎦
1+ nV
VM−min
)2 (21.44)
If this equation is violated, then at maximum load power and minimum input voltage amplitude,
the convert will operate in CCM near the peak of the ac sinewave. This will lead to an input
current waveform having substantial distortion.
21.3 Control of the Current Waveform
A wide variety of approaches are known for active control of the input current waveform to
attain input resistor emulation [ 177, 178, 255–272]. Average current control [177, 178], input
voltage feedforward [177], current-programmed control [258–261], hysteretic control and crit-
ical conduction mode control [ 262–266], and nonlinear carrier control [ 267–269] are brieﬂy
surveyed here. Other approaches include sliding-mode control [270], charge control [271], and
ASDTIC control [272].

21.3 Control of the Current Waveform 881
+
+
v(t)vg(t)
ig(t)
Gate
driver
Pulse width
modulator
CompensatorGc(s)
+
+Current
reference vr(t)
va(t)
 Rs ig(t) Ts
L
Current
sense
circuit
ig
Fig. 21.14 Sensing and control of the average input current of a boost converter
21.3.1 Average Current Control
Average current control is a popular method of implementing control of the input current wave-
form in a low-harmonic rectiﬁer. This approach works in both continuous and discontinuous
conduction modes, and can produce high-quality current waveforms over a wide range of in-
put voltages and load powers. The problems of crossover distortion, found in some competing
schemes such as current programmed control, are largely avoided. Several popular integrated
circuits are available that implement average current control. Small-signal modeling of average
current controlled converters is discussed in Sect. 18.9.
Figure 21.14 illustrates average current control of the input current waveform ⟨i
g(t)⟩Ts in a
boost converter. The input current ig(t) ﬂows through a shunt resistor. The voltage across this
shunt resistor is ampliﬁed by an op amp circuit. This op amp circuit contains a low-pass ﬁlter
characteristic that attenuates the high-frequency switching harmonics. The output voltage va(t)
of the op amp circuit is proportional to the low-frequency average value of ig(t):
va(t)= Rs⟨ig(t)⟩Ts (21.45)
This signal is compared to the reference voltage vr(t), to produce an error signal that drives
the compensator network and pulse-width modulator as illustrated. If the feedback loop is well
designed, then the error signal is small:
v
a(t)≈vr(t) (21.46)
The average current controller causes the sensed current ig(t) to follow the reference wave-
form vr(t).
To cause the input current to be proportional to the input voltage, the reference voltage
vr(t) is derived from the sensed input voltage waveform, as in Fig.21.15. The current reference

882 21 Pulse-Width Modulated Rectiﬁers
Boost converter
Controller
Rvac(t)
iac(t) +
vg(t)
ig(t)
ig(t)vg(t)
+
v(t)
i(t)
Q1
L
C
D1
vcontrol(t)
Multiplier X
+vr (t)
= kx vg(t) vcontrol(t)
Rs
va(t)
Gc(s)
PWM
Compensator
verr(t)
Fig. 21.15 Average current control of a boost converter, to obtain a low-harmonic rectiﬁer
signal vr(t) is derived from the sensed input voltagevg(t), and hence has a sinusoidal waveshape.
Hence, the average current controller causes the average input currentig(t) to be proportional to
the input voltage vg(t). The multiplier illustrated in Fig.21.15 allows adjustment of the constant
of proportionality, so that the magnitude of the emulated resistance can be controlled via a
control signal vcontrol(t). Let us assume that the multiplier terminal equations are
vr(t)= kxvg(t)vcontrol(t) (21.47)
Then the emulated resistance is
Re= vg(t)
ig(t)=
⎦ vr(t)
kxvcontrol(t)
)
⎦va(t)
Rs
) (21.48)
Here, Eqs. (21.47) and (21.45) have been used to eliminatevg and ig. Substitution of Eq. (21.46)
leads to the result
Re(vcontrol(t))= Rs
kxvcontrol(t) (21.49)
Hence, if the feedback loop is well designed, then the system of Fig. 21.15 can be represented
by the LFR model as in Fig. 21.16. The average current controller scheme of Fig. 21.15 and
the model of Fig. 21.16 are independent of the dc–dc converter topology, and can be applied to
systems containing CCM boost, buck–boost, ´Cuk, SEPIC, and other topologies.
Average power ﬂow and the output voltage are regulated by variation of the emulated re-
sistance Re, in average current control as well as in most other schemes. This is usually ac-
complished by use of a multiplier in the input voltage sensing path, as shown in Fig. 21.17.

21.3 Control of the Current Waveform 883
Rvac(t)
iac(t)
Re
+
vcontrol(t)
v(t) Ts
+
Ideal rectifier (LFR)
C
Re(t)
Re(t)= Rs
k x vcontrol(t)
i(t) Tsig(t) Ts
p(t) Ts
vg(t) Ts
Fig. 21.16 Model of the system of Fig. 21.5, based on the loss-free resistor model of Fig. 21.1c, which
predicts the low-frequency system waveforms. This model assumes that the feedback loop of Fig. 21.15
operates ideally
+
+
v(t)vg(t)
ig(t)
Gate
driver
Pulse width
modulator
CompensatorGc(s)
+
+
vref1(t)kx xyx
y
Multiplier
vg(t)
vcontrol(t) Gcv(s) +
dc
voltage
reference
C
v
ref2(t)
v(t)
verr(t)
va(t)
Fig. 21.17 Average current control incorporating a multiplier for regulation of the output voltage
This control loop continually adjusts Re to maintain balance of the average rectiﬁer power
Pav= V2
g,rms/Re and the load power Pload, such that the following relation is obeyed:
Pav=
V2
g,rms
Re
= Pload (21.50)
Average current control works quite well. Its only disadvantages are the need to sense the aver-
age input current, rather than the transistor current, and the need for a multiplier in the controller
circuit.

884 21 Pulse-Width Modulated Rectiﬁers
+
+
v(t)vg(t)
ig(t)
Gate
driver
Pulse width
modulator
CompensatorGc(s)
+
+
vref1(t)x
y
multiplier
vg(t)
vcontrol(t) Gcv(s) +
kv
xy
z2zPeak
detector VM
vref2
va(t)
Fig. 21.18 Average current control incorporating input voltage feedforward
Most average current control implementations include provisions for feedforward of the in-
put voltage amplitude. This allows disturbances in the ac input voltage amplitude to be canceled
out by the controller, such that the dc output voltage is unaﬀected.
Combination of Eqs. (21.47), (21.49), and (21.50), and solution for vref1(t) leads to
vref1(t)= Pavvg(t)Rs
V2g,rms
(21.51)
This equation shows how the reference voltage should be varied to maintain a given rectiﬁer
average power throughput Pav. Apparently, it is necessary to divide by the square of the rms
input voltage amplitude. A controller that implements Eq. ( 21.51) is illustrated in Fig. 21.18.
The multiplier block of Fig. 21.17 has been generalized to perform the function kv xy/z2.I ti s
somewhat complicated to compute the rms value of a general ac waveform; however, the ac
input voltage vg(t) normally is sinusoidal with negligible harmonics. Hence, the peak value of
vg(t) is directly proportional to its rms value, and we can use the peak value VM in place of
Vg,rms. So the controller of Fig. 21.18 produces the reference voltage
vref1(t)= kvvcontrol(t)vg(t)
V2
M
(21.52)
Comparison of Eqs. (21.51) and (21.52) leads to the conclusion that
Pav= kvvcontrol(t)
2Rs
(21.53)
So the average power throughput is directly controlled by vcontrol(t), and is independent of the
input voltage vg(t).

21.3 Control of the Current Waveform 885
Feedforward can cause the rectiﬁer dc output voltage to be less sensitive to variations in the
ac line voltage. A disadvantage is the ac line current distortion introduced by variations in the
voltage produced by the peak detector.
To aid in the design of the inner feedback loop that controls the ac line current waveshape, a
converter model is needed that describes how the converter average input current depends on the
duty cycle. We would prefer to apply the averaged small-signal modeling techniques of Chap.7
here. The problem is that the variations in the duty cycle d(t), as well as in the ac input voltage
vg(t) and current ig(t), are not small. As a result, in general the small-signal assumptions are
violated, and we are faced with the design of a control system that exhibits signiﬁcant nonlinear
time-varying behavior.
When the rectiﬁer operates near periodic steady state, the output voltage v(t) of a well-
designed system exhibits small variations. So we can write
⟨v(t)⟩Ts = V+ ˆv(t) (21.54)
with
|ˆv(t)|≪| V| (21.55)
In other words, the small-signal assumption continues to be valid with respect to the rectiﬁer
output voltage. In the case of the boost converter, this allows us to linearize the converter input
characteristics.
Following the approach of Chap.7, we can express the average inductor voltage of the boost
converter as
Ld⟨ig(t)⟩Ts
dt =⟨vg(t)⟩Ts −d′(t)⟨v(t)⟩TS (21.56)
This equation contains the nonlinear term d′(t)⟨v(t)⟩Ts . Substitution of Eq. (21.54)i n t o(21.56)
yields
Ld⟨ig(t)⟩Ts
dt =⟨vg(t)⟩Ts −d′(t)V−d′(t)ˆv(t) (21.57)
When Eq. (21.55) is satisﬁed, then the nonlinear term −d′(t)ˆv(t) is much smaller in magnitude
than the linear term−d′(t)V Therefore, we can discard the nonlinear term to obtain
Ld⟨ig(t)⟩Ts
dt =⟨vg(t)⟩Ts −d′(t)V (21.58)
This linear diﬀerential equation is valid even thoughig(t), vg(t), and d(t) contain large variations.
An equivalent circuit corresponding to Eq. ( 21.58) is given in Fig. 21.19. This circuit pre-
dicts that the averaged control-to-input-current and input-voltage-to-input-current transfer func-
tions are described by
Fig. 21.19 Linearized model describing the
boost converter input dynamics, corresponding to
Eq. (21.58) +
L
+ d (t)Vvg(t) Ts
ig(t) Ts

886 21 Pulse-Width Modulated Rectiﬁers
ig(s)= V
sL d(s)+ 1
sL vg(s)
= Gid(s)d(s)+ Gig(s)vg(s) (21.59)
where ig(s) is the Laplace transform of⟨ig(t)⟩Ts and vg(s) is the Laplace transform of⟨vg(t)⟩Ts .
So the input characteristics of the boost rectiﬁer can be linearized, even though the ac input
variations are not small.
Unfortunately, Eq. (21.55) is not suﬃcient to linearize the equations describing the input
characteristics of the buck–boost, SEPIC, ´Cuk, and most other single-phase rectiﬁers. The con-
trol system design engineer must then deal with a truly nonlinear time-varying dynamical sys-
tem.
One approach that is sometimes suggested employs the quasi-static approximation [273,
274]. It is assumed that the ac line variations are much slower than the rectiﬁer system dynamics,
such that the rectiﬁer always operates near equilibrium. The quiescent operating point changes
slowly along the input sinusoid; an equilibrium analysis can be performed to ﬁnd expressions
for the slowly-varying “equilibrium” duty ratio and converter voltages and currents. The small-
signal dc–dc converter transfer functions derived in Chaps. 7 and 8 are evaluated using this
time-varying operating point. The converter poles, zeroes, and gains are found to vary along the
ac input sinusoid. An average current controller is designed using these time-varying transfer
functions, such that the current loop gain has a positive phase margin at all operating points.
We expect that the quasi-static approximation should be valid if the rectiﬁer system dynam-
ics are suﬃciently fast, and it is reasonable to anticipate that high-frequency PWM converters
have dynamics that are much faster than the ac line frequency. The problem is that no good
condition on system parameters, which can justify the approximation, is known for the basic
converter topologies. There is room for additional research in this area.
It is well-understood in the ﬁeld of control systems that when the rectiﬁer system dynamics
are not suﬃciently fast, the quasi-static approximation yields neither su ﬃcient nor necessary
conditions for stability of the resulting design. Time-varying “loop gains” that always have
a positive phase margin may nonetheless be unstable, and a negative phase margin does not
always imply instability. Such phenomena are sometimes observed in rectiﬁer systems. Even
worse, it is diﬃcult to justify the use of the Laplace transform on rectiﬁers described by time-
varying diﬀerential equations, unless the quasi-static approximation can be validated.
21.3.2 Current-Programmed Control
Another well-known approach to attaining input resistor emulation is the use of current-
programmed control. As illustrated in Fig. 21.20, the programmed current i
c(t) is made propor-
tional to the ac input voltage. This causes the average inductor current, and hence also⟨ig(t)⟩Ts ,
to approximately follow vg(t). As in average current control, a multiplier is used to adjust the
emulated resistance and average power ﬂow; the control signalvcontrol(t) is typically used to sta-
bilize the dc output voltage magnitude. Several rectiﬁer control ICs are commercially available,
which implement current-programmed control.
As discussed in Chap. 18, several mechanisms cause the average inductor current and hence
also⟨ig(t)⟩Ts to diﬀer from the programmed ic(t). These mechanisms introduce crossover distor-
tion and line current harmonics. An artiﬁcial ramp having suﬃciently large slopema is necessary
to stabilize the current-programmed boost converter when it operates in CCM with d(t)> 0.5.
The addition of this ramp causes⟨ig(t)⟩TS to diﬀer from ic(t). Additional deviation is introduced
```
