import{_ as a,o as t,c as n,a5 as o}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"定点数闯关：一小时速通","description":"","frontmatter":{"title":"定点数闯关：一小时速通","date":"2026-07-02T00:00:00.000Z","section":"电源控制","chapter":"01-Lessons","chapterTitle":"电源课程","category":"电源控制","tags":["imported"],"source":"power","sourcePath":"0049-fixed-point-dungeon.html","status":"learning","visibility":"public","summary":"Imported from 0049-fixed-point-dungeon.html","chapterOrder":10},"headers":[],"relativePath":"content/power/lessons/0049-fixed-point-dungeon.md","filePath":"content/power/lessons/0049-fixed-point-dungeon.md","lastUpdated":null}'),r={name:"content/power/lessons/0049-fixed-point-dungeon.md"};function d(c,e,i,l,p,s){return t(),n("div",null,[...e[0]||(e[0]=[o(`<p>上一节：MATLAB/Simulink 到 UPS 软件开发快速路线 下一节：待定</p><pre><code>  UPS/PCS 固件现场课
</code></pre><h1 id="定点数闯关-一小时速通" tabindex="-1">定点数闯关：一小时速通 <a class="header-anchor" href="#定点数闯关-一小时速通" aria-label="Permalink to &quot;定点数闯关：一小时速通&quot;">​</a></h1><p>你突然打开公司代码，发现电流环、PI、滤波器、功率计算、通信参数全在 Q 格式里来回切换。这个单 HTML 游戏把定点数拆成 14 个关卡：先看懂，再会算，最后能反推真实工程代码。</p><pre><code>    开始闯关
    打开定点计算器
    看代码排错清单

  建议节奏

    10分钟
</code></pre><p>表示与 Q 格式 20分钟 加减乘除与转换 20分钟 ADC、PWM、PI 工程链路 10分钟 读代码清单</p><p>进度保存在浏览器 localStorage；这个文件可以离线打开。</p><pre><code>  关卡地图

  重置进度
</code></pre><h2 id="定点计算器" tabindex="-1">定点计算器 <a class="header-anchor" href="#定点计算器" aria-label="Permalink to &quot;定点计算器&quot;">​</a></h2><p>用它验证公式：<code>raw = round(real * 2^Q)</code>，<code>real = raw / 2^Q</code>。切换位宽和 Q，观察分辨率、范围、饱和和十六进制。</p><pre><code>      真实值 real

      Q 小数位

      总位宽

          16
          24
          32

      舍入方式

          round
          trunc
          floor

      raw 有符号整数
      hex 补码
      还原 real
      范围与分辨率
</code></pre><h2 id="q-格式转换练习" tabindex="-1">Q 格式转换练习 <a class="header-anchor" href="#q-格式转换练习" aria-label="Permalink to &quot;Q 格式转换练习&quot;">​</a></h2><p>工程里常见：ADC 结果是 Q12，PI 系数是 Q24，PWM 占空比要 Q15。这个小工具只做一件事：看清楚左移和右移到底在改什么。</p><pre><code>      raw 输入

      源 Q

      目标 Q

      位宽

          16
          32

      真实值
      目标 raw
      移位动作
      误差
</code></pre><h2 id="移位口算训练营" tabindex="-1">移位口算训练营 <a class="header-anchor" href="#移位口算训练营" aria-label="Permalink to &quot;移位口算训练营&quot;">​</a></h2><p>定点移位不用十六进制也能算。把它翻译成倍率：<code>左移 n 位 = 乘 2^n</code>，<code>右移 n 位 = 除 2^n</code>。先背锚点：<code>2^3=8</code>、<code>2^9=512</code>、<code>2^15=32768</code>。</p><pre><code>      Q12 -&gt; Q15Q 增加 3 位，raw 乘 8。例：1024 变 8192，真实值仍是 0.25。
      Q24 -&gt; Q15Q 减少 9 位，raw 除 512。低 9 位会丢失，最好考虑舍入。
      Q15 心算锚点1.0 约 32768，0.5 是 16384，0.25 是 8192，0.125 是 4096。

      raw

      移位位数 n

      方向

          左移
          右移

      心算倍率

      一句话
      结果 raw
      常用锚点2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^8=256, 2^9=512, 2^10=1024, 2^15=32768
      读代码提示看到 &gt;&gt;15，先读成“除以 32768，通常是在从 Q30 拉回 Q15”。
</code></pre><h2 id="定标站-raw-到工程量" tabindex="-1">定标站：raw 到工程量 <a class="header-anchor" href="#定标站-raw-到工程量" aria-label="Permalink to &quot;定标站：raw 到工程量&quot;">​</a></h2><p>**定标不是标幺值。**定标 calibration/scaling 是把原始数字换成有意义的工程量；标幺值是把工程量除以基准值。典型链路是：<code>adc_count -&gt; 定标 -&gt; 物理量 -&gt; 标幺值 -&gt; Q 格式</code>。</p><pre><code>      adc_count

      offset

      scale/gain

      base 基准值

      定标后物理量
      标幺值 pu
      Q15 raw
      定标系数可能包含ADC 参考电压、采样电阻分压比、运放增益、传感器灵敏度、单位换算、Q 缩放。
</code></pre><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int32_t vbus_q15 = (adc_raw - offset) * vbus_scale_q15;</span></span>
<span class="line"><span>// vbus_scale_q15 是定标系数：每个 ADC count 对应多少电压或多少 pu。</span></span>
<span class="line"><span>// 它不是 vbus_pu 本身，而是 raw 到工程量的换算桥。</span></span></code></pre></div><h2 id="从公司代码反推-q-格式-调试清单" tabindex="-1">从公司代码反推 Q 格式：调试清单 <a class="header-anchor" href="#从公司代码反推-q-格式-调试清单" aria-label="Permalink to &quot;从公司代码反推 Q 格式：调试清单&quot;">​</a></h2><h3 id="_1-找单位" tabindex="-1">1. 找单位 <a class="header-anchor" href="#_1-找单位" aria-label="Permalink to &quot;1. 找单位&quot;">​</a></h3><p>变量名如果叫 <code>iL_q15</code>、<code>vbus_pu</code>、<code>theta_q24</code>，先判断它是物理量、标幺值、角度，还是 PWM 比较值。</p><h3 id="_2-找缩放点" tabindex="-1">2. 找缩放点 <a class="header-anchor" href="#_2-找缩放点" aria-label="Permalink to &quot;2. 找缩放点&quot;">​</a></h3><p>盯住 ADC 标定、通信参数写入、PI 系数初始化、乘法右移。缩放点通常藏在 <code>&gt;</code>、<code>_IQ()</code>、<code>Qmpy</code> 里。</p><h3 id="_3-找定标" tabindex="-1">3. 找定标 <a class="header-anchor" href="#_3-找定标" aria-label="Permalink to &quot;3. 找定标&quot;">​</a></h3><p>定标系数常叫 <code>scale</code>、<code>gain</code>、<code>coef</code>、<code>k</code>。它可能把 ADC count 换成 V/A，也可能直接换成 pu 或某个 Q 格式 raw。</p><h3 id="_4-找保护" tabindex="-1">4. 找保护 <a class="header-anchor" href="#_4-找保护" aria-label="Permalink to &quot;4. 找保护&quot;">​</a></h3><p>没有饱和的定点控制器很危险。看到积分器、滤波器、功率累加时，检查是否有 <code>SAT_Q15</code>、限幅、抗积分饱和。</p><table tabindex="0"><thead><tr><th>代码现象</th><th>你该问的问题</th><th>典型判断</th></tr></thead><tbody><tr><td><code>x &gt;&gt; 15</code></td><td>前面是否做了 Q15 乘法？</td><td><code>(a_raw * b_raw) &gt;&gt; Q</code> 常用于把 Q30 拉回 Q15。</td></tr><tr><td><code>int64_t acc</code></td><td>是否在做乘加、功率或滤波器累加？</td><td>乘法中间结果需要更宽位宽，避免还没右移就溢出。</td></tr><tr><td><code>vbus_pu</code></td><td>基准值是多少？</td><td>标幺值常把额定电压、电流或功率映射为 1.0。</td></tr><tr><td><code>coeff_q24</code></td><td>系数为何比信号 Q 更高？</td><td>小系数需要更多小数位保存精度，乘完再转换到输出 Q。</td></tr><tr><td>\`raw</td><td></td><td></td></tr></tbody></table><h2 id="工程参考" tabindex="-1">工程参考 <a class="header-anchor" href="#工程参考" aria-label="Permalink to &quot;工程参考&quot;">​</a></h2><p>这节课的术语对齐到常见 DSP 固件生态：Arm 的 CMSIS-DSP 有 Q7/Q15/Q31 等定点类型和饱和转换；TI IQmath 面向 C28x 固定 Q 格式运算；Microchip LibQ 覆盖 Q15、Q31 等定点数学函数。</p><ul><li><p><a href="https://arm-software.github.io/CMSIS-DSP/main/group__FIXED.html" target="_blank" rel="noreferrer">CMSIS-DSP fixed point datatypes</a></p></li><li><p><a href="https://www.ti.com/lit/pdf/sprc990" target="_blank" rel="noreferrer">TI C28x IQmath Library</a></p></li><li><p><a href="https://onlinedocs.microchip.com/oxy/GUID-9A1A39D4-F5A9-4AB5-89CC-20C51E2EECD5-en-US-2/GUID-3ED447D8-D99A-4C6B-8FC6-D18BFEA65B2B.html" target="_blank" rel="noreferrer">Microchip LibQ Fixed-Point Math Library</a></p></li></ul>`,34)])])}const _=a(r,[["render",d]]);export{u as __pageData,_ as default};
