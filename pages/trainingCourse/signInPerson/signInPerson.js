// pages/trainingCourse/signInPerson/signInPerson.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acIndex: 0,
    date: null,
    times: null,
    pageSize: null,
    personPro: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.info,
    })
    this.data.date = options.date;
    this.data.times = options.times;
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
    this.getSignInInfo(this.data.date, this.data.times, this.data.acIndex, 1, 0);
  },
  getSignInInfo: function (date, time, activeIndex, pageInt, pageType, qu = 0, isL = true) { 
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt,
      signStatus: activeIndex,
      date: date,
      time: time
    }
    app.requestPost(that, app.globalData.urlApi.signInPerson, parameter, function (res) {


      if (res.data != '0') {
        var item = app.trimKong(res.data).items;
        var pageSize = that.trimKong(res.data).page;
        console.log(item);
        if (pageSize.total_size > 0) {

          // for (var i = 0; i < item.length; i++) {

          //   item[i]['times'] = that.getTimeStampFormatDate(item[i].date);
          // }

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
  btn_not:function(){

    if(this.data.acIndex != 0){
      this.data.acIndex = 0;
      this.getSignInInfo(this.data.date, this.data.times, this.data.acIndex, 1, 0);

      this.setData({
        acIndex: this.data.acIndex
      })
    }
  },
  btn_go: function () {

    if (this.data.acIndex != 1) {
      this.data.acIndex = 1;
      this.getSignInInfo(this.data.date, this.data.times, this.data.acIndex, 1, 0);

      this.setData({
        acIndex: this.data.acIndex
      })
    }


  }
})