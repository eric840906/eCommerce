<template>
  <div class="progress-bar" :style="{width: `${currentProgress}%`}">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import bus from '@/plugins/bus'

export default defineComponent({
  setup () {
    const currentProgress = ref(0)
    bus.on('progress', (progress) => {
      currentProgress.value = progress
    })
    bus.on('image-complete', (reset) => {
      setTimeout(() => {
        currentProgress.value = reset
      }, 3000)
    })
    return {
      currentProgress
    }
  }
})
</script>

<style lang="scss" scoped>
.progress-bar {
    z-index: 99999;
    height: 6px;
    border-radius: 10px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #906c64;
}
</style>
