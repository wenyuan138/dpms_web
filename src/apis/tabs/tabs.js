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
    //获取发电量统计
    getDayPowerGen:(data)=>{
      return request({
        url:"/GetDayPowerGen",
        method:'post',
        data
      })
    },
    //获取表格数据
    getSummary:(data)=>{
      return request({
        url:"/GetSummary",
        method:'post',
        data
      })
    },
    //获取累计发电量
    getTotalGeneration:(data)=>{
      return request({
        url:"/GetTotalGeneration",
        method:'post',
        data
      })
    },
  },
  // 逆变器接口
  nibian:{

  },
}

export default api