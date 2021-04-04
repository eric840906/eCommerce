<template>
  <!-- <div class="d-flex flex-wrap justify-content-center">
    <div  :class="['col-xl-3', 'col-lg-4', 'col-md-6', 'p-2', 'd-flex', 'align-items-center']" v-for="item in photos.data" :key="item.id">
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
  </div> -->
  <div class="row">
    <div class="wrapper">
      <div class="grid-row col">
        <div class="grid-frame" v-for="image in photoRow1" :key="image.id" >
          <a href="#" @click.prevent="goProduct(image.id)">
            <div class="gird-cover">
              <p class="display-6">{{image.title}}</p>
            </div>
            <img :src="image.images"/>
          </a>
        </div>
      </div>
      <div class="grid-row col">
        <div class="grid-frame" v-for="image in photoRow2" :key="image.id" >
          <a href="#" @click.prevent="goProduct(image.id)">
            <div class="gird-cover">
              <p class="display-6">{{image.title}}</p>
            </div>
            <img :src="image.images"/>
          </a>
        </div>
      </div>
      <div class="grid-row col">
        <div class="grid-frame" v-for="image in photoRow3" :key="image.id" >
          <a href="#" @click.prevent="goProduct(image.id)">
            <div class="gird-cover">
              <p class="display-6">{{image.title}}</p>
            </div>
            <img :src="image.images"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'aos/dist/aos.css'
import { defineComponent, PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
export interface Photo {
  id: number;
  image?: string;
  title: string;
  images?: string[];
}
export default defineComponent({
  props: {
    photos: Array as PropType<Photo[]>
  },
  setup (props) {
    const router = useRouter()
    const goProduct = (id: string) => {
      router.push(`/shop/default/${id}`)
    }
    const photoRow1 = computed(() => {
      if (!props.photos) return
      return props.photos.slice(0, props.photos.length / 3)
    })
    const photoRow2 = computed(() => {
      if (!props.photos) return
      return props.photos.slice(3, 2 * props.photos.length / 3)
    })
    const photoRow3 = computed(() => {
      if (!props.photos) return
      return props.photos.slice(6, props.photos.length)
    })
    return {
      photoRow1,
      photoRow2,
      photoRow3,
      goProduct
    }
  }
})
</script>

<style lang="scss" scoped>
// .photo {
//   cursor: pointer;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: 1s all ease;
//   position: relative;
// }
// .photo-container {
//   position: relative;
//   overflow: hidden;
//   height: 100%;
//   &:hover {
//     .photo{
//       transform: scale(1.2);
//     }
//   }
//   .cover {
//     color: white;
//     opacity: 0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     background: #00000070;
//     backdrop-filter: blur(2px);
//     width: 100%;
//     height: 100%;
//     z-index: 9;
//     position: absolute;
//     transition: 0.3s all ease;
//     .btn {
//       margin-left: 0;
//       background: none;
//       border: none;
//       transition: 0.5s all;
//       &:first-child {
//         transform: translate(-55px, 100px);
//       }
//       &:last-child {
//         transform: translate(55px, 100px);
//       }
//     }
//     .photo-button-icon {
//       width: 40px;
//       color: white;
//       &:hover {
//         color: #4c3120;
//       }
//     }
//     &:hover {
//       opacity: 1;
//       .btn {
//         transform: translate(0);
//       }
//     }
//   }
// }
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 15px;
  align-items: start;
  @media (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }
  img {
    object-fit: cover;
    width: 100%;
  }
  .one {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }
}
.grid-row {
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  grid-gap: 15px;
}
.grid-frame {
  overflow: hidden;
  position: relative;
  .gird-cover {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: #00000059;
    color: white;
    width: 100%;
    display: none;
    z-index: 1;
    height: 100%;
    backdrop-filter: blur(1px);
    justify-content: center;
  }
  img {
    transition: all 0.5s ease;
  }
  &:hover {
    .gird-cover {
      display: flex;
      flex-direction: column;
    }
    img {
      transform: scale(1.2);
    }
  }
}
</style>
