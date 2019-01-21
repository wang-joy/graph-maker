import Command from './Command'
import ShapeUtils from '@/svg/utils/shape'
class FilpXCommand extends Command {
  constructor (shapes) {
    super()
    this.shapes = shapes
  }
  execute () {
    ShapeUtils.flipX(this.shapes)
  }
  undo () {
    ShapeUtils.flipX(this.shapes)
  }
}
export default FilpXCommand
