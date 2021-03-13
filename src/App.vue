<template>
  <teleport to='body'>
    <Loading :isLoading='loading'></Loading>
  </teleport>
  <Modal>
    <template v-slot:header>
      <h5>{{modalComponent}}</h5>
    </template>
    <component :is="modalComponent"></component>
  </Modal>
  <Navbar :screenSize='screenWidth' :scrollPos="scroll"></Navbar>
  <Banner></Banner>
  <div>
    <img class="divider divider-top" src="~@/assets/divider.svg" alt="">
  </div>
    <router-view v-slot="{ Component }">
      <transition name="change">
        <component :is="Component"></component>
      </transition>
    </router-view>
  <div>
    <img class="divider divider-bottom" src="~@/assets/divider.svg" alt="">
  </div>
  <Footer></Footer>
</template>
<script lang="ts">
import { screenSize } from '@/hook/screenSize'
import { scrollPosition } from '@/hook/scrollTop'
import Banner from '@/components/banner.vue'
import { useStore } from 'vuex'
import { defineComponent, computed, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/footer.vue'
import Modal from '@/components/modal.vue'
import Loading from '@/components/loading.vue'
import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    Navbar,
    Banner,
    Footer,
    Modal,
    Loading
  },
  setup () {
    const modalComponent = ref('')
    const dialogMessage = ref('')
    const store = useStore()
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
    screenSize()
    scrollPosition()
    const scroll = computed(() => {
      return store.getters.getScroll
    })
    const loading = computed(() => {
      return store.getters.getLoading
    })
    return { screenWidth, scroll, modalComponent, loading, dialogMessage }
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
  background-image: url('~@/assets/background.svg');
  background-color: #efd2c4;
}
.divider {
  height: 50px;
  @media (max-width: 579px) {
    height: 30px;
  }
}
.divider-top {
  transform: rotate(180deg);
}
.divider-bottom {
  transform: rotate(0deg);
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.change-enter-from, .change-leave-to {
  opacity: 0;
}
.change-enter-to, .change-leave-from {
  opacity: 1;
}
.change-enter-active, .change-leave-active {
  transition: all 0.8s ease;
}
</style>
