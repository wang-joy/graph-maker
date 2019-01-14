import Command from './Command'
class MoveCommand extends Command {
  constructor (shape, startPoint, endPoint, startBox, endBox) {
    super()
    this.shape = shape
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.startBox = startBox
    this.endBox = endBox
  }
  execute () {
    let x = this.startBox.x + this.endPoint.x - this.startPoint.x
    let y = this.startBox.y + this.endPoint.y - this.startPoint.y
    this.shape.move(x, y)
  }
  undo () {
    let x = this.endBox.x + this.startPoint.x - this.endPoint.x
    let y = this.endBox.y + this.startPoint.y - this.endPoint.y
    this.shape.move(x, y)
  }
}
export default MoveCommand
