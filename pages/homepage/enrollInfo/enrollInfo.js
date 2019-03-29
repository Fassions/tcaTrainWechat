// pages/homepage/enrollInfo/enrollInfo.js
var rePhone = require('../../../utils/isPhone.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: {},
    sexPro: ['女', '男'],
    sexIndex: -1,
    familyPro: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "傣族", "黎族", "僳僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族", "哈萨克族", "其他", "外国血统中国籍人士", "外籍"],
    familyIndex: -1,



    inputb_m: '',
    inputg_w: '',
    inputco: '',
    inputPhone: '',
    isSubmit: true,
  },
  onLoad: function(options) {
    this.getPersonInfo();
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
  getPersonInfo: function() {
    var that = this;
    var parameter = {
      userId: app.globalData.userId
    }
    app.requestPost(that, app.globalData.urlApi.personInfo, parameter, function(res) {
      if (res.data != 'null') {

        that.setData({
          personInfo: res.data
        })
      }
    })
  },
  btn_BM: function() {
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId
    }
    app.requestPost(that, app.globalData.urlApi.enrollOkUrl, parameter, function(res) {
      if (res.data != "\"-1\"") {

        wx.showToast({
          title: '报名成功',
          icon: 'none',
          duration: 2000
        })

        setTimeout(function(){
          wx.redirectTo({
            url: '../../trainingCourse/studentSignInfo/studentSignInfo',
          })
        },2000)
      } else {
        wx.showToast({
          title: '培训班已结束报名',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          isSubmit: true
        })
      }
    })
  },
  famulyChange: function(e) {
    this.setData({
      familyIndex: e.detail.value
    })
  },
  sexChange: function(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  inputco: function(e) {
    this.setData({
      inputco: e.detail.value
    })
  },
  inputb_m: function(e) {
    this.setData({
      inputb_m: e.detail.value
    })
  },
  inputg_w: function(e) {
    this.setData({
      inputg_w: e.detail.value
    })
  },
  btn_submit: function(e) {
    var that = this;
    var value = e.detail.value;

    if (value.sex == '') {
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
        duration: 2000
      })
    } else if (value.m_z == '') {
      wx.showToast({
        title: '请选择名族',
        icon: 'none',
        duration: 2000
      })
    } else if (value.b_m == '') {
      wx.showToast({
        title: '请输入部门',
        icon: 'none',
        duration: 2000
      })
    } else if (value.g_w == '') {
      wx.showToast({
        title: '请输入岗位',
        icon: 'none',
        duration: 2000
      })
    } else if (value.co == '') {
      wx.showToast({
        title: '请输入公司',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.setData({
        isSubmit: false
      })
      that.updataInfo(value);
    }
  },
  updataInfo: function(value) {
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      gender: that.data.sexIndex == -1 ? that.data.personInfo.gender : that.data.sexIndex,
      organizationName: value.b_m,
      familyName: value.m_z,
      postName: value.g_w,
      companyName: value.co
    }
    app.requestPost(that, app.globalData.urlApi.reviseInfo, parameter, function(res) {
      if (res.data == 'true') {
        that.btn_BM();
      } else {
        wx.showToast({
          title: '更新失败',
          icon: 'none',
          duration: 2000
        })

        that.setData({
          isSubmit: true
        })
      }
    })
  }
})