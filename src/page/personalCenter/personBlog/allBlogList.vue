<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <b>日志列表</b>
      </div>
      <div class="panel-body">
        <div style="margin-left: 30px">
          <el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="handleCheckAllChange">
            全选
          </el-checkbox>
          <el-button type="danger" style="margin-left: 535px"
                     @click="confirmDeleteAll()"  :disabled="checkedBoxs.length<2">
            批量删除
          </el-button>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedBoxs" @change="handlecheckedBlogsChange">
            <el-checkbox v-for="(t,index) in blogCheckBox" :label="t" :key="index" class="blog_label">
              <div>
                <div style="width: 100px;display: inline-block">{{t.categoryname}}</div>
                <div style="width: 100px;display: inline-block">{{t.title.length<13?t.title:t.title.slice(0,13)+"..."}}</div>
                <div style="margin-left:160px;display: inline-block;">{{t.contentdate.slice(0,10)}}-{{t.contentdate.slice(11,16)}}</div>
                <div style="margin-left:70px;display: inline-block;">
                  <el-button type="danger"  @click="confirmDelete(t)">
                    删除
                  </el-button>
                </div>
                <div  style="margin-left:30px;display: inline-block;">
                  <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/editBlog',query:{contentid:t.contentid}}">
                    <el-button type="primary">
                      编辑
                    </el-button>
                  </router-link>
                </div>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <!--分页-->
        <div class="block" style="margin-left: 230px;">
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
  import {deleteContent, pageAllContentAndCategory} from "../../../api";

    export default {
        data(){
          return{
            totalNum:0,     //博客总条数
            pageSize:10,     //一页显示多少条数据
            pageNumber:0,   //代表第几页
            blogCheckBox:[],    //日志列表项目组
            isCheckAll:false,   //是否全选
            isIndeterminate: true,
            checkedBoxs:[],     //选中的checkedBoxs数组
          }
        },
      mounted(){
        //页面刚刚开始时执行获取全部的数据
        this.getPageAllBlog();
      },
      methods:{
        //批量删除
        confirmDeleteAll(){
          this.$confirm('此操作将永久删除这些日志, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then((action) => {
            if (action === 'confirm') {     //确认的回调
              let data =this.checkedBoxs.map(item=>({
                contentid:item.contentid
              }));
              deleteContent(data)
                .then(res=>{
                  console.log("批量删除按钮已触发");
                  console.log(res);
                  this.checkedBoxs=[];
                  this.getPageAllBlog();
                })
                .catch(err=>{
                  console.log(err);
                });
              this.$message({
                type: 'success',
                message: '删除成功!',
                showClose:true
              });
            }
          }).catch((err) => {
            if (err === 'cancel') {     //取消的回调
              this.$message({
                type: 'info',
                message: '已取消删除',
                showClose:true
              });
            }
          });
        },
        //单个删除
        confirmDelete(obj){
          this.$confirm('此操作将永久删除该日志, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then((action) => {
            if (action === 'confirm') {     //确认的回调
              //将数据放入到数组中
              this.checkedBoxs.push(obj);
              //准备接口需要传输的数据
              let data =this.checkedBoxs.map(item=>({
                contentid:item.contentid
              }));
              //接口调用
              deleteContent(data)
                .then(res=>{
                  console.log("个人中心处删除按钮触发");
                  console.log(res);
                  this.checkedBoxs=[];
                  this.getPageAllBlog();
                })
                .catch(err=>{
                  console.log(err);
                });
              this.$message({
                type: 'success',
                message: '删除成功!',
                showClose:true
              });
            }
          }).catch((err) => {
            if (err === 'cancel') {     //取消的回调
              this.$message({
                type: 'info',
                message: '已取消删除',
                showClose:true
              });
            }
          });
        },
        handleCheckAllChange(val) {
          this.checkedBoxs = val ? this.blogCheckBox : [];
          this.isIndeterminate = false;
        },
        handlecheckedBlogsChange(value) {
          let checkedCount = value.length;
          this.isCheckAll = checkedCount === this.blogCheckBox.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.blogCheckBox.length;
        },
        //得到全部的日志数据
        getPageAllBlog(){
          let data={
            userid:localStorage.getItem("loginUser"),
            pageno:this.pageNumber,
            contenttype:"B",
            pagesize:10
          };
          pageAllContentAndCategory(data)
            .then(res=>{
              console.log("得到全部的日志数据");
              console.log(res);
              this.totalNum=res.object.num;//拿到总条数
              this.blogCheckBox=res.object.content;//拿到当前页的数据
              console.log(this.blogCheckBox);
            })
            .catch(err=>{
              console.log(err);
            })
        },
        //分页得相关操作
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pageNumber=`${val}`;
          console.log(this.pageNumber);
          this.getPageAllBlog()
        },
      }
    }
</script>

<style scoped>
  .blog_label{
    display: block;
    margin-bottom: 20px;
  }
</style>
