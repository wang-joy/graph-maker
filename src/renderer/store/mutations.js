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
      isNew: true,
      changed: false,
      label: 'New File'
    })
  },
  [types.SET_ACTIVE_ID] (state, id) {
    state.active = id
  },
  [types.REMOVE_SVG] (state, id) {
    let tab = state.list.find(el => el.name === id)
    if (tab.isNew || tab.changed) {
      if (confirm('该文件尚未保存, 是否保存该文件')) {
        let svg = SvgManager.getById(id)
        if (svg) {
          svg.save()
        }
      }
    }
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
    state.active = state.list.length > 0 ? state.active : '-1'
  },
  [types.SAVE_SVG] (state, id) {
    let svg = SvgManager.getById(id)
    if (svg) {
      svg.save()
      let tab = state.list.find(el => el.name === id)
      let index = state.list.indexOf(tab)
      tab.label = svg.label
      tab.filePath = svg.filePath
      tab.changed = svg.isChanged
      tab.isNew = svg.isNew
      state.list.splice(index, 1, tab)
    }
  },
  [types.SAVE_AS_SVG] (state) {
    let id = state.active
    let svg = SvgManager.getById(id)
    if (svg) {
      svg.saveAs()
      let tab = state.list.find(el => el.name === id)
      tab.changed = svg.isChanged
      tab.isNew = svg.isNew
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
    let tabs = state.list
    let files = []
    tabs.forEach(tab => {
      let svg = SvgManager.getById(tab.name)
      if (tab.isNew || tab.changed) {
        if (confirm(`是否保存${svg.label}`)) {
          svg.save()
        }
      }
      let filePath = svg.filePath
      if (filePath) {
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
      changed: false,
      isNew: false,
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
  },
  [types.SVG_CHANGE] (state, {id, val}) {
    if (typeof id === 'undefined') {
      id = state.active
    }
    let tab = state.list.find(el => el.name === id)
    if (tab) {
      let svg = SvgManager.getById(id)
      tab.changed = val
      let index = state.list.indexOf(tab)
      state.list.splice(index, 1, tab)
      svg.isChanged = val
    }
  },
  [types.SVG_NEW] (state, {id, val}) {
    let tab = state.list.find(el => el.name === id)
    if (tab) {
      let svg = SvgManager.getById(id)
      tab.isNew = svg.isNew
      let index = state.list.indexOf(tab)
      state.list.splice(index, 1, tab)
    }
  }
}
export default mutations
