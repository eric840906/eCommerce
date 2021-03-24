<template>
  <div class="d-flex flex-column mb-5 w-100 front-morph p-2 p-md-4">
    <div class="col-12 d-flex flex-column flex-lg-row flex-wrap">
      <div class="col-12 col-lg-6 d-flex justify-content-center align-items-baseline px-md-3">
        <img
          class="article-cover-img img-fluid"
          v-if="pageContent.data.images"
          :src="pageContent.data.images[0]"
          alt=""
        />
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
              <input class="number-box shadow border-0" type="number" name="" id="" max="5" min="0" v-model.number="productCount">
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
        <Button class="mt-5 text-uppercase">add to shopping bag</Button>
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
    <!-- <div class="flex-column w-100">
      <div class="d-flex flex-column w-100 flex-md-row flex-md-wrap text-start mb-3 p-3 front-morph" :data-aos="`${index % 2 === 0 ? 'fade-left' : 'fade-right'}`" data-aos-offset="100" data-aos-once="false" data-aos-easing="ease-in-out">
        <div class="col-md-2">
          <img :src="item.user.photo" alt="" class="img-fluid comment-user-pic">
        </div>
        <div class="ps-md-3 col-md-10 comment-text d-flex flex-column">
          <div class="d-flex flex-row w-100">
            <p>user name</p>
            <p class="ms-auto">date</p>
          </div>
          <p class="text-break">user comment</p>
          <div class="ms-auto">
            <Button v-if="user.role === 'admin'" @click.prevent="deletePost(item._id)">DELETE POST</Button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <a v-if="moreComment" href="#" @click.prevent="getComments">Load more comments</a>
    <p v-else>All comment's been loaded</p>
    <h3 v-if="pageContent.data.comments.length === 0" class="text-uppercase">no comments</h3>
    <form action="" v-if="user._id" @submit.prevent="sendComment">
      <div class="row">
        <div class="col text-start">
          <label for="comment">Laeve your comment</label>
          <textarea type="text" class="form-control mt-2" id="comment" placeholder="Last name" aria-label="Last name" v-model="comment"></textarea>
          <Button class="mt-2 ms-auto" type="submit">Send my comment</Button>
        </div>
      </div>
    </form>
    <Button v-else class="mt-2 ms-auto" type="submit" @click="openLogin">You must be logged in to leave comments</Button> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getSingleProduct } from '@/api'
import { Product } from '@/api/product'
import { useToast } from 'vue-toastification'
// import { UserInfo } from '@/store'
// import { RecentCarousel } from '@/components/carousel.vue'
import Button from '@/components/btn.vue'
// import { useStore } from 'vuex'
// import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    Button
  },
  setup () {
    const toast = useToast()
    const router = useRouter()
    const productCount = ref(1)
    const pageContent = reactive({ data: {} as Product })
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
      console.log(res)
      if (res.status === 200) {
        pageContent.data = res.data.data
      }
    }
    getProduct()
    return {
      pageContent,
      productCount,
      addCount,
      minusCount
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
.product-btn {
  background-color: #a8847c;
  border-radius: 0.5rem;
  border: none;
  .product-btn-icon {
    color: white;
    height: 1rem;
  }
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
