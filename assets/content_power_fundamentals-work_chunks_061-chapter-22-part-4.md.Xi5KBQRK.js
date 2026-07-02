import{_ as n,o as e,c as s,a5 as t}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第22章part 4 - 22 Resonant Conversion","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第22章part 4 - 22 Resonant Conversion","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 991-991 > Chunk ID: `chapter-22-part-4`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/061-chapter-22-part-4.md","filePath":"content/power/fundamentals-work/chunks/061-chapter-22-part-4.md","lastUpdated":null}'),p={name:"content/power/fundamentals-work/chunks/061-chapter-22-part-4.md"};function r(i,a,o,l,c,h){return e(),s("div",null,[...a[0]||(a[0]=[t(`<h1 id="第22章part-4-22-resonant-conversion" tabindex="-1">第22章part 4 - 22 Resonant Conversion <a class="header-anchor" href="#第22章part-4-22-resonant-conversion" aria-label="Permalink to &quot;第22章part 4 - 22 Resonant Conversion&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 991-991<br> Chunk ID: <code>chapter-22-part-4</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>22.6 Summary of Key Points 993</span></span>
<span class="line"><span>frequency (consider only open-loop operation). The load R is a linear resistance which</span></span>
<span class="line"><span>can assume any positive value: 0≤R&lt;∞.</span></span>
<span class="line"><span>(a) Plot the output characteristics ( M vs. J), for all values of R in the range 0 ≤R&lt;</span></span>
<span class="line"><span>∞. Label mode boundaries, evaluate the short-circuit current, and give analytical</span></span>
<span class="line"><span>expressions for the output characteristics.</span></span>
<span class="line"><span>(b) Over what range of R (referred to the tank characteristic impedance R0) does the</span></span>
<span class="line"><span>converter operate as intended, in the k= 2 discontinuous conduction mode?</span></span>
<span class="line"><span>22.11 The parallel resonant converter as a single-phase high-quality rectiﬁer. It is desired to</span></span>
<span class="line"><span>utilize a transformer-isolated parallel resonant dc–dc converter in a single-phase low-</span></span>
<span class="line"><span>harmonic rectiﬁer system. By properly varying the converter switching frequency, a near-</span></span>
<span class="line"><span>ideal rectiﬁer system that can be modeled as in Fig. 21.16 is obtained. You may utilize</span></span>
<span class="line"><span>the results of Sect.22.5.2 to answer this problem. The parallel resonant tank network con-</span></span>
<span class="line"><span>tains an isolation transformer having a 1: n turns ratio. You may use either approximate</span></span>
<span class="line"><span>graphical analysis or computer iteration to answer parts (b) and (c).</span></span>
<span class="line"><span>(a) Plot the normalized input characteristics (normalized input voltage m</span></span>
<span class="line"><span>g = nvg/v vs.</span></span>
<span class="line"><span>normalized input current jg = ignR0/v) of the parallel resonant converter, operated</span></span>
<span class="line"><span>in the continuous conduction mode above resonance. Plot curves for F= fs/ f0 =</span></span>
<span class="line"><span>1.0, 1.1, 1.2, 1.3, 1.5, and 2.0. Compare these characteristics with the desired linear</span></span>
<span class="line"><span>resistive input characteristic vg/ig= Remulated.</span></span>
<span class="line"><span>(b) The converter is operated open-loop, with F= 1.1. The applied normalized input</span></span>
<span class="line"><span>voltage is a rectiﬁed sinusoid of unity magnitude: mg(t)=| sin(ωt)|.S k e t c ht h er e -</span></span>
<span class="line"><span>sulting normalized input current waveform jg(t). Approximately how large is the</span></span>
<span class="line"><span>peak current? The crossover dead time?</span></span>
<span class="line"><span>(c) A feedback loop is now added, which regulates the input current to follow the input</span></span>
<span class="line"><span>voltage such that ig(t)= vg(t)/Remulated. You may assume that the feedback loop oper-</span></span>
<span class="line"><span>ates perfectly. For the caseRemulated = R0, and with the same appliedmg(t) waveform</span></span>
<span class="line"><span>as in part (b), sketch the switching-frequency waveform for one ac line period [i.e.,</span></span>
<span class="line"><span>show how the controller must vary F to regulate ig(t)]. What is the maximum value</span></span>
<span class="line"><span>of F? Note: In practice, the converter would be designed to operate with a smaller</span></span>
<span class="line"><span>peak value of jg, so that the switching-frequency variations would be better behaved.</span></span>
<span class="line"><span>(d) Choose element values (tank inductance, tank capacitance, and transformer turns</span></span>
<span class="line"><span>ratio) such that the converter of part (c) meets the following speciﬁcations:</span></span>
<span class="line"><span>Ac input voltage 120 Vrms, 60 Hz</span></span>
<span class="line"><span>Dc output voltage 42 V</span></span>
<span class="line"><span>Average power 800 W</span></span>
<span class="line"><span>Maximum switching frequency 200 kHz</span></span>
<span class="line"><span>Refer the element values to the primary side of the transformer.</span></span></code></pre></div>`,10)])])}const m=n(p,[["render",r]]);export{u as __pageData,m as default};
