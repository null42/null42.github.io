---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第18章part 3 - 18 Current-Programmed Control
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 767-786 > Chunk ID: `chapter-18-part-3`"
---

# 第18章part 3 - 18 Current-Programmed Control

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 767-786  
> Chunk ID: `chapter-18-part-3`

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
18.5 Simulation of CPM Controlled Converters 765
⟨iL⟩Ts = ic−madTs−m1+ m2
2 dd′Ts (18.139)
Next, the switch duty cycle is found by solving Eq. (18.139). There are many diﬀerent ways the
switch duty cycle can be expressed in terms of other quantities; although mathematically equiv-
alent, these diﬀerent forms of solving for d may result in diﬀerent convergence performance of
the numerical solver in the simulator. One approach is to express d as
d= ic−⟨iL(t)⟩Ts
m1+ m2
2 d′Ts+ maTs
(18.140)
Using Eqs. (18.135), (18.136), (18.137), and (18.138), Eq. (18.140) can be written in the form
d=
2
⎦
⟨vc(t)⟩Ts −Rf⟨iL(t)⟩Ts
)
Rf
Lf s
⎦⟨v1(t)⟩Ts +⟨v2(t)⟩Ts
) d′+ 2Va
(18.141)
This implicit expression (notice thatd is on both sides of the equation) is suitable for implemen-
tation in a SPICE subcircuit model, which is named CPM-CCM. The numerical solver in the
simulator is capable of computing the switch duty cycle d based on Eq. (18.141).
18.5.2 Combined CCM/DCM Simulation Model
Typical inductor current and voltage waveforms of CPM converters operating in discontinuous
conduction mode are shown in Fig. 18.31. The length of the second subinterval is d2(t)Ts.I n
CCM, the second subinterval lasts until the end of the switching cycle,
d2= 1−d (18.142)
t
iL(t)
0
ipk
vL(t)
0
v1(t) Ts
v2(t) Ts
ic
 ma
 m2m1
t
Ts
dTs d2Ts
Fig. 18.31 Current-programmed mode waveforms in discontinuous conduction mode

766 18 Current-Programmed Control
In DCM, the current drops to zero before the end of the switching period. The length of the
second subinterval can be computed from:
d2= ipk
m2Ts
(18.143)
If the converter operates in DCM, d2 computed from Eq. (18.143)i ss m a l l e rt h a n1−d.I ft h e
converter operates in CCM, 1−d is smaller than d2 computed from Eq. (18.143). In general, the
length of the second subinterval can be found as the smaller of the two values computed using
Eqs. (18.142) and (18.143).
In the subcircuit implementation, the length of the second subinterval can therefore be com-
puted as the smaller of the values given by Eqs. (18.142) and (18.143):
d2= min
⎦
1−d, iPk
m2Ts
)
(18.144)
By use of d2 from Eq. (18.144), Eq. (18.141) can be extended to allow for CCM or DCM opera-
tion of a current-programmed converter as follows:
d=
2
⎦
⟨vc(t)⟩Ts (d+ d2)−Rf⟨iL(t)⟩Ts
)
Rf
Lf s
⎦⟨v1(t)⟩Ts +⟨v2(t)⟩Ts
) d2(d+ d2)+ 2Va(d+ d2)
(18.145)
This relationship is valid for both CCM and DCM provided that the second subinterval length
d2 is computed according to Eq. (18.144). Expression (18.145) is used in the implementation of
the combined CCM/DCM subcircuit CPM.
18.5.3 Simulation Example: Frequency Responses of a Buck Converter with
Current-Programmed Control
To illustrate an application of the CPM subcircuit, let us consider the example buck converter
circuit model of Fig. 18.32. To construct this averaged circuit model in SPICE, the switches
are replaced by the CCM-DCM1 averaged switch subcircuit. The control input to the CPM
subcircuit is the independent voltage source vc. Three dependent voltage sources are used to
generate other inputs to the CPM subcircuit. The controlled voltage sourceEi is proportional to
the inductor current iL. The controlled voltage sourceE1 is equal to v(1)−v(3), which is equal to
the voltage⟨v1(t)⟩Ts applied across the inductor during the ﬁrst subinterval when the transistor
is on and the diode is oﬀ. The controlled voltage sourceE2 is equal to v(3), which is equal to the
voltage⟨v2(t)⟩Ts applied across the inductor during the second subinterval when the transistor is
oﬀand the diode is on.
SPICE ac simulations are performed at the quiescent operating point obtained for the dc
value of the control input equal to Vc= 1.4 V . At the quiescent operating point, the switch duty
cycle is D= 0.676, the dc output voltage is V= 8.1 V, and the dc component of the inductor
current is IL= 0.81 A. The converter operates in CCM.
Magnitude and phase responses of the control-to-output transfer functions Gvc(s)= ˆv/ˆvc
and Gvd(s) = ˆv/ ˆd are shown in Fig. 18.33. The duty-cycle to output voltage transfer func-
tion Gvd(s) exhibits the familiar second-order high-Q response. Peaking in the magnitude re-
sponse and a steep change in phase from 0 ◦to−180◦occur around the center frequency of

18.5 Simulation of CPM Controlled Converters 767
2
1
3
4
5
CCM-DCM1
+
+
35 ! H
100 ! F
Vg
12 V
L
C R
vc
+
v
iLOAD
CPM
control current 1 2
d
+ + +
iL RL12 3 4
d
Rf iL v(1) (3) v(3)
0.05 
10 
Rf = 1 
fs = 200 kHz
L = 35 !
Va = 0.6 V
Xcpm
Xswitch
fs = 200 kHz
L = 35 !
Ei E1 E2
Fig. 18.32 CPM buck converter example: averaged circuit model
|| Gvd ||
Gvd
f
0
G
0 dB
20 dB
40 dB
zHk001zHk01zH001zH01 1 kHz
|| G ||
|| Gvc ||
Gvc
Fig. 18.33 Comparison of CPM control with duty-cycle control, for the control-to-output frequency
response of the buck converter example

768 18 Current-Programmed Control
|| Gvg ||
f
0 dB
20 dB
zHk001zHk01zH001zH01 1 kHz
Duty cycle control
d(t) = constant
Current programmed mode
vc(t) = constant
Fig. 18.34 Comparison of CPM control with duty-cycle control, for the line-to-output frequency re-
sponse of the buck converter example
the pair of complex-conjugate poles. In contrast, the CPM control-to-output response has a
dominant low-frequency pole. The phase lag is around−90◦in a wide range of frequencies. A
high-frequency pole contributes to additional phase lag at higher frequencies. The frequency re-
sponses of Fig.18.33 illustrate an advantage of CPM control over duty-cycle control. Because of
the control-to-output frequency response dominated by the single low-frequency pole, it can be
much easier to close a wide-bandwidth outer voltage feedback loop around the CPM controlled
power converter than around a converter where the duty cycle is the control input. Proportional-
plus-integral (PI) controllers are commonly used in current-programmed regulators.
Another advantage of CPM control is in rejection of input voltage disturbances. Line-to-
output frequency responses for duty-cycle control and CPM control in the buck example are
compared in Fig. 18.34. The line-to-output transfer function G
vg(s) for duty-cycle control is
characterized by a dc asymptote approximately equal to the duty cycle D = 0.676. Reso-
nant poles occur at the corner frequency of the L-C ﬁlter. The line-to-output transfer function
Gvg−cpm (s) with current-programmed control is signiﬁcantly reduced, and exhibits more than
30 dB of additional attenuation over the frequencies of interest. It should again be noted that the
transfer functionGvg−cpm (s)i nF i g .18.34 cannot be predicted by the simple models of Sect.18.1;
the more accurate model of Sect. 18.3 must be employed.
It is also interesting to compare the output impedance of the converter with duty-cycle con-
trol versus CPM control. The results are shown in Fig. 18.35. The output impedance plotted
in the ﬁgure includes the load resistance of 10 Ω. For duty-cycle control, the dc asymptote of
the output impedance is dominated by the inductor winding resistance of 0.05Ω. The inductor
becomes signiﬁcant in the vicinity of 200 Hz. At the resonant frequency of the output LC ﬁlter,
signiﬁcant peaking in the output impedance of the duty-cycle controlled converter can be ob-
served. At higher frequencies, the output impedance is dominated by the impedance of the ﬁlter
capacitor, which decreases with frequency.
In the current-programmed converter, the low-frequency impedance is high. It is equal to
the parallel combination of the load resistance and the CPM output resistance. Because of the
lossless damping introduced by CPM control, the series inductor does not a ﬀect the output

18.6 V oltage Feedback Loop Around a Current-Programmed Converter 769
|| Zout ||
f
0 dB
20 dB
zHk001zHk01zH001zH01 1 kHz
Duty cycle control
d(t) = constant
Current programmed mode
vc(t) = constant
Fig. 18.35 Comparison of CPM control with duty-cycle control, for the output impedance of the buck
converter example
impedance. The simple model of Sect. 18.1 predicts that the inductor branch of the circuit is
driven by a current source; this e ﬀectively removes the inﬂuence of the inductor on the out-
put impedance. The plot of Fig. 18.35 was generated using the more accurate; nonetheless, the
output impedance is accurately predicted by the simple model. It can be seen that current pro-
gramming substantially increases the converter output impedance at low frequencies. At high
frequencies the output impedances of the duty-cycle and CPM controlled converters have the
same asymptotes.
18.6 Voltage Feedback Loop Around a Current-Programmed Converter
As shown in Figs. 18.1 and 18.3 a converter system incorporating current-programmed control
often includes an outer voltage feedback loop, the purpose of which is to regulate the converter
output voltage. As discussed in Chap. 9, voltage is sensed and compared to a reference. The
error signal is processed by a voltage loop compensator, which outputs a control signal. In duty-
cycle controlled converters of Chap.9, the control signal is the input to a pulse-width modulator,
which produces a switch control signal with duty ratio proportional to the PWM control input.
In CPM controlled converters, the control signal generated by the voltage loop compensator is
the control input v
c= Rf ic for the CPM controller.
18.6.1 System Model
A complete system model, including the outer voltage loop, is shown in Fig. 18.36. The model
is very similar to the system model in Fig. 9.2 except that the pulse-width modulator model is
replaced by the CPM controller model. For the purpose of designing the voltage loop compen-
sator Gcv(s), it is convenient to make use of the closed-loop transfer functionGvc(s)= ˆv/ˆic of the
CPM controlled converter. A block diagram of the voltage feedback loop is shown in Fig.18.37.

770 18 Current-Programmed Control
Fig. 18.36 Block diagram that models a CPM controlled converter with an outer voltage feedback loop
Fig. 18.37 Model of the outer voltage feedback loop
The design of Gcv(s) amounts to employing the techniques of Chap. 9 to shape the voltage loop
gain
Tv= HGcv(s) 1
Rf
Gvc(s) (18.146)
so that target crossover frequency fcv stability margins are attained.
With the voltage feedback loop closed around a current-programmed converter, the closed-
loop input impedance Zi can be found using the results of Sect. 18.4.4 by application of the
Feedback Theorem. As discussed in Sect. 17.5.2, the closed-loop input admittance Yi = 1/Zi
can be found from:
Yi= 1
Zi
= 1
ZN−cpm
Tv
1+ Tv
+ 1
ZD−cpm
1
1+ Tv
(18.147)
where expressions for ZN−cpm and ZD−cpm are given in Sect. 18.4.4. Following the discussion in
Sect. 17.5.2, the result for the closed-loop input impedance can be used to evaluate the system
stability when the CPM converter with voltage feedback loop includes an input ﬁlter or, more
generally, when it is supplied from a source with a nonzero output impedance.
18.6.2 Design Example
To illustrate an outer voltage feedback loop design, consider the CPM controlled buck converter
shown in Fig.18.32, with the voltage loop added as shown in Fig.18.1. The system small-signal
model is shown in Fig. 18.36. In this example, the reference voltage is V
re f = 3 V , and the

18.6 V oltage Feedback Loop Around a Current-Programmed Converter 771
voltage sensing gain is set to H= 0.375, so that the output dc voltage is ideally regulated at
V= Vre f/H= 8 V . The quiescent operating point and the small-signal model parameters are
approximately the same as in the CPM buck converter considered in Sect. 18.5.3: D= 0.67,
IL= V/R= 0.8A , Ma/M2= 0.525, Fm= 3.2A−1, Fg= 0.016Ω−1, Fv= 0. Table18.3 includes
an expression for the closed-loop control-to-output voltage transfer function Gvc(s) predicted
by the more accurate CPM model,
Gvc(s)= Gc0
1
1+ s
Qcωc
+
⎦s
ωc
)2 ≈Gc0
1⎦
1+ s
ωp1
)⎦
1+ s
ωhf
) (18.148)
Gc0 = V
D
Fm
⎦
1+ FmV
DR
)= 7.92Ω→18 dBΩ
fc= 1
2π
√
LC
√
1+ FmV
DR = 5.9k H z
Qc = R
√
C
L
√
1+ FmV
DR⎦
1+ RCFmV
DL
)= 0.034
fp1 = Qc fc= 201 Hz
fhf = fc/Qc= 174 kHz
As shown in Fig. 18.33, Gvc(s) exhibits a single-pole response over a wide range of frequen-
cies, so that it is relatively easy to design a wide-bandwidth voltage feedback loop with high
crossover frequency fcv using a simple proportional-integral (PI) compensator,
Gcv(s)= Gcm
⎦
1+ ωzv
s
)
(18.149)
A sketch of the magnitude response of the voltage loop gain Tv of Eq. (18.146), with a PI
compensator of Eq. (18.149), is shown in Fig. 18.38. Assuming fzv < fcv < fhf , the magnitude
asymptote has−20 dB/dec slope around the crossover frequency,
||Tv||→H
Rf
GcoGcm
ωp1
ω (18.150)
From Eq. (18.150) it follows that the gain Gcm can be selected to obtain the desired crossover
frequency fcv,
Gcm= Rf
HGco
fcv
fp1
(18.151)
To achieve wide-bandwidth voltage regulation let us choose fcv = 40 kHz = fs/5. Equa-
tion (18.151) yields Gcm = 67.1. The phase margin ϕv can be evaluated based on the phase
contributions of the poles and zeroes shown in Fig. 18.38. Taking into account that fp1 << fcv,
we have
ϕv= 180◦+∠Tv( jω)= 180◦−90◦−90◦+ tan−1 fcv
fzv
−tan−1 fcv
fhf
(18.152)

772 18 Current-Programmed Control
H
R f
Gc0Gcm
ωp1
ω
fp1
fzv
fcv
fhf
||Tv||
0d B
Fig. 18.38 Sketch of the magnitude response of the loop gain Tv using a PI compensator Gcv(s)
Fig. 18.39 Loop gain Tv in the design example of Sect. 18.6.2
For these values, tan−1( fcv/ fhf )= 13◦. Equation (18.152) can be used to select fzv to achieve a
desired phase margin. For example, the choice fzv= fcv/3 yields
ϕv= tan−1 fcv
fzv
−tan−1 fcv
fhf
= 72◦−13◦= 59◦ (18.153)
Inclusion of this PI compensator Gcv(s) results in the voltage loop gain Tv shown in Fig. 18.39.
18.7 High-Frequency Dynamics of Current-Programmed Converters
The simple model of Sect. 18.2 predicts that the inductor current iL is directly controlled by
the current command ic, which implies small-signal control-to-current transfer function equal
to unity at all frequencies,
Gic(s)=
ˆiL
ˆic
≈1 (18.154)

18.7 High-Frequency Dynamics of Current-Programmed Converters 773
Let us compare this simple result with high-frequency predictions of the more accurate averaged
small-signal model of Sect. 18.3. At high frequencies, small-signal perturbations of capacitor
voltages become negligibly small. As a result, ˆm1 ≈0, ˆm2 ≈0, and inductor current slopes m1
and m2 can be considered constant, equal to the unperturbed dc values M1 and M2, respectively.
At high frequencies, the small-signal duty-cycle perturbation in Eq. (18.73) becomes
ˆd(t)≈Fm
[ˆic(t)−ˆiL(t)
]
(18.155)
In a two-switch, single-inductor PWM converter, neglecting voltage perturbations, the duty-
cycle to inductor current transfer function can be written as
Gid=
ˆiL
ˆd
≈M1+ M2
s (18.156)
Combining Eqs. (18.156) and (18.155), the more accurate model of Sect.18.3 yields the follow-
ing prediction for the control-to-current transfer function at high frequencies
Gic(s)=
ˆiL
ˆic
≈ 1
1+ s
ωhf
(18.157)
where
fhf = 1
2πFm(M1+ M2)= M1+ M2
2Ma+ M1−M2
fs
π (18.158)
Note that exactly the same result for the high-frequency pole was found in Eq. ( 18.114). Nei-
ther the simple model, which neglects inductor dynamics, nor the more accurate model, which
implies a single-pole response at high frequencies, predicts instability or the need for the ar-
tiﬁcial ramp discussed in Sect. 18.2. This is because the averaged small-signal models do not
take into account converter switching and modulator sampling processes, which lead to various
discrete-time phenomena in a current-programmed converter. The purpose of this section is to
examine high-frequency dynamics of CPM controlled converters using sampled-data modeling
techniques, and to compare predictions of the sampled-data model to the predictions of the
averaged small-signal models.
18.7.1 Sampled-Data Model
Figure 18.40 shows waveforms in a current-programmed converter in response to a perturbation
ˆi
c in the control current ic, with an initial perturbation in the inductor current iL(t) denoted as
ˆiL[n−1]. At t= DTs, in response to the ˆic and ˆiL[n−1] perturbations, the duty cycle D is
perturbed by ˆd[n] and the inductor current perturbation assumes a new valueˆiL[n] over the next
switching period Ts. Derivation of a sampled-data “transfer function” Gic = ˆiL/ˆic follows the
approach described in [77], which includes taking into account samplingˆic(t) to obtain discrete-
time samples ˆic[n], derivation of a discrete-time relationship betweenˆic[n] and ˆiL[n], and ﬁnding
an equivalent hold transfer function that models the process in which continuous-time inductor
current perturbation ˆiL(t) is obtained from the samples ˆiL[n].

774 18 Current-Programmed Control
Fig. 18.40 Steady-state and perturbed waveforms in a current-programmed converter
First, we note that the Laplace transform of the samples of ˆic(t) equals
1
Ts
k→+∞∑
k→−∞
ˆic (s−jkωs) (18.159)
where ˆic(s) is the Laplace transform of the continuous-time control current ˆic(t).
Next, we proceed to derive a discrete-time relationship between ˆic[n] and ˆiL[n]. Waveform
details around the sampling instant t= DTs are shown in Fig. 18.41. From the geometry of
the waveforms, the next perturbation in the inductor current ˆiL[n] can be found in terms of the
previous perturbation ˆiL[n−1], the duty-cycle perturbation ˆd[n] and the inductor current slopes
m1 and m2,
ˆiL[n]= ˆiL[n−1]+ (m1+ m2) ˆd[n]Ts (18.160)
Similarly, ˆic[n] can be related to ˆiL[n−1], ˆd[n], m1 and ma,
ˆic[n]= ˆiL[n−1]+ (m1+ ma) ˆd[n]Ts (18.161)
Eliminating ˆd[n]f r o mE q s . (18.160) and ( 18.161) yields a discrete-time relationship between
ˆic[n] and ˆiL[n],
ˆiL[n]= αˆiL[n−1]+ (1−α )ˆic[n] (18.162)
where the coeﬃcient α depends on the inductor current and artiﬁcial ramp slopes,
α=−m2−ma
m1+ ma
(18.163)

18.7 High-Frequency Dynamics of Current-Programmed Converters 775
m1
−ma
−m2
ˆiL[n − 1]
ˆiL[n]
iL(t) + ˆiL(t)
m1 −m2
ˆic[n]
ic(t) + ˆic(t)
ic(t)
−ma
ˆd[n]Ts
Fig. 18.41 Details of the steady-state and perturbed inductor current waveforms around the sampling
instant t= DTs
which is the same as Eq. (18.54) used in the stability analysis of Sect. 18.2.
Application of theZ transform [176]t oE q .(18.162) results in
ˆiL(z)= αˆiL(z)z−1+ (1−α )ˆic(z) (18.164)
which yields the discrete-timeZ-domain transfer function
Gic(z)=
ˆiL(z)
ˆic(z)
= 1−α
1−α z−1 (18.165)
A discrete-time system is stable if all poles lie inside the unit circle in the complex z plane.
Given that the transfer function Gic(z) has a pole at z= α , the stability condition becomes
| α|< 1 (18.166)
which is the same as the stability condition given by Eq. (18.55).
As shown in Fig. 18.40, in response to a discrete-time perturbation ˆiL[n], the continuous-
time inductor current perturbation ˆiL(t) is a pulse of amplitude ˆiL[n] and length Ts. The transfer
function of the corresponding equivalent hold is therefore equal to the transfer function of the
zero-order hold [176],
1−e−sTs
s (18.167)
We now can combine Eqs. (18.165) and (18.167) to derive an expression for the sampled-data
“transfer function”
Gic(s)=
ˆiL
ˆic
= 1−α
1−α e−sTs
1−e−sTs
sTs
(18.168)
The ﬁrst part of the expression is obtained from Eq. (18.165) by replacing z−1 with e−sTs , which
follows from the fact that a factor z−1 corresponds to delaying a signal by Ts, while the Laplace
transform of a signal delayed by Ts equals e−sTs times the Laplace transform of the signal. The
second part of the expression is the transfer function of the equivalent hold in Eq. ( 18.167),
while Ts in the denominator is due to sampling and retaining only the low-frequency ( k= 0)
portion of the spectrum of the sampled control input ˆic(t)i nE q .(18.159).

776 18 Current-Programmed Control
1 kHz 10 kHz 100 kHz
-40
-20
0
20 Magnitude [dB]
1 kHz 10 kHz 100 kHz
-180
-135
-90
-45
0
 Phase [deg]
Fig. 18.42 High-frequency magnitude and phase responses of Gic based on the sampled-data model for
four values of the artiﬁcial ramp slope, Ma/M2= 0.1, 0.5, 1 and 5
To illustrate magnitude and phase responses of the sampled-dataGic(s)i nE q .(18.168), con-
sider a buck converter example operating at fs = 100 kHz and D= 0.5. The input dc voltage
is Vg = 10 V , the output voltage is V= DVg = 5 V , and inductance is L= 5 μH. Values of
the output ﬁlter capacitance and load do not aﬀect high-frequency control-to-inductor current
responses. The inductor current slopes are M1= (Vg−V)/L= 1A/μs, and M2= V/L= 1A/μs.
Since D= 0.5, the CPM controlled converter is stable for any Ma > 0. Magnitude and phase
responses of the sampled-dataGic(s) are evaluated by replacings→jωin Eq. (18.168), and the
results are shown in Fig.18.42 for four diﬀerent values of the artiﬁcial ramp slope,Ma/M2= 0.1,
0.5, 1, and 5. In all cases, the magnitude responses start from 0 dB and phase responses start
from 0◦, matching the responses expected based on the simple averaged small-signal model.
For Ma/M2 = 0.1, α =−0.82, and the sampled-data frequency response exhibits peaking in
the magnitude response and a sharp decline in the phase response from 0 ◦to−180◦around
fs/2= 50 kHz. For Ma = 0, which corresponds to the period-doubling stability boundary, one
may verify that the magnitude response goes to ∞at fs/2. The peaking in the magnitude re-
sponse diminishes with increasing values of the artiﬁcial ramp slope. For very large Ma/M2,
such as Ma/M2= 5i nF i g .18.42, the magnitude response starts to roll oﬀat a lower frequency,
implying an eﬀectively reduced current control bandwidth.
18.7.2 First-Order Approximation
It can be veriﬁed that the predictions of the sampled-data model of Eq. ( 18.168) match ex-
perimentally measured frequency responses very well. However, the “transfer function” of
Eq. (18.168) is not a standard rational transfer function in s, and it does not oﬀer an intuitive
design-oriented interpretation. It is therefore of interest to consider a rational transfer function
approximation of G
ic(s)i nE q . (18.168). Consider the ﬁrst-order Padé approximation [ 138]o f
the term e−sTs ,

18.7 High-Frequency Dynamics of Current-Programmed Converters 777
e−sTs ≈
1−s
ωs/π
1+ s
ωs/π
(18.169)
Note that the approximation includes a RHP zero and a pole at the same frequency fs/π.
The magnitude response of the approximation is equal to 1 (0 dB) at all frequencies, exactly
matching the magnitude response of e−jωTs at all frequencies. Substituting Eq. ( 18.169)i n t o
Eq. (18.168) yields a ﬁrst-order rational transfer function approximation
Gic(s)≈ 1
1+ s
ωhf
(18.170)
where
fhf = 1−α
1+ α
fs
π= M1+ M2
2Ma+ M1−M2
fs
π (18.171)
which is identical to the frequency response Gic(s) predicted by the more accurate averaged
small-signal model given by Eq. ( 18.157). It follows that the more accurate averaged small-
signal model of Sect. 18.3 is equivalent to the ﬁrst-order approximation of the sampled-data
model.
Figure 18.43 compares the magnitude and phase responses of the sampled-data model
in Eq. ( 18.168) to the magnitude and phase responses of the ﬁrst-order approximation in
Eq. (18.170) or, equivalently, Eq. ( 18.157), for the same buck converter example considered
in Fig. 18.42, and for three values of the artiﬁcial ramp slope, Ma/M2 = 0.1, 0.5, and 5. For
Ma/M2= 0.1, the ﬁrst-order approximation predicts a pole at 3.2 fs, which is a very poor approx-
imation to the sampled-data model predictions. The high-frequency predictions of the ﬁrst-order
1 kHz 10 kHz 100 kHz
-40
-20
0
20 Magnitude [dB]
1 kHz 10 kHz 100 kHz
-180
-135
-90
-45
0 Phase [deg]
Fig. 18.43 Comparison of high-frequency Gic responses based on the sampled-data model and its ﬁrst-
order approximation for three diﬀerent values of the artiﬁcial ramp slope, Ma/M2 = 0.1, 0.5, and 5. The
ﬁrst-order approximation responses are identical to the predictions of the more accurate CPM model

778 18 Current-Programmed Control
approximation improve with increasing slope of the artiﬁcial ramp. For Ma = 0.5M2, which is
a practical choice that guarantees stability for any duty cycle D, the example of Fig. 18.43 il-
lustrates a very good match up to around fs/5. For large Ma/M2, such as Ma/M2 = 5, the
magnitude and phase responses of the ﬁrst-order approximation or, equivalently, the more accu-
rate averaged small-signal model, are in very good agreement with the sampled-data model at
essentially all frequencies of interest.
18.7.3 Second-Order Approximation
As discussed in the previous subsection, the ﬁrst-order approximation does not predict CPM
instability and it does not oﬀer accurate predictions of high-frequency responses in cases when
a current-programmed converter operates close to the stability boundary. In this section, we
show how a second-order rational transfer function approximation o ﬀers a way to accurately
incorporate sampled-data eﬀects. The second-order Padé approximation [138]o ft h et e r me
−sTs
is given by
e−sTs ≈
1−π
2
s
ωs/2+
⎦ s
ωs/2
)2
1+π
2
s
ωs/2+
⎦ s
ωs/2
)2 (18.172)
The second-order approximation includes a pair of RHP zeroes and a pair of poles having the
same Q factor and the same center frequency fs/2. As in the case of the ﬁrst-order approxima-
tion, the magnitude response of the approximation is 1 (0 dB) at all frequencies. Substituting
Eq. (18.172) into Eq. (18.168), yields a second-order rational transfer function approximation
Gic(s)≈ 1
1+π
2
1+ α
1−α
s
ωs/2+
⎦ s
ωs/2
)2 (18.173)
or
Gic(s)≈ 1
1+ 1
Qhf
s
ωs/2+
⎦ s
ωs/2
)2 (18.174)
where the Q-factor of the pair of poles in Gic(s)i s
Qhf = 2
π
1−α
1+ α = 2
π
M1+ M2
2Ma+ M1−M2
= 2
π
1
1−2D+ 2D Ma
M2
(18.175)
and the center frequency is at fs/2. At the stability boundary, α =−1 and Qhf →∞, which
means that the second-order approximation given by Eq. (18.173) is capable of correctly predict-
ing CPM instability. For the same buck converter example considered in Figs.18.42 and 18.43,
Fig. 18.44 shows a comparison of the magnitude and phase responses of the second-order ap-
proximation given by Eq. (18.173) and the sampled-data model given by Eq. (18.168)f o rt h r e e
values of the artiﬁcial ramp slope, Ma/M2 = 0.1, 0.5, and 5. The second-order approximation
matches predictions of the sampled-data model very well at all frequencies of interest, and for
all values of the artiﬁcial ramp slope.

18.8 Discontinuous Conduction Mode 779
1 kHz 10 kHz 100 kHz
-40
-20
0
20 Magnitude [dB]
1 kHz 10 kHz 100 kHz
-180
-135
-90
-45
0
 Phase [deg]
Fig. 18.44 Comparison of high-frequencyGic responses based on the sampled-data model and its second-
order approximation for three diﬀerent values of the artiﬁcial ramp slope, Ma/M2= 0.1, 0.5, and 5
The more accurate averaged small-signal model of Sect.18.3, which is equivalent to the ﬁrst-
order approximation of the sampled-data model, can be extended to match predictions of the
second-order approximation. As shown in [107], one approach to extending the more accurate
model consists of replacing the modulator gain F
m in Fig. 18.24 with a single-pole response
Fm
1+ s
ωx
(18.176)
where Fm given by Eq. (18.74) remains the same as before, while the additional modulator pole
frequency equals
fx=π
4
⎦
1−2D+ 2D Ma
M2
)
fs (18.177)
It can be shown that inclusion of the pole at fx results in high-frequency responses consistent
with the second-order approximation of the sampled-data model. With this extension, the more
accurate averaged small-signal model is capable of predicting CPM instability and of providing
accurate predictions of CPM frequency responses at all frequencies of interest, and for all values
of the artiﬁcial ramp slope M
a. In practice, assuming an artiﬁcial ramp with a suﬃciently large
slope Ma is applied, the analytical and simulation models developed in Sects.18.3 and 18.5 can
be considered suﬃciently accurate.
18.8 Discontinuous Conduction Mode
A model of current-programmed converters operating in the discontinuous conduction mode
is incorporated in the averaged simulation model described in Sect. 18.5.2. In this section, an
analytical model for current-programmed DCM converters is derived using the averaged switch

780 18 Current-Programmed Control
+
L
CR
+
v(t)vg(t)
iL(t)
Switch network
+
v1(t) v2(t)
+
i1(t) i2(t)
Fig. 18.45 Current-programmed DCM buck–boost converter example
modeling approach of Sect. 15.2. It is found that the average transistor voltage and current
follow a power sink characteristic, while the average diode voltage and current obey a power
source characteristic. Perturbation and linearization of these characteristics leads to a small-
signal equivalent circuit that models CPM DCM converters. The basic DCM CPM buck, boost,
and buck–boost converters essentially exhibit single-pole transfer functions: the second pole and
the right half-plane zero appear at frequencies near to or greater than the switching frequency,
owing to the small value of L in DCM.
A DCM CPM buck–boost converter example is analyzed here. However, Eqs. ( 18.178)
to (18.195) are written in general form, and apply equally well to DCM CPM buck and boost
converters. The schematic of a buck–boost converter is illustrated in Fig. 18.45. The terminal
waveforms of the switch network are deﬁned as shown: v
1(t) and i1(t) are the transistor wave-
forms, while v2(t) and i2(t) are the diode waveforms. Figure18.46 illustrates typical DCM wave-
forms, for current-programmed control with an artiﬁcial ramp having slope−ma. The inductor
current is zero at the beginning of each switching period. By solution of the transistor conduc-
tion subinterval, the programmed current ipk can be related to the transistor duty cycle d1 by
ic= ipk+ mad1Ts
= (m1+ ma)d1Ts (18.178)
Solution for d1 leads to
d1(t)= ic(t)
(m1+ ma)Ts
(18.179)
The average transistor current is found by integrating the i1(t) waveform of Fig. 18.46 over one
switching period:
⟨i1(t)⟩Ts = 1
Ts
∫ Ts
0
i1(τ)dτ= q1
Ts
(18.180)
The total area q1 is equal to one-half of the peak currentipk, multiplied by the subinterval length
d1Ts. Hence,
⟨i1(t)⟩Ts = 1
2ipk(t)d1(t) (18.181)

18.8 Discontinuous Conduction Mode 781
Fig. 18.46 Waveforms, CPM DCM buck–boost example
Elimination of ipk and d1, to express the average transistor current as a function of ic, leads to
⟨i1(t)⟩Ts =
1
2 Li2
c fs
⟨v1(t)⟩Ts
⎦
1+ ma
m1
)2 (18.182)
Finally, Eq. (18.182) can be rearranged to obtain the averaged switch network input port rela-
tionship:
⟨i1(t)⟩Ts⟨v1(t)⟩Ts =
1
2 Li2
c fs
⎦
1+ ma
m1
)2 =⟨p(t)⟩Ts (18.183)

782 18 Current-Programmed Control
Fig. 18.47 CPM DCM buck–boost converter model, derived via averaged switch modeling
Thus, the average transistor waveforms obey a power sink characteristic. When ma = 0, then
the average power⟨p(t)⟩TS is a function only of L, ic, and fs. The presence of the artiﬁcial ramp
causes⟨p(t)⟩TS to additionally depend on the converter voltages, via m1.
The power sink characteristic can also be explained via inductor energy arguments. During
the ﬁrst subinterval, the inductor current increases from 0 to ipk. In the process, the inductor
stores the following energy:
W= 1
2 Li2
pk (18.184)
The energy W is transferred from the power input vg, through the switch network input port,
to the inductor, once per switching period. This energy transfer process accounts for the power
ﬂow
⟨p(t)⟩Ts = Wf s= 1
2 Li2
pk fs (18.185)
The switch network input port, that is, the transistor terminals, can therefore be modeled by a
power sink element, as in Fig. 18.47.
The average switch network output port current, that is, the average diode current, is
⟨i2(t)⟩Ts = 1
Ts
∫ Ts
0
i2(τ)dτ= q2
Ts
(18.186)
By inspection of Fig. 18.46, the area q2 is given by
q2= 1
2ipkd2Ts (18.187)
The duty cycle d2 is determined by the time required for the inductor current to return to zero,
during the second subinterval. By arguments similar to those used to derive Eq. ( 15.19), the
duty cycle d2 can be found as follows:
d2(t)= d1(t)⟨v1(t)⟩Ts
⟨v2(t)⟩Ts
(18.188)
Substitution of Eqs. (18.188), (18.187), and (18.185) into Eq. (18.186) yields
⟨i2(t)⟩Ts = ⟨p(t)⟩Ts
⟨v2(t)⟩Ts
(18.189)

18.8 Discontinuous Conduction Mode 783
Fig. 18.48 Steady-state model of the CPM DCM buck–boost converter
The output port of the averaged switch network is therefore described by the relationship
⟨i2(t)⟩Ts⟨v2(t)⟩Ts =
1
2 Li2
c (t) fs
⎦
1+ ma
m1
)2 =⟨p(t)⟩Ts (18.190)
In the averaged model, the diode can be replaced by a power source of value⟨p(t)⟩Ts , equal to the
power apparently consumed at the switch network input port. During the second subinterval, the
inductor releases all of its stored energy through the diode, to the converter output. This results
in an average power ﬂow of value⟨p(t)⟩Ts .
A CPM DCM buck–boost averaged model is therefore as given in Fig.18.47. In this model,
the transistor is simply replaced by a power sink of value ⟨p(t)⟩Ts , while the diode is replaced
by a power source also of value⟨p(t)⟩Ts .
The steady-state equivalent circuit model of the CPM DCM buck–boost converter is ob-
tained by letting the inductor and capacitor tend to short- and open-circuits, respectively. The
model of Fig. 18.48 is obtained. The steady-state output voltage V can now be determined by
equating the dc load power to the converter average power ⟨p(t)⟩Ts . For a resistive load, one
obtains
V2
R = P (18.191)
where the steady-state value of⟨p(t)⟩Ts is given by
P=
1
2 LI2
c (t) fs
⎦
1+ Ma
M1
)2 (18.192)
and where Ic is the steady-state value of the control input ic(t). Solution for V yields the follow-
ing result
V=
√
PR= Ic
√ RL fs
2
⎦
1+ Ma
M1
)2 (18.193)
for the case of a resistive load.

784 18 Current-Programmed Control
Averaged models of the DCM CPM buck, boost, and other converters can be found in a
similar manner. In each case, the average transistor waveforms are shown to follow a power
sink characteristic, while the average diode waveforms follow a power source characteristic.
The resulting equivalent circuits of the CPM DCM buck and boost converters are illustrated in
Fig. 18.49. In each case, the average power is given by
⟨p(t)⟩Ts =
1
2 Li2
c (t) fs
⎦
1+ ma
m1
)2 (18.194)
with m1 deﬁned as in Eq. (18.30).
Steady-state characteristics of the DCM CPM buck, boost, and buck–boost converters are
summarized in Table 18.6. In each case, the dc load power is Pload = VI and P is given by
Eq. (18.192). The conditions for operation of a current-programmed converter in the discontin-
uous conduction mode can be expressed as follows:
|I|>|Icrit| for CCM
|I|<|Icrit| for DCM (18.195)
where I is the dc load current. The critical load current at the CCM-DCM boundary, Icrit,i s
expressed as a function of Ic and the voltage conversion ratio M= V/Vg in Table18.6.
Table 18.6 Steady-state DCM current-programmed characteristics of basic converters
Converter MI crit Stability range when ma = 0
Buck Pload−P
Pload
1
2 (Ic−MmaTs)0 ≤M< 2
3
Boost Pload
Pload−P
⎦
Ic−M−1
M maTs
)
2M 0≤D≤1
Buck–boost Depends on load characteristic:
Pload = P
⎦
Ic−M
M−1 maTs
)
2(M−1) 0≤D≤1
In the discontinuous conduction mode, the inductor current is zero at the beginning and end
of each switching period. As a result, the current-programmed controller does not exhibit the
type of instability described in Sect. 18.2. The current programmed controllers of DCM boost
and buck–boost converters are stable for all duty cycles with no artiﬁcial ramp. However, the
CPM DCM buck converter exhibits a diﬀerent type of low-frequency instability when M> 2/3
and m
a = 0 that arises because the dc output characteristic is nonlinear and can exhibit two
equilibrium points when the converter drives a resistive load. The stability range can be extended
to 0≤D≤1 by addition of an artiﬁcial ramp having slope ma > 0.086m2, or by addition of
output voltage feedback.
```
