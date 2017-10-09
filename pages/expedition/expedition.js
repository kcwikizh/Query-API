const app = getApp();
var areaTitleView;
var areaTableShowView;
var pointTitleView;
var pointTableShowView;

// Register a Page.
Page({
  data: {
    areaTitleView,
    areaTableShowView,
    pointTitleView,
    pointTableShowView
  },

  onLoad: function () {
    var that = this;
    that.setData({
      areaTitleView: '各大海域'
    })
    wx.request({
      url: 'https://wx.kcwiki.org/query',
      data: {
        query: 'expedition'
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
        app.globalData.expeditionData = res.data.data;
        //console.log("globalData" + app.globalData.expeditionData);
        var arrs = [];
        var obj = [];
        var tmp = {};
        var list = [];
        var count = 0;
        var isAdd = false;
        for (var i in json) {
          isAdd = false;
          count++;
          obj = [];
          tmp = { name: i };
          obj.push(tmp);
          arrs.push(obj);
          if (count % 2 == 0) {
            list.push(arrs);
            arrs = [];
            isAdd = true;
          }
        };
        if (!isAdd) {
          list.push(arrs);
        }
        //console.log(list);
        that.setData({
          areaTitleView: '各大海域',
          areaDataView: list,
          areaTableShowView: true
        })
      },
    })
  },

  getpoint: function getpoint(e) {
    var that = this;
    var areaName = e.currentTarget.dataset.index.toString();
    //console.log(areaName);

    if (app.globalData.expeditionData == null) {
      wx.request({
        url: 'https://wx.kcwiki.org/query',
        data: {
          query: 'expedition'
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function (res) {

          //console.log(res.data);
          var json = res.data.data;
          app.globalData.expeditionData = res.data.data;
          var arrs = [];
          var obj = [];
          var tmp = {};
          var list = [];
          var count = 0;
          var isAdd = false;
          for (var i in json) {
            if (areaName == i) {
              json = json[i];
              //console.log(i);
            }
          };

          for (var i in json) {
            isAdd = false;
            count++;
            obj = [];
            var str = "";
            tmp = { id: i };
            obj.push(tmp);

            var pointjson = json[i];
            str = "\n" + "编号 :" + i;
            if (pointjson.japanese != "null") {
              str = str + "\n" + "日语名称 :" + pointjson.japanese;
            };
            if (pointjson.time != "null") {
              str = str + "\n" + "远征时间 :" + pointjson.time;
            };
            if (pointjson.fuel != "null") {
              str = str + "\n" + "获得燃料 :" + pointjson.fuel;
            };
            if (pointjson.ammo != "null") {
              str = str + "\n" + "获得弹药 :" + pointjson.ammo;
            };
            if (pointjson.steel != "null") {
              str = str + "\n" + "获得钢材 :" + pointjson.steel;
            };
            if (pointjson.aluminum != "null") {
              str = str + "\n" + "获得铝材 :" + pointjson.aluminum;
            };
            if (pointjson.fleetlevel != "null") {
              str = str + "\n" + "舰队总等级 :" + pointjson.fleetlevel;
            };
            if (pointjson.flagshiplevel != "null") {
              str = str + "\n" + "旗舰等级 :" + pointjson.flagshiplevel;
            };
            if (pointjson.lowcount != "null") {
              str = str + "\n" + "最低舰娘数 :" + pointjson.lowcount;
            };
            if (pointjson.appointedship != "null") {
              str = str + "\n" + "必需舰娘 :" + pointjson.appointedship;
            };
            if (pointjson.bucket != "null") {
              str = str + "\n" + "运输桶 :" + pointjson.bucket;
            };
            if (pointjson.reward != "null") {
              str = str + "\n" + "随机奖励 :" + pointjson.reward;
            };
            str = str + "\n\n"
            tmp = { data: str };
            obj.push(tmp);
            arrs.push(obj);
            if (count % 2 == 0) {
              list.push(arrs);
              arrs = [];
              isAdd = true;
            }
          };
          if (!isAdd) {
            list.push(arrs);
          }
          //console.log(list);
          that.setData({
            pointDataView: list,
            pointTitleView: areaName,
            pointTableShowView: true
          })
        },
      })
    } else {
      var json = app.globalData.expeditionData;
      //console.log(json);
      var arrs = [];
      var obj = [];
      var tmp = {};
      var list = [];
      var count = 0;
      var isAdd = false;
      for(var i in json) {
        if (areaName == i) {
          json = json[i];
          //console.log(i);
        }
      };

      for (var i in json) {
        isAdd = false;
        count++;
        obj = [];
        var str = "";
        tmp = { id: i };
        obj.push(tmp);
        var blank = false;
        var pointjson = json[i];
        str = "\n" + "编号 :" + i;
        if (pointjson.japanese != "null") {
          str = str + "\n" + "日语名称 :" + pointjson.japanese ;
        };
        if (pointjson.time != "null") {
          str = str + "\n" + "远征时间 :" + pointjson.time ;
        };
        if (pointjson.fuel != "null") {
          if (!blank) {
            str = str + "\n\n" + "获得燃料 :" + pointjson.fuel;
            blank = true;
          } else {
            str = str + "\n" + "获得燃料 :" + pointjson.fuel;
          }
        };
        if (pointjson.ammo != "null") {
          if (!blank) {
            str = str + "\n\n" + "获得弹药 :" + pointjson.ammo;
            blank = true;
          } else {
            str = str + "\n" + "获得弹药 :" + pointjson.ammo;
          }
        };
        if (pointjson.steel != "null") {
          if (!blank) {
            str = str + "\n\n" + "获得钢材 :" + pointjson.steel;
            blank = true;
          } else {
            str = str + "\n" + "获得钢材 :" + pointjson.steel;
          }
        };
        if (pointjson.aluminum != "null") {
          if (!blank) {
            str = str + "\n\n" + "获得铝材 :" + pointjson.aluminum;
            blank = true;
          } else {
            str = str + "\n" + "获得铝材 :" + pointjson.aluminum;
          }
        };
        blank = false;
        if (pointjson.fleetlevel != "null") {
          str = str + "\n\n" + "舰队总等级 :" + pointjson.fleetlevel ;
          blank = true;
        };
        if (pointjson.flagshiplevel != "null") {
          if (blank) {
            str = str + "\n" + "旗舰等级 :" + pointjson.flagshiplevel;
            blank = false;
          } else {
            str = str + "\n\n" + "旗舰等级 :" + pointjson.flagshiplevel;
          }
        };
        if (pointjson.lowcount != "null") {
            str = str + "\n" + "最低舰娘数 :" + pointjson.lowcount;
        };
        if (pointjson.appointedship != "null") {
          str = str + "\n" + "必需舰娘 :" + pointjson.appointedship ;
        };
        if (pointjson.bucket != "null") {
          str = str + "\n" + "运输桶 :" + pointjson.bucket ;
        };
        if (pointjson.reward != "null") {
          str = str + "\n\n" + "随机奖励 :" + pointjson.reward ;
        };
        str = str + "\n\n"
        tmp = { data: str };
        obj.push(tmp);
        arrs.push(obj);
        if (count % 2 == 0) {
          list.push(arrs);
          arrs = [];
          isAdd = true;
        }
      };
      if (!isAdd) {
        list.push(arrs);
      }
      //console.log(list);
      that.setData({
        pointDataView: list,
        pointTitleView: areaName,
        pointTableShowView: true
      });
      this.scrollToViewFn('pointTable');
    }
  },

  backTo: function (e) {
    var page = e.target.dataset.index.toString();
    wx.navigateTo({
      url: '../' + page + '/' + page
    })
  },

  scrollToViewFn: function scrollToViewFn (view) {
    //var _id = e.target.dataset.id;
    this.setData({
      toView: view
    })
    //console.log(this.data.toView)

  }, 

})