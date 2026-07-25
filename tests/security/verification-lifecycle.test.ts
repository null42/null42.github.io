import { describe, expect, it, vi } from 'vitest'
import { FailureCollector } from '../../scripts/security/verification-lifecycle'

describe('production verification lifecycle', () => {
  it('attempts every synchronous cleanup and reports every failure', () => {
    const collector = new FailureCollector()
    const finalCleanup = vi.fn()

    collector.capture(() => { throw new Error('source cleanup failed') })
    collector.capture(() => { throw new Error('output cleanup failed') })
    collector.capture(finalCleanup)

    expect(finalCleanup).toHaveBeenCalledOnce()
    expect(() => collector.throwIfAny('cleanup failed')).toThrowError(AggregateError)
    try {
      collector.throwIfAny('cleanup failed')
    } catch (error) {
      expect(error).toBeInstanceOf(AggregateError)
      expect((error as AggregateError).errors.map(String)).toEqual([
        'Error: source cleanup failed',
        'Error: output cleanup failed',
      ])
    }
  })

  it('preserves a primary failure together with asynchronous close failures', async () => {
    const collector = new FailureCollector()
    collector.add(new Error('pagefind query failed'))

    await collector.captureAsync(async () => { throw new Error('browser close failed') })
    await collector.captureAsync(async () => { throw new Error('server close failed') })

    try {
      collector.throwIfAny('verification failed')
    } catch (error) {
      expect(error).toBeInstanceOf(AggregateError)
      expect((error as AggregateError).errors.map(String)).toEqual([
        'Error: pagefind query failed',
        'Error: browser close failed',
        'Error: server close failed',
      ])
    }
  })
})
