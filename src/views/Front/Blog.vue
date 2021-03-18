<template>
  <div class="Gallery">
    <CategoryHead>Blog</CategoryHead>
    <div class="container mt-5">
      <div class="row flex-column flex-md-row flex-md-wrap">
        <suspense>
          <template #default>
            <router-view></router-view>
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
                      <li class="d-flex justify-content-between">
                        <div class="col-4">
                          <img class="post-thumbnail" src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=653&q=80" alt="">
                        </div>
                        <div class="col-8 d-flex flex-column text-start ps-3 justify-content-around">
                          <h5 class="post-name"><a href="">野格炸彈我的最愛超爽口感</a></h5>
                          <p class="post-date">March 18, 2021</p>
                        </div>
                      </li>
                      <li class="d-flex justify-content-between">
                        <div class="col-4">
                          <img class="post-thumbnail" src="https://livedemo00.template-help.com/wt_prod-24533/images/post-mini-1-106x104.jpg" alt="">
                        </div>
                        <div class="col-8 d-flex flex-column text-start ps-3 justify-content-around">
                          <h5 class="post-name"><a href="">野格炸彈我的最愛超爽口感</a></h5>
                          <p class="post-date">March 18, 2021</p>
                        </div>
                      </li>
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
import CategoryHead from '@/components/Title/CategoryHead.vue'
export default defineComponent({
  components: {
    CategoryHead
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
