//对所有请求做统一处理
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import whiteUser from './whiteUser.js';
import router from '@/router';

import apiDomain from '../../public/static/config.js'
// create an axios instance
const service = axios.create({//如果一个项目从多个不同的地址请求数据就需要新建axios
  baseURL: apiDomain.api, // url = base url + request url
  timeout: 0 // request timeout
})

let loading        //定义loading变量
let needLoadingRequestCount = 0 //接口请求个数。
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    background:'rgba(255,255,255,0.1)'
  });
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return

  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
//接口白名单，不做监听
function testWhite(params) {
  let flag = 0; 
  whiteUser.forEach(v => {
    flag = params.indexOf(v) == "-1" ? 0 : 1
  })
  return flag;
}
//添加请求拦截器
service.interceptors.request.use(config => {
  !testWhite(config.url) && (showFullScreenLoading());
  if (window.localStorage.token) {
    config.headers['token'] = `${localStorage.token}`//添加请求头
  }
  return config;
}, error => {
  console.log(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  if (response.data.errCode !== 0 && response.data.errMsg) {
    Message.error(response.data.errMsg || "网络错误");
  }
  if (response.data.errCode === 3002){
    this.$router.push({path:'/login'})
  }
  !testWhite(response.request.responseURL) && tryHideFullScreenLoading()
  return response.data;
}, error => {
  !testWhite(error.config.url) && tryHideFullScreenLoading()
  //响应错误时做些事
  if (!error.response) {
    return Promise.reject("网络错误");
  }
  if (error.response && error.response.data.errCode === 401) {  // token失效,登录不存在账户
    router.replace('/login');
    return Promise.reject("登录失效,请重新登录");
  } else if (error.response.data.status === 503) {
    //服务不可用
    Message.error('请求失败');
    return Promise.reject("请求失败");
  } else { //不为401的状态码才报错。
    if (error.response.data && error.response.data.message) {
      Message.error(error.response.data.errMsg);
    } else if (error.response.data && !error.response.data.message) {
      Message.error(error.response.data);
    }
    var errorMesg = '';
    //终端命令408错误
    if (error.response.status === 408) {
      errorMesg = "";
    }
    // 404状态
    if (error.response.status === 404) {
      errorMesg = error.response.data;
    }
  }
  return Promise.reject(errorMesg);
});

export default service