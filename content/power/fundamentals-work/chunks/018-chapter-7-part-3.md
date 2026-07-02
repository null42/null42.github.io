---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第7章part 3 - 7 AC Equivalent Circuit Modeling
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 267-286 > Chunk ID: `chapter-7-part-3`"
---

# 第7章part 3 - 7 AC Equivalent Circuit Modeling

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 267-286  
> Chunk ID: `chapter-7-part-3`

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
7.5 State-Space Averaging 255
7.5.2 The Basic State-Space Averaged Model
Consider now that we are given a PWM converter, operating in the continuous conduction
mode. The converter circuit contains independent states that form the state vector x(t), and
the converter is driven by independent sources that form the input vector u(t). During the ﬁrst
subinterval, when the switches are in position 1, the converter reduces to a linear circuit that can
be described by the following state equations:
Kdx(t)
dt = A1x(t)+ B1u(t)
y(t)= C1x(t)+ E1u(t) (7.104)
During the second subinterval, with the switches in position 2, the converter reduces to another
linear circuit whose state equations are
Kdx(t)
dt = A2x(t)+ B2u(t) (7.105)
y(t)= C2x(t)+ E2u(t)
During the two subintervals, the circuit elements are connected diﬀerently; therefore, the respec-
tive state equation matrices A1, B1, C1, E1 and A2, B2, C2, E2 may also diﬀer. Given these
state equations, the result of state-space averaging is the state equations of the equilibrium and
small-signal ac models.
Provided that the natural frequencies of the converter, as well as the frequencies of variations
of the converter inputs, are much slower than the switching frequency, then the state-space
averaged model that describes the converter in equilibrium is
0= AX+ BU (7.106)
Y= CX+ EU
where the averaged matrices are
A= DA
1+ D′A2
B= DB1+ D′B2
C= DC1+ D′C2
E= DE1+ D′E2 (7.107)
The equilibrium dc components are
X= equilibrium (dc) state vector
U= equilibrium (dc) input vector
Y= equilibrium (dc) output vector
D= equilibrium (dc) duty cycle (7.108)
Quantities deﬁned in Eq. (7.108) represent the equilibrium values of the averaged vectors. Equa-
tion (7.106) can be solved to ﬁnd the equilibrium state and output vectors:
X=−A−1BU (7.109)
Y= (−CA−1B+ E)U

256 7 AC Equivalent Circuit Modeling
The state equations of the small-signal ac model are
Kdˆx(t)
dt = Aˆx(t)+ Bˆu(t)+{(A1−A2)X+ (B1−B2)U} ˆd(t) (7.110)
ˆy(t)= Cˆx(t)+ Eˆu(t)+{(C1−C2)X+ (E1−E2)U} ˆd(t)
The quantities ˆx(t), ˆu(t), ˆy(t), and ˆd(t)i nE q .(7.110) are small ac variations about the equilibrium
solution, or quiescent operating point, deﬁned by Eqs. (7.106)t o( 7.109).
So if we can write the converter state equations, Eqs. ( 7.104) and ( 7.105), then we can
always ﬁnd the averaged dc and small-signal ac models, by evaluation of Eqs. (7.106)t o( 7.110).
7.5.3 Discussion of the State-Space Averaging Result
As in Sects. 7.1 and 7.2, the low-frequency components of the inductor currents and capacitor
voltages are modeled by averaging over an interval of length Ts. Hence, we can deﬁne the
average of the state vector x(t)a s
⟨x(t)⟩Ts = 1
Ts
∫ t+Ts/2
t−Ts/2
x(τ) dτ (7.111)
The low-frequency components of the input and output vectors are modeled in a similar manner.
By averaging the inductor voltages and capacitor currents, one then obtains the following low-
frequency state equation:
Kd⟨x(t)⟩Ts
dt = ⎦d(t)A1+ d′(t)A2
)⟨x(t)⟩Ts + ⎦d(t)B1+ d′(t)B2
)⟨u(t)⟩Ts (7.112)
This result is equivalent to Eq. (7.2).
For example, let us consider how the elements of the state vector x(t) change over one
switching period. During the ﬁrst subinterval, with the switches in position 1, the converter
state equations are given by Eq. (7.104). Therefore, the elements of x(t) change with the slopes
K−1(A1x(t)+B1u(t)). If we make the small ripple approximation, thatx(t) and u(t) do not change
much over one switching period, then the slopes are essentially constant and are approximately
equal to
dx(t)
dt = K−1 ⎦A1⟨x(t)⟩Ts + B1⟨u(t)⟩Ts
) (7.113)
This assumption coincides with the requirements for small switching ripple in all elements of
x(t) and that variations in u(t) be slow compared to the switching frequency. If we assume that
the state vector is initially equal to x(0), then we can write
x(dTs)/bracehext/bracehext
ﬁnal
value
= x(0)
initial
value
+ (dTs)
interval
length
K−1 ⎦A1⟨x(t)⟩Ts + B1⟨u(t)⟩Ts
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
slope
(7.114)
Similar arguments apply during the second subinterval. With the switch in position 2, the state
equations are given by Eq. (7.105). With the assumption of small ripple during this subinterval,
the state vector now changes with slope
dx(t)
dt = K−1 ⎦A2⟨x(t)⟩Ts + B2⟨u(t)⟩Ts
) (7.115)

7.5 State-Space Averaging 257
K A 1 x Ts
+ B1 u Ts
K A 2 x Ts
+ B2 u Ts
t
x(t)
x(0) x(Ts)
dTs Ts0
K dA 1 +d'A 2 x Ts
+ dB1 +d'B2 u Ts
x(t) Ts
Fig. 7.40 How an element of the state vector, and its average, evolve over one switching period
The state vector at the end of the switching period is
x(Ts)
ﬁnal
value
= x(dTs)/bracehext/bracehext
initial
value
+ (d′Ts)
interval
length
K−1 ⎦A2⟨x(t)⟩Ts + B2⟨u(t)⟩Ts
)
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
slope
(7.116)
Substitution of Eq. (7.114) into Eq. (7.116) allows us to determine x(Ts) in terms of x(0):
x(Ts)= x(0)+ dTsK−1 ⎦A1⟨x(t)⟩Ts + B1⟨u(t)⟩Ts
)+ d′TsK−1 ⎦A2⟨x(t)⟩Ts + B2⟨u(t)⟩Ts
) (7.117)
Upon collecting terms, one obtains
x(Ts)= x(0)+ TsK−1 ⎦d(t)A1+ d′(t)A2
)⟨x(t)⟩Ts + TsK−1 ⎦d(t)B1+ d′(t)B2
)⟨u(t)⟩Ts (7.118)
Next, we approximate the derivative of⟨x(t)⟩TS using the net change over one switching period:
d⟨x(t)⟩Ts
dt ≈x(Ts)−x(0)
Ts
(7.119)
Substitution of Eq. (7.118)i n t o(7.119) leads to
Kd⟨x(t)⟩Ts
dt = (d(t)A1+ d′(t)A2)⟨x(t)⟩Ts + (d(t)B1+ d′(t)B2)⟨u(t)⟩Ts (7.120)
which is identical to Eq. (7.113). This is the basic averaged model which describes the converter
dynamics. It is nonlinear because the control input d(t) is multiplied by ⟨x(t)⟩Ts and⟨u(t)⟩Ts .
Variation of a typical element of x(t) and its average are illustrated in Fig. 7.40.
It is also desired to ﬁnd the low-frequency components of the output vector y(t) by averag-
ing. The vector y(t) is described by Eq. (7.104) for the ﬁrst subinterval, and by Eq. ( 7.105)f o r
the second subinterval. Hence, the elements of y(t) may be discontinuous at the switching tran-
sitions, as illustrated in Fig. 7.41. We can again remove the switching harmonics by averaging
over one switching period; the result is
⟨y(t)⟩Ts = d(t) ⎦C1⟨x(t)⟩Ts + E1⟨u(t)⟩Ts
)+ d′(t) ⎦C2⟨x(t)⟩Ts + E2⟨u(t)⟩Ts
) (7.121)
Rearrangement of terms yields
⟨y(t)⟩Ts = ⎦d(t)C1+ d′(t)C2
)⟨x(t)⟩Ts + ⎦d(t)E1+ d′(t)E2
)⟨u(t)⟩Ts (7.122)

258 7 AC Equivalent Circuit Modeling
t
y(t)
dTs Ts
0
0
C1 x(t) Ts
+ E1 u(t) Ts
C2 x(t) Ts
+ E2 u(t) Ts
y(t) Ts
Fig. 7.41 Averaging an element of the output vector y(t)
This is again a nonlinear equation.
The averaged state equations, (7.120) and (7.122), are collected below:
Kd⟨x(t)⟩TS
dt = (d(t)A1+ d′(t)A2)⟨x(t)⟩Ts + (d(t)B1+ d′(t)B2)⟨u(t)⟩Ts (7.123)
⟨y(t)⟩Ts = (d(t)C1+ d′(t)C2)⟨x(t)⟩Ts + (d(t)E1+ d′(t)E2)⟨u(t)⟩Ts
The next step is the linearization of these equations about a quiescent operating point, to con-
struct a small-signal ac model. When dc inputs d(t)= D and u(t)= U are applied, converter
operates in equilibrium when the derivatives of all of the elements of ⟨x(t)⟩Ts are zero. Hence,
by setting the derivative of⟨x(t)⟩Ts to zero in Eq. (7.123), we can deﬁne the converter quiescent
operating point as the solution of
0= AX+ BU (7.124)
Y= CX+ EU
where deﬁnitions ( 7.107) and ( 7.108) have been used. We now perturb and linearize the con-
verter waveforms about this quiescent operating point:
⟨x(t)⟩Ts = X+ ˆx(t)
⟨u(t)⟩Ts = U+ ˆu(t) (7.125)
⟨y(t)⟩Ts = Y+ ˆy(t)
d(t)= D+ ˆd(t)⇒d′(t)= D′−ˆd(t)
Here, ˆu(t) and ˆd(t) are small ac variations in the input vector and duty ratio. The vectors ˆx(t)
and ˆy(t) are the resulting small ac variations in the state and output vectors. We must assume
that these ac variations are much smaller than the quiescent values. In other words,
∥U∥≫∥ ˆu(t)∥
D≫| ˆd(t)|
∥X∥≫∥ ˆx(t)∥
∥Y∥≫∥ ˆy(t)∥ (7.126)
Here,∥x∥ denotes a norm of the vector x.

7.5 State-Space Averaging 259
Substitution of Eq. (7.125) into Eq. (7.123) yields
Kd(X+ ˆx(t))
dt =
⎦
(D+ ˆd(t))A1+
⎦
D′−ˆd(t)
)
A2
)
(X+ ˆx(t))
+
⎦
(D+ ˆd(t))B1+ (D′−ˆd(t))B2
)
(U+ ˆu(t))
(7.127)
(Y+ ˆy(t))=
⎦
(D+ ˆd(t))C1+ (D′−ˆd(t))C2
)
(X+ ˆx(t))
+
⎦
(D+ ˆd(t))E1+ (D′−ˆd(t))E2
)
(U+ ˆu(t))
The derivative dX/dt is zero. By collecting terms, one obtains
Kdˆx(t)
dt/bracehext/bracehext/bracehext/bracehext
ﬁrst order ac
= (AX+ BU)/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
dc terms
+ Aˆx(t)+ Bˆu(t)+{(A1−A2)X+ (B1−B2)U} ˆd(t)/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
ﬁrst-order ac terms
+ (A1−A2)ˆx(t) ˆd(t)+ (B1−B2)ˆu(t) ˆd(t)/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
second-order nonlinear terms
(7.128)
(Y+ ˆy(t))/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
dc+1storder ac
= (CX+ EU)/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
dc terms
+ Cˆx(t)+ Eˆu(t)+{(C1−C2)X+ (E1−E2)U} ˆd(t)/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
ﬁrst-order ac terms
+ (C1−C2)ˆx(t) ˆd(t)+ (E1−E2)ˆu(t) ˆd(t)/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
second-order nonlinear terms
Since the dc terms satisfy Eq. ( 7.124), they drop out of Eq. ( 7.128). Also, if the small-signal
assumption (7.126) is satisﬁed, then the second-order nonlinear terms of Eq. ( 7.128) are small
in magnitude compared to the ﬁrst-order ac terms. We can therefore neglect the nonlinear terms,
to obtain the following linearized ac model:
Kdˆx(t)
dt = Aˆx(t)+ Bˆu(t)+{(A1−A2)X+ (B1−B2)U} ˆd(t) (7.129)
ˆy(t)= Cˆx(t)+ Eˆu(t)+{(C1−C2)X+ (E1−E2)U} ˆd(t)
This is the desired result, which coincides with Eq. (7.109).
7.5.4 Example: State-Space Averaging of a Nonideal Buck-Boost Converter
Let us apply the state-space averaging method to model the buck–boost converter of Fig. 7.42.
We will model the conduction loss of MOSFET Q1 by on-resistance Ron, and the forward volt-
age drop of diode D1 by an independent voltage source of value VD. It is desired to obtain a
complete equivalent circuit, which models both the input port and the output port of the con-
verter.
The independent states of the converter are the inductor currenti(t) and the capacitor voltage
v(t). Therefore, we should deﬁne the state vector x(t)a s
x(t)=
[i(t)
v(t)
]
(7.130)

260 7 AC Equivalent Circuit Modeling
+ LC R
+
v(t)vg(t)
Q1 D1
i(t)
ig(t)
Fig. 7.42 Buck–boost converter example
The input voltage vg(t) is an independent source which should be placed in the input vector
u(t). In addition, we have chosen to model the diode forward voltage drop with an independent
voltage source of value VD. So this voltage source should also be included in the input vector
u(t). Therefore, let us deﬁne the input vector as
u(t)=
[vg(t)
VD
]
(7.131)
To model the converter input port, we need to ﬁnd the converter input currentig(t). To calculate
this dependent current, it should be included in the output vector y(t). Therefore, let us choose
to deﬁne y(t)a s
y(t)= [ig(t)] (7.132)
Note that it is not necessary to include the output voltagev(t) in the output vector y(t), since v(t)
is already included in the state vector x(t).
Next, let us write the state equations for each subinterval. When the switch is in position
1, the converter circuit of Fig. 7.43a is obtained. The inductor voltage, capacitor current, and
converter input current are
Ldi(t)
dt = vg(t)−i(t)Ron
C dv(t)
dt =−v(t)
R
ig(t)= i(t)
(7.133)
These equations can be written in the following state-space form:
[L 0
0 C
]

d
dt
[i(t)
v(t)
]
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
=
⎡⎢⎢⎢⎢⎢⎢⎣
−Ron 0
0 −1
R
⎤⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[i(t)
v(t)
]

+
[10
00
]

[vg(t)
VD
]

K dx(t)
dt A1 x(t) B1 u(t)
[
ig(t)
]

=
[
10
]

[i(t)
v(t)
]

+
[
00
]

[vg(t)
VD
]

y(t) C1 x(t) E1 u(t)
(7.134)
So we have identiﬁed the state equation matrices A1, B1, C1, and E1.

7.5 State-Space Averaging 261
(a)
+ LC R
+
v(t)
i(t)
vg(t)
Ronig(t)
(b)
+ LC R
+
v(t)
i(t)
vg(t)
+
VD
ig(t)
Fig. 7.43 Buck–boost converter circuit: (a) during subinterval 1, (b) during subinterval 2
With the switch in position 2, the converter circuit of Fig. 7.43b is obtained. For this subin-
terval, the inductor voltage, capacitor current, and converter input current are given by
Ldi(t)
dt = v(t)−VD
C dv(t)
dt =−v(t)
R −i(t) (7.135)
ig(t)= 0
When written in state-space form, these equations become
[L 0
0 C
]

d
dt
[i(t)
v(t)
]
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
=
⎡⎢⎢⎢⎢⎢⎢⎣
01
−1−1
R
⎤⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[i(t)
v(t)
]

+
[0−1
00
]
/bracehext/bracehext
[vg(t)
VD
]

K dx(t)
dt A2 x(t) B2 u(t)
[
ig(t)
]

=
[
00
]

[i(t)
v(t)
]

+
[
00
]

[vg(t)
VD
]

y(t) C2 x(t) E2 u(t)
(7.136)
So we have also identiﬁed the subinterval 2 matrices A2, B2, C2, and E2.

262 7 AC Equivalent Circuit Modeling
The next step is to evaluate the state-space averaged equilibrium equations (7.106)t o( 7.108).
The averaged matrix A is
A= DA1+ D′A2= D
⎡⎢⎢⎢⎢⎢⎢⎣
−Ron 0
0 −1
R
⎤⎥⎥⎥⎥⎥⎥⎦+ D′
⎡⎢⎢⎢⎢⎢⎢⎣
01
−1−1
R
⎤⎥⎥⎥⎥⎥⎥⎦=
⎡⎢⎢⎢⎢⎢⎢⎣
−DRon D′
−D′ −1
R
⎤⎥⎥⎥⎥⎥⎥⎦ (7.137)
In a similar manner, the averaged matrices B, C, and E are evaluated, with the following
results:
B= DB1+ D′B2=
[D−D′
00
]
C= DC1+ D′C2=
[
D 0
]
E= DE1+ D′E2=
[
00
]
(7.138)
The dc state equations (7.106) therefore become
[0
0
]
=
⎡⎢⎢
⎢⎢⎢⎢⎣
−DR
on D′
−D′ −1
R
⎤⎥⎥
⎥⎥⎥⎥⎦
[I
V
]
+
[D−D
′
00
][Vg
VD
]
[
Ig
]
=
[
D 0
] [I
V
]
+
[
00
] [Vg
VD
] (7.139)
Evaluation of Eq. (7.109) leads to the following solution for the equilibrium state and output
vectors:
[I
V
]
=
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1
1+ D
D′2
Ron
R
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
D
D′2R
1
D′R
−D
D′ 1
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
[Vg
VD
]
[
Ig
]
=
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1
1+ D
D′2
Ron
R
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
[
D2
D′2R
1
D′R
][Vg
VD
]
(7.140)
Alternatively, the steady-state equivalent circuit of Fig.7.44 can be constructed as usual from Eq.
(7.139). The top row of Eq. (7.139) could have been obtained by application of the principle of
inductor volt-second balance to the inductor voltage waveform. The second row of Eq. ( 7.139)
could have been obtained by application of the principle of capacitor charge balance to the
capacitor current waveform. The i
g(t) equation expresses the dc component of the converter
input current. By reconstructing circuits that are equivalent to these three equations, the dc
model of Fig. 7.44 is obtained.

7.5 State-Space Averaging 263
+
+
Vg
Ig I
R
1 : D D' : 1
DRon D'VD
+
V
Fig. 7.44 Dc circuit model for the buck–boost converter model, equivalent to Eq. (7.139)
The small-signal model is found by evaluation of Eq. (7.109). The vector coeﬃcients of ˆd(t)
in Eq. (7.109)a r e
(A1−A2) X+ (B1−B2) U=
[−V−IRon
I
]
+
[Vg+ VD
0
]
=
[Vg−V−IRon+ VD
I
]
(C1−C2) X+ (E1−E2) U= [I] (7.141)
The small-signal ac state equations (7.109) therefore become
[L 0
0 C
]d
dt
[ˆi(t)
ˆv(t)
]
=
⎡⎢⎢⎢⎢⎢⎢⎣
−DRon D′
−D′ −1
R
⎤⎥⎥⎥⎥⎥⎥⎦
[ˆi(t)
ˆv(t)
]
+
[D−D′
00
][ˆvg(t)
0
]
+
[Vg−V−IRon+ VD
I
]
ˆd(t)
[ˆig(t)
]
=
[
D 0
][ˆi(t)
ˆv(t)
]
+
[
00
][ˆvg(t)
0
]
+ [I]ˆd(t)
(7.142)
Note that, since the diode forward voltage drop is modeled as the constant value VD, there
are no ac variations in this source, and ˆvD(t) equals zero. Again, a circuit model equivalent to
Eq. (7.142) can be constructed, in the usual manner. When written in scalar form, Eq. ( 7.142)
becomes
Ldˆi(t)
dt = D′ ˆv(t)−DRonˆi(t)+ Dˆvg(t)+
⎦
Vg−V−IRon+ VD
) ˆd(t)
C dˆv(t)
dt =−D′ˆi(t)−ˆv(t)
R + I ˆd(t)
ˆig(t)= Dˆi(t)+ I ˆd(t)
(7.143)
Circuits corresponding to these equations are listed in Fig.7.45. These circuits can be combined
into the complete small-signal ac equivalent circuit model of Fig.7.46.

264 7 AC Equivalent Circuit Modeling
Fig. 7.45 Circuits equivalent to the small-signal converter equations: ( a) inductor loop, ( b) capacitor
node, (c) input port
Fig. 7.46 Complete small-signal ac equivalent circuit model, nonideal buck–boost converter example
7.5.5 Example: State-Space Averaging of a Boost Converter with ESR
As a ﬁnal example, let us employ the state-space averaging method to derive the model of the
nonideal boost converter of Fig.7.47. This circuit includes a resistor RC that models the capaci-
tor equivalent series resistance; the dashed line encloses the capacitor model including an ideal
capacitor C and ESR RC. Students often experience diﬃculty in deriving the averaged equations

7.5 State-Space Averaging 265
+ Q1
L
C R
+
v(t)
D1
vg
iL(t)
RC +
vC(t)
Fig. 7.47 Boost converter circuit, including capacitor equivalent series resistance RC
v(t)
tdTs Ts0
i R||RC
Fig. 7.48 The capacitor ESR causes the output voltage waveform v(t) to become discontinuous
of this circuit, and the state-space averaging method provides a framework for correctly deriv-
ing the averaged model. With the exception of the capacitor ESR, we will model all elements
as ideal.
As illustrated in Fig. 7.48, the capacitor ESR causes the output voltagev(t) to be discontinu-
ous. When the diode conducts, the inductor current causes the output voltage to be greater by an
amount iL(t) R∥RC and so the voltage exhibits a discontinuity during the switching times. Hence,
we must be careful not to attempt to apply the small-ripple approximation to the output voltage
v(t). On the other hand, the voltage vC(t) of the ideal capacitor portion of the capacitor model is
continuous and exhibits small ripple.
The independent states of this circuit are the inductor current iL(t) and the capacitor voltage
vC(t). Note that vC(t) is deﬁned as the voltage across the ideal capacitor portion of the capacitor
model. The state vector x(t) is therefore deﬁned as
x(t)=
[iL(t)
vC(t)
]
(7.144)
The input voltage vg(t) is an independent source which should be placed in the input vectoru(t).
We have chosen to model no other independent sources. Therefore, let us deﬁne the input vector
as
u(t)=
[
vg(t)
]
(7.145)
To model the converter input port, we need to ﬁnd the converter input currentig(t). For the boost
converter, the input current ig(t) coincides with the inductor current iL(t). Since iL(t) is already
in the state vector x(t), no additional information is gained by inclusion of ig(t) in the output
vector. On the other hand, to model the output port, we must write an equation for the output
voltage v(t). Since the actual output voltage v(t) no longer coincides with the capacitor state

266 7 AC Equivalent Circuit Modeling
(a)
+vg
LiL(t)
RC
C
R
+
v(t)
+
vC(t)
+vL(t) +vL(t) 
iC(t)
(b)
+vg
LiL(t)
RC
C
R
+
v(t)
+
vC(t)
iC(t)
Fig. 7.49 Boost with ESR converter circuit: (a) during subinterval 1, (b) during subinterval 2
vC(t), we must write additional equations that can be solved for the averaged output voltage.
Therefore v(t) must be included in the output vector. Hence, let us choose to deﬁne y(t)a s
y(t)=
[
v(t)
]
(7.146)
Thus for this example, the output vector contains only the dependent quantity v(t).
Next, we will develop the state equations for each subinterval. For the ﬁrst subinterval, the
MOSFET conducts and the converter circuit reduces to that of Fig. 7.49a. We can express the
inductor voltage and capacitor current as:
LdiL(t)
dt = vg(t)
C dvC(t)
dt =−vC(t)
R+ RC
(7.147)
Note that we have been careful to express the capacitor current in terms of the capacitor voltage
vC(t), rather than the output voltage v(t). This is necessary because the state equations must
be written as functions of the elements of the independent vectors x(t) and u(t), but not the
dependent vector y(t).
For the ﬁrst subinterval, we can express the output quantity also as a function of the elements
of x(t) and u(t), as follows:
v(t)= vC(t) R
R+ RC
(7.148)
Again, we have been careful to express v(t) as a function of the capacitor state vC(t).
We can next write Eqs. (7.147) and (7.148) in matrix form. The result is
[L 0
0 C
]

d
dt
[iL(t)
vC(t)
]
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
=
⎡⎢⎢⎢⎢⎢⎢⎢⎣
00
0 −1
R+ RC
⎤⎥⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[iL(t)
vC(t)
]
/bracehext/bracehext
+
[1
0
]

[
vg(t)
]

K dx(t)
dt A1 x(t) B1 u(t)
[
v(t)
]

=
[
0 R
R+ RC
]
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[iL(t)
vC(t)
]
/bracehext/bracehext
+
[
0
]

[
vg(t)
]

y(t) C1 x(t) E1 u(t)
(7.149)

7.5 State-Space Averaging 267
For the second subinterval, the MOSFET is o ﬀand the diode conducts. The circuit of
Fig. 7.49b is obtained. We can express the inductor voltage and capacitor current as:
LdiL(t)
dt = vg(t)−v(t)= vg(t)−vC(t) R
R+ RC
−iL(t) R∥RC
C dvC(t)
dt = v(t)−vC(t)
RC
=−vC(t)
R+ RC
+ iL(t) R
R+ RC
(7.150)
In the above equations, it was necessary to eliminate the output voltage v(t), again because the
state equations must be written as functions of the elements of the independent vectors x(t) and
u(t), but not the dependent vector y(t). The notation R∥RC denotes the parallel combination of
R and RC.
For this subinterval, we can express the output also as a function of the elements ofx(t) and
u(t), as follows:
v(t)= vC(t) R
R+ RC
+ iL(t) R∥RC (7.151)
Again, we have been careful to express v(t) as a function of the capacitor state vC(t). We can
now assemble the above equations to obtain the state-space description of the circuit during the
second subinterval:
[L 0
0 C
]

d
dt
[iL(t)
vC(t)
]
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
−R∥RC −R
R+ RC
R
R+ RC
−1
R+ RC
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[iL(t)
vC(t)
]
/bracehext/bracehext
+
[1
0
]

[
vg(t)
]

K dx(t)
dt A2 x(t) B2 u(t)
[
v(t)
]

=
[
R∥RC
R
R+ RC
]
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[iL(t)
vC(t)
]
/bracehext/bracehext
+
[
0
]

[
vg(t)
]

y(t) C2 x(t) E2 u(t)
(7.152)
The state-space averaging method predicts that the converter steady-state model is
[0
0
]

=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
−D′(R∥RC) −D′ R
R+ RC
D′ R
R+ RC
−1
R+ RC
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[IL
VC
]

+
[1
0
]

[
Vg
]

0 DA1+ D′A2 X DB1+ D′B2 U
[
V
]

=
[
D′(R∥RC) R
R+ RC
]
/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext
[IL
VC
]

+
[
0
]

[
Vg
]

Y DC1+ D′C2 X DE1+ D′E2 U
(7.153)

268 7 AC Equivalent Circuit Modeling
(a)
+Vg
+D′V
DD′(R||RC)
IL
(b)
D′IL R
+
V
(c)
R
RC
VC +
V DIL
+
Fig. 7.50 Steps in the construction of the steady-state equivalent circuit for the boost converter with
capacitor equivalent series resistance: ( a) inductor loop, ( b) output node, ( c) connection of capacitor to
output node
Let us construct a steady-state equivalent circuit corresponding to the above equations. The
output terminal of our converter is the output voltage V, rather than the capacitor voltage VC.
Therefore, it is helpful to ﬁrst express the above equations in terms of the output voltage V,b y
using the output equation to eliminate VC. This leads to the following equations:
0= Vg−D′V−DD′IL (R∥RC) (7.154a)
0= D′IL−V
R (7.154b)
V= VC
R
R+ RC
+ D′IL (R∥RC) (7.154c)
Equation (7.154a) can be recognized as a voltage loop equation, resulting from volt-second bal-
ance on the inductor. The current of this loop is the dc inductor current IL. Construction of an
equivalent circuit corresponding to this equation leads to the network of Fig. 7.50a. Likewise,
Eq. (7.154b) is the equation of the output node, having voltage V. A corresponding equivalent
circuit for this equation is shown in Fig. 7.50b. Equation (7.154c) describes how the capacitor
C and its voltage VC is connected to the output node. We might expect that the ideal capacitor
element C is connected through the ESR RC to the output node, as it is in the original converter
circuit of Fig. 7.47. Indeed this is the case: Fig. 7.50c is a circuit corresponding to Eq. (7.154c),
with the capacitor voltage VC connected to the output node voltage V through resistor RC.R e -
sistors R and RC constitute a voltage divider having the divider ratio R/(R+ RC)s h o w ni n
Eq. (7.154c). The second term in the equation accounts for how the current D′IL increases the
output voltage, through the Thevenin-equivalent output resistance of the voltage divider,R∥RC.
The circuits of Fig. 7.50 can be combined into the complete steady-state equivalent circuit
illustrated in Fig. 7.51. It can be observed that the steady-state voltages V and VC are equal.
Additionally, the capacitor ESR leads to an additional eﬀective series resistor DD′(R∥RC). This
resistor models the loss induced in the ESR by the ac capacitor current, and its e ﬀect on the
converter eﬃciency.

7.5 State-Space Averaging 269
+Vg R
D : 1DD (R||RC)
RC
+
V+
VC
IL
Fig. 7.51 Steady-state model of the boost converter, including eﬀects of capacitor equivalent series resis-
tance RC
The small-signal ac state-space averaged model is found by evaluation of Eq. ( 7.110). The
result is
[L 0
0 C
]d
dt
[ˆiL(t)
ˆvC(t)
]
=
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
−D′(R∥RC) −D′ R
R+ RC
D′ R
R+ RC
−1
R+ RC
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
[ˆiL(t)
ˆvC(t)
]
+
[1
0
][
ˆvg(t)
]
(7.155)
+
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣
IL R∥RC+ VC
R
R+ RC
−IL
R
R+ RC
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦
ˆd(t) (7.156)
[
ˆv(t)
]
=
[
D′(R∥RC) R
R+ RC
][ˆiL(t)
ˆvC(t)
]
+
[
−IL R∥RC
]ˆd(t) (7.157)
To construct a small-signal ac circuit model, it is helpful to again express the equations in terms
of the converter output voltage ˆv rather than the capacitor voltage ˆvC. This is accomplished by
using the output equation to eliminate ˆvC from the right side of the state equations. After some
algebra, we obtain
L dˆiL
dt = ˆvg−D′ ˆv−DD′(R∥RC)ˆiL+ ((D−D′)(R∥RC)IL+ V) ˆd (7.158a)
C dˆvC
dt = D′ˆiL−ˆv
R−IL ˆd (7.158b)
ˆv= ˆvC
R
R+ RC
+ (D′ˆiL−IL ˆd)(R∥RC) (7.158c)
Equation (7.158a) can be recognized as a voltage loop equation, describing the small-signal ac
components of the voltage around a loop containing the inductor. The current of this loop is
the ac inductor current ˆi
L. Construction of an equivalent circuit corresponding to this equation

270 7 AC Equivalent Circuit Modeling
Fig. 7.52 Steps in the construction of the small-signal ac equivalent circuit for the boost converter with
capacitor equivalent series resistance: ( a) inductor loop, ( b) output node, ( c) connection of capacitor to
output node, (d) composite circuit, output node and capacitor
Fig. 7.53 Complete small-signal ac model of the boost converter, including eﬀects of capacitor equivalent
series resistance RC
leads to the network of Fig. 7.52a. Likewise, Eq. (7.158b) is the equation of the output node,
having voltage ˆv. A corresponding equivalent circuit for this equation is shown in Fig. 7.52b.
Although the capacitor current Cd ˆvC/dt ﬂows out of this node, Eq. (7.158b) does not describe
whether the capacitor is connected through the capacitor ESR, and so at this point we will leave
the capacitor branch as an unknown element.
Equation (7.158c) describes how the capacitor C and its voltage ˆvC are connected to the
output node. As in the steady-state model, we expect that the ideal capacitor element C is con-
nected through the ESR RC to the output node. Again, this is the case: Fig. 7.52c is a circuit
corresponding to Eq. (7.158c), with the capacitor voltage ˆvC connected to the output node volt-
age ˆv through resistor RC. Resistors R and RC again constitute a voltage divider having the

7.6 Summary of Key Points 271
divider ratio R/(R+ RC)s h o w ni nE q . (7.158c). The second term in the equation accounts for
how the total current ( D′ˆiL+ IL ˆd) (from the transformer secondary plus the ˆd current source)
increases the output voltage, through the Thevenin-equivalent output resistance of the voltage
divider, R∥RC. The circuits of Fig.7.52b and c can be combined into the single circuit illustrated
in Fig. 7.52d.
The circuits of Fig. 7.52a,d now can be combined, and the dependent sources replaced by
an eﬀective transformer as illustrated in Fig. 7.53. In this small-signal ac model, the voltages ˆv
and ˆvC can diﬀer, and the capacitor ESR leads to new transfer function dynamics not present in
the converter without ESR.
7.6 Summary of Key Points
1. The CCM converter analytical techniques of Chaps. 2 and 3 can be extended to predict con-
verter ac behavior. The key step is to average the converter waveforms over one switching
period. This removes the switching harmonics, thereby exposing directly the desired dc and
low-frequency ac components of the waveforms. In particular, expressions for the averaged
inductor voltages, capacitor currents, and converter input current are usually found.
2. Since switching converters are nonlinear systems, it is desirable to construct small-signal
linearized models. This is accomplished by perturbing and linearizing the averaged model
about a quiescent operating point.
3. Ac equivalent circuits can be constructed, in the same manner used in Chap. 3 to construct
dc equivalent circuits. If desired, the ac equivalent circuits may be reﬁned to account for
the eﬀects of converter losses and other nonidealities.
4. The conventional pulse-width modulator circuit has linear gain, dependent on the slope of
the sawtooth waveform, or equivalently on its peak-to-peak magnitude. The pulse-width
modulator also introduces sampling to the system.
5. The canonical circuit describes the basic properties shared by all dc–dc PWM converters
operating in the continuous conduction mode. At the heart of the model is the ideal 1:M(D)
transformer, introduced in Chap. 3 to represent the basic dc–dc conversion function, and
generalized here to include ac variations. The converter reactive elements introduce an ef-
fective low-pass ﬁlter into the network. The model also includes independent sources that
represent the eﬀect of duty-cycle variations. The parameter values in the canonical models
of several basic converters are tabulated for easy reference.
6. The state-space averaging method of Sect. 7.5 is essentially the same as the basic approach
of Sect. 7.2, except that the formality of the state-space network description is used. The
general results are listed in Sect. 7.5.2. State-space averaging is a formal approach that
shows how a small-signal averaged model can always be derived, provided that the state
equations can be written for each subinterval.

272 7 AC Equivalent Circuit Modeling
Problems
7.1 An ideal boost converter operates in the continuous conduction mode.
(a) Determine the nonlinear averaged equations of this converter.
(b) Now construct a small-signal ac model. Let
⟨vg(t)⟩Ts = Vg+ ˆvg(t)
d(t)= D+ ˆd(t)
⟨i(t)⟩Ts = I+ ˆi(t)
⟨v(t)⟩Ts = V+ ˆv(t)
where Vg, D, I, and V are steady-state dc values; ˆvg(t) and ˆd(t) are small ac variations
in the power and control inputs; andˆi(t) and ˆv(t) are the resulting small ac variations in
the inductor current and output voltage, respectively. Show that the following model
results:
Large-signal dc components
0=−D
′V+ Vg
0= D′I−V
R
Small-signal ac components
Ldˆi(t)
dt =−D′ ˆv(t)+ V ˆd(t)+ ˆvg(t)
C dˆv(t)
dt = D′ˆi(t)−I ˆd(t)−ˆv(t)
R
7.2 Construct an equivalent circuit that corresponds to the boost converter small-signal ac
equations derived in Problem 7.1(b).
7.3 Manipulate your boost converter equivalent circuit of Problem 7.2 into canonical form.
Explain each step in your derivation. Verify that the elements in your canonical model
agree with Table7.1.
7.4 The ideal current-fed bridge converter of Fig. 2.32 operates in the continuous conduction
mode.
(a) Determine the nonlinear averaged equations of this converter.
(b) Perturb and linearize, to determine the small-signal ac equations.
(c) Construct a small-signal ac equivalent circuit model for this converter.
7.5 Construct a complete small-signal ac equivalent circuit model for the ﬂyback converter
shown in Fig. 7.19, operating in continuous conduction mode. The transformer contains
magnetizing inductance L, referred to the primary. In addition, the transformer exhibits
signiﬁcant core loss, which can be modeled by a resistor RC in parallel with the primary
winding. All other elements are ideal. You may use any valid method to solve this problem.
Your model should correctly predict variations inig(t).
7.6 Modeling the ´Cuk converter. You may use any valid method to solve this problem.
(a) Derive the small-signal dynamic equations that model the ideal ´Cuk converter.
(b) Construct a complete small-signal equivalent circuit model for the ´Cuk converter.

7.6 Summary of Key Points 273
+vg(t)
+
v(t)RL1
L2
C1
C2
ig(t)
Fig. 7.54 Inverse-SEPIC, Problem 7.7
7.7 Modeling the inverse-SEPIC. You may use any valid method to solve this problem.
(a) Derive the small-signal dynamic equations that model the converter shown in Fig.7.54.
(b) Construct a complete small-signal equivalent circuit model for the inverse-SEPIC.
7.8 Consider the nonideal buck converter of Fig.7.55. The input voltage sourcevg(t) has inter-
nal resistance Rg. Other component nonidealities may be neglected.
+
L
CR
+
v(t)vg(t)
Rg
ig(t)
Fig. 7.55 Nonideal buck converter, Problem 7.8
(a) Using the state-space averaging method, determine the small-signal ac equations that
describe variations in i, v, and ig, which occur owing to variations in the transistor
duty cycle d and input voltage vg.
(b) Construct an ac equivalent circuit model corresponding to your equations of part (a).
(c) Solve your model to determine an expression for the small-signal control-to-output
transfer function.
7.9 Starting with Eq. (7.19), derive Eqs. (7.20) and (7.22). Show all steps in your derivation.
7.10 A ﬂyback converter operates in the continuous conduction mode. The MOSFET switch
has on-resistance Ron, and the secondary-side diode has a constant forward voltage drop
VD. The ﬂyback transformer has primary winding resistance Rp and secondary winding
resistance Rs.
(a) Derive the small-signal ac equations for this converter.
(b) Derive a complete small-signal ac equivalent circuit model, which is valid in the con-
tinuous conduction mode and which correctly models the above losses, as well as the
converter input and output ports.
7.11 The two-output ﬂyback converter of Fig. 7.56a operates in the continuous conduction
mode. It may be assumed that the converter is lossless.

274 7 AC Equivalent Circuit Modeling
Fig. 7.56 Two-output ﬂyback converter, Problem 7.11:( a) converter circuit, (b) small-signal ac equiva-
lent circuit
(a) Derive a small-signal ac equivalent circuit for this converter.
(b) Show that the small-signal ac equivalent circuit for this two-output converter can be
written in the generalized canonical form of Fig. 7.56b. Give analytical expressions
for the generators e(s) and j(s).
7.12 A pulse-width modulator circuit is constructed in which the sawtooth-wave generator is
replaced by a triangle-wave generator, as illustrated in Fig. 7.57a. The triangle waveform
is illustrated in Fig. 7.57b.
(a) Determine the converter switching frequency, in Hz.
(b) Determine the gain d(t)/vc(t) for this circuit.
(c) Over what range of vc is your answer to (b) valid?
```
