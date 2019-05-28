<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <b>添加相册</b>
      </div>
      <div class="panel-body">
        <el-form label-width="120px">
          <!--相片标题-->
          <el-form-item label="相片标题">
            <el-input v-model="albumTitle" placeholder="请输入相片标题"></el-input>
          </el-form-item>
          <!--相册分类-->
          <el-form-item label="相册分类">
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
          <!--上传图片-->
          <el-form-item label="上传图片:">
            <!--upload-->
            <!--图片上传-->
            <el-upload
              action=""
              accept="image/*"
              multiple
              class="avatar-uploader"
              list-type="picture-card"
              :limit="limitImage"
              :http-request="addAttachment">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!--点击按钮-->
          <el-form-item>
            <el-button @click="confirmAddUploadPhoto()" type="primary">上传图片</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {insertPhoto, listAllCategory} from "../../../api";

    export default {
        data(){
          return{
            albumTitle:"",    //相片标题
            classData:{         //选中的一级二级分类数据
              selectCategoryOne:"",     //选中的一级分类
              selectCategoryTwo:""      //选中的二级分类
            },
            listCategoryOne:[],        //一级分类数组
            listCategoryTwo:[],         //二级分类数组
            listCateTwoByCateOne:[],    //根据点击一级分类过滤出相应的二级分类
            imageUrl: "",           //图片路径
            limitImage: 50,         //限制上传多少张
            fileData: [],           //上传图片的数组
            loading:"",             //上传时防止用户操作
            switchComment:true,       //是否容许评论
          }
        },
      mounted(){
          this.getCategoryData();

      },
      methods:{
        // 自定义上传方法
        addAttachment(file) {
          console.log(file);
          // 用于显示图片
          this.imageURL = URL.createObjectURL(file.file);
          //保存一份文件信息，用于上传
          this.fileData.push(file.file);
          console.log(this.fileData);
        },
        //确认提交按钮
        confirmAddUploadPhoto(){
          this.$confirm('确认上传', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then((action) => {
            if (action === 'confirm') {     //确认的回调
              //确认回调时就要loading，在后台返回状态码为200或者上传失败时清除loading
              this.setTimer();
              this.addUpload();
            }
          }).catch((err) => {
            if (err === 'cancel') {
              this.$message({
                type: 'info',
                message: '取消上传',
                showClose:true
              });
            }
          });
        },
        //在上传图片之后有一定的反应时间
        setTimer() {
          this.loading = this.$loading({
            lock: true,
            text: '正在上传图片，请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        },
        // 上传数据
        addUpload() {
          var formData = new FormData();
          for (let i = 0; i < this.fileData.length; i++) {
            formData.append("file", this.fileData[i]);
          }
          formData.append("userid", localStorage.getItem("loginUser"));
          formData.append("title", this.albumTitle);
          formData.append("status", this.switchComment);
          formData.append("contenttype", "P");
          formData.append("categoryid", this.classData.selectCategoryTwo);
          console.log(formData);

          console.log("上传图片的点击事件已触发");
          console.log(this.fileData);
          // 上传方法接口
          insertPhoto(formData)
            .then(res => {
              if(res.status===200){
                // 图片上传成功，清除定时器
                this.loadingClose();
                this.$notify({
                  title: '图片上传',
                  message: '图片上传成功!',
                  type: 'success'
                });
                this.$router.push(`/${this.$route.params.id}`+'/personalCenter/allAlbumList')
              }
              console.log(formData);
              console.log('上传图片接口-数据成功。', res)
            })
            .catch(err => {
              console.log(err);
            })
        },
        //关闭loading
        loadingClose(){
          this.loading.close();
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
        //得到分类数据
        getCategoryData(){
          //为了得到分类的数据，准备数据
          let data={
            userid:this.$route.params.id,
            categorytype:"P"
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
        }
      }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
