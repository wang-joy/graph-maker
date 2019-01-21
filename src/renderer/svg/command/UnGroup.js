import Command from './Command'
import ShapeUtils from '@/svg/utils/shape'
import 'svg.draggable.js'
class UnGroupCommand extends Command {
  constructor (group, svg) {
    super(svg)
    this.group = group
  }
  execute () {
    const shapeManager = this.svg.shapeManager
    const selector = this.svg.selector
    const _this = this
    this.shapes = this.group.children()
    this.group.each(function () {
      ShapeUtils.setShapeId(this, _this.svg)
      shapeManager.add(this)
    })
    shapeManager.remove(this.group)
    this.group.ungroup()
    selector.multiSelect(this.shapes)
  }
  undo () {
    const shapeManager = this.svg.shapeManager
    ShapeUtils.setShapeId(this.group, this.svg)
    this.shapes.forEach(element => {
      element.draggable(false).off()
      shapeManager.remove(element)
      this.group.add(element)
    })
    this.group.draggable()
    shapeManager.add(this.group)
  }
}
export default UnGroupCommand
