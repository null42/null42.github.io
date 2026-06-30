import { spawnSync } from 'node:child_process'

run('npm', ['run', 'kb:check'])
run('npm', ['run', 'kb:generate'])
run('npm', ['run', 'build'])

const status = commandOutput('git', ['status', '--short'])
if (!status.trim()) {
  console.log('nothing to publish')
  process.exit(0)
}

console.log(status)
run('git', ['add', '.'])
run('git', ['commit', '-m', `publish: update knowledge blog ${new Date().toISOString().slice(0, 10)}`])
run('git', ['push'])

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
