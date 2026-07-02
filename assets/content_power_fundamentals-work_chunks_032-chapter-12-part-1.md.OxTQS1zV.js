import{_ as n,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第12章part 1 - 12 Transformer Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第12章part 1 - 12 Transformer Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 493-512 > Chunk ID: `chapter-12-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/032-chapter-12-part-1.md","filePath":"content/power/fundamentals-work/chunks/032-chapter-12-part-1.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/032-chapter-12-part-1.md"};function i(t,s,c,r,o,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="第12章part-1-12-transformer-design" tabindex="-1">第12章part 1 - 12 Transformer Design <a class="header-anchor" href="#第12章part-1-12-transformer-design" aria-label="Permalink to &quot;第12章part 1 - 12 Transformer Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 493-512<br> Chunk ID: <code>chapter-12-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>12</span></span>
<span class="line"><span>Transformer Design</span></span>
<span class="line"><span>In the design methods of the previous chapter, copper loss Pcu and maximum ﬂux density Bmax</span></span>
<span class="line"><span>are speciﬁed, while core loss Pfe is not speciﬁcally addressed. This approach is appropriate for</span></span>
<span class="line"><span>a number of applications, such as the ﬁlter inductor in which the dominant design constraints</span></span>
<span class="line"><span>are copper loss and saturation ﬂux density. However, in a substantial class of applications, the</span></span>
<span class="line"><span>operating ﬂux density is limited by core loss rather than saturation. For example, in a conven-</span></span>
<span class="line"><span>tional high-frequency transformer, it is usually necessary to limit the core loss by operating at a</span></span>
<span class="line"><span>reduced value of the peak ac ﬂux densityΔB.</span></span>
<span class="line"><span>Design of core loss-limited magnetic devices is characterized by ﬁnding the ac ﬂux density</span></span>
<span class="line"><span>that minimizes total core plus copper loss. Typically, this optimization problem also involves</span></span>
<span class="line"><span>optimization of the winding geometry to control ac proximity losses, and possibly incorpora-</span></span>
<span class="line"><span>tion of other constraints such as galvanic isolation. Consequently, multiple design iterations are</span></span>
<span class="line"><span>required. In this chapter, the basic design equations are developed, and a ﬁrst-pass design that</span></span>
<span class="line"><span>minimizes the total core loss plus dc copper loss is found. The winding geometry can then be</span></span>
<span class="line"><span>estimated, and ac proximity losses can be analyzed as described in Sect. 10.4. The design can</span></span>
<span class="line"><span>then be iterated as needed.</span></span>
<span class="line"><span>This chapter covers the general transformer design problem. It is desired to design a k-</span></span>
<span class="line"><span>winding transformer as illustrated in Fig. 12.1. Both copper loss Pcu and core loss Pfe are mod-</span></span>
<span class="line"><span>eled. As the operating ﬂux density is increased (by decreasing the number of turns), the copper</span></span>
<span class="line"><span>loss is decreased but the core loss is increased. We will determine the operating ﬂux density that</span></span>
<span class="line"><span>minimizes the total power loss Ptot = Pfe + Pcu.</span></span>
<span class="line"><span>It is possible to generalize the core geometrical constant Kg design method, derived in the</span></span>
<span class="line"><span>previous chapter, to treat the design of magnetic devices when both copper loss and core loss</span></span>
<span class="line"><span>are signiﬁcant. This leads to the geometrical constant Kgfe , a measure of the eﬀective magnetic</span></span>
<span class="line"><span>size of core in a transformer design application. Several examples of transformer designs via</span></span>
<span class="line"><span>the Kgfe method are given in this chapter. A similar procedure is also derived, for design of</span></span>
<span class="line"><span>single-winding inductors in which core loss is signiﬁcant.</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_12</span></span>
<span class="line"><span>485</span></span>
<span class="line"><span></span></span>
<span class="line"><span>486 12 Transformer Design</span></span>
<span class="line"><span>Fig. 12.1 A k-winding transformer, in which</span></span>
<span class="line"><span>both core loss and copper loss are signiﬁcant</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>: nk</span></span>
<span class="line"><span>R1 R2</span></span>
<span class="line"><span>Rk</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vk(t)</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>ik(t)</span></span>
<span class="line"><span>12.1 Transformer Design: Basic Constraints</span></span>
<span class="line"><span>As in the case of the ﬁlter inductor design, we can write several basic constraining equations.</span></span>
<span class="line"><span>These equations can then be combined into a single equation for selection of the core size. In</span></span>
<span class="line"><span>the case of transformer design, the basic constraints describe the core loss, ﬂux density, copper</span></span>
<span class="line"><span>loss, and total power loss vs. ﬂux density. The ﬂux density is then chosen to optimize the total</span></span>
<span class="line"><span>power loss.</span></span>
<span class="line"><span>12.1.1 Core Loss</span></span>
<span class="line"><span>As described in Chap. 10, the total core loss Pfe depends on the peak ac ﬂux density ΔB,t h e</span></span>
<span class="line"><span>operating frequency f , and the volume of the core. At a given frequency, we can approximate</span></span>
<span class="line"><span>the core loss by a function of the form</span></span>
<span class="line"><span>Pfe = Kfe (ΔB)βAcℓm (12.1)</span></span>
<span class="line"><span>Again, Ac is the core cross-sectional area,ℓm is the core mean magnetic path length, and hence</span></span>
<span class="line"><span>Acℓm is the volume of the core. Kfe is a constant of proportionality which depends on the</span></span>
<span class="line"><span>operating frequency. The exponent β is determined from the core manufacturer’s published</span></span>
<span class="line"><span>data. Typically, the value of β for ferrite power materials is approximately 2.6; for other core</span></span>
<span class="line"><span>materials, this exponent lies in the range 2 to 3. Equation ( 12.1) generally assumes that the</span></span>
<span class="line"><span>applied waveforms are sinusoidal; eﬀects of waveform harmonic content are ignored here.</span></span>
<span class="line"><span>12.1.2 Flux Density</span></span>
<span class="line"><span>An arbitrary periodic primary voltage waveformv1(t) is illustrated in Fig.12.2. The volt-seconds</span></span>
<span class="line"><span>applied during the positive portion of the waveform is denotedλ1:</span></span>
<span class="line"><span>λ1=</span></span>
<span class="line"><span>∫ t2</span></span>
<span class="line"><span>t1</span></span>
<span class="line"><span>v1(t)dt (12.2)</span></span>
<span class="line"><span>These volt-seconds, or ﬂux-linkages, cause the ﬂux density to change from its negative peak to</span></span>
<span class="line"><span>its positive peak value. Hence, from Faraday’s law, the peak value of the ac component of the</span></span>
<span class="line"><span>ﬂux density is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.1 Transformer Design: Basic Constraints 487</span></span>
<span class="line"><span>Fig. 12.2 An arbitrary transformer pri-</span></span>
<span class="line"><span>mary voltage waveform, illustrating the</span></span>
<span class="line"><span>volt-seconds applied during the positive</span></span>
<span class="line"><span>portion of the cycle</span></span>
<span class="line"><span>area 1</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>t1 t2 t</span></span>
<span class="line"><span>ΔB= λ1</span></span>
<span class="line"><span>2n1Ac</span></span>
<span class="line"><span>(12.3)</span></span>
<span class="line"><span>Note that, for a given applied voltage waveform and λ1, we can reduce ΔB by increasing the</span></span>
<span class="line"><span>primary turns n1. This has the eﬀect of decreasing the core loss according to Eq. (12.1). However,</span></span>
<span class="line"><span>it also causes the copper loss to increase, since the new windings will be comprised of more</span></span>
<span class="line"><span>turns of smaller wire. As a result, there is an optimal choice for ΔB, in which the total loss is</span></span>
<span class="line"><span>minimized. In the next sections, we will determine the optimal ΔB. Having done so, we can</span></span>
<span class="line"><span>then use Eq. (12.3) to determine the primary turns n1, as follows:</span></span>
<span class="line"><span>n1= λ1</span></span>
<span class="line"><span>2ΔBAc</span></span>
<span class="line"><span>(12.4)</span></span>
<span class="line"><span>It should also be noted that, in some converter topologies such as the forward converter with</span></span>
<span class="line"><span>conventional reset winding, the ﬂux density B(t) and the magnetizing current iM(t) are not al-</span></span>
<span class="line"><span>lowed to be negative. In consequence, the instantaneous ﬂux density B(t) contains a dc bias.</span></span>
<span class="line"><span>Provided that the core does not approach saturation, this dc bias does not signiﬁcantly a ﬀect</span></span>
<span class="line"><span>the core loss: core loss is determined by the ac component of B(t). Equations (12.2)t o( 12.4)</span></span>
<span class="line"><span>continue to apply to this case, sinceΔB is the peak value of the ac component of B(t).</span></span>
<span class="line"><span>12.1.3 Copper Loss</span></span>
<span class="line"><span>As shown in Sect. 11.3.1, the total copper loss is minimized when the core window area WA is</span></span>
<span class="line"><span>allocated to the various windings according to their relative apparent powers. The total copper</span></span>
<span class="line"><span>loss is then given by Eq. (11.34). This equation can be expressed in the form</span></span>
<span class="line"><span>Pcu= ρ(MLT )n2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot</span></span>
<span class="line"><span>WAKu</span></span>
<span class="line"><span>(12.5)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Itot =</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>nj</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>Ij (12.6)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>488 12 Transformer Design</span></span>
<span class="line"><span>is the sum of the rms winding currents, referred to winding 1. Use of Eq. (12.4) to eliminate n1</span></span>
<span class="line"><span>from Eq. (12.5) leads to</span></span>
<span class="line"><span>Pcu=</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot</span></span>
<span class="line"><span>4Ku</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎦(MLT )</span></span>
<span class="line"><span>WAA2c</span></span>
<span class="line"><span>)⎦ 1</span></span>
<span class="line"><span>ΔB</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(12.7)</span></span>
<span class="line"><span>The right-hand side of Eq. ( 12.7) is grouped into three terms. The ﬁrst group contains speciﬁ-</span></span>
<span class="line"><span>cations, while the second group is a function of the core geometry. The last term is a function</span></span>
<span class="line"><span>ofΔB, to be chosen to optimize the design. It can be seen that copper loss varies as the inverse</span></span>
<span class="line"><span>square ofΔB; increasingΔB reduces Pcu.</span></span>
<span class="line"><span>The increased copper loss due to the proximity eﬀect is not explicitly accounted for in this</span></span>
<span class="line"><span>design procedure. In practice, the proximity loss must be estimated after the core and winding</span></span>
<span class="line"><span>geometries are known. However, the increased ac resistance due to proximity loss can be ac-</span></span>
<span class="line"><span>counted for in the design procedure. The eﬀective value of the wire resistivityρis increased by</span></span>
<span class="line"><span>a factor equal to the estimated ratio R</span></span>
<span class="line"><span>ac/Rdc. When the core geometry is known, the engineer</span></span>
<span class="line"><span>can attempt to implement the windings such that the estimated Rac/Rdc is obtained. Several</span></span>
<span class="line"><span>design iterations may be needed.</span></span>
<span class="line"><span>12.1.4 Total Power Loss vs.ΔB</span></span>
<span class="line"><span>The total power loss Ptot is found by adding Eqs. (12.1) and (12.7):</span></span>
<span class="line"><span>Ptot = Pfe + Pcu (12.8)</span></span>
<span class="line"><span>The dependence of Pfe, Pcu, and Ptot onΔB is sketched in Fig. 12.3.</span></span>
<span class="line"><span>Fig. 12.3 Dependence of cop-</span></span>
<span class="line"><span>per loss, core loss, and total loss</span></span>
<span class="line"><span>on peak ac ﬂux density</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>Power</span></span>
<span class="line"><span>loss</span></span>
<span class="line"><span>Ptot</span></span>
<span class="line"><span>Copper loss P</span></span>
<span class="line"><span>cu Core loss P</span></span>
<span class="line"><span>fe</span></span>
<span class="line"><span>Optimum B</span></span>
<span class="line"><span>12.1.5 Optimum Flux Density</span></span>
<span class="line"><span>Let us now choose the value ofΔB that minimizes Eq. (12.8). At the optimumΔB, we can write</span></span>
<span class="line"><span>dPtot</span></span>
<span class="line"><span>d(ΔB)= dP fe</span></span>
<span class="line"><span>d(ΔB)+ dPcu</span></span>
<span class="line"><span>d(ΔB)= 0 (12.9)</span></span>
<span class="line"><span>Note that the optimum does not necessarily occur where Pfe = Pcu. Rather, it occurs where</span></span>
<span class="line"><span>dP fe</span></span>
<span class="line"><span>d(ΔB)=−dPcu</span></span>
<span class="line"><span>d(ΔB) (12.10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.1 Transformer Design: Basic Constraints 489</span></span>
<span class="line"><span>The derivatives of the core and copper losses with respect toΔB are given by</span></span>
<span class="line"><span>dP fe</span></span>
<span class="line"><span>d(ΔB)= βKfe (ΔB)(β−1)Acℓm (12.11)</span></span>
<span class="line"><span>dPcu</span></span>
<span class="line"><span>d(ΔB)=−2</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot</span></span>
<span class="line"><span>4Ku</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎦(MLT )</span></span>
<span class="line"><span>WAA2c</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(ΔB)−3 (12.12)</span></span>
<span class="line"><span>Substitution of Eqs. (12.11) and (12.12) into Eq. (12.10), and solution forΔB, leads to the opti-</span></span>
<span class="line"><span>mum ﬂux density</span></span>
<span class="line"><span>ΔB=</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎣</span></span>
<span class="line"><span>ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot</span></span>
<span class="line"><span>2Ku</span></span>
<span class="line"><span>(MLT )</span></span>
<span class="line"><span>WAA3cℓm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>βKfe</span></span>
<span class="line"><span>⎤⎥⎥⎥⎥⎦</span></span>
<span class="line"><span>⎦ 1</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(12.13)</span></span>
<span class="line"><span>The resulting total power loss is found by substitution of Eq. ( 12.13)i n t o( 12.1), ( 12.8),</span></span>
<span class="line"><span>and (12.9). Simpliﬁcation of the resulting expression leads to</span></span>
<span class="line"><span>Ptot =</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>AcℓmKfe</span></span>
<span class="line"><span>]⎦2</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>) ⎡⎢⎢⎢⎢⎣</span></span>
<span class="line"><span>ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot</span></span>
<span class="line"><span>4Ku</span></span>
<span class="line"><span>(MLT )</span></span>
<span class="line"><span>WAA2c</span></span>
<span class="line"><span>⎤⎥⎥⎥⎥⎦</span></span>
<span class="line"><span>⎦β</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>) ⎡⎢⎢⎢⎢⎢⎢⎣</span></span>
<span class="line"><span>⎦β</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)−</span></span>
<span class="line"><span>⎦β</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦β</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)⎦ 2</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)⎤⎥⎥⎥⎥⎥⎥⎦ (12.14)</span></span>
<span class="line"><span>This expression can be regrouped, as follows:</span></span>
<span class="line"><span>WA(Ac)(2(β−1)/β)</span></span>
<span class="line"><span>(MLT )ℓ(2/β)</span></span>
<span class="line"><span>m</span></span>
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
<span class="line"><span>=</span></span>
<span class="line"><span>ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot K(2/β)</span></span>
<span class="line"><span>fe</span></span>
<span class="line"><span>4Ku(Ptot)((β+2)/β) (12.15)</span></span>
<span class="line"><span>The terms on the left side of Eq. ( 12.15) depend on the core geometry, while the terms on</span></span>
<span class="line"><span>the right side depend on speciﬁcations regarding the application ( ρ, Itot,λ1, Ku, Ptot) and the</span></span>
<span class="line"><span>desired core material (Kfe, β). The left side of Eq. (12.15) can be deﬁned as the core geometrical</span></span>
<span class="line"><span>constant Kgfe :</span></span>
<span class="line"><span>Kgfe = WA(Ac)(2(β−1)/β)</span></span>
<span class="line"><span>(MLT )ℓ(2/β)</span></span>
<span class="line"><span>m</span></span>
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
<span class="line"><span>)⎦ 2</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)⎤⎥⎥⎥⎥⎥⎥⎦</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>⎦β+2</span></span>
<span class="line"><span>β</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(12.16)</span></span>
<span class="line"><span>Hence, to design a transformer, the right side of Eq. ( 12.15) is evaluated. A core is selected</span></span>
<span class="line"><span>whose Kgfe exceeds this value:</span></span>
<span class="line"><span>Kgfe ≥</span></span>
<span class="line"><span>ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot K(2/β)</span></span>
<span class="line"><span>fe</span></span>
<span class="line"><span>4Ku(Ptot)((β+2)/β) (12.17)</span></span>
<span class="line"><span>The quantity Kgfe is similar to the geometrical constant Kg used in the previous chapter to</span></span>
<span class="line"><span>design magnetics when core loss is negligible. Kgfe is a measure of the magnetic size of a core,</span></span>
<span class="line"><span>for applications in which core loss is signiﬁcant. Unfortunately, Kgfe depends on β, and hence</span></span>
<span class="line"><span>the choice of core material aﬀects the value of Kgfe . However, the β of most high-frequency</span></span>
<span class="line"><span>ferrite materials lies in the narrow range 2.6 to 2.8, and Kgfe varies by no more than±5% over</span></span>
<span class="line"><span>this range. Appendix B lists the values of Kgfe for various standard ferrite cores, for the value</span></span>
<span class="line"><span>β= 2.7.</span></span>
<span class="line"><span>Once a core has been selected, then the values of Ac, WA,ℓ m, and MLT are known. The</span></span>
<span class="line"><span>peak ac ﬂux densityΔB can then be evaluated using Eq. (12.13), and the primary turnsn1 can be</span></span>
<span class="line"><span>found using Eq. (12.4). The number of turns for the remaining windings can be computed using</span></span>
<span class="line"><span></span></span>
<span class="line"><span>490 12 Transformer Design</span></span>
<span class="line"><span>the desired turns ratios. The various window area allocations are found using Eq. ( 11.35). The</span></span>
<span class="line"><span>wire sizes for the various windings can then be computed as discussed in the previous chapter,</span></span>
<span class="line"><span>Aw, j= KuWAαj</span></span>
<span class="line"><span>nj</span></span>
<span class="line"><span>(12.18)</span></span>
<span class="line"><span>where Aw, j is the wire area for winding j.</span></span>
<span class="line"><span>12.2 A First-Pass Transformer Design Procedure</span></span>
<span class="line"><span>The procedure developed in the previous sections is summarized below. As in the ﬁlter inductor</span></span>
<span class="line"><span>design procedure of the previous chapter, this simple transformer design procedure should be</span></span>
<span class="line"><span>regarded as a ﬁrst-pass approach. Numerous issues have been neglected, including detailed</span></span>
<span class="line"><span>insulation requirements, conductor eddy current losses, temperature rise, roundoﬀof number of</span></span>
<span class="line"><span>turns, etc.</span></span>
<span class="line"><span>The following quantities are speciﬁed, using the units noted:</span></span>
<span class="line"><span>Wire eﬀective resistivity ρ (Ω-cm)</span></span>
<span class="line"><span>Total rms winding currents, referred to primary I</span></span>
<span class="line"><span>tot =</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>nj</span></span>
<span class="line"><span>ni</span></span>
<span class="line"><span>Ij (A)</span></span>
<span class="line"><span>Desired turns ratios n2/n1, n3/n1,e t c .</span></span>
<span class="line"><span>Applied primary volt-seconds λ1=</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>positive</span></span>
<span class="line"><span>portion</span></span>
<span class="line"><span>o f cycle</span></span>
<span class="line"><span>v1(t) dt (V-sec)</span></span>
<span class="line"><span>Allowed total power dissipation Ptot (W)</span></span>
<span class="line"><span>Winding ﬁll factor Ku</span></span>
<span class="line"><span>Core loss exponent β</span></span>
<span class="line"><span>Core loss coeﬃcient Kfe (W/cm3Tβ)</span></span>
<span class="line"><span>The core dimensions are expressed in cm:</span></span>
<span class="line"><span>Core cross-sectional area Ac (cm2)</span></span>
<span class="line"><span>Core window area WA (cm2)</span></span>
<span class="line"><span>Mean length per turn MLT (cm)</span></span>
<span class="line"><span>Magnetic path length ℓm (cm)</span></span>
<span class="line"><span>Peak ac ﬂux density ΔB (Tesla)</span></span>
<span class="line"><span>Wire areas Aw1, Aw2,... (cm2)</span></span>
<span class="line"><span>The use of centimeters rather than meters requires that appropriate factors be added to the</span></span>
<span class="line"><span>design equations.</span></span>
<span class="line"><span>12.2.1 Procedure</span></span>
<span class="line"><span>1. Determine core size.</span></span>
<span class="line"><span>Kgfe ≥</span></span>
<span class="line"><span>ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot K(2/β)</span></span>
<span class="line"><span>fe</span></span>
<span class="line"><span>4Ku(Ptot)((β+2)/β) 108 (12.19)</span></span>
<span class="line"><span>Choose a core that is large enough to satisfy this inequality. If necessary, it may be possible</span></span>
<span class="line"><span>to use a smaller core by choosing a core material having lower loss, i.e., smaller Kfe .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.2 A First-Pass Transformer Design Procedure 491</span></span>
<span class="line"><span>2. Evaluate peak ac f lux density .</span></span>
<span class="line"><span>ΔB=</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎣108ρλ2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot</span></span>
<span class="line"><span>2Ku</span></span>
<span class="line"><span>(MLT )</span></span>
<span class="line"><span>WAA3cℓm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>βKfe</span></span>
<span class="line"><span>⎤⎥⎥⎥⎥⎦</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(12.20)</span></span>
<span class="line"><span>Check whetherΔB is greater than the core material saturation ﬂux density. If the core op-</span></span>
<span class="line"><span>erates with a ﬂux dc bias, then the dc bias plus ΔB should not exceed the saturation ﬂux</span></span>
<span class="line"><span>density. Proceed to the next step if adequate margins exist to prevent saturation. Otherwise,</span></span>
<span class="line"><span>(1) repeat the procedure using a core material having greater core loss, or (2) use the Kg</span></span>
<span class="line"><span>design method, in which the maximum ﬂux density is speciﬁed.</span></span>
<span class="line"><span>3. Evaluate primary turns .</span></span>
<span class="line"><span>n1= λ1</span></span>
<span class="line"><span>2ΔBAc</span></span>
<span class="line"><span>104 (12.21)</span></span>
<span class="line"><span>4. Choose numbers o f turns f or other windings .</span></span>
<span class="line"><span>According to the desired turns ratios:</span></span>
<span class="line"><span>n2 = n1</span></span>
<span class="line"><span>⎦n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>n3 = n1</span></span>
<span class="line"><span>⎦n3</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(12.22)</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>5. Evaluate f raction o f window area allocated to each winding .</span></span>
<span class="line"><span>α1 = n1I1</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>α2 = n2I2</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>..</span></span>
<span class="line"><span>. (12.23)</span></span>
<span class="line"><span>α</span></span>
<span class="line"><span>k = nk Ik</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>6. Evaluate wire sizes .</span></span>
<span class="line"><span>Aw1 ≤α1KuWA</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>Aw2 ≤α2KuWA</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>(12.24)</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Choose wire gauges to satisfy these criteria.</span></span>
<span class="line"><span>A winding geometry can now be determined, and copper losses due to the proximity eﬀect</span></span>
<span class="line"><span>can be evaluated. If these losses are signiﬁcant, it may be desirable to further optimize the</span></span>
<span class="line"><span>design by reiterating the above steps, accounting for proximity losses by increasing the eﬀective</span></span>
<span class="line"><span></span></span>
<span class="line"><span>492 12 Transformer Design</span></span>
<span class="line"><span>wire resistivity to the value ρef f = ρcuPcu/Pdc, where Pcu is the actual copper loss including</span></span>
<span class="line"><span>proximity eﬀects, and Pdc is the copper loss obtained when the proximity eﬀect is negligible.</span></span>
<span class="line"><span>If desired, the power losses and transformer model parameters can now be checked. For the</span></span>
<span class="line"><span>simple model of Fig. 12.4, the following parameters are estimated:</span></span>
<span class="line"><span>Magnetizing inductance, referred to winding 1: LM = μn2</span></span>
<span class="line"><span>1Ac</span></span>
<span class="line"><span>ℓm</span></span>
<span class="line"><span>Peak ac magnetizing current, referred to winding 1: iM,pk= λ1</span></span>
<span class="line"><span>2LM</span></span>
<span class="line"><span>Winding resistances:</span></span>
<span class="line"><span>R1 = ρn1(MLT )</span></span>
<span class="line"><span>Aw1</span></span>
<span class="line"><span>R2 = ρn2(MLT )</span></span>
<span class="line"><span>Aw2</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>The core loss, copper loss, and total power loss can be determined using Eqs. ( 12.1), (12.7),</span></span>
<span class="line"><span>and (12.8), respectively.</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>: nk</span></span>
<span class="line"><span>R1 R2</span></span>
<span class="line"><span>Rk</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>ik(t)</span></span>
<span class="line"><span>LM</span></span>
<span class="line"><span>iM(t)</span></span>
<span class="line"><span>Fig. 12.4 Computed elements of simple transformer model</span></span>
<span class="line"><span>12.3 Examples</span></span>
<span class="line"><span>12.3.1 Example 1: Single-Output Isolated ´Cuk Converter</span></span>
<span class="line"><span>As an example, let us consider the design of a simple two-winding transformer for the ´Cuk</span></span>
<span class="line"><span>converter of Fig. 12.5. This transformer is to be optimized at the operating point shown, corre-</span></span>
<span class="line"><span>sponding to D= 0.5. The steady-state converter solution is Vc1 = Vg, Vc2 = V. The desired</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.3 Examples 493</span></span>
<span class="line"><span>transformer turns ratio is n= n1/n2= 5. The switching frequency is fs= 200 kHz, correspond-</span></span>
<span class="line"><span>ing to Ts= 5μs. A ferrite pot core is to be used; at 200 kHz, the chosen ferrite core material is</span></span>
<span class="line"><span>described by the following parameters: Kfe = 24.7W/Tβcm3, β= 2.6. A ﬁll factor of Ku= 0.5</span></span>
<span class="line"><span>is assumed. Total power loss of Ptot = 0.25 W is allowed. Copper wire, having a resistivity of</span></span>
<span class="line"><span>ρ= 1.724· 10−6Ω-cm, is to be used.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>5 V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>25 V</span></span>
<span class="line"><span>n : 1</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>20 A</span></span>
<span class="line"><span>Ig</span></span>
<span class="line"><span>4 A</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)v1(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>vC2(t)++ vC1(t)</span></span>
<span class="line"><span>Fig. 12.5 Isolated ´Cuk converter example</span></span>
<span class="line"><span>Fig. 12.6 Waveforms, ´Cuk</span></span>
<span class="line"><span>converter transformer design</span></span>
<span class="line"><span>example</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>Area 1VC1</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>D Ts</span></span>
<span class="line"><span>I/n</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>Transformer waveforms are illustrated in Fig.12.6. The applied primary volt-seconds are</span></span>
<span class="line"><span>λ1= DT sVc1 = (0.5)(5μsec)(25 V) (12.25)</span></span>
<span class="line"><span>= 62.5V−μsec</span></span>
<span class="line"><span>The primary rms current is</span></span>
<span class="line"><span>I1=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>⎦I</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>+ D′(Ig)2= 4A (12.26)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>494 12 Transformer Design</span></span>
<span class="line"><span>It is assumed that the rms magnetizing current is much smaller than the rms winding currents.</span></span>
<span class="line"><span>Since the transformer contains only two windings, the secondary rms current is equal to</span></span>
<span class="line"><span>I2= nI1= 20 A (12.27)</span></span>
<span class="line"><span>The total rms winding current, referred to the primary, is</span></span>
<span class="line"><span>Itot = I1+ 1</span></span>
<span class="line"><span>n I2= 8 A (12.28)</span></span>
<span class="line"><span>The core size is evaluated using Eq. (12.19):</span></span>
<span class="line"><span>Kgfe ≥(1.724· 10−6)(62.5· 10−6)2(8)2(24.7)(2/26)</span></span>
<span class="line"><span>4(0.5)(0.25)(4.6/2.6) 108</span></span>
<span class="line"><span>= 0.00295 (12.29)</span></span>
<span class="line"><span>The pot core data of Appendix B lists the 2213 pot core with Kgfe = 0.0049 for β = 2.7.</span></span>
<span class="line"><span>Evaluation of Eq. (12.16) shows that Kgfe = 0.0047 for this core, when β= 2.6. In any event,</span></span>
<span class="line"><span>2213 is the smallest standard pot core size having Kgfe ≤0.00295. The increased value of</span></span>
<span class="line"><span>Kgfe should lead to lower total power loss. The peak ac ﬂux density is found by evaluation of</span></span>
<span class="line"><span>Eq. (12.20), using the geometrical data for the 2213 pot core:</span></span>
<span class="line"><span>ΔB=</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>108 (1.724· 10−6)(62.5· 10−6)2(8)2</span></span>
<span class="line"><span>2(0.5)</span></span>
<span class="line"><span>(4.42)</span></span>
<span class="line"><span>(0.297)(0.635)3(3.15)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>(2.6)(24.7)</span></span>
<span class="line"><span>](1/4.6)</span></span>
<span class="line"><span>(12.30)</span></span>
<span class="line"><span>= 0.0858Tesla</span></span>
<span class="line"><span>This ﬂux density is considerably less than the saturation ﬂux density of approximately 0.35</span></span>
<span class="line"><span>Tesla. The primary turns are determined by evaluation of Eq. (12.21):</span></span>
<span class="line"><span>n1 = 104 (62.5· 10−6)</span></span>
<span class="line"><span>2(0.0858)(0.635) (12.31)</span></span>
<span class="line"><span>= 5.74 turns</span></span>
<span class="line"><span>The secondary turns are found by evaluation of Eq. ( 12.22). It is desired that the transformer</span></span>
<span class="line"><span>have a 5:1 turns ratio, and hence</span></span>
<span class="line"><span>n2= n1</span></span>
<span class="line"><span>n = 1.15 turns (12.32)</span></span>
<span class="line"><span>In practice, we might select n1 = 5 and n2 = 1. This would lead to a slightly higher ΔB and</span></span>
<span class="line"><span>slightly higher loss.</span></span>
<span class="line"><span>The fraction of the window area allocated to windings 1 and 2 are determined using</span></span>
<span class="line"><span>Eq. (12.23):</span></span>
<span class="line"><span>α1 = (4A)</span></span>
<span class="line"><span>(8A)= 0.5 (12.33)</span></span>
<span class="line"><span>α2 =</span></span>
<span class="line"><span>(1</span></span>
<span class="line"><span>5 )(20A)</span></span>
<span class="line"><span>(8A) = 0.5</span></span>
<span class="line"><span>For this example, the window area is divided equally between the primary and secondary wind-</span></span>
<span class="line"><span>ings, since the ratio of their rms currents is equal to the turns ratio. We can now evaluate the</span></span>
<span class="line"><span>primary and secondary wire areas, via Eq. (12.24):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.3 Examples 495</span></span>
<span class="line"><span>Aw1 = (0.5)(0.5)(0.297)</span></span>
<span class="line"><span>(5) = 14.8· 10−3cm2</span></span>
<span class="line"><span>Aw2 = (0.5)(0.5)(0.297)</span></span>
<span class="line"><span>(1) = 74.2· 10−3cm2 (12.34)</span></span>
<span class="line"><span>The wire gauge is selected using the wire table of Appendix B. AWG #16 has area 13 .07·</span></span>
<span class="line"><span>10−3cm2, and is suitable for the primary winding. AWG #9 is suitable for the secondary winding,</span></span>
<span class="line"><span>with area 66.3· 10−3cm2. These are very large conductors, and one turn of AWG #9 is not</span></span>
<span class="line"><span>a practical solution! We can also expect signiﬁcant proximity losses, and signiﬁcant leakage</span></span>
<span class="line"><span>inductance. In practice, interleaved foil windings might be used. Alternatively, Litz wire or</span></span>
<span class="line"><span>several parallel strands of smaller wire could be employed.</span></span>
<span class="line"><span>It is a worthwhile exercise to repeat the above design at several di ﬀerent switching fre-</span></span>
<span class="line"><span>quencies, to determine how transformer size varies with switching frequency. As the switching</span></span>
<span class="line"><span>frequency is increased, the core loss coeﬃcient Kfe increases. Figure 12.7 illustrates the trans-</span></span>
<span class="line"><span>former pot core size, for various switching frequencies over the range 25 kHz to 1 MHz, for this</span></span>
<span class="line"><span>´Cuk converter example using P material withPtot &lt; 0.25 W. Peak ﬂux densities in Tesla are also</span></span>
<span class="line"><span>plotted. For switching frequencies below 250 kHz, increasing the frequency causes the core size</span></span>
<span class="line"><span>to decrease. This occurs because of the decreased applied volt-secondsλ</span></span>
<span class="line"><span>1. Over this range, the</span></span>
<span class="line"><span>optimalΔB is essentially independent of switching frequency; the ΔB variations shown occur</span></span>
<span class="line"><span>owing to quantization of core sizes.</span></span>
<span class="line"><span>For switching frequencies greater than 250 kHz, increasing frequency causes greatly in-</span></span>
<span class="line"><span>creased core loss. Maintaining Ptot ≤0.25W then requires thatΔB be reduced, and hence the</span></span>
<span class="line"><span>core size is increased. The minimum transformer size for this example is apparently obtained at</span></span>
<span class="line"><span>250 kHz.</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.02</span></span>
<span class="line"><span>0.04</span></span>
<span class="line"><span>0.06</span></span>
<span class="line"><span>0.08</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>Switching frequency</span></span>
<span class="line"><span>B, Tesla</span></span>
<span class="line"><span>Pot core size</span></span>
<span class="line"><span>4226</span></span>
<span class="line"><span>3622</span></span>
<span class="line"><span>2616</span></span>
<span class="line"><span>2213</span></span>
<span class="line"><span>1811 1811</span></span>
<span class="line"><span>2213</span></span>
<span class="line"><span>2616</span></span>
<span class="line"><span>25 kHz 50 kHz 100 kHz 200 kHz 250 kHz 400 kHz 500 kHz 1000 kHz</span></span>
<span class="line"><span>Fig. 12.7 Variation of transformer size (bar chart) with switching frequency, ´Cuk converter example.</span></span>
<span class="line"><span>Optimum peak ac ﬂux density (data points) is also plotted</span></span>
<span class="line"><span>In practice, several matters complicate the dependence of transformer size on switching</span></span>
<span class="line"><span>frequency. Figure 12.7 ignores the winding geometry and copper losses due to winding eddy</span></span>
<span class="line"><span>currents. Greater power losses can be allowed in larger cores. Use of a di ﬀerent core material</span></span>
<span class="line"><span></span></span>
<span class="line"><span>496 12 Transformer Design</span></span>
<span class="line"><span>may allow higher or lower switching frequencies. The same core material, used in a di ﬀerent</span></span>
<span class="line"><span>application with diﬀerent speciﬁcations, may lead to a diﬀerent optimal frequency. Nonetheless,</span></span>
<span class="line"><span>examples have been reported in the literature [ 100–103] in which ferrite transformer size is</span></span>
<span class="line"><span>minimized at frequencies ranging from several hundred kilohertz to several megahertz. More</span></span>
<span class="line"><span>detailed design optimizations can be performed using computer optimization programs [ 104,</span></span>
<span class="line"><span>105].</span></span>
<span class="line"><span>12.3.2 Example 2: Multiple-Output Full-Bridge Buck Converter</span></span>
<span class="line"><span>As a second example, let us consider the design of transformer T</span></span>
<span class="line"><span>1 for the multiple-output full-</span></span>
<span class="line"><span>bridge buck converter of Fig. 12.8. This converter has a 5 V and a 15 V output, with maximum</span></span>
<span class="line"><span>loads as shown. The transformer is to be optimized at the full-load operating point shown, corre-</span></span>
<span class="line"><span>sponding to D= 0.75. Waveforms are illustrated in Fig.12.9. The converter switching frequency</span></span>
<span class="line"><span>is fs= 150 kHz. In the full-bridge conﬁguration, the transformer waveforms have fundamental</span></span>
<span class="line"><span>frequency equal to one-half of the switching frequency, so the eﬀective transformer frequency</span></span>
<span class="line"><span>is 75 kHz. Upon accounting for losses caused by diode forward voltage drops, one ﬁnds that the</span></span>
<span class="line"><span>desired transformer turns ratios n</span></span>
<span class="line"><span>1 : n2 : n3 are 110:5: 15. A ferrite EE consisting of Magnetics,</span></span>
<span class="line"><span>Inc. P-material is to be used in this example; at 75 kHz, this material is described by the follow-</span></span>
<span class="line"><span>ing parameters: Kfe = 7.6W/Tβcm3, β= 2.6. A ﬁll factor of Ku = 0.25 is assumed in this</span></span>
<span class="line"><span>isolated multiple-output application. Total power loss of Ptot = 4 W, or approximately 0.5% of</span></span>
<span class="line"><span>the load power, is allowed. Copper wire, having a resistivity of ρ= 1.724· 10−6Ω-cm, is to be</span></span>
<span class="line"><span>used.</span></span>
<span class="line"><span>The applied primary volt-seconds are</span></span>
<span class="line"><span>λ1= DT sVg= (0.75)(6.67 μsec)(160 V)= 800 V−μsec (12.35)</span></span>
<span class="line"><span>The primary rms current is</span></span>
<span class="line"><span>I1=</span></span>
<span class="line"><span>⎦n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I5V+ n3</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I15V</span></span>
<span class="line"><span>)√</span></span>
<span class="line"><span>D= 5.7A (12.36)</span></span>
<span class="line"><span>: n2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)+</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D2Q2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>D4Q4</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>5 V</span></span>
<span class="line"><span>D5</span></span>
<span class="line"><span>D6</span></span>
<span class="line"><span>I5V</span></span>
<span class="line"><span>100 Ai2a(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>15 V</span></span>
<span class="line"><span>D7</span></span>
<span class="line"><span>D8</span></span>
<span class="line"><span>i3a(t)</span></span>
<span class="line"><span>n1 :</span></span>
<span class="line"><span>: n2</span></span>
<span class="line"><span>: n3</span></span>
<span class="line"><span>: n3</span></span>
<span class="line"><span>i2b(t)</span></span>
<span class="line"><span>i2b(t)</span></span>
<span class="line"><span>I15V</span></span>
<span class="line"><span>15 A</span></span>
<span class="line"><span>T1</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>160 V</span></span>
<span class="line"><span>Fig. 12.8 Multiple-output full-bridge isolated buck converter example</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.3 Examples 497</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>i2a(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i3a(t)</span></span>
<span class="line"><span>0 DTs Ts 2TsTs+DTs</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>00</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>Area 1</span></span>
<span class="line"><span>= Vg DTs</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I5V + n3</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I15V</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I5V + n3</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I15V</span></span>
<span class="line"><span>I5V</span></span>
<span class="line"><span>0.5I5V</span></span>
<span class="line"><span>I15V</span></span>
<span class="line"><span>0.5I15V</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Fig. 12.9 Transformer waveforms, full-bridge converter example</span></span>
<span class="line"><span>The 5 V secondary windings carry rms current</span></span>
<span class="line"><span>I2= 1</span></span>
<span class="line"><span>2 I5V</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ D= 66.1A (12.37)</span></span>
<span class="line"><span>The 15 V secondary windings carry rms current</span></span>
<span class="line"><span>I3= 1</span></span>
<span class="line"><span>2 I15V</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ D= 9.9A (12.38)</span></span>
<span class="line"><span>The total rms winding current, referred to the primary, is</span></span>
<span class="line"><span>Itot =</span></span>
<span class="line"><span>∑</span></span>
<span class="line"><span>all5</span></span>
<span class="line"><span>windings</span></span>
<span class="line"><span>nj</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>Ij= I1+ 2n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I2+ 2n3</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I3 (12.39)</span></span>
<span class="line"><span>= 14.4A</span></span>
<span class="line"><span>The core size is evaluated using Eq. (12.19):</span></span>
<span class="line"><span>Kgfe ≥(1.724· 10−6)(800· 10−6)2(14.4)2(7.6)(2/2.6)</span></span>
<span class="line"><span>4(0.25)(4)(4.6/2.6) 108 (12.40)</span></span>
<span class="line"><span>= 0.00937</span></span>
<span class="line"><span>The EE core data of AppendixB lists the EE40 core with Kgfe = 0.0118 for β= 2.7. Evaluation</span></span>
<span class="line"><span>of Eq. (12.16) shows that Kgfe = 0.0108 for this core, when β= 2.6. In any event, EE40 is the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>498 12 Transformer Design</span></span>
<span class="line"><span>smallest standard EE core size having Kgfe ≤0.00937. The peak ac ﬂux density is found by</span></span>
<span class="line"><span>evaluation of Eq. (12.20), using the geometrical data for the EE40 core:</span></span>
<span class="line"><span>ΔB=</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>108 (1.724· 10−6)(800· 10−6)2(14.4)2</span></span>
<span class="line"><span>2(0.25)</span></span>
<span class="line"><span>(8.5)</span></span>
<span class="line"><span>(1.1)(1.27)3(7.7)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>(2.6)(7.6)</span></span>
<span class="line"><span>](1/46)</span></span>
<span class="line"><span>(12.41)</span></span>
<span class="line"><span>= 0.23 Tesla</span></span>
<span class="line"><span>This ﬂux density is less than the saturation ﬂux density of approximately 0.35 Tesla. The primary</span></span>
<span class="line"><span>turns are determined by evaluation of Eq. (12.21):</span></span>
<span class="line"><span>n1 = 104 (800· 10−6)</span></span>
<span class="line"><span>2(0.23)(1.27) (12.42)</span></span>
<span class="line"><span>= 13.7 turns</span></span>
<span class="line"><span>The secondary turns are found by evaluation of Eq. ( 12.22). It is desired that the transformer</span></span>
<span class="line"><span>have a 110:5:15 turns ratio, and hence</span></span>
<span class="line"><span>n2 = 5</span></span>
<span class="line"><span>110n1= 0.62 turns (12.43)</span></span>
<span class="line"><span>n3 = 5</span></span>
<span class="line"><span>110n1= 1.87 turns (12.44)</span></span>
<span class="line"><span>In practice, we might select n1 = 22, n2 = 1, and n3 = 3. This would lead to a reduced ΔB</span></span>
<span class="line"><span>with reduced core loss and increased copper loss. Since the resultingΔB is suboptimal, the total</span></span>
<span class="line"><span>power loss will be increased. According to Eq. (12.3), the peak ac ﬂux density for the EE40 core</span></span>
<span class="line"><span>will be</span></span>
<span class="line"><span>ΔB= (800· 10−6)</span></span>
<span class="line"><span>2(22)(1.27) 104= 0.143 Tesla (12.45)</span></span>
<span class="line"><span>The resulting core and copper loss can be computed using Eqs. (12.1) and (12.7):</span></span>
<span class="line"><span>Pfe = (7.6)(0.143)2.6(1.27)(7.7)= 0.47 W (12.46)</span></span>
<span class="line"><span>Pcu = (1.724· 10−6)(800· 10−6)2(14.4)2</span></span>
<span class="line"><span>4(0.25)</span></span>
<span class="line"><span>(8.5)</span></span>
<span class="line"><span>(1.1)(1.27)2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>(0.143)2 108 (12.47)</span></span>
<span class="line"><span>= 5.4W</span></span>
<span class="line"><span>Hence, the total power loss would be</span></span>
<span class="line"><span>Ptot = Pfe + Pcu= 5.9 W (12.48)</span></span>
<span class="line"><span>Since this is 50% greater than the design goal of 4 W, it is necessary to increase the core size.</span></span>
<span class="line"><span>The next larger EE core is the EE50 core, having Kgfe of 0.0284. The optimum ac ﬂux density</span></span>
<span class="line"><span>for this core, given by Eq. (12.3), isΔB= 0.14 T; operation at this ﬂux density would require</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.4 AC Inductor Design 499</span></span>
<span class="line"><span>n1 = 12 and would lead to a total power loss of 2.3 W. With n1 = 22, calculations similar to</span></span>
<span class="line"><span>Eqs. (12.45)t o( 12.48) lead to a peak ﬂux density ofΔB= 0.08 T. The resulting power losses</span></span>
<span class="line"><span>would then be Pfe = 0.23 W, Pcu= 3.89 W, Ptot = 4.12 W.</span></span>
<span class="line"><span>With the EE50 core and n1 = 22, the fraction of the available window area allocated to the</span></span>
<span class="line"><span>primary winding is given by Eq. (12.23)a s</span></span>
<span class="line"><span>α1= I1</span></span>
<span class="line"><span>Itot</span></span>
<span class="line"><span>= 5.7</span></span>
<span class="line"><span>14.4= 0.396 (12.49)</span></span>
<span class="line"><span>The fraction of the available window area allocated to each half of the 5 V secondary winding</span></span>
<span class="line"><span>should be</span></span>
<span class="line"><span>α2= n2I2</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>= 5</span></span>
<span class="line"><span>110</span></span>
<span class="line"><span>66.1</span></span>
<span class="line"><span>14.4= 0.209 (12.50)</span></span>
<span class="line"><span>The fraction of the available window area allocated to each half of the 15 V secondary winding</span></span>
<span class="line"><span>should be</span></span>
<span class="line"><span>α3= n3I3</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>= 15</span></span>
<span class="line"><span>110</span></span>
<span class="line"><span>9.9</span></span>
<span class="line"><span>14.4= 0.094 (12.51)</span></span>
<span class="line"><span>The primary wire area Aw1, 5 V secondary wire area Aw2, and 15 V secondary wire area Aw3 are</span></span>
<span class="line"><span>then given by Eq. (12.24)a s</span></span>
<span class="line"><span>Aw1 = α1KuWA</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>= (0.396)(0.25)(1.78)</span></span>
<span class="line"><span>(22) = 8.0· 10−3cm2</span></span>
<span class="line"><span>⇒AWG#19</span></span>
<span class="line"><span>Aw2 = α2KuWA</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>= (0.209)(0.25)(1.78)</span></span>
<span class="line"><span>(1) = 930· 10−3cm2 (12.52)</span></span>
<span class="line"><span>⇒AWG#8</span></span>
<span class="line"><span>Aw3 = α3KuWA</span></span>
<span class="line"><span>n3</span></span>
<span class="line"><span>= (0.094)(0.25)(1.78)</span></span>
<span class="line"><span>(3) = 13.9· 10−3cm2</span></span>
<span class="line"><span>⇒AWG#16</span></span>
<span class="line"><span>It may be preferable to wind the 15 V outputs using two #19 wires in parallel; this would lead</span></span>
<span class="line"><span>to the same area A w3 but would be easier to wind. The 5 V windings could be wound using</span></span>
<span class="line"><span>many turns of smaller paralleled wires, but it would probably be easier to use a ﬂat copper foil</span></span>
<span class="line"><span>winding. If insulation requirements allow, proximity losses could be minimized by interleaving</span></span>
<span class="line"><span>several thin layers of foil with the primary winding.</span></span>
<span class="line"><span>12.4 AC Inductor Design</span></span>
<span class="line"><span>The transformer design procedure of the previous sections can be adapted to handle the design</span></span>
<span class="line"><span>of other magnetic devices in which both core loss and copper loss are signiﬁcant. A procedure</span></span>
<span class="line"><span>is outlined here for design of single-winding inductors whose waveforms contain signiﬁcant</span></span>
<span class="line"><span>high-frequency ac components (Fig. 12.10). An optimal value of ΔB is found, which leads to</span></span>
<span class="line"><span>minimum total core plus copper loss. The major diﬀerence is that we must design to obtain a</span></span>
<span class="line"><span>given inductance, using a core with an air gap. The constraints and a step-by-step procedure are</span></span>
<span class="line"><span>brieﬂy outlined below.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>500 12 Transformer Design</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t) L</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>Window area WA</span></span>
<span class="line"><span>Core mean length</span></span>
<span class="line"><span>per turn (MLT)</span></span>
<span class="line"><span>Wire resistivity </span></span>
<span class="line"><span>Fill factor Ku</span></span>
<span class="line"><span>Air gap</span></span>
<span class="line"><span>lg</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>Core area</span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>Area </span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>t1 t2 t</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Fig. 12.10 Ac inductor, in which copper loss and core loss are signiﬁcant: ( a) deﬁnition of terminal</span></span>
<span class="line"><span>quantities, (b) core geometry, (c) arbitrary terminal waveforms</span></span>
<span class="line"><span>12.4.1 Outline of Derivation</span></span>
<span class="line"><span>As in the ﬁlter inductor design procedure of the previous chapter, the desired inductanceL must</span></span>
<span class="line"><span>be obtained, given by</span></span>
<span class="line"><span>L= μ0Acn2</span></span>
<span class="line"><span>ℓg</span></span>
<span class="line"><span>(12.53)</span></span>
<span class="line"><span>The applied voltage waveform and the peak ac component of the ﬂux density ΔB are related</span></span>
<span class="line"><span>according to</span></span>
<span class="line"><span>ΔB= λ</span></span>
<span class="line"><span>2nAc</span></span>
<span class="line"><span>(12.54)</span></span>
<span class="line"><span>The copper loss is given by</span></span>
<span class="line"><span>Pcu= ρn2(MLT )</span></span>
<span class="line"><span>KuWA</span></span>
<span class="line"><span>I2 (12.55)</span></span>
<span class="line"><span>where I is the rms value of i(t). The core loss Pfe is given by Eq. (12.1).</span></span>
<span class="line"><span>The value ofΔB that minimizes the total power loss Ptot = Pcu+ Pfe is found in a manner</span></span>
<span class="line"><span>similar to the transformer design derivation. Equation ( 12.54) is used to eliminate n from the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.4 AC Inductor Design 501</span></span>
<span class="line"><span>expression for Pcu. The optimalΔB is then computed by setting the derivative of Ptot to zero.</span></span>
<span class="line"><span>The result is</span></span>
<span class="line"><span>ΔB=</span></span>
<span class="line"><span>[ρλ2I2</span></span>
<span class="line"><span>2Ku</span></span>
<span class="line"><span>(MLT )</span></span>
<span class="line"><span>WAA3cℓm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>βKfe</span></span>
<span class="line"><span>]⎦1</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(12.56)</span></span>
<span class="line"><span>which is essentially the same as Eq. (12.13). The total power loss Ptot is evaluated at this value</span></span>
<span class="line"><span>ofΔB, and the resulting expression is manipulated to ﬁnd Kgfe . The result is</span></span>
<span class="line"><span>Kgfe ≥</span></span>
<span class="line"><span>ρλ2I2K(2/β)</span></span>
<span class="line"><span>fe</span></span>
<span class="line"><span>2Ku(Ptot)((β+2)/β) (12.57)</span></span>
<span class="line"><span>where Kgfe is deﬁned as in Eq. (12.16). A core that satisﬁes this inequality is selected.</span></span>
<span class="line"><span>12.4.2 First-Pass AC Inductor Design Procedure</span></span>
<span class="line"><span>The units of Sect. 12.2 are employed here.</span></span>
<span class="line"><span>1. Determine core size.</span></span>
<span class="line"><span>Kgfe ≥</span></span>
<span class="line"><span>ρλ2I2K(2/β)</span></span>
<span class="line"><span>fe</span></span>
<span class="line"><span>2Ku(Ptot)((β+2)/β) 108 (12.58)</span></span>
<span class="line"><span>Choose a core that is large enough to satisfy this inequality. If necessary, it may be possible</span></span>
<span class="line"><span>to use a smaller core by choosing a core material having lower loss, that is, smaller Kfe .</span></span>
<span class="line"><span>2. Evaluate peak ac f lux density .</span></span>
<span class="line"><span>ΔB=</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>108ρλ2I2</span></span>
<span class="line"><span>2Ku</span></span>
<span class="line"><span>(MLT )</span></span>
<span class="line"><span>W4A3cℓm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>βKfe</span></span>
<span class="line"><span>]⎦1</span></span>
<span class="line"><span>β+2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(12.59)</span></span>
<span class="line"><span>3. Number o f turns .</span></span>
<span class="line"><span>n= λ</span></span>
<span class="line"><span>2ΔBAc</span></span>
<span class="line"><span>104 (12.60)</span></span>
<span class="line"><span>4. Air gap length.</span></span>
<span class="line"><span>ℓg= μ0Acn2</span></span>
<span class="line"><span>L 10−4 (12.61)</span></span>
<span class="line"><span>with Ac speciﬁed in cm2 andℓg expressed in meters. Alternatively, the air gap can be indi-</span></span>
<span class="line"><span>rectly expressed via AL(mH/1000 turns):</span></span>
<span class="line"><span>AL= L</span></span>
<span class="line"><span>n2 109 (12.62)</span></span>
<span class="line"><span>5. Check f or saturation .</span></span>
<span class="line"><span>If the inductor current contains a dc component Idc, then the maximum total ﬂux density</span></span>
<span class="line"><span>Bmax is greater than the peak ac ﬂux densityΔB. The maximum total ﬂux density, in Tesla,</span></span>
<span class="line"><span>is given by</span></span>
<span class="line"><span>Bmax =ΔB+ LIdc</span></span>
<span class="line"><span>nAc</span></span>
<span class="line"><span>104 (12.63)</span></span>
<span class="line"><span>If Bmax is close to or greater than the saturation ﬂux densityBsat, then the core may saturate.</span></span>
<span class="line"><span>The ﬁlter inductor design procedure of the previous chapter should then be used, to operate</span></span>
<span class="line"><span>at a lower ﬂux density.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>502 12 Transformer Design</span></span>
<span class="line"><span>6. Evaluate wire size .</span></span>
<span class="line"><span>Aw≤KuWA</span></span>
<span class="line"><span>n (12.64)</span></span>
<span class="line"><span>A winding geometry can now be determined, and copper losses due to the proximity eﬀect</span></span>
<span class="line"><span>can be evaluated. If these losses are signiﬁcant, it may be desirable to further optimize the</span></span>
<span class="line"><span>design by reiterating the above steps, accounting for proximity losses by increasing the</span></span>
<span class="line"><span>eﬀective wire resistivity to the valueρef f = ρcuPcu/Pdc, where Pcu is the actual copper loss</span></span>
<span class="line"><span>including proximity eﬀects, and Pdc is the copper loss predicted when the proximity eﬀect</span></span>
<span class="line"><span>is ignored.</span></span>
<span class="line"><span>7. Check power loss .</span></span>
<span class="line"><span>Pcu = ρn(MLT )</span></span>
<span class="line"><span>Aw</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>Pfe = Kfe (ΔB)β Acℓm (12.65)</span></span>
<span class="line"><span>Ptot = Pcu+ Pfe</span></span>
<span class="line"><span>12.5 Summary</span></span>
<span class="line"><span>1. In a multiple-winding transformer, the low-frequency copper losses are minimized when</span></span>
<span class="line"><span>the available window area is allocated to the windings according to their apparent powers,</span></span>
<span class="line"><span>or ampere-turns.</span></span>
<span class="line"><span>2. As peak ac ﬂux density is increased, core loss increases while copper losses decrease. There</span></span>
<span class="line"><span>is an optimum ﬂux density that leads to minimum total power loss. Provided that the core</span></span>
<span class="line"><span>material is operated near its intended frequency, then the optimum ﬂux density is less than</span></span>
<span class="line"><span>the saturation ﬂux density. Minimization of total loss then determines the choice of peak ac</span></span>
<span class="line"><span>ﬂux density.</span></span>
<span class="line"><span>3. The core geometrical constant K</span></span>
<span class="line"><span>gfe is a measure of the magnetic size of a core, for appli-</span></span>
<span class="line"><span>cations in which core loss is signiﬁcant. In the Kgfe design method, the peak ﬂux density</span></span>
<span class="line"><span>is optimized to yield minimum total loss, as opposed to the Kg design method where peak</span></span>
<span class="line"><span>ﬂux density is a given speciﬁcation.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>12.1 Forward converter inductor and transformer design. The objective of this problem set is</span></span>
<span class="line"><span>to design the magnetics (two inductors and one transformer) of the two-transistor, two-</span></span>
<span class="line"><span>output forward converter shown in Fig. 12.11. The ferrite core material to be used for all</span></span>
<span class="line"><span>three devices has a saturation ﬂux density of approximately 0.3 T at 120◦C. To provide a</span></span>
<span class="line"><span>safety margin for your designs, you should use a maximum ﬂux density Bmax that is no</span></span>
<span class="line"><span>greater than 75% of this value. The core loss at 100 kHz is described by Eq. ( 12.1), with</span></span>
<span class="line"><span>the parameter values β= 2.6 and Kfe = 50W/Tβcm3. Calculate copper loss at 100◦C.</span></span>
<span class="line"><span>Steady-state converter analysis and design . You may assume 100% eﬃciency and ideal</span></span>
<span class="line"><span>lossless components for this section.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>12.5 Summary 503</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>325 V</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V1</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>5 V</span></span>
<span class="line"><span>30 A</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>15 V</span></span>
<span class="line"><span>1 A</span></span>
<span class="line"><span>n3</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>fs = 100 kHz</span></span>
<span class="line"><span>Fig. 12.11 Two-output forward converter of Problem12.1</span></span>
<span class="line"><span>(a) Select the transformer turns ratios so that the desired output voltages are obtained</span></span>
<span class="line"><span>when the duty cycle is D= 0.4.</span></span>
<span class="line"><span>(b) Specify values of L1 and L2 such that their current ripplesΔi1 andΔi2 are 10% of their</span></span>
<span class="line"><span>respective full-load current dc components I1 and I2.</span></span>
<span class="line"><span>(c) Determine the peak and rms currents in each inductor and transformer winding.</span></span>
<span class="line"><span>Inductor design. Allow copper loss of 1 W in L1 and 0.4 W in L2. Assume a ﬁll factor</span></span>
<span class="line"><span>of Ku = 0.5. Use ferrite EE cores—tables of geometrical data for standard EE core sizes</span></span>
<span class="line"><span>are given in Appendix B. Design the output ﬁlter inductors L1 and L2. For each inductor,</span></span>
<span class="line"><span>specify:</span></span>
<span class="line"><span>(i) EE core size</span></span>
<span class="line"><span>(ii) Air gap length</span></span>
<span class="line"><span>(iii) Number of turns</span></span>
<span class="line"><span>(iv)A W G w i r e s i z e</span></span>
<span class="line"><span>Transformer design. Allow a total power loss of 1 W. Assume a ﬁll factor of Ku = 0.35</span></span>
<span class="line"><span>(lower than for the ﬁlter inductors, to allow space for insulation between the windings).</span></span>
<span class="line"><span>Use a ferrite EE core. You may neglect losses due to the skin and proximity eﬀects, but you</span></span>
<span class="line"><span>should include core and copper losses. Design the transformer, and specify the following:</span></span>
<span class="line"><span>(i) EE core size</span></span>
<span class="line"><span>(ii) Turns n1, n2, and n3</span></span>
<span class="line"><span>(iii) AWG wire size for the three windings</span></span>
<span class="line"><span>Check your transformer design:</span></span>
<span class="line"><span>(iv) Compute the maximum ﬂux density. Will the core saturate?</span></span>
<span class="line"><span>(v) Compute the core loss, the copper loss of each winding, and the total power loss</span></span>
<span class="line"><span></span></span>
<span class="line"><span>504 12 Transformer Design</span></span>
<span class="line"><span>12.2 A single-transistor forward converter operates with an input voltage Vg = 160 V, and</span></span>
<span class="line"><span>supplies two outputs: 24 V at 2 A, and 15 V at 6 A. The duty cycle is D= 0.4. The turns</span></span>
<span class="line"><span>ratio between the primary winding and the reset winding is 1:1. The switching frequency</span></span>
<span class="line"><span>is 100 kHz. The core material loss equation parameters are β= 2.7, Kfe = 50. You may</span></span>
<span class="line"><span>assume a ﬁll factor of 0.25. Do not allow the core maximum ﬂux density to exceed 0.3 T.</span></span>
<span class="line"><span>Design a transformer for this application, having a total power loss no greater than 1.5 W</span></span>
<span class="line"><span>at 100◦C. Neglect proximity losses. You may neglect the reset winding. Use a ferrite PQ</span></span>
<span class="line"><span>core. Specify: core size, peak ac ﬂux density, wire sizes, and number of turns for each</span></span>
<span class="line"><span>winding. Compute the core and copper losses for your design.</span></span>
<span class="line"><span>12.3 Flyback/SEPIC transformer design. The “transformer” of the ﬂyback and SEPIC convert-</span></span>
<span class="line"><span>ers is an energy storage device, which might be more accurately described as a multiple-</span></span>
<span class="line"><span>winding inductor. The magnetizing inductance Lp functions as an energy-transferring in-</span></span>
<span class="line"><span>ductor of the converter, and therefore the “transformer” normally contains an air gap. The</span></span>
<span class="line"><span>converter may be designed to operate in either the continuous or discontinuous conduction</span></span>
<span class="line"><span>mode. Core loss may be signiﬁcant. It is also important to ensure that the peak current in</span></span>
<span class="line"><span>the magnetizing inductance does not cause saturation.</span></span>
<span class="line"><span>A ﬂyback transformer is to be designed for the following two-output ﬂyback converter</span></span>
<span class="line"><span>application:</span></span>
<span class="line"><span>Input: 160 Vdc</span></span>
<span class="line"><span>Output 1: 5 Vdc at 10 A</span></span>
<span class="line"><span>Output 2: 15 Vdc at l A</span></span>
<span class="line"><span>Switching frequency: 100 kHz</span></span>
<span class="line"><span>Magnetizing inductance L</span></span>
<span class="line"><span>p: 1.33 mH, referred to primary</span></span>
<span class="line"><span>Turns ratio: 160: 5: 15</span></span>
<span class="line"><span>Transformer power loss: Allow 1 W total</span></span>
<span class="line"><span>(a) Does the converter operate in CCM or DCM? Referred to the primary winding, how</span></span>
<span class="line"><span>large are (i) the magnetizing current rippleΔi,( ii) the magnetizing current dc compo-</span></span>
<span class="line"><span>nent I, and (iii) the peak magnetizing current Ipk?</span></span>
<span class="line"><span>(b) Determine ( i) the rms winding currents, and ( ii) the applied primary volt-secondsλ1.</span></span>
<span class="line"><span>Isλ1 proportional to Ipk?</span></span>
<span class="line"><span>(c) Modify the transformer and ac inductor design procedures of this chapter, to derive a</span></span>
<span class="line"><span>general procedure for designing ﬂyback transformers that explicitly accounts for both</span></span>
<span class="line"><span>core and copper loss, and that employs the optimum ac ﬂux density that minimizes</span></span>
<span class="line"><span>the total loss.</span></span>
<span class="line"><span>(d) Give a general step-by-step design procedure, with all speciﬁcations and units clearly</span></span>
<span class="line"><span>stated.</span></span>
<span class="line"><span>(e) Design the ﬂyback transformer for the converter of part (a), using your step-by-step</span></span>
<span class="line"><span>procedure of Part (d). Use a ferrite EE core, with β= 2.7 and K</span></span>
<span class="line"><span>fe = 50W/Tβcm3.</span></span>
<span class="line"><span>Specify: core size, air gap length, turns, and wire sizes for all windings.</span></span>
<span class="line"><span>(f) For your ﬁnal design of part (e), what are ( i) the core loss, ( ii) the total copper loss,</span></span>
<span class="line"><span>and (iii) the peak ﬂux density?</span></span>
<span class="line"><span>12.4 Over the intended range of operating frequencies, the frequency dependence of the core</span></span>
<span class="line"><span>loss coeﬃcient Kfe of a certain ferrite core material can be approximated using a mono-</span></span>
<span class="line"><span>tonically increasing fourth-order polynomial of the form</span></span></code></pre></div>`,10)])])}const m=n(l,[["render",i]]);export{u as __pageData,m as default};
