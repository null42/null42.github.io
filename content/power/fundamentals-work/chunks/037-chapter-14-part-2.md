---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第14章part 2 - 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 572-588 > Chunk ID: `chapter-14-part-2`"
---

# 第14章part 2 - 14 Circuit Averaging, Averaged Switch Modeling, and Simulation

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 572-588  
> Chunk ID: `chapter-14-part-2`

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
14.3 Simulation of Averaged Circuit Models 567
parameter values. One can then perform design iterations until the worst-case behavior meets
speciﬁcations, or until the system reliability and production yield are acceptably high.
In the design veriﬁcation of power electronic systems by simulation, it is often necessary to
use component and system models of various levels of complexity:
1. Detailed, complex models that attempt to accurately represent physical behavior of devices.
Such models are necessary for tasks that involve ﬁnding switching times, details of switch-
ing transitions and switching loss mechanisms, or instantaneous voltage and current stresses.
Component vendors often provide libraries of such device models. To complete a detailed
circuit model, one must also carefully examine eﬀects of packaging and board interconnects.
With fast switching power semiconductors, simulation time steps of a few nanoseconds or
less may be required, especially during on/oﬀswitching transitions. Because of the com-
plexity of detailed device models, and the ﬁne time resolution, the simulation tasks can
be time consuming. In practice, time-domain simulations using detailed device models are
usually performed on selected parts of the system, and over relatively short time intervals.
Tools available to perform transient simulations of switched-mode power converter using
detailed device models include variants of SPICE [110] such as LTspice and PSpice.
2. Simpliﬁed device models. Since an on/oﬀswitching transition usually takes a small fraction
of a switching cycle, the basic operation of switching power converters can be explained
using simpliﬁed, idealized device models. For example, a MOSFET can be modeled as a
switch with a small (ideally zero) on-resistanceR
on when on, and a very large oﬀ-resistance
(ideally an open circuit) when oﬀ. Such simpliﬁed models yield physical insight into the ba-
sic operation of switching power converters, and provide the starting point for developments
of analytical models described throughout this book. Simpliﬁed device models are also
useful for time-domain simulations aimed at verifying converter and controller operation,
switching ripples, current and voltage stresses, and responses to load or input transients.
Since device models are simple, and details of switching transitions are ignored, tasks that
require simulations over many switching cycles can be completed eﬃciently using circuit
simulators. Various approaches have been developed to support fast transient simulation of
switching power converters based on idealized, piecewise-linear device models [111–117],
or a combination of piecewise-linear and nonlinear models [ 118]. Simulation tools based
on piecewise-linear device models include PLECS and SIMPLIS.
3. Averaged converter models. Averaged models that are well suited for prediction of converter
steady-state and dynamic responses are discussed throughout this book. These models are
essential design tools because they provide physical insight and lead to analytical results
that can be used in the design process to select component parameter values for a given
set of speciﬁcations. In the design veriﬁcation step, simulations of averaged converter mod-
els can be performed to test for losses and e ﬃciency, steady-state voltages and currents,
stability, and large-signal transient responses. Since switching transitions and ripples are
removed by averaging, simulations over long time intervals and over many sets of param-
eter values can be completed eﬃciently. As a result, averaged models are also well suited
for simulations of large electronic systems that include switching converters. Furthermore,
since large-signal averaged models are nonlinear, but time-invariant, small-signal ac simu-
lations can be used to generate various frequency responses of interest. Selected references
on averaged converter modeling for simulation include [119–129].
Based on the material presented in Sect. 14.1, averaged switch models for computer simula-
tion of converters operating in continuous conduction mode are described in this section. It is

568 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
assumed that the reader is familiar with basics of SPICE circuit simulations. SPICE subcircuit
netlists are included to help explain details of model implementation and simulation analysis
options. Usually, instead of writing netlists, the user would enter circuit diagrams and analysis
options from a front-end schematic capture tool.
14.3.1 Simulation Model of the Ideal CCM Averaged Switch Network
The central idea of the averaged switch modeling described in Sect. 14.1 is to identify a switch
network in the converter, and then to ﬁnd an averaged circuit model. The resulting averaged
switch model can then be inserted into the converter circuit to obtain a complete model of the
converter. An important feature of the averaged switch modeling approach is that the same
model can be used in many diﬀerent converter conﬁgurations; it is not necessary to rederive an
averaged equivalent circuit for each particular converter. This feature is also very convenient for
construction of averaged circuit models for simulation. A general-purpose subcircuit represents
a large-signal nonlinear averaged switch model. The converter averaged circuit for simulation is
then obtained by replacing the switch network with this subcircuit. Based on the discussion in
Sect. 14.1, subcircuits that represent CCM averaged switch models are described in this section.
The large-signal averaged switch model for the general two-switch network of Fig.14.4ai s
shown in Fig. 14.4c. A SPICE subcircuit implementation of this model is shown in Fig. 14.18.
The subcircuit has ﬁve nodes. The transistor port of the averaged switch network is connected
between the nodes 1 and 2, while the diode port is comprised of nodes 3 and 4. The duty ratio
d= v(5) is the control input to the subcircuit at the node 5. The quantity v(5) is a voltage that
is equal to the duty cycle, and that lies in the range zero to one volt. Figure 14.18cs h o w st h e
netlist of the subcircuit. The netlist consists of only four lines of code and several comment
lines (the lines starting with
∗). The .subckt line deﬁnes the name (CCM1) of the subcircuit and
the interface nodes. The value of the controlled voltage source Et, which models the transistor
port of the averaged switch network, is written according to Eq. (14.7):
⟨v1(t)⟩Ts = d′(t)
d(t)⟨v2(t)⟩Ts (14.39)
Note that v(3, 4) in the subcircuit of Fig.14.18 is equal to the switch network independent input
⟨v2(t)⟩Ts .A l s o ,d(t)= v(5), and d′(t)= 1−d(t)= 1−v(5). The value of the controlled current
source Gd, which models the diode port, is computed according to Eq. (14.8):
⟨i2(t)⟩Ts = d′(t)
d(t)⟨i1(t)⟩Ts (14.40)
The switch network independent input ⟨i1(t)⟩Ts equals the current i(Et) through the controlled
voltage source Et. The .ends line completes the subcircuit netlist.
An advantage of the subcircuit CCM1 of Fig. 14.18 is that it can be used to construct an av-
eraged circuit model for simulation of any two-switch PWM converter operating in continuous
conduction mode, subject to the assumptions that the switches can be considered ideal, and that
the converter does not include a step-up or step-down transformer. The subcircuit can be further
reﬁned to remove these limitations. In converters with an isolation transformer, the right-hand
side of Eqs. (14.39) and (14.40) should be divided by the transformer turns ratio.
A disadvantage of the model in Fig. 14.18 is that Eqs.(14.39) and ( 14.40) have a disconti-
nuity at duty cycle equal to zero. In applications of the subcircuit, it is necessary to restrict the
duty-cycle to the range 0< D
min≤d≤1.

14.3 Simulation of Averaged Circuit Models 569
(a)
+
v2(t)
+
v1(t)
i1(t) i2(t)
1
2
3
45
(b) i2(t) Ts
v2(t) Ts
v1(t) Ts
i1(t) Ts
d
+ +1
2
3
4
5
CCM1
****************************************************************
* Subcircuit: CCM1
* Application: two-switch PWM converters
* Limitations: ideal switches, CCM only, no transformer
****************************************************************
* Parameters: none
****************************************************************
* Nodes:
* 1: transistor positive (drain for an n-channel MOS)
* 2: transistor negative (source for an n-channel MOS)
* 3: diode cathode
* 4: diode anode
* 5: duty cycle control input
****************************************************************
.subckt CCM1 1 2 3 4 5
Et 1 2 value={(1-v(5))*v(3,4)/v(5)}
Gd 4 3 value={(1-v(5))*i(Et)/v(5)}
.ends
****************************************************************
(c)
Fig. 14.18 Averaged switch model CCM1: (a) the general two-switch network; (b) symbol for the aver-
aged switch subcircuit model; (c) SPICE netlist of the subcircuit
14.3.2 Averaged Switch Modeling and Simulation of Conduction Losses
An averaged switch model can be reﬁned to include switch conduction losses. Consider again
the SEPIC of Fig. 14.2. Suppose that the transistor on-resistance is Ron and the diode forward
voltage drop VD are approximately constant. In this example, all other conduction or switching
losses are neglected. Our objective is to derive an averaged switch model that includes conduc-
tion losses caused by the voltage drops acrossRon and VD. Let us deﬁne the switch network as in

570 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
Ron(iL1 + iL2)
t
v2(t)
dTs Ts
0
0
v2(t) T2
vC1 + vC2 Ron(iL1 + iL2)
t
v1(t)
dTs Ts
0
0
v1(t) Ts
vC1 + vC2 D
VD
Fig. 14.19 The switch network terminal voltages v1(t)a n d v2(t) for the case when the transistor on-
resistance is Ron and the diode forward voltage drop is VD
Fig. 14.4a. The waveforms of the switch network terminal currents are the same as in Fig. 14.3,
but the voltage waveforms are aﬀected by the voltage drops across Ron and VD as shown in
Fig. 14.19. We select i1(t) and v2(t) as the switch network independent inputs, as in Sect.14.1.1.
The average values of v1(t) and v2(t) can be found as follows:
⟨v1(t)⟩Ts = d(t)Ron
⎦⟨iL1(t)⟩Ts +⟨iL2(t)⟩Ts
)+ d′(t) ⎦⟨vC1(t)⟩Ts +⟨vC2(t)⟩TS + VD
) (14.41)
⟨v2(t)⟩Ts = d(t) ⎦⟨vC1(t)⟩Ts +⟨vC2(t)⟩Ts −Ron
⎦⟨iL1(t)⟩Ts +⟨iL2(t)⟩Ts
))+ d′(t)(−VD) (14.42)
Next, we proceed to eliminate⟨iL1(t)⟩Ts,⟨iL2(t)⟩Ts,⟨vC1(t)⟩Ts , and⟨vC2(t)⟩Ts , to write the above
equations in terms of the averaged independent terminal currents and voltages of the switch
network. By combining Eqs. (14.41) and (14.42), we obtain:
⟨v
C1(t)⟩Ts +⟨vC2(t)⟩Ts =⟨v1(t)⟩Ts +⟨v2(t)⟩Ts (14.43)
Since the current waveforms are the same as in Fig.14.3,E q .(14.5) can be used here:
⟨iL1(t)⟩TS +⟨iL2(t)⟩Ts =⟨i1(t)⟩TS
d(t) (14.44)
Substitution of Eqs. (14.43) and (14.44) into Eq. (14.41) results in:
⟨v1(t)⟩Ts = Ron⟨i1(t)⟩Ts + d′(t)(⟨v1(t)⟩Ts +⟨v2(t)⟩Ts + VD) (14.45)
Equation (14.45) can be solved for the voltage⟨v1(t)⟩Ts :
⟨v1(t)⟩Ts = Ron
d(t)⟨i1(t)⟩TS + d′(t)
d(t)
⎦⟨v2(t)⟩Ts + VD
) (14.46)

14.3 Simulation of Averaged Circuit Models 571
The expression for the averaged current⟨i2(t)⟩Ts is given by Eq. (14.8) derived in Sect. 14.1.2:
⟨i2(t)⟩Ts = d′(t)
d(t)⟨i1(t)⟩Ts (14.47)
Equations (14.46) and (14.47) constitute the averaged terminal relations of the switch network.
An equivalent circuit corresponding to these relationships is shown in Fig. 14.20. The genera-
tors that depend on the transistor duty cycle d(t) are combined into an ideal transformer with
the turns ratio d′(t):d(t). This part of the model is the same as in the averaged switch model de-
rived earlier for the switch network with ideal switches. The elements Ron/d and VD model the
conduction losses in the switch network. This is a large-signal, nonlinear model. If desired, this
model can be perturbed and linearized in the usual manner, to obtain a small-signal ac switch
model.
+
v2(t)Ts
i1(t)Ts
+
v1(t)Ts
i2(t)Tsd (t) : d(t)
+
Ron
d(t) VD
Fig. 14.20 Large-signal averaged switch model for the general two-switch network of Fig. 14.17c. This
model includes conduction losses due to the transistor on-resistance Ron and the diode forward voltage
drop VD
14.3.3 Inclusion of Switch Conduction Losses in Simulations
Let us modify the model of Fig. 14.18 to include switch conduction losses. Figure 14.21 shows
simple device models that include transistor and diode conduction losses in the general two-
switch network of Fig. 14.18a. The transistor is modeled as an ideal switch in series with an
on-resistance Ron. The diode is modeled as an ideal diode in series with a forward voltage drop
VD and resistance RD.
Construction of dc equivalent circuits to ﬁnd dc conversion ratio and eﬃciency of convert-
ers is discussed in Chap. 3. Derivation of an averaged switch model that includes conduction
losses arising from Ron and VD is described in Sect. 14.3.2. Following the same averaged switch
modeling approach, we can ﬁnd the following relationships that describe the averaged switch
model for the switch network of Fig. 14.21:
⟨v1(t)⟩Ts =
⎦Ron
d(t)+ d′(t)RD
d2(t)
)
⟨i1(t)⟩Ts + d′(t)
d(t)
⎦⟨v2(t)⟩Ts + VD
) (14.48)
⟨i2(t)⟩Ts = d′(t)
d(t)⟨i1(t)⟩Ts (14.49)

572 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
i1(t) i2(t)
1
2
3
45
+
ideal
switch
ideal
diode
VD
Ron RD
+
v1(t)
+
v2(t)
Fig. 14.21 Switch network model that includes conduction loss elements Ron, VD,a n dRD
A subcircuit implementation of the averaged switch model described by Eqs. (14.48) and (14.49)
i ss h o w ni nF i g .14.22 The subcircuit terminal nodes are the same as in the CCM1 subcircuit:
the transistor port is between the nodes 1 and 2; the diode port is between the nodes 3 and
4; the duty ratio d= v(5) is the control input to the subcircuit at the node 5. Two controlled
voltage sources in series, Er and Et, are used to generate the port 1 (transistor) averaged voltage
according to Eq. (14.48). The controlled voltage source Er models the voltage drop across the
equivalent resistance Ron/d(t)+d′(t)RD/d2(t)i nE q .(14.48). Note that this equivalent resistance
is a nonlinear function of the switch duty cycle d(t). The controlled voltage source Et shows
how the port 1 (transistor) averaged voltage depends on the port 2 (diode) averaged voltage.
The controlled current source Gd models the averaged diode current according to Eq. ( 14.49).
The subcircuit CCM2 has three parameters ( Ron, VD, and RD) that can be speciﬁed when the
subcircuit is used in a converter circuit. The default values of the subcircuit parameters, Ron =
0, VD = 0, and RD = 0, are deﬁned in the .subckt line. These values correspond to the ideal
case of no conduction losses.
The model of Fig. 14.22 is based on the simple device models of Fig. 14.21. It is assumed
that inductor current ripples are small and that the converter operates in continuous conduction
mode. Many practical converters, however, must operate in discontinuous conduction mode at
low duty cycles where the diode forward voltage drop is comparable to or larger than the output
voltage. In such cases, the model of Fig. 14.21, which includes V
D as a ﬁxed voltage generator,
gives incorrect, physically impossible results for polarities of converter voltages and currents,
losses, and eﬃciency.
14.3.4 Example: SEPIC DC Conversion Ratio and Eﬃciency
Let us consider an example of how the subcircuit CCM2 can be used to generate dc conversion
ratio and eﬃciency curves for a CCM converter. As an example, Figure 14.23 shows a SEPIC
averaged circuit model. The converter circuit can be found in Fig.6.39a, or in Fig. 14.2. To con-

14.3 Simulation of Averaged Circuit Models 573
(a) i2(t) Ts
v2(t) Ts
v1(t) Ts
i1(t) Ts
d
+ +1
2
3
4
5
CCM2
(b) **************************************************************
* MODEL: CCM2
* Application: two-switch PWM converters, includes 
* conduction losses due to Ron, VD, RD
* Limitations: CCM only, no transformer
**************************************************************
* Parameters:
* Ron = transistor on-resistance
* VD = diode forward voltage drop
* RD = diode on-resistance
**************************************************************
* Nodes:
* 1: transistor positive (drain for an n-channel MOS)
* 2: transistor negative (source for an n-channel MOS)
* 3: diode cathode
* 4: diode anode
* 5: duty cycle control input
**************************************************************
.subckt CCM2 1 2 3 4 5
+params: Ron=0 VD=0 RD=0
Er 1 1x value={i(Et)*(Ron+(1-v(5))*RD/v(5))/v(5)}
Et 1x 2 value={(1-v(5))*(v(3,4)+VD)/v(5)}
Gd 4 3 value={(1-v(5))*i(Et)/v(5)}
.ends
**************************************************************
Fig. 14.22 Subcircuit implementation of the CCM averaged switch model that includes conduction
losses: (a) circuit symbol; (b) SPICE netlist for the subcircuit
struct the averaged circuit model for simulation, the switch network is replaced by the subcircuit
CCM2. In the converter netlist shown in Fig. 14.23,t h eXswitch line shows how the subcircuit is
connected to other parts of the converter. The switch duty cycle is set by the voltage source Vc.
All other parts of the converter circuit are simply copied to the averaged circuit model. Induc-
tor winding resistances RL1 = 0.5Ωand RL2 = 0.1Ωare included to model copper losses of
the inductors L1 and L2, respectively. The switch conduction loss parameters are deﬁned by the
.param line in the netlist:Ron= 0, VD= 0.8V, RD= 0.05Ω. Notice how these values are passed
to the subcircuit CCM2 in the Xswitch line. In this example, all other losses in the converter are
neglected. A dc sweep analysis (see the .dc line in the netlist) is set to vary the dc voltage source
V
c from 0.1 V to 1 V , in 0.01 V increments, which corresponds to varying the switch duty cycle
over the range from D= 0.1t o D= 1. The range of duty cycles from zero to 0.1 is not covered
because of the model discontinuity problem at D= 0 (discussed in Sect. 14.3.1), and because
the model predictions for conduction losses at low duty cycles are not valid, as discussed in

574 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
(a)
(b)
+
+
4321
5
0
CCM2
Vg
L1
RL1
RL2
L2
C1
C2
Rload
Vc
0.5 
0.1 
100 μF
100 μF
50 
800 μH
100 μH
50 V
+
v
1
2
4
3
5
Ron
VD = 0.8 V
RD = 0.05 
Xswitch
*
.param Ron=0.0 VD=0.8 RD=0.05
* Analysis setup:
.dc lin Vc 0.1 1 0.01
.step lin PARAM Ron 0 1 0.5
* Converter netlist:
Vg 1 0 50V
L1 1 2x 800u
RL1 2x 2 0.5
L2 0 3x 100uH
RL2 3x 3 0.1
C1 2 3 100uF
C2 4 0 100uF
Xswitch 2 0 4 3 5 CCM2
+params: Ron={Ron} VD={VD} RD={RD}
Rload 4 0 50
* Duty cycle input:
Vc 5 0 0.5
Fig. 14.23 SEPIC simulation example: (a) schematic; (b) SPICE netlist
Sect. 14.3.3. The dc sweep analysis is repeated for values of the switch on-resistance in the
range from Ron= 0Ωto Ron= 1Ωin 0.5Ωincrements (see the .step line in the netlist).
Simulation results for the dc output voltage V and the converter eﬃciency ηare shown in
Fig. 14.24. Several observations can be made based on the modeling approach and discussions
presented in Chapter 3. At low duty cycles, eﬃciency drops because the diode forward voltage
drop is comparable to the output voltage. At higher duty cycles, the converter currents increase,
so that the conduction losses increase. Eventually, for duty cycles approaching 1, both the out-
put voltage and the eﬃciency approach zero. Given a desired dc output voltage and eﬃciency,
the plots in Fig. 14.24 can be used to select the transistor with an appropriate value of the on-
resistance.

14.3 Simulation of Averaged Circuit Models 575
(a)
D
V/Vg
0 0.2 0.4 0.6 0.8 1
0
1
2
3
4
5
Ron = 0.5 
Ron = 1 
Ron = 0
(b)
D
0 0.2 0.4 0.6 0.8 1
20%
0%
40%
60%
80%
100%
Ron = 0.5 
Ron = 1 
Ron = 0
Fig. 14.24 SEPIC simulation example: (a) dc conversion ratio; (b)eﬃciency
14.3.5 Example: Transient Response of a Buck–Boost Converter
In addition to steady-state conversion characteristics, it is often of interest to investigate con-
verter transient responses. For example, in voltage regulator designs, it is necessary to verify
whether the output voltage remains within speciﬁed limits when the load current takes a step
change. As another example, during a start-up transient when the converter is powered up, con-
verter components can be exposed to signiﬁcantly higher stresses than in steady state. It is of
interest to verify that component stresses are within speciﬁcations or to make design modiﬁ-
cations to reduce the stresses. In these examples, transient simulations can be used to test for
converter responses.

576 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
+
Switch network
+
v1 v2
+
i1 i2
R
+
v(t)Vg
i(t)
RL
L1
C1
50 μF 20 
0.1 
15 V
15 μH
Fig. 14.25 Buck–boost converter example
Transient simulations can be performed on the converter switching circuit model or on the
converter averaged circuit model. As an example, let us apply these two approaches to investi-
gate a start-up transient response of the buck–boost converter shown in Fig.14.25.
Figure 14.26 shows a switching circuit model of the buck–boost converter. The inductor
winding resistance RL is included to model the inductor copper losses. The MOSFET is mod-
eled as a voltage-controlled switch S q1 controlled by a pulsating voltage source vc. The switch
.model line speciﬁes the switch on-resistance Ron = 50 mΩ, and the switch o ﬀ-resistance
Rof f = 10 MΩ. The switch is on when the controlling voltage vc is greater than Von= 6 V, and
oﬀwhen the controlling voltagevc is less than Vof f = 4 V . The pulsating sourcevc has the pulse
amplitude equal to 10 V . The period isTs= 1/ fs= 10 μs, the rise and fall times aretr= tf = 100
ns, and the pulse width is tp= 7.9 μs. The switch duty cycle is D= (tp+ 0.5(tr+ tf ))/Ts= 0.8.
The built-in nonlinear SPICE model is used for the diode. In the diode .model statement, only
the parameter Is is speciﬁed, to set the forward voltage drop across the diode. The switch and the
diode models used in this example are very simple. Conduction losses are modeled in a simple
manner, and details of complex device behavior during switching transitions are neglected.
Therefore, the circuit model of Fig.14.26 cannot be used to examine switching transitions or
to predict switching losses in the converter. Nevertheless, basic switching operation is modeled,
and a transient simulation can be used to ﬁnd out how the converter waveforms evolve in time
over many switching cycles. Transient simulation parameters are deﬁned by the .tran line: the
output time step is 1μs, the ﬁnal simulation time is 1.2 ms, the output waveforms are generated
from the start of simulation at time equal to zero, and the maximum allowed time step is 1 μs.
The uic (“use initial conditions”) option tells the simulator to start with all capacitor voltages
and inductor currents equal to the speciﬁed initial values. For example, ic=0i nt h eL1 line sets
the initial inductor current to zero. In SPICE, the default initial conditions are always zero, so
that ic=0 statements can be omitted.

14.3 Simulation of Averaged Circuit Models 577
(a)
+ R
+
v(t)
Vg
Sq1 D1
i(t)
RL
L1
C1
50μF2 0
0.1
15V
12 3
4
+vc
5
15μH
(b) Vg 1 0 15V
Sq1 1 2 5 0 switch
D1 3 2 diode 
RL 2 4 0.1
L1 4 0 15uH ic=0
C1 3 0 50uF ic=0
R 3 0 20
Vc 5 0 pulse 
+(0 10V 0us 100ns 100ns 7.9us 10us) 
.model switch vswitch 
+(Ron=0.05 Roff=10meg Von=6V Voff=4V)
.model diode d (Is=1e-12)
.tran 1u 1.2m 0m 1u uic
Fig. 14.26 Buck–boost converter simulation example: ( a) schematic of switching circuit model; ( b)
SPICE netlist
An averaged circuit model of the buck–boost converter is shown in Fig. 14.27. This circuit
model is obtained by replacing the switch network in the converter of Fig. 14.25 by the CCM2
subcircuit. Notice that the circuits and the netlists of Fig. 14.26 and Fig. 14.27 are very simi-
lar. The only diﬀerence is that the switching devices in the converter circuit of Fig. 14.26 are
replaced by the CCM2 subcircuit Xswitch in Fig. 14.27. Also, the pulsating source vc(t)i nt h e
switching circuit is replaced by a constant voltage source vc equal to the switch duty cycle
D= 0.8.
The inductor current and the capacitor voltage waveforms during the start-up transient are
shown in Fig. 14.28. For comparison, the waveforms obtained by transient simulation of the
switching converter circuit shown in Fig.14.26, and by simulation of the averaged circuit model
of Fig. 14.27 are shown. Switching ripples can be observed in the waveforms obtained by sim-
ulation of the switching circuit model. The converter transient response is governed by the
converter natural time constants. Since these time constants are much longer than the switch-
ing period, the converter start-up transient responses in Fig. 14.28 take many switching cycles
to reach the steady state. In the results obtained by simulation of the averaged circuit model,
the switching ripples are removed, but the low-frequency portions of the converter transient re-
sponses, which are governed by the natural time constants of the converter network, match very
closely the responses obtained by simulation of the switching circuit.

578 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
(a)
(b)
+ R
+
v(t)
Vg
i(t)
RL
L1
C1
50μF2 0
0.1
15V
1
2
3
4
+vc
5
15μH
d
CCM2
RD = 0
VD = 0.8 V
Ron = 0.05 
1
2
4
3
5
Xswitch
821
Vg 1 0 15V
Xswitch 1 2 2 3 5 CCM2
+ PARAMS: Ron=0.05 VD=0.8 RD=0
RL 2 4 0.1
L1 4 0 15uH ic=0
C1 3 0 50uF ic=0
R 3 0 20
Vc 5 0 0.8
.tran 10u 1.2m 0m 10u uic
Fig. 14.27 Buck–boost converter simulation example: ( a) schematic of averaged circuit model; ( b)
SPICE netlist
Based on the results shown in Fig.14.28, we can see that converter components are exposed
to signiﬁcantly higher current stresses during the start-up transient than during steady state op-
eration. The problem of excessive stresses in the start-up transient is quite typical for switching
power converters. Practical designs usually include a “soft-start” circuit, where the switch duty
cycle is slowly increased from zero to the steady-state value to reduce start-up transient stresses.
This simulation example illustrates how an averaged circuit model can be used in place of a
switching circuit model to investigate converter large-signal transient responses. An advantage
of the averaged circuit model is that transient simulations can be completed much more quickly
because the averaged model is time invariant, and the simulator does not spend time computing
the details of the fast switching transitions. This advantage can be important in simulations of
larger electronic systems that include switching power converters.
Converter averaged circuit models are nonlinear but time-invariant. This brings up another
important advantage of averaged simulation models: SPICE ac simulations can be used to lin-
earize the model numerically, and generate small-signal frequency responses of interest. The ac
simulations can be easily performed over ranges or dc operating points or sets of parameter val-
ues. This is not possible with switching circuit models. Examples of small-signal ac simulations
are given in Chap. 15.

14.4 Summary of Key Points 579
(a)
0
10 A
20 A
30 A
40 A
50 A
60 A
i(t)
t
Waveform obtained by simulation
of the switching circuit model
Waveform obtained by simulation
 of the averaged model
0.2 ms 0.4 ms 0.6 ms 0.8 ms 1 ms 1.2 ms0
(b)
-60 V
-50 V
-40 V
-30 V
-20 V
-10 V
0
10 V
v(t)
Waveform obtained by simulation
of the switching circuit model
Waveform obtained by simulation
 of the averaged model
t
0.2 ms 0.4 ms 0.6 ms 0.8 ms 1 ms 1.2 ms0
Fig. 14.28 Inductor current ( a) and output voltage ( b) waveforms obtained by transient simulation of
the switching converter circuit shown in Fig. 14.26 and by simulation of the averaged circuit model of
Fig. 14.27
14.4 Summary of Key Points
1. The circuit averaging approach to converter modeling requires that the switch elements be
replaced by dependent sources having waveforms identical to those of the actual switches.
The converter waveforms then are averaged, and an averaged equivalent circuit model is
obtained. This approach provides the theoretical basis for averaged switch modeling, in
which the switch network of a converter is replaced by an averaged switch model, resulting
in an averaged converter equivalent circuit.
2. Averaged switch modeling e ﬀectively replaces the switch elements of a CCM converter
with a dc transformer model. A small-signal ac switch model can additionally provide an ac
equivalent circuit for the converter. While these models may acquire a form that is diﬀerent
from those of earlier chapters, the models are equivalent and yield the same predictions of
operating points and small-signal transfer functions.

580 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
3. The averaged switch approach is especially convenient for SPICE-based computer simula-
tion. The switching elements are replaced by an averaged subcircuit. Typically the simula-
tion runs much faster and is less prone to diverge. Models may include losses, dynamics,
and be embedded in a larger system.
4. Indirect power is the portion of the converter input power that is converted to high frequency
by the switch network, temporarily stored in reactive elements, converted back to dc or low
frequency by the switch network, and output to the load. These processes incur ac loss that
may signiﬁcantly impact the converter eﬃciency.
Problems
14.1 Use the circuit averaging to derive the dc and small-signal ac equivalent circuit of the
buck converter with input ﬁlter, illustrated in Fig.2.33. All elements are ideal.
14.2 Circuit averaging of the bridge inverter circuit of Fig.14.29a.
(a)
+
L
C
R
+ v(t)
2
1i(t)
vg(t)
1
2
(b)
+
L
CR
+
v(t)vg(t) +i1(t) v1(t)
Fig. 14.29 Bridge inverter, Problem 14.2:( a) circuit, (b) large-signal averaged model
(a) Show that the converter of Fig. 14.29a can be written in the electrically identical
form shown in Fig. 14.29b. Sketch the waveforms i1(t) and v1(t).
(b) Use the circuit averaging method to derive a large-signal averaged model for this
converter.
(c) Perturb and linearize your circuit model of part (b), to obtain a single equivalent
circuit that models dc and small-signal ac signals in the bridge inverter.
14.3 Use the circuit averaging method to derive an equivalent circuit that models dc and small-
signal ac signals in the buck–boost converter. You may assume that the converter operates
in the continuous conduction mode, and that all elements are ideal.

14.4 Summary of Key Points 581
(a) Give a time-invariant electrically identical circuit, in which the switching elements
are replaced by equivalent voltage and current sources. Deﬁne the waveforms of the
sources.
(b) Derive a large-signal averaged model for this converter.
(c) Perturb and linearize your circuit model of part (b), to obtain a single equivalent
circuit that models dc and small-signal ac signals in the buck–boost converter.
14.4 In a two-switch PWM converter operating in CCM, the transistor switch absorbs dc
power Pdc and delivers ac power Pac = Pdc to the rest of the circuit. On the other hand,
the rectiﬁer switch absorbsPac from the circuit, and deliversPdc. The converter dc output
power Pout can be written in the form
Pout= Pdirect+ Pindirect
where Pindirect equals the ac power Pac processed by the switches. Reference polarities
are selected so that Pout > 0, Pdirect > 0, Pindirect > 0. You may assume that losses can
be neglected. Derive expressions for the output power Pout and for the indirect power
Pindirect as functions of Vg, Iload, and D, and expressions for Pindirect/Pout and Pdirect/Pout
as functions of the dc conversion ratio M= V/Vg for two cases:
a) Buck converter shown in Fig. 4.8.
b) ´Cuk converter shown Fig.2.20.
14.5 Use the averaged switch modeling technique to derive an ac equivalent circuit model for
the buck–boost converter of Fig.7.42:
(a) Replace the switches in Fig. 7.42 with the averaged switch model given in Fig.14.17c.
(b) Compare your result with the model given in Fig. 7.16b. Show that the two models
predict the same small-signal line-to-output transfer function Gvg(s)= ˆv/ˆvg.
14.6 Modify the CCM dc and small-signal ac averaged switch models of Fig.14.17, to account
for MOSFET on-resistance Ron and diode forward voltage drop VD.
14.7 Use the averaged switch modeling technique to derive a dc and ac equivalent circuit
model for the ﬂyback converter of Fig. 7.19. You can neglect all losses and the trans-
former leakage inductances.
(a) Deﬁne a switch network containing the transistor Q1 and the diode D1 as in
Fig. 14.4a. Derive a large-signal averaged switch model of the switch network. The
model should account for the transformer turns ratio n.
(b) Perturb and linearize the model you derived in part (a) to obtain the dc and ac small-
signal averaged switch model. Verify that forn= 1 your model reduces to the model
shown in Fig. 14.4d.
(c) Using the averaged switch model you derived in part (b), sketch a complete dc and
small-signal ac model of the ﬂyback converter. Solve the model for the steady-state
conversion ratio M(D)= V/Vg.
(d) The averaged switch models you derived in parts (a) and (b) could be used in other
converters having an isolation transformer. Which ones?
14.8 An ideal buck converter operates with input voltage Vg, output current Iload, and duty
cycle D. Derive expressions for the output power and for the indirect power, as functions
of Vg, Iload, and D.

582 14 Circuit Averaging, Averaged Switch Modeling, and Simulation
14.9 Ideal buck, boost, and buck–boost converters operate with input voltage Vg, output cur-
rent Iload, and duty cycleD. For each converter, derive expressions for the ratio of indirect
power to output power Pindirect/Pload.
14.10 In the ﬂyback converter of Fig. 7.19, the transistor on-resistance is Ron, and the diode
forward voltage drop is VD. Other losses and the transformer leakage inductances can be
neglected. Derive a dc and small-signal ac averaged switch model for the switch network
containing the transistor Q1 and the diode D1. The model should account for the on-
resistance Ron, the diode forward voltage drop VD, and the transformer turns ratio n.
14.11 In the boost converter of Fig. 14.30a, the v1(t) and i2(t) waveforms of Fig. 14.30ba r e
observed. During the transistor turn-on transition, a reverse current ﬂows through the
diode which removes the diode stored charge. As illustrated in Fig. 14.30b, the reverse
current spike has area−Q
r and duration tr. The inductor winding has resistance RL.Y o u
may neglect all losses other than the switching loss due to the diode stored charge and
the conduction loss due to the inductor winding resistance.
(a)
+
v2(t)
i1(t) i2(t)
+
v1(t)+
L
CVg
iL(t)
+
v(t)
Switch network
ILOAD
(b)
t
Ts
v1(t)
0
tr
dTs
t
0
i1
i2(t)
0
v2 v2
0
i1
Area r
Fig. 14.30 Boost converter and waveforms illustrating reverse recovery of the diode. Averaged switch
modeling in this converter is addressed in Problem 14.11

14.4 Summary of Key Points 583
(a) Derive an averaged switch model for the boost switch network in Fig. 14.30a.
(b) Use your result of part (a) to sketch a dc equivalent circuit model for the boost
converter.
(c) The diode stored charge can be expressed as a function of the current I1 as:
Qr= kq
√
I1
while the reverse recovery timetr is approximately constant. GivenVg= 100 V, D=
0.5, fs = 100 kHz, kq = 100nC/A1/2, tr = 100 ns, RL = 0.1Ω,u s ead cs w e e p
simulation to plot the converter eﬃciency as a function of the load current ILOAD in
the range:
1A≤ILOAD ≤10A
```
