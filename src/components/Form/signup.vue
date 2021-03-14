<template>
  <form class="text-start" @submit.prevent="signUp">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="name" class="form-control" v-model="name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" v-model="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" v-model="password">
    </div>
    <div class="mb-3">
      <label for="password-confirm" class="form-label">Password Confirm</label>
      <input type="password-confirm" class="form-control" v-model="passwordConfirm">
    </div>
    <Button type="submit">Sign Up</Button>
  </form>
</template>

<script lang="ts">
import { useToast } from 'vue-toastification'
import { userSignup } from '@/api'
import { useStore } from 'vuex'
import { defineComponent, ref } from 'vue'
import bus from '@/plugins/bus'
import Button from '@/components/btn.vue'

export default defineComponent({
  components: {
    Button
  },
  setup () {
    const toast = useToast()
    const store = useStore()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const passwordConfirm = ref('')

    const signUp = async () => {
      try {
        store.dispatch('loading')
        const res = await userSignup(name.value, email.value, password.value, passwordConfirm.value)
        console.log(res)
        if (res.data.state === 'success') {
          bus.emit('modal-close')
          toast.success('Sign up successfully!')
          store.dispatch('loading')
        }
      } catch (error) {
        store.dispatch('loading')
        toast.error(error.response.data.message)
        console.log(error.response)
      }
    }
    return {
      signUp,
      name,
      email,
      password,
      passwordConfirm
    }
  }
})
</script>
