// pages/trainingCourse/estimateAllInfo/estimateAllInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoPro: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEstimateAllInfo();
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
  getEstimateAllInfo: function () {
    var that = this;

    var parameter = {
      trainId: app.globalData.trainId,
      evalType: 0
    }

    app.requestPost(that, app.globalData.urlApi.getEstimateAllInfo, parameter, function (res) {
      if (res.data != 'null') {
        var item = res.data;

        that.setData({
          infoPro: item
        })  
       console.log(item);
      }
    })
  },
  btn_course_estimate: function (e) {
    var index = e.currentTarget.dataset.index;

    app.globalData.estmatePro = this.data.infoPro[index];
  }
})