<template>
  <div id="question-block" v-loading="allLoading">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
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
          <el-breadcrumb-item>题块与阅卷任务</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row class="question-block-content">
      <el-tabs class="tabs" v-model="activeTab">
        <el-tab-pane label="题块设置" name="block" v-loading="loading">
          <el-row class="block-setting">
            <el-col :span="19">
              <el-card :class="'box-card ' + (bIndex === activeBlockIndex ? 'card-active' : '')" @click.native="selectBlock(bIndex)" v-for="(block,bIndex) in blockList" :key="bIndex">
                <div slot="header">
                  <el-input v-model="block.titleBlockName" :title="block.titleBlockName" :class="bIndex === activeBlockIndex ? '':'header-text'"></el-input>
                  <el-button type="text" icon="el-icon-delete" v-if="blockList.length > 1" @click.stop="deleteBlock(bIndex)">删除</el-button>
                  <!-- <el-button type="text" icon="el-icon-circle-plus-outline">合并给分点</el-button> -->
                  <!-- <el-button type="text" icon="el-icon-document">给分步长</el-button> -->
                </div>
                <div class="question-list" v-if="block.questions.length > 0">
                  <div class="block-tree" v-for="(question,qIndex) in block.questions" :key="qIndex">
                    <div class="question-name">
                      <span>{{question.tnumber}}</span>
                      <!-- <span class="question-score">{{question.score ? question.score: 0 }}分</span> -->
                    </div>
                    <div class="question-list" v-if="question.questions.length > 0">
                      <div class="block-tree" v-for="(questionM,qmIndex) in question.questions" :key="qmIndex">
                        <div class="question-name">
                          <span>{{questionM.tnumber}}</span>
                          <!-- <span class="question-score">{{questionM.score ? questionM.score: 0 }}分</span> -->
                        </div>
                        <div class="question-list" v-if="questionM.questions.length > 0">
                          <div class="block-tree" v-for="(questionMM,qmmIndex) in questionM.questions" :key="qmmIndex">
                            <div class="question-name">
                              <span>{{questionMM.tnumber}}</span>
                              <!-- <span class="question-score">{{questionMM.score ? questionMM.score: 0 }}分</span> -->
                            </div>
                            <div class="question-list" v-if="questionMM.questions.length > 0">
                              <div class="block-tree" v-for="(questionMMM,qmmmIndex) in questionMM.questions" :key="qmmmIndex">
                                <div class="question-name">
                                  <span>{{questionMMM.tnumber}}</span>
                                  <!-- <span class="question-score">{{questionMMM.score ? questionMMM.score: 0 }}分</span> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="5" class="aside" :style="asideIsFixed ? getIsFixedStyle() : ''">
              <div class="aside-title">主观题结构</div>
              <div class="aside-tree">
                <el-tree :data="questions" node-key="id" ref="tree" :props="treeProps" default-expand-all show-checkbox :expand-on-click-node="false" @check="treeCheck"></el-tree>
              </div>
              <div>
                <el-button :type="hasChange ? 'primary' :'info'" size="medium" class="save-btn" :loading="buttonLoading" @click="saveBlock()" :disabled="!hasChange">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="题块任务设置" name="task">
          <div class="task-setting">
            <!-- <el-row class="task-setting-top">
              <el-upload action="" class="upload">
                <el-button type="text" size="small" icon="el-icon-upload2">批量导入阅卷任务</el-button>
              </el-upload>
              <el-button type="text" size="small" icon="el-icon-download">模板下载</el-button>
              <el-button type="text" size="small" icon="el-icon-download">导出阅卷任务（包含老师）</el-button>
            </el-row> -->
            <el-row>
              <el-table :data="tableData" row-key="id" @cell-click="cellClick" :expand-row-keys="expandRowKeys" v-loading="loading" border>
                <el-table-column type="expand" width="48" align="center">
                  <template slot-scope="props">
                    <el-form inline>
                      <el-form-item label="题块信息" class="width25"><span>{{ props.row.titleBlockName }}</span></el-form-item>
                      <el-form-item label="题块内容" class="width75"><span>{{ props.row.content.join('、') }}</span></el-form-item>
                      <el-form-item label="评阅方式" class="width25"><span>{{ getReadWayNameById(props.row.appraiseReadWay) }}</span></el-form-item>
                      <el-form-item label="仲裁老师" class="width75"><span>{{ getTeacherNameByIds(props.row.arbitramentTearcherId) }}</span></el-form-item>
                      <el-form-item label="分配方式" class="width100"><span>{{ getTaskWayNameById(props.row.distributionType) }}</span></el-form-item>
                      <el-form-item label="阅卷老师" class="width100"><span>{{ getTeacherNameByIds(props.row.teacherId) }}</span></el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="titleBlockName" label="题块" width="120" align="center"></el-table-column>
                <el-table-column label="包含题目" width="291" align="center">
                  <template slot-scope="scope">
                    <div class="show-ellipsis">{{scope.row.content && scope.row.content.join('、')}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="评阅方式" width="80" align="center">
                  <template slot-scope="scope">
                    <div class="setting" @click.stop="setMarkType(scope.row)">
                      <i class="el-icon-setting"></i>{{getReadWayNameById(scope.row.appraiseReadWay)}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="阅卷老师" width="200" align="center">
                  <template slot-scope="scope">
                    <div class="setting" @click.stop="setViewer(scope.row)">
                      <i class="el-icon-setting"></i>
                      <!-- {{getTeacherNameByIds(scope.row.teacherId)}} -->
                      {{getTeacherNameByList(scope.row.teacherList)}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="仲裁老师" width="200" align="center">
                  <template slot-scope="scope">
                    <div class="setting" @click.stop="setReviewer(scope.row)">
                      <i class="el-icon-setting"></i>{{getTeacherNameByIds(scope.row.arbitramentTearcherId)}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="分配方式" width="100" align="center">
                  <template slot-scope="scope">
                    <div class="setting" @click.stop="setTaskAway(scope.row)">
                      <i class="el-icon-setting"></i>{{getTaskWayNameById(scope.row)}}
                      <!-- <i class="el-icon-setting"></i> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template slot-scope="scope">
                    <div class="copy-task" v-if="scope.row.teacherId" @click.stop="setCopy(scope.row)">复制阅卷任务</div>
                    <div v-else>-</div>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="tips-red">注:点击题块名称或包含题目可以展开查看详情</el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="to-style">
        <el-button type="primary" size="mini" @click="openTarget({path: '/blockStyle/'+ examId +'/'+ examSubjectId})">题块框选</el-button>
      </div>
    </el-row>
    <div id="drag" class="add-block-btn" :style="dragStyle" v-if="activeTab === 'block'">
      <el-button type="primary" icon="el-icon-plus" circle @click="addQuestionBlock()">题块</el-button>
    </div>
    <el-dialog title="设置阅卷方式" :visible.sync="markTypeVisible" custom-class="marktype-dialog" width="550px">
      <el-row type="flex" align="middle">
        <el-col :span="4">阅卷方式：</el-col>
        <el-col :span="8">
          <el-radio-group v-model="markType.appraiseReadWay" size="small">
            <el-radio-button v-for="way in readWayList" :key="way.id" :label="way.id">{{way.name}}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" v-if="markType.appraiseReadWay !== 1">
        <el-col :span="4">仲裁分差：</el-col>
        <el-col :span="3">
          <el-input v-model="markType.arbitramentScoreGap" size="small"></el-input>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button @click="markTypeVisible = false">取消</el-button>
        <el-button type="primary" @click="saveReadWay()">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="viewer.title" :visible.sync="viewerVisible" custom-class="viewer-dialog" width="800px">
      <el-tabs class="viewer-tabs" v-model="viewer.activeTab">
        <el-tab-pane label="新增老师" name="addTeacher">
          <el-row type="flex" align="middle" class="search-row">
            <el-col :span="6">
              <span>学校：</span>
              <el-select v-model="viewer.search.school" value-key="id" size="small" :disabled="schoolList.length <= 1" @change="searchTeacher()">
                <el-option label="全部" :value="{}"></el-option>
                <el-option v-for="school in schoolList" :key="school.id" :label="school.schoolName" :value="school"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <span>年级：</span>
              <el-select v-model="viewer.search.gradeId" size="small" @change="searchTeacher()">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="grade in gradeList" :key="grade.id" :label="grade.gradeName" :value="grade.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <span>学科：</span>
              <el-select v-model="viewer.search.subjectId" size="small" @change="searchTeacher()">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="sub in subjectList" :key="sub.id" :label="sub.examSubjectDesc" :value="sub.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <span>姓名：</span>
              <el-input v-model="viewer.search.name" size="small" @keypress.enter.native="searchTeacher()"></el-input>
            </el-col>
          </el-row>
          <el-row class="search-content">
            <el-checkbox :indeterminate="isIndeterminate" v-model="viewer.checkAll" @change="checkAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="viewer.checkedList" @change="checkedChange">
              <el-checkbox v-for="teacher in viewer.filterTeacherList" :label="teacher.id" :key="teacher.id">{{teacher.name}}</el-checkbox>
            </el-checkbox-group>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="已添加" name="isAdd">
          <el-row class="search-content">
            <!-- <el-row v-if="viewer.checkedList.length > 0">学校：{{viewer.search.school.schoolName}}</el-row> -->
            <div class="teacher-box">
              <template v-for="(teacher,index) in getCheckedTeachers()">
                <el-tag closable @close="removeTeacher(index)" :key="index">
                  {{teacher.name}}{{ teacher.teacherMobile ? '--' + teacher.teacherMobile : ''}}
                </el-tag>
              </template>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button @click="viewerVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTeacher()">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置分配方式" :visible.sync="taskAwayVisible" custom-class="taskaway-dialog" width="890px" top="10%">
      <el-row type="flex" align="middle">
        <el-col :span="2">分配方式：</el-col>
        <el-col :span="10">
          <el-radio-group v-model="taskAway.distributionType" size="medium">
            <el-radio-button v-for="way in distributionTypes" :key="way.id" :label="way.id">{{way.name}}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="tips">
        <i class="el-icon-info"></i>
        <span v-if="taskAway.distributionType === 0">可以自定义每位老师的阅卷任务；若按已上传试卷数，若有补扫，需要再次分配任务</span>
        <span v-if="taskAway.distributionType === 1">为每位老师分配班级或者学生</span>
      </el-row>
      <el-row type="flex" align="middle" class="setting-row">
        <el-col :span="4">分配总数：{{taskAway.count}}</el-col>
        <el-col :span="6">
        </el-col>
        <el-col :span="4">待分配：{{taskAway.odd}}</el-col>
        <el-col :span="2" :offset="2" v-if="taskAway.distributionType === 0">快捷设置：</el-col>
        <el-col :span="6" class="avg-col" v-if="taskAway.distributionType === 0">
          <el-button size="small" type="primary" @click="avgTask()">全部平均分配</el-button>
          <el-button size="small" type="danger" @click="removeTask()">清空分配</el-button>
        </el-col>
      </el-row>
      <template v-if="taskAway.distributionType === 0">
        <div class="schools">
          <el-row class="schools-info">
            <el-col :span="12">新邵县第一中学</el-col>
            <el-col :span="4" :offset="4">考生人数：{{studentCount}}</el-col>
            <el-col :span="3" :offset="1">阅卷老师：{{viewerCount}}</el-col>
          </el-row>
          <el-table :data="taskAway.viewerData" size="mini" border height="205" :header-cell-style="{color: '#333','font-weight': 'bold'}">
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column label="任务量" align="center">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.quantity" @blur="verifyOdd(scope.$index)"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <div slot="footer">
        <el-button @click="taskAwayVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTaskWay()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="复制阅卷任务" width="500px" :visible.sync="copyVisible">
      <el-checkbox :indeterminate="copy.isIndeterminate" v-model="copy.copyCheckAll" @change="copyCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="copy.copyIdList">
        <template v-for="block in blockList">
          <el-checkbox v-if="block.id !== copy.id" :label="block.id" :key="block.id">{{block.titleBlockName}}</el-checkbox>
        </template>
      </el-checkbox-group>
      <div slot="footer">
        <el-button @click="copyVisible = false">取消</el-button>
        <el-button type="primary" @click="copySetting()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/api.js'
import TreeUtil from '../utils/TreeUtil.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      schoolCode: '',
      examId: this.$route.params.examId,
      examInfo: {},
      examSubjectId: this.$route.params.examSubjectId,
      examSubjectInfo: {},
      examSubjectList: [],
      isIndeterminate: false,
      examGrade: {},
      activeTab: this.$route.query.tabname ? this.$route.query.tabname : 'block',
      asideIsFixed: false,
      questions: [],
      hasCheckedQuestions: [],
      questionsData: [],
      hasChange: false,
      treeProps: {
        label: 'tnumber',
        children: 'questions'
      },
      dragStyle: {
        top: '85%',
        left: '60%'
      },
      blockList: [
        {
          titleBlockName: '题块1',
          questions: []
        }
      ],
      activeBlockIndex: 0,
      allLoading: false,
      loading: false,
      buttonLoading: false,
      tableData: [],
      expandRowKeys: [],
      markTypeVisible: false,
      markType: {
        id: '',
        appraiseReadWay: 1,
        arbitramentScoreGap: 0
      },
      readWayList: [
        { id: 1, name: '单评' },
        { id: 2, name: '双评' },
        { id: 3, name: '多评' }
      ],
      viewerVisible: false,
      schoolList: [{ id: '1000001', schoolName: '新邵三中' }],
      gradeList: [],
      subjectList: [],
      viewer: {
        title: '设置阅卷老师',
        type: 'viewer', // viewer:设置阅卷老师，reviewer设置仲裁老师
        activeTab: 'addTeacher',
        search: {
          school: {},
          gradeId: '',
          subjectId: '',
          name: ''
        },
        isIndeterminate: true,
        checkAll: false,
        id: '',
        tempList: [],
        checkedList: [],
        checkedTeacherList: [],
        filterTeacherList: []
      },
      teacherList: [],
      taskAwayVisible: false,
      distributionTypes: [
        { id: 0, name: '定量分配' },
        // { id: 2, name: '效率优先' },
        { id: 1, name: '指定学生分配' }
      ],
      taskAway: {
        id: '',
        distributionType: 0,
        count: 0
      },
      studentCount: 100,
      viewerCount: 0,
      viewerData: [],
      copyVisible: false,
      copy: {
        id: '',
        isIndeterminate: false,
        copyCheckAll: false,
        copyIdList: []
      }
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.getExamById()
  },
  mounted () {
    // 监听页面滚动
    window.addEventListener('scroll', this.handleScroll)
    let drag = document.getElementById('drag')
    this.addMouseEvent(drag)
  },
  methods: {
    // 获取考试信息
    async getExamById () {
      this.allLoading = true
      await this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        this.allLoading = false
      }).catch(() => { this.allLoading = false })
      this.getExamStudentCount()
    },
    // 获取考试人数
    async getExamStudentCount () {
      this.allLoading = true
      await this.axios.post(`${API.EXAM_SELECTCOUNT}/${this.examId}`).then(res => {
        this.studentCount = res.data.data.examineeCount
        this.allLoading = false
      }).catch(() => { this.allLoading = false })
      this.getExamSubject()
    },
    // 查询所有考试科目
    async getExamSubject () {
      this.allLoading = true
      await this.axios.post(API.EXAM_EXAMSUBJECT, { examId: this.examId }).then(res => {
        this.examSubjectList = res.data.data
        this.examSubjectInfo = this.examSubjectList.find(item => {
          return Number(item.id) === Number(this.examSubjectId)
        })
        this.allLoading = false
      }).catch(() => { this.allLoading = false })
      this.getGradeById()
    },
    // 获取考试的年级
    async getGradeById () {
      this.allLoading = true
      await this.axios.post(API.GRADE_FINDBYCOMMON, { id: this.examInfo.gradeId }).then(res => {
        this.examGrade = res.data.data[0]
        this.allLoading = false
      }).catch(() => { this.allLoading = false })
      this.getExamStructureZg()
    },
    // 查询主观题结构
    async getExamStructureZg () {
      this.loading = true
      await this.axios.post(API.EXAMSTRUCTURE_QUERYEXAMSTRUCTURE + '/' + this.examSubjectId + '/' + 1, {}).then(res => {
        let data = []
        res.data.data.forEach(item => {
          data.push({
            id: item.id,
            structureId: item.structureId,
            pid: item.structureId,
            tnumber: item.tnumber,
            score: item.score,
            least: !(item.oneDcExamStructureDtoList.length > 0),
            disabled: false
          })
          if (item.oneDcExamStructureDtoList.length > 0) {
            item.oneDcExamStructureDtoList.forEach(oneQ => {
              data.push({
                id: oneQ.id,
                structureId: oneQ.structureId,
                pid: oneQ.structureId,
                tnumber: oneQ.tnumber,
                score: oneQ.score,
                least: !(oneQ.twoStructureList.length > 0),
                disabled: false
              })
              if (oneQ.twoStructureList.length > 0) {
                oneQ.twoStructureList.forEach(twoQ => {
                  data.push({
                    id: twoQ.id,
                    structureId: twoQ.structureId,
                    pid: twoQ.structureId,
                    tnumber: twoQ.tnumber,
                    score: twoQ.score,
                    least: !(twoQ.threeStructureList.length > 0),
                    disabled: false
                  })
                  if (twoQ.threeStructureList.length > 0) {
                    twoQ.threeStructureList.forEach(threeQ => {
                      data.push({
                        id: threeQ.id,
                        structureId: threeQ.structureId,
                        pid: threeQ.structureId,
                        tnumber: threeQ.tnumber,
                        score: threeQ.score,
                        least: true,
                        disabled: false
                      })
                    })
                  }
                })
              }
            })
          }
        })
        let arr = data.slice(0)
        this.questionsData = data
        let tree = new TreeUtil(arr, 'id', 'pid', null, 'questions')
        this.questions = tree.toTree()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      this.getTitleBlock()
    },
    // 获取题块信息
    async getTitleBlock () {
      this.loading = true
      await this.axios.post(API.TITLEBLOCK_FINDBYEXAMSUBJECTID + '/' + this.examSubjectId).then(res => {
        console.log(res)
        let data = []
        let checkedNodes = []
        res.data.data.forEach((item, index) => {
          let dataItem = []
          if (item.oneDcExamStructureDtoList.length > 0) {
            item.oneDcExamStructureDtoList.forEach(oneQ => {
              dataItem.push({
                id: oneQ.id,
                structureId: oneQ.structureId,
                pid: oneQ.structureId,
                tnumber: oneQ.tnumber,
                score: oneQ.score,
                disabled: false,
                hasChildren: oneQ.twoStructureList.length > 0
              })
              if (oneQ.twoStructureList.length > 0) {
                oneQ.twoStructureList.forEach(twoQ => {
                  dataItem.push({
                    id: twoQ.id,
                    structureId: twoQ.structureId,
                    pid: twoQ.structureId,
                    tnumber: twoQ.tnumber,
                    score: twoQ.score,
                    disabled: false,
                    hasChildren: twoQ.threeStructureList.length > 0
                  })
                  if (twoQ.threeStructureList.length > 0) {
                    twoQ.threeStructureList.forEach(threeQ => {
                      dataItem.push({
                        id: threeQ.id,
                        structureId: threeQ.structureId,
                        pid: threeQ.structureId,
                        tnumber: threeQ.tnumber,
                        score: threeQ.score,
                        disabled: false,
                        hasChildren: threeQ.fourStructureList.length > 0
                      })
                      if (threeQ.fourStructureList.length > 0) {
                        threeQ.fourStructureList.forEach(fourQ => {
                          dataItem.push({
                            id: fourQ.id,
                            structureId: fourQ.structureId,
                            pid: fourQ.structureId,
                            tnumber: fourQ.tnumber,
                            score: fourQ.score,
                            disabled: false,
                            hasChildren: false
                          })
                        })
                      }
                    })
                  }
                })
              }
            })
          }
          let arr = dataItem.slice(0)
          this.hasCheckedQuestions.splice(index, 1, arr)
          checkedNodes = checkedNodes.concat(arr)
          let tree = new TreeUtil(dataItem, 'id', 'pid', null, 'questions')
          delete item.oneDcExamStructureDtoList
          item.questions = this.calculateScore(tree.toTree())
          item.content = arr.filter(item => {
            return !item.hasChildren
          }).map(node => {
            return node.tnumber
          })
          data.push(item)
        })
        let setNodes = checkedNodes.filter(node => {
          return !node.hasChildren
        })
        this.$refs.tree.setCheckedNodes(setNodes)
        let nullBlock = [
          {
            titleBlockName: '题块1',
            questions: []
          }
        ]
        this.blockList = data.length > 0 ? data : nullBlock
        // console.log(this.blockList)
        this.tableData = data
        console.log(tableData)
        this.selectBlock(0)
        this.loading = false
      }).catch(() => { this.loading = false })
      this.getSchoolTeacher()
    },
    // 获取学校所有的老师
    async getSchoolTeacher () {
      this.allLoading = true
      let data = {
        schoolCode: this.schoolList[0].id
      }
      await this.axios.post(API.TEACHER_FINDBYCOMMON, data).then(res => {
        this.teacherList = res.data.data
        this.allLoading = false
      }).catch(() => { this.allLoading = false })
      this.getGrade()
    },
    // 获取学校所有年级信息
    async getGrade () {
      this.allLoading = true
      await this.axios.post(API.GRADE_FINDBYCOMMON, { schoolCode: this.schoolCode }).then(res => {
        this.gradeList = res.data.data
        this.allLoading = false
      }).catch(() => { this.allLoading = false })
      this.getSchoolSubject()
    },
    // 获取学校所有科目
    async getSchoolSubject () {
      this.allLoading = true
      await this.axios.post(API.EXAM_FINDBYSUBJECTCOM, { schoolCode: this.schoolNumber }).then(res => {
        this.subjectList = res.data.data
        this.allLoading = false
      }).catch(() => { this.allLoading = false })
    },
    // 计算题块分数
    calculateScore (questions) {
      console.log(questions)
      if (!Array.isArray(questions)) {
        return questions
      }
      let arr = questions.map((q1) => {
        let score1 = 0
        if (q1.questions && q1.questions.length > 0) {
          q1.questions.map(q2 => {
            let score2 = 0
            if (q2.questions && q2.questions.length > 0) {
              q2.questions.map(q3 => {
                let score3 = 0
                if (q3.questions && q3.questions.length > 0) {
                  q3.questions.map(q4 => {
                    score3 += q4.score * 1
                    return q4
                  })
                }
                q3.score = score3 * 1
                score2 += q3.score * 1
                return q3
              })
            }
            q2.score = score2 * 1
            score1 += q2.score * 1
            return q2
          })
          q1.score = score1 * 1
          return q1
        }
        return q1
      })
      return arr
    },
    // 切换题块
    selectBlock (index) {
      this.activeBlockIndex = index
      let checkedNodes = this.$refs.tree.getCheckedNodes()
      let noChecked = []
      checkedNodes.forEach((node, nindex) => {
        node.disabled = true
        let hasChecked = false
        this.hasCheckedQuestions.forEach((qu, qindex) => {
          qu.forEach(item => {
            if (node.id === item.id) {
              hasChecked = true
              if (qindex === index) {
                node.disabled = false
              }
            }
          })
        })
        if (!hasChecked) {
          node.disabled = false
          noChecked.push(nindex)
        }
      })
      let setNodes = checkedNodes.slice(0)
      noChecked.reverse().forEach(item => {
        setNodes.splice(item, 1)
      })
      let checkedNodesLeaf = this.$refs.tree.getCheckedNodes(true)
      let nodes = setNodes.filter(node => {
        let has = checkedNodesLeaf.find(item => {
          return node.id === item.id
        })
        if (has) {
          return node
        }
      })
      this.$refs.tree.setCheckedNodes(nodes)
    },
    // 监听页面滚动，aside吸顶
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 196) {
        this.asideIsFixed = true
      } else {
        this.asideIsFixed = false
      }
    },
    // aside吸顶时的样式
    getIsFixedStyle () {
      let right = (window.innerWidth - 1200) / 2
      return {
        position: 'fixed',
        top: 0,
        right: right + 'px',
        width: 249 + 'px'
      }
    },
    // 为新增题块按钮增加移动事件
    addMouseEvent (dom) {
      let body = document.querySelector('body')
      dom.onmousedown = (e) => {
        let top = dom.offsetTop
        let left = dom.offsetLeft
        let x = e.clientX
        let y = e.clientY
        let isMove = false
        // 当鼠标移动速度很快时，dom的位置变化跟不上鼠标，所以移动事件绑定在body上
        body.onmousemove = (em) => {
          isMove = true
          let detaX = em.clientX - x
          let detaY = em.clientY - y
          dom.style.left = left + detaX + 'px'
          dom.style.top = top + detaY + 'px'
          body.onmouseup = (eu) => {
            body.onmousemove = null
            body.onmouseup = null
          }
        }
        // 鼠标没有移动时执行新增题块方法
        dom.onmouseup = (e) => {
          body.onmousemove = null
          body.onmouseup = null
          if (!isMove) {
            // this.addQuestionBlock()
          }
        }
      }
    },
    // 新增题块
    addQuestionBlock () {
      this.blockList.push(
        {
          blockid: new Date().getTime(),
          titleBlockName: '题块' + (this.blockList.length * 1 + 1),
          questions: []
        }
      )
      // this.hasCheckedQuestions.splice(this.blockList.length - 1, 1, [])
      this.selectBlock(this.blockList.length - 1)
    },
    // 删除题块
    deleteBlock (bIndex) {
      this.blockList.splice(bIndex, 1)
      this.hasCheckedQuestions.splice(bIndex, 1)
      this.selectBlock(this.blockList.length - 1)
    },
    // 选择题目
    treeCheck (data, dataChecked) {
      this.hasChange = true
      let checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
      this.hasCheckedQuestions[this.activeBlockIndex] = []
      let arr = []
      let isLeast = false
      console.log(checkedNodes)
      checkedNodes.forEach(item => {
        delete item.questions
        item.pid = item.structureId
        if (!item.disabled) {
          arr.push(item)
          this.hasCheckedQuestions[this.activeBlockIndex].push(item)
          if (item.least) {
            isLeast = item.least
          }
        }
      })
      if (arr.length > 0 && isLeast) {
        // console.log(arr.slice(0))
        let tree = new TreeUtil(arr, 'id', 'pid', {}, 'questions')
        // console.log(tree.toTree())
        this.blockList[this.activeBlockIndex].questions = this.calculateScore(tree.toTree())
      } else {
        this.blockList[this.activeBlockIndex].questions = []
      }
    },
    // 保存题块
    async saveBlock () {
      this.buttonLoading = true
      let data = []
      this.blockList.forEach(block => {
        let ids = []
        block.questions.forEach(q => {
          ids.push(q.id)
          if (q.questions.length > 0) {
            q.questions.forEach(mq => {
              ids.push(mq.id)
              if (mq.questions.length > 0) {
                mq.questions.forEach(mmq => {
                  ids.push(mmq.id)
                  if (mq.questions.length > 0) {
                    mmq.questions.forEach(mmmq => {
                      ids.push(mmmq.id)
                    })
                  }
                })
              }
            })
          }
        })
        data.push({
          titleBlockName: block.titleBlockName,
          examId: this.examId,
          examSubjectId: this.examSubjectId,
          // examStructureId: ids.slice(1, ids.length).join(',')
          // examStructureId: ids.slice(1, ids.length).join(',')
          examStructureId: ids.join(',')
        })
      })
      await this.axios.post(`${API.TITLEBLOCK_ADDLIST}/${this.examId}`, data).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getTitleBlock()
      }).catch(() => { })
      this.buttonLoading = false
    },
    // 点击单元格事件
    cellClick (row, column, cell, event) {
      if (this.expandRowKeys.length > 0 && this.expandRowKeys[0] === row.id) {
        this.expandRowKeys = []
      } else {
        this.expandRowKeys = [row.id]
      }
    },
    // 根据ID获取评阅方式
    getReadWayNameById (id) {
      let way = this.readWayList.find(item => {
        return id === item.id
      })
      return way ? way.name : '-'
    },
    // 显示评阅方式弹窗
    setMarkType (row) {
      this.markTypeVisible = true
      this.markType = {
        id: row.id,
        appraiseReadWay: row.appraiseReadWay,
        arbitramentScoreGap: row.arbitramentScoreGap || 0
      }
    },
    // 修改评阅方式
    saveReadWay () {
      this.axios.post(API.TITLEBLOCK_UPDATECOMMON, this.markType).then(res => {
        this.$message({
          message: '评阅方式修改成功',
          type: 'success'
        })
        this.markTypeVisible = false
        this.getTitleBlock()
      }).catch(() => { })
    },
    // 搜索教师
    async searchTeacher () {
      let search = this.viewer.search
      let data = {
        schoolCode: search.school.id,
        gradeId: search.gradeId,
        subjectId: search.subjectId,
        name: search.name
      }
      await this.axios.post(API.TEACHER_FINDBYCOMMON, data).then(res => {
        let arr = res.data.data
        this.viewer.filterTeacherList = arr
        arr = arr.filter(item => {
          let id = this.viewer.checkedTeacherList.find(teid => {
            return item.id === teid
          })
          return item.id === id
        })
        this.viewer.checkedList = arr.map(item => { return item.id })
        this.viewer.tempList = this.viewer.checkedList
        this.checkChange(this.viewer.checkedList)
      }).catch(() => { })
    },
    // 显示阅卷老师弹窗
    async setViewer (row) {
      this.viewer.title = '设置阅卷老师'
      this.viewer.type = 'viewer'
      this.viewer.id = row.id
      this.viewer.search.school = this.schoolList[0]
      this.viewer.checkedTeacherList = row.teacherId ? row.teacherId.split(',') : []
      await this.searchTeacher()
      this.viewerVisible = true
    },
    // 获取选中的教师信息
    getCheckedTeachers () {
      return this.teacherList.filter(te => {
        let teid = this.viewer.checkedTeacherList.find(id => {
          return te.id === id
        })
        return teid
      })
    },
    // 根据教师集合获取教师名字字符串
    getTeacherNameByList (teacherList) {
      if (!Array.isArray(teacherList)) {
        return '-'
      } else {
        return teacherList.map(te => {
          return te.name
        }).join(',')
      }
    },
    // 根据ID数组字符串获取教师信息
    getTeacherNameByIds (teacherIds) {
      if (!teacherIds) {
        return '-'
      }
      let ids = teacherIds.split(',')
      let teachers = this.teacherList.filter(te => {
        return ids.find(id => {
          return id === te.id
        })
      })
      let names = teachers.map(te => {
        return te.name
      })
      return names.length > 0 ? names.join(',') : '-'
    },
    // 显示仲裁老师弹窗
    async setReviewer (row) {
      this.viewer.title = '设置仲裁老师'
      this.viewer.type = 'reviewer'
      this.viewer.id = row.id
      this.viewer.search.school = this.schoolList[0]
      this.viewer.checkedTeacherList = row.arbitramentTearcherId ? row.arbitramentTearcherId.split(',') : []
      await this.searchTeacher()
      this.viewerVisible = true
    },
    // 全选改变
    checkAllChange (val) {
      if (val) {
        let arr = this.viewer.filterTeacherList.map(item => { return item.id })
        this.viewer.checkedList = arr
        this.viewer.tempList = arr
        let teArr = this.viewer.checkedTeacherList.concat(arr)
        let obj = {}
        this.viewer.checkedTeacherList = teArr.reduce((item, next) => {
          if (!obj[next]) {
            obj[next] = true
            item.push(next)
          }
          return item
        }, [])
      } else {
        let arr = this.viewer.filterTeacherList.map(item => { return item.id })
        this.viewer.checkedList = []
        this.viewer.tempList = []
        let ids = []
        this.viewer.checkedTeacherList.forEach((item, index) => {
          let id = arr.find(aitem => {
            return item === aitem
          })
          if (id) {
            ids.push(index)
          }
        })
        ids.reverse().forEach(ind => {
          this.viewer.checkedTeacherList.splice(ind, 1)
        })
      }
      this.isIndeterminate = false
    },
    // 监听CheckBox状态改变
    checkedChange (value) {
      let checkedCount = value.length
      this.viewer.checkAll = checkedCount === this.viewer.filterTeacherList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.teacherList.length
      let arrA = this.viewer.tempList
      let arrB = this.viewer.checkedList
      // 差集
      let differenceA = arrA.filter((v) => { return arrB.indexOf(v) === -1 })
      let differenceB = arrB.filter((v) => { return arrA.indexOf(v) === -1 })
      this.viewer.checkedTeacherList = this.viewer.checkedTeacherList.filter(item => {
        return item !== differenceA[0]
      })
      this.viewer.checkedTeacherList.push(differenceB[0])
      this.viewer.tempList = value
    },
    // 删除阅卷老师
    removeTeacher (index) {
      this.viewer.checkedList.splice(index, 1)
    },
    // 修改阅卷/仲裁老师
    saveTeacher () {
      let data = {}
      if (this.viewer.type === 'viewer') {
        data = {
          id: this.viewer.id,
          teacherId: this.viewer.checkedList.join(',')
        }
      }
      if (this.viewer.type === 'reviewer') {
        data = {
          id: this.viewer.id,
          arbitramentTearcherId: this.viewer.checkedList.join(',')
        }
      }
      this.axios.post(API.TITLEBLOCK_UPDATECOMMON, data).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.viewerVisible = false
        this.getTitleBlock()
      }).catch(() => { })
    },
    // 根据ID获取分配方式
    getTaskWayNameById (id) {
      console.log(id)
      console.log(this.distributionTypes)
      let way = this.distributionTypes.find(item => {
        console.log(item)
        return id === item.id
      })
      console.log(way)
      return way ? way.name : '-'
    },
    // 分配方式修改窗口显示
    setTaskAway (row) {
      console.log(row)
      if (!row.teacherList || row.teacherList.length === 0) {
        this.$message({
          message: '请先设置阅卷老师',
          type: 'warning'
        })
        return false
      }
      let arr = []
      row.teacherList.forEach((item, index) => {
        arr.push({ teacherId: item.id, name: item.name, quantity: row.tlist[index].number })
      })
      this.taskAway = {
        row: row,
        id: row.id,
        distributionType: 0,
        count: this.studentCount,
        odd: this.studentCount,
        viewerData: arr
      }
      this.verifyOdd(0)
      this.taskAwayVisible = true
    },
    // 平均分配
    avgTask () {
      let row = this.taskAway.row
      let arr = []
      let lastQtt = this.taskAway.count
      let tCount = row.teacherList.length
      let qtt = Math.floor(lastQtt / tCount)
      row.teacherList.forEach(item => {
        arr.push({ teacherId: item.id, name: item.name, quantity: qtt })
        lastQtt -= qtt
      })
      if (lastQtt > 0) {
        arr = arr.map(item => {
          if (lastQtt > 0) {
            item.quantity += 1
            lastQtt -= 1
          }
          return item
        })
      }
      this.taskAway.odd = 0
      this.taskAway.viewerData = arr
    },
    // 清空分配
    removeTask () {
      this.$confirm('此操作将清空所有已分配的阅卷任务, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.taskAway.viewerData = this.taskAway.viewerData.map(item => {
          item.quantity = 0
          return item
        })
        this.taskAway.odd = this.taskAway.count
      }).catch(() => {
      })
    },
    // 验证剩余数量
    verifyOdd (index) {
      let sum = 0
      this.taskAway.viewerData.forEach(item => {
        sum += parseInt(item.quantity)
      })
      if (this.taskAway.count < sum) {
        this.taskAway.viewerData[index].quantity = 0
        sum = 0
        this.taskAway.viewerData.forEach(item => {
          sum += parseInt(item.quantity)
        })
      }
      this.taskAway.odd = this.taskAway.count - sum
    },
    // 修改分配方式
    saveTaskWay () {
      let data = {
        examBlockId: this.taskAway.id,
        examSubjectId: this.examSubjectId,
        type: this.taskAway.distributionType,
        maps: this.taskAway.viewerData.map(item => {
          delete item.name
          return item
        })
      }
      this.axios.post(API.TITLEBLOCK_ALLOCATIONTASK, data).then(res => {
        this.$message({
          message: '分配方式修改成功',
          type: 'success'
        })
        this.taskAwayVisible = false
        this.getTitleBlock()
      }).catch(() => { })
    },
    // 复制阅卷任务窗口显示
    setCopy (row) {
      this.copy.id = row.id
      this.copyVisible = true
    },
    copyCheckAllChange (val) {
      let checkedList = []
      if (val) {
        let arr = this.blockList.filter(item => {
          return item.id !== this.copy.id
        })
        if (arr) {
          checkedList = arr.map(item => {
            return item.id
          })
        }
      }
      this.copy.copyIdList = checkedList
      this.copy.isIndeterminate = false
    },
    // 新窗口打开
    openTarget (router) {
      // let routeUrl = this.$router.resolve(router)
      // window.open(routeUrl.href, '_blank')
      this.$router.push({ path: router.path })
    }
    // async copySetting () {
    //   let block = this.blockList.find(item => {
    //     return item.id === this.copy.id
    //   })
    //   let dataList = []
    //   this.copy.copyIdList.forEach(id => {
    //     dataList.push({
    //       id: id,
    //       appraiseReadWay: block.appraiseReadWay,
    //       distributionType: block.distributionType,
    //       teacherId: block.teacherId,
    //       arbitramentTearcherId: block.arbitramentTearcherId
    //     })
    //   })
    //   await this.axios.post(API.TITLEBLOCK_UPDATELIST, dataList).then(res => {
    //     this.$message({
    //       message: '复制阅卷任务成功',
    //       type: 'success'
    //     })
    //     this.copyVisible = false
    //     this.getTitleBlock()
    //   }).catch(() => { })
    // }
  }
}
</script>
<style lang="scss">
#question-block {
  min-height: 770px;
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
  .question-block-content {
    position: relative;
    background: #fff;
    .tabs {
      padding: 0 20px 20px;
      border-top: 1px solid #e4e4e4;
      .block-setting {
        min-height: 625px;
        position: relative;
        margin-left: -7.5px;
        margin-right: -7.5px;
        .el-col {
          padding-left: 7.5px;
          padding-right: 7.5px;
        }
        .card-active {
          border: 1px solid #37b7f9;
        }
        .box-card {
          margin: 15px 0;
          .el-card__header {
            padding: 5px 15px;
            .el-input {
              width: 250px;
              font-size: 18px;
              font-family: Arial, Helvetica, sans-serif;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .header-text {
              cursor: default;
              input {
                border-color: transparent;
                cursor: default;
              }
            }
            .el-button {
              float: right;
              margin: 0 10px;
              color: #6e7379;
            }
          }
          .el-card__body {
            padding: 10px;
            .question-list {
              padding-left: 28px;
            }
            .block-tree {
              .question-name {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px dashed #d9d9d9;
              }
              span {
                &.question-score {
                  float: right;
                  margin: auto 15px;
                }
              }
            }
          }
        }
        .aside {
          .aside-title {
            padding: 10px 0;
            border-bottom: 1px solid #ebecee;
          }
          .aside-tree {
            max-height: 625px;
            overflow-y: auto;
            .el-tree {
              .el-tree-node__content {
                & > .el-tree-node__expand-icon {
                  display: none;
                }
                .el-tree-node__label {
                  font-size: 16px;
                }
              }
            }
          }
          .save-btn {
            width: 100%;
            margin-top: 15px;
          }
        }
      }
      .task-setting {
        .task-setting-top {
          .upload {
            display: inline-block;
          }
          .el-button {
            color: #409eff;
            font-weight: 700;
            font-size: 14px;
            margin-left: 0;
            margin-right: 20px;
            i {
              font-size: 16px;
              font-weight: 700;
            }
          }
        }
        .el-table {
          .el-form-item__label {
            width: 90px;
            color: #000;
            font-weight: 700;
          }
          .el-form-item {
            margin: 0;
          }
          .width25 {
            width: 25%;
          }
          .width75 {
            width: 75%;
          }
          .width100 {
            width: 100%;
          }
          .setting {
            cursor: pointer;
            &:hover {
              color: #56c0e5;
            }
            i {
              margin-right: 5px;
            }
          }
          .copy-task {
            color: #56c0e5;
            cursor: pointer;
          }
        }
        .tips-red {
          color: #fe5b6e;
          font-size: 14px;
          margin-left: 10px;
          margin-top: 20px;
        }
      }
    }
    .to-style {
      position: absolute;
      top: 5px;
      right: 40px;
      .el-button {
        padding: 7px 10px;
      }
    }
  }
  .add-block-btn {
    position: fixed;
    height: 50px;
    width: 50px;
    z-index: 99;
    .el-button {
      height: 50px;
      width: 50px;
      padding: 0;
    }
  }
}
.marktype-dialog {
  .el-row {
    &:nth-child(2) {
      margin-top: 20px;
    }
  }
}
.viewer-dialog {
  .viewer-tabs {
    .search-row {
      .el-input {
        width: 130px;
      }
    }
    .search-content {
      margin-top: 20px;
      border: 1px solid #888;
      min-height: 200px;
      max-height: 300px;
      overflow: auto;
      padding: 20px 0 20px 20px;
      .el-checkbox {
        margin: 0 30px 0 0;
        width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 6px;
      }
      .teacher-box {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
      }
      .el-tag {
        margin: 6px 10px 6px 0;
      }
    }
  }
}
.taskaway-dialog {
  .tips {
    margin-top: 10px;
    height: 40px;
    border-radius: 7px;
    padding: 0 10px;
    border: 1px solid #00c0eb;
    background: #e7f5ff;
    position: relative;
    color: #00c0eb;
    span {
      margin-left: 10px;
    }
  }
  .setting-row {
    margin: 22px 0;
    height: 32px;
    .avg-col {
      text-align: right;
    }
  }
  .schools {
    padding: 20px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2);
    .schools-info {
      padding-bottom: 20px;
    }
    .el-table {
      .el-input {
        input {
          text-align: center;
          color: #409eff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
