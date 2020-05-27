import request from '@/utils/request'

let api = {
  //首页接口
  shouye: {
    //获取首页tab数据
    getACOutActPower: (data) => {
      return request({
        url: '/getACOutActPower',
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