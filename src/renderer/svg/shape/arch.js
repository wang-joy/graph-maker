import SVG from 'svg.js'
import ArchAttr from './attr/arch'
SVG.Arch = SVG.invent({
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
    centerPoint: function () {
      const arr = this.array().valueOf() // [['M', x1, y1], ['A', rx, ry, phi, fA, fS, x2, y2]]
      const phi = arr[1][3]
      const startPoint = {x: arr[0][1], y: arr[0][2]}
      const endPoint = {x: arr[1][6], y: arr[1][7]}
      let rx = arr[1][1]
      let ry = arr[1][2]
      const fA = arr[1][3]
      const fS = arr[1][4]
      const sinPhi = Math.sign(phi)
      const cosPhi = Math.cos(phi)
      const hdX = (startPoint.x - endPoint.x) / 2.0
      const hdY = (startPoint.y - endPoint.y) / 2.0
      const hsX = (startPoint.x + endPoint.x) / 2.0
      const hsY = (startPoint.y + endPoint.y) / 2.0
      const x1 = cosPhi * hdX + sinPhi * hdY
      const y1 = cosPhi * hdY - sinPhi * hdX
      const lambda = (x1 * x1) / (rx * rx) + (y1 * y1) / (ry * ry)
      if (lambda > 1) {
        rx = rx * Math.sqrt(lambda)
        ry = ry * Math.sqrt(lambda)
      }
      let rxry = rx * ry
      let rxy1 = rx * y1
      let ryx1 = ry * x1
      let sumSq = rxy1 * rxy1 + ryx1 * ryx1
      if (!sumSq) {
        throw Error('start point can not be same as end point')
      }
      let coe = Math.sqrt(Math.abs((rxry * rxry - sumSq) / sumSq))
      if (fA !== fS) {
        coe = -coe
      }
      let cx = coe * rxy1 / ry
      let cy = -coe * ryx1 / rx
      return {x: cosPhi * cx - sinPhi * cy + hsX, y: sinPhi * cx + cosPhi * cy + hsY}
    }
  },
  // Add method to parent elements
  construct: {
    arch: function () {
      return this.put(new SVG.Arch())
    }

  }
})
var func = function (svg) {
  var arch = new SVG.Arch()
  arch.attr(ArchAttr)
  arch.remember('_svg', svg)
  return arch
}
export default func
