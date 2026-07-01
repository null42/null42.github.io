<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  payloadUrl: string
}>()

const password = ref('')
const content = ref('')
const error = ref('')

async function decrypt() {
  error.value = ''
  content.value = ''
  try {
    const payload = await fetch(props.payloadUrl).then((response) => response.json())
    const encrypted = base64ToBytes(payload.ciphertext)
    const ciphertext = encrypted.slice(0, encrypted.length - 16)
    const tag = encrypted.slice(encrypted.length - 16)
    const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password.value), 'PBKDF2', false, ['deriveKey'])
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: base64ToBytes(payload.salt), iterations: payload.iterations, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    )
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: base64ToBytes(payload.iv), tagLength: 128 }, key, concat(ciphertext, tag))
    content.value = new TextDecoder().decode(plaintext)
  } catch {
    error.value = '密码不正确，或加密内容已损坏。'
  }
}

function base64ToBytes(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0))
}

function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length)
  out.set(a)
  out.set(b, a.length)
  return out
}
</script>

<template>
  <section class="kb-encrypted">
    <input v-model="password" class="kb-search-input" type="password" aria-label="文章密码" placeholder="输入文章密码" />
    <button class="kb-button" type="button" @click="decrypt">解锁</button>
    <p v-if="error" class="kb-error">{{ error }}</p>
    <pre v-if="content" class="kb-decrypted"><code>{{ content }}</code></pre>
  </section>
</template>
