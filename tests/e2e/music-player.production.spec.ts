import { expect, test } from '@playwright/test'

test('plays only local media and keeps one store across Swup navigation', async ({ page }) => {
  const mediaRequests: string[] = []
  page.on('request', (request) => {
    if (request.resourceType() === 'media') mediaRequests.push(request.url())
  })

  await page.goto('/music/')
  const player = page.locator('[data-music-player].music-player--full')
  await expect(player).toBeVisible()
  await expect(player.locator('[data-music-title]')).toHaveText("Omg it's ビビデバ")
  await expect(player.locator('[data-music-lyrics]')).toContainText('暂无歌词')

  const audioSource = await page.evaluate(() => {
    const audio = document.querySelector<HTMLAudioElement>('[data-null42-music-audio]')
    return audio?.src ?? ''
  })
  expect(new URL(audioSource).pathname).toBe('/assets/music/omg-its-vivideva.mp3')

  await player.locator('[data-music-action="toggle"]').click()
  await expect(player).toHaveAttribute('data-music-playing', 'true')
  await player.locator('[data-music-action="toggle"]').click()
  await expect(player).toHaveAttribute('data-music-playing', 'false')

  await page.evaluate(() => {
    const windowRef = window as Window & Record<string, any>
    windowRef.__musicStoreIdentity = windowRef.__null42MusicPlayerStore
    windowRef.__null42MusicPlayerStore.seek(42)
    windowRef.swup.navigate('/list/')
  })
  await page.waitForURL('**/list/')
  await page.evaluate(() => (window as Window & Record<string, any>).swup.navigate('/music/'))
  await page.waitForURL('**/music/')

  const persisted = await page.evaluate(() => {
    const windowRef = window as Window & Record<string, any>
    return {
      sameStore: windowRef.__musicStoreIdentity === windowRef.__null42MusicPlayerStore,
      currentTime: windowRef.__null42MusicPlayerStore.getState().currentTime,
    }
  })
  expect(persisted.sameStore).toBe(true)
  expect(persisted.currentTime).toBeCloseTo(42, 0)
  expect(mediaRequests.every((requestUrl) => new URL(requestUrl).origin === 'http://127.0.0.1:4321')).toBe(true)
})
