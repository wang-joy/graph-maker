// import store from '@/store'
import shapes from '@/svg/shape/index'
import GraphMask from '@/svg/GraphMask'
import '@/svg/plugins/draw'
import ShapeUtils from '@/svg/utils/shape'
// import store from '@/store'
const mousemove = function (e) {
  let point = this.point(e.clientX, e.clientY)
  let svg = this.remember('_svg')
  let cursor = svg.cursor
  cursor.setPoint(point)
}
const mousedown = function (e) {
  let mode = this.remember('_mode')
  let right = e.button === 2
  let left = e.button === 0
  switch (mode) {
    case 'drawstart':
      if (left) {
        let selector = this.remember('_svg').selector
        selector.clear()
        __drawstart(this, e)
      }
      if (right) {
        this.remember('_mode', 'select')
      }
      break
    case 'select':
      if (left) {
        let selector = this.remember('_svg').selector
        selector.clear()
        __drawSelector(e, this)
      }
      break
  }
}
function __drawstart (parent, e) {
  let type = parent.remember('_type')
  let shape = shapes[type]()
  GraphMask.show()
  parent.remember('_mode', 'drawing')
  // parent.add(shape)
  shape.attr('type', type)
  let svg = parent.remember('_svg')
  svg.addShapes([shape])
  ShapeUtils.setShapeId(shape, svg)
  shape.draw(e)
  GraphMask.on('mousedown.drawend', function (e) { __drawend(e, shape) })
}
function __drawend (e, shape) {
  if (e.button === 0) {
    shape.draw(e)
  } else {
    shape.draw('stop')
  }
}
const __drawSelector = (e, svg) => {
  const area = svg.rect().attr({
    fill: 'blue',
    opacity: 0.5
  })
  area.draw(e)
  svg.on('mouseup.drawselector', function (e) {
    area.draw(e)
    if (area.width() === 0 && area.height() === 0) {
      area.remove()
      return
    }
    const graphSvg = this.remember('_svg')
    __select(graphSvg, area)
    area.remove()
    this.off('mouseup.drawselector')
  })
}
const __select = function (svg, area) {
  const shapeManager = svg.shapeManager
  const shapes = shapeManager.shapes.filter(item => ShapeUtils.isRboxIntersect(area, item))
  svg.selector.multiSelect(shapes)
}
export default {
  mousemove,
  mousedown
}
