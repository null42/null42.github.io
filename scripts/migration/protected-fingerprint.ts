import { createHmac } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

export type ProtectedFingerprintKey = string | Buffer
export type ProtectedAttachmentFingerprint = { id: string; fingerprint: string }
export type ProtectedEntryFingerprint = {
  id: string
  contentFingerprint: string
  visibility: 'private' | 'encrypted'
  encrypted: boolean
  attachments: ProtectedAttachmentFingerprint[]
}

const textAttachmentExtensions = new Set(['.css', '.csv', '.html', '.js', '.json', '.md', '.svg', '.txt', '.xml', '.yaml', '.yml'])
export const canonicalizeTextBytes = (content: Buffer) => Buffer.from(content.toString('utf8').replace(/\r\n?/g, '\n'), 'utf8')
export const canonicalizeAttachmentBytes = (content: Buffer, sourcePath: string) => textAttachmentExtensions.has(path.posix.extname(sourcePath).toLowerCase()) ? canonicalizeTextBytes(content) : content

function validatedKey(key: ProtectedFingerprintKey): Buffer {
  const value = Buffer.isBuffer(key) ? key : Buffer.from(key, 'utf8')
  if (value.length < 32) throw new Error('MIGRATION_PROTECTED_FINGERPRINT_KEY must contain at least 32 bytes')
  return value
}

const fingerprint = (domain: string, value: string | Buffer, key: ProtectedFingerprintKey) => createHmac('sha256', validatedKey(key)).update(domain).update('\0').update(value).digest('hex')

export function loadProtectedFingerprintKey(rootDir = process.cwd()): string {
  const environmentKey = process.env.MIGRATION_PROTECTED_FINGERPRINT_KEY?.trim()
  if (environmentKey) return validatedKey(environmentKey).toString('utf8')
  const keyPath = path.resolve(rootDir, 'env/migration-protected-fingerprint.key')
  const fileKey = fs.readFileSync(keyPath, 'utf8').trim()
  return validatedKey(fileKey).toString('utf8')
}

export const protectedSourceId = (sourcePath: string, key: ProtectedFingerprintKey) => fingerprint('firefly-protected-source-v2', sourcePath, key)
export const protectedContentFingerprint = (content: Buffer, key: ProtectedFingerprintKey) => fingerprint('firefly-protected-content-v2', canonicalizeTextBytes(content), key)
export const protectedAttachmentId = (sourcePath: string, key: ProtectedFingerprintKey) => fingerprint('firefly-protected-attachment-source-v2', sourcePath, key)
export const protectedAttachmentFingerprint = (content: Buffer, key: ProtectedFingerprintKey, sourcePath: string) => {
  const canonicalContent = canonicalizeAttachmentBytes(content, sourcePath)
  return fingerprint('firefly-protected-attachment-content-v2', canonicalContent, key)
}

export function extractAttachmentSourcePaths(body: string, sourcePath: string): string[] {
  const targets = new Set<string>()
  const add = (rawTarget: string) => {
    if (/^(?:[a-z]+:|#)/i.test(rawTarget)) return
    const decoded = decodeURIComponent(rawTarget.split('#', 1)[0])
    if (decoded.includes('\\')) throw new Error(`protected attachment backslash paths are forbidden; use forward slashes: ${rawTarget}`)
    const candidate = decoded.startsWith('/')
      ? path.posix.normalize(decoded.slice(1))
      : path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), decoded))
    if (candidate === 'content' || candidate.startsWith('content/')) targets.add(candidate)
  }
  for (const match of body.matchAll(/!\[[^\]]*\]\(([^\s)#]+)(?:#[^)]*)?(?:\s+[^)]*)?\)/g)) add(match[1])
  for (const match of body.matchAll(/payload-url=["']([^"']+)["']/g)) add(match[1])
  return [...targets].sort()
}
