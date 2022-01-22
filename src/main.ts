import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import emitter from './event';

import 'swiper/scss';
import './assets/iconfont/iconfont.css';

import http from './utils/http';
import title from './utils/title';

createApp(App, {
    onscroll(e: Event) {
        emitter.emit('scroll', e);
    }
}).use(http).use(title).use(store).use(router).mount('#app');
