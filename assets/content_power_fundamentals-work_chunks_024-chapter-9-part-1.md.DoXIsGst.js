import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第9章part 1 - 9 Controller Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第9章part 1 - 9 Controller Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 358-377 > Chunk ID: `chapter-9-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/024-chapter-9-part-1.md","filePath":"content/power/fundamentals-work/chunks/024-chapter-9-part-1.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/024-chapter-9-part-1.md"};function i(t,n,o,c,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第9章part-1-9-controller-design" tabindex="-1">第9章part 1 - 9 Controller Design <a class="header-anchor" href="#第9章part-1-9-controller-design" aria-label="Permalink to &quot;第9章part 1 - 9 Controller Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 358-377<br> Chunk ID: <code>chapter-9-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>9</span></span>
<span class="line"><span>Controller Design</span></span>
<span class="line"><span>9.1 Introduction</span></span>
<span class="line"><span>In all switching converters, the output voltagev(t) is a function of the input line voltagevg(t), the</span></span>
<span class="line"><span>duty cycle d(t), and the load current iload(t), as well as the converter circuit element values. In</span></span>
<span class="line"><span>a dc–dc converter application, it is desired to obtain a constant output voltage v(t)= V, in spite</span></span>
<span class="line"><span>of disturbances in vg(t) and iload(t), and in spite of variations in the converter circuit element</span></span>
<span class="line"><span>values. The sources of these disturbances and variations are many, and a typical situation is</span></span>
<span class="line"><span>illustrated in Fig. 9.1. The input voltage vg(t)o fa noﬀ-line power supply may typically contain</span></span>
<span class="line"><span>periodic variations at the second harmonic of the ac power system frequency (100 Hz or 120</span></span>
<span class="line"><span>Hz), produced by a rectiﬁer circuit. The magnitude of vg(t) may also vary when neighboring</span></span>
<span class="line"><span>power system loads are switched on or oﬀ. The load current iload(t) may contain variations of</span></span>
<span class="line"><span>signiﬁcant amplitude, and a typical power supply speciﬁcation is that the output voltage must</span></span>
<span class="line"><span>remain within a speciﬁed range (for example, 3 .3V± 0.05 V) when the load current takes a</span></span>
<span class="line"><span>step change from, for example, full rated load current to 50% of the rated current, and vice</span></span>
<span class="line"><span>versa. The values of the circuit elements are constructed to a certain tolerance, and so in high-</span></span>
<span class="line"><span>volume manufacturing of a converter, converters are constructed whose output voltages lie in</span></span>
<span class="line"><span>some distribution. It is desired that essentially all of this distribution fall within the speciﬁed</span></span>
<span class="line"><span>range; however, this is not practical to achieve without the use of negative feedback. Similar</span></span>
<span class="line"><span>considerations apply to inverter applications, except that the output voltage is ac.</span></span>
<span class="line"><span>So we cannot expect to simply set the dc–dc converter duty cycle to a single value, and</span></span>
<span class="line"><span>obtain a given constant output voltage under all conditions. The idea behind the use of negative</span></span>
<span class="line"><span>feedback is to build a circuit that automatically adjusts the duty cycle as necessary, to obtain</span></span>
<span class="line"><span>the desired output voltage with high accuracy, regardless of disturbances in vg(t)o r iload(t)o r</span></span>
<span class="line"><span>variations in component values. This is a useful thing to do whenever there are variations and</span></span>
<span class="line"><span>unknowns that otherwise prevent the system from attaining the desired performance.</span></span>
<span class="line"><span>A block diagram of a feedback system is shown in Fig. 9.2. The output voltage v(t)i sm e a -</span></span>
<span class="line"><span>sured, using a “sensor” with gain H(s). In a dc voltage regulator or dc–ac inverter, the sensor</span></span>
<span class="line"><span>circuit is usually a voltage divider, comprised of precision resistors. The sensor output signal</span></span>
<span class="line"><span>H(s)v(s) is compared with a reference input voltage vre f (s). The objective is to make H(s)v(s)</span></span>
<span class="line"><span>equal to vre f (s), so that v(s) accurately follows vre f (s) regardless of disturbances or component</span></span>
<span class="line"><span>variations in the compensator, pulse-width modulator, gate driver, or converter power stage.</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_9</span></span>
<span class="line"><span>347</span></span>
<span class="line"><span></span></span>
<span class="line"><span>348 9 Controller Design</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)vg(t)</span></span>
<span class="line"><span>Switching converter Load</span></span>
<span class="line"><span>Pulse-width</span></span>
<span class="line"><span>modulator</span></span>
<span class="line"><span>vc(t)</span></span>
<span class="line"><span>Transistor</span></span>
<span class="line"><span>gate driver</span></span>
<span class="line"><span>(t)</span></span>
<span class="line"><span>iload(t</span></span>
<span class="line"><span>(t)</span></span>
<span class="line"><span>TsdTs t</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>iload(t)</span></span>
<span class="line"><span>d(t)</span></span>
<span class="line"><span>Switching converter</span></span>
<span class="line"><span>Disturbances</span></span>
<span class="line"><span>Control input</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>v(t)= f(vg, i load,d )</span></span>
<span class="line"><span>Fig. 9.1 The output voltage of a typical switching converter is a function of the line input voltagevg,t h e</span></span>
<span class="line"><span>duty cycle d, and the load current iload:( a) open-loop buck converter; (b) functional diagram illustrating</span></span>
<span class="line"><span>dependence of v on the independent quantities vg, d,a n diload</span></span>
<span class="line"><span>The diﬀerence between the reference input vre f (s) and the sensor output H(s)v(s) is called</span></span>
<span class="line"><span>the error signal ve(s). If the feedback system works perfectly, then vre f (s) = H(s)v(s), and</span></span>
<span class="line"><span>hence the error signal is zero. In practice, the error signal is usually nonzero but nonetheless</span></span>
<span class="line"><span>small. Obtaining a small error is one of the objectives in adding a compensator network G</span></span>
<span class="line"><span>c(s)</span></span>
<span class="line"><span>as shown in Fig. 9.2. Note that the transfer function from the error signal ve(s) to the output</span></span>
<span class="line"><span>voltage v(s) is equal to the gains of the compensator, pulse-width modulator, and converter</span></span>
<span class="line"><span>power stage. If the compensator gain Gc(s) is large enough in magnitude, then a small error</span></span>
<span class="line"><span>signal can produce the required output voltage v(t)= V for a dc regulator ( Q: how should H</span></span>
<span class="line"><span>and vre f then be chosen?). So a large compensator gain leads to a small error, and therefore the</span></span>
<span class="line"><span>output follows the reference input with good accuracy. This is the key idea behind feedback</span></span>
<span class="line"><span>systems.</span></span>
<span class="line"><span>The averaged small-signal converter models derived in Chap.7 are used in the following sec-</span></span>
<span class="line"><span>tions to ﬁnd the eﬀects of feedback on the small-signal transfer functions of the regulator. The</span></span>
<span class="line"><span>loop gain T(s) is deﬁned as the product of the small-signal gains in the forward and feedback</span></span>
<span class="line"><span>paths of the feedback loop. It is found that the transfer function from a disturbance to the output</span></span>
<span class="line"><span>is multiplied by the factor 1/(1+ T(s)). Hence, when the loop gain T is large in magnitude,</span></span>
<span class="line"><span>then the inﬂuence of disturbances on the output voltage is small. A large loop gain also causes</span></span>
<span class="line"><span>the output voltage v(s) to be nearly equal to v</span></span>
<span class="line"><span>re f (s)/H(s), with very little dependence on the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.1 Introduction 349</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vvg</span></span>
<span class="line"><span>Switching converterPower</span></span>
<span class="line"><span>input</span></span>
<span class="line"><span>Load</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Compensator</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>Reference</span></span>
<span class="line"><span>input</span></span>
<span class="line"><span>HvPulse-width</span></span>
<span class="line"><span>modulator</span></span>
<span class="line"><span>vc</span></span>
<span class="line"><span>Transistor</span></span>
<span class="line"><span>gate driver</span></span>
<span class="line"><span>Gc(s)</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>ve</span></span>
<span class="line"><span>Error</span></span>
<span class="line"><span>signal</span></span>
<span class="line"><span>Sensor</span></span>
<span class="line"><span>gain</span></span>
<span class="line"><span>iload</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>Reference</span></span>
<span class="line"><span>input</span></span>
<span class="line"><span>vcve(t)</span></span>
<span class="line"><span>Error</span></span>
<span class="line"><span>signal</span></span>
<span class="line"><span>Sensor</span></span>
<span class="line"><span>gain</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>iload(t)</span></span>
<span class="line"><span>d(t)</span></span>
<span class="line"><span>Switching converter</span></span>
<span class="line"><span>Disturbances</span></span>
<span class="line"><span>Control input</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>}+ Pulse-width</span></span>
<span class="line"><span>modulatorCompensator</span></span>
<span class="line"><span>v(t)= f(vg, i load,d )</span></span>
<span class="line"><span>Fig. 9.2 Feedback loop for regulation of the output voltage: (a) buck converter, with feedback loop block</span></span>
<span class="line"><span>diagram; (b) functional block diagram of the feedback system</span></span>
<span class="line"><span>gains in the forward path of the feedback loop. So the loop gain magnitude ∥ T∥ is a measure</span></span>
<span class="line"><span>of how well the feedback system works. All of these gains can be easily constructed using the</span></span>
<span class="line"><span>algebra-on-the-graph method; this allows easy evaluation of important closed-loop performance</span></span>
<span class="line"><span>measures, such as the output voltage ripple resulting from 120 Hz rectiﬁcation ripple in vg(t)o r</span></span>
<span class="line"><span>the closed-loop output impedance.</span></span>
<span class="line"><span>Stability is another important issue in feedback systems. Adding a feedback loop can cause</span></span>
<span class="line"><span>an otherwise well-behaved circuit to exhibit oscillations, ringing and overshoot, and other unde-</span></span>
<span class="line"><span>sirable behavior. An in-depth treatment of stability is beyond the scope of this book; however,</span></span>
<span class="line"><span>the simple phase margin criterion for assessing stability is used here. When the phase margin</span></span>
<span class="line"><span>of the loop gain T is positive, then the feedback system is stable. Moreover, increasing the</span></span>
<span class="line"><span>phase margin causes the system transient response to be better behaved, with less overshoot and</span></span>
<span class="line"><span>ringing. The relation between phase margin and closed-loop response is quantiﬁed in Sect. 9.4.</span></span>
<span class="line"><span>An example is given in Sect. 9.5, in which a compensator network is designed for a dc reg-</span></span>
<span class="line"><span>ulator system. The compensator network is designed to attain adequate phase margin and good</span></span>
<span class="line"><span></span></span>
<span class="line"><span>350 9 Controller Design</span></span>
<span class="line"><span>rejection of expected disturbances. Lead compensators andP–D controllers are used to improve</span></span>
<span class="line"><span>the phase margin and extend the bandwidth of the feedback loop. This leads to better rejection</span></span>
<span class="line"><span>of high-frequency disturbances. Lag compensators and P–I controllers are used to increase the</span></span>
<span class="line"><span>low-frequency loop gain. This leads to better rejection of low-frequency disturbances and very</span></span>
<span class="line"><span>small steady-state error. More complicated compensators can achieve the advantages of both</span></span>
<span class="line"><span>approaches.</span></span>
<span class="line"><span>Injection methods for experimental measurement of loop gain are introduced in Sect. 9.6.</span></span>
<span class="line"><span>The use of voltage or current injection solves the problem of establishing the correct quiescent</span></span>
<span class="line"><span>operating point in high-gain systems. Conditions for obtaining an accurate measurement are</span></span>
<span class="line"><span>exposed. The injection method also allows measurement of the loop gains of unstable systems.</span></span>
<span class="line"><span>9.2 Eﬀect of Negative Feedback on the Network Transfer Functions</span></span>
<span class="line"><span>We have seen how to derive the small-signal ac transfer functions of a switching converter. For</span></span>
<span class="line"><span>example, the equivalent circuit model of the buck converter can be written as in Fig. 9.3.T h i s</span></span>
<span class="line"><span>equivalent circuit contains three independent inputs: the control input variations ˆd, the power</span></span>
<span class="line"><span>input voltage variations ˆvg, and the load current variations ˆiload. The output voltage variation ˆv</span></span>
<span class="line"><span>can therefore be expressed as a linear combination of the three independent inputs, as follows:</span></span>
<span class="line"><span>ˆv(s)= Gvd(s) ˆd(s)+ Gvg(s)ˆvg(s)−Zout(s) ˆi load(s) (9.1)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Gvd(s)= ˆv(s)</span></span>
<span class="line"><span>ˆd(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>ˆiload=0</span></span>
<span class="line"><span>converter control-to-output transfer function (9.1a)</span></span>
<span class="line"><span>Gvg(s)= ˆv(s)</span></span>
<span class="line"><span>ˆvg(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆd=0</span></span>
<span class="line"><span>ˆiload=0</span></span>
<span class="line"><span>converter line-to-output transfer function (9.1b)</span></span>
<span class="line"><span>Zout(s)=−ˆv(s)</span></span>
<span class="line"><span>ˆiload(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>ˆd=0</span></span>
<span class="line"><span>converter output impedance (9.1c)</span></span>
<span class="line"><span>The Bode diagrams of these quantities are constructed in Chap.8. Equation (9.1) describes how</span></span>
<span class="line"><span>disturbances vg and iload propagate to the output v, through the transfer function Gvg(s) and the</span></span>
<span class="line"><span>output impedance Zout(s). If the disturbances vg and iload are known to have some maximum</span></span>
<span class="line"><span>worst-case amplitude, then Eq. (9.1) can be used to compute the resulting worst-case open-loop</span></span>
<span class="line"><span>variation in v.</span></span>
<span class="line"><span>As described previously, the feedback loop of Fig. 9.2 can be used to reduce the inﬂuences</span></span>
<span class="line"><span>of vg and iload on the output v. To analyze this system, let us perturb and linearize its aver-</span></span>
<span class="line"><span>aged signals about their quiescent operating points. Both the power stage and the control block</span></span>
<span class="line"><span>diagram are perturbed and linearized:</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>re f (t)= Vre f+ ˆvre f (t) (9.2)</span></span>
<span class="line"><span>ve(t)= Ve+ ˆve(t)</span></span>
<span class="line"><span>etc.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.2 Eﬀect of Negative Feedback on the Network Transfer Functions 351</span></span>
<span class="line"><span>Fig. 9.3 Small-signal converter model, which represents variations in vg, d,a n diload</span></span>
<span class="line"><span>In a dc regulator system, the reference input is constant, so ˆvre f (t)= 0. In a switching ampliﬁer</span></span>
<span class="line"><span>or dc–ac inverter, the reference input may contain an ac variation. In Fig. 9.4a, the converter</span></span>
<span class="line"><span>model of Fig. 9.3 is combined with the perturbed and linearized control circuit block diagram.</span></span>
<span class="line"><span>This is equivalent to the reduced block diagram of Fig. 9.4b, in which the converter model has</span></span>
<span class="line"><span>been replaced by blocks representing Eq. (9.1).</span></span>
<span class="line"><span>Solution of Fig. 9.4b for the output voltage variation v yields</span></span>
<span class="line"><span>ˆv= ˆvre f</span></span>
<span class="line"><span>GcGvd/VM</span></span>
<span class="line"><span>1+ HGcGvd/VM</span></span>
<span class="line"><span>+ ˆvg</span></span>
<span class="line"><span>Gvg</span></span>
<span class="line"><span>1+ HGcGvd/VM</span></span>
<span class="line"><span>−ˆiload</span></span>
<span class="line"><span>Zout</span></span>
<span class="line"><span>1+ HGcGvd/VM</span></span>
<span class="line"><span>(9.3)</span></span>
<span class="line"><span>which can be written in the form</span></span>
<span class="line"><span>ˆv= ˆvre f</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ ˆvg</span></span>
<span class="line"><span>Gvg</span></span>
<span class="line"><span>1+ T−ˆiload</span></span>
<span class="line"><span>Zout</span></span>
<span class="line"><span>1+ T (9.4)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>T(s)= H(s)Gc(s)Gvd(s)/VM = “loop gain”</span></span>
<span class="line"><span>Equation (9.4) is a general result. The loop gain T(s) is deﬁned in general as the product of the</span></span>
<span class="line"><span>gains around the forward and feedback paths of the loop. This equation shows how the addition</span></span>
<span class="line"><span>of a feedback loop modiﬁes the transfer functions and performance of the system, as described</span></span>
<span class="line"><span>in detail below.</span></span>
<span class="line"><span>9.2.1 Feedback Reduces the Transfer Functions from Disturbances to the Output</span></span>
<span class="line"><span>The transfer function from vg to v in the open-loop buck converter of Fig.9.3 is Gvg(s), as given</span></span>
<span class="line"><span>in Eq. (9.1). When feedback is added, this transfer function becomes</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvg(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>ˆiload=0</span></span>
<span class="line"><span>= Gvg(s)</span></span>
<span class="line"><span>1+ T(s) (9.5)</span></span>
<span class="line"><span>from Eq. (9.4). So this transfer function is reduced via feedback by the factor 1/(1+T(s)). If the</span></span>
<span class="line"><span>loop gain T(s) is large in magnitude, then the reduction can be substantial. Hence, the output</span></span>
<span class="line"><span>voltage variation v resulting from a given vg variation is attenuated by the feedback loop.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>352 9 Controller Design</span></span>
<span class="line"><span>Fig. 9.4 V oltage regulator system small-signal model: (a) with converter equivalent circuit; (b) complete</span></span>
<span class="line"><span>block diagram</span></span>
<span class="line"><span>Equation (9.4) also predicts that the converter output impedance is reduced, from Zout(s)t o</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>−ˆiload(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>= Zout(s)</span></span>
<span class="line"><span>1+ T(s) (9.6)</span></span>
<span class="line"><span>So the feedback loop also reduces the converter output impedance by a factor of 1/(1+ T(s)),</span></span>
<span class="line"><span>and the inﬂuence of load current variations on the output voltage is reduced.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.3 Construction of 1/(1+ T)a n dT/(1+ T) 353</span></span>
<span class="line"><span>9.2.2 Feedback Causes the Transfer Function from the Reference Input to the Output</span></span>
<span class="line"><span>to Be Insensitive to Variations in the Gains in the Forward Path of the Loop</span></span>
<span class="line"><span>According to Eq. (9.4), the closed-loop transfer function from vre f to v is</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvre f (s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>ˆiload=0</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>T(s)</span></span>
<span class="line"><span>1+ T(s) (9.7)</span></span>
<span class="line"><span>If the loop gain is large in magnitude, that is, ∥ T∥≫ 1, then (1+ T)≈T and T/(1+ T)≈</span></span>
<span class="line"><span>T/T= 1. The transfer function then becomes</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvre f (s)≈1</span></span>
<span class="line"><span>H(s) (9.8)</span></span>
<span class="line"><span>which is independent of Gc(s), VM, and Gvd(s). So provided that the loop gain is large in mag-</span></span>
<span class="line"><span>nitude, then variations in Gc(s), VM, and Gvd(s) have negligible eﬀect on the output voltage. Of</span></span>
<span class="line"><span>course, in the dc regulator application, vre f (t) is constant and ˆvre f = 0. But Eq. ( 9.8) applies</span></span>
<span class="line"><span>equally well to the dc values. For example, if the system is linear, then we can write</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Vre f</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>H(0)</span></span>
<span class="line"><span>T(0)</span></span>
<span class="line"><span>1+ T(0)≈1</span></span>
<span class="line"><span>H(0) (9.9)</span></span>
<span class="line"><span>So to make the dc output voltageV accurately follow the dc referenceVre f′ we need only ensure</span></span>
<span class="line"><span>that the dc sensor gain H(0) and dc reference Vre f are well known and accurate, and thatT(0) is</span></span>
<span class="line"><span>large. Precision resistors are normally used to realizeH, but components with tightly controlled</span></span>
<span class="line"><span>values need not be used in Gc, the pulse-width modulator, or the power stage. The sensitivity of</span></span>
<span class="line"><span>the output voltage to the gains in the forward path is reduced, while the sensitivity of v to the</span></span>
<span class="line"><span>feedback gain H and the reference input vre f is increased.</span></span>
<span class="line"><span>9.3 Construction of the Important Quantities 1/(1+ T)a n dT/(1+ T)</span></span>
<span class="line"><span>and the Closed-Loop Transfer Functions</span></span>
<span class="line"><span>The transfer functions in Eqs. (9.4)t o( 9.9) can be easily constructed using the algebra-on-the-</span></span>
<span class="line"><span>graph method [81]. Let us assume that we have analyzed the blocks in our feedback system, and</span></span>
<span class="line"><span>have plotted the Bode diagram of∥ T(s)∥. To use a concrete example, suppose that the result is</span></span>
<span class="line"><span>given in Fig. 9.5,f o rw h i c hT(s)i s</span></span>
<span class="line"><span>T(s)= T0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωz</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝1+ s</span></span>
<span class="line"><span>Qωp1.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦ s</span></span>
<span class="line"><span>ωp1</span></span>
<span class="line"><span>)2⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp2</span></span>
<span class="line"><span>) (9.10)</span></span>
<span class="line"><span>This example appears somewhat complicated. But the loop gains of practical voltage regulators</span></span>
<span class="line"><span>are often even more complex, and may contain four, ﬁve, or more poles. Evaluation of Eqs. (9.5)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>354 9 Controller Design</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>QdB| T0 |dB</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fc fp2</span></span>
<span class="line"><span>Crossover</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>Fig. 9.5 Magnitude of the loop gain example, Eq. (9.10)</span></span>
<span class="line"><span>to (9.7), to determine the closed-loop transfer functions, requires quite a bit of work. The loop</span></span>
<span class="line"><span>gain T must be added to 1, and the resulting numerator and denominator must be refactored.</span></span>
<span class="line"><span>Using this approach, it is diﬃcult to obtain physical insight into the relationship between the</span></span>
<span class="line"><span>closed-loop transfer functions and the loop gain. In consequence, design of the feedback loop</span></span>
<span class="line"><span>to meet speciﬁcations is diﬃcult.</span></span>
<span class="line"><span>Using the algebra-on-the-graph method, the closed-loop transfer functions can be con-</span></span>
<span class="line"><span>structed by inspection, and hence the relation between these transfer functions and the loop gain</span></span>
<span class="line"><span>becomes obvious. Let us ﬁrst investigate how to plot∥T/(1+ T)∥. It can be seen from Fig. 9.5</span></span>
<span class="line"><span>that there is a frequency f</span></span>
<span class="line"><span>c, called the “crossover frequency,” where∥T∥= 1. At frequencies</span></span>
<span class="line"><span>less than fc,∥T∥&gt; 1; indeed,∥T∥≫ 1f o r f≪ fc. Hence, at low frequency, (1+ T)≈T, and</span></span>
<span class="line"><span>T/(1+ T)≈T/T= 1. At frequencies greater than fc,∥T∥&lt; 1, and∥T∥≪ 1f o r f≫ fc.S oa t</span></span>
<span class="line"><span>high frequency, (1+ T)≈1 and T/(1+ T)≈T/1= T.S ow eh a v e</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T ≈</span></span>
<span class="line"><span>{1f o r∥T∥≫ 1</span></span>
<span class="line"><span>T for∥T∥≪ 1 (9.11)</span></span>
<span class="line"><span>The asymptotes corresponding to Eq. (9.11) are relatively easy to construct. The low-frequency</span></span>
<span class="line"><span>asymptote, for f&lt; fc, is 1 or 0 dB. The high-frequency asymptotes, for f&gt; fc, follow T.T h e</span></span>
<span class="line"><span>result is shown in Fig. 9.6.</span></span>
<span class="line"><span>So at low frequency, where∥ T∥ is large, the reference-to-output transfer function is</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvre f (s)= 1</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>T(s)</span></span>
<span class="line"><span>1+ T(s)≈1</span></span>
<span class="line"><span>H(s) (9.12)</span></span>
<span class="line"><span>This is the desired behavior, and the feedback loop works well at frequencies where ∥ T∥ is</span></span>
<span class="line"><span>large. At high frequency (f≫ fc) where∥ T∥ is small, the reference-to-output transfer function</span></span>
<span class="line"><span>is</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvre f (s)= 1</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>T(s)</span></span>
<span class="line"><span>1+ T(s)≈T(s)</span></span>
<span class="line"><span>H(s)= Gc(s)Gvd(s)</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>(9.13)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.3 Construction of 1/(1+ T)a n dT/(1+ T) 355</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>fp2</span></span>
<span class="line"><span>Crossover</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>Fig. 9.6 Graphical construction of the asymptotes of∥T/(1+ T)∥. Exact curves are omitted</span></span>
<span class="line"><span>This is not the desired behavior; in fact, this is the gain with the feedback connection removed</span></span>
<span class="line"><span>(H→0). At high frequencies, the feedback loop is unable to reject the disturbance because the</span></span>
<span class="line"><span>bandwidth of T is limited. The reference-to-output transfer function can be constructed on the</span></span>
<span class="line"><span>graph by multiplying the T/(1+ T) asymptotes of Fig. 9.6 by 1/H.</span></span>
<span class="line"><span>Thus, the crossover frequency fc represents the bandwidth of the feedback system, and</span></span>
<span class="line"><span>within this bandwidth the closed-loop behavior is improved. Further, it can be observed from</span></span>
<span class="line"><span>Fig. 9.6 that feedback moves the poles of the system:T contains two poles at frequency fp1 that</span></span>
<span class="line"><span>are not present in T/(1+ T), and instead T/(1+ T) contains a pole at frequency fc. It can be</span></span>
<span class="line"><span>shown that one of the poles of T is moved from frequency fp1 to approximately fz, where it</span></span>
<span class="line"><span>cancels the zero. The second pole at fp1 is moved to approximately fc. Figure 9.6 illustrates</span></span>
<span class="line"><span>how, within the bandwidth of the feedback loop, the frequencies of the poles are increased and</span></span>
<span class="line"><span>their Q–factors are changed.</span></span>
<span class="line"><span>We can plot the asymptotes of ∥1/(1+ T)∥ using similar arguments. At low frequencies</span></span>
<span class="line"><span>where∥T∥≫ 1, then (1+ T)≈T, and hence 1/(1+ T)≈1/T At high frequencies where</span></span>
<span class="line"><span>∥T∥≪ 1, then (1+ T)≈1 and 1/(1+ T)≈1. So we have</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T(s)≈</span></span>
<span class="line"><span>⎧⎪⎪⎪⎨⎪⎪⎪</span></span>
<span class="line"><span>⎩</span></span>
<span class="line"><span>1T(s) for</span></span>
<span class="line"><span></span></span>
<span class="line"><span>T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>≫ 1</span></span>
<span class="line"><span>1f o r</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>≪ 1</span></span>
<span class="line"><span>(9.14)</span></span>
<span class="line"><span>The asymptotes for the T(s) example of Fig. 9.5 are plotted in Fig. 9.7.</span></span>
<span class="line"><span>At low frequencies where∥ T∥ is large, the disturbance transfer function from v</span></span>
<span class="line"><span>g to v is</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvg(s)= Gvg(s)</span></span>
<span class="line"><span>1+ T(s)≈Gvg(s)</span></span>
<span class="line"><span>T(s) (9.15)</span></span>
<span class="line"><span>Again, Gvg(s) is the original transfer function, with no feedback. The closed-loop transfer func-</span></span>
<span class="line"><span>tion has magnitude reduced by the factor 1/∥T∥. So if, for example, we want to reduce this trans-</span></span>
<span class="line"><span>fer function by a factor of 20 at 120 Hz, then we need a loop gain∥ T∥ of at least 20⇒26 dB</span></span>
<span class="line"><span>at 120 Hz. The disturbance transfer function from vg to v can be constructed on the graph, by</span></span>
<span class="line"><span>multiplying the asymptotes of Fig. 9.7 by the asymptotes for Gvg(s).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>356 9 Controller Design</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>QdB|T0 |dB</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fc fp2</span></span>
<span class="line"><span>Crossover</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>QdB</span></span>
<span class="line"><span>| T0 |dB fp1</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>+ 40 dB/decade</span></span>
<span class="line"><span>+ 20 dB/decade</span></span>
<span class="line"><span>Fig. 9.7 Graphical construction of∥1/(1+ T)∥</span></span>
<span class="line"><span>Similar arguments apply to the output impedance. The closed-loop output impedance at low</span></span>
<span class="line"><span>frequencies is</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>−ˆiload(s)</span></span>
<span class="line"><span>= Zout(s)</span></span>
<span class="line"><span>1+ T(s)≈Zout(s)</span></span>
<span class="line"><span>T(s) (9.16)</span></span>
<span class="line"><span>The output impedance is also reduced in magnitude by a factor of 1/∥T∥ at frequencies below</span></span>
<span class="line"><span>the crossover frequency.</span></span>
<span class="line"><span>At high frequencies ( f&gt; fc) where∥ T∥ is small, then 1/(1+ T)≈1, and</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvg(s)= Gvg(s)</span></span>
<span class="line"><span>1+ T(s)≈Gvg(s)</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>−ˆiload(s)</span></span>
<span class="line"><span>= Zout(s)</span></span>
<span class="line"><span>1+ T(s)≈Zout(s)</span></span>
<span class="line"><span>(9.17)</span></span>
<span class="line"><span>This is the same as the original disturbance transfer function and output impedance. So the</span></span>
<span class="line"><span>feedback loop has essentially no eﬀect on the disturbance transfer functions at frequencies above</span></span>
<span class="line"><span>the crossover frequency.</span></span>
<span class="line"><span>Figure 9.8a illustrates an example of a buck converter having a loop gain T(s) given by</span></span>
<span class="line"><span>T(s)= H(s)Gvd(s)/VM (9.18)</span></span>
<span class="line"><span>This simple example contains no compensator. The L–C ﬁlter of the buck converter introduces</span></span>
<span class="line"><span>resonant poles at frequency f = fp1, and the capacitor equivalent series resistance RC leads</span></span>
<span class="line"><span>to a zero at frequency fz. The feedback sensor block H(s) contains a high-frequency pole at</span></span>
<span class="line"><span>f= fp2. Hence, this example exhibits a loop gainT(s) identical to Eq. (9.10); let us assume that</span></span>
<span class="line"><span>the element values lead to the magnitude plotted in Fig. 9.5. Hence, the quantity∥1/(1+ T)∥ is</span></span>
<span class="line"><span>given by the plot of Fig. 9.7.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.3 Construction of 1/(1+ T)a n dT/(1+ T) 357</span></span>
<span class="line"><span>Fig. 9.8 Construction of the closed-loop output impedance of a simple buck regulator: ( a) feedback</span></span>
<span class="line"><span>system, (b) open-loop (solid line) and closed-loop (dashed line) output impedance asymptotes</span></span>
<span class="line"><span>We can construct the Bode plot of the open-loop output impedance Zout by setting ˆvg and ˆd</span></span>
<span class="line"><span>to zero in Fig. 9.8a and then ﬁnding the impedance between the output terminals; the result is:</span></span>
<span class="line"><span>Zout(s)= sL</span></span>
<span class="line"><span> R</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>RC+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(9.19)</span></span>
<span class="line"><span>The approximate Bode diagram of the open-loop output impedance is constructed in Fig. 9.8b,</span></span>
<span class="line"><span>for the typical case withRC ≪ R. The closed-loop output impedance is next constructed by mul-</span></span>
<span class="line"><span>tiplying the open-loop output impedance of Fig. 9.8bb yt h e∥1/(1+ T)∥ asymptotes of Fig. 9.7,</span></span>
<span class="line"><span>with the result illustrated in Fig. 9.8b. At frequencies greater than the crossover frequency fc,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>358 9 Controller Design</span></span>
<span class="line"><span>the output impedance is unaﬀected by the feedback loop. At frequencies immediately below</span></span>
<span class="line"><span>fc, the feedback loop reduces the output impedance and the ∥1/(1+ T)∥ term introduces a</span></span>
<span class="line"><span>+ 20 dB/decade slope to∥Zout/(1+ T)∥.A t f = fz, the zero of Zout is cancelled by the pole of</span></span>
<span class="line"><span>1/(1+ T), and hence no change in slope is observed in the closed-loop output impedance plot.</span></span>
<span class="line"><span>Likewise, at f= fp1, the resonant poles ofZout are cancelled by the resonant zeroes of 1/(1+T),</span></span>
<span class="line"><span>and again there is no change in the slope of ∥Zout/(1+ T)∥. These cancellations occur because</span></span>
<span class="line"><span>the power stage circuit introduces the same poles into Gvd(s) and Zout(s).</span></span>
<span class="line"><span>Another example is given later in this chapter, in which a feedback compensator circuit</span></span>
<span class="line"><span>introduces poles and zeroes into T(s) that are not present in Zout(s). As a result, the closed-</span></span>
<span class="line"><span>loop output impedance exhibits poles and zeroes induced by the compensator dynamics within</span></span>
<span class="line"><span>∥1/(1+ T)∥.</span></span>
<span class="line"><span>9.4 Stability</span></span>
<span class="line"><span>It is well known that adding a feedback loop can cause an otherwise stable system to become</span></span>
<span class="line"><span>unstable. Even though the transfer functions of the original converter, Eq. ( 9.1), as well as of</span></span>
<span class="line"><span>the loop gain T(s), contain no right half-plane poles, it is possible for the closed-loop transfer</span></span>
<span class="line"><span>functions of Eq. (9.4) to contain right half-plane poles. The feedback loop then fails to regulate</span></span>
<span class="line"><span>the system at the desired quiescent operating point, and oscillations are usually observed. It is</span></span>
<span class="line"><span>important to avoid this situation. And even when the feedback system is stable, it is possible</span></span>
<span class="line"><span>for the transient response to exhibit undesirable ringing and overshoot. The stability problem</span></span>
<span class="line"><span>is discussed in this section, and a method for ensuring that the feedback system is stable and</span></span>
<span class="line"><span>well-behaved is explained.</span></span>
<span class="line"><span>When feedback destabilizes the system, the denominator (1+T(s)) terms in Eq. (9.4) contain</span></span>
<span class="line"><span>roots in the right half-plane (i.e., with positive real parts). If T(s) is a rational fraction, that is,</span></span>
<span class="line"><span>the ratio N(s)/D(s) of two polynomial functions N(s) and D(s), then we can write</span></span>
<span class="line"><span>T(s)</span></span>
<span class="line"><span>1+ T(s)=</span></span>
<span class="line"><span>N(s)</span></span>
<span class="line"><span>D(s)</span></span>
<span class="line"><span>1+ N(s)</span></span>
<span class="line"><span>D(s)</span></span>
<span class="line"><span>= N(s)</span></span>
<span class="line"><span>N(s)+ D(s)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T(s)= 1</span></span>
<span class="line"><span>1+ N(s)</span></span>
<span class="line"><span>D(s)</span></span>
<span class="line"><span>= D(s)</span></span>
<span class="line"><span>N(s)+ D(s)</span></span>
<span class="line"><span>(9.20)</span></span>
<span class="line"><span>So T(s)/(1+T(s)) and 1/(1+T(s)) contain the same poles, given by the roots of the polynomial</span></span>
<span class="line"><span>(N(s)+ D(s)). A brute-force test for stability is to evaluate (N(s)+ D(s)), and factor the result to</span></span>
<span class="line"><span>see whether any of the roots have positive real parts. However, for all but very simple loop gains,</span></span>
<span class="line"><span>this involves a great deal of work. A more illuminating method is given by the Nyquist stability</span></span>
<span class="line"><span>theorem, in which the number of right half-plane roots of ( N(s)+ D(s)) can be determined</span></span>
<span class="line"><span>by testing T(s)[ 82, 83]. This theorem is discussed in Sect. 9.4.2. Often, a special case of the</span></span>
<span class="line"><span>theorem known as the phase margin test is suﬃcient for designing most voltage regulators; the</span></span>
<span class="line"><span>simpler phase margin test is discussed ﬁrst.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 359</span></span>
<span class="line"><span>9.4.1 The Phase Margin Test</span></span>
<span class="line"><span>The crossover frequency fc is deﬁned as the frequency where the magnitude of the loop gain is</span></span>
<span class="line"><span>unity:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>T ( j2πf</span></span>
<span class="line"><span>c)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= 1⇒0 dB (9.21)</span></span>
<span class="line"><span>To compute the phase marginϕ</span></span>
<span class="line"><span>m, the phase of the loop gain T is evaluated at the crossover</span></span>
<span class="line"><span>frequency, and 180◦is added. Hence,</span></span>
<span class="line"><span>ϕm= 180◦+∠T( j2πfc) (9.22)</span></span>
<span class="line"><span>If there is exactly one crossover frequency, and if the loop gainT(s) contains no right half-plane</span></span>
<span class="line"><span>poles, then the quantities 1/(1 + T) and T/(1 + T) contain no right half-plane poles when</span></span>
<span class="line"><span>the deﬁned in Eq. ( 9.22) is positive. Thus, using a simple test on T(s), we can determine the</span></span>
<span class="line"><span>stability of T/(1+ T) and 1/(1+ T). This is an easy-to-use design tool—we simply ensure that</span></span>
<span class="line"><span>the phase of T is greater than−180◦at the crossover frequency.</span></span>
<span class="line"><span>When there are multiple crossover frequencies, the phase margin test may be ambiguous.</span></span>
<span class="line"><span>Also, when T contains right half-plane poles (i.e., the original open-loop system is unstable),</span></span>
<span class="line"><span>then the phase margin test cannot be used. In either case, the more general Nyquist stability</span></span>
<span class="line"><span>theorem (Sect. 9.4.2) must be employed.</span></span>
<span class="line"><span>The loop gain of a typical stable system is shown in Fig.9.9. It can be seen that∠T( j2πfc)=</span></span>
<span class="line"><span>−112◦. Hence, ϕm = 180◦−112◦=+ 68◦. Since the phase margin is positive, T/(1+ T) and</span></span>
<span class="line"><span>1/(1+ T) contain no right half-plane poles, and the feedback system is stable.</span></span>
<span class="line"><span>The loop gain of an unstable system is sketched in Fig.9.10. For this example,∠T( j2πfc)=</span></span>
<span class="line"><span>−230◦. The phase margin isϕm= 180◦−230◦=−50◦. The negative phase margin implies that</span></span>
<span class="line"><span>T/(1+ T) and 1/(1+ T) each contain at least one right half-plane pole.</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>Crossover</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span> T T</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span>Fig. 9.9 Magnitude and phase of the loop gain of a stable system. The phase marginϕm is positive</span></span>
<span class="line"><span></span></span>
<span class="line"><span>360 9 Controller Design</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>Crossover</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>fp2 0 T</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span>m (&lt; 0)</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span> T T</span></span>
<span class="line"><span>Fig. 9.10 Magnitude and phase of the loop gain of an unstable system. The phase marginϕm is negative</span></span>
<span class="line"><span>9.4.2 The Nyquist Stability Criterion</span></span>
<span class="line"><span>The Nyquist Stability Criterion is a rigorous and general technique to evaluate stability of a</span></span>
<span class="line"><span>closed-loop system, based on its loop gain. This technique determines the number of poles of</span></span>
<span class="line"><span>the closed-loop transfer functionsT/(1+T) and 1/(1+T) that lie in the right half of the complex</span></span>
<span class="line"><span>s-plane, based on a plot of the loop gain T(s) that can be derived from its Bode plot. The phase</span></span>
<span class="line"><span>margin test of Sect. 9.4.1 is based on the Nyquist plot, and is a useful but not entirely general</span></span>
<span class="line"><span>test for stability. In some cases, including several encountered later in this textbook, the more</span></span>
<span class="line"><span>general Nyquist stability test must be employed.</span></span>
<span class="line"><span>The Nyquist Stability Criterion is based on the conformal mapping of a contour Γthat</span></span>
<span class="line"><span>encloses the right half (positive real portion) of the complex s-plane. The contour is mapped</span></span>
<span class="line"><span>through the loop gain transfer function T(s). Encirclements of the −1 point by the mapped</span></span>
<span class="line"><span>contour are employed to count the number of right half-plane poles that are present in the</span></span>
<span class="line"><span>closed-loop transfer functions. The subsections below present a derivation, the precise rules for</span></span>
<span class="line"><span>application, and some important examples.</span></span>
<span class="line"><span>The Principle of the Argument</span></span>
<span class="line"><span>Let us consider a transfer function T(s) having a zero at s= s</span></span>
<span class="line"><span>1:</span></span>
<span class="line"><span>T(s)= (s−s1) (9.23)</span></span>
<span class="line"><span>Let us also consider a closed contour Γin the complex s-plane that encircles the point s1 as</span></span>
<span class="line"><span>illustrated in Fig. 9.11a. The complex variable s is varied to follow the path Γ, beginning at</span></span>
<span class="line"><span>some point a and proceeding around the contour in the clockwise direction through points b, c,</span></span>
<span class="line"><span>and back to a. For the example T(s)o fE q . (9.23), the value of T(s) at some point s is seen to</span></span>
<span class="line"><span>be the vector extending from s1 to s, having magnitude and phase as illustrated in Fig. 9.11a.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 361</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Re(s)</span></span>
<span class="line"><span>Im(s)</span></span>
<span class="line"><span>s1</span></span>
<span class="line"><span>Contour</span></span>
<span class="line"><span>a</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Re(T(s))</span></span>
<span class="line"><span>Im(T(s))</span></span>
<span class="line"><span>T ()</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>s0 ab c a</span></span>
<span class="line"><span>Position along</span></span>
<span class="line"><span>ContourT</span></span>
<span class="line"><span>T T T T</span></span>
<span class="line"><span>Fig. 9.11 Principle of the argument, example 1: ( a) a closed contour Γin the complex s plane, ( b)</span></span>
<span class="line"><span>mapping of the contour Γthrough the transfer function T(s)o fE q . (9.23), (c) variation of the phase of</span></span>
<span class="line"><span>T(s), as s varies around the contourΓ</span></span>
<span class="line"><span>As sketched in Fig.9.11c, at s= a the phase∠T is 0◦.A s s varies along the contour, through</span></span>
<span class="line"><span>b, c, and then back toa, the phase∠T decreases, and becomes−360◦after one complete traverse</span></span>
<span class="line"><span>of contourΓ. This net phase change of−360◦indicates that the zero at s1 lies inside contourΓ.</span></span>
<span class="line"><span>Figure 9.11b contains a plot of T(s)a s s varies around the contour Γ; the magnitude∥T∥</span></span>
<span class="line"><span>and phase ∠T are identiﬁed and are identical to the quantities identiﬁed in Fig. 9.11a. This</span></span>
<span class="line"><span>plot is a conformal mapping of the contour Γthrough the transfer function T(s); conformal</span></span>
<span class="line"><span>mappings preserve local angles. The mapped contourT(Γ) encircles the origin of theT(s) plane,</span></span>
<span class="line"><span>as indicated by the net change of−360◦in∠T(s).</span></span>
<span class="line"><span>Figure 9.12a illustrates a second contourΓ′ that does not enclose the zero of T(s)a t s1.A s</span></span>
<span class="line"><span>illustrated in Fig. 9.12c, after one complete traverse of contourΓ′, the net change in∠T is zero.</span></span>
<span class="line"><span>The mapped contour T(Γ′) is illustrated in Fig. 9.12b; this contour does not encircle the origin</span></span>
<span class="line"><span>of the T(s) plane.</span></span>
<span class="line"><span>The phase of a complex function is sometimes referred to as its argument. Cauchy’s princi-</span></span>
<span class="line"><span>ple of the argument tells us that when the closed contourΓencloses the zero s1, then the phase</span></span>
<span class="line"><span>∠T(s) exhibits a net change of −360◦as s traversesΓonce in the clockwise direction. This is</span></span>
<span class="line"><span>equivalent to saying that the mapped contour T(Γ) encircles the origin of the T plane.</span></span>
<span class="line"><span>Next let us consider a transfer function T(s) that contains multiple poles and zeroes:</span></span>
<span class="line"><span>T(s)= Tre f</span></span>
<span class="line"><span>(s−z1)( s−z2)···</span></span>
<span class="line"><span>(s−p1)( s−p2)··· (9.24)</span></span>
<span class="line"><span>As usual, we can express the phase of T(s) as a sum of terms that arise from each zero or pole,</span></span>
<span class="line"><span>as follows:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>362 9 Controller Design</span></span>
<span class="line"><span>Fig. 9.12 Principle of the argument, example 2: ( a) a closed contour Γ′ in the complex s plane, ( b)</span></span>
<span class="line"><span>mapping of the contourΓ′ through the transfer function T(s)o fE q . (9.23), (c) variation of the phase of</span></span>
<span class="line"><span>T(s), as s varies around the contourΓ′. Since the zero at s= s1 does not lie inside contourΓ′, there is no</span></span>
<span class="line"><span>net change in the phase of T, and the mapped contour T(Γ′) does not encircle the origin of the T plane</span></span>
<span class="line"><span>∠T(s)=∠(s−z1)+∠(s−z2)+···−∠(s−p1)−∠(s−p2)−··· (9.25)</span></span>
<span class="line"><span>We can again deﬁne a closed contourΓin the complex s plane, and examine how the phaseT(s)</span></span>
<span class="line"><span>changes as s traverses the contour once in the clockwise direction. Each zero of T(s) that lies</span></span>
<span class="line"><span>inside the contour will cause a net change of −360◦in∠T, and each pole of T(s) lying inside</span></span>
<span class="line"><span>the contour will cause a net change of+360◦in∠T. If a total of Z zeroes and P poles lie inside</span></span>
<span class="line"><span>the contourΓ, then∠T will exhibit a net phase shift of−N360◦, where</span></span>
<span class="line"><span>N= Z−P (9.26)</span></span>
<span class="line"><span>The mapped contour T(Γ) will encircle the origin of the T(s) plane N times in the clockwise</span></span>
<span class="line"><span>direction.</span></span>
<span class="line"><span>Thus, the principle of the argument provides us with a tool to determine the number of poles</span></span>
<span class="line"><span>and zeroes that lie inside a contourΓ.</span></span>
<span class="line"><span>The Nyquist Contour</span></span>
<span class="line"><span>It is desired to determine whether the closed-loop transfer functions of Eq. ( 9.20) contain un-</span></span>
<span class="line"><span>stable poles that lie in the right half of the complex plane. To accomplish this, we can deﬁne a</span></span>
<span class="line"><span>contourΓthat encloses the complete right half-plane, then employ the principle of the argument</span></span>
<span class="line"><span>to test the number of closed-loop poles that are enclosed by this contour.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 363</span></span>
<span class="line"><span>Fig. 9.13 The Nyquist contour, which encloses the</span></span>
<span class="line"><span>right half of the complex s plane</span></span>
<span class="line"><span>Im(s)</span></span>
<span class="line"><span>Re(s)</span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>Figure 9.13 illustrates a contourΓcalled the Nyquist contour. This contour is traversed in</span></span>
<span class="line"><span>the clockwise direction, and the region enclosed to the right of the contour is the right half of the</span></span>
<span class="line"><span>complex s plane. The Nyquist contour is comprised of three parts. Segment Γ</span></span>
<span class="line"><span>A is the positive</span></span>
<span class="line"><span>part of the imaginary axis, in which</span></span>
<span class="line"><span>s= jω with ω∈(0,∞) (9.27)</span></span>
<span class="line"><span>SegmentΓB can be chosen to be a semicircular arc that lies to the right of all closed-loop poles,</span></span>
<span class="line"><span>deﬁned as follows:</span></span>
<span class="line"><span>s= Rejθ with R→∞and θ∈(+90◦,−90◦) (9.28)</span></span>
<span class="line"><span>SegmentΓC is the negative part of the imaginary axis, in which</span></span>
<span class="line"><span>s=−jω with ω∈(∞, 0) (9.29)</span></span>
<span class="line"><span>SegmentΓC is the complex conjugate of segmentΓA.</span></span>
<span class="line"><span>If a transfer function F(s) contains Z zeroes and P poles in the right half of the complex</span></span>
<span class="line"><span>plane, then the mapping F(Γ) of the Nyquist contour will encircle the origin of the F(s) plane</span></span>
<span class="line"><span>N= (Z−P) times.</span></span>
<span class="line"><span>Stability Test</span></span>
<span class="line"><span>The closed-loop transfer functions of Eq. (9.20) contain the denominator polynomialN(s)+D(s),</span></span>
<span class="line"><span>whose roots are the closed-loop poles. It is desired to test whether this polynomial contains roots</span></span>
<span class="line"><span>in the right half of the complex s-plane. Note from Eq. (9.20) that these roots are the zeroes of</span></span>
<span class="line"><span>the quantity (1+ T(s)), and additionally that the poles of (1 + T(s)) coincide with the poles</span></span>
<span class="line"><span>of T(s). Hence we could map the Nyquist contour of Fig. 9.13 through the transfer function</span></span>
<span class="line"><span>(1+ T(s)), and evaluate the number of encirclements of the origin.</span></span>
<span class="line"><span>In the complex plane, the quantity (1+T(s)) is simply equal to the quantityT(s) shifted to the</span></span>
<span class="line"><span>right by one unit. If the mapped Nyquist contour (1+T(Γ)) encircles the origin, then the contour</span></span>
<span class="line"><span>T(Γ) encircles the−1 point. So one could map the Nyquist contour Γof Fig. 9.13 through the</span></span>
<span class="line"><span>loop gain T(s) and count the number of encirclementsN of the−1 point byT(Γ). The number of</span></span>
<span class="line"><span>encirclements N is related to the number of poles in the right half-plane according toN= Z−P,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>364 9 Controller Design</span></span>
<span class="line"><span>where Z is the number of right half-plane poles of the closed-loop gains T/(1+ T)o r1/(1+ T),</span></span>
<span class="line"><span>and P is the number of right half-plane poles present in the original loop gain T(s).</span></span>
<span class="line"><span>If the original open-loop system is stable, so that T(s) contains no right half-plane poles,</span></span>
<span class="line"><span>then P= 0. In this common case N= Z: the number of encirclements of the−1 point by T(Γ)</span></span>
<span class="line"><span>is equal to the number of right half-plane closed-loop poles in T/(1+ T)o r1/(1+ T).</span></span>
<span class="line"><span>A Basic Example</span></span>
<span class="line"><span>As a ﬁrst example, let us consider a loop gain T(s) having three poles:</span></span>
<span class="line"><span>T(s)= T0⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω3</span></span>
<span class="line"><span>) (9.30)</span></span>
<span class="line"><span>The magnitude and phase Bode plot of T(s) is sketched in Fig. 9.14 for some speciﬁc values of</span></span>
<span class="line"><span>T0,ω1,ω2, andω3. For this example, T(s) exhibits a crossover frequencyωc with phase margin</span></span>
<span class="line"><span>ϕm as illustrated.</span></span>
<span class="line"><span>Figure 9.15a illustrates the ﬁrst part of the Nyquist plot, in which segment ΓA deﬁned by</span></span>
<span class="line"><span>Eq. (9.27) is mapped through the loop gain. Since s= jωalongΓA, this amounts to a polar</span></span>
<span class="line"><span>plot of T( jω) that corresponds to the magnitude and phase data of the Bode plot in Fig. 9.14.</span></span>
<span class="line"><span>Atω= 0, the loop gain has magnitude T0 and phase 0◦, so that the Nyquist plot begins on the</span></span>
<span class="line"><span>positive real axis at T= T0.A sωincreases, the magnitude decreases and the phase becomes</span></span>
<span class="line"><span>negative as illustrated.</span></span>
<span class="line"><span>At the crossover frequency fc, the loop gain has magnitude 1 and phase (−180◦+ϕm). The</span></span>
<span class="line"><span>contour T( jω) crosses the unit circle at this point, as illustrated in Fig. 9.15a. At frequencies</span></span>
<span class="line"><span>above fc the magnitude continues to decrease, and the contour T( jω) tends towards the origin.</span></span>
<span class="line"><span>The second portion of the Nyquist contourΓB is deﬁned by Eq. (9.28). To evaluate how the</span></span>
<span class="line"><span>loop gain T(s) maps the contourΓB, we ﬁrst substitute s= Rejθinto Eq. (9.30):</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>Crossover</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>ϕm</span></span>
<span class="line"><span>∠ T</span></span>
<span class="line"><span>∠ T||T||</span></span>
<span class="line"><span>||T||</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>fp2</span></span>
<span class="line"><span>fp3</span></span>
<span class="line"><span>Fig. 9.14 Bode plot of loop gain T(s) for the example of Eq. (9.30)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 365</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>–1</span></span>
<span class="line"><span>Re[T(s)]</span></span>
<span class="line"><span>Im[T(s)]</span></span>
<span class="line"><span>Unit circle</span></span>
<span class="line"><span>f = fc</span></span>
<span class="line"><span>f = 0</span></span>
<span class="line"><span>ϕm</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>T(jω )</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>–1</span></span>
<span class="line"><span>Re[T(s)]</span></span>
<span class="line"><span>Im[T(s)]</span></span>
<span class="line"><span>T(jω )</span></span>
<span class="line"><span>T(–jω )</span></span>
<span class="line"><span>®¥</span></span>
<span class="line"><span>Fig. 9.15 Nyquist plot for the loop gain of Fig. 9.14:( a) mapping of the contour ΓA through the loop</span></span>
<span class="line"><span>gain T(s), (b) mapping of the complete Nyquist contour through the loop gain T(s)</span></span>
<span class="line"><span>T(Rejθ)= T0⎦</span></span>
<span class="line"><span>1+ Rejθ</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ Rejθ</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ Rejθ</span></span>
<span class="line"><span>ω3</span></span>
<span class="line"><span>) (9.31)</span></span>
<span class="line"><span>Next, we let R→∞. This causes the denominator of Eq. (9.31) to tend to inﬁnity in magnitude,</span></span>
<span class="line"><span>which causes the magnitude of T to tend to zero. This portion of the Nyquist plot collapses to</span></span>
<span class="line"><span>the origin.</span></span>
<span class="line"><span>The third portion of the Nyquist plot involves mapping the segmentΓC deﬁned by Eq. (9.29)</span></span>
<span class="line"><span>through the loop gain T(s). This portion of the Nyquist contour is a polar plot ofT(−jω), which</span></span>
<span class="line"><span>is the complex conjugate of T( jω). Hence this plot is easily sketched by reﬂecting the T( jω)</span></span>
<span class="line"><span>plot about the real axis, as illustrated in Fig. 9.15b.</span></span>
<span class="line"><span>We can now determine the number of encirclements of the−1 point by T(Γ). Examination</span></span>
<span class="line"><span>of Fig. 9.15b shows that the −1 point lies outside the contour T(Γ) and hence there are no</span></span>
<span class="line"><span>encirclements: N = 0. Since the original loop gain T(s) contains no right half-plane poles,</span></span>
<span class="line"><span>P= 0. According to Eq. ( 9.26), Z= 0 so the closed-loop transfer functions contain no right</span></span>
<span class="line"><span>half-plane poles, and the feedback loop is stable.</span></span>
<span class="line"><span>If the phase marginϕm identiﬁed in Fig.9.14 had been negative, then the contourT(Γ) would</span></span>
<span class="line"><span>appear as illustrated in Fig. 9.16. The plot of T( jω) crosses the unit circle in the third quadrant.</span></span>
<span class="line"><span>In this case, the Nyquist plot of Fig. 9.16b encircles the−1 point twice: N= 2. Hence Z= 2</span></span>
<span class="line"><span>and the closed-loop transfer functions contain two RHP poles. The feedback loop is unstable.</span></span>
<span class="line"><span>For this example, the original T(s) contained three poles in the left half of the complex s-plane;</span></span>
<span class="line"><span>in the closed-loop transfer function T/(1+ T), two of these poles have moved into the right</span></span>
<span class="line"><span>half-plane, while one pole remains in the left half of the complex s-plane.</span></span>
<span class="line"><span>Example 2: Three Crossover Frequencies</span></span>
<span class="line"><span>As a second example, let us consider a loop gain having a low-frequency real pole at f = f1,</span></span>
<span class="line"><span>and higher-frequency resonant poles at frequency f= f2 that is just beyond the (ﬁrst) crossover</span></span>
<span class="line"><span>frequency:</span></span>
<span class="line"><span>T(s)= T0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>) ⎛⎜⎜⎜⎜⎜⎝1+ s</span></span>
<span class="line"><span>Qω2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)2⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>(9.32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>366 9 Controller Design</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Re[T(s)]</span></span>
<span class="line"><span>Im[T(s)]</span></span>
<span class="line"><span>Unit circle</span></span>
<span class="line"><span>f = fc</span></span>
<span class="line"><span>f = 0</span></span>
<span class="line"><span>ϕm</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>–1</span></span>
<span class="line"><span>Re[T(s)]</span></span>
<span class="line"><span>Im[T(s)]</span></span>
<span class="line"><span>T(jω )</span></span>
<span class="line"><span>T(–jω )</span></span>
<span class="line"><span>®¥</span></span>
<span class="line"><span>Fig. 9.16 Nyquist plot for an unstable system: (a) mapping of the contourΓA through the loop gain T(s),</span></span>
<span class="line"><span>with negative phase marginϕm,( b) mapping of the complete Nyquist contour through the loop gain T(s)</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>∠ T</span></span>
<span class="line"><span>∠ T</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>1 2 3</span></span>
<span class="line"><span>|| T |||| T ||</span></span>
<span class="line"><span>Fig. 9.17 Bode plot of loop gainT(s) for the example of Eq. (9.32). The loop gain exhibits three crossover</span></span>
<span class="line"><span>frequencies</span></span>
<span class="line"><span>A Bode plot of the loop gain for this case is illustrated in Fig. 9.17. The resonant poles at</span></span>
<span class="line"><span>f2 cause the magnitude of T increase above 0 dB in the vicinity of f2. Consequently, there are</span></span>
<span class="line"><span>three crossover frequencies (designated 1, 2, and 3). We could associate a phase margin with</span></span>
<span class="line"><span>each crossover frequency; for the plot of Fig.9.17, the phase margins associated with crossover</span></span>
<span class="line"><span>frequencies 1 and 2 are positive, while the phase margin associated with crossover frequency 3</span></span>
<span class="line"><span>is negative. Hence the simple phase margin test is ambiguous, and it is necessary to sketch the</span></span>
<span class="line"><span>Nyquist plot to correctly determine whether this loop gain leads to a stable system.</span></span>
<span class="line"><span>Figure 9.18 contains the Nyquist plot corresponding to the Bode plot of Fig. 9.17.F i g -</span></span>
<span class="line"><span>ure 9.18a contains the mapped contour T(Γ</span></span>
<span class="line"><span>A)= T( jω), with crossover points 1, 2, and 3 iden-</span></span>
<span class="line"><span>tiﬁed. Figure 9.18b contains the mapping of the complete Nyquist contour. It can be seen that</span></span></code></pre></div>`,10)])])}const f=s(l,[["render",i]]);export{u as __pageData,f as default};
