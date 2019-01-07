
/**
 * GET  request
 * that 当前页
 * url 请求链接
 * parameter 请求参数
 * quantity 接口请求数量
 * isLoading 是否显示加载提示
 */
function requestGet(that, url, doSuccess, quantity = 0, isLoading = true, doFail, doComplete) {
  var app = getApp();

  if (isLoading && app.globalData.networkNum == 0) {
    showLoading();
  }

  if (!app.globalData.isNetwork) {
    wx.showModal({
      title: '提示',
      content: '当前网络状态不佳，请检查您的网络',
      showCancel: false,
      confirmText: '我知道了',
    })
    return;
  }

  wx.request({
    url: url,
    method: 'GET',
    success: function (res) {
      console.log(res);

      if (typeof res.data == 'string' && res.data != 'null' && res.data != '' && res.data.indexOf('}')> -1) {
        res.data = app.trimKong(res.data);

        if (typeof res.data == 'string') {
          res.data = app.trimKong(res.data);
        }

      }

      if (typeof doSuccess == "function") {
        if (isLoading) {
          hideLoading();
        }
        doSuccess(res);
      }
    },
    fail: function () {
      failRequest(doFail);
    },
    complete: function () {
      if (typeof doComplete == "function") {
        doComplete();
      }

      if (quantity != 0) {
        app.globalData.networkNum++;
      }

      if (app.globalData.networkNum == quantity) {
        
        app.globalData.networkNum = 0;
      }
    }
  })
}

/**
 * POST  request
 * that 当前页
 * url 请求链接
 * parameter 请求参数
 * quantity 接口请求数量
 * isLoading 是否显示加载提示
 */
function requestPost(that, url, parameter, doSuccess, quantity = 0, isLoading = true, doFail, doComplete) {
  var app = getApp();
  if (isLoading && app.globalData.networkNum == 0) {
    showLoading();
  }

  if (app.globalData.nowRequestUrl == url) {
    console.log('正在请求该接口，请勿重复请求');
    return;
  } else {
    app.globalData.nowRequestUrl = url;
  }

  if (!app.globalData.isNetwork) {
    wx.showModal({
      title: '提示',
      content: '当前网络状态不佳，请检查您的网络',
      showCancel: false,
      confirmText: '我知道了',
    })
    return;
  }

  wx.request({
    url: url,
    data: parameter,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res);

      if (typeof res.data == 'string' && res.data != 'null' && res.data != '' && res.data.indexOf('}') > -1) {
        res.data = app.trimKong(res.data);

        if (typeof res.data == 'string') {
          res.data = app.trimKong(res.data);
        }

      }

      if (typeof doSuccess == "function") {
        if (isLoading) {
          hideLoading();
        }
        doSuccess(res);
      }
    },
    fail: function () {
      failRequest(doFail);
    },
    complete: function () {

      app.globalData.nowRequestUrl = '';

      if (typeof doComplete == "function") {

        doComplete();
      }
      if (quantity != 0) {
        app.globalData.networkNum++;
      }


      if (app.globalData.networkNum == quantity) {
        
        app.globalData.networkNum = 0;
      }

    }
  })
}


/**
 * GET  request
 * that 当前页
 * url 请求链接
 * parameter 请求参数
 * quantity 接口请求数量
 * isLoading 是否显示加载提示
 */
function requestParameterGET(that, url, parameter, doSuccess, quantity = 0, isLoading = true, doFail, doComplete) {
  var app = getApp();
  if (isLoading && app.globalData.networkNum == 0) {
    showLoading();
  }

  if (app.globalData.nowRequestUrl == url) {
    console.log('正在请求该接口，请勿重复请求');
    return;
  } else {
    app.globalData.nowRequestUrl = url;
  }

  if (!app.globalData.isNetwork) {
    wx.showModal({
      title: '提示',
      content: '当前网络状态不佳，请检查您的网络',
      showCancel: false,
      confirmText: '我知道了',
    })
    return;
  }

  wx.request({
    url: url,
    data: parameter,
    method: 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res);

      if (typeof res.data == 'string' && res.data != 'null' && res.data != '' && res.data.indexOf('}') > -1) {
        res.data = app.trimKong(res.data);

        if (typeof res.data == 'string') {
          res.data = app.trimKong(res.data);
        }

      }

      if (typeof doSuccess == "function") {
        if (isLoading) {
          hideLoading();
        }
        doSuccess(res);
      }
    },
    fail: function () {
      failRequest(doFail);
    },
    complete: function () {

      app.globalData.nowRequestUrl = '';

      if (typeof doComplete == "function") {

        doComplete();
      }
      if (quantity != 0) {
        app.globalData.networkNum++;
      }


      if (app.globalData.networkNum == quantity) {

        app.globalData.networkNum = 0;
      }

    }
  })
}



function failRequest(doFail) {

  var app = getApp();
  var failObj = {
    isNetwork: true
  };
  if (!app.globalData.isNetwork) {
    wx.showModal({
      title: '提示',
      content: '当前网络状态不佳，请检查您的网络',
      showCancel: false,
      confirmText: '我知道了',
    })
    failObj = {
      isNetwork: false
    }
  }

  if (typeof doFail == "function") {

    if (isLoading) {
      hideLoading();
    }
    doFail(failObj);
  }
}


function showLoading(){
  wx.showLoading({
    title: '加载中。。。',
    mask: true
  })
}

function hideLoading(){
  wx.hideLoading();
}


module.exports = {
  requestPost: requestPost,
  requestGet: requestGet,
  requestParameterGET: requestParameterGET
}