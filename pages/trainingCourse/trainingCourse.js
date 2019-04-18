// pages/trainingCourse/trainingCourse.js
var reNowtime = require('../../utils/nowTime.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursePro: [],
    pageInt: 1,
    pageSize: {},
    keyWords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
    if (app.globalData.userId != ''){
      this.getCouseList(this.data.keyWords, 1, 0);
    }else{
      wx.reLaunch({
        url: 'notPerson/notPerson',
      })
    } 
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
    if (this.data.pageSize.page_size * this.data.pageSize.current_page <= this.data.pageSize.total_size){
      var pageInt = this.data.pageInt;
      pageInt++;

      this.getCouseList(this.data.keyWords, pageInt, 1);
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCouseList: function (keyWords, pageInt, pageType) { //查询是否开启签到接口
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      current_page: pageInt,
      keyWords: keyWords
    }
    app.requestPost(that, app.globalData.urlApi.trainingCourseList, parameter, function (res) {


      if (res.data != '0') {
        var pageSize = res.data.page;
        if (pageSize.total_size > 0 && res.data.items) {
          var item = [];
          item = res.data.items;

          for(var i = 0; i < item.length; i++){
            var dates = item[i].start_date.substring(item[i].start_date.indexOf('-') + 1, item[i].start_date.length);
            item[i]['day'] = reNowtime.getTwoTimeData(item[i].start_date, item[i].end_date);
            item[i]['year'] = item[i].start_date.substring(0, item[i].start_date.indexOf('-'));
            item[i]['month'] = dates.substring(0, dates.indexOf('-'));
          }
          if (pageType == 1) {
            item = that.data.coursePro.concat(item);
          }

          that.data.pageInt = pageInt;

        } else {
          if (pageType == 0){
            item = null;
          }
        }
        

        that.setData({
          coursePro: item,
          pageSize: pageSize
        })
      }
    })
  },
  btn_couse_info:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var coursePro = that.data.coursePro;
    app.globalData.trainId = coursePro[index].class_id;
    app.globalData.trainName = coursePro[index].class_name;
    app.globalData.userRoleCode = coursePro[index].userRoleCode;
    if (coursePro[index].user_checked == 1){
      wx.navigateTo({
        url: '../homepage/enroll/enroll?id=' + coursePro[index].class_id,
      })
    }else{
      if (coursePro[index].userRoleCode == '04') {
        wx.navigateTo({
          url: 'studentSignInfo/studentSignInfo',
        })
      } else {
        wx.navigateTo({
          url: 'signIn/signIn',
        })
      }
    }
    

  },
  btn_input:function(e){
    this.data.keyWords = e.detail.value;
    this.getCouseList(e.detail.value, 1, 0);
  },
})