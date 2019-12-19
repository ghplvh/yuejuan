<template>
  <el-row id="exam-paper-structure">
    <!-- <bread-crumb></bread-crumb> -->
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/exam/${examId}`}">{{examInfo.examName}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/subjectMain/' + examId + '/' + examSubjectId}">
            <span>{{`${examGrade.gradeName}${examSubjectInfo.subjectName}(${examSubjectId})`}}</span>
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
          <el-breadcrumb-item>设置试卷结构</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-row class="tabs" type="flex" align="middle">
        <el-col :span="16">
          <span class="active-bar" :style="activeBarStyle"></span>
          <span class="tab" ref="tab1" @click="checkTab('tab1',0)">客观题</span>
          <span class="tab" ref="tab2" @click="checkTab('tab2',1)">主观题</span>
        </el-col>
        <el-col :span="8">
          <span class="text" v-if="scoreList.length > 0">总分:
            <font class="font-orange">{{scoreList[1].sumscorek*1 + scoreList[2].sumscorez*1}}</font>=
            <font class="font-orange">{{scoreList[1].sumscorek}}</font>
            <font class="font-12">「客」</font>+
            <font class="font-orange">{{scoreList[2].sumscorez}}</font>
            <font class="font-12">「主」</font>, 其中附加题
            <font class="font-orange">{{scoreList[3].sumscoref}}</font>分
          </span>
        </el-col>
      </el-row>
      <div style="width:100%;height:2px;"></div>
      <el-card v-if="activeTab === 0" class="kg-question" key="0">
        <el-row type="flex" align="middle" class="opra-row">
          <el-col :span="21">
            <el-button type="text" icon="el-icon-plus" @click="addKgQuestion()">新增客观题</el-button>
            <router-link :to="{path: '/settingAnswer/'+ examId + '/' + examSubjectId }">
              <el-button type="text" icon="el-icon-edit">设置答案</el-button>
            </router-link>
            <!-- <el-button type="text" icon="el-icon-plus" @click="subjectSettingReuse()">科目设置复用</el-button> -->
          </el-col>
          <el-col :span="3" class="right">
            <!-- <el-checkbox v-model="isAB" disabled>AB卷两套答案</el-checkbox> -->
          </el-col>
        </el-row>
        <el-table :data="kgTableData" border v-loading="loading" :span-method="kgSpanMethod">
          <el-table-column prop="tnumber" label="题号" align="left"></el-table-column>
          <el-table-column prop="score" label="分数" align="center"></el-table-column>
          <el-table-column prop="optionCount" label="选项数" align="center"></el-table-column>
          <el-table-column label="题型" align="center">
            <template slot-scope="scope">{{getTopicName(scope.row.topicType)}}</template>
          </el-table-column>
          <el-table-column prop="answer" label="答案" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editRow(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteRow(scope.row,0)">
                <font class="delete-text">删除</font>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card v-if="activeTab === 1" class="kg-question" key="1">
        <el-row type="flex" align="middle" class="opra-row">
          <el-col :span="21">
            <el-button type="text" icon="el-icon-plus" @click="addZgQuestion()">新增主观题</el-button>
            <!-- <el-button type="text" icon="el-icon-edit">设置附加题</el-button> -->
            <router-link :to="{path: '/settingAnswer/' + examId + '/' + examSubjectId, query: {tabname: 'subAnswer'}}">
              <el-button type="text" icon="el-icon-tickets">上传主观题答案</el-button>
            </router-link>
            <!-- <el-button type="text" icon="el-icon-plus" @click="subjectSettingReuse()">科目设置复用</el-button> -->
          </el-col>
          <el-col :span="3" class="right"></el-col>
        </el-row>
        <el-table :data="zgTableData" border v-loading="loading" :span-method="zgSpanMethod">
          <el-table-column prop="tnumber" label="题号" align="left"></el-table-column>
          <el-table-column prop="score" label="分数" align="center"></el-table-column>
          <el-table-column label="是否附加题" align="center">
            <template slot-scope="scope">{{(scope.row.ttype === '0' || scope.row.ttype === '') ? '否' : '是'}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editRowZg(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteRow(scope.row,1)">
                <font class="delete-text">删除</font>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-dialog :title="kgTitle" :visible.sync="addKgVisible" width="900px" custom-class="add-kg-dialog question-dialog">
      <el-row type="flex" align="middle" class="big-question-no">
        <el-col :span="2"><span>大题号</span></el-col>
        <el-col :span="22">
          <!-- <el-select size="mini" v-model="kgBigQuestionNo" value-key="id" @focus="currentBigNo = kgBigQuestionNo" @change="bigNoChange"> -->
          <el-select size="mini" v-model="kgBigQuestionNo" value-key="id" @focus="currentBigNo = kgBigQuestionNo">
            <el-option v-for="(item,bqIndex) in bigQuestionNoList" :key="bqIndex" :value="item" :label="item.bigNo"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="question-box">
        <template v-for="(kgq,index) in kgQuestionList">
          <el-row :key="index" type="flex" align="middle" class="question-item">
            <el-col :span="3">
              <el-select size="mini" v-model="kgq.questionType" @change="calculateKgQuestion(kgq)">
                <el-option v-for="(item,kgqIndex) in kgQuestionTypeList" :key="kgqIndex" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">从</el-col>
            <el-col :span="2">
              <el-input v-model="kgq.startNo" size="mini" maxlength="3" @blur="calculateKgQuestion(kgq);verifyQuestionNo(kgQuestionList,index)"></el-input>
            </el-col>
            <el-col :span="1">到</el-col>
            <el-col :span="2">
              <el-input v-model="kgq.endNo" size="mini" maxlength="3" @blur="calculateKgQuestion(kgq);verifyQuestionNo(kgQuestionList,index)"></el-input>
            </el-col>
            <el-col :span="3">题，每题</el-col>
            <el-col :span="2">
              <el-input v-model="kgq.optionCount" size="mini" maxlength="3" @blur="calculateKgQuestion(kgq)" :disabled="kgq.questionType === 3"></el-input>
            </el-col>
            <el-col :span="3">个选项，每题</el-col>
            <el-col :span="2">
              <div class="el-input el-input--mini">
                <input type="number" autocomplete="off" maxlength="4" v-model.number="kgq.score" @blur="calculateKgQuestion(kgq);verifyScore(kgq.score)" class="el-input__inner">
              </div>
            </el-col>
            <el-col :span="1">分</el-col>
            <template v-if="kgq.questionType === 2">
              <el-col :span="1.5">，少选得</el-col>
              <el-col :span="2">
                <div class="el-input el-input--mini">
                  <input type="number" autocomplete="off" maxlength="4" v-model.number="kgq.minscore" @blur="calculateKgQuestion(kgq);verifyScore(kgq.minscore)" class="el-input__inner">
                </div>
              </el-col>
              <el-col :span="1">分</el-col>
            </template>
            <el-col :span="1.5">
              <i class="el-icon-circle-plus-outline opra-icon" @click="addQuestion()"></i>
              <i class="el-icon-remove-outline opra-icon" v-if="kgQuestionList.length > 1" @click="deleteQuestion(index)"></i>
            </el-col>
          </el-row>
        </template>
      </el-row>
      <el-row class="mini-question-list">
        <ol class="kgq-mini-ol">
          <template v-for="(kgq,index) in kgQuestionList">
            <li v-for="(kgqMini,miniIndex) in kgq.miniQuestionList" :key="index + miniIndex" class="border-bottom">
              <el-row type="flex" align="middle">
                <el-col :span="1">&nbsp;&nbsp;{{kgqMini.tnumber}}</el-col>
                <el-col :span="1.5" :offset="7" v-if="kgq.questionType === 2">答案：</el-col>
                <el-col :span="1.5" :offset="12" v-else>答案：</el-col>
                <el-col :span="3">
                  <el-input v-model="kgqMini.answer" size="mini" placeholder="非必填" @focus="saveAnswerTemp = kgqMini.answer" @blur="verifyAnswer(kgq.questionType,kgqMini)"></el-input>
                </el-col>
                <el-col :span="1.5">选项数：</el-col>
                <el-col :span="2">
                  <el-input v-model="kgqMini.optionCount" size="mini" :disabled="kgq.questionType === 3"></el-input>
                </el-col>
                <el-col :span="1.5">分数：</el-col>
                <el-col :span="2">
                  <div class="el-input el-input--mini">
                    <input type="number" autocomplete="off" maxlength="4" v-model.number="kgqMini.score" @blur="verifyScore(kgqMini.score)" class="el-input__inner">
                  </div>
                </el-col>
                <template v-if="kgq.questionType === 2">
                  <el-col :span="1.5">少选得：</el-col>
                  <el-col :span="2">
                    <div class="el-input el-input--mini">
                      <input type="number" autocomplete="off" maxlength="4" v-model="kgqMini.minscore" @blur="verifyScore(kgqMini.minscore)" class="el-input__inner">
                    </div>
                  </el-col>
                  <el-col :span="1">分</el-col>
                </template>
              </el-row>
            </li>
          </template>
        </ol>
      </el-row>
      <div slot="footer">
        <el-button size="mini" @click="addKgVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="submitKgQuestion()" :loading="buttonLoading">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="科目设置复用" center :visible.sync="reuseVisible" width="720px" custom-class="reuse-dialog">
      <el-row>提示：选择考试科目后,可将该科目试卷结构,模板等复制到本科目。</el-row>
      <el-row type="flex" align="middle">
        <el-col :span="3">选择考试</el-col>
        <el-col :span="19">
          <el-select v-model="reuseExam" size="mini"></el-select>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="3">选择科目</el-col>
        <el-col :span="19">
          <el-select v-model="reuseSubject" size="mini"></el-select>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="3">复用内容</el-col>
        <el-col :span="19">
          <el-checkbox-group size="mini" v-model="reuseList">
            <el-checkbox :label="1" checked disabled>结构和模板</el-checkbox>
            <el-checkbox :label="2">题块框选</el-checkbox>
            <el-checkbox :label="3">客观题答案</el-checkbox>
            <el-checkbox :label="4">原卷和主观题答案</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="mini" @click="reuseVisible = false">取消</el-button>
        <el-button type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="zgTitle" :visible.sync="addZgVisible" width="900px" custom-class="add-zg-dialog question-dialog">
      <el-card>
        <el-row type="flex" align="middle">
          <el-col :span="2">大题号</el-col>
          <el-col :span="3">
            <!-- <el-select size="mini" v-model="zgBigQuestionNo" value-key="id" @focus="currentBigNo = zgBigQuestionNo" @change="bigNoChange"> -->
            <el-select size="mini" v-model="zgBigQuestionNo" value-key="id" @focus="currentBigNo = zgBigQuestionNo">
              <el-option v-for="(item,bqIndex) in bigQuestionNoList" :key="bqIndex" :value="item" :label="item.bigNo"></el-option>
            </el-select>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="1">总分</el-col>
          <el-col :span="1" v-if="zgQuestionList.length > 0">
            <span>{{zgScoreCount}}</span>
          </el-col>
          <el-col :span="2" v-else>
            <div class="el-input el-input--mini">
              <input type="number" autocomplete="off" maxlength="4" v-model="zgScoreCount" class="el-input__inner">
            </div>
          </el-col>
          <el-col :span="1.5">&nbsp;分&nbsp;</el-col>
          <el-col :span="2">
            <el-button type="text" @click="addMiniQuestion()" v-if="zgQuestionList.length === 0">添加小题</el-button>
          </el-col>
        </el-row>
        <el-row class="question-box">
          <template v-for="(zgq,index) in zgQuestionList">
            <el-row :key="index" type="flex" align="middle" class="question-item">
              <el-col :span="3">
                <el-select size="mini" v-model="zgq.questionType" disabled>
                  <el-option v-for="(item,zgqIndex) in zgQuestionTypeList" :key="zgqIndex" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col :span="1">从</el-col>
              <el-col :span="2">
                <el-input v-model="zgq.startNo" size="mini" maxlength="3" @blur="calculateZgQuestion(zgq);verifyQuestionNo(zgQuestionList,index)"></el-input>
              </el-col>
              <el-col :span="1">到</el-col>
              <el-col :span="2">
                <el-input v-model="zgq.endNo" size="mini" maxlength="3" @blur="calculateZgQuestion(zgq);verifyQuestionNo(zgQuestionList,index)"></el-input>
              </el-col>
              <el-col :span="3">题，每题</el-col>
              <el-col :span="2">
                <div class="el-input el-input--mini">
                  <input type="number" autocomplete="off" maxlength="4" v-model="zgq.score" @blur="calculateZgQuestion(zgq);verifyScore(zgq.score)" class="el-input__inner">
                </div>
              </el-col>
              <el-col :span="1">分</el-col>
              <el-col :span="1.5">
                <i class="el-icon-circle-plus-outline opra-icon" @click="addMiniQuestion()"></i>
                <i class="el-icon-remove-outline opra-icon" @click="deleteMiniQuestion(index)"></i>
              </el-col>
            </el-row>
          </template>
        </el-row>
        <el-row class="mini-question-list" v-if="zgQuestionList.length > 0">
          <ol>
            <template v-for="(zgq,index) in zgQuestionList">
              <li v-for="(zgqMini,miniIndex) in zgq.miniQuestionList" :key="index + miniIndex" class="border-bottom">
                <el-row>
                  <el-col :span="1">{{zgqMini.tnumber}}</el-col>
                  <el-col :span="2" :offset="12" v-if="zgqMini.miniQuestionList.length > 0" class="score-col">
                    <span>{{zgqMini.score}}</span>
                  </el-col>
                  <el-col :span="2" :offset="12" v-else>
                    <div class="el-input el-input--mini">
                      <input type="number" autocomplete="off" maxlength="4" v-model="zgqMini.score" @blur="calculateScore();verifyScore(zgqMini.score)" class="el-input__inner">
                    </div>
                    <!-- <el-input v-model="zgqMini.score" size="mini" @blur="calculateScore()"></el-input> -->
                  </el-col>
                  <el-col :span="1">分</el-col>
                  <el-col :span="3">
                    <el-button type="text" icon="el-icon-plus" size="mini" @click="addMiniQ(zgqMini)">添加小题</el-button>
                  </el-col>
                </el-row>
                <ol>
                  <li v-for="(zgqMM,mmIndex) in zgqMini.miniQuestionList" :key="index + miniIndex + mmIndex" class="border-top">
                    <el-row>
                      <el-col :span="1" :offset="1">{{zgqMM.tnumber}}</el-col>
                      <el-col :span="2" :offset="11" v-if="zgqMM.miniQuestionList.length > 0" class="score-col">
                        <span>{{zgqMM.score}}</span>
                      </el-col>
                      <el-col :span="2" :offset="11" v-else>
                        <div class="el-input el-input--mini">
                          <input type="number" autocomplete="off" maxlength="4" v-model="zgqMM.score" @blur="calculateScore();verifyScore(zgqMM.score)" class="el-input__inner">
                        </div>
                        <!-- <el-input v-model="zgqMM.score" size="mini" @blur="calculateScore()"></el-input> -->
                      </el-col>
                      <el-col :span="1">分</el-col>
                      <el-col :span="3">
                        <el-button type="text" icon="el-icon-plus" size="mini" @click="addMiniQ(zgqMM)">添加小题</el-button>
                      </el-col>
                      <el-col :span="1" :offset="2"><i class="el-icon-remove-outline opra-icon" @click="deleteMiniQ(zgqMini.miniQuestionList,mmIndex)"></i></el-col>
                    </el-row>
                    <ol>
                      <li v-for="(zgqMMM,mmmIndex) in zgqMM.miniQuestionList" :key="index + miniIndex + mmIndex + mmmIndex" class="border-top">
                        <el-row>
                          <el-col :span="1" :offset="2">{{zgqMMM.tnumber}}</el-col>
                          <el-col :span="2" :offset="10">
                            <div class="el-input el-input--mini">
                              <input type="number" autocomplete="off" maxlength="4" v-model="zgqMMM.score" @blur="calculateScore();verifyScore(zgqMMM.score)" class="el-input__inner">
                            </div>
                            <!-- <el-input v-model="zgqMMM.score" size="mini" @blur="calculateScore()"></el-input> -->
                          </el-col>
                          <el-col :span="1">分</el-col>
                          <el-col :span="1" :offset="5"><i class="el-icon-remove-outline opra-icon" @click="deleteMiniQ(zgqMM.miniQuestionList,mmmIndex)"></i></el-col>
                        </el-row>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </template>
          </ol>
        </el-row>
      </el-card>
      <div slot="footer">
        <el-button size="mini" @click="addZgVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="submitZgQuestion()" :loading="buttonLoading">确定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
// import BreadCrumb from '../components/BreadCrumb'
import API from '../api/api.js'
import Utils from '../utils/Utils.js'
import { mapState } from 'vuex'
// import TreeUtil from '../utils/TreeUtil.js'
export default {
  data () {
    return {
      schoolCode: '',
      examId: this.$route.params.examId,
      examInfo: {},
      examSubjectId: this.$route.params.examSubjectId,
      examSubjectInfo: {},
      examSubjectList: [],
      examGrade: {},
      activeBarWidth: 150,
      activeBarTranslateX: 0,
      activeTab: 0,
      loading: false,
      buttonLoading: false,
      isAB: false,
      questionList: [],
      kgTableData: [],
      zgTableData: [],
      tableSpan: [],
      tableSpanZg: [],
      dialogType: 'add',
      addKgVisible: false,
      kgTitle: '新增客观题',
      editId: '',
      kgQuestionTypeList: [{ id: 1, name: '单选题' }, { id: 2, name: '多选题' }, { id: 3, name: '判断题' }],
      kgBigQuestionNo: { id: 1, bigNo: '一' },
      currentBigNo: {},
      bigQuestionNoList: [],
      saveAnswerTemp: '',
      kgQuestionList: [
        {
          questionType: 1,
          startNo: '',
          endNo: '',
          optionCount: 4,
          score: '',
          minscore: '',
          miniQuestionList: []
        }
      ],
      reuseVisible: false,
      reuseExam: '',
      reuseSubject: '',
      reuseList: [],
      zgTitle: '新增主观题',
      addZgVisible: false,
      zgBigQuestionNo: {},
      zgScoreCount: 0,
      zgQuestionTypeList: ['普通题', '选做题'],
      zgQuestionList: [],
      scoreList: [],
      lastTid: 0
    }
  },
  computed: {
    ...mapState(['adminInfo']),
    activeBarStyle: function () {
      return { width: this.activeBarWidth + 'px', transform: 'translateX(' + this.activeBarTranslateX + 'px)' }
    }
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.initBigQuestionNoList()
    this.getExamById()
    this.getExamSubject()
  },
  methods: {
    // 切换tab
    checkTab (tabRef, index) {
      let tabDom = this.$refs[tabRef]
      this.activeBarWidth = tabDom.clientWidth
      this.activeBarTranslateX = tabDom.offsetLeft
      this.activeTab = index
    },
    // 获取考试信息
    getExamById () {
      this.axios.post(API.EXAM_FINDBYID + '/' + this.examId).then(res => {
        this.examInfo = res.data.data[0]
        this.getGradeById()
        this.questionList = []
        this.getExamStructureKg()
        this.getExamStructureZg()
        this.getSumScore()
      }).catch(() => { })
    },
    // 查询所有考试科目
    getExamSubject () {
      this.axios.post(API.EXAM_EXAMSUBJECT, { examId: this.examId }).then(res => {
        // this.examSubjectList = res.data.data
        // this.examSubjectInfo = this.examSubjectList.find(item => {
        //   return item.id === this.examSubjectId
        // })
        this.examSubjectList = res.data.data
        console.log(this.examSubjectList)
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
      this.axios.post(API.EXAMSTRUCTURE_QUERYEXAMSTRUCTURE + '/' + this.examSubjectId + '/' + 0, {}).then(res => {
        let list = res.data.data
        let data = []
        console.log(list)
        list.forEach(item => {
          this.questionList.push(item)
          item.oneDcExamStructureDtoList.forEach(question => {
            data.push(question)
          })
        })
        data.sort((a, b) => { return a.tid - b.tid })
        console.log(data, 'cccc')
        this.kgTableData = data
        this.getTableSpan()
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    getExamStructureZg () {
      this.loading = true
      this.axios.post(API.EXAMSTRUCTURE_QUERYEXAMSTRUCTURE + '/' + this.examSubjectId + '/' + 1, {}).then(res => {
        let list = res.data.data
        let data = []
        console.log(list[list.length - 1].tid)
        this.lastTid = list[list.length - 1].tid
        list.forEach(item => {
          this.questionList.push(item)
          console.log(item)
          if (!item.oneDcExamStructureDtoList || item.oneDcExamStructureDtoList.length === 0) {
            console.log('object')
            item.ssid = item.id
            data.push(item)
          } else {
            item.oneDcExamStructureDtoList.forEach(question => {
              question.ssid = item.id
              data.push(question)
              if (question.twoStructureList.length > 0) {
                question.twoStructureList.forEach(tq => {
                  tq.ssid = item.id
                  data.push(tq)
                  if (tq.threeStructureList.length > 0) {
                    tq.threeStructureList.forEach(thq => {
                      thq.ssid = item.id
                      data.push(thq)
                    })
                  }
                })
              }
            })
          }
        })
        console.log(data, 'ddd')
        data.sort((a, b) => { return a.tid - b.tid })
        this.zgTableData = data
        this.getTableSpanZg()
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 查询试卷总分
    getSumScore () {
      this.axios.post(API.EXAMSTRUCTURE_QUERYSUMSCORE + '/' + this.examSubjectId).then(res => {
        this.scoreList = res.data.data
      }).catch(() => { })
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
    // 根据题型id获取题型名称
    getTopicName (topicType) {
      return this.kgQuestionTypeList.find(item => {
        return item.id === parseInt(topicType)
      }).name
    },
    // 把有相同ID的数据的index放到一起，第一个为需要跨行的行，数组长度为跨行行数
    getTableSpan () {
      this.tableSpan = []
      this.kgTableData.forEach((item, index) => {
        if (this.tableSpan[item.structureId]) {
          this.tableSpan[item.structureId].push(index)
        } else {
          this.tableSpan[item.structureId] = []
          this.tableSpan[item.structureId].push(index)
        }
      })
    },
    getTableSpanZg () {
      this.tableSpanZg = []
      this.zgTableData.forEach((item, index) => {
        if (this.tableSpanZg[item.ssid]) {
          this.tableSpanZg[item.ssid].push(index)
        } else {
          this.tableSpanZg[item.ssid] = []
          this.tableSpanZg[item.ssid].push(index)
        }
      })
    },
    // 客观题表格跨行
    kgSpanMethod ({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex, rowIndex)
      if ([5].includes(columnIndex)) {
        // console.log(row, this.tableSpan)
        if (rowIndex === this.tableSpan[row.structureId][0]) {
          return { rowspan: this.tableSpan[row.structureId].length, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    // 主观题表格跨行
    zgSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if ([3].includes(columnIndex)) {
        if (rowIndex === this.tableSpanZg[row.ssid][0]) {
          return { rowspan: this.tableSpanZg[row.ssid].length, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    // 编辑客观题行
    editRow (row) {
      let rows = {}
      this.kgBigQuestionNo = { id: this.getNumberByTnumber(row.tnumber.split('.')[0]), bigNo: row.tnumber.split('.')[0] }
      this.kgTableData.filter(item => {
        return item.structureId === row.structureId
      }).forEach(qu => {
        if (rows[qu.topicType]) {
          rows[qu.topicType].push(qu)
        } else {
          rows[qu.topicType] = []
          rows[qu.topicType].push(qu)
        }
      })
      this.kgQuestionList = []
      Object.keys(rows).forEach(key => {
        let item = rows[key]
        this.editId = item[0].structureId
        this.kgQuestionList.push({
          questionType: parseInt(item[0].topicType),
          startNo: item[0].tnumber.split('.')[1],
          endNo: item[item.length - 1].tnumber.split('.')[1],
          optionCount: item[0].optionCount,
          score: item[0].score,
          miniQuestionList: item
        })
      })
      this.kgTitle = '修改客观题'
      this.dialogType = 'edit'
      this.addKgVisible = true
    },
    // 编辑主观题行
    editRowZg (row) {
      let rows = {}
      this.zgBigQuestionNo = { id: this.getNumberByTnumber(row.tnumber.split('.')[0]), bigNo: row.tnumber.split('.')[0] }
      this.zgTableData.filter(item => {
        return item.ssid === row.ssid
      }).forEach(qu => {
        if (rows[qu.ssid]) {
          rows[qu.ssid].push(qu)
        } else {
          rows[qu.ssid] = []
          rows[qu.ssid].push(qu)
        }
      })
      this.zgQuestionList = []
      Object.keys(rows).forEach(key => {
        let item = rows[key]
        // console.log(item)
        this.editId = item[0].structureId
        this.zgQuestionList.push({
          questionType: '普通题',
          startNo: item[0].tnumber.split('.')[1],
          endNo: item[item.length - 1].tnumber.split('.')[1],
          optionCount: item[0].optionCount,
          score: item[0].score,
          miniQuestionList: item.filter(tq => {
            delete tq.twoStructureList
            return parseInt(tq.numberType) === 1
          })
        })
        // console.log(this.zgQuestionList)
        this.zgQuestionList.forEach(bq => {
          bq.miniQuestionList.forEach(mq => {
            let list = item.filter(tq => {
              // console.log(tq.structureId, mq.id)
              return parseInt(tq.numberType) === 2 && tq.structureId === mq.id
            })
            mq.miniQuestionList = list
            mq.miniQuestionList.forEach(mmq => {
              let list = item.filter(tq => {
                // console.log(tq.structureId, mmq.id)
                return parseInt(tq.numberType) === 3 && tq.structureId === mmq.id
              })
              mmq.miniQuestionList = list
            })
          })
        })
      })
      // console.log(this.zgQuestionList)
      this.zgTitle = '修改主观题'
      this.dialogType = 'edit'
      this.addZgVisible = true
    },
    // 删除行
    deleteRow (row, type = 0) {
      let bigNo = row.tnumber.split('.')[0]
      this.$confirm('确定删除' + bigNo + '大题吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (type === 0) {
          this.axios.post(API.EXAMSTRUCTURE_DELETEBYPRIMARYKEY + '/' + row.structureId).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.questionList = []
            this.getExamStructureKg()
            this.getExamStructureZg()
            this.getSumScore()
          }).catch(() => { })
        }
        if (type === 1) {
          this.zgBigQuestionNo = { id: this.getNumberByTnumber(row.tnumber.split('.')[0]), bigNo: row.tnumber.split('.')[0] }
          let rows = this.zgTableData.filter(item => {
            return item.ssid === row.ssid
          })
          this.axios.post(API.EXAMSTRUCTURE_BATCHDELETE + '/' + rows[0].structureId, rows).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.questionList = []
            this.getExamStructureKg()
            this.getExamStructureZg()
            this.getSumScore()
          }).catch(() => { })
        }
      }).catch(() => { })
    },
    /* ----------------新增客观题开始---------------- */
    // 显示新增弹窗
    addKgQuestion () {
      let bigNo = {}
      for (let j = 0; j < this.bigQuestionNoList.length; j++) {
        let hasBigNo = false
        for (let i = 0; i < this.questionList.length; i++) {
          if (this.questionList[i].tnumber === this.bigQuestionNoList[j].bigNo) {
            hasBigNo = true
          }
        }
        if (!hasBigNo) {
          bigNo = this.bigQuestionNoList[j]
          break
        }
      }
      this.kgBigQuestionNo = bigNo
      this.kgQuestionList = [
        {
          questionType: 1,
          startNo: '',
          endNo: '',
          optionCount: 4,
          score: '',
          miniQuestionList: []
        }
      ]
      this.kgTitle = '新增客观题'
      this.dialogType = 'add'
      this.addKgVisible = true
    },
    bigNoChange (val) {
      let qu = this.questionList.find(question => {
        return val.bigNo === question.tnumber
      })
      if (qu) {
        this.$message({
          message: '大题号不能重复',
          type: 'error'
        })
        this.kgBigQuestionNo = this.currentBigNo
        this.zgBigQuestionNo = this.currentBigNo
      }
    },
    // 大题新增小题
    addQuestion () {
      this.kgQuestionList.push({
        questionType: 1,
        startNo: '',
        endNo: '',
        optionCount: 4,
        score: '',
        minscore: '',
        miniQuestionList: []
      })
    },
    // 大题重新生成小题
    calculateKgQuestion (question) {
      let score = 0
      this.kgQuestionList.forEach(item => {
        score += item.score * 1
      })
      this.kgScoreCount = score
      let answers = question.miniQuestionList.map(item => {
        return item.answer
      })
      question.miniQuestionList = []
      if (question.questionType === 3) {
        question.optionCount = 2
      }
      if (!question.startNo || !question.endNo) {
        return
      }
      for (let i = parseInt(question.startNo); i <= parseInt(question.endNo); i++) {
        question.miniQuestionList.push({
          tnumber: this.kgBigQuestionNo.bigNo + '.' + i,
          score: question.score,
          minscore: question.minscore,
          answer: answers[i - 1],
          optionCount: question.optionCount ? question.optionCount : 4
        })
      }
    },
    // 校验题号
    verifyQuestionNo (questionList, index) {
      let miniQ = questionList[index]
      if (isNaN(miniQ.startNo) || isNaN(miniQ.endNo)) {
        this.$message({
          message: '题号格式填写错误',
          type: 'error'
        })
        if (isNaN(miniQ.startNo)) {
          miniQ.startNo = ''
        }
        if (isNaN(miniQ.endNo)) {
          miniQ.endNo = ''
        }
      }
      let startNo = parseInt(miniQ.startNo)
      let endNo = parseInt(miniQ.endNo)
      if ((startNo && endNo) && (startNo > endNo)) {
        this.$message({
          message: '起始题号不能大于结束题号',
          type: 'error'
        })
        miniQ.startNo = ''
        miniQ.endNo = ''
      }
      if (index !== 0) {
        let lastMiniQ = questionList[index - 1]
        if (parseInt(miniQ.startNo) <= parseInt(lastMiniQ.endNo)) {
          this.$message({
            message: '题号重复，请重新输入',
            type: 'error'
          })
          miniQ.startNo = ''
          miniQ.endNo = ''
        }
      }
    },
    // 校验分数是否为数字
    verifyScore (score) {
      if (isNaN(score) || score <= 0) {
        this.$message({
          message: '题目的分数不能为0',
          type: 'error'
        })
      }
    },
    // 校验答案
    verifyAnswer (questionType = '', kgqMini = {}) {
      if (!kgqMini.answer) {
        return
      }
      let ans = kgqMini.answer.toLowerCase()
      console.log(ans)
      if (Number(questionType) === 3 && (ans !== 't' && ans !== 'f')) {
        this.$message({
          message: '请输入T或F，不区分大小写',
          type: 'error'
        })
        kgqMini.answer = this.saveAnswerTemp
      } else if (Number(questionType) === 1 && ans.length > 1) {
        this.$message({
          message: '单选题的答案只能有一个',
          type: 'error'
        })
        kgqMini.answer = this.saveAnswerTemp
      } else if (Number(questionType) === 2) {
        console.log(ans)
        if (ans.length < 2) {
          this.$message({
            message: '多选题的答案不能只有一个',
            type: 'error'
          })
        }
        let strArr = ans.split('')
        for (let i = 0; i < strArr.length; i++) {
          if (i === strArr.length - 1) {
            return
          }
          if (strArr[i] === strArr[i + 1]) {
            this.$message({
              message: '多选题的答案不能重复',
              type: 'error'
            })
            kgqMini.answer = this.saveAnswerTemp
          }
        }
      }
      // 计算答案是否在范围内ASCII码
      if (kgqMini.optionCount > 0 && questionType !== '判断题') {
        let strArr = ans.split('')
        for (let i = 0; i < strArr.length; i++) {
          let startCodeA = 'A'.charCodeAt()
          let endCodeA = startCodeA + kgqMini.optionCount - 1
          let charCode = strArr[i].toUpperCase().charCodeAt()
          if (charCode < startCodeA || charCode > endCodeA) {
            this.$message({
              message: '请输入A-' + String.fromCharCode(endCodeA) + '之间的字母，不区分大小写',
              type: 'error'
            })
            kgqMini.answer = this.saveAnswerTemp
          }
        }
      }
    },
    // 删除问题
    deleteQuestion (index) {
      this.kgQuestionList.splice(index, 1)
    },
    // 获取当前最大题目排序编号
    getMaxTid () {
      let kgTids = this.kgTableData.map(item => {
        return item.tid
      })
      let zgTids = this.zgTableData.map(item => {
        return item.tid
      })
      let tids = kgTids.concat(zgTids)
      let tid = Utils.arrMaxNum2(tids)
      console.log(tids)
      console.log(tid)
      return tid < 0 ? 0 : tid + 1
    },
    // 提交客观题
    async submitKgQuestion () {
      let data = []
      this.buttonLoading = true
      let hasEmptyMini = false
      let tid = this.getMaxTid()
      this.kgQuestionList.forEach((bigQ, bindex) => {
        if (bigQ.miniQuestionList.length === 0) {
          hasEmptyMini = true
        }
        if (data.length === 0) {
          data.push({
            tid: tid,
            examId: this.examId,
            examSubjectId: this.examSubjectId,
            tnumber: this.kgBigQuestionNo.bigNo,
            score: bigQ.score,
            minscore: bigQ.minscore,
            questionType: 0,
            topicType: bigQ.questionType,
            optionCount: bigQ.optionCount,
            numberType: 0,
            ttype: 0
          })
          tid = tid + 1
        }
        bigQ.miniQuestionList.forEach((miniQ, mindex) => {
          data.push({
            tid: tid,
            examId: this.examId,
            examSubjectId: this.examSubjectId,
            tnumber: miniQ.tnumber,
            score: miniQ.score,
            minscore: miniQ.minscore,
            questionType: 0,
            topicType: bigQ.questionType,
            optionCount: miniQ.optionCount,
            answer: miniQ.answer,
            numberType: 1,
            ttype: 0
          })
          tid = tid + 1
        })
      })
      if (hasEmptyMini) {
        this.$message({
          message: '小题不能为空',
          type: 'error'
        })
        this.buttonLoading = false
        return false
      }
      if (this.dialogType === 'add') {
        await this.axios.post(API.EXAMSTRUCTURE_ADDEXAMSTRUCTURE, data).then(res => {
          this.$message({
            message: '新增客观题成功',
            type: 'success'
          })
          this.addKgVisible = false
          this.questionList = []
          this.getExamStructureKg()
          this.getExamStructureZg()
          this.getSumScore()
        }).catch(() => { })
      }
      if (this.dialogType === 'edit') {
        await this.axios.post(API.EXAMSTRUCTURE_UPDATEBATCHKE + '/' + this.editId, data).then(res => {
          this.$message({
            message: '修改客观题成功',
            type: 'success'
          })
          this.addKgVisible = false
          this.questionList = []
          this.getExamStructureKg()
          this.getExamStructureZg()
          this.getSumScore()
        }).catch(() => { })
      }
      this.buttonLoading = false
    },
    /* ----------------新增客观题结束---------------- */
    // 科目设置复用
    subjectSettingReuse () {
      this.reuseVisible = true
    },
    /* ----------------新增主观题开始---------------- */
    // 显示弹窗
    addZgQuestion () {
      let bigNo = {}
      for (let j = 0; j < this.bigQuestionNoList.length; j++) {
        let hasBigNo = false
        for (let i = 0; i < this.questionList.length; i++) {
          if (this.questionList[i].tnumber === this.bigQuestionNoList[j].bigNo) {
            hasBigNo = true
          }
        }
        if (!hasBigNo) {
          bigNo = this.bigQuestionNoList[j]
          break
        }
      }
      this.zgTitle = '新增主观题'
      this.dialogType = 'add'
      this.zgBigQuestionNo = bigNo
      this.addZgVisible = true
      this.zgQuestionList = []
      this.zgScoreCount = 0
    },
    // 大题新增小题
    addMiniQuestion () {
      this.zgQuestionList.push({
        questionType: '普通题',
        startNo: '',
        endNo: '',
        score: '',
        miniQuestionList: []
      })
    },
    // 大题删除小题
    deleteMiniQuestion (index) {
      this.zgQuestionList.splice(index, 1)
    },
    // 大题重新生成小题
    calculateZgQuestion (question) {
      let score = 0
      question.miniQuestionList = []
      if (!question.startNo || !question.endNo) {
        return
      }
      for (let i = question.startNo; i <= question.endNo; i++) {
        question.miniQuestionList.push({ tnumber: this.zgBigQuestionNo.bigNo + '.' + i, score: question.score, miniQuestionList: [] })
      }
      console.log(this.zgQuestionList)
      this.zgQuestionList.forEach(item => {
        item.miniQuestionList.forEach(mini => {
          score += (item.score * 1)
        })
      })
      this.zgScoreCount = score
    },
    // 小题新增小题
    addMiniQ (zgqMini) {
      zgqMini.score = 0
      let i = zgqMini.miniQuestionList.length + 1
      zgqMini.miniQuestionList.push({ tnumber: zgqMini.tnumber + '.' + i, score: '', miniQuestionList: [] })
      this.calculateScore()
    },
    // 小题删除小题
    deleteMiniQ (list, index) {
      list.splice(index, 1)
      this.calculateScore()
    },
    // 计算分数
    calculateScore () {
      console.log(111)
      this.zgScoreCount = 0
      this.recursiveScore(this.zgQuestionList)
    },
    // 递归计算总分数
    recursiveScore (questionList) {
      console.log(questionList)
      questionList.forEach(item => {
        console.log(item)
        if (item.questionType) {
          this.recursiveScore(item.miniQuestionList)
        } else if (item.miniQuestionList.length > 0) {
          let score = this.zgScoreCount
          this.recursiveScore(item.miniQuestionList)
          item.score = this.zgScoreCount - score
        } else {
          this.zgScoreCount += item.score === '' ? 0 : item.score * 1
        }
      })
    },
    // 提交主观题
    async submitZgQuestion () {
      this.buttonLoading = true
      let data = []
      let id = 0
      let tid = this.getMaxTid()
      let ttid = Number(this.lastTid) === 0 ? tid : this.lastTid + 1
      let hasEmptyMini = false
      if (this.zgQuestionList.length === 0) {
        hasEmptyMini = true
        data.push({
          id: id,
          tid: ttid,
          structureId: '',
          examId: this.examId,
          examSubjectId: this.examSubjectId,
          tnumber: this.zgBigQuestionNo.bigNo,
          score: this.zgScoreCount,
          questionType: 1,
          numberType: 0,
          ttype: 0
        })
      }
      this.zgQuestionList.forEach((question, index) => {
        let pid = id
        if (data.length === 0) {
          data.push({
            id: id,
            tid: ttid,
            structureId: '',
            examId: this.examId,
            examSubjectId: this.examSubjectId,
            tnumber: this.zgBigQuestionNo.bigNo,
            score: this.zgScoreCount,
            questionType: 1,
            numberType: 0,
            ttype: 0
          })
          ++id
        }
        if (question.miniQuestionList.length === 0) {
          hasEmptyMini = true
        }
        if (question.miniQuestionList.length > 0) {
          question.miniQuestionList.forEach((miniQ, mindex) => {
            let ppid = id
            data.push({
              id: id,
              tid: tid,
              structureId: pid,
              examId: this.examId,
              examSubjectId: this.examSubjectId,
              tnumber: miniQ.tnumber,
              score: miniQ.score,
              questionType: 1,
              numberType: 1,
              ttype: 0
            })
            tid = tid + 1
            ++id
            if (miniQ.miniQuestionList.length > 0) {
              miniQ.miniQuestionList.forEach((mmQ, mmindex) => {
                let pppid = id
                data.push({
                  id: id,
                  tid: tid,
                  structureId: ppid,
                  examId: this.examId,
                  examSubjectId: this.examSubjectId,
                  tnumber: mmQ.tnumber,
                  score: mmQ.score,
                  questionType: 1,
                  numberType: 2,
                  ttype: 0
                })
                tid = tid + 1
                ++id
                if (mmQ.miniQuestionList.length > 0) {
                  mmQ.miniQuestionList.forEach((mmmQ, mmmindex) => {
                    data.push({
                      id: id,
                      tid: tid,
                      structureId: pppid,
                      examId: this.examId,
                      examSubjectId: this.examSubjectId,
                      tnumber: mmmQ.tnumber,
                      score: mmmQ.score,
                      questionType: 1,
                      numberType: 3,
                      ttype: 0
                    })
                    tid = tid + 1
                    ++id
                  })
                }
              })
            }
          })
        }
      })
      console.log(data)
      if (hasEmptyMini) {
        // this.$message({
        //   message: '小题不能为空',
        //   type: 'error'
        // })
        // this.buttonLoading = false
        // return false
      }
      if (this.dialogType === 'add') {
        await this.axios.post(API.EXAMSTRUCTURE_ADDEXAMS, data).then(res => {
          this.$message({
            message: '新增主观题成功',
            type: 'success'
          })
          this.addZgVisible = false
          this.questionList = []
          this.getExamStructureZg()
          this.getExamStructureKg()
          this.getSumScore()
        }).catch(() => { })
      }
      if (this.dialogType === 'edit') {
        await this.axios.post(API.EXAMSTRUCTURE_UPDATEBATCHZHU + '/' + this.editId, data).then(res => {
          this.$message({
            message: '修改主观题成功',
            type: 'success'
          })
          this.addZgVisible = false
          this.questionList = []
          this.getExamStructureZg()
          this.getExamStructureKg()
          this.getSumScore()
        }).catch(() => { })
      }
      this.buttonLoading = false
    }
    /* ----------------新增主观题结束---------------- */
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
#exam-paper-structure {
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
  .tabs {
    background: #fff;
    height: 40px;
    position: relative;
    .active-bar {
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 2px;
      background-color: #409eff;
      z-index: 1;
      transition: transform 0.3s ease-in-out;
      list-style: none;
    }
    .tab {
      width: 150px;
      display: block;
      height: 100%;
      float: left;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
    .text {
      width: 100%;
      padding-right: 40px;
      display: block;
      line-height: 40px;
      text-align: end;
      color: #b1b1b1;
      font-size: 14px;
    }
    .font-12 {
      font-size: 12px;
    }
    .font-orange {
      color: orange;
    }
  }
  .kg-question {
    min-height: 500px;
    .opra-row {
      .el-button {
        color: rgb(123, 123, 123);
        margin-left: 20px;
      }
      .right {
        text-align: right;
        .el-checkbox__label {
          color: rgb(175, 175, 175);
        }
      }
    }
    .el-table {
      margin-top: 10px;
      th {
        background: rgb(238, 241, 246);
        font-weight: bold;
      }
    }
  }
}
.add-kg-dialog {
  .big-question-no {
    .el-col-2 {
      width: 55px;
    }
    .el-col-22 {
      width: 70px;
    }
  }
}
.question-dialog {
  .question-box {
    text-align: center;
    .question-item {
      margin-top: 10px;
      .el-col-3 {
        width: 100px;
      }
      .el-col-2 {
        width: 55px;
        .el-input__inner {
          width: 55px;
          padding: 0;
          text-align: center;
        }
      }
    }
  }
  .opra-icon {
    font-size: 18px;
    cursor: pointer;
    margin-right: 5px;
  }
  .mini-question-list {
    margin-top: 20px;
    ol {
      list-style: none;
      .border-bottom {
        border-bottom: 1px solid rgba(183, 181, 181, 0.55);
        line-height: 50px;
        position: relative;
      }
      .border-top {
        border-top: 1px solid rgba(183, 181, 181, 0.55);
        position: relative;
      }
      .score-col {
        text-align: center;
      }
    }
    .kgq-mini-ol {
      border-width: 1px 1px 0 1px;
      border-style: solid;
      border-color: rgba(183, 181, 181, 0.55);
      .el-input__inner {
        padding: 0;
        text-align: center;
      }
      .el-col-2 {
        .el-input__inner {
          width: 55px;
        }
      }
      .el-col-3 {
        .el-input__inner {
          width: 90px;
        }
      }
    }
  }
}
.reuse-dialog {
  .el-row {
    margin-left: 40px;
    padding-top: 20px;
    &:first-child {
      padding-top: 0;
    }
    .el-select {
      width: 100%;
    }
  }
}
.add-zg-dialog {
  .el-col-1 {
    text-align: center;
  }
  .el-col-2 {
    width: 55px;
    .el-input__inner {
      text-align: center;
      padding: 0;
    }
  }
}
</style>
