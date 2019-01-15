<template>
  <div class="graph-menu">
    <el-dropdown v-for="(menu, index) in menus" :key="index" placement='top-start'>
      <span class="graph-dropdown-link">
        {{menu.title}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, i) in menu.items"
          class="my-dropdown-item"
          :key="i"
          @click.native="item.handler" :divided="item.divided">
          <span class="item-title">{{item.title}} </span>
          <span class="item-accesskey">{{item.accesskey}} </span>
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
              title: '新建',
              handler: this.create,
              accesskey: 'Ctrl+N'
            },
            {
              title: '打开',
              handler: this.open,
              accesskey: 'Ctrl+O'
            },
            {
              title: '保存',
              handler: this.save,
              accesskey: 'Ctrl+S'
            },
            {
              title: '另存为',
              handler: this.saveAs,
              accesskey: 'Shift+Ctrl+S'
            },
            {
              title: '退出',
              handler: this.quit,
              accesskey: 'Ctrl+Q'
            }
          ]
        },
        {
          title: '编辑(E)',
          items: [
            {
              title: '撤销',
              handler: this.undo,
              accesskey: 'Ctrl+Z'
            },
            {
              title: '恢复',
              handler: this.redo,
              accesskey: 'Ctrl+Shift+Z'
            },
            {
              title: '剪切',
              handler: this.cute,
              accesskey: 'Ctrl+X',
              divided: true
            },
            {
              title: '复制',
              handler: this.copy,
              accesskey: 'Ctrl+C'
            },
            {
              title: '粘贴',
              handler: this.paste,
              accesskey: 'Ctrl+V'
            },
            {
              title: '删除',
              handler: this.remove,
              accesskey: 'Del'
            },
            {
              title: '全选',
              handler: this.selectAll,
              accesskey: 'Ctrl+A',
              divided: true
            },
            {
              title: '反选',
              handler: this.invertSelect,
              accesskey: 'Ctrl+I'
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
    open () {
      this.$store.dispatch('openSvg')
    },
    quit () {
      this.$store.dispatch('winQuit')
    },
    undo () {
      this.$store.dispatch('undo')
    },
    redo () {
      this.$store.dispatch('redo')
    },
    cute () {
      this.$store.dispatch('cute')
    },
    copy () {
      this.$store.dispatch('copy')
    },
    paste () {
      this.$store.dispatch('paste')
    },
    remove () {
      this.$store.dispatch('remove')
    },
    selectAll () {
      this.$store.dispatch('selectAll')
    },
    invertSelect () {
      this.$store.dispatch('invertSelect')
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
.my-dropdown-item .item-title, .my-dropdown-item .item-accesskey{
  display: inline-block;
  height: 100%;
  line-height: 100%;
  width: 50px;
}
 .my-dropdown-item .item-accesskey{
   vertical-align: baseline;
   margin-left: 5px;
   text-align: right;
   width: 70px;
 }
</style>
