import fs from 'node:fs/promises'
import path from 'node:path'
import { repoRoot } from '../paths'
import { validateNavigationCoverage } from './build-navigation'
import type { NavigationCoverage } from './build-navigation'

const reportPath = path.join(repoRoot, 'reports/knowledge-navigation-coverage.json')
const coverage = JSON.parse(await fs.readFile(reportPath, 'utf8')) as NavigationCoverage
const issues = validateNavigationCoverage(coverage)

if (issues.length > 0) {
  for (const issue of issues) console.error(`error: ${issue}`)
  process.exitCode = 1
} else {
  console.log(`validated navigation coverage for ${coverage.counts.articles} articles`)
}
