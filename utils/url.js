 
var url = 'https://circledemo.myctu.cn:8443/';//测试
var url2 = 'https://api.wechat800.cn/yuanlin/interface/';//正式

var urlObj = {
  getOpenId: url + 'UserInfo/openid',//获取openId
  saveOpenId: url + 'UserInfo/login_openid',//上传openId
  
  signInManage: url + 'tca-wechat/admin/checkSignIsStart',//查询是否开启签到接口
  goSignInManage: url + 'tca-wechat/admin/signStartByAdmin',//管理员开启签到接口
  signInfoInfo: url + 'tca-wechat/admin/getTrainSignInfo',//管理员查看签到详情接口
  signInPerson: url + 'tca-wechat/admin/getTrainUserInfo',//管理员查看已签到和未签到人员信息


  estimateInfo: url + 'tca-wechat/admin/searchTrainCourseAssessAll',//查询所有评估信息
  estimateUpdate: url + 'tca-wechat/admin/updateCourseAssessStatus',//管理员开启/关闭课程评估
  estimateUpdateQu: url + 'tca-wechat/admin/updateTrainQuestionnaireInfoStatus',//管理员开启/关闭问卷评估

  ossImageUrl: 'http://yucha.oss-cn-beijing.aliyuncs.com/',

}

module.exports = {
  urlApi: urlObj
}