<template>
  <div class="banner-container">
    <div class="banner">
      <div class="banner-text w-100 d-flex flex-column justify-content-center">
        <h1 class="display-1 text-uppercase">shop</h1>
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
  padding-top: 5rem;
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: inherit;
    @media (max-width: 768px) {
      background-position: center;
      max-height: 22rem;
    }
    .banner-text {
      height: 30rem;
      align-self: flex-end;
      background-color: #06060696;
      color: white;
      backdrop-filter: blur(2px);
      @media (max-width: 768px) {
        align-self: inherit;
        margin: 0;
      }
    }
  }
}
</style>
