// pages/trainingCourse/studentEstimateOne/studentEstimateOne.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var assessList = app.globalData.assessList;
    for (var i = 0; i < assessList.length; i++) {
      assessList[i]['num'] = 4;
      assessList[i]['numName'] = '好';
    }
    this.setData({
      assessList: assessList,
    })
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
  btn_x_image: function(e) {
    var index = e.currentTarget.dataset.index;
    var tempIndex = e.currentTarget.dataset.tempindex;
    var assessList = this.data.assessList;
    assessList[tempIndex].num = index + 1;

    this.setData({
      assessList: assessList
    })
  },
  btn_submit: function(e) {
    var that = this;
    var assessList = that.data.assessList;
    var tempIndex = e.currentTarget.dataset.tempindex;
    var tempPro = [];
    var tempObj = {};
    tempObj['assessId'] = assessList[tempIndex].id;
    tempObj['assessScore'] = assessList[tempIndex].num;

    tempPro.push(tempObj);

    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId,
      assessStr: JSON.stringify(tempPro),
      adviceContent: ''
    }
    app.requestPost(that, app.globalData.urlApi.submitEstimate, parameter, function(res) {
      if (res.data != '0') {

        wx.showToast({
          title: '提交成功',
          duration: 2000
        })
      }
    })
  }
})