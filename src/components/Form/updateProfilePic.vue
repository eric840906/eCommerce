<template>
  <div>
    <section class="preview-area">
      <p>Cropped Image</p>
      <div class="cropped-image">
        <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
      </div>
    </section>
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
      class="custom-file-input"
      style="width: 100%;"
    />

    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="1 / 1"
            :src="imgSrc"
            v-if="imgSrc"
            preview=".preview"
            dragMode="move"
          />
        </div>
        <div class="actions">
          <a href="#" @click.prevent="cropImage">
            <fa icon="crop-alt" type="fas" class="control-icon"></fa>
          </a>
          <a href="#" @click.prevent="rotate(45)">
            <fa
              icon="undo"
              type="fas"
              class="control-icon"
              style="transform: rotateY(180deg);"
            ></fa>
          </a>
          <a href="#" @click.prevent="rotate(-45)">
            <fa icon="undo" type="fas" class="control-icon"></fa>
          </a>
          <a href="#" role="button" @click.prevent="zoom(0.2)">
            <fa icon="search-plus" type="fas" class="control-icon"></fa>
          </a>
          <a href="#" role="button" @click.prevent="zoom(-0.2)">
            <fa icon="search-minus" type="fas" class="control-icon"></fa>
          </a>
        </div>
        <div class="actions">
          <a href="#" role="button" @click.prevent="uploadImage">
            <fa icon="upload" type="fas" class="control-icon"></fa>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import { imageUpload, userUpdate } from '@/api'
import { useToast } from 'vue-toastification'
import bus from '@/plugins/bus'
import 'cropperjs/dist/cropper.css'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      imgSrc: '',
      cropImg: '',
      data: null,
      imageUrl: null
    }
  },
  methods: {
    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    uploadImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas()
        .toBlob(async blob => {
          const toast = useToast()
          try {
            toast.info('Uploading profile picture')
            const form = new FormData()
            form.append('image', blob)
            const { data: { data: { link } } } = await imageUpload(form)
            this.imageUrl = link
            const data = {
              photo: `${this.imageUrl}s`
            }
            const res = await userUpdate(data)
            if (res.status === 200) {
              toast.success('Uploaded successfully')
              this.$store.dispatch('setUser', res.data.data.user)
              bus.emit('modal-close')
            }
          } catch (error) {
            toast.error(error.response)
          }
        })
    },
    rotate (deg) {
      this.$refs.cropper.rotate(deg)
    },
    setImage (e) {
      const file = e.target.files[0]
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = event => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    zoom (percent) {
      this.$refs.cropper.relativeZoom(percent)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  flex-direction: column;
}
.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}
.control-icon {
  width: 30px;
  height: 30px;
}
/* .actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062cc;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
} */
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  border-radius: 100%;
  width: 200px;
  height: 200px;
}
</style>
