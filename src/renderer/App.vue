<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
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
    }
  }
</script>

<style>
</style>
