<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <div class="color-container" v-show="showPopper">
      <p :class="{selected: this.colorValue === 'NONE'}" @click="change('none')" v-if="transparent">无色</p>
      <p @click="showGradient" v-if="gradient">渐变</p>
      <color-picker class="color-picker" @pick='pick' :value='val' ref="cp"></color-picker>
      <div class="my-el-input">
        <el-input v-model="customInput"  size="mini"></el-input>
      </div>
      <div class="my-el-bts">
        <el-button size="mini" class="ok" @click="change">确定</el-button>
      </div>
    </div>
  </transition>
</template>
<script>
import ColorPicker from './ColorPicker'
import Popper from 'element-ui/src/utils/vue-popper'
import Locale from 'element-ui/src/mixins/locale'
export default {
  components: {ColorPicker},
  mixins: [Popper, Locale],
  data () {
    return {
      customInput: '',
      val: ''
    }
  },
  props: {
    'color-value': String,
    'gradient': Boolean,
    'transparent': Boolean
  },
  methods: {
    pick (val) {
      this.customInput = val
      this.val = val
    },
    change (val) {
      if (val === 'none') {
        this.customInput = ''
        this.val = null
        this.$emit('change', 'none')
      } else {
        const customInput = this.customInput.trim()
        if (customInput === '') {
          this.val = null
          this.$emit('change', 'none')
        } else {
          var reg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
          if (reg.test(customInput)) {
            this.val = customInput
            this.$emit('change', customInput)
          }
        }
      }
      this.$emit('input', false)
    },
    showGradient () {
      this.showPopper = false
      this.$emit('show-gradient', this.colorValue)
    }
  },
  mounted () {
    const val = this.colorValue === 'NONE' ? '' : this.colorValue
    if (val) {
      this.val = val === '' ? null : val
      this.customInput = val
    }
    this.$parent.popperElm = this.popperElm = this.$el
  },
  watch: {
    val: {
      immediate: true,
      handler () {
      }
    },
    showPopper (val) {
      if (val === true) {
        this.$nextTick(() => {
          const { cp } = this.$refs
          cp && cp.update()
        })
      }
    }
  }
}
</script>
<style scoped>
  .color-container{
    padding: 5px;
  }
  .color-container .color-picker{
    margin: 0 auto;
  }
  .color-container>p{
    height: 28px;
    line-height: 28px;
    padding-left: 20px;
    border-bottom: 1px solid rgb(228, 231, 237);
    cursor: pointer;
  }
  .color-container>p:hover,.color-container>p.selected{
    background-color: rgb(228, 231, 237);
  }
  .my-el-input{
    width:  100px;
    margin-top: 5px;
    margin-left: 5px;
    float: left;
  }
  .my-el-bts{
    width:  130px;
    margin-top: 5px;
    margin-left: 5px;
    float: right;
    padding-left:10px;
  }
  .my-el-bts .ok{
    float: right;
  }
</style>
