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
  openSvg ({commit, getters}) {
    let opts = {
      title: '打开',
      filters: [ { name: 'svg', extensions: ['svg'] } ],
      properties: [ 'openFile' ]
    }
    let fileNames = remote.dialog.showOpenDialog(opts)
    if (fileNames) {
      fileNames.forEach(file => {
        let tab = getters.getTabByFileName(file)
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
  }
}
