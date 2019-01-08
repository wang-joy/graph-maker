import {Line} from 'svg.js'
import LineAttr from './attr/line'
var func = function (svg) {
  var line = new Line()
  line.attr(LineAttr)
  line.remember('_svg', svg)
  return line
}
export default func
