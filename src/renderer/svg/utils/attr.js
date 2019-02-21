import ShapeUtils from './shape'
import SVG from 'svg.js'
class Attr {
  constructor (title, desc, val, setter, type, opts) {
    this.title = title
    this.desc = desc
    this.val = val
    this.setter = setter
    this.type = type
    this.opts = opts
  }
}
export default {
  getAttr (shape) {
    let type = ShapeUtils.getShapeType(shape)
    let attrs = []
    switch (type) {
      case 'rect':
        attrs = this.getRectAttrs(shape)
        break
      case 'circle':
        attrs = this.getCircleAttrs(shape)
        break
      case 'ellipse':
        attrs = this.getEllipseAttrs(shape)
        break
      case 'line':
        attrs = this.getLineAttrs(shape)
        break
      case 'polygon':
        attrs = this.getPolygonAttrs(shape)
        break
      case 'polyline':
        attrs = this.getPolylineAttrs(shape)
        break
      case 'image':
        attrs = this.getImgAttrs(shape)
        break
      case 'curve':
        attrs = this.getCurveAttrs(shape)
        break
      case 'arc':
        attrs = this.getArcAttrs(shape)
        break
      case 'arch':
        attrs = this.getArchAttrs(shape)
        break
      case 'sector':
        attrs = this.getSectorAttrs(shape)
        break
      case 'group':
        attrs = this.getGroupAttrs(shape)
        break
      default:
        attrs = []
    }
    return attrs
  },
  getShapesAttrs (shapes) {
    var attrs1 = this.getAttr(shapes[0])
    for (let i = 1; i < shapes.length; i++) {
      var attrs = []
      const shape = shapes[i]
      var attrs2 = this.getAttr(shape)
      attrs2.forEach(attr => {
        var item = this.indexOf(attrs1, attr)
        if (item !== null) {
          attrs.push(attr)
        }
      })
      attrs1 = attrs
    }
    return attrs1
  },
  indexOf (arr, item) {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i]
      if (item.title === element.title && item.desc === element.desc) {
        if (item.val !== element.val) {
          item.val = ''
        }
        return item
      }
    }
    return null
  },
  // 获取矩形相关的属性
  getRectAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getWidth(shape), this.getHeight(shape), this.getAngle(shape), this.getRx(shape), this.getRy(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取圆形相关的属性
  getCircleAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getWidth(shape), this.getHeight(shape), this.getRadius(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取椭圆相关的属性
  getEllipseAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getWidth(shape), this.getHeight(shape), this.getAngle(shape), this.getRx(shape, 'x半轴'), this.getRy(shape, 'y半轴'), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取直线相关的属性
  getLineAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getAngle(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取折线相关的属性
  getPolylineAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getWidth(shape), this.getAngle(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取多边形相关的属性
  getPolygonAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getAngle(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取图片相关的属性
  getImgAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getWidth(shape), this.getHeight(shape), this.getAngle(shape), this.getImgPath(shape)]
  },
  // 获取曲线相关的属性
  getCurveAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getWidth(shape), this.getHeight(shape), this.getAngle(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取弧线相关的属性
  getArcAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getAngle(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取弓形相关的属性
  getArchAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getAngle(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取扇形相关的属性
  getSectorAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getAngle(shape), this.getFill(shape), this.getFillOpacity(shape), this.getStroke(shape), this.getStrokeWidth(shape), this.getStrokeOpacity(shape), this.getStrokeDashArray(shape)]
  },
  // 获取组合相关的属性
  getGroupAttrs (shape) {
    return [this.getId(shape), this.getType(shape), this.getLeft(shape), this.getTop(shape), this.getWidth(shape), this.getHeight(shape), this.getAngle(shape)]
  },
  getId (shape, desc = 'ID') {
    return new Attr('id', desc, shape.attr('id'), this.setId, 'input')
  },
  getType (shape, desc = '类型') {
    return new Attr('type', desc, ShapeUtils.getShapeType(shape), null, 'input')
  },
  getLeft (shape, desc = '左边') {
    let val = this.__toInt(this.__getP(shape).x)
    this.setLeft([shape], val)
    return new Attr('left', desc, val, this.setLeft, 'input')
  },
  getTop (shape, desc = '上边') {
    let val = this.__toInt(this.__getP(shape).y)
    this.setTop([shape], val)
    return new Attr('top', desc, val, this.setTop, 'input')
  },
  getWidth (shape, desc = '宽度') {
    var transform = shape.transform()
    var box = shape.bbox()
    var scaleX = transform.scaleX
    var val = this.__toInt(Math.abs(scaleX) * box.width)
    this.setWidth([shape], val)
    return new Attr('width', desc, val, this.setWidth, 'input')
  },
  getHeight (shape, desc = '高度') {
    var transform = shape.transform()
    var box = shape.bbox()
    var scaleY = transform.scaleY
    var val = this.__toInt(Math.abs(scaleY) * box.height)
    this.setHeight([shape], val)
    return new Attr('height', desc, val, this.setHeight, 'input')
  },
  getAngle (shape, desc = '旋转角度') {
    const m = new SVG.Matrix(shape)
    let rotation = m.extract().rotation
    let val = this.__toInt(rotation)
    this.setAngle([shape], val)
    return new Attr('angle', desc, val, this.setAngle, 'input')
  },
  getRx (shape, desc = '圆角横向半径') {
    return new Attr('rx', desc, shape.rx(), this.setRx, 'input')
  },
  getRy (shape, desc = '圆角纵向半径') {
    return new Attr('ry', desc, shape.ry(), this.setRy, 'input')
  },
  getFill (shape, desc = '填充') {
    return new Attr('fill', desc, shape.attr('fill').toUpperCase(), this.setFill, 'color')
  },
  getFillOpacity (shape, desc = '填充透明度') {
    return new Attr('fill-opacity', desc, shape.attr('fill-opacity'), this.setFillOpacity, 'slider')
  },
  getStroke (shape, desc = '线条') {
    return new Attr('stroke', desc, shape.attr('stroke').toUpperCase(), this.setStroke, 'color')
  },
  getStrokeWidth (shape, desc = '线条宽度') {
    return new Attr('stroke-width', desc, shape.attr('stroke-width'), this.setStrokeWidth, 'input')
  },
  getStrokeOpacity (shape, desc = '线条透明度') {
    return new Attr('stroke-opacity', desc, shape.attr('stroke-opacity'), this.setStrokeOpacity, 'slider')
  },
  getStrokeDashArray (shape, desc = '线条类型') {
    let options = [
      { val: '0', desc: '——————' },
      { val: '5,5', desc: '------------------' },
      { val: '20,10,5,10', desc: '—— - —— -' }
    ]
    return new Attr('stroke-dasharray', desc, '' + shape.attr('stroke-dasharray'), this.setStrokeDashArray, 'select', {options})
  },
  getRadius (shape, desc = '半径') {
    return new Attr('radius', desc, shape.attr('r'), this.setRadius, 'input')
  },
  getImgPath (shape, desc = '路径') {
    return new Attr('imgpath', desc, shape.attr('href') || shape.attr('xlink:href'), this.setImgPath, 'img')
  },
  setId (shapes, val) {
    shapes.forEach(shape => {
      let parent = shape.parent()
      let children = parent.children()
      let exist = children.find(item => item.attr('id') === val)
      if (!exist) {
        shape.attr('id', val)
      }
    })
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
  },
  setLeft (shapes, val) {
    if (!isNaN(parseFloat(val))) {
      shapes.forEach(shape => {
        let left = parseFloat(val)
        let m = shape.doc().node.getScreenCTM()
        let point = this.__transformPoint(left, 0, m)
        let p = ShapeUtils.getMovePoint(shape, 'left', {minX: point.x}, shape.doc())
        if (shape.attr('type') === 'g' || shape instanceof SVG.G) {
          shape.transform({x: p.gx, y: p.gy}, true)
        } else {
          shape.move(p.x, p.y)
        }
      })
    }
  },
  setTop (shapes, val) {
    if (!isNaN(parseFloat(val))) {
      shapes.forEach(shape => {
        let top = parseFloat(val)
        let m = shape.doc().node.getScreenCTM()
        let point = this.__transformPoint(0, top, m)
        let p = ShapeUtils.getMovePoint(shape, 'top', {minY: point.y}, shape.doc())
        if (shape.attr('type') === 'g' || shape instanceof SVG.G) {
          shape.transform({x: p.gx, y: p.gy}, true)
        } else {
          shape.move(p.x, p.y)
        }
      })
    }
  },
  setAngle (shapes, val) {
    if (!isNaN(parseFloat(val))) {
      shapes.forEach(shape => {
        let scaleX = shape.transform('scaleX')
        let scaleY = shape.transform('scaleY')
        shape.scale(1, 1).rotate(parseFloat(val)).scale(scaleX, scaleY)
      })
    }
  },
  setRx (shapes, val) {
    if (!isNaN(parseFloat(val))) {
      shapes.forEach(shape => shape.rx(parseFloat(val)))
    }
  },
  setRy (shapes, val) {
    if (!isNaN(parseFloat(val))) {
      shapes.forEach(shape => shape.ry(parseFloat(val)))
    }
  },
  setFill (shapes, val) {
    shapes.forEach(shape => shape.fill(val))
  },
  setFillOpacity (shapes, val) {
    shapes.forEach(shape => shape.fill({opacity: val}))
  },
  setStroke (shapes, val) {
    shapes.forEach(shape => shape.stroke({color: val}))
  },
  setStrokeWidth (shapes, val) {
    shapes.forEach(shape => shape.stroke({width: val}))
  },
  setStrokeOpacity (shapes, val) {
    if (!isNaN(parseFloat(val))) {
      shapes.forEach(shape => shape.stroke({opacity: parseFloat(val)}))
    }
  },
  setStrokeDashArray (shapes, val) {
    shapes.forEach(shape => shape.stroke({dasharray: val}))
  },
  setRadius (shapes, val) {
    if (!isNaN(parseFloat(val))) {
      shapes.forEach(shape => shape.radius(2 * parseFloat(val)))
    }
  },
  __getP (shape) {
    var m = shape.doc().node.getScreenCTM().inverse()
    var p = shape.doc().node.createSVGPoint()
    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    p.x = shape.rbox().x - scrollLeft
    p.y = shape.rbox().y - scrollTop
    return p.matrixTransform(m)
  },
  __transformPoint (x, y, m) {
    return {x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f}
  },
  __toInt (val) {
    return Math.round(val.toFixed(0))
  },
  getSvgAttrs (svg) {
    return [this.getSvgWidth(svg), this.getSvgHeight(svg), this.getSvgBackGround(svg), this.getSvgGridShow(svg), this.getSvgGridColor(svg)]
  },
  getSvgWidth (svg) {
    return new Attr('width', '宽度', svg.width, this.setSvgWidth, 'input')
  },
  setSvgWidth (svg, width) {
    svg.width = width
  },
  getSvgHeight (svg) {
    return new Attr('height', '高度', svg.height, this.setSvgHeight, 'input')
  },
  setSvgHeight (svg, height) {
    svg.height = height
  },
  getSvgBackGround (svg) {
    return new Attr('background', '背景色', svg.backgroundColor, this.setSvgBackGround, 'color')
  },
  setSvgBackGround (svg, color) {
    svg.backgroundColor = color
  },
  getSvgGridColor (svg) {
    return new Attr('gridColor', '网格颜色', svg.gridColor, this.setSvgGridColor, 'color')
  },
  setSvgGridColor (svg, color) {
    svg.color = color
  },
  getSvgGridShow (svg) {
    return new Attr('gridShow', '网格', svg.gridShow, this.setSvgHeight, '')
  },
  setSvgGridShow (svg, show) {
    svg.gridShow = show
  }
}
