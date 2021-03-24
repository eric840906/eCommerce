<template>
  <div class="view-window d-flex flex-column">
    <div class="d-flex">
      <div class="col text-start">
        <form class="p-3 m-2 dashboard-morph" @submit.prevent="updateCurrent">
          <div class="title w-100 d-flex">
            <h5 class="fw-bolder text-uppercase">Edit post</h5>
          </div>
          <div class="form-group">
            <label for="post-title">Post title</label>
            <input
              class="form-control"
              id="post-title"
              v-model="pageData.data.title"
            />
          </div>
          <div class="form-group my-2 d-flex flex-column">
            <label>Category</label>
            <select class="custom-select custom-select-sm" v-model="pageData.data.category">
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
              v-model="pageData.data.article"
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
          <!-- <div class="form-group my-2">
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
          </transition> -->
          <div class="form-group d-flex">
            <Button class="ml-auto" type="submit">Edit this post</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { getCurrent, imageUpload, patchPost } from '@/api'
import { useRouter } from 'vue-router'
import Button from '@/components/btn.vue'
import { Post, HTMLInputEvent } from '@/views/Dashboard/Post.vue'
import { useToast } from 'vue-toastification'

export default defineComponent({
  components: {
    Button
  },
  async setup () {
    const router = useRouter()
    const toast = useToast()
    const imageThumb = ref('')
    const imageName = ref('')
    const pageData = reactive<Post>({ data: {} })
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
          pageData.data.photo = data.data.link
        }
      } catch (error) {
        toast.error('OPPS! something wrong during the process')
      }
    }
    const updateCurrent = async () => {
      const data = {
        title: pageData.data.title,
        article: pageData.data.article,
        photo: pageData.data.photo,
        images: pageData.data.images,
        category: pageData.data.category
      }
      try {
        const res = await patchPost(router.currentRoute.value.params.id as string, data)
        if (res.status === 200) {
          toast.success('Post updated')
          router.replace({ name: 'Post' })
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    try {
      const res = await getCurrent(router.currentRoute.value.params.id as string)
      if (res.status === 200) {
        pageData.data = res.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    return {
      pageData,
      uploadToImgur,
      imageThumb,
      updateCurrent
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
</style>
