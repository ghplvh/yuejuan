<template>
  <div id="upload-yuanjuan">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="examGrade.id && examSubjectInfo.id">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/exam/'+examId}">{{examInfo.examName}}</el-breadcrumb-item>
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
          <el-breadcrumb-item>上传原卷</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-form :model="ytForm" :rules="ytFormRules" :inline="true" ref="ytForm" class="quill-form" label-width="100px">
        <el-form-item prop="subject1" label="题目">
          <quill-editor v-model="ytForm.subject1" ref="subject" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item prop="answer" label="答案">
          <quill-editor v-model="ytForm.answer" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item prop="questionBlock" label="题块">
          <el-select v-model="ytForm.questionBlock" value-key="id">
            <el-option v-for="blk in blockList" :key="blk.id" :label="blk.titleBlockName" :value="blk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="tNumber" label="题号">
          <el-select v-model="ytForm.tNumber">
            <el-option v-for="tn in tnumberList" :key="tn.id" :label="tn.tnumber" :value="tn.tnumber"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sore" label="分数">
          <el-input v-model.number="ytForm.sore"></el-input>
        </el-form-item>
        <el-form-item prop="types" label="类型">
          <el-select v-model="ytForm.types">
            <el-option v-for="tp in typeList" :key="tp.id" :label="tp.name" :value="tp.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="difficulty" label="难度">
          <div class="rate-box">
            <el-rate v-model="ytForm.difficulty" :texts="rateTexts" show-text @change="difficultyChange"></el-rate>
          </div>
        </el-form-item>
        <el-form-item prop="imgPathOne" label="原题图片" class="img-item">
          <el-upload class="yt-img-up" :file-list="ytImgList" :data="{filedir:'yue/'}" :action="uploadUrl" list-type="picture-card" accept="image/*" :on-preview="pictureCardPreview" :on-remove="ytImgRemove" :on-success="ytImgSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="knowledgePoints" label="知识点" class="nlg-item">
          <el-select class="search-select" v-model="ytForm.knowledgePoints" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="nlg in knowledgeList" :key="nlg.id" :label="nlg.name" :value="nlg.id" @click.native="selectOption(nlg)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="options" label="选项" class="opt-item" v-if="[0,1].includes(ytForm.types)">
          <div class="option-item" v-for="(option,index) in ytForm.options" :key="index">
            <span class="opt-title">选项名</span>
            <el-input class="opt-key" v-model="option.key"></el-input>
            <span class="opt-title">选项内容</span>
            <quill-editor v-model="option.value" :options="editorOption"></quill-editor>
            <el-button type="primary" icon="el-icon-plus" circle @click="addOption()"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteOption(index)" v-if="ytForm.options.length > 1"></el-button>
          </div>
        </el-form-item>
        <el-button class="submit-btn" type="primary" :loading="buttonLoading" @click="addOriginal('ytForm')">{{submitButtonText}}</el-button>
        <el-button class="submit-btn" @click="cancelEdit()" :disabled="submitType === 'add'">取消修改</el-button>
      </el-form>
      <div id="questions">
        <el-card class="question-preview question-card" shadow="never">
          <div slot="header">
            <span>题目预览</span>
          </div>
          <div class="card-center">
            <div v-html="ytForm.subject1"></div>
            <template v-if="[0,1].includes(ytForm.types)">
              <div v-for="opt in ytForm.options" :key="opt.key" class="option-item">
                <span>{{opt.key}}：</span><span v-html="opt.value"></span>
              </div>
            </template>
            <template v-for="img in (ytForm.imgPathOne ? ytForm.imgPathOne.split(',') : [])">
              <img v-if="img" :key="img" :src="img" alt="原题图片">
            </template>
          </div>
          <el-collapse value="preview" accordion>
            <el-collapse-item name="preview">
              <template slot="title">
                <el-row class="card-footer" type="flex" align="middle" justify="space-between">
                  <el-col :span="20">
                    <span>题型：{{getTypeById(ytForm.types)}}</span>
                    <span class="footer-split">|</span>
                    <span>难度：{{rateTexts[ytForm.difficulty - 1]}}</span>
                    <span class="footer-split">|</span>
                    <span>题块：{{ytForm.questionBlock ? ytForm.questionBlock.titleBlockName : ''}}</span>
                    <span class="footer-split">|</span>
                    <span>题号：{{ytForm.tNumber}}</span>
                    <span class="footer-split">|</span>
                    <span>分数：{{ytForm.sore}}</span>
                    <span class="footer-split">|</span>
                    <span>
                      <span>知识点：</span>
                      <el-popover placement="top-start" title="知识点" width="600" trigger="hover" :content="getKnowledgeName()">
                        <el-button class="pop-reference" type="text" size="mini" slot="reference">{{getKnowledgeName()}}</el-button>
                      </el-popover>
                    </span>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="text" size="mini" icon="el-icon-document">查看解析</el-button>
                  </el-col>
                </el-row>
              </template>
              <div class="answer-title">答案解析</div>
              <div v-html="ytForm.answer"></div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
        <el-card class="question-card" shadow="never" v-for="yt in originalList" :key="yt.id">
          <div class="card-center">
            <div v-html="yt.subject1"></div>
            <div v-if="[0,1].includes(yt.types)">
              <div v-for="(opt,key) in yt.options" :key="key" class="option-item">
                <span>{{key}}：</span><span v-html="opt"></span>
              </div>
            </div>
            <template v-for="img in (yt.imgPathOne ? yt.imgPathOne.split(',') : [])">
              <img v-if="img" :key="img" :src="img" alt="原题图片">
            </template>
          </div>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <el-row class="card-footer" type="flex" align="middle" justify="space-between">
                  <el-col :span="20">
                    <span>题型：{{getTypeById(yt.types)}}</span>
                    <span class="footer-split">|</span>
                    <span>难度：{{rateTexts[yt.difficulty - 1]}}</span>
                    <span class="footer-split">|</span>
                    <span>题块：{{yt.titleBlockName}}</span>
                    <span class="footer-split">|</span>
                    <span>题号：{{yt.tNumber}}</span>
                    <span class="footer-split">|</span>
                    <span>分数：{{yt.sore}}</span>
                    <span class="footer-split">|</span>
                    <span>
                      <span>知识点：</span>
                      <el-popover placement="top-start" title="知识点" width="600" trigger="hover" :content="getKnowledgeName(yt.knowledgePoints)">
                        <el-button class="pop-reference" type="text" size="mini" slot="reference">{{getKnowledgeName(yt.knowledgePoints)}}</el-button>
                      </el-popover>
                    </span>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" size="mini" @click.stop="editYt(yt)">编辑</el-button>
                    <el-button type="danger" size="mini" :loading="deleteLoading" @click.stop="deleteYt(yt)">删除</el-button>
                    <el-button type="text" size="mini" icon="el-icon-document">查看解析</el-button>
                  </el-col>
                </el-row>
              </template>
              <div class="answer-title">答案解析</div>
              <div v-html="yt.answer"></div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
      <el-pagination background @prev-click="prevPage" @current-change="handleCurrentPage" @next-click="nextPage" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-row>
    <el-dialog title="查看原题图片" :visible.sync="previewVisible" width="60%" custom-class="preview-dialog">
      <div class="img-box">
        <img :src="prevImg" alt="模板">
      </div>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="previewVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import '../assets/css/questionBank.scss'
import API from '../api/api.js'
import { mapState } from 'vuex'
import Quill from 'quill'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/ImageExtend', ImageExtend)
// use resize module
Quill.register('modules/ImageResize', ImageResize)
// 自定义工具栏
const container = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['image']
]
export default {
  data () {
    let checkNumber = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    let checkDfct = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择难度'))
      }
      callback()
    }
    return {
      schoolCode: '',
      loading: false,
      examId: this.$route.params.examId,
      examInfo: {},
      examSubjectId: this.$route.params.examSubjectId,
      examSubjectInfo: {},
      examGrade: {},
      isMathjaxConfig: false, // 防止重复调用Config，造成性能损耗
      // 富文本框参数设置
      editorOption: {
        placeholder: '请输入',
        // theme: 'snow',
        modules: {
          ImageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          ImageExtend: { // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: 'file', // 图片参数名
            size: 10, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: API.UPLOAD_UPLOADIMG, // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: (res) => {
              return res.data.data
            },
            headers: (xhr) => {
              // xhr.setRequestHeader('myHeader','myValue')
            }, // 可选参数 设置请求头部
            sizeError: () => {
              this.$message({
                message: '图片大小超过限制',
                type: 'warning'
              })
            }, // 图片超过大小的回调
            start: () => { }, // 可选参数 自定义开始上传触发事件
            end: () => { }, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => { }, // 可选参数 上传失败触发的事件
            success: () => { }, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              formData.append('filedir', 'yue/')
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      },
      ytForm: {
        subject1: '', // 原题题目
        imgPathOne: '', // 原题图片
        questionBlock: '', // 题块
        tNumber: '', // 题号
        sore: '', // 题目分数
        answer: '', // 题目答案解析
        types: '', // 题目类型 0
        options: [
          { key: '', value: '' }
        ], // 选择题选项
        difficulty: 0, // 难度五星级
        knowledgePoints: [] // 知识点
      },
      ytFormRules: {
        subject1: [
          { required: true, message: '题目不能为空', trigger: ['blur', 'change'] }
        ],
        imgPathOne: [
          { required: true, message: '至少上传一张原题图片', trigger: ['blur', 'change'] }
        ],
        questionBlock: [
          { required: true, message: '请选择题块', trigger: ['blur'] }
        ],
        tNumber: [
          { required: true, message: '请选择题号', trigger: ['blur'] }
        ],
        sore: [
          { required: true, message: '请输入分数', trigger: ['blur'] },
          { validator: checkNumber, trigger: ['blur'] }
        ],
        answer: [
          { required: true, message: '答案不能为空', trigger: ['blur', 'change'] }
        ],
        types: [
          { required: true, message: '请选择题目类型', trigger: ['blur'] }
        ],
        difficulty: [
          { validator: checkDfct, required: true, trigger: ['blur', 'change'] }
        ],
        knowledgePoints: [
          { required: true, message: '请选择知识点', trigger: ['blur'] }
        ]
      },
      prevImg: '',
      editNlgList: [],
      ytImgList: [],
      submitButtonText: '确认提交',
      submitType: 'add',
      blockList: [],
      tnumberList: [],
      typeList: [
        { id: 0, name: '选择题' },
        { id: 1, name: '多选题' },
        { id: 2, name: '判断题' },
        { id: 3, name: '简答题' },
        { id: 4, name: '填空题' }
      ],
      knowledgeList: [],
      rateTexts: ['容易', '较易', '中等', '较难', '困难'],
      uploadUrl: API.UPLOAD_UPLOADIMG,
      previewVisible: false,
      buttonLoading: false,
      deleteLoading: false,
      originalList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.getExamById()
    this.getTnumber()
    this.getBlocks()
  },
  mounted () {
    this.$nextTick(() => {
      if (this.isMathjaxConfig === false) { // 如果：没有配置MathJax
        this.initMathjaxConfig()
      }
      // 如果，不传入第三个参数，则渲染整个document
      // 因为使用的Vuejs，所以指明#app，以提高速度
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, document.getElementById('questions')])
    })
  },
  updated () {
    this.$nextTick(() => {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, document.getElementById('questions')])
    })
  },
  methods: {
    // 初始化mathjax公式配置
    initMathjaxConfig () {
      if (!window.MathJax) {
        return
      }
      window.MathJax.Hub.Config({
        showProcessingMessages: false, // 关闭js加载过程信息
        messageStyle: 'none', // 不显示信息
        jax: ['input/TeX', 'output/HTML-CSS'],
        tex2jax: {
          inlineMath: [['$', '$'], ['\\(', '\\)']], // 行内公式选择符
          displayMath: [['$$', '$$'], ['\\[', '\\]']], // 段内公式选择符
          skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'] // 避开某些标签
        },
        'HTML-CSS': {
          availableFonts: ['STIX', 'TeX'], // 可选字体
          showMathMenu: false // 关闭右击菜单显示
        }
      })
      this.isMathjaxConfig = true // 防止重复调用Config，造成性能损耗
    },
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
        this.examSubjectInfo = this.examSubjectList.filter(item => {
          return item.id === this.examSubjectId
        })[0]
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
      this.getOriginal()
    },
    // 获取考试的年级
    async getGradeById () {
      this.loading = true
      await this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.examGrade = res.data.data[0]
      }).catch(() => { this.loading = false })
    },
    // 获取试卷题块列表
    async getBlocks () {
      let data = {
        examSubjectId: this.examSubjectId
      }
      await this.axios.post(API.ORIGINAL_GETQUESTIONBLOCK, data).then(res => {
        this.blockList = res.data.data
      }).catch(() => { })
    },
    // 获取试卷题号列表
    async getTnumber () {
      let data = {
        examId: this.examId,
        examSubjectId: this.examSubjectId
      }
      await this.axios.post(API.ORIGINAL_GETTNUMBER, data).then(res => {
        this.tnumberList = res.data.data.map(item => {
          return { id: item.id, tnumber: item.tnumber }
        })
        // console.log(this.tnumberList)
      }).catch(() => { })
    },
    // 获取原题列表
    async getOriginal () {
      let data = {
        examId: this.examId,
        subjectName: this.examSubjectInfo.subjectName,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }
      await this.axios.post(API.ORIGINAL_GETORIGINAL, data).then(res => {
        let list = res.data.data.list
        this.originalList = list.map(item => {
          if ([0, 1].includes(parseInt(item.types))) {
            item.options = item.options ? JSON.parse(item.options.replace(/\\/g, '\\\\')) : {}
          }
          item.types = parseInt(item.types)
          item.knowledgePoints = JSON.parse(item.knowledgePoints)
          return item
        })
        this.total = res.data.data.total
      }).catch(() => { })
    },
    // 远程搜索知识点
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.axios.post(API.ORIGINAL_GETKNOWLEDGELISTS, { name: query }).then(res => {
            this.knowledgeList = res.data.data.map(item => {
              return { id: item.id, name: item.name }
            })
          }).catch(() => { })
        }, 200)
      } else {
        this.options4 = []
      }
    },
    // 分数改变
    difficultyChange (val) {
      // console.log(val)
    },
    // 新增选项
    addOption () {
      // if ([0].includes(this.ytForm.types) && this.ytForm.options.length === 4) {
      //   this.$message({
      //     message: '选择题最多只能有4个选项！',
      //     type: 'warning'
      //   })
      //   return false
      // }
      this.ytForm.options.push({
        key: '',
        value: ''
      })
    },
    selectOption (nlg) {
      // // console.log(nlg)
      this.editNlgList.push(nlg)
    },
    // 删除选项
    deleteOption (index) {
      this.$confirm('确定删除这个选项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ytForm.options.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 原题图片上传成功
    ytImgSuccess (response, file, fileList) {
      let list = []
      this.ytImgList = []
      // console.log(fileList)
      fileList.forEach(item => {
        list.push(item.response.data.data)
        this.ytImgList.push(
          { name: item.name, url: item.response.data.data }
        )
      })
      this.ytForm.imgPathOne = list.join(',')
    },
    // 原题图片删除成功
    ytImgRemove (file, fileList) {
      let list = []
      this.ytImgList = []
      fileList.forEach(item => {
        list.push(item.response.data.data)
        this.ytImgList.push(
          { name: item.name, url: item.response.data.data }
        )
      })
      this.ytForm.imgPathOne = list.join(',')
    },
    // 预览图片
    pictureCardPreview (file) {
      this.prevImg = file.url
      this.previewVisible = true
    },
    // 提交原题
    addOriginal (formName) {
      this.$refs[formName].validate((valid) => {
        // // console.log(valid)
        if (valid) {
          this.buttonLoading = true
          let reg = new RegExp('(<p>|</p>)', 'g')
          let options = {}
          this.ytForm.options.forEach(item => {
            options[item.key.toUpperCase()] = item.value.replace(reg, '')
          })
          let knowledgePoints = this.ytForm.knowledgePoints.map(item => {
            let nlg = this.editNlgList.find(enlg => {
              return enlg.name === item || enlg.id === item
            })
            if (nlg) {
              // console.log(nlg)
              return nlg.id
            }
          })
          let data = {
            examId: this.examId, // 考试ID
            examName: this.examInfo.examName, // 考试名称
            subjectName: this.examSubjectInfo.subjectName, // 考试科目名称
            subject1: this.ytForm.subject1.replace(reg, ''), // 原题题目
            imgPathOne: this.ytForm.imgPathOne, // 原题图片
            questionBlock: this.ytForm.questionBlock.id, // 题块
            tNumber: this.ytForm.tNumber, // 题号
            sore: this.ytForm.sore, // 题目分数
            answer: this.ytForm.answer.replace(reg, ''), // 题目答案解析
            types: this.ytForm.types, // 题目类型 0
            options: [0, 1].includes(this.ytForm.types) ? JSON.stringify(options) : '', // 选择题选项
            difficulty: this.ytForm.difficulty, // 难度五星级
            knowledgePoints: knowledgePoints.join(','),
            subjectId: this.examSubjectInfo.subjectId // 学科ID
          }
          if (this.submitType === 'add') {
            this.axios.post(API.ORIGINAL_ADDORIGINAL, [data]).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.cancelEdit()
              this.getOriginal()
            }).catch(() => { this.buttonLoading = false })
          }
          if (this.submitType === 'edit') {
            data.id = this.ytForm.id
            this.axios.post(API.ORIGINAL_UPDATEORINAL, data).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.cancelEdit()
              this.getOriginal()
            }).catch(() => { this.buttonLoading = false })
          }
        } else {
          return false
        }
      })
    },
    // 根据ID获取题型
    getTypeById (id) {
      if (!id && id !== 0) {
        return ''
      }
      let type = this.typeList.find(item => {
        return parseInt(id) === item.id
      })
      return type ? type.name : ''
    },
    // 获取知识点的名称
    getKnowledgeName (arr = []) {
      if (arr.length > 0) {
        let names = arr.map(item => {
          return item.name
        })
        return names.join('，')
      }
      if (!Array.isArray(this.ytForm.knowledgePoints)) {
        return this.ytForm.knowledgePoints
      }
      let names = this.ytForm.knowledgePoints.map(item => {
        return item.name
      })
      return names.join('，')
    },
    // 编辑原题
    editYt (yt) {
      // console.log(yt)
      let options = []
      Object.keys(yt.options).forEach(key => {
        options.push({
          key: key,
          value: yt.options[key]
        })
      })
      this.editNlgList = yt.knowledgePoints
      // console.log(yt.knowledgePoints)
      let knowledgePoints = yt.knowledgePoints.map(item => {
        return item.name
      })
      let block = this.blockList.find(item => {
        return item.id === yt.questionBlock
      })
      this.ytForm = {
        id: yt.id,
        subject1: yt.subject1, // 原题题目
        imgPathOne: yt.imgPathOne, // 原题图片
        questionBlock: block, // 题块
        tNumber: yt.tNumber, // 题号
        sore: parseInt(yt.sore), // 题目分数
        answer: yt.answer, // 题目答案解析
        types: parseInt(yt.types), // 题目类型 0
        options: options, // 选择题选项
        difficulty: yt.difficulty, // 难度五星级
        knowledgePoints: knowledgePoints // 知识点
      }
      // console.log(this.ytForm)
      this.ytImgList = []
      if (yt.imgPathOne) {
        yt.imgPathOne.split(',').map(item => {
          let nameSplit = item.split(',')
          this.ytImgList.push(
            { name: nameSplit[nameSplit.length - 1], url: item }
          )
        })
      }
      this.submitType = 'edit'
      this.submitButtonText = '确认修改'
    },
    // 取消修改
    cancelEdit () {
      this.ytForm = {
        subject1: '', // 原题题目
        imgPathOne: '', // 原题图片
        tNumber: '', // 题号
        sore: '', // 题目分数
        answer: '', // 题目答案解析
        types: '', // 题目类型 0
        options: [
          { key: '', value: '' }
        ], // 选择题选项
        difficulty: '', // 难度五星级
        knowledgePoints: [] // 知识点
      }
      this.submitType = 'add'
      this.submitButtonText = '确认提交'
      this.ytImgList = []
      this.buttonLoading = false
    },
    // 删除原题
    deleteYt (yt) {
      this.deleteLoading = true
      this.$confirm('确定删除这个原题吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(API.ORIGINAL_DELETEORIGINAL, { id: yt.id }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          if (this.currentPage > ((this.total - 1) / this.pageSize)) {
            this.currentPage = Math.floor((this.total - 1) / this.pageSize)
          }
          this.deleteLoading = false
          this.getOriginal()
        }).catch(() => { this.deleteLoading = false })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        this.deleteLoading = false
      })
    },
    // 上一页
    prevPage (page) {
      this.currentPage = this.currentPage * 1 - 1
      this.getOriginal()
    },
    handleCurrentPage (page) {
      this.currentPage = page
      this.getOriginal()
    },
    nextPage (page) {
      this.currentPage = this.currentPage * 1 + 1
      this.getOriginal()
    }
  }
}
</script>
<style lang="scss">
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
#upload-yuanjuan {
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
  .content {
    min-height: calc(100vh - 225px);
    .quill-form {
      background-color: #ffffff;
      padding: 15px 0;
      .nlg-item {
        width: 100%;
        .el-form-item__content {
          width: calc(100% - 115px);
        }
      }
      .opt-item {
        width: 100%;
        .el-form-item__content {
          width: calc(100% - 100px);
          height: auto;
        }
      }
      .img-item {
        width: 100%;
        .el-form-item__content {
          width: calc(100% - 100px);
        }
      }
      .el-form-item__content {
        line-height: 1;
        .quill-editor {
          width: 1090px;
          background-color: #ffffff;
        }
        .ql-container {
          height: 150px;
        }
        .el-input {
          width: calc(1200px / 4 - 110px);
        }
        .rate-box {
          display: flex;
          height: 40px;
          align-items: center;
        }
        .search-select {
          width: 100%;
          .el-input {
            width: 100%;
          }
        }
        .yt-img-up {
          .el-upload--picture-card {
            width: 75px;
            height: 75px;
            line-height: 75px;
          }
          .el-upload-list--picture-card {
            .el-upload-list__item {
              width: 75px;
              height: 75px;
            }
          }
        }
        .option-item {
          display: flex;
          flex-flow: row nowrap;
          .opt-title {
            padding: 0 10px;
            line-height: 40px;
            font-size: 12px;
            color: #666;
          }
          .opt-key {
            width: 50px;
          }
          .quill-editor {
            width: 700px;
            .ql-container {
              height: 100px;
            }
          }
          .el-button {
            height: 40px;
            margin-left: 15px;
          }
        }
      }
      .submit-btn {
        margin-left: 100px;
      }
    }
    #questions {
      font-size: 14px;
      img {
        max-width: 100%;
      }
      .question-preview {
        padding: 0 15px;
        background-color: #ffffff;
        border: 0;
        .el-card__header {
          font-size: 16px;
          font-weight: bold;
          padding: 10px 0;
          .el-button {
            margin-top: -10px;
          }
        }
      }
      .question-card {
        padding: 0 15px;
        .card-center {
          .option-item {
            display: inline-block;
            margin: 5px 10px 0 0;
            p {
              display: inline-block;
            }
          }
        }
        .card-footer {
          border-top: 0;
          padding: 0;
        }
        .answer-title {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .el-pagination {
      background-color: #ffffff;
      text-align: center;
    }
  }
  .preview-dialog {
    .img-box {
      width: 100%;
      height: 500px;
      overflow-y: auto;
      img {
        width: 100%;
      }
    }
  }
}
.el-popover {
  height: auto;
}
</style>
