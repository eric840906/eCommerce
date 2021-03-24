<template>
  <div class="modal" v-show="isLoading">
    <div class="modal-dialog modal-dialog-centered">
      <div class="breeding-rhombus-spinner">
        <div class="rhombus child-1"></div>
        <div class="rhombus child-2"></div>
        <div class="rhombus child-3"></div>
        <div class="rhombus child-4"></div>
        <div class="rhombus child-5"></div>
        <div class="rhombus child-6"></div>
        <div class="rhombus child-7"></div>
        <div class="rhombus child-8"></div>
        <div class="rhombus big"></div>
      </div>
    </div>
    <h1 class="loading-text">Loading</h1>
  </div>
</template>

<script lang="ts">
import bus from '@/plugins/bus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean
    }
  },
  setup () {
    const modalShow = ref(false)
    const modalToggle = () => {
      modalShow.value = !modalShow.value
    }
    bus.on('*', modalToggle)
    return {
      modalShow,
      modalToggle
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  background-color: #0000009e;
  display: block;
}
.loading-text {
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: flash-text 2s infinite;
  animation-delay: 0.5s;
  animation-duration: 2000ms;
  color: white;
}
</style>
