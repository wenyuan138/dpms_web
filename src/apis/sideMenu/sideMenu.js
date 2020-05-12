import request from '@/utils/request'

let api = {
  //获取侧边栏数据
  getSideMenuData: (data) => {
    return request({
      url: '/xxxxxxxxxxxx',
      method: 'get',
      data: {
        body: {
          
        }
      }
    })
  },
}

export default api