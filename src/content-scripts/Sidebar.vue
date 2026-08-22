<template>
  <div class="h-screen bg-gray-900 text-white flex flex-col">
    <header class="p-4 border-b border-gray-700">
      <h1 class="text-xl font-bold">🇧🇷 YT-SEO-BR</h1>
    </header>

    <nav class="flex border-b border-gray-700">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex-1 py-2 px-4 text-center transition-colors text-sm',
          activeTab === tab.id ? 'bg-gray-800 border-b-2 border-blue-500' : 'hover:bg-gray-800'
        ]"
      >
        {{ tab.label }}
      </button>
    </nav>

    <main class="flex-1 overflow-y-auto p-4">
      <SeoTab v-if="activeTab === 'seo'" />
      <SettingsTab v-if="activeTab === 'settings'" />
      <Donation v-if="activeTab === 'donation'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SeoTab from './tabs/SeoTab.vue'
import SettingsTab from './tabs/SettingsTab.vue'
import Donation from './tabs/Donation.vue'

const activeTab = ref('seo')

const tabs = [
  { id: 'seo', label: 'SEO' },
  { id: 'settings', label: 'Configurações' },
  { id: 'donation', label: 'Apoio' }
]
</script>
