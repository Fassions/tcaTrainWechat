// pages/trainingCourse/signInInfo/signInInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInt: 0,
    isLoadMore: false,
    historyPro: [],
    pageSize: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSignInInfo(1, 0);
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var pageInt = this.data.pageInt;
    pageInt++;
    this.getSignInInfo(pageInt, 1);
  },
  getSignInInfo: function(pageInt, pageType) { //查询是否开启签到接口
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt
    }
    app.requestPost(that, app.globalData.urlApi.signInfoInfo, parameter, function(res) {


      if (res.data != '0') {
        var item = that.trimKong(res.data).items;
        var pageSize = that.trimKong(res.data).page;
        console.log(item);
        if (pageSize.total_size > 0) {

          for (var i = 0; i < item.length; i++) {

            item[i]['dates'] = that.getNowFormatDay(item[i].date);
          }

          if (pageType == 1) {
            item = that.data.historyPro.concat(item);
          }



        } else {
          item = null;
        }




        that.setData({
          historyPro: item,
          pageSize: pageSize
        })

      }
    })
  },
  trimKong: function(s) {

    return JSON.parse(trim(s));

    function trim(str) {
      str = str.replace(/^(\s|\u00A0)+/, '');
      for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
          str = str.substring(0, i + 1);
          break;
        }
      }
      return str;
    }
  },
  getNowFormatDay: function() { //获取当前时间
    var date = new Date();
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
  }
})