import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import types from './mutations-type'
import Svg from '../svg/svg'
Vue.use(Vuex)
const state = {
  svgs: [],
  activeSvg: null
}
const mutations = {
  [types.CREATE_FILE] (state) {
    const id = state.Counter.main
    let svg = new Svg(id)
    state.svgs.push(svg)
    state.activeSvg = svg
  }
}
const actions = {
  create (context) {
    context.commit(types.CREATE_FILE)
  }
}
export default new Vuex.Store({
  state,
  modules,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
