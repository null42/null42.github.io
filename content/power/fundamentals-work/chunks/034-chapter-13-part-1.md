---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: "第13章part 1 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem"
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 515-534 > Chunk ID: `chapter-13-part-1`"
---

# 第13章part 1 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 515-534  
> Chunk ID: `chapter-13-part-1`

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
13
Techniques of Design-Oriented Analysis: The
Feedback Theorem
13.1 Introduction to Part IV
Part IV of this text develops analytical tools needed to understand and design larger power
electronic systems. It builds on the basic modeling and analysis techniques developed in PartII
to analyze and simulate complex feedback circuits, including those having input EMI ﬁlters,
current-mode control, or digital control.
As introduced in Chap. 8, Design-Oriented Analysis (D-OA) is a collection of analytical
tools that aid the analysis of complex circuits and systems, with the goal of deriving tractable
equations that are useful for design. Part IV covers three more advanced techniques of D-OA
that are based on linear superposition and the null double injection analysis technique. The
goal of these techniques is the further development of analytical tools that aid in the design of
complex analog systems, including development of additional approximation methods and of
more powerful analytical methods.
The closed-loop switching regulator block diagram studied in Sect. 9.1 employs idealized
blocks that do not explicitly represent input and output impedances or bidirectional signal ﬂow.
While this often is a useful approach, there are cases where interactions between circuit ele-
ments are not easily characterized as unidirectional blocks that do not signiﬁcantly load each
other. Middlebrook’s General Feedback Theorem [106] is a general technique that allows de-
termination of loop gains and other important transfer functions of a circuit, without need for
identiﬁcation of blocks. This technique can be viewed as a generalization of the loop gain mea-
surement techniques described in Sect. 9.6, to perform analytical “thought experiments” to ﬁnd
the transfer functions obtained by null double injection in the feedback circuit.
The single-loop version of the feedback theorem is derived in Sect. 13.2, based on linear
superposition and null double injection. Two common circuit examples are then examined. The
eﬀect of the bandwidth of a practical op amp on the behavior of a PD compensator circuit is
determined in Sect. 13.3. The feedback theorem is employed to ﬁnd the closed-loop transfer
functions of a buck regulator in Sect. 13.4. This analysis is extended in Chap. 17 to examine
the eﬀect of an input EMI ﬁlter on a buck regulator, and in Chap.18 to examine the eﬀect of an
EMI ﬁlter on a current-mode regulator system.
Averaged switch modeling is a subset of the subject of averaged converter modeling, and
leads to results that are equivalent to the models developed in Chap. 8. This technique is par-
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_13
509

510 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
ticularly well suited to SPICE-based simulation of converters, and is developed in Chap. 14.
Averaged switch modeling also exposes the fundamental direct and indirect power conversion
mechanisms that are inherent in high-eﬃciency electronic power conversion circuits. Averaged
switch modeling is extended to ac modeling of the discontinuous conduction mode in Chap.15.
The Extra Element Theorem exposes how a known transfer function is changed by addition
of a new network element; this theorem is introduced in Chap. 16. A classic application of the
EET is the addition of an input EMI ﬁlter to a closed-loop switching regulator, and damping of
this ﬁlter so that it does not degrade regulator performance and stability. Input ﬁlter analysis and
design is covered in Chap. 17.T h en–Extra Element Theorem (n–EET) is an extension of the
EET to cover the simultaneous addition of multiple elements to a circuit. A useful application
of the n–EET is the treatment of all reactive components as extra elements: a transfer function
can be written as a normalized rational fraction with little or no algebra.
Current-mode control is a popular approach to control of switching converters, in which the
peak transistor current replaces the duty cycle as the control variable that is commanded by the
compensator output. This approach contains an inherent inner current feedback loop, which can
improve control response but complicates the analysis. The Tan model [ 107] of current-model
control systems is developed in Chap. 18.
With the advent of high-performance low-cost microcontrollers, digital control of switch-
ing converters has proliferated. Digital control techniques for switching power converters are
introduced in Chap. 19. The basic issues of sampling, quantization, and discrete time eﬀects are
described and characterized. Techniques for design of digital compensators are developed.
13.2 The Feedback Theorem
Middlebrook’s Feedback Theorem is an application of the technique ofnull double injection,t o
derive the important transfer functions of a closed-loop feedback circuit. In the presence of the
input signal source, a test source is injected at a suitable point within the feedback circuit, and
key quantities are derived under conditions of setting one of the independent inputs to zero, or
of adjusting the two independent sources such that a dependent signal is nulled to zero. The null
double injection technique relies on linear superposition to ﬁnd the desired transfer functions
under these null or zeroed conditions. The feedback theorem is stated in Sect. 13.2.1, and is
derived in Sect. 13.2.2.
13.2.1 Basic Result
Consider the feedback circuit represented by Fig. 13.1. The independent input source of this
circuit is u
i(s) and the output is uo(s) (the generic symbol u is employed; these signals may be
voltages, currents, or other quantities). The circuit includes a feedback loop having loop gain
T(s); in the laboratory, we could measure this loop gain using the voltage injection method of
Sect. 9.6.1 or the current injection method of Sect. 9.6.2. V oltage or current injection using a
source uz(s) is also illustrated in Fig. 13.1.

13.2 The Feedback Theorem 511
y(s)+ +Input
ui(s)
Output
uo(s)
Injection
uz(s)
Error
signal ux(s)
Loop gain T(s)
+
Fig. 13.1 A feedback circuit contains an input source ui(s), output uo(s), and injection source uz(s)
As noted in Sects. 9.6.1 and 9.6.2, the accuracy of the loop gain measured via the injec-
tion method depends on the degree of loading at the injection point, according to Eqs. ( 9.96)
and (9.100). In a practical laboratory experiment, some inaccuracy may be unavoidable. How-
ever, for the purposes of theoretical analysis, we may choose to inject at anideal injection point
where the impedance inequalities ( 9.96)o r( 9.100) are exactly satisﬁed. In such an analytical
“thought experiment,” we inject at a point immediately following an ideal voltage source or cur-
rent source whose value depends directly on the error signal of the feedback loop. Speciﬁcally,
we inject at an ideal point that satisﬁes both of the following criteria:
•A signal uz is injected directly after a source uy that is proportional to the error signal of the
feedback loop.
•The forward portion of the feedback loop must contain no parallel paths that allow the
ampliﬁed error signal to reach the output without passing through the ideal injection point.
If the injection point is shorted to ground, i.e.,i f ux = 0, then none of the ampliﬁed error
signal should reach the output.
Injection at an ideal point satisfying both of the above requirements will lead to an exact expres-
sion for the physical loop gain T(s).
The system of Fig. 13.1 contains two independent sources, ui(s) and the injection source
uz(s). There are three dependent quantities: the output uo(s), and the signals uy(s) and ux(s),
immediately before and after the injection source. Note the minus sign associated with uy in
Fig. 13.1: this is needed to cancel the minus sign associated with negative feedback and obtain
the correct loop gain polarity. We can deﬁne thought experiments in which an independent
source is set to zero, or in which a dependent source is nulled. These thought experiments allow
solution for the gains G∞(s), G0(s), T(s), and Tn(s), and ﬁnally for the overall transfer function:
G(s)= uo
ui
= G∞
T
1+ T+ G0
1
1+ T (13.1)
Each thought experiment is described in detail below.
Loop gain T(s): The input ui(s) is set to zero. In the presence of the injection source uz(s),
the circuit is solved for the loop gain T(s):
T(s)= uy(s)
ux(s)
⏐⏐⏐
⏐⏐⏐
ui=0
(13.2)

512 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
In practice, we assume that we know ux(s), and follow how it propagates around the feedback
loop to ﬁnd uy(s). When the above conditions for an ideal injection point are satisﬁed, then the
resulting T(s) will have the physical interpretation of the circuit loop gain.
Ideal forward gain G∞(s): In the presence of the input ui(s), the signal uz(s) is injected
and is adjusted as necessary to null uy(s). Under these conditions, referred to as null double
injection, the circuit is solved to ﬁnd uo(s). The ideal forward gain is
G∞(s)= uo(s)
ui(s)
⏐⏐
⏐⏐⏐
⏐
uy→
null
0
(13.3)
The quantity uy is dependent on both independent sources ui and uz, and hence there is some
choice of ui and uz that will cause uy to be nulled to zero. Note that nulling uy is not the same
as shorting uy: the null condition takes place in the original circuit, and results from a speciﬁc
selection of values of the independent sources. Speciﬁcally, nulling uy eﬀectively also nulls the
error signal because of the conditions satisﬁed by the ideal injection point. HenceG∞is the gain
from the input ui to the output uo under the condition that the error signal is nulled to zero: the
output is perfectly regulated. It can be veriﬁed that the gain G(s)o fE q .( 13.1) reduces to G∞
under the condition that T→∞.
If the feedback circuit employs a conventional operational ampliﬁer, then nullingvy is equiv-
alent to employing the principle of virtual ground, in accordance with common practice in the
analysis of op amp circuits. In an op amp circuit with negative feedback,G∞coincides with the
gain when an ideal op amp is present.
Gain G0(s): In this thought experiment, null double injection is performed as follows: in the
presence of the input ui(s), the signal uz(s) is injected and is adjusted as necessary to null ux(s).
Under these conditions, the circuit is solved to ﬁnd uo(s). The gain G0 is
G0(s)= uo(s)
ui(s)
⏐⏐⏐
⏐
⏐⏐
ux→
null
0
(13.4)
Note that nulling ux eﬀectively prevents the ampliﬁed error signal from reaching the output,
because of the conditions satisﬁed by the ideal injection point. Hence G0 is the gain from the
input ui to the output uo under the condition that the feedback loop does not control the output.
It can be veriﬁed that the gain G(s)o fE q .(13.1) reduces to G0 under the condition that T→0.
The physical interpretation of G0 depends on the quantity being analyzed. For an ampliﬁer
in which ui and uo are the input and output voltages, G0 has the interpretation of direct forward
transmission through the feedback path. With ux nulled, there is no way for the input signal to
reach the output via the forward path of the loop, and soG0 must result from signals reaching the
output by ﬂowing (backwards!) through the feedback path. In the case of disturbance transfer
functions such as a closed-loop Zout or Gvg,t h eG0 term represents the open-loop disturbance
transfer function.
Null loop gain Tn(s): In the presence of the input ui(s), the signal uz(s) is injected and
is adjusted as necessary to null the output uo(s). Note that this is another case of null double
injection. Under these conditions, the circuit is solved for the null loop gain Tn(s):
Tn(s)= uy(s)
ux(s)
⏐⏐⏐
⏐
⏐⏐
uo→
null
0
(13.5)

13.2 The Feedback Theorem 513
Solution for Tn is similar to the analysis of T, although it is usually somewhat simpler because
Tn does not depend on the load impedance. The null loop gainTn has less physical interpretation
than does T; it is related to the other above quantities according to the reciprocity relationship:
Tn(s)
T(s) = G∞(s)
G0(s) (13.6)
Hence one can solve for three of the four gains, whichever is easiest, then employ the reci-
procity relationship to ﬁnd the fourth gain. Finally, the overall closed-loop gain G(s) is found
by evaluation of Eq. (13.1).
13.2.2 Derivation
The basic results of Sect.13.2.1 can be derived through the use of superposition and null double
injection in the several thought experiments described.
+ ue(s) uo(s)ui(s)
iz
ixiy
0
Fig. 13.2 Current injection iz = uz at an ideal injection point in a feedback loop. The original condition
is illustrated, in which iz is set to zero
Original condition: uz = 0, in the presence of the input ui. Figure 13.2 illustrates current
injection at an ideal injection point, with the original condition iz = 0. In this case, the closed-
loop forward gain G(s)i sg i v e nb y
uo
⏐⏐
⏐
⏐
uz=0
= Gui (13.7)
This is the deﬁnition ofG(s). Additionally, under this condition we can expressix and iy in terms
of the input ui:
ix
⏐⏐⏐⏐iz=0
=−iy
⏐⏐⏐⏐iz=0
= Ga(s)ui (13.8)
For the current injection illustrated in Fig. 13.2, ux = ix and uy = iy. Equation ( 13.8)i st h e
deﬁnition of Ga(s). Both G(s) and Ga(s) are unknowns at this point. It is desired to eliminate
Ga, and to solve for G.
Injection of uz: Figure 13.3 illustrates the case in which the input ui is set to zero, and
current injection iz = uz is applied. Under these conditions, we can express iy as some function
of ix as follows:

514 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
iy
⏐⏐⏐⏐ui=0
= T(s) ix
⏐⏐⏐⏐ui=0
(13.9)
This is the deﬁnition of the loop gain T(s).
Under these conditions, we can also express the quantities ix and iy as functions of the
injection source iz, by writing the node equation at the injection point:
ix+ iy= iz (13.10)
By substitution of Eq. (13.9) into Eq. (13.10) and solution for ix and iy, we can ﬁnd that
+ ue(s) uo(s)ui(s)
iz
ixiy
0
Fig. 13.3 Current injection iz= uz, with the input ui set to zero
ix
⏐⏐⏐
⏐
ui=0
= 1
1+ T iz (13.11)
iy
⏐⏐
⏐⏐
ui=0
= T
1+ T iz (13.12)
Also under these conditions, we can express the output uo in terms of the injection source iz as
uo
⏐⏐
⏐⏐
ui=0
= Gb(s) ix
⏐⏐
⏐⏐
ui=0
= Gb
1+ T iz (13.13)
This is the deﬁnition of Gb. It is desired to eliminate Gb.
In the presence of both ui and uz= iz: we can employ superposition to express the depen-
dent quantities ix, iy, and uo as functions of the two independent inputs ui and iz.F o rix, we can
write
ix= ix
⏐⏐⏐
⏐
iz=0
+ ix
⏐⏐⏐
⏐
ui=0
(13.14)
Substitution of Eqs. (13.8) and (13.11) into Eq. (13.14) leads to the general expression for ix:
ix= Ga ui+ 1
1+ T iz (13.15)
We can ﬁnd a similar expression for iy:
iy= iy
⏐⏐⏐⏐iz=0
+ iy
⏐⏐⏐⏐ui=0
(13.16)

13.2 The Feedback Theorem 515
Substitution of Eqs. (13.8) and (13.12) into Eq. (13.16) leads to the general expression for iy:
iy=−Ga ui+ T
1+ T iz (13.17)
The output uo can be expressed via superposition as
uo= uo
⏐⏐
⏐
⏐
iz=0
+ uo
⏐⏐
⏐
⏐
ui=0
(13.18)
Substitution of Eqs. (13.7) and (13.13) into Eq. (13.18) leads to the general expression for uo:
uo= Gu i+ Gb
1+ T iz (13.19)
Next, we perform the “thought experiments” described in Sect. 13.2.1.
+ ue(s) uo(s)ui(s)
iz
ixiy
0
0
Fig. 13.4 In the presence of ui, adjust iz= uz to null iy
Null double injection, nulling iy: In the presence of the input ui, adjust iz as necessary to
null iy, as illustrated in Fig. 13.4. Under these conditions, Eq. (13.17) becomes
0=−Ga ui+ T
1+ T iz
⏐⏐⏐
⏐
iy→
null
0
(13.20)
and Eq. (13.19) becomes
uo
⏐⏐⏐⏐iy→
null
0
= Gu i+ Gb
1+ T iz
⏐⏐⏐⏐iy→
null
0
(13.21)
Elimination of iz from Eqs. (13.20) and (13.21) leads to
uo
⏐⏐
⏐⏐
iy→
null
0
= Gui+ GaGb
T ui (13.22)
We can deﬁne
G∞= G+ GaGb
T (13.23)

516 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
Hence
uo
⏐⏐
⏐⏐
iy→
null
0
= G∞ui (13.24)
In this thought experiment, we adjust iz as necessary to null iy. Since iy is directly proportional
to the error signal, nulling iy also nulls the error signal. Hence the gain G∞has the physical
interpretation of the ideal forward gain of the loop, with zero error.
Null double injection, nulling ix: In the presence of the input ui, adjust iz as necessary to
null ix, as illustrated in Fig. 13.5. Under these conditions, Eq. (13.15) becomes
0= Ga ui+ 1
1+ T iz
⏐⏐
⏐⏐
ix→
null
0
(13.25)
Equation (13.19) becomes
uo
⏐⏐
⏐⏐
ix→
null
0
= Gu i+ Gb
1+ T iz
⏐⏐
⏐⏐
ix→
null
0
(13.26)
Elimination of iz from Eqs. (13.25) and (13.26) leads to
ue(s) uo(s)ui(s)
iz
ixiy
0
G0(s)
Fig. 13.5 In the presence of ui, adjust iz= uz to null ix
uo
⏐⏐
⏐
⏐
ix→
null
0
= Gui−GaGbui (13.27)
We can deﬁne
G0= G−GaGb (13.28)
Hence
uo
⏐⏐⏐
⏐
ix→
null
0
= G0ui (13.29)
In this thought experiment, we adjust iz as necessary to null ix. Consequently, there is no trans-
mission of the ampliﬁed error signal through the forward path:ix= 0. In the system depicted in
Fig. 13.5, the only other way to obtain a nonzero output is via the feedback path, assuming that

13.2 The Feedback Theorem 517
signals are capable of propagating in either direction through this path. Hence, the gain G0 has
the physical interpretation of direct forward transmission through the feedback path.
In later examples, we will see that G0 may have the interpretation of the open-loop gain
from disturbances to the output. In these examples, the system architecture is more complex
than is envisioned in Fig. 13.5.
+ ue(s) uo(s)ui(s)
iz
ixiy
0
Fig. 13.6 In the presence of ui, adjust iz= uz to null uo
Null double injection, nulling uo: In the presence of the input ui, adjust iz as necessary to
null uo, as illustrated in Fig. 13.6. Note that the output uo is not shorted. For example, in the
case where the output uo is a voltage, this null condition implies that zero current ﬂows through
the load impedance, and any current produced by the output block must ﬂow directly into the
feedback path.
Under these conditions, Eq. (13.19) becomes
0= Gu
i+ Gb
1+ T iz
⏐⏐⏐⏐uo→
null
0
(13.30)
Equation (13.15) becomes
ix= Ga ui+ 1
1+ T iz
⏐⏐
⏐⏐
uo→
null
0
(13.31)
And Eq. (13.17) becomes
iy=−Ga ui+ T
1+ T iz
⏐⏐⏐
⏐
uo→
null
0
(13.32)
We can eliminateui and iz
⏐⏐
⏐
⏐
uo→
null
0
from the above equations, and solve for the relationship between
iy and ix under the condition that the output uo is nulled. After performing some algebra, we
obtain the following result:
iy
⏐⏐⏐⏐uo→
null
0
= TG+ GaGb
G−GaGb
ix
⏐⏐⏐⏐uo→
null
0
(13.33)
We can deﬁne
Tn= iy
ix
⏐⏐⏐
⏐
uo→
null
0
= TG+ GaGb
G−GaGb
(13.34)

518 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
The null loop gain T n is the transfer function from ix to iy under the condition that, in the
presence of the input ui, the injection source iz is adjusted to null the output uo. The null loop
gain Tn has less physical interpretation than the loop gain T; it is similar except that the eﬀects
of output loading are removed. Hence Tn is somewhat simpler to compute than T. The next
paragraphs give a simple way to relate T and Tn, and hence computation of Tn can be a useful
step in the computation of T.
Final result: With the above deﬁnitions, one can solve the feedback circuit for the quantities
G0, G∞, T, and Tn. One can determine the closed-loop transfer function G in terms of these
quantities, by eliminating the intermediate quantities Ga and Gb from the above equations and
solving for G in terms of G0, G∞, T, and Tn.F r o mE q .(13.28), we have
G0= G−GaGb (13.35)
From Eq. (13.23),
G∞= G+ GaGb
T (13.36)
which can be rewritten as
G∞T= TG+ GaGb (13.37)
From Eq. (13.34), we have
Tn= TG+ GaGb
G−GaGb
(13.38)
Substitution of Eqs. (13.35) and (13.37) into Eq. (13.38) leads to the reciprocity relationship
Tn= G∞T
G0
or Tn
T = G∞
G0
(13.39)
This important relationship implies that we need only to solve for three of the gains G0, G∞, T,
and Tn; the fourth can be found from Eq. ( 13.39). Further, if the three gains are expressed in
factored pole-zero form, then the fourth gain that results from Eq. (13.39) will also be factored.
Now eliminate the quantity GaGb from Eqs. (13.35) and (13.36), and use the result to solve
Eqs. (13.35)t o( 13.39)f o rG. After a few lines of algebra, the following result is obtained:
G= G∞
⎦
1+ 1
Tn
)
⎦
1+ 1
T
) = G∞
T
1+ T+ G0
1
1+ T (13.40)
This is the desired expression for the closed-loop gain G. Note that, for large loop gain,
G→G∞ for ∥T∥→∞ (13.41)
So G∞is the closed-loop forward gain with large loop gain. For small loop gain,
G→G0 for ∥T∥→0 (13.42)
Hence G0 is the closed-loop forward gain when the loop gain tends to zero.

13.3 Example: Op Amp PD Compensator Circuit 519
(a)
++vin
+
vout
R1
R2
R3
RL
C
(b)
v+
vout
Ro
+
v
Gop(s) (v+ v )
+
Fig. 13.7 Op amp PD compensator circuit example: (a) circuit schematic, (b) op amp equivalent circuit
model
13.3 Example: Op Amp PD Compensator Circuit
As a ﬁrst example of application of the feedback theorem, let us analyze the op amp circuit
illustrated in Fig. 13.7a. With an ideal op amp, this lead-lag circuit exhibits a transfer func-
tion having a zero and pole, and is suitable as a PD compensator in feedback loops requiring
improvement of phase margin. To examine the impact of the frequency response and output
impedance of a practical op amp, we will model the op amp using the equivalent circuit il-
lustrated in Fig. 13.7b. The positive and negative input ports are modeled with inﬁnite input
impedance, and a Thevenin-equivalent circuit models the output port. The op amp gain is
G
op (s)= Gop0
⎦
1+ s
ω1
) (13.43)
For this example, the op amp model values are
Gop0= 105⇒100 dB f1=ω1
2π= 10 Hz
Ro= 50 Ω
This typical op amp internal gain Gop exhibits a dc gain of 100 dB and a pole at 10 Hz; its
magnitude Bode plot is given in Fig. 13.8. The op amp unity gain frequency is 1 MHz: for
frequencies above 10 Hz, the magnitude asymptote follows the equation
∥Gop∥≈1M H z
f (13.44)
The element values are
R1= 1.6k Ω R2= 16 Ω RL= 100 Ω
R3= 1.6k Ω C= 0.1μF
To analyze this feedback circuit, we insert the op amp model of Fig. 13.7b into the circuit of
Fig. 13.7a, leading to the equivalent circuit illustrated in Fig.13.9.
To apply the feedback theorem, we ﬁrst identify an ideal injection point. The error signal of
this op amp feedback circuit can be taken to be the op amp diﬀerential input voltage (v+−v−):
when this voltage is zero, the op amp circuit operates ideally with zero error. In the op amp
model of Fig.13.7b, the dependent voltage source is proportional to (v+−v−), and hence we can
employ voltage injection immediately following this source as illustrated in Fig. 13.9: this will

520 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
f
f1
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz 1 MHz
60 dB
40 dB
20 dB
80 dB
100 dB
120 dB
0 dB
Gop0
|| Gop ||
Fig. 13.8 The op amp internal gain exhibits a single-pole response with a unity gain frequency of 1 MHz
cause vy to be directly proportional to the error signal ( v+−v−). With this choice of injection
point, we can solve the circuit to ﬁnd G0, G∞, T, and Tn as described in Sect. 13.2.1.
The ideal forward gain G∞is found according to Eq. (13.3). For this example, we obtain
G∞(s)= vout(s)
vin(s)
⏐⏐
⏐
⏐⏐⏐
vy→
null
0
(13.45)
As with all examples of null double injection, the key to easily solving for this gain is to begin
with the null condition and its implications. When vy is nulled, the dependent voltage source
−Gop v−is also nulled, which implies that v−is nulled. Hence, the current if can be related to
the input voltage vin as follows:
+vin
+
vout
R1
R2 R3
RL
C Ro
+
v
op(s) v
v+ = 0
+
+
vxvy
+
vz
if
Fig. 13.9 PD compensator circuit, with the op amp equivalent circuit model inserted. V oltage injection
at the output of the dependent voltage source is included

13.3 Example: Op Amp PD Compensator Circuit 521
if =− vin−v−
R1

⎦
R2+ 1
sC
)
⏐⏐⏐⏐
⏐⏐⏐
⏐⏐⏐
⏐
⏐
v−→
null
0
=− vin
R1

⎦
R2+ 1
sC
) (13.46)
The null condition also allows us to easily relate the output voltage vout to if :
vout= v−+ if R3
⏐⏐
⏐
v−→
null
0
= if R3 (13.47)
Substitution of Eq. (13.46)i n t o(13.47) leads to the expression for G∞:
G∞=− R3
R1

⎦
R2+ 1
sC
)=−R3
R1
1+ s (R1+ R2) C
1+ sR2C (13.48)
For this op amp circuit example, the steps in determination of G∞coincide with use of the
“virtual ground” principle commonly employed in beginning circuit analysis classes: nulling vy
leads to v+= v−. The above analysis then follows. Indeed, the null double injection analysis of
G∞can be viewed as a generalization to arbitrary feedback circuits.
Substitution of numerical values into Eq. ( 13.48) reveals that G∞contains a DC gain G∞0,
zero at frequency f2, and pole at frequency f3, as follows:
f
|| G∞ ||
G∞ 0 = 1
⇒ 0 dB
∠ G∞
0
100 Hz
+20 dB/decade
f2 /10
10f2
10 kHz
1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
|| G∞ || ∠ G∞
0 dB
20 dB
40 dB
60 dB
0
45
90
f2
1 kHz
f3
100 kHz
+ 45 /decade /decade
Fig. 13.10 Bode plot of G∞, op amp example

522 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
∥G∞0∥= R3
R1
= 1⇒0 dB (13.49)
f2= 1
2π(R1+ R2) C= 1 kHz (13.50)
f3= 1
2πR2C= 100 kHz (13.51)
A Bode plot of G∞is given in Fig. 13.10. This transfer function is typical of a PD compensator
that might be employed to improve the phase margin of a switching converter feedback system
having a crossover frequency in the vicinity of 10 kHz.
The loop gain T(s) is found according to Eq. (13.2). For this example, we obtain
T(s)= vy(s)
vx(s)
⏐⏐⏐⏐
⏐
⏐
vin=0
(13.52)
Under the condition that the input voltage vin is set to zero, the equivalent circuit of Fig. 13.9
reduces to Fig. 13.11.
+
vout
R1
R2 R3
RL
C Ro
+
v
op(s) v
+
+
vxvy
+
vz
Fig. 13.11 Determination of loop gain T(s)
To ﬁnd the loop gainT(s), we take vx as given and solve the circuit for vy. This can be done
in several steps: ﬁrst ﬁnd the transfer function from vx to vout, then the transfer function from
vout to v−, and then the transfer function from v−to vy. The loop gain can then be expressed as
T(s)=
⎦vout
vx
)⎦v−
vout
) ⎦vy
v−
)
(13.53)
The ﬁrst two terms of Eq. ( 13.53) are voltage divider transfer functions, while the third is the
op amp internal gain Gop . Hence we can express Eq. (13.53)a s :
T(s)=
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
RL



[
R
3+ R1



⎦
R
2+ 1
sC
)]
Ro+ RL


[
R
3+ R1


⎦
R
2+ 1
sC
)]
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
vout
vx
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
R1



⎦
R
2+ 1
sC
)
R3+ R1


⎦
R
2+ 1
sC
)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
v−
vout
⎦
Gop (s)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
vy
v−
(13.54)

13.3 Example: Op Amp PD Compensator Circuit 523
We could simplify this expression via algebraic manipulations, to expressT(s) in factored form.
However, it is easier to ﬁnd the factoredT(s) by use of the reciprocity relationship, Eq. (13.39).
Hence, the construction of the Bode plot of T(s) is reserved for later, afterG0 and Tn have been
found.
The direct forward transmission gain G0(s) is found as deﬁned in Ex. (13.4). For this exam-
ple, we obtain
G0(s)= vout(s)
vin(s)
⏐⏐
⏐⏐⏐
⏐
vx→
null
0
(13.55)
In the model of Fig. 13.9, in the presence of the input vin we adjust the injection source vz
such that vx is nulled. Under these conditions, the dependent voltage source −Gop v−does not
inﬂuence the output, and the circuit reduces to Fig.13.12, with Ro eﬀectively in parallel withRL.
+vin
+
vout
R1
R2 R3
RL
C
Ro
Fig. 13.12 Determination of direct forward transmission through feedback path, G0
It can be seen that G0 is a voltage divider transfer function:
G0(s)= vout(s)
vin(s)
⏐⏐⏐
⏐⏐⏐
vx→
null
0
=
Ro

R
L
Ro
RL+ R3+ R1

⎦
R2+ 1
sC
) (13.56)
This expression can be simpliﬁed via algebraic manipulation to the following factored form:
G0(s)=
Ro
RL
R1+ R3+ Ro
RL
1+ sC (R1+ R2)
1+ sC
⎦
R2+ R1

⎦
R3+ Ro
RL
)) (13.57)
The expression for G0 is in the following standard normalized form:
G0= G00
⎦
1+ s
ω2
)
⎦
1+ s
ω4
) (13.58)

524 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
with
G00=
Ro
RL
R1+ R3+ Ro
RL
= 0.0103⇒−39.7d B
f2=ω2
2π= 1
2πC (R1+ R2)= 1 kHz (13.59)
f4=ω4
2π= 1
2πC
⎦
R2+ R1


⎦
R
3+ Ro

R
L
))= 1930 Hz
Figure 13.13 contains the Bode plot of G0(s).∥G0∥ is small in this example, and is unlikely to
inﬂuence G(s) over frequencies of interest. However, this computation assists in determination
of the factored T(s).
The null loop gain Tn(s) is found as deﬁned in Eq. (13.5). For this example, we obtain
Tn(s)= vy(s)
vx(s)
⏐⏐⏐⏐
⏐⏐
vo→
null
0
(13.60)
In the model of Fig.13.14: in the presence of the inputvin, we adjust the injection sourcevz such
that the output vout is nulled. Under these conditions, we ﬁnd the transfer function from vx to vy.
f
|| G∀ ||
G∀0 = 0.0103
⇒
1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
|| G∀ ||
0 dB
20 dB
f2
1 kHz
f4
1.93 kHz
Fig. 13.13 Bode plot of the magnitude of G0
+vin
+
vout null
 0
R1
R2 R3
RL
C Ro
+
v
op(s) v
v+ = 0
+
+
®
vxvy
+
vz
if
0
if
Fig. 13.14 Determination of null loop gain Tn

13.3 Example: Op Amp PD Compensator Circuit 525
The null condition implies that there is no voltage across the load resistor RL and hence
there is no current through the load resistor. The op amp output current is
if = vx
Ro
(13.61)
Since the load current is zero, the currentif ﬂows through R3. Since the load voltage is zero, we
can express v−as:
v−=−if R3 (13.62)
The voltage vy is related to v−by the op amp gain Gop :
vy= Gop (s)v− (13.63)
Hence, we can express the null loop gain as
Tn(s)=
⎦1
Ro
)

if
vx
(−R3)
v−
if
⎦
Gop (s)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
vy
v−
(13.64)
The expression for Tn is considerably simpler than the expression for T, because the load
impedance does not aﬀect Tn. The null loop gain contains the same poles as Gop (s).
We can now employ the reciprocity relationship, Eq. ( 13.39), to ﬁnd a factored expression
for the loop gain T(s):
T= G0Tn
G∞
(13.65)
Insertion of Eqs. (13.64), (13.58), and (13.48) into Eq. (13.65) leads to the following expression
for the loop gain:
T(s)=
⎦
−R3
Ro
Gop (s)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
Tn
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
G00
⎦
1+ s
ω2
)
⎦
1+ s
ω4
)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
G0
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
−R1
R3
⎦
1+ s
ω3
)
⎦
1+ s
ω2
)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
1
G∞
= T0
⎦
1+ s
ω3
)
⎦
1+ s
ω1
)⎦
1+ s
ω4
) (13.66)
with
T0= R1
Ro
Gop0G00
= 33000⇒90.7 dB (13.67)

526 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
Figure 13.15 contains a sketch of the magnitude and phase asymptotes of this loop gain. It can
be seen that T(s) contains a DC gain of 90.7 dB, poles at 10 Hz and 1.9 kHz, and a zero at 100
kHz. The crossover frequency fc can be estimated using the magnitude asymptote between the
1.9 kHz pole and the 100 kHz zero; over this range of frequencies, we can express the magnitude
asymptote as:
f
T0 ⇒ 90.7 dB
∠ T
100 kHz1 Hz 10 Hz 100 Hz 1 kHz 10 kHz
|| T || ∠ T
0
f1
10 Hz
f3
/decade
40 dB
20 dB
0 dB
60 dB
80 dB
100 dB
f4
1.9 kHz
fc
ϕm
Fig. 13.15 Sketch of the magnitude and phase asymptotes of the loop gain T(s)
T(s)= T0
⎛⎜⎜⎜⎜⎜⎝1+

s
ω3
⎞⎟⎟⎟⎟⎟⎠
⎦
1+ s
ω1
)⎦
1+ s
ω4
)
∥T∥≈T0
(1)⎦ω
ω1
)⎦ω
ω4
) (13.68)
At the crossover frequency fc, the magnitude of T is equal to unity. Insertion ofω=ωc with
∥T∥= 1i n t oE q .(13.68) leads to
1= T0
ω1ω4
ω2c
(13.69)
Hence the crossover frequency is
fc=ωc
2π=
√
T0 f1 f4
= 25.2 kHz (13.70)

13.3 Example: Op Amp PD Compensator Circuit 527
We can estimate the phase margin as follows. Since the crossover frequency is more than a
decade above both pole frequencies, the poles contribute a total of−180◦to∠T( fc). The zero at
f3= 100 kHz contributes phase
tan−1 fc
f3
= 14.2◦ (13.71)
Hence, the phase of T at the crossover frequency is
∠T( fc)=−180◦+ 14.2◦=−165.8◦ (13.72)
The phase margin is
ϕm= 180◦+∠T( fc)= 14.2◦ (13.73)
Although the phase margin is positive, it is not very large. This implies that the closed-loop
transfer function T/(1+T) contains complex poles at fc having high Q determined by evaluation
of Eq. (9.41):
Q=
√cosϕm
sinϕm
= 4⇒12 dB (13.74)
f
|| T ||
1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
|| T/ (1+T ) ||
f3
40 dB
20 dB
0 dB
60 dB
80 dB
100 dB
f4
fc
QdB
Fig. 13.16 Graphical construction of the closed-loop transfer function T/(1+ T)
The graphical construction method can now be employed to construct the closed-loop trans-
fer function T/(1+ T) according to Eq. (9.11). The result is illustrated in Fig. 13.16.B e l o wt h e
crossover frequency fc,∥T∥ is large and hence T/(1+ T) is approximately equal to 1. There
are two poles at the crossover frequency, having Q factor given by Eq. (13.74). At frequencies
above fc, the transfer function∥T/(1+ T)∥ follows∥T∥.

528 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
f
|| G ||
1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
|| G ||
0 dB
20 dB
40 dB
60 dB
f2
1 kHz
fc
25 kHz
|| G ||
|| G∞ ||
∠ G
0
45
90
∠ G
0
100 Hz
f2 /10
∠ G
∠ G∞
Fig. 13.17 Graphical construction of the closed-loop transfer function G
Finally, the closed-loop transfer function G= vout/vin can be found using Eq. ( 13.1), with
the result illustrated in Fig. 13.17. G is given by
G= G∞
T
1+ T+ G0
1
1+ T (13.75)
The term G0/(1+ T) is small, and is found to be insigniﬁcant below 30 MHz. Hence G follows
G∞below the crossover frequency, where T/(1+ T)≈1. The T/(1+ T) term introduces its
resonance at the crossover frequency, and G diﬀers signiﬁcantly from G∞at frequencies above
fc. The op amp is unable to produce the required gain at frequencies above 25 kHz, causing
the closed-loop transfer function to diﬀer signiﬁcantly from the prediction obtained using the
traditional op amp virtual ground principle.
If this op amp circuit is employed as a PD compensator in a switching converter feedback
loop, the compensator resonance at 25 kHz may seriously degrade the stability of the converter
feedback loop. The resonance may introduce additional converter crossover frequencies, and the
converter phase margin at frequencies approaching or exceeding 25 kHz may be substantially
reduced. It would be possible to make G follow G
∞at higher frequencies by employing an op
amp whose unity gain frequency is larger: the PD circuit fc could be increased from 25 kHz to
100 kHz by increasing the op amp unity gain frequency from 1 MHz to 4 MHz.
13.4 Example: Closed-Loop Regulator
As a second example, consider application of the feedback theorem to the closed-loop buck
regulator of Sect. 9.5.4, with the compensator circuit of Fig. 15.29. Figure 13.18 shows the
small-signal canonical model of the CCM converter power stage (from Fig. 7.38), along with
the feedback and PID compensator circuit, and with injection ˆvz applied.
The output of this system is taken to be the output voltage v. There are three independent
inputs: the reference voltage vre f , the power input vg, and the load current variation iload.I n
```
