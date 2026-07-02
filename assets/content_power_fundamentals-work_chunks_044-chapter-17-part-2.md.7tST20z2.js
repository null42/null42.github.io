import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第17章part 2 - 17 Input Filter Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第17章part 2 - 17 Input Filter Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 698-717 > Chunk ID: `chapter-17-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/044-chapter-17-part-2.md","filePath":"content/power/fundamentals-work/chunks/044-chapter-17-part-2.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/044-chapter-17-part-2.md"};function i(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第17章part-2-17-input-filter-design" tabindex="-1">第17章part 2 - 17 Input Filter Design <a class="header-anchor" href="#第17章part-2-17-input-filter-design" aria-label="Permalink to &quot;第17章part 2 - 17 Input Filter Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 698-717<br> Chunk ID: <code>chapter-17-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>17.4 Design of a Damped Input Filter 695</span></span>
<span class="line"><span>-30 dB</span></span>
<span class="line"><span>-20 dB</span></span>
<span class="line"><span>-10 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>10 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>30 dB</span></span>
<span class="line"><span>0111.0</span></span>
<span class="line"><span>Original undamped</span></span>
<span class="line"><span>filter (Qf = )</span></span>
<span class="line"><span>Undamped</span></span>
<span class="line"><span>filter (Qf = 0)</span></span>
<span class="line"><span>Optimal damping</span></span>
<span class="line"><span>(Qopt = 0.93)</span></span>
<span class="line"><span>Suboptimal damping</span></span>
<span class="line"><span>(Qf = 0.2Qopt )</span></span>
<span class="line"><span>Suboptimal damping</span></span>
<span class="line"><span>(Qf = 5Qopt )</span></span>
<span class="line"><span>Zo</span></span>
<span class="line"><span>R0 f</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>fo</span></span>
<span class="line"><span>Fig. 17.24 Comparison of output impedance curves for optimal parallel Rf –Lb damping with undamped</span></span>
<span class="line"><span>and several suboptimal designs. For this example, n= Lb/L= 0.516</span></span>
<span class="line"><span>For this ﬁlter, let us deﬁne the quantity n as the ratio of the blocking capacitance Cb to the</span></span>
<span class="line"><span>ﬁlter capacitance C f :</span></span>
<span class="line"><span>n= Cb</span></span>
<span class="line"><span>C f</span></span>
<span class="line"><span>(17.33)</span></span>
<span class="line"><span>For the optimum design, the peak ﬁlter output impedance occurs at the frequency</span></span>
<span class="line"><span>fm= ff</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>2+ n (17.34)</span></span>
<span class="line"><span>The value of the peak output impedance for the optimum design is</span></span>
<span class="line"><span>∥Zo∥mm= R0 f</span></span>
<span class="line"><span>√2(2+ n)</span></span>
<span class="line"><span>n (17.35)</span></span>
<span class="line"><span>The value of damping resistance that leads to optimum damping is described by</span></span>
<span class="line"><span>Qopt = Rf</span></span>
<span class="line"><span>R0 f</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>(2+ n)(4+ 3n)</span></span>
<span class="line"><span>2n2(4+ n) (17.36)</span></span>
<span class="line"><span>The above equations allow choice of the damping values Rf and Cb.</span></span>
<span class="line"><span>For example, let us redesign the damping network of Sect. 17.3.2, to achieve the same peak</span></span>
<span class="line"><span>output impedance∥Zo( jω)∥mm = 1Ω, while minimizing the value of the blocking capacitance</span></span>
<span class="line"><span>Cb. From Sect. 17.3.2, the other parameter values are R0 f = 0.84Ω, C f = 470μF, and Lf =</span></span>
<span class="line"><span>330μH. First, we solve Eq. (17.35) to ﬁnd the required value of n:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>696 17 Input Filter Design</span></span>
<span class="line"><span>zHk01zHk1zH001</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| Zo ||</span></span>
<span class="line"><span>10 dB</span></span>
<span class="line"><span>Undamped</span></span>
<span class="line"><span>Optimal</span></span>
<span class="line"><span>damping</span></span>
<span class="line"><span>Cb = 1200 ∀F</span></span>
<span class="line"><span>Rf = 0.67 </span></span>
<span class="line"><span>Suboptimal</span></span>
<span class="line"><span>damping</span></span>
<span class="line"><span>Cb = 4700 ∀F</span></span>
<span class="line"><span>Rf = 1 </span></span>
<span class="line"><span>Fig. 17.25 Comparison of the output impedances of the design with optimum parallel Rf –Cb damping,</span></span>
<span class="line"><span>the suboptimal design of Sect. 17.3.2, and the original undamped ﬁlter</span></span>
<span class="line"><span>n=</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>0 f</span></span>
<span class="line"><span>∥Zo∥2mm</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜</span></span>
<span class="line"><span>⎜⎝1+</span></span>
<span class="line"><span>√1+ 4∥Zo∥2mm</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>0 f</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟</span></span>
<span class="line"><span>⎟⎠ (17.37)</span></span>
<span class="line"><span>Evaluation of this expression with the given numerical values leads to n= 2.5. The blocking</span></span>
<span class="line"><span>capacitor is therefore required to have a value of nC</span></span>
<span class="line"><span>f = 1200μF. This is one-quarter of the</span></span>
<span class="line"><span>value employed in Sect. 17.3.2.T h ev a l u eo fRf is then found by evaluation of Eq. ( 17.36),</span></span>
<span class="line"><span>leading to</span></span>
<span class="line"><span>Rf = R0 f</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>(2+ n)(4+ 3n)</span></span>
<span class="line"><span>2n2(4+ n) = 0.67Ω (17.38)</span></span>
<span class="line"><span>The output impedance of this ﬁlter design is compared with the output impedances of the orig-</span></span>
<span class="line"><span>inal undamped ﬁlter of Sect. 17.3.1, and of the suboptimal design of Sect. 17.3.2,i nF i g .17.25.</span></span>
<span class="line"><span>It can be seen that the optimally damped ﬁlter does indeed achieve the desired peak output</span></span>
<span class="line"><span>impedance of 1Ω, at the slightly lower peak frequency given by Eq. (17.34)</span></span>
<span class="line"><span>The Rf –Cb parallel damping approach ﬁnds signiﬁcant application in dc–dc converters.</span></span>
<span class="line"><span>Since a series resistor is placed in series with Cb, Cb can be realized using capacitor types</span></span>
<span class="line"><span>having substantial equivalent series resistance, such as electrolytic and tantalum types. How-</span></span>
<span class="line"><span>ever, in some applications, the Rf –Lb approaches of the next subsections can lead to smaller</span></span>
<span class="line"><span>designs. Also, the large blocking capacitor value may be undesirable in applications having an</span></span>
<span class="line"><span>ac input.</span></span>
<span class="line"><span>17.4.2 Rf –Lb Parallel Damping</span></span>
<span class="line"><span>Figure 17.23b illustrates the placement of damping resistor Rf in parallel with inductor Lf .I n -</span></span>
<span class="line"><span>ductor Lb causes the ﬁlter to exhibit a two-pole attenuation characteristic at high frequency. To</span></span>
<span class="line"><span>allow Rf to damp the ﬁlter, inductor Lb should have an impedance magnitude that is suﬃciently</span></span>
<span class="line"><span>smaller than Rf at the ﬁlter resonant frequency ff . Optimization of this damping network is</span></span>
<span class="line"><span>described in [158].</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.4 Design of a Damped Input Filter 697</span></span>
<span class="line"><span>With this approach, inductor Lb can be physically much smaller than Lf . Since Rf is typi-</span></span>
<span class="line"><span>cally much greater than the dc resistance of Lf , essentially none of the dc current ﬂows through</span></span>
<span class="line"><span>Lb. Furthermore, Rf could be realized as the equivalent series resistance of Lb at the ﬁlter reso-</span></span>
<span class="line"><span>nant frequency ff . Hence, this is a very simple, low-cost approach to damping the input ﬁlter.</span></span>
<span class="line"><span>The disadvantage of this approach is the fact that the high-frequency attenuation of the</span></span>
<span class="line"><span>ﬁlter is degraded: the high-frequency asymptote of the ﬁlter transfer function is increased from</span></span>
<span class="line"><span>1/ω2Lf C f to 1/ω2(Lf||Lb)C f . Furthermore, since the need for damping limits the maximum</span></span>
<span class="line"><span>value of Lb, signiﬁcant loss of high-frequency attenuation is unavoidable. To compensate, the</span></span>
<span class="line"><span>value of Lf must be increased. Therefore, a tradeoﬀoccurs between damping and degradation</span></span>
<span class="line"><span>of high-frequency attenuation, as illustrated in Fig.17.26. For example, limiting the degradation</span></span>
<span class="line"><span>of high-frequency attenuation to 6 dB leads to an optimum peak ﬁlter output impedance||Zo||mm</span></span>
<span class="line"><span>of</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>6 times the original characteristic impedance R0 f . Additional damping leads to further</span></span>
<span class="line"><span>degradation of the high-frequency attenuation.</span></span>
<span class="line"><span>The optimally damped design (i.e., the choice of Rf that minimizes the peak output</span></span>
<span class="line"><span>impedance∥Zo∥ for a given choice of Lb) is described by the following equations:</span></span>
<span class="line"><span>Qopt = Rf</span></span>
<span class="line"><span>R0 f</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>n(3+ 4n)(1+ 2n)</span></span>
<span class="line"><span>2(1+ 4n) (17.39)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>n= Lb</span></span>
<span class="line"><span>Lf</span></span>
<span class="line"><span>(17.40)</span></span>
<span class="line"><span>The peak ﬁlter output impedance occurs at frequency</span></span>
<span class="line"><span>fm= ff</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 2n</span></span>
<span class="line"><span>2n (17.41)</span></span>
<span class="line"><span>Fig. 17.26</span></span>
<span class="line"><span>Performance attained</span></span>
<span class="line"><span>via optimal design procedure, par-</span></span>
<span class="line"><span>allel Rf –Lb circuit of Fig. 17.23b.</span></span>
<span class="line"><span>Optimum peak ﬁlter output</span></span>
<span class="line"><span>impedance ∥Zo∥mm and increase</span></span>
<span class="line"><span>of ﬁlter high-frequency gain, vs.</span></span>
<span class="line"><span>n= L</span></span>
<span class="line"><span>b/L 0 dB</span></span>
<span class="line"><span>10 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>30 dB</span></span>
<span class="line"><span>0.1 1 10</span></span>
<span class="line"><span>Degradation of HF</span></span>
<span class="line"><span>filter attenuation</span></span>
<span class="line"><span>Lb</span></span>
<span class="line"><span>L f</span></span>
<span class="line"><span>Zo mm</span></span>
<span class="line"><span>R0 f</span></span>
<span class="line"><span></span></span>
<span class="line"><span>698 17 Input Filter Design</span></span>
<span class="line"><span>and has the value </span></span>
<span class="line"><span> Z</span></span>
<span class="line"><span>o</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>mm</span></span>
<span class="line"><span>= R0 f</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2n(1+ 2n) (17.42)</span></span>
<span class="line"><span>The attenuation of the ﬁlter high-frequency asymptote is degraded by the factor</span></span>
<span class="line"><span>Lf</span></span>
<span class="line"><span>Lf</span></span>
<span class="line"><span>Lb</span></span>
<span class="line"><span>= 1+ 1</span></span>
<span class="line"><span>n (17.43)</span></span>
<span class="line"><span>So, given an undamped Lf –C f ﬁlter having corner frequency ff , and characteristic impedance</span></span>
<span class="line"><span>R0 f , and given a requirement for the maximum allowable output impedance ||Zo||mm, one can</span></span>
<span class="line"><span>solve Eq. ( 17.42) for the required value of n. One can then determine the required numerical</span></span>
<span class="line"><span>values of Lb and Rf .</span></span>
<span class="line"><span>17.4.3 Rf –Lb Series Damping</span></span>
<span class="line"><span>Figure 17.23c illustrates the placement of damping resistor Rf in series with inductor Lf . Induc-</span></span>
<span class="line"><span>tor Lb provides a dc bypass to avoid signiﬁcant power dissipation in Rf . To allow Rf to damp</span></span>
<span class="line"><span>the ﬁlter, inductor Lb should have an impedance magnitude that is suﬃciently greater than Rf</span></span>
<span class="line"><span>at the ﬁlter resonant frequency.</span></span>
<span class="line"><span>Although this circuit is theoretically equivalent to the parallel damping Rf –Lb case of</span></span>
<span class="line"><span>Sect. 17.4.2, several diﬀerences are observed in practical designs. Both inductors must carry</span></span>
<span class="line"><span>the full dc current, and hence both have signiﬁcant size. The ﬁlter high-frequency attenuation</span></span>
<span class="line"><span>is not aﬀected by the choice of Lb, and the high-frequency asymptote is identical to that of the</span></span>
<span class="line"><span>original undamped ﬁlter. The tradeoﬀin design of this ﬁlter does not involve high-frequency</span></span>
<span class="line"><span>attenuation; rather, the issue is damping vs. bypass inductor size.</span></span>
<span class="line"><span>Design equations similar to those of the previous sections can be derived for this case. The</span></span>
<span class="line"><span>optimum peak ﬁlter output impedance occurs at frequency</span></span>
<span class="line"><span>fm= ff</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2+ n</span></span>
<span class="line"><span>2(1+ n) (17.44)</span></span>
<span class="line"><span>and has the value</span></span>
<span class="line"><span>∥Zo∥mm= R0 f</span></span>
<span class="line"><span>√2(1+ n)(2+ n)</span></span>
<span class="line"><span>n (17.45)</span></span>
<span class="line"><span>The value of damping resistance that leads to optimum damping is described by</span></span>
<span class="line"><span>Qopt = R0 f</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>⎦1+ n</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>) √</span></span>
<span class="line"><span>2(1+ n)(4+ n)</span></span>
<span class="line"><span>(2+ n)(4+ 3n) (17.46)</span></span>
<span class="line"><span>For this case, the peak output impedance cannot be reduced below</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2 R0 f via damping.</span></span>
<span class="line"><span>Nonetheless, it is possible to further reduce the ﬁlter output impedance by redesign of Lf and</span></span>
<span class="line"><span>C f , to reduce the value of R0 f .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.4 Design of a Damped Input Filter 699</span></span>
<span class="line"><span>17.4.4 Cascading Filter Sections</span></span>
<span class="line"><span>A cascade connection of multiple L–C ﬁlter sections can achieve a given high-frequency at-</span></span>
<span class="line"><span>tenuation with less volume and weight than a single-section L–C ﬁlter. The increased cutoﬀ</span></span>
<span class="line"><span>frequency of the multiple-section ﬁlter allows use of smaller inductance and capacitance values.</span></span>
<span class="line"><span>Damping of each L–C section is usually required, which implies that damping of each section</span></span>
<span class="line"><span>should be optimized. Unfortunately, the results of the previous sections are restricted to single-</span></span>
<span class="line"><span>section ﬁlters. Interactions between cascaded L–C sections can lead to additional resonances</span></span>
<span class="line"><span>and increased ﬁlter output impedance.</span></span>
<span class="line"><span>It is nonetheless possible to design cascaded ﬁlter sections such that interaction between L–</span></span>
<span class="line"><span>C sections is negligible. In the approach described below, the ﬁlter output impedance is approxi-</span></span>
<span class="line"><span>mately equal to the output impedance of the last section, and resonances caused by interactions</span></span>
<span class="line"><span>between stages are avoided. Although the resulting ﬁlter may not be “optimal” in any sense,</span></span>
<span class="line"><span>insight can be gained that allows intelligent design of multiple-section ﬁlters with economical</span></span>
<span class="line"><span>damping of each section.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Existing</span></span>
<span class="line"><span>filter</span></span>
<span class="line"><span>Additional</span></span>
<span class="line"><span>filter</span></span>
<span class="line"><span>section</span></span>
<span class="line"><span>ZoZa itestvg</span></span>
<span class="line"><span>Zi1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vtest</span></span>
<span class="line"><span>Fig. 17.27 Addition of a ﬁlter section at the input of an existing ﬁlter</span></span>
<span class="line"><span>Consider the addition of a ﬁlter section to the input of an existing ﬁlter, as in Fig. 17.27.</span></span>
<span class="line"><span>Let us assume that the existing ﬁlter has been correctly designed to meet the output impedance</span></span>
<span class="line"><span>design criteria of Eq. (17.19): under the conditions Za(s)= 0 and ˆvg(s)= 0,∥Zo∥ is suﬃciently</span></span>
<span class="line"><span>small. It is desired to add a damped ﬁlter section that does not signiﬁcantly increase∥Zo∥.</span></span>
<span class="line"><span>Middlebrook’s Extra Element Theorem of Sect. 16.1 can again be invoked, to express how</span></span>
<span class="line"><span>addition of the ﬁlter section modiﬁes Zo(s):</span></span>
<span class="line"><span>Zo(s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Zo(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>Za(s)=0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Za(s)</span></span>
<span class="line"><span>ZN1(s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Za(s)</span></span>
<span class="line"><span>ZD1(s)</span></span>
<span class="line"><span>) (17.47)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>ZN1(s)= Zi1(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐ˆvtest (s)→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(17.48)</span></span>
<span class="line"><span>is the impedance at the input port of the existing ﬁlter, with its output port short-circuited. Note</span></span>
<span class="line"><span>that, in this particular case, nulling ˆvtest (s) is the same as shorting the ﬁlter output port because</span></span>
<span class="line"><span>the short-circuit current ﬂows through the ˆitest source. The quantity</span></span>
<span class="line"><span>ZD1(s)= Zi1(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐ˆitest (s)=0</span></span>
<span class="line"><span>(17.49)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>700 17 Input Filter Design</span></span>
<span class="line"><span>is the impedance at the input port of the existing ﬁlter, with its output port open-circuited. Hence,</span></span>
<span class="line"><span>the additional ﬁlter section does not signiﬁcantly alter Zo provided that</span></span>
<span class="line"><span>∥Za∥≪∥ ZN1∥ and</span></span>
<span class="line"><span>∥Za∥≪∥ ZD1∥ (17.50)</span></span>
<span class="line"><span>Bode plots of the quantities ZN1 and ZD1 can be constructed either analytically or by computer</span></span>
<span class="line"><span>simulation, to obtain limits of Za. When||Za|| satisﬁes Eq. (17.50), then the “correction factor”</span></span>
<span class="line"><span>(1+ Za/ZN1)/(1+ Za/ZD1) is approximately equal to 1, and the modiﬁed Zo is approximately</span></span>
<span class="line"><span>equal to the original Zo.</span></span>
<span class="line"><span>To satisfy the design criteria ( 17.50), it is advantageous to select the resonant frequencies</span></span>
<span class="line"><span>of Za to diﬀer from the resonant frequencies of ZD1. In other words, we should stagger-tune</span></span>
<span class="line"><span>the ﬁlter sections. This minimizes the interactions between ﬁlter sections, and can allow use of</span></span>
<span class="line"><span>smaller reactive element values.</span></span>
<span class="line"><span>17.4.5 Example: Two Stage Input Filter</span></span>
<span class="line"><span>As an example, let us consider the design of a two-stage ﬁlter using Rf –Lb parallel damping in</span></span>
<span class="line"><span>each section as illustrated in Fig. 17.28 [158]. It is desired to achieve the same attenuation as</span></span>
<span class="line"><span>the single-section ﬁlters designed in Sects. 17.3.2 and 17.4.1, and to ﬁlter the input current of</span></span>
<span class="line"><span>the same buck converter example of Fig. 17.11. These ﬁlters exhibit an attenuation of 80 dB at</span></span>
<span class="line"><span>250 kHz, and satisfy the design inequalities of Eq. (17.19) with the∥ZN∥ and∥ZD∥ impedances of</span></span>
<span class="line"><span>Fig. 17.13. Hence, let us design the ﬁlter of Fig. 17.28 to attain 80 dB of attenuation at 250 kHz.</span></span>
<span class="line"><span>+vg</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>n1L1R1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>n2L2R2</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>Section 2 Section 1</span></span>
<span class="line"><span>Zo</span></span>
<span class="line"><span>Fig. 17.28 Two-section input ﬁlter example, employing Rf –Lb parallel damping in each section</span></span>
<span class="line"><span>As described in the previous section and below, it is advantageous to stagger-tune the ﬁl-</span></span>
<span class="line"><span>ter sections so that interaction between ﬁlter sections is reduced. We will ﬁnd that the cut-</span></span>
<span class="line"><span>oﬀfrequency of ﬁlter section 1 should be chosen to be smaller than the cuto ﬀfrequency of</span></span>
<span class="line"><span>section 2. In consequence, the attenuation of section 1 will be greater than that of section</span></span>
<span class="line"><span>2. Let us (somewhat arbitrarily) design to obtain 45 dB of attenuation from section 1, and</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.4 Design of a Damped Input Filter 701</span></span>
<span class="line"><span>35 dB of attenuation from section 2 (so that the total is the speciﬁed 80 dB). Let us also se-</span></span>
<span class="line"><span>lect n1= n2= n= Lb/Lf = 0.5 for each section; as illustrated in Fig.17.26, this choice leads to</span></span>
<span class="line"><span>a good compromise between damping of the ﬁlter resonance and degradation of high frequency</span></span>
<span class="line"><span>ﬁlter attenuation. Equation (17.43) and Fig. 17.26 predict that the Rf –Lb damping network will</span></span>
<span class="line"><span>degrade the high-frequency attenuation by a factor of (1+1/n)= 3, or 9.5 dB. Hence, the section</span></span>
<span class="line"><span>1 undamped resonant frequency ff 1 should be chosen to yield 45 dB+ 9.5dB= 54.5dB⇒533</span></span>
<span class="line"><span>of attenuation at 250 kHz. Since section 1 exhibits a two-pole (−40dB/decade) roll-oﬀat high</span></span>
<span class="line"><span>frequencies, ff 1 should be chosen as follows:</span></span>
<span class="line"><span>ff 1= (250 kHz)√</span></span>
<span class="line"><span>533</span></span>
<span class="line"><span>= 10.8 kHz (17.51)</span></span>
<span class="line"><span>Note that this frequency is well above the 1.6 kHz resonant frequency f0 of the buck converter</span></span>
<span class="line"><span>output ﬁlter. Consequently, the output impedance∥Zo∥ can be as large as 3Ω, and still be well</span></span>
<span class="line"><span>below the∥ZN ( jω)∥ and∥ZD( jω)∥ plots of Fig. 17.13.</span></span>
<span class="line"><span>Solution of Eq. (17.42) for the required section 1 characteristic impedance that leads to a</span></span>
<span class="line"><span>peak output impedance of 3Ωwith n= 0.5 leads to</span></span>
<span class="line"><span>R0 f 1= ∥Zo∥mm</span></span>
<span class="line"><span>√2n(1+ 2n)</span></span>
<span class="line"><span>= 3Ω√2(0.5)(1+ 2(0.5))</span></span>
<span class="line"><span>= 2.12Ω (17.52)</span></span>
<span class="line"><span>The ﬁlter inductance and capacitance values are therefore</span></span>
<span class="line"><span>L1= R0 f 1</span></span>
<span class="line"><span>2π ff 1</span></span>
<span class="line"><span>= 31.2 μH (17.53)</span></span>
<span class="line"><span>C1= 1</span></span>
<span class="line"><span>2π ff 1R0 f 1</span></span>
<span class="line"><span>= 6.9 μF</span></span>
<span class="line"><span>The section 1 damping network inductance is</span></span>
<span class="line"><span>n1L1= 15.6 μH (17.54)</span></span>
<span class="line"><span>The section 1 damping resistance is found from Eq. (17.39):</span></span>
<span class="line"><span>R1= Qopt R0 f 1= R0 f 1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>n(3+ 4n)(1+ 2n)</span></span>
<span class="line"><span>2(1+ 4n) = 1.9Ω (17.55)</span></span>
<span class="line"><span>The peak output impedance will occur at the frequency given by Eq. ( 17.41), 15.3 kHz. The</span></span>
<span class="line"><span>quantities∥ZN1( jω)∥ and∥ZD1( jω)∥ for ﬁlter section 1 can now be constructed analytically or</span></span>
<span class="line"><span>plotted by computer simulation.∥ZN1( jω)∥ is the section 1 input impedance Zi1 with the output</span></span>
<span class="line"><span>of section 1 shorted, and is given by the parallel combination of the sL1 and the (R1+ sn1L1)</span></span>
<span class="line"><span>branches.∥ZD1( jω)∥ is the section 1 input impedance Zi1 with the output of section 1 open-</span></span>
<span class="line"><span>circuited, and is given by the series combination of ZN1(s) with the capacitor impedance 1/sC1.</span></span>
<span class="line"><span>Figure 17.29 contains plots of ∥ZN1( jω)∥ and∥ZD1( jω)∥ for ﬁlter section 1, generated using</span></span>
<span class="line"><span>Spice.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>702 17 Input Filter Design</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz 1 MHz</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>45</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>|| ZN1 ||</span></span>
<span class="line"><span>|| ZD1 ||</span></span>
<span class="line"><span>ZN1</span></span>
<span class="line"><span>|| Za ||</span></span>
<span class="line"><span>Za</span></span>
<span class="line"><span>ZD1</span></span>
<span class="line"><span>Fig. 17.29 Bode plot of ZN1 and ZN2 for ﬁlter section 1. Also shown is the Bode plot for the output</span></span>
<span class="line"><span>impedance Za of ﬁlter section 2</span></span>
<span class="line"><span>One way to approach design of ﬁlter section 2 is as follows. To avoid signiﬁcantly mod-</span></span>
<span class="line"><span>ifying the overall ﬁlter output impedance Zo, the section 2 output impedance ||Za( jω)|| must</span></span>
<span class="line"><span>be suﬃciently less than ||ZN1( jω)|| and||ZD1( jω)||. It can be seen from Fig. 17.29 that, with</span></span>
<span class="line"><span>respect to∥ZD1( jω)||,t h i si sm o s td iﬃcult to accomplish when the peak frequencies of sections</span></span>
<span class="line"><span>1 and 2 coincide. It is most di ﬃcult to satisfy the ||ZN1( jω)|| design criterion when the peak</span></span>
<span class="line"><span>frequency of sections 2 is lower than the peak frequency of section 1. Therefore, the best choice</span></span>
<span class="line"><span>is to stagger-tune the ﬁlter sections, with the resonant frequency of section 1 being lower than</span></span>
<span class="line"><span>the peak frequency of section 2. This implies that section 1 will produce more high-frequency</span></span>
<span class="line"><span>attenuation than section 2. For this reason, we have chosen to achieve 45 dB of attenuation with</span></span>
<span class="line"><span>section 1, and 35 dB of attenuation from section 2.</span></span>
<span class="line"><span>The section 2 undamped resonant frequency f</span></span>
<span class="line"><span>f 2 should be chosen in the same manner used</span></span>
<span class="line"><span>in Eq. (17.51) for section 1. We have chosen to select n2 = n= Lb/Lf = 0.5 for section 2; this</span></span>
<span class="line"><span>again means that the Rf –Lb damping network will degrade the high-frequency attenuation by</span></span>
<span class="line"><span>a factor of (1 + 1/n)= 3, or 9.5 dB. Hence, the section 2 undamped resonant frequency ff 2</span></span>
<span class="line"><span>should be chosen to yield 35 dB+ 9.5d B= 44.5d B⇒169 of attenuation at 250 kHz. Since</span></span>
<span class="line"><span>section 2 exhibits a two-pole (−40 dB/decade) roll-oﬀat high frequencies, ff 2 should be chosen</span></span>
<span class="line"><span>as follows:</span></span>
<span class="line"><span>ff 2= (250 kHz)√</span></span>
<span class="line"><span>169</span></span>
<span class="line"><span>= 19.25kHz (17.56)</span></span>
<span class="line"><span>The output impedance of section 2 will peak at the frequency 27.2 kHz, as given by Eq. (17.41).</span></span>
<span class="line"><span>Hence, the peak frequencies of sections 1 and 2 diﬀer by almost a factor of 2.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.4 Design of a Damped Input Filter 703</span></span>
<span class="line"><span>Figure 17.29 shows that, at 27.2 kHz, ∥ZD1( jω)∥ has a magnitude of roughly 3 dBΩ, and</span></span>
<span class="line"><span>that∥ZN1( jω)∥ is approximately 7 dBΩ. Hence, let us design section 2 to have a peak output</span></span>
<span class="line"><span>impedance of 0 dBΩ⇒1Ω. Solution of Eq. ( 17.42) for the required section 2 characteristic</span></span>
<span class="line"><span>impedance leads to</span></span>
<span class="line"><span>R0 f 2= ∥Za∥mm</span></span>
<span class="line"><span>√2n(1+ 2n)</span></span>
<span class="line"><span>= 1Ω√2(0.5)(1+ 2(0.5))</span></span>
<span class="line"><span>= 0.71Ω (17.57)</span></span>
<span class="line"><span>The section 2 element values are therefore</span></span>
<span class="line"><span>L2= R0 f 2</span></span>
<span class="line"><span>2πff 2</span></span>
<span class="line"><span>= 5.8 μH</span></span>
<span class="line"><span>C2= 1</span></span>
<span class="line"><span>2π ff 2R0 f 2</span></span>
<span class="line"><span>= 11.7 μF (17.58)</span></span>
<span class="line"><span>n2L2= 2.9 μH</span></span>
<span class="line"><span>R2= Qopt R0 f 2= R0 f 2</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>n(3+ 4n)(1+ 2n)</span></span>
<span class="line"><span>2(1+ 4n) = 0.65Ω</span></span>
<span class="line"><span>A Bode plot of the resulting Za is overlaid on Fig. 17.29. It can be seen that ∥Za( jω)∥ is less</span></span>
<span class="line"><span>than, but very close to, ∥ZD1( jω)∥ between the peak frequencies of 15 kHz and 27 kHz. The</span></span>
<span class="line"><span>impedance inequalities ( 17.50) are satisﬁed somewhat better below 15 kHz, and are satisﬁed</span></span>
<span class="line"><span>very well at high frequency.</span></span>
<span class="line"><span>The resulting ﬁlter output impedance∥Zo( jω)∥ is plotted in Fig. 17.30, for section 1 alone</span></span>
<span class="line"><span>and for the complete cascaded two-section ﬁlter. It can be seen that the peak output impedance</span></span>
<span class="line"><span>-20 dB</span></span>
<span class="line"><span>-10 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>10 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>zHk001zHk01zHk1</span></span>
<span class="line"><span>Section 1</span></span>
<span class="line"><span>alone</span></span>
<span class="line"><span>Cascaded</span></span>
<span class="line"><span>sections 1 and 2</span></span>
<span class="line"><span>30 dB</span></span>
<span class="line"><span>|| ZN ||</span></span>
<span class="line"><span>|| ZD ||</span></span>
<span class="line"><span>fo</span></span>
<span class="line"><span>Fig. 17.30 Comparison of the impedance design criteria ∥ZN ( jω)∥ and∥ZD( jω)∥,E q . (17.19), with the</span></span>
<span class="line"><span>ﬁlter output impedance∥Zo( jω)∥. Solid line:∥Zo( jω)∥ of cascaded design.Dashed line:∥Zo( jω)∥ of section</span></span>
<span class="line"><span>1 alone</span></span>
<span class="line"><span></span></span>
<span class="line"><span>704 17 Input Filter Design</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz 1 MHz</span></span>
<span class="line"><span>-120 dB</span></span>
<span class="line"><span>-100 dB</span></span>
<span class="line"><span>-80 dB</span></span>
<span class="line"><span>-60 dB</span></span>
<span class="line"><span>-40 dB</span></span>
<span class="line"><span>-20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>|| H ||</span></span>
<span class="line"><span>at 250 kHz</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>Fig. 17.31 Input ﬁlter transfer function, cascaded two-section design</span></span>
<span class="line"><span>is approximately 10 dBΩ, or roughly 3Ω. The impedance design criteria (17.19) are also shown,</span></span>
<span class="line"><span>and it can be seen that the ﬁlter meets these design criteria. Note the absence of resonances in</span></span>
<span class="line"><span>∥Zo( jω)||.</span></span>
<span class="line"><span>The eﬀect of stage 2 on∥Zo( jω)∥ is very small above 40 kHz (where inequalities (17.50)a r e</span></span>
<span class="line"><span>very well satisﬁed), and has moderate-to-small eﬀect at lower frequencies. It is interesting that,</span></span>
<span class="line"><span>above approximately 12 kHz, the addition of stage 2 actually decreases||Zo( jω)||. The reason</span></span>
<span class="line"><span>for this can be seen from Fig. 16.8: when the phase diﬀerence between∠Za( jω) and∠ZD1( jω)</span></span>
<span class="line"><span>is not too large (≤90◦), then the 1/(1+ Za/ZD1) term decreases the magnitude of the resulting</span></span>
<span class="line"><span>∥Zo( jω)∥. As can be seen from the phase plot of Fig. 17.29, this is indeed what happens. So</span></span>
<span class="line"><span>allowing∥Za( jω)∥ to be similar in magnitude to ∥ZD1( jω)∥ above 12 kHz was an acceptable</span></span>
<span class="line"><span>design choice.</span></span>
<span class="line"><span>The resulting ﬁlter transfer function is illustrated in Fig. 17.31. It can be seen that it does</span></span>
<span class="line"><span>indeed attain the goal of 80 dB attenuation at 250 kHz.</span></span>
<span class="line"><span>Figure 17.32 compares the single-stage design of Sect.17.4.1 to the two-stage design of this</span></span>
<span class="line"><span>section. Both designs attain 80 dB attenuation at 250 kHz, and both designs meet the impedance</span></span>
<span class="line"><span>design criteria of Eq. ( 17.19). However, the single-stage approach requires much larger ﬁlter</span></span>
<span class="line"><span>elements.</span></span>
<span class="line"><span>17.5 Stability Criteria</span></span>
<span class="line"><span>In the previous sections, Middlebrook’s Extra Element Theorem has been employed to gain</span></span>
<span class="line"><span>insight into how the addition of an input ﬁlter changes the transfer functions of a converter.</span></span>
<span class="line"><span>Impedance inequalities such as those discussed in Sect. 17.2.3 yield insight into how to shape</span></span>
<span class="line"><span>the ﬁlter output impedance so that addition of the input ﬁlter does not substantially change the</span></span>
<span class="line"><span>converter transfer functions G</span></span>
<span class="line"><span>vd(s), Gvg(s), and Zout(s). Hence we expect that addition of an</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.5 Stability Criteria 705</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+vg</span></span>
<span class="line"><span>Cb</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Cf</span></span>
<span class="line"><span>Lf</span></span>
<span class="line"><span>330 μH</span></span>
<span class="line"><span>470 μF</span></span>
<span class="line"><span>1200 μF</span></span>
<span class="line"><span>0.67 </span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>+vg</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>n1L1R1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>n2L2R2</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>6.9 μF</span></span>
<span class="line"><span>31.2 μH</span></span>
<span class="line"><span>15.6 μH1.9 0.65 2.9 μH</span></span>
<span class="line"><span>5.8 μH</span></span>
<span class="line"><span>11.7 μF</span></span>
<span class="line"><span>Fig. 17.32 Comparison of single-section (a) and two-section (b) input ﬁlter designs. Both designs meet</span></span>
<span class="line"><span>the design criteria (17.19), and both exhibit 80 dB of attenuation at 250 kHz</span></span>
<span class="line"><span>input ﬁlter meeting the impedance inequalities will not change the stability of a well-designed</span></span>
<span class="line"><span>switching regulator. In this sense, the impedance inequalities can be viewed as design criteria</span></span>
<span class="line"><span>that may be conservative.</span></span>
<span class="line"><span>By themselves, the impedance inequalities of Sect. 17.2.3 do not deﬁne the stability bound-</span></span>
<span class="line"><span>ary of a closed-loop system, because these inequalities do not depend on the actual loop gain</span></span>
<span class="line"><span>T(s). So far, we have applied the Extra Element Theorem only to the open-loop transfer func-</span></span>
<span class="line"><span>tions such as Gvd(s). To determine the stability of a closed-loop switching regulator with input</span></span>
<span class="line"><span>ﬁlter, we need to further investigate how alteration of the transfer functions of the converter</span></span>
<span class="line"><span>power stage aﬀects the stability and phase margin of the loop gain T(s).</span></span>
<span class="line"><span>One straightforward approach is to plot the modiﬁed loop gain including the modiﬁedGvd(s)</span></span>
<span class="line"><span>of Eq. (17.4), and then apply the usual stability tests such as the phase margin test to the result.</span></span>
<span class="line"><span>The modiﬁed Gvg(s) and Zout(s) can be plotted as well, to check whether these quantities con-</span></span>
<span class="line"><span>tinue to meet the design goals. This approach is discussed in Sect. 17.5.1.</span></span>
<span class="line"><span>A second approach is based on comparison of the input ﬁlter source impedance Zo(s) with</span></span>
<span class="line"><span>the converter closed-loop input impedance Zi(s)[ 151]. This approach expresses the stability</span></span>
<span class="line"><span>boundary directly in terms of Zo(s). The loading of the input ﬁlter by Zi(s) leads to a voltage</span></span>
<span class="line"><span>divider term Zi</span></span>
<span class="line"><span>Zi+ Zo</span></span>
<span class="line"><span>(17.59)</span></span>
<span class="line"><span>that can contain RHP poles, and is the origin of the stability problem. Section 17.5.2 contains a</span></span>
<span class="line"><span>derivation and an example. The approaches of Sects.17.5.1 and 17.5.2 give identical predictions</span></span>
<span class="line"><span>of the stability boundary.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>706 17 Input Filter Design</span></span>
<span class="line"><span>17.5.1 Modiﬁed Phase Margin</span></span>
<span class="line"><span>Let us consider again the buck converter example of Sect. 17.3.T h eeﬀect of the addition of</span></span>
<span class="line"><span>an undamped L–C input ﬁlter on the control-to-output transfer function Gvd(s) is illustrated in</span></span>
<span class="line"><span>Fig. 17.18, repeated in Fig. 17.33. It can be seen that Gvd is substantially unchanged below the</span></span>
<span class="line"><span>input ﬁlter resonance at 400 Hz, butGvd contains an additional 360◦of phase lag above 400 Hz.</span></span>
<span class="line"><span>The undamped input ﬁlter violates the inequalities of Eq. (17.19) in the vicinity of 400 Hz.</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| Gvd || Gvd</span></span>
<span class="line"><span>00 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>30 dB</span></span>
<span class="line"><span>100 Hz</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>zHk01zHk1</span></span>
<span class="line"><span>10 dB</span></span>
<span class="line"><span>|| Gvd ||</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>Fig. 17.33 Eﬀect of undamped input ﬁlter on the control-to-output transfer function Gvd(s)o ft h eb u c k</span></span>
<span class="line"><span>converter example. Dashed lines: without input ﬁlter. Solid lines: with undamped input ﬁlter</span></span>
<span class="line"><span>If this converter and input ﬁlter are employed in a closed-loop regulator system having a</span></span>
<span class="line"><span>loop crossover frequency fc well below the input ﬁlter resonance at 400 Hz, then the phase</span></span>
<span class="line"><span>margin of the loop gain T(s) will be essentially unchanged by the input ﬁlter and the loop</span></span>
<span class="line"><span>will be stable. Violation of the impedance inequalities is irrelevant because the violation occurs</span></span>
<span class="line"><span>outside the bandwidth of the loop. Conversely, if the loop crossover frequency fc is near to or</span></span>
<span class="line"><span>greater than 400 Hz, then addition of the undamped input ﬁlter will decrease the phase margin</span></span>
<span class="line"><span>of the loop gain T(s) by as much as−360◦, which would lead to a negative phase margin and</span></span>
<span class="line"><span>instability.</span></span>
<span class="line"><span>Hence, one approach to determination of the stability boundary is to employ the modiﬁed</span></span>
<span class="line"><span>Gvd(s) to plot the modiﬁed loop gain and ﬁnd its phase margin. As an example, let us consider</span></span>
<span class="line"><span>the closed-loop buck regulator with PID compensator designed in Sect. 9.5.4. Figure 17.34</span></span>
<span class="line"><span>illustrates this closed-loop system, with an added single-section input ﬁlter andRf –Cb damping</span></span>
<span class="line"><span>network.</span></span>
<span class="line"><span>Figure 17.35 contains a plot of the magnitude of the input ﬁlter source (output) impedance</span></span>
<span class="line"><span>Zo, along with the impedances ZN , ZD, and Ze from Table 17.1, using the numerical values</span></span>
<span class="line"><span>speciﬁed in Fig. 17.34. It can be observed that∥Zo∥ is indeed less than∥ZN∥,∥ZD∥, and∥Ze∥ at</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.5 Stability Criteria 707</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>50 ! H</span></span>
<span class="line"><span>500 ! F28 V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>1 Ω</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>11 kΩ</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>5 V</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>R3 C3</span></span>
<span class="line"><span>R4</span></span>
<span class="line"><span>85 kΩ</span></span>
<span class="line"><span>1.1 nF</span></span>
<span class="line"><span>2.7 nF</span></span>
<span class="line"><span>47 kΩ</span></span>
<span class="line"><span>120 kΩ</span></span>
<span class="line"><span>VM = 4 V</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>Lf</span></span>
<span class="line"><span>Cf</span></span>
<span class="line"><span>Cb</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>31 ! H</span></span>
<span class="line"><span>47 ! F</span></span>
<span class="line"><span>29 ! F</span></span>
<span class="line"><span>1.7 Ω</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>Fig. 17.34 Closed-loop buck regulator with PID compensator, Sect. 9.5.4, with a damped input ﬁlter</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-30</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>-10</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>Zo</span></span>
<span class="line"><span>ZN</span></span>
<span class="line"><span>ZD</span></span>
<span class="line"><span>Ze</span></span>
<span class="line"><span>Fig. 17.35 Impedance inequalities for the regulator of Fig. 17.34</span></span>
<span class="line"><span>all frequencies, although the impedances are close in magnitude in the vicinity of the resonances</span></span>
<span class="line"><span>of the input ﬁlter (approximately 4 kHz) and the converter output ﬁlter (1 kHz).</span></span>
<span class="line"><span>The original and modiﬁed loop gains are plotted in Fig.17.36. It can be observed that the ef-</span></span>
<span class="line"><span>fect of the input ﬁlter on the loop gain is moderate, and the loop continues to be stable. Nonethe-</span></span>
<span class="line"><span>less, changes are observed at frequencies where∥Z</span></span>
<span class="line"><span>o∥ approaches∥ZN∥ or∥ZD∥. At or above the 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>708 17 Input Filter Design</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>60</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>Modified T</span></span>
<span class="line"><span>Original T</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-270</span></span>
<span class="line"><span>-225</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-135</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>-45</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Phase, degrees</span></span>
<span class="line"><span>Modified T</span></span>
<span class="line"><span>Original T</span></span>
<span class="line"><span>Fig. 17.36 Modiﬁcation of the loop gain magnitude and phase by the input ﬁlter, for the buck regulator</span></span>
<span class="line"><span>of Fig. 17.34</span></span>
<span class="line"><span>kHz resonant frequency of the buck output ﬁlter, the magnitude and phase of the loop gainT(s)</span></span>
<span class="line"><span>are somewhat reduced. Resonant (LHP) zeroes are introduced into T(s) at the approximately 4</span></span>
<span class="line"><span>kHz resonance of the input ﬁlter, which cause the loop to exhibit three crossover frequencies.</span></span>
<span class="line"><span>The loop also contains a pair of damped poles near 4 kHz. The phase margin is reduced, but is</span></span>
<span class="line"><span>still positive, and the loop continues to be stable.</span></span>
<span class="line"><span>Again, it should be noted that∥Zo∥&lt;∥ZN∥ is not the stability condition, but rather stability</span></span>
<span class="line"><span>is deduced from the loop gain plot.</span></span>
<span class="line"><span>Figure 17.37 illustrates modiﬁcation of the input ﬁlter damping network, such that the peak</span></span>
<span class="line"><span>∥Zo∥ is increased. The impedance magnitudes for this case are plotted in Fig. 17.38. It can be</span></span>
<span class="line"><span>seen that the input ﬁlter∥Zo∥ now signiﬁcantly exceeds∥ZN∥ and∥ZD∥ at the input ﬁlter resonant</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.5 Stability Criteria 709</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>50 ! H</span></span>
<span class="line"><span>500 ! F28 V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>1 Ω</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>11 kΩ</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>5 V</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>R3 C3</span></span>
<span class="line"><span>R4</span></span>
<span class="line"><span>85 kΩ</span></span>
<span class="line"><span>1.1 nF</span></span>
<span class="line"><span>2.7 nF</span></span>
<span class="line"><span>47 kΩ</span></span>
<span class="line"><span>120 kΩ</span></span>
<span class="line"><span>VM = 4 V</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>Lf</span></span>
<span class="line"><span>Cf</span></span>
<span class="line"><span>Cb</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>31 ! H</span></span>
<span class="line"><span>47 ! F</span></span>
<span class="line"><span>8 ! F</span></span>
<span class="line"><span>5.2 Ω</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>Fig. 17.37 Modiﬁcation of the input ﬁlter of Fig. 17.34 to reduce its damping</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-30</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>-10</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>Zo</span></span>
<span class="line"><span>ZN</span></span>
<span class="line"><span>ZD</span></span>
<span class="line"><span>Ze</span></span>
<span class="line"><span>Fig. 17.38 Impedance inequalities for the regulator of Fig. 17.37</span></span>
<span class="line"><span>frequency of 4 kHz. The resulting loop gain magnitude and phase is plotted in Fig. 17.39.T h e</span></span>
<span class="line"><span>correction factor in Eq. ( 17.4) introduces resonant RHP zeroes and resonant poles into T(s),</span></span>
<span class="line"><span>at the input ﬁlter resonant frequency. This adds an additional 360◦of phase lag at frequencies</span></span>
<span class="line"><span>above 4 kHz. At the loop crossover frequency of 7 kHz, the phase margin is negative. Hence,</span></span>
<span class="line"><span>the converter feedback loop is unstable.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>710 17 Input Filter Design</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>–40</span></span>
<span class="line"><span>–20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>60</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>Modified T</span></span>
<span class="line"><span>Original T</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>–540</span></span>
<span class="line"><span>–495</span></span>
<span class="line"><span>–450</span></span>
<span class="line"><span>–405</span></span>
<span class="line"><span>–360</span></span>
<span class="line"><span>–315</span></span>
<span class="line"><span>–270</span></span>
<span class="line"><span>–225</span></span>
<span class="line"><span>–180</span></span>
<span class="line"><span>–135</span></span>
<span class="line"><span>–90</span></span>
<span class="line"><span>–45</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Phase, degrees</span></span>
<span class="line"><span>Modified T</span></span>
<span class="line"><span>Original T</span></span>
<span class="line"><span>Fig. 17.39 Modiﬁcation of the loop gain magnitude and phase by the input ﬁlter, for the buck regulator</span></span>
<span class="line"><span>of Fig. 17.37</span></span>
<span class="line"><span>In summary, the impedance inequalities of Sect. 17.2.3 provide conditions that guarantee</span></span>
<span class="line"><span>that the loop gain and other important quantities are unchanged by addition of an input ﬁlter. The</span></span>
<span class="line"><span>actual stability boundary is determined by plotting the modiﬁed loop gain, and then applying the</span></span>
<span class="line"><span>usual stability tests such as the phase margin test. In the examples of this section, the correction</span></span>
<span class="line"><span>factor (Eq. (17.18)) leads to decrease of the magnitude and phase of the loop gain in the vicinity</span></span>
<span class="line"><span>of the crossover frequency. In the example in which damping of the input ﬁlter was inadequate,</span></span>
<span class="line"><span>this led to a negative phase margin and instability.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.5 Stability Criteria 711</span></span>
<span class="line"><span>17.5.2 Closed-Loop Input Impedance</span></span>
<span class="line"><span>Another useful approach for determination of the exact stability boundary is based on the load-</span></span>
<span class="line"><span>ing of the input ﬁlter by the closed-loop converter input impedance Zi(s). This loading leads to</span></span>
<span class="line"><span>a voltage divider term</span></span>
<span class="line"><span>Zi(s)</span></span>
<span class="line"><span>Zi(s)+ Zo(s)= 1</span></span>
<span class="line"><span>1+ Zo(s)</span></span>
<span class="line"><span>Zi(s)</span></span>
<span class="line"><span>(17.60)</span></span>
<span class="line"><span>that introduces new poles into the closed-loop transfer functions of the system [ 151]. It is pos-</span></span>
<span class="line"><span>sible that these new poles lie in the right half-plane, and this can be viewed as the mechanism</span></span>
<span class="line"><span>by which addition of an input ﬁlter destabilizes the regulator. In this section, the Extra Ele-</span></span>
<span class="line"><span>ment Theorem is employed to derive how the input ﬁlter adds the additional term ( 17.60)t oa</span></span>
<span class="line"><span>closed-loop transfer function of the system; the closed-loop audiosusceptibility ˆv/ˆvg is used as</span></span>
<span class="line"><span>an example but all closed-loop transfer functions of the network contain the same poles. Second,</span></span>
<span class="line"><span>the Feedback Theorem is employed to ﬁnd an expression for the closed-loop input impedance</span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span>i(s). Finally, the stability of Eq. (17.60) is examined by treatingTm(s)= Zo(s)/Zi(s) as a minor</span></span>
<span class="line"><span>loop gain whose stability can be determined using conventional techniques such as the Nyquist</span></span>
<span class="line"><span>stability theorem and the phase margin test.</span></span>
<span class="line"><span>Eﬀect of input ﬁlter on closed-loop transfer functions</span></span>
<span class="line"><span>Figure 17.40 illustrates the small-signal model of a system composed of a CCM switching</span></span>
<span class="line"><span>converter, its feedback system, and an input ﬁlter. A Thevenin-equivalent circuit models the</span></span>
<span class="line"><span>output port of the input ﬁlter, having output impedanceZ</span></span>
<span class="line"><span>o. The transfer function of the unloaded</span></span>
<span class="line"><span>input ﬁlter isHi(s), and the voltage applied to the input port of the input ﬁlter isvg. The converter</span></span>
<span class="line"><span>power stage is modeled using the canonical model of Sect. 7.4. The compensator and PWM</span></span>
<span class="line"><span>transfer functions are combined into gain block A(s).</span></span>
<span class="line"><span>Fig. 17.40 Small-signal model of a closed-loop converter system with input ﬁlter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>712 17 Input Filter Design</span></span>
<span class="line"><span>In the case of no input ﬁlter, Zo(s)= 0 and Hi(s)= 1. Under these conditions, the “original”</span></span>
<span class="line"><span>closed-loop transfer functions can be found using the Feedback Theorem, in a manner similar</span></span>
<span class="line"><span>to that employed in Sect. 13.4. The “original” loop gain is found to be</span></span>
<span class="line"><span>T(s)= A(s)e(s)MHe(s)H(s) (17.61)</span></span>
<span class="line"><span>The “original” audiosusceptibility is</span></span>
<span class="line"><span>Gvg(s)= MHe(s)</span></span>
<span class="line"><span>1+ T(s) (17.62)</span></span>
<span class="line"><span>This coincides with the result of Eq. ( 13.103). In the presence of the input ﬁlter, the Extra</span></span>
<span class="line"><span>Element Theorem predicts that the audiosusceptibility becomes</span></span>
<span class="line"><span>G′</span></span>
<span class="line"><span>vg(s)= Hi(s)Gvg(s)</span></span>
<span class="line"><span>1+ Zo</span></span>
<span class="line"><span>ZNg</span></span>
<span class="line"><span>1+ Zo</span></span>
<span class="line"><span>ZDg</span></span>
<span class="line"><span>(17.63)</span></span>
<span class="line"><span>Figure 17.41 illustrates use of the Extra Element Theorem to ﬁnd the modiﬁed audiosuscepti-</span></span>
<span class="line"><span>bility G′</span></span>
<span class="line"><span>vg(s). The Thevenin impedance Zo(s) is treated as the extra element, and current ˆit is</span></span>
<span class="line"><span>injected at the Zo port.</span></span>
<span class="line"><span>The impedance ZNg is the impedance seen at the injection port, when ˆit and ˆvin are adjusted</span></span>
<span class="line"><span>such that the output voltage ˆv is nulled. The reference variation ˆvre f is also set to zero:</span></span>
<span class="line"><span>ZNg = ˆvt</span></span>
<span class="line"><span>ˆit</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆv→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>(17.64)</span></span>
<span class="line"><span>Fig. 17.41 Use of the Extra Element Theorem to ﬁnd the modiﬁed G′</span></span>
<span class="line"><span>vg(s)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>17.5 Stability Criteria 713</span></span>
<span class="line"><span>When ˆv is nulled, with ˆvre f set to zero, the duty-cycle variation ˆd also becomes zero. Hence, the</span></span>
<span class="line"><span>e(s) ˆd and j(s) ˆd sources are zero. Additionally, the null condition of ˆv causes zero-current varia-</span></span>
<span class="line"><span>tion in the load and in the C and Le elements, so that there is no voltage across the transformer</span></span>
<span class="line"><span>windings and no current through the transformer windings. Hence the null condition implies</span></span>
<span class="line"><span>that ˆit= 0 and ˆvt=−Hi ˆvin. Therefore ZNg is</span></span>
<span class="line"><span>ZNg =−Hi ˆvin</span></span>
<span class="line"><span>0 =∞ (17.65)</span></span>
<span class="line"><span>ZNg is an open circuit, and the numerator term of the correction factor (17.63) equals (1+0)= 1.</span></span>
<span class="line"><span>The impedance ZDg is the impedance seen at the injection port, when ˆvin and ˆvre f are set to</span></span>
<span class="line"><span>zero:</span></span>
<span class="line"><span>ZDg= ˆvt</span></span>
<span class="line"><span>ˆit</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvin=0</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>(17.66)</span></span>
<span class="line"><span>The quantity ZDg is seen to be the closed-loop input impedance Zi of the regulator. Hence, the</span></span>
<span class="line"><span>closed-loop audiosusceptibility in Eq. (17.63)i s</span></span>
<span class="line"><span>G′</span></span>
<span class="line"><span>vg(s)= Hi(s)Gvg(s) 1⎦</span></span>
<span class="line"><span>1+ Zo</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>) (17.67)</span></span>
<span class="line"><span>A similar analysis can show that the modiﬁed closed-loop output impedance contains the same</span></span>
<span class="line"><span>correction factor denominator term [151].</span></span>
<span class="line"><span>How can addition of an input ﬁlter to a stable closed-loop regulator lead to instability, i.e.,</span></span>
<span class="line"><span>closed-loop transfer function poles in the right half of the complex plane? In Eq. ( 17.67), the</span></span>
<span class="line"><span>quantity Gvg(s) is the closed-loop audiosusceptibility of the original regulator; we assume that</span></span>
<span class="line"><span>the original regulator was correctly designed so that Gvg(s) is stable and contains no right half-</span></span>
<span class="line"><span>plane poles. The quantityHi is the unloaded transfer function of the ﬁlter, which we also assume</span></span>
<span class="line"><span>contains no right half-plane poles since the ﬁlter is a passive network. Hence the only term that</span></span>
<span class="line"><span>can lead to instability is the denominator correction factor term</span></span>
<span class="line"><span>1⎦</span></span>
<span class="line"><span>1+ Zo</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>)= 1</span></span>
<span class="line"><span>(1+ Tm) (17.68)</span></span>
<span class="line"><span>The term in Eq. ( 17.68) is the origin of potential instability caused by addition of the input</span></span>
<span class="line"><span>ﬁlter. The denominator correction factor term assumes the same mathematical form as a closed-</span></span>
<span class="line"><span>loop transfer function, eﬀectively with “minor loop gain” Tm = Zo/Zi, and it is possible for the</span></span>
<span class="line"><span>(1+Tm) term to contain right half-plane roots. Hence the usual stability tests such as the Nyquist</span></span>
<span class="line"><span>stability criterion or phase margin tests can be applied to Tm.</span></span>
<span class="line"><span>Finding the closed-loop input admittance Yi = 1/ZDg</span></span>
<span class="line"><span>We can apply the Feedback Theorem of Chap. 13 as illustrated in Fig. 17.42. A test source ˆvt is</span></span>
<span class="line"><span>injected at the power input port of the small-signal model, and the converter input current ˆit is</span></span>
<span class="line"><span>measured. The input admittance is the transfer function from ˆvt to ˆit:</span></span>
<span class="line"><span>Yi=</span></span>
<span class="line"><span>ˆit</span></span>
<span class="line"><span>ˆvt</span></span>
<span class="line"><span>(17.69)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>714 17 Input Filter Design</span></span>
<span class="line"><span>Fig. 17.42 Use of the Feedback Theorem to ﬁnd the closed-loop input admittance Yi = 1/ZDg</span></span>
<span class="line"><span>To determine the closed-loopYi, source ˆvz is injected after the summing node, and the Feedback</span></span>
<span class="line"><span>Theorem is applied to express Yi as</span></span>
<span class="line"><span>Yi= Yi∞</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ Yi0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T (17.70)</span></span>
<span class="line"><span>The gain Yi∞is given by</span></span>
<span class="line"><span>Yi∞(s)=</span></span>
<span class="line"><span>ˆit(s)</span></span>
<span class="line"><span>ˆvt(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>ˆvy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(17.71)</span></span>
<span class="line"><span>The loop reference variation ˆvre f is set to zero. In the presence of the test source ˆvt, the signal ˆvz</span></span>
<span class="line"><span>is adjusted to null ˆvy. Figure 17.43 illustrates solution of the model under these conditions.</span></span>
<span class="line"><span>With the reference ˆvre f set to zero, the nulling of ˆvy implies that the output voltage ˆv is also</span></span>
<span class="line"><span>nulled. Hence the current through the load resistanceR is nulled. Hence the currents in the eﬀec-</span></span>
<span class="line"><span>tive ﬁlter elements are nulled, and there must be zero voltage across the transformer secondary.</span></span>
<span class="line"><span>This implies that there is zero voltage across the transformer primary, and zero current through</span></span>
<span class="line"><span>the e(s) ˆd source. So under the null conditions, the test voltage must be ˆvt=−e(s) ˆd, and the test</span></span>
<span class="line"><span>current must be ˆit= j(s) ˆd. This leads to the result</span></span>
<span class="line"><span>Yi∞= j(s) ˆd</span></span>
<span class="line"><span>−e(s) ˆd</span></span>
<span class="line"><span>=−j(s)</span></span>
<span class="line"><span>e(s) (17.72)</span></span>
<span class="line"><span>For the buck converter, this expression reduces to</span></span>
<span class="line"><span>Yi∞=−M2</span></span>
<span class="line"><span>R (17.73)</span></span></code></pre></div>`,10)])])}const f=s(l,[["render",i]]);export{u as __pageData,f as default};
