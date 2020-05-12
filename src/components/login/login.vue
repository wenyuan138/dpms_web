<template>
    <div class="login">
        <div class="container">
            <div class="title">
                分布式电站管理系统
            </div>
            <div class="box">
                <div class="boxTitle">
                    用户登录
                </div>
                <div class="boxContainer">
                    <el-form label-position="left" :model="loginInfo" ref="loginInfo">
                        <el-form-item></el-form-item>
                        <el-input v-model="loginInfo.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="loginInfo.password" placeholder="请输入密码" prefix-icon="el-icon-key"></el-input>
                        </el-form-item>
                        <div class="loginBtn">
                            <span>
                                <input type="checkbox" name="checkbox1" value="7天内自动登录" checked="checked"/>
                                7天内自动登录
                            </span>
                            <el-button @click="login" round size="mini" class="submitBtn">登 录</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { JSEncrypt } from 'jsencrypt'
    export default {
        name: 'Login',
        data () {
            return {
                loginInfo: {
                    username: '',
                    password: ''
                },//用户信息
                publicKey: '',//公钥
                checked: false,//判断是否存储用户信息
            }
        },
        mounted () {
            //判断是否记住账号密码
            // this.checkLogin()
            //获取公钥
            // this.getPublicKey();
        },
        methods: {
            //登陆
            login () {
                if (this.loginInfo.password === '' && this.loginInfo.username === '') {
                    this.$router.push({ name: "Home" })
                    return
                }//跳过验证直接进入首页
                this.$refs['loginInfo'].validate((valid) => {
                    if (valid) {
                        let password = this.encryptedData(this.publicKey, this.loginInfo.password);
                        let data = {
                            userAccount: this.loginInfo.username,
                            userPw: password
                        }
                        this.api.login.login(data).then(async (res) => {
                            if (res.code === 2000) {
                                // 存储登录后的token以及refreshToken;
                                window.localStorage.setItem('token', res.value.authorization);
                                //存储登录信息
                                if (this.checked == true) {
                                    this.loginMessage[0].username = this.userInfo.username
                                    this.loginMessage[0].password = this.userInfo.password
                                    window.localStorage.setItem('usernameAndPassword', JSON.stringify(this.loginMessage));
                                } else {
                                    window.localStorage.removeItem('usernameAndPassword')
                                }
                                this.$router.push({ name: "Home" })
                            }
                        })
                    }
                })
            },
            // 加密
            encryptedData (publicKey, data) {
                // 新建JSEncrypt对象
                let encryptor = new JSEncrypt();
                // 设置公钥
                encryptor.setPublicKey(publicKey);
                // 加密数据
                return encryptor.encrypt(data);
            },
            //获取公钥
            getPublicKey () {
                this.api.login.getPublicKey().then((res) => {
                    if (res.code = 2000) {
                        this.publicKey = res.value.publicKey;
                    }
                })
            },
            //判断是否记住账号密码
            checkLogin () {
                let getLoginMessage = JSON.parse(window.localStorage.getItem("usernameAndPassword"))
                if (getLoginMessage != null) {
                    this.userInfo.username = getLoginMessage[0].username
                    this.userInfo.password = getLoginMessage[0].password
                    this.checked = true
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .login {
      background-color: rgb(40, 136, 74);
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .container {
        background-color: rgb(37, 125, 68);
        height: 340px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          font-size: 26px;
          font-weight: 600;
          color: white;
          text-shadow: 2px 2px 2px #000;
          margin-bottom: 15px;
        }
        .box {
          background-color: white;
          width: 350px;
          height: 240px;
          .boxTitle {
            width: 100%;
            height: 40px;
            background-color: rgb(243, 243, 243);
            font-size: 15px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #ccc;
          }
          .boxContainer {
            display: flex;
            justify-content: center;
            .el-input {
              display: inline-block;
              width: 310px;
              height: 45px;
              margin-top:10px;
            }
            .loginBtn {
              width: 100%;
              display: flex;
              justify-content:space-between;
              align-items: center;
              .submitBtn{
                  font-size: 12px;
                  color:rgb(37, 125, 68);
                  font-weight: 600;
                  background:linear-gradient(to bottom,rgb(250, 250, 250) 0%,rgb(210, 230, 240) 100%);
                  border:1px solid #ccc
              }
            }
          }
        }
      }
    }
</style>

