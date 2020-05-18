import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/**
 * 封装的组件
 */
import api from '@/apis/index.js';
Vue.prototype.api = api//接口统一管理
/**
 * 加载各个插件
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'amfe-flexible';
import $axios from '@/utils/request';
Vue.prototype.$axios = $axios
// import axios from 'axios'
// Vue.prototype.$ajax = axios
Vue.use(ElementUI)//引入element-ui
// 加载echarts，注意引入文件的路径
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import "./plugins/directive";

Vue.config.productionTip = false


//判断权限,path:当前路由。menu:权限菜单。
// let isPermission = (path, menu) => {
//   if (menu.length > 0) {
//     for (let i = 0; i < menu.length; i++) {
//       if (path === menu[i].menuUrl) {
//         return true;
//       } else {
//         if (menu[i].subMenu && menu[i].subMenu.length > 0) {
//           let flage = isPermission(path, menu[i].subMenu);
//           if (flage) {
//             return true;
//           }
//         }
//       }
//     }
//   }
// };

router.beforeEach(async (to, from, next) => {
  if (to.fullPath !== "/login" && to.fullPath !== "/noPermission") {
    //优先判断是否是登录页面,不为登录页做后续处理。
    let token = localStorage.getItem("token");
    if (!token) {
      if (vm) {vm.$message.error("请登录！");}
      next("/login");
    } else {
      next()
    }
    // 对比权限菜单
    // let path = to.path.split("/")[1];
    // let flag = false;
    // if (store.state.common.menu.length > 0) {
    //   //已有权限菜单，做后续处理
    //   flag = isPermission(path, store.state.common.menu); //判断当前路由是否有权限
    // } else {
    //   //没有权限菜单，获取菜单再做处理。
    //   await store.dispatch("common/getMenu");
    //   flag = isPermission(path, store.state.common.menu); //判断当前路由是否有权限
    // }
    // if (flag) {
    //   if (to.fullPath === "/computing") {
    //     //有权限，并且是引擎监控页面，打开新窗口。
    //     window.open(apiDomain.default.flinkIp);
    //   } else {
    //     next();
    //   }
    // } else {
    //   if (to.path === "/noPermission") {
    //     //防止死循环
    //     next();
    //   } else {
    //     window.localStorage.setItem("backUrl", from.fullPath); //存储上一个页面，用于返回。
    //     next("/noPermission");
    //   }
    // }
  } else {
    //登录页，直接跳过。
    next();
  }
});

var vm = new Vue({
  router,
  store,//注册store(这可以把 store 的实例注入所有的子组件)
  render: h => h(App)
}).$mount('#app')
