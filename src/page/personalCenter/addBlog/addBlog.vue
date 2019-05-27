<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading" style="height: 40px">
        <b style="float: left;line-height: 40px">添加日志</b>
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
                           :value="c2.CategoryID" :label="c2.CategoryName" :key="index"></el-option>
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
  import {insertContent, listAllCategory} from "../../../api";

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
        this.getOneAndTwoCategory();
      },
      methods:{
        //得到一二级分类的接口
        getOneAndTwoCategory(){
          //为了得到分类的数据，准备数据
          let data={
            userid:this.$route.params.id,
            categorytype:"B"
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
                if (item.Depth===1){
                  return this.listCategoryOne.push(item)
                }
              });
              //准备二级分类的数据
              result.map(item => {
                if (item.Depth === 2) {
                  return this.listCategoryTwo.push(item)
                }
              });
            })
            .catch(err=>{
              console.log(err);
            })
        },
        //点击一级分类获取相应的二级分类
        sendCategoryOneId(categoryId){
          console.log("一级分类事件被点击");
          //首先将数组清空，防止之前的数据存在
          this.listCateTwoByCateOne=[];
          this.listCategoryTwo.find(item=>{
            for (let i=0;i<this.listCategoryTwo.length;i++){
              //此处将上方的categoryId拿过来做对比得到相对应的id
              if(categoryId===item.ParentID){
                if (!~this.listCateTwoByCateOne.indexOf(item)) {
                  this.listCateTwoByCateOne.push(item)
                }
              }
            }
          });
          console.log(this.listCateTwoByCateOne);
        },
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(){//内容改变事件
        },
        //确认提交事件
        confirmAddBlog(){
          this.$confirm('确认提交', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then((action) => {
            if (action === 'confirm') {     //确认的回调
              this.addBlog();
            }
          }).catch((err) => {
            if (err === 'cancel') {
              this.$message({
                type: 'info',
                message: '取消添加',
                showClose:true
              });
            }
          });
        },
        //提交函数，调用接口
        addBlog(){
          let data={
            categoryid:this.classData.selectCategoryTwo,
            contenttype:"B",
            userid:this.$route.params.id,
            title:this.blogTitle,
            content:this.editorContent,
            status:this.switchComment
          };
          console.log(data);
          insertContent(data)
            .then(res=>{
              console.log("提交的日志");
              console.log(res);
              if(res.status===200){
                this.$notify({
                  title: '添加日志',
                  message: '添加日志成功',
                  type: 'success'
                });
                // 写一个函数，用来检测是否继续添加，还是返回日志列表界面
                this.isAddStatus();
              } else {
                this.$notify.error({
                  title: '添加日志',
                  message: '所填写内容不能为空！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            })
        },
        //提交成功之后是否继续提交还是返回日志列表
        isAddStatus(){
          this.$confirm('添加成功，选择下一步操作', '提示', {
            confirmButtonText: '返回日志列表',
            cancelButtonText: '继续添加',
            type: 'success',
            center: true
          }).then((action) => {
            if (action === 'confirm') {     //确认的回调
              this.$message({
                type: 'success',
                message: '返回日志列表',
                showClose:true
              });
              //跳转
              this.$router.push(`/${this.$route.params.id}/personalCenter/allBlogList`);
            }
          }).catch((err) => {
            if (err === 'cancel') {
              this.$message({
                type: 'success',
                message: '继续添加',
                showClose:true
              });
              this.resetBlog()
            }
          });
        },
        //重置按钮事件被触发
        resetBlog(){
          console.log("重置的按钮事件被触发");
          this.blogTitle="";
          this.classData.selectCategoryOne="";
          this.classData.selectCategoryTwo="";
          this.editorContent="";
        }
      }
    }
</script>

<style scoped>
  .quill-editor {
    height: 300px;
  }
</style>
