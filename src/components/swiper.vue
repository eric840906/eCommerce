<template>
  <div class="col-12 position-relative">
    <transition name="fade" mode="out-in">
      <img
        class="img-fluid product-img"
        v-if="imgArr"
        :src="imgArr[picIndex]"
        alt=""
        :key="imgArr[picIndex]"
      />
    </transition>
    <button class="swiper-arrow start-0" type="button" @click="swipe(-1)">
      <fa icon="chevron-left" type="fas" class="control-icon left"></fa>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="swiper-arrow end-0" type="button" @click="swipe(1)">
      <fa icon="chevron-right" type="fas" class="control-icon right"></fa>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
export default defineComponent({
  props: {
    imgArr: {
      type: Array as PropType<string[]>
    }
  },
  setup (props) {
    const picIndex = ref(0)
    const swipe = (move: number) => {
      if (!props.imgArr) return
      picIndex.value = (picIndex.value + props.imgArr.length + move) % props.imgArr.length
    }
    return {
      picIndex,
      swipe
    }
  }
})
</script>

<style lang="scss" scoped>
.product-img {
  height: 20rem;
  width: 20rem;
  @media (min-width: 425px) {
    height: 30rem;
    width: 30rem;
  }
}
.swiper-arrow {
  position: absolute;
  height: 100%;
  background: none;
  border: none;
  color: white;
  transition: all 0.5s ease;
  &:hover {
    background-color: #ffffff45;
    color: #a8847c;
  }
}
</style>
