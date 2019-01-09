// pages/trainingCourse/feedback/feedback.js
var reNow = require('../../../utils/nowTime.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: {},
    feedbackPro: [],
    assId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      assId: options.id
    })
    this.getStudentFeedback(1, 0);
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
  onReachBottom:function(){

    if (this.data.pageSize.page_size * this.data.pageSize.current_page <= this.data.pageSize.total_size) {
    var pageInt = this.data.pageInt;
    pageInt ++;

    this.getStudentFeedback(pageInt, 1);
    }
  },
  getStudentFeedback: function (pageInt, pageType) {
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      evalType: 0,
      current_page: pageInt
    }

    app.requestPost(that, app.globalData.urlApi.studentFeedback, parameter, function (res) {

      if (res.data != 'null') {
        var pageSize = res.data.page;
        var item = [];
        if (pageSize.total_size > 0 && res.data.items) {
          
          item = res.data.items;

          for(var i = 0; i < item.length; i++){

            item[i]['dates'] = reNow.getTimeStampFormatDate(item[i].releaseDate);
          }
          
          if (pageType == 1) {
            item = that.data.coursePro.concat(item);
          }

        } else {
          item = null;
        }
        that.data.pageInt = pageInt;

        that.setData({
          feedbackPro: item,
          pageSize: pageSize
        })
      }
    })
  }
})