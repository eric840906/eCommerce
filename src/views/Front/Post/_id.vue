<template>
  <div v-if="pageContent.data" class="d-flex flex-column mb-5 w-100">
    <div class="col d-flex flex-column text-start">
      <div class="post-info d-flex flex-row align-items-center">
        <h6
          class="me-3 tag px-2 py-1 shadow text-uppercase"
          style="color: white; background: #a8847c;"
        >
          Other
        </h6>
        <h5>{{ new Date(pageContent.data.created).toLocaleDateString('en-us', { year:'numeric', month: 'long', day: 'numeric' })}}</h5>
      </div>
    </div>
    <h3 class="mt-md-0 mt-3 text-uppercase text-start text-break">
      {{ pageContent.data.title }}
    </h3>
    <div
          class="author-info d-flex align-self-end p-1 shadow"
        >
          <img :src="pageContent.data.author.photo" alt="" />
          <p class="align-self-center mx-3 mb-0">
            {{ pageContent.data.author.name }}
          </p>
        </div>
    <div class="col d-flex justify-content-center align-items-center">
      <img
        class="article-cover-img img-fluid my-5"
        :src="pageContent.data.photo"
        alt=""
      />
    </div>
    <p class="text-start">{{ pageContent.data.article }}</p>
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
    <div class="d-flex flex-column">
      <h3 class="text-uppercase text-start">related posts</h3>
      <div class="d-flex flex-row w-100 overflow-auto text-start">
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
    <h3 class="text-uppercase text-start">comments</h3>
    <div class="flex-column w-100">
      <div class="d-flex flex-column w-100 flex-md-row flex-md-wrap text-start mb-3 p-3 front-morph"  v-for="item in pageContent.data.comments" :key="item.id">
        <div class="col-md-2">
          <img :src="item.user.photo" alt="" class="img-fluid comment-user-pic">
        </div>
        <div class="ps-md-3 col-md-10 comment-text d-flex flex-column">
          <div class="d-flex flex-row w-100">
            <p>{{item.user.name}}</p>
            <p class="ms-auto">{{ new Date(item.createdAt).toLocaleDateString('en-us', { year:'numeric', month: 'long', day: 'numeric' }) }}</p>
          </div>
          <p class="text-break">{{item.comment}}</p>
          <div class="ms-auto">
            <Button v-if="user.role === 'admin'" @click.prevent="deletePost(item._id)">DELETE POST</Button>
          </div>
        </div>
      </div>
    </div>
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
    <Button v-else class="mt-2 ms-auto" type="submit" @click="openLogin">You must be logged in to leave comments</Button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrent, postPostComment, removePostComment } from '@/api'
import { useToast } from 'vue-toastification'
import { UserInfo } from '@/store'
import { RecentCarousel } from '@/components/carousel.vue'
import Button from '@/components/btn.vue'
import { useStore } from 'vuex'
import bus from '@/plugins/bus'
export interface Comment {
  _v?: number;
  _id: string;
  comment: string;
  createdAt: string;
  id: string;
  post: string;
  user: UserInfo;
}
export interface PageContent extends RecentCarousel {
  comments: Comment[];
}
export default defineComponent({
  components: {
    Button
  },
  async setup () {
    const router = useRouter()
    const store = useStore()
    const toast = useToast()
    const comment = ref('')
    const pageContent = reactive({ data: {} as PageContent })
    const openLogin = () => {
      bus.emit('Login-open')
    }
    const deletePost = async (id: string) => {
      try {
        const res = await removePostComment(id)
        console.log(res)
        if (res.status === 204) {
          pageContent.data.comments = pageContent.data.comments.filter((item: Comment) => {
            return item.id !== id
          })
        }
        toast.success('Comment deleted')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const getPage = async () => {
      try {
        const res = await getCurrent(
          router.currentRoute.value.params.id as string
        )
        if (res.status === 200) {
          pageContent.data = res.data.data
          console.log(res.data.data)
          console.log(pageContent)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const sendComment = async () => {
      try {
        const res = await postPostComment(router.currentRoute.value.params.id as string, comment.value)
        console.log(res)
        if (res.status === 201) {
          toast.success('comment sent successfully')
          getPage()
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    try {
      const res = await getCurrent(
        router.currentRoute.value.params.id as string
      )
      if (res.status === 200) {
        pageContent.data = res.data.data
        console.log(res.data.data)
        console.log(pageContent)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    const user = computed(() => {
      return store.getters.getUser
    })
    return {
      pageContent,
      comment,
      user,
      openLogin,
      sendComment,
      deletePost
    }
  }
})
</script>

<style lang="scss" scoped>
.article-cover-img {
  max-width: 100%;
  height: auto;
  @media (min-width: 768px) {
    height: 41rem;
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
