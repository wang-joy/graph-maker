import Command from './Command'
import ShapeUtils from '@/svg/utils/shape'
class ResizeCommand extends Command {
  constructor (shape, start, end) {
    super()
    this.shape = shape
    this.start = start
    this.end = end
  }
  execute () {
    let type = ShapeUtils.getShapeType(this.shape)
    switch (type) {
      case 'g':
        break
      case 'polyline':
      case 'line':
      case 'polygon':
      case 'curve':
        this.shape.plot(this.end.array)
        break
      default:
        this.shape.width(this.end.width).height(this.end.height).move(this.end.x, this.end.y)
        break
    }
    this.shape.transform(this.end.transform)
  }
  undo () {
    let type = ShapeUtils.getShapeType(this.shape)
    switch (type) {
      case 'g':
        break
      case 'polyline':
      case 'line':
      case 'polygon':
      case 'curve':
        this.shape.plot(this.start.array)
        break
      default:
        this.shape.width(this.start.width).height(this.start.height).move(this.start.x, this.start.y)
        break
    }
    this.shape.transform(this.start.transform)
  }
}
export default ResizeCommand
