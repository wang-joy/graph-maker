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
  removeSvg ({commit}, id) {
    commit(types.REMOVE_SVG, id)
  },
  saveSvg ({commit}, id) {
    commit(types.SAVE_SVG, id)
  },
  saveAsSvg ({commit}) {
    commit(types.SAVE_AS_SVG)
  },
  initList ({commit, getters}) {
    let files = settings.get('svgs') || []
    console.log(files)
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
    }
  },
  undo ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.UNDO, svg)
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
    }
  },
  paste ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.PASTE, svg)
    }
  },
  remove ({commit, getters}) {
    let svg = getters.svg
    if (svg) {
      commit(types.REMOVE_SHAPES, svg)
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
  }
}
