// pages/homepage/enroll/enroll.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    trainInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
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
    this.getTrainingInfo(this.data.id);
  },
  getTrainingInfo:function(id){
    var that = this;
    var parameter = {
      trainId: 'ff80808167ca34b10167cac2b63a0004',
      userId: app.globalData.userId
    }
    app.requestPost(that, app.globalData.urlApi.trainingInfo, parameter, function (res) {
      if (res.data != 'null') {

          that.setData({
            trainInfo: res.data
          })
      }
    })
  },
})