---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第17章part 1 - 17 Input Filter Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 678-697 > Chunk ID: `chapter-17-part-1`"
---

# 第17章part 1 - 17 Input Filter Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 678-697  
> Chunk ID: `chapter-17-part-1`

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
17
Input Filter Design
17.1 Introduction
17.1.1 Conducted EMI
It is nearly always required that a ﬁlter be added at the power input of a switching converter. By
attenuating the switching harmonics that are present in the converter input current waveform, the
input ﬁlter allows compliance with regulations that limitconducted electromagnetic interference
(EMI). The input ﬁlter can also protect the converter and its load from transients that in the input
voltage vg(t), thereby improving the system reliability.
A simple buck converter example is illustrated in Fig.17.1. The converter injects the pulsat-
ing current ig(t)o fF i g .17.1b into the power source vg(t). The Fourier series of ig(t) contains
harmonics at multiples of the switching frequency fs, as follows:
ig(t)= DI+
∞∑
k=1
2I
kπsin(kπD) cos(kωt) (17.1)
In practice, the magnitudes of the higher-order harmonics can also be signiﬁcantly aﬀected by
the current spike caused by diode reverse recovery, and also by the ﬁnite slopes of the switching
transitions. The large high-frequency current harmonics ofig(t) can interfere with television and
radio reception, and can disrupt the operation of nearby electronic equipment. In consequence,
regulations and standards exist that limit the amplitudes of the harmonic currents injected by a
(a)
+ CR
+
v
Liig 1
2
vg(t)
(b)
t
ig(t)
DTs Ts
0
0
0
i i
Fig. 17.1 Buck converter example: (a) circuit of power stage; (b) pulsating input current waveform
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_17
675

676 17 Input Filter Design
(a)
+ CR
+
v
Liig 1
2
iin
Lf
Cf
Input filter
vg(t)
(b)
t
ig(t)
DTs Ts
0
0
0
iin(t)
Fig. 17.2 Addition of a simple L–C low-pass ﬁlter to the power input terminals of the buck converter:
(a) circuit; (b) input current waveforms
switching converter into its power source [143–150]. As an example, if the dc inductor current
i of Fig. 17.2 has a magnitude of several Amperes, then the fundamental component (n= 1) has
an rms amplitude in the vicinity of one Ampere. Regulations may require attenuation of this
current to a value typically in the range 10μA to 100μA.
To meet limits on conducted EMI, it is necessary to add an input ﬁlter to the converter.
Figure 17.2 illustrates a simple single-section L–C low-pass ﬁlter, added to the input of the
converter of Fig. 17.1. This ﬁlter attenuates the current harmonics produced by the switching
converter, and thereby smooths the current waveform drawn from the power source. If the ﬁlter
has transfer function H(s)= iin/ig, then the input current Fourier series becomes
iin(t)= H(0)DI+
∞∑
k=1
∥H(kjω)∥ 2I
kπsin(kπD) cos(kωt+∠H(kjω)) (17.2)
In other words, the amplitude of each current harmonic at angular frequency kω is attenuated
by the ﬁlter transfer function at the harmonic frequency,∥H(kjω)∥. Typical requirements eﬀec-
tively limit the current harmonics to have amplitudes less than 100μA, and hence input ﬁlters
are often required to attenuate the current amplitudes by 80 dB or more.
To improve the reliability of the system, input ﬁlters are sometimes required to operate nor-
mally when transients or periodic disturbances are applied to the power input. Such conducted
susceptibility speciﬁcations force the designer to damp the input ﬁlter resonances, so that input
disturbances do not excite excessive currents or voltages within the ﬁlter or converter.
17.1.2 The Input Filter Design Problem
The situation faced by the design engineer is typically as follows. A switching regulator has
been designed, which meets performance speciﬁcations. The regulator was properly designed

17.1 Introduction 677
Fig. 17.3 Small-signal equivalent circuit models of the buck converter: ( a) basic converter model, ( b)
with addition of input ﬁlter
as discussed in Chap. 9, using a small-signal model of the converter power stage such as the
equivalent circuit of Fig.17.3a. In consequence, the transient response is well damped and suﬃ-
ciently fast, with adequate phase margin at all expected operating points. The output impedance
is suﬃciently small over a wide frequency range. The line-to-output transfer functionGvg(s), or
audiosusceptibility,i ss uﬃciently small, so that the output voltage remains regulated in spite of
variations in ˆvg(t).
Having developed a good design that meets the above goals regarding dynamic response,
the designer then addresses the problem of conducted EMI. A low-pass ﬁlter having attenua-
tion suﬃcient to meet conducted EMI speciﬁcations is constructed and added to the converter
input. A new problem then arises: the input ﬁlter changes the dynamics of the converter. The
transient response is modiﬁed, and the control system may even become unstable. The output
impedance may become large over some frequency range, possibly exhibiting resonances. The
audiosusceptibility may be degraded.
The problem is that the input ﬁlter a ﬀects the dynamics of the converter, often in a man-
ner that degrades regulator performance. For example, when a single-section L–C input ﬁlter is
added to a buck converter as in Fig.17.2a, the small-signal equivalent circuit model is modiﬁed
as shown in Fig.17.3b. The input ﬁlter elements aﬀect all transfer functions of the converter, in-
cluding the control-to-output transfer functionG
vd(s), the line-to-output transfer functionGvg(s),
and the converter output impedance Zout(s). Moreover, the inﬂuence of the input ﬁlter on these
transfer functions can be quite severe.

678 17 Input Filter Design
f
|| Gvd || Gvd
00 dBV
20 dBV
30 dBV
100 Hz
40 dBV
zHk01zHk1
10 dBV
|| Gvd ||
Gvd
Fig. 17.4 Control-to-output transfer functions predicted by the equivalent circuit models of Fig. 17.3.
Dashed lines: without input ﬁlter (Fig. 17.3a). Solid lines: with input ﬁlter (Fig. 17.3b)
As an illustration, let us examine how the control-to-output transfer function Gvd(s)o ft h e
buck converter of Fig.17.1 is altered when a simple L–C input ﬁlter is added as in Fig.17.2.F o r
this example, the element values are chosen to be: D= 0.5, L= 100μH, C= 100μF, R=
3Ω, Lf = 330μH, C f = 470μF. Figure 17.4 contains the Bode plot of the magnitude and phase
of the control-to-output transfer function Gvd(s). The dashed lines are the magnitude and phase
before the input ﬁlter was added, generated by solution of the model of Fig.17.3a. The complex
poles of the converter output ﬁlter cause the phase to approach−180◦at high frequency. Usually,
this is the model used to design the regulator feedback loop and to evaluate the phase margin
(see Chap. 9). The solid lines of Fig. 17.4 show the magnitude and phase after addition of the
input ﬁlter, generated by solution of the model of Fig. 17.3b. The magnitude exhibits a “glitch”
at the resonant frequency of the input ﬁlter, and an additional−360◦of phase shift is introduced
into the phase. It can be shown that Gvd(s) now contains an additional complex pole pair and
a complex right half-plane zero pair, associated with the input ﬁlter dynamics. If the crossover
frequency of the regulator feedback loop is near to or greater than the resonant frequency of the
input ﬁlter, then the loop phase margin will become negative and instability will result. Such
behavior is typical; consequently, input ﬁlters are notorious for destabilizing switching regulator
systems.
This chapter shows how to mitigate the stability problem, by introducing damping into the
input ﬁlter and by designing the input ﬁlter such that its output impedance is suﬃciently small
[69, 151–162]. The result of these measures is that the eﬀect of the input ﬁlter on the control-to-
output transfer function becomes negligible, and hence the converter dynamics are much better
behaved. Although analysis of the fourth-order system of Fig.17.3b is potentially quite complex,
the approach used here simpliﬁes the problem through use of impedance inequalities involving
the converter input impedance and the ﬁlter output impedance [151, 152]. These inequalities are
based on Middlebrook’s Extra Element Theorem of Sect. 16.1. This approach allows the engi-

17.2 Eﬀect of an Input Filter on Converter Transfer Functions 679
neer to gain the insight needed to eﬀectively design the input ﬁlter. Optimization of the damping
networks of input ﬁlters, design of multiple-section ﬁlters, and the exact stability criterion, are
also discussed.
17.2 Eﬀect of an Input Filter on Converter Transfer Functions
17.2.1 Modiﬁed Transfer Functions
The control-to-output transfer function Gvd(s) is deﬁned as follows:
Gvd(s)= ˆv(s)
ˆd(s)
⏐⏐
⏐
⏐⏐⏐
ˆvg(s)=0
(17.3)
The control-to-output transfer functions of basic CCM converters with no input ﬁlters are listed
in Sect. 8.2.2.
+
+ 1 : M(D)
Le
C R
+
j(s)d( s)
e(s)d( s)
vg(s) v(s)
He(s)
Zei
Canonical Model
Lf
Cf
Hi(s)
Input Filter
Fig. 17.5 Addition of an input ﬁlter to the canonical model of a switching converter
Addition of an input ﬁlter to a switching regulator leads to the system illustrated in Fig.17.5.
In Fig. 17.6, the input ﬁlter is represented by its Thevenin-equivalent circuit, with Hi(s) equal
to the unloaded transfer function of the ﬁlter, and Zo equal to the output impedance of the input
ﬁlter. To determine the control-to-output transfer function in the presence of the input ﬁlter,
we set ˆvg(s) to zero and solve for ˆv(s)/ ˆd(s) according to Eq. (17.3). The input ﬁlter can then be
represented simply by its output impedanceZo(s) as illustrated in Fig.17.7. Thus, the input ﬁlter
can be treated as an extra element having impedance Zo(s), and the Extra Element Theorem of
Chap. 16.1 can be employed to determine how addition of the input ﬁlter modiﬁes the control-
to-output transfer function. Speciﬁcally, the modiﬁed control-to-output transfer function can be
expressed as follows [151]:
G
vd(s)=
⎛⎜⎜⎜⎜⎜
⎝G
vd(s)
⏐⏐⏐
⏐⏐⏐
Zo(s)=0
⎞⎟⎟⎟⎟⎟
⎠
⎦
1+ Z
o(s)
ZN (s)
)
⎦
1+ Zo(s)
ZD(s)
) (17.4)

680 17 Input Filter Design
Fig. 17.6 Use of Thevenin-equivalent model for the input ﬁlter
Fig. 17.7 Finding the control-to-output transfer function Gvd(s)
where
Gvd(s)
⏐⏐⏐⏐Zo(s)=0
(17.5)
is the original control-to-output transfer function with no input ﬁlter.
Figure 17.8 illustrates determination of ZN (s). In the presence of ˆd, a current ˆitest is injected
at the input port of the converter, and the ˆd and ˆitest inputs are adjusted such that the output ˆv is
nulled. Under these conditions, we ﬁnd ˆvtest and
ZN = ˆvtest
ˆitest
⏐⏐
⏐
⏐
ˆv→
null
0
(17.6)
When the output ˆv is nulled, then no current ﬂows through the load R, capacitor C, or inductor
Le. Hence there is no voltage across these elements, and the voltages across the transformer
windings are zero. With no secondary winding current, the transformer primary winding current
is zero as well. Hence we can ﬁnd that
ˆvtest =−e(s) ˆd (17.7)
ˆitest = j(s) ˆd (17.8)

17.2 Eﬀect of an Input Filter on Converter Transfer Functions 681
Fig. 17.8 Finding ZN (s)
Therefore,
ZN =−e(s) ˆd
j(s) ˆd
=−e(s)
j(s) (17.9)
This is a general result, expressed in terms of the canonical model parameterse(s) and j(s). The
impedance ZN is the input port impedance of the converter, under the conditions that ˆd and ˆitest
are varied as necessary to null the output voltage ˆv. Generally, ZN is negative.
Fig. 17.9 Finding ZD(s)
Figure 17.9 illustrates determination of ZD(s). The input ˆd is set to zero, and current ˆitest is
injected at the input port of the converter. The quantity ZD is given by
ZD= ˆvtest
ˆitest
⏐⏐⏐⏐
⏐⏐
ˆd=0
(17.10)
Setting ˆd to zero causes the e(s) ˆd and j(s) ˆd sources to be zero. The driving-point impedance
at the injection point is equal to the canonical model ﬁlter impedance Zei, reﬂected through the
transformer turns ratio:
ZD(s)= Zei(s)
M2 (17.11)

682 17 Input Filter Design
This is a general result, expressed in terms of the canonical model parameters Zei and M.T h e
impedance ZD is the input port impedance of the converter, under open-loop conditions with
ˆd= 0.
A similar analysis shows that the converter open-loop output impedance can be expressed
in the form
Zout(s)=
⎦
Zout(s)
⏐⏐⏐
⏐
Zo(s)=0
)
⎦
1+ Zo(s)
Ze(s)
)
⎦
1+ Zo(s)
ZD(s)
) (17.12)
where
Zout(s)
⏐⏐
⏐⏐
Zo(s)=0
(17.13)
is the original converter output impedance with no input ﬁlter. The quantityZe(s) is equal to the
converter input impedance Zi(s) under the conditions that the converter output is shorted:
Ze= Zi
⏐⏐
⏐⏐
ˆv=0
(17.14)
The quantity ZD(s) is again the open-loop driving-point impedance at the power input port of
the open-loop converter, given by Eq. (17.11).
17.2.2 Discussion
Equation (17.4) relates the power stage control-to-output transfer function Gvd(s) to the output
impedance Zo(s) of the input ﬁlter, and also to the quantities ZN (s) and ZD(s) measured at
the power input port of the converter. The quantity ZD(s) coincides with the open-loop input
impedance of the converter.
As described above, the quantity ZN (s) is equal to the input port impedance of the converter
power stage, under the conditions that ˆd(s) is varied as necessary to null ˆv(s) to zero. This is,
in fact, the function performed by an ideal controller: it varies the duty cycle as necessary to
maintain zero error of the output voltage. Therefore, Z
N (s) coincides with the impedance that
would be measured at the converter power input terminals, if an ideal feedback loop perfectly
regulated the converter output voltage. Of course, Eq. ( 17.4) is valid in general, regardless of
whether a control system is present.
Figure 17.10 illustrates the large-signal dc behavior of a feedback loop that perfectly reg-
ulates the converter output voltage. Regardless of the applied input voltage vg(t), the output
voltage is maintained equal to the desired value V. The load power is therefore constant, and
equal to Pload = V2/R. In the idealized case of a lossless converter, the power ﬂowing into the
converter input terminals will also be equal to Pload, regardless of the value of vg(t). Hence, the
power input terminal of the converter obeys the equation
⟨vg(t)⟩Ts⟨ig(t)⟩Ts = Pload (17.15)
This characteristic is illustrated in Fig. 17.10b, and is represented in Fig. 17.10a by the depen-
dent power sink symbol. The properties of power sources and power sinks are discussed in
detail in Chap. 15.
Figure 17.10b also illustrates linearization of the constant input power characteristic, about
a quiescent operating point. The resulting line has negative slope; therefore, the incremental

17.2 Eﬀect of an Input Filter on Converter Transfer Functions 683
(a)
++vg(t)
Ts
ig(t)
Ts
Pload
Closed-loop
voltage regulator
R
+
V
(b)
Quiescent
operating
point
vg(t)
Ts
ig(t)
Ts
vg(t)
Ts
ig(t)
Ts
= Pload
slope Ig
Vg
M 2
R
Vg
Ig
Fig. 17.10 Power input port characteristics of an ideal switching voltage regulator: (a) equivalent circuit
model, including dependent power sink, (b) constant power characteristic of input port
(small signal) input resistance of the ideal voltage regulator is negative. For example, increasing
the voltage⟨vg(t)⟩Ts causes the current⟨ig(t)⟩Ts to decrease, such that the power remains constant.
This incremental resistance has the value [151, 156]:
−R
M2 (17.16)
where R is the output load resistance, and M is the conversion ratio V/Vg. For the buck, boost,
buck–boost, and other converters, the dc asymptote of ZN (s) coincides with the negative in-
cremental resistance given by Eq. ( 17.16). In a closed-loop switching regulator that regulates
its output voltage well, the negative incremental resistance ( 17.16) is the dc asymptote of the
regulator closed-loop input impedance Zi(s).
Loading of an L–C input ﬁlter and its output impedance Zo(s) by the negative incremental
resistance of Eq. (17.16) can lead to instability. Indeed, the (ˆv/ˆvg) transfer function of the closed-
loop regulator with input ﬁlter includes the voltage divider term
Zi(s)
Zo(s)+ Zi(s) (17.17)

684 17 Input Filter Design
If the regulator input impedance Zi(s) is well approximated by Eq. (17.16) and the input ﬁlter is
an undamped L–C ﬁlter, then the divider ratio (17.17) contains RHP poles.
Hence, when an undamped or lightly damped input ﬁlter is connected to the regulator input
port, the input ﬁlter can interact with the negative resistance characteristic of Zi(s)t of o r ma
negative resistance oscillator that can be viewed as the origin of input ﬁlter instabilities. It
should be noted that the regulator closed-loop input impedance Zi(s)i sa l s oaﬀected by the
power stage reactive elements and the loop gain, and reverts to a positive impedance at high
frequencies. These additional dynamics also impact the stability of the system. A more detailed
stability analysis that accounts for the dynamics of Z
i(s) is explained in Sect. 17.5.
17.2.3 Impedance Inequalities
Expressions for ZN (s), ZD(s), and Ze(s) for the basic buck, boost, and buck–boost converters are
listed in Table17.1.
Equation (17.4) reveals that addition of the input ﬁlter causes the control-to-output transfer
function Gvd(s) to be modiﬁed by the factor
⎦
1+ Zo(s)
ZN (s)
)
⎦
1+ Zo(s)
ZD(s)
) (17.18)
called the correction factor. When the following inequalities are satisﬁed,
∥Zo∥≪∥ ZN∥, and (17.19)
∥Zo∥≪∥ ZD∥
then the correction factor has a magnitude of approximately unity, and the input ﬁlter does not
substantially alter the control-to-output transfer function [ 151, 152]. These inequalities limit
the maximum allowable output impedance of the input ﬁlter, and constitute useful ﬁlter design
criteria. One can sketch the Bode plots of∥ZN ( jω)∥ and∥ZD( jω)∥, and compare with the Bode
plot of∥Zo( jω)∥. This allows the engineer to gain the insight necessary to design an input ﬁlter
that satisﬁes inequalities (17.19).
Table 17.1 Input ﬁlter design criteria for basic converters
Converter ZN (s) ZD(s) Ze(s)
Buck −R
D2
R
D2
⎦
1+ s L
R+ s2LC
)
(1+ sRC)
sL
D2
Boost −D′2R
⎦
1−sL
D′2R
)
D′2R
⎦
1+ s L
D′2R+ s2 LC
D′2
)
(1+ sRC) sL
Buck–boost −D′2R
D2
⎦
1−sDL
D′2R
) D′2R
D2
⎦
1+ s L
D′2R+ s2 LC
D′2
)
(1+ sRC)
sL
D2

17.3 Buck Converter Example 685
The buck converter example of the next section illustrates how violation of inequali-
ties (17.19) not only causes the transfer function Gvd(s) to be signiﬁcantly changed, but also
can introduce resonant poles and RHP zeroes that can seriously degrade the converter loop gain
and its phase margin.
According to Eq. (17.12), the converter open-loop output impedance Zout(s) is not substan-
tially aﬀected by the input ﬁlter when the following inequalities are satisﬁed:
∥Zo∥≪∥ Ze∥, and (17.20)
∥Zo∥≪∥ ZD∥
An input ﬁlter design that satisﬁes inequalities (17.19) but not (17.20) can be expected to leave
the loop gain unchanged, but to modify the open-loop converter output impedance. This would
lead to a modiﬁed closed-loop output impedance as well.
Similar impedance inequalities can be derived for the case of current-programmed convert-
ers [154, 155], or converters operating in the discontinuous conduction mode. Feedforward of
the converter input voltage was suggested in [157]. Analysis of the eﬀect of an input ﬁlter on a
current-programmed converter is discussed in Sect. 18.4.4.
17.3 Buck Converter Example
Let us again consider the example of a simple buck converter withL–C input ﬁlter, as illustrated
in Fig. 17.11a. Upon replacing the converter with its small-signal model, we obtain the equiv-
alent circuit of Fig. 17.11b. Let us evaluate Eq. ( 17.4) for this example, to ﬁnd how the input
ﬁlter modiﬁes the control-to-output transfer function of the converter.
(a)
+ C R
+
v
L i1
2Vg
Lf
Cf
Input filter Converter
30 V
330 μH
470 μF
100 μH
100 μF 3 
D = 0.5
(b)
+
L
CR
+1 : D
+
Converter model
Vgd
Id
i
vvg
d^
^
^
^^ ^
Lf
Input filter
Cf
Zo(s) Zi(s)
330 μH
470 μF
100 μH
100 μF 3 
Fig. 17.11 Buck converter example: (a) converter circuit, (b) small-signal model

686 17 Input Filter Design
17.3.1 Eﬀect of Undamped Input Filter
The quantities ZN (s) and ZD(s) can be read from Table17.1, or can be derived from the converter
model of Fig. 17.11b using Eqs. ( 17.6) and ( 17.10) as described in Sect. 17.2. Figure 17.12a
illustrates determination of ZD based on the buck converter model Fig. 17.11b. Upon setting
ˆd(s) to zero, the converter small-signal model reduces to the circuit of Fig. 17.12a. It can be
seen that ZD(s) is equal to the input impedance of the R–L–C ﬁlter, divided by the square of the
turns ratio:
ZD(s)= 1
D2
⎦
sL+ R

1
sC
)
(17.21)
Construction of asymptotes for this impedance is treated in Sect.8.4, with the results for the nu-
merical values of this example given in Fig.17.13. The load resistance dominates the impedance
at low frequency, leading to a dc asymptote of R/D2 = 12Ω. For the high- Q case shown,
∥ZD( jω)∥ follows the output capacitor asymptote, reﬂected through the square of the eﬀective
turns ratio, at intermediate frequencies. A series resonance occurs at the output ﬁlter resonant
frequency f0, given by
f0= 1
2π
√
LC
(17.22)
For the element values listed in Fig.17.11a, the resonant frequency is f0= 1.6 kHz. The values
of the asymptotes at the resonant frequency f0 are given by the characteristic impedance R0,
referred to the transformer primary:
Fig. 17.12 Determination of the quantities ZN (s)a n dZD(s) for the circuit of Fig. 17.11b; (a) determina-
tion of ZD(s), (b) determination of ZN (s)

17.3 Buck Converter Example 687
Fig. 17.13 Construction of∥ZN ( jω)∥ and∥ZD( jω)∥, buck converter example
R0
D2 = 1
D2
√
L
C (17.23)
For the element values given in Fig. 17.11a, this expression is equal to 4 Ω.T h e Q-factor is
given by
Q= R
R0
= R
√
C
L (17.24)
This expression yields a numerical value of Q= 3. The value of∥ZD( jω)∥ at the resonant fre-
quency 1.6 kHz is therefore equal to (4Ω)/(3)= 1.33Ω. At high frequency,∥ZD( jω)∥ follows
the reﬂected inductor asymptote.
Figure 17.12b illustrates determination of ZN based on the buck converter model in
Fig. 17.11b. This impedance is equal to the converter input impedance under the conditions that
ˆd(s) is varied to maintain the output voltage ˆv(s) at zero. Figure17.12b illustrates the derivation
of an expression for ZN (s). A test current source ˆitest (s) is injected at the converter input port.
The impedance ZN (s) can be viewed as the transfer function from ˆitest (s)t oˆvtest (s):
ZN (s)= ˆvtest(s)
ˆitest(s)
⏐⏐⏐
⏐⏐⏐
ˆv−−→null0
(17.25)
The null condition ˆv(s)−−→null0 greatly simpliﬁes analysis of the circuit of Fig. 17.12b. Since the
voltage ˆv(s) is zero, the currents through the capacitor and load impedances are also zero. This
further implies that the inductor current ˆi(s) and transformer winding currents are zero, and
hence the voltage across the inductor is also zero. Finally, the voltage ˆvs(s), equal to the output
voltage plus the inductor voltage, is zero.
Since the currents in the windings of the transformer model are zero, the current itest (s)i s
equal to the independent source current I ˆd(s):
ˆitest(s)= I ˆd(s) (17.26)
Because ˆvs(s) is equal to zero, the voltage applied to the secondary of the transformer model is
equal to the independent source voltage−Vg ˆd(s). Upon dividing by the turns ratio D, we obtain
ˆvtest (s):
ˆvtest(s)=−Vg ˆd(s)
D (17.27)

688 17 Input Filter Design
Insertion of Eqs. (17.26) and (17.27) into Eq. (17.25) leads to the following result:
ZN (s)=
⎛⎜⎜⎜⎜⎝−Vg ˆd(s)
D
⎞⎟⎟⎟⎟⎠
(I ˆd(s))
=−R
D2 (17.28)
The steady-state relationship I= DVg/R has been used to simplify the above result. This equa-
tion coincides with the expression listed in Table 17.1. The Bode diagram of∥ZN ( jω)∥ is con-
structed in Fig. 17.13; this plot coincides with the dc asymptote of ∥ZD( jω)∥. The impedance
ZN is negative, and has magnitude equal to the reﬂected load resistance.
Fig. 17.14 Determination of the ﬁlter output
impedance Zo(s)
Lf
Cf
Zo(s)
Next, let us construct the Bode diagram of the ﬁlter output impedanceZo(s). When the inde-
pendent source ˆvg(s) is set to zero, the input ﬁlter network reduces to the circuit of Fig.17.14.I t
can be seen that Zo(s) is given by the parallel combination of the inductor Lf and the capacitor
C f :
Zo(s)= sL f



1
sCf
(17.29)
Construction of the Bode diagram of this parallel resonant circuit is discussed in Sect. 8.3.4.
As illustrated in Fig. 17.15, the magnitude∥Zo( jω)∥ is dominated by the inductor impedance at
low frequency, and by the capacitor impedance at high frequency. The inductor and capacitor
asymptotes intersect at the ﬁlter resonant frequency:
Fig. 17.15 Magnitude plot of the output impedance of the input ﬁlter of Fig.17.14. Since the ﬁlter is not
damped, the Q-factor is very large

17.3 Buck Converter Example 689
ff = 1
2π √Lf C f
(17.30)
For the given values, the input ﬁlter resonant frequency is ff = 400 Hz. This ﬁlter has charac-
teristic impedance
R0 f =
√
Lf
C f
(17.31)
equal to 0.84Ω. Since the input ﬁlter is undamped, its Q-factor is ideally inﬁnite. In practice,
parasitic elements such as inductor loss and capacitor equivalent series resistance limit the value
of Qf . Nonetheless, the impedance∥Zo( jω)∥ is very large in the vicinity of the ﬁlter resonant
frequency ff .
The Bode plot of the ﬁlter output impedance ∥Zo( jω)∥ is overlaid on the ∥ZN ( jω)∥ and
∥ZD( jω)∥ plots in Fig.17.16, for the element values listed in Fig.17.11a. We can now determine
whether the impedance inequalities ( 17.19) are satisﬁed. Note the design-oriented nature of
Fig. 17.16: since analytical expressions are given for each impedance asymptote, the designer
can easily adjust the component values to satisfy Eq. (17.19). For example, the values ofLf and
C f should be chosen to ensure that the asymptotes of ∥Zo( jω)∥ lie below the worst-case value
of R/D2, as well as the other asymptotes of∥ZD( jω)∥.
It should also be apparent that it is a bad idea to choose the input and output ﬁlter reso-
nant frequencies f0 and ff to be equal, because it would then be more di ﬃcult to satisfy the
inequalities of Eq. (17.19). Instead, the resonant frequencies f0 and ff should be well separated
in value.
Since the input ﬁlter is undamped, it is impossible to satisfy the impedance inequali-
ties (17.19) in the vicinity of the input ﬁlter resonant frequency ff . Regardless of the choice
of element values, the input ﬁlter changes the control-to-output transfer function Gvd(s)i n
the vicinity of frequency ff . Figures 17.17 and 17.18 illustrate the resulting correction factor
[Eq. (17.18)] and the modiﬁed control-to-output transfer function [Eq. ( 17.4)], respectively. At
zHk01zHk1zH001
40 dB
0 dB
20 dB || ZN ||
|| ZD ||
f
|| Zo ||
L f 1
C f
12 
Qf
1
D2C
fo = 1.59 kHz
f1 = 530 Hz
Q = 3
L
D2
R0f
10 dB
30 dB
ff = 400 Hz
R0/D2
Fig. 17.16 Impedance design criteria ∥ZN ( jω)∥ and∥ZD( jω)∥ from Fig. 17.13, with the ﬁlter output
impedance∥Zo( jω)∥ superimposed. The design criteria of Eq. ( 17.19) are not satisﬁed at the input ﬁlter
resonance

690 17 Input Filter Design
f
0
0 dB
100 Hz zHk01zHk1
10 dB
1+ Zo
ZN
1+ Zo
ZD
1+ Zo
ZN
1+ Zo
ZD
Fig. 17.17 Magnitude (upper plot) and phase (lower plot) of the correction factor, Eq. ( 17.18), for the
buck converter example of Fig.17.11
f
|| Gvd || Gvd
00 dB
20 dB
30 dB
100 Hz
40 dB
zHk01zHk1
10 dB
|| Gvd ||
Gvd
Fig. 17.18 Eﬀect of undamped input ﬁlter on the control-to-output transfer function of the buck converter
example. Dashed lines: without input ﬁlter. Solid lines: with undamped input ﬁlter
frequencies well below the input ﬁlter resonant frequency, impedance inequalities ( 17.19)a r e
well satisﬁed. The correction factor tends to the value 1 ∠0◦, and the control-to-output trans-
fer function Gvd(s) is essentially unchanged. In the vicinity of the resonant frequency ff ,t h e
correction factor contains a pair of complex poles, and also a pair of right half-plane complex
zeroes. These cause a “glitch” in the magnitude plot of the correction factor, and they contribute
360
◦of lag to the phase of the correction factor. The glitch and its phase lag can be seen in the
Bode plot of Gvd(s). At high frequency, the correction factor tends to a value of approximately
1∠−360◦; consequently, the high-frequency magnitude ofGvd is unchanged. However, when the

17.3 Buck Converter Example 691
–360◦contributed by the correction factor is added to the −180◦contributed at high frequency
by the two poles of the original Gvd(s), a high-frequency phase asymptote of−540◦is obtained.
If the crossover frequency of the converter feedback loop is placed near to or greater than the
input ﬁlter resonant frequency ff , then a negative phase margin is inevitable. This explains why
addition of an input ﬁlter often leads to instabilities and oscillations in switching regulators.
17.3.2 Damping the Input Filter
Let us damp the resonance of the input ﬁlter, so that impedance inequalities (17.19) are satisﬁed
at all frequencies.
(a)
Lf
Cf Rf
(b)
Lf
Cf
Rf
Fig. 17.19 Two attempts to damp the input ﬁlter: ( a) addition of damping resistance Rf across C f ,( b)
addition of damping resistance Rf in parallel with Lf
One approach to damping the ﬁlter is to add resistorRf in parallel with capacitorC f as illus-
trated in Fig. 17.19a. The output impedance of this network is identical to the parallel resonant
impedance analyzed in Sect. 8.3.4. The maximum value of the output impedance occurs at the
resonant frequency ff , and is equal in value to the resistance Rf . Hence, to satisfy impedance
inequalities (17.19), we should choose Rf to be much less than the ∥ZN ( jω)∥ and∥ZD( jω)∥
asymptotes. The condition Rf ≪∥ ZN ( jω)∥ can be expressed as:
Rf ≪ R
D2 (17.32)
Unfortunately, this raises a new problem: the power dissipation inRf . The dc input voltageVg is
applied across resistor Rf , and therefore Rf dissipates power equal to V2
g/Rf . Equation (17.32)
implies that this power loss is greater than the load power! Therefore, the circuit of Fig. 17.19a
is not a practical solution.
One solution to the power loss problem is to place Rf in parallel with Lf as illustrated in
Fig. 17.19b. The value ofRf in Fig. 17.19b is also chosen according to Eq. (17.32). Since the dc
voltage across inductorLf is zero, there is now no dc power loss in resistorRf . The problem with
this circuit is that its transfer function contains a high-frequency zero. Addition of Rf degrades
the slope of the high-frequency asymptote, from−40 dB/decade to−20 dB/decade. The circuit
of Fig. 17.19bi seﬀectively a single-pole R–C low-pass ﬁlter, with no attenuation provided by
inductor Lf .

692 17 Input Filter Design
One practical solution is illustrated in Fig. 17.20 [152]. Dc blocking capacitor Cb is added
in series with resistor Rf . Since no dc current can ﬂow through resistor Rf , its dc power loss is
eliminated. The value of Cb is chosen to be very large such that, at the ﬁlter resonant frequency
ff , the impedance of the Rf -Cb branch is dominated by resistor Rf . When Cb is suﬃciently
large, then the output impedance of this network reduces to the output impedances of the ﬁlters
of Fig. 17.19. The impedance asymptotes for the case of large Cb are illustrated in Fig. 17.20b.
The low-frequency asymptotes of∥ZN ( jω)∥ and∥ZD( jω)∥ in Fig. 17.13 are equal to R/D2=
12Ω. The choice Rf = 1Ωtherefore satisﬁes impedance inequalities ( 17.19) very well. The
choice Cb = 4700μF leads to 1/2πff Cb = 0.084Ω, which is much smaller than Rf .T h er e -
sulting magnitude||Zo( jω)|| is compared with∥ZN ( jω)∥ and∥ZD( jω)∥ in Fig. 17.21. It can be
seen that the chosen values of Rf and Cb lead to adequate damping, and impedance inequali-
ties (17.19) are now well satisﬁed.
Figure 17.22 illustrates how addition of the damped input ﬁlter modiﬁes the magnitude and
phase of the control-to-output transfer function. There is now very little change in Gvd(s), and
we would expect that the performance of the converter feedback loop is unaﬀected by the input
ﬁlter.
(a)
Cb
Lf
Cf
Rf
(b)
1
C f
L f ff
Rf
R0f
Fig. 17.20 A practical method to damping the input ﬁlter, including damping resistanceRf and dc block-
ing capacitor Cb:( a) circuit, (b) output impedance asymptotes
zHk01zHk1zH001
40 dB
0 dB
20 dB || ZN ||
|| ZD ||
f
|| Zo ||
L f 1
C f
12 
1
D2C
fo = 1.59 kHz
f1 = 530 Hz
Q = 3
L
D2
R0f
10 dB
30 dB
ff = 400 Hz
Rf = 1 
R0/D2
Fig. 17.21 Impedance design criteria ∥ZN ( jω)∥ and∥ZD( jω)∥ from Fig. 17.13, with the damped ﬁlter
output impedance∥Zo( jω)∥ of Fig.17.20 superimposed. The design criteria of Eq. (17.19) are well satisﬁed

17.4 Design of a Damped Input Filter 693
f
|| Gvd || Gvd
00 dBV
20 dBV
30 dBV
100 Hz
40 dBV
zHk01zHk1
10 dBV
|| Gvd ||
Gvd
Fig. 17.22 Eﬀect of the damped input ﬁlter on the control-to-output transfer function of the buck con-
verter example. Dashed lines: without input ﬁlter. Solid lines: with damped input ﬁlter
17.4 Design of a Damped Input Filter
As illustrated by the example of the previous section, design of an input ﬁlter requires not
only that the ﬁlter impedance asymptotes satisfy impedance inequalities, but also that the ﬁlter
be adequately damped. Damping of the input ﬁlter is also necessary to prevent transients and
disturbances in vg(t) from exciting ﬁlter resonances. Other design constraints include attaining
the desired ﬁlter attenuation, and minimizing the size of the reactive elements. Although a large
number of classical ﬁlter design techniques are well known, these techniques do not address the
problems of limiting the maximum output impedance and damping ﬁlter resonances.
The value of the blocking capacitor Cb used to damp the input ﬁlter in Sect. 17.3.2 is ten
times larger than the value ofC f , and hence its size and cost are of practical concern. Optimiza-
tion of an input ﬁlter design therefore includes minimization of the size of the elements used in
the damping networks.
Several practical approaches to damping the single-sectionL–C low-pass ﬁlter are illustrated
in Fig. 17.23 [152, 153, 158]. Figure 17.23a contains the Rf –Cb damping branch considered in
the previous section. In Fig. 17.23b, the damping resistor Rf is placed in parallel with the ﬁlter
inductor Lf , and a high-frequency blocking inductor Lb is placed in series with Rf . Inductor
Lb causes the ﬁlter transfer function to roll-oﬀwith a high-frequency slope of−40 dB/decade.
In Fig. 17.23c, the damping resistor Rf is placed in series with the ﬁlter inductor Lf , and the
dc current is bypassed by inductor Lb. In each case, it is desired to obtain a given amount of
damping (i.e., to cause the peak value of the ﬁlter output impedance to be no greater than a
given value that satisﬁes the impedance inequalities (17.19)), while minimizing the value of Cb
or Lb. This problem can be formulated in an alternate but equivalent form: for a given choice of
Cb or Lb, ﬁnd the value of Rf that minimizes the peak output impedance [ 152]. The solutions

694 17 Input Filter Design
Fig. 17.23 Several practical approaches
to damping the single-section input ﬁlter:
(a) Rf –Cb parallel damping, (b) Rf –Lb par-
allel damping, (c) Rf –Lb series damping
(a)
+v1
+
v2
Cb
Rf
Cf
Lf
(b)
+v1
+
v
2
LbRf
Cf
Lf
(c)
+v1
+
v
2
Lb
Rf
Cf
Lf
to this optimization problem, for the three ﬁlter networks of Fig. 17.23, are summarized in this
section. In each case, the quantities ff and R0 f are deﬁned by Eqs. (17.30) and (17.31).
Consider the ﬁlter of Fig.17.23b, with ﬁxed values ofLf, C f , and Lb. Figure 17.24 contains
Bode plots of the ﬁlter output impedance∥Z0( jω)∥ for several values of damping resistance Rf .
For the limiting caseRf =∞, the circuit reduces to the original undamped ﬁlter with inﬁniteQf .
In the limiting case Rf = 0, the ﬁlter is also undamped, but the resonant frequency is increased
because Lb becomes connected in parallel with Lf . Between these two extremes, there must
exist an optimum value of Rf that causes the peak ﬁlter output impedance to be minimized.
It can be shown [ 152, 158] that all magnitude plots must pass through a common point, and
therefore the optimum attains its peak at this point. This fact has been used to derive the design
equations of optimally damped L-C ﬁlter sections.
17.4.1 Rf –Cb Parallel Damping
Optimization of the ﬁlter network of Fig. 17.23a and Sect. 17.3.2 was described in [ 152]. The
high-frequency attenuation of this ﬁlter is not a ﬀected by the choice of Cb, and the high-
frequency asymptote is identical to that of the original undamped ﬁlter. The sole tradeo ﬀin
design of the damping elements for this ﬁlter is in the size of the blocking capacitor Cb vs. the
damping achieved.
```
