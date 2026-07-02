---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第3章part 1 - 3 Steady-State Equivalent Circuit Modeling, Losses, and Efficiency
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 58-77 > Chunk ID: `chapter-3-part-1`"
---

# 第3章part 1 - 3 Steady-State Equivalent Circuit Modeling, Losses, and Efficiency

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 58-77  
> Chunk ID: `chapter-3-part-1`

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
3
Steady-State Equivalent Circuit Modeling, Losses,
and Eﬃciency
Let us now consider the basic functions performed by a switching converter, and attempt to rep-
resent these functions by a simple equivalent circuit. The designer of a converter power stage
must calculate the network voltages and currents, and specify the power components accord-
ingly. Losses and eﬃciency are of prime importance. The use of equivalent circuits is a physical
and intuitive approach which allows the well-known techniques of circuit analysis to be em-
ployed. As noted in the previous chapter, it is desirable to ignore the small but complicated
switching ripple, and model only the important dc components of the waveforms.
The dc transformer is used to model the ideal functions performed by a dc-dc converter
[14–17]. This simple model correctly represents the relationships between the dc voltages and
currents of the converter. The model can be reﬁned by including losses, such as semiconductor
forward voltage drops and on-resistances, inductor core and copper losses, etc. The resulting
model can be directly solved, to ﬁnd the voltages, currents, losses, and eﬃciency in the actual
nonideal converter.
3.1 The DC Transformer Model
As illustrated in Fig. 3.1, any switching converter contains three ports: a power input, a power
output, and a control input. The input power is processed as speciﬁed by the control input, and
then is output to the load. Ideally, these functions are performed with 100% eﬃciency, and hence
Pin= Pout (3.1)
or,
VgIg= VI (3.2)
These relationships are valid only under equilibrium (dc) conditions: during transients, the
net stored energy in the converter inductors and capacitors may change, causing Eqs. (3.1) and
(3.2) to be violated.
In the previous chapter, we found that we could express the converter output voltage in an
equation of the form
V= M(D)Vg (3.3)
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_3
43

44 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
Switching
dc-dc
converter
D
Control input
Power
input
Power
output
Ig I
+
V
+
Vg
Fig. 3.1 Switching converter terminal quantities
Power
output
+
V
I
+M(D)Vg
Power
input
+
Vg
Ig
M(D)I
Fig. 3.2 A switching converter equivalent circuit using dependent sources, corresponding to Eqs. ( 3.3)
and (3.4)
where M(D) is the equilibrium conversion ratio of the converter. For example, M(D)= D for
the buck converter, and M(D)= 1/(1−D) for the boost converter. In general, for ideal PWM
converters operating in the continuous conduction mode and containing an equal number of
independent inductors and capacitors, it can be shown that the equilibrium conversion ratio M
is a function of the duty cycle D and is independent of load.
Substitution of Eq. (3.3) into Eq. (3.2) yields
Ig= M(D)I (3.4)
Hence, the converter terminal currents are related by the same conversion ratio.
Equations ( 3.3) and ( 3.4) suggest that the converter could be modeled using dependent
sources, as in Fig. 3.2. An equivalent but more physically meaningful model (Fig. 3.3) can be
obtained through the realization that Eqs. ( 3.1)t o( 3.4) coincide with the equations of an ideal
transformer. In an ideal transformer, the input and output powers are equal, as stated in Eqs. (3.1)
and (3.2). Also, the output voltage is equal to the turns ratio times the input voltage. This is con-
sistent with Eq. ( 3.3), with the turns ratio taken to be the equilibrium conversion ratio M(D).
Finally, the input and output currents should be related by the same turns ratio, as in Eq. (3.4).
Thus, we can model the ideal dc-dc converter using the ideal dc transformer model of
Fig. 3.3.
This symbol represents the ﬁrst-order dc properties of any switching dc-dc converter: trans-
formation of dc voltage and current levels, ideally with 100% e ﬃciency, controllable by the
duty cycle D. The solid horizontal line indicates that the element is ideal and capable of passing
dc voltages and currents. It should be noted that, although standard magnetic core transformers

3.1 The DC Transformer Model 45
Fig. 3.3 Ideal dc trans-
former model of a dc-dc
converter operating in con-
tinuous conduction mode,
corresponding to Eqs. ( 3.1)
to (3.4)
D
Control input
Power
input
Power
output
+
V
+
Vg
Ig I1: M(D)
cannot transform dc signals (they saturate when a dc voltage is applied), we are nonetheless free
to deﬁne the idealized model of Fig. 3.3 for the purpose of modeling dc-dc converters. Indeed,
the absence of a physical dc transformer is one of the reasons for building a dc-dc switching
converter. So the properties of the dc-dc converter of Fig. 3.1 can be modeled using the equiva-
lent circuit of Fig. 3.3. An advantage of this equivalent circuit is that, for constant duty cycle, it
is time invariant: there is no switching or switching ripple to deal with, and only the important
dc components of the waveforms are modeled.
The rules for manipulating and simplifying circuits containing transformers apply equally
well to circuits containing dc-dc converters. For example, consider the network of Fig. 3.4a, in
which a resistive load is connected to the converter output, and the power source is modeled
by a Thevenin-equivalent voltage source V1 and resistance R1. The converter is replaced by the
dc transformer model in Fig. 3.4b. The elements V1 and R1 can now be pushed through the dc
(a)
D
RV1
R1
+
+
Vg
+
V
Switching
dc-dc
converter
(b) 1 : M(D)
RV1
R1
+
+
Vg
+
V
(c)
RM(D)V1
M 2(D)R1
+
+
V
Fig. 3.4 Example of the use of the dc transformer model: (a) original circuit; (b) substitution of switching
converter dc transformer model; (c) simpliﬁcation by referring all elements to secondary side

46 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
transformer as in Fig. 3.4c; the voltage source V1 is multiplied by the conversion ratio M(D),
and the resistor R1 is multiplied by M2(D). This circuit can now be solved using the voltage
divider formula to ﬁnd the output voltage:
V= M(D)V1
R
R+ M2(D)R1
(3.5)
It should be apparent that the dc transformer/equivalent circuit approach is a powerful tool for
understanding networks containing converters.
3.2 Inclusion of Inductor Copper Loss
The dc transformer model of Fig.3.3 can be extended, to model other properties of the converter.
Nonidealities, such as sources of power loss, can be modeled by adding resistors as appropri-
ate. In later chapters, we will see that converter dynamics can be modeled as well, by adding
inductors and capacitors to the equivalent circuit.
LR L
Fig. 3.5 Modeling inductor
copper loss via series resistor
RL
Let us consider the inductor copper loss in a boost converter.
Practical inductors exhibit power loss of two types: (1) copper
loss, originating in the resistance of the wire, and (2) core loss,
due to hysteresis and eddy current losses in the magnetic core.
A suitable model that describes the inductor copper loss is given
in Fig. 3.5, in which a resistor RL is placed in series with the
inductor. The actual inductor then consists of an ideal inductor,
L, in series with the copper loss resistor RL.
The inductor model of Fig. 3.5 is inserted into the boost converter circuit in Fig. 3.6.T h e
circuit can now be analyzed in the same manner as used for the ideal lossless converter, using
the principles of inductor volt-second balance, capacitor charge balance, and the small-ripple
approximation. First, we draw the converter circuits during the two subintervals, as in Fig.3.7.
For 0< t< DT
s, the switch is in position 1 and the circuit reduces to Fig.3.7a. The inductor
voltage vL(t), across the ideal inductor L, is given by
vL(t)= Vg−i(t)RL (3.6)
and the capacitor current iC(t)i s
iC(t)=−v(t)
R (3.7)
L
+ CR
+
v
1
2
i
Vg
RL
Fig. 3.6 Boost converter circuit, including inductor copper resistance RL

3.2 Inclusion of Inductor Copper Loss 47
(a) LR L
+
i
CR
+
v
L iC
Vg
(b) LR L
+
i
CR
+
v
+ v
+ vL iC
Vg
Fig. 3.7 Boost converter circuits during the two subintervals, including inductor copper loss resistance
RL:( a) with the switch in position 1, (b) with the switch in position 2
Next, we simplify these equations by assuming that the switching ripples in i(t) and v(t)a r e
small compared to their respective dc components I and V. Hence, i(t)≈I and v(t)≈V, and
Eqs. (3.6) and (3.7) become
vL(t)= Vg−IRL (3.8)
iC(t)=−V
R
For DTs < t< Ts, the switch is in position 2 and the circuit reduces to Fig. 3.7b. The inductor
current and capacitor voltage are then given by
vL(t)= Vg−i(t)RL−v(t)≈Vg−IRL−V (3.9)
iC(t)= i(t)−v(t)
R ≈I−V
R
We again make the small-ripple approximation.
The principle of inductor volt-second balance can now be invoked. Equations ( 3.8) and
(3.9) are used to construct the inductor voltage waveform vL(t)i nF i g .3.8. The dc component,
or average value, of the inductor voltage vL(t)i s
⟨vL(t)⟩= 1
Ts
∫ Ts
0
vL(t)dt= D
⎦
Vg−IRL
)
+ D′ ⎦
Vg−IRL−V
)
(3.10)
By setting⟨vL⟩ to zero and collecting terms, one obtains
0= Vg−IRL−D′V (3.11)
(recall that D+ D′ = 1). It can be seen that the inductor winding resistance RL adds another
term to the inductor volt-second balance equation. In the ideal boost converter (RL= 0) example

48 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
Fig. 3.8 Inductor voltage and
capacitor current waveforms, for
the nonideal boost converter of
Fig. 3.6
vL(t)
t
Vg IRL
DTs D'Ts
Vg L
iC(t)
t
of Chap. 2, we were able to solve this equation directly for the voltage conversion ratio V/Vg.
Equation (3.11) cannot be immediately solved in this manner, because the inductor current I is
unknown. A second equation is needed, to eliminate I.
The second equation is obtained using capacitor charge balance. The capacitor current iC(t)
waveform is given in Fig. 3.8. The dc component, or average value, of the capacitor current
waveform is
⟨iC(t)⟩= D
⎦
−V
R
)
+ D′
⎦
I−V
R
)
(3.12)
By setting⟨iC⟩ to zero and collecting terms, one obtains
0= D′I−V
R (3.13)
We now have two equations, Eqs. (3.11) and (3.13), and two unknowns, V and I. Elimination of
I and solution for V yields V
Vg
= 1
D′
1⎦
1+ RL
D′2R
) (3.14)
This is the desired solution for the converter output voltageV. It is plotted in Fig.3.9 for several
values of RL/R. It can be seen that Eq. ( 3.14) contains two terms. The ﬁrst, 1/D′, is the ideal
conversion ratio, with RL = 0. The second term, 1/(1+ RL/D′2R), describes the eﬀect of the
inductor winding resistance. IfRL is much less thanD′2R, then the second term is approximately
equal to unity and the conversion ratio is approximately equal to the ideal value 1/D′. However,
as RL is increased in relation to D′2R, then the second term is reduced in value, and V/Vg is
reduced as well.
As the duty cycle D approaches one, the inductor winding resistance RL causes a major
qualitative change in the V/Vg curve. Rather than approaching inﬁnity at D = 1, the curve
tends to zero. Of course, it is unreasonable to expect that the converter can produce inﬁnite
voltage, and it should be comforting to the engineer that the prediction of the model is now
more realistic. What happens at D= 1 is that the switch is always in position 1. The inductor is
never connected to the output, so no energy is transferred to the output and the output voltage
tends to zero. The inductor current tends to a large value, limited only by the inductor resistance
RL. A large amount of power is lost in the inductor winding resistance, equal to V2
g/RL, while

3.3 Construction of Equivalent Circuit Model 49
D
V/Vg
0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1
0
0.5
1
1.5
2
2.5
3
3.5
4
4.5
5
RL/R = 0
RL/R = 0.01
RL/R = 0.02
RL/R = 0.05
RL/R = 0.1
Fig. 3.9 Output voltage vs. duty cycle, boost converter with inductor copper loss
no power is delivered to the load; hence, we can expect that the converter e ﬃciency tends to
zero at D= 1.
Another implication of Fig. 3.9 is that the inductor winding resistance RL limits the maxi-
mum voltage that the converter can produce. For example, withRL/R= 0.02, it can be seen that
the maximum V/Vg is approximately 3.5. If it is desired to obtain V/Vg = 5, then according to
Fig. 3.9 the inductor winding resistance RL must be reduced to less than 1% of the load resis-
tance R. The only problem is that decreasing the inductor winding resistance requires building
a larger, heavier, more expensive inductor. So it is usually important to optimize the design, by
correctly modeling the eﬀects of loss elements such as RL, and choosing the smallest inductor
that will do the job. We now have the analytical tools needed to do this.
3.3 Construction of Equivalent Circuit Model
Next, let us reﬁne the dc transformer model, to account for converter losses. This will allow
us to determine the converter voltages, currents, and eﬃciency using well-known techniques of
circuit analysis.
In the previous section, we used the principles of inductor volt-second balance and capacitor
charge balance to write Eqs. (3.11) and (3.13), repeated here:
⟨v
L⟩= 0= Vg−IRL−D′V (3.15)
⟨iC⟩= 0= D′I−V
R

50 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
Fig. 3.10 Circuit whose loop equation is identical to
Eq. (3.16), obtained by equating the average inductor volt-
age⟨vL⟩ to zero +
LR L
+
+ vL
= 0
+ IRL
I
D'VVg
These equations state that the dc components of the inductor voltage and capacitor current are
equal to zero. Rather than algebraically solving the equations as in the previous section, we
can reconstruct a circuit model based on these equations, which describes the dc behavior of
the boost converter with inductor copper loss. This is done by constructing a circuit whose
Kirchhoﬀloop and node equations are identical to Eqs. (3.15).
3.3.1 Inductor Voltage Equation
⟨v
L⟩= 0= Vg−IRL−D′V (3.16)
This equation was derived by use of Kirchhoﬀ’s voltage law to ﬁnd the inductor voltage during
each subinterval. The results were averaged and set to zero. Equation (3.16) states that the sum
of three terms having the dimensions of voltage are equal to⟨vL⟩, or zero. Hence, Eq. (3.16)i s
of the same form as a loop equation; in particular, it describes the dc components of the voltages
around a loop containing the inductor, with loop current equal to the dc inductor current I.
So let us construct a circuit containing a loop with current I, corresponding to Eq. ( 3.16).
The ﬁrst term in Eq. ( 3.16) is the dc input voltage Vg, so we should include a voltage source
of value Vg as shown in Fig. 3.10. The second term is a voltage drop of value IRL, which is
proportional to the current I in the loop. This term corresponds to a resistance of value RL.T h e
third term is a voltage D′V, dependent on the converter output voltage. For now, we can model
this term using a dependent voltage source, with polarity chosen to satisfy Eq. (3.16).
3.3.2 Capacitor Current Equation
⟨iC⟩= 0= D′I−V
R (3.17)
This equation was derived using Kirchhoﬀ’s current law to ﬁnd the capacitor current during
each subinterval. The results were averaged, and the average capacitor current was set to zero.
Equation (3.17) states that the sum of two dc currents is equal to ⟨iC⟩, or zero. Hence, Eq.
(3.17) is of the same form as a node equation; in particular, it describes the dc components of
currents ﬂowing into a node connected to the capacitor. The dc capacitor voltage is V.
So now let us construct a circuit containing a node connected to the capacitor, as in Fig.3.11,
whose node equation satisﬁes Eq. (3.17). The second term in Eq. (3.17) is a current of magnitude
V/R, proportional to the dc capacitor voltage V. This term corresponds to a resistor of value R,
connected in parallel with the capacitor so that its voltage isV and hence its current is V/R.T h e
ﬁrst term is a current D′I, dependent on the dc inductor current I. For now, we can model this
term using a dependent current source as shown. The polarity of the source is chosen to satisfy
Eq. (3.17).

3.3 Construction of Equivalent Circuit Model 51
3.3.3 Complete Circuit Model
The next step is to combine the circuits of Figs.3.10 and 3.11 into a single circuit, as in Fig.3.12.
This circuit can be further simpliﬁed by recognizing that the dependent voltage and current
sources constitute an ideal dc transformer, as discussed in Sect.3.1.T h eD′V dependent voltage
source depends on V, the voltage across the dependent current source. Likewise, theD′I depen-
dent current source depends on I, the current ﬂowing through the dependent voltage source. In
each case, the coeﬃcient is D′. Hence, the dependent sources form a circuit similar to Fig. 3.2;
the fact that the voltage source appears on the primary rather than the secondary side is ir-
relevant, owing to the symmetry of the transformer. They are therefore equivalent to the dc
transformer model of Fig. 3.3, with turns ratio D′ : 1. Substitution of the ideal dc transformer
model for the dependent sources yields the equivalent circuit of Fig.3.13.
The equivalent circuit model can now be manipulated and solved to ﬁnd the converter volt-
ages and currents. For example, we can eliminate the transformer by referring the Vg voltage
source and RL resistance to the secondary side. As shown in Fig. 3.14, the voltage source value
is divided by the eﬀective turns ratio D′, and the resistance RL is divided by the square of the
turns ratio, D′2. This circuit can be solved directly for the output voltage V, using the voltage
divider formula:
V= Vg
D′
R
R+ RL
D′2
= Vg
D′
1
1+ RL
D′2R
(3.18)
This result is identical to Eq. ( 3.14). The circuit can also be solved directly for the inductor
current I, by referring all elements to the transformer primary side. The result is
Fig. 3.11 Circuit whose node equation is identical to Eq.
(3.17), obtained by equating the average capacitor current
⟨iC⟩ to zero
R
+
VC
iC
= 0
Node
V/R
D'I
++ D'V
RL
I D'I R
+
VVg
Fig. 3.12 The circuits of Figs. 3.10 and 3.11, drawn together

52 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
+
RL
I
R
+
V
D' : 1
Vg
Fig. 3.13 Equivalent circuit model of the boost converter, including a D′ : 1 dc transformer and the
inductor winding resistance RL
Fig. 3.14 Simpliﬁcation of the equivalent circuit of
Fig. 3.13, by referring all elements to the secondary side
of the transformer +
D'I
R
+
VVg/D'
RL/D' 2
I= Vg
D′2R+ RL
= Vg
D′2R
1
1+ RL
D′2R
(3.19)
3.3.4 Eﬃciency
The equivalent circuit model also allows us to compute the converter eﬃciency η. Figure 3.13
predicts that the converter input power is
Pin= (Vg)(I) (3.20)
The load current is equal to the current in the secondary of the ideal dc transformer, or D′I.
Hence, the model predicts that the converter output power is
Pout= (V)(D′I) (3.21)
Therefore, the converter eﬃciency is
η= Pout
Pin
= (V)(D′I)
(Vg)(I) = V
Vg
D′ (3.22)
Substitution of Eq. (3.18) into Eq. (3.22) to eliminate V yields
η= 1
1+ RL
D′2R
(3.23)
This equation is plotted in Fig. 3.15, for several values of RL/R. It can be seen from Eq. ( 3.23)
that, to obtain high eﬃciency, the inductor winding resistance RL should be much smaller than

3.3 Construction of Equivalent Circuit Model 53
D′2R, the load resistance referred to the primary side of the ideal dc transformer. This is easier
to do at low duty cycle, where D′ is close to unity, than at high duty cycle whereD′ approaches
zero. It can be seen from Fig. 3.15 that the eﬃciency is typically high at low duty cycles, but
decreases rapidly to zero near D= 1.
D
RL/R = 0.1
0.02
0.01
0.05
0.002
0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1
0%
10%
20%
30%
40%
50%
60%
70%
80%
90%
100%
Fig. 3.15 Eﬃciency vs. duty cycle, boost converter with inductor copper loss
Thus, the basic dc transformer model can be reﬁned to include other e ﬀects, such as the
inductor copper loss. The model describes the basic properties of the converter, including (a)
transformation of dc voltage and current levels, (b) second-order eﬀects such as power losses,
and (c) the conversion ratio M. The model can be solved to ﬁnd not only the output voltage V,
but also the inductor current I and the eﬃciencyη. All of the well-known techniques of circuit
analysis can be employed to solve the model, making this a powerful and versatile approach.
The example considered so far is a relatively simple one, in which there is only a single loss
element, RL. Of course, real converters are considerably more complicated, and contain a large
number of loss elements. When solving a complicated circuit to ﬁnd the output voltage and
eﬃciency, it behooves the engineer to use the simplest and most physically meaningful method
possible. Writing a large number of simultaneous loop or node equations is not the best ap-
proach, because its solution typically requires several pages of algebra, and the engineer usually
makes algebra mistakes along the way. The practicing engineer often gives up before ﬁnding
the correct solution. The equivalent circuit approach avoids this situation, because one can sim-
plify the circuit via well-known circuit manipulations such as pushing the circuit elements to
the secondary side of the transformer. Often the answer can then be written by inspection, using

54 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
the voltage divider rule or other formulas. The engineer develops conﬁdence that the result is
correct, and does not contain algebra mistakes.
3.4 How to Obtain the Input Port of the Model
Let us try to derive the model of the buck converter of Fig.3.16, using the procedure of Sect.3.3.
The inductor winding resistance is again modeled by a series resistor RL.
Fig. 3.16 Buck converter
example + CR
+
vC
LR LiL
ig 1
2
+ vL
Vg
The average inductor voltage can be shown to be
⟨vL⟩= 0= DVg−ILRL−VC (3.24)
This equation describes a loop with the dc inductor current IL. The dc components of the volt-
ages around this loop are: (i)t h eDVg term, modeled as a dependent voltage source, (ii) a voltage
drop ILRL, modeled as resistor RL, and (iii) the dc output voltage VC.
The average capacitor current is
⟨iC⟩= 0= IL−VC
R (3.25)
This equation describes the dc currents ﬂowing into the node connected to the capacitor. The
dc component of inductor current, IL, ﬂows into this node. The dc load current VC/R (i.e., the
current ﬂowing through the load resistor R) ﬂows out of this node. An equivalent circuit that
models Eqs. (3.24) and (3.25) is given in Fig. 3.17. This circuit can be solved to determine the
dc output voltage VC.
What happened to the dc transformer in Fig. 3.17? We expect the buck converter model to
contain a dc transformer, with turns ratio equal to the dc conversion ratio, or 1:D. According to
Fig. 3.2, the secondary of this transformer is equivalent to a dependent voltage source, of value
DVg. Such a source does indeed appear in Fig. 3.17. But where is the primary? From Fig. 3.2,
we expect the primary of the dc transformer to be equivalent to a dependent current source. In
Fig. 3.17 Equivalent circuit derived
from Eqs. (3.24)a n d(3.25)
iC
= 0
R
+
VC
RL
+DVg
+ vL
= 0
IL
VC/R

3.4 How to Obtain the Input Port of the Model 55
Fig. 3.18 Converter input current
waveform ig(t)
ig(t)
t
iL (t) IL
0
DTs Ts0
area =
DTs IL
Fig. 3.19 Converter input port dc
equivalent circuit + DILIgVg
Fig. 3.20 The circuits of Figs. 3.17
and 3.19, drawn together
R
+
VC
RL
+ DVg
IL
+ DIL
Ig
Vg
general, to derive this source, it is necessary to ﬁnd the dc component of the converter input
current ig(t).
The converter input current waveform ig(t) is sketched in Fig. 3.18. When the switch is in
position 1, ig(t) is equal to the inductor current. Neglecting the inductor current ripple, we have
ig(t)≈IL. When the switch is in position 2, ig(t) is zero. The dc component, or average value,
of ig(t)i s
Ig= 1
Ts
∫ Ts
0
ig(t)dt= DIL (3.26)
The integral ofig(t) is equal to the area under theig(t) curve, orDTsIL according to Fig.3.18.T h e
dc component Ig is therefore (DTsIL)/Ts= DIL. Equation (3.26) states thatIg, the dc component
of current drawn by the converter out of the Vg source, is equal to DIL. An equivalent circuit is
given in Fig. 3.19.
A complete model for the buck converter can now be obtained by combining Figs. 3.17
and 3.19 to obtain Fig. 3.20. The dependent current and voltage sources can be combined into a
dc transformer, since the DVg dependent voltage source has valueD times the voltage Vg across
the dependent current source, and the current source is the same constantD times the current IL
through the dependent voltage source. So, according to Fig. 3.2, the sources are equivalent to a
dc transformer with turns ratio 1:D, as shown in Fig. 3.21.
In general, to obtain a complete dc equivalent circuit that models the converter input port, it
is necessary to write an equation for the dc component of the converter input current. An equiv-
alent circuit corresponding to this equation is then constructed. In the case of the buck converter,
as well as in other converters having pulsating input currents, this equivalent circuit contains a
dependent current source which becomes the primary of a dc transformer model. In the boost

56 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
Fig. 3.21 Equivalent circuit of the
buck converter, including a 1 : D dc
transformer and the inductor winding
resistance RL R
+
VC
RLIL
+
Ig 1 : D
Vg
converter example of Sect. 3.3, it was unnecessary to explicitly write this equation, because
the input current ig(t) coincided with the inductor current i(t), and hence a complete equivalent
circuit could be derived using only the inductor voltage and capacitor current equations.
3.5 Example: Inclusion of Semiconductor Conduction Losses in the Boost
Converter Model
As a ﬁnal example, let us consider modeling semiconductor conduction losses in the boost
converter of Fig. 3.22. Another major source of power loss is the conduction loss due to semi-
conductor device forward voltage drops. The forward voltage of a metal oxide semiconductor
ﬁeld-eﬀect transistor (MOSFET) or bipolar junction transistor (BJT) can be modeled with rea-
sonable accuracy as an on-resistanceRon. In the case of a diode, insulated-gate bipolar transistor
(IGBT), or thyristor, a voltage source plus an on-resistance yields a model of good accuracy;
the on-resistance may be omitted if the converter is being modeled at a single operating point.
+
DTs Ts
+
i L
CR
+
v
iC
Vg
Fig. 3.22 Boost converter example
When the gate drive signal is high, the MOSFET turns on and the diode is reverse-biased.
The circuit then reduces to Fig. 3.23a. In the conducting state, the MOSFET is modeled by
the on-resistance Ron. The inductor winding resistance is again represented as in Fig. 3.5.T h e
inductor voltage and capacitor current are given by
vL(t)= Vg−iRL−iRon≈Vg−IRL−IRon (3.27)
iC(t)=−v
R≈−V
R
The inductor current and capacitor voltage have again been approximated by their dc compo-
nents.
When the gate drive signal is low, the MOSFET turns o ﬀ. The diode becomes forward-
biased by the inductor current, and the circuit reduces to Fig.3.23b. In the conducting state, the
diode is modeled in this example by voltage sourceVD and resistance RD. The inductor winding

3.5 Example: Inclusion of Semiconductor Conduction Losses in the Boost Converter Model 57
(a) LR L
+
i
CR
+
v
+ vL iC
RonVg
(b) LR L
+
i
CR
+
v
+ vL iC
RD
+
VD
Vg
Fig. 3.23 Boost converter circuits: (a) when MOSFET conducts, (b) when diode conducts
resistance is again modeled by resistanceRL. The inductor voltage and capacitor current for this
subinterval are
vL(t)= Vg−iRL−VD−iRD−v≈Vg−IRL−VD−IRD−V (3.28)
iC(t)= i−v
R≈I−V
R
The inductor voltage and capacitor current waveforms are sketched in Fig.3.24.
The dc component of the inductor voltage is given by
⟨vL⟩= D
⎦
Vg−IRL−IRon
)
+ D′ ⎦
Vg−IRL−VD−IRD−V
)
= 0 (3.29)
By collecting terms and noting that D+ D′= 1, one obtains
Vg−IRL−IDRon−D′VD−ID′RD−D′V= 0 (3.30)
Fig. 3.24 Inductor voltage
vL(t) and capacitor current iC (t)
waveforms, for the converter of
Fig. 3.22
vL(t)
t
Vg L on
DTs D'Ts
Vg L D D
iC(t)
t

58 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
Fig. 3.25 Equivalent circuit
corresponding to Eq. (3.30)
RL
+
D'RD
+
D'VDDRon
+ IRL on 'RD
+ D'V
I
Vg
Fig. 3.26 Equivalent circuit
corresponding to Eq. (3.32) R
+
V
V/R
D'I
This equation describes the dc components of the voltages around a loop containing the inductor,
with loop current equal to the dc inductor currentI. The resistive terms (for example,IDRon)a r e
interpreted as the voltage drop across resistive elements having current I and resistance equal
to the remaining terms (for the example, the eﬀective resistance is DRon). An equivalent circuit
is given in Fig. 3.25.
The dc component of the capacitor current is
⟨iC⟩= D
⎦
−V
R
)
+ D′
⎦
I−V
R
)
= 0 (3.31)
Upon collecting terms, one obtains
D′I−V
R= 0 (3.32)
This equation describes the dc components of the currents ﬂowing into a node connected to the
capacitor, with dc capacitor voltage equal to V. An equivalent circuit is given in Fig.3.26.
The two circuits are drawn together in Fig. 3.27. The dependent sources are combined into
an ideal D′:1 transformer in Fig. 3.28, yielding the complete dc equivalent circuit model.
Solution of Fig. 3.28 for the output voltage V yields
V=
⎦1
D′
)
(Vg−D′VD)
⎦ D′2R
D′2R+ RL+ DRon+ D′RD
)
(3.33)
RL
+
D'RD
+
D'VDDRon
+D'V R
+
VD'IIVg
Fig. 3.27 The circuits of Figs. 3.25 and 3.26, drawn together

3.5 Example: Inclusion of Semiconductor Conduction Losses in the Boost Converter Model 59
Dividing by Vg gives the voltage conversion ratio:
V
Vg
=
⎦1
D′
)⎦
1−D′VD
Vg
)
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1
1+ RL+ DRon+ D′RD
D′2R
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(3.34)
It can be seen that the eﬀect of the loss elements VD, RL, Ron, and RD is to decrease the voltage
conversion ratio below the ideal value (1/D′).
The eﬃciency is given byη= Pout/Pin.F r o mF i g .3.28, Pin= VgI and Pout= VD′I. Hence,
η= D′ V
Vg
=
⎦
1−D′VD
Vg
)
⎦
1+ RL+ DRon+ D′RD
D′2R
) (3.35)
For high eﬃciency, we require
Vg/D′ ≫ VD (3.36)
D′2R≫ RL+ DRon+ D′RD
It may seem strange that the equivalent circuit model of Fig. 3.28 contains eﬀective resistances
DRon and D′RD, whose values vary with duty cycle. The reason for this dependence is that the
semiconductor on-resistances are connected in the circuit only when their respective semicon-
ductor devices conduct. For example, at D= 0, the MOSFET never conducts, and the eﬀective
resistance DR
on disappears from the model. These eﬀective resistances correctly model the av-
erage power losses in the elements. For instance, the equivalent circuit predicts that the power
loss in the MOSFET on-resistance isI
2DRon. In the actual circuit, the MOSFET conduction loss
is I2Ron while the MOSFET conducts, and zero while the MOSFET is oﬀ. Since the MOSFET
conducts with duty cycle D, the average conduction loss is DI2Ron, which coincides with the
prediction of the model.
In general, to predict the power loss in a resistor R, we must calculate the root-mean-square
current Irms through the resistor, rather than the average current. The average power loss is then
RL
+
D'RD
+
D'VDDRon
R
+
VI
D' : 1
Vg
Fig. 3.28 Equivalent circuit model of the boost converter of Fig. 3.22, including ideal dc transformer,
inductor winding resistance, and MOSFET and diode conduction losses

60 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
i(t)
t
0
DTs Ts0
I
2 I
1.1 I
(a)
(c)
(b)
Fig. 3.29 Transistor current waveform, for various ﬁlter inductor values: ( a) with a very large inductor,
such thatΔi≈0; (b) with a typical inductor value, such that Δi= 0.1I;( c) with a small inductor value,
chosen such thatΔi= I
given by Irms 2R. Nonetheless, the average model of Fig. 3.28 correctly predicts average power
loss, provided that the inductor current ripple is small. For example, consider the MOSFET
conduction loss in the buck converter. The actual transistor current waveform is sketched in
Fig. 3.29, for several values of inductor current rippleΔi. Case (a) corresponds to use of an inﬁ-
nite inductance L, leading to zero inductor current ripple. As shown in Table 3.1, the MOSFET
conduction loss is then given byI
rms 2Ron= DI2Ron, which agrees exactly with the prediction of
the average model. Case (b) is a typical choice of inductance L, leading to an inductor current
ripple ofΔi= 0.1I. The exact MOSFET conduction loss, calculated using the rms value of
MOSFET current, is then only 0.33% greater than the prediction of the average model. In the
extreme case (c) where Δi= I, the actual conduction loss is 33% greater than that predicted
by the average model. Thus, the dc (average) model correctly predicts losses in the component
nonidealities, even though rms currents are not calculated. The model is accurate provided that
the inductor current ripple is small.
Table 3.1 Eﬀect of inductor current ripple on MOSFET conduction loss
Inductor current ripple MOSFET rms current Average power loss in Ron
(a)Δi= 0 I
√
DD I 2Ron
(b)Δi= 0.1i (1.00167) I
√
D (1.0033) DI2Ron
(c)Δi= I (1.155) I
√
D (1.3333) DI2Ron
3.6 Summary of Key Points
1. The dc transformer model represents the primary functions of any dc-dc converter: trans-
formation of dc voltage and current levels, ideally with 100% eﬃciency, and control of the
conversion ratio M via the duty cycle D. This model can be easily manipulated and solved
using familiar techniques of conventional circuit analysis.
2. The model can be reﬁned to account for loss elements such as inductor winding resistance
and semiconductor on-resistances and forward voltage drops. The reﬁned model predicts
the voltages, currents, and eﬃciency of practical nonideal converters.

3.6 Summary of Key Points 61
3. In general, the dc equivalent circuit for a converter can be derived from the inductor volt-
second balance and capacitor charge balance equations. Equivalent circuits are constructed
whose loop and node equations coincide with the volt-second and charge balance equations.
In converters having a pulsating input current, an additional equation is needed to model
the converter input port; this equation may be obtained by averaging the converter input
current.
Problems
3.1 In the buck–boost converter of Fig. 3.30, the inductor has winding resistance RL. All other
losses can be ignored.
(a) Derive an expression for the nonideal voltage conversion ratio V/Vg.
(b) Plot your result of part (a) over the range 0≤D≤1, for RL/R= 0, 0.01, and 0.05.
(c) Derive an expression for the eﬃciency. Manipulate your expression into a form similar
to Eq. (3.35)
Fig. 3.30 Nonideal buck–boost
converter, Problems 3.1 and 3.2
+
V+Vg L
3.2 The inductor in the buck–boost converter of Fig. 3.30 has winding resistance RL. All other
losses can be ignored. Derive an equivalent circuit model for this converter. Your model
should explicitly show the input port of the converter, and should contain two dc transform-
ers.
3.3 In the converter of Fig.3.31, the inductor has winding resistanceR
L. All other losses can be
ignored. The switches operate synchronously: each is in position 1 for 0< t< DTs, and in
position 2 for DTs< t< Ts.
(a) Derive an expression for the nonideal voltage conversion ratio V/Vg.
+
L
C
R
+ V 
1
2
2
1
Vg
Fig. 3.31 Nonideal current-fed bridge converter, Problems 3.3 and 3.4

62 3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency
(b) Plot your result of part (a) over the range 0≤D≤1, for RL/R= 0, 0.01, and 0.05.
(c) Derive an expression for the eﬃciency. Manipulate your expression into a form similar
to Eq. (3.35)
3.4 The inductor in the converter of Fig. 3.31 has winding resistance RL. All other losses can
be ignored. Derive an equivalent circuit model for this converter.
3.5 In the buck converter of Fig.3.32, the MOSFET has on-resistanceRon and the diode forward
voltage drop can be modeled by a constant voltage source VD. All other losses can be
neglected.
Fig. 3.32 Nonideal buck converter,
Problem 3.5
D1
Q1
R
+
V+ C
L
Vg
(a) Derive a complete equivalent circuit model for this converter.
(b) Solve your model to ﬁnd the output voltage V.
(c) Derive an expression for the eﬃciency. Manipulate your expression into a form similar
to Eq. (3.35).
3.6 A single-cell lithium-polymer battery is to be used to power a 3.3 V load. The battery volt-
age can vary over the usable range 3.0 V ≤Vbatt ≤4.2 V . It has been decided to use a
buck–boost converter for this application, as illustrated in Fig.3.33 below. A suitable MOS-
FET transistor has been found for Q1, having an on-resistance of Ron = 50 mΩ.Al o w -VF
(low forward voltage) Schottky diode is employed for D1; this diode can be modeled as a
ﬁxed voltage drop of VD = 0.2V, in series with an eﬀective resistance of RD = 0.1Ω.T h e
inductor has winding resistance RL. All other sources of loss can be neglected.
(a) Derive an equivalent circuit that models the dc properties of this converter. Include
the transistor, diode, and inductor conduction losses as described above. Your equiva-
lent circuit model should correctly describe the converter dc input port. Give analytical
expressions for all elements in your model.
“Analytical expressions” are equations or expressions that are written in terms of vari-
able names such as D, R
on, VD, etc., and that do not have numerical values substituted.
Q1
22 mH Load
R
+
V
–
fs = 200 kHz
DTs Ts
+
–
–
Vbatt
+
D1
100 mF
Fig. 3.33 Nonideal buck–boost converter powering a 3.3 V load from a lithium-polymer battery, Prob-
lem 3.6
```
