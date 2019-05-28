<template>
  <div :style="note" class="note">
    <div class="reg">
      <div class="headTitle">
        注册页面
      </div>
      <el-form :model="regInfo" status-icon :rules="rules2"
               ref="regInfo" label-width="100px"
               class="demo-ruleForm" style="margin-right: 60px">
        <el-form-item label="邮箱" prop="name">
          <el-input v-model.trim="regInfo.name" placeholder="请输入您的邮箱" autofocus="autofocus"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model.trim="regInfo.pass" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.trim="regInfo.checkPass" placeholder="请再次输入您的密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="regInfo.sex" placeholder="请选择您的性别" style="width: 250px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网名" prop="nickname">
          <el-input v-model.trim="regInfo.nickname" auto-complete="off" placeholder="请输入您的网名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('regInfo')"
                     :disabled="regInfo.name.length===0||regInfo.pass.length===0||regInfo.checkPass.length===0||regInfo.sex.length===0||regInfo.nickname.length===0">
            注册
          </el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      //此处用来校验俩次输入的密码是否相同
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.regInfo.checkPass !== '') {
            this.$refs.regInfo.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regInfo.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        regInfo: {
          name: "",
          pass: "",
          checkPass: "",
          sex: "",
          nickname: "",
        },
        rules2: {
          pass: [
            {validator: validatePass, required: true, trigger: 'blur'},
            {min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur'},
            {
              pattern: /^[a-z]*\d*[a-z]+\d+[a-z]*\d*$/i || /^[a-z]*\d*\d+[a-z]+[a-z]*\d*$/,
              message: '密码不能为纯数字或纯英文',
              trigger: 'blur'
            },
          ],
          checkPass: [
            {validator: validatePass2, required: true, trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'},
            {
              pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
              message: '邮箱格式不正确，请重新输入！',
              trigger: 'blur'
            }
          ],
          nickname: [
            {required: true, message: '请输入您的网名', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在1到12个字符', trigger: 'blur'},
          ],
        },
        note: {
          backgroundImage: "url(" + require("../assets/signUp.jpeg") + ")",
          backgroundRepeat: "no-repeat",
        },
      }
    },

    methods: {
      //点击注册按钮触发方法
      submitForm(regInfo) {
        this.$refs[regInfo].validate((valid) => {
          //注册信息有效，执行下方的方法
          if (valid) {
            //准备数据
            let data = {
              username: this.regInfo.name,
              password: this.regInfo.pass,
              sex: "男",
              nickname: this.regInfo.nickname
            };
            console.log(data);
            console.log("下面执行注册接口");
            //执行接口
            axios.post("/api/registerUser", data)
              .then(res => {
                console.log(res.data);
                if (res.data.status===200){
                  this.$confirm('注册成功', '网页信息', {
                    confirmButtonText: '去登录',
                    cancelButtonText: '继续注册',
                    type:"success",
                    center:true,
                  }).then(() => {
                    this.$message({
                      type: 'success',
                      message: '欢迎您的到来!'
                    });
                    //跳转到登录页并刷新
                    location.href = "/"
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '继续注册'
                    });
                  });
                }
              }).catch(error => {
              console.log(error);
            });
          } else {
            //注册信息无效时触发的方法
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
    }
  }
</script>

<style scoped>
  .reg {
    position: fixed;
    border-radius: 5px;
    width: 410px;
    height: 480px;
    margin: 120px 0 0 550px;
    background: rgba(226, 235, 237, .3);
  }
  button {
    font-size: 14px;
    background: #acb4b5;
    width: 220px;
    height: 35px;
    margin: 0;
    font-weight: bold;
    border-radius: 2px;
    text-indent: 10px;
    border: 1px solid #cceff5;
    color: white;
  }
  label {
    font-size: 15px;
    float: left;
    margin: 30px 0 0 0;
    border: 1px solid #cceff5;
    color: white;
    width: 40px;
    height: 30px;
  }
  .headTitle {
    color: white;
    font-size: 27px;
    margin: 30px 0 20px 160px;
  }
  .note {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
