// pages/trainingCourse/estimateInfo/estimateInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoPro: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      infoPro: app.globalData.estmatePro
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

})