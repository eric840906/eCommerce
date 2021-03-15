<template>
  <div class="px-3">
    <div class="card" style="width: 18rem;">
      <img src="https://i.pinimg.com/564x/c4/0d/7a/c40d7a7060fb74926c257db982b6ddaf.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Button class="ml-auto" type="submit">Edit this post</Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/btn.vue'

export default defineComponent({
  components: {
    Button
  }
})
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  backdrop-filter: blur(3px);
  background-color: transparent;
  border: none;
  box-shadow: 0px 0px 9px #0000005e;
  .card-text {
    height: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
