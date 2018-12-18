<template>
  <div class="graph-righter">

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import types from '../store/mutations-type'
export default {
  methods: {
    ...mapMutations({setWidth: types.SET_RIGHTER_WIDTH})
  },
  mounted () {
    let rect = this.$el.getBoundingClientRect()
    this.setWidth(rect.width)
  }
}
</script>

<style>
.graph-righter{
  display: inline-block;
  width: 200px;
  vertical-align: top;
}
</style>
