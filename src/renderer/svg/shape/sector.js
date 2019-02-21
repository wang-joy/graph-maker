import SVG from 'svg.js'
import SectorAttr from './attr/sector'
import ShapeUtils from '@/svg/utils/shape'
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
    },
    centerPoint: function () {
      const arr = this.array().valueOf() // [['M', x1, y1], ['A', rx, ry, phi, fA, fS, x2, y2]]
      const phi = arr[2][3]
      const startPoint = {x: arr[1][1], y: arr[1][2]}
      const endPoint = {x: arr[2][6], y: arr[2][7]}
      let rx = arr[2][1]
      let ry = arr[2][2]
      const fA = arr[2][3]
      const fS = arr[2][4]
      let params = ShapeUtils.arcToCenterParam(startPoint.x, startPoint.y, rx, ry, phi, fA, fS, endPoint.x, endPoint.y)
      return {x: params.cx, y: params.cy}
    },
    setCenterPoint (point) {
      const arr = this.array().valueOf()
      const r = Math.sqrt(Math.pow(point.x - arr[1][1], 2) + Math.pow(point.y - arr[1][2], 2))
      arr[2][1] = arr[2][2] = r
      arr[0][1] = point.x
      arr[0][2] = point.y
      let startPoint = {x: arr[1][1], y: arr[1][2]}
      let endPoint = {x: arr[2][6], y: arr[2][7]}
      let points = [[point.x, point.y], [startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]
      let deg = ShapeUtils.getDeg(points)
      while (deg < 0) {
        deg += 360
      }
      if (deg < 180) {
        arr[2][4] = 0
      } else {
        arr[2][4] = 1
      }
      this.plot(arr)
    },
    setStartPoint (point) {
      const arr = this.array().valueOf()
      arr[1][1] = point.x
      arr[1][2] = point.y
      this.plot(arr)
      let centerPoint = this.centerPoint()
      arr[0][1] = centerPoint.x
      arr[0][2] = centerPoint.y
      let endPoint = {x: arr[2][6], y: arr[2][7]}
      let points = [[centerPoint.x, centerPoint.y], [point.x, point.y], [endPoint.x, endPoint.y]]
      let deg = ShapeUtils.getDeg(points)
      let r = Math.sqrt(Math.pow(endPoint.x - centerPoint.x, 2) + Math.pow(endPoint.y - centerPoint.y, 2))
      arr[2][1] = arr[2][2] = r
      while (deg < 0) {
        deg += 360
      }
      if (deg < 180) {
        arr[2][4] = 0
      } else {
        arr[2][4] = 1
      }
      this.plot(arr)
    },
    setEndPoint (point) {
      const arr = this.array().valueOf()
      arr[2][6] = point.x
      arr[2][7] = point.y
      this.plot(arr)
      let centerPoint = this.centerPoint()
      arr[0][1] = centerPoint.x
      arr[0][2] = centerPoint.y
      let startPoint = {x: arr[1][1], y: arr[1][2]}
      let endPoint = {x: arr[2][6], y: arr[2][7]}
      let points = [[centerPoint.x, centerPoint.y], [startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]
      let deg = ShapeUtils.getDeg(points)
      let r = Math.sqrt(Math.pow(endPoint.x - centerPoint.x, 2) + Math.pow(endPoint.y - centerPoint.y, 2))
      arr[2][1] = arr[2][2] = r
      while (deg < 0) {
        deg += 360
      }
      if (deg < 180) {
        arr[2][4] = 0
      } else {
        arr[2][4] = 1
      }
      this.plot(arr)
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
