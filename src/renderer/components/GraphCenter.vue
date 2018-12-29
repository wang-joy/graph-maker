<template>
  <div class="graph-center">
    <el-tabs type="border-card" class="my-tabs" closable v-model="val">
      <el-tab-pane v-for="item of svgs" :name="item.name" :label="item.label" :key="item.name"  class="my-tab-pane">
        <div class="my-pane" :style="{height: height + 'px'}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GraphDraw from './center/GraphDraw'
import {mapGetters, mapState} from 'vuex'
export default {
  data () {
    return {
      val: '0'
    }
  },
  components: {GraphDraw},
  computed: {
    height () {
      var height = this.workHeight - 40
      return height
    },
    ...mapGetters(['workHeight']),
    ...mapState(['svgs'])
  },
  watch: {
    svgs () {
      console.log(this.svgs)
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
.my-pane{
  overflow: auto;
}
</style>
