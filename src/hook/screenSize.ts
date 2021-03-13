import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
export const screenSize = () => {
  const store = useStore()
  const sizeTracker = (e: UIEvent) => {
    const w = e.target as Window
    store.dispatch('screenTracker', w.innerWidth)
  }
  onMounted(() => {
    store.dispatch('screenTracker', window.innerWidth)
    window.addEventListener('resize', sizeTracker)
  })
  onUnmounted(() => {
    window.addEventListener('resize', sizeTracker)
  })
  return {
    sizeTracker
  }
}
