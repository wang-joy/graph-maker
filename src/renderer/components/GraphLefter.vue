<template>
  <div class="graph-left">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="shape in shapes"
        :key="shape.name"
        :title="shape.desc"
        :name="shape.name"
        class="my-el-collapse-item">
          <a v-for="(item, index) in shape.list"
            :key="index"
            @click.capture="createShape(item.type)"
            :title="item.desc"
            class="shape">
            <graph-icon :type="item.icon"></graph-icon>
          </a>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import GraphIcon from './icon/GraphIcon'
import {mapMutations, mapState} from 'vuex'
import types from '../store/mutations-type'
import SvgManager from '@/svg/manager/svg-manager'
import shapes from '@/svg/shape/index'
import ShapeUtils from '@/svg/utils/shape'
import ShapeEvts from '@/svg/evts/ShapeEvts'
export default {
  components: {GraphIcon},
  data () {
    return {
      activeNames: ['1'],
      shapes: [
        {
          name: '1',
          desc: '基本图形',
          list: [
            {
              type: 'rect',
              desc: '矩形',
              icon: 'zhengfangxing'
            },
            {
              type: 'circle',
              desc: '圆形',
              icon: 'yuanxing'
            },
            {
              type: 'ellipse',
              desc: '椭圆',
              icon: 'tuoyuan'
            },
            {
              type: 'line',
              desc: '直线',
              icon: 'zhixian'
            },
            {
              type: 'polyline',
              desc: '折线',
              icon: 'zhexian'
            },
            {
              type: 'polygon',
              desc: '多边形',
              icon: 'duobianxing'
            },
            {
              type: 'image',
              desc: '图片',
              icon: 'tupian'
            },
            {
              type: 'text',
              desc: '文本',
              icon: 'wenben'
            },
            {
              type: 'curve',
              desc: '曲线',
              icon: 'quxian'
            },
            {
              type: 'arc',
              desc: '弧线',
              icon: 'huxian'
            },
            {
              type: 'sector',
              desc: '扇形',
              icon: 'shanxing'
            },
            {
              type: 'arch',
              desc: '弓形',
              icon: 'gong'
            }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapMutations({setWidth: types.SET_LEFTER_WIDTH}),
    createShape (type) {
      if (this.svg) {
        let draw = this.svg.draw
        if (draw.remember('_mode') !== 'drawing') {
          if (type !== 'image') {
            draw.remember('_mode', 'drawstart')
            draw.remember('_type', type)
          } else {
            let shape = shapes[type]()
            this.svg.addShapes([shape])
            shape.loaded(ShapeEvts.imgLoaded)
            ShapeUtils.init(shape, type)
          }
        }
      }
    }
  },
  mounted () {
    let rect = this.$el.getBoundingClientRect()
    this.setWidth(rect.width)
  },
  computed: {
    ...mapState({
      svg: state => SvgManager.getById(state.active)
    })
  }
}
</script>
<style>
.my-el-collapse-item{
  background-color: #eee;
}
.my-el-collapse-item:first-child{
  margin-top: -1px;
  border-top: 1px solid #ccc;
}
.my-el-collapse-item .el-collapse-item__header{
  background-color: #eee;
  text-align: center;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  font-family: '微软雅黑', serif;
  padding-left: 40px;
  padding-right: 20px;
}
.my-el-collapse-item .el-collapse-item__header.is-active{
  border-bottom-color: transparent;
}
.my-el-collapse-item .el-collapse-item__wrap{
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
.my-el-collapse-item .el-collapse-item__content{
  padding-bottom: 15px;
}
</style>

<style scoped>
.graph-left{
  display: inline-block;
  width: 200px;
  height: 100%;
  background-color: rgb(240, 240, 240);
  overflow: auto;
}
.shape{
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-left: 15px;
  margin-top: 10px;
  cursor: pointer;
  box-sizing:border-box;
  border: 1px solid transparent;
}
.shape:nth-child(4n+1) {
  margin-left: 15px;
}
.shape:hover{
  background: #fff;
  border-color: #409EFF;
}
</style>
