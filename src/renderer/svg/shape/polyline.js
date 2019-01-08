import {Polyline} from 'svg.js'
import PolylineAttr from './attr/polyline'
var func = function (svg) {
  var polyline = new Polyline()
  polyline.attr(PolylineAttr)
  polyline.remember('_svg', svg)
  return polyline
}
export default func
