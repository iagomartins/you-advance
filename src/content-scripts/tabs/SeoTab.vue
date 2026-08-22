<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Otimização de SEO</h2>

    <div class="mb-4">
      <button
        @click="optimizeSEO"
        :disabled="!canOptimize || isOptimizing"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-600 transition-colors text-sm font-medium"
      >
        {{ isOptimizing ? 'Otimizando...' : 'Otimizar Título e Descrição' }}
      </button>
    </div>

    <div v-if="results" class="space-y-4">
      <div>
        <h3 class="font-semibold mb-2 text-sm">Sugestões de Título:</h3>
        <div class="space-y-2">
          <div v-for="(title, type) in results.titles" :key="type" class="p-2 bg-gray-800 rounded text-sm">
            <span class="text-xs text-gray-400 capitalize">{{ type }}:</span>
            <p class="mt-1">{{ title }}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-2 text-sm">Tags Sugeridas:</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in results.tags"
            :key="tag"
            class="px-2 py-1 bg-gray-700 rounded text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-400 text-sm">
      <p>Configure sua chave do Gemini nas configurações para começar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../../store/userStore'
import { GeminiService, type GeminiResponse } from '../../services/geminiService'

const userStore = useUserStore()
const isOptimizing = ref(false)
const results = ref<GeminiResponse | null>(null)

const canOptimize = computed(() => {
  return userStore.geminiKey && userStore.targetNiche
})

const optimizeSEO = async () => {
  if (!canOptimize.value) {
    alert('Configure sua chave do Gemini e nicho alvo nas configurações.')
    return
  }

  isOptimizing.value = true

  try {
    // Tentar coletar título e descrição do DOM do YouTube Studio
    const titleElement = document.querySelector('input[aria-label*="título"]') as HTMLInputElement
    const descriptionElement = document.querySelector('textarea[aria-label*="descrição"]') as HTMLTextAreaElement
    
    const title = titleElement?.value || 'Título do Vídeo'
    const description = descriptionElement?.value || 'Descrição do vídeo'

    if (!title || title === 'Título do Vídeo') {
      alert('Não foi possível detectar título. Use valores padrão ou configure manualmente.')
      // Continuar com valores padrão para demo
    }

    const service = new GeminiService(userStore.geminiKey)
    results.value = await service.optimizeSEO(title, description, userStore.customSlangs, userStore.targetNiche)
  } catch (error) {
    alert('Erro ao otimizar: ' + (error as Error).message)
    console.error(error)
  } finally {
    isOptimizing.value = false
  }
}

onMounted(() => {
  userStore.loadFromStorage()
})
</script>
