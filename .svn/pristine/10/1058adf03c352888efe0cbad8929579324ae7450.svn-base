<template>
  <el-container id="answer-sheet">
    <el-header height="50px">head</el-header>
    <el-container>
      <el-main class="container-left">
        <div id="container-box" style="width: 783px;">
          <div class="allscore">当前总分：<span>0</span>分</div>
          <div class="page" id="page1">
            <div>
              <svg width="708.5" height="78.5" viewBox="0 0 1417 157">
                <defs></defs>
              </svg>
            </div>
            <div>
              <div>
                <ul class="btn-set-header btn-zindex">
                  <li style="top:98px;">
                    <button>编辑</button>
                  </li>
                </ul>
              </div>
              <svg width="708.5" height="340" viewBox="0 0 1417 598">
                <defs></defs>
              </svg>
              <textarea class="title-input">请输入答题卡标题</textarea>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="320px" id="setting-box"></el-aside>
    </el-container>
  </el-container>
</template>
<script>
import * as d3 from 'd3'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      examCodeCount: 8,
      rectData: {
        x: 0,
        y: 150,
        height: 478
      },
      examCodeData: {
        miniWidth: 460,
        width: 460,
        miniItemWidth: 57,
        itemWidth: 57,
        titleHeight: 78,
        nullY: 257,
        imageWidth: 31,
        imageHeight: 19,
        text: '准 考 证 号'
      },
      personCommonData: {
        width: '',
        textStartX: '',
        textStartY: 231,
        textWidth: 103,
        lineStartY: 237,
        detaY: 83
      },
      personData: ['姓名：', '考场：', '座号：', '学校：', '班级：']
    }
  },
  components: {},
  created () {
    this.initPersonCommonData()
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  mounted () {
    this.createPersonInfoSVG()
  },
  methods: {
    // 初始化答题卡svg的属性
    initPersonCommonData () {
      if (this.examCodeCount <= 8) {
        this.examCodeData.width = this.examCodeData.miniWidth
        this.examCodeData.itemWidth = this.examCodeData.width / this.examCodeCount
      } else {
        this.examCodeData.width = this.examCodeData.miniItemWidth * this.examCodeCount
        this.examCodeData.itemWidth = this.examCodeData.miniItemWidth
      }
      let width = 708 * 2 - this.examCodeData.width
      this.personCommonData = {
        width: width,
        textStartX: 0.1 * width,
        textStartY: 231,
        textWidth: 103,
        lineStartY: 237,
        detaY: 83
      }
    },
    // 创建答题卡svg
    createPersonInfoSVG () {
      let rectData = this.rectData
      let personCommonData = this.personCommonData
      let examCodeData = this.examCodeData
      let pageList = document.querySelectorAll('.page')
      let svgList = pageList[0].querySelectorAll('svg')
      // 画考生信息填写栏边框
      d3.select(svgList[1]).append('rect').attr('x', rectData.x).attr('y', rectData.y).attr('width', this.personCommonData.width).attr('height', rectData.height)
        .attr('style', 'fill-opacity:0;').attr('stroke', '#000000')
      // 画考生信息填写栏
      this.personData.forEach((item, index) => {
        d3.select(svgList[1]).append('text')
          .attr('x', personCommonData.textStartX)
          .attr('y', personCommonData.textStartY + personCommonData.detaY * index)
          .attr('style', 'font-size: 33px; font-family: 文泉驿微米黑;')
          .text(item)
        let x1 = personCommonData.textStartX + personCommonData.textWidth
        let x2 = personCommonData.width - personCommonData.textStartX
        d3.select(svgList[1]).append('line')
          .attr('x1', x1)
          .attr('x2', (x2 - x1) > 575 ? (x1 + 575) : x2)
          .attr('y1', personCommonData.lineStartY + personCommonData.detaY * index)
          .attr('y2', personCommonData.lineStartY + personCommonData.detaY * index)
          .attr('stroke', '#000000')
      })
      // 画准考证证大框
      d3.select(svgList[1]).append('rect').attr('x', personCommonData.width).attr('y', rectData.y).attr('width', examCodeData.width).attr('height', rectData.height)
        .attr('style', 'fill-opacity:0;').attr('stroke', '#000000')
      // 画准考证标题框
      d3.select(svgList[1]).append('rect').attr('x', personCommonData.width).attr('y', rectData.y).attr('width', examCodeData.width).attr('height', examCodeData.titleHeight)
        .attr('style', 'fill-opacity:0;').attr('stroke', '#000000')
      // 画准考证标题
      d3.select(svgList[1]).append('text')
        .attr('x', personCommonData.width + examCodeData.width / 2 - 83)
        .attr('y', rectData.y + examCodeData.titleHeight - 24)
        .attr('style', 'font-size: 33px; font-family: 文泉驿微米黑;')
        .text(examCodeData.text)
      // 画准考证填写框下边线
      d3.select(svgList[1]).append('line')
        .attr('x1', personCommonData.width)
        .attr('x2', personCommonData.width + examCodeData.width)
        .attr('y1', rectData.y + examCodeData.titleHeight * 2)
        .attr('y2', rectData.y + examCodeData.titleHeight * 2)
        .attr('stroke', '#000000')
      // 画准考证分栏竖线
      for (let i = 0; i < this.examCodeCount; i++) {
        d3.select(svgList[1]).append('line')
          .attr('x1', personCommonData.width + examCodeData.itemWidth * i)
          .attr('x2', personCommonData.width + examCodeData.itemWidth * i)
          .attr('y1', rectData.y + examCodeData.titleHeight)
          .attr('y2', rectData.y + rectData.height)
          .attr('stroke', '#000000')
        // 准考证号涂卡区高度
        let imageBoxHeight = rectData.height - examCodeData.titleHeight * 2 - 6
        // 填充涂卡框
        for (let j = 0; j < 10; j++) {
          d3.select(svgList[1]).append('image')
            .attr('x', personCommonData.width + (examCodeData.itemWidth - 31) / 2 + examCodeData.itemWidth * i)
            .attr('y', rectData.y + examCodeData.titleHeight * 2 + imageBoxHeight / 10 * j + 8)
            .attr('width', 31)
            .attr('height', 19)
            .attr('preserveAspectRatio', 'none')
            // 图片路径需要require，不然找不到路径
            .attr('href', require('../assets/svg/' + j + '.svg'))
            .attr('stroke', '#000000')
        }
      }
    }
  }
}
</script>
<style lang="scss">
#answer-sheet {
  min-height: 100vh;
  .el-header {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: #425369;
    position: fixed;
    z-index: 10;
    text-align: center;
    color: #fff;
  }
  .el-container {
    max-height: calc(100vh - 50px);
    margin-top: 50px;
    .container-left {
      overflow: auto;
      max-height: 100%;
      min-height: 820px;
      #container-box {
        width: 748px;
        margin: 0 auto;
        .allscore {
          position: fixed;
          left: 10px;
          font-family: 黑体;
          z-index: 5;
          span {
            color: #1daef8;
            font-size: 24px;
          }
        }
        .page {
          border: 1px solid #888;
          margin-bottom: 20px;
          border-radius: 3px;
          position: relative;
          // ----------
          text-align: center;
          background-color: white;
          width: 750px;
          height: 1171px;
          .btn-zindex {
            z-index: 3;
          }
        }
        #page1 {
          div:nth-child(2) {
            position: relative;
            .title-input {
              box-sizing: border-box;
              text-align: center;
              position: absolute;
              resize: none;
              left: 21px;
              top: 0px;
              height: 78px;
              line-height: 33px;
              width: 708px;
              font-size: 23px;
              border-style: dashed;
              word-break: break-all;
              z-index: 2;
            }
          }
          .btn-set-header {
            position: absolute;
            list-style: none;
            padding: 0;
            li {
              position: relative;
              left: 725px;
              button {
                cursor: pointer;
                font-size: 14px;
                padding: 0;
                margin: 0;
                border: 0;
                width: 44px;
                height: 26px;
                line-height: 26px;
                display: inline-block;
                text-align: center;
                margin-left: -44px;
                background-color: #1daef8;
                color: #fff;
              }
            }
          }
        }
      }
    }
    #setting-box {
      overflow: auto;
    }
  }
}
</style>
