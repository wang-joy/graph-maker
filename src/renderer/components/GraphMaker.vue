<template>
  <div class="graph-maker" :style="style">
    <graph-header></graph-header>
    <div class="graph-work" :style="{height: workHeight + 'px'}">
      <graph-lefter></graph-lefter>
      <graph-center :style="{width: workMainWidth + 'px'}"></graph-center>
      <graph-righter></graph-righter>
    </div>
    <graph-footer></graph-footer>
  </div>
</template>
<script>
import GraphHeader from './GraphHeader'
import GraphLefter from './GraphLefter'
import GraphFooter from './GraphFooter'
import GraphCenter from './GraphCenter'
import GraphRighter from './GraphRighter'
import {mapGetters, mapState} from 'vuex'
export default {
  components: {GraphHeader, GraphLefter, GraphFooter, GraphCenter, GraphRighter},
  computed: {
    ...mapState({
      height: state => state.Win.winHeight,
      width: state => state.Win.winWidth
    }),
    style () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    ...mapGetters(['workHeight', 'workMainWidth'])
  }

}
</script>

<style>
.graph-work{
  font-size: 0;
}
</style>
