// pages/trainingCourse/estimate/estimate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sw: 0,
    courselist: [],
    questionList: [],
    estimatePro: {},
    userRoleCode: '00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemData();
    this.setData({
      userRoleCode: app.globalData.userRoleCode
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
    this.getEstimate();
  },
  getSystemData: function () {
    var that = this;
    if (app.globalData.systemInfo) {
      that.setData({
        sw: app.globalData.systemInfo.windowWidth,
      })
    } else {
      wx.getSystemInfo({
        success: function (res) {
          app.globalData.systemInfo = res;
          that.setData({
            sw: res.windowWidth,
          })
        },
      })
    }
  },
  getEstimate: function () {
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      evalType: '0',
      userId: app.globalData.userId
    }
    app.requestPost(that, app.globalData.urlApi.estimateInfo, parameter, function (res) {


      if (res.data != 'null') {
        var item = res.data;
        console.log(item);

        if (item.courseList){
          for (var i = 0; i < item.courseList.length; i++) {
            item.courseList[i]['people_v'] = parseInt(item.courseList[i].assessPeopleNum / item.courseList[i].countPeople * 100);
          }
        }

        item['train_v'] = parseInt(item.trainSutdentAssessNumber / item.trainStudentNumber * 100);

        that.setData({
          courselist: item.courseList,
          questionList: item.questionList,
          estimatePro: item
        })
      }
    })
  },
  btn_is_publish_c:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var courselist = that.data.courselist;

    var parameter = {
      assessId: courselist[index].id,
    }

    if (courselist[index].publishStatus){
      parameter['PublishStatus'] = 0;
    }else{
      parameter['PublishStatus'] = 1;
    }
    app.requestPost(that, app.globalData.urlApi.estimateUpdate, parameter, function (res) {


      if (res.data != 'null') {
        var item = app.trimKong(res.data);

        that.getEstimate();
      }
    })
  },
  btn_is_publish_q: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var questionList = that.data.questionList;

    var parameter = {
      trainId: app.globalData.trainId,
      assessId: questionList[index].proj_id
    }

    if (questionList[index].status == 1) {
      parameter['PublishStatus'] = 0;
    } else {
      parameter['PublishStatus'] = 1;
    }
    app.requestPost(that, app.globalData.urlApi.estimateUpdateQu, parameter, function (res) {
      if (res.data != 'null') {
        var item = res.data;

        that.getEstimate();
      }
    })
  },
  btn_course_estimate:function(e){
    var index = e.currentTarget.dataset.index;

    app.globalData.estmatePro = this.data.courselist[index];

    wx.navigateTo({
      url: '../estimateInfo/estimateInfo',
    })
  }
})