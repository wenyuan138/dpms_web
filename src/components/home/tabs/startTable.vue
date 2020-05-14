<template>
  <div class="starttable">
    <div class="head">
      <span class="title">运行报表</span>
      <div class="tabWrap">
        <span class="tab" :class="startTab == 1?'selected':''" @click="changeTab(1)">运行日报</span>
        <span class="tab" :class="startTab == 2?'selected':''" @click="changeTab(2)">运行月报</span>
        <span class="tab" :class="startTab == 3?'selected':''" @click="changeTab(3)">运行年报</span>
      </div>
    </div>
    <div class="search">
      <span class="dataSearch" v-show="startTab == 1">
        <span>日期：</span>
        <el-date-picker v-model="day" type="date" placeholder="选择日期" size="mini">
        </el-date-picker>
      </span>
      <span class="dataSearch" v-show="startTab == 2">
        <span>月份：</span>
        <el-date-picker v-model="month" type="month" placeholder="选择月" size="mini">
        </el-date-picker>
      </span>
      <span class="dataSearch" v-show="startTab == 3">
        <span>年份：</span>
        <el-date-picker v-model="year" type="year" placeholder="选择年" size="mini">
        </el-date-picker>
      </span>
      <span class="dataSearch">
        <span>站点：</span>
        <div style="text-align:right; padding-right:1em;display:inline-block;height:40px;">
          <select style="border:none; background:rgb(25,51,29); color:#fff; padding:0.25em; border-radius:0.25em;height:31px;"
            @change="getDayData()">
            <option v-for="item in selectData" :value="item.ID">{{item.Name}}</option>
          </select>
        </div>
      </span>
      <el-button style="float:right;font-size:16px;" size="mini" type="primary">导出</el-button>
    </div>
    <div class="content">
      <!-- 日报 -->
      <table class="tables" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th colspan="2">设备</th>
          </tr>
          <tr>
            <th>时间</th>
            <th>时总电量</th>
          </tr>
          <tr v-for="item in totalData">
            <td>{{item.collectTime}}</td>
            <td>{{item.powGenerDay}}</td>
          </tr>
        </thead>
      </table>
      <table class="tables" cellpadding="0" cellspacing="0" v-for="(item,index) in listData[0].inverterData">
        <thead>
          <tr>
            <th colspan="3">{{item.InverterID}}# {{item.InverterName}}</th>
          </tr>
          <tr>
            <th>总发电量</th>
            <th>日发电量</th>
            <th>功率</th>
          </tr>
          <tr v-for="(items,indexs) in listData">
            <td>{{items.inverterData[index].powGenerAll}}</td>
            <td>{{items.inverterData[index].powGenerDay}}</td>
            <td>{{items.inverterData[index].acOutActPow}}</td>
          </tr>
        </thead>
      </table>
      <el-pagination :total="5" layout="prev, pager, next" background class="fixed">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'startTable',
    data () {
      return {
        startTab: 1,//默认激活的tab
        day: '',//日期选择
        month: '',//月份选择
        year: '',//年份选择
        selectData: [],//下拉选项
        totalData: [],//总电量
        listData: [
          {
            inverterData:[]
          }
        ],//逆变器数据
      }
    },
    methods: {
      changeTab (num) {
        this.startTab = num
      },
      //点击tab时调用的方法
      mountedMethods () {
        this.getSelectData()
        this.getDayData()
      },
      //获取下拉框数据
      getSelectData () {
        let res = { "TotalNum": 0, "Data": [{ "ID": 2, "Name": "白塔子镇杨杖子村" }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        this.selectData = res.Data
      },
      //获取日报数据(月数据和年数据格式相同)
      getDayData () {
        let res = { "TotalNum": 6, "Data": [{ "collectTime": "00:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 0.0, "powGenerAll": 63326.7, "acOutActPow": 0.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.0, "powGenerAll": 71235.4, "acOutActPow": 0.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 0.0, "powGenerAll": 103508.9, "acOutActPow": 0.0 }] }, { "collectTime": "01:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 0.0, "powGenerAll": 63326.7, "acOutActPow": 0.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.0, "powGenerAll": 71235.4, "acOutActPow": 0.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 0.0, "powGenerAll": 103508.9, "acOutActPow": 0.0 }] }, { "collectTime": "02:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 0.0, "powGenerAll": 63326.7, "acOutActPow": 0.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.0, "powGenerAll": 71235.4, "acOutActPow": 0.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 0.0, "powGenerAll": 103508.9, "acOutActPow": 0.0 }] }, { "collectTime": "03:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 0.0, "powGenerAll": 63326.7, "acOutActPow": 0.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.0, "powGenerAll": 71235.4, "acOutActPow": 0.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 0.0, "powGenerAll": 103508.9, "acOutActPow": 0.0 }] }, { "collectTime": "04:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 0.0, "powGenerAll": 63326.7, "acOutActPow": 0.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.0, "powGenerAll": 71235.4, "acOutActPow": 0.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 0.0, "powGenerAll": 103508.9, "acOutActPow": 0.0 }] }, { "collectTime": "05:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 0.0, "powGenerAll": 63326.7, "acOutActPow": 0.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.0, "powGenerAll": 71235.4, "acOutActPow": 0.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 0.0, "powGenerAll": 103508.9, "acOutActPow": 6.0 }] }, { "collectTime": "06:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 0.1, "powGenerAll": 63326.8, "acOutActPow": 341.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.0, "powGenerAll": 71235.4, "acOutActPow": 0.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 0.2, "powGenerAll": 103509.1, "acOutActPow": 564.0 }] }, { "collectTime": "07:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 1.4, "powGenerAll": 63328.1, "acOutActPow": 1644.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.8, "powGenerAll": 71236.2, "acOutActPow": 1106.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 1.9, "powGenerAll": 103510.9, "acOutActPow": 2131.0 }] }, { "collectTime": "08:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 3.3, "powGenerAll": 63330.1, "acOutActPow": 3174.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.8, "powGenerAll": 71236.2, "acOutActPow": 1106.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 4.7, "powGenerAll": 103513.6, "acOutActPow": 4168.0 }] }, { "collectTime": "09:00", "inverterData": [{ "InverterID": "7", "InverterName": "白塔子镇1#逆变器", "powGenerDay": 8.2, "powGenerAll": 63334.9, "acOutActPow": 6257.0 }, { "InverterID": "8", "InverterName": "白塔子镇2#逆变器", "powGenerDay": 0.8, "powGenerAll": 71236.2, "acOutActPow": 1106.0 }, { "InverterID": "9", "InverterName": "白塔子镇3#逆变器", "powGenerDay": 10.6, "powGenerAll": 103519.5, "acOutActPow": 7563.0 }] }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": [{ "collectTime": "00:00", "powGenerDay": 0.0 }, { "collectTime": "01:00", "powGenerDay": 0.0 }, { "collectTime": "02:00", "powGenerDay": 0.0 }, { "collectTime": "03:00", "powGenerDay": 0.0 }, { "collectTime": "04:00", "powGenerDay": 0.0 }, { "collectTime": "05:00", "powGenerDay": 0.0 }, { "collectTime": "06:00", "powGenerDay": 0.5 }, { "collectTime": "07:00", "powGenerDay": 8.6 }, { "collectTime": "08:00", "powGenerDay": 20.2 }, { "collectTime": "09:00", "powGenerDay": 45.4 }] }
        this.totalData = res.OtherInfo
        this.listData = res.Data
      },
    }
  }
</script>

<style lang="less" scoped>
  .starttable {
    padding: 20px;
    .head {
      text-align: center;
      .title {
        font-size: 26px;
        color: #f0f0f0;
        font-weight: 600;
      }
      .tabWrap {
        float: right;
        .tab {
          background-color: transparent !important;
          border: 1px solid #ccc;
          padding: 6px 10px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }
        .selected {
          background-color: rgb(34, 34, 34) !important;
        }
      }
    }
    .search {
      line-height: 31px;
      height: 31px;
      .dataSearch {
        span {
          font-size: 20px;
          color: #f0f0f0;
          font-weight: 600;
          margin-left: 20px;
        }
        /deep/.el-input__inner {
          background-color: rgb(25, 51, 29);
          border: none;
          color: white;
        }
      }
    }
    .content {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 15px 0;
      background-color: rgb(34, 34, 34);
      border-radius: 10px;
      height: 750px;
      /deep/.el-pager{
        /deep/.active{
          background-color:rgb(84,152,132) !important;
        }
      }
      .tables {
        width: 24%;
        tr {
          width: 100%;
          height: 30px;
          th {
            color: white;
            border: 1px solid white;
            background-color: rgb(56, 56, 56);
          }
          td {
            color: white;
            text-align: center;
            font-size: 14px;
            border: 1px solid white;
          }
        }
        tr:nth-child(odd) > td {
          background-color: rgb(115, 115, 115);
        }
        tr:nth-child(even) > td {
          background-color: rgb(89, 89, 89);
        }
      }
      .fixed{
        position: fixed;
        bottom:50px;
      }
    }
    @media screen and (max-width: 1800px) {
      .content{
        height:600px;
      }
    }
  }
</style>

