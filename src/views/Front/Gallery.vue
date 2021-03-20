<template>
  <div class="Gallery page-view">
    <div class="container">
      <CategoryHead>Gallery</CategoryHead>
      <Photos></Photos>
    </div>
  </div>
</template>

<script lang="ts">
import Photos from '@/components/photos3.vue'
import CategoryHead from '@/components/Title/CategoryHead.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Photos,
    CategoryHead
  }
})
</script>

<style lang="scss" scoped>

</style>
