import store from '@/store'
const keyCodes = new Map([
  ['A', 65], ['B', 66], ['C', 67], ['D', 68], ['E', 69], ['F', 70], ['G', 71], ['H', 72],
  ['I', 73], ['J', 74], ['K', 75], ['L', 76], ['M', 77], ['N', 78], ['O', 79], ['P', 80],
  ['Q', 81], ['R', 82], ['S', 83], ['T', 84], ['U', 85], ['V', 86], ['W', 87], ['X', 88],
  ['Y', 89], ['Z', 90], ['Delete', 46]
])
window.addEventListener('keydown', function (e) {
  if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('N')) {
    store.dispatch('createSvg')
  } else if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('S')) {
    store.dispatch('saveSvg')
  } else if (e.ctrlKey && e.shiftKey && e.keyCode === keyCodes.get('S')) {
    store.dispatch('saveAsSvg')
  } else if (e.ctrlKey && e.keyCode === keyCodes.get('O')) {
    store.dispatch('openSvg')
  } else if (e.ctrlKey && e.keyCode === keyCodes.get('Q')) {
    store.dispatch('winQuit')
  }
  let svg = store.getters.svg
  if (svg && svg.draw && svg.draw.remember('_mode') === 'select') {
    if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('Z')) {
      store.dispatch('undo')
      e.preventDefault()
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === keyCodes.get('Z')) {
      store.dispatch('redo')
      e.preventDefault()
    } else if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('C')) {
      store.dispatch('copy')
      e.preventDefault()
    } else if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('V')) {
      store.dispatch('paste')
      e.preventDefault()
    } else if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('X')) {
      store.dispatch('cute')
      e.preventDefault()
    } else if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('A')) {
      store.dispatch('selectAll')
      e.preventDefault()
    } else if (e.keyCode === keyCodes.get('Delete')) {
      store.dispatch('remove')
      e.preventDefault()
    } else if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('I')) {
      store.dispatch('invertSelect')
      e.preventDefault()
    } else if (e.ctrlKey && !e.shiftKey && e.keyCode === keyCodes.get('G')) {
      store.dispatch('group')
      e.preventDefault()
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === keyCodes.get('G')) {
      store.dispatch('ungroup')
      e.preventDefault()
    }
  }
})
