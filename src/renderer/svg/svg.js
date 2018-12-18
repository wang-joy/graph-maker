import SVG from 'svg.js'
export default class Svg {
  constructor (id, width, height, fileName) {
    this.id = id
    this.fileName = fileName
    this.draw = SVG(id).size(width, height)
    this.children = []
  }
}
