<template>
  <div class="lisan">
    <div class="head">
      <span class="title">组串离散率</span>
    </div>
    <div class="search">
      <span class="dataSearch">
        <span>日期：</span>
        <el-date-picker v-model="daySelect" type="date" placeholder="选择日期" size="mini">
        </el-date-picker>
      </span>
      <el-button type="primary" style="font-size:15px;margin-left:10px;" size="mini">确认</el-button>
    </div>
    <div class="content">
      <vueCharts :id="'lisan'" :chartData="lisanData" style="height:40%"></vueCharts>
      <div class="contentTable">
        <el-table :data="dataList">
          <el-table-column prop="Comment" label="逆变器">
          </el-table-column>
          <el-table-column prop="DiscreteRate" label="离散率(%)">
          </el-table-column>
          <el-table-column label="组串1">
            <template slot-scope="scope">
              <span>{{scope.row.VoltageList[0]}}/{{scope.row.CurrentList[0]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组串2">
            <template slot-scope="scope">
              <span>{{scope.row.VoltageList[1]}}/{{scope.row.CurrentList[1]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination :total="5" layout="prev, pager, next" background class="fixed">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import vueCharts from "../../echarts/index";//echarts组件
  export default {
    name: 'lisanlv',
    data () {
      return {
        daySelect: '',//日期选择
        dataList: [],//列表数据
        chartY: [0, 0, 0, 0, 0, 0],
        lisanData: {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['异常', '0-5%', '5-10%', '10-20%', '20%以上', '未分析'],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: [{
            name: '台数',
            data: [],
            type: 'bar',
            barWidth: '40'
          }]
        }
      }
    },
    components: {
      vueCharts
    },
    methods: {
      //点击tab调用的方法
      mountedMethods () {
        this.getDataList()
      },
      getDataList () {
        this.dataList = []
        this.chartY = [0, 0, 0, 0, 0, 0]
        let res = { "TotalNum": 6, "Data": [[{ "InverterID": 7, "Comment": "白塔子镇1#逆变器", "DiscreteRate": 1.074 }, { "InverterID": 8, "Comment": "白塔子镇2#逆变器", "DiscreteRate": 34.005 }, { "InverterID": 9, "Comment": "白塔子镇3#逆变器", "DiscreteRate": 19.02 }, { "InverterID": 10, "Comment": "白塔子镇4#逆变器", "DiscreteRate": 63.138 }, { "InverterID": 11, "Comment": "白塔子镇5#逆变器", "DiscreteRate": 2.138 }, { "InverterID": 12, "Comment": "白塔子镇6#逆变器", "DiscreteRate": 14.222 }], [{ "InverterID": 7, "VoltageList": [630.443, 617.471], "CurrentList": [16.914, 16.557] }, { "InverterID": 8, "VoltageList": [614.414, 619.243], "CurrentList": [16.243, 8.0] }, { "InverterID": 9, "VoltageList": [625.586, 621.986], "CurrentList": [16.671, 24.514] }, { "InverterID": 10, "VoltageList": [607.271, 636.857], "CurrentList": [8.3, 24.514] }, { "InverterID": 11, "VoltageList": [613.2, 635.971], "CurrentList": [25.029, 15.986] }, { "InverterID": 12, "VoltageList": [715.257, 663.943], "CurrentList": [13.986, 7.086] }]], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": 2 }
        res.Data.forEach(item => {

        })
        res.Data[0].forEach(item => {
          //处理图表数据
          let num = item.DiscreteRate
          if (num > 0 && num <= 5) {
            this.chartY[1]++
          } else if (num > 5 && num <= 10) {
            this.chartY[2]++
          } else if (num > 10 && num <= 20) {
            this.chartY[3]++
          } else if (num > 20) {
            this.chartY[4]++
          }
          //处理表格数据
          res.Data[1].forEach(items => {
            if (item.InverterID === items.InverterID) {
              this.dataList.push(Object.assign(item, items))
            }
          })
        })
        console.log(this.chartY, this.dataList)
        this.lisanData.series[0].data = this.chartY
      }
    }
  }
</script>

<style lang="less" scoped>
  .lisan {
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
        /deep/.el-range-separator {
          color: white;
        }
        .alarmDiv {
          text-align: left;
          padding-right: 1em;
          display: inline-block;
          height: 40px;
        }
        .alarmSelect {
          border: none;
          background: rgb(25, 51, 29);
          color: #fff;
          padding: 0.25em;
          font-size: 1.5em;
          border-radius: 0.25em;
          height: 40px;
        }
      }
    }
    .content {
      margin-top: 20px;
      background-color: rgb(34, 34, 34);
      // padding:0 20px;
      border-radius: 10px;
      height: 720px;
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
      .contentTable {
        padding: 0 20px;
      }
    }
    @media screen and (max-width: 1800px) {
      .content{
        height:600px;
      }
    }
  }
</style>

