<template>
	<div class="box">
		<div class="goods w">
		      
		      

		    </div>
		<div class="box-header with-border">
		  <h3 class="box-title">商品分类管理</h3>	          
		</div>
		<div class="box-body">
			<table class="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">编号</th>
				  <th scope="col">商品类型</th>
				  <th scope="col">操作</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="item in itemList" v-bind:key="item .id">
				  <td>{{item.id}}</td>
				  <td>{{item.name}}</td>
					<td>
				
					<a href="#" v-on:click="deleteItem(item.id)"  class="btn btn-danger">删除</a>
					 <router-link v-bind:to="'/goods/modifyitem/'+item.id" class="btn btn-info">修改</router-link>
					
					</td>
				</tr>
			  </tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/goods/additem" class="btn btn-default">增加分类</router-link>
		<nav class="page">
		  <ul class="pager">
		    <li><a href="#"  v-on:click="dowmPage">上一页</a></li>
			<span class="label label-info">{{page}}</span>
		    <li><a href="#"  v-on:click="uppPage">下一页</a></li>
			<li><a>总页数 {{pageCount}}</a></li>
			<li><a>跳转到</a></li>
			<li></li>
			 <router-link to="/goods/list" class="btn btn-warning">返回商品后台</router-link>
		  </ul>
		  
		</nav>
	</div>
	
</template>

<script>
	//import axios from "axios";
	export default {
		name: "ItemInfo",
		data() {
			return {
				itemList:[],
				itemname:'食品',
				page:1,
				rows:10,
				count:0,
				pageCount:1
				
			}
		},
		created(){ //当前组件的生命周期方法，组件创建后
		
			this.getItemList();
		},
		methods:{
			getItemList(){
				this.axiosJSON.get("/item/list/all"
				).then(result=>{
					this.itemList=result.data.list;
					console.log(this.itemList);
				});
				console.log(this.itemList);
			},
			
			uppPage(){
				if(this.page<this.pageCount){
					this.page++;
				}
				this.getItemList();
			},
			dowmPage(){
				if(this.page>1){
					this.page--;
				}
				
				this.getItemList();
			
			},
			deleteItem(id){
				let checkresult=confirm("您确认要删除此商品类型么");
				if(checkresult){
					this.axiosJSON.get("/item/delete/",{
					params:{
						id:id
						
					}
				}).then(result=>{
						alert(result.data.message);
						if(result.data.status=="OK"){
							this.getItemList();
						}
					});
				}
				
				
			}
		}
	
	
	}
</script>

<style>
		
	.item{
		background-color: #55ffff;
	}
</style>
