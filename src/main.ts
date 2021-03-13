import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@/plugins/font-awesome'
import login from '@/components/Form/login.vue'
import signup from '@/components/Form/signup.vue'
import Toast, { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.scss'
const app = createApp(App)
const toastOptions: PluginOptions = {}
app.component('login', login)
app.component('signup', signup)
app.use(Toast, toastOptions)
app
  .use(store)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
