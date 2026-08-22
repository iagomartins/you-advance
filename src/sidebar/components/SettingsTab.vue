<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Configurações</h2>

    <form @submit.prevent="saveSettings" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2">Chave do Gemini</label>
        <input
          v-model="form.geminiKey"
          type="password"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Cole sua chave da API do Gemini"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Descrição do Canal</label>
        <textarea
          v-model="form.channelDescription"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Descreva seu canal para contextualizar as otimizações"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Nicho Alvo</label>
        <input
          v-model="form.targetNiche"
          type="text"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Tecnologia, Jogos, Educação"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Gírias Customizadas</label>
        <textarea
          v-model="customSlangsText"
          class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Separe por vírgulas: ex: mano, fera, top"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
      >
        Salvar Configurações
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '../../store/userStore'

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
  alert('Configurações salvas!')
}

onMounted(async () => {
  await userStore.loadFromStorage()
  form.geminiKey = userStore.geminiKey
  form.channelDescription = userStore.channelDescription
  form.targetNiche = userStore.targetNiche
  customSlangsText.value = Array.isArray(userStore.customSlangs) ? userStore.customSlangs.join(', ') : ''
})
</script>