<template>
  <div>
    <span class="graph-select-title">{{attr.desc}}</span>
    <span class="graph-select-value">
      <el-select  v-model="attr.val" @change="handler(attr.setter)">
        <el-option v-for="(item, index) in attr.opts.options" :key="index" :value="item.val" :label="item.desc">
          {{item.desc}}
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AttrUtils from '@/svg/utils/attr'
export default {
  data () {
    return {
      val: ''
    }
  },
  props: {
    attr: {
      required: true
    }
  },
  methods: {
    handler (setter) {
      if (this.shapes.length > 0) {
        setter.call(AttrUtils, this.shapes, this.attr.val)
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
  .graph-select-title, .graph-select-value{
    display: inline-block;
    width: 100px;
    border-bottom: 1px solid #ccc;
    height: 30px;
    vertical-align: top;
    font-size: 14px;
  }
  .graph-select-value{
    border-left: 1px solid #ccc;
  }
  .graph-select-title{
    line-height: 28px;
    font-family: "微软雅黑", sans-serif;
    text-align: right;
    padding-right:10px; 
  }
</style>
