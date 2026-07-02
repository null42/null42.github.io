---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: "第13章part 2 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem"
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 535-551 > Chunk ID: `chapter-13-part-2`"
---

# 第13章part 2 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 535-551  
> Chunk ID: `chapter-13-part-2`

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
13.4 Example: Closed-Loop Regulator 529
+
+ 1 : M Le
C R
+
v(s)vg(s)
+
+
C2
vref
R1
R2
R3
C3
R4
vz
+
vx(s)
PWM
d(s)
vy(s)
+
1
VM
iload (s)
e(s)d(s)
j(s)d(s)
Fig. 13.18 Application of feedback theorem to buck regulator example
the small-signal model, we can employ superposition to express the output perturbation ˆv as a
function of input perturbations ˆvre f ,ˆvg, and ˆiload:
ˆv(s)= Gr(s)ˆvre f (s)+ Gg(s)ˆvg(s)−Zoˆiload (13.76)
The closed-loop transfer functions Gr, Gg, and Zo can each be found through application of the
feedback theorem, and can be expressed in the form of Eq. (13.1). Speciﬁcally, we can express
Eq. (13.76)a s :
ˆv(s)=
⎦
G∞r
T
1+ T+ G0r
1
1+ T
)
ˆvre f (s)+
⎦
G∞g
T
1+ T+ G0g
1
1+ T
)
ˆvg(s)
−
⎦
Z∞o
T
1+ T+ Z0o
1
1+ T
)
ˆiload (13.77)
The terms G∞r and G0r are found using the feedback theorem with ˆvg and ˆiload set to zero, and
the terms G∞g and G0g are found using the feedback theorem with ˆvre f and ˆiload set to zero. The
terms Z∞o and Z0o are found using the feedback theorem with ˆvg and ˆvre f set to zero. The loop
gain T is found with ˆvg,ˆvre f , and ˆiload all set to zero. In the following analysis, the operational
ampliﬁer is treated as ideal.
The closed-loop reference-to-output ideal forward gain G∞r(s) is found with ˆvg and ˆiload set
to zero and with ˆvy nulled:
G∞r(s)= ˆv
ˆvre f
⏐⏐
⏐⏐⏐
⏐
ˆvg=0, ˆiload=0
ˆvy→
null
0
(13.78)

530 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
+
C R
+
v(s)vg = 0
+
+
C2
vref
R1
R2
R3
C3
R4
vz
PWM
d(s)
vy(s) o 0
+
1
VM
v = vref
v
Z1
}Z3
}
Z2
}
1 : Me(s)d(s)
j(s)d(s)
Le
Fig. 13.19 Determination of G∞r
The small-signal model with these conditions is illustrated in Fig. 13.19. Nulling ˆvy in the pres-
ence of ˆvre f causes the negative input of the ideal op amp ˆv−to be equal to ˆvre f .B u tˆv−and ˆv
are related according to the voltage divider ratio of the feedback network:
ˆv−= ˆv
Z2
Z3
Z2
Z3+ Z1
= ˆvre f (13.79)
where the error ampliﬁer impedances are
Z1= R1+
⎦
R2
 1
sC2
)
(13.80)
Z2= R4 (13.81)
Z3= R3+ 1
sC3
(13.82)
Therefore, G∞r is equal to:
G∞r=
Z2
Z3+ Z1
⎦
Z2
Z3
) (13.83)
At dc, this gain reduces to
G∞r(0)= R4+ R1+ R2
R4
(13.84)
In a dc regulator having constant vre f , the dynamics of Eq. (13.83) are irrelevant, and the ideal
output voltage is equal to G∞r(0)Vre f . When the reference can vary, then the poles and zeroes
of Eq. (13.83) may introduce signiﬁcant dynamics.

13.4 Example: Closed-Loop Regulator 531
+ 1 : M
C R
+
v(s)vg = 0
+
+
C2
vref
R1
R2
R3
C3
R4
vz
PWM
d(s) = 0
1
VM +
vx(s) o 0
0
0
+
0
v = vref
Zout
e(s)d(s)
j(s)d(s)
Le
Fig. 13.20 Determination of G0r
The direct forward transmission through the feedback path G0r is
G0r(s)= ˆv
ˆvre f
⏐⏐⏐⏐
⏐⏐
ˆvg=0, ˆiload=0
ˆvx→
null
0
(13.85)
The small-signal model with these conditions is illustrated in Fig. 13.20. Nulling ˆvx causes no
ampliﬁed error signal to reach the output ˆv via the forward path of the loop: nulling ˆvx also nulls
ˆd, and hence the ˆd sources of the power stage model are also zero. As illustrated in Fig. 13.20,
the secondary voltage of the ideal transformer model becomes zero.
The ˆvre f signal can nonetheless have a small inﬂuence on the output ˆv. With the assumption
that the op amp is ideal, its positive and negative input terminals are equal and hence ˆv−= ˆvre f .
The output voltage ˆv is related to ˆv−= ˆvre f through the voltage divider ratio
ˆv= ˆv− Zout
Zout+ Z1
(13.86)
where the converter open-loop output impedance is
Zout= R

 1
sC

sL
e (13.87)
and the feedback network impedance Z1 is given by Eq. (13.80). Hence, G0r is
G0r= Zout
Zout+ Z1
(13.88)
Thus, the direct forward transmission of the reference signal through the feedback path is
nonzero.

532 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
(a)
101 102 103 104
Frequency, Hz
-140
-120
-100
-80
-60
-40
-20
0
20
Magnitude, dB
Gr
G r
G0r
(b)
101 102 103 104
Frequency, Hz
-180
-90
0
90
Phase, degrees
Gr
G r
G0r
Fig. 13.21 Magnitude and phase Bode plots of the transfer functions G∞r, G0r,a n d Gr for the buck
regulator example. Dashed curves: ideal reference-to-output gain G∞r and direct forward transmission
through feedback path G0r. Solid curves: reference-to-output transfer function Gr
Figure 13.21 contains plots of the transfer functions G∞r, G0r, and Gr for the power stage
element values of Sect. 9.5.4 and the compensator circuit values of Fig. 15.29. Speciﬁcally,
the power stage parameters are L = 50μH, C = 500μF, R = 3Ω, Vg = 28 V, V = 15 V.
The compensator and feedback circuit parameters are Vre f = 5V , VM = 4V , R1 = 11 kΩ,
R2= 85 kΩ, R3= 120 kΩ, R4= 47 kΩ, C2= 1.1n F ,C3= 2.7 nF. It can be seen that the transfer
function Gr(s) follows the ideal gainG∞r(s) from dc up to the 5 kHz bandwidth of the feedback
loop, in accordance with the description of Sect. 9.2.2. The direct forward transmission term
G0r is small and does not inﬂuence Gr(s) at frequencies below half of the switching frequency.
The ideal forward gain from ˆvg to the output ˆv is
G∞g(s)= ˆv
ˆvg
⏐⏐
⏐⏐⏐
⏐
ˆvre f=0, ˆiload=0
ˆvy→
null
0
(13.89)

13.4 Example: Closed-Loop Regulator 533
Fig. 13.22 Determination of G∞g
The small-signal model with these conditions is illustrated in Fig. 13.22. Nulling ˆvy in the pres-
ence of ˆvre f = 0 causes ˆv−to be zero. Consequently the voltage across R4 and also across the
R3 −C3 branches are zero, and so there is no current through those elements. This implies
that there is no current through the R1−R2−C2 branch, and hence no voltage across it either.
Therefore the output voltage ˆv must be zero. So
G∞g= 0 (13.90)
In the limit of inﬁnite loop gain, ˆvg variations do not inﬂuence the output ˆv.
The gain G0g is the open-loop disturbance transfer function from ˆvg to ˆv, and is deﬁned as
G0g(s)= ˆv
ˆvg
⏐⏐
⏐⏐⏐
⏐
ˆvre f=0, ˆiload=0
ˆvx→
null
0
(13.91)
The small-signal model with these conditions is illustrated in Fig. 13.23. Nulling ˆvx causes ˆd to
be zero. Consequently the voltage at the output of the dc transformer model is equal to Mˆvg.
The output voltage is equal to this voltage multiplied by the ﬁlter transfer function He(s). So
G0g= MHe(s) (13.92)
The gain G0g coincides with the open-loop line-to-output transfer function Gvg(s).

534 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
Fig. 13.23 Determination of G0g
Figure 13.24 contains plots of the transfer functions G0g and Gg, again for the power stage
element values of Sect. 9.5.4 and the compensator circuit values of Fig. 15.29. The closed-loop
line-to-output transfer function Gg(s) follows the open-loop disturbance transfer functionGvg=
G0g above the crossover frequency of 5 kHz, as discussed in Sect. 9.2.1. Below the crossover
frequency, Gg is reduced by the factor 1/(1+ T).
The quantity Z∞o is the regulator output impedance under the conditions that the feedback
loop operates ideally, with zero error. Z∞o is deﬁned as:
Z∞o(s)=−ˆv
ˆiload
⏐⏐⏐
⏐⏐⏐
ˆvre f=0, ˆvg=0
ˆvy→
null
0
(13.93)
Figure 13.25 illustrates the small-signal model under these conditions. With ˆvre f set to zero and
with ˆvy nulled, ˆv−is also nulled. Then there is no voltage across the elements R4, R3,o r C3,
and hence the currents through these elements are zero. Consequently the currents through the
elements R1, R2, and C2 are zero, and hence the voltages across these elements are also nulled.
Therefore ˆv= ˆv−= 0. So the regulator ideal output impedance is
Z∞o(s)=−0
ˆiload
= 0 (13.94)
When the regulator operates ideally, load current disturbances do not aﬀect the output voltage.
The quantity Z0o is the regulator output impedance under open-loop conditions, with ˆvx set
to zero. Z0o is deﬁned as:
Z0o(s)=−ˆv
ˆiload
⏐⏐⏐
⏐⏐⏐
ˆvre f=0, ˆvg=0
ˆvx=0
(13.95)

13.4 Example: Closed-Loop Regulator 535
(a)
101 102 103 104
Frequency, Hz
-140
-120
-100
-80
-60
-40
-20
0
20
Magnitude, dB
Gg
G0g
(b)
101 102 103 104
Frequency, Hz
-180
-90
0
90
Phase, degrees
Gg
G0g
Fig. 13.24 Magnitude and phase Bode plots of the transfer functions G0g and Gg for the buck regulator
example. Dashed curves: disturbance transfer functionG0g= Gvg. Solid curves: closed-loop line-to-output
transfer function Gg
Figure 13.26 illustrates the small-signal model under these conditions. With ˆvre f set to zero and
with ˆvx set to zero, ˆd is zero and the transformer voltage is zero. Since ˆvre f is zero, ˆv−= 0. The
output impedance is then
Z0o(s)=−ˆv
ˆiload
= Zout

Z
1 (13.96)
where Zout is the power stage output impedance given by Eq. ( 13.87) and Z1 is the feedback
network impedance given by Eq. (13.80). In the usual case where Zout is much smaller than Z1,
this expression reduces to Zout.
Figure 13.27 contains plots of the transfer functions Z0o and Zo for the power stage element
values of Sect. 9.5.4 and the compensator circuit values of Fig. 15.29. The closed-loop output
impedance Zo(s) follows the open-loop output impedance Zout = Z0o above the crossover fre-
quency of 5 kHz, as discussed in Sect. 9.2.1. Below the crossover frequency, Zo is reduced by
the factor 1/(1+ T) relative to Zout.

536 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
Fig. 13.25 Determination of ideal output impedance Z∞o
Fig. 13.26 Determination of open-loop output impedance Z0o

13.4 Example: Closed-Loop Regulator 537
(a)
101 102 103 104
Frequency, Hz
-140
-120
-100
-80
-60
-40
-20
0
20
Magnitude, dB
Zo
Z0o
(b)
101 102 103 104
Frequency, Hz
-90
0
90
180Phase, degrees
Zo
Z0o
Fig. 13.27 Magnitude and phase Bode plots of the transfer functions Z0o and Zo for the buck regulator
example. Dashed curves: disturbance transfer functionZ0o= Zout. Solid curves: closed-loop line-to-output
transfer function Zo
The loop gain T(s)i s
T(s)= ˆvy
ˆvx
⏐⏐⏐
⏐
⏐⏐
ˆvre f=0, ˆiload=0
ˆvg=0
(13.97)
The small-signal model with these conditions is illustrated in Fig.13.28. To ﬁnd T(s), we begin
with the signal ˆvx, and ﬁnd how it propagates around the loop to the ˆ vy point. Under these
conditions, the output voltage ˆv is equal to ˆvx multiplied by the PWM gain (1/VM) and by the
converter control-to-output gain Gvd(s).

538 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
Fig. 13.28 Determination of loop gain T(s)
ˆv= Gvd(s)
⎦1
VM
)
ˆvx (13.98)
By solution of the model of Fig. 13.28, the power stage control-to-output transfer function is
Gvd(s)= e(s)MHe(s) (13.99)
with He(s) equal to the transfer function of the canonical model Le–C output ﬁlter.
With ˆvre f set to zero, the ideal op amp causes ˆv−= 0, and hence there is no current through
R4. The transfer function from ˆv to ˆvy is given by the inverting ampliﬁer formula:
ˆvy
ˆv = Z3
Z1
(13.100)
where Z1 i sg i v e nb yE q .(13.80) and Z3 is given by Eq. (13.82). The loop gain is the product of
Eqs. (13.98) and (13.100):
T(s)= Gvd(s)
⎦1
VM
)⎦Z3
Z1
)
(13.101)
Figure 13.29 contains plots of the loop gain T(s) for the power stage element values of
Sect. 9.5.4 and the compensator circuit values of Fig. 15.29.
In summary, the closed-loop transfer function from the reference ˆvre f to the output ˆv is
Gr(s)=
Z2
Z3
Z1+
⎦
Z2
Z3
) T
1+ T+ Zout
Z1+ Zout
1
1+ T (13.102)

13.4 Example: Closed-Loop Regulator 539
(a)
101 102 103 104
Frequency, Hz
-40
-20
0
20
40
60
Magnitude, dB
T
(b)
101 102 103 104
Frequency, Hz
-270
-225
-180
-135
-90
-45
0
Phase, degrees
T
Fig. 13.29 Magnitude and phase Bode plots of the loop gain T(s) for the buck regulator example
The closed-loop transfer function from input voltage disturbances ˆvg to the output ˆv is
Gg(s)= MHe
1+ T (13.103)
The closed-loop output impedance is
Zo=
Zout

Z
1
1+ T (13.104)
with T given by Eq. (13.101). The canonical model parameters of Table 7.1 for the buck con-
verter are substituted as appropriate into the above expressions.
This closed-loop regulator example includes three independent sources: the reference ˆ vre f
and disturbances ˆvg and ˆiload. Superposition is employed to apply the feedback theorem three
times, once for each independent input, and we ﬁnd a G0 and G∞term associated with each
source. The G∞r term has the physical interpretation of the ideal closed-loop gain from the

540 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
reference to the output, and corresponds to the 1/H term identiﬁed in Sect. 9.2.2.T h eG0r term
has the physical interpretation of direct forward transmission from ˆ vre f through the feedback
path to the output. The disturbance transfer functionG0g is the open-loop line-to-output transfer
function, and coincides with Gvg(s) of the open-loop converter. In this example, G∞g is zero:
when the feedback loop operates ideally, no ˆvg disturbances reach the output.
The feedback theorem provides a general way to deﬁne and determine the loop gain T.
Although we have found three closed-loop transfer functions from the three independent sources
to the output, there is a single physical feedback loop in the system, and a single expression for
the loop gain.
13.5 Summary of Key Points
1. The Feedback Theorem employs null double injection and linear superposition to determine
closed-loop gains and other important transfer functions of a feedback circuit, without need
to break the circuit into blocks that are noninteracting and unidirectional. An ideal injec-
tion point is identiﬁed, and then certain “thought experiments” are performed that lead to
derivation of analytical expressions for the important transfer functions of the closed-loop
circuit.
2. A given closed-loop gain G(s) is expressed in terms of an ideal gain G
∞(the limiting
transfer function with inﬁnite loop gain), a gain G0 (the limiting transfer function for zero
loop gain), and the loop gain T. The Feedback Theorem provides a simpliﬁed framework
for deriving these quantities.
3. An operational ampliﬁer circuit intended for use as a PD compensator is analyzed using
the Feedback Theorem. In this example, the G∞gain is found to be the transfer function
when the op amp is ideal. The G0 gain arises from direct forward transmission of the input
signal through the feedback path. The actual transfer function G is found to deviate signif-
icantly from G∞at high frequencies where the op amp has insu ﬃcient internal gain; this
can signiﬁcantly degrade the behavior of the PD compensator.
4. A closed-loop buck converter with PID compensator circuit is analyzed via the Feedback
Theorem, to derive the closed-loop transfer functions from the reference input and line input
to the output, as well as the closed-loop output impedance. This example illustrates how
the Feedback Theorem is useful for analyzing closed-loop disturbance transfer functions as
well as the reference-to-output transfer function.
Problems
13.1 A feedback ampliﬁer is shown in Fig. 13.30 including voltage injection vz suitable for
application of the Feedback Theorem. The objective in this problem is to solve for the
ampliﬁer gain
G= vo
vi
⏐⏐
⏐⏐⏐
vz=0
using the Feedback Theorem. Derive expressions forG∞, T, G0, and Tn, and show that the
reciprocity relationship holds. Your expressions should be in terms of the circuit parameter
values R1, R2, C, Ro, Ao.

13.5 Summary of Key Points 541
Fig. 13.30 Feedback ampliﬁer of Problem 13.1
13.2 A feedback ampliﬁer is shown in Fig. 13.31 including current injection iz suitable for
application of the Feedback Theorem. The objective in this problem is to solve for the
ampliﬁer gain
G= vo
vi
⏐⏐⏐
⏐
⏐
iz=0
using the Feedback Theorem. Derive expressions forG∞, T, G0, and Tn, and show that the
reciprocity relationship holds. Your expressions should be in terms of the circuit parameter
values R1, C, and gm.
Fig. 13.31 Feedback ampliﬁer of Problem 13.2
13.3 Figure 13.32 shows a PI compensator circuit in the closed-loop switching voltage regu-
lator of Problem 9.5. The PI compensator is constructed around an op amp provided in
a standard PWM controller chip. The input to the compensator is the regulator output
voltage v, and the output of the compensator is voltage vc. The reference voltage Vre f is
constant. The purpose of this problem is to show how the Feedback Theorem can be used
in the design of the PI compensator circuit. The closed-loop transfer function of interest is
G(s)= ˆvc
ˆv
⏐⏐⏐
⏐⏐⏐
ˆvre f=0

542 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
Fig. 13.32 PI compensator constructed around a transconductance ampliﬁer, Problem 13.3
(a) Assuming the op amp in Fig. 13.32 is ideal, show that
G∞(s)= ˆvc
ˆv
⏐⏐⏐⏐
⏐⏐
ideal op−amp
= G∞∞
⎦
1+ ω1
s
)
and derive expressions for the salient features of G∞(s) in terms of R1, R2, R3, C3.
Compute the numerical values for G∞∞and f1. Note that the assumption that the op
amp is ideal (in a negative-feedback circuit) is equivalent to the assumption that the
error signal is nulled in the Feedback Theorem terms. Hence, the transfer function
found in this part of the problem is equal to G
∞of the Feedback Theorem.
Assuming G(s)≈G∞(s), the closed-loop voltage regulator shown in Problem 9.5 should
be stable with adequate phase margin. A designer made this assumption, built the circuit,
and expected to obtain stable operation with well regulated output voltage. In lab experi-
ments, however, the switched-mode voltage regulator is found to be unstable, producing
oscillating voltages and currents. Knowing that you are familiar with the Feedback Theo-
rem, the designer asks you for assistance.
Looking through the PWM controller datasheet, you realize that the op amp provided
is not really a standard op amp with a large voltage gain and a low output impedance
but instead a transconductance ampliﬁer, which can be modeled as a controlled current
source, as shown in Fig. 13.33.
Fig. 13.33 Model of the transconductance ampliﬁer in Problem 13.3

13.5 Summary of Key Points 543
Furthermore, you ﬁnd that the transconductance gm of the ampliﬁer can be as low as
gmmin = 100μA/V and as high as gmmax = 1m A/V due to process and temperature
variations. You realize that the problem is well suited for application of the Feedback
Theorem and you proceed in several steps to address the stability problem encountered by
the designer.
(b) Using the current injection technique, ﬁnd analytical expressions for Go, T, and Tn
in the PI compensator of Fig. 13.32, taking into account the ampliﬁer model shown
in Fig. 13.33. Express the transfer functions in the standard factored pole-zero forms,
and derive expressions for the salient features in terms ofR1, R2, R3, C3, and gm. Show
that the reciprocity relationship holds.
(c) Using the results of part (b), derive an expression for the closed-loop transfer function
G(s), and show that G(s) can be written as
G(s)= ˆvc
ˆv
⏐⏐
⏐
⏐⏐⏐
ˆvre f=0
= G′
∞∞
⎦
1+ω′
1
s
)
Calculate and put in a table numerical values for G′
∞∞and f′
1 for the two extreme
values of gm, gmmin and gmmax, and compare these values to G∞∞and f1 found in
part (a). Explain why the switched-mode voltage regulator using the compensator of
Fig. 13.32 may become unstable.
(d) Suggest how to change the component values in the PI compensator in Fig. 13.32 so
that G∞(s) remains the same as found in part (a), and so that the compensator gainG(s)
closely approximates the ideal G∞(s) for all possible values of the transconductance
gm.
13.4 A model of an op amp is shown in Fig. 13.7b. In the model, Ro= 100Ω, and
Gop (s)= Ao
1⎦
1+ s
ω1
)⎦
1+ s
ω2
)
where Ao= 105→100 dB, f1= 10 Hz, and f2= 1M H z .
a) The op amp is used to construct closed-loop ampliﬁers with three di ﬀerent ideal
closed-loop gains: (i) G∞= 1, G∞=−1, and (iii) G∞= 10. Sketch circuit diagrams
of these three closed-loop ampliﬁers and choose resistance values.
b) For each of the closed-loop ampliﬁers considered in part (a), sketch the magnitude
and phase responses of the loop gain T(s) and determine numerical values for the
crossover frequency and the phase margin.
c) For each of the closed-loop ampliﬁers considered in part (a), derive an expression
for the closed-loop gain G(s) using the Feedback Theorem. Your expression should
be in the standard normalized form. Sketch the magnitude and phase responses and
annotate the plots with salient features of G(s).
13.5 A point-of-load (POL) voltage regulator using a synchronous buck converter is shown in
Fig. 13.34. Losses can be neglected except for the losses due to the inductor resistance RL
and the capacitor equivalent series resistance Resr . The PID compensator is constructed
around an op amp. In this problem, you may assume that the op amp has ideal charac-
teristics. The pulse-width modulator has a very large input resistance, so that a voltage
injection source ˆvz can be ideally inserted between the compensator and the PWM.

544 13 Techniques of Design-Oriented Analysis: The Feedback Theorem
Fig. 13.34 Synchronous buck voltage regulator with a PID compensator, Problems 13.5 and 13.6
a) Derive an expression for the loop gain T(s). The expression should be in standard
normalized form. Salient features of T(s) should be expressed in terms of the circuit
parameters shown in Fig. 13.34. Plot the magnitude and phase responses of the loop
gain, and determine numerical values for the crossover frequency fc and the phase
marginϕm.
b) In this part of the problem, the objective is to determine the closed-loop output
impedance Zo(s)=−ˆv/ˆiload of the POL voltage regulator using the Feedback The-
orem. Derive expressions for Z∞o, Z0o, and the null loop gain Tnz in standard normal-
ized forms. Show that the reciprocity relationship holds. Plot the magnitude and phase
responses of Zo(s).
c) In this part of the problem, the objective is to determine the closed-loop line-to-output
transfer function Gg(s)= ˆv/ˆvg using the Feedback Theorem. Derive expressions for
G∞g, G0g, and the null loop gain Tng in standard normalized forms. Show that the
reciprocity relationship holds. Plot the magnitude and phase responses of Gg(s).
d) In this part of the problem, the objective is to determine the closed-loop reference-
to-output response Gr(s)= ˆv/ˆvre f using the Feedback Theorem. Derive expressions
for G∞r, G0r, and the null loop gain Tnr in standard normalized forms. Show that the
reciprocity relationship holds. Plot the magnitude and phase responses of Gr(s).
e) Modify the PID compensator circuit so that T(s) remains exactly the same as found
in part (a), and so that the ideal reference-to-output response has unity gain at all
frequencies, i.e., so that G∞r= 1.
13.6 A model of the op amp used to construct the PID compensator in the voltage regulator of
Fig. 13.34 is shown in Fig. 13.7b. In the model, Ro= 0, and
Gop (s)= ωGBW
s

13.5 Summary of Key Points 545
where fGBW is the unity gain frequency, also referred to as the gain-bandwidth product
of the op amp. The objective in this problem is to examine how ﬁnite fGBW of the op
amp aﬀects closed-loop performance of the voltage regulator in Fig. 13.34. The transfer
function of interest is the PID compensator gain
Gc(s)=−ˆvc
ˆv
a) For the closed-loop ampliﬁer that implements the PID compensator, derive expres-
sions for the loop gain Tc(s), the ideal forward gain Gc∞, and the direct forward
transmission Gc0. The expressions should be in terms of the circuit parameters shown
in Fig. 13.34 and ωGBW . Overlay Bode plots of the magnitude and phase of Gc for
three diﬀerent values of fGBW :( i ) fGBW = 1 MHz, (ii) fGBW = 10 MHz, and (iii)
fGBW = 25 MHz.
b) Consider loop gain T(s) in the voltage regulator of Fig. 13.34, taking into account
Gc(s) found in part (a). Overlay Bode plots of the magnitude and phase ofT(s)f o rt h e
three diﬀerent values of fGBW considered in part (a). For each fGBW , calculate numeri-
cal values of the crossover frequency fc and the phase marginϕm, and compare to the
results obtained assuming an ideal op amp,i.e., assuming thatGc= Gc∞. Comment on
how large the gain-bandwidth product of the op amp should be so that the impact on
the closed-loop performance of the voltage regulator in Fig. 13.34 can be neglected.
13.7 Do Problem 9.7. Verify the result for the closed-loop transfer function ˆig(s)/ˆvre f (s)u s i n g
the Feedback Theorem. Then, using the Feedback Theorem, derive an expression for the
closed-loop input admittance
Y
g=
ˆig
ˆvg
Plot the magnitude and phase responses of Yg. In what range of frequencies is the magni-
tude of Yg approximately equal to the ideal Yg∞.
13.8 Do Problem 9.8. Then ﬁnd the closed-loop output impedance Zo using the Feedback
Theorem and verify that the speciﬁcations are met: magnitude of the closed-loop output
impedance should be less than 0.2Ωover the entire frequency range 0 to 20 kHz.
13.9 Do Problem 9.9. Then, using the Feedback Theorem, derive an expression for the closed-
loop reference-to-output response Gr = ˆv/ˆvre f . Plot the magnitude and phase responses
of Gr. Over what range of frequencies is the magnitude of Gr approximately equal to the
ideal Gr∞?
```
