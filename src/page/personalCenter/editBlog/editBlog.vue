<template>
    <div>
      <div class="panel panel-info">
        <div class="panel-heading" style="height: 40px">
          <b style="float: left;line-height: 40px">编辑日志</b>
          <el-button @click="resetBlog" style="float: right;margin-left: 15px">重置</el-button>
          <el-button type="primary" @click="confirmAddBlog" style="float: right">提交</el-button>
        </div>
        <div class="panel-body">
          <el-row>
            <el-form label-width="120px" >
              <!--日志标题相关内容-->
              <el-form-item label="日志标题">
                <el-input v-model="blogTitle"></el-input>
              </el-form-item>
              <!--日志类型相关内容-->
              <el-form-item label="日志类型">
                <el-select v-model="classData.selectCategoryOne" placeholder="请选择一级分类">
                  <el-option v-for="(c1,index) in listCategoryOne"
                             :value="c1.CategoryID"
                             :label="c1.CategoryName"
                             :key="index"
                             @click.native="sendCategoryOneId(c1.CategoryID)"
                  ></el-option>
                </el-select>

                <el-select v-model="classData.selectCategoryTwo" placeholder="请选择二级分类">
                  <el-option v-for="(c2,index) in listCateTwoByCateOne"
                             :value="c2.CategoryID" :label="c2.CategoryName" :key="index">
                  </el-option>
                </el-select>

              </el-form-item>
              <!--是否容许别人评论-->
              <el-form-item label="是否允许评论">
                <el-switch
                  style="display: block;line-height: 40px"
                  v-model="switchComment"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
              <!--日志内容相关内容-->
              <el-form-item label="日志内容" style="height: 380px">
                <quill-editor
                  v-model="editorContent"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
                </quill-editor>
              </el-form-item>
            </el-form>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
  import {editContent, getContentInfo} from "../../../api";

    export default {
      data(){
        return{
          blogTitle:"",   //日志标题
          classData:{         //选中的一级二级分类数据
            selectCategoryOne:"",     //选中的一级分类
            selectCategoryTwo:""      //选中的二级分类
          },
          listCategoryOne:[],        //一级分类数组
          listCategoryTwo:[],         //二级分类数组
          listCateTwoByCateOne:[],    //根据点击一级分类过滤出相应的二级分类
          editorContent:"",         //文本编辑器里面的内容
          editorOption:{},
          switchComment:true,       //是否容许评论
        }
      },
      mounted(){
        this.getEditBlog()
      },
      methods:{
        //得到需要编辑的日志
        getEditBlog(){
          let data={
            contentid:this.$route.query.contentid
          };
          console.log(data);
          getContentInfo(data)
            .then(res=>{
              console.log("编辑接口得到数据");
              console.log(res);

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
