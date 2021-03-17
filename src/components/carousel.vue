<template>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item h-100">
        <transition name="fade" mode="out-in">
          <div class="h-100 d-flex flex-wrap justify-content-center" :key="carousel.carouselArr[carouselIndex].id">
            <div class="col-lg-8 col-md-6 col-sm-12 d-flex flex-column text-md-start text-center">
              <h1 class="mt-md-0 mt-3 text-uppercase display-6">{{carousel.carouselArr[carouselIndex].title}}</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem quo quis quos, fuga error minus numquam voluptate laborum voluptatem a ipsum officiis neque aperiam. Doloremque, ullam dolore. Sed, iusto.</p>
              <div class="author-info d-none d-md-flex align-self-end mt-auto p-1 mb-3 order-md-last order-first shadow">
                <img :src="carousel.carouselArr[carouselIndex].author.image" alt="">
                <p class="align-self-center mx-3 mb-0">{{carousel.carouselArr[carouselIndex].author.name}}</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-sm-center">
              <img class="carousel-img" :src="carousel.carouselArr[carouselIndex].url" alt="">
            </div>
          </div>
        </transition>
      </div>
    </div>
    <button class="carousel-control carousel-control-prev" type="button" @click="carouselControl(-1)">
      <fa icon="chevron-left" type="fas" class="control-icon"></fa>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control carousel-control-next" type="button" @click="carouselControl(1)">
      <fa icon="chevron-right" type="fas" class="control-icon"></fa>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export interface CarouselItem {
  url: string;
  name?: string;
}
export default defineComponent({
  setup () {
    const carouselIndex = ref(0)
    const carousel = reactive({
      carouselArr: [
        {
          url: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          id: 0,
          title: 'rice',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ipsa ab qui natus nam ipsum, tempore laborum iste ea. In nihil repellat fugiat! Sint explicabo eius voluptatibus corporis illo consequatur.',
          author: {
            name: 'Lynn',
            image: 'https://i.imgur.com/J9DkbOj.png'
          }
        },
        {
          url: 'https://images.unsplash.com/photo-1574766777271-cf399aebb82e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
          id: 1,
          title: 'croissant',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ipsa ab qui natus nam ipsum, tempore laborum iste ea. In nihil repellat fugiat! Sint explicabo eius voluptatibus corporis illo consequatur.',
          author: {
            name: 'Lann',
            image: 'https://i.imgur.com/ZhhA0LG.png'
          }
        },
        {
          url: 'https://images.unsplash.com/photo-1584359246637-a53c74bf8905?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          id: 2,
          title: 'bread',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ipsa ab qui natus nam ipsum, tempore laborum iste ea. In nihil repellat fugiat! Sint explicabo eius voluptatibus corporis illo consequatur.',
          author: {
            name: 'Vella',
            image: 'https://i.imgur.com/FWcLGNn.png'
          }
        },
        {
          url: 'https://images.unsplash.com/photo-1607919564479-c2e00f3b14a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
          id: 3,
          title: 'cookies',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ipsa ab qui natus nam ipsum, tempore laborum iste ea. In nihil repellat fugiat! Sint explicabo eius voluptatibus corporis illo consequatur.',
          author: {
            name: 'Vella',
            image: 'https://i.imgur.com/FWcLGNn.png'
          }
        },
        {
          url: 'https://images.unsplash.com/photo-1548586832-45302f8374ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1417&q=80',
          id: 4,
          title: 'egg tart',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ipsa ab qui natus nam ipsum, tempore laborum iste ea. In nihil repellat fugiat! Sint explicabo eius voluptatibus corporis illo consequatur.',
          author: {
            name: 'Vella',
            image: 'https://i.imgur.com/FWcLGNn.png'
          }
        }
      ]
    })
    const carouselControl = (move: number) => {
      carouselIndex.value = (carouselIndex.value + move + carousel.carouselArr.length) % carousel.carouselArr.length
    }
    return {
      carousel,
      carouselIndex,
      carouselControl
    }
  }
})
</script>

<style lang="scss" scoped>
.carousel-item {
  display: block;
}
.carousel-img {
  object-fit: cover;
  width: 100%;
  border-radius: 100%;
  height: 20rem;
  width: 20rem;
  @media (max-width: 320px) {
    height: 17rem;
    width: 17rem;
  }
}
.control-icon {
  width: 25px;
  color: #000000a3;
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
.carousel-control {
  @media (min-width: 768px) {
    width: 5%;
  }
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.8s ease;
}
</style>
