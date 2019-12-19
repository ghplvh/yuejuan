import IP from './IPConfig'
// 接口二
const API = {
  /**
   * @description 根据教师id获取阅卷列表
   */
  APPEXAMEXAMINE_GETDCEXAMEXAMINEBYUSERID: '/appExamExamine/getDcExamExamineByUserId',
  /**
   * @description 根据教师获取审阅题块信息
   */
  APPEXAMEXAMINE_GETDCEXAMEXAMINEBLOCKBYUSERID: '/appExamExamine/getExamExamineBlockByUserId',
  /**
   * @description 根据题块id获取未审阅题块
   */
  APPEXAMEXAMINE_GETNOEXAMINENUMBYBLOCKID: '/appExamExamine/getNoExamineNumByBlockId',
  /**
   * @description 保存已阅题块
   */
  APPEXAMEXAMINE_SAVEANSWERSHEETBYANSWERSHEETID: '/appExamExamine/saveAnswersheetByAnswersheetId',
  /**
   *  @description 根据考试科目ID查询阅卷题块进度
   */
  ADMIN_GETBLOCKBYEXAMSUBJECTID: 'web/webExamExamine/getBlockByExamSubjectId',
  /**
   *  @description 根据考试科目ID查询阅卷题块进度
   */
  ADMIN_GETCLASSBYEXAMSUBJECTID: 'web/webExamExamine/getClassByExamSubjectId',
  /**
   *  @description 根据考试id获取学校列表
   */
  ADMIN_GETSCHOOLLIST: 'web/webExamExamine/getSchoolList',
  /**
   *  @description 根据考试科目id发布成绩
   */
  ADMIN_PUBLISHGRADEBYEXAMSUBJECTID: '/web/webExamExamine/publishGradeByExamSubjectId',
  /**
   *  @description 根据考试班级id发布成绩
   */
  ADMIN_PUBLISHGRADEBYEXAMCLASSID: '/web/webExamExamine/publishGradeByClassId'
}
Object.keys(API).map(key => {
  API[key] = IP.ANALYZE_IP + API[key]
})
export default API
