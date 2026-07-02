---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第14章part 1 - 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 552-571 > Chunk ID: `chapter-14-part-1`"
---

# 第14章part 1 - 14 Circuit Averaging, Averaged Switch Modeling, and Simulation

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 552-571  
> Chunk ID: `chapter-14-part-1`

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
14
Circuit Averaging, Averaged Switch Modeling, and
Simulation
Circuit averaging is another well-known technique for derivation of converter equivalent cir-
cuits. Rather than averaging the converter state equations, with the circuit averaging technique
we average the converter waveforms directly. All manipulations are performed on the circuit
diagram, instead of on its equations, and hence the circuit averaging technique gives a more
physical interpretation to the model. Since circuit averaging involves averaging and small-signal
linearization, it is equivalent to state-space averaging. However, in many cases circuit averaging
is easier to apply, and allows the small-signal ac model to be written almost by inspection. The
circuit averaging technique can also be applied directly to a number of di ﬀerent types of con-
verters and switch elements, including phase-controlled rectiﬁers, PWM converters operated in
discontinuous conduction mode or with current programming, and quasi-resonant converters—
these are described in later chapters. However, in other cases it may lead to involuted models
that are less easy to analyze and understand. To overcome this problem, the circuit averaging
and state-space averaging approaches can be combined. Circuit averaging was developed be-
fore state-space averaging, and is described in [ 16]. Because of its generality, there was a later
resurgence of interest in circuit averaging of switch networks [70–76, 108].
The techniques of circuit averaging and averaged switch modeling are developed in
Sect. 14.1. These techniques are employed to model SEPIC and boost converter examples, and
both dc and small-signal ac converter models are developed.
The averaged switch model also exposes the fundamental energy conversion process by
which a switched-mode circuit can convert power from one voltage to another with high e ﬃ-
ciency: dc or low-frequency ac is converted (inverted) to high-frequency ac by the switching
of the PWM transistor. This ac power is then converted back (rectiﬁed) to dc or low-frequency
ac by the diode or other switching element. This power is called the indirect power that ﬂows
within the converter. Indirect power and its relationship to the averaged switch model is dis-
cussed in Sect. 14.1.4.
The averaged switch model lends itself well to simulation. When the semiconductor switches
are replaced with an averaged switch model, circuit simulation programs such as SPICE are able
to plot small-signal ac transfer functions of switching converter systems. This is a very useful
application of the averaged switch modeling approach. SPICE simulation of converters operat-
ing in the continuous conduction mode is developed in Sect. 14.3. Averaged switch modeling
of converters operating in the discontinuous conduction mode is developed in Chap. 15, along
with averaged simulations of DCM.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_14
547

548 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
14.1 Circuit Averaging and Averaged Switch Modeling
The key step in circuit averaging is to replace the converter switches with voltage and current
sources, to obtain a time-invariant circuit topology. The waveforms of the voltage and current
generators are deﬁned to be identical to the switch waveforms of the original converter. Once
a time-invariant circuit network is obtained, then the converter waveforms can be averaged
over one switching period to remove the switching harmonics. Any nonlinear elements in the
averaged circuit model can then be perturbed and linearized, leading to the small-signal ac
model.
In Fig. 14.1, the switching elements are separated from the remainder of the converter. The
converter therefore consists of a switch network containing the converter switching elements,
and a time-invariant network containing the reactive and other remaining elements. Figure14.1
illustrates the simple case in which there are two single-pole single-throw (SPST) switches;
the switches can then be represented using a two-port network. In more complicated systems
containing multiple transistors or diodes, such as in polyphase converters, the switch network
may contain more than two ports.
+
Time-invariant network
containing converter reactive elements
C L
+ vC(t) iL(t)
R
+
v(t)vg(t)
Power input Load
Switch network
port 1
port 2
d(t)Control
input
+
v1(t)
+
v2(t)
i1(t) i2(t)
Fig. 14.1 A switching converter can be viewed as a switch network connected to a time-invariant network
The central idea of the averaged switch modeling approach is to ﬁnd an averaged circuit
model for the switch network. The resulting averaged switch model can then be inserted into
the converter circuit to obtain a complete averaged circuit model of the converter. An important
advantage of the averaged switch modeling approach is that the same model can be used in many
diﬀerent converter conﬁgurations. It is not necessary to rederive an averaged circuit model for
each particular converter. Furthermore, in many cases, the averaged switch model simpliﬁes

14.1 Circuit Averaging and Averaged Switch Modeling 549
+
v1(t)
+
D1
L1
C2
Q1
C1
L2 R
iL1(t)
vg(t)
Switch network
iL2(t)
+ vC1(t
+
vC2(t)
v2(t)
+
i1(t) i2(t)
Duty
cycle d(t)
Fig. 14.2 Schematic of the SEPIC, arranged in the form of Fig. 14.1
t
v2(t)
dTs Ts
0
0
0
vC1 + vC2
t
i1(t)
dTs Ts
0
0
0
iL1 + iL2
t
v1(t)
dTs Ts
0
0
v1(t) Ts
0
vC1 + vC2
t
i2(t)
dTs Ts
0
0
i2(t) Ts
0
iL1 + iL2
i1(t) Ts
v2(t) Ts
Fig. 14.3 Switch network terminal waveforms in the CCM SEPIC
converter analysis and yields good intuitive understanding of the converter steady-state and
dynamic properties.
The ﬁrst step in the process of ﬁnding an averaged switch model for a switch network is
to sketch the converter in the form of Fig. 14.1, in which a switch network containing only the
converter switching elements is explicitly deﬁned. The CCM SEPIC example shown in Fig.14.2
is used to illustrate the process. There is usually more than one way to deﬁne the two ports of the
switch network; a natural way to deﬁne the two-port switch network of the SEPIC is illustrated
in Fig. 14.2. The switch network terminal waveforms v
1(t), i1(t), v2(t), and i2(t) are illustrated

550 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
in Fig. 14.3 for CCM operation. Note that it is not necessary that the ports of the switch network
be electrically connected within the switch network itself. Furthermore, there is no requirement
that any of the terminal voltage or current waveforms of the switch network be nonpulsating.
14.1.1 Obtaining a Time-Invariant Circuit
The next step of the circuit averaging technique is to replace the switch network with dependent
voltage and current sources, so that the circuit connections do not vary in time. The switch
network deﬁned in the SEPIC is shown in Fig.14.4a. As with any two-port network, two of the
four terminal voltages and currents can be taken as independent inputs to the switch network.
The remaining two voltages and /or currents are viewed as dependent outputs of the switch
network. In general, the choice of independent inputs is arbitrary, as long as the inputs can
indeed be independent in the given converter circuit. For CCM operation, one can choose one
terminal current and one terminal voltage as the independent inputs. For this example, let us
select i
1(t) and v2(t) as the switch network independent inputs. In addition, the duty cycle d(t)
is the independent control input. Hence the dependent outputs are taken to be v1(t) and i2(t).
In Fig. 14.4b, the ports of the switch network are replaced by dependent voltage and current
sources. The waveforms of these dependent sources are deﬁned to be identical to the actual
dependent outputs v
1(t) and i2(t) given in Fig.14.3. Since all waveforms in Fig.14.4b match the
waveforms of Figs.14.4a and 14.3, the circuits are electrically equivalent. So far, no approxima-
tions have been made.
14.1.2 Circuit Averaging
The next step is determination of the average values of the switch network terminal waveforms
in terms of the converter state variables (inductor currents and capacitor voltages) and the con-
verter independent inputs (such as the input voltage and the transistor duty cycle). The basic
assumption is made that the natural time constants of the converter network are much longer
that the switching period Ts. This assumption coincides with the requirement for small switch-
ing ripple. One may average the waveforms over a time interval which is short compared to the
system natural time constants, without signiﬁcantly altering the system response [ 16]. Hence,
when the basic assumption is satisﬁed, it is a good approximation to average the converter wave-
forms over the switching period Ts. The resulting averaged model predicts the low-frequency
behavior of the system, while neglecting the high-frequency switching harmonics. In the SEPIC
example, by use of the usual small-ripple approximation, the average values of the switch net-
work terminal waveforms of Fig. 14.3 can be expressed in terms of the independent inputs and
the state variables as follows:
⟨v
1(t)⟩Ts = d′(t) ⎦⟨vC1(t)⟩Ts +⟨vC2(t)⟩Ts
) (14.1)
⟨i1(t)⟩Ts = d(t) ⎦⟨iL1(t)⟩Ts +⟨iL2(t)⟩Ts
) (14.2)
⟨v2(t)⟩TS = d(t) ⎦⟨vC1(t)⟩Ts +⟨vC2(t)⟩Ts
) (14.3)
⟨i2(t)⟩Ts = d′(t)(⟨iL1(t)⟩Ts +⟨iL2(t)⟩Ts ) (14.4)
We have selected⟨i1(t)⟩Ts and⟨v2(t)⟩Ts as the independent inputs of the averaged switch network.
The dependent outputs of the averaged switch network are then⟨i2(t)⟩Ts and⟨v1(t)⟩Ts . The next
step is to express, if possible, the switch network dependent outputs ⟨i2(t)⟩Ts and⟨v1(t)⟩Ts as

14.1 Circuit Averaging and Averaged Switch Modeling 551
(a)
+
v2(t)
i1(t) i2(t)
+
v1(t)
Switch network
(b)
+
+
v2(t)
i1(t)
Switch network
i2(t)v1(t)
i2(t)
(c)
+
+
v2(t) Ts
i1(t) Ts
Averaged switch network
+
v1(t) Ts
i2(t) Ts
d'(t)
d(t) v2(t) Ts
d'(t)
d(t) i1(t) Ts
(d)
+ D' : DI1 + i1 I2 + i2
I2
DD'dV1 + v1
V1
DD'd
V2 + v2
+ +
Averaged switch network
Fig. 14.4 Derivation of the averaged switch model for the CCM SEPIC: (a) switch network; (b) switch
network where the switches are replaced with dependent sources whose waveforms match the switch
terminal dependent waveforms; (c) large-signal, nonlinear averaged switch model obtained by averaging
the switch network terminal waveforms in (b); (d) dc and ac small-signal averaged switch model

552 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
functions solely of the switch network independent inputs ⟨i1(t)⟩Ts, ⟨v2(t)⟩Ts , and the control
input d(t). In this step, the averaged switch outputs should not be written as functions of other
converter signals such as⟨vg(t)⟩Ts,⟨vC1(t)⟩Ts,⟨vC2(t)⟩Ts,⟨iL1(t)⟩Ts,⟨iL2(t)⟩Ts ,e t c .
We can use Eqs. (14.2) and (14.3) to write
⟨iL1(t)⟩Ts +⟨iL2(t)⟩TS =⟨i1(t)⟩Ts
d(t) (14.5)
⟨vC1(t)⟩Ts +⟨vC2(t)⟩Ts =⟨v2(t)⟩Ts
d(t) (14.6)
Substitution of these expressions into Eqs. (14.1) and (14.4) leads to
⟨v1(t)⟩Ts = d′(t)
d(t)⟨v2(t)⟩Ts (14.7)
⟨i2(t)⟩Ts = d′(t)
d(t)⟨i1(t)⟩Ts (14.8)
The averaged equivalent circuit for the switch network, that corresponds to Eqs. (14.7) and (14.8),
is illustrated in Fig. 14.4c. Upon completing the averaging step, the switching harmonics have
been removed from all converter waveforms, leaving only the dc and low-frequency ac compo-
nents. This large-signal, nonlinear, time-invariant model is valid for frequencies suﬃciently less
than the switching frequency. Averaging the waveforms of Fig. 14.3 modiﬁes only the switch
network; the remainder of the converter circuit is unchanged. Therefore, the averaged circuit
model of the converter is obtained simply by replacing the switch network with the averaged
switch model. The switch network of Fig. 14.4a can be identiﬁed in any two-switch converter,
such as the buck, boost, buck–boost, SEPIC, or´Cuk. If the converter operates in continuous con-
duction mode, the derivation of the averaged switch model follows the same steps, and the result
shown in Fig. 14.4c is the same for all of these converter topologies. This means that the model
of Fig. 14.4c can be used as a general large-signal averaged switch model for all two-switch
converters operating in CCM.
14.1.3 Perturbation and Linearization
The model of Fig. 14.4c is nonlinear, because the dependent generators given by Eqs. ( 14.7)
and (14.8) are nonlinear functions of d(t),⟨i
2(t)⟩TS , and⟨v1(t)⟩TS . To construct a small-signal ac
model, we perturb and linearize Eqs. (14.7) and (14.8) in the usual fashion. Let
d(t)= D+ ˆd(t)
⟨v1(t)⟩Ts = V1+ ˆv1(t)
⟨i1(t)⟩Ts = I1+ ˆi1(t) (14.9)
⟨v2(t)⟩TS = V2+ ˆv2(t)
⟨i2(t)⟩Ts = I2+ ˆi2(t)
With these substitutions, Eq. (14.7) becomes
(D+ ˆd)(V1+ ˆv1)= (D′−ˆd)(V2+ ˆv2) (14.10)

14.1 Circuit Averaging and Averaged Switch Modeling 553
Fig. 14.5 Linearization of the dependent voltage
source
Fig. 14.6 Linearization of the dependent current
source
It is desired to solve for the dependent quantityV1+ ˆv1. Equation (14.10) can be manipulated
as follows:
D(V1+ ˆv1)= D′(V2+ ˆv2)−ˆd(V1+ V2)−ˆdˆv1−ˆdˆv2 (14.11)
The terms ˆd(t)ˆv1(t) and ˆd(t)ˆv2(t) are nonlinear, and are small in magnitude provided that the ac
variations are much smaller than the quiescent values [as in Eq. (7.33)]. When the small-signal
assumption is satisﬁed, these terms can be neglected. Upon eliminating the nonlinear terms and
solving for the switch network dependent output V
1+ ˆv1, we obtain
(V1+ ˆv1)= D′
D (V2+ ˆv2)−ˆd
⎦V1+ V2
D
)
(14.12)
= D′
D (V2+ ˆv2)−ˆd
⎦V1
DD′
)
The term ( V1/DD′) ˆd(t) is driven by the control input ˆd2 and hence can be represented by an
independent voltage source as in Fig.14.5.T h et e r m(D′/D)(V2+ ˆv2(t)) is equal to the constant
value (D′/D) multiplied by the port 2 independent voltage (V2+ ˆv2(t)). This term is represented
by a dependent voltage source in Fig. 14.5. This dependent source will become the primary
winding of an ideal transformer.
In a similar manner, substitution of the relationships (14.9) into Eq. (14.8) leads to:
(D+ ˆd)(I2+ ˆi2)= (D′−ˆd)(I1+ ˆi1) (14.13)
The terms ˆi1(t) ˆd(t) and ˆi2(t) ˆd(t) are nonlinear, and can be neglected when the small-signal as-
sumption is satisﬁed. Elimination of the nonlinear terms, and solution for I2+ ˆi2, yields
(I2+ ˆi2)= D′
D (I1+ ˆi1)−ˆd
⎦I1+ I2
D
)
(14.14)
= D′
D (I1+ ˆi1)−ˆd
⎦I2
DD′
)

554 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
Fig. 14.7 A dc and small-signal ac averaged circuit model of the CCM SEPIC
The term ( I2/DD′) ˆd(t) is driven by the control input ˆd(t), and is represented by an indepen-
dent current source in Fig. 14.6.T h et e r m(D′/D)(I1+ ˆi1(t)) is dependent on the port 1 current
(I1+ ˆi1(t)). This term is modeled by a dependent current source in Fig. 14.6; this source will
become the secondary winding of an ideal transformer. Equations (14.12) and (14.14) describe
the averaged switch network model of Fig. 14.4d. Note that the model contains both dc and
small-signal ac terms: one equivalent circuit is used for both the dc and the small-signal ac
models. The transformer symbol contains both a solid line indicating that it is an ideal trans-
former capable of passing dc voltages and currents, and a sinusoidal line which indicates that
small-signal ac variations are modeled. The averaged switch model of Fig.14.4d reveals that the
switch network performs the functions of: (i) transformation of dc and small-signal ac voltage
and current levels according to the D
′:D conversion ratio and (ii) introduction of ac voltage and
current variations into the converter circuit, driven by the control input d(t). When this model
is inserted into Fig. 14.2, the dc and small-signal ac SEPIC model of Fig. 14.7 is obtained. This
model can now be solved to determine the steady-state voltages and currents as well as the
small-signal converter transfer functions.
The reference directions of the switch network waveforms in Figs.14.2 and 14.3 are deﬁned
such that these waveforms are positive or zero for this example. The dc components of the
averaged waveforms of Figs. 14.4 and 14.7 lead to average power ﬂowing into port 1 of the
switch network, and ﬂowing out of port 2. Since no losses are modeled, the averaged switch
network is lossless (for ˆd= 0), and the port 1 input power is equal to the port 2 output power,
with voltages and currents transformed by the switch network conversion ratio D/D
′.
In summary, the circuit averaging method involves replacing the switch network with equiv-
alent voltage and current sources, such that a time-invariant network is obtained. The converter
waveforms are then averaged over one switching period to remove the switching harmonics.
The large-signal model is perturbed and linearized about a quiescent operating point, to obtain
a dc and a small-signal averaged switch model. Replacement of the switch network with the
averaged switch model yields a complete averaged circuit model of the converter.

14.1 Circuit Averaging and Averaged Switch Modeling 555
14.1.4 Indirect Power
The averaged switch models of Figs.14.1, 14.4d, and 14.7 contain a dc transformer that transfers
average power from input port 1 to output port 2 of the switch network. Yet, in the original
circuits of Figs. 14.4a and 14.2, there is no direct connection between the transistor port 1 and
the diode port 2. What is the physical mechanism in the circuit that leads to transmission of
average power between ports 1 and 2? The existence and operation of such a mechanism are
key to the validity and justiﬁcation of the averaged switch model.
Let us examine in more detail the power ﬂowing into port 1 of the switch network, as deﬁned
by the port 1 voltage v1(t) and current i1(t) waveforms of Fig. 14.3. The instantaneous power
ﬂowing into port 1 can be expressed as:
p1(t)= v1(t)i1(t) (14.15)
We can express the instantaneous voltage v1(t) and current i1(t) in terms of their dc (average)
components and high-frequency ac (switching) components as follows:
v1(t)=⟨v1(t)⟩Ts + ˜v1(t)
i1(t)=⟨i1(t)⟩Ts + ˜i1(t) (14.16)
where ˜v1(t) and˜i1(t) are the high-frequency switching components ofv1(t) and i1(t), respectively.
By deﬁnition, these quantities are purely ac and have zero average:
⟨˜v1(t)⟩Ts = 0
⟨˜i1(t)⟩Ts = 0 (14.17)
The dc or low-frequency components of v1(t) and i1(t)a r e⟨v1(t)⟩Ts and⟨i1(t)⟩Ts , averaged ac-
cording to Eq. (7.3) as usual. We can express the port 1 instantaneous power as
p1(t)= ⎦⟨v1⟩Ts + ˜v1(t)) ⎦
⟨i1⟩Ts + ˜i1(t)
)
=⟨v1⟩Ts⟨i1⟩Ts +⟨v1⟩Ts
˜i1(t)+⟨i1⟩Ts ˜v1(t)+ ˜v1(t)˜i1(t) (14.18)
The net energy ﬂowing into port 1 over one switching period is
P1=⟨p1(t)⟩Ts (14.19)
In this discussion, we do not model losses and consider the transistor as an ideal switch. With
this ideal switch assumption, the average port 1 power is zero:
P1=⟨p1(t)⟩Ts = 0 (14.20)
Now substitute Eq. ( 14.18) into Eq. ( 14.20). Equation ( 14.17) implies that the cross-product
terms⟨v1⟩Ts
˜i1(t) and⟨i1⟩Ts ˜v1(t) have zero average. Hence we obtain
0=⟨v1⟩Ts⟨i1⟩Ts +⟨˜v1(t)˜i1(t)⟩Ts (14.21)

556 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
port 1
port 2
Fig. 14.8 Circuit modeling only the switching-frequency components of the converter waveforms
This can be rearranged as
⟨v1⟩Ts⟨i1⟩Ts =−⟨˜v1(t)˜i1(t)⟩Ts (14.22)
The quantity⟨v1⟩Ts⟨i1⟩Ts is the dc power ﬂowing into the switch network port 1 of the averaged
model. Equation (14.22) shows that the transistor operating as an ideal switch converts this into
ac average power⟨˜v1(t)˜i1(t)⟩Ts that ﬂows out of port 1. This ac average power is transmitted at
the switching frequency and its harmonics (see Sect. 20.1 for a detailed explanation of average
power in nonsinusoidal systems). The transistor behaves as an inverter, converting dc power
into ac power at the switching frequency. This ac power is calledindirect power [9, 109].
The ac components ˜v1(t) and ˜i1(t) are not included in the averaged model, and hence the
averaged model is unable to represent how the ac power ﬂows through the converter. We could
sketch a circuit that models the high-frequency components of the converter waveforms, such
as ˜v1(t), ˜i1(t), etc. Figure 14.8 is obtained from Fig. 14.2 by the dc (average) components of
the converter waveforms to zero; the remaining signals of the circuit occur at the switching
frequency and its harmonics. It is assumed that v
g(t) contains only dc, so the input voltage
source is set to zero. As noted above, port 1 of the switch network becomes a source of switching
harmonics and ac power.
Figure 14.9 illustrates the waveforms ˜v1(t), ˜i1(t), ˜v2(t), and ˜i2(t), for operation in continuous
conduction mode with small ripple in the inductor currents and capacitor voltages. Under these
conditions, the inductors behave nearly as open circuits at the switching frequency, and the
capacitors behave nearly as short circuits. In consequence, the indirect power ﬂows out of port
1, through capacitor C
1, and into port 2.
We can write the equations of the instantaneous and average power in port 2 of the switch
network in a similar manner. The instantaneous power ﬂowing out of port 2 is
p2(t)= v2(t)i2(t) (14.23)

14.1 Circuit Averaging and Averaged Switch Modeling 557
Fig. 14.9 Switching-frequency components of the switch network waveforms, SEPIC example
The reference polarities of v2(t) and i2(t) have been chosen such that both of these waveforms
are positive. In consequence, positive p2(t) represents generated power that ﬂows out of switch
network port 2. The instantaneous voltage v2(t) and current i2(t) are expressed in terms of their
dc (average) components and high-frequency ac (switching) components as follows:
v2(t)=⟨v2⟩Ts + ˜v2(t)
i2(t)=⟨i2⟩Ts + ˜i2(t) (14.24)
By deﬁnition, ˜v2(t) and ˜i2(t) are purely ac and have zero average:
⟨˜v2(t)⟩Ts = 0
⟨˜i2(t)⟩Ts = 0 (14.25)
The port 2 instantaneous power is
p2(t)= ⎦⟨v2⟩Ts + ˜v2(t)) ⎦
⟨i2⟩Ts + ˜i2(t)
)
=⟨v2⟩Ts⟨i2⟩Ts +⟨v2⟩Ts
˜i2(t)+⟨i2⟩Ts ˜v2(t)+ ˜v2(t)˜i2(t) (14.26)
The net energy ﬂowing out of port 2 over one switching period is
P2=⟨p2(t)⟩Ts (14.27)
Again, we do not model losses and consider the diode as an ideal switch. With this ideal switch
assumption, the average port 2 power is zero:
P2=⟨p2(t)⟩Ts = 0 (14.28)

558 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
Now substitute Eq. ( 14.26) into Eq. ( 14.28). Equation ( 14.25) implies that the cross-product
terms⟨v2⟩Ts
˜i2(t) and⟨i2⟩Ts ˜v2(t) have zero average. Hence we obtain
0=⟨v2⟩Ts⟨i2⟩Ts +⟨˜v2(t)˜i2(t)⟩Ts (14.29)
This can be rearranged as
⟨v2⟩Ts⟨i2⟩Ts =−⟨˜v2(t)˜i2(t)⟩Ts (14.30)
So port 2 behaves as a rectiﬁer that converts the ac indirect power ﬂowing into port 2 (from the
remainder of the converter) into dc power. This dc power ﬂows out of port 2, and is the port 2
power of the averaged model.
Thus, dc power ﬂows into port 1 of the switch network. The switching transistor performs
the function of inversion, converting the dc power into ac indirect power that ﬂows out of switch
network port 1 and through the remainder of the converter circuit including its reactive elements.
This ac indirect power then ﬂows into port 2 of the switch network, where the switching diode
performs the function of rectiﬁcation to convert the indirect power back to dc. This dc power
constitutes the port 2 power of the averaged switch model.
It can be observed that the process of average switch modeling requires assumptions to be
made about the time-invariant network and the waveforms of its reactive elements, which are
then employed in modeling the switch network itself. The derivation summarized in Fig. 14.4
relies on these assumptions. For example, when the inductor current or capacitor voltage ripple
is large, then the switch network models of Figs. 14.4c,d are not valid averaged representations
of the switch network of Fig. 14.4a. Additional analysis is required, that accounts for how the
reactive elements respond to the operation of the switch network, and how the ac indirect power
propagates out of the switch network port 1, through the converter reactive elements, and into
the switch network port 2. Averaged switch models for the discontinuous conduction mode are
developed in Chap. 15, and for resonant switch converters in Chap. 23.
In converters that include a dc path between the converter input V
g and output V terminals
for at least one subinterval, the indirect power can be smaller than the converter input power.
The remaining power is called direct power; the direct power ﬂows from the converter input
to the output without the intermediate steps of high-frequency inversion and rectiﬁcation. The
buck and boost converters exhibit direct power ﬂow, while the buck–boost, SEPIC,´Cuk, and all
transformer-isolated converters do not. In general, we expect the indirect power conversion path
to incur higher loss than direct conversion: direct power is subject only to dc conduction losses,
while indirect power conversion incurs dc conduction losses as well as magnetics ac losses and
semiconductor switching loss. Hence, converters that operate with a lower fraction of indirect
power conversion can be expected to exhibit higher eﬃciency.
14.2 Additional Conﬁgurations of Switch Networks
The switch network of Fig. 14.4a can be identiﬁed in all two-switch converters, including buck,
boost, SEPIC, ´Cuk, etc. As illustrated in Fig. 14.10, a complete averaged circuit model of the
converter can be constructed simply by replacing the switch network with the averaged switch
model. For example, Fig.14.11 shows an averaged circuit model of the boost converter obtained
by identifying the switch network of Fig.14.4a and replacing the switch network with the model
of Fig. 14.4d.

14.2 Additional Conﬁgurations of Switch Networks 559
(a)
+
Time-invariant network
containing converter reactive elements
C L
+ vC(t) iL(t)
R
+
v(t)vg(t)
Power input Load
d(t)
+
v1(t)
+
v2(t)
i1(t) i2(t)
Duty
cycle
Duty
cycle
Switch
network
(b) daoLtupnirewoP
+Time-invariant network
containing converter reactive elements
Fig. 14.10 Construction of an averaged circuit model for a two-switch converter operating in CCM: ( a)
the converter circuit with the general two-switch network identiﬁed; ( b) dc and ac small-signal averaged
circuit model obtained by replacing the switch network with the averaged model
So far, we have described derivation of the averaged switch model for the general two-switch
network where the ports of the switch network coincide with the switch ports. No connections
are assumed between the switches within the switch network itself. As a result, this switch
network and its averaged model can be used to easily construct averaged circuit models of
many two-switch converters, as illustrated in Fig. 14.10. It is important to note, however, that

560 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
(a)
+
L
CR
+
v(t)vg(t)
i(t)
+
v1(t)
i1(t) i2(t)
 v2(t) +
Switch
network
Fig. 14.11 Construction of an averaged circuit model for an ideal boost converter example: converter
circuit with the switch network of Fig. 14.4a identiﬁed; ( b) a dc and small-signal ac averaged circuit
model obtained by replacing the switch network with the model of Fig. 14.4d
the deﬁnition of the switch network ports is not unique. Di ﬀerent deﬁnitions of the switch
network lead to equivalent, but not identical, averaged switch models. The alternative forms of
the averaged switch model may result in simpler circuit models, or models that provide better
physical insight. Two alternative averaged switch models, better suited for analyses of boost
and buck converters, are described in this section.
Consider the ideal boost converter of Fig. 14.12a. The switch network contains the transis-
tor and the diode, as in Fig. 14.11a, but the switch network ports are deﬁned diﬀerently. Let us
proceed with the derivation of the corresponding averaged switch model. The switch network
terminal waveforms are shown in Fig. 14.12b. Since i
1(t) and v2(t) coincide with the converter
inductor current and capacitor voltage, it is convenient to choose these waveforms as the inde-
pendent inputs to the switch network. The steps in the derivation of the averaged switch model
are illustrated in Fig. 14.13.
First, we replace the switch network with dependent voltage and current generators as illus-
trated in Fig. 14.13b. The voltage generatorv1(t) models the dependent voltage waveform at the
input port of the switch network, i.e., the transistor voltage. As illustrated in Fig. 14.12b, v1(t)
is zero when the transistor conducts, and is equal to v2(t) when the diode conducts:
v1(t)=
{ 0, 0< t< dTs
v2(t), dTs< t< Ts
(14.31)
When v1(t) is deﬁned in this manner, the inductor voltage waveform is unchanged. Likewise,
i2(t) models the dependent current waveform at port 2 of the network, i.e., the diode current. As
illustrated in Fig. 14.12b, i2(t) is equal to zero when the transistor conducts, and is equal to i1(t)
when the diode conducts:

14.2 Additional Conﬁgurations of Switch Networks 561
(a)
+
L
CR
+
v(t)vg(t)
i(t)
+
v1(t)
i1(t) i2(t)
Switch network
+
v2(t)
(b)
t
v1(t)
dTs Ts
0
0
0
v2(t)
t
i2(t)
dTs Ts
0 0
0
i1(t)
v1(t) Ts
i2(t) Ts
Fig. 14.12 An ideal boost converter example: ( a) converter circuit showing another possible deﬁnition
of the switch network; (b) terminal waveforms of the switch network
i2(t)=
{ 0, 0< t< dTs
i1(t), dTs< t< Ts
(14.32)
With i2(t) deﬁned in this manner, the capacitor current waveform is unchanged. Therefore, the
original converter circuit shown in Fig. 14.12a and the circuit obtained by replacing the switch
network of Fig. 14.13a with the switch network of Fig. 14.13b are electrically identical. So far,
no approximations have been made. Next, we remove the switching harmonics by averaging all
signals over one switching period, as in Eq. (7.3). The results are
⟨v1(t)⟩Ts = d′(t)⟨v2(t)⟩Ts (14.33)
⟨i2(t)⟩Ts = d′(t)⟨i1(t)⟩Ts
Here we have assumed that the switching ripples of the inductor current and capacitor voltage
are small, or at least linear functions of time. The averaged switch model of Fig. 14.13ci s
now obtained. This is a large-signal, nonlinear model, which can replace the switch network in
the original converter circuit, for construction of a large-signal nonlinear circuit model of the
converter. The switching harmonics have been removed from all converter waveforms, leaving
only the dc and low-frequency ac components.

562 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
(a)
+
v1(t)
+
v2(t)
i1(t) i2(t)
(b)
+v1(t)
+
v2(t)
i1(t)
i2(t)
Switch network
(c)
+
v2(t) Ts
+d'(t) v2(t) Ts
d'(t) i1(t) Ts
i1(t) Ts
Averaged switch network
Fig. 14.13 Derivation of the averaged switch model for the CCM boost of Fig.14.12:( a) switch network;
(b) switch network where the switches are replaced with dependent sources whose waveforms match
the switch terminal dependent waveforms; ( c) large-signal, nonlinear averaged switch model obtained
by averaging the switch network terminal waveforms in ( b); (d) dc and ac small-signal averaged switch
network model

14.2 Additional Conﬁgurations of Switch Networks 563
The model can be linearized by perturbing and linearizing the converter waveforms about a
quiescent operating point, in the usual manner. Let
⟨vg(t)⟩TS = Vg+ ˆvg(t)
d(t)= D+ ˆd(t)⇒d′(t)= D′−ˆd(t)
⟨i(t)⟩Ts =⟨i1(t)⟩Ts = I + ˆi(t) (14.34)
⟨v(t)⟩Ts =⟨v2(t)⟩Ts = V+ ˆv(t)
⟨v1(t)⟩Ts = V1+ ˆv1(t)
⟨i2(t)⟩Ts = I2+ ˆi2(t)
The nonlinear voltage generator at port 1 of the averaged switch network has value
(D′−ˆd(t))(V+ ˆv(t))= D′(V+ ˆv(t))−V ˆd(t)−ˆv(t) ˆd(t) (14.35)
The term ˆv(t) ˆd(t) is nonlinear, and is small in magnitude provided that the ac variations are
much smaller than the quiescent values [as in Eq. (7.33)]. When the small-signal assumption is
satisﬁed, this term can be neglected. The termV ˆd(t) is driven by the control input, and hence can
be represented by an independent voltage source. The term D′(V+ ˆv(t)) is equal to the constant
value D′ multiplied by the output voltage ( V+ ˆv(t)). This term is dependent on the output
capacitor voltage; it is represented by a dependent voltage source. This dependent source will
become the primary winding of an ideal transformer.
The nonlinear current generator at the port 2 of the averaged switch network is treated in a
similar manner. Its current is
(D′−ˆd(t))(I+ ˆi(t))= D′(I+ ˆi(t))−I ˆd(t)−ˆi(t) ˆd(t) (14.36)
The term ˆi(t) ˆd(t) is nonlinear, and can be neglected provided that the small-signal assumption is
satisﬁed.
The term I ˆd(t) is driven by the control input ˆd(t), and is represented by an independent
current source. The term D′(I+ ˆi(t)) is dependent on the inductor current (I+ ˆi(t)). This term is
modeled by a dependent current source; this source will become the secondary winding of an
ideal transformer.
Upon elimination of the nonlinear terms, and replacement of the dependent generators
with an ideal D′:1 transformer, the combined dc and small-signal ac averaged switch model
of Fig. 14.13d is obtained. Figure14.14 shows the complete averaged circuit model of the boost
converter.
It is interesting to compare the models of Figs. 14.11b and 14.14. The two averaged circuit
models of the boost converter are equivalent—they result in the same steady-state solution,
and the same converter transfer functions. However, since both ports of the switch network in
Fig. 14.12a share the same reference ground, the resulting averaged circuit model in Fig. 14.14
is easier to solve, and gives better physical insight into steady-state operation and dynamics of
the boost converter. The circuit model of Fig.14.14 reveals that the switch network performs the
functions of: (i) transformation of dc and small-signal ac voltage and current levels according
to the D
′:1 conversion ratio and ( ii) introduction of ac voltage and current variations into the
converter circuit, driven by the control input d(t). The model of Fig. 14.14 obtained using the
circuit averaging approach is identical to the model of Fig. 7.18b obtained using the basic ac
modeling technique of Sect. 7.2.

564 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
Fig. 14.14 Dc and small-signal ac averaged circuit model of the boost converter
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
Switch network
+
v1(t)
(b)
t
i1(t)
dTs Ts
0 0
0
i2
t
v2(t)
dTs Ts
0
0
0
v1
i1(t) Ts
i2(t) Ts
v2(t) Ts
Fig. 14.15 Buck converter example: (a) converter circuit, (b) switch waveforms
Next, we consider the CCM buck converter of Fig. 14.15, where the switch network ports
are deﬁned to share a common ground terminal. The derivation of the corresponding averaged
switch model follows the same steps as in the SEPIC and the boost examples. Let us select
v1(t) and i2(t) as the independent terminal variables of the two-port switch network, since these
quantities coincide with the applied converter input voltage vg(t) and the inductor current i(t),

14.2 Additional Conﬁgurations of Switch Networks 565
Fig. 14.16 Averaged switch modeling, buck converter example: ( a) dc and small-signal ac averaged
switch model; ( b) Averaged circuit model of the buck converter obtained by replacement of the switch
network by the averaged switch model
respectively. We then need to express the averaged dependent terminal waveforms⟨i1(t)⟩Ts and
⟨v2(t)⟩Ts as functions of the control input d(t) and of⟨v1(t)⟩Ts and⟨i2(t)⟩Ts . Upon averaging the
waveforms of Fig.14.15b, one obtains
⟨i1(t)⟩Ts = d(t)⟨i2(t)⟩Ts (14.37)
⟨v2(t)⟩TS = d(t)⟨v1(t)⟩TS
Perturbation and linearization of Eq. (14.37) then leads to
I1+ ˆi1(t)= D(I2+ ˆi2(t))+ I2 ˆd(t) (14.38)
V2+ ˆv2(t)= D(V1+ ˆv1(t))+ V1 ˆd(t)
An equivalent circuit corresponding to Eq. ( 14.38) is illustrated in Fig. 14.16a. Replacement
of the switch network in Fig. 14.15a with the averaged switch model of Fig. 14.16a leads to the
converter averaged circuit model of Fig.14.16b. The circuit model of Fig.14.16b reveals that the
switch network performs the functions of: ( i) transformation of dc and small-signal ac voltage
and current levels according to the 1:D conversion ratio and (ii) introduction of ac voltage and
current variations into the converter circuit, driven by the control input d(t). The model is easy
to solve for both dc conversion ratio and small-signal frequency responses. It is identical to the
model shown in Fig. 7.18a.
The three basic switch networks—the buck switch network, the boost switch network, and
the general two-switch network—together with the corresponding averaged switch models are
shown in Fig. 14.17.

566 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
Fig. 14.17 Three basic switch networks, and their CCM dc and small-signal ac averaged switch models:
(a) the buck switch network, (b) the boost switch network, and (c) the general two-switch network
14.3 Simulation of Averaged Circuit Models
Computer simulation can be a powerful tool in the engineering design process. Starting from
design speciﬁcations, an initial design typically includes selection of system and circuit conﬁg-
urations, as well as component types and values. In this process, component and system models
are constructed based on vendor-supplied data, and by applications of analysis and modeling
techniques. These models, validated by experimental data whenever possible, are the basis upon
which the designer can choose parameter values and verify the achieved performance against
the design speciﬁcations. One must take into account the fact that actual parameter values will
not match their nominal values because of inevitable production tolerances, changes in environ-
mental conditions (such as temperature), and aging. In the design veriﬁcation step, worst-case
analysis (or other reliability and production yield analysis) is performed to judge whether the
speciﬁcations are met under all conditions, i.e., for expected ranges of component parameter
values. Computer simulation is very well suited for this task: using reliable models and appro-
priate simulation setups, the system performance can be tested for various sets of component
```
