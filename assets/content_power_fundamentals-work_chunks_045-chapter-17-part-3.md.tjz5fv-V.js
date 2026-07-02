import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第17章part 3 - 17 Input Filter Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第17章part 3 - 17 Input Filter Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 718-726 > Chunk ID: `chapter-17-part-3`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/045-chapter-17-part-3.md","filePath":"content/power/fundamentals-work/chunks/045-chapter-17-part-3.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/045-chapter-17-part-3.md"};function t(l,n,o,c,r,h){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="第17章part-3-17-input-filter-design" tabindex="-1">第17章part 3 - 17 Input Filter Design <a class="header-anchor" href="#第17章part-3-17-input-filter-design" aria-label="Permalink to &quot;第17章part 3 - 17 Input Filter Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 718-726<br> Chunk ID: <code>chapter-17-part-3</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>17.5 Stability Criteria 715</span></span>
<span class="line"><span>Fig. 17.43 Determination of Yi∞</span></span>
<span class="line"><span>At frequencies where the loop gainT is large in magnitude, the converter closed-loop incremen-</span></span>
<span class="line"><span>tal input admittanceYi is negative. The quantity 1/Yi∞coincides with theZN listed in Table17.1;</span></span>
<span class="line"><span>when the loop gain is large then the converter closed-loop input impedance follows ZN .</span></span>
<span class="line"><span>The gain Yi0 is given by</span></span>
<span class="line"><span>Yi0(s)=</span></span>
<span class="line"><span>ˆit(s)</span></span>
<span class="line"><span>ˆvt(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>ˆvx→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(17.74)</span></span>
<span class="line"><span>The loop reference variation ˆvre f is set to zero. In the presence of the test source ˆvt, the signal</span></span>
<span class="line"><span>ˆvz is adjusted such that ˆvx is nulled. Figure 17.44 illustrates solution of the model under these</span></span>
<span class="line"><span>conditions.</span></span>
<span class="line"><span>With ˆvx equal to zero, the duty-cycle variation ˆd is zero. Hence the canonical model sources</span></span>
<span class="line"><span>e(s) ˆd and j(s) ˆd become zero. The converter input admittanceYi0 is then the eﬀective ﬁlter input</span></span>
<span class="line"><span>admittance 1/Zei(s), reﬂected through the transformer turns ratio M2:</span></span>
<span class="line"><span>Yi0(s)= M2</span></span>
<span class="line"><span>Zei(s) (17.75)</span></span>
<span class="line"><span>At frequencies where the loop gain T is small in magnitude, then the converter closed-loop</span></span>
<span class="line"><span>incremental input admittance Yi follows the open-loop value M2/Zei. This quantity is a passive</span></span>
<span class="line"><span>admittance, having phase in the range−90◦≤∠Yi ≤+90◦. The quantity 1/Yi0 coincides with</span></span>
<span class="line"><span>the ZD listed in Table 17.1; when the loop gain is small then the converter closed-loop input</span></span>
<span class="line"><span>impedance follows ZD.</span></span>
<span class="line"><span>The loop gain T(s)o fE q .(17.70) is given by</span></span>
<span class="line"><span>T(s)= ˆvy(s)</span></span>
<span class="line"><span>ˆvx(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>ˆvt=0</span></span>
<span class="line"><span>(17.76)</span></span>
<span class="line"><span>This is the loop gain of the original closed-loop regulator, before addition of the input ﬁlter.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>716 17 Input Filter Design</span></span>
<span class="line"><span>Fig. 17.44 Determination of Yi0</span></span>
<span class="line"><span>Construction of Zi</span></span>
<span class="line"><span>Construction of the closed-loop input impedance Zi = 1/Yi based on the results of</span></span>
<span class="line"><span>Eqs. (17.70), (17.73), and (17.75). Graphical construction of Zi is illustrated in Fig. 17.45 for a</span></span>
<span class="line"><span>simple buck converter example. Figure 17.45a contains magnitude asymptotes of T, T/(1+ T),</span></span>
<span class="line"><span>and 1/(1+ T), constructed as described in Sect. 9.3. The loop gain for this simple example in-</span></span>
<span class="line"><span>cludes the resonant poles of the converterL–C ﬁlter at frequency fo, plus a high-frequency zero.</span></span>
<span class="line"><span>The loop crossover frequency is fc, and the phase margin ofT leads to peaking with closed-loop</span></span>
<span class="line"><span>Q-factor Qc as described in Sect. 9.4.3.</span></span>
<span class="line"><span>Figure 17.45b illustrates construction of the admittance terms of Eq. ( 17.70). The ZN and</span></span>
<span class="line"><span>ZD terms of Table 17.1 are inverted to obtain their admittances, and then are multiplied by the</span></span>
<span class="line"><span>T/(1+ T) and 1/(1+ T) plots of Fig.17.45a. Figure 17.45c contains plots of the magnitude and</span></span>
<span class="line"><span>phase of the converter closed-loop input impedance Zi, derived from Fig. 17.45b according to</span></span>
<span class="line"><span>Eq. (17.70).</span></span>
<span class="line"><span>At frequencies well below the original loop crossover frequency fc where the loop gain T</span></span>
<span class="line"><span>is large in magnitude, then T/(1+ T)≈1 and 1/(1+ T) is small. Hence, Yi≈Yi∞and Zi≈ZN .</span></span>
<span class="line"><span>As illustrated in Fig. 17.45c, Zi follows−R/M2 and has phase−180◦at low frequency.</span></span>
<span class="line"><span>At frequencies well above fc where∥T∥≪ 1, then∥T/(1+ T)∥≪ 1 and∥1/(1+ T)∥≈1.</span></span>
<span class="line"><span>Hence Yi≈Yi0 and the closed-loop input impedanceZi follows ZD. For the example asymptotes</span></span>
<span class="line"><span>of Fig. 17.45, Zi follows the inductor asymptote sL/ M2 at high frequency, with a phase of+90◦.</span></span>
<span class="line"><span>In the vicinity of the original loop crossover frequency fc, the impedance Zi transitions</span></span>
<span class="line"><span>between ZN and ZD. In general, the ZN and ZD asymptotes can diﬀer at the loop crossover</span></span>
<span class="line"><span>frequency, and hence this transition will contain new asymptotes that are not present in ZN and</span></span>
<span class="line"><span>ZD alone. Depending on the phase margin of the original loop gainT,t h eT/(1+T) and 1/(1+T)</span></span>
<span class="line"><span>t e r m so fE q .(17.70) may contain resonant poles and peaking in the vicinity of fc. This leads to</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.5 Stability Criteria 717</span></span>
<span class="line"><span>Fig. 17.45 Steps in the construction of the asymptotes of the closed-loop converter input impedance</span></span>
<span class="line"><span>Zi(s): (a) converter loop gain T and the closed-loop quantities T/(1+ T)a n d1/(1+ T); (b) the admittance</span></span>
<span class="line"><span>terms of Eq. (17.70); (c) the resulting magnitude and phase asymptotes of Zi(s)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>718 17 Input Filter Design</span></span>
<span class="line"><span>resonant zeroes in Zi = 1/Yi; therefore it is possible that∥Zi∥ is smaller than∥ZN∥ and∥ZD∥ in</span></span>
<span class="line"><span>the vicinity of fc. Additionally, Zi contains a RHP pole at frequency fnd; at frequencies greater</span></span>
<span class="line"><span>than fnd, the negative sign ofZN is cancelled by the negative sign of the RHP pole, andZi reverts</span></span>
<span class="line"><span>to a passive open-loop impedance. It should be noted that the RHP pole of Zi does not directly</span></span>
<span class="line"><span>lead to instability: when the converter is driven by a voltage source vg, the current is given by</span></span>
<span class="line"><span>the transfer function ig = vg/Zi. This transfer function contains a RHP zero at fnd, and exhibits</span></span>
<span class="line"><span>no RHP poles.</span></span>
<span class="line"><span>Determination of stability</span></span>
<span class="line"><span>Next, we can construct the minor loop gain Tm = Zo/Zi of Eq. (17.68). In Fig. 17.46, an input</span></span>
<span class="line"><span>ﬁlter impedance Zo is overlayed on the Zi impedance of Fig. 17.45c. As illustrated in Fig.17.46,</span></span>
<span class="line"><span>the magnitude of Tm can be found by subtracting the magnitude∥Zi∥dB from∥Zo∥dB.A tt h ef r e -</span></span>
<span class="line"><span>quency or frequencies where∥Zi∥=∥Zo∥, the minor loop gainTm exhibits a crossover frequency.</span></span>
<span class="line"><span>The phase of Tm at a given frequency also can be found by subtracting:∠Tm=∠Zo−∠Zi.</span></span>
<span class="line"><span>The Bode plot of the minor loop gain Tm is constructed in Fig. 17.47, based on the</span></span>
<span class="line"><span>impedance asymptotes of Fig.17.46. To conform with the conventional appearance of loop gain</span></span>
<span class="line"><span>phase, the phase asymptotes of Tm have been shifted by−360◦; this corresponds to multiplying</span></span>
<span class="line"><span>Tm by e−j360◦</span></span>
<span class="line"><span>= 1, and does not change the result. For the speciﬁc case sketched in Fig. 17.46,</span></span>
<span class="line"><span>the input ﬁlter impedance∥Zo∥ is greater than the converter closed-loop input impedance ∥Zi∥</span></span>
<span class="line"><span>over the frequency range from fmc1 to fmc2. As illustrated in Fig. 17.47, the minor loop gain</span></span>
<span class="line"><span>Tm exhibits crossover frequencies at fmc1 and fmc2, and reaches a peak magnitude of Rf M2/R</span></span>
<span class="line"><span>at the ﬁlter resonant frequency ff . The phase of Tm at frequency fmc1 is approximately−90◦,</span></span>
<span class="line"><span>corresponding to a phase margin of+90◦. The phase of Tm is approximately−270◦at fmc2, cor-</span></span>
<span class="line"><span>Fig. 17.46 Superimposing the input ﬁlter impedance asymptotes Zo on the converter closed-loop input</span></span>
<span class="line"><span>impedance asymptotes Zi to determine the minor loop gain Tm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.5 Stability Criteria 719</span></span>
<span class="line"><span>Fig. 17.47 Bode plot of minor loop gain Tm for the example of Fig. 17.46</span></span>
<span class="line"><span>Re[Tm(jω )]</span></span>
<span class="line"><span>Im[Tm(jω )]</span></span>
<span class="line"><span>+1f = 0</span></span>
<span class="line"><span>f = fmc1</span></span>
<span class="line"><span>f = fmc2</span></span>
<span class="line"><span>f = ff</span></span>
<span class="line"><span>f →∞</span></span>
<span class="line"><span>– R f</span></span>
<span class="line"><span>R/M2</span></span>
<span class="line"><span>Fig. 17.48 Nyquist plot of minor loop gain Tm for the example of Fig. 17.46. Crosshatching denotes the</span></span>
<span class="line"><span>region to the right of the contour; the−1 point is enclosed</span></span>
<span class="line"><span>responding to a phase margin of−90◦. The minor loop gain Tm contains resonant poles at the</span></span>
<span class="line"><span>original loop crossover frequency fc and a right half-plane zero at frequency fnd.</span></span>
<span class="line"><span>With multiple crossover frequencies, determination of stability should be resolved by use</span></span>
<span class="line"><span>of the Nyquist plot. The positive-frequency portion of the Nyquist plot of the minor loop gain</span></span>
<span class="line"><span>Tm(s) is illustrated in Fig. 17.48. The minor loop gain has magnitude zero at dc. As frequency</span></span>
<span class="line"><span>increases, Tm increases in magnitude with approximate phase−90◦, until it reaches unity mag-</span></span>
<span class="line"><span>nitude at f = fmc1. In the vicinity of f = ff , Tm has magnitude greater than 1, with phase</span></span>
<span class="line"><span>decreasing from−90◦towards−270◦. At frequencies greater than fmc2, Tm exhibits magnitude</span></span>
<span class="line"><span>less than 1. It can be seen that the−1 point is encircled once by the positive-frequency portion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>720 17 Input Filter Design</span></span>
<span class="line"><span>of the Nyquist plot sketched in Fig. 17.48. The negative-frequency portion of the Nyquist plot,</span></span>
<span class="line"><span>which is the complex conjugate (not shown in Fig. 17.48), also encircles the −1 point once.</span></span>
<span class="line"><span>Consequently, the closed-loop term</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Tm</span></span>
<span class="line"><span>= Zi</span></span>
<span class="line"><span>Zo+ Zi</span></span>
<span class="line"><span>(17.77)</span></span>
<span class="line"><span>contains two right half-plane poles, and is unstable. The regulator closed-loop transfer functions</span></span>
<span class="line"><span>such as Eq. (17.67) will also exhibit these two right half-plane poles.</span></span>
<span class="line"><span>It can be observed from Fig.17.48 that the encirclements of the−1 point could be eliminated</span></span>
<span class="line"><span>by reducing the magnitude of the quantity Rf/(R/M2) to be less than unity. Then the Nyquist</span></span>
<span class="line"><span>plot no longer would encircle the −1 point, and the minor loop Tm would no longer introduce</span></span>
<span class="line"><span>RHP poles. This coincides with the earlier conclusion that adequate damping of the input ﬁlter</span></span>
<span class="line"><span>can stabilize the system.</span></span>
<span class="line"><span>17.5.3 Discussion</span></span>
<span class="line"><span>Section 17.5 describes two distinct approaches to derivation of the exact stability boundary of a</span></span>
<span class="line"><span>switching regulator with addition of an input ﬁlter. In Sect. 17.5.1, the Extra Element Theorem</span></span>
<span class="line"><span>is employed to determine the modiﬁed loop gain T′(s). The usual gain and phase margin tests</span></span>
<span class="line"><span>can then be employed to ascertain the stability of the modiﬁed regulator system. By contrast,</span></span>
<span class="line"><span>the approach of Sect. 17.5.2 employs the Feedback Theorem to ﬁnd the new closed-loop poles</span></span>
<span class="line"><span>induced by addition of the input ﬁlter. These poles are ascribed to a voltage divider term that</span></span>
<span class="line"><span>accounts for the loading of the input ﬁlter impedance Z</span></span>
<span class="line"><span>o(s) by the closed-loop converter input</span></span>
<span class="line"><span>impedance Zi(s). This voltage divider term can be viewed as having an eﬀective minor loop gain</span></span>
<span class="line"><span>Tm(s)= Zo(s)/Zi(s), whose stability can be ascertained using the usual techniques including</span></span>
<span class="line"><span>phase and gain margins and the Nyquist stability tests.</span></span>
<span class="line"><span>Thus, we have two distinct approaches to determination of the stability boundary of the reg-</span></span>
<span class="line"><span>ulator when modiﬁed by addition of an input ﬁlter. It can be veriﬁed that identical closed-loop</span></span>
<span class="line"><span>poles and characteristic equations are predicted by the two approaches. Hence, provided that the</span></span>
<span class="line"><span>original unmodiﬁed system is stable, the two approaches predict identical stability boundaries.</span></span>
<span class="line"><span>Finally, it should be emphasized that Sects. 17.1 to 17.4 are concerned with design of an</span></span>
<span class="line"><span>input ﬁlter that does not disrupt the important transfer functions of the closed-loop regulator,</span></span>
<span class="line"><span>while Sect. 17.5 is concerned with determination of the formal stability boundary. While these</span></span>
<span class="line"><span>are very diﬀerent goals, it is revealing that all approaches rely on the impedances ZN and ZD</span></span>
<span class="line"><span>of Table 17.1,a l b e i ti nd iﬀerent ways. Ultimately, the impedance inequalities of Eq. (17.19)a r e</span></span>
<span class="line"><span>the governing design criteria, with the issue only being how conservative should the design be.</span></span>
<span class="line"><span>The engineer can employ modern tools to plot the relevant equations of all sections and produce</span></span>
<span class="line"><span>an informed and optimized design.</span></span>
<span class="line"><span>17.6 Summary of Key Points</span></span>
<span class="line"><span>1. Switching converters usually require input ﬁlters, to reduce conducted electromagnetic in-</span></span>
<span class="line"><span>terference and possibly also to meet requirements concerning conducted susceptibility.</span></span>
<span class="line"><span>2. Addition of an input ﬁlter to a converter alters the control-to-output and other transfer func-</span></span>
<span class="line"><span>tions of the converter. Design of the converter control system must account for the eﬀects</span></span>
<span class="line"><span>of the input ﬁlter.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.6 Summary of Key Points 721</span></span>
<span class="line"><span>3. If the input ﬁlter is not damped, then it typically introduces complex poles and RHP zeroes</span></span>
<span class="line"><span>into the converter control-to-output transfer function, at the resonant frequencies of the</span></span>
<span class="line"><span>input ﬁlter. If these resonant frequencies are lower than the crossover frequency of the</span></span>
<span class="line"><span>controller loop gain, then the phase margin will become negative and the regulator will be</span></span>
<span class="line"><span>unstable.</span></span>
<span class="line"><span>4. The input ﬁlter can be designed so that it does not signiﬁcantly change the converter control-</span></span>
<span class="line"><span>to-output and other transfer functions. Impedance inequalities ( 17.19) give simple design</span></span>
<span class="line"><span>criteria that guarantee this. To meet these design criteria, the resonances of the input ﬁlter</span></span>
<span class="line"><span>must be suﬃciently damped.</span></span>
<span class="line"><span>5. Optimization of the damping networks of single-section ﬁlters can yield signiﬁcant savings</span></span>
<span class="line"><span>in ﬁlter element size. Equations for optimizing three diﬀerent ﬁlter sections are listed.</span></span>
<span class="line"><span>6. Substantial savings in ﬁlter element size can be realized via cascading ﬁlter sections. The</span></span>
<span class="line"><span>design of noninteracting cascaded ﬁlter sections can be achieved by an approach similar to</span></span>
<span class="line"><span>the original input ﬁlter design method. Impedance inequalities ( 17.50) give design criteria</span></span>
<span class="line"><span>that guarantee that interactions are not substantial.</span></span>
<span class="line"><span>7. Another useful approach for determination of the exact stability boundary is based on the</span></span>
<span class="line"><span>loading of the input ﬁlter, whose output impedance is Z</span></span>
<span class="line"><span>o(s), by the closed-loop converter</span></span>
<span class="line"><span>input impedance Zi(s). The stability is examined by treating Tm(s)= Zo(s)/Zi(s) as a minor</span></span>
<span class="line"><span>loop gain using conventional techniques such as the Nyquist stability theorem and the phase</span></span>
<span class="line"><span>margin test.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>17.1 It is required to design an input ﬁlter for the ﬂyback converter of Fig. 17.49. The max-</span></span>
<span class="line"><span>imum allowed amplitude of switching harmonics of iin(t)i s1 0 μA rms. Calculate the</span></span>
<span class="line"><span>required attenuation of the ﬁlter at the switching frequency.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Lp</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vVg</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D11:n</span></span>
<span class="line"><span>C RInput</span></span>
<span class="line"><span>filter</span></span>
<span class="line"><span>ig(t) n = 0.5</span></span>
<span class="line"><span>250 μH 100 μF</span></span>
<span class="line"><span>48 V</span></span>
<span class="line"><span>5 </span></span>
<span class="line"><span>iin(t)</span></span>
<span class="line"><span>D = 0.3</span></span>
<span class="line"><span>fs = 200 kHz</span></span>
<span class="line"><span>Fig. 17.49 Flyback converter, Problems 17.1, 17.4, 17.6, 17.8,a n d17.10</span></span>
<span class="line"><span>17.2 In the boost converter of Fig.17.50, the input ﬁlter is designed so that the maximum am-</span></span>
<span class="line"><span>plitude of switching harmonics of iin(t) is not greater than 10 μA rms. Find the required</span></span>
<span class="line"><span>attenuation of the ﬁlter at the switching frequency.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>722 17 Input Filter Design</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>100 μH</span></span>
<span class="line"><span>33 ! F 12 48 V</span></span>
<span class="line"><span>Input</span></span>
<span class="line"><span>filter</span></span>
<span class="line"><span>iin(t) ig(t)</span></span>
<span class="line"><span>D = 0.6</span></span>
<span class="line"><span>fs = 200 kHz</span></span>
<span class="line"><span>Fig. 17.50 Boost converter, Problems 17.2, 17.5, 17.7,a n d17.9</span></span>
<span class="line"><span>17.3 Derive the expressions for ZN and ZD in Table17.1.</span></span>
<span class="line"><span>17.4 The input ﬁlter for the ﬂyback converter of Fig. 17.49 is designed using a single Lf –C f</span></span>
<span class="line"><span>section. The ﬁlter is damped using a resistor Rf in series with a very large blocking</span></span>
<span class="line"><span>capacitor Cb.</span></span>
<span class="line"><span>(a) Sketch a small-signal model of the ﬂyback converter. Derive expressions for ZN (s)</span></span>
<span class="line"><span>and ZD(s) using your model. Sketch the magnitude Bode plots of ZN and ZD, and</span></span>
<span class="line"><span>label all salient features.</span></span>
<span class="line"><span>(b) Design the input ﬁlter, i.e., select the values of Lf, C f , and Rf ,s ot h a t :(i) the ﬁlter</span></span>
<span class="line"><span>attenuation at the switching frequency is at least 100 dB, and ( ii) the magnitude of</span></span>
<span class="line"><span>the ﬁlter output impedance Zo(s) satisﬁes the conditions|| Zo( jω)||&lt; 0.3|| ZD( jω)||</span></span>
<span class="line"><span>and|| Zo( jω)||&lt; 0.3|| ZN ( jω)||, for all frequencies.</span></span>
<span class="line"><span>(c) Use Spice simulations to verify that the ﬁlter designed in part (b) meets the speciﬁ-</span></span>
<span class="line"><span>cations.</span></span>
<span class="line"><span>(d) Using Spice simulations, plot the converter control-to-output magnitude and phase</span></span>
<span class="line"><span>responses without the input ﬁlter, and with the ﬁlter designed in part (b). Comment</span></span>
<span class="line"><span>on the changes introduced by the ﬁlter.</span></span>
<span class="line"><span>17.5 It is required to design the input ﬁlter for the boost converter of Fig. 17.50 using a sin-</span></span>
<span class="line"><span>gle Lf –C f section. The ﬁlter is damped using a resistor Rf in series with a very large</span></span>
<span class="line"><span>blocking capacitor Cb.</span></span>
<span class="line"><span>(a) Sketch the magnitude Bode plots of ZN (s) and ZD(s) for the boost converter, and</span></span>
<span class="line"><span>label all salient features.</span></span>
<span class="line"><span>(b) Design the input ﬁlter, i.e., select the values of Lf, C f , and Rf ,s ot h a t :(i)t h e</span></span>
<span class="line"><span>ﬁlter attenuation at the switching frequency is at least 80 dB, and ( ii) the mag-</span></span>
<span class="line"><span>nitude of the ﬁlter output impedance Zo(s) satisﬁes the conditions || Zo( jω)|| &lt;</span></span>
<span class="line"><span>0.2|| ZD( jω)||,|| Zo(ω)||&lt; 0.2|| ZN (ω)||, for all frequencies.</span></span>
<span class="line"><span>(c) Use Spice simulations to verify that the ﬁlter designed in part (b) meets the speciﬁ-</span></span>
<span class="line"><span>cations.</span></span>
<span class="line"><span>(d) Using Spice simulations, plot the converter control-to-output magnitude and phase</span></span>
<span class="line"><span>responses without the input ﬁlter, and with the ﬁlter designed in part (b). Comment</span></span>
<span class="line"><span>on the changes in the control-to-output responses introduced by the ﬁlter.</span></span>
<span class="line"><span>17.6 Repeat the ﬁlter design of Problem 17.4 using the optimum ﬁlter damping approach de-</span></span>
<span class="line"><span>scribed in Sect. 17.4.1. Find the values of Lf, C f, Rf , and Cb.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.6 Summary of Key Points 723</span></span>
<span class="line"><span>17.7 Repeat the ﬁlter design of Problem 17.5 using the optimum ﬁlter damping approach of</span></span>
<span class="line"><span>Sect. 17.4.1. Find the values of Lf, C f, Rf , and Cb.</span></span>
<span class="line"><span>17.8 Repeat the ﬁlter design of Problem 17.4 using the optimum Rf –Lb parallel damping ap-</span></span>
<span class="line"><span>proach described in Sect. 17.4.2. Find the values of Lf, C f, Rf , and Lb.</span></span>
<span class="line"><span>17.9 Repeat the ﬁlter design of Problem 17.5 using the optimum Rf –Lb parallel damping ap-</span></span>
<span class="line"><span>proach described in Sect. 17.4.2. Find the values of Lf, C f, Rf , and Lb.</span></span>
<span class="line"><span>17.10 It is required to design the input ﬁlter for the ﬂyback converter of Fig. 17.32 using two</span></span>
<span class="line"><span>ﬁlter sections. Each ﬁlter section is damped using a resistor in series with a blocking</span></span>
<span class="line"><span>capacitor.</span></span>
<span class="line"><span>(a) Design the input ﬁlter, i.e., select values of all circuit parameters, so that (i) the ﬁlter</span></span>
<span class="line"><span>attenuation at the switching frequency is at least 100 dB, and ( ii) the magnitude of</span></span>
<span class="line"><span>the ﬁlter output impedance Zo(s) satisﬁes the conditions|| Zo( jω)∥&lt; 0.3|| ZD( jω)||</span></span>
<span class="line"><span>and|| Zo( jω)||&lt; 0.3|| ZN (ω)||, for all frequencies.</span></span>
<span class="line"><span>(b) Use Spice simulations to verify that the ﬁlter designed in part (a) meets the speciﬁ-</span></span>
<span class="line"><span>cations.</span></span>
<span class="line"><span>(c) Using Spice simulations, plot the converter control-to-output magnitude and phase</span></span>
<span class="line"><span>responses without the input ﬁlter, and with the ﬁlter designed in part (b). Comment</span></span>
<span class="line"><span>on the changes introduced by the ﬁlter.</span></span>
<span class="line"><span>17.11 Consider the boost voltage regulator of Problem9.3. It is required to design an input ﬁlter</span></span>
<span class="line"><span>for this voltage regulator. The ﬁlter should have a single Lf –C f section with optimum</span></span>
<span class="line"><span>damping using a resistor Rf in series with a capacitor Cb.</span></span>
<span class="line"><span>(a) Design the input ﬁlter, i.e., select values of all circuit parameters, so that ( i)t h e</span></span>
<span class="line"><span>ﬁlter attenuation at the switching frequency fs = 200 kHz is equal to at least 80 dB,</span></span>
<span class="line"><span>and (ii) the magnitude of the ﬁlter output impedance Zo(s) satisﬁes the conditions</span></span>
<span class="line"><span>|| Zo( jω)∥≤0.4|| ZD( jω)|| and|| Zo( jω)||≤0.4|| ZN (ω)||, for all frequencies.</span></span>
<span class="line"><span>(b) Determine the closed-loop input impedance Zi(s) of the regulator in Problem 9.3.</span></span>
<span class="line"><span>Examine stability of the closed-loop system by analysis of the minor loop gain</span></span>
<span class="line"><span>Tm(s)= Zo(s)/Zi(s), where Zo(s) is the output impedance of the input ﬁlter designed</span></span>
<span class="line"><span>in part (a).</span></span></code></pre></div>`,10)])])}const f=s(i,[["render",t]]);export{u as __pageData,f as default};
