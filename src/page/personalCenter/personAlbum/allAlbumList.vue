<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <b>相册列表</b>
      </div>
      <div class="panel-body">
        <el-row>
          <el-col :span="6" v-for="(t,index) in albumList" :key="index">
            <ul>
              <li>
                <div @click="confirmDeletePhotoClass(t.classid)" style="cursor: pointer">
                  <img src="../../../assets/homePage/delete.png" alt="down" class="down" >
                </div>
                <router-link :to="{path:`/${$route.params.id}`+'/personalCenter/albumCategoryList',query:{CategoryID:t.CategoryID}}">
                  <div class="fj_img">
                    <div style="width: 150px;height: 130px">
                      <!--拼接地址-->
                      <img :src="'/api'+t.Remark" width="100%" height="130px">
                    </div>
                  </div>
                  <div class="fj_title">
                    <h4>{{t.CategoryName}}
                      ({{t.num}}张)
                    </h4>
                  </div>
                </router-link>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
    import {listCategoryPhotoTwo} from "../../../api";

    export default {
      data(){
        return{
          albumList:[],       //二级分类得相册列表
        }
      },
      mounted() {
        this.getCategoryTwoPhoto()
      },
      methods:{
        //得到全部得二级相册数据
        getCategoryTwoPhoto(){
          let data={
            userid:this.$route.params.id
          };
          listCategoryPhotoTwo(data)
            .then(res=>{
              if (res.status===200){
                console.log("打印个人中心里面的二级分类相册列表数据");
                console.log(res);
                this.albumList=res.object;
              }else {
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
        }
      }
    }
</script>

<style scoped>
  *{
    color: black;
  }
  .down{
    width: 20px;
    height: 20px;
    opacity: 0.7;
    float: right;
    margin: -8px 0px 0 0;
  }
  li {
    list-style: none;
    border: 1px solid #d4d4d4;
    padding-top: 10px;
  }
  .fj_img div{
    margin: 0 auto;
  }
  .fj_title h4 {
    text-align: center;
    margin: 15px 0;
    font-weight: 600;
    opacity: 0.7;
  }
  .fj_content p {
    margin: 15px;
    font-size: 15px;
    opacity: 0.7;
  }
  a {
    text-decoration: none;
  }
</style>
