import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Student from './pages/Students.vue'
import './style.css'
import Students from './pages/Students.vue'

// 和上一关相比，路由表一个字都没变，只是多了页面里的链接
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/students', component: Students }
  ],
})

createApp(App).use(router).mount('#app')
