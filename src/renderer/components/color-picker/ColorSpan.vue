<template>
  <div class="color-span" :style="{backgroundColor: background}">
    <div class="color-span-white"></div>
    <div class="color-span-black"></div>
    <div class="color-span-cursor" :style="{top: cursorTop + 'px',left: cursorLeft + 'px'}">
      <div></div>
    </div>
  </div>
</template>

<script>
import draggable from 'element-ui/packages/color-picker/src/draggable'
export default {
  props: {
    color: {
      required: true
    }
  },
  computed: {
    colorValue () {
      const hue = this.color.get('hue')
      const value = this.color.get('value')
      return { hue, value }
    }
  },
  watch: {
    colorValue () {
      this.update()
    }
  },
  methods: {
    update () {
      const saturation = this.color.get('saturation')
      const value = this.color.get('value')
      const el = this.$el
      let { clientWidth: width, clientHeight: height } = el
      this.cursorLeft = saturation * width / 100
      this.cursorTop = (100 - value) * height / 100
      this.background = 'hsl(' + this.color.get('hue') + ', 100%, 50%)'
    },
    handleDrag (event) {
      const el = this.$el
      const rect = el.getBoundingClientRect()
      let left = event.clientX - rect.left
      let top = event.clientY - rect.top
      left = Math.max(0, left)
      left = Math.min(left, rect.width)
      top = Math.max(0, top)
      top = Math.min(top, rect.height)
      this.cursorLeft = left
      this.cursorTop = top
      this.color.set({
        saturation: left / rect.width * 100,
        value: 100 - top / rect.height * 100
      })
    }
  },
  mounted () {
    draggable(this.$el, {
      drag: (event) => {
        this.handleDrag(event)
      },
      end: (event) => {
        this.handleDrag(event)
      }
    })
    this.update()
  },
  data () {
    return {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)'
    }
  }
}
</script>

<style scoped>
  .color-span{
    position: relative;
  }
  .color-span .color-span-white, .color-span .color-span-black{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .color-span .color-span-white{
    background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
  }
  .color-span .color-span-black{
    background: linear-gradient(0deg,#000,transparent);
  }
  .color-span .color-span-cursor {
    position: absolute
  }
  .color-span .color-span-cursor>div {
    width: 4px;
    height: 4px;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);
    border-radius: 50%;
    transform: translate(-2px,-2px);
  }

</style>
