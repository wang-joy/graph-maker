import types from './mutations-type'
export default {
  createSvg ({commit, getters}) {
    let id = getters.id
    commit(types.CREATE_SVG, id)
    commit(types.SET_ACTIVE_ID, id)
    commit(types.INCREMENT_MAIN_COUNTER)
  },
  setActive ({commit}, playload) {
    commit(types.SET_ACTIVE_ID, playload)
  },
  removeSvg ({commit}, id) {
    commit(types.REMOVE_SVG, id)
  }
}
