<template>
  <div>
    <el-tree
      :data="menuList"
      :props="defaultProps"
      node-key="id"
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>

    <el-dialog :title="bannerDialogTitle" :visible.sync="dialogVisible" center width="600px" custom-class="banner-dialog">
      <el-form :model="form" :rules="formRules" ref="menuForm" label-width="80px">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" :loading="saveLoading" @click="submitForm('menuForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogAddVisible" width="750px" top="80px" title="添加菜单">
      <el-form :model="addForm" :rules="addFormRules" ref="addMenuForm" label-width="80px">
        <el-form-item label="上级菜单">
          <el-input v-model="addForm.parentMenuName" disabled></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="addForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单描述" prop="menuUrl">
          <el-input v-model="addForm.menuUrl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dialogAddVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" :loading="saveLoading" @click="submitAddForm('addMenuForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from '../api/api.js'
export default {
  data () {
    return {
      menuList: [],
      defaultProps: {
        children: 'menus',
        label: 'menuName'
      },
      form: {
        menuName: '',
        id: ''
      },
      dialogVisible: false,
      dialogAddVisible: false,
      formRules: {
        menuName: { required: true, message: '请填写菜单名称', trigger: ['blur'] }
      },
      addFormRules: {
        menuName: { required: true, message: '请填写菜单名称', trigger: ['blur'] },
        menuUrl: [
          { required: true, message: '请填写菜单描述', trigger: ['blur'] },
          { pattern: /^[a-z]+$/i, message: '菜单描述格式错误（应为纯英文）', trigger: ['blur'] }
        ]
      },
      addForm: {
        parentMenuId: '',
        parentMenuName: '',
        menuName: '',
        menuLevel: '',
        menuUrl: ''
      },
      saveLoading: false
    }
  },
  created () {
    this.getMenus()
  },
  methods: {
    getMenus () {
      this.loading = true
      this.menuList = []
      this.axios.post(API.ADMINQUERY_MENULIST, {}).then((res) => {
        let data = res.data.data
        data.forEach(element => {
          if (element.menuLevel === 1) {
            this.menuList.push(element)
          }
        })
        this.loading = false
      }).catch(() => { this.loading = false })
    },

    renderContent (h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button type="warning" size="mini" icon="el-icon-edit" on-click={ () => this.append(data) }>添加</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" on-click={ () => this.edit(data) }>修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>)
    },

    append (data) {
      this.addForm = {
        parentMenuId: data.id,
        parentMenuName: data.menuName,
        menuLevel: data.menuLevel + 1
      }
      this.dialogAddVisible = true
    },

    async submitAddForm (addMenuForm) {
      this.$refs[addMenuForm].validate(async valid => {
        if (valid) {
          let isSuccess = false
          this.saveLoading = true
          await this.axios.post(API.ADMINADD_MENULIST, this.addForm).then(res => {
            isSuccess = true
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getMenus()
          }).catch(() => {})
          if (isSuccess) {
            this.addForm = {
              parentMenuId: '',
              parentMenuName: '',
              menuName: '',
              menuLevel: '',
              menuUrl: ''
            }
            this.saveLoading = false
            this.dialogAddVisible = false
          }
        } else {
          return false
        }
      })
    },

    edit (data) {
      this.dialogType = 'edit'
      this.bannerDialogTitle = '修改菜单信息'
      this.form = {
        id: data.id,
        menuName: data.menuName
      }
      this.dialogVisible = true
    },

    remove (node, data) {
      this.$confirm('确定删除这个菜单吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(API.ADMINDELETE_MENULIST, { menuId: data.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getMenus()
        }).catch(() => { })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    async submitForm (menuForm) {
      this.$refs[menuForm].validate(async valid => {
        if (valid) {
          let isSuccess = false
          this.saveLoading = true
          await this.axios.post(API.ADMINEDIT_MENULIST, this.form).then(res => {
            isSuccess = true
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getMenus()
          }).catch(() => {})
          if (isSuccess) {
            this.form = {
              id: '',
              menuName: ''
            }
            this.saveLoading = false
            this.dialogVisible = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.el-button--mini, .el-button--mini.is-round{
  padding: 5px 10px;
}
</style>
