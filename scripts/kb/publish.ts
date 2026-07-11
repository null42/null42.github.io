import { spawnSync } from 'node:child_process'

run('pnpm', ['build'])

const status = commandOutput('git', ['status', '--short'])
if (status.trim()) {
  console.log(status)
} else {
  console.log('工作区没有待提交变更。')
}

console.log('Astro 生产构建完成。请检查 dist 和以上 Git 状态，确认后手动提交并推送。')

function run(command: string, args: string[]): void {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function commandOutput(command: string, args: string[]): string {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    shell: process.platform === 'win32'
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
  return result.stdout
}
