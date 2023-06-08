import { createApp } from 'vue'
import './scss/_style.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).use(Antd).mount('#app')
