// import store from '@/store'
import shapes from '@/svg/shape/index'
import GraphMask from '@/svg/GraphMask'
import '@/svg/plugins/draw'
import ShapeUtils from '@/svg/utils/shape'
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
export default {
  mousemove,
  mousedown
}
