<template>
  <div id="login">
    <el-form :model="form" :rules="rules" ref="form" label-width="60px">
      <el-form-item label="账号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入账号" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" @keyup.enter.native="login('form')" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login('form')" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="登录中">登录</el-button>
      <!-- <router-link to="/forgetPassword" class="forget">忘记密码？</router-link> -->
    </el-form>
  </div>
</template>
<script>
import API from '../api/api'
import { mapActions } from 'vuex'
import { Base64 } from 'js-base64'
export default {
  data () {
    return {
      fullscreenLoading: false,
      form: {
        phone: '15116486236',
        password: '486236'
      },
      rules: {
        phone: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.removeAdminInfo()
  },
  methods: {
    ...mapActions(['removeAdminInfo', 'saveAdminInfo']),
    // 登录
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {}
          // 手机号正则
          let regPhone = new RegExp('^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$')
          // 邮箱正则
          let regEmail = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$')
          if (regPhone.test(this.form.phone)) {
            data = {
              phone: this.form.phone,
              password: this.form.password
            }
          } else if (regEmail.test(this.form.phone)) {
            data = {
              email: this.form.phone,
              password: this.form.password
            }
          } else {
            data = this.form
          }
          this.fullscreenLoading = true
          this.axios.post(API.USER_LOGIN, data).then(res => {
            let adminInfo = res.data.data
            sessionStorage.setItem('adminInfo', Base64.encode(JSON.stringify(adminInfo)))
            this.saveAdminInfo()
            this.$router.push('/home')
            this.fullscreenLoading = false
            this.form = {
              phone: '',
              password: ''
            }
          }).catch(() => { this.fullscreenLoading = false })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
#login {
  min-height: 100vh;
  height: 100%;
  overflow: hidden;
  .el-form {
    width: 500px;
    margin: 200px auto 0;
    .el-form-item {
      border: 1px solid #cccccc;
      background-color: #fafafa;
      border-radius: 4px;
    }
    .el-button {
      width: 100%;
      margin-bottom: 22px;
    }
    .forget {
      text-decoration: none;
      color: #999;
      &:hover {
        text-decoration: underline;
        color: #409eff;
      }
    }
  }
}
</style>
