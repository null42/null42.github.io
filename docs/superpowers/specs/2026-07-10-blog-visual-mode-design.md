# 博客双模式首页与媒体体验设计

日期：2026-07-10

## 当前方案简介

当前博客是 VitePress 个人知识库站点，首页以 `layout: page` 承载 Markdown 内容，主要由“知识地图卡片”和“推荐路线列表”组成。主题层位于 `.vitepress/theme/`，`Layout.vue` 包装 VitePress 默认布局，`style.css` 提供知识库卡片、文章列表、搜索筛选、表格、评论等样式，`kb-theme.ts` 集中输出少量主题变量。

现有方案的优点是克制、稳定、适合公共场合打开，也适合承载电源控制、电机控制、仿真和工程学习记录。它的问题是首页缺少个人博客的第一眼吸引力，视觉层次偏工具化，不能满足“在家打开时更好看、更有氛围”的需求。

新方案保留当前简洁形态作为默认模式，新增一个用户可切换的美化模式。美化模式提供沉浸式背景图、每日一图、手动下一张、以及本地音频播放器。简洁模式默认启用，且不主动加载大图和音频，保证公共场合打开时安全、清爽、低干扰。

## 目标

1. 默认进入网站为简洁模式，保留当前知识库气质。
2. 提供右上角模式切换按钮，在简洁模式和美化模式之间切换。
3. 美化模式首页展示背景图首屏，图片来自仓库内资源。
4. 美化模式支持“每日一图 + 手动下一张”。
5. 美化模式内置音乐播放器，音频同样来自仓库内资源。
6. 首页分区从当前平铺卡片升级为更清晰的博客结构。
7. 所有视觉资源集中配置，后续添加图片和音乐不需要改组件逻辑。

## 非目标

1. 不接入第三方在线图片、音乐或随机 API。
2. 不在简洁模式中自动播放或预加载音乐。
3. 不把所有文章页都改成沉浸式大图风格，本轮优先改首页体验。
4. 不引入大型播放器框架，除非后续确实需要歌词、播放列表同步或频谱动画。

## 参考设计来源

本方案的参考来源必须明确到具体设计决策，避免只写“参考某风格”却无法验收。

### 用户提供截图

1. 截图 1：简洁博客布局参考。

   来源：本地临时截图（已匿名化）。

   提取的设计点：

   - 顶部导航保持横向、轻量、可快速进入主要栏目。
   - 首页内容以个人信息、统计、最近更新、记录入口分区。
   - 公共场合可接受，信息密度高，不依赖大图。

   本方案对应实现：

   - 简洁模式继续作为默认入口。
   - 首页正文保留学习地图、推荐路线、搜索、文章库、工具等工作型入口。
   - 美化功能通过显式切换开启，不影响默认页面观感。

2. 截图 2：沉浸式博客首屏参考。

   来源：本地临时截图（已匿名化）。

   提取的设计点：

   - 背景图占据第一视觉层，导航覆盖在图片之上。
   - 大标题和短介绍作为个人站点识别核心。
   - 右侧或角落保留小型控制区。

   本方案对应实现：

   - 美化模式首页增加全宽 Hero 背景图。
   - Hero 使用遮罩保证文字可读，不直接照搬视频站控件和水印。
   - 图片切换按钮和音乐播放器保持小体积，避免压住正文。

3. 截图 3：全屏氛围图与中心文案参考。

   来源：本地临时截图（已匿名化）。

   提取的设计点：

   - 大图可以承担情绪氛围，但文案需要保持简短。
   - 图像焦点位置需要可配置，否则人物或主体容易被标题遮挡。
   - 切换和返回顶部等浮动按钮需要避开主要视觉中心。

   本方案对应实现：

   - 每张图配置 `position`，用于控制 CSS `background-position`。
   - Hero 文案不超过标题、短句和两个入口按钮。
   - 浮动播放器在移动端默认折叠。

### 当前站点与代码

1. 当前首页 `index.md`。

   提取的设计点：

   - 首页已经有“学习地图”和“推荐路线”两类核心内容。
   - 站点定位是知识库，不是纯展示型个人主页。

   本方案对应实现：

   - 不删除现有知识库入口，而是在美化 Hero 之后重组分区。
   - 首页改造以“更好进入内容”为目标，不只追求封面视觉。

2. 当前主题 `.vitepress/theme/Layout.vue`、`.vitepress/theme/style.css`、`.vitepress/theme/kb-theme.ts`。

   提取的设计点：

   - 当前主题已通过 `kbThemeConfig` 和 CSS 变量集中管理视觉参数。
   - 布局层已经包装 VitePress 默认主题，适合继续在 Layout 层接入全局组件。

   本方案对应实现：

   - 新增图库、音乐、模式存储 key 仍放在 `kb-theme.ts`。
   - `VisualModeToggle`、`HomeVisualHero`、`LocalMusicPlayer` 通过 `Layout.vue` 接入。

### 官方文档与开源参考

1. VitePress 默认主题扩展文档。

   来源：[VitePress Extending the Default Theme](https://vitepress.dev/guide/extending-default-theme)。

   提取的设计点：

   - 继续继承默认主题，而不是重写整套布局。
   - 通过自定义 `Layout.vue` 包装默认 Layout，向页面追加全局组件。

   本方案对应实现：

   - 保留 `DefaultTheme.Layout`。
   - 只在主题层插入模式切换、首页 Hero 和播放器。

2. VitePress 默认主题首页能力。

   来源：[VitePress Default Theme: Home Page](https://vitepress.dev/reference/default-theme-home-page)。

   提取的设计点：

   - 首页 Hero、行动按钮和 Feature 区是 VitePress 推荐的信息架构。
   - 当前项目因为已经使用 Markdown 自定义首页，所以不强制迁移到默认 `layout: home`。

   本方案对应实现：

   - 借鉴 Hero + actions + feature sections 的结构。
   - 保持 `layout: page`，减少迁移风险。

3. APlayer 开源播放器。

   来源：[APlayer GitHub](https://github.com/DIYgod/APlayer)。

   提取的设计点：

   - 小型音乐播放器通常需要播放/暂停、曲目信息、进度、音量、播放列表控制。
   - 播放器应该是一个独立组件，避免把音频逻辑塞进首页。

   本方案对应实现：

   - 初版不用 APlayer 作为依赖，采用原生 `<audio>` 和自定义控件。
   - 控件范围参考 APlayer 的基础能力，但去掉歌词、在线源和复杂皮肤。

4. MDN HTMLMediaElement 与 autoplay 指南。

   来源：[MDN HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)，[MDN Autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)。

   提取的设计点：

   - 浏览器对自动播放有限制，带声音音频需要用户主动交互。
   - 音频状态、加载错误、进度和音量应由媒体元素事件驱动。

   本方案对应实现：

   - 音乐默认不自动播放。
   - 播放、暂停、进度、音量、错误状态均围绕 `<audio>` 事件实现。

5. MDN Web Storage。

   来源：[MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)。

   提取的设计点：

   - 用户偏好适合存入浏览器本地存储。
   - SSR 阶段不能直接访问 `localStorage`。

   本方案对应实现：

   - 视觉模式、手动图片偏移、播放器音量和折叠状态写入 `localStorage`。
   - 所有浏览器 API 访问都放在客户端生命周期中。

## 用户体验

### 简洁模式

简洁模式是默认模式。页面保持浅色、信息优先、卡片规整。顶部导航中增加一个模式切换按钮，按钮文案或图标表达当前状态，例如“简洁”或一个低调图标。

简洁模式不展示首页 Hero 背景图，不展示固定音乐播放器，不主动创建音频对象。用户在学校、公司、公共场合打开博客时，不会出现尴尬的大图或声音。

### 美化模式

美化模式保留顶部导航，但首页首屏增加沉浸式 Hero：

- 背景图铺满首屏可视区域的一部分。
- 覆盖深色或柔和遮罩，保证标题可读。
- 显示站点标题、短介绍、主入口按钮。
- 右下角或 Hero 控制区提供“下一张”按钮。
- 页面固定角落提供小型音乐播放器。

首屏之后进入知识库内容区，包括学习地图、推荐路线、最近更新和快速入口。这样美化版不会只剩“漂亮封面”，仍然能回到学习与检索。

## 首页信息架构

首页拆成四段：

1. 美化 Hero

   只在美化模式展示。包含背景图、站点标题、简介、主行动按钮和图片切换按钮。

2. 学习地图

   承接现有 `kb-home-map`。保留电机控制、电源控制、Matlab/Simulink、文章库等入口，但视觉上调整为主次更明确的网格。

3. 推荐路线

   保留现有推荐路线内容，改为更紧凑的列表或横向路线卡片。重点突出“电控入门线”“FOC 算法线”“电源工程线”“Matlab/Simulink 仿真线”。

4. 快速入口与最近更新

   放搜索、文章库、工具、加密演示等入口。初版最近更新使用静态入口；当站点已有可复用生成数据时，再接入真实文章列表。

## 配置设计

在 `.vitepress/theme/kb-theme.ts` 中扩展主题配置：

```ts
export const kbThemeConfig = {
  // existing fields...
  visualMode: {
    storageKey: 'kb-visual-mode',
    defaultMode: 'simple',
    dailySeedKey: 'kb-home-daily-image',
    gallery: [
      {
        src: '/images/home/home-01.svg',
        alt: '抽象学习空间背景',
        position: 'center',
        theme: 'dark'
      }
    ],
    music: [
      {
        title: '夜间学习',
        artist: 'local',
        src: '/audio/night-study.mp3'
      }
    ]
  }
}
```

图片与音频都只存路径和元数据。组件从配置读取列表，不把资源写死在 CSS 或模板里。

## 资源目录

新增资源目录：

```text
public/
  images/
    home/
      home-01.svg
      home-02.svg
      home-03.svg
  audio/
    README.md
```

初版放 3 张轻量默认占位图，资源格式使用本地 SVG 或压缩后的 WebP。音频目录放 README，说明支持的格式和命名方式；真实音乐文件由用户放入仓库后通过配置启用。

配置里没有可发布的真实音乐文件时，初版播放器隐藏，避免构建依赖不存在的音频路径，也避免引入版权不明的示例音频。

## 每日一图逻辑

每日一图不需要后端。客户端根据本地日期和图库长度计算索引：

1. 取当前本地日期，格式为 `YYYY-MM-DD`。
2. 将日期字符串转换为稳定数字哈希。
3. 用 `hash % gallery.length` 得到当天图片索引。
4. 用户点击“下一张”时，在当天索引基础上叠加手动偏移量。
5. 手动偏移量写入 `localStorage`，避免刷新后马上跳回。

这样同一天默认图片稳定，第二天自动变化，用户仍能临时手动切换。

边界处理：

- `gallery.length === 0` 时不渲染 Hero 背景。
- 图片加载失败时切换到 CSS 渐变背景，并记录可见但不刺眼的状态。
- SSR 阶段不访问 `window` 或 `localStorage`，只在 `mounted` 后读取。

## 音乐播放器设计

播放器只在美化模式下显示。初版采用原生 `<audio>`，外面包一层自定义小控件：

- 播放/暂停。
- 曲目标题。
- 上一首/下一首。
- 音量滑块或静音按钮。
- 播放进度条。
- 折叠按钮。

默认不自动播放。用户必须主动点击播放，符合浏览器自动播放限制，也避免公共场合误出声。播放状态和音量可写入 `localStorage`：

- `kb-music-volume`
- `kb-music-track`
- `kb-music-collapsed`

如果配置中没有曲目，播放器不显示。音频加载失败时跳过当前曲目并显示短暂错误状态。

## 组件设计

新增三个组件：

1. `VisualModeToggle.vue`

   负责显示模式切换按钮，读写 `localStorage`，并将当前模式同步到 `document.documentElement.dataset.visualMode`。

2. `HomeVisualHero.vue`

   只在首页和美化模式下渲染。负责每日一图、手动下一张、背景图加载状态和 Hero 内容。

3. `LocalMusicPlayer.vue`

   只在美化模式下渲染。负责播放列表、播放状态、音量、进度条和错误处理。

`Layout.vue` 负责接入这些组件，并通过 `useData()` 判断当前页面是否为首页。

## 状态与数据流

1. 页面加载时，`VisualModeToggle` 读取 `localStorage['kb-visual-mode']`。
2. 未设置时默认 `simple`。
3. 切换为 `visual` 后，根节点添加 `data-visual-mode="visual"`。
4. 首页检测到美化模式后渲染 `HomeVisualHero`。
5. `HomeVisualHero` 从 `kbThemeConfig.visualMode.gallery` 读取图库，计算今日图片。
6. `LocalMusicPlayer` 从 `kbThemeConfig.visualMode.music` 读取音频列表。

组件之间不需要复杂全局状态。可使用一个轻量 composable，例如 `useVisualMode.ts`，封装模式状态和 DOM 同步。

## 样式设计

样式仍放在 `.vitepress/theme/style.css`，避免为一次首页改造引入额外 CSS 框架。

新增样式命名：

- `.kb-mode-toggle`
- `.kb-home-hero`
- `.kb-home-hero-media`
- `.kb-home-hero-content`
- `.kb-home-hero-actions`
- `.kb-hero-next`
- `.kb-music-player`
- `.kb-music-player.is-collapsed`

颜色上不要变成单一紫蓝或纯黑主题。美化模式的遮罩用中性色，按钮和状态沿用现有品牌蓝、青绿色和少量暖色。

## 可访问性与公共场合安全

1. 简洁模式默认，不出现大图和音乐。
2. 音乐必须手动播放。
3. 播放按钮、下一张按钮、模式切换按钮都有可读 `aria-label`。
4. 背景图有 `alt` 元数据，但作为 CSS 背景时主要依靠 Hero 文案表达内容。
5. `prefers-reduced-motion` 下禁用大幅动画。
6. 移动端播放器默认折叠，避免遮挡阅读。

## 性能

1. 简洁模式不渲染 Hero，不加载图库背景。
2. 美化模式只加载当前背景图，可预加载下一张但不预加载全部。
3. 默认占位图优先使用 SVG 或压缩 WebP。
4. 音频不自动预加载全部曲目，`audio.preload` 使用 `metadata`。
5. 组件只在客户端访问浏览器 API，避免 VitePress 构建时报错。

## 错误处理

1. `localStorage` 不可用时，回退到简洁模式。
2. 图库为空时隐藏 Hero 的图片控制。
3. 图片加载失败时显示纯色渐变背景。
4. 音频加载失败时跳过或停留，并显示短提示。
5. 当前曲目索引越界时回到第一首。

## 测试方案

1. 单元测试

   为每日一图索引、手动偏移、空图库、曲目索引边界写测试。

2. 构建测试

   运行 `npm run build`，确认 VitePress SSR 不因 `window`、`document`、`localStorage` 报错。

3. 浏览器验证

   用本地预览检查：

   - 默认打开是简洁模式。
   - 切到美化模式后出现 Hero 背景。
   - 下一张按钮可切换图片。
   - 刷新后模式保持。
   - 音乐播放器默认不播放。
   - 点击播放后能播放仓库音频。
   - 移动端不遮挡主要内容。

4. 回归测试

   运行现有 `npm test`，确认搜索、归档、渲染、加密文章相关功能不受影响。

## 预期效果验收标准

验收以本节为准。实现完成后，必须逐条验证。

### 模式与默认行为

1. AC-01：首次打开首页时，站点处于简洁模式。
2. AC-02：简洁模式首页不显示大图 Hero。
3. AC-03：简洁模式不渲染音乐播放器，不创建可见音频控件。
4. AC-04：点击模式切换按钮后进入美化模式，并写入 `localStorage['kb-visual-mode']`。
5. AC-05：刷新页面后保持上一次选择的模式。
6. AC-06：清空站点 localStorage 后重新打开，回到简洁模式。

### 美化 Hero

1. AC-07：美化模式首页首屏出现全宽背景图 Hero。
2. AC-08：Hero 标题、简介和两个主入口按钮在桌面与移动端都清晰可读。
3. AC-09：背景图使用配置中的 `src` 和 `position`，不同图片可以设置不同焦点位置。
4. AC-10：每日一图在同一自然日内刷新不变。
5. AC-11：日期变化后，每日一图可以根据日期哈希切换到另一张图。
6. AC-12：点击“下一张”后图片切换到图库下一项。
7. AC-13：点击“下一张”后的偏移刷新后仍保留。
8. AC-14：图库为空时不报错，首页仍能正常显示知识库内容。
9. AC-15：图片加载失败时显示备用渐变背景，不出现破图图标或空白首屏。

### 首页分区

1. AC-16：首页在简洁模式下仍能看到学习地图和推荐路线。
2. AC-17：首页在美化模式下 Hero 之后仍能进入学习地图、推荐路线、快速入口与最近更新区。
3. AC-18：电机控制、电源控制、Matlab/Simulink、搜索、文章库、工具入口都可访问。
4. AC-19：移动端所有卡片和按钮文字不溢出，不互相遮挡。
5. AC-20：页面不出现卡片套卡片的装饰性嵌套。

### 音乐播放器

1. AC-21：播放器只在美化模式且配置存在曲目时显示。
2. AC-22：播放器默认不自动播放。
3. AC-23：用户点击播放后，当前仓库音频可以播放。
4. AC-24：播放/暂停按钮状态与真实音频状态一致。
5. AC-25：上一首/下一首在曲目列表中循环切换。
6. AC-26：进度条随播放时间更新，拖动进度条可以 seek。
7. AC-27：音量设置写入 `localStorage['kb-music-volume']`，刷新后保留。
8. AC-28：移动端播放器默认折叠或占用极小空间，不遮挡首页主要按钮。
9. AC-29：音频加载失败时出现短错误状态，页面不崩溃。

### 资源与配置

1. AC-30：背景图片只从 `kbThemeConfig.visualMode.gallery` 读取。
2. AC-31：音乐文件只从 `kbThemeConfig.visualMode.music` 读取。
3. AC-32：新增图片只需要放入 `public/images/home/` 并更新配置。
4. AC-33：新增音频只需要放入 `public/audio/` 并更新配置。
5. AC-34：简洁模式下不主动请求图库大图和音频文件。

### 技术与构建

1. AC-35：`npm test` 通过。
2. AC-36：`npm run build` 通过。
3. AC-37：构建过程中不出现 `window is not defined`、`document is not defined`、`localStorage is not defined`。
4. AC-38：VitePress 默认导航、侧边栏、搜索页、归档页、文章页不因本功能回归。
5. AC-39：美化模式 CSS 不影响普通文章阅读宽度和代码块横向滚动。

### 视觉验收

1. AC-40：桌面 1440px 宽度下，美化 Hero 背景非空、非拉伸变形、标题不压住主要视觉主体。
2. AC-41：移动端 390px 宽度下，标题、按钮、下一张按钮和播放器不互相遮挡。
3. AC-42：`prefers-reduced-motion` 下禁用明显动画。
4. AC-43：浅色和深色系统主题下文字对比度保持可读。
5. AC-44：美化模式可以让首页第一眼接近用户截图 2、3 的沉浸感，但不复制第三方站点水印、品牌和视频控件。

## 实施顺序

1. 扩展 `kb-theme.ts` 配置，加入 `visualMode.gallery` 和 `visualMode.music`。
2. 添加默认图库资源和音频目录说明。
3. 新增 `useVisualMode.ts`。
4. 新增 `VisualModeToggle.vue` 并接入 `Layout.vue`。
5. 新增 `HomeVisualHero.vue`，只在首页和美化模式显示。
6. 新增 `LocalMusicPlayer.vue`，只在美化模式显示。
7. 调整 `index.md` 首页分区，使 Hero 之后的内容更清晰。
8. 增补 CSS。
9. 增补测试并跑构建。
10. 用浏览器进行桌面和移动端视觉验证。

## 默认决策

1. 首批背景图使用仓库内可替换占位图，用户之后可继续添加喜欢的图片。
2. 音乐播放器逻辑纳入初版；真实音乐文件只从仓库 `public/audio/` 读取，配置为空时隐藏播放器。
3. 模式切换按钮放在导航右侧，更像站点设置，也避免遮挡正文。
