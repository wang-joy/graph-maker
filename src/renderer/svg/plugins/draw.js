import SVG from 'svg.js'
import 'svg.draw.js'
import './svg.math.js'
import ShapeUtils from '@/svg/utils/shape'
SVG.Element.prototype.draw.extend('path', {
  init: function (e) {
    var p = this.startPoint
    const type = this.el.attr('type')
    if (type === 'curve') {
      this.initCurve(p)
    } else if (type === 'arc' || type === 'arch') {
      this.initArc(p)
    } else if (type === 'sector') {
      this.initSector(p)
    }
  },
  calc: function (e) {
    const type = this.el.attr('type')
    if (type === 'curve') {
      this.calcCurve(e)
    } else if (type === 'arc' || type === 'arch') {
      this.calcArc(e)
    } else if (type === 'sector') {
      this.calcSector(e)
    }
  },
  point: function (e) {
    const type = this.el.attr('type')
    if (type === 'curve') {
      this.pointCurve(e)
      return
    } else if (type === 'arc' || type === 'arch') {
      this.pointArc(e)
      return
    } else if (type === 'sector') {
      this.pointSector(e)
      return
    }
    this.stop(e)
  },
  clean: function () {
    const type = this.el.attr('type')
    if (type === 'curve') {
      this.cleanCurve()
    } else if (type === 'arc' || type === 'arch') {
      this.cleanArc()
    } else if (type === 'sector') {
      this.cleanSector()
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
  },
  initArc: function (p) {
    this.set = new SVG.Set()
    this.n = 0
    this.cp = [p.x, p.y]
    this.drawCircle(this.cp[0], this.cp[1])
    let arr = [['M', p.x, p.y]]
    this.el.plot(arr)
  },
  calcArc: function (e) {
    if (e) {
      let p = this.transformPoint(e.clientX, e.clientY)
      let snap = this.snapToGrid([p.x, p.y])
      let arr = this.el.array().valueOf()
      if (this.n === 1) {
        let r = arr[1][1]
        // let p = new SVG.math.Point(this.cp[0], this.cp[1])
        let p1 = new SVG.math.Point(snap[0], snap[1])
        let p2 = new SVG.math.Point(this.cp[0], this.cp[1])
        let angle = SVG.math.angle(p2,p1)
        let deg = ShapeUtils.getDeg([[this.cp[0], this.cp[1]], [arr[0][1], arr[0][2]], [snap[0], snap[1]]])
        if (deg < 0) {
          deg = 360 + deg
        }
        if(deg<180) {
          arr[1][4] = 0
        } else {
          arr[1][4] = 1
        }
        arr[1][6] = p2.x + Math.cos(angle)*r
        arr[1][7] = p2.y + Math.sin(angle)*r
        this.el.plot(arr)
      }
    }
  },
  pointArc: function (e) {
    if (this.n === 0) {
      this.n++
      let p = this.transformPoint(e.clientX, e.clientY)
      let snap = this.snapToGrid([p.x, p.y])
      let arr = this.el.array().valueOf()
      let r = Math.sqrt(Math.pow(this.cp[0]-snap[0],2)+Math.pow(this.cp[1]-snap[1],2))
      let m = ['M', snap[0], [snap[1]]]
      let a = ['A', r,r,0,1,1,snap[0], snap[1]]
      arr.splice(0,1,m,a)
      if (this.el.attr('type') === 'arch') {
        arr.push(['Z'])
      }
      this.el.plot(arr)
      this.drawCircle(snap[0], snap[1])
    } else if (this.n === 1){
      this.stop(e)
    }
  },
  cleanArc: function (){
    this.set.each(function () {
        this.remove()
    })
    this.set.clear()
    delete this.set
  },
  initSector: function (p) {
    this.set = new SVG.Set()
    this.n = 0
    this.cp = [p.x, p.y]
    this.drawCircle(this.cp[0], this.cp[1])
    let arr = [['M', p.x, p.y], ['L', p.x, p.y], ['Z']]
    this.el.plot(arr)
  },
  calcSector: function (e) {
    if (e) {
      let p = this.transformPoint(e.clientX, e.clientY)
      let snap = this.snapToGrid([p.x, p.y])
      let arr = this.el.array().valueOf()
      if (this.n === 0) {
        arr[1][1] = snap[0]
        arr[1][2] = snap[1]
      } else if (this.n === 1) {
        let r = arr[2][1]
        let p1 = new SVG.math.Point(snap[0], snap[1])
        let p2 = new SVG.math.Point(this.cp[0], this.cp[1])
        let angle = SVG.math.angle(p2,p1)
        let deg = ShapeUtils.getDeg([[this.cp[0], this.cp[1]], [arr[1][1], arr[1][2]], [snap[0], snap[1]]])
        if (deg < 0) {
          deg = 360 + deg
        }
        if(deg<180) {
          arr[2][4] = 0
        } else {
          arr[2][4] = 1
        }
        arr[2][6] = p2.x + Math.cos(angle)*r
        arr[2][7] = p2.y + Math.sin(angle)*r
      }
      this.el.plot(arr)
    }
  },
  pointSector: function (e) {
    if (this.n === 0) {
      this.n++
      let p = this.transformPoint(e.clientX, e.clientY)
      let snap = this.snapToGrid([p.x, p.y])
      let arr = this.el.array().valueOf()
      let r = Math.sqrt(Math.pow(this.cp[0]-snap[0],2)+Math.pow(this.cp[1]-snap[1],2))
      let l = ['L', snap[0], [snap[1]]]
      let a = ['A', r,r,0,1,1,snap[0], snap[1]]
      // arr.pop()
      arr.splice(1,1,l,a)
      this.el.plot(arr)
      this.drawCircle(snap[0], snap[1])
    } else if (this.n === 1) {
      this.stop(e)
    }
  },
  cleanSector: function (){
    this.set.each(function () {
        this.remove()
    })
    this.set.clear()
    delete this.set
  },
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
