<template>
  <div class="shouye">
    <div class="left">
      <vueCharts :id="'electricTotalnibian'" :chartData="chartData" style="margin-bottom:10px"></vueCharts>
      <vueCharts :id="'realPowernibian'" :chartData="chartDatas"></vueCharts>
    </div>
    <div class="right">
      <div class="search">
        <el-pagination :total="5" layout="prev, pager, next" background>
        </el-pagination>
        <div style="text-align:right;display:inline-block;">
          <select style="border:none; background:#000; color:#fff; padding:0.25em;border-radius:0.25em;height:31px;"
            @change="getNiBianData()">
            <option v-for="item in selectData" :value="item.ID">{{item.Name}}</option>
          </select>
        </div>
      </div>
      <ul class="inverterList">
        <li no="7" index="0" v-for="(item,index) in inList" @click="selectedBtn(index)" :class="index == selectedIndex?'selected':''">
          <div class="backRadius filterBack"></div>
          <div class="inverterCnt">
            <p class="inverterName">{{item.inverterID}}# {{item.inverterName}}</p>
            <div class="inverterPic"><img src="../../../../public/inverter.png">
              <p class="inverterState"><span :class="setClass(item.inverterState,1)" class="tag"></span>&nbsp;<span
                  class="font" :class="setClass(item.inverterState,0)" v-text="getStatus(item.inverterState,index)"></span></p>
            </div>
            <div class="inverterData">
              <p style="color:rgb(27,221,0);">{{item.powGenerDay}}kWh</p>
              <p style="color:rgb(204,130,0);">{{Math.round(item.acOutActPow/100)/10}}kW</p>
              <p style="color:rgb(194,228,168);">{{item.dcVoltage}}V</p>
              <p style="color:#fff;">{{item.dcCurrent}}A</p>
              <p style="color:#fff;">{{Math.round(item.dcCurrentPower/100)/10}}kW</p>
              <p style="color:#fff;">{{item.gridFrequency}}Hz</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="bottom">
        <div style="text-align:right;padding-right:10px;">
          <span class="tab" :class="nibianTab?'selected':''" @click="changeTab(true)">今日功率</span>
          <span class="tab" :class="nibianTab?'':'selected'" @click="changeTab(false)">实时信息</span>
        </div>
        <div class="bottomContent">
          <vueCharts :id="'niBianDay'" :chartData="gonglvChartData" v-show="nibianTab"></vueCharts>
          <div class="niBianInfo" v-show="!nibianTab">
            <div class="title">
              逆变器实时信息
            </div>
            <div class="content">
              <el-table :data="PVList" border style="width: 100%;">
                <el-table-column prop="Name">
                </el-table-column>
                <el-table-column label="电压" prop="totalVoltage">
                  <template slot-scope="scope">
                    <span>{{scope.row.totalVoltage}}V</span>
                  </template>
                </el-table-column>
                <el-table-column prop="totalCurrent" label="电流">
                  <template slot-scope="scope">
                    <span>{{scope.row.totalCurrent}}A</span>
                  </template>
                </el-table-column>
                <el-table-column prop="totalPower" label="功率">
                  <template slot-scope="scope">
                    <span>{{scope.row.totalPower}}kW</span>
                  </template>
                </el-table-column>
              </el-table>
              <table class="tb">
                <thead>
                  <tr>
                    <td style="width:25%;"></td>
                    <th style="width:25%;">电压</th>
                    <th style="width:25%;">电流</th>
                    <th style="width:25%;">频率</th>
                  </tr>
                </thead>
                <tbody id="rstData">
                  <tr>
                    <th>R</th>
                    <td>{{RSTList.abLineVoltage}}V</td>
                    <td>{{RSTList.aphaseCurrent}}A</td>
                    <td>{{RSTList.gridFrequency}}Hz</td>
                  </tr>
                  <tr>
                    <th>S</th>
                    <td>{{RSTList.bcLineVoltage}}V</td>
                    <td>{{RSTList.bphaseCurrent}}A</td>
                    <td>{{RSTList.gridFrequency}}Hz</td>
                  </tr>
                  <tr>
                    <th>T</th>
                    <td>{{RSTList.caLineVoltage}}V</td>
                    <td>{{RSTList.cphaseCurrent}}A</td>
                    <td>{{RSTList.gridFrequency}}Hz</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
        gonglvChartData: {},//今日功率配置项
        xData: [],//存放x轴数据
        yData: [],//存放发电量y轴数据
        yDatas: [],//存放实时功率数据
        inList: [],//存放逆变器信息
        selectedIndex: '',//选择的li的下标
        selectData: [],//下拉框数据
        nibianTab: true,//控制逆变器实时与功率显示
        PVList: [],//实时数据PV信息
        RSTList: {},//实时数据剩余信息
      }
    },
    components: {
      vueCharts
    },
    methods: {
      changeTab (stat) {
        if (stat) {
          this.nibianTab = true
        } else {
          this.nibianTab = false
        }
      },
      selectedBtn (index) {
        this.selectedIndex = index
      },
      setClass (inverterState, status) {
        if (status) {
          if (inverterState === 3) {
            return 'red'
          } else if (inverterState === 4) {
            return 'gray'
          }
        } else {
          if (inverterState === 3) {
            return 'stop'
          } else if (inverterState === 4) {
            return 'shut'
          }
        }
      },
      //翻译逆变器状态
      getStatus (inverterState, index) {
        if (inverterState === 1) {
          return '正常'
        } else if (inverterState === 3) {
          return '异常'
        } else if (inverterState === 4) {
          return '离线'
        }
      },
      //点击tab时调用的方法
      mountedMethods () {
        this.getSelectData()
        this.getNiBianData()
        this.getDayData()//通过点击右侧图标获取不同数据
        this.getShouYeData()
      },
      //获取逆变器今日功率数据
      getDayData () {
        let res = { "TotalNum": 0, "Data": [{ "collectTime": "05:00", "genDay": 0.0, "powerDay": 0.0 }, { "collectTime": "05:15", "genDay": 0.0, "powerDay": 4.0 }, { "collectTime": "05:30", "genDay": 0.0, "powerDay": 14.0 }, { "collectTime": "05:45", "genDay": 0.0, "powerDay": 84.0 }, { "collectTime": "06:00", "genDay": 0.0, "powerDay": 115.0 }, { "collectTime": "06:15", "genDay": 0.1, "powerDay": 546.0 }, { "collectTime": "06:30", "genDay": 0.2, "powerDay": 877.0 }, { "collectTime": "06:45", "genDay": 0.4, "powerDay": 419.0 }, { "collectTime": "07:00", "genDay": 0.5, "powerDay": 871.0 }, { "collectTime": "07:15", "genDay": 0.7, "powerDay": 970.0 }, { "collectTime": "07:30", "genDay": 1.0, "powerDay": 1809.0 }, { "collectTime": "07:45", "genDay": 1.5, "powerDay": 2284.0 }, { "collectTime": "08:00", "genDay": 2.2, "powerDay": 2831.0 }, { "collectTime": "08:15", "genDay": 2.7, "powerDay": 2550.0 }, { "collectTime": "08:30", "genDay": 3.4, "powerDay": 2215.0 }, { "collectTime": "08:45", "genDay": 3.8, "powerDay": 2465.0 }, { "collectTime": "09:00", "genDay": 4.6, "powerDay": 4003.0 }, { "collectTime": "09:15", "genDay": 5.6, "powerDay": 3092.0 }, { "collectTime": "09:30", "genDay": 6.4, "powerDay": 3174.0 }, { "collectTime": "09:45", "genDay": 7.3, "powerDay": 4451.0 }, { "collectTime": "10:00", "genDay": 8.9, "powerDay": 8940.0 }, { "collectTime": "10:15", "genDay": 10.9, "powerDay": 4343.0 }, { "collectTime": "10:30", "genDay": 11.7, "powerDay": 3415.0 }, { "collectTime": "10:45", "genDay": 12.3, "powerDay": 1706.0 }, { "collectTime": "11:00", "genDay": 12.9, "powerDay": 2549.0 }, { "collectTime": "11:15", "genDay": 13.4, "powerDay": 2258.0 }, { "collectTime": "11:30", "genDay": 13.9, "powerDay": 2258.0 }, { "collectTime": "11:45", "genDay": 14.5, "powerDay": 2673.0 }, { "collectTime": "12:00", "genDay": 16.4, "powerDay": 16004.0 }, { "collectTime": "12:15", "genDay": 21.0, "powerDay": 18665.0 }, { "collectTime": "12:30", "genDay": 23.5, "powerDay": 4969.0 }, { "collectTime": "12:45", "genDay": 24.4, "powerDay": 2275.0 }, { "collectTime": "13:00", "genDay": 24.8, "powerDay": 1181.0 }, { "collectTime": "13:15", "genDay": 25.1, "powerDay": 807.0 }, { "collectTime": "13:30", "genDay": 25.4, "powerDay": 2282.0 }, { "collectTime": "13:45", "genDay": 26.3, "powerDay": 3961.0 }, { "collectTime": "14:00", "genDay": 27.1, "powerDay": 2046.0 }, { "collectTime": "14:15", "genDay": 27.6, "powerDay": 2602.0 }, { "collectTime": "14:30", "genDay": 28.3, "powerDay": 2208.0 }, { "collectTime": "14:45", "genDay": 28.6, "powerDay": 1405.0 }, { "collectTime": "15:00", "genDay": 28.9, "powerDay": 953.0 }, { "collectTime": "15:15", "genDay": 29.3, "powerDay": 1481.0 }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        this.gonglvChartData = JSON.parse(JSON.stringify(this.chartData))
        this.gonglvChartData.title.text = "逆变器今日功率 （单位：kW）"
        let x = []
        let y = []
        res.Data.forEach(item => {
          x.push(item.collectTime)
          y.push(Math.round(item.powerDay / 100) / 10)
        })
        this.gonglvChartData.series[0].data = y;
        this.gonglvChartData.xAxis.data = x
      },
      //获取下拉框数据
      getSelectData () {
        let res = { "TotalNum": 0, "Data": [{ "ID": 2, "Name": "白塔子镇杨杖子村" }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        this.selectData = res.Data
      },
      //获取右侧逆变器数据
      getNiBianData (id) {
        this.PVList = []
        this.RSTList = {}
        let res = { "TotalNum": 0, "Data": { "inList": [{ "inverterID": 7, "inverterName": "白塔子镇1#逆变器", "powGenerDay": 2.2, "acOutActPow": 2525.0, "dcVoltage": 663.90, "dcCurrent": 4.10, "dcCurrentPower": 2683.79, "gridFrequency": 49.97, "inverterState": 1, "abLineVoltage": 239.8, "aphaseCurrent": 3.8, "bcLineVoltage": 241.1, "bphaseCurrent": 3.7, "caLineVoltage": 239.3, "cphaseCurrent": 3.8 }, { "inverterID": 8, "inverterName": "白塔子镇2#逆变器", "powGenerDay": 0.7, "acOutActPow": 420.0, "dcVoltage": 219.20, "dcCurrent": 2.50, "dcCurrentPower": 728.04, "gridFrequency": 50.02, "inverterState": 4, "abLineVoltage": 238.8, "aphaseCurrent": 1.0, "bcLineVoltage": 238.4, "bphaseCurrent": 0.9, "caLineVoltage": 237.8, "cphaseCurrent": 1.7 }, { "inverterID": 9, "inverterName": "白塔子镇3#逆变器", "powGenerDay": 3.2, "acOutActPow": 2858.0, "dcVoltage": 568.5, "dcCurrent": 5.20, "dcCurrentPower": 3240.69, "gridFrequency": 50.02, "inverterState": 1, "abLineVoltage": 240.5, "aphaseCurrent": 4.0, "bcLineVoltage": 240.8, "bphaseCurrent": 3.9, "caLineVoltage": 241.2, "cphaseCurrent": 4.0 }, { "inverterID": 10, "inverterName": "白塔子镇4#逆变器", "powGenerDay": 1.7, "acOutActPow": 1996.0, "dcVoltage": 250.60, "dcCurrent": 4.40, "dcCurrentPower": 2323.64, "gridFrequency": 50.02, "inverterState": 1, "abLineVoltage": 238.8, "aphaseCurrent": 3.1, "bcLineVoltage": 239.9, "bphaseCurrent": 2.9, "caLineVoltage": 238.5, "cphaseCurrent": 2.9 }, { "inverterID": 11, "inverterName": "白塔子镇5#逆变器", "powGenerDay": 0.0, "acOutActPow": 0.0, "dcVoltage": 0.0, "dcCurrent": 0.0, "dcCurrentPower": 0.0, "gridFrequency": 0.0, "inverterState": 4, "abLineVoltage": 0.0, "aphaseCurrent": 0.0, "bcLineVoltage": 0.0, "bphaseCurrent": 0.0, "caLineVoltage": 0.0, "cphaseCurrent": 0.0 }, { "inverterID": 12, "inverterName": "白塔子镇6#逆变器", "powGenerDay": 2.1, "acOutActPow": 2570.0, "dcVoltage": 642.90, "dcCurrent": 4.40, "dcCurrentPower": 2857.03, "gridFrequency": 50.0, "inverterState": 1, "abLineVoltage": 238.9, "aphaseCurrent": 3.8, "bcLineVoltage": 239.3, "bphaseCurrent": 3.7, "caLineVoltage": 238.9, "cphaseCurrent": 3.8 }], "genPowerList": [{ "collectTime": "05:00", "genDay": 0.0, "powerDay": 0.0 }, { "collectTime": "05:15", "genDay": 0.0, "powerDay": 8.0 }, { "collectTime": "05:30", "genDay": 0.0, "powerDay": 15.0 }, { "collectTime": "05:45", "genDay": 0.0, "powerDay": 137.0 }, { "collectTime": "06:00", "genDay": 0.0, "powerDay": 153.0 }, { "collectTime": "06:15", "genDay": 0.1, "powerDay": 257.0 }, { "collectTime": "06:30", "genDay": 0.2, "powerDay": 387.0 }, { "collectTime": "06:45", "genDay": 0.3, "powerDay": 532.0 }, { "collectTime": "07:00", "genDay": 0.4, "powerDay": 494.0 }, { "collectTime": "07:15", "genDay": 0.5, "powerDay": 637.0 }, { "collectTime": "07:30", "genDay": 0.8, "powerDay": 821.0 }, { "collectTime": "07:45", "genDay": 1.1, "powerDay": 616.0 }, { "collectTime": "08:00", "genDay": 1.3, "powerDay": 742.0 }, { "collectTime": "08:15", "genDay": 1.5, "powerDay": 1105.0 }, { "collectTime": "08:30", "genDay": 1.7, "powerDay": 1022.0 }, { "collectTime": "08:45", "genDay": 2.1, "powerDay": 1210.0 }, { "collectTime": "09:00", "genDay": 2.3, "powerDay": 1889.0 }, { "collectTime": "09:15", "genDay": 2.9, "powerDay": 2501.0 }, { "collectTime": "09:30", "genDay": 3.5, "powerDay": 2565.0 }, { "collectTime": "09:45", "genDay": 4.2, "powerDay": 2473.0 }, { "collectTime": "10:00", "genDay": 4.9, "powerDay": 2897.0 }, { "collectTime": "10:15", "genDay": 6.1, "powerDay": 4654.0 }, { "collectTime": "10:30", "genDay": 7.3, "powerDay": 5853.0 }, { "collectTime": "10:45", "genDay": 9.1, "powerDay": 9388.0 }], "headBoxList": [{ "inverterID": 7, "totalVoltage": 663.9, "totalCurrent": 2.1, "totalPower": 1.394 }, { "inverterID": 7, "totalVoltage": 644.8, "totalCurrent": 2.0, "totalPower": 1.29 }, { "inverterID": 8, "totalVoltage": 219.2, "totalCurrent": 2.1, "totalPower": 0.46 }, { "inverterID": 8, "totalVoltage": 669.3, "totalCurrent": 0.4, "totalPower": 0.268 }, { "inverterID": 9, "totalVoltage": 568.5, "totalCurrent": 2.3, "totalPower": 1.308 }, { "inverterID": 9, "totalVoltage": 666.6, "totalCurrent": 2.9, "totalPower": 1.933 }, { "inverterID": 10, "totalVoltage": 250.6, "totalCurrent": 1.4, "totalPower": 0.351 }, { "inverterID": 10, "totalVoltage": 657.6, "totalCurrent": 3.0, "totalPower": 1.973 }, { "inverterID": 11, "totalVoltage": 0.0, "totalCurrent": 0.0, "totalPower": 0.0 }, { "inverterID": 11, "totalVoltage": 0.0, "totalCurrent": 0.0, "totalPower": 0.0 }, { "inverterID": 12, "totalVoltage": 642.9, "totalCurrent": 3.3, "totalPower": 2.122 }, { "inverterID": 12, "totalVoltage": 668.6, "totalCurrent": 1.1, "totalPower": 0.735 }] }, "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        // console.log(res.Data)
        this.inList = res.Data.inList
        id = 7;
        res.Data.headBoxList.forEach(item => {
          if (item.inverterID === id) {
            this.PVList.push(item)
          }
        })
        this.PVList[0].Name = 'PV1'
        this.PVList[1].Name = 'PV2'
        //RSTList
        res.Data.inList.forEach(item => {
          if (item.inverterID === id) {
            this.RSTList = item
          }
        })
      },
      //获取左侧折线图数据
      getShouYeData () {
        this.xData = []
        this.yData = []
        this.yDatas = []
        this.tableData = []
        // let data = {

        // }
        // this.api.tabs.getShouYeData(data).then(res=>{
        //   if(res.IsSuccess){
        //     console.log(res)
        //   }
        // })
        let res = { "TotalNum": 0, "Data": [[{ "collectTime": "05:00", "powGenerDay": 0.0, "acOutActPow": 0.0 }, { "collectTime": "05:15", "powGenerDay": 0.0, "acOutActPow": 22.0 }, { "collectTime": "05:30", "powGenerDay": 0.0, "acOutActPow": 52.0 }, { "collectTime": "05:45", "powGenerDay": 0.0, "acOutActPow": 245.0 }, { "collectTime": "06:00", "powGenerDay": 0.2, "acOutActPow": 596.0 }, { "collectTime": "06:15", "powGenerDay": 0.4, "acOutActPow": 2055.0 }, { "collectTime": "06:30", "powGenerDay": 1.4, "acOutActPow": 3889.0 }, { "collectTime": "06:45", "powGenerDay": 2.0, "acOutActPow": 2029.0 }, { "collectTime": "07:00", "powGenerDay": 2.7, "acOutActPow": 3959.0 }, { "collectTime": "07:15", "powGenerDay": 3.5, "acOutActPow": 4368.0 }, { "collectTime": "07:30", "powGenerDay": 5.9, "acOutActPow": 10304.0 }, { "collectTime": "07:45", "powGenerDay": 9.0, "acOutActPow": 13877.0 }, { "collectTime": "08:00", "powGenerDay": 12.5, "acOutActPow": 16720.0 }, { "collectTime": "08:15", "powGenerDay": 15.2, "acOutActPow": 15227.0 }, { "collectTime": "08:30", "powGenerDay": 18.8, "acOutActPow": 13485.0 }, { "collectTime": "08:45", "powGenerDay": 23.1, "acOutActPow": 14529.0 }, { "collectTime": "09:00", "powGenerDay": 27.3, "acOutActPow": 22541.0 }, { "collectTime": "09:15", "powGenerDay": 33.8, "acOutActPow": 19285.0 }, { "collectTime": "09:30", "powGenerDay": 38.8, "acOutActPow": 19796.0 }, { "collectTime": "09:45", "powGenerDay": 44.1, "acOutActPow": 27148.0 }, { "collectTime": "10:00", "powGenerDay": 54.3, "acOutActPow": 54987.0 }, { "collectTime": "10:15", "powGenerDay": 66.7, "acOutActPow": 29114.0 }, { "collectTime": "10:30", "powGenerDay": 71.8, "acOutActPow": 21254.0 }, { "collectTime": "10:45", "powGenerDay": 75.6, "acOutActPow": 11151.0 }, { "collectTime": "11:00", "powGenerDay": 79.1, "acOutActPow": 15661.0 }, { "collectTime": "11:15", "powGenerDay": 82.5, "acOutActPow": 14222.0 }, { "collectTime": "11:30", "powGenerDay": 85.5, "acOutActPow": 13676.0 }, { "collectTime": "11:45", "powGenerDay": 88.8, "acOutActPow": 15942.0 }, { "collectTime": "12:00", "powGenerDay": 100.4, "acOutActPow": 93186.0 }, { "collectTime": "12:15", "powGenerDay": 125.3, "acOutActPow": 99336.0 }, { "collectTime": "12:30", "powGenerDay": 145.5, "acOutActPow": 29383.0 }, { "collectTime": "12:45", "powGenerDay": 150.7, "acOutActPow": 13533.0 }, { "collectTime": "13:00", "powGenerDay": 153.2, "acOutActPow": 7304.0 }, { "collectTime": "13:15", "powGenerDay": 154.9, "acOutActPow": 5556.0 }, { "collectTime": "13:30", "powGenerDay": 156.8, "acOutActPow": 12946.0 }, { "collectTime": "13:45", "powGenerDay": 161.7, "acOutActPow": 22705.0 }, { "collectTime": "14:00", "powGenerDay": 167.5, "acOutActPow": 14482.0 }, { "collectTime": "14:15", "powGenerDay": 170.5, "acOutActPow": 15430.0 }], [{ "gckID": "2", "gckName": "白塔子镇杨杖子村", "powGenerSum": 444731.89999999997, "powGenerDay": 173.08, "acOutActPow": 13969.0 }], [{ "gckID": 1, "count": 6, "scale": 0.19602 }, { "gckID": 2, "count": 6, "scale": 0.19602 }]], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        res.Data[0].forEach(item => {
          this.xData.push(item.collectTime)
          this.yData.push(item.powGenerDay)
          this.yDatas.push(item.acOutActPow / 1000)
        })
        this.chartData.xAxis.data = this.xData;
        this.chartDatas = JSON.parse(JSON.stringify(this.chartData))
        this.chartData.series[0].data = this.yData;
        this.chartDatas.series[0].data = this.yDatas;
        this.chartDatas.title.text = '实时功率统计 (单位：kW)'
        this.chartDatas.series[0].areaStyle = {
          color: 'rgb(71,81,91)'
        }
        this.chartDatas.series[0].lineStyle.normal.color = 'rgb(154,189,221)'
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
      height: 100%;
      .search {
        display: flex;
        justify-content: space-between;
        /deep/.btn-prev,
        /deep/.btn-next {
          background-color: rgb(47, 75, 68);
          border-radius: 20px;
          border: 1px solid #ccc;
          .el-icon {
            font-weight: 800;
            font-size: 16px;
          }
        }
        /deep/.number {
          background-color: transparent !important;
          font-size: 16px;
        }
      }
      .inverterList {
        padding: 0;
        overflow: hidden;
        margin: 0.5% 0.5% 0.7% 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        height: 50%;
        li {
          list-style: none;
          display: inline-block;
          cursor: pointer;
          min-width: 23%;
          min-height: 48%;
          margin: 0 0 5px 0;
          border: 0.1em solid transparent;
          border-radius: 0.5em;
          position: relative;
          -moz-box-shadow: 0.125em 0.125em 0.3125em #333;
          -webkit-box-shadow: 0.125em 0.125em 0.3125em #333;
          box-shadow: 0.125em 0.125em 0.3125em #333;
          margin-right: 5px;
        }
        li.selected {
          border: 1px solid #ccc;
        }
        .filterBack {
          background-color: #111;
          height: 100%;
          width: 100%;
          filter: alpha(opacity=40);
          -moz-opacity: 0.4;
          opacity: 0.4;
        }
        .inverterCnt {
          width: 100%;
          position: absolute;
          color: #fff;
          top: 0;
          left: 0;
          height: 100%;
          .inverterName {
            text-align: center;
            font-size: 12px;
            margin: 4% 0 0 0;
            font-weight: bolder;
          }
          .inverterPic {
            float: left;
            width: 45%;
            padding-left: 5%;
            padding-top: 8%;
            img {
              width: 90%;
            }
            .inverterState {
              margin: 10% 10%;
              .tag {
                padding: 0 0.6em;
                background-color: #16aa29;
                border-radius: 0.1875em;
                margin-right: 10px;
              }
              .font {
                font-size: 16px;
                color: #16aa29;
                font-weight: 600;
              }
              @media screen and (max-width: 1800px) {
                .font {
                  display:block;
                }
              }
              .red {
                background-color: #f00;
              }
              .gray {
                background-color: #a3a3a3;
              }
              .stop {
                color: #f00 !important;
              }
              .shut {
                color: #a3a3a3 !important;
              }
            }
          }
          .inverterData {
            float: left;
            width: 49%;
            font-size: 12px;
            font-weight: 700;
            text-align: left;
            @media screen and (max-width: 1800px) {
              p {
                margin: 5px 0;
              }
            }
          }
        }
      }
      .bottom {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
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
        .bottomContent {
          background-color: rgb(34, 34, 34);
          margin-top: 20px;
          height: 385px;
          .niBianInfo {
            .title {
              color: rgb(210, 210, 210);
              font-size: 18px;
              font-weight: 600;
              margin-left: 5px;
            }
            .content {
              padding: 10px;
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
              table.tb {
                width: 100%;
                font-size: 0.875em;
                margin-top: 10px;
                border-collapse: collapse;
              }
              table.tb thead tr,
              table.tb tfoot tr {
                background-color: #383838;
              }
              table.tb td,
              table.tb th {
                border: 1px solid white;
                padding: 0 0.5em;
                text-align: center;
                line-height: 28px;
                height: 28px;
                color: white;
                text-align: left;
                font-size: 14px;
              }
              table.tb tbody tr {
                background-color: #595959;
                cursor: pointer;
              }
            }
          }
        }
        @media screen and (max-width: 1800px) {
          .bottomContent {
            height: 280px;
          }
        }
      }
    }
  }
</style>