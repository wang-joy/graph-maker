import Command from './Command'
class Arrange extends Command {
  constructor (shape, index, shapeManager) {
    super()
    this.shape = shape
    this.index = index
    this.shapeManager = shapeManager
    this.initIndex = shapeManager.shapes.indexOf(shape)
  }
  execute () {
    this.shapeManager.arrange(this.shape, this.index)
  }
  undo () {
    this.shapeManager.arrange(this.shape, this.initIndex)
  }
}

export default Arrange
