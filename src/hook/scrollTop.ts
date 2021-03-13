import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
export const scrollPosition = () => {
  const store = useStore()
  const scrollY = () => {
    store.dispatch('scrollTracker', window.scrollY)
  }
  onMounted(() => {
    window.addEventListener('scroll', scrollY)
  })
  onUnmounted(() => {
    window.addEventListener('scroll', scrollY)
  })
  return {
    scrollY
  }
}
