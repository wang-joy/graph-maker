import types from '../mutations-type'
import AttrUtils from '@/svg/utils/attr'
const state = {
  list: []
}
const mutations = {
  [types.SET_ATTR_LIST] (state, shape) {
    state.list = AttrUtils.getAttr(shape)
  }
}
export default {
  state,
  mutations
}
