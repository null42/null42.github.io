import type { CategoryDefaults } from './types'

interface ChapterPreset {
  title: string
  order: number
  group?: string
  groupOrder?: number
  tags?: string[]
}

const motorChapters: Record<string, ChapterPreset> = {
  README: { title: '总览', order: 1, group: '入门与索引', groupOrder: 10 },
  'learning-workspace': { title: '学习工作区', order: 5, group: '入门与索引', groupOrder: 10 },
  'cross-reference': { title: '交叉索引', order: 10, group: '入门与索引', groupOrder: 10 },
  'electronics-basics': { title: '电力电子基础', order: 10, group: '基础与硬件', groupOrder: 20 },
  hardware: { title: '硬件与驱动', order: 20, group: '基础与硬件', groupOrder: 20 },
  mechanical: { title: '机械与编码器', order: 30, group: '基础与硬件', groupOrder: 20 },
  'power-path': { title: '功率链路', order: 40, group: '基础与硬件', groupOrder: 20 },
  'control-theory': { title: '控制理论', order: 10, group: '控制与算法', groupOrder: 30 },
  algorithm: { title: '控制算法', order: 20, group: '控制与算法', groupOrder: 30, tags: ['FOC', 'SVPWM'] },
  'motion-control': { title: '运动控制', order: 30, group: '控制与算法', groupOrder: 30 },
  'pfc-motor-integration': { title: 'PFC 与电机系统', order: 40, group: '控制与算法', groupOrder: 30 },
  simulation: { title: '仿真与调试', order: 10, group: '实践与验证', groupOrder: 40 },
  practice: { title: '工程实践', order: 20, group: '实践与验证', groupOrder: 40 },
  advanced: { title: '进阶专题', order: 30, group: '实践与验证', groupOrder: 40 },
  ODrive: { title: 'ODrive', order: 10, group: '工程与生态', groupOrder: 50 },
  VESC: { title: 'VESC', order: 20, group: '工程与生态', groupOrder: 50 },
  COMPARISON: { title: '方案对比', order: 30, group: '工程与生态', groupOrder: 50 },
  communication: { title: '通信与协议', order: 40, group: '工程与生态', groupOrder: 50 },
  'controllers-evolution': { title: '控制器演进', order: 50, group: '工程与生态', groupOrder: 50 }
}

const powerChapters: Record<string, ChapterPreset> = {
  archive: { title: '历史记录', order: 20 },
  'debug-records': { title: '调试记录', order: 30 },
  docs: { title: '文档', order: 70 },
  projects: { title: '项目实践', order: 40 },
  reference: { title: '参考资料', order: 80 },
  roadmap: { title: '路线图', order: 10 },
  simulations: { title: '仿真结果', order: 50 },
  'weekly-reviews': { title: '周复盘', order: 60 }
}

export function inferPathDefaults(relativePath: string): CategoryDefaults {
  const normalized = relativePath.replace(/\\/g, '/')
  const parts = normalized.split('/')
  const contentIndex = parts.indexOf('content')
  const source = parts[contentIndex + 1]
  const folder = parts[contentIndex + 2]

  if (source === 'motor') {
    return knowledgeDefaults('motor', '电机控制', folder, motorChapters)
  }
  if (source === 'power') {
    return knowledgeDefaults('power', '电源控制', folder, powerChapters)
  }
  return {}
}

function knowledgeDefaults(
  source: string,
  section: string,
  folder: string | undefined,
  chapters: Record<string, ChapterPreset>
): CategoryDefaults {
  if (!folder || folder.includes('.')) {
    return {
      section,
      category: section,
      source,
      defaultTags: [section],
      visibility: 'public'
    }
  }

  const preset = chapters[folder] || { title: folder.replace(/[-_]+/g, ' '), order: 999 }
  return {
    section,
    chapter: folder,
    chapterTitle: preset.title,
    chapterOrder: preset.order,
    navGroup: preset.group,
    navGroupOrder: preset.groupOrder,
    category: preset.title,
    source,
    defaultTags: preset.tags || [preset.title],
    visibility: 'public'
  }
}
