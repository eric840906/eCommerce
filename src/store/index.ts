import { createStore } from 'vuex'
export interface StoreProps {
  screenSize: number;
  scrollY: number;
}
export default createStore({
  state: {
    screenSize: 0,
    scrollY: 0,
    loading: false,
    user: ''
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
    }
  },
  actions: {
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
    }
  },
  modules: {
  }
})
