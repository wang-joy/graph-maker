<template>
  <div class="graph-maker">
    <graph-header ref="header"></graph-header>
    <div class="graph-work" :style="{height: workHeight + 'px'}">
      <graph-left ref="lefter"></graph-left>
    </div>
    <graph-footer ref="footer"></graph-footer>
  </div>
</template>
<script>
import GraphHeader from './GraphHeader'
import GraphLeft from './GraphLeft'
import GraphFooter from './GraphFooter'
import {mapGetters} from 'vuex'
export default {
  components: {GraphHeader, GraphLeft, GraphFooter},
  computed: {
    ...mapGetters(['workHeight', 'workMainWidth'])
  },
  data () {
    return {
    }
  },
  mounted () {
  }

}
</script>

<style>
.graph-maker{
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 800px;
}
</style>
