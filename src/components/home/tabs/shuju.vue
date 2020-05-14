<template>
  <div class="shuju">
    <div class="head">
      <span class="title">数据对比</span>
    </div>
    <div class="search">
      <div class="type" @change="searchTypeChange">
        <el-radio v-model="radios" label="compare">同比</el-radio>
        <el-radio v-model="radios" label="sequent">环比</el-radio>
      </div>
      <span class="dataSearch">
        <span>设备：</span>
        <div class="alarmDiv">
          <select class="alarmSelect" v-model="equipSelect">
            <option value="inverter">逆变器</option>
          </select>
        </div>
      </span>
      <span class="dataSearch">
        <span>对比数据：</span>
        <div class="alarmDiv">
          <select class="alarmSelect" v-model="typeSelect">
            <option value="dcVoltage">直流电压</option>
          </select>
        </div>
      </span>
      <span class="dataSearch">
        <span>数据类型：</span>
        <div class="alarmDiv">
          <select class="alarmSelect" v-model="shujuSelect">
            <option value="day">日数据</option>
            <option value="month">月数据</option>
            <option value="year">年数据</option>
          </select>
        </div>
      </span>
      <span class="dataSearch" v-if="typeShow">
        <span>对比时间：</span>
        <el-date-picker v-model="daySelect" type="date" placeholder="选择日期" size="mini">
        </el-date-picker>
      </span>
      <span class="dataSearch" v-if="typeShow">
        <span>设备列表：</span>
        <el-select v-model="equipListSelect" multiple collapse-tags placeholder="请选择" size="mini">
          <el-option v-for="item in equipOptions" :key="item.ID" :label="item.Name" :value="item.ID">
          </el-option>
        </el-select>
      </span>
      <span class="dataSearch" v-if="!typeShow">
        <span>对比设备：</span>
        <el-select v-model="equipListSelect" placeholder="请选择" size="mini">
          <el-option v-for="item in equipOptions" :key="item.ID" :label="item.Name" :value="item.ID">
          </el-option>
        </el-select>
      </span>
      <span class="dataSearch" v-if="!typeShow">
        <span>时间列表：</span>
        <el-date-picker v-model="daySelect" type="dates" placeholder="选择一个或多个日期" size="mini">
        </el-date-picker>
      </span>
      <el-button type="primary" style="font-size:15px;margin-left:10px;" @click="initChart" size="mini">确认</el-button>
    </div>
    <div class="content">
      <vueCharts :id="'shujuduibi'" :chartData="duibiData"></vueCharts>
    </div>
  </div>
</template>

<script>
  import vueCharts from "../../echarts/index";//echarts组件
  export default {
    name: 'shujuduibi',
    data () {
      return {
        equipOptions: [],//设备下拉列表
        equipListSelect: [],//选择的设备
        equipSelect: 'inverter',//选择的设备类型
        typeSelect: 'dcVoltage',//需要对比的数据
        shujuSelect: 'day',//选择的数据类型
        daySelect: '',//选择的对比时间
        radios: 'compare',//同比or环比
        chartData: [],//需要对比的数据
        typeShow: true,//同比环比不同搜索条件的展示隐藏
        duibiData: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
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
          series: []
        },//echarts配置项
      }
    },
    components: {
      vueCharts
    },
    methods: {
      //点击tab调用的方法
      mountedMethods () {
        this.getEquipList()
      },
      //获取设备列表
      getEquipList () {
        let res = { "TotalNum": 0, "Data": [{ "ID": 7, "Name": "白塔子镇1#逆变器" }, { "ID": 8, "Name": "白塔子镇2#逆变器" }, { "ID": 9, "Name": "白塔子镇3#逆变器" }, { "ID": 10, "Name": "白塔子镇4#逆变器" }, { "ID": 11, "Name": "白塔子镇5#逆变器" }, { "ID": 12, "Name": "白塔子镇6#逆变器" }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        this.equipOptions = res.Data
      },
      //获取数据进行对比
      initChart () {
        if (this.typeShow) {
          this.chartData = []
          this.duibiData.series = []
          this.duibiData.legend.data = []
          this.duibiData.xAxis.data = []
          let res = { "TotalNum": 0, "Data": [{ "InverterName": "白塔子镇1#逆变器", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-06T00:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T01:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T02:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T03:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T04:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T05:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 501.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T06:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 452.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T07:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 775.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T08:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 620.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T09:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 617.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T10:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 760.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T11:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 604.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T12:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 620.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T13:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 624.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T14:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 623.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T15:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 637.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T16:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 654.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T17:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 653.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T18:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 525.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T19:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 397.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T20:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 224.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T21:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 224.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T22:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 224.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T23:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 224.6\r\n  }\r\n]" }, { "InverterName": "白塔子镇2#逆变器", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-06T00:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T01:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T02:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T03:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T04:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T05:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 474.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T06:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 227.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T07:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 227.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T08:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 611.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T09:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 607.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T10:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 608.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T11:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 607.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T12:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 595.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T13:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 608.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T14:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 601.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T15:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 635.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T16:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 624.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T17:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 633.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T18:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 528.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T19:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 265.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T20:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 315.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T21:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 315.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T22:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 315.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T23:00:00\",\r\n    \"comment\": \"白塔子镇2#逆变器\",\r\n    \"dcVoltage\": 315.4\r\n  }\r\n]" }, { "InverterName": "白塔子镇3#逆变器", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-06T00:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T01:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T02:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T03:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T04:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T05:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 547.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T06:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 550.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T07:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 621.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T08:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 626.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T09:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 620.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T10:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 613.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T11:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 619.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T12:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 613.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T13:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 614.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T14:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 614.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T15:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 630.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T16:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 651.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T17:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 630.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T18:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 567.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T19:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 290.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T20:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 240.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T21:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 240.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T22:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 240.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-06T23:00:00\",\r\n    \"comment\": \"白塔子镇3#逆变器\",\r\n    \"dcVoltage\": 240.9\r\n  }\r\n]" }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
          res.Data.forEach(item => {
            item.Data = JSON.parse(item.Data.replace(/\r\n/g, ""))
          })
          this.chartData = res.Data
          let title = []
          let x = []
          let y = []
          this.chartData.forEach((item, index) => {
            title.push(item.InverterName)
            y[index] = []
            item.Data.forEach(items => {
              y[index].push(items.dcVoltage)
            })
          })
          this.chartData[0].Data.forEach(items => {
            x.push(items.collectTime.split('T')[1].slice(0, 5))
          })
          this.duibiData.legend.data = title
          this.duibiData.xAxis.data = x
          y.forEach((item, index) => {
            let obj = {
              name: title[index],
              type: 'line',
              data: item,
              smooth: true
            }
            this.duibiData.series.push(obj)
          })
        } else {
          this.chartData = []
          this.duibiData.series = []
          this.duibiData.legend.data = []
          this.duibiData.xAxis.data = []
          let res = { "TotalNum": 0, "Data": [{ "DateStr": "2020-05-01", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-01T00:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T01:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T02:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T03:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T04:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T05:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 523.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T06:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 559.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T07:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 765.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T08:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 613.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T09:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 606.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T10:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 605.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T11:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 597.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T12:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 601.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T13:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 603.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T14:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 592.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T15:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 585.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T16:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 608.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T17:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 629.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T18:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 609.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T19:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 315.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T20:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 227.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T21:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 227.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T22:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 227.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-01T23:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 227.6\r\n  }\r\n]" }, { "DateStr": "2020-05-02", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-02T00:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T01:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T02:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T03:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T04:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T05:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 531.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T06:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 242.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T07:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 762.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T08:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 616.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T09:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 614.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T10:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 610.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T11:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 611.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T12:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 604.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T13:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 613.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T14:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 610.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T15:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 609.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T16:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 590.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T17:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 648.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T18:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 524.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T19:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 464.2\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T20:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 208.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T21:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 208.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T22:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 208.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-02T23:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 208.5\r\n  }\r\n]" }, { "DateStr": "2020-05-03", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-03T00:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T01:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T02:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T03:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T04:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T05:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 535.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T06:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 240.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T07:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 263.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T08:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 644.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T09:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 613.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T10:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 642.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T11:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 494.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T12:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 522.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T13:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 506.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T14:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 662.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T15:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 657.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T16:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 618.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T17:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 643.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T18:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 512.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T19:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 289.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T20:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 237.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T21:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 237.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T22:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 237.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-03T23:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 237.6\r\n  }\r\n]" }, { "DateStr": "2020-05-04", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-04T00:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T01:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T02:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T03:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T04:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T05:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 534.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T06:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 554.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T07:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 551.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T08:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 689.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T09:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 685.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T10:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 678.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T11:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 607.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T12:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 636.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T13:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 619.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T14:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 636.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T15:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 673.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T16:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 663.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T17:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 666.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T18:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 647.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T19:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 248.1\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T20:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 413.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T21:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 413.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T22:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 413.3\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-04T23:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 413.3\r\n  }\r\n]" }, { "DateStr": "2020-05-05", "Data": "[\r\n  {\r\n    \"collectTime\": \"2020-05-05T00:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T01:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T02:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T03:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T04:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 0.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T05:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 557.4\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T06:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 643.9\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T07:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 585.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T08:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 623.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T09:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 612.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T10:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 619.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T11:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 616.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T12:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 607.7\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T13:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 597.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T14:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 603.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T15:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 617.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T16:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 647.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T17:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 652.5\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T18:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 625.6\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T19:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 524.0\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T20:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 215.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T21:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 215.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T22:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 215.8\r\n  },\r\n  {\r\n    \"collectTime\": \"2020-05-05T23:00:00\",\r\n    \"comment\": \"白塔子镇1#逆变器\",\r\n    \"dcVoltage\": 215.8\r\n  }\r\n]" }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
          res.Data.forEach(item => {
            item.Data = JSON.parse(item.Data.replace(/\r\n/g, ""))
          })
          this.chartData = res.Data
          let title = []
          let x = []
          let y = []
          this.chartData.forEach((item, index) => {
            title.push(item.DateStr)
            y[index] = []
            item.Data.forEach(items => {
              y[index].push(items.dcVoltage)
            })
          })
          this.chartData[0].Data.forEach(items => {
            x.push(items.collectTime.split('T')[1].slice(0, 5))
          })
          this.duibiData.legend.data = title
          this.duibiData.xAxis.data = x
          y.forEach((item, index) => {
            let obj = {
              name: title[index],
              type: 'line',
              data: item,
              smooth: true
            }
            this.duibiData.series.push(obj)
          })
          console.log(this.duibiData)
        }

      },
      //同比环比变化
      searchTypeChange () {
        if (this.radios === 'compare') {
          //同比
          this.typeShow = true
        } else if (this.radios === 'sequent') {
          //环比
          this.typeShow = false
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .shuju {
    padding: 20px 40px;
    .head {
      text-align: center;
      .title {
        font-size: 26px;
        color: #f0f0f0;
        font-weight: 600;
      }
    }
    .search {
      line-height: 51px;
      height: 51px;
      margin-top: 10px;
      .type {
        /deep/.el-radio {
          margin-right: 10px;
        }
        /deep/.el-radio__label {
          color: white;
        }
      }
      .dataSearch {
        span {
          font-size: 20px;
          color: #f0f0f0;
          font-weight: 600;
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
          width: 160px;
        }
        @media screen and (max-width: 1800px) {
          /deep/.el-input {
            width: 100px;
          }
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
          border-radius: 0.25em;
          height: 31px;
          width: 120px;
        }
        @media screen and (max-width: 1800px) {
          .alarmSelect{
            width:80px;
          }
        }
      }
      .dataSearch:nth-of-type(1) {
        span {
          margin-left: 0;
        }
      }
    }
    .content {
      margin-top: 60px;
      background-color: rgb(34, 34, 34);
      border-radius: 10px;
      height: 680px;
      position: relative;
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
      .fixedWrap {
        text-align: center;
        position: absolute;
        bottom: 30px;
        left: 700px;
      }
    }
    @media screen and (max-width: 1800px) {
      .content {
        height: 460px;
      }
    }
  }
</style>