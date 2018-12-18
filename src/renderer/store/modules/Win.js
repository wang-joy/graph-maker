import types from '../mutations-type'
const state = {
  minWinWidth: 1200,
  minWinHeight: 800,
  winWidth: 0,
  winHeight: 0,
  headerHeight: 0,
  footerHeight: 0,
  lefterWidth: 0,
  righterWidth: 0
}

const mutations = {
  [types.WIN_RESIZE] (state, size) {
    state.winWidth = Math.max(state.minWinWidth, size[0])
    state.winHeight = Math.max(state.minWinHeight, size[1])
  },
  [types.SET_FOOTER_HEIGHT] (state, h) {
    state.footerHeight = h
  },
  [types.SET_HEADER_HEIGHT] (state, h) {
    state.headerHeight = h
  },
  [types.SET_LEFTER_WIDTH] (state, w) {
    state.lefterWidth = w
  },
  [types.SET_RIGHTER_WIDTH] (state, w) {
    state.righterWidth = w
  }
}
const actions = {
  winResize (context, size) {
    context.commit(types.WIN_RESIZE, size)
  }
}
const getters = {
  workHeight: state => {
    return state.winHeight - state.headerHeight - state.footerHeight
  },
  workMainWidth: state => {
    return state.winWidth - state.lefterWidth - state.righterWidth
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}