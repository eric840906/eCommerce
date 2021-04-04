<template>
  <div class="home page-view">
    <div class="container mb-5">
      <div class="row flex-column">
        <CategoryHead>Welcome</CategoryHead>
        <SiteIntro></SiteIntro>
      </div>
    </div>
    <div class="container mb-5">
      <div class="row flex-column">
        <CategoryHead>What's new</CategoryHead>
        <suspense>
          <template #default>
            <Carousel></Carousel>
          </template>
          <template #fallback>
            <loading></loading>
          </template>
        </suspense>
      </div>
    </div>
    <Midlink></Midlink>
    <div class="container my-5">
      <div class="row flex-column">
        <CategoryHead>Gallery</CategoryHead>
        <Photos :photos="galleryContent"></Photos>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { screenSize } from '@/hook/screenSize'
import { scrollPosition } from '@/hook/scrollTop'
import { useStore } from 'vuex'
import { defineComponent, computed, onMounted, ref } from 'vue'
import { StoreProps } from '@/store/index'
import { getAllProduct } from '@/api'
import Carousel from '@/components/carousel.vue'
import { Product } from '@/api/product'
import SiteIntro from '@/components/siteIntro.vue'
import Midlink from '@/components/midlink.vue'
import CategoryHead from '@/components/Title/CategoryHead.vue'
import Photos, { Photo } from '@/components/Photos.vue'
export default defineComponent({
  components: {
    Carousel,
    SiteIntro,
    Midlink,
    CategoryHead,
    Photos
    // ColumnList,
    // Photo
  },
  setup () {
    const store = useStore<StoreProps>()
    const galleryContent = ref([] as Photo[])
    const screenWidth = computed(() => {
      return store.state.screenSize
    })
    screenSize()
    scrollPosition()
    const scroll = computed(() => {
      return store.state.scrollY
    })
    onMounted(async () => {
      const { data } = await getAllProduct('default', 1)
      galleryContent.value = data.data.map((item: Product) => {
        return {
          title: item.name,
          id: item._id,
          images: item.images
        }
      })
    })
    return {
      screenWidth,
      scroll,
      galleryContent
    }
  }
})
</script>
