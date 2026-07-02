---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第7章part 2 - 7 AC Equivalent Circuit Modeling
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 247-266 > Chunk ID: `chapter-7-part-2`"
---

# 第7章part 2 - 7 AC Equivalent Circuit Modeling

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 247-266  
> Chunk ID: `chapter-7-part-2`

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
7.2 The Basic AC Modeling Approach 235
+
D1
Q1
CR
+
v(t)
1 : n
vg(t)
ig(t)
L
Fig. 7.19 Flyback converter example
During the ﬁrst subinterval, when MOSFET Q1 conducts, diode D1 is oﬀ. The circuit then
reduces to Fig. 7.20b. The inductor voltage vL(t), capacitor current iC(t), and converter input
current ig(t)a r e
vL(t)= vg(t)−i(t)Ron
iC(t)=−v(t)
R (7.56)
ig(t)= i(t)
We next make the small-ripple approximation, replacing the voltages and currents with their
average values as deﬁned by Eq. (7.3), to obtain
vL(t)=⟨vg(t)⟩Ts −⟨i(t)⟩Ts Ron
iC(t)=−⟨v(t)⟩Ts
R (7.57)
ig(t)=⟨i(t)⟩Ts
During the second subinterval, MOSFET Q1 is oﬀ, diode D1 conducts, and the circuit of
Fig. 7.20c is obtained. Analysis of this circuit shows that the inductor voltage, capacitor cur-
rent, and input current are given by
vL(t)=−v(t)
n
iC(t)= i(t)
n −v(t)
R
ig(t)= 0 (7.58)
The small-ripple approximation leads to
vL(t)=⟨v(t)⟩Ts
n
iC(t)=−⟨i(t)⟩Ts
n −⟨v(t)⟩Ts
R (7.59)
ig(t)= 0

236 7 AC Equivalent Circuit Modeling
(a)
+
D1
Q1
CR
+
v(t)
vg(t)
ig(t)
L
i(t) iC(t)+
vL(t)
1 : n
ideal
(b)
+ L
+
vvg
1:n
C
Transformer model
iig
R
iC+
vL
Ron
(c)
+
+
vvg
1:n
C
Transformer model
i
R
iC
i/n
v/n
+
+
vL
ig
= 0
Fig. 7.20 Flyback converter example: (a) incorporation of transformer equivalent circuit, (b) circuit dur-
ing subinterval 1, (c) circuit during subinterval 2
The inductor voltage and current waveforms are sketched in Fig. 7.21. The average inductor
voltage can now be found by averaging the waveform of Fig. 7.21a over one switching period.
The result is
⟨vL(t)⟩Ts = d(t)
⎦
⟨vg(t)⟩Ts −⟨i(t)⟩Ts Ron
)
+ d′(t)
⎦−⟨v(t)⟩Ts
n
)
(7.60)
By inserting this result into Eq. (7.13), we obtain the averaged inductor equation,

7.2 The Basic AC Modeling Approach 237
(a)
t
vL(t)
dTs Ts
0
vg on
vL(t) Ts
(b)
t
i(t)
dTs Ts0
i(t) Ts
v(t) Ts
nL
vg(t)
Ts
i(t) Ts
Ron
L
Fig. 7.21 Inductor waveforms for the ﬂyback example: (a) inductor voltage, (b) inductor current
(a)
t
iC(t)
dTs Ts
0
iC(t) Ts
in v
R
(b)
t
v(t)
dTs Ts0
v(t) Ts
v(t) Ts
RC
i(t) Ts
nC
v(t) Ts
RC
Fig. 7.22 Capacitor waveforms for the ﬂyback example: (a) capacitor current, (b) capacitor voltage
Ld⟨i(t)⟩Ts
dt = d(t)⟨vg(t)⟩Ts −d(t)⟨i(t)⟩Ts Ron−d′(t)⟨v(t)⟩Ts
n (7.61)
The capacitor waveforms are constructed in Fig.7.22. The average capacitor current is
⟨iC(t)⟩Ts = d(t)
⎦−⟨v(t)⟩Ts
R
)
+ d′(t)
⎦⟨i(t)⟩Ts
n −⟨v(t)⟩Ts
R
)
(7.62)

238 7 AC Equivalent Circuit Modeling
t
ig(t)
dTs Ts
0
0
i(t) Ts
ig(t)
Ts
0
Fig. 7.23 Input source current waveform, ﬂyback example
This leads to the averaged capacitor equation
C d⟨v(t)⟩Ts
dt = d′(t)⟨i(t)⟩TS
n −⟨v(t)⟩TS
R (7.63)
The converter input current ig(t) is sketched in Fig. 7.23. Its average is
⟨ig(t)⟩Ts = d(t)⟨i(t)⟩Ts (7.64)
The averaged converter equations (7.61), (7.63), and (7.64) are collected below:
Ld⟨i(t)⟩Ts
dt = d(t)⟨vg(t)⟩Ts −d(t)⟨i(t)⟩Ts Ron−d′(t)⟨v(t)⟩Ts
n
C d⟨v(t)⟩Ts
dt = d′(t)⟨i(t)⟩Ts
n −⟨v(t)⟩Ts
R (7.65)
⟨ig(t)⟩TS = d(t)⟨i(t)⟩Ts
This is a nonlinear set of diﬀerential equations, and hence the next step is to perturb and lin-
earize, to construct the converter small-signal ac equations. We assume that the converter input
voltage vg(t) and duty cycle d(t) can be expressed as quiescent values plus small ac variations,
as follows:
⟨vg(t)⟩Ts = Vg+ ˆvg(t) (7.66)
d(t)= D+ ˆd(t)
In response to these inputs, and after all transients have decayed, the average converter wave-
forms can also be expressed as quiescent values plus small ac variations:
⟨i(t)⟩Ts = I+ ˆi(t)
⟨v(t)⟩Ts = V+ ˆv(t) (7.67)
⟨ig(t)⟩Ts = Ig+ ˆig(t)
With these substitutions, the large-signal averaged inductor equation becomes
Ld(I+ ˆi(t))
dt = (D+ ˆd(t))(Vg+ ˆvg(t))−(D′−ˆd(t))(V+ ˆv(t))
n −(D+ ˆd(t))(I+ ˆi(t))Ron (7.68)

7.2 The Basic AC Modeling Approach 239
Upon multiplying this expression out and collecting terms, we obtain
L
⎦dI
dt+ dˆi(t)
dt
)
=
⎦
DVg−D′ V
n−DRonI
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
Dc terms
+
⎦
Dˆvg(t)−D′ ˆv(t)
n +
⎦
Vg+ V
n−IRon
)
ˆd(t)−DRonˆi(t)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
1st order ac terms (linear)
+
⎦
ˆd(t)ˆvg(t)+ ˆd(t) ˆv(t)
n −ˆd(t)ˆi(t)Ron
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
2nd order ac terms (nonlinear)
(7.69)
As usual, this equation contains three types of terms. The dc terms contain no time-varying
quantities. The ﬁrst-order ac terms are linear functions of the ac variations in the circuit, while
the second-order ac terms are functions of the products of the ac variations. If the small-signal
assumptions of Eq. (7.33) are satisﬁed, then the second-order terms are much smaller in magni-
tude that the ﬁrst-order terms, and hence can be neglected. The dc terms must satisfy
0= DV
g−D′ V
n−DRonI (7.70)
This result could also be derived by applying the principle of inductor volt-second balance to
the steady-state inductor voltage waveform. The ﬁrst-order ac terms must satisfy
Ldˆi(t)
dt = Dˆvg(t)−D′ ˆv(t)
n +
⎦
Vg+ V
n−IRon
)
ˆd(t)−DRonˆi(t) (7.71)
This is the linearized equation that describes ac variations in the inductor current.
Upon substitution of Eqs. (7.66) and (7.67) into the averaged capacitor equation (7.65), one
obtains
C d(V+ ˆv(t))
dt = (D′−ˆd(t))(I+ ˆi(t))
n −(V+ ˆv(t))
R (7.72)
By collecting terms, we obtain
C
⎦DV
dt + Dˆv(t)
dt
)
=
⎦D′I
n −V
R
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
Dc terms
+
⎦D′ˆi(t)
n −ˆv(t)
R −I ˆd(t)
n
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
1st order ac terms
(linear)
−
ˆd(t)ˆi(t)
n/bracehext/bracehext/bracehext/bracehext
2nd order ac term
(nonlinear)
(7.73)
We neglect the second-order terms. The dc terms of Eq. (7.73) must satisfy
0=
⎦D′I
n −V
R
)
(7.74)

240 7 AC Equivalent Circuit Modeling
This result could also be obtained by use of the principle of capacitor charge balance on the
steady-state capacitor current waveform. The ﬁrst-order ac terms of Eq. (7.73) lead to the small-
signal ac capacitor equation
C dˆv(t)
dt = D′ˆi(t)
n −ˆv(t)
R −I ˆd(t)
n (7.75)
Substitution of Eqs. (7.66) and (7.67) into the averaged input current equation (7.65) leads to
Ig+ ˆig(t)= (D+ ˆd(t))(I+ ˆi(t)) (7.76)
Upon collecting terms, we obtain
Ig
Dc term
+ ˆig(t)
1st order ac term
= (DI)
Dc term
+
⎦
Dˆi(t)+ I ˆd(t)
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
1st order ac terms
(linear)
+ ˆd(t)ˆi(t)/bracehext/bracehext
2nd order ac term
(nonlinear)
(7.77)
T h ed ct e r m sm u s ts a t i s f y
Ig= DI (7.78)
We neglect the second-order nonlinear terms of Eq. ( 7.77), leaving the following linearized ac
equation:
ˆig(t)= Dˆi(t)+ I ˆd(t) (7.79)
This result models the low-frequency ac variations in the converter input current.
The equations of the quiescent values, Eqs. (7.70), (7.74), and (7.78) are collected below:
0= DVg−D′ V
n−DRonI
0=
⎦D′I
n −V
R
)
(7.80)
Ig= DI
For given quiescent values of the input voltage Vg and duty cycle D, this system of equations
can be evaluated to ﬁnd the quiescent output voltage V, inductor current I, and input current dc
component Ig. The results are then inserted into the small-signal ac equations.
The small-signal ac equations, Eqs. (7.71), (7.75), and (7.79), are summarized below:
Ldˆi(t)
dt = Dˆvg(t)−D′ ˆv(t)
n +
⎦
Vg+ V
n−IRon
)
ˆd(t)−DRonˆi(t)
C dˆv(t)
dt = D′ˆi(t)
n −ˆv(t)
R −I ˆd(t)
n (7.81)
ˆig(t)= Dˆi(t)+ I ˆd(t)
The ﬁnal step is to construct an equivalent circuit that corresponds to these equations.
The inductor equation was derived by ﬁrst writing loop equations, to ﬁnd the applied in-
ductor voltage during each subinterval. These equations were then averaged, perturbed, and

7.2 The Basic AC Modeling Approach 241
linearized, to obtain Eq. (7.71). So this equation describes the small-signal ac voltages around
a loop containing the inductor. The loop current is the ac inductor current ˆi(t). The quantity
Ldˆi(t)/dt is the low-frequency ac voltage across the inductor. The four terms on the right-hand
side of the equation are the voltages across the four other elements in the loop. The termsDˆvg(t)
and−D′ ˆv(t)/n are dependent on voltages elsewhere in the converter, and hence are represented
as dependent sources in Fig. 7.24. The third term is driven by the duty-cycle variations ˆd(t) and
hence is represented as an independent source. The fourth term, −DRonˆi(t), is a voltage that is
proportional to the loop current ˆi(t). Hence this term obeys Ohm’s law, with eﬀective resistance
DRon as shown in the ﬁgure. So the inﬂuence of the MOSFET on-resistance on the converter
small-signal transfer functions is modeled by an eﬀective resistance of value DRon.
Small-signal capacitor equation (7.75) leads to the equivalent circuit of Fig.7.25. The equa-
tion constitutes a node equation of the equivalent circuit model. It states that the capacitor cur-
rent Cd ˆv(t)/dt is equal to three other currents. The current D′ˆi(t)/n depends on a current else-
where in the model, and hence is represented by a dependent current source. The term −ˆv(t)/R
is the ac component of the load current, which we model with a load resistance R connected
in parallel with the capacitor. The last term is driven by the duty-cycle variations ˆd(t), and is
modeled by an independent source.
The input port equation, Eq. (7.79), also constitutes a node equation. It describes the small-
signal ac currentˆig(t), drawn by the converter out of the input voltage source ˆvg(t). There are two
other terms in the equation. The termDˆi(t) is dependent on the inductor current ac variationˆi(t),
and is represented with a dependent source. The term I ˆd(t) is driven by the control variations,
and is modeled by an independent source. The equivalent circuit for the input port is illustrated
in Fig. 7.26.
Fig. 7.24 Circuit equivalent to the small-signal ac inductor loop equation, Eq. (7.81)o r( 7.71)
Fig. 7.25 Circuit equivalent to the small-signal ac capacitor node equation, Eq. (7.81)o r( 7.75)

242 7 AC Equivalent Circuit Modeling
Fig. 7.26 Circuit equivalent to the
small-signal ac input source current
equation, Eq. (7.81)o r( 7.79)
Fig. 7.27 The equivalent circuits of Figs.7.24, 7.25, 7.26, collected together
Fig. 7.28 Small-signal ac equivalent circuit model of the ﬂyback converter
The circuits of Figs. 7.24, 7.25, and 7.26 are combined in Fig. 7.27. The dependent sources
can be replaced by ideal transformers, leading to the equivalent circuit of Fig. 7.28.T h i si st h e
desired result: an equivalent circuit that models the low-frequency small-signal variations in the
converter waveforms. It can now be solved, using conventional linear circuit analysis techniques,
to ﬁnd the converter transfer functions, output impedance, and other ac quantities of interest.
7.3 Modeling the Pulse-Width Modulator
We have now achieved the goal, stated at the beginning of this chapter, of deriving a useful
equivalent circuit model for the switching converter in Fig. 6.51. One detail remains: modeling
the pulse-width modulator. The pulse-width modulator block shown in Fig. 6.51 produces a
logic signalδ(t) that commands the converter power transistor to switch on and oﬀ. The logic
signalδ(t) is periodic, with frequency fs and duty cycle d(t). The input to the pulse-width
modulator is an analog control signal vc(t). The function of the pulse-width modulator is to
produce a duty cycle d(t) that is proportional to the analog control voltage vc(t).
A schematic diagram of a simple pulse-width modulator circuit is given in Fig. 7.29.A
sawtooth-wave generator produces the voltage waveform vsaw(t) illustrated in Fig. 7.30.T h e
peak-to-peak amplitude of this waveform is VM. The converter switching frequency fs is de-

7.3 Modeling the Pulse-Width Modulator 243
Sawtooth
wave
generator
+
vsaw(t)
vc(t)
Comparator
(t)
PWM
waveform
Analog
input
Fig. 7.29 A simple pulse-width modulator circuit
Fig. 7.30 Waveforms of the circuit
of Fig. 7.29
vsaw(t)VM
0
(t)
t
TsdTs
vc(t)
0 2Ts
termined by and equal to the frequency of vsaw(t). An analog comparator compares the analog
control voltage vc(t)t o vsaw(t). This comparator produces a logic-level output which is high
whenever vc(t) is greater than vsaw(t), and is otherwise low. Typical waveforms are illustrated in
Fig. 7.30.
If the sawtooth waveform vsaw(t) has minimum value zero, then the duty cycle will be zero
whenever vc(t) is less than or equal to zero. The duty cycle will be D= 1 whenever vc(t)i s
greater than or equal to VM. If, over a given switching period,vsaw(t) varies linearly with t, then
for 0≤vc(t)≤VM the duty cycle d will be a linear function of vc. Hence, we can write
d(t)= vc(t)
VM
for 0 ≤vc(t)≤VM (7.82)
This equation is the input-output characteristic of the pulse-width modulator [15, 68].
To be consistent with the perturbed-and-linearized converter models of the previous sections,
we can perturb Eq. (7.82). Let
vc(t)= Vc+ ˆvc(t) (7.83)
d(t)= D+ ˆd(t)

244 7 AC Equivalent Circuit Modeling
Fig. 7.31 Pulse-width modulator
block diagram
Fig. 7.32 A more accurate pulse-
width modulator model, including
sampling
Pulse-width modulator
1
VM
vc d
Sampler
fs
Insertion of Eq. (7.83) into Eq. (7.82) leads to
D+ ˆd(t)= Vc+ ˆvc(t)
VM
(7.84)
A block diagram representing Eq. (7.84) is illustrated in Fig. 7.31. The pulse-width modulator
has linear gain 1/VM. By equating like terms on both sides of Eq. (7.84), one obtains
D= Vc
VM
ˆd(t)= ˆvc(t)
VM
(7.85)
So the quiescent value of the duty cycle is determined in practice by Vc.
The pulse-width modulator model of Fig. 7.31 is suﬃciently accurate for nearly all applica-
tions. However, it should be pointed out that pulse-width modulators also introduce sampling of
the waveform. Although the analog input signalv
c(t) is a continuous function of time, there can
be only one discrete value of the duty cycle during every switching period. Therefore, the pulse-
width modulator samples the waveform, with sampling rate equal to the switching frequency
fs. Hence, a more accurate modulator block diagram is as in Fig. 7.32 [10]. In the small-signal
sense, sampling in the pulse-width modulator occurs at the modulated edge of the PWM signal.
For example, in a trailing-edge PWM exempliﬁed by the waveforms shown in Fig. 7.30,t h e
sampling instants coincide with falling edges of the PWM output signalδ(t). This has important
implications in developments of sampled-data dynamic models where the converter response
to duty-cycle perturbations is modeled as an equivalent hold [77]. The sampled-data nature of
pulse-width modulated converters is taken into account in the developments of high-frequency
models of DCM converters in Sect.15.5, and current-programmed converters in Sect.18.7. Fur-
thermore, PWM sampling eﬀects are important in identiﬁcation of delays in the control loop
around a converter when the controller is implemented digitally, as discussed in Chap. 19.
In practice, PWM sampling restricts the useful frequencies of the ac variations to values
much less than the switching frequency. The designer must ensure that the bandwidth of the
control system be suﬃciently less than the Nyquist rate fs/2. Signiﬁcant high-frequency vari-
ations in the control signal vc(t) can also alter the behavior of the pulse-width modulator. A

7.4 The Canonical Circuit Model 245
common example is when vc(t) contains switching ripple, introduced by the feedback loop.
This phenomenon has been analyzed by several authors [67, 75], and eﬀects of inductor current
ripple on the transfer functions of current-programmed converters are investigated in Chap. 18.
But it is generally best to avoid the case where vc(t) contains signiﬁcant components at the
switching frequency or higher, since the pulse-width modulators of such systems exhibit poor
noise immunity.
7.4 The Canonical Circuit Model
Having discussed several methods for deriving the ac equivalent circuit models of switching
converters, let us now pause to interpret the results. All PWM CCM dc–dc converters perform
similar basic functions. First, they transform the voltage and current levels, ideally with 100%
eﬃciency. Second, they contain low-pass ﬁltering of the waveforms. While necessary to remove
the high-frequency switching ripple, this ﬁltering also inﬂuences low-frequency voltage and
current variations. Third, the converter waveforms can be controlled by variation of the duty
cycle.
We expect that converters having similar physical properties should have qualitatively sim-
ilar equivalent circuit models. Hence, we can deﬁne a canonical circuit model that correctly
accounts for all of these basic properties [ 15, 17, 61]. The ac equivalent circuit of any CCM
PWM dc–dc converter can be manipulated into this canonical form. This allows us to extract
physical insight, and to compare the ac properties of converters. The canonical model is used in
several later chapters, where it is desired to analyze converter phenomena in a general manner,
without reference to a speciﬁc converter. So the canonical model allows us to deﬁne and discuss
the physical ac properties of converters.
In this section, the canonical circuit model is developed, based on physical arguments. An
example is given which illustrates how to manipulate a converter equivalent circuit into canon-
ical form. Finally, the parameters of the canonical model are tabulated for several basic ideal
converters.
7.4.1 Development of the Canonical Circuit Model
The physical elements of the canonical circuit model are collected, one at a time, in Fig. 7.33.
The converter contains a power input port vg(t) and a control input port d(t), as well as a power
output port and load having voltagev(t). As discussed in Chap.3, the basic function of any CCM
PWM dc–dc converter is the conversion of dc voltage and current levels, ideally with 100% eﬃ-
ciency. As illustrated in Fig.7.33a, we have modeled this property with an ideal dc transformer,
having eﬀective turns ratio 1:M(D) where M is the conversion ratio. This conversion ratio is a
function of the quiescent duty cycle D. As discussed in Chap. 3, this model can be reﬁned, if
desired, by addition of resistors and other elements that model the converter losses.
Slow variations vg(t) in the power input induce ac variations v(t) in the converter output
voltage. As illustrated in Fig. 7.33b, we expect these variations also to be transformed by the
conversion ratio M(D).
The converter must also contain reactive elements that ﬁlter the switching harmonics and
transfer energy between the power input and power output ports. Since it is desired that the
output switching ripple be small, the reactive elements should comprise a low-pass ﬁlter having

246 7 AC Equivalent Circuit Modeling
Fig. 7.33 Development of the canonical circuit model, based on physical arguments: (a) dc transformer
model, (b) inclusion of ac variations, (c) reactive elements introduce eﬀective low-pass ﬁlter, (d) inclusion
of ac duty-cycle variations

7.4 The Canonical Circuit Model 247
a cutoﬀfrequency well below the switching frequency. This low-pass characteristic also aﬀects
how ac line voltage variations inﬂuence the output voltage. So the model should contain an
eﬀective low-pass ﬁlter as illustrated in Fig. 7.33c. This ﬁgure predicts that the line-to-output
transfer function is
Gvg(s)= ˆv(s)
ˆvg(s)= M(D)He(s) (7.86)
where He(s) is the transfer function of the eﬀective low-pass ﬁlter loaded by resistanceR. When
the load is nonlinear, R is the incremental load resistance, evaluated at the quiescent operating
point. The eﬀective ﬁlter also inﬂuences other properties of the converter, such as the small-
signal input and output impedances. It should be noted that the elemental values in the eﬀective
low-pass ﬁlter do not necessarily coincide with the physical element values in the converter. In
general, the element values, transfer function, and terminal impedances of the eﬀective low-pass
ﬁlter can vary with quiescent operating point. Examples are given in the following subsections.
Control input variations, speciﬁcally, duty-cycle variations ˆd(t), also induce ac variations
in the converter voltages and currents. Hence, the model should contain voltage and current
sources driven by ˆd(t). In the examples of the previous section, we have seen that both voltage
sources and current sources appear, which are distributed around the circuit model. It is possible
to manipulate the model such that all of the ˆd(t) sources are pushed to the input side of the
equivalent circuit. In the process, the sources may become frequency-dependent; an example
is given in the next subsection. In general, the sources can be combined into a single voltage
source e(s) ˆd(s) and a single current source j(s) ˆd(s) as shown in Fig.7.33d. This model predicts
that the small-signal control-to-output transfer function is
G
vd(s)= ˆv(s)
ˆd(s)
= e(s)M(D)He(s) (7.87)
This transfer function is found by setting the ˆ vg(s) variations to zero, and solving for the de-
pendence of ˆv(s)o n ˆd(s). Figure 7.33d is the complete canonical circuit, which can model any
PWM CCM dc–dc converter.
Often, we are also interested in the variations in output voltage ˆ v induced by variations
in load current ˆiload. We can model this by addition of an independent current source at the
converter output, as illustrated in Fig. 7.34. In this ﬁgure, the load is modeled as an e ﬀective
resistor R, in parallel with an independent ac current sourceˆiload. In the ac model, the resistance
R is the incremental resistance of the load, measured at the quiescent operating point, whileˆiload
is the ac variation in the load current. This model predicts that the transfer function from load
current variations to output voltage variation is given by
Zout(s)=−ˆv(s)
ˆiload(s)
= Zeo(s)∥R (7.88)
To derive Eq. (7.88), we set the independent sources ˆvg and ˆd to zero, and solve for the trans-
fer function from ˆiload to ˆv. This transfer function (with a minus sign) is the converter output
impedance Zout(s). As deﬁned above, the output impedance includes the incremental load resis-
tance R. In some circumstances, it may be appropriate to exclude the load impedance from the
deﬁnition of Zout, or to further include additional load impedances.
Thus, the canonical model can be solved for the converter key ac transfer functions. Of
common interest are the control-to-output transfer function Gvd(s), the line-to-output transfer
function Gvg(s), and the output impedance Zout(s).

248 7 AC Equivalent Circuit Modeling
Fig. 7.34 Modeling the eﬀect of load current variations by addition of independent current source ˆiload
Fig. 7.35 Small-signal ac model of the buck–boost converter, before manipulation into canonical form
7.4.2 Example: Manipulation of the Buck-Boost Converter Model into Canonical Form
To illustrate the steps in the derivation of the canonical circuit model, let us manipulate the
equivalent circuit of the buck–boost converter into canonical form. A small-signal ac equivalent
circuit for the buck–boost converter is derived in Sect.7.2. The result, Fig. 7.16b, is reproduced
in Fig. 7.35. To manipulate this network into canonical form, it is necessary to push all of the
independent d(t) generators to the left, while pushing the inductor to the right and combining
the transformers.
The (V
g−V) ˆd(t) voltage source is in series with the inductor, and hence the positions of these
two elements can be interchanged. In Fig.7.36a, the voltage source is placed on the primary side
of the 1: D ideal transformer; this requires dividing by the eﬀective turns ratio D. The output-
side I ˆd(t) current source has also been moved to the primary side of the D′:1 transformer. This
requires multiplying by the turns ratio 1/D′. The polarity is also reversed, in accordance with
the polarities of the D′:1 transformer windings.
Next, we need to move the I ˆd(t)/D current source to the left of the inductor. This can be
done using the artiﬁce illustrated in Fig. 7.36b. The ground connection of the current source is
broken, and the source is connected to node A instead. A second, identical, current source is
connected from node A to ground. The second source causes the current ﬂowing into node A to
be unchanged, such that the node equations of Fig. 7.36a,b are identical.

7.4 The Canonical Circuit Model 249
Fig. 7.36 Steps in the manipulation of the buck–boost ac model into canonical form
In Fig. 7.36c, the parallel combination of the inductor and current source is converted into
Thevenin-equivalent form. The series combination of an inductor and voltage source is obtained.
In Fig.7.36d, the I ˆd(t)/D current source is pushed to the primary side of the 1:D transformer.
The magnitude of the current source is multiplied by the turns ratio D. In addition, the current
source is pushed through the ( Vg −V) ˆd(t)/D voltage source, using the previously described

250 7 AC Equivalent Circuit Modeling
Fig. 7.37 The buck–boost converter model, in canonical form
artiﬁce. The ground connection of the source is moved to node B, and an identical source is
connected from node B to ground such that the circuit node equations are unchanged.
Figure 7.37 is the ﬁnal form of the model. The inductor is moved to the secondary side of
the D′:1 transformer, by multiplying by the square of the turns ratio as shown. The sLI ˆd(t)/D′
voltage source is moved to the primary side of the 1: D transformer, by dividing by the turns
ratio D. The voltage and current sources are combined as shown, and the two transformers are
combined into a single D′:D transformer. The circuit is now in canonical form.
It can be seen that the inductance of the eﬀective low-pass ﬁlter is not simply equal to the
physical inductor value L, but rather is equal to L/D′2.A td iﬀerent quiescent operating points,
with diﬀerent values of D′, the value of the eﬀective inductance will change. In consequence,
the transfer function, input impedance, and output impedance of the e ﬀective low-pass ﬁlter
will also vary with quiescent operating point. The reason for this variation is the transformation
of the inductance value by the eﬀective D′:1 transformer.
It can also be seen from Fig. 7.37 that the coeﬃcient of the ˆd(t) voltage generator is
e(s)= Vg−V
D −s LI
DD′ (7.89)
This expression can be simpliﬁed by substitution of the dc relationships (7.30). The result is
e(s)=−V
D2
⎦
1−s DL
D′2R
)
(7.90)
When we pushed the output-side I ˆd(t) current source through the inductor, we obtained a volt-
age source having a frequency dependence. In consequence, the e(s) ˆd voltage generator is
frequency-dependent.
7.4.3 Canonical Circuit Parameter Values for Some Common Converters
For ideal CCM PWM dc–dc converters containing a single inductor and capacitor, the eﬀective
low-pass ﬁlter of the canonical model should contain a single inductor and a single capacitor.
The canonical model then reduces to the circuit of Fig. 7.38. It is assumed that the capacitor is

7.5 State-Space Averaging 251
Fig. 7.38 The canonical model, for ideal CCM converters containing a single inductor and capacitor
connected directly across the load. The parameter values for the basic buck, boost, and buck–
boost converters are collected in Table 7.1. Again, it should be pointed out that the e ﬀective
inductance Le depends not only on the physical inductor value L, but also on the quiescent duty
cycle D. Furthermore, the current ﬂowing in the e ﬀective inductance Le does not in general
coincide with the physical inductor current I+ ˆi(t).
Table 7.1 Canonical model parameters for the ideal buck, boost and buck–boost converters
Converter M(D) Le e(s) j(s)
Buck DL V
D2
V
R
Boost 1
D′
L
D′2 V
⎦
1−sL
D′2R
) V
D′2R
Buck–boost −D
D′
L
D′2 −V
D2
⎦
1−sDL
D′2R
)
−V
D′2R
The model of Fig.7.38 can be solved using conventional linear circuit analysis, to ﬁnd quan-
tities of interest such as the converter transfer functions, input impedance, and output impedance.
Transformer-isolated versions of the buck, boost, and buck–boost converters, such as the full-
bridge, forward, and ﬂyback converters, can also be modeled using the equivalent circuit of
Fig. 7.38 and the parameters of Table 7.1, provided that one correctly accounts for the trans-
former turns ratio.
7.5 State-Space Averaging
A number of ac converter modeling techniques have appeared in the literature, including the
current-injected approach, circuit averaging, and the state-space averaging method. Although
the proponents of a given method may prefer to express the end result in a speciﬁc form, the
end results of nearly all methods are equivalent. And everybody will agree that averaging and
small-signal linearization are the key steps in modeling PWM converters.
The state-space averaging approach [ 15, 61] is described in this section. The state-space
description of dynamical systems is a mainstay of modern control theory; the state-space av-

252 7 AC Equivalent Circuit Modeling
eraging method makes use of this description to derive the small-signal averaged equations of
PWM switching converters. The state-space averaging method is otherwise identical to the pro-
cedure derived in Sect. 7.2. Indeed, the procedure of Sect. 7.2 amounts to state-space averaging,
but without the formality of writing the equations in matrix form. A beneﬁt of the state-space
averaging procedure is the generality of its result: a small-signal averaged model can always be
obtained, provided that the state equations of the original converter can be written.
Section 7.5.1 summarizes how to write the state equations of a network. The basic results of
state-space averaging are described in Sect. 7.5.2, and a short derivation is given in Sect. 7.5.3.
Section 7.5.4 contains an example, in which the state-space averaging method is used to derive
the quiescent dc and small-signal ac equations of a buck–boost converter.
7.5.1 The State Equations of a Network
The state-space description is a canonical form for writing the di ﬀerential equations that de-
scribe a system. For a linear network, the derivatives of the state variables are expressed as
linear combinations of the system independent inputs and the state variables themselves. The
physical state variables of a system are usually associated with the storage of energy, and for a
typical converter circuit, the physical state variables are the independent inductor currents and
capacitor voltages. Other typical state variables include the position and velocity of a motor
shaft. At a given point in time, the values of the state variables depend on the previous history
of the system, rather than on the present values of the system inputs. To solve the di ﬀerential
equations of the system, the initial values of the state variables must be speciﬁed. So if we know
the state of a system, that is, the values of all of the state variables, at a given time t
0, and if we
additionally know the system inputs, then we can in principle solve the system state equations
to ﬁnd the system waveforms at any future time.
The state equations of a system can be written in the compact matrix form of Eq. (7.91):
Kdx(t)
dt = Ax(t)+ Bu(t) (7.91)
y(t)= Cx(t)+ Eu(t)
Here, the state vector x(t) is a vector containing all of the state variables, that is, the inductor
currents, capacitor voltages, etc. The input vector u(t) contains the independent inputs to the
system, such as the input voltage source vg(t). The derivative of the state vector is a vector
whose elements are equal to the derivatives of the corresponding elements of the state vector:
x(t)=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
x1(t)
x2(t)
..
.
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
, dx(t)
dt =
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
dx1(t)
dt
dx2(t)
dt...
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
(7.92)
In the standard form of Eq. (7.91), K is a matrix containing the values of capacitance, inductance,
and mutual inductance (if any), such that Kdx(t)/dt is a vector containing the inductor winding
voltages and capacitor currents. In other physical systems, K may contain other quantities such
as moment of inertia or mass. Equation ( 7.91) states that the inductor voltages and capacitor
currents of the system can be expressed as linear combinations of the state variables and the
independent inputs. The matrices A and B contain constants of proportionality.

7.5 State-Space Averaging 253
iin(t) R1 C1
L
C2
R3
R2
+
v1(t)
+
v2(t) +
vout(t)
+vL(t)iR1(t) iC1(t) iC2(t)
i(t)
Fig. 7.39 Circuit example
It may also be desired to compute other circuit waveforms that do not coincide with the
elements of the state vector x(t) or the input vector u(t). These other signals are, in general,
dependent waveforms that can be expressed as linear combinations of the elements of the state
vector and input vector. The vector y(t) is usually called the output vector. We are free to place
any dependent signal in this vector, regardless of whether the signal is actually a physical out-
put. The converter input current ig(t) is often chosen to be an element of y(t). In the state equa-
tions (7.91), the elements of y(t) are expressed as a linear combination of the elements of the
x(t) and u(t) vectors. The matrices C and E contain constants of proportionality.
As an example, let us write the state equations of the circuit of Fig. 7.39. This circuit con-
tains two capacitors and an inductor, and hence the physical state variables are the independent
capacitor voltages v1(t) and v2(t), as well as the inductor current i(t). So we can deﬁne the state
vector as
x(t)=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎣
v1(t)
v2(t)
i(t)
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎦ (7.93)
Since there are no coupled inductors, the matrix K is diagonal, and simply contains the values
of capacitance and inductance:
K=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎣
C1 00
0 C2 0
00 L
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎦ (7.94)
The circuit has one independent input, the current source iin(t). Hence we should deﬁne the
input vector as
u(t)= [iin(t)] (7.95)
We are free to place any dependent signal in vector y(t). Suppose that we are interested in also
computing the voltage vout(t) and the current iR1(t). We can therefore deﬁne y(t)a s
y(t)=
[vout(t)
iR1(t)
]
(7.96)
To write the state equations in the canonical form of Eq. (7.91), we need to express the inductor
voltages and capacitor currents as linear combinations of the elements of x(t) and u(t), that is,
as linear combinations of v1(t), v2(t), i(t), and iin(t).
The capacitor current iC1(t) is given by the node equation
iC1(t)= C1
dv1(t)
dt = iin(t)−v1(t)
R1
−i(t) (7.97)

254 7 AC Equivalent Circuit Modeling
This equation will become the top row of the matrix equation (7.91). The capacitor currentiC2(t)
is given by the node equation,
iC2(t)= C2
dv2(t)
dt = i(t)−v2(t)
R2+ R3
(7.98)
Note that we have been careful to express this current as a linear combination of the elements
of x(t) and u(t) alone. The inductor voltage is given by the loop equation,
vL(t)= Ldi(t)
dt = v1(t)−v2(t) (7.99)
Equations (7.97)t o( 7.99) can be written in the following matrix form:
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎣
C1 00
0 C2 0
00 L
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
dv1(t)
dt
dv2(t)
dt
di(t)
dt
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
−1
R1
0 −1
0 −1
R2+ R3
1
1 −10
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎣
v1(t)
v2(t)
i(t)
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎦

+
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎣
1
0
0
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎦

[iin(t)]
K dx(t)
dt = Ax (t) + Bu (t)
(7.100)
Matrices A and B are now known.
It is also necessary to express the elements of y(t) as linear combinations of the elements of
x(t) and u(t). By solution of the circuit of Fig. 7.39, vout(t) can be written in terms of v2(t)a s
vout(t)= v2(t) R3
R2+ R3
(7.101)
Also, iR1(t) can be expressed in terms of v1(t)a s
iR1(t)= v1(t)
R1
(7.102)
By collecting Eqs. (7.101) and (7.102) into the standard matrix form of Eq. (7.91), we obtain
[vout(t)
iR1(t)
]
/bracehext/bracehext/bracehext/bracehext
=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢
⎣
0 R
3
R2+ R3
0
1
R1
00
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥
⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎣
v
1(t)
v2(t)
i(t)
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎦

+
[0
0
]

[iin(t)]
y(t) = Cx (t) + Eu (t)
(7.103)
We can now identify the matrices C and E as shown above.
It should be recognized that, starting in Chap. 2, we have always begun the analysis of
converters by writing their state equations. We are now simply writing these equations in matrix
form.
```
