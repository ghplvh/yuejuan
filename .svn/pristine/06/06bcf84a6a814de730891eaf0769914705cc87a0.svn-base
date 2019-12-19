<template>
  <div id="person-manager">
    <el-row class="info-title">
      <el-col :span="18" class="school-name">{{schoolInfo ? schoolInfo.schoolName : '学校'}}</el-col>
      <el-col :span="6" class="opra-video"><a href="#"><i class="el-icon-caret-right"></i><span>操作视频</span></a></el-col>
    </el-row>
    <el-tabs class="person-info" v-model="activeName">
      <el-tab-pane label="学生信息" name="student" v-if="this.menuList.includes('studentContent')">
        <el-row class="opra-row">
          <el-upload :on-success="uploadSuccessStudent" :on-progress="uploadProgress" :on-error="uploadError" :action="studentUploadUrl" :data="{'schoolNumber': schoolNumber}" accept=".xls,.xlsx" :show-file-list="false">
            <el-button icon="el-icon-upload2" plain v-if="this.menuList.includes('studentBulkImport')">批量导入</el-button>
          </el-upload>
          <el-button icon="el-icon-plus" plain @click="addStudent" v-if="this.menuList.includes('studentSingleAdd')">单个新增</el-button>
          <el-button icon="el-icon-download" plain @click="downloadMobanStudent()" v-if="this.menuList.includes('studentDownloadTheTemplate')">下载模板</el-button>
          <el-button icon="el-icon-download" plain @click="exportStudents()" v-if="this.menuList.includes('deriveStudentInformation')">导出学生信息</el-button>
          <!-- <el-button icon="el-icon-edit" plain @click="quickEditExamCode()">快速修改考号</el-button> -->
          <el-button icon="el-icon-delete" plain @click="delSelectionStudent()" v-if="this.menuList.includes('studentMuchChooseDelete')">多选删除</el-button>
        </el-row>
        <el-row class="filter-row">
          <el-col :span="2">筛选：</el-col>
          <el-col :span="7">
            <el-select size="medium" v-model="filterGradeStudent" value-key="id" @change="getClassByGrade()">
              <el-option :key="0" label="全部" :value="{}"></el-option>
              <el-option v-for="gra in gradeList" :key="gra.id" :label="gra.gradeName" :value="gra"></el-option>
            </el-select>
            <el-select size="medium" :disabled="!filterGradeStudent.id" value-key="id" v-model="filterClassStudent" @change="getStudentByClass()">
              <el-option :key="0" label="全部" :value="{}"></el-option>
              <el-option v-for="clazz in classListStu" :key="clazz.id" :label="clazz.className" :value="clazz"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="7" class="search-box">
            <span>共{{studentCount}}人</span>
            <el-input placeholder="请输入姓名/学号/学籍" v-model="searchInputStudent" size="medium">
              <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-table :data="tableDataStudent" @selection-change="selectionStudentChange" v-loading="loading" element-loading-text="拼命加载中..." border>
          <el-table-column type="selection" align="center" width="50px"></el-table-column>
          <el-table-column prop="studentName" label="姓名" align="center" min-width="100px"></el-table-column>
          <el-table-column prop="studentId" label="学号" align="center" min-width="170px"></el-table-column>
          <el-table-column prop="studentExamId" label="考号" align="center" min-width="150px"></el-table-column>
          <el-table-column prop="studentEnrollmentYear" label="入学年" align="center" min-width="150px"></el-table-column>
          <el-table-column prop="gradeNumber" label="年级" align="center" min-width="150"></el-table-column>
          <el-table-column prop="classNumber" label="班级" align="center" min-width="150"></el-table-column>
          <el-table-column label="操作" align="center" min-width="120px">
            <template slot-scope="scope">
              <el-button type="text" size="medium" plain @click="editStudentRow(scope.row)">编辑</el-button>
              <el-button class="danger-text" type="text" size="medium" plain @click="deleteStudentRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="page-box">
          <el-pagination background @prev-click="prevPageStudent" @next-click="nextPageStudent" @size-change="sizeChangeStudent" @current-change="currentChangeStudent" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="教师信息" name="teacher" v-if="this.menuList.includes('teacherContent')">
        <el-row class="opra-row">
          <el-upload :action="teacherUploadUrl" accept=".xls,.xlsx" :data="{schoolCode: schoolNumber}" :on-progress="uploadProgress" :on-error="uploadError" :on-success="uploadSuccessTeacher" :limit="1" :show-file-list="false">
            <el-button icon="el-icon-upload2" plain v-if="this.menuList.includes('teacherBulkImport')">批量导入</el-button>
          </el-upload>
          <el-button icon="el-icon-plus" plain @click="addTeacher" v-if="this.menuList.includes('teacherSingleAdd')">单个新增</el-button>
          <el-button icon="el-icon-download" plain @click="downloadMobanTeacher()" v-if="this.menuList.includes('teacherDownloadTheTemplate')">下载模板</el-button>
          <el-button icon="el-icon-download" plain @click="exportTeachers()" v-if="this.menuList.includes('deriveTeacherInformation')">导出教师信息</el-button>
          <el-button icon="el-icon-delete" plain @click="delPageTeacher()" v-if="this.menuList.includes('deleteAllTeacherInformation')">删除所有老师</el-button>
          <el-button icon="el-icon-delete" plain @click="delSelectionTeacher()" v-if="this.menuList.includes('teacherMuchChooseDelete')">多选删除</el-button>
        </el-row>
        <el-row class="filter-row">
          <el-col :span="2">筛选：</el-col>
          <el-col :span="7">
            <el-select size="medium" v-model="filterGradeTeacher" value-key="id" @change="getClassByGradeTeacher()">
              <el-option :key="0" label="全部" :value="{}"></el-option>
              <el-option v-for="gra in gradeList" :key="gra.id" :label="gra.gradeName" :value="gra"></el-option>
            </el-select>
            <el-select size="medium" :disabled="!filterGradeTeacher.id" value-key="id" v-model="filterClassTeacher" @change="getTeacherByClass()">
              <el-option :key="0" label="全部" :value="{}"></el-option>
              <el-option v-for="clazz in classListTea" :key="clazz.id" :label="clazz.className" :value="clazz"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7" class="search-box">
            <el-input placeholder="请输入姓名/联系电话" v-model="searchInputTeacher" size="medium">
              <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-table :data="tableDataTeacher" @selection-change="selectionChange" :span-method="teacherSpanMethod" v-loading="loading" border class="table-teacher">
          <el-table-column type="selection" align="center" width="50px"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center" min-width="100px"></el-table-column>
          <el-table-column label="角色" align="center" min-width="100px">
            <template slot-scope="scope">{{getRoleName(scope.row)}}</template>
          </el-table-column>
          <el-table-column prop="gradeName" label="年级" align="center" min-width="100px"></el-table-column>
          <el-table-column prop="className" label="所教班级" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="subjectName" label="所教学科" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="teacherMobile" label="联系电话" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="teacherEmail" label="邮箱" align="center" min-width="120px"></el-table-column>
          <!-- <el-table-column prop="col8" label="管理员" align="center" min-width="75px"></el-table-column> -->
          <el-table-column label="操作" align="center" min-width="180px">
            <template slot-scope="scope">
              <el-button type="text" size="medium" plain @click="editTeacherRow(scope.row)">编辑</el-button>
              <el-button class="danger-text" type="text" size="medium" plain @click="deleteTeacherRow(scope.row)">删除</el-button>
              <!-- <el-button type="text" size="medium" plain @click="editTeacherRow(scope.row)">设为管理员</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-row class="page-box">
          <el-pagination background @size-change="sizeChangeTeacher" @current-change="currentChangeTeacher" :current-page="currentPageTeacher" :page-sizes="[5, 10, 20, 30, 50, 100]" :page-size="pageSizeTeacher" layout="total, sizes, prev, pager, next, jumper" :total="totalTeacher"></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="年级管理" name="grade" v-if="this.menuList.includes('gradeManagementContent')">
        <div class="grade">
          <el-row>
            <el-col>
              <el-button class="add-grade" type="primary" size="medium" icon="el-icon-plus" @click="addGradeGroup" v-if="this.menuList.includes('addGrade')">添加年级组</el-button>
            </el-col>
          </el-row>
          <el-row class="grade-group" v-loading="loading">
            <el-row class="item" v-for="(grade,index) in gradeGroupList" :key="index">
              <el-row class="item-head" type="flex" justify="space-between" align="middle">
                <el-col :span="3">{{grade.gradeGroupName}}</el-col>
                <el-col :span="2.5">
                  <el-button type="text" icon="el-icon-edit" @click="editGradeGroup(index)">编辑</el-button>
                  <el-button class="danger-text" type="text" icon="el-icon-delete" @click="delGradeGroup(index)">删除</el-button>
                </el-col>
              </el-row>
              <el-row class="item-line"></el-row>
              <el-row class="item-body">
                <div class="item-body-list" v-for="(item,itemIndex) in grade.gradeList" :key="itemIndex">
                  <span class="grade-number">{{itemIndex + 1}}</span>
                  <span>{{item.gradeName}}</span>
                  <span class="line" v-if="itemIndex != (grade.gradeList.length - 1)">—————</span>
                </div>
              </el-row>
            </el-row>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="班级管理" name="class" v-if="this.menuList.includes('classManagementContent')">
        <div class="grade">
          <el-row class="classRow">
            <el-col :span="2">
              添加班级：
            </el-col>
            <el-col :span="4">
              <el-select v-model="classGradeName" size="medium" placeholder="请选择年级">
                <el-option v-for="grade in gradeList" :key="grade.id" :label="grade.gradeName" :value="grade.gradeName"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-input size="medium" v-model="className" placeholder="请输入班级名字"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="primary" size="medium" @click="addClass">添加</el-button>
            </el-col>
          </el-row>
          <el-row class="grade-group" v-loading="loading">
            <el-row class="item" v-for="(classs,index) in classList" :key="index">
              <el-row class="item-head" type="flex" justify="space-between" align="middle">
                <el-col :span="3">{{classs.gradeName}}</el-col>
              </el-row>
              <el-row class="item-line"></el-row>
              <el-row class="item-body rowDiv" type="flex" justify="start">
                <el-col :span="2" class="item-body-list spanDiv" v-for="(item,itemIndex) in classs.dcList" :key="itemIndex">
                  <span class="span">{{item.className}}班</span>
                </el-col>
              </el-row>
            </el-row>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="dialogTitleAdd" :visible.sync="dialogVisibleAdd" width="610px" top="14vh" center>
      <el-form :model="dialogFormAdd" :rules="dialogFormAddRules" ref="addStudentForm" label-width="120px">
        <el-form-item label="姓名" prop="studentName">
          <el-input v-model="dialogFormAdd.studentName" size="medium" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="dialogFormAdd.studentId" size="medium" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="学籍号">
          <el-input v-model="dialogFormAdd.studentRegisterId" size="medium" placeholder="请输入学籍号"></el-input>
        </el-form-item>
        <el-form-item label="考号">
          <el-input v-model="dialogFormAdd.studentExamId" size="medium" placeholder="请输入考号"></el-input>
        </el-form-item>
        <el-form-item label="入学年" prop="studentEnrollmentYear">
          <el-input v-model="dialogFormAdd.studentEnrollmentYear" size="medium" maxlength="4" placeholder="请输入入学年"></el-input>
        </el-form-item>
        <el-form-item label="学部">
          <el-input v-model="dialogFormAdd.schoolDivisions" size="medium" placeholder="请输入学部"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="gradeNumber">
          <el-select v-model="dialogFormAdd.gradeNumber" size="medium" placeholder="请选择年级">
            <el-option v-for="grade in gradeList" :key="grade.id" :label="grade.gradeName" :value="grade.gradeName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classNumber">
          <el-input v-model="dialogFormAdd.classNumber" size="medium" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="家长姓名">
          <el-input v-model="dialogFormAdd.studentParentsName" size="medium" placeholder="请输入家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="家长电话">
          <el-input v-model="dialogFormAdd.studentParentsMobile" size="medium" maxlength="11" placeholder="请输入家长电话"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisibleAdd = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitAddStudent('addStudentForm')" size="medium">添 加</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog title="快速修改学号" :visible.sync="dialogVisibleEdit" width="30%" top="14vh" center class="edit-code-dialog">
      <span class="edit-code-title">年级</span>
      <el-select v-model="editGrade" size="medium">
        <el-option key="全部" value="0" label="全部"></el-option>
      </el-select>
      <span slot="footer">
        <el-button @click="dowloadMoban" size="medium" plain>下载模板</el-button>
        <el-upload class="select-file">
          <el-button type="primary" @click="uploadMoban" size="medium">选择文件</el-button>
        </el-upload>
      </span>
    </el-dialog> -->
    <el-dialog :title="dialogTitleTeacher" :visible.sync="dialogVisibleTeacher" width="700px" top="14vh" center class="dialog-teacher">
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
    </el-dialog>
    <el-dialog :title="dialogTitleGrade" :visible.sync="dialogGradeGroupVisible" width="600px" top="14vh" center class="dialog-grade-group">
      <el-form :model="addGradeGroupForm" :rules="addGradeGroupFormRules" ref="addGradeGroupForm" label-width="120px" label-position="left">
        <el-form-item label="年级组名称" prop="gradeGroupName">
          <el-input v-model="addGradeGroupForm.gradeGroupName" size="medium"></el-input>
        </el-form-item>
        <el-form-item v-for="(grade,index) in addGradeGroupForm.grades" label="年级" :key="index + 'grade'" :prop="'grades.' + index" :rules="[{required:true,message:'年级不能为空',trigger:['blur','change']}]">
          <el-row>
            <el-col :span="2">
              <span class="grade-number">{{index + 1}}</span>
            </el-col>
            <el-col :span="15">
              <el-select v-model="addGradeGroupForm.grades[index]" size="medium">
                <el-option v-for="item in gradeList" :key="item.id" :label="item.gradeName" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-circle-plus" @click="addGrade()"></i>
              <i class="el-icon-remove" v-if="index > 0" @click="removeGrade(index)"></i>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitGradeGroup('addGradeGroupForm')">添加</el-button>
        <el-button @click="dialogGradeGroupVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      schoolInfo: {},
      activeName: 'student',
      studentUploadUrl: API.STUDENT_IMPORTSTUDENT,
      teacherUploadUrl: API.TEACHER_IMPORTTEACHERS,
      schoolNumber: '',
      gradeList: [],
      classListStu: [],
      filterGradeStudent: {},
      filterClassStudent: {},
      searchInputStudent: '',
      classListTea: [],
      filterGradeTeacher: {},
      filterClassTeacher: {},
      searchInputTeacher: '',
      subjectList: [],
      studentCount: 0,
      tableDataStudent: [],
      loading: false,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      roles: [],
      dataTeacher: [],
      tableDataTeacher: [],
      tableSpan: [],
      multiTeacherSelection: [],
      multiStudentSelection: [],
      pageSizeTeacher: 10,
      currentPageTeacher: 1,
      totalTeacher: 0,
      gradeGroupList: [],
      dialogTitleAdd: '',
      dialogVisibleAdd: false,
      dialogFormAdd: {
        schoolNumber: '',
        studentName: '',
        studentId: '',
        studentRegisterId: '',
        studentExamId: '',
        studentEnrollmentYear: '',
        schoolDivisions: '',
        gradeNumber: '',
        classNumber: '',
        studentParentsName: '',
        studentParentsMobile: ''
      },
      dialogFormAddRules: {
        studentName: [
          { required: true, message: '学生姓名不能为空', trigger: 'blur' }
        ],
        studentId: [
          { required: true, message: '学号不能为空', trigger: 'blur' }
        ],
        studentEnrollmentYear: [
          { required: true, message: '学生入学年不能为空', trigger: 'blur' }
        ],
        gradeNumber: [
          { required: true, message: '学生年级不能为空', trigger: ['blur', 'change'] }
        ],
        classNumber: [
          { required: true, message: '学生班级不能为空', trigger: 'blur' }
        ]
      },
      dialogVisibleEdit: false,
      editGrade: '',
      dialogVisibleTeacher: false,
      dialogTitleTeacher: '',
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
      },
      teacherClassList: [],
      dialogGradeGroupVisible: false,
      dialogTitleGrade: '添加年级组',
      dialogType: 'add',
      addGradeGroupForm: {
        schoolCode: '',
        gradeGroupName: '',
        grades: ['']
      },
      addGradeGroupFormRules: {
        gradeGroupName: [
          { required: true, message: '请输入年级组名称', trigger: 'blur' }
        ]
      },
      gradeMenuList: [],
      // 班级相关
      classGradeName: '',
      className: '',
      classList: []
    }
  },
  computed: {
    ...mapState(['adminInfo', 'menuList'])
  },
  created () {
    this.schoolNumber = this.adminInfo.teacherInfo.schoolCode
    // this.menuDispose(this.adminInfo.dmlist)
    this.getSchoolByCode()
    this.getGrade()
    this.getRoles()
    this.getStudentsBy()
    this.getTeachersBy()
    this.getExamSubject()
    this.getClassList()
  },
  methods: {
    // 根据用户学校schoolCode获取学校
    getSchoolByCode () {
      this.axios.post(API.SCHOOL_FINDBYCOMMON, { schoolCode: this.schoolNumber }).then(res => {
        this.schoolInfo = res.data.data[0]
      }).catch(() => { })
    },
    // 添加班级
    addClass () {
      if (!this.classGradeName) {
        this.$message.error('请选择年级!')
        return false
      }
      if (!this.className) {
        this.$message.error('请输入班级名!')
        return false
      }
      // 获取年级ID
      const gradeId = this.gradeList.filter(item => { return item.gradeName === this.classGradeName })[0].id
      console.log(gradeId)
      console.log(this.adminInfo)
      const param = {
        className: this.className,
        gradeId: gradeId,
        gradeName: this.classGradeName,
        schoolId: this.schoolNumber
      }
      this.axios.post(API.ADMIN_ADDCLASS, param).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$message.success('添加成功！')
          this.getClassList()
        }
      })
    },
    // 获取班级列表
    getClassList () {
      this.axios.post(API.ADMIN_GETCLASSLIST, { schoolId: this.schoolNumber }).then(res => {
        this.classList = res.data.data
        console.log(this.classList)
      })
    },
    // 正在导入
    uploadProgress (event, file, fileList) {
      this.loading = true
    },
    // 导入失败
    uploadError (err, file, fileList) {
      this.$message({
        message: err,
        type: 'error'
      })
    },
    search () {
      console.log(this.filterGradeStudent)
      console.log(this.filterClassStudent)
      console.log(this.searchInputStudent)
    },
    // 学生信息导入成功
    uploadSuccessStudent (response, file, fileList) {
      this.loading = false
      if (response.code === 0) {
        this.$message({
          message: '学生信息导入成功',
          type: 'success'
        })
        this.activeName = 'student'
        this.getStudentsBy()
      } else {
        this.$message({
          message: '学生信息导入失败:' + response.data.message,
          type: 'error'
        })
      }
    },
    // 教师信息导入成功
    uploadSuccessTeacher (response, file, fileList) {
      this.loading = false
      if (response.code === 0) {
        this.$message({
          message: '教师信息导入成功',
          type: 'success'
        })
        this.activeName = 'teacher'
        this.teachersBy()
      } else {
        this.$message({
          message: '教师信息导入失败:' + response.data.message,
          type: 'error'
        })
      }
    },
    // 监听学生表格选中
    selectionStudentChange (val) {
      this.multiStudentSelection = val
    },
    // 删除选中的学生
    delSelectionStudent () {
      let h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '你确定要永久删除'),
          h('span', { style: 'color: red' }, '当前选中的'),
          h('sapn', null, '学生信息吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.axios.post(API.STUDENT_DELSTUDENTS, this.multiStudentSelection).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getStudentsBy()
        }).catch(() => { })
      }).catch(() => { })
    },
    // 获取角色信息
    getRoles () {
      this.axios.get(API.ROLE_GETROLES).then(res => {
        this.roles = res.data.data
      }).catch(() => { })
    },
    // 根据ID获取角色名称
    getRoleName (row) {
      let role = this.roles.find(role => {
        return role.id === row.roleId
      })
      return role.roleName
    },
    // 获取所有考试科目
    getExamSubject () {
      this.axios.post(API.EXAM_FINDBYSUBJECTCOM, { schoolCode: this.schoolNumber }).then(res => {
        this.subjectList = res.data.data
      }).catch(() => { })
    },
    // 获取老师信息
    getTeachersBy () {
      this.loading = true
      let data = {
        pageIndex: this.currentPageTeacher,
        pageSize: this.pageSizeTeacher,
        schoolCode: this.schoolNumber
      }
      if (this.filterGradeTeacher.id) {
        data.gradeName = this.filterGradeTeacher.gradeName
      }
      if (this.filterClassTeacher.id) {
        data.className = this.filterClassTeacher.className
      }
      console.log(data)
      this.axios.post(API.TEACHER_TEACHERSBY, data).then(res => {
        let teacherData = res.data.data.list
        this.dataTeacher = teacherData
        this.tableDataTeacher = []
        teacherData.forEach(teacher => {
          teacher.rjrs.forEach(role => {
            this.tableDataTeacher.push({
              id: teacher.id,
              name: teacher.name,
              teacherMobile: teacher.teacherMobile,
              teacherEmail: teacher.teacherEmail,
              roleId: role.roleId,
              gradeName: role.gradeName,
              className: role.className,
              subjectName: role.subjectName
            })
          })
        })
        this.getTableSpan()
        this.totalTeacher = res.data.data.total
        this.loading = false
      }).catch(() => { })
    },
    // 把有相同ID的数据的index放到一起，第一个为需要跨行的行，数组长度为跨行行数
    getTableSpan () {
      this.tableSpan = []
      this.tableDataTeacher.forEach((item, index) => {
        if (this.tableSpan[item.id]) {
          this.tableSpan[item.id].push(index)
        } else {
          this.tableSpan[item.id] = []
          this.tableSpan[item.id].push(index)
        }
      })
    },
    // 删除当前页所有老师
    delPageTeacher () {
      this.$confirm('确定删除当前表格的所有教师信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        let ids = this.dataTeacher.map(item => {
          return { id: item.id }
        })
        this.axios.post(API.TEACHER_DELTEACHERS, ids).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getTeachersBy()
        }).catch(() => { })
      }).catch(() => { })
    },
    // 删除选中的老师
    delSelectionTeacher () {
      this.$confirm('确定删除当前选中的所有教师信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.axios.post(API.TEACHER_DELTEACHERS, this.multiTeacherSelection).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getTeachersBy()
        }).catch(() => { })
      }).catch(() => { })
    },
    // 老师表格跨行
    teacherSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if ([0, 1, 6, 7, 8].includes(columnIndex)) {
        if (rowIndex === this.tableSpan[row.id][0]) {
          return { rowspan: this.tableSpan[row.id].length, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    // 获取年级组信息
    getGradeGroup () {
      this.loading = true
      this.axios.post(API.GRADE_GETGRADESGROUP, { schoolCode: this.schoolNumber }).then(async res => {
        this.gradeGroupList = res.data.data
        if (this.gradeList.length > 0) {
          this.gradeGroupList.forEach(item => {
            item.gradeList = item.grades.split(',').map(id => {
              return this.getGradeById(id)
            })
          })
          this.loading = false
        }
      }).catch(() => { })
    },
    // 获取学校所有年级信息
    getGrade () {
      this.axios.post(API.GRADE_FINDBYCOMMON, { schoolCode: this.schoolNumber }).then(res => {
        this.gradeList = res.data.data
        this.getGradeGroup()
      }).catch(() => { })
    },
    // 学生筛选获取年级下的班级
    getClassByGrade () {
      if (!this.filterGradeStudent.id) {
        this.filterClassStudent = {}
      }
      this.axios.post(API.DCCLASS_FINDBYGRADEID + '/' + this.filterGradeStudent.id).then(res => {
        this.classListStu = res.data.data
        this.currentPage = 1
        this.getStudentsBy()
      }).catch(() => { })
    },
    getStudentByClass () {
      this.currentPage = 1
      this.getStudentsBy()
    },
    // 教师筛选获取年级下的班级
    getClassByGradeTeacher () {
      if (!this.filterGradeTeacher.id) {
        this.filterClassTeacher = {}
        this.axios.post(API.DCCLASS_FINDBYGRADEID + '/' + this.schoolNumber).then(res => {
          this.classListTea = res.data.data
          this.currentPageTeacher = 1
          this.getTeachersBy()
        }).catch(() => { })
      } else {
        this.axios.post(API.DCCLASS_FINDBYGRADEID + '/' + this.filterGradeTeacher.id).then(res => {
          this.classListTea = res.data.data
          this.currentPageTeacher = 1
          this.getTeachersBy()
        }).catch(() => { })
      }
    },
    getTeacherByClass () {
      this.currentPageTeacher = 1
      this.getTeachersBy()
    },
    // 根据条件获取学校学生信息
    getStudentsBy () {
      this.loading = true
      let data = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        schoolNumber: this.schoolNumber
      }
      if (this.filterGradeStudent.id) {
        data.gradeId = this.filterGradeStudent.id
      }
      if (this.filterClassStudent.id) {
        data.classId = this.filterClassStudent.id
      }
      this.axios.post(API.STUDENT_GETSTUDENTSBY, data).then(res => {
        this.tableDataStudent = res.data.data.list
        this.total = res.data.data.total
        this.studentCount = res.data.data.total
        this.loading = false
      }).catch(() => { })
    },
    // 教师信息获取年级下的班级信息
    getGradeClass (index) {
      let grade = this.addTeacherForm.rjrs[index].gradeName
      this.axios.post(API.DCCLASS_FINDBYGRADEID + '/' + grade.id).then(res => {
        // 直接使用下标插入数组数据不是响应式的双向绑定
        this.$set(this.teacherClassList, index, res.data.data)
      }).catch(() => { })
    },
    // 根据年级ID获取年级信息
    getGradeById (id) {
      return this.gradeList.find(item => {
        return item.id === id
      })
    },
    // 删除年级组
    delGradeGroup (index) {
      let gradeGroup = this.gradeGroupList[index]
      this.$confirm('此操作将永久删除该年级组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.axios.post(API.GRADE_DELGRADEGROUP, { id: gradeGroup.id }).then((result) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getGradeGroup()
        }).catch(() => { })
      })
    },
    // 编辑年级组
    editGradeGroup (index) {
      this.dialogTitleGrade = '编辑年级组'
      this.dialogType = 'edit'
      let gradeGroup = this.gradeGroupList[index]
      this.addGradeGroupForm = {
        id: gradeGroup.id,
        schoolCode: gradeGroup.schoolCode,
        gradeGroupName: gradeGroup.gradeGroupName,
        grades: gradeGroup.grades.split(',')
      }
      this.dialogGradeGroupVisible = true
    },
    // 单个新增学生
    submitAddStudent (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'add') {
            console.log(this.dialogFormAdd)
            for (let i = 0; i < this.gradeList.length; i++) {
              if (this.dialogFormAdd.gradeNumber === this.gradeList[i].gradeName) {
                this.dialogTitleAdd.gradeId = this.gradeList[i].id
              }
            }
            console.log()
            // this.axios.post(API.STUDENT_ADDSTUDENT, this.dialogFormAdd).then(res => {
            //   this.$message({
            //     message: '新增学生信息成功',
            //     type: 'success'
            //   })
            //   this.$refs[formName].resetFields()
            //   this.dialogVisibleAdd = false
            //   this.getStudentsBy()
            // }).catch(() => { })
          }
          if (this.dialogType === 'edit') {
            this.axios.post(API.STUDENT_UPDATESTUDENT, this.dialogFormAdd).then(res => {
              this.$message({
                message: '修改学生信息成功',
                type: 'success'
              })
              this.dialogVisibleAdd = false
              this.getStudentsBy()
            }).catch(() => { })
          }
        } else {
          return false
        }
      })
    },
    // 修改学生每页显示条数
    sizeChangeStudent (size) {
      this.pageSize = size
      this.getStudentsBy()
    },
    // 学生直接跳页
    currentChangeStudent (currentPage) {
      this.currentPage = currentPage
      this.getStudentsBy()
    },
    // 上一页学生
    prevPageStudent (val) {
      this.currentPage = val
      this.getStudentsBy()
    },
    // 下一页学生
    nextPageStudent (val) {
      this.currentPage = val
      this.getStudentsBy()
    },
    // 修改教师每页显示条数
    sizeChangeTeacher (size) {
      this.pageSizeTeacher = size
      this.getTeachersBy()
    },
    // 教师直接跳页
    currentChangeTeacher (currentPage) {
      this.currentPageTeacher = currentPage
      this.getTeachersBy()
    },
    // 上一页教师
    prevPageTeacher (val) {
      this.currentPageTeacher = val
      this.getTeachersBy()
    },
    // 下一页教师
    nextPageTeacher (val) {
      this.currentPageTeacher = val
      this.getTeachersBy()
    },
    // 显示添加学生的弹窗
    addStudent () {
      this.dialogTitleAdd = '添加学生'
      this.dialogFormAdd = {
        schoolNumber: this.schoolNumber,
        studentName: '',
        studentId: '',
        studentRegisterId: '',
        studentExamId: '',
        studentEnrollmentYear: '',
        schoolDivisions: '',
        gradeNumber: '',
        classNumber: '',
        studentParentsName: '',
        studentParentsMobile: ''
      }
      this.dialogVisibleAdd = true
    },
    // 编辑学生（行）信息
    editStudentRow (row) {
      this.dialogTitleAdd = '编辑学生'
      this.dialogType = 'edit'
      this.dialogFormAdd = {
        id: row.id,
        schoolNumber: row.schoolNumber,
        studentName: row.studentName,
        studentId: row.studentId,
        studentRegisterId: row.studentRegisterId,
        studentExamId: row.studentExamId,
        studentEnrollmentYear: row.studentEnrollmentYear,
        schoolDivisions: row.schoolDivisions,
        gradeNumber: row.gradeNumber,
        classNumber: row.classNumber,
        studentParentsName: row.studentParentsName,
        studentParentsMobile: row.studentParentsMobile
      }
      this.dialogVisibleAdd = true
    },
    // 删除学生（行）信息
    deleteStudentRow (row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '你确定要永久删除'),
          h('span', { style: 'color: red' }, '当前'),
          h('sapn', null, '学生吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.axios.post(API.STUDENT_DELSTUDENT, { id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getStudentsBy()
        }).catch(() => { })
      }).catch(() => { })
    },
    // 显示快速修改考号弹窗
    quickEditExamCode () {
      this.dialogVisibleEdit = true
    },
    // 显示添加老师弹窗
    addTeacher () {
      this.dialogTitleTeacher = '添加老师'
      this.dialogVisibleTeacher = true
      this.dialogType = 'add'
      this.addTeacherForm = {
        name: '',
        teacherMobile: '',
        teacherEmail: '',
        rjrs: [{
          roleId: '',
          gradeName: '',
          className: [],
          subjectName: ''
        }]
      }
    },
    // 添加老师
    submitAddTeacherForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = Object.assign({}, this.addTeacherForm)
          form.schoolCode = this.schoolNumber
          form.rjrs.forEach(item => {
            delete item.createTime
            delete item.modifyTime
            item.userId = form.id
            item.gradeName = item.gradeName ? item.gradeName.gradeName : ''
            item.className = item.className.length > 0 ? item.className.join(',') : ''
          })
          console.log(form)
          if (this.dialogType === 'add') {
            this.axios.post(API.TEACHER_ADDTEACHER, form).then(res => {
              this.$message({
                message: '新增教师信息成功',
                type: 'success'
              })
              this.dialogVisibleTeacher = false
              this.getTeachersBy()
            }).catch(() => { })
          }
          if (this.dialogType === 'edit') {
            this.axios.post(API.TEACHER_UPDATETEACHER, form).then(res => {
              this.$message({
                message: '修改教师信息成功',
                type: 'success'
              })
              this.dialogVisibleTeacher = false
              this.getTeachersBy()
            }).catch(() => { })
          }
        } else {
          return false
        }
      })
    },
    // 添加角色
    addRole () {
      this.addTeacherForm.rjrs.push({
        roleId: '',
        gradeName: '',
        className: [],
        subjectName: ''
      })
    },
    // 删除角色
    removeRole (index) {
      this.addTeacherForm.rjrs.splice(index, 1)
    },
    // 编辑老师（行）信息
    editTeacherRow (row) {
      this.dialogTitleTeacher = '编辑老师'
      this.dialogType = 'edit'
      let teacher = this.dataTeacher.find(item => {
        return row.id === item.id
      })
      this.addTeacherForm = {
        id: teacher.id,
        name: teacher.name,
        teacherMobile: teacher.teacherMobile,
        teacherEmail: teacher.teacherEmail,
        rjrs: teacher.rjrs.map(item => {
          if (item.className === '' || item.className === null) {
            item.className = []
          } else {
            item.className = (typeof item.className === 'string') ? item.className.split(',') : item.className
          }
          item.gradeName = this.gradeList.find(grade => {
            return grade.gradeName === item.gradeName
          })
          return item
        })
      }
      this.dialogVisibleTeacher = true
    },
    // 删除老师（行）信息
    deleteTeacherRow (row) {
      this.$confirm('你确定要永久删除当前老师信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(API.TEACHER_DELTEACHER, { id: row.id, schoolCode: this.schoolCode }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getTeachersBy()
        }).catch(() => { })
      }).catch(() => { })
    },
    // 监听教师表格选中
    selectionChange (val) {
      this.multiTeacherSelection = val
    },
    // 显示添加年级组弹窗
    addGradeGroup () {
      this.dialogType = 'add'
      this.dialogGradeGroupVisible = true
    },
    // 添加年级
    addGrade () {
      this.addGradeGroupForm.grades.push('')
    },
    // 删除年级
    removeGrade (index) {
      this.addGradeGroupForm.grades.splice(index, 1)
    },
    // 添加年级组
    submitGradeGroup (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'add') {
            this.addGradeGroupForm.schoolCode = this.schoolNumber
            this.axios.post(API.GRADE_ADDGRADEGROUP, {
              schoolCode: this.addGradeGroupForm.schoolCode,
              gradeGroupName: this.addGradeGroupForm.gradeGroupName,
              grades: this.addGradeGroupForm.grades.join(',')
            }).then(res => {
              this.$message({
                message: '新增年级组成功',
                type: 'success'
              })
              this.dialogGradeGroupVisible = false
              this.getGradeGroup()
            }).catch(() => { })
          }
          if (this.dialogType === 'edit') {
            this.addGradeGroupForm.schoolCode = this.schoolNumber
            this.axios.post(API.GRADE_UPDATEGRADEGROUP, {
              id: this.addGradeGroupForm.id,
              schoolCode: this.addGradeGroupForm.schoolCode,
              gradeGroupName: this.addGradeGroupForm.gradeGroupName,
              grades: this.addGradeGroupForm.grades.join(',')
            }).then(res => {
              this.$message({
                message: '修改年级组信息成功',
                type: 'success'
              })
              this.dialogGradeGroupVisible = false
              this.getGradeGroup()
            }).catch(() => { })
          }
        } else {
          return false
        }
      })
    },
    // 下载模版
    downloadMobanStudent () {
      this.axios.post(API.ADMIN_STUDENTDOWNLOAD, {}, { responseType: 'arraybuffer' }, { headers: { 'content-type': 'application/vnd.ms-excel;charset=utf-8' } }).then(res => {
        console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '都成好易学学生导入模板.xls')
        document.body.appendChild(link)
        link.click()
      })
    },
    downloadMobanTeacher () {
      this.axios.post(API.ADMIN_TEACHERDOWNLOAD, {}, { responseType: 'arraybuffer' }, { headers: { 'content-type': 'application/vnd.ms-excel;charset=utf-8' } }).then(res => {
        console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '都成好易学教师导入模板.xls')
        document.body.appendChild(link)
        link.click()
      })
    },
    // 导出信息
    exportStudents () {
      let url = API.STUDENT_EXPORTSTUDENTS + '?schoolNumber=' + this.schoolNumber
      if (this.filterGradeStudent.id) {
        url = API.STUDENT_EXPORTSTUDENTS + '?schoolNumber=' + this.schoolNumber + '&gradeId=' + this.filterGradeStudent.id
      }
      if (this.filterClassStudent.id) {
        url = API.STUDENT_EXPORTSTUDENTS + '?schoolNumber=' + this.schoolNumber + '&classId=' + this.filterClassStudent.id
      }
      if (this.filterGradeStudent.id && this.filterClassStudent.id) {
        url = API.STUDENT_EXPORTSTUDENTS + '?schoolNumber=' + this.schoolNumber + '&gradeId=' + this.filterGradeStudent.id + '&classId=' + this.filterClassStudent.id
      }
      this.axios.post(url, {}, { responseType: 'arraybuffer' }, { headers: { 'content-type': 'application/vnd.ms-excel;charset=utf-8' } }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `学生信息.xls`)
        document.body.appendChild(link)
        link.click()
      })
    },
    exportTeachers () {
      let url = API.TEACHER_EXPORTTEACHERS + '?schoolCode=' + this.schoolNumber
      if (this.filterGradeStudent.id) {
        url = API.TEACHER_EXPORTTEACHERS + '?schoolCode=' + this.schoolNumber + '&gradeId=' + this.filterGradeStudent.id
      }
      if (this.filterClassStudent.id) {
        url = API.TEACHER_EXPORTTEACHERS + '?schoolCode=' + this.schoolNumber + '&classId=' + this.filterClassStudent.id
      }
      if (this.filterGradeStudent.id && this.filterClassStudent.id) {
        url = API.TEACHER_EXPORTTEACHERS + '?schoolCode=' + this.schoolNumber + '&gradeId=' + this.filterGradeStudent.id + '&classId=' + this.filterClassStudent.id
      }
      this.axios.post(url, {}, { responseType: 'arraybuffer' }, { headers: { 'content-type': 'application/vnd.ms-excel;charset=utf-8' } }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `教师信息.xls`)
        document.body.appendChild(link)
        link.click()
      })
    },
    download (apiUrl) {
      const elink = document.createElement('a')
      elink.style.display = 'none'
      elink.target = '_blank'
      elink.href = apiUrl
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    }
  }
}
</script>
<style lang="scss">
.rowDiv {
  flex-wrap: wrap;
}
.spanDiv {
  border: 1px solid #409EFF;
  padding: 4px;
  border-radius: 5px;
  margin: 2px;
  text-align: center;
}
.classRow {
  padding: 10px;
  line-height: 36px;
  font-size: 14px;
}

#person-manager {
  min-width: 1200px;
  margin: 0 auto;
  .info-title {
    width: 1200px;
    height: 56px;
    line-height: 56px;
    background-color: #ffffff;
    margin: 0 auto;
    .school-name {
      padding-left: 25px;
    }
    .opra-video {
      text-align: right;
      padding-right: 30px;
      a {
        opacity: 0.5;
        border: 1px solid #ffa100;
        border-radius: 100px;
        padding: 6px 20px 6px 15px;
        color: #ffa100;
      }
    }
  }
  .el-tabs {
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0 30px;
    padding-bottom: 20px;
    background-color: #ffffff;
    width: 1200px;
    .el-tabs__header {
      margin-bottom: 6px;
    }
    .el-tabs__item {
      font-family: "MicrosoftYaHei";
      color: #353b45;
      font-size: 14px;
      height: 45px;
      line-height: 45px;
    }
    .el-tabs__nav-wrap:after {
      background-color: #f0f3f7;
      height: 1px;
    }
    .opra-row {
      height: 40px;
      margin-bottom: 6px;
      div {
        display: inline-block;
      }
      .el-upload {
        color: #989898;
        margin-right: 10px;
      }
      .el-button {
        border-color: transparent;
        padding-left: 0;
        padding-right: 0;
      }
    }
    .filter-row {
      font-size: 14px;
      line-height: 36px;
      .el-col {
        &:nth-child(2) {
          .el-select {
            width: 124px;
            &:first-child {
              margin-left: -52px;
              margin-right: 10px;
            }
          }
        }
        &:nth-child(4) {
          .el-select {
            width: 140px;
            margin-left: -20px;
          }
        }
      }
      .search-box {
        float: right;
        text-align: right;
        margin-bottom: 20px;
        .el-input {
          width: 230px;
          padding-left: 10px;
          .el-input-group__append {
            background-color: #2097ff;
            border: 1px solid #2097ff;
            color: #ffffff;
          }
        }
      }
    }
    .el-table {
      th {
        background: #f3f6fa;
        padding: 8px 0;
        font-weight: normal;
        color: #333;
      }
      td {
        padding: 0;
        font-size: 12px;
      }
      .el-button {
        border-color: transparent;
        background: 0 0;
        padding-left: 0;
        padding-right: 0;
      }
    }
    .table-teacher {
      td {
        height: 40px;
      }
    }
    .page-box {
      text-align: center;
      margin-top: 20px;
    }
    .danger-text {
      color: #fb6b6e;
    }
    .grade {
      padding-left: 12px;
      min-height: 500px;
      .grade-group {
        padding-bottom: 8px;
      }
      .el-row {
        .add-grade {
          font-size: 14px;
          margin-top: 15px;
        }
        .item {
          margin-top: 20px;
          box-shadow: 0 2px 8px 0 rgba(83, 158, 224, 0.23);
          border-radius: 9px;
          height: 140px;
          width: 1116px;
          margin-left: 1px;
          .item-head {
            padding: 0 49px 0 34px;
            height: 51px;
          }
          .item-line {
            height: 1px;
            background-color: #ecf0f4;
            margin-left: 29px;
            margin-right: 39px;
          }
          .item-body {
            padding: 0 34px;
            height: 89px;
            display: flex;
            align-items: center;
            .item-body-list {
              font-size: 14px;
              span {
                &:nth-child(2) {
                  margin-left: 10px;
                }
              }
              .line {
                color: #b6bac4;
                margin: 0 16px;
              }
            }
          }
        }
      }
    }
  }
  .grade-number {
    box-sizing: border-box;
    display: inline-block;
    width: 22px;
    height: 22px;
    color: #37a1ff;
    border: 1px solid #37a1ff;
    border-radius: 22px;
    text-align: center;
    line-height: 22px;
  }
}
.el-dialog {
  .el-dialog__body {
    padding-bottom: 5px;
    .el-form-item {
      margin-bottom: 20px;
      .el-input {
        width: 300px;
      }
      .el-select {
        width: 300px;
      }
      .el-button {
        width: 90px;
      }
      [class^="el-icon-"] {
        color: #2097ff;
        font-size: 18px;
        cursor: pointer;
      }
      .el-icon-circle-plus {
        margin-left: 20px;
      }
      .el-icon-remove {
        margin-left: 5px;
      }
    }
  }
}
.edit-code-dialog {
  .el-dialog__body {
    padding-top: 33px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    .edit-code-title {
      width: 60px;
      line-height: 30px;
      display: inline-block;
    }
    .el-select {
      width: 100%;
    }
  }
  .el-dialog__footer {
    text-align: center;
    .select-file {
      display: inline-block;
      margin-left: 20px;
    }
  }
}
.dialog-teacher {
  .el-dialog__body {
    .el-form {
      .el-input {
        width: 450px;
      }
      .el-radio-group {
        .el-radio {
          margin-left: 0;
          margin-right: 20px;
          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
      .grade-select {
        .el-input {
          width: 300px;
        }
      }
      .role-class {
        .el-checkbox {
          margin-left: 0;
          margin-right: 20px;
        }
      }
    }
  }
}
.dialog-grade-group {
  .el-dialog__body {
    .el-form-item {
      .el-input {
        width: 258px;
      }
      .el-form-item__content {
        .el-row {
          left: -35px;
          .el-select {
            width: 100%;
          }
        }
      }
    }
  }
  .el-dialog__footer {
    button {
      width: 90px;
      height: 34px;
      padding-top: 9px;
    }
  }
}
</style>
