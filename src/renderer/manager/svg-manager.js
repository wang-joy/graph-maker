import Svg from '@/svg/svg.js'
class SvgManager {
  constructor () {
    this.svgs = []
  }
  // 创建Svg
  createSvg (id, fileName, width, height) {
    var svg = new Svg(id, width, height, fileName)
    this.svgs.push(svg)
    this.activateSvg = svg
  }
  // 设置活动svg
  setActiveSvg (svg) {
    this.activateSvg = svg
  }
  // 根据id获取Svg
  getSvgById (id) {
    return this.svgs.find(svg => svg.id === id)
  }
  // 根据id设置活动svg
  setActiveSvgById (id) {
    var svg = this.getSvgById(id)
    if (svg) {
      this.setActiveSvg(svg)
    }
  }
  // 删除根据Id
  deleteSvgById (id) {
    this.svgs = this.svgs.filter(svg => svg.id !== id)
  }
}
export default new SvgManager()
