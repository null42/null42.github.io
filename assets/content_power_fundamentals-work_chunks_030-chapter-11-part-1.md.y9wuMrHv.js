import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第11章part 1 - 11 Inductor Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第11章part 1 - 11 Inductor Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 468-487 > Chunk ID: `chapter-11-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/030-chapter-11-part-1.md","filePath":"content/power/fundamentals-work/chunks/030-chapter-11-part-1.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/030-chapter-11-part-1.md"};function l(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第11章part-1-11-inductor-design" tabindex="-1">第11章part 1 - 11 Inductor Design <a class="header-anchor" href="#第11章part-1-11-inductor-design" aria-label="Permalink to &quot;第11章part 1 - 11 Inductor Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 468-487<br> Chunk ID: <code>chapter-11-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>11</span></span>
<span class="line"><span>Inductor Design</span></span>
<span class="line"><span>This chapter treats the design of magnetic elements such as ﬁlter inductors, using the geomet-</span></span>
<span class="line"><span>rical constant ( Kg) method. With this method, the maximum ﬂux density Bmax is speciﬁed in</span></span>
<span class="line"><span>advance, and the element is designed to attain a given copper loss.</span></span>
<span class="line"><span>The design of a basic ﬁlter inductor is discussed in Sects. 11.1 and 11.1.5. In the ﬁlter</span></span>
<span class="line"><span>inductor application, it is necessary to obtain the required inductance, avoid saturation, and</span></span>
<span class="line"><span>obtain an acceptable low dc winding resistance and copper loss. The geometrical constantKg is</span></span>
<span class="line"><span>a measure of the eﬀective magnetic size of a core, when dc copper loss and winding resistance</span></span>
<span class="line"><span>are the dominant constraints [ 4, 99]. Design of a ﬁlter inductor involves selection of a core</span></span>
<span class="line"><span>having a Kg suﬃciently large for the application, then computing the required air gap, turns,</span></span>
<span class="line"><span>and wire size. A ﬁrst-pass ﬁlter inductor design procedure is given. Values of Kg for common</span></span>
<span class="line"><span>ferrite core shapes are tabulated in Appendix B. In practice, the Kg method might be employed</span></span>
<span class="line"><span>to ﬁnd a starting estimate of an inductor design. Details of the winding geometry would be</span></span>
<span class="line"><span>examined, and all losses computed. Design iterations can then further optimize the design.</span></span>
<span class="line"><span>Extension of the Kg method to multiple-winding elements is covered in Sect. 11.3. In appli-</span></span>
<span class="line"><span>cations requiring multiple windings, it is necessary to optimize the wire sizes of the windings</span></span>
<span class="line"><span>so that the overall copper loss is minimized. It is also necessary to write an equation that relates</span></span>
<span class="line"><span>the peak ﬂux density to the applied waveforms or to the desired winding inductance. Again, a</span></span>
<span class="line"><span>simple step-by-step transformer design approach is given.</span></span>
<span class="line"><span>The goal of theKg approach of this chapter is the design of a magnetic device having a given</span></span>
<span class="line"><span>copper loss. Core loss is not speciﬁcally addressed in theKg approach, and Bmax is a given ﬁxed</span></span>
<span class="line"><span>value. In the next chapter, the ﬂux density is treated as a design variable to be optimized. This</span></span>
<span class="line"><span>allows the overall loss (i.e., core loss plus copper loss) to be minimized.</span></span>
<span class="line"><span>11.1 Filter Inductor Design Constraints</span></span>
<span class="line"><span>A ﬁlter inductor employed in a CCM buck converter is illustrated in Fig. 11.1a. In this appli-</span></span>
<span class="line"><span>cation, the value of inductance L is usually chosen such that the inductor current ripple peak</span></span>
<span class="line"><span>magnitudeΔi is a small fraction of the full-load inductor current dc component I, as illustrated</span></span>
<span class="line"><span>in Fig. 11.1b. As illustrated in Fig. 11.2, an air gap is employed that is suﬃciently large to pre-</span></span>
<span class="line"><span>vent saturation of the core by the peak current I+Δi.</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_11</span></span>
<span class="line"><span>459</span></span>
<span class="line"><span></span></span>
<span class="line"><span>460 11 Inductor Design</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(b) i(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>I iL</span></span>
<span class="line"><span>Fig. 11.1 Filter inductor employed in a CCM buck converter: (a) circuit schematic, (b) inductor current</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span>Fig. 11.2 Filter inductor: (a) structure, (b) magnetic circuit model</span></span>
<span class="line"><span>Let us consider the design of the ﬁlter inductor illustrated in Figs. 11.1 and 11.2.I t</span></span>
<span class="line"><span>is assumed that the core and proximity losses are negligible, so that the inductor losses</span></span>
<span class="line"><span>Fig. 11.3 Filter inductor</span></span>
<span class="line"><span>equivalent circuit</span></span>
<span class="line"><span>are dominated by the low-frequency copper losses. The inductor</span></span>
<span class="line"><span>can therefore be modeled by the equivalent circuit of Fig.11.3,i n</span></span>
<span class="line"><span>which R represents the dc resistance of the winding. It is desired</span></span>
<span class="line"><span>to obtain a given inductance L and given winding resistance R.</span></span>
<span class="line"><span>The inductor should not saturate when a given worst-case peak</span></span>
<span class="line"><span>current Imax is applied. Note that speciﬁcation of R is equivalent</span></span>
<span class="line"><span>to speciﬁcation of the copper loss Pcu, since</span></span>
<span class="line"><span>Pcu= I2</span></span>
<span class="line"><span>rms R (11.1)</span></span>
<span class="line"><span>The inﬂuence of inductor winding resistance on converter e ﬃ-</span></span>
<span class="line"><span>ciency and output voltage is modeled in Chap. 3.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.1 Filter Inductor Design Constraints 461</span></span>
<span class="line"><span>Fig. 11.4 Filter inductor: (a) assumed geometry, (b) magnetic circuit</span></span>
<span class="line"><span>It is assumed that the inductor geometry is topologically equivalent to Fig. 11.4a. An equiv-</span></span>
<span class="line"><span>alent magnetic circuit is illustrated in Fig. 11.4b. The core reluctance Rc and air gap reluctance</span></span>
<span class="line"><span>Rg are</span></span>
<span class="line"><span>Rc= ℓc</span></span>
<span class="line"><span>μcAc</span></span>
<span class="line"><span>Rg= ℓg</span></span>
<span class="line"><span>μ0Ac</span></span>
<span class="line"><span>(11.2)</span></span>
<span class="line"><span>whereℓc is the core magnetic path length, Ac is the core cross-sectional area, μc is the core</span></span>
<span class="line"><span>permeability, andℓg is the air gap length. It is assumed that the core and air gap have the same</span></span>
<span class="line"><span>cross-sectional areas. Solution of Fig. 11.4b yields</span></span>
<span class="line"><span>ni=Φ(Rc+ Rg) (11.3)</span></span>
<span class="line"><span>Usually, Rc≪ Rg, and hence Eq. (11.3) can be approximated as</span></span>
<span class="line"><span>ni≈ΦRg (11.4)</span></span>
<span class="line"><span>The air gap dominates the inductor properties. Four design constraints now can be identiﬁed.</span></span>
<span class="line"><span>11.1.1 Maximum Flux Density</span></span>
<span class="line"><span>Given a peak winding current Imax, it is desired to operate the core ﬂux density at a maximum</span></span>
<span class="line"><span>value Bmax .T h ev a l u eo fBmax is chosen to be less than the worst-case saturation ﬂux density</span></span>
<span class="line"><span>Bsat of the core material.</span></span>
<span class="line"><span>Substitution ofΦ=BAc into Eq. (11.4) leads to</span></span>
<span class="line"><span>ni= BAcRg (11.5)</span></span>
<span class="line"><span>Upon letting I= Imax and B= Bmax , we obtain</span></span>
<span class="line"><span>nImax = Bmax AcRg= Bmax</span></span>
<span class="line"><span>ℓg</span></span>
<span class="line"><span>μ0</span></span>
<span class="line"><span>(11.6)</span></span>
<span class="line"><span>This is the ﬁrst design constraint. The turns ratio n and the air gap lengthℓg are unknowns.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>462 11 Inductor Design</span></span>
<span class="line"><span>11.1.2 Inductance</span></span>
<span class="line"><span>The given inductance value L must be obtained. The inductance is equal to</span></span>
<span class="line"><span>L= n2</span></span>
<span class="line"><span>Rg</span></span>
<span class="line"><span>= μ0Acn2</span></span>
<span class="line"><span>ℓg</span></span>
<span class="line"><span>(11.7)</span></span>
<span class="line"><span>This is the second design constraint. The turns ratio n, core area Ac, and gap length ℓg are</span></span>
<span class="line"><span>unknown.</span></span>
<span class="line"><span>Fig. 11.5 The winding must ﬁt in</span></span>
<span class="line"><span>the core window area</span></span>
<span class="line"><span>Core window</span></span>
<span class="line"><span>area WA</span></span>
<span class="line"><span>Wire bare area</span></span>
<span class="line"><span>AW</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>11.1.3 Winding Area</span></span>
<span class="line"><span>As illustrated in Fig. 11.5, the winding must ﬁt through the window, i.e., the hole in the center</span></span>
<span class="line"><span>of the core. The cross-sectional area of the conductor, or bare area, is AW . If the winding has n</span></span>
<span class="line"><span>turns, then the area of copper conductor in the window is</span></span>
<span class="line"><span>nAW (11.8)</span></span>
<span class="line"><span>If the core has window area WA, then we can express the area available for the winding conduc-</span></span>
<span class="line"><span>tors as</span></span>
<span class="line"><span>KuWA (11.9)</span></span>
<span class="line"><span>where Ku is the window utilization factor,o r ﬁll factor. Hence, the third design constraint can</span></span>
<span class="line"><span>be expressed as</span></span>
<span class="line"><span>KuWA≥nAW (11.10)</span></span>
<span class="line"><span>The ﬁll factor Ku is the fraction of the core window area that is ﬁlled with copper. Ku must</span></span>
<span class="line"><span>lie between zero and one. As discussed in [99], there are several mechanism that cause Ku to be</span></span>
<span class="line"><span>less than unity. Round wire does not pack perfectly; this reduces Ku by a factor of 0.7 to 0.55,</span></span>
<span class="line"><span>depending on the winding technique. The wire has insulation; the ratio of wire conductor area</span></span>
<span class="line"><span>to total wire area varies from approximately 0.95 to 0.65, depending on the wire size and type</span></span>
<span class="line"><span>of insulation. The bobbin uses some of the window area. Insulation may be required between</span></span>
<span class="line"><span>windings and/or winding layers. Typical values of K</span></span>
<span class="line"><span>u for cores with winding bobbins are 0.5</span></span>
<span class="line"><span>for a simple low-voltage inductor, 0.25 to 0.3 for an o ﬀ-line transformer, 0.05 to 0.2 for a</span></span>
<span class="line"><span>high-voltage transformer supplying several kV , and 0.65 for a low-voltage foil transformer or</span></span>
<span class="line"><span>inductor.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.1 Filter Inductor Design Constraints 463</span></span>
<span class="line"><span>11.1.4 Winding Resistance</span></span>
<span class="line"><span>The resistance of the winding is</span></span>
<span class="line"><span>R= ρℓb</span></span>
<span class="line"><span>AW</span></span>
<span class="line"><span>(11.11)</span></span>
<span class="line"><span>where ρis the resistivity of the conductor material, ℓb is the length of the wire, and AW is the</span></span>
<span class="line"><span>wire bare area. The resistivity of copper at room temperature is 1.724· 10−6Ω-cm. The length</span></span>
<span class="line"><span>of the wire comprising an n-turn winding can be expressed as</span></span>
<span class="line"><span>ℓb= n(MLT) (11.12)</span></span>
<span class="line"><span>where (MLT) is the mean-length-per-turn of the winding. The mean-length-per-turn is a function</span></span>
<span class="line"><span>of the core geometry. Substitution of Eq. (11.12)i n t o(11.11) leads to</span></span>
<span class="line"><span>R= ρn(MLT)</span></span>
<span class="line"><span>AW</span></span>
<span class="line"><span>(11.13)</span></span>
<span class="line"><span>This is the fourth constraint.</span></span>
<span class="line"><span>11.1.5 The Core Geometrical Constant Kg</span></span>
<span class="line"><span>The four constraints, Eqs. (11.6), (11.7), (11.10), and (11.13), involve the quantitiesAc, WA, and</span></span>
<span class="line"><span>MLT, which are functions of the core geometry, the quantities Imax, Bmax,μ0, L, Ku, R, and ρ,</span></span>
<span class="line"><span>which are given speciﬁcations or other known quantities, andn,ℓ g, and AW , which are unknowns.</span></span>
<span class="line"><span>Elimination of the unknowns n,ℓ g, and AW leads to the following equation:</span></span>
<span class="line"><span>A2</span></span>
<span class="line"><span>c WA</span></span>
<span class="line"><span>(MLT)≥ρL2I2</span></span>
<span class="line"><span>max</span></span>
<span class="line"><span>B2max RKu</span></span>
<span class="line"><span>(11.14)</span></span>
<span class="line"><span>The quantities on the right side of this equation are speciﬁcations or other known quantities.</span></span>
<span class="line"><span>The left side of the equation is a function of the core geometry alone. It is necessary to choose</span></span>
<span class="line"><span>a core whose geometry satisﬁes Eq. (11.14).</span></span>
<span class="line"><span>The quantity</span></span>
<span class="line"><span>Kg= A2</span></span>
<span class="line"><span>c WA</span></span>
<span class="line"><span>(MLT) (11.15)</span></span>
<span class="line"><span>is called the core geometrical constant. It is a ﬁgure-of-merit that describes the e ﬀective elec-</span></span>
<span class="line"><span>trical size of magnetic cores, in applications where copper loss and maximum ﬂux density are</span></span>
<span class="line"><span>speciﬁed. Tables are included in Appendix B that lists the values of K</span></span>
<span class="line"><span>g for several standard</span></span>
<span class="line"><span>families of ferrite cores. Kg has dimensions of length to the ﬁfth power.</span></span>
<span class="line"><span>Equation (11.14) reveals how the speciﬁcations aﬀect the core size. Increasing the induc-</span></span>
<span class="line"><span>tance or peak current requires an increase in core size. Increasing the peak ﬂux density allows</span></span>
<span class="line"><span>a decrease in core size, and hence it is advantageous to use a core material that exhibits a high</span></span>
<span class="line"><span>saturation ﬂux density. Allowing a larger winding resistance R, and hence larger copper loss,</span></span>
<span class="line"><span>leads to a smaller core. Of course, the increased copper loss and smaller core size will lead to a</span></span>
<span class="line"><span>higher temperature rise, which may be unacceptable. The ﬁll factor K</span></span>
<span class="line"><span>u also inﬂuences the core</span></span>
<span class="line"><span>size.</span></span>
<span class="line"><span>Equation (11.15) reveals how core geometry aﬀects the core capabilities. An inductor capa-</span></span>
<span class="line"><span>ble of meeting increased electrical requirements can be obtained by increasing either the core</span></span>
<span class="line"><span></span></span>
<span class="line"><span>464 11 Inductor Design</span></span>
<span class="line"><span>area Ac, or the window area WA. Increase of the core area requires additional iron core material.</span></span>
<span class="line"><span>Increase of the window area implies that additional copper winding material is employed. We</span></span>
<span class="line"><span>can trade iron for copper, or vice versa, by changing the core geometry in a way that maintains</span></span>
<span class="line"><span>the Kg of Eq. (11.15).</span></span>
<span class="line"><span>11.2 The Kg Method: A First-Pass Design</span></span>
<span class="line"><span>The procedure developed in Sect. 11.1 is summarized below. This simple ﬁlter inductor de-</span></span>
<span class="line"><span>sign procedure should be regarded as a ﬁrst-pass approach. Numerous issues have been ne-</span></span>
<span class="line"><span>glected, including detailed insulation requirements, conductor eddy current losses, temperature</span></span>
<span class="line"><span>rise, roundoﬀof number of turns, etc.</span></span>
<span class="line"><span>The following quantities are speciﬁed, using the units noted:</span></span>
<span class="line"><span>Wire resistivity ρ (Ω-cm)</span></span>
<span class="line"><span>Peak winding current Imax (A)</span></span>
<span class="line"><span>Inductance L (H)</span></span>
<span class="line"><span>Winding resistance R (Ω)</span></span>
<span class="line"><span>Winding ﬁll factor Ku</span></span>
<span class="line"><span>Maximum operating ﬂux density Bmax (T)</span></span>
<span class="line"><span>The core dimensions are expressed in cm:</span></span>
<span class="line"><span>Core cross-sectional area Ac (cm2)</span></span>
<span class="line"><span>Core window area WA (cm2)</span></span>
<span class="line"><span>Mean length per turn MLT (cm)</span></span>
<span class="line"><span>The use of centimeters rather than meters requires that appropriate factors be added to the</span></span>
<span class="line"><span>design equations.</span></span>
<span class="line"><span>1. Determine core size</span></span>
<span class="line"><span>Kg≥ρL2I2</span></span>
<span class="line"><span>max</span></span>
<span class="line"><span>B2maxRKu</span></span>
<span class="line"><span>108 (cm5) (11.16)</span></span>
<span class="line"><span>Choose a core which is large enough to satisfy this inequality. Note the values of Ac, WA, and</span></span>
<span class="line"><span>MLT for this core. The resistivity ρof copper wire is 1.724· 10−6Ω-cm at room temperature,</span></span>
<span class="line"><span>and 2.3· 10−6Ω-cm at 100◦C.</span></span>
<span class="line"><span>2. Determine number of turns</span></span>
<span class="line"><span>n= LImax</span></span>
<span class="line"><span>Bmax Ac</span></span>
<span class="line"><span>104 (11.17)</span></span>
<span class="line"><span>with Ac expressed in cm2 and Bmax expressed in T.</span></span>
<span class="line"><span>3. Determine air gap length</span></span>
<span class="line"><span>ℓg= μ0Acn2</span></span>
<span class="line"><span>L 10−4 (m) (11.18)</span></span>
<span class="line"><span>with Ac expressed in cm2. The permeability of free space is μ0 = 4π· 10−7 H/m. The air gap</span></span>
<span class="line"><span>length is given in meters. The value expressed in Eq. (11.18) is approximate, and neglects fring-</span></span>
<span class="line"><span>ing ﬂux and other nonidealities. Generally fringing ﬂux increases the inductance, and hence a</span></span>
<span class="line"><span>somewhat longer gap would be needed to achieve the speciﬁed inductance.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.3 Multiple-Winding Magnetics Design via the Kg Method 465</span></span>
<span class="line"><span>Core manufacturers sell gapped cores. Rather than specifying the air gap length, the equiva-</span></span>
<span class="line"><span>lent quantity AL is used. AL is equal to the inductance, in mH, obtained with a winding of 1000</span></span>
<span class="line"><span>turns. When AL is speciﬁed, it is the core manufacturer’s responsibility to obtain the correct gap</span></span>
<span class="line"><span>length. Equation (11.18) can be modiﬁed to yield the required AL, as follows:</span></span>
<span class="line"><span>AL= 10B2</span></span>
<span class="line"><span>max A2</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>LI2</span></span>
<span class="line"><span>max</span></span>
<span class="line"><span>(mH/1000 turns) (11.19)</span></span>
<span class="line"><span>where Ac is given in cm2, L is given in Henries, and Bmax is given in Tesla.</span></span>
<span class="line"><span>4. Evaluate wire size</span></span>
<span class="line"><span>AW ≤KuWA</span></span>
<span class="line"><span>n (cm2) (11.20)</span></span>
<span class="line"><span>Select wire with bare copper area less than or equal to this value. An American Wire Gauge</span></span>
<span class="line"><span>table is included in Appendix B.</span></span>
<span class="line"><span>As a check, the winding resistance can be computed:</span></span>
<span class="line"><span>R= ρn(MLT)</span></span>
<span class="line"><span>Aw</span></span>
<span class="line"><span>(Ω) (11.21)</span></span>
<span class="line"><span>11.3 Multiple-Winding Magnetics Design via the Kg Method</span></span>
<span class="line"><span>The Kg method can be extended to the case of multiple-winding magnetics, such as the trans-</span></span>
<span class="line"><span>formers and coupled inductors described in Sects. 10.5.3 to 10.5.5. The desired turns ratios, as</span></span>
<span class="line"><span>well as the desired winding voltage and current waveforms, are speciﬁed. In the case of a cou-</span></span>
<span class="line"><span>pled inductor or ﬂyback transformer, the magnetizing inductance is also speciﬁed. It is desired</span></span>
<span class="line"><span>to select a core size, number of turns for each winding, and wire sizes. It is also assumed that</span></span>
<span class="line"><span>the maximum ﬂux density Bmax is given.</span></span>
<span class="line"><span>With the Kg method, a desired copper loss is attained. In the multiple-winding case, each</span></span>
<span class="line"><span>winding contributes some copper loss, and it is necessary to allocate the available window area</span></span>
<span class="line"><span>among the various windings. In Sect.11.3.1 below, it is found that total copper loss is minimized</span></span>
<span class="line"><span>if the window area is divided between the windings according to their apparent powers. This</span></span>
<span class="line"><span>result is employed in the following sections, in which an optimized Kg method for coupled</span></span>
<span class="line"><span>inductor design is developed.</span></span>
<span class="line"><span>11.3.1 Window Area Allocation</span></span>
<span class="line"><span>The ﬁrst issue to settle in design of a multiple-winding magnetic device is the allocation of the</span></span>
<span class="line"><span>window area AW among the various windings. It is desired to design a device havingk windings</span></span>
<span class="line"><span>with turns ratios n1 : n2 :... : nk. These windings must conduct rms currents I1, I2,..., Ik</span></span>
<span class="line"><span>respectively. It should be noted that the windings are eﬀectively in parallel: the winding voltages</span></span>
<span class="line"><span>are ideally related by the turns ratios</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>= v2(t)</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>=··· = vk(t)</span></span>
<span class="line"><span>nk</span></span>
<span class="line"><span>(11.22)</span></span>
<span class="line"><span>However, the winding rms currents are determined by the loads, and in general are not related</span></span>
<span class="line"><span>to the turns ratios. The device is represented schematically in Fig. 11.6.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>466 11 Inductor Design</span></span>
<span class="line"><span>Fig. 11.6 It is desired to optimally allocate the win-</span></span>
<span class="line"><span>d o wa r e ao fak–winding magnetic element to min-</span></span>
<span class="line"><span>imize low-frequency copper losses, with given rms</span></span>
<span class="line"><span>winding currents and turns ratios</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>: nk</span></span>
<span class="line"><span>rms current</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>rms current</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>rms current</span></span>
<span class="line"><span>Ik</span></span>
<span class="line"><span>Fig. 11.7 Basic core topology, in-</span></span>
<span class="line"><span>cluding window area WA enclosed by</span></span>
<span class="line"><span>core (a). The window is allocated to</span></span>
<span class="line"><span>the various windings (b) to minimize</span></span>
<span class="line"><span>low-frequency copper loss</span></span>
<span class="line"><span>(a) Core</span></span>
<span class="line"><span>Window area WA</span></span>
<span class="line"><span>Core mean length</span></span>
<span class="line"><span>per turn (MLT)</span></span>
<span class="line"><span>Wire resistivity </span></span>
<span class="line"><span>Fill factor Ku</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Total window</span></span>
<span class="line"><span>area WA</span></span>
<span class="line"><span>Winding 1 allocation</span></span>
<span class="line"><span>1WA</span></span>
<span class="line"><span>Winding 2 allocation</span></span>
<span class="line"><span>2WA</span></span>
<span class="line"><span>etc.</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>The relevant geometrical parameters are summarized in Fig.11.7a. It is necessary to allocate</span></span>
<span class="line"><span>a portion of the total window areaWA to each winding, as illustrated in Fig.11.7b. Let α j be the</span></span>
<span class="line"><span>fraction of the window area allocated to winding j, where</span></span>
<span class="line"><span>0&lt; α j&lt; 1</span></span>
<span class="line"><span>α 1+ α 2+··· + α k= 1 (11.23)</span></span>
<span class="line"><span>The low-frequency copper lossPcu, j in winding j depends on the dc resistanceRj of winding</span></span>
<span class="line"><span>j, as follows:</span></span>
<span class="line"><span>Pcu, j= I2</span></span>
<span class="line"><span>j Rj (11.24)</span></span>
<span class="line"><span>The resistance of winding j is</span></span>
<span class="line"><span>Rj= ρℓj</span></span>
<span class="line"><span>AW, j</span></span>
<span class="line"><span>(11.25)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.3 Multiple-Winding Magnetics Design via the Kg Method 467</span></span>
<span class="line"><span>where ρis the wire resistivity,ℓj is the length of the wire used for winding j, and AW, j is the</span></span>
<span class="line"><span>cross-sectional area of the wire used for winding j. These quantities can be expressed as</span></span>
<span class="line"><span>ℓj= nj(MLT) (11.26)</span></span>
<span class="line"><span>AW, j= WAKuα j</span></span>
<span class="line"><span>nj</span></span>
<span class="line"><span>(11.27)</span></span>
<span class="line"><span>where (MLT) is the winding mean-length-per-turn, andKu is the winding ﬁll factor. Substitution</span></span>
<span class="line"><span>of these expressions into Eq. (11.25) leads to</span></span>
<span class="line"><span>Rj= ρ</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>j (MLT)</span></span>
<span class="line"><span>WAKuα j</span></span>
<span class="line"><span>(11.28)</span></span>
<span class="line"><span>The copper loss of winding j is therefore</span></span>
<span class="line"><span>Pcu, j=</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>j i2</span></span>
<span class="line"><span>jρ(MLT)</span></span>
<span class="line"><span>WAKuα j</span></span>
<span class="line"><span>(11.29)</span></span>
<span class="line"><span>The total copper loss of the k windings is</span></span>
<span class="line"><span>Pcu,tot= Pcu,1+ Pcu,2+··· + Pcu,k= ρ(MLT)</span></span>
<span class="line"><span>WAKu</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>j I2</span></span>
<span class="line"><span>j</span></span>
<span class="line"><span>α j</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠ (11.30)</span></span>
<span class="line"><span>It is desired to choose theα js such that the total copper lossPcu,tot is minimized. Let us consider</span></span>
<span class="line"><span>what happens when we vary one of the α s, say α 1, between 0 and 1.</span></span>
<span class="line"><span>When α 1 = 0, then we allocate zero area to winding 1. In consequence, the resistance</span></span>
<span class="line"><span>of winding 1 tends to inﬁnity. The copper loss of winding 1 also tends to inﬁnity. On the other</span></span>
<span class="line"><span>hand, the other windings are given maximum area, and hence their copper losses can be reduced.</span></span>
<span class="line"><span>Nonetheless, the total copper loss tends to inﬁnity.</span></span>
<span class="line"><span>When α</span></span>
<span class="line"><span>1 = 1, then we allocate all of the window area to winding 1, and none to the other</span></span>
<span class="line"><span>windings. Hence, the resistance of winding 1, as well as its low-frequency copper loss, is mini-</span></span>
<span class="line"><span>mized. But the copper losses of the remaining windings tend to inﬁnity.</span></span>
<span class="line"><span>As illustrated in Fig. 11.8, there must be an optimum value of α 1 that lies between these</span></span>
<span class="line"><span>two extremes, where the total copper loss is minimized. Let us compute the optimum values of</span></span>
<span class="line"><span>α 1, α 2,..., α k using the method of Lagrange multipliers. It is desired to minimize Eq. ( 11.30),</span></span>
<span class="line"><span>subject to the constraint of Eq. (11.23). Hence, we deﬁne the function</span></span>
<span class="line"><span>Fig. 11.8 Variation of copper losses</span></span>
<span class="line"><span>withα1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Copper</span></span>
<span class="line"><span>loss</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>Pcu,tot</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>cu,</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Pcu,2</span></span>
<span class="line"><span>+Pcu,3</span></span>
<span class="line"><span>+...+</span></span>
<span class="line"><span>Pcu,k</span></span>
<span class="line"><span></span></span>
<span class="line"><span>468 11 Inductor Design</span></span>
<span class="line"><span>f (α 1, α 2,··· , α k,ξ)= Pcu,tot(α 1, α 2,··· , α k)+ξg(α 1, α 2,··· , α k) (11.31)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>g(α 1, α 2,··· , α k)= 1−</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>α j (11.32)</span></span>
<span class="line"><span>is the constraint that must equal zero, and ξis the Lagrange multiplier. The optimum point is</span></span>
<span class="line"><span>the solution of the system of equations</span></span>
<span class="line"><span>∂f (α 1, α 2,··· , α k,ξ)</span></span>
<span class="line"><span>∂α 1</span></span>
<span class="line"><span>= 0</span></span>
<span class="line"><span>∂f (α 1, α 2,··· , α k,ξ)</span></span>
<span class="line"><span>∂α 2</span></span>
<span class="line"><span>= 0</span></span>
<span class="line"><span>..</span></span>
<span class="line"><span>. (11.33)</span></span>
<span class="line"><span>∂f (α</span></span>
<span class="line"><span>1, α 2,··· , α k,ξ)</span></span>
<span class="line"><span>∂α k</span></span>
<span class="line"><span>= 0</span></span>
<span class="line"><span>∂f (α 1, α 2,··· , α k,ξ)</span></span>
<span class="line"><span>∂ξ = 0</span></span>
<span class="line"><span>T h es o l u t i o ni s</span></span>
<span class="line"><span>ξ= ρ(MLT)</span></span>
<span class="line"><span>WAKu</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>njIj</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>= Pcu,tot (11.34)</span></span>
<span class="line"><span>α m= nmIm</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>njIj</span></span>
<span class="line"><span>(11.35)</span></span>
<span class="line"><span>This is the optimal choice for the α s, and the resulting minimum value of Pcu,tot.</span></span>
<span class="line"><span>According to Eq. (11.22), the winding voltages are proportional to the turns ratios. Hence,</span></span>
<span class="line"><span>we can express the α ms in the alternate form</span></span>
<span class="line"><span>α m= VmIm</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>VjIj</span></span>
<span class="line"><span>(11.36)</span></span>
<span class="line"><span>by multiplying and dividing Eq. (11.35) by the quantity Vm/nm. It is irrelevant whether rms or</span></span>
<span class="line"><span>peak voltages are used. Equation ( 11.36) is the desired result. It states that the window area</span></span>
<span class="line"><span>should be allocated to the various windings in proportion to their apparent powers. The numer-</span></span>
<span class="line"><span>ator of Eq. (11.36) is the apparent power of winding m, equal to the product of the rms current</span></span>
<span class="line"><span>and the voltage. The denominator is the sum of the apparent powers of all windings.</span></span>
<span class="line"><span>As an example, consider the PWM full-bridge transformer having a center-tapped secondary,</span></span>
<span class="line"><span>as illustrated in Fig. 11.9. This can be viewed as a three-winding transformer, having a single</span></span>
<span class="line"><span>primary-side winding of n</span></span>
<span class="line"><span>1 turns, and two secondary-side windings, each ofn2 turns. The wind-</span></span>
<span class="line"><span>ing current waveforms i1(t), i2(t), and i3(t) are illustrated in Fig. 11.10. Their rms values are</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.3 Multiple-Winding Magnetics Design via the Kg Method 469</span></span>
<span class="line"><span>Ii1(t)</span></span>
<span class="line"><span>n1 turns { } n2 turns</span></span>
<span class="line"><span>} n2 turns</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>i3(t)</span></span>
<span class="line"><span>Fig. 11.9 PWM full-bridge transformer example</span></span>
<span class="line"><span>Fig. 11.10 Transformer wave-</span></span>
<span class="line"><span>forms, PWM full-bridge trans-</span></span>
<span class="line"><span>former example</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>00</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>i2(t) I</span></span>
<span class="line"><span>0.5I 0.5I</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i3(t) I</span></span>
<span class="line"><span>0.5I 0.5I</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0 DTs Ts 2TsTs +DTs</span></span>
<span class="line"><span>I1=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2Ts</span></span>
<span class="line"><span>∫ 2TS</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>1(t)dt= n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D (11.37)</span></span>
<span class="line"><span>I2= I3=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2Ts</span></span>
<span class="line"><span>∫ 2TS</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>2(t)dt= 1</span></span>
<span class="line"><span>2 I</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ D (11.38)</span></span>
<span class="line"><span>Substitution of these expressions into Eq. (11.35) yields</span></span>
<span class="line"><span>α 1= 1</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎝1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ D</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>(11.39)</span></span>
<span class="line"><span>α 2= α 3= 1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎝1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>1+ D</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>(11.40)</span></span>
<span class="line"><span>If the design is to be optimized at the operating point D= 0.75, then one obtains</span></span>
<span class="line"><span>α 1= 0.396</span></span>
<span class="line"><span>α 2= 0.302 (11.41)</span></span>
<span class="line"><span>α 3= 0.302</span></span>
<span class="line"><span></span></span>
<span class="line"><span>470 11 Inductor Design</span></span>
<span class="line"><span>So approximately 40% of the window area should be allocated to the primary winding, and</span></span>
<span class="line"><span>30% should be allocated to each half of the center-tapped secondary. The total copper loss at</span></span>
<span class="line"><span>this optimal design point is found from evaluation of Eq. (11.34):</span></span>
<span class="line"><span>Pcu,tot= ρ(MLT)</span></span>
<span class="line"><span>WAKu</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>3∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>njIj</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>= ρ(MLT)n2</span></span>
<span class="line"><span>2I2</span></span>
<span class="line"><span>WAKu</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ 2D+ 2</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D(1+ D)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(11.42)</span></span>
<span class="line"><span>11.3.2 Coupled Inductor Design Constraints</span></span>
<span class="line"><span>Let us now consider how to design a k-winding coupled inductor, as discussed in Sect. 10.5.4</span></span>
<span class="line"><span>and illustrated in Fig. 11.11. It is desired that the magnetizing inductance be a speciﬁed value</span></span>
<span class="line"><span>LM, referred to winding 1. It is also desired that the numbers of turns for the other windings be</span></span>
<span class="line"><span>chosen according to desired turns ratios. When the magnetizing current iM(t) reaches its maxi-</span></span>
<span class="line"><span>mum value IM,max, the coupled inductor should operate with a given maximum ﬂux densityBmax.</span></span>
<span class="line"><span>With rms currents I1, I2,..., Ik applied to the respective windings, the total copper loss should</span></span>
<span class="line"><span>be a desired value Pcu given by Eq. (11.34). Hence, the design procedure involves selecting the</span></span>
<span class="line"><span>core size and number of primary turns so that the desired magnetizing inductance, the desired</span></span>
<span class="line"><span>ﬂux density, and the desired total copper loss are achieved. Other quantities, such as air gap</span></span>
<span class="line"><span>length, secondary turns, and wire sizes, can then be selected. The derivation follows the deriva-</span></span>
<span class="line"><span>tion for the single-winding case (Sect. 11.1), and incorporates the window area optimization of</span></span>
<span class="line"><span>Sect. 11.3.1.</span></span>
<span class="line"><span>The magnetizing current iM(t) can be expressed in terms of the winding currents i1(t), i2(t),</span></span>
<span class="line"><span>..., ik(t) by solution of Fig. 11.11a (or by use of Ampere’s Law), as follows:</span></span>
<span class="line"><span>iM(t)= i1(t)+ n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>i2(t)+··· + nk</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>ik(t) (11.43)</span></span>
<span class="line"><span>Fig. 11.11 A k–winding magnetic device, with speciﬁed turns ratios and waveforms: (a) electrical circuit</span></span>
<span class="line"><span>model, (b) magnetic circuit model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.3 Multiple-Winding Magnetics Design via the Kg Method 471</span></span>
<span class="line"><span>By solution of the magnetic circuit model of Fig. 11.11b, we can write</span></span>
<span class="line"><span>n1iM(t)= B(t)Ac· Rg (11.44)</span></span>
<span class="line"><span>This equation is analogous to Eq. ( 11.4), and assumes that the reluctance Rg of the air gap is</span></span>
<span class="line"><span>much larger than the reluctance Rc of the core. As usual, the total ﬂux Φ(t) is equal to B(t)Ac.</span></span>
<span class="line"><span>Leakage inductances are ignored.</span></span>
<span class="line"><span>To avoid saturation of the core, the instantaneous ﬂux density B(t) must be less than the</span></span>
<span class="line"><span>saturation ﬂux density of the core material, Bsat. Let us deﬁne IM,max as the maximum value</span></span>
<span class="line"><span>of the magnetizing current iM(t). According to Eq. ( 11.44), this will lead to a maximum ﬂux</span></span>
<span class="line"><span>density Bmax given by</span></span>
<span class="line"><span>n1IM,max = Bmax Ac· Rg= Bmax</span></span>
<span class="line"><span>ℓg</span></span>
<span class="line"><span>μ0</span></span>
<span class="line"><span>(11.45)</span></span>
<span class="line"><span>For a value of IM,max given by the circuit application, we should use Eq. ( 11.45) to choose the</span></span>
<span class="line"><span>turns n1 and gap length ℓg such that the maximum ﬂux density Bmax is less than the satura-</span></span>
<span class="line"><span>tion density Bsat. Equation (11.45) is similar to Eq. (11.6), but accounts for the magnetizations</span></span>
<span class="line"><span>produced by multiple-winding currents.</span></span>
<span class="line"><span>The magnetizing inductance LM, referred to winding 1, is equal to</span></span>
<span class="line"><span>LM = n2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Rg</span></span>
<span class="line"><span>= n2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>μ0Ac</span></span>
<span class="line"><span>ℓg</span></span>
<span class="line"><span>(11.46)</span></span>
<span class="line"><span>This equation is analogous to Eq. (11.7).</span></span>
<span class="line"><span>As shown in Sect. 11.3.1, the total copper loss is minimized when the core window areaWA</span></span>
<span class="line"><span>is allocated to the various windings according to Eq. (11.35)o r( 11.36). The total copper loss is</span></span>
<span class="line"><span>then given by Eq. (11.34). Equation (11.34) can be expressed in the form</span></span>
<span class="line"><span>Pcu= ρ(MLT)n2</span></span>
<span class="line"><span>1I2</span></span>
<span class="line"><span>tot</span></span>
<span class="line"><span>WAKu</span></span>
<span class="line"><span>(11.47)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Itot=</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>nj</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>Ij (11.48)</span></span>
<span class="line"><span>is the sum of the rms winding currents, referred to winding 1.</span></span>
<span class="line"><span>We can now eliminate the unknown quantities ℓg and n1 from Eqs. ( 11.45), ( 11.46),</span></span>
<span class="line"><span>and (11.47). Equation (11.47) then becomes</span></span>
<span class="line"><span>Pcu=</span></span>
<span class="line"><span>ρ(MLT)L2</span></span>
<span class="line"><span>M I2</span></span>
<span class="line"><span>totI2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxA2</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>WAKu</span></span>
<span class="line"><span>(11.49)</span></span>
<span class="line"><span>We can now rearrange this equation, by grouping terms that involve the core geometry on the</span></span>
<span class="line"><span>left-hand side, and speciﬁcations on the right-hand side:</span></span>
<span class="line"><span>A2</span></span>
<span class="line"><span>c WA</span></span>
<span class="line"><span>(MLT)=</span></span>
<span class="line"><span>ρL2</span></span>
<span class="line"><span>M I2</span></span>
<span class="line"><span>totI2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxKuPcu</span></span>
<span class="line"><span>(11.50)</span></span>
<span class="line"><span>The left-hand side of the equation can be recognized as the sameKg term deﬁned in Eq. (11.15).</span></span>
<span class="line"><span>Therefore, to design a coupled inductor that meets the requirements of operating with a given</span></span>
<span class="line"><span></span></span>
<span class="line"><span>472 11 Inductor Design</span></span>
<span class="line"><span>maximum ﬂux density Bmax, given primary magnetizing inductance LM, and with a given total</span></span>
<span class="line"><span>copper loss Pcu, we must select a core that satisﬁes</span></span>
<span class="line"><span>Kg≥</span></span>
<span class="line"><span>ρL2</span></span>
<span class="line"><span>M I2</span></span>
<span class="line"><span>totI2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxKuPcu</span></span>
<span class="line"><span>(11.51)</span></span>
<span class="line"><span>Once such a core is found, then the winding 1 turns and gap length can be selected to satisfy</span></span>
<span class="line"><span>Eqs. (11.45) and (11.46). The turns of windings 2 throughk are selected according to the desired</span></span>
<span class="line"><span>turns ratios. The window area is allocated among the windings according to Eq. (11.35), and the</span></span>
<span class="line"><span>wire gauges are chosen using Eq. (11.27).</span></span>
<span class="line"><span>The procedure above is applicable to design of coupled inductors. The results are applicable</span></span>
<span class="line"><span>to design of ﬂyback and SEPIC transformers as well, although it should be noted that the proce-</span></span>
<span class="line"><span>dure does not account for the eﬀects of core or proximity loss. It also can be extended to design</span></span>
<span class="line"><span>of other devices, such as conventional transformers—doing so is left as a homework problem.</span></span>
<span class="line"><span>11.3.3 First-Pass Design Procedure</span></span>
<span class="line"><span>The following quantities are speciﬁed, using the units noted:</span></span>
<span class="line"><span>Wire eﬀective resistivity ρ (Ω-cm)</span></span>
<span class="line"><span>Total rms winding currents, referred to winding 1 I</span></span>
<span class="line"><span>tot=</span></span>
<span class="line"><span>k∑</span></span>
<span class="line"><span>j=1</span></span>
<span class="line"><span>nj</span></span>
<span class="line"><span>ni</span></span>
<span class="line"><span>Ij (A)</span></span>
<span class="line"><span>Peak magnetizing current, referred to winding 1 IM,max (A)</span></span>
<span class="line"><span>Desired turns ratios n2/n1, n3/n1,e t c .</span></span>
<span class="line"><span>Magnetizing inductance, referred to winding 1 LM (H)</span></span>
<span class="line"><span>Allowed total copper loss Pcu (W)</span></span>
<span class="line"><span>Winding ﬁll factor Ku</span></span>
<span class="line"><span>Maximum operating ﬂux density Bmax (T)</span></span>
<span class="line"><span>The core dimensions are expressed in cm:</span></span>
<span class="line"><span>Core cross-sectional area Ac (cm2)</span></span>
<span class="line"><span>Core window area WA (cm2)</span></span>
<span class="line"><span>Mean length per turn MLT (cm)</span></span>
<span class="line"><span>The use of centimeters rather than meters requires that appropriate factors be added to the</span></span>
<span class="line"><span>design equations.</span></span>
<span class="line"><span>1. Determine core size</span></span>
<span class="line"><span>Kg≥</span></span>
<span class="line"><span>ρL2</span></span>
<span class="line"><span>M I2</span></span>
<span class="line"><span>totI2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxPcuKu</span></span>
<span class="line"><span>108 (cm5) (11.52)</span></span>
<span class="line"><span>Choose a core which is large enough to satisfy this inequality. Note the values of Ac, WA, and</span></span>
<span class="line"><span>MLT for this core. The resistivity ρof copper wire is 1.724· 10−6Ω· cm at room temperature,</span></span>
<span class="line"><span>and 2.3· 10−6Ω· cm at 100◦C.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.3 Multiple-Winding Magnetics Design via the Kg Method 473</span></span>
<span class="line"><span>2. Determine air gap length</span></span>
<span class="line"><span>ℓg=</span></span>
<span class="line"><span>μ0LM I2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxAc</span></span>
<span class="line"><span>104 (m) (11.53)</span></span>
<span class="line"><span>Here, Bmax is expressed in Tesla, Ac is expressed in cm 2, andℓg is expressed in meters. The</span></span>
<span class="line"><span>permeability of free space is μ0 = 4π· 10−7 H/m. This value is approximate, and neglects</span></span>
<span class="line"><span>fringing ﬂux and other nonidealities.</span></span>
<span class="line"><span>3. Determine number of winding 1 turns</span></span>
<span class="line"><span>n1= LM IM,max</span></span>
<span class="line"><span>BmaxAc</span></span>
<span class="line"><span>104 (11.54)</span></span>
<span class="line"><span>Here, Bmax is expressed in Tesla and Ac is expressed in cm2.</span></span>
<span class="line"><span>4. Determine number of secondary turns</span></span>
<span class="line"><span>Use the desired turns ratios:</span></span>
<span class="line"><span>n2=</span></span>
<span class="line"><span>⎦n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>n3=</span></span>
<span class="line"><span>⎦n3</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>(11.55)</span></span>
<span class="line"><span>5. Evaluate fraction of window area allocated to each winding</span></span>
<span class="line"><span>α 1 = n1I1</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>α 2 = n2I2</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>(11.56)</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>α k = nk Ik</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>6. Evaluate wire sizes</span></span>
<span class="line"><span>Aw1 ≤α 1KuWA</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>Aw2 ≤α 2KuWA</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>... (11.57)</span></span>
<span class="line"><span>Select wire with bare copper area less than or equal to these values. An American Wire Gauge</span></span>
<span class="line"><span>table is included in Appendix B.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>474 11 Inductor Design</span></span>
<span class="line"><span>11.4 Examples</span></span>
<span class="line"><span>11.4.1 Coupled Inductor for a Two-Output Forward Converter</span></span>
<span class="line"><span>As a ﬁrst example, let us consider the design of coupled inductors for the two-output forward</span></span>
<span class="line"><span>converter illustrated in Fig. 11.12. This element can be viewed as two ﬁlter inductors that are</span></span>
<span class="line"><span>wound on the same core. The turns ratio is chosen to be the same as the ratio of the output</span></span>
<span class="line"><span>voltages. The magnetizing inductance performs the function of ﬁltering the switching harmon-</span></span>
<span class="line"><span>ics for both outputs, and the magnetizing current is equal to the sum of the reﬂected winding</span></span>
<span class="line"><span>currents.</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>n1 +</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>turns</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>+vg</span></span>
<span class="line"><span>Output 1</span></span>
<span class="line"><span>28 V</span></span>
<span class="line"><span>4 A</span></span>
<span class="line"><span>Output 2</span></span>
<span class="line"><span>12 V</span></span>
<span class="line"><span>2 Afs = 200 kHz</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>LMiM</span></span>
<span class="line"><span>Coupled</span></span>
<span class="line"><span>inductor</span></span>
<span class="line"><span>model</span></span>
<span class="line"><span>vM</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>iM(t)</span></span>
<span class="line"><span>vM(t)</span></span>
<span class="line"><span>IM</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>iM</span></span>
<span class="line"><span>D Ts</span></span>
<span class="line"><span>Fig. 11.12 Two-output forward converter example: ( a) circuit schematic, ( b) coupled inductor model</span></span>
<span class="line"><span>inserted into converter secondary-side circuit, (c) magnetizing current and voltage waveforms of coupled</span></span>
<span class="line"><span>inductor, referred to winding 1</span></span>
<span class="line"><span>At the nominal full-load operating point, the converter operates in the continuous conduction</span></span>
<span class="line"><span>mode with a duty cycle of D= 0.35. The switching frequency is 200 kHz. At this operating</span></span>
<span class="line"><span>point, it is desired that the ripple in the magnetizing current have a peak magnitude equal to</span></span>
<span class="line"><span>20% of the dc component of magnetizing current.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.4 Examples 475</span></span>
<span class="line"><span>The dc component of the magnetizing current IM is</span></span>
<span class="line"><span>IM = I1+ n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>= (4 A)+ 12</span></span>
<span class="line"><span>28(2 A) (11.58)</span></span>
<span class="line"><span>= 4.86 A</span></span>
<span class="line"><span>The magnetizing current rippleΔiM can be expressed as</span></span>
<span class="line"><span>ΔiM = V1D′Ts</span></span>
<span class="line"><span>2LM</span></span>
<span class="line"><span>(11.59)</span></span>
<span class="line"><span>Since we wantΔiM to be equal to 20% of IM, we should choose LM as follows:</span></span>
<span class="line"><span>LM = V1D′Ts</span></span>
<span class="line"><span>2ΔiM</span></span>
<span class="line"><span>= (28 V)(1−0.35)(5 μs)</span></span>
<span class="line"><span>2(4.86 A)(20%) (11.60)</span></span>
<span class="line"><span>= 47 μH</span></span>
<span class="line"><span>The peak magnetizing current, referred to winding 1, is therefore</span></span>
<span class="line"><span>IM,max= IM+ΔiM = 5.83 A (11.61)</span></span>
<span class="line"><span>Since the current ripples of the winding currents are small compared to the respective dc com-</span></span>
<span class="line"><span>ponents, the rms values of the winding currents are approximately equal to the dc components:</span></span>
<span class="line"><span>I1= 4A, I2= 2 A. Therefore, the sum of the rms winding currents, referred to winding 1, is</span></span>
<span class="line"><span>Itot= I1+ n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I2= 4.86 A (11.62)</span></span>
<span class="line"><span>For this design, it is decided to allow 0.75 W of copper loss, and to operate the core at a max-</span></span>
<span class="line"><span>imum ﬂux density of 0.25 Tesla. A ﬁll factor of 0.4 is assumed. The required Kg is found by</span></span>
<span class="line"><span>evaluation of Eq. (11.52), as follows:</span></span>
<span class="line"><span>Kg≥(1.724· 10−6Ω−cm)(47 μH)2(4.86 A)2(5.83 A)2</span></span>
<span class="line"><span>(0.25 T)2(0.75 W)(0.4) 108 (11.63)</span></span>
<span class="line"><span>= 16· 10−3 cm5</span></span>
<span class="line"><span>A ferrite PQ 20/16 core is selected, which has a Kg of 22.4· 10−3 cm5. From Appendix B,t h e</span></span>
<span class="line"><span>geometrical parameters for this core are Ac= 0.62 cm2, WA= 0.256 cm2, and MLT= 4.4c m .</span></span>
<span class="line"><span>The air gap is found by evaluation of Eq. (11.53) as follows:</span></span>
<span class="line"><span>ℓg=</span></span>
<span class="line"><span>μ0LM I2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxAc</span></span>
<span class="line"><span>104</span></span>
<span class="line"><span>= (4π· 10−7H/m)(47 μH)(5.83 A)2</span></span>
<span class="line"><span>(0.25 T)2(0.62 cm2) 104 (11.64)</span></span>
<span class="line"><span>= 0.52 mm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>476 11 Inductor Design</span></span>
<span class="line"><span>In practice, a slightly longer air gap would be necessary, to allow for the eﬀects of fringing ﬂux</span></span>
<span class="line"><span>and other nonidealities. The winding 1 turns are found by evaluation of Eq. (11.54):</span></span>
<span class="line"><span>n1 = LM IM,max</span></span>
<span class="line"><span>BmaxAc</span></span>
<span class="line"><span>104</span></span>
<span class="line"><span>= (47 μH)(5.83 A)</span></span>
<span class="line"><span>(0.25 T)(0.62 cm2)104 (11.65)</span></span>
<span class="line"><span>= 17.6 turns</span></span>
<span class="line"><span>The winding 2 turns are chosen according to the desired turns ratio:</span></span>
<span class="line"><span>n2 =</span></span>
<span class="line"><span>⎦n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>⎦12</span></span>
<span class="line"><span>28</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(17.6) (11.66)</span></span>
<span class="line"><span>= 7.54 turns</span></span>
<span class="line"><span>The numbers of turns are rounded oﬀto n1 = 17 turns, n2 = 7 turns (18:8 would be another</span></span>
<span class="line"><span>possible choice). The window area WA is allocated to the windings according to the fractions</span></span>
<span class="line"><span>from Eq. (11.56):</span></span>
<span class="line"><span>α 1= n1I1</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>= (17)(4 A)</span></span>
<span class="line"><span>(17)(4.86 A)= 0.8235</span></span>
<span class="line"><span>α 2= n2I2</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>= (7)(2 A)</span></span>
<span class="line"><span>(17)(4.86 A)= 0.1695</span></span>
<span class="line"><span>(11.67)</span></span>
<span class="line"><span>The wire sizes can therefore be chosen as follows:</span></span>
<span class="line"><span>Aw1≤α 1KuWA</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>= (0.8235)(0.4)(0.256 cm2)</span></span>
<span class="line"><span>(17) = 4.96· 10−3 cm2</span></span>
<span class="line"><span>use AWG #21</span></span>
<span class="line"><span>(11.68)</span></span>
<span class="line"><span>Aw2≤α 2KuWA</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>= (0.1695)(0.4)(0.256 cm2)</span></span>
<span class="line"><span>(7) = 2.48· 10−3 cm2</span></span>
<span class="line"><span>use AWG #24</span></span>
<span class="line"><span>11.4.2 CCM Flyback Transformer</span></span>
<span class="line"><span>As a second example, let us design the ﬂyback transformer for the converter illustrated in</span></span>
<span class="line"><span>Fig. 11.13. This converter operates with an input voltage of 200 V , and produces an full-load</span></span>
<span class="line"><span>output of 20 V at 5 A. The switching frequency is 150 kHz. Under these operating conditions, it</span></span>
<span class="line"><span>is desired that the converter operate in the continuous conduction mode, with a magnetizing cur-</span></span>
<span class="line"><span>rent ripple equal to 20% of the dc component of magnetizing current. The duty cycle is chosen</span></span>
<span class="line"><span>to be D= 0.4, and the turns ratio is n</span></span>
<span class="line"><span>2/n1 = 0.15. A copper loss of 1.5 W is allowed, not in-</span></span>
<span class="line"><span>cluding proximity eﬀect losses. To allow room for isolation between the primary and secondary</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.4 Examples 477</span></span>
<span class="line"><span>Fig. 11.13 Flyback transformer</span></span>
<span class="line"><span>design example: (a)c o n v e r t e r</span></span>
<span class="line"><span>schematic, (b) typical</span></span>
<span class="line"><span>waveforms</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>LM</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>n1 : n2</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>Transformer model</span></span>
<span class="line"><span>iMi1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vM</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>vM(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>iM(t)</span></span>
<span class="line"><span>IM</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iM</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>IM</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>IM</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>windings, a ﬁll factor ofKu= 0.3 is assumed. A maximum ﬂux density ofBmax= 0.25 T is used;</span></span>
<span class="line"><span>this value is less than the worst-case saturation ﬂux density Bsat of the ferrite core material.</span></span>
<span class="line"><span>By solution of the converter using capacitor charge balance, the dc component of the mag-</span></span>
<span class="line"><span>netizing current can be found to be</span></span>
<span class="line"><span>IM =</span></span>
<span class="line"><span>⎦n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>) 1</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>R= 1.25 A (11.69)</span></span>
<span class="line"><span>Hence, the magnetizing current ripple should be</span></span>
<span class="line"><span>ΔiM = (20%)IM = 0.25 A (11.70)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>478 11 Inductor Design</span></span>
<span class="line"><span>and the maximum value of the magnetizing current is</span></span>
<span class="line"><span>IM,max= IM+ΔiM = 1.5 A (11.71)</span></span>
<span class="line"><span>To obtain this ripple, the magnetizing inductance should be</span></span>
<span class="line"><span>LM = VgDTs</span></span>
<span class="line"><span>2ΔiM</span></span>
<span class="line"><span>(11.72)</span></span>
<span class="line"><span>= 1.07 mH</span></span>
<span class="line"><span>The rms value of the primary winding current is found using Eq. ( A.6) of Appendix A,a sf o l -</span></span>
<span class="line"><span>lows:</span></span>
<span class="line"><span>I1= IM</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦ΔiM</span></span>
<span class="line"><span>IM</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>= 0.796 A (11.73)</span></span>
<span class="line"><span>The rms value of the secondary winding current is found in a similar manner:</span></span>
<span class="line"><span>I2= n1</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>IM</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>⎦ΔiM</span></span>
<span class="line"><span>IM</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>= 6.50 A (11.74)</span></span>
<span class="line"><span>Note that I2 is not simply equal to the turns ratio multiplied byI1. The total rms winding current</span></span>
<span class="line"><span>is equal to:</span></span>
<span class="line"><span>Itot= I1+ n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>I2= 1.77 A (11.75)</span></span>
<span class="line"><span>We can now determine the necessary core size. Evaluation of Eq. (11.52) yields</span></span>
<span class="line"><span>Kg ≥</span></span>
<span class="line"><span>ρL2</span></span>
<span class="line"><span>M I2</span></span>
<span class="line"><span>totI2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxPcuKu</span></span>
<span class="line"><span>108</span></span>
<span class="line"><span>= (1.724· 10−6Ω−cm)(1.07· 10−3 H)2(1.77 A)2(1.5A )2</span></span>
<span class="line"><span>(0.25 T)2(1.5W ) ( 0.3) 108 (11.76)</span></span>
<span class="line"><span>= 0.049 cm5</span></span>
<span class="line"><span>The smallest EE core listed in Appendix B that satisﬁes this inequality is the EE30, which has</span></span>
<span class="line"><span>Kg= 0.0857 cm5. The dimensions of this core are</span></span>
<span class="line"><span>Ac 1.09 cm2</span></span>
<span class="line"><span>WA 0.476 cm2</span></span>
<span class="line"><span>MLT 6.6c m</span></span>
<span class="line"><span>ℓm 5.77 cm</span></span>
<span class="line"><span>(11.77)</span></span>
<span class="line"><span>The air gap lengthℓg is chosen according to Eq. (11.53):</span></span>
<span class="line"><span>ℓg =</span></span>
<span class="line"><span>μ0LM I2</span></span>
<span class="line"><span>M,max</span></span>
<span class="line"><span>B2maxAc</span></span>
<span class="line"><span>104</span></span>
<span class="line"><span>= (4π· 10−7H/m)(1.07· 10−3 H)(1.5A )2</span></span>
<span class="line"><span>(0.25 T)2(1.09 cm2) 104 (11.78)</span></span>
<span class="line"><span>= 0.44 mm</span></span></code></pre></div>`,10)])])}const g=s(i,[["render",l]]);export{u as __pageData,g as default};
