<template>
  <div class="view-window d-flex flex-column">
    <div class="d-flex p-3 m-2 dashboard-morph user-row">
      <div class="col d-flex align-items-center text-start flex-column w-100">
        <div class="title w-100 d-flex">
          <h5>Recent Posts</h5>
          <Button class="ml-auto">Show all</Button>
        </div>
        <div class="posts-container d-flex overflow-auto w-100 py-3">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="col text-start">
        <form class="p-3 m-2 dashboard-morph">
          <div class="title w-100 d-flex">
            <h5>Make new post</h5>
          </div>
          <div class="form-group">
            <label for="post-title">Post title</label>
            <input
              class="form-control"
              id="post-title"
              v-model="title"
            />
          </div>
          <div class="form-group">
            <label for="user-desc">User Description</label>
            <textarea
              class="form-control"
              id="user-desc"
              v-model="description"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Enter some words to introduce yourself</small
            >
          </div>
          <div class="form-group my-2">
            <Button><label for="photo">Upload image</label></Button>
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
            <img v-if="imageThumb" :src="imageThumb" alt="">
          </div>
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
            <Button class="ml-auto" type="submit">Change info</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { imageUpload } from '@/api'
import { useStore } from 'vuex'
import Button from '@/components/btn.vue'
import Card from '@/components/Card.vue'
import { useToast } from 'vue-toastification'

export default defineComponent({
  components: {
    Button,
    Card
  },
  setup () {
    const store = useStore()
    const toast = useToast()
    const imageName = ref('')
    const imageThumb = ref('')
    const imageLink = ref('')
    const title = ref('')
    const description = ref('')
    const uploadToImgur = async (e: FileReader) => {
      try {
        store.dispatch('loading')
        console.log(e.target.files)
        const file = e.target.files[0]
        imageName.value = file.name
        imageThumb.value = window.URL.createObjectURL(file)
        const form = new FormData()
        form.append('title', imageName.value)
        form.append('image', file)
        const { data } = await imageUpload(form)
        console.log(data)
        if (data.status === 200) {
          toast.success('image uploaded successfully')
          imageLink.value = data.data.link
          store.dispatch('loading')
        }
      } catch (error) {
        console.log(error)
        toast.success('IPPS! something wrong during the process')
        store.dispatch('loading')
      }
    }
    return {
      uploadToImgur,
      imageName,
      imageThumb,
      imageLink,
      title,
      description
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
