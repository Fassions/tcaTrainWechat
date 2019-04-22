// pages/trainingHome/trainingHomePage/trainingHomePage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeTab: [{
      image: '../../../images/tc/pinggu.png',
      name: '评估',
      to: '../studentEstimate/studentEstimate',
      openType: 'navigate'
    }, {
        image: '../../../images/tc/richeng.png',
        name: '日程',
        to: '../studentSchedule/studentSchedule',
        openType: 'navigate'
      }, {
        image: '../../../images/tc/richeng.png',
        name: '通讯录',
        to: '../studentSchedule/studentSchedule',
        openType: 'navigate'
      }, {
        image: '../../../images/tc/richeng.png',
        name: '论坛',
        to: '../studentSchedule/studentSchedule',
        openType: 'navigate'
      }, {
        image: '../../../images/tc/richeng.png',
        name: '教材',
        to: '../studentSchedule/studentSchedule',
        openType: 'navigate'
      }, {
        image: '../../../images/tc/richeng.png',
        name: '资料',
        to: '../studentSchedule/studentSchedule',
        openType: 'navigate'
      }, {
      image: '../../../images/tc/richeng.png',
      name: '相册',
      to: '../studentSchedule/studentSchedule',
      openType: 'navigate'
      }],
    ap: null,
    dates: null,
    isFocus: false,
    inputIndex: -1,
    inputIndex1: -1,
    inputIndex2: -1,
    inputIndex3: -1,
    inputName1: '',
    inputName2: '',
    inputName3: '',
    inputName4: '',
    userRoleCode: '',
    inputY: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userRoleCode;
    var trainId = options.trainId;
    var trainingName = app.globalData.trainName;
    if (trainId != '' && trainId != null) {
      app.globalData.trainId = trainId;
      userRoleCode = options.userRoleCode
    } else {
      userRoleCode = app.globalData.userRoleCode;
    }
    this.setData({
      trainingName: trainingName,
      userRoleCode: userRoleCode
    })
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

    this.setData({
      // inputName1: '',
      // inputName2: '',
      // inputName3: '',
      // inputName4: '',
      inputY: ''
    })
    this.getNowFormatDate();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getNowFormatDate: function () { //获取当前时间
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

    if (new Date(time0) < new Date(time2)) {
      ap = 0;
      apName = '上午';
    } else if (new Date(time0) < new Date(time3)) {
      ap = 1;
      apName = '下午';
    } else if (new Date(time0) < new Date(time4)) {
      ap = 2;
      apName = '晚上';
    }

    this.setData({
      ap: ap,
      nowDate: dateN,
      apName: apName,
      dates: dates
    })
  },
  btnStudentSigIn: function (e) {
    var that = this;
    var dates = that.data.dates;
    var ap = that.data.ap;
    var value = e.detail.value;

    if (value.input_y == '') {
      wx.showToast({
        title: '请输入签到码',
        icon: 'none',
        duration: 2000
      })
    } else {

      var parameter = {
        trainId: app.globalData.trainId,
        date: dates,
        time: ap,
        userId: app.globalData.userId,
        code: value.input_y
      }
      app.requestPost(that, app.globalData.urlApi.studentSignIn, parameter, function (res) {
        if (res.data != '0') {

          wx.showToast({
            title: '签到成功',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '签到失败',
            icon: 'none',
            duration: 2000
          })
        }
        that.setData({
          inputY: ''
        })
      })
    }
  },
  btn_address_info: function (e) {
    wx.showToast({
      title: '该功能暂未开放，请下载学习圈app进入培训班完成。',
      icon: 'none',
      duration: 2000
    })
  },
  btn_forum_info: function (e) {
    wx.showToast({
      title: '该功能暂未开放，请下载学习圈app进入培训班完成。',
      icon: 'none',
      duration: 2000
    })
   },
  btn_textbook_info: function (e) {
    wx.showToast({
      title: '该功能暂未开放，请下载学习圈app进入培训班完成。',
      icon: 'none',
      duration: 2000
    })
   },
  btn_data_info: function (e) {
    wx.showToast({
      title: '该功能暂未开放，请下载学习圈app进入培训班完成。',
      icon: 'none',
      duration: 2000
    })
   },
  btn_photo_info: function (e) {
    wx.showToast({
      title: '该功能暂未开放，请下载学习圈app进入培训班完成。',
      icon: 'none',
      duration: 2000
    })
   },

  btn_couse_info: function (e) {
    if (app.globalData.userRoleCode == '04') {
        wx.navigateTo({
          url: '../studentSignInfo/studentSignInfo',
        })
      } else {
        wx.navigateTo({
          url: '../signIn/signIn',
        })
      }
  },
  btn_assess_info: function (e) {
    if (app.globalData.userRoleCode == '04') {
      wx.navigateTo({
        url: '../studentEstimate/studentEstimate',
      })
    } else {
      wx.navigateTo({
        url: '../estimate/estimate',
      })
    }
  },
  inputey: function (e) {
    this.setData({
      inputY: e.detail.value
    })
  },
  inputy1: function (e) {

    if (e.detail.value != '') {
      this.setData({
        inputName1: e.detail.value,
        inputIndex1: 1,
      })
    }

  },
  inputy2: function (e) {


    if (e.detail.value != '') {
      this.setData({
        inputName2: e.detail.value,
        inputIndex2: 2,
      })
    } else {
      this.setData({
        inputIndex: 0,
      })
    }
  },
  inputy3: function (e) {
    if (e.detail.value != '') {
      this.setData({
        inputName3: e.detail.value,
        inputIndex3: 3,
      })
    } else {
      this.setData({
        inputIndex1: 1,
      })
    }
  },
  inputy4: function (e) {

    if (e.detail.value != '') {
      this.setData({
        inputName4: e.detail.value,
        inputIndex: -1,
        inputIndex2: -1,
        inputIndex1: -1
      })
    } else {
      this.setData({
        inputIndex2: 2,
      })
    }

  },
  btn_foucs: function () {
    this.setData({
      isFocus: true
    })
  },
})