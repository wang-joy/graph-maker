<template>
  <div class="graph-righter">
    <p class="graph-tree-title">图元导航</p>
    <div class="graph-tree">
        <graph-tree class="graph-righter-tree"></graph-tree>
    </div>
    <div class="graph-attr">
      <graph-attr></graph-attr>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
import types from '../store/mutations-type'
import GraphTree from './righter/GraphTree'
import GraphAttr from './righter/GraphAttr'
export default {
  components: {GraphTree, GraphAttr},
  methods: {
    ...mapMutations({setWidth: types.SET_RIGHTER_WIDTH}),
    ...mapActions(['select'])
  },
  mounted () {
    let rect = this.$el.getBoundingClientRect()
    this.setWidth(rect.width)
  },
  computed: {
    ...mapGetters(['svg'])
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
.graph-tree {
  height: 200px;
  overflow: auto;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.graph-righter-tree {
  margin-left: 30px;
}
.graph-tree-title{
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  background-color: #F2F6FC;
  font-family: '微软雅黑', sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
</style>
