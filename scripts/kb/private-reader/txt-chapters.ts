import type { TxtSegment } from './txt-slicer'

export interface TxtChapter {
  title: string
  charOffset: number
  segmentIndex: number
}

const chapterMarker = String.raw`(?:\u7b2c[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u96f6\u3007\u4e24\d]+[\u7ae0\u8282\u56de\u5377\u90e8\u7bc7\u96c6]|(?:chapter|part|volume)\s+[\divxlcdm]+)`
const chapterLinePattern = new RegExp(
  String.raw`^[\t ]*(${chapterMarker})(?:[\t ]*[:\uFF1A.\-\u2014]?[\t ]*)([^\r\n]{0,120})`,
  'gim',
)

export function extractTxtChapters(text: string, segments: TxtSegment[]): TxtChapter[] {
  const chapters: TxtChapter[] = []
  for (const match of text.matchAll(chapterLinePattern)) {
    const marker = match[1].replace(/\s+/g, ' ').trim()
    const suffix = compactChapterSuffix(match[2] || '')
    const title = suffix ? `${marker} ${suffix}` : marker
    if (title.length > 64) continue
    const charOffset = match.index || 0
    const segmentIndex = findSegmentIndex(segments, charOffset)
    const previous = chapters.at(-1)
    if (previous?.segmentIndex === segmentIndex && previous.title === title) continue
    chapters.push({ title, charOffset, segmentIndex })
  }
  return chapters
}

function compactChapterSuffix(value: string): string {
  const sentence = value.trim().split(/[\u3002\uFF01\uFF1F!?;\uFF1B]/, 1)[0].trim()
  if (!sentence) return ''
  const firstToken = sentence.match(/^[^\s\uFF0C,\uFF1A:\u3002\uFF01\uFF1F!?;\uFF1B]{1,28}/)?.[0]
  const remainder = firstToken ? sentence.slice(firstToken.length).trimStart() : ''
  if (firstToken && remainder.startsWith(firstToken)) return firstToken
  const words = sentence.split(/\s+/).filter(Boolean)
  if (words.length >= 2 && normalizeToken(words[0]) === normalizeToken(words[1])) return words[0].slice(0, 28)
  if (sentence.length <= 36) return sentence
  const compact = sentence.match(/^[^\uFF0C,\uFF1A:\s]{1,28}/)?.[0]
  return (compact || sentence.slice(0, 28)).trim()
}

function normalizeToken(value: string): string {
  return value.replace(/[\uFF0C,\u3002\uFF01\uFF1F!?\uFF1A:;\uFF1B\u3001]/g, '').toLowerCase()
}

function findSegmentIndex(segments: TxtSegment[], charOffset: number): number {
  let index = 0
  for (let cursor = 0; cursor < segments.length; cursor += 1) {
    if (segments[cursor].charOffset > charOffset) break
    index = cursor
  }
  return index
}
