<template>
  <div class="container">
    <div class="nav_bar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item class="leftItem">
          <img :src="imageUrl" width="50px" height="50px">
        </el-menu-item>
        <el-menu-item class="leftItem">
          <p class="nameInfo" style="font-weight: 900;font-size: 20px">
            {{nickname}}
          </p>
          <p class="nameInfo">
            {{sign}}
          </p>
        </el-menu-item>
        <el-menu-item index="5" class="rightItem">
          <router-link :to="`/${$route.params.id}`+'/personalCenter'">
            <el-dropdown>
                  <p class="el-dropdown-link" style="margin: -4px 0 0 0">
                    {{nickname}}<i class="el-icon-arrow-down el-icon--right" style="margin:-3px 0px 0px -3px"></i>
                  </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="`/${$route.params.id}`+'/personalCenter'">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="`/${$route.params.id}`+'/editPassword'">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <b @click="exit()">退出登录</b>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </router-link>
        </el-menu-item>
        <el-menu-item index="4" class="rightItem">
          <router-link :to="`/${$route.params.id}`+'/leaveMessage'">留言</router-link>
        </el-menu-item>
        <el-menu-item index="3" class="rightItem">
          <router-link :to="`/${$route.params.id}`+'/blog'">日志</router-link>
        </el-menu-item>
        <el-menu-item index="2" class="rightItem">
          <router-link :to="`/${$route.params.id}`+'/album'">相册</router-link>
        </el-menu-item>
        <el-menu-item index="1"  class="rightItem">
          <router-link :to="`/${$route.params.id}`+'/homePage'">主页</router-link>
        </el-menu-item>
      </el-menu>
      <br>
    </div>
  </div>
</template>

<script>
    import {headMsg} from "../../api";
    export default {
      data(){
        return{
          imageUrl:"",      //头像路径
          activeIndex: "",  //默认激活导航栏
          nickname:"",      //网名
          sign:"",          //个性签名
        }
      },
      mounted() {
        //从vuex中获取激活状态
        this.activeIndex=this.$store.state.activeIndex;
        headMsg({userid:localStorage.getItem("loginUser")})
          .then(res=>{
            console.log("导航条处打印信息");
            console.log(res);
            //获取路径
            this.imageUrl=res.object.userimg;
            //获取网名
            this.nickname=res.object.nickname;
          //  获取个性签名
            this.sign=res.object.sign;
          })
          .catch(err=>{
            console.log(err);
          })
      },
      methods:{
        exit(){
          console.log("点击退出登录并跳转到登录页");
          this.$confirm('确认退出登录?', '提示', {
            confirm2uttonText: '确定',
            cancel2uttonText: '取消',
            type: 'warning',
            center:true
          }).then((action) => {
            if (action==='confirm'){    //成功的回调
              //清除localstroge和sessionstroge里的所有数据
              localStorage.clear();
              sessionStorage.clear();
              this.$router.push({ path: '/' });
              this.$message({
                showClose: true,
                type: 'info',
                message: '退出登录成功'
              });
            }
          }).catch((err) => {
            if (err==='cancel'){       //失败的回调
              this.$message({
                showClose: true,
                type: 'info',
                message: '已取消退出登录'
              });
            }
          });
        }
      }
    }
</script>

<style scoped>
  .leftItem{
    float: left;
  }
  .rightItem{
    float: right;
  }
  ul li{
    padding: 0;
    width: 100px;
    text-align: center;
  }
  .nameInfo{
    margin: 0;
    height: 30px;
    line-height: 30px;
  }
</style>
