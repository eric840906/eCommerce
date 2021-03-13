<template>
  <div class="Gallery">
    <div class="container">
      <h1>Gallery</h1>
      <Photos></Photos>
    </div>
  </div>
</template>

<script lang="ts">
import Photos from '@/components/Photos.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Photos
  }
})
</script>

<style lang="scss" scoped>

</style>
