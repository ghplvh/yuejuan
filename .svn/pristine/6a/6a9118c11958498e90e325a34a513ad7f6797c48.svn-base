<template>
  <div id="exam-detail">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/exam/' + examId }">{{examInfo.examName}}</el-breadcrumb-item>
          <el-breadcrumb-item>考生信息管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row class="exam-info">
      <el-card class="exam-detail-setting">
        <el-row class="title">
          <el-col :span="12">{{examInfo.examName}}</el-col>
          <el-col :span="12">本科目考试共<font color="#ffac00">{{schoolCount}}</font>个学校参与，考生共计<font color="#ffac00">{{total}}</font>人</el-col>
        </el-row>
        <el-row class="join-school" type="flex" align="middle">
          <el-col :span="13" class="join-school-title">
            <span class="title-name" style="width:70px;">参与学校：</span>
            <el-select v-model="schoolInfo.schoolName" size="medium">
              <el-option :label="schoolInfo.schoolName" :value="schoolInfo.schoolName"></el-option>
            </el-select>
            <el-tooltip :content="adminInfo.teacherInfo.name" placement="top" effect="light">
              <span class="upload-pp">上传人: {{adminInfo.teacherInfo.name}}</span>
            </el-tooltip>
            <span class="v-line">|</span>
            <span class="exam-stu-count">考生人数：{{total}}</span>
            <!-- <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="areaSetting()">考生范围设置</el-button> -->
          </el-col>
          <el-col :span="11" class="join-school-filter">
            <el-select size="medium" v-model="filterClassId" placeholder="请选择班级" @change="getExaminee()">
              <el-option label="全部" :value="''"></el-option>
              <el-option v-for="clazz in examClassList" :key="clazz.id" :label="clazz.className" :value="clazz.id"></el-option>
            </el-select>
            <el-input size="medium" v-model="filterInput" class="filter-condition" placeholder="请输入姓名、学号">
              <el-button slot="append" icon="el-icon-search" size="medium" @click="getExaminee()"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="opra-row">
          <el-col :span="13" class="opra-left">
            <el-button type="text" icon="el-icon-plus" size="mini" @click="addExamStudent()">单个新增</el-button>
            <el-button type="text" icon="el-icon-circle-check-outline" size="mini" @click="selectClass()">选择班级</el-button>
            <!-- <el-button type="text" icon="el-icon-upload2" size="mini" @click="quickUpload()">批量导入</el-button> -->
            <el-button type="text" icon="el-icon-delete" size="mini" @click="multipleDelete()">多选删除</el-button>
            <el-button type="text" icon="el-icon-download" size="mini" @click="downloadExaminee()">导出</el-button>
          </el-col>
          <el-col :span="11" class="opra-right">
            <el-button type="text" icon="el-icon-delete" @click="deleteAllByExam()">删除所有考生</el-button>
          </el-col>
        </el-row>
        <el-row class="table-stu">
          <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中..." @selection-change="SelectionChange" border size="mini">
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column prop="studentName" label="姓名" align="center" width="100"></el-table-column>
            <el-table-column prop="studentId" label="学号" align="center" width="249"></el-table-column>
            <el-table-column prop="studentExamId" label="考号" align="center" width="249"></el-table-column>
            <el-table-column prop="className" label="班级" align="center" width="249"></el-table-column>
            <el-table-column label="操作" align="center" width="220">
              <template slot-scope="scope">
                <el-button type="text" @click="editRow(scope.row)">编辑</el-button>
                <el-button type="text" class="delete" @click="deleteRow(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="page-box">
            <el-pagination background @size-change="pageSizeChange" @prev-click="prevPage" @next-click="nextPage" @current-change="pageCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-row>
        </el-row>
      </el-card>
    </el-row>
    <el-dialog title="考生范围设置" :visible.sync="areaSettingVisible" center custom-class="area-setting-dialog" width="600px">
      <el-row class="subject-row">
        <span class="tips">请选择需要<font color="red">单独设置考生</font>的科目，勾选后，相应科目即可单独设置考生，不受考试组导入考生影响。</span>
        <el-checkbox :indeterminate="isIndeterminate" v-model="subjectsCheckAll" @change="subjectCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedSubjects" @change="subjectCheckedChange">
          <el-checkbox v-for="subject in subjectList" :label="subject" :key="subject.id">{{subject.subjectName}}</el-checkbox>
        </el-checkbox-group>
      </el-row>
      <el-row>
        <font color="red">注：该操作不可逆，勾选后无法取消，请谨慎操作。</font>
      </el-row>
      <div slot="footer">
        <el-button type="primary">确认</el-button>
        <el-button @click="areaSettingVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加考生" :visible.sync="ExamStudentVisible" center custom-class="exam-student-dialog" width="600px">
      <el-row class="search-row grade-row">
        <el-col :span="3">选择年级</el-col>
        <el-col :span="20" :offset="1">
          <el-select size="medium" v-model="examineeGrade" value-key="id" @change="getClassByGrade(examineeGrade.id)">
            <el-option v-for="grade in examGrade" :key="grade.id" :value="grade" :label="grade.gradeName"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="search-row grade-row">
        <el-col :span="3">选择班级</el-col>
        <el-col :span="20" :offset="1">
          <el-select size="medium" v-model="examineeClass" value-key="id" @change="getStudentByClass()">
            <el-option v-for="clazz in classList" :key="clazz.id" :value="clazz" :label="clazz.className"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="search-row student-row">
        <el-col :span="3">查询考生</el-col>
        <el-col :span="20" :offset="1">
          <el-select size="medium" v-model="selectStudent" value-key="id" filterable placeholder="请输入学号或姓名">
            <el-option v-for="stu in students" :key="stu.id" :label="stu.studentName + ' | ' + stu.studentId" :value="stu"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div class="base-info" v-if="selectStudent">
        <el-row class="student-info">
          <el-col :span="12">姓名：{{selectStudent.studentName}}</el-col>
          <el-col :span="12">学号：{{selectStudent.studentId}}</el-col>
          <el-col :span="12">年级：{{selectStudent.gradeNumber}}</el-col>
          <el-col :span="12">班级：{{selectStudent.classNumber}}</el-col>
        </el-row>
        <el-form :model="examInfoForm" ref="examInfoForm" :rules="examInfoRules" :inline="true" label-width="61px" size="medium" class="exam-info-form">
          <el-form-item label="考号:" prop="studentExamId">
            <el-input v-model="examInfoForm.studentExamId" placeholder="请输入考号"></el-input>
          </el-form-item>
          <el-form-item label="考场:" prop="examroomNumber">
            <el-input v-model="examInfoForm.examroomNumber" placeholder="请输入考场号"></el-input>
          </el-form-item>
          <el-form-item label="座号:" prop="seatNumber">
            <el-input v-model="examInfoForm.seatNumber" placeholder="请输入座号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" v-if="selectStudent">
        <el-button type="primary" @click="submitExamInfoForm('examInfoForm')">确定</el-button>
        <el-button @click="ExamStudentVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择班级" :visible.sync="gradeVisible" center custom-class="grade-dialog">
      <el-row class="grade-row">
        <span>选择年级：</span>
        <el-select size="medium" v-model="examClassGrade" @change="getClassByGrade(examClassGrade)">
          <el-option v-for="grade in examGrade" :key="grade.id" :value="grade.id" :label="grade.gradeName"></el-option>
        </el-select>
      </el-row>
      <el-row class="class-row">
        <el-checkbox :indeterminate="classIsIndeterminate" v-model="classCheckAll" @change="classCheckAllChange" class="check-all-row">
          <span>全选</span>
          <span class="class-total">{{checkedClass.length}}个班级，共{{checkedStudentCount}}人</span>
        </el-checkbox>
        <el-checkbox-group v-model="checkedClass" @change="checkedClassChange">
          <el-checkbox v-for="clazz in classList" :label="clazz" :key="clazz.id">{{clazz.className}}</el-checkbox>
        </el-checkbox-group>
      </el-row>
      <el-row>
        <font color="red">注: 选择班级导入时，将会替换原考生表中的信息。</font>
      </el-row>
      <div slot="footer">
        <el-button type="primary" @click="addExamineeList()">确定</el-button>
        <el-button @click="gradeVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入考生信息" :visible.sync="quickUploadVisible" center custom-class="quick-upload-dialog" width="410px">
      <span class="quick-upload-title">请根据实际情况选择导入方式:</span>
      <el-radio-group v-model="quickUploadType">
        <el-radio :label="1" class="upload-radio">完整信息导入(用于学生信息完整的情况, 匹配更精确)</el-radio>
        <el-radio :label="2" disabled class="upload-radio">快速导入(用于只有姓名,考号,班级的情况)</el-radio>
      </el-radio-group>
      <div>
        <font color="red">注: 快速导入只能用于每场考试首次添加考生</font>
      </div>
      <div slot="footer">
        <el-upload :action="examineeImportUrl" class="select-file" :limit="1">
          <el-button type="primary">选择文件</el-button>
        </el-upload>
        <el-button class="download-moban" @click="downloadMoban()">下载模板</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑考生" :visible.sync="editDialogVisible" center custom-class="exam-student-dialog">
      <div class="base-info">
        <el-row class="student-info">
          <el-col :span="12">姓名：{{selectRow.studentName}}</el-col>
          <el-col :span="12">学号：{{selectRow.studentId}}</el-col>
          <el-col :span="12">年级：{{selectRow.gradeName}}</el-col>
          <el-col :span="12">班级：{{selectRow.className}}</el-col>
        </el-row>
        <el-form :model="examInfoForm" ref="editInfoForm" :rules="examInfoRules" :inline="true" label-width="61px" size="medium" class="exam-info-form">
          <el-form-item label="考号:" prop="studentExamId">
            <el-input v-model="examInfoForm.studentExamId" placeholder="请输入考号"></el-input>
          </el-form-item>
          <el-form-item label="考场:" prop="examroomNumber">
            <el-input v-model="examInfoForm.examroomNumber" placeholder="请输入考场号"></el-input>
          </el-form-item>
          <el-form-item label="座号:" prop="seatNumber">
            <el-input v-model="examInfoForm.seatNumber" placeholder="请输入座号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="submitEditInfoForm('editInfoForm')">修改</el-button>
        <el-button @click="ExamStudentVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      examId: this.$route.params.examId,
      examInfo: {},
      examGrade: [],
      schoolNumber: '',
      tableData: [],
      multipleSelection: [],
      examineeImportUrl: API.EXAMINEEEXCEL_IMPORT,
      loading: false,
      schoolCount: 1,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      examineeGrade: {},
      examineeClass: {},
      examineeStudentList: [],
      examClassList: [],
      filterClassId: '',
      filterInput: '',
      examClassGrade: '',
      areaSettingVisible: false,
      subjectList: [],
      isIndeterminate: true,
      subjectsCheckAll: false,
      checkedSubjects: [],
      ExamStudentVisible: false,
      selectLoading: false,
      selectStudent: '',
      studentList: [],
      students: [],
      examInfoForm: {
        id: '',
        studentExamId: '',
        examroomNumber: '',
        seatNumber: ''
      },
      examInfoRules: {
        studentExamId: [
          { required: true, message: '请填写考号', trigger: 'blur' }
        ]
      },
      gradeVisible: false,
      classIsIndeterminate: true,
      classCheckAll: false,
      checkedClass: [],
      checkedStudentCount: 0,
      classList: [],
      quickUploadVisible: false,
      quickUploadType: 1,
      editDialogVisible: false,
      selectRow: {},
      schoolInfo: ''
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.schoolNumber = this.adminInfo.teacherInfo.schoolCode
    this.getSchoolByCode()
    this.getExaminee()
    this.getExamInfo()
    // this.getExamClass()
    this.getExamSubject()
  },
  methods: {
    // 获取学校信息
    getSchoolByCode () {
      let data = {
        schoolCode: this.schoolNumber
      }
      this.axios.post(API.SCHOOL_FINDBYCOMMON, data).then(res => {
        this.schoolInfo = res.data.data[0]
      }).catch(() => { })
    },
    // 查询考生信息
    getExaminee () {
      this.loading = true
      let data = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        examId: this.examId,
        classId: this.filterClassId
      }
      if (isNaN(this.filterInput)) {
        data.studentName = this.filterInput
      } else {
        data.studentId = this.filterClassId
      }
      this.axios.post(API.EXAMINEE_SELECTCONDITION, data).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        this.loading = false
      }).catch(() => { })
    },
    // 根据考试id查询考试信息
    getExamInfo () {
      this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        this.getGradeById()
      }).catch(() => { })
    },
    // 获取考试的年级
    getGradeById () {
      this.axios.post(API.GRADE_FINDBYCOMMON, { schoolCode: this.schoolNumber }).then(res => {
        this.examGrade = res.data.data
        this.getExamClassList()
      }).catch(() => { })
    },
    getExamClassList () {
      // this.axios.post(API.DCCLASS_FINDBYGRADEID + '/' + this.examGrade[0].id).then(res => {
      let data = {
        examId: this.examId,
        gradeId: this.examGrade[0].id
      }
      this.axios.post(API.ADMINSCHOOL_FINDCLASSBYGRADEID, data).then(res => {
        this.examClassList = res.data.data
      }).catch(() => { })
    },
    // 根据考试id查询本次考试的班级数和人数
    getExamClass () {
      this.axios.post(API.EXAM_SELECTCOUNT + '/' + this.examId).then(res => {
      }).catch(() => { })
    },
    // 查询所有考试的科目
    getExamSubject () {
      this.axios.post(API.EXAM_EXAMSUBJECT, { examId: this.examId }).then(res => {
        this.subjectList = res.data.data
      }).catch(() => { })
    },
    // 根据选择的年级获取班级列表
    getClassByGrade (gradeId) {
      this.axios.post(API.DCCLASS_FINDBYGRADEID + '/' + gradeId).then(res => {
        this.classList = res.data.data
      }).catch(() => { })
    },
    // 根据学校年级班级获取学生列表
    getStudentByClass () {
      this.axios.post(API.STUDENT_GETSTUDENTSBY, {
        schoolNumber: this.examineeGrade.schoolCode,
        gradeId: this.examineeGrade.id,
        classId: this.examineeClass.id
      }).then(res => {
        this.examineeStudentList = res.data.data.list
        this.students = res.data.data.list
      }).catch(() => { })
    },
    // 提交表单单个新增考生
    submitExamInfoForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            classId: this.examineeClass.id,
            examId: this.examId,
            examroomNumber: this.examInfoForm.examroomNumber,
            gradeId: this.examineeGrade.id,
            seatNumber: this.examInfoForm.seatNumber,
            studentExamId: this.examInfoForm.studentExamId,
            studentId: this.selectStudent.studentId,
            studentName: this.selectStudent.studentName,
            studentRegisterId: this.selectStudent.studentRegisterId,
            schoolCode: this.schoolCode
          }
          this.axios.post(API.EXAMINEE_ADDSINGLEEXAMINEE, data).then(res => {
            this.ExamStudentVisible = false
            this.axios.post(API.ADMIN_ADDEXAM, { examId: this.examId, id: res.data.data }).then({})
            this.getExaminee()
          }).catch(() => { })
        } else {
          return false
        }
      })
    },
    // 提交表单修改考生信息
    submitEditInfoForm (examInfoForm) {
      this.$refs[examInfoForm].validate(valid => {
        if (valid) {
          this.axios.post(API.ADMIN_UPDATESINGLEEXAMINEE, this.examInfoForm).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.getExaminee()
            this.editDialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    // 根据多个班级id和考试id添加考生信息
    addExamineeList () {
      let ids = this.checkedClass.map(clazz => {
        return clazz.id
      })
      this.axios.post(API.EXAMINEE_ADDEXAMMINEELIST + '/' + this.examId + '/' + this.schoolNumber, ids).then(res => {
        this.gradeVisible = false
        this.getExaminee()
        this.axios.post(API.ADMIN_ADDEXAM, { examId: this.examId }).then({})
      }).catch(() => { })
    },
    // 表格行选中
    SelectionChange (val) {
      this.multipleSelection = val
    },
    // 多选删除
    multipleDelete () {
      let ids = this.multipleSelection.map(row => {
        return row.id
      })
      if (ids.length < 1) {
        this.$message({
          message: '请先选择考生信息！',
          type: 'warning'
        })
        return
      }
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '你确定要永久删除 '),
          h('i', { style: 'color: red' }, '当前'),
          h('span', null, '考生信息吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            this.axios.post(API.EXAMINEE_DELETELISTBYID, ids).then(res => {
              done()
              instance.confirmButtonLoading = false
              this.getExaminee()
            }).catch(() => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
            })
          } else {
            done()
          }
        }
      }).then(() => { })
    },
    // 删除所有
    deleteAllByExam () {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '你确定要永久删除 '),
          h('i', { style: 'color: red' }, '所有'),
          h('span', null, '考生信息吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            this.axios.post(API.EXAMINEE_DELETEBYEXAMID + '/' + this.examId).then(res => {
              done()
              instance.confirmButtonLoading = false
              this.getExaminee()
            }).catch(() => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
            })
          } else {
            done()
          }
        }
      }).then(action => { })
    },
    editRow (row) {
      this.editDialogVisible = true
      this.selectRow = row
      this.examInfoForm = {
        id: row.id,
        studentExamId: row.studentExamId,
        examroomNumber: row.examroomNumber,
        seatNumber: row.seatNumber
      }
    },
    deleteRow (row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '你确定要永久删除 '),
          h('i', { style: 'color: red' }, '当前'),
          h('span', null, '考生信息吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            this.axios.post(API.EXAMINEE_DELETEBYID + '/' + row.id).then(res => {
              done()
              instance.confirmButtonLoading = false
              this.getExaminee()
            }).catch(() => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
            })
          } else {
            done()
          }
        }
      }).then(() => { })
    },
    pageSizeChange (size) {
      this.pageSize = size
      this.getExaminee()
    },
    pageCurrentChange (page) {
      this.currentPage = page
      this.getExaminee()
    },
    prevPage (page) {
      this.currentPage = this.currentPage - 1
      this.getExaminee()
    },
    nextPage (page) {
      this.currentPage = this.currentPage + 1
      this.getExaminee()
    },
    areaSetting () {
      this.areaSettingVisible = true
    },
    subjectCheckAllChange (val = false) {
      this.checkedSubjects = val ? this.subjectList : []
      this.isIndeterminate = false
    },
    subjectCheckedChange (value = []) {
      let checkedCount = value.length
      this.subjectsCheckAll = checkedCount === this.subjectList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.subjectList.length
    },
    addExamStudent () {
      this.ExamStudentVisible = true
      this.examInfoForm = {
        studentExamId: '',
        examroomNumber: '',
        seatNumber: ''
      }
    },
    selectClass () {
      this.gradeVisible = true
    },
    classCheckAllChange (val = false) {
      this.checkedClass = val ? this.classList : []
      this.classIsIndeterminate = false
    },
    checkedClassChange (value = []) {
      console.log(value)
      if (value.length === 0) {
        return false
      }
      this.getStudentCountByClass()
      let checkedCount = value.length
      this.classCheckAll = checkedCount === this.classList.length
      this.classIsIndeterminate = checkedCount > 0 && checkedCount < this.classList.length
    },
    // 根据班级id查询总人数
    getStudentCountByClass () {
      let ids = this.checkedClass.map(clazz => {
        return clazz.id
      })
      this.axios.post(API.EXAM_FINDBYLISTCLASSID, ids).then(res => {
        this.checkedStudentCount = res.data.data
      }).catch(() => { })
    },
    quickUpload () {
      this.quickUploadVisible = true
    },
    // 导出考生模板
    downloadMoban () {
      this.download(API.FTP_DOWNLOADFILE)
    },
    // 导出考生信息
    downloadExaminee () {
      this.download(API.EXAMINEE_EXPORTEXAMINEE)
    },
    download (apiUrl) {
      const elink = document.createElement('a')
      elink.style.display = 'none'
      elink.target = '_blank'
      elink.href = apiUrl
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    }
  }
}
</script>
<style lang="scss">
#exam-detail {
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
  .exam-info {
    background: #f4f4f4;
    .exam-detail-setting {
      padding: 0 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .el-card__body {
        .title {
          font-size: 16px;
          .el-col:last-child {
            font-size: 12px;
            text-align: right;
          }
        }
        .join-school {
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid #eee;
          font-size: 14px;
          .join-school-title {
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-flow: row nowrap;
            .title-name {
              display: inline-block;
              width: 70px;
            }
            .el-select {
              width: 120px;
            }
            .upload-pp {
              display: inline-block;
              max-width: 120px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-left: 10px;
            }
            .v-line {
              padding: 0 10px;
            }
            .exam-stu-count {
              max-width: 125px;
            }
            .el-button {
              margin-left: 10px;
            }
          }
          .join-school-filter {
            display: flex;
            justify-content: flex-end;
            .el-select {
              width: 120px;
            }
            .filter-condition {
              width: 220px;
            }
          }
        }
        .opra-row {
          margin: 10px 0;
          .opra-left {
            line-height: 36px;
            .el-button {
              color: #7b7b7b;
              &:hover {
                color: #409eff;
              }
            }
          }
          .opra-right {
            .el-button {
              float: right;
              font-size: 12px;
              color: #f56c6c;
            }
          }
        }
        .table-stu {
          th {
            padding: 8px 0;
          }
          .delete {
            color: #f56c6c;
          }
          .page-box {
            text-align: center;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
.area-setting-dialog {
  .subject-row {
    padding-bottom: 20px;
    .tips {
      display: block;
      margin: 10px 0;
    }
  }
}
.exam-student-dialog {
  .search-row {
    padding-bottom: 20px;
    .el-col:first-child {
      font-weight: 900;
      line-height: 36px;
    }
  }
  .grade-row {
    .el-select {
      width: 50%;
    }
  }
  .student-row {
    .el-select {
      width: 100%;
    }
  }
  .base-info {
    border-top: 1px solid #a4a4a4;
    .student-info {
      .el-col {
        margin-top: 20px;
      }
      .el-input {
        width: 185px;
      }
    }
    .exam-info-form {
      margin-top: 20px;
    }
  }
}
.grade-dialog {
  .grade-row {
    margin-bottom: 15px;
  }
  .class-row {
    margin-bottom: 15px;
    .check-all-row {
      margin-bottom: 5px;
      .class-total {
        margin-left: 20px;
      }
    }
    .el-checkbox-group {
      padding-left: 20px;
      .el-checkbox {
        margin: 15px 30px 0 0;
      }
    }
  }
}
.quick-upload-dialog {
  .quick-upload-title {
    width: 100%;
    display: block;
    padding-top: 20px;
    margin: -26px 0 20px;
  }
  .el-radio-group {
    .upload-radio {
      display: block;
      margin: 0 0 10px;
    }
  }
  .select-file {
    display: inline-block;
  }
  .download-moban {
    margin-left: 10px;
  }
}
</style>
