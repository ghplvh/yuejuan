<template>
  <el-row>
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/exam/' + examId }">{{examInfo.examName}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/subjectMain/' + examId + '/' + examSubjectId}">
            <span>{{examGrade.gradeName + examSubjectInfo.subjectName}}</span>
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
          <el-breadcrumb-item :to="{ path: '/examPaperStructure/' + examId + '/' + examSubjectId }">设置试卷结构</el-breadcrumb-item>
          <el-breadcrumb-item>设置答案</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row id="setting-answer">
      <div class="tabs">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="客观题答案" name="objAnswer">
            <el-card>
              <div slot="header">
                <span class="tixing_header">单选题答案</span>
              </div>
              <template v-if="singleQuestions.length > 0">
                <el-row class="answer-item" type="flex" align="middle" v-for="(single,sqIndex) in singleQuestions" :key="sqIndex">
                  <el-col :span="1">{{single.tnumber}}</el-col>
                  <el-col :span="11" :offset="2">
                    <el-radio-group v-model="single.answer" size="mini" :disabled="!canEdit">
                      <el-radio-button v-for="label in getAnswerArr(parseInt(single.optionCount))" :label="label" :key="label"></el-radio-button>
                    </el-radio-group>
                  </el-col>
                  <!-- <template v-if="canEdit">
                  <el-col :span="6" :offset="4">
                    <el-radio-group v-model="topicTypes" size="mini">
                      <el-radio-button v-for="label in topicTypeList" :label="label.id" :key="label">{{label.name}}</el-radio-button>
                    </el-radio-group>
                  </el-col>
                </template>
                <template v-else>
                </template> -->
                  <el-col :span="7" :offset="3">
                    正确答案分数: {{single.score}}分
                  </el-col>
                </el-row>
              </template>
              <div v-else class="font-fade">暂无数据</div>
            </el-card>
            <el-card>
              <div slot="header">
                <span class="tixing_header">多选题答案</span>
              </div>
              <template v-if="multipleQuestions.length > 0">
                <el-row class="answer-item" type="flex" align="middle" v-for="(multiple,mqIndex) in multipleQuestions" :key="mqIndex">
                  <el-col :span="1">{{multiple.tnumber}}</el-col>
                  <el-col :span="11" :offset="2">
                    <el-checkbox-group v-model="multiple.answer" size="mini" :disabled="!canEdit">
                      <el-checkbox-button v-for="label in getAnswerArr(parseInt(multiple.optionCount))" :label="label" :key="label">{{label}}</el-checkbox-button>
                    </el-checkbox-group>
                  </el-col>
                  <!-- <template v-if="canEdit">
                  <el-col :span="6" :offset="4">
                    <el-radio-group v-model="topicTypes" size="mini">
                      <el-radio-button v-for="label in topicTypeList" :label="label.id" :key="label">{{label.name}}</el-radio-button>
                    </el-radio-group>
                  </el-col>
                </template>
                <template v-else>
                </template> -->
                  <el-col :span="3" :offset="3">
                    正确答案分数: {{multiple.score}}分
                  </el-col>
                  <el-col :span="3" :offset="1">
                    漏选得分: {{multiple.minscore}}分
                  </el-col>
                </el-row>
              </template>
              <div v-else class="font-fade">暂无数据</div>
            </el-card>
            <el-card>
              <div slot="header">
                <span class="tixing_header">判断题答案</span>
              </div>
              <template v-if="judgeQuestions.length > 0">
                <el-row class="answer-item" type="flex" align="middle" v-for="(judge,jqIndex) in judgeQuestions" :key="jqIndex">
                  <el-col :span="1">{{judge.tnumber}}</el-col>
                  <el-col :span="11" :offset="2">
                    <el-radio-group v-model="judge.answer" size="mini" :disabled="!canEdit">
                      <el-radio-button label="T"></el-radio-button>
                      <el-radio-button label="F"></el-radio-button>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="7" :offset="3">
                    正确答案分数: {{judge.score}}分
                  </el-col>
                </el-row>
              </template>
              <div v-else class="font-fade">暂无数据</div>
              <div>
                <div class="footer">
                  <template v-if="canEdit">
                    <el-button size="mini" @click="canEdit = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="saveAnswer()">确定</el-button>
                  </template>
                  <template v-else>
                    <el-button size="mini" @click="showExportDialog()">批量导入</el-button>
                    <el-button type="primary" size="mini" @click="canEdit = true">手动编辑</el-button>
                  </template>
                </div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="主观题答案" name="subAnswer">
            <el-row class="subjective">
              <el-row type="flex" align="middle">
                <el-col :span="16">
                  <span>若扫描效果较差，点击</span>
                  <el-button type="text">设置扫描仪参数</el-button>
                </el-col>
                <el-col :span="8" class="text-right">
                  <!-- <el-button type="primary" size="small">开始扫描</el-button> -->
                  <el-button type="danger" size="small" @click="deleteZgAnswer()">删除答案</el-button>
                  <el-upload :action="imgUploadUrl" :data="{filedir: 'answer/'}" class="local-upload" :before-upload="zgqUploadBefore" :on-success="zgqUploadSuccess" :show-file-list="false">
                    <el-button type="primary" size="small" plain>本地上传</el-button>
                  </el-upload>
                </el-col>
              </el-row>
              <el-row element-loading-text="拼命加载中..." v-loading="subLoading">
                <el-row class="subjective-tips" type="flex" align="middle">
                  <el-col class="text-center" v-if="zgQuestionAnswers.length <= 0">
                    <!-- <el-col>1.推荐使用扫描图片的方式，直接将答案扫描即可</el-col> -->
                    <el-col class="mgt-20">
                      1.本地上传支持<span class="danger">图片</span>格式文件
                    </el-col>
                  </el-col>
                  <el-col v-if="zgQuestionAnswers.length > 0">
                    <template v-for="(zgq,index) in zgQuestionAnswers">
                      <img v-if="zgq.pdfPath" :key="index" :src="zgq.pdfPath" alt="">
                    </template>
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-row>
    <el-dialog title="批量导入" :visible.sync="exportDialogVisible" width="400px">
      <div>通过导入excel的方式批量设置客观题答案:</div>
      <div slot="footer">
        <el-button @click="downloadTemplate()">下载模板</el-button>
        <el-upload class="dialog-upload" :action="answerImportUrl" accept=".xls,.xlsx" :show-file-list="false">
          <el-button type="primary">选择文件</el-button>
        </el-upload>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
import API from '../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      schoolCode: '',
      examId: this.$route.params.examId,
      examSubjectId: this.$route.params.examSubjectId,
      examInfo: {},
      examSubjectInfo: {},
      examSubjectList: [],
      examGrade: {},
      activeTab: this.$route.query.tabname ? this.$route.query.tabname : 'objAnswer',
      singleAnswer: 'A',
      multiAnswer: ['A', 'C'],
      judgeAnswer: 'T',
      topicTypeList: [
        { id: 0, name: '送分题' },
        { id: 1, name: '0分题' },
        { id: 2, name: '错误纠正' }
      ],
      bigQuestionNoList: [],
      singleQuestions: [],
      multipleQuestions: [],
      judgeQuestions: [],
      topicTypes: '',
      canEdit: false,
      subLoading: false,
      exportDialogVisible: false,
      imgUploadUrl: API.UPLOAD_UPLOADIMG,
      answerImportUrl: API.EXAMSTRUCTURE_IMPORTANSWERS,
      zgQuestionAnswers: []
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.initBigQuestionNoList()
    this.getExamById()
    this.getExamSubject()
    this.getExamStructureKg()
    this.getExamStructureZg()
  },
  methods: {
    showExportDialog () {
      this.exportDialogVisible = true
    },
    // 获取考试信息
    getExamById () {
      this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        this.getGradeById()
      }).catch(() => { })
    },
    // 查询所有考试科目
    getExamSubject () {
      this.axios.post(API.EXAM_EXAMSUBJECT, { examId: this.examId }).then(res => {
        this.examSubjectList = res.data.data
        this.examSubjectInfo = this.examSubjectList.filter(item => {
          return Number(item.id) === Number(this.examSubjectId)
        })[0]
      }).catch(() => { })
    },
    // 获取考试的年级
    getGradeById () {
      this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.examGrade = res.data.data[0]
      }).catch(() => { })
    },
    // 查询试卷结构(科目id/题型类型(0客观题，1主观题)
    getExamStructureKg () {
      this.loading = true
      this.singleQuestions = []
      this.multipleQuestions = []
      this.judgeQuestions = []
      this.axios.post(API.EXAMSTRUCTURE_QUERYEXAMSTRUCTURE + '/' + this.examSubjectId + '/' + 0, {}).then(res => {
        let list = res.data.data
        let data = []
        list.forEach(item => {
          item.oneDcExamStructureDtoList.forEach(question => {
            data.push(question)
          })
        })
        data.sort((a, b) => {
          let an = this.getNumberByTnumber(a.tnumber.split('.')[0])
          let bn = this.getNumberByTnumber(b.tnumber.split('.')[0])
          if (an === bn) {
            let am = parseInt(a.tnumber.split('.')[1] || 0)
            let bm = parseInt(b.tnumber.split('.')[1] || 0)
            return am - bm
          } else {
            return an - bn
          }
        })
        data.forEach(item => {
          if (parseInt(item.topicType) === 1) {
            this.singleQuestions.push(item)
          }
          if (parseInt(item.topicType) === 2) {
            if (item.answer) {
              item.answer = item.answer.split('')
            } else {
              item.answer = []
            }
            this.multipleQuestions.push(item)
          }
          if (parseInt(item.topicType) === 3) {
            this.judgeQuestions.push(item)
          }
        })
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    getExamStructureZg () {
      this.subLoading = true
      this.axios.post(API.EXAMSTRUCTURE_QUERYEXAMSTRUCTURE + '/' + this.examSubjectId + '/' + 1, {}).then(res => {
        let list = res.data.data
        this.zgQuestionAnswers = []
        list.forEach(item => {
          this.zgQuestionAnswers.push(
            { id: item.id, pdfPath: item.pdfPath || '' }
          )
        })
        this.subLoading = false
      }).catch(() => { this.subLoading = false })
    },
    // 获取答案选项
    getAnswerArr (count, start = 'A') {
      let startCodeA = start.charCodeAt()
      let arr = []
      for (let i = startCodeA; i < startCodeA + count; i++) {
        arr.push(String.fromCharCode(i))
      }
      return arr
    },
    // 初始化大题题号到80
    initBigQuestionNoList () {
      for (let i = 1; i <= 80; i++) {
        let bigNo = ''
        if (i <= 10) {
          bigNo = this.getNumberUpper(i)
        } else if (i > 10 && i < 20) {
          bigNo = '十' + this.getNumberUpper(Number(i.toString().charAt(1)))
        } else if (i >= 20) {
          bigNo = this.getNumberUpper(Number(i.toString().charAt(0))) + '十' + this.getNumberUpper(Number(i.toString().charAt(1)))
        }
        this.bigQuestionNoList.push({ id: i, bigNo: bigNo })
      }
    },
    // 数字转汉字大写
    getNumberUpper (number = 0) {
      let numberStr = ''
      switch (number) {
        case 1:
          numberStr = '一'
          break
        case 2:
          numberStr = '二'
          break
        case 3:
          numberStr = '三'
          break
        case 4:
          numberStr = '四'
          break
        case 5:
          numberStr = '五'
          break
        case 6:
          numberStr = '六'
          break
        case 7:
          numberStr = '七'
          break
        case 8:
          numberStr = '八'
          break
        case 9:
          numberStr = '九'
          break
        case 10:
          numberStr = '十'
          break
      }
      return numberStr
    },
    // 根据汉字大题号获取对应的数字
    getNumberByTnumber (tnumber) {
      let bigNo = this.bigQuestionNoList.find(item => {
        return item.bigNo === tnumber
      })
      if (bigNo) {
        return bigNo.id
      } else {
        return 0
      }
    },
    // 保存答案
    saveAnswer () {
      let noAnswer = []
      let answers = []
      this.singleQuestions.forEach(item => {
        answers.push({ id: item.id, answer: item.answer })
        if (!item.answer) {
          noAnswer.push(item.tnumber)
        }
      })
      this.multipleQuestions.forEach(item => {
        answers.push({ id: item.id, answer: item.answer.join('') })
        if (item.answer.length === 0) {
          noAnswer.push(item.tnumber)
        }
      })
      this.judgeQuestions.forEach(item => {
        answers.push({ id: item.id, answer: item.answer })
        if (!item.answer) {
          noAnswer.push(item.tnumber)
        }
      })
      if (noAnswer.length > 0) {
        this.$confirm(noAnswer.join('，') + '，答案为空，请检查！', '提示', {
          confirmButtonText: '继续保存',
          cancelButtonText: '取消保存',
          // type: 'warning',
          center: true
        }).then(() => {
          this.updateAnswer(answers)
        }).catch(() => { })
      } else {
        this.updateAnswer(answers)
      }
    },
    // 保存答案
    updateAnswer (answerArr) {
      this.axios.post(API.EXAMSTRUCTURE_UPDATEBATCHANSWER, answerArr).then(res => {
        this.getExamStructureKg()
        this.canEdit = false
      }).catch(() => { })
    },
    // 上传主观题答案前
    zgqUploadBefore (file) {
      if (this.zgQuestionAnswers.length <= 0) {
        this.$message({
          message: '请先设置主观题',
          type: 'warning'
        })
        return false
      }
    },
    // 上传主观题答案成功
    zgqUploadSuccess (response, file, fileList) {
      let url = response.data.data
      let zgq = this.zgQuestionAnswers[0]
      let data = [
        { id: zgq.id, pdfPath: url }
      ]
      this.axios.post(API.EXAMSTRUCTURE_MAINEXAMANSWER, data).then(res => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.getExamStructureZg()
      }).catch(() => { })
    },
    // 删除主观题答案
    deleteZgAnswer () {
      let zgq = this.zgQuestionAnswers[0]
      if (!zgq || !zgq.pdfPath) {
        this.$message({
          message: '没有需要删除的答案',
          type: 'success'
        })
        return false
      }
      this.$confirm('你确定要删除答案吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = [
          { id: zgq.id, pdfPath: '' }
        ]
        this.axios.post(API.EXAMSTRUCTURE_MAINEXAMANSWER, data).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getExamStructureZg()
        }).catch(() => { })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    downloadTemplate () {
      let url = API.EXAMSTRUCTURE_EXPORTSETTHEANSWER + '/' + this.examSubjectId
      this.download(url)
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
.el-dropdown-menu {
  .el-dropdown-menu__item {
    font-size: 12px;
    padding: 0 15px;
    line-height: 30px;
  }
}
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
#setting-answer {
  .tabs {
    background-color: #ffffff;
    padding: 0 20px;
    .el-tabs {
      .el-card {
        margin: 0px 0px 15px;
        .el-card__header {
          padding: 10px 30px;
          .tixing_header {
            border-left: 3px solid #2097ff;
            padding-left: 10px;
            line-height: 16px;
            font-size: 14px;
          }
        }
        .el-card__body {
          padding: 0 30px 30px;
          .answer-item {
            height: 70px;
            font-size: 14px;
            border-bottom: 2px dashed hsla(0, 0%, 75%, 0.623);
            .el-radio-group {
              .el-radio-button__orig-radio {
                &:disabled {
                  &:checked {
                    & + .el-radio-button__inner {
                      background-color: #409eff;
                      color: #ffffff;
                    }
                  }
                  & + .el-radio-button__inner {
                    color: #606266;
                    background-color: #ffffff;
                    border-color: #dcdfe6;
                    cursor: unset;
                  }
                }
              }
            }
            .el-checkbox-group {
              .is-disabled {
                .el-checkbox-button__inner {
                  background-color: #ffffff;
                  border-color: #dcdfe6;
                  color: #606266;
                  cursor: unset;
                }
              }
              .is-checked {
                .el-checkbox-button__inner {
                  background-color: #409eff;
                  color: #ffffff;
                }
              }
            }
          }
          .font-fade {
            text-align: center;
            font-size: 14px;
            padding-top: 27px;
            color: #b1b1b1 !important;
            line-height: 56px;
          }
        }
      }
      .subjective {
        min-height: 300px;
        font-size: 14px;
        .text-right {
          text-align: right;
        }
        .local-upload {
          margin-left: 20px;
          display: inline-block;
        }
        .subjective-tips {
          min-height: 300px;
          img {
            max-width: 100%;
          }
          .text-center {
            text-align: center;
          }
          .mgt-20 {
            margin-top: 20px;
          }
          .danger {
            color: #f56c6c;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    text-align: center;
    background-color: #ffffff;
    padding: 25px 0;
    z-index: 2000;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 1200px;
  }
}
.dialog-upload {
  display: inline-block;
  margin-left: 20px;
}
</style>
