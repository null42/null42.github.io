---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第8章part 2 - 8 Converter Transfer Functions
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 308-327 > Chunk ID: `chapter-8-part-2`"
---

# 第8章part 2 - 8 Converter Transfer Functions

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 308-327  
> Chunk ID: `chapter-8-part-2`

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
8.1 Review of Bode Plots 297
Fig. 8.21 Phase plot, second-
order poles. Increasing Q
causes a sharper phase change
f / f0
G
0.1 1 10
Increasing Q
–180º
–90º
0º
Fig. 8.22 One choice for the
mid-frequency phase asymptote
of the two-pole response, which
correctly predicts the actual
slope at f= f
0
–180º
–90º
0º
f / f0
G
0.1 1 10
f0
–90º
fb
fa0º
–180º
A better choice, which is consistent with the approximation (8.28) used for the real single pole,
is
fa= 10−1/2Q f0
fb= 101/2Q f0
(8.69)
With this choice, the mid-frequency asymptote has slope−180 Q degrees per decade. The phase
asymptotes are summarized in Fig.8.23. With Q= 0.5, the phase changes from 0◦to−180◦over
a frequency span of approximately two decades, centered at the corner frequency f0. Increasing
the Q causes this frequency span to decrease rapidly.
Second-order response magnitude and phase curves are plotted in Figs. 8.24 and 8.25.

298 8 Converter Transfer Functions
Fig. 8.23 A simpler choice
for the mid-frequency phase
asymptote, which better approx-
imates the curve over the entire
frequency range and is consis-
tent with the asymptote used for
real poles
–180º
–90º
0º
f / f0
G
0.1 1 10
f0
–90º
fb
fa0º
–180º
Fig. 8.24 Exact
magnitude curves,
two-pole response,
for several values of
Q
Q = 
Q = 5
Q = 2
Q = 1
Q = 0.7
Q = 0.5
Q = 0.2
Q = 0.1
–20 dB
–10 dB
0 dB
10 dB
1 325.03.0 0.7
f / f0
|| G ||dB
8.1.7 The Low- Q Approximation
As mentioned in Sect. 8.1.6, when the roots of second-order denominator polynomial of
Eq. (8.53) are real, then we can factor the denominator, and construct the Bode diagram using
the asymptotes for real poles. We would then use the following normalized form:
G(s)= 1⎦
1+ s
ω1
)⎦
1+ s
ω2
) (8.70)

8.1 Review of Bode Plots 299
Fig. 8.25 Exact
phase curves, two-
pole response, for
several values of Q
Q = 0.1
Q = 0.5
Q = 0.7
Q = 1
Q = 2
Q =5
Q = 10
Q = 
0111.0
f / f0
G
Q = 0.2
–180º
–135º
–90º
–45º
0º
This is a particularly desirable approach when the corner frequencies ω1 andω2 are well sepa-
rated in value.
The diﬃculty in this procedure lies in the complexity of the quadratic formula used to ﬁnd
the corner frequencies. Expressing the corner frequenciesω1 andω2 in terms of the circuit ele-
ments R, L, C, etc., invariably leads to complicated and unilluminating expressions, especially
when the circuit contains many elements. Even in the case of the simple circuit of Fig. 8.18,
whose transfer function is given by Eq. (8.52), the conventional quadratic formula leads to the
following complicated formula for the corner frequencies:
ω1,ω2=
L
R±
√
⎦L
R
)2
−4LC
2LC (8.71)
This equation yields essentially no insight regarding how the corner frequencies depend on
the element values. For example, it can be shown that when the corner frequencies are well
separated in value, they can be expressed with high accuracy by the much simpler relations
ω1≈R
L,ω 2≈1
RC (8.72)
In this case,ω1 is essentially independent of the value ofC, andω2 is essentially independent of
L, yet Eq. (8.71) apparently predicts that both corner frequencies are dependent on all element
values. The simple expressions of Eq. (8.72) are far preferable to Eq. ( 8.71), and can be easily
derived using the low-Q approximation [79].

300 8 Converter Transfer Functions
Let us assume that the transfer function has been expressed in the standard normalized form
of Eq. (8.58), reproduced below:
G(s)= 1
1+ s
Qω0
+
⎦s
ω0
)2 (8.73)
For Q≤0.5, let us use the quadratic formula to write the real roots of the denominator polyno-
mial of Eq. (8.73)a s
ω1=ω0
Q
1−
√
1−4Q2
2 (8.74)
ω2=ω0
Q
1+
√
1−4Q2
2 (8.75)
The corner frequencyω2 can be expressed as
ω2=ω0
Q F(Q) (8.76)
where F(Q) is deﬁned as [79]:
F(Q)= 1
2
⎦
1+
√
1−4Q2
)
(8.77)
Note that, when Q≪ 0.5, then 4Q2≪ 1 and F(Q) is approximately equal to 1. We then obtain
ω2≈ω0
Q for Q≪ 1
2 (8.78)
The function F(Q) is plotted in Fig. 8.26. It can be seen that F(Q) approaches 1 very rapidly as
Q decreases below 0.5.
To derive a similar approximation forω1, we can multiply and divide Eq. ( 8.74)b y F(Q),
Eq. (8.77). Upon simpliﬁcation of the numerator, we obtain
ω1= Qω0
F(Q) (8.79)
Fig. 8.26 F(Q)v s .Q,a s
g i v e nb yE q . (8.77). The
approximation F(Q) = 1
is within 10% of the exact
value for Q< 3
F(Q)
0 0.1 0.2 0.3 0.4 0.5
Q
0
0.25
0.5
0.75
1

8.1 Review of Bode Plots 301
Fig. 8.27 Magnitude asymptotes pre-
dicted by the low- Q approximation.
Real poles occur at frequencies Qf 0 and
f0/Q
f2 = f0F(Q)
Q
f0
Q
–40 dB/decade
f0
0 dB
|| G ||dB
–20 dB/decade
f1 = Qf0
F(Q)
Qf0
Again, F(Q) tends to 1 for small Q. Hence,ω1 can be approximated as
ω1≈Qω0 for Q≪ 1
2 (8.80)
Magnitude asymptotes for the low- Q case are summarized in Fig. 8.27.F o r Q< 0.5, the
two poles atω0 split into real poles. One real pole occurs at corner frequency ω1 <ω0, while
the other occurs at corner frequencyω2 >ω0. The corner frequencies are easily approximated,
using Eqs. (8.78) and (8.80).
For the ﬁlter circuit of Fig. 8.18, the parameters Q andω0 are given by Eq. ( 8.61). For
the case when Q ≪ 0.5, we can derive the following analytical expressions for the corner
frequencies, using Eqs. (8.78) and (8.80):
ω1≈Qω0= R
√
C
L
1√
LC
= R
L
ω2≈ω0
Q = 1√
LC
1
R
√
C
L
= 1
RC
(8.81)
So the low-Q approximation allows us to derive simple design-oriented analytical expressions
for the corner frequencies.
8.1.8 The High- Q Approximation
Another case of interest is the determination of the Q-factor of a high- Q resonant circuit con-
taining multiple resistive elements. Consider, for example, the resonant L–C circuit illustrated
in Fig. 8.28, which contains load resistor R and an additional resistor RC in series with the ca-
pacitor. In the case of large R and small RC, the circuit approaches an undamped L–C network
having resonant frequency
Fig. 8.28 Two-pole low-pass ﬁlter with
two resistive elements +
L
C
Rv1(s)
+
v2(s)
RC

302 8 Converter Transfer Functions
ω0= 1√
LC
(8.82)
When RC is negligibly small but R is signiﬁcant, then the circuit previously considered in
Sect. 8.1.6 (Fig. 8.18) is obtained. We previously found that this circuit exhibits a Q-factor
given by
Qload= R
R0
(8.83)
with
R0=
√
L
C
leading to the transfer function
G(s)= 1
1+ s
Qloadω0
+
⎦s
ω0
)2 (8.84)
Conversely, in the case where the load resistor R is very large but RC is signiﬁcant, we can
analyze the circuit to ﬁnd the following transfer function:
G(s)=
⎦
1+ s
ωz
)
1+ s
QCω0
+
⎦s
ω0
)2 (8.85)
The corner frequencyω0 is again given by Eq. (8.82), but the Q-factor is
QC = R0
RC
(8.86)
So individually, the two damping cases lead to similar second-order denominators, whose Q
factors depend on the individual resistor values.
For the case when R and RC simultaneously cause signiﬁcant damping, we can analyze the
circuit of Fig. 8.28 to show that the transfer function is
G(s)= 1+ sRCC
1+ s
⎦L
R+ RCC
)
+ s2LC
⎦
1+ RC
R
) (8.87)
This equation can be expressed in the following normalized form:
G(s)=
⎦
1+ s
ωz
)
1+
⎦s
ω0
)⎦ 1
Qload
+ 1
QC
)
+
⎦s
ω0
)2 ⎦
1+ 1
Qload QC
) (8.88)

8.1 Review of Bode Plots 303
where
ω0= 1√
LC
Qload= R
R0
QC = R0
RC
R0=
√
L
C
(8.89)
If Qload≫ 1 and QC ≫ 1, then
1+ 1
Qload QC
≈1 (8.90)
Equation (8.88) can then be simpliﬁed as follows:
G(s)≈
⎦
1+ s
ωz
)
1+
⎦s
ω0
) ⎛⎜⎜⎜⎜⎜⎝
1
Qload
 QC
⎞⎟⎟⎟⎟⎟⎠+
⎦s
ω0
)2 (8.91)
Thus, for the case when R and RC simultaneously cause signiﬁcant damping, the composite
Q-factor can be estimated from Qload and QC by use of the High-Q Approximation:
Q≈Qload
 QC = 1
1
Qload
+ 1
QC
(8.92)
The notation x∥ y denotes inverse addition as shown above. This approximation for theQ-factor
of the denominator poles is accurate provided that
Qload≫ 1 and QC ≫ 1 (8.93)
The two damping terms Qload and QC aﬀect both the exact frequency and the exactQ-factor.
We can express Eq. (8.88) in the following standard normalized form:
G(s)=
⎦
1+ s
ωz
)
1+
⎦s
ωe
)⎦1
Qe
)
+
⎦s
ωe
)2 (8.94)
where the exact corner frequencyωe and exact Q-factor Qe are given by
ωe= ω0
FH (Qload QC), Qe=
⎦
Qload
 QC
)
FH (Qload QC) (8.95)

304 8 Converter Transfer Functions
0.5 1 2 5 10 20 50
1
1.1
1.2
1.3
1.4
1.5
1.6
1.7
Q1Q2
FH(Q1Q2)
Fig. 8.29 FH (Q1Q2)v s .Q1Q2,a sg i v e nb yE q .(8.96). The approximation FH (Q1Q2)≈1 is within 10%
of the correct value for Q1Q2 > 5
and with
FH (Q1Q2)=
√
1+ 1
Q1Q2
(8.96)
The factor FH(Q1Q2) is plotted in Fig. 8.29. It can be seen that this factor converges to 1 as the
product of the two Q factors is increased above 1.
In summary, the high-Q approximation states that in a resonant circuit damped by two ele-
ments that individually induceQ-factors of Q1 and Q2, the composite Q-factor is approximately
Q1∥Q2. This approximation facilitates derivation of simple design-oriented expressions for res-
onant circuits having multiple damping elements. An example of its use is given in Sect. 9.5.4,
where the high- Q approximation substantially simpliﬁes the equations of a buck converter in
which inductor and capacitor resistances are modeled.
8.1.9 Approximate Roots of an Arbitrary-Degree Polynomial
The low-Q approximation can be generalized, to ﬁnd approximate analytical expressions for the
roots of the nth-order polynomial
P(s)= 1+ a1 s+ a2 s2+··· + an sn (8.97)
It is desired to factor the polynomial P(s) into the form
P(s)= (1+τ1 s)(1+τ2 s)··· (1+τn s) (8.98)

8.1 Review of Bode Plots 305
In a real circuit, the coeﬃcients a1,..., an are real, while the time constants τ1,..., τn may
be either real or complex. Very often, some or all of the time constants are well separated in
value, and depend in a very simple way on the circuit element values. In such cases, simple
approximate analytical expressions for the time constants can be derived.
The time constants τ1,..., τn can be related to the original coe ﬃcients a1,..., an by
multiplying out Eq. (8.98). The result is
a1= τ1+τ2+··· +τn
a2= τ1(τ2+··· +τn)+τ2(τ3+··· +τn)+···
a3= τ1τ2(τ3+··· +τn)+τ2τ3(τ4+··· +τn)+··· (8.99)
...
an= τ1τ2τ3··· τn
General solution of this system of equations amounts to exact factoring of the arbitrary-degree
polynomial, a hopeless task. Nonetheless, Eq. ( 8.99) does suggest a way to approximate the
roots.
Suppose that all of the time constants τ1,..., τn are real and well separated in value. We
can further assume, without loss of generality, that the time constants are arranged in decreasing
order of magnitude:
|τ1|≫| τ2|≫···≫| τn| (8.100)
When the inequalities of Eq. ( 8.100) are satisﬁed, then the expressions for a1,..., an of Eq.
(8.99) are each dominated by their ﬁrst terms:
a1≈τ1
a2≈τ1τ2
a3≈τ1τ2τ3
...
an= τ1τ2τ3··· τn (8.101)
These expressions can now be solved for the time constants, with the result
τ1≈a1
τ2≈a2
a1
τ3≈a3
a2
(8.102)
...
τn≈a1
an−1
Hence, if
⏐⏐
⏐a
1
⏐⏐
⏐≫
⏐⏐
⏐
⏐⏐
a
2
a1
⏐⏐
⏐
⏐⏐≫
⏐⏐
⏐
⏐⏐
a
3
a2
⏐⏐
⏐
⏐⏐≫···≫
⏐⏐
⏐
⏐⏐
a
n
an−1
⏐⏐
⏐
⏐⏐ (8.103)

306 8 Converter Transfer Functions
then the polynomial P(s) given by Eq. (8.97) has the approximate factorization
P(s)≈(1+ a1 s)
⎦
1+ a2
a1
s
)⎦
1+ a3
a2
s
)
···
⎦
1+ an
an−1
s
)
(8.104)
Note that if the original coeﬃcients in Eq. (8.97) are simple functions of the circuit elements,
then the approximate roots given by Eq. (8.104) are similar simple functions of the circuit ele-
ments. So approximate analytical expressions for the roots can be obtained. Numerical values
are substituted into Eq. (8.103) to justify the approximation.
In the case where two of the roots are not well separated, then one of the inequalities of
Eq. (8.103) is violated. We can then leave the corresponding terms in quadratic form. For exam-
ple, suppose that inequality k is not satisﬁed:
⏐⏐⏐a1
⏐⏐⏐≫
⏐⏐
⏐⏐⏐
a
2
a1
⏐⏐
⏐⏐⏐≫···≫
⏐⏐
⏐⏐⏐
a
k
ak−1
⏐⏐
⏐⏐⏐/≫
⏐⏐
⏐⏐⏐
a
k+1
ak
⏐⏐
⏐⏐⏐≫···≫
⏐⏐
⏐⏐⏐
a
n
an−1
⏐⏐
⏐⏐⏐ (8.105)
Then an approximate factorization is
P(s)≈(1+ a
1 s)
⎦
1+ a2
a1
s
)
···
⎦
1+ ak
ak−1
s+ ak+1
ak−1
s2
)
···
⎦
1+ an
an−1
s
)
(8.106)
The conditions for accuracy of this approximation are
⏐⏐
⏐a
1
⏐⏐
⏐≫
⏐⏐
⏐
⏐⏐
a
2
a1
⏐⏐
⏐
⏐⏐≫···≫
⏐⏐
⏐
⏐⏐
a
k
ak−1
⏐⏐
⏐
⏐⏐≫
⏐⏐
⏐⏐⏐
⏐
a
k−2 ak+1
a2
k−1
⏐⏐
⏐⏐⏐
⏐≫
⏐⏐
⏐
⏐⏐
a
k+2
ak+1
⏐⏐
⏐
⏐⏐≫···≫
⏐⏐
⏐
⏐⏐
a
n
an−1
⏐⏐
⏐
⏐⏐ (8.107)
Complex conjugate roots can be approximated in this manner.
When the ﬁrst inequality of Eq. (8.103) is violated, that is,
|a
1|/≫
⏐⏐⏐⏐
⏐
a
2
a1
⏐⏐⏐⏐
⏐≫
⏐⏐⏐⏐
⏐
a
3
a2
⏐⏐⏐⏐
⏐≫···≫
⏐⏐⏐⏐
⏐
a
n
an−1
⏐⏐⏐⏐
⏐ (8.108)
then the ﬁrst two roots should be left in quadratic form:
P(s)≈
⎦
1+ a
1 s+ a2 s2) ⎦
1+ a3
a2
s
)
···
⎦
1+ an
an−1
s
)
(8.109)
This approximation is justiﬁed provided that
⏐⏐
⏐⏐⏐
⏐
a
2
2
a3
⏐⏐
⏐⏐⏐
⏐≫|a
1|≫
⏐⏐⏐
⏐⏐
a
3
a2
⏐⏐⏐
⏐⏐≫
⏐⏐⏐
⏐⏐
a
4
a3
⏐⏐⏐
⏐⏐≫···≫
⏐⏐⏐
⏐⏐
a
n
an−1
⏐⏐⏐
⏐⏐ (8.110)
If none of the above approximations is justiﬁed, then there are three or more roots that are close
in magnitude. One must then resort to cubic or higher-order forms.
As an example, consider the damped EMI ﬁlter illustrated in Fig. 8.30. Filters such as this
are typically placed at the power input of a converter, to attenuate the switching harmonics
present in the converter input current. By circuit analysis, one can show that this ﬁlter exhibits
the following transfer function:
G(s)= i
g(s)
ic(s)=
1+ s L1+ L2
R
1+ s L1+ L2
R + s2L1C+ s3 L1L2C
R
(8.111)

8.1 Review of Bode Plots 307
+vg
ig ic
C
R
L1
L2 Converter
Fig. 8.30 Input EMI ﬁlter example
This transfer function contains a third-order denominator, with the following coeﬃcients:
a1 = L1+ L2
R
a2 = L1C
a3 = L1L2C
R (8.112)
It is desired to factor the denominator, to obtain analytical expressions for the poles. The correct
way to do this depends on the numerical values of R, L1, L2, and C. When the roots are real
and well separated, then Eq. (8.104) predicts that the denominator can be factored as follows:
⎦
1+ s L1+ L2
R
) ⎦
1+ sRC L1
L1+ L2
) ⎦
1+ s L2
R
)
(8.113)
According to Eq. (8.103), this approximation is justiﬁed provided that
L1+ L2
R ≫ RC L1
L1+ L2
≫ L2
R (8.114)
These inequalities cannot be satisﬁed unless L1 ≫ L2. When L1 ≫ L2, then Eq. (8.114) can be
further simpliﬁed to
L1
R ≫ RC≫ L2
R (8.115)
The approximate factorization, Eq. (8.113), can then be further simpliﬁed to
⎦
1+ s L1
R
)
(1+ sRC)
⎦
1+ s L2
R
)
(8.116)
Thus, in this case the transfer function contains three well- separated real poles. Equations (8.113)
and (8.116) represent approximate analytical factorizations of the denominator of Eq. ( 8.111).
Although numerical values must be substituted into Eqs. ( 8.114)o r( 8.115) to justify the ap-
proximation, we can nonetheless express Eqs. ( 8.113) and ( 8.116) as analytical functions of
L1, L2, R, and C. Equations ( 8.113) and ( 8.116) are design-oriented, because they yield in-
sight into how the element values can be chosen such that given speciﬁed pole frequencies are
obtained.

308 8 Converter Transfer Functions
When the second inequality of Eq. (8.114) is violated,
L1+ L2
R ≫ RC L1
L1+ L2
/≫ L2
R (8.117)
then the second and third roots should be left in quadratic form:
⎦
1+ s L1+ L2
R
) ⎦
1+ sRC L1
L1+ L2
+ s2L1∥L2C
)
(8.118)
This expression follows from Eq. ( 8.106), with k= 2. Equation ( 8.107) predicts that this ap-
proximation is justiﬁed provided that
L1+ L2
R ≫ RC L1
L1+ L2
≫ L1∥L2
L1+ L2
RC (8.119)
In application of Eq. (8.107), we take a0 to be equal to 1. The inequalities of Eq. (8.119) can be
simpliﬁed to obtain
L1≫ L2, and L1
R ≫ RC (8.120)
Note that it is no longer required that RC ≫ L2/R. Equation ( 8.120) implies that factoriza-
tion (8.118) can be further simpliﬁed to
⎦
1+ s L1
R
) ⎦
1+ sRC+ s2L2C
)
(8.121)
Thus, for this case, the transfer function contains a low-frequency pole that is well separated
from a high-frequency quadratic pole pair. Again, the factored result (8.121) is expressed as an
analytical function of the element values, and consequently is design-oriented.
In the case where the ﬁrst inequality of Eq. (8.114) is violated:
L1+ L2
R /≫RC L1
L1+ L2
≫ L2
R (8.122)
then the ﬁrst and second roots should be left in quadratic form:
⎦
1+ s L1+ L2
R + s2L1C
)⎦
1+ s L2
R
)
(8.123)
This expression follows directly from Eq. ( 8.109). Equation (8.110) predicts that this approxi-
mation is justiﬁed provided that
L1RC
L2
≫ L1+ L2
R ≫ L2
R (8.124)
that is,
L1≫ L2, and RC≫ L2
R (8.125)
For this case, the transfer function contains a low-frequency quadratic pole pair that is well
separated from a high-frequency real pole. If none of the above approximations are justiﬁed,
then all three of the roots are similar in magnitude. We must then ﬁnd other means of dealing
with the original cubic polynomial. Design of input ﬁlters, including the ﬁlter of Fig. 8.30,i s
covered in Chap. 17.

8.2 Analysis of Converter Transfer Functions 309
8.2 Analysis of Converter Transfer Functions
Let us next derive analytical expressions for the poles, zeroes, and asymptote gains in the trans-
fer functions of the basic converters.
8.2.1 Example: Transfer Functions of the Buck–Boost Converter
The small-signal equivalent circuit model of the buck–boost converter is derived in Sect. 7.2,
with the result (Fig. 7.16b) repeated in Fig. 8.31. Let us derive and plot the control-to-output
and line-to-output transfer functions for this circuit.
The converter contains two independent ac inputs: the control input ˆd(s) and the line input
ˆvg(s). The ac output voltage variations ˆv(s) can be expressed as the superposition of terms arising
from these two inputs:
ˆv(s)= Gvd(s) ˆd(s)+ Gvg(s)ˆvg(s) (8.126)
Hence, the transfer functions Gvd(s) and Gvg(s) can be deﬁned as
Gvd(s)= ˆv(s)
ˆd(s)
⏐⏐
⏐⏐⏐
⏐
ˆvg(s)=0
and Gvg(s)= ˆv(s)
ˆvg(s)
⏐⏐
⏐⏐⏐
⏐
ˆd(s)=0
(8.127)
To ﬁnd the line-to-output transfer function Gvg(s), we set the ˆd sources to zero as in
Fig. 8.32a. We can then push the vg(s) source and the inductor through the transformers, to
obtain the circuit of Fig. 8.32b. The transfer function Gvg(s) is found using the voltage divider
formula:
Gvg(s)= ˆv(s)
ˆvg(s)
⏐⏐⏐⏐
⏐
⏐
ˆd(s)=0
=−D
D′
⎦
R
 1
sC
)
sL
D′2 +
⎦
R

 1
sC
) (8.128)
We next expand the parallel combination, and express as a rational fraction:
Gvg(s)=
⎦
−D
D′
)
⎦ R
1+ sRC
)
sL
D′2 +
⎦ R
1+ sRC
)
=
⎦
−D
D′
) R
R+ sL
D′2 + s2RLC
D′2
(8.129)
+
–
+
–L
RC
1 : D D' : 1
vg(s) I d(s) Id (s)
i (s) (Vg – V) d(s)
+
v(s)
–
ˆ ˆ
ˆ ˆ
ˆ ˆ
Fig. 8.31 Buck–boost converter equivalent circuit derived in Sect.7.2

310 8 Converter Transfer Functions
(a)
+
–
L
RC
1 : D D' : 1
vg(s)
+
v(s)
–
(b)
+
– RC
+
v(s)
–
L
D'2
vg(s)– D
D'
ˆ
ˆ ˆ
ˆ
Fig. 8.32 Manipulation of buck–boost equivalent circuit to ﬁnd the line-to-output transfer function
Gvg(s): (a)s e t ˆd sources to zero; (b) push inductor and ˆvg source through transformers
We are not done yet—the next step is to manipulate the expression into normalized form, such
that the coeﬃcients of s0 in the numerator and denominator polynomials are equal to one. This
can be accomplished by dividing the numerator and denominator by R:
Gvg(s)= ˆv(s)
ˆvg(s)
⏐⏐⏐⏐
⏐
⏐
ˆd(s)=0
=
⎦
−D
D′
) 1
1+ s L
D′2R+ s2 LC
D′2
(8.130)
Thus, the line-to-output transfer function contains a dc gain Gg0 and a quadratic pole pair:
Gvg(s)= Gg0
1
1+ s
Qω0
+
⎦s
ω0
)2 (8.131)
Analytical expressions for the salient features of the line-to-output transfer function are
found by equating like terms in Eqs. (8.130) and (8.131) .T h ed cg a i ni s
Gg0=−D
D′ (8.132)
By equating the coeﬃcients of s2 in the denominators of Eqs. (8.130) and (8.131), we obtain
1
ω2
0
= LC
D′2 (8.133)
Hence, the angular corner frequency is
ω0= D′
√
LC
(8.134)
By equating coeﬃcients of s in the denominators of Eqs. (8.130) and (8.131), we obtain

8.2 Analysis of Converter Transfer Functions 311
1
Qω0
= L
D′2R (8.135)
Elimination ofω0 using Eq. (8.134) and solution for Q leads to
Q= D′R
√
C
L (8.136)
Equations ( 8.132), ( 8.134), and ( 8.136) are the desired results in the analysis of the line-to-
output transfer function. These expressions are useful not only in analysis situations, where it
is desired to ﬁnd numerical values of the salient features Gg0,ω0, and Q, but also in design
situations, where it is desired to select numerical values for R, L, and C such that given values
of the salient features are obtained.
Derivation of the control-to-output transfer functionGvd(s) is complicated by the presence in
Fig. 8.31 of three generators that depend on ˆd(s). One good way to ﬁnd Gvd(s) is to manipulate
the circuit model as in the derivation of the canonical model, Fig.7.36. Another approach, used
here, employs the principle of superposition. First, we set the ˆvg source to zero. This shorts the
input to the 1:D transformer, and we are left with the circuit illustrated in Fig. 8.33a. Next, we
push the inductor and ˆd voltage source through the D’:1 transformer, as in Fig. 8.33b.
Figure 8.33b contains a ˆd-dependent voltage source and a ˆd-dependent current source. The
transfer function Gvd(s) can therefore be expressed as a superposition of terms arising from
these two sources. When the current source is set to zero (i.e., open-circuited), the circuit of
Fig. 8.34a is obtained. The output ˆv(s) can then be expressed as
ˆv(s)
ˆd(s)
=
⎦
−Vg−V
D′
)
⎦
R
 1
sC
)
sL
D′2 +
⎦
R
 1
sC
) (8.137)
(a)
(b)
+
–
L
RC
D' : 1
Id (s)
(Vg – V) d(s)
+
v(s)
–
+
–
RCId (s)
+
v(s)
–
L
D'2
Vg –V
D' d(s)
ˆ
ˆ ˆ
ˆˆˆ
Fig. 8.33 Manipulation of buck–boost equivalent circuit to ﬁnd the control-to-output transfer function
Gvd(s): (a)s e tˆvg source to zero; (b) push inductor and voltage source through transformer

312 8 Converter Transfer Functions
Fig. 8.34 Solution of the model of
Fig. 8.33b by superposition: ( a)c u r -
rent source set to zero; ( b) voltage
source set to zero
(a)
(b)
+
–
RC
+
v(s)
–
L
D'2
Vg –V
D' d(s)
RCI d(s)
+
v(s)
–
L
D'2
ˆ ˆ
ˆˆ
When the voltage source is set to zero (i.e., short-circuited), Fig. 8.33b reduces to the circuit
illustrated in Fig. 8.34b. The output ˆv(s) can then be expressed as
ˆv(s)
ˆd(s)
= I
⎦sL
D′2
 R
 1
sC
)
(8.138)
The transfer function Gvd(s)i st h es u mo fE q s .(8.137) and (8.138):
Gvd(s)=
⎦
−Vg−V
D′
)
⎦
R

 1
sC
)
sL
D′2 +
⎦
R

 1
sC
)+ I
⎦sL
D′2
 R
 1
sC
)
(8.139)
By algebraic manipulation, one can reduce this expression to
Gvd(s)= ˆv(s)
ˆd(s)
⏐⏐
⏐⏐⏐
⏐
ˆvg(s)=0
=
⎦
−Vg−V
D′
)
⎛⎜⎜⎜⎜⎜⎜⎝1−s LI
D′
⎦
Vg−V
)
⎞⎟⎟⎟⎟⎟⎟⎠
⎦
1+ s L
D′2R+ s2 LC
D′2
) (8.140)
This equation is of the form
Gvd(s)= Gd0
⎦
1−s
ωz
)
⎛⎜⎜⎜⎜⎜⎝1+ s
Qω0
+
⎦s
ω0
)2⎞⎟⎟⎟⎟⎟⎠
(8.141)
The denominators of Eq. ( 8.140) and ( 8.130) are identical, and hence Gvd(s) and Gvg(s)
share the sameω0 and Q, given by Eqs. (8.134) and (8.136) .T h ed cg a i ni s
Gd0=−Vg−V
D′ =−Vg
D′2 = V
DD′ (8.142)

8.2 Analysis of Converter Transfer Functions 313
The angular frequency of the zero is found by equating coe ﬃcients of s in the numerators of
Eqs. (8.140) and (8.141). One obtains
ωz= D′(Vg−V)
LI = D′2R
DL (RHP) (8.143)
This zero lies in the right half-plane. Equations (8.142) and (8.143) have been simpliﬁed by use
of the dc relationships
V=−D
D′ Vg (8.144)
I=−V
D1R
Equations ( 8.134), ( 8.136), ( 8.142), and ( 8.143) constitute the results of the analysis of the
control-to-output transfer function: analytical expressions for the salient features ω0, Q, Gd0,
andωz. These expressions can be used to choose the element values such that given desired
values of the salient features are obtained.
Having found analytical expressions for the salient features of the transfer functions, we
can now plug in numerical values and construct the Bode plot. Suppose that we are given the
following values:
D= 0.6
R= 10Ω
Vg= 30 V
L= 160μH
C= 160μF
(8.145)
We can evaluate Eqs. ( 8.132), (8.134), (8.136), (8.142), and ( 8.143), to determine numerical
values of the salient features of the transfer functions. The results are:
⏐⏐
⏐G
g0
⏐⏐
⏐= D
D′ = 1.5⇒3.5d B
|Gd0|= |V|
DD′ = 187.5V⇒45.5d BV
f0=ω0
2π= D′
2π
√
LC
= 400 Hz
Q= D′R
√
C
L= 4⇒12 dB
fz=ωz
2π= D′2R
2πDL= 2.65 kHz
(8.146)
The Bode plot of the magnitude and phase of Gvd is constructed in Fig. 8.35. The transfer
function contains a dc gain of 45.5 dBV, resonant poles at 400 Hz having aQ of 4⇒12dB, and
a right half-plane zero at 2.65 kHz. the resonant poles contribute−180◦to the high-frequency
phase asymptote, while the right half-plane zero contributes −90◦. In addition, the inverting
characteristic of the buck–boost converter leads to a 18◦phase reversal, not included in Fig.8.35.

314 8 Converter Transfer Functions
f
0˚
–90˚
–180˚
–270˚
|| Gvd ||
Gd0 = 187 V
 45.5 dBV
|| Gvd || Gvd
0 dBV
–20 dBV
–40 dBV
20 dBV
40 dBV
60 dBV
80 dBV
Q =4 12 dB
fz
2.6 kHz
RHP
Gvd
10-1/2Q f0
101/2Q f0
0˚ 300 Hz
533 Hz
–20 dB/decade
–40 dB/decade
–270˚
fz /10
260 Hz
10fz
26 kHz
1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
f0
400 Hz
Fig. 8.35 Bode plot of the control-to-output transfer function Gvd, buck–boost converter example. Phase
reversal owing to output voltage inversion is not included
f
!! Gvg !!
|| Gvg ||
Gvg
10–1/2Q0 f0
101/2Q0 f0
0˚ 300 Hz
533 Hz
–180˚
–60 dB
–80 dB
–40 dB
–20 dB
0 dB
20 dB
Gg0 = 1.5
 3.5 dB
f0
Q =4 12 dB
400 Hz –40 dB/decade
0˚
–90˚
–180˚
–270˚
Gvg
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 8.36 Bode plot of the line-to-output transfer function Gvg, buck–boost converter example. Phase
reversal owing to output voltage inversion is not included
The Bode plot of the magnitude and phase of the line-to-output transfer function Gvg is
constructed in Fig. 8.36. This transfer function contains the same resonant poles at 400 Hz, but
is missing the right half-plane zero. The dc gain Gg0 is equal to the conversion ratio M(D)
of the converter. Again, the 180◦phase reversal, caused by the inverting characteristic of the
buck–boost converter, is not included in Fig.8.36.

8.2 Analysis of Converter Transfer Functions 315
Table 8.2 Salient features of the small-signal CCM transfer functions of some basic dc–dc converters
Converter Gg0 Gd0 ω0 Q ωz
Buck D V
D
1√
LC
R
√
C
L ∞
Boost 1
D′
V
D′
D′
√
LC
D′R
√
C
L
D′2R
L
Buck–boost −D
D′
V
DD′
D′
√
LC
D′R
√
C
L
D′2R
DL
8.2.2 Transfer Functions of Some Basic CCM Converters
The salient features of the line-to-output and control-to-output transfer functions of the basic
buck, boost, and buck–boost converters are summarized in Table 8.2. In each case, the control-
to-output transfer function is of the form
Gvd(s)= Gd0
⎦
1−s
ωz
)
⎛⎜⎜⎜⎜⎜⎝1+ s
Qω0
+
⎦s
ω0
)2⎞⎟⎟⎟⎟⎟⎠
(8.147)
and the line-to-output transfer function is of the form
Gvg(s)= Gg0
1⎛⎜⎜⎜⎜⎜⎝1+ s
Qω0
+
⎦s
ω0
)2⎞⎟⎟⎟⎟⎟⎠
(8.148)
The boost and buck–boost converters exhibit control-to-output transfer functions containing
two poles and a right half-plane zero. The buck converter Gvd(s) exhibits two poles but no
zero. The line-to-output transfer functions of all three ideal converters contain two poles and no
zeroes.
These results can be easily adapted to transformer-isolated versions of the buck, boost, and
buck–boost converters. The transformer has negligible eﬀect on the transfer functions G
vg(s)
and Gvd(s), other than introduction of a turns ratio. For example, when the transformer of the
bridge topology is driven symmetrically, its magnetizing inductance does not contribute dynam-
ics to the converter small-signal transfer functions. Likewise, when the transformer magnetiz-
ing inductance of the forward converter is reset by the input voltage v
g,a si nF i g s .6.24 or 6.29,
then it also contributes negligible dynamics. In all transformer-isolated converters based on the
buck, boost, and buck–boost converters, the line-to-output transfer function Gvg(s) should be
multiplied by the transformer turns ratio; the transfer functions ( 8.147) and ( 8.148) and the
parameters listed in Table 8.2 can otherwise be directly applied.

316 8 Converter Transfer Functions
8.2.3 Physical Origins of the Right Half-Plane Zero in Converters
+
1
s
z
uout(s)uin(s)
Fig. 8.37 Block diagram having a right half-plane
zero transfer function, as in Eq. (8.32), withω0=ωz
Figure 8.37 contains a block diagram that il-
lustrates the behavior of the right half-plane
zero. At low frequencies, the gain (s/ωz) has
negligible magnitude, and hence uout ≈uin.
At high frequencies, where the magnitude
of the gain ( s/ωz) is much greater than 1,
uout ≈−(s/ωz)uin. The negative sign causes
a phase reversal at high frequency. The im-
plication for the transient response is that the
output initially tends in the opposite direction
of the ﬁnal value.
We have seen that the control-to-output
transfer functions of the boost and buck–
boost converters, Fig. 8.38, exhibit RHP ze-
roes. Typical transient response waveforms for a step change in duty cycle are illustrated in
Fig. 8.39. For this example, the converter initially operates in equilibrium, at d = 0.4 and
d
′ = 0.6. Equilibrium inductor current iL(t), diode current iD(t), and output voltage v(t)w a v e -
forms are illustrated. The average diode current is
⟨iD⟩Ts = d′⟨iL⟩Ts (8.149)
By capacitor charge balance, this average diode current is equal to the dc load current when
the converter operates in equilibrium. At time t = t1, the duty cycle is increased to 0.6. In
consequence, d′ decreases to 0.4. The average diode current, given by Eq. ( 8.149), therefore
decreases, and the output capacitor begins to discharge. The output voltage magnitude initially
decreases as illustrated.
(a)
+
L
CR
+
v
1
2
vg
iL(t)
iD(t)
(b)
+
L
CR
+
v
12
vg
iL(t)
iD(t)
Fig. 8.38 Two basic converters whose CCM control-to-output transfer functions exhibit RHP zeroes: (a)
boost, (b) buck–boost
```
