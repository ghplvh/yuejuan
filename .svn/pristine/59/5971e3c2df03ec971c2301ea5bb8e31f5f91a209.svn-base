<template>
  <div id="check-paper">
    <el-row class="bread-crumb" type="flex" align="middle">
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mainMenu' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/checkPaperBlock/${examId}/${examSubjectId}/${examineId}` }">待阅题块</el-breadcrumb-item>
          <el-breadcrumb-item>试卷打分</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" class="operation-video">
        <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
      </el-col>
    </el-row>
    <el-row class="paper-box" type="flex" justify="space-between">
      <el-col :span="18" class="paper-left">
        <el-row class="left-title">学生作答图片</el-row>
        <!-- <el-carousel :autoplay="false" indicator-position="none" arrow="always" :height="getCarouselHeight()"> -->
        <el-carousel :autoplay="false" indicator-position="none" arrow="always">
          <template v-if="paperList.length > 0">
            <el-carousel-item v-for="img in paperList[currentPaper].images" :key="img">
              <img :src="img" alt="学生作答图片">
            </el-carousel-item>
          </template>
        </el-carousel>
      </el-col>
      <el-col :span="6" class="paper-right">
        <!-- <el-row class="right-title">十位</el-row>
        <el-row class="right-score" type="flex" justify="space-between">
          <el-radio-group v-model="shiwei">
            <el-radio v-for="shi in scoreList" :key="shi" border size="mini" :label="shi" :disabled="disabledSw(shi)">{{shi}}</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="right-title">个位</el-row>
        <el-row class="right-score" type="flex" justify="space-between">
          <el-radio-group v-model="gewei">
            <el-radio v-for="ge in scoreList" :key="ge" border size="mini" :label="ge" :disabled="disabledGw(ge)">{{ge}}</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="right-title">小数位</el-row>
        <el-row class="right-score" type="flex" justify="space-between">
          <el-radio-group v-model="fenwei">
            <el-radio v-for="fen in xiaoshuList" :key="fen" border size="mini" :label="fen" :disabled="disabledFw(fw)">{{fen}}</el-radio>
          </el-radio-group>
        </el-row> -->
        <el-row class="stepper">
          <el-col :span="6" class="laber">步长：</el-col>
          <el-col :span="6">
            <el-select v-model="step" size="mini" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="right-score">
          <el-radio-group v-model="shiwei" @change="radioChange">
            <el-radio v-for="item in newScoreList" :key="item.score" border size="mini" :label="item.score">{{item.label}}</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="stepper">
          <el-col :span="6" class="laber" :offset="1">打分：</el-col>
          <el-col :span="6">
            <el-input v-model="finalScore" placeholder="0" size="mini"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button icon="el-icon-check" size="mini" @click="sure"></el-button>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button icon="el-icon-close" size="mini"></el-button>
          </el-col>
        </el-row>
        <el-row class="final-score">
          <span>题块总分：</span>
          <span class="blue-bold" v-if="paperList.length > 0">{{paperList[currentPaper].score}}</span>
        </el-row>
        <el-row class="final-score">
          <span>最终得分：</span>
          <span class="red-bold">{{finalScore}}</span>
        </el-row>
        <el-row class="submit-row">
          <el-col :span="10">
            <el-checkbox v-model="checked">自动提交</el-checkbox>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-button type="primary" size="mini" :loading="buttonLoading" @click="savePaperScore()">确认</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import API2 from '../api/api2.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      examId: this.$route.params.examId,
      examSubjectId: this.$route.params.examSubjectId,
      examineId: this.$route.params.examineId,
      blockId: this.$route.params.blockId,
      userId: '',
      loading: false,
      paperList: [],
      currentPaper: 0,
      buttonLoading: false,
      shiwei: 0,
      gewei: 0,
      fenwei: 0,
      scoreList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      newScoreList: [],
      xiaoshuList: [0, 5],
      checked: true,
      options: [
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 3,
          label: 3
        },
        {
          value: 4,
          label: 4
        },
        {
          value: 5,
          label: 5
        },
        {
          value: 0.5,
          label: 0.5
        },
        {
          value: 1.5,
          label: 1.5
        }
      ],
      step: 1,
      score: 0,
      finalScore: 0,
      input: 0
    }
  },
  computed: {
    ...mapState(['adminInfo'])
    // finalScore () {
    //   return Number(this.shiwei.toString() + this.gewei.toString() + '.' + this.fenwei.toString())
    // }
  },
  created () {
    this.userId = this.adminInfo.teacherInfo.id
  },
  mounted () {
    this.$nextTick(() => {
      this.getExaminePaper()
    })
  },
  methods: {
    // 获取待阅试卷信息
    getExaminePaper () {
      this.loading = true
      let data = {
        blockId: this.blockId,
        examineId: this.examineId,
        status: 0,
        userId: this.userId
      }
      this.axios.post(API2.APPEXAMEXAMINE_GETNOEXAMINENUMBYBLOCKID, data).then(res => {
        let data = res.data.data
        this.score = data[0].score
        this.getQuick(1)
        this.paperList = data.map(item => {
          item.images = item.examAnswersheet.split(',')
          return item
        })
        this.currentPaper = 0
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 获取图片高度
    getCarouselHeight () {
      if (!this.paperList.length > 0) {
        return 0
      }
      let images = this.paperList[this.currentPaper].images
      let heightList = []
      for (let i = 0, len = images.length; i < len; i++) {
        let img = new Image()
        img.src = images[i]
        heightList.push(img.height * (820 / img.width))
      }
      heightList.sort((a, b) => { return a - b })
      return heightList[0] + 'px'
    },
    // 保存得分
    savePaperScore () {
      this.buttonLoading = true
      let paper = this.paperList[this.currentPaper]
      let data = [
        {
          answersheetId: paper.answersheetId,
          blockId: this.blockId,
          examineId: paper.examineId,
          isExamine: 1,
          testScore: this.finalScore,
          userId: this.userId
        }
      ]
      this.axios.post(API2.APPEXAMEXAMINE_SAVEANSWERSHEETBYANSWERSHEETID, data).then(res => {
        if (this.currentPaper < this.paperList.length - 1) {
          this.$message({
            message: '打分成功',
            type: 'success',
            duration: 1000
          })
          this.currentPaper++
        } else {
          this.$message({
            message: '完成阅卷',
            type: 'success'
          })
          this.$router.push({ path: `/checkPaperBlock/${this.examId}/${this.examSubjectId}/${this.examineId}` })
        }
        this.shiwei = 0
        this.gewei = 0
        this.fenwei = 0
        this.finalScore = 0
        this.buttonLoading = false
      }).catch(() => { this.buttonLoading = false })
    },
    disabledSw (swNumber) {
      if (!swNumber || this.paperList.length === 0) {
        return false
      }
      return Number(swNumber.toString() + this.gewei.toString() + '.' + this.fenwei.toString()) > this.paperList[this.currentPaper].score
    },
    disabledGw (gwNumber) {
      if (!gwNumber || this.paperList.length === 0) {
        return false
      }
      return Number(this.shiwei.toString() + gwNumber.toString() + '.' + this.fenwei.toString()) > this.paperList[this.currentPaper].score
    },
    disabledFw (fwNumber) {
      if (!fwNumber || this.paperList.length === 0) {
        return false
      }
      return Number(this.shiwei.toString() + this.gewei.toString() + '.' + fwNumber.toString()) > this.paperList[this.currentPaper].score
    },
    // 步长
    selectChange (value) {
      this.getQuick(value)
    },
    // 根据步长计算快速打分
    getQuick (step) {
      let array = [{ label: '满分', score: this.score }]
      for (let i = 0; i <= this.score; i += step) {
        array.push({ label: i, score: i })
      }
      if (this.score % step !== 0) {
        array.push({ label: this.score, score: this.score })
      }
      this.$nextTick(() => {
        this.newScoreList = array
      })
    },
    // 单选
    radioChange (val) {
      this.finalScore = val
      if (!this.checked) {
        return
      }
      this.savePaperScore()
    },
    sure () {
      if (!this.checked) {
        return
      }
      this.savePaperScore()
    }
  }
}
</script>
<style lang="scss">
#check-paper {
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
  .paper-box {
    .left-title {
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
    }
    .paper-left {
      background-color: #ffffff;
      padding: 0 20px 20px;
      .el-carousel {
        background-color: #e6e6e6;
        padding: 20px;
        min-height: 600px;
        height: auto;
        display: flex;
        align-items: center;
        .el-carousel__container {
          width: 100%;
          // height: calc(100% - 30px);
          height: 567px;
          .el-carousel__item {
            height: auto;
            img {
              width: 100%;
              // height: 100%;
            }
          }
        }
        .el-carousel__indicators--outside {
          button {
            background-color: #409eff;
          }
        }
      }
    }
    .paper-right {
      background-color: #ffffff;
      width: 280px;
      .stepper {
        height: 40px;
        line-height: 40px;
        text-align: center;
        .laber {
          font-size: 14px;
          font-weight: 700;
          color: #666;
        }
      }
      .right-title {
        text-align: center;
        padding: 10px 0;
      }
      .right-score {
        padding: 20px 20px;
        .el-radio-group {
          width: 100%;
          display: flex;
          // justify-content: space-between;
          flex-flow: row wrap;
          .el-radio {
            width: 70px;
            margin-left: 0px;
            margin-right: 15px;
            margin-bottom: 10px;
            &:nth-child(3n) {
              margin-right: 0px;
            }
          }
        }
      }
      .final-score {
        margin-top: 20px;
        padding: 0 20px;
        .red-bold {
          color: red;
          font-size: 18px;
          font-weight: bold;
        }
        .blue-bold {
          color: #409eff;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .submit-row {
        line-height: 30px;
        padding: 0 20px;
        margin-top: 20px;
        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
