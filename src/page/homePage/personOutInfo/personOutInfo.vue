<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <!--访客信息栏目-->
            <div class="panel panel-info">
              <div class="panel-heading">
                <b>最近访客</b>
              </div>
              <div class="panel-body">
                <router-link :to="`${$route.params.id}`+'/visitCenter'">
                  <h1>访客信息</h1>
                </router-link>
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
          <el-col :span="16">
            <div class="panel panel-info">
              <div class="panel-heading">个人资料</div>
              <div class="panel-body">
                <div>
                  <p>昵称：{{nickname}}</p>
                  <p><span>签名：{{sign}}</span></p>
                  <p><span>年龄：{{age}}</span></p>
                  <p><span>性别：{{sex}}</span></p>
                  <p>电话：{{Tel}}</p>
                  <p><span>邮箱：{{email}}</span></p>
                  <p><span>生日：{{birth}}</span></p>
                  <p><span>地址：{{add}}</span></p>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  //复用组件(3步骤)
  //1.导入组件
  import navBar from '../../nav/navBar'
    export default {
      //2.映射成组件对象
      components: {
        navBar
      },
      data(){
        return{
          todayVisitor:"15", //今日浏览量
          totalVisitNum:"276",    //总浏览量
          nickname: "",       //网名
          sign:"",            //个性签名
          sex: "",            //性别
          age: "",            //年龄
          Tel: "",            //电话
          email: "",          //邮箱
          birth: "",          //生日
          add: "",            //地址
        }
      },
      created(){
        //修改vuex中的导航栏默认激活的值
        this.$store.commit('activeNav', "1");
      },
    }
</script>

<style scoped>
  .browseNum{
    text-align: center;
    opacity: 0.7;
  }
</style>
