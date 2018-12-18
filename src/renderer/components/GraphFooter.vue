<template>
  <div class="graph-footer"></div>
</template>

<script>
import {mapMutations} from 'vuex'
import types from '../store/mutations-type'
export default {
  methods: {
    ...mapMutations({setHeight: types.SET_FOOTER_HEIGHT})
  },
  mounted () {
    let rect = this.$el.getBoundingClientRect()
    this.setHeight(rect.height)
  }
}
</script>

<style>
.graph-footer{
  width: 100%;
  height: 30px;
}
</style>
