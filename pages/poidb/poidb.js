
const app = getApp();
import {apiBase} from '../../config/config'

Page({
  data: {
    pageData:[],
    currentTab: 0
  },
  clickTab: function(e){
    // console.log(e);
    this.setData({
      currentTab: Number(e.currentTarget.dataset.current)
    })
  },
  swiperTab: function(e){
    // console.log(e);
    this.setData({
      currentTab: Number(e.detail.current)
    })
  },
  getData: function(){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'area'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(res.data.data);
          let index = 0
          let normal = {}
          let event = {}
          for (let a in res.data.data) {
            if (index < 6) {
              normal[a] = (res.data.data[a])
            }
            else {
              event[a] = (res.data.data[a])
            }
            index++;
          }
          this.setData({
            pageData: [normal,event]
          });
          console.log(this.data);
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
    this.getData()
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


})
