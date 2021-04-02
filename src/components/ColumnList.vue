<template>
  <div class="row">
    <h1 data-aos="fade-in" class="title-color">Cards</h1>
    <div data-aos="fade-right" data-aos-offset="300" data-aos-once="false" data-aos-easing="ease-in-out" class="col-xl-3 col-lg-4 col-md-6 mb-4" v-for="item in useList" :key="item.id">
      <div class="card h-100 py-4 shadow">
        <img :src="item.avatar" class="avatar" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">{{item.title}}</h5>
          <p class="card-text">{{item.desc}}</p>
          <a href="#" class="btn btn-outline-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import 'aos/dist/aos.css'
import { PropType, defineComponent, computed, ref } from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  desc: string;
}
export interface Offset {
  offsetTop: number;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    },
    scrollPos: {
      type: Number
    }
  },
  setup (props) {
    const title = ref<Offset|null>(null)
    const inner = ref(0)
    inner.value = window.innerHeight
    const useList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = require('@/assets/logo2.png')
        }
        return item
      })
    })
    return { useList, title }
  }
})
</script>
<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.avatar {
  align-self: center;
  border-radius: 100%;
  width: 200px;
  height: 200px;
}
.card {
  display: inline-block;
  background: #fff7f387;
  backdrop-filter: blur(2px);
  width: 17rem;
  .card-text {
    height: 70px;
    overflow: hidden;
  }
}
</style>
