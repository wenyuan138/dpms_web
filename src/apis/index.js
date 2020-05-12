//登录
import login from './login/login.js';
//侧边栏
import sideMenu from './sideMenu/sideMenu.js'
//tabs
import tabs from './tabs/tabs.js'

let api = {
  login: { ...login },
  sideMenu: { ...sideMenu },
  tabs: { ...tabs },
}

export default api
