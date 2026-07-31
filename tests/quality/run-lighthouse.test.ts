import { describe, expect, it, vi } from 'vitest'
import {
  fetchPreviewHealth,
  getCommitSha,
  normalizeExternalBaseUrl,
  stopPosixProcessGroup,
  waitForPreview,
} from '../../scripts/quality/run-lighthouse'

describe('Lighthouse runner lifecycle', () => {
  it('times out a hanging preview health request so callers can retry', async () => {
    vi.useFakeTimers()
    const fetchImpl = vi.fn((_url: string | URL | Request, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')))
    }))

    const health = expect(fetchPreviewHealth('http://127.0.0.1:4321', 250, fetchImpl))
      .rejects.toMatchObject({ name: 'AbortError' })
    await vi.advanceTimersByTimeAsync(250)

    await health
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it('retries preview health checks after a timed-out attempt', async () => {
    vi.useFakeTimers()
    const fetchHealth = vi.fn()
      .mockRejectedValueOnce(new DOMException('aborted', 'AbortError'))
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
    const ready = waitForPreview('http://127.0.0.1:4321', { exitCode: null }, 2, 100, fetchHealth)

    await vi.advanceTimersByTimeAsync(100)
    await ready

    expect(fetchHealth).toHaveBeenCalledTimes(2)
    vi.useRealTimers()
  })

  it('kills the POSIX process group after the grace period even if the parent exited', async () => {
    vi.useFakeTimers()
    const kill = vi.fn()
    const cleanup = stopPosixProcessGroup(4242, kill, 500)

    expect(kill).toHaveBeenCalledWith(-4242, 'SIGTERM')
    await vi.advanceTimersByTimeAsync(500)
    await cleanup

    expect(kill).toHaveBeenCalledWith(-4242, 'SIGKILL')
    vi.useRealTimers()
  })

  it('normalizes a safe external origin and rejects suspicious URL components', () => {
    expect(normalizeExternalBaseUrl('https://example.com/')).toBe('https://example.com')
    expect(normalizeExternalBaseUrl('http://127.0.0.1:4321///')).toBe('http://127.0.0.1:4321')

    for (const value of [
      'ftp://example.com',
      'https://user:pass@example.com',
      'https://example.com/preview',
      'https://example.com?target=other',
      'https://example.com#fragment',
    ]) {
      expect(() => normalizeExternalBaseUrl(value)).toThrow(/QUALITY_BASE_URL/)
    }
  })

  it('prefers GITHUB_SHA and falls back to git rev-parse HEAD', () => {
    // GitHub Actions 上 GITHUB_SHA 被设置为 commit SHA，stub 为空字符串以测试 fallback 逻辑
    vi.stubEnv('GITHUB_SHA', '')
    const resolveGitSha = vi.fn(() => 'local-head\n')

    expect(getCommitSha('ci-sha', resolveGitSha)).toBe('ci-sha')
    expect(resolveGitSha).not.toHaveBeenCalled()
    expect(getCommitSha(undefined, resolveGitSha)).toBe('local-head')
    vi.unstubAllEnvs()
  })
})
