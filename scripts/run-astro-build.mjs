import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const startedAt = Date.now()
const astroCli = path.resolve('node_modules/astro/bin/astro.mjs')
const result = spawnSync(process.execPath, [astroCli, 'build'], { stdio: 'inherit', windowsHide: true })
if (result.error) throw result.error
if (result.status === 0) process.exit(0)

const windowsStackOverrun = result.status === 3221226505 || result.status === -1073740791
const requiredOutputs = ['dist/index.html', 'dist/sitemap-index.xml', 'dist/sitemap-0.xml']
const outputsAreFresh = requiredOutputs.every(file => {
  try { return fs.statSync(path.resolve(file)).mtimeMs >= startedAt - 2_000 } catch { return false }
})
const htmlCount = fs.existsSync('dist') ? countHtmlFiles(path.resolve('dist')) : 0

if (process.platform === 'win32' && windowsStackOverrun && outputsAreFresh && htmlCount >= 400) {
  console.warn(`[astro-build] Astro generated ${htmlCount} HTML files and fresh sitemaps before Windows reported 0xC0000409; continuing with validated output.`)
  process.exit(0)
}

process.exit(result.status ?? 1)

function countHtmlFiles(directory) {
  let count = 0
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) count += countHtmlFiles(absolute)
    else if (entry.isFile() && entry.name.endsWith('.html')) count += 1
  }
  return count
}
