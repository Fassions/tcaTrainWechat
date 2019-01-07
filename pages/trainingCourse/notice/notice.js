// pages/trainingCourse/notice/notice.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticePro: [],
    pageInt: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeData(1, 0)
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
    var pageInt = this.data.pageInt;
    pageInt ++;
    this.getNoticeData(pageInt, 1);
  },
  getNoticeData:function(pageInt, pageType){
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt,
      userId: app.globalData.userId
    }
 
    app.requestPost(that, app.globalData.urlApi.noticeLibUrl, parameter, function (res) {


      if (res.data != '0') {
        var item = res.data.items;
        var pageSize = res.data.page;
        console.log(item);
        if (pageSize.total_size > 0) {

          for (var i = 0; i < item.length; i++) {

            item[i]['dates'] = that.getNowFormatDay(item[i].createdTime);
          }

          if (pageType == 1) {
            item = that.data.historyPro.concat(item);
          }

        } else {
          if (pageType == 1) {
            wx.showToast({
              title: '无更多数据了',
              icon: 'none',
              duration: 2000
            })
          }else{
            item = null;
          }
          
        }

        that.setData({
          noticePro: item,
          pageSize: pageSize
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