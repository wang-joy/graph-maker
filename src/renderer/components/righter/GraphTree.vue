<template>
  <div>
    <Tree :data="traverseSvg.data" multiple @on-select-change="handleNodeSelect"></Tree>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['svg']),
    traverseSvg () {
      let data = []
      let shapes = []
      if (this.svg) {
        let svg = this.svg
        let treeNode = {title: svg.label, id: 0, expand: true, type: 'svg'}
        let shape = {id: 0, el: this.svg}
        let selectedShapes = this.svg.selector.shapes
        if (selectedShapes.length === 0) {
          treeNode.selected = true
        }
        data.push(treeNode)
        shapes.push(shape)
        if (svg.children && svg.children().length > 0) {
          treeNode.children = svg.children().map((item, index) => {
            let shape = {id: shapes.length, el: item}
            shapes.push(shape)
            return this.traverseNode(item, selectedShapes, shapes)
          })
        }
      }
      return {data, shapes}
    }
  },
  methods: {
    traverseNode (treeNode, selectedShapes, shapes) {
      let id = treeNode.attr('id')
      let data = {title: id, id: id, expand: true, type: 'shape'}
      if (selectedShapes.indexOf(treeNode) >= 0) {
        data.selected = true
      }
      if (treeNode.children && treeNode.children().length > 0) {
        data.children = treeNode.children().map((item, index) => {
          let shape = {id: shapes.length, el: item}
          shapes.push(shape)
          return this.traverseNode(item, selectedShapes, shapes)
        })
      }
      return data
    },
    handleNodeSelect (arr, node) {
      arr.forEach(element => {
        element.selected = false
      })
      node.selected = true
      let shape = this.traverseSvg.shapes.find(item => item.id === node.nodeKey)
      if (node.type === 'shape') {
        this.$store.dispatch('selectShape', shape.el)
      } else {
        this.$store.dispatch('selectSvg', shape.el)
      }
    }
  }
}
</script>

<style>

</style>
