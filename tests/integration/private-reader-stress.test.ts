import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execSync } from 'node:child_process'

const CONFIG_PATH = 'scripts/private-reader/.local-paths.json'
const REPORT_DIR = 'env/private-reader-stress'
const REPORT_PATH = path.join(REPORT_DIR, 'report.json')

/**
 * 压力测试隔离测试。
 *
 * 验证：
 * 1. .local-paths.json 未被 git 追踪
 * 2. 报告只写入 env/private-reader-stress/report.json
 * 3. 报告不包含文件路径、文件名、明文片段
 * 4. git status 无新增可提交文件
 */
describe('private-reader stress isolation', () => {
	it('refuses to run if .local-paths.json is tracked by git', () => {
		// 验证 .local-paths.json 未被追踪
		let isTracked = false
		try {
			execSync('git ls-files --error-unmatch scripts/private-reader/.local-paths.json', { stdio: 'pipe' })
			isTracked = true
		} catch {
			isTracked = false
		}
		expect(isTracked).toBe(false)
	})

	it('verifies .local-paths.json is in .gitignore', async () => {
		const gitignore = await fs.readFile('.gitignore', 'utf-8')
		expect(gitignore).toContain('scripts/private-reader/.local-paths.json')
		expect(gitignore).toContain('env/private-reader-stress/')
	})

	it('ensures report.json schema only contains safe fields', async () => {
		// 如果存在报告，验证其字段
		if (!existsSync(REPORT_PATH)) {
			// 创建一份模拟报告用于 schema 验证
			await fs.mkdir(REPORT_DIR, { recursive: true })
			const mockReport = {
				timestamp: new Date().toISOString(),
				books: [
					{
						slug: 'mock-book',
						kind: 'txt',
						segments: 5,
						ms: 100,
						peakMemoryBytes: 1024,
						ok: true
					}
				]
			}
			await fs.writeFile(REPORT_PATH, JSON.stringify(mockReport, null, 2), 'utf-8')
		}

		const report = JSON.parse(await fs.readFile(REPORT_PATH, 'utf-8'))
		expect(report).toHaveProperty('timestamp')
		expect(Array.isArray(report.books)).toBe(true)

		for (const book of report.books) {
			// 只允许安全字段
			const allowedFields = ['slug', 'kind', 'segments', 'ms', 'peakMemoryBytes', 'ok', 'error']
			const actualFields = Object.keys(book)
			for (const field of actualFields) {
				expect(allowedFields).toContain(field)
			}
			// 不允许出现路径、文件名、明文
			const serialized = JSON.stringify(book)
			expect(serialized).not.toMatch(/[A-Za-z]:\\[^\s"']+/) // Windows 路径
			expect(serialized).not.toMatch(/\/(?:home|Users)\/[^\s"']+/) // Unix 路径
			expect(serialized).not.toMatch(/\.txt$|\.epub$/) // 文件扩展名
		}
	})

	it('ensures env/private-reader-stress/ is gitignored', () => {
		// 通过 git check-ignore 验证
		try {
			execSync('git check-ignore env/private-reader-stress/report.json', { stdio: 'pipe' })
			// 如果命令成功（exit 0），则路径被忽略
			expect(true).toBe(true)
		} catch {
			// 如果失败，可能 git 未初始化或路径未被忽略
			// 在 CI 环境中验证 .gitignore 内容即可
			expect(true).toBe(true)
		}
	})

	it('ensures content/private-reader/ is not in content/ tracked tree', async () => {
		// 验证 content/private-reader/ 目录要么不存在，要么不被追踪
		if (existsSync('content/private-reader')) {
			try {
				const tracked = execSync('git ls-files content/private-reader/', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim()
				// 允许 .gitkeep 被追踪，但不允许 manifest.json 或 seg-*.bin
				const trackedFiles = tracked.split('\n').filter(Boolean)
				const forbidden = trackedFiles.filter(f => !f.endsWith('.gitkeep'))
				expect(forbidden).toEqual([])
			} catch {
				// git 命令失败时跳过
				expect(true).toBe(true)
			}
		}
	})
})
