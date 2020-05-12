import Vue from 'vue'
import VueRouter from 'vue-router'
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)
// 自己玩的项目
const routes = [
  //路由重定向
  {
    path: '/',
    redirect: '/login'
  },
  //登录页
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['../components/login/login.vue'], resolve),
  },
  //首页
  {
    path: '/home',
    name: 'Home',
    component: resolve => require(['../components/home/home.vue'], resolve),
  },
]

const router = new VueRouter({
  routes
})

export default router
