import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第10章part 1 - 10 Basic Magnetics Theory","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第10章part 1 - 10 Basic Magnetics Theory","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 418-437 > Chunk ID: `chapter-10-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/027-chapter-10-part-1.md","filePath":"content/power/fundamentals-work/chunks/027-chapter-10-part-1.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/027-chapter-10-part-1.md"};function l(t,n,c,r,o,h){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="第10章part-1-10-basic-magnetics-theory" tabindex="-1">第10章part 1 - 10 Basic Magnetics Theory <a class="header-anchor" href="#第10章part-1-10-basic-magnetics-theory" aria-label="Permalink to &quot;第10章part 1 - 10 Basic Magnetics Theory&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 418-437<br> Chunk ID: <code>chapter-10-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10</span></span>
<span class="line"><span>Basic Magnetics Theory</span></span>
<span class="line"><span>Magnetics are an integral part of every switching converter. Often, the design of the magnetic</span></span>
<span class="line"><span>devices cannot be isolated from the converter design. The power electronics engineer must</span></span>
<span class="line"><span>not only model and design the converter, but must model and design the magnetics as well.</span></span>
<span class="line"><span>Modeling and designing of magnetics for switching converters is the topic of Part III of this</span></span>
<span class="line"><span>book.</span></span>
<span class="line"><span>In this chapter, basic magnetics theory is reviewed, including magnetic circuits, inductor</span></span>
<span class="line"><span>modeling, and transformer modeling [ 85–89]. Loss mechanisms in magnetic devices are de-</span></span>
<span class="line"><span>scribed. Winding eddy currents and the proximity eﬀect, a signiﬁcant loss mechanism in high-</span></span>
<span class="line"><span>current high-frequency windings, are explained in detail [90–95]. Inductor design is introduced</span></span>
<span class="line"><span>in Chap. 11, and transformer design is covered in Chap. 12.</span></span>
<span class="line"><span>10.1 Review of Basic Magnetics</span></span>
<span class="line"><span>10.1.1 Basic Relationships</span></span>
<span class="line"><span>The basic magnetic quantities are illustrated in Fig.10.1. Also illustrated are the analogous, and</span></span>
<span class="line"><span>perhaps more familiar, electrical quantities. The magnetomotive force F , or scalar potential,</span></span>
<span class="line"><span>between two points x1 and x2 is given by the integral of the magnetic ﬁeld H along a path</span></span>
<span class="line"><span>connecting the points:</span></span>
<span class="line"><span>F=</span></span>
<span class="line"><span>∫ x2</span></span>
<span class="line"><span>x1</span></span>
<span class="line"><span>H· dℓ (10.1)</span></span>
<span class="line"><span>where dℓ is a vector length element pointing in the direction of the path. The dot product yields</span></span>
<span class="line"><span>the component of H in the direction of the path. If the magnetic ﬁeld is of uniform strength H</span></span>
<span class="line"><span>passing through an element of lengthℓ as illustrated, then Eq. (10.1) reduces to</span></span>
<span class="line"><span>F= Hℓ (10.2)</span></span>
<span class="line"><span>This is analogous to the electric ﬁeld of uniform strength E, which induces a voltage V= Eℓ</span></span>
<span class="line"><span>between two points separated by distanceℓ.</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_10</span></span>
<span class="line"><span>409</span></span>
<span class="line"><span></span></span>
<span class="line"><span>410 10 Basic Magnetics Theory</span></span>
<span class="line"><span>Fig. 10.1 Comparison of magnetic ﬁeld H, MMF F ,ﬂ u xΦ, and ﬂux density B, with the analogous</span></span>
<span class="line"><span>electrical quantities E, V, I,a n dJ</span></span>
<span class="line"><span>Figure 10.1 also illustrates a total magnetic ﬂuxΦpassing through a surface S having area</span></span>
<span class="line"><span>Ac. The total ﬂuxΦis equal to the integral of the normal component of the ﬂux density B over</span></span>
<span class="line"><span>the surface</span></span>
<span class="line"><span>Φ=</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>sur f ace S</span></span>
<span class="line"><span>B· dA (10.3)</span></span>
<span class="line"><span>where dA is a vector area element having direction normal to the surface. For a uniform ﬂux</span></span>
<span class="line"><span>density of magnitude B as illustrated, the integral reduces to</span></span>
<span class="line"><span>Φ=BAc (10.4)</span></span>
<span class="line"><span>Flux density B is analogous to the electrical current density J, and ﬂuxΦis analogous to the</span></span>
<span class="line"><span>electric current I. If a uniform current density of magnitude J passes through a surface of area</span></span>
<span class="line"><span>Ac, then the total current is I= JAc.</span></span>
<span class="line"><span>Faraday’s law relates the voltage induced in a winding to the total ﬂux passing through the</span></span>
<span class="line"><span>interior of the winding. Figure10.2 illustrates ﬂuxΦ(t) passing through the interior of a loop of</span></span>
<span class="line"><span>Fig. 10.2 The voltage v(t) induced in a loop of</span></span>
<span class="line"><span>wire is related by Faraday’s law to the derivative</span></span>
<span class="line"><span>of the total ﬂuxΦ(t) passing through the interior</span></span>
<span class="line"><span>of the loop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.1 Review of Basic Magnetics 411</span></span>
<span class="line"><span>Fig. 10.3 Illustration of Lenz’s law in a shorted</span></span>
<span class="line"><span>loop of wire. The ﬂuxΦ(t) induces currenti(t), which</span></span>
<span class="line"><span>in turn generates ﬂux Φ′(t) that tends to oppose</span></span>
<span class="line"><span>changes inΦ(t) Flux (t)</span></span>
<span class="line"><span>Induced current</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Shorted</span></span>
<span class="line"><span>loop</span></span>
<span class="line"><span>Induced</span></span>
<span class="line"><span>flux </span></span>
<span class="line"><span>(t)</span></span>
<span class="line"><span>wire. The loop encloses cross-sectional area Ac. According to Faraday’s law, the ﬂux induces a</span></span>
<span class="line"><span>voltage v(t) in the wire, given by</span></span>
<span class="line"><span>v(t)= dΦ(t)</span></span>
<span class="line"><span>dt (10.5)</span></span>
<span class="line"><span>where the polarities of v(t) andΦ(t) are deﬁned according to the right-hand rule, as in Fig. 10.2.</span></span>
<span class="line"><span>For a uniform ﬂux distribution, we can express v(t) in terms of the ﬂux density B(t) by substitu-</span></span>
<span class="line"><span>tion of Eq. (10.4):</span></span>
<span class="line"><span>v(t)= Ac</span></span>
<span class="line"><span>dB(t)</span></span>
<span class="line"><span>dt (10.6)</span></span>
<span class="line"><span>Thus, the voltage induced in a winding is related to the ﬂuxΦand ﬂux density B passing through</span></span>
<span class="line"><span>the interior of the winding.</span></span>
<span class="line"><span>Lenz’s law states that the voltage v(t) induced by the changing ﬂuxΦ(t)i nF i g .10.2 is of the</span></span>
<span class="line"><span>polarity that tends to drive a current through the loop to counteract the ﬂux change. For example,</span></span>
<span class="line"><span>consider the shorted loop of Fig. 10.3. The changing ﬂux Φ(t) passing through the interior of</span></span>
<span class="line"><span>the loop induces a voltage v(t) around the loop. This voltage, divided by the impedance of the</span></span>
<span class="line"><span>loop conductor, leads to a current i(t) as illustrated. The current i(t) induces a ﬂuxΦ′(t), which</span></span>
<span class="line"><span>tends to oppose the changes in Φ(t). Lenz’s law is invoked later in this chapter, to provide a</span></span>
<span class="line"><span>qualitative understanding of eddy current phenomena.</span></span>
<span class="line"><span>Ampere’s law relates the current in a winding to the magnetomotive force F and magnetic</span></span>
<span class="line"><span>ﬁeld H. The net MMF around a closed path of length ℓm is equal to the total current passing</span></span>
<span class="line"><span>through the interior of the path. For example, Fig. 10.4 illustrates a magnetic core, in which a</span></span>
<span class="line"><span>wire carrying current i(t) passes through the window in the center of the core. Let us consider</span></span>
<span class="line"><span>the closed path illustrated, which follows the magnetic ﬁeld lines around the interior of the core.</span></span>
<span class="line"><span>Ampere’s law states that</span></span>
<span class="line"><span>∮</span></span>
<span class="line"><span>closed path</span></span>
<span class="line"><span>H· dℓ= total current passing through interior of path (10.7)</span></span>
<span class="line"><span>Fig. 10.4 The net MMF around</span></span>
<span class="line"><span>a closed path is related by Am-</span></span>
<span class="line"><span>pere’s law to the total current passing</span></span>
<span class="line"><span>through the interior of the path</span></span>
<span class="line"><span></span></span>
<span class="line"><span>412 10 Basic Magnetics Theory</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>Hμ0</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>μ</span></span>
<span class="line"><span>Fig. 10.5 B–H characteristics: (a) of free space or air, (b) of a typical magnetic core material</span></span>
<span class="line"><span>The total current passing through the interior of the path is equal to the total current passing</span></span>
<span class="line"><span>through the window in the center of the core, or i(t). If the magnetic ﬁeld is uniform and of</span></span>
<span class="line"><span>magnitude H(t), then the integral is H(t)ℓm. So for the example of Fig. 10.4,E q .(10.7) reduces</span></span>
<span class="line"><span>to</span></span>
<span class="line"><span>F (t)= H(t)ℓm= i(t) (10.8)</span></span>
<span class="line"><span>Thus, the magnetic ﬁeld strength H(t) is related to the winding current i(t). We can view</span></span>
<span class="line"><span>winding currents as sources of MMF. Equation ( 10.8) states that the MMF around the core,</span></span>
<span class="line"><span>F (t)= H(t)ℓm, is equal to the winding current MMF i(t). The total MMF around the closed</span></span>
<span class="line"><span>loop, accounting for both MMFs, is zero.</span></span>
<span class="line"><span>The relationship between B and H, or equivalently betweenΦand F , is determined by the</span></span>
<span class="line"><span>core material characteristics. Figure 10.5a illustrates the characteristics of free space, or air:</span></span>
<span class="line"><span>B= μ0H (10.9)</span></span>
<span class="line"><span>The quantityμ0 is the permeability of free space, and is equal to 4 π· 10−7 Henries per meter</span></span>
<span class="line"><span>in MKS units. Figure 10.5b illustrates the B–H characteristic of a typical iron alloy under high-</span></span>
<span class="line"><span>level sinusoidal steady-state excitation. The characteristic is highly nonlinear, and exhibits both</span></span>
<span class="line"><span>hysteresis and saturation. The exact shape of the characteristic is dependent on the excitation,</span></span>
<span class="line"><span>and is diﬃcult to predict for arbitrary waveforms.</span></span>
<span class="line"><span>For purposes of analysis, the core material characteristic of Fig.10.5b is usually modeled by</span></span>
<span class="line"><span>the linear or piecewise-linear characteristics of Fig.10.6.I nF i g .10.6a, hysteresis and saturation</span></span>
<span class="line"><span>are ignored. The B–H characteristic is then given by</span></span>
<span class="line"><span>B= μH</span></span>
<span class="line"><span>μ= μrμ0 (10.10)</span></span>
<span class="line"><span>The core material permeabilityμcan be expressed as the product of the relative permeabilityμr</span></span>
<span class="line"><span>and ofμ0. Typical values ofμr lie in the range 103 to 105.</span></span>
<span class="line"><span>The piecewise-linear model of Fig. 10.6b accounts for saturation but not hysteresis. The</span></span>
<span class="line"><span>core material saturates when the magnitude of the ﬂux density B exceeds the saturation ﬂux</span></span>
<span class="line"><span>density Bsat.F o r| B|&lt; Bsat, the characteristic follows Eq. ( 10.10). When| B|&gt; Bsat,t h e</span></span>
<span class="line"><span>model predicts that the core reverts to free space, with a characteristic having a much smaller</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.1 Review of Basic Magnetics 413</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>μ = μr μ0</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>μ</span></span>
<span class="line"><span>Bsat</span></span>
<span class="line"><span>sat</span></span>
<span class="line"><span>Fig. 10.6 Approximation of the B–H characteristics of a magnetic core material: (a) by neglecting both</span></span>
<span class="line"><span>hysteresis and saturation, (b) by neglecting hysteresis</span></span>
<span class="line"><span>slope approximately equal to μ0. Square-loop materials exhibit this type of abrupt-saturation</span></span>
<span class="line"><span>characteristic, and additionally have a very large relative permeabilityμr. Soft materials exhibit</span></span>
<span class="line"><span>a less abrupt saturation characteristic, in whichμgradually decreases as H is increased. Typical</span></span>
<span class="line"><span>values of Bsat are 1 to 2 Tesla for iron laminations and silicon steel, 0.5 to 1 Tesla for powdered</span></span>
<span class="line"><span>iron and molypermalloy materials, and 0.25 to 0.5 Tesla for ferrite materials.</span></span>
<span class="line"><span>Unit systems for magnetic quantities are summarized in Table 10.1. The MKS system is</span></span>
<span class="line"><span>used throughout this book. The unrationalized CGS system also continues to ﬁnd some use.</span></span>
<span class="line"><span>Conversions between these systems are listed.</span></span>
<span class="line"><span>Table 10.1 Units for magnetic quantities</span></span>
<span class="line"><span>Quantity MKS Unrationalized CGS Conversions</span></span>
<span class="line"><span>Core material equation B=μ0μrHB =μrH</span></span>
<span class="line"><span>B Tesla Gauss 1 T = 104G</span></span>
<span class="line"><span>H Ampere/meter Oersted 1 A /m= 4π· 10−3 Oe</span></span>
<span class="line"><span>Φ Weber Maxwell 1W b= 108Mx</span></span>
<span class="line"><span>1T= 1W b/m2</span></span>
<span class="line"><span>Figure 10.7 summarizes the relationships between the basic electrical and magnetic quanti-</span></span>
<span class="line"><span>ties of a magnetic device. The winding voltage v(t) is related to the core ﬂux and ﬂux density</span></span>
<span class="line"><span>via Faraday’s law. The winding currenti(t) is related to the magnetic ﬁeld strength via Ampere’s</span></span>
<span class="line"><span>law. The core material characteristics relate B and H.</span></span>
<span class="line"><span>We can now determine the electrical terminal characteristics of the simple inductor of</span></span>
<span class="line"><span>Fig. 10.8a. A winding of n turns is placed on a core having permeabilityμ. Faraday’s law states</span></span>
<span class="line"><span>that the ﬂuxΦ(t) inside the core induces a voltage vturn(t) in each turn of the winding, given by</span></span>
<span class="line"><span>vturn(t)= dΦ(t)</span></span>
<span class="line"><span>dt (10.11)</span></span>
<span class="line"><span>Since the same ﬂuxΦ(t) passes through each turn of the winding, the total winding voltage is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>414 10 Basic Magnetics Theory</span></span>
<span class="line"><span>Fig. 10.7 Summary of the steps in</span></span>
<span class="line"><span>determination of the terminal electri-</span></span>
<span class="line"><span>cal i–v characteristics of a magnetic</span></span>
<span class="line"><span>element</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>B(t), (t)</span></span>
<span class="line"><span>H(t), F (t)</span></span>
<span class="line"><span>Terminal</span></span>
<span class="line"><span>characteristics</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>characteristics</span></span>
<span class="line"><span>Fig. 10.8 Inductor example:</span></span>
<span class="line"><span>(a) inductor geometry, (b) appli-</span></span>
<span class="line"><span>cation of Ampere’s law</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>core</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>Core area</span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>permeability</span></span>
<span class="line"><span>μ</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>Magnetic</span></span>
<span class="line"><span>path</span></span>
<span class="line"><span>length l</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span>v(t)= nvturn(t)= ndΦ(t)</span></span>
<span class="line"><span>dt (10.12)</span></span>
<span class="line"><span>Equation (10.12) can be expressed in terms of the average ﬂux density B(t) by substitution of</span></span>
<span class="line"><span>Eq. (10.4):</span></span>
<span class="line"><span>v(t)= nAc</span></span>
<span class="line"><span>dB(t)</span></span>
<span class="line"><span>dt (10.13)</span></span>
<span class="line"><span>where the average ﬂux density B(t)i sΦ(t)/Ac.</span></span>
<span class="line"><span>The use of Ampere’s law is illustrated in Fig. 10.8b. A closed path is chosen which follows</span></span>
<span class="line"><span>an average magnetic ﬁeld line around the interior of the core. The length of this path is called</span></span>
<span class="line"><span>the mean magnetic path lengthℓm. If the magnetic ﬁeld strengthH(t) is uniform, then Ampere’s</span></span>
<span class="line"><span>law states that Hℓm is equal to the total current passing through the interior of the path, that is,</span></span>
<span class="line"><span>the net current passing through the window in the center of the core. Since there are n turns of</span></span>
<span class="line"><span>wire passing through the window, each carrying currenti(t), the net current passing through the</span></span>
<span class="line"><span>window is ni(t). Hence, Ampere’s law states that</span></span>
<span class="line"><span>H(t)ℓm= ni(t) (10.14)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.1 Review of Basic Magnetics 415</span></span>
<span class="line"><span>Let us model the core material characteristics by neglecting hysteresis but accounting for</span></span>
<span class="line"><span>saturation, as follows:</span></span>
<span class="line"><span>B=</span></span>
<span class="line"><span>⎧⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎩</span></span>
<span class="line"><span>Bsat for H≥Bsat/μ</span></span>
<span class="line"><span>μH for|H|&lt; Bsat/μ</span></span>
<span class="line"><span>−Bsat for H≤−Bsat/μ</span></span>
<span class="line"><span>(10.15)</span></span>
<span class="line"><span>The B–H characteristic saturated slopeμ0 is much smaller thanμ, and is ignored here. A char-</span></span>
<span class="line"><span>acteristic similar to Fig. 10.6b is obtained. The current magnitude Isat at the onset of saturation</span></span>
<span class="line"><span>can be found by substitution of H= Bsat/μinto Eq. (10.14). The result is</span></span>
<span class="line"><span>Isat= Bsatℓm</span></span>
<span class="line"><span>μn (10.16)</span></span>
<span class="line"><span>We can now eliminateB and H from Eqs. (10.13)t o( 10.15), and solve for the electrical terminal</span></span>
<span class="line"><span>characteristics. For|I|&lt; Isat, B= μH. Equation (10.13) then becomes</span></span>
<span class="line"><span>v(t)= μnAc</span></span>
<span class="line"><span>dH(t)</span></span>
<span class="line"><span>dt (10.17)</span></span>
<span class="line"><span>Substitution of Eq. (10.14) into Eq. (10.17) to eliminate H(t) then leads to</span></span>
<span class="line"><span>v(t)= μn2Ac</span></span>
<span class="line"><span>ℓm</span></span>
<span class="line"><span>di(t)</span></span>
<span class="line"><span>dt (10.18)</span></span>
<span class="line"><span>which is of the form</span></span>
<span class="line"><span>v(t)= Ldi(t)</span></span>
<span class="line"><span>dt (10.19)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>L= μn2Ac</span></span>
<span class="line"><span>ℓm</span></span>
<span class="line"><span>(10.20)</span></span>
<span class="line"><span>So the device behaves as an inductor for|I|&lt; Isat. When|I|&gt; Isat, then the ﬂux density B(t)=</span></span>
<span class="line"><span>Bsat is constant. Faraday’s law states that the terminal voltage is then</span></span>
<span class="line"><span>v(t)= nAc</span></span>
<span class="line"><span>dBsat</span></span>
<span class="line"><span>dt = 0 (10.21)</span></span>
<span class="line"><span>When the core saturates, the magnetic device behavior approaches a short circuit. The device</span></span>
<span class="line"><span>behaves as an inductor only when the winding current magnitude is less than Isat. Practical</span></span>
<span class="line"><span>inductors exhibit some small residual inductance due to their nonzero saturated permeabilities;</span></span>
<span class="line"><span>nonetheless, in saturation the inductor impedance is greatly reduced, and large inductor currents</span></span>
<span class="line"><span>may result.</span></span>
<span class="line"><span>10.1.2 Magnetic Circuits</span></span>
<span class="line"><span>Figure 10.9a illustrates uniform ﬂux and magnetic ﬁeld inside an element having permeability</span></span>
<span class="line"><span>μ, lengthℓ, and cross-sectional area Ac. The MMF between the two ends of the element is</span></span>
<span class="line"><span>F= Hℓ (10.22)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>416 10 Basic Magnetics Theory</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Flux</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>Length l</span></span>
<span class="line"><span>MMF F Area</span></span>
<span class="line"><span>Ac</span></span>
<span class="line"><span>Core permeability μ</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>R= l</span></span>
<span class="line"><span>μAc</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Fig. 10.9 An element containing magnetic ﬂux (a), and its equivalent magnetic circuit (b)</span></span>
<span class="line"><span>Since H= B/μand B=Φ/Ac, we can express F as</span></span>
<span class="line"><span>F= ℓ</span></span>
<span class="line"><span>μAc</span></span>
<span class="line"><span>Φ (10.23)</span></span>
<span class="line"><span>This equation is of the form</span></span>
<span class="line"><span>F=ΦR (10.24)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>R= ℓ</span></span>
<span class="line"><span>μAc</span></span>
<span class="line"><span>(10.25)</span></span>
<span class="line"><span>Equation ( 10.24) resembles Ohm’s law. This equation states that the magnetic ﬂux through</span></span>
<span class="line"><span>an element is proportional to the MMF across the element. The constant of proportionality,</span></span>
<span class="line"><span>or the reluctance R, is analogous to the resistance R of an electrical conductor. Indeed, we</span></span>
<span class="line"><span>can construct a lumped-element magnetic circuit model that corresponds to Eq. ( 10.24), as in</span></span>
<span class="line"><span>Fig. 10.9b. In this magnetic circuit model, voltage and current are replaced by MMF and ﬂux,</span></span>
<span class="line"><span>while the element characteristic, Eq. (10.24), is represented by the analog of a resistor, having</span></span>
<span class="line"><span>reluctance R.</span></span>
<span class="line"><span>Complicated magnetic structures, composed of multiple windings and multiple heteroge-</span></span>
<span class="line"><span>neous elements such as cores and air gaps, can be represented using equivalent magnetic circuits.</span></span>
<span class="line"><span>These magnetic circuits can then be solved using conventional circuit analysis, to determine the</span></span>
<span class="line"><span>various ﬂuxes, MMFs, and terminal voltages and currents. Kirchhoﬀ’s laws apply to magnetic</span></span>
<span class="line"><span>circuits, and follow directly from Maxwell’s equations. The analog of Kirchhoﬀ’s current law</span></span>
<span class="line"><span>holds because the divergence of B is zero, and hence magnetic ﬂux lines are continuous and</span></span>
<span class="line"><span>cannot end. Therefore, any ﬂux line that enters a node must leave the node. As illustrated in</span></span>
<span class="line"><span>Fig. 10.10, the total ﬂux entering a node must be zero. The analog of Kirchho ﬀ’s voltage law</span></span>
<span class="line"><span>follows from Ampere’s law, Eq. (10.7). The left-hand-side integral in Eq. (10.7)i st h es u mo ft h e</span></span>
<span class="line"><span>MMFs across the reluctances around the closed path. The right-hand-side of Eq. ( 10.7) states</span></span>
<span class="line"><span>that currents in windings are sources of MMF. An n-turn winding carrying current i(t) can be</span></span>
<span class="line"><span>modeled as an MMF source, analogous to a voltage source, of value ni(t). When these MMF</span></span>
<span class="line"><span>sources are included, the total MMF around a closed path is zero.</span></span>
<span class="line"><span>Consider the inductor with air gap of Fig.10.11a. A closed path following the magnetic ﬁeld</span></span>
<span class="line"><span>lines is illustrated. This path passes through the core, of permeabilityμand lengthℓc, and across</span></span>
<span class="line"><span>the air gap, of permeabilityμ0 and lengthℓg. The cross-sectional areas of the core and air gap</span></span>
<span class="line"><span>are approximately equal. Application of Ampere’s law for this path leads to</span></span>
<span class="line"><span>Fc+ Fg= ni (10.26)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.1 Review of Basic Magnetics 417</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>Node (b)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>Node 1 = 2 + 3</span></span>
<span class="line"><span>Fig. 10.10 Kirchhoﬀ’s current law, applied to magnetic circuits: the net ﬂux entering a node must be</span></span>
<span class="line"><span>zero. (a) physical element, in which three legs of a core meet at a node; (b) magnetic circuit model</span></span>
<span class="line"><span>Fig. 10.11 Inductor with air gap example: (a) physical geometry; (b) magnetic circuit model</span></span>
<span class="line"><span>where Fc and Fg are the MMFs across the core and air gap, respectively. The core and air gap</span></span>
<span class="line"><span>characteristics can be modeled by reluctances as in Fig.10.9 and Eq. (10.25); the core reluctance</span></span>
<span class="line"><span>Rc and air gap reluctance Rg are given by</span></span>
<span class="line"><span>Rc= ℓc</span></span>
<span class="line"><span>μAc</span></span>
<span class="line"><span>Rg= ℓg</span></span>
<span class="line"><span>μ0Ac</span></span>
<span class="line"><span>(10.27)</span></span>
<span class="line"><span>A magnetic circuit corresponding to Eqs. (10.26) and (10.27) is given in Fig. 10.11b. The wind-</span></span>
<span class="line"><span>ing is a source of MMF, of value ni. The core and air gap reluctances are eﬀectively in series.</span></span>
<span class="line"><span>The solution of the magnetic circuit is</span></span>
<span class="line"><span>ni=Φ(Rc+ Rg) (10.28)</span></span>
<span class="line"><span>The ﬂuxΦ(t) passes through the winding, and so we can use Faraday’s law to write</span></span>
<span class="line"><span>v(t)= ndΦ(t)</span></span>
<span class="line"><span>dt (10.29)</span></span>
<span class="line"><span>Use of Eq. (10.28) to eliminateΦ(t) yields</span></span>
<span class="line"><span></span></span>
<span class="line"><span>418 10 Basic Magnetics Theory</span></span>
<span class="line"><span>Fig. 10.12 Eﬀe c to fa i rg a po nt h e</span></span>
<span class="line"><span>magnetic circuitΦvs. ni characteris-</span></span>
<span class="line"><span>tics. The air gap increases the current</span></span>
<span class="line"><span>Isat at the onset of core saturation</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>c + g</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span> = BAc</span></span>
<span class="line"><span>ni Hc</span></span>
<span class="line"><span>Bsat Ac</span></span>
<span class="line"><span>sat Ac</span></span>
<span class="line"><span>nIsat1 nIsat2</span></span>
<span class="line"><span>v(t)= n2</span></span>
<span class="line"><span>Rc+ Rg</span></span>
<span class="line"><span>di(t)</span></span>
<span class="line"><span>dt (10.30)</span></span>
<span class="line"><span>Therefore, the inductance L is</span></span>
<span class="line"><span>L= n2</span></span>
<span class="line"><span>Rc+ Rg</span></span>
<span class="line"><span>(10.31)</span></span>
<span class="line"><span>The air gap increases the total reluctance of the magnetic circuit, and decreases the inductance.</span></span>
<span class="line"><span>Air gaps are employed in practical inductors for two reasons. With no air gap ( Rg = 0),</span></span>
<span class="line"><span>the inductance is directly proportional to the core permeabilityμ. This quantity is dependent on</span></span>
<span class="line"><span>temperature and operating point, and is diﬃcult to control. Hence, it may be diﬃcult to construct</span></span>
<span class="line"><span>an inductor having a well-controlled value of L. Addition of an air gap having a reluctance Rg</span></span>
<span class="line"><span>greater than Rc causes the value of L in Eq. (10.31) to be insensitive to variations inμ.</span></span>
<span class="line"><span>Addition of an air gap also allows the inductor to operate at higher values of winding current</span></span>
<span class="line"><span>i(t) without saturation. The total ﬂuxΦis plotted vs. the winding MMF ni in Fig. 10.12. Since</span></span>
<span class="line"><span>Φis proportional to B, and when the core is not saturatedni is proportional to the magnetic ﬁeld</span></span>
<span class="line"><span>strength H in the core, Fig. 10.12 has the same shape as the core B–H characteristic. When the</span></span>
<span class="line"><span>core is not saturated,Φis related to ni according to the linear relationship of Eq. (10.28). When</span></span>
<span class="line"><span>the core saturates,Φis equal to</span></span>
<span class="line"><span>Φsat= BsatAc (10.32)</span></span>
<span class="line"><span>The winding current Isat at the onset of saturation is found by substitution of Eq. ( 10.32)</span></span>
<span class="line"><span>into (10.28):</span></span>
<span class="line"><span>Isat= BsatAc</span></span>
<span class="line"><span>n (Rc+ Rg) (10.33)</span></span>
<span class="line"><span>TheΦ-ni characteristics are plotted in Fig. 10.12 for two cases: (a) air gap present, and (b) no</span></span>
<span class="line"><span>air gap (Rg= 0). It can be seen that Isat is increased by addition of an air gap. Thus, the air gap</span></span>
<span class="line"><span>allows increase of the saturation current, at the expense of decreased inductance.</span></span>
<span class="line"><span>10.2 Transformer Modeling</span></span>
<span class="line"><span>Consider next the two-winding transformer of Fig. 10.13. The core has cross-sectional area Ac,</span></span>
<span class="line"><span>mean magnetic path lengthℓm, and permeabilityμ. An equivalent magnetic circuit is given in</span></span>
<span class="line"><span>Fig. 10.14. The core reluctance is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.2 Transformer Modeling 419</span></span>
<span class="line"><span>Fig. 10.13 A two-winding trans-</span></span>
<span class="line"><span>former</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>Fig. 10.14 Magnetic circuit that models the</span></span>
<span class="line"><span>two-winding transformer of Fig. 10.13</span></span>
<span class="line"><span>R= ℓm</span></span>
<span class="line"><span>μAc</span></span>
<span class="line"><span>(10.34)</span></span>
<span class="line"><span>Since there are two windings in this example, it is necessary to determine the relative polarities</span></span>
<span class="line"><span>of the MMF generators. Ampere’s law states that</span></span>
<span class="line"><span>Fc= n1i1+ n2i2 (10.35)</span></span>
<span class="line"><span>The MMF generators are additive, because the currents i1 and i2 pass in the same direction</span></span>
<span class="line"><span>through the core window. Solution of Fig.10.14 yields</span></span>
<span class="line"><span>ΦR= n1i1+ n2i2 (10.36)</span></span>
<span class="line"><span>This expression could also be obtained by substitution of Fc=ΦR into Eq. (10.35).</span></span>
<span class="line"><span>10.2.1 The Ideal Transformer</span></span>
<span class="line"><span>In the ideal transformer, the core reluctance R approaches zero. The causes the core MMF</span></span>
<span class="line"><span>Fc=ΦR also to approach zero. Equation (10.35) then becomes</span></span>
<span class="line"><span>0= n1i1+ n2i2 (10.37)</span></span>
<span class="line"><span>Also, by Faraday’s law, we have</span></span>
<span class="line"><span>v1= n1</span></span>
<span class="line"><span>dΦ</span></span>
<span class="line"><span>dt (10.38)</span></span>
<span class="line"><span>v2= n2</span></span>
<span class="line"><span>dΦ</span></span>
<span class="line"><span>dt</span></span>
<span class="line"><span>Note thatΦis the same in both equations above: the same total ﬂux links both windings. Elimi-</span></span>
<span class="line"><span>nation ofΦleads to</span></span>
<span class="line"><span></span></span>
<span class="line"><span>420 10 Basic Magnetics Theory</span></span>
<span class="line"><span>Ideal</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>i1 i2</span></span>
<span class="line"><span>Fig. 10.15 Ideal transformer symbol</span></span>
<span class="line"><span>dΦ</span></span>
<span class="line"><span>dt = v1</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>= v2</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>(10.39)</span></span>
<span class="line"><span>Equations (10.37) and (10.39) are the equations of the ideal transformer:</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>= v2</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>and n1i1+ n2i2= 0 (10.40)</span></span>
<span class="line"><span>The ideal transformer symbol of Fig. 10.15 is deﬁned by Eq. (10.40).</span></span>
<span class="line"><span>10.2.2 The Magnetizing Inductance</span></span>
<span class="line"><span>For the actual case in which the core reluctance R is nonzero, we have</span></span>
<span class="line"><span>ΦR= n1i1+ n2i2 with v1= n1</span></span>
<span class="line"><span>dΦ</span></span>
<span class="line"><span>dt (10.41)</span></span>
<span class="line"><span>Elimination ofΦyields</span></span>
<span class="line"><span>v1= n2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>dt</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>i1+ n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(10.42)</span></span>
<span class="line"><span>This equation is of the form</span></span>
<span class="line"><span>v1= LM</span></span>
<span class="line"><span>diM</span></span>
<span class="line"><span>dt (10.43)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>LM = n2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>iM = i1+ n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>i2 (10.44)</span></span>
<span class="line"><span>are the magnetizing inductance and magnetizing current, referred to the primary winding. An</span></span>
<span class="line"><span>equivalent circuit is illustrated in Fig.10.16.</span></span>
<span class="line"><span>Figure 10.16 coincides with the transformer model introduced in Chap. 6. The magnetizing</span></span>
<span class="line"><span>inductance models the magnetization of the core material. It is a real, physical inductor, which</span></span>
<span class="line"><span>exhibits saturation and hysteresis. All physical transformers must contain a magnetizing induc-</span></span>
<span class="line"><span>tance. For example, suppose that we disconnect the secondary winding. We are then left with</span></span>
<span class="line"><span>a single winding on a magnetic core—an inductor. Indeed, the equivalent circuit of Fig. 10.16</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.2 Transformer Modeling 421</span></span>
<span class="line"><span>Fig. 10.16 Transformer model including magnetizing inductance</span></span>
<span class="line"><span>predicts this behavior, via the magnetizing inductance. The magnetizing current causes the ratio</span></span>
<span class="line"><span>of the winding currents to diﬀer from the turns ratio.</span></span>
<span class="line"><span>The transformer saturates when the core ﬂux density B(t) exceeds the saturation ﬂux den-</span></span>
<span class="line"><span>sity Bsat. When the transformer saturates, the magnetizing current iM(t) becomes large, the</span></span>
<span class="line"><span>impedance of the magnetizing inductance becomes small, and the transformer windings be-</span></span>
<span class="line"><span>come short circuits. It should be noted that large winding currentsi1(t) and i2(t) do not necessar-</span></span>
<span class="line"><span>ily cause saturation: if these currents obey Eq. (10.37), then the magnetizing current is zero and</span></span>
<span class="line"><span>there is no net magnetization of the core. Rather, saturation of a transformer is a function of the</span></span>
<span class="line"><span>applied volt-seconds. The magnetizing current is given by</span></span>
<span class="line"><span>iM(t)= 1</span></span>
<span class="line"><span>LM</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>v1(t)dt (10.45)</span></span>
<span class="line"><span>Alternatively, Eq. (10.45) can be expressed in terms of the core ﬂux density B(t)a s</span></span>
<span class="line"><span>B(t)= 1</span></span>
<span class="line"><span>n1Ac</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>v1(t)dt (10.46)</span></span>
<span class="line"><span>The ﬂux density and magnetizing current will become large enough to saturate the core when the</span></span>
<span class="line"><span>applied volt-secondsλ1 is too large, whereλ1 is deﬁned for a periodic ac voltage waveform as</span></span>
<span class="line"><span>λ1=</span></span>
<span class="line"><span>∫ t2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>v1(t)dt (10.47)</span></span>
<span class="line"><span>The limits are chosen such that the integral is taken over the positive portion of the applied</span></span>
<span class="line"><span>periodic voltage waveform.</span></span>
<span class="line"><span>To ﬁx a saturating transformer, the ﬂux density should be decreased by increasing the num-</span></span>
<span class="line"><span>ber of turns, or by increasing the core cross-sectional areaAc. Adding an air gap has no eﬀect on</span></span>
<span class="line"><span>saturation of conventional transformers, since it does not modify Eq. (10.46). An air gap simply</span></span>
<span class="line"><span>makes the transformer less ideal, by decreasing LM and increasing iM(t) without changing B(t).</span></span>
<span class="line"><span>Saturation mechanisms in transformers diﬀer from those of inductors, because transformer satu-</span></span>
<span class="line"><span>ration is determined by the applied winding voltage waveforms, rather than the applied winding</span></span>
<span class="line"><span>currents.</span></span>
<span class="line"><span>10.2.3 Leakage Inductances</span></span>
<span class="line"><span>In practice, there is some ﬂux which links one winding but not the other, by “leaking” into the</span></span>
<span class="line"><span>air or by some other mechanism. As illustrated in Fig. 10.17, this ﬂux leads to leakage induc-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>422 10 Basic Magnetics Theory</span></span>
<span class="line"><span>Fig. 10.17 Leakage ﬂux in a two-winding transformer: ( a) transformer geometry, (b) an equivalent sys-</span></span>
<span class="line"><span>tem</span></span>
<span class="line"><span>Fig. 10.18 Two-winding transformer equivalent circuit, including magnetizing inductance referred to</span></span>
<span class="line"><span>primary, and primary and secondary leakage inductances</span></span>
<span class="line"><span>tance, i.e., additional eﬀective inductances that are in series with the windings. A topologically</span></span>
<span class="line"><span>equivalent structure is illustrated in Fig. 10.17b, in which the leakage ﬂuxes Φℓ1 andΦℓ2 are</span></span>
<span class="line"><span>shown explicitly as separate inductors.</span></span>
<span class="line"><span>Figure 10.18 illustrates a transformer electrical equivalent circuit model, including series</span></span>
<span class="line"><span>inductors Lℓ1 and Lℓ2 which model the leakage inductances. These leakage inductances cause</span></span>
<span class="line"><span>the terminal voltage ratio v2(t)/v1(t)t od iﬀer from the ideal turns ratio n2/n1. In general, the</span></span>
<span class="line"><span>terminal equations of a two-winding transformer can be written</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.3 Loss Mechanisms in Magnetic Devices 423</span></span>
<span class="line"><span>[v1(t)</span></span>
<span class="line"><span>v2(t)</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>[L11 L12</span></span>
<span class="line"><span>L12 L22</span></span>
<span class="line"><span>]d</span></span>
<span class="line"><span>dt</span></span>
<span class="line"><span>[i1(t)</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>(10.48)</span></span>
<span class="line"><span>The quantity L12 is called the mutual inductance, and is given by</span></span>
<span class="line"><span>L12= n1n2</span></span>
<span class="line"><span>R = n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>LM (10.49)</span></span>
<span class="line"><span>The quantities L11 and L22 are called the primary and secondary self-inductances, given by</span></span>
<span class="line"><span>L11= Lℓ1+ n1</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>L12</span></span>
<span class="line"><span>L22= Lℓ2+ n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>L12 (10.50)</span></span>
<span class="line"><span>Note that Eq. (10.48) does not explicitly identify the physical turns ratio n2/n1. Rather, Eq.</span></span>
<span class="line"><span>(10.48) expresses the transformer behavior as a function of electrical quantities alone. Equa-</span></span>
<span class="line"><span>tion (10.48) can be used, however, to deﬁne the eﬀective turns ratio</span></span>
<span class="line"><span>ne=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>L22</span></span>
<span class="line"><span>L11</span></span>
<span class="line"><span>(10.51)</span></span>
<span class="line"><span>and the coupling coeﬃcient</span></span>
<span class="line"><span>k= L12</span></span>
<span class="line"><span>√L11L22</span></span>
<span class="line"><span>(10.52)</span></span>
<span class="line"><span>The coupling coeﬃcient k lies in the range 0 ≤k ≤1, and is a measure of the degree of</span></span>
<span class="line"><span>magnetic coupling between the primary and secondary windings. In a transformer with perfect</span></span>
<span class="line"><span>coupling, the leakage inductances Lℓ1 and Lℓ2 are zero. The coupling coeﬃcient k is then equal</span></span>
<span class="line"><span>to 1. Construction of low-voltage transformers having coupling coe ﬃcients in excess of 0.99</span></span>
<span class="line"><span>is quite feasible. When the coupling coeﬃcient is close to 1, then the eﬀective turns ratio ne is</span></span>
<span class="line"><span>approximately equal to the physical turns ratio n2/n1.</span></span>
<span class="line"><span>10.3 Loss Mechanisms in Magnetic Devices</span></span>
<span class="line"><span>10.3.1 Core Loss</span></span>
<span class="line"><span>Energy is required to eﬀect a change in the magnetization of a core material. Not all of this en-</span></span>
<span class="line"><span>ergy is recoverable in electrical form; a fraction is lost as heat. This power loss can be observed</span></span>
<span class="line"><span>electrically as hysteresis of the B–H loop.</span></span>
<span class="line"><span>Consider an n-turn inductor excited by periodic waveforms v(t) and i(t) having frequency f .</span></span>
<span class="line"><span>The net energy that ﬂows into the inductor over one cycle is</span></span>
<span class="line"><span>W=</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>one cycle</span></span>
<span class="line"><span>v(t)i(t)dt (10.53)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>424 10 Basic Magnetics Theory</span></span>
<span class="line"><span>We can relate this expression to the core B–H characteristic: substitute B(t)f o rv(t) using Fara-</span></span>
<span class="line"><span>day’s law, Eq. (10.13), and substitute H(t)f o ri(t) using Ampere’s law, i.e., Eq. (10.14):</span></span>
<span class="line"><span>W=</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>one cycle</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>nAc</span></span>
<span class="line"><span>dB(t)</span></span>
<span class="line"><span>dt</span></span>
<span class="line"><span>)⎦H(t)ℓm</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>dt (10.54)</span></span>
<span class="line"><span>= (Acℓm)</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>one cycle</span></span>
<span class="line"><span>Hd B</span></span>
<span class="line"><span>The term Acℓm is the volume of the core, while the integral is the area of the B–H loop:</span></span>
<span class="line"><span>(energy lost per cycle)= (core volume)(area of B−H loop) (10.55)</span></span>
<span class="line"><span>The hysteresis power loss PH is equal to the energy lost per cycle, multiplied by the excitation</span></span>
<span class="line"><span>frequency f :</span></span>
<span class="line"><span>PH = ( f )(Acℓm)</span></span>
<span class="line"><span>∫</span></span>
<span class="line"><span>one cycle</span></span>
<span class="line"><span>Hd B (10.56)</span></span>
<span class="line"><span>To the extent that the size of the hysteresis loop is independent of frequency, hysteresis loss</span></span>
<span class="line"><span>increases directly with operating frequency.</span></span>
<span class="line"><span>Flux</span></span>
<span class="line"><span>(t)</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Eddy</span></span>
<span class="line"><span>current</span></span>
<span class="line"><span>Fig. 10.19 Eddy currents in an iron core</span></span>
<span class="line"><span>Magnetic core materials are iron alloys that,</span></span>
<span class="line"><span>unfortunately, are also good electrical conduc-</span></span>
<span class="line"><span>tors. As a result, ac magnetic ﬁelds can cause</span></span>
<span class="line"><span>electrical eddy currents to ﬂow within the core</span></span>
<span class="line"><span>material itself. An example is illustrated in</span></span>
<span class="line"><span>Fig. 10.19. The ac ﬂux Φ(t) passes through the</span></span>
<span class="line"><span>core. This induces eddy currents i(t) which, ac-</span></span>
<span class="line"><span>cording to Lenz’s law, ﬂow in paths that oppose</span></span>
<span class="line"><span>the time-varying ﬂuxΦ(t). These eddy currents</span></span>
<span class="line"><span>cause i</span></span>
<span class="line"><span>2R losses in the resistance of the core ma-</span></span>
<span class="line"><span>terial. The eddy current losses are especially sig-</span></span>
<span class="line"><span>niﬁcant in high-frequency applications.</span></span>
<span class="line"><span>According to Faraday’s law, the ac ﬂuxΦ(t) induces voltage in the core, which drives the</span></span>
<span class="line"><span>current around the paths illustrated in Fig. 10.19. Since the induced voltage is proportional to</span></span>
<span class="line"><span>the derivative of the ﬂux, the voltage magnitude increases directly with the excitation frequency</span></span>
<span class="line"><span>f . If the impedance of the core material is purely resistive and independent of frequency, then</span></span>
<span class="line"><span>the magnitude of the induced eddy currents also increases directly with f . This implies that</span></span>
<span class="line"><span>the i</span></span>
<span class="line"><span>2R eddy current losses should increase as f 2. In power ferrite materials, the core material</span></span>
<span class="line"><span>impedance magnitude actually decreases with increasing f . Over the useful frequency range,</span></span>
<span class="line"><span>the eddy current losses typically increase faster than f 2.</span></span>
<span class="line"><span>There is a basic tradeoﬀbetween saturation ﬂux density and core loss. Use of a high oper-</span></span>
<span class="line"><span>ating ﬂux density leads to reduced size, weight, and cost. Silicon steel and similar materials ex-</span></span>
<span class="line"><span>hibit saturation ﬂux densities of 1.5 to 2 T. Unfortunately, these core materials exhibit high core</span></span>
<span class="line"><span>loss. In particular, the low resistivity of these materials leads to high eddy current loss. Hence,</span></span>
<span class="line"><span>these materials are suitable for ﬁlter inductor and low-frequency transformer applications. The</span></span>
<span class="line"><span>core material is produced in laminations or thin ribbons, to reduce the eddy current magnitude.</span></span>
<span class="line"><span>Other ferrous alloys may contain molybdenum, cobalt, or other elements, and exhibit somewhat</span></span>
<span class="line"><span>lower core loss as well as somewhat lower saturation ﬂux densities.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.3 Loss Mechanisms in Magnetic Devices 425</span></span>
<span class="line"><span>Iron alloys are also employed in powdered cores, containing ferromagnetic particles of suf-</span></span>
<span class="line"><span>ﬁciently small diameter such that eddy currents are small. These particles are bound together</span></span>
<span class="line"><span>using an insulating medium. Powdered iron and molybdenum permalloy powder cores exhibit</span></span>
<span class="line"><span>typical saturation ﬂux densities of 0.6 to 0.8 T, with core losses signiﬁcantly lower than lam-</span></span>
<span class="line"><span>inated ferrous alloy materials. The insulating medium behaves e ﬀectively as a distributed air</span></span>
<span class="line"><span>gap, and hence these cores have relatively low permeability. Powder cores ﬁnd application as</span></span>
<span class="line"><span>transformers at frequencies of several kHz, and as ﬁlter inductors in high frequency (100 kHz)</span></span>
<span class="line"><span>switching converters.</span></span>
<span class="line"><span>B, Tesla</span></span>
<span class="line"><span>0.01 0.1 0.3</span></span>
<span class="line"><span>Power loss density, Watts /cm3</span></span>
<span class="line"><span>0.01</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>20kHz</span></span>
<span class="line"><span>50kHz</span></span>
<span class="line"><span>100kHz</span></span>
<span class="line"><span>200kHz500kHz1MHz</span></span>
<span class="line"><span>Fig. 10.20 Typical core loss data for a high-frequency</span></span>
<span class="line"><span>power ferrite material. Power loss density is plotted vs.</span></span>
<span class="line"><span>peak ac ﬂux densityΔB, for sinusoidal excitation</span></span>
<span class="line"><span>Amorphous alloys exhibit low hys-</span></span>
<span class="line"><span>teresis loss. Core conductivity and eddy</span></span>
<span class="line"><span>current losses are somewhat lower than</span></span>
<span class="line"><span>ferrous alloys, but higher than ferrites.</span></span>
<span class="line"><span>Saturation ﬂux densities in the range 0.6</span></span>
<span class="line"><span>to 1.5 T are obtained.</span></span>
<span class="line"><span>Ferrite cores are ceramic materi-</span></span>
<span class="line"><span>als having low saturation ﬂux den-</span></span>
<span class="line"><span>sity, 0.25 to 0.5 T. Their resistivities</span></span>
<span class="line"><span>are much higher than other materi-</span></span>
<span class="line"><span>als, and hence eddy current losses are</span></span>
<span class="line"><span>much smaller. Manganese-zinc ferrite</span></span>
<span class="line"><span>cores ﬁnd widespread use as induc-</span></span>
<span class="line"><span>tors and transformers in converters hav-</span></span>
<span class="line"><span>ing switching frequencies of 10 kHz to</span></span>
<span class="line"><span>1 MHz. Nickel-zinc ferrite materials can</span></span>
<span class="line"><span>be employed at yet higher frequencies.</span></span>
<span class="line"><span>Figure 10.20 contains typical total</span></span>
<span class="line"><span>core loss data, for a certain ferrite ma-</span></span>
<span class="line"><span>terial. Power loss density, in Watts per</span></span>
<span class="line"><span>cubic centimeter of core material, is plot-</span></span>
<span class="line"><span>ted as a function of sinusoidal excitation</span></span>
<span class="line"><span>frequency f and peak ac ﬂux densityΔB.</span></span>
<span class="line"><span>At a given frequency, the core loss P</span></span>
<span class="line"><span>fe</span></span>
<span class="line"><span>can be approximated by an empirical function of the form</span></span>
<span class="line"><span>Pfe = Kfe (ΔB)β Acℓm (10.57)</span></span>
<span class="line"><span>The parameters Kfe and β are determined by ﬁtting Eq. (10.57) to the manufacturer’s published</span></span>
<span class="line"><span>data. Typical values of β for ferrite materials operating in their intended range ofΔB and f lie</span></span>
<span class="line"><span>in the range 2.6 to 2.8. The constant of proportionality Kfe increases rapidly with excitation</span></span>
<span class="line"><span>frequency f . The dependence of Kfe on f can also be approximated by empirical formulae that</span></span>
<span class="line"><span>are ﬁtted to the manufacturer’s published data; a fourth-order polynomial or a function of the</span></span>
<span class="line"><span>form Kfe 0 fξare sometimes employed for this purpose. Parameters in empirical formulae ﬁtted</span></span>
<span class="line"><span>to data measured under sinusoidal excitation can be used to improve prediction of ferrite core</span></span>
<span class="line"><span>loss with nonsinusoidal waveforms, as described in [96].</span></span>
<span class="line"><span></span></span>
<span class="line"><span>426 10 Basic Magnetics Theory</span></span>
<span class="line"><span>10.3.2 Low-Frequency Copper Loss</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Fig. 10.21 Winding</span></span>
<span class="line"><span>equivalent circuit that</span></span>
<span class="line"><span>models copper loss</span></span>
<span class="line"><span>Signiﬁcant loss also occurs in the resistance of the copper windings.</span></span>
<span class="line"><span>This is also a major determinant of the size of a magnetic device: if</span></span>
<span class="line"><span>copper loss and winding resistance were irrelevant, then inductor and</span></span>
<span class="line"><span>transformer elements could be made arbitrarily small by use of many</span></span>
<span class="line"><span>small turns of small wire.</span></span>
<span class="line"><span>Figure 10.21 contains an equivalent circuit of a winding, in which</span></span>
<span class="line"><span>element R models the winding resistance. The copper loss of the</span></span>
<span class="line"><span>winding is</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>cu= I2</span></span>
<span class="line"><span>rms R (10.58)</span></span>
<span class="line"><span>where Irms is the rms value of i(t). The dc resistance of the winding</span></span>
<span class="line"><span>conductor can be expressed as</span></span>
<span class="line"><span>R= ρℓb</span></span>
<span class="line"><span>Aw</span></span>
<span class="line"><span>(10.59)</span></span>
<span class="line"><span>where Aw is the wire bare cross-sectional area, and ℓb is the length</span></span>
<span class="line"><span>of the wire. The resistivity ρis equal to 1.724· 10−6Ω-cm for soft-</span></span>
<span class="line"><span>annealed copper at room temperature. This resistivity increases to 2.3· 10−6Ω-cm at 100◦C.</span></span>
<span class="line"><span>If a core has a mean length per turn given by MLT , then an n turn winding on this core will</span></span>
<span class="line"><span>have lengthℓb= nMLT . The resistance of this winding will be:</span></span>
<span class="line"><span>R= ρn(MLT )</span></span>
<span class="line"><span>Aw</span></span>
<span class="line"><span>(10.60)</span></span>
<span class="line"><span>Appendix B contains tables of the mean lengths per turn of standard ferrite core shapes, as</span></span>
<span class="line"><span>well as the areas of standard American wire gauges.</span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors</span></span>
<span class="line"><span>Eddy currents also cause power losses in winding conductors. This can lead to copper losses</span></span>
<span class="line"><span>signiﬁcantly in excess of the value predicted by Eqs. (10.58) and (10.59). The speciﬁc conductor</span></span>
<span class="line"><span>eddy current mechanisms are called the skin eﬀect and the proximity eﬀect. These mechanisms</span></span>
<span class="line"><span>are most pronounced in high-current conductors of multi-layer windings, particularly in high-</span></span>
<span class="line"><span>frequency converters.</span></span>
<span class="line"><span>10.4.1 Introduction to the Skin and Proximity Eﬀects</span></span>
<span class="line"><span>Figure 10.22a illustrates a currenti(t) ﬂowing through a solitary conductor. This current induces</span></span>
<span class="line"><span>magnetic ﬂuxΦ(t), whose ﬂux lines follow circular paths around the current as shown. Accord-</span></span>
<span class="line"><span>ing to Lenz’s law, the ac ﬂux in the conductor induces eddy currents, which ﬂow in a manner</span></span>
<span class="line"><span>that tends to oppose the ac ﬂux Φ(t). Figure 10.22b illustrates the paths of the eddy currents.</span></span>
<span class="line"><span>It can be seen that the eddy currents tend to reduce the net current density in the center of the</span></span>
<span class="line"><span>conductor, and increase the net current density near the surface of the conductor.</span></span>
<span class="line"><span>The current distribution within the conductor can be found by solution of Maxwell’s equa-</span></span>
<span class="line"><span>tions. For a sinusoidal currenti(t) of frequency f , the result is that the current density is greatest</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10.4 Eddy Currents in Winding Conductors 427</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Wire</span></span>
<span class="line"><span>(t)</span></span>
<span class="line"><span>Eddy</span></span>
<span class="line"><span>currents</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Wire</span></span>
<span class="line"><span>Eddy</span></span>
<span class="line"><span>currents</span></span>
<span class="line"><span>Current</span></span>
<span class="line"><span>density</span></span>
<span class="line"><span>Fig. 10.22 The skin eﬀect: (a) current i(t) induces ﬂux Φ(t), which in turn induces eddy currents in</span></span>
<span class="line"><span>conductor; (b) the eddy currents tend to oppose the current i(t) in the center of the wire, and increase the</span></span>
<span class="line"><span>current on the surface of the wire</span></span>
<span class="line"><span>Frequency</span></span>
<span class="line"><span>100 C</span></span>
<span class="line"><span>25 C</span></span>
<span class="line"><span>#20 AWG</span></span>
<span class="line"><span>Wire diameter</span></span>
<span class="line"><span>#30 AWG</span></span>
<span class="line"><span>#40 AWG</span></span>
<span class="line"><span>Penetration</span></span>
<span class="line"><span>depth , cm</span></span>
<span class="line"><span>0.001</span></span>
<span class="line"><span>0.01</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>zHM1zHk001zHk01</span></span>
<span class="line"><span>Fig. 10.23 Penetration depthδ, as a function of frequency f , for copper wire</span></span>
<span class="line"><span>at the surface of the conductor. The current density is an exponentially decaying function of</span></span>
<span class="line"><span>distance into the conductor, with characteristic length δ known as the penetration depth or skin</span></span>
<span class="line"><span>depth. The penetration depth is given by</span></span>
<span class="line"><span>δ=</span></span>
<span class="line"><span>√ ρ</span></span>
<span class="line"><span>πμ f (10.61)</span></span>
<span class="line"><span>For a copper conductor, the permeability μis equal to μ0, and the resistivity ρis given in</span></span>
<span class="line"><span>Sect. 10.3.2. At 100◦C, the penetration depth of a copper conductor is</span></span>
<span class="line"><span>δ= 7.5√</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>cm (10.62)</span></span>
<span class="line"><span>with f expressed in Hz. The penetration depth of copper conductors is plotted in Fig. 10.23,a s</span></span>
<span class="line"><span>a function of frequency f . For comparison, the wire diameters d of standard American Wire</span></span>
<span class="line"><span></span></span>
<span class="line"><span>428 10 Basic Magnetics Theory</span></span>
<span class="line"><span>Gauge (AWG) conductors are also listed. It can be seen that d/δ= 1 for AWG #40 at approxi-</span></span>
<span class="line"><span>mately 500 kHz, while d/δ= 1 for AWG #22 at approximately 10 kHz.</span></span>
<span class="line"><span>T h es k i neﬀect causes the resistance and copper loss of solitary large-diameter wires to</span></span>
<span class="line"><span>increase at high frequency. High-frequency currents do not penetrate to the center of the con-</span></span>
<span class="line"><span>ductor. The current crowds at the surface of the wire, the inside of the wire is not utilized, and</span></span>
<span class="line"><span>the eﬀective wire cross-sectional area is reduced. However, the skin eﬀect alone is not suﬃcient</span></span>
<span class="line"><span>to explain the increased high-frequency copper losses observed in multiple-layer transformer</span></span>
<span class="line"><span>windings.</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>Current</span></span>
<span class="line"><span>density J</span></span>
<span class="line"><span>h</span></span>
<span class="line"><span>Area</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>AreaArea</span></span>
<span class="line"><span>i Conductor 1</span></span>
<span class="line"><span>Conductor 2</span></span>
<span class="line"><span>Fig. 10.24 The proximity eﬀect in adja-</span></span>
<span class="line"><span>cent copper foil conductors. Conductor 1</span></span>
<span class="line"><span>carries current i(t). Conductor 2 is open-</span></span>
<span class="line"><span>circuited</span></span>
<span class="line"><span>A conductor that carries a high-frequency current</span></span>
<span class="line"><span>i(t) induces copper loss in an adjacent conductor by</span></span>
<span class="line"><span>a phenomenon known as the proximity eﬀect.F i g -</span></span>
<span class="line"><span>ure 10.24 illustrates two copper foil conductors that are</span></span>
<span class="line"><span>placed in close proximity to each other. Conductor 1</span></span>
<span class="line"><span>carries a high-frequency sinusoidal current i(t), whose</span></span>
<span class="line"><span>penetration depth δ is much smaller than the thickness</span></span>
<span class="line"><span>h of conductors 1 or 2. Conductor 2 is open-circuited,</span></span>
<span class="line"><span>so that it carries a net current of zero. However, it is</span></span>
<span class="line"><span>possible for eddy currents to be induced in conductor</span></span>
<span class="line"><span>2 by the current i(t) ﬂowing in conductor 1.</span></span>
<span class="line"><span>The current i(t) ﬂowing in conductor 1 generates</span></span>
<span class="line"><span>a ﬂuxΦ(t) in the space between conductors 1 and 2;</span></span>
<span class="line"><span>this ﬂux attempts to penetrate conductor 2. By Lenz’s</span></span>
<span class="line"><span>law, a current is induced on the adjacent (left) side of</span></span>
<span class="line"><span>conductor 2, which tends to oppose the ﬂux Φ(t). If</span></span>
<span class="line"><span>the conductors are closely spaced, and if h≫ δ, then</span></span>
<span class="line"><span>the induced current will be equal and opposite to the</span></span>
<span class="line"><span>current i(t), as illustrated in Fig. 10.24.</span></span>
<span class="line"><span>Since conductor 2 is open-circuited, the net current</span></span>
<span class="line"><span>in conductor 2 must be zero. Therefore, a current +i(t) ﬂows on the right-side surface of con-</span></span>
<span class="line"><span>ductor 2. So the current ﬂowing in conductor 1 induces a current that circulates on the surfaces</span></span>
<span class="line"><span>of conductor 2.</span></span>
<span class="line"><span>Figure 10.25 illustrates the proximity eﬀect in a simple transformer winding. The primary</span></span>
<span class="line"><span>winding consists of three series-connected turns of copper foil, having thickness h≫ δ, and</span></span>
<span class="line"><span>carrying net current i(t). The copper foil is a strip of copper whose width is the same as the</span></span>
<span class="line"><span>height of the core window; this strip is wound around a leg of the core. Consequently, each</span></span>
<span class="line"><span>turn of this foil comprises one layer of the winding, as illustrated in Fig.10.25b. The secondary</span></span>
<span class="line"><span>winding is identical; to the extent that the magnetizing current is small, the secondary turns</span></span>
<span class="line"><span>carry net current−i(t). The windings pass through the window of a magnetic core; the magnetic</span></span>
<span class="line"><span>core material encloses the mutual ﬂux of the transformer.</span></span>
<span class="line"><span>The high-frequency sinusoidal current i(t) ﬂows on the right surface of primary layer 1,</span></span>
<span class="line"><span>adjacent to layer 2. This induces a copper loss in layer 1, which can be calculated as follows.</span></span>
<span class="line"><span>Let R</span></span>
<span class="line"><span>dc be the dc resistance of layer 1, given by Eq. ( 10.59), and let I be the rms value of</span></span>
<span class="line"><span>i(t). The skin eﬀect causes the copper loss in layer 1 to be equal to the loss in a conductor of</span></span>
<span class="line"><span>thickness δ with uniform current density. This reduction of the conductor thickness from h to δ</span></span>
<span class="line"><span>eﬀectively increases the resistance by the same factor. Hence, layer 1 can be viewed as having</span></span>
<span class="line"><span>an “ac resistance” given by</span></span></code></pre></div>`,10)])])}const g=s(i,[["render",l]]);export{u as __pageData,g as default};
