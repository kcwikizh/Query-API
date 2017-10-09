const app = getApp();
var imageUtil = require('../../utils/util.js');

var thankslistView;
var thankslistTableShowView = false;

// Register a Page.
Page({
  data: {
    thankslistView,
    thankslistTableShowView
  },

  onLoad: function () {
    var that = this;
    that.setData({
      akashiTitleView: '今日改修'
    })
    wx.request({
      url: 'https://wx.kcwiki.org/query',
      //url: 'http://localhost:8080/WebApplication2/query',
      data: {
        query: 'thankslist'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.status != "success") {
          //console.log("query failed" + res.data.data);
          return;
        }
        var json = res.data.data;
        var arrs = [];
        var obj = [];
        var tmp = {};
        var list = [];
        var count = 0;
        for (var i in json) {
          var item = json[i];
          arrs = [];
          for (var j in item) {
            arrs.push(item[j]);
          }
          tmp = { title: i };
          obj.push(tmp);
          tmp = { arr: arrs };
          obj.push(tmp);
          list.push(obj);
          //console.log(obj);
          arrs = [];
          obj = [];
          count++;
        }
        //console.log(list);
        that.setData({
          thankslistView: list,
          thankslistTableShowView: true
        })
      },
    })
  },

  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

  backTo: function (e) {
    var page = e.target.dataset.index.toString();
    wx.navigateTo({
      url: '../' + page + '/' + page
    })
  },

  thankslist: function (e) {
    wx.navigateTo({
      url: '../' + thankslist + '/' + thankslist
    })
  },

  scrollToViewFn: function scrollToViewFn(view) {
    //var _id = e.target.dataset.id;
    this.setData({
      toView: view
    })
    //console.log(this.data.toView)

  },
})