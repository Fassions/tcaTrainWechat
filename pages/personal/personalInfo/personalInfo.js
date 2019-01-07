// pages/personal/personalInfo/personalInfo.js
var reNowtime = require('../../../utils/nowTime.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPersonalInfo();
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
  getPersonalInfo:function(){
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId
    }
    app.requestPost(that, app.globalData.urlApi.gotoTraining, parameter, function (res) {


      // if (res.data != '0') {
      //     var item = res.data;
      //   item['day'] = reNowtime.getTwoTimeData(item.start_date, item.end_date);
      //   that.setData({
      //     personInfo: item
      //   })

      // }
    })
  }

})