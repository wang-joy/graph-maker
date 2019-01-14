import ShapeUtils from './shape'
export default {
  getAttr (shape) {
    // let type = ShapeUtils.getShapeType(shape)
  },
  setWidth (shapes, value) {
    shapes.forEach(item => {
      if (ShapeUtils.getShapeType(item) === 'g') {
        let scaleX = value / item.bbox().width
        let scaleY = item.transform('scaleY')
        item.scale(scaleX, scaleY)
      } else {
        item.width(value)
      }
    })
  },
  setHeight (shapes, value) {
    shapes.forEach(item => {
      if (ShapeUtils.getShapeType(item) === 'g') {
        let scaleX = item.transform('scaleX')
        let scaleY = value / item.bbox().height
        item.scale(scaleX, scaleY)
      } else {
        item.height(value)
      }
    })
  }
}
