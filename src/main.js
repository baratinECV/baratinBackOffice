import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL + '/api/'

store.dispatch('setShop')

createApp(App).use(store).use(router).mount('#app')
