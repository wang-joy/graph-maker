import Command from './Command'
import ShapeUtils from '@/svg/utils/shape'
class DelCommand extends Command {
  constructor (svg, shapes) {
    super(svg)
    this.shapes = shapes
  }
  execute () {
    const shapeManager = this.svg.shapeManager
    this.shapes.forEach(element => {
      shapeManager.remove(element)
    })
  }
  undo () {
    const shapeManager = this.svg.shapeManager
    this.shapes.reverse().forEach(element => {
      ShapeUtils.setShapeId(element, this.svg)
      shapeManager.add(element)
    })
  }
}

export default DelCommand
