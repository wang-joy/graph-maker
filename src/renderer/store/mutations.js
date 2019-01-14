import types from './mutations-type'
import SvgManager from '@/svg/manager/svg-manager'
import settings from 'electron-settings'
import path from 'path'
import GraphSvg from '@/svg/GraphSvg'
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
  },
  [types.SAVE_SVG] (state, id) {
    if (typeof id === 'undefined') {
      id = state.active
    }
    let svg = SvgManager.getById(id)
    svg.save()
    let tab = state.list.find(el => el.name === id)
    let index = state.list.indexOf(tab)
    tab.label = svg.label
    tab.filePath = svg.filePath
    state.list.splice(index, 1, tab)
  },
  [types.SAVE_AS_SVG] (state) {
    let id = state.active
    let svg = SvgManager.getById(id)
    svg.saveAs()
    let tab = state.list.find(el => el.name === id)
    let index = state.list.indexOf(tab)
    tab.label = svg.label
    tab.filePath = svg.filePath
    state.list.splice(index, 1, tab)
  },
  [types.INIT] (state, list) {
    state.list = list
  },
  [types.SET_FILE_HISTORY] (state) {
    let svgs = SvgManager.svgs
    let files = []
    svgs.forEach(svg => {
      if (confirm(`是否保存${svg.label}`)) {
        svg.save()
      }
      let path = svg.path
      if (path) {
        files.push(path)
      }
    })
    settings.set('svgs', files)
  },
  [types.OPEN_SVG] (state, {file, id}) {
    let svg = new GraphSvg(id, file)
    SvgManager.svgs.push(svg)
    let tab = {
      label: path.basename(file, path.extname(file)),
      name: svg.id,
      filePath: file
    }
    state.list.push(tab)
  },
  [types.REDO] (state, svg) {
    svg.redo()
  },
  [types.UNDO] (state, svg) {
    svg.undo()
  }
}
export default mutations
