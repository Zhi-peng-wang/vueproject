<template>
  <div class="container">
    <div>
      <el-row>
        <el-col :span="6"  v-for="(t,index) in albumCategory" :key="index"`>
            <ul>
              <li>
                <router-link :to="{path:`/${$route.params.id}`+'/album/albumClassList',query:{classid:t.classid}}">
                  <div class="fj_img">
                    <div>
                      <img :src="t.url" width="200px" height="200px">
                    </div>
                  </div>
                  <div class="fj_title">
                    <h4>{{t.classname}}
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
    export default {
      //数据体
      data(){
        return{
          albumCategory:[{classname:'das',num:9,classid:90909}],     //分类的数组
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
          console.log("得到相册的二级分类");
        }
      }
    }
</script>

<style scoped>

</style>
