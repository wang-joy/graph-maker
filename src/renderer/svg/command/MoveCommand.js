import Command from './Command'
// import ShapeUtils from '@/svg/utils/shape'
class MoveCommand extends Command {
  constructor (shapes, startPoints, endPoints) {
    super()
    this.shapes = shapes
    this.startPoints = startPoints
    this.endPoints = endPoints
  }
  execute () {
    this.shapes.forEach((element, i) => element.move(this.endPoints[i].x, this.endPoints.y))
  }
  undo () {
    this.shapes.forEach((element, i) => element.move(this.startPoints[i].x, this.startPoints.y))
  }
}
export default MoveCommand
