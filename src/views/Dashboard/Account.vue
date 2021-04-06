<template>
  <div class="d-flex p-3 m-2 flex-column flex-md-row dashboard-morph user-row flex-grow-1">
    <div class="user-role-tag" :class="`${user.role}-color`">
      {{ user.role }}
    </div>
    <div class="col-md-4 d-flex flex-column align-items-center">
      <div class="image-block">
        <img
          class="user-image"
          :src="`${user.photo ? user.photo : 'https://i.pinimg.com/564x/c4/0d/7a/c40d7a7060fb74926c257db982b6ddaf.jpg'}`"
          alt=""
        />
        <a href="#" class="image-btn" @click.prevent="cropperOpen"><fa icon="camera" type="fas" class="camera-icon"></fa></a>
      </div>
      <ul class="w-100 mt-3 p-0">
        <li class="d-flex w-100">
          <span class="col-2 d-flex justify-content-end">
            <fa icon="envelope" type="far" class="account-icon"></fa>
          </span>
          <span class="col-10 text-start user-info">{{ user.email }}</span>
        </li>
        <li class="d-flex w-100 mt-3">
          <span class="col-2 d-flex justify-content-end">
            <fa icon="user" type="far" class="account-icon"></fa>
          </span>
          <span class="col-10 text-start user-info">{{ user.name }}</span>
        </li>
      </ul>
    </div>
    <div class="col-md-8 d-flex align-items-center text-start">
      <div class="user-desc w-100 text-break">
        <h5>Description</h5>
        <p>
          {{ user.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, libero maiores. Recusandae facilis, non est fuga quis dolorem voluptas culpa cum, blanditiis nemo ad in commodi molestias dolore distinctio repellat.' }}
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-6 text-start">
    <form class="p-3 m-2 dashboard-morph" @submit.prevent="updateUserInfo">
      <div class="form-group">
        <label for="user-name">User Name</label>
        <input
          class="form-control"
          id="user-name"
          v-model="name"
        />
        <small id="nameHelp" class="form-text text-muted"
          >Enter another name and submit to change it</small
        >
      </div>
      <div class="form-group">
        <label for="user-email">User Email</label>
        <input
          type="email"
          class="form-control"
          id="user-email"
          v-model="email"
        />
        <small id="nameHelp" class="form-text text-muted"
          >Enter another email address and submit to change it</small
        >
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
      <div class="form-group d-flex">
        <Button class="ml-auto" type="submit" >Change info</Button>
      </div>
    </form>
  </div>
  <div class="col-md-6 text-start">
    <form class="p-3 m-2 dashboard-morph" @submit.prevent="passwordUpdate">
      <div class="form-group">
        <label for="user-password">Old password</label>
        <input
          type="password"
          class="form-control"
          id="user-old-password"
          v-model="oldPass"
        />
        <small id="nameHelp" class="form-text text-muted"
          >Enter and submit to change your password</small
        >
      </div>
      <div class="form-group">
        <label for="user-password">Password</label>
        <input
          type="password"
          class="form-control"
          id="user-password"
          v-model="password"
        />
        <small id="nameHelp" class="form-text text-muted"
          >Enter and submit to change your password</small
        >
      </div>
      <div class="form-group">
        <label for="user-password-confirm">Password Confirm</label>
        <input
          type="password"
          class="form-control"
          id="user-password-confirm"
          v-model="passwordConfirm"
        />
        <small id="nameHelp" class="form-text text-muted"
          >Type your new password again</small
        >
      </div>
      <div class="form-group d-flex">
        <Button class="ml-auto" type="submit">Change password</Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { userUpdate, userPassUpdate } from '@/api'
import { useToast } from 'vue-toastification'
import { UserInfo } from '@/store/index'
import bus from '@/plugins/bus'
import Button from '@/components/btn.vue'
interface User extends UserInfo {
  name?: string;
  email?: string;
  description?: string;
  password?: string;
}
export interface PasswordForm {
  oldpass: string;
  newpass: string;
  passwordConfirm: string;
}
export default defineComponent({
  components: {
    Button
  },
  setup () {
    const store = useStore()
    const toast = useToast()
    const name = ref('')
    const email = ref('')
    const description = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const oldPass = ref('')
    const updateUserInfo = async () => {
      const removeEmpty = (obj: User) => {
        return Object.fromEntries(Object.entries(obj).filter((key) => key[1]))
      }
      const infoObj: User = {
        name: name.value,
        email: email.value,
        description: description.value
      }
      const finalObj: User = removeEmpty(infoObj)
      try {
        toast.info('Updating new info')
        const res = await userUpdate(finalObj)
        if (res.status === 200) {
          store.dispatch('setUser', res.data.data.user)
          toast.success('Info updated')
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const passwordUpdate = async () => {
      try {
        const updateInfo: PasswordForm = {
          oldpass: oldPass.value,
          newpass: password.value,
          passwordConfirm: passwordConfirm.value
        }
        const res = await userPassUpdate(updateInfo)
        if (res.status === 200) {
          toast.success('Password changed')
          password.value = ''
          passwordConfirm.value = ''
          oldPass.value = ''
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const cropperOpen = () => {
      bus.emit('Cropper-open')
    }
    const user = computed(() => {
      return store.getters.getUser
    })
    return {
      user,
      passwordUpdate,
      name,
      email,
      description,
      password,
      passwordConfirm,
      updateUserInfo,
      oldPass,
      cropperOpen
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
