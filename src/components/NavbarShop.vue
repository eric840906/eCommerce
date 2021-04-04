<template>
  <div style="
    position: fixed;
    width: 100%;
    z-index: 999;">
    <!-- <transition name="top-show" mode="in-out">
      <nav :class="['navbar', 'navbar-expand-lg', 'navbar-light']" v-show="scrollPos < 100 && screenSize > 993">
        <div class="fluid-container d-flex w-100 px-5">
          <ul class="contact-info col">
            <li>
              <span class="theme-color">Call: </span>
              <a href="" class="text-decoration-none">123-456-789</a>
            </li>
            <li>
              <span class="theme-color">Mail: </span>
              <a href="mailto:eric840906@hotmail.com.tw" class="text-decoration-none">eric840906@hotmail.com.tw</a>
            </li>
          </ul>
          <a class="navbar-brand col" href="#"><Logo :width="60"></Logo></a>
          <div class="button-group col justify-content-end">
            <div>
              <Button @click="openLogout" v-show="userLog._id">Log out</Button>
              <Button @click="openLogin" v-show="!userLog._id">Log in</Button>
            </div>
            <div>
              <Button @click="openSignup" v-show="!userLog._id">Sign up</Button>
            </div>
          </div>
        </div>
      </nav>
    </transition> -->
    <nav :class="['navbar', 'navbar-expand-lg', 'navbar-light', 'nav-bg', { 'fixed-top' : scrollPos > 100 }]">
      <div class="container-fluid">
        <button v-if="screenSize < 993" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#"><Logo :width="60"></Logo></a>
        <a class="text-decoration-none text-nav-link order-md-last cart-btn" @click="toCart">
          <span class="cart-indicator" v-if="userLog.cart">{{userLog.cart.length}}</span>
          <img class="nav-bag-icon" src="~@/assets/shopping-bag.svg" alt="">
          <!-- <div class="bag-icon"></div> -->
          <!-- <fa icon="shopping-cart" type="fas" class="nav-icon"></fa> -->
        </a>
        <transition name="nav-show">
          <div v-show="navbarStatus" :class="['navbar-collapse','text-start']" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 fs-4 justify-content-evenly justify-content-md-center w-100">
              <li class="nav-item">
                <router-link class="text-decoration-none text-nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item ms-md-5">
                <router-link class="text-decoration-none text-nav-link" to="/gallery">Gallery</router-link>
              </li>
              <li class="nav-item ms-md-5">
                <router-link class="text-decoration-none text-nav-link" to="/blog/default">Blog</router-link>
              </li>
              <li class="nav-item ms-md-5">
                <router-link class="text-decoration-none text-nav-link" to="/shop/default">Shop</router-link>
              </li>
              <li v-if="screenSize < 993" class="d-flex nav-item my-2">
                <Button class="ms-auto top-nav-btn" @click="openLogin" v-show="!userLog._id">Log in</Button>
                <Button class="ms-auto top-nav-btn" @click="openLogout" v-show="userLog._id">Log out</Button>
              </li>
              <li v-if="screenSize < 993" class="d-flex nav-item">
                <Button class="ms-auto top-nav-btn" @click="openSignup" v-show="!userLog._id">Sign up</Button>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import bus from '@/plugins/bus'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Logo from '@/components/logo.vue'
import Button from '@/components/btn.vue'
export default defineComponent({
  components: {
    Button,
    Logo
  },
  props: {
    screenSize: {
      type: Number,
      required: true
    },
    scrollPos: {
      type: Number,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const toast = useToast()
    const navbarStatus = ref(false)
    const userLog = computed(() => {
      return store.getters.getUser
    })
    const toCart = () => {
      const loginFirst = () => {
        toast.info('Please log in first to use cart')
        bus.emit('Login-open')
      }
      if (userLog.value._id) return router.push({ name: 'Cart' })
      return loginFirst()
    }
    const openLogin = () => {
      bus.emit('Login-open')
    }
    const openSignup = () => {
      bus.emit('Signup-open')
    }
    const openLogout = () => {
      bus.emit('Logout-open')
    }
    const toggleNav = () => {
      navbarStatus.value = !navbarStatus.value
    }
    return {
      navbarStatus,
      toggleNav,
      userLog,
      toCart,
      openLogin,
      openSignup,
      openLogout
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-bg {
  background-color: #ffffff47;
}
.nav-icon {
  height: 30px;
}
.cart-btn {
  position: relative;
  padding-right: 10px;
  .cart-indicator {
    position: absolute;
    top: -12px;
    right: -5px;
    width: 20px;
    height: 20px;
    padding: 0px;
    color: #936f67;
    border-radius: 100%;
  }
  &:hover {
    .nav-bag-icon {
      filter: invert(88%) sepia(134%) saturate(0%) hue-rotate(0deg) brightness(187%) contrast(229%);
    }
    .cart-indicator {
      color: white;
    }
  }
}
.theme-color {
  color: #906c64;
}
.contact-info {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  a{
    color: #6c757d;
    &:hover {
      color: #b4685dcc;
    }
  }
}
.navbar {
  z-index: 999;
  width: 100%;
  backdrop-filter: blur(3px);
  transition: all 0.5s ease;
}
.router-link-active {
  color: #906c64;
}
.navbar-collapse {
  @media (max-height:992px) {
    overflow: hidden;
    transition: height 0.3s ease;
  }
}
.button-group {
  display: flex;
  @media (max-width:992px) {
    flex-direction: column;
  }
  div + div {
    @media (min-width:992px) {
      margin-left: 5px;
    }
    @media (max-width:992px) {
      margin-top: 5px;
    }
  }
}
.nav-show-enter-from, .nav-show-leave-to {
  max-height: 0;
}
.nav-show-enter-to, .nav-show-leave-from {
  max-height: 500px;
}
.nav-show-enter-active, .nav-show-leave-active {
  transition: all 0.8s ease;
}
.top-show-enter-from, .top-show-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
.top-show-enter-to, .top-show-leave-from {
  transform: scaleY(1);
  opacity: 1;
}
.top-show-enter-active, .top-show-leave-active {
  transition: all 0.2s ease;
}
</style>
