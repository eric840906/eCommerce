<template>
  <div class="Gallery">
    <CategoryHead>Blog</CategoryHead>
    <div class="container mt-5">
      <div class="row flex-column flex-md-row flex-md-wrap">
        <suspense>
          <template #default>
            <div class="col col-md-9 d-flex flex-column flex-md-row flex-md-wrap">
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component"></component>
                </transition>
              </router-view>
            </div>
          </template>
          <template #fallback>
            <div class="page-loading col d-flex flex-column" style="position: relative;">
              <h1 class="display-6" style="top: 55%; left: 50%; position: absolute; transform: translateX(-50%);">Loading contents</h1>
              <loading style="top: 30%;"></loading>
            </div>
          </template>
        </suspense>
        <!--Sidebar-->
        <div class="col col-md-3 mt-5 mt-md-0">
          <nav class="blog-nav">
            <ul class="m-0 p-0">
              <li class="nav-block">
                <div class="d-flex flex-column">
                  <p class="fw-bolder text-uppercase">Categories</p>
                  <div class="d-flex flex-wrap">
                    <ul class="w-100 p-0">
                      <li class="d-flex justify-content-between">
                        <a class="text-uppercase" href="#">news</a>
                        <span>(10)</span>
                      </li>
                      <li class="d-flex justify-content-between">
                        <a class="text-uppercase" href="#">cakes</a>
                        <span>(5)</span>
                      </li>
                      <li class="d-flex justify-content-between">
                        <a class="text-uppercase" href="#">baking tips</a>
                        <span>(10)</span>
                      </li>
                      <li class="d-flex justify-content-between">
                        <a class="text-uppercase" href="#">others</a>
                        <span>(10)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nav-block">
                <div class="d-flex flex-column">
                  <p class="fw-bolder text-uppercase">Lastest posts</p>
                  <div class="d-flex flex-wrap">
                    <ul class="w-100 p-0 newest-list">
                      <suspense>
                        <template #default>
                          <Newest></Newest>
                        </template>
                        <template #fallback>
                          <loading></loading>
                        </template>
                      </suspense>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nav-block">
                <div class="d-flex flex-column">
                  <p class="fw-bolder text-uppercase">Tags</p>
                  <div class="d-flex flex-wrap justify-content-center">
                    <a href="#" class="tag px-2 m-1 shadow text-uppercase">
                      news
                    </a>
                    <a href="#" class="tag px-2 m-1 shadow text-uppercase">
                      bakery
                    </a>
                    <a href="#" class="tag px-2 m-1 shadow text-uppercase">
                      caskes
                    </a>
                    <a href="#" class="tag px-2 m-1 shadow text-uppercase">
                      cookies
                    </a>
                    <a href="#" class="tag px-2 m-1 shadow text-uppercase">
                      tips
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Newest from '@/components/Blog/newest.vue'
import CategoryHead from '@/components/Title/CategoryHead.vue'
export default defineComponent({
  components: {
    CategoryHead,
    Newest
  }
})
</script>

<style lang="scss" scoped>
.post-name {
  word-break: break-all;
}
.blog-nav {
  .nav-block + .nav-block {
    margin-top: 2rem;
  }
}
.newest-list {
  li + li {
    margin-top: 1rem;
  }
}
.post-thumbnail {
  width: 100%;
  height: 80px;
}
.tags {
  background-color: #ffe3e3d6;
}
.author-info {
  background-color: #eef0f14a;
  backdrop-filter: blur(6px);
  border-radius: 100px;
  img {
    height: 3rem;
    width: 3rem;
    border-radius: 100%;
  }
}
</style>
