---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第8章part 1 - 8 Converter Transfer Functions
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 288-307 > Chunk ID: `chapter-8-part-1`"
---

# 第8章part 1 - 8 Converter Transfer Functions

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 288-307  
> Chunk ID: `chapter-8-part-1`

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
8
Converter Transfer Functions
The engineering design process is comprised of several major steps:
1. Speciﬁcations and other design goals are deﬁned.
2. A circuit is proposed . This is a creative process that draws on the physical insight and
experience of the engineer.
3. The circuit is modeled . The converter power stage is modeled as described in Chap. 7.
Components and other portions of the system are modeled as appropriate, often with vendor-
supplied data.
4. Design-oriented analysis of the circuit is performed. This involves development of equa-
tions that allow element values to be chosen such that speciﬁcations and design goals are
met. In addition, it may be necessary for the engineer to gain additional understanding and
physical insight into the circuit behavior, so that the design can be improved by adding
elements to the circuit or by changing circuit connections.
5. Model veriﬁcation. Predictions of the model are compared to a laboratory prototype, under
nominal operating conditions. The model is reﬁned as necessary, so that the model predic-
tions agree with laboratory measurements.
6. Worst-case analysis (or other reliability and production yield analysis) of the circuit is per-
formed. This involves quantitative evaluation of the model performance, to judge whether
speciﬁcations are met under all conditions. Computer simulation is well suited to this task.
7. Iteration. The above steps are repeated to improve the design until the worst-case behavior
meets speciﬁcations, or until the reliability and production yield are acceptably high.
This chapter covers techniques of design-oriented analysis, measurement of experimental trans-
fer functions, and computer simulation, as needed in steps 4, 5, and 6.
Sections 8.1 to 8.3 discuss techniques for analysis and construction of the Bode plots of the
converter transfer functions, input impedance, and output impedance predicted by the equiva-
lent circuit models of Chap. 7. For example, the small-signal equivalent circuit model of the
buck–boost converter is illustrated in Fig. 7.18c. This model is reproduced in Fig. 8.1, with the
important inputs and terminal impedances identiﬁed. The line-to-output transfer functionGvg(s)
is found by setting duty cycle variations ˆd(s) to zero, and then solving for the transfer function
from ˆvg(s)t oˆv(s):
Gvg(s)= ˆv(s)
ˆvg(s)
⏐⏐⏐⏐⏐⏐ ˆd(s)= 0
(8.1)
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_8
277

278 8 Converter Transfer Functions
+
+
L
RC
1 : D D' : 1
vg(s) Id(s) I (s)
(s) +
(s)
(Vg V) d(s)
Zout(s)Zin(s)
(s) Control input
Line
input
Output
d
i
v
d
ˆ
ˆ ˆ
ˆ
Fig. 8.1 Small-signal equivalent circuit model of the buck–boost converter, as derived in Chap.7
This transfer function describes how variations or disturbances in the applied input voltagevg(t)
lead to disturbances in the output voltage v(t). It is important in design of an output voltage
regulator. For example, in an oﬀ-line power supply, the converter input voltage vg(t) contains
undesired even harmonics of the ac power line voltage. The transfer function Gvg(s)i su s e dt o
determine the eﬀect of these harmonics on the converter output voltage v(t).
The control-to-output transfer functionGvd(s) is found by setting the input voltage variations
ˆvg(s) to zero, and then solving the equivalent circuit model for ˆv(s) as a function of ˆd(s):
Gvd(s)= ˆv(s)
ˆd(s)
⏐⏐⏐
⏐
⏐⏐
ˆvg(s)= 0
(8.2)
This transfer function describes how control input variations ˆd(s) inﬂuence the output voltage
ˆv(s). In an output voltage regulator system, Gvd(s) is a key component of the loop gain and has
a signiﬁcant eﬀect on regulator performance.
The output impedance Zout(s) is found under the conditions that ˆvg(s) and ˆd(s) variations are
set to zero. Zout(s) describes how variations in the load current aﬀect the output voltage. This
quantity is also important in voltage regulator design. It may be appropriate to deﬁne Zout(s)
either including or not including the load resistance R.
The converter input impedanceZin(s) plays a signiﬁcant role when an electromagnetic inter-
ference (EMI) ﬁlter is added at the converter power input. The relative magnitudes of Zin and
the EMI ﬁlter output impedance inﬂuence whether the EMI ﬁlter disrupts the transfer function
Gvd(s). Design of input EMI ﬁlters is the subject of Chap. 17.
An objective of this chapter is the construction of Bode plots of the important transfer func-
tions and terminal impedances of switching converters. For example, Fig. 8.2 illustrates the
magnitude and phase plots of Gvd(s) for the buck–boost converter model of Fig. 8.1. Rules for
construction of magnitude and phase asymptotes are reviewed in Sect. 8.1, including two types
of features that often appear in converter transfer functions: resonances and right half-plane
zeroes. Bode diagrams of the small-signal transfer functions of the buck–boost converter are
derived in detail in Sect.8.2, and the transfer functions of the basic buck, boost, and buck–boost
converters are tabulated. The physical origins of the right half-plane zero are also described.
Ad iﬃculty usually encountered in circuit analysis (step 4 of the above list) is the complex-
ity of the circuit model: practical circuits may contain hundreds of elements, and hence their

8.1 Review of Bode Plots 279
f
0˚
–90˚
–180˚
–270˚
|| Gvd ||
Gd0 =
|| Gvd || Gvd
0 dBV
–20 dBV
–40 dBV
20 dBV
40 dBV
60 dBV
80 dBV
Q =
Gvd
10-1/2Q f0
101/2Q f0
0˚
–20 dB/decade
–40 dB/decade
–270˚
fz /10
10fz
1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
f0
V
DD' D'R C
L
D'
2 LC
D'2R
2 DL
(RHP)
fz
DVg
(D')3RC
Vg
2D'LC
Fig. 8.2 Bode plot of control-to-output transfer function predicted by the model of Fig.8.1, with analyti-
cal expressions for the important features
analysis may lead to complicated derivations, intractable equations, and lots of algebra mis-
takes. Design-oriented analysis [78] is a collection of tools and techniques that can alleviate
these problems. Some tools for approaching the design of a complicated converter system are
described in this chapter. Writing the transfer functions in normalized form directly exposes the
important features of the response. Analytical expressions for these features, as well as for the
asymptotes, lead to simple equations that are useful in design. Well-separated roots of trans-
fer function polynomials can be approximated in a simple way. Sect. 8.3 describes a graphical
method for constructing Bode plots of transfer functions and impedances, essentially by inspec-
tion. This method can: (1) reduce the amount of algebra and associated algebra mistakes; (2)
lead to greater insight into circuit behavior, which can be applied to design the circuit; and (3)
lead to the insight necessary to make suitable approximations that render the equations tractable.
Some more advanced techniques of design-oriented analysis are covered in Part IV.
Experimental measurement of transfer functions and impedances (needed in step 4, model
veriﬁcation) is discussed in Sect. 8.5. Use of computer simulation to plot converter transfer
functions (as needed in step 6, worst-case analysis) is covered in Chap. 14.
8.1 Review of Bode Plots
A Bode plot is a plot of the magnitude and phase of a transfer function or other complex-valued
quantity, vs. frequency. Magnitude in decibels and phase in degrees are plotted vs. frequency, us-
ing semi-logarithmic axes. The magnitude plot is eﬀectively a log–log plot, since the magnitude
is expressed in decibels and the frequency axis is logarithmic.

280 8 Converter Transfer Functions
The magnitude of a dimensionless quantity G can be expressed in decibels as follows:
∥ G∥dB= 20 log10 (∥ G∥) (8.3)
Decibel values of some simple magnitudes are listed in Table 8.1. Care must be used when the
magnitude is dimensionless. Since it is not proper to take the logarithm of a quantity having
dimensions, the magnitude must ﬁrst be normalized. For example, to express the magnitude of
an impedance Z in decibels, we should normalize by dividing by a base impedance R
base:
∥ Z∥dB= 20 log10
⎦∥ Z∥
Rbase
)
(8.4)
Table 8.1 Expressing magnitudes in decibels
Actual magnitude Magnitude in dB
1/2 −6d B
10 d B
26 d B
5= 10/22 0 d B −6d B= 14 dB
10 20 dB
1000= 103 3· 20 dB= 60 dB
The value of Rbase is arbitrary, but we need
to tell others what value we have used. So
if ∥ Z∥ is 5 Ω, and we choose Rbase =
10 Ω, then we can say that ∥ Z∥dB =
20 log10(5Ω/10Ω)=−6 dB with respect to
10Ω. A common choice is Rbase = 1Ω; deci-
bel impedances expressed with Rbase = 1Ω
are said to be expressed in dB Ω.S o5 Ωis
equivalent to 14 dBΩ. Current switching har-
monics at the input port of a converter are of-
ten expressed in dB μA, or dB using a base
current of 1 μA : 60 dB μA is equivalent to
1000 μA, or 1 mA.
The magnitude Bode plots of functions equal to powers off are linear. For example, suppose
that the magnitude of a dimensionless quantity G( f )i s
∥ G∥=
⎦f
f0
)n
(8.5)
where f0 and n are constants. The magnitude in decibels is
∥ G∥dB= 20 log10
⎦f
f0
)n
= 20n log10
⎦f
f0
)
(8.6)
This equation is plotted in Fig.8.3, for several values ofn. The magnitudes have value 1⇒0d B
at frequency f = f0. They are linear functions of log 10( f ). The slope is the change in ∥ G∥dB
arising from a unit change in log 10( f ); a unit increase in log 10( f ) corresponds to a factor of
10, or a decade, increase in f .F r o mE q . (8.6), a decade increase in f leads to an increase in
∥ G∥dB of 20n dB. Hence, the slope is 20 n dB per decade. Equivalently, we can say that the
slope is 20n log10(2)≈6n dB per octave, where an octave is a factor of 2 change in frequency.
In practice, the magnitudes of most frequency-dependent functions can usually be approximated
over a limited range of frequencies by functions of the form (8.5); over this range of frequencies,
the magnitude Bode plot is approximately linear with slope 20n dB/decade.
A simple transfer function whose magnitude is of the form (8.5)i st h epole at the origin:
G(s)= 1
⎦s
ω0
) (8.7)

8.1 Review of Bode Plots 281
f
f0
2
f
f0
2
0 dB
20 dB
40 dB
60 dB
f
log scale
f
00.1f0 10f0
f
f0
f
f0
1
n = 1
n = 2
n
n20 dB/decade
40 dB/decade
Fig. 8.3 Magnitude Bode plots of functions which vary as f n are linear, with slope n dB per decade
The magnitude is
∥ G( jω))∥= 1

jω
ω0


= 1
⎦ω
ω0
) (8.8)
If we deﬁne f=ω/2πand f0=ω0/2π,t h e nE q .(8.8) becomes
∥ G∥=
⎦f
f0
)−1
(8.9)
which is of the form of Eq. ( 8.5) with n=−1. As illustrated in Fig. 8.3, the magnitude Bode
plot of the pole at the origin ( 8.7) has a−20 dB per decade slope, and passes through 0 dB at
frequency f= f0.
+
R
Cv1(s)
+
v2(s)
Fig. 8.4 Simple R–C low-pass ﬁlter example
8.1.1 Single-Pole Response
Consider the simpleR–C low-pass ﬁlter illustrated
in Fig. 8.4. The transfer function is given by the
voltage divider ratio
G(s)= v2(s)
v1(s)=
1
sC
1
sC+ R
(8.10)
This transfer function is a ratio of voltages, and
hence is dimensionless. By multiplying the numer-
ator and denominator by sC, we can express the
transfer function as a rational fraction:

282 8 Converter Transfer Functions
G(s)= 1
1+ sRC (8.11)
The transfer function now coincides with the following standard normalized form for a single
pole:
G(s)= 1⎦
1+ s
ω0
) (8.12)
The parameterω0 = 2πf0 is found by equating the coe ﬃcients of s in the denominators of
Eqs. (8.11) and (8.12). The result is
ω0= 1
RC (8.13)
Since R and C are real positive quantities, ω0 is also real and positive. The denominator of
Eq. (8.12) contains a root at s=−ω0, and hence G(s) contains a real pole in the left half of the
complex plane.
Im(G(j ))
Re(G(j ))
G(j )
||G(j ) ||
G(j )
Fig. 8.5 Magnitude and phase of the
complex-valued function G( jω)
To ﬁnd the magnitude and phase of the trans-
fer function, we let s = jω, where j is the square
root of−1. We then ﬁnd the magnitude and phase of
the resulting complex-valued function. With s= jω,
Eq. (8.12) becomes
G ( jω)= 1⎦
1+ jω
ω0
)=
1−jω
ω0
1+
⎦ω
ω0
)2 (8.14)
The complex-valued G( jω) is illustrated in Fig. 8.5,
for one value ofω. The magnitude is
G ( jω)
=
√[Re ⎦G ( jω) )]2+ [Im ⎦G ( jω) )]2
= 1√
1+
⎦ω
ω0
)2
(8.15)
Here, we have assumed thatω0 is real. In decibels, the magnitude is
∥ G( jω)∥dB=−20 log10
⎛⎜⎜⎜⎜⎜⎜⎜⎝
√
1+
⎦ω
ω0
)2
⎞⎟⎟⎟⎟⎟⎟⎟⎠dB (8.16)
The easy way to sketch the magnitude Bode plot of G is to investigate the asymptotic behavior
for large and small frequency.
For small frequency,ω≪ω0 and f≪ f0, it is true that
⎦ω
ω0
)
≪ 1 (8.17)

8.1 Review of Bode Plots 283
Fig. 8.6 Magnitude
asymptotes for the
single real pole trans-
fer function
f
f0
–1
–20 dB/decade
ff00.1f0 10f0
0 dB
–20 dB
–40 dB
–60 dB
0 dB
|| G(j ) ||dB
The (ω/ω0)2 term of Eq. (8.15) is therefore much smaller than 1, and hence Eq. (8.15) becomes
∥ G( jω)∥≈1√
1
= 1 (8.18)
In decibels, the magnitude is approximately
∥ G( jω)∥dB≈0 dB (8.19)
Thus, as illustrated in Fig. 8.6, at low frequency∥ G( jω)∥dB is asymptotic to 0 dB.
At high frequency,ω≫ω0 and f≫ f0. In this case, it is true that
⎦ω
ω0
)
≫ 1 (8.20)
We can then say that
1+
⎦ω
ω0
)2
≈
⎦ω
ω0
)2
(8.21)
Hence, Eq. (8.15) now becomes

G ( jω)

≈ 1
√⎦ω
ω0
)2
=
⎦f
f0
)−1
(8.22)
This expression coincides with Eq. ( 8.5), with n=−1. So at high frequency, ∥ G( jω)∥dB has
slope−20 dB per decade, as illustrated in Fig. 8.6. Thus, the asymptotes of∥ G( jω)∥ are equal
to 1 at low frequency, and (f/ f0)−1 at high frequency. The asymptotes intersect at f0. The actual
magnitude tends toward these asymptotes at very low frequency and very high frequency. In the
vicinity of the corner frequency f0, the actual curve deviates somewhat from the asymptotes.
The deviation of the exact curve from the asymptotes can be found by simply evaluating
Eq. (8.15). At the corner frequency f= f0,E q .(8.15) becomes

G ( jω
0)

= 1
1+
⎦ω0
ω0
)2 = 1√
2
(8.23)

284 8 Converter Transfer Functions
Fig. 8.7 Deviation of the actual curve
from the asymptotes, real pole
–20 dB/decade
f
f0
0 dB
–10 dB
–20 dB
–30 dB
||G(j ) || dB
3 dB1 dB
0.5f0 1 dB
2f0
In decibels, the magnitude is
∥ G( jω0)∥dB=−20 log10
⎛⎜⎜⎜⎜⎜⎜⎜⎝
√
1+
⎦ω0
ω0
)2
⎞⎟⎟⎟⎟⎟⎟⎟⎠≈−3 dB (8.24)
So the actual curve deviates from the asymptotes by−3 dB at the corner frequency, as illustrated
in Fig. 8.7. Similar arguments show that the actual curve deviates from the asymptotes by−1d B
at f= f0/2 and at f= 2 f0.
The phase of G( jω)i s
∠G( jω)= tan−1
⎦Im(G( jω))
Re(G( jω))
)
(8.25)
Insertion of the real and imaginary parts of Eq. (8.14) into Eq. (8.25) leads to
∠G( jω)=−tan−1
⎦ω
ω0
)
(8.26)
This function is plotted in Fig.8.8. It tends to 0◦at low frequency and to−90◦at high frequency.
At the corner frequency f= f0, the phase is−45◦.
Fig. 8.8 Exact phase plot,
real pole
0
f
0.01f0 0.1f0 f0 10f0 100f0
G(j )
f0
0 asymptote
 asymptote

8.1 Review of Bode Plots 285
Fig. 8.9 One choice for
the mid-frequency phase
asymptote, which correctly
predicts the actual slope at
f= f
0
0
f
0.01f0 0.1f0 f0 100f0
G(j )
f0
fa = f0 / 4.81
fb = 4.81 f0
Since the high-frequency and low-frequency phase asymptotes do not intersect, we need a
third asymptote to approximate the phase in the vicinity of the corner frequency f0.O n ew a y
to do this is illustrated in Fig. 8.9, where the slope of the asymptote is chosen to be identical to
the slope of the actual curve at f = f0. It can be shown that, with this choice, the asymptote
intersection frequencies fa and fb are given by
fa = f0e−π/2≈f0
4.81 (8.27)
fb = f0eπ/2≈4.81 f0
A simpler choice, which better approximates the actual curve, is
fa = f0
10 (8.28)
fb = 10 f0
This asymptote is compared to the actual curve in Fig.8.10. The pole causes the phase to change
over a frequency span of approximately two decades, centered at the corner frequency. The slope
of the asymptote in this frequency span is−45
◦per decade. At the break frequencies fa and fb,
the actual phase deviates from the asymptotes by tan−1(0.1)= 5.7◦.
The magnitude and phase asymptotes for the single-pole response are summarized in
Fig. 8.11. It is good practice to consistently express single-pole transfer functions in the nor-
malized form of Eq. (8.12). Both terms in the denominator of Eq. (8.12) are dimensionless, and
the coeﬃcient of s0 is unity. Equation (8.12) is easy to interpret, because of its normalized form.
At low frequencies, where the ( s/ω0) term is small in magnitude, the transfer function is ap-
proximately equal to 1. At high frequencies, where the (s/ω0) term has magnitude much greater
than 1, the transfer function is approximately ( s/ω0)−1. This leads to a magnitude of ( f/ f0)−1.
The corner frequency is f0 =ω0/2π. So the transfer function is written directly in terms of its
salient features, that is, its asymptotes and its corner frequency.

286 8 Converter Transfer Functions
0
f
0.01f0 0.1f0 f0 100f0
G(j )
f0
fa = f0/10
fb = 10f0
Fig. 8.10 A simpler choice for the mid-frequency phase asymptote, which better approximates the curve
over the entire frequency range
0˚G(j )
f0
–45˚
f0/10
10f0
–90˚
5.7˚
5.7˚
–45˚/decade
–20 dB/decade
f0
|| G(j )|| dB 3 dB1 dB
0.5f0 1 dB
2f0
0 dB
Fig. 8.11 Summary of the magnitude and phase Bode plot for the single real pole

8.1 Review of Bode Plots 287
8.1.2 Single Zero Response
A single zero response contains a root in the numerator of the transfer function, and can be
written in the following normalized form:
G(s)=
⎦
1+ s
ω0
)
(8.29)
This transfer function has magnitude
∥ G( jω)∥=
√
1+
⎦ω
ω0
)2
(8.30)
At low frequency, f≪ f0=ω0/2π, the transfer function magnitude tends to 1⇒0 dB. At high
frequency, f ≫ f0, the transfer function magnitude tends to ( f/ f0). As illustrated in Fig. 8.12,
the high-frequency asymptote has slope+20 dB/decade. The phase is given by
∠G( jω)= tan−1
⎦ω
ω0
)
(8.31)
With the exception of a minus sign, the phase is identical to Eq. (8.26). Hence, suitable asymp-
totes are as illustrated in Fig. 8.12. The phase tends to 0◦at low frequency and to+90◦at high
frequency. Over the interval f0/10< f< 10 f0, the phase asymptote has a slope of+45◦/decade.
0˚G(j )
f0
45˚
f0 /10
10f0 +90˚
5.7˚
5.7˚
+45˚/decade
+20 dB/decade
f0
|| G(j ) || dB
3 dB1 dB
0.5f0 1 dB
2f0
0 dB
Fig. 8.12 Summary of the magnitude and phase Bode plot for the single real zero

288 8 Converter Transfer Functions
8.1.3 Right Half-Plane Zero
Right half-plane zeroes are often encountered in the small-signal transfer functions of switching
converters. These terms have the following normalized form:
G(s)=
⎦
1−s
ω0
)
(8.32)
The root of Eq. (8.32) is positive, and hence lies in the right half of the complex s-plane. The
right half-plane zero is also sometimes called a nonminimum phase zero. Its normalized form,
Eq. (8.32), resembles the normalized form of the (left half-plane) zero of Eq. ( 8.29), with the
exception of a minus sign in the coeﬃcient of s. The minus sign causes a phase reversal at high
frequency.
The transfer function has magnitude
∥ G( jω)∥=
√
1+
⎦ω
ω0
)2
(8.33)
This expression is identical to Eq. (8.30). Hence, it is impossible to distinguish a right half-plane
zero from a left half-plane zero by the magnitude alone. The phase is given by
∠G( jω)=−tan−1
⎦ω
ω0
)
(8.34)
This coincides with the expression for the phase of the single pole, Eq. (8.26). So the right half-
plane zero exhibits the magnitude response of the left half-plane zero, but the phase response of
the pole. Magnitude and phase asymptotes are summarized in Fig. 8.13.
+20 dB/decade
f0
|| G(j ) || dB
3 dB1 dB
0.5f0 1 dB
2f0
0 dB
0˚G(j )
f0
–45˚
f0 /10
10f0
–90˚
5.7˚
5.7˚
–45˚/decade
Fig. 8.13 Summary of the magnitude and phase Bode plot for the single real RHP zero

8.1 Review of Bode Plots 289
8.1.4 Frequency Inversion
Two other forms arise, from inversion of the frequency axis. The inverted pole has the transfer
function
G(s)= 1⎦
1+ω0
s
) (8.35)
As illustrated in Fig.8.14, the inverted pole has a high-frequency gain of 1, and a low-frequency
asymptote having a+ 20 dB/decade slope. This form is useful for describing the gain of high-
pass ﬁlters, and of other transfer functions where it is desired to emphasize the high-frequency
gain, with attenuation of low frequencies. Equation (8.35) is equivalent to
G(s)=
⎦s
ω0
)
⎦
1+ s
ω0
) (8.36)
However, Eq. (8.35) more directly emphasizes that the high-frequency gain is 1.
The inverted zero has the form
G(s)=
⎦
1+ω0
s
)
(8.37)
As illustrated in Fig.8.15, the inverted zero has a high-frequency gain asymptote equal to 1, and
a low-frequency asymptote having a slope equal to −20 dB/decade. An example of the use of
0˚
G(j )
f0
+45˚
f0 /10
10f0
+90˚
5.7˚
5.7˚
–45˚/decade
0 dB
+20 dB/decade
f0
||G(j ) || dB
3 dB
1 dB
0.5f0
1 dB
2f0
Fig. 8.14 Inversion of the frequency axis: summary of the magnitude and phase Bode plots for the
inverted real pole

290 8 Converter Transfer Functions
0˚
G(j )
f0
–45˚
f0 /10
10f0
–90˚
5.7˚
5.7˚
+45˚/decade
–20 dB/decade
f0
|| G(j ) || dB
3 dB
1 dB
0.5f0
1 dB
2f0
0 dB
Fig. 8.15 Inversion of the frequency axis: summary of the magnitude and phase Bode plot for the inverted
real zero
this type of transfer function is the proportional-plus-integral controller, discussed in connection
with feedback loop design in the next chapter. Equation (8.37) is equivalent to
G(s)=
⎦
1+ s
ω0
)
⎦s
ω0
) (8.38)
However, Eq. (8.37) is the preferred form when it is desired to emphasize the value of the high-
frequency gain asymptote.
The use of frequency inversion is illustrated by example in the next section.
8.1.5 Combinations
The Bode diagram of a transfer function containing several pole, zero, and gain terms can be
constructed by simple addition. At any given frequency, the magnitude (in decibels) of the
composite transfer function is equal to the sum of the decibel magnitudes of the individual
terms. Likewise, at a given frequency the phase of the composite transfer function is equal to
the sum of the phases of the individual terms.
For example, suppose that we have already constructed the Bode diagrams of two complex-
valued functions ofω, G
1(ω) and G2(ω). These functions have magnitudes R1(ω) and R2(ω),
and phases θ1(ω) and θ2(ω), respectively. It is desired to construct the Bode diagram of the
product G3(ω)= G1(ω) G2(ω). Let G3(ω) have magnitude R3(ω), and phase θ3(ω). To ﬁnd this
magnitude and phase, we can express G1(ω), G2(ω), and G3(ω) in polar form:

8.1 Review of Bode Plots 291
G1(ω)= R1(ω)ejθ1(ω)
G2(ω)= R2(ω)ejθ2(ω) (8.39)
G3(ω)= R3(ω)ejθ3(ω)
The product G3(ω) can then be expressed as
G3(ω)= G1(ω)G2(ω)= R1(ω)ejθ1(ω)R2(ω)ejθ2(ω) (8.40)
Simpliﬁcation leads to
G3(ω)= (R1(ω)R2(ω)) ej(θ1(ω)+θ2(ω)) (8.41)
Hence, the composite phase is
θ3(ω)= θ1(ω)+θ2(ω) (8.42)
The total magnitude is
R3(ω)= R1(ω)R2(ω) (8.43)
When expressed in decibels, Eq. (8.43) becomes
⏐⏐⏐R3(ω)
⏐⏐⏐dB=
⏐⏐⏐R1(ω)
⏐⏐⏐dB+
⏐⏐⏐R2(ω)
⏐⏐⏐dB (8.44)
So the composite phase is the sum of the individual phases, and when expressed in decibels, the
composite magnitude is the sum of the individual magnitudes. The composite magnitude slope,
in dB per decade, is therefore also the sum of the individual slopes in dB per decade.
For example, consider construction of the Bode plot of the following transfer function:
G(s)= G0⎦
1+ s
ω1
)⎦
1+ s
ω2
) (8.45)
where G0 = 40⇒32 dB, f1 =ω1/2π= 100 Hz, f2 =ω2/2π= 2 kHz. This transfer function
contains three terms: the gainG0, and the poles at frequenciesf1 and f2. The asymptotes for each
of these terms are illustrated in Fig. 8.16.T h eg a i nG0 is a positive real number, and therefore
contributes zero phase shift with the gain 32 dB. The poles at 100 Hz and 2 kHz each contribute
asymptotes as in Fig. 8.11.
At frequencies less than 100 Hz, the G0 term contributes a gain magnitude of 32 dB, while
the two poles each contribute magnitude asymptotes of 0 dB. So the low-frequency composite
magnitude asymptote is 32 dB+ 0d B+ 0d B= 32 dB. For frequencies between 100 Hz and
2k H z , t h eG0 gain again contributes 32 dB, and the pole at 2 kHz continues to contribute a
0 dB magnitude asymptote. However, the pole at 100 Hz now contributes a magnitude asymp-
tote that decreases with a−20 dB per decade slope. The composite magnitude asymptote there-
fore also decreases with a−20 dB per decade slope, as illustrated in Fig. 8.16. For frequencies
greater than 2 kHz, the poles at 100 Hz and 2 kHz each contribute decreasing asymptotes hav-
ing slopes of −20 dB/decade. The composite asymptote therefore decreases with a slope of
−20 dB/decade−20 dB/decade=−40 dB/decade, as illustrated.
The composite phase asymptote is also constructed in Fig. 8.16. Below 10 Hz, all terms
contribute 0
◦asymptotes. For frequencies between f1/10= 10 Hz and f2/10= 200 Hz, the pole
at f1 contributes a decreasing phase asymptote having a slope of−45◦/decade. Between 200 Hz
and 10 f1 = 1 kHz, both poles contribute decreasing asymptotes with−45◦/decade slopes; the

292 8 Converter Transfer Functions
–40 dB/decade
f
|| G ||
 G
 G|| G ||
0˚
–45˚
–90˚
–135˚
–180˚
–60 dB
0 dB
–20 dB
–40 dB
20 dB
40 dB
f1
100 Hz
f2
2 kHz
G0 = 40 32 dB
–20 dB/decade
0 dB
f1/10
10 Hz
f2/10
200 Hz
10f1
1 kHz
10f2
20 kHz
0˚
–45˚/decade
–90˚/decade
–45˚/decade
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 8.16 Construction of magnitude and phase asymptotes for the transfer function of Eq. (8.45). Dashed
lines: asymptotes for individual terms. Solid lines: composite asymptotes
composite slope is therefore −90◦/decade. Between 1 kHz and 10 f2 = 20 kHz, the pole at
f1 contributes a constant−90◦phase asymptote, while the pole at f2 contributes a decreasing
asymptote with−45◦/decade slope. The composite slope is then−45◦/decade. For frequencies
greater than 20 kHz, both poles contribute constant −90◦asymptotes, leading to a composite
phase asymptote of−180◦.
As a second example, consider the transfer function A(s) represented by the magnitude
and phase asymptotes of Fig. 8.17. Let us write the transfer function that corresponds to these
asymptotes. The dc asymptote is A0. At corner frequency f1, the asymptote slope increases
from 0 dB/decade to+20 dB/decade. Hence, there must be a zero at frequencyf1. At frequency
f2, the asymptote slope decreases from+20 dB/decade to 0 dB/decade. Therefore the transfer
function contains a pole at frequency f2. So we can express the transfer function as
A(s)= A0
⎦
1+ s
ω1
)
⎦
1+ s
ω2
) (8.46)
whereω1 andω2 are equal to 2πf1 and 2πf2, respectively.
Fig. 8.17 Magnitude and
phase asymptotes of example
transfer function A(s)
|| A ||
 A
f1
f2
|| A0 ||dB +20 dB/decade
f1 /10
10f1 f2 /10
10f2
–45˚/decade+45˚/dec
0˚
|| A ||dB
0˚
–90˚

8.1 Review of Bode Plots 293
We can use Eq. (8.46) to derive analytical expressions for the asymptotes. For f< f1, and
letting s= jω, we can see that the (s/ω1) and (s/ω2) terms each have magnitude less than 1. The
asymptote is derived by neglecting these terms. Hence, the low-frequency magnitude asymptote
is






A
0
⎛⎜⎜⎜⎜⎜⎝1+

s
ω1
⎞⎟⎟⎟⎟⎟⎠
⎛⎜⎜⎜⎜⎜⎝1+

s
ω2
⎞⎟⎟⎟⎟⎟⎠






s= jω
= A0
1
1= A0 (8.47)
For f1< f< f2, the numerator term (s/ω1) has magnitude greater than 1, while the denominator
term ( s/ω2) has magnitude less than 1. The asymptote is derived by neglecting the smaller
terms:






A
0
⎦
1+ s
ω1
)
⎛⎜⎜⎜⎜⎜
⎝1+

sω2
⎞⎟⎟⎟⎟⎟
⎠






s= jω
= A0



s
ω1



s= jω
1 = A0
ω
ω1
= A0
f
f1
(8.48)
This is the expression for the mid-frequency magnitude asymptote of A(s). For f > f2,t h e
(s/ω1) and ( s/ω2) terms each have magnitude greater than 1. The expression for the high-
frequency asymptote is therefore:





A
0
⎦
1+ s
ω1
)
⎦
1+ s
ω2
)





s= jω
= A0


s
ω1


s= jω

s
ω2


s= jω
= A0
ω2
ω1
= A0
f2
f1
(8.49)
We can conclude that the high-frequency gain is
A∞= A0
f2
f1
(8.50)
Thus, we can derive analytical expressions for the asymptotes.
The transfer function A(s) can also be written in a second form, using inverted poles and
zeroes. Suppose that A(s) represents the transfer function of a high-frequency ampliﬁer, whose
dc gain is not important. We are then interested in expressing A(s) directly in terms of the high-
frequency gain A∞. We can view the transfer function as having an inverted pole at frequency
f2, which introduces attenuation at frequencies less than f2. In addition, there is an inverted zero
at f= f1.S o A(s) could also be written as
A(s)= A∞
⎦
1+ω1
s
)
⎦
1+ω2
s
) (8.51)
It can be veriﬁed that Eqs. (8.51) and (8.46) are equivalent.

294 8 Converter Transfer Functions
8.1.6 Quadratic Pole Response: Resonance
+
L
CRv1(s)
+
v2(s)
Fig. 8.18 Two-pole low-pass ﬁlter example
Consider next the transfer function
G(s) of the two-pole low-pass ﬁlter of
Fig. 8.18. The buck converter contains
a ﬁlter of this type. When manipulated
into canonical form, the models of the
boost and buck–boost also contain simi-
lar ﬁlters. One can show that the transfer
function of this network is
G(s)= v
2(s)
v1(s)= 1
1+ s L
R+ s2LC
(8.52)
This transfer function contains a second-order denominator polynomial, and is of the form
G(s)= 1
1+ a1 s+ a2 s2 (8.53)
with a1= L/R and a2= LC.
To construct the Bode plot of this transfer function, we might try to factor the denominator
into its two roots:
G(s)= 1⎦
1−s
s1
)⎦
1−s
s2
) (8.54)
Use of the quadratic formula leads to the following expressions for the roots:
s1 =−a1
2a2
⎡⎢⎢⎢
⎢⎢⎢⎣1−
√1−4a2
a2
1
⎤⎥⎥⎥
⎥⎥⎥⎦ (8.55)
s
2 =−a1
2a2
⎡⎢⎢⎢⎢⎢⎢⎣1+
√
1−4a2
a2
1
⎤⎥⎥⎥⎥⎥⎥⎦ (8.56)
If 4a2 ≤a2
1, then the roots are real. Each real pole then exhibits a Bode diagram as derived in
Sect. 8.1.1, and the composite Bode diagram can be constructed as described in Sect. 8.1.5 (but
a better approach is described in Sect. 8.1.7).
If 4a2> a2
1, then the roots (8.55) and (8.56) are complex. In Sect. 8.1.1, the assumption was
made thatω0 is real; hence, the results of that section cannot be applied to this case. We need to
do some additional work, to determine the magnitude and phase for the case when the roots are
complex.
The transfer functions of Eqs. ( 8.52) and ( 8.53) can be written in the following standard
normalized form:
G(s)= 1
1+ 2ζs
ω0
+
⎦s
ω0
)2 (8.57)

8.1 Review of Bode Plots 295
If the coeﬃcients a1 and a2 are real and positive, then the parametersζandω0 are also real and
positive. The parameterω0 is again the angular corner frequency, and we can deﬁnef0=ω0/2π.
The parameterζis called the damping factor:ζcontrols the shape of the transfer function in the
vicinity of f= f0. An alternative standard normalized form is
G(s)= 1
1+ s
Qω0
+
⎦s
ω0
)2 (8.58)
where
Q= 1
2ζ (8.59)
The parameter Q is called the quality factor of the circuit, and is a measure of the dissipation
in the system. A more general deﬁnition of Q, for sinusoidal excitation of a passive element or
network, is
Q= 2π (peak stored energy)
(energy dissipated per cycle) (8.60)
For a second-order passive system, Eqs. (8.59) and (8.60) are equivalent. We will see that theQ-
factor has a very simple interpretation in the magnitude Bode diagrams of second-order transfer
functions.
Analytical expressions for the parametersQ andω0 can be found by equating like powers of
s in the original transfer function, Eq. (8.52), and in the normalized form, Eq. (8.58). The result
is
f0 =ω0
2π= 1
2π
√
LC
(8.61)
Q= R
√
C
L
The roots s1 and s2 of Eqs. (8.55) and ( 8.56) are real when Q≤0.5, and are complex when
Q> 0.5.
The magnitude of G is
G ( jω)
= 1√⎛⎜⎜⎜⎜⎜⎝1−
⎦ω
ω0
)2⎞⎟⎟⎟⎟⎟⎠
2
+ 1
Q2
⎦ω
ω0
)2
(8.62)
Asymptotes of∥ G∥ are illustrated in Fig. 8.19. At low frequencies, (ω/ω0)≪ 1, and hence
Fig. 8.19 Magni-
tude asymptotes for
the two-pole transfer
function
f
f0
–2
–40 dB/decade
ff00.1f0 10f0
0 dB
|| G(j ) ||dB
0 dB
–20 dB
–40 dB
–60 dB

296 8 Converter Transfer Functions

G

→1f o r ω≪ω
0 (8.63)
At high frequencies where (ω/ω0)≫ 1, the (ω/ω0)4 term dominates the expression inside the
radical of Eq. (8.62). Hence, the high-frequency asymptote is
G
→
⎦f
f0
)−2
forω≫ω0 (8.64)
This expression coincides with Eq. (8.5), with n=−2. Therefore, the high-frequency asymptote
has slope−40 dB/decade. The asymptotes intersect at f= f0, and are independent of Q.
|| G ||
f0
| Q |dB0 dB
–40 dB/decade
Fig. 8.20 Important features of the magnitude Bode
plot, for the two-pole transfer function
The parameter Q aﬀects the deviation of
the actual curve from the asymptotes, in the
neighborhood of the corner frequency f
0.T h e
exact magnitude at f= f0 is found by substi-
tution ofω=ω0 into Eq. (8.62):
G ( jω0)
= Q (8.65)
So the exact transfer function has magnitude
Q at the corner frequency f0. In decibels,
Eq. (8.65)i s

G ( jω
0)


dB=
⏐⏐
⏐Q
⏐⏐
⏐
dB (8.66)
So if, for example, Q= 2⇒6 dB, then the
actual curve deviates from the asymptotes by 6 dB at the corner frequency f = f0. Salient
features of the magnitude Bode plot of the second-order transfer function are summarized in
Fig. 8.20.
The phase of G is
∠G ( jω)=−tan−1
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
1
Q
⎦ω
ω0
)
1−
⎦ω
ω0
)2
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
(8.67)
The phase tends to 0◦at low frequency and to−180◦at high frequency. At f = f0, the phase
is−90◦. As illustrated in Fig. 8.21, increasing the value of Q causes a sharper phase change be-
tween the 0◦and−180◦asymptotes. We again need a mid-frequency asymptote, to approximate
the phase transition in the vicinity of the corner frequency f0, as illustrated in Fig. 8.22.A si n
the case of the real single pole, we could choose the slope of this asymptote to be identical to
the slope of the actual curve at f= f0. It can be shown that this choice leads to the following
asymptote break frequencies:
fa=
⎦
eπ/2)−1
2Q
f0
fb=
⎦
eπ/2) 1
2Q
f0
(8.68)
```
