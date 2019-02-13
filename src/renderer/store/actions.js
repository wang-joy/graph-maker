import types from './mutations-type'
import settings from 'electron-settings'
import fs from 'fs'
import {remote} from 'electron'
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
  removeSvg ({commit, rootState}, id) {
    commit(types.REMOVE_SVG, id)
  },
  saveSvg ({commit, getters, rootState}, id) {
    if (typeof id === 'undefined') {
      id = rootState.active
    }
    commit(types.SAVE_SVG, id)
  },
  saveAsSvg ({commit, getters}) {
    commit(types.SAVE_AS_SVG)
  },
  initList ({commit, getters}) {
    let files = settings.get('svgs') || []
    files.forEach(file => {
      try {
        fs.openSync(file, fs.constants.F_OK)
        let id = getters.id
        commit(types.OPEN_SVG, {file: file, id: id})
        commit(types.SET_ACTIVE_ID, id)
        commit(types.INCREMENT_MAIN_COUNTER)
      } catch (error) {
        throw error
      }
    })
  },
  openSvg ({commit, getters, rootState}) {
    let opts = {
      title: '打开',
      filters: [ { name: 'svg', extensions: ['svg'] } ],
      properties: [ 'openFile' ]
    }
    let fileNames = remote.dialog.showOpenDialog(opts)
    if (fileNames) {
      fileNames.forEach(file => {
        let tab = rootState.list.find(el => el.filePath === file)
        if (!tab) {
          let id = getters.id
          commit(types.OPEN_SVG, {file: file, id: id})
          commit(types.SET_ACTIVE_ID, id)
          commit(types.INCREMENT_MAIN_COUNTER)
        } else {
          commit(types.SET_ACTIVE_ID, tab.name)
        }
      })
    }
  },
  redo ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.REDO, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  undo ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.UNDO, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  copy ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.COPY, svg)
    }
  },
  cute ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.CUTE, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  paste ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.PASTE, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  remove ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.REMOVE_SHAPES, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  selectAll ({commit, getters, rootState}) {
    let svg = getters.svg
    if (svg) {
      commit(types.SELECT_ALL, svg)
    }
  },
  invertSelect ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.INVERT_SELECT, svg)
    }
  },
  align ({commit, getters}, type) {
    const svg = getters.svg
    if (svg) {
      commit(types.ALIGN_SHAPES, {svg, type})
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  flipX ({commit, getters}) {
    const svg = getters.svg
    if (svg) {
      commit(types.FLIP_X, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  flipY ({commit, getters}) {
    const svg = getters.svg
    if (svg) {
      commit(types.FLIP_Y, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  rotate ({commit, getters}, {rotation, relative}) {
    const svg = getters.svg
    if (svg) {
      commit(types.ROTATE, {svg, rotation, relative})
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  group ({commit, getters}) {
    const svg = getters.svg
    if (svg) {
      commit(types.GROUP, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  ungroup ({commit, getters}) {
    const svg = getters.svg
    if (svg) {
      commit(types.UNGROUP, svg)
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  arrange ({commit, getters}, type) {
    const svg = getters.svg
    if (svg) {
      commit(types.ARRANGE, {svg, type})
      commit(types.SVG_CHANGE, {val: true})
    }
  },
  svgChange ({commit, getters}, id) {
    commit(types.SVG_CHANGE, {val: true})
  }
}
