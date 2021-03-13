import { createStore } from 'vuex'
export interface StoreProps {
  screenSize: number;
  scrollY: number;
}
export default createStore({
  state: {
    screenSize: 0,
    scrollY: 0
  },
  mutations: {
    screenChanger (state, size) {
      state.screenSize = size
    },
    scrollChanger (state, scroll) {
      state.scrollY = scroll
    }
  },
  actions: {
    screenTracker ({ commit }, size) {
      commit('screenChanger', size)
    },
    scrollTracker ({ commit }, scroll) {
      commit('scrollChanger', scroll)
    }
  },
  getters: {
    getScreenSize (state) {
      return state.screenSize
    },
    getScroll (state) {
      return state.scrollY
    }
  },
  modules: {
  }
})
