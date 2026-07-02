import{_ as n,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const h=JSON.parse('{"title":"Appendices","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"Appendices","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 1034-1047 > Chunk ID: `appendices`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/065-appendices.md","filePath":"content/power/fundamentals-work/chunks/065-appendices.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/065-appendices.md"};function i(c,s,t,r,o,m){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="appendices" tabindex="-1">Appendices <a class="header-anchor" href="#appendices" aria-label="Permalink to &quot;Appendices&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 1034-1047<br> Chunk ID: <code>appendices</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>A</span></span>
<span class="line"><span>RMS Values of Commonly Observed Converter</span></span>
<span class="line"><span>Waveforms</span></span>
<span class="line"><span>The waveforms encountered in power electronics converters can be quite complex, containing</span></span>
<span class="line"><span>modulation at the switching frequency and often also at the ac line frequency. During converter</span></span>
<span class="line"><span>design, it is often necessary to compute the rms values of such waveforms. In this appendix,</span></span>
<span class="line"><span>several useful formulas and tables are developed which allow these rms values to be quickly</span></span>
<span class="line"><span>determined.</span></span>
<span class="line"><span>RMS values of the doubly modulated waveforms encountered in PWM rectiﬁer circuits are</span></span>
<span class="line"><span>discussed in Sect. 21.5.</span></span>
<span class="line"><span>A.1 Some Common Waveforms</span></span>
<span class="line"><span>DC:</span></span>
<span class="line"><span>rms= I (A.1)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>DC plus linear ripple:</span></span>
<span class="line"><span>rms= I</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦Δi</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(A.2)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>Ts0</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4</span></span>
<span class="line"><span>1037</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1038 A RMS Values of Commonly Observed Converter Waveforms</span></span>
<span class="line"><span>Square wave:</span></span>
<span class="line"><span>rms= Ipk (A.3)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>pk</span></span>
<span class="line"><span>Sine wave:</span></span>
<span class="line"><span>rms= Ipk</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>(A.4)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>Pulsating waveform:</span></span>
<span class="line"><span>rms= Ipk</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D (A.5)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>TsDTs0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Pulsating waveform with linear ripple:</span></span>
<span class="line"><span>rms= I</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦Δi</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(A.6)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>TsDTs0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A.1 Some Common Waveforms 1039</span></span>
<span class="line"><span>Triangular waveform:</span></span>
<span class="line"><span>rms= Ipk</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D1+ D2</span></span>
<span class="line"><span>3 (A.7)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>TsD1Ts0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>D2Ts</span></span>
<span class="line"><span>Triangular waveform:</span></span>
<span class="line"><span>rms= Ipk</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>3 (A.8)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>TsD1Ts0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Triangular waveform, no dc component:</span></span>
<span class="line"><span>rms= Δi√</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>(A.9)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t0</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>Center-tapped bridge winding waveform:</span></span>
<span class="line"><span>rms= 1</span></span>
<span class="line"><span>2 Ipk</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ D (A.10)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>TsDTs0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(1+D)Ts 2Ts</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 Ipk</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1040 A RMS Values of Commonly Observed Converter Waveforms</span></span>
<span class="line"><span>General stepped waveform:</span></span>
<span class="line"><span>rms=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D1I2</span></span>
<span class="line"><span>1+ D2I2</span></span>
<span class="line"><span>2+··· (A.11)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>D1Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>D2Ts</span></span>
<span class="line"><span>A.2 General Piecewise Waveform</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>tTsD1Ts D2Ts D3Ts</span></span>
<span class="line"><span>Triangular</span></span>
<span class="line"><span>segment</span></span>
<span class="line"><span>Constant</span></span>
<span class="line"><span>segment</span></span>
<span class="line"><span>Trapezoidal</span></span>
<span class="line"><span>segment</span></span>
<span class="line"><span>etc.</span></span>
<span class="line"><span>For a periodic waveform composed of n piecewise segments as shown above, the rms value is</span></span>
<span class="line"><span>rms=</span></span>
<span class="line"><span>√ n∑</span></span>
<span class="line"><span>k=1</span></span>
<span class="line"><span>Dkuk (A.12)</span></span>
<span class="line"><span>where Dk is the duty cycle of segmentk, and uk is the contribution of segmentk.T h euk s depend</span></span>
<span class="line"><span>on the shape of the segments—several common segment shapes are listed below.</span></span>
<span class="line"><span>Constant segment:</span></span>
<span class="line"><span>uk= I2</span></span>
<span class="line"><span>1 (A.13)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A.2 General Piecewise Waveform 1041</span></span>
<span class="line"><span>Triangular segment:</span></span>
<span class="line"><span>uk= 1</span></span>
<span class="line"><span>3 I2</span></span>
<span class="line"><span>1 (A.14)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Trapezoidal segment:</span></span>
<span class="line"><span>uk= 1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>1+ I1I2+ I2</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(A.15)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I1 I2</span></span>
<span class="line"><span>Sinusoidal segment, half or full period:</span></span>
<span class="line"><span>uk= 1</span></span>
<span class="line"><span>2 I2</span></span>
<span class="line"><span>pk (A.16)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>Sinusoidal segment, partial period: a sinusoidal segment of less than one half-period, which</span></span>
<span class="line"><span>begins at angleθ1 and ends at angleθ2. The anglesθ1 andθ2 are expressed in radians:</span></span>
<span class="line"><span>uk= 1</span></span>
<span class="line"><span>2 I2</span></span>
<span class="line"><span>pk</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−sin(θ2−θ1) cos(θ2+θ1)</span></span>
<span class="line"><span>(θ2−θ1)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(A.17)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1042 A RMS Values of Commonly Observed Converter Waveforms</span></span>
<span class="line"><span>Example</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>tTs0.2 μs</span></span>
<span class="line"><span>I1 = 20 A</span></span>
<span class="line"><span>0.2 μs</span></span>
<span class="line"><span>I2 = 2 A</span></span>
<span class="line"><span>0.1 μs</span></span>
<span class="line"><span>10 μs</span></span>
<span class="line"><span>0.2 μs5 μs</span></span>
<span class="line"><span>0 A</span></span>
<span class="line"><span>1 2 3 4 5 6</span></span>
<span class="line"><span>A transistor current waveform contains a current spike due to the stored charge of a free-</span></span>
<span class="line"><span>wheeling diode. The observed waveform can be approximated as shown above. Estimate the</span></span>
<span class="line"><span>rms current.</span></span>
<span class="line"><span>The waveform can be divided into six approximately linear segments, as shown. TheDk and</span></span>
<span class="line"><span>uk for each segment are</span></span>
<span class="line"><span>1. Triangular segment:</span></span>
<span class="line"><span>D1= (0.2μs)/(10μs)= 0.02</span></span>
<span class="line"><span>u1= I2</span></span>
<span class="line"><span>1/3= (20A)2/3= 133A2</span></span>
<span class="line"><span>2. Constant segment:</span></span>
<span class="line"><span>D2= (0.2μs)/(10μs)= 0.02</span></span>
<span class="line"><span>u2= I2</span></span>
<span class="line"><span>1 = (20A)2= 400A2</span></span>
<span class="line"><span>3. Trapezoidal segment:</span></span>
<span class="line"><span>D3= (0.1μs)/(10μs)= 0.01</span></span>
<span class="line"><span>u3= (I2</span></span>
<span class="line"><span>1+ I2</span></span>
<span class="line"><span>2+ I2</span></span>
<span class="line"><span>3 )/3= 148A2</span></span>
<span class="line"><span>4. Constant segment:</span></span>
<span class="line"><span>D4= (5μs)/(10μs)= 0.5</span></span>
<span class="line"><span>u4= I2</span></span>
<span class="line"><span>2 = (2A)2= 4A2</span></span>
<span class="line"><span>5. Triangular segment:</span></span>
<span class="line"><span>D5= (0.2μs)/(10μs)= 0.02</span></span>
<span class="line"><span>u5= I2</span></span>
<span class="line"><span>2/3= (2A)2/3= 1.3A2</span></span>
<span class="line"><span>6. Zero segment:</span></span>
<span class="line"><span>u6= 0</span></span>
<span class="line"><span>The rms value is</span></span>
<span class="line"><span>rms=</span></span>
<span class="line"><span>√ 6∑</span></span>
<span class="line"><span>k=1</span></span>
<span class="line"><span>Dkuk= 3.76A (A.18)</span></span>
<span class="line"><span>Even though its duration is very short, the current spike has a signiﬁcant impact on the rms</span></span>
<span class="line"><span>value of the current—without the current spike, the rms current is approximately 2.0 A.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>Magnetics Design Tables</span></span>
<span class="line"><span>Geometrical data for several standard ferrite core shapes are listed here. The geometrical con-</span></span>
<span class="line"><span>stant Kg is a measure of core size, useful for designing inductors and transformers that attain</span></span>
<span class="line"><span>a given copper loss [ 99]. The Kg method for inductor design is described in Chap. 11. Kg is</span></span>
<span class="line"><span>deﬁned as</span></span>
<span class="line"><span>Kg= A2</span></span>
<span class="line"><span>c WA</span></span>
<span class="line"><span>MLT (B.1)</span></span>
<span class="line"><span>where Ac is the core cross-sectional area,WA is the window area, andMLT is the winding mean-</span></span>
<span class="line"><span>length-per-turn. The geometrical constant Kgfe is a similar measure of core size, which is useful</span></span>
<span class="line"><span>for designing ac inductors and transformers when the total copper plus core loss is constrained.</span></span>
<span class="line"><span>The Kgfe method for magnetics design is described in Chap. 12. Kgfe is deﬁned as</span></span>
<span class="line"><span>Kgfe = WAA2(1−1/β)</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>MLTℓ2/β</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span>u(β)( B . 2 )</span></span>
<span class="line"><span>whereℓm is the core mean magnetic path length, and β is the core loss exponent:</span></span>
<span class="line"><span>Pfe = Kfe Bβ</span></span>
<span class="line"><span>max (B.3)</span></span>
<span class="line"><span>For modern ferrite materials, β typically lies in the range 2.6 to 2.8. The quantityu(β) is deﬁned</span></span>
<span class="line"><span>as</span></span>
<span class="line"><span>u(β)=</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎢⎢⎣</span></span>
<span class="line"><span>⎦β</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)−</span></span>
<span class="line"><span>⎦β</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦β</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)⎦2</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)⎤⎥⎥⎥⎥⎥⎥⎦</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>⎦β+2</span></span>
<span class="line"><span>β</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(B.4)</span></span>
<span class="line"><span>u(β) is equal to 0.305 for β= 2.7. This quantity varies by roughly 5% over the range 2.6≤β≤</span></span>
<span class="line"><span>2.8. Values of Kgfe are tabulated for β= 2.7; variation of Kgfe over the range 2.6≤β≤2.8i s</span></span>
<span class="line"><span>typically quite small.</span></span>
<span class="line"><span>Thermal resistances are listed in those cases where published manufacturer’s data are avail-</span></span>
<span class="line"><span>able. The thermal resistances listed are the approximate temperature rise from the center leg of</span></span>
<span class="line"><span>the core to ambient, per watt of total power loss. Diﬀerent temperature rises may be observed</span></span>
<span class="line"><span>under conditions of forced air cooling, unusual power loss distributions, etc. Listed window</span></span>
<span class="line"><span>areas are the winding areas for conventional single-section bobbins.</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4</span></span>
<span class="line"><span>1043</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1044 B Magnetics Design Tables</span></span>
<span class="line"><span>An American Wire Gauge table is included at the end of this appendix.</span></span>
<span class="line"><span>B.1 Pot Core Data</span></span>
<span class="line"><span>A H</span></span>
<span class="line"><span>Fig. B.1 Pot core</span></span>
<span class="line"><span>Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Thermal Core</span></span>
<span class="line"><span>type constant constant sectional winding length path resistance weight</span></span>
<span class="line"><span>area area per turn length</span></span>
<span class="line"><span>(AH) Kg Kgfe Ac WA MLT ℓm Rth</span></span>
<span class="line"><span>(mm) cm 5 cmx (cm2)( c m 2) (cm) (cm) ( ◦C/W) (g)</span></span>
<span class="line"><span>704 0.738· 10−6 1.61· 10−6 0.070 0 .22· 10−3 1.46 1.0 0.5</span></span>
<span class="line"><span>905 0.183· 10−3 256· 10−6 0.101 0.034 1.90 1.26 1.0</span></span>
<span class="line"><span>1107 0.667· 10−3 554· 10−6 0.167 0.055 2.30 1.55 1.8</span></span>
<span class="line"><span>1408 2.107· 10−3 1.1· 10−3 0.251 0.097 2.90 2.00 100 3.2</span></span>
<span class="line"><span>1811 9.45· 10−3 2.6· 10−3 0.433 0.187 3.71 2.60 60 7.3</span></span>
<span class="line"><span>2213 27.1· 10−3 4.9· 10−3 0.635 0.297 4.42 3.15 38 13</span></span>
<span class="line"><span>2616 69.1· 10−3 8.2· 10−3 0.948 0.406 5.28 3.75 30 20</span></span>
<span class="line"><span>3019 0.180 14 .2· 10−3 1.38 0.587 6.20 4.50 23 34</span></span>
<span class="line"><span>3622 0.411 21 .7· 10−3 2.02 0.748 7.42 5.30 19 57</span></span>
<span class="line"><span>4229 1.15 41 .1· 10−3 2.66 1.40 8.60 6.81 13.5 104</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B.2 EE Core Data 1045</span></span>
<span class="line"><span>B.2 EE Core Data</span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>Fig. B.2 EE core</span></span>
<span class="line"><span>Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Core</span></span>
<span class="line"><span>type constant constant sectional winding length path weight</span></span>
<span class="line"><span>area area per turn length</span></span>
<span class="line"><span>(A) Kg Kgfe Ac WA MLT ℓm</span></span>
<span class="line"><span>(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) (g)</span></span>
<span class="line"><span>EE12 0 .731· 10−3 0.458· 10−3 0.14 0.085 2.28 2.7 2.34</span></span>
<span class="line"><span>EE16 2 .02· 10−3 0.842· 10−3 0.19 0.190 3.40 3.45 3.29</span></span>
<span class="line"><span>EE19 4 .07· 10−3 1.3· 10−3 0.23 0.284 3.69 3.94 4.83</span></span>
<span class="line"><span>EE22 8 .26· 10−3 1.8· 10−3 0.41 0.196 3.99 3.96 8.81</span></span>
<span class="line"><span>EE30 85 .7· 10−3 6.7· 10−3 1.09 0.476 6.60 5.77 32.4</span></span>
<span class="line"><span>EE40 0.209 11 .8· 10−3 1.27 1.10 8.50 7.70 50.3</span></span>
<span class="line"><span>EE50 0.909 28 .4· 10−3 2.26 1.78 10.0 9.58 116</span></span>
<span class="line"><span>EE60 1.38 36 .4· 10−3 2.47 2.89 12.8 11.0 135</span></span>
<span class="line"><span>EE70/68/19 5.06 75 .9· 10−3 3.24 6.75 14.0 18.0 280</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1046 B Magnetics Design Tables</span></span>
<span class="line"><span>B.3 EC Core Data</span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>Fig. B.3 EC core</span></span>
<span class="line"><span>Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Thermal Core</span></span>
<span class="line"><span>type constant constant sectional winding length path resistance weight</span></span>
<span class="line"><span>area area per turn length</span></span>
<span class="line"><span>(A) Kg Kgfe Ac WA MLT ℓm Rth</span></span>
<span class="line"><span>(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) ( ◦C/W) (g)</span></span>
<span class="line"><span>EC35 0.131 9 .9· 10−3 0.843 0.975 5.30 7.74 18.5 35.5</span></span>
<span class="line"><span>EC41 0.374 19 .5· 10−3 1.21 1.35 5.30 8.93 16.5 57.0</span></span>
<span class="line"><span>EC52 0.914 31 .7· 10−3 1.80 2.12 7.50 10.5 11.0 111</span></span>
<span class="line"><span>EC70 2.84 56 .2· 10−3 2.79 4.71 12.9 14.4 7.5 256</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B.4 ETD Core Data 1047</span></span>
<span class="line"><span>B.4 ETD Core Data</span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>Fig. B.4 ETD core</span></span>
<span class="line"><span>Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Thermal Core</span></span>
<span class="line"><span>type constant constant sectional winding length path resistance weight</span></span>
<span class="line"><span>area area per turn length</span></span>
<span class="line"><span>(A) Kg Kgfe Ac WA MLT ℓm Rth</span></span>
<span class="line"><span>(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) ( ◦C/W) (g)</span></span>
<span class="line"><span>ETD29 0.0978 8 .5· 10−3 0.76 0.903 5.33 7.20 30</span></span>
<span class="line"><span>ETD34 0.193 13 .1· 10−3 0.97 1.23 6.00 7.86 19 40</span></span>
<span class="line"><span>ETD39 0.397 19 .8· 10−3 1.25 1.74 6.86 9.21 15 60</span></span>
<span class="line"><span>ETD44 0.846 30 .4· 10−3 1.74 2.13 7.62 10.3 12 94</span></span>
<span class="line"><span>ETD49 1.42 41 .0· 10−3 2.11 2.71 8.51 11.4 11 124</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1048 B Magnetics Design Tables</span></span>
<span class="line"><span>B.5 PQ Core Data</span></span>
<span class="line"><span>A1</span></span>
<span class="line"><span>2D</span></span>
<span class="line"><span>Fig. B.5 PQ core</span></span>
<span class="line"><span>Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Core</span></span>
<span class="line"><span>type constant constant sectional winding length path weight</span></span>
<span class="line"><span>area area per turn length</span></span>
<span class="line"><span>(A1/2D) Kg Kgfe Ac WA MLT ℓm</span></span>
<span class="line"><span>(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) (g)</span></span>
<span class="line"><span>PQ20/16 22.4· 10−3 3.7· 10−3 0.62 0.256 4.4 3.74 13</span></span>
<span class="line"><span>PQ20/20 33.6· 10−3 4.8· 10−3 0.62 0.384 4.4 4.54 15</span></span>
<span class="line"><span>PQ26/20 83.9· 10−3 7.2· 10−3 1.19 0.333 5.62 4.63 31</span></span>
<span class="line"><span>PQ26/25 0.125 9 .4· 10−3 1.18 0.503 5.62 5.55 36</span></span>
<span class="line"><span>PQ32/20 0.203 11 .7· 10−3 1.70 0.471 6.71 5.55 42</span></span>
<span class="line"><span>PQ32/30 0.384 18 .6· 10−3 1.61 0.995 6.71 7.46 55</span></span>
<span class="line"><span>PQ35/35 0.820 30 .4· 10−3 1.96 1.61 7.52 8.79 73</span></span>
<span class="line"><span>PQ40/40 1.20 39 .1· 10−3 2.01 2.50 8.39 10.2 95</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B.6 American Wire Gauge Data 1049</span></span>
<span class="line"><span>B.6 American Wire Gauge Data</span></span>
<span class="line"><span>AWG # Bare area, Resistance, Diameter,</span></span>
<span class="line"><span>10−3 cm2 10−6Ω/cm cm</span></span>
<span class="line"><span>0000 1072.3 1.608 1.168</span></span>
<span class="line"><span>000 850.3 2.027 1.040</span></span>
<span class="line"><span>00 674.2 2.557 0.927</span></span>
<span class="line"><span>0 534.8 3.224 0.825</span></span>
<span class="line"><span>1 424.1 4.065 0.735</span></span>
<span class="line"><span>2 336.3 5.128 0.654</span></span>
<span class="line"><span>3 266.7 6.463 0.583</span></span>
<span class="line"><span>4 211.5 8.153 0.519</span></span>
<span class="line"><span>5 167.7 10.28 0.462</span></span>
<span class="line"><span>6 133.0 13.0 0.411</span></span>
<span class="line"><span>7 105.5 16.3 0.366</span></span>
<span class="line"><span>8 83.67 20.6 0.326</span></span>
<span class="line"><span>9 66.32 26.0 0.291</span></span>
<span class="line"><span>10 52.41 32.9 0.267</span></span>
<span class="line"><span>11 41.60 41.37 0.238</span></span>
<span class="line"><span>12 33.08 52.09 0.213</span></span>
<span class="line"><span>13 26.26 69.64 0.190</span></span>
<span class="line"><span>14 20.02 82.80 0.171</span></span>
<span class="line"><span>15 16.51 104.3 0.153</span></span>
<span class="line"><span>16 13.07 131.8 0.137</span></span>
<span class="line"><span>17 10.39 165.8 0.122</span></span>
<span class="line"><span>18 8.228 209.5 0.109</span></span>
<span class="line"><span>19 6.531 263.9 0.0948</span></span>
<span class="line"><span>20 5.188 332.3 0.0874</span></span>
<span class="line"><span>21 4.116 418.9 0.0785</span></span>
<span class="line"><span>22 3.243 531.4 0.0701</span></span>
<span class="line"><span>23 2.508 666.0 0.0632</span></span>
<span class="line"><span>24 2.047 842.1 0.0566</span></span>
<span class="line"><span>25 1.623 1062.0 0.0505</span></span>
<span class="line"><span>26 1.280 1345.0 0.0452</span></span>
<span class="line"><span>27 1.021 1687.6 0.0409</span></span>
<span class="line"><span>28 0.8046 2142.7 0.0366</span></span>
<span class="line"><span>29 0.6470 2664.3 0.0330</span></span>
<span class="line"><span>(continued)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1050 B Magnetics Design Tables</span></span>
<span class="line"><span>AWG # Bare area, Resistance, Diameter,</span></span>
<span class="line"><span>10−3 cm2 10−6Ω/cm cm</span></span>
<span class="line"><span>30 0.5067 3402.2 0.0294</span></span>
<span class="line"><span>31 0.4013 4294.6 0.0267</span></span>
<span class="line"><span>32 0.3242 5314.9 0.0241</span></span>
<span class="line"><span>33 0.2554 6748.6 0.0236</span></span>
<span class="line"><span>34 0.2011 8572.8 0.0191</span></span>
<span class="line"><span>35 0.1589 10849 0.0170</span></span>
<span class="line"><span>36 0.1266 13608 0.0152</span></span>
<span class="line"><span>37 0.1026 16801 0.0140</span></span>
<span class="line"><span>38 0.08107 21266 0.0124</span></span>
<span class="line"><span>39 0.06207 27775 0.0109</span></span>
<span class="line"><span>40 0.04869 35400 0.0096</span></span>
<span class="line"><span>41 0.03972 43405 0.00863</span></span>
<span class="line"><span>42 0.03166 54429 0.00762</span></span>
<span class="line"><span>43 0.02452 70308 0.00685</span></span>
<span class="line"><span>44 0.0202 85072 0.00635</span></span></code></pre></div>`,10)])])}const u=n(l,[["render",i]]);export{h as __pageData,u as default};
