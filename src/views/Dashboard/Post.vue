<template>
  <div class="w-100 d-flex p-3 m-md-2 flex-column flex-md-row dashboard-morph user-row flex-grow-1 dashboard-morph user-row">
    <div class="align-items-center text-start flex-column w-100">
      <div class="title w-100 d-flex">
        <h5 class="fw-bolder text-uppercase">Recent Posts</h5>
        <Button class="ml-auto">Show all</Button>
      </div>
      <div class="posts-container d-flex overflow-auto w-100 py-3">
        <p v-if="recentPosts.data.length === 0" class="text-uppercase m-auto">Currently nothing here</p>
        <template v-for="item in recentPosts.data" :key="item._id">
          <Card :card="item"></Card>
        </template>
      </div>
    </div>
  </div>
  <div class="d-flex flex-grow-1">
    <div class="col text-start">
      <form class="p-3 m-2 dashboard-morph" @submit.prevent="newPost">
        <div class="title w-100 d-flex">
          <h5 class="fw-bolder text-uppercase">Make new post</h5>
        </div>
        <div class="form-group">
          <label for="post-title">Post title</label>
          <input
            class="form-control"
            id="post-title"
            v-model="postData.title"
          />
        </div>
        <div class="form-group my-2 d-flex flex-column">
          <label>Category</label>
          <select class="custom-select custom-select-sm" v-model="postData.category">
            <option selected value="Other">Other</option>
            <option value="News">News</option>
            <option value="Cakes">Cakes</option>
            <option value="Cookies">Cookies</option>
            <option value="Tips">Tips</option>
          </select>
        </div>
        <div class="form-group">
          <label for="user-desc">Article</label>
          <textarea
            class="form-control"
            id="user-desc"
            v-model="postData.article"
          />
          <small id="nameHelp" class="form-text text-muted"
            >Enter some words to introduce yourself</small
          >
        </div>
        <div class="form-group my-2">
          <Button><label for="photo">Upload cover image</label></Button>
          <input
            type="file"
            class="form-control"
            id="photo"
            accept="image/*"
            style="display:none"
            @change.prevent="uploadToImgur"
          />
        </div>
        <div class="form-group">
          <img style="max-height: 300px;" v-if="imageThumb" :src="imageThumb" alt="">
        </div>
        <div class="form-group my-2">
          <Button @click="otherShow = !otherShow">Upload other images</Button>
        </div>
        <transition name="top-show">
          <form class="form-group my-2" v-show="otherShow" @submit.prevent="uploadOthers">
            <input class="custom-file-input" type="file" name="image0" id="image0" @change="putImage($event, 0)">
            <input class="custom-file-input" type="file" name="image1" id="image1" @change="putImage($event, 1)">
            <input class="custom-file-input" type="file" name="image2" id="image2" @change="putImage($event, 2)">
            <input class="custom-file-input" type="file" name="image3" id="image3" @change="putImage($event, 3)">
            <input class="custom-file-input" type="file" name="image4" id="image4" @change="putImage($event, 4)">
            <div class="form-group my-2">
              <Button class="ml-auto" type="submit">Upload them all</Button>
            </div>
          </form>
        </transition>
        <!-- <div class="form-group">
          <label for="user-image"
            >Select a new profile pic</label
          >
          <input
            type="file"
            class="form-control-file display-none"
            id="exampleFormControlFile1"
          />
        </div> -->
        <div class="form-group d-flex">
          <Button class="ml-auto" type="submit">Make a new post</Button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { imageUpload, postNewPost, getContent } from '@/api'
import { useStore } from 'vuex'
import axios from 'axios'
import Button from '@/components/btn.vue'
import Card from '@/components/Card.vue'
import bus from '@/plugins/bus'
import { useToast } from 'vue-toastification'
export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
export interface Post {
  title: string;
  article: string;
  photo: string;
  images?: string[];
  category: string;
  _id?: string;
  id?: string;
}
export default defineComponent({
  name: 'Post',
  components: {
    Button,
    Card
  },
  setup () {
    const store = useStore()
    const toast = useToast()
    const postData = reactive<Post>({
      title: '',
      article: '',
      photo: '',
      images: [],
      category: ''
    })
    const otherImages = reactive({ images: [] as File[] })
    const recentPosts = reactive({ data: [] as Post[] })
    const imageName = ref('')
    const imageThumb = ref('')
    const category = ref('')
    const otherShow = ref(false)
    const updateIndex = (id: string) => {
      return (recentPosts.data.indexOf(recentPosts.data.filter((item: Post) => item.id === id)[0]))
    }
    bus.on('update-open', (id) => updateIndex(id))
    const putImage = (e: HTMLInputEvent, index: number) => {
      if (!e.target.files) return
      otherImages.images.length = 5
      otherImages.images[index] = e.target.files[0]
    }
    const uploadToImgur = async (e: HTMLInputEvent) => {
      try {
        if (!e.target.files) return
        const file: File = e.target.files[0]
        imageName.value = file.name
        imageThumb.value = window.URL.createObjectURL(file)
        const form: FormData = new FormData()
        form.append('title', imageName.value)
        form.append('image', file)
        const { data } = await imageUpload(form)
        if (data.status === 200) {
          toast.success('image uploaded successfully')
          postData.photo = data.data.link
        }
      } catch (error) {
        toast.error('OPPS! something wrong during the process')
      }
    }
    const uploadOthers = async () => {
      try {
        toast.info('Start uploading, it might take some time')
        otherImages.images = otherImages.images.filter(item => item !== undefined)
        const imgArr = await Promise.all(otherImages.images.map(image => {
          const form = new FormData()
          form.append('image', image)
          return imageUpload(form)
        }))
        if (imgArr[imgArr.length - 1].status === 200) {
          toast.success(`${imgArr.length} images uploaded successfully`)
          otherImages.images.length = 0
        }
        postData.images = imgArr.map(img => img.data.data.link)
      } catch (error) {
        toast.error('OPPS! something wrong during the process')
      }
    }
    const getPosts = async () => {
      try {
        store.dispatch('loading')
        const res = await getContent(1, 5)
        recentPosts.data = res.data.data
        if (res.data.state === 'success') {
          store.dispatch('loading')
        }
      } catch (error) {
        toast.error('error')
        store.dispatch('loading')
      }
    }
    const newPost = async () => {
      try {
        store.dispatch('loading')
        const res = await postNewPost(postData)
        if (res.status === 201) {
          await toast.success('New article posted')
          store.dispatch('loading')
          postData.title = ''
          postData.article = ''
          postData.photo = ''
          imageThumb.value = ''
          getPosts()
        }
      } catch (error) {
        store.dispatch('loading')
        toast.error('An error occurred while posting')
      }
    }
    getPosts()
    return {
      uploadToImgur,
      imageName,
      imageThumb,
      postData,
      newPost,
      recentPosts,
      otherShow,
      uploadOthers,
      otherImages,
      putImage,
      category
      // title,
      // description
    }
  }
})
</script>

<style lang="scss" scoped>
.account-icon {
  width: 20px;
}
.active {
  background-color: #ffffffc4;
}

.view-window {
  overflow: auto;
  height: 80vh;
}
.image-block {
  position: relative;
  .user-image {
    border-radius: 100%;
    width: 200px;
    height: 200px;
  }
  .image-btn {
    cursor: pointer;
    position: absolute;
    bottom: 15%;
    right: 0%;
    border: none;
    background: #ffffff69;
    box-shadow: 0px 0px 2px black;
    border-radius: 100%;
    height: 35px;
    width: 35px;
    transition: all 0.5s ease;
    &:hover {
      box-shadow: 0px 0px 5px black;
    }
    .camera-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.user-row {
  position: relative;
}
.user-role-tag {
  border-radius: 0 0 0px 10px;
  text-transform: uppercase;
  position: absolute;
  width: 100px;
  right: 0px;
  top: 0;
}
.user-color {
  background-color: #1693e94a;
}
.admin-color {
  background-color: #e916164a;
}

.user-info {
  padding-left: 1rem;
}
.top-show-enter-from, .top-show-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
.top-show-enter-to, .top-show-leave-from {
  transform: scaleY(1);
  opacity: 1;
}
.top-show-enter-active, .top-show-leave-active {
  transition: all 0.5s ease;
}
</style>
