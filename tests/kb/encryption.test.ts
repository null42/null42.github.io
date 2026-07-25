import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { decryptMarkdownForTest, encryptMarkdown, renderEncryptedArticle } from '../../scripts/kb/encrypt/encrypt'
import { copyEncryptedPayloadsToDist } from '../../scripts/kb/encrypt/publish-payloads'
import { renderDecryptedMarkdown, stripFrontmatter } from '../../.vitepress/theme/encrypted-markdown'

describe('encrypted articles', () => {
  it('loads the encryption helper in the plain Node runtime used by Playwright', () => {
    const result = spawnSync(
      process.execPath,
      ['node_modules/tsx/dist/cli.mjs', '-e', "import('./scripts/kb/encrypt/encrypt.ts').then(() => console.log('loaded'))"],
      { cwd: process.cwd(), encoding: 'utf8' },
    )

    expect(result.status, result.stderr || result.stdout).toBe(0)
    expect(result.stdout).toContain('loaded')
  })

  it('renders Markdown before encryption without storing plaintext in the payload', async () => {
    const markdown = [
      '---',
      'title: Secret project note',
      'passwordHint: should-not-render',
      '---',
      '',
      '# Secret project note',
      '',
      '- current-loop tuning',
      '',
      '| Item | Value |',
      '| --- | --- |',
      '| Loop | 10 kHz |',
      '',
      '```ts',
      'const frequency = 10_000',
      '```',
      '',
      '$$i_q = 0$$',
    ].join('\n')
    const payload = await encryptMarkdown(markdown, 'passphrase')

    expect(JSON.stringify(payload)).not.toContain('Secret project note')
    expect(payload.algorithm).toBe('AES-GCM')
    expect(payload.contentType).toBe('text/html')
    const decrypted = await decryptMarkdownForTest(payload, 'passphrase')
    expect(decrypted).toMatch(/<h1[^>]*>Secret project note(?:<a[\s\S]*?<\/a>)?<\/h1>/)
    expect(decrypted).toContain('<li>current-loop tuning</li>')
    expect(decrypted).toContain('<table>')
    expect(decrypted).toMatch(/data-language=(?:\x22|')ts(?:\x22|')/)
    expect(decrypted).toContain('10_000')
    expect(decrypted).toMatch(/class=(?:\x22|')katex(?:\x22|')/)
    expect(decrypted).not.toContain('passwordHint')
    await expect(decryptMarkdownForTest(payload, 'wrong-password')).rejects.toThrow()
  })

  it('sanitizes executable HTML before encrypting rendered Markdown', async () => {
    const markdown = [
      '# Safe heading',
      '<script>globalThis.compromised = true</script>',
      '<img src="/safe.png" alt="safe" onerror="alert(1)">',
      '<a href="javascript:alert(1)">unsafe link</a>',
      '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
    ].join('\n')

    const payload = await encryptMarkdown(markdown, 'passphrase')
    const decrypted = await decryptMarkdownForTest(payload, 'passphrase')

    expect(decrypted).toContain('Safe heading')
    expect(decrypted).toContain('src="/safe.png"')
    expect(decrypted).not.toMatch(/<script|onerror|javascript:|srcdoc|<iframe/i)
  })

  it('uses the shared site Markdown plugins for protected content without executable output', async () => {
    const markdown = [
      '# Pipeline parity',
      '',
      '[grid]',
      '![One](/one.png)',
      '![Two](/two.png)',
      '[/grid]',
      '',
      '```mermaid',
      'graph TD; A-->B',
      '```',
      '',
      '```plantuml',
      '@startuml',
      'Alice -> Bob',
      '@enduml',
      '```',
      '',
      '[External](https://example.com/docs)',
      '[Mail](mailto:test@example.com)',
      '',
      '::github{repo="openai/openai-node"}',
    ].join('\n')

    const payload = await encryptMarkdown(markdown, 'passphrase')
    const decrypted = await decryptMarkdownForTest(payload, 'passphrase')

    expect(decrypted).toContain('image-grid')
    expect(decrypted).toContain('mermaid-diagram-container')
    expect(decrypted).toContain('data-mermaid-code="graph TD; A--&gt;B"')
    expect(decrypted).toContain('plantuml-diagram-container')
    expect(decrypted).toContain('class="plantuml-image"')
    expect(decrypted).toContain('target="_blank"')
    expect(decrypted).toMatch(/rel="[^"]*noopener[^"]*"/)
    expect(decrypted).toContain('data-encoded-email=')
    expect(decrypted).toContain('gc-titlebar')
    expect(decrypted).not.toMatch(/<script|onclick=/i)

    const astroConfig = fs.readFileSync('astro.config.mjs', 'utf8')
    const protectedRenderer = fs.readFileSync('scripts/kb/encrypt/render-markdown.ts', 'utf8')
    expect(astroConfig).toContain('createSiteMarkdownProcessorOptions')
    expect(protectedRenderer).toContain('createSiteMarkdownProcessorOptions')
  })

  it('owns safe post-decryption enhancements outside sanitized payload HTML', () => {
    const component = fs.readFileSync('src/components/features/EncryptedPayload.astro', 'utf8')
    const controller = fs.readFileSync('src/utils/encrypted-payload-controller.ts', 'utf8')
    const mermaidRenderer = fs.readFileSync('src/plugins/mermaid-render-script.js', 'utf8')
    expect(controller).toContain('data-encoded-email')
    expect(controller).toContain('windowRef.atob(encodedEmail)')
    expect(controller).toContain('AbortController')
    expect(controller).toContain('signal: requestController.signal')
    expect(component).toContain('mermaid-render-script.js?raw')
    expect(component).toContain('plantuml-render-script.js?raw')
    expect(component).toContain('initEncryptedPayloadLifecycle')
    expect(mermaidRenderer).toContain('document.addEventListener("password:decrypted"')
  })

  it('associates the encrypted password input with stable label and descriptions', () => {
    const component = fs.readFileSync('src/components/features/EncryptedPayload.astro', 'utf8')
    expect(component).toContain('<label for={passwordInputId}')
    expect(component).toContain('id={passwordInputId}')
    expect(component).toContain('id={passwordDescriptionId}')
    expect(component).toContain('id={passwordErrorId}')
    expect(component).toContain('aria-describedby={`${passwordDescriptionId} ${passwordErrorId}`}')
  })

  it('renders a public encrypted wrapper without plaintext body content', async () => {
    const payload = await encryptMarkdown('private body should not leak', 'passphrase')
    const page = renderEncryptedArticle({
      title: 'Private Power Note',
      slug: 'private-power-note',
      payloadFile: 'private-power-note.json',
      payload,
      date: '2026-07-01'
    })

    expect(page).toContain('visibility: encrypted')
    expect(page).toContain('<EncryptedArticle')
    expect(page).not.toContain('private body should not leak')
  })

  it('copies encrypted payload json files into the built dist tree', async () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'kb-encrypted-payloads-'))
    const sourceDir = path.join(temp, 'content', 'encrypted')
    const distDir = path.join(temp, 'dist')
    fs.mkdirSync(sourceDir, { recursive: true })
    fs.writeFileSync(path.join(sourceDir, 'demo.json'), '{"ciphertext":"safe"}', 'utf8')

    await copyEncryptedPayloadsToDist({
      sourceDir,
      distDir
    })

    expect(fs.readFileSync(path.join(distDir, 'content', 'encrypted', 'demo.json'), 'utf8')).toBe('{"ciphertext":"safe"}')
  })

  it('publishes a safe encrypted demo wrapper without leaking plaintext payload', () => {
    const wrapper = fs.readFileSync('content/encrypted/demo.md', 'utf8')
    const payload = fs.readFileSync('content/encrypted/demo.json', 'utf8')
    const productionE2e = fs.readFileSync('tests/e2e/quality.production.spec.ts', 'utf8')

    expect(wrapper).toContain('visibility: encrypted')
    expect(wrapper).toContain('comments: false')
    expect(wrapper).toContain('<EncryptedArticle payload-url="/content/encrypted/demo.json" />')
    expect(wrapper).not.toContain('demo-knowledge')
    expect(payload).not.toContain('这是一篇无敏感信息的加密演示')
    expect(payload).not.toContain('demo-knowledge')
    expect(productionE2e).not.toContain('demo-knowledge')
  })

  it('shows encrypted article input, success, and wrong-password states', () => {
    const component = fs.readFileSync('.vitepress/theme/components/EncryptedArticle.vue', 'utf8')

    expect(component).toContain('等待输入密码')
    expect(component).toContain('解密成功')
    expect(component).toContain('密码错误')
    expect(component).toContain('const isBusy = ref(false)')
    expect(component).toContain(':disabled="isBusy"')
    expect(component).toContain('window.crypto.subtle')
    expect(component).toContain('XMLHttpRequest')
    expect(component).not.toContain('window.fetch')
    expect(component).not.toContain('window.atob')
    expect(component).toContain('@noble/ciphers/aes.js')
    expect(component).toContain('@noble/hashes/pbkdf2.js')
  })

  it('renders decrypted markdown as a readable document view', () => {
    const component = fs.readFileSync('.vitepress/theme/components/EncryptedArticle.vue', 'utf8')

    expect(component).toContain('renderMarkdown')
    expect(component).toContain('kb-decrypted-doc')
    expect(component).toContain('v-html="renderedContent"')
    expect(component).not.toContain('<pre v-if="content"')
  })

  it('strips private frontmatter before rendering decrypted markdown', () => {
    const markdown = [
      '---',
      'title: 加密演示文章',
      'passwordHint: 演示密码：demo-knowledge',
      '---',
      '',
      '# 加密演示文章',
      '',
      '- 搜索索引不收录加密文章正文。'
    ].join('\n')

    expect(stripFrontmatter(markdown)).not.toContain('passwordHint')
    expect(renderDecryptedMarkdown(markdown)).toContain('<h1>加密演示文章</h1>')
    expect(renderDecryptedMarkdown(markdown)).not.toContain('passwordHint')
  })

  it('distinguishes empty password from wrong password', () => {
    const component = fs.readFileSync('.vitepress/theme/components/EncryptedArticle.vue', 'utf8')

    expect(component).toContain('请输入文章密码。')
    expect(component).toContain('password.value.trim()')
  })
})
