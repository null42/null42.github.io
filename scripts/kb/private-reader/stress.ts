#!/usr/bin/env tsx
/**
 * 私密阅读系统本地压力测试
 *
 * 用法：
 *   npm run private-reader:stress
 *
 * 读取 scripts/private-reader/.local-paths.json，对每本书：
 *   1. 在内存中加密（不写入 content/）
 *   2. 在内存中解密
 *   3. 模拟渲染（遍历每段）
 *   4. 测量峰值内存与耗时
 *
 * 报告写入 env/private-reader-stress/report.json，包含：
 *   { slug, kind, segments, ms, peakMemoryBytes, ok }
 *
 * 安全：
 *   - 拒绝在 .local-paths.json 被 git 追踪时运行
 *   - 报告不包含文件路径、文件名、明文片段
 *   - 产物只写入 env/private-reader-stress/（gitignore）
 */

import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { encryptTxtFile } from './encrypt-txt'
import { encryptEpubFile } from './encrypt-epub'
import { deriveKey, decryptSegment, decryptField, generateSalt } from './crypto'
import os from 'node:os'

interface BookEntry {
	slug: string
	kind: 'txt' | 'epub'
	path: string
	title?: string
	author?: string
	encoding?: string
}

interface StressReport {
	slug: string
	kind: string
	segments: number
	ms: number
	peakMemoryBytes: number
	ok: boolean
	error?: string
}

const CONFIG_PATH = 'scripts/private-reader/.local-paths.json'
const REPORT_DIR = 'env/private-reader-stress'
const REPORT_PATH = path.join(REPORT_DIR, 'report.json')

async function main(): Promise<void> {
	// 1. 检查配置文件是否被 git 追踪
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

	// 2. 检查密码
	const password = process.env.KB_READER_PASSWORD
	if (!password) {
		console.error('Error: KB_READER_PASSWORD environment variable is required')
		process.exitCode = 1
		return
	}

	// 3. 读取配置
	const configRaw = await fs.readFile(CONFIG_PATH, 'utf-8')
	const config = JSON.parse(configRaw) as { books: BookEntry[] }

	if (!Array.isArray(config.books) || config.books.length === 0) {
		console.error('Error: no books configured in .local-paths.json')
		process.exitCode = 1
		return
	}

	// 4. 创建临时目录用于加密产物（不写入 content/）
	const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'private-reader-stress-'))
	const reports: StressReport[] = []

	try {
		for (const book of config.books) {
			const report = await stressTestBook(book, password, tmpDir)
			reports.push(report)
			// 安全日志：只输出 slug、kind、段数、耗时、ok
			console.log(JSON.stringify({
				slug: report.slug,
				kind: report.kind,
				segments: report.segments,
				ms: report.ms,
				peakMemoryBytes: report.peakMemoryBytes,
				ok: report.ok
			}))
		}
	} finally {
		// 清理临时目录
		await fs.rm(tmpDir, { recursive: true, force: true })
	}

	// 5. 写入报告到 env/private-reader-stress/report.json
	await fs.mkdir(REPORT_DIR, { recursive: true })
	await fs.writeFile(REPORT_PATH, JSON.stringify({
		timestamp: new Date().toISOString(),
		books: reports
	}, null, 2), 'utf-8')

	console.log(`\nStress test report written to ${REPORT_PATH}`)
	console.log(`Total books: ${reports.length}, OK: ${reports.filter(r => r.ok).length}, Failed: ${reports.filter(r => !r.ok).length}`)
}

async function stressTestBook(book: BookEntry, password: string, tmpDir: string): Promise<StressReport> {
	const startTime = Date.now()
	const startMemory = process.memoryUsage().heapUsed
	const slug = book.slug
	const kind = book.kind

	if (!existsSync(book.path)) {
		return {
			slug, kind, segments: 0, ms: Date.now() - startTime,
			peakMemoryBytes: 0, ok: false, error: 'file not found'
		}
	}

	const outputDir = path.join(tmpDir, slug)
	let peakMemoryBytes = 0

	try {
		// 1. 加密
		let manifest: any
		if (kind === 'txt') {
			manifest = await encryptTxtFile(book.path, slug, password, outputDir, {
				title: book.title,
				author: book.author,
				encoding: book.encoding
			})
		} else if (kind === 'epub') {
			manifest = await encryptEpubFile(book.path, slug, password, outputDir, {
				title: book.title,
				author: book.author
			})
		} else {
			return {
				slug, kind, segments: 0, ms: Date.now() - startTime,
				peakMemoryBytes: 0, ok: false, error: 'unknown kind'
			}
		}

		peakMemoryBytes = Math.max(peakMemoryBytes, process.memoryUsage().heapUsed - startMemory)

		// 2. 派生密钥并解密 title 验证
		const salt = Buffer.from(manifest.crypto.salt, 'base64')
		const key = deriveKey(password, salt)
		const title = decryptField(manifest.title, key)

		peakMemoryBytes = Math.max(peakMemoryBytes, process.memoryUsage().heapUsed - startMemory)

		// 3. 模拟渲染：遍历每段，解密
		const segments = manifest.segments || []
		for (let i = 0; i < segments.length; i++) {
			const seg = segments[i]
			const ciphertextBase64 = await fs.readFile(path.join(outputDir, seg.file), 'utf-8')
			const ciphertext = Buffer.from(ciphertextBase64, 'base64')
			const iv = Buffer.from(seg.iv, 'base64')
			const plaintext = decryptSegment(ciphertext, key, iv)
			// 模拟渲染（仅遍历，不写入 DOM）
			void plaintext.length
			peakMemoryBytes = Math.max(peakMemoryBytes, process.memoryUsage().heapUsed - startMemory)
		}

		return {
			slug, kind, segments: segments.length, ms: Date.now() - startTime,
			peakMemoryBytes, ok: true
		}
	} catch (err) {
		return {
			slug, kind, segments: 0, ms: Date.now() - startTime,
			peakMemoryBytes, ok: false, error: err instanceof Error ? err.message : String(err)
		}
	}
}

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
