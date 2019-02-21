import SVG from 'svg.js'
import ArcAttr from './attr/arc'
import ShapeUtils from '@/svg/utils/shape'
SVG.Arc = SVG.invent({
  // Define the type of element that should be created
  create: 'path',
  // Specify from which existing class this shape inherits
  inherit: SVG.Path,
  // Add custom methods to invented shape
  extend: {
    getPoints: function () {
      var arr = this.array().valueOf()
      // 起始点
      var startPoint = {x: arr[0][1], y: arr[0][2]}
      // 半径
      // var r = arr[1][1]
      // 终点
      var endPoint = {x: arr[1][6], y: arr[1][7]}
      // 圆心
      var centerPoint = this.centerPoint()
      return [[centerPoint.x, centerPoint.y], [startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]
    },
    getCenterPoint: function () {
      const arr = this.array().valueOf()
      // 起始点
      const startPoint = {x: arr[0][1], y: arr[0][2]}
      // 半径
      let r = arr[1][1]
      // 终点
      let endPoint = {x: arr[1][6], y: arr[1][7]}
      let largeArcFlag = arr[1][4]
      let c1 = (Math.pow(endPoint.x, 2) - Math.pow(startPoint.x, 2) + Math.pow(endPoint.y, 2) - Math.pow(startPoint.y, 2)) / 2 / (endPoint.x - startPoint.x)
      let c2 = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)
      let a = 1 + Math.pow(c2, 2)
      let b = 2 * (startPoint.x - c1) * c2 - 2 * startPoint.y
      let c = Math.pow(startPoint.x - c1, 2) + Math.pow(startPoint.y, 2) - Math.pow(r, 2)
      let y = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a
      if (largeArcFlag === 0) {
        y = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a
      }
      let x = c1 - c2 * y
      return {x: x, y: y}
    },
    centerPoint: function () {
      const arr = this.array().valueOf() // [['M', x1, y1], ['A', rx, ry, phi, fA, fS, x2, y2]]
      const phi = arr[1][3]
      const startPoint = {x: arr[0][1], y: arr[0][2]}
      const endPoint = {x: arr[1][6], y: arr[1][7]}
      let rx = arr[1][1]
      let ry = arr[1][2]
      const fA = arr[1][3]
      const fS = arr[1][4]
      let params = ShapeUtils.arcToCenterParam(startPoint.x, startPoint.y, rx, ry, phi, fA, fS, endPoint.x, endPoint.y)
      return {x: params.cx, y: params.cy}
    },
    setCenterPoint (point) {
      const arr = this.array().valueOf()
      const r = Math.sqrt(Math.pow(point.x - arr[0][1], 2) + Math.pow(point.y - arr[0][2], 2))
      arr[1][1] = arr[1][2] = r
      let startPoint = {x: arr[0][1], y: arr[0][2]}
      let endPoint = {x: arr[1][6], y: arr[1][7]}
      let points = [[point.x, point.y], [startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]
      let deg = ShapeUtils.getDeg(points)
      while (deg < 0) {
        deg += 360
      }
      if (deg < 180) {
        arr[1][4] = 0
      } else {
        arr[1][4] = 1
      }
      this.plot(arr)
    },
    setStartPoint (point) {
      const arr = this.array().valueOf()
      arr[0][1] = point.x
      arr[0][2] = point.y
      this.plot(arr)
      let centerPoint = this.centerPoint()
      let endPoint = {x: arr[1][6], y: arr[1][7]}
      let points = [[centerPoint.x, centerPoint.y], [point.x, point.y], [endPoint.x, endPoint.y]]
      let deg = ShapeUtils.getDeg(points)
      let r = Math.sqrt(Math.pow(endPoint.x - centerPoint.x, 2) + Math.pow(endPoint.y - centerPoint.y, 2))
      arr[1][1] = arr[1][2] = r
      while (deg < 0) {
        deg += 360
      }
      if (deg < 180) {
        arr[1][4] = 0
      } else {
        arr[1][4] = 1
      }
      this.plot(arr)
    },
    setEndPoint (point) {
      const arr = this.array().valueOf()
      arr[1][6] = point.x
      arr[1][7] = point.y
      this.plot(arr)
      let centerPoint = this.centerPoint()
      let startPoint = {x: arr[0][1], y: arr[0][2]}
      let endPoint = {x: arr[1][6], y: arr[1][7]}
      let points = [[centerPoint.x, centerPoint.y], [startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]
      let deg = ShapeUtils.getDeg(points)
      let r = Math.sqrt(Math.pow(endPoint.x - centerPoint.x, 2) + Math.pow(endPoint.y - centerPoint.y, 2))
      arr[1][1] = arr[1][2] = r
      while (deg < 0) {
        deg += 360
      }
      if (deg < 180) {
        arr[1][4] = 0
      } else {
        arr[1][4] = 1
      }
      this.plot(arr)
    }
  },
  // Add method to parent elements
  construct: {
    arc: function () {
      return this.put(new SVG.Arc())
    }

  }
})
var func = function (svg) {
  var arc = new SVG.Arc()
  arc.attr(ArcAttr)
  arc.remember('_svg', svg)
  return arc
}
export default func
