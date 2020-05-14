import request from '@/utils/request'

let api = {
  //获取公钥
  getPublicKey: (data) => {
    return request({
      url: '/v2/iot/getPublicKey',
      method: 'post',
      data: {
        body: data
      }
    })
  },
  //登录
  login: (data) => {
    return request({
      url: '/login',
      method: 'post',
      data: {
        Username:data.username,
        Passwd:data.password
      }
    })
  },
}

export default api