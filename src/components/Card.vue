<template>
  <div class="px-3">
    <div class="card" style="width: 18rem;">
      <img :src="card.photo" class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-capitalize fw-bolder">{{card.title}}</h5>
        <p class="card-text">{{card.article}}</p>
        <Button class="ml-auto" style="margin-top: auto;" type="submit" @click="editPost(card._id)">Edit this post</Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from '@/components/btn.vue'
export interface CardProps {
  _id: string;
  title: string;
  photo: string;
  article: string;
};
export default defineComponent({
  components: {
    Button
  },
  props: {
    card: {
      type: Object as PropType<CardProps[]>,
      required: true
    }
  },
  setup () {
    const editPost = (id) => {
      console.log(id)
    }
    return {
      editPost
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
  backdrop-filter: blur(3px);
  background-color: transparent;
  border: none;
  box-shadow: 0px 0px 9px #0000005e;
  .card-img-top {
    height: 300px;
    object-fit: cover;
  }
  .card-text {
    height: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
