import { createStore, createLogger } from 'vuex'
import { userLogin, userCheck, userLogout } from '@/api'
import { useToast } from 'vue-toastification'
import bus from '@/plugins/bus'
const toast = useToast()
export interface StoreProps {
  screenSize: number;
  scrollY: number;
}
export interface UserInfo {
  email: string;
  password: string;
}
export default createStore({
  state: {
    screenSize: 0,
    scrollY: 0,
    loading: false,
    user: null
  },
  mutations: {
    screenChanger (state, size) {
      state.screenSize = size
    },
    scrollChanger (state, scroll) {
      state.scrollY = scroll
    },
    loadingChanger (state) {
      state.loading = !state.loading
    },
    setUser (state, user) {
      state.user = user
      console.log(state.user)
    }
  },
  actions: {
    async Login ({ commit }, userInfo: UserInfo) {
      try {
        commit('loadingChanger')
        console.log(userInfo)
        const res = await userLogin(userInfo)
        console.log(res)
        if (res.data.state === 'success') {
          commit('setUser', res.data.data.user)
          toast.success(`Welcome back! ${res.data.data.user.name}`)
          commit('loadingChanger')
          bus.emit('modal-close')
        }
      } catch (error) {
        toast.error(error.response.data.message)
        commit('loadingChanger')
      }
    },
    async Check ({ commit }) {
      try {
        commit('loadingChanger')
        const res = await userCheck()
        console.log(res)
        if (res.data.state === 'success') {
          commit('setUser', res.data.data[0])
          commit('loadingChanger')
        }
      } catch (error) {
        commit('loadingChanger')
      }
    },
    async logOut ({ commit }) {
      try {
        commit('loadingChanger')
        const res = await userLogout()
        if (res.data.state === 'success') {
          toast.success('Logged out successfully, see you next time!')
          commit('setUser', null)
          commit('loadingChanger')
          bus.emit('modal-close')
        }
      } catch (error) {
        toast.error(error.response.data.message)
        commit('loadingChanger')
      }
    },
    screenTracker ({ commit }, size) {
      commit('screenChanger', size)
    },
    scrollTracker ({ commit }, scroll) {
      commit('scrollChanger', scroll)
    },
    loading ({ commit }) {
      commit('loadingChanger')
    }
  },
  getters: {
    getScreenSize (state) {
      return state.screenSize
    },
    getScroll (state) {
      return state.scrollY
    },
    getLoading (state) {
      return state.loading
    },
    getUser (state) {
      return state.user
    }
  },
  modules: {
  },
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
