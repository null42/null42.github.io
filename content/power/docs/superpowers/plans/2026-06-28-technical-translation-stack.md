---
date: 2026-06-28
category: 电源控制
source: power
visibility: public
title: Technical Translation Stack Implementation Plan
tags:
  - power-electronics
status: learning
summary: "> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan t"
---

# Technical Translation Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the phase-1 local technical translation stack described in `docs/superpowers/specs/2026-06-28-technical-translation-stack-design.md`.

**Architecture:** Use `E:\software\technical-translation-stack` as the runtime root. Keep the CLI/API pipeline separate from upstream repositories, invoke PDFMathTranslate-next/BabelDOC as layout-preserved backends, and use OpenAI-compatible providers for direct LLM translation and review.

**Tech Stack:** Python 3, Typer/FastAPI when available, pypdf/python-docx/PyMuPDF-style PDF helpers when available, PDFMathTranslate-next/BabelDOC, OpenAI-compatible HTTP APIs, Markdown/HTML/PDF rendering.

---

### Task 1: Runtime Root and Config Skeleton

**Files:**
- Create: `E:\software\technical-translation-stack\configs\providers.example.yaml`
- Create: `E:\software\technical-translation-stack\configs\profiles\power-electronics.yaml`
- Create: `E:\software\technical-translation-stack\configs\prompts\extract-glossary.v1.md`
- Create: `E:\software\technical-translation-stack\configs\prompts\translate-chunk.v1.md`
- Create: `E:\software\technical-translation-stack\configs\prompts\review-translation.v1.md`
- Create: `E:\software\technical-translation-stack\.gitignore`

- [ ] **Step 1: Create runtime directories**

Run PowerShell:

```powershell
$root = 'E:\software\technical-translation-stack'
New-Item -ItemType Directory -Force -Path `
  "$root\repos", "$root\envs", "$root\configs\profiles", "$root\configs\prompts", `
  "$root\projects", "$root\service", "$root\cli", "$root\logs" | Out-Null
```

Expected: directories exist.

- [ ] **Step 2: Add provider example config**

Create `providers.example.yaml`:

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
defaults:
  provider: "deepseek"
  temperature: 0.1
  max_retries: 3
  timeout_seconds: 120
```

- [ ] **Step 3: Add domain profile**

Create `power-electronics.yaml` with preferred terminology and glossary confirmation rules:

```yaml
name: power-electronics
language_pair: en-zh
require_human_glossary_confirmation_for_sample: true
bookmark_depth: 2
terms:
  duty cycle: 占空比
  ripple: 纹波
  small-signal model: 小信号模型
  volt-second balance: 伏秒平衡
  charge balance: 电荷平衡
  transfer function: 传递函数
  loop gain: 环路增益
  phase margin: 相位裕度
preserve:
  - equation_numbers
  - figure_numbers
  - table_numbers
  - component_part_numbers
  - pin_names
  - signal_names
```

- [ ] **Step 4: Add prompt templates**

Create three prompt files for glossary extraction, chunk translation, and review. Each prompt must require preserving equations, references, figure/table numbers, and glossary terms.

- [ ] **Step 5: Add local ignore rules**

Create `.gitignore`:

```gitignore
configs/providers.yaml
envs/
projects/*/cache/
projects/*/logs/
*.tmp
*.log
```

- [ ] **Step 6: Verify**

Run:

```powershell
Get-ChildItem -LiteralPath 'E:\software\technical-translation-stack' -Force
```

Expected: root directories and config skeleton exist.

### Task 2: Pipeline CLI Skeleton

**Files:**
- Create: `E:\software\technical-translation-stack\cli\translate_book.py`
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\__init__.py`
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\project.py`
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\outline.py`
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\review.py`
- Create: `E:\software\technical-translation-stack\cli\tests\test_project.py`

- [ ] **Step 1: Write failing project tests**

Test behavior:

```python
from pathlib import Path
from technical_translation_pipeline.project import init_project

def test_init_project_records_source_and_creates_directories(tmp_path):
    source = tmp_path / "source.pdf"
    source.write_bytes(b"%PDF-1.4\n")
    project = tmp_path / "project"

    metadata = init_project(source, project, title="Sample")

    assert metadata["source"]["path"].endswith("source/source.pdf")
    assert metadata["title"] == "Sample"
    for name in ["source", "outline", "chunks", "bilingual", "polished-cn", "layout-preserved", "rendered", "logs", "cache", "reports"]:
        assert (project / name).is_dir()
    assert (project / "project.json").is_file()
```

- [ ] **Step 2: Run test and verify failure**

Run:

```powershell
cd E:\software\technical-translation-stack\cli
python -m pytest tests\test_project.py -q
```

Expected: import failure because implementation does not exist.

- [ ] **Step 3: Implement minimal project creation**

Implement `init_project(source, project, title=None)` to copy source PDF into `project/source`, create required directories, and write `project.json`.

- [ ] **Step 4: Add CLI commands**

Implement commands:

```powershell
python translate_book.py init <input.pdf> --project <project-dir> --title <title>
python translate_book.py prepare <project-dir>
python translate_book.py review <project-dir>
```

If Typer is unavailable, use argparse.

- [ ] **Step 5: Verify**

Run tests and smoke command against a tiny temp PDF.

### Task 3: Outline and Sample Chapter Preparation

**Files:**
- Modify: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\outline.py`
- Modify: `E:\software\technical-translation-stack\cli\translate_book.py`
- Create: `E:\software\technical-translation-stack\cli\tests\test_outline.py`

- [ ] **Step 1: Write outline tests**

Tests must verify:

- PDF outline entries can be converted into chapter ranges.
- Second-level outline entries are retained under chapters.
- Missing second-level entries downgrade cleanly.

- [ ] **Step 2: Implement outline extraction**

Use `pypdf.PdfReader` where available. Extract title, page number, and depth. Create:

```json
{
  "chapters": [
    {
      "number": "2",
      "title": "Principles of Steady-State Converter Analysis",
      "start_page": 31,
      "end_page": 57,
      "sections": []
    }
  ]
}
```

- [ ] **Step 3: Implement sample preparation**

For `--chapters 2,8`, write:

- `outline/outline.json`
- `chunks/chapter-2.md`
- `chunks/chapter-8.md`
- `reports/prepare-report.md`

- [ ] **Step 4: Verify with real source**

Run:

```powershell
python translate_book.py init 'E:\文档\Fundamentals of Power Electronics 3rd Edition.pdf' --project 'E:\software\technical-translation-stack\projects\fundamentals-power-electronics-3e' --title 'Fundamentals of Power Electronics 3rd Edition'
python translate_book.py prepare 'E:\software\technical-translation-stack\projects\fundamentals-power-electronics-3e' --chapters 2,8
```

Expected: chapter 2 and 8 chunks exist, with page ranges matching outline evidence.

### Task 4: Provider Abstraction and Translation Cache

**Files:**
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\providers.py`
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\cache.py`
- Create: `E:\software\technical-translation-stack\cli\tests\test_provider_cache.py`

- [ ] **Step 1: Write cache tests**

Verify request hashes are stable and cached responses are reused.

- [ ] **Step 2: Implement provider config loading**

Read `configs/providers.yaml` if present, otherwise `providers.example.yaml`. Load API keys from environment variables only.

- [ ] **Step 3: Implement OpenAI-compatible request function**

Send `POST {base_url}/chat/completions` with model, messages, temperature, timeout, and retry. Do not log API keys.

- [ ] **Step 4: Add dry-run mode**

Implement `--dry-run` to produce deterministic placeholder translation metadata without calling an API. This is required for CI-like verification without secrets.

- [ ] **Step 5: Verify**

Run provider/cache tests and dry-run translation for chapter 2.

### Task 5: Glossary Confirmation and Direct LLM Translation

**Files:**
- Modify: `E:\software\technical-translation-stack\cli\translate_book.py`
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\glossary.py`
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\translate.py`
- Create: `E:\software\technical-translation-stack\cli\tests\test_glossary.py`

- [ ] **Step 1: Write glossary tests**

Verify profile terms seed the glossary, model candidates merge without losing confirmed terms, and unconfirmed sample glossaries block real translation.

- [ ] **Step 2: Implement glossary files**

Write:

- `reports/glossary-candidates.md`
- `reports/glossary-confirmed.yaml`

- [ ] **Step 3: Implement translation command**

Command:

```powershell
python translate_book.py translate <project-dir> --chapters 2,8 --provider deepseek --dry-run
```

Real translation requires confirmed glossary. Dry run may proceed and marks output as not production quality.

- [ ] **Step 4: Verify**

Run dry-run translation, then verify metadata and warning labels exist.

### Task 6: Rendering and Review Reports

**Files:**
- Create: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\render.py`
- Modify: `E:\software\technical-translation-stack\cli\technical_translation_pipeline\review.py`
- Create: `E:\software\technical-translation-stack\cli\tests\test_review.py`

- [ ] **Step 1: Write review tests**

Verify review reports missing outputs, missing glossary confirmation, missing bookmarks, and dry-run translations.

- [ ] **Step 2: Implement HTML rendering**

Render polished Markdown into `rendered/polished-cn.html` and bilingual review HTML.

- [ ] **Step 3: Implement PDF rendering when browser is available**

Use system Chrome/Edge or Playwright when available. If not available, write HTML and a warning.

- [ ] **Step 4: Implement review command**

Write `reports/sample-chapters-review.md` with structure, translation, and traceability status.

- [ ] **Step 5: Verify**

Run:

```powershell
python translate_book.py render <project-dir>
python translate_book.py review <project-dir>
```

Expected: report exists and explicitly says dry-run translations are not final if no real API call happened.

### Task 7: PDFMathTranslate-next/BabelDOC Installation Probe

**Files:**
- Create: `E:\software\technical-translation-stack\repos\...`
- Create: `E:\software\technical-translation-stack\logs\install-report.md`

- [ ] **Step 1: Clone or install upstream tools**

Prefer PDFMathTranslate-next as the main user-facing upstream. Clone PDFMathTranslate and BabelDOC only when needed for direct debugging.

- [ ] **Step 2: Record install commands and versions**

Write upstream commit hashes, Python versions, and command outputs to `logs/install-report.md`.

- [ ] **Step 3: Run upstream smoke test**

Run upstream help/version commands. If a small PDF translation is practical, run it on a tiny subset rather than the 1081-page source.

- [ ] **Step 4: Connect layout-preserved backend**

Add a pipeline command or documented adapter that invokes the upstream backend for selected chapters or full PDF when ready.

### Task 8: Local API Thin Wrapper

**Files:**
- Create: `E:\software\technical-translation-stack\service\technical_translation_api\app.py`
- Create: `E:\software\technical-translation-stack\service\technical_translation_api\tests\test_api.py`

- [ ] **Step 1: Write API tests**

Test `/projects`, `/projects/{id}/status`, and command dispatch in dry-run mode.

- [ ] **Step 2: Implement minimal FastAPI app**

If FastAPI is unavailable, provide a documented fallback using CLI only and record this in the review report.

- [ ] **Step 3: Verify**

Run local API tests and optionally start localhost service.

### Task 9: Skill Integration

**Files:**
- Modify: `C:\Users\30504\.codex\skills\translating-technical-literature\SKILL.md`
- Modify/Create: `C:\Users\30504\.codex\skills\translating-technical-literature\references\translation-stack.md`
- Modify/Create: `C:\Users\30504\.codex\skills\translating-technical-literature\scripts\...`
- Modify tests under the same skill directory.

- [ ] **Step 1: Add failing skill/tool tests**

Add tests that verify the skill helper can discover `E:\software\technical-translation-stack`, identify CLI availability, and fall back to manual extraction when missing.

- [ ] **Step 2: Update skill instructions**

Document the local stack as the preferred path while keeping generic fallback rules.

- [ ] **Step 3: Validate skill**

Run the skill tests and `quick_validate.py`.

### Task 10: Phase-1 Evidence Package

**Files:**
- Create/Update: `E:\software\technical-translation-stack\projects\fundamentals-power-electronics-3e\reports\phase-1-evidence.md`

- [ ] **Step 1: Collect evidence**

Record:

- source path and hash
- upstream install status
- chapter 2/8 outline ranges
- glossary status
- provider status
- output file paths
- review report path
- known gaps

- [ ] **Step 2: Verify against spec**

Run tests, smoke commands, and review report generation. Record exact commands and outcomes.

- [ ] **Step 3: Report remaining gap honestly**

If real API keys are not configured or real translation is not run, state that phase-1 infrastructure is ready but final sample translation is pending provider credentials.
