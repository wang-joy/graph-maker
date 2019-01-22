import Command from './Command'
import ShapeUtils from '@/svg/utils/shape'
import 'svg.draggable.js'
class GroupCommand extends Command {
  constructor (shapes, svg) {
    super()
    this.shapes = shapes
    this.svg = svg
  }
  execute () {
    const shapeManager = this.svg.shapeManager
    const selector = this.svg.selector
    const g = this.svg.draw.group().attr('type', 'group')
    ShapeUtils.setShapeId(g, this.svg)
    this.shapes.forEach(element => {
      element.draggable(false).off()
      shapeManager.remove(element)
      g.add(element)
    })
    shapeManager.add(g)
    selector.select(g)
    this.g = g
  }
  undo () {
    const shapeManager = this.svg.shapeManager
    shapeManager.remove(this.g)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      let element = this.shapes[i]
      ShapeUtils.setShapeId(element, this.svg)
      shapeManager.add(element)
    }
    this.g.ungroup()
    const selector = this.svg.selector
    selector.multiSelect(this.shapes)
  }
}
export default GroupCommand
