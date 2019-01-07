// pages/homepage/homepage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhone: true,
    isGetPhone: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../wxLogin/wxLogin',
          })

        }
      }
    })
    var that = this;

  wx.getStorage({
    key: 'userId',
    success:function(res){
      if(res.data == '-1'){
        if (app.globalData.unionId) {
          that.unionIdExit();
        } else {
          app.unionIdReadyCallback = res => {
            that.unionIdExit();
          }
        }
      }
    },
    fail:function(){
      
      if (app.globalData.unionId) {
        that.unionIdExit();
      } else {
        app.unionIdReadyCallback = res => {
          that.unionIdExit();
        }
      }
    }
  })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  btn_scan:function(){
    wx.scanCode({
      success:function(res){
        
      }
    })
  },
  unionIdExit:function(){
    var that = this;
    console.log(22);
    var parameter = {
      unionId: app.globalData.unionId,
      mobile: '18916807390'
    }

    app.requestPost(that, app.globalData.urlApi.getUserId, parameter, function (res) {
      console.log(res);

      if(res.data == -1){

        // wx.showModal({
        //   title: '提示',
        //   content: '未绑定手机号，是否绑定',
        //   success:function(res){
        //     if(res.confirm){
        //       that.getBindingPhone();
        //     }
        //   }
        // })
        that.btn_p();
      }else{
        app.globalData.userId = res.data;
        that.setStorage(res.data);
      }
    })
  },
  getBindingPhone:function(phone){
    var that = this;
    var parameter = {
      unionId: app.globalData.unionId,
      mobile: phone,
      openId: app.globalData.openId
    }

    app.requestPost(that, app.globalData.urlApi.getBinding, parameter, function (res) {
      that.setData({
        isPhone: true
      })
      if(res.data != '0'){
        if(res.data == '-1'){
            wx.showModal({
              title: '提示',
              content: '该手机号未注册任何网大账号',
              showCancel: false,
              success:function(res){
                that.setData({
                  isGetPhone: false
                })
              }
            })
        }else{
          app.globalData.userId = res.data;
          that.setStorage(res.data);
          that.setData({
            isGetPhone: true
          })
        }
        
      }
    })
  },
  setStorage:function(userId){
    wx.setStorage({
      key: 'userId',
      data: userId,
    })
  },
  btn_submit:function(e){
    var that = this;
    var value = e.detail.value;
    if (value.input1 == '' || value.input2 == '' || value.input3 == '' || value.input4 == '') {
      wx.showToast({
        title: '请输入邀请码',
        icon: 'none',
        duration: 2000
      })
    } else {

      var parameter = {
        trainIndex: value.input1 + value.input2 + value.input3 + value.input4 + ''
      }
      app.requestPost(that, app.globalData.urlApi.inviteCode, parameter, function (res) {
        if (res.data != 'null') {

          var tId = res.data.substring(1, res.data.length - 1);
            wx.navigateTo({
              url: 'enroll/enroll?id=' + tId,
            })
        }
      })

      
    }
  },
  btn_cancel:function(){
    this.setData({
      isPhone: true
    })
    
  },
  btn_p:function(){
      this.setData({
        isPhone: false,
        isGetPhone: false
      })
    
    
  },
  getPhoneNumber:function(e){

    if(e.detail.iv){
      this.getPhone(e.detail);
    }

  },
  getPhone: function (value) {
    var that = this;

    var parameter = {
      encryptedData: value.encryptedData,
      sessionKey: app.globalData.sessionKey,
      iv: value.iv,
      type: 2
    }
    app.requestPost(that, app.globalData.urlApi.getUserInfoUrl, parameter, function (res) {
      
      that.getBindingPhone(res.data.phoneNumber);
    })
  },
})