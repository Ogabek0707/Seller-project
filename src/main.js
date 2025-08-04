import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "./plagens/vee-validate"
import VueTheMask from 'vue-the-mask'
import router from './router'
import store from './store'
import "@hennge/vue3-pagination/dist/vue3-pagination.css"

createApp(App).use(store).use(router).mount('#app')
