import SVG from 'svg.js'
import CurveAttr from './attr/curve'
SVG.Curve = SVG.invent({
  // Define the type of element that should be created
  create: 'path',
  // Specify from which existing class this shape inherits
  inherit: SVG.Path,
  // Add custom methods to invented shape
  extend: {
    getPoints: function () {
      var arr = this.array().valueOf()
      var points = []
      arr.forEach(function (item) {
        if (item[0] === 'M') {
          points.push([item[1], item[2]])
        } else if (item[0] === 'C') {
          points.splice(points.length + 1, 0, [item[1], item[2]], [item[3], item[4]], [item[5], item[6]])
        }
      })
      return points
    },
    plotPoints: function (points) {
      if (points && points.length > 0) {
        var arr = [['M', points[0][0], points[0][1]]]
        for (let i = 1; i < points.length; i = i + 3) {
          var c = ['C', points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], points[i + 2][0], points[i + 2][1]]
          arr.push(c)
        }
        this.plot(arr)
      }
      return this
    }
  },
  // Add method to parent elements
  construct: {
    curve: function () {
      return this.put(new SVG.Curve())
    }

  }
})
var func = function (svg) {
  var curve = new SVG.Curve()
  curve.attr(CurveAttr)
  curve.remember('_svg', svg)
  return curve
}
export default func
