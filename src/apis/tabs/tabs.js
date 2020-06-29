import request from '@/utils/request'

let api = {
  //首页接口
  shouye: {
    //获取实时功率统计
    getACOutActPower: (data) => {
      return request({
        url: '/GetRtPower',
        method: 'post',
        data
      })
    },
  },
  // 逆变器接口
  nibian:{

  },
}

export default api