<template>
  <div class="graph-draw" :style="style">

  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 1800,
      height: 1800
    }
  },
  computed: {
    style () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },
  props: {
    id: {
      required: true
    }
  }
}
</script>

<style>

</style>
