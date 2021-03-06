import ShapeUtils from '@/svg/utils/shape'
import 'svg.draggable.js'
import GraphMask from '@/svg/GraphMask'
import SVG from 'svg.js'
import '@/svg/plugins/resize'
import MoveCommand from '@/svg/command/MoveCommand'
import ResizeCommand from '@/svg/command/ResizeCommand'
import store from '@/store'
const mousedown = function (e) {
  const draw = this.doc()
  const mode = draw.remember('_mode')
  if (mode === 'select' && e.button === 0) {
    let multiSelect = this.remember('multiSelect')
    if (!multiSelect) {
      if (!e.shiftKey) {
        store.dispatch('selectShape', this)
      } else {
        store.dispatch('addSelect', this)
      }
    } else {
      if (e.shiftKey) {
        store.dispatch('unselect', this)
      }
    }
    e.stopPropagation()
  } else if (mode === 'drawstart' && e.button === 0) {
    this.draggable(false)
  }
}
const drawstart = function (e) {
  store.dispatch('svgChange')
  if (!ShapeUtils.deepSelect(this)) {
    store.dispatch('selectShape', this)
  }
}
const drawstop = function (e) {
  this.draggable().resize()
  // const svg = ShapeUtils.getSvg(this)
  // svg.addShape(this)
  GraphMask.hide()
  SVG.off(GraphMask.el, 'mousedown.drawend')
  this.doc().remember('_mode', 'select')
  if (ShapeUtils.deepSelect(this)) {
    store.dispatch('selectShape', this)
  }
}
const select = function (e) {
}
const resizing = function () {
  this.draggable(false)
}
const imgLoaded = function () {
  this.draggable().resize()
  store.dispatch('selectShape', this)
}
const dragend = function ({detail}) {
  store.dispatch('svgChange')
  let startPoint = detail.handler.startPoints.point
  let endPoint = detail.p
  if (Math.abs(startPoint.x - endPoint.x) >= 1 || Math.abs(startPoint.y - endPoint.y) >= 1) {
    const startPoints = detail.handler.startBoxs.map(item => { return {x: item.x, y: item.y} })
    const svg = ShapeUtils.getSvg(this)
    const shapes = svg.getSelectedShapes()
    const endPoints = shapes.map(item => { return {x: ShapeUtils.getBBox(item).x, y: ShapeUtils.getBBox(item).y} })
    startPoints.some((item, i) => {
      if (Math.abs(item.x - endPoints[i].x) >= 1 || Math.abs(item.y - endPoints[i].y) >= 1) {
        let command = new MoveCommand(shapes, startPoints, endPoints)
        svg.commandManager.execute(command)
        return true
      }
    })
  }
}
const resizedone = function ({detail}) {
  store.dispatch('svgChange')
  let dx = detail.dx
  let dy = detail.dy
  if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
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
    this.draggable()
  }
}
const beforedrag = function (e) {
  // e.preventDefault()
  const shapes = ShapeUtils.getSvg(this).selector.shapes
  const startBoxs = shapes.map(item => ShapeUtils.getBBox(item))
  e.detail.handler.startBoxs = startBoxs
  e.detail.handler.startTransforms = shapes.map(item => item.transform())
}
const dragmove = function (e) {
  e.preventDefault()
  let startPoint = e.detail.handler.startPoints.point
  const startBoxs = e.detail.handler.startBoxs
  const statrTransforms = e.detail.handler.startTransforms
  let p = e.detail.p
  const shapes = ShapeUtils.getSvg(this).selector.shapes
  startPoint = startPoint.matrixTransform(this.node.getScreenCTM())
  p = p.matrixTransform(this.node.getScreenCTM())
  shapes.forEach((item, i) => {
    let newstartPoint = startPoint.matrixTransform(item.node.getScreenCTM().inverse())
    let newp = p.matrixTransform(item.node.getScreenCTM().inverse())
    let x = startBoxs[i].x + newp.x - newstartPoint.x
    let y = startBoxs[i].y + newp.y - newstartPoint.y
    if (item instanceof SVG.G) {
      item.matrix(statrTransforms[i]).transform({x: newp.x - newstartPoint.x, y: newp.y - newstartPoint.y}, true)
    } else {
      item.move(x, y)
    }
  })
}
export default {
  mousedown,
  select,
  drawstart,
  drawstop,
  imgLoaded,
  dragend,
  resizedone,
  dragmove,
  beforedrag,
  resizing
}
