<template>
  <div :id="id" :style="style"></div>
</template>

<script>
import SVG from 'svg.js'
export default {
  computed: {
    id () {
      return 'svg_' + this.svg.id
    },
    style () {
      return {
        width: this.svg.width + 'px',
        height: this.svg.height + 'px'
      }
    }
  },
  props: {
    svg: {
      required: true
    }
  },
  mounted () {
    let draw = SVG(this.id)
    this.svg.setDraw(draw)
  }
}
</script>

<style>

</style>
