<template>
  <div class="sidemenu">
    <h1 class="title">{{sideMenuData.PVInfo.Name}}<br>分布式光伏发电项目</h1>
    <p class="currentTime">{{curTime}}</p>
    <div class="basicInfo">
      <div>
        <p>电站概况</p>
        <div class="box">
          <span>电站容量</span>
          <a>{{parseInt(sideMenuData.PVInfo.OpScale*1000)}}kW</a>
        </div>
        <div class="box">
          <span>逆变器数量</span>
          <a>{{sideMenuData.PVInfo.InverterCount}}台</a>
        </div>
        <div class="box">
          <span>运行天数</span>
          <a>{{startTime}}天</a>
        </div>
        <div class="box">
          <span>投产日期</span>
          <a>{{sideMenuData.PVInfo.TransferDate}}</a>
        </div>
      </div>
      <div>
        <p>电量统计</p>
        <div class="box">
          <span>日发电量</span>
          <a>{{Math.round(sideMenuData.Day)}}kWh</a>
        </div>
        <div class="box">
          <span>月发电量</span>
          <a>{{Math.round(sideMenuData.Month*10)/10}}kWh</a>
        </div>
        <div class="box">
          <span>年发电量</span>
          <a>{{Math.round(sideMenuData.Year)}}kWh</a>
        </div>
        <div class="box">
          <span>累计发电量</span>
          <a>{{Math.round(sideMenuData.Sum/1000)/10}}万kWh</a>
        </div>
      </div>
      <div>
        <p>逆变器状态</p>
        <div class="status" v-for="item in sideMenuData.inverterState">
          <span>{{item.State}}</span>
          <a>{{item.Count}}</a>
          <span>台</span>
          <ul class="process">
            <li class="processResult" :style="{width:item.Count/sideMenuData.PVInfo.InverterCount*100+'%'}"></li>
          </ul>
        </div>
      </div>
      <div>
        <p>节能减排</p>
        <div class="box">
          <span>节约标准煤</span>
          <a>{{Math.round(sideMenuData.Sum/1000)/10}}吨</a>
        </div>
        <div class="box">
          <span>CO2减排量</span>
          <a>{{Math.round(sideMenuData.Sum/1000)/10}}吨</a>
        </div>
        <div class="box">
          <span>碳粉尘减排量</span>
          <a>{{Math.round(sideMenuData.Sum/1000)/10}}吨</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sideMenu",
    data () {
      return {
        sideMenuData: {
          PVInfo: {},
          inverterState: []
        },//侧边栏数据
        curTime: '',//现在的时间
        timer: "",//定义一个定时器的变量
        startTime: '',//运行时间
      }
    },
    created () {
      var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function () {
        _this.curTime = //修改数据date
          new Date().getFullYear() +
          "-" +
          _this.appendZero((new Date().getMonth() + 1)) +
          "-" +
          _this.appendZero(new Date().getDate()) +
          " " +
          _this.appendZero(new Date().getHours()) +
          ":" +
          _this.appendZero(new Date().getMinutes()) +
          ":" +
          _this.appendZero(new Date().getSeconds());
      }, 1000);
    },
    mounted () {
      this.getSideMenuData()
    },
    methods: {
      //过滤加0
      appendZero (obj) {
        if (obj < 10) {
          return "0" + obj;
        } else {
          return obj;
        }
      },
      //获取侧边栏数据
      getSideMenuData () {
        // let data = {

        // }
        // this.api.sideMenu.getSideMenuData(data).then(res => {
        //   if (res.IsSuccess) {
        //     console.log(res)
        //   }
        // })
        let res = { "TotalNum": 0, "Data": { "Day": 786.99, "Month": 4740.21, "Year": 90746.989840000024, "Sum": 668037.99921998836, "Power": 109123.0, "inverterState": [{ "State": "正常", "Count": 4 }, { "State": "正常待机", "Count": 0 }, { "State": "异常告警", "Count": 0 }, { "State": "通讯异常", "Count": 2 }], "ErrorList": [], "StandbyList": [], "OutLineList": ["白塔子镇杨杖子村8#逆变器", "白塔子镇杨杖子村11#逆变器"], "PVInfo": { "Name": "朝阳", "TransferDate": "2018-05-18", "InverterCount": 6, "OpScale": 0.19602 } }, "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        this.sideMenuData = res.Data
        this.startTime = Math.abs(this.getBeforeDate(this.sideMenuData.PVInfo.TransferDate)) + 1
      },
      //获取运行天数
      getBeforeDate (n) {
        var now = new Date();
        var aftertime = new Date(n);
        var year = now.getFullYear();
        var mon = now.getMonth() + 1;
        var day = now.getDate();
        var year_after = aftertime.getFullYear();
        var mon_after = aftertime.getMonth() + 1;
        var day_after = aftertime.getDate();
        var chs = 0;
        //获取当月的天数
        function DayNumOfMonth (Year, Month) {
          return 32 - new Date(Year, Month - 1, 32).getDate();
        }
        if (aftertime.getTime() - now.getTime() < 0) {
          var temp1 = day_after;
          var temp2 = mon_after;
          var temp3 = year_after;
          day_after = day;
          mon_after = mon;
          year_after = year;
          day = temp1;
          mon = temp2;
          year = temp3;
        }
        if (year == year_after) {//不跨年
          if (mon == mon_after) {//不跨年不跨月
            chs += day_after - day;
          } else {//不跨年跨月
            chs += DayNumOfMonth(year, mon) - day + 1;//加上第一个不满的
            for (var i = 1; i < mon_after - mon; i++) {
              chs += DayNumOfMonth(year, mon + i);
            }
            chs += day_after - 1;//加上
          }
        } else {//存在跨年
          chs += DayNumOfMonth(year, mon) - day + 1;//加上开始年份不满的一个月
          for (var m = 1; m < 12 - mon; m++) {
            chs += DayNumOfMonth(year, mon + m);
          }
          for (var j = 1; j < year_after - year; j++) {
            if ((year + j) % 400 == 0 || (year + j) % 4 == 0 && (year + j) % 100 != 0) {
              chs += 366;
            } else {
              chs += 365;
            }
          }
          for (var n = 1; n <= mon_after; n++) {
            chs += DayNumOfMonth(year_after, n);
          }
          chs += day_after - 1;
        }
        if (aftertime.getTime() - now.getTime() < 0) {
          return -chs;
        } else {
          return chs;
        }
      }
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }
</script>

<style lang="less" scoped>
  .sidemenu {
    p {
      margin: 0;
    }
    .title {
      font-size: 28px;
      text-align: center;
      color: white;
      margin: 5px;
      margin-top: 10px;
    }
    .currentTime {
      color: rgb(194, 228, 168);
      text-align: center;
      font-size: 18px;
      margin: 5px;
    }
    .basicInfo {
      p {
        background-color: black;
        line-height: 38px;
        font-size: 20px;
        font-weight: 600;
        color: white;
        text-align: center;
      }
      .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        line-height: 38px;
        padding: 0 20px;
        border-bottom: 1px solid rgb(69, 114, 96);
        text-shadow: 1px 1px 1px black;
        span {
          font-size: 16px;
          color: white;
        }
        a {
          font-size: 15px;
          color: rgb(204, 130, 0);
        }
      }
      @media screen and (max-width: 1910px) {
        p{
          line-height:22px;
        }
        .box{
          line-height:22px;
        }
      }
      .box:last-child {
        border: none;
      }
      .status {
        font-weight: 600;
        border-bottom: 1px solid rgb(69, 114, 96);
        text-shadow: 1px 1px 1px black;
        text-align: left;
        padding: 10px 16px;
        span {
          font-size: 16px;
          color: white;
        }
        a {
          font-size: 18px;
          color: rgb(204, 130, 0);
        }
        .process {
          width: 230px;
          height: 8px;
          background-color: #222;
          list-style: none;
          margin: 0;
          margin-top: 5px;
          padding: 0;
        }
        .processResult {
          background-color: rgb(38, 227, 233);
          height: 8px;
        }
      }
    }
  }
</style>
