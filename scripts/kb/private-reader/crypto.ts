/**
 * 统一加密原语：AES-256-GCM + PBKDF2-SHA256
 *
 * 构建期使用 Node.js crypto 模块。
 * 参数与 scripts/kb/encrypt/encrypt.ts 对齐（210000 轮）。
 * 浏览器端使用 Web Crypto API（见 src/utils/private-reader-controller.ts）。
 *
 * 安全要点：
 * - 每段独立 12 字节随机 IV（GCM 模式下同 key 绝不允许复用 IV）
 * - 每本书独立 16 字节随机 salt（防止跨书彩虹表）
 * - GCM authTag 提供完整性认证（密文被篡改则解密失败）
 */

import crypto from 'node:crypto'

/** PBKDF2 迭代次数，符合 OWASP 2023 推荐 */
export const ITERATIONS = 210_000

/** Salt 长度（字节） */
export const SALT_LEN = 16

/** GCM IV 长度（字节） */
export const IV_LEN = 12

/** AES-256 密钥长度（字节） */
export const KEY_LEN = 32

/** GCM 认证标签长度（字节） */
export const AUTH_TAG_LEN = 16

/**
 * 从密码派生 AES-256 密钥。
 *
 * @param password 用户密码
 * @param salt 每本书独立的 16 字节 salt
 * @param iterations PBKDF2 迭代次数，默认 210000
 * @returns 32 字节密钥 Buffer
 */
export function deriveKey(
  password: string,
  salt: Buffer,
  iterations: number = ITERATIONS
): Buffer {
  return crypto.pbkdf2Sync(password, salt, iterations, KEY_LEN, 'sha256')
}

/**
 * 加密一个文本段。
 *
 * 每次调用生成独立随机 IV，确保 GCM 安全性。
 * 密文格式：ciphertext || authTag（拼接后返回）。
 *
 * @param plaintext UTF-8 文本
 * @param key 32 字节 AES-256 密钥
 * @returns { iv: 12字节Buffer, ciphertext: 密文+authTag Buffer }
 */
export function encryptSegment(
  plaintext: string,
  key: Buffer
): { iv: Buffer; ciphertext: Buffer } {
  const iv = crypto.randomBytes(IV_LEN)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final()
  ])
  const tag = cipher.getAuthTag()
  return {
    iv,
    ciphertext: Buffer.concat([encrypted, tag])
  }
}

/**
 * 解密一个文本段。
 *
 * @param ciphertext 密文+authTag（与 encryptSegment 输出格式一致）
 * @param key 32 字节 AES-256 密钥
 * @param iv 12 字节 IV（与加密时一致）
 * @returns UTF-8 明文
 * @throws 如果密文被篡改或 key/iv 不正确
 */
export function decryptSegment(
  ciphertext: Buffer,
  key: Buffer,
  iv: Buffer
): string {
  const encrypted = ciphertext.subarray(0, ciphertext.length - AUTH_TAG_LEN)
  const tag = ciphertext.subarray(ciphertext.length - AUTH_TAG_LEN)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

/**
 * 加密一个短字段（标题、作者等）。
 *
 * 输出格式：base64(iv || ciphertext || authTag)
 * 适合直接存入 manifest.json 的加密字段。
 *
 * @param value UTF-8 短文本
 * @param key 32 字节 AES-256 密钥
 * @returns base64 编码的加密字段
 */
export function encryptField(value: string, key: Buffer): string {
  const iv = crypto.randomBytes(IV_LEN)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([
    cipher.update(value, 'utf8'),
    cipher.final()
  ])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, encrypted, tag]).toString('base64')
}

/**
 * 解密一个短字段。
 *
 * @param encryptedBase64 base64 编码的加密字段（与 encryptField 输出格式一致）
 * @param key 32 字节 AES-256 密钥
 * @returns UTF-8 明文
 * @throws 如果密文被篡改或 key 不正确
 */
export function decryptField(encryptedBase64: string, key: Buffer): string {
  const raw = Buffer.from(encryptedBase64, 'base64')
  const iv = raw.subarray(0, IV_LEN)
  const tag = raw.subarray(raw.length - AUTH_TAG_LEN)
  const encrypted = raw.subarray(IV_LEN, raw.length - AUTH_TAG_LEN)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

/**
 * 生成随机 salt。
 * @returns 16 字节随机 Buffer
 */
export function generateSalt(): Buffer {
  return crypto.randomBytes(SALT_LEN)
}
