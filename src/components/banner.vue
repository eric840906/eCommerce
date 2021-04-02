<template>
  <div class="banner-container">
    <div class="banner">
      <div class="banner-text title-color">
        <h1 class="display-1 fw-bolder">Merry</h1>
        <h1 class="display-1 fw-bolder">Christmas</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
})
</script>

<style lang="scss" scoped>
.banner-container {
  overflow: hidden;
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('~@/assets/banner1.png');
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: inherit;
    @media (max-width: 768px) {
      background-position: center;
      background-image: url('~@/assets/rwdbanner.png');
    }
    .banner-text {
      margin-right: 13%;
      margin-top: 13%;
      align-self: flex-end;
      @media (max-width: 768px) {
        align-self: inherit;
        margin: 0;
        color: black;
      }
    }
  }
}
</style>
