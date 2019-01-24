import types from '../mutations-type'
// import SVG from 'svg.js'
const state = {
  activeId: ''
}
const mutations = {
  [types.SELECT_SHAPE] (state, {shape, svg}) {
    svg.selector.select(shape)
  },
  [types.ADD_SELECT] (state, {shape, svg}) {
    // const shape = svg.getShapeById(id)
    svg.selector.addSelect(shape)
  },
  [types.UN_SELECT] (state, {shape, svg}) {
    // const shape = svg.getShapeById(id)
    svg.selector.unselect(shape)
  },
  [types.SELECT_SVG] (state, svg) {
    svg.selector.clear()
  }
}
const actions = {
  selectShape ({commit, getters}, shape) {
    let svg = getters.svg
    if (svg) {
      // commit(types.SET_ATTR_LIST, shape)
      // while (shape.parent() instanceof SVG.G) {
      //   shape = shape.parent()
      // }
      commit(types.SELECT_SHAPE, {shape, svg})
    }
  },
  addSelect ({commit, getters}, shape) {
    let svg = getters.svg
    if (svg) {
      commit(types.ADD_SELECT, {shape, svg})
    }
  },
  unselect ({commit, getters}, shape) {
    let svg = getters.svg
    if (svg) {
      commit(types.UN_SELECT, {shape, svg})
    }
  },
  selectSvg ({commit}, svg) {
    commit(types.SELECT_SVG, svg)
  }
}

export default {
  state,
  mutations,
  actions
}
