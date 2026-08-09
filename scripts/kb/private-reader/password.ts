export const PRIVATE_READER_PASSWORD = '123'

export function getPrivateReaderPasswords(): { gate: string; shelf: string; book: string } {
  return {
    gate: PRIVATE_READER_PASSWORD,
    shelf: PRIVATE_READER_PASSWORD,
    book: PRIVATE_READER_PASSWORD,
  }
}
