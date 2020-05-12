const requestConst = {
  id: parseInt(Math.random()*900000+100000 + new Date()/1000), //ID随机数公式
  caller: 'CMDservice',
  function: "iot/test",
  version: "2.0",
}
export default requestConst
