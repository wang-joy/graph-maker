import ShapeUtils from '@/svg/utils/shape'
// import SVG from 'svg.js'
class CopyManager {
  shapes = []
  copy (shapes) {
    if (shapes.length !== 0) {
      this.shapes = []
    }
    shapes.forEach(element => {
      const cloneElement = element.clone()
      // $.extend(true, cloneElement, element)
      cloneElement.remove()
      this.shapes.push(cloneElement)
    })
  }
  cute (shapes, svg) {
    if (shapes.length !== 0) {
      this.shapes = []
    }
    shapes.forEach(item => {
      this.shapes.push(item)
    })
    svg.removeShapes(shapes)
  }
  paste (svg) {
    let clones = []
    this.shapes.forEach(item => {
      let clone = item.clone(svg.draw).dmove(5, 5)
      // console.log(clone)
      clone.remove()
      ShapeUtils.setShapeId(clone, svg)
      clones.push(clone)
    })
    svg.addShapes(clones)
    const selector = svg.selector
    if (clones.length === 1) {
      selector.select(clones[0])
    } else if (clones.length > 0) {
      selector.multiSelect(clones)
    }
  }
}
export default new CopyManager()
