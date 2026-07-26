import { describe, it, expect } from 'vitest'
import crypto from 'node:crypto'
import {
  ITERATIONS,
  SALT_LEN,
  IV_LEN,
  KEY_LEN,
  deriveKey,
  encryptSegment,
  decryptSegment,
  encryptField,
  decryptField
} from '../../../scripts/kb/private-reader/crypto'

describe('private-reader crypto primitives', () => {
  describe('constants', () => {
    it('uses OWASP-recommended 210000 PBKDF2 iterations', () => {
      expect(ITERATIONS).toBe(210_000)
    })

    it('uses 16-byte salt', () => {
      expect(SALT_LEN).toBe(16)
    })

    it('uses 12-byte GCM IV', () => {
      expect(IV_LEN).toBe(12)
    })

    it('uses 32-byte (256-bit) key', () => {
      expect(KEY_LEN).toBe(32)
    })
  })

  describe('deriveKey', () => {
    it('returns a 32-byte Buffer', () => {
      const salt = crypto.randomBytes(SALT_LEN)
      const key = deriveKey('test-password', salt)
      expect(key).toBeInstanceOf(Buffer)
      expect(key.length).toBe(32)
    })

    it('is deterministic for the same password and salt', () => {
      const salt = Buffer.alloc(SALT_LEN, 0xab)
      const key1 = deriveKey('same-password', salt)
      const key2 = deriveKey('same-password', salt)
      expect(key1.equals(key2)).toBe(true)
    })

    it('produces different keys for different salts', () => {
      const salt1 = crypto.randomBytes(SALT_LEN)
      const salt2 = crypto.randomBytes(SALT_LEN)
      const key1 = deriveKey('password', salt1)
      const key2 = deriveKey('password', salt2)
      expect(key1.equals(key2)).toBe(false)
    })

    it('respects explicit iteration override', () => {
      const salt = crypto.randomBytes(SALT_LEN)
      const keyDefault = deriveKey('pw', salt)
      const keyCustom = deriveKey('pw', salt, 50_000)
      expect(keyDefault.equals(keyCustom)).toBe(false)
    })
  })

  describe('encryptSegment / decryptSegment', () => {
    it('encrypts and decrypts back to the original plaintext', () => {
      const salt = crypto.randomBytes(SALT_LEN)
      const key = deriveKey('round-trip-password', salt)
      const plaintext = 'Hello, private reader! 这是中文测试文本。'

      const { iv, ciphertext } = encryptSegment(plaintext, key)
      const decrypted = decryptSegment(ciphertext, key, iv)

      expect(decrypted).toBe(plaintext)
    })

    it('returns a 12-byte IV', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const { iv } = encryptSegment('text', key)
      expect(iv).toBeInstanceOf(Buffer)
      expect(iv.length).toBe(IV_LEN)
    })

    it('produces ciphertext longer than plaintext (includes authTag)', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const plaintext = 'a'.repeat(100)
      const { ciphertext } = encryptSegment(plaintext, key)
      // AES-GCM adds 16-byte authTag; ciphertext = encrypted + tag
      expect(ciphertext.length).toBeGreaterThan(100)
      expect(ciphertext.length).toBe(100 + 16)
    })

    it('generates different IVs for subsequent calls', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const { iv: iv1 } = encryptSegment('text', key)
      const { iv: iv2 } = encryptSegment('text', key)
      expect(iv1.equals(iv2)).toBe(false)
    })

    it('produces different ciphertexts for the same plaintext under different IVs', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const plaintext = 'same plaintext'

      const { iv: iv1, ciphertext: ct1 } = encryptSegment(plaintext, key)
      const { iv: iv2, ciphertext: ct2 } = encryptSegment(plaintext, key)

      expect(iv1.equals(iv2)).toBe(false)
      expect(ct1.equals(ct2)).toBe(false)
      // Ciphertext prefixes must differ (GCM with distinct IVs)
      expect(ct1.subarray(0, 16).equals(ct2.subarray(0, 16))).toBe(false)

      // Both should decrypt back to the same plaintext
      expect(decryptSegment(ct1, key, iv1)).toBe(plaintext)
      expect(decryptSegment(ct2, key, iv2)).toBe(plaintext)
    })

    it('supports large segments (256 KiB)', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const plaintext = 'x'.repeat(256 * 1024)
      const { iv, ciphertext } = encryptSegment(plaintext, key)
      const decrypted = decryptSegment(ciphertext, key, iv)
      expect(decrypted).toBe(plaintext)
      expect(decrypted.length).toBe(256 * 1024)
    })

    it('throws on tampered ciphertext (authTag verification)', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const { iv, ciphertext } = encryptSegment('original', key)
      // Flip a bit in the ciphertext
      const tampered = Buffer.from(ciphertext)
      tampered[0] ^= 0x01
      expect(() => decryptSegment(tampered, key, iv)).toThrow()
    })

    it('throws on wrong key', () => {
      const salt = crypto.randomBytes(SALT_LEN)
      const key1 = deriveKey('correct-password', salt)
      const key2 = deriveKey('wrong-password', salt)
      const { iv, ciphertext } = encryptSegment('secret', key1)
      expect(() => decryptSegment(ciphertext, key2, iv)).toThrow()
    })
  })

  describe('encryptField / decryptField', () => {
    // encryptField encrypts a short string (title, author) and returns
    // a base64 string with iv prepended, for storage in manifest.json
    it('encrypts and decrypts a short field value', () => {
      const salt = crypto.randomBytes(SALT_LEN)
      const key = deriveKey('field-password', salt)
      const title = '我的私密书名'

      const encrypted = encryptField(title, key)
      const decrypted = decryptField(encrypted, key)

      expect(decrypted).toBe(title)
    })

    it('returns a base64 string', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const encrypted = encryptField('title', key)
      expect(typeof encrypted).toBe('string')
      // Must be valid base64
      expect(() => Buffer.from(encrypted, 'base64')).not.toThrow()
    })

    it('produces different output for the same input (random IV)', () => {
      const key = deriveKey('pw', crypto.randomBytes(SALT_LEN))
      const e1 = encryptField('same', key)
      const e2 = encryptField('same', key)
      expect(e1).not.toBe(e2)
      // Both decrypt to the same value
      expect(decryptField(e1, key)).toBe('same')
      expect(decryptField(e2, key)).toBe('same')
    })
  })
})
