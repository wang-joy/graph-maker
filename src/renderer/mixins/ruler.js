import SVG from 'svg.js'
export default {
  data () {
    return {
      svgcursor: null
    }
  },
  methods: {
    createRuler (draw) {
      let len = 20 + this.len
      let lineAttr = {'stroke-width': 1, 'shape-rendering': 'crispEdges'}
      let ruler = draw.line().attr(lineAttr)
      var pathStr = ''
      var count = 0
      if (this.vertical) {
        draw.size(20, '100%')
        ruler.attr({
          x1: 19,
          y1: 0,
          x2: 19,
          y2: len
        })
        for (let i = 29; i < len; i = i + 10) {
          count++
          if (count % 10 === 0) {
            pathStr += 'M5,' + i + ' L20,' + i + ' '
          } else if (count % 5 === 0) {
            pathStr += 'M10,' + i + ' L20,' + i + ' '
          } else {
            pathStr += 'M15,' + i + ' L20,' + i + ' '
          }
        }
        draw.text(function (add) {
          for (let i = 22; i < len; i = i + 50) {
            add.tspan(i - 22).y(i)
          }
        }).font('size', 12).attr('writing-mode', 'tb-rl').x(10)
      } else {
        ruler.attr({
          x1: 0,
          y1: 19,
          x2: len,
          y2: 19
        })
        for (let i = 29; i < len; i = i + 10) {
          count++
          if (count % 10 === 0) {
            pathStr += 'M' + i + ',5 L' + i + ',20 '
          } else if (count % 5 === 0) {
            pathStr += 'M' + i + ',10 L' + i + ',20 '
          } else {
            pathStr += 'M' + i + ',15 L' + i + ',20 '
          }
        }
        draw.text(function (add) {
          for (let i = 22; i < len; i = i + 50) {
            add.tspan(i - 22).x(i)
          }
        }).font('size', 12).font('weight', 'normal').y(3)
      }
      var path = draw.path(pathStr)
      path.attr(lineAttr)
    },
    createCursor (draw) {
      if (!this.vertical) {
        let svgcursor = draw.polygon('15,20 25,20 20,15')
        svgcursor.fill('#000').addClass('x-ruler')
        this.svgcursor = svgcursor
      } else {
        let svgcursor = draw.polygon('20,15 20,25 15,20')
        svgcursor.fill('#000').addClass('y-ruler')
        this.svgcursor = svgcursor
      }
    },
    update () {
      this.$el.innerHTML = ''
      let draw = SVG(this.id)
      this.createRuler(draw)
      this.createCursor(draw)
    },
    updateCursor (cursor) {
      if (this.svgcursor) {
        if (!this.vertical) {
          let points = [
            [cursor.x + 15, 19],
            [cursor.x + 25, 19],
            [cursor.x + 20, 15]
          ]
          this.svgcursor.plot(points)
        } else {
          let points = [
            [19, cursor.y + 15],
            [19, cursor.y + 25],
            [15, cursor.y + 20]
          ]
          this.svgcursor.plot(points)
        }
      }
    }
  },
  watch: {
    cursor: {
      deep: true,
      handler (val) {
        this.updateCursor(val)
      }
    }
  }
}
