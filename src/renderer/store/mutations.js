import types from './mutations-type'
import SvgManager from '@/svg/manager/svg-manager'
const mutations = {
  [types.CREATE_SVG] (state, id) {
    SvgManager.create(id)
    state.list.push({
      name: id,
      new: true,
      label: 'New File'
    })
  },
  [types.SET_ACTIVE_ID] (state, id) {
    state.active = id
  },
  [types.REMOVE_SVG] (state, id) {
    SvgManager.remove(id)
    let list = state.list
    let active = state.active
    if (active === id) {
      list.forEach((el, index) => {
        if (el.name === id) {
          let next = list[index + 1] || list[index - 1]
          if (next) {
            state.active = next.name
          }
        }
      })
    }
    state.list = list.filter(el => el.name !== id)
  }
}
export default mutations
