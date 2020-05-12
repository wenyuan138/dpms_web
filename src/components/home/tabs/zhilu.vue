<template>
  <div class="zhilu">
    <div class="head">
      <span class="title">支路电流分析</span>
    </div>
    <div class="search">
      <span class="dataSearch">
        <span>日期：</span>
        <el-date-picker v-model="daySelect" type="date" placeholder="选择日期" size="mini">
        </el-date-picker>
      </span>
      <span class="dataSearch">
        <span>开始时间：</span>
        <el-time-picker v-model="startTime" placeholder="任意时间点" size="mini">
        </el-time-picker>
      </span>
      <span class="dataSearch">
        <span>截止时间：</span>
        <el-time-picker v-model="endTime" placeholder="任意时间点" size="mini">
        </el-time-picker>
      </span>
      <span class="dataSearch">
        <span>为零系数：</span>
        <div class="alarmDiv">
          <select class="alarmSelect" v-model="zeroNum">
            <option v-for="item in zeroNums" :value="item.value">{{item.value}}</option>
          </select>
        </div>
      </span>
      <span class="dataSearch">
        <span>偏低系数：</span>
        <div class="alarmDiv">
          <select class="alarmSelect" v-model="lowNum">
            <option v-for="item in zeroNums" :value="item.value">{{item.value}}</option>
          </select>
        </div>
      </span>
      <el-button type="primary" style="font-size:15px;margin-left:10px;" size="mini">确认</el-button>
    </div>
    <div class="content">
      <el-table :data="listData" border style="width: 95%;">
        <el-table-column prop="rowNum" label="电量排名" min-width="50">
        </el-table-column>
        <el-table-column prop="inverterName" label="逆变器" min-width="150">
        </el-table-column>
        <el-table-column prop="opScale" label="容量(kWp)" min-width="50">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.opScale*10000)/10}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="支路数量" min-width="50">
          <template slot-scope="scope">
            <span>2</span>
          </template>
        </el-table-column>
        <el-table-column prop="gener" label="发电量(kWh)" min-width="50">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.gener*10)/10}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="等价发电小时数" min-width="50">
        </el-table-column>
        <el-table-column prop="advice" label="发电单元运行水平" min-width="100">
        </el-table-column>
        <el-table-column prop="collectTime" label="支路电流为0情况" min-width="100">
        </el-table-column>
        <el-table-column prop="collectTime" label="支路电流偏低情况" min-width="100">
        </el-table-column>
      </el-table>
      <el-pagination :total="5" layout="prev, pager, next" background class="fixed">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'zhiludianliu',
    data () {
      return {
        zeroNums: [
          { value: 0.1 }, { value: 0.2 }, { value: 0.3 }, { value: 0.4 }, { value: 0.5 }, { value: 0.6 }, { value: 0.7 }, { value: 0.8 }, { value: 0.9 },
        ],//系数拉下选项
        zeroNum: 0.8,
        lowNum: 0.4,//系数默认数值
        startTime: '',//开始时间
        endTime: '',//结束时间
        daySelect: '',//选择是日期
        listData: [],//列表数据
      }
    },
    methods: {
      //点击tab调用的方法
      mountedMethods () {
        this.getListData()
      },
      //获取列表数据
      getListData () {
        this.listData = []
        let res = { "TotalNum": 6, "Data": [{ "rowNum": 1, "gener": 9.83, "inverterID": 9, "inverterName": "白塔子镇3#逆变器 白塔子镇3#逆变器", "opScale": 0.03564, "current": 0.099406766073432726, "headerBoxID": 17 }, { "rowNum": 1, "gener": 9.83, "inverterID": 9, "inverterName": "白塔子镇3#逆变器 白塔子镇3#逆变器", "opScale": 0.03564, "current": 0.092993426326759637, "headerBoxID": 18 }, { "rowNum": 2, "gener": 7.59, "inverterID": 12, "inverterName": "白塔子镇6#逆变器 白塔子镇6#逆变器", "opScale": 0.0297, "current": 0.13628346961680293, "headerBoxID": 23 }, { "rowNum": 2, "gener": 7.59, "inverterID": 12, "inverterName": "白塔子镇6#逆变器 白塔子镇6#逆变器", "opScale": 0.0297, "current": 0.045695045695045691, "headerBoxID": 24 }, { "rowNum": 3, "gener": 7.5700000000000012, "inverterID": 7, "inverterName": "白塔子镇1#逆变器 白塔子镇1#逆变器", "opScale": 0.03564, "current": 0.097001763668430344, "headerBoxID": 13 }, { "rowNum": 3, "gener": 7.5700000000000012, "inverterID": 7, "inverterName": "白塔子镇1#逆变器 白塔子镇1#逆变器", "opScale": 0.03564, "current": 0.0617283950617284, "headerBoxID": 14 }, { "rowNum": 4, "gener": 6.98, "inverterID": 10, "inverterName": "白塔子镇4#逆变器 白塔子镇4#逆变器", "opScale": 0.0297, "current": 0.072951739618406286, "headerBoxID": 19 }, { "rowNum": 4, "gener": 6.98, "inverterID": 10, "inverterName": "白塔子镇4#逆变器 白塔子镇4#逆变器", "opScale": 0.0297, "current": 0.12866762866762865, "headerBoxID": 20 }, { "rowNum": 5, "gener": 5.0, "inverterID": 8, "inverterName": "白塔子镇2#逆变器 白塔子镇2#逆变器", "opScale": 0.03564, "current": 0.094596761263427934, "headerBoxID": 15 }, { "rowNum": 5, "gener": 5.0, "inverterID": 8, "inverterName": "白塔子镇2#逆变器 白塔子镇2#逆变器", "opScale": 0.03564, "current": 0.015231681898348564, "headerBoxID": 16 }, { "rowNum": 6, "gener": 0.0, "inverterID": 11, "inverterName": "白塔子镇5#逆变器 白塔子镇5#逆变器", "opScale": 0.0297, "current": 0.0, "headerBoxID": 21 }, { "rowNum": 6, "gener": 0.0, "inverterID": 11, "inverterName": "白塔子镇5#逆变器 白塔子镇5#逆变器", "opScale": 0.0297, "current": 0.0, "headerBoxID": 22 }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": [0.13628346961680293, 0.22381593714927051] }
        res.Data.forEach((item, index) => {
          if (index % 2 == 1) {
            this.listData.push(Object.assign(item, res.Data[index - 1]))
          }
        })
        console.log(this.listData)//数据处理不完善，需要对应的公式计算列表中的某些值
      }
    }
  }
</script>

<style lang="less" scoped>
  .zhilu {
    padding: 20px;
    .head {
      text-align: center;
      .title {
        font-size: 26px;
        color: #f0f0f0;
        font-weight: 600;
      }
    }
    .search {
      line-height: 31px;
      height: 31px;
      margin-top: 30px;
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
        /deep/.el-range-input {
          background-color: rgb(25, 51, 29);
          border: none;
          color: white;
          font-size: 16px;
        }
        /deep/.el-input {
          width: 200px;
        }
        @media screen and (max-width: 1910px) {
          /deep/.el-input{
            width: 150px;
          }
        }
        /deep/.el-range-separator {
          color: white;
        }
        .alarmDiv {
          text-align: left;
          display: inline-block;
          height: 40px;
        }
        .alarmSelect {
          border: none;
          background: rgb(25, 51, 29);
          color: #fff;
          padding: 0.25em;
          border-radius: 0.25em;
          height: 31px;
        }
      }
    }
    .content {
      margin-top: 20px;
      width: 100%;
      padding: 15px 0 0 40px;
      background-color: rgb(34, 34, 34);
      border-radius: 10px;
      height: 750px;
      position: relative;
      /deep/.el-pager {
        /deep/.active {
          background-color: rgb(84, 152, 132) !important;
        }
      }
      /deep/.el-table__body-wrapper,
      /deep/.el-table__row {
        background-color: rgb(115, 115, 115);
        color: white;
      }
      /deep/.el-table__row > td {
        padding: 0;
        height: 28px;
        line-height: 28px;
      }
      /deep/.el-table thead tr th {
        background-color: rgb(56, 56, 56);
        color: white;
        height: 28px;
        line-height: 28px;
        padding: 0;
      }
      /* 移除table组件hover背景色 */
      /deep/.el-table__row:hover > td {
        background: rgb(115, 115, 115) !important;
      }
      .fixed {
        position: fixed;
        bottom: 50px;
        left: 50%;
      }
    }
    @media screen and (max-width: 1910px) {
      .content{
        height:500px;
      }
    }
  }
</style>

