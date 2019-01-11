<template>
  <div class="graph-center" :style="{height: workHeight + 'px' }">
    <el-tabs type="border-card" class="my-tabs" closable v-model="val" @tab-remove="remove" :style="{height: workHeight - 2+ 'px' }" @tab-click='click'>
      <el-tab-pane
        v-for="item of tabs"
        :name="item.name"
        :label="item.label"
        :key="item.name"
        class="my-tab-pane" lazy>
        <graph-work-area :id="item.name"></graph-work-area>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GraphDraw from './center/GraphDraw'
import GraphWorkArea from './center/GraphWorkArea'
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
    }
  },
  components: {GraphDraw, GraphWorkArea},
  computed: {
    ...mapState({
      tabs: state => state.list
    }),
    val: {
      get () {
        return this.$store.state.active
      },
      set (val) {
        this.$store.dispatch('setActive', val)
      }
    },
    ...mapGetters(['workHeight'])
  },
  methods: {
    ...mapActions({
      remove: 'removeSvg'
    }),
    click () {
    }
  }

}
</script>

<style>
.graph-center{
  display: inline-block;
  vertical-align: top;
}
.my-tabs.el-tabs--border-card{
  box-shadow: none;
}
.graph-center .el-tabs--border-card>.el-tabs__content{
  margin: 0;
  padding: 0;
}
</style>
