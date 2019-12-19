/* eslint-disable indent */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import NProgress from 'nprogress'
Vue.use(VueRouter)
// 登录
const Login = r => require.ensure([], () => r(require('@/views/Login')), 'Login')
// 忘记密码
const ForgetPassword = r => require.ensure([], () => r(require('@/views/ForgetPassword')), 'ForgetPassword')
// 主功能
const MainMenu = r => require.ensure([], () => r(require('@/views/MainMenu')), 'MainMenu')
// 首页
const Home = r => require.ensure([], () => r(require('@/views/Home')), 'Home')
// 考试详情
const Exam = r => require.ensure([], () => r(require('@/views/Exam')), 'Exam')
// 人员信息管理
const PersonManager = r => require.ensure([], () => r(require('@/views/PersonManager')), 'PersonManager')
// 科目主页
const SubjectMain = r => require.ensure([], () => r(require('@/views/SubjectMain')), 'SubjectMain')
// 创建考试
const CreateExam = r => require.ensure([], () => r(require('@/views/CreateExam')), 'CreateExam')
// 修改考试
const EditExam = r => require.ensure([], () => r(require('@/views/EditExam')), 'EditExam')
// 考生信息管理
const ExamDetail = r => require.ensure([], () => r(require('@/views/ExamDetail')), 'ExamDetail')
// 设置试卷结构
const ExamPaperStructure = r => require.ensure([], () => r(require('@/views/ExamPaperStructure')), 'ExamPaperStructure')
// 设置答案
const SettingAnswer = r => require.ensure([], () => r(require('@/views/SettingAnswer')), 'SettingAnswer')
// 题块设置
const QuestionBlock = r => require.ensure([], () => r(require('@/views/QuestionBlock')), 'QuestionBlock')
// 试卷打分
const CheckPaper = r => require.ensure([], () => r(require('@/views/CheckPaper')), 'CheckPaper')
// 待阅题块列表
const CheckPaperBlock = r => require.ensure([], () => r(require('@/views/CheckPaperBlock')), 'CheckPaperBlock')
// 框选题块
const BlockStyle = r => require.ensure([], () => r(require('@/views/BlockStyle')), 'BlockStyle')
// 考试分析
const ExamAnalyze = r => require.ensure([], () => r(require('@/views/ExamAnalyze')), 'ExamAnalyze')
// 答题卡模板
// const AnswerSheet = r => require.ensure([], () => r(require('@/views/AnswerSheet')), 'AnswerSheet')
// 设置模板
const SetTemplate = r => require.ensure([], () => r(require('@/views/SetTemplate')), 'SetTemplate')
// 扫描答题卡
const ScanPaper = r => require.ensure([], () => r(require('@/views/ScanPaper')), 'ScanPaper')
// 上传原卷
const UploadYuanJuan = r => require.ensure([], () => r(require('@/views/UploadYuanJuan')), 'UploadYuanJuan')
// 题库菜单
const BankMenu = r => require.ensure([], () => r(require('@/views/BankMenu')), 'BankMenu')
// 题库
const QuestionBank = r => require.ensure([], () => r(require('@/views/QuestionBank')), 'QuestionBank')
// 后台管理
const Manager = r => require.ensure([], () => r(require('@/views/Manager')), 'Manager')
// 设置Banner
// const Banner = r => require.ensure([], () => r(require('@/views/Banner')), 'Banner')
// 测试题库
const test = r => require.ensure([], () => r(require('@/views/test')), 'test')
// 用户修改密码
const UpdatePassword = r => require.ensure([], () => r(require('@/views/UpdatePassword')), 'UpdatePassword')
// 阅卷进度
const Progress = r => require.ensure([], () => r(require('@/views/Progress')), 'Progress')

const router = new VueRouter({
  mode: 'hash',
  base: '/yuejuan/',
  routes: [{
      path: '/',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login
    }, {
      path: '/forgetPassword',
      name: 'forgetPassword',
      meta: {
        title: '忘记密码'
      },
      component: ForgetPassword
    }, {
      path: '/mainMenu',
      meta: {
        title: '首页'
      },
      component: MainMenu,
      children: [{
        path: '/',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: Home
      }, {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: Home
      }, {
        path: '/personManager',
        name: 'personManager',
        meta: {
          title: '人员信息管理'
        },
        component: PersonManager
      }, {
        path: '/subjectMain/:examId/:examSubjectId',
        name: 'subjectMain',
        meta: {
          title: '科目首页'
        },
        component: SubjectMain
      }, {
        path: '/exam/:examId',
        name: 'exam',
        meta: {
          title: '考试详情'
        },
        component: Exam
      }, {
        path: '/createExam',
        name: 'createExam',
        meta: {
          title: '创建考试'
        },
        component: CreateExam
      }, {
        path: '/editExam/:examId',
        name: 'editExam',
        meta: {
          title: '编辑考试'
        },
        component: EditExam
      }, {
        path: '/examDetail/:examId',
        name: 'examDetail',
        meta: {
          title: '考生信息管理'
        },
        component: ExamDetail
      }, {
        path: '/examPaperStructure/:examId/:examSubjectId',
        name: 'examPaperStructure',
        meta: {
          title: '试卷结构'
        },
        component: ExamPaperStructure
      }, {
        path: '/settingAnswer/:examId/:examSubjectId',
        name: 'settingAnswer',
        meta: {
          title: '设置答案'
        },
        component: SettingAnswer
      }, {
        path: '/scanPaper/:examId/:examSubjectId/:batchNumber',
        name: 'scanPaper',
        meta: {
          title: '扫描答题卡'
        },
        component: ScanPaper
      }, {
        path: '/questionBlock/:examId/:examSubjectId',
        name: 'questionBlock',
        meta: {
          title: '题块与阅卷任务'
        },
        component: QuestionBlock
      }, {
        path: '/checkPaperBlock/:examId/:examSubjectId/:examineId',
        name: 'checkPaperBlock',
        meta: {
          title: '待阅题块'
        },
        component: CheckPaperBlock
      }, {
        path: '/checkPaper/:examId/:examSubjectId/:examineId/:blockId',
        name: 'checkPaper',
        meta: {
          title: '试卷打分'
        },
        component: CheckPaper
      }, {
        path: '/uploadYuanJuan/:examId/:examSubjectId',
        name: 'uploadYuanJuan',
        meta: {
          title: '上传原卷'
        },
        component: UploadYuanJuan
      }, {
        path: '/manager',
        name: 'manager',
        meta: {
          title: '后台管理'
        },
        component: Manager
        // children: [{
        //   path: '/banner',
        //   name: 'banner',
        //   meta: {
        //     title: '设置Banner'
        //   },
        //   component: Banner
        // }]
      }, {
        path: '/updatePassword',
        name: 'updatePassword',
        meta: {
          title: '修改密码'
        },
        component: UpdatePassword
      }, {
        path: '/progress/:examId/:examSubjectId',
        name: 'progress',
        meta: {
          title: '阅卷进度'
        },
        component: Progress
      }]
    }, {
      path: '/blockStyle/:examId/:examSubjectId',
      name: 'blockStyle',
      meta: {
        title: '框选题块'
      },
      component: BlockStyle
    }, {
      path: '/examAnalyze',
      name: 'examAnalyze',
      meta: {
        title: '考试分析'
      },
      component: ExamAnalyze
    },
    // {
    //   path: '/answerSheet',
    //   name: 'answerSheet',
    //   meta: {
    //     title: '制作答题卡'
    //   },
    //   component: AnswerSheet
    // },
    {
      path: '/setTemplate/:examId/:examSubjectId',
      name: 'setTemplate',
      meta: {
        title: '创建模板'
      },
      component: SetTemplate
    }, {
      path: '/bankMenu',
      meta: {
        title: '知识库'
      },
      component: BankMenu,
      children: [{
        path: '/',
        name: 'questionBank',
        meta: {
          title: '教材选题'
        },
        component: QuestionBank
      }, {
        path: '/questionBank',
        name: 'QuestionBank',
        meta: {
          title: '教材选题'
        },
        component: QuestionBank
      }]
    }, {
      path: '/test',
      name: 'test',
      meta: {
        title: '题库'
      },
      component: test
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = '阅卷1.0 | ' + to.meta.title
  }
  console.log(store.state.isLogin, to.path)
  // 是否登录判断
  // if (!store.state.isLogin && to.path !== '/') {
  //   console.log(11)
  //   next({
  //     name: 'login'
  //   })
  // } else if (!!store.state.isLogin && to.path === '/') {
  //   next({
  //     path: '/home'
  //   })
  // } else {
  //   next()
  // }
  next()
})
router.afterEach((to, from, next) => {
  NProgress.done()
})
export default router
