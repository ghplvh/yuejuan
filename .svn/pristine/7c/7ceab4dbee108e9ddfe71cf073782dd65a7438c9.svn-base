<template>
  <div id="news">
    <el-row class="opra-row" type="flex" align="middle">
      <el-col :span="6">
        <el-button type="primary" size="medium" @click="showAddDialog()">新增学校</el-button>
      </el-col>
    </el-row>
    <el-row class="table-row">
      <el-table :data="schoolList" border :loading="loading">
        <el-table-column prop="schoolCode" label="学校编号" align="center"></el-table-column>
        <el-table-column prop="schoolName" label="学校名称" align="center"></el-table-column>
        <el-table-column prop="address" label="学校地址" align="center">
          <template slot-scope="scope">
            {{scope.row.address ? scope.row.address.split(',').join('') : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="modifyTime" label="最后修改时间" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center width="600px" custom-class="banner-dialog">
      <el-form :model="form" :rules="formRules" ref="newsForm" label-width="80px">
        <el-form-item label="学校名称" prop="schoolName">
          <el-input v-model="form.schoolName" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item label="学校编号" prop="schoolCode">
          <el-input v-model.number="form.schoolCode" placeholder="请输入学校编号"></el-input>
        </el-form-item>
        <el-form-item label="学校地址" prop="address">
          <el-cascader size="large" :options="options" v-model="form.address"></el-cascader>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="form.contact" placeholder="请输入联系方式"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitForm('newsForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogImgVisible" width="750px" top="80px">
      <img width="100%" :src="dialogImageUrl" alt="">
      <span slot="footer">
        <el-button type="primary" size="small" @click="dialogImgVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/api.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      schoolList: [],
      loading: false,
      options: regionDataPlus,
      form: {
        schoolName: '',
        address: [],
        schoolCode: '',
        contact: ''
      },
      formRules: {
        schoolName: [
          { required: true, message: '请填写学校名称', trigger: ['blur'] }
        ],
        address: [
          { required: true, message: '请选择学校地址', trigger: ['blur'] }
        ],
        schoolCode: [
          { required: true, message: '请填写学校编号', trigger: ['blur'] }
        ],
        contact: [
          { required: true, message: '请填写学校联系方式', trigger: ['blur'] }
        ]
      },
      uploadAction: API.UPLOAD_UPLOADIMG,
      fileList: [],
      dialogVisible: false,
      dialogType: 'add',
      dialogTitle: '新增学校',
      dialogImgVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.saveAdminInfo()
    // this.getBanners()
    this.getSchools()
  },
  methods: {
    ...mapActions(['saveAdminInfo']),
    // 查询Banner
    getSchools () {
      this.loading = true
      return this.axios.post(API.ADMINSCHOOL_GETSCHOOL, {}).then((res) => {
        this.schoolList = res.data.data
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 显示新增弹窗
    showAddDialog () {
      this.dialogType = 'add'
      this.dialogTitle = '新增学校'
      this.dialogVisible = true
    },
    // 显示修改弹窗
    editRow (row) {
      this.dialogType = 'edit'
      this.bannerDialogTitle = '修改学校'
      this.form = {
        id: row.id,
        schoolName: row.schoolName,
        address: row.address && Array.isArray(row.address.split(',')) ? this.getAddressCodeArray(row.address.split(',')) : [],
        schoolCode: row.schoolCode,
        contact: row.contact
      }
      this.dialogVisible = true
    },
    getAddressCodeArray (addressArr) {
      let arr = []
      for (let i = 0; i < addressArr.length; i++) {
        arr[i] = arr[i - 1] ? arr[i - 1][addressArr[i]] : TextToCode[addressArr[i]]
      }
      // console.log(arr)
      return arr.map(item => {
        return item ? item.code : ''
      })
    },
    // 新增或修改Banner
    async submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let isSuccess = false
          let data = Object.assign({}, this.form)
          console.log(data)
          data.address = data.address.map(item => {
            return CodeToText[item]
          }).join(',')
          if (this.dialogType === 'add') {
            await this.axios.post(API.ADMINSCHOOL_INSERTSCHOOL, data).then(res => {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              isSuccess = true
              this.getSchools()
            }).catch(() => { })
          } else if (this.dialogType === 'edit') {
            await this.axios.post(API.ADMINSCHOOL_UPDATESCHOOL, data).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              isSuccess = true
              this.getSchools()
            }).catch(() => { })
          }
          if (isSuccess) {
            this.form = {
              schoolName: '',
              address: [],
              schoolCode: '',
              contact: ''
            }
            this.dialogVisible = false
          }
        } else {
          return false
        }
      })
    },
    // 删除Banner
    deleteRow (row) {
      this.$confirm('确定删除这个学校吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(API.ADMINSCHOOL_DELSCHOOL, { id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getSchools()
        }).catch(() => { })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss">
#news {
  width: 100%;
  .opra-row {
    height: 50px;
    // padding: 0 20px;
    background-color: #ffffff;
  }
  .table-row {
    padding: 20px 0;
    background-color: #ffffff;
    border-top: 1px solid #ebeef5;
    .el-table {
      .pic-url {
        height: 67px;
        cursor: pointer;
      }
    }
  }
  .omit-row {
    width: 250px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .banner-dialog {
    .el-select {
      width: 100%;
    }
    .el-cascader {
      width: 100%;
    }
    .el-upload--picture-card {
      width: 75px;
      height: 75px;
      line-height: 76px;
    }
    .el-upload-list--picture-card {
      .el-upload-list__item {
        width: 75px;
        height: 75px;
      }
    }
  }
}
.content-popper {
  padding: 15px !important;
  height: auto !important;
}
</style>
