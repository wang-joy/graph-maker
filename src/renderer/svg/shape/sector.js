import SVG from 'svg.js'
import SectorAttr from './attr/sector'
SVG.Sector = SVG.invent({
  // Define the type of element that should be created
  create: 'path',
  // Specify from which existing class this shape inherits
  inherit: SVG.Path,
  // Add custom methods to invented shape
  extend: {
    getPoints: function () {
      var arr = this.array().valueOf()
      // 起始点
      var startPoint = {x: arr[1][1], y: arr[1][2]}
      // 半径
      // var r = arr[1][1]
      // 终点
      var endPoint = {x: arr[2][6], y: arr[2][7]}
      // 圆心
      var centerPoint = {x: arr[0][1], y: arr[0][2]}
      return [[centerPoint.x, centerPoint.y], [startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]
    }
  },
  // Add method to parent elements
  construct: {
    sector: function () {
      return this.put(new SVG.Sector())
    }

  }
})
var func = function (svg) {
  var sector = new SVG.Sector()
  sector.attr(SectorAttr)
  sector.remember('_svg', svg)
  return sector
}
export default func
