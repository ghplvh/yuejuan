<template>
  <div>
    <el-form :model="addTeacherForm" :rules="addTeacherFormRules" ref="addTeacherForm" label-width="110px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addTeacherForm.name" size="medium" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="teacherMobile">
        <el-input v-model="addTeacherForm.teacherMobile" size="medium" placeholder="请输入电话" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="teacherEmail" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
        <el-input v-model="addTeacherForm.teacherEmail" size="medium" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <template v-for="(role,index) in addTeacherForm.rjrs">
        <el-form-item :key="index+'role'" label="角色" :prop="'rjrs.' + index + '.roleId'" :rules="[{required: true, message: '角色'+(index+1)+'不能为空', trigger: ['blur', 'change']}]">
          <el-radio-group v-model="role.roleId">
            <template v-for="rl in roles">
              <el-radio v-if="rl.id <= 7" :key="rl.id" :label="rl.id">{{rl.roleName}}</el-radio>
            </template>
          </el-radio-group>
          <i class="el-icon-circle-plus" @click="addRole()"></i>
          <i class="el-icon-remove" v-if="index > 0" @click="removeRole(index)"></i>
        </el-form-item>
        <!--  -->
        <el-form-item v-if="role.roleId > 3" :key="index+'grade'" label-width="165px" label="年级" :prop="'rjrs.' + index + '.gradeName'" :rules="[{required: true, message: '角色'+(index+1)+'的年级不能为空', trigger: ['blur', 'change']}]">
          <el-select v-model="role.gradeName" value-key="id" size="medium" class="grade-select" @change="getGradeClass(index)">
            <el-option v-for="grade in gradeList" :key="grade.id" :label="grade.gradeName" :value="grade"></el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item v-if="role.roleId > 5" :key="index+'roleClass'" label-width="165px" label="班级" :prop="'rjrs.' + index + '.className'" :rules="[{required: true, message: '角色'+(index+1)+'的班级不能为空', trigger: ['blur', 'change']}]">
          <span style="color:red;" v-if="!role.gradeName">请先选择年级</span>
          <el-checkbox-group v-model="role.className" class="role-class" v-else>
            <el-checkbox v-for="roleClass in teacherClassList[index]" :key="roleClass.id" :label="roleClass.className">{{roleClass.className}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--  -->
        <el-form-item v-if="role.roleId === 7 || role.roleId === 5" :key="index+'subject'" label-width="165px" label="学科" :prop="'rjrs.' + index + '.subjectName'" :rules="[{required: true, message: '角色'+(index+1)+'的学科不能为空', trigger: ['blur', 'change']}]">
          <el-select v-model="role.subjectName" size="medium" class="grade-select">
            <el-option v-for="sub in subjectList" :key="sub.id" :label="sub.examSubjectDesc" :value="sub.examSubjectDesc"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer">
      <el-button type="primary" size="medium" @click="submitAddTeacherForm('addTeacherForm')">添加</el-button>
      <el-button size="medium" @click="dialogVisibleTeacher = false">取消</el-button>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addTeacherForm: {
        name: '',
        teacherMobile: '',
        teacherEmail: '',
        rjrs: [{
          roleId: '',
          gradeName: '',
          className: [],
          subjectName: ''
        }]
      },
      addTeacherFormRules: {
        name: [
          { required: true, message: '老师姓名不能为空', trigger: 'blur' }
        ],
        teacherMobile: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        teacherEmail: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  }
}
</script>
