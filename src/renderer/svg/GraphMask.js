import SVG from 'svg.js'
export default {
  el: document.getElementById('graph-mask'),
  show () {
    this.el.style.display = 'block'
  },
  hide () { this.el.style.display = 'none' },
  on (evt, call) { SVG.on(this.el, evt, call) },
  off (evt) { SVG.off(this.el, evt) },
  setEl (el) { this.el = el }
}
