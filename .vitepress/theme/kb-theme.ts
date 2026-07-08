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
  }
} as const

export function kbThemeVars(): Record<string, string> {
  return {
    '--kb-radius': `${kbThemeConfig.radius}px`,
    '--kb-accent': kbThemeConfig.palette.accent,
    '--kb-warm': kbThemeConfig.palette.warm,
    '--kb-article-max-width': kbThemeConfig.layout.articleMaxWidth
  }
}
