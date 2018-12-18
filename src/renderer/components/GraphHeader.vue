<template>
  <div class="graph-header">
    <graph-menu></graph-menu>
    <graph-tools-bar></graph-tools-bar>
  </div>
</template>

<script>
import GraphMenu from './header/GraphMenu'
import GraphToolsBar from './header/GraphToolsBar'
import {mapMutations} from 'vuex'
import types from '../store/mutations-type'
export default {
  components: {GraphMenu, GraphToolsBar},
  methods: {
    ...mapMutations({setHeight: types.SET_HEADER_HEIGHT})
  },
  mounted () {
    let rect = this.$el.getBoundingClientRect()
    this.setHeight(rect.height)
  }
}
</script>

<style scoped>
.graph-header{
  width: 100%;
  background-color: rgb(240,240,240);
}
</style>
