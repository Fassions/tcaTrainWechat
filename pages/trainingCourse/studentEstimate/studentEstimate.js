// pages/trainingCourse/studentEstimate/studentEstimate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    esLib: {}
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
    this.getStudentEs();
  },
  getStudentEs:function(){
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId
    }
    app.requestPost(that, app.globalData.urlApi.getStudentEstimateLib, parameter, function (res) {
      if (res.data != '0') {
        var item = res.data;

        if (item.assessList){
          for (var i = 0; i < item.assessList.length; i++){

            if (item.assessList[i].assessType == 1){
              item['ass1'] = 1;
            }
            if (item.assessList[i].assessType == 0){
              item['ass2'] = 2;
            }
          }
        }
       that.setData({
         esLib: res.data
       })
      }
    })
  },
  btn_all_es:function(){
    app.globalData.tempList = this.data.esLib.tempList;
  },
  btn_course_es: function () {
    app.globalData.assessList = this.data.esLib.assessList;
  }
})