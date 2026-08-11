import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const pagefindBin = path.resolve('node_modules', '.bin', process.platform === 'win32' ? 'pagefind.cmd' : 'pagefind')
const requiredOutputs = [
  path.resolve('dist/pagefind/pagefind.js'),
  path.resolve('dist/pagefind/pagefind-ui.js'),
]

for (let attempt = 1; attempt <= 2; attempt += 1) {
  const startedAt = Date.now()
  const result = spawnSync(pagefindBin, args, {
    stdio: 'inherit',
    windowsHide: true,
    shell: process.platform === 'win32',
  })
  if (result.error) throw result.error
  const outputsAreFresh = requiredOutputs.every(file => {
    try { return fs.statSync(file).mtimeMs >= startedAt - 2_000 } catch { return false }
  })
  if (result.status === 0 || outputsAreFresh) {
    if (result.status !== 0) console.warn('[pagefind] Index files are fresh despite a non-zero Windows process status; continuing.')
    process.exit(0)
  }
  if (attempt < 2) console.warn('[pagefind] First attempt failed without fresh outputs; retrying once.')
}

process.exit(1)
