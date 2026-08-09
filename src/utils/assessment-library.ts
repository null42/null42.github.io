import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import manifest from '../../content/assessments/manifest.json'

export type AssessmentQuestionType = 'single' | 'multiple' | 'true-false' | 'fill' | 'code'

export interface AssessmentQuestion {
  id: string
  title: string
  prompt: string
  type: AssessmentQuestionType
  options: Array<{ id: string; label: string }>
  correct: string[]
  expected: string
  explanation: string
  gradable: boolean
}

export interface ArticleAssessment {
  id: string
  title: string
  sourcePath: string
  questions: AssessmentQuestion[]
}

type ManifestEntry = { id: string; originalPath: string; path: string; title: string; articlePrefix: string }

function normalizePostId(postId: string): string {
  return postId.replace(/\\/g, '/').replace(/\.mdx?$/i, '').replace(/^content\//, '')
}

function parseQuestionBlocks(body: string): Array<{ title: string; block: string }> {
  const headings = [...body.matchAll(/^###\s+(.+)$/gm)]
  const questions = headings.map((heading, index) => ({
    title: heading[1].trim(),
    block: body.slice((heading.index || 0) + heading[0].length, headings[index + 1]?.index ?? body.length).trim(),
  })).filter(question => /(?:题目|问题|练习|Q\s*\d+)/i.test(question.title))
  if (questions.length) return questions
  const sections = [...body.matchAll(/^##\s+(.+)$/gm)].map((heading, index, all) => ({
    title: heading[1].trim(),
    block: body.slice((heading.index || 0) + heading[0].length, all[index + 1]?.index ?? body.length).trim(),
  })).filter(section => section.block.length > 0)
  return sections.length ? sections : [{ title: '综合练习', block: body.trim() }]
}

function cleanMarkdown(value: string): string {
  return value
    .replace(/^\s*[-*]\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/^>\s?/gm, '')
    .trim()
}

function inferQuestion(title: string, block: string, index: number): AssessmentQuestion {
  const answerMarker = /(?:^|\n)\s*[-*]?\s*\*\*(?:参考答案|答案|解析)[:：]?\*\*\s*/i
  const marker = answerMarker.exec(block)
  const questionPart = marker ? block.slice(0, marker.index).trim() : block
  const explanation = cleanMarkdown(marker ? block.slice(marker.index + marker[0].length) : '原文未提供参考解析。')
  const promptMatch = questionPart.match(/\*\*(?:问题|题目)[:：]?\*\*\s*([\s\S]*)/i)
  const promptSource = promptMatch?.[1] || questionPart
  const options = [...promptSource.matchAll(/^\s*[-*]?\s*([A-H])[.、:：)]\s*(.+)$/gim)].map(option => ({ id: option[1].toUpperCase(), label: cleanMarkdown(option[2]) }))
  const prompt = cleanMarkdown(promptSource.replace(/^\s*[-*]?\s*[A-H][.、:：)]\s*.+$/gim, ''))
  const answerFirstLine = explanation.split(/\r?\n/).find(line => line.trim()) || ''
  const optionAnswers = [...answerFirstLine.matchAll(/(?:^|[\s、,，/])([A-H])(?=$|[\s、,，/:：。])/gi)].map(match => match[1].toUpperCase())
  let type: AssessmentQuestionType = 'fill'
  if (/代码|编程|实现/.test(title) || /```[a-z]*[\s\S]*```/i.test(questionPart)) type = 'code'
  else if (/判断|正确|错误/.test(title) || /(?:正确|错误|对|错)[？?]?$/.test(prompt)) type = 'true-false'
  else if (/多选/.test(title) || optionAnswers.length > 1) type = 'multiple'
  else if (options.length > 1) type = 'single'
  else if (/填空/.test(title)) type = 'fill'

  let correct = optionAnswers
  let expected = cleanMarkdown(answerFirstLine.replace(/^(?:参考答案|答案)[:：]?\s*/i, ''))
  if (type === 'true-false') {
    const truth = answerFirstLine.match(/(?:^|[：:，,。\s])(正确|错误|对|错)(?:$|[，,。\s])/)
    correct = truth ? [truth[1] === '正确' || truth[1] === '对' ? 'true' : 'false'] : []
  }
  const gradable = (type === 'single' || type === 'multiple' || type === 'true-false') ? correct.length > 0 : type === 'fill' && expected.length > 0 && expected.length <= 80
  return { id: `question-${index + 1}`, title, prompt, type, options, correct, expected, explanation, gradable }
}

function loadAssessment(entry: ManifestEntry): ArticleAssessment | null {
  const absolute = path.resolve('content', ...entry.path.split('/'))
  const relative = path.relative(path.resolve('content', 'assessments'), absolute)
  if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(absolute)) return null
  const parsed = matter(fs.readFileSync(absolute, 'utf8'))
  const questions = parseQuestionBlocks(parsed.content).map((question, index) => inferQuestion(question.title, question.block, index))
  if (!questions.length) return null
  return { id: entry.id, title: String(parsed.data.title || entry.title), sourcePath: entry.originalPath, questions }
}

export function loadAssessmentsForPost(postId: string): ArticleAssessment[] {
  const normalized = normalizePostId(postId)
  const directory = path.posix.dirname(normalized).toLowerCase()
  const basename = path.posix.basename(normalized).toLowerCase()
  if (/(?:calculator|animation|explorer|demo)(?:-|$)/i.test(basename)) return []
  return (manifest.entries as ManifestEntry[]).filter(candidate => {
    const candidateDirectory = path.posix.dirname(candidate.originalPath).toLowerCase()
    const prefix = candidate.articlePrefix.toLowerCase()
    return candidateDirectory === directory && (basename === prefix || basename.startsWith(`${prefix}-`))
  }).map(loadAssessment).filter((assessment): assessment is ArticleAssessment => Boolean(assessment))
}

export function loadAssessmentForPost(postId: string): ArticleAssessment | null {
  return loadAssessmentsForPost(postId)[0] || null
}
