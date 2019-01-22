<template>
  <div class="graph-righter">
    <el-tree 
      :data="traverseSvg"
      :props="defaultProps"
      default-expand-all
      highlight-current
      node-key="id"
      ref="tree"
      @node-click="handleNodeClick"
      ></el-tree>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions, mapState} from 'vuex'
import types from '../store/mutations-type'
// import GraphSvg from '@/svg/GraphSvg'
// import SvgManager from '@/svg/manager/svg-manager'
export default {
  methods: {
    ...mapMutations({setWidth: types.SET_RIGHTER_WIDTH}),
    ...mapActions(['select']),
    traverseNode (treeNode) {
      let data = {label: treeNode.attr('id'), id: treeNode.attr('id')}
      if (treeNode.children && treeNode.children().length > 0) {
        data.children = treeNode.children().map(item => {
          return this.traverseNode(item)
        })
      }
      return data
    },
    handleNodeClick ({label}) {
      this.$store.dispatch('select', label)
    }
  },
  mounted () {
    let rect = this.$el.getBoundingClientRect()
    this.setWidth(rect.width)
  },
  computed: {
    ...mapGetters(['svg']),
    ...mapState({
      currentNodeKey: state => state.Shape.activeId
    }),
    traverseSvg () {
      let data = []
      if (this.svg) {
        let svg = this.svg
        let treeNode = {label: svg.label, id: svg.id}
        data.push(treeNode)
        if (svg.children && svg.children().length > 0) {
          treeNode.children = svg.children().map(item => {
            return this.traverseNode(item)
          })
        }
      }
      return data
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    currentNodeKey (val) {
      this.$refs.tree.setCurrentKey(val)
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
