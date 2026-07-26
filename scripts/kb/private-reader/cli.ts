#!/usr/bin/env tsx
/**
 * 私密阅读系统 CLI
 *
 * 用法：
 *   tsx scripts/kb/private-reader/cli.ts encrypt   # 加密所有配置的书籍
 *   tsx scripts/kb/private-reader/cli.ts clean     # 清理 content/private-reader/
 *
 * 配置：
 *   - scripts/private-reader/.local-paths.json（gitignore）列出待加密书籍
 *   - 环境变量 KB_READER_PASSWORD 提供加密密码
 *
 * 安全：
 *   - 拒绝在 .local-paths.json 被 git 追踪时运行
 *   - 拒绝在密码缺失时运行
 *   - 日志只输出 slug、kind、段数、耗时
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { encryptTxtFile } from './encrypt-txt'
import { encryptEpubFile } from './encrypt-epub'

interface BookEntry {
  slug: string
  kind: 'txt' | 'epub'
  path: string
  title?: string
  author?: string
  encoding?: string
}

const CONFIG_PATH = 'scripts/private-reader/.local-paths.json'
const OUTPUT_BASE = 'content/private-reader'

async function main(): Promise<void> {
  const command = process.argv[2]

  if (command === 'encrypt') {
    await runEncrypt()
  } else if (command === 'clean') {
    await runClean()
  } else {
    console.error('Usage: tsx scripts/kb/private-reader/cli.ts <encrypt|clean>')
    process.exitCode = 1
  }
}

async function runEncrypt(): Promise<void> {
  // 1. 检查密码
  const password = process.env.KB_READER_PASSWORD
  if (!password) {
    console.error('Error: KB_READER_PASSWORD environment variable is required')
    process.exitCode = 1
    return
  }

  // 2. 检查配置文件是否被 git 追踪
  if (isFileTrackedByGit(CONFIG_PATH)) {
    console.error(`Error: ${CONFIG_PATH} is tracked by git. Add it to .gitignore first.`)
    process.exitCode = 1
    return
  }

  // 3. 读取配置
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

  // 4. 加密每本书
  for (const book of config.books) {
    if (!existsSync(book.path)) {
      console.error(`Error: file not found for slug "${book.slug}": ${book.path}`)
      continue
    }

    const outputDir = path.join(OUTPUT_BASE, book.slug)
    try {
      if (book.kind === 'txt') {
        await encryptTxtFile(book.path, book.slug, password, outputDir, {
          title: book.title,
          author: book.author,
          encoding: book.encoding
        })
      } else if (book.kind === 'epub') {
        await encryptEpubFile(book.path, book.slug, password, outputDir, {
          title: book.title,
          author: book.author
        })
      } else {
        console.error(`Error: unknown kind "${book.kind}" for slug "${book.slug}"`)
      }
    } catch (err) {
      console.error(`Error encrypting "${book.slug}":`, err)
    }
  }
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
