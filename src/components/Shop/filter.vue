<template>
  <li class="d-flex justify-content-between flex-column">
    <label for=""><span>max</span></label>
    <label class="d-flex mb-1" for=""><span class="me-auto">0</span><span>500</span></label>
    <input type="range" class="slider mb-3" min="0" max="500" v-model.number="priceMax">
    <input type="number" class="custom-input" v-model.number="priceMax">
    <label for=""><span>min</span></label>
    <label class="d-flex mb-1" for=""><span class="me-auto">0</span><span>500</span></label>
    <input type="range" class="slider mb-3" min="0" max="500" v-model.number="priceMin">
    <input type="number" class="custom-input" v-model.number="priceMin">
    <Button class="mt-3" @click.prevent="submitFilter" :disabled="disabled">Filter Products</Button>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from '@/components/btn.vue'
import { useToast } from 'vue-toastification'
import bus from '@/plugins/bus'

export default defineComponent({
  components: {
    Button
  },
  setup () {
    const toast = useToast()
    const priceMin = ref(0)
    const priceMax = ref(0)
    const disabled = ref(false)
    const submitFilter = () => {
      disabled.value = true
      if (priceMin.value > priceMax.value) {
        setTimeout(() => { disabled.value = false }, 3000)
        priceMin.value = 0
        priceMax.value = 0
        toast.error('invalid filter')
      } else {
        bus.emit('product-filter', `price[gte]=${priceMin.value}&price[lte]=${priceMax.value}`)
        setTimeout(() => { disabled.value = false }, 3000)
        priceMin.value = 0
        priceMax.value = 0
      }
    }
    return {
      priceMin,
      priceMax,
      submitFilter,
      disabled
    }
  }
})
</script>

<style lang="scss" scoped>

.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  background: #d9beb2; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 15px; /* Set a specific slider handle width */
  height: 15px; /* Slider handle height */
  background: #9c7a72; /* Green background */
  margin-top: -5px;
  border-radius: 100%;
  cursor: pointer; /* Cursor on hover */
}
.slider::-webkit-slider-runnable-track {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  height: 5px;
}
.custom-input {
  background-color: #fcfcfc00;
  outline: none;
  border: none;
  box-shadow: 0px 0px 1px black;
}
</style>
