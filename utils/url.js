 
var url = 'https://circledemo.myctu.cn:8443/';//测试
var url2 = 'https://api.wechat800.cn/yuanlin/interface/';//正式

var urlObj = {
  getOpenId: url + 'tca-wechat/common/getSessionKey',//获取openId
  saveOpenId: url + 'UserInfo/login_openid',//上传openId
  
  signInManage: url + 'tca-wechat/admin/checkSignIsStart',//查询是否开启签到接口
  goSignInManage: url + 'tca-wechat/admin/signStartByAdmin',//管理员开启签到接口
  signInfoInfo: url + 'tca-wechat/admin/getTrainSignInfo',//管理员查看签到详情接口
  signInPerson: url + 'tca-wechat/admin/getTrainUserInfo',//管理员查看已签到和未签到人员信息


  estimateInfo: url + 'tca-wechat/admin/searchTrainCourseAssessAll',//查询所有评估信息
  estimateUpdate: url + 'tca-wechat/admin/updateCourseAssessStatus',//管理员开启/关闭课程评估
  estimateUpdateQu: url + 'tca-wechat/admin/updateTrainQuestionnaireInfoStatus',//管理员开启/关闭问卷评估
  estimateNotAllSignIn: url + 'tca-wechat/admin/notEvaluatedUserList',//管理员获取未评估学员列表(整体、课程)
  estimateNotQSignIn: url + 'tca-wechat/admin/searchTrainUserQuestionnaireInfoAll',//管理员获取未评估学员列表(问卷)

  getEstimateAllInfo: url + 'tca-wechat/admin/getTrainAssessRecordByTrainId',//管理员查看整体满意度评估详情
  getStudentEstimateLib: url + 'tca-wechat/student/gettrainAssessList',//学员获取评估列表
  submitEstimate: url + 'tca-wechat/student/saveAssessInfo',//学员提交评估(整体、课程)



  getAdviceList: url + 'tca-wechat/admin/adviceList',//管理员查看学员反馈

  trainingCourseList: url + 'tca-wechat/common/list',//获取培训班列表

  getUserId: url + 'tca-wechat/common/loginValidate',//验证微信用户是否绑定




  getPersonalInfoUrl: url + 'tca-wechat/admin/getUserinfoById',//获取用户信息

  studentSignIn: url + 'tca-wechat/student/stuSignup',//学员签到接口
  studentSignInInfo: url + 'tca-wechat/student/getStuSign',//学员查看签到详情接口

  getSchedule: url + 'tca-wechat/student/getTrainScheList',//获取日程列表

  getUserInfoUrl: url + 'tca-wechat/common/getUserInfo',//解密微信用户信息
    
  getBinding: url + 'tca-wechat/common/binding',//微信账号绑定


  inviteCode: url + 'tca-wechat/student/trainIdByIndex',//邀请码搜索
  trainingInfo: url + 'tca-wechat/student/getExtraInfo',//查询培训班详情
  personInfo: url + 'tca-wechat/student/getUserinfoById',//报名搜索获取个人信息

  enrollOkUrl: url + 'tca-wechat/student/commitTrainUserInfo',//确认报名
  reviseInfo: url + 'tca-wechat/student/updateUserinfo',//修改个人信息
  cancelEnroll: url + 'tca-wechat/student/deleteTrainUserInfo',//取消报名
  studentFeedback: url + 'tca-wechat/admin/adviceList',//管理员查看学员反馈

  publishNoticeUrl: url + 'tca-wechat/admin/noticePost',//发布公告
  noticeLibUrl: url + 'tca-wechat/admin/getNoticeList',//获取公告列表


  gotoTraining: url + 'tca-wechat/common/newClassInfo',//进入指定培训班

  


  ossImageUrl: 'http://yucha.oss-cn-beijing.aliyuncs.com/',

}

module.exports = {
  urlApi: urlObj
}