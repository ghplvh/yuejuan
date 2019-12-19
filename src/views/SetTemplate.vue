<template>
  <div id="set-template" element-loading-text="加载图片中" v-loading="loading">
    <el-container>
      <el-header height="50px">
        <el-row class="title" type="flex" align="center">
          <el-col :span="2">好易学</el-col>
          <el-col :span="2" :offset="9">创建模板</el-col>
          <el-col :span="3" :offset="8" class="operation-video">
            <router-link to="" target="_blank"><i class="el-icon-caret-right"></i><span>操作视频</span></router-link>
          </el-col>
        </el-row>
      </el-header>
      <el-tabs v-model="activeTab" @tab-click="tabsClick">
        <el-tab-pane label="1.模板信息" name="templateInfo">
          <div class="template-info">
            <el-row class="template-info-select">
              <el-col :span="16" :offset="6">
                <span class="select-text">请选择你要查看的模板：</span>
                <el-select class="select-template" value-key="id" v-model="currentTemplate" @change="changeTemplate">
                  <el-option v-for="temp in examTemplateInfo" :key="temp.id" :label="temp.tempName" :value="temp"></el-option>
                </el-select>
                <el-button type="primary" class="add-template" @click="showAddTemplate()">新增模版</el-button>
                <el-button type="primary" class="add-template" @click="scanAddTemplate()">扫描上传</el-button>
                <el-button type="primary" class="add-template" @click="scanAddShi()">扫描试卷</el-button>
                <el-button type="danger" class="add-template" @click="deleteTemplate()" :loading="buttonLoading">删除当前模板</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" :offset="6">
                <el-col :span="8">
                  <span>试卷页数：</span>
                  <span class="big-black">{{currentTemplate.testPage || 0}}页</span>
                </el-col>
                <el-col :span="8">
                  <span>考号：</span>
                  <span class="big-black">{{getTestnumberType(currentTemplate.testnumberType)}}</span>
                </el-col>
                <el-col :span="8">
                  <span>客观题：</span>
                  <span class="big-black">{{currentTemplate.objective || 0}}道</span>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="available-row">
              <el-col :span="16" :offset="6">
                <el-row>
                  <div class="pic-list-name">有效页:
                    <span class="big-black" v-if="svgImages.length === 0">暂无</span></div>
                  <div class="sm-pic-div" v-for="image in svgImages" :key="image" @click="previewImage(image)">
                    <img :src="image" alt="">
                  </div>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" :offset="6" style="color:#999;">
                <el-row>提示：</el-row>
                <el-row>1.多模板仅针对于考号识别和客观题识别，主观题的题块划分只对主模板有效。</el-row>
                <el-row>2.当前已创建<font color="red">1</font>个</el-row>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="2.图片水平定位" name="horPosition">
          <el-row>
            <el-col :span="20">
              <el-row type="flex" align="middle" justify="space-between" class="main-header opration">
                <el-col :span="18" :offset="1">
                  操作提示： 请对照网格调整图片，完成后点击保存将跳到下一页；若模板包含多张图片，请注意每页都需要进行水平定位。
                </el-col>
                <el-col :span="6" class="zoom">
                  <el-row type="flex" align="middle" justify="space-between">
                    <el-col :span="6" class="btn-box">
                      <el-button type="primary" size="mini" @click="changeDeg(-0.2)">左旋1°</el-button>
                    </el-col>
                    <el-col :span="6" class="btn-box">
                      <el-button type="primary" size="mini" @click="changeDeg(0.2)">右旋1°</el-button>
                    </el-col>
                    <!-- <el-col :span="3" class="icon-box"><i class="iconfont icon-unie039" @click="setScale(-0.05)"></i></el-col>
                    <el-col :span="3" class="icon-box"><i class="iconfont icon-fangda" @click="setScale(0.05)"></i></el-col> -->
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="paper-img">
                <div class="mask" :style="{width: getSvgWidth()+'px', height: getSvgHeight()+'px'}">
                  <div class="horizon-line" v-for="i in Math.floor(getSvgHeight()/30)" :key="i"></div>
                </div>
                <div class="mask" :style="{width: getSvgWidth()+'px', height: getSvgHeight()+'px'}">
                  <div class="vertical-line" v-for="i in Math.floor(getSvgWidth()/30)" :key="i"></div>
                </div>
                <div class="main-svg" :style="mainSvgHeight" ref="horPosition">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="getSvgWidth()" :height="getSvgHeight()" :viewBox="getSvgViewBox()">
                    <image :width="getSvgWidth()" :height="getSvgHeight()" :xlink:href="svgImages[currentPaper]" :transform="imageTransform"></image>
                  </svg>
                </div>
              </el-row>
            </el-col>
            <el-col :span="4">
              <div class="thumbnail-view">
                <div v-for="(img,index) in svgImages" :class="index === currentPaper ? 'img-wrapper selected' : 'img-wrapper'" :key="img">
                  <img :src="img" alt="" @click="selectPaper(index)">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="3.选择定位区" name="positionArea">
          <el-row>
            <el-col :span="20">
              <el-row type="flex" align="middle" justify="space-between" class="main-header opration">
                <el-col :span="18" :offset="1">
                  操作提示： 请框选试卷的一行文字作为文字定位区，完成后点击保存将跳到下一页；若模版包含多张图片，请注意每页都需要框选定位区。
                  <el-button type="text" size="small">查看框选示例</el-button>
                </el-col>
                <el-col :span="6" class="zoom">
                  <el-row type="flex" align="middle" justify="space-between">
                    <el-col :span="6" class="btn-box">
                    </el-col>
                    <el-col :span="6" class="btn-box">
                    </el-col>
                    <!-- <el-col :span="3" class="icon-box"><i class="iconfont icon-unie039" @click="setScale(-0.05)"></i></el-col>
                    <el-col :span="3" class="icon-box"><i class="iconfont icon-fangda" @click="setScale(0.05)"></i></el-col> -->
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="paper-img">
                <div class="main-svg" :style="mainSvgHeight" ref="positionArea">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="getSvgWidth()" :height="getSvgHeight()" :viewBox="getSvgViewBox()">
                    <image :width="getSvgWidth()" :xlink:href="svgImages[currentPaper]" :transform="imageTransform"></image>
                    <template v-for="(block,brlIndex) in blockRectList">
                      <g :key="brlIndex" v-if="block.page === currentPaper" :class="block.isActive ? 'is-active' : ''">
                        <rect class="cut-rect" :x="block.rect.x" :y="block.rect.y" :width="block.rect.width" :height="block.rect.height" :index="brlIndex" @mousedown="rectMousedown"></rect>
                        <template v-if="block.isActive">
                          <circle v-for="(circle,cIndex) in block.circleList" :key="cIndex" :class="'point ' + circle.className" :brl-index="brlIndex" :index="cIndex" :cx="circle.cx" :cy="circle.cy" :r="circle.r" :fill="circle.fill" @mousedown="circleMouseDown"></circle>
                        </template>
                        <foreignObject v-if="block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height" :style="{display: block.foreignObject.display}">
                          <span class="save-button" @click="saveBlock(brlIndex)" @mousedown="mousedownBlock">保存</span>
                          <span class="delete-button" @click="deleteBlock(brlIndex)" @mousedown="mousedownBlock">删除</span>
                        </foreignObject>
                        <foreignObject v-if="!block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height">
                          <span class="edit-button" @click="editBlock(brlIndex)" @mousedown="mousedownBlock">编辑</span>
                        </foreignObject>
                      </g>
                    </template>
                  </svg>
                </div>
              </el-row>
            </el-col>
            <el-col :span="4">
              <div class="thumbnail-view">
                <div v-for="(img,index) in svgImages" :class="index === currentPaper ? 'img-wrapper selected' : 'img-wrapper'" :key="img">
                  <img :src="img" alt="" @click="selectPaper(index)">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="4.选择考号区" name="positionExamCode">
          <el-row>
            <el-col :span="20">
              <el-row type="flex" align="middle" justify="space-between" class="main-header opration">
                <el-col :span="18" :offset="1">
                  操作提示： 请框选试卷上的考号区，完成后点击保存将跳到下一页。
                </el-col>
                <el-col :span="6" class="zoom">
                  <el-row type="flex" align="middle" justify="space-between">
                    <el-col :span="6" class="btn-box">
                    </el-col>
                    <el-col :span="6" class="btn-box">
                    </el-col>
                    <!-- <el-col :span="3" class="icon-box"><i class="iconfont icon-unie039" @click="setScale(-0.05)"></i></el-col>
                    <el-col :span="3" class="icon-box"><i class="iconfont icon-fangda" @click="setScale(0.05)"></i></el-col> -->
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="paper-img">
                <div class="main-svg" :style="mainSvgHeight" ref="positionExamCode">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="getSvgWidth()" :height="getSvgHeight()" :viewBox="getSvgViewBox()">
                    <image :width="getSvgWidth()" :xlink:href="svgImages[currentPaper]" :transform="imageTransform"></image>
                    <template v-for="(block,brlIndex) in blockRectList">
                      <g :key="brlIndex" v-if="block.page === currentPaper" :class="block.isActive ? 'is-active' : ''">
                        <rect class="cut-rect" :x="block.rect.x" :y="block.rect.y" :width="block.rect.width" :height="block.rect.height" :index="brlIndex" @mousedown="rectMousedown"></rect>
                        <template v-if="block.isActive">
                          <circle v-for="(circle,cIndex) in block.circleList" :key="cIndex" :class="'point ' + circle.className" :brl-index="brlIndex" :index="cIndex" :cx="circle.cx" :cy="circle.cy" :r="circle.r" :fill="circle.fill" @mousedown="circleMouseDown"></circle>
                        </template>
                        <foreignObject v-if="block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height" :style="{display: block.foreignObject.display}">
                          <span class="save-button" @click="saveBlock(brlIndex)" @mousedown="mousedownBlock">保存</span>
                          <span class="delete-button" @click="deleteBlock(brlIndex)" @mousedown="mousedownBlock">删除</span>
                        </foreignObject>
                        <foreignObject v-if="!block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height">
                          <span class="edit-button" @click="editBlock(brlIndex)" @mousedown="mousedownBlock">编辑</span>
                        </foreignObject>
                      </g>
                    </template>
                  </svg>
                </div>
              </el-row>
            </el-col>
            <el-col :span="4">
              <div class="thumbnail-view">
                <div v-for="(img,index) in svgImages" :class="index === currentPaper ? 'img-wrapper selected' : 'img-wrapper'" :key="img">
                  <img :src="img" alt="" @click="selectPaper(index)">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="5.选择客观题区" name="positionObjective">
          <el-row>
            <el-col :span="20">
              <el-row type="flex" align="middle" justify="space-between" class="main-header opration">
                <el-col :span="12" :offset="1">
                  操作提示： 请框选试卷上客观题区，完成后点击保存将跳到下一页；若多张试卷上有客观题区，请注意都需要框选。
                </el-col>
                <el-col :span="6" class="zoom">
                  <el-row type="flex" align="middle" justify="start">
                    <el-col :span="10" class="btn-box">
                      <el-button type="primary" :loading="editBlockTitleForm.isLoading"
                      @click="saveBlock">同步题号</el-button>
                    </el-col>
                    <el-col :span="3" class="btn-box" >
                      <el-checkbox v-model="editBlockTitleForm.isAutoSave">
                        自动同步
                      </el-checkbox>
                    </el-col>
                    <!-- <el-col :span="3" class="icon-box"><i class="iconfont icon-unie039" @click="setScale(-0.05)"></i></el-col>
                    <el-col :span="3" class="icon-box"><i class="iconfont icon-fangda" @click="setScale(0.05)"></i></el-col> -->
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="paper-img">
                <div class="main-svg" :style="mainSvgHeight" ref="positionObjective">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="getSvgWidth()" :height="getSvgHeight()" :viewBox="getSvgViewBox()">
                    <image :width="getSvgWidth()" :height="getSvgHeight()" :xlink:href="svgImages[currentPaper]" :transform="imageTransform"></image>
                    <template v-for="(block,brlIndex) in blockRectList">
                      <g :key="brlIndex" v-if="block.page === currentPaper" :class="block.isActive ? 'is-active' : ''">
                        <rect class="cut-rect" :x="block.rect.x" :y="block.rect.y" :width="block.rect.width" :height="block.rect.height" :index="brlIndex" @mousedown="rectMousedown"></rect>
                        <template v-if="block.isActive">
                          <circle v-for="(circle,cIndex) in block.circleList" :key="cIndex" :class="'point ' + circle.className" :brl-index="brlIndex" :index="cIndex" :cx="circle.cx" :cy="circle.cy" :r="circle.r" :fill="circle.fill" @mousedown="circleMouseDown"></circle>
                        </template>
                        <!-- <foreignObject v-if="block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height" :style="{display: block.foreignObject.display}">
                          <span class="save-button" @click="saveBlock(brlIndex)" @mousedown="mousedownBlock">保存</span>
                          <span class="delete-button" @click="deleteBlock(brlIndex)" @mousedown="mousedownBlock">删除</span>
                        </foreignObject>
                        <foreignObject v-if="!block.isActive" :x="block.foreignObject.x" :y="block.foreignObject.y" :width="block.foreignObject.width" :height="block.foreignObject.height">
                          <span class="edit-button" @click="editBlock(brlIndex)" @mousedown="mousedownBlock">编辑</span>
                        </foreignObject> -->
                      </g>
                    </template>
                    <template v-if="currentPaper === 0">
                      <!-- `block -->
                      <template v-for="(block,brlIndex) in littleBlockRectList">
                        <g :key="brlIndex" :index="brlIndex">
                          <!-- <text :x="block.text.x" :y="block.text.y" class="text-center" style="font-size:11px;">{{brlIndex}}</text> -->
                          <template v-for="(item, index) in block">
                            <text
                              @click = editBlolckTitle(item[5],item[4])
                              v-if="index === 0"
                              :key="index"
                              :x="(parseInt(item[0] / ratio[0]) + parseInt(item[2] / ratio[0]) / 2).toFixed(0)"
                              :y="parseInt(parseInt(item[1] / ratio[0]) -5 )"
                              class="text-center"
                              style="font-size:16px;">{{item[4]||"#"}}</text>
                            <rect
                              v-if="index > 0"
                              class="cut-rect"
                              :x="parseInt(item[0] / ratio[0])"
                              :y="parseInt(item[1] / ratio[0])"
                              :width="parseInt(item[2] / ratio[0])"
                              :height="parseInt(item[3] / ratio[0])" :index="index" :key="index"></rect>
                          </template>
                        </g>
                      </template>
                    </template>
                  </svg>
                </div>
              </el-row>
              <!-- <el-row class="paper-img">
                <div class="main-svg" :style="mainSvgHeight" ref="positionObjective">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="getSvgWidth()" :height="getSvgHeight()" :viewBox="getSvgViewBox()">
                    <image :width="getSvgWidth()" :height="getSvgHeight()" :xlink:href="svgImages[currentPaper]" :transform="imageTransform"></image>

                  </svg>
                </div>
              </el-row> -->
            </el-col>
            <el-col :span="4">
              <div class="thumbnail-view">
                <div v-for="(img,index) in svgImages" :class="index === currentPaper ? 'img-wrapper selected' : 'img-wrapper'" :key="img">
                  <img :src="img" alt="" @click="selectPaper(index)">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-container>
    <el-dialog title="查看模板" :visible.sync="previewVisible" width="60%" custom-class="preview-dialog">
      <div class="img-box">
        <img :src="prevImg" alt="模板">
      </div>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="previewVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增模板" :visible.sync="addTemplateVisible" width="500px" custom-class="add-template-dialog">
      <el-form :model="addTemplateForm" status-icon :rules="addTemplateFormRules" ref="addTemplateForm" size="medium" label-width="100px">
        <el-form-item label="模板名称" prop="tempName">
          <el-input v-model.number="addTemplateForm.tempName" :disabled="examTemplateInfo.length === 0"></el-input>
        </el-form-item>
        <el-form-item label="考号形式" prop="testnumberType">
          <el-select v-model="addTemplateForm.testnumberType">
            <el-option v-for="type in testnumberTypes" :key="type.id" :label="type.name" :value="type.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客观题数" prop="objective">
          <el-input v-model.number="addTemplateForm.objective"></el-input>
        </el-form-item>
        <el-form-item label="答题卡页数" prop="testPage">
          <el-input v-model.number="addTemplateForm.testPage" disabled></el-input>
        </el-form-item>
        <el-form-item label="答题卡图片" prop="imgUrl">
          <el-upload class="answer-card-upload" :limit="answerCardLimit" :data="answerCardData" :action="uploadUrl" list-type="picture-card" accept="image/*" :on-preview="pictureCardPreview" :before-upload="answerCardBeforeUpload" :on-remove="answerCardRemove" :on-success="answerCardSuccess" :on-exceed="answerCardExceed">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="addTemplate('addTemplateForm')" :loading="buttonLoading">确定</el-button>
        <el-button size="medium" @click="addTemplateVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- `edit -->
     <el-dialog title="修改题号" :visible.sync="editBlockTitleForm.isVisible" width="500px" custom-class="add-template-dialog">
      <el-form :model="editBlockTitleForm" status-icon :rules="editBlockTitleForm" ref="editBlockTitleForm" size="medium" label-width="100px">
        <el-form-item label="当前题号" prop="key">
          <el-input v-model="editBlockTitleForm.key"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="saveBlolckTitle" :loading="editBlockTitleForm.isLoading">确定</el-button>
        <el-button size="medium" @click="editBlockTitleForm.isVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/api.js'
import Utils from '../utils/Utils.js'
import { mapState } from 'vuex'
export default {
  data () {
    let checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('客观题数不能为0'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 500)
    }
    let checkTestpage = (rule, value, callback) => {
      if (value === 0 || value === '') {
        return callback(new Error('请上传至少一张答题卡图片'))
      } else {
        callback()
      }
    }
    let checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入模板名称'))
      } else {
        if (this.examTemplateInfo.length > 0) {
          let temp = this.examTemplateInfo.find(item => {
            return item.tempName === value
          })
          if (temp) {
            callback(new Error('模板名称重复'))
          }
        }
        callback()
      }
    }
    return {
      schoolCode: '',
      examId: this.$route.params.examId,
      examSubjectId: this.$route.params.examSubjectId,
      loading: false,
      previewVisible: false,
      prevImg: '',
      activeTab: 'templateInfo',
      ratio: [], // 显示宽度和实际宽度的比例
      ratioWH: 1, // A3纸高/宽
      svgWidth: 0,
      scaleSvg: 1,
      rotateDeg: 0,
      blockRectList: [],
      littleBlockRectList: [],
      currentBlockIndex: 0,
      svgImages: [],
      currentPaper: 0,
      currentClickDom: '',
      currentSVGRef: 'templateInfo',
      examTemplateInfo: [],
      currentTemplate: {},
      uploadUrl: API.UPLOAD_UPLOADIMG,
      buttonLoading: false,
      addTemplateVisible: false,
      scanData: '',
      qrlocation: {},
      qalocation: {},
      cnlocation: {},
      testnumberTypes: [
        { id: 0, name: '条形码' },
        { id: 1, name: '填涂1位' },
        { id: 2, name: '填涂2位' },
        { id: 3, name: '填涂3位' },
        { id: 4, name: '填涂4位' },
        { id: 5, name: '填涂5位' },
        { id: 6, name: '填涂6位' },
        { id: 7, name: '填涂7位' },
        { id: 8, name: '填涂8位' },
        { id: 9, name: '填涂9位' },
        { id: 10, name: '填涂10位' },
        { id: 11, name: '填涂11位' },
        { id: 12, name: '填涂12位' },
        { id: 13, name: '填涂13位' },
        { id: 14, name: '填涂14位' },
        { id: 15, name: '填涂15位' },
        { id: 16, name: '填涂16位' }
      ],
      answerCardLimit: 4,
      answerCardList: [],
      answerCardData: {
        filedir: ''
      },
      addTemplateForm: {
        examId: this.$route.params.examId,
        examSubjectId: this.$route.params.examSubjectId,
        tempName: '',
        testnumberType: '',
        objective: 0,
        testPage: 0,
        imgUrl: ''
      },
      addTemplateFormRules: {
        tempName: [
          { required: true, validator: checkName, trigger: ['blur', 'change'] }
        ],
        testnumberType: [
          { required: true, message: '请选择考号形式', trigger: ['blur', 'change'] }
        ],
        objective: [
          { required: true, validator: checkNumber, trigger: ['blur', 'change'] }
        ],
        testPage: [
          { required: true, validator: checkTestpage, trigger: ['blur', 'change'] }
        ],
        imgUrl: [
          { required: true, message: '请上传答题卡图片', trigger: ['blur', 'change'] }
        ]
      },
      //  `editForm
      editBlockTitleForm: {
        isVisible: false,
        isLoading: false,
        isAutoSave: true,
        id: -1,
        key: ''
      },
      locationCoord: [],
      numberCoord: [],
      objectiveCoord: [],
      optionalTopicTopic: [],
      tempList: [],
      examSubjectList: [],
      examSubjectInfo: {}
    }
  },
  computed: {
    ...mapState(['adminInfo']),
    mainSvgHeight () {
      return { height: (window.innerHeight - 145) + 'px' }
    },
    imageTransform () {
      return 'rotate(' + [this.rotateDeg].join(',') + ')'
    }
  },
  created () {
    this.schoolCode = this.adminInfo.teacherInfo.schoolCode
    this.getExamSubject()
  },
  mounted () {
    this.$nextTick(() => {
      this.getRatio()
    })
  },
  updated () {
  },
  methods: {
    // 查询所有考试科目
    async getExamSubject () {
      this.loading = true
      await this.axios.post(API.EXAM_EXAMSUBJECT, { examId: this.examId }).then(res => {
        this.examSubjectList = res.data.data
        this.examSubjectInfo = this.examSubjectList.filter(item => {
          // console.log(item.id === this.examSubjectId)
          if (Number(item.id) === Number(this.examSubjectId)) {
            // console.log(item)
            return item
          }
        })[0]
        // console.log(this.examSubjectInfo)
      }).catch(() => { this.loading = false })
    },
    // 获取图片宽高比
    getRatio (refresh = true) {
      if (this.currentSVGRef !== 'templateInfo') {
        this.$nextTick(() => {
          this.svgWidth = this.$refs[this.currentSVGRef].clientWidth
          let image = document.querySelector('image')
          let imageWidth = parseInt(image.getAttribute('width'))
          let img = new Image()
          img.src = this.svgImages[this.currentPaper]
          img.onload = () => {
            this.ratioWH = img.height / img.width
          }
          this.svgImages.forEach((src, index) => {
            let srcImg = new Image()
            srcImg.src = src
            srcImg.onload = () => {
              // this.ratioWH = srcImg.height / srcImg.width
              let ratio = srcImg.width / (imageWidth === 0 ? this.svgWidth : imageWidth)
              this.ratio.splice(index, 1, ratio)
              // console.log(this.ratio, 'ratio')
              if (index === this.svgImages.length - 1) {
                this.addEvent()
              }
            }
          })
        })
      }
      if (refresh) {
        this.getExamTemplate()
      }
    },
    // 查询模板
    getExamTemplate () {
      this.loading = true
      let data = {
        examId: this.examId,
        examSubjectId: this.examSubjectId
      }
      this.axios.post(API.EXAMTEMPLATE_FINDBYANSWER, data).then(res => {
        let list = res.data.data
        console.log('getExamTemplate,res', res)
        this.examTemplateInfo = list.map(item => {
          item.imgUrl = item.imgUrl.split(',')
          item.locationCoord = Utils.isJsonString(item.locationCoord) ? this.convertData(JSON.parse(item.locationCoord), false) : []
          item.numberCoord = Utils.isJsonString(item.numberCoord) ? this.convertData(JSON.parse(item.numberCoord), false) : []
          item.optionalTopicTopic = Utils.isJsonString(item.optionalTopicTopic) ? this.convertData(JSON.parse(item.optionalTopicTopic), false) : []
          return item
        })
        // console.log(this.examTemplateInfo)
        // this.examTemplateInfo = list
        this.currentTemplate = list[0]
        this.littleBlockRectList = JSON.parse(list[0].objectiveCoord || '')
        console.log('currentTemplate', this.currentTemplate)
        this.changeTemplate()

        this.tempList = this.getCurrentRectList()
        this.blockRectList = this.getCurrentRectList()
        // this.littleBlock()
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 模板切换
    changeTemplate () {
      this.svgImages = this.currentTemplate.imgUrl
      this.locationCoord = this.currentTemplate.locationCoord
      this.numberCoord = this.currentTemplate.numberCoord
      this.objectiveCoord = this.currentTemplate.objectiveCoord
      this.optionalTopicTopic = this.currentTemplate.optionalTopicTopic
    },
    // 获取考号形式
    getTestnumberType (id) {
      let type = this.testnumberTypes.find(item => {
        return item.id === id
      })
      return type ? type.name : '暂未设置'
    },
    // 图片预览
    previewImage (img) {
      this.prevImg = img
      this.previewVisible = true
    },
    pictureCardPreview (file) {
      this.prevImg = file.url
      this.previewVisible = true
    },
    // 显示新增模板弹窗
    showAddTemplate () {
      this.addTemplateForm = {
        examId: this.$route.params.examId,
        examSubjectId: this.$route.params.examSubjectId,
        tempName: this.examTemplateInfo.length === 0 ? '主模板' : '',
        testnumberType: '',
        objective: 0,
        testPage: 0,
        imgUrl: ''
      }
      this.addTemplateVisible = true
    },
    // 答题卡上传
    // 上传前
    answerCardBeforeUpload (file) {
      this.answerCardData.filedir = 'model/'
    },
    // 上传成功
    answerCardSuccess (response, file, fileList) {
      let list = []
      fileList.forEach(item => {
        list.push(item.response.data.data)
      })
      this.answerCardList = list
      this.addTemplateForm.testPage = list.length
      this.addTemplateForm.imgUrl = list.join(',')
    },
    // 删除图片
    answerCardRemove (file, fileList) {
      let list = []
      fileList.forEach(item => {
        list.push(item.response.data)
      })
      this.answerCardList = list
      this.addTemplateForm.testPage = list.length
      this.addTemplateForm.imgUrl = list.join(',')
    },
    // 超过限制
    answerCardExceed (file, fileList) {
      this.$message({
        message: '上传数量超过限制',
        type: 'warning'
      })
    },
    // 新增模板
    addTemplate (formName) {
      this.buttonLoading = true
      this.addTemplateForm.userId = this.adminInfo.id
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.addTemplateForm)
          this.axios.post(API.EXAMTEMPLATE_ADDEXAMTEMPLATE, this.addTemplateForm).then(res => {
            this.$message({
              message: '新增模板成功',
              type: 'success'
            })
            this.addTemplateVisible = false
            this.buttonLoading = false
            this.getExamTemplate()
          }).catch(() => { this.buttonLoading = false })
        } else {
          this.buttonLoading = false
          return false
        }
      })
    },
    // 扫描上传模板 `scan
    scanAddTemplate () {
      let param = {
        subjectId: this.examSubjectId,
        examId: this.examId
      }
      this.axios({
        // url: '/api/test',
        url: 'http://127.0.0.1:8082',
        method: 'post',
        // headers: {'Access-Control-Allow-Origin': '*'},
        data: param
      }).then(res => {
        console.log('scanAddTemplate,res', res)
        let a = res.data.questionsloc.replace(/↵/g, '\n')
        console.log('a,', JSON.parse(a))
        // 处理格式
        let arr = Object.entries(JSON.parse(a)).map((item, index) => {
          let res = Object.entries(item[1]).map(item2 => {
            return item2[1]
          })
          // 题号坐标。。。。。。。。。。。。。
          let gg = [...res[0]]
          gg[0] = gg[0] - 60
          gg.push(item[0])
          gg.push(index)
          res.unshift(gg)
          return res
        })
        this.svgImages = []
        this.svgImages.push(res.data.filelocation.file0)
        this.svgImages.push(res.data.filelocation.file1)
        this.getRatio()
        this.littleBlockRectList = arr
        this.scanData = res.data.questionsloc // 客观题
        this.cnlocation = res.data.cnlocation // cnlocation
        this.qalocation = res.data.qalocation
        this.qrlocation = res.data.qrlocation
        // 注释扔这里， 确认无用则 删除fasfasfsaddddddddddddddddddddddddddddddddddd
        let fasfasfsaddddddddddddddddddddddddddddddddddd = {
          g: 1
          // const resArr = arr.map(item => {
          //   const entries = Object.entries(item)
          //   let res = {}
          //   res[entries[0]] = entries[1].unshift(entries[1][0] - 60)
          //   return res
          // })
          // console.log('resArr', resArr)
          // console.log(Object.keys(a))
          // const arr = Object.keys(a).map(key => a[key])
          // let entries = Object.entries(a)
          // console.log('entries,', entries)
          // console.log('before,arr', arr)
          // let entriesArr = entries.map(item => {
          //   let res = item[1]
          //   console.log('entriesArr,res,', res)
          //   res.key = item[0]
          //   return res
          // })
          // console.log(',entriesArr', entriesArr)

          // console.log('this.ratio', this.ratio)
          // // 插入题号坐标
          // for (let index = 0; index < arr.length; index++) {
          //   let item = arr[index]
          //   // console.log('arr,item', item)
          //   item = Object.values(item)
          //   let newArray = []
          //   newArray = newArray.concat(item[0])
          //   newArray[0] = newArray[0] - 60
          //   item.unshift(newArray)
          //   arr[index] = item
          // }
          // 插入题号坐标
          // for (let index = 0; index < entriesArr.length; index++) {
          //   let item = entriesArr[index]
          //   // console.log('entriesArr,item', item)
          //   item = Object.values(item)
          //   let newArray = []
          //   newArray = newArray.concat(item[0])
          //   newArray[0] = newArray[0] - 60

          //   item.unshift(newArray)
          //   item.key = item[item.length - 1]
          //   item.id = index
          //   item.splice(-1, 1)
          //   entriesArr[index] = item
          // }
          // console.log('after,entriesArr', entriesArr)

        }
        delete fasfasfsaddddddddddddddddddddddddddddddddddd.g
      })
    },
    // `editBlockTitle
    editBlolckTitle (id, key) {
      // console.log('editBlolckTitle,id', id)
      this.editBlockTitleForm.id = id
      this.editBlockTitleForm.key = key
      this.editBlockTitleForm.isVisible = true
    },
    // `saveBlockTitle
    async saveBlolckTitle () {
      this.editBlockTitleForm.isLoading = true
      let { id, key, isAutoSave } = this.editBlockTitleForm
      this.littleBlockRectList.forEach(item => {
        if (item[0][5] === id) {
          item[0][4] = key
        }
      })
      // console.log('this.littleBlockRectList', this.littleBlockRectList)
      this.editBlockTitleForm.isVisible = false
      if (isAutoSave) {
        await this.saveBlock()
      }
      this.editBlockTitleForm.isLoading = false
    },
    // 扫描答题卡
    scanAddShi () {
      let data = {
        'cnlocation': this.cnlocation,
        'qalocation': this.qalocation,
        'qrlocation': this.qrlocation,
        'ids': { 'subjectId': '203', 'examId': '59' },
        'options': { 'questionsloc': this.scanData, 'type': 1 }
      }
      this.axios({
        // url: '/api/test',
        url: 'http://127.0.0.1:8082',
        method: 'post',
        // headers: {'Access-Control-Allow-Origin': '*'},
        data: data
      }).then(res => {
        // console.log(res)
      })
    },
    // 删除当前模板
    deleteTemplate () {
      this.$confirm('确定删除当前模板吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: this.currentTemplate.id
        }
        this.axios.post(API.EXAMTEMPLATE_DELETEANSWER, data).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getExamTemplate()
        }).catch(() => { })
      }).catch(() => {
      })
    },
    // tabs切换
    tabsClick (tab) {
      this.currentSVGRef = tab.name
      this.getRatio()
    },
    // 试卷切换
    selectPaper (index) {
      this.currentPaper = index
      this.getRatio()
    },
    // 旋转
    changeDeg (deg = 0) {
      this.rotateDeg += deg
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
    /**
     * 数据比例换算
     * @param data  需要换算的数据
     * @param isGet true:显示数据换算实际数据; false:实际数据换算显示数据
     */
    convertData (data, isGet = false) {
      // console.log(isGet)
      if (!Array.isArray(data)) {
        return data || []
      }
      let arr = data.slice(0)
      arr = arr.map(item => {
        let ratio = this.ratio[item.page]
        Object.keys(item.rect).forEach(k => {
          item.rect[k] = isGet ? item.rect[k] * ratio : item.rect[k] / ratio
        })
        Object.keys(item.foreignObject).forEach(k => {
          item.foreignObject[k] = isGet ? item.foreignObject[k] * ratio : item.foreignObject[k] / ratio
        })
        item.circleList = item.circleList.map(c => {
          c.cx = isGet ? c.cx * ratio : c.cx / ratio
          c.cy = isGet ? c.cy * ratio : c.cy / ratio
          return c
        })
        item.isActive = false
        return item
      })
      return arr
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
        Object.keys(item.rect).forEach(k => {
          item.rect[k] = item.rect[k] * this.scaleSvg
        })
        Object.keys(item.foreignObject).forEach(k => {
          item.foreignObject[k] = item.foreignObject[k] * this.scaleSvg
        })
        item.circleList = item.circleList.map(c => {
          c.cx = c.cx * this.scaleSvg
          c.cy = c.cy * this.scaleSvg
          return c
        })
        item.isActive = false
        return item
      })
    },
    // 获取当前选框数据
    getCurrentRectList () {
      let data = []
      switch (this.currentSVGRef) {
        case 'positionArea':
          data = this.locationCoord
          break
        case 'positionExamCode':
          data = this.numberCoord
          break
        case 'positionObjective':
          data = this.objectiveCoord
          break
      }
      return data
    },
    // 设置当前选框数据
    setCurrentRectList (data) {
      switch (this.currentSVGRef) {
        case 'positionArea':
          this.locationCoord = data
          break
        case 'positionExamCode':
          this.numberCoord = data
          break
        case 'positionObjective':
          this.objectiveCoord = data
          break
      }
    },
    // 给svg添加鼠标事件，画矩形
    addEvent () {
      if (this.activeTab === 'positionObjective') {
        return false
      }
      if (['templateInfo', 'horPosition'].includes(this.currentSVGRef)) {
        return false
      }
      let svg = this.$refs[this.currentSVGRef]
      // this.blockRectList = this.getCurrentRectList()
      svg.onmousedown = (ed) => {
        console.log(ed)
        // console.log(this.blockRectList)
        let x = ed.offsetX
        let y = ed.offsetY
        // 添加题块和矩形框
        this.blockRectList.push({
          page: this.currentPaper,
          rect: { x: x, y: y, width: 0, height: 0 },
          circleList: [],
          foreignObject: {},
          isActive: true
        })
        // 禁止冒泡
        ed.stopPropagation()
        svg.onmousemove = (em) => {
          let lastBlock = this.blockRectList[this.blockRectList.length - 1]
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
          svg.onmouseup = (eu) => {
            // 移除鼠标移动事件和鼠标松开事件
            svg.onmousemove = null
            svg.onmouseup = null
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
            // 添加外部对象框
            lastBlock.foreignObject = {
              x: newX * 1 + width - 90,
              y: newY * 1 + height + 5,
              width: 90,
              height: 30,
              display: 'block'
            }
            // this.setCurrentRectList(this.blockRectList)
          }
        }
      }
    },
    // 操作按钮事件
    async saveBlock () {
      this.setCurrentRectList(this.blockRectList)
      console.log('id', this.currentTemplate)

      let data = {
        id: this.currentTemplate.id,
        examSubjectId: this.$route.params.examSubjectId,
        locationCoord: JSON.stringify(this.convertData(this.locationCoord, true)),
        numberCoord: JSON.stringify(this.convertData(this.numberCoord, true)),
        objectiveCoord: JSON.stringify(this.littleBlockRectList),
        optionalTopicTopic: JSON.stringify(this.convertData(this.optionalTopicTopic, true))
      }
      console.log('saveBlock,data', data)
      // console.log(this.objectiveCoord)
      // console.log(this.examSubjectInfo.subjectName)
      await this.axios.post(API.EXAMTEMPLATE_UPDATEBYID, data).then(res => {
        this.$message({
          message: '成功',
          type: 'success'
        })
        this.getExamTemplate()
        // console.log(this.blockRectList)
      }).catch(() => { })
    },
    littleBlock () {
      // console.log((this.objectiveCoord)[0].rect)
      let objectiveCoord = (this.objectiveCoord)[0].rect
      objectiveCoord = this.convertData(this.objectiveCoord[0].rect, true)
      objectiveCoord.x = Number(objectiveCoord.x) * this.ratio[0]
      objectiveCoord.y = Number(objectiveCoord.y) * this.ratio[0]
      objectiveCoord.width = Number(objectiveCoord.width) * this.ratio[0]
      objectiveCoord.height = Number(objectiveCoord.height) * this.ratio[0]
      // console.log(objectiveCoord)
      let param = {
        imagePath: `http://127.0.0.1:8082/sm/getImage/${this.examSubjectId}/0/EditableTemplate/000001.png`,
        location: objectiveCoord,
        subjectId: this.examSubjectId
      }
      // console.log(param, 'param')
      this.axios({ url: '/api/sm/getObjectiveQuestionBlocks', method: 'post', data: param }).then(res => {
        if (!res.data) {
          this.$message({
            message: '客观题框选失败，请重新框选！',
            type: 'error'
          })
        } else {
          for (let i = 0; i < res.data.keguanti.length; i++) {
            let itemPos = res.data.keguanti[i].item_pos.split(';')
            itemPos.pop()
            let posArray = itemPos[i].split(',')
            let obj = {
              rect: {
                x: Number(posArray[0]) / this.ratio[0],
                y: Number(posArray[1]) / this.ratio[0],
                width: Number(posArray[2]) / this.ratio[0],
                height: Number(posArray[3]) / this.ratio[0]
              }
            }
            this.$nextTick(() => {
              this.littleBlockRectList.push(obj)
            })
            // console.log(this.littleBlockRectList)
          }
        }
        localStorage.setItem('kuguanti', JSON.stringify(res.data.keguanti))
      })
    },
    deleteBlock (index) {
      this.blockRectList.splice(index, 1)
      // this.setCurrentRectList(this.blockRectList)
      this.saveBlock(index)
    },
    editBlock (index) {
      this.blockRectList[index].isActive = true
      // this.setCurrentRectList(this.blockRectList)
    },
    mousedownBlock (e) {
      e.stopPropagation()
    },
    // 矩形移动
    rectMousedown (e) {
      e.stopPropagation()
      let rectDom = e.target
      // this.blockRectList = this.getCurrentRectList()
      let index = rectDom.attributes.index.value * 1
      if (!this.blockRectList[index].isActive) {
        return
      }
      let { circleList } = this.blockRectList[index]
      let svg = this.$refs[this.currentSVGRef]
      // 获取相关元素移动前的位置坐标与属性
      let oldX = rectDom.attributes.x.value * 1
      let oldY = rectDom.attributes.y.value * 1
      let width = rectDom.attributes.width.value * 1
      let height = rectDom.attributes.height.value * 1
      let ox = this.blockRectList[index].foreignObject.x
      let oy = this.blockRectList[index].foreignObject.y
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
        this.blockRectList[index].rect = {
          x: oldX + detaX,
          y: oldY + detaY,
          width: width,
          height: height
        }
        // 修改圆点的坐标
        circleList.forEach((circle, index) => {
          circle.cx = circleXYList[index].cx + detaX
          circle.cy = circleXYList[index].cy + detaY
        })
        // 修改外部对象的坐标
        this.blockRectList[index].foreignObject = {
          x: ox + detaX,
          y: oy + detaY,
          width: 90,
          height: 30
        }
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
      // this.blockRectList = this.getCurrentRectList()
      let brlIndex = circle.attributes['brl-index'].value * 1
      if (!this.blockRectList[brlIndex].isActive) {
        return
      }
      let index = circle.attributes.index.value * 1
      let className = this.blockRectList[brlIndex].circleList[index].className
      let rect = this.blockRectList[brlIndex].rect
      let svg = this.$refs[this.currentSVGRef]
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
            this.blockRectList[brlIndex].rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            this.blockRectList[brlIndex].foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30,
              display: 'none'
            }
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              this.blockRectList[brlIndex].foreignObject.display = 'block'
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
            this.blockRectList[brlIndex].rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            this.blockRectList[brlIndex].foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30,
              display: 'none'
            }
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              this.blockRectList[brlIndex].foreignObject.display = 'block'
              svg.onmousemove = null
              svg.onmouseup = null
            }
          }
          break
        // 右上和左下
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
            this.blockRectList[brlIndex].rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            this.blockRectList[brlIndex].foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30,
              display: 'none'
            }
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              this.blockRectList[brlIndex].foreignObject.display = 'block'
              svg.onmousemove = null
              svg.onmouseup = null
            }
          }
          break
        // 右和左
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
            this.blockRectList[brlIndex].rect = {
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight
            }
            this.blockRectList[brlIndex].foreignObject = {
              x: newX + newWidth - 90,
              y: newY + newHeight + 5,
              width: 90,
              height: 30,
              display: 'none'
            }
            this.setCirclePosition(brlIndex, newX, newY, newWidth, newHeight)
            svg.onmouseup = (eu) => {
              this.blockRectList[brlIndex].foreignObject.display = 'block'
              svg.onmousemove = null
              svg.onmouseup = null
            }
          }
          break
      }
    },
    // 矩形圆点位置计算
    setCirclePosition (index, x, y, w, h) {
      // this.blockRectList = this.getCurrentRectList()
      let circleList = this.blockRectList[index].circleList
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
    }
  }
}
</script>
<style lang="scss">
#set-template {
  .el-header {
    background-color: #425369;
    .title {
      color: #fff;
      height: 50px;
      line-height: 50px;
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
    background-color: #ffffff;
    .el-tabs__header {
      display: flex;
      justify-content: center;
      margin: 0;
      .el-tabs__nav-wrap {
        &::after {
          background-color: #ffffff;
        }
      }
    }
    .el-tabs__content {
      min-height: calc(100vh - 90px);
      .template-info {
        .template-info-select {
          margin-top: 70px;
          margin-bottom: 40px;
          .select-text {
            display: inline-block;
            font-size: 14px;
          }
        }
        .add-template {
          margin-left: 15px;
        }
        .big-black {
          color: #444;
          font-size: 20px;
          font-weight: bold;
        }
        .available-row {
          margin-top: 70px;
          margin-bottom: 40px;
          .pic-list-name {
            font-family: MicrosoftYaHei;
            font-size: 18px;
            color: #353b45;
            margin-bottom: 20px;
          }
        }
        .sm-pic-div {
          display: inline-block;
          position: relative;
          width: 220px;
          height: 150px;
          background: #fff;
          border: 1px solid #c6cfd4;
          margin-right: 40px;
          margin-bottom: 15px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .opration {
        height: 54px;
        width: 100%;
        background-color: #fafafa;
        border-bottom: 1px solid #e2e6ef;
        .el-col {
          font-size: 12px;
          color: #333;
        }
        .zoom {
          width: 250px;
          .el-col {
            text-align: center;
            &:last-child {
              margin-right: 20px;
            }
            i {
              font-size: 20px;
            }
          }
          .icon-box {
            i {
              padding: 5px;
              cursor: pointer;
            }
          }
        }
      }
      .paper-img {
        .mask {
          position: absolute;
          // transform: translate(50%, 0);
          top: 0;
          left: 0;
          z-index: 500;
          .horizon-line {
            height: 30px;
            border-bottom: 1px dashed #59bde5;
          }
          .vertical-line {
            display: inline-block;
            width: 30px;
            height: 100%;
            border-right: 1px dashed #59bde5;
          }
        }
      }
      .main-svg {
        overflow: scroll;
        // text-align: center;
        cursor: not-allowed;
        svg {
          cursor: default;
          transform-origin: center center;
          image {
            transform-origin: center center;
          }
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
      .thumbnail-view {
        width: 100%;
        .img-wrapper {
          width: 177px;
          height: 127px;
          box-sizing: content-box;
          padding: 3px;
          margin: 0 auto;
          margin-bottom: 30px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .selected {
          border: 2px solid rgba(32, 151, 255, 0.3);
          border-radius: 3px;
        }
      }
    }
  }
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
        width: 300px;
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
  .add-template-dialog {
    .el-form {
      padding-right: 20px;
      .el-select {
        width: 100%;
      }
      .answer-card-upload {
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
    }
  }
}
</style>
