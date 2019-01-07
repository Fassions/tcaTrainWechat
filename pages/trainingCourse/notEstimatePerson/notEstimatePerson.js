// pages/trainingCourse/notEstimatePerson/notEstimatePerson.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessId: 0,
    personPro: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.assessId = options.assessId;
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
    this.getNotSignIn(this.data.assessId, 1, 0);
  },
  getNotSignIn: function (id, pageInt, pageType, qu = 0, isL = true) {
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt,
      evalType: 0,
      assessId: id
    }
    app.requestPost(that, app.globalData.urlApi.estimateNotAllSignIn, parameter, function (res) {


      if (res.data != '0') {
        
        var pageSize = res.data.page;
        var item = [];
        if (pageSize.total_size > 0) {
          item = res.data.items;

          if (pageType == 1) {
            item = that.data.personPro.concat(item);
          }

        } else {
          item = null;
        }

        that.setData({
          personPro: item,
          pageSize: pageSize
        })

      }
    }, qu, isL)
  },
})