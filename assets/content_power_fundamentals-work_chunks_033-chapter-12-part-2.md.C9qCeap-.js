import{_ as a,o as n,c as e,a5 as p}from"./chunks/framework.B5tqjWbr.js";const f=JSON.parse('{"title":"第12章part 2 - 12 Transformer Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第12章part 2 - 12 Transformer Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 513-514 > Chunk ID: `chapter-12-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/033-chapter-12-part-2.md","filePath":"content/power/fundamentals-work/chunks/033-chapter-12-part-2.md","lastUpdated":null}'),t={name:"content/power/fundamentals-work/chunks/033-chapter-12-part-2.md"};function l(i,s,r,c,o,h){return n(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="第12章part-2-12-transformer-design" tabindex="-1">第12章part 2 - 12 Transformer Design <a class="header-anchor" href="#第12章part-2-12-transformer-design" aria-label="Permalink to &quot;第12章part 2 - 12 Transformer Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 513-514<br> Chunk ID: <code>chapter-12-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>12.5 Summary 505</span></span>
<span class="line"><span>Kfe ( f )= Kfe 0</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝1+ a1</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ a2</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>+ a3</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)3</span></span>
<span class="line"><span>+ a4</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)4⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>where Kfe 0, a1, a2, a3, a4, and f0 are constants. In a typical converter transformer ap-</span></span>
<span class="line"><span>plication, the applied primary volt-seconds λ1 varies directly with the switching period</span></span>
<span class="line"><span>Ts = 1/ f . It is desired to choose the optimum switching frequency such that Kgfe , and</span></span>
<span class="line"><span>therefore the transformer size, are minimized.</span></span>
<span class="line"><span>(a) Show that the optimum switching frequency is a root of the polynomial</span></span>
<span class="line"><span>1+ a1</span></span>
<span class="line"><span>⎦β−1</span></span>
<span class="line"><span>β</span></span>
<span class="line"><span>)⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ a2</span></span>
<span class="line"><span>⎦β−2</span></span>
<span class="line"><span>β</span></span>
<span class="line"><span>)⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>+ a3</span></span>
<span class="line"><span>⎦β−3</span></span>
<span class="line"><span>β</span></span>
<span class="line"><span>)⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)3</span></span>
<span class="line"><span>+ a4</span></span>
<span class="line"><span>⎦β−4</span></span>
<span class="line"><span>β</span></span>
<span class="line"><span>)⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)4</span></span>
<span class="line"><span>Next, a core material is chosen whose core loss parameters are</span></span>
<span class="line"><span>β= 2.7 Kfe 0= 7.6</span></span>
<span class="line"><span>f0 = 100 kHz</span></span>
<span class="line"><span>a1 =−1.3 a2= 5.3</span></span>
<span class="line"><span>a3 =−0.5 a4= 0.075</span></span>
<span class="line"><span>The polynomial ﬁts the manufacturer’s published data over the range 10 kHz&lt;f&lt;1M H z .</span></span>
<span class="line"><span>(b)S k e t c hKfe vs. f</span></span>
<span class="line"><span>(c) Determine the value of f that minimizes Kgfe .</span></span>
<span class="line"><span>(d)S k e t c hKgfe ( f )/Kgfe (100 kHz), over the range 100 kHz≤f≤1 MHz. How sensitive</span></span>
<span class="line"><span>is the transformer size to the choice of switching frequency?</span></span>
<span class="line"><span>12.5 Transformer design to attain a given temperature rise. The temperature riseΔT of the cen-</span></span>
<span class="line"><span>ter leg of a ferrite core is directly proportional to the total power lossPtot of a transformer:</span></span>
<span class="line"><span>ΔT= Rth Ptot, where Rth is the thermal resistance of the transformer under given environ-</span></span>
<span class="line"><span>mental conditions. You may assume that this temperature rise has minimal dependence</span></span>
<span class="line"><span>on the distribution of losses within the transformer. It is desired to modify the Kgfe trans-</span></span>
<span class="line"><span>former design method, such that temperature rise ΔT replaces total power loss Ptot as a</span></span>
<span class="line"><span>speciﬁcation. You may neglect the dependence of the wire resistivityρon temperature.</span></span>
<span class="line"><span>(a) Modify the n-winding transformer Kgfe design method, as necessary. Deﬁne a new</span></span>
<span class="line"><span>core geometrical constant Kth that includes Rth.</span></span>
<span class="line"><span>(b) Thermal resistances of ferrite EC cores are listed in Sect. B.3 of Appendix B. Tabulate</span></span>
<span class="line"><span>Kth for these cores, using β= 2.7.</span></span>
<span class="line"><span>(c) A 750 W single-output full-bridge isolated buck dc–dc converter operates with con-</span></span>
<span class="line"><span>verter switching frequency fs= 200 kHz, dc input voltage Vg= 400 V, and dc output</span></span>
<span class="line"><span>voltage V = 48 V . The turns ratio is 6:1. The core loss equation parameters at 100</span></span>
<span class="line"><span>kHz are Kfe = 10 W/Tβcm3 and β= 2.7. Assume a ﬁll factor of Ku = 0.3. You may</span></span>
<span class="line"><span>neglect proximity losses. Use your design procedure of parts (a) and (b) to design a</span></span>
<span class="line"><span>transformer for this application, in which the temperature rise is limited to 20</span></span>
<span class="line"><span>◦C. Spec-</span></span>
<span class="line"><span>ify: EC core size, primary and secondary turns, wire sizes, and peak ac ﬂux density.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Part IV</span></span>
<span class="line"><span>Advanced Modeling, Analysis, and Control Techniques</span></span></code></pre></div>`,10)])])}const u=a(t,[["render",l]]);export{f as __pageData,u as default};
