<template>
  <div class="filter-bar">
    <div class="filter-row" v-for="(row,index) in data" :key="row.name">
      <div class="fl-select-title">{{row.name}}</div>
      <el-radio-group v-model="condition[index]" class="fl-select-con" @change="getCondition()">
        <el-radio v-for="opt in row.options" :key="opt.label" label="opt.label" size="mini" border></el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {
      condition: []
    }
  },
  methods: {
    getCondition () {
      this.$emit('onChange', this.condition)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
