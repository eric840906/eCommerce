<template>
  <div ref="scrollComponent">
    <div
      v-for="(item, index) in pageContent.data"
      :key="item.id"
      class="d-flex flex-column flex-md-row mb-5 w-100 front-morph p-5 shadow"
      :data-aos="`${index % 2 === 0 ? 'fade-left' : 'fade-right'}`" data-aos-offset="100" data-aos-once="false" data-aos-easing="ease-in-out"
    >
      <div class="col-lg-8 col-md-6 col-sm-12 d-flex flex-column text-start">
        <div class="post-info d-flex flex-row align-items-center">
          <h6
            class="me-3 tag px-2 py-1 shadow text-uppercase"
            style="color: white; background: #a8847c;"
          >
            {{item.category}}
          </h6>
          <h5>{{ new Date(item.created).toLocaleDateString('en-us', { year:'numeric', month: 'long', day: 'numeric' }) }}</h5>
        </div>
        <h3 class="mt-md-0 mt-3 text-uppercase text-start text-break">{{ item.title }}</h3>
        <div class="w-100">
          <p class="display-text">{{ item.article }}</p>
        </div>
        <router-link :to="`/blog/default/${item.id}`">Read more</router-link>
        <div
          class="author-info d-none d-md-flex align-self-end p-1 mt-5 order-md-last order-first shadow"
        >
          <img :src="item.author.photo" alt="" />
          <p class="align-self-center mx-3 mb-0">{{ item.author.name }}</p>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center mt-3 mt-md-0">
        <img class="img-circle" :src="item.photo" alt="" />
      </div>
    </div>
    <div class="mx-auto my-5" v-if="loading">
    </div>
    <div class="m-auto" v-if="!callMore">
      All Posts' been loaded
    </div>
    <div v-else>
      <loading></loading>
      loading
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted, watch, reactive } from 'vue'
import { debounce } from '@/plugins/debounce'
import { getContent } from '@/api'
import { RecentCarousel } from '@/components/carousel.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
export default defineComponent({
  async setup () {
    const router = useRouter()
    const scrollComponent = ref<HTMLLIElement | null>(null)
    const loading = ref(false)
    const debounceTimer = 5000
    const page = ref(1)
    const toast = useToast()
    const callMore = ref(true)
    const pageContent = reactive({ data: [] as RecentCarousel[]|null })
    watch(() => router.currentRoute.value.params.query, async (newVal) => {
      console.log(newVal)
      try {
        page.value = 1
        const res = await getContent(page.value, 5, newVal as string)
        pageContent.data = res.data.data
        if (res.status === 200) {
          page.value++
          callMore.value = true
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    })
    const handleScroll = async () => {
      if (!callMore.value) return
      loading.value = true
      console.log(scrollComponent.value)
      if (!scrollComponent.value) return
      const el: HTMLLIElement|null = scrollComponent.value
      if (el.getBoundingClientRect().bottom < window.innerHeight) {
        try {
          const res = await getContent(page.value, 5, router.currentRoute.value.params.query as string)
          console.log(res)
          if (res.status === 200) {
            if (!pageContent.data) return
            pageContent.data.push(...res.data.data)
            if (res.data.data.length === 0) callMore.value = false
            console.log(pageContent.data)
            loading.value = false
            page.value++
          }
        } catch (error) {
          toast.error(error)
          loading.value = false
        }
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', debounce(handleScroll, debounceTimer))
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', debounce(handleScroll, debounceTimer))
    })
    try {
      const res = await getContent(page.value, 5, router.currentRoute.value.params.query as string)
      pageContent.data = res.data.data
      if (res.status === 200) {
        page.value++
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    return {
      page,
      loading,
      scrollComponent,
      pageContent,
      callMore
    }
  }
})
</script>

<style lang="scss" scoped>
.img-circle {
  height: 15rem;
  width: 15rem;
}
.author-info {
  background-color: #eef0f14a;
  backdrop-filter: blur(6px);
  border-radius: 100px;
  img {
    height: 3rem;
    width: 3rem;
    border-radius: 100%;
  }
}
.display-text {
  max-height: 30px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  width: 100%;
  @media (max-width: 767px) {
     white-space: nowrap;
  }
}
</style>
