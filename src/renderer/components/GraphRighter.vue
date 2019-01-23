<template>
  <div class="graph-righter">
    <div class="graph-tree">
        <graph-tree></graph-tree>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
import types from '../store/mutations-type'
import VJstree from 'vue-jstree'
import GraphTree from './common/GraphTree'
export default {
  components: {VJstree, GraphTree},
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
  padding-left: 30px;
}
</style>
