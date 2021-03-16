<template>
  <Button @click="openLogout">Log out</Button>
  <div class="dashboard p-5">
    <h1>DASHBOARD</h1>
    <div class="container">
      <div class="row">
        <div class="col-2">
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
              <li class="drawer-item">
                <router-link to="/userpost" class="d-flex">
                  <div class="col-2">
                    <span class="nav-icon p-2"
                      ><fa icon="edit" type="fas" class="contact-icon"></fa
                    ></span>
                  </div>
                  <div class="col-10"><span class="title p-2">Post</span></div>
                </router-link>
              </li>
              <li class="drawer-item">
                <router-link to="/userphoto" class="d-flex">
                  <div class="col-2">
                    <span class="nav-icon p-2"
                      ><fa icon="images" type="far" class="contact-icon"></fa
                    ></span>
                  </div>
                  <div class="col-10">
                    <span class="title p-2">Photos</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-10">
          <div class="container">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" :key="$route.fullPath"></component>
              </keep-alive>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UserLink :linkIcon="'store'" @click="goFront"></UserLink>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/btn.vue'
import UserLink from '@/components/User/userLink.vue'
export default defineComponent({
  components: {
    UserLink,
    Button
  },
  setup () {
    const router = useRouter()
    const goFront = () => {
      router.push('/')
    }
    return { goFront }
  }
})
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100vh;
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
