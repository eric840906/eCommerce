<template>
  <teleport to='body'>
    <Loading :isLoading='loading'></Loading>
  </teleport>
  <Progressbar></Progressbar>
  <Modal>
      <template v-slot:header>
        <h5>{{modalComponent}}</h5>
      </template>
      <component :is="modalComponent"></component>
  </Modal>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script lang="ts">
import { screenSize } from '@/hook/screenSize'
import { scrollPosition } from '@/hook/scrollTop'
import { useStore } from 'vuex'
import Progressbar from '@/components/progressbar.vue'
import { defineComponent, computed, ref } from 'vue'
import Modal from '@/components/modal.vue'
import Loading from '@/components/loading.vue'
import UserLink from '@/components/User/userLink.vue'
import bus from '@/plugins/bus'
import AOS from 'aos'
AOS.init({
  disable: 'phone'
})
export default defineComponent({
  components: {
    Modal,
    Loading,
    UserLink,
    Progressbar
  },
  setup () {
    const store = useStore()
    store.dispatch('Check')
    const modalComponent = ref('')
    const screenWidth = computed(() => {
      return store.getters.getScreenSize
    })
    const mountModal = (modalName: string) => {
      if (typeof (modalName) === 'string') {
        modalComponent.value = modalName
      }
    }
    bus.on('Login-open', () => mountModal('login'))
    bus.on('Signup-open', () => mountModal('signup'))
    bus.on('Logout-open', () => mountModal('logout'))
    bus.on('Cropper-open', () => mountModal('cropper'))
    bus.on('Product-open', () => mountModal('productForm'))
    bus.on('Product-update', () => mountModal('productForm'))
    screenSize()
    scrollPosition()
    const userLog = computed(() => {
      return store.getters.getUser
    })
    const scroll = computed(() => {
      return store.getters.getScroll
    })
    const loading = computed(() => {
      return store.getters.getLoading
    })
    return { screenWidth, scroll, modalComponent, loading, userLog }
  }
})
</script>
<style lang="scss">
#app {
  font-family: 'Dosis', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('~@/assets/background.png');
  background-color: #efd2c4;
  min-height: 100vh;
}
.top-nav-btn {
  width: 100px;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.8s ease;
}
</style>
