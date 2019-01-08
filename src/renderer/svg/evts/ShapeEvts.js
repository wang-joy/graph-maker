import ShapeUtils from '@/svg/utils/shape'
import 'svg.draggable.js'
import GraphMask from '@/svg/GraphMask'
import SVG from 'svg.js'
import '@/svg/plugins/resize'
const mousedown = function (e) {
  const draw = this.doc()
  const mode = draw.remember('_mode')
  if (mode === 'select' && e.button === 0) {
    const svg = draw.remember('_svg')
    const selector = svg.selector
    selector.select(this)
    this.draggable()
    e.stopPropagation()
  } else if (mode === 'drawstart' && e.button === 0) {
    this.draggable(false)
  }
}
const drawstart = function (e) {
  if (!ShapeUtils.deepSelect(this)) {
    const selector = this.doc().remember('_svg').selector
    selector.select(this)
  }
}
const drawstop = function (e) {
  this.draggable().resize()
  const svg = ShapeUtils.getSvg(this)
  svg.addShape(this)
  GraphMask.hide()
  SVG.off(GraphMask.el, 'mousedown.drawend')
  this.doc().remember('_mode', 'select')
  if (ShapeUtils.deepSelect(this)) {
    const selector = svg.selector
    selector.select(this)
  }
}
const select = function (e) {
}
const imgLoaded = function () {
  this.draggable().resize()
  const svg = ShapeUtils.getSvg(this)
  svg.addShape(this)
  const selector = svg.selector
  selector.select(this)
}
export default {
  mousedown,
  select,
  drawstart,
  drawstop,
  imgLoaded
}
