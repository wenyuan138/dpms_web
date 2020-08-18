<template>
  <div class="shouye">
    <div class="left">
      <vueCharts :id="'electricTotal'" :chartData="chartData" style="margin-bottom:10px"></vueCharts>
      <vueCharts :id="'realPower'" :chartData="chartDatas"></vueCharts>
    </div>
    <div class="right">
      <el-table :data="tableData" border style="width: 100%;" height="49%" class="rightTop">
        <el-table-column prop="EdgeAddr" label="位置">
        </el-table-column>
        <el-table-column label="井网容量(逆变器数)" prop="scale">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.InverterTotalCapacity*1000)/1000}}kW({{scope.row.InverterCount}})</span>
          </template>
        </el-table-column>
        <el-table-column prop="RtPower" label="实时功率">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.RtPower/10)/100}}kW</span>
          </template>
        </el-table-column>
        <el-table-column prop="DayPowerGen" label="日发电量">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.DayPowerGen*10)/10}}kWh</span>
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
        tableData: [],//统计地区信息
      }
    },
    components: {
      vueCharts
    },
    mounted () {
      this.getDayPowerGen()
      this.getACOutActPower()
      this.getSummary()
      this.getTotalGeneration()
    },
    methods: {
      //获取发电量统计数据
      getDayPowerGen () {
        this.xData = []
        this.yData = []
        let data = {
          StartTime: this.utils.fomrmatDate(new Date(new Date().toLocaleDateString())),
          EndTime: this.utils.fomrmatDate(new Date())
        }
        this.api.tabs.shouye.getDayPowerGen(data).then(res => {
          if (res.errCode === 0) {
            res.data.Records.forEach(item => {
              this.xData.push(this.utils.fomrmatDate(item.Ts))
              this.yData.push(item.Value)
            })
            this.chartData.xAxis.data = this.xData;
            this.chartData.series[0].data = this.yData;
          }
        })
      },
      //获取实时功率统计数据
      getACOutActPower () {
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
              y.push((item.Value / 1000).toFixed(2))
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
      },
      //获取表格数据
      getSummary () {
        this.tableData = []
        let data = {
          StartTime: this.utils.fomrmatDate(new Date(new Date().toLocaleDateString())),
          EndTime: this.utils.fomrmatDate(new Date())
        }
        this.api.tabs.shouye.getSummary(data).then(res => {
          if (res.errCode === 0) {
            this.tableData = res.data.Records
          }
        })
      },
      //获取累计发电量
      getTotalGeneration () {
        let data = {
          StartTime: this.utils.fomrmatDate(new Date(new Date().toLocaleDateString())),
          EndTime: this.utils.fomrmatDate(new Date())
        }
        this.api.tabs.shouye.getTotalGeneration(data).then(res => {
          if (res.errCode === 0) {
            this.zhandianData = JSON.parse(JSON.stringify(this.chartData))
            this.zhandianData.title.text = '站点累计发电量 （单位：万kWh）'
            this.zhandianData.series[0].type = 'bar';
            this.zhandianData.xAxis.data = [this.utils.fomrmatDate(res.data.Records[0].Ts)]
            this.zhandianData.series[0] = {
              name: '累计发电量',
              type: 'bar',
              smooth: true,
              showSymbol: false,
              hoverAnimation: false,
              data: [res.data.Records[0].Value],
            }
          }
        })
      }
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
      .rightTop{
        margin-bottom:10px;
      }
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

