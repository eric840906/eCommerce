<template>
  <form class="text-start" @submit.prevent="logout">
    <div class="mb-3 text-center">
      <label class="form-label">Do you really want to log out?</label>
    </div>
    <div class="mb-3 d-flex justify-content-evenly">
      <Button type="submit" style="width: 100px">Log out</Button>
      <Button style="width: 100px" @click.prevent="cancel">Cancel</Button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/btn.vue'
import bus from '@/plugins/bus'
export default defineComponent({
  components: {
    Button
  },
  setup () {
    const email = ref('')
    const password = ref('')
    const store = useStore()
    const cancel = () => {
      bus.emit('close-modal')
    }
    const logout = () => {
      store.dispatch('logOut')
    }
    return {
      email, password, logout, cancel
    }
  }
})
</script>
