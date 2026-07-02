---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: "第16章part 2 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems"
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 649-668 > Chunk ID: `chapter-16-part-2`"
---

# 第16章part 2 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 649-668  
> Chunk ID: `chapter-16-part-2`

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
16.2 EET Examples 645
(a)
Frequency, Hz
102 103 104 105
Magnitude, dB
-30
-20
-10
0
10
20
30
40
ZN
ZD
Z
(b)
Frequency, Hz
102 103 104 105
Phase, degrees
-90
-45
0
45
90
135
ZN
ZD
Z
Fig. 16.21 Magnitude and phase Bode plots of the impedancesZN , ZD,a n dZ= 1/sC1 for the undamped
SEPIC example. Dashed curves: ZN and ZD. Solid curves: Z
Gvd→Gvd−bb
1+ ZN
Z
1+ ZD
Z
⏐⏐
⏐
⏐⏐⏐
⏐⏐⏐
⏐
Z→0
= Gvd−bb
⎦ZN
ZD
)
(16.60)
Since ZN and ZD are both inductive above 6 kHz, the ratio ( ZN/ZD) is constant, and hence Gvd
is equal to Gvd−bb scaled by this constant.
The impedance∥Z∥ is equal in magnitude to∥ZN∥ or∥ZD∥ at 3 to 4 kHz. Note that the phase
of the capacitor impedance∠Z is−90◦, while the impedances ZN and ZD are essentially induc-

646 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
tive and have phases of approximately+90◦. Hence, at 3 to 4 kHz, the phases ofZ/ZN and Z/ZD
are approximately 180◦, while the magnitudes are approximately equal to one. In the vicinity
of these frequencies, the correction factor in Eq. ( 16.45) can vary substantially, according to
Figs. 16.6 to 16.9. We expect the numerator and denominator terms of the correction factor to
contain resonances at these frequencies.
Figure 16.22 contains a Bode plot of the control-to-output transfer functions Gvd−bb(s) and
Gvd(s). The eﬀective buck–boost model contains resonant poles and a RHP zero, leading to
(a)
Frequency, Hz
102 103 104 105
Magnitude, dB
-60
-40
-20
0
20 Gvd-bb
Gvd
(b)
Frequency, Hz
102 103 104 105
Phase, degrees
-600
-500
-400
-300
-200
-100
0
Gvd-bb
Gvd
Fig. 16.22 Magnitude and phase Bode plots of the undamped control-to-output transfer function, SEPIC
example. Dashed curves: response of the e ﬀective buck–boost model Gvd−bb. Solid curves: response of
SEPIC, including correction factor, Gvd

16.2 EET Examples 647
+
D1L1
C2 R
+
VQ1
C1
Vg L2
Cb Rb
Fig. 16.23 Addition of damping network elements Rb and Cb to the SEPIC
a high-frequency phase asymptote of −270◦. The correction factor contributes two additional
high–Q poles and two RHP zeroes, in the vicinity of 3 kHz. These terms contribute an additional
−360◦of phase at high frequencies. Consequently, it is problematic to achieve an adequate phase
margin in a feedback loop having a crossover frequency above 3 kHz.
The dynamics of the SEPIC can be considerably improved by addition of a damping network
to C1, as illustrated in Fig. 16.23. This causes the “extra” impedance Z(s) to become:
Z(s)= 1
sC1



⎦
R
b+ 1
sCb
)
(16.61)
The element values are chosen so that the impedance Z is dominated by the damping resistor
Rb in the vicinity of the frequencies where∥Z∥ is equal to∥ZN∥ or∥ZD∥. The phase of Z tends
closer to 0◦, causing the phases of Z/ZN and Z/ZD to tend towards 90◦. According to Figs. 16.6
to 16.9, the variation in the correction factor is much less extreme in this case. The damping
network reduces the Q–factors of the poles and zeroes of the correction factor, and can also
move its RHP zeroes into the left half-plane.
Capacitor Cb is a dc blocking capacitor that prevents a dc voltage from being applied to
resistor Rb. This reduces the power loss that otherwise would be induced in Rb. The impedance
of capacitor Cb should be substantially smaller than Rb at the frequencies where∥Z∥ is close to
∥ZN∥ or∥ZD∥. Damping networks such as this Rb–Cb network are discussed in more detail in
Chap. 17.
Figure 16.24 illustrates construction of the asymptotes of the impedancesZN and ZD for this
example. Asymptotes for the impedance Z, including the Rb−Cb damping network designed
as described above, are overlayed. Again, the damping resistor Rb dominates the impedance Z
at the frequencies where ∥Z∥ is equal to ∥ZN∥ or∥ZD∥. The values of Rb and Cb can now be
selected so that these Z asymptotes are obtained.
A Bode plot of a damped Z, using the values C1 = 22μF, Rb = 2Ω, and Cb = 100μF, is
illustrated in Fig. 16.25. The magnitude of Z is now equal to the magnitudes of ZN or ZD at
frequencies in the vicinity of 2 kHz. At this frequency range, the phase of the damped Z is now
approximately−45◦.

648 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
10 Ω
1 Ω
100 mΩ
100 Ω
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz 1 MHz
10 dBΩ
0 dBΩ
Ω
20 dBΩ
30 dBΩ
40 dBΩ
Ω
Ω
||Z ||
||ZD
||
||ZN
||
Rb
ω L1
+L2
1
ω C1 + Cb
1
ω C1
Fig. 16.24 Construction of the magnitude asymptotes for ZN , ZD, and the damped Z
Figure 16.26 compares the resulting Gvd(s) with Gvd−bb(s). It can be observed that the Q–
factors of the correction factor poles and zeroes are substantially reduced, and the RHP zeroes
have moved to the left half-plane. These poles and zeroes nearly cancel. The magnitude and
phase of Gvd(s) now is approximately equal to that of the eﬀective buck–boost converter model.
The SEPIC control-to-output transfer functionGvd(s) naturally contains four poles and three
RHP zeroes. The Extra Element Theorem approach shows how this transfer function can be
viewed as a simpler eﬀective buck–boost transfer function Gvd−bb(s) containing two poles and
one RHP zero, multiplied by a correction factor that accounts for the additional poles and zeroes.
Further, the Extra Element Theorem approach provides a framework for designing a damping
network that causes the correction factor poles and zeroes to approximately cancel. The result-
ing G
vd(s) is then approximately equal to the much simpler Gvd−bb(s).
16.3 The n-Extra Element Theorem
The n Extra Element Theorem (nEET) is an extension of Middlebrook’s Extra Element Theorem
to the case when multiple extra elements are added simultaneously to a circuit. Its major appli-
cation is to write transfer functions directly as rational fractions, without need to perform loop
and node analysis and algebraic manipulations. This is accomplished by treating each reactive
component as an “extra” element that is added to the dc gain of the network. The method gives
a physical interpretation to the coeﬃcients of L and C in the standard normalized form of the
transfer function, and it allows complex transfer functions to be derived nearly by inspection.
Use of the basicnEET to derive transfer functions is described here without proof, beginning
with a simple example. Extensions involving inverted forms as special cases are also described.
For a derivation and more general treatment of the nEET, the interested reader is referred to
[141, 142].

16.3 The n-Extra Element Theorem 649
(a)
Frequency, Hz
102 103 104 105
Magnitude, dB
-30
-20
-10
0
10
20
30
40
ZN
ZD
Z
(b)
Frequency, Hz
102 103 104 105
Phase, degrees
-90
-45
0
45
90
135
ZN
ZD
Z
Fig. 16.25 Magnitude and phase Bode plots of the impedances ZN , ZD,a n d Z for the damped SEPIC
example. Dashed curves: ZN and ZD. Solid curves: Z
16.3.1 Introduction to the n-EET
Given a linear network containing n inductors and m capacitors, it is desired to ﬁnd a transfer
function G(s)= y(s)/u(s). It is assumed here that this transfer function can be written as a
rational fraction referenced to a dc gain, as follows:
G(s)= Gdc
1+ a1 s+ a2 s2+... + an+m sn+m
1+ b1 s+ b2 s2+... + bn+m sn+m (16.62)

650 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
(a)
Frequency, Hz
102 103 104 105
Magnitude, dB
-60
-40
-20
0
20
Gvd-bb
Gvd
(b)
Frequency, Hz
102 103 104 105
Phase, degrees
-600
-500
-400
-300
-200
-100
0
Gvd-bb
Gvd
Fig. 16.26 Eﬀects of R–C damping network on the control-to-output transfer function, SEPIC exam-
ple. Dashed curves: response of the eﬀective buck–boost model Gvd−bb. Solid curves: response of SEPIC,
including correction factor, Gvd
Special cases whose transfer functions cannot be written in this manner, such as when G(s)
contains poles or zeroes at the origin, are treated in a later section. The method used here
employs a generalization of the Extra Element Theorem, in which all of the inductors and
capacitors are treated as “extra” elements, and are added simultaneously. The zeroes ofG(s)a r e
found with the output nulled in the presence of the input, while the poles are found with the
input set to zero. The method allows the coeﬃcients a
1, a2,... an+m, b1, b2,... bn+m to be found
by evaluating the resistances seen looking into the inductor or capacitor ports under various
special conditions.

16.3 The n-Extra Element Theorem 651
Let us ﬁrst deﬁne the following terminology:
DC state: the DC state of an inductor is a short circuit, and the DC state of a capacitor is an
open circuit.
HF state: the high-frequency (HF) state of an inductor is an open circuit, and the HF state
of a capacitor is a short circuit.
In the terminology of the Extra Element Theorem, the “original gain” of the circuit is the refer-
ence dc gain Gdc = G(0), found with all dynamic elements set to their DC states. The transfer
function s-coeﬃcients depend on how the reactive elements change to their HF states, as ex-
plained below.
The general form of the coeﬃcient of sk has dimensions (Hz)−k, and is a sum of products
of all combinations of terms of the form RxCi and Lj/Ry which contain the proper dimensions.
The Rx and Ry terms are found by application of the nEET, with injection at the terminals of the
corresponding reactive element. In the case of denominator coeﬃcients, the input source u(s)i s
set to zero. For numerator coeﬃcients, the transfer function output y(s) is nulled.
+v1
R1
R2
L
C
+
v2
Fig. 16.27 R–L–C circuit example
Consider the low-pass ﬁlter circuit of Fig. 16.27. It is desired to compute the transfer func-
tion G(s)= v2(s)/v1(s). This transfer function contains two poles and no zeroes (why?), and
can be written in the following form:
G(s)= Gdc
1
1+ b1 s+ b2 s2 (16.63)
The dimensions of b1 are (Hz)−1. The two possible terms in b1 are
L
Ra
and RbC (16.64)
The dimensions of b2 are (Hz)−2. The only possible term in b2 is of the form:
⎦L
Rc
)
(RdC) (16.65)
The nEET shows us how to easily ﬁnd Ra, Rb, Rc, and Rd.

652 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
The dc gain Gdc is found by setting both reactive elements to their DC states,i.e., the induc-
tor is set to a short circuit and the capacitor is set to an open circuit. Under these conditions, the
transfer function G(s) reduces to that of a voltage divider:
Gdc= R2
R1+ R2
(16.66)
As with the ZD term of the EET, the terms in the denominator polynomial are found with
the input source v1 set to zero. The inductor and capacitor are treated as extra elements, and the
circuit of Fig. 16.28 is obtained.
R1
R2
L
C
Port
A
Port
B
Fig. 16.28 R–L–C circuit example: use of the nEET to ﬁnd the denominator terms
Since the circuit contains two reactive elements, the denominator is a second-order polyno-
mial that can be written in the following form:
denominator= 1+ s
⎦L
Ra
+ RbC
)
+ s2
⎦L
Rc
RdC
)
(16.67)
The resistance Ra is the resistance seen at the inductor port (Port A), with the capacitor set to
its DC state: Port B is treated as an open circuit. Under these conditions, the resistance between
the terminals of Port A is the series combination of R1 and R2:
Ra= R1+ R2 (16.68)
In a similar manner, the resistance Rb is the resistance seen at the capacitor port (Port B) with
the inductor set to its DC state: Port A is treated as a short circuit. Under these conditions, the
resistance between the terminals of Port B is the parallel combination of R1 and R2:
Rb= R1
R2 (16.69)
For the coeﬃcient of s2, there are two possible approaches that in principle lead to the same
result. We can choose one of the terms (either Rc or Rd) to be the same as the corresponding s1
term. For example, let us select the term associated with the inductor port,Rc,t ob et h es a m ea s
in the s1 coeﬃcient:
Rc= Ra= R1+ R2 (16.70)

16.3 The n-Extra Element Theorem 653
Then Rd is the resistance looking into the capacitor port (Port B), with the inductor set to its
high-frequency state, or open-circuited. With Port A open-circuited, the resistance between the
terminals of Port B is seen to be
Rd= R2 (16.71)
Therefore, the transfer function G(s)i s
G(s)= R2
R1+ R2
1
1+ s
⎦ L
R1+ R2
+ R1

R
2C
)
+ s2
⎦
LC R2
R1+ R2
) (16.72)
Thus, the coeﬃcients in the transfer function can be found using some simple rules, without
need for algebraic analysis. The reader may wish to verify the result of Eq. ( 16.72) via conven-
tional analysis, and compare the amount of work required.
16.3.2 Procedure for DC-Referenced Functions
As illustrated in the simple example above, the denominator terms are found by setting the
input u(s) to zero, and evaluating the resistance seen at the given port under speciﬁc conditions.
The numerator terms are found by null double injection in the presence of the input u(s), to
null the output y(s). For a network containing a total of p independent reactive elements, the
numerator and denominator polynomials may contain terms of order up to sp. Terms within
these polynomials of order sq could include some or all combinations of the sums of products
of reactive elements taken q at a time. The numerator and denominator polynomials are of the
following form:
1+ s
⎛⎜⎜⎜⎜⎜⎝
n∑
i=1
Li
Ri
+
m∑
i=1
RiCi
⎞⎟⎟⎟⎟⎟⎠+ s2
⎦∑∑ LiLj
RiRj-i
+
∑∑ Li
Ri
C jRj-i+
∑∑
CiRiC jRj-i
)
+ s3
⎦∑∑∑ LiLjLk
RiRj-iRk-ij
+
∑∑∑ LiLj
RiRj-i
CkRk-ij +
∑∑∑ Li
Ri
C jRj-iCkRk-ij
+
∑∑∑
CiRiC jRj-iCkRk-ij
)
+ s4... (16.73)
The nEET tells us how to easily ﬁnd the resistances Ri, Rj-i, etc., in the above polynomial. In
Eq. (16.73), the ﬁrst subscript of each resistance (before the hyphen) denotes the port where
the resistance is measured, while any additional subscripts (after the hyphen) denote ports that
are set to their high-frequency states during this measurement. The order of these additional
subscripts is irrelevant. The coeﬃcients are determined using the following speciﬁc conditions:
Coeﬃcients of s1: Ri is the resistance seen at port i with all other ports set to their DC
states.
Coeﬃcients of s
2: Ri is the same term as in the corresponding coe ﬃcient of s1, i.e., the
resistance seen at port i with all other ports set to their DC states. Rj-i is the resistance seen
at port j, with all other ports except port i set to their DC states. Port i is set to its HF state.
Coeﬃcients of s3: Ri and Rj-i are the same terms appearing in the coeﬃcients of s2. Rk-ij is
the resistance seen at port k, with all other ports except ports i and j set to their DC states.
Ports i and j are set to their HF states.

654 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
Higher-order terms: the above process continues for higher-order terms. The highest-order
term will be measured at one port, with all other ports set to their HF states.
The orders of the terms in the above equation are irrelevant; for example, it can be shown by
reciprocity that Ri- jRj = Rj-iRi (with a similar result for higher-order terms). This implies that
it does not matter which reactive element is set to the high-frequency state: either one can be
chosen, and the appropriate resistance terms found, leading to a consistent result. Again, each
term (e.g., R
i) is found by current injection at the connections to the corresponding reactive
element (e.g., in place of L1). For denominator terms, the transfer function input is set to zero.
For numerator terms, the output is nulled by adjusting the current injection at the port, in the
presence of the transfer function input source. For each coeﬃcient, it is necessary to derive only
one new term; the other terms are identical to the corresponding terms in a previous lower-order
coeﬃcient.
By following the above rules, the transfer function can be written directly, without need
for algebraic manipulations. Admittedly, some practice is required to become facile with these
rules; nonetheless, the eﬀort required to write exact expressions for complex circuits can be
considerably reduced.
16.4 n-EET Examples
16.4.1 Two-Section L–C Filter
As another example of the nEET, consider the two-section L–C ﬁlter of Fig. 16.29. Since this
circuit has four reactive elements, we expect the transfer function G(s)= v2(s)/v1(s)t oh a v e
four poles. We also expect the high-frequency asymptote to have a−80 dB/decade slope: at high
frequency each inductor tends to an open circuit and each capacitor tends to a short circuit, with
each element leading to reduction of the gain of the path between the input and output of the
ﬁlter. Hence, we expect that this ﬁlter circuit contains no zeroes.
+v1
L1 L2
R
+
v2C1 C2
Fig. 16.29 Two-section L–C ﬁlter example
The DC gain Gdc is found by setting all reactive elements to their dc states; the input is then
directly connected to the output, and so Gdc is equal to one. Thus the transfer function is of the
form:
G(s)= 1
1+ b1 s+ b2 s2+ b3 s3+ b4 s4 (16.74)

16.4 n-EET Examples 655
Fig. 16.30 Two-section L–C ﬁlter
example: ﬁnding the denominator
terms
L1 L2
RC1 C2
Port
a
Port
c
Port
d
Port
b
The denominator polynomial is found when the input v1(s) is set to zero. The circuit can
then be written as in Fig. 16.30. We now apply the procedure of Sect. 16.3.2 to this circuit,
ﬁnding the driving-point impedances at the ports with the other ports set to their DC or HF
states as required. The results are summarized in Table 16.1.
Table 16.1 Derivation of Denominator Terms, Two-SectionL–C Filter Example
Term
States of Ports/ Reactive Elements
ResultL1 L2 C1 C2
Port A Port B Port C Port D
sL1
Ra
Measurement DC /short DC /open DC /open Ra= R
sL2
Rb
DC/short Measurement DC /open DC /open Rb= R
sC1Rc DC/short DC /short Measurement DC /open Rc = 0
sC2Rd DC/short DC /short DC /open Measurement Rd = 0
s2 L1L2
RaRb-a
HF/open Measurement DC /open DC /open Rb-a=∞
s2 L1
Ra
C1Rc-a HF/open DC /short Measurement DC /open Rc-a= R
s2 L1
Ra
C2Rd-a HF/open DC /short DC /open Measurement Rd-a= R
s2 L2
Rb
C1Rc-b DC/short HF /open Measurement DC /open Rc-b= 0
s2 L2
Rb
C2Rd-b DC/short HF /open DC /open Measurement Rd-b= R
s2C1RcC2Rd-c DC/short DC /short HF /short Measurement Rd-c= 0
s3 L1
Ra
C1Rc-a
L2
Rb-ac
HF/open Measurement HF /short DC /open Rb-ac= R
s3 L1
Ra
C2Rd-a
L2
Rb-ad
HF/open Measurement DC /open HF /short Rb-ad =∞
s3 L1
Ra
C2Rd-a C1Rc-ad HF/open DC /short Measurement HF /short Rc-ad = 0
s3 L2
Rb
C2Rd-b C1Rc-bd DC/short HF /open Measurement HF /short Rc-bd = 0
s4 L1
Ra
C1Rc-a
L2
Rb-ac
C2Rd-abc HF/open HF /open HF /short Measurement Rd-abc= R

656 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
Fig. 16.31 Finding Ra
Ra
R
Port
a
Port
c
Port
d
Port
b
DC/short
DC/open
DC/open
For the denominator term sL1/Ra, the coeﬃcient Ra is the resistance between the Port a
terminals, with the reactive elements of the remaining ports set to their dc states. As illustrated
in Fig. 16.31, inductor L2 at Port b becomes a short circuit, while capacitors C1 and C2 at Ports
c and d become open circuits. It can be seen that Ra is equal to R. The remaining s1 terms of
Table 16.1 are left to the reader to verify.
Fig. 16.32 Finding Rb-a
Rb-a
R
Port
a
Port
c
Port
d
Port
b
HF/open
DC/open
DC/open
Figure 16.32 illustrates determination of Rb-a, as needed in the denominator term
s2
⎦L1
Ra
)⎦L2
Rb-a
)
(16.75)
The Ra term coincides with the result derived in the previous paragraph. The term Rb-a is the
resistance between the Port b terminals, with the element L1 at Port a set to its high-frequency
state (an open circuit). The remaining reactive elements C1 and C2 are set to their dc states
(open circuits). It can be seen that Port b becomes an open circuit under these conditions, and
hence Rb-a =∞. In consequence, the denominator s2 term of Eq. (16.75) is equal to zero. The
remaining s2 terms of Table 16.1 are left to the reader to verify.
Let us consider next the denominator term s3L1L2C1/Rx. One way to approach solu-
tion for this term is to apply the result of the previous paragraph to express this term as
s3(L1/Ra)(L2/Rb-a)(C1Rc-ab). However, since the result of the previous paragraph wasRb-a=∞,
such an approach will lead to an indeterminate result withRc-ab=∞(try it!). Instead, we should
base our approach on an s2 term that is nonzero. By examination of Table16.1, one can see that
the term s2(L1/Ra)(C1Rc-a) is nonzero. Therefore, let us determine Rb-ac, as needed to express
this denominator term as s3(L1/Ra)(C1Rc-a)(L2/Rb-ac). As illustrated in Fig. 16.33, the quantity
Rb-ac is equal to the resistance between the Portb terminals when L1 and C1 are set to their high-
frequency states, and C2 remains in its dc state. It can be seen that Rb-ac= R. The remaining s3
t e r m so fT a b l e16.1 are also left to the reader to verify.

16.4 n-EET Examples 657
Fig. 16.33 Finding Rb-ac
Rb-ac
R
Port
a
Port
c
Port
d
Port
b
HF/open
HF/short
DC/open
There is a single s4 term. To ﬁnd this term, we should begin with a nonzero s3 term. The
result of the previous paragraph is such a term. Hence, let us express the s4 term in the form
s4(L1/Ra)(C1Rc-a)(L2/Rb-ac)(C2Rd-abc). As illustrated in Fig. 16.34, the quantity Rd-abc is the re-
sistance between the Port d terminals when the elements at Ports a, b, and c are set to their
high-frequency states. By examination of Fig. 16.34, it can be seen that Rd-abc= R.
Fig. 16.34 Finding Rd-abc
Rd-abc
R
Port
a
Port
c
Port
d
Port
b
HF/open
HF/short
HF/open
The results of Table 16.1 predict that the denominator polynomial is
denominator= 1+ s
⎦L1
R + L2
R + C1· 0+ C2· 0
)
+
s2
⎦L1
R
L2
∞+ L1
R C1R+ L1
R C2R+ L2
R C1· 0+ L2
R C2R+ C1· 0 C2· 0
)
+
s3
⎦L1
R C1R L2
R + L1
R
L2
∞C2R+ L1
R C2RC1· 0+ L2
R C2RC1· 0
)
+
s4
⎦L1
R
L2
R C1RC2R
)
(16.76)
Upon elimination of terms that evaluate to zero, the transfer function G(s) can then be written
as:
G(s)= 1
1+ s
⎦L1+ L2
R
)
+ s2
⎦
L1 (C1+ C2)+ L2C2
)
+ s3
⎦L1L2C1
R
)
+ s4
⎦
L1L2C1C2
) (16.77)
Thus, the coeﬃcients in the transfer function of this somewhat complex fourth-order ﬁlter circuit
are found through a sequence of simple circuit evaluations. With practice, one can perform these
evaluations quickly using the schematic of Fig.16.30. Additionally, terms derived in other ways
can be checked using this approach. The nEET approach is particularly advantageous when
circuit contains multiple resistors and more complex interconnections.

658 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
It should also be noted that, if we had not had the insight that G(s) contains no zeroes, we
could have employed the procedure of Sect. 16.3.2 to compute the numerator polynomial. We
would have found that the numerator terms of order s1 to s4 are zero.
16.4.2 Bridge-T Filter Example
As a third example, consider the Bridge-T ﬁlter circuit of Fig. 16.35. Conventional analysis of
the transfer function G(s)= v2(s)/v1(s) for this circuit is somewhat onerous because of element
C2. Let us derive this transfer function using the nEET.
Since there are two reactive elements, we expectG(s) to contain two poles. Additionally, we
expect the high-frequency asymptote of G(s) to be equal to one because capacitor C2 tends to
zero impedance at high frequency, shorting the output to the input. ThereforeG(s) must contain
two zeroes, so that its high-frequency magnitude asymptote has a slope of 0 dB/decade. Hence
the transfer function is of the form
G(s)= Gdc
1+ a1 s+ a2 s2
1+ b1 s+ b2 s2 (16.78)
Analysis requires application of the procedure of Sect. 16.3.2 twice. First, null double injection
is employed to ﬁnd the numerator polynomial under the conditions that the output v2 is nulled.
A subscript N is appended to the resistance names, to distinguish these numerator terms from
Fig. 16.35 Bridge-T ﬁlter example
+v1
R1
R3
+
v2
R2
C1
C2
the similarly named denominator terms. Second the procedure of Sect. 16.3.2 is applied under
the conditions that the input v1 is set to zero, to ﬁnd the denominator polynomial. A subscript
D is appended to the names of the denominator resistance terms.
First consider determination of the zeroes of G(s). The numerator polynomial can be ex-
pressed in the form:
numerator= 1+ s (C1RNa+ C2RNb )+ s2C1RNa-bC2RNb (16.79)
Here, capacitor C1 is connected at Port a and capacitor C2 is connected at Port b.
Figure 16.36 illustrates the determination of RNa . Capacitor C2 is set to its dc state (open
circuit at Port b). In the presence of the input sourcev1, a current source itest is applied at Port a,
and the two sources are adjusted to null the output v2. One follows this null condition towards

16.4 n-EET Examples 659
Fig. 16.36 Determination of
numerator RNa
+v1
R1
R3
+
v2 null→ 0
R2
Port
b
DC/open
Port
a
+
vtestitest
0
0
the injection point to ﬁnd the Port a voltage vtest . With the output voltage nulled, the current
through resistor R3 is also nulled. Since there is no current through the open-circuited Port b,
the current through resistor R2 must also be nulled. By Ohm’s law, the voltage acrossR2 is zero,
and hence the voltage vtest is zero. Therefore, the numerator RNa is
RNa = vtest
itest
⏐⏐⏐⏐
⏐
v2→
null
0
= 0 (16.80)
The quantity RNb is found in a similar manner. In the presence of the input v1, current injection
is applied at the C2 port (Port b) and adjusted to null the output v2. Capacitor C1 is set to its dc
state, and hence Port a becomes an open circuit. This measurement is illustrated in Fig. 16.37.
Since the current through resistorR3 is nulled to zero, the currentitest must ﬂow through resistors
R2 and R1. Therefore the voltage vtest is equal to itest (R1+ R2), and the numerator RNb is given
by:
RNb = vtest
itest
⏐⏐
⏐
⏐⏐
v2→
null
0
= R1+ R2 (16.81)
Fig. 16.37 Determination of
numerator RNb
+v1
R1
R3
+
R2
Port
bDC/open
Port
a
0
test +
itest
itest
v2 null→ 0
To ﬁnd RNa-b, the current itest is injected at Port a, and capacitor C2 is set to its high-
frequency state (Port b is shorted). The independent sources v1 and itest are adjusted to null

660 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
the output v2. This experiment is illustrated in Fig.16.38. For this particular circuit, the shorting
of Port b causes the output v2 to be equal to the input v1, and hence the output null condition
cannot be achieved unless the input voltage source v1 is zero. Under this condition, the current
itest ﬂows through the parallel combination of R1 and R2, and hence vtest is equal to itest R1∥R2.
The numerator RNa-b is given by
RNa-b= vtest
itest
⏐⏐⏐
⏐⏐
v2→
null
0
= R1

R
2 (16.82)
Upon insertion of Eqs. ( 16.80)–(16.82) into Eq. ( 16.79), one ﬁnds that the numerator polyno-
mial is given by
numerator= 1+ sC2 (R1+ R2)+ s2C1C2R1R2 (16.83)
Next consider determination of the poles of G(s). The denominator polynomial can be ex-
pressed in the form:
denominator= 1+ s (C1RDa+ C2RDb)+ s2C1RDa-bC2RDb (16.84)
The driving-point resistances RDa, RDb, and RDa-b are found with the input source v1 set to zero.
Figure 16.39 illustrates the determination of RDa. Capacitor C2 is set to its dc state (open
circuit at Port b), and the input source v1 is set to zero (short circuit). The resistance between
the Port a terminals is found, with the result
RDa= R1
 (R2+ R3) (16.85)
Fig. 16.38 Determination of
numerator RNa-b
+v1
R1
R3 null
+
v2 ® 0
R2
Port
b
HF/short
Port
a
+
vtestitest
0
itest
Fig. 16.39 Determination of
denominator RDa
R1
R3
R2
Port
b
DC/open
Port
a
RDa

16.5 Frequency Inversion 661
The quantity RDb is found in a similar manner: it is the resistance between the Port (b) terminals
with capacitor C1 set to its dc state (open circuit at Port a) and with the input source v1 set to
zero. The result is
RDb= R3

 (R
1+ R2) (16.86)
Figure 16.40 illustrates the determination of RDa-b. Capacitor C2 is set to its high-frequency
state (short circuit at Port b), and the input source v1 is set to zero (short circuit). The resistance
between the Port a terminals is found, with the result
RDa-b= R1
R2 (16.87)
Fig. 16.40 Determination of
denominator RDa-b
R1
R3
R2
Port
b
HF/short
Port
a
RDa-b
Hence, the denominator polynomial is
denominator= 1+ s
[
C1
⎦
R1
 (R2+ R3)
)
+ C2
⎦
R3
 (R1+ R2)
)]
+
s2 [
C1C2
⎦
R1

 (R
2+ R3)
)⎦
R1

R
2
)]
(16.88)
Finally, the dc gain Gdc is found by setting all reactive elements to their dc states, and then
solving for the transfer function. The result is found using the voltage divider formula to obtain
Gdc= R3
R1+ R2+ R3
(16.89)
The complete transfer function is obtained by substitution of Eqs. (16.83), (16.88), and (16.89)
into Eq. (16.78).
16.5 Frequency Inversion
Sometimes, the dc gain of a transfer function or other function of interest is zero or inﬁnite;
this occurs when there are poles or zeroes at the origin of the complex plane. In the power
electronics ﬁeld, this is nearly always the case for impedances because we do not want the dc
or low-frequency ac current to ﬂow through a lossy resistive element. This also often occurs in
compensator transfer functions, where PI or PID compensators are employed.

662 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
16.5.1 Example: Damped Input Filter
For example, consider the output impedanceZ(s) of the damped input ﬁlter circuit illustrated in
Fig. 16.41. To measure this output impedance, we would set the independent source ˆvg to zero,
then inject a current ˆi and measure the induced voltage ˆv as shown in Fig. 16.42. The output
impedance is then given by
Z(s)= ˆv
ˆi
⏐⏐⏐
⏐⏐⏐
ˆvg=0
(16.90)
So we can view Z(s) as the transfer function from ˆi to ˆv. If we attempt to use the n-Extra
Element Theorem in its basic form to express Z(s), we ﬁnd that the dc value of Z(s) is zero, so
that
Z(s)= 0· numeratorpolynomial
denominatorpolynomial (16.91)
Because the reference gain is zero, this approach does not work.
Figure 16.43 illustrates graphical construction of the output impedance asymptotes, using
the approach of Sect. 8.3, for some assumed element values with L1 ≫ L2. It appears that Z(s)
could be expressed with reference to the midband asymptote R, using an inverted pole at R/L2,
plus a zero at R/L1 and complex poles atω0= 1/√L1C:
Z(s)≈R
⎦
1+ sL1
R
)
⎦
1+ R
sL2
) ⎛⎜⎜⎜⎜⎜⎝1+ s
Qω0
+
⎦s
ω0
)2⎞⎟⎟⎟⎟⎟⎠
(16.92)
+
L2
Cvg
L1R
Z(s)
Fig. 16.41 A damped LC ﬁlter
Fig. 16.42 Measurement of the output impedance Z(s)o ft h eL Cﬁ l t e ro fF i g .16.41

16.5 Frequency Inversion 663
Fig. 16.43 Graphical construction of typical output impedance asymptotes of the LC ﬁlter of Fig. 16.41
This suggests that, to ﬁnd the exact expression for Z(s), we could employ frequency inversion
to express Z(s) with respect to the reference gain R.
This can be achieved with a generalization of thenEET to handle frequency inversion. First,
we must extend the notion of the “DC state” and “HF state” of a reactive element, to the follow-
ing:
Reference state: the reference state of a reactive element is the state (short circuit or open
circuit) that causes the transfer function to be equal to the reference gain.
Inverse state: the inverse state of a reactive element is the opposite (open circuit or short
circuit) of its reference state.
For the example of Fig.16.42, Z(s) is equal to R when L1 is short-circuited, L2 is open-circuited,
and C is open-circuited. Hence we deﬁne these as the reference states of these elements, as
summarized in Table 16.2.
Table 16.2 Reference and Inverse States of Reactive Elements, Damped L–C Filter Example
Element Reference State Inverse State
L1 Short Open
L2 Open Short
C Open Short
The reference states of elements L1 and C coincide with their DC states, while the reference
state of L2 coincides with its HF state. We therefore treat L2 using frequency-inverted terms:
where we previously employed a term of the form
sL2
Ra
(16.93)
we now use the inverted form Ra
sL2
(16.94)

664 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
If the reference state of capacitor C had been its high-frequency state, then we would have
replaced terms of the form
sCRa (16.95)
with the inverted form 1
sCRa
(16.96)
We now generalize the procedure of Sect. 16.3.2, replacing DC and HF port states with ref-
erence and inverse states. The notation RN1−2, RD3−12, etc., now has the meaning that additional
subscripts after the hyphen denote ports that are set to their inverse states during measurement,
while other ports are set to their reference states. Hence Z(s) will be expressed in the form
Z(s)= R numerator
denominator (16.97)
The denominator may contain products having one, two, or all three reactive elements. For the
output impedance example, we obtain:
denominator= 1+
⎦sL1
RDa
+ sCRDb+ RDc
sL2
)
+
⎦
sCRDb
sL1
RDa−b
+ sCRDb
RDc−b
sL2
+ RDc
sL2
sL1
RDa−c
)
+
⎦
sCRDb
sL1
RDa−b
RDc−ab
sL2
)
(16.98)
Through the reciprocity relationship RDi−jRDj = RDj−iRDi, it is possible to express the denomi-
nator in more than one way, as in earlier examples.
Fig. 16.44 Damped L–C ﬁlter exam-
ple of Fig. 16.41: ﬁnding the output
impedance denominator terms. The inde-
pendent sources ˆv
g and ˆi are set to zero
L2
C
L1
R Port
a
Port
b
Port
c
We now ﬁnd the coeﬃcients RDa through RDc−ab in the usual way, except that “DC state” is
replaced with “reference state,” and “HF state” is replaced with “inverse state.” The denominator
coeﬃcients are found with the independent sources set to zero: ˆvg = 0 and ˆi= 0, as illustrated
in Fig. 16.44.
```
