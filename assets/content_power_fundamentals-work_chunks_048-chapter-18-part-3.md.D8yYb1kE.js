import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第18章part 3 - 18 Current-Programmed Control","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第18章part 3 - 18 Current-Programmed Control","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 767-786 > Chunk ID: `chapter-18-part-3`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/048-chapter-18-part-3.md","filePath":"content/power/fundamentals-work/chunks/048-chapter-18-part-3.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/048-chapter-18-part-3.md"};function i(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第18章part-3-18-current-programmed-control" tabindex="-1">第18章part 3 - 18 Current-Programmed Control <a class="header-anchor" href="#第18章part-3-18-current-programmed-control" aria-label="Permalink to &quot;第18章part 3 - 18 Current-Programmed Control&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 767-786<br> Chunk ID: <code>chapter-18-part-3</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>18.5 Simulation of CPM Controlled Converters 765</span></span>
<span class="line"><span>⟨iL⟩Ts = ic−madTs−m1+ m2</span></span>
<span class="line"><span>2 dd′Ts (18.139)</span></span>
<span class="line"><span>Next, the switch duty cycle is found by solving Eq. (18.139). There are many diﬀerent ways the</span></span>
<span class="line"><span>switch duty cycle can be expressed in terms of other quantities; although mathematically equiv-</span></span>
<span class="line"><span>alent, these diﬀerent forms of solving for d may result in diﬀerent convergence performance of</span></span>
<span class="line"><span>the numerical solver in the simulator. One approach is to express d as</span></span>
<span class="line"><span>d= ic−⟨iL(t)⟩Ts</span></span>
<span class="line"><span>m1+ m2</span></span>
<span class="line"><span>2 d′Ts+ maTs</span></span>
<span class="line"><span>(18.140)</span></span>
<span class="line"><span>Using Eqs. (18.135), (18.136), (18.137), and (18.138), Eq. (18.140) can be written in the form</span></span>
<span class="line"><span>d=</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>⟨vc(t)⟩Ts −Rf⟨iL(t)⟩Ts</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Lf s</span></span>
<span class="line"><span>⎦⟨v1(t)⟩Ts +⟨v2(t)⟩Ts</span></span>
<span class="line"><span>) d′+ 2Va</span></span>
<span class="line"><span>(18.141)</span></span>
<span class="line"><span>This implicit expression (notice thatd is on both sides of the equation) is suitable for implemen-</span></span>
<span class="line"><span>tation in a SPICE subcircuit model, which is named CPM-CCM. The numerical solver in the</span></span>
<span class="line"><span>simulator is capable of computing the switch duty cycle d based on Eq. (18.141).</span></span>
<span class="line"><span>18.5.2 Combined CCM/DCM Simulation Model</span></span>
<span class="line"><span>Typical inductor current and voltage waveforms of CPM converters operating in discontinuous</span></span>
<span class="line"><span>conduction mode are shown in Fig. 18.31. The length of the second subinterval is d2(t)Ts.I n</span></span>
<span class="line"><span>CCM, the second subinterval lasts until the end of the switching cycle,</span></span>
<span class="line"><span>d2= 1−d (18.142)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>ipk</span></span>
<span class="line"><span>vL(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>v1(t) Ts</span></span>
<span class="line"><span>v2(t) Ts</span></span>
<span class="line"><span>ic</span></span>
<span class="line"><span> ma</span></span>
<span class="line"><span> m2m1</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>dTs d2Ts</span></span>
<span class="line"><span>Fig. 18.31 Current-programmed mode waveforms in discontinuous conduction mode</span></span>
<span class="line"><span></span></span>
<span class="line"><span>766 18 Current-Programmed Control</span></span>
<span class="line"><span>In DCM, the current drops to zero before the end of the switching period. The length of the</span></span>
<span class="line"><span>second subinterval can be computed from:</span></span>
<span class="line"><span>d2= ipk</span></span>
<span class="line"><span>m2Ts</span></span>
<span class="line"><span>(18.143)</span></span>
<span class="line"><span>If the converter operates in DCM, d2 computed from Eq. (18.143)i ss m a l l e rt h a n1−d.I ft h e</span></span>
<span class="line"><span>converter operates in CCM, 1−d is smaller than d2 computed from Eq. (18.143). In general, the</span></span>
<span class="line"><span>length of the second subinterval can be found as the smaller of the two values computed using</span></span>
<span class="line"><span>Eqs. (18.142) and (18.143).</span></span>
<span class="line"><span>In the subcircuit implementation, the length of the second subinterval can therefore be com-</span></span>
<span class="line"><span>puted as the smaller of the values given by Eqs. (18.142) and (18.143):</span></span>
<span class="line"><span>d2= min</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−d, iPk</span></span>
<span class="line"><span>m2Ts</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(18.144)</span></span>
<span class="line"><span>By use of d2 from Eq. (18.144), Eq. (18.141) can be extended to allow for CCM or DCM opera-</span></span>
<span class="line"><span>tion of a current-programmed converter as follows:</span></span>
<span class="line"><span>d=</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>⟨vc(t)⟩Ts (d+ d2)−Rf⟨iL(t)⟩Ts</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Lf s</span></span>
<span class="line"><span>⎦⟨v1(t)⟩Ts +⟨v2(t)⟩Ts</span></span>
<span class="line"><span>) d2(d+ d2)+ 2Va(d+ d2)</span></span>
<span class="line"><span>(18.145)</span></span>
<span class="line"><span>This relationship is valid for both CCM and DCM provided that the second subinterval length</span></span>
<span class="line"><span>d2 is computed according to Eq. (18.144). Expression (18.145) is used in the implementation of</span></span>
<span class="line"><span>the combined CCM/DCM subcircuit CPM.</span></span>
<span class="line"><span>18.5.3 Simulation Example: Frequency Responses of a Buck Converter with</span></span>
<span class="line"><span>Current-Programmed Control</span></span>
<span class="line"><span>To illustrate an application of the CPM subcircuit, let us consider the example buck converter</span></span>
<span class="line"><span>circuit model of Fig. 18.32. To construct this averaged circuit model in SPICE, the switches</span></span>
<span class="line"><span>are replaced by the CCM-DCM1 averaged switch subcircuit. The control input to the CPM</span></span>
<span class="line"><span>subcircuit is the independent voltage source vc. Three dependent voltage sources are used to</span></span>
<span class="line"><span>generate other inputs to the CPM subcircuit. The controlled voltage sourceEi is proportional to</span></span>
<span class="line"><span>the inductor current iL. The controlled voltage sourceE1 is equal to v(1)−v(3), which is equal to</span></span>
<span class="line"><span>the voltage⟨v1(t)⟩Ts applied across the inductor during the ﬁrst subinterval when the transistor</span></span>
<span class="line"><span>is on and the diode is oﬀ. The controlled voltage sourceE2 is equal to v(3), which is equal to the</span></span>
<span class="line"><span>voltage⟨v2(t)⟩Ts applied across the inductor during the second subinterval when the transistor is</span></span>
<span class="line"><span>oﬀand the diode is on.</span></span>
<span class="line"><span>SPICE ac simulations are performed at the quiescent operating point obtained for the dc</span></span>
<span class="line"><span>value of the control input equal to Vc= 1.4 V . At the quiescent operating point, the switch duty</span></span>
<span class="line"><span>cycle is D= 0.676, the dc output voltage is V= 8.1 V, and the dc component of the inductor</span></span>
<span class="line"><span>current is IL= 0.81 A. The converter operates in CCM.</span></span>
<span class="line"><span>Magnitude and phase responses of the control-to-output transfer functions Gvc(s)= ˆv/ˆvc</span></span>
<span class="line"><span>and Gvd(s) = ˆv/ ˆd are shown in Fig. 18.33. The duty-cycle to output voltage transfer func-</span></span>
<span class="line"><span>tion Gvd(s) exhibits the familiar second-order high-Q response. Peaking in the magnitude re-</span></span>
<span class="line"><span>sponse and a steep change in phase from 0 ◦to−180◦occur around the center frequency of</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.5 Simulation of CPM Controlled Converters 767</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>CCM-DCM1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>35 ! H</span></span>
<span class="line"><span>100 ! F</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>12 V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>vc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>iLOAD</span></span>
<span class="line"><span>CPM</span></span>
<span class="line"><span>control current 1 2</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>+ + +</span></span>
<span class="line"><span>iL RL12 3 4</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>Rf iL v(1) (3) v(3)</span></span>
<span class="line"><span>0.05 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>Rf = 1 </span></span>
<span class="line"><span>fs = 200 kHz</span></span>
<span class="line"><span>L = 35 !</span></span>
<span class="line"><span>Va = 0.6 V</span></span>
<span class="line"><span>Xcpm</span></span>
<span class="line"><span>Xswitch</span></span>
<span class="line"><span>fs = 200 kHz</span></span>
<span class="line"><span>L = 35 !</span></span>
<span class="line"><span>Ei E1 E2</span></span>
<span class="line"><span>Fig. 18.32 CPM buck converter example: averaged circuit model</span></span>
<span class="line"><span>|| Gvd ||</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>zHk001zHk01zH001zH01 1 kHz</span></span>
<span class="line"><span>|| G ||</span></span>
<span class="line"><span>|| Gvc ||</span></span>
<span class="line"><span>Gvc</span></span>
<span class="line"><span>Fig. 18.33 Comparison of CPM control with duty-cycle control, for the control-to-output frequency</span></span>
<span class="line"><span>response of the buck converter example</span></span>
<span class="line"><span></span></span>
<span class="line"><span>768 18 Current-Programmed Control</span></span>
<span class="line"><span>|| Gvg ||</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>zHk001zHk01zH001zH01 1 kHz</span></span>
<span class="line"><span>Duty cycle control</span></span>
<span class="line"><span>d(t) = constant</span></span>
<span class="line"><span>Current programmed mode</span></span>
<span class="line"><span>vc(t) = constant</span></span>
<span class="line"><span>Fig. 18.34 Comparison of CPM control with duty-cycle control, for the line-to-output frequency re-</span></span>
<span class="line"><span>sponse of the buck converter example</span></span>
<span class="line"><span>the pair of complex-conjugate poles. In contrast, the CPM control-to-output response has a</span></span>
<span class="line"><span>dominant low-frequency pole. The phase lag is around−90◦in a wide range of frequencies. A</span></span>
<span class="line"><span>high-frequency pole contributes to additional phase lag at higher frequencies. The frequency re-</span></span>
<span class="line"><span>sponses of Fig.18.33 illustrate an advantage of CPM control over duty-cycle control. Because of</span></span>
<span class="line"><span>the control-to-output frequency response dominated by the single low-frequency pole, it can be</span></span>
<span class="line"><span>much easier to close a wide-bandwidth outer voltage feedback loop around the CPM controlled</span></span>
<span class="line"><span>power converter than around a converter where the duty cycle is the control input. Proportional-</span></span>
<span class="line"><span>plus-integral (PI) controllers are commonly used in current-programmed regulators.</span></span>
<span class="line"><span>Another advantage of CPM control is in rejection of input voltage disturbances. Line-to-</span></span>
<span class="line"><span>output frequency responses for duty-cycle control and CPM control in the buck example are</span></span>
<span class="line"><span>compared in Fig. 18.34. The line-to-output transfer function G</span></span>
<span class="line"><span>vg(s) for duty-cycle control is</span></span>
<span class="line"><span>characterized by a dc asymptote approximately equal to the duty cycle D = 0.676. Reso-</span></span>
<span class="line"><span>nant poles occur at the corner frequency of the L-C ﬁlter. The line-to-output transfer function</span></span>
<span class="line"><span>Gvg−cpm (s) with current-programmed control is signiﬁcantly reduced, and exhibits more than</span></span>
<span class="line"><span>30 dB of additional attenuation over the frequencies of interest. It should again be noted that the</span></span>
<span class="line"><span>transfer functionGvg−cpm (s)i nF i g .18.34 cannot be predicted by the simple models of Sect.18.1;</span></span>
<span class="line"><span>the more accurate model of Sect. 18.3 must be employed.</span></span>
<span class="line"><span>It is also interesting to compare the output impedance of the converter with duty-cycle con-</span></span>
<span class="line"><span>trol versus CPM control. The results are shown in Fig. 18.35. The output impedance plotted</span></span>
<span class="line"><span>in the ﬁgure includes the load resistance of 10 Ω. For duty-cycle control, the dc asymptote of</span></span>
<span class="line"><span>the output impedance is dominated by the inductor winding resistance of 0.05Ω. The inductor</span></span>
<span class="line"><span>becomes signiﬁcant in the vicinity of 200 Hz. At the resonant frequency of the output LC ﬁlter,</span></span>
<span class="line"><span>signiﬁcant peaking in the output impedance of the duty-cycle controlled converter can be ob-</span></span>
<span class="line"><span>served. At higher frequencies, the output impedance is dominated by the impedance of the ﬁlter</span></span>
<span class="line"><span>capacitor, which decreases with frequency.</span></span>
<span class="line"><span>In the current-programmed converter, the low-frequency impedance is high. It is equal to</span></span>
<span class="line"><span>the parallel combination of the load resistance and the CPM output resistance. Because of the</span></span>
<span class="line"><span>lossless damping introduced by CPM control, the series inductor does not a ﬀect the output</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.6 V oltage Feedback Loop Around a Current-Programmed Converter 769</span></span>
<span class="line"><span>|| Zout ||</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>zHk001zHk01zH001zH01 1 kHz</span></span>
<span class="line"><span>Duty cycle control</span></span>
<span class="line"><span>d(t) = constant</span></span>
<span class="line"><span>Current programmed mode</span></span>
<span class="line"><span>vc(t) = constant</span></span>
<span class="line"><span>Fig. 18.35 Comparison of CPM control with duty-cycle control, for the output impedance of the buck</span></span>
<span class="line"><span>converter example</span></span>
<span class="line"><span>impedance. The simple model of Sect. 18.1 predicts that the inductor branch of the circuit is</span></span>
<span class="line"><span>driven by a current source; this e ﬀectively removes the inﬂuence of the inductor on the out-</span></span>
<span class="line"><span>put impedance. The plot of Fig. 18.35 was generated using the more accurate; nonetheless, the</span></span>
<span class="line"><span>output impedance is accurately predicted by the simple model. It can be seen that current pro-</span></span>
<span class="line"><span>gramming substantially increases the converter output impedance at low frequencies. At high</span></span>
<span class="line"><span>frequencies the output impedances of the duty-cycle and CPM controlled converters have the</span></span>
<span class="line"><span>same asymptotes.</span></span>
<span class="line"><span>18.6 Voltage Feedback Loop Around a Current-Programmed Converter</span></span>
<span class="line"><span>As shown in Figs. 18.1 and 18.3 a converter system incorporating current-programmed control</span></span>
<span class="line"><span>often includes an outer voltage feedback loop, the purpose of which is to regulate the converter</span></span>
<span class="line"><span>output voltage. As discussed in Chap. 9, voltage is sensed and compared to a reference. The</span></span>
<span class="line"><span>error signal is processed by a voltage loop compensator, which outputs a control signal. In duty-</span></span>
<span class="line"><span>cycle controlled converters of Chap.9, the control signal is the input to a pulse-width modulator,</span></span>
<span class="line"><span>which produces a switch control signal with duty ratio proportional to the PWM control input.</span></span>
<span class="line"><span>In CPM controlled converters, the control signal generated by the voltage loop compensator is</span></span>
<span class="line"><span>the control input v</span></span>
<span class="line"><span>c= Rf ic for the CPM controller.</span></span>
<span class="line"><span>18.6.1 System Model</span></span>
<span class="line"><span>A complete system model, including the outer voltage loop, is shown in Fig. 18.36. The model</span></span>
<span class="line"><span>is very similar to the system model in Fig. 9.2 except that the pulse-width modulator model is</span></span>
<span class="line"><span>replaced by the CPM controller model. For the purpose of designing the voltage loop compen-</span></span>
<span class="line"><span>sator Gcv(s), it is convenient to make use of the closed-loop transfer functionGvc(s)= ˆv/ˆic of the</span></span>
<span class="line"><span>CPM controlled converter. A block diagram of the voltage feedback loop is shown in Fig.18.37.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>770 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.36 Block diagram that models a CPM controlled converter with an outer voltage feedback loop</span></span>
<span class="line"><span>Fig. 18.37 Model of the outer voltage feedback loop</span></span>
<span class="line"><span>The design of Gcv(s) amounts to employing the techniques of Chap. 9 to shape the voltage loop</span></span>
<span class="line"><span>gain</span></span>
<span class="line"><span>Tv= HGcv(s) 1</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Gvc(s) (18.146)</span></span>
<span class="line"><span>so that target crossover frequency fcv stability margins are attained.</span></span>
<span class="line"><span>With the voltage feedback loop closed around a current-programmed converter, the closed-</span></span>
<span class="line"><span>loop input impedance Zi can be found using the results of Sect. 18.4.4 by application of the</span></span>
<span class="line"><span>Feedback Theorem. As discussed in Sect. 17.5.2, the closed-loop input admittance Yi = 1/Zi</span></span>
<span class="line"><span>can be found from:</span></span>
<span class="line"><span>Yi= 1</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>ZN−cpm</span></span>
<span class="line"><span>Tv</span></span>
<span class="line"><span>1+ Tv</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>ZD−cpm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Tv</span></span>
<span class="line"><span>(18.147)</span></span>
<span class="line"><span>where expressions for ZN−cpm and ZD−cpm are given in Sect. 18.4.4. Following the discussion in</span></span>
<span class="line"><span>Sect. 17.5.2, the result for the closed-loop input impedance can be used to evaluate the system</span></span>
<span class="line"><span>stability when the CPM converter with voltage feedback loop includes an input ﬁlter or, more</span></span>
<span class="line"><span>generally, when it is supplied from a source with a nonzero output impedance.</span></span>
<span class="line"><span>18.6.2 Design Example</span></span>
<span class="line"><span>To illustrate an outer voltage feedback loop design, consider the CPM controlled buck converter</span></span>
<span class="line"><span>shown in Fig.18.32, with the voltage loop added as shown in Fig.18.1. The system small-signal</span></span>
<span class="line"><span>model is shown in Fig. 18.36. In this example, the reference voltage is V</span></span>
<span class="line"><span>re f = 3 V , and the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.6 V oltage Feedback Loop Around a Current-Programmed Converter 771</span></span>
<span class="line"><span>voltage sensing gain is set to H= 0.375, so that the output dc voltage is ideally regulated at</span></span>
<span class="line"><span>V= Vre f/H= 8 V . The quiescent operating point and the small-signal model parameters are</span></span>
<span class="line"><span>approximately the same as in the CPM buck converter considered in Sect. 18.5.3: D= 0.67,</span></span>
<span class="line"><span>IL= V/R= 0.8A , Ma/M2= 0.525, Fm= 3.2A−1, Fg= 0.016Ω−1, Fv= 0. Table18.3 includes</span></span>
<span class="line"><span>an expression for the closed-loop control-to-output voltage transfer function Gvc(s) predicted</span></span>
<span class="line"><span>by the more accurate CPM model,</span></span>
<span class="line"><span>Gvc(s)= Gc0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 ≈Gc0</span></span>
<span class="line"><span>1⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωhf</span></span>
<span class="line"><span>) (18.148)</span></span>
<span class="line"><span>Gc0 = V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>)= 7.92Ω→18 dBΩ</span></span>
<span class="line"><span>fc= 1</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR = 5.9k H z</span></span>
<span class="line"><span>Qc = R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR⎦</span></span>
<span class="line"><span>1+ RCFmV</span></span>
<span class="line"><span>DL</span></span>
<span class="line"><span>)= 0.034</span></span>
<span class="line"><span>fp1 = Qc fc= 201 Hz</span></span>
<span class="line"><span>fhf = fc/Qc= 174 kHz</span></span>
<span class="line"><span>As shown in Fig. 18.33, Gvc(s) exhibits a single-pole response over a wide range of frequen-</span></span>
<span class="line"><span>cies, so that it is relatively easy to design a wide-bandwidth voltage feedback loop with high</span></span>
<span class="line"><span>crossover frequency fcv using a simple proportional-integral (PI) compensator,</span></span>
<span class="line"><span>Gcv(s)= Gcm</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ωzv</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(18.149)</span></span>
<span class="line"><span>A sketch of the magnitude response of the voltage loop gain Tv of Eq. (18.146), with a PI</span></span>
<span class="line"><span>compensator of Eq. (18.149), is shown in Fig. 18.38. Assuming fzv &lt; fcv &lt; fhf , the magnitude</span></span>
<span class="line"><span>asymptote has−20 dB/dec slope around the crossover frequency,</span></span>
<span class="line"><span>||Tv||→H</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>GcoGcm</span></span>
<span class="line"><span>ωp1</span></span>
<span class="line"><span>ω (18.150)</span></span>
<span class="line"><span>From Eq. (18.150) it follows that the gain Gcm can be selected to obtain the desired crossover</span></span>
<span class="line"><span>frequency fcv,</span></span>
<span class="line"><span>Gcm= Rf</span></span>
<span class="line"><span>HGco</span></span>
<span class="line"><span>fcv</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>(18.151)</span></span>
<span class="line"><span>To achieve wide-bandwidth voltage regulation let us choose fcv = 40 kHz = fs/5. Equa-</span></span>
<span class="line"><span>tion (18.151) yields Gcm = 67.1. The phase margin ϕv can be evaluated based on the phase</span></span>
<span class="line"><span>contributions of the poles and zeroes shown in Fig. 18.38. Taking into account that fp1 &lt;&lt; fcv,</span></span>
<span class="line"><span>we have</span></span>
<span class="line"><span>ϕv= 180◦+∠Tv( jω)= 180◦−90◦−90◦+ tan−1 fcv</span></span>
<span class="line"><span>fzv</span></span>
<span class="line"><span>−tan−1 fcv</span></span>
<span class="line"><span>fhf</span></span>
<span class="line"><span>(18.152)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>772 18 Current-Programmed Control</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>R f</span></span>
<span class="line"><span>Gc0Gcm</span></span>
<span class="line"><span>ωp1</span></span>
<span class="line"><span>ω</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>fzv</span></span>
<span class="line"><span>fcv</span></span>
<span class="line"><span>fhf</span></span>
<span class="line"><span>||Tv||</span></span>
<span class="line"><span>0d B</span></span>
<span class="line"><span>Fig. 18.38 Sketch of the magnitude response of the loop gain Tv using a PI compensator Gcv(s)</span></span>
<span class="line"><span>Fig. 18.39 Loop gain Tv in the design example of Sect. 18.6.2</span></span>
<span class="line"><span>For these values, tan−1( fcv/ fhf )= 13◦. Equation (18.152) can be used to select fzv to achieve a</span></span>
<span class="line"><span>desired phase margin. For example, the choice fzv= fcv/3 yields</span></span>
<span class="line"><span>ϕv= tan−1 fcv</span></span>
<span class="line"><span>fzv</span></span>
<span class="line"><span>−tan−1 fcv</span></span>
<span class="line"><span>fhf</span></span>
<span class="line"><span>= 72◦−13◦= 59◦ (18.153)</span></span>
<span class="line"><span>Inclusion of this PI compensator Gcv(s) results in the voltage loop gain Tv shown in Fig. 18.39.</span></span>
<span class="line"><span>18.7 High-Frequency Dynamics of Current-Programmed Converters</span></span>
<span class="line"><span>The simple model of Sect. 18.2 predicts that the inductor current iL is directly controlled by</span></span>
<span class="line"><span>the current command ic, which implies small-signal control-to-current transfer function equal</span></span>
<span class="line"><span>to unity at all frequencies,</span></span>
<span class="line"><span>Gic(s)=</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>≈1 (18.154)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.7 High-Frequency Dynamics of Current-Programmed Converters 773</span></span>
<span class="line"><span>Let us compare this simple result with high-frequency predictions of the more accurate averaged</span></span>
<span class="line"><span>small-signal model of Sect. 18.3. At high frequencies, small-signal perturbations of capacitor</span></span>
<span class="line"><span>voltages become negligibly small. As a result, ˆm1 ≈0, ˆm2 ≈0, and inductor current slopes m1</span></span>
<span class="line"><span>and m2 can be considered constant, equal to the unperturbed dc values M1 and M2, respectively.</span></span>
<span class="line"><span>At high frequencies, the small-signal duty-cycle perturbation in Eq. (18.73) becomes</span></span>
<span class="line"><span>ˆd(t)≈Fm</span></span>
<span class="line"><span>[ˆic(t)−ˆiL(t)</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(18.155)</span></span>
<span class="line"><span>In a two-switch, single-inductor PWM converter, neglecting voltage perturbations, the duty-</span></span>
<span class="line"><span>cycle to inductor current transfer function can be written as</span></span>
<span class="line"><span>Gid=</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆd</span></span>
<span class="line"><span>≈M1+ M2</span></span>
<span class="line"><span>s (18.156)</span></span>
<span class="line"><span>Combining Eqs. (18.156) and (18.155), the more accurate model of Sect.18.3 yields the follow-</span></span>
<span class="line"><span>ing prediction for the control-to-current transfer function at high frequencies</span></span>
<span class="line"><span>Gic(s)=</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>≈ 1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωhf</span></span>
<span class="line"><span>(18.157)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>fhf = 1</span></span>
<span class="line"><span>2πFm(M1+ M2)= M1+ M2</span></span>
<span class="line"><span>2Ma+ M1−M2</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>π (18.158)</span></span>
<span class="line"><span>Note that exactly the same result for the high-frequency pole was found in Eq. ( 18.114). Nei-</span></span>
<span class="line"><span>ther the simple model, which neglects inductor dynamics, nor the more accurate model, which</span></span>
<span class="line"><span>implies a single-pole response at high frequencies, predicts instability or the need for the ar-</span></span>
<span class="line"><span>tiﬁcial ramp discussed in Sect. 18.2. This is because the averaged small-signal models do not</span></span>
<span class="line"><span>take into account converter switching and modulator sampling processes, which lead to various</span></span>
<span class="line"><span>discrete-time phenomena in a current-programmed converter. The purpose of this section is to</span></span>
<span class="line"><span>examine high-frequency dynamics of CPM controlled converters using sampled-data modeling</span></span>
<span class="line"><span>techniques, and to compare predictions of the sampled-data model to the predictions of the</span></span>
<span class="line"><span>averaged small-signal models.</span></span>
<span class="line"><span>18.7.1 Sampled-Data Model</span></span>
<span class="line"><span>Figure 18.40 shows waveforms in a current-programmed converter in response to a perturbation</span></span>
<span class="line"><span>ˆi</span></span>
<span class="line"><span>c in the control current ic, with an initial perturbation in the inductor current iL(t) denoted as</span></span>
<span class="line"><span>ˆiL[n−1]. At t= DTs, in response to the ˆic and ˆiL[n−1] perturbations, the duty cycle D is</span></span>
<span class="line"><span>perturbed by ˆd[n] and the inductor current perturbation assumes a new valueˆiL[n] over the next</span></span>
<span class="line"><span>switching period Ts. Derivation of a sampled-data “transfer function” Gic = ˆiL/ˆic follows the</span></span>
<span class="line"><span>approach described in [77], which includes taking into account samplingˆic(t) to obtain discrete-</span></span>
<span class="line"><span>time samples ˆic[n], derivation of a discrete-time relationship betweenˆic[n] and ˆiL[n], and ﬁnding</span></span>
<span class="line"><span>an equivalent hold transfer function that models the process in which continuous-time inductor</span></span>
<span class="line"><span>current perturbation ˆiL(t) is obtained from the samples ˆiL[n].</span></span>
<span class="line"><span></span></span>
<span class="line"><span>774 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.40 Steady-state and perturbed waveforms in a current-programmed converter</span></span>
<span class="line"><span>First, we note that the Laplace transform of the samples of ˆic(t) equals</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>k→+∞∑</span></span>
<span class="line"><span>k→−∞</span></span>
<span class="line"><span>ˆic (s−jkωs) (18.159)</span></span>
<span class="line"><span>where ˆic(s) is the Laplace transform of the continuous-time control current ˆic(t).</span></span>
<span class="line"><span>Next, we proceed to derive a discrete-time relationship between ˆic[n] and ˆiL[n]. Waveform</span></span>
<span class="line"><span>details around the sampling instant t= DTs are shown in Fig. 18.41. From the geometry of</span></span>
<span class="line"><span>the waveforms, the next perturbation in the inductor current ˆiL[n] can be found in terms of the</span></span>
<span class="line"><span>previous perturbation ˆiL[n−1], the duty-cycle perturbation ˆd[n] and the inductor current slopes</span></span>
<span class="line"><span>m1 and m2,</span></span>
<span class="line"><span>ˆiL[n]= ˆiL[n−1]+ (m1+ m2) ˆd[n]Ts (18.160)</span></span>
<span class="line"><span>Similarly, ˆic[n] can be related to ˆiL[n−1], ˆd[n], m1 and ma,</span></span>
<span class="line"><span>ˆic[n]= ˆiL[n−1]+ (m1+ ma) ˆd[n]Ts (18.161)</span></span>
<span class="line"><span>Eliminating ˆd[n]f r o mE q s . (18.160) and ( 18.161) yields a discrete-time relationship between</span></span>
<span class="line"><span>ˆic[n] and ˆiL[n],</span></span>
<span class="line"><span>ˆiL[n]= αˆiL[n−1]+ (1−α )ˆic[n] (18.162)</span></span>
<span class="line"><span>where the coeﬃcient α depends on the inductor current and artiﬁcial ramp slopes,</span></span>
<span class="line"><span>α=−m2−ma</span></span>
<span class="line"><span>m1+ ma</span></span>
<span class="line"><span>(18.163)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.7 High-Frequency Dynamics of Current-Programmed Converters 775</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>−ma</span></span>
<span class="line"><span>−m2</span></span>
<span class="line"><span>ˆiL[n − 1]</span></span>
<span class="line"><span>ˆiL[n]</span></span>
<span class="line"><span>iL(t) + ˆiL(t)</span></span>
<span class="line"><span>m1 −m2</span></span>
<span class="line"><span>ˆic[n]</span></span>
<span class="line"><span>ic(t) + ˆic(t)</span></span>
<span class="line"><span>ic(t)</span></span>
<span class="line"><span>−ma</span></span>
<span class="line"><span>ˆd[n]Ts</span></span>
<span class="line"><span>Fig. 18.41 Details of the steady-state and perturbed inductor current waveforms around the sampling</span></span>
<span class="line"><span>instant t= DTs</span></span>
<span class="line"><span>which is the same as Eq. (18.54) used in the stability analysis of Sect. 18.2.</span></span>
<span class="line"><span>Application of theZ transform [176]t oE q .(18.162) results in</span></span>
<span class="line"><span>ˆiL(z)= αˆiL(z)z−1+ (1−α )ˆic(z) (18.164)</span></span>
<span class="line"><span>which yields the discrete-timeZ-domain transfer function</span></span>
<span class="line"><span>Gic(z)=</span></span>
<span class="line"><span>ˆiL(z)</span></span>
<span class="line"><span>ˆic(z)</span></span>
<span class="line"><span>= 1−α</span></span>
<span class="line"><span>1−α z−1 (18.165)</span></span>
<span class="line"><span>A discrete-time system is stable if all poles lie inside the unit circle in the complex z plane.</span></span>
<span class="line"><span>Given that the transfer function Gic(z) has a pole at z= α , the stability condition becomes</span></span>
<span class="line"><span>| α|&lt; 1 (18.166)</span></span>
<span class="line"><span>which is the same as the stability condition given by Eq. (18.55).</span></span>
<span class="line"><span>As shown in Fig. 18.40, in response to a discrete-time perturbation ˆiL[n], the continuous-</span></span>
<span class="line"><span>time inductor current perturbation ˆiL(t) is a pulse of amplitude ˆiL[n] and length Ts. The transfer</span></span>
<span class="line"><span>function of the corresponding equivalent hold is therefore equal to the transfer function of the</span></span>
<span class="line"><span>zero-order hold [176],</span></span>
<span class="line"><span>1−e−sTs</span></span>
<span class="line"><span>s (18.167)</span></span>
<span class="line"><span>We now can combine Eqs. (18.165) and (18.167) to derive an expression for the sampled-data</span></span>
<span class="line"><span>“transfer function”</span></span>
<span class="line"><span>Gic(s)=</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>= 1−α</span></span>
<span class="line"><span>1−α e−sTs</span></span>
<span class="line"><span>1−e−sTs</span></span>
<span class="line"><span>sTs</span></span>
<span class="line"><span>(18.168)</span></span>
<span class="line"><span>The ﬁrst part of the expression is obtained from Eq. (18.165) by replacing z−1 with e−sTs , which</span></span>
<span class="line"><span>follows from the fact that a factor z−1 corresponds to delaying a signal by Ts, while the Laplace</span></span>
<span class="line"><span>transform of a signal delayed by Ts equals e−sTs times the Laplace transform of the signal. The</span></span>
<span class="line"><span>second part of the expression is the transfer function of the equivalent hold in Eq. ( 18.167),</span></span>
<span class="line"><span>while Ts in the denominator is due to sampling and retaining only the low-frequency ( k= 0)</span></span>
<span class="line"><span>portion of the spectrum of the sampled control input ˆic(t)i nE q .(18.159).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>776 18 Current-Programmed Control</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20 Magnitude [dB]</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-135</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>-45</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span> Phase [deg]</span></span>
<span class="line"><span>Fig. 18.42 High-frequency magnitude and phase responses of Gic based on the sampled-data model for</span></span>
<span class="line"><span>four values of the artiﬁcial ramp slope, Ma/M2= 0.1, 0.5, 1 and 5</span></span>
<span class="line"><span>To illustrate magnitude and phase responses of the sampled-dataGic(s)i nE q .(18.168), con-</span></span>
<span class="line"><span>sider a buck converter example operating at fs = 100 kHz and D= 0.5. The input dc voltage</span></span>
<span class="line"><span>is Vg = 10 V , the output voltage is V= DVg = 5 V , and inductance is L= 5 μH. Values of</span></span>
<span class="line"><span>the output ﬁlter capacitance and load do not aﬀect high-frequency control-to-inductor current</span></span>
<span class="line"><span>responses. The inductor current slopes are M1= (Vg−V)/L= 1A/μs, and M2= V/L= 1A/μs.</span></span>
<span class="line"><span>Since D= 0.5, the CPM controlled converter is stable for any Ma &gt; 0. Magnitude and phase</span></span>
<span class="line"><span>responses of the sampled-dataGic(s) are evaluated by replacings→jωin Eq. (18.168), and the</span></span>
<span class="line"><span>results are shown in Fig.18.42 for four diﬀerent values of the artiﬁcial ramp slope,Ma/M2= 0.1,</span></span>
<span class="line"><span>0.5, 1, and 5. In all cases, the magnitude responses start from 0 dB and phase responses start</span></span>
<span class="line"><span>from 0◦, matching the responses expected based on the simple averaged small-signal model.</span></span>
<span class="line"><span>For Ma/M2 = 0.1, α =−0.82, and the sampled-data frequency response exhibits peaking in</span></span>
<span class="line"><span>the magnitude response and a sharp decline in the phase response from 0 ◦to−180◦around</span></span>
<span class="line"><span>fs/2= 50 kHz. For Ma = 0, which corresponds to the period-doubling stability boundary, one</span></span>
<span class="line"><span>may verify that the magnitude response goes to ∞at fs/2. The peaking in the magnitude re-</span></span>
<span class="line"><span>sponse diminishes with increasing values of the artiﬁcial ramp slope. For very large Ma/M2,</span></span>
<span class="line"><span>such as Ma/M2= 5i nF i g .18.42, the magnitude response starts to roll oﬀat a lower frequency,</span></span>
<span class="line"><span>implying an eﬀectively reduced current control bandwidth.</span></span>
<span class="line"><span>18.7.2 First-Order Approximation</span></span>
<span class="line"><span>It can be veriﬁed that the predictions of the sampled-data model of Eq. ( 18.168) match ex-</span></span>
<span class="line"><span>perimentally measured frequency responses very well. However, the “transfer function” of</span></span>
<span class="line"><span>Eq. (18.168) is not a standard rational transfer function in s, and it does not oﬀer an intuitive</span></span>
<span class="line"><span>design-oriented interpretation. It is therefore of interest to consider a rational transfer function</span></span>
<span class="line"><span>approximation of G</span></span>
<span class="line"><span>ic(s)i nE q . (18.168). Consider the ﬁrst-order Padé approximation [ 138]o f</span></span>
<span class="line"><span>the term e−sTs ,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.7 High-Frequency Dynamics of Current-Programmed Converters 777</span></span>
<span class="line"><span>e−sTs ≈</span></span>
<span class="line"><span>1−s</span></span>
<span class="line"><span>ωs/π</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωs/π</span></span>
<span class="line"><span>(18.169)</span></span>
<span class="line"><span>Note that the approximation includes a RHP zero and a pole at the same frequency fs/π.</span></span>
<span class="line"><span>The magnitude response of the approximation is equal to 1 (0 dB) at all frequencies, exactly</span></span>
<span class="line"><span>matching the magnitude response of e−jωTs at all frequencies. Substituting Eq. ( 18.169)i n t o</span></span>
<span class="line"><span>Eq. (18.168) yields a ﬁrst-order rational transfer function approximation</span></span>
<span class="line"><span>Gic(s)≈ 1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωhf</span></span>
<span class="line"><span>(18.170)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>fhf = 1−α</span></span>
<span class="line"><span>1+ α</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>π= M1+ M2</span></span>
<span class="line"><span>2Ma+ M1−M2</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>π (18.171)</span></span>
<span class="line"><span>which is identical to the frequency response Gic(s) predicted by the more accurate averaged</span></span>
<span class="line"><span>small-signal model given by Eq. ( 18.157). It follows that the more accurate averaged small-</span></span>
<span class="line"><span>signal model of Sect. 18.3 is equivalent to the ﬁrst-order approximation of the sampled-data</span></span>
<span class="line"><span>model.</span></span>
<span class="line"><span>Figure 18.43 compares the magnitude and phase responses of the sampled-data model</span></span>
<span class="line"><span>in Eq. ( 18.168) to the magnitude and phase responses of the ﬁrst-order approximation in</span></span>
<span class="line"><span>Eq. (18.170) or, equivalently, Eq. ( 18.157), for the same buck converter example considered</span></span>
<span class="line"><span>in Fig. 18.42, and for three values of the artiﬁcial ramp slope, Ma/M2 = 0.1, 0.5, and 5. For</span></span>
<span class="line"><span>Ma/M2= 0.1, the ﬁrst-order approximation predicts a pole at 3.2 fs, which is a very poor approx-</span></span>
<span class="line"><span>imation to the sampled-data model predictions. The high-frequency predictions of the ﬁrst-order</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20 Magnitude [dB]</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-135</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>-45</span></span>
<span class="line"><span>0 Phase [deg]</span></span>
<span class="line"><span>Fig. 18.43 Comparison of high-frequency Gic responses based on the sampled-data model and its ﬁrst-</span></span>
<span class="line"><span>order approximation for three diﬀerent values of the artiﬁcial ramp slope, Ma/M2 = 0.1, 0.5, and 5. The</span></span>
<span class="line"><span>ﬁrst-order approximation responses are identical to the predictions of the more accurate CPM model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>778 18 Current-Programmed Control</span></span>
<span class="line"><span>approximation improve with increasing slope of the artiﬁcial ramp. For Ma = 0.5M2, which is</span></span>
<span class="line"><span>a practical choice that guarantees stability for any duty cycle D, the example of Fig. 18.43 il-</span></span>
<span class="line"><span>lustrates a very good match up to around fs/5. For large Ma/M2, such as Ma/M2 = 5, the</span></span>
<span class="line"><span>magnitude and phase responses of the ﬁrst-order approximation or, equivalently, the more accu-</span></span>
<span class="line"><span>rate averaged small-signal model, are in very good agreement with the sampled-data model at</span></span>
<span class="line"><span>essentially all frequencies of interest.</span></span>
<span class="line"><span>18.7.3 Second-Order Approximation</span></span>
<span class="line"><span>As discussed in the previous subsection, the ﬁrst-order approximation does not predict CPM</span></span>
<span class="line"><span>instability and it does not oﬀer accurate predictions of high-frequency responses in cases when</span></span>
<span class="line"><span>a current-programmed converter operates close to the stability boundary. In this section, we</span></span>
<span class="line"><span>show how a second-order rational transfer function approximation o ﬀers a way to accurately</span></span>
<span class="line"><span>incorporate sampled-data eﬀects. The second-order Padé approximation [138]o ft h et e r me</span></span>
<span class="line"><span>−sTs</span></span>
<span class="line"><span>is given by</span></span>
<span class="line"><span>e−sTs ≈</span></span>
<span class="line"><span>1−π</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ωs/2+</span></span>
<span class="line"><span>⎦ s</span></span>
<span class="line"><span>ωs/2</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>1+π</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ωs/2+</span></span>
<span class="line"><span>⎦ s</span></span>
<span class="line"><span>ωs/2</span></span>
<span class="line"><span>)2 (18.172)</span></span>
<span class="line"><span>The second-order approximation includes a pair of RHP zeroes and a pair of poles having the</span></span>
<span class="line"><span>same Q factor and the same center frequency fs/2. As in the case of the ﬁrst-order approxima-</span></span>
<span class="line"><span>tion, the magnitude response of the approximation is 1 (0 dB) at all frequencies. Substituting</span></span>
<span class="line"><span>Eq. (18.172) into Eq. (18.168), yields a second-order rational transfer function approximation</span></span>
<span class="line"><span>Gic(s)≈ 1</span></span>
<span class="line"><span>1+π</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1+ α</span></span>
<span class="line"><span>1−α</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ωs/2+</span></span>
<span class="line"><span>⎦ s</span></span>
<span class="line"><span>ωs/2</span></span>
<span class="line"><span>)2 (18.173)</span></span>
<span class="line"><span>or</span></span>
<span class="line"><span>Gic(s)≈ 1</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>Qhf</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ωs/2+</span></span>
<span class="line"><span>⎦ s</span></span>
<span class="line"><span>ωs/2</span></span>
<span class="line"><span>)2 (18.174)</span></span>
<span class="line"><span>where the Q-factor of the pair of poles in Gic(s)i s</span></span>
<span class="line"><span>Qhf = 2</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>1−α</span></span>
<span class="line"><span>1+ α = 2</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>M1+ M2</span></span>
<span class="line"><span>2Ma+ M1−M2</span></span>
<span class="line"><span>= 2</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1−2D+ 2D Ma</span></span>
<span class="line"><span>M2</span></span>
<span class="line"><span>(18.175)</span></span>
<span class="line"><span>and the center frequency is at fs/2. At the stability boundary, α =−1 and Qhf →∞, which</span></span>
<span class="line"><span>means that the second-order approximation given by Eq. (18.173) is capable of correctly predict-</span></span>
<span class="line"><span>ing CPM instability. For the same buck converter example considered in Figs.18.42 and 18.43,</span></span>
<span class="line"><span>Fig. 18.44 shows a comparison of the magnitude and phase responses of the second-order ap-</span></span>
<span class="line"><span>proximation given by Eq. (18.173) and the sampled-data model given by Eq. (18.168)f o rt h r e e</span></span>
<span class="line"><span>values of the artiﬁcial ramp slope, Ma/M2 = 0.1, 0.5, and 5. The second-order approximation</span></span>
<span class="line"><span>matches predictions of the sampled-data model very well at all frequencies of interest, and for</span></span>
<span class="line"><span>all values of the artiﬁcial ramp slope.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.8 Discontinuous Conduction Mode 779</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20 Magnitude [dB]</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-135</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>-45</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span> Phase [deg]</span></span>
<span class="line"><span>Fig. 18.44 Comparison of high-frequencyGic responses based on the sampled-data model and its second-</span></span>
<span class="line"><span>order approximation for three diﬀerent values of the artiﬁcial ramp slope, Ma/M2= 0.1, 0.5, and 5</span></span>
<span class="line"><span>The more accurate averaged small-signal model of Sect.18.3, which is equivalent to the ﬁrst-</span></span>
<span class="line"><span>order approximation of the sampled-data model, can be extended to match predictions of the</span></span>
<span class="line"><span>second-order approximation. As shown in [107], one approach to extending the more accurate</span></span>
<span class="line"><span>model consists of replacing the modulator gain F</span></span>
<span class="line"><span>m in Fig. 18.24 with a single-pole response</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωx</span></span>
<span class="line"><span>(18.176)</span></span>
<span class="line"><span>where Fm given by Eq. (18.74) remains the same as before, while the additional modulator pole</span></span>
<span class="line"><span>frequency equals</span></span>
<span class="line"><span>fx=π</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−2D+ 2D Ma</span></span>
<span class="line"><span>M2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>fs (18.177)</span></span>
<span class="line"><span>It can be shown that inclusion of the pole at fx results in high-frequency responses consistent</span></span>
<span class="line"><span>with the second-order approximation of the sampled-data model. With this extension, the more</span></span>
<span class="line"><span>accurate averaged small-signal model is capable of predicting CPM instability and of providing</span></span>
<span class="line"><span>accurate predictions of CPM frequency responses at all frequencies of interest, and for all values</span></span>
<span class="line"><span>of the artiﬁcial ramp slope M</span></span>
<span class="line"><span>a. In practice, assuming an artiﬁcial ramp with a suﬃciently large</span></span>
<span class="line"><span>slope Ma is applied, the analytical and simulation models developed in Sects.18.3 and 18.5 can</span></span>
<span class="line"><span>be considered suﬃciently accurate.</span></span>
<span class="line"><span>18.8 Discontinuous Conduction Mode</span></span>
<span class="line"><span>A model of current-programmed converters operating in the discontinuous conduction mode</span></span>
<span class="line"><span>is incorporated in the averaged simulation model described in Sect. 18.5.2. In this section, an</span></span>
<span class="line"><span>analytical model for current-programmed DCM converters is derived using the averaged switch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>780 18 Current-Programmed Control</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)vg(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>Switch network</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t) v2(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>Fig. 18.45 Current-programmed DCM buck–boost converter example</span></span>
<span class="line"><span>modeling approach of Sect. 15.2. It is found that the average transistor voltage and current</span></span>
<span class="line"><span>follow a power sink characteristic, while the average diode voltage and current obey a power</span></span>
<span class="line"><span>source characteristic. Perturbation and linearization of these characteristics leads to a small-</span></span>
<span class="line"><span>signal equivalent circuit that models CPM DCM converters. The basic DCM CPM buck, boost,</span></span>
<span class="line"><span>and buck–boost converters essentially exhibit single-pole transfer functions: the second pole and</span></span>
<span class="line"><span>the right half-plane zero appear at frequencies near to or greater than the switching frequency,</span></span>
<span class="line"><span>owing to the small value of L in DCM.</span></span>
<span class="line"><span>A DCM CPM buck–boost converter example is analyzed here. However, Eqs. ( 18.178)</span></span>
<span class="line"><span>to (18.195) are written in general form, and apply equally well to DCM CPM buck and boost</span></span>
<span class="line"><span>converters. The schematic of a buck–boost converter is illustrated in Fig. 18.45. The terminal</span></span>
<span class="line"><span>waveforms of the switch network are deﬁned as shown: v</span></span>
<span class="line"><span>1(t) and i1(t) are the transistor wave-</span></span>
<span class="line"><span>forms, while v2(t) and i2(t) are the diode waveforms. Figure18.46 illustrates typical DCM wave-</span></span>
<span class="line"><span>forms, for current-programmed control with an artiﬁcial ramp having slope−ma. The inductor</span></span>
<span class="line"><span>current is zero at the beginning of each switching period. By solution of the transistor conduc-</span></span>
<span class="line"><span>tion subinterval, the programmed current ipk can be related to the transistor duty cycle d1 by</span></span>
<span class="line"><span>ic= ipk+ mad1Ts</span></span>
<span class="line"><span>= (m1+ ma)d1Ts (18.178)</span></span>
<span class="line"><span>Solution for d1 leads to</span></span>
<span class="line"><span>d1(t)= ic(t)</span></span>
<span class="line"><span>(m1+ ma)Ts</span></span>
<span class="line"><span>(18.179)</span></span>
<span class="line"><span>The average transistor current is found by integrating the i1(t) waveform of Fig. 18.46 over one</span></span>
<span class="line"><span>switching period:</span></span>
<span class="line"><span>⟨i1(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i1(τ)dτ= q1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>(18.180)</span></span>
<span class="line"><span>The total area q1 is equal to one-half of the peak currentipk, multiplied by the subinterval length</span></span>
<span class="line"><span>d1Ts. Hence,</span></span>
<span class="line"><span>⟨i1(t)⟩Ts = 1</span></span>
<span class="line"><span>2ipk(t)d1(t) (18.181)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.8 Discontinuous Conduction Mode 781</span></span>
<span class="line"><span>Fig. 18.46 Waveforms, CPM DCM buck–boost example</span></span>
<span class="line"><span>Elimination of ipk and d1, to express the average transistor current as a function of ic, leads to</span></span>
<span class="line"><span>⟨i1(t)⟩Ts =</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 Li2</span></span>
<span class="line"><span>c fs</span></span>
<span class="line"><span>⟨v1(t)⟩Ts</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)2 (18.182)</span></span>
<span class="line"><span>Finally, Eq. (18.182) can be rearranged to obtain the averaged switch network input port rela-</span></span>
<span class="line"><span>tionship:</span></span>
<span class="line"><span>⟨i1(t)⟩Ts⟨v1(t)⟩Ts =</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 Li2</span></span>
<span class="line"><span>c fs</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)2 =⟨p(t)⟩Ts (18.183)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>782 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.47 CPM DCM buck–boost converter model, derived via averaged switch modeling</span></span>
<span class="line"><span>Thus, the average transistor waveforms obey a power sink characteristic. When ma = 0, then</span></span>
<span class="line"><span>the average power⟨p(t)⟩TS is a function only of L, ic, and fs. The presence of the artiﬁcial ramp</span></span>
<span class="line"><span>causes⟨p(t)⟩TS to additionally depend on the converter voltages, via m1.</span></span>
<span class="line"><span>The power sink characteristic can also be explained via inductor energy arguments. During</span></span>
<span class="line"><span>the ﬁrst subinterval, the inductor current increases from 0 to ipk. In the process, the inductor</span></span>
<span class="line"><span>stores the following energy:</span></span>
<span class="line"><span>W= 1</span></span>
<span class="line"><span>2 Li2</span></span>
<span class="line"><span>pk (18.184)</span></span>
<span class="line"><span>The energy W is transferred from the power input vg, through the switch network input port,</span></span>
<span class="line"><span>to the inductor, once per switching period. This energy transfer process accounts for the power</span></span>
<span class="line"><span>ﬂow</span></span>
<span class="line"><span>⟨p(t)⟩Ts = Wf s= 1</span></span>
<span class="line"><span>2 Li2</span></span>
<span class="line"><span>pk fs (18.185)</span></span>
<span class="line"><span>The switch network input port, that is, the transistor terminals, can therefore be modeled by a</span></span>
<span class="line"><span>power sink element, as in Fig. 18.47.</span></span>
<span class="line"><span>The average switch network output port current, that is, the average diode current, is</span></span>
<span class="line"><span>⟨i2(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i2(τ)dτ= q2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>(18.186)</span></span>
<span class="line"><span>By inspection of Fig. 18.46, the area q2 is given by</span></span>
<span class="line"><span>q2= 1</span></span>
<span class="line"><span>2ipkd2Ts (18.187)</span></span>
<span class="line"><span>The duty cycle d2 is determined by the time required for the inductor current to return to zero,</span></span>
<span class="line"><span>during the second subinterval. By arguments similar to those used to derive Eq. ( 15.19), the</span></span>
<span class="line"><span>duty cycle d2 can be found as follows:</span></span>
<span class="line"><span>d2(t)= d1(t)⟨v1(t)⟩Ts</span></span>
<span class="line"><span>⟨v2(t)⟩Ts</span></span>
<span class="line"><span>(18.188)</span></span>
<span class="line"><span>Substitution of Eqs. (18.188), (18.187), and (18.185) into Eq. (18.186) yields</span></span>
<span class="line"><span>⟨i2(t)⟩Ts = ⟨p(t)⟩Ts</span></span>
<span class="line"><span>⟨v2(t)⟩Ts</span></span>
<span class="line"><span>(18.189)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.8 Discontinuous Conduction Mode 783</span></span>
<span class="line"><span>Fig. 18.48 Steady-state model of the CPM DCM buck–boost converter</span></span>
<span class="line"><span>The output port of the averaged switch network is therefore described by the relationship</span></span>
<span class="line"><span>⟨i2(t)⟩Ts⟨v2(t)⟩Ts =</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 Li2</span></span>
<span class="line"><span>c (t) fs</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)2 =⟨p(t)⟩Ts (18.190)</span></span>
<span class="line"><span>In the averaged model, the diode can be replaced by a power source of value⟨p(t)⟩Ts , equal to the</span></span>
<span class="line"><span>power apparently consumed at the switch network input port. During the second subinterval, the</span></span>
<span class="line"><span>inductor releases all of its stored energy through the diode, to the converter output. This results</span></span>
<span class="line"><span>in an average power ﬂow of value⟨p(t)⟩Ts .</span></span>
<span class="line"><span>A CPM DCM buck–boost averaged model is therefore as given in Fig.18.47. In this model,</span></span>
<span class="line"><span>the transistor is simply replaced by a power sink of value ⟨p(t)⟩Ts , while the diode is replaced</span></span>
<span class="line"><span>by a power source also of value⟨p(t)⟩Ts .</span></span>
<span class="line"><span>The steady-state equivalent circuit model of the CPM DCM buck–boost converter is ob-</span></span>
<span class="line"><span>tained by letting the inductor and capacitor tend to short- and open-circuits, respectively. The</span></span>
<span class="line"><span>model of Fig. 18.48 is obtained. The steady-state output voltage V can now be determined by</span></span>
<span class="line"><span>equating the dc load power to the converter average power ⟨p(t)⟩Ts . For a resistive load, one</span></span>
<span class="line"><span>obtains</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>R = P (18.191)</span></span>
<span class="line"><span>where the steady-state value of⟨p(t)⟩Ts is given by</span></span>
<span class="line"><span>P=</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 LI2</span></span>
<span class="line"><span>c (t) fs</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Ma</span></span>
<span class="line"><span>M1</span></span>
<span class="line"><span>)2 (18.192)</span></span>
<span class="line"><span>and where Ic is the steady-state value of the control input ic(t). Solution for V yields the follow-</span></span>
<span class="line"><span>ing result</span></span>
<span class="line"><span>V=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>PR= Ic</span></span>
<span class="line"><span>√ RL fs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Ma</span></span>
<span class="line"><span>M1</span></span>
<span class="line"><span>)2 (18.193)</span></span>
<span class="line"><span>for the case of a resistive load.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>784 18 Current-Programmed Control</span></span>
<span class="line"><span>Averaged models of the DCM CPM buck, boost, and other converters can be found in a</span></span>
<span class="line"><span>similar manner. In each case, the average transistor waveforms are shown to follow a power</span></span>
<span class="line"><span>sink characteristic, while the average diode waveforms follow a power source characteristic.</span></span>
<span class="line"><span>The resulting equivalent circuits of the CPM DCM buck and boost converters are illustrated in</span></span>
<span class="line"><span>Fig. 18.49. In each case, the average power is given by</span></span>
<span class="line"><span>⟨p(t)⟩Ts =</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 Li2</span></span>
<span class="line"><span>c (t) fs</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)2 (18.194)</span></span>
<span class="line"><span>with m1 deﬁned as in Eq. (18.30).</span></span>
<span class="line"><span>Steady-state characteristics of the DCM CPM buck, boost, and buck–boost converters are</span></span>
<span class="line"><span>summarized in Table 18.6. In each case, the dc load power is Pload = VI and P is given by</span></span>
<span class="line"><span>Eq. (18.192). The conditions for operation of a current-programmed converter in the discontin-</span></span>
<span class="line"><span>uous conduction mode can be expressed as follows:</span></span>
<span class="line"><span>|I|&gt;|Icrit| for CCM</span></span>
<span class="line"><span>|I|&lt;|Icrit| for DCM (18.195)</span></span>
<span class="line"><span>where I is the dc load current. The critical load current at the CCM-DCM boundary, Icrit,i s</span></span>
<span class="line"><span>expressed as a function of Ic and the voltage conversion ratio M= V/Vg in Table18.6.</span></span>
<span class="line"><span>Table 18.6 Steady-state DCM current-programmed characteristics of basic converters</span></span>
<span class="line"><span>Converter MI crit Stability range when ma = 0</span></span>
<span class="line"><span>Buck Pload−P</span></span>
<span class="line"><span>Pload</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 (Ic−MmaTs)0 ≤M&lt; 2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>Boost Pload</span></span>
<span class="line"><span>Pload−P</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Ic−M−1</span></span>
<span class="line"><span>M maTs</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>2M 0≤D≤1</span></span>
<span class="line"><span>Buck–boost Depends on load characteristic:</span></span>
<span class="line"><span>Pload = P</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Ic−M</span></span>
<span class="line"><span>M−1 maTs</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>2(M−1) 0≤D≤1</span></span>
<span class="line"><span>In the discontinuous conduction mode, the inductor current is zero at the beginning and end</span></span>
<span class="line"><span>of each switching period. As a result, the current-programmed controller does not exhibit the</span></span>
<span class="line"><span>type of instability described in Sect. 18.2. The current programmed controllers of DCM boost</span></span>
<span class="line"><span>and buck–boost converters are stable for all duty cycles with no artiﬁcial ramp. However, the</span></span>
<span class="line"><span>CPM DCM buck converter exhibits a diﬀerent type of low-frequency instability when M&gt; 2/3</span></span>
<span class="line"><span>and m</span></span>
<span class="line"><span>a = 0 that arises because the dc output characteristic is nonlinear and can exhibit two</span></span>
<span class="line"><span>equilibrium points when the converter drives a resistive load. The stability range can be extended</span></span>
<span class="line"><span>to 0≤D≤1 by addition of an artiﬁcial ramp having slope ma &gt; 0.086m2, or by addition of</span></span>
<span class="line"><span>output voltage feedback.</span></span></code></pre></div>`,10)])])}const m=s(l,[["render",i]]);export{u as __pageData,m as default};
