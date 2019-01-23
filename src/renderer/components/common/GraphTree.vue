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
        let count = 0
        let treeNode = {title: svg.label, id: count, expand: true, type: 'svg'}
        let shape = {id: count, el: this.svg}
        if (this.selected.length === 0) {
          treeNode.selected = true
        }
        data.push(treeNode)
        shapes.push(shape)
        if (svg.children && svg.children().length > 0) {
          treeNode.children = svg.children().map((item, index) => {
            let id = count + index + 1
            let shape = {id: id, el: item}
            shapes.push(shape)
            return this.traverseNode(item, id, shapes)
          })
        }
      }
      return {data, shapes}
    },
    selected () {
      let data = []
      if (this.svg) {
        data = this.svg.selector.shapes.map(item => item.attr('id'))
      }
      return data
    }
  },
  watch: {
    selected (val) {
      let nodes = this.traverseSvg.data
      nodes.forEach(item => {
        let id = item.id
        if (val.indexOf(id) >= 0) {
          item.selected = true
        }
      })
    }
  },
  methods: {
    traverseNode (treeNode, count, shapes) {
      let id = treeNode.attr('id')
      let data = {title: id, id: id, expand: true, type: 'shape'}
      if (this.selected.indexOf(id) >= 0) {
        data.selected = true
      }
      if (treeNode.children && treeNode.children().length > 0) {
        data.children = treeNode.children().map((item, index) => {
          let id = count + index + 1
          let shape = {id: id, el: item}
          shapes.push(shape)
          return this.traverseNode(item, id, shapes)
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
