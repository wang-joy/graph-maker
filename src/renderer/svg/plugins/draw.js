import SVG from 'svg.js'
import 'svg.draw.js'
SVG.Element.prototype.draw.extend('path', {
  init: function (e) {
    var p = this.startPoint
    if (this.el.attr('type') === 'curve') {
      this.initCurve(p)
    }
  },
  calc: function (e) {
    if (this.el.attr('type') === 'curve') {
      this.calcCurve(e)
    }
  },
  point: function (e) {
    if (this.el.attr('type') === 'curve') {
      this.pointCurve(e)
      return
    }
    this.stop(e)
  },
  clean: function () {
    if (this.el.attr('type') === 'curve') {
      this.cleanCurve()
    }
  },
  drawCircle: function (cx, cy) {
    this.set.add(this.parent.circle(7).stroke({width: 1}).center(cx, cy))
  },
  drawLine: function () {
    var c1 = this.set.get(this.set.length() - 1)
    var c2 = this.set.get(this.set.length() - 2)
    this.lines.add(this.parent.line(c1.cx(), c1.cy(), c2.cx(), c2.cy()).stroke({width: 1, dasharray: '5,5'}))
  },
  initCurve: function (p) {
    this.set = new SVG.Set()
    this.lines = new SVG.Set()
    this.n = 0
    var arr = [
      ['M', p.x, p.y],
      ['C', p.x, p.y, p.x, p.y, p.x, p.y]
    ]
    this.drawCircle(p.x, p.y)
    this.el.plot(arr)
  },
  calcCurve: function (e) {
    var arr = this.el.array().valueOf()
    if (arr.length > 1) {
      var c = arr.pop()
      if (e) {
        var p = this.transformPoint(e.clientX, e.clientY)
        var snap = this.snapToGrid([p.x, p.y])
        switch (this.n % 2) {
          case 0:
            c[1] = snap[0]
            c[2] = snap[1]
            c[3] = snap[0]
            c[4] = snap[1]
            c[5] = snap[0]
            c[6] = snap[1]
            if (this.n - 1 > 0) {
              var c2 = arr.pop()
              var p1 = {x: snap[0], y: snap[1]}
              var p2 = {x: c2[5], y: c2[6]}
              var p3 = {x: 2 * p2.x - p1.x, y: 2 * p2.y - p1.y}
              c2[3] = p3.x
              c2[4] = p3.y
              var circle = this.set.get(this.set.length() - 2)
              circle.center(p3.x, p3.y)
              var linePoints = this.lines.last().array().valueOf()
              linePoints[0][0] = p3.x
              linePoints[0][1] = p3.y
              this.lines.last().plot(linePoints)
              arr.push(c2)
            }
            break
          case 1:
            c[3] = snap[0]
            c[4] = snap[1]
            c[5] = snap[0]
            c[6] = snap[1]
            break
        }
        arr.push(c)
        this.el.plot(arr)
      } else {
        if (this.n % 2 === 0) {
          if (this.n === 0) {
            arr.push(c)
          }
          this.el.plot(arr)
        } else {
          arr.push(c)
          this.el.plot(arr)
          this.drawCircle(c[3], c[4])
          this.drawCircle(c[5], c[6])
        }
      }
    }
  },
  cleanCurve: function () {
    this.set.each(function () {
      this.remove()
    })
    this.lines.each(function () {
      this.remove()
    })

    this.set.clear()
    this.lines.clear()
    delete this.lines
    delete this.set
  },
  pointCurve: function (e) {
    this.n++
    var p = this.transformPoint(e.clientX, e.clientY)
    var snap = this.snapToGrid([p.x, p.y])
    var arr = this.el.array().valueOf()
    var c = arr.pop()
    var arr2 = []
    switch (this.n % 2) {
      case 0:
        c[5] = snap[0]
        c[6] = snap[1]
        arr2 = [['C', snap[0], snap[1], snap[0], snap[1], snap[0], snap[1]]]
        this.drawCircle(p.x, p.y)
        break
      case 1:
        c[1] = snap[0]
        c[2] = snap[1]
        break
    }
    this.drawCircle(p.x, p.y)
    this.drawLine()
    arr.push(c)
    arr2.forEach(function (item) { arr.push(item) })
    this.el.plot(arr)
    this.el.fire('drawpoint', {event: e, p: {x: p.x, y: p.y}, m: this.m})
  }
})
SVG.Element.prototype.draw.extend('ellipse', {
    
  init:function(e){
      // We start with a circle with radius 1 at the position of the cursor
      var p = this.startPoint;

      this.el.attr({ x: p.x, y: p.y, rx: 0, ry: 0 });
      
  },

  calc:function (e) {
      var p = this.transformPoint(e.clientX, e.clientY);
      var rect = {
        x: this.startPoint.x,
        y: this.startPoint.y
      }
      rect.width = p.x - rect.x
      rect.height = p.y - rect.y
      this.snapToGrid(rect)
      if (rect.width < 0) {
        rect.x = rect.x + rect.width;
        rect.width = -rect.width;
      }
      if (rect.height < 0) {
        rect.y = rect.y + rect.height;
        rect.height = -rect.height;
      }
      var ellipse = {
        cx: rect.x + rect.width/2,
        cy: rect.y + rect.height/2,
        rx: rect.width/2,
        ry: rect.height/2
      };
      this.snapToGrid(ellipse);
      this.el.attr(ellipse);
  }
})
SVG.Element.prototype.draw.extend('circle', {
    
  init:function(e){
      // We start with a circle with radius 1 at the position of the cursor
      var p = this.startPoint;

      this.el.attr({ x: p.x, y: p.y, r: 0 });
      
  },

  calc:function (e) {
      var p = this.transformPoint(e.clientX, e.clientY);
      var rect = {
        x: this.startPoint.x,
        y: this.startPoint.y
      }
      rect.width = p.x - rect.x
      rect.height = p.y - rect.y
      let cx = 0
      let cy = 0
      let r = Math.max(Math.abs(rect.width/2), Math.abs(rect.height/2))
      if (rect.width < 0){
        cx = rect.x - r
      } else {
        cx = rect.x + r
      }
      if (rect.height < 0){
        cy = rect.y - r
      } else {
        cy = rect.y + r
      }
      // this.snapToGrid(ellipse);
      let circle = {
        cx: cx,
        cy: cy,
        r: r
      }
      this.el.attr(circle);
  }
})
