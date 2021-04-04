<template>
<div class="row flex-wrap">
  <div class="col-12 col-md-3 mt-5 mt-md-0">
    <nav class="blog-nav">
      <ul class="m-0 p-0">
        <li class="nav-block front-morph p-3 shadow mb-3">
          <div class="d-flex flex-column">
            <p class="fw-bolder text-uppercase">Categories</p>
            <div class="d-flex flex-wrap">
              <ul class="w-100 p-0">
                <Category></Category>
              </ul>
            </div>
          </div>
        </li>
        <li class="nav-block front-morph p-3 shadow mb-3">
          <div class="d-flex flex-column">
            <p class="fw-bolder text-uppercase">filter</p>
            <div class="d-flex flex-wrap">
              <ul class="w-100 p-0 newest-list">
                <Filter></Filter>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
  <div class="col-12 col-md-9 d-flex flex-column flex-md-row flex-md-wrap">
    <div class="col-12 col-md-4 d-flex flex-column px-2 mb-3" v-for="item in productList.data" :key="item._id">
      <div :data-type="item.category" class="product-card front-morph shadow position-relative">
        <div class="cover">
          <a href="#" class="icon-btn trans-left me-3" @click.prevent="goProduct(item._id)"><fa icon="search" type="fas" class="product-icon"></fa></a>
          <a href="#" class="icon-btn trans-right" @click.prevent="addProduct(item._id)"><img class="bag-icon" src="~@/assets/shopping-bag.svg" alt=""></a>
        </div>
        <div class="overflow-hidden d-flex img-frame">
          <img class="img-fluid product-img" :src="item.images[0]" alt="">
        </div>
        <div class="d-flex flex-row mt-2">
          <h4 class="ms-2 text-capitalize">{{item.name}}</h4>
        </div>
        <div class="product-rate ms-auto m-2 text-end">
          <fa icon="star" type="fas" class="star-icon" v-for="(star,index) in Math.floor(item.ratingsAverage)" :key="index"></fa>
          <fa icon="star-half" type="fas" class="star-icon" v-if="item.ratingsAverage - Math.ceil(item.ratingsAverage)"></fa>
        </div>
        <div class="price-block d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-center">
            <p v-if="item.discountPrice" class="display-6 price old-price">${{item.price}}</p>
            <p class="price ms-2">${{item.discountPrice ? item.discountPrice : item.price}}</p>
          </div>
        </div>
      </div>
    </div>
    <template v-if="!hasMore">
      <div class="col-12">
      </div>
    </template>
    <template v-else>
      <div class="col-12 my-3" v-if="!contentLoading">
        <Button @click="getMore($router.currentRoute.value.params.query)">load more</Button>
      </div>
      <div class="col-12 my-3" v-else>
        <loading></loading>
        <p>loading more products</p>
      </div>
    </template>
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import { Product } from '@/api/product'
import { getAllProduct, postCart } from '@/api'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Button from '@/components/btn.vue'
import Filter from '@/components/Shop/filter.vue'
import Category from '@/components/Shop/category.vue'
import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    Category,
    Filter,
    Button
  },
  setup () {
    const productList = reactive({ data: [] as Product[] })
    const page = ref(1)
    const contentLoading = ref(false)
    const hasMore = ref(true)
    const filterString = ref('')
    const toast = useToast()
    const store = useStore()
    const router = useRouter()
    const userLog = computed(() => {
      return store.getters.getUser
    })
    const goProduct = (id: string) => {
      router.push(`default/${id}`)
    }
    const addProduct = async (id: string) => {
      const loginFirst = () => {
        toast.info('Please log in first to use cart')
        bus.emit('Login-open')
      }
      if (!userLog.value._id) return loginFirst()
      const data = {
        product: id,
        quantity: 1
      }
      try {
        const res = await postCart(data)
        if (res.status === 200) {
          console.log(res)
          await store.dispatch('Check')
          toast.success('item added')
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const getContent = async (query: string) => {
      try {
        store.dispatch('loading')
        const res = await getAllProduct(query, page.value)
        if (res.status === 200) {
          productList.data = res.data.data
          setTimeout(() => store.dispatch('loading'), 1000)
          page.value++
        }
      } catch (error) {
        toast.error(error.response.data.message)
        setTimeout(() => store.dispatch('loading'), 1000)
      }
    }
    const getMore = async (query: string) => {
      try {
        contentLoading.value = true
        const res = await getAllProduct(query, page.value)
        if (res.status === 200) {
          if (res.data.data.length === 0) {
            hasMore.value = false
            contentLoading.value = false
            toast.info("all product's been loaded")
            return
          }
          contentLoading.value = false
          productList.data = [...productList.data, ...res.data.data]
          page.value++
        }
      } catch (error) {
        contentLoading.value = false
        toast.error(error.response.data.messgae)
      }
    }
    watch(() => router.currentRoute.value.params.query as string, (newVal) => {
      page.value = 1
      hasMore.value = true
      getContent(newVal)
    })
    bus.on('product-filter', async (filter) => {
      filterString.value = filter
      page.value = 1
      hasMore.value = true
      try {
        store.dispatch('loading')
        const res = await getAllProduct(router.currentRoute.value.params.query as string, page.value, filter)
        if (res.status === 200) {
          productList.data = res.data.data
          setTimeout(() => store.dispatch('loading'), 3000)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        setTimeout(() => store.dispatch('loading'), 3000)
      }
    })
    getContent(router.currentRoute.value.params.query as string)
    return {
      productList,
      page,
      goProduct,
      addProduct,
      userLog,
      contentLoading,
      getMore,
      hasMore
    }
  }
})
</script>

<style lang="scss" scoped>
.old-price {
  text-decoration: line-through;
  font-size: 1.5rem;
}
.icon-btn {
  &:hover {
    .bag-icon {
      filter: invert(1%) sepia(6%) saturate(7465%) hue-rotate(244deg) brightness(50%) contrast(50%);
    }
  }
}
.product-icon {
  width: 30px;
  height: 30px;
}
.product-card {
  overflow: hidden;
  .cover {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #0707079f;
    z-index: 2;
    transition: all 0.5s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-btn {
    transition: all 0.5s ease;
  }
  .trans-left {
    transform: translate(-500%, 500%);
  }
  .trans-right {
    transform: translate(500%, 500%);
  }
  .img-frame {
    height: 14rem;
  }
  .product-img {
    object-fit: cover;
    transition: all 0.5s ease;
    transform: scale(1);
    width: 100%;
  }
  &:hover {
    .product-img {
      transform: scale(1.5);
    }
    .cover {
      opacity: 1;
    }
    .icon-btn {
      transform: translate(0);
    }
  }
  &::before {
    content: attr(data-type);
    position: absolute;
    z-index: 1;
    background-color: #99766d;
    padding: 0 10px;
    left: 0;
    color: white;
    top: 0;
    text-transform: uppercase;
  }
}
</style>
