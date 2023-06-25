import './assets/css/theme.scss'
import './assets/iconfont/iconfont.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import emitter from './event';
import { createDialog } from './components/Dialog/plugin'


const app = createApp(App, {
    onscroll(e: Event) {
        emitter.emit('scroll', e);
    }
})

app.use(createPinia())
app.use(createDialog())
app.use(router)

app.mount('#app')
