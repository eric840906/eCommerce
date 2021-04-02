<template>
  <li class="d-flex justify-content-between" v-for="item in cateList.data" :key="item._id">
    <router-link class="text-uppercase" :to="`/blog/${item._id}`">{{item._id}}</router-link>
    <span>{{item.numPosts}}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getPostCount } from '@/api'
import { useToast } from 'vue-toastification'
import bus from '@/plugins/bus'
interface Category {
  _id: string;
  numPost: number;
}
export default defineComponent({
  async setup () {
    const toast = useToast()
    const searchCate = (id: string) => {
      bus.emit('category-change', id)
    }
    const cateList = reactive({ data: [] as Category[] })
    try {
      const res = await getPostCount()
      if (res.status === 200) {
        cateList.data = res.data.data
      }
    } catch (error) {
      toast.error('some error occurred')
    }
    return {
      cateList,
      searchCate
    }
  }
})
</script>
