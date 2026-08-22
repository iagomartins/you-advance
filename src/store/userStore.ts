import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const geminiKey = ref('')
  const channelDescription = ref('')
  const targetNiche = ref('')
  const customSlangs = ref<string[]>([])

  // Função para salvar no chrome.storage.local
  const saveToStorage = async () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.set({
        geminiKey: geminiKey.value,
        channelDescription: channelDescription.value,
        targetNiche: targetNiche.value,
        customSlangs: Array.isArray(customSlangs.value) ? customSlangs.value : []
      })
    }
  }

  // Função para carregar do chrome.storage.local
  const loadFromStorage = async () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      const data = await chrome.storage.local.get(['geminiKey', 'channelDescription', 'targetNiche', 'customSlangs']) as {
        geminiKey?: string
        channelDescription?: string
        targetNiche?: string
        customSlangs?: string[] | any
      }
      geminiKey.value = data.geminiKey || ''
      channelDescription.value = data.channelDescription || ''
      targetNiche.value = data.targetNiche || ''
      customSlangs.value = Array.isArray(data.customSlangs) ? data.customSlangs : []
    }
  }

  return {
    geminiKey,
    channelDescription,
    targetNiche,
    customSlangs,
    saveToStorage,
    loadFromStorage
  }
})