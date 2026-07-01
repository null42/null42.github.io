import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { serializeMarkdown } from '../frontmatter'

export interface EncryptedPayload {
  algorithm: 'AES-GCM'
  kdf: 'PBKDF2-SHA256'
  iterations: number
  salt: string
  iv: string
  ciphertext: string
}

export interface RenderEncryptedArticleOptions {
  title: string
  slug: string
  payloadFile: string
  payload: EncryptedPayload
  date: string
}

const iterations = 210_000

export async function encryptMarkdown(markdown: string, password: string): Promise<EncryptedPayload> {
  const salt = crypto.randomBytes(16)
  const iv = crypto.randomBytes(12)
  const key = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256')
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(markdown, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    algorithm: 'AES-GCM',
    kdf: 'PBKDF2-SHA256',
    iterations,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: Buffer.concat([encrypted, tag]).toString('base64')
  }
}

export async function decryptMarkdownForTest(payload: EncryptedPayload, password: string): Promise<string> {
  const salt = Buffer.from(payload.salt, 'base64')
  const iv = Buffer.from(payload.iv, 'base64')
  const encryptedWithTag = Buffer.from(payload.ciphertext, 'base64')
  const encrypted = encryptedWithTag.subarray(0, encryptedWithTag.length - 16)
  const tag = encryptedWithTag.subarray(encryptedWithTag.length - 16)
  const key = crypto.pbkdf2Sync(password, salt, payload.iterations, 32, 'sha256')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

export function renderEncryptedArticle(options: RenderEncryptedArticleOptions): string {
  return serializeMarkdown(
    {
      title: options.title,
      date: options.date,
      category: '加密',
      tags: ['encrypted'],
      source: 'private',
      status: 'private',
      visibility: 'encrypted',
      comments: false,
      summary: '这是一篇加密文章，需要输入密码后阅读。'
    },
    `<EncryptedArticle payload-url="/encrypted/${options.payloadFile}" />\n`
  )
}

export async function encryptPrivateDirectory(password: string, privateDir = 'content/private', outputDir = 'content/encrypted'): Promise<string[]> {
  const entries = await fs.readdir(privateDir, { withFileTypes: true }).catch(() => [])
  const written: string[] = []

  await fs.mkdir(outputDir, { recursive: true })
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    const input = path.join(privateDir, entry.name)
    const slug = entry.name.replace(/\.md$/i, '')
    const raw = await fs.readFile(input, 'utf8')
    const parsed = matter(raw)
    const title = typeof parsed.data.title === 'string' ? parsed.data.title : slug.replace(/[-_]+/g, ' ')
    const date = normalizeDate(parsed.data.date) || new Date().toISOString().slice(0, 10)
    const payload = await encryptMarkdown(raw, password)
    const payloadFile = `${slug}.json`

    await fs.writeFile(path.join(outputDir, payloadFile), JSON.stringify(payload, null, 2), 'utf8')
    await fs.writeFile(path.join(outputDir, `${slug}.md`), renderEncryptedArticle({ title, slug, payloadFile, payload, date }), 'utf8')
    written.push(path.join(outputDir, `${slug}.md`), path.join(outputDir, payloadFile))
  }

  return written
}

function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string') return value.match(/^(\d{4}-\d{2}-\d{2})/)?.[1]
  return undefined
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  const password = process.env.KB_ENCRYPT_PASSWORD
  if (!password) {
    throw new Error('KB_ENCRYPT_PASSWORD is required')
  }
  const written = await encryptPrivateDirectory(password)
  console.log(`encrypted ${written.length} files`)
}
