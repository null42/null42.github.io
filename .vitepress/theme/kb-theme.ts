/** 首页图库条目 */
export interface GalleryImage {
  src: string
  alt: string
  /** 控制 CSS background-position，避免主体被标题遮挡 */
  position: string
  /** 用于遮罩与文字配色判断 */
  theme: 'dark' | 'light'
}

/** 音乐曲目 */
export interface MusicTrack {
  title: string
  artist: string
  src: string
}

/** 视觉模式开关配置 */
export interface VisualModeConfig {
  /** localStorage 存储键 */
  storageKey: string
  /** 默认模式，首次访问使用 */
  defaultMode: 'simple' | 'visual'
  /** 每日一图偏移量存储键 */
  dailySeedKey: string
  gallery: GalleryImage[]
  music: MusicTrack[]
}

export const kbThemeConfig = {
  radius: 8,
  palette: {
    brand: '#2563eb',
    accent: '#0f766e',
    warm: '#b45309',
    surface: '#ffffff',
    surfaceSoft: '#f6f8fb'
  },
  layout: {
    density: 'knowledge-map',
    cardRadius: 8,
    articleMaxWidth: '960px'
  },
  visualMode: {
    storageKey: 'kb-visual-mode',
    defaultMode: 'simple',
    dailySeedKey: 'kb-home-image-offset',
    gallery: [
      {
        src: '/images/home/home-02.svg',
        alt: '深夜学习空间渐变背景',
        position: 'center',
        theme: 'dark'
      },
      {
        src: '/images/home/home-03.svg',
        alt: '工程笔记暖光渐变背景',
        position: 'center',
        theme: 'dark'
      }
    ],
    music: [] as MusicTrack[]
  } as VisualModeConfig
} as const

export function kbThemeVars(): Record<string, string> {
  return {
    '--kb-radius': `${kbThemeConfig.radius}px`,
    '--kb-accent': kbThemeConfig.palette.accent,
    '--kb-warm': kbThemeConfig.palette.warm,
    '--kb-article-max-width': kbThemeConfig.layout.articleMaxWidth
  }
}
