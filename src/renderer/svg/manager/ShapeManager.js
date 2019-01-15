import ShapeUtils from '@/svg/utils/shape'
import 'svg.draggable.js'
import '@/svg/plugins/resize'
class ShapeManager {
  shapes = []
  constructor (svg) {
    this.svg = svg
  }
  add (shape) {
    const draw = this.svg.draw
    ShapeUtils.init(shape, this.svg)
    draw.add(shape)
    shape.draggable().resize()
    this.shapes.push(shape)
  }
  remove (shape) {
    let selector = this.svg.selector
    // const draw = this.svg.draw
    selector.unselect(shape)
    shape.remove()
    this.shapes = this.shapes.filter(el => el !== shape)
  }
  getShapeById (id) {
    return this.shapes.find(el => el.attr('id') === id)
  }
}
export default ShapeManager
