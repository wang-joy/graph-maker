const files = require.context('.', false, /\.js$/)
const shapes = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  var shapeKey = key.replace(/(\.\/|\.js)/g, '')
  shapes[shapeKey] = files(key).default
})

export default shapes
