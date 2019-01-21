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
    if (svg) {
      svg.save()
      let tab = state.list.find(el => el.name === id)
      let index = state.list.indexOf(tab)
      tab.label = svg.label
      tab.filePath = svg.filePath
      state.list.splice(index, 1, tab)
    }
  },
  [types.SAVE_AS_SVG] (state) {
    let id = state.active
    let svg = SvgManager.getById(id)
    if (svg) {
      svg.saveAs()
      let tab = state.list.find(el => el.name === id)
      let index = state.list.indexOf(tab)
      tab.label = svg.label
      tab.filePath = svg.filePath
      state.list.splice(index, 1, tab)
    }
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
      let filePath = svg.filePath
      if (path) {
        files.push(filePath)
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
  },
  [types.COPY] (state, svg) {
    svg.copy()
  },
  [types.CUTE] (state, svg) {
    svg.cute()
  },
  [types.PASTE] (state, svg) {
    svg.paste()
  },
  [types.REMOVE_SHAPES] (state, svg) {
    svg.removeShapes()
  },
  [types.SELECT_ALL] (state, svg) {
    svg.selectAll()
  },
  [types.INVERT_SELECT] (state, svg) {
    svg.invertSelect()
  },
  [types.ALIGN_SHAPES] (state, {svg, type}) {
    svg.alignShapes(type)
  },
  [types.FLIP_X] (state, svg) {
    svg.flipX()
  },
  [types.FLIP_Y] (state, svg) {
    svg.flipY()
  },
  [types.ROTATE] (state, {svg, rotation, relative}) {
    svg.rotate(rotation, relative)
  },
  [types.GROUP] (state, svg) {
    svg.group()
  },
  [types.UNGROUP] (state, svg) {
    svg.ungroup()
  },
  [types.ARRANGE] (state, {svg, type}) {
    svg.arrange(type)
  }
}
export default mutations
