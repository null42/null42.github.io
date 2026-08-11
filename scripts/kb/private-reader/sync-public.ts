import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = path.join(root, 'content', 'private-reader')
const destination = path.join(root, 'public', 'private-reader')

if (!fs.existsSync(source)) {
  fs.rmSync(destination, { recursive: true, force: true })
  console.log('No private-reader content to sync.')
  process.exit(0)
}

fs.rmSync(destination, { recursive: true, force: true })
fs.mkdirSync(destination, { recursive: true })
const copy = (from: string, to: string) => {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const sourcePath = path.join(from, entry.name)
    const destinationPath = path.join(to, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(destinationPath, { recursive: true })
      copy(sourcePath, destinationPath)
    } else {
      fs.copyFileSync(sourcePath, destinationPath)
    }
  }
}
copy(source, destination)
console.log('Synced private-reader encrypted payloads to public/private-reader.')
