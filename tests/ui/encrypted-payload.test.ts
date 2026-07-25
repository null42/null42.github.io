// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  bindEncryptedPayload,
  initEncryptedPayloadLifecycle,
} from '../../src/utils/encrypted-payload-controller'

function encryptedRoot(): HTMLElement {
  const root = document.createElement('section')
  root.dataset.encryptedPayload = ''
  root.dataset.payloadUrl = '/encrypted/demo.json'
  root.innerHTML = `
    <form class="encrypted-payload-form">
      <input value="secret" />
      <button type="submit">解密</button>
    </form>
    <p class="encrypted-payload-error hidden"></p>
    <p class="encrypted-payload-status" role="status" aria-live="polite"></p>
    <div class="encrypted-payload-content hidden" tabindex="-1"></div>`
  return root
}

const cryptoRef = {
  subtle: {
    importKey: vi.fn().mockResolvedValue({}),
    deriveKey: vi.fn().mockResolvedValue({}),
    decrypt: vi.fn().mockResolvedValue(new TextEncoder().encode('<p>secret body</p>').buffer),
  },
} as unknown as Crypto

afterEach(() => {
  document.body.innerHTML = ''
  delete (window as Window & { encryptedPayloadLifecycle?: unknown }).encryptedPayloadLifecycle
  vi.restoreAllMocks()
})

describe('encrypted payload lifecycle', () => {
  it('clears the password and moves focus to decrypted content on success', async () => {
    const root = encryptedRoot()
    document.body.append(root)
    const input = root.querySelector<HTMLInputElement>('input')!
    const output = root.querySelector<HTMLElement>('.encrypted-payload-content')!
    const status = root.querySelector<HTMLElement>('.encrypted-payload-status')!
    input.focus()
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      contentType: 'text/html',
      salt: 'AA==',
      iv: 'AA==',
      iterations: 1,
      ciphertext: 'AA==',
    }), { status: 200 }))
    bindEncryptedPayload(root, { crypto: cryptoRef, fetch: fetchImpl })

    root.querySelector<HTMLFormElement>('form')!.requestSubmit()
    await vi.waitFor(() => expect(output.innerHTML).toContain('secret body'))

    expect(input.value).toBe('')
    expect(document.activeElement).toBe(output)
    expect(status.textContent).toBe('解密成功，正文已显示。')
  })

  it('aborts an active payload request and blocks stale DOM writes after dispose', async () => {
    const root = encryptedRoot()
    document.body.append(root)
    let resolveFetch!: (response: Response) => void
    let requestSignal: AbortSignal | undefined
    const fetchImpl = vi.fn((_url: RequestInfo | URL, init?: RequestInit) => {
      requestSignal = init?.signal ?? undefined
      return new Promise<Response>((resolve) => { resolveFetch = resolve })
    })
    const dispose = bindEncryptedPayload(root, { crypto: cryptoRef, fetch: fetchImpl })

    root.querySelector<HTMLFormElement>('form')!.requestSubmit()
    await Promise.resolve()
    expect(fetchImpl).toHaveBeenCalledOnce()
    expect(requestSignal).toBeInstanceOf(AbortSignal)

    dispose()
    expect(requestSignal?.aborted).toBe(true)
    root.remove()
    resolveFetch(new Response(JSON.stringify({
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      contentType: 'text/html',
      salt: 'AA==',
      iv: 'AA==',
      iterations: 1,
      ciphertext: 'AA==',
    }), { status: 200 }))
    await Promise.resolve()
    await Promise.resolve()

    expect(root.querySelector('.encrypted-payload-content')?.innerHTML).toBe('')
  })

  it('uses one Swup hook while disposing departed roots and binding re-entered roots', () => {
    const removeHook = vi.fn()
    let contentReplace!: () => void
    const hooks = {
      on: vi.fn((_name: string, callback: () => void) => {
        contentReplace = callback
        return removeHook
      }),
    }
    const windowRef = Object.assign(window, { swup: { hooks } })
    const fetchImpl = vi.fn().mockResolvedValue(new Response('{}', { status: 500 }))
    const firstRoot = encryptedRoot()
    document.body.append(firstRoot)

    const first = initEncryptedPayloadLifecycle({
      crypto: cryptoRef,
      document,
      fetch: fetchImpl,
      window: windowRef,
    })
    const second = initEncryptedPayloadLifecycle({
      crypto: cryptoRef,
      document,
      fetch: fetchImpl,
      window: windowRef,
    })
    expect(first).toBe(second)
    expect(hooks.on).toHaveBeenCalledOnce()

    firstRoot.remove()
    contentReplace()
    firstRoot.querySelector<HTMLFormElement>('form')!.requestSubmit()
    expect(fetchImpl).not.toHaveBeenCalled()

    const reenteredRoot = encryptedRoot()
    document.body.append(reenteredRoot)
    contentReplace()
    reenteredRoot.querySelector<HTMLFormElement>('form')!.requestSubmit()
    expect(fetchImpl).toHaveBeenCalledOnce()

    first.dispose()
    expect(removeHook).toHaveBeenCalledOnce()
  })
})
