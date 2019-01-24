<template>
  <div class="tools-bar">
    <template v-for="(btnGroup, index) in btnGroups">
      <div v-if="btnGroup.type=== 'separator'" :key="index" class="separator">|</div>
      <br v-else-if="btnGroup.type=== 'br'" :key="index">
      <el-button-group v-else :key="index">
        <el-button
          :size="btnSize"
          class="btn"
          v-for="(btn, i) in btnGroup.btns"
          :key="index + '_' + i" 
          :title="btn.title"
          @click="btn.handler(btn.params)" :disabled="btn.disabled">
            <graph-icon :type="btn.icon"></graph-icon>
          </el-button>
      </el-button-group>
    </template>
  </div>
</template>

<script>
import GraphIcon from '../icon/GraphIcon'
import { mapState } from 'vuex'
import SvgManager from '@/svg/manager/svg-manager'
export default {
  components: {GraphIcon},
  data () {
    return {
      btnSize: 'mini',
      btnGroups: [
        {
          btns: [
            {
              title: '新建文件',
              click: 'createFile',
              icon: 'xinjian',
              handler: this.create
            },
            {
              title: '打开文件',
              click: 'createFile',
              handler: this.open,
              icon: 'dakai'
            },
            {
              title: '保存文件',
              click: 'createFile',
              handler: this.save,
              icon: 'baocun'
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '取消上次操作',
              click: 'createFile',
              handler: this.undo,
              icon: 'quxiaoshangcicaozuo'
            },
            {
              title: '恢复上次操作',
              click: 'createFile',
              handler: this.redo,
              icon: 'huifushangcicaozuo'
            },
            {
              title: '剪切',
              click: 'createFile',
              handler: this.cute,
              icon: 'jianqie'
            },
            {
              title: '复制',
              click: 'createFile',
              handler: this.copy,
              icon: 'kaobei'
            },
            {
              title: '粘贴',
              click: 'createFile',
              handler: this.paste,
              icon: 'niantie'
            },
            {
              title: '删除',
              click: 'createFile',
              handler: this.remove,
              icon: 'shanchu'
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '左对齐',
              click: 'createFile',
              icon: 'zuoduiqi',
              handler: this.align,
              params: 'left'
            },
            {
              title: '右对齐',
              click: 'shuipingjuzhong',
              icon: 'youduiqi',
              handler: this.align,
              params: 'right'
            },
            {
              title: '上对齐',
              click: 'createFile',
              icon: 'shangduiqi',
              handler: this.align,
              params: 'top'
            },
            {
              title: '下对齐',
              click: 'xiaduiqi',
              icon: 'xiaduiqi',
              handler: this.align,
              params: 'bottom'
            },
            {
              title: '水平居中',
              click: 'createFile',
              icon: 'shuipingjuzhong',
              handler: this.align,
              params: 'horizontal'
            },
            {
              title: '垂直居中',
              click: 'createFile',
              icon: 'chuizhijuzhong',
              handler: this.align,
              params: 'vertical'
            },
            {
              title: '等宽',
              click: 'createFile',
              icon: 'dengkuan',
              disabled: true
            },
            {
              title: '等高',
              click: 'createFile',
              icon: 'denggao',
              disabled: true
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '移到最上',
              click: 'createFile',
              icon: 'yidaozuishang',
              handler: this.arrange,
              params: 'top'
            },
            {
              title: '上移一层',
              click: 'shuipingjuzhong',
              icon: 'shangyiyiceng2',
              handler: this.arrange,
              params: 'prev'
            },
            {
              title: '下移一层',
              click: 'createFile',
              icon: 'xiayiyiceng2',
              handler: this.arrange,
              params: 'next'
            },
            {
              title: '移到最下',
              click: 'xiaduiqi',
              icon: 'yidaozuixia1',
              handler: this.arrange,
              params: 'bottom'
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '水平翻转',
              click: 'createFile',
              icon: 'shuipingfanzhuan',
              disabled: true
            },
            {
              title: '垂直翻转',
              click: 'shuipingjuzhong',
              icon: 'chuizhifanzhuan',
              disabled: true
            },
            {
              title: '顺时针旋转90度',
              click: 'createFile',
              icon: 'shunshizhen',
              handler: this.rotate,
              params: 90
            },
            {
              title: '逆时针旋转90度',
              click: 'xiaduiqi',
              icon: 'nishizhen',
              handler: this.rotate,
              params: -90
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '恢复原始尺寸',
              click: 'createFile',
              icon: 'huifuyuanshichicun',
              disabled: true
            },
            {
              title: '放大',
              click: 'shuipingjuzhong',
              icon: 'fangda',
              disabled: true
            },
            {
              title: '缩小',
              click: 'createFile',
              icon: 'suoxiao',
              disabled: true
            }
          ]
        },
        {
          type: 'br'
        },
        {
          btns: [
            {
              title: '文字加粗',
              click: 'createFile',
              icon: 'jiacub',
              disabled: true
            },
            {
              title: '文字倾斜',
              click: 'shuipingjuzhong',
              icon: 'xietii',
              disabled: true
            },
            {
              title: '文字左对齐',
              click: 'createFile',
              icon: 'zuoduiqi1',
              disabled: true
            },
            {
              title: '文字居中对齐',
              click: 'zhongduiqi',
              icon: 'zhongduiqi',
              disabled: true
            },
            {
              title: '文字右对齐',
              click: 'zhongduiqi',
              icon: 'youduiqi1',
              disabled: true
            },
            {
              title: '文字颜色',
              click: 'zhongduiqi',
              icon: 'wenziyanse',
              disabled: true
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '填充色',
              click: 'createFile',
              icon: 'tianchongse',
              disabled: true
            },
            {
              title: '线条颜色',
              click: 'shuipingjuzhong',
              icon: 'xiantiaoyanse',
              disabled: true
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '组合',
              click: 'createFile',
              icon: 'zuhe1',
              handler: this.group
            },
            {
              title: '拆分',
              click: 'shuipingjuzhong',
              icon: 'fenzu',
              handler: this.ungroup
            },
            {
              title: '全部选中',
              click: 'shuipingjuzhong',
              icon: 'quanbuxuanzhong',
              handler: this.selectAll
            },
            {
              title: '反向选中',
              click: 'shuipingjuzhong',
              icon: 'fanxiangxuanzhong',
              handler: this.invertSelect
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
    },
    align (type) {
      this.$store.dispatch('align', type)
    },
    flipX () {
      this.$store.dispatch('flipX')
    },
    flipY () {
      this.$store.dispatch('flipY')
    },
    rotate (rotation) {
      this.$store.dispatch('rotate', {rotation, relative: true})
    },
    group () {
      this.$store.dispatch('group')
    },
    ungroup () {
      this.$store.dispatch('ungroup')
    },
    arrange (type) {
      this.$store.dispatch('arrange', type)
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
.tools-bar{
  width: 100%;
  padding-bottom: 10px;
}
.tools-bar .btn{
    width: 32px;
    height: 26px;
    padding: 0;
    background-color: transparent;
    border: 1px solid transparent;
    margin-top:5px;
  }
  .tools-bar .btn:hover{
    background-color: #fff;
    border-color: #409EFF;
  }
  .tools-bar .separator{
    display: inline-block;
    width: 32px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-weight: bold;
    color: black;
  }
</style>
