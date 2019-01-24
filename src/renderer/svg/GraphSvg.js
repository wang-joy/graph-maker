import SvgEvts from '@/svg/evts/GraphSvgEvts'
import Cursor from '@/cursor/Cursor'
import Selector from '@/svg/selector/Selector'
import ShapeUtils from '@/svg/utils/shape'
import {remote} from 'electron'
import fs from 'fs'
import path from 'path'
import SVG from 'svg.js'
import shapes from '@/svg/shape/index'
import ShapeManager from '@/svg/manager/ShapeManager'
import CommandManager from '@/svg/command/CommandManager'
import AddCommand from '@/svg/command/AddCommand'
import CopyManager from '@/svg/manager/CopyManager'
import DelCommand from '@/svg/command/DelCommand'
import MoveCommand from '@/svg/command/MoveCommand'
import FilpXCommand from '@/svg/command/FilpXCommand'
import FilpYCommand from '@/svg/command/FilpYCommand'
import RotateCommand from '@/svg/command/Rotate'
import GroupCommand from '@/svg/command/Group'
import UnGroupCommand from '@/svg/command/UnGroup'
import ArrangeCommand from '@/svg/command/Arrange'
// import ShapeEvts from '@/svg/evts/ShapeEvts'
export default class GraphSvg {
  selector = new Selector()
  shapeManager = new ShapeManager(this)
  width = 12000
  height = 12000
  gridShow = true
  gridColor = '#CCCCCC'
  backgroundColor = '#FFFFFF'
  isNew = true
  isChange = true
  cursor = new Cursor(0, 0)
  label = 'New File'
  filePath
  commandManager = new CommandManager()
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
  addShapes (shapes) {
    if (shapes && shapes.length > 0) {
      let addCommand = new AddCommand(this, shapes)
      this.commandManager.execute(addCommand)
    }
  }
  removeShapes (shapes) {
    let removeShapes = shapes || this.selector.shapes
    if (removeShapes.length > 0) {
      let cmd = new DelCommand(this, removeShapes)
      this.commandManager.execute(cmd)
    }
  }
  getChildren () {
    return this.shapeManager.shapes
  }
  children () {
    return this.shapeManager.shapes
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
      let children = this.shapeManager.shapes
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
        this.filePath = fileName
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
    let backgroundColor = child.style['background'] || child.style['background-color'] || '#FFFFFF'
    this.backgroundColor = this.__colorRGB2Hex(backgroundColor).toUpperCase()
    this.label = path.basename(this.filePath, path.extname(this.filePath))
    let children = child.children
    Array.prototype.forEach.call(children, e => {
      let type = ShapeUtils.getElementType(e)
      let attr = ShapeUtils.getElementAttrs(e)
      let shape = new SVG.Element()
      if (type === 'image') {
        shape = SVG.image(attr['href'] || attr['xlink:href'])
        this.shapeManager.add(shape)
        shape.attr(attr).load(attr['href'] || attr['xlink:href'])
        ShapeUtils.loadImage(shape, this.filePath)
      } else {
        shape = shapes[type]()
        shape.attr(attr)
        // this.draw.add(shape)
        this.shapeManager.add(shape)
      }
      ShapeUtils.load(shape)
      shape.fire('drawstop')
    })
  }
  getShapeById (id) {
    return this.shapeManager.getShapeById(id)
  }
  redo () {
    this.commandManager.redo()
  }
  undo () {
    this.commandManager.undo()
  }
  copy () {
    let shapes = this.selector.getOperShapes()
    CopyManager.copy(shapes)
  }
  cute () {
    let shapes = this.selector.getOperShapes()
    CopyManager.cute(shapes, this)
  }
  paste () {
    CopyManager.paste(this)
  }
  selectAll () {
    let shapes = this.shapeManager.shapes
    if (shapes.length === 1) {
      this.selector.select(shapes[0])
    } else if (shapes.length > 1) {
      this.selector.multiSelect(shapes)
    }
  }
  invertSelect () {
    let shapes = this.shapeManager.shapes.filter(el => !this.selector.getOperShapes().find(item => item === el))
    if (shapes.length === 0) {
      this.selector.clear()
    } else if (shapes.length === 1) {
      this.selector.select(shapes[0])
    } else if (shapes.length > 1) {
      this.selector.multiSelect(shapes)
    }
  }
  alignShapes (type) {
    const shapes = this.selector.getOperShapes()
    if (shapes.length > 1) {
      const startPoints = shapes.map(element => { return {x: ShapeUtils.getBBox(element).x, y: ShapeUtils.getBBox(element).y} })
      ShapeUtils.align(shapes, type)
      const endPoints = shapes.map(element => { return {x: ShapeUtils.getBBox(element).x, y: ShapeUtils.getBBox(element).y} })
      startPoints.some((item, i) => {
        if (item.x - endPoints[i].x >= 1 || item.y - endPoints[i].y >= 1) {
          let command = new MoveCommand(shapes, startPoints, endPoints)
          this.commandManager.execute(command)
          return true
        }
      })
    }
  }
  getSelectedShapes () {
    return this.selector.shapes
  }
  flipX () {
    if (this.selector.getOperShapes().length > 0) {
      const cmd = new FilpXCommand(this.selector.getOperShapes())
      this.commandManager.execute(cmd)
    }
  }
  flipY () {
    if (this.selector.getOperShapes().length > 0) {
      const cmd = new FilpYCommand(this.selector.getOperShapes())
      this.commandManager.execute(cmd)
    }
  }
  rotate (rotation, relative) {
    if (this.selector.getOperShapes().length > 0) {
      const cmd = new RotateCommand(this.selector.getOperShapes(), rotation, relative)
      this.commandManager.execute(cmd)
    }
  }
  group () {
    if (this.selector.getOperShapes().length > 1) {
      const cmd = new GroupCommand(this.selector.getOperShapes(), this)
      this.commandManager.execute(cmd)
    }
  }
  ungroup () {
    if (this.selector.getOperShapes().length === 1 && ShapeUtils.getShapeType(this.selector.getOperShapes()[0]) === 'group') {
      const cmd = new UnGroupCommand(this.selector.getOperShapes()[0], this)
      this.commandManager.execute(cmd)
    }
  }
  arrange (type) {
    if (this.selector.getOperShapes().length === 1) {
      let shape = this.selector.getOperShapes()[0]
      let shapes = this.getChildren()
      let initIndex = shapes.indexOf(shape)
      let index = initIndex
      switch (type) {
        case 'top':
          index = shapes.length - 1
          break
        case 'bottom':
          index = 0
          break
        case 'prev':
          if (index < shapes.length - 1) {
            index = initIndex + 1
          }
          break
        case 'next':
          if (initIndex > 0) {
            index = initIndex - 1
          }
          break
      }
      if (index !== initIndex) {
        const cmd = new ArrangeCommand(shape, index, this.shapeManager)
        this.commandManager.execute(cmd)
      }
    }
  }
  selectShape (shape) {
    this.selector.select(shape)
  }
  __colorRGB2Hex (color) {
    var rgb = color.split(',')
    var r = parseInt(rgb[0].split('(')[1])
    var g = parseInt(rgb[1])
    var b = parseInt(rgb[2].split(')')[0])
    var hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    return hex
  }
}
