<template>
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-4">Apoio ao Projeto</h3>
    <div class="mb-4">
      <label class="block text-xs font-medium mb-2">Valor (R$)</label>
      <input
        v-model.number="value"
        type="number"
        min="0.01"
        step="0.01"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-gray-800 border-gray-700 text-white"
        placeholder="Ex: 10.00"
      />
    </div>
    <button
      @click="generateAndCopyPix"
      class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-xs font-medium"
    >
      Copiar Código Pix
    </button>
    <p v-if="pixCode" class="mt-2 text-xs text-gray-600 break-all bg-gray-800 p-2 rounded">{{ pixCode }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PixService } from '../../services/pixService'

const value = ref<number>(0)
const pixCode = ref<string>('')

const generateAndCopyPix = async () => {
  if (value.value <= 0) {
    alert('Por favor, insira um valor válido.')
    return
  }

  pixCode.value = PixService.generatePix(value.value)

  try {
    // Tentar usar Clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(pixCode.value)
      alert('Código Pix copiado para a área de transferência!')
    } else {
      // Fallback para método antigo
      const textarea = document.createElement('textarea')
      textarea.value = pixCode.value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('Código Pix copiado (método alternativo)!')
    }
  } catch (err) {
    console.error('Erro ao copiar:', err)
    alert('Erro ao copiar. Código: ' + pixCode.value)
  }
}
</script>
