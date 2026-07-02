---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第4章part 2 - 4 Switch Realization
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 102-121 > Chunk ID: `chapter-4-part-2`"
---

# 第4章part 2 - 4 Switch Realization

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 102-121  
> Chunk ID: `chapter-4-part-2`

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
4.3 The Power Diode 87
the diode then supplies power (but in a typical converter, this power is lost elsewhere in the
converter, usually in a transistor). For t2< t< t4, both voltage and current are negative, and the
diode again consumes power. In addition to the negative current arising from minority charge
ﬂowing across the depletion region, additional current is caused by charging the capacitance
of the depletion region. This capacitive component of current does not constitute power loss
within the diode. Nonetheless, the power lost at this time can be quite substantial, since both the
voltage and current are large, and this component of power loss can lead to substantial switching
loss within the diode. We will see soon that the total switching loss within the diode plus the
associated switching transistor is substantial for the entire time from t
0 to t4.
The time extending from t0 to t4 is called the reverse recovery time, denoted tr. The charge
contained in the negative portion of the current i(t) waveform is called the recovered charge,
denoted Qr. This charge consists of the stored minority charge that is actively removed through
negative i(t), as well as changes in the capacitive charge of the reverse-biased depletion region.
The peak negative current at timet= t2 can be substantial, and may be several times larger than
the on-state current Ion, depending on the construction of the diode. This can cause signiﬁcant
instantaneous power dissipation during the reverse recovery, with signiﬁcant magnitude ofQr.
The magnitude of Qr can be reduced if the switching time is slow; this then causes more of
the stored minority charge to recombine rather than being actively removed through negative
i(t). If the slope di/dt for t
0< t< t2 is reduced, then Qr is observed to be reduced as well.
The softness factor S is deﬁned as
S= t4−t2
t2−t0
(4.11)
A diode whose turn-oﬀtransient is characterized by relatively large S is called a soft recovery
diode; conversely, a diode having a small value ofS is called a snappy diode. The reduced dv/dt
of soft recovery diodes can aid in the turn-on process of the associated power transistor, and can
also lead to reduced generation of electromagnetic interference. Semiconductor manufacturers
are able to adjust S through device design.
Thus, the familiar exponential i–v curve of the diode is an equilibrium relationship that can
be violated during transient conditions. During the turn-on and turn-o ﬀswitching transients,
the current may deviate substantially from the equilibrium i–v curve, because of changes in
the stored minority charge and changes within the reverse-biased depletion region. The reverse
recovery time tr is the time required to remove the stored charge in the diode and enable it to
block the full applied negative voltage. The area of the negative diode current during reverse
recovery is the recovered charge Q
r.
4.3.2 Discussion: Power Diodes
As noted in Sect. 4.2, the diﬀused-junction p–n power diode contains a lightly doped epitaxial
or intrinsic high-resistivity region, which allows a high breakdown voltage to be obtained. This
region is often called thedrift region. As illustrated in Fig.4.32a, this region comprises one side
of the p–n
−junction (denoted n−); under reverse-biased conditions, essentially all of the applied
voltage appears across the depletion region inside the n−region. Figure 4.32a illustrates the oﬀ
state of a punch-through design, in which the depletion region extends all of the way across
the n−region. The high electric ﬁeld is supported without breakdown by the lightly doped n−
material.

88 4 Switch Realization
(a)
Low doping concentration
{{
pn n
+
Depletion region, reverse-biased
+
+
+
v
E
(b)
Conductivity modulation
pn - n
+
Minority carrier injection
+
+
+
+
+
+
i
v
{
Fig. 4.32 Power diode: (a) under reverse-bias conditions, (b) under forward-bias conditions
On-state conditions are illustrated in Fig.4.32b. Holes are injected across the forward-biased
junction, and become minority carriers in then−region. In addition, electrons are injected across
the forward-biased n−–n junction, which increases the concentration of electron carriers in the
n−region. These hole and electron carriers eﬀectively reduce the apparent resistivity of the n−
region via conductivity modulation. Essentially all of the forward current i(t) is comprised of
recombination of minority carriers: either the recombination of holes and electrons within the
n
−region, the recombination of minority holes with majority electrons within the n region, or
the recombination of minority electrons with majority holes within the p region.
Diodes are rated according to the length of their reverse recovery timetr. Standard recovery
rectiﬁers are intended for 50 Hz or 60 Hz operation; reverse recovery times of these devices
are usually not speciﬁed. Fast recovery rectiﬁers and ultrafast recovery rectiﬁers are intended
for use in converter applications. The reverse recovery time tr, and sometimes also the recov-
ered charge Qr, are speciﬁed by manufacturers of these devices. Ratings of several commercial
devices are listed in Table4.1.
Schottky diodes are essentially majority-carrier devices whose operation is based on the
rectifying characteristic of a metal-semiconductor junction. These devices exhibit negligible
minority stored charge, and their switching behavior can be adequately modeled simply by
their depletion region capacitance and equilibrium exponential i–v characteristic. Hence, an
advantage of the Schottky diode is its fast switching speed. An even more important advantage

4.3 The Power Diode 89
Table 4.1 Characteristics of several commercial power rectiﬁer diodes
Part number Rated maximum voltage Rated average current VF (typical) tr (max)
Fast recovery rectiﬁers
lN3913 400 V 30 A 1.1 V 400 ns
SD453N2S20PC 2500 V 400 A 2.2 V 3 μs
Ultrafast recovery rectiﬁers
MUR815 150 V 8 A 0.975 V 35 ns
RHRD660 600 V 6 A 1.7 V 35 ns
RHRU100120 1200 V 100 A 2.6 V 60 ns
Schottky rectiﬁers
MBR6030L 30 V 60 A 0.48 V
444CNQ045 45 V 440 A 0.69 V
30CPQ150 150 V 30 A 1.19 V
SiC Schottky rectiﬁers
C4D10120E 1200 V 10 A 1.8 V
C3D3060F 600 V 3 A 1.7 V
of Schottky diodes is their low forward voltage drops, especially in devices rated 45 V or less.
Silicon Schottky diodes are restricted to low breakdown voltages; very few commercial devices
are rated to block 100 V or more. Their oﬀ-state reverse currents are considerably higher than
those of p–n junction diodes. Characteristics of several commercial Schottky rectiﬁers are also
listed in Table4.1.
Wide-bandgap semiconductor materials have recently become commercially signiﬁcant. Sil-
icon carbide (SiC) and, more recently, gallium nitride (GaN) materials exhibit an improved
tradeoﬀbetween blocking voltage, on-resistance, and switching speed. Schottky barrier diodes
based on SiC are available with 600 V and 1200 V ratings; these exhibit much faster switching
speeds and much lower Q
r than comparable silicon p–n devices. Although the built-in diode
drop is larger, the switching loss is much smaller; hence, overall e ﬃciency improvements are
observed. Because of the diﬃculties in producing high-quality compound semiconductor mate-
rial, wide-bandgap power devices are more expensive than traditional silicon devices.
Another important characteristic of a power semiconductor device is whether its on-resistance
and forward voltage drop exhibit a positive temperature coeﬃcient. Such devices, including the
MOSFET and IGBT, are advantageous because multiple chips can be easily paralleled, to ob-
tain high-current modules. These devices also tend to be more rugged and less susceptible to
hot-spot formation and second-breakdown problems. Diodes cannot be easily connected in par-
allel, because of their negative temperature coeﬃcients: an imbalance in device characteristics
may cause one diode to conduct more current than the others. This diode becomes hotter, which
causes it to conduct even more of the total current. In consequence, the current does not di-
vide evenly between the paralleled devices, and the current rating of one of the devices may
be exceeded. Since BJTs and thyristors are controlled by a diode junction, these devices also
exhibit negative temperature coeﬃcients and have similar problems when operated in parallel.
Of course, it is possible to parallel any type of semiconductor device; however, use of matched
devices, a common thermal substrate, and/or external circuitry may be required to cause the
on-state currents of the devices to be equal.

90 4 Switch Realization
4.3.3 Modeling Diode-Induced Switching Loss
Diode-induced switching loss is often one of the largest sources of power loss in a PWM switch-
ing converter. In this section, the equivalent circuit models of Chap. 3 are extended to include
the switching loss induced by the diode reverse-recovery process. The diode reverse recovery
time t
r and recovered charge Qr are included in the transistor and diode waveforms, and then
these waveforms are related to the inductor and capacitor waveforms. The principles of inductor
volt-second balance and capacitor charge balance are applied, along with the other techniques
of Chap. 3. Equivalent circuits are then constructed, which include the eﬀects of diode-induced
switching loss, that can be employed to predict eﬃciency and dc components of the converter
waveforms.
The discussion of this section employs the buck converter example illustrated in Fig. 4.33.
An ideal MOSFET is assumed, which is driven by a control signal c(t) having a duty cycle Dc.
The diode is taken to be a p–n diode having reverse recovery time tr and recovered charge Qr.
Other nonidealities are neglected in this example, including conduction losses, switching ripple,
etc.
Fig. 4.33 Buck converter example:
modeling switching loss +
LILit vt
vd
+
id
Vg
ig
C
iC
R
+
V
c(t)
vL
The assumed transistor and diode waveforms are illustrated in Fig. 4.34. In these idealized
waveforms, the diode softness factor is taken to be S= 0. The switching ripple in the inductor
current and capacitor voltage are assumed to be small. Additionally, the power stage duty cycle
D is deﬁned according to the transistor voltage waveform vt(t): the transistor voltage is zero
for the interval 0≤t≤DTs. This deﬁnition causes the inductor volt-second balance equation
to coincide with the results for the ideal case, and leads to an equivalent circuit having a dc
transformer with turns ratio 1 : D.
It can be noted that the diode reverse recovery timetr distorts the duty cycle, and causes the
eﬀective power stage duty cycle D to be smaller than the duty cycle Dc produced by the control
circuit:
D= Dc−tr
Ts
(4.12)
Switching times, as well as phenomena such as gate driver delays, can create some ambiguity
in determination of the duty cycle. In this discussion, the power stage duty cycle D is deﬁned
according to the transistor voltage waveform.
We can relate these waveforms to the inductor voltage, capacitor current, and converter input
current. The inductor voltage vL(t) is related to the diode voltage vd(t) as follows:
vL(t)= vd(t)−V (4.13)

4.3 The Power Diode 91
Fig. 4.34 Assumed
waveforms for the
buck converter with
diode reverse recov-
ery, Fig.4.33
Transistor
current
Diode
voltage
Area
tr
t
ILit (t)
Qr
0
vt(t)
t
Vg
0
vd (t)
DTs Ts
IL
Vg
Transistor
voltage
t
Vg
0
Diode
current
Area t
IL
0
id (t)
Qr
DTs D Ts
0
Control
signal
t
DcTs
DTs
on
off
c(t) DcTs
Fig. 4.35 Buck converter example:
inductor voltage waveform
vL(t) Vg
tDTs
Subtraction of the output voltageV from the diode voltage waveformvd(t) illustrated in Fig.4.34
leads to the inductor voltage waveform of Fig. 4.35. It can be seen that, with the deﬁnition of
D as in Eq. ( 4.12), we obtain the usual inductor voltage waveform. Application of inductor
volt-second balance to this waveform leads to
⟨vL⟩= 0= DVg−V (4.14)

92 4 Switch Realization
The capacitor current iC(t) is related to the inductor and load currents in the usual manner.
Capacitor charge balance leads to
⟨iC⟩= 0= IL−V
R (4.15)
Construction of an equivalent circuit corresponding to these two equations, according to the
methods of Sect. 3.3, leads to the equivalent circuit of Fig.4.36.
To complete the equivalent circuit model of the buck converter, an equation for the average
input current Ig must be derived, as discussed in Sect.3.4. It can be seen from Fig. 4.33 that the
input current ig(t) coincides with the transistor current it(t). The transistor current waveform is
sketched in Fig. 4.34; its average is
Ig=⟨it(t)⟩= 1
Ts
∫ Ts
0
it(t) dt (4.16)
= 1
Ts
(DTsIL+ tr IL+ Qr) (4.17)
= DIL+ tr
Ts
IL+ Qr
Ts
(4.18)
Fig. 4.36 Buck converter example:
equivalent circuit corresponding to
Eqs. (4.14)a n d(4.15)
iC
= 0
R
+
V+DVg
+ vL
= 0
IL
V/ R
Fig. 4.37 Buck converter example:
equivalent circuit corresponding to
Eq. (4.18)
+ DIL
Ig
Vg Qr /Ts tr IL /Ts
Equation (4.18) can be viewed as a node equation describing the dc current drawn out of the
source Vg. The corresponding equivalent circuit is constructed in Fig.4.37.
A complete model of the buck converter with switching loss can now be obtained by com-
bining Figs. 4.36 and 4.37 to obtain Fig. 4.38. The dependent sources are combined into a 1 : D
dc transformer. In addition, the model includes two current sources that model the dc compo-
nents of input current that are induced by the diode recovered charge Qr and reverse recovery
time tr.

4.3 The Power Diode 93
R
+
V
IL
+
Ig 1 : D
Vg Qr /Ts tr IL /Ts
Fig. 4.38 Complete model of the buck converter with diode-induced switching loss
In the model of Fig. 4.38, the current sources consume power equal to
Psw= Vg
⎦Qr
Ts
+ IL
tr
Ts
)
(4.19)
This is the switching loss induced by the diode reverse-recovery process. For the case S = 0,
this power is dissipated in the transistor. For S > 0, this switching loss is dissipated partly in
the diode and partly in the transistor.
We can now solve the model of Fig.4.38, to derive expressions for the conversion ratio and
eﬃciency. The conversion ratio M is equal to the turns ratio of the dc transformer:
M= V
Vg
= D (4.20)
The output power is
Pout= VIL (4.21)
The input power is
Pin= Vg
⎦
DIL+ Qr
Ts
+ IL
tr
Ts
)
(4.22)
The following equation for eﬃciency can be derived by taking the ratio of Eqs. (4.21) and (4.22),
and simplifying:
η= Pout
Pin
= 1
1+ fs
⎦tr
D+ QrR
D2Vg
) (4.23)
It can be seen that the eﬃciency is dependent on the switching frequency.
Equation (4.23) is plotted in Fig. 4.39, for the values Vg = 24 V, fs = 100 kHz, R= 15Ω,
Qr = 0.75μcoul, tr = 75 nsec. It can be seen that the switching loss causes the e ﬃciency to
tend to zero at low duty cycle. This occurs because the output power goes to zero but switching
loss remains. This model assumes that the switching ripple is negligible, and no attempt has
been made to model how Qr and tr vary with current; in practice these quantities do vary with
current, but somewhat weakly. It is found experimentally that switching loss does indeed cause
the eﬃciency of constant-frequency converters to degrade substantially as the output power is
reduced.

94 4 Switch Realization
0 0.2 0.4 0.6 0.8 1
0
0.2
0.4
0.6
0.8
1
D
η
Fig. 4.39 Buck converter eﬃciency predicted by Eq. (4.23)
4.3.4 Boost Converter Example
As another example of modeling switching loss, the boost converter of Fig. 4.40 is considered.
Again, the switching loss induced by the diode reverse recovery is considered, including the
eﬀects of reverse recovery time tr and recovered charge Qr. Additionally, the loss induced by
the inductor dc winding resistance RL is modeled, but all other sources of loss are neglected.
Also, the inductor current and capacitor voltage ripples are taken to be small.
The transistor and diode waveforms are sketched in Fig. 4.41; these are similar to the buck
waveforms of Fig.4.34 with the exception of the voltage amplitudes. Again, the converter power
stage duty cycle D is deﬁned with respect to the transistor voltage waveform vt(t); this duty
cycle diﬀers from the duty cycle Dc of the controller gate drive signal c(t) because of the diode
reverse recovery time tr. We will see that this deﬁnition leads to an equivalent circuit having a
dc transformer with turns ratio D′ :1 .
To apply the principle of inductor volt-second balance, we ﬁrst construct the waveform of
vL(t). In the boost converter, the inductor voltage vL(t) is related to the transistor voltage vt(t)
and inductor current iL(t) according to
vL(t)= Vg−iL(t)RL−vt(t) (4.24)
Fig. 4.40 Boost converter ex-
ample: modeling switching loss +
L IL
it
vt
vd
+
Vg
ig
C
iC
R
+
V
+
idvL
+
c(t)

4.3 The Power Diode 95
Fig. 4.41 Assumed
waveforms for the
boost converter with
diode reverse recov-
ery, Fig.4.40
Transistor
current
Diode
voltage
Area
tr
t
ILit (t)
Qr
0
vt(t)
t
V
0
vd (t)
DTs Ts
IL
V
Transistor
voltage
t
V
0
Diode
current
Area t
IL
0
id (t)
Qr
DTs D Ts
0
Control
signal
t
DcTs
DTs
on
off
c(t) DcTs
Fig. 4.42 Boost converter example:
inductor voltage waveform
vL(t) Vg L RL
tDTs Vg L RL
By subtraction of the transistor voltage waveform of Fig. 4.41 from Vg, and with use of the
small-ripple approximation, the inductor voltage waveform of Fig. 4.42 is obtained. The dc
component of this waveform is
⟨ vL⟩= 0= D
⎦
Vg−ILRL
)
−D′ ⎦
Vg−ILRL−V
)
(4.25)
= Vg−ILRL−D′V

96 4 Switch Realization
In the boost converter, the capacitor current iC is related to the diode current id and load
current v/R according to the output node equation
iC = id−v
R (4.26)
By capacitor charge balance, the average value of the capacitor current is zero. We can therefore
use Eq. (4.26) to write
⟨ iC⟩= 0=⟨ id⟩−V
R (4.27)
The dc component of the diode current is found by integration of the waveform of Fig.4.43:
⟨ id⟩= 1
Ts
∫ Ts
0
id(τ) dτ (4.28)
= 1
Ts
⎦IL
⎦D′Ts−tr
)−Qr
)
= D′IL−tr IL
Ts
−Qr
Ts
Fig. 4.43 Boost converter example:
diode current waveform
tr
Diode
current
Area t
IL
0
id (t)
Qr
DTs D Ts
By convention in these equations, the recovered charge Qr is taken to be a positive quantity.
Hence, the output node equation (4.27) becomes
0= D′IL−tr IL
Ts
−Qr
Ts
−V
R (4.29)
Finally, we note that the input current ig(t) coincides with the inductor current iL(t), and
hence the dc component of input current is
Ig= IL (4.30)
Hence, the equations that describe the dc model of this converter are
0= Vg−ILRL−D′V (4.31)
0= D′IL−tr IL
Ts
−Qr
Ts
−V
R
Ig= IL

4.3 The Power Diode 97
These equations follow from Eqs. (4.25), (4.29), and (4.30). An equivalent circuit corresponding
to Eqs. (4.31) is given in Fig. 4.44. This dc circuit model accounts for diode-induced switching
loss and for inductor dc winding resistance in the boost converter; other conduction losses could
have been included as well, following the approach of Chap. 3.
R
+
V+
Ig = IL
D :1
Vg Qr /Ts tr IL /Ts
RL
Fig. 4.44 Complete model of the boost converter with diode-induced switching loss
The two independent sources of Fig. 4.44 consume power
Psw= V
⎦tr IL
Ts
+ Qr
Ts
)
(4.32)
This power is equal to the switching loss within the MOSFET and diode induced by diode
reverse recovery. In the model, these sources appear in parallel with the load and e ﬀectively
behave as an additional load on the converter. Indeed, in the actual converter, the diode reverse
recovery current ﬂows out of the output ﬁlter capacitor C and through the semiconductor de-
vices.
The model of Fig.4.44 can now be solved, to ﬁnd the conversion ratioM= V/V
g. The result
can be shown to be
M= V
Vg
=
⎦1
D′
)
⎦
1−Qr
Ts
RL
D′Vg (1−tr/D′Ts)
)
⎦
1+ RL
D′2R (1−tr/D′Ts)
) (4.33)
This equation is plotted vs. duty cycle in Fig. 4.45, for the values fs = 100 kHz, Vg = 24 V,
R= 15Ω, RL = 0.15Ω, Qr = 1μCoul, and tr = 50 nsec. The conversion ratio with switching
loss (thick, lower line) is compared to the result with inductor winding resistance only (thin,
upper line). It can be seen that the two curves are qualitatively similar, and the eﬀect of switching
loss is more pronounced at high duty cycles.
We can also evaluate the equivalent circuit model of Fig.4.44 to ﬁnd the converter eﬃciency.
The input power is given by
P
in= VgIg (4.34)
The output power is equal to
Pout= V
⎦
D′Ig−Qr
Ts
−tr IL
Ts
)
(4.35)

98 4 Switch Realization
0 0.2 0.4 0.6 0.8 1
0
1
2
3
4
5
D
M
Fig. 4.45 Conversion ratio V/Vg, boost converter with switching loss and inductor dc winding resistance.
The lower (thick) line includes switching loss terms and dc winding resistance. The upper (thin) line
includes dc winding resistance only, with no switching loss
By taking the ratio of these two expressions and simplifying, we can show that the eﬃciency is
given by
η= V
Vg
⎦
D′−Qr
TsI L
−tr
Ts
)
(4.36)
Additionally, the equivalent circuit model of Fig.4.44 can be solved for the inductor current IL,
yielding
IL=
⎦Vg
D′2R+ Qr
TsD′
)
⎦
1−tr
D′Ts
+ RL
D′2R
) (4.37)
Equations (4.36) and ( 4.37) can be used to plot the converter e ﬃciency. The result is shown
in Fig. 4.46, for the same parameter values of Fig. 4.45. Again, the result with switching loss
(lower thick line) and without switching loss but with inductor winding resistance only (upper,
thin line) are compared. It can be seen that these values of diode reverse recovery time and
diode recovered charge lead to substantial reductions in e ﬃciency, even at low duty cycles
where the diode reverse recovery causes negligible change in the conversion ratio V/Vg.T h e
term multiplying 1/D′ on the right-hand side of Eq. ( 4.33) is not equal to the eﬃciency, and
instead simply accounts for how the loss elements aﬀect the conversion ratio.
The plot of Fig. 4.46 predicts that the eﬃciency tends to a value slightly less than 93% as
the duty cycle tends to zero. It should be noted that the boost converter can be operated in
passthrough mode at D= 0, where the MOSFET is always oﬀand never switches. In this case,
there is no switching loss and the eﬃciency will jump to the upper curve that includes inductor
dc copper loss only.

4.4 Metal-Oxide-Semiconductor Field-Eﬀect Transistor (MOSFET) 99
0 0.2 0.4 0.6 0.8 1
0.75
0.8
0.85
0.9
0.95
1
D
η
Fig. 4.46 Eﬃciency of the boost converter with diode-induced switching loss. The lower (thick) line in-
cludes switching loss terms and dc winding resistance. The upper (thin) line includes dc winding resistance
only, with no switching loss
4.4 Metal-Oxide-Semiconductor Field-Eﬀect Transistor (MOSFET)
4.4.1 Introduction to the Power MOSFET
The power MOSFET is a modern power semiconductor device having gate lengths close to one
micron. The power device is comprised of many small parallel-connected enhancement-mode
MOSFET cells, which cover the surface of the silicon die. A cross-section of one cell is il-
lustrated in Fig. 4.47. Current ﬂows vertically through the silicon wafer: the metallized drain
connection is made on the bottom of the chip, while the metallized source connection and
polysilicon gate are on the top surface. Under normal operating conditions, in which vds ≥0,
both the p–n and p–n−junctions are reverse-biased. Figure 4.48a illustrates operation of the
Fig. 4.47 Cross-section
of DMOS n-channel
power MOSFET structure.
Crosshatched regions
are metallized contacts.
Shaded regions are in-
sulating silicon dioxide
layers
Drain
n
n
nn
pp
Source
Gate
nn

100 4 Switch Realization
(a)
n
n
nn
pp
nn
Depletion region
Source
Drain
(b)
n
n
nn pp nn
Channel
Source
Drain
(c)
n
n
nnp p nn
Body diode
Source
Drain
Fig. 4.48 Operation of the power MOSFET: (a)i nt h eoﬀstate, vds across the depletion region in the n−
region; (b) current ﬂow through the conducting channel in the on state; ( c) body diode due to the p−n−
junction

4.4 Metal-Oxide-Semiconductor Field-Eﬀect Transistor (MOSFET) 101
device in the oﬀstate. The applied drain-to-source voltage then appears across the depletion
region of the p–n−junction. The n−region is lightly doped, such that the desired breakdown
voltage rating is attained. Figure 4.48b illustrates operation in the on state, with a su ﬃciently
large positive gate-to-source voltage. A channel then forms at the surface of thep region, under-
neath the gate. This channel is called an inversion region, it contains mobile electrons that are
able to conduct current between the drain and source. The drain current ﬂows through the n−
drift region, channel, n region, and out through the source contact. The on-resistance of the de-
vice is the sum of the resistances of then−region, the channel, the source and drain contacts, etc.
As the breakdown voltage is increased, the on-resistance becomes dominated by the resistance
of the n−drift region. Since there are no minority carriers to cause conductivity modulation, the
on-resistance increases rapidly as the breakdown voltage is increased to several hundred volts
and beyond.
The p–n−junction is called the body diode; as illustrated in Fig. 4.48c, this junction forms
an eﬀective diode in parallel with the MOSFET channel. The body diode can become forward-
biased when the drain-to-source voltage vds (t) is negative. This diode is capable of conducting
the full rated current of the MOSFET. However, many MOSFETs are not optimized with re-
spect to the speed of their body diodes, and the large peak currents that ﬂow during the reverse
recovery transition of the body diode can cause device failure as described below. Most recent
MOSFETs contain fast recovery body diodes; these devices are rated to withstand the peak
currents during the body diode reverse recovery transition.
The MOSFET structure of Fig. 4.48 also includes a parasitic BJT structure, formed by the
source n region (emitter), substrate p region (base), and drift n
−region (collector). Since the
n and p regions are shorted by the source contact, this parasitic BJT is normally oﬀ. However,
if a suﬃciently large current ﬂows through the bulk resistance of the p region, it is possible to
forward-bias the p−n base-emitter junction. This situation may be observed during the reverse
recovery transition of the body diode, and it can lead to latchup and failure of the MOSFET.
Recent MOSFET designs are less prone to this failure mechanism.
Typical n-channel MOSFET static switch characteristics are illustrated in Fig. 4.49.T h e
drain current is plotted as a function of the gate-to-source voltage, for various values of drain-
to-source voltage. When the gate-to-source voltage is less than the threshold voltage Vth,t h e
device operates in the oﬀstate. A typical value of Vth is 3 V . When the gate-to-source voltage is
greater than 6 or 7 V , the device operates in the on state; typically, the gate is driven to 12 or 15 V
to ensure minimization of the forward voltage drop. In the on state, the drain-to-source voltage
VDS is roughly proportional to the drain current ID. The MOSFET is able to conduct peak
currents well in excess of its average current rating, and the nature of the static characteristics
is unchanged at high current levels. Logic-level power MOSFETs are also available, which
operate in the on state with a gate-to-source voltage of 5 V . Some p-channel devices can be
obtained, but their properties are inferior to those of equivalent n-channel devices.
The on-resistance and forward voltage drop of the MOSFET have a positive temperature
coeﬃcient. This property makes it relatively easy to parallel devices. High-current MOSFET
modules are available, containing several parallel-connect chips.
The major capacitances of the MOSFET are illustrated in Fig. 4.50. This model is su ﬃ-
cient for qualitative understanding of the MOSFET switching behavior; more accurate models
account for the parasitic junction ﬁeld-eﬀect transistor inherent in the DMOS geometry. Switch-
ing times of the MOSFET are determined essentially by the times required for the gate driver
to charge these capacitances. Since the drain current is a function of the gate-to-source voltage,

102 4 Switch Realization
0 A
5 A
10 A
VGS
ID
VDS = 0.5 V
VDS
= 1 V
VDS
= 2 VVDS
= 10 V
VDS
= 200 V
0 V 5 V 10 V 15 V
off
state
on state
Fig. 4.49 Typical static characteristics of a power MOSFET. Drain currentID is plotted vs. gate-to-source
voltage VGS , for various values of drain-to-source voltage VDS
Fig. 4.50 MOSFET equivalent circuit which ac-
counts for the body diode and eﬀective terminal ca-
pacitances
D
S
G
Cds
Cgs
Cgd
the rate at which the drain current changes is dependent on the rate at which the gate-to-source
capacitance is charged by the gate drive circuit. Likewise, the rate at which the drain voltage
changes is a function of the rate at which the gate-to-drain capacitance is charged. The drain-to-
source capacitance leads directly to switching loss in PWM converters, since the energy stored
in this capacitance is lost during the transistor turn-on transition. Switching loss is discussed in
Sect. 4.6.
The gate-to-source capacitance is essentially linear. However, the drain-to-source and gate-
to-drain capacitances are strongly nonlinear: these incremental capacitances vary as the inverse
square root of the applied capacitor voltage. For example, the dependence of the incremental
drain-to-source capacitance can be written in the form
C
ds(vds)= C0
√
1+ vds
V0
(4.38)

4.4 Metal-Oxide-Semiconductor Field-Eﬀect Transistor (MOSFET) 103
where C0 and V0 are constants that depend on the construction of the device. These capacitances
can easily vary by several orders of magnitude asvds varies over its normal operating range. For
vds ≫ V0,E q .(4.38) can be approximated as
Cds(vds)≈C0
√
V0
vds
= c′
0√vds
(4.39)
These expressions are used in Sect. 4.6.1 to determine the switching loss due to energy stored
in Cds .
Table 4.2 Characteristics of several commercial n-channel power MOSFETs
Part number Rated maximum voltage Rated average current Ron Qg (typical)
SiSS64DN 30 V 40 A 2 .1mΩ 21 nC
CSD18512Q5B 40 V 100 A 1 .3mΩ 75 nC
NTMFS6H800N 80 V 203 A 1 .8mΩ 85 nC
IXFH80N25X3 250 V 80 A 13 m Ω 83 nC
IPL60R065P7 650 V 41 A 53 m Ω 67 nC
Characteristics of several commercially available power MOSFETs are listed in Table 4.2.
The gate charge Qg is the charge that the gate drive circuit must supply to the MOSFET to
raise the gate voltage from zero to some speciﬁed value (typically 10 V), with a speciﬁed value
of oﬀ-state drain-to-source voltage (typically 80% of the rated V
DS). The total gate charge is
the sum of the charges on the gate-to-drain and the gate-to-source capacitance. The total gate
charge is to some extent a measure of the size and switching speed of the MOSFET. A ﬁgure of
merit is the product of on-resistance R
on and gate charge Qg; a device exhibiting lower RonQg
is expected to operate with higher eﬃciency. The on-resistances listed in Table 4.2 are typical
values speciﬁed at 25◦C; the on-resistance increases signiﬁcantly at elevated temperature.
Unlike other power devices, MOSFETs are usually not selected on the basis of their rated av-
erage current. Rather, on-resistance and its inﬂuence on conduction loss are the limiting factors,
and MOSFETs typically operate at average currents somewhat less than the rated value.
Majority-carrier silicon MOSFETs are usually the device of choice at voltages up to ap-
proximately 600 V . At these voltages, the forward voltage drop is competitive or superior to the
forward voltage drops of minority-carrier devices, and the switching speed is signiﬁcantly faster.
Typical switching times are below 100 ns. At voltages greater than 600 V , minority-carrier de-
vices having lower forward voltage drops, such as the IGBT, usually have been preferred. These
minority-carrier devices are discussed in Sect. 4.5.
The superjunction MOSFET [41] employs alternate heavily dopedn and p layers within the
drift region, to carefully control the electric ﬁeld under oﬀ-state conditions. This enables better
optimization of the tradeoﬀbetween on-resistance and blocking voltage, leading to signiﬁcantly
better on-resistance, capacitance, and die area in MOSFETs at voltages of 500–800 V . The
IPL60R06SP7 device listed in Table 4.2 is an example of a superjunction MOSFET.
4.4.2 Wide-Bandgap FETs
Power transistors based on wide-bandgap (WBG) materials have recently emerged as com-
mercially signiﬁcant switching devices. In comparison with conventional silicon-based power

104 4 Switch Realization
transistors, these wide-bandgap transistors can achieve higher breakdown voltage with lower
on-resistance and faster switching times. Power MOSFETs based on Silicon Carbide (SiC) ﬁnd
application at voltages above 600 V , and FET devices based on Gallium Nitride (GaN) currently
ﬁnd application at voltages of 600 V and below.
For a majority-carrier device having no conductivity modulation, the resistance Ron of the
drift region can be expressed as
ARon= k
μnϵsE3c
V2
B (4.40)
where Ron is the resistance of the drift region, A is the device area, k is a constant dependent on
the process and other factors,μn is the electron mobility,ϵs is the semiconductor permittivity,Ec
is the critical ﬁeld for avalanche breakdown, andVB is the device breakdown voltage. The right-
hand side of Eq. (4.40) is known as the speciﬁc on-resistance of a power transistor technology,
having units of transistor on-resistance per unit area. Wide-bandgap devices take advantage of
this basic relationship to make signiﬁcant advances in performance. These parameters are listed
in Table4.3 for selected semiconductor materials. The electron mobility listed for GaN material
is for a high electron mobility transistor (HEMT), for the two-dimensional electron gas induced
at the junction between AlGaN and GaN materials. Diﬀerent crystalline structures are possible
in these materials, which can lead to a range of values.
Table 4.3 Comparison of Power Semiconductor Materials [42]
Material Bandgap Electron mobility Permittivity Critical ﬁeld Thermal conductivity
[eV] μn [cm2/Vs] ϵs Ec [V/cm] [W /m◦K]
Si 1.1 1350 11.8 3 · 105 150
SiC (4H) 3.26 720 10 2 · 106 450
GaN 3.44 1500–2000 (2DEG) 9 3 .3· 106 130
The wide-bandgap energies of SiC and GaN materials lead to signiﬁcant increases in the crit-
ical ﬁeld Ec, approximately an order-of-magnitude improvement. Equation (4.40) predicts that
an order-of-magnitude improvement in Ec leads to a three orders-of-magnitude improvement in
on-resistance Ron. Hence, wide-bandgap materials can potentially achieve a major improvement
in the relationship between on-resistance and breakdown voltage.
Additionally, a wide bandgap directly inﬂuences the impact on switching time because im-
provement in speciﬁc on-resistance allows a reduction in device area while maintaining the
same on-resistance. Reduction in device area reduces its capacitance, and hence also switch-
ing loss. Further, wide-bandgap materials enable the use of majority-carrier devices in much
higher voltage applications, with no current tail, no reverse recovery, and other advantages of
majority-carrier device technology. Hence a technological improvement in Eq. (4.40) represents
an improvement in a combination of on-resistance, switching time, and voltage breakdown.
Native oxide layers can be grown on SiC, and manufacturers have developed vertical power
MOSFETs in SiC having structures similar to Fig. 4.47. The properties of several commercial
SiC power MOSFETs are listed in Table 4.4. Relative to Si MOSFET technology, these SiC
MOSFETs achieve signiﬁcantly higher breakdown voltages, lower on-resistances, and lower
gate charge. Silicon Carbide MOSFETs rated at 10 kV [43] and higher are feasible.

4.4 Metal-Oxide-Semiconductor Field-Eﬀect Transistor (MOSFET) 105
Table 4.4 Characteristics of several commercial SiC MOSFETs
Part number Rated maximum voltage Rated average current Ron Qg (typical)
C3M0030090K 900 V 63 A 30 m Ω 87 nC
C3M0075120K 1200 V 30 A 75 m Ω 51 nC
C2M0045170D 1700 V 72 A 45 m Ω 188 nC
SCT3022AL 650 V 93 A 22 m Ω 133 nC
CPM3-0900-0010A 900 V 196 A 10 m Ω 68 nC
Table 4.3 notes that SiC exhibits signiﬁcantly lower electron mobility than Si. Since on-
resistance depends on mobility, low-voltage SiC MOSFETs exhibit inferior on-resistance in
low-voltage devices. The advantage of wide bandgap in SiC causes SiC devices to be superior
to Si devices only at rated voltages above 600 V . At lower rated voltages, SiC MOSFETs exhibits
lower speciﬁc resistance than Si MOSFETs.
Silicon carbide exhibits high thermal conductivity and low thermal coeﬃcient of expansion.
Bulk devices are able to operate at very high temperatures, possibly up to 300
◦C. However, the
packaging of these devices generally is limited to lower temperatures. Additionally, the reliabil-
ity of oxide layers is compromised above 175
◦C, which limits the maximum temperatures of
SiC MOSFETs.
The SiC MOSFET includes a body diode, as in Fig.4.48c. The forward voltage drop of this
SiC p–n diode is 3–4 volts, and its reverse recovery time typically is several tens of nanoseconds.
If reverse current conduction is required, the MOSFET can be turned on and operated as a
synchronous rectiﬁer, to reduce conduction loss.
As noted earlier, the SiC Schottky diode ﬁnds application as a replacement for high voltage
Si p–n diodes, at 600 V and above. The SiC MOSFET may ﬁnd application as a replacement
for the Si IGBT at 600 V and above, enabling higher switching frequencies and smaller reactive
element size.
Gallium Nitride (GaN) is a second wide-bandgap material ﬁnding signiﬁcant application
in power electronics. The bandgap energy and critical ﬁeld of GaN is even higher than SiC,
and Eq. ( 4.40) again predicts that GaN can potentially achieve a major improvement in the
relationship between on-resistance and breakdown voltage. Thin-ﬁlm lateral GaN devices are
deposited on a Si or SiC substrate. Since no native oxide is available in GaN, these transistors are
heterostructure ﬁeld-eﬀect devices. Early devices were depletion-mode ﬁeld-eﬀect transistors,
but enhancement-mode FETs now are oﬀered commercially [38].
The structure of a simple enhancement-mode GAN FET is diagrammed in Fig.4.51. The de-
vice may be fabricated on a silicon substrate, or possible another substrate material such as SiC
Fig. 4.51 Basic structure of
enhancement-mode GaN FET
Source Gate
Drain
AlGaN
p-type
GaN
intrinsic
Substrate (Si)
GaN
Transition layers

106 4 Switch Realization
or sapphire. Since the coeﬃcients of thermal expansion of the substrate and the GaN materials
diﬀer, transition layers are needed for improvement of reliability under thermal cycling. Intrin-
sic GaN is deposited next. A layer of AlGaN is then deposited. The crystalline structures and
bandgaps of AlGaN and GaN diﬀer, and hence the AlGaN–GaN interface is known as ahetero-
junction. In the GAN FET, a two-dimensional electron gas (2DEG) forms at the heterojunction
as illustrated in Fig.4.52; the 2DEG contains high-mobility electrons within the GaN material at
the heterojunction. This type of device is also called ahigh electron mobility transistor(HEMT).
Fig. 4.52 Formation of a
two-dimensional electron gas
(2DEG) at the heterojunction,
comprised of high-mobility
electrons
Source
Gate
Drain
AlGaN
p-type
GaN
intrinsic
Substrate (Si)
GaN
Transition layers
2DEG
The electrons within the 2DEG form a channel that can conduct current between the source
and drain; because of their high mobility, the device exhibits low on-resistance. The gate forms
a GaN diode between the gate terminal and the channel. The 2DEG can be controlled by the
gate voltage: at zero gate voltage, the gate diode is reverse-biased, and its depletion region
extends into the GaN region su ﬃcient to deplete the 2DEG. With positive gate voltage, the
2DEG forms a complete conducting channel between drain and source. It is important to limit
the on-state gate current to a value that does not exceed what the gate diode can handle. Thei–v
characteristics of the gate GaN diode vary with temperature and drain current; depending on the
manufacturer, a typical on-state gate-to-source voltage may be 3–5 V .
The high electron mobility of these devices yields competitive on-resistance at voltages be-
low 600 V . GaN FETs are available at rated voltages of tens of volts up to 650 V , and devices
at much higher voltages are described in the literature. In comparison with Si MOSFETs, the
GaN FET can achieve similar on-resistance with smaller area, smaller capacitances, and faster
switching times. Table 4.5 contains a comparison of a 650 V GaN FET with a 650 V Si super-
junction MOSFET, having similar on-resistance. The gate charge of the GaN FET is roughly an
order-of-magnitude smaller than the Si MOSFET. For reverse conduction with zero gate bias,
the Si MOSFET body diode exhibits a voltage drop of approximately 0.8 V , while the GaN FET
exhibits a drop of approximately 4 V . The Si MOSFET body diode exhibits signiﬁcant reverse
recovery, while the GaN FET does not.
The GaN FET structure of Fig. 4.51 does not contain a body diode. Nonetheless, the device
is able to conduct both positive and negative current between drain and source when the device
is on. Further, when v
gs = 0, the GaN FET will conduct when vds is suﬃciently negative such
that vgd is positive enough to turn on the device, as illustrated in Fig.4.53. Hence, the GaN FET
cannot block negative voltage, but it is a current-bidirectional two-quadrant switch.
```
