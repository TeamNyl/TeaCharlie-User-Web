// Created by Sean L. on Aug. 10.
// Last Updated by Sean L. on Aug. 10.
// 
// TeaCharlie-User-Web
// src/main.ts
// 
// Team Nil, 2025. All rights reserved.

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
