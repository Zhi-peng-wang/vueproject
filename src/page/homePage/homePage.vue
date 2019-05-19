<template>
  <!--container样式在App.vue中已写-->
  <div class="container">
    <!--3.标签式展现数据-->
    <navBar></navBar>
    <el-row>
      <!--左边区域-->
      <el-col :span="8">
        <!--相册，日志，留言数量-->
        <div class="publishNum">
          <div class="middle-box">
            <div class="middle-inner">
              <p><span>照片</span><br/></p>
              <p><span>{{photoNum}}</span></p>
            </div>
            <div class="middle-inner">
              <p><span>日志</span><br/></p>
              <p><span>{{blogNum}}</span></p>
            </div>
            <div class="middle-inner" style="border-right: none">
              <p><span>留言</span><br/></p>
              <p><span>{{leaveMsg}}</span></p>
            </div>
          </div>
        </div>
        <!--个人信息档-->
        <div class="panel panel-warning">
          <div class="panel-heading" style="height: 20px">
            <span style="float: left">个人档</span>
            <b style="float: right">个人信息</b>
          </div>
          <div class="panel-body">
            <div class="userInfoArea">
              <img src="../../assets/homePage/account-circle-line.png">
              <p>{{userName}}</p>
            </div>
            <div class="userInfoArea">
              <img src="../../assets/homePage/bill-line.png">
              <p>{{sex}}</p>
            </div>
            <div class="userInfoArea">
              <img src="../../assets/homePage/water-flash-line.png">
              <p>{{email}}</p>
            </div>
          </div>
        </div>
        <!--访客信息栏目-->
        <div class="panel panel-info">
          <div class="panel-heading">
            <b>最近访客</b>
          </div>
          <div class="panel-body">
            <h1>访客信息</h1>
          </div>
          <!--访客量-->
          <div class="panel-body" style="padding: 0 0 15px 0">
            <el-row>
              <el-col :span="8">
                <p class="browseNum">今日浏览</p>
                <p class="browseNum"><b>{{todayVisitor}}</b></p>
              </el-col>
              <el-col :span="8">
                <p class="browseNum">总浏览量</p>
                <p class="browseNum"><b>{{totalVisitNum}}</b></p>
              </el-col>
              <el-col :span="8">
                  <p class="browseNum" style=" font-weight: bold;padding-top: 30px;color: #2aabd2">
                    <router-link :to="`/${$route.params.id}`+'/visitCenter'">更多访客</router-link>
                  </p>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <!--右边区域-->
      <el-col :span="16">
        <h1>右边</h1>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  //复用组件(3步骤)
  //1.导入组件
  import navBar from '../nav/navBar'
  import {getSimpleInfo} from "../../api";

  export default {
    //2.映射成组件对象
    components: {
      navBar
    },
    created(){
      //修改vuex中的导航栏默认激活的值
      this.$store.commit('activeNav', "1");
    },
  //  数据区域
    data(){
      return{
        photoNum:"89",    //相册数量
        blogNum:"68",     //日志数量
        leaveMsg:"95",    //留言数量
        userName:"",  //个人档中的姓名
        sex:"",          //性别
        email:"",          //邮箱
        todayVisitor:"15", //今日浏览量
        totalVisitNum:"276",    //总浏览量
      }
    },
    mounted() {
    //  准备数据，得到个人档中的信息
      let data ={
        userid:this.$route.params.id
      };
      getSimpleInfo(data)
        .then(res=>{
          console.log("个人档处打印信息");
          console.log(res);
        //  得到userName
          this.userName=res.object.nickname;
        //  得到sex
          this.sex=res.object.sex;
        //  得到邮箱
          this.email=res.object.username;
        })
        .catch(err=>{
          console.log(err);
        })
    }
  }
</script>

<style scoped>
  .browseNum{
    text-align: center;
    opacity: 0.7;
  }
  .userInfoArea{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 15px;
  }
  .userInfoArea img{
    width: 30px;
    height: 30px;
    text-align: center;
    margin: 5px;
    float: left;
  }
  .userInfoArea p{
    color: black;
    float: left;
    line-height: 40px;
    margin: 0;
    padding-left: 15px;
    font-weight: 600;
  }
  .publishNum{
    border: 1px solid #cee3e9;
    height: 90px;
    background:rgba(226,235,237,.6);
    margin-bottom: 30px;
  }
  .middle-box {
    display: table; /*重点*/
    margin-top: 8px;
  }
  .middle-inner {
    font-size: 18px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 150px;
    height: 50px;
    border-right:1px solid #cee3e9;
  }
  .middle-inner p{
    margin: 10px;
  }
</style>
