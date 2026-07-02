import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第15章part 1 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第15章part 1 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 589-608 > Chunk ID: `chapter-15-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/038-chapter-15-part-1.md","filePath":"content/power/fundamentals-work/chunks/038-chapter-15-part-1.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/038-chapter-15-part-1.md"};function l(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第15章part-1-15-equivalent-circuit-modeling-of-the-discontinuous-conduction-mode" tabindex="-1">第15章part 1 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode <a class="header-anchor" href="#第15章part-1-15-equivalent-circuit-modeling-of-the-discontinuous-conduction-mode" aria-label="Permalink to &quot;第15章part 1 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 589-608<br> Chunk ID: <code>chapter-15-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>15</span></span>
<span class="line"><span>AC and DC Equivalent Circuit Modeling of the</span></span>
<span class="line"><span>Discontinuous Conduction Mode</span></span>
<span class="line"><span>So far, we have derived equivalent circuit models for dc–dc pulse-width modulation (PWM)</span></span>
<span class="line"><span>converters operating in the continuous conduction mode. As illustrated in Fig. 15.1, the basic</span></span>
<span class="line"><span>dc conversion property is modeled by an eﬀective dc transformer, having a turns ratio equal to</span></span>
<span class="line"><span>the conversion ratio M(D). This model predicts that the converter has a voltage-source output</span></span>
<span class="line"><span>characteristic, such that the output voltage is essentially independent of the load current or</span></span>
<span class="line"><span>load resistance R. We have also seen how to reﬁne this model, to predict losses and eﬃciency,</span></span>
<span class="line"><span>converter dynamics, and small-signal ac transfer functions. We found that the transfer functions</span></span>
<span class="line"><span>of the buck converter contain two low-frequency poles, owing to the converter ﬁlter inductor</span></span>
<span class="line"><span>and capacitor. The control-to-output transfer functions of the boost and buck–boost converters</span></span>
<span class="line"><span>additionally contain a right half-plane zero. Finally, we have seen how to utilize these results in</span></span>
<span class="line"><span>the design of converter control systems.</span></span>
<span class="line"><span>What are the basic dc and small-signal ac equivalent circuits of converters operating in the</span></span>
<span class="line"><span>discontinuous conduction mode (DCM)? It was found in Chap. 5 that, in DCM, the output volt-</span></span>
<span class="line"><span>age becomes load-dependent: the conversion ratio M(D, K) is a function of the dimensionless</span></span>
<span class="line"><span>parameter K= 2L/RTs, which in turn is a function of the load resistance R. So the converter</span></span>
<span class="line"><span>no longer has a voltage-source output characteristic, and hence the dc transformer model is less</span></span>
<span class="line"><span>appropriate.</span></span>
<span class="line"><span>In Sect. 15.1, a buck–boost DCM converter example is used to introduce DCM converter ac</span></span>
<span class="line"><span>waveforms and averaged dynamics. It is shown that the moving average of the inductor voltage</span></span>
<span class="line"><span>waveform is zero or approximately zero at all times, which is why, in practice, high-frequency</span></span>
<span class="line"><span>inductor dynamics can usually be neglected in DCM, and DCM converters exhibit simpler,</span></span>
<span class="line"><span>reduced-order dynamic responses compared to operation in the continuous conduction mode.</span></span>
<span class="line"><span>Based on the approximation that the moving average of the inductor voltage waveform is</span></span>
<span class="line"><span>zero at all times, the averaged switch modeling approach [ 70–74, 126, 130, 131]i se m p l o y e d</span></span>
<span class="line"><span>in Sect. 15.2 to derive equivalent circuits of the DCM switch network. It is shown that the loss-</span></span>
<span class="line"><span>free resistor model [132–134] is the averaged switch model of the DCM switch network. This</span></span>
<span class="line"><span>equivalent circuit represents the steady-state and large-signal dynamic characteristics of the</span></span>
<span class="line"><span>DCM switch network, in a clear and simple manner. In the discontinuous conduction mode, the</span></span>
<span class="line"><span>average transistor voltage and current obey Ohm’s law, and hence the transistor is modeled by an</span></span>
<span class="line"><span>eﬀective resistor Re. The average diode voltage and current obey a power source characteristic,</span></span>
<span class="line"><span>with power equal to the power eﬀectively dissipated in Re. Therefore, the diode is modeled with</span></span>
<span class="line"><span>a dependent power source.</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_15</span></span>
<span class="line"><span>585</span></span>
<span class="line"><span></span></span>
<span class="line"><span>586 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>DC</span></span>
<span class="line"><span>CCM</span></span>
<span class="line"><span>DCM</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>1 : M(D)</span></span>
<span class="line"><span>Vg R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>+Vg R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+ 1 : M(D) Le</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>AC</span></span>
<span class="line"><span>+ R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>??</span></span>
<span class="line"><span>vg(s)( s)</span></span>
<span class="line"><span>e(s)d(s)</span></span>
<span class="line"><span>j(s)d(s)</span></span>
<span class="line"><span>vˆ vˆ</span></span>
<span class="line"><span>vˆˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>g(s)( s)</span></span>
<span class="line"><span>Fig. 15.1 The objective of this chapter is the derivation of large-signal dc and small-signal ac equivalent</span></span>
<span class="line"><span>circuit models for converters operating in the discontinuous conduction mode</span></span>
<span class="line"><span>Section 15.4 addresses simulation models for converters that may operate in CCM or DCM.</span></span>
<span class="line"><span>An average switch model that automatically switches between modes is derived, and this model</span></span>
<span class="line"><span>is implemented in SPICE.</span></span>
<span class="line"><span>Since most converters operate in discontinuous conduction mode at some operating points,</span></span>
<span class="line"><span>small-signal ac DCM models are needed, to prove that the control systems of such converters are</span></span>
<span class="line"><span>correctly designed. In Sect. 15.3, a small-signal model of the DCM switch network is derived</span></span>
<span class="line"><span>by linearization of the loss-free resistor model. The transfer functions of DCM converters are</span></span>
<span class="line"><span>quite diﬀerent from their respective CCM transfer functions. The basic DCM buck, boost, and</span></span>
<span class="line"><span>buck–boost converters essentially exhibit simple single-pole transfer functions [15, 135], while</span></span>
<span class="line"><span>high-frequency dynamics can usually be neglected. So the basic converters operating in DCM</span></span>
<span class="line"><span>are easy to control; for this reason, converters are sometimes purposely operated in DCM for</span></span>
<span class="line"><span>all loads. The transfer functions of higher-order converters such as the DCM ´Cuk or SEPIC</span></span>
<span class="line"><span>are considerably more complicated; but again, one pole is shifted to high frequency, where</span></span>
<span class="line"><span>it has negligible practical eﬀect. This chapter concludes, in Sect. 15.5, with a discussion of</span></span>
<span class="line"><span>high-frequency dynamics of DCM converters. The more detailed analysis predicts that the high-</span></span>
<span class="line"><span>frequency dynamics of DCM converters are related to the sampling process associated with</span></span>
<span class="line"><span>the pulse-width modulator, and the nature of the response of the inductor current to duty-cycle</span></span>
<span class="line"><span>perturbations [136]. This behavior can be modeled by an e ﬀective pole in the vicinity of the</span></span>
<span class="line"><span>switching frequency.</span></span>
<span class="line"><span>15.1 Introduction to DCM Converter Dynamics</span></span>
<span class="line"><span>Consider the buck–boost converter of Fig. 15.2. The transistor switch duty cycle is modulated</span></span>
<span class="line"><span>by a sinusoidal PWM input signal,</span></span>
<span class="line"><span>vc(t)= Vc+ Vm sinωmt (15.1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.1 Introduction to DCM Converter Dynamics 587</span></span>
<span class="line"><span>Pulse-width</span></span>
<span class="line"><span>modulator</span></span>
<span class="line"><span>Gate</span></span>
<span class="line"><span>driver</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>-</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>-</span></span>
<span class="line"><span>v(t) RCvg(t)</span></span>
<span class="line"><span>vc(t)</span></span>
<span class="line"><span>vL(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Fig. 15.2 Buck–boost converter example. The transistor switch duty cycle is modulated by the PWM</span></span>
<span class="line"><span>input signal vc(t)</span></span>
<span class="line"><span>where the modulation frequency fm =ωm/(2π) is much smaller than the converter switching</span></span>
<span class="line"><span>frequency fs. Figure 15.3 shows the converter switching and averaged waveforms over a modu-</span></span>
<span class="line"><span>lation period. In this example, the inductor current ripple is so large that the converter operates</span></span>
<span class="line"><span>in DCM at all times. As shown in Fig. 15.3b, inductor current waveform iL(t) consists of trian-</span></span>
<span class="line"><span>gular pulses that start from zero and end at zero within a switching period. As expected, the</span></span>
<span class="line"><span>moving average of the inductor current,⟨iL(t)⟩Ts , retains low-frequency dynamics of the induc-</span></span>
<span class="line"><span>tor current, including a dc component and an ac component in response to the sinusoidally</span></span>
<span class="line"><span>modulated transistor duty cycle. Similarly, the moving average of the output voltage, ⟨v(t)⟩</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>includes a dc component V, and an ac variation resulting from the sinusoidally modulated duty</span></span>
<span class="line"><span>cycle, while the switching ripple in v(t) is removed, as shown in Fig. 15.3c. It is of particular</span></span>
<span class="line"><span>interest to examine the inductor voltage switching and averaged waveforms shown in Fig.15.3d.</span></span>
<span class="line"><span>The switching waveform vL(t) is a pulsating waveform that follows the DCM pattern described</span></span>
<span class="line"><span>in Chap. 5,</span></span>
<span class="line"><span>vL(t)=</span></span>
<span class="line"><span>⎧⎪⎪⎪⎨⎪⎪⎪⎩</span></span>
<span class="line"><span>vg(t) during d1Ts when transistor is on and diode is oﬀ</span></span>
<span class="line"><span>v(t) during d2Ts when transistor is oﬀand diode is on</span></span>
<span class="line"><span>0 during d3Ts when both transistor and diode are oﬀ</span></span>
<span class="line"><span>(15.2)</span></span>
<span class="line"><span>where d1 is the transistor switch duty cycle and d1+ d2+ d3= 1.</span></span>
<span class="line"><span>One may observe that the moving average⟨v(t)⟩Ts is either equal to zero or is close to zero</span></span>
<span class="line"><span>at all times. To explain the DCM inductor dynamics, consider the inductor current and the</span></span>
<span class="line"><span>averaged inductor voltage waveforms shown in Fig.15.4 over a couple of switching periods. As</span></span>
<span class="line"><span>a result of duty-cycle modulation, the transistor duty cycle in the second period is Δd longer</span></span>
<span class="line"><span>than the duty cycle d</span></span>
<span class="line"><span>1 in the ﬁrst period. For an averaging interval centered around time t,t h e</span></span>
<span class="line"><span>moving average of vL(t) can be found as</span></span>
<span class="line"><span>⟨vL(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ t+Ts/2</span></span>
<span class="line"><span>t−Ts/2</span></span>
<span class="line"><span>vL(τ)dτ= L</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>(iL(t+ Ts/2)−iL(t−Ts/2)) (15.3)</span></span>
<span class="line"><span>For the example shown in Fig.15.4,</span></span>
<span class="line"><span>iL(t−Ts/2)= iL(t+ Ts/2)= 0 (15.4)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>588 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>10 20</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>-23</span></span>
<span class="line"><span>-22</span></span>
<span class="line"><span>-21</span></span>
<span class="line"><span>-10</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>10 20</span></span>
<span class="line"><span>10 20</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>iL(t) Ts</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>v(t) Ts</span></span>
<span class="line"><span>vL(t) Ts</span></span>
<span class="line"><span>vL(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>(d)</span></span>
<span class="line"><span>Gate drive</span></span>
<span class="line"><span>vc(t)</span></span>
<span class="line"><span>Fig. 15.3 Switching and averaged waveforms in the buck–boost converter of Fig. 15.2. In this example,</span></span>
<span class="line"><span>the converter parameters are Vg= 10 V ,L= 5μH, C= 22μF, fs = 1/Ts = 100 kHz, R= 30Ω,P W Mg a i n</span></span>
<span class="line"><span>1/VM = 1V−1, vc(t)= 0.4+ 0.1 sin(ωmt), modulation frequency fm = fs/20= 5k H z</span></span>
<span class="line"><span>and hence</span></span>
<span class="line"><span>⟨vL(t)⟩Ts = 0 (15.5)</span></span>
<span class="line"><span>It follows from Eq. ( 15.3) that⟨vL(t)⟩Ts = 0 whenever iL(t+ Ts/2)= iL(t−Ts/2), which is</span></span>
<span class="line"><span>always the case over portions of a switching period in DCM—even when the converter is not</span></span>
<span class="line"><span>in equilibrium. In the examples of Figs.15.3 or 15.4,⟨v</span></span>
<span class="line"><span>L(t)⟩Ts /nequal0 only during time intervals of</span></span>
<span class="line"><span>length d2Ts and only when duty cycle varies between successive switching periods. Referring to</span></span>
<span class="line"><span>Fig. 15.3d, the nonzero pulses in⟨vL(t)⟩Ts /nequal0 clearly contain a small low-frequency component</span></span>
<span class="line"><span>in response to the duty-cycle modulation. However, as discussed further in Sect. 15.5,t h er e l a -</span></span>
<span class="line"><span>tively short, relatively low amplitude nonzero pulses in⟨vL(t)⟩Ts , which are related to sampling</span></span>
<span class="line"><span>eﬀects and high-frequency dynamics, do not aﬀect the dominant, low-frequency DCM dynam-</span></span>
<span class="line"><span>ics signiﬁcantly. In conclusion, in DCM, we can simply assume that the inductor volt-seconds</span></span>
<span class="line"><span>balance holds not only in equilibrium but at all times:</span></span>
<span class="line"><span>⟨vL(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ t+Ts/2</span></span>
<span class="line"><span>t−Ts/2</span></span>
<span class="line"><span>vL(τ)dτ≈0 (15.6)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.2 DCM Averaged Switch Model 589</span></span>
<span class="line"><span>vL(t) Ts</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>d1Ts d1Tsd2Ts d3Ts</span></span>
<span class="line"><span>(n + 1)TsnTs(n− 1)Ts</span></span>
<span class="line"><span>t − Ts/2 t + Ts/2Time t</span></span>
<span class="line"><span>Dd</span></span>
<span class="line"><span>Averaging interval</span></span>
<span class="line"><span>Fig. 15.4 DCM inductor current iL(t) and the moving average⟨vL(t)⟩Ts of the inductor voltage</span></span>
<span class="line"><span>In the next section, following the averaged switch modeling approach, the approximation given</span></span>
<span class="line"><span>by Eq. (15.6) is used to derive dc and ac models of DCM converters.</span></span>
<span class="line"><span>15.2 DCM Averaged Switch Model</span></span>
<span class="line"><span>Consider the buck–boost converter of Fig. 15.5. Let us follow the averaged switch model-</span></span>
<span class="line"><span>ing approach of Sect. 14.1, to derive an equivalent circuit that models the averaged terminal</span></span>
<span class="line"><span>waveforms of the switch network. The general two-switch network and its terminal quantities</span></span>
<span class="line"><span>v1(t), i1(t), v2(t), and i2(t) are deﬁned as illustrated in Fig. 15.5, consistent with Fig. 14.4a. The</span></span>
<span class="line"><span>inductor and switch network voltage and current waveforms are illustrated in Fig.15.6,f o rD C M</span></span>
<span class="line"><span>operation.</span></span>
<span class="line"><span>During the subinterval d1Ts, while the transistor conducts, the inductor current increases</span></span>
<span class="line"><span>from zero with a slope ofvg(t)/L. At the end of this subinterval, the inductor currentiL(t) attains</span></span>
<span class="line"><span>the peak value given by</span></span>
<span class="line"><span>ipk= vg</span></span>
<span class="line"><span>L d1Ts (15.7)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vvg</span></span>
<span class="line"><span>iL</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vL</span></span>
<span class="line"><span>Switch network</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1 v2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>i1 i2</span></span>
<span class="line"><span>Fig. 15.5 Buck–boost converter example, with switch network terminal quantities identiﬁed</span></span>
<span class="line"><span></span></span>
<span class="line"><span>590 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>Averaging interval</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>tt t + Ts/2t − Ts/2</span></span>
<span class="line"><span>iL(t )</span></span>
<span class="line"><span>vL(t )</span></span>
<span class="line"><span>i1(t )</span></span>
<span class="line"><span>v1(t )</span></span>
<span class="line"><span>i2(t )</span></span>
<span class="line"><span>v2(t )</span></span>
<span class="line"><span>vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>ipk</span></span>
<span class="line"><span>ipk</span></span>
<span class="line"><span>ipk</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>d1Ts d2Ts d3Ts</span></span>
<span class="line"><span>vg</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>Area q1</span></span>
<span class="line"><span>Area q2</span></span>
<span class="line"><span>i1(t) Ts</span></span>
<span class="line"><span>v1(t) Ts</span></span>
<span class="line"><span>i2(t) Ts</span></span>
<span class="line"><span>v2(t) Ts</span></span>
<span class="line"><span>vg − v</span></span>
<span class="line"><span>vgvg</span></span>
<span class="line"><span>vg − v</span></span>
<span class="line"><span>− v − v</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Fig. 15.6 Inductor and switch network voltage and current waveforms</span></span>
<span class="line"><span>During the next subinterval, while the diode conducts, the inductor current decreases with a</span></span>
<span class="line"><span>slope equal to v(t)/L. This subinterval ends when the inductor current drops to zero and the</span></span>
<span class="line"><span>diode becomes reverse-biased. The length of this subinterval is d2Ts. The inductor current and</span></span>
<span class="line"><span>the inductor voltage then remain zero for the balance d3Ts of the switching period.</span></span>
<span class="line"><span>A DCM averaged switch model can be derived with reference to the waveforms of Fig.15.6.</span></span>
<span class="line"><span>The averaging interval of length Ts, centered around time t is highlighted.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.2 DCM Averaged Switch Model 591</span></span>
<span class="line"><span>Following the approach of Sect. 14.1.2, let us ﬁnd the average values of the switch network</span></span>
<span class="line"><span>terminal waveforms v1(t), v2(t), i1(t), and i2(t) in terms of the converter state variables (inductor</span></span>
<span class="line"><span>currents and capacitor voltages), the input voltage vg(t), and the subinterval lengths d1 and d2.</span></span>
<span class="line"><span>To ﬁnd the average switch network input voltage⟨v1(t)⟩Ts , or the average transistor voltage,</span></span>
<span class="line"><span>it is convenient to start from a converter voltage loop equation</span></span>
<span class="line"><span>v1= vg−vL (15.8)</span></span>
<span class="line"><span>Averaging applied to Eq. (15.8) yields</span></span>
<span class="line"><span>⟨v1⟩Ts =⟨vg⟩Ts</span></span>
<span class="line"><span>−⟨vL⟩Ts (15.9)</span></span>
<span class="line"><span>Taking the approximation Eq. (15.6) into account, we have</span></span>
<span class="line"><span>⟨v1⟩Ts =⟨vg⟩Ts</span></span>
<span class="line"><span>(15.10)</span></span>
<span class="line"><span>For the averaging interval shown in Fig.15.6, one may note that⟨vL⟩Ts = 0 exactly.</span></span>
<span class="line"><span>Similar analysis, based on the voltage loop equation v2 = vL−v, leads to the following</span></span>
<span class="line"><span>expression for the average diode voltage:</span></span>
<span class="line"><span>⟨v2⟩Ts =⟨−v⟩Ts (15.11)</span></span>
<span class="line"><span>The average switch network input current⟨i1(t)⟩Ts is found by integrating thei1(t) waveform</span></span>
<span class="line"><span>of Fig. 15.6 over one switching period:</span></span>
<span class="line"><span>⟨i1(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>t+Ts/2∫</span></span>
<span class="line"><span>t−Ts/2</span></span>
<span class="line"><span>i1(t)dt= q1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>(15.12)</span></span>
<span class="line"><span>The integral q1 is equal to the area under the i1(t) waveform during the ﬁrst subinterval. This</span></span>
<span class="line"><span>area is easily evaluated using the triangle area formula:</span></span>
<span class="line"><span>q1=</span></span>
<span class="line"><span>t+Ts/2∫</span></span>
<span class="line"><span>t−Ts/2</span></span>
<span class="line"><span>i1(t)dt= 1</span></span>
<span class="line"><span>2(d1Ts)(ipk) (15.13)</span></span>
<span class="line"><span>Substitution of Eqs. (15.7), (15.13), and (15.10) into Eq. (15.12)g i v e s</span></span>
<span class="line"><span>⟨i1(t)⟩Ts = d2</span></span>
<span class="line"><span>1Ts</span></span>
<span class="line"><span>2L ⟨vg(t)⟩Ts = d2</span></span>
<span class="line"><span>1Ts</span></span>
<span class="line"><span>2L ⟨v1(t)⟩Ts (15.14)</span></span>
<span class="line"><span>Note that⟨i1(t)⟩TS is not equal to d1⟨iL(t)⟩TS . Since the inductor current ripple is not small, it is</span></span>
<span class="line"><span>necessary to sketch the actual input current waveform, including the large switching ripple, and</span></span>
<span class="line"><span>then correctly compute the average as in Eqs. (15.12)t o( 15.14).</span></span>
<span class="line"><span>The average diode current ⟨i2(t)⟩TS is found in a manner similar to that used above for</span></span>
<span class="line"><span>⟨i1(t)⟩TS :</span></span>
<span class="line"><span>⟨i2(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>t+Ts/2∫</span></span>
<span class="line"><span>t−Ts/2</span></span>
<span class="line"><span>i2(t)dt= q2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>(15.15)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>592 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>The integral q2 is equal to the area under the i2(t) waveform during the d2Ts subinterval. This</span></span>
<span class="line"><span>area is evaluated using the triangle area formula:</span></span>
<span class="line"><span>q2=</span></span>
<span class="line"><span>t+Ts/2∫</span></span>
<span class="line"><span>t−Ts/2</span></span>
<span class="line"><span>i2(t)dt= 1</span></span>
<span class="line"><span>2(d2Ts)(ipk) (15.16)</span></span>
<span class="line"><span>Substitution of Eqs. (15.7), (15.16), and (15.10) into Eq. (15.15) leads to:</span></span>
<span class="line"><span>⟨i2(t)⟩TS = d1d2Ts</span></span>
<span class="line"><span>2L ⟨vg(t)⟩Ts = d1d2Ts</span></span>
<span class="line"><span>2L ⟨v1(t)⟩Ts (15.17)</span></span>
<span class="line"><span>Equations (15.10), (15.11), (15.14), and (15.17) constitute the averaged terminal equations of</span></span>
<span class="line"><span>the switch network in the DCM buck–boost converter. In these equations, it remains to express</span></span>
<span class="line"><span>the subinterval length d</span></span>
<span class="line"><span>2 in terms of the switch duty cycle d1 = d, and the converter averaged</span></span>
<span class="line"><span>waveforms. Considering the averaging interval shown in Fig. 15.6, we note that iL(t−Ts/2)=</span></span>
<span class="line"><span>iL(t+Ts/2)= 0. There is no net change in inductor current, and no net volt-seconds are applied to</span></span>
<span class="line"><span>the inductor over this averaging interval. In other words, the average inductor voltage computed</span></span>
<span class="line"><span>over the averaging interval shown in Fig.15.6 is zero,</span></span>
<span class="line"><span>⟨vL(t)⟩Ts = d1⟨vg(t)⟩TS + d2⟨v(t)⟩Ts = 0 (15.18)</span></span>
<span class="line"><span>Based on the approximation given by Eq. ( 15.5) we conclude that Eq. ( 15.18) can be used to</span></span>
<span class="line"><span>ﬁnd the length of the d2Ts subinterval in general, even when the converter is not in equilibrium:</span></span>
<span class="line"><span>d2(t)=−d1(t)⟨vg(t)⟩TS</span></span>
<span class="line"><span>⟨v(t)⟩Ts</span></span>
<span class="line"><span>(15.19)</span></span>
<span class="line"><span>Substitution of Eq. (15.19) into Eqs. (15.14) and (15.17) allows us to obtain simple expressions</span></span>
<span class="line"><span>for the averaged terminal waveforms of the switch network in the discontinuous conduction</span></span>
<span class="line"><span>mode:</span></span>
<span class="line"><span>⟨i1(t)⟩Ts = d2</span></span>
<span class="line"><span>1Ts</span></span>
<span class="line"><span>2L ⟨v1(t)⟩Ts (15.20)</span></span>
<span class="line"><span>⟨i2(t)⟩Ts = d2</span></span>
<span class="line"><span>1Ts</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>⟨v1(t)⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>⟨v2(t)⟩Ts</span></span>
<span class="line"><span>(15.21)</span></span>
<span class="line"><span>Let us next construct an equivalent circuit corresponding to the averaged switch network</span></span>
<span class="line"><span>equations (15.20) and (15.21). The switch network input port is modeled by Eq. ( 15.20). This</span></span>
<span class="line"><span>equation states that the average input current⟨i1(t)⟩Ts is proportional to the applied input voltage</span></span>
<span class="line"><span>⟨v1(t)⟩Ts . In other words, the low-frequency components of the switch network input port obey</span></span>
<span class="line"><span>Ohm’s law:</span></span>
<span class="line"><span>⟨i1(t)⟩Ts =⟨v1(t)⟩Ts</span></span>
<span class="line"><span>Re(d1) (15.22)</span></span>
<span class="line"><span>where the eﬀective resistance Re is</span></span>
<span class="line"><span>Re(d1)= 2L</span></span>
<span class="line"><span>d2</span></span>
<span class="line"><span>1Ts</span></span>
<span class="line"><span>(15.23)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.2 DCM Averaged Switch Model 593</span></span>
<span class="line"><span>Fig. 15.7 Equivalent circuit that models the average wave-</span></span>
<span class="line"><span>forms of the switch input (transistor) port</span></span>
<span class="line"><span>An equivalent circuit is illustrated in Fig. 15.7. During the d1Ts subinterval, the slope of the in-</span></span>
<span class="line"><span>put current waveform i1(t) is proportional to the input voltage⟨vg(t)⟩Ts =⟨v1(t)⟩Ts , as illustrated</span></span>
<span class="line"><span>in Fig. 15.6. As a result, the peak current ipk, the total charge q1, and the average input current</span></span>
<span class="line"><span>⟨i1(t)⟩Ts , are also proportional to⟨v1(t)⟩Ts . Of course, there is no physical resistor inside the con-</span></span>
<span class="line"><span>verter. Indeed, if the converter elements are ideal, then no heat is generated inside the converter.</span></span>
<span class="line"><span>Rather, the power apparently consumed by Re is transferred to the switch network output port.</span></span>
<span class="line"><span>The switch network output (diode) port is modeled by Eq. (15.21), or</span></span>
<span class="line"><span>⟨i2(t)⟩Ts⟨v2(t)⟩Ts =</span></span>
<span class="line"><span>⟨v1(t)⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re(d1) =⟨p(t)⟩Ts (15.24)</span></span>
<span class="line"><span>Note that⟨v1(t)⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>/Re is the average power⟨p(t)⟩Ts apparently consumed by the eﬀective resis-</span></span>
<span class="line"><span>tor Re(d1). Equation (15.24) states that this power ﬂows out of the switch network output port.</span></span>
<span class="line"><span>So the switch network consumes no net power—its average input and output powers are equal.</span></span>
<span class="line"><span>Equation (15.24) can also be derived by consideration of the inductor stored energy. During</span></span>
<span class="line"><span>the ﬁrst subinterval, the inductor current increases from 0 to ipk. In the process, the inductor</span></span>
<span class="line"><span>stores the following energy:</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2Li2</span></span>
<span class="line"><span>pk=</span></span>
<span class="line"><span>⟨v1⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>d2</span></span>
<span class="line"><span>1T2</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>2L =</span></span>
<span class="line"><span>⟨v1⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re(d1)Ts (15.25)</span></span>
<span class="line"><span>Here, ipk has been expressed in terms of ⟨v1(t)⟩Ts using Eqs. ( 15.7) and ( 15.10). This energy</span></span>
<span class="line"><span>is transferred from the source vg, through the switch network input terminals (i.e., through the</span></span>
<span class="line"><span>transistor), to the inductor. During the second subinterval, the inductor releases all of its stored</span></span>
<span class="line"><span>energy through the switch network output terminals (i.e., through the diode), to the output. The</span></span>
<span class="line"><span>average output power can therefore be expressed as the energy transferred per cycle, divided by</span></span>
<span class="line"><span>the switching period:</span></span>
<span class="line"><span>⟨p(t)⟩</span></span>
<span class="line"><span>Ts =</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>⟨v1⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re(d1)Ts</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>⟨v1⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re(d1) (15.26)</span></span>
<span class="line"><span>This power is transferred to the load, and hence</span></span>
<span class="line"><span>⟨v⟩Ts⟨i2⟩Ts =⟨v2⟩Ts⟨i2⟩Ts =⟨p(t)⟩Ts =</span></span>
<span class="line"><span>⟨v1⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re(d1) (15.27)</span></span>
<span class="line"><span>This result coincides with Eq. (15.24).</span></span>
<span class="line"><span>The average power ⟨p(t)⟩Ts is independent of the load characteristics, and is determined</span></span>
<span class="line"><span>solely by the eﬀective resistance Re and the applied switch network input terminal voltage or</span></span>
<span class="line"><span>current. In other words, the switch network output port behaves as a source of power, equal</span></span>
<span class="line"><span></span></span>
<span class="line"><span>594 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>p(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>v(t)i(t)= p(t)</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Fig. 15.8 The dependent power source: (a) schematic symbol, (b) i–v characteristic</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>p(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>v(t)i(t)= – p(t)</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Fig. 15.9 The dependent power sink: (a) schematic symbol, (b) i–v characteristic</span></span>
<span class="line"><span>to the power apparently consumed by the eﬀective resistance Re. This behavior is represented</span></span>
<span class="line"><span>schematically by the dependent power source symbol illustrated in Fig. 15.8. In any lossless</span></span>
<span class="line"><span>two-port network, when the voltage and current at one port are independent of the character-</span></span>
<span class="line"><span>istics of the external network connected to the second port, then the second port must exhibit</span></span>
<span class="line"><span>a dependent power source characteristic [ 133]. This situation arises in a number of common</span></span>
<span class="line"><span>power-processing applications, including switch networks operating in the discontinuous con-</span></span>
<span class="line"><span>duction mode.</span></span>
<span class="line"><span>The power source characteristic illustrated in Fig. 15.8b is symmetrical with respect to volt-</span></span>
<span class="line"><span>age and current; in consequence, the power source exhibits several unique properties. Similar to</span></span>
<span class="line"><span>the voltage source, the ideal power source must not be short-circuited; otherwise, inﬁnite current</span></span>
<span class="line"><span>occurs. And similar to the current source, the ideal power source must not be open-circuited, to</span></span>
<span class="line"><span>avoid inﬁnite terminal voltage. The power source must be connected to a load capable of ab-</span></span>
<span class="line"><span>sorbing the power p(t), and the operating point is deﬁned by the intersection of the load and</span></span>
<span class="line"><span>power source i–v characteristics.</span></span>
<span class="line"><span>We can deﬁne a power sink element similarly, with reversal of the direction of power ﬂow.</span></span>
<span class="line"><span>The schematic symbol for this element is illustrated in Fig. 15.9, with its i–v characteristic.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.2 DCM Averaged Switch Model 595</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>P1</span></span>
<span class="line"><span>P2 P3</span></span>
<span class="line"><span>P1 + P2 + P3</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>P1P1</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>Fig. 15.10 Circuit manipulations of power source elements: ( a) combination of series- and parallel-</span></span>
<span class="line"><span>connected power sources into a single equivalent power source, ( b) invariance of the power source to</span></span>
<span class="line"><span>reﬂection through an ideal transformer of arbitrary turns ratio</span></span>
<span class="line"><span>As illustrated in Fig. 15.10a, series-and parallel-connected power sources can be combined</span></span>
<span class="line"><span>into a single power source, equal to the sum of the powers of the individual sources. Fig-</span></span>
<span class="line"><span>ure 15.10b illustrates how reﬂection of a power source through a transformer, having an arbi-</span></span>
<span class="line"><span>trary turns ratio, leaves the power source unchanged. Power sources are also invariant to duality</span></span>
<span class="line"><span>transformations.</span></span>
<span class="line"><span>The averaged large-signal model of the general two-switch network in DCM is illustrated</span></span>
<span class="line"><span>in Fig. 15.11b. The input port behaves e ﬀectively as resistance Re. The instantaneous power</span></span>
<span class="line"><span>apparently consumed by Re is transferred to the output port, and the output port behaves as a</span></span>
<span class="line"><span>dependent power source. This lossless two-port network is called the loss-free resistor model</span></span>
<span class="line"><span>(LFR) [132]. The loss-free resistor represents the basic power conversion properties of DCM</span></span>
<span class="line"><span>switch networks [ 134]. It can be shown that the loss-free resistor models the averaged prop-</span></span>
<span class="line"><span>erties of DCM switch networks not only in the buck–boost converter, but also in other PWM</span></span>
<span class="line"><span>converters.</span></span>
<span class="line"><span>When the switch network of the DCM buck–boost converter is replaced by the averaged</span></span>
<span class="line"><span>model of Fig. 15.11b, the converter equivalent circuit of Fig.15.12 is obtained. Upon setting all</span></span>
<span class="line"><span>averaged waveforms to their quiescent values, and letting the inductor and capacitor become a</span></span>
<span class="line"><span>short-circuit and an open-circuit, respectively, we obtain the dc model of Fig.15.13.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>596 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>(b) i2(t) Ts</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t) Tsv1(t) Ts</span></span>
<span class="line"><span>i1(t) Ts</span></span>
<span class="line"><span>Re(d1)</span></span>
<span class="line"><span>+ p(t) Ts</span></span>
<span class="line"><span>Fig. 15.11 The general two-switch network ( a), and the corresponding averaged switch model in the</span></span>
<span class="line"><span>discontinuous conduction mode (b). The average transistor waveforms obey Ohm’s law, while the average</span></span>
<span class="line"><span>diode waveforms behave as a dependent power source</span></span>
<span class="line"><span>Fig. 15.12 Replacement of the switch network of the DCM buck–boost converter with the loss-free</span></span>
<span class="line"><span>resistor model</span></span>
<span class="line"><span>Systems containing power sources or loss-free resistors can usually be easily solved, by</span></span>
<span class="line"><span>equating average source and load powers. For example, in the dc network of Fig. 15.13,t h e</span></span>
<span class="line"><span>power ﬂowing into the converter input terminals is</span></span>
<span class="line"><span>P=</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>(15.28)</span></span>
<span class="line"><span>The power ﬂowing into the load resistor is</span></span>
<span class="line"><span>P= V2</span></span>
<span class="line"><span>R (15.29)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.2 DCM Averaged Switch Model 597</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>Re(D)+ R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VVg</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>Fig. 15.13 Dc network example containing a loss-free resistor model</span></span>
<span class="line"><span>The loss-free resistor model states that these two powers must be equal:</span></span>
<span class="line"><span>P=</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>= V2</span></span>
<span class="line"><span>R (15.30)</span></span>
<span class="line"><span>Solution for the voltage conversion ratio M= V/Vg yields</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>=±</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>(15.31)</span></span>
<span class="line"><span>Equation (15.31) is a general result, valid for any converter that can be modeled by a loss-free</span></span>
<span class="line"><span>resistor and that drives a resistive load. Other arguments must be used to determine the polarity</span></span>
<span class="line"><span>of V/Vg. In the buck–boost converter shown in Fig. 15.5, the diode polarity indicates that V/Vg</span></span>
<span class="line"><span>must be negative. The steady-state value of Re is</span></span>
<span class="line"><span>Re(D)= 2L</span></span>
<span class="line"><span>D2Ts</span></span>
<span class="line"><span>(15.32)</span></span>
<span class="line"><span>where D is the quiescent transistor duty cycle. Substitution of Eq. (15.32)i n t o(15.31) leads to</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>=−</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D2TsR</span></span>
<span class="line"><span>2L =−D√</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>(15.33)</span></span>
<span class="line"><span>with K = 2L/RTs. This equation coincides with the previous steady-state result given in Ta-</span></span>
<span class="line"><span>ble 5.2.</span></span>
<span class="line"><span>Similar arguments apply when the waveforms contain ac components. For example, con-</span></span>
<span class="line"><span>sider the network of Fig.15.14, in which the voltages and currents are periodic functions of time.</span></span>
<span class="line"><span>The rms values of the waveforms can be determined by simply equating the average source and</span></span>
<span class="line"><span>load powers. The average power ﬂowing into the converter input port is</span></span>
<span class="line"><span>Pav=</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>g,rms</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>(15.34)</span></span>
<span class="line"><span>where Pav is the average power consumed by the eﬀective resistance Re. No average power is</span></span>
<span class="line"><span>consumed by capacitor C, and hence the average power Pav must ﬂow entirely into the load</span></span>
<span class="line"><span>resistor R:</span></span>
<span class="line"><span>Pav= V2</span></span>
<span class="line"><span>rms</span></span>
<span class="line"><span>R (15.35)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>598 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>p(t)</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>+ R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)vg(t)</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>Fig. 15.14 Ac network example containing a loss-free resistor model</span></span>
<span class="line"><span>Upon equating Eqs. (15.34) and (15.35), we obtain</span></span>
<span class="line"><span>Vrms</span></span>
<span class="line"><span>Vg,rms</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>(15.36)</span></span>
<span class="line"><span>Thus, the rms terminal voltages obey the same relationship as in the dc case.</span></span>
<span class="line"><span>Averaged equivalent circuits of the DCM buck, boost, and buck–boost converters, as well</span></span>
<span class="line"><span>as the DCM ´Cuk and SEPIC converters, are listed in Fig.15.15. In each case, the averaged tran-</span></span>
<span class="line"><span>sistor waveforms obey Ohm’s law, and are modeled by an eﬀective resistance Re. The averaged</span></span>
<span class="line"><span>diode waveforms follow a power source characteristic, equal to the power eﬀectively dissipated</span></span>
<span class="line"><span>in Re. For the buck, boost, and buck–boost converters, Re is given by</span></span>
<span class="line"><span>Re= 2L</span></span>
<span class="line"><span>d2Ts</span></span>
<span class="line"><span>(15.37)</span></span>
<span class="line"><span>For the ´Cuk and SEPIC converters, Re is given by</span></span>
<span class="line"><span>Re= 2(L1∥L2)</span></span>
<span class="line"><span>d2Ts</span></span>
<span class="line"><span>(15.38)</span></span>
<span class="line"><span>Here, d is the transistor duty cycle.</span></span>
<span class="line"><span>Steady-state conditions in the converters of Fig.15.15 are found by letting the inductors and</span></span>
<span class="line"><span>capacitors become short circuits and open circuits, respectively, and then solving the resulting dc</span></span>
<span class="line"><span>circuits with d(t)= D. The buck–boost, ´Cuk, and SEPIC then reduce to the circuit of Fig.15.13.</span></span>
<span class="line"><span>The buck and boost converters reduce to the circuits of Fig.15.16. Equilibrium conversion ratios</span></span>
<span class="line"><span>M= V/Vg of these converters are summarized in Table 15.1, as functions of Re(D). It can be</span></span>
<span class="line"><span>shown that these converters operate in the discontinuous conduction mode whenever the load</span></span>
<span class="line"><span>current I is less than the critical current I</span></span>
<span class="line"><span>crit:</span></span>
<span class="line"><span>I&gt; Icrit for CCM</span></span>
<span class="line"><span>I&lt; Icrit for DCM (15.39)</span></span>
<span class="line"><span>For all of these converters, Icrit is given by</span></span>
<span class="line"><span>Icrit= 1−D</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Re(D) (15.40)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.2 DCM Averaged Switch Model 599</span></span>
<span class="line"><span>Fig. 15.15 Averaged large-signal equivalent circuits of ﬁve basic converters operating in the discontinu-</span></span>
<span class="line"><span>ous conduction mode</span></span>
<span class="line"><span></span></span>
<span class="line"><span>600 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>Re(D)</span></span>
<span class="line"><span>+ R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VVg</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>PRe(D)+ R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VVg</span></span>
<span class="line"><span>Fig. 15.16 Dc equivalent circuits representing the buck (a) and boost (b) converters operating in DCM</span></span>
<span class="line"><span>Table 15.1 CCM and DCM conversion ratios of basic converters</span></span>
<span class="line"><span>Converter M, CCM M,D C M</span></span>
<span class="line"><span>Buck D 2</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4Re</span></span>
<span class="line"><span>/R</span></span>
<span class="line"><span>Boost 1</span></span>
<span class="line"><span>1−D</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4R/Re</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Buck–boost, ´Cuk −D</span></span>
<span class="line"><span>1−D −</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>SEPIC D</span></span>
<span class="line"><span>1−D</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>15.3 Small-Signal AC Modeling of the DCM Switch Network</span></span>
<span class="line"><span>The next step is construction of a small-signal equivalent circuit model for converters operating</span></span>
<span class="line"><span>in the discontinuous conduction mode. In the large-signal ac equivalent circuits of Fig. 15.15,</span></span>
<span class="line"><span>the averaged switch networks are nonlinear. Hence, construction of a small-signal ac model</span></span>
<span class="line"><span>involves perturbation and linearization of the loss-free resistor network. The signals in the large-</span></span>
<span class="line"><span>signal averaged DCM switch network model of Fig. 15.17a are perturbed about a quiescent</span></span>
<span class="line"><span>operating point, as follows:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.3 Small-Signal AC Modeling of the DCM Switch Network 601</span></span>
<span class="line"><span>Fig. 15.17 Averaged models of the general two-switch network in a converter operating in DCM: ( a)</span></span>
<span class="line"><span>large-signal model, (b) small-signal model</span></span>
<span class="line"><span>d(t)= D+ ˆd(t)</span></span>
<span class="line"><span>⟨v1(t)⟩Ts = V1+ ˆv1(t)</span></span>
<span class="line"><span>⟨i1(t)⟩Ts = I1+ ˆi1(t) (15.41)</span></span>
<span class="line"><span>⟨v2(t)⟩Ts = V2+ ˆv2(t)</span></span>
<span class="line"><span>⟨i2(t)⟩Ts = I2+ ˆi2(t)</span></span>
<span class="line"><span>Here, D is the quiescent value of the transistor duty cycle, V1 is the quiescent value of the</span></span>
<span class="line"><span>applied average transistor voltage⟨v1(t)⟩Ts , etc. The quantities ˆd(t), ˆv1(t), etc., are small ac vari-</span></span>
<span class="line"><span>ations about the respective quiescent values. It is desired to linearize the average switch network</span></span>
<span class="line"><span>terminal equations (15.20) and (15.21).</span></span>
<span class="line"><span>Equations (15.20) and (15.21) express the average terminal currents⟨i1(t)⟩Ts and⟨i2(t)⟩Ts as</span></span>
<span class="line"><span>functions of the transistor duty cycled(t)= d1(t) and the average terminal voltages⟨v1(t)⟩Ts and</span></span>
<span class="line"><span>⟨v2(t)⟩Ts . Upon perturbation and linearization of these equations, we will therefore ﬁnd thatˆi1(t)</span></span>
<span class="line"><span>and ˆi2(t) are expressed as linear functions of ˆd(t), ˆv1(t), and ˆv2(t). So the small-signal switch</span></span>
<span class="line"><span>network equations can be written in the following form:</span></span>
<span class="line"><span>ˆi1= ˆv1</span></span>
<span class="line"><span>r1</span></span>
<span class="line"><span>+ j1 ˆd+ g1 ˆv2</span></span>
<span class="line"><span>ˆi2=−ˆv2</span></span>
<span class="line"><span>r2</span></span>
<span class="line"><span>+ j2 ˆd+ g2 ˆv1 (15.42)</span></span>
<span class="line"><span>These equations describe the two-port equivalent circuit of Fig.15.17b.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>602 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>The parameters r1, j1, and g1 can be found by Taylor expansion of Eq. (15.20), as described</span></span>
<span class="line"><span>in Sect. 7.2.8. The average transistor current⟨i1(t)⟩Ts ,E q .(15.20), can be expressed in the fol-</span></span>
<span class="line"><span>lowing form:</span></span>
<span class="line"><span>⟨i1(t)⟩Ts =⟨v1(t)⟩Ts</span></span>
<span class="line"><span>Re(d(t))= f1</span></span>
<span class="line"><span>⎦⟨v1(t)⟩Ts,⟨v2(t)⟩Ts, d(t)) (15.43)</span></span>
<span class="line"><span>Let us expand this expression in a three-dimensional Taylor series, about the quiescent operating</span></span>
<span class="line"><span>point (V1, V2, D):</span></span>
<span class="line"><span>I1+ ˆi1(t)= f1(V1, V2, D)+ ˆv1(t)∂f1(v1, V2, D)</span></span>
<span class="line"><span>∂v1</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>v1=V1</span></span>
<span class="line"><span>+ˆv2(t)∂f1(V1, v2, D)</span></span>
<span class="line"><span>∂v2</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>v2=V2</span></span>
<span class="line"><span>+ ˆd(t)∂f1(V1, V2, d)</span></span>
<span class="line"><span>∂d</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>d=D</span></span>
<span class="line"><span>(15.44)</span></span>
<span class="line"><span>+higher−order nonlinear terms</span></span>
<span class="line"><span>For simplicity of notation, the angle brackets denoting average values are dropped in the above</span></span>
<span class="line"><span>equation. The dc terms on both sides of Eq. (15.44) must be equal:</span></span>
<span class="line"><span>I1= f1(V1, V2, D)= V1</span></span>
<span class="line"><span>Re(D) (15.45)</span></span>
<span class="line"><span>As usual, we linearize the equation by discarding the higher-order nonlinear terms. The remain-</span></span>
<span class="line"><span>ing ﬁrst-order linear ac terms on both sides of Eq. (15.44) are equated:</span></span>
<span class="line"><span>ˆi1(t)= ˆv1(t) 1</span></span>
<span class="line"><span>r1</span></span>
<span class="line"><span>+ ˆv2(t)g1+ ˆd(t) j1 (15.46)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>r1</span></span>
<span class="line"><span>= ∂f1(v1, V2, D)</span></span>
<span class="line"><span>∂v1</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>v1=V1</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>Re(D) (15.47)</span></span>
<span class="line"><span>g1= ∂f1(V1, v2, D)</span></span>
<span class="line"><span>∂v2</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>v2=V2</span></span>
<span class="line"><span>= 0 (15.48)</span></span>
<span class="line"><span>j1= ∂f1(V1, V2, d)</span></span>
<span class="line"><span>∂d</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>d=D</span></span>
<span class="line"><span>=−V1</span></span>
<span class="line"><span>R2e (D)</span></span>
<span class="line"><span>∂Re(d)</span></span>
<span class="line"><span>∂d</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>d=D</span></span>
<span class="line"><span>(15.49)</span></span>
<span class="line"><span>= 2V1</span></span>
<span class="line"><span>DRe(D)</span></span>
<span class="line"><span>Thus, the small-signal input resistance r1 is equal to the eﬀective resistance Re, evaluated at</span></span>
<span class="line"><span>the quiescent operating point. This term describes how variations in ⟨v1(t)⟩Ts aﬀect⟨i1(t)⟩Ts ,</span></span>
<span class="line"><span>via Re(D). The small-signal parameter g1 is equal to zero, since the average transistor current</span></span>
<span class="line"><span>⟨i1(t)⟩TS is independent of the average diode voltage⟨v2(t)⟩Ts . The small-signal gain j1 describes</span></span>
<span class="line"><span>how duty-cycle variations, which aﬀect the value of Re(d), lead to variations in⟨i1(t)⟩Ts .</span></span>
<span class="line"><span>In a similar manner,⟨i2(t)⟩Ts from Eq. (15.21) can be expressed as</span></span>
<span class="line"><span>⟨i2(t)⟩Ts =</span></span>
<span class="line"><span>⟨v1(t)⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re(d(t))⟨v2(t)⟩Ts</span></span>
<span class="line"><span>= f2</span></span>
<span class="line"><span>⎦⟨v1(t)⟩Ts,⟨v2(t)⟩Ts, d(t)) (15.50)</span></span>
<span class="line"><span>Expansion of the function f2(v1, v2, d) in a three-dimensional Taylor series about the quiescent</span></span>
<span class="line"><span>operating point leads to</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.3 Small-Signal AC Modeling of the DCM Switch Network 603</span></span>
<span class="line"><span>I2+ ˆi2(t)= f2(V1, V2, D)+ ˆv1(t)∂f2(v1, V2, D)</span></span>
<span class="line"><span>∂v1</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>v1=V1</span></span>
<span class="line"><span>+ˆv2(t)∂f2(V1, v2, D)</span></span>
<span class="line"><span>∂v2</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>v2=V2</span></span>
<span class="line"><span>+ ˆd(t)∂f2(V1, V2, d)</span></span>
<span class="line"><span>∂d</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>d=D</span></span>
<span class="line"><span>(15.51)</span></span>
<span class="line"><span>+higher−order nonlinear terms</span></span>
<span class="line"><span>By equating the dc terms on both sides of Eq. (15.51), we obtain</span></span>
<span class="line"><span>I2= f2(V1, V2, D)= V2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Re(D)V2</span></span>
<span class="line"><span>(15.52)</span></span>
<span class="line"><span>The higher-order nonlinear terms are discarded, leaving the following ﬁrst-order linear ac terms:</span></span>
<span class="line"><span>ˆi2(t)= ˆv2(t)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>−1</span></span>
<span class="line"><span>r2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ ˆv1(t)g2+ ˆd(t) j2 (15.53)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>r2</span></span>
<span class="line"><span>=−∂f2(V1, v2, D)</span></span>
<span class="line"><span>∂v2</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>v2=V2</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>R= 1</span></span>
<span class="line"><span>M2Re(D) (15.54)</span></span>
<span class="line"><span>g2= ∂f2(v1, V2, D)</span></span>
<span class="line"><span>∂v1</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>v1=V1</span></span>
<span class="line"><span>= 2</span></span>
<span class="line"><span>MRe(D) (15.55)</span></span>
<span class="line"><span>j2= ∂f2(V1, V2, d)</span></span>
<span class="line"><span>∂d</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>d=D</span></span>
<span class="line"><span>=− V2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>R2e (D)V2</span></span>
<span class="line"><span>∂Re(d)</span></span>
<span class="line"><span>∂d</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>d=D</span></span>
<span class="line"><span>(15.56)</span></span>
<span class="line"><span>= 2V1</span></span>
<span class="line"><span>DMRe(D)</span></span>
<span class="line"><span>The output resistance r2 describes how variations in⟨v2(t)⟩Ts inﬂuence⟨i2(t)⟩Ts . As illustrated</span></span>
<span class="line"><span>in Fig. 15.18, r2 is determined by the slope of the power source characteristic, evaluated at the</span></span>
<span class="line"><span>quiescent operating point. For a linear resistive load, r2 = R. For any type of load, it is true</span></span>
<span class="line"><span>Fig. 15.18 The small-signal output resistance r2 is determined by the slope of the power source charac-</span></span>
<span class="line"><span>teristic at the quiescent operating point</span></span>
<span class="line"><span></span></span>
<span class="line"><span>604 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>Table 15.2 Small-signal DCM switch model parameters</span></span>
<span class="line"><span>Switch network g1 j1 r1 g2 j2 r2</span></span>
<span class="line"><span>General</span></span>
<span class="line"><span>two-switch,</span></span>
<span class="line"><span>Fig. 15.11a</span></span>
<span class="line"><span>0 2V1</span></span>
<span class="line"><span>DRe</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>MRe</span></span>
<span class="line"><span>2V1</span></span>
<span class="line"><span>DMRe</span></span>
<span class="line"><span>M2Re</span></span>
<span class="line"><span>Buck, Fig.15.21a −1</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>2(1−M)V1</span></span>
<span class="line"><span>DRe</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>2−M</span></span>
<span class="line"><span>MRe</span></span>
<span class="line"><span>2(1−M)V1</span></span>
<span class="line"><span>DMRe</span></span>
<span class="line"><span>M2Re</span></span>
<span class="line"><span>Boost,</span></span>
<span class="line"><span>Fig. 15.21b − 1</span></span>
<span class="line"><span>(M−1)2Re</span></span>
<span class="line"><span>2MV1</span></span>
<span class="line"><span>D(M−1)Re</span></span>
<span class="line"><span>(M−1)2</span></span>
<span class="line"><span>M2 Re</span></span>
<span class="line"><span>2M−1</span></span>
<span class="line"><span>(M−1)2Re</span></span>
<span class="line"><span>2V1</span></span>
<span class="line"><span>D(M−1)Re</span></span>
<span class="line"><span>(M−1)2Re</span></span>
<span class="line"><span>Fig. 15.19 Small-signal ac model of the DCM buck–boost converter obtained by insertion of the switch</span></span>
<span class="line"><span>network two-port small-signal model into the original converter circuit</span></span>
<span class="line"><span>that r2 = M2Re(D). The parameters j2 and g2 describe how variations in the duty cycle d(t)</span></span>
<span class="line"><span>and in the average transistor voltage⟨v1(t)⟩Ts (which inﬂuence the average power⟨p(t)⟩Ts ) lead</span></span>
<span class="line"><span>to variations in the average diode current⟨i2(t)⟩Ts . Values of the small-signal parameters in the</span></span>
<span class="line"><span>DCM switch model of Fig. 15.17b are summarized in the top row of Table15.2.</span></span>
<span class="line"><span>A small-signal model of the DCM buck–boost converter is obtained by replacing the transis-</span></span>
<span class="line"><span>tor and diode of the converter with the switch model of Fig. 15.17b. The result is illustrated in</span></span>
<span class="line"><span>Fig. 15.19. This equivalent circuit can now be solved using conventional linear circuit analysis</span></span>
<span class="line"><span>techniques, to determine the transfer functions and other small-signal quantities of interest.</span></span>
<span class="line"><span>The small-signal equivalent circuit models of Fig. 15.19 contain two dynamic elements: ca-</span></span>
<span class="line"><span>pacitor C and inductor L. Control-to-output transfer functions obtained by solving this equiv-</span></span>
<span class="line"><span>alent circuit model have two poles. It has been shown [ 71, 74, 126, 130, 131] that one of the</span></span>
<span class="line"><span>poles, due to the capacitor C, appears at a low frequency, while the other pole (and a RHP</span></span>
<span class="line"><span>zero) due to the inductor L, occurs at much higher frequency, close to or above the converter</span></span>
<span class="line"><span>switching frequency. The small-signal equivalent circuit models have been derived from the</span></span>
<span class="line"><span>large-signal averaged switch network equations (15.20) and (15.21). These equations are based</span></span>
<span class="line"><span>on the approximation in Eq. ( 15.5), which states that the average inductor voltage, and there-</span></span>
<span class="line"><span>fore its small-signal ac voltage, is zero. This contradicts predictions of the resulting small-signal</span></span>
<span class="line"><span>model in Fig.15.19. As a result, we expect that the models derived in this section can be used to</span></span>
<span class="line"><span>predict low-frequency dynamics, while predictions of the high-frequency dynamics due to the</span></span></code></pre></div>`,10)])])}const v=s(i,[["render",l]]);export{u as __pageData,v as default};
