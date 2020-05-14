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

new Vue({
  router,
  store,//注册store(这可以把 store 的实例注入所有的子组件)
  render: h => h(App)
}).$mount('#app')
