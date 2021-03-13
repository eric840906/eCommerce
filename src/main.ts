import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@/plugins/font-awesome'
import login from '@/components/Form/login.vue'
import signup from '@/components/Form/signup.vue'
import './assets/style.scss'
const app = createApp(App)
app.component('login', login)
app.component('signup', signup)
app.use(store).use(router).component('fa', FontAwesomeIcon).mount('#app')
