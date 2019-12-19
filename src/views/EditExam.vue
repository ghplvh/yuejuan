<template>
  <div id="create-exam">
    <el-card>
      <div slot="header" class="exam-header">
        <router-link :to="{path: '/exam/'+examId}">{{examInfo.examName}}</router-link> > <span>考试信息修改</span>
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
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="examForm.examDateFrom"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="3">
              <el-form-item prop="endDate">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="examForm.examDateTo"></el-date-picker>
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
          <el-form-item label="选择学校" v-if="examForm.examRange > 1">
            <el-checkbox-group v-model="examForm.schoolList">
              <el-checkbox v-for="school in examSchoolList" :key="school.id" :label="school.id">{{school.name}}</el-checkbox>
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
      <div class="exam-subjects">
        <div class="exam-subjects-title">
          <span>科目管理</span>
          <el-button type="primary" size="small" @click="addSubjects()">添加科目</el-button>
          <el-button size="small" @click="removeAll()">全部清空</el-button>
        </div>
        <div class="exam-subjects-content">
          <p class="exam-subjects-content-title">已经创建</p>
          <div class="exam-subjects-content-tags">
            <el-tag v-for="(tag,index) in subjectTagList" :key="index" closable color="#ffffff" @close="tagClose(index)">{{tag.gradeName + tag.subjectName}}</el-tag>
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
          <el-option v-for="(item,index) in optionList" :key="index" :label="item.name" :value="item"></el-option>
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
        <el-radio-group v-model="subjectGrade">
          <el-radio v-for="grade in gradeList" :key="grade.id" :label="grade">{{grade.gradeName}}</el-radio>
        </el-radio-group>
      </div>
      <div class="subject-subjects">
        <h3>学科选择</h3>
        <el-button size="small" type="text" @click="setAddSubject()">添加</el-button>
        <el-checkbox-group v-model="gradeSubjects">
          <el-checkbox v-for="(sub,index) in subjectList" :key="index" :label="sub">{{sub.examSubjectDesc}}</el-checkbox>
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
        subjectId: ''
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
      examId: this.$route.params.examId,
      examInfo: {},
      schoolCode: '',
      gradeInfo: {},
      templateList: [],
      subjectTagList: [],
      dialogSchoolVisible: false,
      loading: false,
      saveLoading: false,
      school: { id: '', name: '' },
      schoolList: [],
      optionList: [],
      dialogSubjectVisible: false,
      subjectGrade: {},
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
    this.getExamInfo()
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
    // 根据考试id查询考试信息
    async getExamInfo () {
      this.loading = true
      await this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        this.examForm = res.data.data[0]
        this.examForm.examRange = parseInt(res.data.data[0].examRange)
        this.getExamGrade()
      }).catch(() => { this.loading = false })
      await this.getGradeList()
      await this.getAllSubject()
    },
    // 获取考试的年级
    getExamGrade () {
      this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.gradeInfo = res.data.data[0]
        this.getExamSubject()
      }).catch(() => { this.loading = false })
    },
    // 查询考试的所有科目
    getExamSubject () {
      this.axios.post(API.EXAM_SELECTSUBJECT, { examId: this.examId }).then(res => {
        this.subjectTagList = res.data.data.map(sub => {
          sub.gradeName = this.gradeInfo.gradeName
          return sub
        })
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 查询学校所有年级
    async getGradeList () {
      await this.axios.post(`${API.GRADE_FINDBYGRADES}/${this.schoolCode}`).then(res => {
        this.gradeList = res.data.data
        this.subjectGrade = res.data.data && res.data.data[0]
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
    selectTemplate (subjects) {
      this.subjectTagList = subjects
    },
    // 清空所有
    removeAll () {
      this.subjectTagList = []
    },
    // 获取学校的所有科目
    async getAllSubject () {
      await this.axios.post(API.EXAM_FINDBYSUBJECTCOM, { schoolCode: this.schoolCode }).then(res => {
        this.subjectList = res.data.data
      }).catch(() => { })
    },
    // 显示新增科目弹窗
    addSubjects () {
      this.dialogSubjectVisible = true
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
          subjectId: item.id,
          subjectName: item.examSubjectDesc
        })
      })
      this.subjectGrade = ''
      this.gradeSubjects = []
      this.dialogSubjectVisible = false
    },
    // 保存考试
    saveExam () {
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
            return item.subjectId
          })
          // delete this.examForm.createTime
          // delete this.examForm.modifyTime
          delete this.examForm.classCount
          delete this.examForm.establishName
          this.examForm.id = this.examId
          this.examForm.gradeId = this.examInfo.gradeId
          this.examForm.subjectId = subjectIds.join(',')
          console.log(this.examForm)
          this.axios.post(API.EXAM_UPDATEBYID, this.examForm).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/home')
            this.saveLoading = false
          }).catch(() => { this.saveLoading = false })
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
      font-size: 15px;
      a {
        color: #409eff;
      }
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
          }
          .add-exam-school {
            border-color: transparent;
            color: #409eff;
            margin-left: 20px;
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
            width: 95px;
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
