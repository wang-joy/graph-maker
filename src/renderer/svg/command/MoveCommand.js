import Command from './Command'
class MoveCommand extends Command {
  constructor (shapes, startPoint, endPoint, startBoxs) {
    super()
    this.shapes = shapes
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.startBoxs = startBoxs
  }
  execute () {
    this.shapes.forEach((element, i) => {
      const m = element.node.getScreenCTM().inverse()
      const newStartPoint = this.startPoint.matrixTransform(m)
      const newEndPoint = this.endPoint.matrixTransform(m)
      let x = this.startBoxs[i].x + newEndPoint.x - newStartPoint.x
      let y = this.startBoxs[i].y + newEndPoint.y - newStartPoint.y
      element.move(x, y)
    })
  }
  undo () {
    this.shapes.forEach((element, i) => {
      const m = element.node.getScreenCTM().inverse()
      const newStartPoint = this.startPoint.matrixTransform(m)
      const newEndPoint = this.endPoint.matrixTransform(m)
      let x = this.startBoxs[i].x + newStartPoint.x - newEndPoint.x
      let y = this.startBoxs[i].y + newStartPoint.y - newEndPoint.y
      element.move(x, y)
    })
  }
}
export default MoveCommand
