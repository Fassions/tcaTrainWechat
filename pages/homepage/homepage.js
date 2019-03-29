// pages/homepage/homepage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhone: true,
    isGetPhone: true,
    isFocus: false,
    inputIndex: -1,
    inputIndex1: -1,
    inputIndex2: -1,
    inputIndex3: -1,
    inputName1: '',
    inputName2: '',
    inputName3: '',
    inputName4: '',
    inputY: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userId == ''){
      wx.hideTabBar({
        animation: false
      })
    }
    
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../wxLogin/wxLogin',
          })

        }else{
          
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
      }else{
        wx.showTabBar({
          
        })
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


    if (app.globalData.userId != '') {
      wx.showTabBar({})
    }
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
    this.setData({
      // inputName1: '',
      // inputName2: '',
      // inputName3: '',
      // inputName4: ''
      inputY: ''
    })

    
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
  btn_foucs:function(){
    this.setData({
      isFocus: true
    })
  },
  btn_scan:function(){
    var that = this;
    wx.scanCode({
      success:function(res){
        console.log(res);

        var result = res.result.substring(res.result.indexOf('=') + 1, res.result.length);
        console.log(result);

        app.globalData.trainId = result;
        wx.navigateTo({
          url: 'enroll/enroll?id=' + result,
        })
        
      }
    })
  },
  unionIdExit:function(){
    var that = this;
    var parameter = {
      unionId: app.globalData.unionId,
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
        wx.showTabBar({
          
        })
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
            // wx.showModal({
            //   title: '提示',
            //   content: '该手机号未注册任何网大账号',
            //   showCancel: false,
            //   success:function(res){
            //     that.setData({
            //       isGetPhone: false
            //     })
            //   }
            // })

            wx.reLaunch({
              url: 'notPerson/notPerson',
            })
        }else{
          wx.showTabBar({

          })
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
    if (value.input_y == '') {
      wx.showToast({
        title: '请输入邀请码',
        icon: 'none',
        duration: 2000
      })
    } else {

      var parameter = {
        trainIndex: value.input_y + ''
      }
      app.requestPost(that, app.globalData.urlApi.inviteCode, parameter, function (res) {
        if (res.data != 'null') {

          var tId = res.data.substring(1, res.data.length - 1);
          app.globalData.trainId = tId;
            wx.navigateTo({
              url: 'enroll/enroll?id=' + tId,
            })
        }else{
          wx.showModal({
            title: '提示',
            content: '邀请码错误',
          })
        }
      })

      
    }
  },
  btn_cancel:function(){
    this.setData({
      isPhone: true
    })

    wx.reLaunch({
      url: 'notPerson/notPerson',
    })
    
  },
  btn_p:function(){
      this.setData({
        isPhone: false,
        isGetPhone: false
      })
    app.globalData.isLogin == -1;
    
    
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
  inputey:function(e){
    this.setData({
      inputY: e.detail.value
    })
  },
  inputy1:function(e){
    
    if (e.detail.value != ''){
      this.setData({
        inputName1: e.detail.value,
        inputIndex1: 1,
      })
    }
    
  },
  inputy2: function (e) {


    if (e.detail.value != '') {
      this.setData({
        inputName2: e.detail.value,
        inputIndex2: 2,
      })
    } else {
      this.setData({
        inputIndex: 0,
      })
    }
  },
  inputy3: function (e) {
    if (e.detail.value != '') {
      this.setData({
        inputName3: e.detail.value,
        inputIndex3: 3,
      })
    } else {
      this.setData({
        inputIndex1: 1,
      })
    }
  },
  inputy4: function (e) {

    if (e.detail.value != '') {
      this.setData({
        inputName4: e.detail.value,
        inputIndex: -1,
        inputIndex2: -1,
        inputIndex1: -1
      })
    }else{
      this.setData({
        inputIndex2: 2,
      })
    }
    
  },
  
})