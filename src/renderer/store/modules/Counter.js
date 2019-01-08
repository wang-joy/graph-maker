import types from '../mutations-type'
const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  [types.INCREMENT_MAIN_COUNTER] (state) {
    state.main++
  }
}
const getters = {
  id: state => {
    return '' + state.main
  }
}
const actions = {
  INCREMENT_MAIN_COUNTER ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
