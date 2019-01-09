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
      trainId: id,
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
  btn_cancel:function(){
    var that = this;

    wx.showModal({
      title: '提示',
      content: '是否确认取消报名？',
      success:function(res){
        if(res.confirm){
          var parameter = {
            trainId: that.data.id,
            userId: app.globalData.userId
          }
          app.requestPost(that, app.globalData.urlApi.cancelEnroll, parameter, function (res) {
            if (res.data == 'true') {

                wx.showToast({
                  title: '取消报名成功',
                  duration: 2000
                })

                setTimeout(function(){

                  wx.navigateBack({
                    delta: 1
                  })
                },2000)
            }
          })

        }
      }
    })
  }
})