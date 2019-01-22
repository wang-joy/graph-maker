import ShapeUtils from '@/svg/utils/shape'
import '@/svg/plugins/select'
import 'svg.draggable.js'
import 'svg.select.js/dist/svg.select.css'
class Selector {
  constructor () {
    this.shapes = []
  }
  select (shape) {
    this.clear()
    shape.selectize(true, {deepSelect: ShapeUtils.deepSelect(shape)})
    shape.fire('select')
    shape.draggable()
    this.shapes.push(shape)
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
}
export default Selector
