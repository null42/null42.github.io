import{_ as n,o as t,c as e,a5 as r}from"./chunks/framework.B5tqjWbr.js";const d=JSON.parse('{"title":"电流环 PI 参数整定计算器","description":"","frontmatter":{"title":"电流环 PI 参数整定计算器","date":"2026-07-02T00:00:00.000Z","section":"电机控制","chapter":"algorithm","chapterTitle":"控制算法","category":"控制算法","tags":["imported"],"source":"motor","sourcePath":"algorithm/ALG-00-PI-Calculator.html","status":"learning","visibility":"public","summary":"Imported from algorithm/ALG-00-PI-Calculator.html","chapterOrder":20,"navGroup":"控制与算法","navGroupOrder":30},"headers":[],"relativePath":"content/motor/algorithm/ALG-00-PI-Calculator.md","filePath":"content/motor/algorithm/ALG-00-PI-Calculator.md","lastUpdated":null}'),m={name:"content/motor/algorithm/ALG-00-PI-Calculator.md"};function o(p,a,l,h,i,s){return t(),e("div",null,[...a[0]||(a[0]=[r(`<h1 id="电流环-pi-参数整定计算器" tabindex="-1">电流环 PI 参数整定计算器 <a class="header-anchor" href="#电流环-pi-参数整定计算器" aria-label="Permalink to &quot;电流环 PI 参数整定计算器&quot;">​</a></h1><p>基于极零对消法（Pole-Zero Cancellation）的一阶电流环PI调节器参数计算与可视化</p><pre><code>&amp;#9881; 电机电气参数输入

  &amp;#128295; 快速选择真实电机参数：

    -- 自定义输入 --

      200W IPMSM (Ld=0.08mH, Rs=0.06Ω, 24V/200W)

      小型高速PMSM (L=0.104mH, R=0.105Ω)

      4310云台 (L=4.74mH, R=10.9Ω, 16V/512rpm/28极)

    相电感 L (mH)

    相电阻 R (&amp;Omega;)

    PWM 频率 fPWM (kHz)

    期望带宽 &amp;alpha; (rad/s)
    3000

    100
    &amp;alpha;max = --
    20000

  核心公式（极零对消法）：

  &amp;tau; = L / R（电气时间常数）&amp;rarr;
  Kp = &amp;alpha; &amp;times; L &amp;rarr;
  Ki = &amp;alpha; &amp;times; R

  闭环传递函数：Gcl(s) = &amp;alpha; / (s + &amp;alpha;)，等效为一阶惯性环节

  &amp;alpha;max = 2&amp;pi; &amp;times; fPWM / 20（建议不超过PWM频率的1/20）

&amp;#9889; 计算结果

    电气时间常数 &amp;tau;
    --
    ms

    比例增益 Kp
    --
    V/A

    积分增益 Ki
    --
    V/(A&amp;middot;s)

    闭环时间常数 &amp;tau;cl
    --
    ms

    加速比 &amp;tau; / &amp;tau;cl
    --
    &amp;times;

    上升时间 (10%~90%)
    --
    ms

    闭环带宽
    --
    Hz

    &amp;alpha;max 推荐上限
    --
    rad/s

  --

&amp;#128202; 不同 &amp;alpha; 值对比
</code></pre><table tabindex="0"><thead><tr><th>α (rad/s)</th><th>Kp (V/A)</th><th>Ki (V/(A·s))</th><th>τcl (ms)</th><th>上升时间 (ms)</th><th>带宽 (Hz)</th><th>安全性</th></tr></thead></table><pre><code>&amp;#127912; 频域 / 时域响应可视化
</code></pre><h3 id="开环-bode-图-幅频特性" tabindex="-1">开环 Bode 图（幅频特性） <a class="header-anchor" href="#开环-bode-图-幅频特性" aria-label="Permalink to &quot;开环 Bode 图（幅频特性）&quot;">​</a></h3><h3 id="闭环阶跃响应" tabindex="-1">闭环阶跃响应 <a class="header-anchor" href="#闭环阶跃响应" aria-label="Permalink to &quot;闭环阶跃响应&quot;">​</a></h3><pre><code>&amp;#128203; 导出参数
&amp;#8634; 恢复默认
</code></pre>`,8)])])}const u=n(m,[["render",o]]);export{d as __pageData,u as default};
