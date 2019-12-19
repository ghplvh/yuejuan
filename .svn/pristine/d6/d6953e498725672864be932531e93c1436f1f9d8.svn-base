<template>
  <div>
    <el-row type="flex" align="center" justify="center">
      <el-col :span="2">
        <el-button type="primary" @click="prevPage()">上一页</el-button>
      </el-col>
      <el-col :span="1"><span>题号：</span></el-col>
      <el-col :span="2">
        <el-input v-model="pageIndex"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="period">
          <el-option v-for="p in periods" :key="p" :label="p.name" :value="p.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="nextPage()">下一页</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="randomPage()">随机页</el-button>
      </el-col>
    </el-row>
    <el-row id="question">
      <iframe ref="iframe" id="if-box" name="iframe" :src="href+'?id='+pageIndex+'&period='+period"></iframe>
      <!-- period='+period -->
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      periods: [
        { id: 1, name: '小学' },
        { id: 2, name: '初中' },
        { id: 3, name: '高中' }
      ],
      period: 1,
      pageIndex: 0,
      // 请求地址
      href: 'http://192.168.99.227:8080/ssm-crud/subjectInfoHigh'
    }
  },
  mounted () {
    // setInterval(() => {
    //   this.randomPage()
    // }, 15000)
    this.randomPage()
  },
  methods: {
    nextPage () {
      this.pageIndex = this.paggneIndex * 1 + 1
      this.$refs.iframe.contentWindow.showAnswer()
      console.log(this.$refs.iframe.contentWindow)
    },
    prevPage () {
      this.pageIndex = this.pageIndex - 1
    },
    randomPage () {
      // 根据学级改题号范围
      if (this.period === 1) {
        this.pageIndex = this.sum(1, 630446)
      }
      if (this.period === 2) {
        this.pageIndex = this.sum(1, 3095954)
      }
      if (this.period === 3) {
        this.pageIndex = this.sum(1, 1606378)
      }
    },
    sum (m, n) {
      var num = Math.floor(Math.random() * (m - n) + n)
      return num
    }
  }
}
</script>
<style lang="scss">
.el-col {
  display: flex;
  align-items: center;
}
iframe {
  width: 100%;
  height: 10000px;
}
</style>
