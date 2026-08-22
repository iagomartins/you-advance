import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SidebarApp from './Sidebar.vue'
import '../style.css'

const app = createApp(SidebarApp)
app.use(createPinia())
app.mount('#app')
