// pages/wxLogin/wxLogin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onGotUserInfo: function (e) {
    var that = this;
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;

    that.setData({
      isUserInfo: true,
      userInfo: e.detail.userInfo
    })

    that.saveOpenId(app.globalData.openId, e.detail.userInfo);
  },
  saveOpenId: function (openId, userInfo) {
    var that = this;
    var parameter = {
      openid: openId,
      nickname: userInfo.nickName,
      headimgurl: userInfo.avatarUrl
    }
    app.requestPost(that, app.globalData.urlApi.saveOpenId, parameter, function (res) {

        wx.switchTab({
          url: '../homepage/homepage',
        })
    })
  },
})