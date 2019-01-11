import store from '@/store'
window.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.keyCode === 78) {
    store.dispatch('createSvg')
  } else if (e.ctrlKey && e.keyCode === 83) {
    store.dispatch('saveSvg')
  } else if (e.ctrlKey && e.shiftKey && e.keyCode === 83) {
    store.dispatch('saveAsSvg')
  } else if (e.ctrlKey && e.keyCode === 79) {
    store.dispatch('openSvg')
  } else if (e.ctrlKey && e.keyCode === 81) {
    store.dispatch('winQuit')
  }
})
