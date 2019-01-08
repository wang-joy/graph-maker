<template>
  <div class="graph-menu">
    <el-dropdown v-for="(menu, index) in menus" :key="index">
      <span class="graph-dropdown-link">
        {{menu.title}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, i) in menu.items"
          class="my-dropdown-item"
          :key="i"
          @click.native="item.handler">
          {{item.title}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          title: '文件',
          items: [
            {
              title: '新建',
              handler: this.create
            },
            {
              title: '保存',
              handler: this.create
            },
            {
              title: '打开',
              handler: this.create
            }
          ]
        }
      ]
    }
  },
  methods: {
    create () {
      this.$store.dispatch('createSvg')
    }
  }
}
</script>

<style scoped>
.tools-menu{
 width: 100%;
}
.graph-dropdown-link{
  display: inline-block;
  width: 60px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  font-family: '微软雅黑',sans-serif;
}
.graph-dropdown-link:first-child{
  margin-left: 10px;
  font-size: 13px;
}
.graph-dropdown-link:hover{
  color: #409EFF;
}
.my-dropdown-item{
  font-size: 12px;
  font-family: '微软雅黑',sans-serif;
}
</style>
