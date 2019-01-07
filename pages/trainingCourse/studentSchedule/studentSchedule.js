// pages/trainingCourse/studentSchedule/studentSchedule.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedulePro: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScheduleData();
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
  getScheduleData:function(){
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
    }
    app.requestPost(that, app.globalData.urlApi.getSchedule, parameter, function (res) {
      if (res.data != '0') {
        var item = res.data;
        var namePro = [];
        var namePro1 = [];
        for (var i = 0; i < item.length; i++){

          item[i].dates = that.getNowFormatDay(item[i].date);
        }


       console.log(res);
       that.setData({
         schedulePro: item
       })
      }

    })
  },
  getNowFormatDay: function (dateN) { //获取当前时间
    var date = new Date(dateN);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var hours = date.getHours();
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
    }
    var minutes = date.getMinutes();
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    var seconds = date.getSeconds();
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    var currentdate = month + '月' + strDate + "号";
    var currentday = date.getFullYear() + seperator1 + month + seperator1 + strDate;

    var objDate = {
      'currentdate': currentdate,
      'currentday': currentday
    }
    return objDate;
  },
})