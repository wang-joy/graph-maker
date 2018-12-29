import Svg from '@/svg/Svg'
import types from '../mutations-type'
const state = {
  all: [],
  activeId: 0
}
const mutations = {
  [types.CREATE_SVG] (state, id) {
    let svg = new Svg(id)
    state.activeId = id
    state.all.push(svg)
  }
}
const actions = {
  createSvg ({commit}, id) {
    commit(types.CREATE_SVG, id)
  }
}
const getters = {
  getActiveSvg: (state, getters) => {
    return getters.getSvgById(state.activeId)
  },
  getSvgById: (state) => (id) => {
    return state.all.find(el => el.id === id)
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}
