<template>
  <div id="check-paper-block" v-loading="loading">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>待阅题块</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-card shadow="always" class="block-list">
      <div slot="header">
        <span>待阅题块</span>
      </div>
      <el-card class="block-item" v-for="block in blockList" :key="block.blockId">
        <el-row>
          <span class="block-title">{{block.titleBlockName}}</span>
          <el-tag size="small" v-if="block.appraiseReadWay">{{getTaskWayNameById(block.appraiseReadWay)}}</el-tag>
          <el-tag size="small" v-if="block.distributionType">{{getTaskWayNameById(block.distributionType)}}</el-tag>
        </el-row>
        <el-row>
          <el-col :span="8">已阅数：<span class="paper-number">{{block.isExamine}}</span></el-col>
          <el-col :span="8">待阅数：<span class="paper-number">{{block.noExamine}}</span></el-col>
          <el-col :span="8">
            <!-- <el-button type="primary" size="small" @click="toCheckPaper(block)" :disabled="block.isExamine >= block.noExamine">去阅卷</el-button> -->
            <el-button type="primary" size="small" @click="toCheckPaper(block)" :disabled="block.noExamine === 0">去阅卷</el-button>
            <el-button size="small" class="check-status" plain v-if="block.noExamine === 0">阅卷完成</el-button>
          </el-col>
        </el-row>
      </el-card>
      <div class="nodata-box">暂无待阅题块</div>
    </el-card>
  </div>
</template>
<script>
import API2 from '../api/api2.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      examId: this.$route.params.examId,
      examineId: this.$route.params.examineId,
      examSubjectId: this.$route.params.examSubjectId,
      distributionTypes: [
        { id: 1, name: '平均分配' },
        { id: 2, name: '效率优先' }
        // { id: 3, name: '定量分配' }
      ],
      readWayList: [
        { id: 1, name: '单评' },
        { id: 2, name: '双评' },
        { id: 3, name: '多评' }
      ],
      loading: false,
      blockList: []
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  mounted () {
    this.getBlockList()
  },
  methods: {
    getBlockList () {
      this.loading = true
      let data = {
        examSubjectId: this.examSubjectId,
        examineId: this.examineId,
        status: 0,
        userId: this.adminInfo.teacherInfo.id
      }
      this.axios.post(API2.APPEXAMEXAMINE_GETDCEXAMEXAMINEBLOCKBYUSERID, data).then(res => {
        this.blockList = res.data.data
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据ID获取评阅方式
    getReadWayNameById (id) {
      let way = this.readWayList.find(item => {
        return parseInt(id) === item.id
      })
      return way ? way.name : '-'
    },
    // 根据ID获取分配方式
    getTaskWayNameById (id) {
      let way = this.distributionTypes.find(item => {
        return parseInt(id) === item.id
      })
      return way ? way.name : '-'
    },
    toCheckPaper (block) {
      this.$router.push({ path: `/checkPaper/${this.examId}/${this.examSubjectId}/${this.examineId}/${block.blockId}` })
    }
  }
}
</script>
<style lang="scss">
#check-paper-block {
  .bread-crumb {
    background-color: #ffffff;
    height: 40px;
    padding: 0 30px;
    margin-bottom: 15px;
    line-height: 40px;
    .el-breadcrumb {
      line-height: 40px;
      font-size: 12px !important;
    }
    .operation-video {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 12px;
      a {
        color: #ffa100;
        opacity: 0.5;
        border: 1px solid #ffa100;
        border-radius: 100px;
        padding-left: 10px;
        box-sizing: border-box;
        width: 90px;
        height: 26px;
        display: flex;
        align-items: center;
        i {
          font-size: 16px;
        }
      }
    }
  }
  .block-list {
    .block-item {
      margin-bottom: 20px;
      .block-title {
        color: #000000;
        font-size: 18px;
        margin-right: 15px;
      }
      .el-tag {
        margin-right: 15px;
      }
      .el-row {
        margin-top: 15px;
        &:first-child {
          margin-top: 0;
        }
        .el-col {
          &:last-child {
            text-align: right;
          }
        }
      }
      .paper-number {
        color: #409eff;
      }
      .check-status {
        cursor: unset;
        color: #409eff;
        border: 1px solid #409eff;
      }
    }
    .nodata-box {
      text-align: center;
      color: #999;
    }
  }
}
</style>
