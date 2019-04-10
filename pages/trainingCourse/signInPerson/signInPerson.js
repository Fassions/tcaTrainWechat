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
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.info,
    })
    this.data.date = options.date;
    this.data.times = options.times;
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
    this.getSignInInfo(this.data.date, this.data.times, this.data.acIndex, 1, 0);
  },
  getSignInInfo: function(date, time, activeIndex, pageInt, pageType, qu = 0, isL = true) {
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt,
      signStatus: activeIndex,
      date: date,
      time: time
    }
    app.requestPost(that, app.globalData.urlApi.signInPerson, parameter, function(res) {


      if (res.data != '0') {
        var item = res.data.items;
        var pageSize = res.data.page;
       
        if (pageSize.total_size > 0 && item) {

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
  btn_not: function() {

    if (this.data.acIndex != 0) {
      this.setData({
        personPro: [],
      })
      this.data.acIndex = 0;
      this.getSignInInfo(this.data.date, this.data.times, this.data.acIndex, 1, 0);

      this.setData({
        acIndex: this.data.acIndex
      })
    }
  },
  btn_go: function() {

    if (this.data.acIndex != 1) {
      this.data.acIndex = 1;

      this.setData({
        personPro: [],
      })
      this.getSignInInfo(this.data.date, this.data.times, this.data.acIndex, 1, 0);

      this.setData({
        acIndex: this.data.acIndex
      })
    }


  },
  btn_select_d: function(e) {
    var index = e.currentTarget.dataset.index;
    var personPro = this.data.personPro;

    personPro[index].signStatus = personPro[index].signStatus == 0 || personPro[index].signStatus == 2 ? 1 : 0;

    this.setData({
      personPro: personPro
    })

  },
  btn_select_z: function (e) {
    var index = e.currentTarget.dataset.index;
    var personPro = this.data.personPro;

    personPro[index].signStatus = personPro[index].signStatus == 0 || personPro[index].signStatus == 1 ? 2 : 0;

    this.setData({
      personPro: personPro
    })

  },
  btn_ok:function(){
    var that = this;
    var personPro = that.data.personPro;
    var pePro = [];

    for(var i = 0; i < personPro.length; i++){
      var peObj = {};

      if (personPro[i].signStatus != 0){
        peObj['signStatus'] = personPro[i].signStatus;
        peObj['userId'] = personPro[i].userId;

        pePro.push(peObj);
      }
      
    }

    if (pePro.length == 0){
      return;
    }

    var parameter = {
      trainId: app.globalData.trainId,
      date: that.data.date,
      time: that.data.times,
      userSignInfo: JSON.stringify(pePro)
    }
    app.requestPost(that, app.globalData.urlApi.trainUserBatchSign, parameter, function (res) {
      if (res.data) {
        setTimeout(function () {

          that.setData({
            isSubmit: false
          })
        }, 2000)
        that.getSignInInfo(that.data.date, that.data.times, that.data.acIndex, 1, 0, 0, false);
        wx.showToast({
          title: '操作成功',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '操作失败',
          duration: 2000
        })

        setTimeout(function () {
          that.setData({
            isSubmit: false
          })
        }, 2000)
      }
    })
  }
})