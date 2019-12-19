<template>
  <el-card>
    <div slot="header">
      <span>修改密码</span>
    </div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" size="medium" placeholder="请输入新密码" style="width: 45%"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" type="password" size="medium" placeholder="请输入新密码" style="width: 45%"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPassword" :rules="rules2.re_password">
        <el-input v-model="form.newPassword" type="password" size="medium" placeholder="请确认新密码" style="width: 45%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import API from '../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    var valPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        password: '',
        newPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 30, message: '请输入6到30个字符的密码' },
          { pattern: /^(\w){6,20}$/, message: '密码只能为字母、数字、下划线' }
        ]
      },
      rules2: {
        re_password: [
          { required: true, validator: valPwd, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    // ...mapActions(['saveAdminInfo']),
    submitForm (form) {
      console.log(this.adminInfo.id)
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form.oldPassword, this.form.newPassword)
          let param = {
            userId: this.adminInfo.id,
            newPassword: this.form.newPassword,
            password: this.form.oldPassword
          }
          this.axios.post(API.ADMINUPDATE_PASSWORD, param).then(res => {
            console.log(res)
            if (res.data.message === 'success') {
              this.$message({
                message: '修改成功，请重新登录!',
                type: 'success'
              })
              this.$router.push('./')
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
              this.resetForm(form)
              return false
            }
          })
        }
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>
