import {Text} from 'svg.js'
import TextAttr from './attr/text'
var func = function () {
  var text = new Text()
  text.attr(TextAttr)
  return text
}
export default func
