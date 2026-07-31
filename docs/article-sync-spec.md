# 文章同步推送规范

> 本文档定义从外部来源（`<SOURCE_ROOT>/电源` 与 `<SOURCE_ROOT>/MotorControl-main`）到博客 `content/` 目录的同步规则。
> 最后更新：2026-07-31

## 1. 外部来源概览

> 外部来源根目录：本地 `<SOURCE_ROOT>/`（电源与电机控制学习资料库）

### 1.1 电源目录 `<SOURCE_ROOT>/电源`

| 子目录 | 内容类型 | 文件格式 | 推送策略 |
|--------|---------|---------|---------|
| `archive/old-learning-records/` | UPS 学习记录（26篇） | .md | ✅ 已全部同步 |
| `archive/old-lessons/` | 旧课程 HTML | .html | ❌ 不推送（历史归档） |
| `courses/125kva-ups-14-week/archive/` | 课程多版本归档 | .html | ❌ 不推送（中间产物） |
| `courses/125kva-ups-14-week/content/lessons/` | 正式课程 | .html | ⚠️ 需转 md 后推送 |
| `courses/125kva-ups-14-week/final/` | 最终报告（4篇） | .md | ✅ 推送 |
| `courses/125kva-ups-14-week/learning-records/` | 学习记录 | .md | ⚠️ 评估后推送 |
| `courses/125kva-ups-14-week/lessons/` | 课程 | .html | ⚠️ 需转 md 后推送 |
| `courses/125kva-ups-14-week/projects/f28075-control/` | C 代码项目 | .c/.h | ❌ 不推送（代码项目） |
| `courses/ups-control-foundation/concepts/` | 概念说明 | .md | ✅ 推送 |
| `courses/125kva-ups-14-week/*.md` | 项目文档 | .md | ⚠️ 评估后推送（MISSION/README等） |

### 1.2 MotorControl-main 目录 `<SOURCE_ROOT>/MotorControl-main`

| 子目录 | 内容类型 | 文件格式 | 推送策略 |
|--------|---------|---------|---------|
| `Controllers-from-PID-to-QP_MPC-main/` | 控制器教程 | .md | ✅ 推送（anti_windup.md, questions.md 等） |
| `lxfoc/` | FOC 代码库 | .c/.h | ❌ 不推送（代码库） |
| `lxfoc/*.md` | FOC 特性文档 | .md | ⚠️ 评估后推送（FEATURES.md） |
| `motor-control-knowledge-base/` | 知识库 | .md | ✅ 推送（按分类映射到 content/motor/） |
| `motor-learning-web/` | Web 应用 | .vue/.ts/.py | ❌ 不推送（应用代码） |
| `personal-knowledge-base/` | 个人知识库 | .vue/.ts/.py | ❌ 不推送（应用代码） |
| `伺服/012_安川7_yaskawa7/` | 安川伺服解析（13篇） | .md | ✅ 推送 |
| `伺服/D013_汇川MD380代码讲解/` | 汇川解析 | .pdf | ❌ 不推送（PDF 放书架） |
| `伺服/*.md` | 伺服总结报告 | .md | ✅ 推送 |
| `成熟代码参考/` | 代码参考 | .c/.h | ❌ 不推送（代码库） |
| `成熟代码参考/*/*.md` | 代码集成指南 | .md | ⚠️ 评估后推送 |
| `scripts/` | 检查脚本 | .py | ❌ 不推送（工具脚本） |
| `tests/` | 测试代码 | .py | ❌ 不推送（测试代码） |

## 2. 推送规则

### 2.1 包含规则（推送）

满足以下条件的文件推送：

1. **格式**：`.md` 文件（Markdown）
2. **内容**：技术文档、学习笔记、教程、分析报告
3. **完整性**：有完整正文内容（非纯占位/空文件）
4. **独立性**：可作为独立文章阅读（非配置片段）

### 2.2 排除规则（不推送）

以下文件不推送：

1. **代码文件**：`.c`, `.h`, `.py`, `.js`, `.ts`, `.vue`, `.java` 等
2. **二进制文件**：`.exe`, `.hex`, `.bin`, `.o`, `.a`, `.lib`
3. **PDF 文件**：放公开书架 `public/pdfs/`，不作为文章
4. **HTML 文件**：需先转换为 Markdown 再评估
5. **配置文件**：`package.json`, `CMakeLists.txt`, `tsconfig.json`, `.gitignore` 等
6. **构建产物**：`dist/`, `build/`, `node_modules/`
7. **临时文件**：`.tmp_*`, `test*.txt`, 调试脚本
8. **元数据文件**：`MISSION.md`, `NOTES.md`, `RESOURCES.md`（项目内部文档，非技术文章）
9. **README.md**：仅作为目录索引的 README 不推送，除非有实质技术内容

### 2.3 特殊处理

- **HTML → Markdown 转换**：`courses/125kva-ups-14-week/lessons/*.html` 等需用工具转换后推送
- **PDF 文件**：放 `public/pdfs/` 公开书架，不进入 `content/`
- **重复内容**：以外部来源为准，覆盖博客旧版本

## 3. 目标路径映射

### 3.1 电源内容 → `content/power/`

| 外部路径 | 博客目标路径 | 分类 |
|---------|------------|------|
| `电源/archive/old-learning-records/*.md` | `content/power/archive/old-learning-records/` | 历史记录（已同步） |
| `电源/courses/125kva-ups-14-week/final/*.md` | `content/power/projects/ups-125kva/` | 项目报告 |
| `电源/courses/ups-control-foundation/concepts/**/*.md` | `content/power/concepts/` | 概念说明 |

### 3.2 MotorControl 内容 → `content/motor/`

| 外部路径 | 博客目标路径 | 分类 |
|---------|------------|------|
| `MotorControl-main/Controllers-from-PID-to-QP_MPC-main/*.md` | `content/motor/controllers-evolution/` | 控制器演进 |
| `MotorControl-main/motor-control-knowledge-base/motion-control/*.md` | `content/motor/motion-control/` | 运动控制 |
| `MotorControl-main/motor-control-knowledge-base/control-theory/*.md` | `content/motor/control-theory/` | 控制理论 |
| `MotorControl-main/motor-control-knowledge-base/electronics-basics/*.md` | `content/motor/electronics-basics/` | 电子基础 |
| `MotorControl-main/motor-control-knowledge-base/hardware/*.md` | `content/motor/hardware/` | 硬件 |
| `MotorControl-main/motor-control-knowledge-base/power-path/*.md` | `content/motor/power-path/` | 功率路径 |
| `MotorControl-main/motor-control-knowledge-base/algorithms/**/*.md` | `content/motor/algorithm/` | 算法 |
| `MotorControl-main/伺服/012_安川7_yaskawa7/*.md` | `content/motor/servo-analysis/yaskawa-sigma7/` | 伺服解析 |
| `MotorControl-main/伺服/安川7代码解析总结报告.md` | `content/motor/servo-analysis/` | 伺服总结 |
| `MotorControl-main/伺服/汇川MD380代码解析总结报告.md` | `content/motor/servo-analysis/` | 伺服总结 |

## 4. Frontmatter 规范

同步时需为每篇文章添加/补全 frontmatter：

```yaml
---
date: 2026-XX-XX           # 文章日期（从文件内容或修改时间推断）
category: 分类名            # 中文分类名
source: power              # 来源：power / motor
visibility: public         # 可见性：public / hidden / private / encrypted
title: "文章标题"           # 文章标题
tags:                      # 标签列表
  - tag1
  - tag2
status: learning           # 状态：learning / completed / reference
summary: "摘要"            # 简短摘要
section: 电机控制           # 板块名
chapter: 分类               # 章节名
chapterTitle: 中文章节名
chapterOrder: N            # 章节排序
---
```

### 4.1 必填字段

- `title`: 文章标题
- `date`: 发布日期
- `category`: 分类
- `visibility`: 可见性（默认 `public`）
- `source`: 来源标记

### 4.2 自动补全字段

由 `export-content.ts` 脚本自动生成：
- `sectionId`, `sectionTitle`
- `routeId`, `routeTitle`
- `stageId`, `stageTitle`
- `articleId`
- `order`

## 5. 同步流程

```
外部来源 (<SOURCE_ROOT>/)
    │
    ▼ ① 手动筛选 + 复制 .md 文件
content/ (博客原始内容目录)
    │
    ▼ ② 运行 npm run export:content
src/content/posts/ (Astro 构建用内容)
    │
    ▼ ③ 运行 npm run build
dist/ (构建产物)
```

### 5.1 同步步骤

1. **筛选**：按本规范第2节规则，从外部来源挑选 .md 文件
2. **复制**：将选中的文件复制到 `content/` 对应目录（见第3节映射）
3. **补全 frontmatter**：确保每篇文章有完整 frontmatter（见第4节）
4. **导出**：运行 `npm run export:content` 同步到 `src/content/posts/`
5. **构建**：运行 `npm run build` 验证
6. **提交**：git commit + push 触发 CI/CD

### 5.2 冲突处理

- **文件名冲突**：保留外部来源版本（覆盖）
- **frontmatter 冲突**：以外部来源为准，但保留博客特有的分类字段
- **内容冲突**：以外部来源为准

## 6. 待同步清单（首次评估）

以下为初步评估的待同步内容，实际推送前需逐篇确认：

### 6.1 电源（高优先级）

- [ ] `电源/courses/125kva-ups-14-week/final/125kva-ups-final-report.md`
- [ ] `电源/courses/125kva-ups-14-week/final/fault-injection-report.md`
- [ ] `电源/courses/125kva-ups-14-week/final/model-consistency-report.md`
- [ ] `电源/courses/125kva-ups-14-week/final/oral-defense-question-bank.md`
- [ ] `电源/courses/ups-control-foundation/concepts/power-electronics/*.md`（需扫描确认数量）

### 6.2 MotorControl（高优先级）

- [ ] `MotorControl-main/Controllers-from-PID-to-QP_MPC-main/anti_windup.md`
- [ ] `MotorControl-main/Controllers-from-PID-to-QP_MPC-main/questions.md`
- [ ] `MotorControl-main/motor-control-knowledge-base/**/*.md`（需对比现有 content/motor/ 去重）
- [ ] `MotorControl-main/伺服/012_安川7_yaskawa7/*.md`（13篇）
- [ ] `MotorControl-main/伺服/安川7代码解析总结报告.md`
- [ ] `MotorControl-main/伺服/汇川MD380代码解析总结报告.md`

### 6.3 需转换（低优先级）

- [ ] `电源/courses/125kva-ups-14-week/lessons/*.html` → 转 md 后推送
- [ ] `电源/courses/125kva-ups-14-week/content/lessons/*.html` → 转 md 后推送

## 7. 质量检查

同步后需检查：

1. **frontmatter 完整性**：所有必填字段已填写
2. **链接有效性**：内部链接指向正确路径
3. **图片资源**：引用的图片已复制到 `public/` 或 `content/` 对应位置
4. **构建通过**：`npm run build` 无错误
5. **页面渲染**：抽样检查页面渲染正常
