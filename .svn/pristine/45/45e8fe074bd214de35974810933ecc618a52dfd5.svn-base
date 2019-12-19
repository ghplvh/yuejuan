<template>
  <div id="bank-menu">
    <header class="layout-header">
      <nav class="layout-header-inner">
        <div class="layout-logo">
          <router-link to="" class="logo"></router-link>
        </div>
        <div class="nav-search">
          <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择" @change="test()">
              <el-option v-for="op in searchSelect" :key="op.id" :label="op.name" :value="op.id"></el-option>
            </el-select>
            <span slot="suffix" class="el-input__icon el-icon-search"></span>
          </el-input>
          <router-link to="" class="heart">
            <!-- <img src="../assets/icon/ebook.png" alt="">
            <span>心灵驿站</span> -->
          </router-link>
        </div>
        <div class="layout-user">
          <img src="../assets/icon/user.png" alt="">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="user-name">新邵县第一中学超级管理员</span>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav>
      <div class="layout-header-menu-box">
        <div class="layout-header-menu-bar">
          <div class="choose-study">
            <i class="el-icon-menu"></i>
            <span>高中数学</span>
            <div class="grade-subject">
              <div class="grade-subject-item">
                <div class="grade">
                  <i class="el-icon-caret-right"></i>
                  <span>高中</span>
                </div>
                <div class="subject">
                  <span :class="sub.id === subject ? 'subject-item is-active':'subject-item'" v-for="sub in subjects" :key="sub.id" @click="handleSubject(sub.id)">{{sub.name}}</span>
                </div>
              </div>
              <div class="grade-subject-item">
                <div class="grade">
                  <i class="el-icon-caret-right"></i>
                  <span>初中</span>
                </div>
                <div class="subject">
                  <span class="subject-item" v-for="sub in subjects" :key="sub.id">{{sub.name}}</span>
                </div>
              </div>
              <div class="grade-subject-item">
                <div class="grade">
                  <i class="el-icon-caret-right"></i>
                  <span>小学</span>
                </div>
                <div class="subject">
                  <span class="subject-item" v-for="sub in subjects" :key="sub.id">{{sub.name}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-menu :default-active="defaultActive" @select="handleSelect" router mode="horizontal" background-color="#1daef8" text-color="#ffffff" active-text-color="#ffffff">
            <el-menu-item index="" style="width:80px;text-align:center;">首页</el-menu-item>
            <el-menu-item index="questionBank">教材选题</el-menu-item>
            <el-menu-item index="">知识点选题</el-menu-item>
            <el-menu-item index="">试卷选题</el-menu-item>
            <el-menu-item index="">智能组卷</el-menu-item>
            <el-menu-item index="">细目表组卷</el-menu-item>
            <el-menu-item index="">我的记录</el-menu-item>
          </el-menu>
          <div class="basket">
            <span class="basket-inner">
              <img src="../assets/icon/basket.png" class="lz">
              <span>试题篮</span>
              <span class="num">23</span>
            </span>
            <div class="basket-content">
              <div class="content">
                <span title="选择题" class="topic-type">选择题</span>
                <span class="topic-num">
                  <span class="num">12</span>
                  <span>道</span>
                </span>
                <span class="topic-delete">
                  <i class="el-icon-delete"></i>
                </span>
              </div>
              <div class="content">
                <span title="填空题" class="topic-type">填空题</span>
                <span class="topic-num">
                  <span class="num">4</span>
                  <span>道</span>
                </span>
                <span class="topic-delete">
                  <i class="el-icon-delete"></i>
                </span>
              </div>
              <div class="content">
                <span title="解答题" class="topic-type">解答题</span>
                <span class="topic-num">
                  <span class="num">7</span>
                  <span>道</span>
                </span>
                <span class="topic-delete">
                  <i class="el-icon-delete"></i>
                </span>
              </div>
              <div class="data-null" style="display:none;">
                <img src="../assets/icon/data-null.png">
                <p>您还没有添加试题！</p>
              </div>
              <div class="footer">
                <el-button type="text" size="small" class="clear-btn">清空试题篮</el-button>
                <el-button type="primary" size="small">进入组卷中心</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <footer class="layout-footer">
      <div class="layout-footer-inner">
        <span>©2018-{{new Date().getFullYear()}}&nbsp;&nbsp;湖南都成科技有限公司</span>
        <span class="footer-split">|</span>
        <span>湘ICP备12345678-9号</span>
        <span class="footer-split">|</span>
        <span>湘公网安备12345678901234</span>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchSelect: [
        { id: 1, name: '试题' },
        { id: 2, name: '试卷' }
      ],
      select: 1,
      searchInput: '',
      subjects: [
        { id: 1, name: '数学' },
        { id: 2, name: '语文' },
        { id: 3, name: '英语' },
        { id: 4, name: '物理' },
        { id: 5, name: '化学' },
        { id: 6, name: '生物' },
        { id: 7, name: '政治' },
        { id: 8, name: '历史' },
        { id: 9, name: '地理' }
      ],
      subject: 1
    }
  },
  computed: {
    ...mapState(['adminInfo']),
    // 默认激活菜单
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleSubject (id) {
      this.subject = id
    },
    handleSelect (key, keyPath) {
    },
    test () {
    }
  }
}
</script>
<style lang="scss">
#bank-menu {
  position: relative;
  min-height: 100%;
  margin: 0 auto;
  padding-bottom: 60px;
  background-color: #ebecee;
  font-size: 14px;
  .layout-header {
    background-color: #fff;
    box-shadow: 0 0 4px #ccc;
    .layout-header-inner {
      width: 1200px;
      height: 98px;
      line-height: 98px;
      margin: 0 auto;
      overflow: hidden;
      background: #fff;
      .layout-logo {
        float: left;
        height: 98px;
        line-height: 98px;
        width: 320px;
        .logo {
          margin-top: 31px;
          display: block;
          width: 118px;
          height: 36px;
          background: url("../assets/icon/logo.png") no-repeat;
          background-size: contain;
        }
      }
      .nav-search {
        display: inline-block;
        height: 98px;
        line-height: 98px;
        width: 700px;
        .input-with-select {
          width: 515px;
          margin-right: 20px;
          .el-input-group__prepend {
            border-radius: 22px 0 0 22px;
          }
          .el-select {
            width: 80px;
            .el-input {
              .el-input__inner {
                text-indent: 12px;
                border: none;
                border-radius: 0;
                padding-left: 9px;
              }
            }
          }
          .el-input__inner {
            border-radius: 0 22px 22px 0;
          }
          & > .el-input__suffix {
            .el-input__icon {
              font-size: 24px;
              margin-right: 5px;
              font-weight: 600;
              cursor: pointer;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        .heart {
          width: 83px;
          color: #999;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          margin-left: 3px;
          img {
            width: 20px;
            vertical-align: text-bottom;
            margin-right: 3px;
          }
          span {
            margin-left: 3px;
          }
        }
      }
      .layout-user {
        height: 60px;
        float: right;
        cursor: pointer;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          float: left;
          margin: 30px 5px 0 0;
        }
        .el-dropdown {
          // width: 120px;
          height: 60px;
          .el-dropdown-link {
            display: inline-block;
            height: 60px;
            .user-name {
              display: inline-block;
              max-width: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .el-icon-caret-bottom {
              float: right;
              margin-top: 40px;
              margin-left: 5px;
            }
          }
        }
      }
    }
    .layout-header-menu-box {
      width: 100%;
      height: 50px;
      background-color: #1daef8;
      z-index: 999;
      position: relative;
      .layout-header-menu-bar {
        width: 1200px;
        height: 50px;
        margin: 0 auto;
        background-color: #1daef8;
        .choose-study {
          width: 250px;
          line-height: 50px;
          text-align: center;
          float: left;
          background: #158cdf;
          color: #fff;
          i {
            margin-right: 5px;
          }
          &:hover {
            .grade-subject {
              display: block;
            }
          }
          .grade-subject {
            position: absolute;
            z-index: 2025;
            display: none;
            width: 250px;
            background-color: #fff;
            border-width: 0 1px 1px;
            border-style: solid;
            border-color: #158cdf;
            padding: 15px 15px;
            .grade-subject-item {
              text-align: left;
              line-height: 1;
              .grade {
                font-size: 14px;
                line-height: 30px;
                color: #333;
                i {
                  margin-right: 5px;
                  font-size: 8px;
                }
              }
              .subject {
                padding-left: 16px;
                .subject-item {
                  font-size: 13px;
                  display: inline-block;
                  color: #999;
                  margin-right: 8px;
                  margin-bottom: 5px;
                  height: 20px;
                  line-height: 20px;
                  padding: 0 3px;
                  cursor: pointer;
                  border-radius: 4px;
                  &:hover {
                    background-color: #1daef8;
                    color: #fff;
                  }
                }
                .is-active {
                  background-color: #12a2eb;
                  color: #fff;
                }
              }
            }
          }
        }
        .el-menu {
          display: inline-block;
          height: 50px;
          background-color: #1daef8;
          .el-menu-item {
            height: 50px;
            line-height: 50px;
            border: none !important;
            &:hover {
              background-color: #12a2eb !important;
            }
          }
          .is-active {
            background-color: #12a2eb !important;
          }
        }
        .basket {
          height: 50px;
          position: relative;
          float: right;
          .basket-inner {
            box-sizing: content-box;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: space-between;
            height: 30px;
            line-height: 30px;
            margin: 10px 0;
            width: 90px;
            padding: 0 10px;
            border: 1px solid #fff;
            border-radius: 30px;
            color: #fff;
            .lz {
              width: 14px;
              height: 14px;
            }
            .num {
              min-width: 22px;
              height: 22px;
              line-height: 22px;
              font-size: 12px;
              text-align: center;
              background: #ff6e6e;
              border-radius: 50%;
            }
          }
          &:hover {
            .basket-content {
              display: block;
            }
          }
          .basket-content {
            width: 240px;
            padding: 15px 25px;
            background: #fff;
            border: 1px solid #1daef8;
            border-top: none;
            z-index: 3;
            position: absolute;
            right: 0;
            top: 50px;
            display: none;
            .content {
              height: 30px;
              line-height: 30px;
              display: flex;
              justify-content: space-between;
              align-content: center;
              align-items: center;
              .topic-type {
                display: inline-block;
                width: 70px;
                height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .topic-num {
                display: inline-block;
                width: 40px;
                text-align: right;
                color: rgb(131, 135, 141);
                .num {
                  color: #12a2eb;
                  padding: 0 3px;
                }
              }
              .topic-delete {
                display: inline-block;
                width: 30px;
                text-align: right;
                .el-icon-delete {
                  color: #83878d;
                  cursor: pointer;
                }
              }
            }
            .data-null {
              text-align: center;
              margin-top: 10px;
              img {
                width: 102px;
                height: 50px;
                padding: 0;
                border: none;
              }
              p {
                line-height: 20px;
                font-size: 12px;
                color: #83878d;
              }
            }
            .footer {
              margin-top: 15px;
              text-align: center;
              .clear-btn {
                color: #83878d;
                font-size: 12px;
                &:hover {
                  color: #409eff;
                }
              }
              .el-button--primary {
                color: #fff;
                background-color: #1daef8;
                border-color: #1daef8;
                &:hover {
                  background: #54c4fd;
                  border-color: #54c4fd;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
  .layout-content {
    position: relative;
    min-height: calc(100vh - 210px);
  }
  .layout-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    clear: both;
    background-color: #292a2c;
    .layout-footer-inner {
      width: 1200px;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      text-align: center;
      font-size: 12px;
      color: #6a6a6a;
      .footer-split {
        margin: 0 3px;
      }
    }
  }
}
</style>
