<template>
	<div class="box">
		<div class="box-header with-border">
		  <h3 class="box-title">用户管理</h3>	          
		</div>
		<div class="box-body">
			<table class="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">编号</th>
				  <th scope="col">ID</th>
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
					</td>
				</tr>
			  </tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/user/add" class="btn btn-default">增加用户</router-link>
	</div>
	
</template>

<script>
	import axios from "axios";
	export default {
		name:"UserList",
		data(){
			return {
				userList:[],
				page:1,
				rows:10,
				count:0,
				pageCount:0
			};
		},
		created(){ //当前组件的生命周期方法，组件创建后
			this.getList();
		},
		methods:{
			getList(){
				axios.get("http://localhost:8080/user/list/all/page",{
					params:{
						rows:this.rows,
						page:this.page
					}
				}).then(result=>{
					this.userList=result.data.list;
					this.count=result.data.count;
					this.pageCount=result.data.pageCount;
				});
			},
			deleteUser(no){
				let checkresult=confirm("您确认要删除此用户么");
				if(checkresult){
					axios.post("http://localhost:8080/user/delete",{no:no}).then(result=>{
						alert(result.data.message);
						if(result.data.status=="OK"){
							this.getList();
						}
					});
				}
				
				
			}
		}
	}
</script>

<style>
</style>
