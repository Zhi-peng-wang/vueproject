<template>
  <div :style ="note" class="note">
    <div style="height: 1000px">
      <div class="login">
        <div class="head">
          <img height="80px" src="../assets/loginImg.png" width="80px">
        </div>
        <div class="content">
          <br>
          <el-input clearable placeholder="请输入用户名" v-model="username"></el-input><br><br>
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input><br>
          <el-button @click="dologin" type="submit">登录</el-button><br>

          <div class="other">
              <router-link to="/signUp"
                           style="font-size: 14px;color:#888888;line-height: 50px;">
                免费注册账号
              </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  //第三方登录接口
  // QC.Login({
  //   btnId:"qqLoginBtn"
  // });
  //导入接口
  import {loginVerify} from "../api";

  export default {
    data(){
      return{
        username:"742349899@qq.com",
        password:"qqq111",
        note: {
          backgroundImage: "url(" + require("../assets/signIn.jpg") + ")",
          backgroundRepeat: "no-repeat",
        },
      }
    },
    methods:{
      //点击登录执行方法
      dologin(){
        //准备数据
        let data={'username':this.username,'password':this.password};
        //接口执行
        loginVerify(data)
          .then(res=>{
            console.log(res);
            //localStorage 存下userid
            localStorage.setItem("loginUser",res.object.userid);
            //sessionStorage 存下token
            sessionStorage.setItem("token",res.object.token);
            console.log("打印sessionStorage里面的userid:"+localStorage.getItem("loginUser"));
            //将localStorage中userid存在vuex中
            this.$store.state.loginUser=localStorage.getItem("loginUser");
            console.log("打印vuex里面的userid:"+this.$store.state.loginUser);
            //id指向下方路由跳转的地方
            let id = this.$store.state.loginUser;
            if (res.status===200){
              this.$message({
                message: '登录成功!',
                type: 'success',
                showClose:true
              });
              this.$router.push(`/${id}/homePage`)
            }
          })
          .catch(error=>{
          this.$message({
            message: '登录失败，请检查用户名及密码!',
            type: 'error',
            showClose:true
          });
          console.log("error"+error);
        })
      }
    }
  }

</script>

<style scoped>
  .note{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
  }
  .content{
    background:rgba(226,235,237,.5);
    border-radius: 5%;
    border:1px solid #cceff5;
    width: 320px;
    height: 290px;
    margin: 0 auto;
    padding: 15px;
  }
  .login{
    height: 500px;
    text-align:center;
    margin-top: 100px;
  }
  .head{
    margin:0 auto;
    margin-bottom: 20px;
    border: 1px solid #2aabd2;
    width:82px;
    height:82px;
    border-radius: 50%;
  }
  .other{
    width: 100%;
    height: 50px;
    text-align: right;
  }
  button{
    font-size: 14px;
    background: linear-gradient(to top right, #e8f5f8,#a7e0ec, #5dd4ed);
    width: 100%;
    margin: 20px auto;
    border: 1px solid #cceff5;
  }
</style>
