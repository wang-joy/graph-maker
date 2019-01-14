import ShapeUtils from '@/svg/utils/shape'
import 'svg.draggable.js'
import GraphMask from '@/svg/GraphMask'
import SVG from 'svg.js'
import '@/svg/plugins/resize'
import MoveCommand from '@/svg/command/MoveCommand'
import ResizeCommand from '@/svg/command/ResizeCommand'
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
  // svg.addShape(this)
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
  // svg.addShape(this)
  const selector = svg.selector
  selector.select(this)
}
const dragend = function ({detail}) {
  let startPoint = detail.handler.startPoints.point
  let endPoint = detail.p
  let startBox = detail.handler.startPoints.box
  let endBox = detail.handler.getBBox()
  let commandManager = ShapeUtils.getSvg(this).commandManager
  let command = new MoveCommand(this, startPoint, endPoint, startBox, endBox)
  commandManager.execute(command)
}
const resizedone = function ({detail}) {
  let parameters = detail.handler.parameters
  let startBox = parameters.box
  let commandManager = ShapeUtils.getSvg(this).commandManager
  let start = {
    width: startBox.width,
    height: startBox.height,
    transform: parameters.transform,
    array: parameters.array,
    x: startBox.x,
    y: startBox.y
  }
  let box = this.bbox()
  let end = {
    width: box.width,
    height: box.height,
    transform: this.transform(),
    array: this.array ? this.array().valueOf() : [],
    x: box.x,
    y: box.y
  }
  let cmd = new ResizeCommand(this, start, end)
  commandManager.execute(cmd)
}
export default {
  mousedown,
  select,
  drawstart,
  drawstop,
  imgLoaded,
  dragend,
  resizedone
}
