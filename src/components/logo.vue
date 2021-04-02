<template>
  <img src="~@/assets/logo2.png" alt="" :style="{ width: `${width}px` }">
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    width: {
      type: Number
    }
  }
})
</script>
