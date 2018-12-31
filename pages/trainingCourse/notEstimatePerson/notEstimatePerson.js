// pages/trainingCourse/notEstimatePerson/notEstimatePerson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.assessId = options.assessId;
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
  getSignInInfo: function (id, pageInt, pageType, qu = 0, isL = true) {
    var that = this;
    var parameter = {
      trainId: app.globalData.trainId,
      current_page: pageInt,
      signStatus: activeIndex,
      assessId: id,
      evalType: 0
    }
    app.requestPost(that, app.globalData.urlApi.signInPerson, parameter, function (res) {


      if (res.data != '0') {
        var item = app.trimKong(res.data).items;
        var pageSize = that.trimKong(res.data).page;
        console.log(item);
        if (pageSize.total_size > 0) {

          // for (var i = 0; i < item.length; i++) {

          //   item[i]['times'] = that.getTimeStampFormatDate(item[i].date);
          // }

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
})