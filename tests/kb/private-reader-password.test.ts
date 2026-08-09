import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getPrivateReaderPasswords, PRIVATE_READER_PASSWORD } from '../../scripts/kb/private-reader/password'

describe('private reader shared password', () => {
  it('uses the fixed password for every encryption layer', () => {
    expect(PRIVATE_READER_PASSWORD).toBe('123')
    expect(getPrivateReaderPasswords()).toEqual({ gate: '123', shelf: '123', book: '123' })
  })

  it('does not read password environment variables in the CLI', () => {
    const cli = fs.readFileSync('scripts/kb/private-reader/cli.ts', 'utf8')
    expect(cli).not.toContain('KB_READER_GATE_PASSWORD')
    expect(cli).not.toContain('KB_READER_SHELF_PASSWORD')
    expect(cli).not.toContain('KB_READER_BOOK_PASSWORD')
    expect(cli).toContain('getPrivateReaderPasswords()')
  })
})
