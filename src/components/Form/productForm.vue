<template>
  <form class="text-start d-flex flex-column" @submit.prevent="uploadProduct">
    <div class="col-12 d-flex">
      <div class="col-6 p-2">
        <div class="form-group my-2">
          <label for="name" class="form-label">Name</label>
          <input type="name" class="form-control" v-model="productData.data.name">
        </div>
      </div>
      <div class="col-6 p-2">
        <div class="form-group my-2">
          <label for="price" class="form-label">Price</label>
          <input type="number" class="form-control" v-model.number="productData.data.price">
        </div>
      </div>
    </div>
    <div class="col-12 d-flex">
      <div class="col-6 p-2">
        <div class="form-group my-2">
          <label for="quantity" class="form-label">Quantity</label>
          <input type="number" class="form-control" v-model.number="productData.data.quantity">
        </div>
      </div>
      <div class="col-6 p-2">
        <div class="form-group my-2">
          <label for="discount" class="form-label">Discount price</label>
          <input type="number" class="form-control" v-model.number="productData.data.discountPrice">
        </div>
      </div>
    </div>
    <div class="col-12 d-flex">
      <div class="col-6 p-2">
        <div class="form-group my-2">
          <label for="quantity" class="form-label">Category</label>
          <select class="form-select" v-model="productData.data.category">
            <option selected value="other">Other</option>
            <option value="cake">Cakes</option>
            <option value="cookie">Cookies</option>
          </select>
        </div>
      </div>
      <div class="col-6 p-2">
        <div class="form-group my-2">
          <label for="quantity" class="form-label">Description</label>
          <input type="text" class="form-control" v-model.number="productData.data.description">
        </div>
      </div>
    </div>
    <div class="form-group my-2 p-2">
      <Button @click="otherShow = !otherShow">Add images</Button>
    </div>
    <transition name="top-show">
      <form class="form-group my-2 flex-wrap img-group" v-show="otherShow" @submit.prevent="uploadOthers">
        <div class="col-6 p-1"><input class="custom-file-input w-100" type="file" name="image0" id="image0" @change="putImage($event, 0)"></div>
        <div class="col-6 p-1"><input class="custom-file-input w-100" type="file" name="image1" id="image1" @change="putImage($event, 1)"></div>
        <div class="col-6 p-1"><input class="custom-file-input w-100" type="file" name="image2" id="image2" @change="putImage($event, 2)"></div>
        <div class="col-6 p-1"><input class="custom-file-input w-100" type="file" name="image3" id="image3" @change="putImage($event, 3)"></div>
        <div class="col-6 p-1"><input class="custom-file-input w-100" type="file" name="image4" id="image4" @change="putImage($event, 4)"></div>
        <div class="col-12 d-flex form-group my-2">
          <Button class="ms-auto" type="submit">Upload images</Button>
        </div>
      </form>
    </transition>
    <Button class="ms-auto" type="submit">Upload product</Button>
  </form>
</template>

<script lang="ts">
import { useToast } from 'vue-toastification'
import { userSignup, imageUpload, postProduct } from '@/api'
import { useStore } from 'vuex'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { HTMLInputEvent } from '@/views/Dashboard/Post.vue'
import bus from '@/plugins/bus'
import Button from '@/components/btn.vue'
export default defineComponent({
  components: {
    Button
  },
  setup () {
    const productId = ref('')
    const toast = useToast()
    const otherShow = ref(false)
    const productData = reactive({
      data: {
        name: '',
        price: 0,
        discountPrice: 0,
        category: '',
        quantity: 0,
        description: '',
        images: [] as string[]
      }
    })
    const images = ref([] as File[])
    const putImage = (e: HTMLInputEvent, index: number) => {
      if (!e.target.files) return
      images.value.length = 5
      images.value[index] = e.target.files[0]
    }
    const uploadOthers = async () => {
      try {
        toast.info('Start uploading, it might take some time')
        images.value = images.value.filter(item => item !== undefined)
        const imgArr = await Promise.all(images.value.map(image => {
          const form = new FormData()
          form.append('image', image)
          return imageUpload(form)
        }))
        if (imgArr[imgArr.length - 1].status === 200) {
          toast.success(`${imgArr.length} images uploaded successfully`)
          images.value.length = 0
        }
        console.log(imgArr)
        productData.data.images = imgArr.map(img => img.data.data.link)
      } catch (error) {
        toast.error('OPPS! something wrong during the process')
      }
    }
    const uploadProduct = async () => {
      try {
        if (productData.data.discountPrice > productData.data.price) return toast.warning('discount cannot be greater than the original price')
        if (productData.data.discountPrice === 0 || productData.data.price === 0) return toast.warning('invalid price or discount')
        console.log(productData.data)
        const res = await postProduct(productData.data)
        console.log(res)
        if (res.status === 201) {
          toast.success('Product uploaded successfully')
          bus.emit('modal-close')
          bus.emit('upload-success')
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    bus.on('Product-update', (oldProduct) => {
      productData.data = oldProduct
    })
    bus.on('clear-product', () => {
      productData.data = {
        name: '',
        price: 0,
        discountPrice: 0,
        category: '',
        quantity: 0,
        description: '',
        images: []
      }
    })
    return {
      otherShow,
      putImage,
      uploadOthers,
      productData,
      uploadProduct,
      productId
    }
  }
})
</script>

<style lang="scss" scoped>
.img-group {
  display: flex;
}
</style>
