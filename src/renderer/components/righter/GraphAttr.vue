<template>
  <div>
    <p class="graph-attr-title">{{title}}</p>
    <template v-for="(item, index) in list">
      <template v-if="item.type === 'input'">
        <graph-attr-input :key="index" :attr="item"></graph-attr-input>
      </template>
      <template v-else-if="item.type === 'color'">
        <graph-attr-color :key="index" :attr="item"></graph-attr-color>
      </template>
      <template v-else-if="item.type === 'select'">
        {{item.title}}
        <graph-attr-select :key="index" :attr="item"></graph-attr-select>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GraphAttrInput from './attr/GraphInput'
import GraphAttrColor from './attr/GraphColor'
import GraphAttrSelect from './attr/GraphSelect'
import AttrUtils from '@/svg/utils/attr'
export default {
  components: {GraphAttrInput, GraphAttrColor, GraphAttrSelect},
  data () {
    return {
      title: '基本属性'
    }
  },
  computed: {
    ...mapGetters(['svg']),
    list () {
      let svg = this.svg
      if (svg) {
        let selector = svg.selector
        let shapes = selector.shapes
        if (shapes.length > 0) {
          return AttrUtils.getShapesAttrs(shapes)
        }
      }
      return []
    }
  }
}
</script>

<style>
.graph-attr-title{
  height: 29px;
  line-height: 29px;
  border-bottom: 1px solid #ccc;
  background-color: #F2F6FC;
  font-family: '微软雅黑', sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
</style>
