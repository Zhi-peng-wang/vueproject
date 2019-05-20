<template>
    <div>
      <!--头像-->
      <headPortrait></headPortrait>
      <!--个人信息-->
      <div class="panel panel-info">
        <div class="panel-heading">
          <b>个人资料</b>
        </div>
        <div class="panel-body">
          <el-form :model="personData"
                   status-icon
                   :rules="rules"
                   ref="personData"
                   label-width="100px"
                   class="demo-personData">
            <!-- 用户名-->
            <el-form-item label="用户名" prop="username">
              <el-input v-model.trim="personData.username"></el-input>
            </el-form-item>
            <!--昵称-->
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model.trim="personData.nickname"></el-input>
            </el-form-item>
            <!--个签-->
            <el-form-item label="个签" prop="sign">
              <el-input v-model.trim="personData.sign"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="personData.sex" placeholder="男">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <!--年龄-->
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number.trim="personData.age"></el-input>
            </el-form-item>
            <!--电话-->
            <el-form-item label="电话" prop="Tel">
              <el-input v-model.trim="personData.Tel"></el-input>
            </el-form-item>
            <!--邮箱-->
            <el-form-item  label="邮箱" prop="email">
              <el-input v-model.trim="personData.email"></el-input>
            </el-form-item>
            <!--生日-->
            <el-form-item  label="生日" prop="birth">
              <el-date-picker type="date" placeholder="选择日期" v-model="personData.birth" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <!--地址-->
            <el-form-item  label="地址" prop="address">
              <el-input v-model.trim="personData.address"></el-input>
            </el-form-item>
            <!--提交-->
            <el-form-item>
              <el-button type="primary" @click="submitForm('personData')">立即创建</el-button>
              <el-button @click="resetForm('personData')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  import headPortrait from '../headPortrait/headPortrait'
    export default {
      components:{
        headPortrait
      },
      data(){
        return{
          personData: {
            username: "",
            userimg:"",
            nickname: "",
            sign:"",
            sex: "",
            age: "",
            Tel: "",
            email: "",
            birth: "",
            address: "",
            imageUrl: "",
          },
          rules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符，允许有特殊字符及下划线，禁止纯数字或纯英文', trigger: 'blur' },
              {pattern:/^[a-z]*\d*[a-z]+\d+[a-z]*\d*$/i || /`[a-z]*\d*\d+[a-z]+[a-z]*\d*$/,message:'只允许字母+数字，数字不能在前',trigger: 'blur'},
            ],
            nickname: [
              { required: true, message: '请输入昵称', trigger: 'blur' },
              { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' },
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            email:[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            age: [
              { required: true, message: '请输入年龄', trigger: 'blur' },
              {pattern:/^((1[0-5])|[1-9])?\d$/,message:'请正确输入年龄',trigger: 'blur'},
            ],
            sign: [
              { required: true, message: '请输入个性签名', trigger: 'blur' },
              { min: 6, max: 12, message: '长度在 6 到 12 个字符',trigger: 'blur' }
            ],
            birth: [
              { required: true, message: '请输入生日', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入详细地址', trigger: 'blur' },
            ],
            Tel: [
              { required: true, message: '请输入正确的电话号码', trigger: 'blur' },
              {pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9|]|19[0|1|2|3|5|6|7|8|9])\d{8}$/,message:'请输入正确的电话号码',trigger: 'blur'},
            ],
          }
        }
      },
      methods:{
        // 提交+重置 按钮
        submitForm(formName) {
          // console.log(data);
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm('确认上传', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then((action) => {
                if (action === 'confirm') {     //确认的回调
                  //  确认的方法执行
                  this.changeUerrInfo()
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
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        changeUerrInfo(){
          console.log("修改个人信息事件触发");
          let data={
            userid:this.$route.params.id,
            username:this.personData.username,
            nickname:this.personData.nickname,
            sign:this.personData.sign,
            sex:this.personData.sex,
            age:this.personData.age,
            phone:this.personData.Tel,
            email:this.personData.email,
            birthday:this.personData.birth,
            address:this.personData.address,
          };
          addEdit(data)
            .then(res=>{
              console.log(res);
            })
            .catch(err=>{
              console.log(err);
            })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      }
    }
</script>

<style scoped>

</style>
