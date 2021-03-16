<template>
  <teleport to='body'>
    <Loading :isLoading='loading'></Loading>
  </teleport>
  <Progrssbar></Progrssbar>
  <Modal>
      <template v-slot:header>
        <h5>{{modalComponent}}</h5>
      </template>
      <component :is="modalComponent"></component>
  </Modal>
  <router-view></router-view>
</template>
<script lang="ts">
import { screenSize } from '@/hook/screenSize'
import { scrollPosition } from '@/hook/scrollTop'
import { useStore } from 'vuex'
import Progrssbar from '@/components/progressbar.vue'
import { defineComponent, computed, ref } from 'vue'
import Modal from '@/components/modal.vue'
import Loading from '@/components/loading.vue'
import UserLink from '@/components/User/userLink.vue'
import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    Modal,
    Loading,
    UserLink,
    Progrssbar
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
  background-image: url('~@/assets/background.svg');
  background-color: #efd2c4;
}
// .divider {
//   height: 50px;
//   @media (max-width: 579px) {
//     height: 30px;
//   }
// }
// .divider-top {
//   transform: rotate(180deg);
// }
// .divider-bottom {
//   transform: rotate(0deg);
// }
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
// .change-enter-from, .change-leave-to {
//   opacity: 0;
// }
// .change-enter-to, .change-leave-from {
//   opacity: 1;
// }
// .change-enter-active, .change-leave-active {
//   transition: all 0.8s ease;
// }
// .bounce-enter-active {
//   animation: bounce-in 1s;
// }
// .bounce-leave-active {
//   animation: bounce-in 1s reverse;
// }
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }
//   25% {
//     transform: scale(1.5);
//   }
//   50% {
//     transform: scale(0.9);
//   }
//   75% {
//     transform: scale(1.25);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
</style>
