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
    pointTableShowView,
    pageData:[],
    blockVisiable:''
  },
  tapName: function(event){
    this.setData({
      blockVisiable: event.target.id+''
    })
  },
  getData: function(){
    wx.request({
      url: 'https://wx.kcwiki.org/query',
      data: {
        query: 'mapfast'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          //console.log("query failed" + res.data.data)
          this.setData({
            pageData: res.data.data
          });
        }
        else if ( res.data.status == "error" ) {
          //获取接口数据出错
          console.log(res.errMsg);
          wx.showToast({
            title:'数据获取出错',
          })
        }
      },
    })
  },
  onLoad: function () {
    this.getData();
    // var that = this;
    // that.setData({
    //   areaTitleView: '各大海域'
    // })
    // wx.request({
    //   url: 'https://wx.kcwiki.org/query',
    //   data: {
    //     query: 'mapfast'
    //   },
    //   method: 'POST',
    //   header: {
    //     //'content-type': 'application/json', (GET模式才能用)
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   success: function (res) {
    //     if (res.data.status != "success") {
    //       //console.log("query failed" + res.data.data);
    //       return;
    //     }
    //     var json = res.data.data;
    //     app.globalData.mapfastData = res.data.data;
    //     //console.log("globalData" + app.globalData.expeditionData);
    //     var arrs = [];
    //     var obj = [];
    //     var tmp = {};
    //     var list = [];
    //     var count = 0;
    //     var isAdd = false;
    //     for (var i in json) {
    //       isAdd = false;
    //       count++;
    //       obj = [];
    //       tmp = { name: i };
    //       obj.push(tmp);
    //       arrs.push(obj);
    //       if (count % 2 == 0) {
    //         list.push(arrs);
    //         arrs = [];
    //         isAdd = true;
    //       }
    //     };
    //     if (!isAdd) {
    //       list.push(arrs);
    //     }
    //     //console.log(list);
    //     that.setData({
    //       areaTitleView: '各大海域',
    //       areaDataView: list,
    //       areaTableShowView: true
    //     })
    //   },
    // // })
  },

  getpoint: function getpoint(e) {
    var that = this;
    var areaName = e.currentTarget.dataset.index.toString();
    //console.log(areaName);

    if (app.globalData.mapfastData == null) {
      wx.request({
        url: 'https://wx.kcwiki.org/query',
        data: {
          query: 'mapfast'
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function (res) {
          //console.log(res.data);
          var json = res.data.data;
          app.globalData.mapfastData = res.data.data;
          var arrs = [];
          var obj = [];
          var tmp = {};
          var list = [];
          var count = 0;
          var isAdd = false;
          for (var i in json) {
            console.log(i);
            if (areaName == i) {
              json = json[i];
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
              str = str + "/r" + "日语名称 :" + pointjson.japanese;
            };
            if (pointjson.time != "null") {
              str = str + "/r" + "远征时间 :" + pointjson.time;
            };
            if (pointjson.fuel != "null") {
              str = str + "/r" + "获得燃料 :" + pointjson.fuel;
            };
            if (pointjson.ammo != "null") {
              str = str + "/r" + "获得弹药 :" + pointjson.ammo;
            };
            if (pointjson.steel != "null") {
              str = str + "/r" + "获得钢材 :" + pointjson.steel;
            };
            if (pointjson.aluminum != "null") {
              str = str + "/r" + "获得铝材 :" + pointjson.aluminum;
            };
            if (pointjson.fleetlevel != "null") {
              str = str + "/r" + "舰队总等级 :" + pointjson.fleetlevel;
            };
            if (pointjson.flagshiplevel != "null") {
              str = str + "/r" + "旗舰等级 :" + pointjson.flagshiplevel;
            };
            if (pointjson.lowcount != "null") {
              str = str + "/r" + "最低舰娘数 :" + pointjson.lowcount;
            };
            if (pointjson.appointedship != "null") {
              str = str + "/r" + "必需舰娘 :" + pointjson.appointedship;
            };
            if (pointjson.bucket != "null") {
              str = str + "/r" + "运输桶 :" + pointjson.bucket;
            };
            if (pointjson.reward != "null") {
              str = str + "/r" + "随机奖励 :" + pointjson.reward;
            };
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
      var json = app.globalData.mapfastData;
      //console.log(json);
      var arrs = [];
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


      for (var j in json) {
        count++;
        var str = "";
        str = "\n" + "地图编号 :" + j;
        var blank = false;
        var obj = [];
        tmp = { id: j };
        obj.push(tmp);
        for (var i in json[j]) {
          isAdd = false;
          //console.log(i);

          var pointjson = json[j][i];
          //console.log(pointjson);
          str = str + "\n\n" + "方案 " + (parseInt(i) + 1) + " ：";
          if (pointjson.enemyaviation != "null") {
            str = str + "\n" + "敌方制空 :" + pointjson.enemyaviation;
          };
          if (pointjson.betteraviation != "null") {
            str = str + "\n" + "空优数值 :" + pointjson.betteraviation;
          };
          if (pointjson.bestaviation != "null") {
            str = str + "\n" + "空确数值 :" + pointjson.bestaviation;
          };
          str = str + "\n";
          if (pointjson.recommended != "null") {
            str = str + "\n" + "推荐配置 :" + pointjson.recommended;
            blank = true;
          };
          if (blank){
            str = str + "\n";
            blank = false;
          }
          if (pointjson.guideline != "null") {
            str = str + "\n" + "带路条件 :" + pointjson.guideline;
          };
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

  scrollToViewFn: function scrollToViewFn(view) {
    //var _id = e.target.dataset.id;
    this.setData({
      toView: view
    })
    //console.log(this.data.toView)

  },
})
