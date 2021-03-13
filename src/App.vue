<template>
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
import { defineComponent, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/footer.vue'
export default defineComponent({
  components: {
    Navbar,
    Banner,
    Footer
  },
  setup () {
    const store = useStore()
    const screenWidth = computed(() => {
      return store.getters.getScreenSize
    })
    screenSize()
    scrollPosition()
    const scroll = computed(() => {
      return store.getters.getScroll
    })
    return { screenWidth, scroll }
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
