/**
 * 最简 ZIP writer（仅 stored 模式，无压缩）
 *
 * 用于在测试中创建合成 EPUB 文件，避免引入 archiver 依赖。
 * EPUB 本质是 ZIP，yauzl 可以读取 stored 方式的 ZIP。
 *
 * ZIP 格式参考：https://en.wikipedia.org/wiki/ZIP_(file_format)
 */

import { CRC32 } from './crc32'

interface ZipEntry {
  name: string
  data: Buffer
}

/**
 * 创建一个 ZIP 文件（stored 模式，无压缩）。
 *
 * @param entries 文件名和内容的数组
 * @returns ZIP 文件的 Buffer
 */
export function createZip(entries: ZipEntry[]): Buffer {
  const localHeaders: Buffer[] = []
  const centralHeaders: Buffer[] = []
  let offset = 0

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.name, 'utf-8')
    const crc = CRC32.compute(entry.data)
    const compressedSize = entry.data.length
    const uncompressedSize = entry.data.length

    // Local File Header (30 bytes)
    const localHeader = Buffer.alloc(30)
    localHeader.writeUInt32LE(0x04034b50, 0)  // signature
    localHeader.writeUInt16LE(20, 4)           // version needed
    localHeader.writeUInt16LE(0, 6)            // flags
    localHeader.writeUInt16LE(0, 8)            // compression method (0=stored)
    localHeader.writeUInt16LE(0, 10)           // mod time
    localHeader.writeUInt16LE(0, 12)           // mod date
    localHeader.writeUInt32LE(crc, 14)         // CRC-32
    localHeader.writeUInt32LE(compressedSize, 18)
    localHeader.writeUInt32LE(uncompressedSize, 22)
    localHeader.writeUInt16LE(nameBuf.length, 26)
    localHeader.writeUInt16LE(0, 28)           // extra field length

    const localBlock = Buffer.concat([localHeader, nameBuf, entry.data])
    localHeaders.push(localBlock)

    // Central Directory Header (46 bytes)
    const centralHeader = Buffer.alloc(46)
    centralHeader.writeUInt32LE(0x02014b50, 0)  // signature
    centralHeader.writeUInt16LE(20, 4)           // version made by
    centralHeader.writeUInt16LE(20, 6)           // version needed
    centralHeader.writeUInt16LE(0, 8)            // flags
    centralHeader.writeUInt16LE(0, 10)           // compression method
    centralHeader.writeUInt16LE(0, 12)           // mod time
    centralHeader.writeUInt16LE(0, 14)           // mod date
    centralHeader.writeUInt32LE(crc, 16)         // CRC-32
    centralHeader.writeUInt32LE(compressedSize, 20)
    centralHeader.writeUInt32LE(uncompressedSize, 24)
    centralHeader.writeUInt16LE(nameBuf.length, 28)
    centralHeader.writeUInt16LE(0, 30)           // extra field length
    centralHeader.writeUInt16LE(0, 32)           // comment length
    centralHeader.writeUInt16LE(0, 34)           // disk number
    centralHeader.writeUInt16LE(0, 36)           // internal attrs
    centralHeader.writeUInt32LE(0, 38)           // external attrs
    centralHeader.writeUInt32LE(offset, 42)      // local header offset

    centralHeaders.push(Buffer.concat([centralHeader, nameBuf]))
    offset += localBlock.length
  }

  // End of Central Directory Record (22 bytes)
  const centralSize = centralHeaders.reduce((sum, buf) => sum + buf.length, 0)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)      // signature
  eocd.writeUInt16LE(0, 4)                // disk number
  eocd.writeUInt16LE(0, 6)                // disk with central dir
  eocd.writeUInt16LE(entries.length, 8)   // entries on this disk
  eocd.writeUInt16LE(entries.length, 10)  // total entries
  eocd.writeUInt32LE(centralSize, 12)     // central dir size
  eocd.writeUInt32LE(offset, 16)          // central dir offset
  eocd.writeUInt16LE(0, 20)               // comment length

  return Buffer.concat([...localHeaders, ...centralHeaders, eocd])
}
