<template>
  <div class="shouye">
    <div class="left">
      <vueCharts :id="'electricTotal'" :chartData="chartData" style="margin-bottom:10px"></vueCharts>
      <vueCharts :id="'realPower'" :chartData="chartDatas"></vueCharts>
    </div>
    <div class="right">
      <el-table :data="tableData" border show-summary style="width: 100%;" height="44%">
        <el-table-column prop="gckName" label="位置">
        </el-table-column>
        <el-table-column label="井网容量(逆变器数)" prop="scale">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.scale*1000)/1000}}kW({{scope.row.count}})</span>
          </template>
        </el-table-column>
        <el-table-column prop="acOutActPow" label="实时功率">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.acOutActPow/10)/100}}kW</span>
          </template>
        </el-table-column>
        <el-table-column prop="powGenerDay" label="日发电量">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.powGenerDay*10)/10}}kWh</span>
          </template>
        </el-table-column>
      </el-table>
      <vueCharts :id="'zhandian'" :chartData="zhandianData" style="height:50%"></vueCharts>
    </div>
  </div>
</template>

<script>
  import vueCharts from "../../echarts/index";//echarts组件
  export default {
    name: 'shouye',
    data () {
      return {
        chartData: {
          title: {
            text: '发电量统计 (单位：kWh)',
            textStyle: {
              color: '#ccc'
            }
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            data: []
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
            name: '发电量',
            type: 'line',
            smooth: true,
            showSymbol: false,
            hoverAnimation: false,
            data: [],
            lineStyle: {
              normal: {
                color: 'rgb(10,130,100)'
              }
            }
          }],
          backgroundColor: 'rgb(34,34,34)'
        },
        chartDatas: {},//第二个echarts的配置项
        zhandianData: {},//存放站点累计发电配置项
        xData: [],//存放x轴数据
        yData: [],//存放发电量y轴数据
        yDatas: [],//存放实时功率数据
        tableData: [],//统计地区信息
      }
    },
    components: {
      vueCharts
    },
    mounted () {
      this.getACOutActPower()
    },
    methods: {
      //获取发电量统计数据
      //获取实时功率统计数据
      getACOutActPower () {
        this.xData = []
        this.yData = []
        this.yDatas = []
        this.tableData = []
        let data = {
          StartTime: this.utils.fomrmatDate(new Date(new Date().toLocaleDateString())),
          EndTime: this.utils.fomrmatDate(new Date())
        }
        this.api.tabs.shouye.getACOutActPower(data).then(res => {
          if (res.errCode === 0) {
            let x = []
            let y = []
            let data = res.data.Records
            data.forEach(item => {
              x.push(this.utils.fomrmatDate(item.Ts))
              y.push(item.Value)
            })
            this.chartDatas = JSON.parse(JSON.stringify(this.chartData))
            this.chartDatas.title.text = '实时功率统计 (单位：kW)'
            this.chartDatas.xAxis.data = x;
            this.chartDatas.series = [{
              name: '功率',
              type: 'line',
              smooth: true,
              showSymbol: false,
              hoverAnimation: false,
              data: y,
              lineStyle: {
                normal: {
                  color: 'rgb(154,189,221)'
                }
              },
              areaStyle: {
                color: 'rgb(71,81,91)'
              }
            }]
          }
        })
        let res = { "TotalNum": 0, "Data": [[{ "collectTime": "05:00", "powGenerDay": 0.0, "acOutActPow": 0.0 }, { "collectTime": "05:15", "powGenerDay": 0.0, "acOutActPow": 22.0 }, { "collectTime": "05:30", "powGenerDay": 0.0, "acOutActPow": 52.0 }, { "collectTime": "05:45", "powGenerDay": 0.0, "acOutActPow": 245.0 }, { "collectTime": "06:00", "powGenerDay": 0.2, "acOutActPow": 596.0 }, { "collectTime": "06:15", "powGenerDay": 0.4, "acOutActPow": 2055.0 }, { "collectTime": "06:30", "powGenerDay": 1.4, "acOutActPow": 3889.0 }, { "collectTime": "06:45", "powGenerDay": 2.0, "acOutActPow": 2029.0 }, { "collectTime": "07:00", "powGenerDay": 2.7, "acOutActPow": 3959.0 }, { "collectTime": "07:15", "powGenerDay": 3.5, "acOutActPow": 4368.0 }, { "collectTime": "07:30", "powGenerDay": 5.9, "acOutActPow": 10304.0 }, { "collectTime": "07:45", "powGenerDay": 9.0, "acOutActPow": 13877.0 }, { "collectTime": "08:00", "powGenerDay": 12.5, "acOutActPow": 16720.0 }, { "collectTime": "08:15", "powGenerDay": 15.2, "acOutActPow": 15227.0 }, { "collectTime": "08:30", "powGenerDay": 18.8, "acOutActPow": 13485.0 }, { "collectTime": "08:45", "powGenerDay": 23.1, "acOutActPow": 14529.0 }, { "collectTime": "09:00", "powGenerDay": 27.3, "acOutActPow": 22541.0 }, { "collectTime": "09:15", "powGenerDay": 33.8, "acOutActPow": 19285.0 }, { "collectTime": "09:30", "powGenerDay": 38.8, "acOutActPow": 19796.0 }, { "collectTime": "09:45", "powGenerDay": 44.1, "acOutActPow": 27148.0 }, { "collectTime": "10:00", "powGenerDay": 54.3, "acOutActPow": 54987.0 }, { "collectTime": "10:15", "powGenerDay": 66.7, "acOutActPow": 29114.0 }, { "collectTime": "10:30", "powGenerDay": 71.8, "acOutActPow": 21254.0 }, { "collectTime": "10:45", "powGenerDay": 75.6, "acOutActPow": 11151.0 }, { "collectTime": "11:00", "powGenerDay": 79.1, "acOutActPow": 15661.0 }, { "collectTime": "11:15", "powGenerDay": 82.5, "acOutActPow": 14222.0 }, { "collectTime": "11:30", "powGenerDay": 85.5, "acOutActPow": 13676.0 }, { "collectTime": "11:45", "powGenerDay": 88.8, "acOutActPow": 15942.0 }, { "collectTime": "12:00", "powGenerDay": 100.4, "acOutActPow": 93186.0 }, { "collectTime": "12:15", "powGenerDay": 125.3, "acOutActPow": 99336.0 }, { "collectTime": "12:30", "powGenerDay": 145.5, "acOutActPow": 29383.0 }, { "collectTime": "12:45", "powGenerDay": 150.7, "acOutActPow": 13533.0 }, { "collectTime": "13:00", "powGenerDay": 153.2, "acOutActPow": 7304.0 }, { "collectTime": "13:15", "powGenerDay": 154.9, "acOutActPow": 5556.0 }, { "collectTime": "13:30", "powGenerDay": 156.8, "acOutActPow": 12946.0 }, { "collectTime": "13:45", "powGenerDay": 161.7, "acOutActPow": 22705.0 }, { "collectTime": "14:00", "powGenerDay": 167.5, "acOutActPow": 14482.0 }, { "collectTime": "14:15", "powGenerDay": 170.5, "acOutActPow": 15430.0 }], [{ "gckID": "2", "gckName": "白塔子镇杨杖子村", "powGenerSum": 444731.89999999997, "powGenerDay": 173.08, "acOutActPow": 13969.0 }], [{ "gckID": 1, "count": 6, "scale": 0.19602 }, { "gckID": 2, "count": 6, "scale": 0.19602 }]], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        res.Data[0].forEach(item => {
          this.xData.push(item.collectTime)
          this.yData.push(item.powGenerDay)
          this.yDatas.push(item.acOutActPow / 1000)
        })
        this.chartData.xAxis.data = this.xData;
        this.chartData.series[0].data = this.yData;
        res.Data[1].forEach(item => {
          res.Data[2].forEach(items => {
            if (item.gckID == items.gckID) {
              let obj = Object.assign(item, items)
              this.tableData.push(obj)
            }
          })
        })
        this.zhandianData = JSON.parse(JSON.stringify(this.chartData))
        this.zhandianData.title.text = '站点累计发电量 （单位：万kWh）'
        let x = []
        let y = []
        this.tableData.forEach(item => {
          y.push(Math.round(item.powGenerSum / 1000) / 10)
          x.push(item.gckName)
        })
        this.zhandianData.series[0].data = y;
        this.zhandianData.series[0].type = 'bar';
        this.zhandianData.xAxis.data = x
        this.zhandianData.series[0] = {
          name: '累计发电量',
          type: 'bar',
          smooth: true,
          showSymbol: false,
          hoverAnimation: false,
          data: y,
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .shouye {
    height: calc(100% + 40px);
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    .left {
      width: 48%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right {
      width: 48%;
      height: calc(100% - 20px);
      background-color: rgb(34, 34, 34);
      padding: 10px;
      /deep/.el-table__body-wrapper,
      /deep/.el-table__row {
        background-color: rgb(115, 115, 115);
        color: white;
      }
      /deep/.el-table thead tr th {
        background-color: rgb(56, 56, 56);
        color: white;
      }
      /deep/.el-table .el-table__footer tr td {
        background-color: rgb(56, 56, 56);
        color: white;
      }
    }
  }
</style>

