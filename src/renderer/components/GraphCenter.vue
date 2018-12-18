<template>
  <div class="graph-center">
    <el-tabs type="border-card" class="my-tabs" closable v-model="val" @tab-remove="removeTab" @tab-click='clickTab'>
      <el-tab-pane v-for="item of tabList" :name="item.name" :label="item.label" :key="item.name"  class="my-tab-pane">
        <div class="my-pane" :style="{height: height + 'px'}">
          
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GraphDraw from './center/GraphDraw'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      val: '0',
      tabList: [],
      count: 0
    }
  },
  components: {GraphDraw},
  computed: {
    height () {
      var height = this.workHeight - 40
      return height
    },
    ...mapGetters(['workHeight'])
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
