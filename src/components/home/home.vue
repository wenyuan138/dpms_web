<template>
  <div class="home">
    <div class="side">
      <side-menu></side-menu>
    </div>
    <div class="content">
      <!-- tab页切换 -->
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="首页" name="home">
          <shouYe ref="shouYe"></shouYe>
        </el-tab-pane>
        <el-tab-pane label="逆变器" name="nibianqi">
          <niBian ref="niBian"></niBian>
        </el-tab-pane>
        <el-tab-pane label="运行报表" name="startTable">
          <startTable ref="startTables"></startTable>
        </el-tab-pane>
        <el-tab-pane label="报警记录" name="alarm">
          <alarmList ref="alarm"></alarmList>
        </el-tab-pane>
        <el-tab-pane label="支路电流分析" name="zhiludianliu">
          <zhiluA ref="zhilu"></zhiluA>
        </el-tab-pane>
        <el-tab-pane label="数据对比" name="shujuduibi">
          <shujuDB ref="shuju"></shujuDB>
        </el-tab-pane>
        <el-tab-pane label="组串离散率" name="lisanlv">
          <lisanlv ref="lisan"></lisanlv>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-button type="primary" icon="el-icon-switch-button" class="logOutBtn" @click="loginOut"></el-button>
  </div>
</template>

<script>
  import sideMenu from './sideMenu/sideMenu.vue'//侧边栏
  import shouYe from './tabs/shouye.vue'//首页
  import niBian from './tabs/nibian.vue'//逆变器
  import startTable from './tabs/startTable.vue'//运行报表
  import alarmList from './tabs/alarmList.vue'//报警记录
  import zhiluA from './tabs/zhilu.vue'//支路电流
  import shujuDB from './tabs/shuju.vue'//数据对比
  import lisanlv from './tabs/lisan.vue'//组串离散率
  export default {
    name: 'Home',
    data () {
      return {
        activeName: 'home',//默认展示的tab页
      }
    },
    components: {
      sideMenu,
      shouYe,
      niBian,
      startTable,
      alarmList,
      zhiluA,
      shujuDB,
      lisanlv
    },
    methods: {
      //退出登录
      loginOut () {
        window.localStorage.removeItem("token");
        this.$router.push({ name: 'Login' })
      },
      //点击tab页时加载相应接口
      handleClick (tab, event) {
        if (tab.name === "home") {
          this.$refs.shouYe.getShouYeData()
        }else if (tab.name === "nibianqi"){
          this.$refs.niBian.mountedMethods()
        }else if (tab.name === 'startTable'){
          this.$refs.startTables.mountedMethods()
        }else if (tab.name === 'alarm'){
          this.$refs.alarm.mountedMethods()
        }else if (tab.name === 'zhiludianliu'){
          this.$refs.zhilu.mountedMethods()
        }else if (tab.name === 'shujuduibi'){
          this.$refs.shuju.mountedMethods()
        }else if (tab.name === 'lisanlv'){
          this.$refs.lisan.mountedMethods()
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .home {
    display: flex;
    width: 100%;
    height:100%;
    .side {
      width: 275px;
      height: 100%;
      background-color: rgb(47, 72, 68);
    }
    .content {
      flex: 1;
      background: linear-gradient(
        to bottom,
        rgb(68, 115, 104) 0%,
        rgb(53, 63, 76) 100%
      );
      /deep/.el-tabs__header {
        border: none;
        margin-bottom: 0px;
        background-color: rgb(25, 51, 29);
      }
      /deep/.el-tabs__nav {
        border: none;
      }
      /deep/.el-tabs__item {
        color: rgb(214, 214, 214);
        font-size: 20px;
        font-weight: 600;
        width: 200px;
        height: 40px;
        text-align: center;
        border: none;
      }
      @media screen and (max-width: 1800px) {
        /deep/.el-tabs__item{
          width:150px;
        }
      }
      /deep/.is-active {
        color: white;
        background-color: rgb(58, 76, 60);
      }
      /deep/.el-tabs {
        width: 100%;
        height: 100%;
      }
      /deep/.el-tabs__content {
        width: 100%;
        height: calc(100% - 55px);
      }
      /deep/.el-tab-pane {
        width: 100%;
        height: calc(100% - 55px);
      }
    }
    .logOutBtn {
      position: fixed;
      top: 2px;
      right: 10px;
      padding: 5px;
      font-size: 20px;
      z-index:999;
    }
  }
</style>

