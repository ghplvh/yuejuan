<template>
  <div id="scan-paper">
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
          <el-breadcrumb-item>{{getActiveName(activeName)}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row class="scan">
      <el-tabs v-model="activeName">
        <el-tab-pane label="扫描答题卡" :name="1">
          <div class="scan-card" v-loading="tabPaneLoading" element-loading-text="拼命加载中...">
            <el-container>
              <el-aside class="left-content">
                <el-row>
                  <el-row class="school-select">
                    <span class="select-span">学校</span>
                    <el-select size="small" v-model="school">
                      <el-option></el-option>
                    </el-select>
                  </el-row>
                  <el-row class="template-wrapper" type="flex" align="middle">
                    <el-row>
                      <span class="select-span">模板</span>
                      <el-select size="small" v-model="template">
                        <el-option></el-option>
                      </el-select>
                      <el-row class="template-content">
                        <el-col :span="10" :offset="4">试卷张数：1</el-col>
                        <el-col :span="10" :offset="0">客观题数：12</el-col>
                        <el-col :span="10" :offset="4">考号位数：0</el-col>
                      </el-row>
                    </el-row>
                  </el-row>
                </el-row>
                <el-row class="batch-info">
                  <el-row class="batch-info-title">批次信息</el-row>
                  <el-row class="batch-info-wrapper">
                    <el-table :row-style="{width:'250px'}" :header-row-style="{width:'250px'}">
                      <el-table-column label="批次" width="56px"></el-table-column>
                      <el-table-column label="已扫描" width="70px"></el-table-column>
                      <el-table-column label="已上传" width="70px"></el-table-column>
                      <el-table-column label="异常" width="54px"></el-table-column>
                    </el-table>
                  </el-row>
                </el-row>
              </el-aside>
              <el-main class="right-content">
                <el-row>
                  <!-- <div class="scanner-status">
                    <span>扫描仪状态：</span>
                    <span class="red-font">未运行好分数阅卷扫描端</span>
                    <span>，点击</span>
                    <el-button type="text">下载扫描客户端</el-button>
                  </div> -->
                  <div class="steps-wrapper">
                    <el-steps :active="active" :space="'33%'">
                      <el-step title="1.扫描" icon="el-icon-circle-check">
                        <div slot="description">
                          <el-row class="desc-row-1">
                            <div>参与考生人数：{{examSubjectInfo.examStuNum}}</div>
                            <!-- <div>
                              <el-button type="text" size="mini">设置扫描仪参数</el-button>
                            </div> -->
                          </el-row>
                          <el-row class="desc-row-1">
                            <el-button type="primary" size="small" icon="el-icon-caret-right" @click="scanBegin()">开始扫描</el-button>
                          </el-row>
                        </div>
                      </el-step>
                      <!-- <el-step title="2.识别定位点及考号" icon="el-icon-circle-check">
                        <div slot="description">
                          <el-row class="desc-row-1">
                          </el-row>
                          <el-row class="desc-row-2">
                            <el-button type="primary" size="small">定位/考号异常处理</el-button>
                          </el-row>
                        </div>
                      </el-step> -->
                      <el-step title="2.上传试卷" icon="el-icon-circle-check">
                        <div slot="description">
                          <!-- <el-row class="desc-row-1">
                            <div>本机扫描人数：37</div>
                          </el-row> -->
                          <el-row class="desc-row-1">
                            <div>已经上传人数：{{examSubjectInfo.scanStuNum}}</div>
                          </el-row>
                          <el-row class="desc-row-1">
                            <el-button type="primary" size="small">上传进度</el-button>
                          </el-row>
                        </div>
                      </el-step>
                      <el-step title="3.切图" icon="el-icon-circle-check">
                        <div slot="description">
                          <el-row class="desc-row-1">
                          </el-row>
                          <el-row class="desc-row-1">
                            <el-button type="primary" size="small" @click="slicing()">开始切图</el-button>
                          </el-row>
                        </div>
                      </el-step>
                    </el-steps>
                    <el-row class="wrapper-desc">说明：已上传试卷为无定位异常和考号异常的试卷。点击上传进度可以查看本机扫描的试卷是否全部上传至云端，并可以发起重新上传。</el-row>
                  </div>
                </el-row>
                <el-card class="pic-content" shadow="never">
                  <div slot="header">
                    <span>扫描批次：{{Number(batchNumber) + 1}}</span>
                  </div>
                  <div v-if="batchList.length === 0" class="no-data-wrapper">暂无数据</div>
                  <el-row v-else class="batchList">
                    <el-col :span="4" class="sm-pic-div" v-for="image in batchList" :key="image">
                      <img :src="image" alt="" @click="previewImage(image)">
                    </el-col>
                  </el-row>
                </el-card>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="扫描进度" :name="2">
          <el-container class="scan-progress" direction="vertical">
            <el-header class="progress-top" height="155px">
              <el-row class="progress-info" type="flex" align="middle" justify="space-between">
                <el-col :span="8">
                  <div class="scan-desc">
                    <div class="desc">需扫描试卷总数</div>
                    <div class="count">100</div>
                  </div>
                  <div class="scan-img">
                    <img src="../assets/icon/scanimg.png" alt="">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="scan-desc">
                    <div class="desc">已完成扫描数</div>
                    <div class="count">0</div>
                  </div>
                  <div class="scan-img">
                    <img src="../assets/icon/scancount.png" alt="">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="scan-desc">
                    <div class="desc">已完成比例</div>
                    <div class="count">0%</div>
                  </div>
                  <div class="scan-img">
                    <img src="../assets/icon/scanrate.png" alt="">
                  </div>
                </el-col>
              </el-row>
              <el-row class="progress-bar">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
              </el-row>
            </el-header>
            <el-main class="scan-progress-content">
              <el-row class="scan-details">
                <el-col :span="3">扫描进度详情</el-col>
                <el-col :span="9" class="details-right">报名考试人数:{{57}}，实际参加考试人数:{{0}}，缺考人数:{{57}}</el-col>
              </el-row>
              <el-table class="details-table" border>
                <el-table-column label="学校" align="center" width="250px"></el-table-column>
                <el-table-column label="扫描人" align="center" width="223px"></el-table-column>
                <el-table-column label="上传进度" align="center" width="223px"></el-table-column>
                <el-table-column label="异常卷" align="center" width="223px"></el-table-column>
                <el-table-column label="操作" align="center" width="250px"></el-table-column>
              </el-table>
              <el-row class="other-exceptions">
                <el-col :span="3">其它异常卷：{{0}}</el-col>
                <router-link to="">
                  <el-button type="text" icon="el-icon-view">查看异常卷</el-button>
                </router-link>
              </el-row>
            </el-main>
          </el-container>
        </el-tab-pane> -->
      </el-tabs>
    </el-row>
    <el-dialog title="查看模板" :visible.sync="previewVisible" width="60%" custom-class="preview-dialog">
      <div class="img-box">
        <img :src="prevImg" alt="模板">
      </div>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="previewVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="附件上传" label-width="80px">
        <el-upload style="padding-left:0px" class="upload-demo" action="http://192.168.0.176:10003/web/importWrongQuestions/saveObjectByFile" :data="{examSubjectId: form.examSubjectId, examId: form.examId }" :on-success="upload" multiple :auto-upload="true" ref="upload" :limit="1" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- <el-form ref="formform" :model="form" label-width="80px">
      <el-form-item label="附件上传" label-width="80px">
        <el-upload style="padding-left:0px" class="upload-demo" action="http://47.107.116.88:10003/web/upload/uploadImgAndFileName" multiple :auto-upload="true" accept="image" :http-request="uploadFile" ref="uploadImg" :limit="100" >
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
      </el-form-item>
    </el-form> -->
  </div>
</template>
<script>
import API from '../api/api.js'
import cookie from '../api/requestHeader.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        examSubjectId: this.$route.params.examSubjectId,
        examId: this.$route.params.examId
      },
      formform: {},
      schoolCode: '',
      loading: false,
      examId: this.$route.params.examId,
      examInfo: {},
      examSubjectId: this.$route.params.examSubjectId,
      batchNumber: this.$route.params.batchNumber,
      examSubjectInfo: {},
      examSubjectList: [],
      examGrade: {},
      activeName: 1,
      tabs: [
        { id: 1, name: '扫描答题卡' },
        { id: 2, name: '扫描进度' }
      ],
      tabPaneLoading: false,
      active: 1,
      batchList: [],
      previewVisible: false,
      imgList: []
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    console.log(this.batchNumber)
    this.getExamById()
    this.getBatch()
  },
  methods: {
    UploadUrl () {
      // return `http://47.107.116.88:10003/web/upload/uploadImgAndFileName`
      return `http://192.168.0.176:10003/web/upload/uploadImgAndFileName`
    },
    // 图片上传
    uploadFile (file) {
      if (this.imgList.length === 0) {
        this.$message.error('请先扫描上传JSON文件！')
        return false
      }
      let param = file.file
      let studentExamId = ''
      for (let i = 0; i < this.imgList.length; i++) {
        if (this.imgList[i].imagepath.indexOf(param.name) !== '-1') {
          studentExamId = this.imgList[i].examnumber
        }
      }
      console.log(studentExamId)
      // 转化
      let form = new FormData()
      // 文件对象
      form.append('file', param)
      form.append('filedir', `answersheet/${this.examSubjectId}/0`)
      form.append('studentExamId', studentExamId)
      let url = this.UploadUrl()
      this.axios.post(url, form, {
        headers: { 'content-type': 'multipart/form-data' }
      }).then(res => {
        console.log(res)
      })
    },
    // 文件上传
    upload (response, file, fileList) {
      console.log(response)
      this.imgList = response.data
    },
    slicing () {
      // 先执行客观题答案
      // this.axios.post(API.ADMIN_TOP, {
      //   examId: this.examId,
      //   examSubjectId: this.examSubjectId
      // }).then(res => {
      // })
      this.axios.post(API.ADMIN_SLICING, {
        examId: this.examId,
        examSubjectId: this.examSubjectId
      }).then(res => {
        console.log(res)
        this.$message({
          message: '切图成功。',
          type: 'success'
        })
      })
    },
    getBatch () {
      this.loading = true
      this.axios.get(`${API.ADMIN_GETIMAGE}?filename=answersheet/${this.examSubjectId}/${Number(this.batchNumber) + 1}/`).then(res => {
        this.batchList = res.data.data
        console.log(this.batchList)
      })
    },
    previewImage (img) {
      this.prevImg = img
      this.previewVisible = true
    },
    // 获取考试信息
    async getExamById () {
      this.loading = true
      await this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        console.log(this.examInfo)
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
          console.log(item.id === this.examSubjectId)
          if (Number(item.id) === Number(this.examSubjectId)) {
            console.log(item)
            return item
          }
        })[0]
        console.log(this.examSubjectInfo)
      }).catch(() => { this.loading = false })
    },
    // 获取考试的年级
    async getGradeById () {
      this.loading = true
      await this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.examGrade = res.data.data[0]
      }).catch(() => { this.loading = false })
    },
    getActiveName (id) {
      if (!id) {
        return ''
      }
      let tab = this.tabs.find(item => {
        return id === item.id
      })
      return tab.name
    },
    scanBegin () {
      // 获取当前科目
      console.log(this.examId, this.examSubjectId)
      console.log(this.examSubjectInfo.subjectName == '数学')
      let data = ''
      let param = {
        examId: this.examId,
        examSubjectId: this.examSubjectId
      }
      if (this.examSubjectInfo.subjectName == '语文') {
        param.hfsExamSubjectId = 2248733
        data = {"uploader":"2885120663650304","isTest":0,"schoolId":27676,"schoolName":"新邵县第一中学","subjectId":2248733,"templateId":0,"templateInfo":{"name":"主模板","basic":{"other_info":{"xuanzuo_info":[]},"color_type":1,"local_region":["0,255,127,772,135","1,127,198,175,32"],"kaohao_info":[{"type":2,"region_pos":[[0,643,697,492,253]],"item_pos":[{"page_index":0,"pos":[]}]}],"obj_info":[{"obj_item":[{"index":0,"page_index":0,"arrange":0,"item_pos":"170,1124,38,19;226,1124,38,19;283,1125,37,18;338,1125,38,19","tihao":{"value":1,"pos":[129,1128]},"key":"1.1","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"170,1156,38,19;226,1156,38,18;282,1156,38,19;338,1156,38,19","tihao":{"value":2,"pos":[129,1160]},"key":"1.2","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"170,1188,38,18;226,1188,38,18;282,1187,38,19;338,1188,38,19","tihao":{"value":3,"pos":[129,1192]},"key":"1.3","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"170,1219,39,19;226,1219,38,19;282,1219,38,19;338,1220,38,18","tihao":{"value":4,"pos":[129,1223]},"key":"1.4","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"170,1254,39,19;226,1254,38,19;282,1255,38,18;336,1254,39,19","tihao":{"value":7,"pos":[129,1258]},"key":"1.7","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"522,1125,38,19;577,1125,39,18;634,1125,38,18;690,1125,38,18","tihao":{"value":8,"pos":[476,1129]},"key":"1.8","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"522,1156,38,19;577,1157,39,18;634,1157,39,18;690,1157,38,18","tihao":{"value":10,"pos":[476,1160]},"key":"1.10","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"522,1189,38,18;577,1189,39,18;634,1189,38,18;689,1189,39,19","tihao":{"value":11,"pos":[476,1193]},"key":"1.11","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"522,1220,38,19;577,1220,38,19;634,1220,38,19;690,1220,38,19","tihao":{"value":12,"pos":[476,1224]},"key":"1.12","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"522,1255,38,18;577,1255,39,18;634,1255,38,18;689,1255,39,18","tihao":{"value":"14","pos":[476,1259]},"key":"1.14","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"874,1125,38,19;930,1125,37,19;986,1125,38,18;1041,1125,38,18","tihao":{"value":17,"pos":[827,1129]},"key":"1.17","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"874,1156,38,20;930,1157,37,18;985,1157,39,18;1041,1156,39,19","tihao":{"value":18,"pos":[827,1161]},"key":"1.18","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"874,1189,38,18;930,1188,38,19;986,1189,38,18;1041,1189,39,18","tihao":{"value":19,"pos":[827,1193]},"key":"1.19","policy":0}],"region_pos":[[0,130,1117,969,166]]}],"size":[]},"own":true,"update_time":"2018-12-20T08:50:42.978Z","disabled":true,"files":["template/1693434/50B0E955-0434-11E9-A811-00E07048AEFD.png","template/1693434/50B0E956-0434-11E9-A811-00E07048AEFD.png"],"sub_info":[],"xuanzuo_info":[],"question_info":[]},"isMixScan":0,"is_brightness_check":1}
      } else if (this.examSubjectInfo.subjectName == '数学') {
        param.hfsExamSubjectId = 2248734
        data = {"uploader":"2885120663650304","isTest":0,"schoolId":27676,"schoolName":"新邵县第一中学","subjectId":2248734,"templateId":0,"templateInfo":{"name":"主模板","basic":{"other_info":{"xuanzuo_info":[{"xuanzuo_group":2486577,"page_index":1,"region_pos":"2338,1353,274,64;","item_pos":"2406,1367,44,32;2546,1367,44,32"}]},"color_type":1,"local_region":["0,254,121,689,148","1,124,216,251,35"],"kaohao_info":[{"type":2,"region_pos":[[0,658,685,469,265]],"item_pos":[{"page_index":0,"pos":[]}]}],"obj_info":[{"obj_item":[{"index":0,"page_index":0,"arrange":0,"item_pos":"192,1104,36,18;238,1104,36,18;285,1104,36,18;331,1103,37,17","tihao":{"value":1,"pos":[151,1108]},"key":"1.1","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"192,1134,36,18;239,1133,38,21;285,1135,36,18;331,1135,36,18","tihao":{"value":2,"pos":[151,1138]},"key":"1.2","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"192,1166,36,18;238,1166,36,18;285,1167,36,18;331,1167,36,18","tihao":{"value":3,"pos":[151,1170]},"key":"1.3","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"192,1199,36,18;238,1198,36,18;285,1198,38,19;331,1198,36,18","tihao":{"value":4,"pos":[151,1203]},"key":"1.4","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"527,1103,36,18;574,1104,36,18;620,1104,36,18;667,1103,36,21","tihao":{"value":5,"pos":[485,1106]},"key":"1.5","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"527,1134,37,18;574,1134,36,18;620,1135,36,18;666,1136,36,18","tihao":{"value":6,"pos":[485,1138]},"key":"1.6","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"527,1167,36,18;574,1167,36,18;620,1167,36,18;667,1166,41,20","tihao":{"value":7,"pos":[485,1171]},"key":"1.7","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"527,1199,37,17;574,1198,36,18;619,1197,38,22;667,1199,36,18","tihao":{"value":8,"pos":[485,1203]},"key":"1.8","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"861,1103,38,19;909,1104,36,18;956,1104,36,18;1002,1104,36,18","tihao":{"value":9,"pos":[819,1106]},"key":"1.9","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"861,1135,36,18;905,1133,41,21;956,1135,36,18;1002,1135,36,18","tihao":{"value":10,"pos":[819,1139]},"key":"1.10","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"861,1166,36,18;909,1167,36,18;956,1164,37,21;1002,1167,36,18","tihao":{"value":11,"pos":[819,1170]},"key":"1.11","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"861,1198,36,18;909,1199,36,18;957,1195,36,22;1002,1198,36,18","tihao":{"value":12,"pos":[819,1202]},"key":"1.12","policy":0}],"region_pos":[[0,144,1089,921,141]]}],"size":[]},"own":true,"update_time":"2018-12-22T02:56:59.048Z","disabled":true,"files":["template/1693461/3EBB480A-0595-11E9-8D48-CC2F71306014.png","template/1693461/3EBB480B-0595-11E9-8D48-CC2F71306014.png"],"sub_info":[],"xuanzuo_info":[{"xuanzuoid":2486577,"block_pos":[[[1,2191,1336,1013,780]]]}],"question_info":[]},"isMixScan":0,"is_brightness_check":1}	
      } else if (this.examSubjectInfo.subjectName == '英语'){
        param.hfsExamSubjectId = 2248735        
        data = {"uploader":"2885120663650304","isTest":0,"schoolId":27676,"schoolName":"新邵县第一中学","subjectId":2248735,"templateId":0,"templateInfo":{"name":"主模板","basic":{"other_info":{"xuanzuo_info":[]},"color_type":1,"local_region":["0,495,170,659,149","1,309,188,1030,39"],"kaohao_info":[{"type":2,"region_pos":[[0,1070,415,466,264]],"item_pos":[{"page_index":0,"pos":[]}]}],"obj_info":[{"obj_item":[{"index":0,"page_index":0,"arrange":0,"item_pos":"180,1134,37,21;234,1135,37,18;288,1135,38,18","tihao":{"value":1,"pos":[138,1139]},"key":"1.1","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"180,1166,37,18;233,1164,38,24;288,1166,37,18","tihao":{"value":2,"pos":[138,1170]},"key":"1.2","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"180,1197,37,18;234,1197,37,17;287,1196,38,21","tihao":{"value":3,"pos":[138,1201]},"key":"1.3","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"178,1226,41,21;235,1228,36,17;289,1228,37,17","tihao":{"value":4,"pos":[138,1231]},"key":"1.4","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"181,1261,36,17;232,1260,40,20;289,1261,37,17","tihao":{"value":5,"pos":[138,1265]},"key":"1.5","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"492,1135,37,18;546,1136,38,19;600,1134,38,23","tihao":{"value":6,"pos":[451,1139]},"key":"1.6","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"492,1166,37,18;546,1167,37,18;599,1166,38,21","tihao":{"value":7,"pos":[451,1170]},"key":"1.7","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"492,1197,37,18;548,1196,35,23;601,1198,37,18","tihao":{"value":8,"pos":[451,1201]},"key":"1.8","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"490,1227,40,21;546,1228,38,19;601,1229,37,18","tihao":{"value":9,"pos":[451,1232]},"key":"1.9","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"493,1261,36,17;545,1261,40,20;601,1262,37,17","tihao":{"value":10,"pos":[451,1265]},"key":"1.10","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"804,1136,37,18;861,1133,41,25;913,1136,37,18","tihao":{"value":11,"pos":[758,1140]},"key":"1.11","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"805,1167,36,18;859,1167,36,18;912,1166,40,24","tihao":{"value":12,"pos":[758,1171]},"key":"1.12","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"805,1198,36,17;859,1197,37,18;912,1197,40,20","tihao":{"value":13,"pos":[758,1202]},"key":"1.13","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"805,1228,36,18;859,1227,38,21;913,1228,37,18","tihao":{"value":14,"pos":[758,1232]},"key":"1.14","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"805,1262,37,17;860,1260,38,26;913,1261,37,18","tihao":{"value":15,"pos":[758,1266]},"key":"1.15","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"1117,1135,37,19;1171,1136,37,18;1226,1136,37,17","tihao":{"value":16,"pos":[1072,1139]},"key":"1.16","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"1116,1166,40,21;1172,1167,36,18;1226,1166,37,18","tihao":{"value":17,"pos":[1072,1171]},"key":"1.17","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"1117,1198,38,17;1170,1196,40,23;1226,1197,37,18","tihao":{"value":18,"pos":[1072,1202]},"key":"1.18","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"1117,1228,37,18;1171,1226,38,25;1226,1228,37,18","tihao":{"value":19,"pos":[1072,1232]},"key":"1.19","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"1117,1262,37,17;1172,1262,37,17;1226,1260,39,21","tihao":{"value":20,"pos":[1072,1266]},"key":"1.20","policy":0},{"index":1,"page_index":0,"arrange":0,"item_pos":"180,1312,37,18;234,1313,38,17;289,1313,37,17;345,1312,35,24","tihao":{"value":21,"pos":[134,1316]},"key":"1.21","policy":0},{"index":1,"page_index":0,"arrange":0,"item_pos":"181,1343,36,17;235,1343,37,17;291,1341,35,23;343,1343,37,17","tihao":{"value":22,"pos":[134,1347]},"key":"1.22","policy":0},{"index":1,"page_index":0,"arrange":0,"item_pos":"181,1373,36,18;235,1371,37,17;289,1373,37,18;343,1373,37,18","tihao":{"value":23,"pos":[134,1377]},"key":"1.23","policy":0},{"index":1,"page_index":0,"arrange":0,"item_pos":"180,1404,37,18;233,1403,40,22;288,1404,38,17;342,1404,38,18","tihao":{"value":24,"pos":[134,1408]},"key":"1.24","policy":0},{"index":1,"page_index":0,"arrange":0,"item_pos":"180,1435,39,25;234,1438,38,17;288,1437,38,18;342,1438,38,17","tihao":{"value":25,"pos":[134,1441]},"key":"1.25","policy":0},{"index":2,"page_index":0,"arrange":0,"item_pos":"493,1313,36,17;546,1312,39,21;601,1314,37,17;655,1314,37,17","tihao":{"value":26,"pos":[447,1317]},"key":"1.26","policy":0},{"index":2,"page_index":0,"arrange":0,"item_pos":"493,1343,36,18;547,1343,37,18;601,1344,37,18;652,1342,40,21","tihao":{"value":27,"pos":[447,1347]},"key":"1.27","policy":0},{"index":2,"page_index":0,"arrange":0,"item_pos":"493,1373,37,18;547,1373,37,19;600,1372,38,24;655,1374,37,18","tihao":{"value":28,"pos":[447,1377]},"key":"1.28","policy":0},{"index":2,"page_index":0,"arrange":0,"item_pos":"492,1404,38,18;547,1403,37,18;600,1405,38,18;654,1405,38,18","tihao":{"value":29,"pos":[447,1408]},"key":"1.29","policy":0},{"index":2,"page_index":0,"arrange":0,"item_pos":"492,1438,38,17;546,1438,38,18;600,1439,38,17;654,1437,37,18","tihao":{"value":30,"pos":[447,1442]},"key":"1.30","policy":0},{"index":3,"page_index":0,"arrange":0,"item_pos":"805,1313,37,21;859,1313,37,18;911,1311,39,21;967,1313,37,17","tihao":{"value":31,"pos":[758,1318]},"key":"1.31","policy":0},{"index":3,"page_index":0,"arrange":0,"item_pos":"805,1344,36,17;859,1343,37,18;913,1341,36,21;968,1343,36,17","tihao":{"value":32,"pos":[758,1348]},"key":"1.32","policy":0},{"index":3,"page_index":0,"arrange":0,"item_pos":"805,1374,37,18;859,1374,37,17;913,1374,37,17;963,1372,40,21","tihao":{"value":33,"pos":[758,1378]},"key":"1.33","policy":0},{"index":3,"page_index":0,"arrange":0,"item_pos":"804,1404,38,19;858,1404,38,18;911,1403,39,21;966,1404,38,18","tihao":{"value":34,"pos":[758,1408]},"key":"1.34","policy":0},{"index":3,"page_index":0,"arrange":0,"item_pos":"804,1438,38,18;858,1438,38,18;911,1438,39,19;966,1437,38,18","tihao":{"value":35,"pos":[758,1442]},"key":"1.35","policy":0},{"index":4,"page_index":0,"arrange":0,"item_pos":"1119,1311,36,23;1172,1313,37,18;1226,1313,37,18;1280,1312,37,18;1333,1312,37,18;1388,1312,37,18;1441,1311,38,18","tihao":{"value":36,"pos":[1071,1316]},"key":"2.36","policy":0},{"index":4,"page_index":0,"arrange":0,"item_pos":"1118,1343,36,18;1172,1343,37,18;1226,1343,37,18;1280,1342,37,20;1334,1342,37,18;1388,1342,37,18;1442,1342,37,18","tihao":{"value":37,"pos":[1071,1347]},"key":"2.37","policy":0},{"index":4,"page_index":0,"arrange":0,"item_pos":"1117,1374,37,18;1171,1374,38,17;1226,1374,37,17;1280,1373,37,18;1333,1373,38,17;1387,1372,38,18;1438,1371,39,21","tihao":{"value":38,"pos":[1071,1378]},"key":"2.38","policy":0},{"index":4,"page_index":0,"arrange":0,"item_pos":"1116,1405,38,17;1171,1404,38,18;1225,1404,38,18;1279,1404,38,18;1332,1403,38,20;1386,1403,39,18;1440,1402,38,19","tihao":{"value":39,"pos":[1071,1409]},"key":"2.39","policy":0},{"index":4,"page_index":0,"arrange":0,"item_pos":"1117,1438,37,18;1171,1438,38,17;1225,1438,38,17;1279,1437,38,18;1332,1437,38,18;1384,1436,41,20;1440,1436,38,18","tihao":{"value":40,"pos":[1071,1442]},"key":"2.40","policy":0},{"index":5,"page_index":0,"arrange":0,"item_pos":"180,1497,36,18;234,1497,37,18;290,1496,35,25;342,1497,37,18","tihao":{"value":41,"pos":[133,1501]},"key":"2.41","policy":0},{"index":5,"page_index":0,"arrange":0,"item_pos":"180,1528,36,18;234,1527,37,20;288,1528,37,17;342,1528,37,18","tihao":{"value":42,"pos":[133,1532]},"key":"2.42","policy":0},{"index":5,"page_index":0,"arrange":0,"item_pos":"180,1558,36,18;234,1558,37,18;288,1558,37,18;340,1557,39,21","tihao":{"value":43,"pos":[133,1562]},"key":"2.43","policy":0},{"index":5,"page_index":0,"arrange":0,"item_pos":"180,1589,37,18;234,1589,37,18;288,1587,37,21;342,1589,37,18","tihao":{"value":44,"pos":[133,1593]},"key":"2.44","policy":0},{"index":5,"page_index":0,"arrange":0,"item_pos":"180,1620,36,21;234,1623,37,17;288,1622,37,18;342,1622,37,18","tihao":{"value":45,"pos":[133,1626]},"key":"2.45","policy":0},{"index":6,"page_index":0,"arrange":0,"item_pos":"491,1497,38,19;546,1497,37,19;600,1497,37,18;654,1497,37,18","tihao":{"value":46,"pos":[446,1501]},"key":"2.46","policy":0},{"index":6,"page_index":0,"arrange":0,"item_pos":"492,1528,37,18;546,1528,37,19;601,1528,36,24;654,1528,37,18","tihao":{"value":47,"pos":[446,1532]},"key":"2.47","policy":0},{"index":6,"page_index":0,"arrange":0,"item_pos":"492,1559,37,17;546,1559,37,18;600,1559,37,17;654,1558,37,21","tihao":{"value":48,"pos":[446,1563]},"key":"2.48","policy":0},{"index":6,"page_index":0,"arrange":0,"item_pos":"492,1589,37,18;546,1589,37,21;600,1589,37,18;654,1589,37,18","tihao":{"value":49,"pos":[446,1593]},"key":"2.49","policy":0},{"index":6,"page_index":0,"arrange":0,"item_pos":"492,1623,37,18;546,1623,37,18;601,1622,37,24;654,1623,37,18","tihao":{"value":50,"pos":[446,1627]},"key":"2.50","policy":0},{"index":7,"page_index":0,"arrange":0,"item_pos":"804,1528,37,17;858,1528,37,17;912,1528,38,18;965,1528,39,20","tihao":{"value":"52","pos":[754,1533]},"key":"2.52","policy":0},{"index":7,"page_index":0,"arrange":0,"item_pos":"804,1497,36,18;858,1497,37,18;912,1497,36,20;967,1497,36,18","tihao":{"value":51,"pos":[754,1502]},"key":"2.51","policy":0},{"index":8,"page_index":0,"arrange":0,"item_pos":"804,1559,37,18;858,1559,37,17;912,1559,37,17;965,1557,38,21","tihao":{"value":53,"pos":[758,1563]},"key":"2.53","policy":0},{"index":8,"page_index":0,"arrange":0,"item_pos":"804,1623,37,18;858,1622,37,20;913,1623,37,17;966,1622,37,18","tihao":{"value":55,"pos":[758,1627]},"key":"2.55","policy":0},{"index":8,"page_index":0,"arrange":0,"item_pos":"803,1587,37,20;857,1587,37,20;911,1587,37,20;965,1587,37,20","tihao":{"value":54,"pos":[766,1608]},"key":"2.54","policy":0},{"index":9,"page_index":0,"arrange":0,"item_pos":"1117,1497,37,17;1171,1495,37,23;1225,1497,37,18;1279,1497,37,18","tihao":{"value":56,"pos":[1071,1502]},"key":"2.56","policy":0},{"index":9,"page_index":0,"arrange":0,"item_pos":"1116,1528,38,18;1170,1528,38,18;1223,1527,39,21;1279,1528,37,18","tihao":{"value":57,"pos":[1071,1532]},"key":"2.57","policy":0},{"index":9,"page_index":0,"arrange":0,"item_pos":"1117,1559,36,20;1170,1557,37,21;1225,1559,37,17;1279,1558,37,18","tihao":{"value":58,"pos":[1071,1564]},"key":"2.58","policy":0},{"index":9,"page_index":0,"arrange":0,"item_pos":"1117,1589,36,18;1171,1589,37,18;1225,1588,38,21;1279,1588,37,19","tihao":{"value":59,"pos":[1071,1593]},"key":"2.59","policy":0},{"index":9,"page_index":0,"arrange":0,"item_pos":"1117,1623,37,18;1171,1623,36,19;1225,1623,38,17;1279,1622,37,18","tihao":{"value":60,"pos":[1071,1627]},"key":"2.60","policy":0}],"region_pos":[[0,131,1114,1170,176],[0,125,1300,294,169],[0,443,1304,274,166],[0,750,1300,269,171],[0,1063,1303,417,157],[0,128,1484,276,173],[0,439,1490,281,174],[0,742,1491,288,60],[0,745,1553,274,102],[0,1069,1487,256,160]]}],"size":[]},"own":true,"update_time":"2018-12-24T02:23:11.767Z","disabled":true,"files":["template/1693468/DA55AF75-0722-11E9-B0CD-00E07048AEFD.png","template/1693468/DA55AF76-0722-11E9-B0CD-00E07048AEFD.png"],"sub_info":[],"xuanzuo_info":[],"question_info":[]},"isMixScan":0,"is_brightness_check":1}
      } else {
        this.$message.error('科目信息不匹配请重试！')
        return false
      }
      // 乱七八糟
      this.axios.post(API.LUANQIBAZHAO, param).then(res => {
        console.log(res)
      })
      console.log(data)
      this.axios({ url: '/api/' + 'sm/beginScan', headers: { SIDKey: 'yx_sid', SIDValue: 'eyJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6bnVsbCwic2Nob29sSWQiOjI3Njc2LCJuYW1lIjoi5paw6YK15Y6_56ys5LiA5Lit5a2m6LaF57qn566h55CG5ZGYIiwiYXZhdGFyIjpudWxsLCJzY2hvb2xOYW1lIjoi5paw6YK15Y6_56ys5LiA5Lit5a2mIiwiZXhwIjoxNTY1Nzc0NTQyLCJqdGkiOiIyODg1MTIwNjYzNjUwMzA0In0.Yd59TkpbnLh8qI4OW8HiJWVCs6sMXG-V1f7-VSluNQh11GjdaiBs18CXxJigi60ipbgY3t2EWMjALktq_PIhQA' }, method: 'post', data: data }).then(res => {
        console.log(res)
      })
    }
    // async scanBegin () {
    //   let datadata = {
    //     uploader: '2885120663650304',
    //     isMixScan: 0,
    //     isTest: 0,
    //     schoolId: 27676,
    //     schoolName: '新邵县第一中学',
    //     subjectId: 2248546,
    //     templateId: 0
    //   }
    //   console.log(datadata)
    //   // 处理模块数据
    //   let param = {
    //     examId: this.examId,
    //     examSubjectId: this.examSubjectId
    //   }
    //   this.axios.post(API.EXAMTEMPLATE_FINDBYANSWER, param).then(res => {
    //     const data = res.data.data[0]
    //     // 定位区
    //     let localRegion = JSON.parse(data.locationCoord)
    //     console.log(localRegion)
    //     let localRegionArray = []
    //     for (let i = 0; i < localRegion.length; i++) {
    //       localRegionArray.push(`${localRegion[i].page},${localRegion[i].rect.x.toFixed()},${localRegion[i].rect.y.toFixed()},${localRegion[i].rect.width.toFixed()},${localRegion[i].rect.height.toFixed()}`)
    //     }
    //     console.log(localRegionArray)
    //     // 考号区
    //     let kaohaoInfo = JSON.parse(data.numberCoord)[0]
    //     console.log(kaohaoInfo)
    //     let kaohaoInfoArray = [
    //       {
    //         type: 2,
    //         region_pos: [
    //           [
    //             kaohaoInfo.page,
    //             Number(kaohaoInfo.rect.x.toFixed()),
    //             Number(kaohaoInfo.rect.y.toFixed()),
    //             Number(kaohaoInfo.rect.width.toFixed()),
    //             Number(kaohaoInfo.rect.height.toFixed())
    //           ]
    //           // [
    //           //   kaohaoInfo.page,
    //           //   1144,
    //           //   421,
    //           //   473,
    //           //   363
    //           // ]
    //         ],
    //         item_pos: [
    //           {
    //             page_index: 0,
    //             pos: []
    //           }
    //         ]
    //       }
    //     ]
    //     console.log(kaohaoInfoArray)
    //     // 客观题数
    //     let objectiveCoord = JSON.parse(data.objectiveCoord)[0]
    //     let regionPos = [0, Number(objectiveCoord.rect.x.toFixed(0)), Number(objectiveCoord.rect.y.toFixed(0)), Number(objectiveCoord.rect.width.toFixed(0)), Number(objectiveCoord.rect.height.toFixed(0))]
    //     console.log(regionPos)
    //     let keguanti = JSON.parse(localStorage.getItem('kuguanti'))
    //     console.log(keguanti)
    //     let objItem = []
    //     // for (let i = 0; i < keguanti.length; i++) {
    //     //   objItem.push({
    //     //     index: 0,
    //     //     page_index: 0,
    //     //     arrange: 0,
    //     //     item_pos: keguanti[i].item_pos,
    //     //     tihao: {
    //     //       value: keguanti[i].value,
    //     //       pos: keguanti[i].tihao_pos
    //     //     },
    //     //     key: `1.${keguanti[i].value}`,
    //     //     policy: 0
    //     //   })
    //     // }
    //     console.log(objItem)
    //     // let objectiveCoord = ''
    //     // let keguanUrl = 'sm/getObjectiveQuestionBlocks'
    //     // let imgParam = {
    //     //   imagePath: `http://127.0.0.1:8082/sm/getImage/2227634/0/EditableTemplate/000002.png`,
    //     //   // location: {
    //     //   //   x: objectiveCoord.rect.x,
    //     //   //   y: objectiveCoord.rect.y,
    //     //   //   width: objectiveCoord.rect.width,
    //     //   //   height: objectiveCoord.rect.height
    //     //   // },
    //     //   location: {
    //     //     height: 158.84337349397592,
    //     //     width: 1008.0444856348471,
    //     //     x: 109.96848934198333,
    //     //     y: 1078.3021316033364
    //     //   },
    //     //   subjectId: 2227637
    //     // }
    //     // console.log(imgParam)
    //     // this.axios({
    //     //   url: '/api/' + keguanUrl,
    //     //   method: 'post',
    //     //   data: imgParam
    //     // }).then(res => {
    //     //   newKeguanti = [
    //     //     {
    //     //       obj_item: res.data.keguanti,
    //     //       region_pos: [
    //     //         objectiveCoord.page,
    //     //         objectiveCoord.rect.x,
    //     //         objectiveCoord.rect.y,
    //     //         objectiveCoord.rect.width,
    //     //         objectiveCoord.rect.height
    //     //       ]
    //     //     }
    //     //   ]
    //     //   console.log(newKeguanti)
    //     // datadata.templateInfo = {
    //     //   name: '主模板',
    //     //   basic: {
    //     //     other_info: {
    //     //       breakAngle: true,
    //     //       xuanzuo_info: []
    //     //     },
    //     //     color_type: 1,
    //     //     local_region: localRegionArray,
    //     //     kaohao_info: kaohaoInfoArray,
    //     //     obj_info: [{
    //     //       obj_item: objItem,
    //     //       region_pos: regionPos
    //     //     }],
    //     //     size: []
    //     //   },
    //     //   own: true,
    //     //   // 语文
    //     //   files: [
    //     //     `template/2234180/AADD0FBB-A30A-11E9-89EC-B06EBFC08F96.png`,
    //     //     `template/2234180/AADD0FBC-A30A-11E9-89EC-B06EBFC08F96.png`
    //     //   ],
    //     //   // 数学
    //     //   // files: [
    //     //   //   `template/2234180/7FC6D54B-A300-11E9-89EC-B06EBFC08F96.png`,
    //     //   //   `template/2234180/7FC6D54C-A300-11E9-89EC-B06EBFC08F96.png`
    //     //   // ],
    //     //   update_time: '2019-08-13T04:22:04.832Z'
    //     // }
    //     console.log(datadata)
    //     //   this.datadata = datadata
    //     //   // this.scanBeginNow()
    //     //   console.log(datadata, '----------------------------------')
    //     // Cookies.set('SIDValue', cookie.SIDValue)
    //     datadata = {"uploader":"2885120663650304","isTest":0,"schoolId":27676,"schoolName":"新邵县第一中学","subjectId":2248546,"templateId":0,"templateInfo":{"name":"主模板","basic":{"other_info":{"breakAngle":true,"xuanzuo_info":[]},"color_type":1,"local_region":["0,241,130,657,72","1,2207,162,955,41"],"kaohao_info":[{"type":2,"region_pos":[[0,649,738,462,172]],"item_pos":[{"page_index":0,"pos":[]}]}],"obj_info":[{"obj_item":[{"index":0,"page_index":0,"arrange":0,"item_pos":"181,1113,37,17;227,1112,37,18;275,1112,36,18;320,1112,37,18","tihao":{"value":1,"pos":[139,1117]},"key":"1.1","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"181,1144,37,18;229,1144,36,18;276,1143,36,19;321,1144,37,18","tihao":{"value":2,"pos":[139,1148]},"key":"1.2","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"181,1176,36,17;227,1175,37,19;275,1175,37,18;321,1175,37,18","tihao":{"value":3,"pos":[139,1180]},"key":"1.3","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"181,1207,37,17;229,1206,37,19;276,1207,36,18;321,1207,38,17","tihao":{"value":4,"pos":[139,1211]},"key":"1.4","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"516,1113,37,18;563,1113,36,18;610,1113,37,18;656,1113,36,18","tihao":{"value":5,"pos":[474,1117]},"key":"1.5","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"516,1145,38,18;563,1145,37,17;610,1144,38,18;657,1145,36,18","tihao":{"value":6,"pos":[474,1149]},"key":"1.6","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"516,1176,38,19;563,1177,37,17;610,1176,37,17;657,1176,36,18","tihao":{"value":7,"pos":[474,1180]},"key":"1.7","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"517,1208,37,17;564,1208,37,18;611,1208,38,17;658,1207,35,18","tihao":{"value":8,"pos":[474,1212]},"key":"1.8","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"851,1113,37,18;897,1112,38,18;943,1113,38,17;991,1113,38,17","tihao":{"value":9,"pos":[805,1117]},"key":"1.9","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"851,1144,36,18;897,1144,37,18;945,1142,36,21;991,1144,38,18","tihao":{"value":10,"pos":[805,1148]},"key":"1.10","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"851,1176,37,17;897,1176,36,18;943,1175,38,18;991,1175,37,18","tihao":{"value":11,"pos":[805,1180]},"key":"1.11","policy":0},{"index":0,"page_index":0,"arrange":0,"item_pos":"851,1207,37,18;897,1207,37,18;945,1207,37,18;992,1207,36,17","tihao":{"value":12,"pos":[805,1211]},"key":"1.12","policy":0}],"region_pos":[[0,94,1097,960,146]]}],"size":["3289,2300","3290,2301"]},"own":true,"files":["template/2248546/E5E63FFE-BD81-11E9-A5B7-4845201EB3C3.png","template/2248546/E5E63FFF-BD81-11E9-A5B7-4845201EB3C3.png"],"update_time":"2019-08-13T04:22:04.832Z"},"isMixScan":0,"is_brightness_check":1}
    //     this.axios({ url: '/api/' + 'sm/beginScan', headers: { SIDKey: 'yx_sid', SIDValue: 'eyJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6bnVsbCwic2Nob29sSWQiOjI3Njc2LCJuYW1lIjoi5paw6YK15Y6_56ys5LiA5Lit5a2m6LaF57qn566h55CG5ZGYIiwiYXZhdGFyIjpudWxsLCJzY2hvb2xOYW1lIjoi5paw6YK15Y6_56ys5LiA5Lit5a2mIiwiZXhwIjoxNTY1Nzc0NTQyLCJqdGkiOiIyODg1MTIwNjYzNjUwMzA0In0.Yd59TkpbnLh8qI4OW8HiJWVCs6sMXG-V1f7-VSluNQh11GjdaiBs18CXxJigi60ipbgY3t2EWMjALktq_PIhQA' }, method: 'post', data: datadata }).then(res => {
    //       console.log(res)
    //     })
    //     // })
    //   })
    // },
    // scanBeginNow () {
    //   // let datadata = {
    //   //   uploader: 2966049587036160,
    //   //   isTest: 0,
    //   //   schoolId: 27676,
    //   //   schoolName: '新邵县第一中学',
    //   //   subjectId: 2225580,
    //   //   templateId: 0,
    //   //   templateInfo: {
    //   //     name: '主模板',
    //   //     basic: {
    //   //       other_info: {
    //   //         breakAngle: true,
    //   //         xuanzuo_info: []
    //   //       },
    //   //       color_type: 1,
    //   //       local_region: ['0,619,212,546,44', '1,-1,-1,0,0'],
    //   //       kaohao_info: [
    //   //         { type: 0,
    //   //           region_pos: [[0, 1167, 434, 423, 320]],
    //   //           item_pos: [
    //   //             { page_index: 0,
    //   //               pos: ['1190,451,32,22;1190,483,32,20;1190,513,32,20;1190,543,32,20;1190,573,32,21;1190,603,32,22;1190,634,32,21;1190,664,32,21;1190,695,32,21;1190,724,32,22', '1261,451,32,22;1261,483,32,20;1261,513,32,20;1261,543,32,20;1261,573,32,21;1261,603,32,22;1261,634,32,21;1261,664,32,21;1261,695,32,21;1261,724,32,22', '1332,451,32,22;1332,483,32,20;1332,513,32,20;1332,543,32,20;1332,573,32,21;1332,603,32,22;1332,634,32,21;1332,664,32,21;1332,695,32,21;1332,724,32,22', '1402,451,32,22;1402,483,32,20;1402,513,32,20;1402,543,32,20;1402,573,32,21;1402,603,32,22;1402,634,32,21;1402,664,32,21;1402,695,32,21;1402,724,32,22', '1472,451,32,22;1472,483,32,20;1472,513,32,20;1472,543,32,20;1472,573,32,21;1472,603,32,22;1472,634,32,21;1472,664,32,21;1472,695,32,21;1472,724,32,22', '1542,451,32,22;1542,483,32,20;1542,513,32,20;1542,543,32,20;1542,573,32,21;1542,603,32,22;1542,634,32,21;1542,664,32,21;1542,695,32,21;1542,724,32,22'] }] }],
    //   //       obj_info: [{
    //   //         obj_item: [
    //   //           { index: 0, page_index: 0, arrange: 0, item_pos: '229,1057,28,18;279,1055,31,18;331,1055,31,18;384,1057,30,18', tihao: { value: 6, pos: [184, 1077] }, key: '2.6', policy: 0 },
    //   //           { index: 0, page_index: 0, arrange: 0, item_pos: '227,1092,28,18;279,1093,31,18;331,1093,31,18;384,1094,30,18', tihao: { value: 7, pos: [181, 1112] }, key: '2.7', policy: 0 },
    //   //           { index: 0, page_index: 0, arrange: 0, item_pos: '227,1128,28,19;279,1128,31,19;331,1128,31,19', tihao: { value: 8, pos: [181, 1148] }, key: '2.8', policy: 0 },
    //   //           { index: 0, page_index: 0, arrange: 0, item_pos: '227,1169,28,18;279,1170,31,18;331,1170,31,18;385,1170,30,18', tihao: { value: 9, pos: [181, 1189] }, key: '2.9', policy: 0 },
    //   //           { index: 0, page_index: 0, arrange: 0, item_pos: '229,1208,28,19;279,1207,31,19;331,1207,31,19', tihao: { value: 10, pos: [184, 1228] }, key: '2.10', policy: 0 }],
    //   //         region_pos: [[0, 162, 1049, 1427, 301]]
    //   //       }],
    //   //       size: []
    //   //     },
    //   //     own: true,
    //   //     files: [
    //   //       'template/2225580/D2F0DA3F-9F37-11E9-994A-4845201EB3C3.png',
    //   //       'template/2225580/D2F0DA40-9F37-11E9-994A-4845201EB3C3.png'
    //   //     ],
    //   //     xuanzuo_info: [],
    //   //     sub_info: [
    //   //       {
    //   //         blockid: 4696174,
    //   //         block_pos: [[0, 124, 725, 1502, 296]]
    //   //       },
    //   //       {
    //   //         blockid: 4696175,
    //   //         block_pos: [[0, 124, 1306, 1502, 821]]
    //   //       },
    //   //       {
    //   //         blockid: 4696176,
    //   //         block_pos: [[0, 1642, 193, 1502, 1938]]
    //   //       }
    //   //     ],
    //   //     update_time: '2019-07-05T15:16:14.753Z'
    //   //   },
    //   //   isMixScan: 0
    //   // }
    //   datadata = { 'uploader': '2966049587036160', 'isTest': 0, 'schoolId': 27676, 'schoolName': '新邵县第一中学', 'subjectId': 2225579, 'templateId': 0, 'templateInfo': { 'name': '主模板', 'basic': { 'other_info': { 'breakAngle': true, 'xuanzuo_info': [] }, 'color_type': 1, 'local_region': ['0,619,212,546,44', '1,-1,-1,0,0'], 'kaohao_info': [{ 'type': 0, 'region_pos': [[0, 1167, 434, 423, 320]], 'item_pos': [{ 'page_index': 0, 'pos': ['1190,451,32,22;1190,483,32,20;1190,513,32,20;1190,543,32,20;1190,573,32,21;1190,603,32,22;1190,634,32,21;1190,664,32,21;1190,695,32,21;1190,724,32,22', '1261,451,32,22;1261,483,32,20;1261,513,32,20;1261,543,32,20;1261,573,32,21;1261,603,32,22;1261,634,32,21;1261,664,32,21;1261,695,32,21;1261,724,32,22', '1332,451,32,22;1332,483,32,20;1332,513,32,20;1332,543,32,20;1332,573,32,21;1332,603,32,22;1332,634,32,21;1332,664,32,21;1332,695,32,21;1332,724,32,22', '1402,451,32,22;1402,483,32,20;1402,513,32,20;1402,543,32,20;1402,573,32,21;1402,603,32,22;1402,634,32,21;1402,664,32,21;1402,695,32,21;1402,724,32,22', '1472,451,32,22;1472,483,32,20;1472,513,32,20;1472,543,32,20;1472,573,32,21;1472,603,32,22;1472,634,32,21;1472,664,32,21;1472,695,32,21;1472,724,32,22', '1542,451,32,22;1542,483,32,20;1542,513,32,20;1542,543,32,20;1542,573,32,21;1542,603,32,22;1542,634,32,21;1542,664,32,21;1542,695,32,21;1542,724,32,22'] }] }], 'obj_info': [{ 'obj_item': [{ 'index': 0, 'page_index': 0, 'arrange': 0, 'item_pos': '229,1057,28,18;279,1055,31,18;331,1055,31,18;384,1057,30,18', 'tihao': { 'value': 6, 'pos': [184, 1077] }, 'key': '2.6', 'policy': 0 }, { 'index': 0, 'page_index': 0, 'arrange': 0, 'item_pos': '227,1092,28,18;279,1093,31,18;331,1093,31,18;384,1094,30,18', 'tihao': { 'value': 7, 'pos': [181, 1112] }, 'key': '2.7', 'policy': 0 }, { 'index': 0, 'page_index': 0, 'arrange': 0, 'item_pos': '227,1128,28,19;279,1128,31,19;331,1128,31,19', 'tihao': { 'value': 8, 'pos': [181, 1148] }, 'key': '2.8', 'policy': 0 }, { 'index': 0, 'page_index': 0, 'arrange': 0, 'item_pos': '227,1169,28,18;279,1170,31,18;331,1170,31,18;385,1170,30,18', 'tihao': { 'value': 9, 'pos': [181, 1189] }, 'key': '2.9', 'policy': 0 }, { 'index': 0, 'page_index': 0, 'arrange': 0, 'item_pos': '229,1208,28,19;279,1207,31,19;331,1207,31,19', 'tihao': { 'value': 10, 'pos': [184, 1228] }, 'key': '2.10', 'policy': 0 }], 'region_pos': [[0, 162, 1049, 1427, 301]] }], 'size': [] }, 'own': true, 'files': ['template/2225580/D2F0DA3F-9F37-11E9-994A-4845201EB3C3.png', 'template/2225580/D2F0DA40-9F37-11E9-994A-4845201EB3C3.png'], 'xuanzuo_info': [], 'sub_info': [{ 'blockid': 4696174, 'block_pos': [[0, 124, 725, 1502, 296]] }, { 'blockid': 4696175, 'block_pos': [[0, 124, 1306, 1502, 821]] }, { 'blockid': 4696176, 'block_pos': [[0, 1642, 193, 1502, 1938]] }], 'update_time': '2019-07-05T15:16:14.753Z' }, 'isMixScan': 0 }
    //   let scanBegin = 'sm/beginScan'
    //   this.axios({
    //     url: '/api/' + scanBegin,
    //     method: 'post',
    //     data: datadata
    //   }).then(res => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>
<style lang="scss">
#scan-paper {
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
  .el-tabs {
    .el-tabs__header {
      background-color: #ffffff;
      padding-left: 30px;
      .el-tabs__item {
        height: 50px;
        line-height: 50px;
      }
      .el-tabs__nav-wrap {
        &::after {
          display: none;
        }
      }
    }
    .el-tabs__content {
      overflow: hidden;
      position: relative;
      .left-content {
        color: #353b45;
        .school-select {
          background-color: #ffffff;
          height: 85px;
          width: 300px;
          display: flex;
          align-items: center;
          padding-left: 30px;
          font-size: 14px;
        }
        .select-span {
          display: inline-block;
          margin-right: 8px;
        }
        .template-wrapper {
          background-color: #ffffff;
          height: 135px;
          margin-top: 15px;
          padding-left: 30px;
          font-size: 14px;
          .template-content {
            margin-top: 15px;
            .el-col {
              font-size: 14px;
              color: #8d8d8d;
              margin-bottom: 10px;
            }
          }
        }
        .batch-info {
          background-color: #ffffff;
          margin-top: 15px;
          .batch-info-title {
            padding: 18px 0 18px 30px;
            border-bottom: 1px solid #ecf0f4;
          }
          .batch-info-wrapper {
            padding: 20px 0px 20px 30px;
            .el-table {
              width: 250px;
              text-align: center;
              max-height: 100px;
              font-size: 12px;
              box-shadow: 0 0 9px 0 rgba(32, 151, 255, 0.11);
              color: #8d8d8d;
              thead {
                th {
                  background-color: #f3f6fa;
                  color: #353b45;
                  height: 34px;
                  padding: 0;
                  border: 0;
                }
              }
            }
          }
        }
      }
      .right-content {
        padding-left: 20px;
        padding-top: 0;
        padding-right: 0;
        .scanner-status {
          background: #fff;
          padding: 14px 0 0 20px;
          font-size: 14px;
          padding-bottom: 7px;
        }
        .steps-wrapper {
          background: #fff;
          padding-bottom: 12px;
          .el-steps {
            .el-step {
              .el-step__head {
                padding-left: 25%;
              }
              .el-step__line {
                left: 0;
                right: -100%;
              }
              .el-step__title {
                font-size: 14px;
                padding-left: 25%;
              }
              .is-finish {
                color: #13d1be;
              }
              .el-step__icon-inner {
                font-size: 18px;
              }
              .el-step__description {
                color: #8d8d8d;
                padding-left: 25%;
                .desc-row-1 {
                  height: 50px;
                }
              }
            }
          }
          .wrapper-desc {
            font-size: 12px;
            color: #8d8d8d;
            padding-left: 53px;
            margin-top: 10px;
          }
        }
        .pic-content {
          background: #fff;
          margin-top: 15px;
          .pic-header {
            padding: 18px 30px 18px 20px;
            border-bottom: 1px solid #ecf0f4;
          }
          .el-card__body {
            min-height: 260px;
            max-height: 400px;
            .no-data-wrapper {
              text-align: center;
              height: 260px;
              line-height: 260px;
              color: #909399;
              font-size: 14px;
            }
          }
        }
      }
      .scan-progress {
        padding: 15px;
        background-color: #fff;
        font-size: 14px;
        color: #48576a;
        .progress-top {
          padding: 0;
          .progress-info {
            flex-flow: row nowrap;
            margin-bottom: 20px;
            .el-col {
              width: 375px;
              height: 100px;
              padding-left: 30px;
              background-color: #f7fbff;
              opacity: 0.75;
              .scan-desc {
                float: left;
                .desc {
                  margin-top: 25px;
                  width: 100px;
                  line-height: 19px;
                  font-size: 14px;
                  color: #353b45;
                }
                .count {
                  margin-top: 15px;
                  font-size: 22px;
                  color: #ffac00;
                }
              }
              .scan-img {
                float: right;
                margin-top: 13px;
                margin-right: 35px;
              }
            }
          }
        }
        .scan-progress-content {
          padding: 10px 0;
          .scan-details {
            line-height: 40px;
            .details-right {
              float: right;
            }
          }
          .details-table {
            thead {
              th {
                background-color: #f3f6fa;
                color: #353b45;
              }
            }
          }
          .other-exceptions {
            line-height: 50px;
          }
        }
      }
    }
  }
  .red-font {
    color: red;
  }
  .batchList {
    padding: 20px;
    .sm-pic-div {
      display: inline-block;
      position: relative;
      background: #fff;
      margin-bottom: 15px;
      cursor: pointer;
      padding: 5px;
      img {
        width: 100%;
        border: 1px solid #c6cfd4;
        height: 100%;
      }
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
</style>
