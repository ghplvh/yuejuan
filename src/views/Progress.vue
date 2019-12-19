<template>
  <div id="subject-main-2" v-loading="loading">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/exam/'+examId}">{{examInfo.examName}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/subjectMain/' + examId + '/' + examSubjectId}">{{`${examGrade.gradeName}(科目ID：${examSubjectId})`}}</el-breadcrumb-item>
          <el-breadcrumb-item >查看阅卷进度</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="progress">
      <el-tab-pane label="按题块查看" name="first">
        <el-collapse accordion>
          <el-collapse-item  v-for="(item, index) in blockData" :key="index" class="block">
            <template slot="title">
              <div style="flex: 24;">
                <el-row class="row">
                  <el-col :span="5" class="leftCol">
                    <div class="titleFont">{{item.titleBlockName}}(总分{{item.score}}分)</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="titleFont">题块内容：
                      <span v-for="(block, i) in item.blockContent" :key="i">{{block}}&nbsp;&nbsp;</span>
                    </div>
                  </el-col>
                  <el-col :span="2"></el-col>
                </el-row>
                <el-row class="bottom-nav">
                  <el-col :span="5">&nbsp;</el-col>
                  <el-col :span="10">
                    <el-row>
                      <el-col :span="4">总进度</el-col>
                      <el-col :span="20" style="padding-top: 16px;"><el-progress :stroke-width="12" :percentage="item.sumRate" ></el-progress></el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <span style="margin-right: 10px;">已阅{{item.isExamine}}</span>
                    <span>未阅{{item.noExamine}}</span>
                  </el-col>
                </el-row>
              </div>
            </template>
            <div class="blockDetail">
              <div class="schoolProgress">
                <el-row class="teacherProgress" v-for="(etrList, index) in item.etrList" :key="index">
                  <el-col span="4">{{etrList.schoolName}}</el-col>
                  <el-col span="4">{{etrList.teacherName}}</el-col>
                  <el-col span="10"><el-progress :stroke-width="12" :percentage="etrList.rate" ></el-progress></el-col>
                  <el-col span="6">进度：{{etrList.isExamine}}/{{etrList.isExamine + etrList.noExamine}}</el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <!-- <el-tab-pane label="按题块查看" name="first">
        <div class="showBlocksDetailDiv" v-for="(item, index) in blockData" :key="index">
          <div class="row-block">
            <el-row class="row">
              <el-col :span="5" class="leftCol">
                <div>{{item.titleBlockName}}(总分{{item.score}}分)</div>
              </el-col>
              <el-col :span="16">
                <div>题块内容：
                  <span v-for="(block, i) in item.blockContent" :key="i">{{block}}&nbsp;&nbsp;</span>
                </div>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-row class="bottom-nav">
              <el-col :span="5">&nbsp;</el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="4">总进度</el-col>
                  <el-col :span="20"><el-progress :stroke-width="12" :percentage="item.sumRate" ></el-progress></el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <span style="margin-right: 10px;">已阅{{item.isExamine}}</span>
                <span>未阅{{item.noExamine}}</span>
              </el-col>
              <el-col :span="3" style="color: #353b45;"><div @click="showHidden(index)" id="index">展开&nbsp;<i class="el-icon-arrow-down rote"></i></div></el-col>
            </el-row>
            <div class="blockDetail">
              <div class="schoolProgress">
                <el-row class="teacherProgress" v-for="(etrList, index) in item.etrList" :key="index">
                  <el-col span="4">{{etrList.schoolName}}</el-col>
                  <el-col span="4">{{etrList.teacherName}}</el-col>
                  <el-col span="10"><el-progress :stroke-width="12" :percentage="etrList.rate" ></el-progress></el-col>
                  <el-col span="6">进度：{{etrList.isExamine}}/{{etrList.isExamine + etrList.noExamine}}</el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="按班级查看" name="second">
        <div class="select">
          <span>选择学校: </span>
          <el-select v-model="schoolName" placeholder="请选择" size="small">
            <el-option
              v-for="(item, index) in schoolList"
              :key="index"
              :label="item.schoolName"
              :value="item.schoolId">
            </el-option>
          </el-select>
        </div>
        <div class="showBlocksDetailDiv" v-for="(item, index) in classData" :key="index">
          <div class="row-block">
            <el-row class="bottom-nav">
              <el-col :span="5">{{item.className}}(考试人数：{{item.classStuNum || 0}})</el-col>
              <el-col :span="13">
                <el-row>
                  <el-col :span="4">总进度</el-col>
                  <el-col :span="20"><el-progress :stroke-width="12" :percentage="item.sumRate || 0" ></el-progress></el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <span style="margin-right: 10px;">已阅{{item.isExamine || 0}}</span>
                <span>未阅{{item.noExamine || 0}}</span>
              </el-col>
            </el-row>
            <div class="blockDetail">
              <div class="schoolProgress">
                <el-row class="teacherProgress" v-for="(etrList, index) in item.etrList" :key="index">
                  <el-col span="4">{{etrList.schoolName || 0}}</el-col>
                  <el-col span="4">{{etrList.teacherName || 0}}</el-col>
                  <el-col span="10"><el-progress :stroke-width="12" :percentage="etrList.rate || 0" ></el-progress></el-col>
                  <el-col span="6">进度：{{etrList.isExamine || 0}}/{{etrList.isExamine + etrList.noExamine || 0}}</el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import API from '../api/api.js'
import API2 from '../api/api2.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      schoolCode: '',
      examId: this.$route.params.examId,
      examInfo: {},
      examGrade: {},
      examSubjectId: this.$route.params.examSubjectId,
      activeName: 'first',
      blockData: [],
      classData: [],
      schoolList: [],
      schoolName: ''
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.schoolName = this.schoolCode || ''
    this.getSchoolList()
    this.getExamById()
  },
  methods: {
    // 根据考试ID获取学校列表
    getSchoolList () {
      this.loading = true
      console.log(API2.ADMIN_GETSCHOOLLIST)
      this.axios.post(API2.ADMIN_GETSCHOOLLIST, { examId: this.examId }).then(res => {
        this.schoolList = res.data.data
      }).catch(() => { this.loading = false })
    },
    // 获取考试信息
    async getExamById () {
      this.loading = true
      await this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        this.getGradeById()
        this.loading = false
      }).catch(() => { this.loading = false })
      await this.getBlockProgress()
    },
    // 获取考试的年级
    async getGradeById () {
      this.loading = true
      await this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.examGrade = res.data.data[0]
      }).catch(() => { this.loading = false })
    },
    // 获取题块阅卷进度
    async getBlockProgress () {
      this.loading = true
      console.log(API2.ADMIN_GETBLOCKBYEXAMSUBJECTID)
      await this.axios.post(API2.ADMIN_GETBLOCKBYEXAMSUBJECTID, { examSubjectId: this.examSubjectId }).then(res => {
        this.blockData = res.data.data
        this.getClassProgress()
      }).catch(() => { this.loading = false })
    },
    // 获取班级阅卷进度
    async getClassProgress () {
      this.loading = true
      await this.axios.post(API2.ADMIN_GETCLASSBYEXAMSUBJECTID, { examSubjectId: this.examSubjectId, examId: this.examId, schoolCode: this.schoolName }).then(res => {
        this.classData = res.data.data
      }).catch(() => { this.loading = false })
    },
    // showHidden
    showHidden (index) {
      // let div = document.getElementById(index)
      // console.log(div)
    }
  },
  watch: {
    '$route' (to, from) {
    }
  }
}
</script>
<style lang="scss">
.progress {
  .el-tabs__header {
    padding: 5px 30px;
    margin-bottom: 0;
    background-color: #fff;
  }
  .select {
    padding: 10px 30px;
    margin-bottom: 0;
    background-color: #fff;
    .el-select {
      margin-left: 10px;
    }
  }
  .showBlocksDetailDiv {
    padding: 30px;
    background-color: #fff;
    margin-bottom: 20px;
    color: #8d8d8d;
    .row-block {
      box-shadow: 0 0 10px 0 rgba(32,151,255,.2);
      .row {
        height: 45px;
        line-height: 45px;
        color: #000;
        background-color: #f9fafc;
        .leftCol {
          padding-left: 20px;
        }
      }
      .bottom-nav {
        height: 46px;
        padding: 20px 0 20px 20px;
        .rote {
          transition: transform 0.5s;
        }
        .rote:active {
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -o-transform: rotate(180deg);
        }
      }
      .blockDetail {
        margin-left: 280px;
        margin-top: 10px;
        line-height: 20px;
        padding-top: 10px;
        .schoolProgress {
          border-top: 1px solid #e1e1e1;
          margin-top: 10px;
          padding-top: 10px;
          padding-bottom: 10px;
          .teacherProgress {
            margin-top: 10px;
          }
        }
      }
    }
    .el-progress-bar {
      width: 80%;
    }
    .el-progress__text {
      font-size: 12px !important;
    }
  }
  .blockDetail {
    margin-left: 280px;
    margin-top: 10px;
    line-height: 20px;
    padding-top: 10px;
    .schoolProgress {
      border-top: 1px solid #e1e1e1;
      margin-top: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      .teacherProgress {
        margin-top: 10px;
      }
    }
  }
  .el-collapse-item__wrap {
    box-shadow: 0 0 10px 0 rgba(32,151,255,.2);
  }
  // .el-tabs__header {
  //   padding: 0 30px;
  //   background-color: #fff;
  //   height: 65px;
  //   line-height: 65px;
  //   margin-bottom: 16px;
  // }
  // .collapse {
  //   padding: 0 30px 30px;
  //   background-color: #fff;
  //   color: #8d8d8d;
  //   .el-collapse-item__header {
  //     border: none;
  //     display: block;
  //     height: auto;
  //   }
  //   .progressItem {
  //     margin-top: 50px;
  //     box-shadow: 0 0 10px 0 rgba(32,151,255,.2);
  //     padding-bottom: 20px;
  //   }
  // }
}
.block {
  padding: 30px;
  background-color: #fff;
  margin-bottom: 20px;
  color: #8d8d8d;
}
.bottom-nav {
  font-size: 12px;
  color: #8d8d8d;
}
.el-progress-bar {
  width: 80%;
}
.el-progress__text {
  font-size: 12px !important;
}
.el-collapse-item__header {
  height: auto;
  box-shadow: 0 0 10px 0 rgba(32,151,255,.2);
  padding: 0 20px;
}
.el-collapse {
  border: 0;
}
.font-xixi {
  font-size: 12px;
  color: #8d8d8d;
  line-height: 30px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu {
  .el-dropdown-menu__item {
    font-size: 12px;
    padding: 0 15px;
    line-height: 30px;
  }
}
#subject-main-2 {
  font-size: 14px;
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
  .content-step {
    background-color: #ffffff;
    padding: 20px;
    .content-progress {
      margin-top: 30px;
      .el-step {
        .is-finish {
          color: #13d1be;
        }
        .el-step__icon-inner {
          font-size: 18px;
        }
        .el-step__description {
          padding-right: 0;
        }
      }
      .step-list {
        font-size: 14px;
        color: #333;
        .el-col-5 {
          text-align: center;
        }
      }
    }
  }
  .font-bold {
    font-weight: 700;
  }
  .fade {
    color: #8d8d8d;
    font-size: 12px;
    .el-switch {
      padding: 0 5px;
    }
  }
  .number {
    color: #2097ff;
  }
  .btn {
    width: 120px;
    height: 34px;
    border-radius: 3px;
    display: inline-block;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
  }
  .deal-btn {
    border: 1px solid #13d1be;
    color: #13d1be;
  }
  .active-btn {
    background: #13d1be;
    color: #fff;
  }
  .fade-btn {
    background: #d4dee7;
    color: #fff;
    cursor: not-allowed;
  }
  .blue-btn {
    background: #2097ff;
    color: #fff;
  }
  .aside-right {
    padding: 20px;
    background: #fff;
    p {
      line-height: 30px;
    }
  }
}
</style>
