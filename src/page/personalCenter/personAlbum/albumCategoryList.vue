<template>
  <div>
    <div class="panel panel-info" style="height: 1150px">
      <div class="panel-heading">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="`/${$route.params.id}`+'/personalCenter/allAlbumList'">相册</el-breadcrumb-item>
          <el-breadcrumb-item>相册下图片</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--<h1>这是图片列表页面</h1>-->
      <div class="panel-body">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
          全选
        </el-checkbox>
        <el-button type="danger"  style="margin-left: 655px" @click="confirmDeletePhoto()" :disabled="checkedAlbums.length===0">
          删除
        </el-button>
        <el-row>
          <el-checkbox-group v-model="checkedAlbums" @change="handlecheckedAlbumsChange">
            <div style="margin-left: 100px;">
              <el-checkbox  v-for="(p,index) in photoAllList" :label="p" :key="index">
                <!--此处判断语句最好使用v-show 因为v-if在编辑器内报错 但是不影响结果-->
                <el-col :span="6">
                  <div class="fj_img">
                    <img :src="'/api'+p.thumbnail" width="150px" height="150px">
                  </div>
                  <div class="fj_date">
                    <p>{{p.contentdate.slice(0,10)}}-{{p.contentdate.slice(11,16)}}</p>
                  </div>
                  <div class="fj_title">
                    <h4>{{p.title}}</h4>
                  </div>
                </el-col>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </el-row>
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
</template>

<script>
  import {deleteContent, listContentByCategory} from "../../../api";

    export default {
        data(){
          return{
            totalNum:0,     //博客总条数
            pageSize:0,     //一页显示多少条数据
            pageNumber:0,       //代表第几页
            photoAllList:[],      //所有图片列表
            isIndeterminate: true,    //是否全选得到样式问题
            checkAll: false,      //是否全选得样式
            checkedAlbums: [],      //选中得数组
          }
        },
      mounted(){
        this.getPhotoList()
      },
      methods:{

        //删除相册列表的相关内容
        confirmDeletePhoto(){
          this.$confirm('此操作将永久删除这些日志, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then((action) => {
            if (action === 'confirm') {     //确认的回调
              let data =this.checkedAlbums.map(item=>({
                contentid:item.contentid
              }));
              deleteContent(data)
                .then(res=>{
                  console.log("相册列表的删除按钮已触发");
                  console.log(res);
                  this.checkedAlbums=[];
                  this.getPhotoList();
                })
                .catch(err=>{
                  console.log(err);
                });
              console.log(this.checkedAlbums);
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

        //分页得相关操作
        handleCurrentChange(val) {
          console.log(`当前页: ${val-1}`);
          this.pageNumber=`${val-1}`;
          console.log(this.pageNumber);
          this.getPhotoList()
        },

        //根据相册得二级分类得到该分类下得所有相片信息
        getPhotoList(){
          let data ={
            pagenum:this.pageNumber,
            categoryid:this.$route.query.CategoryID
          };
          listContentByCategory(data)
            .then(res=>{
              if (res.status===200){
                console.log("得到相册二级分类下得到10张图片信息");
                console.log(res);
                this.totalNum=res.object.totalElements;
                this.pageSize=res.object.size;
                this.photoAllList=res.object.content;
              } else {
                this.$notify({
                  title: '请求失败',
                  message: '内部服务器发生错误！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            })
        },

        handleCheckAllChange(val) {
          this.checkedAlbums = val ? this.photoAllList : [];
          this.isIndeterminate = false;
        },
        handlecheckedAlbumsChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.photoAllList.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.photoAllList.length;
        },
      }
    }
</script>

<style scoped>

</style>
