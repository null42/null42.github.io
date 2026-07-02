import { execFileSync } from 'node:child_process'

function run(command: string, args: string[]): void {
  execFileSync(command, args, { stdio: 'inherit' })
}

run('npm.cmd', ['run', 'kb:all'])
run('git', ['status', '--short'])

console.log('Review the status above, then commit and push the generated site changes when ready.')
