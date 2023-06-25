import './assets/css/theme.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia();

import App from './App.vue'
import router from './router'
import emitter from './event';


const app = createApp(App, {
    onscroll(e: Event) {
        emitter.emit('scroll', e);
    }
})

app.use(pinia)
app.use(router)

app.mount('#app')
