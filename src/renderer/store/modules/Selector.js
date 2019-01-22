import types from '../mutations-type'
const state = {
  activeId: ''
}
const mutations = {
  [types.SELECT] (state, {id, svg}) {
    state.activeId = id
    svg.selectById(id)
  },
  [types.ADD_SELECT] (state, {id, svg}) {
    const shape = svg.getShapeById(id)
    svg.selector.addSelect(shape)
  },
  [types.UN_SELECT] (state, {id, svg}) {
    const shape = svg.getShapeById(id)
    svg.selector.unselect(shape)
  }
}
const actions = {
  select ({commit, getters}, id) {
    let svg = getters.svg
    if (svg) {
      commit(types.SELECT, {id, svg})
    }
  },
  addSelect ({commit, getters}, id) {
    let svg = getters.svg
    if (svg) {
      commit(types.ADD_SELECT, {id, svg})
    }
  },
  unselect ({commit, getters}, id) {
    let svg = getters.svg
    if (svg) {
      commit(types.UN_SELECT, {id, svg})
    }
  }
}

export default {
  state,
  mutations,
  actions
}
