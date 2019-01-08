import SvgEvts from '@/svg/evts/GraphSvgEvts'
import Cursor from '@/cursor/Cursor'
import Selector from '@/svg/selector/Selector'
export default class GraphSvg {
  constructor (id) {
    this.id = id
    this.children = []
    this.selector = new Selector()
    this.width = 12000
    this.height = 12000
    this.gridShow = true
    this.gridColor = '#CCCCCC'
    this.backgroundColor = '#FFFFFF'
    this.cursor = new Cursor(0, 0)
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
}
