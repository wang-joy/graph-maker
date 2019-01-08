<template>
  <div id="app">
    <router-view></router-view>
    <div id="graph-mask"></div>
  </div>
</template>

<script>
  import GraphMask from '@/svg/GraphMask'
  export default {
    name: 'graph-maker',
    mounted () {
      let win = this.$electron.remote.getCurrentWindow()
      let size = win.getContentSize()
      let that = this
      that.$store.dispatch('winResize', size)
      console.log(size)
      window.onresize = function () {
        size = win.getContentSize()
        that.$store.dispatch('winResize', size)
      }
      GraphMask.setEl(document.getElementById('graph-mask'))
    }
  }
</script>

<style>
#app{
  position: relative;
}
#graph-mask{
  display: none;
  position: absolute;
  left: 0;
  top:0 ;
  height: 100%;
  width: 100%;
  z-index: 2;
  cursor: crosshair;
}
</style>
