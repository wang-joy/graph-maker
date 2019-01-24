<template>
  <div class="graph-menu">
    <el-menu class="my-el-menu" mode="horizontal" :default-active='activeIndex' menu-trigger='hover' :collapse-transition='false'>
      <template v-for="(menu, i) in menus">
        <el-menu-item v-if="!menu.items" :class="[i === 0?'first':'']" :index="''+ i" :key="i">{{menu.title}}</el-menu-item>
        <el-submenu v-else :key="i" :index="''+ i" :class="['my-el-submenu',i === 0?'first':'']">
          <template slot="title">{{menu.title}}</template>
          <template  v-for="(item, j) in menu.items">
            <el-menu-item v-if="!item.items"
              :index="i + '-' +j"
              :key="j"
              :class="{'my-el-menu-item':true, 'divided': item.divided}" @click.native="item.handler">
                <span class="el-menu-item-title">{{item.title}}</span>
                <span class="el-menu-item-accesskey">{{item.accesskey}}</span>
              </el-menu-item>
              <el-submenu :disabled="item.disabled" v-else :key="j" :index="i + '-' +j" :class="{'divided': item.divided}">
                <template slot="title">{{item.title}}</template>
                <el-menu-item
                  v-for="(subitem,k) in item.items"
                  :key="k"
                  :index="i + '-' +j + '-' +k"
                  :class="{'divided': subitem.divided}"
                  @click.native="subitem.handler(subitem.params)">
                  {{subitem.title}}
                </el-menu-item>
              </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import SvgManager from '@/svg/manager/svg-manager'
// import ShapeUtils from '@/svg/utils/shape'
export default {
  data () {
    return {
      activeIndex: '0',
      menus: [
        {
          title: '文件(F)',
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
              accesskey: 'Ctrl+Q',
              divided: true
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
        },
        {
          title: '排列(A)',
          items: [
            {
              title: '对齐(A)',
              items: [
                {
                  title: '左对齐(L)',
                  handler: this.align,
                  params: 'left'
                },
                {
                  title: '水平居中(H)',
                  handler: this.align,
                  params: 'horizontal'
                },
                {
                  title: '右对齐(R)',
                  handler: this.align,
                  params: 'right'
                },
                {
                  title: '上对齐(T)',
                  handler: this.align,
                  params: 'top',
                  divided: true
                },
                {
                  title: '垂直居中(V)',
                  handler: this.align,
                  params: 'vertical'
                },
                {
                  title: '下对齐(B)',
                  handler: this.align,
                  params: 'bottom'
                }
              ]
            },
            {
              title: '翻转(M)',
              disabled: true,
              items: [
                {
                  title: '水平翻转(H)',
                  handler: this.flipX
                },
                {
                  title: '垂直翻转(V)',
                  handler: this.flipY
                }
              ]
            },
            {
              title: '旋转(R)',
              items: [
                {
                  title: '逆时针旋转90度(N)',
                  handler: this.rotate,
                  params: -90
                },
                {
                  title: '顺时针旋转90度(C)',
                  handler: this.rotate,
                  params: 90
                }
              ]
            },
            {
              title: '组合(G)',
              accesskey: 'Ctrl+G',
              divided: true,
              handler: this.group
            },
            {
              title: '拆分(U)',
              accesskey: 'Ctrl+Shift+G',
              handler: this.ungroup
            },
            {
              title: '叠放顺序(L)',
              divided: true,
              items: [
                {
                  title: '提到最前面(N)',
                  handler: this.arrange,
                  params: 'top'
                },
                {
                  title: '上移一层(U)',
                  handler: this.arrange,
                  params: 'prev'
                },
                {
                  title: '下移一层(D)',
                  handler: this.arrange,
                  params: 'next'
                },
                {
                  title: '放到最后面(B)',
                  handler: this.arrange,
                  params: 'bottom'
                }
              ]
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

<style>
.graph-menu{
  background-color: transparent;
}
.tools-menu{
 width: 100%;
}
</style>
