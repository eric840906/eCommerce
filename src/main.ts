import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@/plugins/font-awesome'
import login from '@/components/Form/login.vue'
import signup from '@/components/Form/signup.vue'
import logout from '@/components/Form/logout.vue'
import loading from '@/components/singleLoading.vue'
import productForm from '@/components/Form/productForm.vue'
import cropper from '@/components/Form/updateProfilePic.vue'
import Toast, { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.scss'
const app = createApp(App)
const toastOptions: PluginOptions = {}
app.component('login', login)
app.component('signup', signup)
app.component('logout', logout)
app.component('cropper', cropper)
app.component('loading', loading)
app.component('productForm', productForm)
app.use(Toast, toastOptions)
app
  .use(store)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
