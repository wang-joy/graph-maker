import ShapeEvts from '@/svg/evts/ShapeEvts'
import SVG from 'svg.js'
import path from 'path'
import fs from 'fs'
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
  }
}
