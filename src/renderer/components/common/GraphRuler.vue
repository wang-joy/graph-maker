<template>
  <div :id="id" class="graph-ruler" :style="style"></div>
</template>

<script>
import ruler from '@/mixins/ruler'
import Cursor from '@/cursor/Cursor'
export default {
  props: {
    id: {
      required: true
    },
    vertical: Boolean,
    len: Number,
    cursor: {
      required: true,
      type: Cursor
    }
  },
  mixins: [ruler],
  mounted () {
    this.update()
  },
  computed: {
    style () {
      if (this.vertical) {
        return {
          width: '20px',
          height: 20 + this.len + 'px'
        }
      } else {
        return {
          height: '20px',
          width: 20 + this.len + 'px'
        }
      }
    }
  },
  watch: {
    len () {
      this.update()
    }
  }
}
</script>

<style>
.graph-ruler{
  display: inline-block;
}
</style>
