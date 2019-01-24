<template>
  <div>
    <span class="graph-input-title">{{attr.desc}}</span>
    <span class="graph-input-value">
      <el-input v-model="attr.val" :disabled="!attr.setter" @keyup.enter.native="handler(attr.setter)"></el-input>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AttrUtils from '@/svg/utils/attr'
export default {
  data () {
    return {
    }
  },
  props: {
    attr: {
      required: true
    }
  },
  methods: {
    handler (setter) {
      let svg = this.svg
      if (svg) {
        let selector = svg.selector
        let shapes = selector.shapes
        if (shapes.length > 0) {
          this.attr.setter.call(AttrUtils, shapes, this.attr.val)
        } else {
          this.attr.setter.call(AttrUtils, svg, this.attr.val)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['svg']),
    shapes () {
      if (this.svg) {
        return this.svg.selector.shapes
      }
      return []
    }
  }
}
</script>

<style>
  .graph-input-title, .graph-input-value{
    display: inline-block;
    width: 100px;
    border-bottom: 1px solid #ccc;
    height: 30px;
    vertical-align: top;
    font-size: 14px;
  }
  .graph-input-value{
    border-left: 1px solid #ccc;
  }
  .graph-input-title{
    line-height: 28px;
    font-family: "微软雅黑", sans-serif;
    text-align: right;
    padding-right:10px; 
  }
</style>
