#!/usr/bin/env tsx
/**
 * 私密阅读系统 CLI（v2 三层密码架构）
 *
 * 用法：
 *   tsx scripts/kb/private-reader/cli.ts encrypt       # 加密 .local-paths.json 中配置的书籍
 *   tsx scripts/kb/private-reader/cli.ts batch <dir> <kind>  # 批量加密目录下所有文件
 *   tsx scripts/kb/private-reader/cli.ts clean         # 清理 content/private-reader/
 *   tsx scripts/kb/private-reader/cli.ts salts         # 生成/查看共享 salts
 *
 * 环境变量：
 *   KB_READER_GATE_PASSWORD  - Gate 层密码（进入书架）
 *   KB_READER_SHELF_PASSWORD - Shelf 层密码（解密书名）
 *   KB_READER_BOOK_PASSWORD  - Book 层密码（解密内容）
 *
 * 配置：
 *   - scripts/private-reader/.local-paths.json（gitignore）列出待加密书籍
 *   - scripts/private-reader/.salts.json（gitignore）保存共享 gateSalt/shelfSalt
 *
 * 安全：
 *   - 拒绝在 .local-paths.json / .salts.json 被 git 追踪时运行
 *   - 拒绝在密码缺失时运行
 *   - 日志只输出 slug、kind、段数、耗时
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { encryptTxtFile } from './encrypt-txt'
import { encryptEpubFile } from './encrypt-epub'
import { generateSalt, SALT_LEN } from './crypto'

interface BookEntry {
  slug: string
  kind: 'txt' | 'epub'
  path: string
  title?: string
  author?: string
  encoding?: string
}

interface SaltsConfig {
  gateSalt: string  // base64
  shelfSalt: string // base64
  createdAt: string
  version: number
}

const CONFIG_PATH = 'scripts/private-reader/.local-paths.json'
const SALTS_PATH = 'scripts/private-reader/.salts.json'
const OUTPUT_BASE = 'content/private-reader'

async function main(): Promise<void> {
  const command = process.argv[2]

  if (command === 'encrypt') {
    await runEncrypt()
  } else if (command === 'batch') {
    await runBatchEncrypt()
  } else if (command === 'clean') {
    await runClean()
  } else if (command === 'salts') {
    await runSalts()
  } else {
    console.error('Usage: tsx scripts/kb/private-reader/cli.ts <encrypt|batch|clean|salts>')
    console.error('  encrypt       加密 .local-paths.json 中配置的书籍')
    console.error('  batch <dir> <kind>  批量加密目录下所有 epub/txt 文件')
    console.error('  clean         清理 content/private-reader/')
    console.error('  salts         生成或查看共享 salts')
    process.exitCode = 1
  }
}

/**
 * 读取三个密码环境变量。
 */
function readPasswords(): { gate: string; shelf: string; book: string } {
  const gate = process.env.KB_READER_GATE_PASSWORD
  const shelf = process.env.KB_READER_SHELF_PASSWORD
  const book = process.env.KB_READER_BOOK_PASSWORD
  if (!gate || !shelf || !book) {
    console.error('Error: 缺少密码环境变量。需要同时设置：')
    console.error('  KB_READER_GATE_PASSWORD  - Gate 层密码（进入书架）')
    console.error('  KB_READER_SHELF_PASSWORD - Shelf 层密码（解密书名）')
    console.error('  KB_READER_BOOK_PASSWORD  - Book 层密码（解密内容）')
    process.exitCode = 1
    throw new Error('missing passwords')
  }
  return { gate, shelf, book }
}

/**
 * 读取或生成共享 salts（gateSalt, shelfSalt）。
 * 所有书共享这两个 salt，使前端只需派生一次 gateKey/shelfKey。
 */
async function readOrGenerateSalts(): Promise<{ gateSalt: Buffer; shelfSalt: Buffer }> {
  // 检查文件是否被 git 追踪
  if (isFileTrackedByGit(SALTS_PATH)) {
    console.error(`Error: ${SALTS_PATH} is tracked by git. Add it to .gitignore first.`)
    process.exitCode = 1
    throw new Error('salts tracked by git')
  }

  if (existsSync(SALTS_PATH)) {
    const raw = await fs.readFile(SALTS_PATH, 'utf-8')
    const config = JSON.parse(raw) as SaltsConfig
    return {
      gateSalt: Buffer.from(config.gateSalt, 'base64'),
      shelfSalt: Buffer.from(config.shelfSalt, 'base64')
    }
  }

  // 生成新的 salts
  const salts: SaltsConfig = {
    gateSalt: generateSalt().toString('base64'),
    shelfSalt: generateSalt().toString('base64'),
    createdAt: new Date().toISOString(),
    version: 2
  }
  await fs.writeFile(SALTS_PATH, JSON.stringify(salts, null, 2), 'utf-8')
  console.log(`Generated new salts at ${SALTS_PATH}`)
  return {
    gateSalt: Buffer.from(salts.gateSalt, 'base64'),
    shelfSalt: Buffer.from(salts.shelfSalt, 'base64')
  }
}

async function runEncrypt(): Promise<void> {
  const passwords = readPasswords()
  const { gateSalt, shelfSalt } = await readOrGenerateSalts()

  // 检查配置文件是否被 git 追踪
  if (isFileTrackedByGit(CONFIG_PATH)) {
    console.error(`Error: ${CONFIG_PATH} is tracked by git. Add it to .gitignore first.`)
    process.exitCode = 1
    return
  }

  if (!existsSync(CONFIG_PATH)) {
    console.error(`Error: ${CONFIG_PATH} not found. Copy .local-paths.example.json to get started.`)
    process.exitCode = 1
    return
  }

  const configRaw = await fs.readFile(CONFIG_PATH, 'utf-8')
  const config = JSON.parse(configRaw) as { books: BookEntry[] }

  if (!Array.isArray(config.books) || config.books.length === 0) {
    console.error('Error: no books configured in .local-paths.json')
    process.exitCode = 1
    return
  }

  // 加密每本书
  for (const book of config.books) {
    if (!existsSync(book.path)) {
      console.error(`Error: file not found for slug "${book.slug}": ${book.path}`)
      continue
    }

    const outputDir = path.join(OUTPUT_BASE, book.slug)
    try {
      if (book.kind === 'txt') {
        await encryptTxtFile(book.path, book.slug, passwords, outputDir, {
          title: book.title,
          author: book.author,
          encoding: book.encoding,
          gateSalt,
          shelfSalt
        })
      } else if (book.kind === 'epub') {
        await encryptEpubFile(book.path, book.slug, passwords, outputDir, {
          title: book.title,
          author: book.author,
          gateSalt,
          shelfSalt
        })
      } else {
        console.error(`Error: unknown kind "${book.kind}" for slug "${book.slug}"`)
      }
    } catch (err) {
      console.error(`Error encrypting "${book.slug}":`, err)
    }
  }
}

/**
 * 批量加密目录下所有文件。
 * 用法: tsx cli.ts batch <dir> <kind>
 * kind: epub | txt
 */
async function runBatchEncrypt(): Promise<void> {
  const dir = process.argv[3]
  const kind = process.argv[4] as 'epub' | 'txt'

  if (!dir || !kind || (kind !== 'epub' && kind !== 'txt')) {
    console.error('Usage: tsx cli.ts batch <dir> <epub|txt>')
    process.exitCode = 1
    return
  }

  if (!existsSync(dir)) {
    console.error(`Error: directory not found: ${dir}`)
    process.exitCode = 1
    return
  }

  const passwords = readPasswords()
  const { gateSalt, shelfSalt } = await readOrGenerateSalts()

  // 递归扫描目录
  const ext = kind === 'epub' ? '.epub' : '.txt'
  const files = await scanDirectory(dir, ext)

  if (files.length === 0) {
    console.error(`Error: no ${ext} files found in ${dir}`)
    process.exitCode = 1
    return
  }

  console.log(`Found ${files.length} ${ext} files in ${dir}`)
  console.log(`Encrypting with shared gatealt/shelfSalt...`)

  let success = 0
  let failed = 0
  const startTime = Date.now()

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i]
    const slug = generateSlug(filePath, kind)
    const outputDir = path.join(OUTPUT_BASE, slug)

    // 跳过已存在的（避免重复加密）
    if (existsSync(path.join(outputDir, 'manifest.json'))) {
      continue
    }

    try {
      if (kind === 'txt') {
        await encryptTxtFile(filePath, slug, passwords, outputDir, {
          gateSalt,
          shelfSalt
        })
      } else {
        await encryptEpubFile(filePath, slug, passwords, outputDir, {
          gateSalt,
          shelfSalt
        })
      }
      success++
    } catch (err) {
      console.error(`Error encrypting "${slug}":`, err instanceof Error ? err.message : err)
      failed++
    }

    // 进度报告
    if ((i + 1) % 50 === 0) {
      const elapsed = (Date.now() - startTime) / 1000
      const rate = (i + 1) / elapsed
      const remaining = (files.length - i - 1) / rate
      console.log(`Progress: ${i + 1}/${files.length} (${rate.toFixed(1)} files/s, ETA ${remaining.toFixed(0)}s)`)
    }
  }

  const elapsed = (Date.now() - startTime) / 1000
  console.log(`\nBatch encryption complete:`)
  console.log(`  Success: ${success}`)
  console.log(`  Failed:  ${failed}`)
  console.log(`  Time:    ${elapsed.toFixed(1)}s`)
}

/**
 * 递归扫描目录，返回所有指定扩展名的文件。
 */
async function scanDirectory(dir: string, ext: string): Promise<string[]> {
  const results: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const subResults = await scanDirectory(fullPath, ext)
      results.push(...subResults)
    } else if (entry.name.toLowerCase().endsWith(ext)) {
      results.push(fullPath)
    }
  }

  return results
}

/**
 * 从文件路径生成 URL-safe slug。
 * 格式: <kind>-<basename>-<shortHash>
 */
function generateSlug(filePath: string, kind: string): string {
  const basename = path.basename(filePath, path.extname(filePath))
  // 清理特殊字符，保留中文、英文、数字
  const cleaned = basename
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) // 限制长度

  // 用文件路径的简单 hash 避免重名
  const hash = simpleHash(filePath).toString(36).slice(0, 6)
  return `${kind}-${cleaned}-${hash}`
}

/**
 * 简单字符串 hash（非加密用途，仅用于 slug 去重）。
 */
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

async function runClean(): Promise<void> {
  if (!existsSync(OUTPUT_BASE)) {
    console.log('Nothing to clean: content/private-reader/ does not exist')
    return
  }

  await fs.rm(OUTPUT_BASE, { recursive: true, force: true })
  console.log('Cleaned content/private-reader/')
}

/**
 * 生成或查看共享 salts。
 */
async function runSalts(): Promise<void> {
  if (isFileTrackedByGit(SALTS_PATH)) {
    console.error(`Error: ${SALTS_PATH} is tracked by git. Add it to .gitignore first.`)
    process.exitCode = 1
    return
  }

  if (existsSync(SALTS_PATH)) {
    const raw = await fs.readFile(SALTS_PATH, 'utf-8')
    const config = JSON.parse(raw) as SaltsConfig
    console.log(`Salts file: ${SALTS_PATH}`)
    console.log(`  Version:    ${config.version}`)
    console.log(`  Created:    ${config.createdAt}`)
    console.log(`  gateSalt:   ${config.gateSalt} (${Buffer.from(config.gateSalt, 'base64').length} bytes)`)
    console.log(`  shelfSalt:  ${config.shelfSalt} (${Buffer.from(config.shelfSalt, 'base64').length} bytes)`)
  } else {
    // 生成新的
    const { gateSalt, shelfSalt } = await readOrGenerateSalts()
    console.log(`Generated new salts file: ${SALTS_PATH}`)
    console.log(`  gateSalt:   ${gateSalt.toString('base64')}`)
    console.log(`  shelfSalt:  ${shelfSalt.toString('base64')}`)
  }
}

/**
 * 检查文件是否被 git 追踪。
 */
function isFileTrackedByGit(filePath: string): boolean {
  try {
    execSync(`git ls-files --error-unmatch "${filePath}"`, { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
