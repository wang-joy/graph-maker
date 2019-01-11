import SvgEvts from '@/svg/evts/GraphSvgEvts'
import Cursor from '@/cursor/Cursor'
import Selector from '@/svg/selector/Selector'
import ShapeUtils from '@/svg/utils/shape'
import {remote} from 'electron'
import fs from 'fs'
import path from 'path'
import SVG from 'svg.js'
import shapes from '@/svg/shape/index'
// import ShapeEvts from '@/svg/evts/ShapeEvts'
export default class GraphSvg {
  children = []
  selector = new Selector()
  width = 12000
  height = 12000
  gridShow = true
  gridColor = '#CCCCCC'
  backgroundColor = '#FFFFFF'
  isNew = true
  isChange = false
  cursor = new Cursor(0, 0)
  label = 'New File'
  filePath
  constructor (id, filePath = null) {
    this.id = id
    this.filePath = filePath
  }
  setDraw (draw) {
    draw.remember('_svg', this)
    draw.remember('_mode', 'select')
    this.draw = draw
    for (const key in SvgEvts) {
      if (SvgEvts.hasOwnProperty(key)) {
        const evt = SvgEvts[key]
        draw.on(key, evt)
      }
    }
    if (this.filePath) {
      this.open(this.filePath)
    }
  }
  on (evtName, evt) {
    this.draw.on(evtName, evt)
  }
  addShape (shape) {
    this.children.push(shape)
  }
  removeShape (shape) {
    this.children = this.children.filter(el => el !== shape)
  }
  getChildren () {
    return this.children
  }
  saveAs () {
    let opts = {
      title: '保存',
      filters: [ { name: 'svg', extensions: ['svg'] } ]
    }
    let fileName = remote.dialog.showSaveDialog(opts)
    this.__writeFile(fileName)
  }
  open (filePath) {
    this.filePath = filePath
    this.isNew = false
    this.__readFile(filePath)
  }
  save () {
    if (this.isNew) {
      this.saveAs()
    } else if (this.isChange) {
      let filepath = this.filePath
      this.__writeFile(filepath)
      // this.isChange = false
    }
  }
  __writeFile (fileName) {
    if (fileName) {
      let children = this.children
      let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:${this.backgroundColor}" viewBox="0.000000 0.000000 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">\n`
      children.forEach(el => {
        svgContent += `\t${el.svg()}\n`
        if (ShapeUtils.getShapeType(el) === 'image') {
          this.__writeImg(el, fileName)
        }
      })
      svgContent += '</svg>'
      try {
        fs.writeFileSync(fileName, svgContent, 'utf-8')
        this.path = fileName
        this.label = path.basename(fileName, path.extname(fileName))
        this.isNew = false
      } catch (error) {
        throw error
      }
    }
  }
  __writeImg (shape, filePath) {
    if (filePath) {
      let imgDir = path.dirname(filePath) + path.sep + 'imgs' + path.sep
      try {
        fs.accessSync(imgDir, fs.constants.F_OK)
      } catch (error) {
        fs.mkdirSync(imgDir)
      }
      let src = shape.attr('href') || shape.attr('xlink:href')
      fs.copyFileSync(src, imgDir + path.basename(src))
    }
  }
  __readFile () {
    let svgContent = fs.readFileSync(this.filePath).toString()
    let container = document.getElementById('graph-svg')
    container.innerHTML = svgContent
    let child = container.children[0]
    let attrs = ShapeUtils.getElementAttrs(child)
    let viewBox = new SVG.ViewBox(attrs.viewBox)
    this.width = attrs.width || viewBox.width
    this.height = attrs.height || viewBox.height
    this.backgroundColor = child.style['background'] || child.style['background-color'] || '#FFFFFF'
    this.label = path.basename(this.filePath, path.extname(this.filePath))
    let children = child.children
    Array.prototype.forEach.call(children, e => {
      let type = ShapeUtils.getElementType(e)
      let attr = ShapeUtils.getElementAttrs(e)
      let shape = new SVG.Element()
      if (type === 'image') {
        shape = this.draw.image(attr['href'] || attr['xlink:href'])
        shape.attr(attr)
        ShapeUtils.loadImage(shape, this.filePath)
      } else {
        shape = shapes[type]()
        shape.attr(attr)
        this.draw.add(shape)
      }
      ShapeUtils.load(shape)
      shape.fire('drawstop')
      this.children.push(shape)
    })
  }
  getShapeById (id) {
    return this.children.find(el => el.attr('id') === id)
  }
}
