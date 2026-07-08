<script setup lang="ts">
import { gcm } from '@noble/ciphers/aes.js'
import { pbkdf2Async } from '@noble/hashes/pbkdf2.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { computed, ref } from 'vue'
import { renderDecryptedMarkdown } from '../encrypted-markdown'

const props = defineProps<{
  payloadUrl: string
}>()

const password = ref('')
const content = ref('')
const error = ref('')
const status = ref('等待输入密码')
const isBusy = ref(false)
let decryptRunId = 0
const renderedContent = computed(() => renderMarkdown(content.value))

async function decrypt() {
  if (isBusy.value) return
  error.value = ''
  content.value = ''
  if (!password.value.trim()) {
    status.value = '等待输入密码'
    error.value = '请输入文章密码。'
    return
  }

  const runId = ++decryptRunId
  isBusy.value = true
  status.value = '正在解密'
  try {
    const payload = await loadPayload(props.payloadUrl)
    const plaintext = await decryptPayload(payload, password.value)
    if (runId !== decryptRunId) return
    content.value = new TextDecoder().decode(plaintext)
    status.value = '解密成功'
  } catch {
    if (runId !== decryptRunId) return
    status.value = '等待输入密码'
    error.value = '密码错误，或加密内容已损坏。'
  } finally {
    if (runId === decryptRunId) isBusy.value = false
  }
}

function renderMarkdown(markdown: string): string {
  return renderDecryptedMarkdown(markdown)
}

interface BrowserEncryptedPayload {
  iterations: number
  salt: string
  iv: string
  ciphertext: string
}

async function loadPayload(url: string): Promise<BrowserEncryptedPayload> {
  if (typeof globalThis.fetch === 'function') {
    const response = await globalThis.fetch(url)
    if (!response.ok) {
      throw new Error(`Payload request failed: ${response.status}`)
    }
    return response.json()
  }

  const Xhr = globalThis.XMLHttpRequest
  if (typeof Xhr !== 'function') {
    throw new Error('No browser payload loader is available.')
  }

  return new Promise((resolve, reject) => {
    const request = new Xhr()
    request.open('GET', url, true)
    request.responseType = 'text'
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        try {
          resolve(JSON.parse(request.responseText) as BrowserEncryptedPayload)
        } catch (err) {
          reject(err)
        }
      } else {
        reject(new Error(`Payload request failed: ${request.status}`))
      }
    }
    request.onerror = () => reject(new Error('Payload request failed.'))
    request.send()
  })
}

async function decryptPayload(payload: BrowserEncryptedPayload, passphrase: string): Promise<Uint8Array> {
  if (window.crypto?.subtle) {
    try {
      const encrypted = base64ToBytes(payload.ciphertext)
      const keyMaterial = await window.crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey'])
      const key = await window.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: base64ToBytes(payload.salt), iterations: payload.iterations, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      )
      const plaintext = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: base64ToBytes(payload.iv), tagLength: 128 }, key, encrypted)
      return new Uint8Array(plaintext)
    } catch {
      // Some embedded browser contexts expose WebCrypto but reject AES-GCM/PBKDF2.
    }
  }

  const key = await pbkdf2Async(sha256, new TextEncoder().encode(passphrase), base64ToBytes(payload.salt), {
    c: payload.iterations,
    dkLen: 32
  })
  return gcm(key, base64ToBytes(payload.iv)).decrypt(base64ToBytes(payload.ciphertext))
}

function base64ToBytes(value: string): Uint8Array {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  const normalized = value.replace(/\s+/g, '')
  const bytes: number[] = []

  for (let index = 0; index < normalized.length; index += 4) {
    const chunk = normalized.slice(index, index + 4)
    const values = Array.from(chunk, (char) => (char === '=' ? 0 : alphabet.indexOf(char)))

    if (values.some((item) => item < 0)) {
      throw new Error('Invalid base64 payload.')
    }

    const packed = (values[0] << 18) | (values[1] << 12) | (values[2] << 6) | values[3]
    bytes.push((packed >> 16) & 255)
    if (chunk[2] !== '=') bytes.push((packed >> 8) & 255)
    if (chunk[3] !== '=') bytes.push(packed & 255)
  }

  return new Uint8Array(bytes)
}

</script>

<template>
  <section class="kb-encrypted">
    <p class="kb-encrypted-status">{{ status }}</p>
    <input v-model="password" class="kb-search-input" type="password" aria-label="文章密码" placeholder="输入文章密码" :disabled="isBusy" />
    <button class="kb-button" type="button" :disabled="isBusy" @click="decrypt">解锁</button>
    <p v-if="error" class="kb-error">{{ error }}</p>
    <article v-if="content" class="kb-decrypted-doc" v-html="renderedContent" />
  </section>
</template>
