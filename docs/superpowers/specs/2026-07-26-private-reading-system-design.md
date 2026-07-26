# 私密 TXT/EPUB 阅读系统设计规格

日期：2026-07-26
状态：草案，待用户评审
适用范围：Firefly Mod 知识博客目标 2（在目标 1 正式发布并完成线上验收后启动）
依赖前置：`docs/superpowers/specs/2026-07-24-firefly-migration-goal-decomposition-design.md`

## 1. 背景与目标

### 1.1 背景

目标 1 完成博客迁移与正式发布后，站点已在 GitHub Pages 稳定运行，已具备基于 Web Crypto API 的加密文章系统（AES-GCM + PBKDF2-SHA256，构建期加密、浏览器本地解密）。目标 2 在此基础上扩展为“私密阅读系统”：让站点所有者能够把个人 TXT/EPUB 长文本以加密形态部署到公开静态站点，仅在持有密钥的浏览器本地解密阅读，并满足超大文件分段渲染、章节目录、搜索、主题、字体与阅读进度等阅读器级体验。

### 1.2 核心目标

1. **隐私阅读**：内容必须以加密形态进入仓库与生成产物；密钥不得出现在仓库、CI、日志、构建报告或公开静态资源中；解密只在浏览器本地完成。
2. **长文本可用性**：支持超大 TXT（数百 MB 级）分段按需解密渲染；支持 EPUB 章节、目录、内部链接与图片。
3. **阅读体验**：提供主题（明/暗/护眼）、字体族与字号、阅读进度、章节跳转、全文搜索等阅读器基础能力。
4. **可发现性可控**：提供低可发现性入口，但明确声明“隐蔽入口不是安全机制”，安全性完全依赖加密与密钥持有。
5. **测试隔离**：使用 `E:\迅雷下载\txt` 与 `E:\迅雷下载\epub` 中的真实文件做本地压力测试，但测试文件路径、文件名、解密明文绝不进入仓库、构建产物或任何提交报告。

### 1.3 非目标（详见第 10 节排除项）

- 不实现云端书库、跨设备同步、用户账户。
- 不实现 DRM、水印追踪、社交分享。
- 不支持 PDF、CBZ、MOBI 等其他格式。
- 不实现 TTS 朗读、AI 摘要。

## 2. 目标与范围

### 2.1 包含范围

1. 构建期加密管线：读取本地原始 TXT/EPUB → 编码与结构解析 → 分段加密 → 输出加密 manifest 与密文分片。
2. 浏览器阅读器：私密书架、TXT 分段阅读器、EPUB 章节阅读器、目录、搜索、主题、字体、阅读进度。
3. 隐蔽入口与公开性矩阵扩展：新增 `private-reader` 可见性类型，不出现在导航、Sitemap、Pagefind、RSS、JSON-LD。
4. 安全扫描扩展：在 `scripts/security/scan-generated-output.ts` 中加入对私密阅读器密文与 manifest 的泄漏检测。
5. 本地压力测试隔离：通过未提交的本地配置文件指向真实测试目录，测试产物只写入 `env/`（已被 `.gitignore` 忽略）。
6. 质量门：单元测试、集成测试、E2E、安全扫描、视觉基线、规格与代码质量审查。

### 2.2 明确排除

- 不复制、不重命名、不压缩原始终端用户测试文件到仓库目录。
- 不在日志、构建报告、CI artifact、`reports/` 中输出测试文件路径或解密明文。
- 不把“隐蔽入口”写入安全声明，不依赖 URL 隐藏、特殊点击序列或秘密快捷键作为安全机制。
- 不在目标 2 中引入新的后端服务、Cloudflare 资源或动态接口。
- 不修改目标 1 已通过验收的现有加密 Markdown 文章行为（仅复用其加密原语与解密生命周期）。

## 3. 核心架构

### 3.1 总体分层

```
+----------------------------- 构建期（Node.js）-----------------------------+
|  本地原始文件（不进仓库）                                                  |
|        ↓  通过 scripts/private-reader/.local-paths.json（gitignore）       |
|  Encrypt 管线（scripts/kb/private-reader/）                                |
|    - TXT: 编码识别 → 转 UTF-8 → 段落边界切片 → 分段 AES-GCM 加密          |
|    - EPUB: yauzl 解压 → OPF/NCX 解析 → 章节 XHTML 独立 AES-GCM 加密       |
|        ↓                                                                  |
|  输出到 content/private-reader/[slug]/{manifest.json, *.bin}              |
+---------------------------------------------------------------------------+
        ↓ Astro 构建
+----------------------------- 生成产物（dist/）----------------------------+
|  /private-reader/[slug]/manifest.json   （加密 manifest，无明文）          |
|  /private-reader/[slug]/seg-0001.bin    （分块密文，base64 包装）          |
|  /private-reader/index.html             （书架壳，路由存在但不在导航）      |
|  /private-reader/[slug]/index.html     （阅读器壳，密码门在前）            |
+---------------------------------------------------------------------------+
        ↓ 浏览器
+----------------------------- 运行期（浏览器）------------------------------+
|  用户输入密码 → Web Crypto PBKDF2 派生 AES-GCM key                          |
|        ↓                                                                  |
|  按需 fetch manifest.json → fetch 当前可视段 seg-xxxx.bin → 解密 → 渲染     |
|        ↓                                                                  |
|  进度、主题、字体 → localStorage（按 book-slug 隔离）                       |
+---------------------------------------------------------------------------+
```

### 3.2 加密方案

#### 3.2.1 统一原语

复用现有加密文章系统的原语，并强制统一参数，消除当前 `EncryptedContent.astro`（100000 轮）与 `scripts/kb/encrypt/encrypt.ts`（210000 轮）的参数漂移：

- 算法：AES-256-GCM
- KDF：PBKDF2-HMAC-SHA256
- 迭代次数：210000 轮（与 `scripts/kb/encrypt/encrypt.ts` 一致，符合 OWASP 2023 推荐）
- Salt：每本书随机 16 字节（盐在整本书内共享，确保同一密码派生同一 key，避免每段都重做 21 万轮 PBKDF2）
- IV：每段独立 12 字节随机 IV（GCM 模式下同 key 绝不允许复用 IV）
- AuthTag：GCM 内置 16 字节认证标签

#### 3.2.2 TXT 分段加密

TXT 文件无法天然分章，采用“按字节边界 + 段落对齐”切片：

1. **编码识别**：用 BOM 启发式 + `TextDecoder` 试解码序列（UTF-8 → GB18030 → UTF-16LE/BE → Big5）确认最终编码，统一转 UTF-8 文本再切片。
2. **切片策略**：目标段大小 256 KiB（按 UTF-8 字节计）。从目标位置向前回溯到最近段落边界（`\n\n` 或 `\n`），避免切断段落；段大小硬上限 1 MiB，下限 64 KiB（末段除外）。
3. **分段加密**：每段独立 IV，输出独立密文分片。
4. **搜索索引**：构建期生成“分词 → 段落索引”倒排表，对分词做不可逆 hash（HMAC-SHA256，key = 书级派生 subkey）后存入 manifest，避免明文词汇进入产物；浏览器解密后用同一 subkey 重建可读索引用于搜索定位。

#### 3.2.3 EPUB 章节加密

EPUB 本质是 ZIP，含 OPF（package document，含 spine 顺序）与 NCX/Toc（目录）。按章节独立加密：

1. **解压与解析**：用现有依赖 `yauzl` 解压；解析 `META-INF/container.xml` → OPF 路径 → OPF（spine、manifest、metadata）→ TOC（EPUB2 NCX 或 EPUB3 nav.xhtml）。
2. **章节加密**：对 spine 中每个 XHTML 项独立 AES-GCM 加密（独立 IV），输出 `seg-xxxx.bin`。
3. **图片与资源**：EPUB 内图片等资源按两种策略二选一（构建配置开关，默认内联）：
   - **内联策略（默认）**：图片 base64 内联进对应章节密文前的 `assets.json` 段（加密），避免明文图片进入 `dist/`。
   - **独立加密策略**：图片单独加密为 `asset-xxxx.bin`，manifest 记录 `original-path → asset-id` 映射。
4. **目录与 spine 顺序**：写入 manifest，阅读器据此渲染目录与翻页。

### 3.3 文件格式

每本书在 `content/private-reader/[slug]/` 下生成以下文件，全部进入仓库与构建产物，但均不含明文：

#### 3.3.1 manifest.json

```jsonc
{
  "schema": "private-reader/v1",
  "kind": "txt" | "epub",
  "slug": "my-private-book",
  "title": "encrypted-base64",          // 标题本身加密，避免书名泄漏
  "author": "encrypted-base64" | null,   // 同上
  "crypto": {
    "algorithm": "AES-GCM",
    "kdf": "PBKDF2-SHA256",
    "iterations": 210000,
    "salt": "base64-16bytes"             // 全书共享 salt
  },
  "toc": [                               // EPUB 来自 NCX/nav；TXT 来自分章启发式或单章
    {
      "id": "ch-0001",
      "title": "encrypted-base64",       // 目录标题加密
      "segmentIndex": 0,
      "anchor": null                      // EPUB 章内锚点
    }
  ],
  "segments": [
    {
      "index": 0,
      "file": "seg-0000.bin",            // 相对 manifest 的路径
      "iv": "base64-12bytes",
      "bytes": 262144,                   // 密文字节数（含 authTag）
      "charHint": 0,                      // TXT: 段起始字符偏移；EPUB: 0
      "chapterId": "ch-0001"             // EPUB: 所属章节；TXT: null 或启发式章节
    }
  ],
  "search": {
    "indexHashKey": "base64",            // 重建倒排表用的 HMAC subkey（本身由主 key 派生后加密）
    "index": "encrypted-base64"          // 加密的倒排表（段索引 → token hash 列表）
  },
  "assets": {                            // EPUB only
    "ch-0001": ["asset-0000.bin"]
  },
  "reading": {
    "estimatedTimeMin": 120              // 来自 reading-time，仅时长不泄漏内容
  }
}
```

要点：
- `title`、`author`、`toc[].title` 全部加密，避免在公开产物中出现可读书名。
- `salt` 在整本书内共享，浏览器只需做一次 PBKDF2。
- `segments[].iv` 各自独立，确保 GCM 安全性。
- 搜索倒排表加密存储，浏览器解密后重建运行时索引，避免明文词频进入产物。

#### 3.3.2 密文分片 seg-xxxx.bin

- 编码：base64（便于通过 `fetch` 拉取 JSON 或文本资源；二进制 fetch 在 GitHub Pages 上同样可行，base64 兼容性更好且可走现有静态资源管道）。
- 内容：`ciphertext || authTag`（与现有 `scripts/kb/encrypt/encrypt.ts` 输出布局一致，便于复用解密工具链）。

### 3.4 阅读器架构

#### 3.4.1 路由

| 路由 | 用途 | 公开性 |
|------|------|--------|
| `/private-reader/` | 书架（列出所有私密书的加密卡片） | `private-reader`：HTML 生成，但不在导航/Sitemap/Pagefind/RSS |
| `/private-reader/[slug]/` | 阅读器壳（密码门 → 解密渲染） | 同上 |

路由不在任何导航组件、Sitemap、Pagefind 索引、RSS、JSON-LD 中出现；用户必须直接访问 URL 才能到达。隐蔽入口仅作为“降低被陌生人偶然发现的概率”，不构成安全层。

#### 3.4.2 组件树

```
src/components/private-reader/
  ├─ PrivateLibrary.astro         书架，渲染加密卡片
  ├─ PrivateReaderShell.astro     阅读器壳，承载密码门与解密后的内容
  ├─ PasswordGate.astro           密码输入与 PBKDF2 派生
  ├─ readers/
  │   ├─ TxtReader.svelte          TXT 分段阅读器（虚拟滚动 + 按需解密）
  │   ├─ EpubReader.svelte         EPUB 章节阅读器（章节切换 + 内部链接）
  │   └─ ReaderHost.astro          按 manifest.kind 切换
  ├─ controls/
  │   ├─ ThemeSwitch.svelte        主题切换（明/暗/护眼）
  │   ├─ FontControls.svelte       字体族、字号、行高、字距
  │   ├─ TableOfContents.svelte     目录抽屉
  │   ├─ ProgressBar.svelte         阅读进度
  │   └─ SearchPanel.svelte        全文搜索
  └─ progress/
      └─ ReadingProgressStore.ts   localStorage 读写封装
```

#### 3.4.3 解密生命周期

复用并扩展 `src/utils/encrypted-payload-controller.ts` 的模式：

1. `PasswordGate` 完成密码输入 → `crypto.subtle.importKey` + `deriveKey` 派生 AES-GCM key（仅一次 PBKDF2）。
2. 派生 key 与 subkey（用于搜索倒排表 HMAC）后，密码从内存中清除（保留派生 key 的 `CryptoKey` 句柄，不可导出）。
3. `TxtReader` / `EpubReader` 通过共享的 `ReaderKeyContext` 获取 key，按需 `fetch` + `decrypt` 段落。
4. 解密后的明文仅在内存中（Svelte 组件状态或 `Map<segmentIndex, string>`），不写入 `localStorage` / `sessionStorage` / `IndexedDB`；离开路由或切换书籍时清空。
5. Swup 切换时通过 `encrypted-payload-controller.ts` 已有的 `sync`/`dispose` 模式正确销毁，避免密钥句柄与明文残留。

## 4. 技术选型

### 4.1 TXT 分段读取

| 维度 | 选型 | 理由 |
|------|------|------|
| 编码识别 | `TextDecoder` 试解码序列 + BOM 启发式 | 浏览器与 Node 通用；不引入 `iconv` 等原生依赖 |
| 切片边界 | UTF-8 字节 256 KiB + 段落回溯 | 兼顾性能（单段解密 < 50ms）与阅读连续性（不切段落） |
| 虚拟渲染 | 自研轻量虚拟列表（IntersectionObserver） | 避免引入 `react-window`/`svelte-virtual-list` 等额外依赖；与现有 Swup 生命周期兼容 |
| 流式解密 | 不可行（AES-GCM 需完整 authTag） | 改为分段独立加密，按需解密整段 |
| 搜索 | 构建期倒排表 + 运行期 HMAC hash 匹配 | 不让明文词频进入产物；浏览器解密后重建可读索引 |

### 4.2 EPUB 解析库

| 候选 | 选择 | 理由 |
|------|------|------|
| `epubjs` | 否 | 体积大、DOM 强耦合、维护活跃度下降 |
| `@gxl/epub2` | 否 | Node 专用，浏览器不可用 |
| 现有 `yauzl` + 自研 OPF/NCX 解析 | **选** | `yauzl` 已在 `package.json`；EPUB 结构简单，自研解析可控且能精准控制加密边界 |
| `fast-xml-parser` | 备选 | 如自研解析负担过大，可引入解析 OPF/NCX |

图片处理：构建期内联为加密 base64（默认），运行期解密后用 `Blob URL` 加载，避免明文图片进入 `dist/`。

### 4.3 加密方案

| 维度 | 选型 | 理由 |
|------|------|------|
| 浏览器端 | `crypto.subtle`（Web Crypto API） | 与现有 `encrypted-payload-controller.ts` 一致；无需引入 `@noble/ciphers` |
| 构建期 | Node.js `crypto` | 与 `scripts/kb/encrypt/encrypt.ts` 一致 |
| 参数 | AES-256-GCM + PBKDF2-SHA256 210000 轮 | 与现有加密文章系统对齐，消除参数漂移 |
| 密钥派生 | 主 key 派生 subkey（HMAC）用于搜索 hash | 避免明文搜索索引；subkey 也加密存储 |

`@noble/ciphers`、`@noble/hashes` 已在依赖中但本系统不主动使用，避免维护两套加密栈。

### 4.4 HTML 清理

EPUB 章节解密后是 XHTML，注入 DOM 前必须清理（防 XSS，虽然内容来自站点所有者但防构建管线被污染）：

- 复用 `sanitize-html`（已在依赖），配置白名单标签与属性，剥离 `<script>`、`<iframe>`、事件属性、`javascript:` 链接。
- EPUB 内部链接（`href="#id"` 或 `href="chapter.xhtml"`）改写为阅读器内部跳转事件。

### 4.5 状态与进度

- 阅读进度：`localStorage`，key `private-reader:progress:[slug]`，value `{ segmentIndex, scrollRatio, updatedAt }`。
- 主题/字体偏好：`localStorage`，key `private-reader:prefs`，与站点明暗模式联动但独立存储阅读专用偏好。
- 不使用 `IndexedDB`（避免明文长期驻留）；不使用 `sessionStorage` 存密码（关闭即丢失进度恢复能力，体验差），改用派生 `CryptoKey` 句柄常驻内存（不可导出，刷新页面需重新输入密码，可接受）。

## 5. 安全模型

### 5.1 密钥管理

| 环节 | 处理 |
|------|------|
| 用户侧 | 密码由站点所有者个人持有，不通过任何电子渠道出现在仓库、文档、日志、构建报告或站点代码中 |
| 构建期 | 构建密码来自环境变量 `KB_READER_PASSWORD`（与现有 `KB_ENCRYPT_PASSWORD` 分离，便于不同书使用不同密码）。构建脚本读取后立即加密，不写入任何报告 |
| 仓库 | `.env`、`.env.local` 已在 `.gitignore`；新增 `scripts/private-reader/.local-paths.json` 也加入忽略 |
| CI | 构建期密码通过 GitHub Actions Secret 注入；构建产物不含密码；CI 日志不输出明文 |
| 浏览器 | 密码仅停留在用户输入与 `CryptoKey` 句柄中；`CryptoKey` 不可导出（`extractable: false`）；离开路由即销毁 |
| 进度数据 | `localStorage` 只存 `segmentIndex` 与 `scrollRatio`，不存密钥与明文 |

### 5.2 加密强度与边界

- **强度**：AES-256-GCM 提供机密性与完整性认证；PBKDF2-SHA256 210000 轮提供暴力破解阻力（按 OWASP 2023 推荐）。
- **IV 唯一性**：每段独立 12 字节随机 IV，绝不在同 key 下复用（GCM 复用 IV 直接破坏安全性）。
- **Salt 唯一性**：每本书独立 salt，防止跨书彩虹表。
- **完整性**：GCM authTag 防止密文被篡改；manifest 本身可被篡改但篡改会导致解密失败或渲染异常，不导致明文泄漏。

### 5.3 威胁模型

| 威胁 | 缓解 |
|------|------|
| 访问者知道 URL，无密钥 | 拿到的只是加密 manifest 与密文分片，无法得到正文 |
| 访问者从 GitHub 仓库克隆 | 仓库内无明文、无密钥、无本地路径配置 |
| 访问者从 GitHub Pages 下载产物 | 产物内只有加密 manifest 与密文分片 |
| 访问者从 CI 日志获取信息 | 构建脚本不输出明文、路径、密码；日志只输出段数与耗时 |
| 构建管线被注入恶意 EPUB | EPUB 解析限制最大章节数、最大解压体积（zip bomb 防护）；`sanitize-html` 清理解密后 XHTML |
| 密码强度弱 | 文档明确建议使用强密码；构建期不强制（避免在产物中暴露密码策略） |

### 5.4 安全声明

- **隐蔽入口不是安全机制**：`/private-reader/` 路由不进导航仅降低偶然发现概率；任何知道 URL 的访问者都能到达密码门，但无密码无法解密。
- **加密是唯一安全层**：所有安全性依赖 AES-256-GCM 与密码强度；不依赖 URL 隐藏、特殊点击序列、秘密快捷键、`robots.txt` 或前端混淆。
- **`robots.txt` 不屏蔽路由**：屏蔽反而暴露路径存在；让路由“既不被链接也不被屏蔽”，降低信息量。

## 6. UI/UX 设计

### 6.1 隐蔽入口

- `/private-reader/` 不出现在任何导航组件、首页、页脚。
- 不在 `robots.txt` 中声明（避免暴露路径存在）。
- 站点所有者通过直接输入 URL 到达书架。
- 书架卡片标题、作者均加密显示（占位符如 `🔒 ●●●●●●`），输入正确密码后才显示明文标题。
- 可选：在站点某处放置一个不显眼的图标（如页脚版权年份的特定字符），点击 5 次跳转到书架。**该机制仅降低可发现性，不构成安全层**，文档与代码注释均明确声明。

### 6.2 书架（PrivateLibrary）

- 网格布局，每张卡片：加密占位标题、加密占位作者、阅读进度条、上次阅读时间。
- 点击卡片 → 路由到 `/private-reader/[slug]/`。
- 卡片信息（标题、作者）加密存储在 manifest 中，书架页加载时无法显示明文；用户需先在卡片上输入该书密码（或全局统一密码）才能解密卡片信息并进入阅读。
- 设计原则：未解密时书架也“看起来像空壳”，避免通过卡片数量推断藏书规模。

### 6.3 阅读界面

- **TXT 阅读器**：单列长滚动 + 虚拟化；按需解密当前可视段及其前后各 1 段；滚动到段边界时预解密下一段。
- **EPUB 阅读器**：章节分页 + 章内滚动；左右键 / 滑动切换章节；章内 `href` 链接改写为内部跳转。
- **进度**：顶部细进度条（按段/章节比例）+ 底部百分比；切换章节或滚动停顿 500ms 后写入 `localStorage`。
- **目录**：左侧抽屉，可折叠；点击跳转并自动关闭抽屉。

### 6.4 主题与字体

| 控件 | 选项 |
|------|------|
| 主题 | 跟随站点 / 强制明亮 / 强制暗黑 / 护眼（米黄底） |
| 字体族 | 系统无衬线 / 系统衬线 / 思源宋体 / 思源黑体（按 `fontConfig` 复用站点字体子集） |
| 字号 | 14–22 px，步进 1 px |
| 行高 | 1.4–2.0，步进 0.1 |
| 字距 | -0.02em – 0.05em |
| 页边距 | 窄 / 中 / 宽 |

偏好存 `localStorage`，与站点明暗模式独立但可联动。

### 6.5 阅读进度

- 进度 = `segmentIndex / totalSegments`（TXT）或 `chapterIndex / totalChapters`（EPUB）。
- 重新打开同一书时自动滚动到上次位置。
- 进度条可点击跳转（按段/章粒度）。

## 7. 数据流

### 7.1 构建期

```
1. 站点所有者本地准备原始文件（E:\迅雷下载\txt\*.txt, E:\迅雷下载\epub\*.epub）
2. 站点所有者编辑 scripts/private-reader/.local-paths.json（gitignore）：
   {
     "books": [
       { "slug": "novel-01", "kind": "txt", "path": "E:\\迅雷下载\\txt\\xxx.txt" },
       { "slug": "tech-book", "kind": "epub", "path": "E:\\迅雷下载\\epub\\xxx.epub" }
     ]
   }
3. 运行 npm run private-reader:encrypt
   - 读取 .local-paths.json
   - 读取 KB_READER_PASSWORD（环境变量）
   - 对每本书执行分段加密（见 3.2.2 / 3.2.3）
   - 输出到 content/private-reader/[slug]/{manifest.json, seg-*.bin}
   - 日志只输出：slug、kind、段数、耗时；不输出路径、密码、明文
4. content/private-reader/ 进入仓库与 Astro 构建
5. Astro 构建生成 /private-reader/ 与 /private-reader/[slug]/ 静态路由
6. 部署到 GitHub Pages
```

### 7.2 部署

- `content/private-reader/` 的 manifest 与密文分片被 `scripts/astro/export-content.ts` 与构建管线视为 `private-reader` 可见性，生成静态 HTML 壳但不出现在任何公开索引。
- `scripts/security/scan-generated-output.ts` 扩展：扫描 `dist/private-reader/` 下不应出现明文（标题、作者、正文片段），只允许加密 base64。

### 7.3 浏览器解密阅读

```
1. 用户访问 /private-reader/[slug]/
2. PasswordGate 渲染密码输入框
3. 用户输入密码 → crypto.subtle.importKey + deriveKey（PBKDF2, salt from manifest）
   → 得到 AES-GCM key（extractable: false）+ 派生 subkey
4. ReaderHost 读 manifest.kind，挂载 TxtReader 或 EpubReader
5. 解密 manifest.title/author/toc 显示标题与目录
6. TxtReader: IntersectionObserver 监听滚动 → fetch 当前段 seg-xxxx.bin
   → crypto.subtle.decrypt(key, iv, ciphertext) → TextDecoder → 渲染
7. EpubReader: 按章节 fetch + 解密 + sanitize-html → 渲染
8. 进度写入 localStorage；离开路由时清空内存明文与 CryptoKey
```

## 8. 与现有系统的集成点

| 现有模块 | 复用方式 |
|---------|---------|
| `scripts/kb/encrypt/encrypt.ts` | 提取 PBKDF2 + AES-GCM 加密原语到 `scripts/kb/private-reader/crypto.ts`，统一参数为 210000 轮 |
| `src/utils/encrypted-payload-controller.ts` | 复用 `fromBase64`、`crypto.subtle` 解密模式；私密阅读器用独立 controller（`src/utils/private-reader-controller.ts`），但遵循相同的 Swup 生命周期与 dispose 模式 |
| `scripts/kb/domain/normalize-article.ts` 的 `VisibilityDecision` | 扩展 `Visibility` 类型新增 `'private-reader'`；其决策：`html=true, pagefind=false, sitemap=false, navigation=false, summary=false, attachments=false, encryptedPayload=true, jsonLd=false, publicSurface='placeholder'` |
| `scripts/astro/visibility-routes.ts` | 扩展支持 `private-reader` 类型，将其路由加入 `nonIndexablePostPaths` |
| `scripts/security/scan-generated-output.ts` | 扩展：扫描 `dist/private-reader/` 下文件，检测是否有明文（标题、作者、正文片段、原文件名）；检测 `.local-paths.json` 是否被误提交 |
| `.gitignore` | 新增 `scripts/private-reader/.local-paths.json` 与 `env/private-reader-stress/` |
| `package.json` scripts | 新增 `private-reader:encrypt`、`private-reader:stress`、`private-reader:clean` |
| Swup | 阅读器组件遵循现有 Swup containers 配置，切换路由时正确 dispose |
| 主题系统 | 复用站点明暗模式 `data-theme`，叠加阅读器专用护眼主题 |
| `reading-time` | 构建期估算每书阅读时长，仅写时长不写内容 |
| `sanitize-html` | EPUB 章节解密后清理 |

## 9. 测试与压力测试隔离

### 9.1 单元测试

- 加密原语：round-trip（加密 → 解密 → 比对原文）
- 编码识别：覆盖 UTF-8（含/不含 BOM）、GB18030、UTF-16LE/BE、Big5
- TXT 切片：段落边界对齐、段大小上下限
- EPUB 解析：OPF spine 顺序、NCX/nav 目录、zip bomb 防护
- 解密生命周期：Swup 切换时 dispose、CryptoKey 不可导出

### 9.2 集成测试

- 端到端构建：投入固定 fixture（`tests/fixtures/private-reader/sample.txt`、`sample.epub`，内容为合成 Lorem Ipsum，不涉及真实测试文件）→ 加密 → 构建 → 部署到 preview → Playwright 模拟输入密码 → 验证解密渲染
- 安全扫描：`npm run security:scan` 通过；`dist/private-reader/` 无明文泄漏

### 9.3 本地压力测试（隔离）

- 脚本：`npm run private-reader:stress`
- 输入：读取 `scripts/private-reader/.local-paths.json`（指向 `E:\迅雷下载\txt` 与 `E:\迅雷下载\epub`）
- 执行：对每个文件做加密 → 解密 → 渲染模拟，记录耗时、内存峰值、段数、失败
- 输出：只写入 `env/private-reader-stress/report.json`（`env/` 已被 `.gitignore`）
- 严格约束：
  - 不复制原文件到 `content/`、`dist/`、`reports/`、`public/`
  - 不在 stdout/stderr 输出原文件路径、文件名、明文片段
  - 不生成任何可提交的脱敏副本
  - CI 不运行此脚本（仅本机）
- 校验：`npm run security:scan` 在压力测试后必须仍通过（确认无残留泄漏）

### 9.4 视觉基线

- 阅读器壳、书架、TXT/EPUB 阅读界面、主题切换、字体控件在桌面/平板/移动端截图存入 `reports/visual-baseline/2026-07-26-private-reader/`（仅合成 fixture，不含真实内容）。

## 10. 排除项

本系统明确不实现以下功能，避免范围蔓延：

1. 云端书库与跨设备同步（无后端）。
2. 用户账户系统与权限管理。
3. DRM、水印追踪、版权保护。
4. PDF、CBZ、MOBI、AZW3 等其他格式。
5. TTS 朗读、AI 摘要、AI 问答。
6. 社交分享、笔记同步、划线导出。
7. 端到端加密的多人协作标注。
8. 离线 PWA 完整支持（不做 service worker 缓存策略，避免密文长期驻留客户端缓存难以清理）。
9. 隐蔽入口的安全属性（明确不作为安全机制）。
10. 修改目标 1 已验收的加密 Markdown 文章行为。

## 11. 完成标准

- **功能**：TXT（含 100 MB+ 超大文件）与 EPUB（含多章节、图片、内部链接）均能加密部署、浏览器解密阅读、分段按需加载、搜索、目录、主题、字体、进度全部可用。
- **安全**：`npm run security:scan` 与 `npm run test:hidden-production` 通过；`dist/private-reader/` 下无明文、无原文件名、无路径泄漏；`scripts/private-reader/.local-paths.json` 未被提交。
- **质量**：单元测试覆盖率 ≥ 80%（加密原语、编码、切片、EPUB 解析、解密生命周期）；E2E 覆盖密码输入、解密渲染、进度恢复、主题切换；规格审查与代码质量审查 `Critical = 0`、`Important = 0`。
- **隔离**：本地压力测试脚本运行后，`git status` 无新增可提交文件；`reports/` 无真实测试文件路径或明文。
- **文档**：本设计规格与对应实施计划通过用户评审；代码注释解释加密边界与安全声明。
- **集成**：与现有加密文章系统参数对齐（210000 轮）；公开性矩阵扩展不破坏现有 `public/hidden/private/encrypted` 行为。

## 12. 风险与缓解

| 风险 | 等级 | 缓解 |
|------|------|------|
| EPUB zip bomb | 中 | 构建期限制最大解压体积（默认 200 MB）与最大文件数（默认 5000）；超限拒绝加密 |
| 编码识别错误 | 中 | 多编码试解码 + 置信度评分；评分相近时记录到 manifest 供人工确认；提供 `--encoding` 强制覆盖 |
| 超大 TXT 内存峰值 | 高 | 流式读取（`fs.createReadStream`）+ 增量切片；浏览器端虚拟滚动 + 按需解密；单段上限 1 MiB |
| 浏览器 PBKDF2 阻塞主线程 | 中 | PBKDF2 在 Web Worker 中执行；派生期间显示加载态 |
| 密码遗忘 | 高（用户侧） | 文档明确警告；不提供找回机制（提供找回即破坏安全模型） |
| 搜索倒排表体积 | 中 | 默认对超长 TXT 关闭全文搜索（仅章节跳转）；可在 manifest 中按书开关 |
| GitHub Pages 单文件 25 MB 软限 | 低 | 段大小 256 KiB 远低于限制；单段独立请求 |
| Swup 切换时密钥残留 | 中 | 复用 `encrypted-payload-controller.ts` 的 dispose 模式；切换前清空 `CryptoKey` 与明文 Map |
| `.local-paths.json` 误提交 | 高 | 加入 `.gitignore`；`security:scan` 检测该文件是否被追踪 |
