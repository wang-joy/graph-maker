/*!
* svg.select.js - An extension of svg.js which allows to select elements with mouse
* @version 3.0.0
* https://github.com/svgdotjs/svg.select.js
*
* @copyright Ulrich-Matthias Schäfer
* @license MIT
*/
import SVG from 'svg.js'
function SelectHandler (el) {
  this.el = el
  el.remember('_selectHandler', this)
  this.lineSelection = {isSelected: false}
  this.pointSelection = {isSelected: false}
  this.rectSelection = {isSelected: false}

  // helper list with position settings of each type of point
  this.pointsList = {
    lt: [ 0, 0 ],
    rt: [ 'width', 0 ],
    rb: [ 'width', 'height' ],
    lb: [ 0, 'height' ],
    t: [ 'width / 2', 0 ],
    r: [ 'width', 'height / 2' ],
    b: [ 'width / 2', 'height' ],
    l: [ 0, 'height / 2' ]
  }

  // helper function to evaluate point coordinates based on settings above and an object (bbox in our case)
  this.pointCoord = function (setting, object) {
    return typeof setting !== 'string' ? setting : eval('object.' + setting)
  }

  this.pointCoords = function (point, object) {
    var settings = this.pointsList[point]

    return {
      x: this.pointCoord(settings[0], object),
      y: this.pointCoord(settings[1], object)
    }
  }
}

SelectHandler.prototype.init = function (value, options) {
  var bbox = this.el.bbox()
  this.options = {}

  // store defaults list of points in order to verify users config
  var points = this.el.selectize.defaults.points

  // Merging the defaults and the options-object together
  for (let i in this.el.selectize.defaults) {
    this.options[i] = this.el.selectize.defaults[i]
    if (options[i] !== undefined) {
      this.options[i] = options[i]
    }
  }

  // prepare & validate list of points to be added (or excluded)
  var pointsLists = ['points', 'pointsExclude']

  for (let i in pointsLists) {
    var option = this.options[pointsLists[i]]

    if (typeof option === 'string') {
      if (option.length > 0) {
        // if set as comma separated string list => convert it into an array
        option = option.split(/\s*,\s*/i)
      } else {
        option = []
      }
    } else if (typeof option === 'boolean' && pointsLists[i] === 'points') {
      // this is not needed, but let's have it for legacy support
      option = option ? points : []
    }

    this.options[pointsLists[i]] = option
  }

  // intersect correct all points options with users config (exclude unwanted points)
  // ES5 -> NO arrow functions nor Array.includes()
  this.options.points = [ points, this.options.points ].reduce(
    function (a, b) {
      return a.filter(
        function (c) {
          return b.indexOf(c) > -1
        }
      )
    }
  )

  // exclude pointsExclude, if wanted
  this.options.points = [ this.options.points, this.options.pointsExclude ].reduce(
    function (a, b) {
      return a.filter(
        function (c) {
          return b.indexOf(c) < 0
        }
      )
    }
  )

  this.parent = this.el.parent()
  this.nested = (this.nested || this.parent.group())
  var scaleX = this.el.transform('scaleX')
  var scaleY = this.el.transform('scaleY')
  var m = new SVG.Matrix(this.el).translate(bbox.x, bbox.y)
  this.nested.matrix(m.scale(1/scaleX, 1/scaleY))
  var type = this.el.attr('type') || this.el.type
  // When deepSelect is enabled and the element is a line/polyline/polygon, draw only points for moving
  if (this.options.deepSelect && ['line', 'polyline', 'polygon', 'curve', 'arc', 'sector', 'arch'].indexOf(type) !== -1) {
    this.selectPoints(value)
  } else {
    this.selectRect(value)
  }
  if (type === 'curve') {
    this.selectLines(value)
  }
  this.observe()
  this.cleanup()
}

SelectHandler.prototype.selectLines = function (value) {
  this.lineSelection.isSelected = value
  if (this.lineSelection.set) {
    return this
  }
  this.lineSelection.set = this.parent.set()
  this.drawLines()
  return this
}

SelectHandler.prototype.drawLines = function () {
  var arr = this.getPointArray()
  for (let i = 1; i < arr.length && i < 4; i = i + 2) {
    let line = this.drawLine(arr[i - 1][0], arr[i - 1][1], arr[i][0], arr[i][1])
    this.lineSelection.set.add(line)
  }
  for (let i = 4; i < arr.length; i++) {
    if (i % 3 !== 2) {
      let line = this.drawLine(arr[i - 1][0], arr[i - 1][1], arr[i][0], arr[i][1])
      this.lineSelection.set.add(line)
    }
  }
  return this
}

SelectHandler.prototype.selectPoints = function (value) {
  this.pointSelection.isSelected = value

  // When set is already there we dont have to create one
  if (this.pointSelection.set) {
    return this
  }

  // Create our set of elements
  this.pointSelection.set = this.parent.set()
  // draw the points and mark the element as selected
  this.drawPoints()

  return this
}

// create the point-array which contains the 2 points of a line or simply the points-array of polyline/polygon
SelectHandler.prototype.getPointArray = function () {
  var bbox = this.el.bbox()
  let type = this.el.attr('type')
  var array = type === 'curve' || type === 'arc' || type === 'sector' || type === 'arch' ? this.el.getPoints() : this.el.array().valueOf()
  return array.map(function (el) {
    return [el[0] - bbox.x, el[1] - bbox.y]
  })
}

// Draws a points
SelectHandler.prototype.drawPoints = function () {
  var _this = this
  var array = this.getPointArray()

  // go through the array of points
  for (var i = 0, len = array.length; i < len; ++i) {
    var curriedEvent = (function (k) {
      return function (ev) {
        ev = ev || window.event
        ev.preventDefault ? ev.preventDefault() : ev.returnValue = false
        ev.stopPropagation()

        var x = ev.pageX || ev.touches[0].pageX
        var y = ev.pageY || ev.touches[0].pageY
        _this.el.fire('point', {x: x, y: y, i: k, event: ev})
      }
    })(i)

    // add every point to the set
    // add css-classes and a touchstart-event which fires our event for moving points
    var point = this.drawPoint(array[i][0], array[i][1]).addClass(this.options.classPoints).addClass(this.options.classPoints + '_point').on('touchstart', curriedEvent).on('mousedown', curriedEvent)
    this.pointSelection.set.add(point)
  }
}

// The function to draw single point
SelectHandler.prototype.drawPoint = function (cx, cy) {
  var pointType = this.options.pointType

  switch (pointType) {
    case 'circle':
      return this.drawCircle(cx, cy)
    case 'rect':
      return this.drawRect(cx, cy)
    default:
      if (typeof pointType === 'function') {
        return pointType.call(this, cx, cy)
      }
      throw new Error('Unknown ' + pointType + ' point type!')
  }
}

SelectHandler.prototype.drawLine = function (x1, y1, x2, y2) {
  return this.nested.line(x1, y1, x2, y2).stroke({width: 1, dasharray: '7,7'})
}
// The function to draw the circle point
SelectHandler.prototype.drawCircle = function (cx, cy) {
  return this.nested.circle(this.options.pointSize).center(cx, cy)
}

// The function to draw the rect point
SelectHandler.prototype.drawRect = function (cx, cy) {
  return this.nested.rect(this.options.pointSize, this.options.pointSize).center(cx, cy)
}

// every time a point is moved, we have to update the positions of our point
SelectHandler.prototype.updatePointSelection = function () {
  var array = this.getPointArray()
  var _this = this
  this.pointSelection.set.each(function (i) {
    if (this.cx() === array[i][0] && this.cy() === array[i][1]) {
      return
    }
    this.center(array[i][0], array[i][1])
    if (_this.lineSelection.isSelected) {
      _this.updateLineSelection(i)
    }
  })
}
SelectHandler.prototype.updateLineSelection = function (i) {
  var array = this.getPointArray()
  var lines = this.lineSelection.set
  if (i === 0) {
    this.plotLine(lines.get(i), array[i], 0)
  } else if (i === 1) {
    this.plotLine(lines.get(i - 1), array[i], 1)
  } else {
    if ((i - 2) % 3 === 0) {
      this.plotLine(lines.get(i - 1 - parseInt((i - 2) / 3)), array[i], 0)
    } else if ((i - 2) % 3 === 1) {
      this.plotLine(lines.get(i - 2 - parseInt((i - 2) / 3)), array[i], 1)
      if (i !== array.length - 1) {
        this.plotLine(lines.get(i - 1 - parseInt((i - 2) / 3)), array[i], 0)
      }
    } else {
      this.plotLine(lines.get(i - 2 - parseInt((i - 2) / 3)), array[i], 1)
    }
  }
}

SelectHandler.prototype.plotLine = function (line, point, pos) {
  var points = line.array().valueOf()
  points[pos] = point
  line.plot(points)
}

SelectHandler.prototype.updateRectSelection = function () {
  var _this = this
  var bbox = this.el.bbox()
  var _this = this, bbox = this.el.bbox();
  var scaleX = this.el.transform('scaleX')
  var scaleY = this.el.transform('scaleY')
  bbox.width = Math.abs(scaleX)*bbox.width
  bbox.height = Math.abs(scaleY)*bbox.height
  this.rectSelection.set.get(0).attr({
    width: bbox.width,
    height: bbox.height
  })

  // set.get(1) is always in the upper left corner. no need to move it
  if (this.options.points.length) {
    this.options.points.map(function (point, index) {
      var coords = _this.pointCoords(point, bbox)

      _this.rectSelection.set.get(index + 1).center(coords.x, coords.y)
    })
  }

  if (this.options.rotationPoint) {
    var length = this.rectSelection.set.length()

    this.rectSelection.set.get(length - 1).center(bbox.width / 2, 20)
  }
}

SelectHandler.prototype.selectRect = function (value) {
  var _this = this
  var bbox = this.el.bbox()
  var scaleX = this.el.transform('scaleX')
  var scaleY = this.el.transform('scaleY')
  bbox.width = Math.abs(scaleX)*bbox.width
  bbox.height = Math.abs(scaleY)*bbox.height
  this.rectSelection.isSelected = value

  // when set is already p
  this.rectSelection.set = this.rectSelection.set || this.parent.set()

  // helperFunction to create a mouse-down function which triggers the event specified in `eventName`
  function getMoseDownFunc (eventName) {
    return function (ev) {
      ev = ev || window.event
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false
      ev.stopPropagation()

      var x = ev.pageX || ev.touches[0].pageX
      var y = ev.pageY || ev.touches[0].pageY
      _this.el.fire(eventName, {x: x, y: y, event: ev})
    }
  }

  // create the selection-rectangle and add the css-class
  if (!this.rectSelection.set.get(0)) {
    this.rectSelection.set.add(this.nested.rect(bbox.width, bbox.height).addClass(this.options.classRect))
  }

  // Draw Points at the edges, if enabled
  if (this.options.points.length && this.rectSelection.set.length() < 2) {
    var ename = 'touchstart'
    var mname = 'mousedown'

    this.options.points.map(function (point, index) {
      var coords = _this.pointCoords(point, bbox)

      var pointElement = _this.drawPoint(coords.x, coords.y).attr('class', _this.options.classPoints + '_' + point).on(mname, getMoseDownFunc(point)).on(ename, getMoseDownFunc(point))

      _this.rectSelection.set.add(pointElement)
    })

    this.rectSelection.set.each(function () {
      this.addClass(_this.options.classPoints)
    })
  }

  // draw rotationPint, if enabled
  if (this.options.rotationPoint && ((this.options.points && !this.rectSelection.set.get(9)) || (!this.options.points && !this.rectSelection.set.get(1)))) {
    var curriedEvent = function (ev) {
      ev = ev || window.event
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false
      ev.stopPropagation()

      var x = ev.pageX || ev.touches[0].pageX
      var y = ev.pageY || ev.touches[0].pageY
      _this.el.fire('rot', {x: x, y: y, event: ev})
    }

    var pointElement = this.drawPoint(bbox.width / 2, 20).attr('class', this.options.classPoints + '_rot').on('touchstart', curriedEvent).on('mousedown', curriedEvent)
    this.rectSelection.set.add(pointElement)
  }
}

SelectHandler.prototype.handler = function () {
  var bbox = this.el.bbox()
  //this.nested.matrix(new SVG.Matrix(this.el).translate(bbox.x, bbox.y))
  var scaleX = this.el.transform('scaleX')
  var scaleY = this.el.transform('scaleY')
  var m = new SVG.Matrix(this.el).translate(bbox.x, bbox.y)
  this.nested.matrix(m.scale(1/scaleX, 1/scaleY))
  if (this.rectSelection.isSelected) {
    this.updateRectSelection()
  }
  if (this.pointSelection.isSelected) {
    this.updatePointSelection()
  }
}

SelectHandler.prototype.observe = function () {
  var _this = this

  if (MutationObserver) {
    if (this.rectSelection.isSelected || this.pointSelection.isSelected) {
      this.observerInst = this.observerInst || new MutationObserver(function () {
        _this.handler()
      })
      this.observerInst.observe(this.el.node, {attributes: true})
    } else {
      try {
        this.observerInst.disconnect()
        delete this.observerInst
      } catch (e) {
      }
    }
  } else {
    this.el.off('DOMAttrModified.select')

    if (this.rectSelection.isSelected || this.pointSelection.isSelected) {
      this.el.on('DOMAttrModified.select', function () {
        _this.handler()
      })
    }
  }
}

SelectHandler.prototype.cleanup = function () {
  // var _this = this
  if (!this.rectSelection.isSelected && this.rectSelection.set) {
    // stop watching the element, remove the selection
    this.rectSelection.set.each(function () {
      this.remove()
    })

    this.rectSelection.set.clear()
    delete this.rectSelection.set
  }

  if (!this.pointSelection.isSelected && this.pointSelection.set) {
    // Remove all points, clear the set, stop watching the element
    this.pointSelection.set.each(function () {
      this.remove()
    })

    this.pointSelection.set.clear()
    delete this.pointSelection.set
  }
  if (!this.lineSelection.isSelected && this.lineSelection.set) {
    // Remove all points, clear the set, stop watching the element
    this.lineSelection.set.each(function () {
      this.remove()
    })

    this.lineSelection.set.clear()
    delete this.lineSelection.set
  }

  if (!this.pointSelection.isSelected && !this.rectSelection.isSelected && !this.lineSelection.isSelected) {
    this.nested.remove()
    delete this.nested
  }
}

SVG.extend(SVG.Element, {
  // Select element with mouse
  selectize: function (value, options) {
    // Check the parameters and reassign if needed
    if (typeof value === 'object') {
      options = value
      value = true
    }

    var selectHandler = this.remember('_selectHandler') || new SelectHandler(this)

    selectHandler.init(value === undefined ? true : value, options || {})
    // console.log(this)
    return this
  }
})
SVG.Element.prototype.selectize.defaults = {
  points: ['lt', 'rt', 'rb', 'lb', 't', 'r', 'b', 'l'], // which points to draw, default all
  pointsExclude: [], // easier option if to exclude few than rewrite all
  classRect: 'svg_select_boundingRect', // Css-class added to the rect
  classPoints: 'svg_select_points', // Css-class added to the points
  pointSize: 7, // size of point
  rotationPoint: true, // If true, rotation point is drawn. Needed for rotation!
  deepSelect: false, // If true, moving of single points is possible (only line, polyline, polyon)
  pointType: 'circle' // Point type: circle or rect, default circle
}
