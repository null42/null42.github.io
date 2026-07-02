---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: "第16章part 1 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems"
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 629-648 > Chunk ID: `chapter-16-part-1`"
---

# 第16章part 1 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 629-648  
> Chunk ID: `chapter-16-part-1`

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
16
Techniques of Design-Oriented Analysis: Extra
Element Theorems
Middlebrook’s Extra Element Theorem(EET) is a powerful technique of Design-Oriented Anal-
ysis that aids in the analysis of complex circuits and systems, with the goal of deriving tractable
equations that are useful for design. As with the Feedback Theorem of Chap. 13, it is based on
linear superposition and the null double injection analysis technique.
The Extra Element Theorem exposes how a known transfer function is changed by addition
of a new network element. Section 16.1 contains a derivation by null double injection, and
Sect. 16.2 describes several examples of its use. This theorem is the basis for the Chap. 17
analysis of converter input ﬁlters. The EET is employed in Sect.16.2.3 to gain an understanding
of how to damp the internal resonance of the SEPIC.
The n-Extra Element Theorem(n-EET) is an extension of the EET to cover the simultaneous
addition of multiple elements to a circuit. A useful application of the n-EET is the treatment of
all reactive components as extra elements: a transfer function can be written as a normalized
rational fraction with little or no algebra. This powerful technique can substantially extend the
engineer’s ability to perform tractable paper analysis and design of complex dynamical circuits.
Section 16.3 describes this technique without proof, and includes several examples.
16.1 Extra Element Theorem
The Extra Element Theorem of R. D. Middlebrook [139–141] shows how a transfer function is
changed by the addition of an impedance to the network. The theorem allows one to determine
the eﬀects of this extra element on any transfer function of interest, without solving the system
all over again. The Extra Element Theorem is a powerful technique of design-oriented analysis.
It leads to impedance inequalities which guarantee that an element does not substantially alter
a transfer function. The Extra Element Theorem is employed in Chap. 17, where it leads to a
relatively simple methodology for designing input ﬁlters that do not degrade the loop gains of
switching regulators. It is also employed in Sect. 22.4, to determine how the load resistance af-
fects the properties of a resonant inverter. In this section, Middlebrook’s Extra Element Theorem
is derived, based on the principle of superposition. Its application is illustrated via examples.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_16
625

626 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
(a)
Port
Open-circuit
Linear circuit Linear circuit
Input Output
{
+
–vin(s)
+
vout(s)
–
G(s) Z(s)
Transfer function
(b)
Port
Input Output+
–vin(s)
+
vout(s)
–
Transfer function
G(s)
Z(s)
Fig. 16.1 How an added element changes a transfer functionG(s): (a) original conditions, before addition
of new element; (b) addition of element having impedance Z(s)
16.1.1 Basic Result
Consider the linear circuit of Fig. 16.1a. This network contains an input vin(s) and an output
vout(s). In addition, it contains a port whose terminals are open-circuited. It is assumed that the
transfer function from vin(s)t o vout(s) is known, and is given by
vout(s)
vin(s) = G(s)
⏐⏐⏐⏐
⏐
Z(s)→∞
(16.1)
The Extra Element Theorem tells us how the transfer function G(s) is modiﬁed when an
impedance Z(s) is connected between the terminals at the port, as in Fig. 16.1b. The result is
vout(s)
vin(s) =
⎦
G(s)
⏐⏐⏐
⏐⏐
Z(s)→∞
)
⎛⎜⎜⎜⎜⎜⎜⎜⎜
⎜⎜⎜⎜⎝
1+ Z
N (s)
Z(s)
1+ ZD(s)
Z(s)
⎞⎟⎟⎟⎟⎟⎟⎟⎟
⎟⎟⎟⎟⎠
(16.2)
The right-hand side terms involving Z(s) account for the inﬂuence of Z(s)o n G(s), and are
known as the correction factor.
The Extra Element Theorem also applies to the dual form illustrated in Fig. 16.2.I nt h i s
form, the transfer function is initially known under the conditions that the port is short-circuited.
In Fig. 16.2b, the short circuit is replaced by the impedance Z(s). In this case, the addition of
the impedance Z(s) causes the transfer function to become
v
out(s)
vin(s) =
⎦
G(s)
⏐⏐⏐⏐
⏐
Z(s)→0
)
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1+ Z(s)
ZN (s)
1+ Z(s)
ZD(s)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(16.3)
The ZN (s) and ZD(s)t e r m si nE q s .(16.2) and ( 16.3) are identical. By equating the G(s)
expressions of Eqs. (16.2) and (16.3), one can show that
G(s)
⏐⏐⏐Z(s)→∞
G(s)
⏐⏐⏐Z(s)→0
= ZD(s)
ZN (s) (16.4)

16.1 Extra Element Theorem 627
(a) G(s) Z(s)0
Port
Short-circuit
Linear circuit
Input Output
{
+
–vin(s)
+
vout(s)
–
Transfer function
(b)
Port
Linear circuit
Input Output+
–vin(s)
+
vout(s)
–
Transfer function
G(s)
Z(s)
Fig. 16.2 The dual form of the Extra Element Theorem, in which the extra element replaces a short
circuit: (a) original conditions; (b) addition of element having impedance Z(s)
This is known as the reciprocity relationship.
The quantities ZN (s) and ZD(s) can be found by measuring impedances at the port. The
term ZD(s) is the Thevenin equivalent impedance seen looking into the port, also known as the
driving-point impedance. As illustrated in Fig. 16.3a, this impedance is found by setting the
independent source vin(s) to zero, and then measuring the impedance between the terminals of
the port:
ZD(s)= v(s)
i(s)
⏐⏐⏐⏐
⏐
vin(s)=0
(16.5)
Thus, ZD(s) is the impedance between the port terminals when the input vin(s) is set to zero.
Determination of the impedance ZN (s) is illustrated in Fig. 16.3b. The term ZN (s) is found
under the conditions that the output vout(s)i s nulled to zero. A current source i(s) is connected
to the terminals of the port. In the presence of the input signal vin(s), the current i(s) is adjusted
so that the output vout(s) is nulled to zero. Under these conditions, the quantity ZN (s)i sg i v e n
by
ZN (s)= v(s)
i(s)
⏐⏐⏐⏐
⏐
vout(s)→
null
0
(16.6)
Note that nulling the output is not the same as shorting the output. If one simply shorted the
output, then a current would ﬂow through the short, which would induce voltage drops and
currents in other elements of the network. These voltage drops and currents are not present
when the output is nulled. The null condition of Fig. 16.3b does not employ any connections to
the output of the circuit. Rather, the null condition is achieved by adjustment of the independent
sources vin(s) and i(s) in a special way that causes the outputvout(s) to be zero. By superposition,
vout(s) can be expressed as a linear combination ofvin(s) and i(s); therefore, for a givenvin(s), it
is always possible to choose ani(s) that will causevout(s) to be zero. Under these null conditions,
ZN (s) is measured as the ratio of v(s)t o i(s). In practice, the circuit analysis to ﬁnd ZN (s)i s
simpler than analysis of ZD(s), because the null condition causes many of the signals within the
circuit to be zero. Several examples are given in Sect. 16.2.
The input and output quantities need not be voltages, but could also be currents or other
signals that can be set or nulled to zero. The next section contains a derivation of the Extra
Element Theorem with a general input u(s) and output y(s).

628 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
(a)
ZD(s)= v(s)
i(s) vin(s)=0
Port
Short-circuit
Linear circuit
Input Output
{
vin(s) = 0
+
vout(s)
–
i(s)
+ v(s) –
(b)
ZN(s)= v(s)
i(s) vout(s)0
Port
Linear circuit
Input Output
+
vout(s) 0
–
i(s)
+ v(s) –
+
–vin(s)
Fig. 16.3 Determination of the quantities ZN (s)a n dZD(s): (a) ZD(s) is the driving-point impedance at
the port, and is measured with the inputvin(s) set to zero; (b) ZN (s) is the impedance seen at the port under
the condition that the output is nulled
16.1.2 Derivation
Figure 16.4a illustrates a general linear system having an input u(s) and an output y(s). In addi-
tion, the system contains an electrical port having voltage v(s) and current i(s), with the polari-
ties illustrated. Initially, the port is open-circuited:i(s)= 0. The transfer function of this system,
with the port open-circuited, is
Gold(s)= y(s)
u(s)
⏐⏐
⏐⏐⏐
i(s)=0
(16.7)
The objective of the Extra Element Theorem is to determine the new transfer functionG(s) that
is obtained when an impedance Z(s) is connected to the port:
G(s)= y(s)
u(s) (16.8)
The situation is illustrated in Fig. 16.4b. It can be seen that the conditions at the port are now
given by
v(s)=−i(s)Z(s) (16.9)

16.1 Extra Element Theorem 629
(a)
u(s) y(s)
i(s) + v(s) –
Port
Open-circuit
Linear network
Input Output
{
(b)
u(s) y(s)
i(s) + v(s) –
Port
Linear network
Input Outpu t
Z(s)
Fig. 16.4 Modiﬁcation of a linear network by addition of an extra element: ( a) original system; ( b)
modiﬁed system, with impedance Z(s) connected at an electrical port
To express the new transfer functionG(s)i nE q .(16.8) in terms of the original transfer function
Gold(s)o fE q .( 16.7), we use current injection at the port, as illustrated in Fig. 16.5. There
are now two independent inputs: the input u(s) and the independent current source i(s). The
dependent quantities y(s) and v(s) can be expressed as functions of these independent inputs
using the principle of superposition:
y(s)= Gold(s)u(s)+ Gi(s)i(s) (16.10)
v(s)= Gv(s)u(s)+ ZD(s)i(s) (16.11)
Fig. 16.5 Current injection at the electrical port, by
addition of independent current source i(s)
u(s) y(s)
i(s)
+ v(s) –
Port
Linear network
Input Outpu t
where
Gold(s)= y(s)
u(s)
⏐⏐
⏐⏐⏐
i(s)=0
(16.12)
Gi(s)= y(s)
i(s)
⏐⏐
⏐⏐⏐
u(s)=0
(16.13)
ZD(s)= v(s)
i(s)
⏐⏐⏐⏐
⏐
u(s)=0
(16.14)
Gv(s)= v(s)
u(s)
⏐⏐⏐⏐
⏐
i(s)=0
(16.15)

630 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
are the transfer functions from the independent inputs to the respective dependent quantitiesy(s)
and v(s).
The transfer function G(s) can be found by elimination of v(s) and i(s) from the system of
equations (16.9)t o( 16.11), and solution for y(s) as a function of u(s). The result is
G(s)= y(s)
u(s)= Gold(s)−Gv(s)Gi(s)
Z(s)+ ZD(s) (16.16)
This intermediate result expresses the new transfer function G(s) as a function of the original
transfer function Gold(s) and the extra element Z(s), as well as the quantities ZD(s), Gv(s), and
Gi(s).
Equation (16.14) gives a direct way to ﬁnd the quantity ZD(s). ZD(s) is the driving-point
impedance at the port, when the input u(s) is set to zero. This quantity can be found either by
conventional circuit analysis or simulation, or by laboratory measurement.
Although Gv(s) and Gi(s) could also be determined from the deﬁnitions (16.13) and (16.15),
it is preferable to eliminate these quantities, and instead express G(s)a saf u n c t i o no ft h e
impedances at the given port. This can be accomplished via the following thought experiment.
In the presence of the input u(s), we adjust the independent current source i(s) in the special
way that causes the output y(s) to be nulled to zero. The impedance ZN (s) is deﬁned as the ratio
of v(s)t o i(s) under these null conditions:
ZN (s)= v(s)
i(s)
⏐⏐
⏐
⏐⏐
y(s)→
null
0
(16.17)
The value of i(s) that achieves the null condition y(s)→
null
0 can be found by setting y(s)= 0i n
Eq. (16.10), as follows:
[Gold(s)u(s)+ Gi(s)i(s)]→
null
0 (16.18)
Hence, the output y(s) is nulled when the inputs u(s) and i(s) are related as follows:
u(s)
⏐⏐
⏐⏐⏐
y(s)→
null
0
=−Gi(s)
Gold(s) i(s)
⏐⏐
⏐⏐⏐
y(s)→
null
0
(16.19)
Under this null condition, the voltage v(s) is given by
v(s)
⏐⏐⏐y(s)→
null
0 = Gv(s)u(s)
⏐⏐⏐y(s)→
null
0+ ZD(s)i(s)
⏐⏐⏐y(s)→
null
0
=
⎦
−Gv(s)Gi(s)
Gold(s) + ZD(s)
)
i(s)
⏐⏐⏐
⏐
⏐⏐
y(s)→
null
0
(16.20)
which follows from Eqs. (16.11) and (16.19). Substitution of Eq. (16.17) into Eq. (16.20) yields
v(s)
⏐⏐⏐⏐
⏐
y(s)→
null
0
= ZN (s)i(s)
⏐⏐⏐⏐
⏐
y(s)→
null
0
=
⎦
−Gv(s)Gi(s)
Gold(s) + ZD(s)
)
i(s)
⏐⏐⏐⏐
⏐
y(s)→
null
0
(16.21)
Hence,
ZN (s)= ZD(s)−Gv(s)Gi(s)
Gold(s) (16.22)

16.1 Extra Element Theorem 631
Solution for the quantity Gv(s)Gi(s) yields
Gv(s)Gi(s)= (ZD(s)−ZN (s))Gold(s) (16.23)
Thus, the unknown quantities Gv(s) and Gi(s) can be related to ZN (s) and ZD(s), which are
properties of the port at which the new impedance Z(s) will be connected, and to the original
transfer function Gold(s).
The ﬁnal step is to substitute Eq. (16.23) into Eq. (16.16), leading to
G(s)= Gold(s)−ZD(s)−ZN (s)
Z(s)+ ZD(s) Gold(s) (16.24)
This expression can be simpliﬁed as follows:
G(s)= Gold(s)
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1+ ZN (s)
Z(s)
1+ ZD(s)
Z(s)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(16.25)
or,
G(s)=
⎦
G(s)
⏐⏐
⏐⏐⏐
Z(s)→∞
)
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1+ ZN (s)
Z(s)
1+ ZD(s)
Z(s)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(16.26)
This is the desired result. It states how the transfer function G(s) is modiﬁed by addition of the
extra element Z(s). The right-most term in Eq. (16.26) is called the correction factor; this term
gives a quantitative measure of the change in G(s) arising from the introduction of Z(s).
Derivation of the dual result, Eq. (16.3), follows similar steps.
16.1.3 Discussion
The general form of the Extra Element Theorem makes it useful for designing a system such that
unwanted circuit elements do not degrade the desirable system performance already obtained.
For example, suppose that we already know some transfer function or similar quantity G(s),
under simpliﬁed or ideal conditions, and have designed the system such that this quantity meets
speciﬁcations. We can then use the Extra Element Theorem to answer the following questions:
•What is the eﬀect of a parasitic element Z(s) that was not included in the original analysis?
•What happens if we later decide to add some additional components having impedanceZ(s)
to the system?
•Can we establish some conditions onZ(s) that ensure thatG(s) is not substantially changed?
A common application of the Extra Element Theorem is the determination of conditions
on the extra element that guarantee that the transfer function G(s) is not signiﬁcantly altered.
According to Eqs. (16.2) and (16.26), this will occur when the correction factor is approximately
equal to unity. The conditions are
∥Z( jω)∥≫∥Z
N ( jω)∥
∥Z( jω)∥≫∥ZD( jω)∥ (16.27)

632 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
This gives a formal way to show when an impedance can be ignored: one can plot the
impedances∥ZN ( jω)∥ and∥ZD( jω))∥, and compare the results with a plot of ∥Z( jω)∥.T h e
impedance Z(s) can be ignored over the range of frequencies where the inequalities (16.27)a r e
satisﬁed.
For the dual case in which the new impedance is inserted where there was previously a short
circuit, Eq. (16.3), the inequalities are reversed:
∥Z( jω)∥≪∥ZN ( jω)∥
∥Z( jω)∥≪∥ZD( jω)∥ (16.28)
This equation shows how to limit the magnitude ∥Z( jω)∥, to avoid signiﬁcantly changing the
transfer function G(s).
For quantitative design, Eqs. (16.27) and (16.28) raise an additional question: By what factor
should||Z( jω)|| exceed (or be less than)||ZN ( jω)|| and||ZD( jω)||, in order for the inequalities
of Eq. ( 16.27)o r( 16.28) to be well satisﬁed? This question can be answered by plotting the
magnitudes and phases of the correction factor terms, as a function of the magnitudes and
phases of (Z/ZN ) and (Z/ZD).
Figure 16.6 shows contours of constant ||1+ Z/ZN||, as a function of the magnitude and
phase of Z/ZN . Figure 16.7 shows similar contours of constant ∠(1+ Z/ZN ). It can be seen
that, when||Z/ZN|| is less than – 20 dB, then the maximum deviation caused by the numerator
(1 + Z/ZN ) term is less than±1 dB in magnitude, and less than±7◦in phase. For||Z/ZN|| less
than−10 dB, the maximum deviation caused by the numerator (1 + Z/ZN ) term is less than
±3.5 dB in magnitude, and less than±20◦in phase.
Figures 16.8 and 16.9 contain contours of constant||1/(1+ Z/ZD)|| and∠1/(1+ Z/ZD), re-
spectively, as a function of the magnitude and phase of Z/ZD. These plots contain minus signs
because the terms appear in the denominator of the correction factor; otherwise, they are identi-
cal to Figs. 16.6 and 16.7.A g a i n ,f o r||Z/Z
D|| less than – 20 dB, the maximum deviation caused
by the denominator (1+ Z/ZD) term is less than±1 dB in magnitude, and less than±7◦in phase.
For||Z/ZD|| less than – 10 dB, the maximum deviation caused by the denominator (1 + Z/ZD)
term is less than±3.5 dB in magnitude, and less than±20◦in phase.
16.2 EET Examples
16.2.1 A Simple Transfer Function
The ﬁrst example illustrates how the Extra Element Theorem can be used to ﬁnd a transfer
function essentially by inspection. We are given the circuit illustrated in Fig.16.10. It is desired
to solve for the transfer function
G(s)= v2(s)
v1(s) (16.29)
and to express this transfer function in factored pole-zero form. One way to do this is to employ
the Extra Element Theorem, treating the capacitor C as an “extra” element. As illustrated in
Fig. 16.11, the electrical port is taken to be at the location of the capacitor, and the “original
conditions” are taken to be the case when the capacitor impedance is inﬁnite, i.e., an open
circuit. Under these original conditions, the transfer function is given by the voltage divider
composed of resistors R
1, R3, and R4. Hence, G(s) can be expressed as

16.2 EET Examples 633
-30 dB
-25 dB
-20 dB
-15 dB
-10 dB
-5 dB
0 dB
5 dB
10 dB
-180° -135° -90° -45° 0° 45° 90° 135° 180°
Z
ZN
Z
ZN dB
0 dB 0 dB
1 dB
2 dB
3 dB
4 dB
6 dB
8 dB
Fig. 16.6 Contours of constant∥1+ Z/ZN∥, as a function of the magnitude and phase of Z/ZN
-30 dB
-25 dB
-20 dB
-15 dB
-10 dB
-5 dB
0 dB
5 dB
10 dB
-180° -135° -90° -45° 0° 45° 90° 135° 180°
+ 5
+ 10
+ 15
+ 20
+ 30
+ 45
+ 60+ 90
+ 120+ 150
+ 2
Z
ZN dB
Z
ZN
Fig. 16.7 Contours of constant∠(1+ Z/ZN ), as a function of the magnitude and phase of Z/ZN
v2(s)
v1(s)= G(s)=
⎦ R4
R1+ R3+ R4
)
⎦
1+ ZN
Z
)
⎦
1+ ZD
Z
) (16.30)
where Z(s) is the capacitor impedance 1/sC.

634 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
-30 dB
-25 dB
-20 dB
-15 dB
-10 dB
-5 dB
0 dB
5 dB
10 dB
-180° -135° -90° -45° 0° 45° 90° 135° 180°
Z
ZD
Z
ZD dB
0 dB 0 dB
0.5 dB
1 dB
2 dB
3 dB
4 dB
6 dB
10 dB
0.5 dB
1 dB
2 dB
3 dB
4 dB
6 dB
10 dB
Fig. 16.8 Contours of constant∥1+ Z/ZD∥, as a function of the magnitude and phase of Z/ZD
-30 dB
-25 dB
-20 dB
-15 dB
-10 dB
-5 dB
0 dB
5 dB
10 dB
-180° -135° -90° -45° 0° 45° 90° 135° 180°
+ 2
+ 5
+ 10
+ 15
+ 20
+ 30
+ 45
+ 60+ 90+ 120
+ 150
Z
ZD dB
Z
ZD
Fig. 16.9 Contours of constant∠(1+ Z/ZD), as a function of the magnitude and phase of Z/ZD

16.2 EET Examples 635
Fig. 16.10 R–C circuit example of
Sect. 16.2.1 +
–
R1
C
+
v2(s)
–
v1(s)
R2
R3
R4
Fig. 16.11 Manipulation of the cir-
cuit of Fig. 16.10 into the form of
Fig. 16.1
+
–
R1
C
+
v2(s)
–
v1(s)
R2
R3
R4
+ v(s) –
i(s)
Linear circuit
port
The impedance ZD(s) is the Thevenin equivalent impedance seen at the port where the ca-
pacitor is connected. As illustrated in Fig. 16.12a, this impedance is found by setting the inde-
pendent source v1(s) to zero, and then determining the impedance between the port terminals.
The result is
ZD= R2+ R1|| (R3+ R4) (16.31)
Figure 16.12b illustrates determination of the impedance ZN (s). A current source i(s) is con-
nected to the port, in place of the capacitor. In the presence of the inputv1(s), the current source
i(s) is adjusted so that the output v2(s) is nulled. Under these null conditions, the impedance
ZN (s) is found as the ratio of v(s)t o i(s).
It is easiest to ﬁnd ZN (s) by ﬁrst determining the eﬀect of the null condition on the signals
in the circuit. Since v2 is nulled to zero, there is no current through the resistor R4. Since R3 is
connected in series with R4, there is also no current through R3, and hence no voltage across R3.
Therefore, the voltage v3 in Fig. 16.12b is equal to v2, i.e.,
v3= v2 →
null
0 (16.32)
Therefore, the voltage v is given by iR2. The impedance ZN is
ZN (s)= v(s)
i(s)
⏐⏐⏐⏐
⏐
v2→
null
0
= R2 (16.33)

636 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
(a) R1
+
v2(s)
–
v1(s) = 0
R2
R3
R4
port
ZD(s)
(b) R1
+
v2(s) 0
–
R2
R3
R4
port
+
–v1(s)
+ v(s) –
i(s)
ZN(s)= v(s)
i(s) v2(s)0
v3(s)
Fig. 16.12 Measurement of the quantities ZN (s)a n dZD(s): (a) determination of ZD(s); (b) determination
of ZN (s)
Note that, in general, the independent sources v1 and i are nonzero during the ZN measurement.
For this example, the null condition implies that the current i(s) ﬂows entirely through the path
composed of R2, R1, and v1.
The transfer function G(s) is found by substitution of Eqs. ( 16.31) and ( 16.33)i n t o
Eq. (16.30):
G(s)=
⎦ R4
R1+ R3+ R4
) (1+ sCR2)
(1+ sC [R2+ R1|| (R3+ R4)]) (16.34)
For this example, the result is obtained in standard normalized pole-zero form, because the
capacitor is the only dynamic element in the circuit, and because the “original conditions,” in
which the capacitor impedance tends to an open circuit, coincide with dc conditions in the
circuit. A similar procedure can be applied to write the transfer function of a circuit, containing
an arbitrary number of reactive elements, in normalized form via then-Extra Element Theorem
of Sect. 16.3.

16.2 EET Examples 637
16.2.2 An Unmodeled Element
In the simpleR–L–C low-pass ﬁlter illustrated in Fig.16.13, the capacitor dielectric loss, contact
(termination) resistance, and foil resistance are modeled by a series resistanceResr known as the
capacitor equivalent series resistance (ESR). Physical capacitors can contain signiﬁcant ESR,
which can degrade performance and can also lead to failure when the power lossI2
rms Resr causes
excessive temperature rise within the capacitor. The presence of ESR also alters the ﬁlter transfer
function. In ﬁrst-pass analysis of the transfer function, the ESR often is ignored (“unmodeled”);
later, it may be desired to include the eﬀects of this element in the analysis. The object of this
simple example is to include the ESR in the ﬁlter transfer function, as an extra element.
The ﬁlter transfer function G(s) is deﬁned as
G(s)= v
2
v1
(16.35)
Fig. 16.13 R–L–C ﬁlter example
L
C
R
+
v2v1
+
Resr
For the case Resr →0, the ﬁlter transfer function is
G(s)
⏐⏐⏐⏐
⏐
Resr→0
= 1
1+ sL
R + s2LC
(16.36)
We can therefore employ the Extra Element Theorem to determine how nonzero ESR changes
G(s). As illustrated in Fig. 16.14, we view the “original circuit” as the case where the ESR is
a short circuit, and addition of the “extra element” constitutes breaking this short circuit at the
port as shown.
L
C
R
+
v2v1
+
Port
Fig. 16.14 Treating the capacitor ESR as an extra element
In the presence of the ESR, the transfer function becomes
G(s)=
⎦
G(s)
⏐⏐⏐
⏐⏐
Resr→0
)
⎦
1+ Z(s)
ZN (s)
)
⎦
1+ Z(s)
ZD(s)
) (16.37)
where Z(s) is equal to Resr .

638 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
(a) L
C
R
+
v2(s)
ZD(s)
v1(s) = 0
(b) L
C
R
+
v2 0v1
+
i
+
v
Fig. 16.15 Capacitor ESR example: (a) determination of ZD(s); (b) determination of ZN (s)
Figure 16.15a illustrates determination of ZD(s). The input source v1(s) is set to zero, and
the impedance between the terminals of the port is found. It can be seen that the impedance
ZD(s) reduces to the capacitor impedance, in series with the parallel combination of the inductor
impedance and the load resistance R:
ZD(s)= 1
sC+
⎦
R
 sL
)
=
1+ sL
R + s2LC
sC
⎦
1+ sL
R
) (16.38)
Figure 16.15b illustrates determination of ZN (s). In the presence of the input source v1(s), a
current i(s) is injected at the port as shown. This current is adjusted such that the outputv2(s)i s
nulled. Under these conditions, the quantityZN (s)i sg i v e nb yv(s)/i(s). It can be seen that when
v2(s) is nulled, the voltagev(s) is equal to the currenti(s) multiplied by the capacitor impedance
1/sC. Therefore,
ZN (s)= v(s)
i(s)
⏐⏐
⏐⏐⏐
v2(s)→
null
0
= 1
sC (16.39)
Note that, in general, i(s) will not be equal to zero during the ZN (s) measurement. The null con-
dition is achieved by setting the source i(s) equal to the value−v1(s)/sL. Thus, in the presence
of nonzero Resr , the transfer function G(s) can be expressed as follows:
G(s)=
⎦
G(s)
⏐⏐
⏐⏐⏐
Resr→0
)
⎦
1+ Resr
ZN (s)
)
⎦
1+ Resr
ZD(s)
)
=
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1
1+ sL
R + s2LC
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(1+ sCResr ))⎦
1+ Resr
ZD(s)
) (16.40)

16.2 EET Examples 639
It can be seen that the correction factor adds a zero at frequencyωz= 1/ResrC, arising from the
ZN term. The denominator ZD term may additionally modify the transfer function; the denomi-
nator term has negligible eﬀect provided that
Resr ≪∥ ZD∥ (16.41)
We can now plot the impedance inequalities ( 16.28) to examine how addition of Resr
changes G(s). The magnitudes of ZD(s) and ZN (s) are constructed in Fig. 16.16 for the values
L= 100μH, C= 1μF, R= 100Ω, and Resr = 2Ω, using the approximate graphical construction
approach of Sect. 8.3.
ZN is equal to the capacitor impedance; at low frequency, Resr ≪∥ ZN∥. However, at high
frequency∥ZN∥ becomes small, and it is unavoidable that Resr becomes greater than∥ZN∥.T h i s
leads to the zero at frequency fz, as noted previously.
1 MHz100 kHz10 kHz1 kHz100 Hz
1
ωC
Resr = 2 W
|| ZD ||
ωL40 dB
20 dB
0 dB
60 dB
80 dB
100 W
10 W
1 W
0.1 W
1 k W
10 k W
R
|| ZN ||
f0
fz
Q = 10
1 W
R0 = 10 W
16 kHz
Fig. 16.16 Construction of the magnitude impedance Bode plots of ZN , ZD,a n dResr
For the values given,∥ZD∥≫ Resr at all frequencies except in the vicinity of the resonant
frequency f0. In consequence, the denominator ZD term of Eq. ( 16.40) is substantially equal
to one, except near this resonant frequency. At the resonant frequency f0, ZD is approximately
equal to 1Ω, so that the denominator ZD term becomes equal to
⎦
1+ Resr
ZD(s)
)
=
⎦
1+ 2Ω
1Ω
)
= 3 (16.42)
This eﬀectively reduces the transfer function Q–factor from 10 to approximately 10/3= 3.33.
By multiplying out Eq. ( 16.40), it can be veriﬁed that the exact transfer function G(s) can
be expressed as
G(s)= (1+ sCResr )
1+ s
⎦L
R+ ResrC
)
+ s2LC
⎦R+ Resr
R
) (16.43)
The eﬀect of the denominator ZD term is to reduce the exact Q-factor from 10 to 3.37, and to
reduce the resonant frequency f0 from 15.9 kHz to 15.8 kHz.

640 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
16.2.3 SEPIC Example
As a third example, let us consider derivation and design of the small-signal transfer func-
tions of the SEPIC. A small-signal SEPIC model is derived using average switch modeling
in Sect. 14.1.3, with the result given in Fig. 14.7 and reproduced in Fig. 16.17. Analysis of the
transfer function G
vd(s) is tedious because of the convoluted nature of the circuit that results
from averaged switch modeling. The Extra Element Theorem gives an alternate approach to
solution of this circuit, leading to a simpliﬁed interpretation of the transfer functions. This ap-
proach also leads to insight into how to damp the internal resonance of this fourth-order system,
so that the small-signal transfer functions are better behaved.
The diﬃculty in solution of the model of Fig.16.17 arises from element C
1, which provides
a path parallel to the DC transformer to couple the input and output sections of the model. If
this element were not present, solution of the circuit would be considerably simpler. Therefore,
the strategy employed in this section is to let C
1 become an open circuit, and solve the much
simpler model that is obtained. The Extra Element Theorem is then employed to incorporate
the eﬀects of C
1 into the transfer functions such as Gvd(s). We deﬁne
Gvd−bb= ˆv
ˆd
⏐⏐⏐
⏐⏐
C1→0
(16.44)
The Extra Element Theorem predicts that this transfer function can be written as follows:
Gvd= Gvd−bb
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1+ ZN
Z
1+ ZD
Z
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(16.45)
with Z = 1/sC1. The quantities ZN , and ZD are found using the Extra Element Theorem.
The impedance ZD is the driving-point impedance at the port where C1 is connected. Equa-
tions (16.44)–(16.45) state that the control-to-output transfer function of the SEPIC is equal to
that of an eﬀective buck–boost converterGvd−bb, multiplied by a correction factor that accounts
for the eﬀects of C1 and its associated resonances.
+
L1
C2
C1
L2 R
+ D : D
+
VC1
 + C1
IL1
 + L1
Vg + g
IL2 + L2
VC2
 + C2
V1
DD I2
DD
Fig. 16.17 The small-signal averaged switch model of the SEPIC, Fig. 14.7

16.2 EET Examples 641
+
L1
C2
L2
R
+ D′ : D
I2
DD'd
V1
DD'd
Vg +vg VC 2 +vC2
+
Fig. 16.18 When C1→0, the SEPIC model reduces to an eﬀective buck–boost converter
When we let C1 tend to an open circuit, the SEPIC model of Fig. 16.17 can be reduced
to the eﬀective buck–boost converter model illustrated in Fig. 16.18. The transfer functions of
this circuit can now be found in the usual manner, as described in Chaps. 7 and 8. The transfer
function from ˆd to ˆv is found by setting the ˆvg source to zero and solving for ˆv, with the following
result:
Gvd−bb(s)= Vg
D′2
1−s L1
R
⎦D
D′
)2
1+ s
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
L2+
⎦D
D′
)2
L1
R
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
+ s2C2
⎦
L2+
⎦D
D′
)2
L1
)
(16.46)
This expression is of the form
Gvd−bb(s)= Gd0
1−s
ωz
1+ s
Qoωo
+
⎦s
ωo
)2 (16.47)
with
Gd0= Vg
D′2
ωo= 1√
C2
⎦
L2+
⎦D
D′
)2
L1
) (16.48)
Qo= R
√ C2
L2+
⎦D
D′
)2
L1
ωz= R
L1
⎦D′
D
)2
(RHP)
Thus, Gvd−bb contains quadratic poles and a RHP zero.
Derivation of ZN is illustrated in Fig. 16.19.T h eˆvg source is set to zero. In the presence of
ˆd, a current ˆitest is injected into the port whereC1 would be connected. The sources are adjusted
to null the output ˆv.

642 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
Fig. 16.19 Derivation of ZN
The quantity ZN is given by
ZN = ˆvtest
ˆitest
⏐⏐
⏐
⏐⏐
ˆv→
null
0
(16.49)
To analyze this circuit, we start with the null condition, and follow the signals towards the in-
jection port. With the output voltage nulled ˆv→
null
0, the current in the load resistance R and the
output capacitance C2 are also nulled. This implies that the current in the transformer secondary
and primary windings are determined solely by the ˆdI2/DD′ current source of the averaged
switch model. Consequently, the primary current is ˆdI2/D′2 as shown. Additionally, the injec-
tion current ˆitest ﬂows entirely through inductor L2, and the voltage across L2 is equal to sL2ˆitest .
This voltage also appears across the transformer secondary, and can be employed to ﬁnd the
transformer primary voltage. This allows us to express the inductor L1 voltage as:
ˆvL1=−V1 ˆd
DD′ −sL2ˆitest
D′
D (16.50)
We can also write the loop equation
ˆvtest+ ˆvL1= sL2ˆitest (16.51)
Finally, we can write the node equation
ˆvL1
sL1
+
ˆdI2
D′2 + ˆitest = 0 (16.52)

16.2 EET Examples 643
Elimination of ˆvL1 and ˆd from Eqs. 16.50, 16.51, and 16.52, and solution for ˆvtest/ˆitest , leads to
the following expression for ZN :
ZN (s)= s (L1+ L2)
⎦
1−s L1∥L2
R
D
D′2
)
⎦
1−s D2L1
D′2R
) (16.53)
This equation is of the form
ZN (s)= s (L1+ L2)
⎦
1−s
ωzN
)
⎦
1−s
ωz
) (16.54)
It should be noted that a null impedance such asZN is not a passive or driving-point impedance,
and it is possible for this impedance to be negative or to contain RHP poles or zeroes. Equa-
tion (16.53) predicts that Z
N exhibits a low-frequency asymptote given by the series combina-
tion s(L1+ L2), which is purely inductive and exhibits phase of+90◦. ZN contains a RHP zero
and a RHP pole; the RHP pole coincides with the RHP zero ωz of Gvd−bb. The high-frequency
asymptote is given by sL2/D, which also is purely inductive with+90◦phase.
The quantity ZD is the driving-point impedance seen at the capacitor C1 port, with the ˆvg
and ˆd sources set to zero. As illustrated in Fig. 16.20, a test current ˆitest is injected at the port,
and the port voltage ˆvtest is measured. Since there are no null conditions associated withZD,t h i s
quantity generally depends on all elements, and therefore the algebra is more complex.
Fig. 16.20 Derivation of ZD

644 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
With some analysis and careful algebra, one can show that
ZD(s)= s(L1+ L2)
⎦
1+ s L1∥L2
D′2R + s2 L1∥L2
D′2 C2
)
⎛⎜⎜⎜⎜⎜
⎜⎜⎜⎜⎜⎜⎜⎜⎝
1+ s
L
2+
⎦D
D′
)2
L1
R + s2 C2
⎦
L2+
⎦D
D′
)2
L1
)
⎞⎟⎟⎟⎟⎟
⎟⎟⎟⎟⎟⎟⎟⎟⎠
(16.55)
This expression is of the form
Z
D(s)= s(L1+ L2)
⎛⎜⎜⎜⎜⎜⎝1+ s
QzDωzD
+
⎦ s
ωzD
)2⎞⎟⎟⎟⎟⎟⎠
⎛⎜⎜⎜⎜⎜⎝1+ s
Qoωo
+
⎦s
ωo
)2⎞⎟⎟⎟⎟⎟⎠
(16.56)
with
ωzD= D′
√(L1∥L2)C2
(16.57)
QzD= D′R
√
C2
L1∥L2
(16.58)
The quantities Gvd−bb and ZD have identical denominator polynomials.
Thus, the low-frequency asymptote of ZD is equal to s (L1+ L2). This asymptote is purely
inductive, with a phase of +90◦. There are mid-frequency quadratic poles and zeroes; these
may cause the mid-frequency asymptotes to become resistive or capacitive. The high-frequency
asymptote is
s (L1+ L2)
⎦ωp
ωz
)2
= s
⎦L1
D′2


L
2
D2
)
(16.59)
which again is purely inductive with phase of+90◦.
16.2.4 Damping the SEPIC Internal Resonances
Consider a SEPIC having the following element values: input voltage Vg = 18 V, output volt-
age V = 24 V, switching frequency fs = 100 kHz, inductances L1 = 100μH, L2 = 50μH,
capacitances C1 = 22μF, C2 = 220μF, and load resistance R= 5Ω. With these element
values, Eq. 16.48 predicts that Gvd−bb contains complex poles at fo = 711 Hz with Qo = 4.9.
Additionally, Gvd−bb contains a RHP zero at 4.5 kHz.
The impedances ZN (Eq. (16.53)), ZD (Eq. (16.56)), and Z= 1/sC1 are plotted in Fig.16.21.
At frequencies below approximately 2 kHz, the capacitorC1 impedance is much greater in mag-
nitude that either ZN or ZD. Hence the correction factor in Eq. (16.45) is approximately equal to
1, and the SEPIC Gvd is equal to the Gvd−bb of the eﬀective buck–boost model. At frequencies
above approximately 6 kHz, the capacitor C1 impedance is much smaller in magnitude than
both ZN and ZD. For this case, Eq. (16.45) reduces to:
```
