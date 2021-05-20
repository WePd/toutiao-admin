<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="user" :rules="rules">
      <el-form-item prop="num">
        <el-input v-model="user.mobile" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="user.isagree">我已同意用户条约和隐私协议</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: '13911111111', //手机号
        code: "246810", //验证码
        isagree: false,
      },
      rules: {
        mobile: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      loginLoading: false,
    };
  },
  methods: {
    onSubmit() {
      //验证表单
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      //开启登录等待
      (this.loginLoading = true),
        //验证通过， 提交登录
        request({
          method: 'POST',
          url: "/app/v1_0/authorizations",
          // data 用来设置 POST 请求体
          data: this.user,
        }).then((res) => {
            this.$message({
              message: "恭喜你，登录成功",
              type: "success",
            });
            this.loginLoading = false;

            //将接口返回的用户数据放到本地存储，方便读取
            // 本地用户只能存储字符串，如果需要存储数组、对象等则需要把他们转为JSON
            window.localStorage.setItem("user", JSON.stringify(res.data.data));

            //登录成功跳转到主页
            this.$router.push("/");
            // 登录成功
          }).catch((err) => {
            console.log("登录失败", err);
            // 登录失败
            this.$message.error("手机或密码错误");
          });
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center; //水平居中
  align-items: center; // 垂直居中
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form {
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>