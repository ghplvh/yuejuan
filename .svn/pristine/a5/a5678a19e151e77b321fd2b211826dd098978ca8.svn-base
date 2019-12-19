<template>
  <div>
    <el-row class="filter-bar">
      <el-col class="filter-item" :span="8">
        <label>所属学校:</label>
        <el-select v-model="school" placeholder="" size="small" value-key="id" @change="choiceSchool">
          <el-option v-for="(item) in schoolList" :key="item.id" :label="item.schoolName" :value="item.schoolCode"></el-option>
        </el-select>
      </el-col>
      <el-col class="filter-item" :span="8">
        <label>账号类别：</label>
        <el-select v-model="roleType" placeholder="" size="small" @change="changeRole">
          <el-option v-for="(item) in roleTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col class="filter-item" :span="8">
        <label>账号状态：</label>
        <el-select v-model="status" placeholder="" size="small" @change="choiceStatus">
          <el-option v-for="(item) in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="accountList" @selection-change="selectionChange" :span-method="teacherSpanMethod" v-loading="loading" border>
      <el-table-column prop="accountName" label="名称" align="center" min-width="100px"></el-table-column>
      <el-table-column prop="account" label="账号" align="center" min-width="100px"></el-table-column>
      <el-table-column prop="roleName" label="权限" align="center" min-width="100px"></el-table-column>
      <el-table-column prop="schoolName" label="所属学校" align="center" min-width="120px"></el-table-column>
      <el-table-column label="操作" align="center" min-width="180px">
        <template slot-scope="scope">
          <el-button class="danger-text" type="primary" size="medium" @click="editPassword(scope.row)">修改密码</el-button>
          <el-button v-if="scope.row.status === 0" class="danger-text" type="danger" size="medium" @click="changeStatus(scope.row)">启用</el-button>
          <el-button v-else class="danger-text" type="danger" size="medium" @click="changeStatus(scope.row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="修改密码" :visible.sync="dialogVisible" width="700px" top="14vh" center class="dialog-teacher">
      <el-form :model="form" :rules="rules" ref="form" label-width="110px">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password" size="medium" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword" :rules="rules2.re_password">
          <el-input v-model="form.newPassword" type="password" size="medium" placeholder="请确认新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="suerEdit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from '../api/api.js'
export default {
  data () {
    var valPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      schoolList: [],
      school: '',
      roleTypeList: [
        {
          name: '学校',
          id: 1
        },
        {
          name: '教师',
          id: 2
        },
        {
          name: '学生',
          id: 3
        }
      ],
      roleType: '学校',
      statusList: [
        {
          name: '禁用',
          id: 0
        },
        {
          name: '启用',
          id: 1
        }
      ],
      loading: false,
      status: '',
      pageIndex: 1,
      accountList: [],
      dialogVisible: false,
      form: {
        password: '',
        newPassword: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
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
  mounted () {
    this.getSchools()
  },
  methods: {
    getSchools () {
      this.loading = true
      return this.axios.post(API.ADMINSCHOOL_GETSCHOOL, {}).then((res) => {
        this.schoolList = res.data.data
        this.school = this.schoolList[0].schoolName
        this.loading = false
        this.serchAccount()
      }).catch(() => { this.loading = false })
    },
    serchAccount () {
      // 处理查询入参
      if (this.school === this.schoolList[0].schoolName) {
        this.school = this.schoolList[0].schoolCode
      }
      if (this.roleType === '学校') {
        this.roleType = 1
      }
      let param = {
        schoolCode: this.school,
        roleType: this.roleType,
        status: this.status,
        pageIndex: this.pageIndex || 1,
        pageSize: 10
      }
      this.loading = true
      return this.axios.post(API.ADMINQUERY_ACCOUNT, param).then(res => {
        if (!res.data.data) {
          this.accountList = []
        } else {
          this.accountList = res.data.data.list
        }
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    choiceSchool (value) {
      this.school = value
      this.serchAccount()
    },
    changeRole (value) {
      this.roleType = value
      this.serchAccount()
    },
    choiceStatus (value) {
      this.status = value
      this.serchAccount()
    },
    changeStatus (row) {
      let param = {
        userId: row.id,
        status: row.status
      }
      param.status = param.status === 1 ? 0 : 1
      this.axios.post(API.ADMINSET_ACCOUNTSTATUS, param).then(res => {
        if (res.data.message === 'success') {
          this.serchAccount()
        }
      }).catch(() => { this.loading = false })
    },
    editPassword (row) {
      this.dialogVisible = true
      this.userId = row.id
    },
    async suerEdit (form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          let param = {
            userId: this.userId,
            password: this.form.password
          }
          await this.axios.post(API.ADMINEDIT_PASSWORD, param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.form.password = ''
            this.userId = ''
            this.dialogVisible = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .filter-bar {
    margin-bottom: 20px;
  }
  .filter-item {
    display: inline-block;
  }
  label {
    margin-right: 10px;
  }
</style>
