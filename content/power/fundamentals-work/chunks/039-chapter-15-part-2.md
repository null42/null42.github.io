---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第15章part 2 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 609-628 > Chunk ID: `chapter-15-part-2`"
---

# 第15章part 2 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 609-628  
> Chunk ID: `chapter-15-part-2`

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
15.3 Small-Signal AC Modeling of the DCM Switch Network 605
+
+ CR
DCM switch network small-signal ac model
r1 j1dg 1v2 g2v1 j2dr 2 vvˆ ˆ ˆ ˆ ˆ ˆg
Fig. 15.20 Low-frequency ac model obtained by neglecting inductor L dynamics. The buck, boost, or
buck–boost converters can be modeled, by employing the appropriate parameters from Table15.2
inductor L are of questionable validity. The origins, analysis, and more accurate predictions of
high-frequency dynamics of DCM converters are discussed in Sect. 15.5.
A simple approximate way to determine the low-frequency small-signal transfer functions is
to neglect the inductor high-frequency dynamics by simply shorting L in the equivalent circuit
of Fig. 15.19. The simpliﬁed, ﬁrst-order model is shown in Fig. 15.20.
The small-signal switch model can be employed to model other DCM converters, by simply
replacing the transistor and diode with ports 1 and 2, respectively, of the two-port model of
Fig. 15.17b. An alternative approach, which yields more convenient results in the analysis of
the buck and boost converters, is to deﬁne the switch network as illustrated in Figs. 15.21a,b,
respectively. These switch networks can also be modeled using the two-port small-signal equiv-
alent circuit of Fig.15.21c; however, new expressions for the parametersr1, j1, g1, etc., must be
derived. These expressions are again found by linearizing the equations of the averaged switch
network terminal currents.
Table15.2 lists the small-signal parameters for the buck switch network of Fig.15.21a( m i d -
dle row) and for the boost switch network of Fig. 15.21b (bottom row). Insertion of the small-
signal two-port model into the DCM buck and boost converters, together with shorting L to
neglect the inductor high-frequency dynamics, leads to the same equivalent circuits shown in
Fig. 15.20. The model parameters are given in Table15.2.
The control-to-output transfer function G
vd(s) is found by letting ˆvg= 0i nF i g .15.20. Solu-
tion for ˆv then leads to
Gvd(s)= ˆv
ˆd
⏐⏐⏐
⏐
⏐
ˆvg=0
= Gd0⎦
1+ s
ωp
) (15.57)
with
Gd0 = j2(R∥r2)
ωp = 1
(R∥r2)C (15.58)
The line-to-output transfer function Gvg(s) is found by letting ˆd= 0i nF i g .15.20. One then
obtains
Gvg(s)= ˆv
ˆvg
⏐⏐⏐⏐
⏐
⏐
ˆd=0
= Gg0
⎦
1+ s
ωp
) (15.59)

606 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
(a)
+
v2(t)
i1(t) i2(t)
+
v1(t)
(b)
+
v2(t)
i1(t) i2(t)
+
v1(t)
(c)
+ +
vˆ ˆ ˆ1
i1
r1 j1d g1v ˆ
ˆ
2 g2v
ˆ
ˆ ˆ1 j2dr 2 v2
i2
Fig. 15.21 A convenient way to model the switch networks of DCM buck and boost converters: ( a)
deﬁned terminal quantities of the DCM buck switch network, (b) deﬁned terminal quantities of the boost
switch network, (c) two-port small-signal ac model. The model parameters are given in Table15.2
with
Gg0= g2(R∥r2)= M (15.60)
Expressions for Gd0, Gg0, and ωp are listed in Table15.3, for the DCM buck, boost, and buck–
boost converters with resistive loads [15, 135].
The ac modeling approach described in this section is both general and useful. The transistor
and diode of a DCM converter can be simply replaced by the two-port network of Fig. 15.17b,
leading to the small-signal ac model. Alternatively, the switch network can be deﬁned as in
Fig. 15.21a or b, and then modeled by the same two-port network, Fig.15.21c. The small-signal
converter model can then be solved via conventional circuit analysis techniques, to obtain the
small-signal transfer functions of the converter.

15.3 Small-Signal AC Modeling of the DCM Switch Network 607
Table 15.3 Salient features of DCM converter small-signal transfer functions
Converter Gd0 Gg0 ωp
Buck 2V
D
1−M
2−M M 2−M
(1−M)RC
Boost 2V
D
M−1
2M−1 M 2M−1
(M−1)RC
Buck–boost V
D M 2
RC
15.3.1 Example: Control-to-Output Frequency Response of a DCM Boost Converter
As a simple numerical example, let us ﬁnd the small-signal control-to-output transfer function
of a DCM boost converter having the following element and parameter values:
R= 12Ω
L= 5 μH (15.61)
C= 470 μF
fs= 100 kHz
The output voltage is regulated to beV= 36 V . It is desired to determineGvd(s) at the operating
point where the load current is I= 3 A and the dc input voltage is Vg= 24 V .
The eﬀective resistance Re(D) is found by solution of the dc equivalent circuit of Fig.15.16b.
Since the load current I and the input and output voltagesV and Vg are known, the power source
value P is
P= I(V−Vg)= (3 A)(36 V−24 V)= 36 W (15.62)
The eﬀective resistance is therefore
Re=
V2
g
P = (24 V)2
36 W = 16Ω (15.63)
The steady-state duty cycle D can now be found using Eq. (15.37):
D=
√
2L
ReTs
=
√
2(5 μH)
(16Ω)(10 μs)= 0.25 (15.64)
The expressions given in Table15.3 for Gd0 andωp of the boost converter can now be evaluated:
Gd0= 2V
D
M−1
2M−1= 2(36 V)
(0.25)
⎦(36 V)
(24 V)−1
)
⎦
2(36 V)
(24 V)−1
)= 72 V⇒37 dBV
fp= ωp
2π= 2M−1
2π(M−1)RC=
⎦
2(36 V)
(24 V)−1
)
2π
⎦(36 V)
(24 V)−1
)
(12Ω)(470μF)
= 112 Hz (15.65)

608 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
fp
112 Hz
Gd0 37 dBV
f
0
0
⏐⏐⏐ ⏐ Gvd
⏐⏐⏐ ⏐ Gvd
Gvd
0 dBV
20 dBV
40 dBV
60 dBV
Gvd
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 15.22 Magnitude and phase of the control-to-output transfer function, DCM boost example. Solid
lines: function and its asymptotes, approximate single-pole response predicted by the model of Fig. 15.20.
Dashed lines: more accurate response that includes high-frequency inductor dynamics
A Bode diagram of the control-to-output transfer function is constructed in Fig. 15.22.T h e
solid lines illustrate the magnitude and phase predicted by the approximate single-pole model
of Fig. 15.20. The dashed lines are the predictions of the more accurate model discussed in
Sect. 15.5, which include a second pole at f2= 64 kHz and a RHP zero at fz= 127 kHz, arising
from the inductor dynamics. Since the switching frequency is 100 kHz, the accuracy of the
model at these frequencies cannot be guaranteed. Nonetheless, in practice, the lagging phase
asymptotes arising from the inductor dynamics can be observed beginning at f2/10= 6.4k H z .
15.4 Combined CCM/DCM Averaged Switch Simulation Model
All converters containing a diode rectiﬁer operate in discontinuous conduction mode (DCM)
if the load current is suﬃciently low. In some cases, converters are purposely designed to op-
erate in DCM. It is therefore of interest to develop averaged models suitable for simulation of
converters that may operate in either CCM or DCM.
Figure 15.23 illustrates the general two-switch network, and the corresponding large-signal
averaged models in CCM and DCM. The CCM averaged switch model, which is derived in
Sect. 14.1, is an ideal transformer with d′:d turns ratio. In DCM, the large-signal averaged
switch model is a loss-free resistor, as derived in Sect. 15.2. Our objective is to construct a
combined CCM/DCM averaged switch model that reduces to the model of Fig. 15.23ao rt o
the model of Fig. 15.23c depending on the operating mode of the converter. Let us deﬁne an
eﬀective switch conversion ratioμ(t), so that the averaged switch model in both modes has the
same form as in CCM, as shown in Fig.15.24. If the converter operates in CCM, then the switch
conversion ratioμ(t) is equal to the switch duty cycle d(t),
μ= d (15.66)

15.4 Combined CCM/DCM Averaged Switch Simulation Model 609
(a)
+
v2(t)
+
v1(t)
i1(t) i2(t)
(b) i2(t) Ts
+
–
v2(t) Tsv1(t) Ts
i1(t) Ts
+
–
CCM/DCM
averaged switch model
1 – μ : μ
(c) i2(t) Ts
+
–
v2(t) Tsv1(t) Ts
i1(t) Ts
Re(d1)
+
–
p(t) Ts
DCM
averaged switch model
Fig. 15.23 Summary of averaged switch modeling: (a) general two-switch network, (b) averaged switch
model in CCM, and (c) averaged switch model in DCM
If the converter operates in DCM, then the eﬀective switch conversion ratio can be computed so
that the terminal characteristics of the averaged switch model of Fig. 15.24 match the terminal
characteristics of the loss-free resistor model of Fig.15.23c. Matching the port 1 characteristics
gives
⟨v1(t)⟩Ts = 1−μ
μ ⟨v2(t)⟩Ts = Re⟨i1(t)⟩Ts (15.67)
which can be solved for the switch conversion ratioμ,
μ= 1
1+ Re⟨i1(t)⟩Ts
⟨v2(t)⟩Ts
(15.68)

610 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
i2(t) Ts
+
v2(t) Tsv1(t) Ts
i1(t) Ts
+
CCM/DCM
averaged switch model
1 μ : μ
Fig. 15.24 A general averaged switch model using the equivalent switch conversion ratioμ
It can be veriﬁed that matching the port 2 characteristics of the models in Figs.15.23c and 15.24
gives exactly the same result for the eﬀective switch conversion ratio in DCM.
The switch conversion ratioμ(t) can be considered a generalization of the duty cycle d(t)
of CCM switch networks. Based on this approach, models and results developed for converters
in CCM can be used not only for DCM but also for other operating modes or even for other
converter conﬁgurations by simply replacing the switch duty cycle d(t) with the appropriate
switch conversion ratioμ(t)[ 71–74]. For example, if M(d) is the conversion ratio in CCM, then
M(μ), withμgiven by Eq. (15.68), is the conversion ratio in DCM. The switch conversion ratio
in DCM depends on the averaged terminal voltage and current, as well as the switch duty cycle
d through the eﬀective resistance R
e = 2L/d2Ts. If the converter is completely unloaded, then
the average transistor current⟨i1(t)⟩Ts is zero, and the DCM switch conversion ratio becomes
μ= 1. As a result, the dc output voltage attains the maximum possible value V= Vg M(1). This
is consistent with the results of the steady-state DCM analyses in Chap. 5 and Sect. 15.2.
To construct a combined CCM/DCM averaged switch model based on the general averaged
switch model of Fig.15.24, it is necessary to specify which of the two expressions for the switch
conversion ratio to use: Eq. ( 15.66), which is valid in CCM, or Eq. ( 15.68), which is valid in
DCM. At the CCM/DCM boundary, these two expressions must give the same result,μ= d.I f
the load current decreases further, the converter operates in DCM, the average switch current
⟨i1(t)⟩Ts decreases, and the DCM switch conversion ratio in Eq. ( 15.68) becomes greater than
the switch duty cycled. We conclude that the correct value of the switch conversion ratio, which
takes into account operation in CCM or DCM, is the larger of the two values computed using
Eq. (15.66) and Eq. (15.68).
Figure 15.25 shows an implementation of the combined CCM/DCM model as a SPICE sub-
circuit CCM-DCM1. This subcircuit has the same ﬁve interface nodes as the subcircuits CCM1
and CCM2 of Sect. 14.3.1 The controlled sources Et and Gd model the port 1 (transistor) and
port 2 (diode) averaged characteristics, as shown in Fig.15.24. The switch conversion ratioμis
equal to the voltagev(u) at the subcircuit node u. The controlled voltage sourceEu computes the
switch conversion ratio as the greater of the two values obtained from Eqs. (15.66) and (15.68).
The controlled current source Ga, the zero-value voltage source Va, and the resistor Ra form
an auxiliary circuit to ensure that the solution found by the simulator has the transistor and the
diode currents with correct polarities,⟨i1(t)⟩Ts > 0,⟨i2(t)⟩Ts > 0. The subcircuit parameters are
the inductance L relevant for CCM/DCM operation, and the switching frequency fs. The default
values in the subcircuit are arbitrarily set to L= 100μH and fs= 100 kHz.

15.4 Combined CCM/DCM Averaged Switch Simulation Model 611
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
CCM-DCM1
(b) *****************************************************************
* MODEL: CCM-DCM1
* Application: two-switch PWM converters, CCM or DCM
* Limitations: ideal switches, no transformer
*****************************************************************
* Parameters:
* L = equivalent inductance for DCM
* fs = switching frequency
*****************************************************************
* Nodes:
* 1: transistor positive (drain for an n-channel MOS)
* 2: transistor negative (source for an n-channel MOS)
* 3: diode cathode
* 4: diode anode
* 5: duty cycle control input
*****************************************************************
.subckt CCM-DCM1 1 2 3 4 5
+ params: L=100u fs=1E5
Et 1 2 value={(1-v(u))*v(3,4)/v(u)}
Gd 4 3 value={(1-v(u))*i(Et)/v(u)}
Ga 0 a value={MAX(i(Et),0)}
Va a b
Ra b 0 1k
Eu u 0 table {MAX(v(5),
+ v(5)*v(5)/(v(5)*v(5)+2*L*fs*i(Va)/v(3,4)))} (0 0) (1 1)
.ends
*****************************************************************
Fig. 15.25 Implementation of the combined CCM-DCM averaged switch model: (a) schematic symbol,
(b) SPICE netlist
The SPICE subcircuit CCM-DCM1 of Fig. 15.25 can be used for dc, ac, and transient sim-
ulations of PWM converters containing a transistor switch and a diode switch. This subcircuit
is included in the model library switch.lib. It can be modiﬁed further for use in converters with
isolation transformer.
15.4.1 Example: CCM/DCM SEPIC Frequency Responses
As another example, consider the SEPIC of Fig.15.26. According to Eq. (15.39), this converter
operates in CCM if
V
R> 1−D
D
Vg
Re(D) (15.69)

612 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
+
D1
L1
C2
+
v
Q1
C1
L2
R
Vg
RL1
RL2
100 μH
500 μH 47 μF
200 μF
0.02 
0.1 
120 V
D= 0.4
load
fs = 100 kHz
Fig. 15.26 SEPIC example
d
+
L1
C2
+
v
C1
L2
R
Vg
RL1
RL2
100 μH
500 μH 47 μF
200 μF
0.02 
0.1 
120V load
+
vc
1
2
4
3
5
CCM-DCM1
4321
5
0
Xswitch
L = 83.3 ! H
fs = 100 kHz
Fig. 15.27 SEPIC simulation example: averaged circuit model
where Re(D)i sg i v e nb yE q .(15.38). Upon neglecting losses in the converter, one ﬁnds that the
CCM conversion ratio is V
Vg
≈D
1−D (15.70)
When Eqs. (15.38) and (15.70) are substituted into Eq. ( 15.69), the condition for operation in
CCM becomes:
R< 2(L1∥L2)
(1−D)2Ts
= 46Ω (15.71)
Figure 15.27 shows the averaged circuit model obtained by replacing the switch network
with the CCM-DCM1 subcircuit of Fig. 15.25. A part of the circuit netlist is included in

15.4 Combined CCM/DCM Averaged Switch Simulation Model 613
Fig. 15.27. The connections and the parameters of the CCM-DCM1 subcircuit are deﬁned by
the Xswitch line. In the SEPIC, the inductance parameter L= 83.3μH is equal to the parallel
combination of L1 and L2. The voltage source vc sets the quiescent value of the duty cycle to
D= 0.4, and the small-signal ac value to ˆd= 1. Ac simulation is performed on a linearized cir-
cuit model, so that amplitudes of all small-signal ac waveforms are directly proportional to the
amplitude of the ac input, regardless of the input ac amplitude value. For example, the control-
to-output transfer function is Gvd= ˆv/ ˆd, where ˆv= v(4) in the circuit of Fig.15.27a. We can set
the input ac amplitude to 1, so that the control-to-output transfer function Gvd can be measured
directly as v(5). This setup is just for convenience in ﬁnding small-signal frequency responses
by simulation. For measurements of converter transfer functions in an experimental circuit (see
Sect. 8.5), the actual amplitude of the small-signal ac variation ˆd would be set to a fraction of
the quiescent duty cycle D. Parameters of the ac simulation are set by the .ac line in the netlist:
the signal frequency is swept from the minimum frequency of 5 Hz to the maximum frequency
of 50 kHz in 201 points per decade.
Figure 15.28 shows magnitude and phase responses of the control-to-output transfer func-
tion obtained by SPICE ac simulations for two diﬀerent values of the load resistance: R= 40Ω,
for which the converter operates in CCM, and R = 50Ω, for which the converter operates
in DCM. For these two operating points, the quiescent (dc) voltages and currents in the cir-
cuit are nearly the same. Nevertheless, the frequency responses are qualitatively very diﬀerent
in the two operating modes. In CCM, the converter exhibits a fourth-order response with two
pairs of high-Q complex-conjugate poles and a pair of complex-conjugate zeroes. Another RHP
(right half-plane) zero can be observed at frequencies approaching 50 kHz. In DCM, there is
a dominant low-frequency pole followed by a pair of complex-conjugate poles and a pair of
Fig. 15.28 Magnitude and phase responses of the control-to-output transfer function obtained by simu-
lation of the SEPIC example, for two values of load resistance. For R= 50Ω, the converter operates in
DCM (solid lines), and for R= 40Ωthe converter operates in CCM (dashed lines)

614 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
complex-conjugate zeroes. The frequencies of the complex poles and zeroes are very close in
value. High-frequency dynamics contribute additional phase lag at higher frequencies.
In the design of a feedback controller around a converter that may operate in CCM or in
DCM, one should take into account that the crossover frequency, the phase margin, and the
closed-loop responses can be substantially di ﬀerent depending on the operating mode. This
point is illustrated by the example of the next section.
15.4.2 Example: Loop Gain and Closed-Loop Responses of a Buck Voltage Regulator
A controller design for a buck converter example is discussed in Sect. 9.5.4. The converter and
the block diagram of the controller are shown in Fig.9.35. This converter system is designed to
regulate the dc output voltage at V= 15 V for the load current up to 5 A. Let us test this design
by simulation. An averaged circuit model of a practical realization of the buck voltage regulator
described in Sect. 9.5.4 is shown in Fig.15.29. The MOSFET and the diode switch are replaced
by the averaged switch model implemented as the CCM-DCM1 subcircuit. The pulse-width
modulator with V
M = 4 V is modeled according to the discussion in Sect. 7.3 as a dependent
voltage source Epwm controlled by the PWM input voltage vx.T h ev a l u eo fEpwm is equal to
1/VM = 0.25 times the PWM input voltage vx, with a limit for the minimum value set to 0.1
V , and a limit for the maximum value set to 0.9 V . The output of the pulse-width modulator is
the control duty-cycle input to the CCM-DCM1 averaged switch subcircuit. Given the speciﬁed
limits for Epwm, the switch duty cycle d(t) can take values in the range:
Dmin≤d(t)≤Dmax (15.72)
2
1
3
4
5
CCM-DCM1
+
+
+
C2
50 μH
11 k500 μF
Vg
28 V
L
C R
vref
5 V
+12 V
LM324
R1
R2
R3 C3
R4
85 k
1.1 nF2.7 nF
47 k
120 k
vz
yvx
Epwm
VM = 4 V
value = {LIMIT(0.25 vx, 0.1, 0.9)}
+
v
iLOAD321
4
5678
.nodeset v(3)=15 v(5)=5 v(6)=4.144 v(8)=0.536
Xswitch
L = 50 μ
fs = 100 k z
Fig. 15.29 Buck voltage regulator example

15.4 Combined CCM/DCM Averaged Switch Simulation Model 615
where Dmin = 0.1, and Dmax = 0.9. Practical PWM integrated circuits often have a limit
Dmax< 1 for the maximum possible duty cycle. The voltage sensor and the compensator are im-
plemented around an op amp LM324. With very large loop gain in the system, the steady-state
error voltage is approximately zero, i.e., the dc voltages at the plus and the minus inputs of the
op amp are almost the same,
v(5)= v
re f (15.73)
As a result, the quiescent (dc) output voltage V is set by the reference voltage vre f and the
voltage divider comprised of R1, R2, R4:
V R4
R1+ R2+ R4
= vre f = 5 V (15.74)
By setting the ac reference voltage ˆvre f to zero, one can ﬁnd the combined transfer function of
the voltage sensor and the compensator as:
H(s)Gc(s)= ˆvy
ˆv =
R3+ 1
sC3
R1+ R2


1
sC2
(15.75)
This transfer function can be written in factored pole-zero form as
GcmH
⎦
1+ s
ωz
) ⎦
1+ ωL
s
)
⎦
1+ s
ωp
) (15.76)
where
GcmH= R3
R1+ R2
(15.77)
fz= ωz
2π= 1
2πR2C2
(15.78)
fL= ωL
2π= 1
2πR3C3
(15.79)
fp= ωP
2π= 1
2π(R1∥R2) C2
(15.80)
The design described in Sect. 9.5.4 resulted in the following values for the gain and the corner
frequencies:
GcmH= 3.7(1/3)= 1.23, fz= 1.7k H z, fL= 500 Hz, fP= 14.5 kHz (15.81)
Eqs. (15.74) and ( 15.77)t o( 15.81) can be used to select the circuit parameter values. Let us
(somewhat arbitrarily) choose C2 = 1.1 nF. Then, from Eq. (15.78), we have R2 = 85 kΩ, and
Eq. (15.80) yields R1= 11 kΩ.F r o mE q .(15.77) we obtain R3= 120 kΩ, and Eq. (15.79)g i v e s
C3 = 2.7kΩ. Finally, R4 = 47 kΩis found from Eq. (15.74). The voltage regulator design can
now be tested by simulations of the circuit in Fig. 15.29.

616 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
Loop gains can be obtained by simulation using exactly the same techniques described in
Sect. 9.6 for experimental measurement of loop gains [137]. Let us apply the voltage injection
technique of Sect.9.6.1. An ac voltage sourcevz is injected between the compensator output and
the PWM input. This is a good injection point since the output impedance of the compensator
built around the op amp is small, and the PWM input impedance is very large (inﬁnity in the
circuit model of Fig. 15.29). With the ac source amplitude set (arbitrarily) to 1, and no other ac
sources in the circuit, ac simulations are performed to ﬁnd the loop gain as
T(s)= ˆv
y
ˆvx
=−v(6)
v(7) (15.82)
To perform ac analysis, the simulator ﬁrst solves for the quiescent (dc) operating point. The
circuit is then linearized at this operating point, and small-signal frequency responses are com-
puted for the speciﬁed range of signal frequencies. Solving for the quiescent operating point
involves numerical solution of a system of nonlinear equations. In some cases, the numerical
solution does not converge and the simulation is aborted with an error message. In particular,
convergence problems often occur in circuits with feedback, especially when the loop gain at dc
is very large. This is the case in the circuit of Fig. 15.29. To help convergence when the simula-
tor is solving for the quiescent operating point, one can specify approximate or expected values
of node voltages using the .nodeset line as shown in Fig.15.29. In this case, we know by design
that the quiescent output voltage is close to 15 V ( v(3)= 15), that the negative input of the op
amp is very close to the reference (v(5)= 5), and that the quiescent duty cycle is approximately
D= V/V
g= 0.536, so that v(8)= 0.536 V . Given these approximate node voltages, the numeri-
cal solution converges, and the following quiescent operating points are found by the simulator
for two values of the load resistance R:
R= 3Ω, v(3)= 15.2V, v(5)= 5.0V, v(7)= 2.173 V, v(8)= 0.543 V, D= 0.543 (15.83)
R= 25Ω, v(3)= 15.2V, v(5)= 5.0V, v(7)= 2.033 V, v(8)= 0.508 V, D= 0.508 (15.84)
For the nominal load resistance R= 3Ω, the converter operates in CCM, so that D= V/V
g.F o r
R= 25Ω, the same dc output voltage is obtained for a lower value of the quiescent duty cycle,
which means that the converter operates in DCM.
The magnitude and phase responses of the loop gain found for the operating points given
by Eqs. (15.83) and (15.84)a r es h o w ni nF i g .15.30.F o rR= 3Ω, the crossover frequency is
fc = 5.3 kHz, and the phase margin is φM = 47o, very close to the values ( fc = 5k H z, φM =
52◦) that we designed for in Sect. 9.5.4. At light load, for R= 25Ω, the loop gain responses are
considerably diﬀerent because the converter operates in DCM. The crossover frequency drops
to fc= 390 Hz, while the phase margin isφM = 55◦.
The magnitude responses of the line-to-output transfer function are shown in Fig. 15.31,
again for two values of the load resistance,R= 3Ωand R= 25Ω. The open-loop responses are
obtained by braking the feedback loop at node 8, and setting the dc voltage at this node to the
quiescent value D of the duty cycle. For R= 3Ω, the open-loop and closed-loop responses can
be compared to the theoretical plots shown in Fig. 9.45. At 100 Hz, the closed-loop magnitude
response is 0.012⇒−38 dB. A 1 V , 100 Hz variation invg(t) would induce a 12 mV variation
in the output voltage v(t). For R= 25Ω, the closed-loop magnitude response is 0.02⇒−34 dB,

15.4 Combined CCM/DCM Averaged Switch Simulation Model 617
f
0
|| ||T || ||T T
0 dB
20 dB
40 dB
zHk05zHk5zH05zH5 500 Hz
60 dB
R = 3 
T
R = 25 
R = 3 
R = 25 
m = 55 m = 47
fc = 5.3 kHzfc = 390 Hz
Fig. 15.30 Loop gain in the buck voltage regulator example
f
||Gvg ||
0 dB
20 dB
zHk05zHk5zH05zH5 500 Hz
R = 3 
R = 25 
Open loop, d(t) = constant
Closed loop
Fig. 15.31 Line-to-output response of the buck voltage regulator example
which means that the 1 V , 100 Hz variation in vg(t) would induce a 20 mV variation in the
output voltage. Notice how the regulator performance in terms of rejecting the input voltage
disturbance is signiﬁcantly worse at light load than at the nominal load.
A test of the transient response to a step change in load is shown in Fig. 15.32. The load
current is initially equal to 1.5 A, and increases toiLOAD = 5Aa t t= 0.1 ms. When the converter
is operated in open-loop at constant duty cycle, the response is governed by the natural time
constants of the converter network. A large undershoot and long lightly damped oscillations can
be observed in the output voltage. With the feedback loop closed, the controller dynamically
adjusts the duty cycle d(t) trying to maintain the output voltage constant. The output voltage
drops by about 0.2 V , and it returns to the regulated value after a short, well-damped transient.

618 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
0 0.2 ms 0.4 ms 0.6 ms 0.8 ms 1.0 ms 1.2 ms 1.4 ms 1.6 ms 1.8 ms 2.0 ms
0 0.2 ms 0.4 ms 0.6 ms 0.8 ms 1.0 ms 1.2 ms 1.4 ms 1.6 ms 1.8 ms 2.0 ms
0
2 A
4 A
6 A
14 V
15 V
16 V
v
iLOAD
t
Closed loop
Open loop
d(t) = constant
Fig. 15.32 Load transient response of the buck voltage regulator example
The voltage regulator example of Fig. 15.29 illustrates how the performance can vary sig-
niﬁcantly if the regulator is expected to supply a wide range of loads. In practice, further tests
would also be performed to account for expected ranges of input voltages, and variations in
component parameter values. Design iterations may be necessary to ensure that performance
speciﬁcations are met under worst-case conditions.
15.5 High-Frequency Dynamics of Converters in DCM
As discussed in Sect. 15.3, transfer functions of converters operating in discontinuous conduc-
tion mode exhibit a dominant low-frequency pole. To correctly model the high-frequency dy-
namics of DCM converters, the approximation given by Eq. ( 15.5) must be removed, i.e., one
must account for the fact that the ac voltage across the inductor is not zero [130]. In this section,
we show that the high-frequency dynamics of DCM converters are related to the sampling pro-
cess associated with the pulse-width modulator and the nature of the response of the inductor
current to duty-cycle perturbations [136].
Figure 15.33 shows details of steady-state and small-signal perturbed waveforms in a DCM
converter. During the switching period shown, the inductor current ramps up from zero with a
slope m
1, and then ramps down to zero with a slopem2. It is assumed that converter voltages do
not change appreciably so that the slopes m1 and m2 can be considered constant.
The PWM input signal vc(t) has a steady-state dc component Vc and a small-signal ac per-
turbation ˆvc. During the switching period shown in Fig. 15.33, the transistor switch gate-drive
waveform is extended by ˆdTs, where ˆd= ˆvc/VM and VM is the amplitude of the PWM ramp.
Figure 15.33d shows that the perturbation in the transistor gate-drive waveform is a pulse of
length ˆdTs, which occurs at the modulated edge of the gate-drive waveform. As a result, a per-
turbation in the inductor current waveform is observed. It is important to note that the converter
waveforms are unaﬀected by the ac perturbation ˆvc until the modulated (trailing) edge of the

15.5 High-Frequency Dynamics of Converters in DCM 619
Ts
VM
Vc + ˆvc
Vc
iL + ˆiL
iL
m1 m2
ˆdTs
(m1 + m2) ˆdTs
D2Ts
ˆiL
(a)
(b)
(c)
(d)
(e)
t
t
t
t
t
Fig. 15.33 Steady-state and small-signal perturbed waveforms in a DCM converter
gate-drive signal. As shown in Fig. 15.33e, the inductor current ac perturbation is a trapezoidal
pulse starting at the modulated edge of the gate-drive signal and extending over a time interval
approximately equal to D2Ts.
(m1 + m2) ˆdTs
D2Ts
ˆiL
ˆdTsd (t)
t
t
Fig. 15.34 Impulse response of the small-signal perturbed inductor current waveforms in a DCM con-
verter
In the small-signal limit, ˆdTs is very short, and the transitions inˆiL can be neglected. Hence,
as illustrated in Fig.15.34, the response from the perturbation in the gate-drive waveform to the
inductor current perturbation can be viewed as a response from an impulse ˆdTsδ(t) to a pulse of
amplitude (m1+ m2) ˆdTs and length D2Ts. It should be noted that the unit impulse δ(t) occurs
at the modulated edge of the gate-drive waveform. The impulse represents the small-signal
sampling process that occurs at the modulated edge in the pulse-width modulator.

620 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
We are now in a position to explain the nature of the high-frequency dynamics of DCM
converters in frequency domain. Let us derive a control-to-inductor current transfer function
Gic(s)= ˆiL/ˆvc based on the time-domain waveforms shown in Figs. 15.33 and 15.34.I nt h e
derivations, a sampled variable x is denoted by a star, x∗.
In general, given a small-signal perturbation ˆvc(t), the corresponding duty-cycle perturbation
is a sampled variable
ˆd∗(t)= ˆvc(t)
VM
k→+∞∑
k→−∞
δ(t−kTs) (15.85)
The Laplace transform of Eq. (15.85) yields
ˆd∗(s)= 1
VM
1
Ts
k→+∞∑
k→−∞
ˆvc(s−jkωs) (15.86)
whereωs = 2πfs. In time domain, the impulse response of the inductor current perturbation is
shown in Fig. 15.34,
ˆiL= (m1+ m2) ˆdTs (h(t)−h(t−D2Ts)) (15.87)
where h(t) is the unit step function. The small-signal inductor current response resembles the
response of a sample-and-hold to an impulse, i.e., a translation from a sampled variable to
a continuous-time variable. Given the sampled nature of the duty-cycle perturbation, and the
continuous-time nature of the converter states, it is appropriate to refer to the response in
Eq. (15.87)a sa n equivalent hold [77].
The Laplace transform of the impulse response in Eq. (15.87) can be used to ﬁnd the transfer
function of the equivalent hold for the inductor current perturbation:
L
⎦ˆi
L(t)
)
= (m1+ m2) ˆdTs
1−e−sD2Ts
s (15.88)
From (15.86) and (15.88), it follows that
ˆi∗
L(s)= (m1+ m2)Ts
VM
1−e−sD2Ts
s
1
Ts
k→+∞∑
k→−∞
ˆvc(s−jkωs) (15.89)
Given the sampled-data nature of a pulse-width modulated converter, it is not surprising that
the inductor current spectrum consists of an inﬁnite sum of responses to the images of ˆ vc(s).
Since we are interested only in the converter responses at frequencies well below the switching
frequency, a control-to-inductor current "transfer function" can be obtained by retaining only
the low-frequency (k= 0) portion of the spectrum of ˆiL(s),
Gic(s)=
ˆiL
ˆvc
= (m1+ m2)
VM
1−e−sD2Ts
s (15.90)
Note that the transfer function ( 15.90) is not a standard rational function of s. Instead, the
transfer function contains an e−sDTs term, which is a result of the sampling process and the
equivalent hold response illustrated in Fig. 15.34.F r o mE q .(15.90), an approximate rational
transfer function can be obtained using an approximation known as the Padé approximation
[138]. The ﬁrst-order Padé approximation is given by:

15.5 High-Frequency Dynamics of Converters in DCM 621
e−sD2Ts ≈
1−s
ω2
1+ s
ω2
, (15.91)
where
f2=ω2
2π= 1
πD2Ts
= 1
D2
fs
π. (15.92)
Applying (15.91)t o( 15.90) yields an approximate control-to-inductor current transfer function,
including high-frequency dynamics,
Gic(s)≈(m1+ m2)D2Ts
VM
1
1+ s
ω2
(15.93)
where the pole frequency is given by Eq. (15.92). This expression for the high-frequency pole is
general, valid for all basic converters operating in DCM. Since 0< D2< 1, Eq. (15.92) implies
that the high-frequency pole is always greater than approximately one third of the switching
frequency. Taking the steady-state solution forD2 into account, the pole frequency can be found
in terms of the conversion ratio M and the duty cycle D. For the basic converters, the results are
summarized in Table 15.4. Although the derivation in this section has been focused on Gic(s)
only, the same high-frequency pole can be found in all other DCM converter transfer functions.
Table 15.4 High-frequency pole in DCM converter control-to-output transfer functions
Converter High-frequency pole f2
Buck M
D(1−M)
fs
π
Boost M−1
D
fs
π
Buck–boost |M|
D
fs
π
It is important to reiterate that the high-frequency pole in frequency responses is an ap-
proximation to the responses represented by the converter time-domain dynamics illustrated
in Fig. 15.34. In response to a duty-cycle perturbation, the inductor current perturbation is a
pulse of length D2Ts. The longer the equivalent hold pulse, the longer time delay is between
the duty-cycle perturbation and the perturbations in converter waveforms. In frequency domain,
this corresponds to additional phase lag due to a lower frequency f2 in the converter control-to-
output responses. Since the equivalent hold extends over a fraction of a switching period, the
resulting pole f2 is very high, and the additional phase lag can usually be ignored in practice.
The behavior discussed in Sect.8.2.3, leading to the right half-plane zero in frequency responses
of boost or buck–boost CCM converters, is present in DCM converters as well. An increase in
duty cycle, for example, results in the output voltage temporarily moving in the opposite direc-
tion. However, in DCM converters this opposite-direction transient is also limited to a fraction
of a switching period and has essentially no impact on the design or stability of control loops
around DCM converters.

622 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
15.6 Summary of Key Points
1. In the discontinuous conduction mode, the average transistor voltage and current are pro-
portional, and hence obey Ohm’s law. An averaged equivalent circuit can be obtained by re-
placing the transistor with an eﬀective resistor R
e(d). The average diode voltage and current
obey a power source characteristic, with power equal to the power eﬀectively dissipated by
Re. In the averaged equivalent circuit, the diode is replaced with a dependent power source.
2. The two-port lossless network consisting of an e ﬀective resistor and power source, which
results from averaging the transistor and diode waveforms of DCM converters, is called
a loss-free resistor. This network models the basic power-processing functions of DCM
converters, much in the same way that the ideal dc transformer models the basic functions
of CCM converters.
3. The large-signal averaged model can be solved under equilibrium conditions to determine
the quiescent values of the converter currents and voltages. Average power arguments can
often be used.
4. A small-signal ac model for the DCM switch network can be derived by perturbing and
linearizing the loss-free resistor network. The result has the form of a two-porty-parameter
model. The model describes the small-signal variations in the transistor and diode currents,
as functions of variations in the duty cycle and in the transistor and diode ac voltage varia-
tions.
5. To simplify the ac analysis of the DCM buck and boost converters, it is convenient to deﬁne
two other forms of the small-signal switch model, corresponding to the switch networks
of Figs. 15.21a and 15.21b. These models are also y-parameter two-port models, but have
diﬀerent parameter values.
6. The inductor dynamics of the DCM buck, boost, and buck–boost converters occur at high
frequency, above or just below the switching frequency. Hence, in most cases the high-
frequency inductor dynamics can be ignored. In the small-signal ac model, the inductance
L is set to zero, and the remaining model is solved relatively easily for the low-frequency
converter dynamics. The DCM buck, boost, and buck–boost converters exhibit transfer func-
tions containing essentially a single low-frequency dominant pole.
7. The high-frequency dynamics of DCM converters are related to the sampling process asso-
ciated with the pulse-width modulator and the nature of the response of the inductor current
to duty-cycle perturbations.
Problems
15.1 Averaged switch modeling of a ﬂyback converter. The converter of Fig.15.35 operates in
the discontinuous conduction mode. The two-winding inductor has a l: n turns ratio and
negligible leakage inductance, and can be modeled as an ideal transformer in parallel with
primary-side magnetizing inductance Lp.
(a) Sketch the transistor and diode voltage and current waveforms, and derive expressions
for their average values.
(b) Sketch an averaged model for the converter that includes a loss-free resistor network,
and give an expression for Re(d).

15.6 Summary of Key Points 623
+
Lp
+
v
vg
Q1
D11:n
CR
Fig. 15.35 Flyback converter, Problem 15.1
(c) Solve your model to determine the voltage ratio V/Vg in the discontinuous conduction
mode.
(d) Over what range of load current I is your answer of part (c) valid? Express the DCM
boundary in the form I< Icirt(D, Re, Vg, n).
(e) Derive an expression for the small-signal control-to-output transfer function G vd(s).
You may neglect inductor dynamics.
15.2 Averaged switch modeling of a nonisolated Watkins–Johnson converter. The converter
of Fig. 15.36 operates in the discontinuous conduction mode. The two-winding inductor
has a 1:1 turns ratio and negligible leakage inductance, and can be modeled as an ideal
transformer in parallel with magnetizing inductance L.
+ L
+
vvg
Q1
D1
1:1
CR
Fig. 15.36 Watkins–Johnson converter, Problem15.2
(a) Sketch the transistor and diode voltage and current waveforms, and derive expressions
for their average values.
(b) Sketch an averaged model for the converter that includes a loss-free resistor network,
and give an expression for Re(d).
(c) Solve your model to determine the converter conversion ratio M(D)= V/Vg in the
discontinuous conduction mode. Over what range of load currents is your expression
valid?
15.3 Sketch the steady-state output characteristics of the buck–boost converter: plot the output
voltage V vs. the load current I, for several values of duty cycleD. Include both CCM and
DCM operation, and clearly label the boundary between modes.

624 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode
15.4 In the network of Fig. 15.37, the power source waveform p(t)i sg i v e nb y
p(t)= 1000 cos2 377t
The circuit operates in steady state. Determine the rms resistor voltage VR,rms.
+
vR(t)p(t) R
20 
L1
7 mH
L2
7 mH
C1
C2
30 μF
300 μF
Fig. 15.37 Network with a power source, Problem 15.4
15.5 Verify the expressions forGd0 andωp given in Table15.3.
15.6 A certain buck converter operates with an input voltage of Vg = 28 V and an output
voltage of V= 15 V . The load resistance isR= 10Ω. Other element and parameter values
are L= 8μH, C= 220μF, fs= 150kHz.
(a) Determine the value of Re.
(b) Determine the quiescent duty cycle D.
(c) Sketch a Bode plot of the control-to-output transfer function Gvd(s). Label the values
of all salient features. You may neglect inductor dynamics.
15.7 Using the approach of Sect. 15.5, determine the control-to-output transfer function Gvd(s)
of a boost converter. Do not make the approximation L≈0.
(a) Derive analytical expressions for the dc gain Gd0 and the RHP zero frequency ωz,a s
functions of M, Re, D, Vg, L, C, and R.
(b) With the assumption that C is suﬃciently large and that L is suﬃciently small, the
poles of Gvd(s) can be factored using the low- Q approximation. Do so, and express
the two poles as functions of M, D, L, C, and R. Show that the low-frequency pole
matches the expression in Table15.3, and that the high-frequency pole is given by the
expression in Table15.4.
```
