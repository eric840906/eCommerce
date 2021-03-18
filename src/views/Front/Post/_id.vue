<template>
  <div>
    asfasfasdf
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrent } from '@/api'
import { useToast } from 'vue-toastification'

export default defineComponent({
  async setup () {
    const router = useRouter()
    const toast = useToast()
    const pageContent = reactive({ data: {} })
    try {
      const res = await getCurrent(router.currentRoute.value.params.id as string)
      if (res.status === 200) {
        pageContent.data = res.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    return {
      pageContent
    }
  }
})
</script>
