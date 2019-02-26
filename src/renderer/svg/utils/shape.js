import ShapeEvts from '@/svg/evts/ShapeEvts'
import SVG from 'svg.js'
import path from 'path'
import fs from 'fs'
import '@/svg/plugins/svg.math.js'
export default {
  getShapeType (shape) {
    return shape.attr('type') || shape.type
  },
  isCallDrawStop (shape) {
    return shape && (this.getShapeType(shape) === 'polyline')
  },
  deepSelect (shape) {
    let type = this.getShapeType(shape)
    return (!!shape) && (type === 'polyline' || type === 'polygon' || type === 'line' || type === 'curve' || type === 'arc' || type === 'sector' || type === 'arch')
  },
  getSvg (shape) {
    return shape.doc().remember('_svg')
  },
  init (shape, svg) {
    for (const key in ShapeEvts) {
      if (ShapeEvts.hasOwnProperty(key)) {
        const evt = ShapeEvts[key]
        shape.off(key)
        shape.on(key, evt)
      }
    }
  },
  getNextId (type, svg) {
    let n = 0
    let id = type + n
    while (svg.getShapeById(id)) {
      id = type + ++n
    }
    return id
  },
  setShapeId (shape, svg) {
    let type = shape.attr('type') || shape.type
    shape.attr('id', this.getNextId(type, svg))
  },
  getElementType (el) {
    let attrs = this.getElementAttrs(el)
    let nodeName = el.nodeName
    if (nodeName === 'path') {
      let d = attrs['d']
      if (d.indexOf('C')) {
        return 'curve'
      } else if (d.indexOf('A')) {
        return ''
      }
    }
    return attrs['type'] || nodeName
  },
  getElementAttrs (el) {
    let attrs = el.attributes
    let a = {}
    for (let i = 0, len = attrs.length - 1; i <= len; i++) {
      a[attrs[i].nodeName] = SVG.regex.isNumber.test(attrs[i].nodeValue) ? parseFloat(attrs[i].nodeValue) : attrs[i].nodeValue
    }
    return a
  },
  load (shape) {
    for (const key in ShapeEvts) {
      if (ShapeEvts.hasOwnProperty(key)) {
        const evt = ShapeEvts[key]
        shape.off(key)
        shape.on(key, evt)
      }
    }
  },
  loadImage (img, filePath) {
    let imgDir = path.join(__dirname, '../../../../imgs/')
    if (process.env.NODE_ENV === 'production') {
      imgDir = path.join(process.resourcesPath, '../imgs/')
    }
    try {
      fs.accessSync(imgDir, fs.constants.F_OK)
    } catch (error) {
      fs.mkdirSync(imgDir)
    }
    let href = img.attr('href') || img.attr('xlink:href')
    let fileDir = path.dirname(filePath)
    let imgName = path.basename(href)
    let src = fileDir + path.sep + href
    let desc = imgDir + path.sep + imgName
    fs.copyFileSync(src, desc)
  },
  clone (shape) {
  },
  getBBox (shape) {
    var box = shape.bbox()

    if (shape instanceof SVG.Nested) box = shape.rbox()

    if (shape instanceof SVG.G || shape instanceof SVG.Use || shape instanceof SVG.Nested) {
      box.x = shape.x()
      box.y = shape.y()
    }
    return box
  },
  align (shapes, type) {
    var minAndMaxPoint = this.getMinAndMaxPoint(shapes)
    shapes.forEach(shape => {
      var p = this.getMovePoint(shape, type, minAndMaxPoint)
      if (this.getShapeType(shape) === 'g') {
        shape.transform({x: p.gx, y: p.gy}, true)
      } else {
        shape.move(p.x, p.y)
      }
    })
  },
  getMinAndMaxPoint (shapes) {
    var minX = Infinity
    var minY = Infinity
    var maxX = -Infinity
    var maxY = -Infinity
    shapes.forEach(shape => {
      var box = shape.rbox()
      var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      var p1 = {x: box.x - scrollLeft, y: box.y - scrollTop}
      var p2 = {x: box.x2 - scrollLeft, y: box.y2 - scrollTop}
      if (minX > p1.x) {
        minX = p1.x
      }
      if (maxX < p2.x) {
        maxX = p2.x
      }
      if (minY > p1.y) {
        minY = p1.y
      }
      if (maxY < p2.y) {
        maxY = p2.y
      }
    })
    return {minX: minX, minY: minY, maxX: maxX, maxY: maxY}
  },
  getMovePoint (shape, type, minAndMaxPoint) {
    var bbox = this.getBBox(shape)
    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    var rbox = shape.rbox()
    var m = shape.node.getScreenCTM().inverse()
    switch (type) {
      case 'top': {
        let startPoint = this.transformPoint(rbox.x - scrollLeft, rbox.y - scrollTop, m)
        let endPoint = this.transformPoint(rbox.x - scrollLeft, minAndMaxPoint.minY, m)
        return {x: bbox.x + endPoint.x - startPoint.x, y: bbox.y + endPoint.y - startPoint.y, gx: endPoint.x - startPoint.x, gy: endPoint.y - startPoint.y}
      }
      case 'left': {
        let startPoint = this.transformPoint(rbox.x - scrollLeft, rbox.y - scrollTop, m)
        let endPoint = this.transformPoint(minAndMaxPoint.minX, rbox.y - scrollTop, m)
        return {x: bbox.x + endPoint.x - startPoint.x, y: bbox.y + endPoint.y - startPoint.y, gx: endPoint.x - startPoint.x, gy: endPoint.y - startPoint.y}
      }
      case 'right': {
        let startPoint = this.transformPoint(rbox.x2 - scrollLeft, rbox.y2 - scrollTop, m)
        let endPoint = this.transformPoint(minAndMaxPoint.maxX, rbox.y2 - scrollTop, m)
        return {x: bbox.x + endPoint.x - startPoint.x, y: bbox.y + endPoint.y - startPoint.y, gx: endPoint.x - startPoint.x, gy: endPoint.y - startPoint.y}
      }
      case 'bottom': {
        let startPoint = this.transformPoint(rbox.x2 - scrollLeft, rbox.y2 - scrollTop, m)
        let endPoint = this.transformPoint(rbox.x2 - scrollLeft, minAndMaxPoint.maxY, m)
        return {x: bbox.x + endPoint.x - startPoint.x, y: bbox.y + endPoint.y - startPoint.y, gx: endPoint.x - startPoint.x, gy: endPoint.y - startPoint.y}
      }
      case 'horizontal': {
        let startPoint = this.transformPoint(rbox.cx - scrollLeft, rbox.cy - scrollTop, m)
        let endPoint = this.transformPoint(rbox.cx - scrollLeft, (minAndMaxPoint.minY + minAndMaxPoint.maxY) / 2, m)
        return {x: bbox.x + endPoint.x - startPoint.x, y: bbox.y + endPoint.y - startPoint.y, gx: endPoint.x - startPoint.x, gy: endPoint.y - startPoint.y}
      }
      case 'vertical': {
        let startPoint = this.transformPoint(rbox.cx - scrollLeft, rbox.cy - scrollTop, m)
        let endPoint = this.transformPoint((minAndMaxPoint.minX + minAndMaxPoint.maxX) / 2, rbox.cy - scrollTop, m)
        return {x: bbox.x + endPoint.x - startPoint.x, y: bbox.y + endPoint.y - startPoint.y, gx: endPoint.x - startPoint.x, gy: endPoint.y - startPoint.y}
      }
    }
  },
  transformPoint (x, y, m) {
    return {x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f}
  },
  flipX (shapes) {
    shapes.forEach(item => {
      item.transform({scaleX: -1}, true)
    })
  },
  flipY (shapes) {
    shapes.forEach(item => {
      item.transform({scaleX: -1}, true)
    })
  },
  isRboxIntersect (shape1, shape2) {
    var rbox1 = shape1.rbox()
    var rbox2 = shape2.rbox()
    if (rbox1.x2 < rbox2.x || rbox2.x2 < rbox1.x || rbox1.y2 < rbox2.y || rbox2.y2 < rbox1.y) {
      return false
    } else {
      return true
    }
  },
  arcToCenterParam (x1, y1, rx, ry, phi, fA, fS, x2, y2) {
    rx = Math.abs(rx)
    ry = Math.abs(ry)
    if (rx === 0 || ry === 0) {
      throw Error('rx and ry can note 0')
    }
    let sinPhi = Math.sin(phi)
    let cosPhi = Math.cos(phi)
    let hdX = (x1 - x2) / 2.0
    let hdY = (y1 - y2) / 2.0
    let hsX = (x1 + x2) / 2.0
    let hsY = (y1 + y2) / 2.0

    let x11 = cosPhi * hdX + sinPhi * hdY
    let y11 = cosPhi * hdY - sinPhi * hdX

    let lambda = Math.pow(x11, 2) / Math.pow(rx, 2) + Math.pow(y11, 2) / Math.pow(ry, 2)

    if (lambda > 1) {
      rx = rx * Math.sqrt(lambda)
      ry = ry * Math.sqrt(lambda)
    }

    let rxry = rx * ry
    let rxy11 = rx * y11
    let ryx11 = ry * x11
    let sum = rxy11 * rxy11 + ryx11 * ryx11
    if (!sum) {
      throw Error('start point can not be same as end point')
    }
    var coe = Math.sqrt(Math.abs((rxry * rxry - sum) / sum))
    if (fA !== fS) { coe = -coe }
    let tempCx = coe * rxy11 / ry
    let tempCy = -coe * ryx11 / rx
    let cx = cosPhi * tempCx - sinPhi * tempCy + hsX
    let cy = sinPhi * tempCx + cosPhi * tempCy + hsY
    let xcr1 = (x11 - tempCx) / rx
    let xcr2 = (x11 + tempCx) / rx
    let ycr1 = (y11 - tempCy) / ry
    let ycr2 = (y11 + tempCy) / ry
    let startAngle = this.radian(1, 0, xcr1, ycr1)
    let deltaAngle = this.radian(xcr1, ycr1, -xcr2, -ycr2)
    const PIX2 = Math.PI * 2
    while (deltaAngle > PIX2) {
      deltaAngle -= PIX2
    }
    while (deltaAngle < 0.0) {
      deltaAngle += PIX2
    }
    if (fS === 0) { deltaAngle -= PIX2 }
    let endAngle = startAngle + deltaAngle
    while (endAngle > PIX2) { endAngle -= PIX2 }
    while (endAngle < 0.0) { endAngle += PIX2 }
    return {
      cx: cx,
      cy: cy,
      startAngle: startAngle,
      endAngle: endAngle,
      deltaAngle: deltaAngle,
      clockwise: fs === 1
    }
  },
  radian (ux, uy, vx, vy) {
    let dot = ux * vx + uy * vy
    let mod = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy))
    let rad = Math.acos(dot / mod)
    if (ux * vy - uy * vx < 0.0) {
      rad = -rad
    }
    return rad
  },
  getDeg (points) {
    let p1 = new SVG.math.Point(points[1][0], points[1][1])
    let p2 = new SVG.math.Point(points[2][0], points[2][1])
    let p3 = new SVG.math.Point(points[0][0], points[0][1])
    let angle = SVG.math.angle(p3, p2)
    let deg1 = SVG.math.deg(angle)
    let deg2 = SVG.math.deg(SVG.math.angle(p3, p1))
    let deg = deg1 - deg2
    return deg
  },
  getDeltaAngle (start, end, center, r) {
    let tempX = (start.x - end.x) / 2
    let tempY = (start.y - end.y) / 2
    let tempCx = center.x - (start.x + end.x) / 2
    let tempCy = center.y - (start.y + end.y) / 2
    let xcr1 = (tempX - tempCx) / r
    let xcr2 = (tempX + tempCx) / r
    let ycr1 = (tempY - tempCy) / r
    let ycr2 = (tempY + tempCy) / r
    return this.radian(xcr1, ycr1, -xcr2, -ycr2)
  },
  deepClone (shape, parent = null) {
    let result = {}
    let keys = Object.keys(shape)
    let key = null
    let tmp = null
    let _parent = null
    while (_parent) {
      if (_parent.originParent === shape) {
        return _parent.currentParent
      }
      _parent = _parent.parent
    }
    for (let i = 0; i < keys.length; i++) {
      key = keys[i]
      tmp = shape[key]
      if (tmp && typeof tmp === 'object') {
        result[key] = this.deepClone(tmp, {
          // 递归执行深拷贝，将同级的待拷贝对象与新对象传递给parent，方便追溯循环引用
          originParent: shape,
          currentParent: result,
          parent: parent
        })
      } else {
        result[key] = tmp
      }
    }
    return result
  }
}
