<template>
  <div id="role">
    <el-row class="table-row">
      <el-table :data="roleList" border :loading="loading">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow(scope.row.id)">分配菜单权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" width="750px" top="80px" title="菜单权限管理" center>
      <el-tree
        ref="tree"
        :data="menuList"
        show-checkbox
        check-strictly
        :props="defaultProps"
        node-key="id"
        :expand-on-click-node="false"
        :default-checked-keys="showList"
        :render-content="renderContent">
      </el-tree>
      <div slot="footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" :loading="saveLoading" @click="editMenu(rowId)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/api.js'
// import { regionDataPlus } from 'element-china-area-data'
// import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      menuList: [],
      showList: [],
      defaultProps: {
        children: 'menus',
        label: 'menuName'
      },
      rowId: ''
    }
  },
  created () {
    this.getRole()
  },
  methods: {
    // 查询role
    getRole () {
      this.loading = true
      return this.axios.post(API.ADMINQUERY_ROLELIST, {}).then((res) => {
        this.roleList = res.data.data
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    editRow (id) {
      this.rowId = id
      this.loading = true
      this.menuList = []
      this.showList = []
      return this.axios.post(API.ADMINQUERY_MENULISTBYROLEID, { roleId: id }).then((res) => {
        let allMenu = res.data.data.allMenu
        let myMenu = res.data.data.myMenu
        allMenu.forEach(element => {
          if (element.menuLevel === 1) {
            this.menuList.push(element)
          }
          myMenu.forEach(item => {
            if (element.id === item.id) {
              this.showList.push(element.id)
            }
          })
        })
        this.dialogVisible = true
        this.$nextTick(function () {
          this.$refs.tree.setCheckedKeys(this.showList)
        })
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    async editMenu (id) {
      let menu = []
      let checkedKey = this.$refs.tree.getCheckedKeys()
      let getCheckedNodes = this.$refs.tree.getCheckedNodes()
      getCheckedNodes.forEach(item => {
        menu.push(item.id)
        if (item.parentMenuId && checkedKey.indexOf(item.parentMenuId) === -1) {
          menu.push(item.parentMenuId)
        }
      })
      // menu = new Set(menu)
      let array = new Set()
      menu.map(x => array.add(x))
      console.log(array)
      let paramList = []
      await array.forEach(element => {
        paramList.push({ id: element })
      })
      // console.log(menu)
      return this.axios.post(API.ADMINEDIT_MENULISTBYROLEID, { roleId: id, menus: paramList }).then((res) => {
        this.dialogVisible = false
        this.loading = false
      }).catch(() => { this.loading = false })
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
