import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import Svg from '../svg/svg'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  modules,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
