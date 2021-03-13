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
    <button type="submit" class="btn btn-outline-primary">Sign Up</button>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import { useStore } from 'vuex'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const store = useStore()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const passwordConfirm = ref('')

    const signUp = async () => {
      try {
        store.dispatch('loading')
        const res = await axios({
          url: 'http://127.0.0.1:8000/api/user/signup',
          method: 'POST',
          data: {
            name: name.value,
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
          }
        })
        console.log(res)
        // if()
      } catch (error) {
        store.dispatch('loading')
        console.log(error.response)
      }
      // console.log(`name=${name.value}, email=${email.value}, password=${password.value}, passwordConfirm=${passwordConfirm.value}`)
      // axios({
      //   url: 'http://127.0.0.1:8000/api/user/signup',
      //   method: 'POST'
      // })
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
