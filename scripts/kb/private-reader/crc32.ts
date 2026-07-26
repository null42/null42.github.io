/**
 * CRC32 计算（用于 ZIP 文件格式）
 *
 * 标准的 CRC-32 算法，多项式 0xEDB88320。
 */

const TABLE = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let crc = i
    for (let j = 0; j < 8; j++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xEDB88320 : crc >>> 1
    }
    table[i] = crc >>> 0
  }
  return table
})()

export const CRC32 = {
  /**
   * 计算 Buffer 的 CRC-32 校验值。
   */
  compute(data: Buffer): number {
    let crc = 0xFFFFFFFF
    for (let i = 0; i < data.length; i++) {
      crc = (crc >>> 8) ^ TABLE[(crc ^ data[i]) & 0xFF]
    }
    return (crc ^ 0xFFFFFFFF) >>> 0
  }
}
