import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第10章part 2 - 10 Basic Magnetics Theory","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第10章part 2 - 10 Basic Magnetics Theory","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 438-457 > Chunk ID: `chapter-10-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/028-chapter-10-part-2.md","filePath":"content/power/fundamentals-work/chunks/028-chapter-10-part-2.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/028-chapter-10-part-2.md"};function l(t,n,c,r,o,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第10章part-2-10-basic-magnetics-theory" tabindex="-1">第10章part 2 - 10 Basic Magnetics Theory <a class="header-anchor" href="#第10章part-2-10-basic-magnetics-theory" aria-label="Permalink to &quot;第10章part 2 - 10 Basic Magnetics Theory&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 438-457<br> Chunk ID: <code>chapter-10-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10.4 Eddy Currents in Winding Conductors 429</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>i(t) i(t)</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>Pri Sec</span></span>
<span class="line"><span>Window</span></span>
<span class="line"><span>SecondaryPrimary</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>Layer 1</span></span>
<span class="line"><span>Layer 2</span></span>
<span class="line"><span>Layer 3</span></span>
<span class="line"><span>Layer 1</span></span>
<span class="line"><span>Layer 2</span></span>
<span class="line"><span>Layer 3</span></span>
<span class="line"><span>Core Core</span></span>
<span class="line"><span>i i</span></span>
<span class="line"><span>Window</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Secondary windingPrimary winding</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>Layer 1</span></span>
<span class="line"><span>Layer 2</span></span>
<span class="line"><span>Layer 3</span></span>
<span class="line"><span>Layer 1</span></span>
<span class="line"><span>Layer 2</span></span>
<span class="line"><span>Layer 3</span></span>
<span class="line"><span>i i i</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>i 3ii2i 2ii</span></span>
<span class="line"><span>Current</span></span>
<span class="line"><span>density</span></span>
<span class="line"><span>J</span></span>
<span class="line"><span>h</span></span>
<span class="line"><span>2 3 2</span></span>
<span class="line"><span>Layer 1</span></span>
<span class="line"><span>Layer 2</span></span>
<span class="line"><span>Layer 3</span></span>
<span class="line"><span>Secondary windingPrimary winding</span></span>
<span class="line"><span>Layer 1</span></span>
<span class="line"><span>Layer 2</span></span>
<span class="line"><span>Layer 3</span></span>
<span class="line"><span>Fig. 10.25 A simple transformer example illustrating the proximity eﬀect: (a)eﬀective core geometry</span></span>
<span class="line"><span>(left) and winding geometry (top view) (right), (b) winding geometry (side view of core window) with one</span></span>
<span class="line"><span>turn per layer, (c) distribution of currents on surfaces of conductors</span></span>
<span class="line"><span>Rac= h</span></span>
<span class="line"><span>δRdc (10.63)</span></span>
<span class="line"><span>The copper loss in layer 1 is</span></span>
<span class="line"><span>P1= I2Rac (10.64)</span></span>
<span class="line"><span>The proximity eﬀect causes a current to be induced in the adjacent (left-side) surface of</span></span>
<span class="line"><span>primary layer 2, which tends to oppose the ﬂux generated by the current of layer 1. If the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>430 10 Basic Magnetics Theory</span></span>
<span class="line"><span>conductors are closely spaced, and ifh≫ δ, then the induced current will be equal and opposite</span></span>
<span class="line"><span>to the current i(t), as illustrated in Fig. 10.25c. Hence, current−i(t) ﬂows on the left surface of</span></span>
<span class="line"><span>the second layer. Since layers 1 and 2 are connected in series, they must both conduct the same</span></span>
<span class="line"><span>net current i(t). As a result, a current+2i(t) must ﬂow on the right-side surface of layer 2.</span></span>
<span class="line"><span>The current ﬂowing on the left surface of layer 2 has the same magnitude as the current of</span></span>
<span class="line"><span>layer 1, and hence the copper loss is the same: P1. The current ﬂowing on the right surface of</span></span>
<span class="line"><span>layer 2 has rms magnitude 2 I; hence, it induces copper loss (2 I)2Rac = 4P1. The total copper</span></span>
<span class="line"><span>loss in primary layer 2 is therefore</span></span>
<span class="line"><span>P2= P1+ 4P1= 5P1 (10.65)</span></span>
<span class="line"><span>The copper loss in the second layer is ﬁve times as large as the copper loss in the ﬁrst layer!</span></span>
<span class="line"><span>The current 2i(t) ﬂowing on the right surface of layer 2 induces a ﬂux 2 Φ(t) as illustrated</span></span>
<span class="line"><span>in Fig. 10.25c. This causes an opposing current −2i(t) to ﬂow on the adjacent (left) surface of</span></span>
<span class="line"><span>primary layer 3. Since layer 3 must also conduct net current i(t), a current+3i(t)ﬂ o w so nt h e</span></span>
<span class="line"><span>right surface of layer 3. The total copper loss in layer 3 is</span></span>
<span class="line"><span>p3= (22+ 32)P1= 13P1 (10.66)</span></span>
<span class="line"><span>Likewise, the copper loss in layer m of a multiple-layer winding can be written</span></span>
<span class="line"><span>Pm= I2 [</span></span>
<span class="line"><span>(m−1)2+ m2]⎦h</span></span>
<span class="line"><span>δRdc</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(10.67)</span></span>
<span class="line"><span>It can be seen that the copper loss compounds very quickly in a multiple-layer winding.</span></span>
<span class="line"><span>The total copper loss in the three-layer primary winding is P1+ 5P1+ 13P1,o r1 9P1.M o r e</span></span>
<span class="line"><span>generally, if the winding contains a total of M layers, then the total copper loss is</span></span>
<span class="line"><span>P= I2</span></span>
<span class="line"><span>⎦h</span></span>
<span class="line"><span>δRdc</span></span>
<span class="line"><span>) M∑</span></span>
<span class="line"><span>m=1</span></span>
<span class="line"><span>[(m−1)2+ m2]</span></span>
<span class="line"><span>= I2</span></span>
<span class="line"><span>⎦h</span></span>
<span class="line"><span>δRdc</span></span>
<span class="line"><span>) M</span></span>
<span class="line"><span>3 (2M2+ 1) (10.68)</span></span>
<span class="line"><span>If a dc or low-frequency ac current of rms amplitude I were applied to the M-layer winding, its</span></span>
<span class="line"><span>copper loss would be Pdc = I2 MRdc. Hence, the proximity eﬀect increases the copper loss by</span></span>
<span class="line"><span>the factor</span></span>
<span class="line"><span>FR= P</span></span>
<span class="line"><span>Pdc</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦h</span></span>
<span class="line"><span>δ</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(2M2+ 1) (10.69)</span></span>
<span class="line"><span>This expression is valid for a foil winding having h≫ δ.</span></span>
<span class="line"><span>As illustrated in Fig. 10.25c, the surface currents in the secondary winding are symmetrical,</span></span>
<span class="line"><span>and hence the secondary winding has the same conduction loss.</span></span>
<span class="line"><span>The example above and the associated equations are limited to h≫ δ and to the winding</span></span>
<span class="line"><span>geometry shown. The equations do not quantify the behavior forh∼δ, nor for round conductors,</span></span>
<span class="line"><span>nor are the equations suﬃciently general to cover the more complicated winding geometries</span></span>
<span class="line"><span>often encountered in the magnetic devices of switching converters. Optimum designs may, in</span></span>
<span class="line"><span>fact, occur with conductor thicknesses in the vicinity of one penetration depth. The discussions</span></span>
<span class="line"><span>of the following sections allow computation of proximity losses in more general circumstances.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 431</span></span>
<span class="line"><span>10.4.2 Leakage Flux in Windings</span></span>
<span class="line"><span>As described above, an externally applied magnetic ﬁeld will induce eddy currents to ﬂow in</span></span>
<span class="line"><span>a conductor, and thereby induce copper loss. To understand how magnetic ﬁelds are oriented</span></span>
<span class="line"><span>in windings, let us consider the simple two-winding transformer illustrated in Fig. 10.26.I n</span></span>
<span class="line"><span>this example, the core has large permeability μ≫μ0. The primary winding consists of eight</span></span>
<span class="line"><span>turns of wire arranged in two layers, and each turn carries current i(t) in the direction indicated.</span></span>
<span class="line"><span>The secondary winding is identical to the primary winding, except that the current polarity is</span></span>
<span class="line"><span>reversed.</span></span>
<span class="line"><span>Flux lines for typical operation of this transformer are sketched in Fig.10.26b. As described</span></span>
<span class="line"><span>in Sect. 10.2, a relatively large mutual ﬂux is present, which magnetizes the core. In addition,</span></span>
<span class="line"><span>leakage ﬂux is present, which does not completely link both windings. Because of the symmetry</span></span>
<span class="line"><span>of the winding geometry in Fig. 10.26, the leakage ﬂux runs approximately vertically through</span></span>
<span class="line"><span>the windings.</span></span>
<span class="line"><span>To determine the magnitude of the leakage ﬂux, we can apply Ampere’s law. Consider the</span></span>
<span class="line"><span>closed path taken by one of the leakage ﬂux lines, as illustrated in Fig.10.27. Since the core has</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>x</span></span>
<span class="line"><span>y</span></span>
<span class="line"><span>Primary</span></span>
<span class="line"><span>winding</span></span>
<span class="line"><span>Secondary</span></span>
<span class="line"><span>winding{</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>μ &gt; μ0</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Leakage flux</span></span>
<span class="line"><span>Mutual</span></span>
<span class="line"><span>flux</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>Fig. 10.26 Two-winding transformer example: (a) core and winding geometry, (b) typical ﬂux distribu-</span></span>
<span class="line"><span>tion</span></span>
<span class="line"><span>Fig. 10.27 Analysis of leakage ﬂux us-</span></span>
<span class="line"><span>ing Ampere’s law, for the transformer of</span></span>
<span class="line"><span>Fig. 10.26</span></span>
<span class="line"><span></span></span>
<span class="line"><span>432 10 Basic Magnetics Theory</span></span>
<span class="line"><span>Fig. 10.28 MMF diagram for the trans-</span></span>
<span class="line"><span>former winding example of Figs. 10.26</span></span>
<span class="line"><span>and 10.27</span></span>
<span class="line"><span>large permeability, we can assume that the MMF induced in the core by this ﬂux is negligible,</span></span>
<span class="line"><span>and that the total MMF around the path is dominated by the MMFF (x) across the core window.</span></span>
<span class="line"><span>Hence, Ampere’s law states that the net current enclosed by the path is equal to the MMF across</span></span>
<span class="line"><span>the air gap:</span></span>
<span class="line"><span>Enclosed current= F (x)= H(x)ℓ</span></span>
<span class="line"><span>w (10.70)</span></span>
<span class="line"><span>whereℓw is the height of the window as shown in Fig. 10.27. The net current enclosed by the</span></span>
<span class="line"><span>path depends on the number of primary and secondary conductors enclosed by the path, and is</span></span>
<span class="line"><span>therefore a function of the horizontal position x. The ﬁrst layer of the primary winding consists</span></span>
<span class="line"><span>of 4 turns, each carrying current i(t). So when the path encloses only the ﬁrst layer of the</span></span>
<span class="line"><span>primary winding, then the enclosed current is 4 i(t) as shown in Fig. 10.28. Likewise, when the</span></span>
<span class="line"><span>path encloses both layers of the primary winding, then the enclosed current is 8 i(t). When the</span></span>
<span class="line"><span>path encloses the entire primary, plus layer 2 of the secondary winding, then the net enclosed</span></span>
<span class="line"><span>current is 8 i(t)−4i(t) = 4i(t). The MMF F (x) across the core window is zero outside the</span></span>
<span class="line"><span>winding, and rises to a maximum of 8 i(t) at the interface between the primary and secondary</span></span>
<span class="line"><span>windings. Since H(x)= F (x)/ℓw, the magnetic ﬁeld intensity H(x) is proportional to the sketch</span></span>
<span class="line"><span>of Fig. 10.28.</span></span>
<span class="line"><span>It should be noted that the shape of theF (x) curve in the vicinity of the winding conductors</span></span>
<span class="line"><span>depends on the distribution of the current within the conductors. Since this distribution is not</span></span>
<span class="line"><span>yet known, the F (x) curve of Fig. 10.28 is arbitrarily drawn as straight line segments.</span></span>
<span class="line"><span>In general, the magnetic ﬁelds that surround conductors and lead to eddy currents must be</span></span>
<span class="line"><span>determined using ﬁnite element analysis or other similar methods. However, in a large class</span></span>
<span class="line"><span>of coaxial solenoidal winding geometries, the magnetic ﬁeld lines are nearly parallel to the</span></span>
<span class="line"><span>winding layers. As shown below, we can then obtain an analytical solution for the proximity</span></span>
<span class="line"><span>losses.</span></span>
<span class="line"><span>10.4.3 Foil Windings and Layers</span></span>
<span class="line"><span>The winding symmetry described in the previous section allows simpliﬁcation of the analysis.</span></span>
<span class="line"><span>For the purposes of determining leakage inductance and winding eddy currents, a layer consist-</span></span>
<span class="line"><span>ing of nℓ turns of round wire carrying current i(t) can be approximately modeled as an eﬀective</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 433</span></span>
<span class="line"><span>Fig. 10.29 Approximating a</span></span>
<span class="line"><span>layer of round conductors as an</span></span>
<span class="line"><span>eﬀective foil conductor</span></span>
<span class="line"><span>(a)( b)( c)( d)</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>lw</span></span>
<span class="line"><span>h h</span></span>
<span class="line"><span>h</span></span>
<span class="line"><span>single turn of foil, which carries currentnℓi(t). The steps in the transformation of a layer of round</span></span>
<span class="line"><span>conductors into a foil conductor are formalized in Fig. 10.29 [90, 92–95]. The round conduc-</span></span>
<span class="line"><span>tors are replaced by square conductors having the same copper cross-sectional area, Fig.10.29b.</span></span>
<span class="line"><span>The thickness h of the square conductors is therefore equal to the bare copper wire diameter,</span></span>
<span class="line"><span>multiplied by the factor√π/4:</span></span>
<span class="line"><span>h=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>4 d (10.71)</span></span>
<span class="line"><span>These square conductors are then joined together, into a foil layer (Fig. 10.29c). Finally, the</span></span>
<span class="line"><span>width of the foil is increased, such that it spans the width of the core window (Fig. 10.29d).</span></span>
<span class="line"><span>Since this stretching process increases the conductor cross-sectional area, a compensating factor</span></span>
<span class="line"><span>ηmust be introduced such that the correct dc conductor resistance is predicted. This factor,</span></span>
<span class="line"><span>sometimes called the conductor spacing factor or the winding porosity, is deﬁned as the ratio of</span></span>
<span class="line"><span>the actual layer copper area (Fig.10.29a) to the area of the eﬀective foil conductor of Fig.10.29d.</span></span>
<span class="line"><span>Porosity is less than unity: 0≤η≤1. The porosity eﬀectively increases the resistivityρof the</span></span>
<span class="line"><span>conductor, and thereby increases its skin depth:</span></span>
<span class="line"><span>δ′= δ√η (10.72)</span></span>
<span class="line"><span>If a layer of width ℓw contains nℓ turns of round wire having diameter d, then the winding</span></span>
<span class="line"><span>porosity ηis given by</span></span>
<span class="line"><span>η=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>4 d nℓ</span></span>
<span class="line"><span>ℓw</span></span>
<span class="line"><span>(10.73)</span></span>
<span class="line"><span>A typical value of ηfor round conductors that span the width of the winding bobbin is 0.8.</span></span>
<span class="line"><span>In the following analysis, the factor ϕis given by h/δ for foil conductors, and by the ratio of</span></span>
<span class="line"><span>the eﬀective foil conductor thickness h to the eﬀective skin depth δ′ for round conductors as</span></span>
<span class="line"><span>follows:</span></span>
<span class="line"><span>ϕ= h</span></span>
<span class="line"><span>δ′ =√η</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>π</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>δ (10.74)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>434 10 Basic Magnetics Theory</span></span>
<span class="line"><span>10.4.4 Power Loss in a Layer</span></span>
<span class="line"><span>Fig. 10.30 The power loss is determined</span></span>
<span class="line"><span>for a uniform layer. Uniform tangential</span></span>
<span class="line"><span>magnetic ﬁelds H(0) and H(h) are applied</span></span>
<span class="line"><span>to the layer surfaces</span></span>
<span class="line"><span>In this section, the average power loss P in a uni-</span></span>
<span class="line"><span>form layer of thickness h is determined. As illustrated</span></span>
<span class="line"><span>in Fig. 10.30, the magnetic ﬁeld strengths on the left</span></span>
<span class="line"><span>and right sides of the conductor are denoted H(0) and</span></span>
<span class="line"><span>H(d), respectively. It is assumed that the component of</span></span>
<span class="line"><span>magnetic ﬁeld normal to the conductor surface is zero.</span></span>
<span class="line"><span>These magnetic ﬁelds are driven by the magnetomotive</span></span>
<span class="line"><span>forces F (0) and F (h), respectively. Sinusoidal wave-</span></span>
<span class="line"><span>forms are assumed, and rms magnitudes are employed.</span></span>
<span class="line"><span>It is further assumed here that H(0) and H(h)a r ei n</span></span>
<span class="line"><span>phase; the eﬀect of a phase shift is treated in [94].</span></span>
<span class="line"><span>With these assumptions, Maxwell’s equations are</span></span>
<span class="line"><span>solved to ﬁnd the current density distribution in the</span></span>
<span class="line"><span>layer. The power loss density is then computed, and</span></span>
<span class="line"><span>is integrated over the volume of the layer to ﬁnd the</span></span>
<span class="line"><span>total copper loss in the layer [94]. The result is</span></span>
<span class="line"><span>P=R</span></span>
<span class="line"><span>dc</span></span>
<span class="line"><span>ϕ</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>ℓ</span></span>
<span class="line"><span>[⎦</span></span>
<span class="line"><span>F 2(h)+F 2(0)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>G1(ϕ)−4F (h)F (0)G2(ϕ)</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(10.75)</span></span>
<span class="line"><span>where nℓ is the number of turns in the layer, and Rdc is</span></span>
<span class="line"><span>the dc resistance of the layer. The functionsG1(ϕ) and</span></span>
<span class="line"><span>G2(ϕ)a r e</span></span>
<span class="line"><span>G1(ϕ)= sinh(2ϕ)+ sin(2ϕ)</span></span>
<span class="line"><span>cosh(2ϕ)−cos(2ϕ)</span></span>
<span class="line"><span>G2(ϕ)= sinh(ϕ) cos(ϕ)+ cosh(ϕ)s i n (ϕ)</span></span>
<span class="line"><span>cosh(2ϕ)−cos(2ϕ) (10.76)</span></span>
<span class="line"><span>If the winding carries current of rms magnitude I, then we can write</span></span>
<span class="line"><span>F (h)−F (0)= nℓI (10.77)</span></span>
<span class="line"><span>Let us further express F (h) in terms of the winding current I,a s</span></span>
<span class="line"><span>F (h)= mnℓI (10.78)</span></span>
<span class="line"><span>The quantity m is therefore the ratio of the MMF F (h) to the layer ampere-turns nℓI. Then,</span></span>
<span class="line"><span>F (0)</span></span>
<span class="line"><span>F (h)= m−1</span></span>
<span class="line"><span>m (10.79)</span></span>
<span class="line"><span>The power dissipated in the layer, Eq. (10.75), can then be written</span></span>
<span class="line"><span>P= I2RdcϕQ′(ϕ, m) (10.80)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 435</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>0111.0</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>I 2Rdc</span></span>
<span class="line"><span>m = 0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>345681012m = 15</span></span>
<span class="line"><span>Fig. 10.31 Increase of layer copper loss due to the proximity eﬀect, as a function ofϕand MMF ratio m,</span></span>
<span class="line"><span>for sinusoidal excitation</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Q′(ϕ, m)= (2m2−2m+ 1)G1(ϕ)−4m(m−1)G2(ϕ) (10.81)</span></span>
<span class="line"><span>We can conclude that the proximity eﬀect increases the copper loss in the layer by the factor</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>I2Rdc</span></span>
<span class="line"><span>= ϕQ′(ϕ, m) (10.82)</span></span>
<span class="line"><span>Equation (10.82), in conjunction with the deﬁnitions (10.81), (10.78), (10.76), and (10.74), can</span></span>
<span class="line"><span>be plotted using a computer spreadsheet or small computer program. The result is illustrated in</span></span>
<span class="line"><span>Fig. 10.31, for several values of m.</span></span>
<span class="line"><span>It is illuminating to express the layer copper lossP in terms of the dc power lossP</span></span>
<span class="line"><span>dc|ϕ=1 that</span></span>
<span class="line"><span>would be obtained in a foil conductor having a thickness ϕ= 1. This loss is found by dividing</span></span>
<span class="line"><span>Eq. (10.82)b yt h eeﬀective thickness ratioϕ:</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>Pdc|ϕ=1</span></span>
<span class="line"><span>= Q′(ϕ, m) (10.83)</span></span>
<span class="line"><span>Equation ( 10.83) is plotted in Fig. 10.32. Large copper loss is obtained for small ϕ simply</span></span>
<span class="line"><span>because the layer is thin and hence the dc resistance of the layer is large. For large m and</span></span>
<span class="line"><span>large ϕ, the proximity eﬀect leads to large power loss; Eq. ( 10.67) predicts that Q′(ϕ, m)i s</span></span>
<span class="line"><span>asymptotic to m2+ (m−1)2 for large ϕ. Between these extremes, there is a value of ϕwhich</span></span>
<span class="line"><span>minimizes the layer copper loss.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>436 10 Basic Magnetics Theory</span></span>
<span class="line"><span>0111.0</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>m = 0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>81012m = 15</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>Pdc =1</span></span>
<span class="line"><span>Fig. 10.32 Layer copper loss, relative to the dc loss in a layer having eﬀective thickness of one penetra-</span></span>
<span class="line"><span>tion depth</span></span>
<span class="line"><span>10.4.5 Example: Power Loss in a Transformer Winding</span></span>
<span class="line"><span>Let us again consider the proximity loss in a conventional transformer, in which the primary</span></span>
<span class="line"><span>and secondary windings each consist of M layers. The normalized MMF diagram is illustrated</span></span>
<span class="line"><span>in Fig. 10.33. As given by Eq. ( 10.82), the proximity eﬀect increases the copper loss in each</span></span>
<span class="line"><span>layer by the factor ϕQ′(ϕ, m). The total increase in primary winding copper loss Ppri is found</span></span>
<span class="line"><span>by summation over all of the primary layers:</span></span>
<span class="line"><span>FR= Ppri</span></span>
<span class="line"><span>Ppri,dc</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>M∑</span></span>
<span class="line"><span>m=1</span></span>
<span class="line"><span>ϕQ′(ϕ, m) (10.84)</span></span>
<span class="line"><span>Fig. 10.33 Conventional two-</span></span>
<span class="line"><span>winding transformer example. Each</span></span>
<span class="line"><span>winding consists of M layers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 437</span></span>
<span class="line"><span>Owing to the symmetry of the windings in this example, the secondary winding copper loss is</span></span>
<span class="line"><span>increased by the same factor. Upon substituting Eq. (10.81) and collecting terms, we obtain</span></span>
<span class="line"><span>FR= ϕ</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>M∑</span></span>
<span class="line"><span>m=1</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>m2 (2G1(ϕ)−4G2(ϕ))−m (2G1(ϕ)−4G2(ϕ))+ G1(ϕ)</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(10.85)</span></span>
<span class="line"><span>The summation can be expressed in closed form with the help of the identities</span></span>
<span class="line"><span>M∑</span></span>
<span class="line"><span>m=1</span></span>
<span class="line"><span>m= M(M+ 1)</span></span>
<span class="line"><span>2 (10.86)</span></span>
<span class="line"><span>M∑</span></span>
<span class="line"><span>m=1</span></span>
<span class="line"><span>m2= M(M+ 1)(2M+ 1)</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>Use of these identities to simplify Eq. (10.85) leads to</span></span>
<span class="line"><span>FR= ϕ</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>G1(ϕ)+ 2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>M2−1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(G1(ϕ)−2G2(ϕ))</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(10.87)</span></span>
<span class="line"><span>This expression is plotted in Fig. 10.34, for several values of M.F o rl a r g eϕ, G1(ϕ) tends to</span></span>
<span class="line"><span>1, while G2(ϕ) tends to 0. It can be veriﬁed that FR then tends to the value predicted by Eq.</span></span>
<span class="line"><span>(10.69).</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>1010.1</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>45678101215Number of layers M =</span></span>
<span class="line"><span>FR = Ppri</span></span>
<span class="line"><span>Ppri,dc</span></span>
<span class="line"><span>Fig. 10.34 Increased total winding copper loss in the two-winding transformer example, as a function of</span></span>
<span class="line"><span>ϕand number of layers M, for sinusoidal excitation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>438 10 Basic Magnetics Theory</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>0111.0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>7</span></span>
<span class="line"><span>8</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>1215Number of layers M =</span></span>
<span class="line"><span>Ppri</span></span>
<span class="line"><span>Ppri,dc =1</span></span>
<span class="line"><span>Fig. 10.35 Transformer example winding total copper loss, relative to the winding dc loss for layers</span></span>
<span class="line"><span>having eﬀective thicknesses of one penetration depth</span></span>
<span class="line"><span>We can again express the total primary power loss in terms of the dc power loss that would</span></span>
<span class="line"><span>be obtained using a conductor in whichϕ= 1. This loss is found by dividing Eq. (10.87)b yϕ:</span></span>
<span class="line"><span>Ppri</span></span>
<span class="line"><span>Ppri,dc</span></span>
<span class="line"><span>⏐⏐⏐ϕ=1</span></span>
<span class="line"><span>= G1(ϕ)+ 2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>M2−1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(G1(ϕ)−2G2(ϕ)) (10.88)</span></span>
<span class="line"><span>This expression is plotted in Fig. 10.35, for several values of M. Depending on the number of</span></span>
<span class="line"><span>layers, the minimum copper loss for sinusoidal excitation is obtained forϕnear to, or somewhat</span></span>
<span class="line"><span>less than, unity.</span></span>
<span class="line"><span>10.4.6 Interleaving the Windings</span></span>
<span class="line"><span>One way to reduce the copper losses due to the proximity e ﬀect is to interleave the windings.</span></span>
<span class="line"><span>Figure 10.36 illustrates the MMF diagram for a simple transformer in which the primary and</span></span>
<span class="line"><span>secondary layers are alternated, with net layer current of magnitude i. It can be seen that each</span></span>
<span class="line"><span>layer operates with F = 0 on one side, and F = i on the other. Hence, each layer operates</span></span>
<span class="line"><span>eﬀectively with m= 1. Note that Eq. ( 10.75) is symmetric with respect to F (0) and F (h);</span></span>
<span class="line"><span>hence, the copper losses of the interleaved secondary and primary layers are identical. The</span></span>
<span class="line"><span>proximity losses of the entire winding can therefore be determined directly from Figs. 10.34</span></span>
<span class="line"><span>and 10.35, with M = 1. It can be shown that the minimum copper loss for this case (with</span></span>
<span class="line"><span>sinusoidal currents) occurs with ϕ= π/2, although the copper loss is nearly constant for any</span></span>
<span class="line"><span>ϕ≥1, and is approximately equal to the dc copper loss obtained when ϕ= 1. It should be</span></span>
<span class="line"><span>apparent that interleaving can lead to signiﬁcant improvements in copper loss when the winding</span></span>
<span class="line"><span>contains several layers.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 439</span></span>
<span class="line"><span>Fig. 10.36 MMF diagram for a simple transformer with interleaved windings. Each layer operates with</span></span>
<span class="line"><span>m= 1</span></span>
<span class="line"><span>Fig. 10.37 A partially interleaved two-winding transformer, illustrating fractional values ofm. The MMF</span></span>
<span class="line"><span>diagram is constructed for the low-frequency limit</span></span>
<span class="line"><span>Partial interleaving can lead to a partial improvement in proximity loss. Figure 10.37 illus-</span></span>
<span class="line"><span>trates a transformer having three primary layers and four secondary layers. If the total current</span></span>
<span class="line"><span>carried by each primary layer is i(t), then each secondary layer should carry current 0 .75i(t).</span></span>
<span class="line"><span>The maximum MMF again occurs in the spaces between the primary and secondary windings,</span></span>
<span class="line"><span>but has value 1.5i(t).</span></span>
<span class="line"><span>To determine the value for m in a given layer, we can solve Eq. (10.79)f o rm:</span></span>
<span class="line"><span>m= F (h)</span></span>
<span class="line"><span>F (h)−F (0) (10.89)</span></span>
<span class="line"><span>The above expression is valid in general, and Eq. ( 10.75) is symmetrical in F (0) and F (h).</span></span>
<span class="line"><span>Interchanging F (0) and F (h) leads to a diﬀerent value for m but does not change the result of</span></span>
<span class="line"><span>Eq. (10.81). When F(0) is greater in magnitude than F (h), it is convenient to interchange the</span></span>
<span class="line"><span>roles of F (0) and F (h), so that the plots of Figs. 10.31 and 10.32 can be employed.</span></span>
<span class="line"><span>In the leftmost secondary layer of Fig. 10.37, the layer carries current – 0.75 i. The MMF</span></span>
<span class="line"><span>changes from 0 to – 0.75i.T h ev a l u eo fm for this layer is found by evaluation of Eq. (10.89):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>440 10 Basic Magnetics Theory</span></span>
<span class="line"><span>m= F (h)</span></span>
<span class="line"><span>F (h)−F (0)= −0.75i</span></span>
<span class="line"><span>−0.75i−0= 1 (10.90)</span></span>
<span class="line"><span>The loss in this layer, relative to the dc loss of this secondary layer, can be determined using the</span></span>
<span class="line"><span>plots of Figs. 10.31 and 10.32 with m= 1. For the next secondary layer, we obtain</span></span>
<span class="line"><span>m= F (h)</span></span>
<span class="line"><span>F (h)−F (0)= −1.5i</span></span>
<span class="line"><span>−1.5i−(−0.75i)= 2 (10.91)</span></span>
<span class="line"><span>Hence the loss in this layer can be determined using the plots of Figs. 10.31 and 10.32 with</span></span>
<span class="line"><span>m= 2. The next layer is a primary winding layer. Its value of m can be expressed as</span></span>
<span class="line"><span>m= F (0)</span></span>
<span class="line"><span>F (0)−F (h)= −1.5i</span></span>
<span class="line"><span>−1.5i−(−0.5i)= 1.5 (10.92)</span></span>
<span class="line"><span>The loss in this layer, relative to the dc loss of this primary layer, can be determined using the</span></span>
<span class="line"><span>plots of Figs. 10.31 and 10.32 with m= 1.5. The center layer has an m of</span></span>
<span class="line"><span>m= F (h)</span></span>
<span class="line"><span>F (h)−F (0)= 0.5i</span></span>
<span class="line"><span>0.5i−(−0.5i)= 0.5 (10.93)</span></span>
<span class="line"><span>The loss in this layer, relative to the dc loss of this primary layer, can be determined using</span></span>
<span class="line"><span>the plots of Figs. 10.31 and 10.32 with m= 0.5. The remaining layers are symmetrical to the</span></span>
<span class="line"><span>corresponding layers described above, and have identical copper losses. The total loss in the</span></span>
<span class="line"><span>winding is found by summing the losses described above for each layer.</span></span>
<span class="line"><span>Interleaving windings can signiﬁcantly reduce the proximity loss when the primary and</span></span>
<span class="line"><span>secondary currents are in phase. However, in some cases such as the transformers of the ﬂyback</span></span>
<span class="line"><span>and SEPIC converters, the winding currents are out of phase. Interleaving then does little to</span></span>
<span class="line"><span>reduce the MMFs and magnetic ﬁelds in the vicinity of the windings, and hence the proximity</span></span>
<span class="line"><span>loss is essentially unchanged. It should also be noted that Eqs. (10.75)t o( 10.83) assume that the</span></span>
<span class="line"><span>winding currents are in phase. General expressions for out of phase currents, as well as analysis</span></span>
<span class="line"><span>of a ﬂyback example, are given in [94].</span></span>
<span class="line"><span>The above procedure can be used to determine the high-frequency copper losses of more</span></span>
<span class="line"><span>complicated multiple-winding magnetic devices. The MMF diagrams are constructed, and then</span></span>
<span class="line"><span>the power loss in each layer is evaluated using Eq. ( 10.82). These losses are summed, to ﬁnd</span></span>
<span class="line"><span>the total copper loss. The losses induced in electrostatic shields can also be determined. Several</span></span>
<span class="line"><span>additional examples are given in [94].</span></span>
<span class="line"><span>It can be concluded that, for sinusoidal currents, there is an optimal conductor thickness in</span></span>
<span class="line"><span>the vicinity of ϕ= 1 that leads to minimum copper loss. It is highly advantageous to minimize</span></span>
<span class="line"><span>the number of layers, and to interleave the windings. The amount of copper in the vicinity of the</span></span>
<span class="line"><span>high-MMF portions of windings should be kept to a minimum. Core geometries that maximize</span></span>
<span class="line"><span>the width ℓ</span></span>
<span class="line"><span>w of the layers, while minimizing the overall number of layers, lead to reduced</span></span>
<span class="line"><span>proximity loss.</span></span>
<span class="line"><span>Use of Litz wire is another means of increasing the conductor area while maintaining low</span></span>
<span class="line"><span>proximity losses. Tens, hundreds, or more strands of small-gauge insulated copper wire are bun-</span></span>
<span class="line"><span>dled together, and are externally connected in parallel. These strands are twisted, or transposed,</span></span>
<span class="line"><span>such that each strand passes equally through each position inside and on the surface of the bun-</span></span>
<span class="line"><span>dle. This prevents the circulation of high-frequency currents between strands. To be e ﬀective,</span></span>
<span class="line"><span>the diameter of the strands should be su ﬃciently less than one skin depth. Also, it should be</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 441</span></span>
<span class="line"><span>pointed out that the Litz wire bundle itself is composed of multiple layers. The disadvantages</span></span>
<span class="line"><span>of Litz wire are its increased cost, and its reduced ﬁll factor. The name “Litz” is derived from</span></span>
<span class="line"><span>t h eG e r m a nw o r dLitzendraht, or braided.</span></span>
<span class="line"><span>10.4.7 PWM Waveform Harmonics</span></span>
<span class="line"><span>The pulse-width modulated waveforms encountered in switching converters contain signiﬁcant</span></span>
<span class="line"><span>harmonics, which can lead to increased proximity losses. The eﬀect of harmonics on the losses</span></span>
<span class="line"><span>in a layer can be determined via ﬁeld harmonic analysis [ 94], in which the MMF waveforms</span></span>
<span class="line"><span>F (0, t) and F (d, t)o fE q .(10.75) are expressed in Fourier series. The power loss of each indi-</span></span>
<span class="line"><span>vidual harmonic is computed as in Sect. 10.4.4, and the losses are summed to ﬁnd the total loss</span></span>
<span class="line"><span>in a layer. For example, the PWM waveform of Fig. 10.38 can be represented by the following</span></span>
<span class="line"><span>Fourier series:</span></span>
<span class="line"><span>i(t)= I0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2 Ij cos (jωt) (10.94)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Ij=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2 Ipk</span></span>
<span class="line"><span>jπ sin (jπD)</span></span>
<span class="line"><span>with ω= 2π/Ts. This waveform contains a dc component I0 = DIpk, plus harmonics of rms</span></span>
<span class="line"><span>magnitude Ij proportional to 1/ j. The transformer winding current waveforms of most switch-</span></span>
<span class="line"><span>ing converters follow this Fourier series, or a similar series.</span></span>
<span class="line"><span>Fig. 10.38 Pulse-width modulated wind-</span></span>
<span class="line"><span>ing current waveform</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Ipk</span></span>
<span class="line"><span>DTs Ts0</span></span>
<span class="line"><span>Eﬀects of waveforms harmonics on proximity losses are discussed in [92–94]. The dc com-</span></span>
<span class="line"><span>ponent of the winding currents does not lead to proximity loss, and should not be included in</span></span>
<span class="line"><span>proximity loss calculations. Failure to remove the dc component can lead to signiﬁcantly pes-</span></span>
<span class="line"><span>simistic estimates of copper loss. The skin depthδ is smaller for high-frequency harmonics than</span></span>
<span class="line"><span>for the fundamental, and hence the waveform harmonics exhibit an increased eﬀective ϕ.L e t</span></span>
<span class="line"><span>ϕ1 be given by Eq. (10.74), in which δ is found by evaluation of Eq. (10.61) at the fundamen-</span></span>
<span class="line"><span>tal frequency. Since the penetration depth δ varies as the inverse square-root of frequency, the</span></span>
<span class="line"><span>eﬀective value ofϕfor harmonic j is</span></span>
<span class="line"><span>ϕj=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>jϕ1 (10.95)</span></span>
<span class="line"><span>In a multiple-layer winding excited by a current waveform whose fundamental component has</span></span>
<span class="line"><span>ϕ= ϕ1 close to 1, harmonics can signiﬁcantly increase the total copper loss. This occurs</span></span>
<span class="line"><span>because, for m&gt; 1, Q′(ϕ, m) is a rapidly increasing function of ϕin the vicinity of 1. When</span></span>
<span class="line"><span></span></span>
<span class="line"><span>442 10 Basic Magnetics Theory</span></span>
<span class="line"><span>ϕ1 is suﬃciently greater than 1, then Q′(ϕ, m) is nearly constant, and harmonics have less</span></span>
<span class="line"><span>inﬂuence on the total copper loss.</span></span>
<span class="line"><span>For example, suppose that the two-winding transformer of Fig. 10.33 is employed in a con-</span></span>
<span class="line"><span>verter such as the forward converter, in which a winding current waveform i(t) can be well</span></span>
<span class="line"><span>approximated by the Fourier series of Eq. ( 10.94). The winding contains M layers, and has dc</span></span>
<span class="line"><span>resistance Rdc. The copper loss induced by the dc component is</span></span>
<span class="line"><span>Pdc= I2</span></span>
<span class="line"><span>0 Rdc (10.96)</span></span>
<span class="line"><span>The copper loss Pj ascribable to harmonic j is found by evaluation of Eq. (10.87) with ϕ= ϕj:</span></span>
<span class="line"><span>Pj= I2</span></span>
<span class="line"><span>j Rdc</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>jϕ1</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>G1</span></span>
<span class="line"><span>⎦√</span></span>
<span class="line"><span>jϕ1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ 2</span></span>
<span class="line"><span>3(M2−1)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>G1</span></span>
<span class="line"><span>⎦√</span></span>
<span class="line"><span>j ϕ1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>−2G2</span></span>
<span class="line"><span>⎦√</span></span>
<span class="line"><span>j ϕ1</span></span>
<span class="line"><span>))]</span></span>
<span class="line"><span>(10.97)</span></span>
<span class="line"><span>The total copper loss in the winding is the sum of losses arising from all components of the</span></span>
<span class="line"><span>harmonic series:</span></span>
<span class="line"><span>Pcu</span></span>
<span class="line"><span>DI2</span></span>
<span class="line"><span>pkRdc</span></span>
<span class="line"><span>= D+ 2ϕ1</span></span>
<span class="line"><span>Dπ2</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>sin2( jπD)</span></span>
<span class="line"><span>j√j</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>GI</span></span>
<span class="line"><span>⎦√</span></span>
<span class="line"><span>jϕ1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>+ 2</span></span>
<span class="line"><span>3(M2−1)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>G1</span></span>
<span class="line"><span>⎦√</span></span>
<span class="line"><span>j ϕ1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>−2G2</span></span>
<span class="line"><span>⎦√</span></span>
<span class="line"><span>j ϕ1</span></span>
<span class="line"><span>))]</span></span>
<span class="line"><span>(10.98)</span></span>
<span class="line"><span>In Eq. (10.98), the copper loss is expressed relative to the loss DI2</span></span>
<span class="line"><span>pkRdc predicted by a low-</span></span>
<span class="line"><span>frequency analysis. This expression can be evaluated by use of a computer program or computer</span></span>
<span class="line"><span>spreadsheet.</span></span>
<span class="line"><span>To explicitly quantify the eﬀects of harmonics, we can deﬁne the harmonic loss factor F</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>as</span></span>
<span class="line"><span>FH =</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>Pj</span></span>
<span class="line"><span>P1</span></span>
<span class="line"><span>(10.99)</span></span>
<span class="line"><span>with Pj given by Eq. (10.97). The total winding copper loss is then given by</span></span>
<span class="line"><span>Pcu= I2</span></span>
<span class="line"><span>0 Rdc+ FH FRI2</span></span>
<span class="line"><span>1 Rdc (10.100)</span></span>
<span class="line"><span>with FR given by Eq. (10.87). The harmonic factor FH is a function not only of the winding</span></span>
<span class="line"><span>geometry, but also of the harmonic spectrum of the winding current waveform. The harmonic</span></span>
<span class="line"><span>factor F</span></span>
<span class="line"><span>H is plotted in Fig. 10.39 for several values of D, for the simple transformer example.</span></span>
<span class="line"><span>The total harmonic distortion (THD) of the example current waveforms are: 48% for D= 0.5,</span></span>
<span class="line"><span>76% for D= 0.3, and 191% for D= 0.1. The waveform THD is deﬁned as</span></span>
<span class="line"><span>THD=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>j=2</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>j</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>(10.101)</span></span>
<span class="line"><span>It can be seen that harmonics signiﬁcantly increase the proximity loss of a multi-layer winding</span></span>
<span class="line"><span>when ϕ1 is close to 1. For suﬃciently small ϕ1, the proximity eﬀect can be neglected, and FH</span></span>
<span class="line"><span>tends to the value 1 + (THD)2.F o rl a r g eϕ1, the harmonics also increase the proximity loss;</span></span>
<span class="line"><span>however, the increase is less dramatic than for ϕ1 near 1 because the fundamental component</span></span>
<span class="line"><span>proximity loss is large. It can be concluded that, when the current waveform contains high THD</span></span>
<span class="line"><span>and when the winding contains several layers or more, then proximity losses can be kept low</span></span>
<span class="line"><span>only by choosingϕ</span></span>
<span class="line"><span>1 much less than 1. Interleaving the windings allows a larger value ofϕ1 to</span></span>
<span class="line"><span>be employed.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 443</span></span>
<span class="line"><span>Fig. 10.39 Increased proximity</span></span>
<span class="line"><span>losses induced by PWM waveform</span></span>
<span class="line"><span>harmonics, forward converter exam-</span></span>
<span class="line"><span>ple: (a)a t D= 0.1, (b)a t D= 0.3,</span></span>
<span class="line"><span>(c)a t D= 0.5</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>0111.0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>FH</span></span>
<span class="line"><span>M = 0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>56</span></span>
<span class="line"><span>8</span></span>
<span class="line"><span>M = 10 D = 0.1</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>0111.0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>FH</span></span>
<span class="line"><span>M = 0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>8</span></span>
<span class="line"><span>M = 10</span></span>
<span class="line"><span>D = 0.3</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>0111.0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>FH</span></span>
<span class="line"><span>D = 0.5</span></span>
<span class="line"><span>M = 0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1.5</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>8</span></span>
<span class="line"><span>M = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>444 10 Basic Magnetics Theory</span></span>
<span class="line"><span>10.5 Several Types of Magnetic Devices, Their B–H Loops,</span></span>
<span class="line"><span>and Core vs. Copper Loss</span></span>
<span class="line"><span>A variety of magnetic elements are commonly used in power applications, which employ the</span></span>
<span class="line"><span>properties of magnetic core materials and windings in diﬀerent ways. As a result, quite a few</span></span>
<span class="line"><span>factors constrain the design of a magnetic device. The maximum ﬂux density must not saturate</span></span>
<span class="line"><span>the core. The peak ac ﬂux density should also be su ﬃciently small, such that core losses are</span></span>
<span class="line"><span>acceptably low. The wire size should be suﬃciently small, to ﬁt the required number of turns</span></span>
<span class="line"><span>in the core window. Subject to this constraint, the wire cross-sectional area should be as large</span></span>
<span class="line"><span>as possible, to minimize the winding dc resistance and copper loss. But if the wire is too thick,</span></span>
<span class="line"><span>then unacceptable copper losses occur owing to the proximity eﬀect. An air gap is needed when</span></span>
<span class="line"><span>the device stores signiﬁcant energy. But an air gap is undesirable in transformer applications. It</span></span>
<span class="line"><span>should be apparent that, for a given magnetic device, some of these constraints are active while</span></span>
<span class="line"><span>others are not signiﬁcant.</span></span>
<span class="line"><span>Thus, design of a magnetic element involves not only obtaining the desired inductance or</span></span>
<span class="line"><span>turns ratio, but also ensuring that the core material does not saturate and that the total power loss</span></span>
<span class="line"><span>is not too large. Several common power applications of magnetics are discussed in this section,</span></span>
<span class="line"><span>which illustrate the factors governing the choice of core material, maximum ﬂux density, and</span></span>
<span class="line"><span>design approach.</span></span>
<span class="line"><span>10.5.1 Filter Inductor</span></span>
<span class="line"><span>A ﬁlter inductor employed in a CCM buck converter is illustrated in Fig. 10.40a. In this ap-</span></span>
<span class="line"><span>plication, the value of inductance L often is chosen such that the inductor current ripple peak</span></span>
<span class="line"><span>magnitudeΔi is a small fraction of the full-load inductor current dc component I, as illustrated</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(b) i(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>I iL</span></span>
<span class="line"><span>Fig. 10.40 Filter inductor employed in a CCM buck converter: (a) circuit schematic, (b) inductor current</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.5 Several Types of Magnetic Devices, Their B–H Loops, and Core vs. Copper Loss 445</span></span>
<span class="line"><span>Fig. 10.41 Filter inductor: (a) structure, (b) magnetic circuit model</span></span>
<span class="line"><span>Fig. 10.42 Filter inductor minor B–H</span></span>
<span class="line"><span>loop</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>Hc0</span></span>
<span class="line"><span>Hc</span></span>
<span class="line"><span>Hc</span></span>
<span class="line"><span>Bsat</span></span>
<span class="line"><span>filter inductor</span></span>
<span class="line"><span>large excitation</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>in Fig. 10.40b. As illustrated in Fig. 10.41, an air gap is employed that is su ﬃciently large to</span></span>
<span class="line"><span>prevent saturation of the core by the peak current I+Δi.</span></span>
<span class="line"><span>The core magnetic ﬁeld strength Hc(t) is related to the winding current i(t) according to</span></span>
<span class="line"><span>Hc(t)= ni(t)</span></span>
<span class="line"><span>ℓc</span></span>
<span class="line"><span>Rc</span></span>
<span class="line"><span>Rc+ Rg</span></span>
<span class="line"><span>(10.102)</span></span>
<span class="line"><span>whereℓc is the magnetic path length of the core. Since Hc(t) is proportional to i(t), Hc(t) can be</span></span>
<span class="line"><span>expressed as a large dc component Hc0 and a small superimposed ac rippleΔHc, where</span></span>
<span class="line"><span>Hc0= nI</span></span>
<span class="line"><span>ℓc</span></span>
<span class="line"><span>Rc</span></span>
<span class="line"><span>Rc+ Rg</span></span>
<span class="line"><span>(10.103)</span></span>
<span class="line"><span>ΔHc= nΔi</span></span>
<span class="line"><span>ℓc</span></span>
<span class="line"><span>Rc</span></span>
<span class="line"><span>Rc+ Rg</span></span>
<span class="line"><span>As k e t c ho fB(t)v s .Hc(t) for this application is given in Fig. 10.42. This device operates with</span></span>
<span class="line"><span>the minor B–H loop illustrated. The size of the minor loop, and hence the core loss, depends on</span></span>
<span class="line"><span>the magnitude of the inductor current ripple Δi. The copper loss depends on the rms inductor</span></span>
<span class="line"><span></span></span>
<span class="line"><span>446 10 Basic Magnetics Theory</span></span>
<span class="line"><span>current ripple, essentially equal to the dc component I. Typically, the core loss can be ignored,</span></span>
<span class="line"><span>and the design is driven by the copper loss. The maximum ﬂux density is limited by saturation of</span></span>
<span class="line"><span>the core. Proximity losses are negligible. Although a high-frequency ferrite material can be em-</span></span>
<span class="line"><span>ployed in this application, other materials having higher core losses and greater saturation ﬂux</span></span>
<span class="line"><span>density lead to a physically smaller device. Design of a ﬁlter inductor in which the maximum</span></span>
<span class="line"><span>ﬂux density is a speciﬁed value is considered in the next chapter.</span></span>
<span class="line"><span>10.5.2 AC Inductor</span></span>
<span class="line"><span>An ac inductor employed in a resonant converter is illustrated in Fig. 10.43. In this application,</span></span>
<span class="line"><span>the high-frequency current variations are large. In consequence, the B(t)−H(t) loop illustrated</span></span>
<span class="line"><span>in Fig.10.44 is large. Core loss and proximity loss are usually signiﬁcant in this application. The</span></span>
<span class="line"><span>maximum ﬂux density is limited by core loss rather than saturation. Both core loss and copper</span></span>
<span class="line"><span>loss must be accounted for in the design of this element, and the peak ac ﬂux density ΔB is a</span></span>
<span class="line"><span>design variable that is typically chosen to minimize the total loss. A high-frequency material</span></span>
<span class="line"><span>having low core loss, such as ferrite, is normally employed. Design of magnetics such as this, in</span></span>
<span class="line"><span>which the ac ﬂux density is a design variable that is chosen in a optimal manner, is considered</span></span>
<span class="line"><span>in Chap. 12.</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(b) i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>Fig. 10.43 Ac inductor, resonant converter example: (a) resonant tank circuit, (b) inductor current wave-</span></span>
<span class="line"><span>form</span></span>
<span class="line"><span>Fig. 10.44 Operational B–H loop of an</span></span>
<span class="line"><span>ac inductor</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>Hc Hc</span></span>
<span class="line"><span>Bsat</span></span>
<span class="line"><span>operation as</span></span>
<span class="line"><span>ac inductor</span></span>
<span class="line"><span>Hc</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.5 Several Types of Magnetic Devices, Their B–H Loops, and Core vs. Copper Loss 447</span></span>
<span class="line"><span>10.5.3 Transformer</span></span>
<span class="line"><span>Figure 10.45 illustrates a conventional transformer employed in a switching converter. Magneti-</span></span>
<span class="line"><span>zation of the core is modeled by the magnetizing inductance LM. The magnetizing current iM(t)</span></span>
<span class="line"><span>is related to the core magnetic ﬁeld H(t) according to Ampere’s law</span></span>
<span class="line"><span>H(t)= niM(t)</span></span>
<span class="line"><span>ℓm</span></span>
<span class="line"><span>(10.104)</span></span>
<span class="line"><span>However, iM(t) is not a direct function of the winding currents i1(t)o r i2(t). Rather, the mag-</span></span>
<span class="line"><span>netizing current is dependent on the applied winding voltage waveform v1(t). Speciﬁcally, the</span></span>
<span class="line"><span>maximum ac ﬂux density is directly proportional to the applied volt-secondsλ1. A typical B–H</span></span>
<span class="line"><span>loop for this application is illustrated in Fig. 10.46.</span></span>
<span class="line"><span>In the transformer application, core loss and proximity losses are usually signiﬁcant. Typ-</span></span>
<span class="line"><span>ically the maximum ﬂux density is limited by core loss rather than by saturation. A high-</span></span>
<span class="line"><span>frequency material having low core loss is employed; in a transformer-isolated switching con-</span></span>
<span class="line"><span>verter, ferrite typically is used. Both core and copper losses must be accounted for in the design</span></span>
<span class="line"><span>of the transformer. The design must also incorporate multiple windings. Transformer design</span></span>
<span class="line"><span>with ﬂux density optimized for minimum total loss is described in Chap. 12.</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>i1(t) i2(t)</span></span>
<span class="line"><span>LM</span></span>
<span class="line"><span>iM(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>iM(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>iM</span></span>
<span class="line"><span>v1(t) Area 1</span></span>
<span class="line"><span>Fig. 10.45 Conventional transformer: (a) equivalent circuit, (b) typical primary voltage and magnetizing</span></span>
<span class="line"><span>current waveforms</span></span>
<span class="line"><span>Fig. 10.46 Operational B–H loop of a</span></span>
<span class="line"><span>conventional transformer</span></span>
<span class="line"><span>operation as</span></span>
<span class="line"><span>conventional</span></span>
<span class="line"><span>transformer</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>Hc</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2n1 Ac</span></span>
<span class="line"><span>n1 imp</span></span>
<span class="line"><span>l m</span></span>
<span class="line"><span></span></span>
<span class="line"><span>448 10 Basic Magnetics Theory</span></span>
<span class="line"><span>10.5.4 Coupled Inductor</span></span>
<span class="line"><span>A coupled inductor is a ﬁlter inductor having multiple windings. Figure 10.47a illustrates cou-</span></span>
<span class="line"><span>pled inductors in a two-output forward converter. The inductors can be wound on the same core,</span></span>
<span class="line"><span>because the winding voltage waveforms are proportional. The inductors of the SEPIC and ´Cuk</span></span>
<span class="line"><span>converters, as well as of multiple-output buck-derived converters and some other converters, can</span></span>
<span class="line"><span>be coupled. The inductor current ripples can be controlled by control of the winding leakage</span></span>
<span class="line"><span>inductances [97, 98]. Dc currents ﬂow in each winding as illustrated in Fig. 10.47b, and the net</span></span>
<span class="line"><span>magnetization of the core is proportional to the sum of the winding ampere-turns:</span></span>
<span class="line"><span>Hc(t)= n1i1(t)+ n2i2(t)</span></span>
<span class="line"><span>ℓc</span></span>
<span class="line"><span>Rc</span></span>
<span class="line"><span>Rc+ Rg</span></span>
<span class="line"><span>(10.105)</span></span>
<span class="line"><span>As in the case of the single winding ﬁlter inductor, the size of the minorB–H loop is proportional</span></span>
<span class="line"><span>to the total current ripple (Fig. 10.48). Small ripple implies small core loss, as well as small</span></span>
<span class="line"><span>proximity loss. An air gap is employed, and the maximum ﬂux density is typically limited by</span></span>
<span class="line"><span>saturation.</span></span>
<span class="line"><span>(a) n1 +</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>+vg</span></span>
<span class="line"><span>(b) i1(t)</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>Fig. 10.47 Coupling the output ﬁlter inductors of a two-output forward converter: ( a) schematic, ( b)</span></span>
<span class="line"><span>typical inductor current waveforms</span></span></code></pre></div>`,10)])])}const m=s(i,[["render",l]]);export{u as __pageData,m as default};
