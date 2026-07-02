---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第18章part 1 - 18 Current-Programmed Control
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 727-746 > Chunk ID: `chapter-18-part-1`"
---

# 第18章part 1 - 18 Current-Programmed Control

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 727-746  
> Chunk ID: `chapter-18-part-1`

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
18
Current-Programmed Control
So far, we have discussed duty ratio control of PWM converters, in which the converter output
is controlled by direct choice of the duty ratio d(t). We have therefore developed expressions
and small-signal transfer functions that relate the converter waveforms and output voltage to the
duty ratio. This direct duty ratio control is sometimes called voltage mode control, because the
equilibrium output voltage is approximately proportional to the duty cycle in CCM.
Another control scheme which ﬁnds wide application is current programmed control [67, 69,
107, 163–175], in which the converter is controlled by choice of the transistor switch current
peak(is(t)). The control input signal is a current ic(t), and a simple control network switches the
transistor on and oﬀsuch that the peak transistor current follows ic(t). The transistor duty cycle
d(t) is not directly controlled, but depends on ic(t) as well as on the converter inductor currents,
capacitor voltages, and power input voltage. Converters controlled via current programming
are said to operate in the current-programmed mode (CPM), also known as peak current mode
(PCM) control.
The block diagram of a simple current-programmed controller is illustrated in Fig. 18.1.
Control signal ic(t) and switch current is(t) waveforms are given in Fig. 18.2. A clock pulse at
the Set input of a latch initiates the switching period, causing the latch output Q to be high
and turning on the transistor switch. While the transistor conducts, its current is(t) is equal to
the inductor current iL(t); this current increases with some positive slope m1 that depends on
the value of inductance and the converter voltages. In more complicated converters, is(t)m a y
follow the sum of several inductor currents. Eventually, the switch current is(t) becomes equal
to the control signal ic(t). At this point, the controller turns the transistor switch oﬀ, and the in-
ductor current decreases for the remainder of the switching period. The controller measures the
switch current is(t) with some current sensor circuit, and compares is(t)t o ic(t) using an analog
comparator. In practice, voltages proportional to is(t) and ic(t) are compared, with constant of
proportionality Rf . When is(t)≥ic(t), the comparator resets the latch, turning the transistor oﬀ
for the remainder of the switching period.
As usual, a feedback loop can be constructed for regulation of the output voltage. The output
voltage v(t) is compared to a reference voltagevre f , to generate an error signal. This error signal
is applied to the input of a compensation network, and the output of the compensator drives the
control signal ic(t)Rf . To design such a feedback system, we need to model how variations in
the control signal ic(t) and in the line input voltage vg(t)aﬀect the output voltage v(t).
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_18
725

726 18 Current-Programmed Control
+
Buck converter
Current-programmed controller
Rvg(t)
is(t)
+
v(t)
iL(t)
Q1
L
CD1
+
Analog
comparator
Latch
Ts0
S
R
Q
Clock
is(t)
Rf
Measure
switch
current
is(t)Rf
Control
input
ic(t)Rf
+
vref
v(t)Compensator
Conventional output voltage controller
Fig. 18.1 Current-programmed control of a buck converter. The peak transistor current replaces the duty
cycle as the control input
An advantage of the current-programmed mode is its simpler dynamics. To ﬁrst order, the
small-signal control-to-output transfer function ˆv(s)/ˆic(s) contains one less pole than ˆv(s)/ ˆd(s).
Actually, the pole is moved to a high frequency, near the converter switching frequency.
Nonetheless, simple robust wide-bandwidth output voltage control can usually be obtained,
without the use of compensator lead networks. It is true that the current-programmed controller
requires a circuit for measurement of the switch currentis(t); however, in practice such a circuit
is also required in duty ratio controlled systems, for protection of the transistor against excessive
currents during transients and fault conditions. Current-programmed control makes use of the
available current sensor information during normal operation of the converter, to obtain simpler
system dynamics. Transistor failures due to excessive switch current can then be prevented sim-
ply by limiting the maximum value of the control signal i
c(t). This ensures that the transistor
will turn oﬀwhenever the switch current becomes too large, on a cycle-by-cycle basis.
An added beneﬁt of current programming is the reduction or elimination of transformer
saturation problems in full-bridge or push-pull isolated converters. In these converters, small

18 Current-Programmed Control 727
Fig. 18.2 Switch current
is(t) and control input
ic(t) waveforms, for the
current-programmed sys-
tem of Fig. 18.1
Switch
current
i
s(t)
Control signal
ic(t)
m1
t0 dTs Ts
on off
Transistor
status:
Clock turns
transistor on
Comparator turns
transistor off
voltage imbalances induce a dc bias in the transformer magnetizing current; if suﬃciently large,
this dc bias can saturate the transformer. The dc current bias increases or decreases the tran-
sistor switch currents. In response, the current programmed controller alters the transistor duty
cycles, such that transformer volt-second balance tends to be maintained. Current-programmed
full-bridge isolated buck converters should be operated without a capacitor in series with the
transformer primary winding; this capacitor tends to destabilize the system. For the same rea-
son, current-programmed control of half-bridge isolated buck converters is generally avoided.
Commercial integrated circuits that implement current-programmed control are widely avail-
able, and operation of converters in the current-programmed mode is quite popular.
A disadvantage of current-programmed control is its susceptibility to noise in the i
s(t)o r
ic(t) signals. This noise can prematurely reset the latch, disrupting operation of the controller. To
remove the turn-on current spike caused by the diode stored charge, a small amount of ﬁltering
of the sensed switch current waveform is usually applied. Furthermore, CPM controllers often
include a short blanking interval at the beginning of a switching cycle. During the blanking
interval, resetting of the latch is disabled, which prevents spurious transistor turn oﬀ. It should
be noted, however, that the blanking interval imposes a lower limit on the attainable duty cycle.
This chapter is devoted to analysis, modeling and design of converters operating in current-
programmed mode. In Sect. 18.1, the system small-signal transfer functions are derived using
a simple ﬁrst-order model. The averaged terminal waveforms of the switch network can be
described by a simple current source, in conjunction with a power source element. Perturbation
and linearization steps lead to a simple small-signal model.
In Sect. 18.2, stability of the current-programmed controller and its inner switch-current-
sensing loop is examined. It is found that this controller is unstable whenever converter steady-
state duty cycle D is greater than 0.5. The current programmed controller can be stabilized
by addition of an artiﬁcial ramp signal to the sensed switch current waveform. Furthermore,
addition of the artiﬁcial ramp, also known as slope compensation, improves noise immunity of
the controller.
Although the ﬁrst-order model of Sect. 18.1 yields a great deal of insight into the control-to-
output transfer function and converter output impedance, it does not accurately predict the line-
to-output transfer function G
vg(s) of current-programmed buck converters. Furthermore, the
simple model does not take into account the eﬀects of the inductor current ripple or the artiﬁcial
ramp. Hence, a more accurate averaged model is developed in Sect. 18.3, and CPM transfer
functions are derived in Sect. 18.4. Based on the more accurate averaged model, simulation
of current-programmed converters is addressed in Sect. 18.5. Design of the voltage feedback

728 18 Current-Programmed Control
loop is discussed in Sect. 18.6. High-frequency responses of current-programmed converters in
continuous conduction mode are further examined in Sect. 18.7 using sampled-data modeling
techniques. Finally, Sect. 18.8 extends the modeling of current-programmed converters to the
discontinuous conduction mode.
Another approach to current programming, known asaverage current mode(ACM) control,
consists of constructing a feedback loop for regulation of an average converter current. This
approach is discussed in Sect. 18.9. An advantage of average current-mode control is that it
enables direct control over the converter input or output current, which is required in some
applications, including battery chargers, drivers for light emitting diodes, as well as ac grid-tied
rectiﬁers and inverters. Furthermore, ACM controllers have improved noise immunity, and do
not necessarily require slope compensation for stable operation over wide range of duty cycles.
18.1 A Simple First-Order Model
Once the current-programmed controller has been constructed, it is desired to design a feed-
back loop for regulation of the output voltage. As usual, this voltage feedback loop must be
designed to meet speciﬁcations regarding line disturbance rejection, transient response, output
impedance, etc. A block diagram of a typical system is illustrated in Fig. 18.3, containing an
inner current-programmed controller, with an outer voltage feedback loop.
To design the outer voltage feedback loop, an ac equivalent circuit model of the switching
converter operating in the current-programmed mode is needed. In Chap. 7, averaging was
employed to develop small-signal ac equivalent circuit models for converters operating with
duty ratio control. These models predict the circuit behavior in terms of variations ˆd in the duty
cycle. If we could ﬁnd the relationship between the control signali
c(t) and the duty cycled(t)f o r
the current-programmed controller, then we could adapt the models of Chap. 7, to apply to the
Compensator
+
+
R
+
v(t)vg(t)
Current
programmed
controller
d(t) Converter
voltages and
currents
Switching converter
vref
ic(t) v(t)
Fig. 18.3 Block diagram of a converter system incorporating current-programmed control

18.1 A Simple First-Order Model 729
current-programmed mode as well. In general, the duty cycle depends not only onic(t), but also
on the converter voltages and currents; hence, the current-programmed controller incorporates
multiple eﬀective feedback loops as indicated in Fig. 18.3.
In this section, the averaging approach is extended, as described above, to treat current-
programmed converters. A simple ﬁrst-order approximation is employed, in which it is assumed
that the current programmed controller operates ideally, and hence causes the average inductor
current⟨iL(t)⟩TS to be identical to the control ic(t). This approximation is justiﬁed whenever
the inductor current ripple and artiﬁcial ramp (discussed in Sect. 18.2) have negligible magni-
tudes. The inductor current then is no longer an independent state of the system, and no longer
contributes a pole to the converter small-signal transfer functions.
This ﬁrst-order model is derived in Sect. 18.1.1, using a simple algebraic approach. In
Sect. 18.1.2, a simple physical interpretation is obtained via the averaged switch modeling tech-
nique. A more accurate, but more complicated, model is described in Sect. 18.3.
18.1.1 Simple Model via Algebraic Approach: Buck–Boost Example
The power stage of a simple buck–boost converter operating in the continuous conduction mode
is illustrated in Fig. 18.4a, and its inductor current waveform is given in Fig. 18.4b. The small-
signal averaged equations for this converter, under duty-cycle control, were derived in Sect.7.2.
The result, Eq. (7.44), is reproduced below:
(a)
+ LC R
+
v(t)vg(t)
Q1 D1
iL(t)
(b) iL(t)
ic
t0 dTs Ts
vg
L
v
L
Fig. 18.4 Buck–boost converter example: (a) power stage, (b) inductor current waveform

730 18 Current-Programmed Control
LdˆiL(t)
dt = Dˆvg(t)+ D′ ˆv(t)+ (Vg−V) ˆd(t)
C dˆv(t)
dt =−D′ˆiL−ˆv(t)
R + IL ˆd(t) (18.1)
ˆig(t)= DˆiL+ IL ˆd(t)
The Laplace transforms of these equations, with initial conditions set to zero, are
sLˆiL(s)= Dˆvg(s)+ D′ ˆv(s)+ (Vg−V) ˆd(s)
sCˆv(s)=−D′ˆiL(s)−ˆv(s)
R + IL ˆd(s) (18.2)
ˆig(s)= DˆiL(s)+ lL ˆd(s)
We now make the assumption that the inductor currentˆiL(s) is identical to the programmed con-
trol current ˆic(s). This is valid to the extent that the controller is stable, and that the magnitudes
of the inductor current ripple and artiﬁcial ramp waveform are suﬃciently small:
ˆiL(s)≈ˆic(s) (18.3)
This approximation, in conjunction with the inductor current equation of ( 18.2), can now be
used to ﬁnd the relationship between the control currentˆic(s) and the duty cycle ˆd(s), as follows:
sLˆic(s)≈Dˆvg(s)+ D′ ˆv(s)+ (Vg−V) ˆd(s) (18.4)
Solution for ˆd(s) yields
ˆd(s)= sLˆic(s)−Dˆvg(s)−D′ ˆv(s)
(Vg−V) (18.5)
This small-signal expression describes how the current-programmed controller varies the duty
cycle, in response to a given control input variation ˆic(s). It can be seen that ˆd(s) depends
not only on ˆic(s), but also on the converter output voltage and input voltage variations. Equa-
tion (18.5) can now be substituted into the second and third lines of Eq. ( 18.2), thereby elimi-
nating ˆd(s). One obtains
sCˆv(s)=−D′ˆic(s)−ˆv(s)
R + IL
sLˆic(s)−Dˆvg(s)−D′ ˆv(s)
(Vg−V)
ˆig(s)= Dˆic(s)+ IL
sLˆic(s)−Dˆvg(s)−D′ ˆv(s)
(Vg−V) (18.6)
These equations can be simpliﬁed by collecting terms, and by use of the steady-state relation-
ships
V=−D
D′ Vg
IL =−V
D′R= D
D′2RVg (18.7)

18.1 A Simple First-Order Model 731
(a)
D2
D'R vg
+ D'R
D2 D 1+ sL
D'R ic
D
R v
ig
vg
(b)
RD sLD
D'2R ic
D
R v
D2
D'R vg
R
D
sCv v
R
C
Node
Fig. 18.5 Construction of CPM CCM buck–boost converter equivalent circuit: ( a) input port model,
corresponding to Eq. (18.9); (b) output port model, corresponding to Eq. (18.8)
Equation (18.6) then becomes
sCˆv(s)=
⎦sLD
D′R−D′
)
ˆic(s)−
⎦D
R+ 1
R
)
ˆv(s)−
⎦D2
D′R
)
ˆvg(s) (18.8)
ˆig(s)=
⎦sLD
D′R+ D
)
ˆic(s)−
⎦D
R
)
ˆv(s)−
⎦D2
D′R
)
ˆvg(s) (18.9)
These are the basic ac small-signal equations for the simpliﬁed ﬁrst-order model of the current-
programmed buck–boost converter. These equations can now be used to construct small-signal
ac circuit models that represent the behavior of the converter input and output ports. In
Eq. (18.8), the quantity sCˆv(s) is the output capacitor current. The ˆic(s) term is represented
in Fig. 18.5b by an independent current source, while the ˆvg(s) term is represented by a depen-
dent current source. ˆv(s)/R is the current through the load resistor, and ˆv(s)D/R is the current
through an eﬀective ac resistor of value R/D.
Equation (18.9) describes the current ˆig(s) drawn by the converter input port, out of the
source ˆvg(s). The ˆic(s) term is again represented in Fig. 18.5a by an independent current source,
and the ˆv(s) term is represented by a dependent current source. The quantity −ˆvg(s)D2/D′R is
modeled by an eﬀective ac resistor having the negative value−D′R/D2.
Figures 18.5a,b can now be combined into the small-signal two-port model of Fig.18.6.T h e
current-programmed buck and boost converters can also be modeled by a two-port equivalent
circuit, of the same form. Table 18.1 lists the model parameters for the basic buck, boost, and
buck–boost converters.

732 18 Current-Programmed Control
+
ig
vg RCr1 f1(s) ic g1 v g2 vg f2(s) ic r2 v
+
Fig. 18.6 Two-port small-signal equivalent circuit used to model the current-programmed CCM buck,
boost, and buck–boost converters
Table 18.1 Current-programmed mode small-signal equivalent circuit parameters, simple model
Converter g1 f1 r1 g2 f2 r2
Buck D
R D
⎦
1+ sL
R
)
−R
D2 01 ∞
Boost 0 1 ∞ 1
D′R D′
⎦
1−sL
D′2R
)
R
Buck–boost −D
R D
⎦
1+ sL
D′R
)
−D′R
D2 −D2
D′R −D′
⎦
1−sDL
D′2R
) R
D
The two-port equivalent circuit can now be solved, to ﬁnd the converter transfer functions
and output impedance. The control-to-output transfer function is found by setting ˆ vg to zero.
Solution for the output voltage then leads to the transfer function Gvc(s):
Gvc(s)= ˆv(s)
ˆic(s)
⏐⏐⏐⏐
⏐
⏐
ˆvg=0
= f2
⎦
r2∥R∥ 1
sC
)
(18.10)
Substitution of the model parameters for the buck–boost converter yields
Gvc(s)=−R D′
1+ D
⎦
1−s DL
D′2
R
)
⎦
1+ s RC
1+ D
) (18.11)
It can be seen that this transfer function contains only one pole; the pole due to the inductor
has been lost. The dc gain is now directly dependent on the load resistance R. In addition, the
transfer function contains a right half-plane zero whose corner frequency is unchanged from the
duty-cycle-controlled case. In general, introduction of current programming alters the transfer
function poles and dc gain, but not the zeroes.
The line-to-output transfer function Gvg(s) is found by setting the control input ˆic to zero,
and then solving for the output voltage. The result is
Gvg(s)= ˆv(s)
ˆvg(s)
⏐⏐
⏐
⏐⏐⏐
ˆic=0
= g2
⎦
r2∥R∥ 1
sC
)
(18.12)
Substitution of the parameters for the buck–boost converter leads to

18.1 A Simple First-Order Model 733
Gvg(s)=−D2
1−D2
1⎦
1+ s RC
1+ D
) (18.13)
Again, the inductor pole is lost. The output impedance is
Zout(s)= r2∥R∥ 1
sC (18.14)
For the buck–boost converter, one obtains
Zout(s)= R
1+ D
1⎦
1+ s RC
1+ D
) (18.15)
18.1.2 Averaged Switch Modeling
Additional physical insight into the properties of current programmed converters can be ob-
tained by use of the averaged switch modeling approach developed in Sect. 14.1. Consider the
buck converter of Fig. 18.7. We can deﬁne the terminal voltages and currents of the switch
network as shown. When the buck converter operates in the continuous conduction mode, the
switch network average terminal waveforms are related as follows:
⟨v
2(t)⟩Ts = d(t)⟨v1(t)⟩TS
⟨i1(t)⟩Ts = d(t)⟨i2(t)⟩Ts (18.16)
We again invoke the approximation in which the inductor current exactly follows the control
current. In terms of the switch network terminal current i2, we can therefore write
⟨i2(t)⟩Ts ≈⟨ic(t)⟩Ts (18.17)
The duty cycle d(t) can now be eliminated from Eq. (18.16), as follows:
⟨i1(t)⟩Ts = d(t)⟨ic(t)⟩Ts =⟨v2(t)⟩Ts
⟨v1(t)⟩TS
⟨ic(t)⟩TS (18.18)
+
L
CR
+
v(t)vg(t)
iL(t)
+
v2(t)
i1(t) i2(t)
Switch network
+
v1(t)
Fig. 18.7 Averaged switch modeling of a current-programmed converter: CCM buck example

734 18 Current-Programmed Control
+
L
CR
+
v(t) Ts
vg(t) Ts
iL(t) Ts
+
v2(t) Ts
i1(t) Ts
i2(t) Ts
Averaged switch network
+
v1(t) Ts
ic(t) Ts
p(t) Ts
Fig. 18.8 Averaged switch model of CPM buck converter
This equation can be written in the alternative form
⟨i1(t)⟩Ts⟨v1(t)⟩Ts =⟨ic(t)⟩TS⟨v2(t)⟩Ts =⟨p(t)⟩Ts (18.19)
Equations (18.17) and ( 18.19) are the desired result, which describes the average terminal re-
lations of the CCM current-programmed buck switch network. Equation (18.17) states that the
average terminal current⟨i2(t)⟩TS is equal to the control current⟨ic(t)⟩Ts . Equation (18.19) states
that the input port of the switch network consumes average power ⟨p(t)⟩Ts equal to the aver-
age power ﬂowing out of the switch output port. The averaged equivalent circuit of Fig. 18.8 is
obtained.
Figure 18.8 describes the behavior of the current programmed buck converter switch net-
work, in a simple and straightforward manner. The switch network output port behaves as a
current source of value ⟨ic(t)⟩TS . The input port follows a power sink characteristic, drawing
power from the source vg equal to the power supplied by the ic current source. Properties of the
power source and power sink elements are described in Chaps.15 and 21.
Similar arguments lead to the averaged switch models of the current programmed boost
and buck–boost converters, illustrated in Fig. 18.9. In both cases, the switch network averaged
terminal waveforms can be represented by a current source of value ⟨ic(t)⟩Ts , in conjunction
with a dependent power source or power sink.
A small-signal ac model of the current-programmed buck converter can now be constructed
by perturbation and linearization of the switch network averaged terminal waveforms. Let
⟨v1(t)⟩Ts = V1+ ˆv1(t)
⟨i1(t)⟩Ts = I1+ ˆi1(t)
⟨v2(t)⟩Ts = V2+ ˆv2(t) (18.20)
⟨i2(t)⟩Ts = I2+ ˆi2(t)
⟨ic(t)⟩Ts = Ic+ ˆic(t)
Perturbation and linearization of the⟨ic(t)⟩Ts current source of Fig.18.8 simply leads to a current
source of value ˆic(t). Perturbation of the power source characteristic, Eq. (18.19), leads to
(V1+ ˆv1(t))(I1+ ˆi1(t))= (Ic+ ˆic(t))(V2+ ˆv2(t)) (18.21)
Upon equating the dc terms on both sides of this equation, we obtain
V1I1= IcV2 ⇒ I1= DIc (18.22)

18.1 A Simple First-Order Model 735
(a)
+
L
CR
+
v(t) Ts
vg(t) Ts
iL(t) Ts
Averaged switch network
ic(t) Ts
p(t) Ts
(b)
+
L
CR
+
v(t) Ts
vg(t) Ts
iL(t) Ts
Averaged switch network
ic(t) Ts
p(t) Ts
Fig. 18.9 Averaged models of CPM boost (a) and CPM buck–boost (b) converters, derived via averaged
switch modeling
The linear small-signal ac terms of Eq. (18.21)a r e
ˆv1(t)I1+ V1ˆi1(t)= ˆic(t)V2+ Ic ˆv2(t) (18.23)
Solution for the small-signal switch network input current ˆi1(t) yields
ˆi1(t)= ˆic(t)V2
V1
+ ˆv2(t) Ic
V1
−ˆv1(t) I1
V1
(18.24)
The small-signal ac model of Fig. 18.10 can now be constructed. The switch network output
port is again a current source, of value ˆic(t). The switch network input port model is obtained
by linearization of the power sink characteristic, as given by Eq. (18.24). The input port current
ˆi1(t) is composed of three terms. Theˆic(t) term is modeled by an independent current source, the
ˆv2(t) term is modeled by a dependent current source, and the ˆv1(t) term is modeled by an eﬀec-
tive ac resistor having the negative value−V1/I1. As illustrated in Fig. 18.11, this incremental
resistance is determined by the slope of the power sink input port characteristic, evaluated at the
quiescent operating point. The power sink leads to a negative incremental resistance because an
increase in⟨v
1(t)⟩Ts causes a decrease in⟨i1(t)⟩Ts , such that constant⟨p(t)⟩Ts is maintained.
The equivalent circuit of Fig. 18.10 can now be simpliﬁed by use of the dc relations V2 =
DV1, I2= V2/R, I1= DI2, I2= Ic. Equation (18.24) then becomes

736 18 Current-Programmed Control
+
L
CR
++
Switch network small-signal ac model
+
vg
V1
I1
i1 i2
ic
V2
V1
ic
v1 v2
Ic
V1
v2 v
Fig. 18.10 Small-signal model of the CCM CPM buck converter, derived by perturbation and lineariza-
tion of the switch network of Fig. 18.8
Quiescent
operating
point
Power source
characteristic
i1(t) Ts
v1(t) Ts
v1(t) Ts
i1(t) Ts
 = p(t) Ts
1r1
I1
V1
V1
I1
Fig. 18.11 Origin of the input port negative incremental resistance r1: the slope of the power sink char-
acteristic, evaluated at the quiescent operating point
ˆi1(t)= Dˆic(t)+ D
R ˆv2(t)−D2
R ˆv1(t) (18.25)
Finally, we can eliminate the quantities ˆv1 and ˆv2 in favor of the converter terminal voltages ˆvg
and ˆv2 as follows. The quantity ˆv1 is simply equal to ˆvg. The quantity ˆv2 is equal to the output
voltage ˆv plus the voltage across the inductor, sLˆic(s). Hence,
ˆv2(s)= ˆv(s)+ sLˆic(s) (18.26)
With these substitutions, Eq. (18.25) becomes
ˆi1(s)= D
⎦
1+ s L
R
)
ˆic(s)+ D
R ˆv(s)−D2
R ˆvg(s) (18.27)
The equivalent circuit of Fig.18.12 is now obtained. It can be veriﬁed that this equivalent circuit
coincides with the model of Fig. 18.6 and the buck converter parameters of Table18.1.
The approximate small-signal properties of the current-programmed buck converter can now
be explained. Since the inductor is in series with the current source ˆic, the inductor does not
contribute to the control-to-output transfer function. The control-to-output transfer function is
determined simply by the relation

18.1 A Simple First-Order Model 737
Fig. 18.12 Simpliﬁcation of the CPM buck converter model of Fig.18.10, with dependent power source
expressed in terms of the output voltage variations
Gvc(s)= ˆv(s)
ˆic(s)
⏐⏐⏐
⏐
⏐⏐
ˆvg=0
=
⎦
R∥ 1
sC
)
(18.28)
So current programming transforms the output characteristic of the buck converter into a current
source. The power sink input characteristic of the current-programmed buck converter leads to
a negative incremental input resistance, as described above. Finally, Fig.18.12 predicts that the
buck converter line-to-output transfer function is zero:
Gvg(s)= ˆv(s)
ˆvg(s)
⏐⏐
⏐⏐⏐
⏐
ˆic=0
= 0 (18.29)
Disturbances in vg do not inﬂuence the output voltage, since the inductor current depends only
on ic. The current-programmed controller adjusts the duty cycle as necessary to maintain con-
stant inductor current, regardless of variations in vg. The more accurate models of Sect. 18.3
predict that Gvg(s) is not zero, but is nonetheless small in magnitude.
Similar arguments lead to the boost converter small-signal equivalent circuit of Fig. 18.13.
Derivation of this equivalent circuit is left as a homework problem. In the case of the boost
converter, the switch network input port behaves as a current source, of value ic, while the
output port is a dependent power source, equal to the power apparently consumed by the current
source i
c. In the small-signal model, the current source ˆic appears in series with the inductor L,
and hence the converter transfer functions cannot contain poles arising from the inductor. The
switch network power source output characteristic leads to an ac resistance of valuer2= R.T h e
line-to-output transfer function Gvg(s) is nonzero in the boost converter, since the magnitude of
+
L
CR
+
vg ic v
iL
Ric D sL
D'2R
vg
D'R
Fig. 18.13 Small-signal model of the CCM CPM boost converter, derived via averaged switch modeling
and the approximation iL ≈ic

738 18 Current-Programmed Control
the power source depends directly on the value of vg. The control-to-output transfer function
Gvc(s) contains a right half-plane zero, identical to the right half-plane zero of the duty-cycle-
controlled boost converter.
18.2 Oscillation for D> 0.5
The current-programmed controller of Fig.18.1 is unstable whenever the steady-state duty cycle
is greater than 0.5. To avoid this stability problem, the controller is usually modiﬁed by addition
of an artiﬁcial ramp to the sensed switch current waveform. In this section, the stability of the
current programmed controller is analyzed. The e ﬀects of the addition of the artiﬁcial ramp
are explained, using a simple ﬁrst-order discrete-time analysis. Eﬀects of the artiﬁcial ramp on
controller noise susceptibility are also discussed.
Figure 18.14 illustrates a generic inductor current waveform of a switching converter oper-
ating in the continuous conduction mode. The inductor current changes with a slope m
1 during
the ﬁrst subinterval, and a slope −m2 during the second subinterval. For the basic nonisolated
converters, the slopes m1 and−m2 are given by
Buck converter
m1= vg−v
L −m2=−v
L
Boost converter
m1= vg
L −m2= vg−v
L (18.30)
Buck–boost converter
m1= vg
L −m2= v
L
With knowledge of the slopes m1 and−m2, we can determine the general relationships between
iL(0), ic, iL(Ts), and dTs.
During the ﬁrst subinterval, the inductor current iL(t) increases with slope m1, until iL(t)
reaches the control signal ic. Hence,
iL(dTs)= ic= iL(0)+ m1dTs (18.31)
iL(t)
ic
m1
t0 dTs Ts
iL(0) iL(Ts)2
Fig. 18.14 Inductor current waveform of a current-programmed converter operating in the continuous
conduction mode

18.2 Oscillation for D> 0.5 739
Solution for the duty cycle d leads to
d= ic−iL(0)
m1Ts
(18.32)
In a similar manner, for the second subinterval we can write
iL(Ts)= iL(dTs)−m2d′Ts (18.33)
= iL(0)+ m1dTs−m2d′Ts
In steady-state, iL(0)= iL(Ts), d= D, m1= M1, and m2= M2. Insertion of these relationships
into Eq. (18.33) yields
0= M1DTs −M2D′Ts (18.34)
Or,
M2
M1
= D
D′ (18.35)
Steady-state Eq. (18.35) coincides with the requirement for steady-state volt-second balance on
the inductor.
Consider now a small perturbation in iL(0):
iL(0)= IL0+ ˆiL(0) (18.36)
IL0 is a steady-state value ofiL(0), which satisﬁes Eqs. (18.33) and (18.34), while ˆiL( 0 )i sas m a l l
perturbation such that
|ˆiL(0)|≪| IL0| (18.37)
It is desired to assess the stability of the current-programmed controller, by determining whether
this small perturbation eventually decays to zero. To do so, let us solve for the perturbation after
n switching periods, ˆiL(nTs), and determine whether ˆiL(nTs) tends to zero for large n.
iL(t)
ic
m1
t0 DTs Ts
IL0
2
2
m1 Steady-state
waveform
Perturbed
waveform
IL0 + iL(0)
dTs
D + d Ts
iL(0)
iL(Ts)
Fig. 18.15 Eﬀect of initial perturbation ˆiL(0) on inductor current waveform
The steady-state and perturbed inductor current waveforms are illustrated in Fig.18.15.F o r
clarity, the size of the inductor current perturbation ˆiL(0) is exaggerated. It is assumed that the
converter operates near steady-state, such that the slopes m1 and m2 are essentially unchanged.
Figure 18.15 is drawn for a positive ˆiL(0); the quantity ˆdTs is then negative. Since the slopes of

740 18 Current-Programmed Control
Fig. 18.16 Expanded view of the steady-state and perturbed inductor current waveforms, near the peak
of iL(t)
the steady-state and perturbed waveforms are essentially equal over the interval 0 < t< (D+
ˆd)Ts, the diﬀerence between the waveforms is equal toˆiL(0) for this entire interval. Likewise, the
diﬀerence between the two waveforms is a constantˆiL(Ts) over the interval DTs< t< Ts, since
both waveforms then have the slope −m2. Note that ˆiL(Ts) is a negative quantity, as sketched
in Fig. 18.15. Hence, we can solve for ˆiL(Ts) in terms of ˆiL(0), by considering only the interval
(D+ ˆd)Ts< t< DTs as illustrated in Fig. 18.16.
From Fig. 18.16, we can use the steady-state waveform to express ˆiL(0) as the slope m1,
multiplied by the interval length−ˆdTs. Hence,
ˆiL(0)=−m1 ˆdTs (18.38)
Likewise, we can use the perturbed waveform to expressˆiL(Ts) as the slope−m2, multiplied by
the interval length−ˆdTs:
ˆiL(Ts)= m2 ˆdTs (18.39)
Elimination of the intermediate variable ˆd from Eqs. (18.38) and (18.39) leads to
ˆiL(Ts)= ˆiL(0)
⎦
−m2
m1
)
(18.40)
If the converter operating point is suﬃciently close to the quiescent operating point, thenm2/m1
is given approximately by Eq. (18.35). Equation (18.40) then becomes
ˆiL(Ts)= ˆiL(0)
⎦
−D
D′
)
(18.41)
A similar analysis can be performed during the next switching period, to show that
ˆiL(2Ts)= ˆiL(Ts)
⎦
−D
D′
)
= ˆiL(0)
⎦
−D
D
)2
(18.42)
After n switching periods, the perturbation becomes
ˆiL(nTs)= ˆiL((n−1)Ts)
⎦
−D
D′
)
= ˆiL(0)
⎦
−D
D′
)n
(18.43)
Note that, as n tends to inﬁnity, the perturbation ˆiL(nTs) tends to zero provided that the charac-
teristic value−D/D′ has magnitude less than one. Conversely, the perturbationˆiL(nTs) becomes
large in magnitude when the characteristic value α=−D/D′ has magnitude greater than one:

18.2 Oscillation for D> 0.5 741
⏐⏐⏐ˆiL(nTs)
⏐⏐⏐→
⎧⎪⎪⎪⎪⎨⎪⎪⎪⎪⎩
0 when
⏐⏐
⏐
⏐⏐−D
D′
⏐⏐
⏐
⏐⏐< 1
∞when
⏐⏐
⏐
⏐⏐−D
D′
⏐⏐
⏐
⏐⏐> 1
(18.44)
Therefore, for stable operation of the current-programmed controller, we need|α|= D/D
′ < 1,
or
D< 0.5 (18.45)
As an example, consider the operation of the boost converter with the steady-state terminal
voltages Vg= 20 V, V= 50 V. SinceV/Vg= 1/D′, the boost converter should operate withD=
0.6. We therefore expect the current-programmed controller to be unstable. The characteristic
value will be
α=−D
D′ =
⎦
−0.6
0.4
)
=−1.5 (18.46)
As given by Eq. (18.43), a perturbation in the inductor current will increase by a factor of – 1.5
over every switching period. As illustrated in Fig. 18.17, the perturbation grows to −1.5 ˆiL(0)
after one switching period, to +2.25 ˆiL(0) after two switching periods, and to −3.375 ˆiL(0) af-
ter three switching periods. For the particular initial conditions illustrated in Fig. 18.17,t h i s
growing oscillation saturates the Current-programmed controller after three switching periods.
The transistor remains on for the entire duration of the fourth switching period. The inductor
current and controller waveforms may eventually become oscillatory and periodic in nature,
with period equal to an integral number of switching periods. Alternatively, the waveforms may
become chaotic. In either event, the controller does not operate as intended.
Figure 18.18 illustrates the inductor current waveforms when the output voltage is decreased
to V = 30 V . The boost converter then operates with D= 1/3, and the characteristic value
becomes
α=−D
D′ =
⎦
−1/3
2/3
)
=−0.5 (18.47)
Perturbations now decrease in magnitude by a factor of 0.5 over each switching period. A dis-
turbance in the inductor current becomes small in magnitude after a few switching periods.
The instability for D> 0.5 is a well-known problem of current programmed control, and
is not dependent on the converter topology. The controller can be rendered stable for all duty
cycles by addition of an artiﬁcial ramp to the sensed switch current waveform, as illustrated
iL(t)
ic
t0 Ts
IL0
2Ts 3Ts 4Ts
iL(0)
iL(0)
ˆ
ˆ
ˆ
ˆ
2.25iL(0)
iL(0)
Fig. 18.17 Unstable oscillation for D= 0.6

742 18 Current-Programmed Control
1
8 iL(0)
1
4 iL(0)1
2 iL(0)
iL(t)
ic
t0 Ts
IL0
iL(0)
2Ts 3Ts 4Ts
1
16 iL(0)
Fig. 18.18 A stable transient with D= 1
3
in Fig. 18.19. This artiﬁcial ramp has the qualitative e ﬀect of reducing the gain of the inner
switch-current-sensing discrete feedback loop. The artiﬁcial ramp has slope ma as shown. The
controller now switches the transistor oﬀwhen
ia(dTs)+ iL(dTs)= ic (18.48)
where ia(t) is the artiﬁcial ramp waveform. Therefore, the transistor is switched o ﬀwhen the
inductor current iL(t) is given by
iL(dTs)= ic−ia(dTs) (18.49)
Figure 18.20 illustrates the analog comparison of the inductor current waveform iL(t) with the
quantity [ic−ia(t)].
We can again determine the stability of the current-programmed controller by analyzing the
change in a perturbation of the inductor current waveform over a complete switching period. Fig-
ure 18.21 illustrates steady-state and perturbed inductor current waveforms, in the presence of
the artiﬁcial ramp. Again, the magnitude of the perturbationˆi
L(0) is exaggerated. The perturbed
waveform is sketched for a positive value of ˆiL(0); this causes ˆd, and usually also ˆiL(Ts), to be
negative. If the perturbed waveforms are suﬃciently close to the quiescent operating point, then
the slopes m1 and m2 are essentially unchanged, and the relationship between ˆiL(0) and ˆiL(Ts)
can be determined solely by consideration of the interval ( D+ ˆd)Ts < t< DTs. The pertur-
bations ˆiL(0) and ˆiL(Ts) are expressed in terms of the slopes m1, m2, and ma, and the interval
length−ˆdTs, as follows:
ˆiL(0)=−ˆdTs(m1+ ma) (18.50)
ˆiL(Ts)=−ˆdTs(ma−m2) (18.51)
Elimination of ˆd yields
ˆiL(Ts)= ˆiL(0)
⎦
−m2−ma
m1+ ma
)
(18.52)
A similar analysis can be applied to the nth switching period, leading to
ˆiL(nTs)= ˆiL((n−1)Ts)
⎦
−m2−ma
m1+ ma
)
= ˆiL(0)
⎦
−m2−ma
m1+ ma
)n
= ˆiL(0)α n (18.53)

18.2 Oscillation for D> 0.5 743
(a)
+
Buck converter
Current-programmed controller
Rvg(t)
is(t)
+
v(t)
iL(t)
Q1
L
CD1
+
Analog
comparator
Latch
ia(t)Rf Ts0
S
R
Q
ma
Clock
is(t)
++
Rf
Measure
switch
current
is(t)Rf
Control
input
ic(t)Rf
Artificial ramp
(b) ia(t)
ma
t0 Ts 2Ts
Fig. 18.19 Stabilization of the current-programmed controller by addition of an artiﬁcial ramp to the
measured switch current waveform: (a) block diagram, (b) artiﬁcial ramp waveform
iL(t)
ic
m1
t0 dTs Ts
IL0
 m2
 ma
(ic ia(t))
Fig. 18.20 Addition of artiﬁcial ramp: the transistor is now switched oﬀwhen iL(t)= ic−ia(t)

744 18 Current-Programmed Control
 maiL(Ts)
i L(0)
ic
m1
t0 DTs Ts
IL0
 m2
 m2
m1 Steady-state
waveform
Perturbed
waveform
IL0 + iL(0)
dTs
D + d Ts
(ic ia(t))
Fig. 18.21 Steady-state and perturbed inductor current waveforms, in the presence of an artiﬁcial ramp
The evolution of inductor current perturbations is now determined by the characteristic value
α=−m2−ma
m1+ ma
(18.54)
For large n, the perturbation magnitude tends to
| ˆiL(nTs)|→
⎧⎪⎪⎨⎪⎪⎩
0 when | α|< 1
∞when| α|> 1 (18.55)
Therefore, for stability of the current-programmed controller, we need to choose the slope of
the artiﬁcial ramp ma such that the characteristic value α has magnitude less than one. The
artiﬁcial ramp gives us an additional degree of freedom, which we can use to stabilize the system
for duty cycles greater than 0.5. Note that increasing the value of ma causes the numerator of
Eq. (18.54) to decrease, while the denominator increases. Therefore, the characteristic value α
attains magnitude less than one for suﬃciently large ma.
In the conventional voltage regulator application, the output voltagev(t) is well regulated by
the converter control system, while the input voltage vg(t) is unknown. Equation ( 18.30) then
predicts that the value of the slope m2 is constant and known with a high degree of accuracy,
for the buck and buck–boost converters. Therefore, let us use Eq. (18.35) to eliminate the slope
m1 from Eq. (18.54), and thereby express the characteristic value α as a function of the known
slope m2 and the steady-state duty cycle D:
α=−
1−ma
m2
D′
D+ ma
m2
(18.56)
One common choice of artiﬁcial ramp slope is
ma= 1
2m2 (18.57)
It can be veriﬁed, by substitution of Eq. (18.57)i n t o(18.56), that this choice leads to α=−1a t
D= 1, and to|α|< 1f o r0≤D< 1. This is the minimum value of ma that leads to stability for
all duty cycles. We will see in Sect. 18.3 that this choice of ma has the added beneﬁt of causing
the ideal line-to-output transfer function Gvg(s) of the buck converter to become zero.
```
