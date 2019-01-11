import { Image } from 'svg.js'
import ImageAttr from './attr/image'
import {remote} from 'electron'
import path from 'path'
import fs from 'fs'

var imgDir = path.join(__dirname, '../../../../imgs/')
if (process.env.NODE_ENV === 'production') {
  imgDir = path.join(process.resourcesPath, '../imgs/')
}
try {
  fs.accessSync(imgDir, fs.constants.F_OK)
} catch (error) {
  fs.mkdirSync(imgDir)
}
function _createImage (filename, svg) {
  var baseName = path.win32.basename(filename)
  var filePath = imgDir + path.sep + baseName
  fs.copyFileSync(filename, filePath)
  var img = new Image()
  img.attr(ImageAttr)
  img.load(filePath)
  img.remember('_svg', svg)
  return img
}
var func = function (svg) {
  var opts = {
    title: '图片',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ],
    properties: [ 'openFile' ]
  }
  var filenames = remote.dialog.showOpenDialog(opts)
  if (filenames && filenames.length > 0) {
    return _createImage(filenames[0], svg)
  }
  return null
}
export default func
