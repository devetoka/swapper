import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'


const app = createApp(App)

// Example: Toggle dark mode based on user preference (you can replace this logic)
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
  document.documentElement.classList.add('light');
} else {
  document.documentElement.classList.remove('light');
}

app.use(createPinia())
app.use(router)

app.mount('#app')
