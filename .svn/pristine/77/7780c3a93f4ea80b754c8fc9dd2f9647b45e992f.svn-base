<template>
  <div id="manager">
    <el-tabs type="border-card">
      <el-tab-pane label="设置Banner" v-if="this.menuList.includes('setBannerContent')">
        <banner></banner>
      </el-tab-pane>
      <el-tab-pane label="设置新闻" v-if="this.menuList.includes('setNewsContent')">
        <news></news>
      </el-tab-pane>
      <el-tab-pane label="设置学校" v-if="this.menuList.includes('setSchoolContent')">
        <school></school>
      </el-tab-pane>
      <el-tab-pane label="设置角色权限" v-if="this.menuList.includes('setRolePermissions')">
        <role></role>
      </el-tab-pane>
      <!-- <el-tab-pane label="添加账号" v-if="this.dmlist.includes('setMenu')">
        <addAccountNumber></addAccountNumber>
      </el-tab-pane> -->
      <el-tab-pane label="菜单管理" v-if="this.menuList.includes('setMenu')">
        <menuList></menuList>
      </el-tab-pane>
      <el-tab-pane label="账号管理" v-if="this.menuList.includes('accountAdmin')">
        <accountAdmin></accountAdmin>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Banner from './Banner'
import News from './News'
import School from './School'
import Role from './Role'
import MenuList from './MenuList'
import AccountAdmin from './AccountAdmin'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  components: {
    Banner, News, School, Role, MenuList, AccountAdmin
  },
  computed: {
    ...mapState(['adminInfo', 'menuList'])
  },
  created () {
  }
}
</script>
<style lang="scss">
</style>
