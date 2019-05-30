<template>
  <div class="container">
    <div>
      <el-row>
        <el-col :span="6"  v-for="(t,index) in albumCategoryList" :key="index"`>
            <ul>
              <li>
                <router-link :to="{path:`/${$route.params.id}`+'/album/albumClassList',query:{classid:t.classid}}">
                  <div class="fj_img">
                    <div>
                      <img :src="'/api'+t.Remark" width="200px" height="200px">
                    </div>
                  </div>
                  <div class="fj_title">
                    <h4>{{t.CategoryName}}
                      (<el-badge :value="t.num" style="margin-top: 8px">
                      </el-badge>张)
                    </h4>
                  </div>
                </router-link>
              </li>
            </ul>
        </el-col>
      </el-row>
      <h1>这是相册页面</h1>
    </div>
  </div>
</template>

<script>
    import {listCategoryPhotoTwo} from "../../api";

    export default {
      //数据体
      data(){
        return{
          albumCategoryList:[],     //分类的数组
        }
      },
      //页面加载数据
      mounted(){
        //页面初始化调用方法
        this.getTwoCategoryAlbum();
      },
      //相关方法写在此地方
      methods:{
        //得到相册的二级分类
        getTwoCategoryAlbum(){
          let data={
            userid:this.$route.params.id
          };
          listCategoryPhotoTwo(data)
            .then(res=>{
              console.log(res);
              this.albumCategoryList=res.object;
              // this.albumCategory=res.object;
              // if (res.status===200){
              //   console.log("打印二级分类相册列表数据");
              //   console.log(res);
              //
              // }else {
              //   this.$notify({
              //     title: '请求失败',
              //     message: '内部服务器发生错误！',
              //     type: 'error'
              //   });
              // }
            })
            .catch(err=>{
              console.log(err);
            })
        }
      }
    }
</script>

<style scoped>

</style>
