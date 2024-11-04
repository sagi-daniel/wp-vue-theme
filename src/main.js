import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia' // Ha használsz state management-et
import './style.css'
import App from './App.vue'

import HomePage from '@'

// Router configuration
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./page/HomePage.vue'),
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: () => import('./page/PostPage.vue'),
    },
    // További route-ok...
  ],
})

// Create app
const app = createApp(App)

// Use plugins
app.use(router)
app.use(createPinia()) // Ha használsz Pinia-t

// Mount app
app.mount('#app')
