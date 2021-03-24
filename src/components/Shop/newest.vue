<template>
  <li class="d-flex justify-content-between mb-3" v-for="item in computedContent" :key="item.id">
    <div class="col-4">
      <img class="post-thumbnail" :src="item.photo" alt="">
    </div>
    <div class="col-8 d-flex flex-column text-start ps-3 justify-content-around">
      <h5 class="post-name text-capitalize"><router-link :to="`/blog/default/${item.id}`">{{item.title}}</router-link></h5>
      <p class="post-date">{{item.created}}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getContent } from '@/api'
import { RecentCarousel } from '@/components/carousel.vue'
import { dateFormatter } from '@/plugins/dateFormatter'

export default defineComponent({
  async setup () {
    let rawContent: RecentCarousel[] = []
    const res = await getContent(1, 2, 'default')
    console.log(res)
    rawContent = res.data.data
    const computedContent = computed(() => {
      return rawContent.map(item => {
        item.created = dateFormatter(item.created)
        return item
      })
    })
    return {
      computedContent
    }
  }
})
</script>

<style lang="scss" scoped>
.post-thumbnail {
  width: 100%;
  max-width: 100px;
  height: 80px;
}
</style>
