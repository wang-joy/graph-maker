import ShapeUtils from '@/svg/utils/shape'
import '@/svg/plugins/select'
import 'svg.draggable.js'
import 'svg.select.js/dist/svg.select.css'
import SVG from 'svg.js'
class Selector {
  constructor () {
    this.shapes = []
  }
  select (shape) {
    this.clear()
    this.shapes.push(shape)
    while (shape.parent() instanceof SVG.G) {
      shape = shape.parent()
    }
    // console.log(ShapeUtils.deepSelect(shape))
    shape.selectize(true, {deepSelect: ShapeUtils.deepSelect(shape)})
    shape.fire('select')
    shape.draggable()
  }
  clear () {
    this.shapes.forEach(el => {
      el.selectize(false, {deepSelect: ShapeUtils.deepSelect(el)})
      el.forget('multiSelect')
      // el.draggable(false)
    })
    this.shapes = []
  }
  multiSelect (shapes) {
    this.clear()
    shapes.forEach(el => {
      el.selectize(true, {deepSelect: ShapeUtils.deepSelect(el)})
      el.remember('multiSelect', true)
      el.draggable()
      this.shapes.push(el)
    })
  }
  unselect (shape) {
    shape.selectize(false, {deepSelect: ShapeUtils.deepSelect(shape)})
    shape.forget('multiSelect')
    this.shapes = this.shapes.filter(el => el !== shape)
    if (this.shapes.length === 1) {
      this.shapes[0].forget('multiSelect')
    }
  }
  addSelect (shape) {
    if (this.shapes.indexOf(shape) < 0) {
      shape.selectize(true, {deepSelect: ShapeUtils.deepSelect(shape)})
      this.shapes.push(shape)
      this.shapes.forEach(item => item.remember('multiSelect', true))
    }
  }
  getOperShapes () {
    return this.shapes.map(item => {
      while (item.parent() instanceof SVG.G) {
        item = item.parent()
      }
      return item
    })
  }
}
export default Selector
