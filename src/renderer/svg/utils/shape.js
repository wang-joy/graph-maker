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
    return shape.bbox()
  }
}
