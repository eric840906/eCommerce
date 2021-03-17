<template>
  <div class="home">
    <div class="container mb-5">
      <div class="row flex-column">
        <CategoryHead>Welcome</CategoryHead>
        <SiteIntro></SiteIntro>
      </div>
    </div>
    <div class="container mb-5">
      <div class="row flex-column">
        <CategoryHead>What's new</CategoryHead>
        <Carousel></Carousel>
      </div>
      <!-- <ColumnList :list="testData" :scrollPos="scroll"></ColumnList> -->
    </div>
    <Midlink></Midlink>
    <div class="container my-5">
      <div class="row flex-column">
        <CategoryHead>Photos</CategoryHead>
        <Photos></Photos>
      </div>
    </div>
    <!-- <div class="container">
      <Photo></Photo>
    </div> -->
  </div>
</template>

<script lang="ts">
import { screenSize } from '@/hook/screenSize'
import { scrollPosition } from '@/hook/scrollTop'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue'
import { StoreProps } from '@/store/index'
import Carousel from '@/components/carousel.vue'
import SiteIntro from '@/components/siteIntro.vue'
import Midlink from '@/components/midlink.vue'
import CategoryHead from '@/components/Title/CategoryHead.vue'
import Photos from '@/components/Photos.vue'
// import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'ASDASD',
//     avatar: 'https://images.dog.ceo/breeds/elkhound-norwegian/n02091467_872.jpg',
//     desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ipsam quisquam praesentium doloremque rem fugiat eaque, hic commodi totam distinctio voluptatum iure! Earum cupiditate assumenda nihil possimus totam veniam tenetur.'
//   },
//   {
//     id: 2,
//     title: 'ASDASD',
//     avatar: 'https://images.dog.ceo/breeds/terrier-fox/n02095314_663.jpg',
//     desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ipsam quisquam praesentium doloremque rem fugiat eaque, hic commodi totam distinctio voluptatum iure! Earum cupiditate assumenda nihil possimus totam veniam tenetur.'
//   },
//   {
//     id: 3,
//     title: 'ASDASD',
//     avatar: 'https://images.dog.ceo/breeds/terrier-fox/n02095314_663.jpg',
//     desc: 'asdasd'
//   },
//   {
//     id: 4,
//     title: 'ASDASD',
//     desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ipsam quisquam praesentium doloremque rem fugiat eaque, hic commodi totam distinctio voluptatum iure! Earum cupiditate assumenda nihil possimus totam veniam tenetur.'
//   },
//   {
//     id: 5,
//     title: 'ASDASD',
//     desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ipsam quisquam praesentium doloremque rem fugiat eaque, hic commodi totam distinctio voluptatum iure! Earum cupiditate assumenda nihil possimus totam veniam tenetur.'
//   }
// ]
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
    const screenWidth = computed(() => {
      return store.state.screenSize
    })
    screenSize()
    scrollPosition()
    const scroll = computed(() => {
      return store.state.scrollY
    })
    return {
    // testData,
      screenWidth,
      scroll
    }
  }
})
</script>
