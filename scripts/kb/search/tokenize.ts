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

export function tokenize(text: string): string[] {
  const tokens = new Set<string>()
  const normalized = text.toLowerCase()

  for (const match of normalized.matchAll(/[a-z0-9]+(?:-[a-z0-9]+)*/g)) {
    const token = match[0]
    if (token.length >= 2 && !COMMON_WORDS.has(token)) tokens.add(token)
  }

  for (const match of text.matchAll(/[\u4e00-\u9fff]{2,}/g)) {
    const phrase = match[0]
    if (!COMMON_WORDS.has(phrase)) tokens.add(phrase)
    for (let index = 0; index <= phrase.length - 2; index += 1) {
      const pair = phrase.slice(index, index + 2)
      if (!COMMON_WORDS.has(pair)) tokens.add(pair)
    }
    for (let index = 0; index <= phrase.length - 3; index += 1) {
      const triplet = phrase.slice(index, index + 3)
      if (!COMMON_WORDS.has(triplet)) tokens.add(triplet)
    }
  }

  return [...tokens]
}
