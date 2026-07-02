import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第22章part 3 - 22 Resonant Conversion","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第22章part 3 - 22 Resonant Conversion","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 971-990 > Chunk ID: `chapter-22-part-3`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/060-chapter-22-part-3.md","filePath":"content/power/fundamentals-work/chunks/060-chapter-22-part-3.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/060-chapter-22-part-3.md"};function i(t,n,c,o,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第22章part-3-22-resonant-conversion" tabindex="-1">第22章part 3 - 22 Resonant Conversion <a class="header-anchor" href="#第22章part-3-22-resonant-conversion" aria-label="Permalink to &quot;第22章part 3 - 22 Resonant Conversion&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 971-990<br> Chunk ID: <code>chapter-22-part-3</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 973</span></span>
<span class="line"><span>(a) (b)</span></span>
<span class="line"><span>Fig. 22.41 Tank network of the LLC inverter example: (a) with load shorted, (b) with load open-circuited</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>Ro0=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>Ls</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>n= Lp</span></span>
<span class="line"><span>Ls</span></span>
<span class="line"><span>F= fs</span></span>
<span class="line"><span>f∞</span></span>
<span class="line"><span>(22.80)</span></span>
<span class="line"><span>For switching frequencies fs &gt; fm, the tank circuit exhibits the desirable property that the</span></span>
<span class="line"><span>tank input current decreases as the load current decreases. Operation of this converter at high</span></span>
<span class="line"><span>frequency f</span></span>
<span class="line"><span>s &gt; f0 combines the desirable properties of zero-voltage switching at all loads and</span></span>
<span class="line"><span>of tank input current that scales monotonically with load current. Over this range of frequencies,</span></span>
<span class="line"><span>the LLC exhibits a conversion ratio less than unity, similar to the series resonant circuit. In the</span></span>
<span class="line"><span>vicinity of f∞,t h eLLC is capable of boost-type conversion ratios that can become large at light</span></span>
<span class="line"><span>load.</span></span>
<span class="line"><span>Figure 22.43 illustrates the output characteristic of theLLC, for the example fm&lt; fs&lt; f0.I t</span></span>
<span class="line"><span>can be observed that, for this example,Rcrit &lt; Ro0; therefore, the converter exhibits the desirable</span></span>
<span class="line"><span>property that the zero-voltage switching region includes the matched-load conditions as well as</span></span>
<span class="line"><span>open-circuit conditions.</span></span>
<span class="line"><span>Figure 22.44 illustrates typical control plane M vs. F characteristics of the LLC converter,</span></span>
<span class="line"><span>as predicted by the CCM sinusoidal approximation result of Eq. ( 22.85). Contours for various</span></span>
<span class="line"><span>values of load resistance are shown, with the speciﬁc choice L</span></span>
<span class="line"><span>p = 5Ls.F o rl o wQ (large load</span></span>
<span class="line"><span>resistance), the characteristics exhibit a resonance near f∞with parallel resonant (boost) charac-</span></span>
<span class="line"><span>teristics. For large Q (low load resistance), the characteristics exhibit a resonance near f0 with</span></span>
<span class="line"><span>series resonant (buck) characteristics.</span></span>
<span class="line"><span>22.4.6 Results for Basic Tank Networks</span></span>
<span class="line"><span>The tank networks of Fig. 22.1 can be written in the form shown in Fig. 22.39b. The series and</span></span>
<span class="line"><span>shunt branch reactances are listed in Table 22.1. In this section, the resonant converter general</span></span>
<span class="line"><span>solution and key equations are listed, as functions of the branch reactances Xs and Xp.</span></span>
<span class="line"><span>The tank network input impedance is Zi0 = jXsfor Re = 0, and is Zi∞= j(Xs+ Xp)f o r</span></span>
<span class="line"><span>Re=∞. The unloaded tank transfer function is</span></span>
<span class="line"><span>H∞(ω)= Xp</span></span>
<span class="line"><span>Xp+ Xs</span></span>
<span class="line"><span>(22.81)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>974 22 Resonant Conversion</span></span>
<span class="line"><span>The matched-load impedance (tank output impedance when the input is shorted) is</span></span>
<span class="line"><span>Zo0(ω)= jXsXp</span></span>
<span class="line"><span>Xs+ Xp</span></span>
<span class="line"><span>= jXsH∞(ω) (22.82)</span></span>
<span class="line"><span>Matched-load resistance occurs at Re= Ro0, where Ro0=∥ Zo0∥.</span></span>
<span class="line"><span>Fig. 22.42 Tank input impedance∥ Zi∥ for the LLC tank circuit</span></span>
<span class="line"><span>Fig. 22.43 Output plane characteristic of the LLC inverter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 975</span></span>
<span class="line"><span>The critical load resistance at the boundary betweem ZVS and ZCS is</span></span>
<span class="line"><span>Rcrit =∥ Zo0∥</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>−Zi∞</span></span>
<span class="line"><span>Zi0</span></span>
<span class="line"><span>=| Xp|</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>−Xs</span></span>
<span class="line"><span>Xs+ Xp</span></span>
<span class="line"><span>(22.83)</span></span>
<span class="line"><span>The frequency f = fm, where∥ Zi∞∥=∥ Zi0∥, can be shown to occur at the frequency where</span></span>
<span class="line"><span>Xs=−Xp/2.</span></span>
<span class="line"><span>If we deﬁne the conversion ratio M= Vout/Vin, the normalized load current J= IoutR0/Vin,</span></span>
<span class="line"><span>and the eﬀective quality factor as Qe = R0/Re, then the elliptical output characteristic can be</span></span>
<span class="line"><span>written ⎦M</span></span>
<span class="line"><span>a</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦J</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>= 1 (22.84)</span></span>
<span class="line"><span>and the control characteristic can be written</span></span>
<span class="line"><span>0.5 1 1.5 2 2.5 3 3.5 4</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>2.5</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>Q = 0</span></span>
<span class="line"><span>Q = 0.25</span></span>
<span class="line"><span>0.35</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>0.75</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.52 3 5 10</span></span>
<span class="line"><span>25</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>Fig. 22.44 Typical control plane characteristic of the LLC inverter, as predicted by the CCM sinusoidal</span></span>
<span class="line"><span>approximation</span></span>
<span class="line"><span>Table 22.1 Branch reactances of basic tank networks</span></span>
<span class="line"><span>Tank Series branch reactance Xs Shunt branch reactance Xp</span></span>
<span class="line"><span>Series ωL−1</span></span>
<span class="line"><span>ωC ∞</span></span>
<span class="line"><span>Parallel ωL −1</span></span>
<span class="line"><span>ωC</span></span>
<span class="line"><span>LCC ωL−1</span></span>
<span class="line"><span>ωCs</span></span>
<span class="line"><span>−1</span></span>
<span class="line"><span>ωCp</span></span>
<span class="line"><span>LLC ωLs−1</span></span>
<span class="line"><span>ωC ωLp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>976 22 Resonant Conversion</span></span>
<span class="line"><span>M= 1√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>a2 +</span></span>
<span class="line"><span>⎦Qe</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(22.85)</span></span>
<span class="line"><span>where the parameters a and b are given by</span></span>
<span class="line"><span>a=∥ H∞(ω)∥= | Xp|</span></span>
<span class="line"><span>| Xp+ Xs|</span></span>
<span class="line"><span>b=∥ H∞(ω)∥R0</span></span>
<span class="line"><span>∥ Zo0(ω)∥ = R0</span></span>
<span class="line"><span>| Xs|</span></span>
<span class="line"><span>(22.86)</span></span>
<span class="line"><span>The above equations describe the solutions of all of the inverters of Fig. 22.1, based on the</span></span>
<span class="line"><span>sinusoidal approximation. For the series tank, a= 1.</span></span>
<span class="line"><span>22.5 Exact Characteristics of the Series and Parallel Resonant Converters</span></span>
<span class="line"><span>The exact steady-state behavior of resonant converters can be determined via methods such as</span></span>
<span class="line"><span>state plane analysis. A detailed analysis of resonant dc–dc converters is beyond the scope of</span></span>
<span class="line"><span>this book. However, the exact steady-state characteristics of ideal series [ 272, 306–313] and</span></span>
<span class="line"><span>parallel [299, 315–318] resonant dc–dc converters (Fig. 22.45) are summarized in this section.</span></span>
<span class="line"><span>Small-signal ac modeling has also been described in the literature; several relevant papers are</span></span>
<span class="line"><span>[320–323].</span></span>
<span class="line"><span>(a) L</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>CQ1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>1 : n</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>(b) L</span></span>
<span class="line"><span>+Vg C</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>1 : n</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>D5</span></span>
<span class="line"><span>D6</span></span>
<span class="line"><span>D7</span></span>
<span class="line"><span>D8</span></span>
<span class="line"><span>Fig. 22.45 Transformer-isolated resonant dc–dc converters: ( a) series resonant converter, ( b) parallel</span></span>
<span class="line"><span>resonant converter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.5 Exact Characteristics of the Series and Parallel Resonant Converters 977</span></span>
<span class="line"><span>22.5.1 Series Resonant Converter</span></span>
<span class="line"><span>At a given switching frequency, the series resonant dc–dc converter can operate in one continu-</span></span>
<span class="line"><span>ous conduction mode, and possibly in several discontinuous conduction modes. The mode index</span></span>
<span class="line"><span>k is deﬁned as the integer that satisﬁes</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>k+ 1&lt; fs&lt; f0</span></span>
<span class="line"><span>k or 1</span></span>
<span class="line"><span>k+ 1&lt; F&lt; 1</span></span>
<span class="line"><span>k (22.87)</span></span>
<span class="line"><span>where F= fs/ f0 is the normalized switching frequency. The subharmonic numberξis deﬁned</span></span>
<span class="line"><span>as</span></span>
<span class="line"><span>ξ= k+ 1+ (−1)k</span></span>
<span class="line"><span>2 (22.88)</span></span>
<span class="line"><span>Values of k andξas functions of fs are summarized in Fig. 22.46a. The subharmonic numberξ</span></span>
<span class="line"><span>denotes the dominant harmonic that excites the tank resonance. When the converter is heavily</span></span>
<span class="line"><span>loaded, it operates in type k continuous conduction mode. As the load is reduced (i.e., as the</span></span>
<span class="line"><span>load resistance R is increased), the converter enters the type k discontinuous conduction mode.</span></span>
<span class="line"><span>Further reducing the load causes the converter to enter the type ( k−1) DCM, type ( k−2)</span></span>
<span class="line"><span>DCM,... , type 1 DCM. There is no type 0 DCM, and hence when the converter operates above</span></span>
<span class="line"><span>resonance, only the type 0 continuous conduction mode is possible.</span></span>
<span class="line"><span>In the type k continuous conduction mode, the series resonant converter exhibits elliptical</span></span>
<span class="line"><span>output characteristics, given by</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>2ξ2 sin2</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>ξ2</span></span>
<span class="line"><span>⎦Jγ</span></span>
<span class="line"><span>2 + (−1)k</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>cos2</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>= 1 (22.89)</span></span>
<span class="line"><span>For the transformer-isolated converters of Fig.22.45, M and J are related to the load voltage V</span></span>
<span class="line"><span>and load current I according to</span></span>
<span class="line"><span>M= V</span></span>
<span class="line"><span>nVg</span></span>
<span class="line"><span>J= InR0</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>(22.90)</span></span>
<span class="line"><span>Again, R0 is the tank characteristic impedance, referred to the transformer primary side. The</span></span>
<span class="line"><span>quantityγis the angular length of one-half of the switching period:</span></span>
<span class="line"><span>γ=ω0Ts</span></span>
<span class="line"><span>2 =π</span></span>
<span class="line"><span>F (22.91)</span></span>
<span class="line"><span>Equation (22.89) is valid only fork satisfying Eq. (22.87). It predicts that the voltage conversion</span></span>
<span class="line"><span>ratio M is restricted to the range</span></span>
<span class="line"><span>0≤M≤1</span></span>
<span class="line"><span>ξ (22.92)</span></span>
<span class="line"><span>This is consistent with Eq. (22.21).</span></span>
<span class="line"><span>Typical CCM tank current waveforms are illustrated in Fig.22.46. When k is even, the tank</span></span>
<span class="line"><span>inductor current is initially negative. In consequence, the switch network antiparallel diodes</span></span>
<span class="line"><span>conduct ﬁrst, for a fraction of a half resonant cycle. If k is odd, then each half-switching period</span></span>
<span class="line"><span>is initiated by conduction of the switch network transistors. In either case, this is followed by</span></span>
<span class="line"><span>(ξ−1) complete tank half-cycles of ringing. The half-switching period is then concluded by</span></span>
<span class="line"><span></span></span>
<span class="line"><span>978 22 Resonant Conversion</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>f0f0 /2f0 /3</span></span>
<span class="line"><span>etc. k = 0k = 1k = 2k = 3</span></span>
<span class="line"><span> = 1 = 3</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>st</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>(k</span></span>
<span class="line"><span>vs(t) Vg</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>st</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>k complete half-cycles</span></span>
<span class="line"><span>vs(t) Vg</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Fig. 22.46 Continuous conduction modes of the series resonant converter: ( a) switching frequency</span></span>
<span class="line"><span>ranges over which various mode indices k and subharmonic numbersξoccur; (b) tank inductor current</span></span>
<span class="line"><span>waveform, type k CCM, for odd k;( c) tank inductor current waveform, type k CCM, for even k</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.5 Exact Characteristics of the Series and Parallel Resonant Converters 979</span></span>
<span class="line"><span>a subinterval shorter than one complete resonant half-cycle, in which the device that did not</span></span>
<span class="line"><span>initially conduct is on. The next half- switching period then begins, and is symmetrical.</span></span>
<span class="line"><span>The steady-state control plane characteristic can be found for a resistive load R obeying</span></span>
<span class="line"><span>V= IR, by substitution of the normalized relationJ= MQ into Eq. (22.89), where Q= n2R0/R.</span></span>
<span class="line"><span>Use of the quadratic formula and some algebraic manipulations allows solution for M,a sa</span></span>
<span class="line"><span>function of load (via Q) and switching frequency (viaγ):</span></span>
<span class="line"><span>M=</span></span>
<span class="line"><span>⎦Qγ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ξ4 tan2</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦Qγ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢</span></span>
<span class="line"><span>⎢⎣</span></span>
<span class="line"><span>(−1)</span></span>
<span class="line"><span>k+1+</span></span>
<span class="line"><span>√1+</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>ξ2−cos2</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)][</span></span>
<span class="line"><span>ξ4 tan2</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦Qγ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)2]</span></span>
<span class="line"><span>⎦Qγ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>cos2</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥</span></span>
<span class="line"><span>⎥⎦</span></span>
<span class="line"><span>(22.93)</span></span>
<span class="line"><span>This is the closed-form relationship between the conversion ratioM and the switching frequency,</span></span>
<span class="line"><span>for a resistive load. It is valid for any continuous conduction mode k.</span></span>
<span class="line"><span>The type k discontinuous conduction modes, for k odd, occur over the frequency range</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>s&lt; f0</span></span>
<span class="line"><span>k (22.94)</span></span>
<span class="line"><span>In these modes, the output voltage is independent of both load current and switching frequency,</span></span>
<span class="line"><span>and is described by</span></span>
<span class="line"><span>M= 1</span></span>
<span class="line"><span>k (22.95)</span></span>
<span class="line"><span>The type k discontinuous conduction mode, for odd k, occurs over the range of load currents</span></span>
<span class="line"><span>given by</span></span>
<span class="line"><span>2(k+ 1)</span></span>
<span class="line"><span>γ&gt; J&gt; 2(k−1)</span></span>
<span class="line"><span>γ (22.96)</span></span>
<span class="line"><span>In the odd discontinuous conduction modes, the tank current rings for k complete resonant</span></span>
<span class="line"><span>half-cycles. All four output bridge rectiﬁer diodes then become reverse-biased, and the tank</span></span>
<span class="line"><span>current remains at zero until the next switching half-period begins, as illustrated in Fig. 22.51.</span></span>
<span class="line"><span>Series resonant converters are not normally purposely designed to operate in odd discontinuous</span></span>
<span class="line"><span>conduction modes, because the output voltage is not controllable. Nonetheless, when the load</span></span>
<span class="line"><span>is removed with f</span></span>
<span class="line"><span>s&lt; f0, the series resonant converter operates in k= 1 DCM with M= 1.</span></span>
<span class="line"><span>The type k discontinuous conduction mode, for k even, also occurs over the frequency range</span></span>
<span class="line"><span>fs&lt; f0</span></span>
<span class="line"><span>k (22.97)</span></span>
<span class="line"><span>Even discontinuous conduction modes exhibit current source characteristics, in which the load</span></span>
<span class="line"><span>current is a function of switching frequency and input voltage, but not of the load voltage. The</span></span>
<span class="line"><span>output relationship is</span></span>
<span class="line"><span>J= 2k</span></span>
<span class="line"><span>γ (22.98)</span></span>
<span class="line"><span>Operation in this mode occurs for</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>k−1&gt; M&gt; 1</span></span>
<span class="line"><span>k+ 1 (22.99)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>980 22 Resonant Conversion</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>st</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>k complete half-cycles</span></span>
<span class="line"><span>vs(t) Vg</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>X</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>Fig. 22.47 Tank inductor current waveform, typek DCM, for even k</span></span>
<span class="line"><span>g+</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Ig = gV Ig = gVg</span></span>
<span class="line"><span>g = 2k</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>Fig. 22.48 Steady-state equivalent circuit model for an even discontinuous conduction mode: an eﬀective</span></span>
<span class="line"><span>gyrator. The converter exhibits current source characteristics</span></span>
<span class="line"><span>In the even discontinuous conduction modes, the tank current rings fork complete resonant half-</span></span>
<span class="line"><span>cycles during each switching half-period. All four output bridge then become reverse-biased,</span></span>
<span class="line"><span>and the tank current remains at zero until the next switching half-period is initiated. Tank current</span></span>
<span class="line"><span>waveforms are illustrated in Fig.22.47 for even DCM.</span></span>
<span class="line"><span>The series resonant converter possesses some unusual properties when operated in an even</span></span>
<span class="line"><span>discontinuous conduction mode. A dc equivalent circuit is given in Fig. 22.48, consisting of a</span></span>
<span class="line"><span>gyrator with gyration conductance g= 2k/gn2R0. The gyrator has the property of transforming</span></span>
<span class="line"><span>circuits into their dual networks; in the typical dc–dc converter application, the input voltage</span></span>
<span class="line"><span>source V</span></span>
<span class="line"><span>g is eﬀectively transformed into its dual, an output current source of value gVg. Series</span></span>
<span class="line"><span>resonant converters have been purposely designed to operate in thek= 2D C M ,a tp o w e rl e v e l s</span></span>
<span class="line"><span>of several tens of kW.</span></span>
<span class="line"><span>The complete control plane characteristics can now be plotted using Eqs. ( 22.87)–(22.99).</span></span>
<span class="line"><span>The result is shown in Fig. 22.49, and the mode boundaries are explicitly diagrammed in</span></span>
<span class="line"><span>Fig. 22.50. It can be seen that, for operation above resonance, the only possible operating mode</span></span>
<span class="line"><span>is the k= 0 CCM, and that the output voltage decreases monotonically with increasing switch-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.5 Exact Characteristics of the Series and Parallel Resonant Converters 981</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.3</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>0.7</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>0.9</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1 1.2 1.4 1.6 1.8 2</span></span>
<span class="line"><span>M = V/Vg</span></span>
<span class="line"><span>F = fs / f0</span></span>
<span class="line"><span>Q = 20</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>3.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0.75</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>0.35</span></span>
<span class="line"><span>Q = 0.2</span></span>
<span class="line"><span>Q = 20</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>3.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0.75</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>0.35</span></span>
<span class="line"><span>Q = 0.2</span></span>
<span class="line"><span>Fig. 22.49 Complete control plane characteristics of the series resonant converter, for 0.2≤F≤2</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.3</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>0.7</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>0.9</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1 1.2 1.4 1.6 1.8 2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>k = 0 CCMk = 1 CCMk = 2 DCM</span></span>
<span class="line"><span>k = 2 CCM</span></span>
<span class="line"><span>k = 3 CCM</span></span>
<span class="line"><span>k = 4</span></span>
<span class="line"><span>DCM</span></span>
<span class="line"><span>k = 1 DCM</span></span>
<span class="line"><span>k = 3 DCM</span></span>
<span class="line"><span>etc.</span></span>
<span class="line"><span>Fig. 22.50 Continuous and discontinuous conduction mode boundaries</span></span>
<span class="line"><span></span></span>
<span class="line"><span>982 22 Resonant Conversion</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>st</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>k complete half-cycles</span></span>
<span class="line"><span>vs(t) Vg</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>X</span></span>
<span class="line"><span>Fig. 22.51 Tank inductor current waveform, type k DCM, for odd k</span></span>
<span class="line"><span>ing frequency. Reduction in load current (or increase in load resistance, which decreases Q)</span></span>
<span class="line"><span>causes the output voltage to increase. A number of successful designs that operate above reso-</span></span>
<span class="line"><span>nance and utilize zero-voltage switching have been documented in the literature [300, 314].</span></span>
<span class="line"><span>Operation below resonance is complicated by the presence of subharmonic and discontinu-</span></span>
<span class="line"><span>ous conduction modes. The k= 1 CCM and k= 2 DCM are well behaved, in that the output</span></span>
<span class="line"><span>voltage increases monotonically with increasing switching frequency. Increase of the load cur-</span></span>
<span class="line"><span>rent again causes the output voltage to decrease. Successful designs that operate in these modes</span></span>
<span class="line"><span>and employ zero-current switching are numerous. However, operation in the higher-order modes</span></span>
<span class="line"><span>(k= 2 CCM, k= 4 DCM, etc.) is normally avoided.</span></span>
<span class="line"><span>Given F and Q, the operating mode can be evaluated directly, using the following algorithm.</span></span>
<span class="line"><span>First, the continuous conduction mode k corresponding to operation at frequency F with heavy</span></span>
<span class="line"><span>loading is found:</span></span>
<span class="line"><span>k= INT</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(22.100)</span></span>
<span class="line"><span>where INT (x) denotes the integer part of x. Next, the quantity k1 is determined:</span></span>
<span class="line"><span>k1= INT</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>4+ Qπ</span></span>
<span class="line"><span>2F</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠ (22.101)</span></span>
<span class="line"><span>The converter operates in type k CCM provided that:</span></span>
<span class="line"><span>k1&gt; k (22.102)</span></span>
<span class="line"><span>Otherwise, the converter operates in typek1 DCM. A simple algorithm can therefore be deﬁned,</span></span>
<span class="line"><span>in which the conversion ratioM is computed for a givenF and Q.F i r s t ,E q s .(22.100)t o( 22.102)</span></span>
<span class="line"><span>are evaluated, to determine the operating mode. Then, the appropriate equation (22.93), (22.95),</span></span>
<span class="line"><span>or (22.98) is evaluated to ﬁnd M.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.5 Exact Characteristics of the Series and Parallel Resonant Converters 983</span></span>
<span class="line"><span>F = 1.30</span></span>
<span class="line"><span>F = 1.15</span></span>
<span class="line"><span>F = 1.10</span></span>
<span class="line"><span>F = 1.07</span></span>
<span class="line"><span>F = 1.05 F = 1.01</span></span>
<span class="line"><span>J</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>Fig. 22.52 Output characteristics, k= 0 CCM (above resonance)</span></span>
<span class="line"><span>Output I−V plane characteristics for the k= 0 CCM, plotted using Eq. (22.89), are shown</span></span>
<span class="line"><span>in Fig. 22.52. The constant-frequency curves are elliptical, and all pass through the point M=</span></span>
<span class="line"><span>1, J= 0. For a given switching frequency, the operating point is given by the intersection of the</span></span>
<span class="line"><span>elliptical converter output characteristic with the load I−V characteristic.</span></span>
<span class="line"><span>Output plane characteristics that combine the k= 1 CCM, k= 1 DCM, and k= 2D C M</span></span>
<span class="line"><span>are shown in Fig. 22.53. These were plotted using Eqs. ( 22.89), (22.95), and ( 22.98). These</span></span>
<span class="line"><span>curves were plotted with the assumption that the transistors are allowed to conduct no longer</span></span>
<span class="line"><span>than one tank half-cycle during each switching half-period; this eliminates subharmonic modes</span></span>
<span class="line"><span>and causes the converter to operate in k= 2o r k= 1 DCM whenever f</span></span>
<span class="line"><span>s&lt; 0.5 f0. It can be seen</span></span>
<span class="line"><span>that the constant-frequency curves are elliptical in the continuous conduction mode, vertical</span></span>
<span class="line"><span>(voltage source characteristic) in the k= 1 DCM, and horizontal (current source characteristic)</span></span>
<span class="line"><span>in the k= 2D C M .</span></span>
<span class="line"><span>22.5.2 Parallel Resonant Converter</span></span>
<span class="line"><span>For operation in the frequency range 0.5 f0 &lt; fs &lt;∞, the parallel resonant dc–dc converter ex-</span></span>
<span class="line"><span>hibits one continuous conduction mode and one discontinuous conduction mode. Typical CCM</span></span>
<span class="line"><span>switch voltage vs(t), tank inductor current iL(t), and tank capacitor voltage vC(t) waveforms are</span></span>
<span class="line"><span>illustrated in Fig. 22.54. The CCM converter output characteristics are given by</span></span>
<span class="line"><span></span></span>
<span class="line"><span>984 22 Resonant Conversion</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2.5</span></span>
<span class="line"><span>0.2 0.4 0.6 0.8</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>F = .5</span></span>
<span class="line"><span>F = .75</span></span>
<span class="line"><span>F = .85</span></span>
<span class="line"><span>F = .90</span></span>
<span class="line"><span>F = .93</span></span>
<span class="line"><span>F = .96</span></span>
<span class="line"><span>F = 1.0</span></span>
<span class="line"><span>F = .25</span></span>
<span class="line"><span>F = .1</span></span>
<span class="line"><span>k = 2 DCM</span></span>
<span class="line"><span>k = 1 CCM</span></span>
<span class="line"><span>k = 1 DCM</span></span>
<span class="line"><span>J</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>0 1</span></span>
<span class="line"><span>Fig. 22.53 Output characteristics, k= 1 CCM, k= 1D C M ,a n dk= 2 DCM (below resonance)</span></span>
<span class="line"><span>M=</span></span>
<span class="line"><span>⎦2</span></span>
<span class="line"><span>γ</span></span>
<span class="line"><span>) ⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>ϕ−sin(ϕ)</span></span>
<span class="line"><span>cos</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>(22.103)</span></span>
<span class="line"><span>ϕ=</span></span>
<span class="line"><span>⎧⎪⎪⎪⎪⎨⎪⎪⎪⎪⎩</span></span>
<span class="line"><span>−cos−1</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>cos</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ J sin</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>))</span></span>
<span class="line"><span>for 0&lt;γ&lt;π(above resonance)</span></span>
<span class="line"><span>+ cos−1</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>cos</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ J sin</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>))</span></span>
<span class="line"><span>forπ&lt;γ&lt;2π(below resonance)</span></span>
<span class="line"><span>(22.104)</span></span>
<span class="line"><span>and where M, J, andγare again deﬁned as in Eqs. ( 22.90) and (22.91). Given the normalized</span></span>
<span class="line"><span>load current J and the half-switching-period-angleγ, one can evaluate Eq. ( 22.104) to ﬁndϕ,</span></span>
<span class="line"><span>and then evaluate Eq. (22.103) to ﬁnd the converter voltage conversion ratio M. In other words,</span></span>
<span class="line"><span>the output voltage can be found for a given load current and switching frequency, without need</span></span>
<span class="line"><span>for computer iteration.</span></span>
<span class="line"><span>A discontinuous conduction mode mechanism occurs in the parallel resonant converter</span></span>
<span class="line"><span>which is the dual of the discontinuous conduction mode mechanism of the series resonant con-</span></span>
<span class="line"><span>verter. In this mode, a discontinuous subinterval occurs in which all four output bridge rectiﬁer</span></span>
<span class="line"><span>diodes are forward-biased, and the tank capacitor voltage remains at zero. This mode occurs</span></span>
<span class="line"><span>both above and below resonance when the converter is heavily loaded. Typical DCM tank ca-</span></span>
<span class="line"><span>pacitor voltage and inductor current waveforms are illustrated in Fig. 22.55. The condition for</span></span>
<span class="line"><span>operation in the discontinuous conduction mode is</span></span>
<span class="line"><span>J&gt; J</span></span>
<span class="line"><span>crit(γ) for DCM (22.105)</span></span>
<span class="line"><span>J&lt; Jcrit(γ) for CCM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.5 Exact Characteristics of the Series and Parallel Resonant Converters 985</span></span>
<span class="line"><span>V = vC(t)</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>vs(t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>0t</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>Fig. 22.54 Typical waveforms of the parallel resonant converter, operating in the continuous conduction</span></span>
<span class="line"><span>mode</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Jcrit(γ)=−1</span></span>
<span class="line"><span>2 sin(γ)+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>sin2</span></span>
<span class="line"><span>⎦γ</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>4 sin2 (γ) (22.106)</span></span>
<span class="line"><span>The discontinuous conduction mode is described by the following set of equations:</span></span>
<span class="line"><span>MC0 = 1−cos(β)</span></span>
<span class="line"><span>JL0 = J+ sin(β)</span></span>
<span class="line"><span>cos(α+β)−2 cos(α)=−1</span></span>
<span class="line"><span>−sin(α+β)+ 2s i n (α)+ (δ−α)= 2J (22.107)</span></span>
<span class="line"><span>β+δ=γ</span></span>
<span class="line"><span>M= 1+</span></span>
<span class="line"><span>⎦2</span></span>
<span class="line"><span>γ</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(J−δ)</span></span>
<span class="line"><span>Unfortunately, the solution to this set of equations is not known in closed form, because of</span></span>
<span class="line"><span>the mixture of linear and trigonometric terms. In consequence, the equations must be solved</span></span>
<span class="line"><span></span></span>
<span class="line"><span>986 22 Resonant Conversion</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>0t</span></span>
<span class="line"><span>D5</span></span>
<span class="line"><span>D6 D7</span></span>
<span class="line"><span>D8</span></span>
<span class="line"><span>D6 D7</span></span>
<span class="line"><span>D5 D8 D5 D8 D5 D8</span></span>
<span class="line"><span>D6 D7 D6 D7</span></span>
<span class="line"><span>0t</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>Fig. 22.55 Typical waveforms of the parallel resonant converter, operating in the discontinuous conduc-</span></span>
<span class="line"><span>tion mode</span></span>
<span class="line"><span>iteratively. For a givenγand J, a computer is used to iteratively ﬁnd the angles α, β, and δ.</span></span>
<span class="line"><span>M is then evaluated, and the output plane characteristics can be plotted. The result is given in</span></span>
<span class="line"><span>Fig. 22.56. The dashed lines are the DCM solutions, and the solid lines are the valid CCM so-</span></span>
<span class="line"><span>lutions. Figure 22.56 describes the complete dc behavior of the ideal parallel resonant converter</span></span>
<span class="line"><span>for all switching frequencies above 0.5 f0. For given values of normalized switching frequency</span></span>
<span class="line"><span>F= fs/ f0 =π/γ, the relationship between the normalized output current J and the normalized</span></span>
<span class="line"><span>output voltage M is approximately elliptical. At resonance ( F = 1), the CCM ellipse degen-</span></span>
<span class="line"><span>erates to the horizontal line J = 1, and the converter exhibits current source characteristics.</span></span>
<span class="line"><span>Above resonance, the converter can both step-up the voltage (M&gt; 1) and step-down the voltage</span></span>
<span class="line"><span>(M&lt; 1). The normalized load current is then restricted to J&lt; 1, corresponding to I&lt; Vg/nR0.</span></span>
<span class="line"><span>For a given switching frequency greater than the resonant frequency, the actual limit on maxi-</span></span>
<span class="line"><span>mum load current is even more restrictive than this limit. Below resonance, the converter can</span></span>
<span class="line"><span>also step-up and step-down the voltage. Normalized load currentsJ greater than one are also ob-</span></span>
<span class="line"><span>tainable, depending on M and F. However, no solutions occur whenM and J are simultaneously</span></span>
<span class="line"><span>large.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.5 Exact Characteristics of the Series and Parallel Resonant Converters 987</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>J</span></span>
<span class="line"><span>0.0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1.0</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2.0</span></span>
<span class="line"><span>2.5</span></span>
<span class="line"><span>3.0</span></span>
<span class="line"><span>0.0 0.5 1.0 1.5 2.0 2.5</span></span>
<span class="line"><span>F = 0.51</span></span>
<span class="line"><span>0.7</span></span>
<span class="line"><span>0.9</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>1.0</span></span>
<span class="line"><span>1.1</span></span>
<span class="line"><span>1.2</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>F = 2</span></span>
<span class="line"><span>1.3</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>Fig. 22.56 Exact output characteristics of the parallel resonant converter, for F &gt; 0.5. Solid curves:</span></span>
<span class="line"><span>CCM, dashed curves: DCM</span></span>
<span class="line"><span>Q = 0.5</span></span>
<span class="line"><span>0.5 1.0 1.5 2.0 2.5 3.0</span></span>
<span class="line"><span>0.0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1.0</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2.0</span></span>
<span class="line"><span>2.5</span></span>
<span class="line"><span>3.0</span></span>
<span class="line"><span>fs /f0</span></span>
<span class="line"><span>M = V/Vg</span></span>
<span class="line"><span>Q = 1</span></span>
<span class="line"><span>Q = 2</span></span>
<span class="line"><span>Q = 5</span></span>
<span class="line"><span>Q = 0.2</span></span>
<span class="line"><span>Fig. 22.57 Exact control characteristics of the parallel resonant converter, with a resistive load. Both</span></span>
<span class="line"><span>CCM and DCM operation is included, for 0.5≤F≤3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>988 22 Resonant Conversion</span></span>
<span class="line"><span>In Fig. 22.57, the control plane characteristics are plotted for a resistive load. The parameter</span></span>
<span class="line"><span>Q is deﬁned for the parallel resonant converter as Q= R/n2R0. The normalized load current is</span></span>
<span class="line"><span>then given by J= M/Q.</span></span>
<span class="line"><span>22.6 Summary of Key Points</span></span>
<span class="line"><span>1. The sinusoidal approximation allows a great deal of insight to be gained into the operation</span></span>
<span class="line"><span>of resonant inverters and dc–dc converters. The voltage conversion ratio of dc–dc resonant</span></span>
<span class="line"><span>converters can be directly related to the tank network transfer function. Other important</span></span>
<span class="line"><span>converter properties, such as the output characteristics, dependence (or lack thereof) of</span></span>
<span class="line"><span>transistor current on load current, and zero-voltage- and zero-current-switching transitions,</span></span>
<span class="line"><span>can also be understood using this approximation. The approximation is accurate provided</span></span>
<span class="line"><span>that the eﬀective Q-factor is suﬃciently large, and provided that the switching frequency is</span></span>
<span class="line"><span>suﬃciently close to resonance.</span></span>
<span class="line"><span>2. Simple equivalent circuits are derived, which represent the fundamental components of the</span></span>
<span class="line"><span>tank network waveforms, and the dc components of the dc terminal waveforms.</span></span>
<span class="line"><span>3. Exact solutions of the ideal dc–dc series and parallel resonant converters are listed here as</span></span>
<span class="line"><span>well. These solutions correctly predict the conversion ratios, for operation not only in the</span></span>
<span class="line"><span>fundamental continuous conduction mode, but in discontinuous and subharmonic modes as</span></span>
<span class="line"><span>well.</span></span>
<span class="line"><span>4. Zero-voltage switching mitigates the switching loss caused by diode recovered charge and</span></span>
<span class="line"><span>semiconductor device output capacitances. When the objective is to minimize switching</span></span>
<span class="line"><span>loss and EMI, it is preferable to operate each MOSFET and diode with zero-voltage switch-</span></span>
<span class="line"><span>ing.</span></span>
<span class="line"><span>5. Zero-current switching leads to natural commutation of SCRs, and can also mitigate the</span></span>
<span class="line"><span>switching loss due to current tailing in IGBTs.</span></span>
<span class="line"><span>6. The input impedance magnitude ||Z</span></span>
<span class="line"><span>i||, and hence also the transistor current magnitude, are</span></span>
<span class="line"><span>monotonic functions of the load resistance R. The dependence of the transistor conduction</span></span>
<span class="line"><span>loss on the load current can be easily understood by simply plotting ∥Zi|| in the limiting</span></span>
<span class="line"><span>cases as R→∞and as R→0, or||Zi∞∥ and||Zi0∥.</span></span>
<span class="line"><span>7. The ZVS/ZCS boundary is also a simple function of Zi∞and Zi0. If ZVS occurs at open-</span></span>
<span class="line"><span>circuit and at short-circuit, then ZVS occurs for all loads. If ZVS occurs at short-circuit, and</span></span>
<span class="line"><span>ZCS occurs at open-circuit, then ZVS is obtained at matched load provided that ||Zi∞||&gt;</span></span>
<span class="line"><span>||Zi0∥.</span></span>
<span class="line"><span>8. The output characteristics of all resonant inverters considered here are elliptical, and are</span></span>
<span class="line"><span>described completely by the open-circuit transfer function magnitude∥H∞∥, and the output</span></span>
<span class="line"><span>impedance∥Zo0∥. These quantities can be chosen to match the output characteristics to the</span></span>
<span class="line"><span>application requirements.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>22.1 Analysis of a half-bridge dc–dc parallel resonant converter, operated above resonance .</span></span>
<span class="line"><span>In Fig. 22.58, the elements Cb, LF , and CF are large in value, and have negligible switch-</span></span>
<span class="line"><span>ing ripple. You may assume that all elements are ideal. You may use the sinusoidal ap-</span></span>
<span class="line"><span>proximation as appropriate.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.6 Summary of Key Points 989</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>160 V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>10 μHCb</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>1.5 μF</span></span>
<span class="line"><span>n : 1</span></span>
<span class="line"><span>LF</span></span>
<span class="line"><span>CF</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span> v</span></span>
<span class="line"><span>s(t)</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>n = 20</span></span>
<span class="line"><span>(b) vs(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0 0.5 Ts</span></span>
<span class="line"><span>fs = 1/Ts</span></span>
<span class="line"><span>Fig. 22.58 Half-bridge parallel resonant converter of Problem 22.1:( a) schematic, ( b) switch voltage</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span>(a) Sketch the waveform of the current ig(t).</span></span>
<span class="line"><span>(b) Construct an equivalent circuit for this converter, similar to Fig. 22.22, which mod-</span></span>
<span class="line"><span>els the fundamental components of the tank waveforms and the dc components of</span></span>
<span class="line"><span>the converter input current and output voltage. Clearly label the values and/or give</span></span>
<span class="line"><span>expressions for all elements in your model, as appropriate.</span></span>
<span class="line"><span>(c) Solve your model to derive an expression for the conversion ratioV/Vg= M(F, Qe, n).</span></span>
<span class="line"><span>At rated (maximum) load, this converter produces I= 20 A at V= 3.3V .</span></span>
<span class="line"><span>(d) What is the converter switching frequency fs at rated load?</span></span>
<span class="line"><span>(e) What is the magnitude of the peak transistor current at rated load?</span></span>
<span class="line"><span>At minimum load, the converter produces I= 2Aa t V= 3.3V .</span></span>
<span class="line"><span>(f) What is the converter switching frequency fs at minimum load?</span></span>
<span class="line"><span>(g) What is the magnitude of the peak transistor current at minimum load? Compare</span></span>
<span class="line"><span>with your answer from part (e)—what happens to the conduction loss and eﬃciency</span></span>
<span class="line"><span>at minimum load?</span></span>
<span class="line"><span>22.2 A dc–dc resonant converter contains an LCC tank network (Fig. 22.1d), with an output</span></span>
<span class="line"><span>ﬁlter containing a ﬁlter inductor as in the parallel resonant dc–dc converter.</span></span>
<span class="line"><span>(a) Sketch an equivalent circuit model for this converter, based on the approximate si-</span></span>
<span class="line"><span>nusoidal analysis method of Sect. 22.1. Give expressions for all elements in your</span></span>
<span class="line"><span>model.</span></span>
<span class="line"><span>(b) Solve your model, to derive an expression for the conversion ratio M= V/Vg.E x -</span></span>
<span class="line"><span>press M as a function of F = fs/ f∞, Qe = Re/R0, and n= Cs/Cp, where f∞is</span></span>
<span class="line"><span>deﬁned as in Eq. (22.50) and R0 is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>990 22 Resonant Conversion</span></span>
<span class="line"><span>R0=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>L(Cs+ Cp)</span></span>
<span class="line"><span>CsCp</span></span>
<span class="line"><span>(c)P l o tM vs. F,f o rn= 1 and Qe= 1, 2, and 5.</span></span>
<span class="line"><span>(d)P l o tM vs. F,f o rn= 0.25 and Qe= 1, 2, and 5.</span></span>
<span class="line"><span>22.3 Dual of the series resonant converter. In the converter illustrated in Fig.22.59, LF1, LF2,</span></span>
<span class="line"><span>and CF are large ﬁlter elements, whose switching ripples are small. L and C are tank</span></span>
<span class="line"><span>elements, whose waveforms iL(t) and vC(t) are nearly sinusoidal.</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>LF1</span></span>
<span class="line"><span>LF2</span></span>
<span class="line"><span>CF</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>LiL(t)</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>Fig. 22.59 Dual of the series resonant converter, Problem 22.3</span></span>
<span class="line"><span>(a) Using the sinusoidal approximation method, develop equivalent circuit models for</span></span>
<span class="line"><span>the switch network, tank network, and rectiﬁer network.</span></span>
<span class="line"><span>(b) Sketch a Bode diagram of the parallel LC parallel tank impedance.</span></span>
<span class="line"><span>(c) Solve your model. Find an analytical solution for the converter voltage conversion</span></span>
<span class="line"><span>ratio M = V/Vg, as a function of the e ﬀective Qe and the normalized switching</span></span>
<span class="line"><span>frequency F= fs/ f0.S k e t c hM vs. F.</span></span>
<span class="line"><span>(d) What can you say about the validity of the sinusoidal approximation for this con-</span></span>
<span class="line"><span>verter? Which parts of your M vs. F plot of part (c) are valid and accurate?</span></span>
<span class="line"><span>22.4 The converter of Problem22.3 operates below resonance.</span></span>
<span class="line"><span>(a) Sketch the waveform vC(t). For each subinterval, label: (i) which of the diodes D1 to</span></span>
<span class="line"><span>D4 and transistors Q1 to Q4 conduct current, and (ii) which devices block voltage.</span></span>
<span class="line"><span>(b) Does the reverse recovery process of diodes D1 to D4 lead to switching loss? Do the</span></span>
<span class="line"><span>output capacitances of transistors Q1 to Q4 lead to switching loss?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.6 Summary of Key Points 991</span></span>
<span class="line"><span>(c) Repeat parts (a) and (b) for operation above resonance.</span></span>
<span class="line"><span>22.5 A parallel resonant converter operates with a dc input voltage of Vg = 270 V . The con-</span></span>
<span class="line"><span>verter supplies 5 V to a dc load. The dc load power varies over the range 20 W–200 W. It</span></span>
<span class="line"><span>is desired to operate the power transistors with zero-voltage switching. The tank element</span></span>
<span class="line"><span>values are L= 57 μH, Cp = 0.9 nF, referred to the transformer primary. The parallel</span></span>
<span class="line"><span>resonant tank network contains an isolation transformer having a turns ratio of 52:1.</span></span>
<span class="line"><span>(a) Deﬁne F as in Eq. (22.19). Derive an expression for F, as a function of M and Qe.</span></span>
<span class="line"><span>(b) Determine the switching frequency, peak transistor current, and peak tank capacitor</span></span>
<span class="line"><span>voltage at the maximum load power operating point.</span></span>
<span class="line"><span>(c) Determine the switching frequency, peak transistor current, and peak tank capacitor</span></span>
<span class="line"><span>voltage at the minimum load power operating point.</span></span>
<span class="line"><span>22.6 In a certain resonant inverter application, the dc input voltage isVg= 320 V . The inverter</span></span>
<span class="line"><span>must produce an approximately sinusoidal output voltage having a frequency of 200</span></span>
<span class="line"><span>kHz. Under no load (output opencircuit) conditions, the inverter should produce a peak-</span></span>
<span class="line"><span>to-peak output voltage of 1500 V . The nominal resistive operating point is 200 Vrms</span></span>
<span class="line"><span>applied to 100Ω. A nonisolated LCC inverter is employed. It is desired that the inverter</span></span>
<span class="line"><span>operate with zero-voltage switching, at least for load resistances less than 200Ω.</span></span>
<span class="line"><span>(a) Derive expressions for the output open-circuit voltage V</span></span>
<span class="line"><span>oc and short-circuit current</span></span>
<span class="line"><span>Isc of the LCC inverter. Express your results as functions of F= fs/ f∞, Vg, R∞=</span></span>
<span class="line"><span>L/Cs||Cp and n = Cs/Cp. The open-circuit resonant frequency f∞is deﬁned in</span></span>
<span class="line"><span>Eq. (22.50).</span></span>
<span class="line"><span>(b) To meet the given speciﬁcations, how should the short-circuit current Isc be chosen?</span></span>
<span class="line"><span>(c) Specify tank element values that meet the speciﬁcations.</span></span>
<span class="line"><span>(d) Under what conditions does your design operate with zero-voltage switching?</span></span>
<span class="line"><span>(e) Compute the peak transistor current under no-load and short-circuit conditions.</span></span>
<span class="line"><span>22.7 A series resonant dc–dc converter operates with a dc input voltage of Vg = 550 V . The</span></span>
<span class="line"><span>converter supplies 30 kV to a load. The dc load power varies over the range 5 kW–25 kW.</span></span>
<span class="line"><span>It is desired to operate the power transistors with zero-voltage switching. The maximum</span></span>
<span class="line"><span>feasible switching frequency is 50 kHz. An isolation transformer having a 1:n turns ratio</span></span>
<span class="line"><span>is connected in series with the tank network. The peak tank capacitor voltage should be</span></span>
<span class="line"><span>no greater than 2000 V , referred to the primary.</span></span>
<span class="line"><span>(a) Derive expressions for the peak tank capacitor voltage and peak tank inductor cur-</span></span>
<span class="line"><span>rent.</span></span>
<span class="line"><span>(b) Select values for the tank inductance, tank capacitance, and turns ratio, such that the</span></span>
<span class="line"><span>given speciﬁcations are met. Attempt to minimize the peak tank inductor current,</span></span>
<span class="line"><span>while maximizing the worst-case minimum switching frequency.</span></span>
<span class="line"><span>22.8 Figure 22.60 illustrates a full-bridge resonant inverter containing an LLC tank network.</span></span>
<span class="line"><span>(a) Sketch the Bode diagrams of the input impedance under short-circuit and open-</span></span>
<span class="line"><span>circuit conditions:||Z</span></span>
<span class="line"><span>i0( jω)|| and∥Zi∞( jω)||. Give analytical expressions for the reso-</span></span>
<span class="line"><span>nant frequencies and asymptotes.</span></span>
<span class="line"><span>(b) Describe the conditions on switching frequency and load resistance that lead to zero-</span></span>
<span class="line"><span>voltage switching.</span></span>
<span class="line"><span>(c) Derive an expression for the frequency fm, where∥Zi0||=∥Zi∞||.</span></span>
<span class="line"><span>(d) Sketch the Bode plot of∥H∞( jω)||. Label the resonant frequency, and give analytical</span></span>
<span class="line"><span>expressions for the asymptotes.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>992 22 Resonant Conversion</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VLp</span></span>
<span class="line"><span>LsC</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>Fig. 22.60 LLC inverter of Problem 22.8</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>12 V</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>1 : n</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Lp</span></span>
<span class="line"><span>15 μH</span></span>
<span class="line"><span>Ls</span></span>
<span class="line"><span>2.5 μH</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>0.4 μF</span></span>
<span class="line"><span>n = 7.5</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>Fig. 22.61 Transformer-isolated LLC inverter, Problem22.9</span></span>
<span class="line"><span>22.9 You are given the LLC inverter circuit of Fig. 22.61. Under nominal conditions, this</span></span>
<span class="line"><span>converter operates at switching frequency fs= 100 kHz. All elements are ideal.</span></span>
<span class="line"><span>(a) Determine the numerical values of the open-circuit peak output voltage Voc and the</span></span>
<span class="line"><span>short-circuit peak output current Isc.</span></span>
<span class="line"><span>(b) Sketch the elliptical output characteristic. Over what portion of this ellipse does the</span></span>
<span class="line"><span>converter operate with zero-voltage switching? Does it operate with zero-voltage</span></span>
<span class="line"><span>switching at matched load?</span></span>
<span class="line"><span>(c) Sketch the Bode plots of∥Zi∞∥ and∥Zi0∥, and label the numerical values of f0, f∞, fm,</span></span>
<span class="line"><span>and fs.</span></span>
<span class="line"><span>(d) What is the numerical value of the peak transistor current when R= 0? When R→</span></span>
<span class="line"><span>∞?</span></span>
<span class="line"><span>(e) The inverter operates with load resistances that can vary between 500 Ωand an</span></span>
<span class="line"><span>open-circuit. What is the resulting range of output voltage? Does the inverter always</span></span>
<span class="line"><span>operate with zero-voltage switching?</span></span>
<span class="line"><span>22.10 It is desired to obtain a converter with current source characteristics. Hence, a series</span></span>
<span class="line"><span>resonant converter is designed for operation in thek= 2 discontinuous conduction mode.</span></span>
<span class="line"><span>The switching frequency is chosen to be f</span></span>
<span class="line"><span>s = 0.225 f0, where f0 is the tank resonant</span></span></code></pre></div>`,10)])])}const f=s(l,[["render",i]]);export{u as __pageData,f as default};
