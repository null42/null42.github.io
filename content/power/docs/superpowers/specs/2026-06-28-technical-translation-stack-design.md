---
date: 2026-06-28
category: 电源控制
source: power
visibility: public
title: Technical Translation Stack Design
tags:
  - power-electronics
status: learning
summary: Build a reusable local production pipeline for English-to-Chinese technical document translation. The first validation source is `E:\文档\Fundamentals of Power El
---

# Technical Translation Stack Design

## Goal

Build a reusable local production pipeline for English-to-Chinese technical document translation. The first validation source is `E:\文档\Fundamentals of Power Electronics 3rd Edition.pdf`, but the design must generalize to other technical books, papers, data sheets, and long PDFs.

The pipeline must produce two complementary outputs:

- A layout-preserved PDF translation using PDFMathTranslate-next/BabelDOC where possible.
- A polished Chinese reflowed edition with traceable glossary, prompts, chunks, review records, table of contents, and PDF bookmarks.

The existing `translating-technical-literature` Codex skill must absorb improvements discovered during implementation and become the preferred control interface for this stack.

## Non-Goals

- Do not hard-code behavior for `Fundamentals of Power Electronics`.
- Do not rely on low-quality machine rough translation followed by polishing.
- Do not require Zotero as the main runtime.
- Do not make GUI usage the only path; CLI and local API must remain available.

## Directory Layout

Root:

```text
E:\software\technical-translation-stack
```

Structure:

```text
technical-translation-stack/
  repos/
    PDFMathTranslate-next/
    PDFMathTranslate/
    BabelDOC/
  envs/
    pdfmathtranslate/
    pipeline/
  configs/
    providers.yaml
    profiles/
      power-electronics.yaml
      control-theory.yaml
      signal-processing.yaml
    prompts/
      translate-chunk.v1.md
      extract-glossary.v1.md
      review-translation.v1.md
  projects/
    fundamentals-power-electronics-3e/
      source/
      outline/
      chunks/
      bilingual/
      polished-cn/
      layout-preserved/
      rendered/
      logs/
      cache/
      reports/
  service/
    technical_translation_api/
  cli/
    translate_book.py
```

`E:\software` owns tools, environments, project state, logs, and outputs. The Codex skill owns workflow knowledge, invocation rules, and quality gates.

## Architecture

Use a dual-track pipeline.

### Track A: Layout-Preserved Translation

Default backend: PDFMathTranslate-next, using BabelDOC internally.

Responsibilities:

- Preserve original PDF layout, figures, tables, formulas, and visual structure as much as possible.
- Produce Chinese and optional bilingual PDF outputs.
- Preserve or reconstruct bookmarks when feasible.
- Emit logs and metadata so failures are diagnosable.

### Track B: Polished Reflowed Chinese Edition

Default backend: local pipeline plus OpenAI-compatible model providers.

Responsibilities:

- Extract outline, chapters, second-level sections, text chunks, formulas, figure/table references, and glossary candidates.
- Use large-model translation directly, not rough translation.
- Enforce terminology consistency across chunks and chapters.
- Reinsert or place extracted figures/tables near their original narrative position when feasible.
- Produce clean Chinese PDF, optional bilingual review HTML/PDF, glossary, prompt/version metadata, cache, retry logs, and quality reports.

## Provider Model

Use OpenAI-compatible providers so DeepSeek and ChatGPT share one interface.

Example:

```yaml
providers:
  deepseek:
    base_url: "https://api.deepseek.com"
    model: "deepseek-chat"
    api_key_env: "DEEPSEEK_API_KEY"

  openai:
    base_url: "https://api.openai.com/v1"
    model: "gpt-4.1"
    api_key_env: "OPENAI_API_KEY"
```

Provider requirements:

- Load API keys only from environment variables or local ignored config.
- Record provider, model, prompt version, request hash, response hash, retry count, and timestamp per chunk.
- Support retry, resume, and cache reuse.
- Allow provider switching per project or per chapter.

## CLI Contract

The CLI is the stable base interface.

```powershell
translate-book init <input.pdf> --project <project-dir>
translate-book prepare <project-dir>
translate-book translate <project-dir> --chapters 2,8 --provider deepseek
translate-book render <project-dir>
translate-book review <project-dir>
```

Required behavior:

- `init` copies or references the source file and creates project metadata.
- `prepare` extracts outline, sections, chunks, figure/table/formula references, and glossary candidates.
- `translate` performs direct LLM translation using confirmed glossary rules.
- `render` creates layout-preserved and reflowed outputs where possible.
- `review` checks structure, terminology, references, missing chunks, logs, and output readability.

## Local API Contract

The API is a thin wrapper over the CLI and project state.

```http
POST /projects
POST /projects/{id}/prepare
POST /projects/{id}/translate
GET  /projects/{id}/status
POST /projects/{id}/render
POST /projects/{id}/review
```

Agent usage:

- Agents call the local API by default.
- Humans can use CLI for debugging and repeatability.
- The API must not expose provider secrets in responses or logs.

## Sample Chapters

First validation chapters:

- Chapter 2: `Principles of Steady-State Converter Analysis`
- Chapter 8: `Converter Transfer Functions`

Rationale:

- Chapter 2 establishes power electronics terminology such as steady-state analysis, volt-second balance, charge balance, ripple, and converter examples.
- Chapter 8 stresses small-signal modeling, transfer functions, frequency response, and control-related translation.

Sample workflow:

1. Extract PDF outline and validate chapter boundaries.
2. Extract chapter text, second-level sections, formulas, figure/table references, and nearby figure/table assets.
3. Generate glossary candidates.
4. Pause for human glossary confirmation during sample phase.
5. Translate using DeepSeek or ChatGPT through the provider abstraction.
6. Review terminology, formulas, figure/table references, omissions, hallucinations, and readability.
7. Render outputs and write reports.

## Table of Contents and Bookmarks

Default bookmark depth: second-level sections.

Rules:

- Prefer PDF outline.
- Fall back to parsed headings when outline is missing or clearly incomplete.
- Degrade to chapter-level bookmarks when second-level headings are unreliable.
- Never fabricate second-level entries without evidence.

## Figures, Tables, and Formulas

Reading experience requires figures and tables to stay near their original narrative location.

Rules:

- Preserve equation numbers.
- Preserve figure/table numbers.
- Translate references consistently, for example `Fig. 2.3` to `图 2.3`.
- Extract and embed figure/table assets near their referenced position when feasible.
- If extraction fails, preserve the number, caption, original page, and a review warning.
- Do not silently drop formulas, figure references, table references, warnings, or assumptions.

## Quality Gates

Sample output must pass structure, translation, and traceability gates.

Structure:

- Source file is recorded.
- Chapter boundaries are recorded.
- Second-level TOC/bookmarks exist or a downgrade reason is documented.
- Output files open successfully.
- No obvious mojibake in generated artifacts.

Translation:

- Glossary is present and applied consistently.
- Formula, figure, and table references are preserved.
- No known omitted chunks.
- No obvious hallucinated claims.
- Technical meaning is preferred over literal word order.

Traceability:

- Provider and model are recorded.
- Prompt versions are recorded.
- Chunk input/output files are retained.
- Cache/retry records are retained.
- Human glossary confirmation records are retained for sample chapters.
- `reports/sample-chapters-review.md` summarizes findings and remaining risks.

## Skill Integration

Update `translating-technical-literature` so it:

- Detects or documents `E:\software\technical-translation-stack`.
- Uses the local API/CLI as the preferred execution path.
- Keeps manual extraction scripts as fallback tools.
- Captures lessons from sample runs into references, prompts, or workflow checks.
- Requires glossary confirmation before sample-chapter translation.
- Requires review reports before claiming outputs are ready.

Skill updates must remain generic. They may reference PDFMathTranslate-next/BabelDOC as default PDF backends, but must not hard-code this book's chapter numbers, titles, or terminology as universal behavior.

## Phase 1 Deliverables

Phase 1 is the sample-chapter closed loop, not full-book completion.

Expected project path:

```text
E:\software\technical-translation-stack\projects\fundamentals-power-electronics-3e
```

Deliverables:

- Local installation/configuration of PDFMathTranslate-next/BabelDOC stack.
- CLI/API skeleton usable by agents and humans.
- Chapter 2 and Chapter 8 layout-preserved translated PDFs.
- Chapter 2 and Chapter 8 polished Chinese reflowed PDFs.
- Optional bilingual review HTML/PDF.
- Second-level TOC/bookmarks where reliable.
- Glossary and human confirmation record.
- Translation logs, prompt/model metadata, cache records, and retry records.
- `reports/sample-chapters-review.md`.
- Updated `translating-technical-literature` skill.

## Open Implementation Decisions

- Whether PDFMathTranslate-next should be installed from a release artifact, source checkout, or both.
- Whether BabelDOC needs a separate clone for direct debugging or can initially remain an internal dependency.
- Which provider is first for sample translation: DeepSeek or ChatGPT.
- Which rendering engine is best for reflowed Chinese PDF after sample extraction is tested.
