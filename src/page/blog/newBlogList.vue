<template>
    <div>
      <div style="margin-top: 30px">
        <div >
          <div style="height: 400px">
            <ul style="padding-left: 20px">
              <li v-for="(b,index) in allBlogList" :key="index">
                <el-card shadow="hover">
                  <router-link :to="{path:`/${$route.params.id}`+'/blog/blogContent',query:{contentid:b.contentid}}">
                    <span class="content_color">{{b.title}}</span>
                    <span class="content_color" style="float: right;margin-right: 60px">{{b.contentdate.slice(0,10)}}-{{b.contentdate.slice(11,16)}}</span>
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
      </div>
    </div>
</template>

<script>
    import {pageAllBlog} from "../../api";

    export default {
        data(){
          return{
            totalNum:0,     //博客总条数
            pageSize:0,     //一页显示多少条数据
            pageNumber:0,   //代表第几页
            allBlogList:[],     //全部的日志数据
          }
        },
      mounted(){
        //页面初始化执行得到数据的操作
        this.getAllBlogList();
      },
      methods:{
        //分页得相关操作
        handleCurrentChange(val) {
          console.log(`当前页: ${val-1}`);
          this.pageNumber=`${val-1}`;
          console.log(this.pageNumber);
          this.getAllBlogList()
        },
        //得到全部的日志数据
        getAllBlogList(){
          let data={
            userid:localStorage.getItem("loginUser"),
            pagenum:this.pageNumber,
            contenttype:"B",
          };
          pageAllBlog(data)
            .then(res=>{
              //得到全部的日志数据
              console.log("在日志页得到全部的日志数据并进行分页");
              console.log(res);
              this.totalNum=res.object.totalElements;//拿到总条数
              this.pageSize=res.object.size;//拿到一页显示多少条数
              this.allBlogList=res.object.content;
            })
            .catch(err=>{
              console.log(err);
            })
        }
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
