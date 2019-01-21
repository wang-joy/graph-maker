import Command from './Command'
class RotateCommand extends Command {
  startRotations = []
  constructor (shapes, rotation, relative) {
    super()
    this.shapes = shapes
    this.rotation = rotation
    this.relative = relative
  }
  execute () {
    this.startRotations = []
    this.shapes.forEach(element => {
      let rotation = element.transform('rotation')
      this.startRotations.push(rotation)
      element.transform({rotation: this.rotation}, this.relative)
    })
  }
  undo () {
    this.shapes.forEach((element, index) => {
      element.rotate(this.startRotations[index])
    })
  }
}
export default RotateCommand
