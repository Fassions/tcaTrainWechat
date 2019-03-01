// pages/personal/personalInfo/personalInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: {},
    trainInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      trainInfo: app.globalData.trainInfo
    })
    this.getPersonalInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getPersonalInfo: function() {
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId
    }
    app.requestPost(that, app.globalData.urlApi.getTrainStatus, parameter, function(res) {


      if (res.data != '0') {
        var item = res.data;

        if (item.assessRate){
          item.assessRate = parseInt(item.assessRate * 100)/100;
        }
        if (item.signRateOfTrain) {
          item.signRateOfTrain = parseInt(item.signRateOfTrain * 100) / 100;
        }
        if (item.signRate) {
          item.signRate = parseInt(item.signRate * 100) / 100;
        }
        that.setData({
          personInfo: item
        })
      }
    })
  }

})