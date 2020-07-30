<template>
<div class="login-box">
  <div class="login-logo">
    <a href="../../index2.html"><b>SmartBuy商城</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">请输入登录信息</p>

    <form action="userlogin.do" method="post">
      <div class="form-group has-feedback">
        <input type="text" class="form-control" required name="userid" placeholder="账号">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" name="password" required class="form-control" placeholder="密码">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <!-- /.col -->
        <div class="col-xs-12">
          <button type="submit" class="btn btn-primary btn-block btn-flat">登录</button>
        </div>
        <!-- /.col -->
      </div>
    </form>
    <!-- /.social-auth-links -->
    <a href="#" class="btn btn-info col-xs-6">忘记密码</a>
    <router-link to="/user/add" class="btn btn-default col-xs-6">注册用户</router-link>

  </div>
  <!-- /.login-box-body -->
</div>
</template>

<script>
	export default {
		name:"AdminLogin",
		data(){
			return {
				userid:"",
				password:""
			};
		}
	}
</script>

<style>
</style>
