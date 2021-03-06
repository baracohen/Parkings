import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const app = createApp(App);
    app.use(store).use(router).mount('#app')
    app.config.performance = true;
