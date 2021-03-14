<template>
  <form class="text-start" @submit.prevent="login">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" v-model="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" v-model="password">
    </div>
    <Button type="submit">Log In</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/btn.vue'
export default defineComponent({
  components: {
    Button
  },
  setup () {
    const email = ref('')
    const password = ref('')
    const store = useStore()
    const login = () => {
      console.log(email.value, password.value)
      const userInfo = {
        email: email.value,
        password: password.value
      }
      store.dispatch('Login', userInfo)
    }
    return {
      email, password, login
    }
  }
})
</script>
