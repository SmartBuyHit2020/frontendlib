<template>
	<div class="box">
		<div class="box-header with-border">
		  <h3 class="box-title">账户管理</h3>	          
		</div>
		<div v-if="this.$store.getters.loginuser.id=='admin'" class="box-body">
			<table class="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">编号</th>
				  <th scope="col">账号</th>
				  <th scope="col">姓名</th>
				  <th scope="col">操作</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="dm in userList" v-bind:key="dm.no">
				  <td>{{dm.no}}</td>
				  <td>{{dm.id}}</td>
				  <td>{{dm.name}}</td>
					<td>
					  <router-link v-bind:to="'/user/view/'+dm.no" class="btn btn-default">查看详细信息</router-link>
					  <a href="#" v-on:click="deleteUser(dm.no)"  class="btn btn-danger">删除</a> 
					   <router-link v-bind:to="'/user/modify/'+dm.no" class="btn btn-info">修改</router-link>
					</td>
				</tr>
			  </tbody>
			</table>
			<div class="row">
				<div class="col-md-6">
				个数:<span>{{count}}</span>	页数:<span>{{page}}</span>/<span>{{pageCount}}</span>
				</div>
				<div class="col-md-6 text-right">
					<nav>
					  <ul class="pagination justify-content-end">
						<li class="page-item"><a class="page-link" href="#" v-on:click="toFirstPage()">首页</a></li>
						<li class="page-item"><a class="page-link" href="#" v-on:click="toPreviousPage()">上页</a></li>
						<li class="page-item"><a class="page-link" href="#" v-on:click="toNextPage()">下页</a></li>
						<li class="page-item"><a class="page-link" href="#" v-on:click="toLastPage()">末页</a></li>
					  </ul>
					</nav>
				</div>
				<router-link to="/user/add" class="btn btn-default col-xs-6">添加用户</router-link>
			</div> 
		</div>
		<div v-else class="box-body">
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
			</form>
		</div>
		
	</div>
	
</template>

<script>
	//import axios from "axios";
	export default {
		name:"UserList",
		data(){
			return {
				userList:[],
				user:{},
				page:1,
				rows:5,
				count:0,
				pageCount:0
			};
		},
		created(){
			//当前组件的生命周期方法，组件创建后
			this.getList();
		},
		methods:{
			getList(){
				if(this.$store.getters.loginuser.id=="admin"){
					this.axiosJSON.get("/user/list/all/page",{
						params:{
							rows:this.rows,
							page:this.page
						}
					}).then(result=>{
						this.userList=result.data.list;
						this.count=result.data.count;
						this.pageCount=result.data.pageCount;
					});
				}
				else{
					this.axiosJSON.get("/user/list?id="+this.$store.getters.loginuser.id).then(result=>{
						this.user=result.data.result;
						this.count=result.data.count;
						this.pageCount=result.data.pageCount;
						console.log(this.userList);
					});
				}
			},
			deleteUser(no){
				let checkresult=confirm("您确认要删除此用户么");
				if(checkresult){
					this.axiosJSON.post("/user/delete",{no:no}).then(result=>{
						alert(result.data.message);
						if(result.data.status=="OK"){
							this.getList();
						}
					});
				}
				
				
			},
			toFirstPage(){
				this.page=1;
				this.getList();
			},
			toPreviousPage(){
				if(this.page>1){
					this.page--;
					this.getList();
				}
				
			},
			toNextPage(){
				if(this.page<this.pageCount){
					this.page++;
					this.getList();
				}
			},
			toLastPage(){
				this.page=this.pageCount;
				this.getList();
			}
		}
	}
</script>

<style>
</style>
