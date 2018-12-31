// pages/trainingCourse/signIn/signIn.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeTab: [{
      image: '../../../images/tc/pinggu.png',
      name: '评估',
      to: '../estimate/estimate'
    }, {
      image: '../../../images/tc/richeng.png',
      name: '公告',
      to: '../community/community'
    }],
    sw: 0,
    isStatus: false,
    signPsw: null,
    signInRate: null,
    notSignPeople: '',
    nowDate: '',
    apName: '',
    dates: '',
    ap: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSystemData();

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
    this.getNowFormatDate();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getSystemData: function() {
    var that = this;
    if (app.globalData.systemInfo) {
      that.setData({
        sw: app.globalData.systemInfo.windowWidth,
      })
    } else {
      wx.getSystemInfo({
        success: function(res) {
          app.globalData.systemInfo = res;
          that.setData({
            sw: res.windowWidth,
          })
        },
      })
    }
  },
  getSignInStatus: function(ap, dates) { //查询是否开启签到接口
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      date: dates,
      time: ap
    }
    app.requestPost(that, app.globalData.urlApi.signInManage, parameter, function(res) {

     
        if (res.data != '0') {
          var item = that.trimKong(res.data);
          console.log(item);
          var signInRate = parseInt(item.notSignPeople / (item.notSignPeople + item.shouldSignPeople) * 100);
          that.setData({
            signPsw: item.code.split(""),
            signInRate: signInRate,
            notSignPeople: item.notSignPeople,
            isStatus: true
          })
        }
    })
  },
  btn_f_q: function() {
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      date: that.data.dates,
      time: that.data.ap
    }
    app.requestPost(that, app.globalData.urlApi.goSignInManage, parameter, function(res) {
      if (res.data != '0') {
        var item = that.trimKong(res.data);
        console.log(item);
        var signInRate = parseInt(item.notSignPeople / (item.notSignPeople + item.shouldSignPeople) * 100);

        that.setData({
          signPsw: item.code.split(""),
          signInRate: signInRate,
          isStatus: true
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
  getNowFormatDate: function() { //获取当前时间
    var date = new Date();
    var seperator1 = "/";
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
    var date_ = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    var times = hours + seperator2 + minutes + seperator2 + seconds;
    var ap = 0;
    var apName = '上午';
    var dateN = month + '月' + strDate + '日';
    var dates = date.getFullYear() + '-' + month + '-' + strDate;
    var time0 = date_ + ' ' + times;
    var time1 = date_ + ' ' + '00:00:00';
    var time2 = date_ + ' ' + '12:00:00';
    var time3 = date_ + ' ' + '18:00:00';
    var time4 = date_ + ' ' + '23:00:00';

    if (new Date(time0) < new Date(time2)){
      ap = 0;
      apName = '上午';
    } else if (new Date(time0) < new Date(time3)){
      ap = 1;
      apName = '下午';
    } else if (new Date(time0) < new Date(time4)) {
      ap = 2;
      apName = '晚上';
    }

    this.getSignInStatus(ap, dates);
    this.setData({
      ap: ap,
      nowDate: dateN,
      apName: apName,
      dates: dates
    })
  }
})