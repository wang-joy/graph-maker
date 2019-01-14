import Command from './Command'
class AddCommand extends Command {
  constructor (svg, shape) {
    super(svg)
    this.shape = shape
    this.selector = svg.selector
    this.shapeManager = svg.shapeManager
  }

  execute () {
    this.shapeManager.add(this.shape)
  }
  undo () {
    this.shapeManager.remove(this.shape)
  }
}
export default AddCommand
