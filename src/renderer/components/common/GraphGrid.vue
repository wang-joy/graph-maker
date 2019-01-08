<template>
  <div :id="id" :style="style"></div>
</template>

<script>
import GraphSvg from '@/svg/GraphSvg'
import SVG from 'svg.js'
export default {
  props: {
    id: {
      required: true
    },
    svg: {
      required: true,
      type: GraphSvg
    }
  },
  computed: {
    gridShow () {
      return this.svg.gridShow
    },
    gridColor () {
      return this.svg.gridColor
    },
    style () {
      return {
        backgroundColor: this.svg.backgroundColor,
        width: this.svg.width + 'px',
        height: this.svg.height + 'px'
      }
    }
  },
  methods: {
    createGrid (draw) {
      var lineAttr = {
        'stroke-width': 1,
        'shape-rendering': 'crispEdges',
        'stroke': this.gridColor
      }
      var gridRect = draw.rect('100%', '100%').fill('none').stroke('none')
      var gridPattern = draw.pattern(50, 50, function (add) {
        add.line(49, 0, 49, 50).stroke({dasharray: '2'}).attr(lineAttr)
        add.line(0, 49, 50, 49).stroke({dasharray: '2'}).attr(lineAttr)
      })
      gridRect.fill(gridPattern)
      if (this.gridShow) {
        gridRect.show()
      } else {
        gridRect.hide()
      }
      this.gridRect = gridRect
      this.gridPattern = gridPattern
    }
  },
  mounted () {
    var draw = SVG(this.id)
    this.createGrid(draw)
  },
  watch: {
    gridShow (val) {
      if (val) {
        this.gridRect.show()
      } else {
        this.gridRect.hide()
      }
    },
    gridColor (val) {
      var lineAttr = {
        'stroke-width': 1,
        'shape-rendering': 'crispEdges',
        'stroke': val
      }
      this.gridPattern.update(function (add) {
        add.line(49, 0, 49, 50).stroke({dasharray: '2'}).attr(lineAttr)
        add.line(0, 49, 50, 49).stroke({dasharray: '2'}).attr(lineAttr)
      })
    }
  }
}
</script>

<style>

</style>
