class ShapeManager {
  shapes = []
  constructor (svg) {
    this.svg = svg
  }
  add (shape) {
    const draw = this.svg.draw
    draw.add(shape)
    this.shapes.push(shape)
  }
  remove (shape) {
    let selector = this.svg.selector
    // const draw = this.svg.draw
    selector.unselect(shape)
    shape.remove()
    this.shapes = this.shapes
  }
  getShapeById (id) {
    return this.shapes.find(el => el.attr('id') === id)
  }
}
export default ShapeManager
