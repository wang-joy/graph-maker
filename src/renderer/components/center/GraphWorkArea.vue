<template>
  <div :id="id" class="graph-work-area" :style="style">
    <graph-ruler :id="'x_ruler_' + id" :len="width" :cursor="cursor" class="x-graph-ruler" :style="{'margin-left': -left + 'px'}"></graph-ruler>
    <div class="graph-work-space" :style="workSpaceStyle"  @scroll='scroll'>
      <graph-draw :svg="svg" class="graph-draw"></graph-draw>
      <graph-grid class="graph-grid" :svg="svg" :id="'grid_' + id"></graph-grid>
    </div>
    <graph-ruler :id="'y_ruler_' + id" vertical :cursor="cursor" :len="height" class="y-graph-ruler" :style="{'margin-top': -top + 'px'}"></graph-ruler>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import GraphRuler from '../common/GraphRuler'
import SvgManager from '@/svg/manager/svg-manager'
import GraphDraw from './GraphDraw'
import GraphGrid from '../common/GraphGrid'
export default {
  computed: {
    style () {
      return {
        height: this.workHeight - 40 + 'px'
      }
    },
    ...mapGetters(['workHeight', 'workMainWidth']),
    workSpaceStyle () {
      return {
        height: this.workHeight - 60 + 'px',
        width: this.workMainWidth - 20 + 'px'
      }
    },
    width () {
      return parseInt(this.svg.width)
    },
    height () {
      return parseInt(this.svg.height)
    },
    cursor () {
      return this.svg.cursor
    }
  },
  components: {GraphRuler, GraphDraw, GraphGrid},
  props: {
    id: {
      required: true
    }
  },
  methods: {
    scroll (e) {
      this.left = e.target.scrollLeft
      this.top = e.target.scrollTop
      // let point = {x: this.cursor.x + this.left, y: this.cursor.y + this.top}
      this.cursor.setScroll(this.top, this.left)
    }
  },
  data () {
    let svg = SvgManager.getById(this.id)
    return {
      left: 0,
      top: 0,
      svg: svg
    }
  }
}
</script>

<style>
.graph-work-area{
  overflow: hidden;
  position: relative;
}
.graph-work-area .x-graph-ruler,
.graph-work-area .y-graph-ruler{
  position: absolute;
  top:0;
  left:0;
}
.graph-work-space{
  position: relative;
  margin-left: 20px;
  margin-top: 20px;
  overflow: auto;
}
.graph-work-space .graph-grid {
  position: absolute;
  top: 0;
  left: 0;
}
.graph-work-space .graph-draw {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
