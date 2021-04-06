<template>
  <div>
    <div class="dashboard">
    <h1>DASHBOARD</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <nav class="p-2 m-2">
            <ul>
              <li class="drawer-item">
                <router-link to="/dashboard" class="d-flex">
                  <div class="col-2">
                    <span class="nav-icon p-2"
                      ><fa icon="id-card" type="fas" class="contact-icon"></fa
                    ></span>
                  </div>
                  <div class="col-10"><span class="title p-2">Info</span></div>
                </router-link>
              </li>
              <li class="drawer-item" v-if="user.role === 'admin'">
                <router-link to="/userpost" class="d-flex">
                  <div class="col-2">
                    <span class="nav-icon p-2"
                      ><fa icon="edit" type="fas" class="contact-icon"></fa
                    ></span>
                  </div>
                  <div class="col-10"><span class="title p-2">Blog post</span></div>
                </router-link>
              </li>
              <li class="drawer-item" v-if="user.role === 'admin'">
                <router-link to="/product-control" class="d-flex">
                  <div class="col-2">
                    <span class="nav-icon p-2"
                      ><fa icon="cookie-bite" type="fas" class="contact-icon"></fa
                    ></span>
                  </div>
                  <div class="col-10">
                    <span class="title p-2">Products</span>
                  </div>
                </router-link>
              </li>
              <li class="drawer-item">
                <a href="#" class="d-flex" @click.prevent="openLogout">
                  <div class="col-2">
                    <span class="nav-icon p-2"
                      ><fa icon="sign-out-alt" type="fas" class="contact-icon"></fa
                    ></span>
                  </div>
                  <div class="col-10">
                    <span class="title p-2">Log out</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-10 d-flex flex-wrap flex-column flex-md-row">
            <suspense>
              <template #default>
                <router-view v-slot="{ Component }">
                  <keep-alive>
                    <component :is="Component" :key="$route.fullPath"></component>
                  </keep-alive>
                </router-view>
              </template>
              <template #fallback>
                <loading></loading>
              </template>
            </suspense>
        </div>
      </div>
    </div>
  </div>
  <UserLink :linkIcon="'store'" @click="goFront"></UserLink>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UserLink from '@/components/User/userLink.vue'
import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    UserLink
  },
  setup () {
    const store = useStore()
    const user = computed(() => store.getters.getUser)
    const openLogout = () => {
      bus.emit('Logout-open')
    }
    const router = useRouter()
    const goFront = () => {
      router.push('/')
    }
    return {
      goFront,
      openLogout,
      user
    }
  }
})
</script>

<style lang="scss" scoped>
.dashboard {
  nav {
    background: #ffffff3b;
    backdrop-filter: blur(3px);
    box-shadow: 0px 0px 4px black;
    border-radius: 5px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    .drawer-item {
      line-height: 3;
      border-radius: 10px;
      transition: all 0.5s ease;
    }
  }

}
.account-icon {
  width: 20px;
}
.router-link-exact-active {
  background-color: #fffffff2;
  border-radius: 56px;
}

.view-window {
  overflow: auto;
  height: 80vh;
}
.image-block {
  position: relative;
  .user-image {
    border-radius: 100%;
    width: 200px;
    height: 200px;
  }
  .image-btn {
    position: absolute;
    bottom: 15%;
    right: 0%;
    border: none;
    background: #ffffff69;
    box-shadow: 0px 0px 2px black;
    border-radius: 100%;
    height: 35px;
    width: 35px;
    transition: all 0.5s ease;
    &:hover {
      box-shadow: 0px 0px 5px black;
    }
    .camera-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.user-info {
  padding-left: 1rem;
}
</style>
