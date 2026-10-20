import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const app1 = createApp(App)
const app2 = createApp(App)

app.use(createPinia())

app.mount('#app')
app1.mount('#app1')

