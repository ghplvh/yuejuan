<template>
  <div class="layout-content layout-wrap">
    <el-row type="flex">
      <el-col :span="5">
        <div class="select-question">
          <el-row>
            <el-col>
              <div class="select-info">
                <div class="select-dropdown">
                  <p>
                    <span>人教版</span>
                    <span>·</span>
                    <span>必修1</span>
                    <span class="el-icon-arrow-down"></span>
                  </p>
                  <div class="select-info-detail">
                    <div class="detail-item">
                      <div class="version">
                        <i class="el-icon-caret-right"></i>
                        <span>版本</span>
                      </div>
                      <div class="version-ul">
                        <span :class="activeV === v.id ? 'is-active version-item':'version-item'" v-for="v in versions" :key="v.id">{{v.name}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="version">
                        <i class="el-icon-caret-right"></i>
                        <span>年级</span>
                      </div>
                      <div class="version-ul">
                        <span :class="activeVg === vg.id ? 'is-active version-item':'version-item'" class="version-item" v-for="vg in versionGrades" :key="vg.id">{{vg.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-tree :data="treeData" icon-class=""></el-tree>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="ebook-question">
          <el-row>
            <el-col>
              <div class="filter-box">
                <div class="filter-select">
                  <div class="fl-select-title">难度</div>
                  <div class="fl-select-con">
                    <span :class="condition.difficulty === df.id ? 'is-active fl-sel-item':'fl-sel-item'" v-for="df in difficultys" :key="df.id">{{df.name}}</span>
                  </div>
                </div>
                <div class="filter-select">
                  <div class="fl-select-title">题型</div>
                  <div class="fl-select-con">
                    <span :class="condition.difficulty === df.id ? 'is-active fl-sel-item':'fl-sel-item'" v-for="df in difficultys" :key="df.id">{{df.name}}</span>
                  </div>
                </div>
                <div class="filter-select">
                  <div class="fl-select-title">来源</div>
                  <div class="fl-select-con">
                    <span :class="condition.difficulty === df.id ? 'is-active fl-sel-item':'fl-sel-item'" v-for="df in difficultys" :key="df.id">{{df.name}}</span>
                  </div>
                </div>
                <div class="filter-select">
                  <div class="fl-select-title">类型</div>
                  <div class="fl-select-con">
                    <span :class="condition.difficulty === df.id ? 'is-active fl-sel-item':'fl-sel-item'" v-for="df in difficultys" :key="df.id">{{df.name}}</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="sort">
                <span class="sort-item">
                  <a class="item-link is-active">时间排序</a>
                  <a class="item-link">综合排序</a>
                  <a class="item-link">引用次数排序</a>
                  <a class="item-link">真卷次数排序</a>
                  <a class="item-link">组卷次数排序</a>
                </span>
                <span class="question-total">
                  <span>共计试题</span>
                  <span class="total-num">200</span>
                  <span>道</span>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div id="questions" class="question-list" element-loading-text="加载中..." v-loading="questionLoading">
                <el-card shadow="never" class="question-card">
                  <div class="card-center" v-html="gs"></div>
                  <el-row class="card-footer" type="flex" align="middle" justify="space-between">
                    <el-col :span="12">
                      <span>题型：选择题</span>
                      <span class="footer-split">|</span>
                      <span>难度：较难</span>
                      <span class="footer-split">|</span>
                      <span>引用次数：1</span>
                      <span class="footer-split">|</span>
                      <span>组卷次数：19</span>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" size="mini" icon="el-icon-document">查看解析</el-button>
                      <el-button type="text" size="mini" icon="el-icon-warning">报错</el-button>
                      <el-button type="text" size="mini" icon="el-icon-download">下载</el-button>
                      <el-button type="text" size="mini" icon="el-icon-star-off">收藏</el-button>
                      <el-button type="primary" size="mini" icon="el-icon-plus">加入试题篮</el-button>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card shadow="never" class="question-card">
                  <div class="card-center"></div>
                  <el-row class="card-footer" type="flex" align="middle" justify="space-between">
                    <el-col :span="12">
                      <span>题型：选择题</span>
                      <span class="footer-split">|</span>
                      <span>难度：较难</span>
                      <span class="footer-split">|</span>
                      <span>引用次数：1</span>
                      <span class="footer-split">|</span>
                      <span>组卷次数：19</span>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" size="mini" icon="el-icon-document">查看解析</el-button>
                      <el-button type="text" size="mini" icon="el-icon-warning">报错</el-button>
                      <el-button type="text" size="mini" icon="el-icon-download">下载</el-button>
                      <el-button type="text" size="mini" icon="el-icon-star-off">收藏</el-button>
                      <el-button type="primary" size="mini" icon="el-icon-plus">加入试题篮</el-button>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import '../assets/css/questionBank.scss'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isMathjaxConfig: false, // 防止重复调用Config，造成性能损耗
      gs: '$f(x) = {x^2} - 3x - 18,x \\in \\left[ {1,8} \\right]$',
      versions: [
        { id: 1, name: '人教A版' },
        { id: 2, name: '人教B版' },
        { id: 3, name: '人教C版' },
        { id: 4, name: '人教D版' },
        { id: 5, name: '人教E版' }
      ],
      versionGrades: [
        { id: 1, name: '必修1' },
        { id: 2, name: '必修2' },
        { id: 3, name: '必修3' },
        { id: 4, name: '必修4' },
        { id: 5, name: '必修5' },
        { id: 6, name: '必修6' },
        { id: 7, name: '必修7' },
        { id: 8, name: '必修8' },
        { id: 9, name: '必修9' }
      ],
      activeV: 1,
      activeVg: 1,
      treeData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      difficultys: [
        { id: 1, name: '全部' },
        { id: 2, name: '容易' },
        { id: 3, name: '较易' },
        { id: 4, name: '中等' },
        { id: 5, name: '较难' },
        { id: 6, name: '困难' }
      ],
      condition: {
        difficulty: 1
      },
      questionLoading: false
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () { },
  mounted () {
    this.$nextTick(() => {
      // console.log(window.MathJax)
      if (this.isMathjaxConfig === false) { // 如果：没有配置MathJax
        this.initMathjaxConfig()
        // console.log(window.MathJax)
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss">
</style>
