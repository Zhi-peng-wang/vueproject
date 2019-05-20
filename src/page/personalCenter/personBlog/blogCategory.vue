<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <b>日志类别</b>
      </div>
      <div class="panel-body">
        <el-row :gutter="50">
          <!--一级栏目-->
          <el-col :span="12">
            <label>一级栏目：</label><br>
            <select multiple class="selectOption">
              <option v-for="(b1,index) in listCategoryOne" :key="index"
                      @click="sendCategoryOneId([b1.CategoryID,b1.OrderCategory,b1.CategoryName,b1])">
                {{index+1}}:{{b1.CategoryName}}
              </option>
            </select>
            <el-form :model="categoryOne" :rules="rules" ref="categoryOne"
                     label-width="100px" class="demo-ruleForm">
              <el-form-item label="栏目排序" prop="OrderCategoryOne">
                <el-input type="text" v-model.trim="categoryOne.OrderCategoryOne" autofocus="autofocus"></el-input>
              </el-form-item>
              <el-form-item label="栏目名称" prop="CategoryOneName">
                <el-input type="text" v-model.trim="categoryOne.CategoryOneName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="confirmCategoryOne('categoryOne')"
                           style="margin-left: -70px">添加</el-button>
                <el-button type="warning" @click="confirmEditCategoryOne('categoryOne')">编辑</el-button>
                <el-button type="danger" @click="confirmDeleteCategoryOne('categoryOne')">删除</el-button>
                <el-button type="danger" @click="resetCategoryOne()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>

          <!--二级栏目-->
          <el-col :span="12">
            <label>二级栏目：</label><br>
            <select multiple class="selectOption">
              <option v-for="(b2,index) in listCateTwoByCateOne" :key="index"
                      @click="sendCategoryTwoId([b2.CategoryID,b2.OrderCategory,b2.CategoryName])">
                {{index+1}}:{{b2.CategoryName}}
              </option>
            </select>
            <el-form :model="categoryTwo" :rules="rules" ref="categoryTwo" label-width="100px" class="demo-ruleForm">
              <el-form-item label="栏目排序" prop="OrderCategoryTwo">
                <el-input v-model.trim="categoryTwo.OrderCategoryTwo"></el-input>
              </el-form-item>
              <el-form-item label="栏目名称" prop="CategoryTwoName">
                <el-input v-model.trim="categoryTwo.CategoryTwoName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="confirmCategoryTwo('categoryTwo')"
                           style="margin-left: -70px">添加</el-button>
                <el-button type="warning" @click="confirmEditCategoryTwo('categoryTwo')">编辑</el-button>
                <el-button type="danger" @click="confirmDeleteCategoryTwo('categoryTwo')">删除</el-button>
                <el-button type="danger" @click="resetCategoryTwo()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {insertCategory, listAllCategory} from "../../../api";
    export default {
      inject: ['reload'],
      data(){
          return{
            listCategoryOne:[],        //一级分类数组
            listCategoryTwo:[],         //二级分类数组
            listCateTwoByCateOne:[],    //根据点击一级分类过滤出相应的二级分类
            categoryOne: {
              OrderCategoryOne:"",
              CategoryOneName:"",
            },
            categoryTwo: {
              OrderCategoryTwo:"",
              CategoryTwoName:"",
            },
            rules:{
              OrderCategoryOne:[
                { required: true, message: '必填项', trigger: 'blur' },
                {pattern:/^(([1-9]\d?)|100)$/,message:'数字1-99',trigger: 'blur'},
              ],
              CategoryOneName:[
                { required: true, message: '必填项', trigger: 'blur' },
                { min: 1, max: 10, message: '1-10个字符', trigger: 'blur' },
              ],
              OrderCategoryTwo:[
                { required: true, message: '必填项', trigger: 'blur' },
                {pattern:/^(([1-9]\d?)|100)$/,message:'数字1-99',trigger: 'blur'},
              ],
              CategoryTwoName:[
                { required: true, message: '必填项', trigger: 'blur' },
                { min: 1, max: 10, message: '1-10个字符', trigger: 'blur' },
              ]
            }
          }
        },
      mounted(){
        this.categoryOne.OrderCategoryOne=sessionStorage.getItem("sOrderCategoryOne");
        this.categoryOne.CategoryOneName=sessionStorage.getItem("sAclassName");
        this.blogClassAId=sessionStorage.getItem("sAclassId");

        this.categoryTwo.OrderCategoryTwo=sessionStorage.getItem("sOrderCategoryTwo");
        this.categoryTwo.CategoryTwoName=sessionStorage.getItem("sBclassName");
        this.blogClassBId=sessionStorage.getItem("sBclassId");

        //为了得到分类的数据，准备数据
        let data={
          userid:this.$route.params.id,
          categorytype:"1"
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
              if (item.Depth===1&&item.ParentID==="0"){
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
      methods:{
        // 一级栏目添加弹框
        confirmCategoryOne(categoryOne){
          this.$refs[categoryOne].validate((valid) => {
            if (valid) {
              this.$confirm('确认添加?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true
              }).then((action) => {
                if (action==='confirm'){    //成功的回调
                  this.addCategoryOne();
                }
              }).catch((err) => {
                if (err==='cancel'){       //失败的回调
                  this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消添加'
                  });
                }
              });
            } else {
              this.$alert('所填内容不符合规范', '网页消息', {
                confirmButtonText: '确定',
                type:"error",
                center:"true",
                callback: action => {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `提示: ${ '所填内容不符合规范,请认真填写' }`
                  });
                }
              });
              return false;
            }
          });
        },
        // 一级栏目添加点击事件
        addCategoryOne(){
          console.log("一级栏目的点击事件");
          let data={
            userid: localStorage.getItem("loginUser"),
            categoryname:this.categoryOne.CategoryOneName,
            parentid:"1",
            ordercategory:this.categoryOne.OrderCategoryOne,
            depth:"1",
            categorytype:"B"
          };
          console.log(data);
          insertCategory(data)
            .then(res=>{
              console.log(res);
              if (true){
                sessionStorage.setItem("sOrderCategoryOne", this.categoryOne.OrderCategoryOne);
                sessionStorage.setItem("sAclassName", this.categoryOne.CategoryOneName);
                this.$message({
                  showClose: true,
                  message: '添加成功！',
                  type: 'success'
                });
                this.reload();
              }
              if (res.status==400){
                this.$message({
                  showClose: true,
                  message: '一级分类名称已存在，请重新添加！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            });
        },
        // 二级栏目添加弹框
        confirmCategoryTwo(categoryTwo) {
          this.$refs[categoryTwo].validate((valid) => {
            if (valid) {
              this.$confirm('确认添加?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true
              }).then((action) => {
                if (action==='confirm'){    //成功的回调
                  this.addCategoryTwo();
                }
              }).catch((err) => {
                if (err==='cancel'){       //失败的回调
                  this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消添加'
                  });
                }
              });
            } else {
              this.$alert('所填内容不符合规范', '网页消息', {
                confirmButtonText: '确定',
                type:"error",
                center:"true",
                callback: action => {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `提示: ${ '所填内容不符合规范,请认真填写' }`
                  });
                }
              });
              return false;
            }
          });
        },
        // 二级栏目添加点击事件
        addCategoryTwo(){
          console.log("二级栏目的点击事件");
          let data={
            userid: localStorage.getItem("loginUser"),
            classname:this.categoryTwo.CategoryTwoName,
            parentid:this.blogClassAId,
            orderclass:this.categoryTwo.OrderCategoryTwo,
            depth:"2",
            url:this.categoryTwo.CategoryTwoName,
            typeid:"1"
          };
          console.log(data);
          addClass(data)
            .then(res=>{
              console.log(res);
              if (res.status==200){
                sessionStorage.setItem("sOrderCategoryTwo", this.categoryTwo.OrderCategoryTwo);
                sessionStorage.setItem("sBclassName", this.categoryTwo.CategoryTwoName);
                this.$message({
                  showClose: true,
                  message: '添加成功！',
                  type: 'success'
                });
                this.reload();
              }
              if (res.status==400){
                this.$message({
                  showClose: true,
                  message: '二级分类名称已存在，请重新添加！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            });
        },
        sendCategoryOneId([categoryId,OrderCategoryOne,className,obj]){
          console.log("一级分类被点击"+classid);
          console.log(obj);
          this.selectedOption=obj;
          this.categoryTwo.OrderCategoryTwo="";
          this.categoryTwo.CategoryTwoName="";
          //使用session存储
          sessionStorage.setItem("sOrderCategoryOne", OrderCategoryOne);
          this.categoryOne.OrderCategoryOne=sessionStorage.getItem("sOrderCategoryOne");

          sessionStorage.setItem("sAclassName", className);
          this.categoryOne.CategoryOneName=sessionStorage.getItem("sAclassName");

          sessionStorage.setItem("sAclassId", classid);
          this.blogClassAId=sessionStorage.getItem("sAclassId");

          sessionStorage.setItem("sAobj", obj);
          this.selectedOption=sessionStorage.getItem("sAobj");
          // sessionStorage.setItem("sOrderCategoryTwo", "");
          // sessionStorage.setItem("sBclassName", "");
          // sessionStorage.setItem("sBclassId", "");
          this.blog_url_2_2=[];
          this.blog_url_2.find(item=>{
            for (let i=0;i<this.blog_url_2.length;i++){
              if(classid===item.parentid){
                if (!~this.blog_url_2_2.indexOf(item)) {
                  this.blog_url_2_2.push(item)
                }
              }
            }
          });
          console.log(this.blog_url_2_2);
          // this.reload()
        },
        sendCategoryTwoId([categoryId,OrderCategoryTwo,className]){
          console.log("二级分类被点击"+classid);
          this.blogClassBId=classid;
          this.categoryTwo.OrderCategoryTwo=OrderCategoryTwo;
          this.categoryTwo.CategoryTwoName=className;

          //使用session存储
          sessionStorage.setItem("sOrderCategoryTwo", OrderCategoryTwo);
          this.categoryTwo.OrderCategoryTwo=sessionStorage.getItem("sOrderCategoryTwo");
          sessionStorage.setItem("sBclassName", className);
          this.categoryTwo.CategoryTwoName=sessionStorage.getItem("sBclassName");
          sessionStorage.setItem("sBclassId", classid);
          this.blogClassBId=sessionStorage.getItem("sBclassId");

          // sessionStorage.setItem("sBobj", obj);
          // this.selectedOption=sessionStorage.getItem("sBobj");
        },
        // 一级栏目删除弹框
        confirmDeleteCategoryOne(categoryOne){
          this.$refs[categoryOne].validate((valid) => {
            if (valid) {
              this.$confirm('您将删除该分类，确定继续吗？', '删除分类', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true
              }).then((action) => {
                if (action==='confirm'){    //成功的回调
                  this.deleteCategoryOne();
                }
              }).catch((err) => {
                if (err==='cancel'){       //失败的回调
                  this.$message({
                    type: 'info',
                    message: '取消删除',
                    showClose: true,
                  });
                }
              });
            } else {
              this.$alert('并未选择将要删除的数据', '网页消息', {
                confirmButtonText: '确定',
                type:"error",
                center:"true",
                callback: action => {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `提示: ${ '并未选择将要删除的数据' }`
                  });
                }
              });
              return false;
            }
          });

        },
        // 一级栏目删除点击事件
        deleteCategoryOne(){
          deleteClass({classid:this.blogClassAId})
            .then(res=>{
              console.log("一级分类删除按钮被点击");
              console.log(res);
              if (res.status==200){
                sessionStorage.setItem("sOrderCategoryOne", "");
                sessionStorage.setItem("sAclassName", "");
                sessionStorage.setItem("sAclassId", "");
                this.$message({
                  showClose: true,
                  message: '删除成功！',
                  type: 'success'
                });
                this.reload();
              }
              if (res.status==400){
                this.$message({
                  showClose: true,
                  message: '存在二级分类无法删除,请先删除二级分类！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            });
        },
        // 二级栏目删除弹框
        confirmDeleteCategoryTwo(categoryTwo){
          this.$refs[categoryTwo].validate((valid) => {
            if (valid) {
              this.$confirm('您将删除该分类，确定继续吗？', '删除分类', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true
              }).then((action) => {
                if (action==='confirm'){    //成功的回调
                  this.deleteCategoryTwo();
                }
              }).catch((err) => {
                if (err==='cancel'){       //失败的回调
                  this.$message({
                    type: 'info',
                    message: '取消删除',
                    showClose: true,
                  });
                }
              });
            } else {
              this.$alert('并未选择将要删除的数据', '网页消息', {
                confirmButtonText: '确定',
                type:"error",
                center:"true",
                callback: action => {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `提示: ${ '并未选择将要删除的数据' }`
                  });
                }
              });
              return false;
            }
          });
        },
        // 二级栏目删除点击事件
        deleteCategoryTwo(){
          console.log("二级分类删除按钮被点击");
          deleteClass({classid:this.blogClassBId})
            .then(res=>{
              console.log(res);
              if (res.status==200){
                sessionStorage.setItem("sOrderCategoryTwo", "");
                sessionStorage.setItem("sBclassName", "");
                sessionStorage.setItem("sBclassId", "");
                this.$message({
                  showClose: true,
                  message: '删除成功！',
                  type: 'success'
                });
                this.reload();
              }
              if (res.status==400){
                this.$message({
                  showClose: true,
                  message: '二级分类下有日志,请先删除日志！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            });
        },
        // 一级栏目编辑弹框
        confirmEditCategoryOne(categoryOne){
          this.$refs[categoryOne].validate((valid) => {
            if (valid) {
              this.$confirm('确认编辑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true
              }).then((action) => {
                if (action==='confirm'){    //成功的回调
                  this.editCategoryOne()
                }
              }).catch((err) => {
                if (err==='cancel'){       //失败的回调
                  this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消编辑'
                  });
                }
              });
            } else {
              this.$alert('所填内容不符合规范', '网页消息', {
                confirmButtonText: '确定',
                type:"error",
                center:"true",
                callback: action => {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `提示: ${ '所填内容不符合规范,请认真填写' }`
                  });
                }
              });
              return false;
            }
          });
        },
        // 一级栏目编辑点击事件
        editCategoryOne(){
          let data={
            classid:this.blogClassAId,
            orderclass:this.categoryOne.OrderCategoryOne,
            classname:this.categoryOne.CategoryOneName
          };
          editClass(data)
            .then(res=>{
              console.log(res);
              if (res.status==200){
                this.$message({
                  showClose: true,
                  message: '编辑成功！',
                  type: 'success'
                });
                sessionStorage.setItem("sOrderCategoryOne", this.categoryOne.OrderCategoryOne);
                this.categoryOne.OrderCategoryOne=sessionStorage.getItem("sOrderCategoryOne");

                sessionStorage.setItem("sAclassName",this.categoryOne.CategoryOneName);
                this.categoryOne.CategoryOneName=sessionStorage.getItem("sAclassName");

                sessionStorage.setItem("sAclassId", this.blogClassAId);
                this.blogClassAId=sessionStorage.getItem("sAclassId");

                sessionStorage.setItem("sAobj", this.selectedOption);
                this.selectedOption=sessionStorage.getItem("sAobj");
                this.reload()
              }
              if (res.status==400){
                this.$message({
                  showClose: true,
                  message: '一级分类名称已存在！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            });

        },
        // 二级栏目添加弹框
        confirmEditCategoryTwo(categoryTwo){
          this.$refs[categoryTwo].validate((valid) => {
            if (valid) {
              this.$confirm('确认编辑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true
              }).then((action) => {
                if (action==='confirm'){    //成功的回调
                  this.editCategoryTwo()
                }
              }).catch((err) => {
                if (err==='cancel'){       //失败的回调
                  this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消编辑'
                  });
                }
              });
            } else {
              this.$alert('所填内容不符合规范', '网页消息', {
                confirmButtonText: '确定',
                type:"error",
                center:"true",
                callback: action => {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `提示: ${ '所填内容不符合规范,请认真填写' }`
                  });
                }
              });
              return false;
            }
          });
        },
        // 二级栏目编辑点击事件
        editCategoryTwo(){
          let data={
            classid:this.blogClassBId,
            orderclass:this.categoryTwo.OrderCategoryTwo,
            classname:this.categoryTwo.CategoryTwoName
          };
          editClass(data)
            .then(res=>{
              console.log(res);
              if (res.status==200){
                this.$message({
                  showClose: true,
                  message: '编辑成功！',
                  type: 'success'
                });
                sessionStorage.setItem("sOrderCategoryTwo", this.categoryTwo.OrderCategoryTwo);
                this.categoryTwo.OrderCategoryTwo=sessionStorage.getItem("sOrderCategoryTwo");

                sessionStorage.setItem("sBclassName",this.categoryTwo.CategoryTwoName);
                this.categoryTwo.CategoryTwoName=sessionStorage.getItem("sBclassName");

                sessionStorage.setItem("sBclassId", this.blogClassBId);
                this.blogClassBId=sessionStorage.getItem("sBclassId");

                sessionStorage.setItem("sBobj", this.selectedOption);
                this.selectedOption=sessionStorage.getItem("sBobj");
                this.reload()
              }
              if (res.status==400){
                this.$message({
                  showClose: true,
                  message: '二级分类名称已存在！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            });
        },
        resetCategoryOne(){
          this.categoryOne.OrderCategoryOne="";
          this.categoryOne.CategoryOneName=""
        },
        resetCategoryTwo(){
          this.categoryTwo.OrderCategoryTwo="";
          this.categoryTwo.CategoryTwoName=""
        },
      }
    }
</script>

<style scoped>
  .selectOption{
    height: 120px;
    width: 100%;
    margin:15px 0
  }
</style>
