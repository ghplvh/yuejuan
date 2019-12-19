<template>
  <div id="subject-main-2" v-loading="loading">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/exam/'+examId}">{{examInfo.examName}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/subjectMain/' + examId + '/' + examSubjectId}">
            <span>{{`${examGrade.gradeName}${examSubjectInfo.subjectName}(科目ID：${examSubjectId})`}}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right" style="color:#409EFF;"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-for="sub in examSubjectList">
                  <router-link :to="{ path: '/subjectMain/' + examId + '/' + sub.id}" :key="sub.id" v-if="sub.id !== examSubjectInfo.id">
                    <el-dropdown-item>{{examGrade.gradeName + sub.subjectName}}</el-dropdown-item>
                  </router-link>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="19">
        <el-row class="content-step" style="margin-bottom:10px;">
          <el-col :span="18">
            <h1 class="font-bold">阅卷监控</h1>
            <div class="font-xixi">监控阅卷中的进度和质量；</div>
          </el-col>
          <el-col :span="6" style="text-align:center;padding-top: 8px">
            <el-button type="primary" icon="el-icon-five-jindushijian" size="small" @click="goToProgress">进度</el-button>
            <!-- <el-button type="primary" icon="el-icon-five-anquan" size="small">质量</el-button> -->
          </el-col>
        </el-row>
        <el-row class="content-step">
          <el-row>
            <el-col :span="3">
              <h1 class="font-bold">阅卷设置</h1>
            </el-col>
            <!-- <el-col :span="21" class="fade">
              <div>
                我已使用好分数答题卡<el-switch v-model="useAnswerSheet"></el-switch>打开后，将大大简化考试设置的过程
              </div>
            </el-col> -->
          </el-row>
          <el-row class="content-progress">
            <el-steps direction="vertical" :active="activeStep" :space="85">
              <el-step icon="el-icon-circle-check">
                <div slot="description">
                  <el-row class="step-list">
                    <el-col :span="3" :offset="1">考生管理：</el-col>
                    <el-col :span="15">总上传考生人数为<span class="number">{{studentCount}}</span>人</el-col>
                    <el-col :span="5">
                      <router-link :to="{path:'/examDetail/'+examId}" class="btn deal-btn">设置考生</router-link>
                    </el-col>
                  </el-row>
                </div>
              </el-step>
              <el-step icon="el-icon-circle-check">
                <div slot="description">
                  <el-row class="step-list">
                    <el-col :span="3" :offset="1">题目设置：</el-col>
                    <el-col :span="15" v-if="examSubjectInfo.structureType === 1">
                      当前已设置答案，点击<router-link :to="{ path: '/settingAnswer/'+ examId +'/' + examSubjectId }">
                        <font color="#409EFF">查看</font>
                      </router-link>
                    </el-col>
                    <el-col :span="15" v-else>设置该科目的试卷结构和答案;</el-col>
                    <el-col :span="5">
                      <router-link :to="{path:'/examPaperStructure/'+examId+'/'+examSubjectId}" class="btn deal-btn">设置试卷结构</router-link>
                    </el-col>
                  </el-row>
                </div>
              </el-step>
              <el-step icon="el-icon-circle-check">
                <div slot="description">
                  <el-row class="step-list">
                    <el-col :span="3" :offset="1">模板设置：</el-col>
                    <el-col :span="15">需设置题目后才可设置</el-col>
                    <el-col :span="5">
                      <div v-if="examSubjectInfo.templateType === 1" @click="openTarget({path:'/setTemplate/'+examId+'/'+examSubjectId})" class="btn deal-btn">设置模板</div>
                      <div v-else-if="examSubjectInfo.structureType === 1" @click="openTarget({path:'/setTemplate/'+examId+'/'+examSubjectId})" class="btn active-btn">设置模板</div>
                      <div v-else class="btn fade-btn">设置模板</div>
                    </el-col>
                  </el-row>
                </div>
              </el-step>
              <el-step icon="el-icon-circle-check">
                <div slot="description">
                  <el-row class="step-list">
                    <el-col :span="3" :offset="1">题块与任务：</el-col>
                    <el-col :span="15">需完成题目设置后才可设置</el-col>
                    <el-col :span="5">
                      <router-link v-if="examSubjectInfo.frameType === 1" :to="{path:'/questionBlock/'+examId+'/'+examSubjectId}" class="btn deal-btn">设置题块和任务</router-link>
                      <router-link v-else-if="examSubjectInfo.structureType === 1" :to="{path:'/questionBlock/'+examId+'/'+examSubjectId}" class="btn active-btn">设置题块和任务</router-link>
                      <router-link v-else to="" class="btn fade-btn">设置题块和任务</router-link>
                    </el-col>
                  </el-row>
                </div>
              </el-step>
              <el-step icon="el-icon-circle-close">
                <div slot="description">
                  <el-row class="step-list">
                    <el-col :span="3" :offset="1">扫描答题卡：</el-col>
                    <el-col :span="15">需导入考生并完成模板后才可以设置</el-col>
                    <el-col :span="5">
                      <router-link v-if="examSubjectInfo.templateType === 1 && studentCount > 0 && examSubjectInfo.frameType === 1" :to="{path:`/scanPaper/${examId}/${examSubjectId}/${batchNumber}`}" class="btn active-btn">扫描答题卡</router-link>
                      <router-link v-else to="" class="btn fade-btn">扫描答题卡</router-link>
                    </el-col>
                  </el-row>
                </div>
              </el-step>
            </el-steps>
          </el-row>
          <el-row class="fade">
            注：完成以上设置方可进行阅卷
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="5" class="pdl-10">
        <el-row class="aside-right">
          <section>
            <h1 class="font-bold">开始阅卷</h1>
            <div class="fade">
              <p>完成左侧设置方可进行阅卷</p>
            </div>
          </section>
          <div class="mgt-20 text-center">
            <router-link to="" class="btn fade-btn">立即开始阅卷</router-link>
          </div>
        </el-row>
        <el-row class="aside-right mgt-10">
          <section>
            <h1 class="font-bold">原卷</h1>
            <div class="fade">
              <p>状态：原卷未上传</p>
            </div>
          </section>
          <div class="mgt-20 text-center">
            <router-link :to="{path: `/uploadYuanJuan/${examId}/${examSubjectId}`}" class="btn blue-btn">上传原卷</router-link>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import API from '../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      schoolCode: '',
      loading: false,
      examId: this.$route.params.examId,
      examInfo: {},
      examSubjectId: this.$route.params.examSubjectId,
      batchNumber: '',
      examSubjectInfo: {},
      examSubjectList: [],
      examGrade: {},
      useAnswerSheet: true,
      studentCount: 0,
      activeStep: 1
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.getExamById()
    this.getStudentCount()
  },
  methods: {
    // 获取考试信息
    async getExamById () {
      this.loading = true
      await this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        this.getGradeById()
        this.loading = false
      }).catch(() => { this.loading = false })
      await this.getExamSubject()
    },
    // 查询所有考试科目
    async getExamSubject () {
      this.loading = true
      await this.axios.post(API.EXAM_EXAMSUBJECT, { examId: this.examId }).then(res => {
        this.examSubjectList = res.data.data
        console.log(res.data.data)
        this.batchNumber = res.data.data[0].batchNumber
        this.examSubjectInfo = this.examSubjectList.filter(item => {
          return Number(item.id) === Number(this.examSubjectId)
        })[0]
        console.log(this.examSubjectInfo)
        if (this.examSubjectInfo.structureType === 1) {
          this.activeStep = 2
        }
        if (this.examSubjectInfo.templateType === 1) {
          this.activeStep = 3
        }
        if (this.examSubjectInfo.frameType === 1) {
          this.activeStep = 5
        }
      }).catch(() => { this.loading = false })
    },
    // 获取考试的年级
    async getGradeById () {
      this.loading = true
      await this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.examGrade = res.data.data[0]
      }).catch(() => { this.loading = false })
    },
    // 根据考试id查询本次考试的班级数和人数
    async getStudentCount () {
      this.loading = true
      await this.axios.post(API.EXAM_SELECTCOUNT + '/' + this.examId).then(res => {
        this.studentCount = parseInt(res.data.data.examineeCount)
      }).catch(() => { this.loading = false })
    },
    // 新窗口打开
    openTarget (router) {
      this.$router.push({ path: router.path })

      let routeUrl = this.$router.resolve(router)
      console.log(routeUrl)
      // window.open(routeUrl.href, '_blank')
    },
    goToProgress () {
      this.$router.push({ path: `/progress/${this.examId}/${this.examSubjectId}` })
    }
  },
  watch: {
    '$route' (to, from) {
      this.examId = to.params.examId
      this.examSubjectId = to.params.examSubjectId
      // console.log(this.$route.matched)
      this.getExamById()
    }
  }
}
</script>
<style lang="scss">
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
