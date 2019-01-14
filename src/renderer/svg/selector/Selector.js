import ShapeUtils from '@/svg/utils/shape'
import '@/svg/plugins/select'
import 'svg.select.js/dist/svg.select.css'
class Selector {
  constructor () {
    this.shapes = []
  }
  select (shape) {
    let multiSelected = shape.remember('multiSelect')
    if (!multiSelected) {
      this.clear()
      shape.selectize(true, {deepSelect: ShapeUtils.deepSelect(shape)})
      shape.fire('select')
      this.shapes.push(shape)
    }
  }
  clear () {
    this.shapes.forEach(el => {
      el.selectize(false, {deepSelect: ShapeUtils.deepSelect(el)})
      el.forget('multiSelect')
    })
    this.shapes = []
  }
  multiSelect (shapes) {
    this.clear()
    shapes.forEach(el => {
      el.selectize(true, {deepSelect: ShapeUtils.deepSelect(el)})
      el.remember('multiSelect', true)
      this.shapes.push(el)
    })
  }
  unselect (shape) {
    shape.selectize(false, {deepSelect: ShapeUtils.deepSelect(shape)})
    this.shapes = this.shapes.filter(el => el !== shape)
  }
}
export default Selector
