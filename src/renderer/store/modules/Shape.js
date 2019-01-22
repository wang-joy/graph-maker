import types from '../mutations-type'
const state = {
  activeId: ''
}
const mutations = {
  [types.SELECT] (state, {id, svg}) {
    state.activeId = id
    svg.selectById(id)
  }
}
const actions = {
  select ({commit, getters}, id) {
    let svg = getters.svg
    if (svg) {
      commit(types.SELECT, {id, svg})
    }
  }
}
export default {
  state,
  mutations,
  actions
}
