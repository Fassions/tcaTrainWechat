// pages/trainingCourse/studentEstimate/studentEstimate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    esLib: {},
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
    var trainId = options.trainId;
    var title = options.trainingName;
    if (trainId != "" && trainId != null) {
      app.globalData.trainId = trainId;
      var uid = wx.getStorageSync('userId');
      if (uid != '' && uid != null) {
        app.globalData.userId = uid;
      } else {
        wx.reLaunch({
          url: '../../wxLogin/wxLogin',
        })
      }
    }else {
      userRoleCode = app.globalData.userRoleCode;
      title = app.globalData.trainName
    }
    wx.setNavigationBarTitle({
      title: title
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
    this.getStudentEs();
  },
  getStudentEs:function(){
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId
    }
    app.requestPost(that, app.globalData.urlApi.getStudentEstimateLib, parameter, function (res) {
      if (res.data != '0') {
        var item = res.data;

        if (item.assessList){
          for (var i = 0; i < item.assessList.length; i++){

            if (item.assessList[i].assessType == 1){
              item['ass1'] = 1;
            }
            if (item.assessList[i].assessType == 0){
              item['ass2'] = 2;
            }

            if (item.assessList[i].assessType == 3) {
              item['ass3'] = 3;
            }
          }
        }
       that.setData({
         esLib: res.data
       })
      }
    })
  },
  btn_all_es:function(){

    app.globalData.tempList = this.data.esLib.tempList;

    wx.navigateTo({
      url: '../studentEstimateAll/studentEstimateAll?startDate=' + this.data.esLib.startDate + '&endDate=' + this.data.esLib.endDate,
    })
  },
  btn_course_es: function (e) {
    var info = e.currentTarget.dataset.info;
    app.globalData.assessList = this.data.esLib.assessList;

    if (info == 3){
      wx.navigateTo({
        url: '../studentEstimateOne/studentEstimateOne?atype=1&info=' + info,
      })
    }else{
      wx.navigateTo({
        url: '../studentEstimateOne/studentEstimateOne?info=' + info,
      })
    }
   
  }
})