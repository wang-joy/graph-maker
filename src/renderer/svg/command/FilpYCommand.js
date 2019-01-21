import Command from './Command'
import ShapeUtils from '@/svg/utils/shape'
class FilpYCommand extends Command {
  constructor (shapes) {
    super()
    this.shapes = shapes
  }
  execute () {
    ShapeUtils.flipY(this.shapes)
  }
  undo () {
    ShapeUtils.flipY(this.shapes)
  }
}
export default FilpYCommand
