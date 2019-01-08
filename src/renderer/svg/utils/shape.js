import ShapeEvts from '@/svg/evts/ShapeEvts'
export default {
  getShapeType (shape) {
    return shape.attr('type') || shape.type
  },
  isCallDrawStop (shape) {
    return shape && (this.getShapeType(shape) === 'polyline')
  },
  deepSelect (shape) {
    return (!!shape) && (this.getShapeType(shape) === 'polyline' || this.getShapeType(shape) === 'polygon' || this.getShapeType(shape) === 'line' || this.getShapeType(shape) === 'curve')
  },
  getSvg (shape) {
    return shape.doc().remember('_svg')
  },
  init (shape, type) {
    for (const key in ShapeEvts) {
      if (ShapeEvts.hasOwnProperty(key)) {
        const evt = ShapeEvts[key]
        shape.on(key, evt)
      }
    }
    shape.attr('id', this.getNextId(type, shape.doc())).attr('type', type)
  },
  getNextId (type, draw) {
    let n = 0
    let key = '_' + type + '_n'
    if (draw.remember(key)) {
      n = 1 + draw.remember(key)
    }
    draw.remember(key, n)
    return type + n
  }
}
