---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第21章part 2 - 21 Pulse-Width Modulated Rectifiers
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 886-905 > Chunk ID: `chapter-21-part-2`"
---

# 第21章part 2 - 21 Pulse-Width Modulated Rectifiers

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 886-905  
> Chunk ID: `chapter-21-part-2`

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
21.3 Control of the Current Waveform 887
Boost converter
Current-programmed controller
Rvg(t)
ig(t)
is(t)
vg(t)
+
v(t)
i2(t)
Q1
L
C
D1
vcontrol(t)
Multiplier X ic(t)
= kx vg(t) vcontrol(t)
+
++
+
Comparator Latch
ia(t)
Ts0
S
R
Q
ma
Clock
Fig. 21.20 Current-programmed control of a boost rectiﬁer
by the inductor current ripple. Both mechanisms are most pronounced when the inductor current
is small, near the zero crossings of the ac line waveforms.
The static input characteristics, that is, the average input current vs. the input voltage, of the
current-programmed boost converter are given by
⟨ig(t)⟩Ts =
⎧⎪⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎪⎩
vg(t) Li2
c (t) fsV
2(V−vg(t))(vg(t)+ maL)2 in DCM
ic(t)−
⎦
1−vg(t)
V
)⎦
ma+ vg(t)
2L
)
Ts in CCM
(21.60)
The converter operates in the continuous conduction mode when
⟨ig(t)⟩Ts > TsV
2L
vg(t)
V
⎦
1−vg(t)
V
)
(21.61)
In terms of the control current ic(t), the condition for operation in CCM can be expressed
ic(t)> TsV
L
⎦maL
V + vg(t)
V
)⎦
1−vg(t)
V
)
(21.62)
In the conventional current-programmed rectiﬁer control scheme, the control current ic(t)i s
simply proportional to the ac input voltage:
ic(t)= vg(t)
Re
(21.63)

888 21 Pulse-Width Modulated Rectiﬁers
0
0.2
0.4
0.6
0.8
1
0.0 0.2 0.4 0.6 0.8 1.0
vg(t)
V
jg(t)= ig(t) Ts
Rbase
V
CCM
DCM
Re
= Rbase
Re
= 4
Rbase
Re
= 0.33
Rbase
Re
= 0.5
Rbase
Re
= 2
Rbase
Re = 0.2
Rbase
R
e
= 0.1
R
base
Re =10Rbase
ma = V
2L
Rbase = 2L
Ts
Fig. 21.21 Static input characteristics of a current-programmed boost converter, with minimum stabiliz-
ing artiﬁcial ramp as in Eq. (21.64)
where Re is the emulated resistance that would be obtained if the average input current exactly
followed the reference current ic(t). The static input characteristics given by Eqs. ( 21.60)t o
(21.63) are plotted in Fig. 21.21. The average input current⟨ig(t)⟩Ts is plotted as a function of
the applied input voltage vg(t), for several values of emulated resistanceRe. The region near the
CCM-DCM boundary is shown. The curves are plotted for a ﬁxed artiﬁcial ramp having slope
ma= V
2L (21.64)
This is the minimum value of artiﬁcial ramp that stabilizes the boost current-programmed con-
troller at all static operating points. Decreasing ma below this value leads to instability at oper-
ating points in the continuous conduction mode at low vg(t)/V.
To obtain resistor emulation, it is desired that the static input characteristics be linear and
pass through the origin. It can be seen from Fig. 21.21 that this is not the case: the curves are
reasonably linear in the continuous conduction mode, but exhibit signiﬁcant curvature as the
CCM-DCM boundary is approached. The resulting average current waveforms are summarized
in Fig. 21.22.
To minimize the line current THD, it is apparent that the converter should be designed
to operate deeply in the continuous conduction mode for most of the ac line cycle. This is
accomplished with emulated resistances R
e that are much smaller than Rbase = 2L/Ts. In ad-
dition, the artiﬁcial ramp slope ma should be no greater than otherwise necessary. In practice,
THD of 5% to 10% can easily be obtained in rectiﬁers that function over a narrow range of
rms input voltages and load currents. However, low THD cannot be obtained at all operating
points in universal-input rectiﬁers; THD of 20% to 50% may be observed at maximum ac input

21.3 Control of the Current Waveform 889
0.0
0.2
0.4
0.6
0.8
1.0
t
ig(t)
Peak ig
Sinusoid
ma = V
2L
Rbase = 2L
Ts
Re
= 0.1
Rbase Re
= 0.
33
Rbase Re
= 2Rbase
Fig. 21.22 Input current waveforms predicted by the static input characteristics of Fig. 21.21, compared
with a pure sinusoid. Curves are plotted for the case VM = 0.8V, with minimum stabilizing artiﬁcial ramp
voltage. This problem can be solved by biasing the current reference waveform. Design of
current-programmed rectiﬁers is discussed in [ 258–261], and some strategies for solving this
problem are addressed in [258].
21.3.3 Critical Conduction Mode and Hysteretic Control
Another control scheme sometimes used in low-harmonic rectiﬁers, as well as in dc–dc con-
verters and dc-ac inverters, is hysteretic control. Rather than operating at a ﬁxed switching fre-
quency and duty cycle, the hysteretic controller switches the transistor on and oﬀas necessary
to maintain a waveform within given limits. A special case of hysteretic control, called critical
conduction mode control, is implemented in several commercially available ICs, and is popular
for low-harmonic rectiﬁers rated below several hundred Watts [262–264].
An example is the sinusoid of Fig.21.23a, in which the boost converter input current is con-
trolled to follow a sinusoidal reference with a±10% tolerance. The inductor current increases
when the transistor is on, and decreases when the transistor is oﬀ. So this hysteretic controller
switches the transistor on whenever the input current falls below 90% of the reference input.
The controller switches the transistor oﬀwhenever the input current exceeds 110% of the ref-
erence. Hysteretic controllers tend to have simple implementations. However, they have the
disadvantages of variable switching frequency and reduced noise immunity.
Another example of hysteretic control is the waveform of Fig. 21.23b. The lower limit is
chosen to be zero, while the upper limit is twice the reference input. This controller operates the
boost converter at the boundary between the continuous and discontinuous conduction modes.
An alternative control scheme that generates the same waveform simply operates the transistor
with constant on-time: the transistor is switched on when the inductor current reaches zero, and
is switched oﬀafter a ﬁxed interval of length t
on. The resulting inductor current waveform will
have a peak value that depends directly on the applied input voltage, and whose average value

890 21 Pulse-Width Modulated Rectiﬁers
(a)
t
ig(t)
(b)
t
ig(t)
ton
Fig. 21.23 Input current waveforms of two boost converters with hysteretic control: (a)±10% regulation
band, (b) critical conduction mode operation (±100% regulation band)
is one-half of its peak. With either control approach, the converter naturally exhibits loss-free-
resistor or ideal rectiﬁer behavior. The emulated resistance is
Re= 2L
ton
(21.65)
This scheme has the advantage of small inductor size and low-cost control ICs. Disadvantages
are increased peak currents, variable switching frequency, and the need for additional input EMI
ﬁltering.
A typical critical conduction mode controller is illustrated in Fig. 21.24. A zero-current
detector senses when ig(t) (the inductor current) is zero; this is typically accomplished by mon-
itoring the voltage across the inductor. The zero-current detector sets a latch, turning on the
transistor and initiating the switching period. The transistor current is also monitored, and is
compared to a sinusoidal reference v
r(t) that is proportional to the applied input voltage vg(t).
When the sensed current is equal to the reference, the latch is reset and the transistor is turned
oﬀ.
Since the switching frequency can vary, possibly over a wide range, it is important to care-
fully design the converter power stage. For a given power P, the required transistor on-time ton
can be found by combining Eqs. (21.17) and (21.65), and solving for ton:
ton= 4LP
V2
M
(21.66)

21.3 Control of the Current Waveform 891
Boost converter
Controller
Rvac(t)
iac(t) +
vg(t)
ig(t)
vg(t)
+
v(t)
i(t)
Q1
L
C
D1
vcontrol(t)
Multiplier X
vr (t)
= kx vg(t) vcontrol(t)
Rs
va(t)
Comparator
+
S
R
Q
Zero current
ig detector
EMI filter
Latch
Fig. 21.24 A typical implementation of critical conduction mode
Application of the principle of volt-second balance to inductor L of Fig. 21.24 leads to the
following equation:
vgton+ (vg−V)toﬀ= 0 (21.67)
Hence, the transistor oﬀ-time is given by
toﬀ= ton
vg
(V−vg) (21.68)
The switching period Ts is equal to
Ts= toﬀ+ ton (21.69)
Substitution of Eqs. (21.66) and (21.68) into Eq. (21.69) yields
Ts= 4LP
V2
M
1⎦
1−vg(t)
V
) (21.70)
The following expression for switching frequency is found by substitution of Eq. ( 21.11)i n t o
Eq. (21.70):
fs= 1
Ts
= V2
M
4LP
⎦
1−VM
V |sin(ωt)|
)
(21.71)
The maximum switching frequency occurs when sin(ωt) equals zero:
max fs= V2
M
4LP (21.72)
The minimum switching frequency occurs at the peak of the sine wave:
min fs= V2
M
4LP
⎦
1−VM
V
)
(21.73)

892 21 Pulse-Width Modulated Rectiﬁers
Equations (21.72) and (21.73) can be used to select the value of the inductanceL and the output
voltage V, so that the switching frequency varies over an acceptable range.
21.3.4 Nonlinear Carrier Control
The nonlinear carrier controller (NLC) is capable of attaining input resistor emulation in boost
and other converters that operate in the continuous conduction mode. Implementation of the
controller is quite simple, with no need for sensing of the input voltage or input current. There
is also no need for a current loop error ampliﬁer. The boost nonlinear-carrier charge controller
is inherently stable and is free from the stability problems that require addition of an artiﬁcial
ramp in current-programmed controllers.
A CCM boost rectiﬁer system with nonlinear-carrier charge control is illustrated in
Fig. 21.25, and waveforms are given in Fig. 21.26. The reasoning behind this approach is as
follows. It is desirable to control the transistor switch current i
s(t). This pulsating current is
much easier to sense than the continuous converter input current–a simple current transformer
can be used, as in Fig. 21.25. Further, it is desirable to control the integral of this current, or the
charge, for two reasons: (1) integration of the waveform leads to improved noise immunity and
(2) the integral of the waveform is directly related to its average value,
⟨i
s(t)⟩Ts = 1
Ts
∫ t+TS
t
is(τ)dτ (21.74)
S
R Q
Boost converter
Nonlinear-carrier charge controller
Rvg(t)
ig(t)
is(t)
+
v(t)
Q1
L
C
D1
vcontrol(t)
+
+
Comparator Latch
Ts0
Clock
n : 1
Ci
 vi (t)+
is /n vi (t)
Nonlinear carrier
generator
vc(t) Q
Fig. 21.25 Nonlinear carrier charge control of a boost converter

21.3 Control of the Current Waveform 893
Fig. 21.26 Transistor current is(t), parabolic car-
rier voltage vc(t), and integrator voltage vi(t)w a v e -
forms for the NLC-controller boost rectiﬁer of
Fig. 21.25
TsdTs0
is(t)
vc(t)
vi (t)
In a ﬁxed-frequency system, Ts is constant, and the integral over one switching period is
proportional to the average value. Hence the average switch current can be controlled to be
proportional to a reference signal by simply switching the transistor oﬀwhen the integral of the
switch current is equal to the reference. In the controller of Fig.21.25, the switch current is(t)i s
scaled by the transformer turns ratio n, and then integrated by capacitor Ci, such that
vi(t)= 1
Ci
∫ dTs
0
is(τ)
n dτ for 0 < t< dTs (21.75)
The integrator voltage vi(t) is reset to zero at the end of each switching period, and the integra-
tion process begins anew at the beginning of the next switching period. So at the instant that the
transistor is switched oﬀ, the voltage v
i(dTs) is proportional to the average switch current:
vi(dTs)=⟨is⟩Ts
nCi fs
for interval 0 < t< Ts (21.76)
How should the average switch current be controlled? To obtain input resistor emulation, it is
desired that
⟨ig(t)⟩Ts = ⟨vg(t)⟩Ts
Re(vcontrol) (21.77)
It is further desired to avoid sensing either ig(t)o r vg(t). As with other schemes, we will sense
the dc output voltage ⟨v(t)⟩TS to construct a low-bandwidth feedback loop that balances the
average input and output powers. So let us determine the relationship between ⟨is(t)⟩Ts and
⟨v(t)⟩Ts implied by Eq. (21.77). If we assume that the boost converter operates in the continuous
conduction mode, then we can write
⟨is(t)⟩Ts = d(t)⟨ig(t)⟩Ts (21.78)
and
⟨vg(t)⟩Ts = d′(t)⟨v(t)⟩Ts (21.79)

894 21 Pulse-Width Modulated Rectiﬁers
Substitution of Eqs. (21.78) and (21.79) into Eq. (21.77) leads to
⟨is(t)⟩Ts = d(t) (1−d(t)) ⟨v(t)⟩Ts
Re(vcontrol) (21.80)
The controller of Fig. 21.25 implements this equation.
The nonlinear carrier generator of Fig. 21.25 produces the parabolic waveform vc(t), given
by
vc(t)= vcontrol
⎦t
Ts
)⎦
1−t
Ts
)
for 0 ≤t≤Ts (21.81)
vc(t+ Ts)= vc(t)
This waveform is illustrated in Fig.21.26. Note that Eq. (21.81) resembles Eq. (21.80), with d(t)
replaced by (t/Ts). The controller switches the transistor oﬀat time t= dTs when the integrator
voltage vj(t) is equal to the carrier waveform vc(t). Hence, it is true that
vi(dTs)= vc(dTs)= vcontrol(t)d(t) (1−d(t)) (21.82)
Substitution of Eq. (21.76) yields
⟨is(t)⟩Ts
nCi fs
= vcontrol(t)d(t) (1−d(t)) (21.83)
This is of the same form as Eq. (21.80). Comparison of Eqs. (21.80) and (21.83) reveals that the
emulated resistance Re is given by
Re(vcontrol)= d(t)(1−d(t))⟨v(t)⟩Ts
⟨is(t)⟩Ts
= ⟨v(t)⟩Ts
nCi fsvcontrol(t) (21.84)
If the dc output voltage and the control voltage have negligible ac variation, then Re is essen-
tially constant, and the ac line current will exhibit low harmonic distortion. So neither the input
voltage nor the input current need to be sensed, and input resistor emulation can be obtained in
CCM boost converters by sensing only the switch current.
A simple way to generate the parabolic carrier waveform uses two integrators, as illustrated
in Fig. 21.27. The slowly varying control voltage vcontrol(t) is integrated, to obtain a ramp wave-
form vr(t) whose peak amplitude is proportional to vcontrol(t). The dc component of this wave-
form is removed, and then integrated again. The output of the second integrator is the parabolic
carrier v
c(t), illustrated in Fig. 21.26 and given by Eq. (21.81). Both integrators are reset to zero
before the end of each switching period by the clock generator. The amplitude of the parabolic
carrier, and hence also the emulated resistance, can be controlled by variation of vcontrol(t).
Equations ( 21.78) and ( 21.79) are valid only when the converter operates in the contin-
uous conduction mode. In consequence, the ac line current waveform is distorted when the
converter operates in DCM. Since this occurs near the zero crossings of the ac line voltage,
crossover distortion is generated. Nonetheless, the harmonic distortion is less severe than in
current-programmed schemes, and it is feasible to construct universal-input rectiﬁers that em-
ploy the NLC control approach. Total harmonic distortion is analyzed and plotted in [267].
Nonlinear carrier control can be applied to current-programmed boost rectiﬁers, as well as
to other rectiﬁers based on the buck–boost, SEPIC,´Cuk, or other topologies, with either integral
charge control or peak-current-programmed control [267, 268]. In these cases, a diﬀerent carrier
waveform must be employed. A nonlinear carrier controller in which the ac input voltage v
g(t)
is sensed, rather than the switch current is(t), is described in [269].

21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 895
+vcontrol(t)
Integrator with reset Integrator with reset
vc(t)
Removal of dc
component
Clock
Fig. 21.27 Generation of parabolic carrier waveform by double integration
21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers
An additional issue that arises in PWM rectiﬁer systems is the control of power drawn from
the ac line, the power delivered to the dc load, and the energy stored in a bulk energy storage
capacitor.
21.4.1 Energy Storage
It is usually desired that the dc output voltage of a converter system can be regulated with high
accuracy. In practice, this is easily accomplished using a high-gain wide-bandwidth feedback
loop. A well-regulated dc output voltage v(t)= V is then obtained, which has negligible ac
variations. For a given constant load characteristic, the load currentI and the instantaneous load
power p
load(t)= Pload are also constant:
pload(t)= v(t)i(t)= VI (21.85)
However, the instantaneous input power pac(t) of a single-phase ideal rectiﬁer is not constant:
pac(t)= vg(t)ig(t) (21.86)
If vg(t) is given by Eq. (21.11), and if ig(t) follows Eq. (21.1), then the instantaneous input power
becomes
pac(t)= V2
M
Re
sin2(ωt)= V2
M
2Re
(1−cos(2ωt)) (21.87)
which varies with time. The instantaneous input power is zero at the zero crossings of the ac
input voltage. Equations (21.85) and (21.87) are illustrated in Fig. 21.28a. Note that the desired
instantaneous load power pload(t) is not equal to the desired instantaneous rectiﬁer input power
pac(t). Some element within the rectiﬁer system must supply or consume the diﬀerence between
these two instantaneous powers.

896 21 Pulse-Width Modulated Rectiﬁers
(a)
Pload
pac(t)
(b)
t
vc(t)
Fig. 21.28 Waveforms of a single-phase ideal rectiﬁer system: ( a) pulsating ac input power pin(t), and
constant dc load power Pload;( b) energy storage capacitor voltage vC (t)
Since the ideal rectiﬁer does not consume or generate power, nor does it contain signiﬁcant
internal energy storage, it is necessary to add to the system a low-frequency energy storage
element such as an electrolytic capacitor. The diﬀerence between the instantaneous input and
load powers ﬂows through this capacitor.
The waveforms of rectiﬁer systems containing reactive elements can be determined by so-
lution of the rectiﬁer energy equation [ 275, 276]. If the energy storage capacitor C is the only
system element capable of signiﬁcant low-frequency energy storage, then the power pC(t)ﬂ o w -
ing into the capacitor is equal to the di ﬀerence between the instantaneous input and output
powers:
pC(t)= dEC(t)
dt =
d
⎦1
2 Cv2
C(t)
)
dt = pac(t)−pload(t) (21.88)
where C is the capacitance, vC(t) is the capacitor voltage, and EC(t) is the energy stored in the
capacitor. Hence as illustrated in Fig. 21.28b, when pac(t)> pload(t) then energy ﬂows into the
capacitor, and vC(t) increases. Likewise, vC(t) decreases when pac(t)< pload(t). So the capacitor
voltage vC(t) must be allowed to increase and decrease as necessary to store and release the
required energy. In steady state, the average values of pac(t) and pload(t) must be equal, so that
over one ac line cycle there is no net change in capacitor stored energy.
Where can the energy storage capacitor be placed? It is necessary to separate the energy
storage capacitor from the regulated dc output, so that the capacitor voltage is allowed to in-
dependently vary as illustrated in Fig. 21.28b. A conventional means of accomplishing this is
illustrated in Fig. 21.29. A second dc–dc converter is inserted, between the energy storage ca-
pacitor and the regulated dc load. A wide-bandwidth feedback loop controls this converter, to
attain a well-regulated dc load voltage. The capacitor voltagev
C(t) is allowed to vary. Thus, this

21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 897
vac(t)
iac(t)
Re
+
Ideal rectifier (LFR)
C
i2(t)ig(t)
pac(t) Ts
vg(t)
i(t)
load
+
v(t)
pload(t)= VI = Pload
Energy storage
capacitor
vC(t)
+
converter
Fig. 21.29 Elements of a single-phase-ac to dc power supply, in which the ac line current and dc load
voltage are independently regulated with high bandwidth. An internal independent energy storage capaci-
tor is required
system conﬁguration is capable of (1) wide-bandwidth control of the ac line current waveform,
to attain unity power factor, (2) internal low-frequency energy storage, and (3) wide-bandwidth
regulation of the dc output voltage. It is also possible to integrate these functions into a sin-
gle converter, provided that the required low-frequency independence of the input, output, and
capacitor voltages is maintained [277].
The energy storage capacitor also allows the system to function in other situations in which
the instantaneous input and output powers di ﬀer. For example, it is commonly required that
the output voltage remains regulated during ac line voltage failures of short duration. The hold-
up time is the duration that the output voltage v(t) remains regulated after v
ac(t) has become
zero. A typical requirement is that the system continues to supply power to the load during one
complete missing ac line cycle, that is, for 20 msec in a 50 Hz system. During the hold-up time,
the load power is supplied entirely by the energy storage capacitor. The value of capacitance
should be chosen such that at the end of the hold-up time, the capacitor voltage v
C(t) exceeds
the minimum value that the dc–dc converter requires to produce the desired load voltage.
The energy storage function could be performed by an element other than a capacitor, such
as an inductor. However, use of an inductor is a poor choice, because of its high weight and cost.
For example, a 100μF 100 V electrolytic capacitor and a 100μH 100 A inductor can each store
1 Joule of energy. But the capacitor is considerably smaller, lighter, and less expensive.
A problem introduced by the energy storage capacitor is the large inrush current observed
during the system turn-on transient. The capacitor voltage vC(t) is initially zero; substantial
amounts of charge and energy are required to raise this voltage to its equilibrium value. The
boost converter is not capable of limiting the magnitude of the resulting inrush current: even
when d(t) = 0, a large current ﬂows through the boost converter diode to the capacitor, as
long as the converter output voltage is less than the input voltage. Some additional circuitry is
required to limit the inrush current of the boost converter. Converters having a buck–boost type
conversion ratio are inherently capable of controlling the inrush current. This advantage comes
at the cost of additional switch stress.
It is also possible to design the ideal rectiﬁer to operate correctly when connected to utility
power systems anywhere in the world. Universal input rectiﬁers can operate with nominal ac
rms voltage magnitudes as low as the 100 V encountered in a portion of Japan, or as high
as the 260 V found in western Australia, with ac line frequencies of either 50 Hz or 60 Hz.
Regardless of the ac input voltage, the universal-input rectiﬁer produces a constant nominal dc
output voltage V
C.

898 21 Pulse-Width Modulated Rectiﬁers
vac(t)
iac(t)
Re
+
Ideal rectifier (LFR)
C
i2(t)ig(t)
vg(t)
i(t)
load
+
v(t)
pload(t)= VI = Pload
Energy storage
capacitor
vC(t)
+
converter
+Pload V
pac(t) Ts
Fig. 21.30 Low-frequency equivalent circuit of the system of Fig.21.29
Let us now consider in more detail the low-frequency energy storage process of the system
of Fig. 21.29. Let us assume that the dc–dc converter contains a controller having bandwidth
much greater than the ac line frequency, such that the load voltage contains negligible low-
frequency variations. A low-frequency model of the dc–dc converter is then as illustrated in
Fig. 21.30. The dc–dc converter produces constant voltagev(t)= V modeled by a voltage source
as shown. This causes the load to draw constant currenti(t)= I, leading to load power p
load(t)=
Pload. To the extent that converter losses can be neglected, the dc–dc converter input port draws
power Pload, regardless of the value of vC(t). So the dc–dc converter input port can be modeled
as a constant power sink, of value Pload.
The model of Fig. 21.30 implies that the diﬀerence between the rectiﬁer power pac(t) and
the load power Pload ﬂows into the capacitor, as given by Eq. ( 21.88). The capacitor voltage
increases when pac(t) exceeds Pload, and decreases when pac(t)i sl e s st h a nPload. In steady
state, the average values of pac(t) and Pload must be equal. But note that pac(t) is determined
by the magnitudes of vac(t) and Re, and not by the load. The system of Fig. 21.30 contains no
mechanism to cause the average rectiﬁer power and load power to be equal. In consequence,
it is necessary to add an additional control system that adjusts R
e as necessary, to cause the
average rectiﬁer output power and dc–dc converter input power to balance. The conventional
way to accomplish this is simply to regulate the dc component of vC(t).
A complete system containing ideal rectiﬁcation, energy storage, and wide-bandwidth out-
put voltage regulation is illustrated in Fig. 21.31. This system incorporates the boost converter
and controller of Fig.21.5, as well as a generic dc–dc converter with output voltage feedback. In
addition, the system contains a low-bandwidth feedback loop, which regulates the dc component
of the energy storage capacitor voltage to be equal to a reference voltage vref2. This is accom-
plished by slow variations of vcontrol(t) and Re. This controller should have suﬃciently small
loop gain at the even harmonics of the ac line frequency, so that variations in Re are much
slower than the ac line frequency.
Increasing the bandwidth of the energy storage capacitor voltage controller can lead to sig-
niﬁcant ac line current harmonics. When this controller has wide bandwidth and high gain, then
it varies Re(t) quickly, distorting the ac line current waveform. In the extreme limit of perfect
regulation of the energy storage capacitor voltage vC(t)= VC, then the capacitor stored energy
is constant, and the instantaneous input ac line power pac(t) and load power pload(t) are equal.
The controller prevents the energy storage capacitor from performing its low-frequency energy
storage function. The ac line current then becomes
iac(t)= pac(t)
vac(t)= pload(t)
vac(t) = Pload
VM sin(ωt) (21.89)

21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 899
Boost converter
Wide-bandwidth input current controller
vac(t)
iac(t) +
vg(t)
ig(t)
ig(t)vg(t)
+
vC(t)
i2(t)
Q1
L
C
D1
vcontrol(t)
Multiplier X
+vref1(t)
= kxvg(t)vcontrol(t)
Rs
va(t)
Gc(s)
PWM
Compensator
verr(t)
Converter Load
+
v(t)
i(t)
d(t)
+Compensator
and modulator
vref3
Wide-bandwidth output voltage controller
+Compensator vref2
Low-bandwidth energy-storage capacitor voltage controller
vC(t)
v(t)
Fig. 21.31 A complete dc power supply system incorporating a near-ideal single-phase boost rectiﬁer
system, energy storage capacitor, and dc–dc converter. Wide-bandwidth feedback loops regulate the ac
line current waveform and the dc load voltage, and a slow feedback loop regulates the energy storage
capacitor voltage
Fig. 21.32 Ac line current
waveform of the single-phase
ideal rectiﬁer with output volt-
age feedback, in the hypotheti-
cal case where constant instan-
taneous power is supplied to a
dc load. The THD tends to inﬁn-
ity, and the power factor tends
to zero
vac(t)
iac(t)
t
This waveform is sketched in Fig.21.32. In this idealized limiting case, the ac line current tends
to inﬁnity at the zero crossings of the ac line voltage waveform, such that the instantaneous
input power is constant. It can be shown that the THD of this current waveform is inﬁnite, and
its distortion factor and power factor are zero. So the bandwidth of this controller should be
limited.
The energy storage capacitor voltage ripple can be found by integration of Eq. (21.88). Un-
der steady-state conditions, where the average value of p
ac(t)= Pload, integration of Eq. (21.88)
yields
EC(t)= 1
2Cv2
C(t)= EC(0)+
∫ t
0
(−Pload cos(2ωt)) dt (21.90)
where ωis the ac line frequency. Evaluation of the integral leads to
EC(t)= EC(0)−Pload sin(2ωt)
2ω (21.91)

900 21 Pulse-Width Modulated Rectiﬁers
Therefore, the capacitor voltage waveform is
vC(t)=
√
2EC(t)
C =
√
v2
C(0)−Pload
ωC sin(2ωt) (21.92)
It can be veriﬁed that the rms value of this waveform is VC,rms = vC(0). Hence, Eq. (21.92) can
be written
vC(t)= VC,rms
√
1−Pload
ωCV2
C,rms
sin(2ωt) (21.93)
This waveform is sketched in Fig. 21.28b. The minimum and maximum values of the capacitor
voltage occur when sin (2 ωt) is equal to 1 and -l, respectively. Therefore, the peak-to-peak
capacitor voltage ripple is
2ΔvC = VC,rms
⎡⎢⎢⎢⎢⎢⎢⎣
√
1+ Pload
ωCV2
C,rms
−
√
1−Pload
ωCV2
C,rms
⎤⎥⎥⎥⎥⎥⎥⎦≈Pload
ωCVC,rms
(21.94)
The approximation is valid for Pload/(ωCV2
C,rms)s uﬃciently less than one, a condition that is
satisﬁed whenever the ac voltage ripple is suﬃciently less than VC,rms.
21.4.2 Modeling the Outer Low-Bandwidth Control System
As discussed above, the outer low-bandwidth controller, which varies the emulated resistance
as necessary to balance the average ac input and dc load powers, is common to all near-ideal
rectiﬁer systems. For design of this controller, the rectiﬁer can be modeled using the loss-free
resistor (LFR) model. Perturbation and linearization of the LFR lead to a small-signal equivalent
circuit that predicts the relevant small-signal transfer functions. Such a model is derived in this
section [245, 276, 278].
It is desirable to stabilize the rectiﬁer output voltage against variations in load power, ac
line voltage, and component characteristics. Hence, a voltage feedback loop is necessary. As
discussed in Sect. 21.4.1, this loop cannot attempt to remove the capacitor voltage ripple that
occurs at the second harmonic of the ac line frequency, 2 ω, since doing so would require that
R
e(t) change signiﬁcantly at the second harmonic frequency. This would introduce signiﬁcant
distortion, phase shift, and power factor degradation into the ac line current waveform. In con-
sequence this loop must have suﬃciently small gain at frequency 2ω, and hence its bandwidth
must be low. Therefore, for the purposes of designing the low-bandwidth outer control loop,
it is unnecessary to model the system high-frequency behavior. It can be assumed that any in-
ner wide-bandwidth controller operates ideally at low frequencies, such that the ideal rectiﬁer
model of Fig. 21.33a adequately represents the low-frequency system behavior.
A small-signal model is derived here that correctly predicts the control-to-output transfer
function and output impedance of any rectiﬁer system that can be modeled as a loss-free resistor.
The model neglects the complicating eﬀects of high-frequency switching ripple, and is valid for
control variations at frequencies suﬃciently less than the ac line frequency. Both resistive and
dc–dc converter/regulator loads are treated.
The steps in the derivation of the small-signal ac model are summarized in Fig. 21.33.F i g -
ure 21.33a is the basic ideal rectiﬁer model, in which the converter high-frequency switching

21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 901
(a)
Re (vcontrol)vg(t) Ts
vcontrol
+
Ideal rectifier (LFR)
ac
input
dc
output
+
ig(t) Ts
p(t) Ts
i2(t) Ts
v(t) Ts
C Load
(b)
+
i2(t) Ts
v(t) TsC LoadV g,rms
2
Re
V g,rms
2
Re
cos2 2 t
Rectifier output port
(c)
+
i2(t) T2L
v(t) T2L
C LoadV g,rms
2
Re
Rectifier output port
(d)
C
Rectifier output port
r2g2vg,rms j2vcontrol R
i2
+
v
Fig. 21.33 Steps in the derivation of the low-frequency small-signal rectiﬁer model: (a) large-signal LFR
model, averaged over one switching period Ts;( b) separation of power source into its constant and time-
varying components; (c) removal of second harmonic components by averaging over one-half of the ac
line period T2L;( d) small-signal model obtained by perturbation and linearization of (c)

902 21 Pulse-Width Modulated Rectiﬁers
ripple is removed via averaging over the switching period Ts, but waveform frequency com-
ponents slower than the switching frequency are correctly modeled, including the 2 ω second-
harmonic and dc components of output voltage. It is diﬃcult to use this model in design of the
feedback loop because it is highly nonlinear and time-varying.
If the ac input voltage vg(t)i s
vg(t)=
√
2vg,rms|sin(ωt)| (21.95)
then the model of Fig. 21.33a predicts that the instantaneous output power⟨p(t)⟩Ts is
⟨p(t)⟩Ts =
⟨vg(t)⟩2
Ts
Re(vcontrol(t))=
v2
g,rms
Re(vcontrol(t)) (1−cos(2ωt)) (21.96)
The output power is comprised of a constant termv2
g,rms/Re, and a term that varies at the sec-
ond harmonic of the ac line frequency. These two terms are explicitly identiﬁed in Fig.21.33b.
The second-harmonic variation in⟨p(t)⟩TS leads to time-varying system equations, and slow
variations in vcontrol(t) lead to an output voltage spectrum containing components not only at the
frequencies present in vcontrol(t), but also at the even harmonics of the ac line frequency and their
sidebands, as well as at the switching frequency and its harmonics and sidebands. It is desired
to model only the low-frequency components excited by slow variations in vcontrol(t), the load,
and the ac line voltage amplitude vg,rms. The even harmonics of the ac line frequency can be
removed by averaging over one-half of the ac line period
T2L= 1
2
2π
ω= π
ω (21.97)
Hence, we average over the switching period Ts to remove the switching harmonics, and then
average again over one-half of the ac line period T2L to remove the even harmonics of the
ac line frequency. The resulting model is valid for frequencies suﬃciently less than the ac line
frequencyω. Averaging of the rectiﬁer output voltage is illustrated in Fig.21.34: averaging over
T2L removes the ac line frequency harmonics, leaving the underlying low-frequency variations.
By averaging the model of Fig. 21.33b over T2L, we obtain the model of Fig. 21.33c. This step
removes the second-harmonic variation in the power source.
The equivalent circuit of Fig. 21.33c is time-invariant, but nonlinear. We can now perturb
and linearize as usual, to construct a small-signal ac model that describes how slow variations
t
v(t)
v(t) T2L
v(t) Ts
Fig. 21.34 Removal of components of v(t) at the harmonics of the ac line frequency, by averaging over
one-half of the ac line period T2L

21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 903
in vcontrol(t), vg,rms, and the load, aﬀect the rectiﬁer output waveforms. Let us assume that the
averaged output voltage⟨v(t)⟩T2L , rectiﬁer averaged output current ⟨i2(t)⟩T2L , rms line voltage
amplitude vg,rms, and control voltage vcontrol(t) can be represented as quiescent values plus small
slow variations:
⟨v(t)⟩T2L = V+ ˆv(t)
⟨i2(t)⟩T2L = I2+ ˆi2(t) (21.98)
vg,rms= Vg,rms+ ˆvg,rms(t)
vcontrol(t)= Vcontrol+ ˆvcontrol(t)
with
V≫| ˆv(t)|
I2≫| ˆi2(t)| (21.99)
Vg,rms ≫| ˆvg,rms(t)|
Vcontrol≫| ˆvcontrol(t)|
In the averaged model of Fig. 21.33c,⟨i2(t)⟩T2L is given by
⟨i2(t)⟩T2L =⟨p(t)⟩T2L
⟨v(t)⟩T2L
=
v2
g,rms(t)
Re(vcontrol(t))⟨v(t)⟩T2L
(21.100)
= f
⎦
vg,rms(t),⟨v(t)⟩T2L, vcontrol(t)
)
This equation resembles DCM buck–boost Eq. (15.50), and linearization proceeds in a similar
manner. Expansion of Eq. ( 21.100) in a three-dimensional Taylor series about the quiescent
operating point, and elimination of higher-order nonlinear terms, leads to
ˆi2(t)= g2 ˆvg,rms(t)+ j2 ˆvcontrol(t)−ˆv(t)
r2
(21.101)
where
g2=
df
⎦
vg,rms, V, Vcontrol
)
dvg,rms
⏐⏐⏐⏐
⏐⏐⏐
⏐
vg,rms=Vg,rms
= 2
Re(Vcontrol)
Vg,rms
V (21.102)
⎦
−1
r2
)
=
df
⎦
Vg,rms,⟨v⟩T2L, Vcontrol
)
d⟨v⟩T2L
⏐⏐
⏐⏐⏐
⏐
⏐⏐
⟨v⟩T2L=V
=−I2
V (21.103)
j2=
df
⎦
Vg,rms, V, vcontrol
)
dvcontrol
⏐⏐⏐
⏐
⏐⏐⏐
⏐
vcontrol=Vcontrol
=−
V2
g,rms
VR2
e (Vcontrol)
dRe(vcontrol)
dvcontrol
⏐⏐⏐
⏐
⏐
vcontrol=Vcontrol
(21.104)
A small-signal equivalent circuit based on Eq. (21.101) is given in Fig. 21.33d. Expressions for
the parameters g2, j2, and r2 for several controllers are listed in Table 21.1. This model is valid
for the conditions of Eq. (21.99), with the additional assumption that the output voltage ripple is
suﬃciently small. Figure21.33d is useful only for determining the various ac transfer functions;
no information regarding dc conditions can be inferred. The ac resistancer2 is derived from the

904 21 Pulse-Width Modulated Rectiﬁers
Table 21.1 Small-signal model parameters for several types of rectiﬁer control schemes
Controller type g2 j2 r2
Average current control with feedforward, Fig.21.18 0 Pav
VVcontrol
V2
Pav
Current-programmed control, Fig. 21.20 2Pav
VVg,rms
Pav
VVcontrol
V2
Pav
Nonlinear-carrier charge control of boost rectiﬁer, Fig.21.25 2Pav
VVg,rms
Pav
VVcontrol
V2
2Pav
Boost with critical conduction mode control, Fig. 21.24 2Pav
VVg,rms
Pav
VVcontrol
V2
Pav
DCM buck–boost, ﬂyback, SEPIC, or ´Cuk converters 2Pav
VVg,rms
2Pav
VD
V2
Pav
slope of the average value of the power source output characteristic, evaluated at the quiescent
operating point. The other coeﬃcients, j2 and g2, are also derived from the slopes of the same
characteristic, taken with respect to vcontrol(t) and vg,rms and evaluated at the quiescent operating
point. The resistance R is the incremental resistance of the load, evaluated at the quiescent
operating point. In the boost converter with hysteretic control, the transistor on-time ton replaces
vcontrol as the control input; likewise, the transistor duty cycled is taken as the control input to the
DCM buck–boost, ﬂyback, SEPIC, and ´Cuk converters. Harmonics are ignored for the current-
programmed and NLC controllers; the expressions given in Table21.1 assume that the converter
operates in CCM with negligible harmonics.
The control-to-output transfer function is
ˆv(s)
ˆvcontrol(s)= j2R∥r2
1
1+ sC R∥r2
(21.105)
The line-to-output transfer function is
ˆv(s)
ˆvg,rms(s)= g2R∥r2
1
1+ sCR∥r2
(21.106)
Thus, the small-signal transfer functions of the high-quality rectiﬁer contain a single pole, ascrib-
able to the output ﬁlter capacitor operating in conjunction with the incremental load resistance
R and r
2,t h eeﬀective output resistance of the power source. Although this model is based on
the ideal rectiﬁer, its form is similar to that of the dc–dc DCM buck–boost converter ac model
of Chap. 15. This is natural, because the DCM buck–boost converter is itself a natural loss-free
resistor. The major diﬀerence is that the rms value of the ac input voltage must be used, and that
the second harmonic components of r2, j2, and g2 must additionally be removed via averaging.
Nonetheless, the equivalent circuit and ac transfer functions are of similar form.
When the rectiﬁer drives a regulated dc–dc converter as in Fig. 21.29, then the dc–dc con-
verter presents a constant power load to the rectiﬁer, as illustrated in Fig. 21.30. In equilibrium,
the rectiﬁer and dc–dc converter operate with the same average power Pav and the same dc
voltage V. The incremental resistance R of the constant power load is negative, and is given by
R=−V2
Pav
(21.107)

21.5 RMS Values of Rectiﬁer Waveforms 905
which is equal in magnitude but opposite in polarity to the rectiﬁer incremental output resistance
r2, for all controllers except the NLC controller. The parallel combinationr2∥R then tends to an
open circuit, and the control-to-output and line-to-output transfer functions become
ˆv(s)
ˆvcontrol(s)= j2
sC (21.108)
and ˆv(s)
ˆvg,rms(s)= g2
sC (21.109)
In the case of the NLC controller, the parallel combinationr2∥R becomes equal to r2/2, and Eqs.
(21.105) and (21.106) continue to apply.
21.5 RMS Values of Rectiﬁer Waveforms
To correctly specify the power stage elements of a near-ideal rectiﬁer, it is necessary to compute
the root-mean-square values of their currents. A typical waveform such as the transistor current
of the boost converter, Fig. 21.35, is pulse-width modulated, with both the duty cycle and the
peak amplitude varying with the ac input voltage. When the switching frequency is much larger
than the ac line frequency, then the rms value can be well-approximated as a double integral.
The square of the current is integrated ﬁrst to ﬁnd its average over a switching period, and the
result is then integrated to ﬁnd the average over the ac line period. t
iQ(t)
Fig. 21.35 Modulated transistor current waveform, boost rectiﬁer
Computation of the rms and average values of the waveforms of a PWM rectiﬁer can be
quite tedious, and this can impede the eﬀective design of the power stage components. In this
section, several approximations are developed, which allow relatively simple analytical expres-
sions to be written for the rms and average values of the power stage currents, and which allow
comparison of converter approaches [255, 279]. The rms transistor current in the boost rectiﬁer
is found to be quite low.
The rms value of the transistor current is deﬁned as
I
Qrms=
√
1
Tac
∫ Tac
0
i2
Q(t)dt (21.110)
where Tac is the period of the ac line waveform. The integral can be expressed as a sum of
integrals over all of the switching periods contained in one ac line period:

906 21 Pulse-Width Modulated Rectiﬁers
IQms=
√
1
Tac
Ts
Tac/Ts∑
n=1
⎦1
Ts
∫ nTs
(n−1)Ts
i2
Q(t)dt
)
(21.111)
where Ts is the switching period. The quantity inside the parentheses is the value ofi2
Q averaged
over the nth switching period. The summation can be approximated by a Riemann integral in
the case when Ts is much less than Tac. This approximation corresponds to taking the limit as
Ts tends to zero, as follows:
IQrm≈
√
1
Tac
lim
Ts→0
⎡⎢⎢⎢⎢⎢⎢⎣Ts
Tac/Ts∑
n=1
⎦1
Ts
∫ nTs
(n−1)Ts
i2
Q(τ)dτ
)⎤⎥⎥⎥⎥⎥⎥⎦
=
√
1
Tac
∫ Tac
0
1
Ts
∫ t+Ts
t
i2
Q(τ)dτdt (21.112)
=
√
⟨⟨i2
Q(t)⟩TS⟩Tac
So i2
Q(t) is ﬁrst averaged over one switching period. The result is then averaged over the ac line
period, and the square root is taken of the result.
21.5.1 Boost Rectiﬁer Example
For the boost rectiﬁer, the transistor current iQ(t) is equal to the input current when the tran-
sistor conducts, and is zero when the transistor is oﬀ. Therefore, the average of i2
Q(t) over one
switching period is
⟨i2
Q⟩TS = 1
Ts
∫ t+Ts
t
i2
Q(t)dt (21.113)
= d(t)i2
ac(t)
If the input voltage is given by
vac(t)= VM| sinωt| (21.114)
then the input current will be
iac(t)= VM
Re
| sinωt| (21.115)
where Re is the emulated resistance. With a constant output voltage V, the transistor duty cycle
must obey the relationship
V
vac(t)= 1
1−d(t) (21.116)
This assumes that the converter dynamics are fast compared to the ac line frequency. Substitu-
tion of Eq. (21.114)i n t o(21.116) and solution for d(t) yields
d(t)= 1−VM
V | sinωt| (21.117)
Substitution of Eqs. (21.115) and (21.117) into Eq. (21.113) yields the following expression
```
