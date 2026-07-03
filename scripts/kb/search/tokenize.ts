const COMMON_WORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'this',
  'that',
  'from',
  'into',
  'about',
  '一个',
  '可以',
  '使用',
  '这个',
  '进行',
  '通过',
  '需要'
])

const MAX_TOKENS = 900
const MAX_CHINESE_NGRAMS_PER_PHRASE = 80

export function tokenize(text: string): string[] {
  const tokens = new Set<string>()
  const normalized = text.toLowerCase()

  for (const match of normalized.matchAll(/[a-z0-9]+(?:-[a-z0-9]+)*/g)) {
    addToken(tokens, match[0])
  }

  for (const match of text.matchAll(/[\u4e00-\u9fff]{2,}/g)) {
    const phrase = match[0]
    if (phrase.length <= 12) addToken(tokens, phrase)
    addChineseNgrams(tokens, phrase, 2)
    addChineseNgrams(tokens, phrase, 3)
    if (tokens.size >= MAX_TOKENS) break
  }

  return [...tokens].slice(0, MAX_TOKENS)
}

function addChineseNgrams(tokens: Set<string>, phrase: string, size: number): void {
  const limit = Math.min(phrase.length - size + 1, MAX_CHINESE_NGRAMS_PER_PHRASE)
  for (let index = 0; index < limit; index += 1) {
    addToken(tokens, phrase.slice(index, index + size))
  }
}

function addToken(tokens: Set<string>, token: string): void {
  if (token.length < 2) return
  if (COMMON_WORDS.has(token)) return
  if (tokens.size >= MAX_TOKENS) return
  tokens.add(token)
}
