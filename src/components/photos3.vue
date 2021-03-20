<template>
  <div class="row">
    <div class="wrapper">
      <div class="grid-row col">
        <div class="grid-frame" v-for="image in photoRow1" :key="image.id" >
          <div class="gird-cover">
            <p class="display-6">{{image.title}}</p>
          </div>
          <img :src="image.url"/>
        </div>
      </div>
      <div class="grid-row col">
        <div class="grid-frame" v-for="image in photoRow2" :key="image.id" >
          <div class="gird-cover">
            <p class="display-6">{{image.title}}</p>
          </div>
          <img :src="image.url"/>
        </div>
      </div>
      <div class="grid-row col">
        <div class="grid-frame" v-for="image in photoRow3" :key="image.id" >
          <div class="gird-cover">
            <p class="display-6">{{image.title}}</p>
          </div>
          <img :src="image.url"/>
        </div>
      </div>
      <!-- <div
        data-aos="fade-up"
        data-aos-offset="300"
        data-aos-once="false"
        data-aos-easing="ease-in-out"
        class="test"
        :class="{ one: index === 0, seven: index === 6, eight: index === 7 }"
        v-for="(item, index) in photoArr"
        :key="item.id"
        >
        <div class="image-block photo" :style="{ backgroundImage: 'url('+ item.url +')'}"></div>
        <div class="cover">
          <h1>{{ item.title }}</h1>
          <div class="button-group">
            <a href="javascript:" class="btn"
              ><fa icon="search" type="fas" class="photo-button-icon"></fa
            ></a>
            <a href="javascript:" class="btn"
              ><fa
                icon="shopping-cart"
                type="fas"
                class="photo-button-icon"
              ></fa
            ></a>
          </div>
        </div>
        <img src="https://via.placeholder.com/700X700" style="z-index: -1; opacity: 0"/>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import 'aos/dist/aos.css'
import { computed, defineComponent } from 'vue'
export interface Photo {
  id: number;
  url: string;
  title: string;
}
const photoArr: Photo[] = [
  {
    id: 1,
    url:
      require('@/assets/photo/photo1.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 2,
    url:
      require('@/assets/photo/photo2.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 3,
    url:
      require('@/assets/photo/photo3.jpg'),
    title: 'Cakes'
  },
  {
    id: 4,
    url:
      require('@/assets/photo/photo4.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 5,
    url:
      require('@/assets/photo/photo5.jpg'),
    title: 'Cakes'
  },
  {
    id: 6,
    url:
      require('@/assets/photo/photo6.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 7,
    url:
      require('@/assets/photo/photo7.jpg'),
    title: 'Milktea cakes'
  },
  {
    id: 8,
    url:
      require('@/assets/photo/photo8.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 9,
    url:
      'https://images.unsplash.com/photo-1607919564479-c2e00f3b14a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Cookies'
  },
  {
    id: 10,
    url:
      require('@/assets/photo/photo1.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 11,
    url:
      require('@/assets/photo/photo2.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 12,
    url:
      require('@/assets/photo/photo3.jpg'),
    title: 'Cakes'
  },
  {
    id: 13,
    url:
      require('@/assets/photo/photo4.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 14,
    url:
      require('@/assets/photo/photo5.jpg'),
    title: 'Cakes'
  },
  {
    id: 15,
    url:
      require('@/assets/photo/photo6.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 16,
    url:
      require('@/assets/photo/photo7.jpg'),
    title: 'Milktea cakes'
  },
  {
    id: 17,
    url:
      require('@/assets/photo/photo8.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 18,
    url:
      'https://images.unsplash.com/photo-1607919564479-c2e00f3b14a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Cookies'
  },
  {
    id: 19,
    url:
      require('@/assets/photo/photo1.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 20,
    url:
      require('@/assets/photo/photo2.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 21,
    url:
      require('@/assets/photo/photo3.jpg'),
    title: 'Cakes'
  },
  {
    id: 22,
    url:
      require('@/assets/photo/photo4.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 23,
    url:
      require('@/assets/photo/photo5.jpg'),
    title: 'Cakes'
  },
  {
    id: 24,
    url:
      require('@/assets/photo/photo6.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 25,
    url:
      require('@/assets/photo/photo7.jpg'),
    title: 'Milktea cakes'
  },
  {
    id: 26,
    url:
      require('@/assets/photo/photo8.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 27,
    url:
      'https://images.unsplash.com/photo-1607919564479-c2e00f3b14a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Cookies'
  },
  {
    id: 28,
    url:
      require('@/assets/photo/photo2.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 29,
    url:
      require('@/assets/photo/photo3.jpg'),
    title: 'Cakes'
  },
  {
    id: 30,
    url:
      require('@/assets/photo/photo4.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 31,
    url:
      require('@/assets/photo/photo5.jpg'),
    title: 'Cakes'
  },
  {
    id: 32,
    url:
      require('@/assets/photo/photo6.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 33,
    url:
      require('@/assets/photo/photo7.jpg'),
    title: 'Milktea cakes'
  },
  {
    id: 34,
    url:
      require('@/assets/photo/photo8.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 35,
    url:
      'https://images.unsplash.com/photo-1607919564479-c2e00f3b14a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Cookies'
  },
  {
    id: 36,
    url:
      require('@/assets/photo/photo3.jpg'),
    title: 'Cakes'
  },
  {
    id: 37,
    url:
      require('@/assets/photo/photo4.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 38,
    url:
      require('@/assets/photo/photo5.jpg'),
    title: 'Cakes'
  },
  {
    id: 39,
    url:
      require('@/assets/photo/photo6.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 40,
    url:
      require('@/assets/photo/photo7.jpg'),
    title: 'Milktea cakes'
  },
  {
    id: 41,
    url:
      require('@/assets/photo/photo8.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 42,
    url:
      'https://images.unsplash.com/photo-1607919564479-c2e00f3b14a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Cookies'
  },
  {
    id: 43,
    url:
      require('@/assets/photo/photo2.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 44,
    url:
      require('@/assets/photo/photo3.jpg'),
    title: 'Cakes'
  },
  {
    id: 45,
    url:
      require('@/assets/photo/photo4.jpg'),
    title: 'Birthday cakes'
  },
  {
    id: 46,
    url:
      require('@/assets/photo/photo5.jpg'),
    title: 'Cakes'
  },
  {
    id: 47,
    url:
      require('@/assets/photo/photo6.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 48,
    url:
      require('@/assets/photo/photo7.jpg'),
    title: 'Milktea cakes'
  },
  {
    id: 49,
    url:
      require('@/assets/photo/photo8.jpg'),
    title: 'Lemon tarts'
  },
  {
    id: 50,
    url:
      'https://images.unsplash.com/photo-1607919564479-c2e00f3b14a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Cookies'
  }
]
export default defineComponent({
  setup () {
    const photoRow1 = computed(() => {
      return photoArr.filter((item, index) => {
        return (index + 1) % 1 === 0
      }).slice(25)
    })
    const photoRow2 = computed(() => {
      return photoArr.filter((item, index) => {
        return (index + 1) % 2 === 0
      })
    })
    const photoRow3 = computed(() => {
      return photoArr.filter((item, index) => {
        return (index + 1) % 3 !== 0 && (index + 1) % 5 !== 0
      }).slice(2)
    })
    return {
      photoArr,
      photoRow1,
      photoRow2,
      photoRow3
    }
  }
})
</script>

<style lang="scss" scoped>
.photo {
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 1s all ease;
  position: relative;
}
.image-block {
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  background-position: center;
}
.photo-container,
.test {
  background-position: center;
  position: relative;
  overflow: hidden;
  background-size: cover;
  &:hover {
    .photo {
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
/*test grid*/
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
  // .one {
    // grid-column-start: 1;
    // grid-column-end: 3;
    // grid-row-start: 1;
    // grid-row-end: 2;
  //   @media (max-width: 425px) {
  //     grid-column-start: unset;
  //     grid-column-end: unset;
  //     grid-row-start: unset;
  //     grid-row-end: unset;
  //   }
  // }
  // .seven {
  //   grid-column-start: 2;
  //   grid-column-end: 4;
  //   grid-row-start: 3;
  //   grid-row-end: 4;
  //   @media (max-width: 425px) {
  //     grid-column-start: unset;
  //     grid-column-end: unset;
  //     grid-row-start: unset;
  //     grid-row-end: unset;
  //   }
  // }
  // .eight {
  //   grid-column-start: 1;
  //   grid-column-end: 3;
  //   grid-row-start: 4;
  //   grid-row-end: 4;
  //   @media (max-width: 425px) {
  //     grid-column-start: unset;
  //     grid-column-end: unset;
  //     grid-row-start: unset;
  //     grid-row-end: unset;
  //   }
  // }
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
