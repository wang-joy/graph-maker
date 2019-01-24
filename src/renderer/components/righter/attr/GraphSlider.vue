<template>
  <div>
    <span class="graph-slider-title">{{attr.desc}}</span>
    <span class="graph-slider-value">
      <el-slider v-model="val" :format-tooltip="formatTooltip" show-tooltip @change="handler"></el-slider>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AttrUtils from '@/svg/utils/attr'
export default {
  data () {
    return {
      val: this.attr.val * 100
    }
  },
  props: {
    attr: {
      required: true
    }
  },
  methods: {
    handler (val) {
      if (this.shapes.length > 0) {
        this.attr.setter.call(AttrUtils, this.shapes, val / 100)
      }
    },
    formatTooltip (val) {
      return val / 100
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
  },
  watch: {
    attr: {
      deep: true,
      handler (val) {
        this.val = val.val * 100
      }
    }
  }
}
</script>

<style>
  .graph-slider-title, .graph-slider-value{
    display: inline-block;
    width: 100px;
    border-bottom: 1px solid #ccc;
    height: 30px;
    vertical-align: top;
    font-size: 14px;
  }
  .graph-slider-value{
    border-left: 1px solid #ccc;
    padding-left: 5px;
  }
  .graph-slider-title{
    line-height: 28px;
    font-family: "微软雅黑", sans-serif;
    text-align: right;
    padding-right:10px; 
  }
</style>
