import { execFileSync } from 'node:child_process'
import fs from 'node:fs/promises'
import { syncDistToRoot } from './sync-dist'

function run(command: string, args: string[]): void {
  execFileSync(command, args, { stdio: 'inherit' })
}

function runBin(bin: string, args: string[]): void {
  run('cmd.exe', ['/c', `node_modules\\.bin\\${bin}.cmd`, ...args])
}

runBin('tsx', ['scripts/kb/import/inspect-source.ts'])
runBin('tsx', ['scripts/kb/migrate.ts', '--apply'])
runBin('tsx', ['scripts/kb/fix.ts'])
runBin('tsx', ['scripts/kb/check.ts'])
runBin('tsx', ['scripts/kb/generate.ts'])
runBin('tsx', ['scripts/kb/metadata/suggest-tags.ts'])
runBin('vitest', ['run'])
await fs.rm('.vitepress/dist', { recursive: true, force: true })
runBin('vitepress', ['build', '.'])
await syncDistToRoot()
console.log('knowledge base pipeline complete')
