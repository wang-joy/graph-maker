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
          :title="btn.title" >
            <graph-icon :type="btn.icon"></graph-icon>
          </el-button>
      </el-button-group>
    </template>
  </div>
</template>

<script>
import GraphIcon from '../icon/GraphIcon'
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
              icon: 'xinjian'
            },
            {
              title: '打开文件',
              click: 'createFile',
              icon: 'dakai'
            },
            {
              title: '保存文件',
              click: 'createFile',
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
              icon: 'quxiaoshangcicaozuo'
            },
            {
              title: '恢复上次操作',
              click: 'createFile',
              icon: 'huifushangcicaozuo'
            },
            {
              title: '剪切',
              click: 'createFile',
              icon: 'jianqie'
            },
            {
              title: '复制',
              click: 'createFile',
              icon: 'kaobei'
            },
            {
              title: '粘贴',
              click: 'createFile',
              icon: 'niantie'
            },
            {
              title: '删除',
              click: 'createFile',
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
              icon: 'zuoduiqi'
            },
            {
              title: '右对齐',
              click: 'shuipingjuzhong',
              icon: 'youduiqi'
            },
            {
              title: '上对齐',
              click: 'createFile',
              icon: 'shangduiqi'
            },
            {
              title: '下对齐',
              click: 'xiaduiqi',
              icon: 'xiaduiqi'
            },
            {
              title: '水平居中',
              click: 'createFile',
              icon: 'shuipingjuzhong'
            },
            {
              title: '垂直居中',
              click: 'createFile',
              icon: 'chuizhijuzhong'
            },
            {
              title: '等宽',
              click: 'createFile',
              icon: 'dengkuan'
            },
            {
              title: '等高',
              click: 'createFile',
              icon: 'denggao'
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
              icon: 'yidaozuishang'
            },
            {
              title: '上移一层',
              click: 'shuipingjuzhong',
              icon: 'shangyiyiceng2'
            },
            {
              title: '下移一层',
              click: 'createFile',
              icon: 'xiayiyiceng2'
            },
            {
              title: '移到最下',
              click: 'xiaduiqi',
              icon: 'yidaozuixia1'
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
              icon: 'shuipingfanzhuan'
            },
            {
              title: '垂直翻转',
              click: 'shuipingjuzhong',
              icon: 'chuizhifanzhuan'
            },
            {
              title: '顺时针旋转90度',
              click: 'createFile',
              icon: 'shunshizhen'
            },
            {
              title: '逆时针旋转90度',
              click: 'xiaduiqi',
              icon: 'nishizhen'
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
              icon: 'huifuyuanshichicun'
            },
            {
              title: '放大',
              click: 'shuipingjuzhong',
              icon: 'fangda'
            },
            {
              title: '缩小',
              click: 'createFile',
              icon: 'suoxiao'
            },
            {
              title: '逆时针旋转90度',
              click: 'xiaduiqi',
              icon: 'nishizhen'
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
              icon: 'jiacub'
            },
            {
              title: '文字倾斜',
              click: 'shuipingjuzhong',
              icon: 'xietii'
            },
            {
              title: '文字左对齐',
              click: 'createFile',
              icon: 'zuoduiqi1'
            },
            {
              title: '文字居中对齐',
              click: 'zhongduiqi',
              icon: 'zhongduiqi'
            },
            {
              title: '文字右对齐',
              click: 'zhongduiqi',
              icon: 'youduiqi1'
            },
            {
              title: '文字颜色',
              click: 'zhongduiqi',
              icon: 'wenziyanse'
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
              icon: 'tianchongse'
            },
            {
              title: '线条颜色',
              click: 'shuipingjuzhong',
              icon: 'xiantiaoyanse'
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          btns: [
            {
              title: '合并元件',
              click: 'createFile',
              icon: 'zuhe1'
            },
            {
              title: '拆分元件',
              click: 'shuipingjuzhong',
              icon: 'fenzu'
            },
            {
              title: '全部选中',
              click: 'shuipingjuzhong',
              icon: 'quanbuxuanzhong'
            },
            {
              title: '反向选中',
              click: 'shuipingjuzhong',
              icon: 'fanxiangxuanzhong'
            }
          ]
        }
      ]
    }
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
