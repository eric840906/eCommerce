<template>
  <div class="d-flex flex-column mb-5 w-100 front-morph p-2 p-md-4">
    <div class="col-12 d-flex flex-column flex-lg-row flex-wrap">
      <div class="col-12 col-lg-6 d-flex justify-content-center flex-column align-items-baseline px-md-3">
          <Swiper :imgArr="pageContent.data.images"></Swiper>
      </div>
      <div class="col-12 col-lg-6 d-flex flex-column px-md-3 pt-3 pt-lg-0">
        <div class="d-flex flex-column text-start">
          <div class="post-info d-flex flex-row align-items-center">
            <h6
              class="me-3 tag px-2 py-1 shadow text-uppercase"
              style="color: white; background: #a8847c;"
            >
              {{pageContent.data.category}}
            </h6>
          </div>
        </div>
        <h3 class="mt-md-0 mt-3 text-uppercase text-start text-break">
          {{pageContent.data.name}}
        </h3>
        <div class="d-flex flex-row">
          <div class="product-rate text-end my-3 d-flex align-items-center">
            <fa icon="star" type="fas" class="star-icon" v-for="(star,index) in Math.floor(pageContent.data.ratingsAverage)" :key="index"></fa>
            <fa icon="star-half" type="fas" class="star-icon" v-if="pageContent.data.ratingsAverage - Math.ceil(pageContent.data.ratingsAverage)"></fa>
          </div>
        </div>
        <p class="text-start lh-lg">{{pageContent.data.description}}</p>
        <div class="d-flex flex-row mt-auto">
          <div class="d-flex count-box mt-auto">
            <div class="col-8">
              <input class="number-box shadow border-0" type="number" max="10" min="1" v-model.number="productCount">
            </div>
            <div class="col-4 ps-1">
              <div class="d-flex flex-column h-100">
                <button class="h-100 product-btn mb-1" @click="addCount"><fa icon="plus" type="fas" class="product-btn-icon"></fa></button>
                <button class="h-100 product-btn" @click="minusCount"><fa icon="minus" type="fas" class="product-btn-icon"></fa></button>
              </div>
            </div>
          </div>
          <p class="text-start display-6 mb-0 ms-auto align-self-end">${{pageContent.data.discountPrice ? pageContent.data.discountPrice * productCount : pageContent.data.price * productCount }}</p>
        </div>
        <Button class="mt-5 text-uppercase" @click.prevent="addBag(pageContent.data._id)">add to shopping bag</Button>
    </div>
    </div>
    <hr>
    <div class="d-flex w-100">
      <p class="ms-auto text-uppercase mb-0 share-text">share</p>
      <div class="ms-3">
        <a href="javascript:">
          <fa icon="facebook-f" type="fab" class="mx-2 share-icon"></fa>
        </a>
        <a href="javascript:">
          <fa icon="google-plus-g" type="fab" class="mx-2 share-icon"></fa>
        </a>
        <a href="javascript:">
          <fa icon="twitter" type="fab" class="mx-2 share-icon"></fa>
        </a>
        <a href="javascript:">
          <fa icon="instagram" type="fab" class="mx-2 share-icon"></fa>
        </a>
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column" data-aos="fade-up" data-aos-offset="100" data-aos-once="false" data-aos-easing="ease-in-out">
      <h3 class="text-uppercase text-start">related product</h3>
      <div class="d-flex flex-row w-100 overflow-auto text-start" >
        <div class="col-12 col-md-6 px-3">
          <div class="related-card front-morph d-flex flex-column align-items-center p-3 mb-3">
            <div class="img-frame">
              <a href="" class="related-link">
                <img class="img-fluid" src="https://i.imgur.com/NGd9EVc.jpg" alt="">
              </a>
            </div>
            <h4 class="mt-2">2021-03-16</h4>
            <h4 class="mt-2">title</h4>
            <p class="px-3 related-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente earum ad maiores exercitationem eligendi harum debitis totam corrupti fuga consectetur perferendis atque, blanditiis vel, perspiciatis rerum. Qui voluptate pariatur magnam.</p>
          </div>
        </div>
        <div class="col-12 col-md-6 px-3">
          <div class="related-card front-morph d-flex flex-column align-items-center p-3 mb-3">
            <div class="img-frame">
              <a href="" class="related-link">
                <img class="img-fluid" src="https://i.imgur.com/wyYeqWq.jpg" alt="">
              </a>
            </div>
            <h4 class="mt-2">2021-03-16</h4>
            <h4 class="mt-2">title</h4>
            <p class="px-3 related-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente earum ad maiores exercitationem eligendi harum debitis totam corrupti fuga consectetur perferendis atque, blanditiis vel, perspiciatis rerum. Qui voluptate pariatur magnam.</p>
          </div>
        </div>
        <div class="col-12 col-md-6 px-3">
          <div class="related-card front-morph d-flex flex-column align-items-center p-3 mb-3">
            <div class="img-frame">
              <a href="" class="related-link">
                <img class="img-fluid" src="https://i.imgur.com/QHmLrpP.jpg" alt="">
              </a>
            </div>
            <h4 class="mt-2">2021-03-16</h4>
            <h4 class="mt-2">title</h4>
            <p class="px-3 related-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente earum ad maiores exercitationem eligendi harum debitis totam corrupti fuga consectetur perferendis atque, blanditiis vel, perspiciatis rerum. Qui voluptate pariatur magnam.</p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <h3 class="text-uppercase text-start">Reviews</h3>
    <div class="flex-column w-100">
      <div class="d-flex flex-column w-100 flex-md-row flex-md-wrap text-start mb-3 p-3 front-morph" v-for="item in reviewList" :key="item._id">
        <div class="col">
          <img :src="item.user.photo" alt="" class="img-fluid comment-user-pic">
        </div>
        <div class="col-md-10 mt-2 mt-md-0 comment-text d-flex flex-column">
          <div class="d-flex flex-md-row w-100 flex-column">
            <div class="d-flex flex-row">
              <h5>{{item.user.name}}</h5>
              <div class="product-rate ms-auto ms-md-2">
                <fa icon="star" type="fas" class="star-icon align-text-top" v-for="(star, index) in item.rating" :key="index"></fa>
              </div>
            </div>
            <p class="ms-md-auto">{{ new Date(item.createdAt).toLocaleDateString('en-us', { year:'numeric', month: 'long', day: 'numeric' }) }}</p>
          </div>
          <p class="text-break">{{item.review}}</p>
          <div class="ms-auto">
            <!-- <Button v-if="user.role === 'admin'" @click.prevent="deletePost(item._id)">DELETE POST</Button> -->
          </div>
        </div>
      </div>
    </div>
    <form action="" @submit.prevent="leaveReview">
      <div class="row">
        <div class="col text-start">
          <label for="comment">Laeve your review</label>
          <textarea type="text" class="form-control mt-2" id="comment" placeholder="Last name" aria-label="Last name" v-model="review"></textarea>
          <label for="comment">Rating</label>
          <div>
            <template v-for="(item, index) in 5" :key="index">
              <a href="#"><fa icon="star" :type="`${rating >= index + 1 ? 'fas' : 'far' }`" class="star-icon" @mouseover="hoverStar(index+1)" @mouseleave="hoverStar(0)" @click.prevent="decideRate(true , index+1)" @dblclick="decideRate(false , 0)"></fa></a>
            </template>
          </div>
          <Button class="mt-2 ms-auto" type="submit">Send my review</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Swiper from '@/components/swiper.vue'
import { useRouter } from 'vue-router'
import { getSingleProduct, postCart, getReview, postReview } from '@/api'
import { Product } from '@/api/product'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'
import { UserInfo } from '@/store'
import { ReviewData } from '@/api/review'
// import { UserInfo } from '@/store'
// import { RecentCarousel } from '@/components/carousel.vue'
import Button from '@/components/btn.vue'
// import { useStore } from 'vuex'
// import bus from '@/plugins/bus'
export interface Review {
  _id: string;
  product: string;
  review: string;
  rating: number;
  user: UserInfo;
  createdAt: string;
  id?: string;
}
export default defineComponent({
  components: {
    Button,
    Swiper
  },
  setup () {
    const toast = useToast()
    const router = useRouter()
    const store = useStore()
    const review = ref('')
    const reviewList = ref([] as Review[])
    const reviewPage = ref(1)
    const productCount = ref(1)
    const pageContent = reactive({ data: {} as Product })
    const rateDecide = ref(false)
    const rating = ref(0)
    const loadReview = async () => {
      try {
        const res = await getReview(router.currentRoute.value.params.id as string, reviewPage.value)
        if (res.status === 200) {
          reviewList.value = res.data.data
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const leaveReview = async () => {
      const data: ReviewData = {
        product: router.currentRoute.value.params.id as string,
        review: review.value,
        rating: rating.value
      }
      try {
        const res = await postReview(data)
        if (res.status === 201) {
          toast.success('review posted')
          loadReview()
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const hoverStar = (count: number) => {
      if (rateDecide.value) return
      rating.value = count
    }
    const decideRate = (bool: boolean, count: number) => {
      rating.value = count
      rateDecide.value = bool
    }
    const addCount = () => {
      if (productCount.value >= 10) return toast.info('Reach the limit')
      productCount.value++
    }
    const minusCount = () => {
      if (productCount.value === 0) return toast.info('Cannot set less than 0')
      productCount.value--
    }
    const getProduct = async () => {
      const res = await getSingleProduct(router.currentRoute.value.params.id as string)
      if (res.status === 200) {
        pageContent.data = res.data.data
      }
    }
    const addBag = async (id: string) => {
      const data = {
        product: id,
        quantity: productCount.value
      }
      try {
        const res = await postCart(data)
        if (res.status === 200) {
          await store.dispatch('Check')
          toast.success('item added')
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    getProduct()
    loadReview()
    return {
      pageContent,
      productCount,
      addCount,
      minusCount,
      addBag,
      hoverStar,
      rating,
      decideRate,
      review,
      reviewList,
      leaveReview
    }
  }
})
</script>

<style lang="scss" scoped>
.number-box {
  width: 5rem;
  height: 5rem;
  font-size: 2rem;
  text-align: center;
  border-radius: 0.5rem;
  background-color: #a8847c;
  color: white;
}
.article-cover-img {
  max-width: 100%;
  height: auto;
}
.count-box {
  width: 8rem;
}
.author-info {
  background-color: #eef0f14a;
  backdrop-filter: blur(6px);
  border-radius: 100px;
  img {
    height: 2rem;
    width: 2rem;
    border-radius: 100%;
  }
}
.product-rate {
  color: #ffc100;
  .star-icon {
    height: 1rem;
  }
}
.share-icon {
  height: 15px;
}
.share-text {
  font-size: 12px;
  align-self: flex-end;
}
.comment-user-pic {
  max-width: 125px;
}
.post-img {
  max-height: 15rem;
  max-width: 15rem;
}
.related-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
.img-frame {
  height: 20rem;
  overflow: hidden;
}
.related-link {
  img {
    transition: 0.5s all ease;
  }
  &:hover {
    img {
      transform: scale(1.2);
    }
  }
}
</style>
