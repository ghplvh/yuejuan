<template>
  <div id="create-exam">
    <el-card>
      <div slot="header" class="exam-header">
        <span>创建考试</span>
      </div>
      <div class="exam-settings">
        <p class="exam-setting-title">基本设置</p>
        <el-form :model="examForm" :rules="examFormRules" ref="examForm" label-position="left" label-width="80px">
          <el-form-item label="考试名称" prop="examName">
            <el-input size="medium" v-model="examForm.examName"></el-input>
          </el-form-item>
          <el-form-item label="考试时间" required>
            <el-col :span="3">
              <el-form-item prop="startDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="examForm.examDateFrom"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="3">
              <el-form-item prop="endDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="examForm.examDateTo"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="考试类型">
            <el-radio-group v-model="examForm.examType">
              <el-radio v-for="type in examTypeList" :key="type.id" :label="type.id">{{type.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考试范围">
            <el-radio-group v-model="examForm.examRange">
              <el-radio v-for="range in examRangeList" :key="range.id" :label="range.id">{{range.name}}</el-radio>
            </el-radio-group>
            <div class="form-tips">统考发起学校统一设置试卷结构、模板、题块、答案、原卷；参与学校独立设置考生、扫描试卷、阅卷（仅阅本校）</div>
          </el-form-item>
          <el-form-item label="选择学校" v-if="examForm.examRange >= 1">
            <el-checkbox-group v-model="examForm.schoolList">
              <el-checkbox v-for="school in schoolList" :key="school.id" :label="school.schoolCode">{{school.schoolName}}</el-checkbox>
            </el-checkbox-group>
            <el-button plain class="add-exam-school" icon="el-icon-plus" size="small" @click="addExamSchool">添加学校（请至少选择两所学校）</el-button>
          </el-form-item>
          <el-form-item label="考试模式">
            <el-radio-group v-model="examForm.examMode">
              <el-radio v-for="mode in examModeList" :key="mode.id" :label="mode.id">{{mode.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="阅卷方式">
            <el-radio-group v-model="examForm.checkMode">
              <el-radio v-for="way in yueJuanWayList" :key="way.id" :label="way.id">{{way.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="exam-template">
        <p class="exam-template-title">选择模板</p>
        <div class="exam-template-content">
          <template v-for="temp in templateList">
            <el-popover width="280" placement="top" trigger="hover" :key="temp.id" popper-class="template-popper">
              <el-row type="flex" align="middle">
                <el-tag v-for="sub in temp.subList" :key="sub.id">{{temp.gradeList[0].gradeName + sub.examSubjectDesc}}</el-tag>
              </el-row>
              <el-button plain slot="reference" @click="selectTemplate(temp)">{{temp.templateName}}</el-button>
            </el-popover>
          </template>
        </div>
      </div>
      <div class="exam-subjects">
        <div class="exam-subjects-title">
          <span>科目管理</span>
          <el-button type="primary" size="small" @click="addSubjects()">添加科目</el-button>
          <el-button size="small" @click="removeAll()">全部清空</el-button>
        </div>
        <div class="exam-subjects-content">
          <p class="exam-subjects-content-title">已经创建</p>
          <div class="exam-subjects-content-tags">
            <el-tag v-for="(tag,index) in subjectTagList" :key="index" closable color="#ffffff" @close="tagClose(index)">{{tag.gradeName + tag.examSubjectDesc}}</el-tag>
          </div>
        </div>
      </div>
      <div class="exam-opration">
        <el-button type="primary" @click="saveExam()" :loading="saveLoading">保存</el-button>
        <el-button @click="closeExam()">关闭</el-button>
      </div>
    </el-card>
    <el-dialog title="添加学校" :visible.sync="dialogSchoolVisible" custom-class="school-dialog">
      <span>学校</span>
      <el-select remote filterable :remote-method="remoteMethod" :loading="loading" loading-text="加载中，请稍后..." size="small" v-model="school" value-key="id" placeholder="请选择或输入">
        <el-option-group label="匹配到的学校">
          <el-option v-for="item in optionList" :key="item" :label="item.name" :value="item"></el-option>
        </el-option-group>
      </el-select>
      <span slot="footer">
        <el-button @click="saveAndContinue()">保存并继续</el-button>
        <el-button type="primary" @click="addSchool()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加科目" :visible.sync="dialogSubjectVisible" width="800px" custom-class="subject-dialog">
      <div class="subject-grade">
        <h3>年级选择</h3>
        <el-radio-group v-model="subjectGradeId" @change="gradeChange">
          <el-radio v-for="grade in gradeList" :key="grade.id" :label="grade.id" :disabled="getGradeDisabled(grade)">{{grade.gradeName}}</el-radio>
        </el-radio-group>
      </div>
      <div class="subject-subjects">
        <h3>学科选择</h3>
        <el-button size="small" type="text" @click="setAddSubject()">添加</el-button>
        <el-checkbox-group v-model="gradeSubjects">
          <el-checkbox v-for="(sub,index) in subjectList" :key="index" :label="sub" @click="subjectClick" :disabled="getSubjectDisabled(sub)">{{sub.examSubjectDesc}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="subject-preview">
        <h3>预览创建</h3>
        <el-tag closable v-for="(subTag,index) in gradeSubjects" :key="index" @close="removeGradeSubject(index)">{{subjectGrade.gradeName + subTag.examSubjectDesc}}</el-tag>
      </div>
      <span slot="footer">
        <el-button type="primary" :disabled="!canAddSubject" @click="addGradeSubject()">保存</el-button>
        <el-button @click="dialogSubjectVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加学科" width="500px" :visible.sync="addSubjectVisible" custom-class="add-subject-dialog">
      <span>学科名称：</span>
      <el-input size="medium" v-model="addSubjectName" placeholder="请输入学科名称"></el-input>
      <div slot="footer">
        <el-button type="primary" @click="saveSubject()">保存</el-button>
        <el-button @click="addSubjectVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/api.js'
import { mapState } from 'vuex'
import Utils from '../utils/Utils'
export default {
  data () {
    return {
      examTypeList: [
        { id: 0, name: '普通' },
        { id: 1, name: '月考' },
        { id: 2, name: '期中' },
        { id: 3, name: '期末' },
        { id: 4, name: '竞赛' }
      ],
      examRangeList: [
        { id: 0, name: '校内' },
        { id: 1, name: '联考' },
        { id: 2, name: '统考' }
      ],
      examSchoolList: [
        { id: 1, name: '新邵县第一中学' }
      ],
      examModeList: [
        { id: 0, name: '行政班' },
        { id: 1, name: '分层走班（教学班）' }
      ],
      yueJuanWayList: [
        { id: 0, name: '线上阅卷' },
        { id: 1, name: '先阅后扫' }
      ],
      examForm: {
        examName: '',
        examDateFrom: '',
        examDateTo: '',
        examType: 0,
        examRange: 0,
        examMode: 0,
        checkMode: 0,
        gradeId: '',
        subjectId: '',
        schoolList: []
      },
      examFormRules: {
        examName: [
          { required: true, message: '请输入考试名称', trigger: 'blur' }
        ],
        examDateFrom: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        examDateTo: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ]
      },
      schoolCode: '',
      templateList: [],
      subjectTagList: [],
      dialogSchoolVisible: false,
      loading: false,
      saveLoading: false,
      school: { id: '', name: '' },
      schoolList: [],
      optionList: [],
      dialogSubjectVisible: false,
      tempGrade: {},
      subjectGrade: {},
      subjectGradeId: '',
      subjectGradeList: [],
      gradeSubjects: [],
      subjectList: [],
      gradeList: [],
      addSubjectVisible: false,
      addSubjectName: ''
    }
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.getSubjectTemplateList()
    this.getGradeList()
    this.getAllSubject()
    this.getSchools()
  },
  computed: {
    ...mapState(['adminInfo']),
    // （判断是否选择年级和科目）是否允许增加科目
    canAddSubject: function () {
      if (this.subjectGrade && this.gradeSubjects.length > 0) {
        return true
      }
      return false
    }
  },
  mounted () {
  },
  methods: {
    // 获取学校列表
    getSchools () {
      this.axios.post(API.ADMINSCHOOL_GETSCHOOL, {}).then(res => {
        this.schoolList = res.data.data
      }).catch(() => { })
    },
    // 查询所有考试模板
    getSubjectTemplateList () {
      this.axios.post(API.EXAM_FINDBYTEMPLATELIST, { schoolCode: this.schoolCode }).then(res => {
        this.templateList = res.data.data
        // this.getSubjectsById(res.data.data)
      }).catch(() => { })
    },
    // 根据模板id查询科目信息
    async getSubjectsById (templateList) {
      let len = templateList.length
      for (let i = 0; i < len; i++) {
        let item = templateList[i]
        await this.axios.post(API.EXAM_FINDBYTEMSUBCOM, { id: item.id }).then(res => {
          this.templateList.splice(i, 1, {
            id: item.id,
            templateName: item.templateName,
            subjects: res.data.data
          })
        }).catch(() => { })
      }
    },
    // 查询学校所有年级
    getGradeList () {
      this.axios.post(`${API.GRADE_FINDBYGRADES}/${this.schoolCode}`).then(res => {
        this.gradeList = res.data.data.map(item => {
          let data = {
            id: item.id,
            gradeName: item.gradeName,
            schoolCode: item.schoolCode
          }
          return data
        })
      }).catch(() => { })
    },
    // 标签关闭事件
    tagClose (index) {
      this.subjectTagList.splice(index, 1)
    },
    // select下拉框远程搜索（匹配学校）方法
    remoteMethod (query = '') {
      if (query !== '') {
        this.loading = true
        setTimeout(async () => {
          this.optionList = await this.schoolList.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
          this.loading = false
        }, 200)
      } else {
        this.optionList = []
      }
    },
    // 显示添加考试学校的弹窗
    addExamSchool () {
      this.dialogSchoolVisible = true
    },
    // 保存并继续
    saveAndContinue () {
      let hasThisSchool = this.examSchoolList.find((item) => {
        return item.id === this.school.id
      })
      if (!hasThisSchool) {
        this.examSchoolList.push(this.school)
      } else {
        this.$message({
          message: '该学校已经添加，请选择其他学校！',
          type: 'warning'
        })
      }
    },
    // 添加学校
    addSchool () {
      this.saveAndContinue()
      this.dialogSchoolVisible = false
    },
    // 选择模板
    selectTemplate (temp) {
      this.subjectTagList = temp.subList.map(item => {
        item.gradeId = temp.gradeList[0].id
        item.gradeName = temp.gradeList[0].gradeName
        return item
      })
    },
    // 清空所有
    removeAll () {
      this.subjectTagList = []
    },
    // 获取学校的所有科目
    getAllSubject () {
      this.axios.post(API.EXAM_FINDBYSUBJECTCOM, { schoolCode: this.schoolCode }).then(res => {
        this.subjectList = res.data.data
      }).catch(() => { })
    },
    // 显示新增科目弹窗
    addSubjects () {
      if (this.gradeList.length === 0) {
        this.$message({
          message: '该学校还没有年级',
          type: 'warning'
        })
        return false
      }
      this.subjectGradeId = this.subjectTagList.length > 0 ? this.subjectTagList[0].gradeId : this.gradeList[0].id
      this.gradeChange(this.subjectGradeId)
      this.dialogSubjectVisible = true
    },
    gradeChange (id) {
      this.subjectGrade = this.gradeList.find(item => {
        return id === item.id
      })
    },
    subjectClick () { },
    // 根据ID获取年级
    // 获取年级是否禁选
    getGradeDisabled (grade) {
      if (this.subjectTagList.length === 0) {
        return false
      } else {
        if (grade.id !== this.subjectTagList[0].gradeId) {
          return true
        } else {
          return false
        }
      }
    },
    // 获取科目是否禁选
    getSubjectDisabled (subject) {
      if (this.subjectTagList.length === 0) {
        return false
      } else {
        let sub = this.subjectTagList.find(item => {
          return item.id === subject.id
        })
        if (sub) {
          return true
        } else {
          return false
        }
      }
    },
    // 取消选择一个科目
    removeGradeSubject (index) {
      this.gradeSubjects.splice(index, 1)
    },
    // 新增科目
    addGradeSubject () {
      this.gradeSubjects.forEach(item => {
        this.subjectTagList.push({
          gradeId: this.subjectGrade.id,
          gradeName: this.subjectGrade.gradeName,
          id: item.id,
          examSubjectDesc: item.examSubjectDesc
        })
      })
      this.subjectGrade = ''
      this.gradeSubjects = []
      this.dialogSubjectVisible = false
    },
    // 保存考试
    saveExam () {
      console.log(Utils.formatTime(this.examForm.examDateFrom))
      this.$refs['examForm'].validate(valid => {
        if (valid) {
          if (this.subjectTagList.length === 0) {
            this.$message({
              message: '请选择考试科目',
              type: 'warning'
            })
            return
          }
          this.saveLoading = true
          let subjectIds = this.subjectTagList.map(item => {
            return item.id
          })
          this.examForm.establishId = this.adminInfo.teacherInfo.id
          this.examForm.schoolCode = this.examForm.examRange === 1 ? this.examForm.schoolList.join(',') : this.schoolCode
          this.examForm.gradeId = this.subjectTagList[0].gradeId
          this.examForm.subjectId = subjectIds.join(',')
          this.examForm.examDateFrom = Utils.formatTime(this.examForm.examDateFrom)
          this.examForm.examDateTo = Utils.formatTime(this.examForm.examDateTo)
          this.axios.post(API.EXAM_ESTABLISH, this.examForm).then(res => {
            this.$router.push('/home')
            this.saveLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 关闭
    closeExam () {
      this.$router.push('/home')
    },
    // 添加学科弹窗显示
    setAddSubject () {
      this.addSubjectName = ''
      this.addSubjectVisible = true
    },
    saveSubject () {
      let data = {
        examSubjectDesc: this.addSubjectName,
        schoolCode: this.schoolCode
      }
      this.axios.post(API.EXAM_INSERTSUBJECT, data).then(res => {
        this.$message({
          message: '添加学科成功',
          type: 'success'
        })
        this.addSubjectVisible = false
        this.getAllSubject()
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss">
#create-exam {
  font-size: 16px;
  .el-card {
    .exam-header {
      font-size: 20px;
    }
    .el-card__body {
      .exam-settings {
        .exam-setting-title {
          font-size: 18px;
          color: #333;
          margin-bottom: 20px;
        }
        .el-form {
          .el-form-item__label {
            font-weight: 700;
            color: #999;
          }
          .el-input {
            width: 350px;
          }
          .el-date-editor {
            width: 150px;
          }
          .line {
            width: 50px;
            margin-left: 15px;
            text-align: center;
          }
          .form-tips {
            font-size: 10px;
            color: #6d727a;
          }
          .el-checkbox-group {
            display: inline-block;
            line-height: 30px;
            .el-checkbox {
              margin-left: 0px;
              margin-right: 30px;
            }
          }
          .add-exam-school {
            border-color: transparent;
            color: #409eff;
            padding-left: 0px;
            // margin-left: 20px;
          }
        }
      }
      .exam-template {
        .exam-template-title {
          font-size: 18px;
          color: #333;
          border-top: 1px solid #e6e6e6;
          padding-top: 30px;
        }
        .exam-template-content {
          border-bottom: 1px solid #e6e6e6;
          padding-bottom: 30px;
          .el-button {
            // width: 95px;
            margin: 18px 18px 0 0;
          }
        }
      }
      .exam-subjects {
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 30px;
        margin-bottom: 30px;
        .exam-subjects-title {
          font-size: 18px;
          color: #333;
          border-top: 1px solid #e6e6e6;
          padding-top: 30px;
          .el-button {
            margin-left: 20px;
          }
        }
        .exam-subjects-content {
          padding-bottom: 30px;
          color: #333;
          padding-top: 30px;
          .exam-subjects-content-title {
            position: absolute;
            margin-right: 20px;
            font-size: 14px;
            line-height: 32px;
            span {
              display: block;
            }
          }
          .exam-subjects-content-tags {
            position: relative;
            left: 80px;
            margin-right: 20px;
            max-width: 840px;
            .el-tag {
              font-size: 14px;
              margin-left: 10px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .exam-opration {
        .el-button {
          width: 85px;
          font-size: 15px;
        }
      }
    }
  }
}
.template-popper {
  box-sizing: border-box;
  padding: 12px;
  height: auto;
  .el-row {
    flex-flow: row wrap;
    .el-tag {
      max-width: calc(50% - 20px);
      background-color: #ffffff;
      font-size: 15px;
      margin: 5px 10px 10px;
    }
  }
}
.school-dialog {
  .el-select {
    width: 338px;
    margin-left: 20px;
  }
}
.subject-dialog {
  h3 {
    font-size: 16px;
    margin: 20px 0;
  }
  .subject-grade {
    padding-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
    .el-radio-group {
      width: 600px;
      .el-radio {
        margin-left: 30px;
        margin-top: 10px;
      }
    }
  }
  .subject-subjects {
    padding-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
    h3 {
      display: inline-block;
    }
    .el-button {
      margin-left: 10px;
    }
    .el-checkbox-group {
      width: 600px;
      .el-checkbox {
        margin-top: 10px;
        margin-left: 30px;
      }
    }
  }
  .subject-preview {
    padding-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
    .el-tag {
      font-size: 14px;
      margin-left: 10px;
      margin-bottom: 10px;
      background-color: #fff;
    }
  }
}
.add-subject-dialog {
  .el-input {
    width: 300px;
    margin-left: 10px;
  }
}
</style>
