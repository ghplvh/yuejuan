<template>
  <div id="block-style" element-loading-text="加载图片中" v-loading="loading">
    <el-container>
      <el-main>
        <el-row type="flex" align="middle" class="main-header">
          <el-col :span="15">
            <el-pagination :current-page="currentPage+1" @current-change="pageChange" @prev-click="prevPage" @next-click="nextPage" class="page" background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :page-size="1" :total="svgImages.length" small></el-pagination>
          </el-col>
          <el-col :span="2" :offset="7" class="zoom">
            <!-- <i class="el-icon-remove-outline" @click="setScale(-0.05)"></i>
            <i class="el-icon-circle-plus-outline" @click="setScale(0.05)"></i> -->
          </el-col>
        </el-row>
        <div class="main-svg" :style="mainSvgHeight" ref="mainSVG">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="getSvgWidth()" :viewBox="getSvgViewBox()">
            <template v-for="(img,index) in svgImages">
              <image :width="getSvgWidth()" :xlink:href="img" :key="index" v-if="currentPage === index"></image>
            </template>
            <g v-for="(block,brlIndex) in blockRectList[currentPage]" :key="block" :id="brlIndex" :class="block.isActive ? 'is-active' : ''">
              <rect class="cut-rect" :x="block.rect.x" :y="block.rect.y" :width="block.rect.width" :height="block.rect.height" :index="brlIndex" @mousedown="rectMousedown"></rect>
              <template v-if="block.isActive">
                <circle v-for="(circle,cIndex) in block.circleList" :key="cIndex" :class="'point ' + circle.className" :brl-index="brlIndex" :index="cIndex" :cx="circle.cx" :cy="circle.cy" :r="circle.r" :fill="circle.fill" @mousedown="circleMouseDown"></circle>
              </template>
              <text :x="block.text.x" :y="block.text.y" class="text-center" style="font-size:11px;" @mousedown="mousedownBlock">{{block.text.textString}}</text>

              <foreignObject v-if="block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height">
                <span class="save-button" @click.stop="saveBlock(brlIndex)" @mousedown="mousedownBlock">保存</span>
                <span class="delete-button" @click.stop="deleteBlock(brlIndex)" @mousedown="mousedownBlock">删除</span>
              </foreignObject>
              <foreignObject v-if="!block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height">
                <span class="edit-button" @click.stop="editBlock(brlIndex)" @mousedown="mousedownBlock">编辑</span>
              </foreignObject>
            </g>
          </svg>
        </div>
      </el-main>
      <el-aside width="240px">
        <el-collapse v-model="activeBlock" @change="changeBlock" accordion>
          <el-collapse-item v-for="(block) in blockList" :key="block.id" :name="block.id" :class="( getCutStatus(block.id,1) && activeBlock !== block.id) ? 'has-cut': ''">
            <template slot="title">
              {{block.titleBlockName + '('+block.score+'分)'}}<i class="el-icon-success" v-if="( getCutStatus(block.id,2)  && activeBlock !== block.id)"></i>
            </template>
            <div v-for="question in block.questions" :key="question.id">{{question.tnumber}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
import API from '../api/api.js'
import { mapState } from 'vuex'
import Utils from '../utils/Utils.js'
export default {
  data () {
    return {
      A3: { w: 1191, h: 842 },
      loading: false,
      examId: this.$route.params.examId,
      examSubjectId: this.$route.params.examSubjectId,
      activeBlock: '',
      blockList: [],
      blockRectList: [],
      currentBlockIndex: 0,
      tempList: [],
      ratio: [],
      ratioWH: 1, // 图片高/宽
      svgWidth: 0,
      scaleSvg: 1,
      templateInfo: [],
      // svgImages: [require('../assets/sj.png'), require('../assets/sj2.png'), require('../assets/sj3.png')],
      svgImages: [],
      currentPage: 0,
      currentClickDom: ''
    }
  },
  computed: {
    ...mapState(['adminInfo']),
    mainSvgHeight () {
      return { height: (window.innerHeight - 45) + 'px' }
    }
  },
  created () {
    this.getTemplateInfo()
  },
  mounted () {
    if (this.$refs['mainSVG']) {
      this.svgWidth = this.$refs['mainSVG'].clientWidth
    }
  },
  methods: {
    async getTemplateInfo () {
      let data = {
        examId: this.examId,
        examSubjectId: this.examSubjectId
      }
      this.axios.post(API.EXAMTEMPLATE_FINDBYANSWER, data).then(res => {
        this.templateInfo = res.data.data
        if (res.data.data.length > 0) {
          this.svgImages = res.data.data[0].imgUrl.split(',')
        }
        this.getRatio(true)
      }).catch(() => { })
      await this.getBlockRect()
    },
    // 获取图片宽高比
    getRatio (refresh = true) {
      this.$nextTick(() => {
        let image = document.querySelector('image')
        console.log(image)
        let imageWidth = parseInt(image.getAttribute('width')) || 0
        let img = new Image()
        img.src = this.svgImages[this.currentPage]
        img.onload = () => {
          this.ratioWH = img.height / img.width
        }
        this.svgImages.forEach((src, index) => {
          let srcImg = new Image()
          console.log(src)
          srcImg.src = src
          srcImg.onload = () => {
            let ratio = srcImg.width / (imageWidth === 0 ? this.imageWidth : imageWidth)
            console.log(srcImg.width, '---------srcImgWidth')
            console.log(this.imageWidth, '---------this.imageWidth')
            console.log(imageWidth, '---------imageWidth')
            console.log(ratio)
            this.$set(this.ratio, index, ratio)
            this.addEvent()
            if (index === this.svgImages.length - 1 && refresh) {
              this.getTitleBlock()
            }
          }
        })
      })
    },
    // 获取题块信息
    async getTitleBlock () {
      this.loading = true
      await this.axios.post(`${API.TITLEBLOCK_FINDBYEXAMSUBJECTID}/${this.examSubjectId}`).then(res => {
        let data = []
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
          let questions = dataItem.filter(node => {
            return !node.hasChildren
          })
          let score = 0
          questions.map(item => {
            score += Number(item.score)
          })
          item.score = score
          item.questions = questions
          delete item.oneDcExamStructureDtoList
          data.push(item)
        })
        this.blockList = data
      }).catch(() => { this.loading = false })
      this.getBlockRect()
    },
    // 获取题块框
    getBlockRect () {
      this.axios.post(`${API.TOPLIC_FINDBYEXAMSUBJECTID}/${this.examSubjectId}`).then(res => {
        console.log(res.data.data.length)
        console.log(res.data.data)
        if (res.data.data.length > 0) {
          let list = res.data.data
          let tempArr = []
          // list.forEach(item => {
          for (let i = 0; i < list.length; i++) {
            let item = list[i]
            console.log(item)
            let ratio = this.ratio[item.zoom]
            let newX = item.abscissa / ratio
            let newY = item.ordinate / ratio
            let newWidth = item.width / ratio
            let newHeight = item.height / ratio
            let blockRect = {
              id: item.id,
              zoom: item.zoom,
              titleBlockId: item.titleBlockId,
              examSubjectId: this.examSubjectId,
              rect: { x: newX, y: newY, width: newWidth, height: newHeight },
              circleList: this.getCirclePosition(newX, newY, newWidth, newHeight),
              text: {
                textString: this.getBlockNameById(item.titleBlockId),
                x: newX + newWidth / 2,
                y: newY + newHeight / 2
              },
              foreignObject: {
                x: newX + newWidth - 90,
                y: newY + newHeight + 5,
                width: 90,
                height: 30
              },
              isActive: false
            }
            console.log(blockRect)
            if (tempArr[item.zoom]) {
              tempArr[item.zoom].push(blockRect)
            } else {
              tempArr[item.zoom] = []
              tempArr[item.zoom].push(blockRect)
            }
            console.log(blockRect)
          }
          console.log(tempArr)
          this.tempList = tempArr
          this.blockRectList = tempArr
        } else {
          this.blockRectList = []
        }
        console.log(this.blockRectList)
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 获取题块框的名称
    getBlockNameById (blockId) {
      let block = this.blockList.find(item => {
        return item.id === blockId
      })
      return block.titleBlockName || ''
    },
    // 获取题块框选状态
    getCutStatus (blockId, id) {
      let hasCut = false
      this.blockRectList.forEach(item => {
        item.forEach(rect => {
          if (rect.titleBlockId === blockId) {
            hasCut = true
          }
        })
      })
      return hasCut
    },
    // 翻页
    pageChange (val) {
      this.currentPage = val - 1
      this.getRatio()
    },
    prevPage (val) {
      this.currentPage = val - 1
      this.getRatio()
    },
    nextPage (val) {
      this.currentPage = val - 1
      this.getRatio()
    },
    // 选择题块
    changeBlock (activeBlock) {
      let block = this.blockList.find((item, index) => {
        if (item.id === activeBlock) {
          this.currentBlockIndex = index
        }
        return item.id === activeBlock
      })
      this.blockRectList = this.blockRectList.map(page => {
        page.map(rect => {
          rect.isActive = false
          if (block) {
            if (rect.titleBlockId === block.id) {
              if (this.currentPage !== rect.zoom) {
                this.currentPage = rect.zoom
                this.getRatio()
              }
              rect.isActive = true
            }
          }
          return rect
        })
        return page
      })
    },
    // 计算svg的width，height，viewbox
    getSvgWidth () {
      return this.svgWidth * this.scaleSvg
    },
    getSvgHeight () {
      return this.svgWidth * this.ratioWH * this.scaleSvg
    },
    getSvgViewBox () {
      return [0, 0, this.getSvgWidth(), this.getSvgHeight()].join(',')
    },
    // 设置缩放等级
    setScale (number) {
      if ((this.scaleSvg <= 0.5 && number < 0) || (this.scaleSvg >= 1.5 && number > 0)) {
        return
      }
      this.getRatio(false)
      this.scaleSvg += number
      let data = Utils.deepCopy(this.tempList)
      this.blockRectList = data.map(item => {
        item = item.map(g => {
          console.log(g)
          Object.keys(g.rect).forEach(k => {
            g.rect[k] = g.rect[k] * this.scaleSvg
          })
          Object.keys(g.foreignObject).forEach(k => {
            g.foreignObject[k] = g.foreignObject[k] * this.scaleSvg
          })
          g.text.x = g.text.x * this.scaleSvg
          g.text.y = g.text.y * this.scaleSvg
          g.circleList = g.circleList.map(c => {
            c.cx = c.cx * this.scaleSvg
            c.cy = c.cy * this.scaleSvg
            return c
          })
          g.isActive = false
          return g
        })
        return item
      })
      // let svg = document.querySelector('svg')
      // let gList = svg.querySelectorAll('g')
      // // svg.setAttribute('transform', 'translate(0,' + -this.getSvgHeight() * (1 - Math.sqrt(this.scaleSvg)) + ') scale(' + this.scaleSvg + ')')
      // gList.forEach(g => {
      //   g.setAttribute('transform', 'scale(' + this.scaleSvg + ')')
      // })
    },
    // 给svg添加鼠标事件，画矩形
    addEvent () {
      let svg = document.querySelector('svg')
      svg.onmousedown = (ed) => {
        if (!this.activeBlock) {
          this.$message({
            message: '请先选择题块',
            type: 'warning'
          })
          return false
        }
        let x = ed.offsetX
        let y = ed.offsetY
        // 添加题块和矩形框
        if (!this.blockRectList[this.currentPage]) {
          this.blockRectList[this.currentPage] = []
        }
        let pageRectList = this.blockRectList[this.currentPage]
        pageRectList.push({
          titleBlockId: this.activeBlock,
          rect: { x: x, y: y, width: 0, height: 0 },
          circleList: [],
          text: {},
          foreignObject: {},
          isActive: true
        })
        // 禁止冒泡
        ed.stopPropagation()
        svg.onmousemove = (em) => {
          let lastBlock = pageRectList[pageRectList.length - 1]
          // 计算矩形起始坐标和宽高
          let newX = Math.min(em.offsetX, x)
          let newY = Math.min(em.offsetY, y)
          let width = Math.abs(x - em.offsetX)
          let height = Math.abs(y - em.offsetY)
          // 更新矩形框
          lastBlock.rect = {
            x: newX,
            y: newY,
            width: width,
            height: height
          }
          this.blockRectList.splice(this.currentPage, 1, pageRectList)
          svg.onmouseup = (eu) => {
            // 创建8个矩形缩放点，位置分别在拐点和中点，添加圆点列表
            for (let i = 0; i < 8; i++) {
              let cx = newX
              let cy = newY
              if (i < 3) {
                cx += width / 2 * i
                cy += 0
              }
              if (i >= 3 && i < 5) {
                cx += width
                cy += height / 2 * (i - 3 + 1)
              }
              if (i >= 5 && i < 7) {
                cx += width / 2 * (7 - i - 1)
                cy += height
              }
              if (i >= 7) {
                cx += 0
                cy += height / 2
              }
              // 鼠标指针改变
              let className = ''
              if (i === 0 || i === 4) {
                className = 'nw-resize'
              }
              if (i === 1 || i === 5) {
                className = 's-resize'
              }
              if (i === 2 || i === 6) {
                className = 'ne-resize'
              }
              if (i === 3 || i === 7) {
                className = 'e-resize'
              }
              lastBlock.circleList.push({
                className: className,
                cx: cx,
                cy: cy,
                r: 4
              })
            }
            // 添加文字
            let block = this.blockList[this.currentBlockIndex]
            let str = block.titleBlockName + '（' + block.score + '分）'
            lastBlock.text = {
              textString: str,
              x: newX + width / 2,
              y: newY + height / 2
            }
            // 添加外部对象框
            lastBlock.foreignObject = {
              x: newX + width - 90,
              y: newY + height + 5,
              width: 90,
              height: 30
            }
            // 移除鼠标移动事件和鼠标松开事件
            svg.onmousemove = null
            svg.onmouseup = null
            this.blockRectList.splice(this.currentPage, 1, pageRectList)
            // 为矩形增加鼠标事件
            // this.addEventRect(this.blockRectList.length - 1)
            // 添加矩形缩放事件
            // this.addEventRectResize(this.blockRectList.length - 1)
          }
        }
      }
    },
    // 操作按钮事件
    async saveBlock (index) {
      // let image = document.querySelector('image')
      // let imageWidth = parseInt(image.getAttribute('width'))
      // let img = new Image()
      // img.src = this.svgImages[this.currentPage]
      // let ratio = this.ratio[this.currentPage]
      let ratio = this.ratio[this.currentPage]
      // img.onload = () => {
      //   ratio = img.width / imageWidth
      // }
      console.log(this.ratio)
      console.log(ratio)
      let block = this.blockRectList[this.currentPage][index]
      let data = [
        {
          id: block.id ? block.id : '',
          titleBlockId: block.titleBlockId,
          examSubjectId: this.examSubjectId,
          abscissa: Math.floor(block.rect.x * ratio),
          ordinate: Math.ceil(block.rect.y * ratio),
          width: Math.ceil(block.rect.width * ratio),
          height: Math.ceil(block.rect.height * ratio),
          zoom: this.currentPage // 第几张图片
        }
      ]
      console.log(data)
      if (block.id) {
        await this.axios.post(API.TOPLIC_UPDATEBATCH, data).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.blockRectList[this.currentPage][index].isActive = false
          this.getBlockRect()
        }).catch(() => { })
      } else {
        await this.axios.post(API.TOPLIC_ADDLIST, data).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.blockRectList[this.currentPage][index].isActive = false
          this.getBlockRect()
        }).catch(() => { })
      }
      this.activeBlock = ''
    },
    deleteBlock (index) {
      console.log(index, this.blockRectList[this.currentPage])
      this.axios.post(API.TOPLIC_DELETEBYID, { id: this.blockRectList[this.currentPage][index].id }).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.blockRectList[this.currentPage].splice(index, 1)
        this.getBlockRect()
      }).catch(() => { })
    },
    editBlock (index) {
      this.blockRectList[this.currentPage][index].isActive = true
      this.activeBlock = this.blockRectList[this.currentPage][index].titleBlockId
    },
    mousedownBlock (e) {
      e.stopPropagation()
    },
    // 矩形移动
    rectMousedown (e) {
      e.stopPropagation()
      let rectDom = e.target
      let index = rectDom.attributes.index.value * 1
      let pageRectList = this.blockRectList[this.currentPage]
      let blockRect = pageRectList[index]
      if (!blockRect.isActive) {
        return
      }
      let { circleList } = blockRect
      let svg = document.querySelector('svg')
      // 获取相关元素移动前的位置坐标与属性
      let oldX = rectDom.attributes.x.value * 1
      let oldY = rectDom.attributes.y.value * 1
      let width = rectDom.attributes.width.value * 1
      let height = rectDom.attributes.height.value * 1
      let ox = blockRect.foreignObject.x
      let oy = blockRect.foreignObject.y
      let str = blockRect.text.textString
      let x = e.offsetX
      let y = e.offsetY
      // 获取圆点移动前的位置坐标
      let circleXYList = []
      circleList.forEach(circle => {
        circleXYList.push({
          cx: circle.cx,
          cy: circle.cy
        })
      })
      e.stopPropagation()
      svg.onmousemove = (em) => {
        // 获取移动距离
        let detaX = em.offsetX - x
        let detaY = em.offsetY - y
        // 修改矩形的坐标
        blockRect.rect = {
          x: oldX + detaX,
          y: oldY + detaY,
          width: width,
          height: height
        }
        // 修改文字坐标
        blockRect.text = {
          textString: str,
          x: oldX + detaX + width / 2,
          y: oldY + detaY + height / 2
        }
        // 修改圆点的坐标
        circleList.forEach((circle, index) => {
          circle.cx = circleXYList[index].cx + detaX
          circle.cy = circleXYList[index].cy + detaY
        })
        // 修改外部对象的坐标
        blockRect.foreignObject = {
          x: ox + detaX,
          y: oy + detaY,
          width: 90,
          height: 30
        }
        pageRectList.splice(index, 1, blockRect)
        this.blockRectList.splice(this.currentPage, 1, pageRectList)
        svg.onmouseup = (eu) => {
          // 移除监听函数
          svg.onmousemove = null
          svg.onmouseup = null
        }
      }
    },
    // 矩形缩放
    circleMouseDown (e) {
      e.stopPropagation()
      let circle = e.target
      let brlIndex = circle.attributes['brl-index'].value * 1
      let pageRectList = this.blockRectList[this.currentPage]
      let blockRect = pageRectList[brlIndex]
      if (!blockRect.isActive) {
        return
      }
      let index = circle.attributes.index.value * 1
      let className = blockRect.circleList[index].className
      let rect = blockRect.rect
      let svg = document.querySelector('svg')
      let oldX = rect.x
      let oldY = rect.y
      let oldWidth = rect.width
      let oldHeight = rect.height
      let x = e.offsetX
      let y = e.offsetY
      switch (className) {
        // 左上和右下
        case 'nw-resize':
          svg.onmousemove = (em) => {
            // 获取移动距离
            let detaX = em.offsetX - x
            let detaY = em.offsetY - y
            // 修改矩形和圆点的坐标
            let newX = oldX + detaX
            let newY = oldY + detaY
            let newWidth = Math.abs(oldWidth - detaX)
            let newHeight = Math.abs(oldHeight - detaY)
            // 左上角圆点
            if (index === 0) {
              if (oldWidth - detaX < 0) {
                newX = oldX + oldWidth
              }
              if (oldHeight - detaY < 0) {
                newY = oldY + oldHeight
              }
            }
            // 右下角圆点
            if (index === 4) {
              newX = oldX
              newY = oldY
              newWidth = Math.abs(oldWidth + detaX)
              newHeight = Math.abs(oldHeight + detaY)
              if (oldWidth + detaX < 0) {
                newX = oldX - newWidth
              }
              if (oldHeight + detaY < 0) {
                newY = oldY - newHeight
              }
            }
            blockRect.rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            blockRect.foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30
            }
            blockRect.text.x = newX + newWidth / 2
            blockRect.text.y = newY + newHeight / 2
            pageRectList.splice(brlIndex, 1, blockRect)
            // console.log(pageRectList)
            this.blockRectList.splice(this.currentPage, 1, pageRectList)
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              svg.onmousemove = null
              svg.onmouseup = null
            }
          }
          break
        // 上和下
        case 's-resize':
          svg.onmousemove = (em) => {
            // 获取移动距离
            let detaY = em.offsetY - y
            // 修改矩形和圆点的坐标
            let newX = oldX
            let newY = oldY + detaY
            let newWidth = oldWidth
            let newHeight = Math.abs(oldHeight - detaY)
            // 上圆点
            if (index === 1) {
              if (oldHeight - detaY < 0) {
                newY = oldY + oldHeight
              }
            }
            // 下圆点
            if (index === 5) {
              newY = oldY
              newHeight = Math.abs(oldHeight + detaY)
              if (oldHeight + detaY < 0) {
                newY = oldY - newHeight
              }
            }
            blockRect.rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            blockRect.foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30
            }
            blockRect.text.x = newX + newWidth / 2
            blockRect.text.y = newY + newHeight / 2
            pageRectList.splice(index, 1, blockRect)
            this.blockRectList.splice(this.currentPage, 1, pageRectList)
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              svg.onmousemove = null
              svg.onmouseup = null
            }
          }
          break
        case 'ne-resize':
          svg.onmousemove = (em) => {
            // 获取移动距离
            let detaX = em.offsetX - x
            let detaY = em.offsetY - y
            // 修改矩形和圆点的坐标
            let newX = oldX
            let newY = oldY + detaY
            let newWidth = Math.abs(oldWidth + detaX)
            let newHeight = Math.abs(oldHeight - detaY)
            // 右上角圆点
            if (index === 2) {
              if (oldWidth + detaX < 0) {
                newX = oldX - newWidth
              }
              if (oldHeight - detaY < 0) {
                newY = oldY + oldHeight
              }
            }
            // 左下角圆点
            if (index === 6) {
              newX = oldX + detaX
              newY = oldY
              newWidth = Math.abs(oldWidth - detaX)
              newHeight = Math.abs(oldHeight + detaY)
              if (oldWidth - detaX < 0) {
                newX = oldX + oldWidth
              }
              if (oldHeight + detaY < 0) {
                newY = oldY - newHeight
              }
            }
            blockRect.rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            blockRect.foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30
            }
            blockRect.text.x = newX + newWidth / 2
            blockRect.text.y = newY + newHeight / 2
            pageRectList.splice(index, 1, blockRect)
            this.blockRectList.splice(this.currentPage, 1, pageRectList)
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              svg.onmousemove = null
              svg.onmouseup = null
            }
          }
          break
        case 'e-resize':
          svg.onmousemove = (em) => {
            // 获取移动距离
            let detaX = em.offsetX - x
            // 修改矩形和圆点的坐标
            let newX = oldX
            let newY = oldY
            let newWidth = Math.abs(oldWidth + detaX)
            let newHeight = oldHeight
            // 右圆点
            if (index === 3) {
              if (oldWidth + detaX < 0) {
                newX = oldX - newWidth
              }
            }
            // 左圆点
            if (index === 7) {
              newX = oldX + detaX
              newWidth = Math.abs(oldWidth - detaX)
              if (oldWidth - detaX < 0) {
                newX = oldX + oldWidth
              }
            }
            blockRect.rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            blockRect.foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30
            }
            blockRect.text.x = newX + newWidth / 2
            blockRect.text.y = newY + newHeight / 2
            pageRectList.splice(index, 1, blockRect)
            this.blockRectList.splice(this.currentPage, 1, pageRectList)
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              svg.onmousemove = null
              svg.onmouseup = null
            }
          }
          break
      }
    },
    // 矩形圆点位置计算
    setCirclePosition (index, x, y, w, h) {
      let circleList = this.blockRectList[this.currentPage][index].circleList
      for (let i = 0; i < circleList.length; i++) {
        let cx = x
        let cy = y
        if (i < 3) {
          cx += w / 2 * i
          cy += 0
        }
        if (i >= 3 && i < 5) {
          cx += w
          cy += h / 2 * (i - 3 + 1)
        }
        if (i >= 5 && i < 7) {
          cx += w / 2 * (7 - i - 1)
          cy += h
        }
        if (i >= 7) {
          cx += 0
          cy += h / 2
        }
        circleList[i] = {
          className: circleList[i].className,
          cx: cx,
          cy: cy,
          r: 4
        }
      }
    },
    getCirclePosition (x, y, w, h) {
      let list = []
      for (let i = 0; i < 8; i++) {
        let cx = x
        let cy = y
        if (i < 3) {
          cx += w / 2 * i
          cy += 0
        }
        if (i >= 3 && i < 5) {
          cx += w
          cy += h / 2 * (i - 3 + 1)
        }
        if (i >= 5 && i < 7) {
          cx += w / 2 * (7 - i - 1)
          cy += h
        }
        if (i >= 7) {
          cx += 0
          cy += h / 2
        }
        let className = ''
        if ([0, 4].includes(i)) {
          className = 'nw-resize'
        } else if ([1, 5].includes(i)) {
          className = 's-resize'
        } else if ([2, 6].includes(i)) {
          className = 'ne-resize'
        } else if ([3, 7].includes(i)) {
          className = 'e-resize'
        }
        list[i] = {
          className: className,
          cx: cx,
          cy: cy,
          r: 4
        }
      }
      return list
    }
  }
}
</script>
<style lang="scss">
#block-style {
  .el-main {
    padding: 0;
    .main-header {
      width: 100%;
      height: 40px;
      display: inline-block;
      padding: 0 16px;
      line-height: 40px;
      background-color: #fff;
      font-size: 16px;
      overflow: hidden;
      .page {
        display: flex;
        align-items: center;
        padding: 0;
        .el-pager {
          li {
            vertical-align: middle;
          }
        }
      }
      .zoom {
        text-align: right;
        i {
          cursor: pointer;
          font-size: 20px;
          margin: 0 10px;
        }
      }
    }
    .main-svg {
      overflow: scroll;
      text-align: center;
      cursor: not-allowed;
      svg {
        cursor: default;
        g {
          rect {
            fill-opacity: 0;
            stroke: #0c0;
            stroke-width: 2px;
          }
          .nw-resize {
            cursor: nw-resize;
          }
          .s-resize {
            cursor: s-resize;
          }
          .ne-resize {
            cursor: ne-resize;
          }
          .e-resize {
            cursor: e-resize;
          }
          .text-center {
            fill: #0c0;
            text-anchor: middle;
            text-align: center;
            vertical-align: middle;
            font-weight: bolder;
            dominant-baseline: middle; /* 文本垂直居中 */
          }
          foreignObject {
            span {
              cursor: pointer;
              color: #fff;
              background-color: #474d55;
              float: right;
              font-size: 14px;
              padding: 4px 8px;
            }
            .save-button {
              color: #69c170;
            }
            .delete-button {
              color: #ee6b52;
            }
          }
        }
        .is-active {
          rect {
            fill: #1ab5f7;
            stroke: #1ab5f7;
          }
          circle {
            fill: #1ab5f7;
          }
          .text-center {
            fill: #1ab5f7;
          }
        }
      }
    }
  }
  .el-aside {
    background-color: #fff;
    .el-collapse {
      .el-collapse-item {
        .el-collapse-item__header {
          color: #999;
          padding: 0 10px;
          font-size: 16px;
          font-weight: 700;
          line-height: 45px;
          height: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i.el-collapse-item__arrow {
          display: none;
        }
        .el-collapse-item__content {
          padding: 0 0 5px 40px;
        }
      }
      .is-active {
        .el-collapse-item__header {
          color: #409eff;
        }
        .el-collapse-item__content {
          color: #409eff;
        }
      }
      .has-cut {
        .el-collapse-item__header {
          color: #67c23a;
          i.el-icon-success {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
