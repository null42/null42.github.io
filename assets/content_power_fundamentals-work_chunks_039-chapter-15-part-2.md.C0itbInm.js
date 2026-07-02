import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第15章part 2 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第15章part 2 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 609-628 > Chunk ID: `chapter-15-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/039-chapter-15-part-2.md","filePath":"content/power/fundamentals-work/chunks/039-chapter-15-part-2.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/039-chapter-15-part-2.md"};function i(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第15章part-2-15-equivalent-circuit-modeling-of-the-discontinuous-conduction-mode" tabindex="-1">第15章part 2 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode <a class="header-anchor" href="#第15章part-2-15-equivalent-circuit-modeling-of-the-discontinuous-conduction-mode" aria-label="Permalink to &quot;第15章part 2 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 609-628<br> Chunk ID: <code>chapter-15-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>15.3 Small-Signal AC Modeling of the DCM Switch Network 605</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+ CR</span></span>
<span class="line"><span>DCM switch network small-signal ac model</span></span>
<span class="line"><span>r1 j1dg 1v2 g2v1 j2dr 2 vvˆ ˆ ˆ ˆ ˆ ˆg</span></span>
<span class="line"><span>Fig. 15.20 Low-frequency ac model obtained by neglecting inductor L dynamics. The buck, boost, or</span></span>
<span class="line"><span>buck–boost converters can be modeled, by employing the appropriate parameters from Table15.2</span></span>
<span class="line"><span>inductor L are of questionable validity. The origins, analysis, and more accurate predictions of</span></span>
<span class="line"><span>high-frequency dynamics of DCM converters are discussed in Sect. 15.5.</span></span>
<span class="line"><span>A simple approximate way to determine the low-frequency small-signal transfer functions is</span></span>
<span class="line"><span>to neglect the inductor high-frequency dynamics by simply shorting L in the equivalent circuit</span></span>
<span class="line"><span>of Fig. 15.19. The simpliﬁed, ﬁrst-order model is shown in Fig. 15.20.</span></span>
<span class="line"><span>The small-signal switch model can be employed to model other DCM converters, by simply</span></span>
<span class="line"><span>replacing the transistor and diode with ports 1 and 2, respectively, of the two-port model of</span></span>
<span class="line"><span>Fig. 15.17b. An alternative approach, which yields more convenient results in the analysis of</span></span>
<span class="line"><span>the buck and boost converters, is to deﬁne the switch network as illustrated in Figs. 15.21a,b,</span></span>
<span class="line"><span>respectively. These switch networks can also be modeled using the two-port small-signal equiv-</span></span>
<span class="line"><span>alent circuit of Fig.15.21c; however, new expressions for the parametersr1, j1, g1, etc., must be</span></span>
<span class="line"><span>derived. These expressions are again found by linearizing the equations of the averaged switch</span></span>
<span class="line"><span>network terminal currents.</span></span>
<span class="line"><span>Table15.2 lists the small-signal parameters for the buck switch network of Fig.15.21a( m i d -</span></span>
<span class="line"><span>dle row) and for the boost switch network of Fig. 15.21b (bottom row). Insertion of the small-</span></span>
<span class="line"><span>signal two-port model into the DCM buck and boost converters, together with shorting L to</span></span>
<span class="line"><span>neglect the inductor high-frequency dynamics, leads to the same equivalent circuits shown in</span></span>
<span class="line"><span>Fig. 15.20. The model parameters are given in Table15.2.</span></span>
<span class="line"><span>The control-to-output transfer function G</span></span>
<span class="line"><span>vd(s) is found by letting ˆvg= 0i nF i g .15.20. Solu-</span></span>
<span class="line"><span>tion for ˆv then leads to</span></span>
<span class="line"><span>Gvd(s)= ˆv</span></span>
<span class="line"><span>ˆd</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>= Gd0⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>) (15.57)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>Gd0 = j2(R∥r2)</span></span>
<span class="line"><span>ωp = 1</span></span>
<span class="line"><span>(R∥r2)C (15.58)</span></span>
<span class="line"><span>The line-to-output transfer function Gvg(s) is found by letting ˆd= 0i nF i g .15.20. One then</span></span>
<span class="line"><span>obtains</span></span>
<span class="line"><span>Gvg(s)= ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆd=0</span></span>
<span class="line"><span>= Gg0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>) (15.59)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>606 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>+ +</span></span>
<span class="line"><span>vˆ ˆ ˆ1</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>r1 j1d g1v ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>2 g2v</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ ˆ1 j2dr 2 v2</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>Fig. 15.21 A convenient way to model the switch networks of DCM buck and boost converters: ( a)</span></span>
<span class="line"><span>deﬁned terminal quantities of the DCM buck switch network, (b) deﬁned terminal quantities of the boost</span></span>
<span class="line"><span>switch network, (c) two-port small-signal ac model. The model parameters are given in Table15.2</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>Gg0= g2(R∥r2)= M (15.60)</span></span>
<span class="line"><span>Expressions for Gd0, Gg0, and ωp are listed in Table15.3, for the DCM buck, boost, and buck–</span></span>
<span class="line"><span>boost converters with resistive loads [15, 135].</span></span>
<span class="line"><span>The ac modeling approach described in this section is both general and useful. The transistor</span></span>
<span class="line"><span>and diode of a DCM converter can be simply replaced by the two-port network of Fig. 15.17b,</span></span>
<span class="line"><span>leading to the small-signal ac model. Alternatively, the switch network can be deﬁned as in</span></span>
<span class="line"><span>Fig. 15.21a or b, and then modeled by the same two-port network, Fig.15.21c. The small-signal</span></span>
<span class="line"><span>converter model can then be solved via conventional circuit analysis techniques, to obtain the</span></span>
<span class="line"><span>small-signal transfer functions of the converter.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.3 Small-Signal AC Modeling of the DCM Switch Network 607</span></span>
<span class="line"><span>Table 15.3 Salient features of DCM converter small-signal transfer functions</span></span>
<span class="line"><span>Converter Gd0 Gg0 ωp</span></span>
<span class="line"><span>Buck 2V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>1−M</span></span>
<span class="line"><span>2−M M 2−M</span></span>
<span class="line"><span>(1−M)RC</span></span>
<span class="line"><span>Boost 2V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>M−1</span></span>
<span class="line"><span>2M−1 M 2M−1</span></span>
<span class="line"><span>(M−1)RC</span></span>
<span class="line"><span>Buck–boost V</span></span>
<span class="line"><span>D M 2</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>15.3.1 Example: Control-to-Output Frequency Response of a DCM Boost Converter</span></span>
<span class="line"><span>As a simple numerical example, let us ﬁnd the small-signal control-to-output transfer function</span></span>
<span class="line"><span>of a DCM boost converter having the following element and parameter values:</span></span>
<span class="line"><span>R= 12Ω</span></span>
<span class="line"><span>L= 5 μH (15.61)</span></span>
<span class="line"><span>C= 470 μF</span></span>
<span class="line"><span>fs= 100 kHz</span></span>
<span class="line"><span>The output voltage is regulated to beV= 36 V . It is desired to determineGvd(s) at the operating</span></span>
<span class="line"><span>point where the load current is I= 3 A and the dc input voltage is Vg= 24 V .</span></span>
<span class="line"><span>The eﬀective resistance Re(D) is found by solution of the dc equivalent circuit of Fig.15.16b.</span></span>
<span class="line"><span>Since the load current I and the input and output voltagesV and Vg are known, the power source</span></span>
<span class="line"><span>value P is</span></span>
<span class="line"><span>P= I(V−Vg)= (3 A)(36 V−24 V)= 36 W (15.62)</span></span>
<span class="line"><span>The eﬀective resistance is therefore</span></span>
<span class="line"><span>Re=</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>P = (24 V)2</span></span>
<span class="line"><span>36 W = 16Ω (15.63)</span></span>
<span class="line"><span>The steady-state duty cycle D can now be found using Eq. (15.37):</span></span>
<span class="line"><span>D=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>ReTs</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2(5 μH)</span></span>
<span class="line"><span>(16Ω)(10 μs)= 0.25 (15.64)</span></span>
<span class="line"><span>The expressions given in Table15.3 for Gd0 andωp of the boost converter can now be evaluated:</span></span>
<span class="line"><span>Gd0= 2V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>M−1</span></span>
<span class="line"><span>2M−1= 2(36 V)</span></span>
<span class="line"><span>(0.25)</span></span>
<span class="line"><span>⎦(36 V)</span></span>
<span class="line"><span>(24 V)−1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>2(36 V)</span></span>
<span class="line"><span>(24 V)−1</span></span>
<span class="line"><span>)= 72 V⇒37 dBV</span></span>
<span class="line"><span>fp= ωp</span></span>
<span class="line"><span>2π= 2M−1</span></span>
<span class="line"><span>2π(M−1)RC=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>2(36 V)</span></span>
<span class="line"><span>(24 V)−1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>⎦(36 V)</span></span>
<span class="line"><span>(24 V)−1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(12Ω)(470μF)</span></span>
<span class="line"><span>= 112 Hz (15.65)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>608 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>112 Hz</span></span>
<span class="line"><span>Gd0 37 dBV</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>⏐⏐⏐ ⏐ Gvd</span></span>
<span class="line"><span>⏐⏐⏐ ⏐ Gvd</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>0 dBV</span></span>
<span class="line"><span>20 dBV</span></span>
<span class="line"><span>40 dBV</span></span>
<span class="line"><span>60 dBV</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>Fig. 15.22 Magnitude and phase of the control-to-output transfer function, DCM boost example. Solid</span></span>
<span class="line"><span>lines: function and its asymptotes, approximate single-pole response predicted by the model of Fig. 15.20.</span></span>
<span class="line"><span>Dashed lines: more accurate response that includes high-frequency inductor dynamics</span></span>
<span class="line"><span>A Bode diagram of the control-to-output transfer function is constructed in Fig. 15.22.T h e</span></span>
<span class="line"><span>solid lines illustrate the magnitude and phase predicted by the approximate single-pole model</span></span>
<span class="line"><span>of Fig. 15.20. The dashed lines are the predictions of the more accurate model discussed in</span></span>
<span class="line"><span>Sect. 15.5, which include a second pole at f2= 64 kHz and a RHP zero at fz= 127 kHz, arising</span></span>
<span class="line"><span>from the inductor dynamics. Since the switching frequency is 100 kHz, the accuracy of the</span></span>
<span class="line"><span>model at these frequencies cannot be guaranteed. Nonetheless, in practice, the lagging phase</span></span>
<span class="line"><span>asymptotes arising from the inductor dynamics can be observed beginning at f2/10= 6.4k H z .</span></span>
<span class="line"><span>15.4 Combined CCM/DCM Averaged Switch Simulation Model</span></span>
<span class="line"><span>All converters containing a diode rectiﬁer operate in discontinuous conduction mode (DCM)</span></span>
<span class="line"><span>if the load current is suﬃciently low. In some cases, converters are purposely designed to op-</span></span>
<span class="line"><span>erate in DCM. It is therefore of interest to develop averaged models suitable for simulation of</span></span>
<span class="line"><span>converters that may operate in either CCM or DCM.</span></span>
<span class="line"><span>Figure 15.23 illustrates the general two-switch network, and the corresponding large-signal</span></span>
<span class="line"><span>averaged models in CCM and DCM. The CCM averaged switch model, which is derived in</span></span>
<span class="line"><span>Sect. 14.1, is an ideal transformer with d′:d turns ratio. In DCM, the large-signal averaged</span></span>
<span class="line"><span>switch model is a loss-free resistor, as derived in Sect. 15.2. Our objective is to construct a</span></span>
<span class="line"><span>combined CCM/DCM averaged switch model that reduces to the model of Fig. 15.23ao rt o</span></span>
<span class="line"><span>the model of Fig. 15.23c depending on the operating mode of the converter. Let us deﬁne an</span></span>
<span class="line"><span>eﬀective switch conversion ratioμ(t), so that the averaged switch model in both modes has the</span></span>
<span class="line"><span>same form as in CCM, as shown in Fig.15.24. If the converter operates in CCM, then the switch</span></span>
<span class="line"><span>conversion ratioμ(t) is equal to the switch duty cycle d(t),</span></span>
<span class="line"><span>μ= d (15.66)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.4 Combined CCM/DCM Averaged Switch Simulation Model 609</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>(b) i2(t) Ts</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>v2(t) Tsv1(t) Ts</span></span>
<span class="line"><span>i1(t) Ts</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>CCM/DCM</span></span>
<span class="line"><span>averaged switch model</span></span>
<span class="line"><span>1 – μ : μ</span></span>
<span class="line"><span>(c) i2(t) Ts</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>v2(t) Tsv1(t) Ts</span></span>
<span class="line"><span>i1(t) Ts</span></span>
<span class="line"><span>Re(d1)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>p(t) Ts</span></span>
<span class="line"><span>DCM</span></span>
<span class="line"><span>averaged switch model</span></span>
<span class="line"><span>Fig. 15.23 Summary of averaged switch modeling: (a) general two-switch network, (b) averaged switch</span></span>
<span class="line"><span>model in CCM, and (c) averaged switch model in DCM</span></span>
<span class="line"><span>If the converter operates in DCM, then the eﬀective switch conversion ratio can be computed so</span></span>
<span class="line"><span>that the terminal characteristics of the averaged switch model of Fig. 15.24 match the terminal</span></span>
<span class="line"><span>characteristics of the loss-free resistor model of Fig.15.23c. Matching the port 1 characteristics</span></span>
<span class="line"><span>gives</span></span>
<span class="line"><span>⟨v1(t)⟩Ts = 1−μ</span></span>
<span class="line"><span>μ ⟨v2(t)⟩Ts = Re⟨i1(t)⟩Ts (15.67)</span></span>
<span class="line"><span>which can be solved for the switch conversion ratioμ,</span></span>
<span class="line"><span>μ= 1</span></span>
<span class="line"><span>1+ Re⟨i1(t)⟩Ts</span></span>
<span class="line"><span>⟨v2(t)⟩Ts</span></span>
<span class="line"><span>(15.68)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>610 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>i2(t) Ts</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t) Tsv1(t) Ts</span></span>
<span class="line"><span>i1(t) Ts</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>CCM/DCM</span></span>
<span class="line"><span>averaged switch model</span></span>
<span class="line"><span>1 μ : μ</span></span>
<span class="line"><span>Fig. 15.24 A general averaged switch model using the equivalent switch conversion ratioμ</span></span>
<span class="line"><span>It can be veriﬁed that matching the port 2 characteristics of the models in Figs.15.23c and 15.24</span></span>
<span class="line"><span>gives exactly the same result for the eﬀective switch conversion ratio in DCM.</span></span>
<span class="line"><span>The switch conversion ratioμ(t) can be considered a generalization of the duty cycle d(t)</span></span>
<span class="line"><span>of CCM switch networks. Based on this approach, models and results developed for converters</span></span>
<span class="line"><span>in CCM can be used not only for DCM but also for other operating modes or even for other</span></span>
<span class="line"><span>converter conﬁgurations by simply replacing the switch duty cycle d(t) with the appropriate</span></span>
<span class="line"><span>switch conversion ratioμ(t)[ 71–74]. For example, if M(d) is the conversion ratio in CCM, then</span></span>
<span class="line"><span>M(μ), withμgiven by Eq. (15.68), is the conversion ratio in DCM. The switch conversion ratio</span></span>
<span class="line"><span>in DCM depends on the averaged terminal voltage and current, as well as the switch duty cycle</span></span>
<span class="line"><span>d through the eﬀective resistance R</span></span>
<span class="line"><span>e = 2L/d2Ts. If the converter is completely unloaded, then</span></span>
<span class="line"><span>the average transistor current⟨i1(t)⟩Ts is zero, and the DCM switch conversion ratio becomes</span></span>
<span class="line"><span>μ= 1. As a result, the dc output voltage attains the maximum possible value V= Vg M(1). This</span></span>
<span class="line"><span>is consistent with the results of the steady-state DCM analyses in Chap. 5 and Sect. 15.2.</span></span>
<span class="line"><span>To construct a combined CCM/DCM averaged switch model based on the general averaged</span></span>
<span class="line"><span>switch model of Fig.15.24, it is necessary to specify which of the two expressions for the switch</span></span>
<span class="line"><span>conversion ratio to use: Eq. ( 15.66), which is valid in CCM, or Eq. ( 15.68), which is valid in</span></span>
<span class="line"><span>DCM. At the CCM/DCM boundary, these two expressions must give the same result,μ= d.I f</span></span>
<span class="line"><span>the load current decreases further, the converter operates in DCM, the average switch current</span></span>
<span class="line"><span>⟨i1(t)⟩Ts decreases, and the DCM switch conversion ratio in Eq. ( 15.68) becomes greater than</span></span>
<span class="line"><span>the switch duty cycled. We conclude that the correct value of the switch conversion ratio, which</span></span>
<span class="line"><span>takes into account operation in CCM or DCM, is the larger of the two values computed using</span></span>
<span class="line"><span>Eq. (15.66) and Eq. (15.68).</span></span>
<span class="line"><span>Figure 15.25 shows an implementation of the combined CCM/DCM model as a SPICE sub-</span></span>
<span class="line"><span>circuit CCM-DCM1. This subcircuit has the same ﬁve interface nodes as the subcircuits CCM1</span></span>
<span class="line"><span>and CCM2 of Sect. 14.3.1 The controlled sources Et and Gd model the port 1 (transistor) and</span></span>
<span class="line"><span>port 2 (diode) averaged characteristics, as shown in Fig.15.24. The switch conversion ratioμis</span></span>
<span class="line"><span>equal to the voltagev(u) at the subcircuit node u. The controlled voltage sourceEu computes the</span></span>
<span class="line"><span>switch conversion ratio as the greater of the two values obtained from Eqs. (15.66) and (15.68).</span></span>
<span class="line"><span>The controlled current source Ga, the zero-value voltage source Va, and the resistor Ra form</span></span>
<span class="line"><span>an auxiliary circuit to ensure that the solution found by the simulator has the transistor and the</span></span>
<span class="line"><span>diode currents with correct polarities,⟨i1(t)⟩Ts &gt; 0,⟨i2(t)⟩Ts &gt; 0. The subcircuit parameters are</span></span>
<span class="line"><span>the inductance L relevant for CCM/DCM operation, and the switching frequency fs. The default</span></span>
<span class="line"><span>values in the subcircuit are arbitrarily set to L= 100μH and fs= 100 kHz.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.4 Combined CCM/DCM Averaged Switch Simulation Model 611</span></span>
<span class="line"><span>(a) i2(t) Ts</span></span>
<span class="line"><span>v2(t) Ts</span></span>
<span class="line"><span>v1(t) Ts</span></span>
<span class="line"><span>i1(t) Ts</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>+ +1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>CCM-DCM1</span></span>
<span class="line"><span>(b) *****************************************************************</span></span>
<span class="line"><span>* MODEL: CCM-DCM1</span></span>
<span class="line"><span>* Application: two-switch PWM converters, CCM or DCM</span></span>
<span class="line"><span>* Limitations: ideal switches, no transformer</span></span>
<span class="line"><span>*****************************************************************</span></span>
<span class="line"><span>* Parameters:</span></span>
<span class="line"><span>* L = equivalent inductance for DCM</span></span>
<span class="line"><span>* fs = switching frequency</span></span>
<span class="line"><span>*****************************************************************</span></span>
<span class="line"><span>* Nodes:</span></span>
<span class="line"><span>* 1: transistor positive (drain for an n-channel MOS)</span></span>
<span class="line"><span>* 2: transistor negative (source for an n-channel MOS)</span></span>
<span class="line"><span>* 3: diode cathode</span></span>
<span class="line"><span>* 4: diode anode</span></span>
<span class="line"><span>* 5: duty cycle control input</span></span>
<span class="line"><span>*****************************************************************</span></span>
<span class="line"><span>.subckt CCM-DCM1 1 2 3 4 5</span></span>
<span class="line"><span>+ params: L=100u fs=1E5</span></span>
<span class="line"><span>Et 1 2 value={(1-v(u))*v(3,4)/v(u)}</span></span>
<span class="line"><span>Gd 4 3 value={(1-v(u))*i(Et)/v(u)}</span></span>
<span class="line"><span>Ga 0 a value={MAX(i(Et),0)}</span></span>
<span class="line"><span>Va a b</span></span>
<span class="line"><span>Ra b 0 1k</span></span>
<span class="line"><span>Eu u 0 table {MAX(v(5),</span></span>
<span class="line"><span>+ v(5)*v(5)/(v(5)*v(5)+2*L*fs*i(Va)/v(3,4)))} (0 0) (1 1)</span></span>
<span class="line"><span>.ends</span></span>
<span class="line"><span>*****************************************************************</span></span>
<span class="line"><span>Fig. 15.25 Implementation of the combined CCM-DCM averaged switch model: (a) schematic symbol,</span></span>
<span class="line"><span>(b) SPICE netlist</span></span>
<span class="line"><span>The SPICE subcircuit CCM-DCM1 of Fig. 15.25 can be used for dc, ac, and transient sim-</span></span>
<span class="line"><span>ulations of PWM converters containing a transistor switch and a diode switch. This subcircuit</span></span>
<span class="line"><span>is included in the model library switch.lib. It can be modiﬁed further for use in converters with</span></span>
<span class="line"><span>isolation transformer.</span></span>
<span class="line"><span>15.4.1 Example: CCM/DCM SEPIC Frequency Responses</span></span>
<span class="line"><span>As another example, consider the SEPIC of Fig.15.26. According to Eq. (15.39), this converter</span></span>
<span class="line"><span>operates in CCM if</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>R&gt; 1−D</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Re(D) (15.69)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>612 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>RL1</span></span>
<span class="line"><span>RL2</span></span>
<span class="line"><span>100 μH</span></span>
<span class="line"><span>500 μH 47 μF</span></span>
<span class="line"><span>200 μF</span></span>
<span class="line"><span>0.02 </span></span>
<span class="line"><span>0.1 </span></span>
<span class="line"><span>120 V</span></span>
<span class="line"><span>D= 0.4</span></span>
<span class="line"><span>load</span></span>
<span class="line"><span>fs = 100 kHz</span></span>
<span class="line"><span>Fig. 15.26 SEPIC example</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>RL1</span></span>
<span class="line"><span>RL2</span></span>
<span class="line"><span>100 μH</span></span>
<span class="line"><span>500 μH 47 μF</span></span>
<span class="line"><span>200 μF</span></span>
<span class="line"><span>0.02 </span></span>
<span class="line"><span>0.1 </span></span>
<span class="line"><span>120V load</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vc</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>CCM-DCM1</span></span>
<span class="line"><span>4321</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Xswitch</span></span>
<span class="line"><span>L = 83.3 ! H</span></span>
<span class="line"><span>fs = 100 kHz</span></span>
<span class="line"><span>Fig. 15.27 SEPIC simulation example: averaged circuit model</span></span>
<span class="line"><span>where Re(D)i sg i v e nb yE q .(15.38). Upon neglecting losses in the converter, one ﬁnds that the</span></span>
<span class="line"><span>CCM conversion ratio is V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>≈D</span></span>
<span class="line"><span>1−D (15.70)</span></span>
<span class="line"><span>When Eqs. (15.38) and (15.70) are substituted into Eq. ( 15.69), the condition for operation in</span></span>
<span class="line"><span>CCM becomes:</span></span>
<span class="line"><span>R&lt; 2(L1∥L2)</span></span>
<span class="line"><span>(1−D)2Ts</span></span>
<span class="line"><span>= 46Ω (15.71)</span></span>
<span class="line"><span>Figure 15.27 shows the averaged circuit model obtained by replacing the switch network</span></span>
<span class="line"><span>with the CCM-DCM1 subcircuit of Fig. 15.25. A part of the circuit netlist is included in</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.4 Combined CCM/DCM Averaged Switch Simulation Model 613</span></span>
<span class="line"><span>Fig. 15.27. The connections and the parameters of the CCM-DCM1 subcircuit are deﬁned by</span></span>
<span class="line"><span>the Xswitch line. In the SEPIC, the inductance parameter L= 83.3μH is equal to the parallel</span></span>
<span class="line"><span>combination of L1 and L2. The voltage source vc sets the quiescent value of the duty cycle to</span></span>
<span class="line"><span>D= 0.4, and the small-signal ac value to ˆd= 1. Ac simulation is performed on a linearized cir-</span></span>
<span class="line"><span>cuit model, so that amplitudes of all small-signal ac waveforms are directly proportional to the</span></span>
<span class="line"><span>amplitude of the ac input, regardless of the input ac amplitude value. For example, the control-</span></span>
<span class="line"><span>to-output transfer function is Gvd= ˆv/ ˆd, where ˆv= v(4) in the circuit of Fig.15.27a. We can set</span></span>
<span class="line"><span>the input ac amplitude to 1, so that the control-to-output transfer function Gvd can be measured</span></span>
<span class="line"><span>directly as v(5). This setup is just for convenience in ﬁnding small-signal frequency responses</span></span>
<span class="line"><span>by simulation. For measurements of converter transfer functions in an experimental circuit (see</span></span>
<span class="line"><span>Sect. 8.5), the actual amplitude of the small-signal ac variation ˆd would be set to a fraction of</span></span>
<span class="line"><span>the quiescent duty cycle D. Parameters of the ac simulation are set by the .ac line in the netlist:</span></span>
<span class="line"><span>the signal frequency is swept from the minimum frequency of 5 Hz to the maximum frequency</span></span>
<span class="line"><span>of 50 kHz in 201 points per decade.</span></span>
<span class="line"><span>Figure 15.28 shows magnitude and phase responses of the control-to-output transfer func-</span></span>
<span class="line"><span>tion obtained by SPICE ac simulations for two diﬀerent values of the load resistance: R= 40Ω,</span></span>
<span class="line"><span>for which the converter operates in CCM, and R = 50Ω, for which the converter operates</span></span>
<span class="line"><span>in DCM. For these two operating points, the quiescent (dc) voltages and currents in the cir-</span></span>
<span class="line"><span>cuit are nearly the same. Nevertheless, the frequency responses are qualitatively very diﬀerent</span></span>
<span class="line"><span>in the two operating modes. In CCM, the converter exhibits a fourth-order response with two</span></span>
<span class="line"><span>pairs of high-Q complex-conjugate poles and a pair of complex-conjugate zeroes. Another RHP</span></span>
<span class="line"><span>(right half-plane) zero can be observed at frequencies approaching 50 kHz. In DCM, there is</span></span>
<span class="line"><span>a dominant low-frequency pole followed by a pair of complex-conjugate poles and a pair of</span></span>
<span class="line"><span>Fig. 15.28 Magnitude and phase responses of the control-to-output transfer function obtained by simu-</span></span>
<span class="line"><span>lation of the SEPIC example, for two values of load resistance. For R= 50Ω, the converter operates in</span></span>
<span class="line"><span>DCM (solid lines), and for R= 40Ωthe converter operates in CCM (dashed lines)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>614 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>complex-conjugate zeroes. The frequencies of the complex poles and zeroes are very close in</span></span>
<span class="line"><span>value. High-frequency dynamics contribute additional phase lag at higher frequencies.</span></span>
<span class="line"><span>In the design of a feedback controller around a converter that may operate in CCM or in</span></span>
<span class="line"><span>DCM, one should take into account that the crossover frequency, the phase margin, and the</span></span>
<span class="line"><span>closed-loop responses can be substantially di ﬀerent depending on the operating mode. This</span></span>
<span class="line"><span>point is illustrated by the example of the next section.</span></span>
<span class="line"><span>15.4.2 Example: Loop Gain and Closed-Loop Responses of a Buck Voltage Regulator</span></span>
<span class="line"><span>A controller design for a buck converter example is discussed in Sect. 9.5.4. The converter and</span></span>
<span class="line"><span>the block diagram of the controller are shown in Fig.9.35. This converter system is designed to</span></span>
<span class="line"><span>regulate the dc output voltage at V= 15 V for the load current up to 5 A. Let us test this design</span></span>
<span class="line"><span>by simulation. An averaged circuit model of a practical realization of the buck voltage regulator</span></span>
<span class="line"><span>described in Sect. 9.5.4 is shown in Fig.15.29. The MOSFET and the diode switch are replaced</span></span>
<span class="line"><span>by the averaged switch model implemented as the CCM-DCM1 subcircuit. The pulse-width</span></span>
<span class="line"><span>modulator with V</span></span>
<span class="line"><span>M = 4 V is modeled according to the discussion in Sect. 7.3 as a dependent</span></span>
<span class="line"><span>voltage source Epwm controlled by the PWM input voltage vx.T h ev a l u eo fEpwm is equal to</span></span>
<span class="line"><span>1/VM = 0.25 times the PWM input voltage vx, with a limit for the minimum value set to 0.1</span></span>
<span class="line"><span>V , and a limit for the maximum value set to 0.9 V . The output of the pulse-width modulator is</span></span>
<span class="line"><span>the control duty-cycle input to the CCM-DCM1 averaged switch subcircuit. Given the speciﬁed</span></span>
<span class="line"><span>limits for Epwm, the switch duty cycle d(t) can take values in the range:</span></span>
<span class="line"><span>Dmin≤d(t)≤Dmax (15.72)</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>CCM-DCM1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>50 μH</span></span>
<span class="line"><span>11 k500 μF</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>28 V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>5 V</span></span>
<span class="line"><span>+12 V</span></span>
<span class="line"><span>LM324</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>R3 C3</span></span>
<span class="line"><span>R4</span></span>
<span class="line"><span>85 k</span></span>
<span class="line"><span>1.1 nF2.7 nF</span></span>
<span class="line"><span>47 k</span></span>
<span class="line"><span>120 k</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>yvx</span></span>
<span class="line"><span>Epwm</span></span>
<span class="line"><span>VM = 4 V</span></span>
<span class="line"><span>value = {LIMIT(0.25 vx, 0.1, 0.9)}</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>iLOAD321</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5678</span></span>
<span class="line"><span>.nodeset v(3)=15 v(5)=5 v(6)=4.144 v(8)=0.536</span></span>
<span class="line"><span>Xswitch</span></span>
<span class="line"><span>L = 50 μ</span></span>
<span class="line"><span>fs = 100 k z</span></span>
<span class="line"><span>Fig. 15.29 Buck voltage regulator example</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.4 Combined CCM/DCM Averaged Switch Simulation Model 615</span></span>
<span class="line"><span>where Dmin = 0.1, and Dmax = 0.9. Practical PWM integrated circuits often have a limit</span></span>
<span class="line"><span>Dmax&lt; 1 for the maximum possible duty cycle. The voltage sensor and the compensator are im-</span></span>
<span class="line"><span>plemented around an op amp LM324. With very large loop gain in the system, the steady-state</span></span>
<span class="line"><span>error voltage is approximately zero, i.e., the dc voltages at the plus and the minus inputs of the</span></span>
<span class="line"><span>op amp are almost the same,</span></span>
<span class="line"><span>v(5)= v</span></span>
<span class="line"><span>re f (15.73)</span></span>
<span class="line"><span>As a result, the quiescent (dc) output voltage V is set by the reference voltage vre f and the</span></span>
<span class="line"><span>voltage divider comprised of R1, R2, R4:</span></span>
<span class="line"><span>V R4</span></span>
<span class="line"><span>R1+ R2+ R4</span></span>
<span class="line"><span>= vre f = 5 V (15.74)</span></span>
<span class="line"><span>By setting the ac reference voltage ˆvre f to zero, one can ﬁnd the combined transfer function of</span></span>
<span class="line"><span>the voltage sensor and the compensator as:</span></span>
<span class="line"><span>H(s)Gc(s)= ˆvy</span></span>
<span class="line"><span>ˆv =</span></span>
<span class="line"><span>R3+ 1</span></span>
<span class="line"><span>sC3</span></span>
<span class="line"><span>R1+ R2</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>sC2</span></span>
<span class="line"><span>(15.75)</span></span>
<span class="line"><span>This transfer function can be written in factored pole-zero form as</span></span>
<span class="line"><span>GcmH</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωz</span></span>
<span class="line"><span>) ⎦</span></span>
<span class="line"><span>1+ ωL</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>) (15.76)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>GcmH= R3</span></span>
<span class="line"><span>R1+ R2</span></span>
<span class="line"><span>(15.77)</span></span>
<span class="line"><span>fz= ωz</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2πR2C2</span></span>
<span class="line"><span>(15.78)</span></span>
<span class="line"><span>fL= ωL</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2πR3C3</span></span>
<span class="line"><span>(15.79)</span></span>
<span class="line"><span>fp= ωP</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2π(R1∥R2) C2</span></span>
<span class="line"><span>(15.80)</span></span>
<span class="line"><span>The design described in Sect. 9.5.4 resulted in the following values for the gain and the corner</span></span>
<span class="line"><span>frequencies:</span></span>
<span class="line"><span>GcmH= 3.7(1/3)= 1.23, fz= 1.7k H z, fL= 500 Hz, fP= 14.5 kHz (15.81)</span></span>
<span class="line"><span>Eqs. (15.74) and ( 15.77)t o( 15.81) can be used to select the circuit parameter values. Let us</span></span>
<span class="line"><span>(somewhat arbitrarily) choose C2 = 1.1 nF. Then, from Eq. (15.78), we have R2 = 85 kΩ, and</span></span>
<span class="line"><span>Eq. (15.80) yields R1= 11 kΩ.F r o mE q .(15.77) we obtain R3= 120 kΩ, and Eq. (15.79)g i v e s</span></span>
<span class="line"><span>C3 = 2.7kΩ. Finally, R4 = 47 kΩis found from Eq. (15.74). The voltage regulator design can</span></span>
<span class="line"><span>now be tested by simulations of the circuit in Fig. 15.29.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>616 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>Loop gains can be obtained by simulation using exactly the same techniques described in</span></span>
<span class="line"><span>Sect. 9.6 for experimental measurement of loop gains [137]. Let us apply the voltage injection</span></span>
<span class="line"><span>technique of Sect.9.6.1. An ac voltage sourcevz is injected between the compensator output and</span></span>
<span class="line"><span>the PWM input. This is a good injection point since the output impedance of the compensator</span></span>
<span class="line"><span>built around the op amp is small, and the PWM input impedance is very large (inﬁnity in the</span></span>
<span class="line"><span>circuit model of Fig. 15.29). With the ac source amplitude set (arbitrarily) to 1, and no other ac</span></span>
<span class="line"><span>sources in the circuit, ac simulations are performed to ﬁnd the loop gain as</span></span>
<span class="line"><span>T(s)= ˆv</span></span>
<span class="line"><span>y</span></span>
<span class="line"><span>ˆvx</span></span>
<span class="line"><span>=−v(6)</span></span>
<span class="line"><span>v(7) (15.82)</span></span>
<span class="line"><span>To perform ac analysis, the simulator ﬁrst solves for the quiescent (dc) operating point. The</span></span>
<span class="line"><span>circuit is then linearized at this operating point, and small-signal frequency responses are com-</span></span>
<span class="line"><span>puted for the speciﬁed range of signal frequencies. Solving for the quiescent operating point</span></span>
<span class="line"><span>involves numerical solution of a system of nonlinear equations. In some cases, the numerical</span></span>
<span class="line"><span>solution does not converge and the simulation is aborted with an error message. In particular,</span></span>
<span class="line"><span>convergence problems often occur in circuits with feedback, especially when the loop gain at dc</span></span>
<span class="line"><span>is very large. This is the case in the circuit of Fig. 15.29. To help convergence when the simula-</span></span>
<span class="line"><span>tor is solving for the quiescent operating point, one can specify approximate or expected values</span></span>
<span class="line"><span>of node voltages using the .nodeset line as shown in Fig.15.29. In this case, we know by design</span></span>
<span class="line"><span>that the quiescent output voltage is close to 15 V ( v(3)= 15), that the negative input of the op</span></span>
<span class="line"><span>amp is very close to the reference (v(5)= 5), and that the quiescent duty cycle is approximately</span></span>
<span class="line"><span>D= V/V</span></span>
<span class="line"><span>g= 0.536, so that v(8)= 0.536 V . Given these approximate node voltages, the numeri-</span></span>
<span class="line"><span>cal solution converges, and the following quiescent operating points are found by the simulator</span></span>
<span class="line"><span>for two values of the load resistance R:</span></span>
<span class="line"><span>R= 3Ω, v(3)= 15.2V, v(5)= 5.0V, v(7)= 2.173 V, v(8)= 0.543 V, D= 0.543 (15.83)</span></span>
<span class="line"><span>R= 25Ω, v(3)= 15.2V, v(5)= 5.0V, v(7)= 2.033 V, v(8)= 0.508 V, D= 0.508 (15.84)</span></span>
<span class="line"><span>For the nominal load resistance R= 3Ω, the converter operates in CCM, so that D= V/V</span></span>
<span class="line"><span>g.F o r</span></span>
<span class="line"><span>R= 25Ω, the same dc output voltage is obtained for a lower value of the quiescent duty cycle,</span></span>
<span class="line"><span>which means that the converter operates in DCM.</span></span>
<span class="line"><span>The magnitude and phase responses of the loop gain found for the operating points given</span></span>
<span class="line"><span>by Eqs. (15.83) and (15.84)a r es h o w ni nF i g .15.30.F o rR= 3Ω, the crossover frequency is</span></span>
<span class="line"><span>fc = 5.3 kHz, and the phase margin is φM = 47o, very close to the values ( fc = 5k H z, φM =</span></span>
<span class="line"><span>52◦) that we designed for in Sect. 9.5.4. At light load, for R= 25Ω, the loop gain responses are</span></span>
<span class="line"><span>considerably diﬀerent because the converter operates in DCM. The crossover frequency drops</span></span>
<span class="line"><span>to fc= 390 Hz, while the phase margin isφM = 55◦.</span></span>
<span class="line"><span>The magnitude responses of the line-to-output transfer function are shown in Fig. 15.31,</span></span>
<span class="line"><span>again for two values of the load resistance,R= 3Ωand R= 25Ω. The open-loop responses are</span></span>
<span class="line"><span>obtained by braking the feedback loop at node 8, and setting the dc voltage at this node to the</span></span>
<span class="line"><span>quiescent value D of the duty cycle. For R= 3Ω, the open-loop and closed-loop responses can</span></span>
<span class="line"><span>be compared to the theoretical plots shown in Fig. 9.45. At 100 Hz, the closed-loop magnitude</span></span>
<span class="line"><span>response is 0.012⇒−38 dB. A 1 V , 100 Hz variation invg(t) would induce a 12 mV variation</span></span>
<span class="line"><span>in the output voltage v(t). For R= 25Ω, the closed-loop magnitude response is 0.02⇒−34 dB,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.4 Combined CCM/DCM Averaged Switch Simulation Model 617</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>|| ||T || ||T T</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>zHk05zHk5zH05zH5 500 Hz</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>R = 3 </span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>R = 25 </span></span>
<span class="line"><span>R = 3 </span></span>
<span class="line"><span>R = 25 </span></span>
<span class="line"><span>m = 55 m = 47</span></span>
<span class="line"><span>fc = 5.3 kHzfc = 390 Hz</span></span>
<span class="line"><span>Fig. 15.30 Loop gain in the buck voltage regulator example</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>||Gvg ||</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>zHk05zHk5zH05zH5 500 Hz</span></span>
<span class="line"><span>R = 3 </span></span>
<span class="line"><span>R = 25 </span></span>
<span class="line"><span>Open loop, d(t) = constant</span></span>
<span class="line"><span>Closed loop</span></span>
<span class="line"><span>Fig. 15.31 Line-to-output response of the buck voltage regulator example</span></span>
<span class="line"><span>which means that the 1 V , 100 Hz variation in vg(t) would induce a 20 mV variation in the</span></span>
<span class="line"><span>output voltage. Notice how the regulator performance in terms of rejecting the input voltage</span></span>
<span class="line"><span>disturbance is signiﬁcantly worse at light load than at the nominal load.</span></span>
<span class="line"><span>A test of the transient response to a step change in load is shown in Fig. 15.32. The load</span></span>
<span class="line"><span>current is initially equal to 1.5 A, and increases toiLOAD = 5Aa t t= 0.1 ms. When the converter</span></span>
<span class="line"><span>is operated in open-loop at constant duty cycle, the response is governed by the natural time</span></span>
<span class="line"><span>constants of the converter network. A large undershoot and long lightly damped oscillations can</span></span>
<span class="line"><span>be observed in the output voltage. With the feedback loop closed, the controller dynamically</span></span>
<span class="line"><span>adjusts the duty cycle d(t) trying to maintain the output voltage constant. The output voltage</span></span>
<span class="line"><span>drops by about 0.2 V , and it returns to the regulated value after a short, well-damped transient.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>618 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>0 0.2 ms 0.4 ms 0.6 ms 0.8 ms 1.0 ms 1.2 ms 1.4 ms 1.6 ms 1.8 ms 2.0 ms</span></span>
<span class="line"><span>0 0.2 ms 0.4 ms 0.6 ms 0.8 ms 1.0 ms 1.2 ms 1.4 ms 1.6 ms 1.8 ms 2.0 ms</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>2 A</span></span>
<span class="line"><span>4 A</span></span>
<span class="line"><span>6 A</span></span>
<span class="line"><span>14 V</span></span>
<span class="line"><span>15 V</span></span>
<span class="line"><span>16 V</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>iLOAD</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Closed loop</span></span>
<span class="line"><span>Open loop</span></span>
<span class="line"><span>d(t) = constant</span></span>
<span class="line"><span>Fig. 15.32 Load transient response of the buck voltage regulator example</span></span>
<span class="line"><span>The voltage regulator example of Fig. 15.29 illustrates how the performance can vary sig-</span></span>
<span class="line"><span>niﬁcantly if the regulator is expected to supply a wide range of loads. In practice, further tests</span></span>
<span class="line"><span>would also be performed to account for expected ranges of input voltages, and variations in</span></span>
<span class="line"><span>component parameter values. Design iterations may be necessary to ensure that performance</span></span>
<span class="line"><span>speciﬁcations are met under worst-case conditions.</span></span>
<span class="line"><span>15.5 High-Frequency Dynamics of Converters in DCM</span></span>
<span class="line"><span>As discussed in Sect. 15.3, transfer functions of converters operating in discontinuous conduc-</span></span>
<span class="line"><span>tion mode exhibit a dominant low-frequency pole. To correctly model the high-frequency dy-</span></span>
<span class="line"><span>namics of DCM converters, the approximation given by Eq. ( 15.5) must be removed, i.e., one</span></span>
<span class="line"><span>must account for the fact that the ac voltage across the inductor is not zero [130]. In this section,</span></span>
<span class="line"><span>we show that the high-frequency dynamics of DCM converters are related to the sampling pro-</span></span>
<span class="line"><span>cess associated with the pulse-width modulator and the nature of the response of the inductor</span></span>
<span class="line"><span>current to duty-cycle perturbations [136].</span></span>
<span class="line"><span>Figure 15.33 shows details of steady-state and small-signal perturbed waveforms in a DCM</span></span>
<span class="line"><span>converter. During the switching period shown, the inductor current ramps up from zero with a</span></span>
<span class="line"><span>slope m</span></span>
<span class="line"><span>1, and then ramps down to zero with a slopem2. It is assumed that converter voltages do</span></span>
<span class="line"><span>not change appreciably so that the slopes m1 and m2 can be considered constant.</span></span>
<span class="line"><span>The PWM input signal vc(t) has a steady-state dc component Vc and a small-signal ac per-</span></span>
<span class="line"><span>turbation ˆvc. During the switching period shown in Fig. 15.33, the transistor switch gate-drive</span></span>
<span class="line"><span>waveform is extended by ˆdTs, where ˆd= ˆvc/VM and VM is the amplitude of the PWM ramp.</span></span>
<span class="line"><span>Figure 15.33d shows that the perturbation in the transistor gate-drive waveform is a pulse of</span></span>
<span class="line"><span>length ˆdTs, which occurs at the modulated edge of the gate-drive waveform. As a result, a per-</span></span>
<span class="line"><span>turbation in the inductor current waveform is observed. It is important to note that the converter</span></span>
<span class="line"><span>waveforms are unaﬀected by the ac perturbation ˆvc until the modulated (trailing) edge of the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.5 High-Frequency Dynamics of Converters in DCM 619</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>Vc + ˆvc</span></span>
<span class="line"><span>Vc</span></span>
<span class="line"><span>iL + ˆiL</span></span>
<span class="line"><span>iL</span></span>
<span class="line"><span>m1 m2</span></span>
<span class="line"><span>ˆdTs</span></span>
<span class="line"><span>(m1 + m2) ˆdTs</span></span>
<span class="line"><span>D2Ts</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>(d)</span></span>
<span class="line"><span>(e)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Fig. 15.33 Steady-state and small-signal perturbed waveforms in a DCM converter</span></span>
<span class="line"><span>gate-drive signal. As shown in Fig. 15.33e, the inductor current ac perturbation is a trapezoidal</span></span>
<span class="line"><span>pulse starting at the modulated edge of the gate-drive signal and extending over a time interval</span></span>
<span class="line"><span>approximately equal to D2Ts.</span></span>
<span class="line"><span>(m1 + m2) ˆdTs</span></span>
<span class="line"><span>D2Ts</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆdTsd (t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Fig. 15.34 Impulse response of the small-signal perturbed inductor current waveforms in a DCM con-</span></span>
<span class="line"><span>verter</span></span>
<span class="line"><span>In the small-signal limit, ˆdTs is very short, and the transitions inˆiL can be neglected. Hence,</span></span>
<span class="line"><span>as illustrated in Fig.15.34, the response from the perturbation in the gate-drive waveform to the</span></span>
<span class="line"><span>inductor current perturbation can be viewed as a response from an impulse ˆdTsδ(t) to a pulse of</span></span>
<span class="line"><span>amplitude (m1+ m2) ˆdTs and length D2Ts. It should be noted that the unit impulse δ(t) occurs</span></span>
<span class="line"><span>at the modulated edge of the gate-drive waveform. The impulse represents the small-signal</span></span>
<span class="line"><span>sampling process that occurs at the modulated edge in the pulse-width modulator.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>620 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>We are now in a position to explain the nature of the high-frequency dynamics of DCM</span></span>
<span class="line"><span>converters in frequency domain. Let us derive a control-to-inductor current transfer function</span></span>
<span class="line"><span>Gic(s)= ˆiL/ˆvc based on the time-domain waveforms shown in Figs. 15.33 and 15.34.I nt h e</span></span>
<span class="line"><span>derivations, a sampled variable x is denoted by a star, x∗.</span></span>
<span class="line"><span>In general, given a small-signal perturbation ˆvc(t), the corresponding duty-cycle perturbation</span></span>
<span class="line"><span>is a sampled variable</span></span>
<span class="line"><span>ˆd∗(t)= ˆvc(t)</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>k→+∞∑</span></span>
<span class="line"><span>k→−∞</span></span>
<span class="line"><span>δ(t−kTs) (15.85)</span></span>
<span class="line"><span>The Laplace transform of Eq. (15.85) yields</span></span>
<span class="line"><span>ˆd∗(s)= 1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>k→+∞∑</span></span>
<span class="line"><span>k→−∞</span></span>
<span class="line"><span>ˆvc(s−jkωs) (15.86)</span></span>
<span class="line"><span>whereωs = 2πfs. In time domain, the impulse response of the inductor current perturbation is</span></span>
<span class="line"><span>shown in Fig. 15.34,</span></span>
<span class="line"><span>ˆiL= (m1+ m2) ˆdTs (h(t)−h(t−D2Ts)) (15.87)</span></span>
<span class="line"><span>where h(t) is the unit step function. The small-signal inductor current response resembles the</span></span>
<span class="line"><span>response of a sample-and-hold to an impulse, i.e., a translation from a sampled variable to</span></span>
<span class="line"><span>a continuous-time variable. Given the sampled nature of the duty-cycle perturbation, and the</span></span>
<span class="line"><span>continuous-time nature of the converter states, it is appropriate to refer to the response in</span></span>
<span class="line"><span>Eq. (15.87)a sa n equivalent hold [77].</span></span>
<span class="line"><span>The Laplace transform of the impulse response in Eq. (15.87) can be used to ﬁnd the transfer</span></span>
<span class="line"><span>function of the equivalent hold for the inductor current perturbation:</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>⎦ˆi</span></span>
<span class="line"><span>L(t)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>= (m1+ m2) ˆdTs</span></span>
<span class="line"><span>1−e−sD2Ts</span></span>
<span class="line"><span>s (15.88)</span></span>
<span class="line"><span>From (15.86) and (15.88), it follows that</span></span>
<span class="line"><span>ˆi∗</span></span>
<span class="line"><span>L(s)= (m1+ m2)Ts</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>1−e−sD2Ts</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>k→+∞∑</span></span>
<span class="line"><span>k→−∞</span></span>
<span class="line"><span>ˆvc(s−jkωs) (15.89)</span></span>
<span class="line"><span>Given the sampled-data nature of a pulse-width modulated converter, it is not surprising that</span></span>
<span class="line"><span>the inductor current spectrum consists of an inﬁnite sum of responses to the images of ˆ vc(s).</span></span>
<span class="line"><span>Since we are interested only in the converter responses at frequencies well below the switching</span></span>
<span class="line"><span>frequency, a control-to-inductor current &quot;transfer function&quot; can be obtained by retaining only</span></span>
<span class="line"><span>the low-frequency (k= 0) portion of the spectrum of ˆiL(s),</span></span>
<span class="line"><span>Gic(s)=</span></span>
<span class="line"><span>ˆiL</span></span>
<span class="line"><span>ˆvc</span></span>
<span class="line"><span>= (m1+ m2)</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>1−e−sD2Ts</span></span>
<span class="line"><span>s (15.90)</span></span>
<span class="line"><span>Note that the transfer function ( 15.90) is not a standard rational function of s. Instead, the</span></span>
<span class="line"><span>transfer function contains an e−sDTs term, which is a result of the sampling process and the</span></span>
<span class="line"><span>equivalent hold response illustrated in Fig. 15.34.F r o mE q .(15.90), an approximate rational</span></span>
<span class="line"><span>transfer function can be obtained using an approximation known as the Padé approximation</span></span>
<span class="line"><span>[138]. The ﬁrst-order Padé approximation is given by:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.5 High-Frequency Dynamics of Converters in DCM 621</span></span>
<span class="line"><span>e−sD2Ts ≈</span></span>
<span class="line"><span>1−s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>, (15.91)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>f2=ω2</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>πD2Ts</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>π. (15.92)</span></span>
<span class="line"><span>Applying (15.91)t o( 15.90) yields an approximate control-to-inductor current transfer function,</span></span>
<span class="line"><span>including high-frequency dynamics,</span></span>
<span class="line"><span>Gic(s)≈(m1+ m2)D2Ts</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>(15.93)</span></span>
<span class="line"><span>where the pole frequency is given by Eq. (15.92). This expression for the high-frequency pole is</span></span>
<span class="line"><span>general, valid for all basic converters operating in DCM. Since 0&lt; D2&lt; 1, Eq. (15.92) implies</span></span>
<span class="line"><span>that the high-frequency pole is always greater than approximately one third of the switching</span></span>
<span class="line"><span>frequency. Taking the steady-state solution forD2 into account, the pole frequency can be found</span></span>
<span class="line"><span>in terms of the conversion ratio M and the duty cycle D. For the basic converters, the results are</span></span>
<span class="line"><span>summarized in Table 15.4. Although the derivation in this section has been focused on Gic(s)</span></span>
<span class="line"><span>only, the same high-frequency pole can be found in all other DCM converter transfer functions.</span></span>
<span class="line"><span>Table 15.4 High-frequency pole in DCM converter control-to-output transfer functions</span></span>
<span class="line"><span>Converter High-frequency pole f2</span></span>
<span class="line"><span>Buck M</span></span>
<span class="line"><span>D(1−M)</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>Boost M−1</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>Buck–boost |M|</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>It is important to reiterate that the high-frequency pole in frequency responses is an ap-</span></span>
<span class="line"><span>proximation to the responses represented by the converter time-domain dynamics illustrated</span></span>
<span class="line"><span>in Fig. 15.34. In response to a duty-cycle perturbation, the inductor current perturbation is a</span></span>
<span class="line"><span>pulse of length D2Ts. The longer the equivalent hold pulse, the longer time delay is between</span></span>
<span class="line"><span>the duty-cycle perturbation and the perturbations in converter waveforms. In frequency domain,</span></span>
<span class="line"><span>this corresponds to additional phase lag due to a lower frequency f2 in the converter control-to-</span></span>
<span class="line"><span>output responses. Since the equivalent hold extends over a fraction of a switching period, the</span></span>
<span class="line"><span>resulting pole f2 is very high, and the additional phase lag can usually be ignored in practice.</span></span>
<span class="line"><span>The behavior discussed in Sect.8.2.3, leading to the right half-plane zero in frequency responses</span></span>
<span class="line"><span>of boost or buck–boost CCM converters, is present in DCM converters as well. An increase in</span></span>
<span class="line"><span>duty cycle, for example, results in the output voltage temporarily moving in the opposite direc-</span></span>
<span class="line"><span>tion. However, in DCM converters this opposite-direction transient is also limited to a fraction</span></span>
<span class="line"><span>of a switching period and has essentially no impact on the design or stability of control loops</span></span>
<span class="line"><span>around DCM converters.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>622 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>15.6 Summary of Key Points</span></span>
<span class="line"><span>1. In the discontinuous conduction mode, the average transistor voltage and current are pro-</span></span>
<span class="line"><span>portional, and hence obey Ohm’s law. An averaged equivalent circuit can be obtained by re-</span></span>
<span class="line"><span>placing the transistor with an eﬀective resistor R</span></span>
<span class="line"><span>e(d). The average diode voltage and current</span></span>
<span class="line"><span>obey a power source characteristic, with power equal to the power eﬀectively dissipated by</span></span>
<span class="line"><span>Re. In the averaged equivalent circuit, the diode is replaced with a dependent power source.</span></span>
<span class="line"><span>2. The two-port lossless network consisting of an e ﬀective resistor and power source, which</span></span>
<span class="line"><span>results from averaging the transistor and diode waveforms of DCM converters, is called</span></span>
<span class="line"><span>a loss-free resistor. This network models the basic power-processing functions of DCM</span></span>
<span class="line"><span>converters, much in the same way that the ideal dc transformer models the basic functions</span></span>
<span class="line"><span>of CCM converters.</span></span>
<span class="line"><span>3. The large-signal averaged model can be solved under equilibrium conditions to determine</span></span>
<span class="line"><span>the quiescent values of the converter currents and voltages. Average power arguments can</span></span>
<span class="line"><span>often be used.</span></span>
<span class="line"><span>4. A small-signal ac model for the DCM switch network can be derived by perturbing and</span></span>
<span class="line"><span>linearizing the loss-free resistor network. The result has the form of a two-porty-parameter</span></span>
<span class="line"><span>model. The model describes the small-signal variations in the transistor and diode currents,</span></span>
<span class="line"><span>as functions of variations in the duty cycle and in the transistor and diode ac voltage varia-</span></span>
<span class="line"><span>tions.</span></span>
<span class="line"><span>5. To simplify the ac analysis of the DCM buck and boost converters, it is convenient to deﬁne</span></span>
<span class="line"><span>two other forms of the small-signal switch model, corresponding to the switch networks</span></span>
<span class="line"><span>of Figs. 15.21a and 15.21b. These models are also y-parameter two-port models, but have</span></span>
<span class="line"><span>diﬀerent parameter values.</span></span>
<span class="line"><span>6. The inductor dynamics of the DCM buck, boost, and buck–boost converters occur at high</span></span>
<span class="line"><span>frequency, above or just below the switching frequency. Hence, in most cases the high-</span></span>
<span class="line"><span>frequency inductor dynamics can be ignored. In the small-signal ac model, the inductance</span></span>
<span class="line"><span>L is set to zero, and the remaining model is solved relatively easily for the low-frequency</span></span>
<span class="line"><span>converter dynamics. The DCM buck, boost, and buck–boost converters exhibit transfer func-</span></span>
<span class="line"><span>tions containing essentially a single low-frequency dominant pole.</span></span>
<span class="line"><span>7. The high-frequency dynamics of DCM converters are related to the sampling process asso-</span></span>
<span class="line"><span>ciated with the pulse-width modulator and the nature of the response of the inductor current</span></span>
<span class="line"><span>to duty-cycle perturbations.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>15.1 Averaged switch modeling of a ﬂyback converter. The converter of Fig.15.35 operates in</span></span>
<span class="line"><span>the discontinuous conduction mode. The two-winding inductor has a l: n turns ratio and</span></span>
<span class="line"><span>negligible leakage inductance, and can be modeled as an ideal transformer in parallel with</span></span>
<span class="line"><span>primary-side magnetizing inductance Lp.</span></span>
<span class="line"><span>(a) Sketch the transistor and diode voltage and current waveforms, and derive expressions</span></span>
<span class="line"><span>for their average values.</span></span>
<span class="line"><span>(b) Sketch an averaged model for the converter that includes a loss-free resistor network,</span></span>
<span class="line"><span>and give an expression for Re(d).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>15.6 Summary of Key Points 623</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Lp</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>vg</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D11:n</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>Fig. 15.35 Flyback converter, Problem 15.1</span></span>
<span class="line"><span>(c) Solve your model to determine the voltage ratio V/Vg in the discontinuous conduction</span></span>
<span class="line"><span>mode.</span></span>
<span class="line"><span>(d) Over what range of load current I is your answer of part (c) valid? Express the DCM</span></span>
<span class="line"><span>boundary in the form I&lt; Icirt(D, Re, Vg, n).</span></span>
<span class="line"><span>(e) Derive an expression for the small-signal control-to-output transfer function G vd(s).</span></span>
<span class="line"><span>You may neglect inductor dynamics.</span></span>
<span class="line"><span>15.2 Averaged switch modeling of a nonisolated Watkins–Johnson converter. The converter</span></span>
<span class="line"><span>of Fig. 15.36 operates in the discontinuous conduction mode. The two-winding inductor</span></span>
<span class="line"><span>has a 1:1 turns ratio and negligible leakage inductance, and can be modeled as an ideal</span></span>
<span class="line"><span>transformer in parallel with magnetizing inductance L.</span></span>
<span class="line"><span>+ L</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vvg</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>1:1</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>Fig. 15.36 Watkins–Johnson converter, Problem15.2</span></span>
<span class="line"><span>(a) Sketch the transistor and diode voltage and current waveforms, and derive expressions</span></span>
<span class="line"><span>for their average values.</span></span>
<span class="line"><span>(b) Sketch an averaged model for the converter that includes a loss-free resistor network,</span></span>
<span class="line"><span>and give an expression for Re(d).</span></span>
<span class="line"><span>(c) Solve your model to determine the converter conversion ratio M(D)= V/Vg in the</span></span>
<span class="line"><span>discontinuous conduction mode. Over what range of load currents is your expression</span></span>
<span class="line"><span>valid?</span></span>
<span class="line"><span>15.3 Sketch the steady-state output characteristics of the buck–boost converter: plot the output</span></span>
<span class="line"><span>voltage V vs. the load current I, for several values of duty cycleD. Include both CCM and</span></span>
<span class="line"><span>DCM operation, and clearly label the boundary between modes.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>624 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode</span></span>
<span class="line"><span>15.4 In the network of Fig. 15.37, the power source waveform p(t)i sg i v e nb y</span></span>
<span class="line"><span>p(t)= 1000 cos2 377t</span></span>
<span class="line"><span>The circuit operates in steady state. Determine the rms resistor voltage VR,rms.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vR(t)p(t) R</span></span>
<span class="line"><span>20 </span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>7 mH</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>7 mH</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>30 μF</span></span>
<span class="line"><span>300 μF</span></span>
<span class="line"><span>Fig. 15.37 Network with a power source, Problem 15.4</span></span>
<span class="line"><span>15.5 Verify the expressions forGd0 andωp given in Table15.3.</span></span>
<span class="line"><span>15.6 A certain buck converter operates with an input voltage of Vg = 28 V and an output</span></span>
<span class="line"><span>voltage of V= 15 V . The load resistance isR= 10Ω. Other element and parameter values</span></span>
<span class="line"><span>are L= 8μH, C= 220μF, fs= 150kHz.</span></span>
<span class="line"><span>(a) Determine the value of Re.</span></span>
<span class="line"><span>(b) Determine the quiescent duty cycle D.</span></span>
<span class="line"><span>(c) Sketch a Bode plot of the control-to-output transfer function Gvd(s). Label the values</span></span>
<span class="line"><span>of all salient features. You may neglect inductor dynamics.</span></span>
<span class="line"><span>15.7 Using the approach of Sect. 15.5, determine the control-to-output transfer function Gvd(s)</span></span>
<span class="line"><span>of a boost converter. Do not make the approximation L≈0.</span></span>
<span class="line"><span>(a) Derive analytical expressions for the dc gain Gd0 and the RHP zero frequency ωz,a s</span></span>
<span class="line"><span>functions of M, Re, D, Vg, L, C, and R.</span></span>
<span class="line"><span>(b) With the assumption that C is suﬃciently large and that L is suﬃciently small, the</span></span>
<span class="line"><span>poles of Gvd(s) can be factored using the low- Q approximation. Do so, and express</span></span>
<span class="line"><span>the two poles as functions of M, D, L, C, and R. Show that the low-frequency pole</span></span>
<span class="line"><span>matches the expression in Table15.3, and that the high-frequency pole is given by the</span></span>
<span class="line"><span>expression in Table15.4.</span></span></code></pre></div>`,10)])])}const m=s(l,[["render",i]]);export{u as __pageData,m as default};
