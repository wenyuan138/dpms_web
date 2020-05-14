<template>
  <div class="alarmlist">
    <div class="head">
      <span class="title">报警记录</span>
    </div>
    <div class="search">
      <span class="dataSearch">
        <span>开始/截止时间：</span>
        <el-date-picker v-model="timeValue" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" size="mini">
        </el-date-picker>
      </span>
      <span class="dataSearch">
        <span>警告类型：</span>
        <div class="alarmDiv">
          <select class="alarmSelect">
            <option value="">全部</option>
            <option value="1">故障</option>
            <option value="2">警告</option>
          </select>
        </div>
      </span>
      <span class="dataSearch">
        <span>警告等级：</span>
        <div class="alarmDiv">
          <select class="alarmSelect">
            <option value="">全部</option>
            <option value="1">次要</option>
            <option value="2">重要</option>
            <option value="3">严重</option>
          </select>
        </div>
      </span>
      <span class="dataSearch">
        <span>警告状态：</span>
        <div class="alarmDiv">
          <select class="alarmSelect">
            <option value="">全部</option>
            <option value="1">发生</option>
            <option value="2">消失</option>
          </select>
        </div>
      </span>
      <el-button type="primary" style="font-size:15px;margin-left:10px;" size="mini">确认</el-button>
    </div>
    <div class="content">
      <el-table :data="listData" border style="width: 95%;">
        <el-table-column type="index" label="序号" :index="indexMethod" width="50">
        </el-table-column>
        <el-table-column prop="type" label="类型" min-width="50">
        </el-table-column>
        <el-table-column prop="level" label="等级" min-width="50">
        </el-table-column>
        <el-table-column prop="icomment" label="设备" min-width="150">
        </el-table-column>
        <el-table-column prop="comment" label="报警内容" min-width="150">
        </el-table-column>
        <el-table-column prop="itemNum" label="报警代码" min-width="50">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="50">
        </el-table-column>
        <el-table-column prop="advice" label="建议处理方法" min-width="150">
        </el-table-column>
        <el-table-column prop="collectTime" label="时间" min-width="100">
        </el-table-column>
      </el-table>
      <el-pagination :total="5" layout="prev, pager, next" background class="fixed">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alarmList',
    data () {
      return {
        timeValue: '',//时间筛选
        listData: [],//列表数据
        currentPage: '1',
        pageSize: '10',//分页
      }
    },
    methods: {
      //点击tab调用的方法
      mountedMethods () {
        this.getListData()
      },
      //获取列表数据
      getListData () {
        let res = { "TotalNum": 2, "Data": [{ "collectTime": "2020-05-09T06:08:44.363", "itemNum": 168, "equipment": "I", "sn": "TCL033KN17C01048", "icomment": "东哨镇6#逆变器", "comment": "参考电压故障", "advice": "", "type": 1, "level": 1, "status": 0 }, { "collectTime": "2020-05-09T05:38:44.387", "itemNum": 168, "equipment": "I", "sn": "TCL033KN17C01048", "icomment": "东哨镇6#逆变器", "comment": "参考电压故障", "advice": "", "type": 1, "level": 1, "status": 1 }], "JsonData": "", "ReUrl": "", "IsSuccess": true, "ErrorCode": "", "ErrorMsg": "", "InfoMsg": "", "OtherInfo": null }
        this.listData = res.Data
      },
      //序号
      indexMethod (index) {
        let curpage = this.currentPage; //单前页码，具体看组件取值
        let limitpage = this.pageSize; //每页条数，具体是组件取值
        return index + 1 + (curpage - 1) * limitpage;
      },
    }
  }
</script>

<style lang="less" scoped>
  .alarmlist {
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
        @media screen and (max-width: 1800px) {
          /deep/.el-input__inner {
            width: 200px;
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
          width: 80px;
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
    @media screen and (max-width: 1800px) {
      .content{
        height:600px;
      }
    }
  }
</style>

