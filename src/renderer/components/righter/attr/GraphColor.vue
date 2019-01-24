<template>
  <div v-clickoutside='hide' style="position:relative" class="graph-attr-color">
    <span class="graph-color-title" @click="showColor">{{attr.desc}}</span>
    <span class="graph-color-value" @click="showColor">{{attr.val}}</span>
    <color-container class="color-container"  v-model="show" :color-value="attr.val" @change="set" ></color-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ColorContainer from '../../color-picker/ColorContainer'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import Popper from 'element-ui/src/utils/vue-popper'
import AttrUtils from '@/svg/utils/attr'
export default {
  components: {ColorContainer},
  directives: {Clickoutside},
  mixins: [Popper],
  props: {
    attr: {
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    set (color) {
      this.attr.val = color
      this.attr.setter.call(AttrUtils, this.shapes, color)
    },
    hide () {
      this.show = false
    },
    showColor () {
      this.show = true
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
.graph-color-title, .graph-color-value{
    display: inline-block;
    width: 100px;
    border-bottom: 1px solid #ccc;
    height: 30px;
    line-height: 28px;
    vertical-align: top;
    font-size: 14px;
  }
  .graph-color-value{
    border-left: 1px solid #ccc;
    padding-left: 5px;
  }
  .graph-color-title{
    line-height: 28px;
    font-family: "微软雅黑", sans-serif;
    text-align: right;
    padding-right:10px; 
  }
.graph-attr-color .color-container {
  position: absolute;
  width: 270px;
  top:28px;
  left: -70px;
  background: #fff;
  z-index: 1;
  border: 1px solid #ccc;
}
</style>
