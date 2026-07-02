---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: Preface
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 6-18 > Chunk ID: `preface`"
---

# Preface

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 6-18  
> Chunk ID: `preface`

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
Preface
The objective of the First and Second Editions was to serve as a textbook for introductory power
electronics courses where the fundamentals of power electronics are deﬁned, rigorously pre-
sented, and treated in suﬃcient depth so that students acquire the knowledge and skills needed
to design practical power electronic systems. An additional goal was to contribute as a reference
book for engineers who practice power electronics design, and for students who want to develop
their knowledge of the area beyond the level of introductory courses. In this Third Edition, the
basic objectives and philosophy of the earlier editions have not been changed.
Since we wrote the Second Edition, the ﬁeld of power electronics has grown tremen-
dously, including new signiﬁcant commercial applications such as electric vehicles, wireless
power transfer, and utility microgrids. Technical growth includes the commercialization of wide
bandgap power semiconductors, widespread digital control of switching converters, and matu-
ration of converter modeling. Our university power electronics curriculum has evolved as well,
in content as well as in organization. This edition is a response to these changes, and represents
a signiﬁcant revision relative to the previous edition.
As of 2020, at the University of Colorado we oﬀer a sequence of three core graduate courses
in power electronics. The ﬁrst course,Introduction to Power Electronics, covers basic converter
analysis, converter controllers, and magnetics. In the Third Edition, this material is presented in
Chaps. 1–12, at the level and in the order covered in this class. Our second course,Modeling and
Control of Power Electronics Systems, covers more advanced topics of power converter applica-
tions, control, and design-oriented analysis. This material is covered in detail in Chaps. 13–21
in the Third Edition; this portion of the text represents a major revision of technical material
and coverage. Our third course, Resonant and Soft Switching Phenomena in Power Electronics,
relies primarily on supplementary notes rather than this textbook. Chapters 22 and 23 of the
Third Edition cover a summary of a portion of this third course.
The coverage of power semiconductor devices in Chap. 4 has been bolstered and updated.
The discussion of power diode switching has been signiﬁcantly expanded, leading into aver-
aged modeling of diode-induced switching loss. New material on wide bandgap devices and on
MOSFET gate drivers has been added. The discussion of switching loss mechanisms has been
updated and reorganized, and the MCT section is removed.
The Third Edition adopts a more mature viewpoint of averaging, based on the trapezoidal
moving average deﬁned in Eq. ( 7.3). The waveforms of the averaged model become true con-
tinuous quantities, with the approximations and logical steps clearly deﬁned. New material in
vii

viii Preface
Chap. 7 includes a section on the averaging operator, and a new treatment of how the small-
ripple approximation works with the trapezoidal moving average. Additionally, the logical ﬂow
of Chap. 7 has been signiﬁcantly revised to conform to how we now teach this material in our
on-campus courses, and new material on state-space averaging has been added. This new view-
point of averaging then is followed throughout the remainder of the book. Of most note, this
viewpoint leads to the current-programmed control model of Tan and Middlebrook. The current-
programmed control Chap. 18 has been signiﬁcantly revised and updated accordingly. The high-
frequency eﬀects of sampling are discussed as well, in connection with current-programmed
control and also with ac modeling of the discontinuous conduction mode.
The previous treatment of stability and phase margin would leave some students with mis-
conceptions; to alleviate this, we have introduced a new section on Nyquist stability. Instructors
may choose whether there is time to cover this material in a power electronics course, but the
explanation is available as a reference in the text. The origin of the phase margin text is rigor-
ously explained, and special cases such as conditionally stable systems or those with multiple
crossover frequencies are adjudicated. A new section in the chapter on input ﬁlters has been
added, which relies on the Nyquist stability criterion to determine the exact stability boundary
in the presence of an input ﬁlter.
An all-new Part IV Advanced Modeling, Analysis, and Control Techniques has been orga-
nized to follow the logical ﬂow of our advanced converter control course, and incorporates new
chapters on null double injection techniques (Middlebrook’s feedback theorem and extra ele-
ment theorem) and on digital control of switching converters. The topics of circuit averaging,
average switch modeling, and averaged simulation are consolidated into a single logical chap-
ter. New examples of the extra element theorem include solution of the SEPIC averaged switch
model, and damping the internal resonances of the SEPIC.
Chapter 18 on current-programmed control has been signiﬁcantly revised and reorganized.
As noted above, it now employs the model of Tan and Middlebrook, using the trapezoidal mov-
ing average. New sections on simulation, sampling and high-frequency dynamics, and input
ﬁlters are incorporated into the chapter. A new section on average current-mode control has
also been added.
The new Chap. 19 on digital control of switching converters extends the analog control
techniques of earlier chapters, to address the relevant issues of digital controllers. Quantiza-
tion, sampling, and controller delays are modeled. The Z-transform is employed to model the
discrete-time portion of the feedback loop, with the Laplace transform used as usual for the
remaining analog system. Digital compensator design and realization is then addressed.
This text has evolved from courses developed over thirty-ﬁve years of teaching power elec-
tronics at the University of Colorado. These courses, in turn, were heavily inﬂuenced by our
previous experiences as graduate students at the California Institute of Technology, under the
direction of Profs. Slobodan ´Cuk and R. D. Middlebrook, to whom we are grateful. We would
also like to thank the many readers of the First and Second Editions, students, and instructors
who oﬀered their comments and suggestions, or who pointed out errata. We have attempted to
incorporate these suggestions wherever possible.
Boulder, CO, USA Robert W. Erickson
Boulder, CO, USA Dragan Maksimovi ´c

Contents
1 Introduction ............................................................ 1
1.1 Introduction to Power Processing ...................................... 1
1.2 Several Applications of Power Electronics ............................... 8
1.3 Elements of Power Electronics ........................................ 1 0
Part I Converters in Equilibrium
2 Principles of Steady-State Converter Analysis .............................. 1 5
2.1 Introduction ........................................................ 1 5
2.2 V olt-Second and Charge Balance, Small-Ripple Approximation ............. 1 8
2.3 Boost Converter Example ............................................. 2 4
2.4 ´Cuk Converter Example .............................................. 3 0
2.5 Estimating the Output V oltage Ripple in Converters Containing Two-Pole
Low-Pass Filters .................................................... 3 5
2.6 Summary of Key Points .............................................. 3 7
Problems ............................................................... 3 8
3 Steady-State Equivalent Circuit Modeling, Losses, and E ﬃciency ............. 4 3
3.1 The DC Transformer Model ........................................... 4 3
3.2 Inclusion of Inductor Copper Loss ..................................... 4 6
3.3 Construction of Equivalent Circuit Model ............................... 4 9
3.3.1 Inductor V oltage Equation ...................................... 5 0
3.3.2 Capacitor Current Equation ..................................... 5 0
3.3.3 Complete Circuit Model ....................................... 5 1
3.3.4 E ﬃciency.................................................... 5 2
3.4 How to Obtain the Input Port of the Model .............................. 5 4
3.5 Example: Inclusion of Semiconductor Conduction Losses in the Boost
Converter Model .................................................... 5 6
3.6 Summary of Key Points .............................................. 6 0
Problems ............................................................... 6 1
ix

x Contents
4 Switch Realization ...................................................... 6 7
4.1 Switch Applications ................................................. 6 9
4.1.1 Single-Quadrant Switches ...................................... 6 9
4.1.2 Current-Bidirectional Two-Quadrant Switches ..................... 7 2
4.1.3 V oltage-Bidirectional Two-Quadrant Switches ..................... 7 5
4.1.4 Four-Quadrant Switches ....................................... 7 6
4.1.5 Synchronous Rectiﬁers ........................................ 7 8
4.2 Introduction to Power Semiconductors .................................. 7 9
4.2.1 Breakdown V oltage, Forward V oltage, and Switching Speed ......... 7 9
4.2.2 Transistor Switching Loss with Clamped Inductive Load ............ 8 0
4.3 The Power Diode .................................................... 8 2
4.3.1 Introduction to Power Diodes ................................... 8 2
4.3.2 Discussion: Power Diodes ...................................... 8 7
4.3.3 Modeling Diode-Induced Switching Loss ......................... 9 0
4.3.4 Boost Converter Example ...................................... 9 4
4.4 Metal-Oxide-Semiconductor Field-E ﬀect Transistor (MOSFET) ............ 9 9
4.4.1 Introduction to the Power MOSFET .............................. 9 9
4.4.2 Wide-Bandgap FETs .......................................... 1 0 3
4.4.3 MOSFET Gate Drivers ........................................ 1 0 7
4.5 Minority-Carrier Transistors .......................................... 1 1 1
4.5.1 Bipolar Junction Transistor (BJT) ............................... 1 1 1
4.5.2 Insulated-Gate Bipolar Transistor (IGBT) ......................... 1 1 5
4.5.3 Thyristors (SCR, GTO) ........................................ 1 1 9
4.6 Additional Sources of Switching Loss .................................. 1 2 2
4.6.1 Device Capacitances, and Leakage, Package, and Stray Inductances . . . 122
4.6.2 Inducing Switching Loss in Other Elements ....................... 1 2 4
4.6.3 E ﬃciency vs. Switching Frequency .............................. 1 2 6
4.7 Summary of Key Points .............................................. 1 2 6
Problems ............................................................... 1 2 8
5 The Discontinuous Conduction Mode ...................................... 1 3 5
5.1 Origin of the Discontinuous Conduction Mode, and Mode Boundary ........ 1 3 5
5.2 Analysis of the Conversion Ratio M(D, K) .............................. 1 4 0
5.3 Boost Converter Example ............................................. 1 4 5
5.4 Summary of Results and Key Points .................................... 1 5 2
Problems ............................................................... 1 5 4
6 Converter Circuits ...................................................... 1 6 3
6.1 Circuit Manipulations ................................................ 1 6 4
6.1.1 Inversion of Source and Load ................................... 1 6 4
6.1.2 Cascade Connection of Converters ............................... 1 6 6
6.1.3 Rotation of Three-Terminal Cell ................................. 1 6 9
6.1.4 Di ﬀerential Connection of the Load .............................. 1 7 0
6.2 A Short List of Converters ............................................ 1 7 4
6.3 Transformer Isolation ................................................ 1 7 8
6.3.1 Full-Bridge and Half-Bridge Isolated Buck Converters .............. 1 8 1
6.3.2 Forward Converter ............................................ 1 8 7

Contents xi
6.3.3 Push-Pull Isolated Buck Converter ............................... 1 9 2
6.3.4 Flyback Converter ............................................ 1 9 4
6.3.5 Boost-Derived Isolated Converters ............................... 1 9 8
6.3.6 Isolated Versions of the SEPIC and the ´Cuk Converter .............. 2 0 1
6.4 Summary of Key Points .............................................. 2 0 3
Problems ............................................................... 2 0 5
Part II Converter Dynamics and Control
7 AC Equivalent Circuit Modeling .......................................... 2 1 5
7.1 Introduction ........................................................ 2 1 5
7.2 The Basic AC Modeling Approach ..................................... 2 2 0
7.2.1 Averaging the Inductor and Capacitor Waveforms .................. 2 2 1
7.2.2 The Average Inductor V oltage and the Small-Ripple Approximation . . . 222
7.2.3 Discussion of the Averaging Approximation ....................... 2 2 3
7.2.4 Averaging the Capacitor Waveforms ............................. 2 2 5
7.2.5 The Average Input Current ..................................... 2 2 6
7.2.6 Perturbation and Linearization .................................. 2 2 7
7.2.7 Construction of the Small-Signal Equivalent Circuit Model .......... 2 3 0
7.2.8 Discussion of the Perturbation and Linearization Step ............... 2 3 2
7.2.9 Results for Several Basic Converters ............................. 2 3 3
7.2.10 Example: A Nonideal Flyback Converter ......................... 2 3 4
7.3 Modeling the Pulse-Width Modulator ................................... 2 4 2
7.4 The Canonical Circuit Model .......................................... 2 4 5
7.4.1 Development of the Canonical Circuit Model ...................... 2 4 5
7.4.2 Example: Manipulation of the Buck–Boost Converter Model into
Canonical Form .............................................. 2 4 8
7.4.3 Canonical Circuit Parameter Values for Some Common Converters ... 2 5 0
7.5 State-Space Averaging ............................................... 2 5 1
7.5.1 The State Equations of a Network ............................... 2 5 2
7.5.2 The Basic State-Space Averaged Model .......................... 2 5 5
7.5.3 Discussion of the State-Space Averaging Result .................... 2 5 6
7.5.4 Example: State-Space Averaging of a Nonideal Buck–Boost Converter 259
7.5.5 Example: State-Space Averaging of a Boost Converter with ESR ..... 2 6 4
7.6 Summary of Key Points .............................................. 2 7 1
Problems ............................................................... 2 7 2
8 Converter Transfer Functions ............................................ 2 7 7
8.1 Review of Bode Plots ................................................ 2 7 9
8.1.1 Single-Pole Response .......................................... 2 8 1
8.1.2 Single Zero Response ......................................... 2 8 7
8.1.3 Right Half-Plane Zero ......................................... 2 8 8
8.1.4 Frequency Inversion ........................................... 2 8 9
8.1.5 Combinations ................................................ 2 9 0
8.1.6 Quadratic Pole Response: Resonance ............................ 2 9 4
8.1.7 The Low- Q Approximation ..................................... 2 9 8

xii Contents
8.1.8 The High- Q Approximation .................................... 3 0 1
8.1.9 Approximate Roots of an Arbitrary-Degree Polynomial ............. 3 0 4
8.2 Analysis of Converter Transfer Functions ............................... 3 0 9
8.2.1 Example: Transfer Functions of the Buck–Boost Converter .......... 3 0 9
8.2.2 Transfer Functions of Some Basic CCM Converters ................ 3 1 5
8.2.3 Physical Origins of the RHP Zero in Converters .................... 3 1 6
8.3 Graphical Construction of Impedances and Transfer Functions .............. 3 1 7
8.3.1 Series Impedances: Addition of Asymptotes ....................... 3 1 8
8.3.2 Series Resonant Circuit Example ................................ 3 2 0
8.3.3 Parallel Impedances: Inverse Addition of Asymptotes ............... 3 2 2
8.3.4 Parallel Resonant Circuit Example ............................... 3 2 3
8.3.5 V oltage Divider Transfer Functions: Division of Asymptotes ......... 3 2 5
8.4 Graphical Construction of Converter Transfer Functions ................... 3 2 7
8.5 Measurement of AC Transfer Functions and Impedances ................... 3 3 2
8.6 Summary of Key Points .............................................. 3 3 6
Problems ............................................................... 3 3 7
9 Controller Design ....................................................... 3 4 7
9.1 Introduction ........................................................ 3 4 7
9.2 E ﬀect of Negative Feedback on the Network Transfer Functions ............ 3 5 0
9.2.1 Feedback Reduces the Transfer Functions from Disturbances to the
Output ...................................................... 3 5 1
9.2.2 Feedback Causes the Transfer Function from the Reference Input
to the Output to Be Insensitive to Variations in the Gains in the
Forward Path of the Loop ...................................... 3 5 3
9.3 Construction of 1 /(1+ T) and T/(1+ T) ................................ 3 5 3
9.4 Stability ........................................................... 3 5 8
9.4.1 The Phase Margin Test ......................................... 3 5 9
9.4.2 The Nyquist Stability Criterion .................................. 3 6 0
9.4.3 The Relationship Between Phase Margin and Closed-Loop Damping
Factor ....................................................... 3 7 0
9.4.4 Transient Response vs. Damping Factor .......................... 3 7 3
9.4.5 Load Step Response vs. Damping Factor ......................... 3 7 5
9.5 Regulator Design .................................................... 3 7 6
9.5.1 Lead ( PD) compensator ........................................ 3 7 7
9.5.2 Lag ( PI) Compensator ......................................... 3 8 0
9.5.3 Combined ( PID) Compensator .................................. 3 8 2
9.5.4 Design Example .............................................. 3 8 3
9.6 Measurement of Loop Gains .......................................... 3 9 2
9.6.1 V oltage Injection .............................................. 3 9 4
9.6.2 Current Injection .............................................. 3 9 6
9.6.3 Measurement of Unstable Systems ............................... 3 9 7
9.7 Summary of Key Points .............................................. 3 9 8
Problems ............................................................... 3 9 9

Contents xiii
Part III Magnetics
10 Basic Magnetics Theory .................................................. 4 0 9
10.1 Review of Basic Magnetics ........................................... 4 0 9
10.1.1 Basic Relationships ........................................... 4 0 9
10.1.2 Magnetic Circuits ............................................. 4 1 5
10.2 Transformer Modeling ............................................... 4 1 8
10.2.1 The Ideal Transformer ......................................... 4 1 9
10.2.2 The Magnetizing Inductance .................................... 4 2 0
10.2.3 Leakage Inductances .......................................... 4 2 1
10.3 Loss Mechanisms in Magnetic Devices ................................. 4 2 3
10.3.1 Core Loss ................................................... 4 2 3
10.3.2 Low-Frequency Copper Loss ................................... 4 2 6
10.4 Eddy Currents in Winding Conductors .................................. 4 2 6
10.4.1 Introduction to the Skin and Proximity Eﬀects ..................... 4 2 6
10.4.2 Leakage Flux in Windings ...................................... 4 3 1
10.4.3 Foil Windings and Layers ...................................... 4 3 2
10.4.4 Power Loss in a Layer ......................................... 4 3 4
10.4.5 Example: Power Loss in a Transformer Winding ................... 4 3 6
10.4.6 Interleaving the Windings ...................................... 4 3 8
10.4.7 PWM Waveform Harmonics .................................... 4 4 1
10.5 Several Types of Magnetic Devices, Their B–H Loops, and Core vs. Copper
Loss .............................................................. 4 4 4
10.5.1 Filter Inductor ................................................ 4 4 4
10.5.2 AC Inductor ................................................. 4 4 6
10.5.3 Transformer .................................................. 4 4 7
10.5.4 Coupled Inductor ............................................. 4 4 8
10.5.5 Flyback Transformer .......................................... 4 4 9
10.6 Summary of Key Points .............................................. 4 5 0
Problems ............................................................... 4 5 1
11 Inductor Design ......................................................... 4 5 9
11.1 Filter Inductor Design Constraints ...................................... 4 5 9
11.1.1 Maximum Flux Density ........................................ 4 6 1
11.1.2 Inductance ................................................... 4 6 2
11.1.3 Winding Area ................................................ 4 6 2
11.1.4 Winding Resistance ........................................... 4 6 3
11.1.5 The Core Geometrical Constant Kg .............................. 4 6 3
11.2 The Kg Method: A First-Pass Design ................................... 4 6 4
11.3 Multiple-Winding Magnetics Design via the Kg Method ................... 4 6 5
11.3.1 Window Area Allocation ....................................... 4 6 5
11.3.2 Coupled Inductor Design Constraints ............................ 4 7 0
11.3.3 First-Pass Design Procedure .................................... 4 7 2
11.4 Examples .......................................................... 4 7 4
11.4.1 Coupled Inductor for a Two-Output Forward Converter ............. 4 7 4

xiv Contents
11.4.2 CCM Flyback Transformer ..................................... 4 7 6
11.5 Summary of Key Points .............................................. 4 8 1
Problems ............................................................... 4 8 2
12 Transformer Design ..................................................... 4 8 5
12.1 Transformer Design: Basic Constraints ................................. 4 8 6
12.1.1 Core Loss ................................................... 4 8 6
12.1.2 Flux Density ................................................. 4 8 6
12.1.3 Copper Loss ................................................. 4 8 7
12.1.4 Total Power Loss vs.ΔB ....................................... 4 8 8
12.1.5 Optimum Flux Density ........................................ 4 8 8
12.2 A First-Pass Transformer Design Procedure ............................. 4 9 0
12.2.1 Procedure ................................................... 4 9 0
12.3 Examples .......................................................... 4 9 2
12.3.1 Example 1: Single-Output Isolated ´Cuk Converter.................. 4 9 2
12.3.2 Example 2: Multiple-Output Full-Bridge Buck Converter ............ 4 9 6
12.4 AC Inductor Design ................................................. 4 9 9
12.4.1 Outline of Derivation .......................................... 5 0 0
12.4.2 First-Pass AC Inductor Design Procedure ......................... 5 0 1
12.5 Summary .......................................................... 5 0 2
Problems ............................................................... 5 0 2
Part IV Advanced Modeling, Analysis, and Control Techniques
13 Techniques of Design-Oriented Analysis: The Feedback Theorem ............ 5 0 9
13.1 Introduction to Part IV ............................................... 5 0 9
13.2 The Feedback Theorem .............................................. 5 1 0
13.2.1 Basic Result ................................................. 5 1 0
13.2.2 Derivation ................................................... 5 1 3
13.3 Example: Op Amp PD Compensator Circuit ............................. 5 1 9
13.4 Example: Closed-Loop Regulator ...................................... 5 2 8
13.5 Summary of Key Points .............................................. 5 4 0
Problems ............................................................... 5 4 0
14 Circuit Averaging, Averaged Switch Modeling, and Simulation ............... 5 4 7
14.1 Circuit Averaging and Averaged Switch Modeling ........................ 5 4 8
14.1.1 Obtaining a Time-Invariant Circuit ............................... 5 5 0
14.1.2 Circuit Averaging ............................................. 5 5 0
14.1.3 Perturbation and Linearization .................................. 5 5 2
14.1.4 Indirect Power ................................................ 5 5 5
14.2 Additional Conﬁgurations of Switch Networks ........................... 5 5 8
14.3 Simulation of Averaged Circuit Models ................................. 5 6 6
14.3.1 Simulation Model of the Ideal CCM Averaged Switch Network ...... 5 6 8
14.3.2 Averaged Switch Modeling and Simulation of Conduction Losses .... 5 6 9
14.3.3 Inclusion of Switch Conduction Losses in Simulations .............. 5 7 1
14.3.4 Example: SEPIC DC Conversion Ratio and Eﬃciency .............. 5 7 2

Contents xv
14.3.5 Example: Transient Response of a Buck–Boost Converter ........... 5 7 5
14.4 Summary of Key Points .............................................. 5 7 9
Problems ............................................................... 5 8 0
15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode .......... 5 8 5
15.1 Introduction to DCM Converter Dynamics ............................... 5 8 6
15.2 DCM Averaged Switch Model ......................................... 5 8 9
15.3 Small-Signal AC Modeling of the DCM Switch Network .................. 6 0 0
15.3.1 Example: Control-to-Output Frequency Response of a DCM Boost
Converter .................................................... 6 0 7
15.4 Combined CCM/DCM Averaged Switch Simulation Model ................ 6 0 8
15.4.1 Example: CCM/DCM SEPIC Frequency Responses ................ 6 1 1
15.4.2 Example: Loop Gain and Closed-Loop Responses of a Buck V oltage
Regulator .................................................... 6 1 4
15.5 High-Frequency Dynamics of Converters in DCM ........................ 6 1 8
15.6 Summary of Key Points .............................................. 6 2 2
Problems ............................................................... 6 2 2
16 Techniques of Design-Oriented Analysis: Extra Element Theorems ........... 6 2 5
16.1 Extra Element Theorem .............................................. 6 2 5
16.1.1 Basic Result ................................................. 6 2 6
16.1.2 Derivation ................................................... 6 2 8
16.1.3 Discussion ................................................... 6 3 1
16.2 EET Examples ...................................................... 6 3 2
16.2.1 A Simple Transfer Function .................................... 6 3 2
16.2.2 An Unmodeled Element ....................................... 6 3 7
16.2.3 SEPIC Example .............................................. 6 4 0
16.2.4 Damping the SEPIC Internal Resonances ......................... 6 4 4
16.3 The n-Extra Element Theorem ......................................... 6 4 8
16.3.1 Introduction to the n-EET ...................................... 6 4 9
16.3.2 Procedure for DC-Referenced Functions .......................... 6 5 3
16.4 n-EET Examples .................................................... 6 5 4
16.4.1 Two-Section L–C Filter ........................................ 6 5 4
16.4.2 Bridge-T Filter Example ....................................... 6 5 8
16.5 Frequency Inversion ................................................. 6 6 1
16.5.1 Example: Damped Input Filter .................................. 6 6 2
16.5.2 Other Special Cases ........................................... 6 6 8
Problems ............................................................... 6 6 9
17 Input Filter Design ...................................................... 6 7 5
17.1 Introduction ........................................................ 6 7 5
17.1.1 Conducted EMI .............................................. 6 7 5
17.1.2 The Input Filter Design Problem ................................ 6 7 6
17.2 Eﬀect of an Input Filter on Converter Transfer Functions .................. 6 7 9
17.2.1 Modiﬁed Transfer Functions .................................... 6 7 9
17.2.2 Discussion ................................................... 6 8 2
17.2.3 Impedance Inequalities ........................................ 6 8 4

xvi Contents
17.3 Buck Converter Example ............................................. 6 8 5
17.3.1 Eﬀect of Undamped Input Filter ................................. 6 8 6
17.3.2 Damping the Input Filter ....................................... 6 9 1
17.4 Design of a Damped Input Filter ....................................... 6 9 3
17.4.1 Rf –Cb Parallel Damping ....................................... 6 9 4
17.4.2 Rf –Lb Parallel Damping ....................................... 6 9 6
17.4.3 Rf –Lb Series Damping ......................................... 6 9 8
17.4.4 Cascading Filter Sections ...................................... 6 9 9
17.4.5 Example: Two Stage Input Filter ................................ 7 0 0
17.5 Stability Criteria .................................................... 7 0 4
17.5.1 Modiﬁed Phase Margin ........................................ 7 0 6
17.5.2 Closed-Loop Input Impedance .................................. 7 1 1
17.5.3 Discussion ................................................... 7 2 0
17.6 Summary of Key Points .............................................. 7 2 0
Problems ............................................................... 7 2 1
18 Current-Programmed Control ............................................ 7 2 5
18.1 A Simple First-Order Model .......................................... 7 2 8
18.1.1 Simple Model via Algebraic Approach: Buck–Boost Example ....... 7 2 9
18.1.2 Averaged Switch Modeling ..................................... 7 3 3
18.2 Oscillation for D> 0.5 ............................................... 7 3 8
18.3 A More Accurate Model .............................................. 7 4 6
18.3.1 Current-Programmed Controller Model ........................... 7 4 6
18.3.2 Small-Signal Averaged Model .................................. 7 4 8
18.4 Current-Programmed Transfer Functions ................................ 7 5 2
18.4.1 Discussion ................................................... 7 5 4
18.4.2 Current-Programmed Transfer Functions of the CCM Buck Converter . 755
18.4.3 Results for Basic Converters .................................... 7 5 8
18.4.4 Addition of an Input Filter to a Current-Programmed Converter ...... 7 6 0
18.5 Simulation of CPM Controlled Converters ............................... 7 6 3
18.5.1 Simulation Model for CPM Controlled Converters in CCM .......... 7 6 4
18.5.2 Combined CCM/DCM Simulation Model ......................... 7 6 5
18.5.3 Simulation Example: Frequency Responses of a Buck Converter with
Current-Programmed Control .................................. 7 6 6
18.6 V oltage Feedback Loop Around a Current-Programmed Converter .......... 7 6 9
18.6.1 System Model ................................................ 7 6 9
18.6.2 Design Example .............................................. 7 7 0
18.7 High-Frequency Dynamics of Current-Programmed Converters ............ 7 7 2
18.7.1 Sampled-Data Model .......................................... 7 7 3
18.7.2 First-Order Approximation ..................................... 7 7 6
18.7.3 Second-Order Approximation ................................... 7 7 8
18.8 Discontinuous Conduction Mode ...................................... 7 7 9
18.9 Average Current-Mode Control ........................................ 7 8 6
18.9.1 System Model and Transfer Functions ............................ 7 8 8
18.9.2 Design Example: ACM Controlled Boost Converter ................ 7 9 1
18.10 Summary of Key Points .............................................. 7 9 8
Problems ............................................................... 7 9 9

Contents xvii
19 Digital Control of Switched-Mode Power Converters ........................ 8 0 5
19.1 Digital Control Loop ................................................. 8 0 6
19.1.1 A/D and DPWM Quantization .................................. 8 0 7
19.1.2 Sampling and Delays in the Control Loop ......................... 8 1 0
19.2 Introduction to Discrete-Time Systems .................................. 8 1 2
19.2.1 Integration in Continuous Time and in Discrete Time ............... 8 1 2
19.2.2 z-Transform and Frequency Responses of Discrete-Time Systems..... 8 1 4
19.2.3 Continuous Time to Discrete Time Mapping ...................... 8 1 7
19.3 Discrete-Time Compensator Design .................................... 8 2 2
19.3.1 Design Procedure ............................................. 8 2 3
19.3.2 Design Example .............................................. 8 2 4
19.4 Digital Controller Implementation ..................................... 8 2 7
19.4.1 Discrete-Time Compensator Realization .......................... 8 2 8
19.4.2 Quantization Eﬀects, Digital Pulse-Width Modulators and A/D
Converters ................................................... 8 3 0
19.5 Summary of Key Points .............................................. 8 3 8
Problems ............................................................... 8 3 8
Part V Modern Rectiﬁers and Power System Harmonics
20 Power and Harmonics in Nonsinusoidal Systems ............................ 8 4 9
20.1 Average Power ...................................................... 8 5 0
20.2 Root-Mean-Square (RMS) Value of a Waveform ......................... 8 5 3
20.3 Power Factor ....................................................... 8 5 4
20.3.1 Linear Resistive Load, Nonsinusoidal V oltage ..................... 8 5 4
20.3.2 Nonlinear Dynamic Load, Sinusoidal V oltage ..................... 8 5 5
20.4 Power Phasors in Sinusoidal Systems ................................... 8 5 8
20.5 Harmonic Currents in Three-Phase Systems ............................. 8 5 9
20.5.1 Harmonic Currents in Three-Phase Four-Wire Networks ............ 8 5 9
20.5.2 Harmonic Currents in Three-Phase Three-Wire Networks ........... 8 6 1
20.5.3 Harmonic Current Flow in Power Factor Correction Capacitors ....... 8 6 2
Problems ............................................................... 8 6 3
21 Pulse-Width Modulated Rectiﬁers ........................................ 8 6 7
21.1 Properties of the Ideal Rectiﬁer ........................................ 8 6 8
21.2 Realization of a Near-Ideal Rectiﬁer .................................... 8 7 0
21.2.1 CCM Boost Converter ......................................... 8 7 2
21.2.2 Simulation Example: DCM Boost Rectiﬁer ....................... 8 7 6
21.2.3 DCM Flyback Converter ....................................... 8 7 8
21.3 Control of the Current Waveform ...................................... 8 8 0
21.3.1 Average Current Control ....................................... 8 8 1
21.3.2 Current-Programmed Control ................................... 8 8 6
21.3.3 Critical Conduction Mode and Hysteretic Control .................. 8 8 9
21.3.4 Nonlinear Carrier Control ...................................... 8 9 2
21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers .............. 8 9 5
21.4.1 Energy Storage ............................................... 8 9 5

xviii Contents
21.4.2 Modeling the Outer Low-Bandwidth Control System ............... 9 0 0
21.5 RMS Values of Rectiﬁer Waveforms .................................... 9 0 5
21.5.1 Boost Rectiﬁer Example ....................................... 9 0 6
21.5.2 Comparison of Single-Phase Rectiﬁer Topologies .................. 9 0 8
21.6 Modeling Losses and Eﬃciency in CCM High-Quality Rectiﬁers ........... 9 1 0
21.6.1 Expression for Controller Duty Cycle d(t) ........................ 9 1 3
21.6.2 Expression for the DC Load Current ............................. 9 1 3
21.6.3 Solution for Converter Eﬃciencyη.............................. 9 1 5
21.6.4 Design Example .............................................. 9 1 6
21.7 Ideal Three-Phase Rectiﬁers ........................................... 9 1 7
21.8 Summary of Key Points .............................................. 9 2 3
Problems ............................................................... 9 2 5
Part VI Resonant Converters
22 Resonant Conversion .................................................... 9 3 3
22.1 Sinusoidal Analysis of Resonant Converters ............................. 9 3 8
22.1.1 Controlled Switch Network Model ............................... 9 3 8
22.1.2 Modeling the Rectiﬁer and Capacitive Filter Networks .............. 9 4 0
22.1.3 Resonant Tank Network ........................................ 9 4 2
22.1.4 Solution of Converter V oltage Conversion RatioM= V/Vg .......... 9 4 3
22.2 Examples .......................................................... 9 4 4
22.2.1 Series Resonant DC–DC Converter Example ...................... 9 4 4
22.2.2 Subharmonic Modes of the Series Resonant Converter .............. 9 4 6
22.2.3 Parallel Resonant DC–DC Converter Example ..................... 9 4 7
22.3 Soft Switching ...................................................... 9 5 1
22.3.1 Operation of the Full Bridge Below Resonance: Zero-Current
Switching ................................................... 9 5 1
22.3.2 Operation of the Full-Bridge Above Resonance: Zero-V oltage
Switching ................................................... 9 5 4
22.4 Load-Dependent Properties of Resonant Converters ....................... 9 5 7
22.4.1 Inverter Output Characteristics .................................. 9 5 8
22.4.2 Dependence of Transistor Current on Load ........................ 9 6 0
22.4.3 Dependence of the ZVS/ZCS Boundary on Load Resistance ......... 9 6 5
22.4.4 Another Example ............................................. 9 6 7
22.4.5 LLC Example ................................................ 9 7 2
22.4.6 Results for Basic Tank Networks ................................ 9 7 3
22.5 Exact Characteristics of the Series and Parallel Resonant Converters ......... 9 7 6
22.5.1 Series Resonant Converter ...................................... 9 7 7
22.5.2 Parallel Resonant Converter .................................... 9 8 3
22.6 Summary of Key Points .............................................. 9 8 8
Problems ............................................................... 9 8 8

Contents xix
23 Soft Switching .......................................................... 9 9 5
23.1 Soft-Switching Mechanisms of Semiconductor Devices ................... 9 9 6
23.1.1 Diode Switching .............................................. 9 9 6
23.1.2 MOSFET Switching ........................................... 1000
23.1.3 IGBT Switching .............................................. 1003
23.2 The Zero-Current-Switching Quasi-Resonant Switch Cell .................. 1003
23.2.1 Waveforms of the Half-Wave ZCS Quasi-Resonant Switch Cell ...... 1005
23.2.2 The Average Terminal Waveforms ............................... 1009
23.2.3 The Full-Wave ZCS Quasi-Resonant Switch Cell .................. 1014
23.3 Resonant Switch Topologies .......................................... 1016
23.3.1 The Zero-V oltage-Switching Quasi-Resonant Switch ............... 1017
23.3.2 The Zero-V oltage-Switching Multiresonant Switch ................. 1019
23.3.3 Quasi-Square-Wave Resonant Switches ........................... 1020
23.4 Soft Switching in PWM Converters .................................... 1025
23.4.1 The Zero-V oltage Transition Full-Bridge Converter................. 1025
23.4.2 The Auxiliary Switch Approach ................................. 1029
23.4.3 Auxiliary Resonant Commutated Pole ............................ 1031
23.5 Summary of Key Points .............................................. 1033
Problems ............................................................... 1034
Appendices
RMS Values of Commonly Observed Converter Waveforms...................... 1037
A.1 Some Common Waveforms ........................................... 1037
A.2 General Piecewise Waveform .......................................... 1040
Magnetics Design Tables ..................................................... 1043
B.1 Pot Core Data ....................................................... 1044
B.2 EE Core Data ....................................................... 1045
B.3 EC Core Data ....................................................... 1046
B.4 ETD Core Data ..................................................... 1047
B.5 PQ Core Data ....................................................... 1048
B.6 American Wire Gauge Data ........................................... 1049
References .................................................................. 1051
Index ...................................................................... 1071
```
