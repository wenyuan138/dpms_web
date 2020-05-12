import request from '@/utils/request'
import requestConst from '../constant.js'

let api = {
  //登录
  login: (data) => {
    return request({
      url: '/v2/iot/login',
      method: 'post',
      data: {
        ...requestConst,
        body: {
          userAccount: data.userAccount,
          userPw: data.userPw
        }
      }
    })
  },
  //获取公钥
  getPublicKey: (data) => {
    return request({
      url: '/v2/iot/getPublicKey',
      method: 'post',
      data: {
        ...requestConst,
        body: data
      }
    })
  },
}

export default api