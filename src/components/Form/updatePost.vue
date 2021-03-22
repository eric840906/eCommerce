<template>
  <div class="d-flex">
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
        <div class="form-group d-flex">
          <Button class="ml-auto" type="submit">Make a new post</Button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { imageUpload } from '@/api'
import { useStore } from 'vuex'
import axios from 'axios'
import Button from '@/components/btn.vue'
import { useToast } from 'vue-toastification'
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
interface Post {
  title: string;
  article: string;
  photo: string;
  images?: string[];
  category: string;
  _id?: string;
}
export default defineComponent({
  name: 'Post',
  components: {
    Button
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
    const imageName = ref('')
    const imageThumb = ref('')
    const otherShow = ref(false)
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
    const newPost = async () => {
      console.log(postData)
      try {
        store.dispatch('loading')
        const res = await axios({
          url: 'http://127.0.0.1:8000/api/post',
          method: 'POST',
          withCredentials: true,
          data: postData
        })
        if (res.status === 201) {
          await toast.success('New article posted')
          store.dispatch('loading')
          postData.title = ''
          postData.article = ''
          postData.photo = ''
          imageThumb.value = ''
          // getPosts() // bus emit to post
        }
      } catch (error) {
        console.log(error.response.data.message)
        store.dispatch('loading')
        toast.error('An error occurred while posting')
      }
    }
    return {
      uploadToImgur,
      imageName,
      imageThumb,
      postData,
      newPost,
      otherShow,
      uploadOthers,
      otherImages,
      putImage
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
