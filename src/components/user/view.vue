<template>
<!-- Default box -->
<div class="box">
<div class="box-header with-border">
  <h3 class="box-title">账户详细信息</h3>
</div>
<div class="box-body">
	<form  method="post" >
	  <div class="form-group">
		<label for="exampleInputEmail1">ID:</label>
		<span>  
		{{user.id}}
		</span>
	  </div>
	  <div class="form-group">
		<label for="exampleInputPassword1">姓名:</label>
		<span> 
		{{user.name}}
		</span>
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputPassword1">性别:</label>
	  		<span> 
	  		{{user.sex}}
	  		</span>
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputPassword1">年龄:</label>
	  		<span> 
	  		{{user.age}}
	  		</span>
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputPassword1">邮箱:</label>
	  		<span> 
	  		{{user.email}}
	  		</span>
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputPassword1">电话:</label>
	  		<span> 
	  		{{user.phone}}
	  		</span>
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputPassword1">地址:</label>
	  		<span> 
	  		{{user.address}}
	  		</span>
	  </div>
	  <router-link v-bind:to="'/user/modify/'+user.no" class="btn btn-default">修改</router-link>
	  <router-link to="/user/list" class="btn btn-default">返回</router-link>
	</form>

</div>
<!-- /.box-body -->
</div>
<!-- /.box -->
</template>

<script>
	//部门查看组件
	import axios from "axios";
	export default {
		name:"UserView",
		data(){
			return {
				user:{
					id:"",
					name:"",
					password:"",
					sex:"",
					age:"",
					email:"",
					phone:"",
					address:"",
					no:0
				}
			};
		},
		created(){ //组件的创建生命周期函数
			let userNo=this.$route.params.no;
			this.getUser(userNo);
		},
		methods:{
			getUser(no){
				
				axios.get("http://localhost:8080/user/get?no="+no).then(result=>{
					this.user=result.data.result;
				});
			},
		}
	}
</script>

<style>
</style>

