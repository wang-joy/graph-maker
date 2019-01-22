import ShapeUtils from '@/svg/utils/shape'
import 'svg.draggable.js'
import '@/svg/plugins/resize'
import Vue from 'vue'
class ShapeManager {
  shapes = []
  constructor (svg) {
    this.svg = svg
  }
  add (shape) {
    const draw = this.svg.draw
    ShapeUtils.init(shape, this.svg)
    const index = typeof shape.remember('index') === 'undefined' ? this.shapes.length : shape.remember('index')
    if (this.shapes[index]) {
      this.shapes[index].before(shape)
    } else {
      draw.add(shape)
    }
    // draw.add(shape)
    shape.draggable().resize()
    this.shapes.splice(index, 0, shape)
    this.__updateRemember()
  }
  remove (shape) {
    let selector = this.svg.selector
    // const draw = this.svg.draw
    selector.unselect(shape)
    shape.remove()
    this.shapes = this.shapes.filter(el => el !== shape)
    this.__updateRemember()
  }
  getShapeById (id) {
    return this.shapes.find(el => el.attr('id') === id)
  }
  __updateRemember () {
    this.shapes.forEach((item, index) => item.remember('index', index))
  }
  arrange (shape, index) {
    let initIndex = this.shapes.indexOf(shape)
    let temp = this.shapes[index]
    Vue.set(this.shapes, index, shape)
    Vue.set(this.shapes, initIndex, temp)
    // this.shapes[index] = shape
    // this.shapes[initIndex] = temp
    shape.remember('index', index)
    temp.remember('index', initIndex)
    temp.before(shape)
    if (initIndex === this.shapes.length - 1) {
      this.svg.draw.add(temp)
    } else {
      this.shapes[initIndex + 1].before(temp)
    }
  }
}
export default ShapeManager
