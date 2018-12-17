<template>
  <div class="graph-header">
    <graph-menu></graph-menu>
    <graph-tools-bar></graph-tools-bar>
  </div>
</template>

<script>
import GraphMenu from './header/GraphMenu'
import GraphToolsBar from './header/GraphToolsBar'
export default {
  components: {GraphMenu, GraphToolsBar}
}
</script>

<style scoped>
.graph-header{
  width: 100%;
  background-color: rgb(240,240,240);
}
</style>
