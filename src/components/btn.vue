<template>
  <button type="button" class="btn custom-btn shadow rounded-0 border-3">{{text}}</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
  .custom-btn {
    position: relative;
    overflow: hidden;
    background-color: transparent;
    transition: all 0.5s ease-in-out;
    border: 1px solid white;
    color: white;
    &::after {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      width: 110%;
      padding-bottom: 110%;
      border-radius: 50%;
      transform: translate3d(-50%, -50%, 0) scale(1);
      transition: inherit;
      pointer-events: none;
      z-index: -1;
      background: #906c64;
    }
    &:hover {
      color: #906c64;
      background-color: transparent;
      border-color: #906c64;
      &::after {
        transform: translate3d(-50%, -50%, 0) scale(0);
      }
    }
  }
</style>
