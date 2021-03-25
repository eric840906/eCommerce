<template>
  <div class="d-flex flex-column">
    <div class="d-flex p-3 m-2 dashboard-morph user-row text-start">
      <table class="table">
        <thead>
          <Button @click="addProduct">Add new product</Button>
          <tr>
            <th width="50px">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Sale price</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Control</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in productList" :key="item._id">
            <tr class="align-middle">
              <td width="50px">{{index + 1}}</td>
              <td scope="col">
                <p class="m-0" v-show="updateIndex !== index">{{item.name}}</p>
                <input type="text" style="width: 100%" v-show="updateIndex === index" v-model="currentProduct.data.name">
              </td>
              <td scope="col">
                <p class="m-0" v-show="updateIndex !== index">{{item.price}}</p>
                <input type="number" style="width: 100%" v-show="updateIndex === index" v-model.number="currentProduct.data.price">
              </td>
              <td scope="col">
                <p class="m-0" v-show="updateIndex !== index">{{item.discountPrice}}</p>
                <input type="number" style="width: 100%" v-show="updateIndex === index" v-model.number="currentProduct.data.discountPrice">
              </td>
              <td scope="col">
                <p class="m-0" v-show="updateIndex !== index">{{item.category}}</p>
                <select class="form-select" v-show="updateIndex === index" v-model="currentProduct.data.category">
                  <option selected value="other">other</option>
                  <option value="cake">cake</option>
                  <option value="cookie">cookie</option>
                </select>
              </td>
              <td scope="col">
                <p class="m-0" v-show="updateIndex !== index">{{item.quantity}}</p>
                <input type="text" style="width: 100%" v-show="updateIndex === index" v-model="currentProduct.data.quantity">
              </td>
              <td scope="col">
                <Button class="w-100 mb-2" @click="toggleUpdate(item, index)">UPDATE</Button>
                <Button class="w-100">DELETE</Button>
              </td>
            </tr>
            <div v-show="updateIndex === index">
              <form class="form-group d-flex flex-wrap img-group"  @submit.prevent="uploadOthers">
                <div class="col-4 p-1"><input class="custom-file-input w-100" type="file" name="image0" id="image0" @change="putImage($event, 0)"></div>
                <div class="col-4 p-1"><input class="custom-file-input w-100" type="file" name="image1" id="image1" @change="putImage($event, 1)"></div>
                <div class="col-4 p-1"><input class="custom-file-input w-100" type="file" name="image2" id="image2" @change="putImage($event, 2)"></div>
                <div class="col-4 p-1"><input class="custom-file-input w-100" type="file" name="image3" id="image3" @change="putImage($event, 3)"></div>
                <div class="col-4 p-1"><input class="custom-file-input w-100" type="file" name="image4" id="image4" @change="putImage($event, 4)"></div>
                <div class="ms-auto p-1">
                  <Button class="ms-auto" type="submit">Upload images</Button>
                </div>
                <div class="col-4 p-1">
                  <Button @click.prevent="updateProduct(item._id)">Confirm & Update</Button>
                </div>
              </form>
            </div>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Button from '@/components/btn.vue'
import { getAllProduct, imageUpload, patchProduct } from '@/api'
import { Product } from '@/api/product'
import { HTMLInputEvent } from '@/views/Dashboard/Post.vue'
import { useToast } from 'vue-toastification'
import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    Button
  },
  setup () {
    const addProduct = () => {
      bus.emit('Product-open')
    }
    const toast = useToast()
    const updateIndex = ref(null)
    const page = ref(1)
    const images = ref([] as File[])
    const productList = ref([] as Product[])
    const currentProduct = reactive({
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
        currentProduct.data.images = imgArr.map(img => img.data.data.link)
        console.log(currentProduct.data)
      } catch (error) {
        toast.error('OPPS! something wrong during the process')
      }
    }
    const toggleUpdate = (item, index) => {
      updateIndex.value = index
      currentProduct.data = item
    }
    const getList = async () => {
      const res = await getAllProduct('default', page.value)
      console.log(res)
      productList.value = res.data.data
    }
    const updateProduct = async (id: string) => {
      console.log(currentProduct.data)
      try {
        if (currentProduct.data.discountPrice > currentProduct.data.price) return toast.warning('discount cannot be greater than the original price')
        if (currentProduct.data.discountPrice === 0 || currentProduct.data.price === 0) return toast.warning('invalid price or discount')
        const res = await patchProduct(currentProduct.data, currentProduct.data._id)
        if (res.status === 200) {
          toast.success('Product updated')
          updateIndex.value = null
          getList()
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
      console.log(id)
    }
    bus.on('upload-success', () => getList())
    getList()
    return {
      productList,
      addProduct,
      updateIndex,
      toggleUpdate,
      currentProduct,
      putImage,
      uploadOthers,
      updateProduct
    }
  }
})
</script>

<style lang="scss" scoped>
tbody {
  display: block;
  height: 70vh;
  overflow: auto;
}
thead {
  border: none
}
tr {
    display:table;
    border: #906c64;
    width:100%;
    table-layout:fixed;
}

.column1{
  width:60px;
}
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
