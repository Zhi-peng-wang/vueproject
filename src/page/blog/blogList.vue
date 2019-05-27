<template>
    <div>
      <!--分类下有内容时展示-->
      <div v-if="totalNum!==0">
        <div style="height: 420px">
          <ul>
            <li v-for="(t,index) in allBlogList" :key="index">
              <el-card shadow="hover">
                <router-link :to="{path:`/${$route.params.id}`+'/blog/blogContent',query:{contentid:t.contentid}}">
                  <span class="content_color">{{t.title}}</span>
                  <span class="content_color" style="float: right;margin-right: 60px">{{t.contentdate.slice(0,10)}}-{{t.contentdate.slice(11,16)}}</span>
                </router-link>
              </el-card>
            </li>
          </ul>
        </div>
        <!--分页-->
        <div class="block" style="text-align: center">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
      </div>
      <!--分类下没有内容时展示-->
      <div v-if="totalNum===0" style="height: 400px;">
        <el-row style="margin-top: 100px">
          <el-card style="height: 200px">
            <p style="text-align: center;margin: -20px;line-height: 200px;font-size: 36px;opacity: 0.7">
              暂无内容！
            </p>
          </el-card>
        </el-row>
      </div>
    </div>
</template>

<script>
    import {listContentByCategory} from "../../api";

    export default {
        data(){
          return{
            totalNum:0,     //博客总条数
            pageSize:0,     //一页显示多少条数据
            pageNumber:0,   //代表第几页
            allBlogList:[],     //所有的日志数据
            isContentShow:true,      //分类下是否有内容
          }
        },
      mounted() {
        this.getlistContentByCategory()
      },
      // 监听,当路由发生变化的时候执行,重新去请求函数
      watch: {
        '$route':'getlistContentByCategory'
      },
      methods:{
        //通过二级分类id得到该id下的日志列表
        getlistContentByCategory(){
          let data ={
            categoryid:this.$route.query.categoryid,
            pagenum:this.pageNumber
          };
          listContentByCategory(data)
            .then(res=>{
              console.log("点击了二级分类调用函数去执行");
              console.log(res);
              this.totalNum=res.object.totalElements;//拿到总条数
              this.pageSize=res.object.size;//拿到一页显示多少条数
              this.allBlogList=res.object.content;
            })
            .catch(err=>{
              console.log(err);
            })
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val-1}`);
          this.pageNumber=`${val-1}`;
          console.log(this.pageNumber);
          this.getlistContentByCategory();
        },
      }
    }
</script>

<style scoped>
  ul li{
    margin-bottom: 15px;
  }
  .content_color{
    color: black;
    opacity: 0.5;
  }
</style>
