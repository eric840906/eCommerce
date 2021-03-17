<template>
  <section class="mid-link d-flex flex-column flex-md-row justify-content-md-evenly px-5" data-aos="fade-up" data-aos-offset="300" data-aos-once="false" data-aos-easing="ease-in-out">
    <div class="row g-3 align-items-center justify-content-center">
      <h5 class="display-5 text-uppercase">Subscribe us</h5>
      <div class="col-auto">
        <label for="email" class="col-form-label">Your email</label>
      </div>
      <div class="col-auto">
        <input type="email" id="email" class="form-control">
      </div>
      <div class="col-auto">
        <label for="name" class="col-form-label">Your name</label>
      </div>
      <div class="col-auto">
        <input id="name" class="form-control">
      </div>
      <div class="col-auto">
        <Button>Make a subscription</Button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import AOS from 'aos'
import { defineComponent } from 'vue'
import Button from '@/components/btn.vue'
AOS.init()

export default defineComponent({
  components: {
    Button
  }
})
</script>

<style lang="scss" scoped>
.mid-link {
  background-image: url('~@/assets/midlink1.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding-top: 10rem;
  padding-bottom: 10rem;
}
</style>
