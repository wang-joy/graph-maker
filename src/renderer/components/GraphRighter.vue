<template>
  <div class="graph-righter">
    <input type="text" v-model="val">
    <button @click="handleClick">点击</button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import types from '../store/mutations-type'
import SvgManager from '@/svg/manager/svg-manager'
export default {
  methods: {
    ...mapMutations({setWidth: types.SET_RIGHTER_WIDTH}),
    handleClick () {
      let id = this.$store.state.active
      let svg = SvgManager.getById(id)
      svg.backgroundColor = this.val
    }
  },
  mounted () {
    let rect = this.$el.getBoundingClientRect()
    this.setWidth(rect.width)
  },
  data () {
    return {
      val: 0
    }
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
