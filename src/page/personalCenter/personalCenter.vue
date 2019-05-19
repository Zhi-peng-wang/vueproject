<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <!--gutter 俩个col之间存在间隔-->
      <el-row :gutter="20">
        <!--左侧的导航-->
        <el-col :span="6" >
          <div class="panel panel-info">
            <div class="panel-heading">
              <b>个人信息</b>
            </div>
            <div class="panel-body">
              <el-menu active-text-color="#ffd04b" class="el-menu-vertical-demo" style="border: none">
                <el-menu-item key="1">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/personData'}">
                    <span>个人信息</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="2">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/allBlogList'}">
                    <span>日志列表</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="3">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/blogCategory'}">
                    <span>日志类别</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="4">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/allAlbumList'}">
                    <span>相册列表</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="5">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/albumCategory'}">
                    <span>相册类别</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="6">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/myComment'}">
                    <span>评论我的</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="7">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/myParticipate'}">
                    <span>我参与的</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="8">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/addBlog'}">
                    <span>添加日志</span>
                  </router-link>
                </el-menu-item>
                <el-menu-item key="9">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/addPhoto'}">
                    <span>添加相册</span>
                  </router-link>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  //复用组件(3步骤)
  //1.导入组件
  import navBar from '../nav/navBar'
    export default {
      //2.映射成组件对象
      components: {
        navBar
      },
      created(){
        //修改vuex中的导航栏中默认激活的值
        this.$store.commit('activeNav', "5");
      },
    }
</script>

<style scoped>
  .el-menu-vertical-demo ul{
    border: none;
  }
  ul li{
    padding: 0 0 0 -15px;
    text-align: center;
  }
</style>
