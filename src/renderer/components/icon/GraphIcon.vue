<!-- 自定义的 ObrIcon 组件 -->
<template>
	<svg aria-hidden="true" :style='styles'>
		<use :xlink:href="href"></use>
	</svg>
</template>
<script>
// 引入 iconfont.js 文件
// iconfont使用方法详见 http://www.iconfont.cn/
import '@/assets/js/iconfont.js'
// 前缀
const prefix = '#icon-pro-'
export default{
  name: 'obricon',
  props: {
    type: String,
    size: [Number, String]
  },
  computed: {
    href () {
      return `${prefix}${this.type}`
    },
    styles () {
      let style = {}
      if (this.size !== undefined) {
        style['width'] = `${this.size}px`
        style['height'] = `${this.size}px`
      }
      return style
    }
  }
}
</script>
<style scoped>
svg {
	width: 1.3em;
	height: 1.3em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>