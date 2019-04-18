// pages/trainingCourse/studentEstimateAll/studentEstimateAll.js
var reNow = require('../../../utils/nowTime.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempList: [],
    dayNum: 0,
    startDate: '',
    endDate: '',
    isSubmit: false,
    trainName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempList = app.globalData.tempList;
    var endDate = options.endDate;
    var startDate = options.startDate;

    var day = reNow.getTwoTimeData(startDate, endDate);

    for(var i = 0;i<tempList.length; i++){
      tempList[i]['num'] = -1;
      tempList[i]['numName'] = '';
    }

    this.setData({
      tempList: tempList,
      dayNum: day,
      startDate: startDate,
      endDate: endDate,
      trainName: app.globalData.trainName 
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

  },
  btn_x_image:function(e){
    var index = e.currentTarget.dataset.index;
    var tempIndex = e.currentTarget.dataset.tempindex;
    var tempList = this.data.tempList;
    tempList[tempIndex].num = index + 1;

    if (index == 0) {
      tempList[tempIndex].numName = '非常差';
    } else if (index == 1) {
      tempList[tempIndex].numName = '差';
    } else if (index == 2) {
      tempList[tempIndex].numName = '一般';
    } else if (index == 3) {
      tempList[tempIndex].numName = '好';
    } else if (index == 4) {
      tempList[tempIndex].numName = '非常好';
    }
    console.log(tempList);
    this.setData({
      tempList: tempList
    })
  },
  btn_submit:function(e){
    var that = this;
    var value = e.detail.value;
    var tempList = that.data.tempList;
    var tempPro = [];
    that.setData({
      isSubmit: true
    })

    for (var i = 0; i < tempList.length; i++){

      if (tempList[i].num == -1){
        wx.showToast({
          title: '请给' + tempList[i].assessContent + '评分',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          isSubmit: false
        })
        console.log(11);
        return ;
      }
      var tempObj = {};
      tempObj['templateId'] = tempList[i].id;
      tempObj['assessScore'] = tempList[i].num;
      
      if (i == 0){
        tempObj['isScore'] = true;
      }else{
        tempObj['isScore'] = false;
      }

      tempPro.push(tempObj);
    }
    console.log(tempPro);

    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId,
      adviceContent: value.content,
      assessStr: JSON.stringify(tempPro)
    }
    app.requestPost(that, app.globalData.urlApi.submitEstimate, parameter, function (res) {
      if (res.data != '0') {
        setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })

          that.setData({
            isSubmit: false
          })
        },2000)

        wx.showToast({
          title: '提交成功',
          duration: 2000
        })
      }
    })
  }
})