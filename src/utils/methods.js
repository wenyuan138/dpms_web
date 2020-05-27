import moment from 'moment';

let utils = {
  //时间处理
  fomrmatDate: (val) => {
    if (val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  }
}

export default utils;