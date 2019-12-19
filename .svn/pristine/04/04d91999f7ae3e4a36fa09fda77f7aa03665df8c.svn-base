<template>
  <el-row id="home">
    <el-col class="left-bar" :span="19">
      <el-badge class="task-number" :value="awaitReadList.length" />
      <el-tabs class="tab-info" v-model="activeName">
        <el-tab-pane label="考试管理" name="examManager" v-if="this.menuList.includes('examinationManagement')">
          <el-card v-loading="loading">
            <el-row class="filter-bar">
              <el-col class="filter-item" :span="5">
                <label>年级：</label>
                <el-select v-model="filterGrade" placeholder="" size="small" value-key="id" @change="choiceGrade">
                  <el-option label="全部" :value="{}"></el-option>
                  <el-option v-for="(item,index) in gradeList" :key="index" :label="item.gradeName" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col class="filter-item" :span="8">
                <label>考试开始月份：</label>
                <el-date-picker v-model="filterMonth" type="month" placeholder="选择月" size="small" @change="choiceMonth"></el-date-picker>
              </el-col>
              <el-col class="filter-item" :span="6">
                <label>考试类别：</label>
                <el-select v-model="filterExamType" placeholder="" size="small" @change="choiceRange">
                  <el-option v-for="(item,index) in examRangeList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col class="filter-item" :span="5">
                <el-input class="search-input" size="small" placeholder="请输入考试名称" suffix-icon="el-icon-search" v-model="filterSearch" @keyup.enter.native="choiceName"></el-input>
              </el-col>
            </el-row>
            <template v-for="exam in examList">
              <el-row class="exam-stage" :key="exam.id">
                <el-row class="exam-stage-title">
                  <div class="title-logo">
                    <img v-if="getExamStatus(exam.examDateFrom,exam.examDateTo) === 'before'" src="../assets/icon/exam-before.png" alt="考前">
                    <img v-if="getExamStatus(exam.examDateFrom,exam.examDateTo) === 'current'" src="../assets/icon/exam-current.png" alt="考中">
                    <img v-if="getExamStatus(exam.examDateFrom,exam.examDateTo) === 'after'" src="../assets/icon/exam-after.png" alt="考后">
                  </div>
                  <div class="title-detail">
                    <div class="title-name">
                      <router-link :to="{path: '/exam/'+ exam.id}">{{exam.examName}}</router-link>
                      <el-tag type="" size="mini" v-if="getExamType(exam.examType)">{{getExamType(exam.examType)}}</el-tag>
                      <el-tag type="success" size="mini" v-if="getExamRange(exam.examRange)">{{getExamRange(exam.examRange)}}</el-tag>
                      <el-tag type="warning" size="mini" v-if="getYuejuanAway(exam.checkMode)">{{getYuejuanAway(exam.checkMode)}}</el-tag>
                    </div>
                    <div class="exam-time-create">
                      <p><i class="el-icon-time"></i><span>考试时间: {{exam.dateFrom}}-{{exam.dateTo}}</span></p>
                      <p><i class="el-icon-setting"></i><span>创建人: {{exam.userName}}</span></p>
                      <p><i class="el-icon-info"></i><span>考试ID: {{exam.id}}</span></p>
                    </div>
                  </div>
                </el-row>
                <el-row class="exam-stage-detail">
                  <template v-if="exam.createList.length > 0">
                    <div class="detail-stage">
                      <div class="stage-title">
                        <span class="dot"></span><span class="text">创建阶段</span>
                      </div>
                      <div class="stage-subjects">
                        <router-link v-for="subject in exam.createList" :key="subject.id" :to="{path: '/subjectMain/'+exam.id+'/'+subject.id}">{{getGradeById(exam.gradeId) + subject.subjectName}}</router-link>
                      </div>
                    </div>
                  </template>
                  <template v-if="exam.seeList.length > 0">
                    <div class="detail-stage">
                      <div class="stage-title">
                        <span class="dot"></span><span class="text">阅卷阶段</span>
                      </div>
                      <div class="stage-subjects">
                        <router-link v-for="subject in exam.seeList" :key="subject.id" :to="{path: '/subjectMain/'+exam.id+'/'+subject.id}">{{getGradeById(exam.gradeId) + subject.subjectName}}</router-link>
                      </div>
                    </div>
                  </template>
                  <template v-if="exam.issueList.length > 0">
                    <div class="detail-stage">
                      <div class="stage-title">
                        <span class="dot"></span><span class="text">已发布阶段</span>
                      </div>
                      <div class="stage-subjects">
                        <router-link v-for="subject in exam.issueList" :key="subject.id" :to="{path: '/subjectMain/'+exam.id+'/'+subject.id}">{{getGradeById(exam.gradeId) + subject.subjectName}}</router-link>
                      </div>
                    </div>
                  </template>
                </el-row>
              </el-row>
            </template>
            <el-row class="page-row">
              <el-pagination background @prev-click="prevPage" @next-click="nextPage" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="阅卷任务" name="seeTask" v-if="this.menuList.includes('readingTasks')">
          <el-card>
            <el-row class="filter-bar">
              <el-col class="filter-item" :span="5">
                <label>年级：</label>
                <el-select v-model="filterGrade" placeholder="" size="small" value-key="id" @change="yueChoiceGrade">
                  <el-option label="全部" :value="{}"></el-option>
                  <el-option v-for="(item,index) in gradeList" :key="index" :label="item.gradeName" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col class="filter-item" :span="8">
                <label>考试开始月份：</label>
                <el-date-picker v-model="filterMonth" type="month" placeholder="选择月" size="small" @change="yueChoiceMonth"></el-date-picker>
              </el-col>
              <el-col class="filter-item" :span="6">
                <label>阅卷状态：</label>
                <el-select v-model="filterExamType" placeholder="" size="small" @change="yueChoiceRange">
                  <el-option v-for="(item,index) in status" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col class="filter-item" :span="5">
                <el-input class="search-input" size="small" placeholder="请输入考试名称" v-model="filterSearch" @keyup.enter.native="yueChoiceName">
                  <el-button slot="append" icon="el-icon-search" @click="yueChoiceName"></el-button>
                </el-input>
              </el-col>
            </el-row>
            <el-row class="paper-item" v-for="paper in awaitReadList" :key="paper.id">
              <el-row type="flex" align="middle" justify="space-between">
                <el-col :span="14" class="exam-name">{{paper.examName}}</el-col>
                <el-col :span="9" :offset="1" class="name-right">
                  <el-tag size="mini" v-if="getExamRange(paper.examRange)">{{getExamRange(paper.examRange)}}</el-tag>
                  <el-tag size="mini" v-if="getExamType(paper.examType)">{{getExamType(paper.examType)}}</el-tag>
                  <span class="exam-time">{{paper.examDateFrom}}&nbsp;{{paper.examDateTo}}</span>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle" justify="space-between">
                <el-col :span="12" class="subject-name">{{paper.gradeName + paper.examSubjectDesc}}</el-col>
                <el-col :span="11" :offset="1" class="subject-right">
                  <el-button type="primary" size="small" @click="toCheckPaperBlock(paper)" :disabled="paper.status">待阅题块</el-button>
                </el-col>
              </el-row>
            </el-row>
            <!-- <el-row class="page-row">
              <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="pageTotal"></el-pagination>
            </el-row> -->
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col class="right-bar" :span="5">
      <div class="help">
        <div class="pdf">
          <div class="title-box">
            <span class="help-title">文档中心</span>
            <a href="javascript:void(0)" class="help-more">更多</a>
          </div>
          <a href="javascript:void(0)" class="pdf-link">
            <img src="../assets/icon/pdf.png" alt="">
            <span>阅卷产品使用说明书</span>
            <i class="el-icon-download"></i>
          </a>
        </div>
        <div class="video">
          <div class="title-box">
            <span class="help-title">操作视频</span>
            <a href="javascript:void(0)" class="help-more">更多</a>
          </div>
          <a href="javascript:void(0)" class="video-link">
            <img src="../assets/icon/pdf.png" alt="">
          </a>
        </div>
        <div class="question">
          <div class="title-box">
            <span class="help-title">常见问题</span>
            <a href="javascript:void(0)" class="help-more">更多</a>
          </div>
          <ul>
            <a href="javascript:void(0)">
              <li>大量客观题异常，如何处理？</li>
            </a>
            <a href="javascript:void(0)">
              <li>大量定位点异常是什么原因？</li>
            </a>
            <a href="javascript:void(0)">
              <li>如何框选符合标准的定位点？</li>
            </a>
            <a href="javascript:void(0)">
              <li>答题卡模式下做模板失败如何处理？</li>
            </a>
            <a href="javascript:void(0)">
              <li>阅卷中，如何修改题块划分？</li>
            </a>
          </ul>
        </div>
        <div class="video">
          <div class="title-box">
            <span class="help-title">相关动态</span>
            <a href="#" class="help-more">更多</a>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import API from '../api/api.js'
import API2 from '../api/api2.js'
import Utils from '../utils/Utils.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      schoolCode: '',
      activeName: 'examManager',
      filterGrade: {},
      filterMonth: '',
      filterExamType: 0,
      filterSearch: '',
      gradeList: [],
      loading: false,
      examTypeList: [
        { id: 0, name: '普通' },
        { id: 1, name: '月考' },
        { id: 2, name: '期中' },
        { id: 3, name: '期末' },
        { id: 4, name: '竞赛' }
      ],
      yueJuanWayList: [
        { id: 0, name: '线上阅卷' },
        { id: 1, name: '先阅后扫' }
      ],
      examModeList: [
        { id: 0, name: '行政班' },
        { id: 1, name: '分层走班（教学班）' }
      ],
      examRangeList: [
        { id: '', name: '全部' },
        { id: 0, name: '校内' },
        { id: 1, name: '联考' },
        { id: 2, name: '统考' }
      ],
      status: [
        { id: 0, name: '未阅卷' },
        { id: 1, name: '已阅卷' }
      ],
      examList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      awaitReadList: [],
      queryData: { // 考试查询
        schoolCode: '',
        pageIndex: '',
        pageSize: '',
        gradeId: '', // 年级ID
        examDateFrom: '', // 考试开始的年份
        examRange: '', // 考试类别
        examName: '' // 考试名称
      },
      yueQueryData: { // 考试查询
        schoolCode: '',
        userId: '',
        status: 0,
        pageIndex: '',
        pageSize: '',
        gradeId: '', // 年级ID
        examDateFrom: '', // 考试开始的年份
        examName: '' // 考试名称
      }
    }
  },
  computed: {
    ...mapState(['adminInfo', 'menuList'])
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    // this.menuDispose(this.adminInfo.dmlist)
    this.getGrades()
    this.getExamList()
    this.getPaperList()
  },
  methods: {
    /**
     *  考试查询
     */
    // 根据下拉框选择年级查找考试
    choiceGrade (value) {
      this.queryData.gradeId = value.id || ''
      this.queryData.schoolCode = this.schoolCode
      this.queryData.pageIndex = this.currentPage
      this.queryData.pageSize = this.pageSize
      this.loading = true
      this.axios.post(API.EXAM_HOMEEXAM, this.queryData).then(res => {
        let list = res.data.data.list
        list.map((item, index) => {
          item.dateFrom = Utils.formatTime(new Date(item.examDateFrom), true, '/')
          item.dateTo = Utils.formatTime(new Date(item.examDateTo), true, '/')
          item.createList = []
          item.seeList = []
          item.issueList = []
          item.subjectDtos.forEach(subject => {
            if (subject.subjectStage === 0) {
              item.createList.push(subject)
            }
            if (subject.subjectStage === 1) {
              item.seeList.push(subject)
            }
            if (subject.subjectStage === 2) {
              item.issueList.push(subject)
            }
          })
        })
        this.examList = list
        this.total = res.data.data.total
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据下拉框选择月份查找考试
    choiceMonth (value) {
      this.queryData.examDateFrom = Utils.formatTime(value).substring(0, 10)
      this.queryData.schoolCode = this.schoolCode
      this.queryData.pageIndex = this.currentPage
      this.queryData.pageSize = this.pageSize
      this.loading = true
      this.axios.post(API.EXAM_HOMEEXAM, this.queryData).then(res => {
        let list = res.data.data.list
        list.map((item, index) => {
          item.dateFrom = Utils.formatTime(new Date(item.examDateFrom), true, '/')
          item.dateTo = Utils.formatTime(new Date(item.examDateTo), true, '/')
          item.createList = []
          item.seeList = []
          item.issueList = []
          item.subjectDtos.forEach(subject => {
            if (subject.subjectStage === 0) {
              item.createList.push(subject)
            }
            if (subject.subjectStage === 1) {
              item.seeList.push(subject)
            }
            if (subject.subjectStage === 2) {
              item.issueList.push(subject)
            }
          })
        })
        this.examList = list
        this.total = res.data.data.total
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据下拉框选择类别查找考试
    choiceRange (value) {
      this.queryData.examRange = value || ''
      this.queryData.schoolCode = this.schoolCode
      this.queryData.pageIndex = this.currentPage
      this.queryData.pageSize = this.pageSize
      this.loading = true
      this.axios.post(API.EXAM_HOMEEXAM, this.queryData).then(res => {
        let list = res.data.data.list
        list.map((item, index) => {
          item.dateFrom = Utils.formatTime(new Date(item.examDateFrom), true, '/')
          item.dateTo = Utils.formatTime(new Date(item.examDateTo), true, '/')
          item.createList = []
          item.seeList = []
          item.issueList = []
          item.subjectDtos.forEach(subject => {
            if (subject.subjectStage === 0) {
              item.createList.push(subject)
            }
            if (subject.subjectStage === 1) {
              item.seeList.push(subject)
            }
            if (subject.subjectStage === 2) {
              item.issueList.push(subject)
            }
          })
        })
        this.examList = list
        this.total = res.data.data.total
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据学校查找考试
    choiceName (e) {
      let keyCode = e.key
      if (keyCode === 'Enter') {
        this.queryData.examName = this.filterSearch
        this.queryData.schoolCode = this.schoolCode
        this.queryData.pageIndex = this.currentPage
        this.queryData.pageSize = this.pageSize
        this.loading = true
        this.axios.post(API.EXAM_HOMEEXAM, this.queryData).then(res => {
          let list = res.data.data.list
          list.map((item, index) => {
            item.dateFrom = Utils.formatTime(new Date(item.examDateFrom), true, '/')
            item.dateTo = Utils.formatTime(new Date(item.examDateTo), true, '/')
            item.createList = []
            item.seeList = []
            item.issueList = []
            item.subjectDtos.forEach(subject => {
              if (subject.subjectStage === 0) {
                item.createList.push(subject)
              }
              if (subject.subjectStage === 1) {
                item.seeList.push(subject)
              }
              if (subject.subjectStage === 2) {
                item.issueList.push(subject)
              }
            })
          })
          this.examList = list
          this.total = res.data.data.total
          this.loading = false
        }).catch(() => { this.loading = false })
      }
    },
    /**
     *  阅卷查询
     */
    // 根据下拉框选择年级查找考试
    yueChoiceGrade (value) {
      this.yueQueryData.gradeId = value.id || ''
      this.yueQueryData.schoolCode = this.schoolCode
      this.yueQueryData.pageIndex = this.currentPage
      this.yueQueryData.pageSize = this.pageSize
      this.yueQueryData.userId = this.adminInfo.teacherInfo.id
      this.loading = true
      this.axios.post(API2.APPEXAMEXAMINE_GETDCEXAMEXAMINEBYUSERID, this.yueQueryData).then(res => {
        this.awaitReadList = res.data.data || []
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据下拉框选择月份查找考试
    yueChoiceMonth (value) {
      this.yueQueryData.examDateFrom = Utils.formatTime(value).substring(0, 10)
      this.yueQueryData.schoolCode = this.schoolCode
      this.yueQueryData.pageIndex = this.currentPage
      this.yueQueryData.userId = this.adminInfo.teacherInfo.id
      this.yueQueryData.pageSize = this.pageSize
      this.loading = true
      this.axios.post(API2.APPEXAMEXAMINE_GETDCEXAMEXAMINEBYUSERID, this.yueQueryData).then(res => {
        this.awaitReadList = res.data.data || []
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据下拉框选择类别查找考试
    yueChoiceRange (value) {
      console.log(value)
      this.yueQueryData.status = value
      this.yueQueryData.schoolCode = this.schoolCode
      this.yueQueryData.userId = this.adminInfo.teacherInfo.id
      this.yueQueryData.pageIndex = this.currentPage
      this.yueQueryData.pageSize = this.pageSize
      this.loading = true
      this.axios.post(API2.APPEXAMEXAMINE_GETDCEXAMEXAMINEBYUSERID, this.yueQueryData).then(res => {
        this.awaitReadList = res.data.data || []
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据学校查找考试
    yueChoiceName (e) {
      let keyCode = e.key
      if (keyCode === 'Enter') {
        this.yueQueryData.examName = this.filterSearch
        this.yueQueryData.userId = this.adminInfo.teacherInfo.id
        this.yueQueryData.schoolCode = this.schoolCode
        this.yueQueryData.pageIndex = this.currentPage
        this.yueQueryData.pageSize = this.pageSize
        this.loading = true
        this.axios.post(API2.APPEXAMEXAMINE_GETDCEXAMEXAMINEBYUSERID, this.yueQueryData).then(res => {
          this.awaitReadList = res.data.data || []
          this.loading = false
        }).catch(() => { this.loading = false })
      }
    },
    // 获取考试列表
    getExamList () {
      this.loading = true
      this.axios.post(API.EXAM_HOMEEXAM, { schoolCode: this.schoolCode, pageIndex: this.currentPage, pageSize: this.pageSize }).then(res => {
        let list = res.data.data.list
        list.map((item, index) => {
          item.dateFrom = Utils.formatTime(new Date(item.examDateFrom), true, '/')
          item.dateTo = Utils.formatTime(new Date(item.examDateTo), true, '/')
          item.createList = []
          item.seeList = []
          item.issueList = []
          item.subjectDtos.forEach(subject => {
            if (subject.subjectStage === 0) {
              item.createList.push(subject)
            }
            if (subject.subjectStage === 1) {
              item.seeList.push(subject)
            }
            if (subject.subjectStage === 2) {
              item.issueList.push(subject)
            }
          })
        })
        this.examList = list
        this.total = res.data.data.total
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 获取阅卷列表
    getPaperList () {
      let data = {
        userId: this.adminInfo.teacherInfo.id,
        status: 0
      }
      this.axios.post(API2.APPEXAMEXAMINE_GETDCEXAMEXAMINEBYUSERID, data).then(res => {
        this.awaitReadList = res.data.data || []
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 获取学校的所有年级
    getGrades () {
      this.axios.post(`${API.GRADE_FINDBYGRADES}/${this.schoolCode}`).then(res => {
        this.gradeList = res.data.data
      }).catch(() => { })
    },
    // 获取考前、考中、考后状态
    getExamStatus (dateStart, dateEnd) {
      let currentTime = new Date().getTime()
      let startTime = new Date(dateStart).getTime()
      let endTime = new Date(dateEnd).getTime()
      if (currentTime >= startTime && currentTime <= endTime) {
        return 'current'
      }
      if (currentTime < startTime) {
        return 'before'
      }
      if (currentTime > endTime) {
        return 'after'
      }
    },
    // 根据年级ID获取年级名称
    getGradeById (id) {
      let grade = this.gradeList.find(item => {
        return item.id === id
      })
      return grade ? grade.gradeName : ''
    },
    getExamType (id) {
      let obj = this.examTypeList.find(item => {
        return item.id === parseInt(id)
      })
      return obj ? obj.name : ''
    },
    getYuejuanAway (id) {
      let obj = this.yueJuanWayList.find(item => {
        return item.id === parseInt(id)
      })
      return obj ? obj.name : ''
    },
    getExamRange (id) {
      let obj = this.examRangeList.find(item => {
        return item.id === parseInt(id)
      })
      return obj ? obj.name : ''
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.getExamList()
    },
    prevPage () {
      this.currentPage = this.currentPage - 1
      this.getExamList()
    },
    nextPage () {
      this.currentPage = this.currentPage * 1 + 1
      this.getExamList()
    },
    toCheckPaperBlock (paper) {
      this.$router.push({ path: `/checkPaperBlock/${paper.examId}/${paper.examSubjectId}/${paper.examineId}` })
    }
    // menuDispose (dmlist) {
    //   let array = []
    //   dmlist.forEach(element => {
    //     if (element.menuUrl === 'examinationManagement') {
    //       array.push('examinationManagement')
    //     }
    //     if (element.menuUrl === 'readingTasks') {
    //       array.push('readingTasks')
    //     }
    //   })
    //   this.menuList = array
    // }
  }
}
</script>
<style lang="scss">
#home {
  .left-bar {
    .task-number {
      position: absolute;
      left: 160px;
      top: 32px;
      z-index: 1;
    }
    .tab-info {
      width: 850px;
      margin-top: 23px;
      .el-tabs__header {
        margin: 0 0 5px;
        background-color: #ffffff;
        border-radius: 4px;
        border: 1px solid #d1dbe5;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .el-tabs__nav {
          padding-left: 10px;
          .el-tabs__active-bar {
            width: 76px !important;
          }
        }
      }
      .el-tabs__content {
        background-color: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        .el-card {
          .el-card__body {
            .filter-bar {
              margin-bottom: 20px;
              .filter-item {
                display: inline-block;
                .el-select {
                  width: 105px;
                }
                .el-date-editor {
                  width: 140px;
                }
                .search-input {
                  width: 100%;
                }
              }
            }
          }
          .exam-stage {
            border: 1px solid #e9eff2;
            border-radius: 4px;
            margin-bottom: 30px;
            .exam-stage-title {
              border-bottom: 1px solid #e9eff2;
              height: 142px;
              display: flex;
              align-items: center;
              flex-flow: row nowrap;
              box-sizing: border-box;
              padding-left: 30px;
              .title-logo {
                img {
                  width: 70px;
                  height: 60px;
                }
              }
              .title-detail {
                width: 650px;
                padding-left: 30px;
                .title-name {
                  a {
                    color: #4d4d4d;
                    font-size: 18px;
                    text-decoration: none;
                    height: 21px;
                    line-height: 23px;
                    margin-right: 12px;
                    max-width: 400px;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  .el-tag {
                    margin-right: 10px;
                  }
                }
                .exam-time-create {
                  width: 620px;
                  margin-top: 18px;
                  font-size: 13px;
                  line-height: 17px;
                  color: #999;
                  p {
                    margin: 0;
                    display: inline-block;
                    margin-right: 10px;
                    i {
                      margin-right: 5px;
                    }
                  }
                }
              }
            }
            .exam-stage-detail {
              box-sizing: border-box;
              padding: 20px 30px;
              .detail-stage {
                margin-bottom: 20px;
                display: flex;
                flex-flow: row nowrap;
                &:last-child {
                  margin-bottom: 0;
                }
                .stage-title {
                  width: 110px;
                  line-height: 35px;
                  margin-right: 30px;
                  .dot {
                    display: inline-block;
                    color: #a4a4a4;
                    width: 7px;
                    height: 7px;
                    margin-top: 8px;
                    margin-right: 30px;
                    background-color: #b6bac3;
                    border-radius: 50%;
                  }
                  .text {
                    white-space: nowrap;
                    color: #989898;
                    font-size: 14px;
                  }
                }
                .stage-subjects {
                  width: 600px;
                  a {
                    display: inline-block;
                    padding: 7px 18px;
                    color: #595959;
                    font-size: 14px;
                    border: 1px solid #eee;
                    background: #fff;
                    border-radius: 2px;
                    cursor: pointer;
                    text-decoration: none;
                    margin-bottom: 5px;
                    margin-right: 10px;
                    &:hover {
                      color: #ffffff;
                      background-color: #999999;
                    }
                  }
                }
              }
            }
          }
          .paper-item {
            border: 1px solid #e9eff2;
            // height: 100px;
            padding: 20px;
            .el-row {
              width: 100%;
              margin-top: 15px;
              &:first-child {
                margin-top: 0;
              }
              .exam-name {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 18px;
                color: #000000;
              }
              .name-right {
                text-align: right;
                .exam-time {
                  font-size: 14px;
                  margin-left: 10px;
                }
                .el-tag {
                  margin-left: 10px;
                }
              }
              .subject-name {
                color: #409eff;
              }
              .subject-right {
                text-align: right;
              }
            }
          }
          .page-row {
            text-align: center;
            margin-top: 20px;
          }
        }
      }
    }
  }
  .right-bar {
    margin-top: 23px;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    padding-bottom: 20px;
    .help {
      width: 230px;
      min-height: 82px;
      .title-box {
        height: 45px;
        border-bottom: 1px solid #d9d9d9;
        box-sizing: border-box;
        // padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .help-title {
          color: #333;
          font-size: 16px;
        }
        .help-more {
          cursor: pointer;
          color: #9fa3ad;
          text-decoration: none;
          float: right;
          font-size: 12px;
          &:hover {
            color: #333;
          }
        }
      }
      .pdf {
        // background-color: #ffffff;
        .pdf-link {
          display: block;
          margin-top: 10px;
          background-color: #7388a5;
          text-align: center;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            vertical-align: middle;
          }
          span {
            text-align: left;
            font-size: 14px;
            display: inline-block;
            width: 145px;
          }
          i {
            font-size: 25px;
            vertical-align: middle;
          }
        }
      }
      .video {
        margin-top: 30px;
        .video-link {
          margin-top: 10px;
          display: block;
          background-color: #7388a5;
          img {
            width: 230px;
            height: 155px;
          }
        }
      }
      .question {
        margin-top: 30px;
        ul {
          margin-left: 15px;
          padding: 0;
          a {
            text-decoration: none;
            font-size: 13px;
            color: #000;
            margin-top: 10px;
            display: block;
            li {
              list-style-type: none;
            }
          }
        }
      }
    }
  }
}
</style>
