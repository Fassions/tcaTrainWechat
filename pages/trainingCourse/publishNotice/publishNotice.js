// pages/trainingCourse/publishNotice/publishNotice.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPublish: false
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

  },
  btn_submit:function(e){
    var value = e.detail.value;

    if(value.content == ''){

      wx.showToast({
        title: '请输入公告内容',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.setData({
        isPublish: true
      })

      this.publishNotice(value);
    }
  },
  publishNotice:function(value){
    var that = this;
    var parameter = {
      userId: app.globalData.userId,
      trainId: app.globalData.trainId,
      content: value.content
    }
    app.requestPost(that, app.globalData.urlApi.publishNoticeUrl, parameter, function (res) {


      if (res.data != '0') {
      
        wx.showToast({
          title: '发布成功',
          duration: 2000
        })

        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })

          that.setData({
            isPublish: false
          })
        },2000)


      }else{
        that.setData({
          isPublish: false
        })
      }

      


    })
  }
  
})