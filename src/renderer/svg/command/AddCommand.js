import Command from './Command'
import ShapeUtils from '@/svg/utils/shape'
class AddCommand extends Command {
  constructor (svg, shapes) {
    super(svg)
    this.shapes = shapes
  }

  execute () {
    this.shapes.forEach(item => {
      ShapeUtils.setShapeId(item, this.svg)
      this.svg.shapeManager.add(item)
    })
  }
  undo () {
    this.shapes.forEach(item => {
      this.svg.shapeManager.remove(item)
    })
  }
}
export default AddCommand
