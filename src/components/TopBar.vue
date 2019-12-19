<template>
  <div class="top-bar">
    <el-row class="layout" type="flex">
      <el-col :span="3" class="layout-logo">
        <router-link to="/" class="bar-logo"></router-link>
      </el-col>
      <el-col :span="9" class="layout-menu">
        <el-menu :default-active="activeIndex" mode="horizontal" text-color="#303133" active-text-color="#409EFF" router>
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="personManager">人员信息管理</el-menu-item>
          <el-menu-item index="examAnalyze">考试分析</el-menu-item>
          <el-menu-item index="answerSheet">答题卡工具</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="7" class="layout-btn">
        <router-link to="/exam/create" class="create-exam-btn">
          <el-button type="primary" size="medium" icon="el-icon-plus" round>创建考试</el-button>
        </router-link>
        <a class="app-btn">
          <el-popover placement="top-start" width="100" trigger="hover">
            <div><img src="../assets/logo.png" alt="app二维码"><span>扫码下载APP</span></div>
            <el-button class="app-qrcode" slot="reference" type="primary" size="medium" icon="el-icon-mobile-phone" plain round>阅卷APP</el-button>
          </el-popover>
        </a>
      </el-col>
      <el-col :span="5" class="layout-dropdown">
        <div class="avatar-box"><img src="../assets/logo.png" alt=""></div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <span>{{adminInfo.teacherInfo.name || adminInfo.phone}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="">
              <el-dropdown-item><i class="el-icon-info"></i>账号管理</el-dropdown-item>
            </router-link>
            <router-link to="">
              <el-dropdown-item><i class="el-icon-info"></i>帮助中心</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item><i class="el-icon-info"></i>退出登录</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    active: String
  },
  data () {
    return {
      activeIndex: this.active
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    console.log(this.adminInfo)
  }
}
</script>
<style lang="scss">
.top-bar {
  height: 66px;
  line-height: 66px;
  background: #fff;
  box-shadow: 0 2px 5px 0 hsla(0, 0%, 85%, 0.5);
  margin-bottom: 20px;
  .layout {
    width: 1200px;
    margin: 0 auto;
    .layout-menu {
      width: 440px;
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
        background: url("../assets/logo.png");
        background-size: 130px 35px;
        border: 1px solid red;
      }
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
    width: 108px;
    i {
      padding: 0 10px;
    }
  }
}
</style>
