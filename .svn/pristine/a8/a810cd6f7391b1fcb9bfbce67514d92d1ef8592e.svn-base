<template>
  <div class="app-wrapper">
    <el-row class="nav-bar">
      <el-row class="layout" type="flex">
        <el-col :span="3" class="layout-logo">
          <router-link to="" class="bar-logo"></router-link>
        </el-col>
        <el-col :span="11" class="layout-menu">
          <el-menu :default-active="defaultActive" mode="horizontal" text-color="#303133" active-text-color="#409EFF" router>
            <el-menu-item index="home" :route="{path:'/home'}" v-if="this.menuList.includes('index')">首页</el-menu-item>
            <el-menu-item index="personManager" :route="{path: '/personManager'}" v-if="this.menuList.includes('personManagement')">人员信息管理</el-menu-item>
            <el-menu-item index="" @click="toFenxi()" v-if="this.menuList.includes('examinationAnalysis')">考试分析</el-menu-item>
            <!-- <el-menu-item index="answerSheet" :route="{path: '/questionBank'}" v-if="this.menuList.includes('repository')">知识库</el-menu-item> -->
            <el-menu-item index="manager" :route="{path: '/manager'}" v-if="this.menuList.includes('backStageManagement')">后台管理</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="5" class="layout-btn" v-if="this.menuList.includes('createTheTest')">
          <router-link :to="{path: '/createExam'}" class="create-exam-btn">
            <el-button type="primary" size="medium" icon="el-icon-plus" round>创建考试</el-button>
          </router-link>
          <!-- <a class="app-btn">
            <el-popover placement="top-start" width="100" trigger="hover">
              <div><img src="../assets/logo.png" alt="app二维码"><span>扫码下载APP</span></div>
              <el-button class="app-qrcode" slot="reference" type="primary" size="medium" icon="el-icon-mobile-phone" plain round>阅卷APP</el-button>
            </el-popover>
          </a> -->
        </el-col>
        <el-col :span="5" class="layout-dropdown">
          <div class="avatar-box"><img src="../assets/icon/user.png" alt=""></div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <span>{{adminInfo.teacherInfo.name || adminInfo.phone}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/updatePassword">
                <el-dropdown-item><i class="el-icon-info"></i>账号管理</el-dropdown-item>
              </router-link>
              <!-- <router-link to="/">
                <el-dropdown-item><i class="el-icon-info"></i>帮助中心</el-dropdown-item>
              </router-link> -->
              <a @click="lgout()">
                <el-dropdown-item><i class="el-icon-info"></i>退出登录</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-row>

    <el-row id="app-main" class="app-container">
      <router-view />
    </el-row>
    <foot-bar />
    <customer-service />
  </div>
</template>
<script>
import FootBar from '../components/FootBar'
import CustomerService from '../components/CustomerService'
import API from '../api/api.js'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      schoolInfo: ''
    }
  },
  components: {
    FootBar,
    CustomerService
  },
  computed: {
    ...mapState(['adminInfo', 'menuList']),
    // 默认激活菜单
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    this.saveAdminInfo()
    this.getSchoolByCode()
  },
  methods: {
    ...mapActions(['saveAdminInfo', 'removeAdminInfo']),
    getSchoolByCode () {
      let data = {
        schoolCode: this.adminInfo && this.adminInfo.teacherInfo.schoolCode
      }
      this.axios.post(API.SCHOOL_FINDBYCOMMON, data).then(res => {
        this.schoolInfo = res.data.data[0]
      }).catch(() => { })
    },
    toFenxi () {
      const elink = document.createElement('a')
      elink.style.display = 'none'
      elink.target = '_blank'
      elink.href = 'http://192.168.0.114:8888'
      // elink.href = 'http://duchengedu.com/fenxi'
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    },
    lgout () {
      this.$store.dispatch('removeAdminInfo')
      console.log(this.$store.state.isLogin)
      this.$router.push('/')
    }
  }

}
</script>
<style lang="scss">
.app-wrapper {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  .nav-bar {
    background: #fff;
    box-shadow: 0 2px 5px 0 hsla(0, 0%, 85%, 0.5);
    margin-bottom: 20px;
    height: 66px;
    line-height: 66px;
    .layout {
      width: 1200px;
      margin: 0 auto;
      .layout-menu {
        // width: 440px;
        .el-menu {
          border-bottom: none;
          .el-menu-item {
            font-size: 16px;
            line-height: 66px;
            height: 66px;
            border-bottom: none;
            &:hover {
              background-color: #eef1f6;
            }
          }
          .is-active {
            border-bottom: none;
          }
        }
      }
      .layout-logo {
        .bar-logo {
          text-indent: -999px;
          width: 130px;
          height: 35px;
          margin-right: 51px;
          margin-top: 18px;
          display: block;
          background: url("../assets/icon/logo.png");
          background-size: 130px 35px;
          // border: 1px solid red;
        }
      }
      .banner-link {
        color: rgb(48, 49, 51);
        padding: 0 20px;
      }
      .layout-btn {
        .create-exam-btn {
          button {
            border-width: 0;
          }
        }
        .app-btn {
          margin-left: 100px;
          button {
            padding: 9px 19px;
            &:hover {
              color: #409eff;
              background: #ecf5ff;
              border-color: #b3d8ff;
            }
          }
        }
      }
      .layout-dropdown {
        width: 250px;
        margin-right: 20px;
        font-size: 16px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-flow: row nowrap;
        .avatar-box {
          vertical-align: middle;
          line-height: normal;
          margin-right: 6px;
          img {
            width: 40px;
            height: 40px;
            border: 1px solid #dcdde0;
            background-color: #dcdde0;
            border-radius: 50%;
          }
        }
        .el-dropdown {
          max-width: 180px;
          .el-dropdown-link {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex-flow: row nowrap;
            color: #409eff;
            cursor: pointer;
            span {
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .app-container {
    position: relative;
    width: 1200px;
    margin: auto;
  }
}
.el-popover {
  min-width: 100px;
  height: 130px;
  padding: 5px;
  img {
    width: 100px;
    height: 100px;
  }
  span {
    display: block;
    text-align: center;
    font-size: 12px;
  }
}
.el-dropdown-menu {
  li {
    // width: 108px;
    i {
      padding: 0 10px;
    }
  }
}
</style>
