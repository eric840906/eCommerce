<template>
  <div class="user-link" :data-tag="tag">
    <fa :icon="linkIcon" type="fas"></fa>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    linkIcon: {
      type: String
    }
  },
  setup (props) {
    const tag = computed(() => {
      return props.linkIcon === 'home' ? `${'Account'.toUpperCase()}` : `${'website'.toUpperCase()}`
    })
    return { tag }
  }
})
</script>

<style lang="scss" scoped>
  .user-link {
    cursor: pointer;
    position: fixed;
    right: 20px;
    bottom: 20px;
    height: 60px;
    width: 60px;
    background-color: #ffffff00;
    color: #4d3220;
    border-radius: 100%;
    box-shadow: 0px 1px 10px black;
    backdrop-filter: blur(20px);
    padding: 10px;
    &::before {
      content: attr(data-tag);
      position: absolute;
      pointer-events: none;
      top: 0rem;
      left: -6rem;
      box-shadow: 0px 0px 2px black;
      background-color: transparent;
      padding: 10px;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }
</style>
