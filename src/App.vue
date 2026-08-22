<template>
  <div class="w-80 h-96 bg-gray-900 text-white p-4 overflow-y-auto">
    <header class="mb-4">
      <h1 class="text-lg font-bold text-center">🇧🇷 YT-SEO-BR</h1>
      <p class="text-sm text-gray-400 text-center">Configurações da Extensão</p>
    </header>

    <form @submit.prevent="saveSettings" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2">Chave do Gemini</label>
        <input
          v-model="form.geminiKey"
          type="password"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Cole sua chave da API do Gemini"
        />
        <p class="text-xs text-gray-500 mt-1">
          Obtenha em: <a href="https://makersuite.google.com/app/apikey" target="_blank" class="text-blue-400 hover:underline">Google AI Studio</a>
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Descrição do Canal</label>
        <textarea
          v-model="form.channelDescription"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          rows="2"
          placeholder="Descreva seu canal para contextualizar as otimizações"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Nicho Alvo</label>
        <input
          v-model="form.targetNiche"
          type="text"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Ex: Tecnologia, Jogos, Educação"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Gírias Customizadas</label>
        <textarea
          v-model="customSlangsText"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          rows="2"
          placeholder="Separe por vírgulas: ex: mano, fera, top"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
      >
        Salvar Configurações
      </button>
    </form>

    <div class="mt-4 pt-4 border-t border-gray-700">
      <p class="text-xs text-gray-500 text-center">
        Acesse o YouTube Studio para usar a otimização de SEO
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from './store/userStore'

const userStore = useUserStore()

const form = reactive({
  geminiKey: '',
  channelDescription: '',
  targetNiche: ''
})

const customSlangsText = ref('')

const saveSettings = async () => {
  userStore.geminiKey = form.geminiKey
  userStore.channelDescription = form.channelDescription
  userStore.targetNiche = form.targetNiche
  userStore.customSlangs = customSlangsText.value.split(',').map(s => s.trim()).filter(s => s)

  await userStore.saveToStorage()
  // Feedback visual
  const button = document.querySelector('button[type="submit"]') as HTMLButtonElement
  if (button) {
    const originalText = button.textContent
    button.textContent = 'Salvo!'
    button.classList.add('bg-green-700')
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove('bg-green-700')
    }, 2000)
  }
}

onMounted(async () => {
  await userStore.loadFromStorage()
  form.geminiKey = userStore.geminiKey
  form.channelDescription = userStore.channelDescription
  form.targetNiche = userStore.targetNiche
  customSlangsText.value = userStore.customSlangs.join(', ')
})
</script>
