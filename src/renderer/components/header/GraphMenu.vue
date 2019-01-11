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
import {mapState} from 'vuex'
import SvgManager from '@/svg/manager/svg-manager'
export default {
  data () {
    return {
      menus: [
        {
          title: '文件(E)',
          items: [
            {
              title: '新建 Ctrl+N',
              handler: this.create
            },
            {
              title: '打开 Ctrl+O',
              handler: this.open
            },
            {
              title: '保存 Ctrl+S',
              handler: this.save
            },
            {
              title: '另存为 Shift+Ctrl+S',
              handler: this.saveAs
            },
            {
              title: '退出 Ctrl+Q',
              handler: this.quit
            }
          ]
        }
      ]
    }
  },
  methods: {
    create () {
      this.$store.dispatch('createSvg')
    },
    save () {
      this.$store.dispatch('saveSvg')
    },
    saveAs () {
      this.$store.dispatch('saveAsSvg')
    },
    quit () {
      this.$store.dispatch('winQuit')
    },
    open () {
      this.$store.dispatch('openSvg')
    }
  },
  computed: {
    ...mapState({
      svg: state => SvgManager.getById(state.active)
    })
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
