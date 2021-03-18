<template>
  <div class="d-flex flex-wrap justify-content-center">
    <div  class="col-xl-3 col-lg-4 col-md-6 p-2 d-flex align-items-center" v-for="item in photos.data" :key="item.id">
      <div class="photo-container">
        <div class="cover">
          <h1>{{item.title}}</h1>
          <div class="button-group">
            <a href="javascript:" class="btn"><fa icon="search" type="fas" class="photo-button-icon"></fa></a>
            <a href="javascript:" class="btn"><fa icon="shopping-cart" type="fas" class="photo-button-icon"></fa></a>
          </div>
        </div>
        <img class="photo" :src="item.images">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AOS from 'aos'
import 'aos/dist/aos.css'
import { defineComponent, PropType } from 'vue'
AOS.init()
export interface Photo {
  id: number;
  image?: string;
  title: string;
  images?: string[];
}
// const photoArr: Photo[] = [
//   {
//     id: 1,
//     image: 'https://images.unsplash.com/photo-1530655268988-5456ff267b16?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
//     title: 'Bread'
//   },
//   {
//     id: 2,
//     image: 'https://images.unsplash.com/photo-1614778168817-d8a55d646890?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=602&q=80',
//     title: 'Ingredients'
//   },
//   {
//     id: 3,
//     image: 'https://images.unsplash.com/photo-1614335146221-6904ed47804a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=678&q=80',
//     title: 'Mexican special'
//   },
//   {
//     id: 4,
//     image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//     title: 'French fries'
//   },
//   {
//     id: 5,
//     image: 'https://images.unsplash.com/photo-1614207217402-aad086099c2a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//     title: 'Special breakfast'
//   },
//   {
//     id: 6,
//     image: 'https://images.unsplash.com/photo-1600400815719-ea6f9a3a4a49?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
//     title: 'Light meal'
//   },
//   {
//     id: 7,
//     image: 'https://images.unsplash.com/photo-1613939492135-21ffbbcf246b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//     title: 'Doughnuts'
//   },
//   {
//     id: 8,
//     image: 'https://images.unsplash.com/photo-1614028731365-72477465ef43?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80',
//     title: 'Multigrain Breads'
//   },
//   {
//     id: 9,
//     image: 'https://images.unsplash.com/photo-1612719448473-469e665bd15c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//     title: 'Pancakes'
//   },
//   {
//     id: 10,
//     image: 'https://images.unsplash.com/photo-1605566689888-0c7efcc6296e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=564&q=80',
//     title: 'Croissants'
//   }
// ]
export default defineComponent({
  props: {
    photos: Array as PropType<string[]>
  },
  setup () {
    return {
      // photoArr
    }
  }
})
</script>

<style lang="scss" scoped>
.photo {
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 1s all ease;
  position: relative;
}
.photo-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  &:hover {
    .photo{
      transform: scale(1.2);
    }
  }
  .cover {
    color: white;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #00000070;
    backdrop-filter: blur(2px);
    width: 100%;
    height: 100%;
    z-index: 9;
    position: absolute;
    transition: 0.3s all ease;
    .btn {
      margin-left: 0;
      background: none;
      border: none;
      transition: 0.5s all;
      &:first-child {
        transform: translate(-55px, 100px);
      }
      &:last-child {
        transform: translate(55px, 100px);
      }
    }
    .photo-button-icon {
      width: 40px;
      color: white;
      &:hover {
        color: #4c3120;
      }
    }
    &:hover {
      opacity: 1;
      .btn {
        transform: translate(0);
      }
    }
  }
}
</style>
