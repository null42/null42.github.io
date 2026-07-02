import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第18章part 2 - 18 Current-Programmed Control","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第18章part 2 - 18 Current-Programmed Control","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 747-766 > Chunk ID: `chapter-18-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/047-chapter-18-part-2.md","filePath":"content/power/fundamentals-work/chunks/047-chapter-18-part-2.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/047-chapter-18-part-2.md"};function i(c,n,t,r,o,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第18章part-2-18-current-programmed-control" tabindex="-1">第18章part 2 - 18 Current-Programmed Control <a class="header-anchor" href="#第18章part-2-18-current-programmed-control" aria-label="Permalink to &quot;第18章part 2 - 18 Current-Programmed Control&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 747-766<br> Chunk ID: <code>chapter-18-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>18.2 Oscillation for D&gt; 0.5 745</span></span>
<span class="line"><span>(a) iL(t)</span></span>
<span class="line"><span>ic</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>Steady-state</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span>Perturbed</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span>dTs</span></span>
<span class="line"><span>(D + d)Ts</span></span>
<span class="line"><span>ic</span></span>
<span class="line"><span>(b) iL(t)</span></span>
<span class="line"><span>ic</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>Steady-state</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span>Perturbed</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span>dTs</span></span>
<span class="line"><span>(D + d)Ts</span></span>
<span class="line"><span>ic</span></span>
<span class="line"><span>Artificial</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ramp</span></span>
<span class="line"><span>Fig. 18.22 When noise perturbs a controller signal such as ic, the duty cycle is perturbed: ( a) with no</span></span>
<span class="line"><span>artiﬁcial ramp and small inductor current ripple, the perturbation ˆd is large; (b) an artiﬁcial ramp reduces</span></span>
<span class="line"><span>the controller gain, thereby reducing the perturbation ˆd</span></span>
<span class="line"><span>Another common choice of ma is</span></span>
<span class="line"><span>ma= m2 (18.58)</span></span>
<span class="line"><span>This causes the characteristic value α to become zero for all D. As a result, ˆiL(Ts) is zero for</span></span>
<span class="line"><span>any ˆiL(0) that does not saturate the controller. The system removes any error after one switching</span></span>
<span class="line"><span>period Ts. This behavior is known as deadbeat control,o r ﬁnite settling time.</span></span>
<span class="line"><span>It should be noted that the above stability analysis employs a quasi-static approximation,</span></span>
<span class="line"><span>in which the slopes m1 and m2 of the perturbed inductor current waveforms are assumed to be</span></span>
<span class="line"><span>identical to the steady-state case. In the most general case, the stability and transient response</span></span>
<span class="line"><span>of a complete system employing current-programmed control must be assessed using a system-</span></span>
<span class="line"><span>wide discrete-time or sampled-data analysis. Nonetheless, in practice the above arguments are</span></span>
<span class="line"><span>found to be suﬃcient for selection of the artiﬁcial ramp slope m</span></span>
<span class="line"><span>a.</span></span>
<span class="line"><span>Current-programmed controller circuits exhibit signiﬁcant sensitivity to noise. The reason</span></span>
<span class="line"><span>for this is illustrated in Fig. 18.22a, in which the control signal ic(t) is perturbed by a small</span></span>
<span class="line"><span>amount of noise represented by ˆic. It can be seen that, when there is no artiﬁcial ramp and when</span></span>
<span class="line"><span>the inductor current ripple is small, then a small perturbation in ic leads to a large perturbation</span></span>
<span class="line"><span>in the duty cycle: the controller has high gain. When noise is present in the controller circuit,</span></span>
<span class="line"><span>then signiﬁcant jitter in the duty-cycle waveforms may be observed. A solution is to reduce</span></span>
<span class="line"><span>the gain of the controller by introduction of an artiﬁcial ramp. As illustrated in Fig. 18.22b, the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>746 18 Current-Programmed Control</span></span>
<span class="line"><span>same perturbation in ic now leads to a reduced variation in the duty cycle. When the layout and</span></span>
<span class="line"><span>grounding of the controller circuit introduce signiﬁcant noise into the duty-cycle waveform, it</span></span>
<span class="line"><span>may be necessary to add an artiﬁcial ramp whose amplitude is substantially greater than the</span></span>
<span class="line"><span>inductor current ripple.</span></span>
<span class="line"><span>18.3 A More Accurate Model</span></span>
<span class="line"><span>The simple models discussed in the Sect. 18.1 yield much insight into the low-frequency behav-</span></span>
<span class="line"><span>ior of current-programmed converters. Unfortunately, they do not always describe everything</span></span>
<span class="line"><span>that we need to know. For example, the simple model of the buck converter predicts that the</span></span>
<span class="line"><span>line-to-output transfer function G</span></span>
<span class="line"><span>vg(s) is zero. While it is true that this transfer function is usu-</span></span>
<span class="line"><span>ally small in magnitude, the transfer function is not equal to zero. To predict the eﬀect of input</span></span>
<span class="line"><span>voltage disturbances on the output voltage, we need to compute the actual Gvg(s). Furthermore,</span></span>
<span class="line"><span>the simple model does not take into account the e ﬀects of inductor current ripple or artiﬁcial</span></span>
<span class="line"><span>ramp slope on the average value of the inductor current.</span></span>
<span class="line"><span>In this section, a more accurate analysis is performed, which does not rely on the approxi-</span></span>
<span class="line"><span>mation⟨iL(t)⟩Ts ≈ic(t). The analytical approach of [ 167, 168] is combined with the controller</span></span>
<span class="line"><span>model of [169]. A functional block diagram of the current programmed controller is constructed,</span></span>
<span class="line"><span>which accounts for the presence of the artiﬁcial ramp and for the inductor current ripple. This</span></span>
<span class="line"><span>block diagram is appended to the averaged converter models derived in Chap. 7, leading to a</span></span>
<span class="line"><span>complete converter CPM model. Models for the CPM buck, boost, and buck–boost converters</span></span>
<span class="line"><span>are listed, and the buck converter model is analyzed in detail.</span></span>
<span class="line"><span>18.3.1 Current Programmed Controller Model</span></span>
<span class="line"><span>Rather than using the approximation⟨i</span></span>
<span class="line"><span>L(t)⟩TS =⟨ic(t)⟩Ts , let us derive a more accurate expres-</span></span>
<span class="line"><span>sion relating the average inductor current⟨iL(t)⟩Ts to the control input ic(t). Application of the</span></span>
<span class="line"><span>moving average (7.3)t o iL(t),</span></span>
<span class="line"><span>⟨iL(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ t+Ts/2</span></span>
<span class="line"><span>t−Ts/2</span></span>
<span class="line"><span>iL(τ)dτ (18.59)</span></span>
<span class="line"><span>is illustrated in Fig. 18.23 under transient conditions, in which iL(0) is not equal to iL(Ts). It</span></span>
<span class="line"><span>can be seen that the peak value ipk of iL(t)d iﬀers from ic(t), by the magnitude of the artiﬁcial</span></span>
<span class="line"><span>ramp waveform at time t = dTs, that is, by madTs. Furthermore, the peak and the average</span></span>
<span class="line"><span>values of the inductor current waveform diﬀer because of the inductor current ripple. As a result,</span></span>
<span class="line"><span>a relationship between the average inductor current ⟨iL(t)⟩Ts and the control input ic(t)m u s t</span></span>
<span class="line"><span>involve the slope ma of the artiﬁcial ramp, the time interval dTs, as well as the inductor current</span></span>
<span class="line"><span>slopes m1 and m2.Ad iﬃculty arises because this relationship depends on time t in (18.59), i.e.,</span></span>
<span class="line"><span>on the position of the averaging window of lengthTs. This is in contrast to the averaging applied</span></span>
<span class="line"><span>in Chap. 7 to continuous conduction mode waveforms with duty cycle d being an independent</span></span>
<span class="line"><span>control input, where we found that the same results are obtained regardless of the position of</span></span>
<span class="line"><span>the averaging window within a switching period. In current-programmed control, however, duty</span></span>
<span class="line"><span>cycle d is not an independent control input, but is instead determined by the value of the control</span></span>
<span class="line"><span>input i</span></span>
<span class="line"><span>c(t)a t dTs. Just as in the pulse-width modulator discussed in Sect. 7.3, sampling of the</span></span>
<span class="line"><span>control input occurs at the modulated edge of the switch control signal, atdTs. Indeed, as shown</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.3 A More Accurate Model 747</span></span>
<span class="line"><span>Fig. 18.23 Accurate determination of the relationship between the average inductor current ⟨iL(t)⟩Ts</span></span>
<span class="line"><span>and ic</span></span>
<span class="line"><span>in Fig. 18.23,i ti st h ev a l u eo fic(dTs) that determines the duty cycle d in the switching period</span></span>
<span class="line"><span>shown. Hence, the proper relationship between ⟨iL(t)⟩Ts and ic(t) is determined by ﬁnding the</span></span>
<span class="line"><span>average inductor current in (18.59) at the modulator sampling time t= dTs,</span></span>
<span class="line"><span>⟨iL⟩Ts =⟨iL(dTs)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ (d+0.5)Ts</span></span>
<span class="line"><span>(d−0.5)Ts</span></span>
<span class="line"><span>iL(τ)dτ (18.60)</span></span>
<span class="line"><span>The averaging window in Eq. (18.60) is shown in Fig.18.23 for the case d&lt; 0.5. Averaging can</span></span>
<span class="line"><span>be performed by splitting the averaging window into three subintervals: from ( d−0.5)Ts to 0,</span></span>
<span class="line"><span>from 0 to dTs, and from dTs to (d+ 0.5)Ts. Integration can be simpliﬁed by adding the areas</span></span>
<span class="line"><span>of the three trapezoids having mid-point heights equal to i3, i1, i2, respectively, and subtracting</span></span>
<span class="line"><span>the area of the trapezoid having the mid-point height of i4 and with the base extending from</span></span>
<span class="line"><span>(d+ 0.5)Ts to Ts,</span></span>
<span class="line"><span>iL(dTs)⟩Ts = (0.5−d)i3+ di1+ d′i2−(0.5−d)i4 (18.61)</span></span>
<span class="line"><span>iL(dTs)⟩Ts = di1+ d′i2−(0.5−d)(i4−i3) (18.62)</span></span>
<span class="line"><span>Equation (18.62) can be simpliﬁed by noting that the time interval between the midpointsi4 and</span></span>
<span class="line"><span>i3 is Ts, while the time interval between the midpointsi1 and i2 is Ts/2. Since the slope between</span></span>
<span class="line"><span>the midpoint values is the same, i4−i3= 2(i2−i1). As a result, Eq. (18.62) becomes</span></span>
<span class="line"><span>⟨iL⟩Ts = di1+ d′i2−2(0.5−d)(i2−i1)</span></span>
<span class="line"><span>= d′i1+ di2 (18.63)</span></span>
<span class="line"><span>The literature includes a number of di ﬀerent approaches to CPM modeling, most notably</span></span>
<span class="line"><span>[165, 169, 171, 172]; an important diﬀerence between these is in how they average the in-</span></span>
<span class="line"><span>ductor current [ 175]. The above relationship, originally derived in [ 107], diﬀers from various</span></span>
<span class="line"><span>alternative expressions reported in literature. If, for example, the averaging window is centered</span></span>
<span class="line"><span>at t= Ts/2, extending between 0 and Ts,ad iﬀerent relationship⟨iL⟩Ts = di1+ d′i2 is obtained</span></span>
<span class="line"><span>[169]. In equilibrium, i1= i2, and this alternative expression becomes equivalent to Eq. (18.63).</span></span>
<span class="line"><span>Similarly, predictions of low-frequency dynamics are essentially the same. However, small but</span></span>
<span class="line"><span></span></span>
<span class="line"><span>748 18 Current-Programmed Control</span></span>
<span class="line"><span>conceptually important diﬀerences are found in predictions of high-frequency dynamics. As dis-</span></span>
<span class="line"><span>cussed further in Sect. 18.7,E q .(18.63), which is based on correctly positioning the averaging</span></span>
<span class="line"><span>window, leads to a small-signal averaged ac model validated by exact sampled-data analysis.</span></span>
<span class="line"><span>The above result is consistent with the averaging deﬁnition of Eq. (7.3).</span></span>
<span class="line"><span>From Fig. 18.23, it follows that the midpoint currents in Eq. (18.63) can be found as</span></span>
<span class="line"><span>i1= ipk−m1</span></span>
<span class="line"><span>2 dTs (18.64)</span></span>
<span class="line"><span>i2= ipk−m2</span></span>
<span class="line"><span>2 d′Ts (18.65)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>ipk= ic−madTs (18.66)</span></span>
<span class="line"><span>Substitution of Eqs. (18.64), (18.65), and (18.66) into Eq. (18.63) yields the desired large-signal</span></span>
<span class="line"><span>relationship between⟨iL⟩Ts and ic:</span></span>
<span class="line"><span>⟨iL⟩Ts = ic−madTs−m1+ m2</span></span>
<span class="line"><span>2 dd′Ts (18.67)</span></span>
<span class="line"><span>This equation exposes how the inductor current ripple and the artiﬁcial ramp can cause the</span></span>
<span class="line"><span>average inductor current⟨iL⟩Ts to diﬀer from the control input ic.</span></span>
<span class="line"><span>18.3.2 Small-Signal Averaged Model</span></span>
<span class="line"><span>A small-signal current-programmed controller model is found by perturbation and linearization</span></span>
<span class="line"><span>of Eq. (18.67). Let</span></span>
<span class="line"><span>⟨iL⟩Ts = IL+ ˆiL(t)</span></span>
<span class="line"><span>⟨ic⟩Ts = ic== Ic+ ˆic(t)</span></span>
<span class="line"><span>d(t)= D+ ˆd(t) (18.68)</span></span>
<span class="line"><span>m1 = M1+ ˆm1(t)</span></span>
<span class="line"><span>m2 = M2+ ˆm2(t)</span></span>
<span class="line"><span>Note that it is necessary to perturb the slopesm1 and m2, since the inductor current slope depends</span></span>
<span class="line"><span>on the converter voltages according to Eq. ( 18.30). For the basic buck, boost, and buck–boost</span></span>
<span class="line"><span>converters, the slope variations are given by</span></span>
<span class="line"><span>Buck converter</span></span>
<span class="line"><span>ˆm1= ˆvg−ˆv</span></span>
<span class="line"><span>L ˆm2= ˆv</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Boost converter</span></span>
<span class="line"><span>ˆm1= ˆvg</span></span>
<span class="line"><span>L ˆm2= ˆv−ˆvg</span></span>
<span class="line"><span>L (18.69)</span></span>
<span class="line"><span>Buck–boost converter</span></span>
<span class="line"><span>ˆm1= ˆvg</span></span>
<span class="line"><span>L ˆm2=−ˆv</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.3 A More Accurate Model 749</span></span>
<span class="line"><span>It is assumed that ma does not vary: ma = Ma. The usual steps of ac perturbation and lin-</span></span>
<span class="line"><span>earization, including substitution of Eq. (18.68) into Eq. (18.67), cancellation of dc terms, and</span></span>
<span class="line"><span>retention of the ﬁrst-order ac terms, leads to:</span></span>
<span class="line"><span>ˆiL(t)= ˆic(t)−</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Ma+ M1+ M2</span></span>
<span class="line"><span>2 (1−2D)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Ts ˆd(t)−DD′Ts</span></span>
<span class="line"><span>2 (ˆm1(t)+ ˆm2(t)) (18.70)</span></span>
<span class="line"><span>With use of the equilibrium relationship DM1= D′ M2,E q .(18.70) can be further simpliﬁed:</span></span>
<span class="line"><span>ˆiL(t)= ˆic(t)−</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Ma+ M1−M2</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Ts ˆd(t)−DD′Ts</span></span>
<span class="line"><span>2 ˆm1(t)−DD′Ts</span></span>
<span class="line"><span>2 ˆm2(t) (18.71)</span></span>
<span class="line"><span>Finally, solution for ˆd(t) yields</span></span>
<span class="line"><span>ˆd(t)= 1⎦</span></span>
<span class="line"><span>Ma+ M1−M2</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>ˆic(t)−ˆiL(t)−DD′Ts</span></span>
<span class="line"><span>2 ˆm1(t)−DD′Ts</span></span>
<span class="line"><span>2 ˆm2(t)</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(18.72)</span></span>
<span class="line"><span>This is the small-signal relationship that the current-programmed controller follows, to deter-</span></span>
<span class="line"><span>mine ˆd(t)a saf u n c t i o no fˆic(t), ˆiL(t), ˆm1(t), and ˆm2(t). Since the quantities ˆm1(t) and ˆm2(t) de-</span></span>
<span class="line"><span>pend on ˆvg(t) and ˆv(t), according to Eq. ( 18.69), we can express Eq. ( 18.72) in the following</span></span>
<span class="line"><span>form:</span></span>
<span class="line"><span>ˆd(t)= Fm</span></span>
<span class="line"><span>[ˆic(t)−ˆiL(t)−Fg ˆvg(t)−Fv ˆv(t)</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(18.73)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Fm= 1⎦</span></span>
<span class="line"><span>Ma+ M1−M2</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>(18.74)</span></span>
<span class="line"><span>Expressions for the gains Fg and Fv, for the basic buck, boost, and buck–boost converters, are</span></span>
<span class="line"><span>listed in Table 18.2. A functional block diagram of the current-programmed controller small-</span></span>
<span class="line"><span>signal model, corresponding to Eq. (18.73), is constructed in Fig. 18.24.</span></span>
<span class="line"><span>Current-programmed converter models can now be obtained, by combining the controller</span></span>
<span class="line"><span>block diagram of Fig. 18.24 with the averaged converter models derived in Chap. 7.F i g -</span></span>
<span class="line"><span>ures 18.25, 18.26, and 18.27 illustrate the CPM converter models obtained by combination of</span></span>
<span class="line"><span>Fig. 18.24 with, respectively, the buck, boost, and buck–boost models of Fig. 7.18. The current</span></span>
<span class="line"><span>programmed controller contains eﬀective feedback of the inductor current ˆiL(t) and the output</span></span>
<span class="line"><span>voltage ˆv(t), as well as eﬀective feedforward of the input voltage ˆvg(t).</span></span>
<span class="line"><span>Table 18.2 Current-programmed controller gains for basic converters</span></span>
<span class="line"><span>Converter Fg Fv</span></span>
<span class="line"><span>Buck DD′Ts</span></span>
<span class="line"><span>2L 0</span></span>
<span class="line"><span>Boost 0 DD′Ts</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>Buck–boost DD′Ts</span></span>
<span class="line"><span>2L −DD′Ts</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span></span></span>
<span class="line"><span>750 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.24 Functional block diagram of the current-programmed controller</span></span>
<span class="line"><span>+ +</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>Fg</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>1 : D</span></span>
<span class="line"><span>vˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>g(t)</span></span>
<span class="line"><span>vg</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>iL</span></span>
<span class="line"><span>ic</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)Id (t)</span></span>
<span class="line"><span>Vg d(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>Fig. 18.25 More accurate model of a current-programmed buck converter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.3 A More Accurate Model 751</span></span>
<span class="line"><span>Fig. 18.26 More accurate model of a current-programmed boost converter</span></span>
<span class="line"><span>Fig. 18.27 More accurate model of a current-programmed buck–boost converter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>752 18 Current-Programmed Control</span></span>
<span class="line"><span>18.4 Current-Programmed Transfer Functions</span></span>
<span class="line"><span>Next, let us solve the models of Sect. 18.3, to determine more accurate expressions for the</span></span>
<span class="line"><span>control-to-output and line-to-output transfer functions of current-programmed buck, boost, and</span></span>
<span class="line"><span>buck–boost converters. As discussed in Chap.8, the converter output voltage ˆv can be expressed</span></span>
<span class="line"><span>as a function of the duty-cycle ˆd and input voltage ˆvg variations, using the transfer functions</span></span>
<span class="line"><span>Gvd(s) and Gvg(s):</span></span>
<span class="line"><span>ˆv(s)= Gvd(s) ˆd(s)+ Gvg(s)ˆvg(s) (18.75)</span></span>
<span class="line"><span>In a similar manner, the inductor current variation ˆi can be expressed as a function of the duty-</span></span>
<span class="line"><span>cycle ˆd and input voltage ˆvg variations, by deﬁning the transfer functions Gid(s) and Gig(s):</span></span>
<span class="line"><span>ˆiL(s)= Gid(s) ˆd(s)+ Gig(s)ˆvg(s) (18.76)</span></span>
<span class="line"><span>where the transfer functions Gid(s) and Gig(s)a r eg i v e nb y</span></span>
<span class="line"><span>Gid(s)=</span></span>
<span class="line"><span>ˆiL(s)</span></span>
<span class="line"><span>ˆd(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg(s)=0</span></span>
<span class="line"><span>Gig(s)=</span></span>
<span class="line"><span>ˆiL(s)</span></span>
<span class="line"><span>ˆvg(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆd(s)=0</span></span>
<span class="line"><span>(18.77)</span></span>
<span class="line"><span>Figure 18.28 illustrates replacement of the converter circuit models of Figs. 18.25, 18.26,</span></span>
<span class="line"><span>and 18.27 with block diagrams that correspond to Eqs. ( 18.75) and ( 18.76). Furthermore, an</span></span>
<span class="line"><span>injection source ˆvz is inserted between the output of the CPM controller and the duty-cycle</span></span>
<span class="line"><span>input to allow ﬁnding the system transfer functions using the Feedback Theorem of Chap. 13.</span></span>
<span class="line"><span>The control-to-output Gvc(s) and line-to-output Gvg−cpm (s) transfer functions can now be</span></span>
<span class="line"><span>found, by application of the Feedback Theorem to the block diagram of Fig. 18.28. The closed-</span></span>
<span class="line"><span>loop control-to-output transfer function is given by</span></span>
<span class="line"><span>Gvc(s)= ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆvz=0</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>= G∞vc</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>+ G0vc</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>(18.78)</span></span>
<span class="line"><span>Fig. 18.28 Block diagram that models the current-programmed converters of Figs. 18.25, 18.26,</span></span>
<span class="line"><span>and 18.27</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.4 Current-Programmed Transfer Functions 753</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Ti(s)= ˆvy</span></span>
<span class="line"><span>ˆvx</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆic=0</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>= Fm (Gid+ FvGvd) (18.79)</span></span>
<span class="line"><span>is the loop gain transfer function. Note that the feedback loop comprises two paths, one through</span></span>
<span class="line"><span>Gid and another through Gvd and Fv blocks, both paths including the CPM modulator gain Fm.</span></span>
<span class="line"><span>The feedback loop through Gid can conceptually be considered the main feedback loop in a</span></span>
<span class="line"><span>current-programmed controller, while the feedback loop through Gvd and Fv reﬂects the eﬀects</span></span>
<span class="line"><span>of the output voltage on the current ripple, and hence on the average inductor current. In a CPM</span></span>
<span class="line"><span>buck converter, Fv= 0, which means that only the main feedback loop exists.</span></span>
<span class="line"><span>The closed-loop control-to-output ideal forward gain G∞vc is found with ˆvg= 0 and with ˆvy</span></span>
<span class="line"><span>nulled:</span></span>
<span class="line"><span>G∞vc(s)= ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>ˆvy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(18.80)</span></span>
<span class="line"><span>Nulling ˆvy implies</span></span>
<span class="line"><span>ˆic−ˆiL−Fv ˆv→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0 (18.81)</span></span>
<span class="line"><span>Given that Gvd ˆvx= ˆv and Gid ˆvx= ˆiL,w eh a v e</span></span>
<span class="line"><span>ˆiL= Gid</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>ˆv (18.82)</span></span>
<span class="line"><span>Substituting Eq. (18.82) into Eq. (18.81), we have</span></span>
<span class="line"><span>ˆic−Gid</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>ˆv−Fv ˆv→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0 (18.83)</span></span>
<span class="line"><span>which yields an expression for the ideal forward gain</span></span>
<span class="line"><span>G∞vc(s)= ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>ˆvy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= Gvd</span></span>
<span class="line"><span>Gid+ FvGvd</span></span>
<span class="line"><span>= FmGvd</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>(18.84)</span></span>
<span class="line"><span>Finally, the direct forward transmission through the feedback path is found with ˆvg= 0 and with</span></span>
<span class="line"><span>ˆvx nulled. By inspection,</span></span>
<span class="line"><span>G0vc= 0 (18.85)</span></span>
<span class="line"><span>Substituting Eqs. (18.79), (18.84), and (18.85) into Eq. (18.78) leads to the desired result:</span></span>
<span class="line"><span>Gvc(s)= FmGvd</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>= FmGvd</span></span>
<span class="line"><span>1+ Fm(Gid+ FvGvd) (18.86)</span></span>
<span class="line"><span>Similarly, line-to-output transfer function can be found by application of the Feedback Theorem</span></span>
<span class="line"><span>to the block diagram in Fig. 18.28 with ˆic= 0,</span></span>
<span class="line"><span>Gvg−cpm (s)= ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvz=0</span></span>
<span class="line"><span>ˆic=0</span></span>
<span class="line"><span>= G∞vg−cpm</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>+ G0vg−cpm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>(18.87)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>754 18 Current-Programmed Control</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>G∞vg−cpm (s)= ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆic=0</span></span>
<span class="line"><span>ˆvy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>=−FmFgGvd+ Fm(GvgGid−GigGvd)</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>(18.88)</span></span>
<span class="line"><span>G0vg−cpm (s)= ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆic=0</span></span>
<span class="line"><span>ˆvx→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= Gvg (18.89)</span></span>
<span class="line"><span>The current-programmed line-to-output transfer function is obtained by substitution of</span></span>
<span class="line"><span>Eqs. (18.79), (18.88) and (18.89) into Eq. (18.87):</span></span>
<span class="line"><span>Gvg−cpm (s)= ˆv(s)</span></span>
<span class="line"><span>ˆvg(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆic(s)=0</span></span>
<span class="line"><span>= Gvg−FmFgGvd+ Fm(GvgGid−GigGvd)</span></span>
<span class="line"><span>1+ Fm(Gid+ FvGvd) (18.90)</span></span>
<span class="line"><span>Equations (18.86) and ( 18.90) are general expressions for the important transfer functions of</span></span>
<span class="line"><span>single-inductor current-programmed converters operating in the continuous conduction mode.</span></span>
<span class="line"><span>18.4.1 Discussion</span></span>
<span class="line"><span>The controller model of Eq. (18.73) and Fig. 18.24 accounts for the diﬀerences between iL and</span></span>
<span class="line"><span>ic that arise by two mechanisms: the inductor current ripple and the artiﬁcial ramp. The inductor</span></span>
<span class="line"><span>current ripple causes the peak and average values of the inductor current to diﬀer; this leads to a</span></span>
<span class="line"><span>deviation between the average inductor current and ic. Since the magnitude of the inductor cur-</span></span>
<span class="line"><span>rent ripple is a function of the converter input and capacitor voltages, this mechanism introduces</span></span>
<span class="line"><span>ˆvg and ˆv dependencies into the controller small-signal block diagram. Thus, the Fg and Fv gain</span></span>
<span class="line"><span>blocks of Fig. 18.24 model the small-signal eﬀects of the inductor current ripple. For operation</span></span>
<span class="line"><span>deep in continuous conduction mode (2 L/RTs ≫ 1), the inductor current ripple is small. The</span></span>
<span class="line"><span>Fg and Fv gain blocks can then be ignored, and the inductor current ripple has negligible eﬀect</span></span>
<span class="line"><span>on the current-programmed controller gain.</span></span>
<span class="line"><span>The artiﬁcial ramp also causes the average inductor current to diﬀer from ic. This is modeled</span></span>
<span class="line"><span>by the gain block Fm. With no artiﬁcial ramp, Ma = 0, Eq. (18.74) implies that the modulator</span></span>
<span class="line"><span>gain Fm tends to inﬁnity if M1 = M2, which corresponds to operation at D= 0.5. If M2 &gt; M1</span></span>
<span class="line"><span>(D&gt; 0.5), Fm becomes negative, which implies positive feedback in the current control loop.</span></span>
<span class="line"><span>The nature of instability and oscillations for D&gt; 0.5, as well as the need for the artiﬁcial ramp,</span></span>
<span class="line"><span>have been addressed in Sect. 18.2 using discrete-time techniques. According to Eqs. ( 18.56)</span></span>
<span class="line"><span>and (18.57) an artiﬁcial ramp withMa≥M2/2 results in a stable current-programmed controller</span></span>
<span class="line"><span>for any D,0 ≤D&lt; 1. One may verify that this artiﬁcial ramp slope Ma ≥M2/2 also results in</span></span>
<span class="line"><span>a ﬁnite, positive value for the modulator gain Fm for any D.</span></span>
<span class="line"><span>Consider operation at D&lt; 0.5 with no artiﬁcial ramp, Ma = 0. The current-programmed</span></span>
<span class="line"><span>modulator gain Fm is very large if M1 and M2 are very small, i.e., if the inductor current ripple</span></span>
<span class="line"><span>can be neglected. The current-programmed control systems of Figs. 18.25, 18.26, and 18.27</span></span>
<span class="line"><span>then eﬀectively have very large loop gain Ti, so that the signal at the input to the Fm block</span></span>
<span class="line"><span>( ˆd/Fm) tends to zero. The block diagram then predicts that</span></span>
<span class="line"><span>ˆd</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>= 0= ˆic−ˆiL−Fg ˆvg−Fv ˆv (18.91)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.4 Current-Programmed Transfer Functions 755</span></span>
<span class="line"><span>In the case of negligible inductor current ripple ( Fg →0 and Fv →0), this equation further</span></span>
<span class="line"><span>reduces to</span></span>
<span class="line"><span>0= ˆic−ˆiL (18.92)</span></span>
<span class="line"><span>which coincides with the simple approximation employed in Sect. 18.1. Hence, the transfer</span></span>
<span class="line"><span>functions predicted in this section reduce to the results of Sect.18.1 in case of no artiﬁcial ramp</span></span>
<span class="line"><span>and negligible inductor current ripple. In the limit when Fm →∞, Fg →0, and Fv →0, the</span></span>
<span class="line"><span>control-to-output transfer function (18.86) reduces to</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>Fm→∞</span></span>
<span class="line"><span>Fg→0</span></span>
<span class="line"><span>Fv→0</span></span>
<span class="line"><span>Gvc(s)= Gvd</span></span>
<span class="line"><span>Gid</span></span>
<span class="line"><span>(18.93)</span></span>
<span class="line"><span>and the line-to-output transfer function (18.90) reduces to</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>Fm→∞</span></span>
<span class="line"><span>Fg→0</span></span>
<span class="line"><span>Fv→0</span></span>
<span class="line"><span>Gvg−cpm (s)= GvgGid−GigGvd</span></span>
<span class="line"><span>Gid</span></span>
<span class="line"><span>(18.94)</span></span>
<span class="line"><span>It can be veriﬁed that Eqs. ( 18.93) and (18.94) are equivalent to the transfer functions derived</span></span>
<span class="line"><span>in Sect. 18.1.</span></span>
<span class="line"><span>When an artiﬁcial ramp is present, then the CPM modulator gainFm is reduced. The current-</span></span>
<span class="line"><span>programmed controller no longer perfectly regulates the inductor current iL, and the terms on</span></span>
<span class="line"><span>the right-hand side of Eq. (18.91) do not add to zero. In the extreme case of a very large artiﬁcial</span></span>
<span class="line"><span>ramp (large Ma and hence small Fm), the current-programmed controller degenerates to duty-</span></span>
<span class="line"><span>cycle control. The artiﬁcial ramp and analog comparator of Fig. 18.19 then function as a pulse-</span></span>
<span class="line"><span>width modulator similar to Fig. 7.29, with small-signal gain Fm. For small Fm, the control-to-</span></span>
<span class="line"><span>output transfer function (18.86) reduces to</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>small Fm</span></span>
<span class="line"><span>Gvc(s)= FmGvd(s) (18.95)</span></span>
<span class="line"><span>which coincides with conventional duty-cycle control. Likewise, Eq. (18.90) reduces to</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>small Fm</span></span>
<span class="line"><span>Gvg−cpm (s)= Gvg (18.96)</span></span>
<span class="line"><span>which is the line-to-output transfer function for conventional duty cycle control.</span></span>
<span class="line"><span>18.4.2 Current-Programmed Transfer Functions of the CCM Buck Converter</span></span>
<span class="line"><span>The control-to-output transfer function Gvd(s) and line-to-output transfer function Gvg(s)o f</span></span>
<span class="line"><span>the CCM buck converter with duty-cycle control are tabulated in Chap. 8, by analysis of the</span></span>
<span class="line"><span>equivalent circuit model in Fig.7.18a. The results are</span></span>
<span class="line"><span>Gvd(s)= V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>den(s) (18.97)</span></span>
<span class="line"><span>Gvg(s)= D 1</span></span>
<span class="line"><span>den(s) (18.98)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>756 18 Current-Programmed Control</span></span>
<span class="line"><span>where the denominator polynomial is</span></span>
<span class="line"><span>den(s)= 1+ s L</span></span>
<span class="line"><span>R+ s2LC (18.99)</span></span>
<span class="line"><span>The inductor current transfer functionsGid(s) and Gig(s) deﬁned by Eqs. (18.76) and (18.77)a r e</span></span>
<span class="line"><span>also found by solution of the equivalent circuit model in Fig.7.18a, with the following results:</span></span>
<span class="line"><span>Gid(s)= V</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>(1+ sRC)</span></span>
<span class="line"><span>den(s) (18.100)</span></span>
<span class="line"><span>Gig(s)= D</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>(1+ sRC)</span></span>
<span class="line"><span>den(s) (18.101)</span></span>
<span class="line"><span>where den(s) is again given by Eq. (18.99).</span></span>
<span class="line"><span>With no artiﬁcial ramp and negligible ripple, the control-to-output transfer function reduces</span></span>
<span class="line"><span>to the ideal expression (18.93). Substitution of Eqs. (18.97) and (18.100) yields</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>Fm→∞</span></span>
<span class="line"><span>Fg→0</span></span>
<span class="line"><span>Fv→0</span></span>
<span class="line"><span>Gvc(s)= Gvd(s)</span></span>
<span class="line"><span>Gid(s)= R</span></span>
<span class="line"><span>1+ sRC (18.102)</span></span>
<span class="line"><span>Under the same conditions, the line-to-output transfer function reduces to the ideal expres-</span></span>
<span class="line"><span>sion (18.94). Substitution of Eqs. (18.97)t o( 18.101) leads to</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>Fm→∞</span></span>
<span class="line"><span>Fg→0</span></span>
<span class="line"><span>Fv→0</span></span>
<span class="line"><span>Gvg−cpm (s)= Gvg(s)Gid(s)−Gvd(s)Gig(s)</span></span>
<span class="line"><span>Gid(s) = 0 (18.103)</span></span>
<span class="line"><span>Equations (18.102) and ( 18.103) coincide with the expressions derived in Sect. 18.1 for the</span></span>
<span class="line"><span>CCM buck converter.</span></span>
<span class="line"><span>For arbitrary Fm, Fv, and Fg, the control-to-output transfer function is given by Eq. (18.86).</span></span>
<span class="line"><span>According to Table18.2, Fv= 0 for the buck converter. Substitution of Eqs. (18.97)t o( 18.101)</span></span>
<span class="line"><span>into Eq. (18.86) yields</span></span>
<span class="line"><span>Gvc(s)= FmGvd</span></span>
<span class="line"><span>1+ FmGid</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>⎦V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>1+ Fm</span></span>
<span class="line"><span>⎦V</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>1+ sRC</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>) (18.104)</span></span>
<span class="line"><span>Simpliﬁcation leads to</span></span>
<span class="line"><span>Gvc(s)=</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>den(s)+ FmV</span></span>
<span class="line"><span>DR (1+ sRC)</span></span>
<span class="line"><span>(18.105)</span></span>
<span class="line"><span>Finally, the control-to-output transfer function can be written in the following normalized form:</span></span>
<span class="line"><span>Gvc(s)= Gc0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 (18.106)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.4 Current-Programmed Transfer Functions 757</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Gc0= V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>(18.107)</span></span>
<span class="line"><span>ωc= 1√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR (18.108)</span></span>
<span class="line"><span>Qc= R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>1+ RCFmV</span></span>
<span class="line"><span>DL</span></span>
<span class="line"><span>(18.109)</span></span>
<span class="line"><span>In the above equations, the salient features Gc0, ωc, and Qc are expressed as the duty ratio-</span></span>
<span class="line"><span>control value, multiplied by a factor that accounts for the eﬀects of current-programmed control.</span></span>
<span class="line"><span>It can be seen from Eq. (18.109) that current programming tends to reduce theQ-factor of the</span></span>
<span class="line"><span>poles. For large Fm, Qc varies as F−1/2</span></span>
<span class="line"><span>m ; consequently, the poles become real and well-separated</span></span>
<span class="line"><span>in magnitude. The low-Q approximation of Sect. 8.1.7 then predicts that the low-frequency pole</span></span>
<span class="line"><span>ωp1 becomes</span></span>
<span class="line"><span>ωp1= Qcωc= R</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>1+ RCFmV</span></span>
<span class="line"><span>DL</span></span>
<span class="line"><span>(18.110)</span></span>
<span class="line"><span>For large Fm, the pole frequency can be further approximated as</span></span>
<span class="line"><span>fp1≈1</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>RC (18.111)</span></span>
<span class="line"><span>which coincides with the low-frequency pole predicted by the simple model of Sect. 18.1.T h e</span></span>
<span class="line"><span>low-Q approximation also predicts that the high-frequency poleωhf becomes</span></span>
<span class="line"><span>ωhf ≈ωc</span></span>
<span class="line"><span>Qc</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ RCFmV</span></span>
<span class="line"><span>DL</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(18.112)</span></span>
<span class="line"><span>For large Fm, the pole frequency fhf can be further approximated as</span></span>
<span class="line"><span>fhf ≈1</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>FmV</span></span>
<span class="line"><span>DL (18.113)</span></span>
<span class="line"><span>Using Fm from Eq. (18.74), V/L= M2, and M1D= M2D′, fhf can be expressed as</span></span>
<span class="line"><span>fhf = fs</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>M1+ M2</span></span>
<span class="line"><span>2Ma+ M1−M2</span></span>
<span class="line"><span>= fs</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ 2D</span></span>
<span class="line"><span>⎦Ma</span></span>
<span class="line"><span>M2</span></span>
<span class="line"><span>−1</span></span>
<span class="line"><span>) (18.114)</span></span>
<span class="line"><span>It follows that the high-frequency pole is typically predicted to lie near to or even greater than</span></span>
<span class="line"><span>the switching frequency fs, well above the range of frequencies where the averaged model based</span></span>
<span class="line"><span>on the continuous-time averaged analysis employed here can be considered valid. It should be</span></span>
<span class="line"><span>pointed out that the converter switching and modulator sampling processes lead to discrete-</span></span>
<span class="line"><span>time phenomena that aﬀect the high-frequency behavior of the converter, as discussed further</span></span>
<span class="line"><span>in Sect. 18.7.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>758 18 Current-Programmed Control</span></span>
<span class="line"><span>For arbitrary Fm, Fv, and Fg, the current-programmed line-to-output transfer function</span></span>
<span class="line"><span>Gvg−cpm (s) is given by Eq. ( 18.90). In the case of the buck converter, the quantity ( GvgGid −</span></span>
<span class="line"><span>GvdGig) is equal to zero. Furthermore, Fv= 0. Hence, Eq. (18.90) becomes</span></span>
<span class="line"><span>Gvg−cpm (s)= Gvg−FmFgGvd</span></span>
<span class="line"><span>1+ FmGid</span></span>
<span class="line"><span>(18.115)</span></span>
<span class="line"><span>Substitution of Eqs. (18.97)t o( 18.101) into Eq. (18.115) yields</span></span>
<span class="line"><span>Gvg−cpm (s)=</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>den(s)−FmFg</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>1+ Fm</span></span>
<span class="line"><span>⎦V</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>1+ sRC</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>) (18.116)</span></span>
<span class="line"><span>Simpliﬁcation leads to</span></span>
<span class="line"><span>Gvg−cpm (s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>D−FmFg</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>den(s)+ FmV</span></span>
<span class="line"><span>DR (1+ sRC)</span></span>
<span class="line"><span>(18.117)</span></span>
<span class="line"><span>Finally, the current-programmed line-to-output transfer function can be written in the following</span></span>
<span class="line"><span>normalized form:</span></span>
<span class="line"><span>Gvg−cpm (s)= Gg0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 (18.118)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Gg0= D</span></span>
<span class="line"><span>1−FmFgV</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>= D</span></span>
<span class="line"><span>2Ma−M2</span></span>
<span class="line"><span>2Ma+ M1−M2</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>(18.119)</span></span>
<span class="line"><span>The quantities Qc andωc are given by Eqs. (18.108) and (18.109).</span></span>
<span class="line"><span>Equation (18.119) shows how current programming reduces the dc gain of the buck con-</span></span>
<span class="line"><span>verter line-to-output transfer function. For duty-cycle control ( Fm →0), Gg0 is equal to D.</span></span>
<span class="line"><span>Nonzero values of Fm reduce the numerator and increase the denominator of Eq. ( 18.119),</span></span>
<span class="line"><span>which tends to reduce Gg0. In the ideal case ( Fm →∞), we have already seen that Gg0 be-</span></span>
<span class="line"><span>comes zero. Equation (18.119) reveals that nonideal current-programmed buck converters can</span></span>
<span class="line"><span>also exhibit zero Gg0, if the artiﬁcial ramp slope Ma is chosen equal to M2/2. The current-</span></span>
<span class="line"><span>programmed controller then prevents input line voltage variations from reaching the output. The</span></span>
<span class="line"><span>mechanism that leads to this result is the e ﬀective feedforward of v</span></span>
<span class="line"><span>g, inherent in the current-</span></span>
<span class="line"><span>programmed controller via the Fg ˆvg term in Eq. ( 18.73). It can be seen from Fig. 18.28 that,</span></span>
<span class="line"><span>when FgFmGvd(s)= Gvg(s), then the feedforward path from ˆvg through Fg induces variations</span></span>
<span class="line"><span>in the output ˆv that exactly cancel the ˆvg-induced variations in the direct forward path of the</span></span>
<span class="line"><span>converter through Gvg(s). This cancellation occurs in the buck converter when Ma= 0.5M2.</span></span>
<span class="line"><span>18.4.3 Results for Basic Converters</span></span>
<span class="line"><span>The transfer functions of the basic buck, boost, and buck–boost converters with current-</span></span>
<span class="line"><span>programmed control are summarized in Tables 18.3, 18.4, 18.5. Control-to-output and line-to-</span></span>
<span class="line"><span>output transfer functions for both the simple model of Sect. 18.1 and the more accurate model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.4 Current-Programmed Transfer Functions 759</span></span>
<span class="line"><span>Table 18.3 Summary of results for the CPM buck converter</span></span>
<span class="line"><span>Simple model Duty-cycle controlled transfer functions</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>= R</span></span>
<span class="line"><span>1+ sRC Gvd(s)= V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>den(s) Gid(s)= V</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>1+ sRC</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>= 0 Gvg(s)= D 1</span></span>
<span class="line"><span>den(s) Gig(s)= D</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>1+ sRC</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>den(s)= 1+ s L</span></span>
<span class="line"><span>R+ s2LC</span></span>
<span class="line"><span>More accurate model</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>= Gvc(s)= Gc0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 Gc0= V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ωc = 1√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR Qc = R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR⎦</span></span>
<span class="line"><span>1+ RCFmV</span></span>
<span class="line"><span>DL</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>= Gvg−cpm (s)= Gg0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 Gg0 = D</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−FmFgV</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>DR</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Table 18.4 Summary of results for the CPM boost converter</span></span>
<span class="line"><span>Simple model Duty-cycle controlled transfer functions</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>= D′R</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−s L</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s RC</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>) Gvd(s)= V</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−s L</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>den(s) Gid(s)= 2V</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s RC</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>2D′</span></span>
<span class="line"><span>1⎦</span></span>
<span class="line"><span>1+ s RC</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>) Gvg(s)= 1</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>den(s) Gig(s)= 1</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>(1+ sRC)</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>den(s)= 1+ s L</span></span>
<span class="line"><span>D′2R+ s2 LC</span></span>
<span class="line"><span>D′2</span></span>
<span class="line"><span>More accurate model</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>= Gvc(s)= Gc0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−s L</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 Gc0= V</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>Fm⎦</span></span>
<span class="line"><span>1+ 2FmV</span></span>
<span class="line"><span>D′2R + FmFvV</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ωc = D′</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 2FmV</span></span>
<span class="line"><span>D′2R + FmFvV</span></span>
<span class="line"><span>D′ Qc = D′R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 2FmV</span></span>
<span class="line"><span>D′2R + FmFvV</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ RC FmV</span></span>
<span class="line"><span>L −FmFvV</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>= Gvg−cpm (s)= Gg0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 Gg0 = 1</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ FmV</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ 2FmV</span></span>
<span class="line"><span>D′2R + FmFvV</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>760 18 Current-Programmed Control</span></span>
<span class="line"><span>Table 18.5 Summary of results for the CPM buck–boost converter</span></span>
<span class="line"><span>Simple model Duty-cycle controlled transfer functions</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>=−D′R</span></span>
<span class="line"><span>(1+ D)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−s DL</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s RC</span></span>
<span class="line"><span>1+ D</span></span>
<span class="line"><span>) Gvd(s)=−|V|</span></span>
<span class="line"><span>DD′</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−s DL</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>den(s) Gid(s)=|V|(1+ D)</span></span>
<span class="line"><span>DD′2R</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s RC</span></span>
<span class="line"><span>(1+ D)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>=−D2</span></span>
<span class="line"><span>1−D2</span></span>
<span class="line"><span>1⎦</span></span>
<span class="line"><span>1+ s RC</span></span>
<span class="line"><span>1+ D</span></span>
<span class="line"><span>) Gvg(s)=−D</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>den(s) Gig(s)= D</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>(1+ sRC)</span></span>
<span class="line"><span>den(s)</span></span>
<span class="line"><span>den(s)= 1+ s L</span></span>
<span class="line"><span>D′2R+ s2 LC</span></span>
<span class="line"><span>D′2</span></span>
<span class="line"><span>More accurate model</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>= Gvc(s)= Gc0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−s DL</span></span>
<span class="line"><span>D′2R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 Gc0=−|V|</span></span>
<span class="line"><span>DD′</span></span>
<span class="line"><span>Fm⎦</span></span>
<span class="line"><span>1+ Fm|V|(1+ D)</span></span>
<span class="line"><span>DD′2R −FmFv|V|</span></span>
<span class="line"><span>DD′</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ωc = D′</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ Fm|V|(1+ D)</span></span>
<span class="line"><span>DD′2R −FmFv|V|</span></span>
<span class="line"><span>DD′ Qc = D′R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ Fm|V|(1+ D)</span></span>
<span class="line"><span>DD′2R −FmFv|V|</span></span>
<span class="line"><span>DD′</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Fm|V|RC</span></span>
<span class="line"><span>DL + FmFv|V|</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>= Gvg−cpm (s)= Gg0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωgz</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qcωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 Gg0 =−D</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Fm|V|</span></span>
<span class="line"><span>D′2R −FmFg|V|</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Fm|V|(1+ D)</span></span>
<span class="line"><span>DD′2R −FmFv|V|</span></span>
<span class="line"><span>DD′</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ωgz = DD′2R</span></span>
<span class="line"><span>|V|LFmFg</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Fm|V|</span></span>
<span class="line"><span>D′2R −FmFg|V|</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>derived in this section are listed. For completeness, the transfer functions for duty-cycle control</span></span>
<span class="line"><span>are included. In each case, the salient features are expressed as the corresponding quantity with</span></span>
<span class="line"><span>duty-cycle control, multiplied by a factor that accounts for current-programmed control.</span></span>
<span class="line"><span>The two poles of the line-to-output transfer functionsGvg−cpm and control-to-output transfer</span></span>
<span class="line"><span>functions Gvc of all three converters typically exhibit lowQ-factors in CPM. The low-Q approx-</span></span>
<span class="line"><span>imation can be applied, as in Eqs. ( 18.110)t o( 18.113), to ﬁnd the low-frequency pole. The</span></span>
<span class="line"><span>line-to-output transfer functions of the boost and buck–boost converters exhibit two poles and</span></span>
<span class="line"><span>one zero, with substantial dc gain.</span></span>
<span class="line"><span>18.4.4 Addition of an Input Filter to a Current-Programmed Converter</span></span>
<span class="line"><span>Addition of an input ﬁlter to a duty-cycle controlled converter is discussed in Chap. 17, where</span></span>
<span class="line"><span>it is found that eﬀects of input ﬁlter on converter transfer functions can be evaluated using the</span></span>
<span class="line"><span>Extra Element Theorem of Chap. 16. In particular, Eq. (17.4) shows how the control-to-output</span></span>
<span class="line"><span>transfer function G</span></span>
<span class="line"><span>vd is modiﬁed by a correction factor, which depends on the impedance ratios</span></span>
<span class="line"><span>Zo/ZN and Zo/ZD, where Zo(s) is the ﬁlter output impedance, ZD(s) is the converter driving-</span></span>
<span class="line"><span>point input impedance, and ZN (s) is the converter input impedance determined under the con-</span></span>
<span class="line"><span>dition that the output voltage is nulled. The input ﬁlter design approach of Chap. 17 is based</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.4 Current-Programmed Transfer Functions 761</span></span>
<span class="line"><span>on meeting the impedance inequalities of Sect. 17.2.3 so that the input ﬁlter does not substan-</span></span>
<span class="line"><span>tially alter the control-to-output transfer function. The same approach can be applied to current-</span></span>
<span class="line"><span>programmed converters.</span></span>
<span class="line"><span>In the presence of an input ﬁlter, the CPM control-to-output transfer function is given by</span></span>
<span class="line"><span>Gvc(s)= ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝Gvc(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>Zo(s)=0</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Zo(s)</span></span>
<span class="line"><span>ZN−cpm (s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Zo(s)</span></span>
<span class="line"><span>ZD−cpm (s)</span></span>
<span class="line"><span>) (18.120)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Gvc(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>Zo(s)=0</span></span>
<span class="line"><span>(18.121)</span></span>
<span class="line"><span>is the CPM control-to-output transfer function without the input ﬁlter, whileZN−cpm and ZD−cpm</span></span>
<span class="line"><span>are input impedances of the current-programmed converter found under two diﬀerent conditions</span></span>
<span class="line"><span>prescribed by the Extra Element Theorem. The CPM input impedances Zi−cpm can be found</span></span>
<span class="line"><span>using the converter models shown in Figs.18.25, 18.26, and 18.27. As an example, small-signal</span></span>
<span class="line"><span>model of a current-programmed buck converter of Fig.18.25 is shown in Fig.18.29. The model</span></span>
<span class="line"><span>includes three independent sources: control inputˆic, input voltage ˆvg, and an additional injection</span></span>
<span class="line"><span>source ˆiz, which will facilitate determining ZD−cpm (s) using the Feedback Theorem of Chap. 13.</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>ˆig ˆiL</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆix</span></span>
<span class="line"><span>−ˆiy</span></span>
<span class="line"><span>ˆiz</span></span>
<span class="line"><span>Fg</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>Vg ˆd</span></span>
<span class="line"><span>I ˆd Zei</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>++</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>++</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>1: D</span></span>
<span class="line"><span>ˆd</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>ZN−cpm</span></span>
<span class="line"><span>ZD−cpm</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>ˆig ˆiL</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆix</span></span>
<span class="line"><span>−ˆiyi</span></span>
<span class="line"><span>ˆiz</span></span>
<span class="line"><span>FgF</span></span>
<span class="line"><span>FmF</span></span>
<span class="line"><span>VgVV ˆd</span></span>
<span class="line"><span>I ˆd ZeiZZ</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+++</span></span>
<span class="line"><span>+++</span></span>
<span class="line"><span>++</span></span>
<span class="line"><span>++</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>1 : D</span></span>
<span class="line"><span>ˆd</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>ZNZ −cpm</span></span>
<span class="line"><span>ZDZ −cpm</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>ˆig ˆiL</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>ˆix</span></span>
<span class="line"><span>−ˆiy</span></span>
<span class="line"><span>ˆiz</span></span>
<span class="line"><span>Fg</span></span>
<span class="line"><span>Fm</span></span>
<span class="line"><span>Vg ˆd</span></span>
<span class="line"><span>I ˆd Zei</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>++</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>++</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>1: D</span></span>
<span class="line"><span>ˆd</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>ZN−cpm</span></span>
<span class="line"><span>ZD−cpm</span></span>
<span class="line"><span>Fig. 18.29 Small-signal averaged model suitable for ﬁnding input impedances in the current-</span></span>
<span class="line"><span>programmed buck converter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>762 18 Current-Programmed Control</span></span>
<span class="line"><span>To determine ZN−cpm , the additional injection source is set to zero,ˆiz= 0. In the presence of</span></span>
<span class="line"><span>ˆic and ˆvg, the output ˆv is nulled. Under these conditions, we ﬁnd</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ZN−cpm (s)=</span></span>
<span class="line"><span>ˆig</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆv→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(18.122)</span></span>
<span class="line"><span>Nulling the output implies nulling the inductor current, which means thatDˆvg+ Vg ˆd must equal</span></span>
<span class="line"><span>zero. As a result, we have</span></span>
<span class="line"><span>ˆd=−D</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>ˆvg (18.123)</span></span>
<span class="line"><span>Under the nulling condition, the input current is</span></span>
<span class="line"><span>ˆig</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆv→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= I ˆd (18.124)</span></span>
<span class="line"><span>Substitution of Eq. (18.123) into Eq. (18.124) yields</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ZN−cpm (s)=</span></span>
<span class="line"><span>ˆig</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆv→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>=−D2</span></span>
<span class="line"><span>R = 1</span></span>
<span class="line"><span>ZN (s) (18.125)</span></span>
<span class="line"><span>or ZN−cpm =−R/D2. The result for ZN−cpm is exactly the same as the result given by Eq. (17.28)</span></span>
<span class="line"><span>for ZN in duty-cycle controlled buck converters. This is not surprising since the nulling condition</span></span>
<span class="line"><span>ˆv→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0 results in exactly the same converter circuit conditions regardless of the nature of the</span></span>
<span class="line"><span>control input.</span></span>
<span class="line"><span>To determine ZD−cpm , ˆiz = 0 and the independent control input is set to zero, ˆic = 0. The</span></span>
<span class="line"><span>converter input admittance, i.e., the inverse of ZD−cpm , is deﬁned as follows:</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ZD−cpm (s)=</span></span>
<span class="line"><span>ˆig</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆic=0</span></span>
<span class="line"><span>(18.126)</span></span>
<span class="line"><span>From the model shown in Fig. 18.29, this transfer function can be found in any number of</span></span>
<span class="line"><span>ways. In contrast to duty-cycle converters, whereZD is the converter open-loop input impedance,</span></span>
<span class="line"><span>ZD−cpm is the input impedance of a current-programmed converter, which includes feedback and</span></span>
<span class="line"><span>feedforward paths. It is therefore convenient to approach ﬁnding ZD−cpm using the Feedback</span></span>
<span class="line"><span>Theorem: 1</span></span>
<span class="line"><span>ZD−cpm (s)= 1</span></span>
<span class="line"><span>Z∞D−cpm (s)</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>Z0D−cpm (s)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>(18.127)</span></span>
<span class="line"><span>where Ti(s) is the current-programmed loop gain</span></span>
<span class="line"><span>Ti(s)=</span></span>
<span class="line"><span>ˆiy</span></span>
<span class="line"><span>ˆix</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>= FmGid(s) (18.128)</span></span>
<span class="line"><span>Note that the injection source ˆiz has been added to the model of Fig. 18.29 speciﬁcally for the</span></span>
<span class="line"><span>purpose of ﬁnding ZD−cpm using the Feedback Theorem. The ideal input admittance can be</span></span>
<span class="line"><span>found by nulling ˆiy in the presence of ˆiz and ˆvg. Since ˆic = 0, nulling ˆiy is equivalent to nulling</span></span>
<span class="line"><span>ˆiL. Hence, the input admittance under the nulling condition is given by</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.5 Simulation of CPM Controlled Converters 763</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Z∞D−cpm (s)=</span></span>
<span class="line"><span>ˆig</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆiy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>=−D2</span></span>
<span class="line"><span>R (18.129)</span></span>
<span class="line"><span>It follows that Z∞D−cpm (s)=−R/D2, which the same as the result found for ZN−cpm . The ad-</span></span>
<span class="line"><span>mittance 1/Z0D−cpm (s) is found under the condition that ˆix is nulled in the presence of ˆvg and ˆiz.</span></span>
<span class="line"><span>Solving the circuit model in Fig. 18.29 results in</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Z0D−cpm (s)=</span></span>
<span class="line"><span>ˆig</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆix→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= D2−FmFgDVg</span></span>
<span class="line"><span>Zei</span></span>
<span class="line"><span>−FmFgDVg</span></span>
<span class="line"><span>R (18.130)</span></span>
<span class="line"><span>Substitution of Eqs. (18.128), (18.129), and (18.130) into Eq. (18.127) yields an expression for</span></span>
<span class="line"><span>the CPM input impedance ZD−cpm . Following the discussion in Sect.18.4.1, let us examine how</span></span>
<span class="line"><span>ZD−cpm depends on the converter parameters and the artiﬁcial ramp slope Ma. Consider ﬁrst</span></span>
<span class="line"><span>operation at D&lt; 0.5 with no artiﬁcial ramp, Ma= 0. If inductance L is relatively large, M1 and</span></span>
<span class="line"><span>M2 are small, and therefore CPM gain is very large. A large L implies that the inductor current</span></span>
<span class="line"><span>ripple is small, and that Fg≈0. Large Fm implies that Ti is large and Eq. (18.127) simpliﬁes to:</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>Fm→∞</span></span>
<span class="line"><span>Fg→0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ZD−cpm (s)=−D2</span></span>
<span class="line"><span>R (18.131)</span></span>
<span class="line"><span>Next, consider the case when the artiﬁcial ramp slope equals Ma = M2/2, the minimum value</span></span>
<span class="line"><span>necessary to ensure stability of the CPM controlled for any duty cycle D. It can be shown that</span></span>
<span class="line"><span>FmFgDVg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>Ma=M2/2= D2 (18.132)</span></span>
<span class="line"><span>so that Eq. (18.127) becomes</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ZD−cpm (s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>Ma=M2/2</span></span>
<span class="line"><span>=−D2</span></span>
<span class="line"><span>R (18.133)</span></span>
<span class="line"><span>Therefore, for Ma= M2/2, both ZN−cpm and ZD−cpm are equal to−R/D2. For practical values of</span></span>
<span class="line"><span>the artiﬁcial ramp slope Ma, ZD−cpm ≈ZN−cpm =−R/D2.</span></span>
<span class="line"><span>Finally, consider the case when the artiﬁcial ramp slopeMa is large, so thatFm and therefore</span></span>
<span class="line"><span>Ti are small. Equation (18.127) then reduces to</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>Fm→0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ZD−cpm (s)=−D2</span></span>
<span class="line"><span>Zei</span></span>
<span class="line"><span>(18.134)</span></span>
<span class="line"><span>which means that for large Ma the CPM input impedance ZD−cpm approaches the open-loop</span></span>
<span class="line"><span>input impedance ZD in Eq. (17.21) for a duty-cycle controlled converter.</span></span>
<span class="line"><span>Once ZN−cpm and ZD−cpm are determined, input ﬁlter design for a current-programmed con-</span></span>
<span class="line"><span>troller follows the approach described in Chap. 17.</span></span>
<span class="line"><span>18.5 Simulation of CPM Controlled Converters</span></span>
<span class="line"><span>In the current-programmed mode (CPM), the transistor switching is controlled so that the peak</span></span>
<span class="line"><span>transistor current follows a control signal. The transistor duty cycled(t) is not directly controlled,</span></span>
<span class="line"><span>but depends on the CPM control input as well as on other converter voltages and currents.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>764 18 Current-Programmed Control</span></span>
<span class="line"><span>CPM</span></span>
<span class="line"><span>control current 1 2</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>Rf iL(t) Ts</span></span>
<span class="line"><span>v1(t) Ts</span></span>
<span class="line"><span>v2(t) Ts</span></span>
<span class="line"><span>vc(t) Ts</span></span>
<span class="line"><span>PARAMETERS:</span></span>
<span class="line"><span>Rf, fs, L, Va</span></span>
<span class="line"><span>Inputs:</span></span>
<span class="line"><span>Output: duty cycle d</span></span>
<span class="line"><span>Fig. 18.30 Current-programmed mode (CPM) subcircuit</span></span>
<span class="line"><span>In this section, large-signal averaged relationships in CPM are written in a form suitable for</span></span>
<span class="line"><span>implementation as a subcircuit for simulation. The desired form of the CPM averaged subcircuit</span></span>
<span class="line"><span>model is shown in Fig. 18.30. The inputs to the subcircuit are the average control input,</span></span>
<span class="line"><span>⟨vc(t)⟩Ts = Rf⟨ic(t)⟩Ts (18.135)</span></span>
<span class="line"><span>the sensed average inductor current Rf⟨iL(t)⟩Ts , the average voltage⟨v1(t)⟩Ts applied across the</span></span>
<span class="line"><span>inductor during the interval when the transistor is on, and the average voltage⟨v2(t)⟩Ts applied</span></span>
<span class="line"><span>across the inductor during the interval when the rectiﬁer is on. The model parameters include the</span></span>
<span class="line"><span>equivalent current-sense resistance Rf , switching frequency fs, inductance L, and the amplitude</span></span>
<span class="line"><span>Va of the artiﬁcial ramp,</span></span>
<span class="line"><span>Va= maTsRf (18.136)</span></span>
<span class="line"><span>given an artiﬁcial ramp having slope −ma added to the control input. In the subinterval when</span></span>
<span class="line"><span>the transistor is on, the inductor current increases with slope m1 given by</span></span>
<span class="line"><span>m1=⟨v1(t)⟩Ts</span></span>
<span class="line"><span>L (18.137)</span></span>
<span class="line"><span>It is assumed that voltage ripples are small so that the voltage v1(t) across the inductor is ap-</span></span>
<span class="line"><span>proximately equal to the averaged value ⟨v1(t)⟩Ts . The length of this subinterval is d(t)Ts.I n</span></span>
<span class="line"><span>the second subinterval, when the transistor is o ﬀand the rectiﬁer is on, the inductor current</span></span>
<span class="line"><span>decreases with a negative slope−m2. Under the assumption that voltage ripples are small, the</span></span>
<span class="line"><span>slope m2 is given by</span></span>
<span class="line"><span>m2=⟨v2(t)⟩Ts</span></span>
<span class="line"><span>L (18.138)</span></span>
<span class="line"><span>The CPM model output is the duty cycle d. With the inputs and the output shown in Fig. 18.30,</span></span>
<span class="line"><span>the CPM subcircuit can be used in combination with any of the averaged switch subcircuit mod-</span></span>
<span class="line"><span>els developed in Sect.14.3 to construct an averaged simulation model for a current-programmed</span></span>
<span class="line"><span>converter. The CPM subcircuit model is developed ﬁrst in Sect.18.5.1 for the case when the con-</span></span>
<span class="line"><span>verter operates in continues conduction mode, and is then extended to include DCM operation</span></span>
<span class="line"><span>in Sect. 18.5.2.</span></span>
<span class="line"><span>18.5.1 Simulation Model for CPM Controlled Converters in CCM</span></span>
<span class="line"><span>Assuming operation in continuous conduction mode, the large-signal relationship between the</span></span>
<span class="line"><span>average inductor current⟨iL⟩Ts and the control signal ic is given by Eq. (18.67),</span></span></code></pre></div>`,10)])])}const m=s(l,[["render",i]]);export{u as __pageData,m as default};
