<template>
  <div id="banner">
    <el-row class="opra-row" type="flex" align="middle">
      <el-col :span="6">
        <el-button type="primary" size="medium" @click="showAddDialog()">新增Banner</el-button>
      </el-col>
    </el-row>
    <el-row class="table-row">
      <el-table :data="bannerList" border :loading="loading">
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column prop="jumpUrl" label="跳转链接" width="400" align="center"></el-table-column>
        <el-table-column prop="jumpAction" label="跳转动作" width="150" align="center">
          <template slot-scope="scope">{{getActionNameById(scope.row.jumpAction)}}</template>
        </el-table-column>
        <el-table-column prop="picUrl" label="Banner图片" width="120" align="center">
          <template slot-scope="scope">
            <img class="pic-url" :src="scope.row.picUrl" alt="Banner图片" @click="uploadImgPreview({url:scope.row.picUrl})">
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="88" align="center">
          <template slot-scope="scope">{{getTypeNameById(scope.row.type)}}</template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后修改时间" width="149" align="center">
          <template slot-scope="scope">{{scope.row.updateTime || scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog :title="bannerDialogTitle" :visible.sync="dialogVisible" center width="600px" custom-class="banner-dialog">
      <el-form :model="form" :rules="formRules" ref="bannerForm" label-width="80px">
        <el-form-item label="跳转链接" prop="jumpUrl">
          <el-input v-model="form.jumpUrl"></el-input>
        </el-form-item>
        <el-form-item label="跳转动作" prop="jumpAction">
          <el-select v-model="form.jumpAction" value-key="id">
            <el-option v-for="action in jumpActionList" :key="action.id" :label="action.name" :value="action.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转类型" prop="type">
          <el-select v-model="form.type" value-key="id">
            <el-option v-for="type in jumpTypeList" :key="type.id" :label="type.name" :value="type.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转图片" prop="picUrl">
          <el-upload :action="uploadAction" :data="{filedir:'banner/'}" :file-list="fileList" :limit="1" list-type="picture-card" :on-error="uploadError" :on-success="uploadSuccess" :on-remove="uploadRemove" :on-exceed="uploadExceed" :on-preview="uploadImgPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" :loading="saveLoading" @click="submitForm('bannerForm')">确 定</el-button>
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
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      bannerList: [
      ],
      loading: false,
      saveLoading: false,
      form: {
        id: '',
        jumpUrl: '',
        jumpAction: '',
        picUrl: '',
        type: ''
      },
      formRules: {
        jumpUrl: [
          { required: true, message: '请填写跳转链接', trigger: ['blur'] }
        ],
        jumpAction: [
          { required: true, message: '请填写跳转动作', trigger: ['blur'] }
        ],
        picUrl: [
          { required: true, message: '请上传一张图片', trigger: ['blur', 'change'] }
        ],
        type: [
          { required: true, message: '请选择跳转类型', trigger: ['blur'] }
        ]
      },
      jumpActionList: [
        { id: 1, name: '内部链接' },
        { id: 2, name: '外部链接' }
      ],
      jumpTypeList: [
        { id: 1, name: '活动' }
      ],
      uploadAction: API.UPLOAD_UPLOADIMG,
      fileList: [],
      dialogVisible: false,
      dialogType: 'add',
      bannerDialogTitle: '新增Banner',
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
    this.getBanners()
  },
  methods: {
    ...mapActions(['saveAdminInfo']),
    // 查询Banner
    getBanners () {
      this.loading = true
      return this.axios.post(API.BANNER_GETBANNER, {}).then((res) => {
        this.bannerList = res.data.data.map(item => {
          item.jumpAction = parseInt(item.jumpAction)
          return item
        })
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    // 根据ID获取跳转动作名称
    getActionNameById (id) {
      let action = this.jumpActionList.find(item => {
        return id === item.id
      })
      return action ? action.name : ''
    },
    // 根据ID获取跳转类型名称
    getTypeNameById (id) {
      let type = this.jumpTypeList.find(item => {
        return id === item.id
      })
      return type ? type.name : ''
    },
    // 显示新增弹窗
    showAddDialog () {
      this.dialogType = 'add'
      this.bannerDialogTitle = '新增Banner'
      this.dialogVisible = true
    },
    // 显示修改弹窗
    editRow (row) {
      this.dialogType = 'edit'
      this.bannerDialogTitle = '修改Banner'
      this.form = {
        id: row.id,
        jumpUrl: row.jumpUrl,
        jumpAction: row.jumpAction,
        picUrl: row.picUrl,
        type: row.type
      }
      this.fileList = [
        { name: '', url: row.picUrl }
      ]
      this.dialogVisible = true
    },
    // 上传失败
    uploadError (err, file, fileList) {
      this.$message({
        message: '上传失败:' + err,
        type: 'error'
      })
    },
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.form.picUrl = response.data.data
    },
    // 删除上传图片
    uploadRemove (file, fileList) {
      this.form.picUrl = ''
    },
    // 上传数量超过限制
    uploadExceed (files, fileList) {
      this.$message({
        message: '最多只能上传1张图片',
        type: 'warning'
      })
    },
    // 放大查看上传图片
    uploadImgPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogImgVisible = true
    },
    // 新增或修改Banner
    async submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let isSuccess = false
          this.saveLoading = true
          if (this.dialogType === 'add') {
            await this.axios.post(API.BANNER_INSERTBANNER, this.form).then(res => {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              isSuccess = true
              this.getBanners()
            }).catch(() => { })
          } else if (this.dialogType === 'edit') {
            await this.axios.post(API.BANNER_UPDATEBANNER, this.form).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              isSuccess = true
              this.getBanners()
            }).catch(() => { })
          }
          if (isSuccess) {
            this.form = {
              id: '',
              jumpUrl: '',
              jumpAction: '',
              picUrl: '',
              type: ''
            }
            this.fileList = []
            this.dialogVisible = false
          }
          this.saveLoading = false
        } else {
          return false
        }
      })
    },
    // 删除Banner
    deleteRow (row) {
      this.$confirm('确定删除这个Banner吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(API.BANNER_DELETEBANNER, { id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getBanners()
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
#banner {
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
  .banner-dialog {
    .el-select {
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
</style>
