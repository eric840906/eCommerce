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
      <div :data-type="item.category" class="product-card front-morph shadow">
        <div class="cover">
          <a href="#" class="icon-btn trans-left me-3"><fa icon="search" type="fas" class="product-icon"></fa></a>
          <a href="#" class="icon-btn trans-right"><fa icon="shopping-cart" type="fas" class="product-icon"></fa></a>
        </div>
        <div class="overflow-hidden d-flex img-frame">
          <img class="img-fluid product-img" :src="item.images[0]" alt="">
        </div>
        <div class="d-flex flex-row mt-2">
          <h4 class="ms-2 text-capitalize">{{item.name}}</h4>
        </div>
        <div class="product-rate ms-auto m-2 text-end">
          <fa icon="star" type="fas" class="star-icon" v-for="(star,index) in Math.ceil(item.ratingsAverage)" :key="index"></fa>
        </div>
        <div class="price-block d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-center">
            <p v-if="item.discountPrice" class="display-6 price old-price">${{item.price}}</p>
            <p class="price ms-2">${{item.discountPrice ? item.discountPrice : item.price}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { Product } from '@/api/product'
import { getAllProduct } from '@/api'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Filter from '@/components/Shop/filter.vue'
import Category from '@/components/Shop/category.vue'
import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    Category,
    Filter
  },
  setup () {
    const productList = reactive({ data: [] as Product[] })
    const page = ref(1)
    const filterString = ref('')
    const toast = useToast()
    const store = useStore()
    const router = useRouter()
    const getContent = async (query: string) => {
      try {
        store.dispatch('loading')
        const res = await getAllProduct(query, page.value)
        if (res.status === 200) {
          productList.data = res.data.data
          setTimeout(() => store.dispatch('loading'), 1000)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        setTimeout(() => store.dispatch('loading'), 1000)
      }
    }
    watch(() => router.currentRoute.value.params.query as string, (newVal) => {
      getContent(newVal)
    })
    bus.on('product-filter', async (filter) => {
      filterString.value = filter
      try {
        store.dispatch('loading')
        const res = await getAllProduct(router.currentRoute.value.params.query as string, page.value, filter)
        if (res.status === 200) {
          productList.data = res.data.data
          setTimeout(() => store.dispatch('loading'), 1000)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        setTimeout(() => store.dispatch('loading'), 1000)
      }
    })
    getContent(router.currentRoute.value.params.query as string)
    return {
      productList,
      page
    }
  }
})
</script>

<style lang="scss" scoped>
.old-price {
  text-decoration: line-through;
  font-size: 1.5rem;
}
.product-icon {
  width: 30px;
  height: 30px;
}
.star-icon {
  width: 15px;
  height: 15px;
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
  .product-rate {
    color: #ffc100;
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
