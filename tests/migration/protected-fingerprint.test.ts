import { describe, expect, it } from 'vitest'
import {
  extractAttachmentSourcePaths,
  protectedContentFingerprint,
  protectedSourceId,
} from '../../scripts/migration/protected-fingerprint'

describe('protected migration fingerprints', () => {
  it('rejects Windows backslashes before attachment paths reach path.resolve', () => {
    expect(() => extractAttachmentSourcePaths('![x](..\\..\\outside-secret.txt)', 'content/encrypted/demo.md')).toThrow(/backslash/)
    expect(() => extractAttachmentSourcePaths('<EncryptedArticle payload-url="/content/encrypted%5C..%5Csecret.json" />', 'content/encrypted/demo.md')).toThrow(/backslash/)
  })

  it('uses a secret HMAC key and canonical text line endings', () => {
    const firstKey = 'first-test-protected-fingerprint-key-32-bytes'
    const secondKey = 'second-test-protected-fingerprint-key-32-bytes'
    expect(protectedContentFingerprint(Buffer.from('line one\r\nline two\r\n'), firstKey)).toBe(protectedContentFingerprint(Buffer.from('line one\nline two\n'), firstKey))
    expect(protectedContentFingerprint(Buffer.from('secret'), firstKey)).not.toBe(protectedContentFingerprint(Buffer.from('secret'), secondKey))
    expect(protectedSourceId('content/encrypted/demo.md', firstKey)).not.toBe(protectedSourceId('content/encrypted/demo.md', secondKey))
  })
})
