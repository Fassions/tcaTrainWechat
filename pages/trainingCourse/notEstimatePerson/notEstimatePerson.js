// pages/trainingCourse/notEstimatePerson/notEstimatePerson.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessId: 0,
    personPro: [],
    info: null,
    isCheck: false,
    indexId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.assessId = options.assessId;
    if(options.info){
      this.data.info = options.info;
      this.data.indexId = options.indexId
    }
    
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
    if (this.data.info ){
      this.getEstimateNotQSignIn(this.data.assessId, 1, 0);
    }else{
      this.getNotSignIn(this.data.assessId, 1, 0);
    }
    
  },
  getNotSignIn: function (id, pageInt, pageType, qu = 0, isL = true) {
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt,
      evalType: 0,
      assessId: id
    }
    app.requestPost(that, app.globalData.urlApi.estimateNotAllSignIn, parameter, function (res) {


      if (res.data != '0') {
        
        var pageSize = res.data.page;
        var item = [];
        if (pageSize.total_size > 0) {
          item = res.data.items;

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
  getEstimateNotQSignIn: function (id, pageInt, pageType, qu = 0, isL = true){
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt,
      evalType: 0,
      questionId: id
    }
    app.requestPost(that, app.globalData.urlApi.estimateNotQSignIn, parameter, function (res) {


      if (res.data != '0') {

        var pageSize = res.data.page;
        var item = [];
        if (pageSize.total_size > 0) {
          item = res.data.items;

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
  btn_check:function(e){
    var index = e.currentTarget.dataset.index;
    var personPro = this.data.personPro;

    if (personPro[index].isCheck){
      personPro[index].isCheck = false;
    }else{
      personPro[index].isCheck = true;
    }

    this.setData({
      personPro: personPro
    })
  },
  btn_all_check:function(){
    var personPro = this.data.personPro;
    var isCheck = this.data.isCheck;
    if (isCheck){
      isCheck = false;
      for (var i = 0; i < personPro.length; i++) {

        personPro[i].isCheck = false;
      }
    }else{
      isCheck = true;
      for (var i = 0; i < personPro.length; i++) {

        personPro[i].isCheck = true;
      }
    }
    

    this.setData({
      personPro: personPro,
      isCheck: isCheck
    })
  },
  btn_send:function(){
    var that = this;
    var personPro = that.data.personPro;
    var userId = '';
    var assessType = 0;

    if(that.data.info){
      if (that.data.indexId == 1){
        assessType = 2;
      }else{
        assessType = 3;
      }
    }else{
      assessType = 1;
    }

    for (var i = 0; i < personPro.length; i++){
      if(personPro[i].isCheck){
        userId += personPro[i].userId + ',';
      }
    }

    if (userId != ''){
      userId = userId.substring(0, userId.length - 1);
    }


    var parameter = {
      trainId: app.globalData.trainId,
      id: that.data.assessId,
      assessType: assessType,
      user: userId
    }
    app.requestPost(that, app.globalData.urlApi.publishNotperonalMessage, parameter, function (res) {


      if (res.data == '1') {

          wx.showToast({
            title: '推送成功',
            duration: 2000
          })

      }else{
        wx.showToast({
          title: '推送失败',
          duration: 2000
        })
      }
    })
  }
})