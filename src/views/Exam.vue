<template>
  <div id="exam-2">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{examInfo.examName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <div class="exam-content">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="进度信息" name="schedule">
          <div class="exam-progress">
            <div class="exam-title">{{examInfo.examName}}</div>
            <el-row class="exam-meta" type="flex" align="middle">
              <el-col :span="5">
                <span class="el-icon-time">考试时间：{{examInfo.examDateFrom}}&nbsp;至&nbsp;{{examInfo.examDateTo}}</span>
              </el-col>
              <el-col :span="4">
                <span class="el-icon-setting setter">创建老师：新邵县第一中学</span>
              </el-col>
              <el-col :span="4">
                <span class="el-icon-info setter">考试类型：{{getExamTypeInfo()}}</span>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-button type="primary" size="mini" plain icon="el-icon-setting" @click="toExamDetail()">考生信息管理</el-button>
              </el-col>
              <el-col :span="4" :offset="1">
                <!-- <el-button type="primary" size="mini" plain icon="el-icon-download">下载已发布科目成绩</el-button> -->
              </el-col>
              <el-col :span="2">
                <el-button type="primary" size="mini" plain @click="publish()">发布成绩</el-button>
              </el-col>
            </el-row>
            <div class="exam-detail">
              <el-table :data="tableDataSubject" v-loading="loading" border>
                <el-table-column label="科目" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump" style="color:#409eff;" @click="toSubjectMain(scope.row)">{{scope.row.subjectName ? examGrade.gradeName + scope.row.subjectName : '-'}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="subjectStage" label="阶段" align="center">
                  <template slot-scope="scope">
                    {{scope.row.subjectStage === 0 ? '创建阶段': scope.row.subjectStage === 1 ? '阅卷阶段' : scope.row.subjectStage === 2 ? '已发布阶段': '' }}
                  </template>
                </el-table-column>
                <el-table-column label="考生状态" align="center" width="150">
                  <template slot-scope="scope">
                    考生人数<a class="click-jump" @click="examStuNum(scope.row)">{{scope.row.examStuNum}}</a>人
                  </template>
                </el-table-column>
                <el-table-column label="试卷结构" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{getStatus(scope.row.structureType)}}</a>
                  </template>
                </el-table-column>
                <el-table-column label="模板" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{getStatus(scope.row.templateType)}}</a>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="扫描进度" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{getStatus(scope.row.col5)}}</a>
                  </template>
                </el-table-column> -->
                <el-table-column label="题块设置" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{getStatus(scope.row.frameType)}}</a>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="阅卷任务" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{getStatus(scope.row.readTaskType)}}</a>
                  </template>
                </el-table-column> -->
                <!-- <el-table-column label="客观题答案" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{getStatus(scope.row.objectiveTopicType)}}</a>
                  </template>
                </el-table-column> -->
                <el-table-column label="阅卷总进度" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{scope.row.examinerVitesse ? scope.row.examinerVitesse : '-'}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="col10" label="原卷状态" align="center">
                  <template slot-scope="scope">
                    <a class="click-jump">{{scope.row.col10 ? scope.row.col10 : '未上传原卷'}}</a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="exam-annotation">
              <span class="annotation-title">注</span>
              <span class="annotation-content">：为了方便用户迅速定位未完成，所以未开始的项目均为“-”；点击可快速进入相关设置页面进行设置。</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="人员信息" name="person">
          <el-row type="flex" align="middle">
            <el-col :span="20" class="exam-title">{{examInfo.examName}}</el-col>
            <el-col :span="2" :offset="2">
              <el-button class="desc" type="text" size="mini" icon="el-icon-info">人员信息说明</el-button>
            </el-col>
          </el-row>
          <el-row class="exam-meta" type="flex" align="middle">
            <el-col :span="5">
              <span class="el-icon-time">考试时间：{{examInfo.examDateFrom}}&nbsp;至&nbsp;{{examInfo.examDateTo}}</span>
            </el-col>
            <el-col :span="4">
              <span class="el-icon-setting setter">创建老师：</span>
            </el-col>
            <el-col :span="4">
              <span class="el-icon-info setter">考试类型：{{getExamTypeInfo()}}</span>
            </el-col>
          </el-row>
          <el-row class="exam-filter" type="flex" align="middle" justify="space-between">
            <el-col :span="14">
              <span>学校：</span>
              <el-select v-model="filterSchool" size="small" class="school-select"></el-select>
              <span class="role-title">角色：</span>
              <el-select v-model="filterRole" size="small" class="role-select">
                <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id"></el-option>
              </el-select>
              <el-input size="small" class="search-input" suffix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col class="right-col" :span="7" :offset="3">
              <el-button type="primary" size="mini" plain icon="el-icon-setting" @click="toExamDetail()">考生信息管理</el-button>
              <el-button type="primary" size="mini" plain icon="el-icon-download" @click="showAddDialog()">添加考试人员</el-button>
            </el-col>
          </el-row>
          <el-row class="exam-table">
            <el-table :data="personInfoData" v-loading="loading" border>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="phone" label="电话" align="center"></el-table-column>
              <el-table-column prop="schoolName" label="学校" align="center"></el-table-column>
              <el-table-column label="角色" align="center">
                <template slot-scope="scope">{{getRoleName(scope.row.role)}}</template>
              </el-table-column>
              <el-table-column label="科目" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="editPersonRow(scope.row)">编辑</el-button>
                  <el-button type="text" class="delete-exam" size="mini" @click="deletePersonRow(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <!-- <el-pagination background @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="personInfoData.length"></el-pagination> -->
        </el-tab-pane>
      </el-tabs>
      <div class="tab-right">
        <el-button type="text" size="mini" class="edit-exam" icon="el-icon-edit" @click="editExam()">编辑</el-button>
        <el-button type="text" size="mini" class="delete-exam" icon="el-icon-delete" @click="delExam()">删除</el-button>
        <el-button type="text" size="mini" class="view-exam" icon="el-icon-view">查看动态</el-button>
      </div>
    </div>
    <el-dialog title="添加考试人员" :visible.sync="addVisible" width="600px" center custom-class="add-dialog">
      <div>
        <el-row type="flex" align="middle">
          <el-col :span="3" :offset="2">学校</el-col>
          <el-col :span="16">
            <el-select size="small" v-model="addDialogForm.school" value-key="id">
              <el-option v-for="(school,index) in schoolList" :key="index" :label="school.schoolName" :value="school"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="3" :offset="2">姓名</el-col>
          <el-col :span="16">
            <el-select size="small" v-model="addDialogForm.teacher" value-key="id">
              <el-option v-for="(tea,index) in teacherList" :key="index" :label="tea.name" :value="tea"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="3" :offset="2">电话</el-col>
          <el-col :span="16">
            <el-input size="small" v-model="addDialogForm.teacher.teacherMobile" disabled></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="3" :offset="2">角色</el-col>
          <el-col :span="16">
            <el-radio-group v-model="addDialogForm.role">
              <el-radio v-for="role in roles" :key="role.id" :label="role.id">{{role.name}}</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" v-if="addDialogForm.role === 3">
          <el-col :span="3" :offset="2">学科</el-col>
          <el-col :span="16">
            <el-select size="small" v-model="addDialogForm.subject" value-key="id">
              <el-option v-for="(sub,index) in examSubjectList" :key="index" :label="examGrade.gradeName + sub.subjectName" :value="sub"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="addTeacher(true)" :loading="trueButtonLoading" :disabled="saveButtonLoading">确定</el-button>
        <el-button type="primary" plain size="medium" @click="addTeacher(false)" :loading="saveButtonLoading" :disabled="trueButtonLoading">保存并继续</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择科目" :visible.sync="gradeVisible" center custom-class="grade-dialog">
      <el-row class="class-row">
        <el-col :span="3" class="titlespan">
          <span>未发布科目：</span>
        </el-col>
        <el-col :span="21">
          <el-checkbox-group v-model="checkedClass" @change="checkedClassChange">
            <el-checkbox v-for="clazz in falseArray" :label="clazz.examSubjectId" :key="clazz.examSubjectId">{{clazz.subjectName}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row class="class-row">
        <el-col :span="3" class="titlespan">
          <span>已发布科目：</span>
        </el-col>
        <el-col :span="21">
          <el-checkbox-group>
            <el-checkbox v-for="clazz in trueArray" :label="clazz.subjectName" :key="clazz.examSubjectId" disabled checked>{{clazz.subjectName}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <!-- <el-row>
        <font color="red">注: 选择班级导入时，将会替换原考生表中的信息。</font>
      </el-row> -->
      <div slot="footer">
        <el-button type="primary" @click="publishExam()">确定</el-button>
        <el-button @click="gradeVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
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
      examId: this.$route.params.examId,
      examInfo: {},
      examGrade: {},
      activeTab: 'schedule',
      loading: false,
      examTypeList: [
        { id: 0, name: '普通' },
        { id: 1, name: '月考' },
        { id: 2, name: '期中' },
        { id: 3, name: '期末' },
        { id: 4, name: '竞赛' }
      ],
      examRangeList: [
        { id: 3, name: '全部' },
        { id: 0, name: '校内' },
        { id: 1, name: '联考' },
        { id: 2, name: '统考' }
      ],
      tableDataSubject: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      schoolList: [],
      examSubjectList: [],
      teacherList: [],
      addVisible: false,
      dialogType: '',
      roles: [
        { id: 1, name: '考试管理员' },
        { id: 2, name: '扫描员' },
        { id: 3, name: '学科负责人' }
      ],
      addDialogForm: {
        school: {},
        teacher: {},
        phone: '',
        role: 1,
        subject: {}
      },
      filterSchool: '',
      filterRole: '',
      examAdmin: [],
      examScanner: [],
      trueButtonLoading: false,
      saveButtonLoading: false,
      gradeVisible: false,
      subjectList: [],
      trueArray: [],
      falseArray: [],
      checkedClass: []
    }
  },
  computed: {
    ...mapState(['adminInfo']),
    personInfoData () {
      return this.examAdmin.concat(this.examScanner)
    }
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.getExamInfo()
  },
  methods: {
    // 根据考试id查询考试信息
    async getExamInfo () {
      await this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        let data = res.data.data[0]
        data.examDateFrom = Utils.formatTime(new Date(data.examDateFrom), true)
        data.examDateTo = Utils.formatTime(new Date(data.examDateTo), true)
        this.examInfo = data
      }).catch(() => { })
      this.getGradeById()
    },
    // 获取考试的年级
    async getGradeById () {
      await this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.examGrade = res.data.data[0]
      }).catch(() => { })
      this.getSchoolList()
    },
    // 获取考试的学校
    async getSchoolList () {
      await this.axios.post(API.SCHOOL_FINDBYCOMMON, { schoolCode: this.examInfo.schoolCode }).then(res => {
        this.schoolList = res.data.data
      }).catch(() => { })
      this.getExamAdmin()
    },
    // 获取考试管理员
    async getExamAdmin () {
      await this.axios.post(API.EXAM_FINDBYEXAMADMINCOM, { examId: this.examId }).then(res => {
        let data = res.data.data.map(item => {
          item.role = 1
          return item
        })
        this.examAdmin = data
      }).catch(() => { })
      this.getExamScanner()
    },
    // 获取考试扫描员
    async getExamScanner () {
      await this.axios.post(API.EXAM_FINDBYEXAMSCANCOM, { examId: this.examId }).then(res => {
        let data = res.data.data.map(item => {
          item.role = 2
          return item
        })
        this.examScanner = data
      }).catch(() => { })
      this.getSubjectProgress()
    },
    // 查询科目进度信息和人员信息
    async getSubjectProgress () {
      this.loading = true
      await this.axios.post(API.EXAM_SELECTSUBJECT, { examId: this.examId }).then(res => {
        this.tableDataSubject = res.data.data
        this.loading = false
      }).catch(() => { this.loading = false })
      this.getStudentCount()
    },
    // 根据考试id查询本次考试的班级数和人数
    async getStudentCount () {
      await this.axios.post(API.EXAM_SELECTCOUNT + '/' + this.examId).then(res => {
        this.studentCount = parseInt(res.data.data.examineeCount)
      }).catch(() => { })
      this.getExamSubject()
    },
    // 查询所有考试科目
    async getExamSubject () {
      await this.axios.post(API.EXAM_EXAMSUBJECT, { examId: this.examId }).then(res => {
        this.examSubjectList = res.data.data
      }).catch(() => { })
      this.getSchoolTeacher()
    },
    // 获取学校所有的老师
    async getSchoolTeacher () {
      let data = {
        schoolCode: this.schoolCode
      }
      await this.axios.post(API.TEACHER_FINDBYCOMMON, data).then(res => {
        this.teacherList = res.data.data
      }).catch(() => { })
    },
    // 获取状态
    getStatus (val) {
      return val === 1 ? '已完成' : '-'
    },
    // 根据id获取人员角色
    getRoleName (id) {
      let role = this.roles.find(item => {
        return id === item.id
      })
      return role ? role.name : ''
    },
    // 显示添加考试人员弹窗
    showAddDialog () {
      this.addVisible = true
    },
    addTeacher (isContinue) {
      if (isContinue) {
        this.saveButtonLoading = true
      } else {
        this.trueButtonLoading = true
      }
      let form = this.addDialogForm
      let data = {
        examId: this.examId,
        schoolId: form.school.id,
        teacherId: form.teacher.id
      }
      switch (form.role) {
        case 1:
          this.addExamAdmin(data)
          break
        case 2:
          this.addExamScanner(data)
          break
        case 3:
          data.examSubjectId = form.subject.id
          this.addSubjectTeacher(data)
          break
      }
      if (isContinue) {
        this.saveButtonLoading = false
      } else {
        this.trueButtonLoading = false
      }
    },
    // 编辑考试
    editExam () {
      this.$router.push({ path: '/editExam/' + this.examId })
    },
    // 删除考试
    delExam () {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '你确定要永久删除 '),
          h('i', { style: 'color: red' }, this.examInfo.examName),
          h('span', null, '的考试信息吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            this.axios.post(API.EXAM_DELETEBYID + '/' + this.examId).then(res => {
              done()
              instance.confirmButtonLoading = false
              this.$message({
                message: '考试信息删除成功',
                type: 'success'
              })
              this.$router.push({ path: '/home' })
            }).catch(() => { done() })
          } else {
            done()
          }
        }
      }).then(action => { })
    },
    // 根据ID获取考试类型信息
    getExamTypeInfo () {
      let list = []
      if (this.getExamType(this.examInfo.examType)) {
        list.push(this.getExamType(this.examInfo.examType))
      }
      if (this.getExamRange(this.examInfo.examRange)) {
        list.push(this.getExamRange(this.examInfo.examRange))
      }
      return list.join('、')
    },
    // 考试类型
    getExamType (id) {
      let obj = this.examTypeList.find(item => {
        return item.id === id
      })
      return obj ? obj.name : ''
    },
    // 考试范围
    getExamRange (id) {
      let obj = this.examRangeList.find(item => {
        return item.id === id
      })
      return obj ? obj.name : ''
    },
    // 添加考试管理员
    addExamAdmin (data) {
      this.axios.post(API.EXAM_ADDEXAMADMIN, data).then(res => {
        this.getExamInfo()
        this.isVisibleDialog = false
      }).catch(() => { })
    },
    // 添加考试扫描员
    addExamScanner (data) {
      this.axios.post(API.EXAM_ADDEXAMSCANMEBER, data).then(res => {
        this.getExamInfo()
        this.isVisibleDialog = false
      }).catch(() => { })
    },
    // 添加科目负责人
    addSubjectTeacher (data) {
      this.axios.post(API.EXAM_UPDATETEACHERID, data).then(res => {
        this.getExamInfo()
        this.isVisibleDialog = false
      }).catch(() => { })
    },
    // 编辑人员信息行
    editPersonRow (row) {
      this.$message({
        message: '暂不支持'
      })
    },
    // 删除人员信息行
    deletePersonRow (row) {
      this.$message({
        message: '暂不支持'
      })
    },
    // 跳转去考生信息管理
    toExamDetail () {
      this.$router.push({ path: '/ExamDetail/' + this.examId })
    },
    // 翻页
    sizeChange (size) {
      this.pageSize = size
      this.getExamAdmin()
    },
    prevPage (page) {
      this.currentPage = this.currentPage - 1
    },
    handleCurrentPage (page) {
      this.currentPage = page
    },
    nextPage (page) {
      this.currentPage = this.currentPage + 1
    },
    // 跳转去科目设置首页
    toSubjectMain (row) {
      if (row.id && row.examId) {
        this.$router.push({ path: '/subjectMain/' + row.examId + '/' + row.id })
      }
    },
    examStuNum (row) {
      this.$router.push({ path: '/ExamDetail/' + row.examId })
    },
    // 点击发布成绩
    publish () {
      this.gradeVisible = true
      this.axios.post(`${API.ADMIN_GETPUBLISHSUBJECTLIST}${this.examId}`).then(res => {
        this.subjectList = res.data.data
        let trueArray = []
        let falseArray = []
        for (let i = 0; i < this.subjectList.length; i++) {
          if (this.subjectList[i].publish) {
            trueArray.push(this.subjectList[i])
          } else {
            falseArray.push(this.subjectList[i])
          }
        }
        this.trueArray = trueArray
        this.falseArray = falseArray
      })
    },
    checkedClassChange (value) {
    },
    publishExam () {
      let param = {
        examSubjectIds: this.checkedClass,
        examId: this.examId,
        schoolCode: this.schoolCode
      }
      this.axios.post(API2.ADMIN_PUBLISHGRADEBYEXAMSUBJECTID, param).then(res => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
        this.gradeVisible = false
        this.getExamInfo()
      })
    }
  }
}
</script>
<style lang="scss">
#exam-2 {
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
  .exam-content {
    position: relative;
    background-color: #fff;
    padding: 0 30px;
    .el-tabs {
      padding-bottom: 20px !important;
      .el-tabs__content {
        .exam-title {
          font-size: 14px;
          color: #353b45;
        }
        .desc {
          color: #7b7b7b;
        }
        .exam-meta {
          margin: 14px 0;
          height: 28px;
          line-height: 28px;
          font-size: 12px;
          color: #8d8d8d;
          .el-col {
            display: flex;
            align-items: center;
          }
          .setter {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .exam-detail {
          .el-table {
            .click-jump {
              cursor: pointer;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        .exam-annotation {
          font-size: 12px;
          margin: 20px 0;
          .annotation-title {
            color: #f56c6c;
          }
          .annotation-content {
            color: #8d8d8d;
          }
        }
        .exam-filter {
          color: #353b45;
          font-size: 14px;
          height: 35px;
          line-height: 35px;
          .role-title {
            padding-left: 20px;
          }
          .school-select {
            width: 140px;
          }
          .role-select {
            width: 110px;
          }
          .search-input {
            width: 160px;
            margin-left: 20px;
          }
          .right-col {
            text-align: right;
          }
        }
        .exam-table {
          margin-top: 15px;
          .el-table {
            th {
              background-color: #f3f6fa;
              color: #353b45;
              font-size: 12px;
              line-height: 16px;
            }
          }
        }
        .el-pagination {
          text-align: center;
          padding: 37px 0 15px;
        }
      }
    }
    .tab-right {
      float: right;
      position: absolute;
      top: 10px;
      right: 30px;
    }
    .delete-exam {
      color: #f56c6c;
    }
  }
  .add-dialog {
    .el-row {
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-select {
        width: 100%;
      }
      .el-input--small {
        .el-input__inner {
          height: 35px;
          line-height: 35px;
        }
      }
    }
  }
  .titlespan {
    text-align: right;
    font-size: 14px;
  }
  .class-row {
    margin-bottom: 10px;
  }
}
</style>
