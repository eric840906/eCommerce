<template>
  <transition name="modal-show">
    <div class="modal" v-show="modalShow" @click.self="modalToggle">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-uppercase">
              <slot name="header">
              </slot>
            </h5>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import bus from '@/plugins/bus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const modalShow = ref(false)
    const modalToggle = () => {
      modalShow.value = !modalShow.value
    }
    bus.on('*', modalToggle)
    return {
      modalShow,
      modalToggle
    }
  }
})
</script>

<style lang="scss" scoped>
  .modal-show-enter-from, .modal-show-leave-to {
    opacity: 0;
  }
  .modal-show-enter-to, .modal-show-leave-from {
    opacity: 1;
  }
  .modal-show-enter-active, .modal-show-leave-active {
    transition: all 0.3s ease;
  }
  .modal {
    font-weight: bold;
    background-color: #0000004a;
    display: flex;
    justify-content: center;
    .modal-dialog {
      margin: 0;
    }
    .modal-content {
      color: #ededed;
      box-shadow: 0px 1px 5px black;
      border: none;
      background-color: #ffffff21;
      backdrop-filter: blur(3px);
      height: 500px;
      width: 300px;
    }
  }
</style>
