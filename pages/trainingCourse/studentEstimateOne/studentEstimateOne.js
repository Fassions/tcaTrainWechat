// pages/trainingCourse/studentEstimateOne/studentEstimateOne.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessList: [],
    info: 1,
    atype: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    if (options.atype){
      this.data.atype = options.atype;
      this.setData({
        atype: options.atype
      })
    }
    
    this.setData({
      info: options.info
    })

    if(options.info == 0){
      wx.setNavigationBarTitle({
        title: '课程评估',
      })
    } else if (options.info == 1){

      if (options.atype){
        wx.setNavigationBarTitle({
          title: '学习层评估',
        })
      }else{
        wx.setNavigationBarTitle({
          title: '个性化评估',
        })
      }
    }
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
    this.getStudentEs();
  },
  btn_x_image: function(e) {
    var index = e.currentTarget.dataset.index;
    var tempIndex = e.currentTarget.dataset.tempindex;
    var assessList = this.data.assessList;
    assessList[tempIndex].num = index;
    if(index == 0){
      assessList[tempIndex].numName = '非常差';
    } else if (index == 1) {
      assessList[tempIndex].numName = '差';
    } else if (index == 2) {
      assessList[tempIndex].numName = '一般';
    } else if (index == 3) {
      assessList[tempIndex].numName = '好';
    } else if (index == 4) {
      assessList[tempIndex].numName = '非常好';
    }

    this.setData({
      assessList: assessList
    })
  },
  btn_submit: function(e) {
    var that = this;
    var assessList = that.data.assessList;
    var tempIndex = e.currentTarget.dataset.tempindex;
    var tempPro = [];
    var tempObj = {};
    tempObj['assessId'] = assessList[tempIndex].id;
    tempObj['assessScore'] = assessList[tempIndex].num + 1;

    tempPro.push(tempObj);

    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId,
      assessStr: JSON.stringify(tempPro),
      adviceContent: ''
    }
    app.requestPost(that, app.globalData.urlApi.submitEstimate, parameter, function(res) {
      if (res.data != '0') {

        wx.showToast({
          title: '提交成功',
          duration: 2000
        })
        that.getStudentEs();
      }
    })
  },
  btn_x_s:function(e){
    var index = e.currentTarget.dataset.index;
    var assessList = this.data.assessList;
    if (assessList[index].isXS){
      assessList[index].isXS = false;
    }else{
      assessList[index].isXS = true;
    }

    this.setData({
      assessList: assessList
    })
    
  },
  btn_g_x_h:function(e){
    var index = e.currentTarget.dataset.index;
    app.globalData.gXUrl = this.data.assessList[index].assessUrl;
    wx.navigateTo({
      url: '../individuation/individuation',
    })
  },
  getStudentEs: function () {
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId
    }
    app.requestPost(that, app.globalData.urlApi.getStudentEstimateLib, parameter, function (res) {
      if (res.data != '0') {
        var item = res.data;
        var assessList = [];
        if (item.assessList) {
          for (var i = 0; i < item.assessList.length; i++) {
          
            if (that.data.atype == 0){
              if (item.assessList[i].assessType == 1) {
                item['ass1'] = 1;
              }
              
            }else{
              if (item.assessList[i].assessType == 3) {
                item['ass1'] = 1;
              }
            }
            
            if (item.assessList[i].assessType == 0) {
              item['ass2'] = 2;
            }

            item.assessList[i]['num'] = -1;
            item.assessList[i]['numName'] = '';

          }

          assessList = item.assessList;
        }
        that.setData({
          esLib: res.data,
          assessList: assessList
        })
      }
    })
  },
})