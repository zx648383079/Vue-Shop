import './assets/iconfont/iconfont.css';
import './assets/css/style.scss'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import emitter from './event';
import { createDialog } from './components/Dialog/plugin'
import { createDirective } from './directives';
import { createSerive } from './services';


const app = createApp(App, {
    onscroll(e: Event) {
        emitter.emit('scroll', e);
    }
})

app.use(createPinia())
app.use(createDialog())
app.use(createDirective())
app.use(createSerive())
app.use(router)

app.mount('#app')
