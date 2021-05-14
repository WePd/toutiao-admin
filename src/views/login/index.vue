<template>
    <div class="login-container">
        <el-form class="login-form" ref="form" :model="user" >
					<el-form-item >
						<el-input v-model="user.num" placeholder="请输入电话号码"></el-input>
					</el-form-item>
					<el-form-item >
						<el-input v-model="user.code" placeholder="请输入验证码"></el-input>
					</el-form-item>
					<el-form-item >
						<el-checkbox v-model="checked">我已同意用户条约和隐私协议</el-checkbox>
					</el-form-item>
					<el-form-item>
						<el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
					</el-form-item>
			</el-form>
    </div>
</template>

<script>
import request from '@/utils/request'
    export default{
        name:'LoginIndex',
        data(){
            return {
              user: {
								num: '',//手机号
								code: ''//验证码
        			},
							 checked: false
						}
          },
				methods: {
      		onSubmit() {
        		const user = this.user;
						//验证表单

						//验证通过， 提交登录
						request({
							method: 'POST',
							url: '/mp/v1_0/authorizations',
							data: user
						}).then( res => {
							console.log(res)
						})

      }
		}
  }
</script>
<style scoped lang="less">
.login-container{ 
	position: fixed;
	left: 0;
	right:0;
	top: 0;
	bottom:0;
	display: flex;
	justify-content: center; //水平居中
	align-items: center; // 垂直居中
	background: url("./login_bg.jpg") no-repeat;
	background-size: cover;
	.login-form{
		background-color: #fff;
		padding: 50px;
		min-width: 300px;
		.login-btn{
			width: 100%
		}
	}
}
</style>