<template>
  <div id="news">
    <el-row class="opra-row" type="flex" align="middle">
      <el-col :span="6">
        <el-button type="primary" size="medium" @click="showAddDialog()">新增新闻</el-button>
      </el-col>
    </el-row>
    <el-row class="table-row">
      <el-table :data="newsList" border :loading="loading">
        <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="title" label="新闻标题" width="157" align="center"></el-table-column>
        <el-table-column prop="content" label="新闻内容" width="280" align="center">
          <template slot-scope="scope">
            <el-popover placement="top" title="新闻内容" width="600" trigger="hover" popper-class="content-popper">
              <el-input type="textarea" v-model="scope.row.content" :autosize="{ minRows: 3, maxRows: 10}" readonly></el-input>
              <div slot="reference" class="omit-row">{{scope.row.content}}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="imageUrl" label="新闻图片" width="120" align="center">
          <template slot-scope="scope">
            <img class="pic-url" :src="scope.row.imageUrl" alt="新闻图片" @click="uploadImgPreview({url:scope.row.imageUrl})">
          </template>
        </el-table-column>
        <el-table-column prop="url" label="链接" width="180" align="center"></el-table-column>
        <el-table-column prop="viewCount" label="阅读数" width="80" align="center"></el-table-column>
        <el-table-column prop="lastUpdateTime" label="最后修改时间" width="110" align="center">
          <template slot-scope="scope">{{scope.row.lastUpdateTime || scope.row.createTime}}</template>
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
      <el-form :model="form" :rules="formRules" ref="newsForm" label-width="80px">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input v-model="form.url" placeholder="请输入跳转链接"></el-input>
        </el-form-item>
        <el-form-item label="新闻图片" prop="imageUrl">
          <el-upload :action="uploadAction" :data="{filedir:'news/'}" :file-list="fileList" :limit="1" list-type="picture-card" :on-error="uploadError" :on-success="uploadSuccess" :on-remove="uploadRemove" :on-exceed="uploadExceed" :on-preview="uploadImgPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
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
        <el-button type="primary" size="small" :loading="saveLoading" @click="dialogImgVisible = false">关闭</el-button>
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
      newsList: [
      ],
      loading: false,
      form: {
        id: '',
        title: '',
        content: '',
        imageUrl: '',
        url: ''
      },
      formRules: {
        title: [
          { required: true, message: '请填写新闻标题', trigger: ['blur'] }
        ],
        content: [
          { required: true, message: '请填写新闻内容', trigger: ['blur'] }
        ],
        imageUrl: [
          { required: true, message: '请上传一张图片', trigger: ['blur', 'change'] }
        ]
      },
      uploadAction: API.UPLOAD_UPLOADIMG,
      fileList: [],
      dialogVisible: false,
      dialogType: 'add',
      bannerDialogTitle: '新增新闻',
      dialogImgVisible: false,
      dialogImageUrl: '',
      saveLoading: false
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created () {
    this.saveAdminInfo()
    // this.getBanners()
    this.getNews()
  },
  methods: {
    ...mapActions(['saveAdminInfo']),
    // 查询Banner
    getNews () {
      this.loading = true
      return this.axios.post(API.NEWS_GETNEWS, {}).then((res) => {
        this.newsList = res.data.data
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
      this.bannerDialogTitle = '新增新闻'
      this.dialogVisible = true
    },
    // 显示修改弹窗
    editRow (row) {
      this.dialogType = 'edit'
      this.bannerDialogTitle = '修改新闻'
      this.form = {
        id: row.id,
        title: row.title,
        content: row.content,
        imageUrl: row.imageUrl,
        url: row.url
      }
      this.fileList = [
        { name: '', url: row.imageUrl }
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
      this.form.imageUrl = response.data.data
    },
    // 删除上传图片
    uploadRemove (file, fileList) {
      this.form.imageUrl = ''
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
            await this.axios.post(API.NEWS_INSERTNEWS, this.form).then(res => {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              isSuccess = true
              this.getNews()
            }).catch(() => { })
          } else if (this.dialogType === 'edit') {
            await this.axios.post(API.NEWS_UPDATENEWS, this.form).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              isSuccess = true
              this.getNews()
            }).catch(() => { })
          }
          if (isSuccess) {
            this.form = {
              id: '',
              title: '',
              content: '',
              imageUrl: '',
              url: ''
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
      this.$confirm('确定删除这个新闻吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(API.NEWS_DELETENEWS, { id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getNews()
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
