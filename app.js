//app.js
var url = require('utils/url.js');
//var skip = require('utils/skip.js');
let network = require('utils/network.js');
App({
  onLaunch: function () {
    var that = this;
    that.globalData.urlApi = url.urlApi;
       
     //that.getNetWork(); //判断网络情况
     //that.onNetWork(); //监听网络状态
   
  },
  /**
   * 跳转
   */
  // navigateWx: function (that, url, parameterStrng, isJudgeNetWork){
  //   skip.navigateWx(that, url, parameterStrng, isJudgeNetWork);
  // },
  // redirectWx: function (that, url, parameterStrng, isJudgeNetWork){
  //   skip.redirectWx(that, url, parameterStrng, isJudgeNetWork);
  // },
  // switchTabWx: function (that, url, parameterStrng, isJudgeNetWork){
  //   skip.switchTabWx(that, url, parameterStrng, isJudgeNetWork);
  // },
  // reLaunchWx: function (that, url, parameterStrng, isJudgeNetWork){
  //   skip.reLaunchWx(that, url, parameterStrng, isJudgeNetWork);
  // },

  /**
   * 网络请求
   */
  requestGet: function (that, url, doSuccess, quantity, isLoading, doFail, doComplete){
    network.requestGet(that, url, doSuccess, quantity, isLoading, doFail, doComplete);
  },
  requestPost: function (that, url, parameter, doSuccess, quantity, isLoading, doFail, doComplete) {
    network.requestPost(that, url, parameter, doSuccess, quantity, isLoading, doFail, doComplete);
  },
  requestParameterGet: function(that, url, parameter, doSuccess, quantity, isLoading, doFail, doComplete) {
    network.requestParameterGET(that, url, parameter, doSuccess, quantity, isLoading, doFail, doComplete);
  },
  getOpenId:function(){//获取openId
    var that = this;
    wx.login({
      success: res => {
        console.log(res);

        var parameter = {
          code: res.code
        }
        that.requestPost(that, url.urlApi.getOpenId, parameter, function (resOp){
          if (resOp.data.code == 1) {
            that.globalData.openId = resOp.data.openId.openid;
            that.getUserInfo(); //获取用户微信个人信息
            
            if (that.openIdReadyCallback) {
              that.openIdReadyCallback(resOp.data.openId.openid)
            }
          }
        })
      }
    })
  },
  onNetWork:function(){
    var that = this;
    wx.onNetworkStatusChange(function (res) {
      if (res.isConnected) {
        that.globalData.isNetwork = true;

        if (!that.globalData.openId) {
          that.getOpenId();
        }
      } else {
        that.globalData.isNetwork = false;
        wx.showModal({
          title: '提示',
          content: '当前网络状态不佳，请检查您的网络',
          showCancel: false,
          confirmText: '我知道了',
          success: function (res) {
          }
        })
      }
    })
  },
  getNetWork:function(){

    var that = this;

    wx.getNetworkType({
      success: function(res) {
        if(res.networkType == 'none'){
          that.globalData.isNetwork = false;
        }

        that.getOpenId(); 
      },
    })
  },
  getUserInfo:function(){
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {

        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.getUserInfoData();
        }else{
          that.saveOpenId(that.globalData.openId);
        }
      }
    })
  },
  getUserInfoData:function(){
    var that = this;
    wx.getUserInfo({
      success: res => {
        console.log(res);
        // 可以将 res 发送给后台解码出 unionId
        that.globalData.userInfo = res.userInfo
        that.saveOpenId(that.globalData.openId, res.userInfo);
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    isNetwork: true,//判断网络状态
    urlApi: {},//api接口数组
    networkNum: 0,//判断当前请求第几个接口
    systemInfo: null,
    isUserInfo: false,
    imageUrl: 'https://api.wechat800.cn/huanbei_xcx/',
    trainId: 'ff80808167ca34b10167cac2b63a0004',
    userId: '5219499',
    estmatePro: {}
  },
  saveOpenId: function (openId, userInfo = null) {
    var that = this;
    var parameter = {
      openid: openId,
      nickname: userInfo ? userInfo.nickName : '',
      headimgurl: userInfo ? userInfo.avatarUrl : ''
    }
    that.requestPost(that, url.urlApi.saveOpenId, parameter, function (res) {

    })
  },
  trimKong: function (s) {

    return JSON.parse(trim(s));

    function trim(str) {
      str = str.replace(/^(\s|\u00A0)+/, '');
      for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
          str = str.substring(0, i + 1);
          break;
        }
      }
      return str;
    }
  }
})


/**
 * 
 *   "tabBar": {
    "color": "#aaa",
    "selectedColor": "#d1a46f",
    "borderStyle": "#ffffff",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "selectedIconPath": "images/tab/home0.png",
        "iconPath": "images/tab/home0.png",
        "pagePath": "pages/homepage/homepage",
        "text": "首页"
      },
      {
        "selectedIconPath": "images/tab/tj0.png",
        "iconPath": "images/tab/tj0.png",
        "pagePath": "pages/collage/collage",
        "text": "拼团"
      }
    ]
  }
 */