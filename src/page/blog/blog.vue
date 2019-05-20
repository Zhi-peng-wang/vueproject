<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <!--gutter 俩个col之间存在间隔-->
      <el-row :gutter="20">
        <!--相关分类-->
        <el-col :span="8">
          <el-row>
            <el-col :span="24">
              <template>
                <h4>日志分类</h4>
              </template>
              <el-menu active-text-color="#ffd04b" class="el-menu-vertical-demo"
                       uniqueOpened>
                <el-submenu v-for="(t1,index) in listCategoryA" :key="index" :index="t1.CategoryID">
                  <template slot="title">
                    <span style="display: block">{{t1.CategoryName}}</span>
                  </template>
                  <el-menu-item-group v-for="(t2,index) in listCategoryB" :key="index"  v-if="t1.CategoryID==t2.ParentID">
                    <el-menu-item :key="index">
                      <router-link :to="{path:`/${$route.params.id}`+'/blog/blog_list',query:{classid:t2.classid}}"
                      >
                        <span>{{t2.CategoryName}}</span>
                        <el-badge :value="t2.num" class="item" type="primary" style="float: right;margin-top: 5px">
                        </el-badge>
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-col>
        <!--点击分类之后的数据-->
        <el-col :span="16">
          <div class="panel panel-info">
            <div class="panel-heading">
              <h4>日志列表</h4>
            </div>
            <div class="panel-body">
              <router-view></router-view>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  //复用组件(3步骤)
  //1.导入组件
  import navBar from '../nav/navBar'
  import {listAllCategory} from "../../api";
    export default {
      //2.映射成组件对象
      components: {
        navBar
      },
      //相关的数据源
      data(){
        return{
          listCategoryA:[],     //一级分类的数组
          listCategoryB:[],     //二级分类的数组
        }
      },
      created(){
        //修改vuex中的导航栏中默认激活的值
        this.$store.commit('activeNav', "3");
      },
      mounted(){
        //为了得到分类的数据，准备数据
        let data={
          userid:this.$route.params.id,
          categorytype:"1"
        };
        //得到一级分类的接口
        listAllCategory(data)
          .then(res=>{
            console.log("执行获取分类的接口");
            console.log(res);
          //  将值赋值给result,然后进行过滤
            let result=res.object;
            //准备一级分类的数据
            result.map(item=>{
              if (item.Depth==1&&item.ParentID==0){
                this.listCategoryA.push(item)
              }
            });
            //准备二级分类的数据
            result.map(item => {
              if (item.Depth == 2) {
                return this.listCategoryB.push(item)
              }
            });
          })
          .catch(err=>{
            console.log(err);
          })
      },
      methods:{
      }
    }
</script>

<style scoped>

</style>
