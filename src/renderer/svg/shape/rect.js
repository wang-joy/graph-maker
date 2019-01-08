import {Rect} from 'svg.js'
import RectAttr from './attr/rect'
var func = function (svg) {
  var rect = new Rect()
  rect.attr(RectAttr)
  rect.remember('_svg', svg)
  return rect
}
export default func
