
const app = getApp();
//var poidb = require('../../pages/poidb/poidb.js'); 
var imageUtil = require('../../utils/util.js');

var helloData = {
  name: 'WeChat'
}
var areaTitleView;
var areaTableShowView = true;
var pointTitleView;
var mapImgView = null;
var pointTableShowView = false;
var rareShipView;
var rareShipTitleView = "稀有船掉落率";
var notrareShipView;
var notrareShipTitleView = "非稀有船掉落率";
var ShipTableShowView;
var mapNo;
var pointNo = null;
var BossPoint;
var difficulty = 3;
var assessment = "SAB"
var difficultyTableShowView = false;
var images;

// Register a Page.
Page({
  data: {
    areaTitleView,
    areaTableShowView,
    pointTitleView,
    mapImgView, 
    pointTableShowView,
    rareShipView,
    rareShipTitleView : '稀有船掉落率',
    notrareShipView,
    notrareShipTitleView : '非稀有船掉落率',
    ShipTableShowView,
    difficulty,
    difficultyTableShowView,
    pointNo,
    BossPoint,
    images: {}
  },
  changeName: function (e) {
    // sent data change to view
    this.setData({
      name: 'MINA'
    })
  },

  onLoad: function () {
    var that = this;
    that.setData({
      areaTitleView: '各大海域'
    })
    wx.request({
      url: 'https://exp.wx.kcwiki.org/query',
      data:{
        query: 'area'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.status != "success"){
          //console.log("query failed" + res.data.data);
          return;
        }
        var json = res.data.data;
        app.globalData.areaData = res.data.data;
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
          var strs = [];
          strs = i.split("-");
          tmp = { no: strs[0] };
          obj.push(tmp);
          tmp = { name: strs[1] };
          obj.push(tmp);
          tmp = { data: json[i] };
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

  getarea: function getarea () {
    var that = this;

    mapNo = null;
    pointNo = null;
    BossPoint = null;
    if (app.globalData.areaData == null){
      wx.request({
        url: 'https://exp.wx.kcwiki.org/query',
        data: {
          query: 'area'
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function (res) {

          //console.log(res.data);
          var json = res.data.data;
          app.globalData.areaData = res.data.data;
          var arrs = [];
          var obj = [];
          var tmp = {};
          var list = [];
          var count = 0;
          var isAdd =false;
          for (var i in json) {
            //console.log(i + "-----" + "\n" + JSON.stringify(json[i]) + "\n")
            isAdd = false;
            count++;
            obj = [];
            var strs = [];
            strs = i.split("-");
            tmp = { no: strs[0] };
            obj.push(tmp);
            tmp = { name: strs[1] };
            obj.push(tmp);
            tmp = { data: json[i] };
            obj.push(tmp);
            arrs.push(obj);
            if (count % 2 == 0){
              list.push(arrs);
              arrs = [];
              isAdd = true;
            }
          };
          if (!isAdd){
            list.push(arrs);
          }
          //console.log(list);
          that.setData({
            areaTitleView: '各大海域',
            areaDataView: list
          })
        },
      })
    } else {
      var json = app.globalData.areaData;
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
        var strs = [];
        strs = i.split("-");
        tmp = { no: strs[0] };
        obj.push(tmp);
        tmp = { name: strs[1] };
        obj.push(tmp);
        tmp = { data: json[i] };
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
        pointTitleView : null,
        mapImgView: null,
        pointTitleShowView: null,
        images: {},
        areaTableShowView: true,
        pointTableShowView: false,
        ShipTableShowView: false,
        difficultyTableShowView: false
      });
    }
},

  getmap: function getmap (e) {
    var that = this;
    mapNo = e.currentTarget.dataset.index.toString();
    //console.log(typeof mapNo + "\n")
    //console.log(mapNo);
    var json = app.globalData.areaData;
    var areaname;
    for (var i in json) {
      var strs = [];
      strs = i.split("-");
      if (mapNo == strs[0]){
        //console.log(i + "-----" + "\n" + JSON.stringify(json[i]) + "\n");

        areaname = strs[1];
        json = json[i];
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
          tmp = { no: i };
          obj.push(tmp);
          tmp = { name: json[i] };
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
          areaTitleView: areaname,
          areaDataView: list,
          ShipTableShowView: false,
          difficultyTableShowView: false
        });
        that.scrollToViewFn('magimgTable');
        return;
      }
    };
    //console.log("123"+ "\n")
    
    wx.request({
      url: 'https://exp.wx.kcwiki.org/query',
      data: {
        query: 'map',
        mapno: mapNo
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {

        var json = res.data.data;
        that.setData({
          mapImgView: json.img
        });
        //console.log(mapImgView + "\n");

        var arrs = [];
        var list = [];
        var count = 0;
        var isAdd = false;
        json = json.point;
        for (var i in json) {
          if (json[i].indexOf("(") >= 0){
            BossPoint = json[i];
          }
          //console.log(i  + "\n" )
          isAdd = false;
          count++;
          arrs.push(json[i]);
          if (count % 6 == 0) {
            list.push(arrs);
            arrs = [];
            isAdd = true;
          }
        };
        if (!isAdd) {
          list.push(arrs);
        }
        //console.log(list);
        var isShowDifficultyTable;
        if (mapNo > 300){
          isShowDifficultyTable = true;
        } else {
          isShowDifficultyTable = false;
        }
        that.setData({
          pointDataView: list,
          pointTitleView: '请选择地图点',
          pointTableShowView : true,
          difficultyTableShowView: isShowDifficultyTable,
          ShipTableShowView: false
        });
        that.scrollToViewFn('magimgTable');
      },
    })
  },

  getpoint: function getpoint(e) {
    var that = this;
    if(e != null){
      pointNo = e.currentTarget.dataset.index.toString();
    }
    //console.log(typeof index + "\n")
    //console.log(pointNo);
    
    wx.request({
      url: 'https://exp.wx.kcwiki.org/query',
      data: {
        query: 'point',
        mapno: mapNo,
        point: pointNo,
        difficulty: difficulty,
        assessment: assessment 
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {

        var json = res.data.data;
        //console.log(json + "\n");

        var arrs = [];
        var rarelist = null;
        var notrarelist = null;
        var count = 0;
        var isAdd = false;
        var rare = json.rare;
        var notrare = json.notrare;
        //console.log(rare + "\n");
        //console.log(notrare + "\n");

        if (rare != "Empty"){
          rarelist = [];
          for (var i in rare) {
            //console.log(i + "\n")
            isAdd = false;
            count++;
            var tmp = rare[i].ship + " :\n" + rare[i].rate + "%";
            arrs.push(tmp);
            if (count % 4 == 0) {
              rarelist.push(arrs);
              arrs = [];
              isAdd = true;
            }
          };
          if (!isAdd) {
            rarelist.push(arrs);
            isAdd = false;
          }
          //console.log(rarelist);
        }
        

        arrs = [];
        count = 0;
        isAdd = false;
        if (notrare != "null"){
          notrarelist = [];
          for (var i in notrare) {
            //console.log(i + "\n")
            isAdd = false;
            count++;
            var tmp = notrare[i].ship + " :\n" + notrare[i].rate + "%";
            arrs.push(tmp);
            if (count % 4 == 0) {
              notrarelist.push(arrs);
              arrs = [];
              isAdd = true;
            }
          };
          if (!isAdd) {
            notrarelist.push(arrs);
            isAdd = false;
          }
          //console.log(notrarelist);
        }

        that.setData({
          rareShipView: rarelist,
          //rareShipTitleView: '稀有船掉落率',
          notrareShipView: notrarelist,
          //notrareShipTitleView: '非稀有船掉落率',
          ShipTableShowView: true
        });
        that.scrollToViewFn('shipTable');
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

setdifficulty: function setdifficulty (e) {
    difficulty = e.currentTarget.dataset.index;
    if (pointNo == null){
      pointNo = BossPoint;
      //console.log(BossPoint + "\tBossPoint \n");
    }
    //console.log(pointNo + "\n");
    this.getpoint(null);
  }, 

setassessment: function setassessment (e) {
  assessment = e.currentTarget.dataset.index;
  //console.log(pointNo + "\tpointNo \n");
    if(pointNo == null) {
      pointNo = BossPoint;
      //console.log(BossPoint + "\tBossPoint \n");
    }
    //console.log(pointNo + "\n");
    this.getpoint(null);
  },

selectAreaOk: function (event) {
  var selectAreaId = event.target.dataset.areaid;
  var that = this
  areaId = selectAreaId
  for (var i = 0; i < this.data.areas.length; i++) {
    if (this.data.areas[i].id == selectAreaId) {
      this.data.areas[i].isSelect = true
    } else {
      this.data.areas[i].isSelect = false
    }
  }
  this.setData({
    areas: this.data.areas,
    skus: [],
    hideArea: true
  })
  getSkus(that, selectAreaId)
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