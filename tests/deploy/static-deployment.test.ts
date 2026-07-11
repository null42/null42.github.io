import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import YAML from 'yaml'

const read = (file: string) => fs.readFileSync(path.resolve(file), 'utf8')

const packageJson = JSON.parse(read('package.json'))
const astroConfig = read('astro.config.mjs')
const workflowSource = read('.github/workflows/deploy.yml')
const workflow = YAML.parse(workflowSource)
const gitignore = read('.gitignore')
const pnpmConfig = read('.npmrc')

const projectContract = [
  astroConfig,
  JSON.stringify(packageJson),
  workflowSource,
].join('\n').toLowerCase()

describe('static deployment contract', () => {
  it('configures Astro for static output', () => {
    expect(astroConfig).toMatch(/output:\s*["']static["']/)
  })

  it('contains no Cloudflare adapter, Wrangler, Worker, KV, Vectorize, AI binding or backend script', () => {
    expect(projectContract).not.toMatch(/@astrojs\/cloudflare|wrangler|cloudflare adapter/)
    expect(projectContract).not.toMatch(/vectorize|workers ai|ai binding|kv binding/)
    expect(Object.keys(packageJson.scripts)).not.toEqual(expect.arrayContaining(['build-index', 'worker', 'deploy:worker']))
  })

  it('keeps local references, stores and caches under ignored env', () => {
    expect(gitignore.split(/\r?\n/)).toContain('env/')
    expect(pnpmConfig).toMatch(/store-dir=env\/pnpm-store/)
    expect(pnpmConfig).toMatch(/cache-dir=env\/pnpm-cache/)
    expect(pnpmConfig).toMatch(/state-dir=env\/pnpm-state/)
  })

  it('deploys production Pages only for pushes to main', () => {
    expect(workflow.on.push.branches).toEqual(['main'])
    expect(workflow.jobs.deploy.environment.name).toBe('github-pages')
  })
})
