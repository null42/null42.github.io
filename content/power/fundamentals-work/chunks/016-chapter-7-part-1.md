---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第7章part 1 - 7 AC Equivalent Circuit Modeling
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 227-246 > Chunk ID: `chapter-7-part-1`"
---

# 第7章part 1 - 7 AC Equivalent Circuit Modeling

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 227-246  
> Chunk ID: `chapter-7-part-1`

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
7
AC Equivalent Circuit Modeling
7.1 Introduction
Converter systems invariably require feedback. For example, in a typical dc–dc converter appli-
cation, the output voltage v(t) must be kept constant, regardless of changes in the input voltage
vg(t)o ri nt h eeﬀective load resistance R. This is accomplished by building a circuit that varies
the converter control input [i.e., the duty cycle d(t)] in such a way that the output voltage v(t)
is regulated to be equal to a desired reference value vre f . In inverter systems, a feedback loop
causes the output voltage to follow a sinusoidal reference voltage. In modern low-harmonic
rectiﬁer systems, a control system causes the converter input current to be proportional to the
input voltage, such that the input port presents a resistive load to the ac source. So feedback is
commonly employed.
A typical dc–dc system incorporating a buck converter and feedback loop block diagram is
illustrated in Fig. 7.1. It is desired to design this feedback system in such a way that the output
voltage is accurately regulated, and is insensitive to disturbances in vg(t) or in the load current.
In addition, the feedback system should be stable, and properties such as transient overshoot,
settling time, and steady-state regulation should meet speciﬁcations. The ac modeling and de-
sign of converters and their control systems such as Fig. 7.1 is the subject of Part II of this
book.
To design the system of Fig.7.1, we need a dynamic model of the switching converter. How
do variations in the power input voltage, the load current, or the duty cycle a ﬀect the output
voltage? What are the small-signal transfer functions? To answer these questions, we will extend
the steady-state models developed in Chaps. 2 and 3 to include the dynamics introduced by the
inductors and capacitors of the converter. Dynamics of converters operating in the continuous
conduction mode can be modeled using techniques quite similar to those of Chaps. 2 and 3;t h e
resulting ac equivalent circuits bear a strong resemblance to the dc equivalent circuits derived
in Chap. 3.
Modeling is the representation of physical phenomena by mathematical means. In engineer-
ing, it is desired to model the important dominant behavior of a system, while neglecting other
insigniﬁcant phenomena. Simpliﬁed terminal equations of the component elements are used,
and many aspects of the system response are neglected altogether, that is, they are “unmodeled.”
The resulting simpliﬁed model yields physical insight into the system behavior, which aids the
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_7
215

216 7 AC Equivalent Circuit Modeling
+
+
v(t)vg(t)
Switching converterPower
input
Load
+
R
Compensator
Gc(s)
vref
Voltage
reference
v
Feedback
connection
Pulse-width
modulator
vc
Transistor
gate driver
c(t)
c(t)
TsdTs t t
vc(t)
Controller
Fig. 7.1 A simple dc–dc regulator system, including a buck converter power stage and a feedback net-
work
engineer in designing the system to operate in a given speciﬁed manner. Thus, the modeling pro-
cess involves use of approximations to neglect small but complicating phenomena, in an attempt
to understand what is most important. Once this basic insight is gained, it may be desirable to
carefully reﬁne the model, by accounting for some of the previously ignored phenomena. It is
a fact of life that real, physical systems are complex, and their detailed analysis can easily lead
to an intractable and useless mathematical mess. Approximate models are an important tool for
gaining understanding and physical insight.
As discussed in Chap.2, the switching ripple is small in a well-designed converter operating
in continuous conduction mode (CCM). Hence, we should ignore the switching ripple, and
model only the underlying ac variations in the converter waveforms. For example, suppose that
some ac variation is introduced into the control signal v
c(t), such that
vc(t)= Vc+ Vcm cosωmt (7.1)
where Vc and Vcm are constants,|Vcm|≪ Vc, and the modulation frequencyωm is much smaller
than the converter switching frequencyωS = 2πfs. This control signal is fed into a pulse-width
modulator (PWM) that generates a gate drive signal having switching frequency fs= 1/Ts and
whose duty cycle during each switching period depends on the control signal vc(t) applied dur-
ing that period. The resulting transistor gate drive signal is illustrated in Fig. 7.2a, and typical
buck–boost converter inductor current and output voltage waveformsiL(t) and v(t) are illustrated
in Fig. 7.2b. The spectrum of v(t) is illustrated in Fig. 7.3. This spectrum contains components
at the switching frequency as well as its harmonics and sidebands; these components are small
in magnitude if the switching ripple is small. In addition, the spectrum contains a low-frequency

7.1 Introduction 217
0 5 10 15 20
0
0.5
1
0 5 10 15 20
0
2
4
6
0 5 10 15 20
17
16
15
14
13
iL(t) Ts
iL(t)
vc(t)
Gate drive
(a)
(b)
(c)
t
Ts
t
Ts
t
Ts
v(t) Ts
v(t)
Fig. 7.2 Ac variation of the converter signals: (a) control signalvc(t) and transistor gate drive logic signal,
in which the duty cycle varies slowly; (b) the resulting inductor current waveform; (c) the resulting output
voltage waveform. Both the actual waveforms iL(t)a n d v(t), as well as their averaged, low-frequency
components⟨iL(t)⟩Ts and⟨v(t)⟩Ts are illustrated
Spectrum
of v (t)
m s
{
Modulation
frequency and its
harmonics
{
Switching
frequency and
sidebands
{
Switching
harmonics
Fig. 7.3 Spectrum of the output voltage waveform v(t)o fF i g .7.2
component at the modulation frequency ωm. The magnitude and phase of this component de-
pend not only on the control signal and duty-cycle variation, but also on the frequency response
of the converter. If we neglect the switching ripple, then this low-frequency component remains
[also illustrated in Fig. 7.2c]. The objective of our ac modeling e ﬀorts is to predict this low-
frequency component.

218 7 AC Equivalent Circuit Modeling
A simple method for deriving the small-signal model of CCM converters is explained in
Sect. 7.2. The switching ripples in the inductor current and capacitor voltage waveforms are
removed by averaging over one switching period. Hence, the low-frequency components of the
inductor and capacitor waveforms are modeled by equations of the form
Ld⟨iL(t)⟩Ts
dt =⟨vL(t)⟩Ts
C d⟨vC(t)⟩Ts
dt =⟨iC(t)⟩Ts (7.2)
where⟨x(t)⟩Ts denotes the average of x(t) over an interval of length Ts:
⟨x(t)⟩Ts = 1
Ts
∫ t+Ts/2
t−Ts/2
x(τ)dτ (7.3)
So we will employ the basic approximation of removing the high-frequency switching ripple by
averaging over one switching period. Yet the average value is allowed to vary from one switch-
ing period to the next, such that low-frequency variations are modeled. In e ﬀect, the “moving
average” of Eq. (7.3) constitutes low-pass ﬁltering of the waveform. A few of the numerous
references on averaged modeling of switching converters are listed at the end of this chapter
[15–17, 46, 61–76].
Note that the principles of inductor volt-second balance and capacitor charge balance pre-
dict that the right-hand sides of Eqs. ( 7.2) are zero when the converter operates in equilibrium.
Equations (7.2) describe how the inductor currents and capacitor voltages change when nonzero
average inductor voltage and capacitor current are applied over a switching period.
The averaged inductor voltage and capacitor currents of Eq. ( 7.2) are, in general, nonlin-
ear functions of the signals in the converter, and hence Eqs. ( 7.2) constitute a set of nonlinear
diﬀerential equations. Indeed, the spectrum in Fig. 7.3 also contains harmonics of the modula-
tion frequencyω
m. In most converters, these harmonics become signiﬁcant in magnitude as the
modulation frequency ωm approaches the switching frequency ωs, or as the modulation am-
plitude Dm approaches the quiescent duty cycle D. Nonlinear elements are not uncommon in
electrical engineering; indeed, all semiconductor devices exhibit nonlinear behavior. To obtain
a linear model that is easier to analyze, we usually construct a small-signal model that has been
linearized about a quiescent operating point, in which the harmonics of the modulation or exci-
tation frequency are neglected. As an example, Fig. 7.4 illustrates linearization of the familiar
diode i–v characteristic shown in Fig. 7.4b. Suppose that the diode current i(t) has a quiescent
(dc) value I and a signal component ˆi(t). As a result, the voltage v(t) across the diode has a
quiescent value V and a signal component ˆv(t). If the signal components are small compared to
the quiescent values,
| ˆv|≪| V|,| ˆi|≪| I| (7.4)
then the relationship between ˆv(t) andˆi(t) is approximately linear, ˆv(t)= r
Dˆi(t). The conductance
1/rD represents the slope of the diode characteristic, evaluated at the quiescent operating point.
The small-signal equivalent circuit model of Fig. 7.4c describes the diode behavior for small
variations around the quiescent operating point.
An example of a nonlinear converter characteristic is the dependence of the steady-state
output voltageV of the buck–boost converter on the duty cycleD, illustrated in Fig.7.5. Suppose
that the converter operates with some dc output voltage, say, V = −Vg, corresponding to a

7.1 Introduction 219
Fig. 7.4 Small-signal equivalent circuit modeling of the diode: (a) a nonlinear diode conducting currenti;
(b) linearization of the diode characteristic around a quiescent operating point; (c) a linearized small-signal
model
Fig. 7.5 Linearization of the static
control-to-output characteristic of the
buck–boost converter about the quiescent
operating point D= 0.5
quiescent duty cycle of D= 0.5. Duty-cycle variations ˆd about this quiescent value will excite
variations ˆv in the output voltage. If the magnitude of the duty-cycle variation is su ﬃciently
small, then we can compute the resulting output voltage variations by linearizing the curve. The
slope of the linearized characteristic in Fig. 7.5 is chosen to be equal to the slope of the actual
nonlinear characteristic at the quiescent operating point; this slope is the dc control-to-output
gain of the converter. The linearized and nonlinear characteristics are approximately equal in
value provided that the duty-cycle variations ˆd are suﬃciently small.
Although it illustrates the process of small-signal linearization, the buck–boost example of
Fig. 7.5 is oversimpliﬁed. The inductors and capacitors of the converter cause the gain to exhibit
a frequency response. To correctly predict the poles and zeroes of the small-signal transfer
functions, we must linearize the converter averaged di ﬀerential equations, Eqs. ( 7.2). This is
done in Sect. 7.2. A small-signal ac equivalent circuit can then be constructed using the methods

220 7 AC Equivalent Circuit Modeling
Fig. 7.6 Small-signal ac equivalent circuit model of the buck–boost converter
developed in Chap.3. The resulting small-signal model of the buck–boost converter is illustrated
in Fig. 7.6; this model can be solved using conventional circuit analysis techniques, to ﬁnd the
small-signal transfer functions, output impedance, and other frequency-dependent properties. In
systems such as Fig. 6.51, the equivalent circuit model can be inserted in place of the converter.
When small-signal models of the other system elements (such as the pulse-width modulator)
are inserted, then a complete linearized system model is obtained. This model can be analyzed
using standard linear techniques, such as the Laplace transform, to gain insight into the behavior
and properties of the system.
Two well-known variants of the ac modeling method, state-space averaging and circuit av-
eraging, are explained in Sect. 7.5 and Chap. 14. An extension of circuit averaging, known
as averaged switch modeling , is also discussed in Chap. 14. Since the switches are the only
elements that introduce switching harmonics, equivalent circuit models can be derived by av-
eraging only the switch waveforms. The converter models suitable for analysis or simulation
are obtained simply by replacing the switches with the averaged switch model. The averaged
switch modeling technique can be extended to other modes of operation such as the discontinu-
ous conduction mode, as well as to current-programmed control and to resonant converters. In
Sect. 7.4, it is shown that the small-signal model of any dc–dc pulse-width modulated CCM
converter can be written in a standard form. Called the canonical model, this equivalent cir-
cuit describes the basic physical functions that any of these converters must perform. A simple
model of the pulse-width modulator circuit is described in Sect. 7.3.
These models are useless if you do not know how to apply them. So in Chap.8, the frequency
response of converters is explored, in a design-oriented and detailed manner. Small-signal trans-
fer functions of the basic converters are tabulated. Bode plots of converter transfer functions
and impedances are derived in a simple, approximate manner, which allows insight to be gained
into the origins of the frequency response of complex converter systems.
These results are used to design converter control systems in Chap. 9 and input ﬁlters in
Chap. 17. The modeling techniques are extended in Chaps.15 and 18 to cover the discontinuous
conduction mode and the current-programmed mode.
7.2 The Basic AC Modeling Approach
In this section, the steps in derivation of the small-signal ac model of a PWM converter are
derived and explained. The key steps are: (a) development of the equations relating the low-
frequency averages of the inductor and capacitor waveforms, with use of a dynamic version
of the small-ripple approximation, (b) perturbation and linearization of the averaged equations,
and (c) construction of an ac equivalent circuit model.

7.2 The Basic AC Modeling Approach 221
+
L
CR
+
v(t)
12
i(t)
vg(t)
Fig. 7.7 Buck–boost converter example
(a)
+ LC R
+
v(t)
i(t)
vg(t)
(b)
+ LC R
+
v(t)
i(t)
vg(t)
Fig. 7.8 Buck–boost converter circuit: ( a) when the switch is in position 1, ( b) when the switch is in
position 2
The buck–boost converter of Fig. 7.7 is employed as an example. The analysis begins as
usual, by determination of the voltage and current waveforms of the inductor and capacitor.
When the switch is in position 1, the circuit of Fig. 7.8a is obtained. The inductor voltage and
capacitor current are
vL(t)= Ldi(t)
dt = vg(t) (7.5)
iC(t)= C dv(t)
dt =−v(t)
R (7.6)
With the switch in position 2, the circuit of Fig.7.8b is obtained. Its inductor voltage and capac-
itor current are
vL(t)= Ldi(t)
dt = v(t) (7.7)
iC(t)= C dv(t)
dt =−i(t)−v(t)
R (7.8)
7.2.1 Averaging the Inductor and Capacitor Waveforms
We ﬁrst derive the equation that governs how the averaged components of the inductor wave-
forms evolve with time. We know that the instantaneous inductor current and voltage are related
by the deﬁnition
Ldi(t)
dt = vL(t) (7.9)
Is there a similar relationship between the averages of the inductor voltage and current? Let us
compute the derivative of the average inductor current:

222 7 AC Equivalent Circuit Modeling
d⟨i(t)⟩Ts
dt = d
dt
[1
Ts
∫ t+Ts/2
t−Ts/2
i(τ)dτ
]
(7.10)
On the right side of this equation, we can interchange the order of diﬀerentiation and integration
because the inductor current is continuous, and because its derivativevL(t)/L has a ﬁnite number
of discontinuities over the period of integration. Hence, the above equation becomes
d⟨i(t)⟩Ts
dt = 1
Ts
∫ t+Ts/2
t−Ts/2
di (τ)
dτ dτ (7.11)
Finally, we can use Eq. (7.9) to replace di(τ)/dτwith vL(τ):
d⟨i(t)⟩Ts
dt = 1
Ts
∫ t+Ts/2
t−Ts/2
vL(τ)
L dτ (7.12)
This can be rearranged to obtain
L d⟨i(t)⟩Ts
dt =⟨vL(t)⟩Ts (7.13)
This result shows that average components of the inductor voltage and current follow the same
deﬁning equation (7.9), with no change in L and no additional terms.
We can employ a similar analysis to ﬁnd the relationship between the average components
of a capacitor voltage and current, with the following result:
C d⟨v(t)⟩Ts
dt =⟨iC(t)⟩Ts (7.14)
We next need to evaluate the right sides of the above two equations, by averaging the inductor
voltage and capacitor current waveforms.
7.2.2 The Average Inductor Voltage and the Small-Ripple Approximation
The inductor voltage and current waveforms for the buck–boost converter example are illus-
trated in Fig. 7.9. It is desired to compute the average inductor voltage ⟨vL(t)⟩Ts at some arbi-
trary time t. As illustrated in Fig. 7.9, the averaging interval extends over the interval beginning
at t−Ts/2 and ending at t+ Ts/2. For the example time illustrated, there is an interval of length
dTs in which the inductor voltage is vL = vg, and there are two intervals of total length d′Ts in
which the inductor voltage is vL= v.
We now make the small-ripple approximation. But rather than replacing vg(t), v(t), and i(t)
with their dc components Vg, V and I as in Chap. 2, we now replace them with their low-
frequency averaged values⟨vg(t)⟩Ts ,⟨v(t)⟩Ts , and⟨i(t)⟩Ts , deﬁned by Eq. (7.3). It is important to
note that it is valid to apply the small-ripple approximation only to quantities that actually have
small ripple and are nonpulsating; hence, we apply this approximation to the inductor currents,
capacitor voltages, and independent sources that indeed have small ripple and are continuous
functions of time.
The usefulness of the small-ripple approximation here is that we ignore the changes in these
quantities during one switching period or during the averaging interval (t−T
s/2, t+Ts/2). As in
the steady-state case, the small-ripple approximation considerably simpliﬁes the mathematics.

7.2 The Basic AC Modeling Approach 223
Fig. 7.9 Mechanics of evaluating the
average inductor waveforms at some ar-
bitrary time t: averaging the inductor
voltage v
L(t) and the inductor currenti(t)
v Ts
L
i(τ)
vg Ts
Lv Ts
L
τ
τ
vL(τ)
dTs
v(t) Ts
vg(t)
Ts
Averaging interval
Total time
d′Ts
t + Ts/2t Ts/2 t
Ts/2
tt + Ts/2t Ts/2
Ts/2
This approximation is valid provided that the natural frequencies of the circuit are su ﬃciently
slower than the switching frequency, so that the ripples in the actual inductor current and capac-
itor voltage waveforms are indeed small.
With the small-ripple approximation, we can express the inductor voltage for the subinterval
of length dTs [Eq. (7.5)] as
vL(t)= Ldi(t)
dt ≈⟨vg(t)⟩Ts (7.15)
In a similar manner, for the remaining subintervals of total length d′Ts [Eq. (7.7)], we can ex-
press the inductor voltage as
vL(t)= Ldi(t)
dt ≈⟨v(t)⟩Ts (7.16)
The average inductor voltage is therefore
⟨vL(t)⟩Ts = 1
Ts
∫ t+Ts/2
t−Ts/2
vL(τ) dτ≈d(t)⟨vg(t)⟩Ts + d′(t)⟨v(t)⟩Ts (7.17)
Insertion of this expression into Eq. (7.13) leads to
Ld⟨i(t)⟩Ts
dt = d(t)⟨vg(t)⟩Ts + d′(t)⟨v(t)⟩Ts (7.18)
This equation describes how the low-frequency components of the inductor current vary with
time, and is the desired result.
7.2.3 Discussion of the Averaging Approximation
The averaging operator, Eq. (7.3), is repeated below:
⟨x(t)⟩Ts = 1
Ts
∫ t+Ts/2
t−Ts/2
x(τ)dτ (7.19)

224 7 AC Equivalent Circuit Modeling
Averaging is an artiﬁce that facilitates the derivation of tractable equations describing the low-
frequency dynamics of the switching converter. It removes the waveform components at the
switching frequency and its harmonics, while preserving the magnitude and phase of the wave-
form low-frequency components. In this chapter, we replace the converter waveforms by their
averages, to ﬁnd models that describe the dynamic properties of switching converters operating
in the continuous conduction mode. In later chapters of this text, this averaging operator is em-
ployed in other situations such as the discontinuous conduction mode or current-programmed
control.
Figure 7.2 illustrates the inductor current and voltage waveforms of a buck–boost converter
in which the duty cycle is varied sinusoidally. The waveform averages as computed by Eq. (7.19)
are superimposed. It can be seen that the⟨i(t)⟩
Ts waveform indeed passes through the center of
the actual i(t) waveform. Additionally, an increase in⟨vL(t)⟩Ts causes an increase in the slope of
⟨i(t)⟩Ts , as predicted by Eq. (7.13).
The averaging operator of Eq. ( 7.19) is a transformation that e ﬀectively performs a low-
pass function to remove the switching ripple. Indeed, we can take the Laplace transformation
of Eq. (7.19) to obtain:
⟨x(s)⟩
Ts = Gav(s)x(s) (7.20)
It can be shown that Gav(s)i sg i v e nb y
Gav(s)= esTs/2−e−sTs/2
sTs
(7.21)
We can compute the eﬀect of the averaging operator on a sinusoid of angular frequency ωby
letting s= jωin the above equation. The transfer function Gav then becomes
Gav( jω)= ejωTs/2−e−jωTs/2
jωTs
= sin(ωTs/2)
ωTs/2 (7.22)
Figure 7.10 contains a plot of the magnitude (expressed in decibels) of Eq. 7.22 vs. frequency
(for more information on frequency response plots, see Sect. 8.1). The averaging operator ex-
hibits a low-frequency gain of 1 (or 0 dB), and a gain of zero (or −∞dB) at the switching
frequency fs and its harmonics. Equation (7.22) is purely real, and exhibits zero phase shift for
frequencies less than the switching frequency. Thus, the averaging operator preserves the magni-
tude and phase of the low-frequency components of the waveform, while removing components
at the switching frequency and its harmonics.
For frequencies f greater than approximately f
s/3, Fig. 7.10 exhibits substantial attenuation.
This suggests that averaged models may not accurately predict transient responses at higher
frequencies. The high-frequency dynamics of the discontinuous conduction mode is an example
of this behavior, and is discussed further in Sect. 15.5.
Unlike the steady-state analyses of Chaps. 2 and 3,F i g .7.9 is sketched at an arbitrary time
t, with an averaging interval that does not necessarily begin when the transistor is switched
on. This rigorous deﬁnition of averaging is important when modeling high-bandwidth control
schemes such as the current-programmed mode of Chap. 18. The choice of averaging interval
extending from ( t−T
s/2) to ( t+ Ts/2) preserves the phase of the waveform, and therefore
correctly predicts the behavior of current-programmed converters. It should also be noted that
computing the average by integrating one half-cycle into the future [i.e., to (t+ T
s/2)] does not
violate any physical causality constraint, because this is merely a modeling artiﬁce that is not
implemented in a physical circuit.

7.2 The Basic AC Modeling Approach 225
Fig. 7.10 Frequency response of the averaging operator:∥ Gav( jω)∥ given by Eq. (7.22)
We may also note that the result of Eq. (7.18) can be derived without such rigor. For deriva-
tion of continuous-time models of the continuous conduction mode, the same result is obtained
regardless of whether the averaging interval begins at ( t−Ts/2) or at the instant when the
transistor is switched on. For the remainder of this textbook, we will continue to employ the
simpler arguments begun in Chap. 2, in which the averaging interval begins when the transistor
is switched on. In later chapters, the more rigorous treatment will be employed when necessary,
such as when modeling the high-frequency dynamics of current-programmed control.
7.2.4 Averaging the Capacitor Waveforms
A similar procedure leads to the capacitor dynamic equation. The capacitor voltage and current
waveforms are sketched in Fig. 7.11. When the switch is in position 1, the capacitor current is
given by
i
C(t)= C dv(t)
dt =−v(t)
R ≈−⟨v(t)⟩Ts
R (7.23)
With the switch in position 2, the capacitor current is
iC(t)= C dv(t)
dt =−i(t)−v(t)
R ≈−⟨i(t)⟩Ts −⟨v(t)⟩Ts
R (7.24)
The average capacitor current can be found by averaging Eqs. (7.23) and (7.24); the result is
⟨iC(t)⟩Ts = d(t)
⎦
−⟨v(t)⟩Ts
R
)
+ d′(t)
⎦
−⟨i(t)⟩Ts −⟨v(t)⟩Ts
R
)
(7.25)
Upon inserting this equation into Eq. (7.2) and collecting terms, one obtains

226 7 AC Equivalent Circuit Modeling
Fig. 7.11 Buck–boost converter wave-
forms: (a) capacitor current, ( b)c a p a c i -
tor voltage
(a)
t
iC(t)
dTs Ts
0
v(t) Ts
R i(t) Ts
v(t) Ts
R
iC(t) Ts
(b) tv(t)
dTs Ts
0
v(0)
v(dTs)
v(Ts)
v(t) Ts
v(t) Ts
RC
v(t) Ts
RC
i(t) Ts
C
C d⟨v(t)⟩Ts
dt =−d′(t)⟨i(t)⟩Ts −⟨v(t)⟩Ts
R (7.26)
This is the basic averaged equation which describes dc and low-frequency ac variations in the
capacitor voltage.
7.2.5 The Average Input Current
In Chap. 3, it was found to be necessary to write an additional equation that models the dc
component of the converter input current. This allowed the input port of the converter to be
modeled by the dc equivalent circuit. A similar procedure must be followed here, so that low-
frequency variations at the converter input port are modeled by the ac equivalent circuit.
For the buck–boost converter example, the current ig(t) drawn by the converter from the
input source is equal to the inductor current i(t) during the ﬁrst subinterval, and zero during the
second subinterval. By neglecting the inductor current ripple and replacingi(t) with its averaged
value⟨i(t)⟩TS , we can express the input current as follows:
ig(t)=
{⟨i(t)⟩Ts during subinterval 1
0 during subinterval 2 (7.27)
The input current waveform is illustrated in Fig. 7.12. Upon averaging over one switching pe-
riod, one obtains
Fig. 7.12 Buck–boost converter wave-
forms: input source current ig(t)
t
ig(t)
dTs Ts
0 0
i(t) Ts
ig(t)
Ts
0

7.2 The Basic AC Modeling Approach 227
⟨ig(t)⟩Ts = d(t)⟨i(t)⟩Ts (7.28)
This is the basic averaged equation which describes dc and low-frequency ac variations in the
converter input current.
7.2.6 Perturbation and Linearization
The buck–boost converter averaged equations, Eqs. (7.18), (7.26), and (7.28), are collected be-
low:
Ld⟨i(t)⟩TS
dt = d(t)⟨vg(t)⟩Ts + d′(t)⟨v(t)⟩TS
C d⟨v(t)⟩TS
dt =−d′(t)⟨i(t)⟩Ts −⟨v(t)⟩Ts
R (7.29)
⟨ig(t)⟩TS = d(t)⟨i(t)⟩Ts
These equations are nonlinear because they involve the multiplication of time-varying quantities.
For example, the capacitor current depends on the product of the control inputd′(t) and the low-
frequency component of the inductor current, ⟨i(t)⟩Ts . Multiplication of time-varying signals
generates harmonics, and is a nonlinear process. Most of the techniques of ac circuit analysis,
such as the Laplace transform and other frequency-domain methods, are not useful for nonlinear
systems. So we need to linearize Eqs. (7.29) by constructing a small-signal model.
Suppose that we drive the converter at some steady-state, or quiescent, duty ratio d(t)= D,
with quiescent input voltage vg(t)= Vg. We know from our steady-state analysis of Chaps. 2
and 3 that, after any transients have subsided, the inductor current⟨i(t)⟩TS , the capacitor voltage
⟨v(t)⟩Ts , and the input current⟨ig(t)⟩Ts will reach the quiescent values I, V, and Ig, respectively,
where
V=−D
D′ Vg
I=−V
D′R
Ig= DI (7.30)
Equations (7.30) are derived as usual via the principles of inductor volt-second and capacitor
charge balance. They could also be derived from Eqs. (7.29) by noting that, in steady state, the
derivatives must equal zero.
To construct a small-signal ac model at a quiescent operating point (I, V), one assumes that
the input voltage vg(t) and the duty cycle d(t) are equal to some given quiescent values Vg and
D, plus some superimposed small ac variations ˆvg(t) and ˆd(t). Hence, we have
⟨vg(t)⟩Ts = Vg+ ˆvg(t) (7.31)
d(t)= D+ ˆd(t)
In response to these inputs, and after any transients have subsided, the averaged inductor current
⟨i(t)⟩Ts , the averaged capacitor voltage ⟨v(t)⟩Ts , and the averaged input current ⟨ig(t)⟩Ts wave-
forms will be equal to the corresponding quiescent valuesI, V, and Ig, plus some superimposed
small ac variations ˆi(t), ˆv(t), and ˆig(t):

228 7 AC Equivalent Circuit Modeling
⟨i(t)⟩Ts = I+ ˆi(t)
⟨v(t)⟩Ts = V+ ˆv(t) (7.32)
⟨ig(t)⟩Ts = Ig+ ˆig(t)
With the assumptions that the ac variations are small in magnitude compared to the dc quiescent
values, or ⏐⏐⏐ˆvg(t)
⏐⏐⏐≪
⏐⏐⏐Vg
⏐⏐⏐
⏐⏐⏐ ˆd(t)
⏐⏐⏐≪|D|⏐⏐
⏐ˆi(t)
⏐⏐
⏐≪|I|
|ˆv(t)|≪|V|⏐⏐
⏐ˆi
g(t)
⏐⏐
⏐≪
⏐⏐
⏐I
g
⏐⏐
⏐
(7.33)
then the nonlinear equations ( 7.29) can be linearized. This is done by inserting Eqs. ( 7.31)
and (7.32) into Eq. (7.29). For the inductor equation, one obtains
Ld(I+ ˆi(t))
dt = (D+ ˆd(t))(Vg+ ˆvg(t))+ (D′−ˆd(t))(V+ ˆv(t)) (7.34)
It should be noted that the complement of the duty cycle is given by
d′(t)= (1−d(t))= 1−(D+ ˆd(t))= D′−ˆd(t) (7.35)
where D′= 1−D. The minus sign arises in the expression ford′(t) because a d(t) variation that
causes d(t) to increase will cause d′(t) to decrease.
By multiplying out Eq. (7.34) and collecting terms, one obtains
L
⎦dI
dt+ dˆi(t)
dt
)
=
⎦
DVg+ D′V
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
Dc terms
+
⎦
Dˆvg(t)+ D′ ˆv(t)+
⎦
Vg−V
) ˆd(t)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
1st order ac terms
(linear)
+ ˆd(t)
⎦
ˆvg(t)−ˆv(t)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
2nd order ac terms
(nonlinear)
(7.36)
The derivative of I is zero, since I is by deﬁnition a dc (constant) term. For the purposes of
deriving a small-signal ac model, the dc terms can be considered known constant quantities. On
the right-hand side of Eq. (7.36), three types of terms arise:
Dc terms: These terms contain dc quantities only.
First-order ac terms: Each of these terms contains a single ac quantity, usually multiplied by a
constant coeﬃcient such as a dc term. These terms are linear functions of the ac variations.
Second-order ac terms : These terms contain the products of ac quantities. Hence they are
nonlinear, because they involve the multiplication of time-varying signals.
It is desired to neglect the nonlinear ac terms. Provided that the small-signal assumption,
Eq. (7.33), is satisﬁed, then each of the second-order nonlinear terms is much smaller in magni-
tude that one or more of the linear ﬁrst-order ac terms. For example, the second-order ac term
ˆd(t)ˆvg(t) is much smaller in magnitude than the ﬁrst-order ac term Dˆvg(t) whenever| ˆd(t)|≪ D.
So we can neglect the second-order terms. Also, by deﬁnition [or by use of Eq. ( 7.30)], the dc
terms on the right-hand side of the equation are equal to the dc terms on the left-hand side, or
zero.

7.2 The Basic AC Modeling Approach 229
We are left with the ﬁrst-order ac terms on both sides of the equation. Hence,
Ldˆi(t)
dt = Dˆvg(t)+ D′ ˆv(t)+ (Vg−V) ˆd(t) (7.37)
This is the desired result: the small-signal linearized equation that describes variations in the
inductor current.
The capacitor equation can be linearized in a similar manner. insertion of Eqs. ( 7.31)
and (7.32) into the capacitor equation of Eq. (7.29) yields
cd(V+ ˆv(t))
dt =−
⎦
D′−ˆd(t)
)
(I+ ˆi(t))−(V+ ˆv(t))
R (7.38)
Upon multiplying out Eq. (7.38) and collecting terms, one obtains
C
⎦dV
dt + dˆv(t)
dt
)
=
⎦
−D′I−V
R
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
Dc terms
+
⎦
−D′ˆi(t)−ˆv(t)
R + Id′(t)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
1st order ac terms
(linear)
+ ˆd(t)ˆi(t)/bracehext/bracehext
2nd order ac term
(nonlinear)
(7.39)
By neglecting the second-order terms, and noting that the dc terms on both sides of the equation
are equal, we again obtain a linearized ﬁrst-order equation, containing only the ﬁrst-order ac
t e r m so fE q .(7.39):
C dˆv(t)
dt =−D′ˆi(t)−ˆv(t)
R + I ˆd(t) (7.40)
This is the desired small-signal linearized equation that describes variations in the capacitor
voltage.
Finally, the equation of the average input current is also linearized. Insertion of Eqs. ( 7.31)
and (7.32) into the input current equation of Eq. (7.29) yields
Ig+ ˆig(t)= (D+ ˆd(t))(l+ ˆi(t)) (7.41)
By collecting terms, we obtain
Ig
Dc term
+ ˆig(t)
1st order ac term
= (DI)
Dc term
+
⎦
Dˆi(t)+ I ˆd(t)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
1st order ac terms
(linear)
+ ˆd(t)ˆi(t)/bracehext/bracehext
2nd order ac term
(nonlinear)
(7.42)
We again neglect the second-order nonlinear terms. The dc terms on both sides of the equation
are equal. The remaining ﬁrst-order linear ac terms are
ˆig(t)= Dˆi(t)+ I ˆd(t) (7.43)
This is the linearized small-signal equation that describes the low-frequency ac components of
the converter input current.
In summary, the nonlinear averaged equations of a switching converter can be linearized
about a quiescent operating point. The converter independent inputs are expressed as constant
(dc) values, plus small ac variations. In response, the converter averaged waveforms assume
similar forms. Insertion of Eqs. (7.31) and (7.32) into the converter averaged nonlinear equations
yields dc terms, linear ac terms, and nonlinear terms. If the ac variations are suﬃciently small
in magnitude, then the nonlinear terms are much smaller than the linear ac terms, and so can be
neglected. The remaining linear ac terms comprise the small-signal ac model of the converter.

230 7 AC Equivalent Circuit Modeling
7.2.7 Construction of the Small-Signal Equivalent Circuit Model
Equations (7.37), (7.40), and (7.43) are the small-signal ac description of the ideal buck–boost
converter, and are collected below:
Ldˆi(t)
dt = Dˆvg(t)+ D′ ˆv(t)+ (Vg−V) ˆd(t)
C dˆv(t)
dt =−D′ˆi(t)−ˆv(t)
R + I ˆd(t)
ˆig(t)= Dˆi(t)+ I ˆd(t) (7.44)
In Chap. 3, we collected the averaged dc equations of a converter, and reconstructed an equiva-
lent circuit that modeled the dc properties of the converter. We can use the same procedure here,
to construct averaged small-signal ac models of converters.
The inductor equation of ( 7.44), or Eq. ( 7.37), describes the voltages around a loop con-
taining the inductor. Indeed, this equation was derived by ﬁnding the inductor voltage via loop
analysis, then averaging, perturbing, and linearizing. So the equation represents the voltages
around a loop of the small-signal model, which contains the inductor. The loop current is the
small-signal ac inductor current ˆi(t). As illustrated in Fig. 7.13,t h et e r mLdˆi(t)/dt represents
the voltage across the inductor L in the small-signal model. This voltage is equal to three other
voltage terms. Dˆvg(t) and D′ ˆv(t) represent dependent sources as shown. These terms will be
combined into ideal transformers. The term (Vg−V) ˆd(t) is driven by the control input ˆd(t), and
is represented by an independent source as shown.
Fig. 7.13 Circuit equivalent to the small-signal ac inductor loop equation of Eq. (7.44)o r( 7.37)
The capacitor equation of ( 7.44), or Eq. ( 7.40), describes the currents ﬂowing into a node
attached to the capacitor. This equation was derived by ﬁnding the capacitor current via node
analysis, then averaging, perturbing, and linearizing. Hence, this equation describes the cur-
rents ﬂowing into a node of the small-signal model, attached to the capacitor. As illustrated in
Fig. 7.14,t h et e r mCd ˆv(t)/dt represents the current ﬂowing through capacitor C in the small-
signal model. The capacitor voltage is ˆ v(t). According to the equation, this current is equal
to three other terms. The term −D′ˆi(t) represents a dependent source, which will eventually
be combined into an ideal transformer. The term −ˆv(t)/R is recognized as the current ﬂowing
through the load resistor in the small-signal model. The resistor is connected in parallel with
the capacitor, such that the ac voltage across the resistor R is ˆv(t) as expected. The term I ˆd(t)i s
driven by the control input ˆd(t), and is represented by an independent source as shown.

7.2 The Basic AC Modeling Approach 231
Fig. 7.14 Circuit equivalent to the small-signal ac capacitor node equation of Eq. (7.44)o r( 7.40)
Fig. 7.15 Circuit equivalent to the small-
signal ac input source current equation of
Eq. (7.44)o r( 7.43)
Fig. 7.16 Buck–boost converter small-signal ac equivalent circuit: ( a) the circuits of Figs. 7.13, 7.14,
7.15, collected together; (b) combination of dependent sources into eﬀective ideal transformers, leading to
the ﬁnal model
Finally, the input current equation of ( 7.44), or Eq. ( 7.43), describes the small-signal ac
current ˆig(t) drawn by the converter out of the input voltage source ˆvg(t). This is a node equation
which states thatˆig(t) is equal to the currents in two branches, as illustrated in Fig.7.15. The ﬁrst
branch, corresponding to the Dˆi(t) term, is dependent on the ac inductor current ˆi(t). Hence, we
represent this term using a dependent current source; this source will eventually be incorporated
into an ideal transformer. The second branch, corresponding to the I ˆd(t) term, is driven by the
control input dˆ(t), and is represented by an independent source as shown.
The circuits of Figs.7.13, 7.14, and 7.15 are collected in Fig.7.16a. As discussed in Chap.3,
the dependent sources can be combined into e ﬀective ideal transformers, as illustrated in
Fig. 7.16b. The sinusoid superimposed on the transformer symbol indicates that the transformer

232 7 AC Equivalent Circuit Modeling
is ideal, and is part of the averaged small-signal ac model. So the eﬀective dc transformer prop-
erty of CCM dc–dc converters also inﬂuences small-signal ac variations in the converter signals.
The equivalent circuit of Fig. 7.16b can now be solved using techniques of conventional
linear circuit analysis, to ﬁnd the converter transfer functions, input and output impedances, etc.
This is done in detail in the next chapter. Also, the model can be reﬁned by inclusion of losses
and other nonidealities—an example is given in Sect. 7.2.10.
7.2.8 Discussion of the Perturbation and Linearization Step
In the perturbation and linearization step, it is assumed that an averaged voltage or current con-
sists of a constant (dc) component and a small-signal ac variation around the dc component. In
Sect. 7.2.6, the linearization step was completed by neglecting nonlinear terms that correspond
to products of the small-signal ac variations. In general, the linearization step amounts to taking
the Taylor expansion of a nonlinear relation and retaining only the constant and linear terms.
For example, the large-signal averaged equation for the inductor current in Eq. ( 7.29) can be
written as:
Ld⟨i(t)⟩
Ts
dt = d(t)⟨vg(t)⟩Ts + d′(t)⟨v(t)⟩Ts = f1
⎦
⟨vg(t)⟩Ts,⟨v(t)⟩Ts, d(t)
)
(7.45)
Let us expand this expression in a three-dimensional Taylor series, about the quiescent operating
point (Vg, V, D):
L
⎦dI
dt+ dˆi(t)
dt
)
= f1
⎦
Vg, V, D
)
+ ˆvg(t)∂f1(vg, V, D)
∂vg
⏐⏐
⏐⏐⏐
⏐
vg=Vg
+ˆv(t)∂f1(Vg, v, D)
∂v
⏐⏐
⏐⏐⏐
⏐
v=V+ ˆd(t)∂f1(Vg, V, d)
∂d
⏐⏐
⏐⏐⏐
⏐
d=D
(7.46)
+higher-order nonlinear terms
For simplicity of notation, the angle brackets denoting average values are dropped in the above
equation. The derivative of I is zero, since I is by deﬁnition a dc (constant) term. Equating the
dc terms on both sides of Eq. (7.46)g i v e s
0= f1(Vg, V, D) (7.47)
which is the volt-second balance relationship for the inductor. The coeﬃcients with the linear
terms on the right-hand side of Eq. (7.46) are found as follows:
∂f1(vg, V, D)
∂vg
⏐⏐⏐⏐
⏐⏐
vg=Vg
= D (7.48)
∂f1(Vg, v, D)
∂v
⏐⏐⏐⏐
⏐⏐
v=V
= D′ (7.49)
∂f1(Vg, V, d)
∂d
⏐⏐
⏐
⏐⏐⏐
d=D
= Vg−V (7.50)
Using (7.48), (7.49), and (7.50), neglecting higher-order nonlinear terms, and equating the linear
ac terms on both sides of Eq. (7.46)g i v e

7.2 The Basic AC Modeling Approach 233
Ldˆi(t)
dt = Dˆvg(t)+ D′ ˆv(t)+ (Vg−V) ˆd(t) (7.51)
which is identical to Eq. (7.37) derived in Sect. 7.2.6. In conclusion, the linearization step can
always be accomplished using the Taylor expansion.
(a)
Nonlinear
Load
+
v
i (b)
v
i
I
V
Slope
1/R
Fig. 7.17 Small-signal modeling of nonlinear load characteristic: ( a) schematic, (b) linearization of i–v
characteristic
A similar approach can be employed to nonlinear loads in the small-signal model. Fig-
ure 7.17 depicts linearization of a nonlinear load characteristic in which
i= f (v) (7.52)
We can expand thisi–v characteristic in a Taylor series about the quiescent operating point (V, I):
I+ ˆi= f (V)+ ˆv df (v)
dv
⏐⏐
⏐
⏐⏐
v=V
+ higher-order nonlinear terms (7.53)
The small-signal terms are
ˆi= ˆv
R (7.54)
where R is determined by the slope at the quiescent operating point:
1
R= df (v)
dv
⏐⏐
⏐⏐⏐
v=V
(7.55)
The DC solution of the converter proceeds from the nonlinear load characteristic of Eq. ( 7.52)
with v = V and i = I. The small-signal ac model of the converter employs the linearized
equation (7.54).
7.2.9 Results for Several Basic Converters
The equivalent circuit models for the buck, boost, and buck–boost converters operating in the
continuous conduction mode are summarized in Fig. 7.18. The buck and boost converter mod-
els contain ideal transformers having turns ratios equal to the converter conversion ratio. The
buck–boost converter contains ideal transformers having buck and boost conversion ratios; this
is consistent with the derivation of Sect. 6.1.2 of the buck–boost converter as a cascade connec-
tion of buck and boost converters. When the load is nonlinear, the incremental load resistance

234 7 AC Equivalent Circuit Modeling
Fig. 7.18 Averaged small-signal ac models for several basic converters operating in continuous conduc-
tion mode: (a) buck, (b) boost, (c) buck–boost
of Eq. (7.55) is employed. These models can be solved to ﬁnd the converter transfer functions,
input and output impedances, inductor current variations, etc. By insertion of appropriate turns
ratios, the equivalent circuits of Fig. 7.18 can be adapted to model the transformer-isolated ver-
sions of the buck, boost, and buck–boost converters, including the forward, ﬂyback, and other
converters.
7.2.10 Example: A Nonideal Flyback Converter
To illustrate that the techniques of the previous section are useful for modeling a variety of
converter phenomena, let us next derive a small-signal ac equivalent circuit of a converter con-
taining transformer isolation and resistive losses. An isolated ﬂyback converter is illustrated in
Fig. 7.19. The ﬂyback transformer has magnetizing inductance L, referred to the primary wind-
ing, and turns ratio 1:n. MOSFET Q
1 has on-resistance Ron. Other loss elements, as well as the
transformer leakage inductances and the switching losses, are negligible. The ac modeling of
this converter begins in a manner similar to the dc converter analysis of Sect.6.3.4. The ﬂyback
transformer is replaced by an equivalent circuit consisting of the magnetizing inductance L in
parallel with an ideal transformer, as illustrated in Fig. 7.20a.
```
