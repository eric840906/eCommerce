<template>
  <li class="d-flex justify-content-between" v-for="item in cateList.data" :key="item._id">
    <router-link class="text-uppercase" :to="`/shop/${item._id}`">{{item._id}}</router-link>
    <span>{{item.numPosts}}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getProductCount } from '@/api'
import { useToast } from 'vue-toastification'
interface Category {
  _id: string;
  numPost: number;
}
export default defineComponent({
  setup () {
    const toast = useToast()
    const cateList = reactive({ data: [] as Category[] })
    const getCount = async () => {
      try {
        const res = await getProductCount()
        if (res.status === 200) {
          cateList.data = res.data.data
        }
      } catch (error) {
        toast.error('some error occurred')
      }
    }
    getCount()
    return {
      cateList
    }
  }
})
</script>
