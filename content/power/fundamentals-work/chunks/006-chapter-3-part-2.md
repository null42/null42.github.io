---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第3章part 2 - 3 Steady-State Equivalent Circuit Modeling, Losses, and Efficiency
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 78-81 > Chunk ID: `chapter-3-part-2`"
---

# 第3章part 2 - 3 Steady-State Equivalent Circuit Modeling, Losses, and Efficiency

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 78-81  
> Chunk ID: `chapter-3-part-2`

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
3.6 Summary of Key Points 63
(b) Solve your model to ﬁnd analytical expressions for the converter output voltage and
eﬃciency.
(c) It is decided that the converter must operate with an e ﬃciency of at least 80% under
the following operating condition:
Input voltage Vbatt = 4.0V
Output voltage V= 3.3V
Load current I= 2A
You should assume that a controller system (not shown in Fig. 3.33) adjusts the duty
cycle as necessary to regulate the output voltage to be V= 3.3 V. To meet the above
requirements, how large can the inductor winding resistanceRL be? At what duty cycle
will the converter then operate? Note: there is an easy way and a not-so-easy way to
solve this part.
(d) For your design of Part (c), compute the power loss in each element.
(e) Accurately plot the converter output voltage and e ﬃciency over the complete range
0 ≤D ≤1, using the value of inductor winding resistance RL computed in Part (c).
(f) Discuss your plot of Part (e). Does it behave as your expect? Explain.
3.7 To reduce the switching harmonics present in the input current of a certain buck converter,
an input ﬁlter is added as shown in Fig. 3.34. Inductors L1 and L2 contain winding resis-
tances RL1 and RL2, respectively. The MOSFET has on-resistance Ron, and the diode for-
ward voltage drop can be modeled by a constant voltage VD plus a resistor RD. All other
losses can be ignored.
D1
Q1
R
+
v+ C2C1
+
v
C1
L2 RL2RL1L1
Vg
i1 i2
Fig. 3.34 Buck converter with input ﬁlter, Problem 3.7
(a) Derive a complete equivalent circuit model for this circuit.
(b) Solve your model to ﬁnd the dc output voltage V.
(c) Derive an expression for the eﬃciency. Manipulate your expression into a form similar
to Eq. (3.35).
3.8 A 1.5 V battery is to be used to power a 5 V , 1 A load. It has been decided to use a buck–
boost converter in this application. A suitable transistor is found with an on-resistance of
35 mΩ, and a Schottky diode is found with a forward drop of 0.5 V . The on-resistance of
the Schottky diode may be ignored. The power stage schematic is shown in Fig.3.35.
(a) Derive an equivalent circuit that models the dc properties of this converter. Include the
transistor and diode conduction losses, as well as the inductor copper loss, but ignore all
other sources of loss. Your model should correctly describe the converter dc input port.
(b) It is desired that the converter operates with at least 70% e ﬃciency under nominal
conditions (i.e., when the input voltage is 1.5 V and the output is 5 V at 1 A). How

64 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
Q1
100 μH Load
+
5 V
1 A
fs = 40 kHz
DTs Ts
+Vg
1.5 V
+
Fig. 3.35 Nonideal buck–boost converter powering a 5 V load from a 1.5 V battery, Problem3.8
large can the inductor winding resistance be? At what duty cycle will the converter then
operate? Note: there is an easy way and a not-so-easy way to analytically solve this part.
(c) For your design of part (b), compute the power loss in each element.
(d) Plot the converter output voltage and e ﬃciency over the range 0 ≤D≤1, using the
value of inductor winding resistance which you selected in part (b).
(e) Discuss your plot of part (d). Does it behave as you expect? Explain.
For Problems 3.9 and 3.10, a transistor having an on-resistance of 0.5Ωis used. To simplify
the problems, you may neglect all losses other than the transistor conduction loss. You may
also neglect the dependence of MOSFET on-resistance on rated blocking voltage. These
simplifying assumptions reduce the diﬀerences between converters, but do not change the
conclusions regarding which converter performs best in the given situations.
3.9 It is desired to interface a 500 V dc source to a 400 V , 10 A load using a dc-dc converter.
Two possible approaches, using buck and buck–boost converters, are illustrated in Fig.3.36.
Use the assumptions described above to:
(a)
+
400 V
+
500 V
10 A
+
(b)
+
400 V
500 V
+
10 A
+
Fig. 3.36 Problem 3.9: interfacing a 500 V source to a 400 V load, using: ( a) a buck converter, ( b)a
buck–boost converter

3.6 Summary of Key Points 65
(a) Derive equivalent circuit models for both converters, which model the converter input
and output ports as well as the transistor conduction loss.
(b) Determine the duty cycles that cause the converters to operate with the speciﬁed con-
ditions.
(c) Compare the transistor conduction losses and eﬃciencies of the two approaches, and
conclude which converter is better suited to the speciﬁed application.
3.10 It is desired to interface a 300 V battery to a 400 V , 10 A load using a dc-dc converter. Two
possible approaches, using boost and buck–boost converters, are illustrated in Fig. 3.37.
Using the assumptions described above (before Problem 3.9), determine the eﬃciency
and power loss of each approach. Which converter is better for this application?
(a)
+
400 V
+
300 V
10 A
(b)
+
400 V
300 V
+
10 A
Fig. 3.37 Problem 3.10: interfacing a 300 V battery to a 400 V load, using: ( a) a boost converter, (b)a
buck–boost converter
3.11 A buck converter is operated from the rectiﬁed 230 V ac mains, such that the converter dc
input voltage is
Vg= 325 V± 20%
A control circuit automatically adjusts the converter duty cycle D, to maintain a constant
dc output voltage of V= 240 V dc. The dc load current I can vary over a 10: 1 range:
10 A≤I≤1A
The MOSFET has an on-resistance of 0.8Ω. The diode conduction loss can be modeled
by a 0.7 V source in series with a 0.2Ωresistor. All other losses can be neglected.
(a) Derive an equivalent circuit that models the converter input and output ports, as well
as the loss elements described above.
(b) Given the range of variation of Vg and I described above, over what range will the
duty cycle vary?

66 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
(c) At what operating point (i.e., at what value of Vg and I) is the converter power loss
the largest? What is the value of the eﬃciency at this operating point?
3.12 In the ´Cuk converter of Fig.3.38, the MOSFET has on-resistance Ron and the diode has a
constant forward voltage drop VD. All other losses can be neglected.
+ D1
L1
C2 R
+
VQ1
C1
L2
Vg
Fig. 3.38 ´Cuk converter, Problem 3.12
(a) Derive an equivalent circuit model for this converter. Suggestion: if you do not know
how to handle some of the terms in your dc equations, then temporarily leave them
as dependent sources. A more physical representation of these terms may become
apparent once dc transformers are incorporated into the model.
(b) Derive analytical expressions for the converter output voltage and for the eﬃciency.
(c)F o r VD = 0, plot V/Vg vs. D over the range 0≤D≤1, for (i) Ron/R= 0.01, and (ii)
Ron/R= 0.05.
(d)F o r VD = 0, plot the converter eﬃciency over the range 0 ≤D≤1, for ( i) Ron/R
= 0.01, and (ii) Ron/R= 0.05.
```
