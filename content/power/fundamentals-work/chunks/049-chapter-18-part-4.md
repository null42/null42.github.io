---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第18章part 4 - 18 Current-Programmed Control
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 787-806 > Chunk ID: `chapter-18-part-4`"
---

# 第18章part 4 - 18 Current-Programmed Control

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 787-806  
> Chunk ID: `chapter-18-part-4`

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
18.8 Discontinuous Conduction Mode 785
Small-signal models of DCM CPM converters can be derived by perturbation and lineariza-
tion of the averaged models of Figs.18.47 and 18.49. The results are given in Fig.18.50. Param-
eters of the small-signal models are listed in Tables18.7 and 18.8.
Fig. 18.49 Averaged models of current-programmed DCM converters: (a) buck, (b) boost
The CPM DCM small-signal models of Fig. 18.50 are quite similar to the respective small-
signal models of DCM duty ratio controlled converters illustrated in Figs.15.19 and 15.21.T h e
sole diﬀerences are the parameter expressions of Tables 18.7 and 18.8. Transfer functions can
be determined in a similar manner. In particular, a simple approximate way to determine the
low-frequency small-signal transfer functions of the CPM DCM buck, boost, and buck–boost
converters is to simply let the inductance L tend to zero in the equivalent circuits of Fig. 18.50.
This approximation is justiﬁed for frequencies su ﬃciently less than the converter switching
frequency, because in the discontinuous conduction mode the value of L is small, and hence
the pole and any RHP zero associated with L occur at frequencies near to or greater than the
switching frequency. For all three converters, the equivalent circuit of Fig.18.51 is obtained.
Figure 18.51 predicts that the control-to-output transfer function G
vc(s)i s
Gvc(s)= ˆv
ˆic
⏐⏐
⏐⏐⏐
⏐
ˆv8=0
= Gc0
1+ s
ωp
(18.196)
with
Gc0= f2(R∥r2)
ωp= 1
(R∥r2)C

786 18 Current-Programmed Control
Fig. 18.50 Small-signal models of DCM CPM converters, derived by perturbation and linearization of
Figs. 18.47 and 18.49:( a) buck, (b) boost, (c) buck–boost
The line-to-output transfer function is predicted to be
Gvg(s)= ˆv
ˆvg
⏐⏐⏐
⏐
⏐⏐
ˆic=0
= Gg0
1+ s
ωp
(18.197)
with
Gg0= g2(R∥r2)
If desired, more accurate expressions which account for inductor dynamics can be derived by
solution of the models of Fig. 18.50.
18.9 Average Current-Mode Control
Average current-mode (ACM) control is another popular current programming technique [177,
178]. A block diagram of an average current-mode controlled converter is shown in Fig. 18.52.
A sensed current signal Rf i is compared to a control signalvc= Rf ic, where Rf is the equivalent

18.9 Average Current-Mode Control 787
Table 18.7 Current-programmed DCM small-signal equivalent circuit parameters: input port
Converter g1 f1 r1
Buck 1
R
⎦ M2
1−M
)
⎦
1−ma
m1
)
⎦
1+ ma
m1
) 2 It
Ic
−R
⎦1−M
M2
)
⎦
1+ ma
m1
)
⎦
1−ma
m1
)
Boost −1
R
⎦ M
M−1
)
2 I
Ic
R
M2
⎛⎜⎜
⎜
⎜
⎜⎜⎜
⎜
⎜
⎜
⎝
2−M
M−1+ 2ma/m1
1+ ma
m1
⎞⎟⎟
⎟
⎟
⎟⎟⎟
⎟
⎟
⎟
⎠
Buck–boost 0 2 I
1
Ic
−R
M2
⎦
1+ ma
m1
)
⎦
1−ma
m1
)
Table 18.8 Current-programmed DCM small-signal equivalent circuit parameters: output port
Converter g2 f2 r2
Buck 1
R
⎦ M
1−M
)
⎦ma
m1
(2−M)−M
)
⎦
1+ ma
m1
) 2 I
Ic
R
(1−M)
⎦
1+ ma
m1
)
⎦
1−2M+ ma
m1
)
Boost 1
R
⎦ M
M−1
)
2 I2
Ic
R
⎦M−1
M
)
Buck–boost 2M
R
⎦ma
m1
)
⎦
1+ ma
m1
) 2 I2
Ic
R
Fig. 18.51 Simpliﬁed small-signal model obtained by letting L become zero in Fig. 18.50a,b, or c
current sensing resistance. The error signal is processed by a current loop compensator Gci(s),
which generates the control input vm for a pulse-width modulator. In response, the PWM pro-
duces a switch control signal c(t) with duty cycle d proportional to the PWM control input vm.
One may note that the current control loop shown in Fig.18.52 follows the same basic approach
discussed in Chap. 9, except that the control objective is to regulate a converter current instead

788 18 Current-Programmed Control
+
—
+–
i
Current
sensing
Rf i
vc = Rf ic
Vg
Gci(s)
Current loop
compensator
PWM
c(t)
Converter power stage
+
v
–
v
m
Fig. 18.52 Average current-mode controlled converter
of a converter voltage. Since current sensing and current loop compensator often incorporate
low-pass ﬁltering functions, the current control loop e ﬀectively regulates the average current
⟨i(t)⟩Ts . Ideally,
⟨i(t)⟩Ts = 1
Rf
⟨vc(t)⟩Ts (18.198)
Average current-mode control ﬁnds signiﬁcant application in PWM rectiﬁers and inverters; the
rectiﬁer application is discussed further in Sect. 21.3.1.
18.9.1 System Model and Transfer Functions
To design the current loop compensator Gci(s), it is convenient to represent the system small-
signal model in a block diagram form, as shown in Fig.18.53. The converter duty-cycle control
transfer functions are based on the averaged converter models developed in Chap. 7.F o rt h e
basic converters, these transfer functions are summarized in Tables 18.3, 18.4, 18.5. Applying
the Feedback Theorem to the model in Fig. 18.53 yields an expression for the small-signal
closed-loop response of the current ˆi,
ˆi= 1
Rf
Ti
1+ Ti
ˆvc+ Gig
1
1+ Ti
ˆvg (18.199)
where the current loop gain Ti(s)i s
Ti= Rf Gci
1
VM
Gid (18.200)
The closed-loop control-to-current transfer function is
Gic(s)=
ˆi
ˆvc
⏐⏐
⏐⏐⏐
⏐
ˆvg=0
= 1
Rf
Ti
1+ Ti
= Gic∞
Ti
1+ Ti
(18.201)
where Gic∞= 1/Rf is the ideal closed-loop response of the average current control loop. One
may note that the ideal closed-loop response of the average current control loop is identical

18.9 Average Current-Mode Control 789
Fig. 18.53 Block diagram that models the average current-mode control loop in Fig. 18.52
to the response predicted by the simple model of the current-programmed control discussed
in Sect. 18.1. Designing the current loop compensator Gci(s) amounts to shaping the current
loop gain Ti to achieve a desired crossover frequency fci and stability margins, following the
approaches discussed in Chap. 9.
Compared to CPM control (peak current mode) discussed in Sects. 18.8–18.8, average
current-mode control has several advantages. First, direct control over the average current is
required in some applications such as battery chargers, drivers for light emitting diodes, low-
harmonic rectiﬁers, and grid-tied inverters. Furthermore, low-pass ﬁltering associated with cur-
rent sensing and G
ci implies reduced sensitivity to noise and switching disturbances. Stable
operation can be achieved at any duty ratio without the need for slope compensation by addi-
tion of an artiﬁcial ramp. Limiting the current control signal vc provides a limitation on the
average but not the peak current. As a result, just as in duty-cycle controlled converters, addi-
tional circuitry is usually required to achieve cycle-by-cycle protection against excessive peak
currents during transients or fault conditions in ACM controlled converters.
In many applications, an outer voltage control loop is closed around an ACM controlled con-
verter, as shown in Fig.18.54. In the outer voltage loop, a sensed output voltageHv is compared
to a reference V
re f . The error signal is processed by a voltage loop compensator Gcv to produce
the control signal vc, which serves as the reference for the current control loop. A small-signal
model of the system in Fig. 18.54 is shown in Fig. 18.55.
Application of the Feedback Theorem to the inner current control loop yields the following
expression for the small-signal output voltage as a function of perturbations in vc and vg,
ˆv=
⎦
Gci
1
VM
Gvd
1
1+ Ti
)
ˆvc+
⎦
Gvg(s)−Gig
Gid
Gvd
Ti
1+ Ti
)
ˆvg (18.202)
With the inner current control loop closed, the control-to-output voltage transfer function
Gvc(s)i sg i v e nb y
Gvc(s)= ˆv
ˆvc
⏐⏐⏐⏐
⏐
ˆvg=0
= Gci
1
VM
Gvd
1
1+ Ti
= 1
Rf
Gvd
Gid
Ti
1+ Ti
(18.203)

790 18 Current-Programmed Control
+
—
+–
i
Current
sensing
Rf i
vc = Rf ic
Vg
Gci(s)
Current loop
compensator
PWM
c(t)
Converter power stage
+
v
–
v
m
+–
H
VrefGcv(s)
Voltage loop
compensator
Fig. 18.54 Output voltage control loop closed around an average current-mode controlled converter
Fig. 18.55 Block diagram that models the average current-mode controlled converter with an outer volt-
age control loop as shown in Fig. 18.54
For the purposes of designing the voltage loop compensator, the system block diagram of
Fig. 18.55 can now be simpliﬁed as shown in Fig. 18.56 The voltage loop compensator design
amounts to shaping the voltage loop gain
Tv= HGcvGvc (18.204)
to achieve a desired crossover frequency and stability margins using the techniques discussed
in Chap. 9.
It should be noted that the design of the two-loop system of Fig.18.56 can be approached in
a number of diﬀerent ways. In the approach described above the inner current loop is designed

18.9 Average Current-Mode Control 791
Fig. 18.56 Block diagram that models the outer voltage control loop around an average current-mode
controlled converter
ﬁrst, based on the current loop gain Ti. Next, with the inner current loop closed, the control to
voltage transfer function Gvc(s) is found from Eq. (18.203), and the voltage loop compensator
is designed based on the outer voltage loop gain Tv given by Eq. (18.204). This inner-loop ﬁrst,
outer-loop second design approach is illustrated by an example in the next section.
18.9.2 Design Example: ACM Controlled Boost Converter
An average current-mode controlled boost converter is shown in Fig. 18.57. The current and
voltage control loops follow the block diagram of Fig. 18.54: average inductor current is reg-
ulated in the inner current control loop, and output voltage is regulated in the outer voltage
control loop. The converter operates from Vg = 170 V , and deliversPout = 2 kW of power at
V= 400 V . The switching frequency is fs = 100 kHz, the amplitude of the PWM saw-tooth
ramp is VM = 4 V , and the equivalent current sensing resistance is Rf = 0.25Ω. The voltage
reference is Vre f = 3 V , and the voltage sensing gain isH= Vre f/V= 0.0075. In this example,
the objectives are to design a current loop compensator Gci to attain a crossover frequency of
fci= 10 kHz, or one tenth of the switching frequency, and then to design a voltage loop compen-
sator Gcv so that a crossover frequency of fcv = 1 kHz is obtained in the outer voltage control
loop. Converter losses can be neglected.
At the quiescent dc operating point,
D= 1−Vg
V = 0.575
Ig= I= Pout
Vg
= 11.8A
Vc= Rf I= 2.94 V
A small-signal model of the ACM controlled boost converter is shown in Fig. 18.58.F r o m
Eq. (18.200), the uncompensated current loop gain Tiu, with unity gain compensator Gci= 1, is
Tiu= Rf
VM
Gid(s) (18.205)

792 18 Current-Programmed Control
+
–
+–
+– Vref
H
CR
Gcv(s)
Gci(s) PWM
c(t)
Li
vm
vc = Rf ic
Rf i
Vg
+
v
–
Fig. 18.57 Average current-mode controlled boost converter
Fig. 18.58 Small-signal model of the average current-mode controlled boost converter of Fig.18.57
where the converter duty-cycle to inductor current transfer function Gid(s)i sg i v e nb y
Gid(s)=
ˆi
ˆd
⏐⏐⏐
⏐
⏐⏐
ˆvg=0
= Gid0
1+ s
ωzi
1+ 1
Q
s
ωo
+
⎦s
ωo
)2 (18.206)

18.9 Average Current-Mode Control 793
Fig. 18.59 Uncompensated loop gain for the current-mode controlled boost converter of Fig.18.57
Gid0 = 2V
D′2R= 55.4A →34.9 dbA
fzi= 1
πRC= 121 Hz
fo = D′
2π
√
LC
= 745 Hz
Q= D′R
√
C
L= 12.4→21.8d B
The uncompensated current loop gain is sketched in Fig. 18.59. The low-frequency gain equals
Tiu0= Rf
VM
Gid0= 3.46→10.8 dB (18.207)
Around the target crossover frequency fci = 10 kHz, the magnitude of Tiu rolls oﬀat
−20 dB/dec,
||Tiu||→Tiu0
ω2
o
ωziω= Rf
Lω
V
VM
(18.208)
while the corresponding phase response asymptote equals −90◦. A simple gain (proportional
(P) compensator) would therefore be suﬃcient to achieve the desired crossover frequency with
adequate phase margin. As discussed in Sect. 9.5.2, a lag (PI) compensator o ﬀers a way to
increase the low-frequency loop gain and to achieve perfect dc regulation of the average inductor
current. Furthermore, a pole is typically added in the current loop compensator transfer function
in order to attenuate high-frequency switching ripple, and low-pass ﬁlter the sensed current
signal. A typical ACM current loop compensator transfer function is therefore given by
G
ci(s)= Gcm
1+ ωz
s
1+ s
ωp
(18.209)
and the compensator response is sketched in Fig. 18.60.

794 18 Current-Programmed Control
Fig. 18.60 Magnitude and phase responses of the current loop compensator
The compensator zero is placed below the target crossover frequency ( fzi < fci), while the
pole is placed above the crossover frequency (fp> fci). Using Eq. (18.208), gain Gcm is selected
so that the loop gain magnitude equals 1 (0 dB) at the target crossover frequency fci,
Gcm
Rf
Lωci
V
VM
= 1 (18.210)
Hence,
Gcm= Lωci
Rf
VM
V = 0.63 (18.211)
The phase margin can be found by adding contributions of the pole at zero of the PI compensator
(−90◦), the quadratic pole and zero inGid (approximately−90◦), as well as the compensator zero
at fz and the pole at fp,
ϕm= 180◦+∠Ti( jωci)= 180◦−90◦−90◦+ tan−1
⎦fci
fz
)
−tan−1
⎦fci
fp
)
(18.212)
Al o w e rfz contributes to a higher phase margin at the expense of reduced loop gain magnitude
at frequencies below fci. A higher fp contributes to a higher phase margin at the expense of
reduced attenuation of the switching ripple by the compensator. Choosing, somewhat arbitrarily,
fz= fci/2.5= 4 kHz and fp= 2.5 fci= 25 kHz, results in the phase margin of
ϕm= 68◦−22◦= 46◦ (18.213)
Magnitude and phase responses of the compensated current loop gain are shown in Fig. 18.61,
conﬁrming that the compensator in Eq. (18.209) with Gcm= 0.63, fz= 4 kHz, and fp= 25 kHz
meets the design objectives.
The closed-loop control-to-current transfer function Gic found using Eq. (18.201) has mag-
nitude and phase responses shown in Fig. 18.62. At low frequencies, the closed-loop response
follows the ideal gain Gic∞= 1/Rf .G i v e nϕm = 46◦, the closed-loop transfer function exhibits
a peaked response at frequencies near the crossover frequency fci, which is consistent with the
discussion in Sect. 9.4.3.

18.9 Average Current-Mode Control 795
Fig. 18.61 Compensated loop gain for the average current-mode controlled boost converter of Fig.18.57
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
-40
-20
0
20 Magnitude [dB]
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
-180
-135
-90
-45
0 Phase [deg]
1/Rf
||Gic||
∠Gic
Fig. 18.62 Closed-loop control-to-current response in the average current-mode controlled boost con-
verter of Fig. 18.57

796 18 Current-Programmed Control
Fig. 18.63 Closed-loop control-to-output voltage response in the average current-mode controlled boost
converter of Fig.18.57
Fig. 18.64 Loop gain in the voltage control loop around the average current-mode controlled boost con-
verter of Fig. 18.57
The next step is to design a voltage loop compensator Gcv to attain a crossover of fcv in the
outer voltage control loop. The design is based on the block diagram of Fig.18.54, where Gvc is
the closed-loop control-to-output voltage transfer function found from Eq. (18.203) and shown
in Fig. 18.63. At frequencies well below the current loop crossoverfci, Gvc can be approximated

18.9 Average Current-Mode Control 797
as
Gvc≈1
Rf
Gvd
Gid
= D′R
2Rf
1− s
ωz,RHP
1+ s
ωzi
(18.214)
fz,RHP = D′2R
2πL = 9.2k H z
fzi= 1
πRC= 121 Hz
The magnitude and phase responses of the completeGvc from Eq. (18.203) and the approximate
Gvc from Eq. (18.214)a r es h o w ni nF i g .18.63. In cases when fcv << fci, i.e., when the voltage
loop is designed conservatively, the design of the voltage loop compensator Gcv can be based
on the approximate Gvc from Eq. (18.214). Since Gvc has a dominant pole at fzi and behaves
as a single-pole transfer function around the target voltage loop crossover of fcv = 1k H z ,i ti s
suﬃcient to consider a simple PI compensator
Gcv(s)= Gvm
⎦
1+ ωzv
s
)
(18.215)
where Gvm can be found from Eq. (18.204) to attain the desired crossover frequency fcv,
Gvm= 2πfcvCR f
D′H = 16.4 (18.216)
and fzv can be selected to achieve a tradeoﬀbetween phase margin and the magnitude of Tv at
frequencies below fcv. Selecting
fzv= fcv
3 = 333 Hz (18.217)
results in the voltage loop phase margin of
ϕmv≈180◦−90◦−90◦+ tan−1 fcv
fzv
= 72◦ (18.218)
The resulting voltage loop gain is shown in Fig.18.64.
The two-step design process illustrated by the example above is relatively simple: the inner
current loop is designed ﬁrst, followed by the voltage loop design. In both loops around ACM
controlled converters, simple PI compensators are typically suﬃcient to achieve desired regula-
tion bandwidths with adequate stability margins. In the ACM controlled boost design example,
we followed a conservative approach where the outer voltage loop crossover frequency fcv is
set to be well below the current loop crossover frequency fci. This approach, while commonly
applied in practice, is not necessarily the only available option. Depending on application and
regulation bandwidth requirements, other approaches can be pursued in two-loop systems.

798 18 Current-Programmed Control
18.10 Summary of Key Points
1. In current-programmed control, the peak switch current is(t) follows the control input ic(t).
This widely used control scheme has the advantage of a simpler control-to-output transfer
function. The line-to-output transfer functions of current-programmed buck converters are
also reduced.
2. The basic current-programmed controller is unstable when D> 0.5, regardless of the con-
verter topology. The controller can be stabilized by addition of an artiﬁcial ramp having
slope ma. When ma> 0.5m2, then the controller is stable for all duty cycles.
3. The behavior of current-programmed converters can be modeled in a simple and intuitive
manner by the ﬁrst-order approximation⟨iL(t)⟩TS ≈ic(t). The averaged terminal waveforms
of the switch network can then be modeled simply by a current source of value ic, in con-
junction with a power sink or power source element. Perturbation and linearization of these
elements leads to the small-signal model. Alternatively, the small-signal converter equa-
tions derived in Chap. 7 can be adapted to cover the current-programmed mode, using the
simple approximation iL(t)≈ic(t).
4. The simple model predicts that one pole is eliminated from the converter line-to-output
and control-to-output transfer functions. Current programming does not alter the transfer
function zeroes. The dc gains become load-dependent.
5. The more accurate model of Sect. 18.3 correctly accounts for the diﬀerence between the av-
erage inductor current⟨i
L(t)⟩Ts and the control input ic(t). This model predicts the nonzero
line-to-output transfer function Gvg(s) of the buck converter. The current-programmed con-
troller behavior is modeled by a block diagram, which is appended to the small-signal
converter models derived in Chap. 7. Analysis of the resulting multiloop feedback system
Sect. 18.4 then leads to the relevant transfer functions derived.
6. The more accurate model predicts that the inductor pole occurs at the crossover frequency
fc of the eﬀective current feedback loop gainTi(s). The frequency fc typically occurs in the
vicinity of the converter switching frequency fs. The more accurate model also predicts that
the line-to-output transfer function Gvg(s) of the buck converter is nulled whenma= 0.5m2.
7. The more accurate averaged CPM model of Sect. 18.3 can be implemented as a SPICE
subcircuit, as shown in Sect. 18.5. The averaged CPM model can then be combined with
averaged switch models of Chap.14 to construct averaged circuit models suitable for SPICE
simulations.
8. A converter system incorporating current-programmed control often includes an outer volt-
age feedback loop, the purpose of which is to regulate the converter output voltage. Since
current programming results in simpler control-to-output dynamics, wide-bandwidth out-
put voltage control can usually be obtained without the use of compensator lead networks,
as discussed in Sect. 18.6.
9. Current-programmed converters operating in the discontinuous conduction mode are mod-
eled in Sect. 18.8. The averaged transistor waveforms can be modeled by a power sink,
while the averaged diode waveforms are modeled by a power source. The power is con-
trolled by i
c(t). Perturbation and linearization of these averaged models, as usual, leads to
small-signal equivalent circuits.
10. Neither the simple model of Sect. 18.1, which neglects inductor dynamics, nor the more
accurate model of Sect. 18.3, which implies a single-pole response at high frequencies,
predicts current-programmed instability or the need for the artiﬁcial ramp discussed in

18.10 Summary of Key Points 799
Sect. 18.2. Section 18.7 explains high-frequency dynamics of current-programmed con-
verters using sampled-data modeling techniques. The sampled-data model shows how the
control-to-current frequency response exhibits peaking around one half of the switching
frequency if the artiﬁcial ramps slope ma is small, ultimately leading to instability for duty
cycles greater than 0.5 if no artiﬁcial ramp is employed. Addition of artiﬁcial ramp leads
to stable operation, reduced sensitivity to noise, and frequency responses that are well pre-
dicted by the more accurate averaged model of Sect. 18.3.
11. Average current-mode (ACM) control is another popular control technique where an aver-
age current is sensed and controlled using a feedback loop around a duty-cycle controlled
converter. ACM controllers have improved noise immunity, and exhibit stable operation
over wide range of duty cycles as well as relatively simple dynamics. In addition to con-
struction of inner current control loops, ACM controllers are often used in applications that
require direct control over the converter average input or output current, such as battery
chargers, drivers for light emitting diodes, as well as grid-tied rectiﬁers and inverters.
Problems
18.1 A nonideal buck converter operates in the continuous conduction mode, with the values
Vg = 10 V, f2 = 100 kHz, L= 4 μH, C= 75 μF, and R= 0.25Ω. The desired full-load
output is 5 V at 20 A. The power stage contains the following loss elements: MOSFET
on-resistance R
on = 0.1Ω, Schottky diode forward voltage drop VD = 0.5 V, inductor
winding resistance RL= 0.03Ω.
(a) Steady-state analysis: determine the converter steady-state duty cycleD, the inductor
current ripple slopes m1 and m2, and the dimensionless parameter K= 2L/RTs.
(b) Determine the small-signal equations for this converter, for duty-cycle control.
A current-programmed controller is now implemented for this converter. An artiﬁcial
ramp is used, having a ﬁxed slope Ma = 0.5M2, where M2 is the steady-state slope
m2 obtained with an output of 5 V at 20 A.
(c) Over what range of D is the current-programmed controller stable? Is it stable at
rated output?
Note that the nonidealities aﬀect the stability boundary.
(d) Determine the control-to-output transfer function Gvc(s), using the simple approxi-
mation⟨iL(t)⟩Ts ≈ic(t). Give analytical expressions for the corner frequency and dc
gain. Sketch the Bode plot of Gvc(s).
18.2 Use the averaged switch modeling approach to model the CCM boost converter with
current-programmed control:
(a) Deﬁne the switch network terminal quantities as in Fig.14.13a. With the assumption
that⟨iL(t)⟩Ts ≈ic(t), determine expressions for the average values of the switch
network terminal waveforms, and hence derive the equivalent circuit of Fig.18.9a.
(b) Perturb and linearize your model of part (a), to obtain the equivalent circuit of
Fig. 18.13.
(c) Solve your model of part (b), to derive expressions for the control-to-output transfer
function Gvc(s) and the line-to-output transfer function Gvg(s). Express your results
in standard normalized form, and give analytical expressions for the corner frequen-
cies and dc gains.

800 18 Current-Programmed Control
18.3 Use the averaged switch modeling approach to model the CCM ´Cuk converter with
current-programmed control. A ´Cuk converter is diagrammed in Fig.2.20.
(a) It is desired to model the switch network with an ic current source and a dependent
power source or sink, using the approach of Sect. 18.1.2. How should the switch
network terminal voltages and currents be deﬁned?
(b) Sketch the switch network terminal voltage and current waveforms. With the assump-
tion that⟨i1(t)⟩Ts −⟨i2(t)⟩Ts ≈ic(t) (where i1 and i2 are the inductor currents deﬁned
in Fig. 2.20), determine expressions for the average values of the switch network ter-
minal waveforms, and hence derive an equivalent circuit similar to the equivalent
circuits of Fig. 18.9.
(c) Perturb and linearize your model of part (b), to obtain a small-signal equivalent cir-
cuit similar to the model of Fig. 18.10. It is not necessary to solve your model.
18.4 The full-bridge converter of Fig. 6.20a operates with V
g = 320 V, and supplies 1000 W
to a 42 V resistive load. Losses can be neglected, the duty cycle is 0.7, and the switch-
ing period Ts deﬁned in Fig. 6.21 is 10 μsec. L= 50 μH and C = 100 μF. A current-
programmed controller is employed, whose waveforms are referred to the secondary
side of the transformer. In the following calculations, you may neglect the transformer
magnetizing current.
(a) What is the minimum artiﬁcial ramp slope m
a that will stabilize the controller at the
given operating point? Express your result in terms of m2.
(b) An artiﬁcial ramp having the slope ma = m2 is employed. Sketch the Bode plot of
the current loop gain Ti(s), and label numerical values of the corner frequencies and
dc gains. It is not necessary to re-derive the analytical expression for Ti. Determine
the crossover frequency fc.
(c) For ma = m2, sketch the Bode plots of the control-to-output transfer function Gvc(s)
and line-to-output transfer function Gvg(s), and label numerical values of the corner
frequencies and dc gains. It is not necessary to re-derive analytical expressions for
these transfer functions.
18.5 In a CCM current-programmed buck converter, it is desired to minimize the line-to-
output transfer function Gvg(s) via the choice ma = 0.5m2. However, because of com-
ponent tolerances, the value of inductance L can vary by±10% from its nominal value
of 100 μH. Hence, ma is ﬁxed in value while m2 varies, and ma= 0.5m2 is obtained only
at the nominal value ofL. The switching frequency is 100 kHz, the output voltage is 15 V ,
the load current varies over the range 2 to 4 A, and the input voltage varies over the range
22 to 32 V . You may neglect losses. Determine the worst-case (maximum) value of the
line-to-output dc gain G
vg(0).
18.6 The nonideal ﬂyback converter of Fig. 7.19 employs current-programmed control, with
artiﬁcial ramp having slope ma. MOSFET Q1 exhibits on-resistance Ron. All current-
programmed controller waveforms are referred to the transformer primary side.
(a) Derive a block diagram which models the current-programmed controller, of form
similar to Fig.18.24. Give analytical expressions for the gains in your block diagram.
(b) Combine your result of part (a) with the converter small-signal model. Derive a new
expression for the control-to-output transfer function Gvc(s).
18.7 A buck converter operates with current-programmed control. The element values are

18.10 Summary of Key Points 801
Vg= 120 V D= 0.6
R= 10Ω fs= 100 kHz
L= 550 μH C= 100 μF
An artiﬁcial ramp is employed, having slope 0.15 A/μsec.
(a) Construct the magnitude and phase asymptotes of the control-to-output transfer
function Gvd(s) for duty-cycle control. On the same plot, construct the magnitude
and phase asymptotes of the control-to-output transfer function Gvc(s) for current-
programmed control. Compare.
(b) Construct the magnitude asymptotes of the line-to-output transfer functionGvg(s)f o r
duty-cycle control. On the same plot, construct the magnitude asymptotes of the line-
to-output transfer function Gvg−cpm (s) for current-programmed control. Compare.
18.8 A buck–boost converter operates in the discontinuous conduction mode. Its current-
programmed controller has no compensating artiﬁcial ramp: ma= 0.
(a) Derive an expression for the control-to-output transfer function Gvc(s), using the
approximation L≈O. Give analytical expressions for the corner frequency and dc
gain.
(b) Repeat part (a), with the inductor included. Show that, provided the inductor is suﬃ-
ciently small, then the inductor merely adds a high-frequency pole and zero toGvc(s),
and the low-frequency pole derived in part (a) is essentially unchanged.
(c) At the CCM-DCM boundary, what is the minimum value of the RHP zero frequency?
18.9 A current-programmed boost converter interfaces a 3 V battery to a small portable 5 V
load. The converter operates in the discontinuous conduction mode, with constant tran-
sistor on-time t
on and variable oﬀ-time; the switching frequency can therefore vary and
is used as the control variable. There is no artiﬁcial ramp, and the peak transistor current
ic is equal to a ﬁxed value Ic; in practice, Ic is chosen to minimize the total loss.
(a) Sketch the transistor and diode voltage and current waveforms. Determine expres-
sions for the waveform average values, and hence derive a large-signal averaged
equivalent circuit for this converter.
(b) Perturb and linearize your model of part (a), to obtain a small-signal equivalent cir-
cuit. Note that the switching frequency f
s should be perturbed.
(c) Solve your model of part (b), to derive an expression for the low-frequency control-
to-output transfer function Gvf (s)= ˆv(s)/ ˆfs(s). Express your results in standard nor-
malized form, and give analytical expressions for the corner frequencies and dc gains.
You may assume that L is small.
18.10 A current-programmed boost converter is employed in a low-harmonic rectiﬁer system,
in which the input voltage is a rectiﬁed sinusoid: vg(t)= VM| sin(ωt)|. The dc output
voltage is v(t) = V > VM. The capacitance C is large, such that the output voltage
contains negligible ac variations. It is desired to control the converter such that the input
current i
g(t) is proportional to vg(t): ig(t)= vg(t)/Re, where Re is a constant, called the
“emulated resistance.” The averaged boost converter model of Fig. 18.9a suggests that
this can be accomplished by simply letting ic(t) be proportional to vg(t), according to
ic(t)= vg(t)/Re. You may make the simplifying assumption that the converter always
operates in the continuous conduction mode.
(a) Solve the model of Fig. 18.9a, subject to the assumptions listed above, to determine
the power⟨p(t)⟩Ts . Find the average value of⟨p(t)⟩Ts , averaged over one cycle of the
ac input vg(t).

802 18 Current-Programmed Control
(b) An artiﬁcial ramp is necessary to stabilize the current-programmed controller at
some operating points. What is the minimum value of ma that ensures stability at
all operating points along the input rectiﬁed sinusoid? Express your result as a func-
tion of V and L. Show your work.
(c) The artiﬁcial ramp and inductor current ripple cause the average input current to
diﬀer from ic(t). Derive an algebraic expression for ⟨ig(t)⟩Ts , as a function of ic(t)
and other quantities such as ma, vg(t), V, L, and Ts. For this part, you may assume
that the inductor dynamics are negligible. Show your work.
(d) Substitute vg(t)= VM| sin(ωt)| and ic(t)= vg(t)/Re, into your result of part (c), to
determine an expression for ig(t). How does ig(t)d iﬀer from a rectiﬁed sinusoid?
18.11 Figure 18.65 shows a buck converter with a charge controller [ 179]. Operation of the
charge controller is similar to operation of the current-programmed controller. At the
beginning of each switching period, at time t= 0, a short clock pulse sets the SR latch.
The logic high signal at the Q output of the latch turns the power MOSFET on. At the
same time, the logic low signal at theQ output of the latch turns the switchS s oﬀ. Current
Ksis proportional to the power MOSFET current charges the capacitor Cs.A t t= dTs,
the capacitor voltage vq(t) reaches the control input voltage Rf ic, the comparator output
goes high and resets the latch. The logic low signal at the Q output of the latch turns the
power MOSFET oﬀ. At the same time, the logic high signal at the Q output of the latch
turns the switch S s on, which quickly discharges the capacitor Cs to zero.
Fig. 18.65 Buck converter with charge controller, Problem 18.11

18.10 Summary of Key Points 803
In this problem, the converter and controller parameters are: Vg = 24 V, fs = 1/Ts =
100 kHz, L= 60μH, C= 100 μF, R= 3Ω, KsTs/Cs = Rf = 1Ω. You can assume that
the converter operates in continuous conduction mode.
(a) Find expressions for the average values of the switch network terminal waveforms,
and hence derive a large-signal averaged switch model of the buck switch network
with charge control. The control input to the model is the control current ic.T h e
averaged switch model should consist of a current source and a power source. The
switch duty cycle d should not appear in the model.
(b) Using the averaged switch model derived in part (a), ﬁnd an expression for the quies-
cent output voltage V as a function of Vg, Ic, and R.G i v e nIc = 2 A, ﬁnd numerical
values for V, I1, I2, and the duty cycle D. For this quiescent operating point, sketch
the waveforms i1(t), i2(t), and vq(t) during one switching period.
(c) Perturb and linearize the averaged switch model from part (a) to derive a small-
signal averaged switch model for the buck switch network with charge control. Find
analytical expressions for all parameter values in terms of the converter parameters
and the quiescent operating conditions. Sketch the complete small-signal model of
the buck converter with the charge controller.
(d) Solve the model obtained in part (c) to ﬁnd the control-to-output transfer function
G
vc(s)= ˆv/ˆic. At the quiescent operating point found in part (b), construct the Bode
plot for the magnitude ofGvc and label all salient features of the magnitude response.
(e) Comment on advantages charge control may have compared to duty-cycle control or
current-programmed control.
18.12 Figure 18.66 shows a buck converter with a one-cycle controller [ 180]. Operation of
the one-cycle controller is similar to operation of the current-programmed controller. At
the beginning of each switching period, at time t= 0, a short clock pulse sets the SR
latch. The logic high signal at the Q output of the latch turns the power MOSFET on. At
the same time, the logic low signal at the Q output of the latch turns the switch S s oﬀ.
Current Gsv2(t) proportional to the voltagev2(t) charges the capacitorCs.A t t= dTs,t h e
capacitor voltage vs(t) reaches the control input voltage vc, the comparator output goes
high and resets the latch. The logic low signal at theQ output of the latch turns the power
MOSFET oﬀ. At the same time, the logic high signal at the Q output of the latch turns
the switch S s on, which quickly discharges the capacitor Cs to zero.
In this problem, the converter and controller parameters are: Vg = 24 V, fs = 1/Ts =
100 kHz, L= 60 μH, C= 100 μF, R= 3Ω, GsTs/Cs = 1. You can assume that the
converter operates in the continuous conduction mode.
(a) Find expressions for the average values of the switch network terminal waveforms,
and hence derive a large-signal averaged switch model of the buck switch network
with one-cycle control. The control input to the model is the control voltage vc.T h e
switch duty cycle d should not appear in the model.
(b) Using the averaged switch model derived in part (a), ﬁnd an expression for the qui-
escent output voltage V as a function of Vc.G i v e nVc = 10 V, ﬁnd the numerical
values for V, I1, I2, and the duty cycle D. For this quiescent operating point, sketch
the waveforms i1(t), i2(t), and vs(t) during one switching period.

804 18 Current-Programmed Control
Fig. 18.66 Buck converter with one-cycle controller, Problem 18.12
(c) Perturb and linearize the averaged switch model from part (a) to derive a small-signal
averaged switch model for the buck switch network with one-cycle control. Find
analytical expressions for all parameter values in terms of the converter parameters
and the quiescent operating conditions. Sketch the complete small-signal model of
the buck converter with the one-cycle controller.
(d) Solve the model obtained in part (c) to ﬁnd the control-to-output transfer function
G
vc(s)= ˆv/ˆvc, and the line-to-output transfer function Gvg(s)= ˆv/ˆvg. For the qui-
escent operating point found in part (b), sketch the magnitude Bode plots of these
transfer functions, and label all salient features.
(e) Comment on advantages one-cycle control may have compared to duty-cycle con-
trol.
```
