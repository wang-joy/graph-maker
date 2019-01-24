<template>
  <div>
    <span class="graph-select-title">aaaa</span>
    <span class="graph-select-value">
      <el-select v-model="value6" placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      value6: ''
    }
  }
}
</script>

<style>
  .graph-select-title, .graph-select-value{
    display: inline-block;
    width: 100px;
    border-bottom: 1px solid #ccc;
    height: 30px;
    vertical-align: top;
    font-size: 14px;
  }
  .graph-select-value{
    border-left: 1px solid #ccc;
  }
  .graph-select-title{
    line-height: 28px;
    font-family: "微软雅黑", sans-serif;
    text-align: right;
    padding-right:10px; 
  }
</style>
