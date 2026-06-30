import { writeCompletedFrontmatter } from './articles'

const changed = await writeCompletedFrontmatter()
if (changed.length === 0) {
  console.log('no frontmatter changes needed')
} else {
  console.log(`updated frontmatter in ${changed.length} files:`)
  for (const file of changed) console.log(`- ${file}`)
}
